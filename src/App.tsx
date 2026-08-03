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
import { resolveMenuNavigation } from './utils/navigation';

// Contexts
import { PriceProvider, usePrices } from './contexts/PriceContext';
import { CalendarProvider } from './contexts/CalendarContext';
import { SiteProvider, useSite } from './contexts/SiteContext';

// Components
import { VaultGrid } from './components/VaultGrid';
import { FloatingCTA } from './components/Shared/FloatingCTA';

// Lazy Pages (Architectural Split for Lighthouse 100)
const MainPage = lazy(() => import('./pages/Home/MainPage').then(m => ({ default: m.MainPage })));
const SecurityMainPage = lazy(() => import('./pages/Home/SecurityMainPage'));
const VehicleSecurityDetail = lazy(() => import('./pages/Security/VehicleSecurityDetail'));
const AudioMenuDetail = lazy(() => import('./components/Menu/AudioMenuDetail').then(m => ({ default: m.AudioMenuDetail })));
const AudioPlanDetail = lazy(() => import('./pages/Audio/AudioPlanDetail'));
const StandardLinePage = lazy(() => import('./pages/Audio/StandardLinePage').then(m => ({ default: m.StandardLinePage })));
const StandardLinePrintPage = lazy(() => import('./pages/Admin/StandardLinePrintPage').then(m => ({ default: m.StandardLinePrintPage })));
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
const OkizariboushiPage = lazy(() => import('./pages/Security/OkizariboushiPage'));
const MaintainPage = lazy(() => import('./pages/Security/MaintainPage'));
const FAQPage = lazy(() => import('./pages/Home/FAQPage'));
const SecurityKnowledgeArchivePage = lazy(() => import('./pages/Security/SecurityKnowledgeArchivePage'));
const SecurityKnowledgeDetailPage = lazy(() => import('./pages/Security/SecurityKnowledgeDetailPage'));
const SecurityPartnersPage = lazy(() => import('./pages/Security/SecurityPartnersPage'));
const SecuritySitemapPage = lazy(() => import('./pages/Security/SecuritySitemapPage'));
const EventDetailPage = lazy(() => import('./pages/News/EventDetailPage').then(m => ({ default: m.EventDetailPage })));


const ReservationFormPage = lazy(() => import('./components/Form/ReservationFormPage').then(m => ({ default: m.ReservationFormPage })));
const PartnersListPage = lazy(() => import('./components/PartnersListPage').then(m => ({ default: m.PartnersListPage })));
const LegalInfoPage = lazy(() => import('./pages/Legal/LegalInfoPage').then(m => ({ default: m.LegalInfoPage })));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));

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
    audioEmergencyAnnouncement,
    securityEmergencyAnnouncement,
    audioHeroAlert,
    securityHeroAlert,
    plans,
    audioLPs,
    setSelectedPlan,
    setSelectedCategory,
    auditionSpeakers,
    findSlugByFlexibleName,
    securityKnowledge,
    securityData
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
        resolveMenuNavigation(item, {
            plans,
            audioLPs,
            securityData,
            findSlugByFlexibleName,
            navigate
        });
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
    <div className="min-h-screen bg-white pb-32">
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
              emergencyAnnouncement={audioEmergencyAnnouncement}
              heroAlert={audioHeroAlert}
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
              emergencyAnnouncement={securityEmergencyAnnouncement}
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
          <Route path="/security/knowledge" element={<SecurityKnowledgeArchivePage />} />
          <Route path="/security/knowledge/:slug" element={<SecurityKnowledgeDetailPage />} />
          <Route path="/security/partners" element={<SecurityPartnersPage />} />
          <Route path="/security/sitemap" element={<SecuritySitemapPage />} />
          <Route path="/security/vehicle/:modelId" element={<VehicleSecurityDetail assets={assets} />} />
          <Route path="/security/news/:slug" element={<EventDetailPage domain="security" />} />
          <Route path="/audio/news/:slug" element={<EventDetailPage domain="audio" />} />
          <Route path="/audio/plan/:planId" element={<AudioPlanDetail />} />
          <Route path="/sp-standard" element={<StandardLinePage />} />
          <Route path="/audio/sp-package" element={<AudioPlanDetail />} />
        <Route path="/audio/dsp-amp" element={<AudioPlanDetail />} />
        <Route path="/audio/amp-dsp" element={<AudioPlanDetail />} />
        <Route path="/audio/digital-source" element={<AudioPlanDetail />} />
        <Route path="/audio/maintenance" element={<AudioPlanDetail />} />
        <Route path="/audio/tuning" element={<AudioPlanDetail />} />
        <Route path="/audio/deadening" element={<AudioPlanDetail />} />
        <Route path="/audio/custom" element={<AudioPlanDetail />} />
          <Route path="/partners" element={<PartnersListPage />} />

          {/* Legacy .html Redirects */}
          <Route path="/index.html" element={<Navigate to="/security-home" replace />} />
          <Route path="/security.html" element={<Navigate to="/security-home" replace />} />
          <Route path="/maintain.html" element={<Navigate to="/security/maintain" replace />} />
          <Route path="/rader-drrec.html" element={<Navigate to="/security/drive_recorder" replace />} />
          <Route path="/shop.html" element={<Navigate to="/security-home" replace />} />
          <Route path="/contactus.html" element={<Navigate to="/reservation" replace />} />
          <Route path="/link.html" element={<Navigate to="/security/partners" replace />} />
          <Route path="/reservation.html" element={<Navigate to="/reservation" replace />} />
          <Route path="/sec-sample.html" element={<Navigate to="/security-home" replace />} />
          <Route path="/silent-sec.html" element={<Navigate to="/security-home" replace />} />
          <Route path="/civicfl5-security.html" element={<Navigate to="/security/vehicle/honda-civic-typer" replace />} />
          <Route path="/harrier-security.html" element={<Navigate to="/security/vehicle/toyota-harrier" replace />} />
          <Route path="/prius-security.html" element={<Navigate to="/security/vehicle/toyota-prius" replace />} />
          <Route path="/arver-security.html" element={<Navigate to="/security/vehicle/toyota-alphard-vellfire" replace />} />
          <Route path="/hiace-security.html" element={<Navigate to="/security/vehicle/toyota-hiace" replace />} />
          <Route path="/keicar-security.html" element={<Navigate to="/security/vehicle/kcar-special" replace />} />
          <Route path="/landcruiser300-security.html" element={<Navigate to="/security/vehicle/toyota-landcruiser-300" replace />} />
          <Route path="/landcruiser70-security.html" element={<Navigate to="/security/vehicle/toyota-landcruiser-70" replace />} />
          <Route path="/landcruiser-security.html" element={<Navigate to="/security/vehicle/toyota-landcruiser-prado-150-200" replace />} />
          <Route path="/landcruiser250-security.html" element={<Navigate to="/security/vehicle/toyota-landcruiser-250" replace />} />
          <Route path="/LX600-security.html" element={<Navigate to="/security/vehicle/lexus-lx" replace />} />
          <Route path="/lx600-security.html" element={<Navigate to="/security/vehicle/lexus-lx" replace />} />
          <Route path="/RX-security.html" element={<Navigate to="/security/vehicle/lexus-rx" replace />} />
          <Route path="/rx-security.html" element={<Navigate to="/security/vehicle/lexus-rx" replace />} />
          <Route path="/NX-security.html" element={<Navigate to="/security/vehicle/lexus-nx" replace />} />
          <Route path="/nx-security.html" element={<Navigate to="/security/vehicle/lexus-nx" replace />} />
          <Route path="/jimny-security.html" element={<Navigate to="/security/vehicle/suzuki-jimny" replace />} />
          <Route path="/okizariboushi.html" element={<Navigate to="/security/okizariboushi" replace />} />
          <Route path="/okizari-k.html" element={<Navigate to="/security/okizariboushi" replace />} />
          <Route path="/okizari-p.html" element={<Navigate to="/security/okizariboushi" replace />} />
          <Route path="/camp-eventINFO.html" element={<Navigate to="/security-home" replace />} />

          <Route path="/reservation" element={<ReservationFormPage onBack={() => navigate('/')} />} />
          <Route path="/legal" element={<LegalInfoPage onBack={() => navigate('/')} />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/print/sp-standard" element={<StandardLinePrintPage />} />
          <Route path="/admin/print/audio/:slug" element={<StandardLinePrintPage />} />
          
          {/* Dynamic Dedicated LPs - Top Level & Nested */}
          <Route path="/:slug" element={<StandardLinePage />} />
          <Route path="/:folder/:slug" element={<StandardLinePage />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export { VaultGrid };
