const fs = require('fs');
const path = require('path');

const logFile = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain\\d25c5cf0-f181-4031-b43f-542ba73c1636\\.system_generated\\logs\\overview.txt';
if (!fs.existsSync(logFile)) {
  console.error('Log file does not exist!');
  process.exit(1);
}

const content = fs.readFileSync(logFile, 'utf8');
const lines = content.split('\n');

const stepsToExtract = [113, 239, 269, 443, 449, 452];

lines.forEach(line => {
  try {
    const parsed = JSON.parse(line);
    if (stepsToExtract.includes(parsed.step_index)) {
      console.log('Extracting step:', parsed.step_index);
      fs.writeFileSync(
        `scratch/step_${parsed.step_index}_content.txt`,
        JSON.stringify(parsed, null, 2),
        'utf8'
      );
    }
  } catch (e) {
    // Ignore non-json lines
  }
});

console.log('Extraction complete!');
