# Deploying ZineIt

ZineIt is one HTML file. That shapes everything below.

## The three ways to run it

| | What it is | Who it is for |
|---|---|---|
| **The file** | Double-click `ZineIt.html` | Anyone. No install, no server, no account. Works on a plane. |
| **The site** | `index.html` on any static host | People who want a URL and offline install |
| **The app** | Android APK (Capacitor) | Phones and tablets — see [`docs/ANDROID-BUILD.md`](docs/ANDROID-BUILD.md) |

All three run the same `index.html`. There is no build step, no bundler, no transpile.

## Static hosting (Cloudflare Pages)

Settings that work — see [`docs/DEPLOY.md`](docs/DEPLOY.md) for the full walkthrough:

| Setting | Value |
|---|---|
| Framework preset | **None** |
| Build command | *(empty)* |
| Build output directory | `/` |

`_headers` sets a week-long cache on the static assets. That is it. Any static host
works the same way — GitHub Pages, Netlify, a folder on a VPS, an SD card.

## The PWA

Served over http(s), ZineIt registers `sw.js` and offers to install. `manifest.webmanifest`
supplies the name, the Ink Black theme and the icons.

Opened as a local file, **the service worker and the manifest are skipped entirely**.
`initPWA()` checks `location.protocol === 'file:'` and removes the manifest link rather
than letting the browser log a 404 at someone who just double-clicked the file. The
single-file case is the primary one and it stays clean.

The worker is network-first: a deployed update is picked up on the next load, and the
cache is only the offline fallback. Photographs are never touched by it — they live in
IndexedDB, which no service worker of ours goes near.

## What does not need deploying

No server. No database. No API keys. No accounts. Nothing to breach, because there is
nothing held. The `server/` directory in this repo is a Phase-2 scaffold for optional
sync and is not required by, or wired into, anything you deploy today.

## Checklist before you push a build

```bash
./run-tests.sh          # 153 JS + 22 Lua, all green
```

Then, on a real browser — not jsdom:

- Open the file directly (`file://`) and confirm no console errors and no 404 for the manifest
- Import a photo, apply a template, undo it
- Print preview one spread and check the margins against a ruler
- Export a 300 DPI JPG and open it at 100%

jsdom has no fonts and no printer. It cannot tell you whether the thing looks right.
