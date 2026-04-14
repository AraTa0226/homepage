import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import { RecruitmentSection } from '../Shared/RecruitmentSection';
import { SafeImage } from '../ui/SafeImage';
import {
  ArrowLeft,
  Shield,
  ShieldCheck,
  Lock,
  Eye,
  Bell,
  Smartphone,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Info,
  Search,
  Filter,
  Star,
  Car,
  Settings2,
  LayoutGrid,
  List,
  Menu,
  X,
  Calendar,
  MessageSquare,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface SecurityMenuDetailProps {
  onBack: () => void;
  onNavigateToDashcam?: () => void;
}

export const SecurityMenuDetail: React.FC<SecurityMenuDetailProps> = ({ onBack, onNavigateToDashcam }) => {
  const { assets } = useSite();
  const { plans, securityStatus, securityRecruitment } = usePrices();
  const { planSlug } = useParams<{ planSlug: string }>();
  const [activeCategory, setActiveCategory] = useState<'all' | 'security_panthera' | 'security_grgo' | 'security_digital' | 'dashcam'>('all');
  const [viewingFullList, setViewingFullList] = useState<string | null>(null);
  const [viewingCategoryDetail, setViewingCategoryDetail] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const achievementsScrollRef = useRef<HTMLDivElement>(null);
  const [activeAchievementIndex, setActiveAchievementIndex] = useState(0);

  useEffect(() => {
    // Handle planSlug from URL
    if (planSlug && plans.length > 0) {
      // Strip .html extension if present
      const cleanSlug = planSlug.replace(/\.html$/, '');
      for (const category of plans) {
        const found = category.items.find((item: any) => item.slug === cleanSlug);
        if (found) {
          setSelectedItem(found);
          // Map category.id to activeCategory if possible
          if (category.id === 'security_basic' || category.id === 'security_advanced') {
            // Basic matching or default to 'all'
          }
          break;
        }
      }
    }
  }, [planSlug, plans]);

  const handleAchievementsScroll = () => {
    if (achievementsScrollRef.current) {
      const { scrollLeft, offsetWidth } = achievementsScrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveAchievementIndex(index);
    }
  };

  const scrollToAchievementIndex = (index: number) => {
    if (achievementsScrollRef.current) {
      const { offsetWidth } = achievementsScrollRef.current;
      achievementsScrollRef.current.scrollTo({
        left: index * offsetWidth,
        behavior: 'smooth'
      });
      setActiveAchievementIndex(index);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const securityBrands = [
    {
      name: "Panthera",
      description: "日本最高峰のセキュリティ性能。誤作動を極限まで抑えた高度なアルゴリズム。",
      image: assets.securityMenuImage,
      id: "security_panthera"
    },
    {
      name: "Grgo",
      description: "日本の環境に最適化された使いやすさと信頼性。多彩なセンサー拡張が可能。",
      image: assets.securityMenuImage,
      id: "security_grgo"
    },
    {
      name: "VIPER",
      description: "世界で最も有名なセキュリティブランド。エンジンスターター内蔵モデルが人気。",
      image: assets.securityMenuImage,
      id: "security_viper"
    },
    {
      name: "CLIFFORD",
      description: "「全米で1台も盗まれたことがない」伝説を持つ、世界最高峰の信頼性。",
      image: assets.securityMenuImage,
      id: "security_clifford"
    }
  ];

  const categoryExplanations: Record<string, any> = {
    security_panthera: {
      title: "Panthera (パンテーラ)",
      subtitle: "日本最高峰のセキュリティ性能。誤作動を極限まで抑えた高度なアルゴリズム。",
      description: "日本の駐車環境に合わせた独自アルゴリズムを採用。3ゾーン衝撃センサーやデジタル傾斜センサーにより、レッカー盗難や部品盗難も確実に検知します。ドラレコ連動機能も搭載。",
      sampleDescription: "【施工例】ランドクルーザー300 ＋ Panthera Z706：フルセンサー構成に加え、デジタルイモビライザーでエンジン始動を制御。ドラレコ連動で異常時の証拠も確実に残します。",
      benefits: [
        "日本国内の環境に特化した高精度センサー",
        "3ゾーン衝撃センサーで誤作動を防止",
        "ドライブレコーダー連動機能（モデルによる）",
        "SPS（スーパープロショップ）認定店による精密施工"
      ],
      image: assets.securityMenuImage,
      icon: ShieldCheck,
      color: "purple",
      upgrades: [
        { title: "スマートキー連動", price: "+¥22,000〜", icon: Smartphone, description: "純正スマートキーの操作にセキュリティを連動させます。" },
        { title: "バックアップサイレン", price: "+¥22,000〜", icon: Bell, description: "バッテリーを外されても自立電源で鳴り続ける最強のサイレン。" }
      ]
    },
    security_grgo: {
      title: "Grgo (ゴルゴ)",
      subtitle: "日本の環境に最適化された使いやすさと信頼性。多彩なセンサー拡張が可能。",
      description: "視認性の高いアンサーバックリモコンが特徴。ユーザーの環境に合わせて感度調整が細かく設定でき、初めてのセキュリティ導入にも最適です。",
      sampleDescription: "【施工例】アルファード ＋ Grgo ZV：アンサーバックリモコンで車両状態を常に把握。純正キーレス連動により、普段通りの操作で防犯性能を最大化します。",
      benefits: [
        "アンサーバックリモコンで異常を即座に通知",
        "多彩なオプションセンサーでカスタマイズ可能",
        "暗証番号式解除機能で万が一の際も安心",
        "SPS認定店による高度なセッティング"
      ],
      image: assets.securityMenuImage,
      icon: Shield,
      color: "blue",
      upgrades: [
        { title: "マイクロ波センサー", price: "+¥16,500〜", icon: Eye, description: "車両への接近を検知。窓越しに中を覗き込む行為に反応します。" },
        { title: "トリプルセンサー", price: "+¥11,000〜", icon: AlertTriangle, description: "衝撃センサーの精度をさらに高め、微細な振動も逃しません。" }
      ]
    },
    security_viper: {
      title: "VIPER (バイパー)",
      subtitle: "世界シェアNo.1。エンジンスターターやスマホ連動など、利便性と防犯を両立。",
      description: "世界中で愛用される信頼のブランド。最新のDS4シリーズは車両のデジタル通信に対応し、純正キーレス連動やエンジンスターター機能をスマートに実現します。",
      sampleDescription: "【施工例】プラド ＋ VIPER DS4V：エンジンスターター機能で夏冬も快適。純正キーレス連動で操作もスムーズ。スマホからのコントロールも可能です。",
      benefits: [
        "世界トップクラスの認知度と信頼性",
        "エンジンスターター内蔵モデルが豊富",
        "スマホアプリからの操作・状態確認に対応",
        "純正キーレス連動でスマートな操作感"
      ],
      image: assets.securityMenuImage,
      icon: ShieldCheck,
      color: "blue",
      upgrades: [
        { title: "ボイスモジュール", price: "+¥16,500〜", icon: Bell, description: "「Viper Armed」など、英語の音声で威嚇・通知を行います。" },
        { title: "スマホ連動ユニット", price: "+¥33,000〜", icon: Smartphone, description: "専用アプリからドアロックやエンジン始動が可能になります。" }
      ]
    },
    security_clifford: {
      title: "CLIFFORD (クリフォード)",
      subtitle: "「絶対に盗ませない」世界最高峰の信頼。独自のダブルイモビライザーを搭載。",
      description: "セキュリティの代名詞とも言えるブランド。独自の「ブラックジャックス」システムや、感度調整が極めて精密なオムニセンサーにより、鉄壁の守りを提供します。",
      sampleDescription: "【施工例】スカイラインGT-R ＋ CLIFFORD G6：オムニセンサーで微細な振動も検知。ダブルイモビライザーで自走盗難を物理的に阻止します。",
      benefits: [
        "独自のダブルイモビライザーによる強力な自走防止",
        "誤作動を極限まで抑える高精度オムニセンサー",
        "ブラックジャックスによる強固な認証システム",
        "最高級のステータスと安心感"
      ],
      image: assets.securityMenuImage,
      icon: ShieldCheck,
      color: "indigo",
      upgrades: [
        { title: "オムニセンサー", price: "+¥22,000〜", icon: Zap, description: "衝撃の強弱を精密に判別し、誤作動なく警報を鳴らします。" },
        { title: "リモートエンジン始動", price: "+¥44,000〜", icon: Zap, description: "クリフォードのリモコンからエンジン始動が可能になります。" }
      ]
    },
    dashcam: {
      title: "ドラレコ連動機能",
      subtitle: "セキュリティの警報に連動して、ドラレコを強制録画。",
      description: "PantheraやGrgoのセンサーが異常を検知した際、ドライブレコーダーの電源を強制的にONにして録画を開始します。駐車中の当て逃げやいたずらの証拠を確実に残すための必須オプションです。",
      sampleDescription: "【施工例】Grgo ZV ＋ 前後ドラレコ連動：不審者の接近をマイクロ波センサーが検知すると、ドラレコが即座に録画を開始。手元のリモコンにも通知が届きます。",
      benefits: [
        "セキュリティ警報時に自動で録画を開始",
        "駐車監視モードよりも確実に証拠を記録",
        "バッテリー負荷を抑えつつ、必要な時だけ録画",
        "最新のデジタルミラー型ドラレコにも対応"
      ],
      image: assets.dashcamMenuImage,
      icon: Eye,
      color: "indigo",
      upgrades: [
        { title: "ドラレコ本体ラインナップ", price: "詳細はこちら", icon: LayoutGrid, description: "単体での取り付けや、最新モデルの詳細はドラレコ専用ページをご覧ください。", onClick: onNavigateToDashcam },
        { title: "セキュリティ連動ユニット", price: "+¥11,000〜", icon: Shield, description: "セキュリティの警報に連動して、ドラレコの電源を強制ONにします。" }
      ]
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
    { id: 'achievements', label: '当店の強み' },
    { id: 'purpose-nav', label: '目的別ナビ' },
    { id: 'car-type-nav', label: '車種別おすすめ' },
    { id: 'plan-list', label: 'プラン一覧' },
    { id: 'brands', label: '取扱いブランド' },
    { id: 'diagnosis', label: 'セキュリティー診断' },
    { id: 'cta', label: 'お問い合わせ' },
  ];

  const achievements = [
    {
      title: "九州No.1の施工実績",
      desc: "長年の経験と膨大な施工データに基づき、車種ごとの弱点を熟知した最適なインストールを行います。",
      icon: Star,
      badge: "KYUSHU #1",
      image: assets.kyushuNo1Image
    },
    {
      title: "SPS認定店 (Grgo/Panthera)",
      desc: "メーカーから高度な技術力を認められた「スーパープロショップ」認定店。専門店ならではの精密なセッティングが可能です。",
      icon: ShieldCheck,
      badge: "CERTIFIED",
      image: assets.spsCertifiedImage
    },
    {
      title: "Snap-on 診断機完備",
      desc: "高性能なSnap-on診断機を導入。施工後のエラーチェックはもちろん、万が一の車両トラブルにも迅速に対応可能です。",
      icon: Settings2,
      badge: "HIGH-TECH",
      image: assets.snaponImage
    },
    {
      title: "バッテリー充電器完備",
      desc: "施工中や長期預かり時もバッテリーコンディションを最適に維持。安心してお車をお預けいただけます。",
      icon: Zap,
      badge: "SAFETY",
      image: assets.batteryChargerImage
    }
  ];

  const carTypeRecommendations = [
    {
      type: "SUV / ランドクルーザー / アルファード",
      recommend: "Panthera Z706 + CLIFFORD G6",
      image: assets.securityMenuImage,
      desc: "最も盗難リスクの高い車種には、最高峰のアナログセキュリティとダブルイモビライザーの組み合わせを推奨します。",
    },
    {
      type: "スポーツカー / プレミアムセダン",
      recommend: "Grgo ZV + VIPER DS4",
      image: assets.securityMenuImage,
      desc: "スマートキーの利便性を活かしつつ、エンジンスターター機能も追加。アンサーバックリモコンで常に状態を確認できます。",
    },
    {
      type: "コンパクトカー / 軽自動車",
      recommend: "Grgo Vシリーズ / VIPER 330V",
      image: assets.securityMenuImage,
      desc: "車上荒らし対策をメインに、必要最小限かつ確実な防犯性能を。純正キーレス連動のスマートな対策が人気です。",
    }
  ];

  const purposeNav = [
    { id: 'security_panthera', title: "最高峰で守りたい", desc: "Panthera Zシリーズ", icon: ShieldCheck, color: "purple" },
    { id: 'security_grgo', title: "バランス良く守りたい", desc: "Grgo Vシリーズ", icon: Shield, color: "blue" },
    { id: 'security_viper', title: "利便性も重視したい", desc: "VIPER DS4 / 5706V", icon: Smartphone, color: "blue" },
    { id: 'security_clifford', title: "鉄壁の守りが欲しい", desc: "CLIFFORD G6 / Matrix", icon: Lock, color: "indigo" },
  ];

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500 text-blue-600",
    purple: "bg-purple-500 text-purple-600",
    indigo: "bg-indigo-500 text-indigo-600",
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-50 pb-24">
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
                    src={selectedItem.image || "https://picsum.photos/seed/security/1200/800"}
                    className="w-full h-full object-cover"
                    alt={selectedItem.name + "のセキュリティシステム"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg mb-4 inline-block">
                      {selectedItem.badge || "Security Plan"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
                      {selectedItem.name}
                    </h2>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex-grow">
                      <div className="mb-10">
                        <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          Description
                        </h3>
                        <p className="text-gray-600 text-lg font-bold leading-relaxed whitespace-pre-wrap">
                          {selectedItem.description || "詳細な説明は現在準備中です。施工内容や適合車種については、お気軽にお問い合わせください。"}
                        </p>
                      </div>

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
                    </div>

                    <div className="w-full md:w-80 shrink-0">
                      <div className="bg-gray-900 rounded-[2rem] p-8 text-white sticky top-0">
                        <div className="mb-8">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Price (Tax Incl.)</p>
                          <div className="text-4xl font-black text-blue-400 tracking-tighter">
                            {formatPrice(selectedItem.price)}
                          </div>
                          <p className="text-[10px] text-gray-500 mt-2">※取付工賃・ショートパーツ込み</p>
                        </div>

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
                  </div>
                </div>
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
                      <SafeImage src={detail.image} className="w-full h-full object-cover" alt={detail.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 ${colorClasses[detail.color].split(' ')[0]} text-white shadow-lg`}>
                          <detail.icon className="w-7 h-7 md:w-8 md:h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">{detail.title}</h1>
                        <p className="text-lg md:text-xl text-gray-200 font-bold leading-tight">{detail.subtitle}</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-gray-100 mb-12">
                      <div className="mb-16">
                        <h3 className="text-2xl font-black mb-6 text-gray-900 flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full ${colorClasses[detail.color].split(' ')[0]}`}></div>
                          解説
                        </h3>
                        <p className="text-gray-600 text-lg font-medium leading-relaxed mb-12">{detail.description}</p>
                        <div className={`p-8 rounded-[2.5rem] ${colorClasses[detail.color].split(' ')[1].replace('text-', 'bg-').replace('600', '50')} border border-current/10`}>
                          <h4 className={`text-sm font-black mb-4 uppercase tracking-[0.2em] ${colorClasses[detail.color].split(' ')[1]}`}>Sample Description</h4>
                          <p className="text-gray-800 font-bold leading-relaxed italic">{detail.sampleDescription}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-black mb-8 text-gray-900 flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full ${colorClasses[detail.color].split(' ')[0]}`}></div>
                          施工のメリット
                        </h3>
                        <div className="grid gap-6">
                          {detail.benefits.map((benefit: string, i: number) => (
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
                            {detail.upgrades.map((upgrade: any, i: number) => (
                              <div key={i}
                                onClick={upgrade.onClick}
                                className={`bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group ${upgrade.onClick ? 'cursor-pointer hover:bg-blue-900' : ''}`}
                              >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                                <div className="relative z-10">
                                  <div className="flex items-center justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[detail.color].split(' ')[0]}`}>
                                      <upgrade.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-blue-400 font-black text-sm">{upgrade.price}</span>
                                  </div>
                                  <h4 className="text-xl font-black mb-3">{upgrade.title}</h4>
                                  <p className="text-gray-400 text-sm font-bold leading-relaxed">{upgrade.description}</p>
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
                          setViewingFullList(viewingCategoryDetail);
                          setViewingCategoryDetail(null);
                          window.scrollTo(0, 0);
                        }}
                        className="flex-grow bg-gray-900 text-white py-6 rounded-[2rem] font-black text-lg tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-200"
                      >
                        プラン一覧を見る
                      </button>
                      <button onClick={() => setViewingCategoryDetail(null)} className="flex-grow bg-white text-gray-900 py-6 rounded-[2rem] font-black text-lg tracking-widest border border-gray-200 hover:bg-gray-50 transition-all">
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
                        onClick={() => { setViewingFullList(null); window.scrollTo(0, 0); }}
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
                        className="mb-16"
                      >
                        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 border border-gray-200 overflow-hidden relative shadow-sm group">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 via-transparent to-gray-50/20"></div>
                          {/* Watermark Background */}
                          <div className="absolute -right-8 -bottom-8 text-[12rem] font-black text-emerald-900/[0.03] select-none pointer-events-none tracking-tighter leading-none group-hover:text-emerald-900/[0.05] transition-colors duration-1000">
                            SECURITY
                          </div>

                          <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-start relative z-10">
                            {currentCategory.images && currentCategory.images.length > 0 && (
                              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {currentCategory.images.map((img, i) => (
                                  <div key={i} className={`relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group/img ${currentCategory.images!.length === 1 ? 'sm:col-span-2 aspect-video' : 'aspect-square'}`}>
                                    <SafeImage
                                      src={img}
                                      alt={`${currentCategory.category} image ${i + 1}`}
                                      className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-emerald-900/10 group-hover/img:bg-transparent transition-colors duration-700"></div>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className={`w-full ${currentCategory.images && currentCategory.images.length > 0 ? 'lg:w-1/2' : 'lg:w-full'}`}>
                              <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                                  <ShieldCheck className="w-6 h-6" />
                                </div>
                                <span className="text-emerald-600 font-black tracking-[0.3em] uppercase text-xs md:text-sm">Category Insight</span>
                              </div>
                              <h4 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter leading-[1.1] text-gray-900">
                                {currentCategory.category}<span className="text-emerald-600">.</span>
                              </h4>
                              <div className="text-gray-600 font-bold text-base md:text-xl leading-relaxed whitespace-pre-wrap max-w-2xl">
                                {currentCategory.description}
                              </div>

                              <div className="mt-12 pt-8 border-t border-emerald-100 flex items-center gap-4 text-emerald-600">
                                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
                                <span className="text-xs font-black tracking-widest uppercase">Expert Installation Guaranteed</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {currentCategory?.items.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => setSelectedItem(item)}
                          className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col relative group overflow-hidden cursor-pointer"
                        >
                          <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden">
                            <SafeImage src={item.image || "https://picsum.photos/seed/security/800/600"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4">
                              <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{item.badge}</span>
                            </div>
                          </div>
                          <div className="relative z-10">
                            <h4 className="text-2xl font-black mb-2 text-gray-900">{item.name}</h4>
                            <div className="text-3xl font-black text-blue-600 mb-6">{formatPrice(item.price)}</div>
                            <ul className="space-y-4 mb-8">
                              {(item.features || []).map((f, j) => (
                                <li key={j} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                            }}
                            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
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
                <div className="flex-1 flex items-center">
                  <button
                    onClick={onBack}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors font-bold group shrink-0"
                    aria-label="トップに戻る"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  <h2 className="font-black text-sm md:text-xl tracking-tighter whitespace-nowrap">SECURITY MENU</h2>
                </div>
                <div className="flex-1 flex items-center justify-end gap-1.5 md:gap-3">
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
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
                          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 overflow-hidden">
                            <div className="space-y-1">
                              {navLinks.map((link) => (
                                <button key={link.id} onClick={() => scrollToSection(link.id)} className="w-full text-left px-4 py-3 rounded-xl text-sm font-black text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-between group">
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
            <section className="relative py-20 md:py-32 overflow-hidden bg-gray-900">
              <div className="absolute inset-0 opacity-40">
                <SafeImage
                  src={assets.securityMenuImage}
                  className="w-full h-full object-cover"
                  alt="高度なカーセキュリティシステムの施工イメージ"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>
              </div>
              <div className="relative max-w-7xl mx-auto px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-6 shadow-lg shadow-blue-600/20">
                    Vehicle Security Systems
                  </span>
                  <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                    PROTECT YOUR<br /><span className="text-blue-500">VALUABLES.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-400 font-bold max-w-2xl mx-auto leading-relaxed">
                    最新の盗難手口から愛車をガード。確かな技術と信頼のシステムで、あなたに「安心」という最高の贅沢をお届けします。
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Security Status Alert */}
            {securityStatus && (
              <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-30">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl border-2 border-blue-600 flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-blue-600 font-black text-xs uppercase tracking-widest mb-1">Current Status</h3>
                    <p className="text-gray-900 font-black text-lg md:text-xl leading-tight whitespace-pre-wrap">
                      {securityStatus}
                    </p>
                  </div>
                  <button
                    onClick={() => scrollToSection('cta')}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-sm tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 shrink-0"
                  >
                    相談予約
                  </button>
                </motion.div>
              </div>
            )}

            {/* Achievements Section */}
            <section id="achievements" className="py-20 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-4">
                <div
                  ref={achievementsScrollRef}
                  onScroll={handleAchievementsScroll}
                  className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide"
                >
                  {achievements.map((item, i) => (
                    <div key={i} className="min-w-[280px] md:min-w-0 bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 relative group flex flex-col snap-center">
                      <div className="h-40 overflow-hidden relative">
                        <SafeImage src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <span className="text-[8px] font-black tracking-widest text-blue-600 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">{item.badge}</span>
                        </div>
                      </div>
                      <div className="p-8 pt-4 flex-grow">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform -mt-10 relative z-10">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black mb-3 text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Dots for Mobile */}
                <div className="flex justify-center gap-1 mt-6 md:hidden">
                  {achievements.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToAchievementIndex(i)}
                      className="w-12 h-12 flex items-center justify-center group"
                      aria-label={`Go to slide ${i + 1}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeAchievementIndex === i ? 'bg-blue-600 w-4' : 'bg-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Purpose Navigation */}
            <section id="purpose-nav" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">WHAT IS YOUR PURPOSE?</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">目的から探す</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {purposeNav.map((item, i) => (
                    <button key={i} onClick={() => { setViewingCategoryDetail(item.id); window.scrollTo(0, 0); }} className="group relative bg-gray-50 rounded-[2rem] p-8 text-left border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all overflow-hidden">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' : item.color === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-indigo-100 text-indigo-600'}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight">{item.title}</h3>
                      <p className="text-xs text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Car Type Recommendations */}
            <section id="car-type-nav" className="py-20 bg-gray-900 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-white">RECOMMENDED BY CAR TYPE</h2>
                    <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">車種別おすすめモデル</p>
                  </div>
                  <button
                    onClick={() => { setViewingFullList('security_car'); window.scrollTo(0, 0); }}
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all border border-white/10 flex items-center gap-2"
                  >
                    一覧を見る
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
                  {carTypeRecommendations.map((item, i) => {
                    const itemId = `car-type-${i}`;
                    return (
                      <div key={i} className="bg-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 group hover:bg-white/10 transition-all">
                        <div
                          onClick={() => isMobile && setExpandedSection(expandedSection === itemId ? null : itemId)}
                          className={`flex items-center justify-between p-6 md:p-0 md:block ${isMobile ? 'cursor-pointer' : ''}`}
                        >
                          <div className="flex items-center gap-4 md:block">
                            <div className="w-16 h-16 md:w-full md:h-48 rounded-xl md:rounded-none overflow-hidden shrink-0">
                              <SafeImage src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.type} />
                            </div>
                            <div className="md:p-8 md:pb-0">
                              <h3 className="text-blue-400 text-[10px] md:text-xs font-black tracking-widest uppercase mb-1 md:mb-2">{item.type}</h3>
                              <h4 className="text-lg md:text-xl font-black text-white md:mb-4">{item.recommend}</h4>
                            </div>
                          </div>
                          {isMobile && (
                            <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform ${expandedSection === itemId ? 'rotate-180' : ''}`}>
                              <ChevronRight className="w-4 h-4 text-white rotate-90" />
                            </div>
                          )}
                        </div>

                        <AnimatePresence>
                          {(!isMobile || expandedSection === itemId) && (
                            <motion.div
                              initial={isMobile ? { height: 0, opacity: 0 } : {}}
                              animate={isMobile ? { height: 'auto', opacity: 1 } : {}}
                              exit={isMobile ? { height: 0, opacity: 0 } : {}}
                            >
                              <div className="px-6 pb-6 md:px-8 md:pb-8">
                                <p className="text-sm text-gray-400 font-bold leading-relaxed">{item.desc}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom View All Button for Car Type Recommendations */}
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => { setViewingFullList('security_car'); window.scrollTo(0, 0); }}
                    className="w-full md:w-auto flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-4 px-12 rounded-2xl font-black text-xs md:text-lg tracking-widest hover:bg-white/10 transition-all shadow-sm group"
                  >
                    車種別おすすめモデルをすべて見る
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* Plan List with Accordion for Mobile */}
            <section id="plan-list" className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">SECURITY PACKAGES</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">プラン一覧</p>
                </div>

                <div className="space-y-4 md:space-y-8">
                  {plans.filter(p => p.id.startsWith('security') && p.id !== 'security_car').map((category) => (
                    <div key={category.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
                      <div
                        onClick={() => isMobile && setExpandedSection(expandedSection === category.id ? null : category.id)}
                        className={`w-full px-8 py-8 flex items-center justify-between text-left transition-colors ${isMobile ? 'hover:bg-gray-50 cursor-pointer' : ''}`}
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Shield className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-black tracking-tight">{category.category}</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{category.items.length} MODELS AVAILABLE</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); setViewingFullList(category.id); window.scrollTo(0, 0); }}
                            className="hidden md:flex bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-2 rounded-xl font-black text-[10px] tracking-widest transition-all items-center gap-2"
                          >
                            一覧を見る
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          {isMobile && (
                            <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-transform ${expandedSection === category.id ? 'rotate-180' : ''}`}>
                              <ChevronRight className="w-5 h-5 rotate-90" />
                            </div>
                          )}
                        </div>
                      </div>

                      <AnimatePresence>
                        {(!isMobile || expandedSection === category.id) && (
                          <motion.div
                            initial={isMobile ? { height: 0, opacity: 0 } : {}}
                            animate={isMobile ? { height: 'auto', opacity: 1 } : {}}
                            exit={isMobile ? { height: 0, opacity: 0 } : {}}
                            className="border-t border-gray-50"
                          >
                            {/* Category Description Section */}
                            {category.showDescriptionInMenu && (category.description || (category.images && category.images.length > 0)) && (
                              <div className="px-4 md:px-8 py-12 border-b border-gray-50 bg-gray-50/10">
                                <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-gray-200 overflow-hidden relative shadow-sm group">
                                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 via-transparent to-gray-50/20"></div>
                                  {/* Watermark Background */}
                                  <div className="absolute -right-4 -bottom-4 text-7xl md:text-9xl font-black text-emerald-900/[0.03] select-none pointer-events-none tracking-tighter leading-none group-hover:text-emerald-900/[0.05] transition-colors duration-1000">
                                    SECURITY
                                  </div>

                                  <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start relative z-10">
                                    {category.images && category.images.length > 0 && (
                                      <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {category.images.map((img, i) => (
                                          <div key={i} className={`relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl group/img ${category.images!.length === 1 ? 'sm:col-span-2 aspect-video' : 'aspect-square'}`}>
                                            <SafeImage
                                              src={img}
                                              alt={`${category.category} image ${i + 1}`}
                                              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-emerald-900/5 group-hover/img:bg-transparent transition-colors duration-700"></div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <div className={`w-full ${category.images && category.images.length > 0 ? 'lg:w-1/2' : 'lg:w-full'}`}>
                                      <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                                          <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <span className="text-emerald-600 font-black tracking-[0.2em] uppercase text-[10px] md:text-xs">Category Insight</span>
                                      </div>
                                      <h4 className="text-2xl md:text-4xl font-black mb-6 tracking-tighter leading-tight text-gray-900">
                                        {category.category}<span className="text-emerald-600">.</span>
                                      </h4>
                                      <div className="text-gray-600 font-bold text-sm md:text-lg leading-relaxed whitespace-pre-wrap max-w-xl">
                                        {category.description}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className={`p-4 md:p-8 ${isMobile ? 'space-y-3' : 'grid md:grid-cols-3 gap-6'}`}>
                              {category.items.slice(0, 3).map((item, i) => (
                                <div
                                  key={i}
                                  onClick={() => setSelectedItem(item)}
                                  className={`bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all group cursor-pointer ${isMobile ? 'flex items-center gap-4' : 'flex flex-col'}`}
                                >
                                  {isMobile ? (
                                    <>
                                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-gray-200">
                                        <SafeImage src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                      </div>
                                      <div className="flex-grow">
                                        <h4 className="font-black text-gray-900 text-sm mb-1">{item.name}</h4>
                                        <div className="text-blue-600 font-black text-sm">{formatPrice(item.price)}</div>
                                      </div>
                                      <ChevronRight className="w-5 h-5 text-gray-300" />
                                    </>
                                  ) : (
                                    <>
                                      <div className="relative h-40 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-3xl">
                                        <SafeImage src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                                        <div className="absolute top-4 right-4">
                                          <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest">{item.badge}</span>
                                        </div>
                                      </div>
                                      <h4 className="text-lg font-black mb-1 text-gray-900">{item.name}</h4>
                                      <div className="text-xl font-black text-blue-600 mb-4">{formatPrice(item.price)}</div>
                                      <ul className="space-y-2 mb-6 flex-grow">
                                        {(item.features || []).map((f, j) => (
                                          <li key={j} className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                            {f}
                                          </li>
                                        ))}
                                      </ul>
                                      <button
                                        onClick={() => setSelectedItem(item)}
                                        className="w-full bg-white text-gray-900 py-3 rounded-xl font-black text-[10px] tracking-widest border border-gray-200 hover:bg-gray-900 hover:text-white transition-all"
                                      >
                                        PLAN DETAILS
                                      </button>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Bottom View All Button */}
                            <div className="px-4 md:px-8 pb-8">
                              <button
                                onClick={() => {
                                  setViewingFullList(category.id);
                                  window.scrollTo(0, 0);
                                }}
                                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-blue-100 text-blue-600 py-4 md:py-6 rounded-2xl md:rounded-[2.5rem] font-black text-xs md:text-lg tracking-widest hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm group"
                              >
                                <span className="hidden md:inline">{category.category}の全プランをチェックする</span>
                                <span className="md:hidden">{category.category}の全プランを見る</span>
                                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Brands Section */}
            <section id="brands" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">TRUSTED BRANDS</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">取扱いブランド</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {securityBrands.map((brand, i) => (
                    <div key={i} className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-2xl transition-all group flex flex-col">
                      <div className="h-12 flex items-center mb-6">
                        <h3 className="text-2xl font-black tracking-tighter group-hover:text-blue-600 transition-colors">{brand.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 font-bold leading-relaxed mb-6 flex-grow">{brand.description}</p>
                      <div className="h-40 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 mb-6">
                        <SafeImage src={brand.image} className="w-full h-full object-cover" alt={brand.name} />
                      </div>
                      <button
                        onClick={() => { setViewingFullList(brand.id); window.scrollTo(0, 0); }}
                        className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black text-xs tracking-widest border border-gray-200 hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        一覧を見る
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Paid Diagnosis Section */}
            <section id="diagnosis" className="py-20 bg-blue-600 overflow-hidden relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              </div>
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-white/20 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 text-center md:text-left">
                    <span className="inline-block px-4 py-1.5 bg-white text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest mb-6">
                      SECURITY CHECKUP
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                      他店での施工でお困りの方へ<br />
                      <span className="text-blue-200">有料セキュリティー診断</span>
                    </h2>
                    <p className="text-blue-100 font-bold leading-relaxed mb-8 text-lg">
                      「最近誤作動が多い」「中古車を買ったらセキュリティが付いていたが使い方がわからない」「今のシステムが正常に動いているか不安」など、他店で施工されたシステムや中古車購入時のセキュリティに関する診断・設定変更も承っております。
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-white text-sm font-bold border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-blue-300" />
                        システム動作チェック
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-white text-sm font-bold border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-blue-300" />
                        感度再調整
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-white text-sm font-bold border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-blue-300" />
                        操作説明
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 bg-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="text-center mb-6">
                      <p className="text-gray-400 font-black text-xs tracking-widest uppercase mb-2">DIAGNOSIS FEE</p>
                      <div className="text-4xl font-black text-gray-900">¥11,000<span className="text-sm ml-1">〜</span></div>
                      <p className="text-gray-400 text-[10px] font-bold mt-2">※システムの種類や状態により異なります</p>
                    </div>
                    <button onClick={() => scrollToSection('cta')} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                      診断を予約する
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Recruitment Section */}
            <RecruitmentSection data={securityRecruitment} />

            {/* CTA Section */}
            <section id="cta" className="py-20 bg-gray-900 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>
              <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">SECURE YOUR CAR TODAY.</h2>
                <p className="text-lg text-gray-400 font-bold mb-12 leading-relaxed">
                  愛車のセキュリティについて、プロのスタッフが丁寧にご説明いたします。<br />
                  まずはお気軽にご相談ください。
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a href="https://line.me/R/ti/p/@soundang" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 bg-[#06C755] text-white px-10 py-6 rounded-[2rem] font-black text-lg tracking-widest hover:scale-105 transition-all shadow-xl shadow-green-500/20">
                    <MessageSquare className="w-6 h-6" />
                    LINEで無料相談
                  </a>
                  <button className="flex items-center justify-center gap-4 bg-blue-600 text-white px-10 py-6 rounded-[2rem] font-black text-lg tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-600/20">
                    <Calendar className="w-6 h-6" />
                    来店予約・見積り
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
