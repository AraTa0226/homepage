const fs = require('fs');
const content = fs.readFileSync('src/pages/Audio/StandardLinePage.tsx', 'utf8');

const cases = ['text', 'banner', 'link_cards'];
cases.forEach(c => {
  console.log(`\n===================================`);
  console.log(`CASE: ${c}`);
  console.log(`===================================`);
  
  const regex = new RegExp(`case\\s+['"]${c}['"]`, 'g');
  const match = regex.exec(content);
  if (match) {
    const startIndex = match.index;
    const slice = content.substring(startIndex, startIndex + 2500);
    const lines = slice.split('\n');
    for (let i = 0; i < 30; i++) {
      if (lines[i] !== undefined) {
        console.log(`  ${i+1}: ${lines[i].trim()}`);
      }
    }
  }
});
