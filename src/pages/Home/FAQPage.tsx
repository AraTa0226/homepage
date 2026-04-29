import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ShieldCheck,
    HelpCircle,
    Plus,
    Minus,
    ChevronLeft,
    Search,
    MessageSquare,
    ArrowRight,
    Car,
    Clock,
    Zap,
    Battery,
    Lock,
    Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FAQ {
    question: string;
    answer: string;
    category: string;
}

const FAQPage: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('すべて');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const faqs: FAQ[] = [
        {
            category: "機能・仕様",
            question: "スマートキー連動は可能ですか？",
            answer: "はい、多くの最新車両で可能です。ただし、リレーアタックやCANインベーダー等の最新手口を防ぐためには、純正スマートキーとは別にセキュリティー専用のキーでの認証を組み合わせるプランを推奨しております。"
        },
        {
            category: "機能・仕様",
            question: "車検は通りますか？",
            answer: "当店で取り扱っているセキュリティーはすべて保安基準に適合した製品です。正しく施工されていれば車検に通りますのでご安心ください。"
        },
        {
            category: "導入・施工",
            question: "取り付けにかかる時間はどのくらいですか？",
            answer: "車種やプランにより異なりますが、標準的なセキュリティーで2〜3日、フルオプションやオーディオ施工が加わる場合は1週間から10日前後お預かりするケースが多いです。代車の貸し出しも行っております。"
        },
        {
            category: "運用・トラブル",
            question: "バッテリー上がりは心配ありませんか？",
            answer: "最新のデジタルセキュリティーは待機電力が非常に小さく設計されています。1〜2週間程度の放置であれば問題ありませんが、長期間（1ヶ月以上）お車に乗られない場合は、バッテリーメンテナンス等の対策をご案内しております。"
        },
        {
            category: "運用・トラブル",
            question: "誤作動（サイレンの鳴りっぱなし）が心配です。",
            answer: "プロの技術者がお客様の駐車環境（近くを大型車が通る、立体駐車場など）をヒアリングし、センサーの感度を最適に調整します。また、万が一誤作動が起きた場合でも、リモコンで即座に停止が可能です。"
        },
        {
            category: "機能・仕様",
            question: "中古車に最初から付いていたセキュリティーの使い方が分かりません。",
            answer: "当店では中古車購入時のセキュリティー診断サービス（￥3,300）をご用意しております。操作説明や設定の確認、必要に応じて再登録等も承りますのでお気軽にご相談ください。"
        }
    ];

    const categories = ['すべて', ...Array.from(new Set(faqs.map(f => f.category)))];

    const filteredFaqs = activeTab === 'すべて'
        ? faqs
        : faqs.filter(f => f.category === activeTab);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500/10 selection:text-blue-600">
            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg h-16 md:h-20' : 'bg-transparent h-20 md:h-28'}`}>
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/security-home')}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/security-home')}>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-900/10 group-hover:scale-105 transition-all">
                                <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg md:text-xl font-black tracking-tighter leading-none">ANG FAQ</span>
                                <span className="text-[9px] font-black tracking-[0.3em] text-slate-400 uppercase mt-1 leading-none italic">Help Center</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 md:pt-48 md:pb-24 overflow-hidden bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter italic leading-none mb-8 uppercase">
                            よくあるご質問
                        </h1>
                        <p className="text-slate-500 font-bold text-lg mb-12 italic">
                            セキュリティーの導入や操作、メンテナンスに関する「？」にお答えします。
                        </p>

                        {/* Search Bar - Visual only for now */}
                        <div className="max-w-2xl mx-auto relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="キーワードから探す (例: スマートキー, バッテリー...)"
                                className="w-full bg-white border border-slate-200 py-6 pl-16 pr-8 rounded-3xl shadow-xl shadow-slate-200/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold italic"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveTab(cat);
                                    setOpenIndex(null);
                                }}
                                className={`px-6 py-3 rounded-full text-xs font-black tracking-widest uppercase italic transition-all ${activeTab === cat ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-4">
                        {filteredFaqs.map((faq, i) => (
                            <div key={i} className={`border border-slate-100 rounded-[2rem] overflow-hidden transition-all ${openIndex === i ? 'bg-slate-50 ring-2 ring-blue-500/10' : 'bg-white hover:border-slate-200 shadow-sm'}`}>
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full px-8 py-8 flex items-center justify-between text-left group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black italic shadow-inner ${openIndex === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors'}`}>
                                            Q
                                        </div>
                                        <span className="text-base md:text-lg font-black tracking-tight leading-tight italic">{faq.question}</span>
                                    </div>
                                    <div className={`shrink-0 ml-4 transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`}>
                                        {openIndex === i ? <Minus className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-slate-300" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="px-8 pb-10 ml-14">
                                                <div className="h-px bg-slate-200 mb-8" />
                                                <div className="flex gap-6">
                                                    <div className="w-8 h-8 shrink-0 rounded-lg bg-rose-50 flex items-center justify-center font-black italic text-rose-600 text-sm">
                                                        A
                                                    </div>
                                                    <p className="text-slate-500 font-bold leading-relaxed text-base italic">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                            <HelpCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold italic uppercase tracking-widest">No matching questions found.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Still have questions? Section */}
            <section className="py-32 bg-slate-900 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-blue-500 mx-auto mb-10 border border-white/10">
                        <MessageSquare className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter mb-8 uppercase">
                        解決しない場合は <br className="md:hidden" />
                        お気軽にご相談を。
                    </h2>
                    <p className="text-slate-400 font-bold text-lg mb-12 italic">
                        専門店ならではの知識で、お客様の細かな疑問・不安をクリアにします。<br />
                        お電話、または予約システムからのご相談を承っております。
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/reservation')}
                            className="px-10 py-5 bg-white text-slate-900 font-black italic rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95"
                        >
                            相談予約をする
                        </button>
                        <a
                            href="tel:092-123-4567"
                            className="px-10 py-5 bg-white/5 text-white font-black italic rounded-2xl hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-3"
                        >
                            お電話でのお問い合わせ <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-20 px-6 border-t border-slate-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-slate-300">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="w-8 h-8 text-slate-200" />
                        <span className="font-black text-sm tracking-tighter uppercase px-2 py-0.5 border-2 border-slate-100 rounded-md">ANG SAFETY CENTER</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Empowering Vehicle Security Since 19XX.</p>
                </div>
            </footer>
        </div>
    );
};

export default FAQPage;
