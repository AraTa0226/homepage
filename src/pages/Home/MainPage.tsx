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
    Lock
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { BusinessCalendar } from '../../components/Calendar/BusinessCalendar';
import { PartnersSection } from '../../components/PartnersSection';
import { VaultGrid } from '../../components/VaultGrid';

interface MainPageProps {
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
                    <div className={`rounded-3xl shadow-2xl overflow-hidden border ${theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-gray-100'} p-10 w-[1100px]`}>
                        <div className="grid grid-cols-5 gap-8">
                            {categories.map((cat: any) => (
                                <div key={cat.id} className="flex flex-col gap-4">
                                    <div
                                        onClick={() => {
                                            onClose();
                                            navigate(cat.path);
                                        }}
                                        className="flex flex-col gap-1 border-b border-gray-100 pb-3 group/header cursor-pointer"
                                    >
                                        <span className="text-[9px] font-black tracking-[0.2em] text-blue-600 uppercase">{cat.subtitle}</span>
                                        <span className={`text-[13px] font-black tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'} group-hover/header:text-blue-600`}>
                                            {cat.title.split('・')[0]}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {cat.items.map((item: string, idx: number) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    const planMapping: Record<string, any> = {
                                                        "BASIC line (コアキシャル)": { id: "speaker_package", planName: "スピーカー交換BASIC line（コアキシャル）" },
                                                        "BASIC line (セパレート)": { id: "speaker_package", planName: "スピーカー交換BASIC line（セパレート）" },
                                                        "STANDARD line (10万円まで)": { id: "speaker_package", planName: "スピーカー交換STANDARD line（10万円まで）" },
                                                        "PREMIUM line (10万円以上)": { id: "speaker_package", planName: "スピーカー交換PREMIUM line（10万円以上）" },
                                                        "BMW専用パッケージ": { id: "speaker_package", planName: "BMWスピーカー交換パッケージ" },
                                                        "Mercedes Benz専用パッケージ": { id: "speaker_package", planName: "Mercedes Benzスピーカー交換パッケージ" },
                                                        "AMP内蔵DSPパッケージ": { id: "digital_source", planName: "アンプ内蔵DSPパッケージ" },
                                                        "AMPレスDSPパッケージ": { id: "digital_source", planName: "アンプレスDSPパッケージ" },
                                                        "お手軽低音増強 (パワード)": { id: "bass_power", planName: "チューンナップウーファー・パッケージ" },
                                                        "お手軽低音増強＋ (アンプ別)": { id: "bass_power", planName: "大型パワードウーファー・パッケージ" },
                                                        "店内の常時試聴ユニット": { id: "audition-showcase", isAnchor: true },
                                                        "施工ブログ / 店舗詳細": { id: "contact", isAnchor: true }
                                                    };
                                                    const target = planMapping[item] || { id: cat.id };
                                                    onClose();
                                                    handleMenuClick(target);
                                                }}
                                                className="text-[11px] font-bold text-gray-400 hover:text-blue-600 transition-all hover:translate-x-1 text-left flex items-center gap-2 group/link"
                                            >
                                                <div className="w-1 h-1 rounded-full bg-gray-200 group-hover/link:bg-blue-400 transition-colors" />
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

export const MainPage: React.FC<MainPageProps> = ({
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
    auditionSpeakers
}) => {
    const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);
    const [isLineupExpanded, setIsLineupExpanded] = useState(false);
    const [showFullAuditionList, setShowFullAuditionList] = useState(false);

    const hostname = window.location.hostname;
    const isSecurityDomain = hostname.includes('sec-ang.com');
    const theme = isSecurityDomain ? 'dark' : 'light';

    const audioCategories = [
        {
            id: 'speaker',
            title: 'スピーカー・パッケージ',
            subtitle: 'ACOUSTICS',
            image: assets.audioMenuImage,
            gridClass: 'lg:row-span-2',
            items: [
                'BASIC line (コアキシャル)',
                'BASIC line (セパレート)',
                'STANDARD line (10万円まで)',
                'PREMIUM line (10万円以上)',
                'フロント3WAYセット',
                'BMW専用パッケージ',
                'Mercedes Benz専用パッケージ',
                '車種別スピーカー交換プラン',
                'ハイエンドクラス・施工'
            ],
            path: '/audio/sp-package'
        },
        {
            id: 'amp',
            title: 'DSP / アンプ / ウーファー',
            subtitle: 'ELECTRONICS',
            image: assets.auditionRoomImage,
            items: [
                'AMP内蔵DSPパッケージ',
                'AMPレスDSPパッケージ',
                'アンプインスト・パッケージ',
                '省スペース小型アンプ',
                'お手軽低音増強 (パワード)',
                'お手軽低音増強＋ (アンプ別)',
                'サイバーナビ・プラン'
            ],
            path: '/audio/amp-dsp'
        },
        {
            id: 'custom',
            title: '施工・カスタム',
            subtitle: 'EXPERT CUSTOM',
            image: assets.workspaceImage,
            items: [
                'カスタムインストール',
                'ツィーターCOOLマウント',
                'オリジナルアウターバッフル',
                'サブウーハー施工のアレコレ',
                'ヘッドユニット / プロセッサー'
            ],
            path: '/audio/custom'
        },
        {
            id: 'tech',
            title: 'ハイレゾ・デジタル',
            subtitle: 'TECH & DIGITAL',
            image: assets.showroomImage,
            items: [
                'ハイレゾ導入のススメ',
                'いま注目！メディアプレーヤー',
                'デジタルソース・ビルドアップ'
            ],
            path: '/audio/digital-source'
        },
        {
            id: 'deadening',
            title: 'デッドニング・音響パーツ',
            subtitle: 'DEADENING',
            image: assets.pitImage,
            items: [
                'ドアチューニング (デッドニング)',
                'サイレントチューニング (静音)',
                '電源強化 / バッ直施工'
            ],
            path: '/audio/deadening'
        }
    ];

    const securityCategories = [
        {
            id: 'security',
            title: 'SECURITY VAULT',
            subtitle: 'ACTIVE GUARD',
            image: assets.securityMenuImage,
            gridClass: 'lg:col-span-2 lg:row-span-2',
            items: ['Panthera Z-Series', 'Grgo V-Series', 'Relay Attack Defense'],
            path: '/security/panthera'
        },
        {
            id: 'gadgets',
            title: 'DASHCAM / HUD',
            subtitle: 'DIGITAL EYE',
            image: assets.dashcamMenuImage,
            items: ['Digital Mirror', 'Radar Detector', 'Dual Cam Recording'],
            path: '/security/drive_recorder'
        }
    ];

    const categories = isSecurityDomain ? securityCategories : audioCategories;

    return (
        <div className={`min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 ${theme === 'dark' ? 'dark' : ''}`} >


            <header className="fixed top-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-16 md:h-24 flex items-center gap-2">
                    <div className="flex-1 flex items-center">
                        <div
                            className="flex items-center gap-3 cursor-pointer select-none group"
                            onClick={handleLogoClick}
                        >
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all shadow-xl ${theme === 'dark' ? 'bg-emerald-500 text-black' : 'bg-gray-900 text-white'
                                }`}>
                                <span className="font-black text-xl italic tracking-tighter">S</span>
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-xl md:text-2xl font-black tracking-tighter leading-none ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sound ANG</span>
                            </div>
                        </div>
                    </div>

                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold uppercase tracking-widest shrink-0">
                        <a href="#" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-blue-500">HOME</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">ホーム</span>
                        </a>
                        <div
                            className="relative py-8 group/nav"
                            onMouseEnter={() => setShowMegaMenu(true)}
                            onMouseLeave={() => setShowMegaMenu(false)}
                        >
                            <button
                                className={`flex flex-col items-center transition-colors group-hover/nav:text-blue-500 ${showMegaMenu ? 'text-blue-500' : ''}`}
                            >
                                <div className="flex items-center gap-1">
                                    <span className={`text-sm font-black tracking-widest ${showMegaMenu ? 'font-black' : ''}`}>MENU</span>
                                    <ChevronRight className={`w-3 h-3 transition-transform ${showMegaMenu ? 'rotate-90' : ''}`} />
                                </div>
                                <span className="text-[8px] font-bold opacity-40 group-hover/nav:opacity-100 transition-opacity">メニュー一覧</span>
                            </button>
                            <MegaMenu
                                show={showMegaMenu}
                                categories={categories}
                                theme={theme}
                                onClose={() => setShowMegaMenu(false)}
                                navigate={navigate}
                                handleMenuClick={handleMenuClick}
                            />
                        </div>
                        <a href="#blog" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-blue-500">BLOG</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">ブログ</span>
                        </a>
                        <a href="#access" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-blue-500">ACCESS</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">店舗案内</span>
                        </a>
                        <button
                            onClick={() => navigate('/security-home')}
                            className="flex flex-col items-center group/item transition-colors border-l border-gray-100 pl-4 ml-2"
                        >
                            <span className="text-sm font-black tracking-widest text-emerald-600 group-hover/item:text-emerald-500">SECURITY</span>
                            <span className="text-[8px] font-bold text-emerald-600/40 group-hover/item:text-emerald-500 transition-opacity">セキュリティー版</span>
                        </button>
                    </nav>

                    <div className="flex-1 flex items-center justify-end gap-1.5 md:gap-3">
                        <a
                            href="https://page.line.me/312qjhsq?openQrModal=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-[#06C755] text-white rounded-xl font-black transition-all hover:bg-[#05b34c] shadow-sm shrink-0"
                            aria-label="LINEで相談する"
                        >
                            <MessageSquare className="w-5 h-5 md:mr-2" />
                            <span className="hidden sm:inline text-[10px] tracking-widest">LINE相談</span>
                        </a>

                        <button
                            onClick={() => navigate('/reservation')}
                            className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-blue-600 text-white rounded-xl font-black transition-all hover:bg-blue-700 shadow-sm shrink-0"
                            aria-label="来店予約"
                        >
                            <CalendarIcon className="w-5 h-5 md:mr-2" />
                            <span className="hidden sm:inline text-[10px] tracking-widest">来店予約</span>
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors shrink-0"
                            aria-label={isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {
                emergencyAnnouncement.active && emergencyAnnouncement.text && (
                    <div className="max-w-7xl mx-auto px-4 pt-24 -mb-16 relative z-30">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 rounded-[2rem] p-6 md:p-8 shadow-2xl border-2 border-red-500 flex flex-col md:flex-row items-center gap-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                                <Megaphone className="w-8 h-8 text-red-600" />
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <span className="text-red-600 font-black text-xs uppercase tracking-widest mb-1 block">Emergency Notice</span>
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    {emergencyAnnouncement.image && (
                                        <SafeImage
                                            src={emergencyAnnouncement.image}
                                            alt="緊急のお知らせ画像"
                                            className="w-32 h-32 object-cover rounded-xl shadow-md"
                                        />
                                    )}
                                    <p className="text-gray-900 font-black text-lg md:text-xl leading-tight whitespace-pre-wrap flex-grow">
                                        {emergencyAnnouncement.text}
                                    </p>
                                </div>
                            </div>
                            {emergencyAnnouncement.link && (
                                <a
                                    href={emergencyAnnouncement.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-red-600 text-white px-8 py-4 rounded-xl font-black text-sm tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200 shrink-0"
                                >
                                    詳細を見る
                                </a>
                            )}
                        </motion.div>
                    </div>
                )
            }

            {/* Hero Section */}
            <section className="relative pt-20">
                <div className="absolute inset-0 overflow-hidden">
                    <SafeImage
                        src={assets.heroImage}
                        alt="Sound ANG 店舗正面イメージ"
                        className="w-full h-full object-cover"
                        loading="eager"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-32 md:py-40">
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex flex-col gap-4 mb-8">
                            <div className="inline-flex items-center gap-2 md:gap-3 w-fit px-4 py-2 md:px-6 md:py-2.5 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20">
                                <span className="text-white text-[9px] md:text-sm font-black uppercase tracking-[0.15em] whitespace-nowrap">
                                    福岡のカーオーディオ専門店
                                </span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-7xl font-black text-white mb-8 leading-[1.2] md:leading-[1.1] tracking-tighter">
                            <span className="block md:inline whitespace-nowrap">感性を揺さぶる至高の音、</span><br className="hidden md:block" />
                            <span className="block md:inline whitespace-nowrap">サウンドエナジー</span>
                        </h1>

                        <div className="flex flex-col gap-3 mb-10">
                            <div className="flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                <span className="text-blue-500 text-lg md:text-3xl font-black opacity-90 tracking-tight leading-none">パイオニア最高峰「TS-Z1GR」認定店</span>
                            </div>
                        </div>
                        <p className="text-base md:text-2xl text-gray-200 mb-8 font-bold leading-relaxed max-w-3xl">
                            音を極め、音楽の真髄を届け続けて30年以上。<br className="hidden md:block" />
                            国内屈指の技術を誇るハイエンド・オーディオの繊細な調音と施工。<br className="hidden md:block" />
                            熟練の職人技で、あなたのカーライフに究極の感動を。
                        </p>
                        <div className="flex flex-col gap-6 mt-8">
                            <div className="flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl w-fit">
                                <button
                                    disabled
                                    className="relative px-8 py-3 rounded-xl bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-3 transition-all cursor-default"
                                >
                                    <Speaker className="w-4 h-4 text-white" />
                                    <span className="text-white text-[11px] font-black tracking-widest uppercase">Audio focus</span>
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                                    />
                                </button>
                                <button
                                    onClick={() => navigate('/security-home')}
                                    className="group px-8 py-3 rounded-xl hover:bg-white/5 flex items-center gap-3 transition-all"
                                >
                                    <Lock className="w-4 h-4 text-emerald-500/50 group-hover:text-emerald-500" />
                                    <span className="text-white/40 group-hover:text-white text-[11px] font-black tracking-widest uppercase">Security focus</span>
                                    <ArrowUpRight className="w-3 h-3 text-emerald-500/0 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase pl-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                Currently Viewing: High-End Audio Showcase
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden text-gray-900">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Journal & Blog</span>
                            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter italic text-gray-900">BLOG</h2>
                            <p className="text-gray-500 mt-4 font-bold leading-relaxed">
                                最新の施工事例や、カーオーディオに関する深い知識、日々の出来事を発信しています。
                            </p>
                        </div>
                        <a
                            href="https://soundang.com/webbrog/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-white px-8 py-4 rounded-2xl border border-gray-200 text-sm font-black hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-500/5"
                        >
                            ブログ一覧を見る
                            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </a>
                    </div>

                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-4">
                            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {posts.map((post, i) => (
                                <motion.a
                                    key={i}
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative bg-white rounded-[2.5rem] p-8 pl-10 border border-gray-100 hover:border-blue-500/20 transition-all shadow-xl hover:shadow-2xl overflow-hidden"
                                >
                                    {/* Left Accent Line */}
                                    <div className="absolute left-0 top-10 bottom-10 w-1 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:scale-y-110 transition-transform origin-center" />

                                    <div className="mb-6 flex justify-between items-start">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                            <div className="text-[10px] font-black text-white">ANG</div>
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{post.date}</span>
                                    </div>
                                    <h3 className="text-lg font-black leading-snug text-gray-900 group-hover:text-blue-600 transition-colors" dangerouslySetInnerHTML={{ __html: post.title }} />
                                    <div className="mt-8 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                                        Read More <ChevronRight className="w-3 h-3" />
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 py-10 font-bold">記事が見つかりませんでした。</p>
                    )}
                </div>
            </section>

            {/* Lineup Section */}
            <section id="services" className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-4xl font-black tracking-tighter">MENU</h2>
                    </div>
                    <VaultGrid
                        categories={categories}
                        theme={theme}
                        onCategoryClick={(cat: any) => navigate(cat.path)}
                        handleMenuClick={handleMenuClick}
                    />
                </div>
            </section>

            {/* Audition Showcase */}
            {
                !isSecurityDomain && (
                    <section id="options" className="py-24 md:py-32 bg-gray-900 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 skew-x-12 translate-x-1/2"></div>
                        <div className="max-w-7xl mx-auto px-4 relative z-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                                <div className="max-w-2xl">
                                    <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Sonic Experience Center</span>
                                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">AUDITION</h2>
                                    <p className="text-gray-400 mt-6 font-bold text-lg leading-relaxed">
                                        店内の常時試聴ユニットで、世界最高峰のサウンドをご体感ください。<br />
                                        熟練のインストーラーが、お客様の好みに合わせたシステムをご提案します。
                                    </p>
                                </div>
                            </div>

                            {/* Top 4 Spotlight */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                                {auditionSpeakers.slice(0, 4).map((speaker, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group relative bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 overflow-hidden"
                                    >
                                        <div className="aspect-[4/3] relative overflow-hidden">
                                            <SafeImage
                                                src={speaker.image}
                                                alt={speaker.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                            <div className="absolute bottom-4 left-6">
                                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{speaker.brand}</span>
                                                <h3 className="text-lg font-black text-white">{speaker.name}</h3>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-xs text-gray-400 font-bold mb-4 line-clamp-2">{speaker.desc}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black tracking-widest text-emerald-400">ON DEMAND</span>
                                                {speaker.youtubeId && (
                                                    <button
                                                        onClick={() => setActiveYoutubeId(speaker.youtubeId)}
                                                        className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform"
                                                    >
                                                        <Youtube className="w-4 h-4 text-white" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => setShowFullAuditionList(!showFullAuditionList)}
                                    className="group inline-flex items-center gap-4 bg-white text-gray-900 px-10 py-5 rounded-2xl font-black text-sm tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl"
                                >
                                    {showFullAuditionList ? 'CLOSE LIST' : 'VIEW ALL SPEAKERS'}
                                    <ChevronRight className={`w-5 h-5 transition-transform ${showFullAuditionList ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                                </button>
                            </div>

                            <AnimatePresence>
                                {showFullAuditionList && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-16 overflow-hidden"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {auditionSpeakers.slice(4).map((speaker, idx) => (
                                                <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors">
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{speaker.brand}</span>
                                                        <span className="font-black text-sm">{speaker.name}</span>
                                                    </div>
                                                    {speaker.youtubeId && (
                                                        <button
                                                            onClick={() => setActiveYoutubeId(speaker.youtubeId)}
                                                            className="text-gray-500 hover:text-red-500 transition-colors"
                                                        >
                                                            <Youtube className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>
                )
            }

            <BusinessCalendar />
            <PartnersSection onViewAll={() => navigate('/partners')} />

            {/* Access Section */}
            <section id="access" className="py-24 md:py-32 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div>
                                <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Store & Access</span>
                                <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-8 italic text-white">SHOP INFO</h2>
                                <p className="text-gray-400 font-bold leading-relaxed mb-8">
                                    30年以上の実績を持つカーオーディオ・セキュリティ専門店。
                                    福岡県大野城市の御笠川沿いに店舗を構えております。
                                    こちらの外観を目印にお越しください。駐車場も完備しております。
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* First large image (Exterior) */}
                                <div className="col-span-2 group relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-white/5">
                                    <SafeImage src={assets.heroImage} alt="Sound ANG 店舗外観" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent flex items-end p-6">
                                        <span className="text-white font-black text-sm tracking-widest uppercase">Shop Exterior</span>
                                    </div>
                                </div>
                                {/* Remaining 4 facilities */}
                                {facilities.map((fac, idx) => (
                                    <div key={idx} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-white/5">
                                        <SafeImage src={fac.image} alt={fac.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                                            <span className="text-white font-black text-xs tracking-widest">{fac.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8 lg:sticky lg:top-32">
                            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10 hover:border-blue-500/30 transition-all duration-700">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.293409151244!2d130.4851219762696!3d33.54575497335133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3541908696b9963f%3A0x6b976696b9963f!2zU291bmQgQU5H!5e0!3m2!1sja!2sjp!4v1712288000000!5m2!1sja!2sjp"
                                    className="w-full h-full"
                                    loading="lazy"
                                />
                            </div>

                            <div className="p-8 rounded-[2.5rem] bg-white/5 shadow-2xl border border-white/10 backdrop-blur-sm">
                                <h4 className="text-[10px] font-black tracking-widest text-blue-500 uppercase mb-4">Location Address</h4>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-blue-500" />
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
            <footer id="contact" className="bg-gray-900 text-gray-400 py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                        <div className="col-span-1 lg:col-span-1">
                            <div className="text-2xl font-black italic tracking-tighter text-white mb-6">SOUND ANG</div>
                            <p className="text-xs font-bold leading-relaxed mb-8 opacity-60 uppercase tracking-widest">
                                Premium Car Audio & Security <br /> Professional Installation Suite
                            </p>
                            <div className="flex gap-4">
                                <a href="https://www.facebook.com/profile.php?id=100063630308258" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-lg">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="https://www.instagram.com/sound_ang_security/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:text-white transition-all shadow-lg">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-black text-xs tracking-widest uppercase mb-8">Contact Information</h4>
                            <ul className="space-y-6 text-sm">
                                <li className="flex gap-4">
                                    <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                                    <div className="space-y-1">
                                        <p className="text-white font-black">092-503-5421 <span className="text-[8px] opacity-40 ml-2">AUDIO</span></p>
                                        <p className="text-white font-black">092-503-5437 <span className="text-[8px] opacity-40 ml-2">SECURITY</span></p>
                                        <p className="text-[10px] opacity-40 underline">FAX: 092-503-5492</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 pt-4 border-t border-white/5">
                                    <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                                    <div className="space-y-1">
                                        <a href="mailto:ang@soundang.com" className="block text-white hover:text-blue-500 transition-colors">ang@soundang.com</a>
                                        <a href="mailto:ang@sec-ang.com" className="block text-white hover:text-blue-500 transition-colors">ang@sec-ang.com</a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-black text-xs tracking-widest uppercase mb-8">Quick Links</h4>
                            <ul className="space-y-4 text-sm font-bold">
                                <li><a href="#" className="hover:text-blue-500 transition-colors">Home</a></li>
                                <li><a href="#blog" className="hover:text-white transition-colors">BLOG</a></li>
                                <li><a href="#blog" className="hover:text-white transition-colors">Event Archive</a></li>
                                <li><a href="#blog" className="hover:text-white transition-colors">Latest News</a></li>
                                <li><a href="#services" className="hover:text-white transition-colors">Audio Menu</a></li>
                                <li><a href="#options" className="hover:text-white transition-colors">Audition Room</a></li>
                                <li><button onClick={() => navigate('/reservation')} className="text-blue-500 hover:underline">Reservation Center</button></li>
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
                        <p className="text-[10px] font-black tracking-widest">© 2026 SOUND ANG. PREMIUM INSTALLATION GROUP.</p>

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
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[340px] bg-white z-[100] shadow-2xl lg:hidden flex flex-col"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-gray-50">
                                <span className="font-black tracking-tighter text-xl text-blue-600 italic">SOUND ANG</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-6 text-gray-900">
                                <nav className="flex flex-col gap-3">
                                    {[
                                        { href: "#", en: "HOME", jp: "ホーム" },
                                        { href: "#blog", en: "BLOG", jp: "ブログ" },
                                        { href: "#services", en: "MENU", jp: "メニュー", isExpandable: true },
                                        { href: "#options", en: "AUDITION", jp: "試聴スピーカー" },
                                        { href: "#partners", en: "BRANDS", jp: "取扱ブランド" },
                                        { href: "#info", en: "SCHEDULE", jp: "営業日" },
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
                                                    className="group flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white text-gray-900 active:bg-gray-50 transition-all cursor-pointer"
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm font-black tracking-widest">{link.en}</span>
                                                        <span className="text-[9px] font-bold text-gray-400">{link.jp}</span>
                                                    </div>
                                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all bg-gray-50 ${isExpandable && isLineupExpanded ? 'rotate-90 bg-blue-50 text-blue-600' : ''}`}>
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </div>

                                                {isExpandable && (
                                                    <AnimatePresence>
                                                        {isLineupExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden bg-gray-50 rounded-2xl border border-gray-100"
                                                            >
                                                                <div className="p-4 flex flex-col gap-6">
                                                                    {audioCategories.map((cat: any) => (
                                                                        <div key={cat.id} className="space-y-3">
                                                                            <div
                                                                                onClick={() => {
                                                                                    setIsMobileMenuOpen(false);
                                                                                    navigate(cat.path);
                                                                                }}
                                                                                className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.15em] border-l-4 border-blue-500 pl-4 py-2 cursor-pointer"
                                                                            >
                                                                                {cat.subtitle}
                                                                                <ArrowUpRight className="w-3 h-3 opacity-40 ml-auto" />
                                                                            </div>
                                                                            <div className="flex flex-col gap-1 pl-3">
                                                                                {cat.items.map((item: string, idx: number) => (
                                                                                    <button
                                                                                        key={idx}
                                                                                        onClick={() => {
                                                                                            const planMapping: Record<string, any> = {
                                                                                                "BASIC line (コアキシャル)": { id: "speaker_package", planName: "スピーカー交換BASIC line（コアキシャル）" },
                                                                                                "BASIC line (セパレート)": { id: "speaker_package", planName: "スピーカー交換BASIC line（セパレート）" },
                                                                                                "STANDARD line (10万円まで)": { id: "speaker_package", planName: "スピーカー交換STANDARD line（10万円まで）" },
                                                                                                "PREMIUM line (10万円以上)": { id: "speaker_package", planName: "スピーカー交換PREMIUM line（10万円以上）" },
                                                                                                "BMW専用パッケージ": { id: "speaker_package", planName: "BMWスピーカー交換パッケージ" },
                                                                                                "Mercedes Benz専用パッケージ": { id: "speaker_package", planName: "Mercedes Benzスピーカー交換パッケージ" },
                                                                                                "AMP内蔵DSPパッケージ": { id: "digital_source", planName: "アンプ内蔵DSPパッケージ" },
                                                                                                "AMPレスDSPパッケージ": { id: "digital_source", planName: "アンプレスDSPパッケージ" },
                                                                                                "お手軽低音増強 (パワード)": { id: "bass_power", planName: "チューンナップウーファー・パッケージ" },
                                                                                                "お手軽低音増強＋ (アンプ別)": { id: "bass_power", planName: "大型パワードウーファー・パッケージ" },
                                                                                                "店内の常時試聴ユニット": { id: "audition-showcase", isAnchor: true },
                                                                                                "施工ブログ / 店舗詳細": { id: "contact", isAnchor: true }
                                                                                            };
                                                                                            const target = planMapping[item] || { id: cat.id };
                                                                                            setIsMobileMenuOpen(false);
                                                                                            handleMenuClick(target);
                                                                                        }}
                                                                                        className="text-[13px] leading-snug font-bold text-gray-500 hover:text-blue-600 transition-colors text-left flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                                                                                    >
                                                                                        {item}
                                                                                        <ChevronRight className="w-3 h-3 opacity-30" />
                                                                                    </button>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                )}
                                            </div>
                                        );
                                    })}
                                </nav>
                            </div>

                            <div className="p-6 border-t border-gray-50 space-y-3">
                                <a
                                    href="https://page.line.me/312qjhsq?openQrModal=true"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center gap-1 w-full py-4 bg-[#06C755] text-white rounded-2xl shadow-lg shadow-green-500/20"
                                >
                                    <div className="flex items-center gap-3 font-black text-sm">
                                        <MessageSquare className="w-5 h-5" />
                                        LINEで相談する
                                    </div>
                                    <span className="text-[10px] font-bold opacity-90">※車種別適合の見積相談OK</span>
                                </a>
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        navigate('/reservation');
                                    }}
                                    className="flex flex-col items-center justify-center gap-1 w-full py-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20"
                                >
                                    <div className="flex items-center gap-3 font-black text-sm">
                                        <CalendarIcon className="w-5 h-5" />
                                        来店予約・お問い合わせ
                                    </div>
                                    <span className="text-[10px] font-bold opacity-80">※初めての方もお気軽にどうぞ</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Full Screen Modals */}
            <AnimatePresence>
                {activeYoutubeId && (
                    <motion.div className="fixed inset-0 z-[200] bg-black p-4 flex items-center justify-center">
                        <X className="absolute top-6 right-6 text-white cursor-pointer" onClick={() => setActiveYoutubeId(null)} />
                        <iframe src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1`} className="w-full max-w-4xl aspect-video" allowFullScreen />
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};
