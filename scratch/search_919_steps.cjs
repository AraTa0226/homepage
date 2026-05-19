const fs = require('fs');
const path = require('path');

const logFile = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain\\919bbe83-0529-4f2d-a9dd-79214c07e944\\.system_generated\\logs\\overview.txt';
if (!fs.existsSync(logFile)) {
  console.error('Log file does not exist!');
  process.exit(1);
}

const content = fs.readFileSync(logFile, 'utf8');
const lines = content.split('\n');

lines.forEach(line => {
  try {
    const parsed = JSON.parse(line);
    if (parsed.tool_calls) {
      parsed.tool_calls.forEach(tc => {
        if (tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('Dashboard.tsx')) {
          console.log(`Step: ${parsed.step_index} | Tool: ${tc.name} | Description: ${tc.args.Description || tc.args.Instruction}`);
        }
      });
    }
  } catch (e) {}
});
