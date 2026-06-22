# Deploy — usacarcheck.com

Static site (Next.js export). Free hosting on Cloudflare Pages. Build output: `out/`.

---

## Option A — GitHub + Cloudflare Pages  ✅ recommended (auto-deploy + auto data updates)

### 1) Create an empty GitHub repo
github.com/new → name `usacarcheck` → Public or Private → **do NOT** add README/.gitignore/license (we already have them) → Create.

### 2) Push (run these in the project folder)
```
git remote add origin https://github.com/<YOUR_USERNAME>/usacarcheck.git
git push -u origin main
```
First push will ask you to log in (browser or a personal access token).

### 3) Connect Cloudflare Pages
dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
Build settings:
- Framework preset: **Next.js (Static HTML Export)**  (or "None")
- Build command: `npm run build`
- Build output directory: `out`

Save & Deploy → live at `usacarcheck.pages.dev` in ~2 min.

### 4) Custom domain
Pages project → **Custom domains → Add** → `usacarcheck.com` (and `www.usacarcheck.com`).
- If the domain uses **Cloudflare nameservers**, DNS auto-configures.
- If it's at another registrar, Cloudflare shows a CNAME to add there.

### 5) Automation (already wired)
`.github/workflows/update-vehicles.yml` re-pulls NHTSA models weekly and pushes → Cloudflare auto-rebuilds. Nothing to do.

---

## Option B — Direct upload (fastest, no GitHub, click-only)
dash.cloudflare.com → **Workers & Pages → Create → Pages → Upload assets** → project name `usacarcheck` → drag the **`out`** folder → Deploy. Then add the custom domain as in A.4.
(Re-deploy later = `npm run build` then re-upload `out`. No auto data updates.)

---

## After it's live
- **Google Search Console** (search.google.com/search-console): add `usacarcheck.com`, verify (easiest: DNS TXT via Cloudflare), submit sitemap `https://usacarcheck.com/sitemap.xml`. This starts indexing.
- **AdSense** (adsense.google.com): apply with usacarcheck.com. Once approved, paste your ad unit into `components/AdSlot.js` and load the AdSense script in `app/layout.js`.
- **Change domain / rebuild**: edit `.env.production` → `npm run build`.
- **Preview locally anytime**: `npm run dev` → http://localhost:3000
