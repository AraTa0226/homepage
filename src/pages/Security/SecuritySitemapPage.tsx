import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
    ShieldCheck,
    ChevronRight,
    Car,
    Lock,
    Zap,
    Eye,
    Camera,
    Settings,
    HelpCircle,
    Handshake,
    Calendar,
    ArrowLeft,
    Home,
    Wrench,
    MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SecuritySitemapPage: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        document.title = "セキュリティーサイトマップ | 福岡市・大野城のANG";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "福岡のカーセキュリティ専門店ANGのサイトマップ。パンテーラ、ゴルゴ等の導入プランや、最新の盗難手口（CANインベーダー、リレーアタック）対策。福岡市内はもちろん九州全域からのお客様をお待ちしております。");
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sitemapData = [
        {
            title: "車種別おすすめセキュリティー",
            icon: Car,
            color: "text-blue-500",
            bg: "bg-blue-50",
            links: [
                { name: "ランドクルーザー 300", path: "/security/vehicle/toyota-landcruiser-300" },
                { name: "ランドクルーザー 250", path: "/security/vehicle/toyota-landcruiser-250" },
                { name: "ランドクルーザー 70", path: "/security/vehicle/toyota-landcruiser-70" },
                { name: "ランドクルーザー プラド (150/200)", path: "/security/vehicle/toyota-landcruiser-prado-150-200" },
                { name: "レクサス LX600", path: "/security/vehicle/lexus-lx" },
                { name: "レクサス GX550", path: "/security/vehicle/lexus-gx550" },
                { name: "レクサス RX (10系/20系/TALH17)", path: "/security/vehicle/lexus-rx" },
                { name: "レクサス NX", path: "/security/vehicle/lexus-nx" },
                { name: "レクサス LBX / LM", path: "/security/vehicle/lexus-lbx" },
                { name: "アルファード / ヴェルファイア (40系)", path: "/security/vehicle/toyota-alphard-vellfire" },
                { name: "ハリアー (80系)", path: "/security/vehicle/toyota-harrier" },
                { name: "プリウス (60系)", path: "/security/vehicle/toyota-prius" },
                { name: "クラウン (スポーツ/クロスオーバー等)", path: "/security/vehicle/toyota-crown" },
                { name: "ハイエース (200系)", path: "/security/vehicle/toyota-hiace" },
                { name: "シビック TYPE-R (FL5)", path: "/security/vehicle/honda-civic-typer" },
                { name: "ジムニー / シエラ (JB64/74)", path: "/security/vehicle/suzuki-jimny" },
                { name: "軽自動車 専用おまかせプラン", path: "/security/vehicle/kcar-special" },
                { name: "その他車種・輸入車・旧車", path: "/security/vehicle/special-model" }
            ]
        },
        {
            title: "セキュリティーブランド",
            icon: ShieldCheck,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            links: [
                { name: "Panthera (パンテーラ)", path: "/security/panthera" },
                { name: "Grgo (ゴルゴ)", path: "/security/grgo" },
                { name: "VIPER (バイパー)", path: "/security/viper" },
                { name: "CLIFFORD (クリフォード)", path: "/security/clifford" }
            ]
        },
        {
            title: "最新盗難手口・対策",
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-50",
            links: [
                { name: "リレーアタック対策", path: "/security/relay-attack" },
                { name: "CANインベーダー対策", path: "/security/can-invader" },
                { name: "キーエミュレーター対策", path: "/security/key-emulator" }
            ]
        },
        {
            title: "周辺機器・支援装置",
            icon: Camera,
            color: "text-slate-500",
            bg: "bg-slate-100",
            links: [
                { name: "ドライブレコーダー", path: "/security/drive_recorder" },
                { name: "レーダー探知機", path: "/security/radar" },
                { name: "デジタルインナーミラー", path: "/security/digital_mirror" },
                { name: "送迎バス置き去り防止装置", path: "/security/okizariboushi" }
            ]
        },
        {
            title: "サービス・サポート",
            icon: Settings,
            color: "text-indigo-500",
            bg: "bg-indigo-50",
            links: [
                { name: "セキュリティー診断・点検サービス", path: "/security/maintain" },
                { name: "よくあるご質問 (FAQ)", path: "/faq" },
                { name: "信頼のパートナー", path: "/security/partners" },
                { name: "店舗案内・アクセス", path: "/security-home#access" },
                { name: "ご相談・施工予約", path: "/reservation" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-emerald-500/10 selection:text-emerald-600 overflow-x-hidden">
            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg h-16 md:h-20' : 'bg-transparent h-20 md:h-28'}`}>
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/security-home')}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur shadow-sm border border-slate-200 hover:bg-slate-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-4" onClick={() => navigate('/security-home')}>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition-all cursor-pointer">
                                <Home className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col cursor-pointer">
                                <span className="text-lg md:text-xl font-black tracking-tighter leading-none uppercase">SITE MAP</span>
                                <span className="text-[9px] font-black tracking-[0.3em] text-emerald-600 uppercase mt-1 leading-none italic">Security Section</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 md:pt-48 md:pb-20 overflow-hidden bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-none mb-6">サイトマップ</h1>
                        <p className="text-slate-500 font-bold text-lg leading-relaxed italic">
                            オートセキュリティーANGが提供する、すべてのセキュリティーサービス・コンテンツを一覧でご確認いただけます。
                        </p>
                    </motion.div>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
                    <ShieldCheck className="w-[120%] h-[120%] -mr-[30%] -mt-[10%] rotate-12" />
                </div>
            </section>

            {/* Sitemap Grid */}
            <section className="py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
                        {sitemapData.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4 border-b-2 border-slate-100 pb-6">
                                    <div className={`w-14 h-14 rounded-2xl ${section.bg} flex items-center justify-center ${section.color} shadow-sm`}>
                                        <section.icon className="w-7 h-7" />
                                    </div>
                                    <h2 className="text-xl font-black tracking-tight">{section.title}</h2>
                                </div>
                                <ul className="space-y-1">
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <button
                                                onClick={() => {
                                                    if (link.path.includes('#')) {
                                                        const [url, hash] = link.path.split('#');
                                                        navigate(url);
                                                        setTimeout(() => {
                                                            const el = document.getElementById(hash);
                                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                                        }, 100);
                                                    } else {
                                                        navigate(link.path);
                                                    }
                                                }}
                                                className="group flex items-center justify-between w-full p-4 rounded-xl hover:bg-white hover:shadow-md hover:shadow-slate-200/50 transition-all text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-emerald-500 transition-colors" />
                                                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{link.name}</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="mt-32 p-10 md:p-16 rounded-[3rem] bg-slate-900 overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-md text-center md:text-left">
                                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter italic italic">CONTACT US</h3>
                                <p className="text-gray-400 font-bold leading-relaxed">
                                    愛車の防犯に関するご相談や、プランの詳細についてはお気軽にお問い合わせください。専門スタッフが最適なシステムをご提案いたします。
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <button
                                    onClick={() => navigate('/reservation')}
                                    className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 transition-all flex items-center justify-center gap-4"
                                >
                                    オンライン予約 <ChevronRight className="w-5 h-5" />
                                </button>
                                <a
                                    href="tel:092-503-5437"
                                    className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black hover:bg-white/10 transition-all flex items-center justify-center gap-4"
                                >
                                    電話で相談予約
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="py-12 px-6 bg-white border-t border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                    © 2026 AUTO SECURITY ANG. ALL RIGHTS RESERVED.
                </p>
            </footer>
        </div>
    );
};
