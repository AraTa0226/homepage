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
    AlertTriangle,
    Award,
    Wrench,
    Activity,
    Settings2
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { BusinessCalendar } from '../../components/Calendar/BusinessCalendar';
import { PartnersSection } from '../../components/PartnersSection';
import { VaultGrid } from '../../components/VaultGrid';

interface SecurityMainPageProps {
    assets: any;
    emergencyAnnouncement: any;
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
                                        {cat.groups ? (
                                            <div className="grid grid-cols-1 gap-6 py-2">
                                                {cat.groups.map((group: any, gIdx: number) => (
                                                    <div key={gIdx} className="space-y-2">
                                                        <div className="text-[9px] font-black text-emerald-500/60 tracking-[0.2em] border-b border-emerald-500/5 pb-1 mb-2 uppercase">
                                                            {group.name}
                                                        </div>
                                                        <div className="flex flex-col gap-1.5">
                                                            {group.items.map((item: string, idx: number) => (
                                                                <button
                                                                    key={idx}
                                                                    onClick={() => {
                                                                        onClose();
                                                                        handleMenuClick({ id: cat.id, name: item });
                                                                    }}
                                                                    className="text-left text-[11px] font-bold text-gray-500 hover:text-emerald-600 transition-colors flex items-center gap-2 group/mlink"
                                                                >
                                                                    <div className="w-1 h-1 rounded-full bg-gray-100 group-hover/mlink:bg-emerald-400 transition-colors" />
                                                                    {item}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            cat.items?.map((item: string, idx: number) => (
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
                                            ))
                                        )}
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
    facilities,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    handleLogoClick,
    navigate,
    handleMenuClick,
    showMegaMenu,
    setShowMegaMenu,
}) => {

    const [isLineupExpanded, setIsLineupExpanded] = useState(false);
    const [showFullAuditionList, setShowFullAuditionList] = useState(false);
    const theme = 'light'; // Security theme is now light to match the physical store



    const securityCategories = [
        {
            id: 'security_car',
            title: '車種別おすすめセキュリティ',
            subtitle: 'VEHICLE',
            image: assets.pitImage,
            gridClass: 'lg:col-span-3',
            groups: [
                {
                    name: 'LEXUS',
                    items: ['GX550', 'LX', 'RX', 'NX', 'LBX']
                },
                {
                    name: 'TOYOTA',
                    items: [
                        'ランドクルーザー 300',
                        'ランドクルーザー 250',
                        'ランドクルーザー プラド',
                        'ランクル 70',
                        'アルファード / ヴェルファイア (40系)',
                        'クラウン各種',
                        'ハリアー',
                        'ハイエース',
                        'プリウス'
                    ]
                },
                {
                    name: 'OTHER',
                    items: [
                        'シビック TYPE-R (FL5)',
                        'ジムニー / シエラ / ノマド',
                        'K-CAR 専用セキュリティ',
                        '上記以外もご相談ください'
                    ]
                }
            ],
            path: '/security/panthera'
        },
        {
            id: 'security_full',
            title: 'セキュリティー&置き去り防止システム',
            subtitle: 'SECURITY & SAFETY',
            image: assets.securityMenuImage,
            gridClass: 'col-span-1',
            items: [
                'Panthera (パンテーラ) Z-Series',
                'Grgo (ゴルゴ) VⅡ',
                'Viper (バイパー)',
                'Clifford (クリフォード)',
                '送迎バス 置き去り防止支援装置'
            ],
            path: '/security/panthera'
        },
        {
            id: 'security_options',
            title: '運転支援・セーフティ',
            subtitle: 'SAFETY UPGRADE',
            image: assets.dashcamMenuImage,
            gridClass: 'col-span-1',
            items: [
                'ドライブレコーダー',
                'レーダー探知機',
                'デジタルインナーミラー'
            ],
            path: '/security/drive_recorder'
        },
        {
            id: 'maintenance',
            title: '最新の盗難手口とサポート',
            subtitle: 'TECH & SUPPORT',
            image: assets.workspaceImage,
            gridClass: 'col-span-1',
            items: [
                '一瞬で盗まれる『リレーアタック』の手口',
                '最新手口『CANインベーダー』',
                '最凶の次世代手口『キーエミュレーター』',
                'セキュリティー診断サービス',
                'よくあるご質問 (FAQ)'
            ],
            path: '/security/panthera'
        }
    ];

    return (
        <div className={`min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-500/30 selection:text-emerald-900`}>


            <header className="fixed top-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-gray-100">
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
                                <span className="text-xl md:text-2xl font-black tracking-tighter leading-none text-gray-900">AUTO SECURITY ANG</span>
                            </div>
                        </div>
                    </div>

                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold uppercase tracking-widest shrink-0">
                        <a href="#" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-emerald-500">HOME</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">ホーム</span>
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
                                    <span className={`text-sm font-black tracking-widest ${showMegaMenu ? 'font-black' : ''}`}>MENU</span>
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
                            className="flex flex-col items-center group/item transition-colors border-l border-gray-100 pl-4 ml-2"
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
                            aria-label="LINEで相談"
                        >
                            <MessageSquare className="w-5 h-5 md:mr-2" />
                            <span className="hidden sm:inline text-[10px] tracking-widest">LINE相談</span>
                        </a>

                        <button
                            onClick={() => navigate('/reservation')}
                            className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-emerald-600 text-white rounded-xl font-black transition-all hover:bg-emerald-700 shadow-lg shadow-emerald-500/10 shrink-0"
                            aria-label="来店予約"
                        >
                            <CalendarIcon className="w-5 h-5 md:mr-2" />
                            <span className="hidden sm:inline text-[10px] tracking-widest">来店予約</span>
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
                        className="bg-emerald-50 backdrop-blur-md rounded-[2rem] p-6 md:p-8 shadow-2xl border-2 border-emerald-500/30 flex flex-col md:flex-row items-center gap-6"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <Megaphone className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <span className="text-emerald-600 font-black text-xs uppercase tracking-widest mb-1 block">Important Notice</span>
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                {emergencyAnnouncement.image && (
                                    <SafeImage
                                        src={emergencyAnnouncement.image}
                                        alt="お知らせ画像"
                                        className="w-32 h-32 object-cover rounded-xl shadow-md border border-gray-100"
                                    />
                                )}
                                <p className="text-gray-900 font-black text-lg md:text-xl leading-tight whitespace-pre-wrap flex-grow">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
                    {/* Security Scan Grid Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 w-full">
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex flex-col gap-4 mb-10">
                            <div className="inline-flex items-center gap-3 w-fit px-6 py-2.5 bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/20">
                                <Lock className="w-3.5 h-3.5" />
                                <span className="text-xs md:text-sm font-black uppercase tracking-[0.15em] whitespace-nowrap">
                                    福岡のカーセキュリティー専門店
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tighter italic">
                            日常の安心を、<br />
                            <span className="text-emerald-600">守護する技術。</span>
                        </h1>

                        <div className="flex flex-col gap-4 mb-12">
                            {[
                                { icon: Eye, text: "最新型キャンインベーダー対策" },
                                { icon: Zap, text: "Panthera / Grgo 正規認定店" },
                                { icon: ShieldCheck, text: "30年以上の実績と高度な解析技術" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group/hitem cursor-default">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover/hitem:border-emerald-500/50 transition-colors">
                                        <item.icon className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <span className="text-lg md:text-xl font-bold text-gray-700">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-6 mt-8">
                            <div className="flex items-center gap-2 p-1.5 bg-gray-100/50 backdrop-blur-2xl border border-gray-200 rounded-2xl w-fit">
                                <button
                                    onClick={() => navigate('/')}
                                    className="group px-8 py-3 rounded-xl hover:bg-white flex items-center gap-3 transition-all"
                                >
                                    <Speaker className="w-4 h-4 text-blue-500/50 group-hover:text-blue-500" />
                                    <span className="text-gray-400 group-hover:text-gray-900 text-[11px] font-black tracking-widest uppercase">Audio focus</span>
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

            {/* Professional Standards & Certifications Section */}
            <section className="py-32 relative overflow-hidden bg-[#0c1412]">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                {/* Security Data Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                        {/* Left Side: Sticky Image / Brand Identity */}
                        <div className="lg:col-span-5 lg:sticky lg:top-32">
                            <div className="space-y-8">
                                <span className="text-emerald-500 font-black tracking-[0.5em] uppercase text-[10px] block">The Protocol of Trust</span>
                                <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter italic">
                                    THE <br />
                                    <span className="text-emerald-500 shadow-emerald-500/20 [text-shadow:_0_0_20px_rgb(16_185_129_/_0.3)]">STANDARDS.</span>
                                </h2>
                                <p className="text-gray-400 font-bold text-lg leading-relaxed max-w-sm">
                                    メーカーの認めた技術と、確かなツール。当店が維持し続ける、カーセキュリティーの「正解」です。
                                </p>
                                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 group aspect-square lg:aspect-auto lg:h-[400px]">
                                    <SafeImage
                                        src={assets.pitImage}
                                        alt="Professional Installation"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Editorial Flow */}
                        <div className="lg:col-span-7 space-y-20">
                            {/* Point 01: SPS */}
                            <div className="relative pl-12">
                                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-emerald-500/10 to-transparent"></div>
                                <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Award className="w-8 h-8 text-emerald-500" />
                                        <span className="text-emerald-500 font-black text-[10px] tracking-widest uppercase italic">01 / Specialist Status</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white tracking-tight">Panthera / Grgo SPS認定店</h3>
                                    <p className="text-gray-400 font-bold leading-relaxed text-sm">
                                        Super Pro Shop (SPS) は、最新のセキュリティーシステムを高度に解析し、マシンのポテンシャルを最大限に引き出す取付技術を有するとメーカーが正式に認定した店舗です。
                                        <br /><br />
                                        <span className="text-white">高度な見識に基づき、各車両の特性に合わせた「最適な防犯設計」を構築。</span> 機能を熟知しているからこそ、誤作動を抑えつつ防犯能力を極限まで高める施工をお約束します。
                                    </p>
                                </div>
                            </div>

                            {/* Point 02: VIPER */}
                            <div className="relative pl-12">
                                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-blue-500/20 to-transparent"></div>
                                <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <ShieldCheck className="w-8 h-8 text-blue-500" />
                                        <span className="text-blue-500 font-black text-[10px] tracking-widest uppercase italic">02 / Official Partnership</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white tracking-tight">VIPER プレミアムディーラー</h3>
                                    <div className="space-y-6">
                                        <p className="text-gray-400 font-bold leading-relaxed text-sm">
                                            VIPER製品の取り扱いに精通したマイスター店として、正規販売から、高度な取付技術が必要となる車両への施工、万全のアフターサポートまで対応。
                                        </p>
                                        <div className="flex flex-col gap-3">
                                            {[
                                                { label: 'VIPER プレミアムディーラー', desc: 'マイスター認定を受けた上位店舗' },
                                                { label: 'VIPER 取付実績表彰', desc: '豊富な施工実績に基づく確かな経験値' },
                                                { label: '正規販売・取付店', desc: '正規品の保証とサポートを完全準拠' }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                                                    <div>
                                                        <p className="text-white font-black text-xs leading-none mb-1">{item.label}</p>
                                                        <p className="text-gray-500 text-[10px] font-bold">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Point 03: Snap-on */}
                            <div className="relative pl-12">
                                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-white via-white/10 to-transparent"></div>
                                <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Settings2 className="w-8 h-8 text-white" />
                                        <span className="text-white font-black text-[10px] tracking-widest uppercase italic">03 / Precision Tools</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white tracking-tight italic">Snap-on Diagnostic Standard</h3>
                                    <p className="text-gray-400 font-bold leading-relaxed text-sm">
                                        最新車両の電子制御システムとセキュリティーの融合を高次元で成立させるため、施工後の最終診断には <span className="text-white font-black underline decoration-white/30 decoration-2 underline-offset-4">Snap-on社製車両診断テスター</span> を使用。
                                        <br /><br />
                                        ジャッキやバッテリー充電器、お客様の大切な愛車に触れる資機材において、信頼のおけるSnap-on社製を採用し、最善のメンテナンスと品質管理を徹底しています。
                                    </p>
                                    <div className="pt-6 flex gap-4">
                                        <div className="px-6 py-2 rounded-full border border-white/20 text-[9px] font-black text-white/40 uppercase tracking-widest">Digital Diagnosis</div>
                                        <div className="px-6 py-2 rounded-full border border-white/20 text-[9px] font-black text-white/40 uppercase tracking-widest">Pro-grade Maintenance</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lineup Section */}
            <section id="services" className="py-32 px-4 bg-white relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"></div>
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <span className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Security Menu</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic text-gray-900">MENU</h2>
                    </div>
                    <VaultGrid
                        categories={securityCategories}
                        theme={theme}
                        onCategoryClick={(cat: any) => navigate(cat.path)}
                        handleMenuClick={handleMenuClick}
                    />
                </div>
            </section>

            {/* Partnership Solutions Section */}
            <section className="py-32 bg-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
                        <div className="space-y-4">
                            <span className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px] block">Special Collaboration</span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic text-gray-900 leading-none">PARTNERSHIP<br /><span className="text-emerald-600 underline decoration-emerald-500/20 underline-offset-8">SOLUTIONS.</span></h2>
                            <p className="text-gray-500 font-bold max-w-xl text-lg mt-6">確かな技術を持つパートナー企業との提携により、車のある生活をより豊かに、より安心にするための特別なソリューションをご提案します。</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* CAMPit Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col h-full hover:border-emerald-500/30 transition-all duration-700"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                <SafeImage src="/images/Home/campit.webp" alt="CAMPit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-8 left-8">
                                    <span className="bg-emerald-500 text-black text-[9px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">Outdoor & Lifestyle</span>
                                </div>
                            </div>
                            <div className="p-12 flex flex-col flex-grow">
                                <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tighter italic">CAMPit <span className="text-sm not-italic opacity-40 ml-2">（キャンピット）</span></h3>
                                <p className="text-emerald-600 font-black text-lg mb-6 leading-tight select-none">
                                    「何もないところがキャンプ場になる」
                                </p>
                                <p className="text-gray-500 font-bold leading-relaxed mb-10 flex-grow text-sm">
                                    本格システムキッチン、50L給水タンク、そして清潔なトイレを完備。 “清潔、快適、簡単” をコンセプトに、場所を選ばず最高級のキャンプ体験を可能にする移動型ユニットです。
                                </p>
                                <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                                    <a
                                        href="https://campit.jp/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/btn flex items-center gap-3 text-gray-900 font-black"
                                    >
                                        <span className="text-xs tracking-widest border-b-2 border-emerald-500 pb-1 group-hover/btn:border-emerald-600 transition-colors">OFFICIAL SITE</span>
                                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mobile Toilet Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group relative bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col h-full hover:border-blue-500/30 transition-all duration-700"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                <SafeImage src="/images/Home/mobile-toilet.webp" alt="MobiRest" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-8 left-8">
                                    <span className="bg-blue-500 text-white text-[9px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">Safety & Hygiene</span>
                                </div>
                            </div>
                            <div className="p-12 flex flex-col flex-grow">
                                <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tighter italic whitespace-pre-wrap">MobiRest <span className="text-sm not-italic opacity-40 ml-2">（モビレスト）</span></h3>
                                <p className="text-blue-600 font-black text-lg mb-6 leading-tight select-none">
                                    「あなたの近くに運べる、水要らずのトイレルーム」
                                </p>
                                <p className="text-gray-500 font-bold leading-relaxed mb-10 flex-grow text-sm">
                                    水を使わず熱圧着で排泄物を密閉する「ラップポン」システムを採用。臭わず清潔、上下水道不要でどこでも設置可能。災害時やイベントに最適な超低床設計の移動型トイレユニットです。
                                </p>
                                <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                                    <a
                                        href="https://campit.jp/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/btn flex items-center gap-3 text-gray-900 font-black"
                                    >
                                        <span className="text-xs tracking-widest border-b-2 border-blue-500 pb-1 group-hover/btn:border-blue-600 transition-colors">OFFICIAL SITE</span>
                                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                {/* Visual Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white -z-10 skew-y-3 origin-right"></div>
            </section>


            <BusinessCalendar theme="light" />
            <PartnersSection onViewAll={() => navigate('/partners')} />

            {/* Access Section */}
            <section id="access" className="py-24 md:py-32 bg-[#0c1412] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div>
                                <span className="text-emerald-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Store & Access</span>
                                <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-8 italic text-white underline decoration-emerald-500/30">SHOP INFO</h2>
                                <p className="text-gray-400 font-bold leading-relaxed mb-8">
                                    福岡県大野城市の御笠川沿いに位置する、九州No.1の施工実績を誇るプロショップ。<br />
                                    完全予約制のピット、最新鋭の診断設備、そしてオーナー様がリラックスできる商談スペースを完備しています。
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* First large image (Exterior) */}
                                <div className="col-span-2 group relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5">
                                    <SafeImage src={assets.heroImage} alt="Sound ANG 店舗外観" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent flex items-end p-6">
                                        <span className="text-white font-black text-sm tracking-widest uppercase">Shop Exterior</span>
                                    </div>
                                </div>
                                {/* Remaining facilities */}
                                {facilities.map((fac, idx) => (
                                    <div key={idx} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-white/5">
                                        <SafeImage src={fac.image} alt={fac.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                                            <span className="text-white font-black text-[10px] tracking-widest uppercase">{fac.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8 lg:sticky lg:top-32">
                            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10 hover:border-emerald-500/30 transition-all duration-700">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.293409151244!2d130.4851219762696!3d33.54575497335133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3541908696b9963f%3A0x6b976696b9963f!2zU291bmQgQU5H!5e0!3m2!1sja!2sjp!4v1712288000000!5m2!1sja!2sjp"
                                    className="w-full h-full"
                                    loading="lazy"
                                />
                            </div>

                            <div className="p-8 rounded-[2.5rem] bg-white/5 shadow-2xl border border-white/10 backdrop-blur-sm">
                                <h4 className="text-[10px] font-black tracking-widest text-emerald-500 uppercase mb-4">Location Address</h4>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="font-black text-white text-lg leading-tight tracking-tight">〒816-0912</p>
                                        <p className="font-bold text-gray-400 text-sm mt-1">福岡県大野城市御笠川5-4-14</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-[#020202] text-gray-400 py-24 relative overflow-hidden border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                        <div className="col-span-1 lg:col-span-1">
                            <div className="text-2xl font-black italic tracking-tighter text-white mb-6">
                                AUTO SECURITY <span className="text-emerald-500">ANG</span>
                            </div>
                            <p className="text-[10px] font-bold leading-relaxed mb-8 opacity-60 uppercase tracking-widest">
                                Premium Car Security & Armor <br /> Professional Installation Suite
                            </p>
                            <div className="flex gap-4">
                                <a href="https://www.facebook.com/profile.php?id=100063630308258" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-lg">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="https://www.instagram.com/sound_ang_security/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-lg">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-black text-xs tracking-widest uppercase mb-8">Contact Information</h4>
                            <ul className="space-y-6 text-sm">
                                <li className="flex gap-4">
                                    <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <div className="space-y-1">
                                        <p className="text-white font-black">092-503-5437 <span className="text-[8px] opacity-40 ml-2 uppercase">Security Line</span></p>
                                        <p className="text-white font-black">092-503-5421 <span className="text-[8px] opacity-40 ml-2 uppercase">Audio Line</span></p>
                                    </div>
                                </li>
                                <li className="flex gap-4 pt-4 border-t border-white/5">
                                    <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <div className="space-y-1">
                                        <a href="mailto:ang@sec-ang.com" className="block text-white hover:text-emerald-500 transition-colors">ang@sec-ang.com</a>
                                        <a href="mailto:ang@soundang.com" className="block text-white hover:text-emerald-500 transition-colors text-xs opacity-60">ang@soundang.com</a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-black text-xs tracking-widest uppercase mb-8">Quick Navigation</h4>
                            <ul className="space-y-4 text-sm font-bold">
                                <li><a href="#" className="hover:text-emerald-500 transition-colors">Top</a></li>
                                <li><a href="#services" className="hover:text-white transition-colors">Menu</a></li>
                                <li><a href="#access" className="hover:text-white transition-colors">Shop Access</a></li>
                                <li><button onClick={() => navigate('/reservation')} className="text-emerald-500 hover:underline">Consultation Booking</button></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-black text-xs tracking-widest uppercase mb-8">Legal & Business</h4>
                            <div className="space-y-6">
                                <p className="text-[10px] font-black leading-relaxed opacity-40">
                                    適格請求書発行事業者登録番号<br />
                                    <span className="text-white font-mono tracking-tight opacity-100">T4290002038758</span>
                                </p>
                                <div className="space-y-2">
                                    <button onClick={() => navigate('/legal')} className="block text-xs hover:text-white transition-colors">Privacy Policy</button>
                                    <button onClick={() => navigate('/legal')} className="block text-xs hover:text-white transition-colors">Terms of Service</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[10px] font-black tracking-widest uppercase opacity-40">© 2026 AUTO SECURITY ANG. SECURITY ARMOR SYSTEMS.</p>
                        <div className="flex gap-8">
                            <span className="text-[8px] font-black text-emerald-500/40 uppercase tracking-[0.4em]">Official Certified SPS Dealer</span>
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
                            className="fixed top-0 right-0 bottom-0 w-[320px] bg-white z-[100] lg:hidden flex flex-col shadow-2xl border-l border-gray-100"
                        >
                            <div className="p-6 h-16 md:h-24 flex items-center justify-between border-b border-gray-100">
                                <span className="font-black tracking-tighter text-xl italic text-gray-900 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500 text-black flex items-center justify-center not-italic">S</div>
                                    MENU
                                </span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors border border-gray-100"
                                >
                                    <X className="w-6 h-6 text-gray-900" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-6">
                                <nav className="flex flex-col gap-3">
                                    {[
                                        { href: "#", en: "HOME", jp: "ホーム" },
                                        { href: "#services", en: "MENU", jp: "メニュー", isExpandable: true },
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
                                                    className="group flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 active:bg-gray-100 transition-all cursor-pointer"
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm font-black tracking-widest">{link.en}</span>
                                                        <span className="text-[9px] font-bold text-emerald-600 opacity-60">{link.jp}</span>
                                                    </div>
                                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all bg-white ${isExpandable && isLineupExpanded ? 'rotate-90 bg-emerald-500 text-black' : ''}`}>
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                <AnimatePresence>
                                                    {isExpandable && isLineupExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden bg-gray-50 rounded-2xl border border-gray-100"
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

                            <div className="p-6 border-t border-gray-100 space-y-3">
                                <a href="tel:0925035437" className="flex items-center justify-center gap-3 w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-sm tracking-widest shadow-xl shadow-emerald-500/10">
                                    <Phone className="w-5 h-5" />
                                    CALL 092-503-5437
                                </a>
                                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/reservation'); }} className="flex items-center justify-center gap-3 w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-black text-sm tracking-widest border border-gray-100">
                                    <CalendarIcon className="w-5 h-5" />
                                    RESERVATION
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div >
    );
};
