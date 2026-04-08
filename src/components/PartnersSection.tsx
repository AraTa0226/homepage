import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ShieldCheck, Speaker, Video, Globe } from 'lucide-react';
import { useSite, BrandPartner } from '../contexts/SiteContext';

const ICON_MAP = {
  ShieldCheck,
  Speaker,
  Video,
  Globe
};

export const PartnersSection: React.FC<{ onViewAll: () => void }> = ({ onViewAll }) => {
  const { partners, brandPartners } = useSite();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const { offsetWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: index * offsetWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <section id="partners" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Trusted Partners</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-6">
              信頼のパートナー
            </h2>
            <p className="text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed">
              Sound ANGが自信を持って推奨するメーカー各社、<br className="hidden md:block" />
              そして共に技術を高め合うグループネットワークをご紹介します。
            </p>
          </motion.div>
        </div>

        {/* Brand Grid */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 md:mb-12 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide"
        >
          {brandPartners.slice(0, 3).map((partner, i) => {
            const Icon = ICON_MAP[partner.iconName] || ShieldCheck;
            return (
              <motion.a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[280px] md:min-w-0 group bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 snap-center"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
                    {partner.category}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">{partner.name}</h3>
                <p className="text-gray-500 text-sm font-bold leading-relaxed">
                  {partner.description}
                </p>
              </motion.a>
            );
          })}
        </div>

        {/* Pagination Dots for Mobile */}
        <div className="flex justify-center gap-2 mb-12 md:hidden">
          {brandPartners.slice(0, 3).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-blue-600 w-4' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center mb-20">
          <button
            onClick={onViewAll}
            className="group flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-blue-600 transition-all shadow-xl shadow-blue-100"
          >
            すべてのパートナーを見る
            <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Fellow Shops List */}
        <div className="bg-gray-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight">カーオーディオセンター・グループ</h3>
                  <p className="text-gray-400 text-sm font-bold">全国に展開する、国内最大級のプロショップネットワークです。</p>
                </div>
                <a
                  href="https://www.audio-center.ne.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-black transition-colors"
                >
                  グループ公式サイトを見る <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {partners.map((shop) => (
                  <a
                    key={shop.id}
                    href={shop.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-[11px] font-bold transition-all flex items-center justify-between group"
                  >
                    {shop.name}
                    <ExternalLink className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            ※ 各リンク先は外部サイトへ移動します。
          </p>
        </div>
      </div>
    </section>
  );
};
