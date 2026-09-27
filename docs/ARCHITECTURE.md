# ZineIt — System Architecture

**Product:** local-first zine & photobook layout tool for photojournalists.
**Design principle:** the editor must work with zero network, in the field, forever. The cloud is an *optional sync layer*, never a dependency. This is also what makes ZineIt trivially scalable: the compute-heavy work (layout, rendering) runs on the user's machine; our servers only move bytes.

---

## 1. System architecture

```
PHASE 1 (shipping now — scales to millions on a CDN)
┌─────────────────────────────────────────────────────────┐
│  Browser (the entire product)                           │
│  ┌───────────┐ ┌────────────┐ ┌───────────────────────┐ │
│  │ UI layer  │ │ State core │ │ Persistence           │ │
│  │ render fns│→│ JSON model │→│ localStorage autosave │ │
│  │ pointer   │ │ (single    │ │ .bak export/restore   │ │
│  │ events    │ │  source of │ │ (verified round-trip) │ │
│  └───────────┘ │  truth)    │ └───────────────────────┘ │
│  ┌───────────┐ └────────────┘ ┌───────────────────────┐ │
│  │ Print/PDF │◄───────────────│ Google Fonts (CDN,    │ │
│  │ pipeline  │                │ swap; offline = fall- │ │
│  │ (browser  │                │ back system stack)    │ │
│  │ native)   │                └───────────────────────┘ │
│  └───────────┘                                          │
└─────────────────────────────────────────────────────────┘
        ▲ static index.html served from CDN (CloudFront / Pages)

PHASE 2 (sync & collaboration — server/ scaffold in this repo)
Browser ──HTTPS──► API (Node/Express, stateless, N replicas behind LB)
                    │            │
                    ▼            ▼
              PostgreSQL    S3-compatible object storage
              (metadata,    (photo originals + .bak archives,
               versions)     presigned direct upload/download)
                    │
                    ▼
              Worker queue (server-side PDF render, thumbnails)
```

Why this scales: static client on a CDN has effectively unlimited fan-out; the API is stateless (horizontal scale behind a load balancer); photos go browser→S3 directly via presigned URLs so the API never proxies large payloads; Postgres holds only small JSON documents and pointers.

## 2. File structure

```
ZineIt/
├── index.html            # the entire Phase-1 product (zero-build, single artifact)
├── README.md
├── docs/
│   └── ARCHITECTURE.md   # this document
└── server/               # Phase-2 sync API scaffold (not required to use ZineIt)
    ├── package.json
    ├── .env.example
    ├── schema.sql        # PostgreSQL schema
    └── server.js         # Express API, endpoints below
```

A deliberate choice: the client stays a single file with no build step. One artifact, one hash, one CDN object — trivially cacheable, auditable, and downloadable as the offline app itself.

## 3. Database schema (PostgreSQL — see `server/schema.sql`)

| Table | Purpose | Key columns |
|---|---|---|
| `users` | accounts | `id uuid pk`, `email unique`, `password_hash`, `created_at` |
| `projects` | one row per zine/book | `id uuid pk`, `user_id fk`, `name`, `format`, `doc jsonb` (the exact client state), `updated_at` |
| `project_versions` | append-only history = server-side "daily backup" | `id`, `project_id fk`, `doc jsonb`, `created_at` |
| `assets` | photo metadata; bytes live in S3 | `id uuid pk`, `user_id fk`, `s3_key`, `filename`, `width`, `height`, `bytes`, `sha256` |
| `events` | audit/analytics (backups made, exports run) | `id`, `user_id`, `type`, `meta jsonb`, `created_at` |

The client's JSON document is the schema's centre of gravity: `projects.doc` is byte-identical to a `.bak`, so restore, sync, and version history all share one tested code path.

## 4. API endpoints (Phase 2)

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/v1/auth/signup` · `/v1/auth/login` | email+password → JWT |
| `GET` | `/v1/projects` | list caller's projects (metadata only) |
| `POST` | `/v1/projects` | create from a `.bak`-shaped document |
| `GET` | `/v1/projects/:id` | fetch full document |
| `PUT` | `/v1/projects/:id` | save; also appends to `project_versions` |
| `GET` | `/v1/projects/:id/versions` | version history (server-side daily backups) |
| `POST` | `/v1/assets/presign` | returns presigned S3 PUT URL for a photo |
| `GET` | `/v1/assets/:id` | presigned GET (originals never proxied) |
| `GET` | `/healthz` | liveness for the load balancer |

All endpoints stateless + JWT; rate-limited per user; documents validated server-side with the same rules as the client's `validateProject`.

## 5. UI architecture

Unidirectional and boring on purpose:

```
event (pointer/keyboard/drop) → mutate state (single JSON object)
  → touch()  → debounced autosave (localStorage) + modified timestamp
  → render*() → pure re-render of the affected region
                (renderPage / renderRail / renderLibrary / renderInspector)
```

- **State** is one serialisable object — which is why autosave, `.bak`, restore, and future server sync are the same operation.
- **Geometry is stored in inches**, converted to px only at render time and to physical units at print time — screen, PDF, and paper always agree.
- **Print pipeline** builds a parallel DOM (`#printRoot`) at exact trim size; browser print engines embed images at native resolution (highest quality the source allows).
- **Typography**: 40 Google Fonts loaded with `display=swap`; offline the UI falls back to system stacks so the field workflow never blocks.

## 6. Scaling & production notes

- **Delivery:** static hosting + CDN (GitHub Pages today; CloudFront/Fastly later). Immutable deploys — the file *is* the version.
- **Backups:** client-side `.bak` with verified test-restore stays the source of truth; Phase 2 adds `project_versions` as automatic off-machine history.
- **Perf budget:** photos stored as originals; UI thumbnails rendered small; layout math is O(elements). Multi-hundred-photo books remain smooth.
- **Observability (Phase 2):** structured logs, `/healthz`, error tracking; `events` table for product analytics without third-party trackers.
- **Security:** no third-party scripts in the editor; CSP-friendly; Phase 2 uses argon2 password hashing, JWT with short expiry, presigned-URL uploads scoped per user.
