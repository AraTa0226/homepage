const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Taiji\\.gemini\\antigravity\\brain\\919bbe83-0529-4f2d-a9dd-79214c07e944\\.system_generated\\logs\\overview.txt', 'utf8');
const lines = content.split('\n');

const steps = [850, 951, 954, 957, 963, 966, 1077, 1101, 1203];
lines.forEach(line => {
  try {
    const parsed = JSON.parse(line);
    if (steps.includes(parsed.step_index)) {
      console.log('Step:', parsed.step_index);
      parsed.tool_calls.forEach(tc => {
        console.log('  Description:', tc.args.Description);
        console.log('  Instruction:', tc.args.Instruction);
        if (tc.args.TargetContent) {
          console.log('  TargetContent:', tc.args.TargetContent.substring(0, 100).replace(/\r?\n/g, '\\n'));
        }
        if (tc.args.ReplacementContent) {
          console.log('  ReplacementContent len:', tc.args.ReplacementContent.length);
        }
      });
    }
  } catch(e) {
    console.log('Error parsing JSON for line containing step:', line.substring(0, 200));
  }
});
