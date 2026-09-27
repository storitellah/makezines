# TESTING.md — Zineit by Storitellah v5.4 test report

**Result: 231 passed · 0 failed · 0 console errors in the app suite, plus 22 Lua unit
tests for the Lightroom plug-in — 253 total, all green.** The whole tool — through the
v4.3 cover-template library, transparent graphics, export-fidelity fix and light-backup +
relink system — was tested before this render, as required. v4.3 added regression tests
that lock the text-colour export bug shut, plus coverage for every cover/back recipe,
transparent-graphic detection and rendering, and the light-backup fingerprint matching.

## How it was tested

The app is a single self-contained HTML file, so the suite boots the *real*
`index.html` inside [jsdom] and drives it two ways:

1. **Through the UI** — real DOM events: `pointerdown/move/up` for drags, pans, and all
   eight resize handles; `click` on the view-bar, Fit/Fill/Centre, pan-mode, and text
   editor buttons; `keydown` for arrow navigation and nudging; `change`/`input` on
   toggles and text fields.
2. **Through the model** — a `window.__zineit` test API exposes the pure functions
   (spread math, clamping, crop geometry, validation, migration, print DOM builders)
   for exact numeric assertions in inches.

A virtual console captures every page error; the final test fails the run if *any*
uncaught exception occurred at *any* point. Run it yourself:

```bash
./run-tests.sh          # everything: Lua syntax, Lua units, fixture, JS suite
cd tests && npm test    # just the app + contract suite
```

## What the run verified (mapped to the release checklist)

| Area | Verified behaviour |
|---|---|
| Boot & model | Valid 8-page mini-zine; spread model = cover · 3 pairs · back |
| Text Editor tab | Rows show page, spread, content type, editable field, live-preview link, save status; edits mutate the real element; status flips editing→saved on persist; title syncs both ways; add-to-cover; add-by-role-and-page |
| Double-page spread | Make-spread re-homes the photo to the left page at exactly 2 page-widths; renders once across the fold with a SPREAD badge; each half locked and correctly offset (−W) in single view; **prints on both sequential pages with the right half shifted by exactly one page width**; unspread returns to one page |
| Facing pages | Spread view canvas is two pages wide with a fold guide; single view is one page |
| Preview & zoom | Fit capped at 110 px/in (reduced, centred preview); 100% = 96 px/in; ± stepping |
| Timeline | One item per spread; ≥7 page thumbs at the larger 96 px size; page numbers; photo/text indicators; empty-page warning; ♪ audio indicator; click-to-select |
| Shift+drag | Panning changes object-position, stays clamped 0–100%, crop ghost appears during the gesture and is removed after; Pan-mode button works without a modifier |
| Drag & placement | Plain drag moves ~1 in and snaps to the ⅛″ grid; dropping a placed photo onto an empty frame transfers the asset and removes the floater |
| Resize | All 8 handles present; SE corner resizes both axes, N edge never touches width; floors at 0.3×0.25 in; object-fit classes guarantee no stretching |
| Fit / Fill / Centre | Instant: contain / cover / px=py=50; reset crop re-centres; reset frame restores the photo's true proportions |
| Margins & bleed | Bleed off: hard clamp at trim on all four sides; bleed on: exactly ⅛″ and no more; toggling bleed off pulls everything back inside trim; margin-crossing warning names the offending side |
| Navigation | Page stepping visits 0…7 with no skips and holds at both covers; spread stepping visits each spread in order; view-bar buttons; arrows navigate when nothing selected and nudge when something is |
| Page numbers | Preview: interiors only, covers never, toggle off hides; Print: interiors carry `.ppn` with the right number, covers don't, toggle off removes |
| Print & imposition | Sequential print DOM = one `.pp` per page (8); imposition = one sheet, 8 panels, exactly 4 rotated 180° |
| Backups | Live state round-trips the validator (the same check every .bak download runs); corrupt files rejected with a reason (missing asset, NaN geometry, wrong app); v1 .bak migrates to v2 (roles, guides, audio slots) |
| Mobile shell | ≤820 px activates `body.mobile`; wide viewport restores desktop; Photos/Tools drawers open from the toolbar and are mutually exclusive; backdrop tap closes; timeline sheet and text editor toggle from the toolbar |
| Touch controls | Drag, pan, and 8-way resize run on the unified pointer-event pipeline (verified structurally: no mouse-/touch-only handlers, `touch-action:none` set); tap selects; the Edit chip appears on selection and opens the tools drawer (focusing the text field for text blocks) |
| Swipe navigation | Swipe left/right on the canvas steps pages (single view) or whole spreads (spread view); vertical gestures ignored; swipes starting on an element never fire — the drag wins |
| Fullscreen preview | Enters/exits, shows "n / 8" indicator, ‹ › navigate, Esc exits; single, spread, and fullscreen views all reachable on mobile |
| Mini zine · Letter | Exact 11 × 8.5″ paper, 8 panels, 4 rotated 180°, scale = 1 (native) |
| Mini zine · A4 | Paper 11.69 × 8.27″, sheet scaled by exactly 8.27/8.5 with a single uniform `scale()` (aspect ratios preserved), centred on the paper |
| Fold & cut marks | 4 dashed fold lines at 2.75 / 5.5 / 8.25″ + the horizontal centre fold, 8 printer-style edge ticks; one ✂ cut line spanning exactly the middle two panels; both fully hideable |
| Fit & margins | Fit-to-paper limited by A4 height; maintain-margins shrinks to keep a ¼″ border; 100% on A4 raises a clipping warning that names the remedy; fitting clears it |
| Print preview | Modal opens with settings synced from state; the preview embeds the real imposed sheet; paper, fold, and page-number toggles live-rebuild it |
| PDF / @page | `@page` follows the chosen paper (11×8.5 or 11.69×8.27 landscape) so browser print-to-PDF exports at the right size |
| Imposition persistence | Settings survive the .bak round-trip; migration restores defaults when absent |
| Lean memory | Project state carries **no** full-resolution photo data — metadata + tiny thumb strings only; lean autosave persists |
| Asset store | Blobs round-trip through the store (IndexedDB path in browsers, verified here on the identical in-memory fallback), URLs served and cached for sync render paths, deletes reclaim storage |
| Fast loading | Canvas hydrates progressively (thumb instantly, preview on arrival, `decoding=async`); library thumbs lazy-load; every placed photo resolves a print source; lightbox opens instantly and upgrades to full resolution |
| Self-contained .bak | v3 export embeds originals + previews per asset and passes the verifier; live state stays lean; legacy v1/v2 ingest moves inline photos to the store and slims state |
| HEIC | `.heic`/`.heif` accepted by the picker; detection by MIME **and** extension (HEIC often ships with no MIME type); native `createImageBitmap` decode attempted first, lazy heic2any fallback present |
| Feedback | Support-card link and view-bar ✉ button both address bryanjaybee@gmail.com with a prefilled subject and bug-report template |
| Cleanup | Deleting a library photo removes metadata **and** stored blobs |
| M-Pesa removal | No markup, styles, scripts, or phone number anywhere in the file |
| Support buttons | Exactly two icon buttons (Ko-fi, Patreon) with SVG icons, accessible labels, correct targets, and no raw URL text |
| Platform meta | `viewport-fit=cover`, theme-color, iOS/Android web-app metas present; pinch-zoom **not** disabled |
| Cutout & toolbar safety | `100dvh` app frame; safe-area insets on header, toolbar, timeline sheet, toast, chip, fullscreen controls; `overscroll-behavior:none` |
| Touch hygiene | 16 px mobile inputs (no iOS focus zoom), `touch-action:manipulation`, tap-highlight and long-press callout suppression |
| Pointer capture | Requested on drag start; the full drag pipeline verified to still work without a pointerId (mouse path) |
| Mobile view bar | Single row, horizontally scrollable |
| Type system | Body stack leads with Source Sans (3 = current name of Source Sans Pro), display token is Bebas Neue, Google Fonts loads both with UI weights, wordmark/panel headers use the display face, numeric readouts stay mono; Source Sans and Bebas offered in the zine font picker |
| Production shell | Inline SVG favicon, noscript message, header version badge matching APP_VER, console version banner |
| Error handling | Synthetic uncaught error raises one toast naming the error, reassuring about autosave, and routing to the feedback email; a second immediate error is throttled; async rejections covered; boot guarded with a readable failure screen |
| Accessibility | All icon-only controls carry aria-labels; `prefers-reduced-motion` honoured |
| Favicon set | Real multi-size `.ico`, gradient `.svg`, and PNG signatures verified; week-long cache headers on icons while the HTML stays `must-revalidate`; inline data-URI icon retained and **no** file-based icon links, so a locally saved single file keeps working |
| Lightroom plug-in (Lua, 22 tests) | JSON encoder (sorted keys, `[]` vs `{}`, inch geometry without float drift, escaping, NaN/infinity refused); base64 correctness at **every** input length; formats mirroring ZineIt; frame maths preserving aspect ratio, respecting margins, reserving caption space, degrading safely on missing dimensions; capacity and over-selection reporting; project assembly (page counts, cover photo, title block, caption blocks, unique ids, finite geometry, no orphan assets); streaming `.bak` writer and its failure path |
| Plug-in ↔ app contract (5 tests) | A `.bak` generated by the **plug-in's own Lua code** passes ZineIt's verifier, embeds byte-exact JPEGs, restores through ZineIt's **real** restore path (name, format, 8 pages, 5 assets, cover photo, Bebas title, captions, stored blobs), then renders, prints (8 pages), and imposes like any native project |
| Thumbless imports | Library and canvas hydrate from the stored preview; regeneration path covers importer-made projects |
| v4 image engine | Frame clips while the photo overhangs on both sides; Fit/Fill preserve the exact aspect ratio; crop % reported rather than silently lost; asset record byte-identical after crop/zoom/rotate; Reset Crop and Reset Frame restore precisely; F/⇧F/C/R/⇧R; rotation lives in the transform, not the file; v3→v4 migration leaves the photo where it was; corrupt transforms rejected by the verifier |
| Frame clamping | A frame dragged hard right stops exactly at the page edge, never beyond |
| 16-page zine | 16 pages with named covers; four sheets × two sides; **every sheet-side pairs to n+1**; covers on the outermost sheet; 8\|9 centre spread innermost; **every page printed exactly once**; reading order stays 1…16; print DOM builds 8 sheet-sides with fold lines and the short-edge instruction |
| A4 / ratios / bleed | A4 portrait + landscape open full-bleed with margin 0; 3:2 and 2:3 photobooks exact; bleed 3 mm default and 5 mm option, clamping on both edges |
| File naming | Export and backup schemes match exactly; filesystem-hostile characters stripped; empty names fall back; optional suffix; path-safe export base |
| Export | 300 DPI target; renders from the **original** photo not the preview; canvas clip matches the on-screen frame; photo drawn at true ratio; JPG numbering in reading order and separate spread numbering; **CRC32 verified against the RFC check value** (a wrong table silently corrupts every ZIP) |
| Brand | Palette values exact (primary + secondary); Poppins/Inter/Source Serif 4/Manrope loaded and assigned; wordmark ExtraBold; yellow buttons carry ink text for 4.5:1 |
| Audio removal | No UI, handlers, markup or state field anywhere |
| Templates | All nine templates supply all eleven page types; Blank stays blank; the seven templates named in the brand guidelines all exist; **every recipe materialises on-page across all seven formats** (mini-zine, mini-16, A4 portrait/landscape, 3:2, 2:3, half-letter); type scales with page size but never below legibility; applying sets frames, text, fonts, colours and margin; **replace keeps photos, their order and their true aspect ratio**; surplus photos are never discarded; text carries across by role; whole-zine apply assigns cover/intro/closing/back and leaves a project that passes the verifier; custom save/duplicate/export→import round-trip; junk template files refused; customs persist to local storage; browser UI previews from real recipes and applies |
| Text colour | Defaults to ink, renders on canvas, used by the 300 DPI export |
| One-window workspace | Right panel is tabbed (props/page/layers/guides/export) and shows exactly one pane; every toolbar and panel control present; compact title never truncates the saved value; panels resize via CSS variables, collapse, persist to local storage, and reset; focus mode and preview-only, both exited with Esc; bleed hint tracks the real millimetre setting |
| Layers | Stack listed front-to-back; bring to front / forward / backward / send to back; drag-reorder lands where dropped; **hidden layers leave the canvas, the print path and the 300 DPI export but stay in the project**; locked layers refuse to be dragged; eye and padlock toggles; renaming never touches the photo record |
| Undo / redo | Walks back and forward; **the asset record is byte-identical after an undo**; a new edit clears the redo branch; buttons reflect what is actually possible |
| Text colour | Hex parsing accepts `#FFC43D` / `ffc43d` / `#fc3` and refuses junk; RGB readout; seven brand presets; recent colours persisted; apply-by-scope recolours only matching roles |
| Console health | Zero page errors or uncaught exceptions across all 153 app tests |

## Defects found by this suite and fixed before render

1. **Timeline crash on the cover spread** — painting spread halves dereferenced a null
   left page. One guard fixed a 24-test failure cascade.
2. **Cross-fold transfer unreachable** — per-page clamping ran before the transfer
   check; dragging in spread view now clamps in spread space.
3. **Spread halves overflowed the paper** in single view — `#page` now clips at trim.
4. Invalid CSS colour token in the page-number rule.

The v2.1 round (mobile + Mini Zine print mode) passed all 22 new tests on the first
run with no defects found.

The v4.0 round is a good illustration of why the suite exists — and of what tests
can and cannot tell you. Fifteen tests failed on the first run after the image engine
landed. Only **one** was an application bug: `.bak` files were still stamped `ver:3`
after the v4 model shipped, so a saved project would have misdescribed itself to any
future importer. Several were correctly stale (audio removed, bleed moved from ⅛″ to
3 mm, version bumped). But one cluster — pan, rotate handle, and resize all failing
at once — looked alarming and turned out to be **the tests' fault, not the app's**:
page 3 still held empty template placeholders from an earlier test, the photo's start
position had shifted, and so the drag now dropped it onto a placeholder. `endDrag`
correctly snapped the photo into that frame (real, separately tested behaviour), which
left the *next* test grabbing an empty frame instead of a photo. A further failure was
a drag test demanding a 1-inch move on a 2.75-inch page — the app clamped at the page
edge, exactly as it should. Both tests were rewritten to stage their own state
explicitly and to assert the clamp rather than trip over it. The lesson worth keeping:
a failing test is a question, not a verdict.

The v3.3 round caught a genuine defect in the test tooling itself: the fixture's Lua
base64 encoder used the widespread `gsub('...')` idiom, which matches only complete
3-byte groups and **silently drops the trailing 1–2 bytes**, emitting raw bytes where
padding belongs. The contract test failed at `atob`, exposing it. Fixed with a proper
tail-handling encoder, now covered by a test that checks every input length 1–40 and
the fixed vectors from RFC 4648 (`f`, `fo`, `foo`, `foob`, `fooba`, `foobar`).

The v3.1 round caught one real regression before render — the mobile toolbar's
`display:flex` rule was dropped during the safe-area CSS rewrite, which would have
hidden the toolbar entirely on phones; restored and covered by an explicit test.

The v3.0 round surfaced one real portability defect — `img.loading`/`img.decoding` set
as IDL properties don't reflect to attributes in all engines; switched to
`setAttribute`, which behaves identically everywhere — plus one test-fixture name
collision (two assets named `d.png`), fixed in the suite.

## Limits of this environment — the Lightroom plug-in

The plug-in's logic is tested on plain Lua and its output is verified against the real
ZineIt, but **Lightroom itself is not present in this environment**. The Lr-facing
files are syntax-checked and hold no untested logic, yet these depend on Adobe's APIs
and remain unverified until run in a real catalogue:

- `LrStringUtils.encodeBase64` behaving as a standard encoder (the fixture uses a
  reference implementation, verified byte-for-byte against Python's strict decoder);
- `photo:getRawMetadata('croppedDimensions')` / `getFormattedMetadata(...)` field names;
- export-dialog rendering and the `processRenderedPhotos` rendition flow.

A run against a real catalogue is required before shipping the plug-in to anyone.

## Limits of this environment

jsdom has no layout engine or real renderer, so pixel-perfect visual output, actual
print rasterisation, Google Fonts loading, and OS-level file dialogs were verified by
construction (exact-inch assertions on the print DOM) rather than by screenshot. A
quick human pass in Chrome/Firefox — open, drop a photo, make a spread, print preview —
remains the final gate before distributing copies.

## Latest raw run
See `tests/last-run.txt` (written on every run).
