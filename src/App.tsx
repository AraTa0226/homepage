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
const DigitalSecurityPage = lazy(() => import('./pages/Security/DigitalPage').then(m => ({ default: m.DigitalSecurityPage })));
const DashcamPage = lazy(() => import('./pages/Security/DashcamPage').then(m => ({ default: m.DashcamPage })));
const ViperPage = lazy(() => import('./pages/Security/ViperPage').then(m => ({ default: m.ViperPage })));
const CliffordPage = lazy(() => import('./pages/Security/CliffordPage').then(m => ({ default: m.CliffordPage })));

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
      'security_digital': '/security/digital',
      'security_viper': '/security/viper',
      'security_clifford': '/security/clifford',
      'dashcam': '/security/dashcam'
    };

    // Label-based mapping for generic categories or items with specific names
    const labelPathMap: Record<string, string> = {
      'Panthera (パンテーラ)': '/security/panthera',
      'PANTHERA (パンテーラ)': '/security/panthera',
      'Panthera (パンテーラ) Z-Series': '/security/panthera',
      'Grgo (ゴルゴ) V2': '/security/grgo-v2',
      'Grgo (ゴルゴ) V-Series': '/security/grgo',
      'Author Alarm / IGLA2+': '/security/digital',
      'デジタル・イモビライザー': '/security/digital',
      'リレーアタック対策': '/security/digital',
      '前後2カメラ・駐車監視ドラレコ': '/security/dashcam',
      '360度全方位記録システム': '/security/dashcam',
      'デジタルインナーミラー': '/security/dashcam',
      'Viper (バイパー)': '/security/viper',
      'VIPER (バイパー)': '/security/viper',
      'Clifford (クリフォード)': '/security/clifford',
      'CLIFFORD (クリフォード)': '/security/clifford'
    };

    if (brandPathMap[item.id]) {
      navigate(brandPathMap[item.id]);
      return;
    }

    if (item.name && labelPathMap[item.name]) {
      navigate(labelPathMap[item.name]);
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
          <Route path="/security/panthera" element={<PantheraPage />} />
          <Route path="/security/grgo" element={<GrgoPage />} />
          <Route path="/security/grgo-v2" element={<GrgoV2Page />} />
          <Route path="/security/digital" element={<DigitalSecurityPage />} />
          <Route path="/security/dashcam" element={<DashcamPage />} />
          <Route path="/security/viper" element={<ViperPage />} />
          <Route path="/security/clifford" element={<CliffordPage />} />
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
