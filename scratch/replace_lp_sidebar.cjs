const fs = require('fs');
const filePath = 'c:\\Users\\Taiji\\Desktop\\Ai-projects\\ang-homepage\\src\\pages\\Admin\\Dashboard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Target 1: The state block
const oldStateBlock = `    // --- LP MANAGEMENT STATE ---
    const [selectedLPId, setSelectedLPId] = useState(() => audioLPs[0]?.id || 'standard');
    const currentLP = audioLPs.find(p => p.id === selectedLPId) || audioLPs[0];
    const [lpData, setLpData] = useState(() => currentLP);`;

const newStateBlock = `    // --- LP MANAGEMENT STATE ---
    const [selectedLPId, setSelectedLPId] = useState(() => audioLPs[0]?.id || 'standard');
    const currentLP = audioLPs.find(p => p.id === selectedLPId) || audioLPs[0];
    const [lpData, setLpData] = useState(() => currentLP);
    const [lpSearchQuery, setLpSearchQuery] = useState('');
    const [lpStatusFilter, setLpStatusFilter] = useState('all');

    const filteredLPs = audioLPs.filter(lp => {
        if (!lp) return false;
        if (lpSearchQuery) {
            const query = lpSearchQuery.toLowerCase().trim();
            const nameMatch = (lp.name || '').toLowerCase().includes(query);
            const slugMatch = (lp.slug || '').toLowerCase().includes(query);
            if (!nameMatch && !slugMatch) return false;
        }
        if (lpStatusFilter === 'published') {
            return lp.status === 'published' || !lp.status;
        }
        if (lpStatusFilter === 'draft') {
            return lp.status === 'draft';
        }
        if (lpStatusFilter === 'archived') {
            return lp.status === 'archived';
        }
        if (lpStatusFilter === 'car') {
            const isCar = (lp.name || '').includes('車種別') || 
                          (lp.name || '').includes('BMW') || 
                          (lp.name || '').includes('ベンツ') || 
                          (lp.slug || '').includes('speaker') ||
                          (lp.category === 'car');
            return isCar;
        }
        if (lpStatusFilter === 'general') {
            const isCar = (lp.name || '').includes('車種別') || 
                          (lp.name || '').includes('BMW') || 
                          (lp.name || '').includes('ベンツ') || 
                          (lp.slug || '').includes('speaker') ||
                          (lp.category === 'car');
            return !isCar;
        }
        return true;
    });`;

// Target 2: The LP flex rendering block
const oldRenderingBlock = `                        <div className="space-y-12">
                            <div className="flex flex-wrap gap-2">
                                {audioLPs.map((lp, idx) => (
                            <div key={lp.id} onClick={() => setSelectedLPId(lp.id)} className={\`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border \${selectedLPId === lp.id ? 'bg-blue-600/10 border-blue-500/40 text-white' : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:text-zinc-300'}\`}>
                                <Music className={\`w-3.5 h-3.5 \${selectedLPId === lp.id ? 'text-blue-400' : 'text-zinc-600'}\`} />
                                <span className="mr-2">{lp.name}</span>
                                <div className="flex items-center gap-0.5 border-l border-zinc-800 pl-2">
                                    <button onClick={(e) => { e.stopPropagation(); if(idx>0) { const next=[...audioLPs]; [next[idx],next[idx-1]]=[next[idx-1],next[idx]]; reorderAudioLPs(next); } }} className="p-1 hover:text-blue-400 disabled:opacity-10" disabled={idx===0}><ChevronUp className="w-3 h-3" /></button>
                                    <button onClick={(e) => { e.stopPropagation(); if(idx<audioLPs.length-1) { const next=[...audioLPs]; [next[idx],next[idx+1]]=[next[idx+1],next[idx]]; reorderAudioLPs(next); } }} className="p-1 hover:text-blue-400 disabled:opacity-10" disabled={idx===audioLPs.length-1}><ChevronDown className="w-3 h-3" /></button>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); handleDuplicateLP(lp); }} className="p-1 hover:text-blue-400 border-l border-zinc-800 pl-2"><Copy className="w-3 h-3" /></button>
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteLP(lp.id, lp.name); }} className="p-1 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                            </div>
                        ))}
                    </div>`;

const newRenderingBlock = `                        <div className="space-y-6">
                            {/* LP Search & Filter Panel */}
                            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 space-y-4">
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    {/* Search Input */}
                                    <div className="relative flex-1 w-full">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input 
                                            type="text" 
                                            value={lpSearchQuery} 
                                            onChange={e => setLpSearchQuery(e.target.value)} 
                                            placeholder="LP名やURL（Slug）で検索..." 
                                            className="w-full bg-black border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-white placeholder-zinc-500 outline-none focus:border-blue-500 transition-all"
                                        />
                                        {lpSearchQuery && (
                                            <button onClick={() => setLpSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Filter Count Indicator */}
                                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest shrink-0 font-mono">
                                        MATCHED: <span className="text-white text-xs">{filteredLPs.length}</span> / {audioLPs.length} LPs
                                    </div>
                                </div>

                                {/* Filter Tabs */}
                                <div className="flex flex-wrap gap-1.5 border-t border-zinc-850 pt-4">
                                    {[
                                        { id: 'all', label: 'すべて' },
                                        { id: 'published', label: '🟢 公開中' },
                                        { id: 'draft', label: '🟡 下書き' },
                                        { id: 'archived', label: '⚪ アーカイブ' },
                                        { id: 'car', label: '🚗 車種別プラン' },
                                        { id: 'general', label: '🛠️ 一般プラン' }
                                    ].map(tab => (
                                        <button 
                                            key={tab.id} 
                                            onClick={() => setLpStatusFilter(tab.id)} 
                                            className={\`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wider transition-all border \${lpStatusFilter === tab.id ? 'bg-blue-600 border-blue-500 text-white shadow-sm' : 'bg-black/40 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-750'}\`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* LPs Grid/List Wrapper */}
                            <div className="flex flex-wrap gap-2 p-2 bg-zinc-950/20 border border-zinc-900 rounded-3xl min-h-[60px] items-center">
                                {filteredLPs.length === 0 ? (
                                    <div className="text-zinc-600 text-xs italic font-bold py-4 pl-4 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 text-zinc-700" />
                                        条件に一致するLPが見つかりません。
                                    </div>
                                ) : (
                                    filteredLPs.map((lp) => {
                                        const idx = audioLPs.findIndex(p => p.id === lp.id);
                                        return (
                                            <div key={lp.id} onClick={() => setSelectedLPId(lp.id)} className={\`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border \${selectedLPId === lp.id ? 'bg-blue-600/10 border-blue-500/40 text-white' : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-750'}\`}>
                                                <Music className={\`w-3.5 h-3.5 \${selectedLPId === lp.id ? 'text-blue-400' : 'text-zinc-600'}\`} />
                                                <span className="mr-2 flex items-center gap-1.5">
                                                    {lp.name}
                                                    {lp.status === 'draft' && <span className="text-[9px] text-yellow-500 font-bold bg-yellow-500/10 border border-yellow-500/20 px-1.5 py-0.5 rounded">下書き</span>}
                                                    {lp.status === 'archived' && <span className="text-[9px] text-zinc-500 font-bold bg-zinc-500/10 border border-zinc-800 px-1.5 py-0.5 rounded">保管済</span>}
                                                </span>
                                                <div className="flex items-center gap-0.5 border-l border-zinc-850 pl-2">
                                                    <button onClick={(e) => { e.stopPropagation(); if(idx>0) { const next=[...audioLPs]; [next[idx],next[idx-1]]=[next[idx-1],next[idx]]; reorderAudioLPs(next); } }} className="p-1 hover:text-blue-400 disabled:opacity-10" disabled={idx===0}><ChevronUp className="w-3 h-3" /></button>
                                                    <button onClick={(e) => { e.stopPropagation(); if(idx<audioLPs.length-1) { const next=[...audioLPs]; [next[idx],next[idx+1]]=[next[idx+1],next[idx]]; reorderAudioLPs(next); } }} className="p-1 hover:text-blue-400 disabled:opacity-10" disabled={idx===audioLPs.length-1}><ChevronDown className="w-3 h-3" /></button>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); handleDuplicateLP(lp); }} className="p-1 hover:text-blue-400 border-l border-zinc-850 pl-2"><Copy className="w-3 h-3" /></button>
                                                <button onClick={(e) => { e.stopPropagation(); handleDeleteLP(lp.id, lp.name); }} className="p-1 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>`;

// Clean CRLFs to make sure standard string replace matches correctly
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedOldState = oldStateBlock.replace(/\r\n/g, '\n');
const normalizedNewState = newStateBlock.replace(/\r\n/g, '\n');
const normalizedOldRender = oldRenderingBlock.replace(/\r\n/g, '\n');
const normalizedNewRender = newRenderingBlock.replace(/\r\n/g, '\n');

if (!normalizedContent.includes(normalizedOldState)) {
  console.error('ERROR: Old State Block NOT found!');
  process.exit(1);
}

if (!normalizedContent.includes(normalizedOldRender)) {
  console.error('ERROR: Old Rendering Block NOT found!');
  process.exit(1);
}

let updated = normalizedContent.replace(normalizedOldState, normalizedNewState);
updated = updated.replace(normalizedOldRender, normalizedNewRender);

// Restore CRLFs
const finalOutput = updated.replace(/\n/g, '\r\n');
fs.writeFileSync(filePath, finalOutput, 'utf8');
console.log('SUCCESS: Dashboard.tsx LP Search & Filter panel added successfully!');
