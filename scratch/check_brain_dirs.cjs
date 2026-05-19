const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\Taiji\\.gemini\\antigravity\\brain';
const list = fs.readdirSync(baseDir);

list.forEach(dir => {
  const dirPath = path.join(baseDir, dir);
  if (fs.statSync(dirPath).isDirectory()) {
    const logFile = path.join(dirPath, '.system_generated', 'logs', 'overview.txt');
    if (fs.existsSync(logFile)) {
      const stat = fs.statSync(logFile);
      const content = fs.readFileSync(logFile, 'utf8');
      const lines = content.split('\n').filter(l => l.trim().length > 0);
      let minStep = 999999;
      let maxStep = -1;
      lines.forEach(line => {
        try {
          const parsed = JSON.parse(line);
          if (parsed.step_index !== undefined) {
            if (parsed.step_index < minStep) minStep = parsed.step_index;
            if (parsed.step_index > maxStep) maxStep = parsed.step_index;
          }
        } catch(e) {}
      });
      console.log(`Dir: ${dir} | Steps: ${minStep} to ${maxStep} | Lines: ${lines.length} | Size: ${stat.size} | Modified: ${stat.mtime.toISOString()}`);
    } else {
      console.log(`Dir: ${dir} | No overview.txt`);
    }
  }
});
