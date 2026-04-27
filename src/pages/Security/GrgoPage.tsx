import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../../contexts/SiteContext';
import {
    ShieldCheck,
    CheckCircle2,
    ArrowLeft,
    Shield,
    Zap,
    Activity,
    Smartphone,
    Gamepad2,
    Clock,
    Lock,
    Eye,
    Signal,
    Thermometer,
    Settings,
    MessageSquare
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

import { usePrices } from '../../contexts/PriceContext';

export const GrgoPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();

    const grgoCategory = plans.find(p => p.id === 'security_grgo');
    const lineUp = (grgoCategory?.items || []).map(item => ({
        id: item.name.toLowerCase().replace(/\s+/g, '_'),
        name: item.name,
        type: item.badge,
        desc: item.description,
        image: item.image
    }));


    return (
        <div className="min-h-screen bg-[#05070a] text-white selection:bg-blue-500/30">
            {/* Sticky Header */}
            <header className="fixed top-0 w-full z-[100] bg-[#05070a]/80 backdrop-blur-2xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/security-home')}
                        className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase">BACK TO SECURITY</span>
                    </button>

                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-blue-500 tracking-[0.5em] uppercase mb-1">Main Series</span>
                        <h1 className="text-2xl font-black italic tracking-tighter">Grgo VⅡ</h1>
                    </div>

                    <button
                        onClick={() => navigate('/reservation')}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-black text-[10px] tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                        相談予約
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[95vh] min-h-[700px] w-full pt-20 overflow-hidden bg-black">
                <SafeImage
                    src="/images/Security/model/grgo-h.webp"
                    className="w-full h-full object-contain"
                    alt="Grgo Series Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent"></div>
            </section>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 pb-48">

                {/* Introduction Section */}
                <section className="relative z-10 -mt-32 mb-48">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#0b1015] border border-white/5 rounded-[4rem] p-12 md:p-24 shadow-2xl backdrop-blur-3xl"
                    >
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-12">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                                        <ShieldCheck className="w-3 h-3" />
                                        Grgo販売取付店 専門モデル
                                    </div>
                                    <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9]">
                                        純国産の<br />
                                        <span className="text-blue-500">最高峰ガード。</span>
                                    </h2>
                                </div>
                                <p className="text-gray-400 font-bold text-lg leading-relaxed max-w-xl">
                                    益々巧妙化する不審な盗難手口。日本特有の住宅環境と駐車事情。
                                    これらに対応すべく、Grgoは新システムの採用や、きめ細かい感度設定を可能にしました。
                                    日本人だからこそ創れる設計で、Grgoはこれからも純国産にこだわり、高い信頼性と安心をご提供します。
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                                    <h4 className="text-white font-black text-xs uppercase tracking-widest">適合基準</h4>
                                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed">全ての製品でVAS・IMBマークを取得。新保安基準に基づいた適合登録品です。</p>
                                </div>
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                                    <h4 className="text-white font-black text-xs uppercase tracking-widest">技術基準</h4>
                                    <p className="text-[10px] text-gray-500 font-bold leading-relaxed">総務省技術基準（技適）に適合した国内専用設計。安心の特定小電力無線を採用。</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Lineup Stack */}
                <section className="space-y-48">

                    {/* Model Overview Section */}
                    <div className="space-y-24">
                        <div className="text-center space-y-6">
                            <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Product Lineup</span>
                            <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter">選ばれる4つの形態。</h3>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {lineUp.map((item) => (
                                <div key={item.id} className="group relative bg-[#0c1218] border border-white/5 rounded-[3rem] p-10 hover:border-blue-500/30 transition-all overflow-hidden flex flex-col justify-between">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] group-hover:bg-blue-600/10 transition-all"></div>
                                    <div className="space-y-6 relative z-10">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{item.type}</span>
                                            <h4 className="text-3xl font-black italic tracking-tighter text-white">{item.name}</h4>
                                        </div>
                                        <p className="text-xs text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                                    </div>
                                    <div className="pt-8 relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all text-gray-500">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Section: Answerback Models */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-32"
                    >
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-8">
                                <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Answerback Series</span>
                                <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter">ZVTⅡ / ZVⅡ</h3>
                                <p className="text-gray-400 font-bold text-lg leading-relaxed">
                                    異常の発生を通報音とバイブレータでお知らせ。
                                    フルカラー・アニメーション表示のリモコンで、車両の状態を一目で把握。
                                    2アクションのダイレクト操作で、高い防犯性能を直感的にコントロールできます。
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                                        <h5 className="text-white font-black text-xs mb-2">履歴履歴機能</h5>
                                        <p className="text-[10px] text-gray-500 font-bold">4秒おきのリモコン通知で聞き逃しを防止</p>
                                    </div>
                                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                                        <h5 className="text-white font-black text-xs mb-2">ダイレクト操作</h5>
                                        <p className="text-[10px] text-gray-500 font-bold">素早い操作が可能な直感的インターフェース</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative aspect-square rounded-[4rem] bg-white/5 border border-white/5 p-8 overflow-hidden flex items-center justify-center group">
                                <SafeImage src="/images/Security/model/grgo-key.webp" className="w-[85%] h-auto transform group-hover:scale-110 transition-transform duration-1000" />
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 bg-white/5 p-12 md:p-20 rounded-[4rem] border border-white/5">
                            <div className="space-y-8">
                                <h4 className="text-2xl font-black italic tracking-tighter text-blue-500 uppercase tracking-widest">主な対応機能</h4>
                                <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                                    {[
                                        "ドアセンサ / トランクセンサ",
                                        "イモビライザ (1系統)",
                                        "ショックセンサ (強弱検知)",
                                        "トリプルセンサ (物理衝撃/空圧)",
                                        "傾斜センサ (ジャッキアップ)",
                                        "フルカラー液晶リモコン",
                                        "ハザードフラッシュ機能",
                                        "暗証番号式バレースイッチ"
                                    ].map((f, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs font-black text-gray-300">
                                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h4 className="text-2xl font-black italic tracking-tighter text-gray-400 uppercase tracking-widest">主要オプション</h4>
                                <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                                    {[
                                        "マイクロ波センサ (接近検知)",
                                        "ボンネットセンサ (不正開放)",
                                        "バックアップサイレン (電源遮断対策)",
                                        "IRセンサ (車内侵入検知)",
                                        "スタータユニット (リモコン始動)",
                                        "ドライブレコーダー録画連動",
                                        "純正キーレスアダプタ (MCアダプタⅣ)",
                                        "Smart Xross 対応"
                                    ].map((o, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs font-black text-gray-500">
                                            <div className="w-1 h-1 rounded-full bg-gray-700" />
                                            {o}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Detailed Section: 1Vs2 (Keyless 연동) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-20 items-center"
                    >
                        <div className="order-2 lg:order-1 relative aspect-video rounded-[4rem] bg-white/5 border border-white/5 p-12 overflow-hidden flex items-center justify-center">
                            <Lock className="w-64 h-64 text-blue-600/5 absolute" />
                            <div className="text-center relative z-10 space-y-8">
                                <Gamepad2 className="w-16 h-16 text-blue-500 mx-auto" />
                                <h4 className="text-3xl font-black">純正連動の究極系。</h4>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">OEM Integration</span>
                            <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter">Grgo-1VsⅡ</h3>
                            <p className="text-gray-400 font-bold text-lg leading-relaxed">
                                純正スマートキーのドアロック操作に連動して警戒を開始・解除。
                                セキュリティを意識することなく、いつもの操作でGrgoをコントロールできます。
                                独自の不正アンロック検知機能により、利便性と防犯性能を高次元で両立。
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-6 rounded-3xl bg-blue-600/5 border border-blue-500/10">
                                    <Zap className="w-6 h-6 text-blue-500" />
                                    <span className="text-sm font-black italic">リレーアタック・CANインベーダー対策</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Technical Matrix Table */}
                    <section className="space-y-24 scroll-mt-32" id="matrix">
                        <div className="text-center space-y-6">
                            <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Specifications</span>
                            <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter">VⅡ SERIES MATRIX</h3>
                        </div>

                        <div className="overflow-x-auto pb-8">
                            <div className="min-w-[1000px] bg-[#0c1218] rounded-[3rem] border border-white/5 p-12">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left border-b border-white/10">
                                            <th className="pb-8 text-[11px] font-black tracking-[0.3em] text-gray-500 uppercase">Main Functions</th>
                                            <th className="pb-8 text-center text-blue-500 font-black italic tracking-tighter text-2xl">ZVTⅡ</th>
                                            <th className="pb-8 text-center text-white font-black italic tracking-tighter text-2xl opacity-60">ZVⅡ</th>
                                            <th className="pb-8 text-center text-white font-black italic tracking-tighter text-2xl opacity-60">1VsⅡ</th>
                                            <th className="pb-8 text-center text-white font-black italic tracking-tighter text-2xl opacity-60">5VfⅡ</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { n: "アンサーバックリモコン", zvt: "● (1台付)", zv: "● (1台付)", vs: "-", vf: "OP" },
                                            { n: "1WAYリモコン (5ボタン)", zvt: "● (1台付)", zv: "OP", vs: "-", vf: "● (1台付)" },
                                            { n: "3つの警戒モード", zvt: "●", zv: "●", vs: "●", vf: "●" },
                                            { n: "イモビライザ機能", zvt: "●", zv: "●", vs: "●", vf: "●" },
                                            { n: "ドア / トランク開放検知", zvt: "●", zv: "●", vs: "●", vf: "●" },
                                            { n: "ショックセンサ (強弱)", zvt: "●", zv: "●", vs: "●", vf: "●" },
                                            { n: "トリプルセンサ", zvt: "●", zv: "OP", vs: "OP", vf: "OP" },
                                            { n: "傾斜センサ (2軸)", zvt: "●", zv: "OP", vs: "OP", vf: "OP" },
                                            { n: "不正アンロック検知", zvt: "-", zv: "-", vs: "●", vf: "-" },
                                            { n: "省電力スリープ機能", zvt: "●", zv: "●", vs: "●", vf: "●" },
                                            { n: "消費電流 (警戒中)", zvt: "10.7mA", zv: "8.8mA", vs: "4.0mA", vf: "8.8mA" }
                                        ].map((row, i) => (
                                            <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="py-6 pr-8">
                                                    <div className="text-sm font-black text-gray-200 tracking-tight">{row.n}</div>
                                                </td>
                                                <td className="py-6 text-center text-blue-500 font-bold">{row.zvt}</td>
                                                <td className="py-6 text-center text-gray-500 font-bold">{row.zv}</td>
                                                <td className="py-6 text-center text-gray-500 font-bold">{row.vs}</td>
                                                <td className="py-6 text-center text-gray-500 font-bold">{row.vf}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Legal / Technical Compliance */}
                    <section className="grid lg:grid-cols-2 gap-12">
                        <div className="bg-[#121820] rounded-[4rem] p-16 border border-white/5 space-y-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12">
                                <Signal className="w-12 h-12 text-blue-600/20 group-hover:text-blue-600/40 transition-colors" />
                            </div>
                            <h3 className="text-3xl font-black italic tracking-tighter">法令適合の確かな信頼</h3>
                            <p className="text-gray-400 font-bold leading-relaxed">
                                全てのモデルでVAS・IMBマークを取得。国土交通省が定める厳格な技術基準に適合しており、
                                JAAMA（全国自動車用品工業会）の自主基準登録証が付属します。
                                これは、正規の法規制を遵守した信頼できるセキュリティ製品である証です。
                            </p>
                            <div className="flex gap-4">
                                <div className="px-6 py-3 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">VAS 適合</div>
                                <div className="px-6 py-3 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">IMB 適合</div>
                            </div>
                        </div>
                        <div className="bg-[#0c1412] rounded-[4rem] p-16 border border-white/5 space-y-10">
                            <h3 className="text-3xl font-black italic tracking-tighter text-emerald-500">超省電力設計</h3>
                            <p className="text-gray-400 font-bold leading-relaxed">
                                Grgoは「セキュリティはバッテリーに厳しい」という常識を覆します。
                                待機時電流はわずか2.8mA〜。長期間お車を使用しない際も、バッテリーへの不可を最小限に抑えつつ
                                強固な警戒を継続することが可能です。
                            </p>
                            <div className="grid grid-cols-2 gap-12">
                                <div className="space-y-2">
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Min Consumption</div>
                                    <div className="text-5xl font-black italic tracking-tighter">2.8<span className="text-lg opacity-20 ml-2">mA</span></div>
                                </div>
                                <div className="flex items-center">
                                    <Activity className="w-12 h-12 text-emerald-500/20" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sensor Options List */}
                    <section className="space-y-12">
                        <div className="text-center">
                            <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Customization</span>
                            <h3 className="text-3xl font-black italic tracking-tighter">多彩なオプションで強化する。</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { n: "マイクロ波センサ", d: "車外からの接近を検知", icon: Signal },
                                { n: "傾斜センサ", d: "ジャッキアップを検知", icon: Activity },
                                { n: "IRセンサ", d: "車内への侵入を感知", icon: Eye },
                                { n: "バックアップサイレン", d: "電源切断を検知し発報", icon: Zap },
                                { n: "スタータユニット", d: "リモコンでエンジン始動", icon: Thermometer },
                                { n: "ドラレコ録画連動", d: "衝撃検知時に自動録画", icon: Settings },
                                { n: "ボンネットセンサ", d: "不正な開放を警戒", icon: Shield },
                                { n: "1WAYリモコン追加", d: "利便性を向上するスペア", icon: Smartphone }
                            ].map((opt, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all flex flex-col justify-between">
                                    <opt.icon className="w-8 h-8 text-blue-600 mb-6" />
                                    <div>
                                        <div className="text-sm font-black text-white">{opt.n}</div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{opt.d}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </section>
            </div>

            {/* Bottom Call to Action */}
            <section className="bg-gradient-to-b from-[#05070a] to-[#0c1218] py-48 px-6 text-center border-t border-white/5">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter">YOUR CAR,<br />YOUR ARMOR.</h2>
                    <p className="text-xl text-gray-400 font-bold leading-relaxed">
                        専門用語や複雑な操作を意識することなく、最強のセキュリティをその手に。<br />
                        当店は正規認定店として、最適な施工とアフターサポートをお約束します。
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => navigate('/reservation')}
                            className="group relative bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 rounded-full font-black text-sm tracking-widest transition-all shadow-2xl shadow-blue-600/20 active:scale-95 flex items-center gap-4 shrink-0"
                        >
                            来店予約・お問い合わせ
                            <Smartphone className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a
                            href="https://page.line.me/312qjhsq?openQrModal=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-[#06c755] hover:bg-[#05b34c] text-white px-12 py-6 rounded-full font-black text-sm tracking-widest transition-all shadow-2xl shadow-[#06c755]/20 active:scale-95 flex items-center gap-4 shrink-0"
                        >
                            LINEで無料相談
                            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Sub Footer for Compliance Icons */}
            <footer className="bg-[#05070a] py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 opacity-30">
                    <div className="flex gap-12 items-center">
                        <div className="text-center">
                            <div className="text-[10px] font-black tracking-widest mb-2 uppercase">Compliance</div>
                            <div className="text-2xl font-black italic tracking-tighter">VAS / IMB</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] font-black tracking-widest mb-2 uppercase">Wireless</div>
                            <div className="text-2xl font-black italic tracking-tighter">技適マーク</div>
                        </div>
                    </div>
                    <div className="text-xs font-bold tracking-widest">PURE JAPANESE QUALITY / GRGO SERIES</div>
                </div>
            </footer>
        </div>
    );
};
