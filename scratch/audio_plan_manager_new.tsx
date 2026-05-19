const AudioPlanManager = () => {
    const { audioLPs, setAudioLPs, plans, updateCategory } = usePrices();
    const lps = audioLPs || [];

    const cleanPathInput = (val: string) => {
        let p = val.replace(/^["']|["']$/g, '').replace(/\\/g, '/');
        const pubIdx = p.indexOf('/public/');
        if (pubIdx !== -1) return p.substring(pubIdx + 7);
        const imgIdx = p.indexOf('/images/');
        if (imgIdx !== -1) return p.substring(imgIdx);
        return val.replace(/^["']|["']$/g, '');
    };

    const [selectedId, setSelectedId] = useState(() => lps[0]?.id || 'standard');
    const currentLine = lps.find(p => p.id === selectedId) || lps[0];

    const [data, setData] = useState(() => currentLine);
    const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

    useEffect(() => {
        if (currentLine) {
            setData(currentLine);
        }
    }, [currentLine]);

    if (!data) return null;

    const sections = data.sections || [];

    const updateSections = (next: any[]) => {
        setData({ ...data, sections: next });
    };

    const updateSectionData = (sIdx: number, updatedFields: any) => {
        const nextSections = [...sections];
        nextSections[sIdx] = {
            ...nextSections[sIdx],
            data: {
                ...nextSections[sIdx].data,
                ...updatedFields
            }
        };
        updateSections(nextSections);
    };

    const parsePrice = (priceStr: any) => {
        if (typeof priceStr === 'number') return priceStr;
        if (!priceStr) return 0;
        const str = priceStr.toString();
        return parseInt(str.replace(/[^0-9]/g, '')) || 0;
    };

    const calculateAppliedPriceForSection = (spk: any, sectionFixedPrice: number) => {
        if (!spk) return 0;
        const isString = typeof spk === 'string';
        const standalonePrice = isString ? spk : spk.standalonePrice;
        const speakerPrice = parsePrice(standalonePrice);
        const fixedFee = !isString && spk.fixedPriceOverride !== undefined && spk.fixedPriceOverride !== ''
            ? parsePrice(spk.fixedPriceOverride)
            : sectionFixedPrice;
        return speakerPrice + fixedFee;
    };

    const handleSave = () => {
        if (!data) return;
        const cleanSlug = (data.slug || 'sp-custom').replace(/^\/+/, '');
        
        // 1. Synchronize metadata from sections to top-level if sections exist
        const heroSec = data.sections?.find(s => s.type === 'hero');
        const pricingSec = data.sections?.find(s => s.type === 'pricing');
        const spkSec = data.sections?.find(s => s.type === 'speakers');
        
        const updatedLP = {
            ...data,
            slug: cleanSlug,
            header: {
                ...data.header,
                badge: heroSec?.data?.badge || data.header?.badge || '',
                mainTitle: heroSec?.data?.title || data.header?.mainTitle || '',
                subTitle: heroSec?.data?.subtitle || data.header?.subTitle || '',
                description: heroSec?.data?.desc || data.header?.description || ''
            },
            pricing: {
                ...data.pricing,
                specialPrice: pricingSec?.data?.specialPrice || data.pricing?.specialPrice || '',
                fixedPrice: pricingSec?.data?.fixedPrice !== undefined ? parsePrice(pricingSec.data.fixedPrice) : (data.pricing?.fixedPrice || 0),
                normalPriceText: pricingSec?.data?.normalPriceText || data.pricing?.normalPriceText || '',
                savingsText: pricingSec?.data?.savingsText || data.pricing?.savingsText || '',
                note: pricingSec?.data?.note || data.pricing?.note || '',
                taxRate: pricingSec?.data?.taxRate !== undefined ? parsePrice(pricingSec.data.taxRate) : (data.pricing?.taxRate || 10)
            },
            speakers: spkSec?.data?.speakers || data.speakers || []
        };
        
        // 2. Update LPs list
        const nextLPs = lps.map(p => p.id === currentLine.id ? updatedLP : p);
        setAudioLPs(nextLPs);
        
        // 3. Update plans for Navbar / MegaMenu menu items
        const targetCatId = updatedLP.parentCategoryId || 'speaker_package';
        const nextPlans = plans.map(cat => {
            if (cat.type !== 'audio') return cat;
            
            // Remove this LP from all categories first to avoid duplicates
            let nextItems = (cat.items || []).filter(item => item.id !== updatedLP.id && item.slug !== updatedLP.slug);
            
            if (cat.id === targetCatId) {
                // Add/update in this category
                const matchedItem = (cat.items || []).find(item => item.id === updatedLP.id || item.slug === updatedLP.slug);
                const newItem = {
                    id: updatedLP.id,
                    name: updatedLP.name,
                    badge: updatedLP.header.badge || 'NEW',
                    description: updatedLP.header.description || '',
                    link: `/${updatedLP.slug}`,
                    features: [],
                    price: updatedLP.pricing.specialPrice || '0',
                    ...matchedItem
                };
                // Make sure slug is matching the updated one
                newItem.link = `/${updatedLP.slug}`;
                newItem.name = updatedLP.name;
                newItem.badge = updatedLP.header.badge;
                newItem.description = updatedLP.header.description;
                newItem.price = updatedLP.pricing.specialPrice;
                
                nextItems.push(newItem);
            }
            
            return { ...cat, items: nextItems };
        });
        
        // Save the updated categories
        nextPlans.forEach(cat => {
            const origCat = plans.find(c => c.id === cat.id);
            if (JSON.stringify(origCat?.items) !== JSON.stringify(cat.items)) {
                updateCategory(cat.id, { items: cat.items });
            }
        });
        
        alert(`「${updatedLP.name || 'プラン'}」の設定を保存しました。メニューとの同期も完了しました。`);
    };

    const handleAddPlan = () => {
        const newId = `line_${Date.now()}`;
        const newSlug = `sp-custom-${Math.floor(Math.random() * 1000)}`;
        const newPlan = {
            id: newId,
            slug: newSlug,
            name: "新規オーディオプラン",
            parentCategoryId: "speaker_package",
            publishStatus: "draft",
            header: {
                badge: "NEW PACKAGE",
                mainTitle: "CUSTOM LINE",
                subTitle: "オリジナルオーディオプラン",
                description: "プランの特徴や魅力を伝える紹介文を入力してください。"
            },
            pricing: {
                specialPrice: "100000",
                fixedPrice: 30000,
                normalPriceText: "通常目安: 150,000円",
                savingsText: "約 50,000円 お得!",
                note: "※構成内容による価格変動などの注釈文を入力してください。",
                taxRate: 10
            },
            speakers: [],
            sections: [
                {
                    id: `sec_hero_${Date.now()}1`,
                    type: 'hero',
                    data: {
                        badge: "NEW PACKAGE",
                        title: "CUSTOM LINE",
                        subtitle: "オリジナルオーディオプラン",
                        desc: "プランの特徴や魅力を伝える紹介文を入力してください。",
                        image: "/images/Audio/Speaker/door-b.webp",
                        imageOpacity: 0.3,
                        useDarkTheme: true,
                        bgColor: ""
                    }
                },
                {
                    id: `sec_pricing_${Date.now()}2`,
                    type: 'pricing',
                    data: {
                        specialPrice: "100000",
                        fixedPrice: 30000,
                        normalPriceText: "通常目安: 150,000円",
                        savingsText: "約 50,000円 お得!",
                        note: "※構成内容による価格変動などの注釈文を入力してください。",
                        taxRate: 10
                    }
                },
                {
                    id: `sec_features_${Date.now()}3`,
                    type: 'features',
                    data: {
                        doorTuning: { title: "ドアチューニング詳細", desc: "施工内容を入力してください。", image: "/images/Audio/Speaker/door-b.webp" },
                        baffle: { title: "インナーバッフル詳細", desc: "施工内容を入力してください。", image: "/images/Audio/Speaker/baffle.webp" },
                        cable: { title: "スピーカーケーブル詳細", desc: "施工内容を入力してください。", image: "/images/Audio/Speaker/ang-cable.webp" }
                    }
                },
                {
                    id: `sec_upgrades_${Date.now()}4`,
                    type: 'upgrades',
                    data: {
                        title: "アップグレードオプション",
                        subtitle: "さらなる音質向上のためのメニュー",
                        courses: [
                            { name: "ベース → A コース", price: "+¥11,000", desc: "コース詳細説明文", pop: false },
                            { name: "ベース → S コース", price: "+¥33,000", desc: "高密度特別施工コース", pop: true }
                        ],
                        options: {
                            metalBaffleDiscount: "20% OFF",
                            tweeterMountPrice: "¥46,200〜",
                            metalBaffleImage: "/images/Audio/Speaker/metal.webp",
                            tweeterMountImage: "/images/Audio/Speaker/tw-mount.webp",
                            metalBaffleDesc: "高剛性メタルインナーバッフルによる制振効果。",
                            tweeterMountDesc: "ツィーターの角度調整と理想 of 定位を実現する埋込加工。"
                        }
                    }
                },
                {
                    id: `sec_speakers_${Date.now()}5`,
                    type: 'speakers',
                    data: {
                        title: "Speaker Lineup",
                        subtitle: "試聴可能スピーカーユニット一覧",
                        hideTitle: false,
                        hideSubtitle: false,
                        subtitleAlign: "right",
                        fixedPrice: 30000,
                        speakers: []
                    }
                }
            ]
        };
        const nextLPs = [...lps, newPlan as any];
        setAudioLPs(nextLPs);
        setSelectedId(newId);
        alert('新しいプランラインのタブを追加しました。情報を編集して保存してください。');
    };

    const handleDeletePlan = (idToDelete: string, planName: string) => {
        if (lps.length <= 1) {
            alert('最低1つのプランラインは残す必要があります。');
            return;
        }
        if (confirm(`本当に「${planName}」を削除しますか？この操作は元に戻せません。`)) {
            const nextLPs = lps.filter(p => p.id !== idToDelete);
            setAudioLPs(nextLPs);
            
            // Clean up from plans menu
            const nextPlans = plans.map(cat => {
                if (cat.type !== 'audio') return cat;
                const nextItems = (cat.items || []).filter(item => item.id !== idToDelete);
                return { ...cat, items: nextItems };
            });
            
            nextPlans.forEach(cat => {
                const origCat = plans.find(c => c.id === cat.id);
                if (JSON.stringify(origCat?.items) !== JSON.stringify(cat.items)) {
                    updateCategory(cat.id, { items: cat.items });
                }
            });

            setSelectedId(nextLPs[0]?.id || '');
            alert('プランを削除し、メニューからも削除しました。');
        }
    };

    const renderSectionForm = (section: any, sIdx: number) => {
        switch (section.type) {
            case 'hero':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">バッジ表記 (Badge)</label>
                                <input 
                                    type="text"
                                    value={section.data.badge || ''}
                                    onChange={e => updateSectionData(sIdx, { badge: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">メインタイトル (Title)</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">サブタイトル (Subtitle)</label>
                                <input 
                                    type="text"
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">背景画像パス (Background Image)</label>
                                <input 
                                    type="text"
                                    value={section.data.image || ''}
                                    onChange={e => updateSectionData(sIdx, { image: cleanPathInput(e.target.value) })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-zinc-400">背景不透明度 (0.0〜1.0)</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={section.data.imageOpacity !== undefined ? section.data.imageOpacity : 0.3}
                                        onChange={e => updateSectionData(sIdx, { imageOpacity: parseFloat(e.target.value) })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-zinc-400">背景色 (Bg Color)</label>
                                    <input 
                                        type="text"
                                        value={section.data.bgColor || ''}
                                        onChange={e => updateSectionData(sIdx, { bgColor: e.target.value })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                        placeholder="例: #18181b"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={section.data.useDarkTheme !== false}
                                        onChange={e => updateSectionData(sIdx, { useDarkTheme: e.target.checked })}
                                        className="rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                                    />
                                    <span className="text-[10px] font-bold text-zinc-400">白文字ダークテーマを使用する</span>
                                </label>
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">リード文 (Description)</label>
                            <textarea 
                                value={section.data.desc || ''}
                                onChange={e => updateSectionData(sIdx, { desc: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                rows={3}
                            />
                        </div>
                    </div>
                );
            case 'pricing':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">特別価格 / パッケージ最低価格 (数字のみ)</label>
                            <input 
                                type="text"
                                value={section.data.specialPrice || ''}
                                onChange={e => updateSectionData(sIdx, { specialPrice: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="例: 100000"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">プラン定価 / 標準施工費 (数字のみ)</label>
                            <input 
                                type="text"
                                value={section.data.fixedPrice !== undefined ? section.data.fixedPrice : ''}
                                onChange={e => updateSectionData(sIdx, { fixedPrice: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="例: 30000"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">消費税率 (%)</label>
                            <input 
                                type="text"
                                value={section.data.taxRate !== undefined ? section.data.taxRate : '10'}
                                onChange={e => updateSectionData(sIdx, { taxRate: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">通常参考価格テキスト</label>
                            <input 
                                type="text"
                                value={section.data.normalPriceText || ''}
                                onChange={e => updateSectionData(sIdx, { normalPriceText: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="通常目安: 150,000円"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">お得額表記テキスト</label>
                            <input 
                                type="text"
                                value={section.data.savingsText || ''}
                                onChange={e => updateSectionData(sIdx, { savingsText: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="約 50,000円 お得!"
                            />
                        </div>
                        <div className="md:col-span-3 space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">価格注釈文 (Note)</label>
                            <textarea 
                                value={section.data.note || ''}
                                onChange={e => updateSectionData(sIdx, { note: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                rows={2}
                            />
                        </div>
                    </div>
                );
            case 'features':
                return (
                    <div className="space-y-6">
                        {['doorTuning', 'baffle', 'cable'].map((key) => {
                            const feat = section.data[key] || {};
                            return (
                                <div key={key} className="bg-black/20 p-4 border border-zinc-800/80 rounded-xl space-y-4">
                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
                                        {key === 'doorTuning' ? '① ドアチューニング' : key === 'baffle' ? '② インナーバッフル' : '③ 配線ケーブル'}
                                    </span>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">施工タイトル</label>
                                            <input 
                                                type="text"
                                                value={feat.title || ''}
                                                onChange={e => {
                                                    const nextFeat = { ...feat, title: e.target.value };
                                                    updateSectionData(sIdx, { [key]: nextFeat });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">施工説明</label>
                                            <input 
                                                type="text"
                                                value={feat.desc || ''}
                                                onChange={e => {
                                                    const nextFeat = { ...feat, desc: e.target.value };
                                                    updateSectionData(sIdx, { [key]: nextFeat });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">施工イメージ画像パス</label>
                                            <input 
                                                type="text"
                                                value={feat.image || ''}
                                                onChange={e => {
                                                    const nextFeat = { ...feat, image: cleanPathInput(e.target.value) };
                                                    updateSectionData(sIdx, { [key]: nextFeat });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            case 'upgrades':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">セクションタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    placeholder="Upgrade Options"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">サブタイトル / リード文</label>
                                <input 
                                    type="text"
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>

                        {/* Upgrade Courses List */}
                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">施工アップグレードコース一覧</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const courses = [...(section.data.courses || [])];
                                        courses.push({ name: '新規コース', price: '+¥11,000', desc: '施工内容の説明文を入力', pop: false });
                                        updateSectionData(sIdx, { courses });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> コースを追加
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(section.data.courses || []).map((course: any, cIdx: number) => (
                                    <div key={cIdx} className="bg-black/40 border border-zinc-800 p-4 rounded-xl space-y-3 relative">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const courses = (section.data.courses || []).filter((_: any, idx: number) => idx !== cIdx);
                                                updateSectionData(sIdx, { courses });
                                            }}
                                            className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="flex items-center justify-between gap-4 pr-6">
                                            <input 
                                                type="text"
                                                value={course.name}
                                                onChange={e => {
                                                    const courses = [...(section.data.courses || [])];
                                                    courses[cIdx] = { ...course, name: e.target.value };
                                                    updateSectionData(sIdx, { courses });
                                                }}
                                                className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-black"
                                                placeholder="コース名"
                                            />
                                            <input 
                                                type="text"
                                                value={course.price}
                                                onChange={e => {
                                                    const courses = [...(section.data.courses || [])];
                                                    courses[cIdx] = { ...course, price: e.target.value };
                                                    updateSectionData(sIdx, { courses });
                                                }}
                                                className="w-1/3 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-blue-400 text-xs font-black text-right"
                                                placeholder="料金"
                                            />
                                        </div>
                                        <input 
                                            type="text"
                                            value={course.desc}
                                            onChange={e => {
                                                const courses = [...(section.data.courses || [])];
                                                courses[cIdx] = { ...course, desc: e.target.value };
                                                updateSectionData(sIdx, { courses });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-400 text-xs font-bold"
                                            placeholder="詳細説明"
                                        />
                                        <div className="flex items-center justify-end">
                                            <label className="flex items-center gap-1.5 cursor-pointer">
                                                <input 
                                                    type="checkbox"
                                                    checked={!!course.pop}
                                                    onChange={e => {
                                                        const courses = [...(section.data.courses || [])];
                                                        courses[cIdx] = { ...course, pop: e.target.checked };
                                                        updateSectionData(sIdx, { courses });
                                                    }}
                                                    className="rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                                                />
                                                <span className="text-[10px] font-black text-zinc-500">おすすめバッジを付与</span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Options Object */}
                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <label className="block text-[10px] font-black text-zinc-400">ハードウェア追加オプション（メタルバッフル・ツィーター埋込）</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-black/30 p-4 rounded-xl border border-zinc-800/60 space-y-3">
                                    <span className="text-[10px] font-black text-blue-400">【メタルバッフル】</span>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">特別価格/割引表記</label>
                                        <input 
                                            type="text"
                                            value={section.data.options?.metalBaffleDiscount || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, metalBaffleDiscount: e.target.value };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                            placeholder="例: 20% OFF または +¥13,200"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">画像パス</label>
                                        <input 
                                            type="text"
                                            value={section.data.options?.metalBaffleImage || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, metalBaffleImage: cleanPathInput(e.target.value) };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">詳細説明文</label>
                                        <textarea 
                                            value={section.data.options?.metalBaffleDesc || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, metalBaffleDesc: e.target.value };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                            rows={2}
                                        />
                                    </div>
                                </div>

                                <div className="bg-black/30 p-4 rounded-xl border border-zinc-800/60 space-y-3">
                                    <span className="text-[10px] font-black text-blue-400">【ツィーターピラー埋め込み】</span>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">参考価格表記</label>
                                        <input 
                                            type="text"
                                            value={section.data.options?.tweeterMountPrice || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, tweeterMountPrice: e.target.value };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                            placeholder="例: ¥46,200〜"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">画像パス</label>
                                        <input 
                                            type="text"
                                            value={section.data.options?.tweeterMountImage || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, tweeterMountImage: cleanPathInput(e.target.value) };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">詳細説明文</label>
                                        <textarea 
                                            value={section.data.options?.tweeterMountDesc || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, tweeterMountDesc: e.target.value };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'speakers': {
                const sectionFixedPrice = parsePrice(section.data.fixedPrice !== undefined ? section.data.fixedPrice : data.pricing?.fixedPrice || 0);
                const sectionTaxRate = parsePrice(section.data.taxRate !== undefined ? section.data.taxRate : data.pricing?.taxRate || 10);
                const speakersList = section.data.speakers || [];

                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">セクションタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">セクションサブタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">このセクション専用施工費 (空欄で全体設定を使用)</label>
                                <input 
                                    type="text"
                                    value={section.data.fixedPrice !== undefined ? section.data.fixedPrice : ''}
                                    onChange={e => updateSectionData(sIdx, { fixedPrice: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    placeholder="例: 30000"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={!!section.data.hideTitle}
                                    onChange={e => updateSectionData(sIdx, { hideTitle: e.target.checked })}
                                    className="rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                                />
                                <span className="text-[10px] font-bold text-zinc-400">タイトルを非表示にする</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={!!section.data.hideSubtitle}
                                    onChange={e => updateSectionData(sIdx, { hideSubtitle: e.target.checked })}
                                    className="rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                                />
                                <span className="text-[10px] font-bold text-zinc-400">サブタイトルを非表示にする</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-400">サブタイトル配置:</span>
                                <select 
                                    value={section.data.subtitleAlign || 'right'}
                                    onChange={e => updateSectionData(sIdx, { subtitleAlign: e.target.value })}
                                    className="bg-black border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold outline-none"
                                >
                                    <option value="right">右寄せ (Right)</option>
                                    <option value="center">中央寄せ (Center)</option>
                                    <option value="left">左寄せ (Left)</option>
                                </select>
                            </div>
                        </div>

                        {/* Speakers lineup list */}
                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">スピーカーユニット一覧</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const newSpk = {
                                            id: `spk_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,
                                            brand: 'メーカー名',
                                            name: '製品名',
                                            image: '/images/Top/speaker.webp',
                                            mountingHoleSize: '140mm',
                                            depthSize: '50mm',
                                            hasGrille: '付属',
                                            hasTweeterMount: '付属',
                                            standalonePrice: '¥30,000',
                                            fixedPriceOverride: '',
                                            remarks: '',
                                            youtubeUrl: ''
                                        };
                                        const nextSpks = [...speakersList, newSpk];
                                        updateSectionData(sIdx, { speakers: nextSpks });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> スピーカーを追加
                                </button>
                            </div>

                            <div className="space-y-6">
                                {speakersList.map((spk: any, idx: number) => {
                                    const appliedPrice = calculateAppliedPriceForSection(spk, sectionFixedPrice);
                                    const taxExcludedPrice = Math.round(appliedPrice / (1 + sectionTaxRate / 100));

                                    return (
                                        <div key={spk.id || idx} className="bg-black/40 border border-zinc-800/80 rounded-xl p-4 md:p-6 space-y-4 relative group">
                                            {/* Reorder and Delete controls */}
                                            <div className="flex justify-between items-center pb-2 border-b border-zinc-800/40">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs font-black text-blue-400">スピーカー #{idx + 1}</span>
                                                    <button 
                                                        type="button"
                                                        disabled={idx === 0}
                                                        onClick={() => {
                                                            const next = [...speakersList];
                                                            const temp = next[idx];
                                                            next[idx] = next[idx - 1];
                                                            next[idx - 1] = temp;
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                                                    >
                                                        <ChevronUp className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        disabled={idx === speakersList.length - 1}
                                                        onClick={() => {
                                                            const next = [...speakersList];
                                                            const temp = next[idx];
                                                            next[idx] = next[idx + 1];
                                                            next[idx + 1] = temp;
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                                                    >
                                                        <ChevronDown className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        const next = speakersList.filter((_: any, i: number) => i !== idx);
                                                        updateSectionData(sIdx, { speakers: next });
                                                    }}
                                                    className="text-zinc-600 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">メーカー (Brand)</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.brand || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, brand: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">モデル名 (Name)</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.name || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, name: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">スピーカー画像パス (Image)</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.image || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, image: cleanPathInput(e.target.value) };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">本体価格 (単品価格 / 税別など)</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.standalonePrice || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, standalonePrice: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">取付穴径</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.mountingHoleSize || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, mountingHoleSize: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">取付奥行</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.depthSize || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, depthSize: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">グリル</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.hasGrille || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, hasGrille: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">TWマウント</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.hasTweeterMount || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, hasTweeterMount: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">施工費上書き (空欄で共通費)</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.fixedPriceOverride || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, fixedPriceOverride: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">YouTube試聴音源URL</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.youtubeUrl || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, youtubeUrl: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>

                                            {/* Textarea for Remarks */}
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">備考欄 (Remarks - 改行対応の複数行エディタ)</label>
                                                <textarea 
                                                    value={spk.remarks || ''}
                                                    onChange={e => {
                                                        const next = [...speakersList];
                                                        next[idx] = { ...spk, remarks: e.target.value };
                                                        updateSectionData(sIdx, { speakers: next });
                                                    }}
                                                    rows={3}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                                    placeholder="スピーカーの特徴や説明文を入力してください（改行を反映させることができます）"
                                                />
                                            </div>

                                            {/* Price calculations indicators */}
                                            <div className="bg-black/30 border border-zinc-900 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-zinc-400">
                                                <div>施工料金ベース: <span className="text-white">¥{((spk.fixedPriceOverride !== undefined && spk.fixedPriceOverride !== '') ? parsePrice(spk.fixedPriceOverride) : sectionFixedPrice).toLocaleString()}</span></div>
                                                <div className="flex items-center gap-6">
                                                    <div>
                                                        <span className="text-[10px] text-zinc-500 font-bold block mb-0.5">パッケージ合計 (税込)</span>
                                                        <span className="text-blue-400 font-black">¥{appliedPrice.toLocaleString()}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] text-zinc-500 font-bold block mb-0.5">(税別)</span>
                                                        <span className="text-zinc-300 font-black">¥{taxExcludedPrice.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            }
            case 'text':
                return (
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">セクション見出しタイトル</label>
                            <input 
                                type="text"
                                value={section.data.title || ''}
                                onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">本文コンテンツ (Content - HTMLタグ対応)</label>
                            <textarea 
                                value={section.data.content || ''}
                                onChange={e => updateSectionData(sIdx, { content: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                rows={6}
                            />
                        </div>
                    </div>
                );
            case 'banner':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">バッジ (Badge)</label>
                                <input 
                                    type="text"
                                    value={section.data.badge || ''}
                                    onChange={e => updateSectionData(sIdx, { badge: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">バナータイトル (Title)</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">サブタイトル (subTitle)</label>
                                <input 
                                    type="text"
                                    value={section.data.subTitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subTitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">背景画像パス</label>
                                <input 
                                    type="text"
                                    value={section.data.image || ''}
                                    onChange={e => updateSectionData(sIdx, { image: cleanPathInput(e.target.value) })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-zinc-400">黒オーバーレイ不透明度 (0.0〜1.0)</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={section.data.opacity !== undefined ? section.data.opacity : 0.4}
                                        onChange={e => updateSectionData(sIdx, { opacity: parseFloat(e.target.value) })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-zinc-400">バナーの高さ</label>
                                    <input 
                                        type="text"
                                        value={section.data.height || '400px'}
                                        onChange={e => updateSectionData(sIdx, { height: e.target.value })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                        placeholder="例: 400px"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">背景色 (Bg Color - 画像がない場合)</label>
                                <input 
                                    type="text"
                                    value={section.data.bgColor || ''}
                                    onChange={e => updateSectionData(sIdx, { bgColor: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">バナー説明文 (description)</label>
                            <textarea 
                                value={section.data.description || ''}
                                onChange={e => updateSectionData(sIdx, { description: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                rows={2}
                            />
                        </div>
                    </div>
                );
            case 'link_cards': {
                const cardItems = section.data.items || [];
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">見出しタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">見出しサブタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">カードリンク項目一覧</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const items = [...cardItems];
                                        items.push({ title: 'カードタイトル', description: '詳細説明文', image: '/images/Audio/Speaker/door-b.webp', badge: 'NEW', linkText: '詳しく見る', slug: '' });
                                        updateSectionData(sIdx, { items });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> カードを追加
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {cardItems.map((item: any, cIdx: number) => (
                                    <div key={cIdx} className="bg-black/40 border border-zinc-800 p-4 rounded-xl space-y-3 relative pr-8">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const items = cardItems.filter((_: any, i: number) => i !== cIdx);
                                                updateSectionData(sIdx, { items });
                                            }}
                                            className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">タイトル (改行対応)</label>
                                                <textarea 
                                                    value={item.title || ''}
                                                    onChange={e => {
                                                        const items = [...cardItems];
                                                        items[cIdx] = { ...item, title: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    rows={1}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">バッジ表記</label>
                                                <input 
                                                    type="text"
                                                    value={item.badge || ''}
                                                    onChange={e => {
                                                        const items = [...cardItems];
                                                        items[cIdx] = { ...item, badge: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">画像パス</label>
                                                <input 
                                                    type="text"
                                                    value={item.image || ''}
                                                    onChange={e => {
                                                        const items = [...cardItems];
                                                        items[cIdx] = { ...item, image: cleanPathInput(e.target.value) };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">リンクURL / スラッグ (例: sp-standard)</label>
                                                <input 
                                                    type="text"
                                                    value={item.slug || ''}
                                                    onChange={e => {
                                                        const items = [...cardItems];
                                                        items[cIdx] = { ...item, slug: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">ボタン文字</label>
                                            <input 
                                                type="text"
                                                value={item.linkText || '詳しく見る'}
                                                onChange={e => {
                                                    const items = [...cardItems];
                                                    items[cIdx] = { ...item, linkText: e.target.value };
                                                    updateSectionData(sIdx, { items });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">説明文 (description)</label>
                                            <textarea 
                                                value={item.description || ''}
                                                onChange={e => {
                                                    const items = [...cardItems];
                                                    items[cIdx] = { ...item, description: e.target.value };
                                                    updateSectionData(sIdx, { items });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
            case 'cta':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">見出しタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">説明文 (desc)</label>
                                <textarea 
                                    value={section.data.desc || ''}
                                    onChange={e => updateSectionData(sIdx, { desc: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    rows={2}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">ボタン表記名</label>
                                <input 
                                    type="text"
                                    value={section.data.btnText || ''}
                                    onChange={e => updateSectionData(sIdx, { btnText: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">ボタン遷移先 (btnLink)</label>
                                <input 
                                    type="text"
                                    value={section.data.btnLink || ''}
                                    onChange={e => updateSectionData(sIdx, { btnLink: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'faq': {
                const faqItems = section.data.items || [];
                return (
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">セクションタイトル</label>
                            <input 
                                type="text"
                                value={section.data.title || ''}
                                onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">質問と回答一覧</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const items = [...faqItems];
                                        items.push({ q: '質問を入力してください', a: '回答を入力してください' });
                                        updateSectionData(sIdx, { items });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> FAQを追加
                                </button>
                            </div>

                            <div className="space-y-4">
                                {faqItems.map((faq: any, fIdx: number) => (
                                    <div key={fIdx} className="bg-black/40 border border-zinc-800 p-4 rounded-xl space-y-3 relative pr-8">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const items = faqItems.filter((_: any, i: number) => i !== fIdx);
                                                updateSectionData(sIdx, { items });
                                            }}
                                            className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="space-y-2">
                                            <div className="space-y-1">
                                                <label className="block text-[9px] font-bold text-zinc-500">質問 (Q)</label>
                                                <input 
                                                    type="text"
                                                    value={faq.q || ''}
                                                    onChange={e => {
                                                        const items = [...faqItems];
                                                        items[fIdx] = { ...faq, q: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="block text-[9px] font-bold text-zinc-500">回答 (A)</label>
                                                <textarea 
                                                    value={faq.a || ''}
                                                    onChange={e => {
                                                        const items = [...faqItems];
                                                        items[fIdx] = { ...faq, a: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    rows={2}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
            case 'gallery': {
                const galleryImages = section.data.images || [];
                return (
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">セクションタイトル</label>
                            <input 
                                type="text"
                                value={section.data.title || ''}
                                onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">施工画像一覧</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const images = [...galleryImages];
                                        images.push('/images/Top/speaker.webp');
                                        updateSectionData(sIdx, { images });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> 画像を追加
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {galleryImages.map((img: string, imgIdx: number) => (
                                    <div key={imgIdx} className="bg-black/40 border border-zinc-800 p-4 rounded-xl flex items-center gap-4 relative">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const images = galleryImages.filter((_: any, i: number) => i !== imgIdx);
                                                updateSectionData(sIdx, { images });
                                            }}
                                            className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                                            <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <label className="block text-[9px] font-bold text-zinc-500">画像パス</label>
                                            <input 
                                                type="text"
                                                value={img}
                                                onChange={e => {
                                                    const images = [...galleryImages];
                                                    images[imgIdx] = cleanPathInput(e.target.value);
                                                    updateSectionData(sIdx, { images });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-white text-xs font-bold pr-8"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
            case 'package_summary': {
                const summaryItems = section.data.items || [];
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">見出しタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">見出しサブタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">部材・施工一式内容一覧</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const items = [...summaryItems];
                                        items.push({ title: '施工内容/部材', desc: '説明文を入力', value: '1ペア' });
                                        updateSectionData(sIdx, { items });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> 項目を追加
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {summaryItems.map((item: any, itemIdx: number) => (
                                    <div key={itemIdx} className="bg-black/40 border border-zinc-800 p-4 rounded-xl space-y-3 relative pr-8">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const items = summaryItems.filter((_: any, i: number) => i !== itemIdx);
                                                updateSectionData(sIdx, { items });
                                            }}
                                            className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5 font-bold text-zinc-500">
                                                <label className="block text-[9px] font-bold text-zinc-500">部材名 / 施工</label>
                                                <input 
                                                    type="text"
                                                    value={item.title || ''}
                                                    onChange={e => {
                                                        const items = [...summaryItems];
                                                        items[itemIdx] = { ...item, title: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">数量・備考表記</label>
                                                <input 
                                                    type="text"
                                                    value={item.value || ''}
                                                    onChange={e => {
                                                        const items = [...summaryItems];
                                                        items[itemIdx] = { ...item, value: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    placeholder="例: 1セット"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">詳細説明</label>
                                            <input 
                                                type="text"
                                                value={item.desc || ''}
                                                onChange={e => {
                                                    const items = [...summaryItems];
                                                    items[itemIdx] = { ...item, desc: e.target.value };
                                                    updateSectionData(sIdx, { items });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
            case 'notes': {
                const noteItems = section.data.items || [];
                return (
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">見出しタイトル</label>
                            <input 
                                type="text"
                                value={section.data.title || ''}
                                onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">注意事項一覧 (箇条書き項目)</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const items = [...noteItems];
                                        items.push('新しい注意事項を入力してください');
                                        updateSectionData(sIdx, { items });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> 注意事項を追加
                                </button>
                            </div>

                            <div className="space-y-3">
                                {noteItems.map((note: string, noteIdx: number) => (
                                    <div key={noteIdx} className="bg-black/40 border border-zinc-800 p-3 rounded-xl flex items-center gap-3 relative pr-10">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const items = noteItems.filter((_: any, i: number) => i !== noteIdx);
                                                updateSectionData(sIdx, { items });
                                            }}
                                            className="absolute top-3.5 right-2.5 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="text-[10px] font-black text-zinc-500">#{noteIdx + 1}</span>
                                        <textarea 
                                            value={note}
                                            onChange={e => {
                                                const items = [...noteItems];
                                                items[noteIdx] = e.target.value;
                                                updateSectionData(sIdx, { items });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                            rows={2}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
            default:
                return <div className="text-zinc-500 text-xs">未知のセクションタイプです: {section.type}</div>;
        }
    };

    return (
        <div className="space-y-12">
            {/* Audio Menu Header Overview */}
            <div className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Audio Package Menu</h2>
                    <p className="text-zinc-500 font-bold text-xs mt-2">
                        オーディオ特設ラインごとの専用LPコンテンツを複数追加・一括管理します。各プラン専用 of URL(Slug)も設定可能です。
                    </p>
                </div>
                {/* アクションボタン群 */}
                <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
                    <button 
                        onClick={() => window.open(`/admin/print/audio/${data.slug || 'sp-standard'}`, '_blank')}
                        className="flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/30 text-blue-400 hover:text-white px-4 py-2.5 rounded-xl font-black text-xs transition-all"
                    >
                        <Printer className="w-4 h-4" />
                        このプランを資料印刷 (A4)
                    </button>
                    <button 
                        onClick={handleAddPlan}
                        className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-4 py-2.5 rounded-xl font-black text-xs transition-all"
                    >
                        <Plus className="w-4 h-4 text-blue-400" />
                        プランを追加
                    </button>
                </div>
            </div>

            {/* タブ切り替えリスト */}
            <div className="flex flex-wrap gap-2 border-b border-zinc-800/60 pb-4">
                {lps.map((p) => {
                    const isSelected = p.id === selectedId;
                    return (
                        <div 
                            key={p.id}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                                isSelected 
                                ? 'bg-blue-600/10 border-blue-500/40 text-white shadow-lg shadow-blue-600/5' 
                                : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                            }`}
                            onClick={() => setSelectedId(p.id || '')}
                        >
                            <Music className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-zinc-600'}`} />
                            <span>{p.name || p.header?.badge || '無名プラン'}</span>
                            {/* 削除ボタン */}
                            {lps.length > 1 && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeletePlan(p.id || '', p.name || 'プラン');
                                    }}
                                    className="p-1 hover:bg-red-500/20 rounded text-zinc-600 hover:text-red-400 transition-colors ml-1"
                                    title="このプランを削除"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 選択中のプラン編集画面 */}
            <motion.div 
                key={selectedId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-950 border-2 border-zinc-800 rounded-[3rem] p-8 md:p-12 space-y-12 relative"
            >
                {/* 共通基本設定: 名前とSlug */}
                <div className="bg-zinc-900/30 border border-zinc-800/80 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded uppercase tracking-widest">基本設定</span>
                        <span className="text-xs font-bold text-zinc-400">管理名およびURLスラッグ</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-zinc-400">プラン名 (管理・タブ表示用)</label>
                            <input 
                                type="text"
                                value={data.name || ''}
                                onChange={e => setData({ ...data, name: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="例: スタンダードライン"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-zinc-400">URL Slug (英数字・ハイフン)</label>
                            <div className="flex items-center bg-black border border-zinc-800 rounded-xl overflow-hidden focus-within:border-blue-500">
                                <span className="text-zinc-600 text-xs font-bold pl-4 pr-1 select-none">/</span>
                                <input 
                                    type="text"
                                    value={data.slug || ''}
                                    onChange={e => setData({ ...data, slug: e.target.value.replace(/[^a-zA-Z0-9-_]/g, '') })}
                                    className="w-full bg-transparent py-2.5 pr-4 text-blue-400 text-xs font-bold outline-none"
                                    placeholder="sp-standard"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-zinc-400">親メニューカテゴリ</label>
                            <select
                                value={data.parentCategoryId || 'speaker_package'}
                                onChange={e => setData({ ...data, parentCategoryId: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                            >
                                <option value="speaker_package">スピーカー交換・車種別プラン</option>
                                <option value="bass_power">低音強化・パワーアップ（アンプ）</option>
                                <option value="digital_source">DSP・プレーヤー・高音音質ナビ</option>
                                <option value="install_tuning">デッドニング・施工・電源</option>
                                <option value="custom_install">カスタムインストール・造作</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-zinc-400">公開ステータス</label>
                            <select
                                value={data.publishStatus || 'published'}
                                onChange={e => setData({ ...data, publishStatus: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                            >
                                <option value="published">公開中 (Published)</option>
                                <option value="draft">下書き (Draft)</option>
                                <option value="archived">保管済 (Archived)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* --- Dynamic Page Sections Editor --- */}
                <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-[2rem] p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                                <Layers className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">Dynamic Page Sections</h4>
                                <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mt-1">LP内の各セクションコンテンツの構成と並び替え</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {sections.map((section: any, sIdx: number) => {
                            const isExpanded = expandedSectionId === section.id;
                            return (
                                <div key={section.id} className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden">
                                    {/* Section Header */}
                                    <div 
                                        onClick={() => setExpandedSectionId(isExpanded ? null : section.id)}
                                        className="flex items-center justify-between px-6 py-4 bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer select-none border-b border-zinc-800/40"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Reordering Controls */}
                                            <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                                                <button 
                                                    type="button"
                                                    disabled={sIdx === 0}
                                                    onClick={() => {
                                                        const next = [...sections];
                                                        const temp = next[sIdx];
                                                        next[sIdx] = next[sIdx - 1];
                                                        next[sIdx - 1] = temp;
                                                        updateSections(next);
                                                    }}
                                                    className="p-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 disabled:opacity-30 rounded-lg text-zinc-400 hover:text-white transition-all"
                                                    title="上に移動"
                                                >
                                                    <ChevronUp className="w-3.5 h-3.5" />
                                                </button>
                                                <button 
                                                    type="button"
                                                    disabled={sIdx === sections.length - 1}
                                                    onClick={() => {
                                                        const next = [...sections];
                                                        const temp = next[sIdx];
                                                        next[sIdx] = next[sIdx + 1];
                                                        next[sIdx + 1] = temp;
                                                        updateSections(next);
                                                    }}
                                                    className="p-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 disabled:opacity-30 rounded-lg text-zinc-400 hover:text-white transition-all"
                                                    title="下に移動"
                                                >
                                                    <ChevronDown className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            {/* Type and Name */}
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                                                    {section.type}
                                                </span>
                                                <span className="text-xs font-black text-white">
                                                    {section.data?.title || section.data?.badge || `セクション #${sIdx + 1}`}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                                            <button 
                                                type="button"
                                                onClick={() => {
                                                    if (confirm(`本当にこの「${section.type}」セクションを削除しますか？`)) {
                                                        const next = sections.filter((_: any, idx: number) => idx !== sIdx);
                                                        updateSections(next);
                                                        if (expandedSectionId === section.id) setExpandedSectionId(null);
                                                    }
                                                }}
                                                className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="セクションを削除"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <div className="text-zinc-500 hover:text-white transition-all">
                                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Section Editor Form */}
                                    {isExpanded && (
                                        <div className="p-6 md:p-8 space-y-6 bg-black/30 border-t border-zinc-800/40">
                                            {renderSectionForm(section, sIdx)}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {sections.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-3xl">
                                <p className="text-sm text-zinc-500 font-bold">セクションが登録されていません。下のボタンから追加してください。</p>
                            </div>
                        )}
                    </div>

                    {/* Add Section Controls */}
                    <div className="pt-6 border-t border-zinc-800/80">
                        <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">新しいセクションを追加</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                            {[
                                { type: 'hero', label: 'Hero (メイン看板)' },
                                { type: 'pricing', label: 'Pricing (価格表)' },
                                { type: 'features', label: 'Features (3大施工)' },
                                { type: 'upgrades', label: 'Upgrades (オプション)' },
                                { type: 'speakers', label: 'Speakers (スピーカー)' },
                                { type: 'text', label: 'Text (テキスト文章)' },
                                { type: 'banner', label: 'Banner (横帯バナー)' },
                                { type: 'link_cards', label: 'Link Cards (リンク枠)' },
                                { type: 'cta', label: 'CTA (相談ボタン)' },
                                { type: 'faq', label: 'FAQ (よくある質問)' },
                                { type: 'gallery', label: 'Gallery (写真枠)' },
                                { type: 'package_summary', label: 'Summary (構成表)' },
                                { type: 'notes', label: 'Notes (注意事項)' }
                            ].map((btn) => (
                                <button
                                    key={btn.type}
                                    type="button"
                                    onClick={() => {
                                        const newSec: any = {
                                            id: `sec_${btn.type}_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,
                                            type: btn.type,
                                            data: {}
                                        };
                                        // Initialize default values for the specific type
                                        if (btn.type === 'hero') {
                                            newSec.data = { badge: 'SPECIAL PACKAGE', title: 'NEW LINE', subtitle: 'New Sound Experience', desc: '説明文を入力', image: '/images/Audio/Speaker/door-b.webp', imageOpacity: 0.3, useDarkTheme: true };
                                        } else if (btn.type === 'pricing') {
                                            newSec.data = { specialPrice: '100000', fixedPrice: '30000', normalPriceText: '通常目安: 150,000円', savingsText: '約 50,000円 お得!', taxRate: '10', note: '※構成により変動します。' };
                                        } else if (btn.type === 'features') {
                                            newSec.data = {
                                                doorTuning: { title: 'ドアチューニング', desc: '防振施工', image: '/images/Audio/Speaker/door-b.webp' },
                                                baffle: { title: 'インナーバッフル', desc: 'バッフル固定', image: '/images/Audio/Speaker/baffle.webp' },
                                                cable: { title: '配線ケーブル', desc: '高音質伝送', image: '/images/Audio/Speaker/ang-cable.webp' }
                                            };
                                        } else if (btn.type === 'upgrades') {
                                            newSec.data = { title: 'アップグレードオプション', subtitle: 'さらなる高音質へ', courses: [], options: { metalBaffleDiscount: '20% OFF', tweeterMountPrice: '¥46,200〜', metalBaffleImage: '/images/Audio/Speaker/metal.webp', tweeterMountImage: '/images/Audio/Speaker/tw-mount.webp' } };
                                        } else if (btn.type === 'speakers') {
                                            newSec.data = { title: 'Speaker Lineup', subtitle: '試聴可能ユニット一覧', hideTitle: false, hideSubtitle: false, subtitleAlign: 'right', fixedPrice: '30000', speakers: [] };
                                        } else if (btn.type === 'text') {
                                            newSec.data = { title: '見出しタイトル', content: '<p>文章を入力してください</p>' };
                                        } else if (btn.type === 'banner') {
                                            newSec.data = { title: 'バナータイトル', badge: 'RECOMMENDED', opacity: 0.4, height: '400px', image: '/images/Audio/Speaker/door-b.webp' };
                                        } else if (btn.type === 'link_cards') {
                                            newSec.data = { title: '関連リンク', subtitle: '各種メニュー', items: [] };
                                        } else if (btn.type === 'cta') {
                                            newSec.data = { title: 'まずはお気軽にご相談ください', desc: 'お見積り・ご質問など随時受付中', btnText: 'LINEで無料相談・ご予約', btnLink: '/reservation' };
                                        } else if (btn.type === 'faq') {
                                            newSec.data = { title: 'よくあるご質問', items: [] };
                                        } else if (btn.type === 'gallery') {
                                            newSec.data = { title: '施工ギャラリー', images: [] };
                                        } else if (btn.type === 'package_summary') {
                                            newSec.data = { title: 'パッケージ全内容', subtitle: '構成部材・施工一覧', items: [] };
                                        } else if (btn.type === 'notes') {
                                            newSec.data = { title: '注意事項', items: [] };
                                        }
                                        const next = [...sections, newSec];
                                        updateSections(next);
                                        setExpandedSectionId(newSec.id);
                                    }}
                                    className="flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white px-3 py-2 rounded-xl text-[10px] font-black transition-all"
                                >
                                    <Plus className="w-3 h-3 text-blue-400" /> {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 保存ボタン */}
                <div className="flex justify-end pt-4">
                    <button 
                        onClick={handleSave}
                        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-1"
                    >
                        <Save className="w-5 h-5" />
                        設定内容を確定して保存
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
