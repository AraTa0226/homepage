/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Menu,
  X,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Speaker,
  ShieldCheck,
  Package,
  CheckCircle2,
  Award,
  MapPin,
  LayoutGrid,
  Calendar as CalendarIcon,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Lock,
  Megaphone,
  Trophy,
  Music2,
  History,
  Activity,
  Zap,
  ArrowUpRight,
  Youtube,
  Play,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
  Navigate
} from 'react-router-dom';
import { BusinessCalendar } from './components/Calendar/BusinessCalendar';
import { AudioMenuDetail } from './components/Menu/AudioMenuDetail';
import { SecurityMenuDetail } from './components/Menu/SecurityMenuDetail';
import { DashcamMenuDetail } from './components/Menu/DashcamMenuDetail';
import { PriceProvider, usePrices } from './contexts/PriceContext';
import { CalendarProvider } from './contexts/CalendarContext';
import { SiteProvider, useSite } from './contexts/SiteContext';
import { StaffDashboard } from './components/Staff/StaffDashboard';
import { PartnersSection } from './components/PartnersSection';
import { PartnersListPage } from './components/PartnersListPage';
import { ReservationFormPage } from './components/Form/ReservationFormPage';
import { SafeImage } from './components/ui/SafeImage';

interface BlogPost {
  date: string;
  category: string;
  title: string;
  link: string;
  image?: string;
}

// DEPLOY_TIMESTAMP: 2026-04-18T04:45:00Z - Forced Sync for Mobile Menu & Desktop Fix
export default function App() {
  return (
    <BrowserRouter>
      <SiteProvider>
        <PriceProvider>
          <CalendarProvider>
            <AppContent />
          </CalendarProvider>
        </PriceProvider>
      </SiteProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { assets } = useSite();
  const {
    emergencyAnnouncement,
    plans,
    setSelectedPlan,
    setSelectedCategory
  } = usePrices();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showStaffDashboard, setShowStaffDashboard] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showFacilityGallery, setShowFacilityGallery] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const facilities = [
    { title: "ショールーム", image: assets.showroomImage, description: "最新のデモ機を多数展示。ゆったりとご相談いただけます。" },
    { title: "ピット", image: assets.pitImage, description: "最新設備を完備したクリーンな作業環境。愛車を大切にお預かりします。" },
    { title: "ワークスペース", image: assets.workspaceImage, description: "熟練の職人が一つひとつ丁寧に加工を行う、こだわりの作業場。" },
    { title: "試聴室", image: assets.auditionRoomImage, description: "ホームオーディオのような環境で、各スピーカーの個性をじっくり比較。" }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 5) {
      setShowPasswordModal(true);
      setLogoClickCount(0);
    }
    // Reset count after 3 seconds of inactivity
    setTimeout(() => setLogoClickCount(0), 3000);
  };

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();
    if (password === "ang888") {
      setShowStaffDashboard(true);
      navigate('/staff');
      setShowPasswordModal(false);
      setPassword("");
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleMenuClick = (item: any) => {
    setShowMegaMenu(false);
    if (item.isExternal) {
      window.open(item.url, '_blank');
      return;
    }
    if (item.isAnchor) {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Find category and plan
    const category = plans.find(p => p.id === item.id);
    if (category) {
      const planItem = category.items.find(i => i.name === item.planName);
      if (planItem) {
        setSelectedPlan(planItem);
        setSelectedCategory(category);
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin') || params.has('staff')) {
      setShowPasswordModal(true);
      // Clean up the URL without refreshing
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://www.soundang.com/webbrog/wp-json/wp/v2/posts?per_page=3&_embed');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();

        const formattedPosts = data.map((post: any) => {
          const date = new Date(post.date);
          const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog';
          const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

          return {
            date: `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`,
            category: category,
            title: post.title.rendered.replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&#8220;/g, '“').replace(/&#8221;/g, '”').replace(/&#8216;/g, '‘').replace(/&#8217;/g, '’'),
            link: post.link,
            image: image
          };
        });

        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Fallback to static data if fetch fails
        setPosts([
          {
            date: "2026.03.30",
            category: "Audio",
            title: "【ウェブサイトのスピーカー交換パッケージのご紹介】",
            link: "https://www.soundang.com/webbrog/2026/03/30/%e3%80%90%e3%82%a6%e3%82%a7%e3%83%96%e3%82%b5%e3%82%a4%e3%83%88%e3%81%ae%e3%82%b9%e3%83%94%e3%83%bc%e3%82%ab%e3%83%bc%e4%ba%a4%e6%8f%9b%e3%83%91%e3%83%83%e3%82%b1%e3%83%bc%e3%82%b8%e3%81%ae%e3%81%94/"
          },
          {
            date: "2026.03.29",
            category: "Audio",
            title: "【カローラクロスのスピーカー交換】",
            link: "https://www.soundang.com/webbrog/2026/03/29/%e3%80%90%e3%82%ab%e3%83%ad%e3%83%bc%e3%83%a9%e3%82%af%e3%83%ad%e3%82%b9%e3%81%ae%e3%82%b9%e3%83%94%e3%83%bc%e3%82%ab%e3%83%bc%e4%ba%a4%e6%8f%9b%e3%80%91/"
          },
          {
            date: "2026.03.28",
            category: "Info",
            title: "【4月に集中】",
            link: "https://www.soundang.com/webbrog/2026/03/28/%e3%80%904%e6%9c%88%e3%81%ab%e9%9b%86%e4%b8%ad%e3%80%91/"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Routes>
      <Route path="/audio" element={<AudioMenuDetail onBack={() => navigate('/')} />} />
      <Route path="/audio/:planSlug" element={<AudioMenuDetail onBack={() => navigate('/')} />} />
      <Route path="/security" element={
        <SecurityMenuDetail
          onBack={() => navigate('/')}
          onNavigateToDashcam={() => navigate('/dashcam')}
        />
      } />
      <Route path="/security/:planSlug" element={
        <SecurityMenuDetail
          onBack={() => navigate('/')}
          onNavigateToDashcam={() => navigate('/dashcam')}
        />
      } />
      <Route path="/dashcam" element={<DashcamMenuDetail onBack={() => navigate('/')} />} />
      <Route path="/partners" element={<PartnersListPage onBack={() => navigate('/')} />} />
      <Route path="/reservation" element={<ReservationFormPage onBack={() => navigate('/')} />} />

      {/* Legacy Redirects (soundang.com & sec-ang.com) */}
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="/shop.html" element={<Navigate to="/audio" replace />} />
      <Route path="/link.html" element={<Navigate to="/partners" replace />} />
      <Route path="/contact.html" element={<Navigate to="/" replace />} />
      <Route path="/contactus.html" element={<Navigate to="/" replace />} />
      <Route path="/reservation.html" element={<Navigate to="/audio" replace />} />

      {/* Audio Specific Legacy */}
      <Route path="/bmwspeaker.html" element={<Navigate to="/audio/bmwspeaker" replace />} />
      <Route path="/benzspeaker.html" element={<Navigate to="/audio/benzspeaker" replace />} />
      <Route path="/basiccoax.html" element={<Navigate to="/audio/basiccoax" replace />} />
      <Route path="/basicsep.html" element={<Navigate to="/audio/basicsep" replace />} />
      <Route path="/sp-standard.html" element={<Navigate to="/audio/sp-standard" replace />} />
      <Route path="/sp-premium.html" element={<Navigate to="/audio/sp-premium" replace />} />
      <Route path="/ampdsp.html" element={<Navigate to="/audio/ampdsp" replace />} />
      <Route path="/door-turning.html" element={<Navigate to="/audio/door-turning" replace />} />

      {/* Security Specific Legacy */}
      <Route path="/security.html" element={<Navigate to="/security" replace />} />
      <Route path="/rader-drrec.html" element={<Navigate to="/dashcam" replace />} />
      <Route path="/sec-sample.html" element={<Navigate to="/security" replace />} />
      <Route path="/civicfl5-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/harrier-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/prius-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/arver-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/hiace-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/keicar-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/landcruiser300-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/landcruiser70-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/landcruiser250-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/LX600-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/RX-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/NX-security.html" element={<Navigate to="/security" replace />} />
      <Route path="/jimny-security.html" element={<Navigate to="/security" replace />} />

      <Route path="/staff" element={
        showStaffDashboard ? (
          <StaffDashboard onBack={() => {
            setShowStaffDashboard(false);
            navigate('/');
          }} />
        ) : (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold"
            >
              管理者ログインが必要です。クリックして認証
            </button>
          </div>
        )
      } />
      <Route path="/" element={
        <MainView
          assets={assets}
          emergencyAnnouncement={emergencyAnnouncement}
          posts={posts}
          loading={loading}
          showPasswordModal={showPasswordModal}
          setShowPasswordModal={setShowPasswordModal}
          password={password}
          setPassword={setPassword}
          passwordError={passwordError}
          setPasswordError={setPasswordError}
          handlePasswordSubmit={handlePasswordSubmit}
          facilities={facilities}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          handleLogoClick={handleLogoClick}
          navigate={navigate}
          showMegaMenu={showMegaMenu}
          setShowMegaMenu={setShowMegaMenu}
          handleMenuClick={handleMenuClick}
        />
      } />
    </Routes>
  );
}

const VaultGrid = ({ categories, onCategoryClick, theme, handleMenuClick }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[350px] lg:auto-rows-[450px]">
      {categories.map((cat: any, i: number) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onCategoryClick(cat)}
          className={`group relative rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10 w-full min-h-[550px] md:min-h-0 md:h-full ${cat.gridClass || "col-span-1"
            }`}
        >
          {/* Background Image */}
          <SafeImage
            src={cat.image}
            alt={cat.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Theme Overlay */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark'
            ? 'bg-gradient-to-t from-black/95 via-black/60 md:via-black/40 to-transparent group-hover:bg-black/60'
            : 'bg-gradient-to-t from-white/95 via-white/60 md:via-white/40 to-transparent group-hover:bg-white/60'
            }`} />

          {/* Content HUD */}
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col pt-24 md:pt-12">
            <div className={`mb-2 md:mb-auto flex items-center gap-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-blue-600'}`}>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">{cat.subtitle}</span>
              <div className="h-[1px] flex-grow bg-current opacity-30" />
            </div>

            <h3 className={`text-2xl md:text-4xl font-black tracking-tighter mb-4 md:mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {cat.title}
            </h3>

            <div className="space-y-4 relative z-10 flex flex-col justify-end flex-grow pb-4">
              {cat.items.map((item: string, j: number) => (
                <div
                  key={j}
                  onClick={(e) => {
                    e.stopPropagation();
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
                    handleMenuClick(target);
                  }}
                  className={`flex items-center justify-between text-sm font-bold transition-all hover:translate-x-2 p-1 rounded-lg hover:bg-white/5 ${theme === 'dark' ? 'text-white/90 hover:text-white' : 'text-gray-800 hover:text-blue-600'
                    }`}
                >
                  <span>{item}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            {/* Decorative Dot Matrix */}
            <div className="absolute top-8 right-8 grid grid-cols-2 gap-1 opacity-20">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

function MainView({
  assets,
  emergencyAnnouncement,
  posts,
  loading,
  showPasswordModal,
  setShowPasswordModal,
  password,
  setPassword,
  passwordError,
  setPasswordError,
  handlePasswordSubmit,
  facilities,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleLogoClick,
  navigate,
  showMegaMenu,
  setShowMegaMenu,
  handleMenuClick
}: any) {
  const { auditionSpeakers } = usePrices();
  const [showFullAuditionList, setShowFullAuditionList] = useState(false);
  const [selectedAuditionImage, setSelectedAuditionImage] = useState<string | null>(null);
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);

  // Domain & Theme Logic
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

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-24 flex items-center gap-2">
          {/* Left: Logo */}
          <div className="flex-1 flex items-center">
            <div
              className="flex items-center gap-3 cursor-pointer select-none group"
              onClick={handleLogoClick}
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all shadow-xl ${theme === 'dark' ? 'bg-emerald-500 text-black' : 'bg-gray-900 text-white'
                }`}>
                <span className="font-black text-xl italic tracking-tighter">S</span>
              </div>
              <div className="flex flex-col -gap-1">
                <span className={`text-[10px] font-black tracking-[0.3em] uppercase opacity-50 ${theme === 'dark' ? 'text-emerald-400' : 'text-gray-900'}`}>The Vault of</span>
                <span className={`text-xl md:text-2xl font-black tracking-tighter leading-none ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sound ANG</span>
              </div>
            </div>
          </div>

          {/* Center: Desktop Nav */}
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

          {/* Right: Actions */}
          {/* Right: Actions */}
          <div className="flex-1 flex items-center justify-end gap-1.5 md:gap-3">
            {/* LINE Inquiry - Icon only on small screens */}
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

            {/* Reservation - Icon only on small screens */}
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


      {/* Emergency Announcement */}
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
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[100] shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-50">
                <span className="font-black tracking-tighter text-xl">MENU</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors"
                  aria-label="メニューを閉じる"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigate('/audio'); }}
                    className="relative aspect-square rounded-2xl overflow-hidden group/m"
                  >
                    <SafeImage src={assets.audioMenuImage} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-2">
                      <Speaker className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-black uppercase text-center">Audio</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigate('/security'); }}
                    className="relative aspect-square rounded-2xl overflow-hidden"
                  >
                    <SafeImage src={assets.securityMenuImage} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-blue-900/40 flex flex-col items-center justify-center text-white p-2">
                      <ShieldCheck className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-black uppercase text-center">Security</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigate('/dashcam'); }}
                    className="relative aspect-square rounded-2xl overflow-hidden"
                  >
                    <SafeImage src={assets.dashcamMenuImage} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gray-900/40 flex flex-col items-center justify-center text-white p-2">
                      <Package className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-black uppercase text-center">Gadgets</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); navigate('/partners'); }}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100"
                  >
                    <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center text-gray-900 p-2">
                      <LayoutGrid className="w-6 h-6 mb-1 text-blue-500" />
                      <span className="text-[10px] font-black uppercase text-center">Partners</span>
                    </div>
                  </button>
                </div>

                <nav className="flex flex-col gap-2 border-t border-gray-50 pt-4">
                  {[
                    { href: "#", en: "HOME", jp: "ホーム" },
                    { href: "#blog", en: "BLOG", jp: "ブログ" },
                    { href: "#services", en: "LINEUP", jp: "プラン一覧" },
                    { href: "#options", en: "AUDITION", jp: "試聴スピーカー" },
                    { href: "#partners", en: "BRANDS", jp: "取扱ブランド" },
                    { href: "#info", en: "SCHEDULE", jp: "営業日" },
                    { href: "#access", en: "ACCESS", jp: "店舗案内" },
                  ].map((link, i) => {
                    const isActive = location.hash === link.href;
                    return (
                      <a
                        key={i}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center justify-between p-4 rounded-2xl border transition-all ${isActive
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-white border-gray-100 text-gray-900 active:bg-gray-50'
                          }`}
                      >
                        <div className="flex flex-col gap-1">
                          <span className={`text-sm font-black tracking-widest ${isActive ? 'text-white' : 'text-gray-900'}`}>{link.en}</span>
                          <span className={`text-[9px] font-bold ${isActive ? 'text-white/70' : 'text-gray-400'}`}>{link.jp}</span>
                        </div>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-white/20' : 'bg-gray-50 group-active:bg-blue-600 group-active:text-white'}`}>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </a>
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
                  <div className="flex items-center gap-3 font-black text-sm text-[#000000] drop-shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                    LINEで相談する
                  </div>
                  <span className="text-[10px] font-bold opacity-90 text-[#000000] drop-shadow-sm">※車種別適合・見積相談OK</span>
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


      {/* Hero */}
      < section className="relative pt-20" >
        <div className="absolute inset-0 overflow-hidden">
          <SafeImage
            src={assets.heroImage}
            alt="Sound ANG 店舗正面イメージ"
            className="w-full h-full object-cover"
            loading="eager"
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

      {/* Latest Blog / Journal Style List */}
      < section id="blog" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden" >
        {/* Decorative background elements */}
        < div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" ></div >
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50"></div>

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
              <p className="text-sm font-black tracking-widest uppercase">Loading Latest Posts...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {posts.map((post, i) => {
                // Determine color based on category or index
                const colors = [
                  { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', icon: 'bg-blue-600' },
                  { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', icon: 'bg-orange-600' },
                  { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: 'bg-emerald-600' },
                ];
                const color = colors[i % colors.length];

                return (
                  <motion.a
                    key={i}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`ブログ記事を読む: ${post.title.replace(/<[^>]*>/g, '')}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="group flex flex-col md:flex-row md:items-center bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1 p-4 md:p-8 gap-3 md:gap-6"
                  >
                    <div className={`w-1 h-8 md:w-2 md:h-16 rounded-full ${color.icon} shrink-0`}></div>

                    <div className="flex flex-col md:flex-row md:items-center flex-grow gap-4 md:gap-8">
                      <div className="flex items-center gap-4 shrink-0 md:w-32">
                        <span className="text-gray-500 font-mono text-sm font-bold tracking-wider">{post.date}</span>
                      </div>

                      <h3
                        className="text-lg md:text-xl font-black leading-tight group-hover:text-blue-600 transition-colors flex-grow"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      >
                      </h3>
                    </div>

                    <div className="flex items-center justify-between md:justify-end shrink-0 gap-4">
                      <span className="md:hidden text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Read More</span>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 transition-all shadow-sm">
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase tracking-widest">記事が見つかりませんでした。</p>
            </div>
          )}
        </div>
      </section >

      {/* Main Showroom Hub (Audio/Security Selection) */}
      <section id="services" className="py-32 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center md:text-left">
            <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Service Selection</span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-4">
              {isSecurityDomain ? 'SECURITY CATALOG' : 'オーディオ・ラインナップ'}
            </h2>
            <p className={`text-sm font-bold uppercase tracking-[0.2em] opacity-40 ${theme === 'dark' ? 'text-emerald-400' : 'text-blue-600'}`}>
              {isSecurityDomain ? 'Vault Grade Protection for Your Assets' : '最高の音響空間をすべての人に'}
            </p>
          </div>

          <VaultGrid
            categories={categories}
            theme={theme}
            onCategoryClick={(cat: any) => navigate(cat.path)}
            handleMenuClick={handleMenuClick}
          />
        </div>
      </section>

      {/* Audition Speakers Showcase Section (Restored) */}
      {
        !isSecurityDomain && (
          <section id="options" className="py-20 md:py-32 bg-gray-900 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-[150px]"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="text-center mb-12 md:mb-20">
                <span className="text-blue-400 font-black tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 block">Audition Units</span>
                <h2 className="text-3xl md:text-8xl font-black text-white tracking-tighter mb-6 md:mb-8 leading-none">
                  常時試聴可能な<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">スピーカーのご紹介</span>
                </h2>
                <p className="text-gray-400 font-bold text-sm md:text-xl max-w-3xl mx-auto mb-10 md:mb-16 leading-relaxed">
                  百聞は一見（一聴）に如かず。ANGでは、国内外の厳選されたスピーカーを実際に聴き比べ、納得のいく音を見つけていただける環境を整えています。
                </p>
              </div>

              {/* Dynamic Grid for Speakers */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-12 md:mb-24">
                {auditionSpeakers.flatMap(brand =>
                  brand.units.map(unit => ({ ...unit, brand: brand.brand, origin: brand.origin }))
                ).slice(0, 5).map((sp, i) => {
                  const layouts = [
                    { col: "md:col-span-8", row: "h-[300px] md:h-[500px]" },
                    { col: "md:col-span-4", row: "h-[300px] md:h-[500px]" },
                    { col: "md:col-span-4", row: "h-[300px] md:h-[450px]" },
                    { col: "md:col-span-4", row: "h-[300px] md:h-[450px]" },
                    { col: "md:col-span-4", row: "h-[300px] md:h-[450px]" }
                  ];
                  const layout = layouts[i] || { col: "md:col-span-4", row: "h-[300px] md:h-[400px]" };

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className={`relative ${layout.col} ${layout.row} rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-gray-900 group cursor-pointer`}
                      onClick={(e) => {
                        if (sp.image) {
                          e.stopPropagation();
                          setSelectedAuditionImage(sp.image);
                        } else {
                          setShowFullAuditionList(true);
                        }
                      }}
                    >
                      <SafeImage
                        src={sp.image || `https://picsum.photos/seed/speaker${i}/800/600`}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                        alt={sp.model}
                      />
                      {sp.image && (
                        <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                            <Search className="w-5 h-5 md:w-7 md:h-7" />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>

                      <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                          <span className="px-2 py-0.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full">
                            {sp.brand} ({sp.origin})
                          </span>
                          {sp.status === 'Demo Car' && (
                            <span className="px-2 py-0.5 bg-green-600/20 border border-green-500/30 text-green-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full">
                              Demo Car
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl md:text-5xl font-black text-white mb-1 md:mb-4 tracking-tighter leading-none">
                          {sp.model}
                        </h3>

                        <p className="text-gray-400 font-bold text-[10px] md:text-lg leading-relaxed line-clamp-2">
                          {sp.description || "試聴室にて実際の音調をご確認いただけます。豊かな音楽体験をANGで。"}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-12">
                  <button
                    onClick={() => setShowFullAuditionList(!showFullAuditionList)}
                    className={`relative px-8 md:px-16 py-4 md:py-8 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xs md:text-xl tracking-widest transition-all shadow-2xl flex items-center gap-3 md:gap-6 group ${showFullAuditionList ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 hover:bg-blue-600 hover:text-white'
                      }`}
                  >
                    <Speaker className={`w-5 h-5 md:w-8 md:h-8 ${showFullAuditionList ? 'animate-pulse' : ''}`} />
                    {showFullAuditionList ? '試聴スピーカー一覧を閉じる' : `試聴スピーカー一覧を見る (${auditionSpeakers.length}ブランド)`}
                    <ChevronRight className={`w-4 h-4 md:w-6 md:h-6 transition-transform ${showFullAuditionList ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                <AnimatePresence>
                  {showFullAuditionList && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="w-full overflow-hidden"
                    >
                      {auditionSpeakers.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                          <p className="text-gray-500 font-bold mb-4">データが読み込めませんでした。</p>
                          <button onClick={() => window.location.reload()} className="text-blue-400 underline">ページを再読み込みする</button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 md:px-4 pb-24">
                          {auditionSpeakers.map((brand: any, bIdx: number) => (
                            <div key={bIdx} className="space-y-4">
                              <div className="flex items-center gap-3 border-b border-white/10 pb-2 mb-4">
                                <h4 className="text-lg md:text-xl font-black text-white">{brand.brand}</h4>
                                <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">{brand.origin}</span>
                              </div>
                              <div className="space-y-2">
                                {brand.units.map((unit: any, uIdx: number) => (
                                  <div key={uIdx} className="group p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-blue-500/30 transition-all flex gap-4">
                                    {unit.image && (
                                      <div
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 cursor-zoom-in relative group/img"
                                        onClick={() => setSelectedAuditionImage(unit.image!)}
                                      >
                                        <SafeImage src={unit.image} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" alt={unit.model} />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                          <Search className="w-4 h-4 text-white" />
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex-1 flex flex-col gap-2">
                                      <div className="flex justify-between items-start">
                                        <div className="text-white font-bold text-xs md:text-sm group-hover:text-blue-400 transition-colors uppercase tracking-tight">{unit.model}</div>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                          <div className={`w-1 h-1 rounded-full ${unit.status === 'Demo Car' ? 'bg-blue-400' : 'bg-green-400'}`}></div>
                                          <span className={`text-[8px] font-black uppercase tracking-tighter ${unit.status === 'Demo Car' ? 'text-blue-400' : 'text-green-400'}`}>
                                            {unit.status === 'Demo Car' ? 'DEMO' : 'AVAIL'}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-between mt-1">
                                        <div className="text-[10px] md:text-xs font-black text-blue-500">
                                          {unit.price === 'Open' ? 'OPEN' : `${parseInt(unit.price || "0").toLocaleString()}円`}
                                          {unit.taxExcluded && <span className="text-gray-600 text-[8px] ml-1 font-bold">({parseInt(unit.taxExcluded).toLocaleString()}円税抜)</span>}
                                        </div>
                                        {unit.youtube && (
                                          <button
                                            onClick={() => {
                                              const videoId = typeof unit.youtube === 'string' ? unit.youtube.split('v=')[1]?.split('&')[0] : null;
                                              if (videoId) setActiveYoutubeId(videoId);
                                              else {
                                                const searchQuery = encodeURIComponent(`${brand.brand} ${unit.model}`);
                                                window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
                                              }
                                            }}
                                            className="flex items-center gap-1 text-[8px] font-black text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                                          >
                                            <Youtube className="w-2.5 h-2.5" />
                                            SAMPLE
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        )
      }

      {/* YouTube Modal */}
      <AnimatePresence>
        {activeYoutubeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setActiveYoutubeId(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                aria-label="動画を閉じる"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {selectedAuditionImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAuditionImage(null)}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAuditionImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors flex items-center gap-2 font-black text-sm tracking-widest uppercase"
                aria-label="画像を閉じる"
              >
                CLOSE <X className="w-6 h-6" />
              </button>
              <SafeImage
                src={selectedAuditionImage}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                alt="Selected Speaker"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Business Calendar */}
      < div id="info" >
        <BusinessCalendar />
      </div >

      {/* Partners & Brands */}
      < PartnersSection onViewAll={() => navigate('/partners')} />

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-400 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div id="access" className="grid lg:grid-cols-2 gap-12 items-start bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/10">
            <div className="space-y-6">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <SafeImage
                  src={assets.heroImage}
                  alt="Sound ANG 店舗外観"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="text-white font-black text-xs uppercase tracking-widest bg-blue-600 px-3 py-1 rounded-full shadow-lg">
                    Shop Exterior
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {facilities.map((facility: any, i: number) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5"
                  >
                    <SafeImage
                      src={facility.image}
                      alt={facility.title + "の写真"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                      <p className="text-white font-black text-xs tracking-wider">{facility.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-32 space-y-8">
              <div>
                <span className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Shop Access</span>
                <h2 className="text-3xl font-black text-white mb-6 tracking-tighter">店舗案内</h2>
                <p className="text-gray-300 font-bold leading-relaxed mb-8">
                  福岡県大野城市の御笠川沿いに店舗を構えております。
                  こちらの外観を目印にお越しください。駐車場も完備しております。
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">所在地</p>
                      <p className="text-sm text-gray-400">〒816-0912 福岡県大野城市御笠川5-4-14</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-[240px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.293409151244!2d130.4851219762696!3d33.54575497335133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3541908696b9963f%3A0x6b976696b9963f!2z44CSODE2LTA5MTIg56aP5bKh55yM5aSn6YeO5Z-O5biC5b6h56yg5bed77yV5LiB55uu77yU4minus77yR77yU!5e0!3m2!1sja!2sjp!4v1712288000000!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sound ANG 所在地マップ"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 mb-16">
          <div className="text-left">
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>〒816-0912 福岡県大野城市御笠川5-4-14</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <div className="space-y-1">
                  <p>092-503-5421 (Audio)</p>
                  <p>092-503-5437 (Security)</p>
                  <p className="text-white/50 text-xs">FAX: 092-503-5492</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <div className="space-y-1">
                  <a href="mailto:ang@soundang.com" className="block hover:text-blue-400 transition-colors">ang@soundang.com</a>
                  <a href="mailto:ang@sec-ang.com" className="block hover:text-blue-400 transition-colors">ang@sec-ang.com</a>
                </div>
              </li>
              <li className="pt-2 border-t border-white/5">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
                  Invoice: <span className="text-white/60 font-mono">T4290002038758</span>
                </p>
              </li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="text-white font-bold mb-6">Social Media</h3>
            <div className="flex gap-4">
              {[
                { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/profile.php?id=100063630308258" },
                { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/sound_ang_security/" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                  aria-label={social.name + "でSound ANGをフォロー"}
                >
                  <social.icon className="w-5 h-5 text-white" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-left">
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">Partners</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#info" className="hover:text-white transition-colors">Info</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5 text-center text-[10px] flex flex-col items-center gap-4">
          <p className="text-white/20 uppercase tracking-widest font-bold">
            &copy; 2026 {assets.logoText}. All rights reserved
            <button
              onClick={() => setShowPasswordModal(true)}
              className="hover:text-white/40 transition-colors cursor-default"
              aria-hidden="true"
              tabIndex={-1}
            >
              .
            </button>
          </p>
        </div>
      </footer>
    </div >
  );
}
