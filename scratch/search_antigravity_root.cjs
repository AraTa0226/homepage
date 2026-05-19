const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\Taiji\\.gemini\\antigravity';
console.log('Searching in AppData dir:', baseDir);

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        // Skip logs and history since we already searched them
        if (file !== 'logs' && file !== 'History' && file !== 'brain') {
          results = results.concat(walk(filePath));
        }
      } else {
        results.push(filePath);
      }
    });
  } catch (e) {}
  return results;
}

const allFiles = walk(baseDir);
console.log('Total files outside brain/logs/history:', allFiles.length);

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
  } catch (e) {}
});

console.log('Matches found:', matches.length);
matches.forEach((m, idx) => {
  console.log(`[${idx}] File: ${m.file} | Size: ${m.size} | Modified: ${new Date(m.mtime).toISOString()}`);
});
