const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
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
  return results;
}

const baseDir = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain';
const logs = walk(baseDir);

logs.forEach(logFile => {
  try {
    const content = fs.readFileSync(logFile, 'utf8');
    if (content.includes('Dashboard.tsx')) {
      const occurrences = (content.match(/Dashboard\.tsx/g) || []).length;
      console.log('Log:', logFile, 'Occurrences of Dashboard.tsx:', occurrences);
    }
  } catch (err) {
    // Ignore errors
  }
});
