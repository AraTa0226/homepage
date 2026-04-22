import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import {
    ShieldCheck,
    Settings2,
    CheckCircle2,
    ArrowLeft,
    X,
    MessageSquare,
    Calendar,
    Info,
    ChevronRight,
    Zap,
    Lock
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

export const DigitalSecurityPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const categoryId = 'security_digital';
    const currentCategory = plans.find(p => p.id === categoryId);

    const detail = {
        title: "Digital Security (デジタル・セキュリティー)",
        subtitle: "CANインベーダーやリレーアタックなど、最新のデジタル盗難手口に対応。",
        description: "最新車両のデジタル通信網「CAN」を悪用した盗難手口（CANインベーダー）等に対し、デジタルのバリアでエンジン始動を阻止します。純正キー連動の利便性を損なわず、最高水準の守りを提供します。",
        sampleDescription: "【施工例】レクサスLX600 ＋ IGLA 2+：純正スマートキーそのままの操作性で、エンジンの不正始動を完全にブロック。独自の認証コード入力がなければ車を動かすことはできません。",
        benefits: [
            "CANインベーダー・キーエミュレーター等に極めて有効",
            "車両配線の切断を行わないため、最新車両への負担が少ない",
            "純正スマートキー連動で、特別な操作が不要",
            "超コンパクト設計で、発見・無効化が極めて困難"
        ],
        image: assets.securityMenuImage,
        icon: Lock,
        color: "blue",
        upgrades: [
            { title: "アナログセキュリティ併用", price: "ASK", icon: ShieldCheck, description: "デジタルとアナログの多重防御で、最強の安心を手に入れます。" },
            { title: "施工後サポート", price: "無料", icon: Settings2, description: "最新の盗難手口に合わせ、常に最適な設定をご提案します。" }
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
                    <h1 className="font-black text-xl tracking-tighter">Digital Security</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/reservation')} className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-black text-xs">
                            RESERVATION
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="relative h-[400px] md:h-[550px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
                    <SafeImage src={detail.image} className="w-full h-full object-cover" alt={detail.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="px-4 py-1 bg-blue-600 rounded-full text-[10px] font-black text-white tracking-widest uppercase">Next Generation</div>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter">{detail.title}</h2>
                        <p className="text-lg md:text-xl text-gray-300 font-bold max-w-xl leading-snug">{detail.subtitle}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 mb-20">
                    <div className="lg:col-span-2">
                        <section className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-gray-100 mb-12">
                            <h3 className="text-3xl font-black mb-8 text-gray-900 tracking-tighter">最新のデジタル手口を<br />デジタルのバリアで防ぐ<span className="text-blue-600">.</span></h3>
                            <p className="text-gray-600 text-lg font-medium leading-relaxed mb-12">
                                {detail.description}
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                {detail.benefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <p className="font-bold text-gray-800 text-sm leading-snug">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div>
                        <section className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl sticky top-24">
                            <h3 className="text-2xl font-black mb-8 tracking-tighter">施工の重要性</h3>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h4 className="text-blue-400 font-black text-sm uppercase tracking-widest">Digital Barrier</h4>
                                    <p className="text-gray-400 text-xs font-bold leading-relaxed">車両のCAN通信に完全に同調。物理的な配線切断をせず、ソフトウェアレベルで強固なセキュリティを構築します。</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-blue-400 font-black text-sm uppercase tracking-widest">Stealth Install</h4>
                                    <p className="text-gray-400 text-xs font-bold leading-relaxed">非常にコンパクトなユニットのため、メーター裏など発見不可能な場所に隠匿設置が可能です。</p>
                                </div>
                                <div className="pt-8 space-y-4">
                                    <a href="https://page.line.me/312qjhsq?openQrModal=true" className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl font-black text-sm hover:translate-y-[-2px] transition-all">
                                        適合車種を相談
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Plan List */}
                <section id="plans">
                    <div className="mb-12">
                        <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4">Lineup<span className="text-blue-600">.</span></h3>
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
                                className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 flex flex-col relative group cursor-pointer"
                            >
                                <div className="mb-6 flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">{item.badge}</span>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-2xl font-black mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                                    <div className="text-3xl font-black text-gray-950 mb-8">{formatPrice(item.price)}</div>
                                    <div className="space-y-4 mb-10">
                                        {item.features.slice(0, 3).map((f, j) => (
                                            <div key={j} className="flex items-center gap-3 text-sm font-bold text-gray-500">
                                                <div className="w-1 h-1 rounded-full bg-blue-600" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-900 font-black text-xs tracking-widest group-hover:gap-2 transition-all">
                                    VIEW DETAILS <ChevronRight className="w-4 h-4" />
                                </div>
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
                                    {selectedItem.description || "このプランの詳細は現在準備中です。施工内容やシステム要件については、お気軽にお問い合わせください。"}
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
                                    <button onClick={() => navigate('/reservation')} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-blue-600 transition-all">予約相談</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
