const fs = require('fs');
const filePath = 'c:\\Users\\Taiji\\Desktop\\Ai-projects\\ang-homepage\\src\\pages\\Admin\\Dashboard.tsx';
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

lines.forEach((line, index) => {
  if (line.includes('Overlay Opacity')) {
    console.log(`Line ${index + 1}:`);
    for (let i = Math.max(0, index - 2); i <= Math.min(lines.length - 1, index + 5); i++) {
      const match = lines[i].match(/^(\s*)(.*)/);
      const spaces = match ? match[1].length : 0;
      const content = match ? match[2] : '';
      console.log(`${i + 1}: spaces=${spaces} content="${content}"`);
    }
  }
});
