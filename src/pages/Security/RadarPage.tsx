import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import {
    ShieldCheck,
    ArrowLeft,
    Search,
    MessageSquare,
    Zap,
    Info,
    Layers,
    Shield,
    Wifi,
    CheckCircle2,
    X,
    Camera,
    Maximize,
    Smartphone,
    Video
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

// アイコンマッピングの定義
const iconMap: Record<string, any> = {
    Camera,
    Layers,
    Zap,
    Shield,
    Search,
    Wifi,
    Info,
    Maximize,
    Smartphone
};

export const RadarPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const categoryId = 'radar';
    const currentCategory = plans.find(p => p.id === categoryId);

    // URLのproductIdに基づいてselectedItemを同期
    React.useEffect(() => {
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
        navigate('/security/radar');
    };

    // モーダルを開く際のナビゲーション
    const handleOpen = (item: any) => {
        if (item.slug) {
            navigate(`/security/radar/${item.slug}`);
        } else {
            setSelectedItem(item);
        }
    };

    const detail = {
        title: "Radar Detector (レーダー探知機)",
        subtitle: "最新型移動オービス・レーザー取締りに対応. 安全運転をスマートにサポートします.",
        description: "最新の交通取締り情報をリアルタイムにキャッチし、ドライバーに的確な警告を提供。レーザー光を用いた最新の移動オービス（MSSS等）にも対応し、誤警報を排除した高精度の検知性能を誇ります。セキュリティー専門店ならではの「視界を妨げない、かつ操作しやすい」スマートな取付位置のご提案も可能です。",
        image: "/images/Top/radar.webp",
        icon: Search,
        color: "emerald"
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/security-home')}
                        className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-bold group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">SECURITY HOME</span>
                    </button>
                    <h1 className="font-black text-xl tracking-tighter uppercase">Radar Detector</h1>
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
                            <Search className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">{detail.title}</h2>
                        <p className="text-lg md:text-xl font-bold max-w-xl leading-snug">{detail.subtitle}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 mb-20">
                    <div className="lg:col-span-2 space-y-12">
                        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-black mb-6 text-gray-900 flex items-center gap-3">
                                <div className="w-2 h-8 rounded-full bg-emerald-500"></div>
                                最新取締機への対応
                            </h3>
                            <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10">{detail.description}</p>
                            <div className="grid sm:grid-cols-2 gap-6 mb-10">
                                {[
                                    "最新のレーダー取締機 JMA-600/520/401に完全対応",
                                    "移動式オービス MSSS / LSM の識別と警報を実現",
                                    "独自のアルゴリズムで誤警報を最大95%カット",
                                    "みちびき7機体制対応で業界屈指の測位精度"
                                ].map((benefit: string, i: number) => (
                                    <div key={i} className="flex items-start gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-600 shrink-0">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <p className="font-bold text-gray-800 text-sm leading-snug">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section className="bg-gray-950 rounded-[3rem] p-10 text-white shadow-2xl">
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                                <Zap className="w-5 h-5 text-emerald-400" />
                                お問い合わせ
                            </h3>
                            <p className="text-gray-400 text-sm font-bold leading-relaxed mb-8">
                                ユピテル指定店モデルの最新機種を取り扱っております。車種ごとの最適な取付をご案内いたします。
                            </p>
                            <div className="mt-10">
                                <a href="https://page.line.me/312qjhsq?openQrModal=true" className="flex items-center justify-center gap-3 w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-sm tracking-widest hover:scale-105 transition-all">
                                    LINEで適合相談
                                </a>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Plan List */}
                <section id="plans">
                    <div className="mb-12">
                        <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4">Lineup List<span className="text-emerald-500">.</span></h3>
                        <p className="text-gray-500 font-bold">全メーカー・最新レーダー探知機に対応. 指定店モデルも取り扱っております.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentCategory?.items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => handleOpen(item)}
                                className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col relative group overflow-hidden cursor-pointer"
                            >
                                <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden bg-white flex items-center justify-center">
                                    <SafeImage src={item.image} alt={item.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{item.badge}</span>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-2xl font-black mb-2 text-gray-900">{item.name}</h4>
                                    <div className="text-3xl font-black text-emerald-600 mb-6">{formatPrice(item.price)}</div>
                                    <div className="space-y-3 mb-8">
                                        {item.features?.slice(0, 3).map((f: string, j: number) => (
                                            <div key={j} className="flex items-center gap-3 text-xs font-bold text-gray-500">
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                {f}
                                            </div>
                                        )) || <div className="text-xs font-bold text-gray-400">詳細情報準備中</div>}
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
            </div>

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
                                        <div className="mb-10 -mx-4 md:-mx-0 bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex items-center justify-center">
                                            <SafeImage
                                                src={selectedItem.image}
                                                alt={selectedItem.name}
                                                className="w-full aspect-[16/10] object-contain p-6"
                                            />
                                        </div>
                                    )}
                                    <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">{selectedItem.badge}</span>
                                    <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">{selectedItem.name}</h2>

                                    {/* スペックサマリーのグリッド表示 */}
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

                                    {/* 走行動画 または 施工イメージ */}
                                    {(selectedItem.youtubeId || selectedItem.featureImage || selectedItem.installImages) && (
                                        <div className="mb-12">
                                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                {selectedItem.youtubeId ? <Video className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                                                {selectedItem.youtubeId ? "Product Movie / プロダクトムービー" : "Installation Image / 施工イメージ"}
                                            </h3>
                                            <div className="w-full">
                                                {selectedItem.youtubeId ? (
                                                    <div className="rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 bg-gray-50 aspect-video">
                                                        <iframe
                                                            width="100%"
                                                            height="100%"
                                                            src={`https://www.youtube.com/embed/${selectedItem.youtubeId}`}
                                                            title="Product Video"
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            allowFullScreen
                                                        ></iframe>
                                                    </div>
                                                ) : selectedItem.installImages ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {selectedItem.installImages.map((img: string, idx: number) => (
                                                            <div key={idx} className="rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
                                                                <SafeImage
                                                                    src={img}
                                                                    alt={`Installation Image ${idx + 1}`}
                                                                    className="w-full h-auto object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
                                                        <SafeImage
                                                            src={selectedItem.featureImage}
                                                            alt="Feature Image"
                                                            className="w-full h-auto object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* 詳細セクションがある場合の描画 */}
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

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-gray-100 gap-6">
                                        <div className="flex flex-col">
                                            <div className="text-3xl font-black text-gray-900">{formatPrice(selectedItem.price)}</div>
                                            <div className="text-[10px] text-gray-400 font-bold mt-1">
                                                工賃別 / 取付位置により変動します
                                            </div>
                                        </div>
                                        <button onClick={() => navigate('/reservation')} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 whitespace-nowrap">
                                            予約相談
                                        </button>
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
