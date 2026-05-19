const fs = require('fs');
const content = fs.readFileSync('src/pages/Audio/StandardLinePage.tsx', 'utf8');
const start = content.indexOf("case 'speakers':");
if (start !== -1) {
  console.log(content.substring(start, start + 3000));
} else {
  console.log('speakers case not found');
}
