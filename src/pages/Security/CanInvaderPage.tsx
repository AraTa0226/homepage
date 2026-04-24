import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ShieldAlert,
    Activity,
    Zap,
    Wifi,
    Smartphone,
    Clock,
    Radio,
    AlertTriangle,
    ShieldCheck,
    Cpu,
    ArrowRight,
    Search
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

export const CanInvaderPage: React.FC = () => {
    const navigate = useNavigate();

    const crimeSteps = [
        {
            id: 'Step 01',
            title: '「神経網」へのアクセス',
            desc: '最新車両のバンパー裏やヘッドライト付近には、車の「神経網（CAN）」が通っています。犯人はバンパーを無理やり剥がし、この配線を露出させます。',
            icon: <Activity className="w-6 h-6" />
        },
        {
            id: 'Step 02',
            title: '偽装デバイスの接続',
            desc: '露出した配線に、Bluetoothスピーカー等に偽装された「CANインジェクター」を接続。怪しまれない工夫が施された最新のハッキングツールです。',
            icon: <Smartphone className="w-6 h-6" />
        },
        {
            id: 'Step 03',
            title: '偽命令の流し込み',
            desc: 'デバイスから「解錠・エンジン始動」の偽信号を秒間20回という猛烈な速さで注入。同時にエラー報告を妨害し、システムを完全に乗っ取ります。',
            icon: <Radio className="w-6 h-6" />
        },
        {
            id: 'Step 04',
            title: 'わずか2分での出庫',
            desc: '車は「持ち主が来た」と誤認し、警報も鳴らずに解錠。エンジンがかかり、犯人は颯爽とターゲット車両を奪い去ってしまいます。',
            icon: <Zap className="w-6 h-6" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#05070a] text-white font-sans selection:bg-cyan-500/30">
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400">
                            <ShieldAlert className="w-4 h-4" />
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase italic">Next Gen Theft: CAN INVADER</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.9]">
                            最新手口<br />
                            <span className="text-cyan-400">『CANインベーダー』</span>
                        </h1>
                        <p className="text-white/40 font-bold text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed italic">
                            車の「神経網」を直接ハッキング。<br className="md:hidden" />
                            スマートキー対策を無効化する最先端の脅威。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Part 1: Mechanism - CAN Bus */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-12 bg-white/[0.03] border border-white/5 p-12 md:p-20 rounded-[4rem] backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="space-y-4 relative z-10">
                        <span className="text-cyan-400 font-black text-xs uppercase tracking-widest">Foundation</span>
                        <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter leading-tight">
                            1. 車の「神経網」CANとは？
                        </h2>
                    </div>
                    <div className="space-y-8 text-lg font-bold text-white/70 leading-relaxed relative z-10">
                        <p>
                            現代の車には、<span className="text-white underline decoration-cyan-500/30">「CAN（キャン）」</span>と呼ばれる、部品同士が連絡を取り合うための神経網のような通信線が張り巡らされています。
                        </p>
                        <div className="p-8 bg-black/40 rounded-3xl border border-white/5 italic">
                            ドアのロック解除、エンジンの始動、ブレーキの制御。これらすべての命令は、このCANという「神経網」を通じてデジタル信号でやり取りされています。
                        </div>
                        <div className="flex items-start gap-6 p-8 bg-red-500/5 rounded-3xl border border-red-500/10">
                            <Cpu className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                            <div className="space-y-4 text-sm">
                                <h4 className="text-red-500 font-black uppercase tracking-widest">The Critical Vulnerability</h4>
                                <p className="text-white font-bold leading-relaxed">
                                    CANインベーダーとは、この「神経網」に物理的にハッキング機器を繋ぎ、<br className="hidden md:block" />
                                    車自身に「偽の命令」を信じ込ませることでシステムを乗っ取る手口です。
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
                        <span className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em]">Operational Sequence</span>
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter">
                            2. 巧妙な犯行プロセス
                        </h2>
                        <p className="text-white/40 font-bold italic">外側から、気付かれることなく、一瞬で。</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {crimeSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] group hover:border-cyan-500/30 transition-colors"
                            >
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-cyan-400 text-black font-black flex items-center justify-center rounded-2xl italic">
                                    {i + 1}
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-8 text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                                    {step.icon}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black italic tracking-tight">{step.title}</h3>
                                    <p className="text-sm font-bold text-white/40 leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Highlight: Camouflage */}
                    <div className="max-w-4xl mx-auto p-12 bg-red-500/5 border border-red-500/10 rounded-[3rem] text-center space-y-6">
                        <h4 className="text-red-500 font-black uppercase tracking-widest text-sm italic">Unexpected Disguise</h4>
                        <p className="text-2xl font-black italic tracking-tight underline decoration-red-500/30 decoration-4 underline-offset-8">
                            犯行ツールは「Bluetoothスピーカー」に偽装されている
                        </p>
                        <p className="text-white/50 text-sm font-bold leading-relaxed">
                            JBLなどの有名メーカー製スピーカーの中身を抜き、<br className="hidden md:block" />
                            ハッキング基板が仕込まれています。一見するとキャンプや音楽好きの若者に見え、<br className="hidden md:block" />
                            周囲の目や警察の職務質問を巧みに回避します。
                        </p>
                    </div>
                </div>
            </section>

            {/* Part 3: Why now? */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-cyan-400 font-black text-xs uppercase tracking-widest">Evolution of Crime</span>
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-tight">
                                    3. なぜ今、CANインベーダーが増えているのか？
                                </h2>
                            </div>
                            <div className="space-y-8 text-lg font-bold text-white/60 leading-relaxed">
                                <p>
                                    以前は主流だった「リレーアタック」ですが、多くのオーナーが電波遮断ポーチ等の対策を導入し、電波を盗むことが難しくなりました。
                                </p>
                                <div className="p-10 bg-cyan-500/5 border-l-4 border-cyan-500 rounded-r-3xl">
                                    <p className="text-white">
                                        物理的に車の配線に直接コンタクトする「CANインベーダー」は、<br className="hidden md:block" />
                                        <span className="text-cyan-400">持ち主が鍵にどんな対策をしていようが無力化してしまう</span>ため、<br className="hidden md:block" />
                                        現在最も警戒すべき「最強の手口」へと進化を遂げたのです。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full"></div>
                            <SafeImage
                                src="/images/Security/detail/can-invader-diagram.png"
                                className="relative z-10 w-full rounded-[4rem] border border-white/5 opacity-80 shadow-2xl"
                                alt="CAN Invader Diagram"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Part 4: Risk Stats */}
            <section className="py-32 px-6 bg-[#0a0c10]">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-red-500 font-black text-xs uppercase tracking-widest leading-none">High Risk Models</span>
                            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter">
                                4. わずか120秒の絶望。
                            </h2>
                        </div>
                        <p className="text-white/50 font-bold leading-relaxed italic">
                            トヨタ RAV4やランドクルーザー、レクサスLXなど、<br />
                            特定の海外人気車種が極めて高い精度で狙われています。
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-center flex flex-col justify-center gap-2">
                            <span className="text-cyan-400 font-black text-4xl italic leading-none">120s</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Average Theft Time</span>
                        </div>
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-center flex flex-col justify-center gap-2">
                            <span className="text-cyan-400 font-black text-4xl italic leading-none">20Hz</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Injection Cycle</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Summary & Solution */}
            <section className="py-40 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/5 blur-[150px] rounded-full"></div>
                <div className="max-w-5xl mx-auto bg-black border border-cyan-500/20 p-12 md:p-24 rounded-[5rem] relative z-10 text-center space-y-12">
                    <div className="w-20 h-20 bg-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                        <ShieldCheck className="w-10 h-10 text-black" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight">
                        手口が「デジタル」なら、<br />
                        防御は「デジタル × アナログ」であるべきです。
                    </h2>
                    <p className="text-white/60 font-bold text-xl leading-relaxed max-w-3xl mx-auto">
                        車両システムへの物理介入には、強固なデジタルブロックが不可欠です。<br className="hidden md:block" />
                        しかし、ANGではそれだけで満足しません。PantheraやGrgoのような最高峰のアナログ警報器を組み合わせ、<br className="hidden md:block" />
                        デジタルハッキングも、物理的侵入も、どちらも許さない「真の多重防御」をご提案します。
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8">
                        <button
                            onClick={() => navigate('/security/digital')}
                            className="w-full md:w-auto px-12 py-5 bg-cyan-500 text-black font-black italic tracking-tighter rounded-full text-lg hover:scale-105 transition-all flex items-center justify-center gap-3 group"
                        >
                            対策製品を見る
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform font-bold" />
                        </button>
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
