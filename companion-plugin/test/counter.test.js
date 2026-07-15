'use strict';
// Standalone test of the click-counter logic from main.js. Keep stepCounter()
// identical to the copy in ../main.js. Run: node companion-plugin/test/counter.test.js
const CLICKS_TO_TOGGLE = 5;
const CLICK_WINDOW_MS = 1500;

function stepCounter(state, now) {
  const withinWindow = now - state.last <= CLICK_WINDOW_MS;
  const count = (withinWindow ? state.count : 0) + 1;
  if (count >= CLICKS_TO_TOGGLE) {
    return { count: 0, last: now, fire: true };
  }
  return { count, last: now, fire: false };
}

// Feed a sequence of click timestamps; return how many times it fired and the
// final toggle state (starting from `off`).
function run(times) {
  let state = { count: 0, last: 0 };
  let fires = 0;
  let on = false;
  for (const t of times) {
    const next = stepCounter(state, t);
    state = { count: next.count, last: next.last };
    if (next.fire) { fires++; on = !on; }
  }
  return { fires, on };
}

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}`); }
}

// 1) five rapid clicks (300ms apart) fire once -> ON
check('5 rapid clicks fire once, state ON',
  JSON.stringify(run([300, 600, 900, 1200, 1500])) === JSON.stringify({ fires: 1, on: true }));

// 2) four rapid clicks do NOT fire
check('4 rapid clicks do not fire',
  run([300, 600, 900, 1200]).fires === 0);

// 3) a gap > window resets the count (4 quick, long gap, then only 4 more -> no fire)
check('gap resets the counter',
  run([100, 200, 300, 400, /* 5s gap */ 5400, 5500, 5600, 5700]).fires === 0);

// 4) 10 rapid clicks fire twice -> back OFF
check('10 rapid clicks toggle twice, state OFF',
  JSON.stringify(run([200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000])) === JSON.stringify({ fires: 2, on: false }));

// 5) clicks exactly at the window edge (1500ms apart) still count as consecutive
check('clicks at exact window edge stay consecutive',
  run([0, 1500, 3000, 4500, 6000]).fires === 1);

// 6) one click past the window edge (1501ms) breaks the streak
check('click just past the window edge breaks the streak',
  run([0, 1501, 3002, 4503, 6004]).fires === 0);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
