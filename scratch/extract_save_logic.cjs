const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain\\996e894d-f869-449e-8a59-7f503b0e3f4d\\.system_generated\\logs\\overview.txt';
if (fs.existsSync(logPath)) {
  const content = fs.readFileSync(logPath, 'utf8');
  // Find handleSaveLP definition in this log file
  let idx = 0;
  while (true) {
    idx = content.indexOf('handleSaveLP', idx);
    if (idx === -1) break;
    console.log(`\n--- Match at index ${idx} ---`);
    console.log(content.substring(idx - 100, idx + 1500));
    idx += 12;
  }
} else {
  console.log('Log not found');
}
