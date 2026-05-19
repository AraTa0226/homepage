const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming');
const historyDir = path.join(appData, 'Code', 'User', 'History');

console.log('Searching in:', historyDir);

if (!fs.existsSync(historyDir)) {
  console.log('VS Code History directory does not exist at:', historyDir);
  process.exit(1);
}

function findEntries(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(sub => {
    const subPath = path.join(dir, sub);
    const stat = fs.statSync(subPath);
    if (stat.isDirectory()) {
      const entriesFile = path.join(subPath, 'entries.json');
      if (fs.existsSync(entriesFile)) {
        try {
          const data = JSON.parse(fs.readFileSync(entriesFile, 'utf8'));
          if (data.resource && data.resource.includes('Dashboard.tsx')) {
            console.log('Found Dashboard.tsx entries in:', subPath);
            console.log(JSON.stringify(data, null, 2));
            // List all files in this sub directory
            const files = fs.readdirSync(subPath);
            files.forEach(f => {
              if (f !== 'entries.json') {
                const fPath = path.join(subPath, f);
                const fStat = fs.statSync(fPath);
                console.log(`  File: ${f} Size: ${fStat.size} Mtime: ${fStat.mtime}`);
              }
            });
          }
        } catch (e) {
          // Ignore
        }
      }
    }
  });
}

findEntries(historyDir);
