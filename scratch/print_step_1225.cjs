const fs = require('fs');
const path = require('path');
const file = 'scratch/extracted/996e894d-f869-449e-8a59-7f503b0e3f4d_step_1225_tc_0.json';
if (fs.existsSync(file)) {
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log(d.replacement);
} else {
  console.log('File not found');
}
