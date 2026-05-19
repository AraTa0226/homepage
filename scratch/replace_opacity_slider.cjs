const fs = require('fs');
const filePath = 'c:\\Users\\Taiji\\Desktop\\Ai-projects\\ang-homepage\\src\\pages\\Admin\\Dashboard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Target slider block with exact 56/60/64 spaces
const oldSliderBlock = `                                                        <div className="space-y-1.5">
                                                            <label className="block text-[10px] font-black text-blue-400 uppercase tracking-tighter">Overlay Opacity (0-1)</label>
                                                            <input type="range" min="0" max="1" step="0.1" value={section.data.opacity || 0.4} onChange={e => {
                                                                const next = lpData.sections!.map((s, i) => i === sIdx ? { ...s, data: { ...s.data, opacity: parseFloat(e.target.value) } } : s);
                                                                setLpData({ ...lpData, sections: next });
                                                            }} className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                                        </div>`;

const newSliderBlock = `                                                        <div className="space-y-1.5">
                                                            <div className="flex items-center justify-between">
                                                                <label className="block text-[10px] font-black text-blue-400 uppercase tracking-tighter">Overlay Opacity (背景の暗さ調整)</label>
                                                                <span className="text-[10px] font-black text-zinc-400">{Math.round((section.data.opacity !== undefined ? section.data.opacity : 0.4) * 100)}%</span>
                                                            </div>
                                                            <input type="range" min="0" max="1" step="0.1" value={section.data.opacity !== undefined ? section.data.opacity : 0.4} onChange={e => {
                                                                const next = lpData.sections!.map((s, i) => i === sIdx ? { ...s, data: { ...s.data, opacity: parseFloat(e.target.value) } } : s);
                                                                setLpData({ ...lpData, sections: next });
                                                            }} className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                                        </div>`;

// Clean CRLFs to make sure standard string replace matches correctly
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedOldSlider = oldSliderBlock.replace(/\r\n/g, '\n');
const normalizedNewSlider = newSliderBlock.replace(/\r\n/g, '\n');

if (!normalizedContent.includes(normalizedOldSlider)) {
  console.error('ERROR: Old Slider Block NOT found!');
  process.exit(1);
}

let updated = normalizedContent.replace(normalizedOldSlider, normalizedNewSlider);

// Restore CRLFs
const finalOutput = updated.replace(/\n/g, '\r\n');
fs.writeFileSync(filePath, finalOutput, 'utf8');
console.log('SUCCESS: Dashboard.tsx opacity slider updated successfully!');
