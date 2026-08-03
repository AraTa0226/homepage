import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const MegaMenu = ({ show, categories, theme, onClose, navigate, handleMenuClick, securityData, findSlugByFlexibleName, positionClassName = "left-1/2 -translate-x-1/2" }: any) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full pt-4 z-50 pointer-events-auto ${positionClassName}`}
                >
                    <div className="rounded-3xl shadow-2xl overflow-hidden border border-gray-200/80 bg-white p-10 w-[1100px]">
                        <div className="grid grid-cols-5 gap-8">
                            {categories.map((cat: any) => (
                                <div key={cat.id} className="flex flex-col gap-4">
                                    <div
                                        onClick={() => {
                                            const isGrouping = cat.groups || ['security_car', 'security_options', 'maintenance', 'security_full'].includes(cat.id);
                                            if (isGrouping) return;
                                            onClose();
                                            if (cat.items && cat.isExternal) {
                                                window.open(cat.path, '_blank');
                                            } else {
                                                const element = document.getElementById(cat.id);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth' });
                                                } else {
                                                    navigate(cat.path);
                                                }
                                            }
                                        }}
                                        className={`flex flex-col gap-1 border-b border-gray-100 pb-3 group/header ${(cat.groups || ['security_car', 'security_options', 'maintenance', 'security_full'].includes(cat.id)) ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                        <span className={`text-[9px] font-black tracking-[0.2em] ${theme === 'dark' ? 'text-emerald-600' : 'text-blue-600'} uppercase`}>{cat.subtitle}</span>
                                        <span className={`text-[13px] font-black tracking-tight text-gray-900 transition-colors ${theme === 'dark' ? 'group-hover/header:text-emerald-600' : 'group-hover/header:text-blue-600'}`}>
                                            {(cat.title || cat.category || '').split('・')[0]}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {(cat && Array.isArray(cat.groups)) ? (
                                            <div className="grid grid-cols-1 gap-6 py-2">
                                                {cat.groups.map((group: any, gIdx: number) => (
                                                    <div key={gIdx} className="space-y-2">
                                                        <div className="text-[9px] font-black text-gray-400 border-gray-100 tracking-[0.2em] border-b pb-1 mb-2 uppercase">
                                                            {group.name}
                                                        </div>
                                                        <div className="flex flex-col gap-1.5">
                                                            {(group && Array.isArray(group.items)) && group.items.map((item: string, idx: number) => {
                                                                const slug = findSlugByFlexibleName ? findSlugByFlexibleName(item) : null;
                                                                const vehicleData = slug ? (securityData?.vehicles || {})[slug] : null;
                                                                const displayName = vehicleData?.name || item;
                                                                
                                                                return (
                                                                    <button
                                                                        key={idx}
                                                                        onClick={() => {
                                                                            onClose();
                                                                            handleMenuClick({ id: cat.id, name: item });
                                                                        }}
                                                                        className={`text-left text-[11px] font-bold text-gray-600 ${theme === 'dark' ? 'hover:text-emerald-600' : 'hover:text-blue-600'} transition-colors flex items-center gap-2 group/mlink`}
                                                                    >
                                                                        <div className={`w-1.5 h-1.5 rounded-full bg-gray-200 ${theme === 'dark' ? 'group-hover/mlink:bg-emerald-500' : 'group-hover/mlink:bg-blue-500'} transition-colors`} />
                                                                        {displayName}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (cat && Array.isArray(cat.items)) ? (
                                            cat.items.map((item: string, idx: number) => {
                                                const itemName = typeof item === 'string' ? item : (item as any).name;
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => {
                                                            onClose();
                                                            if (cat.isExternal) {
                                                                window.open(cat.path, '_blank');
                                                            } else {
                                                                const clickItem = typeof item === 'object' && item !== null ? { ...(item as object), parentId: cat.id } : { id: cat.id, name: item };
                                                                handleMenuClick(clickItem);
                                                            }
                                                        }}
                                                        className={`text-[11px] font-bold text-gray-600 ${theme === 'dark' ? 'hover:text-emerald-600' : 'hover:text-blue-600'} transition-all hover:translate-x-1 text-left flex items-center gap-2 group/link`}
                                                    >
                                                        <div className={`w-1.5 h-1.5 rounded-full bg-gray-200 ${theme === 'dark' ? 'group-hover/link:bg-emerald-500' : 'group-hover/link:bg-blue-500'} transition-colors`} />
                                                        {itemName}
                                                    </button>
                                                )
                                            })
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
