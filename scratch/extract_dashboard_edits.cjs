const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain';
const targetConversations = [
  '919bbe83-0529-4f2d-a9dd-79214c07e944',
  '996e894d-f869-449e-8a59-7f503b0e3f4d',
  'd25c5cf0-f181-4031-b43f-542ba73c1636'
];

targetConversations.forEach(convId => {
  const logFile = path.join(brainDir, convId, '.system_generated', 'logs', 'overview.txt');
  if (!fs.existsSync(logFile)) {
    console.log(`Log file for ${convId} does not exist.`);
    return;
  }
  console.log(`\n======================================================`);
  console.log(`CONVERSATION: ${convId}`);
  console.log(`======================================================`);
  
  const content = fs.readFileSync(logFile, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach(line => {
    try {
      const parsed = JSON.parse(line);
      if (parsed.tool_calls) {
        parsed.tool_calls.forEach(tc => {
          if (tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content' || tc.name === 'write_to_file') {
            if (tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('Dashboard.tsx')) {
              console.log(`  Step Index: ${parsed.step_index}`);
              console.log(`  Tool: ${tc.name}`);
              console.log(`  Description: ${tc.args.Description}`);
              console.log(`  Instruction: ${tc.args.Instruction}`);
              if (tc.args.StartLine !== undefined) {
                console.log(`  Lines: ${tc.args.StartLine} - ${tc.args.EndLine}`);
              }
              if (tc.args.ReplacementContent) {
                const len = tc.args.ReplacementContent.length;
                console.log(`  Replacement length: ${len}`);
                // Save it to a scratch file so we can view it
                const filename = `scratch/edit_${convId}_step_${parsed.step_index}.txt`;
                fs.writeFileSync(filename, tc.args.ReplacementContent, 'utf8');
                console.log(`  Saved to ${filename}`);
              }
            }
          }
        });
      }
    } catch (e) {}
  });
});
