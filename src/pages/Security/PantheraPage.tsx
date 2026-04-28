import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../../contexts/SiteContext';
import {
    ShieldCheck,
    CheckCircle2,
    ArrowLeft,
    Shield,
    Zap,
    Activity,
    Smartphone,
    Gamepad2,
    Lock,
    Eye,
    Signal,
    Menu,
    Plus,
    MonitorPlay,
    Info,
    ChevronRight,
    MessageSquare
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

import { usePrices } from '../../contexts/PriceContext';

export const PantheraPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();

    const pantheraCategory = plans.find(p => p.id === 'security_panthera');

    React.useEffect(() => {
        document.title = "Panthera（パンテーラ） | 福岡市・大野城のカーセキュリティ専門店 ANG";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "全センサー標準装備のPanthera Zシリーズ。福岡県大野城市のANGは九州有数の認定取付店として、福岡市内はもちろん佐賀・熊本など県外からも多くのお客様の愛車を盗難から守っています。");
        }
    }, []);

    const lineUp = (pantheraCategory?.items || []).map(item => ({
        id: item.name.toLowerCase().replace(/\s+/g, '_'),
        name: item.name,
        label: item.badge,
        desc: item.description,
        image: item.image
    }));


    return (
        <div className="min-h-screen bg-[#05070a] text-white selection:bg-blue-500/30">
            {/* Sticky Header */}
            <header className="fixed top-0 w-full z-[100] bg-[#05070a]/80 backdrop-blur-2xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/security-home')}
                        className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase underline-offset-8 group-hover:underline">BACK TO SECURITY</span>
                    </button>

                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-blue-500 tracking-[0.5em] uppercase mb-1">Flagship Series</span>
                        <h1 className="text-2xl font-black italic tracking-tighter">Panthera Z</h1>
                    </div>

                    <button
                        onClick={() => navigate('/reservation')}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-black text-[10px] tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                        相談予約
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[95vh] min-h-[700px] w-full pt-20 overflow-hidden bg-black flex items-center justify-center">
                <SafeImage
                    src="/images/Security/model/pantheraz.webp"
                    className="w-full h-full object-contain"
                    alt="Panthera Series Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent"></div>
                <div className="absolute bottom-20 left-0 w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                    >
                        <h2 className="text-[10px] font-black tracking-[0.8em] text-blue-500 uppercase">The Ultimate Security</h2>
                        <p className="text-4xl md:text-6xl font-black italic tracking-tighter">真の最高峰、パンテーラ。</p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 pb-48">

                {/* Introduction Section */}
                <section className="relative z-10 -mt-20 mb-48">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#0b1015] border border-white/5 rounded-[4rem] p-12 md:p-24 shadow-2xl backdrop-blur-3xl"
                    >
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-12">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                                        <ShieldCheck className="w-3 h-3" />
                                        Panthera販売取付店 専門モデル
                                    </div>
                                    <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9]">
                                        守り抜く。<br />
                                        <span className="text-blue-500">最高峰の意思。</span>
                                    </h2>
                                </div>
                                <p className="text-gray-400 font-bold text-lg leading-relaxed max-w-xl">
                                    日本最高峰のセキュリティシステムを誇るPantheraは、純正キーの電波を悪用する「リレーアタック」、車両システムをハッキングする「CANインベーダー」にも対応。
                                    益々巧妙化する盗難手口から、大切な愛車を守り抜きます。
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-6 group hover:bg-blue-600/10 transition-all duration-500">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-white font-black text-xs uppercase tracking-widest">リレーアタック対応</h4>
                                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed">スマートキーからの微弱な電波を増幅して開錠する「リレーアタック」被害を完全にシャットアウトします。</p>
                                </div>
                                <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-6 group hover:bg-blue-600/10 transition-all duration-500">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-white font-black text-xs uppercase tracking-widest">CANインベーダー対応</h4>
                                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed">車両配線からシステムに侵入する「CANインベーダー」に対しても、独自の解析技術で不正なアクセスをブロックします。</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Lineup Overview Section */}
                <section className="mb-48 space-y-24">
                    <div className="text-center space-y-6">
                        <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Strategic Lineup</span>
                        <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter">カーセキュリティの最高峰3モデル。</h3>
                        <p className="text-gray-500 font-bold max-w-2xl mx-auto text-sm">あらゆる駐車環境、ニーズに応じたカスタマイズが可能です。最強の安心を、あなたの愛車へ。</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {lineUp.map((item) => (
                            <div key={item.id} className="group relative bg-[#0c1218] border border-white/5 rounded-[3.5rem] p-12 hover:border-blue-500/30 transition-all overflow-hidden flex flex-col items-center text-center">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] group-hover:bg-blue-600/10 transition-all"></div>
                                <div className="space-y-8 relative z-10 w-full">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-600/10 px-4 py-1 rounded-full inline-block mb-4">{item.label}</span>
                                        <h4 className="text-4xl font-black italic tracking-tighter text-white">{item.name}</h4>
                                    </div>
                                    <div className="h-1 w-12 bg-blue-600 mx-auto rounded-full"></div>
                                    <p className="text-xs text-gray-500 font-bold leading-relaxed min-h-[3em]">{item.desc}</p>
                                    <div className="pt-4">
                                        <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all text-gray-500 mx-auto shadow-2xl">
                                            <Shield className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Model Features Matrix */}
                <section className="space-y-48">

                    {/* Z706 Full Spec Section */}
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">The Flagship</span>
                                <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter">Panthera Z706</h3>
                                <p className="text-2xl text-white font-black italic opacity-50">シリーズ最高位 フルスペックモデル</p>
                            </div>
                            <p className="text-gray-400 font-bold text-lg leading-relaxed">
                                Z106をベースに、3ゾーンワイドエリアマイクロ波センサ・トリプルセンサ・デジタル傾斜センサ・IRセンサをすべて標準装備。
                                これら4つのセンサを高度なアルゴリズムで組み合わせ、誤作動を排除しつつ確実な警告・警報を出すようにプログラム可能です。
                                バックアップサイレンも標準装備した、まさに「鉄壁」のモデルです。
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-6 rounded-3xl bg-[#0c1218] border border-white/5">
                                    <Plus className="w-6 h-6 text-blue-500" />
                                    <div>
                                        <h5 className="text-white font-black text-xs uppercase tracking-widest mb-1">バックアップサイレン標準装備</h5>
                                        <p className="text-[10px] text-gray-500 font-bold">バッテリーを外された場合でも独立電源で警報を継続</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-[4rem] bg-white/5 border border-white/5 p-12 overflow-hidden flex items-center justify-center group">
                            <SafeImage src="/images/Security/model/panthera.webp" className="w-full h-auto transform group-hover:scale-110 transition-transform duration-1000 opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <ShieldCheck className="w-20 h-20 text-blue-500 mx-auto drop-shadow-[0_0_30px_rgba(37,99,235,0.5)]" />
                                    <span className="text-[10px] font-black tracking-[0.3em] text-white/50 uppercase">Full Professional Spec</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Feature List for Z706 */}
                    <div className="bg-[#0c1218] rounded-[4rem] border border-white/5 p-12 md:p-20 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-600/5 blur-[100px]"></div>
                        <div className="relative z-10 grid lg:grid-cols-2 gap-20">
                            <div className="space-y-12">
                                <h4 className="text-2xl font-black italic tracking-tighter text-blue-500 flex items-center gap-4">
                                    <Menu className="w-6 h-6" />
                                    Z706 対応機能
                                </h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        "2ポイントイモビライザ",
                                        "3ゾーンワイドマイクロ波センサ",
                                        "トリプルセンサ",
                                        "デジタル傾斜センサ",
                                        "IRセンサ (車内侵入)",
                                        "バックアップサイレン",
                                        "ショックセンサ",
                                        "ドア / トランクセンサ",
                                        "アンサーバックリモコン",
                                        "カメラ録画機能連携"
                                    ].map((f, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs font-black text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-12">
                                <h4 className="text-2xl font-black italic tracking-tighter text-gray-400 flex items-center gap-4">
                                    <Plus className="w-6 h-6" />
                                    主要オプション
                                </h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        "純正キーレスアダプタ",
                                        "スタータユニット",
                                        "各種特定車種専用ハーネス",
                                        "ループセンサ (外装品監視)",
                                        "ボンネットセンサ (拡張用)",
                                        "エンジンスターター連携"
                                    ].map((o, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs font-black text-gray-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                                            {o}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Z306 & Z106 Section */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#0c1218] border border-white/5 rounded-[4.5rem] p-16 space-y-10 group hover:border-blue-500/20 transition-all"
                        >
                            <div className="space-y-4">
                                <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">High Spec Model</span>
                                <h4 className="text-4xl font-black italic text-white tracking-tighter">Z306</h4>
                                <p className="text-sm font-bold text-gray-500 leading-relaxed min-h-[3em]">
                                    人気のユニットである「トリプルセンサ」と「デジタル傾斜センサ」を標準装備したハイスペックモデル。
                                    異常時にはハザード点滅と大音量ハイパワーサイレンで威嚇します。
                                </p>
                            </div>
                            <ul className="space-y-4 pt-12 border-t border-white/5">
                                {["デジタル傾斜センサ標準", "トリプルセンサ標準", "アンサーバックリモコン", "2ポイントイモビライザ"].map((li, i) => (
                                    <li key={i} className="flex items-center gap-3 text-xs font-black text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                        {li}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#0c1218] border border-white/5 rounded-[4.5rem] p-16 space-y-10 group hover:border-blue-500/20 transition-all"
                        >
                            <div className="space-y-4">
                                <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Basic Model</span>
                                <h4 className="text-4xl font-black italic text-white tracking-tighter">Z106</h4>
                                <p className="text-sm font-bold text-gray-500 leading-relaxed min-h-[3em]">
                                    ニーズに合わせて拡張可能なベーシックモデル。
                                    ドア/ボンネット/トランク全開放検知、2ポイントイモビライザなど、Pantheraの基本性能を凝縮。
                                </p>
                            </div>
                            <ul className="space-y-4 pt-12 border-t border-white/5">
                                {["ショックセンサ標準", "2ポイントイモビライザ", "電圧低下検知機能", "カメラ録画連携対応"].map((li, i) => (
                                    <li key={i} className="flex items-center gap-3 text-xs font-black text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                        {li}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Ultimate Answerback Remotes */}
                <section className="py-48">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative aspect-square bg-[#0b1015] border border-white/5 rounded-[5rem] p-12 md:p-24 overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-blue-600/5 blur-[120px]"></div>
                            <SafeImage src="/images/Security/model/panthera-key.webp" className="w-full h-auto scale-110 transform hover:scale-125 transition-transform duration-1000" />
                        </div>
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Visual Interface</span>
                                <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter">最高峰の安心を、その手に。</h3>
                            </div>
                            <p className="text-gray-400 font-bold text-lg leading-relaxed">
                                異常の発生をフルカラー液晶画面でリアルタイムにお知らせ。
                                メニュー画面から、ショックセンサや傾斜センサなど、各センサの感度（32段階）をリモコンからダイレクトに設定可能です。
                                バッテリー電圧の確認や、警報履歴のチェックも手元で完結します。
                            </p>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="w-5 h-5 text-blue-500" />
                                        <h5 className="font-black text-sm italic">通報・通知機能</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed">画面表示＋ブザー音＋バイブレーターで確実な通知</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Activity className="w-5 h-5 text-blue-500" />
                                        <h5 className="font-black text-sm italic">32段階感度設定</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed">リモコン操作で車両環境に合わせた緻密な調整が可能</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Comparison Matrix */}
                <section className="space-y-24 scroll-mt-32" id="matrix">
                    <div className="text-center space-y-6">
                        <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Comparison</span>
                        <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter">PRO SPEC MATRIX</h3>
                    </div>

                    <div className="overflow-x-auto pb-8">
                        <div className="min-w-[1000px] bg-[#0c1218] border border-white/5 rounded-[4rem] p-16">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-white/10">
                                        <th className="pb-10 text-[11px] font-black tracking-[0.3em] text-gray-500 uppercase">Functions & Sensors</th>
                                        <th className="pb-10 text-center text-blue-500 font-black italic tracking-tighter text-3xl">Z706</th>
                                        <th className="pb-10 text-center text-white font-black italic tracking-tighter text-3xl opacity-60">Z306</th>
                                        <th className="pb-10 text-center text-white font-black italic tracking-tighter text-3xl opacity-40">Z106</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { n: "門開放・エンジン始動検知", z7: "●", z3: "●", z1: "●" },
                                        { n: "2ポイントイモビライザ", z7: "●", z3: "●", z1: "●" },
                                        { n: "3ゾーン・ショックセンサ", z7: "●", z3: "●", z1: "●" },
                                        { n: "マイクロ波センサ (接近検知)", z7: "●", z3: "OP", z1: "OP" },
                                        { n: "デジタル傾斜センサ (0.5度)", z7: "●", z3: "●", z1: "OP" },
                                        { n: "トリプルセンサ", z7: "●", z3: "●", z1: "OP" },
                                        { n: "IRセンサ (車内侵入監視)", z7: "●", z3: "OP", z1: "OP" },
                                        { n: "バックアップサイレン", z7: "●", z3: "OP", z1: "OP" },
                                        { n: "ループセンサ / オリジナルセンサ", z7: "●", z3: "●", z1: "●" },
                                        { n: "乗り逃げ防止機能", z7: "●", z3: "●", z1: "●" },
                                        { n: "アンサーバックリモコン", z7: "●", z3: "●", z1: "●" },
                                        { n: "カメラ録画連携 (ユピテル製)", z7: "●", z3: "●", z1: "●" },
                                        { n: "警報音量 (最大)", z7: "113dB", z3: "113dB", z1: "113dB" }
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="py-8 pr-12">
                                                <div className="text-sm font-black text-gray-200 tracking-tight">{row.n}</div>
                                            </td>
                                            <td className="py-8 text-center text-blue-500 font-black">{row.z7}</td>
                                            <td className="py-8 text-center text-gray-500 font-bold">{row.z3}</td>
                                            <td className="py-8 text-center text-gray-700 font-bold">{row.z1}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Compliance & Standards */}
                <section className="grid lg:grid-cols-2 gap-12 pt-48">
                    <div className="bg-[#121820] rounded-[4rem] p-16 border border-white/5 space-y-10 relative overflow-hidden group">
                        <Signal className="w-24 h-24 text-blue-600/10 absolute -top-4 -right-4 rotate-12" />
                        <h3 className="text-3xl font-black italic tracking-tighter">日本唯一の最高基準</h3>
                        <p className="text-gray-400 font-bold leading-relaxed">
                            Pantheraシリーズは、国土交通省が定めた「盗難発生警報装置技術基準・イモビライザ技術基準」に完全適合。
                            全ての製品においてVAS・IMBマークを取得しており、JAAMA自主基準登録証も付属。
                            技適マーク付きの特定小電力無線を採用し、国内で安心してお使いいただけます。
                        </p>
                        <div className="flex gap-4">
                            <div className="px-6 py-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-[10px] font-black text-blue-400">VAS 適合品</div>
                            <div className="px-6 py-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-[10px] font-black text-blue-400">技適マーク取得済み</div>
                        </div>
                    </div>
                    <div className="bg-[#0b1015] rounded-[4rem] p-16 border border-white/5 flex flex-col justify-center items-center text-center space-y-8 group">
                        <MonitorPlay className="w-16 h-16 text-blue-500 group-hover:scale-110 transition-transform" />
                        <h4 className="text-2xl font-black italic tracking-tighter">ドライブレコーダー連携</h4>
                        <p className="text-xs text-gray-500 font-bold leading-relaxed max-w-sm mx-auto">
                            警告・警報時に自動でドライブレコーダー（ユピテル製）を起動し記録開始。
                            不審者の姿を動画として残すことで、事後の証拠能力を飛躍的に高めます。
                        </p>
                    </div>
                </section>

                {/* Professional CTA */}
                <section className="bg-gradient-to-b from-[#05070a] to-[#0c1218] py-48 text-center scroll-mt-32">
                    <div className="max-w-4xl mx-auto space-y-16">
                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter leading-none">THE ULTIMATE<br />PROTECTION.</h2>
                            <p className="text-blue-500 font-black tracking-[0.5em] uppercase text-xs">Everything for your peace of mind</p>
                        </div>
                        <p className="text-xl text-gray-400 font-bold leading-relaxed max-w-2xl mx-auto">
                            日本最高峰の性能を、プロショップANGの施工技術で。
                            あなたのお車と保管環境に最適な構成をご提案いたします。
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => navigate('/reservation')}
                                className="group relative bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 rounded-full font-black text-sm tracking-widest transition-all shadow-2xl shadow-blue-600/20 active:scale-95 flex items-center gap-4 shrink-0"
                            >
                                来店予約・お問い合わせ
                                <Smartphone className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a
                                href="https://page.line.me/312qjhsq?openQrModal=true"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative bg-[#06c755] hover:bg-[#05b34c] text-white px-12 py-6 rounded-full font-black text-sm tracking-widest transition-all shadow-2xl shadow-[#06c755]/20 active:scale-95 flex items-center gap-4 shrink-0"
                            >
                                LINEで無料相談
                                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                        <button className="flex items-center gap-3 text-[10px] font-black tracking-widest text-gray-500 hover:text-white transition-colors uppercase pt-4 border-b border-white/0 hover:border-white/20 transition-all mx-auto">
                            <Info className="w-4 h-4" />
                            詳しく話を聞きたい
                        </button>
                    </div>
                </section>
            </div>

            {/* Compliance Footer Shadow */}
            <footer className="bg-[#05070a] py-20 px-6 border-t border-white/5 grayscale opacity-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 font-black italic tracking-tighter">
                    <div className="flex items-center gap-20">
                        <span className="text-2xl">VAS / IMB</span>
                        <span className="text-2xl">技適適合品</span>
                        <span className="text-2xl">JAAMA 会員製品</span>
                    </div>
                    <span className="text-sm tracking-[1em] uppercase">Produced by Yupiteru / Installed by ANG</span>
                </div>
            </footer>
        </div>
    );
};
