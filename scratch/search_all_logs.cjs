const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain';
if (!fs.existsSync(brainDir)) {
  console.log('Brain dir does not exist');
  process.exit(1);
}

const dirs = fs.readdirSync(brainDir);
dirs.forEach(d => {
  const logFile = path.join(brainDir, d, '.system_generated', 'logs', 'overview.txt');
  if (fs.existsSync(logFile)) {
    console.log(`Found logs in conversation: ${d}`);
    const content = fs.readFileSync(logFile, 'utf8');
    // Let's search for "Dashboard.tsx"
    const lines = content.split('\n');
    let matchesCount = 0;
    lines.forEach((line, idx) => {
      if (line.includes('Dashboard.tsx') && (line.includes('replace_file_content') || line.includes('multi_replace_file_content') || line.includes('write_to_file'))) {
        matchesCount++;
      }
    });
    console.log(`  Matches in ${d}: ${matchesCount}`);
  }
});
