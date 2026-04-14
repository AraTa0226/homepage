// Sync Marker: 2026-04-13-0755
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import { RecruitmentSection } from '../Shared/RecruitmentSection';
import { SafeImage } from '../ui/SafeImage';
import {
  ArrowLeft,
  Speaker,
  Music,
  Zap,
  Shield,
  CheckCircle2,
  ChevronRight,
  Info,
  Search,
  Filter,
  Star,
  Car,
  Settings2,
  Volume2,
  LayoutGrid,
  List,
  Menu,
  X,
  Calendar,
  MessageSquare,
  Activity,
  Wrench,
  Layers,
  Youtube,
  Play,
  TrendingDown,
  ExternalLink,
  Thermometer
} from 'lucide-react';

interface AudioMenuDetailProps {
  onBack: () => void;
}

export const AudioMenuDetail: React.FC<AudioMenuDetailProps> = ({ onBack }) => {
  const { assets } = useSite();
  const { plans, optionals, guides, audioRecruitment, auditionSpeakers } = usePrices();
  const { planSlug } = useParams<{ planSlug: string }>();
  const [activeCategory, setActiveCategory] = useState<'all' | 'speaker_package' | 'bass_power' | 'digital_source' | 'install_tuning' | 'custom_install'>('all');
  const [viewingFullList, setViewingFullList] = useState<string | null>(null);
  const [viewingCategoryDetail, setViewingCategoryDetail] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState<string>('blue');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFullAuditionList, setShowFullAuditionList] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [selectedAuditionImage, setSelectedAuditionImage] = useState<string | null>(null);
  const [showAllGuides, setShowAllGuides] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<string>('level');

  const categorySubTabs: Record<string, { id: string; label: string; en: string; info: string }[]> = {
    speaker_package: [
      { id: 'level', label: 'スピーカー交換プラン', en: 'Standard Packages', info: 'ご予算や音質レベルから選べる標準パッケージ' },
      { id: 'car', label: '車種別プラン', en: 'Car-Specific', info: '軽自動車や欧州車など、特定車種に最適化されたプラン' }
    ],
    bass_power: [
      { id: 'amp', label: 'アンプ・パッケージ', en: 'Amp Package', info: '音の解像度と駆動力を高める外部アンプの導入' },
      { id: 'subwoofer', label: 'サブウーハー', en: 'Subwoofer', info: '音楽に魂を吹き込む重低音の追加' }
    ],
    digital_source: [
      { id: 'dsp', label: 'DSPプロセッサー', en: 'DSP Processor', info: '純正システムを活かした緻密な音響調整' },
      { id: 'media', label: 'プレーヤー・ナビ', en: 'Media & Navi', info: '高鮮度な再生を実現するメディアプレーヤーとナビ' }
    ],
    install_tuning: [
      { id: 'tuning', label: 'デッドニング', en: 'Deadening', info: 'スピーカー本来の性能を引き出す環境整備' },
      { id: 'power', label: '電源・静音化', en: 'Environment', info: 'ノイズ低減と安定した電力供給による音質向上' }
    ],
    custom_install: [
      { id: 'craft', label: 'カスタム造形', en: 'Craftsmanship', info: 'ピラー埋め込みやバッフル製作などの匠の技' },
      { id: 'oneoff', label: 'ワンオフ製作', en: 'One-off Build', info: 'トランク制作など、世界に一台のカスタム' }
    ]
  };

  useEffect(() => {
    // Handle planSlug from URL
    if (planSlug && plans.length > 0) {
      // Strip .html extension if present
      const cleanSlug = planSlug.replace(/\.html$/, '');
      for (const category of plans) {
        const found = category.items.find((item: any) => item.slug === cleanSlug);
        if (found) {
          setSelectedItem(found);
          setActiveCategory(category.id as any);
          break;
        }
      }
    }
  }, [planSlug, plans]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const categoryExplanations: Record<string, any> = {
    speaker_package: {
      title: "スピーカー交換・車種別プラン",
      subtitle: "**音を良くする第一歩**、愛車に**ピッタリ**の音を…",
      description: "加工を最小限に抑えつつ、劇的な音質向上を実現する**車種別プラン**と、国内外のスピーカーから選べる**交換パッケージ**を統合。",
      sampleDescription: "【施工例】BMW専用スピーカー交換：内装の意匠を一切変えることなく、中高域の解像度を大幅に向上。専用設計のため、車両へのダメージも最小限に抑えられます。",
      benefits: [
        "車両の配線加工が不要な安心のインストール",
        "内装の雰囲気を一切壊さない純正ルックな仕上がり",
        "国内外のブランドからお好みの音を選択可能"
      ],
      image: assets.audioMenuImage,
      icon: Speaker,
      color: "blue",
      upgrades: [
        { title: "高剛性バッフルへ変更", price: "+¥11,000〜", icon: Shield, description: "スピーカーの土台を強化し、不要な共振を排除。低音のレスポンスが向上します。" },
        { title: "ツィーター埋め込み加工", price: "+¥33,000〜", icon: Settings2, description: "Aピラー等に最適な角度で設置。理想的なステージングを実現します。" }
      ]
    },
    bass_power: {
      title: "低音強化・パワーアップ",
      subtitle: "**低音の躍動感**と、音全体の**鮮明さ・パワー**を…",
      description: "**サブウーファー**による重低音の追加と、**外部アンプ**による強力なスピーカー駆動を統合。音楽の表現力を別次元へ引き上げます。",
      sampleDescription: "【施工例】パワードサブウーファー＋小型アンプ設置：スペースを犠牲にすることなく、不足していた低音の厚みを補完し、解像度を劇的に向上させます。",
      benefits: [
        "音楽全体の厚みと躍動感の向上",
        "アンプによる歪みのないクリアな再生",
        "ライブ会場のような空気感の再現"
      ],
      image: assets.audioMenuImage,
      icon: Music,
      color: "indigo",
      upgrades: [
        { title: "ボックスタイプへ変更", price: "+¥44,000〜", icon: Music, description: "より大口径のユニットと容量の大きなボックスで、圧倒的な重低音を実現。" },
        { title: "トランク埋め込み加工", price: "+¥88,000〜", icon: Settings2, description: "車両の形状に合わせてカスタム製作。荷室を有効活用しながら高音質を両立。" }
      ]
    },
    digital_source: {
      title: "デジタル・音質制御",
      subtitle: "純正システムを活かし、**究極の定位**と**高鮮度再生**を…",
      description: "**DSP（プロセッサー）**、**高音質ナビ**、**メディアプレーヤー**を統合。純正システムの制限を解除し、アーティストが目の前に浮かび上がる感動を創ります。",
      sampleDescription: "【施工例】DSP＋メディアプレーヤー導入：純正ナビを活かしたまま、スマホやDAPからのデジタル高鮮度再生を実現。完璧な音像定位と圧倒的な解像度を両立します。",
      benefits: [
        "ダッシュボード中央に定位する正確な音像",
        "ハイレゾ音源のポテンシャルを100%引き出すデジタル接続",
        "純正ナビやDAの音質制限を無視できる高音質ソース"
      ],
      image: assets.audioMenuImage,
      icon: Zap,
      color: "purple",
      upgrades: [
        { title: "高精度外部クロック", price: "¥44,000〜", icon: Activity, description: "音の滲みを極限まで排除し、より深いリアリティを実現。" },
        { title: "大容量SSD換装", price: "¥22,000〜", icon: Layers, description: "巨大なライブラリーを車載。全コレクションを常に携帯。" }
      ]
    },
    install_tuning: {
      title: "施工・環境チューニング",
      subtitle: "機材の性能を**120%**引き出し、**快適な車内空間**を…",
      description: "**デッドニング**や**電源強化**、物理的な環境改善を統合。ロードノイズを抑え、オーディオ機材の真価を発揮させるための必須施工です。",
      sampleDescription: "【施工例】フルデッドニング＋バッ直配線：ロードノイズを大幅に低減し、静寂の中に音楽が浮かび上がる環境を構築。電源強化により音の立ち上がりも激変します。",
      benefits: [
        "機材のポテンシャルをフルに引き出す音響設計",
        "ロードノイズ低減による快適性の向上",
        "電源安定化による圧倒的なS/N感と躍動感"
      ],
      image: assets.audioMenuImage,
      icon: Shield,
      color: "orange",
      upgrades: [
        { title: "ハイグレード配線", price: "+¥11,000〜", icon: Zap, description: "接点ロスや伝送ロスを極限まで抑えるプレミアムケーブル。" },
        { title: "仮想アース追加", price: "+¥33,000〜", icon: Activity, description: "ノイズを吸収し、音の透明感をさらに向上させます。" }
      ]
    },
    custom_install: {
      title: "カスタムインストール・造作",
      subtitle: "**匠の技**で、音と美しさが融合する**唯一無二**の空間を…",
      description: "音響理論に基づいた**ピラー加工**や、ドアの鳴りを極限まで引き出す**アウターバッフル**。機能美を追求した造作により、愛車を特別なリスニングルームへと変貌させます。",
      sampleDescription: "【施工例】Aピラー3WAY埋め込み＋トランクカスタム：スピーカーの指向性を最適化し、圧倒的なステージングを実現。ライティングを組み合わせることで、夜のドライブも彩ります。",
      benefits: [
        "音響特性を最大限に引き出す緻密な角度設計",
        "純正の内装に馴染む、あるいは凌駕するハイクオリティな仕上がり",
        "オーナー様のこだわりを具現化するフルオーダーメイド"
      ],
      image: assets.audioMenuImage,
      icon: Settings2,
      color: "cyan",
      upgrades: [
        { title: "エクセーヌ/アルカンターラ仕上げ", price: "+¥11,550〜", icon: Layers, description: "質感を高める高級素材。光の反射を抑え、ダッシュボードの高級感を演出します。" },
        { title: "LEDライティング演出", price: "+¥22,000〜", icon: Zap, description: "アクリルとLEDを組み合わせ、夜間の車内を幻想的にアップデート。" }
      ]
    },
    deadening_opt: {
      title: "標準デッドニング",
      subtitle: "スピーカー交換プランに標準付帯。",
      description: "当店のスピーカー交換プランには、スピーカーの性能を最低限引き出すための「簡易デッドニング」が最初から含まれています。さらに音質を追求したい場合は、差額分のみで上位のデッドニングプランへアップグレードすることも可能です。",
      benefits: [
        "スピーカー交換プランに無料で付属",
        "差額のみで本格デッドニングへ変更可能",
        "施工の基本として全ての車に実施"
      ],
      image: assets.audioMenuImage,
      icon: Shield,
      color: "green"
    },
    cable_opt: {
      title: "スピーカーケーブル",
      subtitle: "標準ケーブル付属。アップグレードも可能。",
      description: "取り付けに必要なスピーカーケーブルは標準で含まれています。より解像度を高めたい、音の情報量を増やしたいという方には、差額をいただくことで高音質なOFCケーブルやハイエンドケーブルへの変更も承っております。",
      benefits: [
        "標準的な配線はプラン料金に込み",
        "差額で高音質ケーブルへ変更可能",
        "システム構成に合わせた最適な提案"
      ],
      image: assets.audioMenuImage,
      icon: Zap,
      color: "purple"
    },
    tuning_opt: {
      title: "サウンドチューニング",
      subtitle: "当店ご購入者様は「永年無料」で調整。",
      description: "カーオーディオは取り付け後の「調整」で音が決まります。当店でユニットをご購入・施工いただいたお客様には、納車時のセッティングはもちろん、エージング後の再調整も無料で実施しております。プロの技術で常に最高の状態を維持します。",
      sampleDescription: "【施工例】DSP導入後の定期セッティング：エージングが進んだ3ヶ月後に再調整。スピーカーの動きがスムーズになった分、より緻密なEQ補正を行うことで、さらに深みのある音へと進化させます。",
      benefits: [
        "当店施工車はいつでも調整無料",
        "測定器と耳を使ったプロの追い込み",
        "エージング後の変化にも無償対応"
      ],
      image: assets.audioMenuImage,
      icon: Settings2,
      color: "orange"
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'purpose-nav', label: '目的別ナビ' },
    { id: 'plan-list', label: 'プラン一覧' },
    { id: 'knowledge-guide', label: 'コラム・知識ガイド' },
    { id: 'cta', label: 'お問い合わせ' },
  ];

  const purposeNav = [
    { id: 'speaker_package', title: "スピーカー交換・車種別プラン", desc: "純正の不満を解決。愛車にピッタリの音を。", icon: Speaker, color: "blue" },
    { id: 'bass_power', title: "低音強化・パワーアップ", desc: "迫力の重低音と、鮮明な解像度をプラス。", icon: Zap, color: "indigo" },
    { id: 'digital_source', title: "デジタル・音質制御", desc: "DSPとメディアプレーヤーで極上の音像を。", icon: Settings2, color: "purple" },
    { id: 'install_tuning', title: "環境チューニング", desc: "機材の性能を120%引き出す基礎工事。", icon: Shield, color: "orange" },
    { id: 'custom_install', title: "カスタムインストール", desc: "匠の技で、世界に一台のリスニングルームを。", icon: Settings2, color: "cyan" },
    { id: 'knowledge-guide', title: "お悩み解決コラム", desc: "カーオーディオの知識や事例を読む。", icon: Info, color: "sky" },
  ];

  const categories = [
    { id: 'speaker_package', title: "スピーカー・車種別", items: ["BASIC line", "STANDARD line", "3-WAY line", "車種専用プラン"], icon: Speaker },
    { id: 'bass_power', title: "低音・アンプ", items: ["サブウーハー", "外部アンプ"], icon: Zap },
    { id: 'digital_source', title: "デジタル・DSP", items: ["DSP", "プレーヤー", "ナビ"], icon: Settings2 },
    { id: 'install_tuning', title: "施工・電源", items: ["デッドニング", "電源強化", "車内静音"], icon: Shield },
    { id: 'custom_install', title: "造作・カスタム", items: ["ピラー加工", "アウターバッフル", "トランク造作"], icon: Settings2 },
  ];

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-600 text-blue-600 border-blue-600",
    indigo: "bg-indigo-600 text-indigo-600 border-indigo-600",
    purple: "bg-purple-600 text-purple-600 border-purple-600",
    orange: "bg-orange-600 text-orange-600 border-orange-600",
    green: "bg-green-600 text-green-600 border-green-600",
    cyan: "bg-cyan-600 text-cyan-600 border-cyan-600"
  };

  const renderHighlightedText = (text: string, color: string) => {
    if (!text) return null;

    const parts = text.split(/(\*\*.*?\*\*)/g);
    const colorClass = colorClasses[color]?.split(' ')[1] || 'text-blue-600';

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} className={`${colorClass} font-black`}>
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  const renderDescriptionWithImages = (text: string, color: string) => {
    if (!text) return null;

    return text.split('\n').map((line, lineIdx) => {
      const imgRegex = /!\[(.*?)\]\((.*?)\)/g;

      // If line only contains images and whitespace/commas
      const textWithoutImages = line.replace(imgRegex, '').trim();
      const matches = Array.from(line.matchAll(imgRegex));

      if (matches.length > 1 && (textWithoutImages === '' || textWithoutImages === ',')) {
        // Determine grid layout based on number of images
        const gridClass = matches.length === 2 ? 'grid-cols-2 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-3';
        return (
          <div key={lineIdx} className={`my-8 grid ${gridClass} gap-4 w-full`}>
            {matches.map((match, imgIdx) => (
              <SafeImage
                key={imgIdx}
                src={match[2]}
                alt={match[1]}
                className="w-full aspect-square rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 object-cover"
              />
            ))}
          </div>
        );
      }

      // For general cases (single image or text)
      const parts = line.split(/(!\[.*?\]\(.*?\))/g);
      return (
        <span key={lineIdx} className="block min-h-[1.5em] mb-1">
          {parts.map((part, i) => {
            const match = part.match(/^!\[(.*?)\]\((.*?)\)$/);
            if (match) {
              return (
                <span key={i} className="block my-8 w-full max-w-3xl mx-auto">
                  <SafeImage
                    src={match[2]}
                    alt={match[1]}
                    className="w-full h-auto rounded-3xl shadow-xl border border-gray-100 object-cover"
                  />
                </span>
              );
            }
            return <span key={i}>{renderHighlightedText(part, color)}</span>;
          })}
        </span>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pb-24"
    >


      {/* Plan Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-gray-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col relative"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-900 transition-all z-20"
                aria-label="詳細を閉じる"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-grow overflow-y-auto">
                <div className="relative h-64 md:h-96">
                  <SafeImage
                    src={selectedItem.image || "https://picsum.photos/seed/speaker/1200/800"}
                    className="w-full h-full object-cover"
                    alt={selectedItem.name + "の製品イメージ"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg mb-4 inline-block">
                      {selectedItem.badge || "Premium Plan"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
                      {selectedItem.name}
                    </h2>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  {/* Savings Badge for Packages */}
                  {selectedItem.packageDetails && !selectedItem.isGuide && selectedItem.showSavings !== false && (
                    <div className="mb-10 flex flex-wrap items-center gap-4">
                      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-center gap-6 flex-grow">
                        <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-200">
                          <TrendingDown className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Package Value</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-red-600 tracking-tighter">
                              {formatPrice(selectedItem.packageDetails.savings)}
                            </span>
                            <span className="text-sm font-bold text-red-400 uppercase tracking-widest">もおトク！</span>
                          </div>
                          <div className="text-[10px] text-gray-500 font-bold mt-1">
                            通常施工合計: {formatPrice(selectedItem.packageDetails.standardPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex-grow">
                      <div className="mb-10">
                        {!selectedItem.isGuide && (
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Description
                          </h3>
                        )}
                        <div className="text-gray-600 text-lg font-bold leading-relaxed whitespace-pre-wrap">
                          {renderDescriptionWithImages(selectedItem.description || "詳細な説明は現在準備中です。施工内容や適合車種については、お気軽にお問い合わせください。", selectedCategoryColor)}
                        </div>
                      </div>

                      {/* Package Contents Grid */}
                      {selectedItem.packageDetails && !selectedItem.isGuide && (
                        <div className="mb-12">
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <LayoutGrid className="w-4 h-4" />
                            Package Contents
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedItem.packageDetails.contents.map((content: any, idx: number) => {
                              const Icon = { Speaker, Activity, Layers, Zap, Wrench, Thermometer }[content.icon] || Info;
                              return (
                                <div key={idx} className="flex items-start gap-4 p-5 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg transition-all group">
                                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="font-black text-gray-900 text-sm mb-1">{content.title}</h4>
                                    <p className="text-xs text-gray-500 font-bold leading-relaxed">{content.description}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Speaker Lineup Section */}
                      {selectedItem.lineup && selectedItem.lineup.length > 0 && !selectedItem.isGuide && (
                        <div className="mb-10">
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <List className="w-4 h-4" />
                            Lineup & Audition
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedItem.lineup.map((item: any, idx: number) => (
                              <div key={idx} className="flex flex-col p-5 rounded-3xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-all group relative overflow-hidden">
                                <div className="flex items-center gap-4 mb-4">
                                  {item.image && (
                                    <div
                                      className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-gray-200 bg-white cursor-zoom-in relative group/img"
                                      onClick={() => setSelectedGalleryImage(item.image)}
                                    >
                                      <SafeImage
                                        src={item.image}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt={item.name}
                                      />
                                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                        <Search className="w-4 h-4 text-white" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex-grow">
                                    <div className="font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">{item.name}</div>
                                    {item.description ? (
                                      <div className="text-[10px] font-bold text-gray-500 mt-1 leading-relaxed line-clamp-2">{item.description}</div>
                                    ) : (
                                      <div className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">Speaker Unit</div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/50">
                                  {item.price && parseInt(item.price) > 0 ? (
                                    <span className="font-black text-blue-600">{formatPrice(item.price)}</span>
                                  ) : (
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Consultation Required</span>
                                  )}
                                  {item.youtube && (
                                    <button
                                      onClick={() => {
                                        const videoId = item.youtube.split('v=')[1]?.split('&')[0];
                                        if (videoId) setActiveYoutubeId(videoId);
                                      }}
                                      className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-black text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all min-h-[44px]"
                                    >
                                      <Play className="w-3 h-3 fill-current" />
                                      試聴サンプル
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Upgrade Options Table */}
                      {selectedItem.packageDetails?.upgrades && !selectedItem.isGuide && (
                        <div className="mb-12">
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <TrendingDown className="w-4 h-4 rotate-180" />
                            Upgrade Options
                          </h3>
                          <div className="space-y-3">
                            {selectedItem.packageDetails.upgrades.map((upgrade: any, idx: number) => (
                              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gray-900 text-white group hover:bg-blue-900 transition-all">
                                <div className="flex-grow">
                                  <h4 className="font-black text-lg mb-1 group-hover:text-blue-300 transition-colors">{upgrade.title}</h4>
                                  <p className="text-xs text-gray-500 font-bold leading-relaxed">{upgrade.description}</p>
                                </div>
                                <div className="shrink-0 text-right">
                                  <div className="text-blue-400 font-black text-lg tracking-tighter">
                                    {upgrade.price.startsWith('+') || upgrade.price.includes('%') ? upgrade.price : `+${formatPrice(upgrade.price)}`}
                                  </div>
                                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Add-on Price</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notes Section */}
                      {selectedItem.packageDetails?.notes && !selectedItem.isGuide && (
                        <div className="mb-10">
                          <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Notes & Conditions
                          </h3>
                          <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                            <ul className="space-y-3">
                              {selectedItem.packageDetails.notes.map((note: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-xs font-bold text-gray-500 leading-relaxed">
                                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                                  {note}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {selectedItem.features && selectedItem.features.length > 0 && !selectedItem.isGuide && (
                        <div>
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Included Features
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {selectedItem.features.map((f: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm font-bold text-gray-700">{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Gallery Section */}
                      {selectedItem.gallery && selectedItem.gallery.length > 0 && !selectedItem.isGuide && (
                        <div className="mt-12">
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-8 flex items-center gap-2">
                            <LayoutGrid className="w-4 h-4" />
                            Installation Gallery
                          </h3>
                          <div className="space-y-12">
                            {selectedItem.gallery.map((group: any, groupIdx: number) => (
                              <div key={groupIdx} className="space-y-4">
                                <h4 className="text-lg font-black text-gray-900 flex items-center gap-3">
                                  <div className="w-2 h-8 bg-blue-600 rounded-full" />
                                  {group.title}
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                  {group.images.map((img: string, imgIdx: number) => (
                                    <motion.button
                                      key={imgIdx}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => setSelectedGalleryImage(img)}
                                      className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm group"
                                    >
                                      <SafeImage
                                        src={img}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt={`${group.title} - ${imgIdx + 1}`}
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <Search className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedItem.isGuide && selectedItem.link && (
                        <div className="mt-8">
                          <a
                            href={selectedItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-bold text-sm md:text-base tracking-widest transition-all shadow-lg"
                          >
                            <ExternalLink className="w-5 h-5" />
                            公式サイトで詳細を読む
                          </a>
                        </div>
                      )}
                    </div>

                    {!selectedItem.isGuide && (
                      <div className="w-full md:w-80 shrink-0">
                        <div className="bg-gray-900 rounded-[2rem] p-8 text-white sticky top-0">
                          <div className="mb-8">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Price (Tax Incl.)</p>
                            <div className="text-4xl font-black text-blue-400 tracking-tighter">
                              {formatPrice(selectedItem.price)}
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2">※取付工賃・ショートパーツ込み</p>
                          </div>

                          {selectedItem.link && (
                            <div className="mb-6">
                              <a
                                href={selectedItem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-xs tracking-widest transition-all border border-white/10"
                              >
                                <ExternalLink className="w-4 h-4" />
                                公式サイトで詳細を見る
                              </a>
                            </div>
                          )}

                          <div className="space-y-4">
                            <a
                              href="https://line.me/R/ti/p/@soundang"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-3 w-full bg-[#06C755] text-white py-4 rounded-xl font-black text-sm tracking-widest hover:scale-105 transition-all"
                            >
                              <MessageSquare className="w-5 h-5" />
                              LINEで相談
                            </a>
                            <button
                              onClick={() => {
                                setSelectedItem(null);
                                scrollToSection('cta');
                              }}
                              className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm tracking-widest hover:scale-105 transition-all"
                            >
                              <Calendar className="w-5 h-5" />
                              来店予約
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Modal */}
      <AnimatePresence>
        {activeYoutubeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setActiveYoutubeId(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                aria-label="動画を閉じる"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {selectedGalleryImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGalleryImage(null)}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedGalleryImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors flex items-center gap-2 font-black text-sm tracking-widest uppercase"
                aria-label="画像を閉じる"
              >
                CLOSE <X className="w-6 h-6" />
              </button>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={selectedGalleryImage}
                  className="max-w-full max-h-[85vh] object-contain"
                  alt="Gallery Preview"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audition Speaker Image Modal */}
      <AnimatePresence>
        {selectedAuditionImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAuditionImage(null)}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAuditionImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors flex items-center gap-2 font-black text-sm tracking-widest uppercase"
              >
                CLOSE <X className="w-6 h-6" />
              </button>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900">
                <img
                  src={selectedAuditionImage}
                  className="max-w-full max-h-[85vh] object-contain"
                  alt="Speaker Preview"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {viewingCategoryDetail ? (
          <motion.div
            key="category-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            {(() => {
              const detail = categoryExplanations[viewingCategoryDetail];
              if (!detail) return null;
              return (
                <div className="min-h-screen bg-gray-50 pb-24">
                  <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                      <button
                        onClick={() => setViewingCategoryDetail(null)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-bold group"
                        aria-label="メニューに戻る"
                      >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">BACK TO MENU</span>
                      </button>
                      <h2 className="font-black text-xl tracking-tighter">カテゴリー解説</h2>
                      <div className="w-24"></div>
                    </div>
                  </div>

                  <div className="max-w-4xl mx-auto px-4 py-12">
                    <div className="relative h-[300px] md:h-[450px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
                      <img src={detail.image} className="w-full h-full object-cover" alt={detail.title} referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 ${colorClasses[detail.color].split(' ')[0]} text-white shadow-lg`}>
                          <detail.icon className="w-7 h-7 md:w-8 md:h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">{detail.title}</h1>
                        <p className="text-lg md:text-xl text-gray-200 font-bold leading-tight">
                          {renderHighlightedText(detail.subtitle, detail.color)}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-gray-100 mb-12">
                      <div className="mb-16">
                        <h3 className="text-2xl font-black mb-6 text-gray-900 flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full ${colorClasses[detail.color].split(' ')[0]}`}></div>
                          解説
                        </h3>
                        <p className="text-gray-600 text-lg font-medium leading-relaxed mb-12 whitespace-pre-wrap">
                          {renderHighlightedText(detail.description, detail.color)}
                        </p>

                        {detail.sampleDescription && (
                          <div className={`p-8 rounded-[2.5rem] ${colorClasses[detail.color].split(' ')[1].replace('text-', 'bg-').replace('600', '50')} border border-current/10`}>
                            <h4 className={`text-sm font-black mb-4 uppercase tracking-[0.2em] ${colorClasses[detail.color].split(' ')[1]}`}>Sample Description</h4>
                            <p className="text-gray-800 font-bold leading-relaxed italic">
                              {detail.sampleDescription}
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-2xl font-black mb-8 text-gray-900 flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full ${colorClasses[detail.color].split(' ')[0]}`}></div>
                          施工のメリット
                        </h3>
                        <div className="grid gap-6">
                          {detail.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-5 bg-gray-50 p-8 rounded-3xl border border-gray-100 group hover:bg-white hover:shadow-lg transition-all">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[detail.color].split(' ')[1].replace('text-', 'bg-').replace('600', '100')} ${colorClasses[detail.color].split(' ')[1]} shrink-0`}>
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                              <p className="font-black text-gray-800 text-lg leading-snug">{benefit}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {detail.upgrades && (
                        <div className="mt-20 pt-20 border-t border-gray-100">
                          <h3 className="text-2xl font-black mb-8 text-gray-900 flex items-center gap-3">
                            <div className={`w-2 h-8 rounded-full ${colorClasses[detail.color].split(' ')[0]}`}></div>
                            さらに極めるためのアップグレード
                          </h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            {detail.upgrades.map((upgrade, i) => (
                              <div key={i} className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                                <div className="relative z-10">
                                  <div className="flex items-center justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[detail.color].split(' ')[0]}`}>
                                      <upgrade.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-blue-400 font-black text-sm">{upgrade.price}</span>
                                  </div>
                                  <h4 className="text-xl font-black mb-3">{upgrade.title}</h4>
                                  <p className="text-gray-500 text-sm font-bold leading-relaxed">
                                    {upgrade.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                      <button
                        onClick={() => {
                          const isOptional = optionals.some(o => o.id === viewingCategoryDetail);
                          if (isOptional) {
                            setViewingCategoryDetail(null);
                            setTimeout(() => scrollToSection('options'), 100);
                          } else {
                            setViewingFullList(viewingCategoryDetail);
                            setViewingCategoryDetail(null);
                            window.scrollTo(0, 0);
                          }
                        }}
                        className="flex-grow bg-gray-900 text-white py-6 rounded-[2rem] font-black text-lg tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-200"
                      >
                        {optionals.some(o => o.id === viewingCategoryDetail) ? '付帯サービス一覧を見る' : 'プラン一覧を見る'}
                      </button>
                      <button
                        onClick={() => setViewingCategoryDetail(null)}
                        className="flex-grow bg-white text-gray-900 py-6 rounded-[2rem] font-black text-lg tracking-widest border border-gray-200 hover:bg-gray-50 transition-all"
                      >
                        メニューに戻る
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        ) : viewingFullList ? (
          <motion.div
            key="full-list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            {(() => {
              const currentCategory = plans.find(p => p.id === viewingFullList);
              return (
                <div className="min-h-screen bg-gray-50 pb-24">
                  <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setViewingFullList(null);
                          window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-bold group"
                        aria-label="メニューに戻る"
                      >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">BACK TO MENU</span>
                      </button>
                      <h2 className="font-black text-xl tracking-tighter">{currentCategory?.category} 一覧</h2>
                      <div className="w-24"></div>
                    </div>
                  </div>

                  <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Category Description Section */}
                    {currentCategory?.showDescriptionInList && (currentCategory.description || (currentCategory.images && currentCategory.images.length > 0)) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 relative"
                      >
                        <div className="absolute -top-10 -left-4 text-[8rem] md:text-[12rem] font-black text-blue-600/[0.03] select-none pointer-events-none tracking-tighter leading-none z-0">
                          AUDIO
                        </div>
                        <div className="relative z-10 bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 overflow-hidden border border-gray-200 shadow-sm">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-gray-50/30"></div>
                          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center relative z-10">
                            {currentCategory.images && currentCategory.images.length > 0 && (
                              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {currentCategory.images.map((img, i) => (
                                  <div key={i} className={`relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 group ${currentCategory.images!.length === 1 ? 'sm:col-span-2 aspect-video' : 'aspect-square'}`}>
                                    <img
                                      src={img}
                                      alt={`${currentCategory.category} image ${i + 1}`}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className={`w-full ${currentCategory.images && currentCategory.images.length > 0 ? 'lg:w-1/2' : 'lg:w-full'}`}>
                              <div className="flex items-center gap-3 mb-6 md:mb-8">
                                <div className="w-10 h-[2px] bg-blue-600/30"></div>
                                <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
                                  Category Story
                                </span>
                              </div>
                              <h4 className="text-2xl md:text-4xl font-black mb-6 md:mb-10 tracking-tighter leading-[1.1] text-gray-900">
                                {currentCategory.category}
                              </h4>
                              <div className="text-gray-600 font-medium text-base md:text-xl leading-relaxed whitespace-pre-wrap max-w-2xl mb-8">
                                {renderHighlightedText(currentCategory.description || "", categoryExplanations[currentCategory.id]?.color || 'blue')}
                              </div>

                              {/* Dynamic Sub-category Tabs in Full List - Only show if > 3 items */}
                              {categorySubTabs[currentCategory.id] && currentCategory.items.length > 3 && (
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-6 border-t border-blue-600/10">
                                  <div className="flex bg-gray-900/5 p-1 rounded-2xl md:rounded-full backdrop-blur-sm border border-black/5">
                                    {categorySubTabs[currentCategory.id].map(tab => (
                                      <button
                                        key={tab.id}
                                        onClick={() => {
                                          setActiveSubTab(tab.id);
                                          // Scroll to start of items if needed
                                        }}
                                        className={`px-6 py-2.5 rounded-2xl md:rounded-full text-xs font-black transition-all ${activeSubTab === tab.id ? 'bg-white text-blue-600 shadow-xl' : 'text-gray-500 hover:text-gray-700'}`}
                                      >
                                        {tab.label} <span className="text-[10px] opacity-70 ml-1">{tab.en}</span>
                                      </button>
                                    ))}
                                  </div>
                                  <p className="text-[11px] font-bold text-blue-600/60 flex items-center gap-2">
                                    <Info className="w-3.5 h-3.5" />
                                    ← {categorySubTabs[currentCategory.id].find(t => t.id === activeSubTab)?.info || "プランを選択してください"}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {currentCategory?.items
                        .filter(item => {
                          const hasTabs = currentCategory.items.length > 3;
                          if (!hasTabs) return true;
                          // If this category has tabs, only show matches. 
                          // If current activeSubTab doesn't belong to this category, show first tab by default
                          const availableTabIds = categorySubTabs[currentCategory.id]?.map(t => t.id) || [];
                          const isRelevantTab = availableTabIds.includes(activeSubTab);
                          if (!isRelevantTab) return item.subType === availableTabIds[0];
                          return item.subType === activeSubTab;
                        })
                        .map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => {
                              setSelectedItem(item);
                              setSelectedCategoryColor(categoryExplanations[currentCategory.id]?.color || 'blue');
                            }}
                            className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col relative group overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
                          >
                            <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden">
                              <img
                                src={item.image || "https://picsum.photos/seed/speaker/800/600"}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                              <div className="absolute top-4 right-4">
                                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                  {item.badge}
                                </span>
                              </div>
                            </div>
                            <div className="relative z-10">
                              <h4 className="text-2xl font-black mb-2 text-gray-900">{item.name}</h4>
                              <div className="text-3xl font-black text-blue-600 mb-6">{formatPrice(item.price)}</div>
                              <ul className="space-y-4 mb-8">
                                {item.features.map((f, j) => (
                                  <li key={j} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    {f}
                                  </li>
                                ))}
                              </ul>

                              {categoryExplanations[currentCategory.id]?.upgrades && (
                                <div className="mt-auto pt-6 border-t border-gray-100">
                                  <div className="flex items-center justify-between mb-4">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Upgrade Options</p>
                                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">差額でアップグレード可能</span>
                                  </div>
                                  <div className="grid grid-cols-1 gap-2">
                                    {categoryExplanations[currentCategory.id].upgrades?.map((upg, k) => (
                                      <div key={k} className="group/upg relative">
                                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100 group-hover/upg:border-blue-200 group-hover/upg:bg-blue-50 transition-all cursor-help">
                                          <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover/upg:text-blue-600 transition-colors">
                                              <upg.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-[11px] font-bold text-gray-700">{upg.title}</span>
                                          </div>
                                          <span className="text-[11px] font-black text-blue-600">{upg.price}</span>
                                        </div>

                                        {/* Hover Details */}
                                        <div className="absolute bottom-full left-0 right-0 mb-2 opacity-0 invisible group-hover/upg:opacity-100 group-hover/upg:visible transition-all z-20">
                                          <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-2xl text-[11px] leading-relaxed border border-white/10">
                                            <p className="font-bold mb-1 text-blue-400">{upg.title}</p>
                                            {upg.description}
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(item);
                                setSelectedCategoryColor(categoryExplanations[currentCategory.id]?.color || 'blue');
                              }}
                              className="mt-8 w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
                            >
                              PLAN DETAILS
                            </button>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        ) : (
          <motion.div
            key="main-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >

            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-2">
                {/* Left: Back Button */}
                <div className="flex-1 flex items-center">
                  <button
                    onClick={onBack}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors font-bold group shrink-0"
                    aria-label="トップに戻る"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Center: Title */}
                <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                  <Speaker className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  <h2 className="font-black text-sm md:text-xl tracking-tighter whitespace-nowrap">AUDIO MENU</h2>
                </div>

                {/* Right: Actions */}
                <div className="flex-1 flex items-center justify-end gap-1.5 md:gap-3">
                  {/* LINE Inquiry */}
                  <a
                    href="https://line.me/R/ti/p/@soundang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-[#06C755] text-white rounded-xl font-black transition-all hover:bg-[#05b34c] shadow-sm shrink-0"
                    aria-label="LINEで相談する"
                  >
                    <MessageSquare className="w-5 h-5 md:mr-2" />
                    <span className="hidden md:inline text-[10px]">LINE相談</span>
                  </a>

                  {/* Reservation */}
                  <button
                    onClick={() => scrollToSection('cta')}
                    className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-blue-600 text-white rounded-xl font-black transition-all hover:bg-blue-700 shadow-sm shrink-0"
                    aria-label="来店予約"
                  >
                    <Calendar className="w-5 h-5 md:mr-2" />
                    <span className="hidden md:inline text-[10px]">来店予約</span>
                  </button>

                  <div className="relative shrink-0">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors"
                      aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
                    >
                      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    <AnimatePresence>
                      {isMenuOpen && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 overflow-hidden"
                          >
                            <div className="space-y-3 mb-4 pb-4 border-b border-gray-100 md:hidden">
                              <a
                                href="https://line.me/R/ti/p/@soundang"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 w-full px-4 py-3 bg-[#06C755] text-white rounded-xl font-black text-xs shadow-sm"
                              >
                                <MessageSquare className="w-5 h-5" />
                                LINEで相談する
                              </a>
                              <button
                                onClick={() => scrollToSection('cta')}
                                className="flex items-center gap-3 w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-black text-xs shadow-sm"
                              >
                                <Calendar className="w-5 h-5" />
                                来店予約・お問い合わせ
                              </button>
                            </div>
                            <div className="space-y-1">
                              {navLinks.map((link) => (
                                <button
                                  key={link.id}
                                  onClick={() => scrollToSection(link.id)}
                                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-black text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-between group"
                                >
                                  {link.label}
                                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
              <SafeImage
                src={assets.audioMenuImage}
                className="absolute inset-0 w-full h-full object-cover scale-105"
                alt="高品質なカーオーディオシステム施工イメージ"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gray-50"></div>
              <div className="relative z-10 text-center px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-blue-400 font-black tracking-[0.3em] uppercase text-xs mb-6 block">Premium Car Audio Solution</span>
                  <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                    SOUND<br />EXPERIENCE
                  </h1>
                  <p className="text-gray-200 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                    「全部見せる」ではなく「選ばせてから全部見せる」。<br />
                    あなたの目的に合わせた、最適なオーディオプランをご提案します。
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Layer 1: Purpose Navigation */}
            <section id="purpose-nav" className="max-w-7xl mx-auto px-4 -mt-8 md:-mt-12 relative z-20 mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                {purposeNav.map((nav, i) => (
                  <motion.button
                    key={nav.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.3 }}
                    onClick={() => {
                      if (nav.id === 'knowledge-guide') {
                        const element = document.getElementById('knowledge-guide');
                        if (element) {
                          const bodyRect = document.body.getBoundingClientRect().top;
                          const elementRect = element.getBoundingClientRect().top;
                          window.scrollTo({ top: (elementRect - bodyRect) - 80, behavior: 'smooth' });
                        }
                        return;
                      }
                      setActiveCategory(nav.id as any);
                      setExpandedSection(nav.id);
                      setTimeout(() => {
                        const element = document.getElementById('plan-list');
                        if (element) {
                          const offset = 120;
                          const bodyRect = document.body.getBoundingClientRect().top;
                          const elementRect = element.getBoundingClientRect().top;
                          window.scrollTo({ top: (elementRect - bodyRect) - offset, behavior: 'smooth' });
                        }
                      }, 50);
                    }}
                    className={`group bg-white p-3 md:p-4 rounded-[1rem] md:rounded-[1.25rem] shadow-lg border transition-all text-left flex items-center gap-3 md:gap-4 h-full ${activeCategory === nav.id ? 'border-blue-500 ring-2 ring-blue-50' : 'border-white hover:border-blue-200'
                      }`}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${nav.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                      nav.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                        nav.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                          nav.color === 'red' ? 'bg-red-50 text-red-600' :
                            nav.color === 'sky' ? 'bg-white border border-sky-100 text-sky-500 shadow-sm' :
                              'bg-purple-50 text-purple-600'
                      }`}>
                      <nav.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h2 className={`font-black text-xs md:text-sm mb-0.5 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tighter ${nav.color === 'sky' ? 'text-sky-600' : 'text-gray-900'}`}>{nav.title}</h2>
                      <p className="text-[10px] text-gray-500 font-bold leading-tight line-clamp-1">{nav.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* Layer 2: Plan List */}
            <section id="plan-list" className="max-w-7xl mx-auto px-4 mb-32 scroll-mt-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <div className="w-6 md:w-8 h-1 bg-blue-600"></div>
                    <span className="text-blue-600 font-black tracking-widest uppercase text-[10px] md:text-xs">Plan Packages</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black tracking-tighter">プラン・パッケージ一覧</h2>
                </div>

                {/* Tab Bar / Accordion Controller */}
                <div className="sticky top-16 z-40 md:relative md:top-0 -mx-4 px-4 md:mx-0 md:px-0 py-3 bg-white/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border-b border-gray-100 md:border-none shadow-sm md:shadow-none">
                  <div className="flex overflow-x-auto pb-1 md:flex-wrap items-center gap-2 no-scrollbar">
                    <button
                      onClick={() => {
                        setActiveCategory('all');
                        setExpandedSection(null);
                      }}
                      className={`px-5 py-3 rounded-full text-[10px] md:text-xs font-black transition-all whitespace-nowrap min-h-[44px] ${activeCategory === 'all' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-700'}`}
                    >
                      すべて表示
                    </button>
                    {purposeNav.map(nav => (
                      <button
                        key={nav.id}
                        onClick={() => {
                          setActiveCategory(nav.id as any);
                          setExpandedSection(nav.id);
                          // Reset sub tab to the first one defined for the category
                          if (categorySubTabs[nav.id]) {
                            setActiveSubTab(categorySubTabs[nav.id][0].id);
                          }
                          const element = document.getElementById(`section-${nav.id}`);
                          if (element) {
                            const offset = 120;
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = element.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className={`px-5 py-3 rounded-full text-[10px] md:text-xs font-black transition-all whitespace-nowrap min-h-[44px] ${activeCategory === nav.id ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-700'}`}
                      >
                        {nav.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-24">
                {plans
                  .filter(p => ['speaker_package', 'bass_power', 'digital_source', 'install_tuning', 'custom_install'].includes(p.id))
                  .filter(p => activeCategory === 'all' || p.id === activeCategory)
                  .map((section, idx) => (
                    <motion.div
                      key={section.id}
                      id={`section-${section.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white md:bg-transparent rounded-3xl md:rounded-none overflow-hidden border border-gray-100 md:border-none shadow-sm md:shadow-none"
                    >
                      {/* Accordion Header for Mobile / Section Header for Desktop */}
                      <div
                        onClick={() => {
                          if (isMobile) {
                            setExpandedSection(expandedSection === section.id ? null : section.id);
                          }
                        }}
                        className={`flex items-center justify-between p-5 md:p-0 md:mb-8 transition-colors ${isMobile ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'}`}
                      >
                        <div className="flex items-center gap-3 md:gap-4 flex-grow">
                          <h3 className="text-sm md:text-2xl font-black tracking-tighter bg-gray-900 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full">
                            {section.category}
                          </h3>
                          <div className="hidden md:block flex-grow h-px bg-gray-200"></div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingFullList(section.id);
                              window.scrollTo(0, 0);
                            }}
                            className="hidden md:flex items-center gap-1.5 text-[10px] md:text-xs font-black text-blue-600 hover:text-blue-700 transition-colors group shrink-0"
                          >
                            すべて見る
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                          {isMobile && (
                            <div className="md:hidden">
                              <motion.div
                                animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronRight className="w-5 h-5 text-gray-500" />
                              </motion.div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Category Description Section */}
                      {section.showDescriptionInMenu && (section.description || (section.images && section.images.length > 0)) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => {
                            if (isMobile) {
                              setExpandedSection(expandedSection === section.id ? null : section.id);
                            }
                          }}
                          className={`px-4 md:px-0 mb-12 md:mb-20 relative ${isMobile ? 'cursor-pointer' : ''}`}
                        >
                          <div className="absolute -top-10 -left-4 text-[8rem] md:text-[12rem] font-black text-blue-600/[0.03] select-none pointer-events-none tracking-tighter leading-none z-0">
                            AUDIO
                          </div>
                          <div className={`relative z-10 bg-gradient-to-br from-white via-blue-50/10 to-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 overflow-hidden ${isMobile ? 'active:scale-[0.99] transition-transform duration-200' : ''}`}>
                            <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
                              {section.images && section.images.length > 0 && (
                                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                  {section.images.map((img, i) => (
                                    <div key={i} className={`relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 group ${section.images!.length === 1 ? 'sm:col-span-2 aspect-video' : 'aspect-square'}`}>
                                      <SafeImage
                                        src={img}
                                        alt={`${section.category} image ${i + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className={`w-full ${section.images && section.images.length > 0 ? 'lg:w-1/2' : 'lg:w-full'}`}>
                                <div className="flex items-center gap-3 mb-6 md:mb-8">
                                  <div className="w-10 h-[2px] bg-blue-600/30"></div>
                                  <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
                                    Category Story
                                  </span>
                                </div>
                                <h4 className="text-2xl md:text-4xl font-black mb-6 md:mb-10 tracking-tighter leading-[1.1] text-gray-900">
                                  {section.category}
                                </h4>
                                <div className="text-gray-600 font-medium text-base md:text-xl leading-relaxed whitespace-pre-wrap max-w-2xl mb-8">
                                  {renderHighlightedText(section.description || "", categoryExplanations[section.id]?.color || 'blue')}
                                </div>

                                {/* Dynamic Sub-category Tabs - Only show if > 3 items */}
                                {categorySubTabs[section.id] && section.items.length > 3 && (
                                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-6 border-t border-blue-600/10">
                                    <div className="flex bg-gray-900/5 p-1 rounded-2xl md:rounded-full backdrop-blur-sm border border-black/5">
                                      {categorySubTabs[section.id].map(tab => (
                                        <button
                                          key={tab.id}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveSubTab(tab.id);
                                            if (isMobile) {
                                              setExpandedSection(section.id);
                                            }
                                          }}
                                          className={`px-6 py-2.5 rounded-2xl md:rounded-full text-xs font-black transition-all ${activeSubTab === tab.id ? 'bg-white text-blue-600 shadow-xl' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                          {tab.label} <span className="text-[10px] opacity-70 ml-1">{tab.en}</span>
                                        </button>
                                      ))}
                                    </div>
                                    <p className="text-[11px] font-bold text-blue-600/60 flex items-center gap-2">
                                      <Info className="w-3.5 h-3.5" />
                                      ← {categorySubTabs[section.id].find(t => t.id === activeSubTab)?.info || (categorySubTabs[section.id] && categorySubTabs[section.id][0].info)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Content Area: Accordion on Mobile, Grid on Desktop */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: (!isMobile || expandedSection === section.id) ? 'auto' : 0,
                          opacity: (!isMobile || expandedSection === section.id) ? 1 : 0
                        }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 md:p-0 space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
                          {(section.items || [])
                            .filter(item => {
                              const hasTabs = section.items.length > 3;
                              if (!hasTabs) return true;
                              const availableTabIds = categorySubTabs[section.id]?.map(t => t.id) || [];
                              const isRelevantTab = availableTabIds.includes(activeSubTab);
                              if (!isRelevantTab) return item.subType === availableTabIds[0];
                              return item.subType === activeSubTab;
                            })
                            .slice(0, isMobile ? undefined : 3)
                            .map((item, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ y: !isMobile ? -10 : 0 }}
                                className="bg-white rounded-2xl md:rounded-[2.5rem] shadow-md md:shadow-xl border border-gray-100 flex flex-row md:flex-col relative group overflow-hidden"
                              >
                                {/* Mobile List Image / Desktop Card Image */}
                                <div className="relative w-32 h-20 md:h-48 shrink-0 md:w-full overflow-hidden">
                                  <img
                                    src={item.image || "https://picsum.photos/seed/speaker/800/600"}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
                                  <div className="absolute top-2 right-2 md:top-4 md:right-4">
                                    <span className="bg-blue-600 text-white text-[7px] md:text-[10px] font-black px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-widest shadow-lg">
                                      {item.badge}
                                    </span>
                                  </div>
                                </div>

                                <div className="p-4 md:p-8 pt-3 md:pt-4 relative z-10 flex flex-col flex-grow min-w-0">
                                  <div className="flex flex-col md:block mb-2 md:mb-0">
                                    <h4 className="text-sm md:text-2xl font-black text-gray-900 leading-tight truncate md:whitespace-normal mb-0.5 md:mb-1">
                                      {item.name}
                                    </h4>
                                    <div className="text-lg md:text-3xl font-black text-blue-600">
                                      {formatPrice(item.price)}
                                    </div>
                                  </div>

                                  <ul className="hidden md:block space-y-2.5 md:space-y-3 mb-6">
                                    {(item.features || []).slice(0, 3).map((f, j) => (
                                      <li key={j} className="flex items-start gap-2 text-xs md:text-sm font-bold text-gray-600">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                        <span className="leading-tight">{f}</span>
                                      </li>
                                    ))}
                                  </ul>

                                  {/* Mobile: Simple feature list */}
                                  <div className="md:hidden flex flex-wrap gap-1.5 mb-3">
                                    {(item.features || []).slice(0, 2).map((f, j) => (
                                      <span key={j} className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                        {f}
                                      </span>
                                    ))}
                                  </div>

                                  <button
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setSelectedCategoryColor(categoryExplanations[section.id]?.color || 'blue');
                                    }}
                                    className="mt-auto w-full bg-gray-900 text-white py-2 md:py-3.5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-xs tracking-widest hover:bg-blue-600 transition-all shadow-sm md:shadow-lg"
                                  >
                                    PLAN DETAILS
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                        </div>

                        {/* Bottom View All Button */}
                        {!isMobile && (
                          <div className="mt-6 md:mt-10 px-4 md:px-0">
                            <button
                              onClick={() => {
                                setViewingFullList(section.id);
                                // Reset sub tab to the first one defined for the category
                                if (categorySubTabs[section.id]) {
                                  setActiveSubTab(categorySubTabs[section.id][0].id);
                                }
                                window.scrollTo(0, 0);
                              }}
                              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-blue-100 text-blue-600 py-4 md:py-6 rounded-2xl md:rounded-[2.5rem] font-black text-xs md:text-lg tracking-widest hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm group"
                            >
                              <span className="hidden md:inline">{section.category}の全プランをチェックする</span>
                              <span className="md:hidden">{section.category}の全プランを見る</span>
                              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
              </div>
            </section>

            {/* Knowledge Guide Section */}
            <section id="knowledge-guide" className="py-20 md:py-32 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12 md:mb-20">
                  <span className="text-blue-600 font-black tracking-[0.4em] mb-4 md:mb-6 block text-[10px] md:text-sm">Audio Upgrade Guide</span>
                  <h2 className="text-3xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6 md:mb-8">
                    理想の音を見つける<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">アイデア集</span>
                  </h2>
                  <p className="text-gray-500 font-bold text-sm md:text-lg max-w-2xl mx-auto mb-10 md:mb-16">
                    カーオーディオの奥深い世界へようこそ。初めての方への導入ヒントから、最新トレンドの徹底解説まで、あなたの車をワンランク上の空間に変える情報をお届けします。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {(showAllGuides ? guides : guides.slice(0, 3)).map((guide) => (
                    <div key={guide.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col cursor-pointer"
                      onClick={() => {
                        setSelectedItem({
                          name: guide.title,
                          price: "0",
                          features: guide.features,
                          badge: guide.badge,
                          image: guide.image,
                          description: guide.description,
                          packageDetails: guide.packageDetails,
                          lineup: guide.lineup,
                          isGuide: true
                        });
                        setSelectedCategoryColor('sky');
                      }}>
                      <div className="h-48 md:h-64 relative overflow-hidden">
                        <SafeImage src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-4 md:top-6 left-4 md:left-6">
                          <span className="bg-blue-600 text-white text-[10px] md:text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg">
                            {guide.badge}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col flex-1">
                        <h3 className="text-lg md:text-2xl font-black text-gray-900 mb-4 leading-tight">
                          {guide.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                          {guide.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="text-[9px] md:text-xs font-bold text-gray-500 bg-gray-100/80 px-2 py-1 rounded-md">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-500 text-xs md:text-sm font-medium line-clamp-2 md:line-clamp-3 mb-6 md:mb-8 flex-1 leading-relaxed whitespace-pre-line">
                          {guide.description.split('\n')[0]}
                        </p>
                        <button className="flex items-center justify-center gap-3 w-full bg-gray-50 group-hover:bg-blue-50 text-gray-600 group-hover:text-blue-600 py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm transition-colors mt-auto">
                          <span>続きを読む</span>
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Guides Toggle */}
                {!showAllGuides && guides.length > 3 && (
                  <div className="mt-8 md:mt-12 px-4 md:px-0 flex justify-center">
                    <button
                      onClick={() => setShowAllGuides(true)}
                      className="w-full max-w-3xl flex items-center justify-center gap-3 bg-white border-2 border-blue-100 text-blue-600 py-3 md:py-5 rounded-2xl md:rounded-[2.5rem] font-black text-xs md:text-lg tracking-widest hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm group"
                    >
                      <span className="hidden md:inline">すべてのコラムをチェックする</span>
                      <span className="md:hidden">すべての記事を見る</span>
                      <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Audition Speakers Showcase Section */}
            <section id="options" className="py-20 md:py-32 bg-gray-900 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[150px]"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12 md:mb-20">
                  <span className="text-blue-400 font-black tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 block">Audition Units</span>
                  <h2 className="text-3xl md:text-8xl font-black text-white tracking-tighter mb-6 md:mb-8 leading-none">
                    常時試聴可能な<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">スピーカーのご紹介</span>
                  </h2>
                  <p className="text-gray-400 font-bold text-sm md:text-xl max-w-3xl mx-auto mb-10 md:mb-16 leading-relaxed">
                    百聞は一見（一聴）に如かず。ANGでは、国内外の厳選されたスピーカーを実際に聴き比べ、納得のいく音を見つけていただける環境を整えています。
                  </p>
                </div>

                {/* Dynamic Grid for Speakers */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-12 md:mb-24">
                  {auditionSpeakers.flatMap(brand =>
                    brand.units.map(unit => ({ ...unit, brand: brand.brand, origin: brand.origin }))
                  ).slice(0, 5).map((sp, i) => {
                    const layouts = [
                      { col: "md:col-span-8", row: "h-[300px] md:h-[500px]" },
                      { col: "md:col-span-4", row: "h-[300px] md:h-[500px]" },
                      { col: "md:col-span-4", row: "h-[300px] md:h-[450px]" },
                      { col: "md:col-span-4", row: "h-[300px] md:h-[450px]" },
                      { col: "md:col-span-4", row: "h-[300px] md:h-[450px]" }
                    ];
                    const layout = layouts[i] || { col: "md:col-span-4", row: "h-[300px] md:h-[400px]" };

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className={`relative ${layout.col} ${layout.row} rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-gray-900 group cursor-pointer`}
                        onClick={(e) => {
                          if (sp.image) {
                            e.stopPropagation();
                            setSelectedAuditionImage(sp.image);
                          } else {
                            setShowFullAuditionList(true);
                          }
                        }}
                      >
                        <SafeImage
                          src={sp.image || `https://picsum.photos/seed/speaker${i}/800/600`}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                          alt={sp.model}
                        />
                        {sp.image && (
                          <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                              <Search className="w-5 h-5 md:w-7 md:h-7" />
                            </div>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>

                        <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                          <div className="flex items-center gap-2 mb-2 md:mb-3">
                            <span className="px-2 py-0.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full">
                              {sp.brand} ({sp.origin})
                            </span>
                            {sp.status === 'Demo Car' && (
                              <span className="px-2 py-0.5 bg-green-600/20 border border-green-500/30 text-green-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full">
                                Demo Car
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl md:text-5xl font-black text-white mb-1 md:mb-4 tracking-tighter leading-none">
                            {sp.model}
                          </h3>

                          <p className="text-gray-400 font-bold text-[10px] md:text-lg leading-relaxed line-clamp-2">
                            {sp.description || "試聴室にて実際の音調をご確認いただけます。豊かな音楽体験をANGで。"}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-12">
                    <button
                      onClick={() => setShowFullAuditionList(!showFullAuditionList)}
                      className={`relative px-8 md:px-16 py-4 md:py-8 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xs md:text-xl tracking-widest transition-all shadow-2xl flex items-center gap-3 md:gap-6 group ${showFullAuditionList ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 hover:bg-blue-600 hover:text-white'
                        }`}
                    >
                      <Speaker className={`w-5 h-5 md:w-8 md:h-8 ${showFullAuditionList ? 'animate-pulse' : ''}`} />
                      {showFullAuditionList ? '試聴スピーカー一覧を閉じる' : `試聴スピーカー一覧を見る (${auditionSpeakers.length}ブランド)`}
                      <ChevronRight className={`w-4 h-4 md:w-6 md:h-6 transition-transform ${showFullAuditionList ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {showFullAuditionList && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full overflow-hidden"
                      >
                        {auditionSpeakers.length === 0 ? (
                          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-gray-500 font-bold mb-4">データが読み込めませんでした。</p>
                            <button onClick={() => window.location.reload()} className="text-blue-400 underline">ページを再読み込みする</button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 md:px-4 pb-24">
                            {auditionSpeakers.map((brand, bIdx) => (
                              <div key={bIdx} className="space-y-4">
                                <div className="flex items-center gap-3 border-b border-white/10 pb-2 mb-4">
                                  <h4 className="text-lg md:text-xl font-black text-white">{brand.brand}</h4>
                                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">{brand.origin}</span>
                                </div>
                                <div className="space-y-2">
                                  {brand.units.map((unit, uIdx) => (
                                    <div key={uIdx} className="group p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-blue-500/30 transition-all flex gap-4">
                                      {unit.image && (
                                        <div
                                          className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 cursor-zoom-in relative group/img"
                                          onClick={() => setSelectedAuditionImage(unit.image!)}
                                        >
                                          <SafeImage src={unit.image} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" alt={unit.model} />
                                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                            <Search className="w-4 h-4 text-white" />
                                          </div>
                                        </div>
                                      )}
                                      <div className="flex-1 flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                          <div className="text-white font-bold text-xs md:text-sm group-hover:text-blue-400 transition-colors uppercase tracking-tight">{unit.model}</div>
                                          <div className="flex items-center gap-1.5 shrink-0">
                                            <div className={`w-1 h-1 rounded-full ${unit.status === 'Demo Car' ? 'bg-blue-400' : 'bg-green-400'}`}></div>
                                            <span className={`text-[8px] font-black uppercase tracking-tighter ${unit.status === 'Demo Car' ? 'text-blue-400' : 'text-green-400'}`}>
                                              {unit.status === 'Demo Car' ? 'DEMO' : 'AVAIL'}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                          <div className="text-[10px] md:text-xs font-black text-blue-500">
                                            {unit.price === 'Open' ? 'OPEN' : `${parseInt(unit.price || "0").toLocaleString()}円`}
                                            {unit.taxExcluded && <span className="text-gray-600 text-[8px] ml-1 font-bold">({parseInt(unit.taxExcluded).toLocaleString()}円税抜)</span>}
                                          </div>
                                          {unit.youtube && (
                                            <a
                                              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                                                typeof unit.youtube === 'string' && unit.youtube !== 'true'
                                                  ? unit.youtube
                                                  : `${brand.brand} ${unit.model}`
                                              )}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="flex items-center gap-1 text-[8px] font-black text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                                            >
                                              <Youtube className="w-2.5 h-2.5" />
                                              SAMPLE
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* Layer 3: Category Details */}
            <section id="category-details" className="py-20 md:py-32 max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-4 mb-10 md:mb-16">
                <h2 className="text-2xl md:text-4xl font-black tracking-tighter">カテゴリー詳細</h2>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setViewingCategoryDetail(cat.id)}
                    className="bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-gray-50 hover:border-blue-200 transition-all group text-left flex flex-col"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <cat.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="font-black text-xs md:text-lg mb-2 md:mb-4 text-gray-900 leading-tight">{cat.title}</h4>
                    <div className="mt-auto pt-2 flex items-center gap-1 text-[8px] md:text-[9px] font-black text-blue-600">
                      DETAILS <ChevronRight className="w-2 h-2" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Recruitment Section */}
            <RecruitmentSection data={audioRecruitment} />

            {/* CTA Section */}
            <section id="cta" className="py-20 px-4">
              <div className="max-w-5xl mx-auto bg-gray-900 rounded-[4rem] p-16 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -ml-48 -mb-48"></div>

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
                    理想の音響空間を、<br />共に創り上げましょう。
                  </h2>
                  <p className="text-gray-400 mb-12 max-w-xl mx-auto font-bold leading-relaxed">
                    車種やご予算、好みの音楽ジャンルに合わせて、最適なプランをシミュレーションいたします。
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                      href="https://line.me/R/ti/p/@soundang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-[#06C755] text-white px-12 py-5 rounded-[2rem] font-black shadow-xl shadow-green-500/20 hover:bg-[#05b34c] transition-all flex items-center justify-center gap-3 text-lg tracking-widest"
                    >
                      <MessageCircle className="w-6 h-6" />
                      LINEで相談する
                    </a>
                    <button
                      onClick={onBack}
                      className="w-full sm:w-auto bg-white text-gray-900 px-12 py-5 rounded-[2rem] font-black hover:bg-gray-100 transition-all text-lg tracking-widest"
                    >
                      お問い合わせ
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MessageCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z" />
  </svg>
);
