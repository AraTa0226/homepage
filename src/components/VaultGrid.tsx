import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SafeImage } from './ui/SafeImage';

interface VaultGridProps {
    categories: any[];
    onCategoryClick: (cat: any) => void;
    theme: 'light' | 'dark';
    handleMenuClick: (target: any) => void;
    isMegaMenu?: boolean;
}

export const VaultGrid: React.FC<VaultGridProps> = ({ categories, onCategoryClick, theme, handleMenuClick, isMegaMenu }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[350px] lg:auto-rows-[450px] ${isMegaMenu ? 'max-w-6xl mx-auto p-8 bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-gray-100' : ''}`}>
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

                    {/* Theme Overlay - Strengthened for better contrast */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark'
                        ? 'bg-gradient-to-t from-black/95 via-black/80 md:via-black/60 to-transparent group-hover:bg-black/70'
                        : 'bg-gradient-to-t from-white/95 via-white/80 md:via-white/60 to-transparent group-hover:bg-white/70'
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

                        <div className="space-y-2.5 relative z-10 flex flex-col justify-end flex-grow pb-4 max-w-[90%]">
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
                                            "店内の常時試聴ユニット": { id: "audition-showcase", isAnchor: true },
                                            "施工ブログ / 店舗詳細": { id: "contact", isAnchor: true }
                                        };
                                        const target = planMapping[item] || { id: cat.id };
                                        handleMenuClick(target);
                                    }}
                                    className={`flex items-center justify-between text-[11px] md:text-xs font-black transition-all hover:translate-x-2 px-4 py-2 rounded-xl backdrop-blur-md border shadow-sm ${theme === 'dark'
                                        ? 'bg-white/5 border-white/10 text-white/90 hover:bg-white/20 hover:text-white'
                                        : 'bg-black/[0.03] border-black/5 text-gray-900 hover:bg-black/[0.08] hover:text-blue-600'
                                        }`}
                                >
                                    <span>{item}</span>
                                    <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
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
