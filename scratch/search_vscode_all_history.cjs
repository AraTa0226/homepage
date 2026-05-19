const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming');
const historyDir = path.join(appData, 'Code', 'User', 'History');

console.log('Searching all history in:', historyDir);

if (!fs.existsSync(historyDir)) {
  console.log('VS Code History directory does not exist');
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

const allFiles = walk(historyDir);
console.log('Total files found:', allFiles.length);

let matches = [];
allFiles.forEach(file => {
  try {
    const stat = fs.statSync(file);
    if (stat.size > 1000) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('AudioPlanManager')) {
        matches.push({ file, size: stat.size, mtime: stat.mtimeMs });
      }
    }
  } catch (e) {}
});

matches.sort((a, b) => b.mtime - a.mtime);
console.log('Matches for AudioPlanManager:', matches.length);
matches.forEach((m, idx) => {
  console.log(`[${idx}] ${m.file} | Size: ${m.size} | Mtime: ${new Date(m.mtime).toISOString()}`);
});

if (matches.length > 0) {
  fs.copyFileSync(matches[0].file, 'scratch/recovered_dashboard_vscode.tsx');
  console.log('Copied latest to scratch/recovered_dashboard_vscode.tsx');
}
