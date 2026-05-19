const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming');
console.log('Searching all History folders in AppData:', appData);

function findHistoryDirs(dir, depth = 0) {
  if (depth > 4) return;
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          if (file.toLowerCase() === 'history') {
            console.log('Found history directory:', filePath);
          } else {
            findHistoryDirs(filePath, depth + 1);
          }
        }
      } catch(e) {}
    });
  } catch (e) {}
}

findHistoryDirs(appData);
