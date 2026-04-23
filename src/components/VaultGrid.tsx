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
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto ${isMegaMenu ? 'max-w-6xl mx-auto p-8 bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-gray-100' : ''}`}>
            {categories.map((cat: any, i: number) => (
                <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => onCategoryClick(cat)}
                    className={`group relative rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10 w-full transition-all duration-500 ${cat.gridClass || "col-span-1"
                        } h-full min-h-[320px]`}
                >
                    {/* Background Image */}
                    <SafeImage
                        src={cat.image}
                        alt={cat.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Theme Overlay - Strengthened for better contrast */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark'
                        ? 'bg-gradient-to-t from-black via-black/80 md:via-black/60 to-transparent group-hover:bg-black/70'
                        : 'bg-gradient-to-t from-white via-white/90 md:via-white/70 to-transparent group-hover:bg-white/80'
                        }`} />

                    {/* Content HUD */}
                    <div className="relative z-10 p-6 md:p-10 flex flex-col min-h-full">
                        <div className={`mb-2 md:mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-blue-600'}`}>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">{cat.subtitle}</span>
                            <div className="h-[1px] flex-grow bg-current opacity-30" />
                        </div>

                        <h3 className={`text-2xl md:text-5xl font-black tracking-tighter mb-6 md:mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {cat.title}
                        </h3>

                        {/* Standard Items or Groups */}
                        {cat.groups ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 flex-grow pb-6">
                                {cat.groups.map((group: any, gIdx: number) => (
                                    <div key={gIdx} className="space-y-4">
                                        <div className={`flex items-center gap-3 mb-6 border-b-2 pb-2 ${theme === 'dark' ? 'border-white/20' : 'border-gray-200'}`}>
                                            <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-emerald-500' : 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]'}`} />
                                            <span className={`text-xs md:text-sm font-black tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                {group.name}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {group.items.map((item: string, j: number) => (
                                                <div
                                                    key={j}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMenuClick({ id: cat.id, name: item });
                                                    }}
                                                    className={`flex items-center justify-between text-xs md:text-sm font-bold px-5 py-3 rounded-xl border transition-all hover:translate-x-1 ${theme === 'dark'
                                                        ? 'bg-white/5 border-white/10 text-white/90 hover:bg-white/10 hover:text-emerald-400 hover:border-emerald-500/30'
                                                        : 'bg-white border-gray-100 text-gray-700 hover:shadow-md hover:text-blue-600 hover:border-blue-500/30'
                                                        } ${item.includes('相談') ? 'bg-emerald-50/50 border-emerald-100 text-emerald-700 font-black' : ''}`}
                                                >
                                                    <span className="truncate">{item}</span>
                                                    <ArrowUpRight className="w-3.5 h-3.5 opacity-30" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="relative z-10 flex flex-col flex-grow pb-4 max-w-[95%]">
                                <div className={`flex items-center gap-3 mb-6 border-b-2 pb-2 ${theme === 'dark' ? 'border-white/20' : 'border-gray-200'}`}>
                                    <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-emerald-500' : 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]'}`} />
                                    <span className={`text-xs md:text-sm font-black tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        Menu Lineup
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {cat.items?.map((item: string, j: number) => (
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
                                                    "Panthera (パンテーラ) Z-Series": { id: "security_panthera" },
                                                    "Grgo (ゴルゴ) V2": { id: "security_grgo_v2" },
                                                    "Grgo (ゴルゴ) VⅡ": { id: "security_grgo" },
                                                    "Relay Attack Defense": { id: "security_digital" },
                                                    "Digital Mirror": { id: "dashcam" },
                                                    "Dual Cam Recording": { id: "dashcam" },
                                                    "Radar Detector": { id: "security_digital" },
                                                    "Author Alarm / IGLA2+": { id: "security_digital" },
                                                    "デジタル・イモビライザー": { id: "security_digital" },
                                                    "リレーアタック対策": { id: "security_digital" },
                                                    "Viper (バイパー)": { id: "security_viper" },
                                                    "Clifford (クリフォード)": { id: "security_clifford" },
                                                    "CANインベーダー対策": { id: "security_digital" },
                                                    "店内の常時試聴ユニット": { id: "audition-showcase", isAnchor: true },
                                                    "施工ブログ / 店舗詳細": { id: "contact", isAnchor: true }
                                                };
                                                const target = { ...(planMapping[item] || { id: cat.id }) };
                                                handleMenuClick(target);
                                            }}
                                            className={`flex items-center justify-between text-xs md:text-sm font-black transition-all hover:translate-x-2 px-6 py-3.5 rounded-xl backdrop-blur-md border shadow-sm ${theme === 'dark'
                                                ? 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20'
                                                : 'bg-white/80 border-gray-200 text-gray-900 hover:bg-white'
                                                } ${cat.id.includes('security') || cat.id === 'can_invader' || cat.id === 'radar' || cat.id === 'maintenance'
                                                    ? 'hover:text-emerald-500 hover:border-emerald-500/30'
                                                    : 'hover:text-blue-600 hover:border-blue-500/30'
                                                }`}
                                        >
                                            <span>{item}</span>
                                            <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

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
