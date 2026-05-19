const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'extracted');
if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  files.forEach(f => {
    try {
      const content = fs.readFileSync(path.join(dir, f), 'utf8');
      const data = JSON.parse(content);
      console.log(`File: ${f} | Tool: ${data.toolName} | Lines: ${data.startLine}-${data.endLine} | Desc: ${data.desc.substring(0, 100)}`);
    } catch (e) {
      console.log(`File: ${f} failed to parse: ${e.message}`);
    }
  });
}
