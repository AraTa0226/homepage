import React from 'react';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    ChevronLeft, 
    ShieldCheck, 
    Calendar,
    Share2,
    ArrowRight
} from 'lucide-react';
import { usePrices } from '../../contexts/PriceContext';

const SecurityKnowledgeDetailPage: React.FC = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { securityKnowledge } = usePrices();
    
    const article = securityKnowledge?.theftMethods?.find((m: any) => m.slug === slug);
    
    // SEO Metadata
    React.useEffect(() => {
        if (article) {
            document.title = `${article.title} | ANG KNOWLEDGE`;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription && article.description) {
                metaDescription.setAttribute('content', article.description);
            }
        }
        window.scrollTo(0, 0);
    }, [article]);

    if (!article) {
        return (
            <div className="min-h-screen bg-[#050807] flex items-center justify-center">
                <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto border border-white/5">
                        <ShieldCheck className="w-10 h-10 text-emerald-500 opacity-20" />
                    </div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Article Not Found</h2>
                    <button onClick={() => navigate('/security-home')} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-500/30 selection:text-emerald-900">
            {/* Simple Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Back</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-black">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black italic tracking-tighter">ANG KNOWLEDGE</span>
                    </div>
                    <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="pt-32 pb-32">
                <article className="max-w-4xl mx-auto px-6">
                    <header className="mb-16">
                        <div className="flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6">
                            <span className="px-2 py-1 bg-emerald-50 rounded">Theft Awareness</span>
                            <span>/</span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                Latest Update
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic text-zinc-900 leading-none mb-8">
                            {article.title}
                        </h1>
                        <p className="text-xl text-zinc-500 font-bold italic leading-relaxed">
                            {article.description}
                        </p>
                    </header>

                    {/* Dynamic Content Area */}
                    <div className="prose prose-zinc max-w-none prose-headings:font-black prose-headings:italic prose-h2:text-3xl prose-p:text-lg prose-p:leading-relaxed prose-p:font-medium prose-p:text-zinc-600">
                        {/* 
                            Note: We use dangerouslySetInnerHTML because the admin dashboard 
                            is designed to save full HTML/React-like landing page snippets.
                        */}
                        <div 
                            dangerouslySetInnerHTML={{ __html: article.content }} 
                            className="dynamic-article-content"
                        />
                    </div>
                </article>
            </main>

            {/* Bottom Navigation */}
            <footer className="bg-zinc-50 border-t border-zinc-100 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-zinc-100">
                        <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter italic mb-4">大切な愛車を、最高の技術で守る。</h3>
                    <p className="text-zinc-500 font-bold mb-10 italic">
                        ANGでは最新の盗難手口を徹底的に分析し、<br />
                        それぞれの車種に最適なセキュリティーパッケージをご提案します。
                    </p>
                    <button 
                        onClick={() => navigate('/reservation')}
                        className="group inline-flex items-center gap-4 bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black italic transition-all hover:bg-emerald-700 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-600/20"
                    >
                        相談予約へ進む <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default SecurityKnowledgeDetailPage;
