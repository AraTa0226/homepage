const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('Route') || l.includes('lp') || l.includes('audio')) {
    console.log(i + 1, ':', l.trim());
  }
});
