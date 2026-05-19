const fs = require('fs');
const content = fs.readFileSync('src/pages/Audio/StandardLinePage.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('case \'') || line.includes('case "')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
