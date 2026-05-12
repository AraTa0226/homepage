import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { usePrices } from '../../contexts/PriceContext';
import {
    ShieldCheck,
    ShieldAlert,
    AlertTriangle,
    Lock,
    Zap,
    ChevronRight,
    ArrowLeft,
    MessageSquare,
    Mail,
    Check,
    HardDrive,
    Eye,
    HelpCircle,
    Monitor,
    Award
} from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';

interface VehicleSecurityDetailProps {
    assets: any;
}

const VehicleSecurityDetail: React.FC<VehicleSecurityDetailProps> = ({ assets }) => {
    const { modelId } = useParams();
    const navigate = useNavigate();
    const { securityData, plans } = usePrices();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [modelId]);

    const [filter, setFilter] = React.useState('all');

    const vehicleConfigs = securityData.vehicles || {};
    const currentModelId = modelId || 'lexus-gx550';
    const currentVehicle = vehicleConfigs[currentModelId] || vehicleConfigs['lexus-gx550'] || { name: 'Unknown', image: '', description: '', plans: [] };
    const basePlans = vehicleConfigs.basePlans || [];

    // 1. Prioritize individual vehicle plans from Admin Dashboard
    let rawPlans = [];
    let showV2 = currentVehicle?.showV2Option ?? true;

    if (currentVehicle?.plans && currentVehicle.plans.length > 0) {
        rawPlans = currentVehicle.plans.map((p: any) => {
            const basePrice = parseInt((p.price || '0').replace(/,/g, ''), 10);
            const taxPrice = Math.floor(basePrice * 1.1);
            return {
                ...p,
                priceTax: isNaN(taxPrice) ? '0' : taxPrice.toLocaleString(),
                // Ensure features object exists
                features: p.features || {}
            };
        });
    } else {
        // 2. Fallback to legacy/global plans if no vehicle-specific plans are set
        rawPlans = basePlans || [];
        try {
            if (plans && plans.length > 0) {
                const idMapping: Record<string, string> = {
                    'toyota-landcruiser-300': 'land_cruiser_300',
                    'toyota-landcruiser-250': 'land_cruiser_250',
                    'toyota-landcruiser-prado-150-200': 'land_cruiser_prado',
                    'toyota-landcruiser-70': 'land_cruiser_70',
                    'toyota-alphard-vellfire': 'alphard_40',
                    'lexus-lx': 'lexus_lx',
                    'lexus-rx': 'lexus_rx',
                    'lexus-nx': 'lexus_nx',
                    'lexus-gx550': 'lexus_gx550',
                    'lexus-lbx': 'lexus_lbx',
                    'lexus-lm': 'lexus_lx',
                    'toyota-harrier': 'harrier_80',
                    'honda-civic-typer': 'civic_fl5',
                    'suzuki-jimny': 'jimny_jb64',
                    'toyota-hiace': 'hiace_200_full',
                    'toyota-prius': 'prius_60',
                    'toyota-crown': 'crown_2024',
                    'kcar-special': 'kcar_special',
                };
                const cmsId = idMapping[currentModelId] || currentModelId.replace(/-/g, '_');
                const cmsPlan = plans.find(p => p.id === cmsId);
                
                if (cmsPlan) {
                    showV2 = cmsPlan.showV2Option ?? true;
                    if (cmsPlan.items && cmsPlan.items.length > 0) {
                        rawPlans = cmsPlan.items.map((item: any, idx: number) => {
                            const basePrice = parseInt((item.price || '0').replace(/,/g, ''), 10);
                            const taxPrice = Math.floor(basePrice * 1.1);
                            return {
                                id: `cms-${idx}`,
                                brand: (item.name || '').split(/[\s　]/)[0] || 'Unknown',
                                grade: item.name || '',
                                price: item.price || '0',
                                priceTax: taxPrice.toLocaleString(),
                                description: item.description || '',
                                badge: item.badge || '',
                                image: item.image || '',
                                isRecommended: !!(item.badge && (item.badge === 'おすすめ' || item.badge === '推奨構成')),
                                category: (item.name || '').toLowerCase().includes('grgo') ? 'grgo' : 'パンテーラ',
                                features: {
                                    triple: item.triple ?? false,
                                    tilt: item.tilt ?? false,
                                    bonnet: item.bonnet ?? false,
                                    microwave: item.microwave ?? false,
                                    siren: item.siren ?? false,
                                    algorithm: item.algorithm ?? false,
                                    canguard: item.canguard ?? false,
                                    keyless: item.keyless ?? false,
                                }
                            };
                        });
                    }
                }
            }
        } catch (e) {
            console.error("CMS Data Error:", e);
        }
    }

    const filteredPlans = rawPlans.filter((p: any) => {
        if (!p) return false;
        if (filter === 'all') return true;
        if (filter === 'microwave') return p.features?.microwave;
        const categoryMatch = p.category && p.category.includes(filter);
        const brandMatch = p.brand && p.brand.toLowerCase().includes(filter.toLowerCase());
        return categoryMatch || brandMatch;
    });

    // Update Document Title for SEO
    useEffect(() => {
        if (currentVehicle) {
            document.title = `${currentVehicle.name}の盗難対策プラン | 福岡市・大野城のANG`;

            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', `${currentVehicle.name}専用のカーセキュリティプラン。最新のCANインベーダーやリレーアタック対策に。福岡市内・大野城市のANGは、佐賀・熊本など九州各県からの施工依頼も多数受けている専門店です。`);
            }
        }
    }, [currentVehicle]);

    // アナログキー（非スマートキー）車両かどうかの判定
    const isAnalogKey = modelId === 'toyota-landcruiser-70';
    const isSpecialModel = modelId === 'special-model';

    const templates = (securityData as any).featuredPlanTemplates || [];
    const activeTemplate = templates.find((t: any) => t.id === currentVehicle.featuredPlanId);

    // Get Feature Set Template
    const featureSets = (securityData as any).featureSetTemplates || [];
    const activeFeatureSet = featureSets.find((fs: any) => fs.id === currentVehicle.featureSetId);

    return (
        <div className="min-h-screen bg-neutral-50 font-sans pb-32">
            <header className="bg-[#0b1210] text-white p-6 md:p-10 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 -skew-x-12 translate-x-1/2" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-xs md:text-sm font-black text-emerald-400 tracking-[0.4em] uppercase mb-3 italic">
                        {currentVehicle.name.includes('LEXUS') ? 'Lexus' : 'Toyota'} Specialist Works
                    </div>
                    <h1 className="text-3xl md:text-6xl font-black tracking-tighter italic leading-none mb-4 uppercase">
                        {currentVehicle.name.split(' ').length > 2
                            ? <>{currentVehicle.name.split(' ')[0]} <span className="text-emerald-500">{currentVehicle.name.split(' ').slice(1).join(' ')}</span></>
                            : <>{currentVehicle.name.split(' ')[0]} <span className="text-emerald-500">{currentVehicle.name.split(' ')[1]}</span></>
                        }
                        <br />
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
                            className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ${currentVehicle.name.includes('Land Cruiser') ? 'p-1 md:p-2' : 'p-4 md:p-8'
                                }`}
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

                {/* Main Content Area: Conditional Rendering */}
                {isSpecialModel ? (
                    <div className="flex flex-col gap-12">
                        {/* Custom Consultation Section */}
                        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-emerald-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 opacity-40 rounded-full -mr-32 -mt-32 blur-3xl" />

                            <div className="max-w-4xl mx-auto relative z-10">
                                <div className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-xs font-black tracking-widest uppercase mb-6 italic">
                                        <MessageSquare className="w-4 h-4" /> Customized Consulting
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-slate-900 mb-6 uppercase">
                                        リストにない車種こそ、<br className="md:hidden" />
                                        <span className="text-emerald-600">対話から始まる防犯</span>を。
                                    </h2>
                                    <p className="text-slate-500 font-bold leading-relaxed max-w-2xl mx-auto">
                                        輸入車、旧車、そして最新の電気自動車まで。構造が複雑な車両や、前例の少ないお車ほど、画一的なプランではなく、一台一台の状態に合わせた緻密な設計が必要です。
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                                    {[
                                        {
                                            step: '01',
                                            title: 'Hearing',
                                            text: 'お客様の駐車環境、使用頻度、過去の不安な経験を細かくお伺いします。',
                                            icon: ShieldCheck
                                        },
                                        {
                                            step: '02',
                                            title: 'Diagnosis',
                                            text: '実際にお車を確認し、構造や電気系統、既存のシステムをプロの目で解析します。',
                                            icon: Zap
                                        },
                                        {
                                            step: '03',
                                            title: 'Design',
                                            text: '世界に一台、そのお車とお客様のためだけの最強防犯パッケージを設計します。',
                                            icon: ShieldAlert
                                        }
                                    ].map((item, idx) => (
                                        <div key={idx} className="relative group">
                                            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 transition-all duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-1">
                                                <div className="text-[40px] font-black text-emerald-500/20 italic absolute top-4 right-6 leading-none">{item.step}</div>
                                                <item.icon className="w-10 h-10 text-emerald-600 mb-6 group-hover:scale-110 transition-transform" />
                                                <h4 className="text-lg font-black italic text-slate-800 mb-3 uppercase tracking-tighter">{item.title}</h4>
                                                <p className="text-xs text-slate-500 font-medium leading-loose">{item.text}</p>
                                            </div>
                                            {idx < 2 && (
                                                <div className="hidden md:block absolute top-1/2 -right-4 translate-y-[-50%] z-20">
                                                    <ChevronRight className="w-8 h-8 text-emerald-200" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-[#0b1210] rounded-[2.5rem] p-10 text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <h3 className="text-white text-xl md:text-2xl font-black italic mb-2 tracking-tight">まずは、愛車とお越しください。</h3>
                                    <p className="text-emerald-400/80 text-sm font-bold italic">私たちは、お車に触れることから「本当の守り」を始めます。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-4 mb-10 justify-center">
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

                        {/* Unified Premium Info Card - Platinum Emerald Re-design */}
                        <div className="mb-10 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-[2rem] p-8 md:p-12 text-slate-900 relative overflow-hidden shadow-2xl border border-emerald-200/40">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full -mr-64 -mt-64 blur-3xl" />

                            <div className="flex flex-col gap-10 relative z-10">
                                {/* Top: Package Title (Dynamic) */}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/30 text-white">
                                            <ShieldCheck className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-black tracking-tight italic uppercase text-slate-800 leading-none">
                                                {activeTemplate ? activeTemplate.title : (
                                                    <>エナジー <span className="text-emerald-600 font-black ml-1">{isAnalogKey ? 'ランクル70専用 セキュリティ対策パッケージ' : 'CANインベーダー対策パッケージ'}</span></>
                                                )}
                                            </h3>
                                            <div className="h-1 w-20 bg-emerald-500/20 mt-2 rounded-full" />
                                        </div>
                                    </div>
                                    <p className="text-base md:text-lg text-slate-600 font-bold leading-relaxed mb-6 italic tracking-tight">
                                        {activeTemplate ? activeTemplate.description : (
                                            <>
                                                {isAnalogKey
                                                    ? '長年の実績に基づく、伝統的な物理防御と最新システムの融合プラン。'
                                                    : '豊富な施工経験から最新の盗難手口に対応させた独自プラン。'}
                                                <span className="text-slate-900 block md:inline font-black ml-0 md:ml-1 underline decoration-emerald-300 decoration-4 underline-offset-4">
                                                    {isAnalogKey
                                                        ? 'お車の構造を熟知したプロの技で、大切な愛車を徹底的に守り抜きます。'
                                                        : 'スマートキーの利便性はそのままに、鉄壁の守りを提供します。'}
                                                </span>
                                            </>
                                        )}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {(activeTemplate ? activeTemplate.tags : (isAnalogKey
                                            ? ['Anti-プロ窃盗集団', 'Anti-自走盗難', 'Anti-部品盗難']
                                            : ['Anti-リレーアタック', 'Anti-CANインベーダー', 'Anti-コードグラバー', 'Anti-ゲームボーイ']
                                        )).map((threat: string) => (
                                            <span key={threat} className="px-4 py-1.5 bg-white rounded-lg text-[10px] font-black tracking-[0.2em] text-emerald-700 uppercase border border-emerald-100 shadow-sm">
                                                {threat}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                <div className="text-slate-800 text-xs font-black tracking-widest uppercase">
                                                    {activeTemplate ? activeTemplate.feature1.title : (isAnalogKey ? 'Analog Immobilize' : 'Digital Immobilize')}
                                                </div>
                                            </div>
                                            <div className="text-[12px] text-slate-500 font-bold leading-relaxed ml-3.5">
                                                {activeTemplate ? activeTemplate.feature1.description : (isAnalogKey
                                                    ? 'スターター回路等の物理遮断により、エンジンの自走盗難を確実に阻止します。'
                                                    : '不正信号による engine 始動をデジタル的に徹底ブロック。')}
                                            </div>
                                        </div>
                                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                <div className="text-slate-800 text-xs font-black tracking-widest uppercase">
                                                    {activeTemplate ? activeTemplate.feature2.title : (isAnalogKey ? 'Robust Protection' : 'Seamless Arming')}
                                                </div>
                                            </div>
                                            <div className="text-[12px] text-slate-500 font-bold leading-relaxed ml-3.5">
                                                {activeTemplate ? activeTemplate.feature2.description : (isAnalogKey
                                                    ? '屈強なサイレンとセンサー構成により、強引な侵入も即座に迎撃。'
                                                    : '純正キーのロック操作に連動して、確実に警戒を開始。')}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom: Common Equipment (Standard) */}
                                <div className="bg-slate-900/5 rounded-3xl p-8 border border-slate-900/5">
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                        <div className="lg:border-r lg:border-slate-200 lg:pr-8 min-w-[max-content]">
                                            <h4 className="text-emerald-700 text-[11px] font-black flex items-center gap-2 tracking-widest uppercase italic mb-1">
                                                <Zap className="w-3.5 h-3.5 fill-emerald-500" /> Standard Equipment
                                            </h4>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">全プラン共通 標準装備</div>
                                        </div>
                                        <div className="flex flex-col gap-4 flex-1">
                                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                                {[
                                                    'ショックセンサ', 'ドアセンサ', 'トランクセンサ', 'イモビライザ',
                                                    'ステータスインジケーター', '2WAYアンサーバックリモコン', '暗証番号式バレースイッチ', 'ハイパワーサイレン', 'ハザードフラッシュ機能'
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white border-2 border-emerald-400 shadow-sm shrink-0" />
                                                        <span className="text-[10px] md:text-xs font-black text-slate-600 tracking-tight leading-tight">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            {(filteredPlans.some(p => p.grade.includes('5Vf II')) || currentVehicle.id === 'kcar-special' || currentVehicle.id === 'toyota-landcruiser-70') && (
                                                <p className="text-[11px] md:text-xs font-bold text-rose-500">
                                                    ※注釈: 「5Vf II」は1WAYリモコンモデルとなります。（2WAYアンサーバックリモコンは付属しません）
                                                </p>
                                            )}
                                            {(filteredPlans.some(p => p.grade.includes('1Vs II'))) && (
                                                <p className="text-[11px] md:text-xs font-bold text-rose-500 mt-1">
                                                    ※注釈: 「1Vs II」はリモコンが付属しない純正キー連動モデルとなります。
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white md:bg-transparent rounded-[2rem] md:rounded-none shadow-2xl md:shadow-none overflow-hidden border border-gray-100 md:border-none mb-6 px-6 md:px-0">
                            <p className="mb-4 text-[11px] md:text-xs text-emerald-600 font-bold italic text-left md:text-right leading-relaxed">
                                ※表にチェックが入っていないセンサー類も、オプションとして追加取り付けが可能です。お気軽にご相談ください。
                            </p>
                            {/* Mobile View: Card Stack */}
                            <div className="md:hidden divide-y-[2px] divide-dashed divide-gray-200">
                                {filteredPlans.map((plan) => (
                                    <div
                                        key={plan.id}
                                        className={`py-8 ${plan.isRecommended ? 'bg-emerald-50/30 -mx-6 px-6' : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">{plan.brand}</span>
                                                    {plan.isRecommended && (
                                                        <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">おすすめ</span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight">
                                                    {plan.grade.split(/[\s　]*[＋+][\s　]*/).map((part, i) => (
                                                        <span key={i} className="block">
                                                            {i === 0 ? part : <span className="text-base text-gray-600">＋ {part}</span>}
                                                        </span>
                                                    ))}
                                                </h3>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-black tracking-tighter text-gray-900">¥{plan.price}</div>
                                                <div className="text-xs font-bold text-gray-400">(税込¥{plan.priceTax})</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                            {(activeFeatureSet?.features || [
                                                { key: 'triple', label: 'トリプル' },
                                                { key: 'tilt', label: '傾斜' },
                                                { key: 'bonnet', label: 'ボンネット' },
                                                { key: 'microwave', label: 'マイクロ波' },
                                                { key: 'siren', label: 'バックアップサイレン' },
                                                { key: 'algorithm', label: '純正ロック連動' },
                                                { key: 'canguard', label: 'CANガード' },
                                                { key: 'keyless', label: 'アルゴリズム' }
                                            ]).map((f, i) => (
                                                <div key={i} className={`flex items-center gap-2 ${plan.features?.[f.key] ? 'opacity-100' : 'opacity-20'}`}>
                                                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${plan.features?.[f.key] ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                                                        <Check className={`w-2 h-2 ${plan.features?.[f.key] ? 'text-emerald-600' : 'text-gray-400'}`} />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-gray-600 italic whitespace-nowrap">{f.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop View: Comparison Table */}
                            <div className="hidden md:block">
                                <table className="w-full table-fixed border-collapse">
                                    <thead>
                                        <tr className="border-b-4 border-[#0b1210]">
                                            <th className="py-6 px-2 lg:px-4 text-left bg-neutral-50/50 w-24 md:w-32 lg:w-[15%]">
                                                <div className="p-2 lg:p-3 bg-[#0b1210] inline-block rounded-xl shadow-xl shadow-emerald-950/20 mb-2">
                                                    <ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-400" />
                                                </div>
                                                <div className="text-[#0b1210] text-[10px] lg:text-xs font-black italic tracking-widest uppercase">Security grade</div>
                                                <div className="text-gray-400 text-[8px] font-bold mt-1">比較項目</div>
                                            </th>
                                            {filteredPlans.map((plan) => (
                                                <th key={plan.id} className={`py-6 px-1 lg:px-2 text-center align-top transition-all ${plan.isRecommended ? 'bg-emerald-50/50' : 'bg-white'}`}>
                                                    <div className="text-emerald-500 text-[8px] font-black mb-2 italic tracking-widest leading-none">{plan.brand}</div>
                                                    <div className="flex justify-center">
                                                        <div className="text-[#0b1210] text-[9px] lg:text-[10px] font-black leading-tight flex flex-col items-center italic gap-1">
                                                            {plan.grade.split(/[\s　]*[＋+][\s　]*/).map((part, i) => (
                                                                <span key={i} className={i === 0 ? "text-xs lg:text-sm text-gray-900 border-b-2 border-emerald-400/40 pb-0.5 mb-1 px-2 text-center" : "text-gray-600 text-center"}>
                                                                    {i === 0 ? part.replace(plan.brand, '').trim() : `＋ ${part}`}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {(activeFeatureSet?.features || [
                                            { key: 'triple', label: 'トリプル' },
                                            { key: 'tilt', label: '傾斜' },
                                            { key: 'bonnet', label: 'ボンネット' },
                                            { key: 'microwave', label: 'マイクロ波' },
                                            { key: 'siren', label: 'バックアップサイレン' },
                                            { key: 'algorithm', label: '純正ロック連動' },
                                            { key: 'canguard', label: 'CANガード' },
                                            { key: 'keyless', label: 'アルゴリズム' }
                                        ]).map((feature, idx) => (
                                            <tr key={feature.key} className={`hover:bg-neutral-50/50 transition-colors group`}>
                                                <td className="py-5 px-2 lg:px-4">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-500 transition-colors shrink-0" />
                                                            <span className="text-[10px] lg:text-xs font-black text-gray-600 italic tracking-tighter leading-none">{feature.label}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                {filteredPlans.map((plan) => (
                                                    <td key={plan.id} className={`py-5 px-1 text-center ${plan.isRecommended ? 'bg-emerald-50/30' : ''}`}>
                                                        <div className="flex justify-center">
                                                            {(plan.features as any)[feature.key] ? (
                                                                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner">
                                                                    <Check className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-600 stroke-[3px]" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-100" />
                                                            )}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr className="bg-neutral-50/30">
                                            <td className="py-8 px-2 lg:px-4">
                                                <div className="text-[9px] font-black text-[#0b1210] italic tracking-widest uppercase mb-1">Pricing</div>
                                                <div className="text-[10px] font-black text-gray-500 italic">標準パッケージ価格</div>
                                            </td>
                                            {filteredPlans.map((plan) => (
                                                <td key={plan.id} className={`py-8 px-1 lg:px-2 text-center ${plan.isRecommended ? 'bg-emerald-50/50' : ''}`}>
                                                    <div className="text-sm lg:text-lg font-black tracking-tighter text-gray-900 italic leading-none">
                                                        ¥{plan.price}
                                                    </div>
                                                    <div className="text-[8px] text-gray-400 font-bold mt-1 tracking-widest mb-3">
                                                        (税込¥{plan.priceTax})
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* Condensed Features / Budget Suggestion (Grgo V2) */}
                {!isSpecialModel && currentVehicle.showV2Option && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <div className="bg-[#0b1210] rounded-[3rem] p-8 md:p-12 relative overflow-hidden group shadow-2xl border border-emerald-500/10">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full -mr-250 -mt-250 blur-3xl" />
                            
                            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                                <div className="w-full md:w-1/4">
                                    <div className="aspect-square bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 rounded-3xl p-6 border border-emerald-500/10 flex flex-col items-center justify-center text-center">
                                        <Zap className="w-12 h-12 text-emerald-400 mb-4 animate-pulse" />
                                        <div className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase mb-1">Select Option</div>
                                        <h3 className="text-white text-xl font-black italic tracking-tighter uppercase leading-tight">Grgo V2<br /><span className="text-xs opacity-50 italic">Smart Selection</span></h3>
                                    </div>
                                </div>
                                
                                <div className="w-full md:w-3/4 space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-400 text-[10px] font-black tracking-widest uppercase italic">
                                        <AlertTriangle className="w-3.5 h-3.5" /> For Selective Protection
                                    </div>
                                    <h2 className="text-white text-2xl md:text-3xl font-black italic tracking-tighter leading-none uppercase" dangerouslySetInnerHTML={{ 
                                        __html: securityData.home.v2Settings?.title || '予算に合わせて、<span class="text-emerald-500">機能を凝縮した守り</span>を。' 
                                    }} />
                                    <p className="text-zinc-400 font-bold leading-relaxed max-w-xl text-xs md:text-sm">
                                        {securityData.home.v2Settings?.description || '「フルスペックは必要ないが、最新の盗難手口からは確実に守りたい」というお客様へ。ANGでは、機能を厳選しコストパフォーマンスを極限まで高めた**Grgo V2ベースのプラン**も提案可能です。お気軽にご相談ください。'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Trust & Commitment Section */}
                <div className="mt-16 bg-[#0b1210] rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 -skew-x-12 translate-x-1/4" />
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8 italic">
                            <ShieldCheck className="w-4 h-4" /> Professional Integrity
                        </div>

                        <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter mb-10 leading-tight">
                            私たちは、<span className="text-emerald-500">「見えない守り」</span>に妥協しません。
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                        <Lock className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h3 className="text-lg font-black italic tracking-tight">徹底した秘匿施工</h3>
                                </div>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed">
                                    防犯上の理由により、施工中の写真や配線の詳細は一切公開しておりません。それは、万が一車両に侵入された際も、システムの所在を悟らせない「最強の盾」であるための私たちの拘りです。
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                        <Award className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h3 className="text-lg font-black italic tracking-tight">認定店としての技術力</h3>
                                </div>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed">
                                    ユピテル（Grgo/Panthera）の最上位認定取付店として、独自の車両解析データを完備。{currentVehicle.name}の構造を熟知したプロが、純正同等のクオリティでインストールいたします。
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left transition-all">
                            <div>
                                <div className="text-emerald-500 text-[10px] font-black tracking-widest uppercase mb-2">Experience & Results</div>
                                <p className="text-xs text-gray-400 font-bold leading-relaxed">
                                    ブログにて多数の{currentVehicle.name} 施工車両ログを公開中。<br className="hidden md:block" />
                                    数多くの実績が、何よりの信頼の証です。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#0c1311] border-t border-white/5 p-5 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
                    <div className="hidden md:block">
                        <div className="text-emerald-500 text-xs font-black tracking-widest mb-1 italic uppercase">{currentVehicle.name}を最先端の手口から守る</div>
                        <div className="text-white text-xl font-black tracking-tight underline transition-all underline-offset-4 decoration-emerald-500/50">
                            無料相談・お見積もり
                        </div>
                    </div>
                    <div className="flex-grow flex items-center gap-3">
                        <a
                            href="https://page.line.me/312qjhsq?openQrModal=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-[#06C755] hover:bg-[#05b34c] text-white px-4 py-4 rounded-2xl font-black text-[11px] md:text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-green-500/10"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>LINE相談</span>
                        </a>
                        <button
                            onClick={() => navigate('/reservation')}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-4 rounded-2xl font-black text-[11px] md:text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-500/10"
                        >
                            <Mail className="w-4 h-4" />
                            <span>メール予約</span>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default VehicleSecurityDetail;
