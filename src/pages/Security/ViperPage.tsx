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
    Lock,
    Signal,
    Menu,
    Plus,
    Info,
    Smartphone as RemoteIcon,
    Bell,
    MessageSquare,
    Eye,
    Battery,
    ZapOff,
    Navigation,
    Volume2,
    ChevronRight
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

import { usePrices } from '../../contexts/PriceContext';

export const ViperPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();

    const viperCategory = plans.find(p => p.id === 'security_viper');
    const lineUp = (viperCategory?.items || []).map(item => ({
        id: item.name.toLowerCase().replace(/\s+/g, '_'),
        name: item.name,
        label: item.badge,
        desc: item.description,
        series: item.subType || 'main',
        image: item.image,
        features: item.features
    }));


    const options = [
        {
            name: "VIPERアクリルスキャナー",
            model: "640V (L/W)",
            desc: "青または白のLEDでVIPERロゴが点滅。高い抑止力を発揮します。",
            icon: Zap
        },
        {
            name: "デジタル傾斜センサー",
            model: "633P",
            desc: "2段階設定が可能な完全防水センサー。レッカー移動やジャッキアップを検知。",
            icon: Navigation
        },
        {
            name: "バックアップバッテリー",
            model: "520T",
            desc: "電源を断たれても独立電源で警報を維持。断線も検知します。",
            icon: Battery
        }
    ];

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
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase">BACK TO SECURITY</span>
                    </button>

                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-blue-500 tracking-[0.5em] uppercase mb-1">Global Standard</span>
                        <h1 className="text-2xl font-black italic tracking-tighter uppercase">VIPER</h1>
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
                    src="/images/Security/model/viper.webp"
                    className="w-full h-full object-contain"
                    alt="VIPER Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent"></div>
                <div className="absolute bottom-20 left-0 w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                    >
                        <h2 className="text-[10px] font-black tracking-[0.8em] text-blue-500 uppercase">World Share No.1</h2>
                        <p className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">The Evolution of Protection.</p>
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
                                        VIPER 正規販売・取付認定店
                                    </div>
                                    <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9]">
                                        世界が認めた、<br />
                                        <span className="text-blue-500 uppercase">Viper Security.</span>
                                    </h2>
                                </div>
                                <p className="text-gray-400 font-bold text-lg leading-relaxed max-w-xl">
                                    リレーアタック、CANインベーダー、キープログラマー。
                                    進化し続ける車両盗難手口に対し、VIPERは独自の暗号化通信と多彩なセンサーで愛車を鉄壁ガード。
                                    世界標準の信頼と、日本の保安基準を両立したシステムをご提供します。
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { title: "コードホッピング", desc: "一度使用したIDは二度と使わない電波コピー対策機能。", icon: Signal },
                                    { title: "NPC機能", desc: "誤作動による警報を自動抑制するインテリジェント機能。", icon: Bell },
                                    { title: "イモビライザー", desc: "物理的なエンジン始動を制限。乗り逃げを確実に阻止。", icon: Lock },
                                    { title: "保安基準適合", desc: "全てのモデルで日本の厳しい車両保安基準に適合。", icon: ShieldCheck }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-4 group hover:bg-blue-600/10 transition-all duration-500">
                                        <div className="w-10 h-10 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-white font-black text-xs uppercase tracking-widest leading-none">{item.title}</h4>
                                        <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Main Models Comparison */}
                <section className="mb-48 space-y-24" id="lineup">
                    <div className="text-center space-y-6">
                        <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Strategic Lineup</span>
                        <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter">目的に合わせて選べる、4つの性能。</h3>
                    </div>

                    <div className="space-y-32">
                        <div className="space-y-12">
                            <h4 className="text-xl font-black text-blue-500 tracking-[0.3em] uppercase underline underline-offset-8">Main Series</h4>
                            <div className="grid md:grid-cols-2 gap-8">
                                {lineUp.filter(m => m.series === 'main').map((item) => (
                                    <div key={item.id} className="group relative bg-[#0c1218] border border-white/5 rounded-[4rem] p-12 hover:border-blue-500/30 transition-all overflow-hidden flex flex-col md:flex-row gap-8">
                                        <div className="flex-1 space-y-8 relative z-10 order-2 md:order-1">
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-600/10 px-4 py-1 rounded-full inline-block mb-2">{item.label}</span>
                                                <h4 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white uppercase">{item.name}</h4>
                                            </div>
                                            <p className="text-sm text-gray-500 font-bold leading-relaxed min-h-[3em]">{item.desc}</p>
                                            <div className="pt-4 flex items-center justify-between border-t border-white/5 pt-8">
                                                <div className="flex gap-2">
                                                    {item.id === '5305vi' || item.id === '5304vi' ? (
                                                        <div className="px-4 py-1 rounded-full bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest">アンサーバック</div>
                                                    ) : null}
                                                    {item.id === '5300vi' ? (
                                                        <div className="px-4 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest">純正連動</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-48 h-48 relative z-10 order-1 md:order-2">
                                            <SafeImage
                                                src={item.image}
                                                className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500"
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] group-hover:bg-blue-600/10 transition-all"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-12">
                            <h4 className="text-xl font-black text-blue-500 tracking-[0.3em] uppercase underline underline-offset-8">330V Series</h4>
                            <div className="grid lg:grid-cols-3 gap-8">
                                {lineUp.filter(m => m.series === '330v').map((item) => (
                                    <div key={item.id} className="group relative bg-[#0b1015] border border-white/5 rounded-[3rem] p-10 hover:border-blue-500/20 transition-all flex flex-col gap-6">
                                        <div className="w-full h-32 relative">
                                            <SafeImage
                                                src={item.image}
                                                className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{item.label}</span>
                                            <h4 className="text-2xl font-black italic tracking-tighter text-white uppercase">{item.name}</h4>
                                            <p className="text-xs text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                                        </div>
                                        <div className="mt-auto pt-6 flex items-center justify-between">
                                            <div className="flex gap-2">
                                                {item.id === '330v5' || item.id === '330v4' ? (
                                                    <div className="px-3 py-1 rounded-full bg-emerald-600/5 text-emerald-500 text-[8px] font-black uppercase">通知対応</div>
                                                ) : <div className="px-3 py-1 rounded-full bg-blue-600/5 text-blue-500 text-[8px] font-black uppercase">スマート操作</div>}
                                            </div>
                                            <Plus className="w-4 h-4 text-white/10 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Model Features Highlights */}
                <section className="space-y-48">

                    {/* 8818V Detailed */}
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Compact & Tough</span>
                                <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter">VIPER 8818V</h3>
                                <p className="text-2xl text-white font-black italic opacity-50 uppercase">Security Multi-Level Model</p>
                            </div>
                            <p className="text-gray-400 font-bold text-lg leading-relaxed">
                                コンパクトでタフな3ボタンリモコンを採用。独立したアーム/ディスアームボタンにより、マルチレベルセキュリティが利用可能です。
                                7,378京通り以上のIDコードとコードホッピング機能により、リレーアタックやコードグラバー等の電波悪用手口を完封します。
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    "2段階衝撃センサー",
                                    "ドア / イグニッショントリガー",
                                    "イモビライザー内蔵",
                                    "コードホッピング機能"
                                ].map((li, i) => (
                                    <div key={i} className="flex items-center gap-3 text-[11px] font-black text-gray-300">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                        {li}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#0c1218] rounded-[4rem] p-16 border border-white/5 flex flex-col justify-center items-center text-center space-y-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-600/5 blur-[100px] group-hover:bg-blue-600/10 transition-all"></div>
                            <RemoteIcon className="w-24 h-24 text-blue-500 relative z-10" />
                            <h4 className="text-2xl font-black italic tracking-tighter relative z-10">3ボタンコンパクトリモコン</h4>
                            <p className="text-xs text-gray-500 font-bold leading-relaxed max-w-sm relative z-10">
                                ２個標準装備。基本操作や便利機能、設定が手元で完結。
                            </p>
                        </div>
                    </div>

                    {/* 5305Vi Detailed */}
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="lg:order-2 space-y-12">
                            <div className="space-y-4">
                                <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Answerback LCD</span>
                                <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter">VIPER 5305Vi</h3>
                                <p className="text-2xl text-white font-black italic opacity-50 uppercase">Ultimate Feedback System</p>
                            </div>
                            <p className="text-gray-400 font-bold text-lg leading-relaxed">
                                液晶アンサーバックリモコンにより、手元に異常をフルタイム通知。
                                市街地約200m、見通し約500mという圧倒的な通信距離を誇り、車両ライトの点滅とサイレンに加え、手元のバイブレーションで異常を確実に伝えます。
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-6 rounded-3xl bg-[#0c1218] border border-white/5">
                                    <Signal className="w-6 h-6 text-emerald-500" />
                                    <div>
                                        <h5 className="text-white font-black text-xs uppercase tracking-widest mb-1">見通し約500mの飛距離</h5>
                                        <p className="text-[10px] text-gray-500 font-bold">広範囲に渡り車両をリアルタイム監視</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:order-1 bg-[#121820] rounded-[5rem] p-16 border border-white/5 flex flex-col justify-center items-center text-center space-y-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-600/5 blur-[120px]"></div>
                            <Activity className="w-32 h-32 text-blue-600/20 absolute -top-8 -right-8 rotate-12" />
                            <h4 className="text-3xl font-black italic tracking-tighter text-white">鉄壁の5系統トリガー</h4>
                            <ul className="text-left space-y-3 relative z-10">
                                {["ショックセンサー", "ドアトリガー", "インスタントトリガー", "イグニッショントリガー", "イモビライザー"].map((t, i) => (
                                    <li key={i} className="flex items-center gap-3 text-xs font-black text-gray-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 5300Vi Detailed */}
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Smart Integration</span>
                                <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter">VIPER 5300Vi</h3>
                                <p className="text-2xl text-white font-black italic opacity-50 uppercase">Genuine Keyless Link</p>
                            </div>
                            <p className="text-gray-400 font-bold text-lg leading-relaxed">
                                スマートキー、インテリジェントキーなど、新型のキー各種に完全対応。
                                車両純正のロック/アンロック操作に連動してVIPERが作動・解除するため、専用リモコンを持つ必要がなく、操作性はスマートそのものです。
                            </p>
                            <div className="flex gap-4">
                                <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-blue-400 uppercase tracking-widest">純正連動対応</div>
                                <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-blue-400 uppercase tracking-widest">スマートキー対応</div>
                            </div>
                        </div>
                        <div className="bg-[#0b1015] rounded-[4rem] p-16 border border-white/5 space-y-10 group relative flex flex-col items-center justify-center text-center">
                            <Lock className="w-48 h-48 text-blue-600/5 absolute" />
                            <div className="space-y-4 relative z-10">
                                <Smartphone className="w-12 h-12 text-blue-500 mx-auto" />
                                <h4 className="text-2xl font-black italic tracking-tighter">いつも通りの操作で。</h4>
                                <p className="text-xs text-gray-500 font-bold leading-relaxed max-w-xs mx-auto">
                                    利便性を一切損なわず、中身は世界標準のガードで固める。スマート仕様のセキュリティです。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features & Functions Matrix */}
                <section className="py-48">
                    <div className="bg-[#0c1218] rounded-[5rem] border border-white/5 p-12 md:p-24 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-600/5 blur-[150px]"></div>
                        <div className="relative z-10 grid lg:grid-cols-2 gap-20">
                            <div className="space-y-12">
                                <h4 className="text-3xl font-black italic tracking-tighter text-blue-500 uppercase tracking-widest flex items-center gap-4">
                                    <Menu className="w-8 h-8" />
                                    主要防犯機能
                                </h4>
                                <div className="grid md:grid-cols-2 gap-y-6 gap-x-12 border-l border-white/10 pl-8">
                                    {[
                                        "IDコード (7,378京以上)",
                                        "コードホッピング機能",
                                        "インスタントトリガー",
                                        "2段階衝撃センサー",
                                        "ドアトリガー",
                                        "オプションセンサー入力",
                                        "イグニッショントリガー",
                                        "イモビライザー内蔵",
                                        "セレクタブルサイレン",
                                        "ブザー発報機能"
                                    ].map((f, i) => (
                                        <div key={i} className="text-xs font-black text-gray-300 flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-12">
                                <h4 className="text-3xl font-black italic tracking-tighter text-gray-400 uppercase tracking-widest flex items-center gap-4">
                                    <Plus className="w-8 h-8" />
                                    利便性・拡張機能
                                </h4>
                                <div className="grid md:grid-cols-2 gap-y-6 gap-x-12 border-l border-white/10 pl-8">
                                    {[
                                        "ドアロック連動",
                                        "ライトフラッシュ",
                                        "エンジンスターター併用",
                                        "レジューム機能",
                                        "NPC (迷惑防止回路)",
                                        "マルチプレックス",
                                        "マルチレベルセキュリティ",
                                        "外部機器コントロール (2系統)",
                                        "ダイアグノスティック機能",
                                        "ESP2デジタルネットワーク"
                                    ].map((f, i) => (
                                        <div key={i} className="text-xs font-black text-gray-500 flex items-center gap-3">
                                            <div className="w-1 h-1 rounded-full bg-gray-700" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ultimate System Options */}
                <section className="space-y-24">
                    <div className="text-center space-y-6">
                        <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Add-on Systems</span>
                        <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter">さらに強固に。オプションで死角を無くす。</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {options.map((opt, i) => (
                            <div key={i} className="group bg-[#0c1218] border border-white/5 rounded-[4rem] p-12 hover:border-blue-500/20 transition-all flex flex-col justify-between">
                                <div className="space-y-8">
                                    <div className="w-16 h-16 rounded-[2rem] bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <opt.icon className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{opt.model}</div>
                                        <h4 className="text-2xl font-black text-white italic tracking-tighter leading-tight">{opt.name}</h4>
                                        <p className="text-[11px] text-gray-500 font-bold leading-relaxed">{opt.desc}</p>
                                    </div>
                                </div>
                                <div className="pt-12">
                                    <button className="text-[10px] font-black tracking-widest text-white/30 group-hover:text-white transition-colors uppercase border-b border-white/0 group-hover:border-blue-500 flex items-center gap-2">
                                        Learn More <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* GPS / Mail Notification Info */}
                <section className="pt-48">
                    <div className="bg-gradient-to-br from-blue-900/20 to-transparent border border-white/5 rounded-[5rem] p-12 md:p-24 grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 animate-pulse">
                                <Volume2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-4xl font-black italic tracking-tighter">GPS通報 & リアルタイム通知</h3>
                            <p className="text-gray-400 font-bold text-lg leading-relaxed">
                                VIPER GPS緊急通報システムにより、警報時にはリアルタイムでメール通知が可能。
                                高精度GPSによる車両位置情報の把握も行え、車両盗難後の追跡性能も飛躍的に高まります。
                            </p>
                            <div className="flex gap-4">
                                <div className="px-6 py-3 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">メール通知対応</div>
                                <div className="px-6 py-3 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">GPS位置追跡</div>
                            </div>
                        </div>
                        <div className="relative aspect-square bg-black/50 rounded-[4rem] border border-white/5 flex items-center justify-center p-12 overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-600/5 blur-[100px]"></div>
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <Navigation className="w-48 h-48 text-blue-500/20" />
                            </motion.div>
                            <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                                <span className="text-[10px] font-black tracking-widest text-blue-400">TRACKING ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Professional CTA */}
                <section className="bg-gradient-to-b from-[#05070a] to-[#0c1218] py-48 text-center">
                    <div className="max-w-4xl mx-auto space-y-16">
                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase tracking-tighter">Global Standard.<br />Local Support.</h2>
                            <p className="text-blue-500 font-black tracking-[0.5em] uppercase text-xs">Installed by ANG Professional Technicians</p>
                        </div>
                        <p className="text-xl text-gray-400 font-bold leading-relaxed max-w-2xl mx-auto">
                            世界標準の性能を、ANGの確かな技術で。
                            あなたのお車の特性と駐車環境に最適なVIPERパッケージをご提案します。
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
                        <div className="pt-8">
                            <button className="flex items-center gap-3 text-[10px] font-black tracking-widest text-gray-500 hover:text-white transition-colors uppercase pt-4 border-b border-white/0 hover:border-white/20 transition-all mx-auto">
                                <Info className="w-4 h-4" />
                                詳しく話を聞きたい
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Compliance Footer Shadow */}
            <footer className="bg-[#05070a] py-20 px-6 border-t border-white/5 grayscale opacity-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 font-black italic tracking-tighter">
                    <div className="flex items-center gap-20">
                        <span className="text-2xl">VAS / IMB 適合</span>
                        <span className="text-2xl uppercase">Security Standards</span>
                        <span className="text-2xl uppercase">Direct Electronics Inc.</span>
                    </div>
                    <span className="text-sm tracking-[1em] uppercase">Produced by VIPER Japan / Installed by ANG</span>
                </div>
            </footer>
        </div>
    );
};
