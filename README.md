# Ono-Sendai_obsdn

### !! revived 2026 — now works with Obsidian 1.x !!

> The original (June 2022) theme was CodeMirror 5–era and broke in modern
> Obsidian. This fork adds a `manifest.json` + `theme.css` (modern theme
> format) and a **modern-compat layer** that re-implements the editor styling
> on CodeMirror 6 (Live Preview) — including the signature WYSIWYM headings,
> edit-mode margins, the line-number/fold gutters, focus mode — plus the 1.x
> tab bar, callouts, and the properties panel. The original CSS is preserved
> intact above the compat layer.

### description

a terminal retro-look for [[Obsidian]]


https://github.com/cannibalox/ono-sendai_obsdn/assets/4605693/28669765-4f7f-454d-856b-b34e303f05b3


![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_00.png)
![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_001.png)

#### features:

- anti distraction-free theme with a terminal flavor
- inline transclusions
- WYSIWYM headings in Source mode (`#` → `H1…H6` badges)
- images scaled down with hover zoom
- visible margins in edit mode
- file explorer: wrap long file names
- aligned footnotes suptext for consistent leading

> _1.x revival note:_ the old "tab icons replaced by text" and file-explorer
> "columns view" hacks were dropped — they relied on pre-CodeMirror-6 DOM and
> broke in modern Obsidian. Native tab icons are used instead.

#### protips :

- full dark mode : enable dark mode & change line 19 to : `--background-primary: #000000` to enable the full dark mode
- disable file explorer columns view by commenting out lines[2182-2185] in case of bugs (experimental feat.)
- theme has been designed for **dark** mode, however a light mode is also available.
- for the file explorer : you can replace the `backslash` with a `slash` at line 602 : replace `content: "\\"` with `content: "\/"`

### warning :

> user-unfriendly UI, not recommended for obsidian beginners

### installation :

- create a folder `Ono-Sendai` in `<your-vault>/.obsidian/themes/`
- copy **`manifest.json`** and **`theme.css`** into it
- in Obsidian: **Settings → Appearance → Themes → Manage → select "Ono-Sendai"** (or set it directly in `.obsidian/appearance.json` → `"cssTheme": "Ono-Sendai"`)
- designed for **dark** mode; a light mode is also available
- the font used in the screenshots is Cairo : https://fonts.google.com/specimen/Cairo?query=Cairo&selection.family=Armata|Cairo&sidebar.open=true
  (install the font locally before running Obsidian)

> **note on focus mode:** edit mode dims the lines your cursor isn't on (a
> ported feature). to disable it, delete the `FOCUS MODE` block near the end of
> `theme.css`. the WYSIWYM `#`→`H1..H6` badges live just above it.

![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_00a.png)

![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_002.png)

![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_003.png)

![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_004.png)

![](https://raw.githubusercontent.com/cannibalox/ono-sendai_obsdn/master/ono-sendai_obsdn_005.png)
