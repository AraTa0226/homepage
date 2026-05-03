import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { usePrices } from '../../contexts/PriceContext';
import { 
    Speaker, 
    ArrowLeft, 
    MessageSquare, 
    ChevronRight,
    Music,
    Zap,
    ShieldCheck,
    Menu,
    X,
    Calendar as CalendarIcon,
    Printer,
    Youtube,
    Clock,
    Car,
    Volume2,
    Layers,
    Wrench,
    Info
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

// QR Code utility
const getQRCodeUrl = (url: string) => `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(url || 'https://sound-ang.com')}`;

const MegaMenu = ({ show, onClose, navigate, plans }: any) => {
    const audioPlans = plans.filter((p: any) => p.type === 'audio');

    return (
        <AnimatePresence>
            {show && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60]" />
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-24 left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl bg-white rounded-[3rem] shadow-2xl z-[70] border border-gray-100 p-12 overflow-hidden max-h-[85vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {audioPlans.map((cat: any) => (
                                <div key={cat.id} className="space-y-6">
                                    <div className="border-b border-gray-100 pb-4">
                                        <span className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase block mb-1">Audio Plan</span>
                                        <h4 className="text-lg font-black text-gray-900">{cat.category}</h4>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {cat.items.map((item: any, idx: number) => (
                                            <button key={idx} onClick={() => {
                                                onClose();
                                                navigate(`/audio/plan/${encodeURIComponent(item.id || item.name)}`);
                                            }} className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-all hover:translate-x-1 flex items-center gap-2 group text-left">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-blue-400 shrink-0" />
                                                <span className="truncate">{item.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const AudioPlanDetail: React.FC = () => {
    const { planId } = useParams();
    const navigate = useNavigate();
    const { plans } = usePrices();
    const [view, setView] = useState<'lp' | 'catalog'>('lp');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const decodedPlanId = decodeURIComponent(planId || "");
    let plan: any = null;
    let activeCategory: any = null;

    // Search for plan item first
    for (const cat of plans.filter(p => p.type === 'audio')) {
        const found = cat.items.find(item => 
            item.id === decodedPlanId || 
            item.name === decodedPlanId ||
            (decodedPlanId === 'standard-line' && (item.name.includes('STANDARD line') || item.name.includes('スタンダードライン')))
        );
        if (found) {
            plan = found;
            activeCategory = cat;
            break;
        }
    }

    // If no plan found, check if it's a category ID
    if (!plan) {
        const cat = plans.find(p => (p.id === decodedPlanId || p.category === decodedPlanId) && p.type === 'audio');
        if (cat && cat.items && cat.items.length > 0) {
            plan = cat.items[0];
            activeCategory = cat;
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (plan) document.title = `${plan.name} | Sound ANG`;
    }, [plan]);

    if (!plan) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-12 bg-white rounded-[3rem] shadow-xl border border-gray-100 text-center space-y-8">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                    <Speaker className="w-10 h-10 text-blue-600 animate-pulse" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-black text-gray-900">Plan Not Found</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        指定されたプランが見つかりませんでした。メニューより他のプランをお選びいただくか、トップページへお戻りください。
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <button onClick={() => setIsMenuOpen(true)} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                        <Menu className="w-4 h-4" />
                        <span>プラン一覧を見る</span>
                    </button>
                    <button onClick={() => navigate('/')} className="w-full py-4 border border-gray-200 text-gray-600 rounded-2xl font-black text-sm hover:bg-gray-50 transition-colors">
                        トップへ戻る
                    </button>
                </div>
            </div>
        </div>
    );

    const STANDARD_LINE_FALLBACK = {
        badge: 'STANDARD LINE',
        name: "スタンダードライン スピーカー交換パッケージ",
        description: "音質アップの第一歩はスピーカー交換から！\n\nスピーカー交換パッケージスタンダードラインでは１０万円までのスピーカーの中からお気に入りのスピーカーを選んでいただき、ドアチューニング、スピーカーケーブルなどがセットになったこだわった内容です。\n\nこの価格帯は各社とも人気商品がラインアップされていて個性が強いユニットが並んでいます。商品選びのときはご希望のインストール方法が可能かどうかも判断しながらのユニット選びが必要です。埋め込み奥行きやツィーターマウントの有無も併記していますのでご参考ください。",
        packageDetails: {
            standardPrice: "117700",
            savings: "35860",
            contents: [
                { title: "スピーカーユニット", description: "17cmモデル2WAY（10万円まで）", icon: "Music" },
                { title: "ドアチューニングBコース", description: "¥27,500 相当", icon: "Zap" },
                { title: "カスタムインナーバッフル", description: "¥11,000 相当", icon: "Layers" },
                { title: "スピーカーケーブル", description: "ANGオリジナル/10m (¥16,500 相当)", icon: "Layers" },
                { title: "ツイーター取り付け", description: "純正位置もしくはオンダッシュ取り付け", icon: "Music" },
                { title: "取付・調整工賃", description: "ワイヤリング込 ¥22,000 相当", icon: "Wrench" }
            ],
            upgrades: [
                { 
                    title: "B→Aコース", 
                    price: "+¥11,000", 
                    description: "背圧処理にフェリソニDS-1.5WPを使用、及び制振材料の増量（通常¥16,500）" 
                },
                { 
                    title: "B→A+コース", 
                    price: "+¥22,000", 
                    description: "背圧処理にフェリソニC2を使用、及び制振材料の増量（通常¥27,500）" 
                },
                { 
                    title: "B→Sコース", 
                    price: "+¥33,000", 
                    description: "DS-1.5WPをさらに増量。最新マテリアルを複合した高密度な施工（通常¥38,500）" 
                },
                { 
                    title: "B→S+コース", 
                    price: "+¥44,000", 
                    description: "フェリソニC2を贅沢に使用。最高峰の制振・吸音・遮音処理（通常¥49,500）" 
                }
            ],
            notes: [
                "注)バッフル適合が無い車種では別途製作しますので5500円が必要です。",
                "注）ツィーター固定にマウントなどが必要な車種では別途追加が必要になります。",
                "注）ドア通線に加工が必要な車両(ハーネスがカプラなど)では別途加工費用がかかります。"
            ]
        },
        lineup: [
            { brand: "KICKER", model: "CSS674", price: "81840", depth: "47mm", tweeter: "付属", image: "/images/Audio/speakers/kicker_css674.webp", youtube: "https://www.youtube.com/watch?v=kicker_sample" },
            { brand: "FOCAL", model: "PS165V1", price: "98450", depth: "65mm", tweeter: "付属", image: "/images/Audio/speakers/focal_ps165v1.webp", youtube: "https://www.youtube.com/watch?v=focal_sample" }
        ]
    };

    // If plan is found but missing details (reverted data), merge with fallback
    if (plan && (plan.id === 'standard-line' || plan.name?.includes('STANDARD line')) && (!plan.packageDetails || !plan.lineup)) {
        plan = { ...plan, ...STANDARD_LINE_FALLBACK };
    }

    const details = plan?.packageDetails;
    const lineup = plan?.lineup;

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100">
            <MegaMenu show={isMenuOpen} onClose={() => setIsMenuOpen(false)} navigate={navigate} plans={plans} />

            <header className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 print:hidden">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-all group">
                            <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100"><ArrowLeft className="w-4 h-4" /></div>
                            <span className="text-[10px] font-black tracking-widest uppercase hidden sm:block">Back</span>
                        </button>
                        <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-black italic transition-transform group-hover:scale-110">S</div>
                            <span className="font-black tracking-tighter text-xl hidden md:block">Sound ANG</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => window.print()} className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-blue-600 transition-all font-black text-[10px] tracking-widest uppercase"><Printer className="w-4 h-4" /> PRINT</button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-full font-black text-xs tracking-widest uppercase hover:bg-blue-600 transition-all shadow-lg shadow-gray-200">
                            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />} {isMenuOpen ? 'CLOSE' : 'MENU'}
                        </button>
                    </div>
                </div>
            </header>

            <div className="pt-20">
                {/* 1. Main Catalog Page (A4 Page 1) */}
                <div className={`${view === 'lp' ? 'block' : 'hidden'} print:block print:pt-0`}>
                    <div className="max-w-6xl mx-auto px-4 py-8 print:p-0 print:max-w-none">
                        {/* 1. Header: Brand & Store Info */}
                        <header className="flex justify-between items-end border-b-2 border-gray-900 pb-4 mb-8 print:mb-3 print:pb-2 print:border-black">
                            <div className="text-left">
                                <div className="flex items-center gap-3 mb-1 print:mb-0.5">
                                    <span className="w-8 h-[2px] bg-blue-600 print:w-4 print:h-[1px]"></span>
                                    <p className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase print:text-[8px] print:font-medium">
                                        SOUND ANG
                                    </p>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none mb-2 print:text-3xl print:mb-1">
                                    {(plan.name || '').split(' ')[0]}
                                </h1>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <p className="text-lg md:text-xl font-bold text-gray-500 tracking-tight print:text-[11px] print:font-medium">
                                        スピーカー交換パッケージ
                                    </p>
                                    <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-200 print:hidden"></span>
                                    <p className="text-sm md:text-base font-bold text-blue-500 print:text-[8px] print:font-light">
                                        17cm 2WAY セパレート / 10万円まで
                                    </p>
                                </div>
                            </div>
                        </header>

                        {/* 2. Price Comparison Example Box */}
                        <div className="bg-gray-900 text-white p-10 rounded-[3rem] mb-6 shadow-2xl shadow-blue-100 print:bg-gray-50 print:text-black print:p-5 print:rounded-xl print:mb-4 print:shadow-none print:border print:border-gray-200">
                            <h2 className="text-2xl md:text-3xl font-black mb-10 text-center text-blue-400 print:text-[13px] print:text-black print:mb-4 print:font-bold">
                                同じ施工内容で、35,860円違います。
                            </h2>
                            
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                                {/* Left: Normal Price with Breakdown */}
                                <div className="text-center">
                                    <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 opacity-40 print:text-[7px] print:mb-1">通常施工（単品合計）の場合</p>
                                    <div className="opacity-60 print:opacity-100">
                                        <p className="text-[10px] md:text-xs font-bold mb-2 print:text-[7px] print:mb-0.5">スピーカー本体 40,700円 ＋ 施工費 77,000円</p>
                                        <p className="text-3xl md:text-4xl font-black line-through decoration-red-500/50 decoration-4 print:text-lg print:decoration-2">
                                            ¥117,700
                                        </p>
                                    </div>
                                </div>

                                {/* Transition Label */}
                                <div className="flex flex-col items-center gap-2 opacity-40 print:opacity-100">
                                    <div className="hidden md:block text-4xl font-light text-gray-700 print:text-gray-300">→</div>
                                    <p className="text-[10px] font-black tracking-tighter print:text-[7px]">パッケージなら</p>
                                    <div className="md:hidden text-2xl opacity-40">↓</div>
                                </div>

                                {/* Right: Package Price */}
                                <div className="text-center relative">
                                    <p className="text-xs font-bold tracking-widest uppercase mb-4 text-blue-400 print:text-[7.5px] print:text-gray-500 print:mb-1">パッケージ価格</p>
                                    <p className="text-5xl md:text-7xl font-black text-white print:text-3xl print:text-black leading-none tracking-tighter">
                                        ¥81,840
                                    </p>
                                    <div className="absolute -top-6 -right-12 md:-right-20 bg-blue-600 text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-black rotate-12 shadow-xl print:static print:rotate-0 print:bg-transparent print:text-blue-600 print:p-0 print:text-[10px] print:mt-2 print:font-bold">
                                        35,860円おトク！
                                    </div>
                                </div>
                            </div>

                            <p className="text-center mt-12 text-[10px] font-bold text-gray-500 print:text-[7px] print:mt-4 print:font-light">
                                ※KICKER CSS674（40,700円）の場合
                            </p>
                        </div>

                        {/* Professional Advice Message */}
                        <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-[2rem] mb-10 print:bg-white print:border-gray-200 print:p-3 print:rounded-lg print:mb-6">
                            <p className="text-sm md:text-base font-bold text-gray-600 text-center leading-relaxed print:text-[8.5px] print:font-medium">
                                車種やご希望に合わせて最適なスピーカーをご提案します。<br className="hidden md:block" />
                                音の好みは実際に店頭のデモ機で試聴してからお決めください。
                            </p>
                        </div>

                        {/* 3. Package Contents Grid (3 Columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 print:grid-cols-3 print:gap-1.5 print:mb-4">
                            {[
                                { title: 'ドアチューニング', val: 'Bコース', sub: '27,500円相当', img: '/images/Audio/Speaker/door-b.webp' },
                                { title: 'インナーバッフル', val: 'カスタム製作', sub: '11,000円相当', img: '/images/Audio/Speaker/baffle.webp' },
                                { title: 'スピーカーケーブル', val: 'ANGオリジナル', sub: '16,500円相当', img: '/images/Audio/Speaker/ang-cable.webp' },
                                { title: 'ツイーター取付', val: '純正 / オンダッシュ', sub: '込み' },
                                { title: 'ワイヤリング工賃', detail: '調整込み', sub: '22,000円相当' },
                                { title: '施工費合計', val: '77,000円', sub: 'すべて込み', highlight: true }
                            ].map((item, i) => (
                                <div key={i} className={`rounded-[2.5rem] border-2 overflow-hidden transition-all hover:translate-y-[-4px] ${item.highlight ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-200' : 'bg-white border-gray-100 text-gray-900 shadow-sm'} print:rounded-md print:border-[0.5px] print:translate-y-0 print:shadow-none ${item.highlight ? 'print:bg-blue-50 print:border-blue-300 print:text-blue-900' : 'print:bg-gray-50 print:border-gray-200'}`}>
                                    {item.img && (
                                        <div className="aspect-video bg-gray-100 overflow-hidden print:aspect-[16/9]">
                                            <SafeImage src={item.img} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className={`p-6 ${!item.img ? 'h-full flex flex-col justify-center' : ''} print:p-2`}>
                                        <p className={`text-[10px] font-bold tracking-widest uppercase mb-2 ${item.highlight ? 'text-blue-200 print:text-blue-600' : 'text-gray-400'} print:text-[7.5px] print:mb-0.5 print:font-light`}>
                                            {item.title}
                                        </p>
                                        <p className={`text-2xl font-black mb-1 print:text-[11px] print:font-medium print:mb-0`}>
                                            {item.val || item.detail}
                                        </p>
                                        <p className={`text-xs font-bold ${item.highlight ? 'text-blue-100 print:text-blue-500' : 'text-gray-400'} print:text-[7.5px] print:font-light`}>
                                            {item.sub}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 4. Notes Section */}
                        <div className="px-6 mb-10 print:mb-4 print:px-1">
                            <p className="text-xs font-bold text-gray-400 flex items-start gap-2 mb-1 print:text-[7.5px] print:font-light print:leading-tight">
                                <span className="text-blue-600 print:text-gray-300">※</span> バッフル適合なし車種：別途 5,500円
                            </p>
                            <p className="text-xs font-bold text-gray-400 flex items-start gap-2 print:text-[7.5px] print:font-light print:leading-tight">
                                <span className="text-blue-600 print:text-gray-300">※</span> ツイーターマウント・ドア通線加工が必要な場合：別途費用あり
                            </p>
                        </div>

                        <hr className="border-gray-100 mb-10 print:border-gray-200 print:mb-4" />

                        {/* 5. Upgrades & Options Grid (2 Columns) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 print:grid-cols-2 print:gap-4 print:mb-6">
                            {/* Upgrade Courses */}
                            <div>
                                <h3 className="text-lg font-black mb-6 flex items-center gap-3 border-l-4 border-blue-600 pl-4 print:text-[9.5px] print:font-medium print:mb-2 print:pl-2">
                                    ドアチューニング グレードアップ <span className="text-gray-400 text-xs font-bold print:text-[7.5px] print:font-light">（同時施工割引）</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-1.5">
                                    {(details?.upgrades?.length ? details.upgrades : [
                                        { title: 'Aコース', description: 'フェリソニDS-1.5WP使用・制振増量', price: '+11,000円' },
                                        { title: 'A+コース', description: 'フェリソニC2使用・制振増量', price: '+22,000円' },
                                        { title: 'Sコース', description: 'DS-1.5WP増量＋最新マテリアル複合', price: '+33,000円' },
                                        { title: 'S+コース', description: 'C2増量＋最高峰の制振・吸音・遮音', price: '+44,000円' }
                                    ]).map((item: any, i: number) => (
                                        <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all print:p-2 print:rounded-md print:border-[0.5px] print:border-gray-200 print:shadow-none">
                                            <div className="flex justify-between items-baseline mb-2 print:mb-0.5">
                                                <span className="font-black text-base print:text-[9px] print:font-medium">{item.title || item.name}</span>
                                                <div className="text-right">
                                                    <span className="text-blue-600 font-black text-base print:text-[9px] print:font-medium">{item.price}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs font-bold text-gray-400 print:text-[7.5px] print:font-light print:mb-0 leading-tight">
                                                {item.description || item.spec}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Installation Options */}
                            <div>
                                <h3 className="text-lg font-black mb-6 flex items-center gap-3 border-l-4 border-blue-600 pl-4 print:text-[9.5px] print:font-medium print:mb-2 print:pl-2">
                                    インストールオプション
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-1.5">
                                    {[
                                        { name: 'メタルバッフル変更', desc: 'タイトでキレのある再生へ。20% OFF', price: '20% OFF', img: '/images/Audio/Speaker/metal.webp' },
                                        { name: 'ツイーター埋め込み', desc: '純正のような美しい仕上がりへ', price: '46,200円〜', img: '/images/Audio/Speaker/tw-mount.webp' }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden print:p-0 print:rounded-md print:border-[0.5px] print:border-gray-200 print:shadow-none">
                                            <div className="aspect-video bg-gray-100 overflow-hidden">
                                                <SafeImage src={item.img} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-6 print:p-2">
                                                <div className="flex justify-between items-baseline mb-1 print:mb-0.5">
                                                    <span className="font-black text-base print:text-[9px] print:font-medium">{item.name}</span>
                                                    <span className="text-blue-600 font-black text-base print:text-[9px] print:font-medium">{item.price}</span>
                                                </div>
                                                <p className="text-xs font-bold text-gray-400 print:text-[7.5px] print:font-light leading-tight">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 6. Footer: Store badges & Contact */}
                        <footer className="flex flex-col md:flex-row justify-between items-center border-t-2 border-gray-900 pt-8 mt-12 print:mt-auto print:pt-3 print:border-gray-200 print:flex-row print:items-end">
                            <div className="flex gap-4 mb-6 md:mb-0 print:mb-0 print:gap-2">
                                <div className="bg-gray-900 text-white px-6 py-2 rounded-xl text-xs font-black tracking-widest print:bg-black print:px-3 print:py-1 print:text-[7.5px] print:rounded-sm">作業1日お預かり</div>
                                <div className="bg-gray-900 text-white px-6 py-2 rounded-xl text-xs font-black tracking-widest print:bg-black print:px-3 print:py-1 print:text-[7.5px] print:rounded-sm">無料代車完備</div>
                            </div>
                        </footer>
                    </div>
                </div>

                {/* 2. Speaker Lineup Catalog (A4 Page 2+) */}
                <div className={`${view === 'catalog' ? 'block' : 'hidden'} print:block print:break-before-page print:pt-8`}>
                    <div className="max-w-7xl mx-auto px-4 py-12 print:p-0">
                        <div className="mb-12 border-b-4 border-gray-900 pb-4 print:mb-6 print:pb-2">
                            <h2 className="text-4xl font-black tracking-tighter print:text-xl">推奨スピーカー・ラインナップ</h2>
                            <p className="text-gray-400 font-bold print:text-[10px]">スピーカー・取り付け・消費税込みのパッケージ価格です。</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 print:grid-cols-2 print:gap-4">
                            {plan.lineup?.map((item: any, i: number) => (
                                <div key={i} className="group bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all print:p-4 print:rounded-2xl print:border-gray-200">
                                    <div className="flex justify-between items-start mb-6 print:mb-3">
                                        <div>
                                            <span className="inline-block px-3 py-1 bg-gray-100 text-[10px] font-black rounded-lg mb-2 print:mb-1 print:text-[8px]">{item.brand}</span>
                                            <h4 className="text-xl font-black tracking-tight print:text-sm">{item.model}</h4>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-black text-gray-400 mb-1 print:text-[8px]">PACKAGE PRICE</div>
                                            <div className="text-2xl font-black text-blue-600 print:text-base">¥{Number(item.price).toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div className="aspect-video bg-gray-50 rounded-2xl mb-6 overflow-hidden print:mb-3 print:rounded-lg">
                                        <SafeImage src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 print:text-[8px]">
                                                <Info className="w-3 h-3" />
                                                <span>D: {item.depth || '--'} / T: {item.tweeter || '--'}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <img src={getQRCodeUrl(item.youtube)} alt="QR" className="w-12 h-12 inline-block print:w-10 print:h-10" />
                                            <p className="text-[7px] font-black text-gray-400 mt-1 print:text-[6px]">試聴サンプル</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* View Switcher (Web Only) */}
                <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center gap-4 print:hidden">
                    <button onClick={() => setView('lp')} className={`px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all ${view === 'lp' ? 'bg-gray-900 text-white shadow-xl' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>CATALOG PAGE</button>
                    <button onClick={() => setView('catalog')} className={`px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all ${view === 'catalog' ? 'bg-gray-900 text-white shadow-xl' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>SPEAKER LINEUP</button>
                </div>
            </div>

            {/* Premium Footer Section */}
            <footer className="bg-gray-50 py-20 border-t border-gray-100 print:hidden">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black mb-4 tracking-tighter">ご相談・お見積もりは無料です</h2>
                    <p className="text-gray-400 font-bold mb-12">専門店ならではの豊富な知識で、あなたの理想の音作りをサポートします。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button onClick={() => navigate('/reservation')} className="group relative bg-gray-900 text-white p-8 rounded-[2.5rem] overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl shadow-gray-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center"><CalendarIcon className="w-8 h-8" /></div>
                                <div className="text-left w-full text-center">
                                    <span className="text-[10px] font-black tracking-widest uppercase text-blue-400 block mb-1">Reservation</span>
                                    <h4 className="text-xl font-black">来店予約をする</h4>
                                </div>
                            </div>
                        </button>
                        <a href="https://page.line.me/312qjhsq?openQrModal=true" target="_blank" rel="noopener noreferrer" className="group relative bg-white border border-gray-100 p-8 rounded-[2.5rem] overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl shadow-gray-100">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#06C755]/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-[#06C755]/10 rounded-2xl flex items-center justify-center text-[#06C755]"><MessageSquare className="w-8 h-8" /></div>
                                <div className="text-left w-full text-center">
                                    <span className="text-[10px] font-black tracking-widest uppercase text-[#06C755] block mb-1">LINE Chat</span>
                                    <h4 className="text-xl font-black">LINEで相談・見積もり</h4>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="mt-16 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3 group" onClick={() => navigate('/')}>
                            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white font-black italic">S</div>
                            <span className="font-black tracking-tighter text-lg">Sound ANG</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2024 Sound ANG Fukuoka. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Print Only Footer Information */}
            <div className="hidden print:block border-t-2 border-black pt-4 mt-8">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black">Sound ANG 福岡店</p>
                        <p className="text-[8px] font-bold text-gray-500">福岡県大野城市御笠川1-10-5 / TEL: 092-503-5437</p>
                        <p className="text-[8px] font-bold text-gray-500">営業時間: 10:00〜19:00 / 定休日: 水曜日</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[7px] font-black text-gray-400 mb-1 uppercase tracking-widest">Official Website</p>
                        <img src={getQRCodeUrl('https://sound-ang.com')} alt="Website QR" className="w-12 h-12 ml-auto" />
                    </div>
                </div>
            </div>

            {/* Print Only Global Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page { margin: 8mm 12mm; size: A4; }
                    body { -webkit-print-color-adjust: exact; background: white !important; }
                    
                    /* Force 1-page fit for description */
                    .print-compact-gap { gap: 1rem !important; margin-bottom: 1rem !important; }
                    .print-shrink-text { font-size: 0.85rem !important; line-height: 1.4 !important; }
                    .print-shrink-h1 { font-size: 2.5rem !important; margin-bottom: 0.5rem !important; }
                    .print-shrink-h2 { font-size: 1.5rem !important; }
                    .print-shrink-card { padding: 1.5rem !important; border-radius: 1.5rem !important; }
                    
                    /* Hide non-essential print items if needed */
                    .print-hide { display: none !important; }
                    
                    /* Ensure exact colors and page breaks */
                    .print-break-before-page { break-before: page; margin-top: 0 !important; }
                    * { -webkit-print-color-adjust: exact !important; }
                    
                    /* Stable Flex Layout for Print */
                    .print-flex-container { 
                        display: flex !important; 
                        flex-direction: row !important;
                        align-items: flex-start !important;
                        gap: 1.5rem !important;
                        width: 100% !important;
                    }
                    .print-flex-left { width: 62% !important; flex-shrink: 0 !important; }
                    .print-flex-right { width: 35% !important; flex-shrink: 0 !important; }
                    
                    /* Specific adjustments for A4 height */
                    .grid { display: grid !important; }
                }
            `}} />
        </div>
    );
};

export default AudioPlanDetail;
