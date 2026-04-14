import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import { SafeImage } from '../ui/SafeImage';
import {
  ArrowLeft,
  Eye,
  Shield,
  ShieldCheck,
  Video,
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
  Zap,
  Monitor,
  Battery,
  Award
} from 'lucide-react';

interface DashcamMenuDetailProps {
  onBack: () => void;
}

export const DashcamMenuDetail: React.FC<DashcamMenuDetailProps> = ({ onBack }) => {
  const { assets } = useSite();
  const { plans } = usePrices();
  const [viewingFullList, setViewingFullList] = useState<string | null>(null);
  const [viewingCategoryDetail, setViewingCategoryDetail] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categoryExplanations: Record<string, any> = {
    dashcam: {
      title: "ドライブレコーダー",
      subtitle: "事故の証拠だけでなく、煽り運転対策の必須アイテム。",
      description: "最新の前後2カメラモデルや、死角のない360度モデルをラインナップ。専門店ならではの「配線を隠した美しいインストール」と「確実な電源確保」で、いざという時に頼れるシステムを構築します。",
      sampleDescription: "【施工例】前後2カメラ ＋ 駐車監視：エンジン停止後も一定時間録画を継続。当て逃げやいたずら対策として非常に人気の高い構成です。",
      benefits: [
        "煽り運転・事故の際の確実な証拠記録",
        "駐車中の当て逃げ・いたずら監視（オプション）",
        "配線を隠したプロによる美しいインストール",
        "車両電圧を監視し、バッテリー上がりを防止"
      ],
      image: assets.dashcamMenuImage,
      icon: Video,
      color: "blue",
      upgrades: [
        { title: "大容量SDカード", price: "+¥5,500〜", icon: LayoutGrid, description: "より長時間の録画を可能に。高耐久モデルを採用します。" },
        { title: "駐車監視用マルチバッテリー", price: "+¥44,000〜", icon: Zap, description: "車両バッテリーを使わずに、最大35時間の駐車監視を可能にします。" }
      ]
    },
    digital_mirror: {
      title: "デジタルインナーミラー",
      subtitle: "アルパイン製など、後方の視界を劇的にクリアに。",
      description: "荷物や同乗者で遮られがちな後方視界を、カメラ映像でミラーに映し出します。特にアルパイン製デジタルミラーは、車種専用設計でフィッティングも抜群。雨天時や夜間でも驚くほど明るく、安全なドライブをサポートします。",
      sampleDescription: "【施工例】アルパイン純正交換型デジタルミラー：純正ミラーを丸ごと交換するため、後付け感のないスマートな仕上がりに。前後ドラレコ機能付きが主流です。",
      benefits: [
        "荷物満載でも後方視界が遮られない",
        "夜間や雨天時でも明るく鮮明な映像",
        "前後ドラレコ機能搭載で一石二鳥",
        "アルパイン製など車種専用設計でスッキリ"
      ],
      image: assets.dashcamMenuImage,
      icon: Monitor,
      color: "indigo",
      upgrades: [
        { title: "反射防止フィルム", price: "+¥3,300〜", icon: Settings2, description: "日中の液晶への映り込みを抑え、視認性をさらに高めます。" }
      ]
    },
    radar: {
      title: "レーダー探知機 / レーザー受信機",
      subtitle: "最新の移動式オービスに対応。安全運転のパートナー。",
      description: "最新のレーザー光受信に対応したモデルをご提案。OBDII接続により、車両の正確な情報を表示することも可能です。",
      sampleDescription: "【施工例】セパレート型レーダー：受光部をフロントガラス上部に、モニターを運転席横に。視認性と受信感度を両立した設置を行います。",
      benefits: [
        "最新の移動式オービス（MSSS等）に完全対応",
        "GPSデータ更新により常に最新の取締情報を把握",
        "OBDII接続で水温やブースト圧などの車両情報を表示",
        "ダッシュボードをスッキリさせるセパレート設置"
      ],
      image: assets.dashcamMenuImage,
      icon: AlertTriangle,
      color: "orange",
      upgrades: [
        { title: "OBDIIアダプター", price: "+¥8,800〜", icon: Zap, description: "車両情報を取得し、より正確な警報と車両状態のモニタリングを可能にします。" }
      ]
    },
    safety_device: {
      title: "置き去り防止安全装置",
      subtitle: "幼稚園バス・送迎バスの安全を守る。義務化対応モデル。",
      description: "ヒューマンエラーによる車内置き去り事故を防ぐための専用システム。エンジン停止後の確認ブザーや、万が一の際の外部通知機能で、大切な命を守ります。補助金対象モデルも取り扱っております。",
      sampleDescription: "【施工例】ホーネット車内置き去り防止システム：エンジン停止後、最後尾まで確認に行かないとブザーが止まらない仕組みを構築。確実に車内点検を促します。",
      benefits: [
        "ヒューマンエラーによる事故をテクノロジーで防止",
        "内閣府のガイドラインに適合した認定装置",
        "補助金申請のサポートも承ります",
        "プロの施工による誤作動の少ない確実な動作"
      ],
      image: assets.dashcamMenuImage,
      icon: AlertTriangle,
      color: "red",
      upgrades: [
        { title: "外部サイレン追加", price: "+¥11,000〜", icon: Zap, description: "車外への通知音をより強力にし、周囲への異常周知を早めます。" }
      ]
    },
    campit: {
      title: "Campit (キャンピット)",
      subtitle: "車中泊・キャンピングカーをより快適に。電装カスタム。",
      description: "ポータブル電源の走行充電システムや、車内へのAC100Vコンセント増設など、旅を豊かにする電装カスタムをご提案。サブバッテリーを積まない手軽なシステムから本格的なものまで対応します。",
      sampleDescription: "【施工例】走行充電システム：移動中にポータブル電源を急速充電。目的地に着いた時には満充電で、快適な車中泊を楽しめます。",
      benefits: [
        "移動中にポータブル電源を効率よく充電",
        "純正風の美しいコンセント増設パネル",
        "安全性を考慮した専用回路とヒューズ設計",
        "車中泊での電力不足の不安を解消"
      ],
      image: assets.dashcamMenuImage,
      icon: Battery,
      color: "green",
      upgrades: [
        { title: "外部電源入力ポート", price: "+¥33,000〜", icon: Zap, description: "キャンプ場の外部電源から直接車内に電力を引き込めるようにします。" }
      ]
    }
  };

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500 text-blue-600",
    purple: "bg-purple-500 text-purple-600",
    indigo: "bg-indigo-500 text-indigo-600",
    orange: "bg-orange-500 text-orange-600",
    red: "bg-red-500 text-red-600",
    green: "bg-green-500 text-green-600",
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
    { id: 'installation', label: 'プロの施工技術' },
    { id: 'cta', label: 'お問い合わせ' },
  ];

  const purposeNav = [
    { id: 'dashcam', title: "事故・煽りに備えたい", desc: "ドライブレコーダー・駐車監視", icon: Video, color: "blue" },
    { id: 'digital_mirror', title: "後方視界を良くしたい", desc: "デジタルインナーミラー", icon: Monitor, color: "indigo" },
    { id: 'radar', title: "安全運転を心がけたい", desc: "レーダー探知機・レーザー受信機", icon: AlertTriangle, color: "orange" },
    { id: 'safety_device', title: "バスの安全を守りたい", desc: "置き去り防止安全装置", icon: ShieldCheck, color: "red" },
    { id: 'campit', title: "車中泊を快適にしたい", desc: "キャンピット・電装カスタム", icon: Battery, color: "green" },
  ];

  return (
    <div className="bg-white min-h-screen">
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
                    src={selectedItem.image || "https://picsum.photos/seed/dashcam/1200/800"}
                    className="w-full h-full object-cover"
                    alt={selectedItem.name + "のドライブレコーダー"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg mb-4 inline-block">
                      {selectedItem.badge || "Safety Plan"}
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
                          {(selectedItem.features || []).map((f: string, idx: number) => (
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
                          導入のメリット
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
                            さらに快適にするオプション
                          </h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            {detail.upgrades.map((upgrade: any, i: number) => (
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
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-gray-50/20"></div>
                          {/* Watermark Background */}
                          <div className="absolute -right-8 -bottom-8 text-[12rem] font-black text-amber-900/[0.03] select-none pointer-events-none tracking-tighter leading-none group-hover:text-amber-900/[0.05] transition-colors duration-1000">
                            DASHCAM
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
                                    <div className="absolute inset-0 bg-amber-900/10 group-hover/img:bg-transparent transition-colors duration-700"></div>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className={`w-full ${currentCategory.images && currentCategory.images.length > 0 ? 'lg:w-1/2' : 'lg:w-full'}`}>
                              <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-200">
                                  <Video className="w-6 h-6" />
                                </div>
                                <span className="text-amber-600 font-black tracking-[0.3em] uppercase text-xs md:text-sm">Category Insight</span>
                              </div>
                              <h4 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter leading-[1.1] text-gray-900">
                                {currentCategory.category}<span className="text-amber-600">.</span>
                              </h4>
                              <div className="text-gray-600 font-bold text-base md:text-xl leading-relaxed whitespace-pre-wrap max-w-2xl">
                                {currentCategory.description}
                              </div>

                              <div className="mt-12 pt-8 border-t border-amber-100 flex items-center gap-4 text-amber-600">
                                <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></div>
                                <span className="text-xs font-black tracking-widest uppercase">Professional Installation Guaranteed</span>
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
                            <SafeImage src={item.image || "https://picsum.photos/seed/dashcam/800/600"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
                  <Video className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  <h2 className="font-black text-sm md:text-xl tracking-tighter whitespace-nowrap">DASHCAM, MIRROR & OTHERS</h2>
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
                  src={assets.dashcamMenuImage}
                  className="w-full h-full object-cover"
                  alt="高性能ドライブレコーダー・デジタルミラーの施工イメージ"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>
              </div>
              <div className="relative max-w-7xl mx-auto px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-6 shadow-lg shadow-blue-600/20">
                    Safety & Security Support
                  </span>
                  <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                    DRIVE WITH<br /><span className="text-blue-500">CONFIDENCE.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 font-bold max-w-2xl mx-auto leading-relaxed">
                    事故の記録から煽り運転対策、駐車中の監視まで。最新のテクノロジーで、あなたのドライブをより安全で快適なものに変えます。
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Purpose Navigation */}
            <section id="purpose-nav" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">WHAT IS YOUR PURPOSE?</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">目的から探す</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                  {purposeNav.map((item, i) => (
                    <button key={i} onClick={() => { setViewingCategoryDetail(item.id); window.scrollTo(0, 0); }} className="group relative bg-gray-50 rounded-[2rem] p-8 text-left border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all overflow-hidden flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        item.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                          item.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                            item.color === 'red' ? 'bg-red-100 text-red-600' :
                              'bg-green-100 text-green-600'
                        }`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight">{item.title}</h3>
                      <p className="text-xs text-gray-500 font-bold leading-relaxed mt-auto">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Professional Installation Section */}
            <section id="installation" className="py-20 bg-white border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-4">
                <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
                    <SafeImage src={assets.dashcamMenuImage} className="w-full h-full object-cover" alt="Installation" />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900"></div>
                  </div>
                  <div className="relative z-10 max-w-2xl">
                    <span className="text-blue-400 font-black text-xs tracking-widest uppercase mb-4 block">Professional Installation</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                      専門店だからできる、<br />
                      <span className="text-blue-500">「隠す」と「守る」</span>の技術。
                    </h2>
                    <p className="text-gray-300 font-bold leading-relaxed mb-8">
                      ドラレコやレーダーの取り付けで最も重要なのは、配線の処理と電源の取り方です。ANGでは、内装を傷つけず、配線を一切見せない美しいインストールを徹底。また、車両のコンピューターに悪影響を与えない確実な電源確保を行い、長期間安心してご使用いただける環境を整えます。
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3 text-white font-bold">
                        <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        完全隠蔽配線
                      </div>
                      <div className="flex items-center gap-3 text-white font-bold">
                        <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        ノイズ対策施工
                      </div>
                      <div className="flex items-center gap-3 text-white font-bold">
                        <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        車両診断機チェック
                      </div>
                      <div className="flex items-center gap-3 text-white font-bold">
                        <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        バッテリー管理徹底
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Plan List with Accordion for Mobile */}
            <section id="plan-list" className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">PRODUCT LINEUP</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">プラン一覧</p>
                </div>

                <div className="space-y-4 md:space-y-8">
                  {plans.filter(p => ['dashcam', 'radar', 'digital_mirror', 'safety_device', 'campit'].includes(p.id)).map((category) => (
                    <div key={category.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
                      <button
                        onClick={() => isMobile && setExpandedSection(expandedSection === category.id ? null : category.id)}
                        className={`w-full px-8 py-8 flex items-center justify-between text-left transition-colors ${isMobile ? 'hover:bg-gray-50' : ''}`}
                      >
                        <div className="flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${category.id === 'dashcam' ? 'bg-blue-50 text-blue-600' :
                            category.id === 'radar' ? 'bg-orange-50 text-orange-600' :
                              category.id === 'digital_mirror' ? 'bg-indigo-50 text-indigo-600' :
                                category.id === 'safety_device' ? 'bg-red-50 text-red-600' :
                                  'bg-green-50 text-green-600'
                            }`}>
                            {category.id === 'dashcam' ? <Video className="w-6 h-6" /> :
                              category.id === 'radar' ? <AlertTriangle className="w-6 h-6" /> :
                                category.id === 'digital_mirror' ? <Monitor className="w-6 h-6" /> :
                                  category.id === 'safety_device' ? <ShieldCheck className="w-6 h-6" /> :
                                    <Battery className="w-6 h-6" />}
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-black tracking-tight">{category.category}</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{category.items.length} MODELS AVAILABLE</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); setViewingFullList(category.id); window.scrollTo(0, 0); }}
                            className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-xs tracking-widest hover:bg-blue-600 transition-all shadow-lg"
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
                      </button>

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
                                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-gray-50/20"></div>
                                  {/* Watermark Background */}
                                  <div className="absolute -right-4 -bottom-4 text-7xl md:text-9xl font-black text-amber-900/[0.03] select-none pointer-events-none tracking-tighter leading-none group-hover:text-amber-900/[0.05] transition-colors duration-1000">
                                    DASHCAM
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
                                            <div className="absolute inset-0 bg-amber-900/5 group-hover/img:bg-transparent transition-colors duration-700"></div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <div className={`w-full ${category.images && category.images.length > 0 ? 'lg:w-1/2' : 'lg:w-full'}`}>
                                      <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-100">
                                          <Video className="w-5 h-5" />
                                        </div>
                                        <span className="text-amber-600 font-black tracking-[0.2em] uppercase text-[10px] md:text-xs">Category Insight</span>
                                      </div>
                                      <h4 className="text-2xl md:text-4xl font-black mb-6 tracking-tighter leading-tight text-gray-900">
                                        {category.category}<span className="text-amber-600">.</span>
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
                                      <div className="w-32 h-20 rounded-2xl overflow-hidden shrink-0 border border-gray-200">
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

            {/* Achievements Section */}
            <section id="achievements" className="py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">Professional Quality</span>
                  <h2 className="text-4xl font-bold leading-tight">プロフェッショナルな施工体制</h2>
                  <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    最新のドラレコやレーダー探知機を、配線を隠した美しい仕上がりで取り付け。万が一の際も安心の設備を完備しています。
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: Award,
                      title: "九州No.1の施工実績",
                      description: "セキュリティ連動ドラレコの施工実績は九州トップクラス。複雑な配線も確実に行います。",
                      image: assets.kyushuNo1Image
                    },
                    {
                      icon: ShieldCheck,
                      title: "SPS認定店 (Grgo/Panthera)",
                      description: "メーカーから高度な技術力を認められた「スーパープロショップ」認定店。専門店ならではの精密なセッティングが可能です。",
                      image: assets.spsCertifiedImage
                    },
                    {
                      icon: Settings2,
                      title: "Snap-on 診断機完備",
                      description: "高性能なSnap-on診断機を導入。施工後のエラーチェックはもちろん、万が一の車両トラブルにも迅速に対応可能です。",
                      image: assets.snaponImage
                    },
                    {
                      icon: Zap,
                      title: "バッテリー充電器完備",
                      description: "施工中や長期預かり時もバッテリーコンディションを最適に維持。安心してお車をお預けいただけます。",
                      image: assets.batteryChargerImage
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col group overflow-hidden hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="h-40 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                        <SafeImage src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="p-8 pt-4 flex-grow flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform -mt-10 relative z-10 border border-gray-50">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black mb-3 text-gray-900">{item.title}</h3>
                        <p className="text-gray-500 text-sm font-bold leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section id="cta" className="py-20 bg-gray-900 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>
              <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">DRIVE SAFE, DRIVE SMART.</h2>
                <p className="text-lg text-gray-400 font-bold mb-12 leading-relaxed">
                  最新のドラレコやレーダー探知機について、プロのスタッフが丁寧にご説明いたします。<br />
                  配線を隠した美しい取り付けもお任せください。
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
    </div>
  );
};
