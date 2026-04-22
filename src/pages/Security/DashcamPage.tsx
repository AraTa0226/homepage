import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import {
    Video,
    Eye,
    ShieldCheck,
    CheckCircle2,
    ArrowLeft,
    X,
    MessageSquare,
    Calendar,
    Info,
    ChevronRight,
    Zap,
    HardDrive
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

export const DashcamPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const categoryId = 'dashcam';
    const currentCategory = plans.find(p => p.id === categoryId);

    const detail = {
        title: "Dashcam (ドライブレコーダー)",
        subtitle: "セキュリティの警報に連動して、ドラレコを強制録画。証拠を確実に残します。",
        description: "PantheraやGrgoのセンサーが異常を検知した際、ドライブレコーダーの電源を強制的にONにして録画を開始します。駐車中の当て逃げやいたずらの証拠を確実に残すための必須オプションです。もちろん、単体での高画質録画モデルも多数取り揃えております。",
        sampleDescription: "【施工例】Grgo ZV ＋ 前後ドラレコ連動：不審者の接近をマイクロ波センサーが検知すると、ドラレコが即座に録画を開始。手元のリモコンにも通知が届きます。",
        benefits: [
            "セキュリティ警報時に自動で録画を開始し、逃さず記録",
            "駐車監視モードよりも確実に、かつバッテリー負荷を抑えて運用",
            "360度モデルやデジタルミラー型など、最新機種との連携",
            "前方だけでなく、車内や後方の映像も高精細にキャッチ"
        ],
        image: assets.dashcamMenuImage,
        icon: Video,
        color: "blue",
        upgrades: [
            { title: "セキュリティ連動ユニット", price: "+¥11,000〜", icon: ShieldCheck, description: "セキュリティの警報に連動して、ドラレコの電源を強制ONにします。" },
            { title: "大容量SDカード", price: "+¥5,500〜", icon: HardDrive, description: "長時間の録画データを高信頼性メディアで保存します。" }
        ]
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/security-home')}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-bold group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">SECURITY HOME</span>
                    </button>
                    <h1 className="font-black text-xl tracking-tighter">Dashcam</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/reservation')} className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-black text-xs">
                            RESERVATION
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
                    <SafeImage src={detail.image} className="w-full h-full object-cover" alt={detail.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 text-white">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6">
                            <Video className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">{detail.title}</h2>
                        <p className="text-lg md:text-xl font-bold max-w-xl leading-snug">{detail.subtitle}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 mb-20">
                    <div className="lg:col-span-2 space-y-12">
                        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-black mb-6 text-gray-900 flex items-center gap-3">
                                <div className="w-2 h-8 rounded-full bg-blue-600"></div>
                                ドラレコ連動のメリット
                            </h3>
                            <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10">{detail.description}</p>
                            <div className="grid sm:grid-cols-2 gap-6 mb-10">
                                {detail.benefits.map((benefit: string, i: number) => (
                                    <div key={i} className="flex items-start gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 shrink-0">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <p className="font-bold text-gray-800 text-sm leading-snug">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-200">
                                <h4 className="text-sm font-black mb-4 uppercase tracking-[0.2em] text-gray-400">Practical Example</h4>
                                <p className="text-gray-800 font-bold leading-relaxed italic">{detail.sampleDescription}</p>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section className="bg-gray-950 rounded-[3rem] p-10 text-white shadow-2xl">
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                                <Zap className="w-5 h-5 text-blue-400" />
                                連携オプション
                            </h3>
                            <div className="space-y-6">
                                {detail.upgrades.map((upgrade: any, i: number) => (
                                    <div key={i} className="group">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-black text-sm group-hover:text-blue-400 transition-colors">{upgrade.title}</h4>
                                            <span className="text-blue-400 font-black text-[10px]">{upgrade.price}</span>
                                        </div>
                                        <p className="text-gray-500 text-[10px] font-bold">{upgrade.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 pt-10 border-t border-white/10">
                                <a href="https://page.line.me/312qjhsq?openQrModal=true" className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm tracking-widest hover:scale-105 transition-all">
                                    LINEで適合相談
                                </a>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Plan List */}
                <section id="plans">
                    <div className="mb-12">
                        <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4">Lineup List<span className="text-blue-600">.</span></h3>
                        <p className="text-gray-500 font-bold">全メーカー・最新ドラレコに対応。セキュリティ連動のご相談もお気軽に。</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentCategory?.items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setSelectedItem(item)}
                                className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col relative group overflow-hidden cursor-pointer"
                            >
                                <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden">
                                    <SafeImage src={item.image || assets.dashcamMenuImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{item.badge}</span>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-2xl font-black mb-2 text-gray-900">{item.name}</h4>
                                    <div className="text-3xl font-black text-blue-600 mb-6">{formatPrice(item.price)}</div>
                                    <div className="space-y-3 mb-8">
                                        {item.features.slice(0, 3).map((f, j) => (
                                            <div key={j} className="flex items-center gap-3 text-xs font-bold text-gray-500">
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all shadow-lg">
                                    VIEW DETAILS
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-gray-950/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col relative"
                        >
                            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 z-20">
                                <X className="w-6 h-6" />
                            </button>
                            <div className="p-12">
                                <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">{selectedItem.badge}</span>
                                <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter">{selectedItem.name}</h2>
                                <div className="text-gray-600 font-bold leading-relaxed mb-10">
                                    {selectedItem.description}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                                    {selectedItem.features.map((f: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                            <span className="text-xs font-bold text-gray-700">{f}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                                    <div className="text-3xl font-black text-gray-900">{formatPrice(selectedItem.price)}</div>
                                    <button onClick={() => navigate('/reservation')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-sm hover:scale-105 transition-all">予約相談</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
