const fs = require('fs');

function unescape(str) {
  // We can wrap it in JSON.parse to let JS unescape it properly
  try {
    return JSON.parse('"' + str.replace(/"/g, '\\"') + '"');
  } catch (e) {
    return str; // Fallback
  }
}

try {
  let rep = fs.readFileSync('scratch/step_269_replacement.txt', 'utf8');
  // Wait, the file contains the raw JSON string value, so it might have literal \n or escaped.
  // Let's print length:
  console.log('Raw replacement length:', rep.length);
  
  // Since it was read from JSON object, does it have escaped quotes or literal newlines?
  // Let's write a proper parser by reading step_269_details.json directly and parsing it as a full JSON object!
  const logFile = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain\\d25c5cf0-f181-4031-b43f-542ba73c1636\\.system_generated\\logs\\overview.txt';
  const content = fs.readFileSync(logFile, 'utf8');
  const lines = content.split('\n');
  const line = lines.find(l => l.includes('"step_index":269') && l.includes('"source":"MODEL"'));
  if (line) {
    const parsed = JSON.parse(line);
    const tc = parsed.tool_calls[0];
    fs.writeFileSync('scratch/step_269_target_clean.txt', tc.args.TargetContent, 'utf8');
    fs.writeFileSync('scratch/step_269_replacement_clean.txt', tc.args.ReplacementContent, 'utf8');
    console.log('Wrote clean files successfully!');
    console.log('Clean Target Lines:', tc.args.TargetContent.split('\n').length);
    console.log('Clean Replacement Lines:', tc.args.ReplacementContent.split('\n').length);
  }
} catch (e) {
  console.error('Error:', e.message);
}
