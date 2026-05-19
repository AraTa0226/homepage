const fs = require('fs');

const content = fs.readFileSync('src/pages/Audio/StandardLinePage.tsx', 'utf8');
const cases = [
  'hero',
  'pricing',
  'features',
  'upgrades',
  'speakers',
  'text',
  'banner',
  'link_cards',
  'cta',
  'faq',
  'gallery',
  'package_summary',
  'notes'
];

cases.forEach(c => {
  console.log(`\n===================================`);
  console.log(`CASE: ${c}`);
  console.log(`===================================`);
  
  // Find case starting position
  const regex = new RegExp(`case\\s+['"]${c}['"]`, 'g');
  const match = regex.exec(content);
  if (match) {
    const startIndex = match.index;
    // Let's get the next 100 lines or until the next case
    const slice = content.substring(startIndex, startIndex + 8000);
    // Find all occurrences of section.data.xxxx or section.xxxx
    const props = Array.from(new Set(slice.match(/section\.(data|type|id)\.?(\w+)?\.?(\w+)?/g) || []));
    console.log('Detected section references:');
    props.forEach(p => console.log('  ', p));
    
    // Print a bit of the switch block logic
    const lines = slice.split('\n');
    console.log('Snippet of lines:');
    for (let i = 0; i < 25; i++) {
      if (lines[i] !== undefined) {
        console.log(`  ${i+1}: ${lines[i].trim()}`);
      }
    }
  } else {
    console.log('Not found');
  }
});
