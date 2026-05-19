const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain';
const convId = '919bbe83-0529-4f2d-a9dd-79214c07e944';

const logFile = path.join(brainDir, convId, '.system_generated', 'logs', 'overview.txt');
if (!fs.existsSync(logFile)) {
  console.log(`Log file for ${convId} does not exist.`);
  process.exit(1);
}

const content = fs.readFileSync(logFile, 'utf8');
const lines = content.split('\n');
let out = [];

lines.forEach(line => {
  try {
    const parsed = JSON.parse(line);
    if (parsed.tool_calls) {
      parsed.tool_calls.forEach(tc => {
        if (tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content' || tc.name === 'write_to_file') {
          if (tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('Dashboard.tsx')) {
            out.push(`Step Index: ${parsed.step_index}`);
            out.push(`Tool: ${tc.name}`);
            out.push(`Description: ${tc.args.Description}`);
            out.push(`Instruction: ${tc.args.Instruction}`);
            if (tc.args.StartLine !== undefined) {
              out.push(`Lines: ${tc.args.StartLine} - ${tc.args.EndLine}`);
            }
            if (tc.args.ReplacementContent) {
              const filename = `scratch/edit_${convId}_step_${parsed.step_index}.txt`;
              fs.writeFileSync(filename, tc.args.ReplacementContent, 'utf8');
              out.push(`Saved to ${filename}`);
            }
            out.push('----------------------------------------\n');
          }
        }
      });
    }
  } catch (e) {}
});

fs.writeFileSync('scratch/search_919_logs.txt', out.join('\n'), 'utf8');
console.log('Done! Check scratch/search_919_logs.txt');
