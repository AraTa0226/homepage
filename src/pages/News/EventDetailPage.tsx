import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Share2, AlertCircle } from 'lucide-react';
import { usePrices } from '../../contexts/PriceContext';

export const EventDetailPage: React.FC<{ domain: 'audio' | 'security' }> = ({ domain }) => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { audioEvents, securityEvents } = usePrices();

    const events = domain === 'audio' ? audioEvents : securityEvents;
    const event = events.find(e => e.slug === slug);

    useEffect(() => {
        if (event) {
            document.title = `${event.title} | Sound ANG`;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', event.description);
        }
    }, [event]);

    if (!event) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
                <AlertCircle className="w-16 h-16 text-zinc-800 mb-6" />
                <h1 className="text-4xl font-black text-white italic mb-4">PAGE NOT FOUND</h1>
                <p className="text-zinc-500 mb-8 max-w-md">お探しのイベントページは見つかりませんでした。既に終了しているか、URLが変更された可能性があります。</p>
                <button 
                    onClick={() => navigate(domain === 'audio' ? '/' : '/security-home')}
                    className="bg-white text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-blue-600/10 selection:text-blue-600">
            {/* Custom CSS Injection */}
            {event.css && <style>{event.css}</style>}

            {/* Simple Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-zinc-100 z-50">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors font-black text-[10px] uppercase tracking-widest"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 text-zinc-400 font-bold text-xs">
                            <Calendar className="w-3.5 h-3.5" />
                            {event.date}
                        </div>
                        <button className="p-2 text-zinc-400 hover:text-black transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-20">
                {/* Status Banner for Archived Pages */}
                {event.status === 'archived' && (
                    <div className="bg-zinc-900 text-white py-4 px-6 text-center text-xs font-bold uppercase tracking-widest">
                        このイベントは終了しました。記載されている情報は現在のものと異なる場合があります。
                    </div>
                )}

                {/* The Injected HTML Content */}
                <div 
                    className="event-content-wrapper"
                    dangerouslySetInnerHTML={{ __html: event.content }} 
                />
            </main>

            {/* Simple Footer for SEO Pages */}
            <footer className="bg-zinc-50 py-20 border-t border-zinc-100">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-black italic mb-4">Sound ANG</h2>
                    <p className="text-zinc-500 text-sm font-bold leading-relaxed mb-12">
                        福岡県大野城市のカーオーディオ・セキュリティ専門店。<br />
                        30年以上の実績と確かな技術力で、お客様の理想を形にします。
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button 
                            onClick={() => navigate(domain === 'audio' ? '/' : '/security-home')}
                            className="bg-zinc-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
                        >
                            Visit Official Website
                        </button>
                    </div>
                    <p className="mt-20 text-[10px] font-black text-zinc-300 uppercase tracking-widest">© 2024 Sound ANG. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};
