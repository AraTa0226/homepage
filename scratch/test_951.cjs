const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Taiji\\.gemini\\antigravity\\brain\\919bbe83-0529-4f2d-a9dd-79214c07e944\\.system_generated\\logs\\overview.txt', 'utf8');
const lines = content.split('\n');
const line = lines.find(l => l.includes('"step_index":951') && l.includes('"source":"MODEL"'));
if (line) {
  console.log('Full line:');
  console.log(line);
} else {
  console.log('Line not found');
}
