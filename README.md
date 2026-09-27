<p align="center">
  <img src="logo.png" width="120" alt="MakeZines — the MZ mark">
</p>

<h1 align="center">MakeZines</h1>

<p align="center">
  <b>Make print-ready zines &amp; photobooks — right in your browser, all on your device.</b><br>
  <sub>by <a href="https://instagram.com/storitellah">Storitellah</a> · one HTML file · no accounts · no uploads · works offline</sub>
</p>

<p align="center">
  <a href="https://zineit.app"><img alt="Open the app" src="https://img.shields.io/badge/Open-the%20app-F6D76B?style=for-the-badge&labelColor=1A1A1A"></a>
  <img alt="Version" src="https://img.shields.io/badge/version-6.2.0-1A1A1A?style=for-the-badge">
  <img alt="Print" src="https://img.shields.io/badge/print-300%20DPI-B63A2B?style=for-the-badge&labelColor=1A1A1A">
</p>

<p align="center">
  <img alt="Offline" src="https://img.shields.io/badge/offline-yes-1A1A1A">
  <img alt="No account" src="https://img.shields.io/badge/account-not%20needed-B63A2B">
  <img alt="Mobile" src="https://img.shields.io/badge/mobile-ready-B63A2B">
  <img alt="Local-first" src="https://img.shields.io/badge/your%20photos-never%20leave%20your%20device-F6D76B?labelColor=1A1A1A">
</p>

<p align="center">
  <img src="docs/assets/shot_editor.jpg" width="90%" alt="The MakeZines editor">
</p>

<p align="center">
  <sub>🧡 Made to support <a href="https://thisiswherewearefrom.com/"><b><i>This is where we're from</i></b></a> — a photography project telling the stories of the places that shaped us.</sub>
</p>

---

## What it is

**MakeZines turns your photographs into something you can fold, print, and hold.** It's a layout
tool for photographers and photojournalists that runs entirely in your browser — drop in your
photos, arrange them, and export a folded mini-zine, a saddle-stitched booklet, or a photobook.
Your originals never leave your device.

No sign-up. No cloud. No subscription. Open the page and start.

<table>
<tr>
<td width="50%" valign="top">

### 🎞️ Built for photo stories
- Full-bleed, spreads, grids, contact sheets
- A rich **template library** — front covers, inner pages, back covers
- **Themes** you can apply and then edit, Canva-style
- Transparent PNG / logo / QR support — no white box, ever

</td>
<td width="50%" valign="top">

### 🖨️ Honest about print
- Everything renders at **300 DPI** from your originals
- **Foldable single-sheet mini-zines** on A3, A4, US Letter
- Illustrated **"How to fold"** guide, one fold and one cut
- Bleed-ready files a print shop can work from

</td>
</tr>
</table>

---

## The MakeZines identity

MakeZines wears a warm, printerly, unmistakably-analog identity.

**Type**
- **DEVOTTE** — the display face. A hand-cut, all-caps typeface used for the logo, the wordmark,
  and every heading, title and tab. It carries the whole personality.
- **DM Sans** (with **Manrope** as an alternate) — the clean sans for body copy, UI labels and
  captions, so the headers and the photos lead.

**Colour — "Butter &amp; Tomato"**

| | Name | Hex | Use |
|---|------|-----|-----|
| 🟡 | **Butter Pop** | `#F6D76B` | Primary accent — on dark surfaces (14.85:1 on ink) |
| 🔴 | **Tomato Vinyl** | `#B63A2B` | Action / secondary — on light surfaces (5.79:1 on paper, AA) |
| ⬛ | **Ink** | `#1A1A1A` | Text, dark UI, logo ground |
| ⬜ | **Paper** | `#F7F7F5` | Page background, text on dark |

**Mark** — a bold **MZ** set in DEVOTTE on an ink tile: paper M, Butter Pop Z, and a
Tomato Vinyl bar beneath. Built from the typeface's own letter outlines, so it stays crisp at any size.

---

## Foldable mini-zines, one sheet

Pick a mini-zine format and MakeZines imposes your eight pages onto **one sheet** — print it,
fold it, cut once, and you have a zine.

- **Print the Zine** — sends the imposed sheet to your printer with fold and cut marks.
- **Download** — one-click PDFs at 300 DPI in **A3, A4, US Letter, and A5**.
- **How to fold** — a six-step illustrated guide, right in the export dialog.

<p align="center">
  <img src="docs/assets/shot_flip.jpg" width="80%" alt="Flip through your zine like a real book">
</p>

---

## Your first zine in four steps

1. **Open MakeZines** — go to the app or open `index.html`. No sign-up.
2. **Drop your photos** — they stay on your device, at full quality.
3. **Lay out the pages** — pick a format, choose a template, add text, snap to the grid.
4. **Export &amp; print** — one-click mini-zine PDF at 300 DPI, or Print the Zine and fold.

---

## Privacy &amp; how it works

MakeZines is a **single HTML file**. Everything — layout, imposition, PDF export — happens
locally in your browser. Photos are read into memory and written into the files you export;
they are never uploaded. Backups (`.bak`) are yours to keep and restore on any device.
Projects saved by the previous **ZineIt** releases open in MakeZines unchanged.

---

## Run it yourself

```bash
git clone https://github.com/storitellah/zineit.git
cd zineit
python3 -m http.server 8080   # then visit http://localhost:8080
```

Tests are plain Node + jsdom:

```bash
cd tests && npm install jsdom && node run-tests.js
```

---

## Links

- 📸 **Storitellah:** [@storitellah](https://instagram.com/storitellah)
- 🧡 **This is where we're from:** [thisiswherewearefrom.com](https://thisiswherewearefrom.com/) · [@thisiswherewearefrom](https://instagram.com/thisiswherewearefrom)
- ✉️ **Feedback:** hello@storitellah.com

<p align="center"><sub>Built by Storitellah · free &amp; open · your photos never leave your device.</sub></p>
