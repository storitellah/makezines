# Getting `zineit.app` live on Cloudflare

You already have the hard part done: ZineIt is one static file, and Cloudflare Pages is
already serving it (see [`DEPLOY.md`](DEPLOY.md)). This guide covers the remaining piece —
**buying the domain and attaching it** — plus the handful of things that are specific to a
`.app` domain and easy to get wrong.

Total time: about 20 minutes, most of it waiting for DNS.

---

## Before you start: what `.app` costs and why it's different

`.app` is a Google-operated top-level domain. Two things follow from that:

- **Price.** Roughly **US$14–20 per year** at Cloudflare Registrar, which sells at cost with
  no markup and no first-year-cheap-then-expensive trick. Budget around KES 2,000–2,800/yr.
- **HTTPS is mandatory, permanently.** Every `.app` domain is on the HSTS preload list at
  the TLD level. Browsers refuse to load `http://zineit.app` at all — there is no insecure
  fallback, ever. This is a feature, not an obstacle: Cloudflare gives you a free
  certificate automatically, so it costs you nothing. But it does mean **you cannot test
  over plain HTTP**, and a misconfigured certificate shows as a hard failure rather than a
  warning.

If you'd rather not pay yearly, `zineit.pages.dev` (free, already working) is a perfectly
respectable address. The custom domain is about identity, not capability.

---

## 1 · Buy the domain at Cloudflare Registrar

Buying it *at* Cloudflare avoids a nameserver migration step entirely.

1. **dash.cloudflare.com → Domain Registration → Register Domains**.
2. Search `zineit`. Pick `zineit.app`.
3. Check out. Cloudflare auto-enables **WHOIS redaction** — your name, home address and
   phone stay private. Leave that on.
4. Turn on **auto-renew**. A lapsed domain can be re-registered by anyone, and short
   memorable names get sniped by resellers within hours.

The domain lands in your account as a Cloudflare zone with nameservers already correct.
Nothing to configure at a registrar elsewhere.

> **If you buy it somewhere else instead** (Namecheap, Truehost, etc.), you must then add
> the site to Cloudflare (**Add a site** → free plan) and change the nameservers at that
> registrar to the two Cloudflare gives you. Propagation takes 1–24 hours. Everything
> below is the same afterwards.

---

## 2 · Attach it to your Pages project

1. **Workers & Pages → `zineit` → Custom domains → Set up a custom domain**.
2. Enter `zineit.app`. Cloudflare sees you own the zone and creates the DNS record itself.
3. Repeat for `www.zineit.app` — Cloudflare will offer to redirect it to the apex.

Certificate issuance takes **2–15 minutes**. The custom domain shows *Pending* then
*Active*. Because `.app` is HSTS-preloaded, the site genuinely will not load until that
certificate is live — if you see an error in the first few minutes, wait before debugging.

### Send `www` to the bare domain

Pages usually handles this. If you want it explicit, add a **Redirect Rule**
(Rules → Redirect Rules → Create):

- **If** hostname equals `www.zineit.app`
- **Then** dynamic redirect, **301**, to
  `concat("https://zineit.app", http.request.uri.path)`

One canonical address is better for search and for the PWA install prompt, which treats
`zineit.app` and `www.zineit.app` as different apps.

---

## 3 · Check the caching rules that already ship

The repo has a `_headers` file that Cloudflare Pages reads automatically. It does one
important thing: **the app itself is never cached, the icons are cached for a week.**

That is deliberate. `index.html` is the entire application — if a browser cached it for a
week, you'd ship a fix and your readers would keep running the old one for days. The icons
never change, so they cache hard.

After your first deploy on the real domain, verify it:

```bash
curl -sI https://zineit.app | grep -i cache-control
# expect: cache-control: public, max-age=0, must-revalidate

curl -sI https://zineit.app/icon-512.png | grep -i cache-control
# expect: cache-control: public, max-age=604800
```

If the first one comes back with a long max-age, `_headers` isn't being picked up — check
it sits at the **repo root** and that the Pages build output directory is `/`.

---

## 4 · Confirm the install prompt works

ZineIt is a PWA. On the real HTTPS domain it becomes installable, which is the main
practical reason to have the domain at all — on Android it installs to the home screen and
runs fullscreen with no browser chrome.

Check in Chrome DevTools → **Application → Manifest**:

- Manifest loads, no errors
- Icons: 192 and 512 both resolve
- Service worker: **activated and running**
- "Installability" reports no blockers

On a phone, visit `https://zineit.app` and look for **Add to Home Screen** (Chrome offers
it in the ⋮ menu; Safari in the Share sheet). Installed, it gets the zine-cutout icon and
its own window.

> The service worker deliberately does nothing on `file://` — the standalone
> `ZineIt.html` has no origin to register against. That's expected, not a fault.

---

## 5 · Optional: keep a stable download link

People will ask for the offline single file. Rather than sending them to GitHub's UI, the
repo root is already served, so this works as soon as the domain is live:

```
https://zineit.app/index.html      ← the app itself
```

If you want a friendlier name, add a Redirect Rule from `/download` to the raw file, or
drop a copy named `ZineIt.html` in the repo root and link that.

---

## Troubleshooting, honestly

| Symptom | Cause | Fix |
|---|---|---|
| Site won't load at all, no certificate warning offered | `.app` HSTS — there is no insecure fallback | Wait for the certificate to go *Active*; it cannot be bypassed |
| *Pending* for over 30 minutes | Domain bought elsewhere, nameservers not switched | Point the registrar at Cloudflare's nameservers |
| Old version keeps appearing | `_headers` not applied, or the service worker cached it | Check `_headers` is at the repo root; hard-reload (Ctrl/⌘+Shift+R) |
| No install prompt | Not HTTPS, or manifest/SW error | DevTools → Application → Manifest |
| `www` shows a different site | Missing redirect | Add the redirect rule in step 2 |

---

## What this costs to run

| Item | Cost |
|---|---|
| `zineit.app` domain | ~US$14–20/year |
| Cloudflare Pages hosting | **Free** (500 builds/month, unlimited bandwidth) |
| TLS certificate | **Free**, automatic |
| **Total** | **The domain, and nothing else** |

Unlimited bandwidth on the free tier is not a trap for a site like this — ZineIt is a
single ~250 KB file with no backend, no database and no per-user storage. It could be on
the front page of a design site and still cost you nothing beyond the domain.
