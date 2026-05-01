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
    Wrench
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
    for (const cat of plans.filter(p => p.type === 'audio')) {
        plan = cat.items.find(item => item.name === decodedPlanId || item.id === decodedPlanId);
        if (plan) break;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (plan) document.title = `${plan.name} | Sound ANG`;
    }, [plan]);

    if (!plan) return <div className="p-20 text-center font-black">Plan not found</div>;

    const details = plan.packageDetails;
    const lineup = plan.lineup;

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
                {/* 1. LP Section */}
                <div className={`${view === 'lp' ? 'block' : 'hidden'} print:block`}>
                    <section className="relative min-h-[50vh] flex items-center print:min-h-0 print:py-2 print:border-b-2 print:border-gray-900">
                        <div className="absolute inset-0 z-0 print:hidden">
                            <SafeImage src={plan.image || "/images/Audio/speaker_default.webp"} className="w-full h-full object-cover opacity-30 grayscale" />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white to-white" />
                        </div>
                        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-center">
                            <div className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-4 print:mb-1 print:bg-black print:text-[8px] print:px-2 print:py-0.5">AUDIO PACKAGE PLAN</div>
                            <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-6 tracking-tighter leading-none print:text-3xl print:mb-1">{plan.name.replace('スピーカー交換', '')}</h1>
                            <p className="text-xl font-black text-gray-400 print:text-[10px] print:leading-tight">専門店が認める、最高基準のインストールパッケージ</p>
                        </div>
                    </section>

                    <section className="py-12 bg-white print:py-2">
                        <div className="max-w-7xl mx-auto px-4 text-center mb-12 print:mb-4">
                            {details ? (
                                <>
                                    <p className="text-gray-400 font-bold mb-2 print:text-[8px]">通常合計 ¥{Number(details.standardPrice).toLocaleString()} のところ</p>
                                    <div className="flex items-baseline justify-center gap-2 mb-4 print:mb-1">
                                        <span className="text-7xl font-black text-blue-600 print:text-3xl tracking-tighter">¥{Number(plan.price).toLocaleString()}</span>
                                        <span className="text-xl font-bold print:text-[10px]">〜 (税込)</span>
                                    </div>
                                    <div className="inline-block bg-gray-900 text-white px-8 py-3 rounded-2xl font-black text-xl print:text-sm print:px-4 print:py-1">¥{Number(details.savings).toLocaleString()} おトク！</div>
                                </>
                            ) : (
                                <div className="text-5xl font-black text-blue-600 print:text-3xl tracking-tighter">¥{Number(plan.price).toLocaleString()}〜 (税込)</div>
                            )}
                        </div>

                        {details && (
                            <div className="max-w-3xl mx-auto px-4 mb-16 print:mb-4">
                                <h3 className="text-lg font-black mb-6 border-b pb-2 print:text-xs print:mb-2">パッケージ構成内容</h3>
                                <div className="space-y-1">
                                    {details.contents.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between py-3 border-b border-gray-50 print:py-1 print:text-[9px]">
                                            <span className="font-bold text-gray-400">{item.title}</span>
                                            <span className="font-black">{item.description}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Service Quality with Images */}
                    <section className="py-16 bg-gray-50 print:bg-white print:py-4">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-2xl font-black mb-10 text-center print:text-sm print:mb-4">サウンドエナジーが約束する施工品質</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 print:gap-4 print:grid-cols-2">
                                {[
                                    { title: "ドアチューニング", img: "/.tempmediaStorage/input_file_0.png", desc: "不要な共鳴を抑え、スピーカーのポテンシャルを解放。" },
                                    { title: "高剛性バッフル", img: "/.tempmediaStorage/input_file_1.png", desc: "強固な土台が音のキレとエネルギー感を生み出します。" },
                                    { title: "高品質ケーブル", img: "/.tempmediaStorage/input_file_2.png", desc: "信号ロスを最小限に抑えるプロ用ワイヤリング。" },
                                    { title: "精密チューニング", img: "/.tempmediaStorage/input_file_3.png", desc: "経験豊かなプロの耳による最終音響調整。" }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm print:p-2 print:rounded-xl print:border-gray-200 print:flex print:items-center print:gap-3">
                                        <div className="aspect-square rounded-2xl overflow-hidden mb-6 print:mb-0 print:rounded-lg print:w-20 print:h-20 shrink-0">
                                            <SafeImage src={item.img} className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-black text-lg mb-2 print:text-[10px] print:mb-0 leading-tight">{item.title}</h4>
                                            <p className="text-xs text-gray-400 font-bold leading-relaxed print:text-[7px] print:leading-tight">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Upgrades Section */}
                    {details && details.upgrades && details.upgrades.length > 0 && (
                        <section className="py-16 print:py-4">
                            <div className="max-w-7xl mx-auto px-4">
                                <h2 className="text-2xl font-black mb-8 flex items-center gap-3 print:text-lg print:mb-2">
                                    <Volume2 className="text-blue-600" /> オトクなアップグレード・オプション
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-4">
                                    <div className="space-y-3">
                                        <p className="text-sm font-black text-blue-600 print:text-[9px]">■ コース・グレードアップ</p>
                                        {details.upgrades.map((opt: any, i: number) => (
                                            <div key={i} className="p-4 bg-gray-50 rounded-2xl print:p-2 print:rounded-lg">
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="font-black text-xs print:text-[8px] leading-none">{opt.title}</p>
                                                    <span className="font-black text-blue-600 text-xs print:text-[8px]">{opt.price}</span>
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-bold print:text-[7px] leading-none">{opt.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-6 bg-emerald-50 rounded-3xl print:p-3 print:rounded-xl text-left">
                                            <h4 className="font-black text-sm text-emerald-700 mb-2 print:text-[9px] print:mb-1">メタルバッフルへの変更</h4>
                                            <p className="text-xs font-bold text-gray-600 leading-relaxed print:text-[8px] print:leading-tight">同時施工で定価より<span className="font-black">20%OFF</span>。よりタイトでキレのある再生へ。</p>
                                        </div>
                                        <div className="p-6 bg-amber-50 rounded-3xl print:p-3 print:rounded-xl text-left">
                                            <h4 className="font-black text-sm text-amber-700 mb-2 print:text-[9px] print:mb-1">ツィーター埋め込み加工</h4>
                                            <p className="text-xs font-bold text-gray-600 leading-relaxed print:text-[8px] print:leading-tight">Aピラー埋め込み ¥46,200〜。クリアな音像と定位感を構築します。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    <section className="py-16 print:py-4 print:break-after-page text-center">
                        <div className="max-w-4xl mx-auto px-4 flex justify-center gap-12 print:gap-4 font-black">
                            <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-600 print:w-3 print:h-3" /><span className="text-sm print:text-[9px]">作業1日お預かり</span></div>
                            <div className="flex items-center gap-2"><Car className="w-5 h-5 text-blue-600 print:w-3 print:h-3" /><span className="text-sm print:text-[9px]">無料代車完備</span></div>
                        </div>
                    </section>
                </div>

                {/* 2. Catalog Section */}
                <div className={`${view === 'catalog' ? 'block' : 'hidden'} print:block print:pt-4`}>
                    <div className="hidden print:block mb-6 text-center">
                        <h1 className="text-2xl font-black uppercase">{plan.name}</h1>
                        <p className="text-gray-500 text-[10px]">スピーカー・取り付け・消費税込みのパッケージ価格</p>
                        <div className="mt-2 border-b-2 border-gray-900 w-full" />
                    </div>
                    <div className="max-w-7xl mx-auto px-4">
                        {lineup && lineup.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 print:grid-cols-2 print:gap-3">
                                {lineup.map((item: any, i: number) => (
                                    <div key={i} className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm print:border-gray-200 print:rounded-xl">
                                        <div className="aspect-[16/10] bg-gray-50 print:h-24"><SafeImage src={item.image || "/images/Audio/speaker_default.webp"} className="w-full h-full object-cover" /></div>
                                        <div className="p-8 print:p-2">
                                            <div className="flex justify-between items-center mb-1"><span className="text-[10px] font-black text-blue-600 uppercase print:text-[7px]">{item.name.split(' / ')[0]}</span><span className="text-2xl font-black print:text-sm">¥{Number(item.price).toLocaleString()}〜</span></div>
                                            <h3 className="text-xl font-black mb-2 print:text-[10px] print:mb-0 leading-tight">{item.name.split(' / ')[1] || item.name}</h3>
                                            <p className="text-[11px] text-gray-400 font-bold italic mb-6 print:text-[8px] print:mb-1 leading-tight">「{item.description}」</p>
                                            <div className="flex justify-between items-center border-t border-gray-50 pt-6 print:pt-1">
                                                <div className="hidden print:flex items-center gap-2"><img src={getQRCodeUrl(item.youtube)} alt="QR" className="w-9 h-9" /><span className="text-[7px] font-black leading-none text-gray-500">YouTubeで<br />試聴動画へ</span></div>
                                                <button onClick={() => navigate('/reservation')} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-blue-600 transition-all print:hidden">相談する</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center font-bold text-gray-400">現在ラインナップを準備中です。</div>
                        )}
                    </div>
                </div>

                {/* Switcher */}
                <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center gap-4 print:hidden">
                    <button onClick={() => setView('lp')} className={`px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all ${view === 'lp' ? 'bg-gray-900 text-white shadow-xl' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>PACKAGE DETAIL</button>
                    <button onClick={() => setView('catalog')} className={`px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all ${view === 'catalog' ? 'bg-gray-900 text-white shadow-xl' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>SPEAKER LINEUP</button>
                </div>
            </div>

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 print:hidden">
                <div className="bg-gray-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-6 backdrop-blur-xl bg-opacity-95 border border-white/10">
                    <button onClick={() => navigate('/reservation')} className="flex items-center gap-2 hover:text-blue-400 transition-colors font-black text-xs tracking-widest"><CalendarIcon className="w-4 h-4" /> 来店予約</button>
                    <div className="w-px h-4 bg-white/20" />
                    <a href="https://page.line.me/312qjhsq?openQrModal=true" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#06C755] hover:text-[#05b34c] transition-colors font-black text-xs tracking-widest"><MessageSquare className="w-4 h-4" /> LINE相談</a>
                </div>
            </div>
        </div>
    );
};

export default AudioPlanDetail;
