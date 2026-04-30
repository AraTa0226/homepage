import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../../contexts/SiteContext';
import {
    ShieldCheck,
    CheckCircle2,
    ArrowLeft,
    Clock,
    Zap,
    Smartphone,
    AlertTriangle,
    Shield,
    Smartphone as RemoteIcon,
    Settings,
    Activity,
    Lock,
    Unlock,
    Info,
    ChevronDown,
    Menu as MenuIcon,
    Power,
    Hand,
    MousePointer2,
    Camera,
    MessageSquare
} from 'lucide-react';
import { usePrices } from '../../contexts/PriceContext';
import { SafeImage } from '../../components/ui/SafeImage';

export const GrgoV2Page: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();

    const grgoV2Category = plans.find(p => p.id === 'security_grgo_v2');
    const lineUp = (grgoV2Category?.items || []).map(item => ({
        id: item.name.toLowerCase().replace(/\s+/g, '_'),
        name: item.name,
        price: item.price,
        type: item.badge,
        desc: item.description,
        features: item.features
    }));

    const remoteButtons = [
        { id: 1, icon: Power, label: 'Powerボタン', desc: 'リモコン電源のON/OFFなどに使用。' },
        { id: 2, icon: Lock, label: 'Panicボタン', desc: '警戒開始(ARM)操作などに使用。' },
        { id: 3, icon: Smartphone, label: 'Smart Xrossボタン', desc: '警戒解除(DISARM)やスマートクロスのON/OFF操作などに使用。' },
        { id: 4, icon: Activity, label: 'Vibrationボタン', desc: '車両の状態確認、電圧確認操作などに使用。' },
        { id: 5, icon: Camera, label: 'Cameraボタン', desc: 'バレーモードのON/OFFなどに使用。' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#05070a] text-gray-300 pb-24 font-sans selection:bg-blue-500/30 selection:text-blue-200"
        >
            {/* Header */}
            <header className="sticky top-0 z-[100] bg-[#05070a]/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-6 h-20">
                <button
                    onClick={() => navigate('/security-home')}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group font-bold tracking-widest text-[10px]"
                >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    BACK TO SECURITY
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase">Pro Shop Model</span>
                    <h1 className="font-black text-2xl tracking-tighter text-white italic">Grgo V2</h1>
                </div>
                <button
                    onClick={() => navigate('/reservation')}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-black text-xs transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                    相談予約
                </button>
            </header>

            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black">
                <SafeImage
                    src="/images/Security/model/grgov2.webp"
                    className="w-full h-full object-contain"
                    alt="Grgo V2 Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent"></div>
            </section>

            {/* Sub-Hero / New Release Info */}
            <section className="relative z-10 -mt-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#0c1412] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl backdrop-blur-xl">
                        <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                            <div className="space-y-4 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-2">
                                    <Zap className="w-3 h-3" />
                                    2025.04 NEW RELEASE
                                </div>
                                <h2 className="text-3xl font-black text-white italic tracking-tighter">販売取付店 専門モデル：Grgo V2</h2>
                                <p className="text-gray-400 font-bold max-w-2xl leading-relaxed">
                                    2025年4月、満を持して登場。機能を盗難対策に特化させることで、更なる高精度と低価格を両立したシリーズ最新モデル。
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                                    <span className="text-xs font-black text-white italic">車種限定モデル</span>
                                </div>
                                <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                                    <Smartphone className="w-5 h-5 text-blue-500" />
                                    <span className="text-xs font-black text-white italic">アンサーバック付</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Anti-Theft Special Note (Game Boy) */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-red-600/20 to-transparent border border-red-500/30 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[100px] -mr-48 -mt-48"></div>
                        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                            <div className="w-24 h-24 rounded-3xl bg-red-600/20 flex items-center justify-center shrink-0 border border-red-500/40">
                                <AlertTriangle className="w-12 h-12 text-red-500" />
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tight">最恐ツール「ゲームボーイ」への対抗策<span className="text-red-500">.</span></h3>
                                <p className="text-lg text-gray-300 font-bold leading-relaxed">
                                    最恐ツールといわれる「キーエミュレーター(通称 ゲームボーイ)」を使った新たな盗難手口が急増しています。
                                    車両の純正スマートキー信号を偽装するこの手口に対し、<span className="text-white border-b-2 border-red-500/50">Grgo V2は車両システムとは完全に独立したセキュリティ層を構築。</span>
                                    純正キーが突破されても、Grgoがエンジン始動を阻止し、愛車をその場に留めます。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Sections - Now all on one page */}
            <div className="max-w-7xl mx-auto px-6 space-y-48 py-24">

                {/* 1. Features (特徴) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-32"
                    id="features"
                >
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Model Concept</span>
                            <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">ユピテルが放つ、<br />2025年最新の解答。</h3>
                            <p className="text-gray-400 font-bold leading-relaxed text-lg">
                                Grgo販売取付店 専門モデルとして設計された「Grgo V2」。
                                20年以上の歴史で培ったノウハウを投入し、車両盗難対策に機能を一点集中。
                                より多くのお客様に安心して愛車を楽しめる生活をお届けします。
                            </p>
                            <div className="bg-white/5 border border-white/5 p-8 rounded-3xl space-y-4">
                                <h4 className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-blue-500" />
                                    対応車種について
                                </h4>
                                <p className="text-sm text-gray-500 font-bold leading-relaxed">
                                    Grgo V2はレクサス・トヨタ等の人気車種に最適化された車種限定モデルです。
                                    施工には車両に適合した専用ハーネスが必要となります。
                                </p>
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    {["レクサス車専用", "トヨタ車専用"].map((h, i) => (
                                        <div key={i} className="px-4 py-2 rounded-xl bg-black border border-white/5 text-[10px] font-black text-blue-400 tracking-wider text-center uppercase">
                                            {h}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { title: "信頼の日本製", desc: "国内一貫生産の高品質設計", icon: ShieldCheck },
                                { title: "製品3年保証", desc: "ユピテルならではの長期保証", icon: Clock },
                                { title: "アンサーバック", desc: "異常を画面と音で即座に通知", icon: Smartphone },
                                { title: "純正連動対応", desc: "快適性を損なわない操作性", icon: Zap }
                            ].map((f, i) => (
                                <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 transition-all hover:border-blue-500/30 group">
                                    <f.icon className="w-8 h-8 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-white font-black mb-2 tracking-tight">{f.title}</h4>
                                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="text-center">
                            <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Package Inclusion</span>
                            <h3 className="text-3xl font-black text-white italic tracking-tighter">Grgo V2 付属品</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { name: "メインユニット", desc: "イモビライザ内蔵の中枢" },
                                { name: "アンサーバックリモコン", desc: "フル液晶・充電式" },
                                { name: "ステータスインジケーター", desc: "青色LEDで高い抑止力を発揮" },
                                { name: "暗証番号式スイッチ", desc: "緊急解除・個別設定用" }
                            ].map((item, i) => (
                                <div key={i} className="bg-black/50 border border-white/5 p-8 rounded-[2rem] text-center space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgb(59_130_246)]"></div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black text-sm mb-1">{item.name}</h4>
                                        <p className="text-[9px] text-gray-600 font-bold tracking-widest">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Product Lineup Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-24"
                >
                    <div className="text-center space-y-6">
                        <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Price & Packages</span>
                        <h3 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">選べる防衛プラン。</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {lineUp.map((item) => (
                            <div key={item.id} className="group relative bg-[#0c1218] border border-white/5 rounded-[3rem] p-12 hover:border-blue-500/30 transition-all overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] group-hover:bg-blue-600/10 transition-all"></div>
                                <div className="space-y-8 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{item.type}</span>
                                            <h4 className="text-3xl font-black italic tracking-tighter text-white">{item.name}</h4>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] text-gray-500 font-black uppercase mb-1">Standard Price</div>
                                            <div className="text-2xl font-black text-white italic tracking-tighter">
                                                ¥{Number(item.price).toLocaleString()}<span className="text-xs opacity-40 ml-1">~</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm text-gray-400 font-bold leading-relaxed">{item.desc}</p>
                                    
                                    <div className="space-y-3">
                                        {item.features.map((f, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-xs font-black text-gray-300">
                                                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-12 relative z-10">
                                    <div className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all text-gray-500 font-black text-[10px] tracking-widest uppercase">
                                        Plan Details
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 2. Mechanism (基本的な仕組み) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-24"
                    id="mechanism"
                >
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative p-12 bg-white/5 rounded-[3rem] border border-white/5 text-center">
                            <SafeImage src="/images/Security/model/grgov2-key.webp" className="w-full h-auto rounded-2xl transform hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Notification System</span>
                            <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter leading-tight">
                                異常を逃さない、<br />即座のアンサーバック。
                            </h3>
                            <p className="text-gray-400 font-bold leading-relaxed text-lg">
                                不正な操作を検知すると、離れた場所にあるリモコンに即座に通知。
                                履歴保持機能により、通知を聞き逃しても内容を確認するまでお知らせが継続します。
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: "不正ドア開検知", desc: "扉が開けられた瞬間に警報" },
                                    { label: "イグニッションON検知", desc: "強制的なエンジン始動をキャッチ" },
                                    { label: "ブレーキON検知", desc: "自走を試みるブレーキ操作を監視" },
                                    { label: "不正ボンネット・トランク開", desc: "一部車両にて対応。内部アクセスを阻止" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 items-center hover:bg-white/10 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                        <div className="flex-grow">
                                            <div className="text-sm font-black text-white">{item.label}</div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-600 rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center text-white shadow-2xl shadow-blue-900/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
                        <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                            <Shield className="w-16 h-16 text-white/50 mx-auto" />
                            <h3 className="text-4xl font-black italic tracking-tighter">完全なるエンジン始動停止機能</h3>
                            <p className="text-lg font-bold leading-relaxed opacity-90">
                                セキュリティ警戒中は、物理的に乗り逃げを不可能にする「イモビライザ機能」が標準装備。
                                最新の盗難手口でも、エンジン始動そのものを制限し車両を守り抜きます。
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* 3. Operation (操作機能) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-24"
                    id="operation"
                >
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">User Interface</span>
                        <h3 className="text-4xl font-black text-white italic tracking-tighter">
                            メニュー形式で、<br />極限のシンプル操作。
                        </h3>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            {remoteButtons.map((btn) => (
                                <div key={btn.id} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex gap-6 items-center group hover:bg-blue-600/5 hover:border-blue-500/30 transition-all">
                                    <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <btn.icon className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-blue-500 font-black text-sm leading-none">{btn.id}.</span>
                                            <span className="text-white font-black uppercase text-sm">{btn.label}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{btn.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="relative aspect-auto min-h-[400px] bg-white/5 rounded-[4rem] border border-white/5 p-12 flex flex-col justify-center items-center">
                            <div className="text-center space-y-8 relative z-10">
                                <div className="bg-black/50 p-10 rounded-[3rem] border border-white/5 max-w-[340px]">
                                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-6">
                                        <Zap className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <h4 className="text-white font-black text-sm mb-4">Smart Xross 機能</h4>
                                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                                        純正スマートキーとリモコンを一緒にお持ちいただければ、操作不要でセキュリティの解除/警戒開始が可能。利便性と安全性を高い次元で融合させた最新機能です。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 4. Specs (主要機能・性能) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-32"
                    id="specs"
                >
                    <div className="space-y-12">
                        <h3 className="text-4xl font-black text-white italic tracking-tighter text-center">主要機能・性能</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { n: "ドア開検知", d: "ドアの不正開放を監視" },
                                { n: "トランク開検知", d: "荷室へのアクセスを警戒" },
                                { n: "ボンネット検知", d: "エンジンルーム内部をガード" },
                                { n: "ブレーキON検知", d: "不審なブレーキ操作を察知" },
                                { n: "ID/PW監視機能", d: "不正な解除操作をブロック" },
                                { n: "半ドア検知", d: "ドアが閉まっていないことを警告" },
                                { n: "IG ON始動検知", d: "イグニッション始動を感知" },
                                { n: "イモビライザ", d: "エンジン始動そのものを制限" },
                                { n: "オートアーム", d: "降車時に自動で警戒開始" },
                                { n: "緊急解除機能", d: "万が一の外でもスイッチで解除可能" },
                                { n: "バレーモード", d: "点検時に機能を一時停止" },
                                { n: "スマートクロスOFF", d: "リレーアタック対策に有効" }
                            ].map((f, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center gap-4 hover:border-blue-500/20 transition-all">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                                    <div>
                                        <div className="text-sm font-black text-white tracking-tight">{f.n}</div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{f.d}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Compliance Section */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="bg-white p-12 md:p-16 rounded-[4rem] text-gray-900 space-y-8">
                            <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-black italic tracking-tighter">国内技術基準 適合認証品</h3>
                            <p className="text-sm font-bold text-gray-600 leading-relaxed">
                                総務省技術基準に適合した特定小電力無線機器であり、国土交通省の定めるVAS・IMB基準にも完全準拠。
                                専門店モデルとしての信頼をお約束します。
                            </p>
                        </div>
                        <div className="bg-[#0c1412] p-12 md:p-16 rounded-[4rem] text-white space-y-8 border border-white/5">
                            <div className="flex justify-between items-start">
                                <h3 className="text-3xl font-black italic tracking-tighter text-emerald-500">省電力設計</h3>
                                <Activity className="w-8 h-8 text-white/20" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black text-gray-500 uppercase">Standby</div>
                                    <div className="text-3xl font-black italic tracking-tighter">9.2<span className="text-xs opacity-40 ml-1">mA</span></div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black text-gray-500 uppercase">Active</div>
                                    <div className="text-3xl font-black italic tracking-tighter">9.8<span className="text-xs opacity-40 ml-1">mA</span></div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 font-bold">施工後も車両バッテリーへの負担を最小限に抑えます。</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Call to Action */}
            <section className="py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-blue-600/5">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <h3 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">YOUR CAR, YOUR ARMOR.</h3>
                    <p className="text-lg text-gray-400 font-bold leading-relaxed">
                        専門用語や複雑な操作を意識することなく、最強のセキュリティをその手に。<br />
                        当店は正規認定店として、最適な施工とアフターサポートをお約束します。
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
                </div>
            </section>
        </motion.div>
    );
};

