import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';
const SESSION_SECRET = process.env.SESSION_SECRET || (IS_PROD ? '' : 'dev-only-change-me');
const OWNER_PASSWORD = process.env.OWNER_PASSWORD || '';
const STORAGE_FILE = path.join(__dirname, 'storage', 'custom-projects.json');
const COOKIE_NAME = 'jc_owner_session';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

if (IS_PROD && (!OWNER_PASSWORD || !SESSION_SECRET)) {
  console.error('Missing OWNER_PASSWORD or SESSION_SECRET in production.');
  process.exit(1);
}

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '1mb' }));

const loginAttempts = new Map();

function safeEqual(a, b) {
  const aa = Buffer.from(a || '');
  const bb = Buffer.from(b || '');
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

function sign(value) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('base64url');
}

function makeSession() {
  const issued = Date.now().toString();
  const nonce = crypto.randomBytes(24).toString('base64url');
  const payload = `${issued}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

function validSession(token) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [issued, nonce, signature] = parts;
  const timestamp = Number(issued);
  if (!Number.isFinite(timestamp) || Date.now() - timestamp > SESSION_TTL_MS) return false;
  return safeEqual(signature, sign(`${issued}.${nonce}`));
}

function getCookie(req, name) {
  const raw = req.headers.cookie || '';
  const found = raw.split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : '';
}

function requireOwner(req, res, next) {
  if (!validSession(getCookie(req, COOKIE_NAME))) {
    return res.status(401).json({ error: 'Owner authentication required.' });
  }
  next();
}

async function ensureStorage() {
  await fs.mkdir(path.dirname(STORAGE_FILE), { recursive: true });
  try { await fs.access(STORAGE_FILE); }
  catch { await fs.writeFile(STORAGE_FILE, '[]', 'utf8'); }
}

async function readLocalProjects() {
  await ensureStorage();
  const raw = await fs.readFile(STORAGE_FILE, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

function githubConfigured() {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO);
}

function githubUrl() {
  const owner = encodeURIComponent(process.env.GITHUB_OWNER);
  const repo = encodeURIComponent(process.env.GITHUB_REPO);
  const file = (process.env.GITHUB_PROJECTS_PATH || 'storage/custom-projects.json').split('/').map(encodeURIComponent).join('/');
  return `https://api.github.com/repos/${owner}/${repo}/contents/${file}`;
}

async function githubRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'Jhon-Carlo-Portfolio-Admin',
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API ${response.status}: ${text.slice(0, 300)}`);
  }
  return response.json();
}

async function readProjects() {
  if (!githubConfigured()) return readLocalProjects();
  try {
    const branch = process.env.GITHUB_BRANCH || 'main';
    const data = await githubRequest(`${githubUrl()}?ref=${encodeURIComponent(branch)}`);
    const decoded = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8');
    const projects = JSON.parse(decoded);
    return Array.isArray(projects) ? projects : [];
  } catch (error) {
    console.error('GitHub read failed; falling back to local storage:', error.message);
    return readLocalProjects();
  }
}

async function writeProjects(projects) {
  const serialized = JSON.stringify(projects, null, 2);
  if (Buffer.byteLength(serialized, 'utf8') > 900 * 1024) {
    throw new Error('Project storage is almost full. Use smaller cover images or remove old custom projects.');
  }
  await ensureStorage();
  await fs.writeFile(STORAGE_FILE, serialized, 'utf8');

  if (!githubConfigured()) return { synced: false };

  const branch = process.env.GITHUB_BRANCH || 'main';
  let sha;
  try {
    const current = await githubRequest(`${githubUrl()}?ref=${encodeURIComponent(branch)}`);
    sha = current.sha;
  } catch (error) {
    if (!String(error.message).includes('404')) throw error;
  }

  const body = {
    message: `Update portfolio projects (${new Date().toISOString()})`,
    content: Buffer.from(serialized, 'utf8').toString('base64'),
    branch
  };
  if (sha) body.sha = sha;
  await githubRequest(githubUrl(), { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
  return { synced: true };
}

app.post('/api/auth/login', (req, res) => {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, resetAt: now + 15 * 60 * 1000 };
  if (now > record.resetAt) { record.count = 0; record.resetAt = now + 15 * 60 * 1000; }
  if (record.count >= 10) return res.status(429).json({ error: 'Too many attempts. Try again later.' });
  record.count += 1;
  loginAttempts.set(ip, record);

  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!OWNER_PASSWORD || !safeEqual(password, OWNER_PASSWORD)) {
    return res.status(401).json({ error: 'Invalid owner password.' });
  }

  loginAttempts.delete(ip);
  const token = makeSession();
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'lax',
    maxAge: SESSION_TTL_MS,
    path: '/'
  });
  res.json({ authenticated: true });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, secure: IS_PROD, sameSite: 'lax', path: '/' });
  res.json({ authenticated: false });
});

app.get('/api/auth/me', (req, res) => {
  res.json({ authenticated: validSession(getCookie(req, COOKIE_NAME)) });
});

app.get('/api/projects', async (req, res) => {
  try {
    const custom = await readProjects();
    // Built-in projects are bundled in the frontend; this endpoint intentionally returns only custom projects.
    res.json({ projects: custom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to load projects.' });
  }
});

app.post('/api/projects', requireOwner, async (req, res) => {
  try {
    const project = req.body;
    if (!project || typeof project !== 'object' || !project.id || !project.title) {
      return res.status(400).json({ error: 'Invalid project.' });
    }
    const custom = await readProjects();
    const next = [project, ...custom.filter(p => p.id !== project.id)];
    await writeProjects(next);
    res.json({ projects: next, published: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Unable to publish project.' });
  }
});

app.delete('/api/projects/:id', requireOwner, async (req, res) => {
  try {
    const custom = await readProjects();
    const next = custom.filter(p => p.id !== req.params.id);
    await writeProjects(next);
    res.json({ projects: next });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete project.' });
  }
});

app.post('/api/projects/reset', requireOwner, async (req, res) => {
  try {
    await writeProjects([]);
    res.json({ projects: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to reset projects.' });
  }
});

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server listening on ${PORT}`);
});
