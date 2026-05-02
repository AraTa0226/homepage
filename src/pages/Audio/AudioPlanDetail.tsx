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
                "車種により追加バッフルが必要な場合があります。",
                "特殊な車両（輸入車等）は別途お見積りとなります。",
                "純正オーディオの仕様により別途部材が必要な場合があります。"
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
                        {/* Header Section - Compact but high impact */}
                        <div className="text-center mb-10 print:mb-6">
                            <div className="inline-block px-5 py-1.5 bg-blue-600 text-white rounded-full text-xs font-black tracking-[0.3em] uppercase mb-6 print:mb-2 print:bg-black print:text-[10px]">STANDARD LINE</div>
                            
                            <div className="relative inline-block mb-8 print:mb-2">
                                <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-tight flex flex-col items-center gap-2 print:text-4xl print:shrink-h1">
                                    <span className="block">{(plan.name || '').split(' ')[0]}</span>
                                    { (plan.name || '').split(' ').length > 1 && (
                                        <span className="text-2xl md:text-3xl text-blue-600 print:text-sm tracking-widest">{(plan.name || '').split(' ').slice(1).join(' ')}</span>
                                    )}
                                </h1>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-2 bg-blue-600 rounded-full print:static print:mx-auto print:mt-2 print:translate-x-0 print:w-16 print:h-1 print:bg-black" />
                            </div>
                            
                            <div className="max-w-4xl mx-auto bg-blue-50/50 p-8 rounded-[2.5rem] print:p-0 print:bg-transparent">
                                <p className="text-lg font-black text-blue-600 mb-3 print:text-xs print:mb-1">{(plan.description || '').split('\n')[0]}</p>
                                <p className="text-sm md:text-base font-bold text-gray-600 leading-relaxed text-left print:text-[10px] print:leading-snug">
                                    {(plan.description || '').split('\n').length > 2 ? (plan.description || '').split('\n').slice(2).join('\n') : (plan.description || '')}
                                </p>
                            </div>
                        </div>

                        {/* Main Info Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:gap-4 mb-10 print:mb-4 print:compact-gap print:grid-cols-12">
                            {/* Left: Description & Contents */}
                            <div className="lg:col-span-7 space-y-8 print:space-y-4 print:col-span-7">
                                <div className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100 print:p-6 print:rounded-3xl print:bg-white print:border-black print:border-2 print:shrink-card">
                                    <h3 className="text-2xl font-black mb-8 flex items-center gap-3 print:text-lg print:mb-4">
                                        <ShieldCheck className="w-8 h-8 text-blue-600 print:w-5 print:h-5" /> おトクなパッケージ構成内容
                                    </h3>
                                    <div className="space-y-3">
                                        {details?.contents?.map((item: any, i: number) => (
                                            <div key={i} className="flex justify-between items-center py-5 border-b border-gray-200 last:border-0 print:py-3 print:text-sm">
                                                <span className="font-bold text-gray-500 text-lg print:text-xs">{item.title}</span>
                                                <span className="font-black text-gray-900 text-xl print:text-sm">{item.description}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Image Gallery */}
                                    <div className="grid grid-cols-3 gap-4 mt-10 print:mt-2">
                                        <div className="space-y-1 text-center">
                                            <div className="aspect-square rounded-3xl overflow-hidden border-2 border-gray-100 print:rounded-xl print:border-black print:h-20 print:w-20 mx-auto">
                                                <SafeImage src="/images/Audio/Speaker/door-b.webp" className="w-full h-full object-cover" />
                                            </div>
                                            <p className="text-sm font-black text-gray-400 print:text-[8px] uppercase tracking-wider">ドアチューニング</p>
                                        </div>
                                        <div className="space-y-1 text-center">
                                            <div className="aspect-square rounded-3xl overflow-hidden border-2 border-gray-100 print:rounded-xl print:border-black print:h-20 print:w-20 mx-auto">
                                                <SafeImage src="/images/Audio/Speaker/baffle.webp" className="w-full h-full object-cover" />
                                            </div>
                                            <p className="text-sm font-black text-gray-400 print:text-[8px] uppercase tracking-wider">カスタムバッフル</p>
                                        </div>
                                        <div className="space-y-1 text-center">
                                            <div className="aspect-square rounded-3xl overflow-hidden border-2 border-gray-100 print:rounded-xl print:border-black print:h-20 print:w-20 mx-auto">
                                                <SafeImage src="/images/Audio/Speaker/ang-cable.webp" className="w-full h-full object-cover" />
                                            </div>
                                            <p className="text-sm font-black text-gray-400 print:text-[8px] uppercase tracking-wider">高品質配線</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Price Highlight */}
                            <div className="lg:col-span-5 flex flex-col justify-start gap-8 print:gap-4 print:col-span-5">
                                <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-blue-100 border-[3px] border-blue-600 text-center relative overflow-hidden print:p-6 print:rounded-3xl print:shadow-none print:border-black print:border-4 print:shrink-card">
                                    <div className="absolute top-0 left-0 bg-blue-600 text-white px-10 py-3 rounded-br-[2rem] font-black text-sm print:hidden tracking-widest">PRICE EXAMPLE</div>
                                    
                                    <div className="mb-6 bg-blue-50 py-3 rounded-2xl print:bg-transparent print:py-0">
                                        <p className="text-blue-700 font-black text-base print:text-xs">お見積り例：KICKER CSS674 (¥40,700) の場合</p>
                                    </div>

                                    <div className="mb-8 print:mb-6">
                                        <p className="text-gray-400 font-black text-base mb-2 print:text-xs">通常施工（単品合計）の場合</p>
                                        <p className="text-gray-400 font-black text-3xl line-through decoration-red-500 decoration-[3px] print:text-xl italic">¥117,700 <span className="text-sm print:text-xs">(税込)</span></p>
                                    </div>

                                    <div className="mb-6 print:mb-2 print:pb-0">
                                        <p className="text-blue-600 font-black text-lg mb-2 print:text-[10px] print:mb-0">スタンダードライン パッケージ価格</p>
                                        <div className="flex items-baseline justify-center gap-2 print:gap-1">
                                            <span className="text-8xl font-black text-blue-600 print:text-5xl print:text-black tracking-tighter leading-none">¥81,840</span>
                                            <span className="text-2xl font-bold print:text-[10px]">(税込)</span>
                                        </div>
                                        <p className="text-gray-400 font-bold text-xs mt-3 print:text-[7px] print:mt-1 leading-tight">※選ぶスピーカーによりパッケージ総額は変動します。<br className="hidden print:block" />詳しくはお見積りください。</p>
                                    </div>

                                    <div className="bg-gray-900 text-white p-6 rounded-3xl print:bg-black print:p-2.5 print:rounded-xl">
                                        <div className="flex items-center justify-center gap-4 mb-1 print:gap-2">
                                            <Zap className="w-8 h-8 text-yellow-400 print:w-4 print:h-4" />
                                            <p className="text-sm font-black opacity-70 print:text-[8px]">この組み合わせなら単品合計より</p>
                                        </div>
                                        <p className="font-black text-4xl print:text-xl tracking-tight">¥35,860 <span className="text-xl print:text-sm">おトク！</span></p>
                                    </div>
                                </div>

                                <div className="space-y-4 px-6 print:px-2">
                                    <p className="text-sm font-black text-blue-600 mb-2 print:text-[9px] tracking-wider">【 ご確認事項 】</p>
                                    {details?.notes?.map((note: string, i: number) => (
                                        <p key={i} className="text-sm text-gray-500 font-bold flex items-start gap-3 print:text-[8px] print:leading-snug">
                                            <span className="text-blue-600 shrink-0 mt-1">●</span> {note}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Unified Upgrade Menu Section - Large Horizontal Card */}
                        <div className="bg-gray-900 text-white p-12 rounded-[4rem] print:p-2 print:rounded-2xl print:bg-white print:text-black print:border-[1.5px] print:border-black print:mt-1 print:shrink-card">
                            <h3 className="text-3xl font-black mb-10 flex items-center gap-4 print:text-base print:m-0 print:mb-1 text-blue-400 print:text-black">
                                <Volume2 className="w-10 h-10 print:hidden" /> オトクなアップグレード・オプション
                            </h3>

                            <div className="xl:grid xl:grid-cols-12 gap-12 print-flex-container">
                                {/* 1. Door Tuning Upgrades */}
                                <div className="xl:col-span-7 print-flex-left">
                                    <h4 className="text-sm font-black text-blue-400 mb-6 print:text-[8.5px] print:m-0 print:mb-0.5 tracking-[0.2em] uppercase print:text-black">■ ドアチューニング・コース変更</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-1.5">
                                        {details?.upgrades?.map((opt: any, i: number) => (
                                            <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors print:bg-white print:border-gray-200 print:p-1.5 print:rounded-lg">
                                                <div className="flex justify-between items-center mb-0.5">
                                                    <span className="font-black text-lg print:text-[9.5px]">{opt.title}</span>
                                                    <span className="font-black text-blue-400 print:text-black text-lg print:text-[9.5px]">{opt.price}</span>
                                                </div>
                                                <p className="text-sm text-gray-400 font-bold leading-snug print:text-[7.5px] print:text-gray-500 print:leading-tight">{opt.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Hardware & Installation Upgrades */}
                                <div className="xl:col-span-5 space-y-6 print:space-y-0 print-flex-right">
                                    <h4 className="text-sm font-black text-blue-400 mb-6 print:text-[8.5px] print:m-0 print:mb-0.5 tracking-[0.2em] uppercase print:text-black">■ インストール・オプション</h4>
                                    
                                    <div className="grid grid-cols-1 print:grid-cols-1 gap-4 print:gap-1">
                                        {/* Metal Baffle Sub-card */}
                                        <div className="flex bg-white/5 rounded-3xl overflow-hidden border border-white/10 print:bg-white print:border-gray-200 print:rounded-lg">
                                            <div className="w-32 shrink-0 print:w-20 bg-gray-100">
                                                <SafeImage src="/images/Audio/Speaker/metal.webp" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-6 print:p-4 flex-grow flex flex-col justify-center">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-black text-sm print:text-[11px]">メタルバッフル変更</span>
                                                    <span className="text-blue-400 font-black text-sm print:text-[11px] print:text-black">20% OFF</span>
                                                </div>
                                                <p className="text-[11px] text-gray-400 font-bold leading-tight print:text-[9.5px] print:text-gray-500">同時施工でおトク。タイトでキレのある再生へ。</p>
                                            </div>
                                        </div>

                                        {/* Tweeter Sub-card */}
                                        <div className="flex bg-white/5 rounded-3xl overflow-hidden border border-white/10 print:bg-white print:border-gray-200 print:rounded-lg">
                                            <div className="w-32 shrink-0 print:w-20 bg-gray-100">
                                                <SafeImage src="/images/Audio/Speaker/tw-mount.webp" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-6 print:p-4 flex-grow flex flex-col justify-center">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-black text-sm print:text-[11px]">ツィーター埋め込み</span>
                                                    <span className="text-blue-400 font-black text-sm print:text-[11px] print:text-black">¥46,200〜</span>
                                                </div>
                                                <p className="text-[11px] text-gray-400 font-bold leading-tight print:text-[9.5px] print:text-gray-500">純正のような美しい仕上がりで理想の音場へ。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Work Info */}
                        <div className="mt-12 flex justify-center gap-16 print:mt-2 print:gap-10 text-gray-400 print:text-black">
                            <div className="flex items-center gap-4 font-black text-lg print:text-[10px] print:gap-2"><Clock className="w-8 h-8 text-blue-600 print:w-4 print:h-4" /> 作業1日お預かり</div>
                            <div className="flex items-center gap-4 font-black text-lg print:text-[10px] print:gap-2"><Car className="w-8 h-8 text-blue-600 print:w-4 print:h-4" /> 無料代車完備</div>
                        </div>
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
