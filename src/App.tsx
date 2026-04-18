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
const AudioMenuDetail = lazy(() => import('./components/Menu/AudioMenuDetail').then(m => ({ default: m.AudioMenuDetail })));
const SecurityMenuDetail = lazy(() => import('./components/Menu/SecurityMenuDetail').then(m => ({ default: m.SecurityMenuDetail })));
const DashcamMenuDetail = lazy(() => import('./components/Menu/DashcamMenuDetail').then(m => ({ default: m.DashcamMenuDetail })));
const StaffDashboard = lazy(() => import('./components/Staff/StaffDashboard').then(m => ({ default: m.StaffDashboard })));
const ReservationFormPage = lazy(() => import('./components/Form/ReservationFormPage').then(m => ({ default: m.ReservationFormPage })));
const PartnersListPage = lazy(() => import('./components/PartnersListPage').then(m => ({ default: m.PartnersListPage })));

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
          <Route path="/audio/sp-package" element={<AudioMenuDetail show={true} onClose={() => navigate('/')} />} />
          <Route path="/security" element={<SecurityMenuDetail show={true} onClose={() => navigate('/')} />} />
          <Route path="/dashcam" element={<DashcamMenuDetail show={true} onClose={() => navigate('/')} />} />
          <Route path="/partners" element={<PartnersListPage />} />
          <Route path="/staff" element={<StaffDashboard onBack={() => navigate('/')} />} />
          <Route path="/reservation" element={<ReservationFormPage onBack={() => navigate('/')} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export { VaultGrid };
