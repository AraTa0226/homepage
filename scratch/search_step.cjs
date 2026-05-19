const fs = require('fs');
const content = fs.readFileSync('C:/Users/Taiji/.gemini/antigravity/brain/95618667-8019-480f-8536-cff6c04b79bb/.system_generated/logs/overview.txt', 'utf8');
const lines = content.split('\n');

for (let i = 466; i <= 476; i++) {
  console.log('LINE', i + 1, ':', lines[i].substring(0, 300));
}
