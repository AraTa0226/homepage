const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming');
const historyDir = path.join(appData, 'Code', 'User', 'History');

console.log('Searching in:', historyDir);

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
    const content = fs.readFileSync(file, 'utf8');
    if (content.toLowerCase().includes('audiolps')) {
      const stat = fs.statSync(file);
      matches.push({ file, size: stat.size, mtime: stat.mtimeMs });
    }
  } catch (e) {
    // Ignore
  }
});

console.log('Matches for audiolps:', matches.length);
matches.sort((a, b) => b.mtime - a.mtime);
matches.slice(0, 10).forEach(m => {
  console.log(`File: ${m.file} | Size: ${m.size} | Mtime: ${new Date(m.mtime).toISOString()}`);
});
