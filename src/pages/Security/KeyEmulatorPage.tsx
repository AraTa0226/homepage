import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ShieldAlert,
    Gamepad2,
    Zap,
    Wifi,
    Lock,
    Clock,
    Smartphone,
    AlertTriangle,
    ShieldCheck,
    Cpu,
    ArrowRight,
    Search,
    Database,
    Binary
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

export const KeyEmulatorPage: React.FC = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: '1. キーエミュレーターとは何か？',
            content: '車に対して「自分が本物のスマートキーである」と認識させるための特殊な電子機器です。見た目が昔の携帯型ゲーム機に似ていることから、通称「ゲームボーイ」と呼ばれています。',
            icon: <Gamepad2 className="w-6 h-6" />
        },
        {
            title: '2. どのように車を盗むのか（仕組み）',
            content: '車が鍵と通信しようとするタイミングで、機器内のソフトウェアが正しいパスワード（暗号コード）をわずか数秒で自動計算。車を完全に「本物の鍵がある」と信じ込ませます。',
            icon: <Binary className="w-6 h-6" />
        },
        {
            title: '3. なぜこれほど危険なのか？',
            content: '侵入の痕跡が一切残らない「無音・高速」の犯行。数秒〜数分で始動。VIN（車台番号）からのPIN特定機能なども備え、従来の防壁を容易に突破します。',
            icon: <ShieldAlert className="w-6 h-6" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#05070a] text-white font-sans selection:bg-purple-500/30">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/security-home')}
                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-bold group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm tracking-widest uppercase font-black">Security Home</span>
                    </button>
                    <div className="flex items-center gap-3 italic">
                        <span className="font-black text-xl tracking-tighter">ANG</span>
                        <span className="w-px h-4 bg-white/20"></span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Crime Analysis</span>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-purple-500/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400">
                            <ShieldAlert className="w-4 h-4" />
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase italic">Next Generation Threat: KEY EMULATOR</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.9]">
                            最凶の次世代手口<br />
                            <span className="text-purple-400">『キーエミュレーター』</span>
                        </h1>
                        <p className="text-white/40 font-bold text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed italic">
                            本物の鍵は、もう現場にいなくていい。<br className="md:hidden" />
                            「総当たり」で暗号を破る、絶望のゲーム。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                    {sections.map((section, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-6 group hover:border-purple-500/30 transition-all"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform font-bold">
                                {section.icon}
                            </div>
                            <h3 className="text-xl font-black italic tracking-tight">{section.title}</h3>
                            <p className="text-sm font-bold text-white/40 leading-relaxed">{section.content}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Key Difference Section */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto bg-red-500/5 border border-red-500/10 p-12 md:p-20 rounded-[4rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <Database className="w-40 h-40" />
                    </div>
                    <div className="relative z-10 space-y-12">
                        <div className="space-y-4">
                            <span className="text-red-500 font-black text-xs uppercase tracking-widest leading-none">Critical Difference</span>
                            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight">
                                リレーアタックとの<br />決定的な違い
                            </h2>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-white/70 leading-relaxed italic">
                            「リレーアタック」は家の中の鍵の電波を盗みます。<br />
                            しかし「キーエミュレーター」は、<br className="md:hidden" />
                            <span className="text-white underline decoration-red-500/30 decoration-4 underline-offset-8">
                                本物の鍵が近くになくても単独で機能します。
                            </span>
                        </p>
                        <p className="text-white/40 font-bold leading-relaxed">
                            持ち主が海外旅行中などで鍵を遠くに持ち去っていても、この機器を持った犯人の前では、車は無防備にドアを開け、エンジンを始動させてしまうのです。
                        </p>
                        <div className="pt-6">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-500">
                                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-black italic">電波遮断ポーチ（ファラデーボックス）は、この手口には全く効果がありません。</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mechanism Diagram */}
            <section className="py-32 px-6 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full"></div>
                        <SafeImage
                            src="/images/Security/detail/key-emulator-diagram.png"
                            className="relative z-10 w-full rounded-[4rem] border border-white/5 opacity-80 shadow-2xl"
                            alt="Key Emulator Diagram"
                        />
                    </div>
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-purple-400 font-black text-xs uppercase tracking-widest">Targets & Realities</span>
                            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-tight">
                                狙われるのは、<br />高級車だけではない。
                            </h2>
                        </div>
                        <div className="space-y-8 text-lg font-bold text-white/50 leading-relaxed">
                            <p>
                                以前は数千万円する高級車のみがターゲットでしたが、現在は機器のアップデートにより、<span className="text-white">ヒュンダイ、日産、三菱</span>などの一般的なEVやハイブリッド車も広く標的になっています。
                            </p>
                            <p>
                                また、スマホで操作するようにボタン一つで暗号特定が完了し、専門知識のない窃盗団でも簡単に車を盗めるようになっているのが現状です。
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                                <span className="block text-2xl font-black italic text-purple-400 mb-1">20s ~</span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Theft Speed</span>
                            </div>
                            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                                <span className="block text-2xl font-black italic text-purple-400 mb-1">Zero Trace</span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Physical Damage</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Measures Section */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <span className="text-purple-400 font-black text-xs uppercase tracking-widest leading-none">Countermeasures</span>
                        <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter">
                            私たちにできる有効な自衛策
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                title: '後付けPINコード入力式イモビライザー',
                                desc: 'エンジン始動前に特定のボタン操作（PINコード）を要求するシステム。デジタル信号を破られても、オーナーしか知らない手順を踏まない限りエンジンはかかりません。車両盗難に対する「最後の砦」として極めて有効です。'
                            },
                            {
                                title: '物理的なロックの併用',
                                desc: 'ハンドルロック等のアナログな防犯グッズ。高度な技術を持つ泥棒にとっても、物理的な破壊が必要なアナログロックは「手間とリスク」を増やす最強の抑止力になります。'
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] transition-colors group">
                                <div className="space-y-4">
                                    <h4 className="text-xl font-black italic tracking-tight flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                        {item.title}
                                    </h4>
                                    <p className="text-white/50 font-bold leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Conclusion CTA */}
            <section className="py-40 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/5 blur-[150px] rounded-full"></div>
                <div className="max-w-5xl mx-auto bg-black border border-purple-500/20 p-12 md:p-24 rounded-[5rem] relative z-10 text-center space-y-12">
                    <div className="w-20 h-20 bg-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
                        <ShieldCheck className="w-10 h-10 text-black" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight">
                        電波遮断だけでは、<br />
                        もう愛車は守れません。
                    </h2>
                    <p className="text-white/60 font-bold text-xl leading-relaxed max-w-3xl mx-auto">
                        本物の鍵をコピーするのではなく、自ら鍵を作り出してしまうキーエミュレーター。
                        この驚威には、「デジタルでのエンジンブロック」と「アナログの物理ロック」を掛け合わせた多重防御のみが対抗できます。
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8">
                        <a
                            href="https://page.line.me/312qjhsq?openQrModal=true"
                            className="w-full md:w-auto px-12 py-5 bg-white/5 border border-white/10 text-white font-black italic tracking-tighter rounded-full text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                        >
                            LINEで相談する
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};
