const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(filePath));
      } else {
        if (file === 'overview.txt') {
          results.push(filePath);
        }
      }
    });
  } catch (e) {
    console.error('Walk error for dir:', dir, e.message);
  }
  return results;
}

const baseDir = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain';
console.log('Walking baseDir:', baseDir);
const logs = walk(baseDir);
console.log('Found logs:', logs.length);

logs.forEach(logFile => {
  try {
    const content = fs.readFileSync(logFile, 'utf8');
    if (content.includes('handleDuplicateLP') || content.includes('DuplicateLP')) {
      console.log('Match found in:', logFile);
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (line.includes('handleDuplicateLP') || line.includes('DuplicateLP')) {
          console.log('Line ' + (idx+1) + ':', line.substring(0, 300));
        }
      });
    }
  } catch (err) {
    console.error('Error reading logFile:', logFile, err.message);
  }
});
