const fs = require('fs');
const filePath = 'c:\\Users\\Taiji\\Desktop\\Ai-projects\\ang-homepage\\src\\pages\\Admin\\Dashboard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /Math\.floor\(\(parsePrice\(spk\.standalonePrice\) \+ spkFixedPrice\) \/ \(1 \+ \(lpData\.pricing\?\.taxRate \|\| 10\) \/ 100\)\)/g,
  'Math.round((parsePrice(spk.standalonePrice) + spkFixedPrice) / (1 + (lpData.pricing?.taxRate || 10) / 100))'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('SUCCESS: All Math.floor division elements in Dashboard.tsx updated to Math.round!');
