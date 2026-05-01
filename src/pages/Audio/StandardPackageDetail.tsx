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
    Scissors,
    Maximize2
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
    { id: 'focal-ps165v1', brand: 'FOCAL', model: 'PS 165 V1', price: 99000, comment: '艶やかなボーカルと透明感のある高音。フランスの名門が生んだ傑作ユニット。', image: '/audio_speaker_high_end_focal_1777648200679.png', youtubeUrl: 'https://youtube.com/watch?v=focal', depth: '65.5mm', mount: '付属' },
    { id: 'kicker-kss6704', brand: 'KICKER', model: 'KSS6704', price: 81840, comment: 'パワフルな低音とキレのあるサウンド。ロックやPOPSを楽しく聴きたい方に。', image: '/audio_speaker_kicker_style_1777648219037.png', youtubeUrl: 'https://youtube.com/watch?v=kicker', depth: '44.5mm', mount: '付属' },
    { id: 'morel-maximo', brand: 'MOREL', model: 'MAXIMO ULTRA 602', price: 93500, comment: '温かみのある自然な音色。女性ボーカルやクラシックを優雅に楽しめます。', image: '/images/Audio/speaker_default.webp', youtubeUrl: 'https://youtube.com/watch?v=morel', depth: '63mm', mount: '別売可' },
    { id: 'blam-relax', brand: 'BLAM', model: '165 R2S', price: 85800, comment: 'フレンチサウンドの伝統を継承。繊細かつダイナミックな表現力が魅力。', image: '/images/Audio/speaker_default.webp', youtubeUrl: 'https://youtube.com/watch?v=blam', depth: '62.4mm', mount: '付属' },
    { id: 'ground-zero', brand: 'GROUND ZERO', model: 'GZIC 165.2', price: 82500, comment: '重厚な低域と伸びやかな高域。ジャーマンエンジニアリングの真髄。', image: '/images/Audio/speaker_default.webp', youtubeUrl: 'https://youtube.com/watch?v=gz', depth: '63mm', mount: '付属' },
    { id: 'helix-ci3', brand: 'HELIX', model: 'Ci3 K165.2-S3', price: 88000, comment: 'フラットで正確な再生。最新のデジタル音源も忠実に再現します。', image: '/images/Audio/speaker_default.webp', youtubeUrl: 'https://youtube.com/watch?v=helix', depth: '61mm', mount: '付属' }
];

const StandardPackageDetail: React.FC = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<'lp' | 'catalog'>('lp');

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = view === 'lp' ? "スタンダードパッケージ詳細 | Sound ANG" : "ラインナップ | Sound ANG";
    }, [view]);

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 print:hidden">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <button onClick={() => view === 'catalog' ? setView('lp') : navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all group">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-xs font-black tracking-widest uppercase">Back</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-black italic">S</div>
                        <span className="font-black tracking-tighter text-xl">Sound ANG</span>
                    </div>
                    <button onClick={() => window.print()} className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-full font-black text-xs uppercase shadow-xl shadow-blue-200 hover:scale-105 transition-all">
                        <Printer className="w-4 h-4" /> A4印刷用出力
                    </button>
                </div>
            </header>

            <div className="pt-20">
                {/* 1. LP Section (Page 1 in Print) */}
                <div className={`${view === 'lp' ? 'block' : 'hidden'} print:block print:pt-0`}>
                    {/* Hero */}
                    <section className="relative min-h-[45vh] flex items-center print:min-h-0 print:py-4 print:border-b-4 print:border-gray-900 print:mb-4">
                        <div className="absolute inset-0 z-0 print:hidden">
                            <SafeImage src="/audio_standard_package_hero_1777648073560.png" className="w-full h-full object-cover opacity-40" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent"></div>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                            <div className="max-w-3xl">
                                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tighter print:text-3xl print:mb-2">
                                    音質アップの第一歩は<br /><span className="text-blue-600 print:text-black">スピーカー交換</span>から！
                                </h1>
                                <p className="text-lg font-bold text-gray-500 max-w-xl print:text-[11px] print:leading-tight">
                                    10万円までの選べるスピーカー、ドアチューニングB、専用バッフル、高品質ケーブル、工賃がセットになったこだわりのパッケージ。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Price Impact Detail */}
                    <section className="py-12 bg-gray-50 print:bg-white print:py-2">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div className="space-y-4 print:space-y-1">
                                    <h2 className="text-2xl font-black print:text-sm">おトクなパッケージ内容</h2>
                                    <div className="grid grid-cols-1 gap-2 print:gap-0">
                                        {[
                                            { label: "17cmモデル2WAYスピーカー", val: "最大10万円まで" },
                                            { label: "ドアチューニングBコース", val: "¥27,500" },
                                            { label: "カスタムインナーバッフル", val: "¥11,000" },
                                            { label: "ANGオリジナルケーブル(10m)", val: "¥16,500" },
                                            { label: "プロの取付・調整工賃", val: "¥22,000" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between py-2 border-b border-gray-200 print:py-0.5 print:text-[9px]">
                                                <span className="font-bold text-gray-500">{item.label}</span>
                                                <span className="font-black">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gray-900 text-white p-10 rounded-[3rem] text-center print:bg-gray-100 print:text-gray-900 print:p-4 print:rounded-2xl">
                                    <p className="text-sm font-bold opacity-60 mb-2 print:text-[8px] print:mb-0">通常施工合計 ¥117,700 のところ</p>
                                    <div className="flex items-baseline justify-center gap-2 mb-4 print:mb-1">
                                        <span className="text-6xl font-black text-blue-400 print:text-3xl">¥81,840</span>
                                        <span className="text-xl font-bold print:text-[10px]">〜 (税込)</span>
                                    </div>
                                    <div className="inline-block bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xl print:text-sm print:px-4 print:py-1">
                                        ¥35,860 もおトク！
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Base Services Detailed */}
                    <section className="py-16 print:py-4">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-2xl font-black mb-10 print:text-sm print:mb-2 text-center">プロショップならではの標準施工品質</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 print:gap-3">
                                {[
                                    { title: "ドアチューニングB", desc: "制振材でドアをBOX化。低域の締まりが激変。", img: "/.tempmediaStorage/input_file_0.png" },
                                    { title: "車種専用バッフル", desc: "1台ずつワンオフ製作。強固に固定します。", img: "/.tempmediaStorage/input_file_1.png" },
                                    { title: "高品質ケーブル", desc: "ANGオリジナル。ピュアな伝送を約束。", img: "/.tempmediaStorage/input_file_2.png" },
                                    { title: "熟練のワイヤリング", desc: "ノイズを排し、ポテンシャルを100%発揮。", img: "/.tempmediaStorage/input_file_3.png" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-4 print:gap-1">
                                        <div className="aspect-square rounded-[2rem] overflow-hidden border border-gray-100 print:rounded-xl print:h-20 print:w-20 mx-auto">
                                            <SafeImage src={item.img} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="font-black text-sm print:text-[9px] mb-1 leading-none">{item.title}</h4>
                                            <p className="text-xs text-gray-400 font-bold leading-tight print:text-[7px]">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Upgrades (DENSE) */}
                    <section className="py-12 bg-blue-50 print:bg-white print:py-2 print:border-t-2 print:border-gray-100">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-xl font-black mb-8 flex items-center gap-3 print:text-sm print:mb-2">
                                <Volume2 className="text-blue-600 print:w-3 print:h-3" /> さらに極める、人気のアップグレード
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3 print:gap-2">
                                <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-blue-100 print:p-3 print:rounded-xl">
                                    <h3 className="font-black text-sm text-blue-600 mb-4 print:mb-1 print:text-[10px]">ドアチューニング・アップグレード</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 print:gap-y-1">
                                        {[
                                            { name: "B → Aコース", price: "+¥11,000", desc: "制振材増量 & 背圧処理(フェリソニDS)" },
                                            { name: "B → A+コース", price: "+¥22,000", desc: "制振材増量 & 背圧処理(フェリソニC2)" },
                                            { name: "B → Sコース", price: "+¥33,000", desc: "最高峰マテリアル & 吸音・遮音複合" },
                                            { name: "B → S+コース", price: "+¥44,000", desc: "Sコースに加えマテリアルをさらに増量" }
                                        ].map((opt, i) => (
                                            <div key={i} className="flex justify-between py-2 border-b border-gray-50 print:py-1">
                                                <div>
                                                    <p className="font-black text-xs print:text-[8px] leading-none">{opt.name}</p>
                                                    <p className="text-[10px] text-gray-400 print:text-[6px]">{opt.desc}</p>
                                                </div>
                                                <span className="font-black text-blue-600 text-xs print:text-[8px]">{opt.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4 print:space-y-1">
                                    <div className="bg-white p-6 rounded-[2.5rem] border border-emerald-100 print:p-2 print:rounded-lg">
                                        <p className="font-black text-xs text-emerald-700 mb-1 print:text-[8px]">メタルバッフル変更</p>
                                        <p className="text-[10px] font-bold text-gray-400 print:text-[6px] leading-tight">同時施工で定価より20%オフ。タイトで張りのある音へ。</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-[2.5rem] border border-amber-100 print:p-2 print:rounded-lg">
                                        <p className="font-black text-xs text-amber-700 mb-1 print:text-[8px]">ツィーター埋め込み</p>
                                        <p className="text-[10px] font-bold text-gray-400 print:text-[6px] leading-tight">Aピラー埋め込み ¥46,200〜。クリアな音像とクールな外見。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer Info Page 1 */}
                    <section className="py-12 print:py-4 print:break-after-page">
                        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-6 print:gap-2">
                            <div className="text-xs font-bold text-gray-400 space-y-1 print:text-[8px] print:space-y-0 leading-tight">
                                <p>注) バッフル適合が無い車種は別途製作費 ¥5,500 / ツィーターマウント別途追加</p>
                                <p>注) 特殊なドア通線加工が必要な車両は別途費用がかかります。</p>
                            </div>
                            <div className="flex gap-8 print:gap-4">
                                <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-600 print:w-3 print:h-3" /><span className="text-sm font-black print:text-[9px]">作業は1日お預かり</span></div>
                                <div className="flex items-center gap-2"><Car className="w-5 h-5 text-blue-600 print:w-3 print:h-3" /><span className="text-sm font-black print:text-[9px]">無料代車完備</span></div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 2. Catalog Section (Page 2 in Print) */}
                <div className={`${view === 'catalog' ? 'block' : 'hidden'} print:block print:pt-4`}>
                    <div className="hidden print:block mb-6 text-center">
                        <h1 className="text-2xl font-black">STANDARD LINE LINEUP</h1>
                        <p className="text-gray-500 text-[9px]">スピーカー・取り付け・消費税込みのパッケージ価格</p>
                        <div className="mt-2 border-b-2 border-gray-900 w-full"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 print:grid-cols-2 print:gap-3">
                            {standardProducts.map((product) => (
                                <div key={product.id} className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all print:border-gray-200 print:rounded-xl">
                                    <div className="aspect-[16/10] relative overflow-hidden bg-gray-50 print:h-24">
                                        <SafeImage src={product.image} className="w-full h-full object-cover" />
                                        <div className="absolute top-4 left-4 print:hidden">
                                            <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black tracking-widest text-blue-600 uppercase shadow-sm">{product.brand}</span>
                                        </div>
                                    </div>
                                    <div className="p-8 print:p-2">
                                        <div className="flex justify-between items-center mb-2 print:mb-0">
                                            <span className="hidden print:block text-[7px] font-black text-blue-600 uppercase">{product.brand}</span>
                                            <span className="text-2xl font-black print:text-sm">¥{product.price.toLocaleString()}〜</span>
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 mb-2 print:text-[10px] print:mb-0 leading-tight">{product.model}</h3>
                                        <p className="text-[11px] text-gray-400 font-bold italic mb-6 print:text-[8px] print:mb-1 leading-tight">「{product.comment}」</p>
                                        <div className="flex gap-4 mb-6 print:hidden">
                                            <div className="flex flex-col"><span className="text-[9px] text-gray-300 font-black uppercase">Depth</span><span className="text-xs font-bold">{product.depth || '-'}</span></div>
                                            <div className="flex flex-col"><span className="text-[9px] text-gray-300 font-black uppercase">Mount</span><span className="text-xs font-bold">{product.mount || '-'}</span></div>
                                        </div>
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
                            {/* Brands placeholder to show density */}
                            <div className="md:col-span-3 border-t border-dashed border-gray-200 mt-8 pt-8 print:mt-2 print:pt-2">
                                <h4 className="text-xs font-black text-gray-300 mb-4 print:mb-1 uppercase tracking-[0.3em] text-center">Available Brands</h4>
                                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 print:gap-x-4 print:gap-y-1 opacity-40 grayscale">
                                    {['GROUND ZERO', 'AUDISON', 'VIBE', 'BLUE MOON', 'KICKER', 'carrozzeria', 'ALPINE', 'HELIX', 'BLAM', 'DYNAUDIO', 'DLS', 'MOREL'].map((b, i) => (
                                        <span key={i} className="text-sm font-black print:text-[8px]">{b}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden print:block mt-8 text-center border-t pt-4">
                        <p className="text-[9px] font-black italic text-gray-400">Sound ANG | サウンドエナジー | 大阪府和泉市葛の葉町3丁目3-50 | https://sound-ang.com</p>
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
