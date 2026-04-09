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
  Megaphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
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
import { SafeImage } from './components/ui/SafeImage';

interface BlogPost {
  date: string;
  category: string;
  title: string;
  link: string;
  image?: string;
}

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
  const { emergencyAnnouncement } = usePrices();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showStaffDashboard, setShowStaffDashboard] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showFacilityGallery, setShowFacilityGallery] = useState(false);

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
        />
      } />
    </Routes>
  );
}

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
  navigate
}: any) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-500 selection:text-white">

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl border border-gray-100"
            >
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black tracking-tighter">STAFF LOGIN</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">管理者認証</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワードを入力"
                    className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl font-bold focus:outline-none transition-all ${passwordError ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-blue-500'}`}
                    autoFocus
                  />
                  {passwordError && (
                    <p className="text-red-500 text-[10px] font-bold mt-2 ml-2 uppercase tracking-widest">認証に失敗しました</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black tracking-widest shadow-lg shadow-blue-500/20 transition-all"
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
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center gap-2">
          {/* Left: Logo */}
          <div className="flex-1 flex items-center">
            <div
              className="flex items-center gap-2 cursor-pointer select-none group"
              onClick={handleLogoClick}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-lg md:text-xl italic">A</span>
              </div>
              <span className="text-lg md:text-2xl font-black tracking-tighter text-gray-900">{assets.logoText}</span>
            </div>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest shrink-0">
            <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
            <a href="#services" className="hover:text-blue-500 transition-colors">Services</a>
            <a href="#partners" className="hover:text-blue-500 transition-colors">Partners</a>
            <a href="#blog" className="hover:text-blue-500 transition-colors">Blog</a>
            <a href="#info" className="hover:text-blue-500 transition-colors">Info</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
          </nav>

          {/* Right: Actions */}
          <div className="flex-1 flex items-center justify-end gap-1.5 md:gap-3">
            {/* LINE Inquiry - Icon only on small screens */}
            <a
              href="https://lin.ee/cdfCnx8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-[#06C755] text-white rounded-xl font-black transition-all hover:bg-[#05b34c] shadow-sm shrink-0"
              aria-label="LINEで相談する"
            >
              <MessageSquare className="w-5 h-5 md:mr-2" />
              <span className="hidden sm:inline text-[10px] tracking-widest">LINE相談</span>
            </a>

            {/* Reservation - Icon only on small screens */}
            <a
              href="#contact"
              className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-blue-600 text-white rounded-xl font-black transition-all hover:bg-blue-700 shadow-sm shrink-0"
              aria-label="来店予約"
            >
              <CalendarIcon className="w-5 h-5 md:mr-2" />
              <span className="hidden sm:inline text-[10px] tracking-widest">来店予約</span>
            </a>

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

      {/* Mobile Menu Overlay - Moved outside header to fix stacking context */}
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

              <div className="flex-grow overflow-y-auto p-6">
                <nav className="flex flex-col gap-1">
                  {[
                    { href: "#", label: "Home" },
                    { href: "#services", label: "Services" },
                    { href: "#partners", label: "Partners" },
                    { href: "#blog", label: "Blog" },
                    { href: "#info", label: "Info" },
                    { href: "#contact", label: "Contact" },
                  ].map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-4 rounded-2xl text-sm font-black text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all flex items-center justify-between group"
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </nav>
              </div>

              <div className="p-6 border-t border-gray-50 space-y-3">
                <a
                  href="https://lin.ee/cdfCnx8"
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
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center justify-center gap-1 w-full py-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20"
                >
                  <div className="flex items-center gap-3 font-black text-sm">
                    <CalendarIcon className="w-5 h-5" />
                    来店予約・お問い合わせ
                  </div>
                  <span className="text-[10px] font-bold opacity-80">※初めての方もお気軽にどうぞ</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <SafeImage
            src={assets.heroImage}
            alt="Sound ANG 店舗正面イメージ"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-32 md:py-48">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex flex-col gap-4 mb-8">
              <div className="inline-flex items-center gap-3 w-fit px-6 py-2 bg-blue-600/10 backdrop-blur-md border border-blue-500/20 rounded-full">
                <span className="text-blue-400 text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                  福岡のカーオーディオ・セキュリティ専門店
                </span>
                <div className="w-px h-4 bg-blue-500/30"></div>
                <span className="text-white text-xs md:text-sm font-black tracking-[0.1em]">エナジー</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
              感性を揺さぶる至高の音。<br />
              愛車を護る、確かな技術。
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4">
                <span className="text-blue-500 text-xl md:text-3xl font-black opacity-90 uppercase tracking-wider">九州No.1のセキュリティ実績</span>
                <div className="hidden md:block w-px h-6 bg-blue-500/30"></div>
                <span className="text-white/60 text-xl md:text-3xl font-black uppercase tracking-wider italic">Acoustic Specialist</span>
              </div>
            </h1>
            <p className="text-base md:text-2xl text-gray-200 mb-8 font-bold leading-relaxed max-w-3xl">
              ハイエンド・オーディオの繊細な調音から、鉄壁のセキュリティ施工まで。<br className="hidden md:block" />
              音を極め、愛車を護り続けて30年以上。<br className="hidden md:block" />
              熟練の技で、あなたのカーライフに究極の感動と安心を。
            </p>
          </motion.div>
        </div>

        {/* Service Bar */}
        <div className="max-w-5xl mx-auto px-4 -mb-20 relative z-20">
          <div className="bg-white rounded-2xl p-8 grid grid-cols-3 gap-6 shadow-2xl border border-gray-200">
            <button
              onClick={() => navigate('/audio')}
              className="flex flex-col items-center gap-3 group hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Speaker className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <span className="font-bold text-sm text-gray-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Car Audio</span>
            </button>
            <button
              onClick={() => navigate('/security')}
              className="flex flex-col items-center gap-3 group hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <ShieldCheck className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <span className="font-bold text-sm text-gray-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Car Security</span>
            </button>
            <button
              onClick={() => navigate('/dashcam')}
              className="flex flex-col items-center gap-3 group hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Package className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <span className="font-bold text-sm text-gray-600 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Dashcam, Mirror & Others</span>
            </button>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-lg mb-1 tracking-tighter">九州施工実績No.1</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Number One in Kyushu</p>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  カーセキュリティの施工台数において、九州トップクラスの実績。培ったノウハウが安心を支えます。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-lg mb-1 tracking-tighter">最高峰SPS認定店</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Security Professional Shop</p>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  Grgo・Pantheraの性能を100%引き出すことができる、全国でも限られたセキュリティ認定販売店です。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-lg mb-1 tracking-tighter">創業30年以上の信頼</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Over 30 Years History</p>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  福岡の地に根付いて30年以上。確かな技術と信頼で、数多くのオーナー様に選ばれ続けています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="services" className="pt-32 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">Service Menu</span>
            <h2 className="text-4xl font-bold leading-tight">施工メニュー</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              ANGが提供する専門サービス。各カテゴリーのメニューより詳細をご覧いただけます。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "オーディオメニュー",
                subtitle: "スピーカー交換・音質向上",
                description: "純正スピーカーからの交換で劇的な変化を。デッドニング（防振）込みのパッケージもご用意。",
                image: assets.audioMenuImage,
                onClick: () => navigate('/audio')
              },
              {
                title: "セキュリティーメニュー",
                subtitle: "愛車を守る最新システム",
                description: "最新の盗難手口（リレーアタック等）から愛車をガード。車種別の最適プランをご提案。",
                image: assets.securityMenuImage,
                onClick: () => navigate('/security')
              },
              {
                title: "ドラレコ・デジタルミラー・他",
                subtitle: "安心・安全のドライブをサポート",
                description: "前後ドラレコ、アルパイン製デジタルミラー、レーダー探知機等、配線を隠して美しく取り付け。",
                image: assets.dashcamMenuImage,
                onClick: () => navigate('/dashcam')
              }
            ].map((pkg, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                onClick={pkg.onClick}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200 flex flex-col cursor-pointer group"
              >
                <div className="h-48">
                  <SafeImage src={pkg.image} className="w-full h-full object-cover" alt={pkg.title} />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="text-xs font-bold text-blue-500 mb-1">{pkg.subtitle}</div>
                  <h3 className="text-xl font-bold mb-3">{pkg.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-grow">{pkg.description}</p>
                  <button
                    onClick={() => {
                      if (pkg.title === "オーディオメニュー") navigate('/audio');
                      if (pkg.title === "セキュリティーメニュー") navigate('/security');
                      if (pkg.title === "ドラレコ・デジタルミラー・他") navigate('/dashcam');
                    }}
                    className="w-full bg-gray-900 text-white py-3 rounded-full font-bold hover:bg-gray-700 transition-colors"
                  >
                    詳細を見る
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog / Journal Style List */}
      <section id="blog" className="py-32 bg-gray-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Journal & Case Studies</span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">施工事例・ブログ</h2>
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
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex flex-col md:flex-row md:items-center bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1 p-6 md:p-8 gap-6"
                  >
                    <div className={`w-2 h-12 md:h-16 rounded-full ${color.icon} shrink-0`}></div>

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
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 transition-all shadow-sm">
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
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

      {/* Business Calendar */}
      <div id="info">
        <BusinessCalendar />
      </div>

      {/* Partners & Brands */}
      <PartnersSection onViewAll={() => navigate('/partners')} />

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-400 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/10">
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
                {facilities.map((facility, i) => (
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
                <h3 className="text-3xl font-black text-white mb-6 tracking-tighter">店舗のご案内</h3>
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
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
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
            <h4 className="text-white font-bold mb-6">Social Media</h4>
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
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
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
