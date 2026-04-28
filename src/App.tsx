/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Contexts
import { PriceProvider, usePrices } from './contexts/PriceContext';
import { CalendarProvider } from './contexts/CalendarContext';
import { SiteProvider, useSite } from './contexts/SiteContext';

// Components
import { VaultGrid } from './components/VaultGrid';

// Lazy Pages (Architectural Split for Lighthouse 100)
const MainPage = lazy(() => import('./pages/Home/MainPage').then(m => ({ default: m.MainPage })));
const SecurityMainPage = lazy(() => import('./pages/Home/SecurityMainPage').then(m => ({ default: m.SecurityMainPage })));
const VehicleSecurityDetail = lazy(() => import('./pages/Security/VehicleSecurityDetail'));
const AudioMenuDetail = lazy(() => import('./components/Menu/AudioMenuDetail').then(m => ({ default: m.AudioMenuDetail })));
const PantheraPage = lazy(() => import('./pages/Security/PantheraPage').then(m => ({ default: m.PantheraPage })));
const GrgoPage = lazy(() => import('./pages/Security/GrgoPage').then(m => ({ default: m.GrgoPage })));
const GrgoV2Page = lazy(() => import('./pages/Security/GrgoV2Page').then(m => ({ default: m.GrgoV2Page })));

const DriveRecorderPage = lazy(() => import('./pages/Security/DriveRecorderPage').then(m => ({ default: m.DriveRecorderPage })));
const ViperPage = lazy(() => import('./pages/Security/ViperPage').then(m => ({ default: m.ViperPage })));
const CliffordPage = lazy(() => import('./pages/Security/CliffordPage').then(m => ({ default: m.CliffordPage })));
const RelayAttackPage = lazy(() => import('./pages/Security/RelayAttackPage').then(m => ({ default: m.RelayAttackPage })));
const CanInvaderPage = lazy(() => import('./pages/Security/CanInvaderPage').then(m => ({ default: m.CanInvaderPage })));
const KeyEmulatorPage = lazy(() => import('./pages/Security/KeyEmulatorPage').then(m => ({ default: m.KeyEmulatorPage })));
const RadarPage = lazy(() => import('./pages/Security/RadarPage').then(m => ({ default: m.RadarPage })));
const DigitalMirrorPage = lazy(() => import('./pages/Security/DigitalMirrorPage').then(m => ({ default: m.DigitalMirrorPage })));
const OkizariboushiPage = lazy(() => import('./pages/Security/OkizariboushiPage').then(m => ({ default: m.OkizariboushiPage })));
const MaintainPage = lazy(() => import('./pages/Security/MaintainPage').then(m => ({ default: m.MaintainPage })));
const FAQPage = lazy(() => import('./pages/Home/FAQPage').then(m => ({ default: m.FAQPage })));


const ReservationFormPage = lazy(() => import('./components/Form/ReservationFormPage').then(m => ({ default: m.ReservationFormPage })));
const PartnersListPage = lazy(() => import('./components/PartnersListPage').then(m => ({ default: m.PartnersListPage })));
const LegalInfoPage = lazy(() => import('./pages/Legal/LegalInfoPage').then(m => ({ default: m.LegalInfoPage })));

export interface BlogPost {
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
  const {
    emergencyAnnouncement,
    plans,
    setSelectedPlan,
    setSelectedCategory,
    auditionSpeakers
  } = usePrices();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const facilities = [
    { title: "ショールーム", image: assets.showroomImage },
    { title: "ピット", image: assets.pitImage },
    { title: "ワークスペース", image: assets.workspaceImage },
    { title: "試聴室", image: assets.auditionRoomImage }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleMenuClick = (item: any) => {
    setShowMegaMenu(false);

    if (item.path) {
      navigate(item.path);
      return;
    }

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

    if (item.id === 'security_car') {
      const slugMap: Record<string, string> = {
        'GX550': 'lexus-gx550',
        'LX': 'lexus-lx',
        'RX': 'lexus-rx',
        'NX': 'lexus-nx',
        'LBX': 'lexus-lbx',
        'ランドクルーザー 300': 'toyota-landcruiser-300',
        'ランドクルーザー 250': 'toyota-landcruiser-250',
        'ランドクルーザー プラド': 'toyota-landcruiser-prado-150-200',
        'ランクル 70': 'toyota-landcruiser-70',
        'アルファード / ヴェルファイア (40系)': 'toyota-alphard-vellfire',
        'クラウン各種': 'toyota-crown',
        'ハリアー': 'toyota-harrier',
        'ハイエース': 'toyota-hiace',
        'プリウス': 'toyota-prius',
        'シビック TYPE-R (FL5)': 'honda-civic-typer',
        'ジムニー / シエラ / ノマド': 'suzuki-jimny',
        'K-CAR 専用セキュリティ': 'kcar-special'
      };
      const slug = slugMap[item.name] || 'special-model';
      navigate(`/security/vehicle/${slug}`);
      return;
    }

    const brandPathMap: Record<string, string> = {
      'security_panthera': '/security/panthera',
      'security_grgo': '/security/grgo',
      'security_grgo_v2': '/security/grgo-v2',
      'security_relay_attack': '/security/relay-attack',
      'security_can_invader': '/security/can-invader',
      'security_key_emulator': '/security/key-emulator',
      'security_viper': '/security/viper',
      'security_clifford': '/security/clifford',
      'dashcam': '/security/drive_recorder',
      'security_radar': '/security/radar',
      'digital_mirror': '/security/digital_mirror',
      'security_options': '/security/drive_recorder'

    };

    // Label-based mapping for generic categories or items with specific names
    const labelPathMap: Record<string, string> = {
      'Panthera (パンテーラ) Z-Series': '/security/panthera',
      'Grgo (ゴルゴ) VⅡ': '/security/grgo',
      '一瞬で盗まれる『リレーアタック』の手口': '/security/relay-attack',
      '最新手口『CANインベーダー』': '/security/can-invader',
      'CANインベーダー対策': '/security/can-invader',
      '最凶の次世代手口『キーエミュレーター』': '/security/key-emulator',
      'ドライブレコーダー': '/security/drive_recorder',
      'レーダー探知機': '/security/radar',
      'デジタルインナーミラー': '/security/digital_mirror',
      'Viper (バイパー)': '/security/viper',
      'Clifford (クリフォード)': '/security/clifford',
      '送迎バス 置き去り防止支援装置': '/security/okizariboushi',
      'セキュリティー診断サービス': '/security/maintain',
      'よくあるご質問 (FAQ)': '/faq',
      'CAMPit (キャンピット)': 'https://campit.jp/',
      'MobiRest (モビレスト)': 'https://campit.jp/'
    };

    if (item.name && labelPathMap[item.name]) {
      const target = labelPathMap[item.name];
      if (target.startsWith('http')) {
        window.open(target, '_blank');
      } else {
        navigate(target);
      }
      return;
    }

    if (brandPathMap[item.id]) {
      navigate(brandPathMap[item.id]);
      return;
    }

    const category = plans.find(p => p.id === item.id);
    if (category) {
      setSelectedCategory(category);

      if (item.planName) {
        const planItem = category.items.find(i => i.name === item.planName);
        if (planItem) {
          setSelectedPlan(planItem);
          navigate(`/security/vehicle/special#${planItem.id}`);
        } else {
          navigate('/security-home');
        }
      } else {
        navigate('/security-home');
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://www.soundang.com/webbrog/wp-json/wp/v2/posts?per_page=3&_embed');
        if (response.ok) {
          const data = await response.json();
          const formattedPosts = data.map((post: any) => ({
            date: post.date.split('T')[0].replace(/-/g, '.'),
            category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog',
            title: post.title.rendered,
            link: post.link,
            image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url
          }));
          setPosts(formattedPosts);
        }
      } catch (err) {
        console.error('WP Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
          />
        </div>
      }>
        <Routes>
          <Route path="/" element={
            <MainPage
              assets={assets}
              emergencyAnnouncement={emergencyAnnouncement}
              posts={posts}
              loading={loading}
              facilities={facilities}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              handleLogoClick={() => { }}
              navigate={navigate}
              handleMenuClick={handleMenuClick}
              showMegaMenu={showMegaMenu}
              setShowMegaMenu={setShowMegaMenu}
              auditionSpeakers={auditionSpeakers}
            />
          } />
          <Route path="/security-home" element={
            <SecurityMainPage
              assets={assets}
              emergencyAnnouncement={emergencyAnnouncement}
              facilities={facilities}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              handleLogoClick={() => navigate('/')}
              navigate={navigate}
              handleMenuClick={handleMenuClick}
              showMegaMenu={showMegaMenu}
              setShowMegaMenu={setShowMegaMenu}
              auditionSpeakers={auditionSpeakers}
            />
          } />
          <Route path="/security/relay-attack" element={<RelayAttackPage />} />
          <Route path="/security/can-invader" element={<CanInvaderPage />} />
          <Route path="/security/key-emulator" element={<KeyEmulatorPage />} />
          <Route path="/security/panthera" element={<PantheraPage />} />
          <Route path="/security/grgo" element={<GrgoPage />} />
          <Route path="/security/grgo-v2" element={<GrgoV2Page />} />

          <Route path="/security/drive_recorder/sn-tw100di" element={<Navigate to="/security/drive_recorder/zq-25" replace />} />
          <Route path="/security/drive_recorder/sn-st2300c" element={<Navigate to="/security/drive_recorder/q-03" replace />} />
          <Route path="/security/drive_recorder/sn-st3400d" element={<Navigate to="/security/drive_recorder/sn-tw88d" replace />} />
          <Route path="/security/drive_recorder/z-300" element={<Navigate to="/security/drive_recorder/sn-r13d" replace />} />
          <Route path="/security/drive_recorder" element={<DriveRecorderPage />} />
          <Route path="/security/drive_recorder/:productId" element={<DriveRecorderPage />} />
          <Route path="/security/radar" element={<RadarPage />} />
          <Route path="/security/radar/:productId" element={<RadarPage />} />
          <Route path="/security/digital_mirror" element={<DigitalMirrorPage />} />
          <Route path="/security/digital_mirror/:productId" element={<DigitalMirrorPage />} />
          <Route path="/security/relay-attack" element={<RelayAttackPage />} />
          <Route path="/security/viper" element={<ViperPage />} />

          <Route path="/security/clifford" element={<CliffordPage />} />
          <Route path="/security/okizariboushi" element={<OkizariboushiPage />} />
          <Route path="/security/maintain" element={<MaintainPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/security/vehicle/:modelId" element={<VehicleSecurityDetail assets={assets} />} />
          <Route path="/partners" element={<PartnersListPage />} />

          <Route path="/reservation" element={<ReservationFormPage onBack={() => navigate('/')} />} />
          <Route path="/legal" element={<LegalInfoPage onBack={() => navigate('/')} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export { VaultGrid };
