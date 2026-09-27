# Templates

A template in ZineIt is two things: a **style** (typography, accent colour, margin,
cover treatment) and a set of **page recipes** — one for each of the eleven page types.

Blank is still the default. Nothing is applied unless you ask for it.

## The library

| Template | Category | What it's for |
|---|---|---|
| **Blank** | Blank | An empty page. The default. |
| **Minimalist editorial** | Minimal | Generous white space, small type. The photograph does the talking. |
| **Documentary essay** | Documentary | Long-form reportage: image carries, caption explains, notes to the side. |
| **Photojournalism** | Photojournalism | Full bleed, tight captions set over the image. News rhythm. |
| **Magazine** | Magazine | Feature spread: strong headline, two-column body, side-by-side caption page. |
| **Travel journal** | Travel | Notebook feel — mixed sizes, 3×3 grids, room for a place and a date. |
| **Contact sheet** | Contact Sheet | The edit laid bare. Twelve up. |
| **Portfolio** | Portfolio | One picture, centred, wide margins, nothing else. |
| **Newspaper** | Newspaper | Dense and urgent: masthead, three columns. |

Plus anything you save yourself, under **Custom**.

## The eleven page types

Cover · Intro · Single photo · Two-photo spread · Three photos · Grid · Caption page ·
Quote · Full bleed · Closing · Back cover.

Every template answers for all eleven. Where a template has nothing special to say, it
inherits a sensible editorial default; where it does, it overrides. The contact sheet,
for instance, overrides almost everything into grids, because that is what a contact
sheet *is*.

## Recipes are page-relative, not fixed

Recipes are written in fractions of the page's content box — never in inches. The same
Documentary recipe lays out correctly on a 2.75in mini zine and a 12in photobook
without being rewritten, and type scales with the page rather than staying stranded at
one size. This is why the library is nine templates and not nine templates per format.

## Applying one

**Browse professional templates…** in the Layout panel.

- **Apply to**: this page · selected pages · the whole zine.
- Applying to the whole zine assigns page types automatically — page 1 becomes the
  cover, page 2 the intro, the second-to-last the closing, the last the back cover, and
  the body cycles through single, two, caption, full bleed, three, quote, grid.
- Applying a template sets the project margin to the template's own.

## "Keep my photos and text" — leave this on

This is the difference between trying a template and losing an evening's work.

With it on, replacing a template does **not** wipe the page:

- **Photos re-flow into the new frames, in order.** First photo into the first frame,
  and so on. Each is re-filled to cover its new frame, at its true aspect ratio.
- **Photos with nowhere to go are kept anyway.** Swap a twelve-up contact sheet for a
  one-photo portfolio page and the other eleven photos stay on the page in frames of
  their own, rather than vanishing.
- **Text carries across by role.** A quote stays a quote, a caption stays a caption.
  Your words survive the redesign.

Turn it off only when you want a genuinely clean page.

## Making your own

- **Save this page as a template** captures the current page's layout as a recipe and
  stores it in your browser. It shows up under Custom next time.
- **Duplicate** copies any template, including the built-ins, so you can adjust one
  without losing the original.
- **Export** writes a `.json` file — `Name_ZineIt-template.json`. Share it, back it up,
  put it in the repo.
- **Import** reads one back. Files that aren't ZineIt templates are refused rather than
  half-loaded.

Custom templates live in your browser's local storage, like everything else in ZineIt.
Nothing is uploaded. Export is how you move them between machines.

## What a template does not do

It sets frames, type, colour and margins. It does not touch your photographs. Applying,
replacing, and re-applying a template are all non-destructive — the originals are never
altered, and every crop stays reversible.
