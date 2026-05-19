const fs = require('fs');
const path = 'c:\\Users\\Taiji\\Desktop\\Ai-projects\\ang-homepage\\src\\pages\\Admin\\Dashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace first occurrence (sections)
content = content.replace(
    /<div className="flex-grow"><Input field="備考欄 \(空欄で非表示\)" value=\{spk\.remarks\} onChange=\{v => \{/g,
    `<div className="flex-grow"><div className="space-y-1.5"><label className="block text-[10px] font-black text-zinc-500 uppercase tracking-tighter">備考欄 (空欄で非表示)</label><textarea value={spk.remarks || ''} onChange={e => { const v = e.target.value;`
);

// We need to also close the textarea and div properly.
// The original code was:
// <div className="flex-grow"><Input field="備考欄 (空欄で非表示)" value={spk.remarks} onChange={v => {
//     const nextSpks = [...currentSpeakers];
//     nextSpks[idx] = { ...spk, remarks: v };
//     const next = lpData.sections!.map((s, i) => i === sIdx ? { ...s, data: { ...s.data, speakers: nextSpks } } : s);
//     setLpData({ ...lpData, sections: next });
// }} /></div>
// We changed `v => {` to `e => { const v = e.target.value;`
// We need to change `}} /></div>` to `}} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold text-white min-h-[42px] max-h-[200px]" /></div></div>`

// Wait, the first replacement replaced the start. Now let's replace the end of that specific block.
content = content.replace(
    /setLpData\(\{ \.\.\.lpData, sections: next \}\);\s*\}\} \/><\/div>/g,
    `setLpData({ ...lpData, sections: next });\n                                                                                        }} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold text-white min-h-[42px] max-h-[200px]" /></div></div>`
);

// Replace second occurrence (global speakers)
// The original code:
// <div className="flex-grow"><Input field="備考欄 (空欄で非表示)" value={spk.remarks} onChange={v => { const n=[...lpData.speakers]; n[idx]={...spk, remarks:v}; setLpData({...lpData, speakers:n}); }} /></div>
content = content.replace(
    /<div className="flex-grow"><Input field="備考欄 \(空欄で非表示\)" value=\{spk\.remarks\} onChange=\{v => \{ const n=\[\.\.\.lpData\.speakers\]; n\[idx\]=\{\.\.\.spk, remarks:v\}; setLpData\(\{\.\.\.lpData, speakers:n\}\); \}\} \/><\/div>/g,
    `<div className="flex-grow"><div className="space-y-1.5"><label className="block text-[10px] font-black text-zinc-500 uppercase tracking-tighter">備考欄 (空欄で非表示)</label><textarea value={spk.remarks || ''} onChange={e => { const n=[...lpData.speakers]; n[idx]={...spk, remarks:e.target.value}; setLpData({...lpData, speakers:n}); }} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold text-white min-h-[42px] max-h-[200px]" /></div></div>`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Dashboard.tsx updated');
