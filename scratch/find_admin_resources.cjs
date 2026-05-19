const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming');
const antigravityHistoryDir = path.join(appData, 'Antigravity', 'User', 'History');

if (!fs.existsSync(antigravityHistoryDir)) {
  console.log('Antigravity History directory does not exist.');
  process.exit(1);
}

const list = fs.readdirSync(antigravityHistoryDir);
list.forEach(sub => {
  const subPath = path.join(antigravityHistoryDir, sub);
  try {
    const stat = fs.statSync(subPath);
    if (stat.isDirectory()) {
      const entriesFile = path.join(subPath, 'entries.json');
      if (fs.existsSync(entriesFile)) {
        const data = JSON.parse(fs.readFileSync(entriesFile, 'utf8'));
        if (data.resource) {
          const res = decodeURIComponent(data.resource);
          if (res.includes('Admin') || res.includes('Dashboard') || res.includes('dashboard')) {
            console.log(`Sub: ${sub} | Resource: ${res}`);
            // List files inside
            const files = fs.readdirSync(subPath);
            files.forEach(f => {
              if (f !== 'entries.json') {
                const fStat = fs.statSync(path.join(subPath, f));
                console.log(`  File: ${f} | Size: ${fStat.size} | Mtime: ${fStat.mtime.toISOString()}`);
              }
            });
          }
        }
      }
    }
  } catch (e) {}
});
