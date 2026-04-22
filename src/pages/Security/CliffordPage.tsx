import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import {
    ShieldCheck,
    Zap,
    CheckCircle2,
    ArrowLeft,
    X,
    MessageSquare,
    Calendar,
    Info,
    ChevronRight,
    Star,
    Lock
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

export const CliffordPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const categoryId = 'security_clifford';
    const currentCategory = plans.find(p => p.id === categoryId);

    const detail = {
        title: "CLIFFORD (クリフォード)",
        subtitle: "「絶対に盗ませない」世界最高峰の信頼。独自のダブルイモビライザーを搭載。",
        description: "セキュリティの代名詞とも言えるブランド。独自の「ブラックジャックス」システムや、感度調整が極めて精密なオムニセンサーにより、鉄壁の守りを提供します。",
        sampleDescription: "【施工例】スカイラインGT-R ＋ CLIFFORD G6：オムニセンサーで微細な振動も検知。ダブルイモビライザーで自走盗難を物理的に阻止します。",
        benefits: [
            "独自のダブルイモビライザーによる強力な自走防止能力",
            "誤作動を極限まで抑える高精度オムニセンサーを搭載",
            "ブラックジャックスによる強固なオーナー認証システム",
            "最高級ブランドとしてのステータスと圧倒的な安心感"
        ],
        image: assets.securityMenuImage,
        icon: ShieldCheck,
        color: "indigo",
        upgrades: [
            { title: "オムニセンサー", price: "+¥22,000〜", icon: Zap, description: "衝撃の強弱を精密に判別し、誤作動なく警報を鳴らします。" },
            { title: "リモートエンジン始動", price: "+¥44,000〜", icon: Zap, description: "クリフォードのリモコンからエンジン始動が可能になります。" }
        ]
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button onClick={() => navigate('/security-home')} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-bold group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">SECURITY HOME</span>
                    </button>
                    <h1 className="font-black text-xl tracking-tighter text-indigo-900">CLIFFORD</h1>
                    <div className="w-24"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
                    <SafeImage src={detail.image} className="w-full h-full object-cover" alt={detail.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 to-transparent"></div>
                    <div className="absolute bottom-12 left-12">
                        <div className="flex items-center gap-4 mb-6">
                            <Lock className="text-indigo-400 w-10 h-10" />
                            <span className="text-indigo-400 font-black tracking-widest text-sm uppercase">Ultimate Defense</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">{detail.title}</h2>
                        <p className="text-lg md:text-2xl text-indigo-200 font-bold max-w-2xl leading-snug">{detail.subtitle}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    <section className="bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-black mb-8 text-indigo-950 italic underline decoration-indigo-200 decoration-8 underline-offset-4">The Science of Security</h3>
                        <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10">{detail.description}</p>
                        <div className="space-y-4">
                            {detail.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
                                    <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0" />
                                    <span className="font-bold text-gray-800 leading-tight">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-indigo-950 rounded-[3rem] p-12 text-white shadow-2xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-black mb-8 tracking-tighter">ブラックジャックス</h3>
                            <p className="text-indigo-200 font-bold leading-relaxed mb-10">
                                クリフォード独自の「ブラックジャックス」は、他にはない強固なオーナー認証システムです。万が一、キーを奪われたカージャックの際も、独自のコード入力を求めることで、自走による車両奪取を物理的に不可能にします。
                            </p>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-sm font-black text-indigo-400 mb-4 uppercase tracking-widest">Example Installation</h4>
                                <p className="text-sm font-bold italic leading-relaxed text-indigo-100">{detail.sampleDescription}</p>
                            </div>
                        </div>
                        <div className="pt-12">
                            <a href="https://page.line.me/312qjhsq?openQrModal=true" className="block w-full bg-indigo-600 text-white text-center py-5 rounded-2xl font-black text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/50">
                                鉄壁の守りを相談する
                            </a>
                        </div>
                    </section>
                </div>

                {/* Plan List Area */}
                {currentCategory && currentCategory.items.length > 0 && (
                    <section id="plans">
                        <div className="mb-12">
                            <h3 className="text-4xl font-black tracking-tighter">CLIFFORD Models</h3>
                            <div className="h-1 w-20 bg-indigo-600 mt-2"></div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {currentCategory.items.map((item, i) => (
                                <motion.div key={i} onClick={() => setSelectedItem(item)} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 cursor-pointer hover:shadow-indigo-100 hover:border-indigo-200 transition-all group flex flex-col">
                                    <div className="mb-6">
                                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-4 py-1 rounded-full uppercase tracking-widest">{item.badge}</span>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-2xl font-black mb-4 text-indigo-950 group-hover:text-indigo-600 transition-colors tracking-tight">{item.name}</h4>
                                        <div className="text-3xl font-black text-gray-900 mb-8">{formatPrice(item.price)}</div>
                                    </div>
                                    <button className="w-full text-center py-4 bg-indigo-950 text-white rounded-2xl font-black text-xs tracking-[0.2em] hover:bg-indigo-600 transition-all uppercase">Analysis</button>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} className="bg-white max-w-2xl w-full rounded-[4rem] p-16 relative shadow-2xl">
                            <button onClick={() => setSelectedItem(null)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors"><X className="w-8 h-8" /></button>
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 inline-block">{selectedItem.badge}</span>
                            <h2 className="text-5xl font-black mb-8 tracking-tighter text-indigo-950">{selectedItem.name}</h2>
                            <p className="text-gray-600 font-bold mb-12 leading-relaxed text-lg italic pr-12 border-l-4 border-indigo-100 pl-8">{selectedItem.description}</p>

                            <div className="grid grid-cols-2 gap-4 mb-12">
                                {selectedItem.features.slice(0, 4).map((f: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                                        <span className="text-xs font-bold text-gray-700">{f}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-10 border-t border-gray-100">
                                <div className="text-4xl font-black text-indigo-950 tracking-tighter">{formatPrice(selectedItem.price)}</div>
                                <button onClick={() => navigate('/reservation')} className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest hover:scale-105 transition-all shadow-xl shadow-indigo-200">予約相談</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
