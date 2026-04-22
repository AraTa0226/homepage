import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import {
    ShieldCheck,
    Smartphone,
    Bell,
    CheckCircle2,
    ArrowLeft,
    X,
    MessageSquare,
    Calendar,
    Info,
    ChevronRight,
    Zap,
    Star
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

export const ViperPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const categoryId = 'security_viper';
    const currentCategory = plans.find(p => p.id === categoryId);

    const detail = {
        title: "VIPER (バイパー)",
        subtitle: "世界シェアNo.1。エンジンスターターやスマホ連動など、利便性と防犯を両立。",
        description: "世界中で愛用される信頼のブランド。最新のDS4シリーズは車両のデジタル通信に対応し、純正キーレス連動やエンジンスターター機能をスマートに実現します。",
        sampleDescription: "【施工例】プラド ＋ VIPER DS4V：エンジンスターター機能で夏冬も快適。純正キーレス連動で操作もスムーズ。スマホからのコントロールも可能です。",
        benefits: [
            "世界トップクラスの認知度と信頼性",
            "エンジンスターター内蔵モデルが豊富で冬も夏も快適",
            "スマホアプリからの操作・状態確認に対応",
            "純正キーレス連動でスマートな操作感を実現"
        ],
        image: assets.securityMenuImage,
        icon: ShieldCheck,
        color: "blue",
        upgrades: [
            { title: "ボイスモジュール", price: "+¥16,500〜", icon: Bell, description: "「Viper Armed」など、英語の音声で威嚇・通知を行います。" },
            { title: "スマホ連動ユニット", price: "+¥33,000〜", icon: Smartphone, description: "専用アプリからドアロックやエンジン始動が可能になります。" }
        ]
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button onClick={() => navigate('/security-home')} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">SECURITY HOME</span>
                    </button>
                    <h1 className="font-black text-xl tracking-tighter text-blue-700">VIPER</h1>
                    <div className="w-24"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
                    <SafeImage src={detail.image} className="w-full h-full object-cover" alt={detail.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-12 left-12">
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">{detail.title}</h2>
                        <p className="text-lg md:text-2xl text-blue-300 font-bold max-w-2xl">{detail.subtitle}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    <section className="bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-black mb-8 text-gray-900">World Standard Security</h3>
                        <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10">{detail.description}</p>
                        <div className="grid gap-4">
                            {detail.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl">
                                    <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                                    <span className="font-bold text-gray-800">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-blue-700 rounded-[3rem] p-12 text-white shadow-2xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-black mb-8 tracking-tighter">利便性の追求</h3>
                            <p className="text-blue-100 font-bold leading-relaxed mb-8">
                                バイパーの最大の特徴は、その高い利便性にあります。エンジンスターターで施工前から車内を適温にし、純正キーレスと連動させることで、セキュリティの存在を意識させないスマートな運用が可能です。
                            </p>
                        </div>
                        <div className="space-y-4">
                            <a href="https://page.line.me/312qjhsq?openQrModal=true" className="block w-full bg-white text-blue-700 text-center py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all">
                                LINEで相談予約
                            </a>
                        </div>
                    </section>
                </div>

                {/* Plan List Area */}
                {currentCategory && currentCategory.items.length > 0 && (
                    <section id="plans">
                        <h3 className="text-3xl font-black mb-12 tracking-tighter">VIPER Lineup</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentCategory.items.map((item, i) => (
                                <motion.div key={i} onClick={() => setSelectedItem(item)} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 cursor-pointer hover:border-blue-300 transition-all group">
                                    <h4 className="text-2xl font-black mb-4 group-hover:text-blue-700 transition-colors">{item.name}</h4>
                                    <div className="text-3xl font-black text-blue-600 mb-8">{formatPrice(item.price)}</div>
                                    <ul className="space-y-3 mb-8">
                                        {item.features.slice(0, 3).map((f, j) => (
                                            <li key={j} className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                                <div className="w-1 h-1 bg-blue-700 rounded-full" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="w-full text-center py-3 border border-gray-100 rounded-xl font-black text-xs group-hover:bg-blue-700 group-hover:text-white transition-all">DETAILS</div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white max-w-xl w-full rounded-[3rem] p-12 relative">
                            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"><X /></button>
                            <h2 className="text-4xl font-black mb-8">{selectedItem.name}</h2>
                            <p className="text-gray-600 font-bold mb-10 leading-relaxed">{selectedItem.description}</p>
                            <div className="text-3xl font-black mb-10">{formatPrice(selectedItem.price)}</div>
                            <button onClick={() => navigate('/reservation')} className="w-full bg-blue-700 text-white py-4 rounded-xl font-black">予約相談</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
