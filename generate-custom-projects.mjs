import fs from 'node:fs/promises';

const source = new URL('../storage/custom-projects.json', import.meta.url);
const target = new URL('../src/data/customProjects.js', import.meta.url);

let projects = [];
try {
  projects = JSON.parse(await fs.readFile(source, 'utf8'));
} catch {
  projects = [];
}
if (!Array.isArray(projects)) projects = [];

const output = `// AUTO-GENERATED FROM storage/custom-projects.json — DO NOT EDIT BY HAND.\nexport const CUSTOM_PROJECTS = ${JSON.stringify(projects, null, 2)};\n`;
await fs.writeFile(target, output, 'utf8');
