# Jhon Carlo San Juan Abling — Portfolio

This portfolio now has a **real server-side owner login** for project publishing. The owner password is never bundled into the React/JavaScript frontend.

## What changed
- Public visitors can browse the portfolio normally.
- Owner controls are hidden from the public page.
- Owner Studio is available only at `/admin`; it is not exposed by the public portfolio UI.
- Login uses an `HttpOnly` signed session cookie.
- Project creation/deletion requires server authentication.
- The owner password is supplied through `OWNER_PASSWORD` and is not stored in `src/`.
- Project cover images are optimized in the browser before publishing.
- Optional GitHub synchronization lets published projects survive server restarts and automatically trigger a GitHub Pages rebuild.

## Important: secure deployment
The old GitHub Pages-only deployment cannot securely run owner authentication because GitHub Pages is static. **For the owner upload system to work securely, deploy this project as the Node/Express application (for example on Google Cloud Run).**

If you use GitHub synchronization, the server can commit `storage/custom-projects.json` to your portfolio repository. Your GitHub Actions workflow can then rebuild the public site. Keep the GitHub token on the server only. Use a fine-grained token restricted to this one repository with Contents: Read and write.

## Required server secrets
Set these environment variables on the server:

- `OWNER_PASSWORD` — your private owner password
- `SESSION_SECRET` — long random secret used to sign sessions

Recommended for persistent project publishing:

- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH` (usually `main`)
- `GITHUB_PROJECTS_PATH` (usually `storage/custom-projects.json`)

**Do not put these secrets in `VITE_*` variables, React source files, or the public repository.**

## Local development

```bash
npm install
OWNER_PASSWORD="your-password" SESSION_SECRET="a-long-random-secret" npm run build
OWNER_PASSWORD="your-password" SESSION_SECRET="a-long-random-secret" npm start
```

Then open:
- Public portfolio: `http://localhost:3000/`
- Owner Studio: `http://localhost:3000/admin`

## Docker / Cloud Run
The included `Dockerfile` builds the Vite frontend and starts the Express server. Configure the environment variables above as Cloud Run secrets/environment variables.

## GitHub Pages workflow
The repository's GitHub Pages workflow is still useful for rebuilding the static public files when the project data is committed to GitHub, but **do not use GitHub Pages as the owner-authentication server**. The secure admin endpoint must remain on the Node/Express deployment.


## Quick owner workflow

Deploy the Node/Express app to Render (the included `render.yaml` is ready for this). Your private dashboard will be: `https://YOUR-RENDER-SERVICE.onrender.com/admin`. Set `OWNER_PASSWORD` and `SESSION_SECRET` as server environment variables. Configure the GitHub token variables so published projects are committed to `storage/custom-projects.json`; the existing GitHub Pages workflow then rebuilds the public portfolio. See `DEPLOYMENT.md` for the exact steps.
