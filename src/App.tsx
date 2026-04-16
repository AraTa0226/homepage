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
  History
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
    { title: "繧ｷ繝ｧ繝ｼ繝ｫ繝ｼ繝", image: assets.showroomImage, description: "譛譁ｰ縺ｮ繝・Δ讖溘ｒ螟壽焚螻慕､ｺ縲ゅｆ縺｣縺溘ｊ縺ｨ縺皮嶌隲・＞縺溘□縺代∪縺吶・ },
    { title: "繝斐ャ繝・, image: assets.pitImage, description: "譛譁ｰ險ｭ蛯吶ｒ螳悟ｙ縺励◆繧ｯ繝ｪ繝ｼ繝ｳ縺ｪ菴懈･ｭ迺ｰ蠅・よ・霆翫ｒ螟ｧ蛻・↓縺企舌°繧翫＠縺ｾ縺吶・ },
    { title: "繝ｯ繝ｼ繧ｯ繧ｹ繝壹・繧ｹ", image: assets.workspaceImage, description: "辭溽ｷｴ縺ｮ閨ｷ莠ｺ縺御ｸ縺､縺ｲ縺ｨ縺､荳∝ｯｧ縺ｫ蜉蟾･繧定｡後≧縲√％縺繧上ｊ縺ｮ菴懈･ｭ蝣ｴ縲・ },
    { title: "隧ｦ閨ｴ螳､", image: assets.auditionRoomImage, description: "繝帙・繝繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ繧医≧縺ｪ迺ｰ蠅・〒縲∝推繧ｹ繝斐・繧ｫ繝ｼ縺ｮ蛟区ｧ繧偵§縺｣縺上ｊ豈碑ｼ・・ }
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
            title: post.title.rendered.replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '窶・).replace(/&#8212;/g, '窶・).replace(/&#8220;/g, '窶・).replace(/&#8221;/g, '窶・).replace(/&#8216;/g, '窶・).replace(/&#8217;/g, '窶・),
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
            title: "縲舌え繧ｧ繝悶し繧､繝医・繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙ヱ繝・こ繝ｼ繧ｸ縺ｮ縺皮ｴｹ莉九・,
            link: "https://www.soundang.com/webbrog/2026/03/30/%e3%80%90%e3%82%a6%e3%82%a7%e3%83%96%e3%82%b5%e3%82%a4%e3%83%88%e3%81%ae%e3%82%b9%e3%83%94%e3%83%bc%e3%82%ab%e3%83%bc%e4%ba%a4%e6%8f%9b%e3%83%91%e3%83%83%e3%82%b1%e3%83%bc%e3%82%b8%e3%81%ae%e3%81%94/"
          },
          {
            date: "2026.03.29",
            category: "Audio",
            title: "縲舌き繝ｭ繝ｼ繝ｩ繧ｯ繝ｭ繧ｹ縺ｮ繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙・,
            link: "https://www.soundang.com/webbrog/2026/03/29/%e3%80%90%e3%82%ab%e3%83%ad%e3%83%bc%e3%83%a9%e3%82%af%e3%83%ad%e3%82%b9%e3%81%ae%e3%82%b9%e3%83%94%e3%83%bc%e3%82%ab%e3%83%bc%e4%ba%a4%e6%8f%9b%e3%80%91/"
          },
          {
            date: "2026.03.28",
            category: "Info",
            title: "縲・譛医↓髮・ｸｭ縲・,
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
              邂｡逅・・Ο繧ｰ繧､繝ｳ縺悟ｿ・ｦ√〒縺吶ゅけ繝ｪ繝・け縺励※隱崎ｨｼ
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
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">邂｡逅・・ｪ崎ｨｼ</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="繝代せ繝ｯ繝ｼ繝峨ｒ蜈･蜉・
                    className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl font-bold focus:outline-none transition-all ${passwordError ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-blue-500'}`}
                    autoFocus
                  />
                  {passwordError && (
                    <p className="text-red-500 text-[10px] font-bold mt-2 ml-2 uppercase tracking-widest">隱崎ｨｼ縺ｫ螟ｱ謨励＠縺ｾ縺励◆</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black tracking-widest shadow-lg shadow-blue-500/20 transition-all"
                >
                  隱崎ｨｼ縺吶ｋ
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
                  繧ｭ繝｣繝ｳ繧ｻ繝ｫ
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
              href="https://page.line.me/312qjhsq?openQrModal=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-[#06C755] text-white rounded-xl font-black transition-all hover:bg-[#05b34c] shadow-sm shrink-0"
              aria-label="LINE縺ｧ逶ｸ隲・☆繧・
            >
              <MessageSquare className="w-5 h-5 md:mr-2" />
              <span className="hidden sm:inline text-[10px] tracking-widest">LINE逶ｸ隲・/span>
            </a>

            {/* Reservation - Icon only on small screens */}
            <a
              href="#contact"
              className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-blue-600 text-white rounded-xl font-black transition-all hover:bg-blue-700 shadow-sm shrink-0"
              aria-label="譚･蠎嶺ｺ育ｴ・
            >
              <CalendarIcon className="w-5 h-5 md:mr-2" />
              <span className="hidden sm:inline text-[10px] tracking-widest">譚･蠎嶺ｺ育ｴ・/span>
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors shrink-0"
              aria-label={isMobileMenuOpen ? "繝｡繝九Η繝ｼ繧帝哩縺倥ｋ" : "繝｡繝九Η繝ｼ繧帝幕縺・}
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
                      alt="邱頑･縺ｮ縺顔衍繧峨○逕ｻ蜒・
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
                  隧ｳ邏ｰ繧定ｦ九ｋ
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
                  aria-label="繝｡繝九Η繝ｼ繧帝哩縺倥ｋ"
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
                  href="https://page.line.me/312qjhsq?openQrModal=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 w-full py-4 bg-[#06C755] text-white rounded-2xl shadow-lg shadow-green-500/20"
                >
                  <div className="flex items-center gap-3 font-black text-sm text-[#000000] drop-shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                    LINE縺ｧ逶ｸ隲・☆繧・                  </div>
                  <span className="text-[10px] font-bold opacity-90 text-[#000000] drop-shadow-sm">窶ｻ霆顔ｨｮ蛻･驕ｩ蜷医・隕狗ｩ咲嶌隲⑯K</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center justify-center gap-1 w-full py-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20"
                >
                  <div className="flex items-center gap-3 font-black text-sm">
                    <CalendarIcon className="w-5 h-5" />
                    譚･蠎嶺ｺ育ｴ・・縺雁撫縺・粋繧上○
                  </div>
                  <span className="text-[10px] font-bold opacity-80">窶ｻ蛻昴ａ縺ｦ縺ｮ譁ｹ繧ゅ♀豌苓ｻｽ縺ｫ縺ｩ縺・◇</span>
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
            alt="Sound ANG 蠎苓・豁｣髱｢繧､繝｡繝ｼ繧ｸ"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-32 md:py-48">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex flex-col gap-4 mb-8">
              <div className="inline-flex items-center gap-2 md:gap-3 w-fit px-4 py-2 md:px-6 md:py-2.5 bg-blue-600/10 backdrop-blur-md border border-blue-500/20 rounded-full">
                <span className="text-blue-400 text-[9px] md:text-sm font-black uppercase tracking-[0.15em] whitespace-nowrap">
                  遖丞ｲ｡縺ｮ繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ繝ｻ繧ｻ繧ｭ繝･繝ｪ繝・ぅ蟆る摩蠎・                </span>
                <div className="w-px h-3 md:h-4 bg-blue-500/30"></div>
                <span className="text-white text-[10px] md:text-sm font-black tracking-[0.1em] whitespace-nowrap">繧ｨ繝翫ず繝ｼ</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-7xl font-black text-white mb-8 leading-[1.2] md:leading-[1.1] tracking-tighter">
              <span className="block md:inline whitespace-nowrap">諢滓ｧ繧呈昭縺輔・繧玖・鬮倥・髻ｳ縲・/span><br className="hidden md:block" />
              <span className="block md:inline whitespace-nowrap">諢幄ｻ翫ｒ隴ｷ繧九∫｢ｺ縺九↑謚陦薙・/span>
            </h1>

            <div className="flex flex-col gap-3 mb-10">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-blue-500 text-lg md:text-3xl font-black opacity-90 tracking-tight leading-none">荵晏ｷ朦o.1縺ｮ繧ｻ繧ｭ繝･繝ｪ繝・ぅ螳溽ｸｾ</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-blue-500 text-lg md:text-3xl font-black opacity-90 tracking-tight leading-none">繝代う繧ｪ繝九い譛鬮伜ｳｰ縲卦S-Z1GR縲崎ｪ榊ｮ壼ｺ・/span>
              </div>
            </div>
            <p className="text-base md:text-2xl text-gray-200 mb-8 font-bold leading-relaxed max-w-3xl">
              髻ｳ繧呈･ｵ繧√∵・霆翫ｒ隴ｷ繧顔ｶ壹￠縺ｦ30蟷ｴ莉･荳翫・br className="hidden md:block" />
              繝上う繧ｨ繝ｳ繝峨・繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ郢顔ｴｰ縺ｪ隱ｿ髻ｳ縺九ｉ縲・延螢√・繧ｻ繧ｭ繝･繝ｪ繝・ぅ譁ｽ蟾･縺ｾ縺ｧ縲・br className="hidden md:block" />
              辭溽ｷｴ縺ｮ謚縺ｧ縲√≠縺ｪ縺溘・繧ｫ繝ｼ繝ｩ繧､繝輔↓遨ｶ讌ｵ縺ｮ諢溷虚縺ｨ螳牙ｿ・ｒ縲・            </p>
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
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-8 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-gray-100/50 group">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-black text-xl mb-1 tracking-tighter">荵晏ｷ槭そ繧ｭ繝･繝ｪ繝・ぅ譁ｽ蟾･螳溽ｸｾNo.1</h2>
                <p className="text-xs text-blue-600 font-black uppercase tracking-widest mb-3">Security Performance No.1</p>
                <p className="text-sm text-gray-600 leading-relaxed font-bold">
                  繧ｫ繝ｼ繧ｻ繧ｭ繝･繝ｪ繝・ぅ縺ｮ邏ｯ險域命蟾･蜿ｰ謨ｰ縺ｫ縺翫＞縺ｦ荵晏ｷ槭ヨ繝・・繧ｯ繝ｩ繧ｹ縺ｮ螳溽ｸｾ縲ょ淹縺｣縺溘ヮ繧ｦ繝上え縺檎｢ｺ縺九↑螳牙ｿ・ｒ謾ｯ縺医∪縺吶・                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-8 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-gray-100/50 group">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform">
                <Music2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-black text-xl mb-1 tracking-tighter">繝代う繧ｪ繝九い TS-Z1GR 隱榊ｮ壼ｺ・/h2>
                <p className="text-xs text-blue-600 font-black uppercase tracking-widest mb-3">Carrozzeria RS Certified Shop</p>
                <p className="text-sm text-gray-600 leading-relaxed font-bold">
                  蜴ｳ縺励＞螳滓橿蟇ｩ譟ｻ繧偵け繝ｪ繧｢縲ゅヱ繧､繧ｪ繝九い譛鬮伜ｳｰ繧ｹ繝斐・繧ｫ繝ｼ縺ｮ逵滉ｾ｡繧貞ｼ輔″蜃ｺ縺吶∝・蝗ｽ縺ｧ繧ょｸ悟ｰ代↑隱榊ｮ壹す繝ｧ繝・・縺ｧ縺吶・                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-8 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-gray-100/50 group">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-black text-xl mb-1 tracking-tighter">譛鬮伜ｳｰSPS隱榊ｮ壼ｺ・/h2>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-3">Security Professional Shop</p>
                <p className="text-sm text-gray-600 leading-relaxed font-bold">
                  譛譁ｰ縺ｮ逶鈴屮謇句哨繧堤衍繧雁ｰｽ縺上＠縺溘後・繝ｭ縲阪・髮・屮縲・rgo繝ｻPanthera縺ｮ諤ｧ閭ｽ繧・00%蠑輔″蜃ｺ縺呎命蟾･繧堤ｴ・據縺励∪縺吶・                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-8 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-gray-100/50 group">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform">
                <History className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-black text-xl mb-1 tracking-tighter">蜑ｵ讌ｭ30蟷ｴ莉･荳翫・菫｡鬆ｼ</h2>
                <p className="text-xs text-blue-600 font-black uppercase tracking-widest mb-3">Over 30 Years Experience</p>
                <p className="text-sm text-gray-600 leading-relaxed font-bold">
                  遖丞ｲ｡縺ｧ30蟷ｴ莉･荳翫ら・邱ｴ縺ｮ謚陦楢・↓繧医ｋ遒ｺ縺九↑譁ｽ蟾･縺ｨ蜈・ｮ溘・繧｢繝輔ち繝ｼ繝輔か繝ｭ繝ｼ縺ｧ縲∽ｸ逕滓ｶｯ縺ｮ繝代・繝医リ繝ｼ縺ｨ縺ｪ繧翫∪縺吶・                </p>
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
            <h2 className="text-4xl font-bold leading-tight">譁ｽ蟾･繝｡繝九Η繝ｼ</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              ANG縺梧署萓帙☆繧句ｰる摩繧ｵ繝ｼ繝薙せ縲ょ推繧ｫ繝・ざ繝ｪ繝ｼ縺ｮ繝｡繝九Η繝ｼ繧医ｊ隧ｳ邏ｰ繧偵＃隕ｧ縺・◆縺縺代∪縺吶・            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "繧ｪ繝ｼ繝・ぅ繧ｪ繝｡繝九Η繝ｼ",
                subtitle: "繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙・髻ｳ雉ｪ蜷台ｸ・,
                description: "邏疲ｭ｣繧ｹ繝斐・繧ｫ繝ｼ縺九ｉ縺ｮ莠､謠帙〒蜉・噪縺ｪ螟牙喧繧偵ゅョ繝・ラ繝九Φ繧ｰ・磯亟謖ｯ・芽ｾｼ縺ｿ縺ｮ繝代ャ繧ｱ繝ｼ繧ｸ繧ゅ＃逕ｨ諢上・,
                image: assets.audioMenuImage,
                onClick: () => navigate('/audio')
              },
              {
                title: "繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ繝｡繝九Η繝ｼ",
                subtitle: "諢幄ｻ翫ｒ螳医ｋ譛譁ｰ繧ｷ繧ｹ繝・Β",
                description: "譛譁ｰ縺ｮ逶鈴屮謇句哨・医Μ繝ｬ繝ｼ繧｢繧ｿ繝・け遲会ｼ峨°繧画・霆翫ｒ繧ｬ繝ｼ繝峨りｻ顔ｨｮ蛻･縺ｮ譛驕ｩ繝励Λ繝ｳ繧偵＃謠先｡医・,
                image: assets.securityMenuImage,
                onClick: () => navigate('/security')
              },
              {
                title: "繝峨Λ繝ｬ繧ｳ繝ｻ繝・ず繧ｿ繝ｫ繝溘Λ繝ｼ繝ｻ莉・,
                subtitle: "螳牙ｿ・・螳牙・縺ｮ繝峨Λ繧､繝悶ｒ繧ｵ繝昴・繝・,
                description: "蜑榊ｾ後ラ繝ｩ繝ｬ繧ｳ縲√い繝ｫ繝代う繝ｳ陬ｽ繝・ず繧ｿ繝ｫ繝溘Λ繝ｼ縲√Ξ繝ｼ繝繝ｼ謗｢遏･讖溽ｭ峨・・邱壹ｒ髫縺励※鄒弱＠縺丞叙繧贋ｻ倥￠縲・,
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
                      if (pkg.title === "繧ｪ繝ｼ繝・ぅ繧ｪ繝｡繝九Η繝ｼ") navigate('/audio');
                      if (pkg.title === "繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ繝｡繝九Η繝ｼ") navigate('/security');
                      if (pkg.title === "繝峨Λ繝ｬ繧ｳ繝ｻ繝・ず繧ｿ繝ｫ繝溘Λ繝ｼ繝ｻ莉・) navigate('/dashcam');
                    }}
                    className="w-full bg-gray-900 text-white py-3 rounded-full font-bold hover:bg-gray-700 transition-colors"
                  >
                    隧ｳ邏ｰ繧定ｦ九ｋ
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
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">譁ｽ蟾･莠倶ｾ九・繝悶Ο繧ｰ</h2>
              <p className="text-gray-500 mt-4 font-bold leading-relaxed">
                譛譁ｰ縺ｮ譁ｽ蟾･莠倶ｾ九ｄ縲√き繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ繝ｻ繧ｻ繧ｭ繝･繝ｪ繝・ぅ縺ｫ髢｢縺吶ｋ蠖ｹ遶九▽諠・ｱ繧堤匱菫｡縺励※縺・∪縺吶・              </p>
            </div>
            <a
              href="https://soundang.com/webbrog/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/5 border border-gray-100 text-sm font-black hover:bg-blue-600 hover:text-white transition-all"
            >
              繝悶Ο繧ｰ荳隕ｧ繧定ｦ九ｋ
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
                    aria-label={`繝悶Ο繧ｰ險倅ｺ九ｒ隱ｭ繧: ${post.title.replace(/<[^>]*>/g, '')}`}
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
              <p className="text-gray-400 font-bold uppercase tracking-widest">險倅ｺ九′隕九▽縺九ｊ縺ｾ縺帙ｓ縺ｧ縺励◆縲・/p>
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
                  alt="Sound ANG 蠎苓・螟冶ｦｳ"
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
                      alt={facility.title + "縺ｮ蜀咏悄"}
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
                <h2 className="text-3xl font-black text-white mb-6 tracking-tighter">蠎苓・縺ｮ縺疲｡亥・</h2>
                <p className="text-gray-300 font-bold leading-relaxed mb-8">
                  遖丞ｲ｡逵悟､ｧ驥主沁蟶ゅ・蠕｡隨蟾晄ｲｿ縺・↓蠎苓・繧呈ｧ九∴縺ｦ縺翫ｊ縺ｾ縺吶・                  縺薙■繧峨・螟冶ｦｳ繧堤岼蜊ｰ縺ｫ縺願ｶ翫＠縺上□縺輔＞縲るｧ占ｻ雁ｴ繧ょｮ悟ｙ縺励※縺翫ｊ縺ｾ縺吶・                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">謇蝨ｨ蝨ｰ</p>
                      <p className="text-sm text-gray-400">縲・16-0912 遖丞ｲ｡逵悟､ｧ驥主沁蟶ょｾ｡隨蟾・-4-14</p>
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
                  title="Sound ANG 謇蝨ｨ蝨ｰ繝槭ャ繝・
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
                <span>縲・16-0912 遖丞ｲ｡逵悟､ｧ驥主沁蟶ょｾ｡隨蟾・-4-14</span>
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
                  aria-label={social.name + "縺ｧSound ANG繧偵ヵ繧ｩ繝ｭ繝ｼ"}
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
