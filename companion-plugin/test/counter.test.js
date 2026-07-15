'use strict';
// Standalone test of the click-counter logic from main.js. Keep stepCounter()
// identical to the copy in ../main.js. Run: node companion-plugin/test/counter.test.js
const CLICKS_TO_ADVANCE = 5;
const CLICK_WINDOW_MS = 1500;

function stepCounter(state, now) {
  const withinWindow = now - state.last <= CLICK_WINDOW_MS;
  const count = (withinWindow ? state.count : 0) + 1;
  if (count >= CLICKS_TO_ADVANCE) {
    return { count: 0, last: now, fire: true };
  }
  return { count, last: now, fire: false };
}

// Feed a sequence of click timestamps; return how many times the cycle advanced.
function advances(times) {
  let state = { count: 0, last: 0 };
  let n = 0;
  for (const t of times) {
    const next = stepCounter(state, t);
    state = { count: next.count, last: next.last };
    if (next.fire) n++;
  }
  return n;
}

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}`); }
}

// 5 rapid clicks (300ms apart) advance once
check('5 rapid clicks advance once', advances([300, 600, 900, 1200, 1500]) === 1);

// 4 rapid clicks do NOT advance
check('4 rapid clicks do not advance', advances([300, 600, 900, 1200]) === 0);

// a gap > window resets the count (4 quick, long gap, then 4 more -> no advance)
check('gap resets the counter',
  advances([100, 200, 300, 400, /* 5s gap */ 5400, 5500, 5600, 5700]) === 0);

// 20 rapid clicks advance 4 times (a full cycle back to the start)
check('20 rapid clicks advance 4 times (full cycle)',
  advances(Array.from({ length: 20 }, (_, i) => (i + 1) * 200)) === 4);

// clicks exactly at the window edge (1500ms apart) still count as consecutive
check('clicks at exact window edge stay consecutive',
  advances([0, 1500, 3000, 4500, 6000]) === 1);

// one click past the window edge (1501ms) breaks the streak
check('click just past the window edge breaks the streak',
  advances([0, 1501, 3002, 4503, 6004]) === 0);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
