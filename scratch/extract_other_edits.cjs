const fs = require('fs');
const path = require('path');

const targetLogs = [
  '8f9d4002-6a3c-479a-b414-25a390ba9ce2',
  '919bbe83-0529-4f2d-a9dd-79214c07e944',
  '996e894d-f869-449e-8a59-7f503b0e3f4d',
  'd25c5cf0-f181-4031-b43f-542ba73c1636'
];

targetLogs.forEach(id => {
  const logFile = `C:\\Users\\Taiji\\.gemini\\antigravity\\brain\\${id}\\.system_generated\\logs\\overview.txt`;
  if (!fs.existsSync(logFile)) return;
  console.log('========================================================================');
  console.log('CONVERSATION ID:', id);
  console.log('========================================================================');
  const content = fs.readFileSync(logFile, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('Dashboard.tsx') && (line.includes('replace_file_content') || line.includes('multi_replace_file_content') || line.includes('write_to_file'))) {
      try {
        const parsed = JSON.parse(line);
        console.log('  Step:', parsed.step_index);
        if (parsed.tool_calls) {
          parsed.tool_calls.forEach(tc => {
            if (tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content' || tc.name === 'write_to_file') {
              console.log('    Tool:', tc.name);
              console.log('    Description:', tc.args.Description || tc.args.Instruction);
              if (tc.args.StartLine) {
                console.log('    Lines:', tc.args.StartLine, 'to', tc.args.EndLine);
              }
              if (tc.args.TargetContent) {
                console.log('    TargetContent preview:', tc.args.TargetContent.substring(0, 100).replace(/\r?\n/g, '\\n'));
              }
            }
          });
        }
      } catch (e) {
        // Not JSON
      }
    }
  });
});
