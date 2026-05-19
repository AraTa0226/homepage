const fs = require('fs');
const path = require('path');

const logFile = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain\\d25c5cf0-f181-4031-b43f-542ba73c1636\\.system_generated\\logs\\overview.txt';
if (!fs.existsSync(logFile)) {
  console.error('Log file does not exist!');
  process.exit(1);
}

const content = fs.readFileSync(logFile, 'utf8');
const lines = content.split('\n');

console.log('Searching for Dashboard.tsx replacements in d25c5cf0...');

lines.forEach(line => {
  try {
    const parsed = JSON.parse(line);
    if (parsed.tool_calls) {
      parsed.tool_calls.forEach(tc => {
        if (tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content') {
          if (tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('Dashboard.tsx')) {
            console.log(`\n=========================================`);
            console.log(`Step Index: ${parsed.step_index}`);
            console.log(`Tool: ${tc.name}`);
            console.log(`Description: ${tc.args.Description}`);
            console.log(`Instruction: ${tc.args.Instruction}`);
            console.log(`StartLine: ${tc.args.StartLine} | EndLine: ${tc.args.EndLine}`);
            if (tc.args.TargetContent) {
              console.log(`TargetContent length: ${tc.args.TargetContent.length}`);
            }
            if (tc.args.ReplacementContent) {
              console.log(`ReplacementContent length: ${tc.args.ReplacementContent.length}`);
              // If it's short, print it. If long, print a snippet
              if (tc.args.ReplacementContent.length < 1000) {
                console.log(`ReplacementContent:\n${tc.args.ReplacementContent}`);
              } else {
                console.log(`ReplacementContent starts with:\n${tc.args.ReplacementContent.substring(0, 500)}...`);
                console.log(`ReplacementContent ends with:\n...${tc.args.ReplacementContent.substring(tc.args.ReplacementContent.length - 500)}`);
              }
            }
          }
        }
      });
    }
  } catch (e) {}
});
