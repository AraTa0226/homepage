import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import {
    Video,
    Eye,
    ShieldCheck,
    CheckCircle2,
    ArrowLeft,
    Camera,
    Layers,
    Shield,
    X,
    MessageSquare,
    Calendar,
    Info,
    ChevronRight,
    Zap,
    HardDrive
} from 'lucide-react';

// アイコンマッピングの定義
const iconMap: Record<string, any> = {
    Camera,
    Layers,
    Zap,
    Shield,
    HardDrive,
    Info
};
import { SafeImage } from '../../components/ui/SafeImage';

export const DriveRecorderPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const categoryId = 'dashcam';
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
        navigate('/security/drive_recorder');
    };

    // モーダルを開く際のナビゲーション
    const handleOpen = (item: any) => {
        if (item.slug) {
            navigate(`/security/drive_recorder/${item.slug}`);
        } else {
            setSelectedItem(item);
        }
    };

    const detail = {
        title: "Drive Recorder (ドライブレコーダー)",
        subtitle: "万が一の瞬間を、決定的な証拠として記録。最新のAI技術と連動機能で愛車を守ります。",
        description: "高度化する車両盗難やあおり運転から愛車を守るために。ドライブレコーダーは今や、万が一の際の決定的な証拠となるだけでなく、カーセキュリティと連動させることで『事後』だけでなく『未然に防ぐ』ための重要な監視デバイスとなります。当店では、画質や画角といったカタログスペックだけでなく、駐車監視時のバッテリー負荷やLED信号機との同期問題など、実用面での信頼性を重視。専門業者ならではの確かな施工技術とともに、お客様の走行環境に最適な構成をご提案いたします。",
        merits: {
            threeCamera: {
                title: "3カメラモデルのメリット",
                content: "フロントカメラ＋リアデュアルカメラという組み合わせ。後方から撮影する前方の映像は後ろから見渡すように見えるため状況がわかりやすいのが特徴です。前方カメラは前方だけに特化するため設置位置の汎用性が高く、360°撮影レンズで懸念される干渉物の影響も最小限に抑えられます。室内映像は後方からの撮影となるため、同乗者の顔などが映らずプライバシー配慮にも有効で、魚眼レンズと比べても映像が非常に明瞭です。"
            },
            security: {
                title: "セキュリティ連動と高度な監視",
                content: "電源監視ユニットを標準装備し、オプション無しでの自動駐車監視切り替えや、最速2秒での録画スタートを可能としました。カーセキュリティーとの連動では、盗難防止の防犯カメラとして威力を発揮します。運転席横の映像を重視する場合は360°モデルがベターですが、用途に合わせて最適な構成をご提案します。オプションのマイクロ波センサーを追加すれば、より高度な駐車監視が可能です。"
            }
        },
        benefits: [
            "最新のSTARVIS2搭載モデルによる圧倒的な夜間視認性",
            "人検知A.Iによる駐車中の高度なイタズラ監視記録",
            "360度全方位＋リアカメラによる死角のない全周囲カバー",
            "SDカードフォーマット不要の新方式でメンテナンスフリー"
        ],
        image: assets.dashcamMenuImage,
        icon: Video,
        color: "blue",
        upgrades: [
            { title: "マイクロ波センサー", price: "+¥16,500〜", icon: ShieldCheck, description: "車両への接近を検知し、より高度な駐車監視録画を可能にします。" },
            { title: "マルチバッテリー", price: "+¥27,500〜", icon: Zap, description: "車両バッテリーへの負荷をゼロにし、長時間の駐車録画を実現します。" }
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
                    <h1 className="font-black text-xl tracking-tighter uppercase">Drive Recorder</h1>
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
                            <div className="grid md:grid-cols-2 gap-8 mt-12 mb-10">
                                <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-200">
                                    <h4 className="text-sm font-black mb-4 uppercase tracking-[0.2em] text-blue-600">{detail.merits.threeCamera.title}</h4>
                                    <p className="text-gray-800 font-bold leading-relaxed text-sm italic">{detail.merits.threeCamera.content}</p>
                                </div>
                                <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-200">
                                    <h4 className="text-sm font-black mb-4 uppercase tracking-[0.2em] text-blue-600">{detail.merits.security.title}</h4>
                                    <p className="text-gray-800 font-bold leading-relaxed text-sm italic">{detail.merits.security.content}</p>
                                </div>
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
                                onClick={() => handleOpen(item)}
                                className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col relative group overflow-hidden cursor-pointer"
                            >
                                {item.image !== "" && (
                                    <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden bg-white flex items-center justify-center">
                                        <SafeImage src={item.image || assets.dashcamMenuImage} alt={item.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4">
                                    <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{item.badge}</span>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-2xl font-black mb-2 text-gray-900">{item.name}</h4>
                                    <div className="text-3xl font-black text-blue-600 mb-6">{formatPrice(item.price)}</div>
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
                                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all shadow-lg"
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
                                    <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">{selectedItem.badge}</span>
                                    <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">{selectedItem.name}</h2>

                                    {/* スペックサマリーのグリッド表示 */}
                                    {selectedItem.specSummary && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                                            {selectedItem.specSummary.map((spec: any, sIdx: number) => {
                                                const Icon = iconMap[spec.icon] || Info;
                                                return (
                                                    <div key={sIdx} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center text-center group hover:border-blue-200 transition-colors">
                                                        <Icon className="w-5 h-5 text-blue-500 mb-2" />
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

                                    {/* YouTube動画の埋め込み */}
                                    {/* YouTube動画の埋め込み または 静止画の表示 */}
                                    {(selectedItem.youtubeId || selectedItem.featureImage) && (
                                        <div className="mb-12">
                                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                {selectedItem.youtubeId ? <Video className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                                                {selectedItem.youtubeId ? "Actual Footage / 走行動画" : "Feature Image / 機能イメージ"}
                                            </h3>
                                            <div className="w-full rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
                                                {selectedItem.youtubeId ? (
                                                    <div className="aspect-video">
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
                                                ) : (
                                                    <SafeImage
                                                        src={selectedItem.featureImage}
                                                        alt="Feature Image"
                                                        className="w-full h-auto object-cover"
                                                    />
                                                )}
                                            </div>
                                            <p className="mt-4 text-[10px] text-gray-400 font-bold text-center italic">
                                                {selectedItem.youtubeId ? "※メーカー公式YouTubeより引用" : "※機能イメージ画像"}
                                            </p>
                                        </div>
                                    )}

                                    {/* 詳細セクションがある場合の描画 */}
                                    {selectedItem.detailedSections && (
                                        <div className="space-y-8 mb-12">
                                            {selectedItem.detailedSections.map((section: any, sIdx: number) => (
                                                <div key={sIdx} className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                                    <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-3">
                                                        <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
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
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                                    <span className="text-xs font-bold text-gray-700">{f}</span>
                                                </div>
                                            )) || <div className="col-span-full text-center text-gray-400 font-bold py-8">機能詳細情報を準備しております。</div>}
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-gray-100 gap-6">
                                        <div className="flex flex-col">
                                            <div className="text-3xl font-black text-gray-900">{formatPrice(selectedItem.price)}</div>
                                            {(selectedItem.link || selectedItem.url) ? (
                                                <div className="text-[10px] text-gray-400 font-bold mt-1 max-w-[200px] truncate">
                                                    URL: {selectedItem.link || selectedItem.url}
                                                </div>
                                            ) : (
                                                <div className="text-[10px] text-gray-300 font-bold mt-1 italic">
                                                    製品個別ページ準備中
                                                </div>
                                            )}
                                        </div>
                                        <a
                                            href="https://page.line.me/312qjhsq?openQrModal=true"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-[#06c755] text-white px-10 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-[#06c755]/20 active:scale-95 whitespace-nowrap flex items-center justify-center gap-2"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            LINEで相談
                                        </a>
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
