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
    ArrowRight,
    Info,
    Car,
    Clock,
    Volume2,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

// QR Code utility using Google Charts API
const getQRCodeUrl = (url: string) => `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(url)}`;

// Plan categories for navigation
const planCategories = [
    { id: 'basic', label: 'BASIC LINE', path: '/audio/plan/basic-coaxial', active: false },
    { id: 'standard', label: 'STANDARD LINE', path: '/audio/plan/standard-line', active: true },
    { id: 'premium', label: 'PREMIUM LINE', path: '/audio/plan/premium-line', active: false },
    { id: 'high-end', label: 'HIGH-END LINE', path: '/audio/plan/front-3way', active: false }
];

interface Product {
    id: string;
    brand: string;
    model: string;
    price: number;
    comment: string;
    image: string;
    youtubeUrl: string;
    depth?: string;
    mount?: string;
}

const standardProducts: Product[] = [
    { id: 'focal-ps165v1', brand: 'FOCAL', model: 'PS 165 V1', price: 99000, comment: '艶やかなボーカルと透明感のある高音。フランスの名門が生んだ傑作ユニット。', image: '/audio_speaker_high_end_focal_1777648200679.png', youtubeUrl: 'https://youtube.com/watch?v=focal', depth: '65.5mm', mount: '付属' },
    { id: 'kicker-kss6704', brand: 'KICKER', model: 'KSS6704', price: 81840, comment: 'パワフルな低音とキレのあるサウンド。ロックやPOPSを楽しく聴きたい方に。', image: '/audio_speaker_kicker_style_1777648219037.png', youtubeUrl: 'https://youtube.com/watch?v=kicker', depth: '44.5mm', mount: '付属' },
    { id: 'morel-maximo', brand: 'MOREL', model: 'MAXIMO ULTRA 602', price: 93500, comment: '温かみのある自然な音色。女性ボーカルやクラシックを優雅に楽しめます。', image: '/images/Audio/speaker_default.webp', youtubeUrl: 'https://youtube.com/watch?v=morel', depth: '63mm', mount: '別売可' },
    { id: 'blam-relax', brand: 'BLAM', model: '165 R2S', price: 85800, comment: 'フレンチサウンドの伝統を継承。繊細かつダイナミックな表現力が魅力。', image: '/images/Audio/speaker_default.webp', youtubeUrl: 'https://youtube.com/watch?v=blam', depth: '62.4mm', mount: '付属' },
    { id: 'ground-zero', brand: 'GROUND ZERO', model: 'GZIC 165.2', price: 82500, comment: '重厚な低域と伸びやかな高域。ジャーマンエンジニアリングの真髄。', image: '/images/Audio/speaker_default.webp', youtubeUrl: 'https://youtube.com/watch?v=gz', depth: '63mm', mount: '付属' }
];

const StandardPackageDetail: React.FC = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<'lp' | 'catalog'>('lp');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "STANDARD LINE | スピーカー交換パッケージ | Sound ANG";
    }, [view]);

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 print:hidden">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all group">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-xs font-black tracking-widest uppercase">Back</span>
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-black italic">S</div>
                        <span className="font-black tracking-tighter text-xl">Sound ANG</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all font-black text-[10px] tracking-widest uppercase border border-gray-100"
                        >
                            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                            PLAN MENU
                        </button>
                        <button onClick={() => window.print()} className="hidden md:flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl font-black text-[10px] tracking-widest uppercase shadow-lg shadow-blue-200">
                            <Printer className="w-4 h-4" /> 印刷
                        </button>
                    </div>
                </div>

                {/* Sub-Navigation for Plans */}
                <div className="bg-white border-b border-gray-100 overflow-x-auto">
                    <div className="max-w-7xl mx-auto px-4 flex">
                        {planCategories.map((plan) => (
                            <button
                                key={plan.id}
                                onClick={() => navigate(plan.path)}
                                className={`px-6 py-3 text-[10px] font-black tracking-widest uppercase whitespace-nowrap border-b-2 transition-all ${
                                    plan.active 
                                    ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
                                    : 'border-transparent text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                {plan.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Mega Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        />
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                            className="fixed top-32 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl bg-white rounded-[2.5rem] shadow-2xl z-50 border border-gray-100 p-8 overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <h4 className="text-[10px] font-black text-blue-600 tracking-widest uppercase mb-4 border-b pb-2">Entry Plans</h4>
                                    <div className="space-y-3">
                                        <button onClick={() => navigate('/audio/plan/basic-coaxial')} className="block text-sm font-bold hover:text-blue-600 transition-all">BASIC LINE (Coaxial)</button>
                                        <button onClick={() => navigate('/audio/plan/basic-separate')} className="block text-sm font-bold hover:text-blue-600 transition-all">BASIC LINE (Separate)</button>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-blue-600 tracking-widest uppercase mb-4 border-b pb-2">Core Packages</h4>
                                    <div className="space-y-3">
                                        <button onClick={() => navigate('/audio/plan/standard-line')} className="block text-sm font-black text-blue-600">STANDARD LINE (Best Value)</button>
                                        <button onClick={() => navigate('/audio/plan/premium-line')} className="block text-sm font-bold hover:text-blue-600 transition-all">PREMIUM LINE</button>
                                        <button onClick={() => navigate('/audio/plan/front-3way')} className="block text-sm font-bold hover:text-blue-600 transition-all">Front 3-Way Special</button>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-blue-600 tracking-widest uppercase mb-4 border-b pb-2">Vehicle Specific</h4>
                                    <div className="space-y-3">
                                        <button onClick={() => navigate('/audio/plan/bmw-package')} className="block text-sm font-bold hover:text-blue-600 transition-all">BMW Package</button>
                                        <button onClick={() => navigate('/audio/plan/mercedes-package')} className="block text-sm font-bold hover:text-blue-600 transition-all">Mercedes Benz Package</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="pt-32">
                {/* 1. LP Section */}
                <div className={`${view === 'lp' ? 'block' : 'hidden'} print:block print:pt-0`}>
                    <section className="relative min-h-[40vh] flex items-center print:min-h-0 print:py-4 print:border-b-4 print:border-gray-900">
                        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                            <span className="inline-block text-blue-600 font-black tracking-[0.3em] text-[10px] mb-2 uppercase">Core Plan</span>
                            <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-4 tracking-tighter leading-none print:text-3xl">
                                STANDARD LINE<br />
                                <span className="text-gray-400">PACKAGE PLAN</span>
                            </h1>
                            <p className="text-lg font-bold text-gray-500 print:text-[11px]">専門店が提案する、音質向上の最短ルート。すべてが揃う「本物」のパッケージ。</p>
                        </div>
                    </section>

                    {/* Pricing Detail */}
                    <section className="py-12 bg-white print:py-2">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div className="space-y-2 print:space-y-0.5">
                                    <h2 className="text-xl font-black print:text-sm">パッケージ基本構成内容</h2>
                                    <div className="space-y-1">
                                        {[
                                            { label: "17cmモデル2WAYスピーカー", val: "最大10万円まで" },
                                            { label: "ドアチューニングBコース", val: "¥27,500相当" },
                                            { label: "カスタムインナーバッフル", val: "¥11,000相当" },
                                            { label: "ANGオリジナルケーブル(10m)", val: "¥16,500相当" },
                                            { label: "プロの取付・ワイヤリング・調整", val: "¥22,000相当" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between py-3 border-b border-gray-100 print:py-1 print:text-[9px]">
                                                <span className="font-bold text-gray-500">{item.label}</span>
                                                <span className="font-black">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gray-900 text-white p-10 rounded-[3rem] text-center print:bg-gray-100 print:text-gray-900 print:p-4 print:rounded-2xl">
                                    <p className="text-[10px] font-black tracking-widest uppercase opacity-40 mb-2">Standard Line Special Price</p>
                                    <div className="flex items-baseline justify-center gap-2 mb-2">
                                        <span className="text-6xl font-black text-blue-400 print:text-3xl tracking-tighter">¥81,840</span>
                                        <span className="text-xl font-bold print:text-[10px]">〜 (税込)</span>
                                    </div>
                                    <div className="inline-block bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xl mb-4 print:text-sm print:px-4 print:py-1">
                                        通常より ¥35,860 おトク！
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Services with Descriptions */}
                    <section className="py-16 bg-gray-50 print:bg-white print:py-4">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-2xl font-black mb-10 text-center print:text-sm print:mb-4">パッケージに含まれる標準施工の詳細</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-4 print:grid-cols-2">
                                {[
                                    { title: "ドアチューニングBコース", desc: "スピーカー本来の動きを助けるため、ドア内部の不要な共振を抑え、理想的なエンクロージャーへと作り込みます。", img: "/.tempmediaStorage/input_file_0.png" },
                                    { title: "カスタムインナーバッフル", desc: "車種専用設計で1台ずつ製作。スピーカーのエネルギーを逃さず、強固な土台を構築することでクリアな中低域を実現します。", img: "/.tempmediaStorage/input_file_1.png" },
                                    { title: "ANGオリジナル高品質ケーブル", desc: "オーディオテクニカ製特注。電気信号をロスなくスピーカーへ届け、解像度の高いサウンド再生に貢献します。", img: "/.tempmediaStorage/input_file_2.png" },
                                    { title: "プロによるワイヤリング・調整", desc: "配線1本の取り回しからこだわり、取付後はプロの耳で位相調整等を行い、最高のリスニング環境を整えます。", img: "/.tempmediaStorage/input_file_3.png" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 bg-white p-6 rounded-[2rem] border border-gray-100 print:p-2 print:rounded-xl print:gap-2">
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 print:w-16 print:h-16">
                                            <SafeImage src={item.img} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-lg mb-2 print:text-[10px] print:mb-0 leading-tight">{item.title}</h4>
                                            <p className="text-sm text-gray-500 font-bold leading-relaxed print:text-[8px] print:leading-tight">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Upgrades Page 1 */}
                    <section className="py-16 print:py-4 print:break-after-page">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-2xl font-black mb-8 flex items-center gap-3 print:text-lg print:mb-2">
                                <Volume2 className="text-blue-600" /> オトクなアップグレードオプション
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-4">
                                <div className="space-y-3">
                                    <p className="text-sm font-black text-blue-600 print:text-[9px]">■ ドアチューニング・グレードアップ</p>
                                    {[
                                        { name: "B → Aコース (+¥11,000)", desc: "制振材増量 & 背圧処理(フェリソニDS-1.5WP)使用" },
                                        { name: "B → A+コース (+¥22,000)", desc: "制振材増量 & 背圧処理(フェリソニC2)使用" },
                                        { name: "B → Sコース (+¥33,000)", desc: "最高峰マテリアル & 吸音・遮音複合の最新施工" }
                                    ].map((opt, i) => (
                                        <div key={i} className="p-4 bg-gray-50 rounded-2xl print:p-2 print:rounded-lg">
                                            <p className="font-black text-xs print:text-[8px] leading-none mb-1">{opt.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold print:text-[7px] leading-none">{opt.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <div className="p-6 bg-emerald-50 rounded-3xl print:p-3 print:rounded-xl">
                                        <h4 className="font-black text-sm text-emerald-700 mb-2 print:text-[9px] print:mb-1">メタルバッフルへの変更</h4>
                                        <p className="text-xs font-bold text-gray-600 leading-relaxed print:text-[8px] print:leading-tight">同時施工で定価より<span className="font-black">20%OFF</span>。よりタイトでキレのある再生へ。</p>
                                    </div>
                                    <div className="p-6 bg-amber-50 rounded-3xl print:p-3 print:rounded-xl">
                                        <h4 className="font-black text-sm text-amber-700 mb-2 print:text-[9px] print:mb-1">ツィーター埋め込み加工</h4>
                                        <p className="text-xs font-bold text-gray-600 leading-relaxed print:text-[8px] print:leading-tight">Aピラー埋め込み ¥46,200〜。反射を抑え、クリアで定位の良い音像を構築します。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 2. Catalog Section */}
                <div className={`${view === 'catalog' ? 'block' : 'hidden'} print:block print:pt-4`}>
                    <div className="hidden print:block mb-6 text-center">
                        <h1 className="text-2xl font-black">STANDARD LINE LINEUP</h1>
                        <p className="text-gray-500 text-[10px]">スピーカー・取り付け・消費税込みのパッケージ価格</p>
                        <div className="mt-2 border-b-2 border-gray-900 w-full"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 print:grid-cols-2 print:gap-3">
                            {standardProducts.map((product) => (
                                <div key={product.id} className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all print:border-gray-200 print:rounded-xl">
                                    <div className="aspect-[16/10] relative overflow-hidden bg-gray-50 print:h-24">
                                        <SafeImage src={product.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-8 print:p-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] font-black text-blue-600 uppercase print:text-[7px]">{product.brand}</span>
                                            <span className="text-2xl font-black print:text-sm">¥{product.price.toLocaleString()}〜</span>
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 mb-2 print:text-[10px] print:mb-0 leading-tight">{product.model}</h3>
                                        <p className="text-[11px] text-gray-400 font-bold italic mb-6 print:text-[8px] print:mb-1 leading-tight">「{product.comment}」</p>
                                        <div className="flex justify-between items-center border-t border-gray-50 pt-6 print:pt-1">
                                            <div className="hidden print:flex items-center gap-2">
                                                <img src={getQRCodeUrl(product.youtubeUrl)} alt="QR" className="w-9 h-9" />
                                                <span className="text-[7px] font-black leading-none text-gray-500">YouTubeで<br />試聴動画へ</span>
                                            </div>
                                            <a href={product.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-red-600 font-black text-xs hover:text-red-700 transition-colors print:hidden">
                                                <Youtube className="w-5 h-5" /> 試聴動画
                                            </a>
                                            <button onClick={() => navigate('/reservation')} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-blue-600 transition-all print:hidden">相談する</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden print:block mt-12 text-center border-t pt-8">
                        <p className="text-[10px] font-black italic text-gray-400">Sound ANG | サウンドエナジー | 大阪府和泉市葛の葉町3丁目3-50 | https://sound-ang.com</p>
                    </div>
                </div>
            </div>

            {/* Floating Contact */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 print:hidden">
                <div className="bg-gray-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-6 backdrop-blur-xl bg-opacity-95 border border-white/10">
                    <button onClick={() => navigate('/reservation')} className="flex items-center gap-2 hover:text-blue-400 transition-colors font-black text-xs tracking-widest">
                        <CalendarIcon className="w-4 h-4" /> 来店予約
                    </button>
                    <div className="w-px h-4 bg-white/20"></div>
                    <a href="https://page.line.me/312qjhsq?openQrModal=true" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#06C755] hover:text-[#05b34c] transition-colors font-black text-xs tracking-widest">
                        <MessageSquare className="w-4 h-4" /> LINE相談
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StandardPackageDetail;
