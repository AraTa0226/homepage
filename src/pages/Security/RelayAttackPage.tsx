import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ShieldAlert,
    Lock,
    Zap,
    Users,
    Signal,
    Clock,
    VolumeX,
    AlertTriangle,
    ShieldCheck,
    Cpu,
    ArrowRight
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

export const RelayAttackPage: React.FC = () => {
    const navigate = useNavigate();

    const crimeSteps = [
        {
            id: 'Step 01',
            title: 'ターゲットの家への接近',
            desc: '犯人の1人（犯人A）が、ターゲットとなる家の玄関や壁にこっそり近づきます。多くの人は、帰宅後に鍵を玄関のテーブルやキッチンの上に置くため、家の外からでも鍵の微弱な電波を拾いやすい状態になっています。',
            icon: <Users className="w-6 h-6" />
        },
        {
            id: 'Step 02',
            title: '電波のキャッチと中継',
            desc: '犯人Aは特殊な「中継器（リレーデバイス）」を持っており、家の中から漏れ出ている鍵の電波を傍受します。そしてその信号を増幅させ、車のすぐそばに待機しているもう1人の犯人（犯人B）が持つデバイスに向けて送信（リレー）します。',
            icon: <Signal className="w-6 h-6" />
        },
        {
            id: 'Step 03',
            title: '車を「勘違い」させる',
            desc: '犯人Bの持っているデバイス（携帯型ゲーム機などに偽装されたエミュレーター）が、犯人Aから送られてきた鍵の信号を受け取り、それをそのまま車に浴びせます。',
            icon: <Cpu className="w-6 h-6" />
        },
        {
            id: 'Step 04',
            title: 'ドアが開き、エンジン始動',
            desc: '車は犯人Bのデバイスから送られてきた信号を受信すると、「本物の鍵を持った持ち主がすぐ横にいる」と完全に騙されてしまいます。その結果、犯人Bは普通にドアを開け、エンジンをかけて、そのまま車を盗み去ってしまいます。',
            icon: <Zap className="w-6 h-6" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#05070a] text-white font-sans selection:bg-emerald-500/30">
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500">
                            <ShieldAlert className="w-4 h-4" />
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase italic">The Reality of Relay Attack</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.9]">
                            一瞬で盗まれる<br />
                            <span className="text-emerald-500">『リレーアタック』</span>
                        </h1>
                        <p className="text-white/40 font-bold text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed italic">
                            便利なスマートキーの技術が、<br className="md:hidden" />
                            最凶の「窃盗ツール」に。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Part 1: Mechanism */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-12 bg-white/[0.03] border border-white/5 p-12 md:p-20 rounded-[4rem] backdrop-blur-sm">
                    <div className="space-y-4">
                        <span className="text-emerald-500 font-black text-xs uppercase tracking-widest">Mechanism</span>
                        <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter leading-tight">
                            1. スマートキーの本来の仕組み
                        </h2>
                    </div>
                    <div className="space-y-8 text-lg font-bold text-white/70 leading-relaxed">
                        <p>
                            最近の車は、常に「近くに鍵はないか？」という電波を出して聞き耳を立てています。一方のスマートキーも、微弱な電波を出し続けています。
                        </p>
                        <p className="p-8 bg-black/40 rounded-3xl border border-white/5 italic">
                            持ち主が鍵を持ったまま車に近づくと、信号が交信。車は「正しい信号がすぐそばにある」と認識し、ドアが開いたりボタン一つでエンジンがかかったりします。
                        </p>
                        <div className="flex items-start gap-6 p-8 bg-red-500/5 rounded-3xl border border-red-500/10">
                            <AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                            <div className="space-y-4 text-sm">
                                <h4 className="text-red-500 font-black uppercase tracking-widest">Systematic Vulnerability</h4>
                                <p className="text-white font-bold leading-relaxed">
                                    車は、誰が信号を送っているかや、本物の鍵がそこにあるかを視覚的に確認しているわけではありません。
                                    <span className="text-red-500 underline decoration-red-500/30 decoration-2 underline-offset-4 ml-1">
                                        「正しい信号を受信できたか」だけで判断してしまいます。
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Part 2: Step by Step */}
            <section className="py-32 px-6 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <span className="text-emerald-500 font-black text-xs uppercase tracking-[0.4em]">Step by Step</span>
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter">
                            2. 犯行の手口
                        </h2>
                        <p className="text-white/40 font-bold">犯行は基本的に2人1組で行われます。</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {crimeSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] group hover:border-emerald-500/30 transition-colors"
                            >
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500 text-black font-black flex items-center justify-center rounded-2xl italic">
                                    {i + 1}
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-8 text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                                    {step.icon}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black italic tracking-tight">{step.title}</h3>
                                    <p className="text-sm font-bold text-white/40 leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Part 3: Fear Factor */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-red-500 font-black text-xs uppercase tracking-widest">Risk Factors</span>
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-tight">
                                    3. リレーアタックの恐ろしさ
                                </h2>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { icon: Clock, title: '異常なスピード', desc: '物理的な破壊を行わないため、わずか20〜30秒という一瞬の出来事で車が盗まれます。' },
                                    { icon: VolumeX, title: '音が出ない', desc: 'アラームが鳴ることもなく、深夜でも静かに持ち去られます。' },
                                    { icon: Signal, title: '手に入りやすい道具', desc: '特殊な中継器はネット上で安価で手に入ってしまうのが現状です。' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-8 group">
                                        <div className="w-16 h-16 rounded-2xl bg-red-500/5 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-black transition-colors shrink-0">
                                            <item.icon className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xl font-black italic tracking-tight">{item.title}</h4>
                                            <p className="text-white/40 font-bold leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500/10 blur-[100px] rounded-full"></div>
                            <SafeImage
                                src="/images/Security/detail/relay-attack-diagram.png"
                                className="relative z-10 w-full rounded-[4rem] border border-white/5 opacity-80"
                                alt="Relay Attack Concept"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Part 4: Dilemma */}
            <section className="py-32 px-6 bg-white/[0.01]">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                        <span className="text-white/40 font-black text-xs uppercase tracking-widest leading-none">Manufacturer's Perspective</span>
                        <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter">
                            4. なぜメーカーは対策しないのか？
                        </h2>
                    </div>
                    <div className="space-y-8 text-lg font-bold text-white/60 leading-relaxed text-left md:text-center">
                        <p>
                            この脆弱性は以前から指摘されてきましたが、完全に修正しようとすると「鍵を持っていればいつでも開く」という利便性を損なう可能性があります。
                        </p>
                        <p>
                            結果として、泥棒とメーカーの間でいたちごっこのような技術的な「軍拡競争」が続いているのが実態です。
                        </p>
                    </div>
                </div>
            </section>

            {/* Summary & Solution */}
            <section className="py-40 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/5 blur-[150px] rounded-full"></div>
                <div className="max-w-5xl mx-auto bg-black border border-emerald-500/20 p-12 md:p-24 rounded-[5rem] relative z-10 text-center space-y-12">
                    <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                        <ShieldCheck className="w-10 h-10 text-black" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight">
                        手口が「デジタル」なら、<br />
                        防御は「デジタル × アナログ」であるべきです。
                    </h2>
                    <p className="text-white/60 font-bold text-xl leading-relaxed max-w-3xl mx-auto">
                        物理的に壊さないデジタル窃盗には、車両システムに直接介入するデジタルブロックが極めて有効です。<br className="hidden md:block" />
                        しかし、ANGが目指すのはその先。PantheraやGrgoのような従来のアナログセキュリティ（警報・サイレン）と<br className="hidden md:block" />
                        デジタルを高度に融合させることで、万が一の侵入さえも許さない「鉄壁の多重防御」をご提案しています。
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
