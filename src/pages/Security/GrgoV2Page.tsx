import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import {
    ShieldCheck,
    Settings2,
    Search,
    CheckCircle2,
    ArrowLeft,
    X,
    MessageSquare,
    Calendar,
    Info,
    ChevronRight,
    Zap,
    Star,
    Lock
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
        title: "Grgo V2 (ゴルゴ V2)",
        subtitle: "盗難対策に特化し、最新の「キーエミュレーター」等への有効性を高めた最新モデル。",
        description: "「最恐」と言われるキーエミュレーター（ゲームボーイ）等の手口に対し、車両システムから独立したガードを提供。日本国内生産による信頼性はそのままに、機能を厳選することで驚きの低価格を実現しました。",
        sampleDescription: "【施工例】ハイエース ＋ Grgo V2：最新の盗難手口から仕事車を確実にガード。専用ハーネスにより、お車の配線加工を最小限に抑えた高品質な施工が可能です。",
        benefits: [
            "キーエミュレーター（ゲームボーイ）等の最新手口に有効",
            "機能を絞り込むことで、圧倒的なコストパフォーマンスを実現",
            "日本国内の開発・生産による、日本の環境に最適な高精度",
            "安心の製品3年保証モデル"
        ],
        image: "/images/Security/model/grgov2.webp",
        icon: ShieldCheck,
        color: "blue",
    };

    const optionalParts = [
        {
            title: "追加アンサーバックリモコン",
            model: "J-219R",
            price: "¥27,500〜",
            description: "付属品と同等の高機能リモコン。1台の車両を複数人で共有される場合に最適です。最大2台まで登録可能。",
            icon: Star
        },
        {
            title: "ハイパワーサイレン",
            model: "J-772U",
            price: "¥11,000〜",
            description: "最大113dBの大音量で周囲に異常を知らせます。警戒開始/解除時のアンサーバック音出力にも対応。",
            icon: Zap
        },
        {
            title: "バックアップサイレン",
            model: "J-765U",
            price: "¥27,500〜",
            description: "バッテリーを外されても内蔵電池で音を鳴らし続ける究極のサイレン。プロの窃盗団による電源切断にも動じません。",
            icon: ShieldCheck
        },
        {
            title: "ショックセンサー",
            model: "J-769S",
            price: "¥16,500〜",
            description: "窓ガラスを割るなどの衝撃を検知し、弱衝撃で「警告」、強衝撃で「警報」を使い分ける高精度センサー。",
            icon: Settings2
        },
        {
            title: "ドラレコ接続ケーブル",
            model: "J-767",
            price: "¥6,600〜",
            description: "ユピテル製ドラレコと連携し、警報時に自動録画を開始。犯人の姿を確実に記録します。(適合機種は要問合せ)",
            icon: MessageSquare
        },
        {
            title: "マイクロ波センサーセット",
            model: "J-768",
            price: "¥25,300〜",
            description: "接近検知センサー(OP-MDS1)と専用ケーブルのセット。車両に触れられる前に接近を検知し、即座にドラレコ録画を開始します。",
            icon: Info
        }
    ];

    const officialFeatures = [
        {
            title: "信頼の日本製",
            description: "設計から製造まで国内一貫生産。日本の生活環境・駐車状況に最適化された、誤作動の極めて少ない高精度なシステムです。",
            icon: ShieldCheck
        },
        {
            title: "独立ガードシステム",
            description: "車両システムとは完全に独立して動作するため、キーエミュレーターやCANインベーダーによる純正の突破を許しません。",
            icon: Zap
        },
        {
            title: "ダブルイモビライザー",
            description: "警戒中はパワースイッチを押してもエンジン始動を無効化。さらに設定により自動でイモビライザーが作動する機能も搭載。",
            icon: Lock
        },
        {
            title: "アンサーバック・液晶",
            description: "異常をリモコンに画面表示・ブザー・振動で即座に通知。不正なドア開、ブレーキON、IG ONなどの原因を特定可能です。",
            icon: MessageSquare
        },
        {
            title: "スマートキー連動",
            description: "純正スマートキーとGrgoリモコンを携帯していれば、操作を行うことなく自動でセキュリティ解除/警戒開始が可能です。",
            icon: Star
        },
        {
            title: "オート機能搭載",
            description: "警戒操作を忘れた場合でも、設定時間で自動的に警戒を開始するオートアームやオートイモビライザー機能を備えています。",
            icon: Settings2
        }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-white pb-24">
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
                    <h1 className="font-black text-xl tracking-tighter text-blue-600">Grgo V2</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/reservation')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-black text-xs shadow-lg shadow-blue-200">
                            CONSULTATION
                        </button>
                    </div>
                </div>
            </div>

            {/* Special Feature Hero */}
            <div className="bg-gray-950 text-white py-20 overflow-hidden relative">
                <div className="absolute inset-0 opacity-20">
                    <SafeImage src={detail.image} className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-grow">
                            <span className="inline-block bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 shadow-xl">
                                Anti-Theft Special Edition
                            </span>
                            <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none italic underline decoration-blue-600">
                                Grgo V2<span className="text-blue-600 text-3xl align-top">.</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-300 font-bold max-w-xl leading-tight">
                                {detail.subtitle}
                            </p>
                        </div>
                        <div className="w-full md:w-80 shrink-0">
                            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-sm font-black text-blue-400">最新対策モデル</span>
                                </div>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed mb-8">
                                    キーエミュレーター等の最新盗難手口に対し、車両システムから独立した確実な防衛手段を提供します。
                                </p>
                                <a href="https://page.line.me/312qjhsq?openQrModal=true" className="block w-full bg-blue-600 text-white text-center py-4 rounded-2xl font-black text-sm tracking-widest hover:scale-105 transition-all">
                                    LINEで無料診断
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Detailed Analysis Section */}
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                    <div>
                        <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-gray-900 leading-[1.05]">
                            車両システムとは<br /><span className="text-blue-600 font-black italic">「独立した」</span><br />鉄壁の守り。
                        </h3>
                        <div className="space-y-6">
                            <p className="text-gray-600 text-lg font-bold leading-relaxed border-l-4 border-blue-600 pl-6">
                                現在、猛威を振るう「キーエミュレーター（通称 ゲームボーイ）」は、純正キーの電波を複製し車両システムを欺く手口です。
                            </p>
                            <p className="text-gray-600 text-lg font-bold">
                                Grgo V2は、車両のスマートキーシステムとは完全に切り離された独自の防衛ラインを構築。たとえ純正ロックが突破されても、独立したイモビライザーがエンジンの始動を阻止し、自走による盗難を徹底的に防ぎます。
                            </p>
                            <div className="pt-8 p-10 bg-blue-50 rounded-[3rem] border border-blue-100">
                                <h4 className="text-sm font-black text-blue-600 mb-4 uppercase tracking-widest">Model Info</h4>
                                <p className="text-gray-900 font-black text-xl mb-6">Grgo V2は特定車種限定モデルです。</p>
                                <p className="text-gray-600 font-bold text-sm mb-8 leading-relaxed">
                                    対応車種をランクル、レクサスLX/RX/NX、アルファード等のハイリスク車に絞り込み、機能を盗難対策に特化。日本一とも言われる「Grgo」の信頼性を、驚きの低コストで提供します。
                                </p>
                                <button
                                    onClick={() => window.open('https://www.yupiteru.co.jp/products/security/grgo-v2/compatibility.html', '_blank')}
                                    className="flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm border border-blue-200 hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-200/50"
                                >
                                    公式 適合車種一覧を確認
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {officialFeatures.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-3xl border border-gray-100 flex gap-6 hover:shadow-xl transition-all"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center shrink-0">
                                    <feature.icon className="w-7 h-7 text-blue-600" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="text-sm font-black text-gray-900 mb-1">{feature.title}</h4>
                                    <p className="text-[11px] font-bold text-gray-400 leading-normal">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Remote Introduction Section */}
                <div className="mb-32 bg-gray-50 rounded-[4rem] overflow-hidden border border-gray-100 shadow-sm relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="p-12 md:p-20 order-2 lg:order-1">
                            <span className="inline-block bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-8">
                                5-Button Answer-back Remote
                            </span>
                            <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-8 leading-tight">
                                愛車の状態を<br />
                                <span className="text-blue-600 italic">手の平で把握。</span>
                            </h3>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-800 text-lg mb-2">液晶通知機能</h4>
                                        <p className="text-gray-500 font-bold text-sm leading-relaxed">
                                            ドアの開放や衝撃検知など、異常の発生をアイコンとテキストで分かりやすく表示。離れた場所でも瞬時に状況を把握できます。
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                        <Zap className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-800 text-lg mb-2">音と振動でお知らせ</h4>
                                        <p className="text-gray-500 font-bold text-sm leading-relaxed">
                                            ブザー音とバイブレーションにより、ポケットの中でも確実に異常を通知。マナーモード設定も可能です。
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-800 text-lg mb-2">小電力電波型</h4>
                                        <p className="text-gray-500 font-bold text-sm leading-relaxed">
                                            電池寿命を考慮した設計ながら、確実な双方向通信を実現。スペアとしての追加登録（最大2台）もスムーズに行えます。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[400px] lg:h-full min-h-[500px] bg-white lg:order-2">
                            <SafeImage src="/images/Security/model/grgov2-key.webp" className="w-full h-full object-contain p-12 lg:p-24" />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-gray-50/10"></div>
                        </div>
                    </div>
                </div>

                {/* Optional Parts Section */}
                <div className="mb-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h3 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
                                選べるシステム拡張。<span className="text-blue-600 italic">OPTIONAL PARTS</span>
                            </h3>
                            <p className="text-gray-500 font-bold text-sm max-w-2xl leading-relaxed">
                                Grgo V2は、お客様の駐車環境に合わせて最適な機能を拡張可能です。特におすすめの6つのオプションをご用意しました。
                            </p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {optionalParts.map((part, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-blue-200 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <part.icon className="w-7 h-7" />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-blue-600 tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block mb-1 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            {part.model}
                                        </div>
                                        <div className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {part.price}
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-xl font-black text-gray-900 mb-4">{part.title}</h4>
                                <p className="text-sm font-bold text-gray-400 leading-relaxed group-hover:text-gray-600 transition-colors">
                                    {part.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Plan List */}
                <section id="plans">
                    <div className="mb-12">
                        <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4">Grgo V2 Lineup<span className="text-blue-600">.</span></h3>
                        <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
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
                                    <SafeImage src={item.image || assets.securityMenuImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{item.badge}</span>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-2xl font-black mb-2 text-gray-900">{item.name}</h4>
                                    <div className="text-3xl font-black text-blue-600 mb-6">{formatPrice(item.price)}</div>
                                    <div className="space-y-3 mb-8">
                                        {(item.features || []).slice(0, 3).map((f, j) => (
                                            <div key={j} className="flex items-center gap-3 text-xs font-bold text-gray-500">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="w-full bg-gray-950 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all shadow-lg">
                                    DETAILS
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Plan Detail Modal - Simplified for this page */}
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
                                <div className="text-gray-600 font-bold leading-relaxed mb-10 text-lg">
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
                                    <div className="text-3xl font-black text-gray-900">{formatPrice(selectedItem.price)}<span className="text-xs text-gray-400 font-bold ml-2">税込・工賃込</span></div>
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
