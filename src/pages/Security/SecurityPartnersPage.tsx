import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
    ShieldCheck,
    ArrowUpRight,
    ChevronLeft,
    Globe,
    Building2,
    ExternalLink,
    MapPin,
    Cpu,
    Wrench,
    HeartHandshake
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SecurityPartnersPage: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const securityPartners = [
        { name: "アーマテック株式会社", brand: "CLIFFORD", url: "http://clifford.co.jp/", desc: "クリフォード正規輸入元。最高峰の防犯技術を日本へ。" },
        { name: "加藤電機株式会社", brand: "VIPER / HORNET / セキュリティラウンジ", url: "https://kato-denki.com/", desc: "世界を代表するセキュリティブランドVIPERを展開。" },
        { name: "CAN plus", brand: "アンパイア", url: "http://www.ampire.jp/", desc: "最新デジタルセキュリティAMPIREの正規輸入元。" },
        { name: "クラフトマン", brand: "LOCK音", url: "http://lockon.to/", desc: "ハリウッド映画のようなサウンドアンサーバックを展開。" },
        { name: "株式会社ユピテル", brand: "GRGO / Panthera / レーダー探知機", url: "http://www.yupiteru.co.jp/", desc: "日本専用に開発された最高峰ブランドGrgo・パンテーラを展開。" },
        { name: "シーバスリンク", brand: "HID / LED / ライティングユニット", url: "http://www.seabass-link.co.jp/", desc: "高品質なライティングシステムと電子部品を提供。" },
        { name: "SMART DIVISION", brand: "HID / インターフェース", url: "http://minkara.carview.co.jp/userid/560861/profile/", desc: "輸入車向けの電装パーツ・ライティングを幅広く展開。" },
        { name: "BELLOF", brand: "HID / LED / バッテリーチャージャー", url: "http://www.bellof.co.jp/", desc: "ライティング及び電源関連のトップブランド。" },
        { name: "クラッツィオ", brand: "シートカバー / 内装パーツ", url: "http://www.11i.co.jp/", desc: "高品質シートカバー。内装の保護と美観を両立。" }
    ];

    const technicalPartners = [
        { name: "カギ商福岡", desc: "スペアキー作製・特殊キー対応", url: "http://www.kuruma-kagi.com/" },
        { name: "ハローサービス", desc: "カーフィルム施工・ボディコーティング", url: "http://efuhs-tint.com/" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500/10 selection:text-emerald-600 overflow-x-hidden">
            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg h-16 md:h-20' : 'bg-transparent h-20 md:h-28'}`}>
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/security-home')}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur shadow-sm border border-slate-200 hover:bg-slate-100 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/security-home')}>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition-all">
                                <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg md:text-xl font-black tracking-tighter leading-none">ANG NETWORK</span>
                                <span className="text-[9px] font-black tracking-[0.3em] text-emerald-600 uppercase mt-1 leading-none italic">Security Partners</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center md:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-[10px] font-black tracking-widest uppercase mb-8 italic">
                            <HeartHandshake className="w-3.5 h-3.5" /> Reliability & Technology
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter italic leading-[0.95] mb-8 uppercase">
                            信頼の<br />
                            <span className="text-emerald-600">パートナーシップ</span>
                        </h1>
                        <p className="text-slate-500 font-bold text-lg md:text-xl leading-relaxed max-w-2xl italic">
                            確かな技術力と実績を持つメーカー、そして専門分野で協力し合うパートナー企業。Sound ANGが自信を持って推奨する、セキュリティ・ネットワークをご紹介します。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Partner Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {securityPartners.map((partner, i) => (
                            <motion.a
                                key={i}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-emerald-500/20 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col justify-between"
                            >
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                                            <Building2 className="w-6 h-6" />
                                        </div>
                                        <div className="px-4 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black italic rounded-full uppercase tracking-tighter">Official Dealer</div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{partner.name}</h3>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-tight">{partner.brand}</span>
                                        </div>
                                        <p className="text-slate-400 font-bold text-sm leading-relaxed italic">
                                            {partner.desc}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-10 flex items-center justify-end">
                                    <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-200 group-hover:text-emerald-500 group-hover:border-emerald-500/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Partners */}
            <section className="py-32 bg-slate-100 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="mb-20">
                        <span className="text-emerald-600 font-black tracking-[0.4em] uppercase text-[11px] mb-4 block italic">Specialized Services</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight italic uppercase">技術提携パートナー</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {technicalPartners.map((site, i) => (
                            <a
                                key={i}
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-w-[320px] p-10 rounded-[3rem] bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-emerald-500/20 border border-transparent transition-all group flex flex-col items-center gap-6"
                            >
                                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200 group-hover:bg-emerald-500 group-hover:text-white transition-all transform group-hover:rotate-12">
                                    <Wrench className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black italic mb-2">{site.name}</h4>
                                    <p className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.2em]">{site.desc}</p>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 font-black text-[10px] group-hover:text-emerald-600 transition-colors italic">
                                    Visit Website <ExternalLink className="w-3 h-3" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-slate-300">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="w-8 h-8" />
                        <span className="font-black text-sm tracking-tighter uppercase px-2 py-0.5 border-2 border-slate-100 rounded-md">ANG SAFETY NETWORK</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-center">© 2026 AUTO SECURITY ANG. TRUSTED BY PROFESSIONALS.</p>
                </div>
            </footer>
        </div>
    );
};

export default SecurityPartnersPage;
