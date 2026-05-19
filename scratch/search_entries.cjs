const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming');
const historyDir = path.join(appData, 'Code', 'User', 'History');

console.log('Searching in entries.json under:', historyDir);

if (!fs.existsSync(historyDir)) {
  console.log('VS Code History directory does not exist at:', historyDir);
  process.exit(1);
}

function findEntries(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(findEntries(filePath));
      } else {
        if (file === 'entries.json') {
          results.push(filePath);
        }
      }
    });
  } catch (e) {
    // Ignore error
  }
  return results;
}

const entriesFiles = findEntries(historyDir);
console.log('Found entries.json files:', entriesFiles.length);

entriesFiles.forEach(entFile => {
  try {
    const data = JSON.parse(fs.readFileSync(entFile, 'utf8'));
    if (data.resource && data.resource.includes('Dashboard.tsx')) {
      console.log('Match found in:', entFile);
      console.log('Resource:', data.resource);
      console.log('Entries:', data.entries);
    }
  } catch (e) {
    // Ignore error
  }
});
