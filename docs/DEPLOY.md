# Deploying ZineIt

ZineIt is one static `index.html` — no build step, no server. That makes deployment
trivial: get the repo onto GitHub, point Cloudflare Pages at it, done. Every future
`git push` then redeploys automatically.

## 1 · Push to GitHub (one time, ~2 minutes)

The full repo with all commit history ships as `zineit-repo.bundle`. On your machine:

```bash
git clone zineit-repo.bundle zineit
cd zineit
git remote set-url origin https://github.com/storitellah/zineit.git
git push -u origin main
```

Git will ask you to sign in. GitHub no longer accepts your account password over
HTTPS — use a **personal access token** as the password (github.com → Settings →
Developer settings → Fine-grained tokens → scope it to the `zineit` repo with
*Contents: Read and write*), or authenticate once with `gh auth login` if you have
the GitHub CLI.

If the repo doesn't exist yet, create it first at github.com/new (name: `zineit`,
public, **no** README/.gitignore — the push brings everything).

## 2 · Connect Cloudflare Pages (~3 minutes)

1. Go to **dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize the GitHub app and select **storitellah/zineit**.
3. Build settings — this is the whole configuration:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: **/**
4. **Save and Deploy**. In under a minute the tool is live at
   `https://zineit.pages.dev` (Cloudflare may append a suffix if the name is taken).

From then on, every `git push` to `main` deploys automatically; other branches get
preview URLs.

The repo also ships a full favicon set (`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, 192/512 px PNGs) that Pages serves from the root — crawlers and iOS find them by convention, so no HTML changes were needed and no 404s appear in logs. The `_headers` file in the repo is picked up by Pages automatically: it sets sane
security headers and `must-revalidate` caching, so users always get the newest
version of the single-file app the moment you push.

### Custom domain (optional)

If `storitellah.com` is on Cloudflare: Pages project → **Custom domains** → add
`zineit.storitellah.com`. Cloudflare creates the DNS record and certificate itself —
no manual DNS work.

### No-git fallback

In a hurry? **Workers & Pages → Create → Pages → Upload assets** and drag the repo
folder in. You lose auto-deploy-on-push, but the site is live in seconds.

## Notes

- Photos never touch the server: ZineIt stays fully local-first. Cloudflare only
  serves the empty editor; people's projects live in their own browsers and .bak
  files.
- The optional Phase-2 sync API in `server/` is **not** part of this deployment —
  see `docs/ARCHITECTURE.md` for when and how to stand it up.
