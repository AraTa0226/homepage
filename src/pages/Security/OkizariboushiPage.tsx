import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ShieldCheck,
    Bell,
    Users,
    AlertTriangle,
    CheckCircle2,
    ChevronRight,
    Info,
    Calendar,
    ArrowRight,
    MessageSquare,
    Lock,
    Zap,
    History
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { useNavigate } from 'react-router-dom';

export const OkizariboushiPage: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            title: "降車時確認ボタン",
            description: "エンジン停止後、車内後方に設置されたボタンを押すまでブザーが鳴り続け、確実な車内点検を促します。",
            icon: CheckCircle2
        },
        {
            title: "高性能人感センサー",
            description: "万が一の点検漏れがあっても、超音波・赤外線センサーが微細な動きを検知し、車外へ異常を知らせます。",
            icon: Zap
        },
        {
            title: "大音量外部サイレン",
            description: "異常検知時は115dB以上の大音量サイレンとハザード点滅で、周囲に緊急事態を即座に通知します。",
            icon: Bell
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-rose-500/10 selection:text-rose-600">
            {/* Navigation Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg h-16 md:h-20' : 'bg-transparent h-20 md:h-28'}`}>
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/security-home')}>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-rose-600/20 group-hover:scale-105 transition-all">
                            <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg md:text-xl font-black tracking-tighter leading-none">ANG SECURITY</span>
                            <span className="text-[9px] font-black tracking-[0.3em] text-rose-600 uppercase mt-1">Safety First</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/reservation')}
                            className="px-6 py-2.5 md:px-8 md:py-3 bg-slate-900 text-white text-xs font-black italic rounded-xl hover:bg-rose-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
                        >
                            無料個別相談
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-rose-50 -skew-x-12 translate-x-1/4 -z-10" />
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full text-rose-700 text-[10px] font-black tracking-widest uppercase mb-8 italic">
                            <Info className="w-3 h-3" /> Child Protection System
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter italic leading-[1.05] mb-8">
                            小さな命を、<br />
                            <span className="text-rose-600">絶対に見逃さない。</span>
                        </h1>
                        <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-lg mb-10">
                            全国の送迎バスで義務化された「置き去り防止支援装置」。ガイドライン適合製品の選定から、確実な作動をお約束するプロの施工まで、Sound ANGがトータルで支援します。
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Safety Standard</p>
                                    <p className="text-sm font-black italic">国交通省ガイドライン適合</p>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-4">
                                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                                    <Info className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Policy</p>
                                    <p className="text-sm font-black italic text-rose-600">補助金対象モデル</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-3xl bg-slate-100 relative group">
                            <SafeImage
                                src="/images/Top/kcar.webp"
                                alt="送迎バス置き去り防止装置"
                                className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                        {/* Status Float */}
                        <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-3xl border border-slate-100 max-w-[280px]">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase leading-none mt-0.5 whitespace-nowrap">Active Surveillance</span>
                            </div>
                            <p className="text-slate-900 font-black italic leading-tight text-lg mb-2">
                                24時間 365日、<br />休むことない監視体制。
                            </p>
                            <p className="text-slate-500 text-[10px] font-medium leading-relaxed">
                                ヒューマンエラーを技術でカバーし、悲劇を未然に防ぐための確かなパートナー。
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-rose-600 font-black tracking-[0.5em] uppercase text-[10px] mb-4 block italic">Reliable Technology</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight italic uppercase">システムの特徴</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all hover:-translate-y-2 group">
                                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-8 group-hover:scale-110 transition-transform">
                                    <f.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black italic mb-4 tracking-tight uppercase">{f.title}</h3>
                                <p className="text-slate-500 font-bold text-sm leading-loose">
                                    {f.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Message */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-slate-900 rounded-[4rem] p-10 md:p-24 relative overflow-hidden text-center md:text-left">
                        {/* Background Accents */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />

                        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter leading-tight mb-8">
                                    福岡・九州近郊の<br />
                                    幼稚園・保育園様へ
                                </h2>
                                <p className="text-slate-300 font-bold text-lg mb-10 leading-relaxed italic">
                                    補助金の申請から、施工スケジュールの調整まで、経験豊富なANGが丁寧にサポートいたします。まずは現状のご不安をご相談ください。
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => navigate('/reservation')}
                                        className="px-10 py-5 bg-rose-600 text-white font-black italic rounded-2xl hover:bg-rose-500 transition-all shadow-xl shadow-rose-600/20 active:scale-95"
                                    >
                                        無料個別相談はこちら
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "福岡県実績", val: "多数" },
                                    { label: "適合評価", val: "AAA" },
                                    { label: "安心の", val: "自社施工" },
                                    { label: "万全の", val: "保守" }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
                                        <p className="text-rose-500 font-black text-[10px] tracking-widest uppercase mb-1">{item.label}</p>
                                        <p className="text-white font-black italic text-xl">{item.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Overlay Link */}
            <footer className="bg-slate-50 py-20 px-6 border-t border-slate-200">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4 grayscale opacity-50">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="font-black text-sm tracking-tighter">ANG SECURITY</span>
                    </div>
                    <div className="flex gap-8 text-[11px] font-black tracking-widest text-slate-400 uppercase">
                        <button onClick={() => navigate('/security-home')} className="hover:text-rose-600 transition-colors italic">Security lineup</button>
                        <button onClick={() => navigate('/reservation')} className="hover:text-rose-600 transition-colors italic">Contact Us</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};
