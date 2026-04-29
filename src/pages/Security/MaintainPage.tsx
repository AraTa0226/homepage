import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ShieldCheck,
    Settings,
    Activity,
    Battery,
    Zap,
    Search,
    CheckCircle2,
    ChevronLeft,
    Clock,
    ArrowRight,
    Hammer,
    ShieldAlert,
    Wrench,
    RefreshCcw,
    AlertCircle,
    Phone,
    HelpCircle,
    FileSearch,
    HelpCircle as HelpIcon,
    AlertTriangle
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { useNavigate } from 'react-router-dom';

const MaintainPage: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        document.title = "セキュリティー点検・診断 | 福岡市・大野城の専門店 ANG";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "中古車購入時のセキュリティー設定や動作不良の診断なら、福岡のANGにお任せください。パンテーラ、ゴルゴ、バイパー等の正規品に対応。福岡市内はもちろん九州各県からのご相談も承っております。");
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const serviceHighlights = [
        {
            title: "装着ユニットの点検・予測",
            desc: "現在どのようなモデルやオプションが装着されているかを特定します。",
            icon: Search
        },
        {
            title: "基本動作の確認",
            desc: "センサーの反応やサイレンの発報など、システムが正常かを確認します。",
            icon: Activity
        },
        {
            title: "操作方法のレクチャー",
            desc: "意外と知らない正しい使い方や、緊急時の対処法を分かりやすく説明します。",
            icon: HelpIcon
        },
        {
            title: "今後の運用アドバイス",
            desc: "使い続ける上での注意点や、メンテナンスの時期について助言いたします。",
            icon: FileSearch
        }
    ];

    return (
        <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-blue-500/10 selection:text-blue-400 overflow-x-hidden">
            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 h-16 md:h-20' : 'bg-transparent h-20 md:h-28'}`}>
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/security-home')}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/security-home')}>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20 group-hover:scale-105 transition-all">
                                <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg md:text-xl font-black tracking-tighter leading-none">ANG SECURITY</span>
                                <span className="text-[9px] font-black tracking-[0.3em] text-blue-500 uppercase mt-1 leading-none italic">Maintenance & Diagnosis</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 md:pt-64 md:pb-48">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
                    <div className="md:grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-[11px] font-black tracking-widest uppercase mb-8 italic">
                                <Search className="w-4 h-4" /> Professional Used Car Support
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic leading-[0.9] mb-12 uppercase">
                                セキュリティー <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500">点検・診断サービス</span>
                            </h1>
                            <p className="text-white/60 font-bold text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                                「中古車を買ったらセキュリティーがついていた！」<br />
                                設定不明、操作不安、そんなお悩みをお持ちの方へ。プロが現状を診断し、正しい使い道をレクチャーします。
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <div className="px-8 py-5 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1 italic">Diagnosis Fee</p>
                                    <p className="text-3xl font-black italic text-blue-400">￥3,300 <span className="text-xs text-white/60 font-medium tracking-normal">（税込）</span></p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="hidden md:block relative">
                            <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-blue-600/20 to-transparent border border-white/10 p-1">
                                <div className="w-full h-full rounded-[3.8rem] overflow-hidden bg-slate-900 relative group">
                                    <SafeImage
                                        src="/images/Security/vehicle/special-model.png"
                                        alt="Diagnosis Workshop"
                                        className="w-full h-full object-cover grayscale opacity-30 group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-32 h-32 rounded-full bg-blue-600/80 flex items-center justify-center shadow-3xl shadow-blue-600/50">
                                            <Settings className="w-16 h-16 text-white animate-[spin_8s_linear_infinite]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Awareness Section */}
            <section className="py-32 bg-white/5 border-y border-white/5 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-[#0a0a0a] rounded-[4rem] border border-white/5 p-12 md:p-24 shadow-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <AlertCircle className="w-64 h-64" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <AlertTriangle className="w-10 h-10 text-amber-500" />
                                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">トラブルになる前に。</h2>
                            </div>

                            <div className="space-y-8 text-white/70 font-bold text-lg leading-loose italic">
                                <p>
                                    お問い合わせの中でも特に多いのが、中古で購入したお車に装着されていたセキュリティーのトラブルです。
                                </p>
                                <p className="text-white">
                                    セキュリティーシステムは盗難を未然に防ぐ強力な味方ですが、正しい使い方を知らなければ、時にオーナー様自身を「防御対象」として認識してしまいます。
                                </p>
                                <p>
                                    いざトラブルになった際、ロードサービス等では対応できないケースがほとんどです。施工店が分からず相談先にお困りの方へ、ANGが解決のサポートをいたします。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Scope */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] mb-4 block italic">What we do</span>
                        <h2 className="text-3xl md:text-6xl font-black tracking-tight italic uppercase">診断内容の詳細</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {serviceHighlights.map((item, i) => (
                            <div key={i} className="group p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-2">
                                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black italic mb-4 tracking-tighter uppercase">{item.title}</h3>
                                <p className="text-white/40 font-bold text-sm leading-relaxed tracking-tight italic">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-10 md:p-16 rounded-[4rem] bg-white/[0.02] border border-white/5">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="shrink-0">
                                <div className="px-6 py-3 bg-white text-black font-black italic rounded-xl text-xs uppercase tracking-widest">
                                    Compatible Brands
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-8 md:gap-16 justify-center items-center grayscale opacity-40">
                                {["VIPER", "Grgo", "Clifford", "Panthera"].map((brand, i) => (
                                    <span key={i} className="text-2xl md:text-4xl font-black italic tracking-tighter">{brand} 正規品</span>
                                ))}
                            </div>
                        </div>
                        <p className="mt-10 text-center text-white/30 text-[11px] font-bold italic">
                            ※正規品かどうか不明な場合は店頭にて判断いたします。診断はパネル・部品の脱着が発生しない範囲内で実施いたします。
                        </p>
                    </div>
                </div>
            </section>

            {/* Additional Services */}
            <section className="py-32 bg-blue-600/5 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="p-12 rounded-[4rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all">
                            <Settings className="w-12 h-12 text-blue-400 mb-8" />
                            <h3 className="text-2xl font-black italic mb-6 uppercase">設定変更・再登録</h3>
                            <p className="text-white/50 font-bold leading-loose italic mb-8">
                                感度の調整や機能の設定変更をご希望の場合は、別途有料にて対応させていただきます。機種によっては設定不可能な場合もありますのでご了承ください。
                            </p>
                        </div>
                        <div className="p-12 rounded-[4rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all">
                            <Zap className="w-12 h-12 text-blue-400 mb-8" />
                            <h3 className="text-2xl font-black italic mb-6 uppercase">リモコンの追加登録</h3>
                            <p className="text-white/50 font-bold leading-loose italic mb-8">
                                リモコンの破損や紛失、スペアの追加なども別途対応可能です。最新のリモコンへの更新についてもご相談ください。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 pb-48">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-blue-600 rounded-[5rem] p-10 md:p-24 relative overflow-hidden text-center md:text-left shadow-3xl shadow-blue-600/20">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
                            <div className="max-w-xl text-white">
                                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 leading-none uppercase">
                                    Feel Free <br />
                                    <span className="text-indigo-900 underline decoration-indigo-900/40 underline-offset-8">to Consult.</span>
                                </h2>
                                <p className="text-white/80 font-bold text-lg mb-0 italic leading-relaxed">
                                    まずはお気軽にお電話にてご相談ください。お客様のお車の安心を、全力でサポートさせていただきます。
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 w-full md:w-auto">
                                <a
                                    href="tel:0120-117-117" // Placeholder or actual? Using placeholder
                                    className="px-12 py-8 bg-white text-blue-600 font-black italic rounded-[2rem] hover:bg-slate-900 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4 text-2xl group"
                                >
                                    <Phone className="w-8 h-8 font-bold group-hover:scale-110 transition-transform" /> お電話で相談
                                </a>
                                <button
                                    onClick={() => navigate('/reservation')}
                                    className="px-12 py-5 bg-blue-900 text-white font-black italic rounded-2xl hover:bg-blue-800 transition-all text-sm uppercase tracking-widest"
                                >
                                    予約空き状況を確認する
                                </button>
                            </div>
                        </div>

                        {/* Background Accents */}
                        <div className="absolute right-[-10%] top-[-10%] w-96 h-96 bg-white/10 rounded-full blur-[80px]" />
                        <div className="absolute left-[-5%] bottom-[-5%] w-64 h-64 bg-indigo-900/20 rounded-full blur-[60px]" />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-white/30">
                    <div className="flex items-center gap-4 grayscale">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="font-black text-sm tracking-tighter uppercase border border-white/20 px-2 py-0.5 rounded">ANG SECURITY</span>
                    </div>
                    <div className="flex gap-8 text-[11px] font-black tracking-widest uppercase">
                        <button onClick={() => navigate('/security-home')} className="hover:text-blue-400 transition-colors italic">Lineup Home</button>
                        <button onClick={() => navigate('/reservation')} className="hover:text-blue-400 transition-colors italic">Contact</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MaintainPage;
