import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { usePrices } from '../../contexts/PriceContext';
import { 
    Speaker, 
    ArrowLeft, 
    MessageSquare, 
    Mail, 
    ChevronRight,
    Music,
    Zap,
    Award,
    ShieldCheck
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

const AudioPlanDetail: React.FC = () => {
    const { planId } = useParams();
    const navigate = useNavigate();
    const { plans } = usePrices();

    const decodedPlanId = decodeURIComponent(planId || "");

    // Find the specific plan from all audio categories
    const audioCategories = plans.filter(p => p.type === 'audio');
    let plan = null;
    for (const cat of audioCategories) {
        plan = cat.items.find(item => item.name === decodedPlanId || item.id === decodedPlanId);
        if (plan) break;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [planId]);

    // Even if not found in data, we show the name from the URL
    const displayTitle = plan?.name || decodedPlanId;

    return (
        <div className="min-h-screen bg-white">
            {/* Header / Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-blue-100 group-hover:bg-blue-50 transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-black tracking-widest uppercase">Back</span>
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                            <span className="font-black italic">S</span>
                        </div>
                        <span className="font-black tracking-tighter text-xl">Sound ANG</span>
                    </div>

                    <div className="w-24"></div> {/* Spacer */}
                </div>
            </header>

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Hero Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-6">
                                <Music className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Speaker Upgrade Plan</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">
                                {displayTitle}
                            </h1>
                            <div className="flex items-baseline gap-4 mb-10">
                                <span className="text-sm font-bold text-gray-400">Price From</span>
                                <span className="text-5xl font-black text-blue-600 tracking-tighter">
                                    ¥{plan ? Number(plan.price).toLocaleString() : "---,---"}
                                </span>
                                <span className="text-sm font-bold text-gray-400 text-sm">税込 (工賃別)</span>
                            </div>

                            <p className="text-lg text-gray-500 font-bold leading-relaxed mb-10">
                                このプランは現在詳細ページを準備中です。<br />
                                施工内容の詳細や適合車種、お見積りについてはお気軽にお問い合わせください。
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href="https://page.line.me/312qjhsq?openQrModal=true"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-[#06C755] text-white px-8 py-5 rounded-2xl font-black text-sm tracking-widest shadow-xl shadow-green-500/20 hover:scale-105 transition-all"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    LINEで相談する
                                </a>
                                <button 
                                    onClick={() => navigate('/reservation')}
                                    className="flex items-center gap-3 bg-gray-900 text-white px-8 py-5 rounded-2xl font-black text-sm tracking-widest shadow-xl shadow-gray-900/10 hover:scale-105 transition-all"
                                >
                                    <Mail className="w-5 h-5" />
                                    来店予約・見積り
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/10 border border-gray-100">
                                <SafeImage 
                                    src={plan.image || '/images/Audio/speaker_default.webp'} 
                                    alt={plan.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Decorative Elements */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 blur-3xl rounded-full -z-10"></div>
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/10 blur-3xl rounded-full -z-10"></div>
                        </motion.div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plan?.features?.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-2">{feature}</h3>
                                <p className="text-xs text-gray-500 font-bold leading-relaxed">
                                    最高品質のパーツを使用し、熟練のインストーラーが丁寧に施工いたします。
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Coming Soon Notice */}
                    <div className="mt-24 p-12 bg-gray-900 rounded-[3rem] text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <Award className="w-16 h-16 text-blue-500 mx-auto mb-8" />
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter">
                                COMING SOON
                            </h2>
                            <p className="text-gray-400 font-bold max-w-2xl mx-auto leading-relaxed">
                                より詳細な施工ギャラリーや、パーツの解説などを順次公開予定です。<br />
                                サウンドエナジーが提供する、至高の音響空間へのこだわりを是非ご期待ください。
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer-like Floating Action (Mobile) */}
            <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl p-4 shadow-2xl flex gap-3">
                    <a 
                        href="https://page.line.me/312qjhsq?openQrModal=true"
                        className="flex-1 bg-[#06C755] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xs tracking-widest"
                    >
                        <MessageSquare className="w-4 h-4" /> LINE
                    </a>
                    <button 
                        onClick={() => navigate('/reservation')}
                        className="flex-1 bg-gray-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xs tracking-widest"
                    >
                        <Mail className="w-4 h-4" /> 予約
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioPlanDetail;
