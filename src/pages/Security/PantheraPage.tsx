import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import {
    ShieldCheck,
    Settings2,
    Zap,
    CheckCircle2,
    ArrowLeft,
    X,
    MessageSquare,
    ChevronRight,
    Star,
    Lock,
    Radio,
    Activity,
    Bell,
    Video,
    Calendar
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

export const PantheraPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const categoryId = 'security_panthera';
    const currentCategory = plans.find(p => p.id === categoryId);

    const detail = {
        title: "Panthera (パンテーラ)",
        subtitle: "日本最高峰のセキュリティシステムを誇る、最強の安心を。",
        description: "純正キーの電波を悪用する「リレーアタック」や、車両システムをハッキングする「CANインベンター」にも完全対応。益々巧妙化する盗難手口から、大切な愛車を守り抜きます。",
        image: "/images/Security/model/panthera.webp",
        remoteImage: "/images/Security/model/panthera-key.webp"
    };

    const models = [
        {
            id: "z706",
            name: "Z706",
            tag: "フルスペック・フラッグシップ",
            description: "全てのセンサを装備。シリーズ最高位の鉄壁ガード。",
            longDescription: "Pantheraシリーズの頂点に君臨するフルスペックモデル。3ゾーン・ワイドエリアマイクロ波センサー、トリプルセンサー、デジタル傾斜センサー、IRセンサーの全てを標準装備しています。アルゴリズムによる緻密な解析により、強風や振動などの環境ノイズを排除しながら、実害となる接近や衝撃のみを確実に捉えます。バックアップサイレンも標準装備され、車両バッテリーを外されるようなプロの犯行に対しても、独立電源で警報を鳴らし続けます。高級SUVやスポーツカー、屋外駐車場を利用されるオーナー様に、究極の安心をお届けするフラッグシップです。",
            features: [
                "全センサー標準装備（フルスペック）",
                "3ゾーン・ワイドエリアマイクロ波センサ",
                "トリプルセンサ / デジタル傾斜センサ",
                "IRセンサ / バックアップサイレン",
                "ハイブリッド・プロテクション"
            ],
            specs: {
                "警戒モード": "ARM1 / ARM2 / ARM3 / ARM4（環境別設定可能）",
                "イモビライザー": "デジタル×アナログによる多重遮断（ハイブリッド）",
                "センサー解析": "スーパーアルゴリズム解析（誤作動の極限排除）",
                "サイレン": "ハイパワーサイレン + 独立電源バックアップサイレン",
                "リモコン": "フルカラー液晶・バイブレーション通知機能付",
                "拡張性": "全てのPantheraオプションに対応"
            }
        },
        {
            id: "z306",
            name: "Z306",
            tag: "アドバンスド・ハイスペック",
            description: "人気の常用ユニットを標準装備した、攻守のバランスに優れたモデル。",
            longDescription: "Pantheraの卓越した解析能力をベースに、ユーザーからの要望が特に多い「トリプルセンサー」と「デジタル傾斜センサー」を標準装備したモデルです。ジャッキアップ時の微細な傾斜（0.1度単位）や、ボディへの軽微な衝撃も逃さず検知。レクサスやトヨタのSUVなど、ホイール盗難やパーツ盗難のターゲットになりやすい車両に最適なバランスを実現しています。アンサーバックリモコンから環境に合わせて4つの警戒モード（ARM）を瞬時に切り替えられるため、自宅、外出先、立体駐車場など、シチュエーションを選ばず最適な守りを提供します。",
            features: [
                "トリプルセンサ標準装備",
                "デジタル傾斜センサ標準装備",
                "ハイパワーサイレン",
                "ハイブリッド・プロテクション",
                "暗い場所でも視認性の高い液晶リモコン"
            ],
            specs: {
                "傾斜検知": "高精度デジタル傾斜センサー（ジャッキアップ対策）",
                "衝撃検知": "3ゾーン（弱・中・攻撃）独立感度調整可能",
                "イモビライザー": "標準装備（最新車両エラー対策済）",
                "サイレン": "125dBハイパワーサイレン",
                "操作性": "フルカラー液晶アンサーバックリモコン",
                "推奨車種": "SUV / スポーツカー / 輸出人気車種"
            }
        },
        {
            id: "z106",
            name: "Z106",
            tag: "スタンダード・ベーシック",
            description: "ニーズに合わせて自由に拡張可能な、Pantheraの基本性能を凝縮。",
            longDescription: "Panthera独自の高度なインテリジェント解析アルゴリズムをそのままに、機能を厳選したエントリーモデルです。ドア、ボンネット、トランクの全開放検知に加え、3ゾーンショックセンサーを搭載。特定の環境に合わせたカスタマイズを前提としており、必要に応じて各センサーをオプションで後から追加することが可能です。ベースとなる解析能力や通信の安定性は上位モデルと全く同一のため、シンプルながらも信頼性の高いセキュリティを求めるオーナー様に選ばれています。",
            features: [
                "3ゾーンショックセンサ",
                "ハイブリッド・プロテクション",
                "ハイパワーサイレン",
                "特定小電力無線リモコン（技適適合）",
                "将来的なセンサー拡張に対応"
            ],
            specs: {
                "基本検知": "ドア / ボンネット / トランク開放 / 衝撃",
                "解析ロジック": "上位共通パンテーラ・アルゴリズム",
                "イモビライザー": "ハイブリッド・プロテクション（標準）",
                "通知体系": "液晶アンサーバック / ブザー / 振動",
                "拡張用ポート": "オプションセンサー接続用ポート完備",
                "コンセプト": "必要十分な基本性能と柔軟な拡張性"
            }
        }
    ];

    const techSpecs = [
        { title: "ハイブリッド・プロテクション", desc: "最新車両の電子制御に合わせ、オプションのCANガード等と連携した最新の多重遮断を構築。", icon: Lock },
        { title: "VAS・IMBマーク取得", desc: "国土交通省の技術基準に適合。信頼の国内登録製品です。", icon: CheckCircle2 },
        { title: "4つの警戒モード", desc: "駐車環境に合わせ、リモコンで瞬時に感度設定を切り替え可能。", icon: Settings2 },
        { title: "ドラレコ連携", desc: "異常検知時にドラレコ（ユピテル製）を自動起動し証拠を記録。", icon: Video }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-white">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/security-home')}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-bold group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">SECURITY HOME</span>
                    </button>
                    <h1 className="font-black text-xl tracking-tighter text-blue-600 uppercase">Panthera Z-Series</h1>
                    <button onClick={() => navigate('/reservation')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-black text-xs shadow-lg shadow-blue-200">
                        CONSULTATION
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] bg-black overflow-hidden flex items-center">
                <div className="absolute inset-0 opacity-40">
                    <SafeImage src={detail.image} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Flagship Model</span>
                            <span className="text-white/50 text-[10px] font-black uppercase tracking-widest">Made in Japan</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none italic uppercase">
                            Panthera<span className="text-blue-600 text-3xl align-top">.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-300 font-bold leading-tight mb-12">
                            {detail.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#lineup" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-600/30 text-center min-w-[200px]">
                                LINE UP
                            </a>
                            <button onClick={() => navigate('/reservation')} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-white hover:text-black transition-all min-w-[200px]">
                                お問い合わせ
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tech Specs Grid */}
            <section className="py-32 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {techSpecs.map((spec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                                    <spec.icon className="w-7 h-7" />
                                </div>
                                <h4 className="text-lg font-black text-gray-900 mb-3">{spec.title}</h4>
                                <p className="text-sm font-bold text-gray-400 leading-relaxed">{spec.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h3 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
                            機能比較。 <span className="text-blue-600 italic">COMPARISON</span>
                        </h3>
                        <p className="text-gray-500 font-bold">主要3モデルの機能・センサー搭載状況を比較します。</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b-2 border-gray-900">
                                    <th className="py-6 px-4 text-xs font-black uppercase tracking-widest text-gray-400">機能・センサー</th>
                                    <th className="py-6 px-4 text-center text-xl font-black italic">Z706</th>
                                    <th className="py-6 px-4 text-center text-xl font-black italic">Z306</th>
                                    <th className="py-6 px-4 text-center text-xl font-black italic">Z106</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-bold">
                                {[
                                    { name: "ハイブリッド・プロテクション", z7: "●", z3: "●", z1: "●" },
                                    { name: "衝撃検知 (強・弱)", z7: "●", z3: "●", z1: "●" },
                                    { name: "ドア/ボンネット/トランク開放検知", z7: "●", z3: "●", z1: "●" },
                                    { name: "接近検知 (マイクロ波)", z7: "●", z3: "OP", z1: "OP" },
                                    { name: "デジタル傾斜検知", z7: "●", z3: "●", z1: "OP" },
                                    { name: "IRセンサ (車内侵入検知)", z7: "●", z3: "OP", z1: "OP" },
                                    { name: "トリプルセンサ", z7: "●", z3: "●", z1: "OP" },
                                    { name: "バックアップサイレン", z7: "●", z3: "OP", z1: "OP" },
                                    { name: "カメラ録画連携 (ユピテル製)", z7: "●", z3: "●", z1: "●" },
                                    { name: "アンサーバックリモコン", z7: "●", z3: "●", z1: "●" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-6 px-4 text-gray-900">{row.name}</td>
                                        <td className="py-6 px-4 text-center text-blue-600 text-lg font-black">{row.z7}</td>
                                        <td className="py-6 px-4 text-center text-gray-400">{row.z3}</td>
                                        <td className="py-6 px-4 text-center text-gray-400">{row.z1}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Strategic Synergy: CAN Guard Section */}
            <section className="py-32 bg-gray-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-600/20 rounded-full border border-blue-600/30 mb-8">
                                <Zap className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Strategic Synergy</span>
                            </div>
                            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-tight italic">
                                スマートキーの利便性と、<br />
                                <span className="text-blue-600">鉄壁の防御を両立。</span>
                            </h3>
                            <p className="text-gray-400 text-lg font-bold leading-relaxed mb-10">
                                Pantheraの多機能な警戒システムに、最新のデジタル防御<span className="text-white">「CANガード（オプション）」</span>を統合。
                                最新車両で懸念されるシステムエラーのリスクを排除しつつ、純正スマートキーの利便性を完璧に維持。デジタル（CANガード）とシステム（Panthera）が幾重にも重なる「ハイブリッド・ディフェンス」が、CANインベーダーやキーエミュレーター（通称：ゲームボーイ）といった現代のあらゆる盗難ルートを封鎖します。
                            </p>
                            <div className="flex flex-wrap gap-4 text-white">
                                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                                    <p className="text-[10px] font-black text-blue-500 uppercase mb-1">Benefit 01</p>
                                    <p className="font-bold text-sm">スマートキー連動を維持</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                                    <p className="text-[10px] font-black text-blue-500 uppercase mb-1">Benefit 02</p>
                                    <p className="font-bold text-sm">CANインベーダー&ゲームボーイ無効化</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative aspect-video rounded-[3rem] overflow-hidden border border-white/10">
                            <SafeImage src="/images/Security/model/panthera.webp" className="w-full h-full object-cover scale-150 grayscale opacity-40" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-600 blur-[60px] opacity-40 animate-pulse"></div>
                                    <ShieldCheck className="w-32 h-32 text-blue-600 relative z-10 drop-shadow-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Panthera Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-3xl mb-24">
                        <span className="text-blue-600 font-black tracking-[0.4em] uppercase text-xs mb-4 block">The Ultimate Choice</span>
                        <h3 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter italic leading-[1.1]">
                            なぜ、<br />Pantheraなのか。
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 text-gray-900">
                        <div className="space-y-6">
                            <div className="w-16 h-16 rounded-[2rem] bg-blue-50 flex items-center justify-center text-blue-600 mb-8">
                                <Activity className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-black italic border-l-4 border-blue-600 pl-6">誤作動を排除する、<br />極限の解析精度。</h4>
                            <p className="text-gray-500 font-bold leading-relaxed">
                                Pantheraが最高峰とされる最大の理由は、その「解析精度」にあります。独自のアルゴリズムが環境ノイズと実害を瞬時に判別。32段階という緻密なセンサー調整により、日本の過密な駐車環境下でも「鳴るべき時だけ鳴る」信頼性を実現しています。
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-16 h-16 rounded-[2rem] bg-blue-50 flex items-center justify-center text-blue-600 mb-8">
                                <Lock className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-black italic border-l-4 border-blue-600 pl-6">デジタルとアナログ、<br />究極のハイブリッド。</h4>
                            <p className="text-gray-500 font-bold leading-relaxed">
                                最新車両の複雑な電子システムでは、単純な回路カットは深刻なエラーの原因となります。ANGでは、Pantheraの強固なシステム防衛に加えて、<span className="text-gray-900">オプションの「CANガード」を同時施工</span>することで、デジタルとアナログを高度に統合。車両へのダメージを避けつつ、最新のデジタル窃盗と古典的な物理破壊の両面を完璧に封じ込めるハイブリッド施工を確立しています。
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-16 h-16 rounded-[2rem] bg-blue-50 flex items-center justify-center text-blue-600 mb-8">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-black italic border-l-4 border-blue-600 pl-6">日本生まれの、<br />日本専用設計。</h4>
                            <p className="text-gray-500 font-bold leading-relaxed">
                                海外製セキュリティにはない、日本の気候、複雑な駐車事情、そして日本の車泥棒の手口を熟知。ユピテルの長年の実績が注ぎ込まれたPantheraは、日本のオーナー様のためにゼロから設計された、まさにメイドインジャパンの守護神です。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Remote Info Section */}
            <section className="py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-10 leading-tight">
                                最高峰の安心を、<br /><span className="text-blue-600 italic">その手に。</span>
                            </h3>
                            <p className="text-gray-600 text-lg font-bold leading-relaxed mb-12">
                                異常の発生を液晶画面でお知らせするアンサーバック機能を搭載。衝撃検知、各ドアやボンネットの開放など、車両の状態をアイコンとテキストで瞬時に把握できます。また、各センサーの感度設定もリモコンから32段階で細かく調整可能です。
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                                    <Bell className="w-6 h-6 text-blue-600 mb-4" />
                                    <h5 className="font-black text-gray-900 mb-1">通知機能</h5>
                                    <p className="text-xs font-bold text-blue-600">画面+ブザー+振動</p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                                    <Activity className="w-6 h-6 text-blue-600 mb-4" />
                                    <h5 className="font-black text-gray-900 mb-1">感度設定</h5>
                                    <p className="text-xs font-bold text-blue-600">32段階調整</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-[5rem] p-12 md:p-24 order-1 lg:order-2 flex items-center justify-center relative">
                            <SafeImage src={detail.remoteImage} className="w-full max-w-sm drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]" />
                            <div className="absolute top-12 right-12 w-32 h-32 bg-blue-600 blur-[80px] opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Models Lineup */}
            <section id="lineup" className="py-32 bg-gray-950 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-24">
                        <span className="text-blue-500 text-xs font-black uppercase tracking-[0.3em] mb-4 inline-block">Z-Series Selection</span>
                        <h3 className="text-4xl md:text-7xl font-black tracking-tighter italic">Models Lineup<span className="text-blue-600">.</span></h3>
                        <p className="text-gray-400 font-bold mt-6 max-w-2xl mx-auto">
                            最高峰のセキュリティ性能を、あなたのライフスタイルに合わせて。
                            プロの技術者が、車両の特性と保管環境に最適な構成をご提案します。
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {models.map((model) => (
                            <motion.div
                                key={model.id}
                                whileHover={{ y: -10 }}
                                className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10 backdrop-blur-xl flex flex-col hover:bg-white/10 transition-all border-b-4 border-b-blue-600"
                            >
                                <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4 inline-block">{model.tag}</span>
                                <h4 className="text-5xl font-black mb-6">{model.name}</h4>
                                <p className="text-gray-400 font-bold text-sm mb-12 leading-relaxed min-h-[4rem]">{model.description}</p>

                                <div className="space-y-4 mb-12 flex-grow text-gray-200">
                                    {model.features.map((f, i) => (
                                        <div key={i} className="flex gap-4 text-xs font-bold">
                                            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => navigate('/reservation')}
                                    className="w-full bg-white text-gray-950 py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-black/20 group flex items-center justify-center gap-3"
                                >
                                    <span>無料相談・予約</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compliance Info */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100">
                            <h4 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-4 italic underline decoration-blue-600">
                                <ShieldCheck className="w-8 h-8 text-blue-600" />
                                VAS/IMB 基準適合品
                            </h4>
                            <p className="text-sm font-bold text-gray-500 leading-relaxed">
                                国土交通省が定めた「盗難発生警報装置」及び「イモビライザー」の技術基準に適合。Pantheraシリーズは全ての製品でVAS・IMBマークを取得しており、JAAMA自主基準登録証も付属されています。合法かつ確実な安心を提供します。
                            </p>
                        </div>
                        <div className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100">
                            <h4 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-4 italic underline decoration-blue-600">
                                <Radio className="w-8 h-8 text-blue-600" />
                                特定小電力無線機器
                            </h4>
                            <p className="text-sm font-bold text-gray-500 leading-relaxed">
                                国内の電波法により定められた技術基準（技適）に全て適合しています。アンサーバックリモコンによる双方向通信も、安心してお使いいただけます。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Bottom CTAs */}
            <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">日本一のセキュリティ施工実績を誇るANGへ。</h3>
                    <p className="text-lg font-bold opacity-80 mb-12 max-w-2xl mx-auto italic">
                        Pantheraの性能を100%引き出すのは、確かな施工技術です。まずはお気軽にご相談ください。
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="https://page.line.me/312qjhsq?openQrModal=true" className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-sm tracking-widest shadow-2xl hover:scale-105 transition-all">
                            LINEで無料見積
                        </a>
                        <button onClick={() => navigate('/reservation')} className="bg-blue-700 text-white border border-blue-500 px-12 py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-800 transition-all">
                            来店予約
                        </button>
                    </div>
                </div>
            </section>

        </motion.div>
    );
};
