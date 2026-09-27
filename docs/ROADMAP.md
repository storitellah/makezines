# ZineIt Roadmap

This roadmap tracks a large feature specification against what has actually shipped. It is
deliberately honest about what is done, what is partially done, and what is still ahead, so
nothing is silently dropped. Items are grouped and roughly ordered by priority.

---

## Shipped

- **PNG transparency — core workflow (v5.2–v5.3).** Transparent PNGs are auto-detected on
  import (alpha channel sampled), stored as PNG previews (never matted to JPEG), and render
  with no background in the editor and in export. The "+ Graphic / QR" path and the
  transparent-graphic toggle both preserve alpha; the toggle re-ingests from the original to
  recover transparency if a photo was first baked opaque. Logos overlay photographs
  correctly. **Verified at the pixel level**: a page exported as transparent PNG has alpha=0
  in empty areas.
- **Transparency checkerboard (v5.3).** An editor-only, toggleable checkerboard reveals real
  transparency behind graphics. It never prints or exports — export draws pixels only.
- **Transparent PNG page export (v5.3).** Any page can be exported as a PNG, with an option
  for a genuinely transparent background (for overlays and artwork proofs). The project stays
  non-destructive; JPG/PDF exports keep their flattened white paper.
- **One-click A4 mini-zine PDF (v5.2)** at true 300 DPI, hand-built (no heavy library),
  auto-named from the project.
- **Flipbook reader (v5.2)** — a Read tab that pages through the current project like a book.
- **Panorama photobook system (v5.0)** — across-spread, split, and wraparound placements.
- **Mobile platform layer (v5.0–v5.1)** — iOS/Android detection, dynamic viewport, back-button
  layer management, bottom-sheet modals, 44px targets, pinch-zoom, centred preview.
- **Format-adapting restore + in-place conversion (v4.6).**
- **Print & colour guidance (v5.2)** — 300 DPI, standard vs rich black, bleed incl. 0.125".
- **Template + cover library and an interactive imposition preview** (pre-v5.0).

## Partially shipped — needs extension

- **Layers.** A Layers panel exists (stack, show/hide, lock). The spec asks for a dedicated
  **Artwork layer type** distinct from photographs, with opacity, blend modes, and
  artwork-specific behaviour (never auto-Fill/Fit). *Graphics already skip auto-fill and act
  as floating elements; the explicit Artwork layer type, opacity slider, and blend modes are
  still to build.*
- **Paper sizes.** A4, Letter, mini-zine and photobook formats exist. The spec's full set
  (A6/A5/A3/A2, Legal, Tabloid, Square, Custom) with per-size trim/safe/fold previews is not
  yet complete.
- **Imposition view.** A live imposition preview exists for the mini-zine; the spec's broader
  interactive imposition (per-format, printer's marks) is larger.

## Not yet started — sequenced for future releases

Grouped as they'd likely ship:

1. **Paper & A3 workflow** — A6–A2 + Legal/Tabloid/Square/Custom; A3 single-sheet, folded,
   saddle-stitched, exhibition handout, poster-fold-zine, contact sheet; trim/safe/fold
   previews per size.
2. **Print presets & marks** — inkjet/laser/digital/Indigo/offset/giclée/Riso/large-format/
   photo-lab/newsprint + paper stocks; crop/registration/colour-bar marks, duplex, collation.
3. **Layouts** — the ~19 named layouts (full-bleed spread, panorama, editorial grids, contact
   sheet, gallery wall, modular/asymmetrical grids, story grids, etc.) + save-custom-layout.
4. **Template collections** — the 15 documentary/editorial/exhibition template sets. Designed
   so a future Higgsfield MCP layout-concept generator can plug in without re-architecting;
   all generated templates remain fully editable in ZineIt.
5. **Timeline** — S/M/L/XL height presets; larger thumbnails with spread/cover/panorama/
   locked/hidden markers, page numbers, layout icons; zoom, collapse, drag-reorder.
6. **Quick-access toolbar** — a permanent, icon+label bar for the ~19 most-used actions.
7. **Mobile depth** — iPad Split View / Stage Manager, foldables, floating quick toolbar,
   bottom editing drawer, long-press layer actions, improved touch cropping.
8. **Demo content** — openly-licensed sample photos, logos, SVGs, mock interviews/quotes, and
   sample mini-zine/photobook/catalogue projects.
9. **GitHub Pages** — Actions deploy workflow, build/routing/cache/update strategy docs.
10. **Performance** — faster thumbnails, better caching, lazy loading, virtual timeline
    scrolling, lower memory, faster exports, smoother page turns.
11. **README** — the full overview/quick-start/workflow/shortcuts/badges rewrite.
12. **QA pass** — cross-browser + regression sweep across all of the above.

## Standing principles (unchanged)

- Single file, fully offline; no external libraries in the core tool.
- Photos never stretched — width stored, height derives from the photo's ratio; crops reversible.
- Honest about limits — browser RGB only (no ICC); CMYK/ICC directed to prepress tools.
- Every release passes the automated test suite before it ships.
- Partial builds are declared loudly, and the rest is sequenced here.
