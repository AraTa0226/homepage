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
    Loader2
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
                        <VaultGrid
                            categories={categories}
                            theme={theme}
                            onCategoryClick={(cat: any) => {
                                onClose();
                                navigate(cat.path);
                            }}
                            handleMenuClick={(target: any) => {
                                onClose();
                                handleMenuClick(target);
                            }}
                            isMegaMenu={true}
                        />
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
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [selectedAuditionImage, setSelectedAuditionImage] = useState<string | null>(null);
    const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);
    const [isLineupExpanded, setIsLineupExpanded] = useState(false);
    const [showFullAuditionList, setShowFullAuditionList] = useState(false);

    const hostname = window.location.hostname;
    const isSecurityDomain = hostname.includes('sec-ang.com');
    const theme = isSecurityDomain ? 'dark' : 'light';

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "ang888") {
            setShowPasswordModal(false);
            navigate('/staff');
        } else {
            setPasswordError(true);
        }
    };

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
            path: '/security'
        },
        {
            id: 'gadgets',
            title: 'DASHCAM / HUD',
            subtitle: 'DIGITAL EYE',
            image: assets.dashcamMenuImage,
            items: ['Digital Mirror', 'Radar Detector', 'Dual Cam Recording'],
            path: '/dashcam'
        }
    ];

    const categories = isSecurityDomain ? securityCategories : audioCategories;

    return (
        <div className={`min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 ${theme === 'dark' ? 'dark' : ''}`}>
            {/* Password Modal */}
            <AnimatePresence>
                {showPasswordModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl"
                        >
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter text-gray-900">管理者認証</h3>
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
                                        className={`w-full bg-gray-50 border-2 rounded-2xl px-6 py-4 text-center font-bold tracking-widest placeholder:text-gray-300 focus:outline-none focus:ring-4 transition-all ${passwordError ? 'border-red-500 ring-red-100' : 'border-gray-100 focus:border-blue-500 focus:ring-blue-100'
                                            }`}
                                        autoFocus
                                    />
                                    {passwordError && (
                                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2">パスワードが正しくありません</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200 uppercase tracking-widest text-sm"
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
                                    className="w-full text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-widest py-2"
                                >
                                    キャンセル
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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

                    <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest shrink-0">
                        <a href="#" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-blue-500">HOME</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">ホーム</span>
                        </a>
                        <a href="#blog" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-blue-500">BLOG</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">ブログ</span>
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
                                    <span className={`text-sm font-black tracking-widest ${showMegaMenu ? 'font-black' : ''}`}>LINEUP</span>
                                    <ChevronRight className={`w-3 h-3 transition-transform ${showMegaMenu ? 'rotate-90' : ''}`} />
                                </div>
                                <span className="text-[8px] font-bold opacity-40 group-hover/nav:opacity-100 transition-opacity">プラン一覧</span>
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
                        <a href="#options" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-blue-500">AUDITION</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">試聴スピーカー</span>
                        </a>
                        <a href="#partners" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-blue-500">BRANDS</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">取扱ブランド</span>
                        </a>
                        <a href="#info" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-blue-500">SCHEDULE</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">営業日</span>
                        </a>
                        <a href="#access" className="flex flex-col items-center group/item transition-colors">
                            <span className="text-sm font-black tracking-widest group-hover/item:text-blue-500">ACCESS</span>
                            <span className="text-[8px] font-bold opacity-40 group-hover/item:opacity-100 transition-opacity">店舗案内</span>
                        </a>
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

            {emergencyAnnouncement.active && emergencyAnnouncement.text && (
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
            )}

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
                            <div className="inline-flex items-center gap-2 md:gap-3 w-fit px-4 py-2 md:px-6 md:py-2.5 bg-blue-600/10 backdrop-blur-md border border-blue-500/20 rounded-full">
                                <span className="text-blue-400 text-[9px] md:text-sm font-black uppercase tracking-[0.15em] whitespace-nowrap">
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
                    </motion.div>
                </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Journal & Blog</span>
                            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">ブログ</h2>
                            <p className="text-gray-500 mt-4 font-bold leading-relaxed">
                                最新の施工事例や、カーオーディオ・セキュリティに関する役立つ情報を発信しています。
                            </p>
                        </div>
                        <a
                            href="https://soundang.com/webbrog/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/5 border border-gray-100 text-sm font-black hover:bg-blue-600 hover:text-white transition-all"
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
                        <div className="flex flex-col gap-4">
                            {posts.map((post, i) => (
                                <motion.a
                                    key={i}
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col md:flex-row md:items-center bg-white rounded-2xl p-4 md:p-8 gap-3 md:gap-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                                >
                                    <div className="text-gray-500 font-mono text-sm shrink-0">{post.date}</div>
                                    <h3 className="text-lg md:text-xl font-black flex-grow group-hover:text-blue-600 transition-colors"
                                        dangerouslySetInnerHTML={{ __html: post.title }} />
                                    <ChevronRight className="w-5 h-5 text-gray-300 transition-transform group-hover:translate-x-1" />
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
                        <h2 className="text-4xl font-black tracking-tighter">LINEUP</h2>
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
            {!isSecurityDomain && (
                <section id="options" className="py-24 bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl md:text-7xl font-black tracking-tighter mb-12">AUDITION</h2>
                        <div className="text-center mt-12">
                            <button
                                onClick={() => setShowFullAuditionList(!showFullAuditionList)}
                                className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-black"
                            >
                                試聴スピーカー一覧を見る
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <BusinessCalendar />
            <PartnersSection onViewAll={() => navigate('/partners')} />

            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-gray-400 py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="mb-6 font-bold">〒816-0912 福岡県大野城市御笠川5-4-14</p>
                    <div className="flex justify-center gap-6 mb-10">
                        <Facebook className="w-6 h-6 hover:text-white cursor-pointer" />
                        <Instagram className="w-6 h-6 hover:text-white cursor-pointer" />
                    </div>
                    <p className="text-[10px] opacity-20">&copy; 2026 Sound ANG. All rights reserved.</p>
                </div>
            </footer>

            {/* Full Screen Modals */}
            <AnimatePresence>
                {activeYoutubeId && (
                    <motion.div className="fixed inset-0 z-[200] bg-black p-4 flex items-center justify-center">
                        <X className="absolute top-6 right-6 text-white cursor-pointer" onClick={() => setActiveYoutubeId(null)} />
                        <iframe src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1`} className="w-full max-w-4xl aspect-video" allowFullScreen />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
