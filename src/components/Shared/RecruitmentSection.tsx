import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RecruitmentInfo } from '../../contexts/PriceContext';

interface RecruitmentSectionProps {
    data: RecruitmentInfo;
}

export const RecruitmentSection: React.FC<RecruitmentSectionProps> = ({ data }) => {
    if (!data.visible) return null;

    return (
        <section id="recruitment" className="py-20 md:py-32 bg-gray-50 border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden group"
                >
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <Briefcase size={200} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                                <Briefcase size={24} />
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
                                {data.title}
                            </h2>
                        </div>

                        <p className="text-gray-600 font-bold mb-8 text-sm md:text-lg whitespace-pre-wrap leading-relaxed">
                            {data.message}
                        </p>

                        {(data.showRequirements || data.showSalary) && (
                            <div className="space-y-6 bg-gray-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 mb-8">
                                {data.showRequirements && (
                                    <div>
                                        <h3 className="text-sm font-black text-gray-500 tracking-widest uppercase mb-4">蜍滄寔隕・・/h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {data.requirements.filter(req => req.trim() !== "").map((req, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm md:text-base font-bold text-gray-700">
                                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {data.showSalary && (
                                    <div className={data.showRequirements ? "pt-4 border-t border-gray-200" : ""}>
                                        <h3 className="text-sm font-black text-gray-500 tracking-widest uppercase mb-2">邨ｦ荳弱・蠕・∞</h3>
                                        <p className="text-gray-900 font-black text-base md:text-lg">
                                            {data.salary}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <span className="block text-xs font-black text-gray-500 tracking-widest mb-1">縺雁撫縺・粋繧上○繝ｻ蠢懷供蜈・/span>
                                <span className="text-blue-600 font-black text-xl md:text-2xl">{data.contactInfo}</span>
                            </div>

                            <a
                                href={`tel:${data.contactInfo.replace(/[^0-9]/g, '')}`}
                                className="w-full md:w-auto bg-gray-900 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-black tracking-widest hover:bg-blue-600 transition-colors"
                            >
                                <span>髮ｻ隧ｱ縺ｧ蠢懷供縺吶ｋ</span>
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
