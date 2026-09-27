# PROMPT.md — ZineIt v2.0 build record

This file documents the prompt and requirements that produced ZineIt v2.0, so the build
can be reproduced, audited, or extended.

---

## Full build prompt (v2.0)

> Update the zine and photobook builder with a stronger editing interface, better preview
> layout, improved image handling, and complete testing before rendering.
>
> **Text Editor tab** — all text used inside the zine editable from one place: zine title,
> page titles, captions, quotes, participant names, participant bios, reflections, project
> notes, credits, back cover text, copyright text, page number text, custom blocks. Each
> item shows page number, spread number, content type, editable field, live preview link,
> save status.
>
> **Double-page spread** — one photo spans two facing pages, aligned across the centre
> fold, centre fold guide, bleed across the gutter when enabled, safe-margin crop preview,
> crop adjustment without stretching, and a way back to single-page mode.
>
> **Facing page preview** — left and right pages always appear together, spreads never
> shown as isolated pages, preview reflects page flow, page number toggle.
>
> **Preview panel layout** — reduce preview size, centre it, enlarge the timeline, larger
> thumbnails, zoom controls (fit-to-screen, 100%, spread view).
>
> **Timeline** — page + spread thumbnails, page numbers, drag-and-drop reorder, selected
> highlight, double-spread / text / photo / audio indicators, empty page warning.
>
> **Image placement** — fix Shift+drag repositioning; quick drag placement; drag from
> library, timeline, and between frames; snap into layout frames.
>
> **Fit / Fill / Centre** — instant; aspect ratio always preserved; Fill crops, never
> stretches.
>
> **Resizing** — 8 handles (4 corners + 4 edges); resize crops, never stretches; photo
> stays centred unless repositioned; crop preview during resize; reset crop; reset frame.
>
> **Margins & guides** — margin / safe area / bleed / gutter / centre fold / grid guides,
> snap-to-guide, toggles; images stay inside margins by default, warning when crossed,
> controlled ⅛″ spill only when bleed mode is enabled, never accidental spill past the
> print-safe area.
>
> **Navigation** — next/previous page, next/previous spread, keyboard arrows, updates
> preview + timeline, never skips, never breaks on covers.
>
> **Page numbers** — separate toggles for preview and print export.
>
> **Deliverables** — GitHub repo, updated HTML (zine + photobook builders), PROMPT.md,
> README.md, CHANGELOG.md, testing report. Test the entire tool before rendering.

## Project requirements (carried through all versions)

- Fully local, standalone `index.html` — no build step, no server, works by double-click.
- Branding: **ZineIt by Storitellah** (storitellah.com); support via Ko-fi
  (ko-fi.com/kiberastories) and Patreon (patreon.com/c/kiberastories) icon buttons.
  (M-Pesa was part of v1.0–v3.0 and was removed in v3.1 at Brian's request.)
- Zine formats: mini zine (8-page one-sheet with fold/cut imposition), quarter,
  half-letter, A5. Photobook formats: 8×8, 8×10, 10×8, A4. Front + back covers always.
- Full-resolution photo import; drag/resize/reposition; PDF download and highest-quality
  print via the browser print engine (`@page` at exact trim size, margins none, 100%).
- Verified local backups (`.bak` passes a test restore before download), autosave,
  daily backup reminder, live clock, insertable date stamps.
- 40 Google Fonts with offline system-stack fallback; lively colour system with a
  neutral canvas so photographs read true.

## Version notes

- **v1.0** — core layout engine (inches → pixels at render time), formats, templates,
  snap grid, backups, print/PDF, mini-zine imposition.
- **v1.1** — colour system, 40-font picker, keep-aspect-ratio placement, lightbox,
  in-frame photo panning, architecture docs + Phase-2 sync API scaffold.
- **v2.0** — this build: facing-page spreads, double-page spread photos, Text Editor tab,
  enlarged timeline with reorder + indicators, zoom controls, 8-way resize with live crop
  ghost, guides & bleed system with margin warnings, full navigation, page-number
  toggles, page audio notes, v1→v2 migration, automated jsdom test-suite (43 tests).

## Feature list (v2.0)

Layout · spreads: single/spread view, centre fold guide, double-page spread photos
stored once and rendered on both pages (editor, preview, print, imposition), gutter
bleed, cross-fold element transfer while dragging.
Text: Text Editor tab (page, spread, content type, live preview link, save status),
13 content roles, zine title sync, add-to-cover.
Images: full-res import, library/timeline drag sources, drop-on-frame replacement,
snap-into-empty-frame, Fit/Fill/Centre, reset crop/frame, Shift-or-Alt-drag and Pan-mode
panning, 8-way resize, live crop ghost + crop % readout, lightbox.
Guides: margins, safe area, bleed, fold, grid, snap; bleed mode (hard clamp at trim when
off, exactly ⅛″ when on); margin-crossing warnings.
Navigation: page/spread buttons, arrow keys (navigate unselected, nudge selected),
timeline click, no skips, covers safe.
Timeline: 96 px thumbs grouped by spread, page numbers, drag-reorder, ⇔/▣/T/♪/empty
indicators.
Output: sequential print/PDF at trim size, page-number print toggle (covers skipped,
outer corners), 8-panel mini-zine imposition with fold instructions.
Data: autosave, verified .bak backup/restore, v1 migration, page audio notes
(editor-only).

## Known fixes in this build

1. **Shift+drag pan** — selection no longer rebuilds the page DOM on pointerdown
   (`updateSelectionDom` mutates classes/handles in place), so the pressed node
   survives and the pan drag tracks; a Pan-mode button gives a modifier-free path.
2. **Timeline crash on the cover spread** — painting spread halves dereferenced a null
   left page (`{left:null,right:0}`); found by the automated suite, guarded.
3. **Cross-fold transfer was dead code** — per-page clamping ran before the transfer
   check; dragging in spread view now clamps in spread space so elements can cross the
   fold and re-home to the facing page.
4. **Spread halves hung off the paper in single view** — `#page` now clips at the trim.
5. **Invalid CSS colour token** in the page-number style, corrected.

## Testing checklist (all verified — see TESTING.md)

Text Editor tab · double-page spread (make, render, print, unmake) · facing pages side
by side · reduced/centred preview with Fit/100%/± zoom · larger timeline · Shift+drag ·
quick drag placement · Fit / Fill / Centre · 8 resize handles · resize never stretches ·
crop ghost + reset · margin clamps and warnings · bleed exactly ⅛″ · guides · forward
and backward page/spread/keyboard navigation · page-number toggles (preview + print,
covers skipped) · zine preview · photobook preview · print DOM (8 pages) · imposition
(8 panels, 4 rotated) · backup round-trip + corrupt-file rejection · v1→v2 migration ·
zero console errors.

## Future improvement notes

- True PDF generation with embedded bleed + crop marks (page size = trim + 2×⅛″).
- Booklet imposition for quarter/half-letter/A5 (saddle-stitch page pairing).
- Undo/redo history (the single JSON document model makes snapshots cheap).
- IndexedDB autosave for very large photo sets (localStorage has a ~5 MB ceiling).
- Optional cloud sync via the Phase-2 API scaffold in `server/` (see
  `docs/ARCHITECTURE.md`).
- Text auto-flow between linked frames; per-role default styles.

---

## v2.1 build prompt (mobile + mini-zine print)

> Optimise the zine and photobook builder for mobile: fully responsive interface,
> mobile-friendly preview, touch drag and touch resize, swipe navigation between pages,
> tap to edit page blocks, a mobile toolbar, collapsible timeline and text editor
> panels, fit preview to screen, prevent layout overflow, keep facing pages readable,
> and allow switching between single-page, facing-spread, and fullscreen preview.
>
> Add a dedicated Mini Zine print mode: A4 and Letter layouts with a toggle, correct
> fold marks, correct cut marks, page order arranged for folding, print preview before
> export, browser print-to-PDF, and clear folding/cutting instructions. Export
> settings: A4/Letter, PDF export, show/hide fold guide, show/hide cut guide,
> include/hide page numbers, fit to paper, maintain margins, preserve image aspect
> ratios. Test mobile preview, touch controls, swipe navigation, both paper layouts,
> fold marks, cut marks, and PDF export before rendering.

### v2.1 version note

Delivered as above; see CHANGELOG.md for the feature breakdown and TESTING.md for the
65-test report (22 new tests, all green, no defects found in this round). Design
decisions worth knowing: the imposition is authored on a fixed 11 × 8.5″ design sheet
(4 × 2.75 by 2 × 4.25 panels) and mapped onto the chosen paper with one uniform
`scale()` — that is what guarantees "preserve image aspect ratios" by construction;
A4 output is therefore 97.3% size (limited by A4's shorter height). Swipe recognition
runs on pointer events with a 60 px horizontal / <50 px vertical threshold and yields
to element drags. The mobile breakpoint is 820 px, read from `window.innerWidth` so it
is testable in jsdom.

---

## v3.0 build prompt (memory, speed, formats, feedback)

> Recreate the zine to use less memory on the computer and on mobile and to always load
> photos fast. All formats of photos including HEIC should be read and imported by the
> tool. Also add an option on the tool that if anyone has experienced a bug or has any
> recommendation for improving the tool they should write an email to
> bryanjaybee@gmail.com. Create this as a new version.

### v3.0 version note

The memory problem was architectural: v1/v2 kept every photo as a base64 string inside
the project JSON — parsed at boot, re-stringified on every autosave, and rendered at
full resolution in the canvas, library, and timeline simultaneously. v3 splits storage
from display: originals live in IndexedDB as blobs (with an in-memory fallback for
private browsing), the UI renders 192 px thumbs and ~1600 px previews, and originals
are only decoded for print and the lightbox. Autosave shrinks from potentially tens of
MB to a few hundred KB; "load fast" falls out of the same design because the first
paint uses thumbnails already sitting in state. HEIC tries the browser's native decoder
first and lazily loads heic2any only on failure, so the app remains offline-capable for
every non-HEIC format. .bak files still contain everything (originals are embedded on
export), and v1/v2 autosaves and backups migrate in place. Feedback goes to
bryanjaybee@gmail.com via prefilled mailto links in the Support panel and view bar.

---

## v3.1 build prompt (mobile platform polish)

> Optimize the layout of the tool for mobile as well — to be used seamlessly on both
> Android and iOS mobile devices. The PC version works well; make version 3 mobile
> friendly and render it as an updated version. Remove the M-Pesa link. For Patreon
> and Ko-fi only use icons or buttons. Test the mobile version and fix all bugs
> before render.

### v3.1 version note

The v2.1 mobile shell handled layout; v3.1 handles the platforms. The fixes are the
unglamorous ones that decide whether a web tool feels native: safe-area insets so the
toolbar clears the iPhone home indicator, `100dvh` so Safari's collapsing address bar
doesn't eat the timeline, ≥16 px inputs so iOS stops zooming on focus,
`touch-action:manipulation` against double-tap zoom, suppressed tap highlights and
long-press callouts on canvas elements, `overscroll-behavior:none` against
pull-to-refresh, and pointer capture so drags survive the finger leaving the frame.
One bug was introduced and caught by the suite during the round (the mobile toolbar's
`display:flex` was lost in a CSS rewrite — restored), plus one test-expectation typo.
Support card: M-Pesa removed entirely; Ko-fi and Patreon became brand-coloured icon
buttons with accessible labels and no raw URL text.

---

## v3.2 build prompt (typography + production)

> Change the font of the tool to Bebas Neue & Source Sans Pro, and also make the tool
> production-ready.

### v3.2 version note

Typography: Bebas Neue is a caps-only condensed display face, so it takes the roles
where that shines — wordmark, panel headers, dialog titles — while Source Sans carries
every sentence. Google Fonts serves Source Sans Pro under its current name *Source
Sans 3* (same typeface, renamed by Adobe); the CSS stack lists both names plus system
fallbacks, and mono stays on numeric readouts where a display face would hurt
legibility. Production readiness focused on failure behaviour: guarded boot with a
readable fallback screen, global error/rejection handlers that toast once (throttled)
and route to the feedback email, a favicon so production logs stay clean, noscript,
a visible version badge for bug reports, aria-labels on icon-only controls, and
reduced-motion support. Deliberately not minified — Cloudflare compresses on the
wire and the single readable file is part of the tool's trust story.

---

## v3.3 build prompt (Lightroom Classic plug-in)

> Can you turn this tool into an Adobe Lightroom Classic plugin?

### v3.3 version note

The honest constraint shaped the design: Lightroom Classic plug-ins are Lua + LrView,
and LrView has no canvas, no webview, no drag-and-drop surface. ZineIt's editor cannot
live inside Lightroom, and a reduced imitation would be worse than the browser tool.
So the plug-in takes the half Lightroom is genuinely better at — selection, develop
settings, catalogue metadata — and hands off: render the selection, read IPTC captions,
place one photo per page at true aspect ratio, write a self-contained .bak, open ZineIt.

Structure follows testability: `ZineItProject` and `ZineItJson` import nothing from
Lightroom, so the layout maths and file format (where the real risk lives) run under
plain Lua 5.4 in CI. The .bak is streamed rather than assembled in memory — encode the
project, trim the closing brace, append each photo's base64 and release it — keeping
peak memory at one photo for a 40-photo book. The decisive test is the contract test:
a .bak produced by the plug-in's own Lua is restored by the real ZineIt in jsdom and
inspected end to end. It immediately earned its keep by catching a wrong base64
encoder in the fixture tooling.

Unverifiable here, and stated plainly in docs/LIGHTROOM.md and TESTING.md: Adobe's own
APIs (encodeBase64, croppedDimensions, metadata field names, the rendition flow) exist
only inside Lightroom. The plug-in needs one real-catalogue run before it ships.

---

## v4.0 build prompt (professional print application + brand guidelines)

> Update and expand the ZineIt tool into a professional zine and photobook layout
> application with stronger print controls, improved image positioning, ready-made
> templates, high-resolution exports, and a complete 16-page mini zine workflow.
> [Full brief: 16-page zine + wizard, folding/binding/mockup instructions, improved
> photo dragging and crop positioning, full-bleed A4, remove audio notes, rulers and
> print guides, colour profile controls, professional templates, high-resolution
> numbered JPG export, improved file naming, 3:2 photobook layouts, equirectangular
> panorama support, printmaker guide, PWA, plus brand guidelines document.]

### v4.0 version note

The brief is a product roadmap, not a task — six to ten weeks of work across ten
subsystems. Attempting all of it in one pass would have produced twenty half-features
and a tool that photographs well and fails on deadline. So v4.0 is Phase 1: the
foundation everything else sits on, shipped whole and tested, with the rest sequenced
honestly in `docs/ROADMAP.md`.

The centrepiece is the image engine. "Move it beyond the frame, enlarge it, rotate it,
crop it visually, never alter the original" is not a feature list — it is a different
data model. v3 stored `object-fit` plus `object-position` percentages, which cannot
express a photo that sits outside its frame at all. v4 stores a real transform:
displayed width in inches, offset from the frame centre, rotation. The frame becomes a
clipping mask; the photo is free. Fit, Fill, Centre, Reset Crop and Reset Frame all
fall out of that model as one-liners, which is the sign the model is right.

Typography came from the brand document, not from the previous release: Poppins
ExtraBold display, Poppins Bold headings, Inter UI, Source Serif 4 body, Manrope
captions — replacing v3.2's Bebas Neue/Source Sans. One accessibility decision worth
recording: Warm Yellow buttons carry **ink** text, not white, because white on #FFC43D
fails 4.5:1 and the guidelines ask for 4.5:1.

The 16-page zine is where domain knowledge matters more than code. The imposition has
an invariant — every sheet-side pairs to *pages + 1* — and the tests assert it, along
with "every page printed exactly once". The instructions say *flip on the short edge*
in bold because that is the mistake everyone makes once, and they say print a paper
mockup first because one sheet is cheaper than a ruined run.

Deferred deliberately, with reasons in the roadmap: rulers/guides, the template
library, colour profiles and soft-proofing (a browser cannot do a true ICC CMYK
conversion — Phase 4 will say so plainly rather than imply otherwise and cost someone
a print run), panorama books, mockups, printmaker guide, PWA.
