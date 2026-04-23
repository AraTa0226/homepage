import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import {
    Shield,
    CheckCircle2,
    ArrowLeft,
    X,
    MessageSquare,
    Star,
    Info,
    Calendar
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

export const GrgoV2Page: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const categoryId = 'security_grgo_v2';
    const currentCategory = plans.find(p => p.id === categoryId);

    const detail = {
        title: "Grgo V2 / Vシリーズ",
        subtitle: "信頼と実績のロングセラー。実用的な防犯性能を、導入しやすい価格で。",
        description: "長年愛され続けているGrgoの基幹シリーズ。最新モデルVⅡのベースとなった高い基本性能はそのままに、オプションセンサーの追加による柔軟なカスタマイズが可能です。在庫限りの特価プランもご用意しております。",
        image: "/images/Security/model/grgo.webp",
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 h-16">
                <button onClick={() => navigate('/security-home')} className="flex items-center gap-2 text-gray-600 font-bold group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">SECURITY HOME</span>
                </button>
                <h1 className="font-black text-xl tracking-tighter text-gray-400 uppercase">Grgo V2 Series</h1>
                <button onClick={() => navigate('/reservation')} className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold text-xs">相談予約</button>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden shadow-2xl bg-black mb-12">
                    <SafeImage src="/images/Security/model/grgo-h.webp" className="w-full h-full object-contain opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12 text-white">
                        <span className="bg-gray-600 text-[10px] font-black px-4 py-1 rounded-full uppercase mb-6 inline-block tracking-widest">Global Standard</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-8 drop-shadow-xl">{detail.subtitle}</h2>
                        <div className="flex gap-4">
                            <a href="#plans" className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all">CHECK MODELS</a>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 mb-20">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-black mb-8 text-gray-900 italic tracking-tighter">実績に裏打ちされた安心<span className="text-blue-600">.</span></h3>
                            <p className="text-gray-600 text-lg font-bold leading-relaxed mb-6">{detail.description}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {["アンサーバック通報", "感度学習機能", "暗証番号解除", "拡張性"].map((tag, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        <span className="font-black text-sm text-gray-700">{tag}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                    <div className="bg-blue-600 rounded-[3rem] p-10 text-white shadow-2xl flex flex-col justify-between">
                        <div>
                            <Star className="w-10 h-10 mb-8 opacity-50" />
                            <h3 className="text-2xl font-black mb-4 italic tracking-tighter">Special Offer</h3>
                            <p className="text-blue-100 font-bold leading-relaxed mb-8 text-sm">旧モデルZVシリーズなど、在庫限りの特別価格でご案内可能です。性能は十分、コストを抑えたい方に最適です。</p>
                        </div>
                        <button onClick={() => navigate('/reservation')} className="w-full bg-white text-blue-600 py-4 rounded-2xl font-black text-sm">在庫状況を確認</button>
                    </div>
                </div>

                <section id="plans">
                    <div className="mb-12">
                        <h3 className="text-4xl font-black italic tracking-tighter">V2 Lineup<span className="text-blue-600">.</span></h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {currentCategory?.items.map((item, i) => (
                            <motion.div key={i} onClick={() => setSelectedItem(item)} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 relative group cursor-pointer overflow-hidden border-t-4 border-t-gray-900">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">{item.badge}</span>
                                        <h4 className="text-3xl font-black text-gray-900 italic tracking-tighter">{item.name}</h4>
                                    </div>
                                    <div className="text-2xl font-black text-gray-400">{formatPrice(item.price)}〜</div>
                                </div>
                                <ul className="grid grid-cols-2 gap-4 mb-10">
                                    {(item.features || []).map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-xs font-bold text-gray-500"><CheckCircle2 className="w-4 h-4 text-gray-200" />{f}</li>
                                    ))}
                                </ul>
                                <button className="w-full bg-gray-50 text-gray-900 py-4 rounded-xl font-black text-xs group-hover:bg-gray-900 group-hover:text-white transition-all">VIEW DETAILS</button>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div onClick={() => setSelectedItem(null)} className="fixed inset-0 z-[110] bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <motion.div onClick={e => e.stopPropagation()} className="bg-white w-full max-w-xl rounded-[3rem] p-12 overflow-hidden shadow-2xl relative">
                            <button onClick={() => setSelectedItem(null)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900"><X /></button>
                            <h2 className="text-3xl font-black mb-2 italic tracking-tighter">{selectedItem.name}</h2>
                            <p className="text-gray-500 font-bold mb-10 leading-relaxed text-sm">このモデルは現在、店舗在庫分のみの販売となります。施工可否については事前にお問い合わせください。</p>
                            <div className="space-y-4 mb-10">
                                {selectedItem.features.map((f: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-100 font-bold text-gray-700 text-sm italic"><CheckCircle2 className="w-4 h-4 text-blue-600" />{f}</div>
                                ))}
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl flex justify-between items-center">
                                <span className="font-black text-xs text-gray-400 uppercase">Estimated Price</span>
                                <span className="text-2xl font-black text-gray-900">{formatPrice(selectedItem.price)}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
