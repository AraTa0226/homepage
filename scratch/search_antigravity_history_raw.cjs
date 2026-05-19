const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming');
const antigravityHistoryDir = path.join(appData, 'Antigravity', 'User', 'History');

console.log('Searching raw in:', antigravityHistoryDir);

if (!fs.existsSync(antigravityHistoryDir)) {
  console.log('Directory does not exist');
  process.exit(1);
}

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(filePath));
      } else {
        results.push(filePath);
      }
    });
  } catch (e) {}
  return results;
}

const files = walk(antigravityHistoryDir);
console.log('Total history files:', files.length);

let matches = [];
files.forEach(f => {
  try {
    // If it's a file (not entries.json), check if it contains the word "reorderAudioLPs" and "case 'faq'"
    if (f.endsWith('entries.json')) {
      const content = fs.readFileSync(f, 'utf8');
      if (content.includes('Dashboard.tsx')) {
        console.log('entries.json match:', f);
        console.log(content);
      }
    } else {
      // Just check size first to avoid reading huge binary files if any
      const stat = fs.statSync(f);
      if (stat.size > 20000 && stat.size < 500000) {
        const content = fs.readFileSync(f, 'utf8');
        if (content.includes('AudioPlanManager') && content.includes('case \'faq\'')) {
          matches.push({ file: f, size: stat.size, mtime: stat.mtimeMs });
        }
      }
    }
  } catch (e) {}
});

console.log('Matches:', matches.length);
matches.sort((a,b) => b.mtime - a.mtime);
matches.forEach((m, i) => {
  console.log(`[${i}] File: ${m.file} | Size: ${m.size} | Mtime: ${new Date(m.mtime).toISOString()}`);
});
if (matches.length > 0) {
  fs.copyFileSync(matches[0].file, 'scratch/recovered_raw_dashboard.tsx');
  console.log('Copied raw match to scratch/recovered_raw_dashboard.tsx');
}
