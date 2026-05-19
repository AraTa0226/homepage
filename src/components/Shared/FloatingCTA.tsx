import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Calendar, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FloatingCTAProps {
  showLine?: boolean;
  showReservation?: boolean;
  theme?: 'audio' | 'security';
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ 
  showLine = true, 
  showReservation = true,
  theme 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const hostname = window.location.hostname;
  const isSecurity = theme === 'security' || hostname.includes('sec-ang.com') || location.pathname.includes('security');
  const themeColor = isSecurity ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20';

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showLine && !showReservation) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
      {/* Scroll to Top Button */}
      <div className="max-w-7xl mx-auto px-4 mb-4 flex justify-end">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={scrollToTop}
              className="pointer-events-auto w-12 h-12 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl flex items-center justify-center text-gray-900 hover:bg-white hover:scale-110 transition-all group"
            >
              <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Main CTA Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-3 md:p-4 pointer-events-auto">
        <div className="max-w-xl mx-auto flex gap-3">
          {showLine && (
            <a
              href="https://page.line.me/312qjhsq?openQrModal=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] text-white py-4 px-6 rounded-2xl font-black text-sm tracking-widest hover:bg-[#05b34c] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-green-500/20"
            >
              <MessageSquare className="w-5 h-5" />
              <span>LINE相談</span>
            </a>
          )}
          {showReservation && (
            <button
              onClick={() => navigate('/reservation')}
              className={`flex-1 flex items-center justify-center gap-2 ${themeColor} text-white py-4 px-6 rounded-2xl font-black text-sm tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg`}
            >
              <Calendar className="w-5 h-5" />
              <span>来店予約</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Safe Area Inset for iOS */}
      <div className="bg-white/80 h-[env(safe-area-inset-bottom)]" />
    </div>
  );
};
