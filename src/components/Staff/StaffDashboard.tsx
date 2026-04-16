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
      message: "縺薙・繧ｫ繝・ざ繝ｪ繝ｼ繧貞炎髯､縺励※繧ゅｈ繧阪＠縺・〒縺吶°・・,
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
      message: "縺薙・繧ｪ繝励す繝ｧ繝ｳ繧貞炎髯､縺励※繧ゅｈ繧阪＠縺・〒縺吶°・・,
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
      message: `${localAuditionSpeakers[brandIndex].brand} 繧貞炎髯､縺励※繧ゅｈ繧阪＠縺・〒縺吶°・歔,
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
      message: "縺薙・繝代・繝医リ繝ｼ繧貞炎髯､縺励※繧ゅｈ繧阪＠縺・〒縺吶°・・,
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
      message: "縺薙・繝｡繝ｼ繧ｫ繝ｼ繧貞炎髯､縺励※繧ゅｈ繧阪＠縺・〒縺吶°・・,
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
              aria-label="繝繝・す繝･繝懊・繝峨ｒ髢峨§繧・
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase">Staff Dashboard</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">邂｡逅・す繧ｹ繝・Β</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setConfirmModal({
                  show: true,
                  message: "繧ｷ繧ｹ繝・Β蜈ｨ菴薙・繧ｭ繝｣繝・す繝･繧偵Μ繧ｻ繝・ヨ縺励※蛻晄悄迥ｶ諷九↓謌ｻ縺励∪縺吶°・滂ｼ育ｷｨ髮・ｸｭ縺ｮ繝・・繧ｿ縺ｯ螟ｱ繧上ｌ縺ｾ縺呻ｼ・,
                  onConfirm: resetSystem
                });
              }}
              className="px-3 py-1.5 text-[10px] font-black tracking-widest text-red-600 hover:bg-red-50 border border-red-100 rounded-lg transition-colors flex items-center gap-2 uppercase"
              title="繧ｷ繧ｹ繝・Β繝ｪ繧ｻ繝・ヨ"
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
              菫晏ｭ・            </button>
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
              譖ｴ譁ｰ縺悟ｮ御ｺ・＠縺ｾ縺励◆・・            </motion.div>
          )}
        </AnimatePresence>

        {/* Modals */}
        <AnimatePresence>
          {showAddCategory && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">譁ｰ隕上き繝・ざ繝ｪ繝ｼ霑ｽ蜉</h3>
                  <button onClick={() => setShowAddCategory(false)}><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">繧ｫ繝・ざ繝ｪ繝ｼ蜷・/label>
                    <input
                      type="text"
                      placeholder="繧ｫ繝・ざ繝ｪ繝ｼ蜷・(萓・ 譁ｰ繝代ャ繧ｱ繝ｼ繧ｸ)"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">繧ｿ繧､繝・/label>
                    <select
                      value={newCategoryType}
                      onChange={(e) => setNewCategoryType(e.target.value as any)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                    >
                      <option value="audio">繧ｪ繝ｼ繝・ぅ繧ｪ</option>
                      <option value="security">繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ</option>
                      <option value="others">縺昴・莉・/option>
                    </select>
                  </div>
                </div>
                <button onClick={handleAddCategory} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-widest">霑ｽ蜉縺吶ｋ</button>
              </motion.div>
            </div>
          )}

          {showAddItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">譁ｰ隕上・繝ｩ繝ｳ霑ｽ蜉</h3>
                  <button onClick={() => setShowAddItem(null)}><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="繝励Λ繝ｳ蜷・
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="萓｡譬ｼ (謨ｰ蟄励・縺ｿ)"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value.replace(/[^0-9]/g, '') })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="繝舌ャ繧ｸ (萓・ 縺翫☆縺吶ａ)"
                    value={newItem.badge}
                    onChange={(e) => setNewItem({ ...newItem, badge: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <button
                    onClick={() => setEditingText({
                      title: "繝励Λ繝ｳ縺ｮ迚ｹ蠕ｴ繧堤ｷｨ髮・,
                      value: newItem.features.join('\n'),
                      onSave: (val) => setNewItem({ ...newItem, features: val.split('\n') })
                    })}
                    className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl font-bold text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-5 h-5" />
                    迚ｹ蠕ｴ繧貞ｺ・￥邱ｨ髮・☆繧・                  </button>
                  <button
                    onClick={() => setEditingText({
                      title: "繝励Λ繝ｳ縺ｮ隗｣隱ｬ譁・ｒ邱ｨ髮・,
                      value: newItem.description || "",
                      onSave: (val) => setNewItem({ ...newItem, description: val })
                    })}
                    className="w-full px-4 py-3 bg-indigo-50 border-2 border-indigo-100 rounded-xl font-bold text-indigo-600 hover:bg-indigo-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Info className="w-5 h-5" />
                    隗｣隱ｬ譁・ｒ蠎・￥邱ｨ髮・☆繧・                  </button>
                  <input
                    type="text"
                    placeholder="/images/Audio/filename.png"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                </div>
                <button onClick={handleAddItem} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-widest">霑ｽ蜉縺吶ｋ</button>
              </motion.div>
            </div>
          )}

          {showAddOptional && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">譁ｰ隕上が繝励す繝ｧ繝ｳ霑ｽ蜉</h3>
                  <button onClick={() => setShowAddOptional(false)}><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="繧ｪ繝励す繝ｧ繝ｳ蜷・
                    value={newOptional.name}
                    onChange={(e) => setNewOptional({ ...newOptional, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="萓｡譬ｼ (謨ｰ蟄励・縺ｿ)"
                    value={newOptional.price}
                    onChange={(e) => setNewOptional({ ...newOptional, price: e.target.value.replace(/[^0-9]/g, '') })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="蜉ｹ譫・(萓・ 髻ｳ雉ｪ蜷台ｸ・"
                    value={newOptional.effect}
                    onChange={(e) => setNewOptional({ ...newOptional, effect: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <button
                    onClick={() => setEditingText({
                      title: "繧ｪ繝励す繝ｧ繝ｳ縺ｮ隱ｬ譏取枚繧堤ｷｨ髮・,
                      value: newOptional.description,
                      onSave: (val) => setNewOptional({ ...newOptional, description: val })
                    })}
                    className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl font-bold text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-5 h-5" />
                    隧ｳ邏ｰ・郁ｪｬ譏取枚・峨ｒ蠎・￥邱ｨ髮・☆繧・                  </button>
                  <input
                    type="text"
                    placeholder="/images/Audio/filename.png"
                    value={newOptional.image}
                    onChange={(e) => setNewOptional({ ...newOptional, image: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                </div>
                <button onClick={handleAddOptional} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-widest">霑ｽ蜉縺吶ｋ</button>
              </motion.div>
            </div>
          )}

          {showAddPartner && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">譁ｰ隕上ヱ繝ｼ繝医リ繝ｼ霑ｽ蜉</h3>
                  <button onClick={() => setShowAddPartner(false)}><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="繧ｷ繝ｧ繝・・蜷・
                    value={newPartner.name}
                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="謇蝨ｨ蝨ｰ (萓・ 遖丞ｲ｡逵・"
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
                      title: "繝代・繝医リ繝ｼ縺ｮ隱ｬ譏取枚繧堤ｷｨ髮・,
                      value: newPartner.description,
                      onSave: (val) => setNewPartner({ ...newPartner, description: val })
                    })}
                    className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl font-bold text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-5 h-5" />
                    隧ｳ邏ｰ・郁ｪｬ譏取枚・峨ｒ蠎・￥邱ｨ髮・☆繧・                  </button>
                </div>
                <button onClick={handleAddPartner} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-widest">霑ｽ蜉縺吶ｋ</button>
              </motion.div>
            </div>
          )}

          {showAddBrandPartner && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black">譁ｰ隕上Γ繝ｼ繧ｫ繝ｼ霑ｽ蜉</h3>
                  <button onClick={() => setShowAddBrandPartner(false)}><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="繝｡繝ｼ繧ｫ繝ｼ蜷・
                    value={newBrandPartner.name}
                    onChange={(e) => setNewBrandPartner({ ...newBrandPartner, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="text"
                    placeholder="繧ｫ繝・ざ繝ｪ繝ｼ (萓・ Security)"
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
                      title: "繝｡繝ｼ繧ｫ繝ｼ縺ｮ隱ｬ譏取枚繧堤ｷｨ髮・,
                      value: newBrandPartner.description,
                      onSave: (val) => setNewBrandPartner({ ...newBrandPartner, description: val })
                    })}
                    className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl font-bold text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-5 h-5" />
                    隧ｳ邏ｰ・郁ｪｬ譏取枚・峨ｒ蠎・￥邱ｨ髮・☆繧・                  </button>
                </div>
                <button onClick={handleAddBrandPartner} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black tracking-widest">霑ｽ蜉縺吶ｋ</button>
              </motion.div>
            </div>
          )}

          {confirmModal.show && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-black mb-4">遒ｺ隱・/h3>
                <p className="text-gray-500 font-bold mb-8">{confirmModal.message}</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setConfirmModal(prev => ({ ...prev, show: false }))}
                    className="bg-gray-100 text-gray-600 py-4 rounded-xl font-black tracking-widest"
                  >
                    繧ｭ繝｣繝ｳ繧ｻ繝ｫ
                  </button>
                  <button
                    onClick={confirmModal.onConfirm}
                    className="bg-red-500 text-white py-4 rounded-xl font-black tracking-widest"
                  >
                    蜑企勁縺吶ｋ
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
                      <h2 className="text-xl font-black tracking-tight">荳諡ｬ萓｡譬ｼ隱ｿ謨ｴ繝・・繝ｫ</h2>
                    </div>
                    <p className="text-xs text-gray-400 font-bold max-w-xs">
                      窶ｻ蜈･蜉帙＠縺溘ヱ繝ｼ繧ｻ繝ｳ繝・・繧ｸ蛻・∝・縺ｦ縺ｮ繝励Λ繝ｳ萓｡譬ｼ繧貞｢玲ｸ帙＆縺帙∪縺吶・                    </p>
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
                      荳諡ｬ驕ｩ逕ｨ
                    </button>
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full"></div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <AlertCircle className="w-5 h-5 text-blue-400" />
                      <h3 className="text-sm font-black uppercase tracking-widest">繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ譁ｽ蟾･迥ｶ豕√Γ繝・そ繝ｼ繧ｸ</h3>
                    </div>
                    <button
                      onClick={() => setEditingText({
                        title: "繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ譁ｽ蟾･迥ｶ豕√Γ繝・そ繝ｼ繧ｸ繧堤ｷｨ髮・,
                        value: localSecurityStatus,
                        onSave: (val) => setLocalSecurityStatus(val)
                      })}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-blue-400 hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                    >
                      <Edit3 className="w-5 h-5" />
                      繝｡繝・そ繝ｼ繧ｸ繧貞ｺ・￥邱ｨ髮・☆繧・                    </button>
                    <p className="text-[10px] text-gray-500 mt-2 font-bold">
                      窶ｻ繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ隧ｳ邏ｰ繝壹・繧ｸ縺ｮ荳企Κ縺ｫ陦ｨ遉ｺ縺輔ｌ縺ｾ縺吶らｩｺ縺ｫ縺吶ｋ縺ｨ髱櫁｡ｨ遉ｺ縺ｫ縺ｪ繧翫∪縺吶・                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Megaphone className="w-5 h-5 text-red-400" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-red-400">邱頑･縺ｮ縺顔衍繧峨○・医ヨ繝・・繝壹・繧ｸ・・/h3>
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
                          <span className="text-xs font-bold">陦ｨ遉ｺ縺吶ｋ</span>
                        </label>
                      </div>
                      <button
                        onClick={() => setEditingText({
                          title: "邱頑･縺ｮ縺顔衍繧峨○蜀・ｮｹ繧堤ｷｨ髮・,
                          value: localEmergencyAnnouncement.text,
                          onSave: (val) => setLocalEmergencyAnnouncement({ ...localEmergencyAnnouncement, text: val })
                        })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs text-gray-300 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        繝・く繧ｹ繝亥・螳ｹ繧堤ｷｨ髮・                      </button>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="繝ｪ繝ｳ繧ｯURL (莉ｻ諢・"
                          value={localEmergencyAnnouncement.link || ""}
                          onChange={(e) => setLocalEmergencyAnnouncement({ ...localEmergencyAnnouncement, link: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="逕ｻ蜒上ヱ繧ｹ 縺ｾ縺溘・ URL (莉ｻ諢・"
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
                      placeholder="繝励Λ繝ｳ蜷阪ｄ繧ｫ繝・ざ繝ｪ繝ｼ縺ｧ讀懃ｴ｢..."
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
                    繧ｫ繝・ざ繝ｪ繝ｼ霑ｽ蜉
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
                        繧ｪ繝励す繝ｧ繝ｳ繝｡繝九Η繝ｼ
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
                            placeholder="蜉ｹ譫・
                          />
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <div className="relative flex items-center">
                            <span className="absolute left-3 font-black text-gray-400 text-sm">ﾂ･</span>
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
                              title: `${opt.name} 縺ｮ隱ｬ譏取枚邱ｨ髮・,
                              value: opt.description,
                              onSave: (val) => handleOptionalChange(opt.id, 'description', val)
                            })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            隧ｳ邏ｰ繧堤ｷｨ髮・                          </button>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <input
                            type="text"
                            value={opt.image || ""}
                            onChange={(e) => handleOptionalChange(opt.id, 'image', e.target.value)}
                            placeholder="/images/Audio/filename.png"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg font-bold text-xs text-gray-600 focus:border-blue-500 outline-none transition-all"
                          />
                          <p className="text-[8px] text-gray-400 mt-1 font-bold">窶ｻ萓・ /images/Audio/縲・/p>
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
                          繧ｪ繝ｼ繝・ぅ繧ｪ髢｢騾｣
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
                                  <span className="text-xs font-bold text-gray-600">繝｡繝九Η繝ｼ蜈ｨ菴薙〒陦ｨ遉ｺ</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cat.showDescriptionInList || false}
                                    onChange={(e) => handleCategoryChange(cat.id, 'showDescriptionInList', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-xs font-bold text-gray-600">蛟句挨荳隕ｧ繝壹・繧ｸ縺ｧ陦ｨ遉ｺ</span>
                                </label>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${cat.category} 縺ｮ隱ｬ譏取枚邱ｨ髮・,
                                    value: cat.description || "",
                                    onSave: (val) => handleCategoryChange(cat.id, 'description', val)
                                  })}
                                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  隱ｬ譏取枚繧堤ｷｨ髮・                                </button>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">繧ｫ繝・ざ繝ｪ繝ｼ逕ｻ蜒・(繧ｫ繝ｳ繝槫玄蛻・ｊ縺ｧ隍・焚蜿ｯ)</span>
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
                                placeholder="繝舌ャ繧ｸ (萓・ 縺翫☆縺吶ａ)"
                                className="w-full px-3 py-1 mt-1 bg-gray-50 border border-transparent rounded text-[10px] text-gray-500 font-bold focus:border-blue-300 focus:bg-white outline-none transition-all"
                              />
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <div className="relative flex items-center">
                                <span className="absolute left-3 font-black text-gray-400 text-sm">ﾂ･</span>
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
                                    title: `${item.name} 縺ｮ迚ｹ蠕ｴ邱ｨ髮・,
                                    value: item.features.join('\n'),
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'features', val.split('\n'))
                                  })}
                                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  迚ｹ蠕ｴ繧堤ｷｨ髮・                                </button>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${item.name} 縺ｮ隗｣隱ｬ譁・ｷｨ髮・,
                                    value: item.description || "",
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'description', val)
                                  })}
                                  className="w-full px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl font-bold text-[10px] text-blue-700 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                                >
                                  <Info className="w-3 h-3" />
                                  隗｣隱ｬ繧堤ｷｨ髮・                                </button>
                                <button
                                  onClick={() => setEditingPackage({ catId: cat.id, item: JSON.parse(JSON.stringify(item)) })}
                                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl font-bold text-[10px] text-white hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                                >
                                  <LayoutGrid className="w-3 h-3" />
                                  隧ｳ邏ｰ險ｭ螳・                                </button>
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
                              <p className="text-[8px] text-gray-400 mt-1 font-bold">窶ｻ萓・ /images/Audio/縲・/p>
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
                          繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ髢｢騾｣
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
                                  <span className="text-xs font-bold text-gray-600">繝｡繝九Η繝ｼ蜈ｨ菴薙〒陦ｨ遉ｺ</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cat.showDescriptionInList || false}
                                    onChange={(e) => handleCategoryChange(cat.id, 'showDescriptionInList', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-xs font-bold text-gray-600">蛟句挨荳隕ｧ繝壹・繧ｸ縺ｧ陦ｨ遉ｺ</span>
                                </label>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${cat.category} 縺ｮ隱ｬ譏取枚邱ｨ髮・,
                                    value: cat.description || "",
                                    onSave: (val) => handleCategoryChange(cat.id, 'description', val)
                                  })}
                                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  隱ｬ譏取枚繧堤ｷｨ髮・                                </button>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">繧ｫ繝・ざ繝ｪ繝ｼ逕ｻ蜒・(繧ｫ繝ｳ繝槫玄蛻・ｊ縺ｧ隍・焚蜿ｯ)</span>
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
                                placeholder="繝舌ャ繧ｸ (萓・ 縺翫☆縺吶ａ)"
                                className="w-full px-3 py-1 mt-1 bg-gray-50 border border-transparent rounded text-[10px] text-gray-500 font-bold focus:border-blue-300 focus:bg-white outline-none transition-all"
                              />
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <div className="relative flex items-center">
                                <span className="absolute left-3 font-black text-gray-400 text-sm">ﾂ･</span>
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
                                    title: `${item.name} 縺ｮ迚ｹ蠕ｴ邱ｨ髮・,
                                    value: item.features.join('\n'),
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'features', val.split('\n'))
                                  })}
                                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  迚ｹ蠕ｴ繧堤ｷｨ髮・                                </button>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${item.name} 縺ｮ隗｣隱ｬ譁・ｷｨ髮・,
                                    value: item.description || "",
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'description', val)
                                  })}
                                  className="w-full px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl font-bold text-[10px] text-blue-700 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                                >
                                  <Info className="w-3 h-3" />
                                  隗｣隱ｬ繧堤ｷｨ髮・                                </button>
                                <button
                                  onClick={() => setEditingPackage({ catId: cat.id, item: JSON.parse(JSON.stringify(item)) })}
                                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl font-bold text-[10px] text-white hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                                >
                                  <LayoutGrid className="w-3 h-3" />
                                  隧ｳ邏ｰ險ｭ螳・                                </button>
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
                          縺昴・莉・                        </td>
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
                                  <span className="text-xs font-bold text-gray-600">繝｡繝九Η繝ｼ蜈ｨ菴薙〒陦ｨ遉ｺ</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cat.showDescriptionInList || false}
                                    onChange={(e) => handleCategoryChange(cat.id, 'showDescriptionInList', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-xs font-bold text-gray-600">蛟句挨荳隕ｧ繝壹・繧ｸ縺ｧ陦ｨ遉ｺ</span>
                                </label>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${cat.category} 縺ｮ隱ｬ譏取枚邱ｨ髮・,
                                    value: cat.description || "",
                                    onSave: (val) => handleCategoryChange(cat.id, 'description', val)
                                  })}
                                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  隱ｬ譏取枚繧堤ｷｨ髮・                                </button>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">繧ｫ繝・ざ繝ｪ繝ｼ逕ｻ蜒・(繧ｫ繝ｳ繝槫玄蛻・ｊ縺ｧ隍・焚蜿ｯ)</span>
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
                                placeholder="繝舌ャ繧ｸ (萓・ 縺翫☆縺吶ａ)"
                                className="w-full px-3 py-1 mt-1 bg-gray-50 border border-transparent rounded text-[10px] text-gray-500 font-bold focus:border-blue-300 focus:bg-white outline-none transition-all"
                              />
                            </td>
                            <td className="px-6 py-4 border-r border-gray-100">
                              <div className="relative flex items-center">
                                <span className="absolute left-3 font-black text-gray-400 text-sm">ﾂ･</span>
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
                                    title: `${item.name} 縺ｮ迚ｹ蠕ｴ邱ｨ髮・,
                                    value: item.features.join('\n'),
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'features', val.split('\n'))
                                  })}
                                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  迚ｹ蠕ｴ繧堤ｷｨ髮・                                </button>
                                <button
                                  onClick={() => setEditingText({
                                    title: `${item.name} 縺ｮ隗｣隱ｬ譁・ｷｨ髮・,
                                    value: item.description || "",
                                    onSave: (val) => handlePriceChange(cat.id, item.name, 'description', val)
                                  })}
                                  className="w-full px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl font-bold text-[10px] text-blue-700 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                                >
                                  <Info className="w-3 h-3" />
                                  隗｣隱ｬ繧堤ｷｨ髮・                                </button>
                                <button
                                  onClick={() => setEditingPackage({ catId: cat.id, item: JSON.parse(JSON.stringify(item)) })}
                                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl font-bold text-[10px] text-white hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                                >
                                  <LayoutGrid className="w-3 h-3" />
                                  隧ｳ邏ｰ險ｭ螳・                                </button>
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
                  <h3 className="text-3xl font-black tracking-tighter">{year}蟷ｴ {month + 1}譛・/h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">蝟ｶ讌ｭ繧ｫ繝ｬ繝ｳ繝繝ｼ險ｭ螳・/p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={prevMonth}
                    className="p-4 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-colors"
                    aria-label="蜑肴怦"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-4 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-colors"
                    aria-label="谺｡譛・
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-8">
                {['譌･', '譛・, '轣ｫ', '豌ｴ', '譛ｨ', '驥・, '蝨・].map((day, i) => (
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
                  <span className="font-bold text-gray-600">襍､濶ｲ縺ｮ譌･莉倥′螳壻ｼ第律縺ｨ縺励※陦ｨ遉ｺ縺輔ｌ縺ｾ縺・/span>
                </div>
                <div className="flex items-start gap-3 text-xs text-gray-400 leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>譌･莉倥ｒ繧ｯ繝ｪ繝・け縺吶ｋ縺薙→縺ｧ縲悟霧讌ｭ譌･縲阪→縲御ｼ第律縲阪ｒ蛻・ｊ譖ｿ縺医ｋ縺薙→縺後〒縺阪∪縺吶よｯ朱ｱ縺ｮ螳壻ｼ第律・育↓繝ｻ驥托ｼ峨ｂ蛟句挨縺ｫ蝟ｶ讌ｭ譌･縺ｫ螟画峩蜿ｯ閭ｽ縺ｧ縺吶・/p>
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
                  <h3 className="text-xl font-black">繝｡繝ｼ繧ｫ繝ｼ邂｡逅・ｼ井ｿ｡鬆ｼ縺ｮ繝代・繝医リ繝ｼ・・/h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">繝医ャ繝励・繝ｼ繧ｸ荳矩Κ縺ｮ繝｡繝ｼ繧ｫ繝ｼ荳隕ｧ繧堤ｷｨ髮・＠縺ｾ縺吶・/p>
                </div>
                <button
                  onClick={() => setShowAddBrandPartner(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  <Plus className="w-4 h-4" />
                  繝｡繝ｼ繧ｫ繝ｼ霑ｽ蜉
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
                              title: `${p.name} 縺ｮ隱ｬ譏取枚邱ｨ髮・,
                              value: p.description,
                              onSave: (val) => handleBrandPartnerChange(p.id, 'description', val)
                            })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            隧ｳ邏ｰ繧堤ｷｨ髮・                          </button>
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
                  <h3 className="text-xl font-black">繝代・繝医リ繝ｼ繧ｷ繝ｧ繝・・邂｡逅・ｼ亥刈逶溷ｺ嶺ｸ隕ｧ・・/h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ繧ｻ繝ｳ繧ｿ繝ｼ繝ｻ繧ｰ繝ｫ繝ｼ繝励・蠎苓・荳隕ｧ繧堤ｷｨ髮・＠縺ｾ縺吶・/p>
                </div>
                <button
                  onClick={() => setShowAddPartner(true)}
                  className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  繝代・繝医リ繝ｼ霑ｽ蜉
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
                              title: `${p.name} 縺ｮ隱ｬ譏取枚邱ｨ髮・,
                              value: p.description,
                              onSave: (val) => handlePartnerChange(p.id, 'description', val)
                            })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            隧ｳ邏ｰ繧堤ｷｨ髮・                          </button>
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
                    繧ｪ繝ｼ繝・ぅ繧ｪ謗｡逕ｨ險ｭ螳・                  </h3>
                  <button
                    onClick={() => {
                      setLocalAudioRecruitment({ ...localAudioRecruitment, visible: !localAudioRecruitment.visible });
                    }}
                    className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${localAudioRecruitment.visible ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {localAudioRecruitment.visible ? '陦ｨ遉ｺ荳ｭ' : '髱櫁｡ｨ遉ｺ'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">豎ゆｺｺ繧ｿ繧､繝医Ν</label>
                    <input
                      type="text"
                      value={localAudioRecruitment.title}
                      onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">蜍滄寔繝｡繝・そ繝ｼ繧ｸ</label>
                    <textarea
                      value={localAudioRecruitment.message}
                      onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, message: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-600 focus:border-blue-500 outline-none transition-all h-24 resize-none"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">蜍滄寔隕・・/label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localAudioRecruitment.showRequirements}
                          onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, showRequirements: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">陦ｨ遉ｺ縺吶ｋ</span>
                      </label>
                    </div>
                    <textarea
                      value={localAudioRecruitment.requirements.join('\n')}
                      onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, requirements: e.target.value.split('\n') })}
                      disabled={!localAudioRecruitment.showRequirements}
                      className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 focus:border-blue-500 outline-none transition-all h-24 resize-none ${!localAudioRecruitment.showRequirements ? 'opacity-50 grayscale' : ''}`}
                      placeholder="萓具ｼ夊ｻ翫′螂ｽ縺阪↑譁ｹ&#10;邨碁ｨ楢・━驕・
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">邨ｦ荳弱・蠕・∞</label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localAudioRecruitment.showSalary}
                          onChange={(e) => setLocalAudioRecruitment({ ...localAudioRecruitment, showSalary: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">陦ｨ遉ｺ縺吶ｋ</span>
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
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">蠢懷供蜈茨ｼ磯崕隧ｱ逡ｪ蜿ｷ縺ｪ縺ｩ・・/label>
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
                    繧ｪ繝ｼ繝・ぅ繧ｪ謗｡逕ｨ險ｭ螳壹ｒ菫晏ｭ・                  </button>
                </div>
              </div>

              {/* Security Recruitment */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black flex items-center gap-3">
                    <Wrench className="w-6 h-6 text-purple-600" />
                    繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ謗｡逕ｨ險ｭ螳・                  </h3>
                  <button
                    onClick={() => {
                      setLocalSecurityRecruitment({ ...localSecurityRecruitment, visible: !localSecurityRecruitment.visible });
                    }}
                    className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${localSecurityRecruitment.visible ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {localSecurityRecruitment.visible ? '陦ｨ遉ｺ荳ｭ' : '髱櫁｡ｨ遉ｺ'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">豎ゆｺｺ繧ｿ繧､繝医Ν</label>
                    <input
                      type="text"
                      value={localSecurityRecruitment.title}
                      onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">蜍滄寔繝｡繝・そ繝ｼ繧ｸ</label>
                    <textarea
                      value={localSecurityRecruitment.message}
                      onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, message: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-600 focus:border-blue-500 outline-none transition-all h-24 resize-none"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">蜍滄寔隕・・/label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localSecurityRecruitment.showRequirements}
                          onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, showRequirements: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">陦ｨ遉ｺ縺吶ｋ</span>
                      </label>
                    </div>
                    <textarea
                      value={localSecurityRecruitment.requirements.join('\n')}
                      onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, requirements: e.target.value.split('\n') })}
                      disabled={!localSecurityRecruitment.showRequirements}
                      className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 focus:border-blue-500 outline-none transition-all h-24 resize-none ${!localSecurityRecruitment.showRequirements ? 'opacity-50 grayscale' : ''}`}
                      placeholder="萓具ｼ夊ｻ翫′螂ｽ縺阪↑譁ｹ&#10;邨碁ｨ楢・━蜆ｪ驕・
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">邨ｦ荳弱・蠕・∞</label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localSecurityRecruitment.showSalary}
                          onChange={(e) => setLocalSecurityRecruitment({ ...localSecurityRecruitment, showSalary: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">陦ｨ遉ｺ縺吶ｋ</span>
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
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">蠢懷供蜈茨ｼ磯崕隧ｱ逡ｪ蜿ｷ縺ｪ縺ｩ・・/label>
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
                    繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ謗｡逕ｨ險ｭ螳壹ｒ菫晏ｭ・                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'assets' ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 max-w-3xl mx-auto">
              <h3 className="text-xl font-black mb-8">繧ｵ繧､繝医い繧ｻ繝・ヨ邂｡逅・/h3>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">繝ｭ繧ｴ繝・く繧ｹ繝・/label>
                    <input
                      type="text"
                      value={localAssets.logoText}
                      onChange={(e) => handleAssetChange('logoText', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">繝偵・繝ｭ繝ｼ逕ｻ蜒擾ｼ医ヱ繧ｹ 縺ｾ縺溘・ URL・・/label>
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
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">繧ｪ繝ｼ繝・ぅ繧ｪ逕ｻ蜒・/label>
                    <input
                      type="text"
                      value={localAssets.audioMenuImage}
                      onChange={(e) => handleAssetChange('audioMenuImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ逕ｻ蜒・/label>
                    <input
                      type="text"
                      value={localAssets.securityMenuImage}
                      onChange={(e) => handleAssetChange('securityMenuImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">繝峨Λ繝ｬ繧ｳ逕ｻ蜒・/label>
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
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">繧ｷ繝ｧ繝ｼ繝ｫ繝ｼ繝逕ｻ蜒・/label>
                    <input
                      type="text"
                      value={localAssets.showroomImage}
                      onChange={(e) => handleAssetChange('showroomImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">繝斐ャ繝育判蜒・/label>
                    <input
                      type="text"
                      value={localAssets.pitImage}
                      onChange={(e) => handleAssetChange('pitImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">繝ｯ繝ｼ繧ｯ繧ｹ繝壹・繧ｹ逕ｻ蜒・/label>
                    <input
                      type="text"
                      value={localAssets.workspaceImage}
                      onChange={(e) => handleAssetChange('workspaceImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">隕冶・螳､逕ｻ蜒・/label>
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
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">荵晏ｷ朦o.1逕ｻ蜒・/label>
                    <input
                      type="text"
                      value={localAssets.kyushuNo1Image}
                      onChange={(e) => handleAssetChange('kyushuNo1Image', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">SPS隱榊ｮ壼ｺ礼判蜒・/label>
                    <input
                      type="text"
                      value={localAssets.spsCertifiedImage}
                      onChange={(e) => handleAssetChange('spsCertifiedImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Snap-on逕ｻ蜒・/label>
                    <input
                      type="text"
                      value={localAssets.snaponImage}
                      onChange={(e) => handleAssetChange('snaponImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[10px] text-gray-600 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">繝舌ャ繝・Μ繝ｼ蜈・崕蝎ｨ逕ｻ蜒・/label>
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
                    <h4 className="text-sm font-black text-blue-900 mb-1">繝励Ξ繝薙Η繝ｼ縺ｫ縺､縺・※</h4>
                    <p className="text-xs text-blue-700 font-bold leading-relaxed">
                      逕ｻ蜒上ヱ繧ｹ縺ｾ縺溘・URL繧貞､画峩縺吶ｋ縺ｨ縲∽ｿ晏ｭ伜ｾ後↓繧ｵ繧､繝亥・菴薙・逕ｻ蜒上′譖ｴ譁ｰ縺輔ｌ縺ｾ縺吶・                      螟夜Κ繧ｵ繧､繝医・逕ｻ蜒擾ｼ・ttps://...・峨∪縺溘・縲√し繧､繝亥・縺ｮ逕ｻ蜒擾ｼ・images/...・峨ｒ蜈･蜉帙＠縺ｦ縺上□縺輔＞縲・                    </p>
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
                placeholder="繧ｳ繝ｩ繝險倅ｺ九・繧ｿ繧､繝医Ν縺ｧ讀懃ｴ｢..."
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
                        遏･隴倥ぎ繧､繝峨・繧ｳ繝ｩ繝荳隕ｧ
                      </td>
                    </tr>
                    {filteredGuides.map((guide) => (
                      <tr key={guide.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border-r border-gray-100 w-48 text-center">
                          <input
                            type="text"
                            value={guide.badge || ""}
                            onChange={(e) => handleGuideChange(guide.id, 'badge', e.target.value)}
                            placeholder="繝舌ャ繧ｸ蜷・
                            className="w-full mb-3 px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] text-gray-500 font-bold focus:border-blue-300 outline-none transition-all"
                          />
                          <button
                            onClick={() => setEditingText({
                              title: `${guide.title} 縺ｮ隱ｬ譏取枚邱ｨ髮・,
                              value: guide.description,
                              onSave: (val) => handleGuideChange(guide.id, 'description', val)
                            })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[10px] text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                          >
                            <Edit3 className="w-3 h-3" />
                            繝・く繧ｹ繝医ｒ邱ｨ髮・                          </button>
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
                              title: `${guide.title} 縺ｮ迚ｹ蠕ｴ繝ｪ繧ｹ繝・,
                              value: (guide.features || []).join('\n'),
                              onSave: (val) => handleGuideChange(guide.id, 'features', val.split('\n'))
                            })}
                            className="w-full px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl font-bold text-[10px] text-blue-700 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                          >
                            <LayoutGrid className="w-3 h-3" />
                            迚ｹ蠕ｴ繧ｿ繧ｰ繧堤ｷｨ髮・(謾ｹ陦・
                          </button>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <input
                            type="text"
                            value={guide.link || ""}
                            onChange={(e) => handleGuideChange(guide.id, 'link', e.target.value)}
                            placeholder="螟夜Κ繝ｪ繝ｳ繧ｯ URL"
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
                  <h3 className="text-xl font-black">隧ｦ閨ｴ蜿ｯ閭ｽ繧ｹ繝斐・繧ｫ繝ｼ邂｡逅・/h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">蠎怜・縺ｧ隧ｦ閨ｴ蜿ｯ閭ｽ縺ｪ繧ｹ繝斐・繧ｫ繝ｼ繝ｪ繧ｹ繝医ｒ邱ｨ髮・＠縺ｾ縺吶・/p>
                </div>
                <button
                  onClick={handleAddSpeakerBrand}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  <Plus className="w-4 h-4" />
                  繝悶Λ繝ｳ繝芽ｿｽ蜉
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
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">繝悶Λ繝ｳ繝牙錐</label>
                        <input
                          type="text"
                          value={brand.brand}
                          onChange={(e) => handleBrandInfoChange(bIdx, 'brand', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-black text-gray-900 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">蝗ｽ蜷・/label>
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
                        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">繝｢繝・Ν繝ｻ萓｡譬ｼ繝ｪ繧ｹ繝・/h4>
                        <button
                          onClick={() => handleAddSpeakerUnit(bIdx)}
                          className="text-[10px] font-black text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> 繝｢繝・Ν霑ｽ蜉
                        </button>
                      </div>

                      <div className="grid gap-3">
                        {brand.units.map((unit, uIdx) => (
                          <div key={uIdx} className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-wrap md:flex-nowrap gap-4 items-center">
                            <div className="flex-grow min-w-[200px]">
                              <input
                                type="text"
                                placeholder="繝｢繝・Ν蜷・
                                value={unit.model}
                                onChange={(e) => handleSpeakerChange(bIdx, uIdx, 'model', e.target.value)}
                                className="w-full px-3 py-1 font-black text-sm text-gray-900 border-b border-transparent focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div className="w-48">
                              <input
                                type="text"
                                placeholder="萓｡譬ｼ"
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
                                placeholder="逕ｻ蜒酋RL"
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
                                <option value="Available">隧ｦ閨ｴ蜿ｯ閭ｽ</option>
                                <option value="Demo Car">繝・Δ繧ｫ繝ｼ陬・捩</option>
                                <option value="Coming Soon">霑第律逋ｻ蝣ｴ</option>
                                <option value="Ordered">豕ｨ譁・ｸｭ</option>
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
                  <h4 className="text-lg font-black mb-2">髻ｳ貅舌し繝ｳ繝励Ν縺ｫ縺､縺・※</h4>
                  <p className="text-xs text-gray-400 font-bold leading-relaxed">
                    YouTube URL繧貞・蜉帙☆繧九→縲√Θ繝ｼ繧ｶ繝ｼ縺瑚ｩｦ閨ｴ繝ｪ繧ｹ繝医°繧臥峩謗･蜍慕判繧堤｢ｺ隱阪〒縺阪ｋ繧医≧縺ｫ縺ｪ繧翫∪縺吶・                    URL縺ｯ `https://www.youtube.com/watch?v=...` 蠖｢蠑上〒蜈･蜉帙＠縺ｦ縺上□縺輔＞縲・                  </p>
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
                  <h3 className="text-2xl font-black tracking-tighter">{editingPackage.item.name} 縺ｮ繝代ャ繧ｱ繝ｼ繧ｸ隧ｳ邏ｰ險ｭ螳・/h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">縺翫ヨ繧ｯ諠・ｱ繧・Λ繧､繝ｳ繝翫ャ繝励ｒ邱ｨ髮・＠縺ｦ縺上□縺輔＞</p>
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
                        萓｡譬ｼ繝ｻ縺翫ヨ繧ｯ諠・ｱ
                      </h4>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">騾壼ｸｸ譁ｽ蟾･蜷郁ｨ・(蜀・</label>
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
                            placeholder="萓・ 117700"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">縺翫ヨ繧ｯ鬘・(蜀・</label>
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
                            placeholder="萓・ 38950"
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
                          縲後♀繝医け・√阪ヰ繝・ず繧定｡ｨ遉ｺ縺吶ｋ
                        </label>
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                          <LayoutGrid className="w-4 h-4" />
                          繝代ャ繧ｱ繝ｼ繧ｸ蜀・ｮｹ
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
                          <Plus className="w-3 h-3" /> 蜀・ｮｹ繧定ｿｽ蜉
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
                                placeholder="繧ｿ繧､繝医Ν (萓・ 繧ｹ繝斐・繧ｫ繝ｼ)"
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
                                placeholder="隱ｬ譏・(萓・ 10荳・・縺ｾ縺ｧ縺ｮ繝ｦ繝九ャ繝・"
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
                          繧｢繝・・繧ｰ繝ｬ繝ｼ繝峨が繝励す繝ｧ繝ｳ
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
                          <Plus className="w-3 h-3" /> 繧ｪ繝励す繝ｧ繝ｳ繧定ｿｽ蜉
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
                                  placeholder="繧ｪ繝励す繝ｧ繝ｳ蜷・
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
                                  placeholder="萓｡譬ｼ (萓・ 11000)"
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
                                placeholder="隱ｬ譏取枚"
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
                          繝ｩ繧､繝ｳ繝翫ャ繝・& 隧ｦ閨ｴ蜍慕判
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
                          <Plus className="w-3 h-3" /> 繝ｦ繝九ャ繝医ｒ霑ｽ蜉
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
                                  placeholder="繝悶Λ繝ｳ繝・繝｢繝・Ν蜷・
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
                                  placeholder="萓｡譬ｼ"
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
                                  placeholder="逕ｻ蜒上ヱ繧ｹ/URL"
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
                                placeholder="繝ｦ繝九ャ繝医・隱ｬ譏取枚繧貞・蜉・.."
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
                          譁ｽ蟾･繧ｮ繝｣繝ｩ繝ｪ繝ｼ
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
                          <Plus className="w-3 h-3" /> 繧ｮ繝｣繝ｩ繝ｪ繝ｼ鬆・岼繧定ｿｽ蜉
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
                                placeholder="繧ｮ繝｣繝ｩ繝ｪ繝ｼ繧ｿ繧､繝医Ν (萓・ 繝輔か繝ｬ繧ｹ繧ｿ繝ｼ・壹Ν繝ｼ繝墓命蟾･)"
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
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">逕ｻ蜒酋RL繝ｪ繧ｹ繝・/label>
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
                                  <Plus className="w-3 h-3" /> 逕ｻ蜒上ｒ霑ｽ蜉
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
                                      placeholder="逕ｻ蜒上ヱ繧ｹ/URL"
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
                          豕ｨ諢丈ｺ矩・・譚｡莉ｶ
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
                          <Plus className="w-3 h-3" /> 豕ｨ諢丈ｺ矩・ｒ霑ｽ蜉
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
                              placeholder="豕ｨ諢丈ｺ矩・ｒ蜈･蜉・.."
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
                  繧ｭ繝｣繝ｳ繧ｻ繝ｫ
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
                  繝代ャ繧ｱ繝ｼ繧ｸ險ｭ螳壹ｒ菫晏ｭ・                </button>
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
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">隧ｳ邏ｰ諠・ｱ繧堤ｷｨ髮・＠縺ｦ縺上□縺輔＞</p>
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
                  placeholder="縺薙％縺ｫ隧ｳ邏ｰ繧貞・蜉帙＠縺ｦ縺上□縺輔＞..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setEditingText(null)}
                  className="flex-1 py-5 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-all tracking-widest"
                >
                  繧ｭ繝｣繝ｳ繧ｻ繝ｫ
                </button>
                <button
                  onClick={() => {
                    editingText.onSave(editingText.value);
                    setEditingText(null);
                  }}
                  className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl font-black tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                >
                  <Save className="w-5 h-5" />
                  蜀・ｮｹ繧剃ｿ晏ｭ倥☆繧・                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* 笏笏 SYSTEM TAB: Cache Management 笏笏 */}
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
              <h2 className="text-xl font-black text-gray-800 tracking-wider mb-1">繧ｭ繝｣繝・す繝･邂｡逅・/h2>
              <p className="text-xs text-gray-400 mb-6">繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ蜿､縺・く繝｣繝・す繝･繧貞ｼｷ蛻ｶ繧ｯ繝ｪ繧｢縺励∪縺・/p>

              <div className="bg-gray-50 rounded-2xl p-5 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 mb-1">迴ｾ蝨ｨ縺ｮ繝舌・繧ｸ繝ｧ繝ｳ</div>
                  <div className="text-3xl font-black text-gray-800 font-mono">v{currentVersion}</div>
                </div>
                <div className="text-gray-300 text-2xl">竊・/div>
                <div>
                  <div className="text-xs text-orange-400 mb-1">譖ｴ譁ｰ蠕後・繝舌・繧ｸ繝ｧ繝ｳ</div>
                  <div className="text-3xl font-black text-orange-500 font-mono">v{nextVersion}</div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 text-sm text-orange-700 leading-relaxed">
                <p className="font-bold mb-2">笞・・謫堺ｽ懊・豬√ｌ</p>
                <ol className="list-decimal list-inside space-y-1 text-xs regular">
                  <li>荳九・縲慶ms.json 繧偵ム繧ｦ繝ｳ繝ｭ繝ｼ繝峨阪・繧ｿ繝ｳ繧偵け繝ｪ繝・け</li>
                  <li>繝繧ｦ繝ｳ繝ｭ繝ｼ繝峨＆繧後◆繝輔ぃ繧､繝ｫ縺ｧ <code className="bg-orange-100 px-1 rounded">src/data/cms.json</code> 繧剃ｸ頑嶌縺・/li>
                  <li>Git 縺ｫ push 竊・Vercel 縺瑚・蜍輔ョ繝励Ο繧､</li>
                  <li>蜈ｨ繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ蜿､縺・く繝｣繝・す繝･縺梧ｬ｡蝗槭い繧ｯ繧ｻ繧ｹ譎ゅ↓閾ｪ蜍募炎髯､縺輔ｌ縺ｾ縺・/li>
                </ol>
              </div>

              <button
                onClick={handleExportCmsJson}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-200"
              >
                <RefreshCw className="w-5 h-5" />
                cms.json 繧偵ム繧ｦ繝ｳ繝ｭ繝ｼ繝会ｼ・{currentVersion} 竊・v{nextVersion}・・              </button>
            </div>
          </div>
        );
      })()}

    </div>
  );
};
