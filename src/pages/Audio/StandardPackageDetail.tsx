import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
    ChevronRight, 
    MessageSquare, 
    Calendar as CalendarIcon, 
    ArrowLeft, 
    CheckCircle2, 
    Printer, 
    Zap, 
    Music, 
    Youtube, 
    ShieldCheck,
    Layers,
    Wrench,
    ArrowRight
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

// QR Code utility using Google Charts API
const getQRCodeUrl = (url: string) => `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(url)}`;

interface Product {
    id: string;
    brand: string;
    model: string;
    price: number;
    comment: string;
    image: string;
    youtubeUrl: string;
    features: string[];
}

const standardProducts: Product[] = [
    {
        id: 'focal-ps165v1',
        brand: 'FOCAL',
        model: 'PS 165 V1',
        price: 99000,
        comment: '艶やかなボーカルと透明感のある高音。フランスの名門が生んだ傑作ユニット。',
        image: '/audio_speaker_high_end_focal_1777648200679.png',
        youtubeUrl: 'https://youtube.com/watch?v=example1',
        features: ['高音質', '純正位置取付可']
    },
    {
        id: 'kicker-kss6704',
        brand: 'KICKER',
        model: 'KSS6704',
        price: 88000,
        comment: 'パワフルな低音とキレのあるサウンド。ロックやPOPSを楽しく聴きたい方に最適。',
        image: '/audio_speaker_kicker_style_1777648219037.png',
        youtubeUrl: 'https://youtube.com/watch?v=example2',
        features: ['パワフル低音', '加工取付推奨']
    },
    {
        id: 'morel-maximo-ultra',
        brand: 'MOREL',
        model: 'MAXIMO ULTRA 602',
        price: 93500,
        comment: '温かみのある自然な音色。女性ボーカルやクラシックを優雅に楽しめます。',
        image: '/images/Audio/speaker_default.webp',
        youtubeUrl: 'https://youtube.com/watch?v=example3',
        features: ['ナチュラル', 'ハイコスパ']
    }
];

const StandardPackageDetail: React.FC = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<'lp' | 'catalog'>('lp');

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = view === 'lp' ? "スタンダードパッケージ詳細 | Sound ANG" : "スタンダードライン 取扱いラインナップ | Sound ANG";
    }, [view]);

    const handleBack = () => {
        if (view === 'catalog') {
            setView('lp');
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 print:hidden">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <button 
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black tracking-widest uppercase">Back</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                            <span className="font-black italic">S</span>
                        </div>
                        <span className="font-black tracking-tighter text-xl">Sound ANG</span>
                    </div>

                    <button 
                        onClick={() => window.print()}
                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-all font-bold text-xs"
                    >
                        <Printer className="w-4 h-4" />
                        A4印刷用出力
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {view === 'lp' ? (
                    <motion.div
                        key="lp"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="pt-20"
                    >
                        {/* 1. Hero Header */}
                        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
                            <div className="absolute inset-0 z-0">
                                <SafeImage 
                                    src="/audio_standard_package_hero_1777648073560.png" 
                                    className="w-full h-full object-cover"
                                    alt="Hero Background"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                            </div>

                            <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                                <motion.div 
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="max-w-2xl"
                                >
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full mb-6 text-[10px] font-black tracking-widest uppercase">
                                        Standard Package Plan
                                    </div>
                                    <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tighter">
                                        いつものドライブが、<br />
                                        <span className="text-blue-600">最高のリスニングルーム</span>へ。
                                    </h1>
                                    <p className="text-lg md:text-xl font-bold text-gray-600 mb-10 leading-relaxed">
                                        10万円以内で叶える、プロのスピーカー交換パッケージ。<br />
                                        ただのパーツ交換ではない、「音作り」をあなたに。
                                    </p>
                                    <button 
                                        onClick={() => setView('catalog')}
                                        className="group flex items-center gap-4 bg-gray-900 text-white px-10 py-6 rounded-2xl font-black text-sm tracking-widest shadow-2xl shadow-gray-900/20 hover:scale-105 transition-all"
                                    >
                                        選べるスピーカー一覧はこちら
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            </div>
                        </section>

                        {/* 2. Concept Section */}
                        <section className="py-24 bg-gray-50">
                            <div className="max-w-7xl mx-auto px-4">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">なぜ「パッケージ」がお得で安心なのか？</h2>
                                    <p className="text-gray-500 font-bold">専門店だからできる、トータルバランスの追求</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
                                        <div className="space-y-8">
                                            <div className="flex gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                                                    <Zap className="w-8 h-8 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black mb-2">総額13万円相当の施工が10万円以内</h3>
                                                    <p className="text-gray-500 font-bold text-sm leading-relaxed">単品でご依頼いただくよりも約3万円以上お得。必要な施工が全て含まれています。</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black mb-2">プロが厳選した組み合わせ</h3>
                                                    <p className="text-gray-500 font-bold text-sm leading-relaxed">スピーカーのポテンシャルを最大限に引き出すパーツと施工をセットにしました。</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="bg-blue-600 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                            <h4 className="text-sm font-black tracking-widest uppercase mb-4 opacity-80">Professional View</h4>
                                            <p className="text-2xl font-black leading-tight mb-8">
                                                「スピーカーだけを変えても、車の音は半分しか改善されません。」
                                            </p>
                                            <p className="text-sm font-bold opacity-90 leading-relaxed mb-8">
                                                車のドアは本来「鉄板の箱」であり、音を出すのに適した環境ではありません。
                                                当パッケージでは、デッドニングや専用バッフル施工を標準化することで、初めて「本来の音」を奏でることが可能になります。
                                            </p>
                                            <div className="flex items-center gap-2 font-black text-xl">
                                                <span className="text-blue-200">TOTAL SOLUTION</span>
                                                <ArrowRight className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. 4 Base Services */}
                        <section className="py-24">
                            <div className="max-w-7xl mx-auto px-4">
                                <div className="text-center mb-20">
                                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">パッケージに含まれる4つの基本施工</h2>
                                    <p className="text-gray-500 font-bold">一切の妥協なし。サウンドエナジーが誇る標準品質。</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        { title: "スピーカー本体", desc: "国内外のブランドから、予算内で最も音質の良いユニットをプロが厳選。", icon: Music, color: "bg-blue-50 text-blue-600" },
                                        { title: "ドアチューニングBコース", desc: "制振材を使用し、ドアを「スピーカーボックス」として最適化。低音の締まりが劇的に変わります。", icon: Layers, color: "bg-purple-50 text-purple-600" },
                                        { title: "カスタムインナーバッフル", desc: "車種に合わせて1台ずつワンオフ製作。スピーカーを強固に固定し、不要な共振を排除します。", icon: ShieldCheck, color: "bg-emerald-50 text-emerald-600" },
                                        { title: "プロの取付・調整", desc: "位相チェックからイコライジングまで、熟練のインストーラーが責任を持って仕上げます。", icon: Wrench, color: "bg-amber-50 text-amber-600" }
                                    ].map((item, i) => (
                                        <div key={i} className="p-10 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-xl transition-all group">
                                            <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                                <item.icon className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-4">{item.title}</h3>
                                            <p className="text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* 4. Options */}
                        <section className="py-24 bg-gray-900 text-white rounded-[4rem] mx-4 my-24 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full"></div>
                            <div className="max-w-7xl mx-auto px-12 relative z-10">
                                <div className="max-w-2xl">
                                    <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-tighter">さらにこだわる方へ（オプション）</h2>
                                    <div className="space-y-6">
                                        {[
                                            { name: "デッドニングAコースへアップグレード", price: "+¥11,000〜" },
                                            { name: "ツィーターAピラー埋め込み加工", price: "+¥44,000〜" },
                                            { name: "メタルインナーバッフルへの変更", price: "+¥13,200〜" },
                                            { name: "スピーカーケーブル引き直し", price: "+¥22,000〜" }
                                        ].map((opt, i) => (
                                            <div key={i} className="flex items-center justify-between py-6 border-b border-white/10 group cursor-pointer">
                                                <span className="text-lg font-bold group-hover:text-blue-400 transition-colors">{opt.name}</span>
                                                <span className="text-xl font-black text-blue-500 tracking-tighter">{opt.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 5. Flow */}
                        <section className="py-24">
                            <div className="max-w-7xl mx-auto px-4">
                                <div className="text-center mb-20">
                                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">施工完了までのステップ</h2>
                                    <p className="text-gray-500 font-bold">1日でお車が見違える空間に変わります。</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                    {[
                                        { step: "01", title: "ご相談・試聴", desc: "店内のデモボードで実際に音を聴き比べていただけます。" },
                                        { step: "02", title: "お見積り・予約", desc: "車種に合わせた詳細なお見積りを作成し、施工日を決定。" },
                                        { step: "03", title: "お預かり・施工", desc: "朝のお預かりで、夕方には完成。代車も無料です。" },
                                        { step: "04", title: "納車", desc: "お客様の好みに合わせた最終セッティングを行い、納車いたします。" }
                                    ].map((step, i) => (
                                        <div key={i} className="relative p-8 bg-gray-50 rounded-3xl">
                                            <span className="text-5xl font-black text-blue-600/10 absolute top-4 right-6">{step.step}</span>
                                            <h3 className="text-xl font-black text-gray-900 mb-4 relative z-10">{step.title}</h3>
                                            <p className="text-gray-500 font-bold text-sm leading-relaxed relative z-10">{step.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* 6. Footer CTA */}
                        <section className="py-32 bg-blue-600 text-white text-center">
                            <div className="max-w-4xl mx-auto px-4">
                                <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter leading-tight">
                                    さあ、あなたにぴったりの<br />スピーカーを見つけましょう。
                                </h2>
                                <button 
                                    onClick={() => setView('catalog')}
                                    className="bg-white text-blue-600 px-12 py-8 rounded-[2rem] font-black text-lg tracking-widest shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-4"
                                >
                                    取扱いラインナップを見る
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </section>
                    </motion.div>
                ) : (
                    <motion.div
                        key="catalog"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="pt-20 pb-24"
                    >
                        {/* 1. Catalog Hero */}
                        <section className="py-20 bg-gray-900 text-white overflow-hidden relative print:hidden">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/30 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="max-w-7xl mx-auto px-4 relative z-10">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                    <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
                                        STANDARD LINE<br />
                                        <span className="text-blue-500">LINEUP</span>
                                    </h1>
                                    <p className="text-gray-400 font-bold text-lg max-w-xl">
                                        厳選されたブランドと、プロが推奨する銘機たち。
                                        あなたの感性に響く一台をお選びください。
                                    </p>
                                </motion.div>
                            </div>
                        </section>

                        {/* Print Only Header */}
                        <div className="hidden print:block mb-8 text-center">
                            <h1 className="text-3xl font-black">STANDARD LINE 取扱いラインナップ</h1>
                            <p className="text-gray-500">Sound ANG / サウンドエナジー おすすめのスピーカー交換パッケージ</p>
                            <div className="mt-4 border-b-2 border-gray-900 w-full"></div>
                        </div>

                        {/* 2. Filter (Placeholder) */}
                        <div className="max-w-7xl mx-auto px-4 mt-12 mb-16 print:hidden">
                            <div className="flex flex-wrap gap-4 items-center">
                                <span className="text-xs font-black tracking-widest uppercase text-gray-400">Filter By:</span>
                                {['ALL', 'FOCAL', 'KICKER', 'MOREL', 'BLAM'].map((brand) => (
                                    <button 
                                        key={brand}
                                        className={`px-6 py-3 rounded-xl font-bold text-xs tracking-widest transition-all ${
                                            brand === 'ALL' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                        }`}
                                    >
                                        {brand}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Product List */}
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 print:grid-cols-2">
                                {standardProducts.map((product) => (
                                    <motion.div 
                                        key={product.id}
                                        whileHover={{ y: -5 }}
                                        className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group print:shadow-none print:border-gray-200 print:rounded-2xl"
                                    >
                                        {/* Product Image */}
                                        <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                                            <SafeImage 
                                                src={product.image}
                                                alt={product.model}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                                                {product.features.map(f => (
                                                    <span key={f} className="px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-full text-[9px] font-black text-gray-900 uppercase">
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-8">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">{product.brand}</span>
                                                <span className="text-xs font-bold text-gray-400 print:hidden">¥{product.price.toLocaleString()}〜</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight leading-none">{product.model}</h3>
                                            
                                            <div className="p-4 bg-gray-50 rounded-2xl mb-8 print:bg-transparent print:p-0">
                                                <p className="text-xs text-gray-500 font-bold leading-relaxed italic">
                                                    「{product.comment}」
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Package Total</span>
                                                    <span className="text-2xl font-black text-gray-900 tracking-tighter">
                                                        ¥{product.price.toLocaleString()}
                                                        <span className="text-[10px] ml-1 opacity-40">税込</span>
                                                    </span>
                                                </div>

                                                {/* Print Only QR Code */}
                                                <div className="hidden print:block text-right">
                                                    <img src={getQRCodeUrl(product.youtubeUrl)} alt="QR Code" className="w-16 h-16" />
                                                    <span className="text-[8px] font-bold block mt-1">動画で試聴</span>
                                                </div>

                                                {/* Web Only Buttons */}
                                                <div className="flex gap-2 print:hidden">
                                                    <a 
                                                        href={product.youtubeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                        title="YouTubeで試聴"
                                                    >
                                                        <Youtube className="w-5 h-5" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Print Only Footer */}
                        <div className="hidden print:block mt-12 text-center border-t pt-8">
                            <p className="text-xs font-bold">お問い合わせはSound ANGまでお気軽にどうぞ。 【LINE ID: @312qjhsq】</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Contact - Web Only */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 print:hidden">
                <div className="bg-gray-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-6 backdrop-blur-xl bg-opacity-95 border border-white/10">
                    <button 
                        onClick={() => navigate('/reservation')}
                        className="flex items-center gap-2 hover:text-blue-400 transition-colors font-black text-xs tracking-widest"
                    >
                        <CalendarIcon className="w-4 h-4" />
                        来店予約
                    </button>
                    <div className="w-px h-4 bg-white/20"></div>
                    <a 
                        href="https://page.line.me/312qjhsq?openQrModal=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#06C755] hover:text-[#05b34c] transition-colors font-black text-xs tracking-widest"
                    >
                        <MessageSquare className="w-4 h-4" />
                        LINE相談
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StandardPackageDetail;
