const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain';
const conversations = [
  '919bbe83-0529-4f2d-a9dd-79214c07e944',
  '996e894d-f869-449e-8a59-7f503b0e3f4d',
  'd25c5cf0-f181-4031-b43f-542ba73c1636'
];

const outDir = path.join(__dirname, 'extracted');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

conversations.forEach(convId => {
  const logPath = path.join(baseDir, convId, '.system_generated', 'logs', 'overview.txt');
  if (!fs.existsSync(logPath)) {
    console.log(`Log for ${convId} does not exist`);
    return;
  }
  
  console.log(`\nProcessing conversation: ${convId}`);
  const lines = fs.readFileSync(logPath, 'utf8').split('\n');
  let count = 0;
  
  lines.forEach((line, lineNum) => {
    if (!line.trim()) return;
    try {
      const obj = JSON.parse(line);
      const stepIdx = obj.step_index;
      
      if (obj.tool_calls && Array.isArray(obj.tool_calls)) {
        obj.tool_calls.forEach((tc, tcIdx) => {
          if (tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('Dashboard.tsx')) {
            count++;
            const desc = tc.args.Description || '';
            const inst = tc.args.Instruction || '';
            const target = tc.args.TargetContent || '';
            const replacement = tc.args.ReplacementContent || '';
            const toolName = tc.name;
            const startLine = tc.args.StartLine || '';
            const endLine = tc.args.EndLine || '';
            
            const info = {
              convId,
              stepIdx,
              toolName,
              startLine,
              endLine,
              desc,
              inst,
              target,
              replacement
            };
            
            const outPath = path.join(outDir, `${convId}_step_${stepIdx}_tc_${tcIdx}.json`);
            fs.writeFileSync(outPath, JSON.stringify(info, null, 2), 'utf8');
            console.log(`Saved step ${stepIdx} to ${outPath} (${toolName}, lines ${startLine}-${endLine})`);
          }
        });
      }
    } catch (e) {
      // Ignore lines that are not valid JSON or other errors
    }
  });
  console.log(`Found ${count} tool calls modifying Dashboard.tsx in ${convId}`);
});
