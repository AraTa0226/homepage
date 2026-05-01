import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { usePrices } from '../../contexts/PriceContext';
import { 
    Speaker, 
    ArrowLeft, 
    MessageSquare, 
    Mail, 
    ChevronRight,
    Music,
    Zap,
    Award,
    ShieldCheck,
    Menu,
    X,
    Calendar as CalendarIcon,
    Home
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

const MegaMenu = ({ show, categories, theme, onClose, navigate, handleMenuClick }: any) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-4 z-50 pointer-events-auto"
                >
                    <div className={`rounded-3xl shadow-2xl overflow-hidden border ${theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-gray-100'} p-8 w-[90vw] max-w-[1000px]`}>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {categories.map((cat: any) => (
                                <div key={cat.id} className="flex flex-col gap-4">
                                    <div
                                        onClick={() => {
                                            onClose();
                                            navigate(cat.path);
                                        }}
                                        className="flex flex-col gap-1 border-b border-gray-100 pb-3 group/header cursor-pointer"
                                    >
                                        <span className="text-[9px] font-black tracking-[0.2em] text-blue-600 uppercase">{cat.subtitle}</span>
                                        <span className={`text-[13px] font-black tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'} group-hover/header:text-blue-600`}>
                                            {cat.title.split('・')[0]}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {cat.items.map((item: string, idx: number) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    const planMapping: Record<string, any> = {
                                                        "BASIC line (コアキシャル)": { id: "speaker_package", planId: "basic-coaxial" },
                                                        "BASIC line (セパレート)": { id: "speaker_package", planId: "basic-separate" },
                                                        "STANDARD line (10万円まで)": { id: "speaker_package", planId: "standard-line" },
                                                        "PREMIUM line (10万円以上)": { id: "speaker_package", planId: "premium-line" },
                                                        "フロント3WAYセット": { id: "speaker_package", planId: "front-3way" },
                                                        "BMW専用パッケージ": { id: "speaker_package", planId: "bmw-package" },
                                                        "Mercedes Benz専用パッケージ": { id: "speaker_package", planId: "mercedes-package" },
                                                        "車種別スピーカー交換プラン": { id: "speaker_package", planId: "model-specific" },
                                                        "AMP内蔵DSPパッケージ": { id: "digital_source", planId: "amplified-dsp" },
                                                        "AMPレスDSPパッケージ": { id: "digital_source", planId: "standalone-dsp" },
                                                        "お手軽低音増強 (パワード)": { id: "bass_power", planId: "easy-bass" },
                                                        "お手軽低音増強＋ (アンプ別)": { id: "bass_power", planId: "easy-bass-plus" },
                                                        "店内の常時試聴ユニット": { id: "audition-showcase", isAnchor: true },
                                                        "施工ブログ / 店舗詳細": { id: "contact", isAnchor: true }
                                                    };
                                                    const target = planMapping[item] || { id: cat.id };
                                                    onClose();
                                                    handleMenuClick(target);
                                                }}
                                                className="text-[11px] font-bold text-gray-400 hover:text-blue-600 transition-all hover:translate-x-1 text-left flex items-center gap-2 group/link"
                                            >
                                                <div className="w-1 h-1 rounded-full bg-gray-200 group-hover/link:bg-blue-400 transition-colors" />
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const AudioPlanDetail: React.FC = () => {
    const { planId } = useParams();
    const navigate = useNavigate();
    const { plans, setSelectedPlan, setSelectedCategory } = usePrices();
    const [showMegaMenu, setShowMegaMenu] = useState(false);

    const handleMenuClick = (item: any) => {
        const category = plans.find(p => p.id === item.id);
        if (category) {
            setSelectedCategory(category);
            const targetId = item.planId || item.planName || item.name;
            if (category.type === 'audio') {
                navigate(`/audio/plan/${encodeURIComponent(targetId)}`);
            } else {
                const planItem = category.items.find(i => i.id === targetId || i.name === targetId);
                if (planItem) {
                    setSelectedPlan(planItem);
                    navigate(`/security/vehicle/special#${planItem.id}`);
                }
            }
        }
    };

    const decodedPlanId = decodeURIComponent(planId || "");

    // Full audio categories for the menu
    const audioCategories = [
        { id: 'speaker_package', title: 'スピーカー・パッケージ', subtitle: 'ACOUSTICS', items: ['BASIC line (コアキシャル)', 'BASIC line (セパレート)', 'STANDARD line (10万円まで)', 'PREMIUM line (10万円以上)', 'フロント3WAYセット', 'BMW専用パッケージ', 'Mercedes Benz専用パッケージ', '車種別スピーカー交換プラン'], path: '/audio/sp-package' },
        { id: 'bass_power', title: 'DSP / アンプ / ウーファー', subtitle: 'ELECTRONICS', items: ['AMP内蔵DSPパッケージ', 'AMPレスDSPパッケージ', 'アンプインスト・パッケージ', '省スペース小型アンプ', 'お手軽低音増強 (パワード)', 'お手軽低音増強＋ (アンプ別)'], path: '/audio/amp-dsp' },
        { id: 'custom_install', title: '施工・カスタム', subtitle: 'EXPERT CUSTOM', items: ['カスタムインストール', 'ツィーターCOOLマウント', 'オリジナルアウターバッフル', 'サブウーハー施工のアレコレ'], path: '/audio/custom' },
        { id: 'digital_source', title: 'ハイレゾ・デジタル', subtitle: 'TECH & DIGITAL', items: ['ハイレゾ導入のススメ', 'いま注目！メディアプレーヤー'], path: '/audio/digital-source' },
        { id: 'install_tuning', title: 'デッドニング・音響パーツ', subtitle: 'DEADENING', items: ['ドアチューニング (デッドニング)', 'サイレントチューニング (静音)'], path: '/audio/deadening' }
    ];

    let plan = null;
    for (const cat of plans.filter(p => p.type === 'audio')) {
        plan = cat.items.find(item => item.name === decodedPlanId || item.id === decodedPlanId);
        if (plan) break;
    }

    // Even if not found in data, we show the name from the URL
    const displayTitle = plan?.name || decodedPlanId;

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${displayTitle} | サウンドエナジー (Sound ANG)`;
    }, [displayTitle]);

    return (
        <div className="min-h-screen bg-white">
            {/* Header / Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <button 
                            onClick={() => navigate('/')}
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white group-hover:scale-105 transition-all">
                                <span className="font-black italic">S</span>
                            </div>
                            <span className="font-black tracking-tighter text-xl hidden sm:block">Sound ANG</span>
                        </button>

                        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest shrink-0">
                            <button onClick={() => navigate('/')} className="flex flex-col items-center group/item transition-colors">
                                <span className="text-[11px] font-black tracking-widest group-hover/item:text-blue-500">HOME</span>
                                <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">ホーム</span>
                            </button>
                            <div
                                className="relative group/nav py-6"
                                onMouseEnter={() => setShowMegaMenu(true)}
                                onMouseLeave={() => setShowMegaMenu(false)}
                            >
                                <button className={`flex flex-col items-center transition-colors group-hover/nav:text-blue-500 ${showMegaMenu ? 'text-blue-500' : ''}`}>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[11px] font-black tracking-widest">MENU</span>
                                        <ChevronRight className={`w-3 h-3 transition-transform ${showMegaMenu ? 'rotate-90' : ''}`} />
                                    </div>
                                    <span className="text-[8px] font-bold opacity-40 group-hover/nav:opacity-100 transition-opacity">メニュー一覧</span>
                                </button>
                                <MegaMenu
                                    show={showMegaMenu}
                                    categories={audioCategories}
                                    theme="light"
                                    onClose={() => setShowMegaMenu(false)}
                                    navigate={navigate}
                                    handleMenuClick={handleMenuClick}
                                />
                            </div>
                            <button onClick={() => navigate('/#blog')} className="flex flex-col items-center group/item transition-colors">
                                <span className="text-[11px] font-black tracking-widest group-hover/item:text-blue-500">BLOG</span>
                                <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">ブログ</span>
                            </button>
                            <button onClick={() => navigate('/#access')} className="flex flex-col items-center group/item transition-colors">
                                <span className="text-[11px] font-black tracking-widest group-hover/item:text-blue-500">ACCESS</span>
                                <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">店舗案内</span>
                            </button>
                        </nav>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate(-1)}
                            className="hidden md:flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group mr-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-[10px] font-black tracking-widest uppercase">Back</span>
                        </button>
                        
                        <a 
                            href="https://page.line.me/312qjhsq?openQrModal=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#06C755] text-white px-5 py-2.5 rounded-xl font-black text-[10px] tracking-widest shadow-lg shadow-green-500/20 hover:scale-105 transition-all"
                        >
                            <MessageSquare className="w-4 h-4" />
                            LINE相談
                        </a>
                        <button 
                            onClick={() => navigate('/reservation')}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-[10px] tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
                        >
                            <CalendarIcon className="w-4 h-4" />
                            来店予約
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Hero Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-6">
                                <Music className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Speaker Upgrade Plan</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">
                                {displayTitle}
                            </h1>
                            <div className="flex items-baseline gap-4 mb-10">
                                <span className="text-sm font-bold text-gray-400">Price From</span>
                                <span className="text-5xl font-black text-blue-600 tracking-tighter">
                                    ¥{plan ? Number(plan.price).toLocaleString() : "---,---"}
                                </span>
                                <span className="text-sm font-bold text-gray-400 text-sm">税込 (工賃別)</span>
                            </div>

                            <p className="text-lg text-gray-500 font-bold leading-relaxed mb-10">
                                このプランは現在詳細ページを準備中です。<br />
                                施工内容の詳細や適合車種、お見積りについてはお気軽にお問い合わせください。
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href="https://page.line.me/312qjhsq?openQrModal=true"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-[#06C755] text-white px-8 py-5 rounded-2xl font-black text-sm tracking-widest shadow-xl shadow-green-500/20 hover:scale-105 transition-all"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    LINEで相談する
                                </a>
                                <button 
                                    onClick={() => navigate('/reservation')}
                                    className="flex items-center gap-3 bg-gray-900 text-white px-8 py-5 rounded-2xl font-black text-sm tracking-widest shadow-xl shadow-gray-900/10 hover:scale-105 transition-all"
                                >
                                    <Mail className="w-5 h-5" />
                                    来店予約・見積り
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/10 border border-gray-100">
                                <SafeImage 
                                    src={plan.image || '/images/Audio/speaker_default.webp'} 
                                    alt={plan.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Decorative Elements */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 blur-3xl rounded-full -z-10"></div>
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/10 blur-3xl rounded-full -z-10"></div>
                        </motion.div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plan?.features?.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-2">{feature}</h3>
                                <p className="text-xs text-gray-500 font-bold leading-relaxed">
                                    最高品質のパーツを使用し、熟練のインストーラーが丁寧に施工いたします。
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Coming Soon Notice */}
                    <div className="mt-24 p-12 bg-gray-900 rounded-[3rem] text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <Award className="w-16 h-16 text-blue-500 mx-auto mb-8" />
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter">
                                COMING SOON
                            </h2>
                            <p className="text-gray-400 font-bold max-w-2xl mx-auto leading-relaxed">
                                より詳細な施工ギャラリーや、パーツの解説などを順次公開予定です。<br />
                                サウンドエナジーが提供する、至高の音響空間へのこだわりを是非ご期待ください。
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer-like Floating Action (Mobile) */}
            <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl p-4 shadow-2xl flex gap-3">
                    <a 
                        href="https://page.line.me/312qjhsq?openQrModal=true"
                        className="flex-1 bg-[#06C755] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xs tracking-widest"
                    >
                        <MessageSquare className="w-4 h-4" /> LINE
                    </a>
                    <button 
                        onClick={() => navigate('/reservation')}
                        className="flex-1 bg-gray-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xs tracking-widest"
                    >
                        <Mail className="w-4 h-4" /> 予約
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioPlanDetail;
