import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import {
    ShieldCheck,
    CheckCircle2,
    ArrowLeft,
    X,
    Settings2,
    Zap,
    Info
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

export const GrgoPage: React.FC = () => {
    const { assets } = useSite();
    const { plans } = usePrices();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const categoryId = 'security_grgo';
    const currentCategory = plans.find(p => p.id === categoryId);

    const detail = {
        title: "Grgo VⅡシリーズ",
        subtitle: "日本特有の盗難手口と環境に呼応する、純国産の高精度セキュリティ。",
        description: "ユピテルが誇る純国産ブランド「Grgo（ゴルゴ）」。日本特有の住宅環境や駐車事情に合わせ、きめ細かい感度設定と誤作動の少なさを追求した、国内最高峰の信頼性を誇るセキュリティシステムです。全モデルで共通の高い基本性能を備えつつ、リモコンの仕様や標準装備されるセンサーの数により、お客様のニーズに合わせた4つのラインアップを展開しています。",
        image: "/images/Security/model/grgo.webp",
        specs: { usageStandby: "2.8mA 〜 8.2mA", usageAlert: "4.0mA 〜 10.7mA" }
    };

    const featureTable = [
        { name: "アンサーバックリモコン", zv: "● (1台付)", zvt: "● (1台付)", vs: "-", vf: "OP", desc: "カラー液晶で異常・状態を通知" },
        { name: "1WAYリモコン", zv: "OP", zvt: "● (1台付)", vs: "-", vf: "● (1台付)", desc: "5ボタン単方向リモコン" },
        { name: "警戒モード", zv: "3モード", zvt: "3モード", vs: "3モード", vf: "3モード", desc: "環境に合わせ警戒感度を切替" },
        { name: "センサー感度設定", zv: "●", zvt: "●", vs: "▲", vf: "▲", desc: "32段階設定。▲は施工店用" },
        { name: "イモビライザー機能", zv: "1系統", zvt: "1系統", vs: "1系統", vf: "1系統", desc: "エンジン始動を制限" },
        { name: "ショックセンサー", zv: "●", zvt: "●", vs: "●", vf: "●", desc: "強弱2段階の衝撃を検知" },
        { name: "トリプルセンサー", zv: "OP", zvt: "●", vs: "OP", vf: "OP", desc: "ジャッキアップや接近も検知" },
        { name: "傾斜センサー", zv: "OP", zvt: "●", vs: "OP", vf: "OP", desc: "1度の傾きを検知。盗難対策" },
        { name: "不正アンロック検知", zv: "-", zvt: "-", vs: "●", vf: "-", desc: "純正キー以外での解除を警戒" },
        { name: "MCアダプタⅣ", zv: "OP", zvt: "OP", vs: "● (付属)", vf: "OP", desc: "純正キー連動・リレーアタック対策" },
        { name: "デジタル防衛", zv: "OP", zvt: "OP", vs: "OP", vf: "OP", desc: "CANガード施工で最新手口に対応" },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white pb-24">
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 h-16">
                <button onClick={() => navigate('/security-home')} className="flex items-center gap-2 text-gray-600 font-bold">
                    <ArrowLeft className="w-5 h-5" /> <span className="text-sm uppercase tracking-widest">BACK</span>
                </button>
                <h1 className="font-black text-xl italic tracking-tighter">Grgo VⅡ</h1>
                <button onClick={() => navigate('/reservation')} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-xs">相談予約</button>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden shadow-2xl bg-black mb-20">
                    <SafeImage src={assets.grgoHeroImage || "/images/Security/model/grgo-h.webp"} className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12 text-white">
                        <span className="bg-blue-600 text-[10px] font-black px-4 py-1 rounded-full uppercase mb-6 inline-block">Pure Japanese Quality</span>
                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight mb-8">{detail.subtitle}</h2>
                        <div className="flex gap-4">
                            <a href="#plans" className="bg-blue-600 px-10 py-5 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/30">LINE UP</a>
                            <button onClick={() => navigate('/reservation')} className="bg-white/10 border border-white/20 px-10 py-5 rounded-2xl font-black text-sm">CONTACT</button>
                        </div>
                    </div>
                </div>

                <section className="grid lg:grid-cols-2 gap-12 mb-32 items-center">
                    <div className="space-y-8">
                        <h3 className="text-4xl font-black italic tracking-tighter">THE INTERFACE<span className="text-blue-600">.</span></h3>
                        <p className="text-gray-600 font-bold leading-relaxed">
                            視認性に優れたフルカラー液晶リモコン（ZVⅡ/ZVTⅡ）。異常を音と光、そして画面上のアニメーションで即座に通知します。
                            日本国内の電波法に適合した特定小電力無線を採用し、安定した通信距離と省電力を両立しています。
                        </p>
                        <ul className="space-y-4">
                            {["フルカラー液晶表示", "アンサーバック機能", "特定小電力無線適合", "多彩なステータス表示"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-black text-xs text-gray-900 italic">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-600/10 rounded-[3rem] blur-3xl group-hover:bg-blue-600/20 transition-all" />
                        <div className="relative bg-white rounded-[3rem] p-8 border border-gray-100 shadow-2xl">
                            <SafeImage
                                src="/images/Security/model/grgo-key.webp"
                                className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
                                alt="Grgo Remote"
                            />
                        </div>
                    </div>
                </section>

                <section className="grid lg:grid-cols-2 gap-12 mb-32 items-center">
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute inset-0 bg-blue-600/10 rounded-[3rem] blur-3xl" />
                        <div className="relative bg-white rounded-[3rem] p-8 border border-gray-100 shadow-2xl">
                            <SafeImage
                                src="/images/Security/model/grgo.webp"
                                className="w-full h-auto rounded-2xl"
                                alt="Grgo Main Unit"
                            />
                        </div>
                    </div>
                    <div className="space-y-8 order-1 lg:order-2 lg:pl-12">
                        <h3 className="text-4xl font-black italic tracking-tighter">THE HARDWARE<span className="text-blue-600">.</span></h3>
                        <p className="text-gray-600 font-bold leading-relaxed">
                            日本の過酷な環境（温度変化、湿気、振動）に耐えうる信頼設計。
                            最新の国産車に搭載される複雑な電子制御システムとも、独自の解析技術により高次元で融合します。
                        </p>
                        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                            <div className="flex items-center gap-4 mb-4">
                                <ShieldCheck className="w-6 h-6 text-blue-600" />
                                <span className="font-black text-sm italic">Made in Japan</span>
                            </div>
                            <p className="text-xs text-gray-500 font-bold leading-relaxed">
                                企画・設計から製造までを一貫して日本国内で行う「純国産カーセキュリティ」。
                                日本人ならではの細やかな気配りが、高い信頼性と使いやすさを生んでいます。
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-32">
                    <h3 className="text-4xl font-black italic mb-12 tracking-tighter">VⅡ SERIES MATRIX<span className="text-blue-600">.</span></h3>
                    <div className="overflow-x-auto bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b-2 border-gray-900 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <th className="py-6 text-left">Feature</th>
                                    <th className="py-6 text-center bg-gray-50/50">ZVⅡ</th>
                                    <th className="py-6 text-center bg-gray-50/50">ZVTⅡ</th>
                                    <th className="py-6 text-center bg-gray-50/50">1VsⅡ</th>
                                    <th className="py-6 text-center bg-gray-50/50">5VfⅡ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {featureTable.map((row, i) => (
                                    <tr key={i} className="border-b border-gray-100 group">
                                        <td className="py-6"><div className="font-black text-sm text-gray-900">{row.name}</div><div className="text-[10px] text-gray-400 font-bold">{row.desc}</div></td>
                                        <td className={`text-center font-black ${row.zv.includes('●') ? 'text-blue-600 bg-blue-50/20' : 'text-gray-400'}`}>{row.zv}</td>
                                        <td className={`text-center font-black ${row.zvt.includes('●') ? 'text-blue-600 bg-blue-50/20' : 'text-gray-400'}`}>{row.zvt}</td>
                                        <td className={`text-center font-black ${row.vs.includes('●') ? 'text-blue-600 bg-blue-50/20' : 'text-gray-400'}`}>{row.vs}</td>
                                        <td className={`text-center font-black ${row.vf.includes('●') ? 'text-blue-600 bg-blue-50/20' : 'text-gray-400'}`}>{row.vf}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section id="lineup" className="mb-32">
                    <h3 className="text-4xl font-black italic mb-12 tracking-tighter text-gray-900">LINEUP<span className="text-blue-600">.</span></h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {currentCategory?.items.map((item, i) => (
                            <motion.div
                                key={i}
                                onClick={() => setSelectedItem(item)}
                                className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 relative group cursor-pointer hover:shadow-2xl transition-all overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-blue-600 transition-colors" />
                                <div className="mb-6">
                                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-1 rounded-full uppercase tracking-widest">{item.badge}</span>
                                </div>
                                <h4 className="text-2xl font-black mb-4 text-gray-900 italic tracking-tighter">{item.name}</h4>
                                <div className="text-2xl font-black text-blue-600 mb-8">{formatPrice(item.price)}<span className="text-xs text-gray-400 ml-1 font-bold italic">〜</span></div>
                                <ul className="space-y-3 mb-8">
                                    {(item.features || []).slice(0, 4).map((f: string, j: number) => (
                                        <li key={j} className="flex items-center text-[11px] font-bold text-gray-500">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-black text-gray-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest">
                                    <span>Model Details</span>
                                    <Info className="w-4 h-4" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                        <Zap className="w-8 h-8 text-blue-600 mb-6" />
                        <h4 className="font-black mb-4">消費電流</h4>
                        <div className="text-sm font-bold text-gray-600">待機時: {detail.specs.usageStandby}<br />警戒時: {detail.specs.usageAlert}</div>
                    </div>
                    <div className="md:col-span-2 bg-gray-900 p-8 rounded-[2.5rem] text-white">
                        <ShieldCheck className="w-8 h-8 text-blue-400 mb-6" />
                        <h4 className="font-black mb-4">国内適合基準</h4>
                        <p className="text-xs text-gray-400 leading-relaxed font-bold">国土交通省規定の「盗難発生警報装置技術基準・イモビライザ技術基準(VAS/IMB)」に完全適合。総務省技適マークも取得済みです。</p>
                    </div>
                </section>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div onClick={() => setSelectedItem(null)} className="fixed inset-0 z-[110] bg-gray-950/90 backdrop-blur-md flex items-center justify-center p-4">
                        <motion.div onClick={e => e.stopPropagation()} className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative p-8">
                            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"><X className="w-5 h-5" /></button>
                            <h2 className="text-3xl font-black mb-2 italic tracking-tighter">{selectedItem.name}</h2>
                            <span className="text-blue-600 font-black text-sm mb-8 block">{formatPrice(selectedItem.price)}</span>
                            <p className="text-gray-600 font-bold mb-8 text-sm leading-relaxed">{selectedItem.description}</p>
                            <div className="space-y-3">
                                {selectedItem.features.map((f: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100"><CheckCircle2 className="w-4 h-4 text-blue-600" /><span className="text-xs font-bold text-gray-700">{f}</span></div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
