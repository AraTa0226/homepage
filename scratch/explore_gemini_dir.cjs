const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\Taiji\\.gemini\\antigravity';
console.log('Exploring:', root);

function search(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const p = path.join(dir, file);
      const stat = fs.statSync(p);
      if (stat.isDirectory()) {
        results = results.concat(search(p));
      } else {
        // If file name has no extension or is .txt, .json, .tsx, .ts, .js, .cjs etc
        if (stat.size > 20000 && stat.size < 600000) {
          if (!p.includes('.tempmediaStorage') && !p.includes('node_modules')) {
            results.push({ path: p, size: stat.size, mtime: stat.mtimeMs });
          }
        }
      }
    });
  } catch (e) {}
  return results;
}

const files = search(root);
console.log('Found total candidate files:', files.length);

let matches = [];
files.forEach(f => {
  try {
    const content = fs.readFileSync(f.path, 'utf8');
    if (content.includes('AudioPlanManager') && content.includes('sections') && content.includes('lpData')) {
      matches.push(f);
    }
  } catch (e) {}
});

console.log('Matches:', matches.length);
matches.sort((a, b) => b.mtime - a.mtime);
matches.forEach((m, idx) => {
  console.log(`[${idx}] ${m.path} | Size: ${m.size} | Mtime: ${new Date(m.mtime).toISOString()}`);
});

if (matches.length > 0) {
  fs.copyFileSync(matches[0].path, 'scratch/recovered_raw_dashboard_anywhere.tsx');
  console.log('Copied first match to scratch/recovered_raw_dashboard_anywhere.tsx');
}
