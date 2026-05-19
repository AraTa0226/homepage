const fs = require('fs');
const filePath = 'c:\\Users\\Taiji\\Desktop\\Ai-projects\\ang-homepage\\src\\pages\\Admin\\Dashboard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /<label className="text-\[9px\] font-black text-zinc-500 uppercase tracking-tighter">パッケージ合計 \(税別\)<\/label>/g,
  '<label className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">(税別)</label>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('SUCCESS: All label elements in Dashboard.tsx updated successfully!');
