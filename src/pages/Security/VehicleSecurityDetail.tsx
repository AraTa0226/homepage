import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
    ShieldCheck,
    ShieldAlert,
    AlertTriangle,
    Lock,
    Zap,
    ChevronRight,
    ArrowLeft,
    MessageSquare,
    CheckCircle2,
    HardDrive,
    Eye
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

interface VehicleSecurityDetailProps {
    assets: any;
}

const VehicleSecurityDetail: React.FC<VehicleSecurityDetailProps> = ({ assets }) => {
    const { modelId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [modelId]);

    const [filter, setFilter] = React.useState('all');

    const gx550Plans = [
        {
            id: 1,
            brand: 'Grgo',
            grade: 'ZVT II',
            price: '336,600',
            priceTax: '370,260',
            features: { shock: true, triple: false, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: false, canguard: true },
            category: 'grgo'
        },
        {
            id: 2,
            brand: 'Grgo',
            grade: 'ZVT II + マイクロ波',
            isRecommended: true,
            price: '388,600',
            priceTax: '427,460',
            features: { shock: true, triple: false, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'grgo'
        },
        {
            id: 3,
            brand: 'Panthera',
            grade: 'Z106',
            price: '374,800',
            priceTax: '412,280',
            features: { shock: true, triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 4,
            brand: 'Panthera',
            grade: 'Z106 + マイクロ波',
            price: '426,800',
            priceTax: '469,480',
            features: { shock: true, triple: true, tilt: false, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 5,
            brand: 'Panthera',
            grade: 'Z306',
            price: '396,800',
            priceTax: '436,480',
            features: { shock: true, triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 6,
            brand: 'Panthera',
            grade: 'Z306 + マイクロ波',
            isRecommended: true,
            price: '448,800',
            priceTax: '493,680',
            features: { shock: true, triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true },
            category: 'パンテーラ'
        },
        {
            id: 7,
            brand: 'Panthera',
            grade: 'Z706',
            price: '486,800',
            priceTax: '535,480',
            features: { shock: true, triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true },
            category: 'パンテーラ'
        }
    ];

    const filteredPlans = gx550Plans.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'microwave') return p.features.microwave;
        return p.category === filter;
    });

    if (modelId === 'lexus-gx550') {
        return (
            <div className="min-h-screen bg-neutral-50 font-sans pb-32">
                <header className="bg-[#0b1210] text-white p-6 md:p-10 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 -skew-x-12 translate-x-1/2" />
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="text-xs md:text-sm font-black text-emerald-400 tracking-[0.4em] uppercase mb-3 italic">Lexus Specialist Works</div>
                        <h1 className="text-3xl md:text-6xl font-black tracking-tighter italic leading-none mb-4">
                            LEXUS <span className="text-emerald-500">GX550</span><br />
                            <span className="text-xl md:text-2xl opacity-80 not-italic">SECURITY SELECTION.</span>
                        </h1>
                    </div>
                </header>

                <main className="max-w-6xl mx-auto p-4 md:p-10">
                    {/* Vehicle Hero Image Space */}
                    <div className="relative mb-16 -mt-12 md:-mt-20">
                        <div className="aspect-[21/9] md:aspect-[25/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-3xl bg-neutral-900 border-4 border-white relative group">
                            <SafeImage
                                src="/images/Security/vehicle/gx550.webp"
                                alt="Lexus GX550"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1210]/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                                <div className="flex items-center gap-3 text-white mb-2">
                                    <div className="w-10 h-px bg-emerald-500" />
                                    <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">Visual Identification</span>
                                </div>
                                <h2 className="text-white text-xl md:text-3xl font-black italic tracking-tighter">LEXUS GX550 / 2024-</h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-10">
                        {[
                            { id: 'all', label: 'すべて' },
                            { id: 'grgo', label: 'GRGO' },
                            { id: 'パンテーラ', label: 'パンテーラ' },
                            { id: 'microwave', label: 'マイクロ波あり' }
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => setFilter(t.id)}
                                className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${filter === t.id ? 'bg-white border-gray-100 text-gray-900 shadow-xl' : 'bg-transparent border-gray-200/50 text-gray-400 hover:border-gray-300'}`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-emerald-50 border-2 border-emerald-100 rounded-[2rem] p-8 md:p-10 mb-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Zap className="w-20 h-20 text-emerald-600" />
                        </div>
                        <h4 className="text-emerald-950 text-base font-black mb-4 flex items-center gap-2">
                            <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded shadow-sm italic uppercase tracking-tighter">ANG Original Plan</span>
                            純正の利便性と最新手口に対応したユニットを追加したプランです
                        </h4>
                        <p className="text-base text-emerald-900 font-medium leading-relaxed max-w-4xl relative z-10">
                            掲載のプランはすべて、メーカーのベースユニットに「スマートキー連動ユニット」と「CANインベーダー対策ユニット」を当店独自のノウハウで融合させたオリジナルパッケージです。<br />
                            <span className="text-sm mt-2 block opacity-80 font-bold">
                                ※表の中で不足しているセンサーやサイレン等の項目も、ご要望に応じて<span className="text-emerald-950 decoration-2 underline underline-offset-4">オプションで自由に追加可能</span>です。
                            </span>
                        </p>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 mb-6">
                        {/* Mobile View: Card Stack */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {filteredPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`p-6 ${plan.isRecommended ? 'bg-emerald-50/30' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">{plan.brand}</span>
                                                {plan.isRecommended && (
                                                    <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">おすすめ</span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 tracking-tight">{plan.grade}</h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-black tracking-tighter text-gray-900">¥{plan.price}</div>
                                            <div className="text-xs font-bold text-gray-400">(税込¥{plan.priceTax})</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-2 mb-6">
                                        {[
                                            { label: '衝撃', val: plan.features.shock },
                                            { label: 'トリプル', val: plan.features.triple },
                                            { label: '傾斜', val: plan.features.tilt },
                                            { label: 'アルゴリズム', val: plan.features.algorithm },
                                            { label: 'ボンネット', val: plan.features.bonnet },
                                            { label: 'マイクロ波', val: plan.features.microwave },
                                            { label: 'サイレン', val: plan.features.siren },
                                            { label: 'CANガード', val: plan.features.canguard }
                                        ].map((f, i) => (
                                            <div key={i} className={`flex flex-col items-center p-3 rounded-xl border ${f.val ? 'bg-white border-emerald-100 shadow-sm' : 'bg-gray-50/50 border-gray-100 opacity-30'}`}>
                                                {f.val ? (
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-1" />
                                                ) : (
                                                    <div className="w-5 h-5 mb-1" />
                                                )}
                                                <span className={`text-[10px] font-black leading-none text-center h-4 flex items-center ${f.val ? 'text-gray-900' : 'text-gray-400'}`}>{f.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full py-4 rounded-2xl bg-[#0b1210] text-emerald-400 text-xs font-black shadow-xl shadow-gray-200 flex items-center justify-center gap-2">
                                        <span>プラン詳細</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Desktop View: Comparison Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[1050px]">
                                <thead>
                                    <tr className="bg-[#0b1210] text-emerald-400/80 text-xs font-black uppercase tracking-widest">
                                        <th className="px-8 py-6">モデル</th>
                                        <th className="px-6 py-6">グレード</th>
                                        <th className="px-6 py-6 text-right">施工価格 (税込)</th>
                                        <th className="px-4 py-6 text-center">衝撃</th>
                                        <th className="px-4 py-6 text-center">トリプル</th>
                                        <th className="px-4 py-6 text-center">傾斜</th>
                                        <th className="px-4 py-6 text-center text-[10px] leading-tight">アルゴリズム<br />機能</th>
                                        <th className="px-4 py-6 text-center">ボンネット</th>
                                        <th className="px-4 py-6 text-center">マイクロ波</th>
                                        <th className="px-4 py-6 text-center text-[10px] leading-tight">バックアップ<br />サイレン</th>
                                        <th className="px-4 py-6 text-center">CAN<br />ガード</th>
                                        <th className="px-8 py-6 text-center"> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPlans.map((plan) => (
                                        <tr
                                            key={plan.id}
                                            className={`transition-colors border-b border-gray-50 ${plan.isRecommended ? 'bg-emerald-50/40' : 'hover:bg-gray-50/50'}`}
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className={`text-base font-black ${plan.isRecommended ? 'text-gray-900' : 'text-gray-400'}`}>
                                                        {plan.brand}
                                                    </span>
                                                    {plan.isRecommended && (
                                                        <span className="inline-flex mt-1 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full w-fit">
                                                            おすすめ
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <span className="bg-gray-800 text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-wider whitespace-nowrap inline-block">
                                                    {plan.grade}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <div className="flex flex-col">
                                                    <span className="text-xl font-black tracking-tighter text-gray-900">
                                                        ¥{plan.price}
                                                    </span>
                                                    <span className="text-xs font-bold text-gray-400 mt-0.5">
                                                        (税込¥{plan.priceTax})
                                                    </span>
                                                </div>
                                            </td>
                                            {[
                                                plan.features.shock,
                                                plan.features.triple,
                                                plan.features.tilt,
                                                plan.features.algorithm,
                                                plan.features.bonnet,
                                                plan.features.microwave,
                                                plan.features.siren,
                                                plan.features.canguard
                                            ].map((f, i) => (
                                                <td key={i} className="px-4 py-6 text-center">
                                                    {f ? (
                                                        <div className="inline-flex items-center justify-center w-6 h-6 text-emerald-500 font-bold">
                                                            {i === 1 || i === 3 ? (
                                                                <CheckCircle2 className="w-5 h-5 shadow-emerald-400 fill-emerald-500 text-emerald-950" />
                                                            ) : (
                                                                <CheckCircle2 className="w-5 h-5 opacity-40 shadow-emerald-200" />
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-200">―</span>
                                                    )}
                                                </td>
                                            ))}
                                            <td className="px-8 py-6 text-center">
                                                <button className="px-5 py-2 rounded-xl border border-emerald-500/30 text-emerald-600 text-[11px] font-black hover:bg-emerald-500 hover:text-white transition-all">
                                                    詳細
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>



                    <section className="mt-20 border-t border-gray-100 pt-16">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                            <h2 className="text-2xl font-black tracking-tight text-gray-900 italic">選定の決め手：GRGO vs PANTHERA</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-24 h-24 text-gray-900" />
                                </div>
                                <div className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase mb-6 italic">The Standard</div>
                                <h3 className="text-2xl font-black mb-8 text-gray-900 tracking-tighter">Grgo：完成された定番</h3>
                                <div className="space-y-6">
                                    <p className="text-lg text-gray-900 font-black leading-relaxed">
                                        Pantheraが“最高峰”なら、<br />
                                        Grgoは“完成された定番”。
                                    </p>
                                    <p className="text-base text-gray-600 font-medium leading-relaxed">
                                        派手な機能より、確かな安心。<br />
                                        必要な防犯性能をしっかり備え、日常で使いやすく、誤報を抑えた実用性。
                                    </p>
                                    <p className="text-base text-gray-600 font-medium leading-relaxed">
                                        多くのお客様に選ばれ続けてきた理由は、そのバランスの良さにあります。
                                    </p>
                                    <p className="text-base text-gray-900 font-black border-l-4 border-emerald-500 pl-4 py-1">
                                        守るべきものに、ちょうどいい安心を。<br />
                                        それが Grgo という選択です。
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#0b1210] p-8 md:p-12 rounded-[3rem] shadow-xl border border-white/5 relative overflow-hidden group hover:shadow-2xl transition-all">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                    <ShieldAlert className="w-24 h-24 text-emerald-400" />
                                </div>
                                <div className="text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase mb-6 italic">The Masterpiece</div>
                                <h3 className="text-2xl font-black mb-8 text-white tracking-tighter">Panthera：妥協しない人のための、最高峰。</h3>
                                <div className="space-y-6 text-white/90">
                                    <p className="text-lg font-black leading-relaxed text-emerald-400">
                                        ユピテル最高峰のカーセキュリティ。<br />
                                        狙われる車には、それに見合う対策が必要です。
                                    </p>
                                    <p className="text-base font-medium leading-relaxed text-gray-300">
                                        32段階の細かな感度調整により、<br />
                                        強く守りながら誤報を極限まで抑える。
                                    </p>
                                    <p className="text-base font-medium leading-relaxed text-gray-300">
                                        車種、駐車環境、使い方まで考え抜き、一台ごとに最適化して仕上げるフルオーダー型セキュリティ。
                                    </p>
                                    <p className="text-base font-black border-l-4 border-emerald-500 pl-4 py-1">
                                        守るために、妥協しない。<br />
                                        それが Panthera です。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 border-2 border-orange-100 p-8 rounded-[2rem] text-center italic">
                            <h4 className="text-orange-950 text-base font-black mb-2 tracking-tight">結論：GX550オーナー様へのアドバイス</h4>
                            <p className="text-sm text-orange-800 font-bold leading-relaxed max-w-3xl mx-auto">
                                普段使いのスマートさを重視するなら<span className="text-orange-950 font-black decoration-2 underline underline-offset-4">GRGO プレミアム</span>、<br className="hidden md:block" />
                                資産価値を守る「究極の安心」を求めるなら<span className="text-orange-950 font-black decoration-2 underline underline-offset-4">PANTHERA Z306＋以上</span>を強く推奨いたします。
                            </p>
                        </div>
                    </section>
                </main>

                <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#0c1311] border-t border-white/5 p-5 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
                    <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
                        <div className="hidden md:block">
                            <div className="text-emerald-500 text-xs font-black tracking-widest mb-1 italic">迷ったらご相談ください</div>
                            <div className="text-white text-xl font-black tracking-tight underline transition-all underline-offset-4 decoration-emerald-500/50">
                                無料相談・お見積もり
                            </div>
                        </div>
                        <a
                            href="https://page.line.me/312qjhsq?openQrModal=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-grow md:flex-grow-0 bg-emerald-500 hover:bg-emerald-400 text-[#0c1311] px-10 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20"
                        >
                            <span>LINE相談</span>
                            <ChevronRight className="w-4 h-4 stroke-[3]" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Default view for other models
    const vehicleData: Record<string, any> = {
        'toyota-landcruiser-300': {
            name: 'ランドクルーザー 300',
            brand: 'TOYOTA',
            description: '日本で最も盗難リスクが高い車両の一つ。物理的なガードと最新のデジタルセキュリティを組み合わせた「多重防御」が標準的な施工となります。',
            risks: ['CANインベーダー（最重要対策）', '指紋認証バイパス', '物理的な破壊行為'],
            solutions: [
                { name: 'Grgo V-Series', desc: '日本の駐車環境に最適化された高精度センサー' },
                { name: 'IGLA ALARM', desc: 'デジタルブロックとサイレン警報のハイブリッド' },
                { name: 'TOR アナログブロック', desc: 'デジタルだけでなく物理遮断も組み合わせた究極の対策' }
            ],
            image: assets.securityMenuImage,
            color: 'bg-blue-600'
        }
    };

    const data = vehicleData[modelId || ''] || {
        name: modelId?.replace(/-/g, ' ').toUpperCase() || 'Unknown Model',
        brand: 'SPECIALIST',
        description: 'こちらの車種についても、AUTO SECURITY ANGでは高度な解析に基づいた最適なセキュリティプランをご提案可能です。詳細はお問い合わせください。',
        risks: ['CANインベーダー', 'リレーアタック', 'コードグラバー'],
        solutions: [
            { name: 'Full Digital Guard', desc: '最新のデジタルセキュリティパッケージ' },
            { name: 'Analog Cut System', desc: '物理的な回路遮断によるエンジン停止' }
        ],
        image: assets.workspaceImage,
        color: 'bg-gray-700'
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/security-home')}
                        className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-bold text-sm">SECURITY TOP</span>
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black tracking-widest text-gray-300 uppercase hidden sm:block">Vehicle Specific Protection</span>
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black italic">S</div>
                    </div>
                </div>
            </header>

            <main className="pt-20 md:pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[10px] font-black tracking-widest uppercase">{data.brand} SPECIALIST</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-gray-900 leading-none">
                                {data.name} <br />
                                <span className="text-emerald-500 italic block mt-2 font-serif font-black underline decoration-2 underline-offset-8">SECURITY.</span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                {data.description}
                            </p>
                            <div className="pt-4 flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-2xl shadow-gray-200 flex items-center gap-3 hover:bg-emerald-600 transition-all hover:scale-105">
                                    <MessageSquare className="w-5 h-5" />
                                    <span>無料パッケージ相談</span>
                                </button>
                                <button className="px-8 py-4 bg-white text-gray-900 border border-gray-100 rounded-2xl font-black shadow-lg flex items-center gap-3 hover:border-emerald-600 transition-all">
                                    <Zap className="w-5 h-5 text-emerald-500" />
                                    <span>施工価格・プラン確認</span>
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="aspect-[16/10] rounded-[3rem] overflow-hidden shadow-3xl bg-gray-200">
                                <SafeImage
                                    src={data.image}
                                    alt={data.name}
                                    className="w-full h-full object-cover transition-transform duration-[20s] hover:scale-110"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-emerald-50/50 flex flex-col gap-1 max-w-[200px]">
                                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Target Risk</span>
                                <span className="text-2xl font-black text-red-500">Tier 1 Extreme</span>
                                <div className="w-full h-1 bg-red-100 rounded-full overflow-hidden mt-2">
                                    <div className="w-full h-full bg-red-500" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <section className="mb-32">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter">THREAT ANALYSIS</h2>
                            <div className="h-px flex-grow bg-gray-200" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {data.risks.map((risk: string, i: number) => (
                                <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                                        <AlertTriangle className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-black mb-3">{risk}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        近年の窃盗グループが最初に使用する最新の手口です。高度なデジタル機器により、わずか数分でエンジン始動を許してしまいます。
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-32">
                        <div className="bg-gray-900 rounded-[3rem] p-8 md:p-20 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 skew-x-12 translate-x-1/2" />

                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-16">
                                <div className="lg:col-span-1">
                                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic">
                                        OUR <span className="text-emerald-500">BEST</span> <br /> SOLUTIONS.
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed mb-8">
                                        車種の特性とお客様の駐車環境に合わせて、最適な「多重防御」システムを構築します。
                                    </p>
                                    <div className="space-y-4">
                                        {['24時間365日の監視', '誤報ゼロの調整技術', '最新のデジタル・ロック'].map((t, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-300">{t}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.solutions.map((sol: any, i: number) => (
                                        <div key={i} className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 flex flex-col justify-between group hover:bg-white/10 transition-all">
                                            <div>
                                                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center mb-6">
                                                    <Lock className="w-5 h-5 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-black mb-2">{sol.name}</h3>
                                                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                                    {sol.desc}
                                                </p>
                                            </div>
                                            <button className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm group-hover:gap-4 transition-all">
                                                <span>詳細・スペックを見る</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                        {[
                            { icon: Eye, title: '24/7 Monitoring', desc: '最新ドラレコと連動し証拠を鮮明に記録' },
                            { icon: Zap, title: 'Digital Block', desc: 'CAN通信を解析し不正な始動を阻止' },
                            { icon: HardDrive, title: 'Internal Backup', desc: 'バッテリー切断後も警報を継続' },
                            { icon: ShieldCheck, title: 'Lifetime Support', desc: '施工後の点検・アップデートも万全' }
                        ].map((f, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6">
                                <div className="w-16 h-16 rounded-23 bg-white shadow-xl flex items-center justify-center text-emerald-600 mb-6">
                                    <f.icon className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-black mb-2 uppercase italic tracking-tighter">{f.title}</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:hidden">
                <div className="grid grid-cols-2 gap-4">
                    <button className="py-4 bg-[#06C755] text-white rounded-2xl font-black text-sm">LINE相談</button>
                    <button className="py-4 bg-gray-900 text-white rounded-2xl font-black text-sm">予約・見積</button>
                </div>
            </div>
        </div>
    );
};

export default VehicleSecurityDetail;
