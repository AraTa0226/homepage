const fs = require('fs');
const filePath = 'c:\\Users\\Taiji\\Desktop\\Ai-projects\\ang-homepage\\src\\pages\\Admin\\Dashboard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Target 1: The title checkbox block
const oldCheckboxBlock = `                                                    <div className="flex items-center gap-6 pb-2">
                                                        <label className="flex items-center gap-3 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={!section.data.hideTitle} 
                                                                onChange={e => {
                                                                    const next = lpData.sections!.map((s, i) => i === sIdx ? { ...s, data: { ...s.data, hideTitle: !e.target.checked } } : s);
                                                                    setLpData({ ...lpData, sections: next });
                                                                }} 
                                                                className="w-5 h-5 accent-blue-600" 
                                                            />
                                                            <span className="text-xs font-black text-white">セクションタイトルを表示する</span>
                                                        </label>
                                                    </div>`;

const newCheckboxBlock = `                                                    <div className="flex items-center gap-8 pb-2">
                                                        <label className="flex items-center gap-3 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={!section.data.hideTitle} 
                                                                onChange={e => {
                                                                    const next = lpData.sections!.map((s, i) => i === sIdx ? { ...s, data: { ...s.data, hideTitle: !e.target.checked } } : s);
                                                                    setLpData({ ...lpData, sections: next });
                                                                }} 
                                                                className="w-5 h-5 accent-blue-600" 
                                                            />
                                                            <span className="text-xs font-black text-white">セクションタイトルを表示する</span>
                                                        </label>
                                                        <label className="flex items-center gap-3 cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={!section.data.hideSubtitle} 
                                                                onChange={e => {
                                                                    const next = lpData.sections!.map((s, i) => i === sIdx ? { ...s, data: { ...s.data, hideSubtitle: !e.target.checked } } : s);
                                                                    setLpData({ ...lpData, sections: next });
                                                                }} 
                                                                className="w-5 h-5 accent-blue-600" 
                                                            />
                                                            <span className="text-xs font-black text-white">セクションサブタイトルを表示する</span>
                                                        </label>
                                                    </div>`;

// Target 2: The subtitle input container opacity class
const oldSubtitleContainer = `                                                        <div className={section.data.hideTitle ? "opacity-30 pointer-events-none transition-all" : "transition-all"}>
                                                            <Input field="セクションサブタイトル" value={section.data.subtitle || ''} onChange={v => {
                                                                const next = lpData.sections!.map((s, i) => i === sIdx ? { ...s, data: { ...s.data, subtitle: v } } : s);
                                                                setLpData({ ...lpData, sections: next });
                                                            }} />
                                                        </div>`;

const newSubtitleContainer = `                                                        <div className={section.data.hideSubtitle ? "opacity-30 pointer-events-none transition-all" : "transition-all"}>
                                                            <Input field="セクションサブタイトル" value={section.data.subtitle || ''} onChange={v => {
                                                                const next = lpData.sections!.map((s, i) => i === sIdx ? { ...s, data: { ...s.data, subtitle: v } } : s);
                                                                setLpData({ ...lpData, sections: next });
                                                            }} />
                                                        </div>`;

// Clean CRLFs to make sure standard string replace matches correctly
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedOldCheck = oldCheckboxBlock.replace(/\r\n/g, '\n');
const normalizedNewCheck = newCheckboxBlock.replace(/\r\n/g, '\n');
const normalizedOldSub = oldSubtitleContainer.replace(/\r\n/g, '\n');
const normalizedNewSub = newSubtitleContainer.replace(/\r\n/g, '\n');

if (!normalizedContent.includes(normalizedOldCheck)) {
  console.error('ERROR: Old Checkbox Block NOT found!');
  process.exit(1);
}

if (!normalizedContent.includes(normalizedOldSub)) {
  console.error('ERROR: Old Subtitle Container NOT found!');
  process.exit(1);
}

let updated = normalizedContent.replace(normalizedOldCheck, normalizedNewCheck);
updated = updated.replace(normalizedOldSub, normalizedNewSub);

// Restore CRLFs
const finalOutput = updated.replace(/\n/g, '\r\n');
fs.writeFileSync(filePath, finalOutput, 'utf8');
console.log('SUCCESS: Dashboard.tsx updated successfully!');
