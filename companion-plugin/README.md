# Ono-Sendai Companion

A tiny optional plugin that makes the theme's `:: ono-sendai` status-bar wordmark
**interactive**. Click the `::` five times (rapidly — within ~1.5s of each click)
and the wordmark + theme **cycle through the Neuromancer factions**, each with its
own palette:

```
ono-sendai  ->  tessier-ashpool  ->  turing police  ->  sense/net  ->  (back)
 cyan/green      teal/magenta        red/amber          gold/pink/blue
```

Each 5-click advances one step; keep going to loop back to `ono-sendai`. The
current scheme persists across restarts.

A CSS theme can't count clicks (no JS), which is why this lives in a plugin. The
plugin only adds the clickable wordmark and sets a `body.ono-scheme-*` class —
all the actual styling is in the theme's `theme.css` (the `ALTERNATE SCHEMES`
section). Palettes are picked from `../ref-tessier-ashpool-palette.png` and the
book's factions.

## How it works

- On load it adds `ono-sendai-interactive` to `<body>` (the theme hides its
  static wordmark and shows this clickable one instead) and renders the wordmark
  as a status-bar item, pinned vertically to the bottom-left by the theme CSS.
- Clicking the `::` runs a small counter (`stepCounter`); the 5th click within
  the window advances to the next scheme — swapping the `body.ono-scheme-*`
  class and the wordmark text.
- Disabling the plugin removes the classes, restoring the theme's default look.

The click-counter logic is unit-tested — `node test/counter.test.js`.

## Install / enable

The files are already copied into this vault at
`.obsidian/plugins/ono-sendai-companion/`. To turn it on:

1. **Settings → Community plugins** → turn off *Restricted mode* (Community
   plugins are currently disabled in this vault).
2. Find **Ono-Sendai Companion** in the installed list and enable it.
3. The `:: ono-sendai` wordmark at the bottom-left is now clickable — quintuple-click
   the `::`.

To remove it entirely, disable it and delete the plugin folder.

## Requires

The Ono-Sendai theme active (`cssTheme: "Ono-Sendai"`). Without it the plugin is
harmless — it just renders an unstyled wordmark and toggles a class nothing reads.
