import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, 
    ShieldCheck, 
    Zap, 
    ArrowUpRight,
    ArrowRight,
    MessageSquare
} from 'lucide-react';
import { usePrices } from '../../contexts/PriceContext';

const SecurityKnowledgeArchivePage: React.FC = () => {
    const navigate = useNavigate();
    const { securityKnowledge } = usePrices();
    const theftMethods = securityKnowledge?.theftMethods || [];

    return (
        <div className="min-h-screen bg-[#050807] text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-900">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#050807]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/security-home')}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-400" />
                        </button>
                        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/security-home')}>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition-all">
                                <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg md:text-xl font-black tracking-tighter leading-none italic">ANG KNOWLEDGE</span>
                                <span className="text-[9px] font-black tracking-[0.3em] text-emerald-500 uppercase mt-1 leading-none italic">Security Awareness</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic leading-none mb-8 uppercase text-white">
                            THEFT<br /><span className="text-emerald-500">METHODS.</span>
                        </h1>
                        <p className="text-gray-400 font-bold text-lg md:text-xl max-w-2xl mx-auto italic">
                            巧妙化する盗難手口の「今」を知り、愛車を守るための知識を身につける。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {theftMethods.map((method: any, idx: number) => (
                            <motion.div
                                key={method.id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => {
                                    const target = method.link || `/security/knowledge/${method.slug}`;
                                    if (target.startsWith('http')) {
                                        window.open(target, '_blank');
                                    } else {
                                        navigate(target);
                                    }
                                }}
                                className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 hover:border-emerald-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
                                <div className="relative z-10 space-y-6">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white tracking-tight italic uppercase mb-3">{method.title}</h3>
                                        <p className="text-gray-400 font-bold leading-relaxed text-sm line-clamp-3">
                                            {method.description}
                                        </p>
                                    </div>
                                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Read Article</span>
                                        <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {theftMethods.length === 0 && (
                        <div className="text-center py-32 rounded-[3rem] border border-dashed border-white/10">
                            <ShieldCheck className="w-16 h-16 text-gray-800 mx-auto mb-6" />
                            <p className="text-gray-500 font-black italic tracking-widest uppercase">No articles available yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-32 bg-emerald-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-black italic tracking-tighter mb-10 uppercase">
                        YOUR CAR,<br />YOUR SECURITY.
                    </h2>
                    <p className="text-black/70 font-bold text-lg mb-12 italic">
                        不安な点があれば、いつでもプロにご相談ください。<br />
                        最新の手口に合わせた、あなただけの防衛プランをご提案します。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/reservation')}
                            className="px-10 py-5 bg-black text-white font-black italic rounded-2xl hover:bg-zinc-900 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
                        >
                            <MessageSquare className="w-5 h-5" /> 相談予約をする
                        </button>
                        <button
                            onClick={() => navigate('/faq')}
                            className="px-10 py-5 bg-white/20 text-black font-black italic rounded-2xl hover:bg-white/30 transition-all flex items-center justify-center gap-3 border border-black/10"
                        >
                            よくあるご質問 <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SecurityKnowledgeArchivePage;
