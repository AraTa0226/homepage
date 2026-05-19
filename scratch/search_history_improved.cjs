const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming');
const historyDir = path.join(appData, 'Code', 'User', 'History');

console.log('Searching in:', historyDir);

if (!fs.existsSync(historyDir)) {
  console.log('VS Code History directory does not exist at:', historyDir);
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
    // Ignore error
  }
  return results;
}

const allFiles = walk(historyDir);
console.log('Found history files:', allFiles.length);

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
    // Ignore error
  }
});

matches.sort((a, b) => b.mtime - a.mtime);

console.log('Found matches:', matches.length);
matches.forEach((m, idx) => {
  console.log(`[${idx}] File: ${m.file} Size: ${m.size} Mtime: ${new Date(m.mtime).toISOString()}`);
});
