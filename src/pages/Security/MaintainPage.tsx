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
    AlertCircle
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { useNavigate } from 'react-router-dom';

export const MaintainPage: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const diagnosItems = [
        {
            title: "システム動作確認",
            description: "各種センサー、サイレン、イモビライザーが正常に機能しているかを網羅的にチェックします。",
            icon: Activity
        },
        {
            title: "バッテリー診断",
            description: "本体バッテリーおよびリモコンの電池残量を測定し、必要に応じて最適な時期の交換を提案します。",
            icon: Battery
        },
        {
            title: "感度調整・再設定",
            description: "誤作動の防止や、感度の最適化。お客様の駐車環境の変化に合わせた再チューニングを行います。",
            icon: Settings
        },
        {
            title: "最新アップデート",
            description: "システムファームウェアを最新の状態に更新し、最新の盗難手口に対する耐性を維持します。",
            icon: RefreshCcw
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/10 selection:text-blue-400">
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
                                <span className="text-[9px] font-black tracking-[0.3em] text-blue-500 uppercase mt-1 leading-none italic">Diagnosis & Maintain</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/reservation')}
                        className="px-6 py-2.5 md:px-8 md:py-3 bg-blue-600 text-white text-xs font-black italic rounded-xl hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-600/10"
                    >
                        定期点検を予約
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 md:pt-56 md:pb-40 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8 italic">
                                <Activity className="w-3 h-3" /> System Health Care
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic leading-[0.95] mb-8">
                                その安心を、<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">永遠にするために。</span>
                            </h1>
                            <p className="text-white/50 font-bold text-lg md:text-xl leading-relaxed mb-12 italic">
                                セキュリティは「付けたら終わり」ではありません。<br className="hidden md:block" />
                                設置したその日の性能を維持し続けるための、ANG独自の高度診断サービス。
                            </p>

                            <div className="flex flex-wrap gap-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Interval</p>
                                        <p className="text-sm font-black italic">1年に一度の推奨点検</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400">
                                        <Wrench className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Quality</p>
                                        <p className="text-sm font-black italic">プロによる専任施工</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Diagnosis Grid */}
            <section className="py-32 bg-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px] mb-4 block italic">Diagnostic Program</span>
                        <h2 className="text-3xl md:text-6xl font-black tracking-tight italic uppercase">診断サービス内容</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {diagnosItems.map((item, i) => (
                            <div key={i} className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all hover:-translate-y-2 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full -mr-12 -mt-12 blur-xl group-hover:bg-blue-600/10 transition-all" />
                                <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black italic mb-4 tracking-tighter uppercase">{item.title}</h3>
                                <p className="text-white/40 font-bold text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Maintain? */}
            <section className="py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 leading-[0.95]">
                                盗難手口の変化に <br />
                                <span className="text-blue-500 underline decoration-blue-500/20 underline-offset-8">対応し続ける。</span>
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { title: "誤作動の抑制", desc: "センサーの劣化や汚れによる誤作動を未然に防ぎ、近隣への配慮と信頼性を維持します。" },
                                    { title: "鉄壁のガードを維持", desc: "リレーアタックやCANインベーダーなど、進化する窃盗手口に合わせた設定の見直しを行います。" },
                                    { title: "下取り時の資産価値", desc: "プロによる定期点検済みのセキュリティは、車両売却時の信頼の証となります。" }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                        <div className="text-blue-500 font-black italic text-xl">0{i + 1}</div>
                                        <div>
                                            <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{step.title}</h4>
                                            <p className="text-white/40 text-sm font-bold leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden">
                                <SafeImage
                                    src="/images/Security/vehicle/special-model.png"
                                    alt="Maintenance Workshop"
                                    className="w-full h-full object-cover grayscale opacity-40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent flex items-end p-12">
                                    <div className="p-8 rounded-[2.5rem] bg-black/60 backdrop-blur-xl border border-white/10 w-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                            <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Workshop Live Status</span>
                                        </div>
                                        <p className="text-lg font-black italic leading-tight">熟練のエンジニアが、<br />一台一台を精密に診断。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing / Booking CTA */}
            <section className="py-32 pb-48">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[5rem] p-10 md:p-24 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-16 shadow-3xl shadow-blue-600/20">
                        <div className="relative z-10 max-w-xl">
                            <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                                <ShieldAlert className="w-10 h-10 text-white" />
                                <div className="h-6 w-px bg-white/20" />
                                <span className="font-black italic text-xl uppercase tracking-widest">Peace of Mind</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-8 leading-none">
                                診断プランの<br />ご予約はこちら
                            </h2>
                            <p className="text-white/80 font-bold text-lg mb-0 italic leading-relaxed">
                                他店で施工されたセキュリティの点検・設定変更も承っております（※一部製品を除く）。まずはお気軽にお問い合わせください。
                            </p>
                        </div>

                        <div className="relative z-10 shrink-0 w-full md:w-auto">
                            <button
                                onClick={() => navigate('/reservation')}
                                className="w-full md:w-auto px-12 py-8 bg-white text-blue-600 font-black italic rounded-[2rem] hover:bg-slate-900 hover:text-white transition-all shadow-2xl active:scale-95 text-xl flex items-center justify-center gap-4"
                            >
                                定期点検の空き状況を確認 <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Abstract Background Element */}
                        <div className="absolute right-0 bottom-0 w-[60%] h-[120%] bg-white/5 -rotate-12 translate-x-1/4 translate-y-1/4 rounded-[10rem]" />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black/40 py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-white/30">
                    <div className="flex items-center gap-4 grayscale">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="font-black text-sm tracking-tighter uppercase border border-white/20 px-2 py-0.5 rounded">ANG DIAGNOSIS</span>
                    </div>
                    <p className="text-[10px] font-bold">© 2026 SOUND ANG. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>
        </div>
    );
};
