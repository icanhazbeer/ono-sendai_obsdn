# Ono-Sendai (modernized)

**A modernized recreation of the [ono-sendai](https://github.com/cannibalox/ono-sendai_obsdn)
Obsidian theme — a terminal / retro-cyberpunk look — rebuilt for Obsidian 1.x.**

The original theme (by **_ph**, June 2022) was CodeMirror 5–era and no longer
works properly in modern Obsidian. This project is rebuilding it as a modern
theme: packaged as `manifest.json` + `theme.css` and re-implemented on
CodeMirror 6 (Live Preview / Source), the 1.x tab bar, and the current Obsidian
UI — while preserving the original's signature terminal aesthetic (WYSIWYM
headings, edit-mode margins, neon graph view, colored tag pills, focus mode).

> **Status:** actively modernizing. The original `obsidian.css` is kept in the
> repo for reference; **`theme.css` is the modern build** and the file Obsidian
> loads. Full credit to the original author **_ph / www.hpx1.com**.

### description

a terminal retro-look for Obsidian

https://github.com/cannibalox/ono-sendai_obsdn/assets/4605693/28669765-4f7f-454d-856b-b34e303f05b3

![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_00.png)
![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_001.png)

#### features

- anti distraction-free theme with a terminal flavor
- WYSIWYM headings in Source mode (`#` → `H1…H6` badges)
- inline transclusions / embeds
- neon graph view + colored tag pills
- images scaled down with hover zoom
- visible margins in edit mode
- file explorer: wraps long file names
- aligned footnote suptext for consistent leading
- dark (primary) and light modes

> _modernization note:_ the pre-CodeMirror-6 tricks that broke in Obsidian 1.x —
> "tab icons replaced by text" and file-explorer "columns view" — were dropped in
> favor of the native tab bar and file tree.

#### protips

- **full-black background:** in the `.theme-dark` block of `theme.css`, set `--background-primary: #000000`
- **focus mode** (edit mode dims the lines your cursor isn't on) can be removed by deleting the `FOCUS MODE` block near the end of `theme.css`
- designed for **dark** mode; a **light** mode is also available

### warning

> dense, information-first UI — not aimed at Obsidian beginners

### installation

- create a folder `Ono-Sendai` in `<your-vault>/.obsidian/themes/`
- copy **`manifest.json`** and **`theme.css`** into it
- in Obsidian: **Settings → Appearance → Themes → Manage → select "Ono-Sendai"** (or set `"cssTheme": "Ono-Sendai"` directly in `.obsidian/appearance.json`)
- the screenshots use the Cairo font: https://fonts.google.com/specimen/Cairo (install it locally before running Obsidian)

![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_00a.png)
![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_002.png)
![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_003.png)
![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_004.png)
![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_005.png)
