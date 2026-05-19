const fs = require('fs');
const path = require('path');

const appData = process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming');
const list = fs.readdirSync(appData);

console.log('Roaming folders matching Code/Cursor/VS/history:');
list.forEach(f => {
  if (f.toLowerCase().includes('code') || f.toLowerCase().includes('cursor') || f.toLowerCase().includes('vscode')) {
    console.log('  ', f);
  }
});
