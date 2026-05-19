const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming');
const antigravityHistoryDir = path.join(appData, 'Antigravity', 'User', 'History');

console.log('Searching in Antigravity history:', antigravityHistoryDir);

if (!fs.existsSync(antigravityHistoryDir)) {
  console.log('Antigravity History directory does not exist.');
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
  } catch (e) {
    // Ignore
  }
  return results;
}

const allFiles = walk(antigravityHistoryDir);
console.log('Found history files in Antigravity:', allFiles.length);

let matches = [];
allFiles.forEach(file => {
  try {
    const stat = fs.statSync(file);
    if (stat.size > 150000 && stat.size < 350000) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('AudioPlanManager') && content.includes('audioLPs') && content.includes('sections')) {
        matches.push({ file, size: stat.size, mtime: stat.mtimeMs });
      }
    }
  } catch (e) {
    // Ignore
  }
});

console.log('Matches in Antigravity:', matches.length);
matches.sort((a, b) => b.mtime - a.mtime);
matches.forEach((m, idx) => {
  console.log(`[${idx}] File: ${m.file} | Size: ${m.size} | Lines: ${fs.readFileSync(m.file, 'utf8').split('\n').length} | Modified: ${new Date(m.mtime).toISOString()}`);
});

if (matches.length > 0) {
  // Let's copy the latest match to scratch/recovered_dashboard.tsx
  const latestMatch = matches[0].file;
  fs.copyFileSync(latestMatch, 'scratch/recovered_dashboard.tsx');
  console.log(`Successfully recovered latest version to scratch/recovered_dashboard.tsx`);
}
