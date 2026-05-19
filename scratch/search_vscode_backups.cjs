const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming');
const backupsDir = path.join(appData, 'Code', 'Backups');

console.log('Searching in backups:', backupsDir);

if (!fs.existsSync(backupsDir)) {
  console.log('VS Code Backups directory does not exist at:', backupsDir);
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

const allFiles = walk(backupsDir);
console.log('Found backup files:', allFiles.length);

let matches = [];
allFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('AdminDashboard') && content.includes('audioLPs')) {
      const stat = fs.statSync(file);
      matches.push({ file, size: stat.size, mtime: stat.mtimeMs });
    }
  } catch (e) {
    // Ignore error
  }
});

matches.sort((a, b) => b.mtime - a.mtime);
console.log('Found matches:', matches.length);
matches.forEach(m => {
  console.log('File:', m.file, 'Size:', m.size, 'Mtime:', new Date(m.mtime).toISOString());
});
