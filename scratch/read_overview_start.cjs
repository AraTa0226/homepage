const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain\\919bbe83-0529-4f2d-a9dd-79214c07e944\\.system_generated\\logs\\overview.txt';
if (fs.existsSync(logPath)) {
  const content = fs.readFileSync(logPath, 'utf8');
  console.log('File size:', content.length);
  console.log('First 2000 chars:');
  console.log(content.substring(0, 2000));
} else {
  console.log('Log file does not exist');
}
