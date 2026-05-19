const fs = require('fs');
const path = require('path');

const logFile = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain\\919bbe83-0529-4f2d-a9dd-79214c07e944\\.system_generated\\logs\\overview.txt';
if (!fs.existsSync(logFile)) {
  console.error('Log file does not exist!');
  process.exit(1);
}

const content = fs.readFileSync(logFile, 'utf8');
const lines = content.split('\n');

const line = lines.find(l => l.includes('"step_index":951') && l.includes('"source":"MODEL"'));
if (line) {
  fs.writeFileSync('scratch/step_951_details.json', line, 'utf8');
  console.log('Successfully saved to scratch/step_951_details.json');
} else {
  console.log('Step 951 not found in logs.');
}
