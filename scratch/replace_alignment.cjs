const fs = require('fs');
const filePath = 'c:\\Users\\Taiji\\Desktop\\Ai-projects\\ang-homepage\\src\\pages\\Admin\\Dashboard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Target 1: The dual checkboxes block
const oldCheckboxesBlock = `                                                    <div className="flex items-center gap-8 pb-2">
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

const newCheckboxesBlock = `                                                    <div className="flex items-center gap-8 pb-2">
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

                                                        <div className={\`flex items-center gap-2 pl-4 border-l border-zinc-800 transition-all \${section.data.hideTitle ? 'opacity-100' : 'opacity-30 pointer-events-none'}\`}>
                                                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mr-2">サブタイトル配置:</span>
                                                            <select 
                                                                value={section.data.subtitleAlign || 'right'} 
                                                                onChange={e => {
                                                                    const next = lpData.sections!.map((s, i) => i === sIdx ? { ...s, data: { ...s.data, subtitleAlign: e.target.value } } : s);
                                                                    setLpData({ ...lpData, sections: next });
                                                                }} 
                                                                className="bg-black border border-zinc-800 rounded-lg px-2 py-1 text-[10px] font-bold text-white outline-none focus:border-blue-500"
                                                            >
                                                                <option value="right">右詰め (デフォルト)</option>
                                                                <option value="center">中央寄せ</option>
                                                                <option value="left">左詰め</option>
                                                            </select>
                                                        </div>
                                                    </div>`;

// Clean CRLFs to make sure standard string replace matches correctly
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedOldCheck = oldCheckboxesBlock.replace(/\r\n/g, '\n');
const normalizedNewCheck = newCheckboxesBlock.replace(/\r\n/g, '\n');

if (!normalizedContent.includes(normalizedOldCheck)) {
  console.error('ERROR: Dual Checkboxes Block NOT found!');
  process.exit(1);
}

let updated = normalizedContent.replace(normalizedOldCheck, normalizedNewCheck);

// Restore CRLFs
const finalOutput = updated.replace(/\n/g, '\r\n');
fs.writeFileSync(filePath, finalOutput, 'utf8');
console.log('SUCCESS: Dashboard.tsx subtitleAlign selector added successfully!');
