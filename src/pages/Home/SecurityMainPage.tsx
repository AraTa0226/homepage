import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ShieldCheck,
    ChevronRight,
    MessageSquare,
    Calendar as CalendarIcon,
    X,
    Menu,
    Megaphone,
    ArrowUpRight,
    Search,
    Speaker,
    Youtube,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Loader2,
    Clock,
    Lock,
    Eye,
    Zap,
    AlertTriangle
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { BusinessCalendar } from '../../components/Calendar/BusinessCalendar';
import { PartnersSection } from '../../components/PartnersSection';
import { VaultGrid } from '../../components/VaultGrid';

interface SecurityMainPageProps {
    assets: any;
    emergencyAnnouncement: any;
    posts: any[];
    loading: boolean;
    facilities: any[];
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
    handleLogoClick: () => void;
    navigate: (path: string) => void;
    handleMenuClick: (item: any) => void;
    showMegaMenu: boolean;
    setShowMegaMenu: (show: boolean) => void;
    auditionSpeakers: any[];
}

const MegaMenu = ({ show, categories, theme, onClose, navigate, handleMenuClick }: any) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 pointer-events-auto"
                >
                    <div className={`rounded-3xl shadow-2xl overflow-hidden border ${theme === 'dark' ? 'bg-black border-emerald-500/20' : 'bg-white border-gray-100'} p-10 w-[1100px]`}>
                        <div className="grid grid-cols-5 gap-8">
                            {categories.map((cat: any) => (
                                <div key={cat.id} className="flex flex-col gap-4">
                                    <div
                                        onClick={() => {
                                            onClose();
                                            navigate(cat.path);
                                        }}
                                        className="flex flex-col gap-1 border-b border-emerald-500/10 pb-3 group/header cursor-pointer"
                                    >
                                        <span className="text-[9px] font-black tracking-[0.2em] text-emerald-500 uppercase">{cat.subtitle}</span>
                                        <span className={`text-[13px] font-black tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'} group-hover/header:text-emerald-500`}>
                                            {cat.title.split('・')[0]}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {cat.items.map((item: string, idx: number) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    // Mapping logic for security items
                                                    onClose();
                                                    handleMenuClick({ id: cat.id, name: item });
                                                }}
                                                className="text-[11px] font-bold text-gray-400 hover:text-emerald-500 transition-all hover:translate-x-1 text-left flex items-center gap-2 group/link"
                                            >
                                                <div className="w-1 h-1 rounded-full bg-gray-200 group-hover/link:bg-emerald-400 transition-colors" />
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const SecurityMainPage: React.FC<SecurityMainPageProps> = ({
    assets,
    emergencyAnnouncement,
    posts,
    loading,
    facilities,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    handleLogoClick,
    navigate,
    handleMenuClick,
    showMegaMenu,
    setShowMegaMenu,
}) => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [isLineupExpanded, setIsLineupExpanded] = useState(false);
    const [showFullAuditionList, setShowFullAuditionList] = useState(false);
    const theme = 'dark'; // Security theme is always dark

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "ang888") {
            setShowPasswordModal(false);
            navigate('/staff');
        } else {
            setPasswordError(true);
        }
    };

    const securityCategories = [
        {
            id: 'security_full',
            title: '最新カーセキュリティ',
            subtitle: 'SYSTEMS',
            image: assets.securityMenuImage,
            gridClass: 'lg:col-span-2 lg:row-span-2',
            items: [
                'Panthera (パンテーラ) Z-Series',
                'Grgo (ゴルゴ) V-Series',
                'Author Alarm (オーサーアラーム)',
                'IGLA2+ (イグラ)',
                'Keyless Phantom (キーレスファントム)',
                'TOR (トール)',
                'KVANT (クバント)'
            ],
            path: '/security'
        },
        {
            id: 'can_invader',
            title: 'キャンインベーダー対策',
            subtitle: 'PROTECTION',
            image: assets.pitImage,
            items: [
                'IGLA ALARM',
                'KLB (キーレスブロック)',
                'デジタル・イモビライザー',
                'Author Alarm・防犯施工'
            ],
            path: '/security'
        },
        {
            id: 'dashcam',
            title: 'ドラレコ・デジタルミラー',
            subtitle: 'EYE & RECORD',
            image: assets.dashcamMenuImage,
            items: [
                '前後2カメラ・ドラレコ',
                '360度＋リアカメラ・モデル',
                '駐車監視オプションセット',
                'デジタルインナーミラー'
            ],
            path: '/dashcam'
        },
        {
            id: 'radar',
            title: 'レーダー・レーザー探知機',
            subtitle: 'RADAR & LASER',
            image: assets.showroomImage,
            items: [
                '最新MSSS対応モデル',
                'セパレート型・高性能探知機',
                'OBDII・車両情報連携'
            ],
            path: '/dashcam'
        },
        {
            id: 'maintenance',
            title: 'サポート・点検',
            subtitle: 'SUPPORT',
            image: assets.workspaceImage,
            items: [
                'セキュリティ定期点検',
                'リモコン電池・消耗品交換',
                'システム・アップグレード'
            ],
            path: '/security'
        }
    ];

    return (
        <div className={`min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-200 dark`}>
            {/* Password Modal */}
            <AnimatePresence>
                {showPasswordModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-gray-900 rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl border border-white/5"
                        >
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter text-white">管理者認証</h3>
                                <p className="text-gray-500 text-sm font-bold mt-1 uppercase tracking-widest">Admin Access</p>
                            </div>
                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordError(false);
                                        }}
                                        placeholder="パスワードを入力"
                                        className={`w-full bg-black/50 border-2 rounded-2xl px-6 py-4 text-center font-bold tracking-widest placeholder:text-gray-700 focus:outline-none focus:ring-4 transition-all ${passwordError ? 'border-red-500 ring-red-500/10' : 'border-white/5 focus:border-emerald-500 focus:ring-emerald-500/10'
                                            }`}
                                        autoFocus
                                    />
                                    {passwordError && (
                                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 text-center">パスワードが正しくありません</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-sm"
                                >
                                    認証する
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPassword("");
                                        setPasswordError(false);
                                    }}
                                    className="w-full text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest py-2"
                                >
                                    キャンセル
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="fixed top-0 left-0 right-0 z-[60] bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 h-16 md:h-24 flex items-center gap-2">
                    <div className="flex-1 flex items-center">
                        <div
                            className="flex items-center gap-3 cursor-pointer select-none group"
                            onClick={handleLogoClick}
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all shadow-xl bg-emerald-500 text-black">
                                <span className="font-black text-xl italic tracking-tighter">S</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl md:text-2xl font-black tracking-tighter leading-none text-white">Security ANG</span>
                            </div>
                        </div>
                    </div>

                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold uppercase tracking-widest shrink-0">
                        <a href="#" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-emerald-500">HOME</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">ホーム</span>
                        </a>
                        <a href="#blog" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-emerald-500">KNOWLEDGE</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">防犯知識</span>
                        </a>
                        <div
                            className="relative py-8 group/nav"
                            onMouseEnter={() => setShowMegaMenu(true)}
                            onMouseLeave={() => setShowMegaMenu(false)}
                        >
                            <button
                                className={`flex flex-col items-center transition-colors group-hover/nav:text-emerald-500 ${showMegaMenu ? 'text-emerald-500' : ''}`}
                            >
                                <div className="flex items-center gap-1">
                                    <span className={`text-sm font-black tracking-widest ${showMegaMenu ? 'font-black' : ''}`}>LINEUP</span>
                                    <ChevronRight className={`w-3 h-3 transition-transform ${showMegaMenu ? 'rotate-90' : ''}`} />
                                </div>
                                <span className="text-[8px] font-bold opacity-40 group-hover/nav:opacity-100 transition-opacity">セキュリティ一覧</span>
                            </button>
                            <MegaMenu
                                show={showMegaMenu}
                                categories={securityCategories}
                                theme={theme}
                                onClose={() => setShowMegaMenu(false)}
                                navigate={navigate}
                                handleMenuClick={handleMenuClick}
                            />
                        </div>
                        <a href="#access" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-emerald-500">ACCESS</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">店舗案内</span>
                        </a>
                        <button
                            onClick={() => navigate('/')}
                            className="flex flex-col items-center group/item transition-colors border-l border-white/10 pl-4 ml-2"
                        >
                            <span className="text-sm font-black tracking-widest text-blue-500 group-hover/item:text-blue-400">AUDIO</span>
                            <span className="text-[8px] font-bold text-blue-500/40 group-hover/item:text-blue-400 transition-opacity">オーディオ版</span>
                        </button>
                    </nav>

                    <div className="flex-1 flex items-center justify-end gap-1.5 md:gap-3">
                        <a
                            href="https://page.line.me/312qjhsq?openQrModal=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-[#06C755] text-white rounded-xl font-black transition-all hover:bg-[#05b34c] shadow-lg shadow-green-500/10 shrink-0"
                            aria-label="LINEで防犯相談"
                        >
                            <MessageSquare className="w-5 h-5 md:mr-2" />
                            <span className="hidden sm:inline text-[10px] tracking-widest">防犯相談</span>
                        </a>

                        <button
                            onClick={() => navigate('/reservation')}
                            className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-emerald-600 text-white rounded-xl font-black transition-all hover:bg-emerald-700 shadow-lg shadow-emerald-500/10 shrink-0"
                            aria-label="施工予約"
                        >
                            <CalendarIcon className="w-5 h-5 md:mr-2" />
                            <span className="hidden sm:inline text-[10px] tracking-widest">施工予約</span>
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-xl transition-colors shrink-0 border border-white/5"
                            aria-label={isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {emergencyAnnouncement.active && emergencyAnnouncement.text && (
                <div className="max-w-7xl mx-auto px-4 pt-24 -mb-16 relative z-30">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/5 backdrop-blur-md rounded-[2rem] p-6 md:p-8 shadow-2xl border-2 border-emerald-500/30 flex flex-col md:flex-row items-center gap-6"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <Megaphone className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <span className="text-emerald-500 font-black text-xs uppercase tracking-widest mb-1 block">Important Notice</span>
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                {emergencyAnnouncement.image && (
                                    <SafeImage
                                        src={emergencyAnnouncement.image}
                                        alt="お知らせ画像"
                                        className="w-32 h-32 object-cover rounded-xl shadow-md border border-white/10"
                                    />
                                )}
                                <p className="text-white font-black text-lg md:text-xl leading-tight whitespace-pre-wrap flex-grow">
                                    {emergencyAnnouncement.text}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative pt-20 h-screen min-h-[700px] flex items-center">
                <div className="absolute inset-0 overflow-hidden">
                    <SafeImage
                        src={assets.securityMenuImage}
                        alt="Security Guard Image"
                        className="w-full h-full object-cover"
                        loading="eager"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20"></div>
                    {/* Security Scan Grid Overlay */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 w-full">
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex flex-col gap-4 mb-10">
                            <div className="inline-flex items-center gap-3 w-fit px-6 py-2.5 bg-emerald-600/10 backdrop-blur-md border border-emerald-500/20 rounded-full">
                                <Lock className="w-4 h-4 text-emerald-500" />
                                <span className="text-emerald-400 text-xs md:text-sm font-black uppercase tracking-[0.2em] whitespace-nowrap">
                                    福岡のカーセキュリティー専門店
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
                            日常の安心を、<br />
                            <span className="text-emerald-500">守護する技術。</span>
                        </h1>

                        <div className="flex flex-col gap-4 mb-12">
                            {[
                                { icon: Eye, text: "最新型キャンインベーダー対策" },
                                { icon: Zap, text: "Panthera / Grgo 正規認定店" },
                                { icon: ShieldCheck, text: "30年以上の実績と高度な解析技術" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group/hitem cursor-default">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/hitem:border-emerald-500/50 transition-colors">
                                        <item.icon className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <span className="text-lg md:text-xl font-bold text-gray-200">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-6 mt-8">
                            <div className="flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl w-fit">
                                <button
                                    onClick={() => navigate('/')}
                                    className="group px-8 py-3 rounded-xl hover:bg-white/5 flex items-center gap-3 transition-all"
                                >
                                    <Speaker className="w-4 h-4 text-blue-500/50 group-hover:text-blue-500" />
                                    <span className="text-white/40 group-hover:text-white text-[11px] font-black tracking-widest uppercase">Audio focus</span>
                                    <ArrowUpRight className="w-3 h-3 text-blue-500/0 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </button>
                                <button
                                    disabled
                                    className="relative px-8 py-3 rounded-xl bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-3 transition-all cursor-default"
                                >
                                    <Lock className="w-4 h-4 text-white" />
                                    <span className="text-white text-[11px] font-black tracking-widest uppercase">Security focus</span>
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-emerald-600 rounded-xl -z-10"
                                    />
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase pl-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Currently Viewing: Vehicle Security Armor
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Knowledge Section (Security Blog) */}
            <section id="blog" className="py-24 md:py-32 bg-[#020202] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-emerald-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Security Knowledge</span>
                            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">最新の盗難情勢と対策</h2>
                            <p className="text-gray-500 mt-4 font-bold leading-relaxed">
                                スマートキーの脆弱性を突いた最新の盗難手口や、それに対抗する術を解説します。
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-4">
                            <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {posts.map((post, i) => (
                                <motion.a
                                    key={i}
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-white/5 rounded-[2.5rem] p-8 border border-white/5 hover:border-emerald-500/30 transition-all shadow-2xl"
                                >
                                    <div className="mb-6 flex justify-between items-start">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                            <AlertTriangle className="w-6 h-6 text-emerald-500" />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{post.date}</span>
                                    </div>
                                    <h3 className="text-lg font-black leading-snug group-hover:text-emerald-400 transition-colors" dangerouslySetInnerHTML={{ __html: post.title }} />
                                    <div className="mt-8 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-emerald-600 uppercase">
                                        View Details <ChevronRight className="w-3 h-3" />
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lineup Section */}
            <section id="services" className="py-32 px-4 bg-black relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <span className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Security Menu</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic">LINEUP</h2>
                    </div>
                    <VaultGrid
                        categories={securityCategories}
                        theme={theme}
                        onCategoryClick={(cat: any) => navigate(cat.path)}
                        handleMenuClick={handleMenuClick}
                    />
                </div>
            </section>

            <BusinessCalendar />
            <PartnersSection onViewAll={() => navigate('/partners')} />

            {/* Access Section (Darker theme) */}
            <section id="access" className="py-32 bg-[#020202] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 text-center mb-20">
                    <span className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Shop Location</span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic">Access</h2>
                </div>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                        <div className="relative h-[500px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.293409151244!2d130.4851219762696!3d33.54575497335133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3541908696b9963f%3A0x6b976696b9963f!2zU291bmQgQU5H!5e0!3m2!1sja!2sjp!4v1712288000000!5m2!1sja!2sjp"
                                className="w-full h-full grayscale invert opacity-80"
                                loading="lazy"
                            />
                        </div>
                        <div className="bg-white/5 rounded-[3rem] p-12 border border-white/10 backdrop-blur-xl flex flex-col justify-center">
                            <div className="space-y-12">
                                <div>
                                    <h4 className="text-emerald-500 font-black tracking-widest text-xs uppercase mb-6">Address</h4>
                                    <div className="flex gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                            <MapPin className="w-7 h-7 text-emerald-500" />
                                        </div>
                                        <div>
                                            <p className="font-black text-white text-3xl tracking-tighter mb-2">〒816-0912</p>
                                            <p className="font-bold text-gray-400 text-lg leading-relaxed">福岡県大野城市御笠川5-4-14</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
                                    <div>
                                        <h4 className="text-emerald-500 font-black tracking-widest text-xs uppercase mb-4">Phone</h4>
                                        <p className="text-white font-black text-xl italic tracking-tight">092-503-5437</p>
                                    </div>
                                    <div>
                                        <h4 className="text-emerald-500 font-black tracking-widest text-xs uppercase mb-4">Open Hours</h4>
                                        <p className="text-white font-black text-xl italic tracking-tight">10:00 - 19:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-black text-gray-500 py-32 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                        <div className="col-span-1">
                            <div className="text-3xl font-black italic tracking-tighter text-white mb-8 group cursor-default">
                                SOUND <span className="text-emerald-500">ANG</span>
                            </div>
                            <div className="flex gap-4">
                                <a href="https://www.facebook.com/profile.php?id=100063630308258" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-xl">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="https://www.instagram.com/sound_ang_security/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-xl">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <h4 className="text-white font-black text-xs tracking-widest uppercase mb-8">Navigation</h4>
                            <ul className="space-y-4 text-sm font-bold">
                                <li><a href="#" className="hover:text-emerald-500 transition-colors">Security Home</a></li>
                                <li><a href="#blog" className="hover:text-white transition-colors">Blog & Archive</a></li>
                                <li><a href="#services" className="hover:text-white transition-colors">Lineup</a></li>
                                <li><a href="#access" className="hover:text-white transition-colors">Access</a></li>
                            </ul>
                        </div>
                        <div className="col-span-2">
                            <h4 className="text-white font-black text-xs tracking-widest uppercase mb-8">Protection Contact</h4>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 opacity-60">Emergency Call</p>
                                    <p className="text-2xl font-black text-white italic">092-503-5437</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 opacity-60">Security Email</p>
                                    <p className="text-xl font-black text-white underline decoration-emerald-500">ang@sec-ang.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase">© 2026 SOUND ANG. SECURITY ARMOR SYSTEMS.</p>
                        <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest">
                            <button onClick={() => navigate('/legal')} className="hover:text-emerald-500">Privacy Policy</button>
                            <button onClick={() => navigate('/legal')} className="hover:text-emerald-500">Terms of Service</button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[320px] bg-black z-[100] lg:hidden flex flex-col shadow-2xl border-l border-white/5"
                        >
                            <div className="p-6 h-16 md:h-24 flex items-center justify-between border-b border-white/5">
                                <span className="font-black tracking-tighter text-xl italic text-white flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500 text-black flex items-center justify-center not-italic">S</div>
                                    MENU
                                </span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-xl transition-colors border border-white/5"
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-6">
                                <nav className="flex flex-col gap-3">
                                    {[
                                        { href: "#", en: "HOME", jp: "ホーム" },
                                        { href: "#blog", en: "KNOWLEDGE", jp: "防犯知識" },
                                        { href: "#services", en: "LINEUP", jp: "メニュー", isExpandable: true },
                                        { href: "#access", en: "ACCESS", jp: "店舗案内" },
                                    ].map((link, i) => {
                                        const isExpandable = link.isExpandable;
                                        return (
                                            <div key={i} className="flex flex-col gap-2">
                                                <div
                                                    onClick={() => {
                                                        if (isExpandable) {
                                                            setIsLineupExpanded(!isLineupExpanded);
                                                        } else {
                                                            setIsMobileMenuOpen(false);
                                                            const element = document.querySelector(link.href);
                                                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                                                        }
                                                    }}
                                                    className="group flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5 text-white active:bg-white/10 transition-all cursor-pointer"
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm font-black tracking-widest">{link.en}</span>
                                                        <span className="text-[9px] font-bold text-emerald-500 opacity-60">{link.jp}</span>
                                                    </div>
                                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all bg-white/5 ${isExpandable && isLineupExpanded ? 'rotate-90 bg-emerald-500 text-black' : ''}`}>
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                <AnimatePresence>
                                                    {isExpandable && isLineupExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden bg-black/40 rounded-2xl border border-white/5"
                                                        >
                                                            <div className="p-2 grid grid-cols-1 gap-1">
                                                                {securityCategories.map((sub, idx) => (
                                                                    <button
                                                                        key={idx}
                                                                        onClick={() => {
                                                                            setIsMobileMenuOpen(false);
                                                                            navigate(sub.path);
                                                                        }}
                                                                        className="flex flex-col p-4 rounded-xl hover:bg-emerald-500/10 text-left transition-colors"
                                                                    >
                                                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{sub.subtitle}</span>
                                                                        <span className="text-xs font-bold text-gray-300">{sub.title}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </nav>
                            </div>

                            <div className="p-6 border-t border-white/5 space-y-3">
                                <a href="tel:0925035437" className="flex items-center justify-center gap-3 w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-sm tracking-widest shadow-xl shadow-emerald-500/10">
                                    <Phone className="w-5 h-5" />
                                    CALL 092-503-5437
                                </a>
                                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/reservation'); }} className="flex items-center justify-center gap-3 w-full bg-white/5 text-white py-4 rounded-2xl font-black text-sm tracking-widest border border-white/10">
                                    <CalendarIcon className="w-5 h-5" />
                                    RESERVATION
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
