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
    Volume2
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
    depth?: string;
    mount?: string;
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
        depth: '65.5mm',
        mount: '付属'
    },
    {
        id: 'kicker-kss6704',
        brand: 'KICKER',
        model: 'KSS6704',
        price: 81840,
        comment: 'パワフルな低音とキレのあるサウンド。ロックやPOPSを楽しく聴きたい方に最適。',
        image: '/audio_speaker_kicker_style_1777648219037.png',
        youtubeUrl: 'https://youtube.com/watch?v=example2',
        depth: '44.5mm',
        mount: '付属'
    },
    {
        id: 'morel-maximo-ultra',
        brand: 'MOREL',
        model: 'MAXIMO ULTRA 602',
        price: 93500,
        comment: '温かみのある自然な音色。女性ボーカルやクラシックを優雅に楽しめます。',
        image: '/images/Audio/speaker_default.webp',
        youtubeUrl: 'https://youtube.com/watch?v=example3',
        depth: '63mm',
        mount: '別売可'
    },
    {
        id: 'blam-relax',
        brand: 'BLAM',
        model: '165 R2S',
        price: 85800,
        comment: 'フレンチサウンドの伝統を継承。繊細かつダイナミックな表現力が魅力。',
        image: '/images/Audio/speaker_default.webp',
        youtubeUrl: 'https://youtube.com/watch?v=example4',
        depth: '62.4mm',
        mount: '付属'
    },
    {
        id: 'ground-zero-iridium',
        brand: 'GROUND ZERO',
        model: 'GZIC 165.2',
        price: 82500,
        comment: '重厚な低域と伸びやかな高域。ジャーマンエンジニアリングの真髄。',
        image: '/images/Audio/speaker_default.webp',
        youtubeUrl: 'https://youtube.com/watch?v=example5',
        depth: '63mm',
        mount: '付属'
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
        <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
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

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => window.print()}
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-black text-[10px] tracking-widest uppercase shadow-lg shadow-blue-200"
                        >
                            <Printer className="w-4 h-4" />
                            A4印刷用出力
                        </button>
                    </div>
                </div>
            </header>

            <div className="pt-20">
                {/* 1. LP Section (Page 1) */}
                <div className={`${view === 'lp' ? 'block' : 'hidden'} print:block print:pt-0`}>
                    {/* Hero */}
                    <section className="relative min-h-[60vh] flex items-center overflow-hidden print:min-h-0 print:py-4">
                        <div className="absolute inset-0 z-0 print:hidden">
                            <SafeImage 
                                src="/audio_standard_package_hero_1777648073560.png" 
                                className="w-full h-full object-cover opacity-60"
                                alt="Hero Background"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full mb-4 text-[10px] font-black tracking-widest uppercase print:bg-black print:mb-2">
                                    STANDARD LINE PACKAGE
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tighter print:text-3xl print:mb-2">
                                    音質アップの第一歩は<br />
                                    <span className="text-blue-600 print:text-black">スピーカー交換</span>から！
                                </h1>
                                <p className="text-lg font-bold text-gray-600 mb-8 leading-relaxed print:text-[11px] print:mb-4">
                                    ドアチューニング、専用バッフル、高品質ケーブルがセット。<br />
                                    10万円までのユニットから選べる、こだわりのパッケージ。
                                </p>
                                <button 
                                    onClick={() => setView('catalog')}
                                    className="group flex items-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest shadow-2xl hover:scale-105 transition-all print:hidden"
                                >
                                    取扱いラインナップを見る
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Price & Concept Compact */}
                    <section className="py-12 bg-gray-900 text-white print:bg-white print:text-gray-900 print:py-4">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 print:bg-gray-50 print:p-4 print:rounded-xl print:border-gray-200">
                                    <p className="text-sm font-bold text-gray-400 mb-2 print:text-[9px] print:mb-1">単品合計 ¥117,700 のところ</p>
                                    <div className="flex items-baseline gap-2 mb-4 print:mb-1">
                                        <span className="text-5xl md:text-7xl font-black text-blue-500 tracking-tighter print:text-3xl">¥81,840</span>
                                        <span className="text-lg font-bold print:text-[10px]">〜 (税込)</span>
                                    </div>
                                    <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl font-black text-sm print:bg-black print:text-[10px] print:px-3 print:py-1">
                                        ¥35,860 もオトク！
                                    </div>
                                </div>
                                <div className="print:hidden">
                                    <h3 className="text-xl font-black mb-4">なぜ「パッケージ」なのか？</h3>
                                    <p className="text-gray-400 text-sm font-bold leading-relaxed">
                                        スピーカーだけを変えても、音は半分しか改善されません。
                                        ドアを「鉄板の箱」から「理想のBOX」へと変える施工を標準化することで、本来のポテンシャルを引き出します。
                                    </p>
                                </div>
                                <div className="hidden print:block">
                                    <p className="text-[10px] font-bold leading-tight">
                                        スピーカー、ドアチューニングBコース、カスタムバッフル、高品質ケーブル、取付工賃が全てコミコミ。専門店ならではのトータルサウンド提案です。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4 Base Services Horizontal in Print */}
                    <section className="py-16 print:py-4">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-8 tracking-tighter print:text-lg print:mb-4">こだわりの標準施工内容</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 print:gap-2">
                                {[
                                    { title: "ドアチューニングB", img: "/.tempmediaStorage/input_file_0.png" },
                                    { title: "カスタムバッフル", img: "/.tempmediaStorage/input_file_1.png" },
                                    { title: "高品質ケーブル", img: "/.tempmediaStorage/input_file_2.png" },
                                    { title: "熟練のワイヤリング", img: "/.tempmediaStorage/input_file_3.png" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-3 print:gap-1">
                                        <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100 print:rounded-lg">
                                            <SafeImage src={item.img} className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-black text-xs print:text-[8px] text-center">{item.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Options (Upgrade) - MOVED HERE TO FIT ON PAGE 1 */}
                    <section className="py-12 bg-blue-50 print:bg-white print:py-4">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-2xl font-black mb-8 flex items-center gap-3 print:text-lg print:mb-2">
                                <Volume2 className="text-blue-600" />
                                オトクなアップグレード・オプション
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-4">
                                <div className="bg-white p-8 rounded-3xl border border-blue-100 print:p-4 print:rounded-xl">
                                    <h3 className="font-black text-sm text-blue-600 mb-4 print:mb-1 print:text-[10px]">ドアチューニング・アップグレード</h3>
                                    <div className="space-y-2">
                                        {[
                                            { name: "B → Aコース", price: "+¥11,000", desc: "制振材増量 & 背圧処理DS-1.5WP" },
                                            { name: "B → A+コース", price: "+¥22,000", desc: "制振材増量 & 背圧処理フェリソニC2" },
                                            { name: "B → Sコース", price: "+¥33,000", desc: "最高峰マテリアル & 吸音・遮音複合" }
                                        ].map((opt, i) => (
                                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 print:py-1">
                                                <div>
                                                    <p className="font-black text-xs print:text-[8px]">{opt.name}</p>
                                                    <p className="text-[10px] text-gray-400 print:text-[7px]">{opt.desc}</p>
                                                </div>
                                                <span className="font-black text-blue-600 text-xs print:text-[8px]">{opt.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4 print:space-y-2">
                                    <div className="bg-emerald-50 p-6 rounded-3xl print:p-3 print:rounded-xl">
                                        <h3 className="font-black text-sm text-emerald-700 mb-1 print:text-[9px]">メタルバッフルへの変更</h3>
                                        <p className="text-xs font-bold text-gray-600 print:text-[7px]">同時施工で<span className="font-black">定価より20%OFF</span></p>
                                    </div>
                                    <div className="bg-amber-50 p-6 rounded-3xl print:p-3 print:rounded-xl">
                                        <h3 className="font-black text-sm text-amber-700 mb-1 print:text-[9px]">ツィーター埋め込み加工</h3>
                                        <p className="text-xs font-bold text-gray-600 print:text-[7px]">Aピラー埋め込み ¥46,200〜</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cautions Compact */}
                    <section className="py-12 print:py-4 print:break-after-page">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-4">
                                <div className="text-[11px] font-bold text-gray-500 space-y-1 print:text-[7px]">
                                    <p>注) バッフル適合が無い車種では別途製作費 ¥5,500が必要です。</p>
                                    <p>注) ツィーター固定にマウントが必要な車種は別途追加が必要です。</p>
                                    <p>注) 特殊なドア通線加工が必要な車両は別途費用がかかります。</p>
                                </div>
                                <div className="flex items-center gap-6 print:gap-2 justify-end">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-600 print:w-3 print:h-3" />
                                        <span className="text-xs font-black print:text-[7px]">作業は1日お預かり</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Car className="w-4 h-4 text-blue-600 print:w-3 print:h-3" />
                                        <span className="text-xs font-black print:text-[7px]">無料代車あり</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 2. Catalog Section (Page 2) */}
                <div className={`${view === 'catalog' ? 'block' : 'hidden'} print:block print:pt-4`}>
                    <div className="hidden print:block mb-6 text-center">
                        <h1 className="text-2xl font-black">STANDARD LINE 取扱いラインナップ</h1>
                        <p className="text-gray-500 text-[10px]">スピーカー・取り付け・消費税込みのパッケージ価格です</p>
                        <div className="mt-2 border-b-2 border-gray-900 w-full"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 mt-8 print:mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2 print:gap-3">
                            {standardProducts.map((product) => (
                                <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm print:border-gray-200">
                                    <div className="aspect-[16/10] relative overflow-hidden bg-gray-50 print:aspect-[16/9]">
                                        <SafeImage src={product.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6 print:p-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[9px] font-black text-blue-600 uppercase print:text-[7px]">{product.brand}</span>
                                            <span className="text-xl font-black text-gray-900 print:text-sm">¥{product.price.toLocaleString()}〜</span>
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 mb-2 print:text-[10px] print:mb-0">{product.model}</h3>
                                        <p className="text-[10px] text-gray-500 font-bold leading-tight mb-4 print:mb-1 italic">「{product.comment}」</p>
                                        
                                        <div className="flex items-center justify-between border-t border-gray-50 pt-4 print:pt-1">
                                            <div className="hidden print:flex items-center gap-1">
                                                <img src={getQRCodeUrl(product.youtubeUrl)} alt="QR" className="w-8 h-8" />
                                                <span className="text-[6px] font-black leading-none">YouTubeで試聴</span>
                                            </div>
                                            <a href={product.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-red-600 font-black text-[10px] hover:text-red-700 transition-colors print:hidden">
                                                <Youtube className="w-4 h-4" /> 試聴動画
                                            </a>
                                            <button onClick={() => navigate('/reservation')} className="bg-gray-900 text-white px-4 py-2 rounded-lg font-black text-[9px] uppercase hover:bg-blue-600 transition-all print:hidden">
                                                相談する
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden print:block mt-6 text-center border-t pt-4">
                        <p className="text-[8px] font-black italic">Sound ANG | サウンドエナジー | 〒594-0081 大阪府和泉市葛の葉町3丁目3-50 | https://sound-ang.com</p>
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
