# Changelog — MakeZines by Storitellah

## v6.2.0 — 2026-09-25
New display typeface, a new MZ mark, and a direct link to *This is where we're from*.

### Changed
- **Display type is now DEVOTTE** — a hand-cut, all-caps face for the logo, the MAKEZINES wordmark,
  and every heading, title and tab (body text stays DM Sans). Subset to Latin and embedded as a
  16 KB WOFF2 so MakeZines stays a single offline file; declared across the full weight range so
  the browser never fakes a blurry bold. Generation 1970 is removed entirely.
- **New MZ mark** — a bold "MZ" built from DEVOTTE's own letter outlines (thickened with a rounded
  stroke, since the face ships in one weight): paper M, Butter Pop Z, Tomato Vinyl bar, on an ink
  tile. Regenerated favicon.svg/.ico, icon-192/512, apple-touch-icon, logo.png and the showcase assets.

### Added
- **"Made to support *This is where we're from*"** now links to https://thisiswherewearefrom.com/
  from the top of the page — a slim line under the wordmark on desktop (the header keeps its height)
  and under the project title on phones. The support-card heading and the showcase link there too.

### Fixed
- Header toolbar no longer hides tools at common desktop widths (1280–1920px): the title yields
  space first, labels switch to icons below 1560px, and the byline/version pill step aside when tight.

### Notes
- 242/242 tests pass (3 new: font swap without synthetic bold, the mission links, the MZ favicon).

## v6.1.0 — 2026-09-25
A modern, polished finish — and MakeZines now genuinely works on phones.

### Fixed — mobile layout
- **The app was wider than the phone.** The workspace's centre column was `1fr`, which in CSS grid
  can't shrink below its content, so the header's toolbar forced it to 835px on a 390px phone and the
  browser zoomed everything out (page off-screen, format picker clipped, 2 of 5 tab-bar buttons
  visible). The column is now `minmax(0,1fr)` and the header toolbar scrolls instead of overflowing.
  Verified at 11 sizes from a 320px phone to a 1920px desktop, including landscape phone and iPad.
- **Export did nothing on phones** — it switched a panel that is a hidden drawer on mobile. It now
  opens the export drawer.
- **The bottom tab bar couldn't close what it opened.** Tapping Photos or Tools again now closes the
  drawer, the open tab is highlighted, and the phone back button clears the highlight too.
- **Blank role dropdown after any cover template** — `cover-title` / `cover-byline` were missing from
  the role list. Added; every role now reads as a label ("Cover title", not `cover-title`).

### Changed — modern finish
- New additive `mz-modern` stylesheet layered over the base styles (base rules untouched):
  frosted-glass header, pill Export button, side panels grouped into rounded cards, a segmented tab
  control, consistent buttons/inputs/dropdowns with custom chevrons, one clear butter focus ring,
  a warmly lit dot-grid canvas "desk" with deeper page shadows, round selection handles, lifting
  timeline pages, blurred-backdrop modals that pop in, glass toasts, and native form controls
  (checkboxes, colour picker) that match the dark UI.
- **Phones:** drawers slide in as rounded sheets, a frosted tab bar with an active pill, every
  control at least 44px, landscape and notch safe areas handled, a trimmed header (logo · title ·
  undo/redo/pan · Export) with every other tool still reachable in the drawers and timeline.
- Showcase screenshots re-captured; the mobile shot now shows the real app.

### Notes
- 239/239 tests pass (4 new: tab-bar toggle, Export on phones, cover roles, overflow guard).

## v6.0.0 — 2026-09-11
**ZineIt is now MakeZines.** A full rebrand: new name, new identity, new type, new palette.

### Changed — identity
- **Name:** ZineIt → **MakeZines** throughout the app, icons, showcase, and README.
- **Logo:** the Z-book becomes the **M-zine** — a bold Generation 1970 "M" in paper over an open
  zine (butter left page, tomato right page) on an ink tile. Vectorised from the actual font;
  regenerated favicon.svg/.ico, icon-192/512, apple-touch, logo.png, and the showcase assets.
- **Type:** Poppins/Inter → **Generation 1970** (the mother font — all headers, titles, tabs,
  labels) + **DM Sans** (body/UI, with Manrope as alternate). Generation 1970 is subset and
  embedded as base64 WOFF2 (~46KB) so MakeZines stays a single offline file.
- **Palette → "Palette '70":** the Butter Pop + Tomato Vinyl anchors widened into a full seventies
  range — Avocado, Burnt Orange, Mustard, Rust, warm Ink `#1F1A17`, Cream `#F3E7CE` — with the UI
  greys warmed toward brown-black and a Butter→Burnt→Tomato→Rust sunset gradient. The content
  swatch set is now the eight-colour Palette '70.

### Compatibility
- Projects and templates saved by **ZineIt open in MakeZines unchanged** — the loaders accept both
  `MakeZines` and legacy `ZineIt` files. All internal identifiers, storage keys, and the domain are
  unchanged, so no user data is lost.

### Notes
- All 235 JS tests pass (brand/font/palette assertions updated for the new identity).

## v5.6.0 — 2026-08-13
UI declutter, new logo, simpler export, bigger workspace.

### Changed
- **New logo** — a bold **Z that opens like a book** (butter + tomato pages on an ink tile),
  replacing the open-mini-zine mark. Regenerated favicon.svg/.ico, all PNG icons, and the showcase.
- **"Selected" tab** now only appears when a photo or text is actually selected — clicking an
  element surfaces its Selection panel; deselecting hides the tab so the tab row stays uncrowded.
- **Bigger workspace** — larger default left/right panels and timeline, taller tab buttons. Anyone
  still on the old defaults is nudged up automatically; custom sizes are left alone.
- **README** fully redesigned around the Butter & Tomato brand and the new logo.

### Added
- **Download A5, A4, US Letter, and A3 mini-zine PDFs** — one click each, all 300 DPI, borderless.
- Two new template themes: **Bold poster** and **Duotone frames** (library now 11 themes + 12 covers + 8 backs).

### Removed
- The **Print & colour (for a print shop)** panel — export is simpler now.

### Notes
- Text aligns and snaps to the 0.125″ grid and edges exactly like photos (Grid/Snap toggles in Guides).
- Foldable A3/A4/Letter single-sheet zines, "Print the Zine", and the illustrated fold guide remain.
- All 235 JS tests pass.

## v5.5.0 — 2026-08-12
The "Butter & Tomato" rebrand.

### Changed — new brand palette
- Retired the old five-colour system (Warm Yellow `#FFC43D`, Teal, Coral, Indigo, Forest) for a
  focused two-accent palette: **Butter Pop `#F6D76B`** (primary accent, on dark) and
  **Tomato Vinyl `#B63A2B`** (action/secondary, on light), on Ink `#1A1A1A` and Paper `#F7F7F5`.
  Butter Pop passes 14.85:1 on Ink; Tomato Vinyl passes 5.79:1 (AA) on Paper — the palette is used
  accordingly throughout.
- Recoloured the logo (Butter Pop + Tomato Vinyl leaves, Paper spine on an Ink tile) and regenerated
  `favicon.svg`, `favicon.ico`, `icon-192`, `icon-512`, `apple-touch-icon`, `logo.png`, and the
  GitHub Pages showcase (`docs/`) — page, logo, favicon, and all three preview screenshots.
- Fold guide and alignment guides brought on-palette (fold = Butter, cut/guides = Tomato, arrows = Ink).
- Teal / Indigo / Forest are kept as **user content swatches** for backwards compatibility; only the
  brand/UI surfaces changed.

### Changed — copy
- Support line: "Keep independent photo stories alive" → **"Made to support *This is where we're from*"**
  (a photography project, @thisiswherewearefrom).
- Removed the Resolution / Black text / Deep backgrounds / Bleed print-help rows; kept the honest
  CMYK/ICC note that points to Affinity Publisher / Scribus for print-shop conversion.

### Notes
- All 235 JS tests pass. Verified in a real browser: boots clean, imposition preview (A3/A4/Letter)
  renders with correct 180° top-row rotation, illustrated "How to fold" guide displays.

## v5.4.1 — 2026-08-03
Two flipbook fixes.

### Fixed — zoom now actually scrolls
- The reader preview wouldn't scroll when zoomed in. The book element was clamped by
  `max-width/height`, so it never grew past the stage and there was nothing to scroll to; the
  centred grid also clipped any overflow. The book now enlarges freely and the stage uses safe
  centring, so it stays put and scrolls to reach every part when zoomed. **Verified in a real
  browser: no scroll at fit, scrolls when zoomed, no scroll back at fit.**

### Changed — the phone QR opens the flipbook directly
- The QR now deep-links to `zineit.app/?read`, and the app opens **straight into the flipbook
  reader** when that parameter is present (also accepts `#read`). Previously it opened the app's
  editor. The QR is regenerated and **decode-verified** to resolve to `https://zineit.app/?read`.

## v5.4 — 2026-08-01
The flipbook grows up — double-page spreads, zoom, and a phone QR — plus an attractive
GitHub Pages showcase and a rewritten README.

### Added — double-page flipbook view
- The reader now shows **two facing pages at once**, like a real open book — cover alone,
  then facing pairs, back cover alone. Toggle **Single / Double** in the reader header.

### Added — zoom, and scroll only when zoomed
- Zoom the reader in and out (or **Fit**). The preview **scrolls only when you've zoomed past
  fit** — at fit it stays put and centred, exactly as it should.

### Added — QR to read on your phone
- A **QR to phone** button shows a scannable code that opens ZineIt on a phone. The code is a
  standard, **decode-verified** QR for zineit.app, pre-generated and inlined so it's tiny and
  guaranteed to scan (no shaky in-browser encoder).

### Removed — the “Open a zine” file path
- ZineIt doesn't read external PDF zines, so the misleading **Open a zine** button and its
  file picker are gone. The reader renders **your current project**, which is what it's for.

### Timeline
- Left exactly as it was, as requested.

### Added — GitHub Pages showcase + README
- A polished **landing page** (`docs/`) with real app mockups, on-brand styling, feature
  cards, a flipbook section, a mobile section and a quick-start — deployed to **GitHub Pages**
  via a new Actions workflow. The **README** is rewritten with badges, a screenshot, quick
  start, print guidance, shortcuts and roadmap links.

### Tested
- 231 automated jsdom tests + 22 Lua tests, all green (5 new / updated: single vs double-page
  slotting, clamping at the ends, scroll-only-when-zoomed, the inlined QR, and the removal of
  the file-open path). The double-page render, zoom-scroll behaviour and the QR were verified
  in a real browser — and the **QR was decode-checked to resolve to zineit.app**.

## v5.3 — 2026-07-31
The transparency workflow, done properly — plus an honest roadmap for the larger feature
request that landed with it.

### Fixed / added — PNG transparency, end to end
- **Transparent PNGs now behave correctly through the whole workflow**, and this is verified
  at the pixel level, not just asserted. On import, the alpha channel is auto-detected and the
  file is kept as PNG (never matted onto white), so logos, watermarks, signatures, stickers
  and icons render with no background — in the editor and in export — and overlay photographs
  without hiding them.
- **Transparency checkerboard (editor only).** A new toggle shows a faint checkerboard behind
  transparent graphics so you can *see* the transparency and tell it apart from white paper.
  It never prints and never exports — export draws pixels only.
- **Transparent PNG page export.** A page can now be exported as a PNG with a genuinely
  transparent background (alpha=0 in empty areas — pixel-verified), for overlays and artwork
  proofs. JPG and PDF exports keep their flattened white paper, and the project itself stays
  non-destructive throughout.

### Added — a written roadmap
- A detailed feature specification arrived with this release (a dedicated Artwork layer type,
  ~12 paper sizes, a full A3 workflow, 15 print presets, ~19 layouts, 15 template collections,
  a resizable timeline, a deeper mobile pass, demo assets, GitHub Pages CI, and a performance
  pass). That is many releases of work. Rather than half-build all of it, this release lands
  the **top-priority transparency item completely and correctly**, and `docs/ROADMAP.md` now
  tracks the rest honestly — what's shipped, what's partially there, and what's sequenced next
  — so nothing is silently dropped.

### Tested
- 228 automated jsdom tests + 22 Lua tests, all green (4 new: the no-matte + checkerboard CSS
  contract, the checkerboard toggle, the conditional white-fill for transparent export, and
  the auto-alpha import wiring). Transparent export was additionally pixel-verified in a real
  browser (corner alpha = 0), and the checkerboard confirmed to produce real light/dark
  variation behind a graphic.

## v5.2 — 2026-07-23
A real one-click PDF, a flipbook reader, print-shop colour guidance, and the tool's proper
name in the header.

### Added — one-click A4 mini-zine PDF
- **Download now gives you a real PDF**, not a trip through the print dialog. It renders the
  imposed 8-panel sheet at a true **300 DPI** from your original photos, wraps it in a valid
  PDF by hand (no heavy library — the app stays one small file), and saves it **named after
  your project**. A4, borderless, ready for the printer. The old print-dialog route is still
  there as a secondary option.

### Added — flipbook reader
- A new **Read (flipbook)** tab pages through your zine like a real book — tap the right or
  left half of a page to turn it, or use the arrow keys. Read the project you're designing,
  or open image pages to read. (Reading arbitrary **PDF** files needs a PDF engine that
  would bloat the single file, so that runs on the hosted app at zineit.app; offline, the
  reader handles your current project and image pages.)

### Added — print & colour guidance (honest about CMYK)
- A new **Print & colour** panel spells out what a print shop needs: **300 DPI**, **standard
  black** (K100) for crisp text, **rich black** (≈C75 M68 Y67 K90) for deep fills, and
  **bleed** (now with a **0.125″** option alongside 3 mm and 5 mm).
- On CMYK: browsers are RGB-only and can't apply a print ICC profile accurately, so rather
  than fake it, ZineIt exports clean 300 DPI RGB and tells you exactly how to convert to
  **Coated GRACoL 2006 (ISO 12647-2)** or **FOGRA39** in a real prepress tool (Affinity
  Publisher, Scribus, Acrobat). You get a correct, bleed-ready file to start from.

### Fixed — transparent graphics
- Toggling a placed photo to **Transparent graphic** now **rebuilds it from the original**
  so real transparency comes back, instead of keeping a matted JPEG preview. Transparent
  graphics show with no background in the preview and in export. (Graphics added via
  **+ Graphic / QR** were already transparent; this fixes the toggle path.)

### Changed — the tool is “Zineit by Storitellah”
- The header now reads **ZineIt · by Storitellah**, with **Storitellah** linking to
  storitellah.com.

### Already there (worth knowing)
- **Free placement**: on a blank page, photos drop exactly where you release them — you only
  get snap-in frames when you choose a template layout.
- **Double-click text** opens it in the Text editor.
- **Interactive imposition**: the mini-zine sheet has a live preview that updates as you
  change paper, fill/fit and fold/cut options.

### Tested
- 224 automated jsdom tests + 22 Lua tests, all green (10 new: the PDF builder's validity
  and A4 sizing, the imposed-sheet DPI math, flipbook navigation and its offline-PDF
  refusal, the byline link, the CMYK/print panel, the 0.125″ bleed, and the transparent-
  toggle re-ingest). PDF output, the 300 DPI sheet, the flipbook and double-click text were
  additionally verified by rendering the app in a real browser.

## v5.1 — 2026-07-23
The official logo becomes the icon, and the layout is tightened on both phone and desktop.

### Changed — new logo and favicon
- ZineIt now wears its **real logo** — the folded-Z booklet with the orange page edges and
  the dotted "i" — in the browser tab, the home-screen icon and the app header. Generated
  at every size (`.ico`, 180/192/512 PNG, plus an SVG that wraps the artwork) and checked
  for legibility down to 16px. The header shows the logo beside the wordmark.
- **New purpose-designed icon (final):** an open mini-zine standing like a little tent —
  a warm-yellow leaf and a teal leaf meeting at a paper-white spine, with a coral inner page
  peeking out (a nod to the single cut that makes a zine). It sits on the ink rounded tile,
  so it is self-contained and reads on any tab or home-screen colour, light or dark, right
  down to 16px. This replaces the earlier letter-derived marks: it shows what the app makes,
  not just its initial. Regenerated across `.ico` (16/32/48), 180/192/512 PNG, the inline
  SVG favicon and the header mark.

### Fixed — mobile preview centring
- On phones and tablets the page preview **now sits centred by default**, both across and
  down. The old layout pinned an over-sized page to the top-left corner (a CSS grid +
  overflow quirk); it now uses safe centring with auto margins so a small page centres and
  a large one still scrolls without being clipped.

### Fixed — the timeline aligns to the screen
- Tapping **Timeline** on a phone or tablet now re-fits the canvas into the space that is
  actually left, keeps the current page **clear of the timeline instead of behind it**, and
  centres the timeline's pages when they fit the screen (scrolling only when they don't).
  The current spread scrolls itself into view when the rail opens.

### Fixed — right-panel tabs no longer truncate (desktop)
- **Selected · Page · Layers · Guides · Export** now show their full names. A stray
  duplicate font-size was forcing the labels to 14px and clipping them with an ellipsis;
  the text now scales to fit the tab. The two side panels were rebalanced (left 268px,
  right 312px) so both read cleanly by default.

### Tested
- 216 automated jsdom tests + 22 Lua tests, all green (6 new: the header logo, the favicon
  swap, canvas safe-centring, the rail re-fit + space reservation, full tab labels, and
  panel balance). Layout changes were also verified by rendering the app on desktop and
  mobile viewports.

## v5.0 — 2026-07-22
Mobile becomes a first-class platform, panoramas get a real system, and the mark on the
tab is finally a zine instead of a letter.

### Added — mobile platform layer (iOS, Android, Chrome/Safari/Brave)
Not a set of breakpoints bolted on — a layer that knows which device it is on.

- **iOS:** the layout now uses the *real* viewport height (`--vh`, and `100dvh` where
  supported), so it stops hiding behind Safari's collapsing address bar. Double-tap
  page-zoom is suppressed over the canvas so it no longer fights ZineIt's own gestures.
  Tap highlight, input styling and momentum scrolling are normalised.
- **Android:** the **back button (gesture or hardware) now closes whatever is open** —
  the topmost modal first, then a drawer, then the timeline rail — instead of throwing
  you out of the app mid-layout. Pull-to-refresh no longer fires mid-drag.
- **Both:** modals become **bottom sheets** with a grab handle and sticky, thumb-sized
  buttons; the crop window goes genuinely full-screen; **every tap target meets the 44px
  floor**; two-finger **pinch zooms the whole page view**; hover-only affordances are
  dropped on touch devices.

### Added — panorama photobook system
The last big item from the v4 roadmap. A panorama is not just a wide photo: the fold
physically swallows a strip of it, and a face landing in the gutter is destroyed. This
makes those facts visible and gives you the three placements that actually exist.

- **Detection and classification** — 2:1, 3:1, 4:1, and **equirectangular 360°** (spotted
  by ratio plus resolution).
- **Across one spread, gutter-aware** — the photo is widened by exactly the gutter, so the
  fold consumes *spare* pixels rather than your composition.
- **Split across 2–8 pages** — one continuous photograph, each page showing its own window,
  stepping by exactly one page width: no repeats, no gaps. Slices stay bound as a group and
  nudge together.
- **Wraparound cover** — one photo running across the back cover, the spine and the front.
- **Configurable gutter** in millimetres; every placement respects it.
- **Honest warnings** — real DPI at the printed size (not the file's pixel count), a plain
  "this isn't really a panorama" for near-square photos, how many mm the fold takes, and a
  note that a 360's seam belongs at the outer edge, never at the fold.
- As everywhere in ZineIt, **a panorama cannot be stretched**: the model stores photo width
  only, so height always derives from the photo's own ratio.

### Changed — new icon: the zine cutout
The favicon was a generic letter **Z** in colours that were not even the brand palette. It
is now the thing the tool actually makes: a sheet of paper with the **Warm Yellow fold**,
the **Coral single cut** that turns one sheet into eight pages, and a Teal corner caught
mid-fold. Rebuilt at every size (`.ico`, 180/192/512 PNG) and checked for legibility at
16px. A stale second icon link that would have silently won by being later was removed, and
a test now guards against a duplicate returning.

### Added — hosting guide for `zineit.app`
`docs/ZINEIT-APP-DOMAIN.md` walks through registering and attaching the domain, including
the trap specific to `.app`: it is **HSTS-preloaded at the TLD level**, so there is no
`http://` fallback at all and a still-issuing certificate looks like a hard failure rather
than a warning. Cost: the domain (~US$14–20/yr); hosting and TLS are free.

### Android APK — still cannot be compiled here, and I checked again
`java` is present, but there is **no Android SDK, no Gradle, and `dl.google.com` returns
HTTP 403**. What ships is the complete, branded Capacitor 6 Android Studio project plus
`docs/ANDROID-BUILD.md` and `docs/APK-SIGNING.md`. On your machine it is
`npm run android:debug` — about ten minutes. You have to run and sign it yourself in any
case, since the signing key is yours and must never leave your hands.

### Tested
- 210 automated jsdom tests + 22 Lua tests, all green (11 new: panorama detection,
  gutter-aware spread, split continuity, group nudge, wraparound geometry, warning
  honesty, configurable gutter, platform detection, back-button layer unwinding, and the
  mobile CSS contract).

## v4.6 — 2026-07-19
Backups now adapt to the size you are working in — and any project can be re-fitted to any
format.

### Added — format-adapting restore
- **Restoring a .bak of a different size now offers to adapt it.** Working in the A4 mini
  zine and restoring an A5 backup? One click re-fits the whole design to A4: every frame,
  text box and guide scales to the new page, type scales by the geometric mean so it reads
  the same, and the print is preset to the format's native paper. Or restore it untouched
  in its original size — your choice, stated plainly in the dialog.
- Works for **every format pair** (zines, photobooks, minis), and for **light backups** too,
  since they restore through the same path.
- **Photos cannot stretch during conversion — by construction.** ZineIt stores only the
  photo's width; its height always derives from the photo's own ratio. A conversion scales
  the frame, and the photo re-sits inside it at its true proportions.
- A **guard** blocks impossible adaptations honestly: a format fixed at 8 pages will not
  accept a 12-page backup — the dialog says exactly why, and the backup restores in its
  original format instead. Nothing is silently discarded.

### Changed — the format switcher can adapt in place
- Changing format used to mean starting over. Now it asks first: **adapt the current
  design to the new size** (undo-able), or start blank. The toolbar and panel format menus
  share one path, and both stay in sync when you cancel.

### Tested
- 199 automated jsdom tests + 22 Lua tests, all green (5 new: geometry scaling A5→A4,
  the photos-cannot-stretch proof, the fixed-count guard, a full adapt-and-validate round
  trip into the A4 mini zine, and the no-op/unknown-format edges).

## v4.5 — 2026-07-19
The A4 mini zine becomes native and truly borderless, and double-clicking text opens the
Text editor.

### Fixed properly — the A4 white border, at the root this time
v4.4 added Fill mode, which scales the US-Letter-proportioned sheet to cover A4 — better,
but still a compromise: the proportions never matched, so something always cropped or
banded. v4.5 fixes the geometry itself:

- **New format: Mini zine — 8-page A4, one sheet (borderless).** Its 8 panels are exactly
  74.25 × 105 mm — four across, two down **is** an A4 landscape sheet. Printed at 100%:
  scale 1.000000, zero white band, zero cropping, nothing to trim. Verified in the test
  suite to a thousandth of an inch.
- **It is the default.** New projects open in the A4 borderless mini zine, full-bleed, with
  the print already set to A4 paper — design on it and print it, and the sheet leaves the
  printer finished.
- Each format now knows its native paper: the A4 zine prints on A4, the US Letter zine
  (still available, now labelled clearly) on Letter.
- Fill mode also now explicitly ignores the ¼″ margin option — borderless means borderless.

### Added — double-click a text box to edit it
- **Double-clicking any text on the page opens the Text editor with exactly that text
  focused** — highlighted, scrolled into view, caret ready at the end. The matching photo
  gesture (double-click → crop window) has been there since v4.2; text now behaves the
  same way.

### Tested
- 194 automated jsdom tests + 22 Lua tests, all green (4 new v4.5 tests, incl. the
  panel-grid-equals-A4 proof and the double-click contract).

## v4.4 — 2026-07-19
Borderless A4 printing, readable tab names, a font picker that shows the fonts, and an
illustrated fold guide.

### Fixed — the white border you kept trimming
- **Fill the paper (borderless)** is the new default for the mini-zine print. The design
  sheet now scales uniformly to **cover** A4 / Letter / A3, so the sliver of bleed runs off
  the paper edge instead of leaving white bands — **nothing to cut before folding**. Photos
  still keep their exact aspect ratios; nothing is ever stretched.
- The Scale control says exactly what each choice does: **Fill** (borderless), **Fit**
  (white margin, trim after — the old behaviour), and **100%** (exact size). The preview
  reports the numbers honestly — e.g. "Fit leaves a white 12 mm band on each side of A4" or
  "Borderless: 4.2 mm runs off the top and bottom — that is the bleed doing its job."
- **A3 paper** joins Letter and A4.

### Changed — the tabs now say what they are
- The right-panel tabs were icon glyphs (⌗ ▤ ▦ ⋈ ↥) that nobody could read. They are now
  **named**: **Selected · Page · Layers · Guides · Export**.
- **Autosave and the clock moved to a footer pinned to the bottom of the panel**, visible
  whichever tab is open — not buried inside one tab.

### Added — a font picker that previews the fonts
- The font control is now a proper picker: the button shows the current font **in its own
  typeface**, and the menu lists **every font rendered as itself**, with a category tag
  (sans / serif / mono / hand) and a search box. Choosing a font routes through the same
  change path as before, so nothing else moved.

### Added — illustrated "How to fold" guide (inspired by Dirty Little Zine)
- The folding instructions were buried in a collapsible text list. They are now a proper
  **✂ How to fold** window with **six drawn step diagrams** — long fold, short fold, doors
  inward, the one cut, push the ends, collapse — right where you print.

### Looked at: Dirty Little Zine (dirtylittlezine.com)
Compared feature-for-feature. ZineIt already covers its core (8-page one-sheet imposition,
contain/cover photo fit, captions, 300 DPI JPG + PDF, offline, nothing uploaded). What it
had that ZineIt lacked — an in-app illustrated fold guide, paper-size choice including A3,
and truly borderless output — is all in this release.

### Tested
- 189 automated jsdom tests + 22 Lua tests, all green (7 new v4.4 tests).

## v4.3 — 2026-07-18
The cover-template library, transparent graphics, a fixed export, and a light backup that relinks.

### Fixed — export fidelity (important)
- **Text colour now exports.** The print/PDF path was hardcoding near-black and ignoring
  your chosen colour — so a coral heading printed black. It now uses the element's real
  colour everywhere: screen, print/PDF, and the 300 DPI JPG export all agree.
- **Hidden text layers no longer print.** A layer you hid on screen was still appearing in
  the print/PDF export. Now hidden means hidden, in every output.
- Text also gets the same inner padding in print as it has on screen and in the JPG export,
  so nothing shifts between preview and paper.

### Added — cover-template library
- A dedicated **Front cover…** and **Back cover…** browser with a **large, centred preview**
  that holds your true page proportions and scales to the screen — on desktop the preview
  sits beside the list; on a phone it moves to the top and the list becomes a swipe strip.
- **12 front-cover designs**: full-bleed photo, photo plate + title band, minimal title,
  big typography, split image/title, magazine, photo grid, documentary, fine-art,
  youth/community, black & white, and a panorama band.
- **8 back-cover designs**: summary + byline, closing photo, logo + contact, supporter
  logos, contact card, QR + link, colophon, and solid colour.
- Covers inherit your project's fonts and accent, pull the title from your project name,
  and **keep your existing photos and text**, re-flowing them into the new layout. Front
  applies to the first page, back to the last.

### Added — transparent graphics (QR codes, logos, PNGs)
- **+ Graphic / QR (transparent)…** imports PNG/SVG/WebP/GIF and **keeps the transparency**
  all the way through — preview, thumbnail and export are PNG, never flattened to a white
  box. Drop a normal transparent PNG in and ZineIt detects the alpha automatically.
- Graphics are placed **contained** (the whole mark is visible) with **no matte**, and a
  **Transparent graphic** toggle in the inspector converts any image to a graphic (or back).
- Transparency is preserved in the print/PDF output and composites correctly over photos in
  the 300 DPI JPG export.

### Added — light backup + relink (small files)
- **Save light backup (references photos)** writes a **kilobyte-sized** file: your full
  layout plus a fingerprint of each photo (name, byte size, dimensions) — but not the pixels.
- **Relink photos…** reconnects those photos from disk by matching the fingerprints, so as
  long as the originals are on the same computer you get everything back. Restoring a light
  backup offers to relink straight away. Your originals are never modified.
- The original **full .bak** (everything embedded, verified by a test restore) is unchanged
  and still the one-file option.

### Tested
- 182 automated jsdom tests + 22 Lua tests, all green. New coverage: the export-colour and
  hidden-layer regressions, every cover/back recipe, transparent-graphic detection and
  rendering, and the light backup + relink matching.

## v4.2 — 2026-07-18
A user-experience pass across the whole tool: clearer toolbar, a real crop window,
rulers and draggable guides, and a pan toggle that stays put.

### Added — crop editor window
- **Double-click any placed photo (or press ✂ Crop photo…) to open it in a dedicated
  window.** A large working view of the photo inside its frame, with the cropped-out
  area shaded and the whole-photo boundary marked.
- **Everything a crop needs, in one place:** Fit / Fill / Centre, a zoom slider and
  buttons, a straighten slider (−45°…45°) plus 90° rotate, **flip horizontal and
  vertical**, a rule-of-thirds grid, and Reset.
- **Non-destructive by construction.** The window edits a *working copy* of the photo's
  transform. Nothing is written back until you press **Apply**; **Cancel** discards
  everything, and your original file is never touched. Keyboard: F fit, ⇧F fill, C
  centre, Enter applies, Esc cancels.
- **Flip is now a first-class transform** — it survives save/restore and renders
  identically on screen, in print, and in the 300 DPI JPG export.

### Added — rulers & draggable guides
- **Inch rulers** along the top and left of the canvas (toggle in Guides & bleed).
  They track the zoom.
- **Drag from a ruler onto the page to drop a guide; drag a guide off the page to
  remove it.** Add horizontal/vertical guides from buttons, or clear them all.
- Guides are teal, become **snap targets** (along with page edges, margins and element
  centres) when object-snapping is on, and **never print or export** — they are for
  your eye only.

### Changed — toolbar & layout
- **Toolbar buttons now carry text labels**, not bare icons — Undo, Redo, Add page,
  Spread, Templates, Pan, Focus, Preview. Nobody has to guess what “+” means. Labels
  collapse to icons only when the window is genuinely narrow.
- **Export stands alone** — its own yellow button in its own corner, separated from the
  editing tools.
- **The clock and the autosave indicator moved out of the header** and into a status
  strip at the bottom of the Page pane, under the Layout system.
- **Pan mode is a proper toggle** in the toolbar (and still in Properties); both stay in
  sync, and the cursor changes to a grab hand while it is on.
- Clicking an element selects exactly what is under the cursor and **never reorders the
  stack** — whatever you click is what you edit, and nothing else on the page moves.

### Tested
- 163 automated jsdom tests + 22 Lua tests, all green. New coverage: the crop window's
  working-copy/apply/cancel contract, flip across every render path, rulers & guides
  state and the guarantee that guides never print, the labelled toolbar, the standalone
  Export, the pan toggle, and the relocated clock.

## v4.1 — 2026-07-17
The one-window workspace. **Phase 2 of the v4 brief**, plus the PWA and the Android
build project from Phase 6 — see `docs/ROADMAP.md` for what is still open and why.

### Added — one-window workspace
- **The right panel is no longer one endless scroll.** It is five tabbed panes —
  Properties, Page, Layers, Guides, Export — and only one is on screen at a time. This
  was the main objective of the release and the thing the brief actually complained about.
- **Compact top toolbar** (44px): undo, redo, page size, add page, add spread,
  templates, zoom out/fit/in, focus mode, preview-only, reset workspace, save status,
  export. Icons with tooltips, no oversized labels.
- **Compact project title** — a click-to-edit field in the toolbar. It truncates
  visually with an ellipsis, shows the full title on hover and on focus, and **never
  truncates the title that is actually saved**.
- **Resizable, collapsible panels.** Drag the left panel, the right panel or the
  timeline. Collapse any of them. The arrangement is saved to local storage and comes
  back next time. There is a reset button when it all goes wrong.
- **Focus mode** hides both side panels; **preview-only** leaves just the pages.
  **Esc always gets you back** — it is now checked *before* the typing guard, so it
  works even when a field has focus.

### Added — layers
- **An Illustrator-style layer stack per page**, front to back, with type icons in the
  brand palette: photo, empty frame, panorama/spread, text, caption, page number.
- Select, **rename** (double-click), **drag to reorder**, bring to front, move forward,
  move backward, send to back, duplicate, delete.
- **Hide** and **lock**. Hidden layers are skipped on the canvas, in the print path and
  in the 300 DPI export — but **stay in your file**. Hiding is not deleting. Locked
  layers cannot be dragged by accident.
- Renaming a layer never touches the photo record.

### Added — undo / redo
- 60 steps. `Ctrl/⌘ Z`, `⇧` to redo, `Ctrl/⌘ Y` as well. The buttons disable themselves
  when there is nothing to do.
- **Snapshots the project, never the photographs.** Photos live in IndexedDB and are
  never rewritten, so undo is both honest and cheap. A fresh edit clears the redo branch
  rather than corrupting it.

### Added — text colour system
- Colour picker, HEX input with forgiving parsing (`#FFC43D`, `ffc43d`, `#fc3` all work;
  junk is refused with a reason), live RGB readout, recent colours, and the seven brand
  presets.
- **Apply by scope**: this text, this page, this spread, or the whole publication —
  matching **by role**, so recolouring every title leaves the captions alone.

### Added — platform
- **PWA**: `manifest.webmanifest` and a network-first service worker. Installable,
  offline-capable. **Skipped entirely on `file://`** — the manifest link is removed and
  the worker never registers, so double-clicking the file gives no 404 and no console
  error. The single-file case remains the primary one.
- **Android build project**: a complete, branded Capacitor 6 Android Studio project
  (`android/`), package `com.storitellah.zineit`, adaptive icon (yellow Z on Ink Black)
  at every density, Ink Black splash, minSdk 22 / target 34.
  **One permission: `INTERNET`.** No contacts, call logs, microphone, location,
  background services — and deliberately **no photo-library permission**, because photos
  arrive through the system picker one explicit tap at a time.
  `npm run android:debug` builds it in about ten minutes.

### Fixed
- **The Guides & Bleed hint still said "controlled ⅛″ spill"** after v4.0 moved bleed to
  3 mm / 5 mm — in the hint *and* in the toast. Both now track the real setting live.
  (Caught from a screenshot, which is a fair reminder that prose goes stale too.)
- **The timeline's resize handle was being eaten** by `renderTimeline`'s `innerHTML`
  reset on every render.
- **Esc was swallowed by the typing guard**, so it would not leave preview or focus mode
  while a field had focus.

### Not in this release — stated plainly
- **There is no compiled APK.** The build environment has Java but no Android SDK, and
  `dl.google.com`, `maven.google.com` and `services.gradle.org` are all blocked (HTTP
  403) — `./gradlew` cannot even download Gradle. The project is complete and real; the
  ten-minute compile is yours. See `docs/ANDROID-BUILD.md`.
- **A signed release APK needs your developer signing key.** It is not mine to make.
  See `docs/APK-SIGNING.md`.
- **Rulers, draggable guides, the dedicated crop editor modal, the equirectangular
  panorama system and the front/back cover template library are not built.** They are
  sequenced in `docs/ROADMAP.md` rather than half-shipped. A double-page spread already
  spans the fold without stretching; panorama-*aware* tooling is what is missing.

### Testing
- **153 app tests + 22 Lua tests, all passing.** New coverage: the tabbed right panel;
  every toolbar and panel control present; the compact title never truncating the saved
  value; panels resizing, collapsing, persisting and resetting; focus and preview-only
  with Esc; the bleed hint tracking millimetres; the layer stack order, reorder,
  hide-is-not-delete, lock-stops-drag, rename-does-not-touch-the-photo; undo/redo
  walking the project without ever rewriting a photograph, and clearing the redo branch
  on a new edit; hex parsing, brand presets, and scope-by-role recolouring.
- Three real bugs were caught by these tests before release — the wiped resize handle,
  the swallowed Esc, and a call to a `fitScale()` that never existed.

## v4.0 — 2026-07-16
Brand system, a real image engine, the 16-page zine, and high-resolution export.
**Phase 1 of the v4 brief** — see `docs/ROADMAP.md` for what is sequenced next and why.

### Added — non-destructive image engine (the heart of this release)
- **The frame is now a clipping mask.** A photo may be moved anywhere — including far
  outside its frame — scaled beyond it, or rotated, and only the part inside the frame
  prints. The behaviour photographers expect from Illustrator, InDesign, or Fundy.
- **The original is never altered.** Crops, zooms and rotations live in a transform
  (`{w, ox, oy, rot}` in inches and degrees) attached to the element, not baked into the
  photo. Every crop is reversible, always.
- **Fit / Fill / Centre / Reset Crop / Reset Frame**, each instant, with keyboard
  shortcuts **F**, **⇧F**, **C**, **R**, **⇧R**. Centre keeps your zoom; Reset Frame
  restores the template frame the photo came from.
- **Zoom** by scroll wheel or two-finger pinch; **rotate** by handle (⇧ snaps to 15°)
  or 90° buttons; eight resize handles crop the frame without ever stretching the photo.
- v3 projects migrate automatically: `object-position` percentages and `object-fit`
  become an equivalent transform, with the photo left exactly where it was.

### Added — template library
- **Nine templates**, each answering for all **eleven page types** (cover, intro, single,
  two-photo, three-photo, grid, caption, quote, full bleed, closing, back cover): Blank —
  still the default — plus Minimalist editorial, Documentary essay, Photojournalism,
  Magazine, Travel journal, Contact sheet, Portfolio and Newspaper, the seven named in the
  brand guidelines.
- **Recipes are page-relative**, written in fractions of the content box rather than
  inches, so one recipe lays out correctly on a 2.75in mini zine and a 12in photobook.
  Type scales with the page instead of staying stranded at one size.
- **Template browser** with live previews drawn from the real recipes; apply to this page,
  selected pages, or the whole zine — which assigns cover, intro, closing and back cover
  automatically and cycles the body through the remaining types.
- **Replace without losing work.** Photos re-flow into the new frames in order at their
  true aspect ratio; photos the new layout has no room for are kept rather than deleted;
  text carries across by role, so a quote stays a quote.
- **Custom templates**: save the current page as a template, duplicate any template
  including the built-ins, export to JSON and import back. Stored locally; junk files are
  refused rather than half-loaded.
- **Text colour** is now part of the model — rendered on canvas, in print, and in the
  300 DPI export.

### Added — print and export
- **16-page saddle-stitch mini zine**: fixed 16-page format, correct imposition across
  four duplex sheets, **reading-order and print-order previews**, and fold/staple/
  stitch/trim instructions. Full guide in `docs/MINI-ZINE-GUIDE.md`.
- **Full-bleed A4** zines, portrait and landscape — edge to edge by default, margins
  still available on request.
- **Bleed in millimetres**: 3 mm default, 5 mm option (replaces the ⅛″ assumption).
- **3:2 and 2:3 photobook formats.**
- **Download all pages as high-resolution JPGs**: rendered at a true **300 DPI** from
  your *original* photos, not the screen previews, with the same clipping and transform
  the editor shows. Numbered in reading order (`Project-Name_001.jpg`), spreads
  numbered separately (`_Spread-001.jpg`), optional single-ZIP packaging via a
  dependency-free store-only archive.
- **File naming scheme**: exports as `Title_Made with ZineIt_Date_Time`, backups as
  `Title_ZineIt_Date_Time`, sanitised for every filesystem, with an optional suffix.

### Changed
- **Brand system applied from the official guidelines**: Ink Black, Paper White and
  Warm Yellow with teal/coral/indigo/forest secondaries; Poppins ExtraBold wordmark,
  Poppins Bold headings, Inter UI, Source Serif 4 body, Manrope captions; dark
  workspace against a light page canvas; yellow buttons carry ink text so contrast
  stays above 4.5:1 rather than the white-on-yellow that would fail it.
- Support and feedback now go to **hello@storitellah.com** everywhere — Support panel,
  ✉ Feedback button, error toasts, boot-failure screen, and the Lightroom plug-in.

### Removed
- **Page audio notes**, completely: markup, state, handlers, timeline indicator,
  migration. Old projects are stripped of the field on load. No dead controls left.

### Fixed
- `.bak` files were stamped `ver:3` even after the v4 model landed — a saved project
  would have described itself incorrectly to a future importer. Now stamps v4.

### Testing
- 133 app tests + 22 Lua tests, all passing. New coverage: clipping-mask overhang,
  aspect preservation on Fit/Fill, original-untouched guarantees, keyboard shortcuts,
  rotation, v3→v4 migration, corrupt-transform rejection, 16-page imposition (including
  the pages-sum-to-17 invariant and every-page-printed-once), A4 full bleed, 3:2 ratios,
  mm bleed, file naming, JPG numbering, CRC32/ZIP correctness, 300 DPI export path,
  audio removal, brand palette and type system. Templates: every template supplies all
  eleven page types; **every recipe materialises on the page in all seven formats**;
  type scales with the page; replace keeps photos, their order and their aspect ratio;
  surplus photos are never discarded; text carries by role; whole-zine application
  assigns covers correctly and leaves a valid, saveable project; custom save/duplicate/
  export/import round-trips; junk template files rejected; browser UI previews and
  applies.

## v3.3 — 2026-07-15
Lightroom Classic plug-in (plug-in v1.0.0).

### Added
- **`lightroom/zineit.lrplugin`** — a Lightroom Classic plug-in that bridges the catalogue into ZineIt. Adds an export destination (*ZineIt zine / photobook*) that renders the selection with its develop settings, reads IPTC caption/title/headline, places one photo per page at its true aspect ratio, adds a Bebas Neue title to the cover, and writes a self-contained `.bak` ready to restore. Also adds Library ▸ Plug-in Extras items (Open ZineIt, Report a bug) and a Plug-in Manager panel with feedback links to bryanjaybee@gmail.com.
- Scope, honestly: the **editor cannot run inside Lightroom** — the SDK has no webview or canvas — so the plug-in owns selection→project and ZineIt owns layout. See `docs/LIGHTROOM.md`.
- Engineering notes: `ZineItProject`/`ZineItJson` import no Lr modules and are unit-tested on plain Lua; the `.bak` is **streamed** (project JSON, brace trimmed, photos base64-appended one at a time) so peak memory stays at ~one photo no matter the export size; over-capacity selections are reported before rendering starts.
- **`run-tests.sh`** — runs Lua syntax checks, Lua unit tests, fixture regeneration, and the JS suite in one command.
- 22 Lua unit tests + 5 JS contract tests (22 Lua · 97 JS, all passing).

### Changed
- ZineIt now supports **thumbnail-less imported projects**: the library falls back to the stored preview instead of a blank tile, and restore regenerates proper preview/thumbnail tiers for any asset arriving without them (reusing the tested legacy-migration path). This is what lets an importer ship photos without pre-baking thumbnails.

## v3.2 — 2026-07-07
Type system + production readiness.

### Changed
- **New UI type system**: **Bebas Neue** for display (wordmark, panel headers, dialog titles) and **Source Sans** for all body text — loaded from Google Fonts as *Source Sans 3*, Adobe's current name for Source Sans Pro, with the classic name kept in the CSS stack and full system fallbacks so the tool still reads well offline. Monospace is retained where it belongs: the clock, zoom %, page readouts, and timeline tags. Source Sans is also available in the zine text-font picker.

### Added — production hardening
- **Crash guards**: boot is wrapped — a startup failure shows a readable message pointing to bryanjaybee@gmail.com instead of a blank page; uncaught errors and async rejections raise a gentle toast that names the error, reassures that work is autosaved, and routes to ✉ Feedback (throttled — never a toast storm).
- **Inline SVG favicon** (no 404s in production), **noscript** message, **version badge** in the header (so bug reports say which build), and a console version banner.
- **Accessibility**: aria-labels on all icon-only controls; `prefers-reduced-motion` disables drawer/toast animation.
- 9 new automated tests (92 total, all passing).

- **Shipped favicon set for the Cloudflare deployment**: `favicon.ico` (16/32/48 multi-size), scalable `favicon.svg`, `apple-touch-icon.png` (iOS Add-to-Home-Screen finds it at the root by convention), and 192/512 px PNGs for future PWA use — all the gradient Z mark, all cache-controlled for a week in `_headers`. No icon links were added to the HTML: browsers use the inline data-URI (which keeps a locally saved single ZineIt.html fully working), while crawlers, bookmark services, and iOS fetch the root files directly — so production logs stop showing favicon 404s.

### Notes
- The file ships readable, not minified — Cloudflare compresses on the wire (the gap is a few KB), and an auditable single file is part of ZineIt's local-first promise.

## v3.1 — 2026-07-07
Mobile platform release: seamless on Android and iOS, plus a cleaner support card.

### Changed
- **Notch & home-indicator safe**: the header, mobile toolbar, drawers, timeline sheet, toast, Edit chip, and fullscreen controls all respect `env(safe-area-inset-*)`, so nothing hides behind iPhone notches or Android gesture bars.
- **iOS dynamic-toolbar safe**: the app frame uses `100dvh` (with `100vh` fallback), so Safari's collapsing address bar never clips the timeline or toolbar.
- **No accidental zoom**: form controls are ≥16 px on mobile (stops iOS zoom-on-focus), controls use `touch-action:manipulation` (no double-tap zoom), tap highlights and iOS long-press callouts are suppressed on page elements, and `overscroll-behavior:none` keeps pull-to-refresh from hijacking canvas gestures. Pinch-zoom remains enabled for accessibility.
- **Touch drags stay glued to the finger**: pointer capture is engaged on drag start, making drag/pan/resize reliable on Android Chrome and iOS Safari even when the finger leaves the frame.
- **Single-row view bar** on phones: horizontally scrollable instead of wrapping into a tall stack.
- **Support card redesigned**: Ko-fi and Patreon are now compact icon buttons (brand-coloured, accessible labels, no raw URLs). **M-Pesa removed.**
- 8 new automated tests (83 total, all passing).

## v3.0 — 2026-07-07
Performance architecture release: less memory everywhere, photos that always load fast, every format in, and a feedback channel.

### Changed — the photo engine
- **Photos moved out of the project JSON into IndexedDB as blobs.** State now carries only metadata plus a ~15 KB thumbnail per photo, so autosave is instant and tiny regardless of how many photos a project holds, and the browser never keeps full-resolution images decoded just to draw the editor.
- **Three-tier rendering**: 192 px thumbs for the library and timeline (lazy-loaded), ~1600 px previews for the canvas (progressively hydrated — thumb appears instantly, preview swaps in), and full-resolution originals touched **only** for print/PDF and the lightbox. On a phone this is the difference between decoding megapixels and decoding kilobytes.
- **Print quality unchanged**: exports preload the untouched originals from the store before the print dialog opens.
- **.bak files remain fully self-contained** — export embeds the originals and previews, restore rehydrates the store. Old v1/v2 projects and .bak files migrate automatically: inline photos move to fast storage on first load and previews regenerate in the background.
- Deleting a photo (or starting a new project) frees its stored blobs and revokes object URLs — memory is actually reclaimed, and orphaned blobs are swept at startup.
- Imports run sequentially through one decoder to cap peak memory on mobile during multi-photo drops; decoding uses `createImageBitmap` with high-quality downscaling.

### Added
- **All photo formats import, including HEIC/HEIF** (iPhone default). Native decode is tried first (Safari handles HEIC itself); elsewhere a converter loads lazily from a CDN only when a HEIC file actually arrives — the app stays fully offline for every other format. Detection works by MIME type *and* extension, since HEIC files often arrive with no MIME type on Windows/Android.
- **Feedback channel**: "Found a bug? Have an idea?" in the Support panel and a ✉ Feedback button in the view bar — both open a pre-addressed email to **bryanjaybee@gmail.com** with the app version, format, and browser prefilled.
- 10 new automated tests (75 total, all passing).

## v2.1 — 2026-07-05
Mobile optimisation + a dedicated Mini Zine print mode.

### Added
- **Fully responsive mobile shell** (≤820 px): single-column layout, Photos/Tools panels as slide-in drawers with a tap-to-close backdrop, collapsible timeline bottom sheet, five-button mobile toolbar (Photos · Tools · Timeline · Text · Full), compact header, overflow-safe canvas.
- **Touch controls**: drag, pan, and 8-way resize on the unified pointer-event pipeline; `touch-action:none` keeps gestures on the frames; 18 px handles and larger tap targets on coarse pointers; tap-to-select with an **Edit chip** that opens the tools drawer (and focuses the text field for text blocks).
- **Swipe navigation**: horizontal swipes on the canvas step pages in single view and whole spreads in spread view; vertical gestures and element drags never trigger it.
- **Fullscreen preview** (mobile + desktop): chrome-free view with ‹ › navigation, page indicator, Esc/✕ to exit; single-page, facing-spread, and fullscreen views all switchable on mobile.
- **Mini Zine print mode**: dedicated dialog with **A4 / US Letter** paper toggle, **live print preview** of the real imposed sheet, dashed **fold marks** + printer-style edge ticks, ✂ **cut mark** across the middle two panels, show/hide toggles for both, page-number toggle, **fit-to-paper** via a single uniform scale (image aspect ratios preserved), optional ¼″ paper margin, correct `@page` size per paper for browser print-to-PDF, clipping warning when 100% doesn't fit A4, and collapsible fold/cut instructions.
- Imposition settings persist in the project (and .bak files); migration fills defaults for older projects.
- 22 new automated tests (65 total, all passing — see TESTING.md).

## v2.0 — 2026-07-05
A visual-layout-tool release: spreads, a text pipeline, and a tested render.

### Added
- **Facing-page preview**: Single/Spread view toggle; left and right pages always shown together with a centre-fold guide; pagination model (cover alone → interior pairs → back alone).
- **Double-page spread photos**: one image spans both facing pages, stored once, aligned across the fold in editor, preview, print, and mini-zine imposition; gutter bleed when bleed mode is on; one-click return to single-page mode.
- **Text Editor tab**: every text block in the zine in one list — page number, spread number, content type (13 roles: title, page-title, caption, quote, name, bio, reflection, note, credits, back-cover, copyright, page-number, custom), inline editing, "Show →" live-preview jump, per-row save status; zine title editing with add-to-cover.
- **Enlarged timeline** (178 px): 96 px page thumbnails grouped by spread, page numbers, drag-and-drop page reorder, current-spread highlight, ⇔ spread / ▣ photo / T text / ♪ audio / empty-page indicators; photos draggable from timeline thumbs onto the page.
- **Zoom controls**: Fit (capped for a calmer, centred preview), 100%, +/− stepping with a live percentage readout.
- **8-way resize** (4 corners + 4 edges) with a live **crop ghost** showing the full uncropped image extent plus a crop-% readout; Reset crop and Reset frame.
- **Guides & bleed system**: margin, safe-area, bleed, centre-fold, and grid guides with snap; bleed mode allowing a controlled ⅛″ spill past trim (hard clamp at trim when off); margin-crossing warnings on the offending sides.
- **Navigation**: prev/next page and prev/next spread buttons; arrow keys navigate when nothing is selected and nudge when something is; timeline click; covers included, no skips.
- **Page numbers**: independent preview and print toggles; covers always unnumbered; outer-corner placement.
- **Page audio notes**: attach field audio to a page (editor-only, never printed) with a ♪ timeline indicator.
- **Pan mode** button as a modifier-free alternative to Shift-drag.
- **v1 → v2 migration**: existing autosaves and .bak files load cleanly.
- **Automated test-suite**: 43 jsdom tests (`tests/run-tests.js`) covering the entire release checklist.

### Fixed
- Shift+drag photo panning (selection no longer rebuilds the DOM mid-gesture).
- Elements can now genuinely cross the fold in spread view and re-home to the facing page.
- Timeline crash when painting the cover spread (null left page).
- Spread halves no longer hang off the paper in single-page view.

## v1.1 — 2026-07-05
- Lively colour system (gradient wordmark, rainbow rule, colour-coded panels) on a neutral canvas.
- 40 Google Fonts with offline system-stack fallback.
- Keep-original-aspect-ratio placement toggle.
- `docs/ARCHITECTURE.md` and optional Phase-2 sync API scaffold (`server/`).

## v1.0 — 2026-07-04
- Core local-first editor: zine + photobook formats, front/back covers, drag-drop full-resolution photos, five templates, ⅛″ snap grid, text with date stamps, live clock.
- PDF/print export at exact trim size; 8-page mini-zine imposition with fold instructions.
- Verified `.bak` backups (test-restore before download), autosave, daily reminder.
