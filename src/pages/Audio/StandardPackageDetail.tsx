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

            <div className="pt-20">
                {/* 1. LP Section (Page 1 in Print) */}
                <div className={`${view === 'lp' ? 'block' : 'hidden'} print:block print:pt-0`}>
                    <section className="relative min-h-[85vh] flex items-center overflow-hidden print:min-h-0 print:py-8">
                        <div className="absolute inset-0 z-0 print:hidden">
                            <SafeImage 
                                src="/audio_standard_package_hero_1777648073560.png" 
                                className="w-full h-full object-cover"
                                alt="Hero Background"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full mb-6 text-[10px] font-black tracking-widest uppercase print:bg-black">
                                    Standard Package Plan
                                </div>
                                <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tighter print:text-4xl print:mb-4">
                                    いつものドライブが、<br />
                                    <span className="text-blue-600 print:text-black">最高のリスニングルーム</span>へ。
                                </h1>
                                <p className="text-lg md:text-xl font-bold text-gray-600 mb-10 leading-relaxed print:text-sm print:mb-6">
                                    10万円以内で叶える、プロのスピーカー交換パッケージ。<br />
                                    ただのパーツ交換ではない、「音作り」をあなたに。
                                </p>
                                <button 
                                    onClick={() => setView('catalog')}
                                    className="group flex items-center gap-4 bg-gray-900 text-white px-10 py-6 rounded-2xl font-black text-sm tracking-widest shadow-2xl shadow-gray-900/20 hover:scale-105 transition-all print:hidden"
                                >
                                    選べるスピーカー一覧はこちら
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="py-24 bg-gray-50 print:bg-white print:py-8">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-12 tracking-tighter print:text-2xl print:mb-6">なぜ「パッケージ」がお得で安心なのか？</h2>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center print:grid-cols-2 print:gap-8">
                                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 print:shadow-none print:p-6 print:rounded-2xl print:border-gray-200">
                                    <div className="space-y-8 print:space-y-4">
                                        <div className="flex gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 print:w-10 print:h-10">
                                                <Zap className="w-8 h-8 text-blue-600 print:w-5 print:h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black mb-2 print:text-lg">総額13万円相当が10万円以内</h3>
                                                <p className="text-gray-500 font-bold text-sm print:text-xs leading-tight">単品依頼より約3万円以上お得。必要な施工が全て含まれています。</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 print:w-10 print:h-10">
                                                <CheckCircle2 className="w-8 h-8 text-emerald-600 print:w-5 print:h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black mb-2 print:text-lg">プロが厳選した組み合わせ</h3>
                                                <p className="text-gray-500 font-bold text-sm print:text-xs leading-tight">スピーカーの力を最大限に引き出すパーツと施工をセットにしました。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-600 text-white p-12 rounded-[3rem] print:bg-gray-100 print:text-gray-900 print:p-6 print:rounded-2xl print:shadow-none">
                                    <p className="text-2xl font-black leading-tight mb-6 print:text-lg print:mb-2 text-white print:text-gray-900">
                                        「スピーカーだけを変えても、音は半分しか改善されません。」
                                    </p>
                                    <p className="text-sm font-bold opacity-90 leading-relaxed print:text-xs text-white/90 print:text-gray-600">
                                        当パッケージでは、デッドニングや専用バッフル施工を標準化することで、初めて「本来の音」を奏でることが可能になります。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-24 print:py-8 print:break-after-page">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-12 tracking-tighter print:text-2xl print:mb-6">パッケージに含まれる4つの基本施工</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-4">
                                {[
                                    { title: "スピーカー本体", desc: "予算内で最高のユニットをプロが厳選。", icon: Music },
                                    { title: "ドアチューニングBコース", desc: "制振材でドアをスピーカーボックスとして最適化。", icon: Layers },
                                    { title: "カスタムインナーバッフル", desc: "車種に合わせて1台ずつワンオフ製作。", icon: ShieldCheck },
                                    { title: "プロの取付・調整", desc: "熟練のインストーラーが責任を持って仕上げます。", icon: Wrench }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2rem] flex items-start gap-6 print:p-4 print:rounded-xl print:border-gray-200">
                                        <item.icon className="w-8 h-8 text-blue-600 shrink-0 print:w-6 print:h-6" />
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 mb-1 print:text-sm">{item.title}</h3>
                                            <p className="text-gray-500 font-bold text-sm leading-tight print:text-[10px]">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* 2. Catalog Section (Page 2 in Print) */}
                <div className={`${view === 'catalog' ? 'block' : 'hidden'} print:block print:pt-8`}>
                    <section className="py-20 bg-gray-900 text-white overflow-hidden relative print:hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/30 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="max-w-7xl mx-auto px-4 relative z-10">
                            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
                                STANDARD LINE<br />
                                <span className="text-blue-500">LINEUP</span>
                            </h1>
                        </div>
                    </section>

                    <div className="hidden print:block mb-8 text-center">
                        <h1 className="text-3xl font-black">STANDARD LINE 取扱いラインナップ</h1>
                        <p className="text-gray-500 text-sm">Sound ANG / サウンドエナジー おすすめのスピーカー交換パッケージ</p>
                        <div className="mt-4 border-b-2 border-gray-900 w-full"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 print:grid-cols-2 print:gap-4">
                            {standardProducts.map((product) => (
                                <div 
                                    key={product.id}
                                    className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm transition-all group print:shadow-none print:border-gray-200 print:rounded-2xl"
                                >
                                    <div className="aspect-[16/10] relative overflow-hidden bg-gray-50 print:aspect-[16/9]">
                                        <SafeImage 
                                            src={product.image}
                                            alt={product.model}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="p-8 print:p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase print:text-[8px]">{product.brand}</span>
                                            <span className="text-2xl font-black text-gray-900 tracking-tighter print:text-xl">
                                                ¥{product.price.toLocaleString()}
                                                <span className="text-[10px] ml-1 opacity-40">税込</span>
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight print:text-lg print:mb-2">{product.model}</h3>
                                        
                                        <div className="p-4 bg-gray-50 rounded-2xl mb-6 print:bg-transparent print:p-0 print:mb-2">
                                            <p className="text-xs text-gray-500 font-bold leading-tight print:text-[10px]">
                                                「{product.comment}」
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between print:mt-2">
                                            <div className="hidden print:flex items-center gap-3">
                                                <img src={getQRCodeUrl(product.youtubeUrl)} alt="QR Code" className="w-12 h-12" />
                                                <span className="text-[8px] font-bold leading-tight">動画で試聴する<br />(QRをスキャン)</span>
                                            </div>

                                            <div className="flex gap-2 print:hidden">
                                                <a 
                                                    href={product.youtubeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                >
                                                    <Youtube className="w-5 h-5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden print:block mt-8 text-center border-t pt-4">
                        <p className="text-[10px] font-bold italic">Sound ANG | サウンドエナジー 【LINE ID: @312qjhsq】 | https://sound-ang.com</p>
                    </div>
                </div>
            </div>

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
