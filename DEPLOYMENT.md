# Secure Owner Admin Deployment

## What you will have

- Public portfolio: your existing GitHub Pages URL.
- Private owner dashboard: the Render service URL plus `/admin`.
- Visitors do not see an Owner Studio button on the public portfolio.
- The password is a server environment secret, not part of the frontend bundle.

## Recommended setup

1. Push this project to the same GitHub repository that currently publishes the portfolio.
2. Create a Render Web Service from that repository.
3. Use the included `render.yaml` as the deployment blueprint, or enter these settings manually:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
4. In Render, set `OWNER_PASSWORD` to a long unique password only you know.
5. Keep the generated `SESSION_SECRET` private.
6. Create a GitHub fine-grained token with **Contents: Read and write** access limited to `c4rl0-0/jhoncarloabling.github.io`, and set it as `GITHUB_TOKEN`.
7. After deployment, open `https://YOUR-RENDER-SERVICE.onrender.com/admin`.
8. Log in. This is your private project-management entry point.

## Future project workflow

1. Open your Render admin URL and add `/admin`.
2. Log in with your owner password.
3. Open **Manage Projects**.
4. Click **+ Add New Project**.
5. Fill in the project title, description, category, links, and cover image.
6. Publish it.
7. The server writes the project to `storage/custom-projects.json` and, when GitHub sync is configured, commits that file to the repository.
8. The GitHub Pages workflow rebuilds the public portfolio, so the new project becomes visible on your normal portfolio URL.

## Important security notes

- The `/admin` path is not a security boundary by itself. The server-side password/session is the security boundary.
- Do not put `OWNER_PASSWORD`, `SESSION_SECRET`, or `GITHUB_TOKEN` in `src/`, `.env` committed to Git, or any `VITE_*` variable.
- GitHub Pages remains the public/static site. The Render service is used for the secure admin API and owner dashboard.
- The public GitHub Pages site may still show built-in projects immediately; custom projects appear after the GitHub Pages workflow completes.

## Optional custom admin address

You can later attach a domain such as `admin.yourdomain.com` to the Render service. The application continues to use `/admin`, so the resulting address becomes `https://admin.yourdomain.com/admin`.
