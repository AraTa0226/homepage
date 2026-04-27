import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
    Shield,
    Zap,
    CheckCircle2,
    ArrowLeft,
    Lock,
    Smartphone,
    Radio,
    Activity,
    MessageSquare,
    Calendar,
    Plus,
    Key,
    ShieldCheck,
    AlertCircle
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

import { usePrices } from '../../contexts/PriceContext';

export const CliffordPage: React.FC = () => {
    const navigate = useNavigate();
    const { plans } = usePrices();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cliffordCategory = plans.find(p => p.id === 'security_clifford');
    const allCliffordItems = cliffordCategory?.items || [];

    const g6Lineup = allCliffordItems
        .filter(item => item.subType === 'g6')
        .map(item => ({
            id: item.name.toLowerCase().replace(/\s+/g, '_'),
            name: item.name,
            label: item.badge,
            desc: item.description,
            image: item.image
        }));

    const matrixLineup = allCliffordItems
        .filter(item => item.subType === 'matrix')
        .map(item => ({
            id: item.name.toLowerCase().replace(/\s+/g, '_'),
            name: item.name,
            label: item.badge,
            desc: item.description,
            image: item.image
        }));


    const techHighlights = [
        {
            title: "Double Immobilizer",
            desc: "2カ所の電源を遮断し、エンジンの再始動を物理的に防御。マニュアル車の押し掛けも防止します。",
            icon: Shield
        },
        {
            title: "Normally Open System",
            desc: "本体が破壊・撤去されてもイモビライザーが解除されない、CLIFFORD独自の鉄壁防御システム。",
            icon: Lock
        },
        {
            title: "Omni Sensor",
            desc: "衝撃を精密に判別し、微細な振動から強烈な衝撃まで学習機能によって確実に検知します。",
            icon: Activity
        },
        {
            title: "Black Jacks",
            desc: "カージャック等の緊急時にも、独自のオーナー認証なしでは走行を不可能にする最強の自走防止策。",
            icon: Key
        }
    ];

    const g6Features = [
        { label: 'オムニセンサ', ig88j: '●', c48j: '–', a6j: '–' },
        { label: 'ダブルイモビライザー', ig88j: '●', c48j: '●', a6j: 'シングル' },
        { label: 'アンチコードグラビング', ig88j: '●', c48j: '●', a6j: '●' },
        { label: 'ブラックジャックス', ig88j: '●', c48j: '–', a6j: '–' },
        { label: '5ボタンリモコン', ig88j: '2個', c48j: '2個', a6j: '2個' },
        { label: 'サイレン', ig88j: '518型', c48j: '518型', a6j: '514型' },
    ];

    return (
        <div className="min-h-screen bg-[#05070a] text-white font-sans selection:bg-indigo-500/30">
            {/* Header */}
            <header className="fixed top-0 z-50 w-full bg-[#05070a]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-[1800px] mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/security-home')}
                        className="flex items-center gap-2 text-xs font-black tracking-[0.3em] text-white/40 hover:text-white transition-all uppercase group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Security
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black tracking-[0.5em] text-indigo-500 uppercase mb-1">World Frontier</span>
                        <h1 className="text-2xl font-black tracking-tighter italic">CLIFFORD</h1>
                    </div>
                    <button onClick={() => navigate('/reservation')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest transition-all">
                        相談予約
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <SafeImage
                        src="/images/Security/model/clifford-hero.webp"
                        className="w-full h-full object-cover opacity-60"
                        alt="CLIFFORD G6"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#05070a] via-transparent to-[#05070a]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8 mt-40"
                    >
                        {/* ヒーロー画像自体にテキストが含まれているため、オーバーレイテキストを削除 */}
                    </motion.div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20">
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-indigo-500/50 to-transparent"></div>
                </div>
            </section>

            {/* Message & Remote Section */}
            <section className="py-32 overflow-hidden border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-tight">
                                クリフォードについて<br />
                                <span className="text-indigo-500">語らせてください。</span>
                            </h3>
                            <div className="space-y-6 text-lg text-white/70 font-bold leading-relaxed">
                                <p>世界で初めてカーセキュリティという概念を築き、世界で初めてリモコンを導入し、日本で初めて紹介されたカーセキュリティ。</p>
                                <p>クリフォードは常に盗難の状況を把握し、最新の対応策を講じるシステムアップを行い続けてきました。</p>
                                <p>第6世代「G6」となり、あなたの愛車を『触らせない・入らせない・動かせない』最強の守りを提供します。</p>
                            </div>
                        </motion.div>
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="absolute inset-0 bg-indigo-600/10 blur-[100px] rounded-full"></div>
                            <div className="relative group">
                                <SafeImage
                                    src="/images/Security/model/clifford-key.webp"
                                    className="relative z-10 w-full max-w-[320px] mx-auto drop-shadow-[0_0_30px_rgba(79,70,229,0.2)] group-hover:scale-105 transition-transform duration-700"
                                    alt="Clifford Remote"
                                />
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-2xl">
                                    <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">G6 Digital Remote</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 md:p-20">
                        <div className="grid lg:grid-cols-3 gap-16">
                            <div className="space-y-6">
                                <span className="text-indigo-500 font-black tracking-widest text-xs uppercase">Instruction</span>
                                <h4 className="text-3xl font-black italic tracking-tighter">ボタン操作</h4>
                                <p className="text-white/40 font-bold leading-relaxed text-sm">
                                    5個のボタンでセキュリティの基本操作の他、多くの便利な機能を操作することができます。
                                </p>
                            </div>
                            <div className="lg:col-span-2 grid md:grid-cols-2 gap-x-12 gap-y-10">
                                {[
                                    { id: '01', title: 'アーム／ディスアームボタン', desc: 'アーム（警戒モード）やディスアーム（非警戒モード）のボタン' },
                                    { id: '02', title: 'AUXボタン', desc: '様々なオプション機能（トランクオープンなど）をコントロールするボタン' },
                                    { id: '03', title: 'リモートスタートボタン', desc: 'オプションのリモートエンジンスタートユニットを追加することでエンジン始動ができます。' },
                                    { id: '04', title: 'サイレントボタン', desc: '消音モードのアーム（警戒モード）やディスアーム（非警戒モード）の操作が可能。' },
                                    { id: '05', title: 'シフトボタン', desc: '他のボタンと組み合わせて押すことにより、様々な機能やオプション機器のコントロールを可能とします。' }
                                ].map((btn) => (
                                    <div key={btn.id} className="flex gap-6 group">
                                        <span className="text-2xl font-black text-indigo-500/30 group-hover:text-indigo-500 transition-colors duration-500 leading-none">{btn.id}</span>
                                        <div className="space-y-2">
                                            <h5 className="font-black text-white group-hover:text-indigo-400 transition-colors duration-500">{btn.title}</h5>
                                            <p className="text-xs text-white/40 font-bold leading-relaxed">{btn.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compliance Section */}
            <section className="py-20 border-y border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="flex gap-6 items-start">
                            <ShieldCheck className="w-12 h-12 text-indigo-500 shrink-0" />
                            <div className="space-y-4">
                                <h4 className="text-xl font-black italic">盗難発生警報装置技術基準適合品</h4>
                                <p className="text-xs text-white/40 leading-relaxed font-bold">
                                    国土交通省の道路運送車両法で定められた技術基準に適合。全国自動車用品工業会（JAAMA）の「VASマーク」を取得しており、車検にも完全対応しています。
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <Radio className="w-12 h-12 text-indigo-500 shrink-0" />
                            <div className="space-y-4">
                                <h4 className="text-xl font-black italic">特定小電力無線機器 技適適合品</h4>
                                <p className="text-xs text-white/40 leading-relaxed font-bold">
                                    総務省の技術基準をクリアした製品に付与される「技適マーク」を全モデルで取得。日本国内の電波法に基づいた、混信の少ない安定した通信を提供します。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Grid */}
            <section className="py-32 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-indigo-500 font-black tracking-[0.3em] uppercase text-xs">Core Technology</span>
                        <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter mt-4">鉄壁を支える独自技術</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {techHighlights.map((tech, i) => (
                            <div key={i} className="bg-white/5 p-10 rounded-[3rem] border border-white/5 hover:border-indigo-500/30 transition-all group">
                                <tech.icon className="w-12 h-12 text-indigo-500 mb-8 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-black mb-4 tracking-tight">{tech.title}</h4>
                                <p className="text-sm text-white/50 font-bold leading-relaxed">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* G6 Lineup */}
            <section id="g6-lineup" className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                        <div className="space-y-4">
                            <span className="text-indigo-500 font-black tracking-[0.4em] uppercase text-xs">Top of Security</span>
                            <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">CLIFFORD G6.</h3>
                        </div>
                        <p className="text-white/40 font-bold max-w-md text-right">
                            全機種で採用するダブルイモビライザーは2カ所で電源をカット。最高峰の自走防止能力を誇ります。
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {g6Lineup.map((item) => (
                            <div key={item.id} className="group relative bg-[#0c1218] border border-white/5 rounded-[4rem] p-12 hover:border-indigo-500/30 transition-all overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-[60px] group-hover:bg-indigo-600/10 transition-all"></div>
                                <div className="space-y-8 relative z-10">
                                    <div className="w-full h-48 mb-8">
                                        <SafeImage
                                            src={item.image}
                                            className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500"
                                            alt={item.name}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-600/10 px-4 py-1 rounded-full inline-block mb-2">{item.label}</span>
                                        <h4 className="text-3xl font-black italic tracking-tighter text-white uppercase">{item.name}</h4>
                                    </div>
                                    <p className="text-sm text-gray-500 font-bold leading-relaxed min-h-[3em]">{item.desc}</p>
                                    <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex gap-2 text-xs font-black text-indigo-400">
                                            {item.id === '880j' && <CheckCircle2 className="w-4 h-4 text-indigo-500" />}
                                            {item.id === '880j' ? '最高峰オムニ搭載' : 'ダブルイモビ搭載'}
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-indigo-600 transition-all">
                                            <Shield className="w-5 h-5 text-indigo-500 group-hover:text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Features List Table */}
                    <div className="mt-20 overflow-x-auto rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-indigo-600/10">
                                    <th className="p-8 text-sm font-black uppercase tracking-widest text-indigo-400">主要機能比較</th>
                                    <th className="p-8 text-xs font-black uppercase text-center">IntelliGuard 880J</th>
                                    <th className="p-8 text-xs font-black uppercase text-center">Concept 480J</th>
                                    <th className="p-8 text-xs font-black uppercase text-center">Arrow 6J</th>
                                </tr>
                            </thead>
                            <tbody>
                                {g6Features.map((f, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-8 text-sm font-bold text-white/60">{f.label}</td>
                                        <td className="p-8 text-sm font-black text-center text-white">{f.ig88j}</td>
                                        <td className="p-8 text-sm font-bold text-center text-white/50">{f.c48j}</td>
                                        <td className="p-8 text-sm font-bold text-center text-white/50">{f.a6j}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Matrix Series */}
            <section className="py-32 bg-indigo-950/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="text-indigo-400 font-black tracking-[0.5em] uppercase text-xs">Modern Intelligence</span>
                        <h3 className="text-5xl md:text-8xl font-black italic tracking-tighter mt-4 uppercase">MATRIX SERIES.</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {matrixLineup.map((item) => (
                            <div key={item.id} className="bg-white/5 p-8 rounded-[3rem] border border-white/5 hover:border-indigo-500/20 transition-all group flex flex-col">
                                <div className="w-full h-32 mb-6">
                                    <SafeImage
                                        src={item.image}
                                        className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
                                        alt={item.name}
                                    />
                                </div>
                                <div className="space-y-4 mb-10 flex-grow">
                                    <span className="text-[9px] font-black text-indigo-400/60 uppercase tracking-widest">{item.label}</span>
                                    <h4 className="text-xl font-black tracking-tighter text-white uppercase">{item.name}</h4>
                                    <p className="text-xs text-white/40 font-bold leading-relaxed">{item.desc}</p>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Digital Link</span>
                                    <Smartphone className="w-5 h-5 text-indigo-500 group-hover:scale-125 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 grid md:grid-cols-3 gap-12 bg-indigo-600/5 p-12 rounded-[4rem] border border-indigo-500/10">
                        <div className="space-y-4">
                            <h4 className="text-xl font-black italic">LCD Answerback</h4>
                            <p className="text-sm text-white/50 leading-relaxed font-bold">状況を液晶画面にアイコン表示。マナーモード搭載でスマートに通知。（730XJ）</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-black italic">Bluetooth Link</h4>
                            <p className="text-sm text-white/50 leading-relaxed font-bold">お手持ちのスマートフォンで、セキュリティの基本操作が可能。（オプション対応）</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-black italic">CAN-BUS Link</h4>
                            <p className="text-sm text-white/50 leading-relaxed font-bold">純正キーにフル連動。操作感を損なわず最強のガードを実現。（330Xシリーズ）</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Optional Modules */}
            <section className="py-32 bg-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight">Beyond Excellence.<br /><span className="text-indigo-500 uppercase">Custom Options for G6.</span></h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                        {[
                            { name: 'ガラス割りセンサ (506T)', desc: '窓ガラスが割られた時の音を検知。' },
                            { name: 'ウルトラソニックセンサ', desc: '車内への侵入行為を確実に感知。' },
                            { name: 'デジタル傾斜センサ', desc: 'ジャッキアップや積載を検知。' },
                            { name: 'バックアップバッテリー', desc: '電源が断たれても警報を継続。' },
                            { name: 'G6ロゴスキャナー', desc: '夜間の防犯アピールに絶大。' },
                            { name: 'プッシュエンジンスタート対応', desc: '最新の車両規格にも完全対応。' },
                            { name: 'ブラックジャックス', desc: 'カージャック防止の究極認証。' },
                            { name: 'スマートセルフサイレン', desc: '配線切断時も自立して発報。' }
                        ].map((opt, i) => (
                            <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-indigo-500/20 transition-all flex flex-col items-center">
                                <Plus className="w-6 h-6 text-indigo-500 mb-6" />
                                <h4 className="text-sm font-black mb-2">{opt.name}</h4>
                                <p className="text-xs text-white/40 font-bold leading-relaxed">{opt.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-600/10 blur-[150px] opacity-20"></div>
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                    <div className="flex justify-center mb-8">
                        <AlertCircle className="w-16 h-16 text-indigo-500 animate-pulse" />
                    </div>
                    <h3 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-12 uppercase leading-none">Ultimate Defense<br />For Your Pride.</h3>
                    <p className="text-xl md:text-2xl text-white/60 mb-16 font-bold">
                        愛車の状況、駐車環境に合わせた最適なCLIFFORDシステムをご提案いたします。
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button onClick={() => navigate('/reservation')} className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-12 py-6 rounded-full text-lg font-black tracking-widest transition-all flex items-center justify-center gap-4 group">
                            <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            来店予約
                        </button>
                        <a href="https://page.line.me/312qjhsq?openQrModal=true" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-6 rounded-full text-lg font-black tracking-widest transition-all flex items-center justify-center gap-4 group">
                            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            LINEで無料相談
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer space */}
            <div className="h-20 border-t border-white/5 flex items-center justify-center">
                <span className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase">Clifford Security Systems | G6 Generation</span>
            </div>
        </div>
    );
};
