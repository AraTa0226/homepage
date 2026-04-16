import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, ShieldCheck, Speaker, Video, Globe, MapPin, Phone } from 'lucide-react';

import { useSite } from '../contexts/SiteContext';


export const PartnersListPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { partners, brandPartners } = useSite();

  // Icon mapping for dynamic brands
  const ICON_MAP = {
    ShieldCheck,
    Speaker,
    Video,
    Globe
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gray-50 pb-24"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-bold group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black tracking-widest">BACK TO HOME</span>
          </button>
          <h1 className="font-black text-sm md:text-xl tracking-tighter">PARTNERS & NETWORK</h1>
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Group Network Section */}
        <section className="mb-24">
          <div className="mb-12">
            <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Group Network</span>
            <h2 className="text-4xl font-black tracking-tighter text-gray-900">カーオーディオセンター・グループ</h2>
            <p className="text-gray-500 font-bold mt-4">全国に展開する、国内最大級のプロショップネットワークです。</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((shop, i) => (
              <motion.a
                key={shop.id}
                href={shop.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <MapPin className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black mb-2 text-gray-900">{shop.name}</h3>
                <p className="text-gray-400 text-xs font-bold mb-4 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {shop.location}
                </p>
                <p className="text-gray-500 text-sm font-bold leading-relaxed mb-6">
                  {shop.description}
                </p>
                <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest">
                  Visit Website <ExternalLink className="w-3 h-3" />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Manufacturers Section */}
        <section>
          <div className="mb-12">
            <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Brand List</span>
            <h2 className="text-4xl font-black tracking-tighter text-gray-900">取り扱いメーカー一覧</h2>
            <p className="text-gray-500 font-bold mt-4">国内外の主要ブランドからハイエンドブランドまで、幅広く対応しております。</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brandPartners.map((partner, i) => {
              const Icon = ICON_MAP[partner.iconName] || Globe;
              return (
                <motion.a
                  key={partner.id}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="text-sm font-black text-gray-900 mb-1">{partner.name}</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{partner.category}</span>
                </motion.a>
              );
            })}
          </div>
        </section>

        <div className="mt-24 pt-12 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm font-bold mb-8">
            こちらに掲載のないメーカーについても、お気軽にお問い合わせください。
          </p>
          <button
            onClick={onBack}
            className="bg-gray-900 text-white px-12 py-5 rounded-[2rem] font-black hover:bg-blue-600 transition-all shadow-xl shadow-blue-100"
          >
            トップページへ戻る
          </button>
        </div>
      </div>
    </motion.div>
  );
};
