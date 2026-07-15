'use strict';
/*
 * Ono-Sendai Companion — interactive ":: ono-sendai" wordmark.
 *
 * Click the `::` five times (rapidly) to morph the wordmark into
 * ":: tessier-ashpool" and add `ono-ta-mode` to <body>, which the Ono-Sendai
 * theme styles into the Tessier-Ashpool teal->magenta palette. Click 5x again
 * to flip back. State persists across restarts.
 *
 * Pairs with the Ono-Sendai theme; harmless (renders an unstyled wordmark, or
 * none at all) without it.
 */
const { Plugin } = require('obsidian');

const TA_CLASS = 'ono-ta-mode';
const INTERACTIVE_CLASS = 'ono-sendai-interactive';
const CLICKS_TO_TOGGLE = 5;
const CLICK_WINDOW_MS = 1500; // consecutive clicks must land within this gap

/* ---- pure click-counter logic (mirrored in test/counter.test.js) --------
 * Given the running counter {count,last} and a monotonic timestamp, returns
 * the next state plus whether the toggle should fire. No side effects. Keep
 * this in sync with the test copy. */
function stepCounter(state, now) {
  const withinWindow = now - state.last <= CLICK_WINDOW_MS;
  const count = (withinWindow ? state.count : 0) + 1;
  if (count >= CLICKS_TO_TOGGLE) {
    return { count: 0, last: now, fire: true };
  }
  return { count, last: now, fire: false };
}
/* ------------------------------------------------------------------------- */

module.exports = class OnoSendaiCompanion extends Plugin {
  async onload() {
    const data = (await this.loadData()) || {};
    this.taMode = !!data.taMode;

    document.body.classList.add(INTERACTIVE_CLASS);
    document.body.classList.toggle(TA_CLASS, this.taMode);

    // render the clickable wordmark; CSS pins it vertically to the bottom-left
    const item = this.addStatusBarItem();
    item.addClass('ono-wordmark-host');
    const wm = item.createDiv({ cls: 'ono-wordmark' });
    wm.setAttribute('aria-label', 'Ono-Sendai — click :: five times');
    this.markEl = wm.createSpan({ cls: 'ono-mark', text: '::' });
    wm.appendText(' ');
    this.nameEl = wm.createSpan({
      cls: 'ono-name',
      text: this.taMode ? 'tessier-ashpool' : 'ono-sendai',
    });

    this.counter = { count: 0, last: 0 };
    this.registerDomEvent(this.markEl, 'click', (evt) => {
      evt.preventDefault();
      const next = stepCounter(this.counter, evt.timeStamp);
      this.counter = { count: next.count, last: next.last };
      if (next.fire) this.toggleTa();
    });

    // restore the theme's default state when the plugin is disabled
    this.register(() => {
      document.body.classList.remove(INTERACTIVE_CLASS);
      document.body.classList.remove(TA_CLASS);
    });
  }

  async toggleTa() {
    this.taMode = !this.taMode;
    document.body.classList.toggle(TA_CLASS, this.taMode);
    if (this.nameEl) {
      this.nameEl.setText(this.taMode ? 'tessier-ashpool' : 'ono-sendai');
    }
    await this.saveData({ taMode: this.taMode });
  }
};
