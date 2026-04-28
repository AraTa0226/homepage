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
    MapPin,
    Laptop,
    Camera,
    Mail,
    Smartphone
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

    const categories = [
        {
            title: "降車時確認式",
            subtitle: "Manual Confirmation",
            description: "降車時に運転手の方へ車内の確認を促し、確認忘れを防止することを目的としています。車内後方の確認ボタンを押すまで警報が鳴り続けます。",
            icon: CheckCircle2,
            color: "emerald"
        },
        {
            title: "自動検知式",
            subtitle: "Automatic Detection",
            description: "万が一運転手の方が確認を忘れてしまった場合や、置き去りにされた乗員を見落とした場合に、車外へ向けて異常を知らせることを目的としています。",
            icon: Zap,
            color: "rose"
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
                            <span className="text-[9px] font-black tracking-[0.3em] text-rose-600 uppercase mt-1 leading-none">Smart Bus Shield</span>
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
            <section className="relative pt-32 pb-12 md:pt-48 md:pb-32 overflow-hidden bg-[#fafafa]">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50 -skew-x-12 translate-x-1/4 -z-10" />
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-full text-[10px] font-black tracking-widest uppercase mb-8 italic shadow-xl shadow-rose-600/20">
                            Child Disembarkation Assistance System
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter italic leading-[1.05] mb-8">
                            送迎バス <br className="md:hidden" />
                            <span className="text-rose-600">置き去り防止支援装置</span>
                        </h1>
                        <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                            弊社では国交省のガイドラインに沿った認定品の販売取り付けを行っています。<br className="hidden md:block" />
                            ヒューマンエラーを技術でカバーし、大切な命を確実に守る体制を構築します。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Two Types Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {categories.map((cat, i) => (
                            <div key={i} className="relative bg-white p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 group overflow-hidden">
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-${cat.color}-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-${cat.color}-500/10 transition-all`} />
                                <div className={`w-16 h-16 bg-${cat.color}-50 rounded-2xl flex items-center justify-center text-${cat.color}-600 mb-8`}>
                                    <cat.icon className="w-8 h-8" />
                                </div>
                                <div className={`text-${cat.color}-600 font-black text-[10px] tracking-[0.3em] uppercase mb-4 italic`}>{cat.subtitle}</div>
                                <h3 className="text-3xl font-black italic tracking-tighter mb-6 uppercase leading-none">{cat.title}</h3>
                                <p className="text-slate-500 font-bold leading-loose text-base">
                                    {cat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Section: HORNET */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20 text-center md:text-left">
                        <span className="text-rose-600 font-black tracking-[0.5em] uppercase text-[10px] mb-4 block italic">Authorized Models</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight italic uppercase">取扱いモデル</h2>
                    </div>

                    <div className="bg-white rounded-[4rem] overflow-hidden shadow-3xl border border-slate-100 grid md:grid-cols-12 items-center">
                        <div className="md:col-span-5 aspect-square md:aspect-auto h-full relative overflow-hidden bg-slate-50">
                            <SafeImage
                                src="/images/Top/dorareko.webp"
                                alt="HORNET BS-700C"
                                className="w-full h-full object-contain p-12"
                            />
                            <div className="absolute top-10 left-10 bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase italic">
                                Recommended Flagship
                            </div>
                        </div>
                        <div className="md:col-span-7 p-10 md:p-20">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-rose-600 font-black italic text-2xl tracking-tighter">HORNET</span>
                                <div className="h-4 w-px bg-slate-200" />
                                <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">Kato Denki</span>
                            </div>

                            <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-4 leading-tight">
                                BS-700C <br />
                                <span className="text-xl md:text-2xl not-italic text-slate-500">AIカメラ付 車内置き去り防止安全装置</span>
                            </h3>

                            <div className="flex flex-wrap gap-4 mb-10">
                                <div className="px-5 py-2 bg-rose-50 text-rose-600 rounded-full text-[11px] font-black tracking-widest uppercase italic border border-rose-100">
                                    認定番号 C-004
                                </div>
                                <div className="px-5 py-2 bg-slate-50 text-slate-900 rounded-full text-[11px] font-black tracking-widest uppercase italic border border-slate-100 font-mono">
                                    ￥140,800 <span className="text-[9px] opacity-60">(税込)</span>
                                </div>
                                <p className="w-full text-[10px] text-slate-400 font-bold italic mt-1">※設置工事費別途</p>
                            </div>

                            <p className="text-slate-500 font-bold leading-loose mb-12">
                                AIカメラを標準装備したモデル。降車時確認式と自動検知式の共通基本機能に加え、車内置き去りが発生した際に手元のスマートフォンやパソコンにメール送信することができます。
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                {[
                                    { icon: Camera, label: "AIカメラ" },
                                    { icon: Mail, label: "メール通知" },
                                    { icon: Smartphone, label: "スマホ連携" },
                                    { icon: Laptop, label: "PC対応" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-rose-300 transition-all">
                                        <item.icon className="w-6 h-6 text-slate-400 group-hover:text-rose-600 transition-colors" />
                                        <span className="text-[10px] font-black tracking-widest uppercase">{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            <a
                                href="https://kato-denki.com/products/hornet/bs-700c/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 text-slate-900 font-black italic text-xs tracking-widest group border-b-2 border-rose-600 pb-1 hover:text-rose-600 transition-colors"
                            >
                                メーカー詳細サイトへ <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Pioneer Section */}
                    <div className="mt-20 bg-white rounded-[4rem] p-10 md:p-20 shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-grow">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-blue-600 font-black italic text-2xl tracking-tighter uppercase">Pioneer</span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-black italic tracking-tighter mb-6">
                                パイオニア製 置き去り防止支援装置
                            </h3>
                            <p className="text-slate-500 font-bold leading-relaxed max-w-xl">
                                パイオニア製のガイドライン適合モデルも取り扱っております。車内環境や運用形態に合わせた最適な機種をご提案可能です。
                            </p>
                        </div>
                        <a
                            href="https://jpn.pioneer/ja/car-security/bus/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 w-full md:w-auto px-12 py-6 bg-slate-900 text-white font-black italic rounded-2xl hover:bg-rose-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 text-center"
                        >
                            メーカーサイトで詳細を見る
                        </a>
                    </div>

                    <p className="text-center text-slate-400 font-bold mt-12 text-sm italic">他にも多数取り扱いモデルがございます。用途に合わせて最適なプランをご案内いたします。</p>
                </div>
            </section>

            {/* Installation Area Section */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 text-[10px] font-black tracking-widest uppercase mb-8 italic">
                            <MapPin className="w-3 h-3" /> Service Coverage
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-none mb-8">
                            九州全域を <br />
                            <span className="text-rose-600 underline decoration-rose-500/20 underline-offset-8">徹底サポート。</span>
                        </h2>
                        <p className="text-slate-500 font-bold text-lg leading-relaxed mb-12">
                            確かな施工品質をお届けするため、九州各県の幼稚園・保育園様へ直接お伺いいたします。
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {["福岡", "佐賀", "長崎", "熊本"].map((pref, i) => (
                                <div key={i} className="flex items-center gap-4 p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-600 shadow-sm font-black italic">
                                        0{i + 1}
                                    </div>
                                    <span className="text-xl font-black italic tracking-tighter">{pref}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 rounded-3xl bg-rose-50 border border-rose-100 flex items-start gap-4">
                            <Info className="w-6 h-6 text-rose-600 shrink-0 mt-1" />
                            <p className="text-rose-900 text-sm font-bold leading-relaxed">
                                対応エリア外（大分・宮崎・鹿児島など）も対応可能な場合もございます。まずは一度お気軽にお問い合わせください。
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square rounded-[4rem] overflow-hidden shadow-3xl bg-slate-900 relative">
                            {/* Workshop visualization */}
                            <SafeImage
                                src="/images/Security/vehicle/special-model.png"
                                alt="ANG Installation Area"
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-rose-600/40 via-transparent to-transparent flex items-end p-20">
                                <div className="text-white">
                                    <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-4 text-white/60">Professional Installation</p>
                                    <h4 className="text-5xl font-black italic tracking-tighter leading-none mb-4 uppercase">Reliable <br />Service.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-rose-600 rounded-[4rem] p-10 md:p-24 relative overflow-hidden text-center md:text-left text-white shadow-3xl shadow-rose-600/30">
                        {/* Background Accents */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />

                        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight mb-8 uppercase">
                                    CONSULTATION <br className="hidden md:block" />
                                    FOR SAFETY.
                                </h2>
                                <p className="text-white/80 font-bold text-lg mb-10 leading-relaxed italic">
                                    導入に関するご相談や、補助金を活用したお見積もりなど、専門スタッフが迅速に対応いたします。幼稚園・保育園様の実務に負担をかけない施工プランをご提案します。
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => navigate('/reservation')}
                                        className="px-12 py-6 bg-white text-rose-600 font-black italic rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-2xl active:scale-95 text-lg"
                                    >
                                        無料個別相談を予約する
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "福岡県実績", val: "多数" },
                                    { label: "適合評価", val: "国交省認可" },
                                    { label: "安心の", val: "徹底点検" },
                                    { label: "充実した", val: "アフターケア" }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 rounded-3xl bg-white/10 border border-white/20 text-center backdrop-blur-sm">
                                        <p className="text-white/60 font-black text-[10px] tracking-widest uppercase mb-1">{item.label}</p>
                                        <p className="text-white font-black italic text-xl whitespace-nowrap">{item.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-50 py-20 px-6 border-t border-slate-200">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4 grayscale opacity-50">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="font-black text-sm tracking-tighter uppercase px-2 py-0.5 border-2 border-slate-900 rounded-md">ANG SAFETY</span>
                    </div>
                    <div className="flex gap-8 text-[11px] font-black tracking-widest text-slate-400 uppercase">
                        <button onClick={() => navigate('/security-home')} className="hover:text-rose-600 transition-colors italic">lineup home</button>
                        <button onClick={() => navigate('/reservation')} className="hover:text-rose-600 transition-colors italic">Contact Us</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};
