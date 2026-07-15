'use strict';
/*
 * Ono-Sendai Companion — interactive ":: ono-sendai" wordmark.
 *
 * Click the `::` five times (rapidly — within ~1.5s of each click) to CYCLE the
 * wordmark + theme through the Neuromancer factions:
 *
 *   ono-sendai -> tessier-ashpool -> turing police -> sense/net -> (back)
 *
 * Each step swaps the wordmark text and sets a `body.ono-scheme-*` class that the
 * Ono-Sendai theme styles into that faction's palette. State persists across
 * restarts. Pairs with the Ono-Sendai theme; harmless without it.
 */
const { Plugin } = require('obsidian');

const INTERACTIVE_CLASS = 'ono-sendai-interactive';
const CLICKS_TO_ADVANCE = 5;
const CLICK_WINDOW_MS = 1500; // consecutive clicks must land within this gap

// The cycle. `cls` empty = the theme's default (Ono-Sendai) look.
const SCHEMES = [
  { cls: '',                      name: 'ono-sendai' },
  { cls: 'ono-scheme-tessier',    name: 'tessier-ashpool' },
  { cls: 'ono-scheme-turing',     name: 'turing police' },
  { cls: 'ono-scheme-sensenet',   name: 'sense/net' },
  { cls: 'ono-scheme-wintermute', name: 'wintermute' },
  { cls: 'ono-scheme-neuromancer', name: 'neuromancer' },
  { cls: 'ono-scheme-zion',       name: 'zion' },
  { cls: 'ono-scheme-panther',    name: 'panther moderns' },
  { cls: 'ono-scheme-dixie',      name: 'dixie flatline' },
  { cls: 'ono-scheme-freeside',   name: 'freeside' },
];
const SCHEME_CLASSES = SCHEMES.map((s) => s.cls).filter(Boolean);

/* ---- pure click-counter logic (mirrored in test/counter.test.js) --------
 * Given the running counter {count,last} and a monotonic timestamp, returns
 * the next state plus whether the cycle should advance. No side effects. Keep
 * this in sync with the test copy. */
function stepCounter(state, now) {
  const withinWindow = now - state.last <= CLICK_WINDOW_MS;
  const count = (withinWindow ? state.count : 0) + 1;
  if (count >= CLICKS_TO_ADVANCE) {
    return { count: 0, last: now, fire: true };
  }
  return { count, last: now, fire: false };
}
/* ------------------------------------------------------------------------- */

module.exports = class OnoSendaiCompanion extends Plugin {
  async onload() {
    const data = (await this.loadData()) || {};
    this.scheme = Number.isInteger(data.scheme) ? this.wrap(data.scheme) : 0;

    document.body.classList.add(INTERACTIVE_CLASS);
    this.applyScheme(this.scheme);

    // render the clickable wordmark; CSS pins it vertically to the bottom-left
    const item = this.addStatusBarItem();
    item.addClass('ono-wordmark-host');
    const wm = item.createDiv({ cls: 'ono-wordmark' });
    wm.setAttribute('aria-label', 'Ono-Sendai — click :: five times to cycle');
    this.markEl = wm.createSpan({ cls: 'ono-mark', text: '::' });
    wm.appendText(' ');
    this.nameEl = wm.createSpan({ cls: 'ono-name', text: SCHEMES[this.scheme].name });

    this.counter = { count: 0, last: 0 };
    this.registerDomEvent(this.markEl, 'click', (evt) => {
      evt.preventDefault();
      const next = stepCounter(this.counter, evt.timeStamp);
      this.counter = { count: next.count, last: next.last };
      if (next.fire) this.advance();
    });

    // restore the theme's default state when the plugin is disabled
    this.register(() => {
      document.body.classList.remove(INTERACTIVE_CLASS, ...SCHEME_CLASSES);
    });
  }

  wrap(i) {
    return ((i % SCHEMES.length) + SCHEMES.length) % SCHEMES.length;
  }

  applyScheme(i) {
    document.body.classList.remove(...SCHEME_CLASSES);
    const cls = SCHEMES[i].cls;
    if (cls) document.body.classList.add(cls);
    if (this.nameEl) this.nameEl.setText(SCHEMES[i].name);
  }

  async advance() {
    this.scheme = this.wrap(this.scheme + 1);
    this.applyScheme(this.scheme);
    await this.saveData({ scheme: this.scheme });
  }
};
