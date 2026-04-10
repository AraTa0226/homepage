import React, { useState } from 'react';
import cmsData from '../../data/cms.json';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Save,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  DollarSign,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Plus,
  Trash2,
  X,
  Globe,
  Speaker,
  Edit3,
  Megaphone,
  Info,
  LayoutGrid,
  Zap,
  Wrench,
  Layers,
  Youtube,
  Play,
  Briefcase,
  Music,
  Image as ImageIcon
} from 'lucide-react';
import { usePrices, PlanCategory, OptionalService, formatPrice, PlanItem, EmergencyAnnouncement, KnowledgeGuide } from '../../contexts/PriceContext';
import { useCalendar } from '../../contexts/CalendarContext';
import { useSite, Partner, SiteAssets, BrandPartner } from '../../contexts/SiteContext';

interface StaffDashboardProps {
  onBack: () => void;
}

type Tab = 'prices' | 'calendar' | 'partners' | 'assets' | 'guides' | 'recruitment' | 'demo' | 'system';

export const StaffDashboard: React.FC<StaffDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('prices');
  const {
    plans,
    optionals,
    guides,
    bulkUpdatePrices,
    securityStatus,
    setSecurityStatus,
    emergencyAnnouncement,
    setEmergencyAnnouncement,
    audioRecruitment,
    setAudioRecruitment,
    securityRecruitment,
    setSecurityRecruitment,
    auditionSpeakers,
    setAuditionSpeakers
  } = usePrices();
  const { holidays, updateHolidays, saveCalendar } = useCalendar();
  const {
    partners,
    brandPartners,
    assets,
    updatePartner,
    addPartner,
    removePartner,
    updateBrandPartner,
    addBrandPartner,
    removeBrandPartner,
    updateAssets,
    saveSiteData,
    resetSystem
  } = useSite();

  // Price State
  const [localPlans, setLocalPlans] = useState<PlanCategory[]>(JSON.parse(JSON.stringify(plans)));
  const [localOptionals, setLocalOptionals] = useState<OptionalService[]>(JSON.parse(JSON.stringify(optionals)));
  const [localGuides, setLocalGuides] = useState<KnowledgeGuide[]>(JSON.parse(JSON.stringify(guides)));
  const [localSecurityStatus, setLocalSecurityStatus] = useState<string>(securityStatus);
  const [localEmergencyAnnouncement, setLocalEmergencyAnnouncement] = useState<EmergencyAnnouncement>(emergencyAnnouncement);
  const [localAudioRecruitment, setLocalAudioRecruitment] = useState(JSON.parse(JSON.stringify(audioRecruitment)));
  const [localSecurityRecruitment, setLocalSecurityRecruitment] = useState(JSON.parse(JSON.stringify(securityRecruitment)));
  const [adjustment, setAdjustment] = useState<string>("0");
  const [searchQuery, setSearchQuery] = useState("");

  // Site State
  const [localPartners, setLocalPartners] = useState<Partner[]>(JSON.parse(JSON.stringify(partners)));
  const [localBrandPartners, setLocalBrandPartners] = useState<BrandPartner[]>(JSON.parse(JSON.stringify(brandPartners)));
  const [localAssets, setLocalAssets] = useState<SiteAssets>(JSON.parse(JSON.stringify(assets)));
  const [localAuditionSpeakers, setLocalAuditionSpeakers] = useState(JSON.parse(JSON.stringify(auditionSpeakers)));

  // Modal State
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddItem, setShowAddItem] = useState<{ categoryId: string } | null>(null);
  const [showAddOptional, setShowAddOptional] = useState(false);
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [showAddBrandPartner, setShowAddBrandPartner] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    message: string;
    onConfirm: () => void;
  }>({ show: false, message: "", onConfirm: () => { } });

  // New Item State
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryType, setNewCategoryType] = useState<'audio' | 'security' | 'others'>('others');
  const [newItem, setNewItem] = useState<PlanItem>({ name: "", price: "0", features: [], badge: "", image: "", description: "" });
  const [newOptional, setNewOptional] = useState<OptionalService>({ id: "", name: "", price: "0", description: "", effect: "", percentage: 90, image: "" });
  const [newPartner, setNewPartner] = useState<Partner>({ id: "", name: "", location: "", url: "", description: "" });
  const [newBrandPartner, setNewBrandPartner] = useState<BrandPartner>({ id: "", name: "", category: "", description: "", iconName: 'ShieldCheck', url: "" });

  // Calendar State
  const [viewDate, setViewDate] = useState(new Date());

  const [showSuccess, setShowSuccess] = useState(false);
  const [editingText, setEditingText] = useState<{
    title: string;
    value: string;
    onSave: (val: string) => void;
  } | null>(null);
  const [editingPackage, setEditingPackage] = useState<{
    catId: string;
    item: PlanItem;
  } | null>(null);

  const normalizeImagePath = (path: string) => {
    if (!path) return path;
    // Replace backslashes with forward slashes and trim
    let normalized = path.replace(/\\/g, '/').trim();
    // Prepend leading slash if it looks like a relative path to images directory
    if (normalized.startsWith('images/')) {
      normalized = '/' + normalized;
    }
    return normalized;
  };

  // Price Handlers
  const handlePriceChange = (catId: string, itemName: string, field: keyof PlanItem, value: any) => {
    setLocalPlans(prev => prev.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          items: cat.items.map(item => {
            if (item.name === itemName) {
              const sanitizedValue = field === 'image' ? normalizeImagePath(value) : value;
              return { ...item, [field]: sanitizedValue };
            }
            return item;
          })
        };
      }
      return cat;
    }));
  };

  const handleCategoryChange = (catId: string, field: keyof PlanCategory, value: any) => {
    setLocalPlans(prev => prev.map(cat => {
      if (cat.id === catId) {
        const sanitizedValue = field === 'images' && Array.isArray(value)
          ? value.map(path => normalizeImagePath(path))
          : value;
        return { ...cat, [field]: sanitizedValue };
      }
      return cat;
    }));
  };

  const handleOptionalPriceChange = (id: string, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setLocalOptionals(prev => prev.map(opt =>
      opt.id === id ? { ...opt, price: numericValue } : opt
    ));
  };

  const handleOptionalImageChange = (id: string, value: string) => {
    const sanitizedValue = normalizeImagePath(value);
    setLocalOptionals(prev => prev.map(opt =>
      opt.id === id ? { ...opt, image: sanitizedValue } : opt
    ));
  };

  const handleOptionalChange = (id: string, field: keyof OptionalService, value: any) => {
    setLocalOptionals(prev => prev.map(opt => {
      if (opt.id === id) {
        const sanitizedValue = field === 'image' ? normalizeImagePath(value) : value;
        return { ...opt, [field]: sanitizedValue };
      }
      return opt;
    }));
  };

  const handleGuideChange = (id: string, field: keyof KnowledgeGuide, value: any) => {
    setLocalGuides(prev => prev.map(g => {
      if (g.id === id) {
        const sanitizedValue = field === 'image' ? normalizeImagePath(value) : value;
        return { ...g, [field]: sanitizedValue };
      }
      return g;
    }));
  };

  const handleBulkAdjust = () => {
    const percent = parseFloat(adjustment);
    if (isNaN(percent)) return;

    const adjust = (p: string) => {
      const num = parseInt(p);
      if (isNaN(num) || num === 0) return p;
      return Math.round(num * (1 + percent / 100)).toString();
    };

    setLocalPlans(prev => prev.map(cat => ({
      ...cat,
      items: cat.items.map(item => ({ ...item, price: adjust(item.price) }))
    })));
    setLocalOptionals(prev => prev.map(opt => ({ ...opt, price: adjust(opt.price) })));
    setAdjustment("0");
  };

  const handleResetPrices = () => {
    setLocalPlans(JSON.parse(JSON.stringify(plans)));
    setLocalOptionals(JSON.parse(JSON.stringify(optionals)));
  };

  const handleAddCategory = () => {
    if (!newCategoryName) return;
    const newCat: PlanCategory = {
      id: `cat-${Date.now()}`,
      category: newCategoryName,
      type: newCategoryType,
      items: []
    };
    setLocalPlans(prev => [...prev, newCat]);
    setNewCategoryName("");
    setNewCategoryType('others');
    setShowAddCategory(false);
  };

  const handleRemoveCategory = (id: string) => {
    setConfirmModal({
      show: true,
      message: "このカテゴリーを削除してもよろしいですか？",
      onConfirm: () => {
        setLocalPlans(prev => prev.filter(cat => cat.id !== id));
        setConfirmModal(prev => ({ ...prev, show: false }));
      }
    });
  };

  const handleAddItem = () => {
    if (!showAddItem || !newItem.name) return;
    const sanitizedItem = {
      ...newItem,
      image: normalizeImagePath(newItem.image || "")
    };
    setLocalPlans(prev => prev.map(cat =>
      cat.id === showAddItem.categoryId
        ? { ...cat, items: [...cat.items, sanitizedItem] }
        : cat
    ));
    setNewItem({ name: "", price: "0", features: [], badge: "", image: "" });
    setShowAddItem(null);
  };

  const handleRemoveItem = (catId: string, itemName: string) => {
    setLocalPlans(prev => prev.map(cat =>
      cat.id === catId
        ? { ...cat, items: cat.items.filter(item => item.name !== itemName) }
        : cat
    ));
  };

  const handleAddOptional = () => {
    if (!newOptional.name) return;
    const opt: OptionalService = {
      ...newOptional,
      id: `opt-${Date.now()}`,
      image: normalizeImagePath(newOptional.image || "")
    };
    setLocalOptionals(prev => [...prev, opt]);
    setNewOptional({ id: "", name: "", price: "0", description: "", effect: "", percentage: 90, image: "" });
    setShowAddOptional(false);
  };

  const handleRemoveOptional = (id: string) => {
    setConfirmModal({
      show: true,
      message: "このオプションを削除してもよろしいですか？",
      onConfirm: () => {
        setLocalOptionals(prev => prev.filter(opt => opt.id !== id));
        setConfirmModal(prev => ({ ...prev, show: false }));
      }
    });
  };

  // Calendar Handlers
  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const toggleHoliday = (day: number) => {
    const monthKey = `${viewDate.getFullYear()}-${viewDate.getMonth() + 1}`;
    const currentMonthHolidays = holidays[monthKey] || [];

    let newHolidays;
    if (currentMonthHolidays.includes(day)) {
      newHolidays = currentMonthHolidays.filter(d => d !== day);
    } else {
      newHolidays = [...currentMonthHolidays, day];
    }
    updateHolidays(monthKey, newHolidays);
  };

  const handleSaveAll = () => {
    if (activeTab === 'prices' || activeTab === 'guides') {
      // Clean up images arrays (remove empty strings and trim)
      const cleanedPlans = localPlans.map(cat => ({
        ...cat,
        images: cat.images?.map(s => s.trim()).filter(s => s) || []
      }));
      bulkUpdatePrices(cleanedPlans, localOptionals, localGuides);
      setSecurityStatus(localSecurityStatus);
      setEmergencyAnnouncement(localEmergencyAnnouncement);
    } else if (activeTab === 'calendar') {
      saveCalendar();
    } else if (activeTab === 'partners') {
      // Update partners in context
      localPartners.forEach(p => updatePartner(p.id, p));
      localBrandPartners.forEach(p => updateBrandPartner(p.id, p));
      saveSiteData();
    } else if (activeTab === 'assets') {
      updateAssets(localAssets);
      saveSiteData();
    } else if (activeTab === 'recruitment') {
      setAudioRecruitment(localAudioRecruitment);
      setSecurityRecruitment(localSecurityRecruitment);
    } else if (activeTab === 'demo') {
      setAuditionSpeakers(localAuditionSpeakers);
    } else if (activeTab === 'system') {
      // System tab saves are handled inline (export button)
      return;
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSpeakerChange = (brandIndex: number, unitIndex: number, field: string, value: string) => {
    setLocalAuditionSpeakers(prev => {
      const next = [...prev];
      const sanitizedValue = field === 'image' ? normalizeImagePath(value) : value;
      next[brandIndex].units[unitIndex] = { ...next[brandIndex].units[unitIndex], [field]: sanitizedValue };
      return next;
    });
  };

  const handleBrandInfoChange = (brandIndex: number, field: string, value: string) => {
    setLocalAuditionSpeakers(prev => {
      const next = [...prev];
      next[brandIndex] = { ...next[brandIndex], [field]: value };
      return next;
    });
  };

  const handleAddSpeakerUnit = (brandIndex: number) => {
    setLocalAuditionSpeakers(prev => {
      const next = [...prev];
      next[brandIndex].units.push({ model: "", status: "Available" });
      return next;
    });
  };

  const handleRemoveSpeakerUnit = (brandIndex: number, unitIndex: number) => {
    setLocalAuditionSpeakers(prev => {
      const next = [...prev];
      next[brandIndex].units = next[brandIndex].units.filter((_, i) => i !== unitIndex);
      return next;
    });
  };

  const handleAddSpeakerBrand = () => {
    setLocalAuditionSpeakers(prev => [
      ...prev,
      { brand: "NEW BRAND", origin: "Japan", units: [{ model: "New Model", status: "Available" }] }
    ]);
  };

  const handleRemoveSpeakerBrand = (brandIndex: number) => {
    setConfirmModal({
      show: true,
      message: `${localAuditionSpeakers[brandIndex].brand} を削除してもよろしいですか？`,
      onConfirm: () => {
        setLocalAuditionSpeakers(prev => prev.filter((_, i) => i !== brandIndex));
        setConfirmModal(prev => ({ ...prev, show: false }));
      }
    });
  };

  const handlePartnerChange = (id: string, field: keyof Partner, value: string) => {
    setLocalPartners(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAddPartner = () => {
    if (!newPartner.name) return;
    const p = { ...newPartner, id: `p-${Date.now()}` };
    setLocalPartners(prev => [...prev, p]);
    addPartner(p);
    setNewPartner({ id: "", name: "", location: "", url: "", description: "" });
    setShowAddPartner(false);
  };

  const handleRemovePartner = (id: string) => {
    setConfirmModal({
      show: true,
      message: "このパートナーを削除してもよろしいですか？",
      onConfirm: () => {
        setLocalPartners(prev => prev.filter(p => p.id !== id));
        removePartner(id);
        setConfirmModal(prev => ({ ...prev, show: false }));
      }
    });
  };

  const handleBrandPartnerChange = (id: string, field: keyof BrandPartner, value: string) => {
    setLocalBrandPartners(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAddBrandPartner = () => {
    if (!newBrandPartner.name) return;
    const p = { ...newBrandPartner, id: `b-${Date.now()}` };
    setLocalBrandPartners(prev => [...prev, p]);
    addBrandPartner(p);
    setNewBrandPartner({ id: "", name: "", category: "", description: "", iconName: 'ShieldCheck', url: "" });
    setShowAddBrandPartner(false);
  };

  const handleRemoveBrandPartner = (id: string) => {
    setConfirmModal({
      show: true,
      message: "このメーカーを削除してもよろしいですか？",
      onConfirm: () => {
        setLocalBrandPartners(prev => prev.filter(p => p.id !== id));
        removeBrandPartner(id);
        setConfirmModal(prev => ({ ...prev, show: false }));
      }
    });
  };

  const handleAssetChange = (field: keyof SiteAssets, value: string) => {
    const isImagePath = field.toLowerCase().includes('image');
    const sanitizedValue = isImagePath ? normalizeImagePath(value) : value;
    setLocalAssets(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  // Filtering
  const filteredPlans = localPlans.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0 || searchQuery === ""); // Show empty categories if not searching

  const audioPlans = filteredPlans.filter(cat => cat.type === 'audio');
  const securityPlans = filteredPlans.filter(cat => cat.type === 'security');
  const otherPlans = filteredPlans.filter(cat => cat.type === 'others');

  const filteredOptionals = localOptionals.filter(opt =>
    opt.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGuides = localGuides.filter(g =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calendar Logic
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const monthKey = `${year}-${month + 1}`;
  const DEFAULT_WEEKLY_HOLIDAYS = [2, 5]; // Tue, Fri

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="ダッシュボードを閉じる"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase">Staff Dashboard</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">管理システム</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setConfirmModal({
                  show: true,
                  message: "システム全体のキャッシュをリセットして初期状態に戻しますか？（編集中のデータは失われます）",
                  onConfirm: resetSystem
                });
              }}
              className="px-3 py-1.5 text-[10px] font-black tracking-widest text-red-600 hover:bg-red-50 border border-red-100 rounded-lg transition-colors flex items-center gap-2 uppercase"
              title="システムリセット"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <div className="flex bg-gray-100 p-1 rounded-xl mr-4">
              <button
                onClick={() => setActiveTab('prices')}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === 'prices' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <DollarSign className="w-3 h-3" />
                PRICES
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === 'calendar' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <CalendarIcon className="w-3 h-3" />
                CALENDAR
              </button>
              <button
                onClick={() => setActiveTab('partners')}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === 'partners' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Globe className="w-3 h-3" />
                PARTNERS
              </button>
              <button
                onClick={() => setActiveTab('assets')}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === 'assets' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Speaker className="w-3 h-3" />
                ASSETS
              </button>
              <button
                onClick={() => setActiveTab('guides')}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === 'guides' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <LayoutGrid className="w-3 h-3" />
                GUIDES
              </button>
              <button
                onClick={() => setActiveTab('recruitment')}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === 'recruitment' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Briefcase className="w-3 h-3" />
                RECRUIT
              </button>
              <button
                onClick={() => setActiveTab('demo')}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === 'demo' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Music className="w-3 h-3" />
                DEMO
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`px-4 py-2 rounded-lg text-xs font-black tracking-widest transition-all flex items-center gap-2 ${activeTab === 'system' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <RefreshCw className="w-3 h-3" />
                SYSTEM
              </button>
            </div>

            <button
              onClick={handleSaveAll}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-2xl font-black shadow-2xl z-[100] flex items-center gap-3"
            >
              <CheckCircle2 className="w-6 h-6" />
              更新が完了しました！
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modals */}
        <AnimatePresence>
          {showAddCategory && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">新規カテゴリー追加</h3>
                  <button onClick={() => setShowAddCategory(false)}><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">カテゴリー名</label>
                    <input
                      type="text"
                      placeholder="カテゴリー名 (例: 新パッケージ)"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">タイプ</label>
                    <select
                      value={newCategoryType}
                      onChange={(e) => setNewCategoryType(e.target.value as any)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                    >
                      <option value="audio">オーディオ</option>
                      <option value="security">セキュリティー</option>
                      <option value="others">その他</option>
                    </select>
                  </div>
                </div>
                <button onClick={handleAddCategory} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-widest">追加する</button>
              </motion.div>
            </div>
          )}

          {showAddItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">新規プラン追加</h3>
                  <button onClick={() => setShowAddItem(null)}><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="プラン名"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="価格 (数字のみ)"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value.replace(/[^0-9]/g, '') })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="バッジ (例: おすすめ)"
                    value={newItem.badge}
                    onChange={(e) => setNewItem({ ...newItem, badge: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <button
                    onClick={() => setEditingText({
                      title: "プランの特徴を編集",
                      value: newItem.features.join('\n'),
                      onSave: (val) => setNewItem({ ...newItem, features: val.split('\n') })
                    })}
                    className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl font-bold text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-5 h-5" />
                    特徴を広く編集する
                  </button>
                  <button
                    onClick={() => setEditingText({
                      title: "プランの解説文を編集",
                      value: newItem.description || "",
                      onSave: (val) => setNewItem({ ...newItem, description: val })
                    })}
                    className="w-full px-4 py-3 bg-indigo-50 border-2 border-indigo-100 rounded-xl font-bold text-indigo-600 hover:bg-indigo-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Info className="w-5 h-5" />
                    解説文を広く編集する
                  </button>
                  <input
                    type="text"
                    placeholder="/images/Audio/filename.png"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                </div>
                <button onClick={handleAddItem} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-widest">追加する</button>
              </motion.div>
            </div>
          )}

          {showAddOptional && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">新規オプション追加</h3>
                  <button onClick={() => setShowAddOptional(false)}><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="オプション名"
                    value={newOptional.name}
                    onChange={(e) => setNewOptional({ ...newOptional, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="価格 (数字のみ)"
                    value={newOptional.price}
                    onChange={(e) => setNewOptional({ ...newOptional, price: e.target.value.replace(/[^0-9]/g, '') })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="効果 (例: 音質向上)"
                    value={newOptional.effect}
                    onChange={(e) => setNewOptional({ ...newOptional, effect: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <button
                    onClick={() => setEditingText({
                      title: "オプションの説明文を編集",
                      value: newOptional.description,
                      onSave: (val) => setNewOptional({ ...newOptional, description: val })
                    })}
                    className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl font-bold text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-5 h-5" />
                    詳細（説明文）を広く編集する
                  </button>
                  <input
                    type="text"
                    placeholder="/images/Audio/filename.png"
                    value={newOptional.image}
                    onChange={(e) => setNewOptional({ ...newOptional, image: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                </div>
                <button onClick={handleAddOptional} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-widest">追加する</button>
              </motion.div>
            </div>
          )}

          {showAddPartner && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">新規パートナー追加</h3>
                  <button onClick={() => setShowAddPartner(false)}><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="ショップ名"
                    value={newPartner.name}
                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="所在地 (例: 福岡県)"
                    value={newPartner.location}
                    onChange={(e) => setNewPartner({ ...newPartner, location: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={newPartner.url}
                    onChange={(e) => setNewPartner({ ...newPartner, url: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <button
                    onClick={() => setEditingText({
                      title: "パートナーの説明文を編集",
                      value: newPartner.description,
                      onSave: (val) => setNewPartner({ ...newPartner, description: val })
                    })}
                    className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl font-bold text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-5 h-5" />
                    詳細（説明文）を広く編集する
                  </button>
                </div>
                <button onClick={handleAddPartner} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-widest">追加する</button>
              </motion.div>
            </div>
          )}

          {showAddBrandPartner && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">新規メーカー追加</h3>
                  <button onClick={() => setShowAddBrandPartner(false)}><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="メーカー名"
                    value={newBrandPartner.name}
                    onChange={(e) => setNewBrandPartner({ ...newBrandPartner, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="カテゴリー (例: Security)"
                    value={newBrandPartner.category}
                    onChange={(e) => setNewBrandPartner({ ...newBrandPartner, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <select
                    value={newBrandPartner.iconName}
                    onChange={(e) => setNewBrandPartner({ ...newBrandPartner, iconName: e.target.value as any })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  >
                    <option value="ShieldCheck">Shield (Security)</option>
                    <option value="Speaker">Speaker (Audio)</option>
                    <option value="Video">Video (Dashcam/Navi)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="URL"
                    value={newBrandPartner.url}
                    onChange={(e) => setNewBrandPartner({ ...newBrandPartner, url: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <button
                    onClick={() => setEditingText({
                      title: "メーカーの説明文を編集",
                      value: newBrandPartner.description,
                      onSave: (val) => setNewBrandPartner({ ...newBrandPartner, description: val })
                    })}
                    className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl font-bold text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-5 h-5" />
                    詳細（説明文）を広く編集する
                  </button>
                </div>
                <button onClick={handleAddBrandPartner} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-widest">追加する</button>
              </motion.div>
            </div>
          )}

          {confirmModal.show && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-black mb-4">確認</h3>
                <p className="text-gray-500 font-bold mb-8">{confirmModal.message}</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setConfirmModal(prev => ({ ...prev, show: false }))}
                    className="bg-gray-100 text-gray-600 py-4 rounded-xl font-black tracking-widest"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={confirmModal.onConfirm}
                    className="bg-red-500 text-white py-4 rounded-xl font-black tracking-widest"
                  >
                    削除する
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {activeTab === 'prices' ? (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            {/* Bulk Adjustment Tool */}
            <div className="bg-gray-900 rounded-3xl p-8 mb-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
              <div className="relative z-10 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                      <h2 className="text-xl font-black tracking-tight">一括価格調整ツール</h2>
                    </div>
                    <p className="text-xs text-gray-400 font-bold max-w-xs">
                      ※入力したパーセンテージ分、全てのプラン価格を増減させます。
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white/10 p-2 rounded-xl border border-white/10">
                      <input
                        type="number"
                        value={adjustment}
                        onChange={(e) => setAdjustment(e.target.value)}
                        className="bg-transparent border-none text-xl font-black w-20 text-center focus:ring-0"
                      />
                      <span className="text-lg font-black text-gray-400 mr-2">%</span>
                    </div>
                    <button
                      onClick={handleBulkAdjust}
                      className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-sm tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                    >
                      一括適用
                    </button>
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full"></div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <AlertCircle className="w-5 h-5 text-blue-400" />
                      <h3 className="text-sm font-black uppercase tracking-widest">セキュリティー施工状況メッセージ</h3>
                    </div>
                    <button
                      onClick={() => setEditingText({
                        title: "セキュリティー施工状況メッセージを編集",
                        value: localSecurityStatus,
                        onSave: (val) => setLocalSecurityStatus(val)
                      })}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-blue-400 hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                    >
                      <Edit3 className="w-5 h-5" />
                      メッセージを広く編集する
                    </button>
                    <p className="text-[10px] text-gray-500 mt-2 font-bold">
                      ※セキュリティー詳細ページの上部に表示されます。空にすると非表示になります。
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Megaphone className="w-5 h-5 text-red-400" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-red-400">緊急のお知らせ（トップページ）</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localEmergencyAnnouncement.active}
                            onChange={(e) => setLocalEmergencyAnnouncement({ ...localEmergencyAnnouncement, active: e.target.checked })}
                            className="w-5 h-5 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-0"
                          />
                          <span className="text-xs font-bold">表示する</span>
                        </label>
                      </div>
                      <button
                        onClick={() => setEditingText({
                          title: "緊急のお知らせ内容を編集",
                          value: localEmergencyAnnouncement.text,
                          onSave: (val) => setLocalEmergencyAnnouncement({ ...localEmergencyAnnouncement, text: val })
                        })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs text-gray-300 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        テキスト内容を編集
                      </button>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="リンクURL (任意)"
                          value={localEmergencyAnnouncement.link || ""}
                          onChange={(e) => setLocalEmergencyAnnouncement({ ...localEmergencyAnnouncement, link: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="画像パス または URL (任意)"
                          value={localEmergencyAnnouncement.image || ""}
                          onChange={(e) => setLocalEmergencyAnnouncement({ ...localEmergencyAnnouncement, image: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full"></div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <RefreshCw className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="プラン名やカテゴリーで検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none text-lg font-bold w-full focus:ring-0 placeholder:text-gray-600"
                    />
                  </div>
                  <button
                    onClick={() => setShowAddCategory(true)}
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-2xl font-black text-sm tracking-widest transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    カテゴリー追加
                  </button>
                </div>
              </div>
            </div>

            {/* Excel-like Table */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Category</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Item Name</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Price (Edit)</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Features (Newline)</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Image URL</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-16">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Optional Services Section */}
                    <tr className="bg-blue-50/50">
                      <td colSpan={6} className="px-6 py-3 text-xs font-black text-blue-600 uppercase tracking-widest border-b border-gray-200">
                        オプションメニュー
                      </td>
                      <td className="bg-blue-50/50 border-b border-gray-200 px-6">
                        <button onClick={() => setShowAddOptional(true)} className="p-1 hover:text-blue-600 transition-colors"><Plus className="w-4 h-4" /></button>
                      </td>
                    </tr>
                    {filteredOptionals.map((opt) => (
                      <tr key={opt.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border-r border-gray-100">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Optional</span>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <input
                            type="text"
                            value={opt.name}
                            onChange={(e) => handleOptionalChange(opt.id, 'name', e.target.value)}
                            className="w-full px-3 py-1 bg-white border border-gray-200 rounded-lg font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                          />
                          <input
                            type="text"
                            value={opt.effect}
                            onChange={(e) => handleOptionalChange(opt.id, 'effect', e.target.value)}
                            className="w-full px-3 py-1 bg-white border border-gray-200 rounded-lg font-bold text-[10px] text-gray-400 focus:border-blue-500 outline-none transition-all mt-1"
                            placeholder="効果"
                          />
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <div className="relative flex items-center">
                            <span className="absolute left-3 font-black text-gray-400 text-sm">¥</span>
                            <input
                              type="text"
                              value={opt.price}
                              onChange={(e) => handleOptionalPriceChange(opt.id, e.target.value)}
                              className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg font-black text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <button
                            onClick={() => setEditingText({
                              title: `${opt.name} の説明文編集`,
                              value: opt.description,
                              onSave: (val) => handleOptionalChange(opt.id, 'description', val)
                            })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            詳細を編集
                          </button>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <input
                            type="text"
                            value={opt.image || ""}
                            onChange={(e) => handleOptionalChange(opt.id, 'image', e.target.value)}
                            placeholder="/images/Audio/filename.png"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-gray-600 focus:border-blue-500 outline-none transition-all"
                          />
                          <p className="text-[8px] text-gray-400 mt-1 font-bold">※例: /images/Audio/〜</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => handleRemoveOptional(opt.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}

                    {/* Audio Section */}
                    {audioPlans.length > 0 && (
                      <tr className="bg-blue-50/30">
                        <td colSpan={6} className="px-6 py-3 text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-gray-200">
                          オーディオ関連
                        </td>
                      </tr>
                    )}
                    {audioPlans.map((cat) => (
                      <React.Fragment key={cat.id}>
                        <tr className="bg-gray-50/50">
                          <td colSpan={5} className="px-6 py-3 text-xs font-black text-gray-600 uppercase tracking-widest border-b border-gray-200">
                            <input
                              type="text"
                              value={cat.category}
                              onChange={(e) => handleCategoryChange(cat.id, 'category', e.target.value)}
                              className="bg-transparent border-none font-black text-gray-600 focus:ring-0 w-full"
                            />
                          </td>
                          <td className="bg-gray-50/50 border-b border-gray-200 px-6 flex items-center gap-2 py-3">
                            <button onClick={() => setShowAddItem({ categoryId: cat.id })} className="p-1 hover:text-blue-600 transition-colors"><Plus className="w-4 h-4" /></button>
                            <button onClick={() => handleRemoveCategory(cat.id)} className="p-1 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/30 border-b border-gray-100">
                          <td colSpan={7} className="px-6 py-4">
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cat.showDescriptionInMenu || false}
                                    onChange={(e) => handleCategoryChange(cat.id, 'showDescriptionInMenu', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-xs font-bold text-gray-600">メニュー全体で表示</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cat.showDescriptionInList || false}
                                    onChange={(e) => handleCategoryChange(cat.id, 'showDescriptionInList', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-xs font-bold text-gray-600">個別一覧ページで表示</span>
                                </label>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${cat.category} の説明文編集`,
                                    value: cat.description || "",
                                    onSave: (val) => handleCategoryChange(cat.id, 'description', val)
                                  })}
                                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  説明文を編集
                                </button>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">カテゴリー画像 (カンマ区切りで複数可)</span>
                                <input
                                  type="text"
                                  value={cat.images?.join(',') || ""}
                                  onChange={(e) => handleCategoryChange(cat.id, 'images', e.target.value.split(','))}
                                  placeholder="/images/img1.webp, https://example.com/img2.webp"
                                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-gray-600 focus:border-blue-500 outline-none transition-all"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        {cat.items.map((item) => (
                          <tr key={item.name} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 border-r border-gray-100">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cat.id}</span>
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handlePriceChange(cat.id, item.name, 'name', e.target.value)}
                                className="w-full px-3 py-1 bg-white border border-gray-200 rounded-lg font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                              />
                              <input
                                type="text"
                                value={item.badge || ""}
                                onChange={(e) => handlePriceChange(cat.id, item.name, 'badge', e.target.value)}
                                placeholder="バッジ (例: おすすめ)"
                                className="w-full px-3 py-1 mt-1 bg-gray-50 border border-transparent rounded text-[10px] text-gray-500 font-bold focus:border-blue-300 focus:bg-white outline-none transition-all"
                              />
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <div className="relative flex items-center">
                                <span className="absolute left-3 font-black text-gray-400 text-sm">¥</span>
                                <input
                                  type="text"
                                  value={item.price}
                                  onChange={(e) => handlePriceChange(cat.id, item.name, 'price', e.target.value)}
                                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg font-black text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() => setEditingText({
                                    title: `${item.name} の特徴編集`,
                                    value: item.features.join('\n'),
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'features', val.split('\n'))
                                  })}
                                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  特徴を編集
                                </button>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${item.name} の解説文編集`,
                                    value: item.description || "",
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'description', val)
                                  })}
                                  className="w-full px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl font-bold text-[10px] text-blue-700 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                                >
                                  <Info className="w-3 h-3" />
                                  解説を編集
                                </button>
                                <button
                                  onClick={() => setEditingPackage({ catId: cat.id, item: JSON.parse(JSON.stringify(item)) })}
                                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl font-bold text-[10px] text-white hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                                >
                                  <LayoutGrid className="w-3 h-3" />
                                  詳細設定
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <input
                                type="text"
                                value={item.image || ""}
                                onChange={(e) => handlePriceChange(cat.id, item.name, 'image', e.target.value)}
                                placeholder="/images/Audio/filename.png"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-gray-600 focus:border-blue-500 outline-none transition-all"
                              />
                              <p className="text-[8px] text-gray-400 mt-1 font-bold">※例: /images/Audio/〜</p>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button onClick={() => handleRemoveItem(cat.id, item.name)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}

                    {/* Security Section */}
                    {securityPlans.length > 0 && (
                      <tr className="bg-red-50/30">
                        <td colSpan={6} className="px-6 py-3 text-[10px] font-black text-red-600 uppercase tracking-widest border-b border-gray-200">
                          セキュリティー関連
                        </td>
                      </tr>
                    )}
                    {securityPlans.map((cat) => (
                      <React.Fragment key={cat.id}>
                        <tr className="bg-gray-50/50">
                          <td colSpan={5} className="px-6 py-3 text-xs font-black text-gray-600 uppercase tracking-widest border-b border-gray-200">
                            <input
                              type="text"
                              value={cat.category}
                              onChange={(e) => handleCategoryChange(cat.id, 'category', e.target.value)}
                              className="bg-transparent border-none font-black text-gray-600 focus:ring-0 w-full"
                            />
                          </td>
                          <td className="bg-gray-50/50 border-b border-gray-200 px-6 flex items-center gap-2 py-3">
                            <button onClick={() => setShowAddItem({ categoryId: cat.id })} className="p-1 hover:text-blue-600 transition-colors"><Plus className="w-4 h-4" /></button>
                            <button onClick={() => handleRemoveCategory(cat.id)} className="p-1 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/30 border-b border-gray-100">
                          <td colSpan={7} className="px-6 py-4">
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cat.showDescriptionInMenu || false}
                                    onChange={(e) => handleCategoryChange(cat.id, 'showDescriptionInMenu', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-xs font-bold text-gray-600">メニュー全体で表示</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cat.showDescriptionInList || false}
                                    onChange={(e) => handleCategoryChange(cat.id, 'showDescriptionInList', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-xs font-bold text-gray-600">個別一覧ページで表示</span>
                                </label>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${cat.category} の説明文編集`,
                                    value: cat.description || "",
                                    onSave: (val) => handleCategoryChange(cat.id, 'description', val)
                                  })}
                                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  説明文を編集
                                </button>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">カテゴリー画像 (カンマ区切りで複数可)</span>
                                <input
                                  type="text"
                                  value={cat.images?.join(',') || ""}
                                  onChange={(e) => handleCategoryChange(cat.id, 'images', e.target.value.split(','))}
                                  placeholder="/images/img1.webp, https://example.com/img2.webp"
                                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-gray-600 focus:border-blue-500 outline-none transition-all"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        {cat.items.map((item) => (
                          <tr key={item.name} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 border-r border-gray-100">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cat.id}</span>
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handlePriceChange(cat.id, item.name, 'name', e.target.value)}
                                className="w-full px-3 py-1 bg-white border border-gray-200 rounded-lg font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                              />
                              <input
                                type="text"
                                value={item.badge || ""}
                                onChange={(e) => handlePriceChange(cat.id, item.name, 'badge', e.target.value)}
                                placeholder="バッジ (例: おすすめ)"
                                className="w-full px-3 py-1 mt-1 bg-gray-50 border border-transparent rounded text-[10px] text-gray-500 font-bold focus:border-blue-300 focus:bg-white outline-none transition-all"
                              />
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <div className="relative flex items-center">
                                <span className="absolute left-3 font-black text-gray-400 text-sm">¥</span>
                                <input
                                  type="text"
                                  value={item.price}
                                  onChange={(e) => handlePriceChange(cat.id, item.name, 'price', e.target.value)}
                                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg font-black text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() => setEditingText({
                                    title: `${item.name} の特徴編集`,
                                    value: item.features.join('\n'),
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'features', val.split('\n'))
                                  })}
                                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  特徴を編集
                                </button>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${item.name} の解説文編集`,
                                    value: item.description || "",
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'description', val)
                                  })}
                                  className="w-full px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl font-bold text-[10px] text-blue-700 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                                >
                                  <Info className="w-3 h-3" />
                                  解説を編集
                                </button>
                                <button
                                  onClick={() => setEditingPackage({ catId: cat.id, item: JSON.parse(JSON.stringify(item)) })}
                                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl font-bold text-[10px] text-white hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                                >
                                  <LayoutGrid className="w-3 h-3" />
                                  詳細設定
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <input
                                type="text"
                                value={item.image || ""}
                                onChange={(e) => handlePriceChange(cat.id, item.name, 'image', e.target.value)}
                                placeholder="/images/Audio/filename.png"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-gray-600 focus:border-blue-500 outline-none transition-all"
                              />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button onClick={() => handleRemoveItem(cat.id, item.name)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}

                    {/* Others Section */}
                    {otherPlans.length > 0 && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-6 py-3 text-[10px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-200">
                          その他
                        </td>
                      </tr>
                    )}
                    {otherPlans.map((cat) => (
                      <React.Fragment key={cat.id}>
                        <tr className="bg-gray-50/50">
                          <td colSpan={5} className="px-6 py-3 text-xs font-black text-gray-600 uppercase tracking-widest border-b border-gray-200">
                            <input
                              type="text"
                              value={cat.category}
                              onChange={(e) => handleCategoryChange(cat.id, 'category', e.target.value)}
                              className="bg-transparent border-none font-black text-gray-600 focus:ring-0 w-full"
                            />
                          </td>
                          <td className="bg-gray-50/50 border-b border-gray-200 px-6 flex items-center gap-2 py-3">
                            <button onClick={() => setShowAddItem({ categoryId: cat.id })} className="p-1 hover:text-blue-600 transition-colors"><Plus className="w-4 h-4" /></button>
                            <button onClick={() => handleRemoveCategory(cat.id)} className="p-1 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/30 border-b border-gray-100">
                          <td colSpan={7} className="px-6 py-4">
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cat.showDescriptionInMenu || false}
                                    onChange={(e) => handleCategoryChange(cat.id, 'showDescriptionInMenu', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-xs font-bold text-gray-600">メニュー全体で表示</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cat.showDescriptionInList || false}
                                    onChange={(e) => handleCategoryChange(cat.id, 'showDescriptionInList', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-xs font-bold text-gray-600">個別一覧ページで表示</span>
                                </label>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${cat.category} の説明文編集`,
                                    value: cat.description || "",
                                    onSave: (val) => handleCategoryChange(cat.id, 'description', val)
                                  })}
                                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  説明文を編集
                                </button>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">カテゴリー画像 (カンマ区切りで複数可)</span>
                                <input
                                  type="text"
                                  value={cat.images?.join(',') || ""}
                                  onChange={(e) => handleCategoryChange(cat.id, 'images', e.target.value.split(','))}
                                  placeholder="/images/img1.jpg, https://example.com/img2.jpg"
                                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-gray-600 focus:border-blue-500 outline-none transition-all"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        {cat.items.map((item) => (
                          <tr key={item.name} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 border-r border-gray-100">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cat.id}</span>
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handlePriceChange(cat.id, item.name, 'name', e.target.value)}
                                className="w-full px-3 py-1 bg-white border border-gray-200 rounded-lg font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                              />
                              <input
                                type="text"
                                value={item.badge || ""}
                                onChange={(e) => handlePriceChange(cat.id, item.name, 'badge', e.target.value)}
                                placeholder="バッジ (例: おすすめ)"
                                className="w-full px-3 py-1 mt-1 bg-gray-50 border border-transparent rounded text-[10px] text-gray-500 font-bold focus:border-blue-300 focus:bg-white outline-none transition-all"
                              />
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <div className="relative flex items-center">
                                <span className="absolute left-3 font-black text-gray-400 text-sm">¥</span>
                                <input
                                  type="text"
                                  value={item.price}
                                  onChange={(e) => handlePriceChange(cat.id, item.name, 'price', e.target.value)}
                                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg font-black text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() => setEditingText({
                                    title: `${item.name} の特徴編集`,
                                    value: item.features.join('\n'),
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'features', val.split('\n'))
                                  })}
                                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  特徴を編集
                                </button>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${item.name} の解説文編集`,
                                    value: item.description || "",
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'description', val)
                                  })}
                                  className="w-full px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl font-bold text-[10px] text-blue-700 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                                >
                                  <Info className="w-3 h-3" />
                                  解説を編集
                                </button>
                                <button
                                  onClick={() => setEditingPackage({ catId: cat.id, item: JSON.parse(JSON.stringify(item)) })}
                                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl font-bold text-[10px] text-white hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                                >
                                  <LayoutGrid className="w-3 h-3" />
                                  詳細設定
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <input
                                type="text"
                                value={item.image || ""}
                                onChange={(e) => handlePriceChange(cat.id, item.name, 'image', e.target.value)}
                                placeholder="/images/Audio/filename.png"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-gray-600 focus:border-blue-500 outline-none transition-all"
                              />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button onClick={() => handleRemoveItem(cat.id, item.name)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'calendar' ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-12 border border-gray-100 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-3xl font-black tracking-tighter">{year}年 {month + 1}月</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">営業カレンダー設定</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={prevMonth}
                    className="p-4 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-colors"
                    aria-label="前月"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-4 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-colors"
                    aria-label="次月"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-8">
                {['日', '月', '火', '水', '木', '金', '土'].map((day, i) => (
                  <div key={day} className={`text-center text-xs font-black mb-4 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-300'}`}>
                    {day}
                  </div>
                ))}

                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayOfWeek = new Date(year, month, day).getDay();
                  const isWeeklyHoliday = DEFAULT_WEEKLY_HOLIDAYS.includes(dayOfWeek);
                  const isManualHoliday = holidays[monthKey]?.includes(day);
                  const isClosed = isWeeklyHoliday !== isManualHoliday;

                  return (
                    <button
                      key={day}
                      onClick={() => toggleHoliday(day)}
                      className={`
                        aspect-square flex flex-col items-center justify-center rounded-2xl text-lg font-black transition-all relative group border-2
                        ${isClosed ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-gray-50 text-gray-900 hover:border-blue-200 hover:bg-blue-50/30'}
                      `}
                    >
                      {day}
                      {isClosed && (
                        <span className="absolute bottom-3 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded bg-red-500"></div>
                  <span className="font-bold text-gray-600">赤色の日付が定休日として表示されます</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-gray-400 leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>日付をクリックすることで「営業日」と「休日」を切り替えることができます。毎週の定休日（火・金）も個別に営業日に変更可能です。</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'partners' ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
            {/* Brand Partners (Manufacturers) */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-blue-50/30">
                <div>
                  <h3 className="text-xl font-black">メーカー管理（信頼のパートナー）</h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">トップページ下部のメーカー一覧を編集します。</p>
                </div>
                <button
                  onClick={() => setShowAddBrandPartner(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  <Plus className="w-4 h-4" />
                  メーカー追加
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Brand Name</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Category</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Icon</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">URL</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Description</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-16">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localBrandPartners.map((p) => (
                      <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border-r border-gray-100">
                          <input
                            type="text"
                            value={p.name}
                            onChange={(e) => handleBrandPartnerChange(p.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                          />
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <input
                            type="text"
                            value={p.category}
                            onChange={(e) => handleBrandPartnerChange(p.id, 'category', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-gray-600 focus:border-blue-500 outline-none transition-all"
                          />
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <select
                            value={p.iconName}
                            onChange={(e) => handleBrandPartnerChange(p.id, 'iconName', e.target.value as any)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-gray-600 focus:border-blue-500 outline-none transition-all"
                          >
                            <option value="ShieldCheck">Shield</option>
                            <option value="Speaker">Speaker</option>
                            <option value="Video">Video</option>
                            <option value="Globe">Other</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <input
                            type="text"
                            value={p.url}
                            onChange={(e) => handleBrandPartnerChange(p.id, 'url', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-blue-600 focus:border-blue-500 outline-none transition-all"
                          />
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <button
                            onClick={() => setEditingText({
                              title: `${p.name} の説明文編集`,
                              value: p.description,
                              onSave: (val) => handleBrandPartnerChange(p.id, 'description', val)
                            })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            詳細を編集
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => handleRemoveBrandPartner(p.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fellow Shops List */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black">パートナーショップ管理（加盟店一覧）</h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">カーオーディオセンター・グループの店舗一覧を編集します。</p>
                </div>
                <button
                  onClick={() => setShowAddPartner(true)}
                  className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  パートナー追加
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Shop Name</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Location</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">URL</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Description</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-16">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localPartners.map((p) => (
                      <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border-r border-gray-100">
                          <input
                            type="text"
                            value={p.name}
                            onChange={(e) => handlePartnerChange(p.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                          />
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <input
                            type="text"
                            value={p.location}
                            onChange={(e) => handlePartnerChange(p.id, 'location', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-gray-600 focus:border-blue-500 outline-none transition-all"
                          />
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <input
                            type="text"
                            value={p.url}
                            onChange={(e) => handlePartnerChange(p.id, 'url', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-blue-600 focus:border-blue-500 outline-none transition-all"
                          />
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <button
                            onClick={() => setEditingText({
                              title: `${p.name} の説明文編集`,
                              value: p.description,
                              onSave: (val) => handlePartnerChange(p.id, 'description', val)
                            })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            詳細を編集
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => handleRemovePartner(p.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'recruitment' ? (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Audio Recruitment */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black flex items-center gap-3">
                    <Speaker className="w-6 h-6 text-blue-600" />
                    オーディオ採用設定
                  </h3>
                  <button
                    onClick={() => {
                      setLocalAudioRecruitment({ ...localAudioRecruitment, visible: !localAudioRecruitment.visible });
                    }}
                    className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${localAudioRecruitment.visible ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {localAudioRecruitment.visible ? '表示中' : '非表示'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">求人タイトル</label>
                    <input
                      type="text"
                      value={localAudioRecruitment.title}
                      onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">募集メッセージ</label>
                    <textarea
                      value={localAudioRecruitment.message}
                      onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, message: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-600 focus:border-blue-500 outline-none transition-all h-24 resize-none"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">募集要項</label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localAudioRecruitment.showRequirements}
                          onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, showRequirements: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">表示する</span>
                      </label>
                    </div>
                    <textarea
                      value={localAudioRecruitment.requirements.join('\n')}
                      onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, requirements: e.target.value.split('\n') })}
                      disabled={!localAudioRecruitment.showRequirements}
                      className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 focus:border-blue-500 outline-none transition-all h-24 resize-none ${!localAudioRecruitment.showRequirements ? 'opacity-50 grayscale' : ''}`}
                      placeholder="例：車が好きな方&#10;経験者優遇"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">給与・待遇</label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localAudioRecruitment.showSalary}
                          onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, showSalary: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">表示する</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      value={localAudioRecruitment.salary}
                      onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, salary: e.target.value })}
                      disabled={!localAudioRecruitment.showSalary}
                      className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all ${!localAudioRecruitment.showSalary ? 'opacity-50' : ''}`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">応募先（電話番号など）</label>
                    <input
                      type="text"
                      value={localAudioRecruitment.contactInfo}
                      onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, contactInfo: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-black text-blue-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <button
                    onClick={() => setAudioRecruitment(localAudioRecruitment)}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    オーディオ採用設定を保存
                  </button>
                </div>
              </div>

              {/* Security Recruitment */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black flex items-center gap-3">
                    <Wrench className="w-6 h-6 text-purple-600" />
                    セキュリティー採用設定
                  </h3>
                  <button
                    onClick={() => {
                      setLocalSecurityRecruitment({ ...localSecurityRecruitment, visible: !localSecurityRecruitment.visible });
                    }}
                    className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${localSecurityRecruitment.visible ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {localSecurityRecruitment.visible ? '表示中' : '非表示'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">求人タイトル</label>
                    <input
                      type="text"
                      value={localSecurityRecruitment.title}
                      onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">募集メッセージ</label>
                    <textarea
                      value={localSecurityRecruitment.message}
                      onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, message: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-600 focus:border-blue-500 outline-none transition-all h-24 resize-none"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">募集要項</label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localSecurityRecruitment.showRequirements}
                          onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, showRequirements: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">表示する</span>
                      </label>
                    </div>
                    <textarea
                      value={localSecurityRecruitment.requirements.join('\n')}
                      onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, requirements: e.target.value.split('\n') })}
                      disabled={!localSecurityRecruitment.showRequirements}
                      className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 focus:border-blue-500 outline-none transition-all h-24 resize-none ${!localSecurityRecruitment.showRequirements ? 'opacity-50 grayscale' : ''}`}
                      placeholder="例：車が好きな方&#10;経験者優優遇"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">給与・待遇</label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localSecurityRecruitment.showSalary}
                          onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, showSalary: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">表示する</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      value={localSecurityRecruitment.salary}
                      onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, salary: e.target.value })}
                      disabled={!localSecurityRecruitment.showSalary}
                      className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all ${!localSecurityRecruitment.showSalary ? 'opacity-50' : ''}`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">応募先（電話番号など）</label>
                    <input
                      type="text"
                      value={localSecurityRecruitment.contactInfo}
                      onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, contactInfo: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-black text-blue-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <button
                    onClick={() => setSecurityRecruitment(localSecurityRecruitment)}
                    className="w-full bg-purple-600 text-white py-4 rounded-xl font-black tracking-widest shadow-xl shadow-purple-100 hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    セキュリティー採用設定を保存
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'assets' ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 max-w-3xl mx-auto">
              <h3 className="text-xl font-black mb-8">サイトアセット管理</h3>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ロゴテキスト</label>
                    <input
                      type="text"
                      value={localAssets.logoText}
                      onChange={(e) => handleAssetChange('logoText', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ヒーロー画像（パス または URL）</label>
                    <input
                      type="text"
                      value={localAssets.heroImage}
                      onChange={(e) => handleAssetChange('heroImage', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-xs text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">オーディオ画像</label>
                    <input
                      type="text"
                      value={localAssets.audioMenuImage}
                      onChange={(e) => handleAssetChange('audioMenuImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">セキュリティー画像</label>
                    <input
                      type="text"
                      value={localAssets.securityMenuImage}
                      onChange={(e) => handleAssetChange('securityMenuImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ドラレコ画像</label>
                    <input
                      type="text"
                      value={localAssets.dashcamMenuImage}
                      onChange={(e) => handleAssetChange('dashcamMenuImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ショールーム画像</label>
                    <input
                      type="text"
                      value={localAssets.showroomImage}
                      onChange={(e) => handleAssetChange('showroomImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ピット画像</label>
                    <input
                      type="text"
                      value={localAssets.pitImage}
                      onChange={(e) => handleAssetChange('pitImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ワークスペース画像</label>
                    <input
                      type="text"
                      value={localAssets.workspaceImage}
                      onChange={(e) => handleAssetChange('workspaceImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">視聴室画像</label>
                    <input
                      type="text"
                      value={localAssets.auditionRoomImage}
                      onChange={(e) => handleAssetChange('auditionRoomImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">九州No.1画像</label>
                    <input
                      type="text"
                      value={localAssets.kyushuNo1Image}
                      onChange={(e) => handleAssetChange('kyushuNo1Image', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">SPS認定店画像</label>
                    <input
                      type="text"
                      value={localAssets.spsCertifiedImage}
                      onChange={(e) => handleAssetChange('spsCertifiedImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Snap-on画像</label>
                    <input
                      type="text"
                      value={localAssets.snaponImage}
                      onChange={(e) => handleAssetChange('snaponImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">バッテリー充電器画像</label>
                    <input
                      type="text"
                      value={localAssets.batteryChargerImage}
                      onChange={(e) => handleAssetChange('batteryChargerImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-black text-blue-900 mb-1">プレビューについて</h4>
                    <p className="text-xs text-blue-700 font-bold leading-relaxed">
                      画像パスまたはURLを変更すると、保存後にサイト全体の画像が更新されます。
                      外部サイトの画像（https://...）または、サイト内の画像（/images/...）を入力してください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'guides' ? (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            {/* Headers */}
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 mb-8">
              <RefreshCw className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="コラム記事のタイトルで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-lg font-bold w-full focus:ring-0 placeholder:text-gray-600"
              />
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Badge & Text</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Title & Features</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">URL Links</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Image URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-blue-50/50">
                      <td colSpan={4} className="px-6 py-3 text-xs font-black text-blue-600 uppercase tracking-widest border-b border-gray-200">
                        知識ガイド・コラム一覧
                      </td>
                    </tr>
                    {filteredGuides.map((guide) => (
                      <tr key={guide.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border-r border-gray-100 w-48 text-center">
                          <input
                            type="text"
                            value={guide.badge || ""}
                            onChange={(e) => handleGuideChange(guide.id, 'badge', e.target.value)}
                            placeholder="バッジ名"
                            className="w-full mb-3 px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] text-gray-500 font-bold focus:border-blue-300 outline-none transition-all"
                          />
                          <button
                            onClick={() => setEditingText({
                              title: `${guide.title} の説明文編集`,
                              value: guide.description,
                              onSave: (val) => handleGuideChange(guide.id, 'description', val)
                            })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                          >
                            <Edit3 className="w-3 h-3" />
                            テキストを編集
                          </button>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100 min-w-[300px]">
                          <input
                            type="text"
                            value={guide.title}
                            onChange={(e) => handleGuideChange(guide.id, 'title', e.target.value)}
                            className="w-full font-black text-gray-900 focus:text-blue-600 outline-none transition-colors mb-3 px-3 py-2 border border-transparent hover:border-gray-200 rounded-lg focus:border-blue-500 bg-transparent"
                          />
                          <button
                            onClick={() => setEditingText({
                              title: `${guide.title} の特徴リスト`,
                              value: (guide.features || []).join('\n'),
                              onSave: (val) => handleGuideChange(guide.id, 'features', val.split('\n'))
                            })}
                            className="w-full px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl font-bold text-[10px] text-blue-700 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                          >
                            <LayoutGrid className="w-3 h-3" />
                            特徴タグを編集 (改行)
                          </button>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <input
                            type="text"
                            value={guide.link || ""}
                            onChange={(e) => handleGuideChange(guide.id, 'link', e.target.value)}
                            placeholder="外部リンク URL"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-blue-600 focus:border-blue-500 outline-none transition-all"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={guide.image || ""}
                            onChange={(e) => handleGuideChange(guide.id, 'image', e.target.value)}
                            placeholder="/images/Audio/filename.png"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-gray-600 focus:border-blue-500 outline-none transition-all"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'demo' ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-blue-50/10">
                <div>
                  <h3 className="text-xl font-black">試聴可能スピーカー管理</h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">店内で試聴可能なスピーカーリストを編集します。</p>
                </div>
                <button
                  onClick={handleAddSpeakerBrand}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  <Plus className="w-4 h-4" />
                  ブランド追加
                </button>
              </div>
              <div className="p-8 space-y-12">
                {localAuditionSpeakers.map((brand, bIdx) => (
                  <div key={bIdx} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative group">
                    <button
                      onClick={() => handleRemoveSpeakerBrand(bIdx)}
                      className="absolute top-8 right-8 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ブランド名</label>
                        <input
                          type="text"
                          value={brand.brand}
                          onChange={(e) => handleBrandInfoChange(bIdx, 'brand', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">国名</label>
                        <input
                          type="text"
                          value={brand.origin}
                          onChange={(e) => handleBrandInfoChange(bIdx, 'origin', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">モデル・価格リスト</h4>
                        <button
                          onClick={() => handleAddSpeakerUnit(bIdx)}
                          className="text-[10px] font-black text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> モデル追加
                        </button>
                      </div>

                      <div className="grid gap-3">
                        {brand.units.map((unit, uIdx) => (
                          <div key={uIdx} className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-wrap md:flex-nowrap gap-4 items-center">
                            <div className="flex-grow min-w-[200px]">
                              <input
                                type="text"
                                placeholder="モデル名"
                                value={unit.model}
                                onChange={(e) => handleSpeakerChange(bIdx, uIdx, 'model', e.target.value)}
                                className="w-full px-3 py-1 font-black text-sm text-gray-900 border-b border-transparent focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div className="w-48">
                              <input
                                type="text"
                                placeholder="価格"
                                value={unit.price || ""}
                                onChange={(e) => handleSpeakerChange(bIdx, uIdx, 'price', e.target.value)}
                                className="w-full px-3 py-1 font-black text-sm text-blue-600 border-b border-transparent focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div className="w-48">
                              <input
                                type="text"
                                placeholder="YouTube URL"
                                value={unit.youtube || ""}
                                onChange={(e) => handleSpeakerChange(bIdx, uIdx, 'youtube', e.target.value)}
                                className="w-full px-3 py-1 font-bold text-xs text-red-500 border-b border-transparent focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div className="w-48">
                              <input
                                type="text"
                                placeholder="画像URL"
                                value={unit.image || ""}
                                onChange={(e) => handleSpeakerChange(bIdx, uIdx, 'image', e.target.value)}
                                className="w-full px-3 py-1 font-bold text-xs text-blue-500 border-b border-transparent focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                              {unit.image ? (
                                <img src={unit.image} className="w-full h-full object-cover" alt="Preview" referrerPolicy="no-referrer" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-400 font-black uppercase text-center leading-none px-1">No<br />Img</div>
                              )}
                            </div>
                            <div className="w-32">
                              <select
                                value={unit.status}
                                onChange={(e) => handleSpeakerChange(bIdx, uIdx, 'status', e.target.value)}
                                className="w-full px-2 py-1 font-bold text-xs text-gray-500 border-b border-transparent focus:border-blue-500 outline-none"
                              >
                                <option value="Available">試聴可能</option>
                                <option value="Demo Car">デモカー装着</option>
                                <option value="Coming Soon">近日登場</option>
                                <option value="Ordered">注文中</option>
                              </select>
                            </div>
                            <button
                              onClick={() => handleRemoveSpeakerUnit(bIdx, uIdx)}
                              className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="flex items-start gap-4">
                <Youtube className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                  <h4 className="text-lg font-black mb-2">音源サンプルについて</h4>
                  <p className="text-xs text-gray-400 font-bold leading-relaxed">
                    YouTube URLを入力すると、ユーザーが試聴リストから直接動画を確認できるようになります。
                    URLは `https://www.youtube.com/watch?v=...` 形式で入力してください。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        {editingPackage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[2.5rem] p-10 w-full max-w-6xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
            >
              <div className="flex items-center justify-between mb-8 shrink-0">
                <div>
                  <h3 className="text-2xl font-black tracking-tighter">{editingPackage.item.name} のパッケージ詳細設定</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">おトク情報やラインナップを編集してください</p>
                </div>
                <button
                  onClick={() => setEditingPackage(null)}
                  className="p-3 hover:bg-gray-100 rounded-2xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-10">
                    <section>
                      <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        価格・おトク情報
                      </h4>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">通常施工合計 (円)</label>
                          <input
                            type="text"
                            value={editingPackage.item.packageDetails?.standardPrice || ""}
                            onChange={(e) => setEditingPackage({
                              ...editingPackage,
                              item: {
                                ...editingPackage.item,
                                packageDetails: {
                                  ...(editingPackage.item.packageDetails || { standardPrice: "", savings: "", contents: [] }),
                                  standardPrice: e.target.value.replace(/[^0-9]/g, '')
                                }
                              }
                            })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                            placeholder="例: 117700"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">おトク額 (円)</label>
                          <input
                            type="text"
                            value={editingPackage.item.packageDetails?.savings || ""}
                            onChange={(e) => setEditingPackage({
                              ...editingPackage,
                              item: {
                                ...editingPackage.item,
                                packageDetails: {
                                  ...(editingPackage.item.packageDetails || { standardPrice: "", savings: "", contents: [] }),
                                  savings: e.target.value.replace(/[^0-9]/g, '')
                                }
                              }
                            })}
                            className="w-full px-4 py-3 bg-red-50 border border-red-100 rounded-xl font-black text-red-600 focus:border-red-500 outline-none transition-all"
                            placeholder="例: 38950"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <input
                          type="checkbox"
                          id="showSavings"
                          checked={editingPackage.item.showSavings !== false}
                          onChange={(e) => setEditingPackage({
                            ...editingPackage,
                            item: {
                              ...editingPackage.item,
                              showSavings: e.target.checked
                            }
                          })}
                          className="w-5 h-5 rounded border-blue-200 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="showSavings" className="text-sm font-black text-blue-900 cursor-pointer">
                          「おトク！」バッジを表示する
                        </label>
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                          <LayoutGrid className="w-4 h-4" />
                          パッケージ内容
                        </h4>
                        <button
                          onClick={() => {
                            const newContents = [...(editingPackage.item.packageDetails?.contents || []), { title: "", description: "", icon: "Speaker" }];
                            setEditingPackage({
                              ...editingPackage,
                              item: {
                                ...editingPackage.item,
                                packageDetails: {
                                  ...(editingPackage.item.packageDetails || { standardPrice: "", savings: "", contents: [] }),
                                  contents: newContents
                                }
                              }
                            });
                          }}
                          className="text-[10px] font-black text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> 内容を追加
                        </button>
                      </div>
                      <div className="space-y-3">
                        {(editingPackage.item.packageDetails?.contents || []).map((content, idx) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4 items-start relative group">
                            <div className="space-y-2 flex-grow">
                              <input
                                type="text"
                                value={content.title}
                                onChange={(e) => {
                                  const newContents = [...(editingPackage.item.packageDetails?.contents || [])];
                                  newContents[idx] = { ...content, title: e.target.value };
                                  setEditingPackage({
                                    ...editingPackage,
                                    item: {
                                      ...editingPackage.item,
                                      packageDetails: { ...editingPackage.item.packageDetails!, contents: newContents }
                                    }
                                  });
                                }}
                                className="w-full px-3 py-1 bg-white border border-gray-200 rounded-lg font-black text-xs text-gray-900 outline-none"
                                placeholder="タイトル (例: スピーカー)"
                              />
                              <input
                                type="text"
                                value={content.description}
                                onChange={(e) => {
                                  const newContents = [...(editingPackage.item.packageDetails?.contents || [])];
                                  newContents[idx] = { ...content, description: e.target.value };
                                  setEditingPackage({
                                    ...editingPackage,
                                    item: {
                                      ...editingPackage.item,
                                      packageDetails: { ...editingPackage.item.packageDetails!, contents: newContents }
                                    }
                                  });
                                }}
                                className="w-full px-3 py-1 bg-white border border-gray-200 rounded-lg font-bold text-[10px] text-gray-500 outline-none"
                                placeholder="説明 (例: 10万円までのユニット)"
                              />
                              <select
                                value={content.icon}
                                onChange={(e) => {
                                  const newContents = [...(editingPackage.item.packageDetails?.contents || [])];
                                  newContents[idx] = { ...content, icon: e.target.value };
                                  setEditingPackage({
                                    ...editingPackage,
                                    item: {
                                      ...editingPackage.item,
                                      packageDetails: { ...editingPackage.item.packageDetails!, contents: newContents }
                                    }
                                  });
                                }}
                                className="px-3 py-1 bg-white border border-gray-200 rounded-lg font-bold text-[10px] text-gray-500 outline-none"
                              >
                                <option value="Speaker">Speaker</option>
                                <option value="Activity">Activity</option>
                                <option value="Layers">Layers</option>
                                <option value="Zap">Zap</option>
                                <option value="Wrench">Wrench</option>
                              </select>
                            </div>
                            <button
                              onClick={() => {
                                const newContents = (editingPackage.item.packageDetails?.contents || []).filter((_, i) => i !== idx);
                                setEditingPackage({
                                  ...editingPackage,
                                  item: {
                                    ...editingPackage.item,
                                    packageDetails: { ...editingPackage.item.packageDetails!, contents: newContents }
                                  }
                                });
                              }}
                              className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          アップグレードオプション
                        </h4>
                        <button
                          onClick={() => {
                            const newUpgrades = [...(editingPackage.item.packageDetails?.upgrades || []), { title: "", price: "", description: "" }];
                            setEditingPackage({
                              ...editingPackage,
                              item: {
                                ...editingPackage.item,
                                packageDetails: {
                                  ...(editingPackage.item.packageDetails || { standardPrice: "", savings: "", contents: [] }),
                                  upgrades: newUpgrades
                                }
                              }
                            });
                          }}
                          className="text-[10px] font-black text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> オプションを追加
                        </button>
                      </div>
                      <div className="space-y-3">
                        {(editingPackage.item.packageDetails?.upgrades || []).map((upgrade, idx) => (
                          <div key={idx} className="p-4 bg-gray-900 rounded-2xl border border-gray-800 flex gap-4 items-start relative group">
                            <div className="space-y-2 flex-grow">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={upgrade.title}
                                  onChange={(e) => {
                                    const newUpgrades = [...(editingPackage.item.packageDetails?.upgrades || [])];
                                    newUpgrades[idx] = { ...upgrade, title: e.target.value };
                                    setEditingPackage({
                                      ...editingPackage,
                                      item: {
                                        ...editingPackage.item,
                                        packageDetails: { ...editingPackage.item.packageDetails!, upgrades: newUpgrades }
                                      }
                                    });
                                  }}
                                  className="flex-[2] px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg font-black text-xs text-white outline-none"
                                  placeholder="オプション名"
                                />
                                <input
                                  type="text"
                                  value={upgrade.price}
                                  onChange={(e) => {
                                    const newUpgrades = [...(editingPackage.item.packageDetails?.upgrades || [])];
                                    newUpgrades[idx] = { ...upgrade, price: e.target.value };
                                    setEditingPackage({
                                      ...editingPackage,
                                      item: {
                                        ...editingPackage.item,
                                        packageDetails: { ...editingPackage.item.packageDetails!, upgrades: newUpgrades }
                                      }
                                    });
                                  }}
                                  className="flex-1 px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg font-black text-xs text-blue-400 outline-none"
                                  placeholder="価格 (例: 11000)"
                                />
                              </div>
                              <input
                                type="text"
                                value={upgrade.description}
                                onChange={(e) => {
                                  const newUpgrades = [...(editingPackage.item.packageDetails?.upgrades || [])];
                                  newUpgrades[idx] = { ...upgrade, description: e.target.value };
                                  setEditingPackage({
                                    ...editingPackage,
                                    item: {
                                      ...editingPackage.item,
                                      packageDetails: { ...editingPackage.item.packageDetails!, upgrades: newUpgrades }
                                    }
                                  });
                                }}
                                className="w-full px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg font-bold text-[10px] text-gray-400 outline-none"
                                placeholder="説明文"
                              />
                            </div>
                            <button
                              onClick={() => {
                                const newUpgrades = (editingPackage.item.packageDetails?.upgrades || []).filter((_, i) => i !== idx);
                                setEditingPackage({
                                  ...editingPackage,
                                  item: {
                                    ...editingPackage.item,
                                    packageDetails: { ...editingPackage.item.packageDetails!, upgrades: newUpgrades }
                                  }
                                });
                              }}
                              className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="space-y-10">
                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          ラインナップ & 試聴動画
                        </h4>
                        <button
                          onClick={() => {
                            const newLineup = [...(editingPackage.item.lineup || []), { name: "", price: "", image: "", youtube: "" }];
                            setEditingPackage({
                              ...editingPackage,
                              item: { ...editingPackage.item, lineup: newLineup }
                            });
                          }}
                          className="text-[10px] font-black text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> ユニットを追加
                        </button>
                      </div>
                      <div className="space-y-4">
                        {(editingPackage.item.lineup || []).map((lineupItem, idx) => (
                          <div key={idx} className="p-5 bg-gray-50 rounded-3xl border border-gray-100 flex gap-4 items-start relative group">
                            <div className="space-y-3 flex-grow">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={lineupItem.name}
                                  onChange={(e) => {
                                    const newLineup = [...(editingPackage.item.lineup || [])];
                                    newLineup[idx] = { ...lineupItem, name: e.target.value };
                                    setEditingPackage({
                                      ...editingPackage,
                                      item: { ...editingPackage.item, lineup: newLineup }
                                    });
                                  }}
                                  className="flex-[2] px-3 py-2 bg-white border border-gray-200 rounded-xl font-black text-xs text-gray-900 outline-none"
                                  placeholder="ブランド/モデル名"
                                />
                                <input
                                  type="text"
                                  value={lineupItem.price}
                                  onChange={(e) => {
                                    const newLineup = [...(editingPackage.item.lineup || [])];
                                    newLineup[idx] = { ...lineupItem, price: e.target.value.replace(/[^0-9]/g, '') };
                                    setEditingPackage({
                                      ...editingPackage,
                                      item: { ...editingPackage.item, lineup: newLineup }
                                    });
                                  }}
                                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl font-black text-xs text-blue-600 outline-none"
                                  placeholder="価格"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={lineupItem.image || ""}
                                  onChange={(e) => {
                                    const newLineup = [...(editingPackage.item.lineup || [])];
                                    newLineup[idx] = { ...lineupItem, image: e.target.value };
                                    setEditingPackage({
                                      ...editingPackage,
                                      item: { ...editingPackage.item, lineup: newLineup }
                                    });
                                  }}
                                  className="px-3 py-2 bg-white border border-gray-200 rounded-xl font-bold text-[10px] text-gray-500 outline-none"
                                  placeholder="画像パス/URL"
                                />
                                <input
                                  type="text"
                                  value={lineupItem.youtube || ""}
                                  onChange={(e) => {
                                    const newLineup = [...(editingPackage.item.lineup || [])];
                                    newLineup[idx] = { ...lineupItem, youtube: e.target.value };
                                    setEditingPackage({
                                      ...editingPackage,
                                      item: { ...editingPackage.item, lineup: newLineup }
                                    });
                                  }}
                                  className="px-3 py-2 bg-white border border-gray-200 rounded-xl font-bold text-[10px] text-red-500 outline-none"
                                  placeholder="YouTube URL"
                                />
                              </div>
                              <textarea
                                value={lineupItem.description || ""}
                                onChange={(e) => {
                                  const newLineup = [...(editingPackage.item.lineup || [])];
                                  newLineup[idx] = { ...lineupItem, description: e.target.value };
                                  setEditingPackage({
                                    ...editingPackage,
                                    item: { ...editingPackage.item, lineup: newLineup }
                                  });
                                }}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-bold text-[10px] text-gray-500 outline-none resize-none h-16"
                                placeholder="ユニットの説明文を入力..."
                              />
                            </div>
                            <button
                              onClick={() => {
                                const newLineup = (editingPackage.item.lineup || []).filter((_, i) => i !== idx);
                                setEditingPackage({
                                  ...editingPackage,
                                  item: { ...editingPackage.item, lineup: newLineup }
                                });
                              }}
                              className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          施工ギャラリー
                        </h4>
                        <button
                          onClick={() => {
                            const newGallery = [...(editingPackage.item.gallery || []), { title: "", images: [""] }];
                            setEditingPackage({
                              ...editingPackage,
                              item: { ...editingPackage.item, gallery: newGallery }
                            });
                          }}
                          className="text-[10px] font-black text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> ギャラリー項目を追加
                        </button>
                      </div>
                      <div className="space-y-6">
                        {(editingPackage.item.gallery || []).map((galleryItem, gIdx) => (
                          <div key={gIdx} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4 relative group">
                            <div className="flex items-center justify-between gap-4">
                              <input
                                type="text"
                                value={galleryItem.title}
                                onChange={(e) => {
                                  const newGallery = [...(editingPackage.item.gallery || [])];
                                  newGallery[gIdx] = { ...galleryItem, title: e.target.value };
                                  setEditingPackage({
                                    ...editingPackage,
                                    item: { ...editingPackage.item, gallery: newGallery }
                                  });
                                }}
                                className="flex-grow px-4 py-2 bg-white border border-gray-200 rounded-xl font-black text-xs text-gray-900 outline-none"
                                placeholder="ギャラリータイトル (例: フォレスター：ルーフ施工)"
                              />
                              <button
                                onClick={() => {
                                  const newGallery = (editingPackage.item.gallery || []).filter((_, i) => i !== gIdx);
                                  setEditingPackage({
                                    ...editingPackage,
                                    item: { ...editingPackage.item, gallery: newGallery }
                                  });
                                }}
                                className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">画像URLリスト</label>
                                <button
                                  onClick={() => {
                                    const newGallery = [...(editingPackage.item.gallery || [])];
                                    newGallery[gIdx] = { ...galleryItem, images: [...galleryItem.images, ""] };
                                    setEditingPackage({
                                      ...editingPackage,
                                      item: { ...editingPackage.item, gallery: newGallery }
                                    });
                                  }}
                                  className="text-[10px] font-black text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" /> 画像を追加
                                </button>
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                {galleryItem.images.map((img, iIdx) => (
                                  <div key={iIdx} className="flex gap-2">
                                    <input
                                      type="text"
                                      value={img}
                                      onChange={(e) => {
                                        const newGallery = [...(editingPackage.item.gallery || [])];
                                        const newImages = [...galleryItem.images];
                                        newImages[iIdx] = e.target.value;
                                        newGallery[gIdx] = { ...galleryItem, images: newImages };
                                        setEditingPackage({
                                          ...editingPackage,
                                          item: { ...editingPackage.item, gallery: newGallery }
                                        });
                                      }}
                                      className="flex-grow px-3 py-2 bg-white border border-gray-200 rounded-xl font-bold text-[10px] text-gray-500 outline-none"
                                      placeholder="画像パス/URL"
                                    />
                                    <button
                                      onClick={() => {
                                        const newGallery = [...(editingPackage.item.gallery || [])];
                                        const newImages = galleryItem.images.filter((_, i) => i !== iIdx);
                                        newGallery[gIdx] = { ...galleryItem, images: newImages };
                                        setEditingPackage({
                                          ...editingPackage,
                                          item: { ...editingPackage.item, gallery: newGallery }
                                        });
                                      }}
                                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          注意事項・条件
                        </h4>
                        <button
                          onClick={() => {
                            const newNotes = [...(editingPackage.item.packageDetails?.notes || []), ""];
                            setEditingPackage({
                              ...editingPackage,
                              item: {
                                ...editingPackage.item,
                                packageDetails: {
                                  ...(editingPackage.item.packageDetails || { standardPrice: "", savings: "", contents: [] }),
                                  notes: newNotes
                                }
                              }
                            });
                          }}
                          className="text-[10px] font-black text-gray-400 hover:text-gray-600 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> 注意事項を追加
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(editingPackage.item.packageDetails?.notes || []).map((note, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={note}
                              onChange={(e) => {
                                const newNotes = [...(editingPackage.item.packageDetails?.notes || [])];
                                newNotes[idx] = e.target.value;
                                setEditingPackage({
                                  ...editingPackage,
                                  item: {
                                    ...editingPackage.item,
                                    packageDetails: { ...editingPackage.item.packageDetails!, notes: newNotes }
                                  }
                                });
                              }}
                              className="flex-grow px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-xs text-gray-600 outline-none"
                              placeholder="注意事項を入力..."
                            />
                            <button
                              onClick={() => {
                                const newNotes = (editingPackage.item.packageDetails?.notes || []).filter((_, i) => i !== idx);
                                setEditingPackage({
                                  ...editingPackage,
                                  item: {
                                    ...editingPackage.item,
                                    packageDetails: { ...editingPackage.item.packageDetails!, notes: newNotes }
                                  }
                                });
                              }}
                              className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-8 border-t border-gray-100 shrink-0">
                <button
                  onClick={() => setEditingPackage(null)}
                  className="flex-1 py-5 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-all tracking-widest"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => {
                    handlePriceChange(editingPackage.catId, editingPackage.item.name, 'packageDetails', editingPackage.item.packageDetails);
                    handlePriceChange(editingPackage.catId, editingPackage.item.name, 'lineup', editingPackage.item.lineup);
                    handlePriceChange(editingPackage.catId, editingPackage.item.name, 'showSavings', editingPackage.item.showSavings);
                    handlePriceChange(editingPackage.catId, editingPackage.item.name, 'gallery', editingPackage.item.gallery);
                    setEditingPackage(null);
                  }}
                  className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl font-black tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                >
                  <Save className="w-5 h-5" />
                  パッケージ設定を保存
                </button>
              </div>
            </motion.div>
          </div>
        )}



        {editingText && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[2.5rem] p-10 w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black tracking-tighter">{editingText.title}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">詳細情報を編集してください</p>
                </div>
                <button
                  onClick={() => setEditingText(null)}
                  className="p-3 hover:bg-gray-100 rounded-2xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto mb-8">
                <textarea
                  autoFocus
                  value={editingText.value}
                  onChange={(e) => setEditingText({ ...editingText, value: e.target.value })}
                  className="w-full h-full min-h-[400px] p-8 bg-gray-50 border-2 border-gray-100 rounded-3xl font-bold text-xl text-gray-700 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none leading-relaxed"
                  placeholder="ここに詳細を入力してください..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setEditingText(null)}
                  className="flex-1 py-5 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-all tracking-widest"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => {
                    editingText.onSave(editingText.value);
                    setEditingText(null);
                  }}
                  className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl font-black tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                >
                  <Save className="w-5 h-5" />
                  内容を保存する
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* ── SYSTEM TAB: Cache Management ── */}
      {activeTab === 'system' && (() => {
        const currentVersion = String((cmsData as any).cacheVersion || '1');
        const nextVersion = String(parseInt(currentVersion, 10) + 1);

        const handleExportCmsJson = () => {
          const updated = { ...(cmsData as any), cacheVersion: nextVersion };
          const blob = new Blob([JSON.stringify(updated, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'cms.json';
          a.click();
          URL.revokeObjectURL(url);
        };

        return (
          <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-gray-800 tracking-wider mb-1">キャッシュ管理</h2>
              <p className="text-xs text-gray-400 mb-6">ユーザーの古いキャッシュを強制クリアします</p>

              <div className="bg-gray-50 rounded-2xl p-5 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 mb-1">現在のバージョン</div>
                  <div className="text-3xl font-black text-gray-800 font-mono">v{currentVersion}</div>
                </div>
                <div className="text-gray-300 text-2xl">→</div>
                <div>
                  <div className="text-xs text-orange-400 mb-1">更新後のバージョン</div>
                  <div className="text-3xl font-black text-orange-500 font-mono">v{nextVersion}</div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 text-sm text-orange-700 leading-relaxed">
                <p className="font-bold mb-2">⚠️ 操作の流れ</p>
                <ol className="list-decimal list-inside space-y-1 text-xs regular">
                  <li>下の「cms.json をダウンロード」ボタンをクリック</li>
                  <li>ダウンロードされたファイルで <code className="bg-orange-100 px-1 rounded">src/data/cms.json</code> を上書き</li>
                  <li>Git に push → Vercel が自動デプロイ</li>
                  <li>全ユーザーの古いキャッシュが次回アクセス時に自動削除されます</li>
                </ol>
              </div>

              <button
                onClick={handleExportCmsJson}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-200"
              >
                <RefreshCw className="w-5 h-5" />
                cms.json をダウンロード（v{currentVersion} → v{nextVersion}）
              </button>
            </div>
          </div>
        );
      })()}

    </div>
  );
};
