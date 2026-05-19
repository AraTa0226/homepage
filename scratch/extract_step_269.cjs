const fs = require('fs');
const path = require('path');

const logFile = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain\\d25c5cf0-f181-4031-b43f-542ba73c1636\\.system_generated\\logs\\overview.txt';
if (!fs.existsSync(logFile)) {
  console.error('Log file does not exist!');
  process.exit(1);
}

const content = fs.readFileSync(logFile, 'utf8');
const lines = content.split('\n');

const line = lines.find(l => l.includes('"step_index":269') && l.includes('"source":"MODEL"'));
if (line) {
  const parsed = JSON.parse(line);
  const tc = parsed.tool_calls[0];
  fs.writeFileSync('scratch/step_269_target.txt', tc.args.TargetContent, 'utf8');
  fs.writeFileSync('scratch/step_269_replacement.txt', tc.args.ReplacementContent, 'utf8');
  console.log('Successfully saved step 269 details to scratch/step_269_target.txt and scratch/step_269_replacement.txt');
} else {
  console.log('Step 269 not found.');
}
