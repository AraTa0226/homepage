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
    Check,
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

    // 車種別設定データ
    const vehicleConfigs: Record<string, any> = {
        'lexus-gx550': {
            name: 'LEXUS GX550',
            year: '2024-',
            image: '/images/Security/vehicle/gx.webp',
            description: '最新鋭のオフローダー。CANインベーダーやゲームボーイといった最新手口への完全対策が必須です。'
        },
        'lexus-lx': {
            name: 'LEXUS LX600',
            year: '2022-',
            image: '/images/Security/vehicle/lx.webp',
            description: 'レクサスのフラッグシップSUV。最も狙われやすい一台であり、最高峰のPantheraでの対策が推奨されます。'
        },
        'lexus-rx': {
            name: 'LEXUS RX',
            year: '2022-',
            image: '/images/Security/vehicle/rx.webp',
            description: '高い人気を誇るラグジュアリーSUV。スマートキー連動と最新ユニットの組み合わせで死角なく守ります。'
        },
        'lexus-nx': {
            name: 'LEXUS NX',
            year: '2021-',
            image: '/images/Security/vehicle/nx.webp',
            description: '都会派SUVとして高い支持。利便性を損なわず、かつ強力な防犯性能を両立させます。'
        },
        'lexus-lbx': {
            name: 'LEXUS LBX',
            year: '2023-',
            image: '/images/Security/vehicle/lbx.webp',
            description: '「高級車の概念を変える」コンパクトSUV。小型車ながら狙われやすいため、確実なデジタル対策が必要です。'
        },
        'lexus-lm': {
            name: 'LEXUS LM',
            year: '2023-',
            image: '/images/Security/vehicle/lx.webp', // 仮
            description: '究極の移動空間。その価値に見合う、隙のないセキュリティ構築をご提案します。'
        }
    };

    // 現在の車種設定を取得（見つからない場合はGX550をデフォルトに）
    const currentVehicle = vehicleConfigs[modelId || 'lexus-gx550'] || vehicleConfigs['lexus-gx550'];

    const basePlans = [
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

    const filteredPlans = basePlans.filter(p => {
        if (filter === 'all') return true;
        if (filter === 'microwave') return p.features.microwave;
        return p.category === filter;
    });

    return (
        <div className="min-h-screen bg-neutral-50 font-sans pb-32">
            <header className="bg-[#0b1210] text-white p-6 md:p-10 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 -skew-x-12 translate-x-1/2" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-xs md:text-sm font-black text-emerald-400 tracking-[0.4em] uppercase mb-3 italic">Lexus Specialist Works</div>
                    <h1 className="text-3xl md:text-6xl font-black tracking-tighter italic leading-none mb-4 uppercase">
                        {currentVehicle.name.split(' ')[0]} <span className="text-emerald-500">{currentVehicle.name.split(' ')[1]}</span><br />
                        <span className="text-xl md:text-2xl opacity-80 not-italic">SECURITY SELECTION.</span>
                    </h1>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 md:p-10">
                {/* Vehicle Hero Image Space */}
                <div className="relative mb-16 -mt-12 md:-mt-20">
                    <div className="aspect-[21/9] md:aspect-[25/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-3xl bg-[#0b1210] border-4 border-white relative group">
                        <SafeImage
                            src={currentVehicle.image}
                            alt={currentVehicle.name}
                            className="w-full h-full object-contain p-4 md:p-8 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1210]/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                            <div className="flex items-center gap-3 text-white mb-2">
                                <div className="w-10 h-px bg-emerald-500" />
                                <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">Visual Identification</span>
                            </div>
                            <h2 className="text-white text-xl md:text-3xl font-black italic tracking-tighter uppercase">{currentVehicle.name} / {currentVehicle.year}</h2>
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
                        {currentVehicle.name}の特性に合わせた「多重防御」パッケージです
                    </h4>
                    <p className="text-base text-emerald-900 font-medium leading-relaxed max-w-4xl relative z-10">
                        {currentVehicle.description}<br />
                        <span className="text-sm mt-3 block opacity-80 font-bold">
                            ※表の中で不足しているセンサーやサイレン等の項目も、ご要望に応じて<span className="text-emerald-950 decoration-2 underline underline-offset-4">オプションで自由に追加可能</span>です。
                        </span>
                    </p>
                </div>

                <div className="bg-white md:bg-transparent rounded-[2rem] md:rounded-none shadow-2xl md:shadow-none overflow-hidden border border-gray-100 md:border-none mb-6">
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
                                                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-1 shadow-sm">
                                                    <Check className="w-3.5 h-3.5 stroke-[4]" />
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 mb-1" />
                                            )}
                                            <span className={`text-[10px] font-black leading-none text-center h-4 flex items-center ${f.val ? 'text-gray-900' : 'text-gray-400'}`}>{f.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => navigate('/contact')}
                                    className="w-full py-4 rounded-2xl bg-[#0b1210] text-emerald-400 text-xs font-black shadow-xl shadow-gray-200 flex items-center justify-center gap-2 hover:bg-black transition-colors"
                                >
                                    <span>プラン詳細・お見積もり</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View: Transposed Comparison Matrix */}
                    <div className="hidden md:block overflow-hidden bg-white rounded-[3rem] shadow-2xl border border-gray-100 mb-16">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead>
                                <tr className="bg-[#0b1210]">
                                    <th className="w-[18%] px-8 py-10 text-emerald-400 text-xs font-black uppercase tracking-widest border-b border-emerald-500/20">比較項目</th>
                                    {filteredPlans.map((plan) => (
                                        <th key={plan.id} className={`px-2 py-10 text-center border-b border-emerald-500/20 ${plan.isRecommended ? 'bg-emerald-900/20 relative' : ''}`}>
                                            {plan.isRecommended && (
                                                <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-[#0b1210] text-[9px] font-black py-1 uppercase tracking-tighter shadow-sm">おすすめ</div>
                                            )}
                                            <div className="text-emerald-500 text-[9px] font-black mb-2 italic tracking-widest">{plan.brand}</div>
                                            <div className="text-white text-[13px] font-black leading-tight h-12 flex items-center justify-center italic">{plan.grade}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-gray-900 font-medium">
                                {/* Price Row */}
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <td className="px-8 py-8 font-black text-xs text-gray-700 uppercase tracking-wider bg-gray-200/20">施工価格 <span className="text-[10px] opacity-60">(税込)</span></td>
                                    {filteredPlans.map((plan) => (
                                        <td key={plan.id} className={`px-2 py-8 text-center ${plan.isRecommended ? 'bg-emerald-50/50' : ''}`}>
                                            <div className="text-xl font-black tracking-tighter text-gray-950">¥{plan.price}</div>
                                            <div className="text-[11px] font-bold text-gray-400 mt-1"> (税込¥{plan.priceTax})</div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Feature Rows */}
                                {[
                                    { key: 'shock' as const, label: '衝撃センサー' },
                                    { key: 'triple' as const, label: 'トリプルセンサー' },
                                    { key: 'tilt' as const, label: '傾斜センサー' },
                                    { key: 'algorithm' as const, label: 'アルゴリズム機能', isEmerald: true },
                                    { key: 'bonnet' as const, label: 'ボンネットピン' },
                                    { key: 'microwave' as const, label: 'マイクロ波センサー' },
                                    { key: 'siren' as const, label: 'バックアップサイレン' },
                                    { key: 'canguard' as const, label: 'CANガード', isEmerald: true },
                                ].map((feature, idx) => (
                                    <tr key={feature.key} className={`border-b border-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                        <td className={`px-8 py-6 text-xs font-black tracking-widest ${feature.isEmerald ? 'text-emerald-600' : 'text-gray-500'} bg-gray-50/50 whitespace-nowrap`}>
                                            {feature.label}
                                        </td>
                                        {filteredPlans.map((plan) => (
                                            <td key={plan.id} className={`px-2 py-6 text-center ${plan.isRecommended ? 'bg-emerald-50/30' : ''}`}>
                                                {plan.features[feature.key] ? (
                                                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-75">
                                                        <Check className="w-4 h-4 stroke-[4]" />
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-200 text-xs">—</span>
                                                )}
                                            </td>
                                        ))}
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
                        <h4 className="text-orange-950 text-base font-black mb-2 tracking-tight uppercase">結論：{currentVehicle.name}オーナー様へのアドバイス</h4>
                        <p className="text-sm text-orange-800 font-bold leading-relaxed max-w-3xl mx-auto">
                            普段使いのスマートさを重視するなら<span className="text-orange-950 font-black decoration-2 underline underline-offset-4">GRGO プレミアム</span>、<br className="hidden md:block" />
                            資産価値を守る「究極の安心」を求めるなら<span className="text-orange-950 font-black decoration-2 underline underline-offset-4">PANTHERA Z306＋以上</span>を推奨いたします。
                        </p>
                    </div>
                </section>
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#0c1311] border-t border-white/5 p-5 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
                    <div className="hidden md:block">
                        <div className="text-emerald-500 text-xs font-black tracking-widest mb-1 italic uppercase">{currentVehicle.name}を最先端の手口から守る</div>
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
                        <span>LINEで相談する</span>
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VehicleSecurityDetail;
