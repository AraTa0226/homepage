import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import {
    Shield,
    Eye,
    AlertTriangle,
    CheckCircle2,
    ArrowLeft,
    X,
    MessageSquare,
    Calendar,
    Info,
    ChevronRight,
    Star
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

export const GrgoPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const categoryId = 'security_grgo';
    const currentCategory = plans.find(p => p.id === categoryId);

    const detail = {
        title: "Grgo (ゴルゴ)",
        subtitle: "日本の環境に最適化された使いやすさと信頼性。多彩なセンサー拡張が可能。",
        description: "視認性の高いアンサーバックリモコンが特徴。ユーザーの環境に合わせて感度調整が細かく設定でき、初めてのセキュリティ導入にも最適です。",
        sampleDescription: "【施工例】アルファード ＋ Grgo ZV：アンサーバックリモコンで車両状態を常に把握。純正キーレス連動により、普段通りの操作で防犯性能を最大化します。",
        benefits: [
            "アンサーバックリモコンで異常を即座に通知",
            "多彩なオプションセンサーでカスタマイズ可能",
            "暗証番号式解除機能で万が一の際も安心",
            "SPS認定店による高度なセッティング"
        ],
        image: assets.securityMenuImage,
        icon: Shield,
        color: "blue",
        upgrades: [
            { title: "マイクロ波センサー", price: "+¥16,500〜", icon: Eye, description: "車両への接近を検知。窓越しに中を覗き込む行為に反応します。" },
            { title: "トリプルセンサー", price: "+¥11,000〜", icon: AlertTriangle, description: "衝撃センサーの精度をさらに高め、微細な振動も逃しません。" }
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
                    <h1 className="font-black text-xl tracking-tighter">Grgo</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/reservation')} className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-xs">
                            <Calendar className="w-4 h-4" />
                            相談予約
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
                    <SafeImage src={detail.image} className="w-full h-full object-cover" alt={detail.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 bg-blue-600 text-white shadow-lg`}>
                            <detail.icon className="w-7 h-7 md:w-8 md:h-8" />
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter">{detail.title}</h2>
                        <p className="text-lg md:text-2xl text-gray-200 font-bold max-w-2xl leading-tight">{detail.subtitle}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 mb-20">
                    <div className="lg:col-span-2 space-y-12">
                        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-black mb-6 text-gray-900 flex items-center gap-3">
                                <div className="w-2 h-8 rounded-full bg-blue-600"></div>
                                コンセプト
                            </h3>
                            <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10">{detail.description}</p>
                            <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100">
                                <h4 className="text-sm font-black mb-4 uppercase tracking-[0.2em] text-blue-600">Example Installation</h4>
                                <p className="text-gray-800 font-bold leading-relaxed italic">{detail.sampleDescription}</p>
                            </div>
                        </section>

                        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-black mb-8 text-gray-900 flex items-center gap-3">
                                <div className="w-2 h-8 rounded-full bg-blue-600"></div>
                                主な特徴
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {detail.benefits.map((benefit: string, i: number) => (
                                    <div key={i} className="flex items-start gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 shrink-0">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <p className="font-bold text-gray-800 leading-snug">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section className="bg-gray-900 rounded-[3rem] p-8 text-white shadow-2xl">
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                <Star className="w-5 h-5 text-blue-400" />
                                アップグレード
                            </h3>
                            <div className="space-y-4">
                                {detail.upgrades.map((upgrade: any, i: number) => (
                                    <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                                                <upgrade.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="text-blue-400 font-black text-sm">{upgrade.price}</span>
                                        </div>
                                        <h4 className="font-black mb-2">{upgrade.title}</h4>
                                        <p className="text-gray-400 text-xs font-bold">{upgrade.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-blue-600 rounded-[3rem] p-8 text-white shadow-2xl">
                            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                お問い合わせ
                            </h3>
                            <p className="text-blue-100 text-sm font-bold mb-6">Grgoの豊富なオプション選定もお任せください。</p>
                            <a href="https://page.line.me/312qjhsq?openQrModal=true" className="block w-full bg-white text-blue-600 text-center py-4 rounded-xl font-black text-sm hover:scale-105 transition-all">
                                LINEで相談する
                            </a>
                        </section>
                    </div>
                </div>

                {/* Plan List */}
                <section id="plans">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900">Grgo Plans<span className="text-blue-600">.</span></h3>
                            <p className="text-gray-500 font-bold mt-2">施工工賃・ショートパーツ込みの安心価格</p>
                        </div>
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
                                    <SafeImage src={item.image || "https://picsum.photos/seed/security/800/600"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{item.badge}</span>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-2xl font-black mb-2 text-gray-900">{item.name}</h4>
                                    <div className="text-3xl font-black text-blue-600 mb-6">{formatPrice(item.price)}</div>
                                    <ul className="space-y-4 mb-8">
                                        {(item.features || []).slice(0, 4).map((f, j) => (
                                            <li key={j} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all shadow-lg">
                                    PLAN DETAILS
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Plan Detail Modal */}
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
                            className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col relative"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-900 transition-all z-20"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex-grow overflow-y-auto">
                                <div className="relative h-64 md:h-96">
                                    <SafeImage src={selectedItem.image || "https://picsum.photos/seed/security_grgo/1200/800"} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg mb-4 inline-block">
                                            {selectedItem.badge || "Security Plan"}
                                        </span>
                                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">{selectedItem.name}</h2>
                                    </div>
                                </div>
                                <div className="p-8 md:p-12">
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div>
                                            <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <Info className="w-4 h-4" />
                                                Description
                                            </h3>
                                            <p className="text-gray-600 font-bold leading-relaxed whitespace-pre-wrap">{selectedItem.description}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4" />
                                                Features
                                            </h3>
                                            <div className="space-y-3">
                                                {selectedItem.features.map((f: string, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                                        <span className="text-sm font-bold text-gray-700">{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-8 p-6 bg-gray-900 rounded-2xl text-white">
                                                <p className="text-xs text-gray-400 mb-1">Price</p>
                                                <div className="text-3xl font-black text-blue-400">{formatPrice(selectedItem.price)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
