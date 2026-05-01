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
                    <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all group">
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
                    <button onClick={() => window.print()} className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-black text-[10px] tracking-widest uppercase">
                        <Printer className="w-4 h-4" /> A4印刷用出力
                    </button>
                </div>
            </header>

            <div className="pt-20">
                {/* 1. LP Section (Page 1 in Print) */}
                <div className={`${view === 'lp' ? 'block' : 'hidden'} print:block print:pt-0 print:max-h-[290mm] print:overflow-hidden`}>
                    <section className="relative min-h-[50vh] flex items-center print:min-h-0 print:py-2 print:border-b-2 print:border-gray-900 print:mb-2">
                        <div className="absolute inset-0 z-0 print:hidden">
                            <SafeImage src="/audio_standard_package_hero_1777648073560.png" className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 print:text-2xl print:mb-0">
                                音質アップの第一歩は<span className="text-blue-600 print:text-black">スピーカー交換</span>から！
                            </h1>
                            <p className="text-lg font-bold text-gray-600 print:text-[10px]">ドアチューニング、バッフル、ケーブルがセット。こだわりのパッケージ。</p>
                        </div>
                    </section>

                    <section className="py-8 bg-gray-900 text-white print:bg-white print:text-gray-900 print:py-2">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="flex flex-wrap items-center justify-between gap-4 print:gap-2">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 print:bg-gray-100 print:p-2 print:rounded-lg print:border-gray-200">
                                    <p className="text-xs font-bold text-gray-400 print:text-[7px]">単品合計 ¥117,700 のところ</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-blue-500 print:text-2xl">¥81,840</span>
                                        <span className="text-sm font-bold print:text-[8px]">〜 (税込)</span>
                                        <span className="hidden print:inline-block ml-4 bg-black text-white px-2 py-0.5 rounded text-[8px]">¥35,860 お得！</span>
                                    </div>
                                </div>
                                <p className="max-w-md text-sm text-gray-400 font-bold print:text-[9px] print:text-gray-500 leading-tight">
                                    専門店ならではのトータルサウンド提案。パーツ代・工賃すべて込みの安心パックです。
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="py-12 print:py-2">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-xl font-black mb-6 print:text-sm print:mb-2">こだわりの標準施工内容</h2>
                            <div className="grid grid-cols-4 gap-6 print:gap-2">
                                {[
                                    { title: "ドアチューニングB", img: "/.tempmediaStorage/input_file_0.png" },
                                    { title: "カスタムバッフル", img: "/.tempmediaStorage/input_file_1.png" },
                                    { title: "高品質ケーブル", img: "/.tempmediaStorage/input_file_2.png" },
                                    { title: "熟練の施工", img: "/.tempmediaStorage/input_file_3.png" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-2 print:gap-1">
                                        <div className="aspect-square rounded-xl overflow-hidden border border-gray-100 print:h-16 print:w-16 mx-auto">
                                            <SafeImage src={item.img} className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-black text-[10px] print:text-[7px] text-center">{item.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="py-8 bg-blue-50 print:bg-white print:py-2">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-2 print:text-sm print:mb-1">
                                <Volume2 className="text-blue-600 print:w-3 print:h-3" /> オトクなアップグレード・オプション
                            </h2>
                            <div className="grid grid-cols-2 gap-8 print:gap-2">
                                <div className="bg-white p-6 rounded-2xl border border-blue-100 print:p-2 print:rounded-lg">
                                    <h3 className="font-black text-xs text-blue-600 mb-2 print:mb-0 print:text-[9px]">ドアチューニング・アップグレード</h3>
                                    <div className="space-y-1">
                                        {[
                                            { name: "B → Aコース", price: "+¥11,000", desc: "制振材増量 & 背圧処理DS-1.5WP" },
                                            { name: "B → Sコース", price: "+¥33,000", desc: "最高峰マテリアル & 吸音・遮音複合" }
                                        ].map((opt, i) => (
                                            <div key={i} className="flex justify-between items-center py-1 border-b border-gray-50">
                                                <div>
                                                    <p className="font-black text-[10px] print:text-[7px] leading-none">{opt.name}</p>
                                                    <p className="text-[9px] text-gray-400 print:text-[6px] leading-none">{opt.desc}</p>
                                                </div>
                                                <span className="font-black text-blue-600 text-[10px] print:text-[7px]">{opt.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="bg-emerald-50 p-4 rounded-2xl print:p-2 print:rounded-lg">
                                        <p className="font-black text-[10px] print:text-[8px] leading-none text-emerald-700">メタルバッフルへの変更</p>
                                        <p className="text-[9px] font-bold text-gray-500 print:text-[7px] leading-none">同時施工で定価より20%OFF</p>
                                    </div>
                                    <div className="bg-amber-50 p-4 rounded-2xl print:p-2 print:rounded-lg">
                                        <p className="font-black text-[10px] print:text-[8px] leading-none text-amber-700">ツィーターピラー埋め込み</p>
                                        <p className="text-[9px] font-bold text-gray-500 print:text-[7px] leading-none">¥46,200 (税込) 〜</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-8 print:py-2 print:break-after-page">
                        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center border-t border-gray-100 pt-6 print:pt-2">
                            <div className="text-[10px] font-bold text-gray-400 print:text-[7px] leading-tight">
                                <p>注) バッフル適合が無い車種は別途 ¥5,500 / ツィーターマウント別途</p>
                                <p>注) 特殊なドア通線加工が必要な車両は別途費用がかかります。</p>
                            </div>
                            <div className="flex gap-4 print:gap-2">
                                <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-600" /><span className="text-[10px] print:text-[7px] font-black">作業1日</span></div>
                                <div className="flex items-center gap-1"><Car className="w-3 h-3 text-blue-600" /><span className="text-[10px] print:text-[7px] font-black">代車無料</span></div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 2. Catalog Section (Page 2 in Print) */}
                <div className={`${view === 'catalog' ? 'block' : 'hidden'} print:block print:pt-2 print:max-h-[290mm] print:overflow-hidden`}>
                    <div className="hidden print:block mb-4 text-center">
                        <h1 className="text-xl font-black">STANDARD LINE 取扱いラインナップ</h1>
                        <p className="text-gray-500 text-[8px]">スピーカー・取り付け・消費税込みのパッケージ価格</p>
                        <div className="mt-1 border-b-2 border-gray-900 w-full"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-2 print:gap-2">
                            {standardProducts.map((product) => (
                                <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm print:border-gray-200 print:rounded-lg">
                                    <div className="aspect-video relative overflow-hidden bg-gray-50 print:h-20">
                                        <SafeImage src={product.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6 print:p-2">
                                        <div className="flex justify-between items-start mb-1 print:mb-0">
                                            <span className="text-[8px] font-black text-blue-600 uppercase print:text-[6px]">{product.brand}</span>
                                            <span className="text-lg font-black print:text-xs">¥{product.price.toLocaleString()}〜</span>
                                        </div>
                                        <h3 className="text-lg font-black mb-2 print:text-[9px] print:mb-0 leading-none">{product.model}</h3>
                                        <p className="text-[10px] text-gray-500 font-bold italic mb-4 print:text-[7px] print:mb-1 leading-tight">「{product.comment}」</p>
                                        <div className="flex justify-between items-center border-t border-gray-50 pt-4 print:pt-1">
                                            <div className="hidden print:flex items-center gap-1">
                                                <img src={getQRCodeUrl(product.youtubeUrl)} alt="QR" className="w-6 h-6" />
                                                <span className="text-[5px] font-black leading-none">YouTube試聴</span>
                                            </div>
                                            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-black text-[9px] print:hidden">相談する</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden print:block mt-6 text-center border-t pt-2">
                        <p className="text-[7px] font-black italic text-gray-400">Sound ANG | サウンドエナジー | https://sound-ang.com</p>
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
