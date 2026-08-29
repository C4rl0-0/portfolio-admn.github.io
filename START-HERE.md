# Jhon Carlo Portfolio — Secure Owner Upload Setup

## Your two addresses

**Public portfolio (keep using this):**
`https://c4rl0-0.github.io/jhoncarloabling.github.io/`

**Private owner dashboard (after deployment):**
`https://YOUR-RENDER-SERVICE.onrender.com/admin`

The `/admin` route is protected by a server-side password and signed session cookie. The public portfolio has no Owner Studio button.

## How to deploy it

1. Upload/push this project to your GitHub repository `c4rl0-0/jhoncarloabling.github.io`.
2. In Render, create a **Web Service** from that repository.
3. Use:
   - Build: `npm install && npm run build`
   - Start: `npm start`
4. Set `OWNER_PASSWORD` to a new long password only you know.
5. Keep the generated `SESSION_SECRET` private.
6. Create a fine-grained GitHub token limited to this repository with **Contents: Read and write** permission. Put it in `GITHUB_TOKEN`.
7. Set:
   - `GITHUB_OWNER=c4rl0-0`
   - `GITHUB_REPO=jhoncarloabling.github.io`
   - `GITHUB_BRANCH=main`
   - `GITHUB_PROJECTS_PATH=storage/custom-projects.json`
8. Deploy.
9. Open the Render service URL followed by `/admin`.
10. Log in and use **Manage Projects → + Add New Project**.

## Adding future work

1. Open your private `/admin` address.
2. Enter your owner password.
3. Click **+ Add New Project**.
4. Add your project information and image.
5. Publish.
6. The server saves it and syncs `storage/custom-projects.json` to GitHub.
7. GitHub Actions rebuilds the public GitHub Pages portfolio.
8. Your new project appears on the public portfolio after the Pages deployment finishes.

## Important

The `/admin` URL itself is not the security. The server-side authentication is. Do not put the owner password or GitHub token into React source code or `VITE_*` variables.
