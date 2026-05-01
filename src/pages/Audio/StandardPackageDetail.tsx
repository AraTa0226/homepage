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
    Scissors,
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

                    <button 
                        onClick={() => window.print()}
                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-black text-[10px] tracking-widest uppercase"
                    >
                        <Printer className="w-4 h-4" />
                        A4印刷用出力
                    </button>
                </div>
            </header>

            <div className="pt-20">
                {/* 1. LP Section (Page 1) */}
                <div className={`${view === 'lp' ? 'block' : 'hidden'} print:block print:pt-0`}>
                    {/* Hero */}
                    <section className="relative min-h-[70vh] flex items-center overflow-hidden print:min-h-0 print:py-8">
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
                                    STANDARD LINE PACKAGE
                                </div>
                                <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tighter print:text-4xl print:mb-4">
                                    音質アップの第一歩は<br />
                                    <span className="text-blue-600 print:text-black">スピーカー交換</span>から！
                                </h1>
                                <p className="text-lg md:text-xl font-bold text-gray-600 mb-10 leading-relaxed print:text-sm print:mb-6">
                                    ドアチューニング、専用バッフル、高品質ケーブルがセット。<br />
                                    10万円までの厳選ユニットから選べる、こだわりのパッケージ。
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

                    {/* Price Breakdown */}
                    <section className="py-24 bg-gray-900 text-white overflow-hidden relative print:bg-white print:text-gray-900 print:py-8">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full print:hidden"></div>
                        <div className="max-w-7xl mx-auto px-4 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter print:text-2xl print:mb-4">オトクなパッケージ内容</h2>
                                    <div className="space-y-4 print:space-y-2">
                                        {[
                                            { label: "17cmモデル2WAYスピーカー", val: "最大10万円まで" },
                                            { label: "ドアチューニングBコース", val: "¥27,500相当" },
                                            { label: "カスタムインナーバッフル", val: "¥11,000相当" },
                                            { label: "ANGオリジナルスピーカーケーブル(10m)", val: "¥16,500相当" },
                                            { label: "プロによるワイヤリング・取付工賃", val: "¥22,000相当" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between items-center py-4 border-b border-white/10 print:py-2 print:border-gray-100">
                                                <span className="font-bold text-gray-300 print:text-gray-600 print:text-xs">{item.label}</span>
                                                <span className="font-black text-lg print:text-sm">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] text-center print:bg-gray-50 print:border-gray-200 print:p-8 print:rounded-3xl">
                                    <p className="text-gray-400 font-bold mb-4 print:text-gray-500">通常施工合計 ¥117,700 のところ</p>
                                    <div className="mb-6">
                                        <span className="text-6xl md:text-8xl font-black text-blue-500 tracking-tighter">¥81,840</span>
                                        <span className="text-xl font-bold ml-2">〜 (税込)</span>
                                    </div>
                                    <div className="inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xl mb-4 animate-bounce print:animate-none print:bg-black print:text-sm">
                                        ¥35,860 もオトク！
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed font-bold print:text-[8px]">※KICKER CSS674(¥40,700)を選択した場合の例です。車種により価格は変動します。</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4 Base Services with Real Photos */}
                    <section className="py-24 print:py-8">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-16 tracking-tighter text-center print:text-2xl print:mb-8">こだわりの標準施工内容</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 print:gap-4">
                                {[
                                    { 
                                        title: "ドアチューニングBコース", 
                                        desc: "制振材を使用し、ドアを理想的なBOXへと作り込みます。低域の締まりが激変します。", 
                                        img: "/.tempmediaStorage/input_file_0.png",
                                        val: "¥27,500相当"
                                    },
                                    { 
                                        title: "カスタムインナーバッフル", 
                                        desc: "車種専用データ（JustFit適合情報）を元にワンオフ製作。強固にスピーカーを固定します。", 
                                        img: "/.tempmediaStorage/input_file_1.png",
                                        val: "¥11,000相当"
                                    },
                                    { 
                                        title: "オリジナル高品質ケーブル", 
                                        desc: "オーディオテクニカ製特注。1500円/M相当のピュアな伝送を約束するANGオリジナル品。", 
                                        img: "/.tempmediaStorage/input_file_2.png",
                                        val: "¥16,500相当"
                                    },
                                    { 
                                        title: "熟練のワイヤリング・施工", 
                                        desc: "配線1本まで美しく。ノイズ対策を徹底し、マシンのポテンシャルを100%引き出します。", 
                                        img: "/.tempmediaStorage/input_file_3.png",
                                        val: "¥22,000相当"
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all print:flex print:rounded-xl print:border-gray-200">
                                        <div className="aspect-video overflow-hidden md:aspect-square md:w-1/2 print:w-1/3 print:aspect-square">
                                            <SafeImage src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        </div>
                                        <div className="p-10 flex flex-col justify-center md:w-1/2 print:p-4 print:w-2/3">
                                            <span className="text-[10px] font-black text-blue-600 mb-2 uppercase tracking-widest">{item.val}</span>
                                            <h3 className="text-2xl font-black mb-4 print:text-sm print:mb-1">{item.title}</h3>
                                            <p className="text-gray-500 font-bold leading-relaxed text-sm print:text-[9px] print:leading-tight">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Cautions & Info */}
                    <section className="py-24 bg-gray-50 print:bg-white print:py-8 print:break-after-page">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 print:p-6 print:rounded-2xl print:border-gray-200">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <div>
                                        <h3 className="text-2xl font-black mb-8 flex items-center gap-3 print:text-lg print:mb-4">
                                            <Info className="text-blue-600" />
                                            ご注意事項
                                        </h3>
                                        <ul className="space-y-4 print:space-y-2">
                                            {[
                                                "バッフル適合が無い車種では別途製作費 ¥5,500が必要です。",
                                                "ツィーター固定にマウントが必要な車種は別途追加が必要です。",
                                                "ドア通線に特殊加工（カプラ加工等）が必要な車両は別途費用がかかります。"
                                            ].map((text, i) => (
                                                <li key={i} className="flex gap-3 text-sm font-bold text-gray-500 print:text-[10px] print:gap-2">
                                                    <span className="text-blue-500">注)</span>
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-blue-50 p-8 rounded-3xl print:bg-gray-50 print:p-4 print:rounded-xl">
                                        <h4 className="font-black text-xl mb-4 print:text-sm print:mb-2">スムーズな施工のために</h4>
                                        <div className="space-y-4 print:space-y-2">
                                            <div className="flex items-center gap-4 print:gap-2">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shrink-0 print:w-8 print:h-8">
                                                    <Clock className="w-6 h-6 print:w-4 print:h-4" />
                                                </div>
                                                <p className="text-sm font-bold print:text-[10px]">作業は1日お車をお預かりします。</p>
                                            </div>
                                            <div className="flex items-center gap-4 print:gap-2">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shrink-0 print:w-8 print:h-8">
                                                    <Car className="w-6 h-6 print:w-4 print:h-4" />
                                                </div>
                                                <p className="text-sm font-bold print:text-[10px]">無料代車をご用意できますので、お気軽にご利用ください。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 2. Catalog Section (Page 2) */}
                <div className={`${view === 'catalog' ? 'block' : 'hidden'} print:block print:pt-4`}>
                    <div className="hidden print:block mb-8 text-center">
                        <h1 className="text-3xl font-black">STANDARD LINE 取扱いラインナップ</h1>
                        <p className="text-gray-500 text-sm">スピーカー・取り付け・消費税込みのパッケージ価格です</p>
                        <div className="mt-4 border-b-2 border-gray-900 w-full"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 mt-12 print:mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 print:grid-cols-2 print:gap-4">
                            {standardProducts.map((product) => (
                                <div key={product.id} className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm print:rounded-xl print:border-gray-200">
                                    <div className="aspect-[16/10] relative overflow-hidden bg-gray-50 print:aspect-[16/9]">
                                        <SafeImage src={product.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-8 print:p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase print:text-[8px]">{product.brand}</span>
                                            <span className="text-2xl font-black text-gray-900 tracking-tighter print:text-xl">¥{product.price.toLocaleString()}〜</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-4 print:text-sm print:mb-1">{product.model}</h3>
                                        <p className="text-xs text-gray-500 font-bold leading-tight mb-6 print:text-[9px] print:mb-2 italic">「{product.comment}」</p>
                                        
                                        <div className="flex gap-4 mb-6 print:hidden">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-gray-400 font-black uppercase">Depth</span>
                                                <span className="text-xs font-bold">{product.depth || '-'}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-gray-400 font-black uppercase">Tweeter Mount</span>
                                                <span className="text-xs font-bold">{product.mount || '-'}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-gray-100 pt-6 print:pt-2">
                                            <div className="hidden print:flex items-center gap-2">
                                                <img src={getQRCodeUrl(product.youtubeUrl)} alt="QR" className="w-10 h-10" />
                                                <span className="text-[7px] font-bold leading-none">YouTubeで<br />試聴サンプル</span>
                                            </div>
                                            <a href={product.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-red-600 font-black text-xs hover:text-red-700 transition-colors print:hidden">
                                                <Youtube className="w-4 h-4" />
                                                試聴動画
                                            </a>
                                            <button onClick={() => navigate('/reservation')} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-blue-600 transition-all print:hidden">
                                                相談する
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Options at bottom of catalog */}
                    <div className="max-w-7xl mx-auto px-4 mt-24 print:mt-8">
                        <h2 className="text-3xl font-black mb-12 tracking-tighter print:text-xl print:mb-4">オトクなオプション</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-1">
                            <div className="bg-gray-50 p-10 rounded-[3rem] print:p-4 print:rounded-xl">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-3 print:text-sm print:mb-2">
                                    <Volume2 className="text-blue-600" />
                                    ドアチューニング・グレードアップ
                                </h3>
                                <div className="space-y-4 print:space-y-1">
                                    {[
                                        { name: "B → Aコース", price: "+¥11,000", desc: "背圧処理DS-1.5WP採用 & 制振材増量" },
                                        { name: "B → A+コース", price: "+¥22,000", desc: "背圧処理フェリソニC2採用 & 制振材増量" },
                                        { name: "B → Sコース", price: "+¥33,000", desc: "最高峰マテリアル & 吸音・遮音の複合施工" }
                                    ].map((opt, i) => (
                                        <div key={i} className="flex justify-between items-center py-4 border-b border-gray-200 print:py-1 print:border-gray-100">
                                            <div>
                                                <p className="font-black print:text-[10px]">{opt.name}</p>
                                                <p className="text-xs text-gray-400 font-bold print:text-[8px]">{opt.desc}</p>
                                            </div>
                                            <span className="font-black text-blue-600 print:text-xs">{opt.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-8 print:space-y-4">
                                <div className="bg-emerald-50 p-10 rounded-[3rem] print:p-4 print:rounded-xl">
                                    <h3 className="text-xl font-black mb-4 print:text-sm print:mb-1">メタルバッフル変更</h3>
                                    <p className="text-sm font-bold text-gray-600 mb-6 print:text-[9px] print:mb-2">鳴きを抑えタイトな音に。同時施工で定価より<span className="text-emerald-600 font-black">20%OFF</span>でお求めいただけます。</p>
                                </div>
                                <div className="bg-amber-50 p-10 rounded-[3rem] print:p-4 print:rounded-xl">
                                    <h3 className="text-xl font-black mb-4 print:text-sm print:mb-1">ツィーターピラー埋め込み</h3>
                                    <p className="text-sm font-bold text-gray-600 mb-4 print:text-[9px] print:mb-2">反射を抑えクリアな音像へ。クールなインテリアを演出します。</p>
                                    <p className="font-black text-amber-700 print:text-xs">¥46,200 (税込) 〜</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden print:block mt-8 text-center border-t pt-4">
                        <p className="text-[10px] font-bold">Sound ANG | サウンドエナジー | 072-xxx-xxxx | https://sound-ang.com</p>
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
