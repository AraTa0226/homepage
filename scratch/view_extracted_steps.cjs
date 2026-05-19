const fs = require('fs');
const path = require('path');

const files = [
  'd25c5cf0-f181-4031-b43f-542ba73c1636_step_443_tc_0.json',
  'd25c5cf0-f181-4031-b43f-542ba73c1636_step_269_tc_0.json',
  '996e894d-f869-449e-8a59-7f503b0e3f4d_step_1225_tc_0.json',
  '919bbe83-0529-4f2d-a9dd-79214c07e944_step_951_tc_0.json'
];

files.forEach(f => {
  const p = path.join(__dirname, 'extracted', f);
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    console.log(`\n==========================================`);
    console.log(`FILE: ${f}`);
    console.log(`Tool: ${data.toolName} | Lines: ${data.startLine} - ${data.endLine}`);
    console.log(`Description: ${data.desc}`);
    console.log(`Instruction: ${data.inst}`);
    if (data.target) {
      console.log(`Target length: ${data.target.length}`);
      console.log(`Target preview: ${data.target.substring(0, 300)}...`);
    }
    if (data.replacement) {
      console.log(`Replacement length: ${data.replacement.length}`);
      console.log(`Replacement preview: ${data.replacement.substring(0, 300)}...`);
    }
    // Save replacement content to a separate text file so we can view it cleanly
    const txtPath = p.replace('.json', '_replacement.txt');
    fs.writeFileSync(txtPath, data.replacement || JSON.stringify(data.replacement || data.chunks || data, null, 2), 'utf8');
    console.log(`Saved full replacement to: ${txtPath}`);
  }
});
