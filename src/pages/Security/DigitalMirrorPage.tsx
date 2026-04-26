import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowLeft, Camera, Maximize, Zap, Info, CheckCircle2, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import { SafeImage } from '../../components/ui/SafeImage';

// アイコンマッピングの定義
const iconMap: Record<string, any> = {
    Camera,
    Maximize,
    Zap,
    Shield,
    Info
};

export const DigitalMirrorPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const categoryId = 'digital_mirror';
    const currentCategory = plans.find(p => p.id === categoryId);

    // URLのproductIdに基づいてselectedItemを同期
    useEffect(() => {
        if (productId && currentCategory) {
            const item = currentCategory.items.find((i: any) => i.slug === productId);
            if (item) {
                setSelectedItem(item);
            } else {
                setSelectedItem(null);
            }
        } else {
            setSelectedItem(null);
        }
    }, [productId, currentCategory]);

    // モーダルを閉じる際のナビゲーション
    const handleClose = () => {
        navigate('/security-home/d-mirror');
    };

    // モーダルを開く際のナビゲーション
    const handleOpen = (item: any) => {
        if (item.slug) {
            navigate(`/security-home/d-mirror/${item.slug}`);
        } else {
            setSelectedItem(item);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/security-home')}
                        className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-bold group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-black tracking-widest uppercase">SECURITY HOME</span>
                    </button>
                    <h1 className="font-black text-xl tracking-tighter italic uppercase">Digital Mirror<span className="text-emerald-500">.</span></h1>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/reservation')} className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-black text-xs">
                            RESERVATION
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/Security/d-mirror/hero-d-mirror.webp"
                        alt="Digital Inner Mirror Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic drop-shadow-2xl">
                            Digital Inner Mirror<span className="text-emerald-500">.</span>
                        </h1>
                        <p className="text-emerald-400 font-black tracking-[0.4em] uppercase text-xs md:text-sm">
                            Next Generation Rear View System
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black tracking-widest uppercase shadow-sm">
                            <Shield className="w-4 h-4" />
                            Premium Safety Upgrade
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            純正ミラー交換タイプで、<br />
                            後方の「安心」を可視化する。
                        </h2>
                        <p className="text-gray-500 font-bold text-lg leading-relaxed">
                            {currentCategory?.description || "純正ミラーでは死角となる後方の状況を、液晶モニターで鮮明に表示。荷物や同乗者で後方が見えにくい場合でも、クリアな視界を確保します。最新モデルは前後ドライブレコーダー機能も統合され、よりスマートな車内環境を実現します。"}
                        </p>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                        <img
                            src="/images/Security/d-mirror/hero-d-mirror.webp"
                            alt="Feature"
                            className="relative w-full rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                    </div>
                </div>

                {/* Lineup List */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 uppercase">Lineup List<span className="text-emerald-500">.</span></h3>
                        <p className="text-gray-500 font-bold">アルパイン、セルスター、マックスウィン等、厳選したモデルをご提案します。</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentCategory?.items.map((item: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => handleOpen(item)}
                            className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col relative group overflow-hidden cursor-pointer hover:border-emerald-500/30 transition-colors"
                        >
                            <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden bg-gray-50 flex items-center justify-center">
                                <SafeImage src={item.image} alt={item.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-4 right-4">
                                    <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{item.badge}</span>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <h4 className="text-2xl font-black mb-2 text-gray-900 tracking-tight whitespace-pre-wrap">{item.name}</h4>
                                {parseInt(item.price) > 0 && (
                                    <div className="text-3xl font-black text-emerald-600 mb-6">{formatPrice(item.price)}</div>
                                )}
                                <div className="space-y-3 mb-8">
                                    {item.features?.slice(0, 3).map((f: string, j: number) => (
                                        <div key={j} className="flex items-center gap-3 text-xs font-bold text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpen(item);
                                }}
                                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-emerald-600 transition-all shadow-lg"
                            >
                                VIEW DETAILS
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-50 py-24 mb-12">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                        <Zap className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">車種専用モデルも承っております</h2>
                        <p className="text-gray-500 font-bold text-lg leading-relaxed">
                            国産車、輸入車問わず、車種専用設計のアームを用いたスマートな取付に対応いたします。<br />
                            施工時間や適合の確認は、LINEにてお気軽にお問い合わせください。
                        </p>
                    </div>
                    <div className="pt-8">
                        <a href="https://page.line.me/312qjhsq?openQrModal=true" className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm tracking-widest hover:bg-emerald-700 transition-all shadow-xl hover:scale-105">
                            LINEで適合・見積もり相談
                        </a>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-gray-950/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-2xl max-h-[90vh] rounded-[3rem] shadow-2xl flex flex-col relative overflow-hidden"
                        >
                            <button onClick={handleClose} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center text-gray-900 z-30 border border-gray-100 hover:bg-gray-50 transition-colors">
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex-1 overflow-y-auto p-8 md:p-12 text-gray-900">
                                <div className="pt-4">
                                    {selectedItem.image && (
                                        <div className="mb-10 bg-gray-50 rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center">
                                            <SafeImage
                                                src={selectedItem.image}
                                                alt={selectedItem.name}
                                                className="w-full aspect-[16/10] object-contain p-6"
                                            />
                                        </div>
                                    )}
                                    <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">{selectedItem.badge}</span>
                                    <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter leading-tight italic">{selectedItem.name}</h2>

                                    {/* スペックサマリー */}
                                    {selectedItem.specSummary && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                                            {selectedItem.specSummary.map((spec: any, sIdx: number) => {
                                                const Icon = iconMap[spec.icon] || Info;
                                                return (
                                                    <div key={sIdx} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center text-center group hover:border-emerald-200 transition-colors">
                                                        <Icon className="w-5 h-5 text-emerald-500 mb-2" />
                                                        <div className="text-[10px] text-gray-400 font-bold mb-1">{spec.label}</div>
                                                        <div className="text-[11px] text-gray-900 font-extrabold leading-tight">{spec.value}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    <div className="text-gray-600 font-bold leading-relaxed mb-10">
                                        {selectedItem.description}
                                    </div>

                                    {/* 詳細セクション */}
                                    {selectedItem.detailedSections && (
                                        <div className="space-y-8 mb-12">
                                            {selectedItem.detailedSections.map((section: any, sIdx: number) => (
                                                <div key={sIdx} className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                                    <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-3">
                                                        <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                                        {section.title}
                                                    </h3>
                                                    <div className="text-sm text-gray-600 font-bold leading-loose whitespace-pre-wrap">
                                                        {section.content}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {!selectedItem.detailedSections && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                                            {selectedItem.features?.map((f: string, idx: number) => (
                                                <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                                    <span className="text-xs font-bold text-gray-700">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-gray-100 gap-6">
                                        {parseInt(selectedItem.price) > 0 && (
                                            <div className="flex flex-col">
                                                <div className="text-3xl font-black text-gray-900">{formatPrice(selectedItem.price)}</div>
                                                <div className="text-[10px] text-gray-400 font-bold mt-1 italic">
                                                    標準工賃込：お問い合わせください
                                                </div>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => navigate('/reservation')}
                                            className={`bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 whitespace-nowrap ${parseInt(selectedItem.price) <= 0 ? 'w-full sm:w-auto ml-auto' : ''}`}
                                        >
                                            施工予約・相談
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
