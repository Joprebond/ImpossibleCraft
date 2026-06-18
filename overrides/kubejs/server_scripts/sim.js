// Total weight: 64 (blocks) + 30 (precious) + 12 (enchants) = 106
const newItems = [
  ['Netherrack',          12, [16,32] ],
  ['Obsidian',            12, [2,4]   ],
  ['Crying Obsidian',     12, [2,4]   ],
  ['Blackstone',          12, [8,16]  ],
  ['Soul Sand',           12, [8,16]  ],
  ['Crimson Nylium',       2, [8,16]  ],
  ['Warped Nylium',        2, [8,16]  ],
  ['Leather',              8, [2,4]   ],
  ['Quartz',               8, [5,12]  ],
  ['Ender Pearl',          7, [1,2]   ],
  ['Netherite Scrap',      7, [1,2]   ],
  ['Book: Mending I',      3, [1,1]   ],
  ['Book: Unbreaking',     3, [1,2]   ],
  ['Book: Protection I',   3, [1,1]   ],
  ['Book: Soul Speed',     3, [1,2]   ],
];

const groups = [
  { label:'BLOCKS',   names:['Netherrack','Obsidian','Crying Obsidian','Blackstone','Soul Sand','Crimson Nylium','Warped Nylium'] },
  { label:'PRECIOUS', names:['Leather','Quartz','Ender Pearl','Netherite Scrap'] },
  { label:'ENCHANTS', names:['Book: Mending I','Book: Unbreaking','Book: Protection I','Book: Soul Speed'] },
];

function makeRng(initSeed) {
  let s = initSeed;
  return {
    rand(n)           { s = (s * 1664525 + 1013904223) & 0x7fffffff; return s % n; },
    randRange(lo, hi) { s = (s * 1664525 + 1013904223) & 0x7fffffff; return lo + s % (hi - lo + 1); },
  };
}

function simulate(table, iterations, tradesEach, rng) {
  const totalW = table.reduce((s, r) => s + r[1], 0);
  const names  = table.map(r => r[0]);
  const tally  = {};
  const totals = {};
  names.forEach(n => { tally[n] = 0; totals[n] = 0; });

  for (let it = 0; it < iterations; it++) {
    for (let t = 0; t < tradesEach; t++) {
      let roll = rng.rand(totalW), cum = 0;
      for (const [name, w, range] of table) {
        cum += w;
        if (roll < cum) { tally[name]++; totals[name] += rng.randRange(range[0], range[1]); break; }
      }
    }
  }

  const total = iterations * tradesEach;
  return names.map(n => ({
    name:   n,
    weight: table.find(r => r[0] === n)[1],
    trades: tally[n],
    pct:    +(tally[n] / total * 100).toFixed(2),
    items:  totals[n],
  }));
}

const totalW = newItems.reduce((s,r) => s + r[1], 0);

const run1 = simulate(newItems, 10, 100, makeRng(99991));
const run2 = simulate(newItems, 10, 100, makeRng(55137));

function getR(results, name) { return results.find(r => r.name === name); }
const W = 20;
function bar(pct, ch) { return (ch.repeat(Math.min(Math.round(pct), W))).padEnd(W); }
function fmt(v) { return ((v >= 0 ? '+' : '') + v.toFixed(1) + '%').padStart(7); }

// ── raw tables ──────────────────────────────────────────────────────────────
function printTable(label, results) {
  const theory = n => +(newItems.find(r=>r[0]===n)[1] / totalW * 100).toFixed(2);
  console.log('  -- ' + label + ' (1000 trades) --');
  console.log('  ' + 'Item'.padEnd(22) + ' Theory%  Actual%  Trades  Est.Items   Drift');
  console.log('  ' + '-'.repeat(68));
  for (const grp of groups) {
    console.log('  [' + grp.label + ']');
    for (const name of grp.names) {
      const r = results.find(x => x.name === name);
      const th = theory(name);
      const drift = +(r.pct - th).toFixed(2);
      const ds = ((drift >= 0 ? '+' : '') + drift + '%').padStart(7);
      console.log('    ' + name.padEnd(20) + ' ' + (th+'%').padStart(7) + '  ' + (r.pct+'%').padStart(7) + '  ' + String(r.trades).padStart(6) + '  ' + String(r.items).padStart(9) + '  ' + ds);
    }
  }
  console.log('');
}

console.log('');
console.log('=================================================================');
console.log('  UPDATED TABLE — Total weight: ' + totalW + '  (each item % = weight/' + totalW + ')');
console.log('=================================================================');
console.log('');

const thPct = n => +(newItems.find(r=>r[0]===n)[1] / totalW * 100).toFixed(2);

console.log('  Theoretical drop rates:');
for (const grp of groups) {
  const grpW = grp.names.reduce((s,n) => s + newItems.find(r=>r[0]===n)[1], 0);
  console.log('  [' + grp.label + '  ' + (grpW/totalW*100).toFixed(1) + '%]');
  for (const name of grp.names) {
    console.log('    ' + name.padEnd(22) + ' ' + thPct(name) + '%');
  }
}
console.log('');

printTable('Run 1 (seed A)', run1);
printTable('Run 2 (seed B)', run2);

// ── chart: theory vs run1 vs run2 ───────────────────────────────────────────
console.log('=================================================================');
console.log('  CHART  Theory:o  Run1:#  Run2:*  (each symbol = 1%)');
console.log('=================================================================');
console.log('');
console.log('  ' + 'Item'.padEnd(22) + ' Th%    THEORY               RUN 1                RUN 2                R2%');
console.log('  ' + '-'.repeat(95));

for (const grp of groups) {
  const grpW = grp.names.reduce((s,n) => s + newItems.find(r=>r[0]===n)[1], 0);
  console.log('');
  console.log('  == ' + grp.label + ' (' + (grpW/totalW*100).toFixed(1) + '%) ==');
  for (const name of grp.names) {
    const th = thPct(name);
    const p1 = getR(run1, name).pct;
    const p2 = getR(run2, name).pct;
    console.log('  ' + name.padEnd(22) + ' ' + (th+'%').padStart(5) + '  ' + bar(th,'o') + '  ' + bar(p1,'#') + '  ' + bar(p2,'*') + '  ' + (p2+'%').padStart(5));
  }
}

// ── head-to-head ─────────────────────────────────────────────────────────────
console.log('');
console.log('=================================================================');
console.log('  HEAD-TO-HEAD: Theory vs Run 1 vs Run 2');
console.log('=================================================================');
console.log('');
console.log('  ' + 'Item'.padEnd(22) + ' Theory    Run1    Run2  R1 drift  R2 drift  R1vsR2');
console.log('  ' + '-'.repeat(80));

for (const grp of groups) {
  console.log('  == ' + grp.label + ' ==');
  for (const name of grp.names) {
    const th = thPct(name);
    const p1 = getR(run1, name).pct;
    const p2 = getR(run2, name).pct;
    const d1 = +(p1 - th).toFixed(2);
    const d2 = +(p2 - th).toFixed(2);
    const dv = +(p2 - p1).toFixed(2);
    const f  = v => ((v >= 0 ? '+' : '') + v + '%').padStart(7);
    console.log('  ' + name.padEnd(22) + ' ' + (th+'%').padStart(6) + '  ' + (p1+'%').padStart(6) + '  ' + (p2+'%').padStart(6) + '  ' + f(d1) + '   ' + f(d2) + '   ' + f(dv));
  }
  console.log('');
}
