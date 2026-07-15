# Ono-Sendai — recreation backlog

Bringing the original theme's **terminal-cyberpunk personality** back on modern
Obsidian (1.x / CodeMirror 6). The first modernization pass got it *working* but
genericized the look; these items re-implement the signature elements in
1.x-compatible ways. Source of truth = the original screenshots
(`ono-sendai_obsdn_00a/002/003.png`).

Status legend: `[x]` verified in a live 1.x vault · `[~]` code-complete, pending
a live visual spot-check (see **Verification** below) · `[ ]` not started.

## Signature elements to restore

- [x] **Slanted / angled tab headers** — the diagonal-cut "chevron" tab shape.
      Original used a 30px `.view-header-title::after` border-triangle (view-header
      is hidden in 1.x); re-done on the modern main-editor
      `.workspace-split.mod-root .workspace-tab-header` with a ~28px `clip-path`
      that cuts the TOP-right corner (tab leans right, tip at bottom-right — the
      original's parallelogram direction; an earlier version had it mirrored).
      The slant only reads if the tab contrasts with the black bar, so the
      original fills are mirrored — active = teal `--background-secondary`
      (#0f5172), inactive = grey `--background-primary` (#17191a) — and the cyan
      "active" cue is the original's header-row divider (a bottom border on the
      unclipped tab container), not a per-tab accent. Sidebar tabs untouched.
      Verified live 2026-07-14. → `theme.css` "RECREATION: slanted / angled tabs".
- [~] **Text sidebar tabs** — `FILES / STAR / SEARCH` as words instead of icons.
      Re-keyed off the stable internal `data-type` (`file-explorer` / `search` /
      `bookmarks`+`starred`) instead of the old localized `aria-label` hack, so it
      works in any UI language; the aria-label rules stay as an English fallback.
      NOT observable in the test vault (2026-07-14): its left sidebar surfaces only
      the file-explorer view, with no view-tab row on screen (the far-left teal
      strip is the ribbon, correctly untouched). The CSS is correct for a stacked
      view-tab sidebar but had no target to confirm against. Re-check when the
      sidebar shows file-explorer + search + bookmarks as sibling tabs.
      → `theme.css` "RECREATION: text sidebar tabs, language-independent".
- [x] **`\` prefix on file-tree folders** — every folder shown as `\ name`.
      Was BROKEN in 1.x: the legacy rule targets `.nav-folder-collapse-indicator`,
      but 1.x unified the file tree into the generic tree-item system so the
      chevron is now `.collapse-icon` — the old class no longer matches and the
      default `>` showed. Fixed by re-targeting `.nav-folder-title .collapse-icon`
      (hide svg, `::after { content:"\\" }` in green `--text-accent2`), scoped to
      folder titles so files stay bare. Verified live 2026-07-14 against a `test`
      folder. → `theme.css` "RECREATION: `\` prefix on file-tree folders".
- [x] **`:: ono-sendai` status-bar wordmark** — the magenta terminal punctuation
      at bottom-left. The first pass dropped it because the old `position:absolute;
      left:30px` floated mid-bar once 1.x right-aligned `.status-bar`. Restored via
      `position:fixed` (pins to viewport bottom-left, ignores the status bar's box),
      colored `--accent-strong` to match the original magenta. Verified live
      2026-07-14. → `theme.css` "RECREATION: `:: ono-sendai` status-bar wordmark".
- [ ] **`<<prev` / `next>>` nav text** — back/forward buttons as text; needs a
      macOS-window-frame-aware placement (the titlebar CSS exists but is hidden).
- [x] **Translucency / wallpaper** — the `is-translucent` bleed-through. Rebuilt
      for 1.x: the 2022 build faded whole containers with `opacity` (washing out
      text/icons too) and predated the modern DOM. Replaced with rgba overrides of
      the `--background-*` palette vars under `.is-translucent` (theme doesn't
      hardcode content bgs, so all `var()` consumers turn translucent uniformly
      while text stays fully opaque), dropped the color-distorting `filter`, and
      neutralized the old opacity fades. Alpha ~0.4 (tunable). Verified live
      2026-07-14 with Obsidian's "Translucent window" on (backdrop bleeds through;
      most visible over bright content). → `theme.css` "translucency fx (rebuilt…)".
- [ ] **Near-black background default** — original "pro mode" is `#000`; currently
      defaults to `#17191a`. Decide default vs. optional.

## Verification

CSS-only theme; there is no build step. Structural validity (brace/paren/string
balance) is checked, but the **visual** result can only be confirmed by loading
`theme.css` in a real Obsidian 1.x vault. The `[~]` items above are code-complete
and reasoned against the original screenshots + the legacy `obsidian.css`, but have
NOT yet been eyeballed in a running app. Spot-check when next in Obsidian:
- slant renders on main-editor tabs only (not the sidebar), active tab reads on top;
- `FILES/SEARCH/STAR` replace the sidebar icons (confirm `data-type` is present on
  `.workspace-tab-header` in your build — if the labels don't show, that's why);
- `\` shows on every folder row; `:: ono-sendai` sits at the very bottom-left.

## Already faithful (verified against originals)

- [x] H1 **cyan** / H2 **green**, underlined; H3–H6 fade to gray
- [x] Graph view: magenta nodes, teal links on black
- [x] Pink/magenta inline code; colored tag pills; green `==highlights==` (spot-check)
- [x] Monospace terminal editor, per-tag colors, accent unification

## Possible directions (beyond the original)

- [~] **Alternate "Tessier-Ashpool" color scheme** — built as an opt-in
      `body.ono-ta-mode` palette (theme.css "TESSIER-ASHPOOL MODE"): teal
      `#26e0b8` / magenta `#ff2d84` / purple `#8b3ff0` duotone picked from
      `ref-tessier-ashpool-palette.png` (H1/links teal, H2/accent-strong magenta,
      interactive purple; active tab → purple-grey). Default look untouched when
      the class is absent. Palette verified live 2026-07-14 (temp-forced); the
      class-gated extras (tab fill, teal `::`) are code-only so far.
- [~] **Interactive `:: ono-sendai` → `:: tessier-ashpool` easter egg** — click
      the `::` wordmark 5× to flip into T-A mode. CSS can't count clicks, so this
      is a tiny companion plugin (`companion-plugin/`, installed inert in the vault
      at `.obsidian/plugins/ono-sendai-companion/`) that renders the clickable
      wordmark, counts clicks, and toggles `body.ono-ta-mode` (persisted). Counter
      logic unit-tested (`node companion-plugin/test/counter.test.js`, 6/6). NOT
      live-tested end-to-end: the vault runs with Community plugins disabled
      (Restricted mode) and I didn't flip that autonomously — enable the plugin to
      try it (see `companion-plugin/README.md`).

## Notes

- Keep each restoration CM6/1.x-safe and reversible (compat-layer section in `theme.css`).
- Original `obsidian.css` stays in the repo as the design reference.
