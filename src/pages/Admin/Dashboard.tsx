import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ChevronDown,
  CheckSquare,
  Square,
  Save, 
  Lock, 
  Car, 
  LogOut, 
  Settings, 
  Plus, 
  ShieldCheck, 
  Megaphone, 
  X, 
  Music,
  Volume2,
  Trash2,
  AlertCircle,
  Zap,
  ChevronRight,
  Eye,
  Search,
  Layout,
  Printer,
  Type,
  Image as ImageIcon,
  Users,
  Calendar as CalendarIcon,
  Check,
  BookOpen,
  HelpCircle,
  FileText,
  Monitor,
  Globe,
  Sparkles,
  Layers,
  Send,
  Images,
  ClipboardList,
  Info,
  Youtube,
  ArrowLeft,
  ArrowRight,
  Copy
} from 'lucide-react';
import { usePrices } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    plans, 
    securityData, 
    updateSecurityVehicle, 
    updateSecurityHome,
    updateSecurityCarGroups,
    reorderSecurityCarItems,
    removeVehicle,
    audioHeroAlert,
    securityHeroAlert,
    audioEmergencyAnnouncement,
    securityEmergencyAnnouncement,
    audioRecruitment,
    securityRecruitment,
    audioEvents,
    setAudioEvents,
    securityEvents,
    setSecurityEvents,
    holidays,
    setHolidays,
    saveCalendar,
    securityKnowledge,
    setSecurityKnowledge,
    recruitment,
    saveSiteData,
    updatePrice,
    addItem,
    removeItem,
    updateSecurityTemplate,
    addSecurityTemplate,
    removeSecurityTemplate
  } = usePrices();

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
    updateAssets
  } = useSite();

  const [activeTab, setActiveTab] = useState<'vehicles' | 'security' | 'announcements' | 'recruitment' | 'events' | 'knowledge' | 'templates' | 'audio' | 'audition' | 'partners' | 'calendar' | 'assets' | 'others'>('vehicles');
  const [searchTerm, setSearchTerm] = useState('');

  // Strict Authentication check: Always start as false on load
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ang2024') {
      setIsAuthenticated(true);
      // We still set it for potential internal use, but we don't read it on mount anymore
      sessionStorage.setItem('ang_admin_session_v4', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  };

  const forceReset = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-blue-500 selection:text-white">
        <div className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl relative">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 mb-4 shadow-xl shadow-blue-600/10">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">ANG CONTROL PANEL</h1>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">v4.0 Strict Authentication Mode</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Passcode..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-center font-mono text-lg text-white font-bold tracking-widest focus:border-blue-600 outline-none transition-all"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
            >
              Authenticate System
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-[10px] text-zinc-600 font-mono">AUTHORIZED PERSONNEL ONLY. SYSTEM ACTIVITIES ARE MONITORED.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-72 bg-zinc-950 border-r border-zinc-800/80 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-blue-600/20">
              ANG
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white text-lg tracking-tighter italic leading-none">ANG ADMIN v4</span>
              <span className="text-[9px] font-black text-blue-500 tracking-widest uppercase mt-1">Strict Auth Mode</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-1 mt-4 overflow-y-auto">
          <div className="px-4 mb-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Main Products</div>
          <NavItem active={activeTab === 'vehicles'} onClick={() => setActiveTab('vehicles')} icon={Car} label="Vehicle Config" />
          <NavItem active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={ShieldCheck} label="Security Plans" />
          <NavItem active={activeTab === 'audio'} onClick={() => setActiveTab('audio')} icon={Music} label="Audio Menu" />
          <NavItem active={activeTab === 'audition'} onClick={() => setActiveTab('audition')} icon={Volume2} label="Audition (常時試聴)" />
          <NavItem active={activeTab === 'others'} onClick={() => setActiveTab('others')} icon={Monitor} label="Peripherals" />
          
          <div className="px-4 mb-2 mt-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Marketing</div>
          <NavItem active={activeTab === 'announcements'} onClick={() => setActiveTab('announcements')} icon={Megaphone} label="Alerts & News" />
          <NavItem active={activeTab === 'recruitment'} onClick={() => setActiveTab('recruitment')} icon={Layout} label="Recruitment" />
          <NavItem active={activeTab === 'events'} onClick={() => setActiveTab('events')} icon={Globe} label="EVENTS" />
          <NavItem active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} icon={BookOpen} label="Knowledge & FAQ" />
          <NavItem active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} icon={Layout} label="Plan Templates" />
          <NavItem active={activeTab === 'features'} onClick={() => setActiveTab('features')} icon={CheckSquare} label="Feature Set" />
          
          <div className="px-4 mb-2 mt-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">System</div>
          <NavItem active={activeTab === 'partners'} onClick={() => setActiveTab('partners')} icon={Users} label="Partners" />
          <NavItem active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} icon={CalendarIcon} label="Calendar" />
          <NavItem active={activeTab === 'assets'} onClick={() => setActiveTab('assets')} icon={Monitor} label="Site Assets" />
        </nav>

        <div className="p-4 border-t border-zinc-800 shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-4 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-400/5 transition-all font-bold text-sm"
          >
            <LogOut className="w-5 h-5" /> LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 p-12 max-w-7xl">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">
              {activeTab.replace('_', ' ').toUpperCase()}
            </h2>
            <p className="text-zinc-500 font-bold">Dynamic site control center for Sound ANG.</p>
          </div>
          <div className="flex gap-4">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Quick search..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-6 py-3 text-xs font-bold focus:border-blue-600 outline-none w-64 transition-all"
                />
             </div>
            <button 
              onClick={() => window.open('/admin/print/sp-standard', '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600/10 text-indigo-500 border border-indigo-500/20 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all"
            >
              <Printer className="w-4 h-4" /> A4 PRINT
            </button>
            <button 
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600/10 text-blue-500 border border-blue-500/20 rounded-xl font-bold text-xs hover:bg-blue-600 hover:text-white transition-all"
            >
              <Eye className="w-4 h-4" /> PREVIEW
            </button>
          </div>
        </header>

        <div className="space-y-8">
          {activeTab === 'vehicles' && <VehicleManager search={searchTerm} />}
          {activeTab === 'security' && <SecurityPlanManager />}
          {activeTab === 'audio' && <AudioPlanManager />}
          {activeTab === 'audition' && <AuditionSpeakerManager />}
          {activeTab === 'announcements' && <AnnouncementManager />}
          {activeTab === 'recruitment' && <RecruitmentManager />}
          {activeTab === 'events' && <EventManager />}
          {activeTab === 'knowledge' && <KnowledgeManager />}
          {activeTab === 'templates' && <TemplateManager />}
          {activeTab === 'features' && <FeatureSetManager />}
          {activeTab === 'others' && <PeripheralProductManager />}
          {activeTab === 'partners' && <PartnerManager />}
          {activeTab === 'calendar' && <CalendarManager />}
          {activeTab === 'assets' && <AssetManager />}
        </div>

        {/* Global Floating Save Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-12 right-12 z-[90]"
        >
          <button 
            onClick={() => {
              saveSiteData({ 
                audioEmergencyAnnouncement,
                securityEmergencyAnnouncement,
                audioHeroAlert,
                securityHeroAlert,
                audioEvents,
                securityEvents,
                calendar: holidays,
                securityKnowledge,
                audioRecruitment,
                securityRecruitment
              });
              alert('すべての設定（告知・採用・イベント・カレンダー）を保存しました。');
            }}
            className="flex items-center gap-4 bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/40 transition-all transform hover:-translate-y-2 group"
          >
            <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Save All Announcements</span>
          </button>
        </motion.div>
      </main>
    </div>
  );
};

// --- Nav Component ---
const NavItem = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-xl transition-all font-black text-sm tracking-tight ${
      active 
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
        : 'text-zinc-500 hover:text-white hover:bg-zinc-800/50'
    }`}
  >
    <Icon className={`w-4.5 h-4.5 ${active ? 'text-white' : 'text-zinc-600'}`} />
    {label}
  </button>
);

// --- Shared Helpers ---

const Input = ({ field, value, onChange }: any) => (
  <div className="space-y-2">
    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">{field}</label>
    <input 
      type="text" 
      value={value} 
      onChange={e => onChange(e.target.value)}
      className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-3.5 text-white text-sm font-bold focus:border-blue-500 outline-none transition-all"
    />
  </div>
);

const ToggleButton = ({ active, onClick, label }: any) => (
  <div className="flex items-center gap-4 bg-black/40 px-5 py-3 rounded-2xl border border-zinc-800">
    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
    <button 
      onClick={onClick}
      className={`px-6 py-2 rounded-xl font-black text-[10px] transition-all ${
        active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-800 text-zinc-600'
      }`}
    >
      {active ? 'ON' : 'OFF'}
    </button>
  </div>
);

// --- Sub-Managers ---

const VehicleManager = ({ search }: any) => {
  const { securityData, updateSecurityVehicle, renameVehicleSlug, reorderSecurityCarItems, updateSecurityCarGroups, removeVehicle, addSecurityVehicle } = usePrices();
  const vehicles = securityData.vehicles || {};
  const categories = securityData.menu?.categories || [];
  const securityCarCat = categories.find((c: any) => c.id === 'security_car');
  const groups = securityCarCat?.groups || [];
  
  const [addingToGroup, setAddingToGroup] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');

  const handleAdd = (groupName: string) => {
    if (!newName.trim()) return;
    const finalSlug = newSlug.trim() || newName.toLowerCase().trim().replace(/[\s/]/g, '-').replace(/[^\w-]/g, '');
    addSecurityVehicle(groupName, newName.trim(), finalSlug);
    setNewName('');
    setNewSlug('');
    setAddingToGroup(null);
  };

  const handleMove = (groupName: string, index: number, direction: 'up' | 'down') => {
    const group = groups.find((g: any) => g.name === groupName);
    if (!group) return;
    
    const newItems = [...group.items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    reorderSecurityCarItems(groupName, newItems);
  };

  const findSlugByFlexibleName = (name: string) => {
    // 1. Try exact match
    let found = Object.keys(vehicles).find(slug => vehicles[slug].name === name);
    if (found) return found;

    // 2. Try normalized comparison (ignore case, whitespace, and both English/Japanese prefixes)
    const norm = (s: string) => s.toLowerCase()
      .replace(/[\s-]/g, '')
      .replace(/^(lexus|toyota|レクサス|トヨタ)/, '');
    
    const searchNorm = norm(name);
    
    found = Object.keys(vehicles).find(slug => {
      const vName = vehicles[slug].name || '';
      return norm(vName) === searchNorm;
    });
    
    return found;
  };

  const changeManufacturer = (slug: string, oldGroup: string, newGroup: string) => {
    const vehicle = vehicles[slug];
    if (!vehicle) return;

    const updatedGroups = groups.map((g: any) => {
      if (g.name === oldGroup) {
        return { ...g, items: g.items.filter((it: string) => it !== vehicle.name) };
      }
      if (g.name === newGroup) {
        return { ...g, items: [...g.items, vehicle.name] };
      }
      return g;
    });

    updateSecurityCarGroups(updatedGroups);
  };

  const renameVehicleInMenu = (groupName: string, index: number, newName: string) => {
    const updatedGroups = groups.map((g: any) => {
        if (g.name === groupName) {
            const nextItems = [...g.items];
            nextItems[index] = newName;
            return { ...g, items: nextItems };
        }
        return g;
    });
    updateSecurityCarGroups(updatedGroups);
  };

  return (
    <div className="space-y-16">
      {groups.map((group: any) => {
        const itemsWithSlugs = group.items.map((itemName: string) => {
          const slug = findSlugByFlexibleName(itemName);
          const vehicleData = slug ? vehicles[slug] : null;
          return {
            name: vehicleData?.name || itemName,
            slug: slug,
            menuName: itemName // keep track of the name in the menu for indexing/sync
          };
        }).filter((item: any) => {
          if (search) {
             const lower = search.toLowerCase();
             return item.name.toLowerCase().includes(lower) || (item.slug && item.slug.toLowerCase().includes(lower));
          }
          return true;
        });

        if (itemsWithSlugs.length === 0 && search) return null;

        return (
          <div key={group.name} className="space-y-8">
            <div className="flex items-center gap-6">
              <h3 className="text-sm font-black text-blue-500 uppercase tracking-[0.4em] px-4 py-1.5 border-l-2 border-blue-600 bg-blue-600/5">{group.name}</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
              
              <div className="flex items-center gap-4">
                  {addingToGroup === group.name ? (
                      <div className="flex flex-col gap-2 p-3 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl">
                        <div className="flex items-center gap-2">
                           <input 
                            autoFocus
                            type="text" 
                            value={newName}
                            onChange={e => {
                                setNewName(e.target.value);
                                // Suggest slug
                                if (!newSlug) {
                                    const suggest = e.target.value.toLowerCase().trim().replace(/[\s/]/g, '-').replace(/[^\w-]/g, '');
                                    // Optionally sync if user hasn't typed in slug field yet? 
                                    // For now just allow manual.
                                }
                            }}
                            placeholder="Name (e.g. レクサス LX)"
                            className="bg-black border border-zinc-800 rounded-lg px-4 py-1.5 text-[10px] font-bold text-white outline-none w-48 focus:border-blue-500 transition-all"
                          />
                          <input 
                            type="text" 
                            value={newSlug}
                            onChange={e => setNewSlug(e.target.value)}
                            placeholder="ID/Slug (e.g. lexus-lx)"
                            className="bg-black border border-zinc-800 rounded-lg px-4 py-1.5 text-[10px] font-mono text-zinc-400 outline-none w-40 focus:border-blue-500 transition-all"
                          />
                          <button 
                            onClick={() => handleAdd(group.name)}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => { setAddingToGroup(null); setNewName(''); setNewSlug(''); }}
                            className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[8px] text-zinc-600 font-bold px-2 italic">※ IDはURLの一部（/security/vehicle/ID）になります</p>
                      </div>
                  ) : (
                    <button 
                      onClick={() => setAddingToGroup(group.name)}
                      className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add New
                    </button>
                  )}
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{itemsWithSlugs.length} VEHICLES</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {itemsWithSlugs.map((item: any, idx: number) => {
                const vehicleData = item.slug ? vehicles[item.slug] : null;
                
                return (
                  <div key={item.slug || item.name} className="relative group/row">
                    <div className="absolute -left-12 top-12 flex flex-col gap-1 opacity-0 group-hover/row:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/row:translate-x-0">
                      <button 
                        onClick={() => handleMove(group.name, idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-blue-500 disabled:opacity-20 transition-all shadow-xl"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleMove(group.name, idx, 'down')}
                        disabled={idx === group.items.length - 1}
                        className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-blue-500 disabled:opacity-20 transition-all shadow-xl"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {!vehicleData ? (
                      <div className="bg-zinc-900/40 border border-dashed border-zinc-800 p-6 rounded-3xl flex items-center justify-between group-hover:border-blue-500/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-zinc-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-zinc-400">{item.name}</h4>
                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Configuration Data Missing</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                             const slug = item.name.toLowerCase().trim().replace(/[\s/]/g, '-').replace(/[^\w-]/g, '');
                             addSecurityVehicle(group.name, item.name, slug);
                          }}
                          className="px-6 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                        >
                          Initialize Config
                        </button>
                      </div>
                    ) : (
                      <VehicleCard 
                        slug={item.slug} 
                        data={vehicleData} 
                        group={group.name}
                        allGroups={groups.map((g: any) => g.name)}
                        onUpdate={updateSecurityVehicle} 
                        onRenameSlug={renameVehicleSlug}
                        onChangeGroup={(newGroup: string) => changeManufacturer(item.slug, group.name, newGroup)}
                        onRenameInMenu={(newName: string) => {
                            const realIdx = group.items.indexOf(item.menuName);
                            if (realIdx !== -1) {
                                renameVehicleInMenu(group.name, realIdx, newName);
                            }
                        }}
                        onDelete={() => {
                            if (confirm(`${item.name}を削除してもよろしいですか？`)) {
                                removeVehicle(item.slug);
                            }
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const VehicleCard = ({ slug, data, group, allGroups, onUpdate, onRenameSlug, onChangeGroup, onRenameInMenu, onDelete }: any) => {
  const { securityData } = usePrices();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [copySourceSlug, setCopySourceSlug] = useState('');

  const handleCopyPlans = () => {
    if (!copySourceSlug) return;
    const sourceVehicle = securityData.vehicles[copySourceSlug];
    if (!sourceVehicle) return;

    if (window.confirm(`${sourceVehicle.name}からプランとセンサー設定をコピーしますか？\n現在のプランはすべて上書きされます。`)) {
      setFormData({
        ...formData,
        featureSetId: sourceVehicle.featureSetId,
        plans: JSON.parse(JSON.stringify(sourceVehicle.plans || []))
      });
      setCopySourceSlug('');
    }
  };

  useEffect(() => {
    if (isEditing) {
        setFormData(data);
        setCurrentSlug(slug);
    }
    // Only reset when starting to edit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const handleSave = () => {
    if (formData.name !== data.name) {
      onRenameInMenu(formData.name);
    }
    if (currentSlug !== slug) {
      onRenameSlug(slug, currentSlug);
    }
    onUpdate(currentSlug, formData);
    setIsEditing(false);
  };

  const addPlan = () => {
    const newPlan = {
      id: Date.now(),
      brand: 'Grgo',
      grade: 'New Plan',
      description: '',
      price: '0',
      features: {
        triple: false,
        tilt: false,
        bonnet: false,
        microwave: false,
        siren: false,
        algorithm: false,
        canguard: false,
        keyless: false
      }
    };
    setFormData({ ...formData, plans: [...(formData.plans || []), newPlan] });
  };

  const removePlan = (index: number) => {
    if (!window.confirm('このプランを削除しますか？')) return;
    const next = (formData.plans || []).filter((_: any, idx: number) => idx !== index);
    setFormData({ ...formData, plans: next });
  };

  return (
    <div className={`bg-zinc-900/40 border transition-all duration-500 rounded-[2.5rem] overflow-hidden ${
      isEditing ? 'border-blue-500/50 shadow-2xl shadow-blue-500/10' : 'border-zinc-800 hover:border-zinc-700 shadow-xl'
    }`}>
      <div className="p-8 flex items-center justify-between gap-8">
        <div className="flex items-center gap-10">
          <div className="w-32 h-20 rounded-2xl bg-black border border-zinc-800 overflow-hidden relative shadow-2xl group/img">
            <img src={data.image} alt="" className="w-full h-full object-cover opacity-80 group-hover/img:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">{data.name}</h3>
                <span className="bg-blue-600/10 border border-blue-500/20 text-[9px] font-black text-blue-400 px-3 py-1 rounded-full uppercase tracking-widest">{data.year || '2024-'}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] font-mono">{slug}</span>
              <div className="h-1 w-1 rounded-full bg-zinc-800"></div>
              <div className="flex gap-2">
                {(data.plans || []).length > 0 ? (
                  data.plans.slice(0, 4).map((p: any, i: number) => (
                    <span key={i} className="text-[8px] font-black text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 uppercase">{p.grade}</span>
                  ))
                ) : (
                  <span className="text-[8px] font-black text-rose-500/50 uppercase tracking-widest">No Plans Configured</span>
                )}
                {(data.plans?.length || 0) > 4 && <span className="text-[8px] font-black text-zinc-700">+{data.plans.length - 4} MORE</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <button 
              onClick={onDelete}
              className="p-3.5 text-zinc-600 hover:text-rose-500 hover:bg-rose-500/5 rounded-2xl transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center gap-3 ${
                isEditing 
                ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' 
                : 'bg-white text-black hover:bg-blue-600 hover:text-white shadow-xl shadow-white/5'
              }`}
            >
              {isEditing ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
              {isEditing ? 'Close' : 'Manage Config'}
            </button>
        </div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-zinc-800 bg-zinc-950/50"
          >
            <div className="p-12 space-y-16">
                {/* Section: Basic Settings */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                   <div className="lg:col-span-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Display Model Name</label>
                              <input 
                                  type="text" 
                                  value={formData.name} 
                                  onChange={e => setFormData({...formData, name: e.target.value})}
                                  className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-blue-500 font-bold transition-all shadow-inner"
                              />
                          </div>
                          <div className="space-y-3">
                              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Manufacturer Group</label>
                              <select 
                                  value={group}
                                  onChange={e => onChangeGroup(e.target.value)}
                                  className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-blue-500 font-bold appearance-none cursor-pointer"
                              >
                                  {allGroups.map((g: string) => (
                                    <option key={g} value={g}>{g}</option>
                                  ))}
                              </select>
                          </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Vehicle ID / URL Slug</label>
                              <input 
                                  type="text" 
                                  value={currentSlug} 
                                  onChange={e => setCurrentSlug(e.target.value)}
                                  placeholder="e.g. lexus-gx550"
                                  className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-blue-400 text-[10px] font-mono outline-none focus:border-blue-500 transition-all shadow-inner"
                              />
                          </div>
                          <div className="space-y-3">
                              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Production Year</label>
                              <input 
                                  type="text" 
                                  value={formData.year} 
                                  onChange={e => setFormData({...formData, year: e.target.value})}
                                  placeholder="e.g. 2024-"
                                  className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-blue-500 font-bold transition-all shadow-inner"
                              />
                          </div>
                          <div className="space-y-3">
                              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Hero Image Path</label>
                              <input 
                                  type="text" 
                                  value={formData.image} 
                                  onChange={e => {
                                      let val = e.target.value;
                                      // Clean up absolute windows paths
                                      if (val.includes('\\public\\')) {
                                          val = val.split('\\public\\')[1].replace(/\\/g, '/');
                                          if (!val.startsWith('/')) val = '/' + val;
                                      } else if (val.includes('/public/')) {
                                          val = val.split('/public/')[1];
                                          if (!val.startsWith('/')) val = '/' + val;
                                      }
                                      setFormData({...formData, image: val});
                                  }}
                                  placeholder="/images/Security/vehicle/model.webp"
                                  className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-[10px] font-mono outline-none focus:border-blue-500 transition-all shadow-inner"
                              />
                              <p className="text-[9px] text-zinc-600 font-bold italic">※ publicフォルダからの相対パス（/images/...）を入力してください</p>
                          </div>
                          <div className="space-y-3">
                              <label className="block text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Featured Plan Template</label>
                              <select 
                                  value={formData.featuredPlanId || ''} 
                                  onChange={e => setFormData({...formData, featuredPlanId: e.target.value})}
                                  className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-emerald-500 font-bold transition-all shadow-inner"
                              >
                                  <option value="">No Template (Fallback to default logic)</option>
                                  {((securityData as any).featuredPlanTemplates || []).map((t: any) => (
                                      <option key={t.id} value={t.id}>{t.name}</option>
                                  ))}
                              </select>
                              <p className="text-[9px] text-zinc-600 font-bold italic">※ この車種の特設プランに使用するパターンを選択します</p>
                          </div>
                          <div className="space-y-3">
                              <label className="block text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Sensor Checklist Pattern</label>
                              <select 
                                  value={formData.featureSetId || ''} 
                                  onChange={e => setFormData({...formData, featureSetId: e.target.value})}
                                  className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-blue-500 font-bold transition-all shadow-inner"
                              >
                                  <option value="">Standard (Default Sensors)</option>
                                  {(securityData.featureSetTemplates || []).map((t: any) => (
                                      <option key={t.id} value={t.id}>{t.name}</option>
                                  ))}
                              </select>
                              <p className="text-[9px] text-zinc-600 font-bold italic">※ 比較表に表示するセンサー項目のセットを選択します</p>
                          </div>
                      </div>
                      <div className="pt-4 border-t border-zinc-800/50">
                          <div className="flex items-center justify-between bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10 max-w-sm">
                              <div className="flex flex-col">
                                  <label className="text-[11px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">Suggest V2 Plan</label>
                                  <span className="text-[9px] text-zinc-600 font-bold uppercase">Show budget friendly message at bottom</span>
                              </div>
                              <input 
                                  type="checkbox"
                                  checked={formData.showV2Option}
                                  onChange={e => setFormData({...formData, showV2Option: e.target.checked})}
                                  className="w-6 h-6 rounded-lg bg-black border-emerald-900 text-emerald-600 focus:ring-0 transition-all cursor-pointer"
                              />
                          </div>
                      </div>
                   </div>
                   <div className="lg:col-span-4 space-y-3">
                      <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Specific Introduction Text</label>
                      <textarea 
                          value={formData.description || ''} 
                          onChange={e => setFormData({...formData, description: e.target.value})}
                          placeholder="Highlight key theft risks for this specific model..."
                          className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-5 text-white text-sm outline-none focus:border-blue-500 h-[178px] leading-relaxed transition-all shadow-inner custom-scrollbar"
                      />
                   </div>
                </div>
                
                {/* Section: Plans Management */}
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-6 gap-6">
                        <div className="flex items-center gap-4">
                           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                           <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Security Plans Configuration</h4>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4">
                           <div className="flex items-center bg-black/40 border border-zinc-800 rounded-2xl px-4 py-2 gap-3">
                               <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest whitespace-nowrap">Copy from:</span>
                               <select 
                                   value={copySourceSlug}
                                   onChange={e => setCopySourceSlug(e.target.value)}
                                   className="bg-transparent text-[10px] font-bold text-white outline-none cursor-pointer min-w-[140px]"
                               >
                                   <option value="" className="bg-zinc-900">Select Vehicle...</option>
                                   {Object.keys(securityData.vehicles || {})
                                       .filter(s => s !== slug)
                                       .sort((a, b) => (securityData.vehicles[a]?.name || '').localeCompare(securityData.vehicles[b]?.name || ''))
                                       .map(s => (
                                           <option key={s} value={s} className="bg-zinc-900">
                                               {securityData.vehicles[s]?.name || s}
                                           </option>
                                       ))
                                   }
                               </select>
                               <button 
                                   onClick={handleCopyPlans}
                                   disabled={!copySourceSlug}
                                   className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${
                                       copySourceSlug 
                                       ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white' 
                                       : 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
                                   }`}
                               >
                                   Copy Plans
                               </button>
                           </div>

                           <button 
                               onClick={addPlan}
                               className="group flex items-center gap-3 text-[11px] font-black text-emerald-400 hover:text-white uppercase tracking-widest bg-emerald-500/10 hover:bg-emerald-500 px-6 py-3 rounded-2xl transition-all duration-300"
                           >
                               <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add New Plan
                           </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {(formData.plans || []).map((p: any, i: number) => (
                            <div key={p.id || i} className="bg-zinc-900/60 border border-zinc-800 rounded-[2rem] overflow-hidden group/plan hover:border-zinc-700 transition-colors">
                                <div className="px-8 py-5 bg-black/40 flex items-center justify-between border-b border-zinc-800/50">
                                    <div className="flex items-center gap-6">
                                        <div className="flex bg-black rounded-xl p-1 gap-1">
                                            {['Grgo', 'Panthera', 'Author', 'Other'].map(b => (
                                                <button 
                                                  key={b}
                                                  onClick={() => {
                                                      const next = [...formData.plans];
                                                      next[i] = { ...next[i], brand: b };
                                                      setFormData({ ...formData, plans: next });
                                                  }}
                                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${
                                                    p.brand === b ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'
                                                  }`}
                                                >
                                                  {b}
                                                </button>
                                            ))}
                                        </div>
                                        <input 
                                            type="text"
                                            value={p.grade}
                                            placeholder="Grade name (e.g. ZVT II)"
                                            onChange={e => {
                                                const next = [...formData.plans];
                                                next[i] = { ...next[i], grade: e.target.value };
                                                setFormData({ ...formData, plans: next });
                                            }}
                                            className="bg-transparent text-white font-black text-lg outline-none w-64 border-b border-transparent focus:border-blue-500 transition-all italic tracking-tighter"
                                        />
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removePlan(i);
                                        }}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-700 hover:text-red-500 hover:bg-red-500/10 transition-all z-10"
                                    >
                                        <Trash2 className="w-4.5 h-4.5" />
                                    </button>
                                </div>
                                <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
                                    <div className="lg:col-span-3 space-y-6">
                                        <div>
                                            <label className="block text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-3">Package Price (Tax In)</label>
                                            <div className="relative group/price">
                                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-bold">¥</span>
                                                <input 
                                                    type="text"
                                                    value={p.price}
                                                    onChange={e => {
                                                        const next = [...formData.plans];
                                                        next[i] = { ...next[i], price: e.target.value };
                                                        setFormData({ ...formData, plans: next });
                                                    }}
                                                    className="w-full bg-black border border-zinc-800 rounded-xl pl-10 pr-5 py-4 text-sm text-white font-black focus:border-blue-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4 pt-2">
                                            <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-zinc-800/50">
                                              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Recommended</label>
                                              <input 
                                                  type="checkbox"
                                                  checked={p.isRecommended}
                                                  onChange={e => {
                                                      const next = [...formData.plans];
                                                      next[i] = { ...next[i], isRecommended: e.target.checked };
                                                      setFormData({ ...formData, plans: next });
                                                  }}
                                                  className="w-5 h-5 rounded-lg bg-black border-zinc-800 text-blue-600 focus:ring-0 transition-all cursor-pointer"
                                              />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[8px] font-black text-zinc-600 uppercase tracking-widest">Visual Badge</label>
                                                <input 
                                                    type="text"
                                                    value={p.badge || ''}
                                                    placeholder="e.g. 究極の安心"
                                                    onChange={e => {
                                                        const next = [...formData.plans];
                                                        next[i] = { ...next[i], badge: e.target.value };
                                                        setFormData({ ...formData, plans: next });
                                                    }}
                                                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[10px] text-zinc-300 font-bold focus:border-blue-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="lg:col-span-9">
                                        <label className="block text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-6">Features & Sensors Checklist</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {(securityData.featureSetTemplates?.find(t => t.id === formData.featureSetId)?.features || [
                                                { key: 'triple', label: 'トリプル' },
                                                { key: 'tilt', label: '傾斜' },
                                                { key: 'bonnet', label: 'ボンネット' },
                                                { key: 'microwave', label: 'マイクロ波' },
                                                { key: 'siren', label: 'バックアップサイレン' },
                                                { key: 'algorithm', label: '純正ロック連動' },
                                                { key: 'canguard', label: 'CANガード' },
                                                { key: 'keyless', label: 'アルゴリズム' }
                                            ]).map((feat: any) => (
                                                <button 
                                                    key={feat.key}
                                                    onClick={() => {
                                                        const next = [...formData.plans];
                                                        next[i] = { 
                                                            ...next[i], 
                                                            features: { 
                                                                ...(next[i].features || {}), 
                                                                [feat.key]: !next[i].features?.[feat.key] 
                                                            } 
                                                        };
                                                        setFormData({ ...formData, plans: next });
                                                    }}
                                                    className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-300 ${
                                                        p.features?.[feat.key] 
                                                        ? 'bg-blue-600/10 border-blue-500/50 text-blue-400' 
                                                        : 'bg-black/20 border-zinc-800 text-zinc-600 hover:border-zinc-700'
                                                    }`}
                                                >
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{feat.label}</span>
                                                    <div className={`w-2 h-2 rounded-full ${p.features?.[feat.key] ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-zinc-800'}`}></div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section: Action Bar */}
                <div className="flex justify-end gap-6 pt-12 border-t border-zinc-800">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-10 py-4 rounded-2xl text-[11px] font-black text-zinc-500 uppercase tracking-widest hover:text-zinc-300 transition-colors"
                    >
                      Discard Changes
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-12 py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-500 shadow-2xl shadow-blue-600/20 transition-all transform hover:-translate-y-1"
                    >
                      Save Configuration
                    </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};                                                            

const SecurityPlanManager = () => {
    const { plans, updatePrice, securityData, updateSecurityHome } = usePrices();
    const securityPlans = plans.filter(p => p.type === 'security');

    const v2Settings = securityData.home.v2Settings || {
        title: '予算に合わせて、<span class="text-emerald-500">機能を凝縮した守り</span>を。',
        description: '「フルスペックは必要ないが、最新の盗難手口からは確実に守りたい」というお客様へ。ANGでは、機能を厳選しコストパフォーマンスを極限まで高めた**Grgo V2ベースのプラン**も提案可能です。お気軽にご相談ください。'
    };
  
    return (
      <div className="space-y-12">
        {/* V2 Suggestion Section Editor */}
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2.5rem] p-10 space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-600/20">
                    <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">V2 Suggestion Content</h3>
                    <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1">Global Message Settings</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Section Title (HTML Allowed)</label>
                    <input 
                        type="text"
                        value={v2Settings.title}
                        onChange={e => updateSecurityHome({ v2Settings: { ...v2Settings, title: e.target.value } })}
                        className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm font-bold focus:border-emerald-500 transition-all"
                        placeholder="予算に合わせて、<span class='text-emerald-500'>機能を凝縮した守り</span>を。"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Section Description</label>
                    <textarea 
                        value={v2Settings.description}
                        onChange={e => updateSecurityHome({ v2Settings: { ...v2Settings, description: e.target.value } })}
                        className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-5 text-white text-sm font-bold h-32 leading-relaxed focus:border-emerald-500 transition-all"
                    />
                </div>
            </div>
            <p className="text-[10px] text-zinc-600 font-bold italic">※ ここで設定した内容は、全車種詳細ページの「V2提案セクション」に反映されます。</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
        {securityPlans.map(cat => (
          <div key={cat.id} className="bg-zinc-900/30 border border-zinc-800 rounded-[2rem] p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-white italic tracking-tighter">{cat.title}</h3>
              <div className="text-[10px] font-black text-zinc-500 uppercase bg-zinc-800 px-3 py-1 rounded-full">{cat.id}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.items.map(item => (
                <div key={item.name} className="bg-black/50 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-white text-sm">{item.name}</h4>
                    <span className="text-blue-500 text-[10px] font-bold">Standard: ¥{parseInt(item.price).toLocaleString()}</span>
                  </div>
                  <input 
                    type="text" 
                    defaultValue={item.price}
                    onBlur={(e) => updatePrice(cat.id, item.name, { price: e.target.value })}
                    className="w-24 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white font-black text-right"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureSetManager = () => {
    const { securityData, updateFeatureSetTemplate, addFeatureSetTemplate, removeFeatureSetTemplate } = usePrices();
    const templates = securityData.featureSetTemplates || [];

    const addNew = () => {
        const id = `set-${Date.now()}`;
        addFeatureSetTemplate({
            id,
            name: '新規機能項目セット',
            features: [
                { key: 'triple', label: 'トリプル' },
                { key: 'tilt', label: '傾斜' }
            ]
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
                <div>
                    <h3 className="text-xl font-black text-white italic tracking-tighter mb-1 uppercase">Feature Set Patterns</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">機能項目・センサーセットの管理</p>
                </div>
                <button 
                    onClick={addNew}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black text-[10px] font-black px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest"
                >
                    Add New Pattern
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {templates.map(set => (
                    <div key={set.id} className="bg-zinc-900/30 border border-zinc-800 rounded-[2rem] p-8 relative group">
                        <button 
                            onClick={() => {
                                if(window.confirm('このパターンを削除しますか？')) removeFeatureSetTemplate(set.id);
                            }}
                            className="absolute top-8 right-8 text-zinc-600 hover:text-rose-500 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="max-w-md mb-8">
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 italic">Pattern Name</label>
                            <input 
                                type="text"
                                value={set.name}
                                onChange={e => updateFeatureSetTemplate({ ...set, name: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-3 text-white text-sm outline-none focus:border-emerald-500 font-bold transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 italic">Features & Labels</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {set.features.map((f, i) => (
                                    <div key={i} className="bg-black/40 border border-zinc-800/50 p-4 rounded-2xl space-y-3 relative group/item">
                                        <div className="space-y-1">
                                            <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest leading-none">Label (Display Word)</label>
                                            <input 
                                                type="text"
                                                value={f.label}
                                                onChange={e => {
                                                    const next = [...set.features];
                                                    next[i] = { ...f, label: e.target.value };
                                                    updateFeatureSetTemplate({ ...set, features: next });
                                                }}
                                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white font-bold outline-none focus:border-emerald-500"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest leading-none">Key (Data ID)</label>
                                            <input 
                                                type="text"
                                                value={f.key}
                                                onChange={e => {
                                                    const next = [...set.features];
                                                    next[i] = { ...f, key: e.target.value };
                                                    updateFeatureSetTemplate({ ...set, features: next });
                                                }}
                                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-[10px] text-zinc-400 font-mono outline-none focus:border-emerald-500"
                                            />
                                        </div>
                                        <button 
                                            onClick={() => {
                                                const next = set.features.filter((_, idx) => idx !== i);
                                                updateFeatureSetTemplate({ ...set, features: next });
                                            }}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => {
                                        updateFeatureSetTemplate({
                                            ...set,
                                            features: [...set.features, { key: `new-${Date.now()}`, label: '新項目' }]
                                        });
                                    }}
                                    className="border-2 border-dashed border-zinc-800 rounded-2xl flex items-center justify-center py-6 text-zinc-600 hover:text-emerald-500 hover:border-emerald-500 transition-all group/add"
                                >
                                    <div className="flex flex-col items-center">
                                        <Plus size={20} className="mb-1" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Add Row</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AudioPlanManager = () => {
    const { audioLPs, setAudioLPs, plans, updateCategory } = usePrices();
    const [copiedSpeaker, setCopiedSpeaker] = useState<any>(null);
    const lps = audioLPs || [];

    const CATEGORIES = [
        { id: 'speaker_package', name: 'スピーカー交換・車種別プラン' },
        { id: 'bass_power', name: '低音強化・パワーアップ（アンプ）' },
        { id: 'digital_source', name: 'DSP・プレーヤー・高音音質ナビ' },
        { id: 'install_tuning', name: 'デッドニング・施工・電源' },
        { id: 'custom_install', name: 'カスタムインストール・造作' }
    ];

    const cleanPathInput = (val: string) => {
        let p = val.replace(/^["']|["']$/g, '').replace(/\\/g, '/');
        const pubIdx = p.indexOf('/public/');
        if (pubIdx !== -1) return p.substring(pubIdx + 7);
        const imgIdx = p.indexOf('/images/');
        if (imgIdx !== -1) return p.substring(imgIdx);
        return val.replace(/^["']|["']$/g, '');
    };

    const [selectedId, setSelectedId] = useState(() => lps[0]?.id || 'standard');
    const currentLine = lps.find(p => p.id === selectedId) || lps[0];

    const [data, setData] = useState(() => currentLine);
    const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

    useEffect(() => {
        if (currentLine) {
            setData(currentLine);
        }
    }, [currentLine]);

    if (!data) return null;

    const sections = data.sections || [];

    const updateSections = (next: any[]) => {
        setData({ ...data, sections: next });
    };

    const updateSectionData = (sIdx: number, updatedFields: any) => {
        const nextSections = [...sections];
        nextSections[sIdx] = {
            ...nextSections[sIdx],
            data: {
                ...nextSections[sIdx].data,
                ...updatedFields
            }
        };
        updateSections(nextSections);
    };

    const parsePrice = (priceStr: any) => {
        if (typeof priceStr === 'number') return priceStr;
        if (!priceStr) return 0;
        const str = priceStr.toString();
        return parseInt(str.replace(/[^0-9]/g, '')) || 0;
    };

    const calculateAppliedPriceForSection = (spk: any, sectionFixedPrice: number) => {
        if (!spk) return 0;
        const isString = typeof spk === 'string';
        const standalonePrice = isString ? spk : spk.standalonePrice;
        const speakerPrice = parsePrice(standalonePrice);
        const fixedFee = !isString && spk.fixedPriceOverride !== undefined && spk.fixedPriceOverride !== ''
            ? parsePrice(spk.fixedPriceOverride)
            : sectionFixedPrice;
        return speakerPrice + fixedFee;
    };

    const handleSave = () => {
        if (!data) return;
        const cleanSlug = (data.slug || 'sp-custom').replace(/^\/+/, '');
        
        // 1. Synchronize metadata from sections to top-level if sections exist
        const heroSec = data.sections?.find(s => s.type === 'hero');
        const pricingSec = data.sections?.find(s => s.type === 'pricing');
        const spkSec = data.sections?.find(s => s.type === 'speakers');
        
        const updatedLP = {
            ...data,
            slug: cleanSlug,
            header: {
                ...data.header,
                badge: heroSec?.data?.badge || data.header?.badge || '',
                mainTitle: heroSec?.data?.title || data.header?.mainTitle || '',
                subTitle: heroSec?.data?.subtitle || data.header?.subTitle || '',
                description: heroSec?.data?.desc || data.header?.description || ''
            },
            pricing: {
                ...data.pricing,
                specialPrice: pricingSec?.data?.specialPrice || data.pricing?.specialPrice || '',
                fixedPrice: pricingSec?.data?.fixedPrice !== undefined ? parsePrice(pricingSec.data.fixedPrice) : (data.pricing?.fixedPrice || 0),
                normalPriceText: pricingSec?.data?.normalPriceText || data.pricing?.normalPriceText || '',
                savingsText: pricingSec?.data?.savingsText || data.pricing?.savingsText || '',
                note: pricingSec?.data?.note || data.pricing?.note || '',
                taxRate: pricingSec?.data?.taxRate !== undefined ? parsePrice(pricingSec.data.taxRate) : (data.pricing?.taxRate || 10)
            },
            speakers: spkSec?.data?.speakers || data.speakers || []
        };
        
        // 2. Update LPs list
        const nextLPs = lps.map(p => p.id === currentLine.id ? updatedLP : p);
        setAudioLPs(nextLPs);
        
        // 3. Update plans for Navbar / MegaMenu menu items
        const targetCatId = updatedLP.parentCategoryId || 'speaker_package';
        const showInMenu = updatedLP.showInMenu !== false;
        let nextPlans = plans.map(cat => {
            if (cat.type !== 'audio') return cat;
            
            // Remove this LP from all categories first to avoid duplicates
            let nextItems = (cat.items || []).filter(item => item.id !== updatedLP.id && item.slug !== updatedLP.slug);
            
            if (showInMenu && cat.id === targetCatId) {
                // Add/update in this category
                const matchedItem = (cat.items || []).find(item => item.id === updatedLP.id || item.slug === updatedLP.slug);
                const newItem = {
                    id: updatedLP.id,
                    name: updatedLP.name,
                    badge: updatedLP.header.badge || 'NEW',
                    description: updatedLP.header.description || '',
                    link: updatedLP.externalLink || `/${updatedLP.slug}`,
                    features: [],
                    price: updatedLP.pricing.specialPrice || '0',
                    ...matchedItem
                };
                // Make sure slug and fields match the updated one
                newItem.link = updatedLP.externalLink || `/${updatedLP.slug}`;
                newItem.name = updatedLP.name;
                newItem.badge = updatedLP.header.badge;
                newItem.description = updatedLP.header.description;
                newItem.price = updatedLP.pricing.specialPrice;
                
                nextItems.push(newItem);
            }
            
            return { ...cat, items: nextItems };
        });

        // 4. Sort the items inside each audio category to match the order of nextLPs
        nextPlans = nextPlans.map(cat => {
            if (cat.type !== 'audio') return cat;
            
            const catLPs = nextLPs.filter(lp => (lp.parentCategoryId || 'speaker_package') === cat.id && lp.showInMenu !== false);
            const dynamicItems = (cat.items || []).filter((item: any) => catLPs.some(lp => lp.id === item.id));
            const staticItems = (cat.items || []).filter((item: any) => !catLPs.some(lp => lp.id === item.id));
            
            const sortedDynamicItems = [...dynamicItems].sort((a: any, b: any) => {
                const indexA = catLPs.findIndex(lp => lp.id === a.id);
                const indexB = catLPs.findIndex(lp => lp.id === b.id);
                return indexA - indexB;
            });
            
            return { ...cat, items: [...sortedDynamicItems, ...staticItems] };
        });
        
        // Save the updated categories
        nextPlans.forEach(cat => {
            const origCat = plans.find(c => c.id === cat.id);
            if (JSON.stringify(origCat?.items) !== JSON.stringify(cat.items)) {
                updateCategory(cat.id, { items: cat.items });
            }
        });
        
        alert(`「${updatedLP.name || 'プラン'}」の設定を保存しました。メニューとの同期も完了しました。`);
    };

    const handleAddPlan = () => {
        const newId = `line_${Date.now()}`;
        const newSlug = `sp-custom-${Math.floor(Math.random() * 1000)}`;
        const newPlan = {
            id: newId,
            slug: newSlug,
            name: "新規オーディオプラン",
            parentCategoryId: "speaker_package",
            showInMenu: true,
            subType: "package",
            publishStatus: "draft",
            header: {
                badge: "NEW PACKAGE",
                mainTitle: "CUSTOM LINE",
                subTitle: "オリジナルオーディオプラン",
                description: "プランの特徴や魅力を伝える紹介文を入力してください。"
            },
            pricing: {
                specialPrice: "100000",
                fixedPrice: 30000,
                normalPriceText: "通常目安: 150,000円",
                savingsText: "約 50,000円 お得!",
                note: "※構成内容による価格変動などの注釈文を入力してください。",
                taxRate: 10
            },
            speakers: [],
            sections: [
                {
                    id: `sec_hero_${Date.now()}1`,
                    type: 'hero',
                    data: {
                        badge: "NEW PACKAGE",
                        title: "CUSTOM LINE",
                        subtitle: "オリジナルオーディオプラン",
                        desc: "プランの特徴や魅力を伝える紹介文を入力してください。",
                        image: "/images/Audio/Speaker/door-b.webp",
                        imageOpacity: 0.3,
                        useDarkTheme: true,
                        bgColor: ""
                    }
                },
                {
                    id: `sec_pricing_${Date.now()}2`,
                    type: 'pricing',
                    data: {
                        specialPrice: "100000",
                        fixedPrice: 30000,
                        normalPriceText: "通常目安: 150,000円",
                        savingsText: "約 50,000円 お得!",
                        note: "※構成内容による価格変動などの注釈文を入力してください。",
                        taxRate: 10
                    }
                },
                {
                    id: `sec_features_${Date.now()}3`,
                    type: 'features',
                    data: {
                        doorTuning: { title: "ドアチューニング詳細", desc: "施工内容を入力してください。", image: "/images/Audio/Speaker/door-b.webp" },
                        baffle: { title: "インナーバッフル詳細", desc: "施工内容を入力してください。", image: "/images/Audio/Speaker/baffle.webp" },
                        cable: { title: "スピーカーケーブル詳細", desc: "施工内容を入力してください。", image: "/images/Audio/Speaker/ang-cable.webp" }
                    }
                },
                {
                    id: `sec_upgrades_${Date.now()}4`,
                    type: 'upgrades',
                    data: {
                        title: "アップグレードオプション",
                        subtitle: "さらなる音質向上のためのメニュー",
                        courses: [
                            { name: "ベース → A コース", price: "+¥11,000", desc: "コース詳細説明文", pop: false },
                            { name: "ベース → S コース", price: "+¥33,000", desc: "高密度特別施工コース", pop: true }
                        ],
                        options: {
                            metalBaffleDiscount: "20% OFF",
                            tweeterMountPrice: "¥46,200〜",
                            metalBaffleImage: "/images/Audio/Speaker/metal.webp",
                            tweeterMountImage: "/images/Audio/Speaker/tw-mount.webp",
                            metalBaffleDesc: "高剛性メタルインナーバッフルによる制振効果。",
                            tweeterMountDesc: "ツィーターの角度調整と理想 of 定位を実現する埋込加工。"
                        }
                    }
                },
                {
                    id: `sec_speakers_${Date.now()}5`,
                    type: 'speakers',
                    data: {
                        title: "Speaker Lineup",
                        subtitle: "試聴可能スピーカーユニット一覧",
                        hideTitle: false,
                        hideSubtitle: false,
                        subtitleAlign: "right",
                        fixedPrice: 30000,
                        speakers: []
                    }
                }
            ]
        };
        const nextLPs = [...lps, newPlan as any];
        setAudioLPs(nextLPs);
        setSelectedId(newId);
        alert('新しいプランラインのタブを追加しました。情報を編集して保存してください。');
    };

    const handleCopyPlan = (planToCopy: any) => {
        if (!planToCopy) return;
        const newId = `line_${Date.now()}`;
        const newSlug = `${(planToCopy.slug || 'custom').replace(/-copy-\d+$/, '')}-copy-${Math.floor(Math.random() * 1000)}`;
        
        // Deep copy sections with fresh unique IDs
        const copiedSections = (planToCopy.sections || []).map((sec: any, idx: number) => ({
            ...sec,
            id: `sec_${sec.type || 'copy'}_${Date.now()}_${idx}`,
            data: sec.data ? JSON.parse(JSON.stringify(sec.data)) : {}
        }));

        const copiedPlan = {
            ...JSON.parse(JSON.stringify(planToCopy)),
            id: newId,
            slug: newSlug,
            name: `${planToCopy.name || 'コピーされたプラン'} (コピー)`,
            sections: copiedSections
        };

        const nextLPs = [...lps, copiedPlan];
        setAudioLPs(nextLPs);
        setSelectedId(newId);
        alert(`「${planToCopy.name || 'プラン'}」をコピーしました。情報の編集を行ってから保存してください。`);
    };

    const handleDeletePlan = (idToDelete: string, planName: string) => {
        if (lps.length <= 1) {
            alert('最低1つのプランラインは残す必要があります。');
            return;
        }
        if (confirm(`本当に「${planName}」を削除しますか？この操作は元に戻せません。`)) {
            const nextLPs = lps.filter(p => p.id !== idToDelete);
            setAudioLPs(nextLPs);
            
            // Clean up from plans menu
            const nextPlans = plans.map(cat => {
                if (cat.type !== 'audio') return cat;
                const nextItems = (cat.items || []).filter(item => item.id !== idToDelete);
                return { ...cat, items: nextItems };
            });
            
            nextPlans.forEach(cat => {
                const origCat = plans.find(c => c.id === cat.id);
                if (JSON.stringify(origCat?.items) !== JSON.stringify(cat.items)) {
                    updateCategory(cat.id, { items: cat.items });
                }
            });

            setSelectedId(nextLPs[0]?.id || '');
            alert('プランを削除し、メニューからも削除しました。');
        }
    };

    const handleMovePlan = (id: string, direction: 'left' | 'right') => {
        const targetLP = lps.find(p => p.id === id);
        if (!targetLP) return;
        
        const getLPType = (p: any) => {
            if (p.subType) return p.subType;
            if (p.showInMenu === false) return 'standalone';
            const name = p.name || '';
            if (name.includes('BMW') || name.includes('Mercedes') || name.includes('車種別')) {
                return 'vehicle';
            }
            return 'package';
        };

        const catId = targetLP.parentCategoryId || 'speaker_package';
        const targetType = getLPType(targetLP);
        const catLPs = lps.filter(lp => (lp.parentCategoryId || 'speaker_package') === catId && getLPType(lp) === targetType);
        const catIdx = catLPs.findIndex(p => p.id === id);
        if (catIdx === -1) return;
        
        let neighborLP;
        if (direction === 'left' && catIdx > 0) {
            neighborLP = catLPs[catIdx - 1];
        } else if (direction === 'right' && catIdx < catLPs.length - 1) {
            neighborLP = catLPs[catIdx + 1];
        }
        
        if (!neighborLP) return;
        
        // Find global indices
        const globalIdx1 = lps.findIndex(p => p.id === targetLP.id);
        const globalIdx2 = lps.findIndex(p => p.id === neighborLP.id);
        if (globalIdx1 === -1 || globalIdx2 === -1) return;
        
        const nextLPs = [...lps];
        nextLPs[globalIdx1] = neighborLP;
        nextLPs[globalIdx2] = targetLP;
        
        // Update audioLPs state (calls setAudioLPs context function to save)
        setAudioLPs(nextLPs);
        
        // Synchronize this order into plans context items
        let nextPlans = plans.map(cat => {
            if (cat.type !== 'audio') return cat;
            
            const catLPsList = nextLPs.filter(lp => (lp.parentCategoryId || 'speaker_package') === cat.id && lp.showInMenu !== false);
            const dynamicItems = (cat.items || []).filter((item: any) => catLPsList.some(lp => lp.id === item.id));
            const staticItems = (cat.items || []).filter((item: any) => !catLPsList.some(lp => lp.id === item.id));
            
            const sortedDynamicItems = [...dynamicItems].sort((a: any, b: any) => {
                const indexA = catLPsList.findIndex(lp => lp.id === a.id);
                const indexB = catLPsList.findIndex(lp => lp.id === b.id);
                return indexA - indexB;
            });
            
            return { ...cat, items: [...sortedDynamicItems, ...staticItems] };
        });
        
        // Save the updated categories in context (triggers useEffect autosave)
        nextPlans.forEach(cat => {
            const origCat = plans.find(c => c.id === cat.id);
            if (JSON.stringify(origCat?.items) !== JSON.stringify(cat.items)) {
                updateCategory(cat.id, { items: cat.items });
            }
        });
    };

    const renderSectionForm = (section: any, sIdx: number) => {
        switch (section.type) {
            case 'hero':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">バッジ表記 (Badge)</label>
                                <input 
                                    type="text"
                                    value={section.data.badge || ''}
                                    onChange={e => updateSectionData(sIdx, { badge: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">メインタイトル (Title)</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">サブタイトル (Subtitle)</label>
                                <input 
                                    type="text"
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">背景画像パス (Background Image)</label>
                                <input 
                                    type="text"
                                    value={section.data.image || ''}
                                    onChange={e => updateSectionData(sIdx, { image: cleanPathInput(e.target.value) })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-zinc-400">背景不透明度 (0.0〜1.0)</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={section.data.imageOpacity !== undefined ? section.data.imageOpacity : 0.3}
                                        onChange={e => updateSectionData(sIdx, { imageOpacity: parseFloat(e.target.value) })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-zinc-400">背景色 (Bg Color)</label>
                                    <input 
                                        type="text"
                                        value={section.data.bgColor || ''}
                                        onChange={e => updateSectionData(sIdx, { bgColor: e.target.value })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                        placeholder="例: #18181b"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={section.data.useDarkTheme !== false}
                                        onChange={e => updateSectionData(sIdx, { useDarkTheme: e.target.checked })}
                                        className="rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                                    />
                                    <span className="text-[10px] font-bold text-zinc-400">白文字ダークテーマを使用する</span>
                                </label>
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">リード文 (Description)</label>
                            <textarea 
                                value={section.data.desc || ''}
                                onChange={e => updateSectionData(sIdx, { desc: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                rows={3}
                            />
                        </div>
                    </div>
                );
            case 'pricing':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">特別価格 / パッケージ最低価格 (数字のみ)</label>
                            <input 
                                type="text"
                                value={section.data.specialPrice || ''}
                                onChange={e => updateSectionData(sIdx, { specialPrice: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="例: 100000"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">プラン定価 / 標準施工費 (数字のみ)</label>
                            <input 
                                type="text"
                                value={section.data.fixedPrice !== undefined ? section.data.fixedPrice : ''}
                                onChange={e => updateSectionData(sIdx, { fixedPrice: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="例: 30000"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">消費税率 (%)</label>
                            <input 
                                type="text"
                                value={section.data.taxRate !== undefined ? section.data.taxRate : '10'}
                                onChange={e => updateSectionData(sIdx, { taxRate: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">通常参考価格テキスト</label>
                            <input 
                                type="text"
                                value={section.data.normalPriceText || ''}
                                onChange={e => updateSectionData(sIdx, { normalPriceText: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="通常目安: 150,000円"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">お得額表記テキスト</label>
                            <input 
                                type="text"
                                value={section.data.savingsText || ''}
                                onChange={e => updateSectionData(sIdx, { savingsText: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="約 50,000円 お得!"
                            />
                        </div>
                        <div className="md:col-span-3 space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">価格注釈文 (Note)</label>
                            <textarea 
                                value={section.data.note || ''}
                                onChange={e => updateSectionData(sIdx, { note: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                rows={2}
                            />
                        </div>
                    </div>
                );
            case 'features':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">セクションタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    placeholder="音質を決定づける「3つの重要施工」を標準装備"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">セクション説明文 (description)</label>
                                <textarea 
                                    value={section.data.description || ''}
                                    onChange={e => updateSectionData(sIdx, { description: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    rows={2}
                                />
                            </div>
                        </div>
                        {['doorTuning', 'baffle', 'cable'].map((key) => {
                            const feat = section.data[key] || {};
                            return (
                                <div key={key} className="bg-black/20 p-4 border border-zinc-800/80 rounded-xl space-y-4">
                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
                                        {key === 'doorTuning' ? '① ドアチューニング' : key === 'baffle' ? '② インナーバッフル' : '③ 配線ケーブル'}
                                    </span>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">施工タイトル</label>
                                            <input 
                                                type="text"
                                                value={feat.title || ''}
                                                onChange={e => {
                                                    const nextFeat = { ...feat, title: e.target.value };
                                                    updateSectionData(sIdx, { [key]: nextFeat });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">施工説明</label>
                                            <input 
                                                type="text"
                                                value={feat.desc || ''}
                                                onChange={e => {
                                                    const nextFeat = { ...feat, desc: e.target.value };
                                                    updateSectionData(sIdx, { [key]: nextFeat });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">施工イメージ画像パス</label>
                                            <input 
                                                type="text"
                                                value={feat.image || ''}
                                                onChange={e => {
                                                    const nextFeat = { ...feat, image: cleanPathInput(e.target.value) };
                                                    updateSectionData(sIdx, { [key]: nextFeat });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            case 'upgrades':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">セクションタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    placeholder="Upgrade Options"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">サブタイトル / リード文</label>
                                <input 
                                    type="text"
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>

                        {/* Upgrade Courses List */}
                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">施工アップグレードコース一覧</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const courses = [...(section.data.courses || [])];
                                        courses.push({ name: '新規コース', price: '+¥11,000', desc: '施工内容の説明文を入力', pop: false });
                                        updateSectionData(sIdx, { courses });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> コースを追加
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(section.data.courses || []).map((course: any, cIdx: number) => (
                                    <div key={cIdx} className="bg-black/40 border border-zinc-800 p-4 rounded-xl space-y-3 relative">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const courses = (section.data.courses || []).filter((_: any, idx: number) => idx !== cIdx);
                                                updateSectionData(sIdx, { courses });
                                            }}
                                            className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="flex items-center justify-between gap-4 pr-6">
                                            <input 
                                                type="text"
                                                value={course.name}
                                                onChange={e => {
                                                    const courses = [...(section.data.courses || [])];
                                                    courses[cIdx] = { ...course, name: e.target.value };
                                                    updateSectionData(sIdx, { courses });
                                                }}
                                                className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-black"
                                                placeholder="コース名"
                                            />
                                            <input 
                                                type="text"
                                                value={course.price}
                                                onChange={e => {
                                                    const courses = [...(section.data.courses || [])];
                                                    courses[cIdx] = { ...course, price: e.target.value };
                                                    updateSectionData(sIdx, { courses });
                                                }}
                                                className="w-1/3 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-blue-400 text-xs font-black text-right"
                                                placeholder="料金"
                                            />
                                        </div>
                                        <input 
                                            type="text"
                                            value={course.desc}
                                            onChange={e => {
                                                const courses = [...(section.data.courses || [])];
                                                courses[cIdx] = { ...course, desc: e.target.value };
                                                updateSectionData(sIdx, { courses });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-400 text-xs font-bold"
                                            placeholder="詳細説明"
                                        />
                                        <div className="flex items-center justify-end">
                                            <label className="flex items-center gap-1.5 cursor-pointer">
                                                <input 
                                                    type="checkbox"
                                                    checked={!!course.pop}
                                                    onChange={e => {
                                                        const courses = [...(section.data.courses || [])];
                                                        courses[cIdx] = { ...course, pop: e.target.checked };
                                                        updateSectionData(sIdx, { courses });
                                                    }}
                                                    className="rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                                                />
                                                <span className="text-[10px] font-black text-zinc-500">おすすめバッジを付与</span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Options Object */}
                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <label className="block text-[10px] font-black text-zinc-400">ハードウェア追加オプション（メタルバッフル・ツィーター埋込）</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-black/30 p-4 rounded-xl border border-zinc-800/60 space-y-3">
                                    <span className="text-[10px] font-black text-blue-400">【メタルバッフル】</span>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">特別価格/割引表記</label>
                                        <input 
                                            type="text"
                                            value={section.data.options?.metalBaffleDiscount || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, metalBaffleDiscount: e.target.value };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                            placeholder="例: 20% OFF または +¥13,200"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">画像パス</label>
                                        <input 
                                            type="text"
                                            value={section.data.options?.metalBaffleImage || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, metalBaffleImage: cleanPathInput(e.target.value) };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">詳細説明文</label>
                                        <textarea 
                                            value={section.data.options?.metalBaffleDesc || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, metalBaffleDesc: e.target.value };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                            rows={2}
                                        />
                                    </div>
                                </div>

                                <div className="bg-black/30 p-4 rounded-xl border border-zinc-800/60 space-y-3">
                                    <span className="text-[10px] font-black text-blue-400">【ツィーターピラー埋め込み】</span>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">参考価格表記</label>
                                        <input 
                                            type="text"
                                            value={section.data.options?.tweeterMountPrice || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, tweeterMountPrice: e.target.value };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                            placeholder="例: ¥46,200〜"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">画像パス</label>
                                        <input 
                                            type="text"
                                            value={section.data.options?.tweeterMountImage || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, tweeterMountImage: cleanPathInput(e.target.value) };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-zinc-500">詳細説明文</label>
                                        <textarea 
                                            value={section.data.options?.tweeterMountDesc || ''}
                                            onChange={e => {
                                                const options = { ...section.data.options, tweeterMountDesc: e.target.value };
                                                updateSectionData(sIdx, { options });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'speakers': {
                const sectionFixedPrice = parsePrice(section.data.fixedPrice !== undefined ? section.data.fixedPrice : data.pricing?.fixedPrice || 0);
                const sectionTaxRate = parsePrice(section.data.taxRate !== undefined ? section.data.taxRate : data.pricing?.taxRate || 10);
                const speakersList = section.data.speakers || [];

                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">セクションタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">セクションサブタイトル</label>
                                <textarea 
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    rows={2}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">一律料金カード タイトル (任意)</label>
                                <input 
                                    type="text"
                                    value={section.data.summaryPriceTitle || ''}
                                    onChange={e => updateSectionData(sIdx, { summaryPriceTitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    placeholder="例: プランB 施工パッケージ"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">一律料金テキスト (任意)</label>
                                <input 
                                    type="text"
                                    value={section.data.summaryPriceText || ''}
                                    onChange={e => updateSectionData(sIdx, { summaryPriceText: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-blue-400 text-xs font-bold"
                                    placeholder="例: 69300 または ¥69,300"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">このセクション専用施工費 (空欄で全体設定を使用)</label>
                                <input 
                                    type="text"
                                    value={section.data.fixedPrice !== undefined ? section.data.fixedPrice : ''}
                                    onChange={e => updateSectionData(sIdx, { fixedPrice: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    placeholder="例: 30000"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">セクション共通画像パス (空欄で個別画像)</label>
                                <input 
                                    type="text"
                                    value={section.data.sectionImage || ''}
                                    onChange={e => updateSectionData(sIdx, { sectionImage: cleanPathInput(e.target.value) })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    placeholder="例: /images/Audio/... または 空欄"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer bg-black/40 border border-zinc-800 px-3 py-1.5 rounded-lg">
                                <input 
                                    type="checkbox"
                                    checked={!!section.data.hideCardPrice}
                                    onChange={e => updateSectionData(sIdx, { hideCardPrice: e.target.checked })}
                                    className="rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                                />
                                <span className="text-[10px] font-bold text-zinc-300">カード内の金額を隠す (非表示)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-black/40 border border-zinc-800 px-3 py-1.5 rounded-lg">
                                <input 
                                    type="checkbox"
                                    checked={!!section.data.hideCardBadge}
                                    onChange={e => updateSectionData(sIdx, { hideCardBadge: e.target.checked })}
                                    className="rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                                />
                                <span className="text-[10px] font-bold text-zinc-300">カード内のバッジを隠す (非表示)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={!!section.data.hideTitle}
                                    onChange={e => updateSectionData(sIdx, { hideTitle: e.target.checked })}
                                    className="rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                                />
                                <span className="text-[10px] font-bold text-zinc-400">タイトルを非表示にする</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={!!section.data.hideSubtitle}
                                    onChange={e => updateSectionData(sIdx, { hideSubtitle: e.target.checked })}
                                    className="rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-0"
                                />
                                <span className="text-[10px] font-bold text-zinc-400">サブタイトルを非表示にする</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-400">サブタイトル配置:</span>
                                <select 
                                    value={section.data.subtitleAlign || 'right'}
                                    onChange={e => updateSectionData(sIdx, { subtitleAlign: e.target.value })}
                                    className="bg-black border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold outline-none"
                                >
                                    <option value="right">右寄せ (Right)</option>
                                    <option value="center">中央寄せ (Center)</option>
                                    <option value="left">左寄せ (Left)</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-400">サブタイトルサイズ:</span>
                                <input 
                                    type="number"
                                    value={section.data.subtitleFontSize || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitleFontSize: e.target.value ? parseInt(e.target.value) : '' })}
                                    className="w-16 bg-black border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold outline-none"
                                    placeholder="15"
                                />
                                <span className="text-[9px] text-zinc-600">px</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-400">表示レイアウト:</span>
                                <select 
                                    value={section.data.displayMode || 'standard'}
                                    onChange={e => updateSectionData(sIdx, { displayMode: e.target.value })}
                                    className="bg-black border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold outline-none"
                                >
                                    <option value="standard">標準 (画像・スペック・価格)</option>
                                    <option value="image_text">画像とテキストのみ (スペック非表示)</option>
                                    <option value="no_image">画像非表示 (スペック・テキスト・価格)</option>
                                    <option value="text_only">テキストのみ (画像・スペック非表示)</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-400">セクション幅:</span>
                                <select 
                                    value={section.data.sectionWidth || 'full'}
                                    onChange={e => updateSectionData(sIdx, { sectionWidth: e.target.value })}
                                    className="bg-black border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold outline-none"
                                >
                                    <option value="full">全幅 (100%)</option>
                                    <option value="half">1/2幅 (50%)</option>
                                    <option value="third">1/3幅 (33%)</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-400">表示列数 (PC):</span>
                                <select 
                                    value={section.data.columns || 3}
                                    onChange={e => updateSectionData(sIdx, { columns: parseInt(e.target.value) })}
                                    className="bg-black border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold outline-none"
                                >
                                    <option value={1}>1列 (1 Column)</option>
                                    <option value={2}>2列 (2 Columns)</option>
                                    <option value={3}>3列 (3 Columns)</option>
                                    <option value={4}>4列 (4 Columns)</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-400">サブタイトル色:</span>
                                <input 
                                    type="text"
                                    value={section.data.subtitleColor || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitleColor: e.target.value })}
                                    className="w-20 bg-black border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold outline-none"
                                    placeholder="例: #3B82F6"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-400">下部余白:</span>
                                <select 
                                    value={section.data.borderSpacing || 'standard'}
                                    onChange={e => updateSectionData(sIdx, { borderSpacing: e.target.value })}
                                    className="bg-black border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold outline-none"
                                >
                                    <option value="standard">標準</option>
                                    <option value="narrow">狭め</option>
                                    <option value="wide">広め</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-400">書体:</span>
                                <select 
                                    value={section.data.subtitleFont || 'sans'}
                                    onChange={e => updateSectionData(sIdx, { subtitleFont: e.target.value })}
                                    className="bg-black border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold outline-none"
                                >
                                    <option value="sans">標準ゴシック</option>
                                    <option value="serif">明朝体 (Serif)</option>
                                    <option value="mono">等幅 (Mono)</option>
                                    <option value="montserrat">Montserrat (欧文)</option>
                                    <option value="oswald">Oswald (欧文)</option>
                                </select>
                            </div>
                        </div>

                        {/* Package Summary Toggle & Config */}
                        <div className="bg-black/20 p-5 border border-zinc-800/80 rounded-2xl space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">セクション内パッケージサマリー表示</span>
                                    <button 
                                        type="button"
                                        onClick={() => updateSectionData(sIdx, { showPackageSummary: !section.data.showPackageSummary })}
                                        className={`px-4 py-1.5 rounded-xl font-black text-[10px] transition-all ${
                                            section.data.showPackageSummary ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-800 text-zinc-500'
                                        }`}
                                    >
                                        {section.data.showPackageSummary ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                                {section.data.showPackageSummary && (
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            const packageSummaryItems = section.data.packageSummaryItems ? [...section.data.packageSummaryItems] : [];
                                            packageSummaryItems.push({ title: '新しい項目', desc: '', value: '' });
                                            updateSectionData(sIdx, { packageSummaryItems });
                                        }}
                                        className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 text-white px-2.5 py-1 rounded text-[8px] font-black hover:bg-zinc-800"
                                    >
                                        <Plus className="w-3 h-3 text-blue-400" /> 項目を追加
                                    </button>
                                )}
                            </div>

                            {section.data.showPackageSummary && (
                                <div className="space-y-4 pt-2 border-t border-zinc-800/40">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">サマリータイトル</label>
                                            <input 
                                                type="text"
                                                value={section.data.packageSummaryTitle || ''}
                                                onChange={e => updateSectionData(sIdx, { packageSummaryTitle: e.target.value })}
                                                placeholder="例: このプランに含まれる内容"
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-white text-[10px] font-bold"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">サマリーサブタイトル</label>
                                            <input 
                                                type="text"
                                                value={section.data.packageSummarySubtitle || ''}
                                                onChange={e => updateSectionData(sIdx, { packageSummarySubtitle: e.target.value })}
                                                placeholder="例: 下記の内容が含まれたパッケージとなっています。"
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-white text-[10px] font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2">
                                        {(section.data.packageSummaryItems || []).map((item: any, pIdx: number) => (
                                            <div key={pIdx} className="flex gap-2 items-center bg-black/40 border border-zinc-800/50 p-2.5 rounded-xl">
                                                <input 
                                                    type="text"
                                                    value={item.title || ''}
                                                    onChange={e => {
                                                        const packageSummaryItems = [...section.data.packageSummaryItems];
                                                        packageSummaryItems[pIdx] = { ...item, title: e.target.value };
                                                        updateSectionData(sIdx, { packageSummaryItems });
                                                    }}
                                                    placeholder="項目名 (例: スピーカー本体)"
                                                    className="w-1/3 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-white text-[10px] font-bold"
                                                />
                                                <input 
                                                    type="text"
                                                    value={item.desc || ''}
                                                    onChange={e => {
                                                        const packageSummaryItems = [...section.data.packageSummaryItems];
                                                        packageSummaryItems[pIdx] = { ...item, desc: e.target.value };
                                                        updateSectionData(sIdx, { packageSummaryItems });
                                                    }}
                                                    placeholder="説明 (例: 軽防振施工など)"
                                                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-white text-[10px] font-bold"
                                                />
                                                <input 
                                                    type="text"
                                                    value={item.value || ''}
                                                    onChange={e => {
                                                        const packageSummaryItems = [...section.data.packageSummaryItems];
                                                        packageSummaryItems[pIdx] = { ...item, value: e.target.value };
                                                        updateSectionData(sIdx, { packageSummaryItems });
                                                    }}
                                                    placeholder="右側ラベル (例: ¥22,000)"
                                                    className="w-32 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-white text-[10px] font-bold text-right"
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        const packageSummaryItems = section.data.packageSummaryItems.filter((_: any, i: number) => i !== pIdx);
                                                        updateSectionData(sIdx, { packageSummaryItems });
                                                    }}
                                                    className="p-1 text-zinc-600 hover:text-red-400"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">セクション説明文 (Description - 改行対応の複数行入力)</label>
                            <textarea 
                                value={section.data.content || ''}
                                onChange={e => updateSectionData(sIdx, { content: e.target.value })}
                                rows={3}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="スピーカーセクションの導入文や注釈などを入力してください（空欄時は非表示）"
                            />
                        </div>

                        {/* Speakers lineup list */}
                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">スピーカーユニット一覧</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const newSpk = {
                                            id: `spk_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,
                                            brand: 'メーカー名',
                                            brandLogo: '',
                                            name: '製品名',
                                            image: '/images/Top/speaker.webp',
                                            mountingHoleSize: '140mm',
                                            depthSize: '50mm',
                                            hasGrille: '付属',
                                            hasTweeterMount: '付属',
                                            standalonePrice: '¥30,000',
                                            fixedPriceOverride: '',
                                            remarks: '',
                                            youtubeUrl: ''
                                        };
                                        const nextSpks = [...speakersList, newSpk];
                                        updateSectionData(sIdx, { speakers: nextSpks });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> スピーカーを追加
                                </button>
                            </div>

                            {copiedSpeaker ? (
                                <div className="flex justify-end mb-4">
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            const newSpk = Object.assign({}, copiedSpeaker || {}, {
                                                id: "spk_" + Date.now() + "_" + Math.random().toString(36).substring(2,6)
                                            });
                                            const nextSpks = speakersList.concat([newSpk]);
                                            updateSectionData(sIdx, { speakers: nextSpks });
                                        }}
                                        className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                    >
                                        <Plus className="w-3.5 h-3.5 text-green-400" /> Paste Speaker
                                    </button>
                                </div>
                            ) : null}

                            <div className="space-y-6">
                                {speakersList.map((spk: any, idx: number) => {
                                    const appliedPrice = calculateAppliedPriceForSection(spk, sectionFixedPrice);
                                    const taxExcludedPrice = Math.round(appliedPrice / (1 + sectionTaxRate / 100));

                                    return (
                                        <div key={spk.id || idx} className="bg-black/40 border border-zinc-800/80 rounded-xl p-4 md:p-6 space-y-4 relative group">
                                            {/* Reorder and Delete controls */}
                                            <div className="flex justify-between items-center pb-2 border-b border-zinc-800/40">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs font-black text-blue-400">スピーカー #{idx + 1}</span>
                                                    <button 
                                                        type="button"
                                                        disabled={idx === 0}
                                                        onClick={() => {
                                                            const next = [...speakersList];
                                                            const temp = next[idx];
                                                            next[idx] = next[idx - 1];
                                                            next[idx - 1] = temp;
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                                                    >
                                                        <ChevronUp className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        disabled={idx === speakersList.length - 1}
                                                        onClick={() => {
                                                            const next = [...speakersList];
                                                            const temp = next[idx];
                                                            next[idx] = next[idx + 1];
                                                            next[idx + 1] = temp;
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                                                    >
                                                        <ChevronDown className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            setCopiedSpeaker(spk);
                                                        }}
                                                        className="text-zinc-500 hover:text-blue-400 p-1 rounded hover:bg-blue-500/10 transition-colors"
                                                        title="Copy Speaker"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            const next = speakersList.filter((_: any, i: number) => i !== idx);
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="text-zinc-600 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">メーカー (Brand)</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.brand || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, brand: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">モデル名 (Name)</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.name || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, name: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">ブランドロゴ画像パス (Logo)</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.brandLogo || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, brandLogo: cleanPathInput(e.target.value) };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                        placeholder="未指定時はテキスト表示"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">ロゴ背景色 (Logo BG)</label>
                                                    <select
                                                        value={spk.logoBg || 'dark'}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, logoBg: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold outline-none"
                                                    >
                                                        <option value="dark">ダーク (黒)</option>
                                                        <option value="light">ライト (白)</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">スピーカー画像パス (Image)</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.image || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, image: cleanPathInput(e.target.value) };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">本体価格 (単品価格 / 税別など)</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.standalonePrice || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, standalonePrice: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">取付穴径</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.mountingHoleSize || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, mountingHoleSize: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">取付奥行</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.depthSize || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, depthSize: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">グリル</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.hasGrille || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, hasGrille: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">TWマウント</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.hasTweeterMount || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, hasTweeterMount: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">施工費上書き (空欄で共通費)</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.fixedPriceOverride || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, fixedPriceOverride: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[9px] font-bold text-zinc-500">YouTube試聴音源URL</label>
                                                    <input 
                                                        type="text"
                                                        value={spk.youtubeUrl || ''}
                                                        onChange={e => {
                                                            const next = [...speakersList];
                                                            next[idx] = { ...spk, youtubeUrl: e.target.value };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>

                                            {/* Textarea for Remarks */}
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">備考欄 (Remarks - 改行対応の複数行エディタ)</label>
                                                <textarea 
                                                    value={spk.remarks || ''}
                                                    onChange={e => {
                                                        const next = [...speakersList];
                                                        next[idx] = { ...spk, remarks: e.target.value };
                                                        updateSectionData(sIdx, { speakers: next });
                                                    }}
                                                    rows={3}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                                    placeholder="スピーカーの特徴や説明文を入力してください（改行を反映させることができます）"
                                                />
                                            </div>

                                            {/* Option Item Settings */}
                                            <div className="space-y-3 pt-3 border-t border-zinc-800/40">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-bold text-zinc-500">カード内にオプション品を表示する</span>
                                                        <button 
                                                            type="button"
                                                            onClick={() => {
                                                                const next = [...speakersList];
                                                                next[idx] = { ...spk, showOption: !spk.showOption };
                                                                updateSectionData(sIdx, { speakers: next });
                                                            }}
                                                            className={`px-3 py-1 rounded text-[8px] font-bold transition-all ${
                                                                spk.showOption ? 'bg-blue-600 text-white' : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
                                                            }`}
                                                        >
                                                            {spk.showOption ? 'ON' : 'OFF'}
                                                        </button>
                                                    </div>
                                                </div>

                                                {spk.showOption && (() => {
                                                    const currentOptions = Array.isArray(spk.options) ? spk.options : (spk.optionName || spk.optionText || spk.optionPrice || spk.optionImage ? [{
                                                        image: spk.optionImage || '',
                                                        name: spk.optionName || '',
                                                        text: spk.optionText || '',
                                                        price: spk.optionPrice || ''
                                                    }] : []);

                                                    return (
                                                        <div className="space-y-4">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-[9px] font-bold text-zinc-500">オプション品リスト (最大4個)</span>
                                                                {currentOptions.length < 4 && (
                                                                    <button 
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const next = [...speakersList];
                                                                            const options = [...currentOptions, { image: '', name: '', text: '', price: '' }];
                                                                            next[idx] = { ...spk, options };
                                                                            updateSectionData(sIdx, { speakers: next });
                                                                        }}
                                                                        className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white rounded text-[8px] font-bold transition-colors"
                                                                    >
                                                                        オプションを追加
                                                                    </button>
                                                                )}
                                                            </div>

                                                            <div className="space-y-3">
                                                                {currentOptions.map((opt: any, optIdx: number) => (
                                                                    <div key={optIdx} className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/60 relative space-y-3">
                                                                        <div className="flex justify-between items-center border-b border-zinc-800/40 pb-1.5">
                                                                            <span className="text-[8px] font-bold text-blue-400">オプション #{optIdx + 1}</span>
                                                                            <button 
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    const next = [...speakersList];
                                                                                    const options = currentOptions.filter((_: any, i: number) => i !== optIdx);
                                                                                    next[idx] = { ...spk, options };
                                                                                    updateSectionData(sIdx, { speakers: next });
                                                                                }}
                                                                                className="text-zinc-600 hover:text-red-400 p-0.5"
                                                                                title="オプションを削除"
                                                                            >
                                                                                <Trash2 className="w-3.5 h-3.5" />
                                                                            </button>
                                                                        </div>

                                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                            <div className="space-y-1.5">
                                                                                <label className="block text-[8px] font-bold text-zinc-500">オプション画像パス</label>
                                                                                <input 
                                                                                    type="text"
                                                                                    value={opt.image || ''}
                                                                                    onChange={e => {
                                                                                        const next = [...speakersList];
                                                                                        const options = [...currentOptions];
                                                                                        options[optIdx] = { ...opt, image: cleanPathInput(e.target.value) };
                                                                                        next[idx] = { ...spk, options };
                                                                                        updateSectionData(sIdx, { speakers: next });
                                                                                    }}
                                                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold"
                                                                                    placeholder="/images/..."
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1.5">
                                                                                <label className="block text-[8px] font-bold text-zinc-500">商品名</label>
                                                                                <input 
                                                                                    type="text"
                                                                                    value={opt.name || ''}
                                                                                    onChange={e => {
                                                                                        const next = [...speakersList];
                                                                                        const options = [...currentOptions];
                                                                                        options[optIdx] = { ...opt, name: e.target.value };
                                                                                        next[idx] = { ...spk, options };
                                                                                        updateSectionData(sIdx, { speakers: next });
                                                                                    }}
                                                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold"
                                                                                    placeholder="例: アルミインナーバッフル"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1.5">
                                                                                <label className="block text-[8px] font-bold text-zinc-500">オプション価格 (税込)</label>
                                                                                <input 
                                                                                    type="text"
                                                                                    value={opt.price || ''}
                                                                                    onChange={e => {
                                                                                        const next = [...speakersList];
                                                                                        const options = [...currentOptions];
                                                                                        options[optIdx] = { ...opt, price: e.target.value };
                                                                                        next[idx] = { ...spk, options };
                                                                                        updateSectionData(sIdx, { speakers: next });
                                                                                    }}
                                                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold"
                                                                                    placeholder="例: ¥11,000"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="space-y-1.5">
                                                                            <label className="block text-[8px] font-bold text-zinc-500">オプションテキスト (改行対応)</label>
                                                                            <textarea 
                                                                                value={opt.text || ''}
                                                                                onChange={e => {
                                                                                    const next = [...speakersList];
                                                                                    const options = [...currentOptions];
                                                                                    options[optIdx] = { ...opt, text: e.target.value };
                                                                                    next[idx] = { ...spk, options };
                                                                                    updateSectionData(sIdx, { speakers: next });
                                                                                }}
                                                                                rows={2}
                                                                                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold focus:border-blue-500 outline-none"
                                                                                placeholder="説明文を入力（改行可能、空欄でも可）"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                            </div>

                                            {/* Card Specific Package Summary */}
                                            <div className="space-y-3 pt-3 border-t border-zinc-800/40">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-bold text-zinc-500">カード内に専用パッケージ内容を表示する</span>
                                                        <button 
                                                            type="button"
                                                            onClick={() => {
                                                                const next = [...speakersList];
                                                                next[idx] = { ...spk, showCardSummary: !spk.showCardSummary };
                                                                updateSectionData(sIdx, { speakers: next });
                                                            }}
                                                            className={`px-3 py-1 rounded text-[8px] font-bold transition-all ${
                                                                spk.showCardSummary ? 'bg-blue-600 text-white' : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
                                                            }`}
                                                        >
                                                            {spk.showCardSummary ? 'ON' : 'OFF'}
                                                        </button>
                                                    </div>
                                                    {spk.showCardSummary && (
                                                        <button 
                                                            type="button"
                                                            onClick={() => {
                                                                const next = [...speakersList];
                                                                const cardSummaryItems = spk.cardSummaryItems ? [...spk.cardSummaryItems] : [];
                                                                cardSummaryItems.push({ title: '新しい項目', desc: '', value: '' });
                                                                next[idx] = { ...spk, cardSummaryItems };
                                                                updateSectionData(sIdx, { speakers: next });
                                                            }}
                                                            className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 text-white px-2 py-0.5 rounded text-[8px] font-bold hover:bg-zinc-800"
                                                        >
                                                            <Plus className="w-3 h-3 text-blue-400" /> 項目を追加
                                                        </button>
                                                    )}
                                                </div>

                                                {spk.showCardSummary && (
                                                    <div className="space-y-4 pl-2 border-l border-zinc-800">
                                                        <div className="space-y-1.5 max-w-sm pb-2 border-b border-zinc-900/60">
                                                            <label className="block text-[9px] font-bold text-zinc-500">見出しテキスト (デフォルト: パッケージ内容)</label>
                                                            <input 
                                                                type="text"
                                                                value={spk.cardSummaryTitle || ''}
                                                                onChange={e => {
                                                                    const next = [...speakersList];
                                                                    next[idx] = { ...spk, cardSummaryTitle: e.target.value };
                                                                    updateSectionData(sIdx, { speakers: next });
                                                                }}
                                                                placeholder="パッケージ内容"
                                                                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-white text-[10px] font-bold focus:border-blue-500/50 outline-none"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            {(spk.cardSummaryItems || []).map((cItem: any, cIdx: number) => (
                                                                <div key={cIdx} className="flex gap-2 items-center">
                                                                    <input 
                                                                        type="text"
                                                                        value={cItem.title || ''}
                                                                        onChange={e => {
                                                                            const next = [...speakersList];
                                                                            const cardSummaryItems = [...spk.cardSummaryItems];
                                                                            cardSummaryItems[cIdx] = { ...cItem, title: e.target.value };
                                                                            next[idx] = { ...spk, cardSummaryItems };
                                                                            updateSectionData(sIdx, { speakers: next });
                                                                        }}
                                                                        placeholder="項目名 (例: スピーカー本体)"
                                                                        className="w-1/3 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-white text-[9px] font-bold focus:border-blue-500 outline-none"
                                                                    />
                                                                    <input 
                                                                        type="text"
                                                                        value={cItem.desc || ''}
                                                                        onChange={e => {
                                                                            const next = [...speakersList];
                                                                            const cardSummaryItems = [...spk.cardSummaryItems];
                                                                            cardSummaryItems[cIdx] = { ...cItem, desc: e.target.value };
                                                                            next[idx] = { ...spk, cardSummaryItems };
                                                                            updateSectionData(sIdx, { speakers: next });
                                                                        }}
                                                                        placeholder="補足 (例: UD-K124付属)"
                                                                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-white text-[9px] font-bold focus:border-blue-500 outline-none"
                                                                    />
                                                                    <input 
                                                                        type="text"
                                                                        value={cItem.value || ''}
                                                                        onChange={e => {
                                                                            const next = [...speakersList];
                                                                            const cardSummaryItems = [...spk.cardSummaryItems];
                                                                            cardSummaryItems[cIdx] = { ...cItem, value: e.target.value };
                                                                            next[idx] = { ...spk, cardSummaryItems };
                                                                            updateSectionData(sIdx, { speakers: next });
                                                                        }}
                                                                        placeholder="値"
                                                                        className="w-20 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-white text-[9px] font-bold text-right focus:border-blue-500 outline-none"
                                                                    />
                                                                    <button 
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const next = [...speakersList];
                                                                            const cardSummaryItems = spk.cardSummaryItems.filter((_: any, i: number) => i !== cIdx);
                                                                            next[idx] = { ...spk, cardSummaryItems };
                                                                            updateSectionData(sIdx, { speakers: next });
                                                                        }}
                                                                        className="p-1 text-zinc-600 hover:text-red-400"
                                                                    >
                                                                        <Trash2 className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Custom Prices List */}
                                            <div className="space-y-3 pt-3 border-t border-zinc-800/40">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[9px] font-bold text-zinc-500">複数価格設定 (設定すると通常の合計金額の代わりに表示されます)</span>
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            const next = [...speakersList];
                                                            const prices = spk.prices ? [...spk.prices] : [];
                                                            prices.push({ label: '', price: '', isSetDiscount: false });
                                                            next[idx] = { ...spk, prices };
                                                            updateSectionData(sIdx, { speakers: next });
                                                        }}
                                                        className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-white rounded text-[8px] font-bold hover:bg-zinc-800 transition-colors"
                                                    >
                                                        価格を追加
                                                    </button>
                                                </div>
                                                {(spk.prices || []).map((pItem: any, pIdx: number) => {
                                                    let initialCourse = pItem.courseName;
                                                    let displayLabel = pItem.label || '';
                                                    if (initialCourse === undefined && displayLabel) {
                                                        const match = displayLabel.match(/[（\(]([^）\)]+)[）\)]/);
                                                        if (match && match[1]) {
                                                            initialCourse = match[1].trim();
                                                        }
                                                    }

                                                    const currentType = (pItem.isAdd || pItem.priceType === 'add')
                                                        ? 'add' 
                                                        : (pItem.isSetDiscount || pItem.priceType === 'set' ? 'set' : 'normal');

                                                    return (
                                                        <div key={pIdx} className="flex gap-2 items-center">
                                                            <input 
                                                                type="text"
                                                                value={pItem.courseName !== undefined ? pItem.courseName : (initialCourse || '')}
                                                                onChange={e => {
                                                                    const next = [...speakersList];
                                                                    const prices = [...spk.prices];
                                                                    prices[pIdx] = { ...pItem, courseName: e.target.value };
                                                                    next[idx] = { ...spk, prices };
                                                                    updateSectionData(sIdx, { speakers: next });
                                                                }}
                                                                placeholder="コース名 (例: デッドニング＆遮音)"
                                                                className="w-44 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-blue-400 text-[10px] font-bold focus:border-blue-500 outline-none"
                                                                title="コース名・グループ名"
                                                            />
                                                            <input 
                                                                type="text"
                                                                value={pItem.label || ''}
                                                                onChange={e => {
                                                                    const next = [...speakersList];
                                                                    const prices = [...spk.prices];
                                                                    prices[pIdx] = { ...pItem, label: e.target.value };
                                                                    next[idx] = { ...spk, prices };
                                                                    updateSectionData(sIdx, { speakers: next });
                                                                }}
                                                                placeholder="車種・ラベル (例: 軽自動車・コンパクトカー...)"
                                                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-white text-[10px] font-bold focus:border-blue-500 outline-none"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const next = [...speakersList];
                                                                    const prices = [...spk.prices];
                                                                    let nextItem = { ...pItem };
                                                                    if (currentType === 'normal') {
                                                                        nextItem.isSetDiscount = true;
                                                                        nextItem.isAdd = false;
                                                                        nextItem.priceType = 'set';
                                                                    } else if (currentType === 'set') {
                                                                        nextItem.isSetDiscount = false;
                                                                        nextItem.isAdd = true;
                                                                        nextItem.priceType = 'add';
                                                                    } else {
                                                                        nextItem.isSetDiscount = false;
                                                                        nextItem.isAdd = false;
                                                                        nextItem.priceType = 'normal';
                                                                    }
                                                                    prices[pIdx] = nextItem;
                                                                    next[idx] = { ...spk, prices };
                                                                    updateSectionData(sIdx, { speakers: next });
                                                                }}
                                                                className={`px-2.5 py-1.5 rounded text-[9px] font-bold border transition-colors shrink-0 ${
                                                                    currentType === 'set'
                                                                        ? 'bg-red-950/80 border-red-600 text-red-400 font-black' 
                                                                        : currentType === 'add'
                                                                            ? 'bg-emerald-950/80 border-emerald-600 text-emerald-400 font-black'
                                                                            : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800'
                                                                }`}
                                                                title="価格タイプの切り替え (通常 ⇄ セット割り ⇄ 追加)"
                                                            >
                                                                {currentType === 'set' ? 'セット割り' : currentType === 'add' ? '追加' : '通常'}
                                                            </button>
                                                            <input 
                                                                type="text"
                                                                value={pItem.price || ''}
                                                                onChange={e => {
                                                                    const next = [...speakersList];
                                                                    const prices = [...spk.prices];
                                                                    prices[pIdx] = { ...pItem, price: e.target.value };
                                                                    next[idx] = { ...spk, prices };
                                                                    updateSectionData(sIdx, { speakers: next });
                                                                }}
                                                                placeholder="価格 (例: 99550)"
                                                                className={`w-28 bg-zinc-900 border rounded px-2.5 py-1.5 text-[10px] font-bold text-right outline-none ${
                                                                    currentType === 'set' 
                                                                        ? 'text-red-400 border-red-900/60 focus:border-red-500' 
                                                                        : currentType === 'add'
                                                                            ? 'text-emerald-400 border-emerald-900/60 focus:border-emerald-500'
                                                                            : 'text-white border-zinc-800 focus:border-blue-500'
                                                                }`}
                                                            />
                                                            <button 
                                                                type="button"
                                                                onClick={() => {
                                                                    const next = [...speakersList];
                                                                    const prices = spk.prices.filter((_: any, i: number) => i !== pIdx);
                                                                    next[idx] = { ...spk, prices };
                                                                    updateSectionData(sIdx, { speakers: next });
                                                                }}
                                                                className="p-1 text-zinc-600 hover:text-red-400"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Price calculations indicators */}
                                            <div className="bg-black/30 border border-zinc-900 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-zinc-400">
                                                <div>施工料金ベース: <span className="text-white">¥{((spk.fixedPriceOverride !== undefined && spk.fixedPriceOverride !== '') ? parsePrice(spk.fixedPriceOverride) : sectionFixedPrice).toLocaleString()}</span></div>
                                                <div className="flex items-center gap-6">
                                                    <div>
                                                        <span className="text-[10px] text-zinc-500 font-bold block mb-0.5">パッケージ合計 (税込)</span>
                                                        <span className="text-blue-400 font-black">¥{appliedPrice.toLocaleString()}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] text-zinc-500 font-bold block mb-0.5">(税別)</span>
                                                        <span className="text-zinc-300 font-black">¥{taxExcludedPrice.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* セクション最下部の追加・ペーストボタン */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/40">
                                {copiedSpeaker ? (
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            const newSpk = Object.assign({}, copiedSpeaker || {}, {
                                                id: "spk_" + Date.now() + "_" + Math.random().toString(36).substring(2,6)
                                            });
                                            const nextSpks = speakersList.concat([newSpk]);
                                            updateSectionData(sIdx, { speakers: nextSpks });
                                        }}
                                        className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                    >
                                        <Plus className="w-3.5 h-3.5 text-green-400" /> Paste Speaker
                                    </button>
                                ) : null}
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const newSpk = {
                                            id: `spk_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,
                                            brand: 'メーカー名',
                                            brandLogo: '',
                                            name: '製品名',
                                            image: '/images/Top/speaker.webp',
                                            mountingHoleSize: '140mm',
                                            depthSize: '50mm',
                                            hasGrille: '付属',
                                            hasTweeterMount: '付属',
                                            standalonePrice: '¥30,000',
                                            fixedPriceOverride: '',
                                            remarks: '',
                                            youtubeUrl: ''
                                        };
                                        const nextSpks = [...speakersList, newSpk];
                                        updateSectionData(sIdx, { speakers: nextSpks });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> スピーカーを追加
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }
            case 'text':
                return (
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">セクション見出しタイトル</label>
                            <input 
                                type="text"
                                value={section.data.title || ''}
                                onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">本文コンテンツ (Content - HTMLタグ対応)</label>
                            <textarea 
                                value={section.data.content || ''}
                                onChange={e => updateSectionData(sIdx, { content: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                rows={6}
                            />
                        </div>
                    </div>
                );
            case 'banner':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">バッジ (Badge - 改行可能)</label>
                                <textarea 
                                    value={section.data.badge || ''}
                                    onChange={e => updateSectionData(sIdx, { badge: e.target.value })}
                                    rows={2}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">バナータイトル (Title)</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">サブタイトル (subTitle)</label>
                                <input 
                                    type="text"
                                    value={section.data.subTitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subTitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">背景画像パス</label>
                                <input 
                                    type="text"
                                    value={section.data.image || ''}
                                    onChange={e => updateSectionData(sIdx, { image: cleanPathInput(e.target.value) })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-zinc-400">黒オーバーレイ不透明度 (0.0〜1.0)</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={section.data.opacity !== undefined ? section.data.opacity : 0.4}
                                        onChange={e => updateSectionData(sIdx, { opacity: parseFloat(e.target.value) })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-zinc-400">バナーの高さ</label>
                                    <input 
                                        type="text"
                                        value={section.data.height || '400px'}
                                        onChange={e => updateSectionData(sIdx, { height: e.target.value })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                        placeholder="例: 400px"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">背景色 (Bg Color - 画像がない場合)</label>
                                <input 
                                    type="text"
                                    value={section.data.bgColor || ''}
                                    onChange={e => updateSectionData(sIdx, { bgColor: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">バナー説明文 (description)</label>
                            <textarea 
                                value={section.data.description || ''}
                                onChange={e => updateSectionData(sIdx, { description: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                rows={2}
                            />
                        </div>
                    </div>
                );
            case 'link_cards': {
                const cardItems = section.data.items || [];
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">見出しタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">見出しサブタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">カードリンク項目一覧</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const items = [...cardItems];
                                        items.push({ title: 'カードタイトル', description: '詳細説明文', image: '/images/Audio/Speaker/door-b.webp', badge: 'NEW', linkText: '詳しく見る', slug: '' });
                                        updateSectionData(sIdx, { items });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> カードを追加
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {cardItems.map((item: any, cIdx: number) => (
                                    <div key={cIdx} className="bg-black/40 border border-zinc-800 p-4 rounded-xl space-y-3 relative pr-8">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const items = cardItems.filter((_: any, i: number) => i !== cIdx);
                                                updateSectionData(sIdx, { items });
                                            }}
                                            className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">タイトル (改行対応)</label>
                                                <textarea 
                                                    value={item.title || ''}
                                                    onChange={e => {
                                                        const items = [...cardItems];
                                                        items[cIdx] = { ...item, title: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    rows={1}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">バッジ表記</label>
                                                <input 
                                                    type="text"
                                                    value={item.badge || ''}
                                                    onChange={e => {
                                                        const items = [...cardItems];
                                                        items[cIdx] = { ...item, badge: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">画像パス</label>
                                                <input 
                                                    type="text"
                                                    value={item.image || ''}
                                                    onChange={e => {
                                                        const items = [...cardItems];
                                                        items[cIdx] = { ...item, image: cleanPathInput(e.target.value) };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">リンクURL / スラッグ (例: sp-standard)</label>
                                                <input 
                                                    type="text"
                                                    value={item.slug || ''}
                                                    onChange={e => {
                                                        const items = [...cardItems];
                                                        items[cIdx] = { ...item, slug: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">ボタン文字</label>
                                            <input 
                                                type="text"
                                                value={item.linkText || '詳しく見る'}
                                                onChange={e => {
                                                    const items = [...cardItems];
                                                    items[cIdx] = { ...item, linkText: e.target.value };
                                                    updateSectionData(sIdx, { items });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">説明文 (description)</label>
                                            <textarea 
                                                value={item.description || ''}
                                                onChange={e => {
                                                    const items = [...cardItems];
                                                    items[cIdx] = { ...item, description: e.target.value };
                                                    updateSectionData(sIdx, { items });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
            case 'floating_cta':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">LINE相談ボタン表示</label>
                            <select 
                                value={section.data.showLine !== false ? 'true' : 'false'}
                                onChange={e => updateSectionData(sIdx, { showLine: e.target.value === 'true' })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                            >
                                <option value="true">表示する</option>
                                <option value="false">表示しない</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">来店予約ボタン表示</label>
                            <select 
                                value={section.data.showReservation !== false ? 'true' : 'false'}
                                onChange={e => updateSectionData(sIdx, { showReservation: e.target.value === 'true' })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                            >
                                <option value="true">表示する</option>
                                <option value="false">表示しない</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">テーマカラー</label>
                            <select 
                                value={section.data.theme || 'audio'}
                                onChange={e => updateSectionData(sIdx, { theme: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                            >
                                <option value="audio">オーディオ (ブルー)</option>
                                <option value="security">セキュリティ (エメラルド)</option>
                            </select>
                        </div>
                    </div>
                );
            case 'cta':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">見出しタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">説明文 (desc)</label>
                                <textarea 
                                    value={section.data.desc || ''}
                                    onChange={e => updateSectionData(sIdx, { desc: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    rows={2}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">ボタン表記名</label>
                                <input 
                                    type="text"
                                    value={section.data.btnText || ''}
                                    onChange={e => updateSectionData(sIdx, { btnText: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">ボタン遷移先 (btnLink)</label>
                                <input 
                                    type="text"
                                    value={section.data.btnLink || ''}
                                    onChange={e => updateSectionData(sIdx, { btnLink: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'faq': {
                const faqItems = section.data.items || [];
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">セクションタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">サブタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                    placeholder="Questions & Answers"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">質問と回答一覧</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const items = [...faqItems];
                                        items.push({ q: '質問を入力してください', a: '回答を入力してください' });
                                        updateSectionData(sIdx, { items });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> FAQを追加
                                </button>
                            </div>

                            <div className="space-y-4">
                                {faqItems.map((faq: any, fIdx: number) => (
                                    <div key={fIdx} className="bg-black/40 border border-zinc-800 p-4 rounded-xl space-y-3 relative pr-8">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const items = faqItems.filter((_: any, i: number) => i !== fIdx);
                                                updateSectionData(sIdx, { items });
                                            }}
                                            className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="space-y-2">
                                            <div className="space-y-1">
                                                <label className="block text-[9px] font-bold text-zinc-500">質問 (Q)</label>
                                                <input 
                                                    type="text"
                                                    value={faq.q || ''}
                                                    onChange={e => {
                                                        const items = [...faqItems];
                                                        items[fIdx] = { ...faq, q: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="block text-[9px] font-bold text-zinc-500">回答 (A)</label>
                                                <textarea 
                                                    value={faq.a || ''}
                                                    onChange={e => {
                                                        const items = [...faqItems];
                                                        items[fIdx] = { ...faq, a: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    rows={2}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
            case 'gallery': {
                const rawImages = section.data.images || [];
                const columns = section.data.columns || 4;
                
                let groups: any[] = section.data.groups;
                if (!groups) {
                    const items = rawImages.map((img: any) => {
                        if (typeof img === 'string') {
                            return { url: img, title: '', caption: '' };
                        }
                        return { url: img.url || '', title: img.title || '', caption: img.caption || '' };
                    });
                    groups = [{ id: 'grp_default', title: '', items }];
                }

                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-1.5 md:col-span-1">
                                <label className="block text-[10px] font-bold text-zinc-400">セクションタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    placeholder="例: 施工ギャラリー"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5 md:col-span-1">
                                <label className="block text-[10px] font-bold text-zinc-400">サブタイトル (任意)</label>
                                <input 
                                    type="text"
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    placeholder="例: 当社の施工実績一覧"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5 md:col-span-1">
                                <label className="block text-[10px] font-bold text-zinc-400">横並びの個数 (カラム数)</label>
                                <select
                                    value={columns}
                                    onChange={e => updateSectionData(sIdx, { columns: parseInt(e.target.value) || 4 })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold outline-none"
                                >
                                    <option value={2}>2列 (大きめ表示)</option>
                                    <option value={3}>3列 (標準)</option>
                                    <option value={4}>4列 (コンパクト)</option>
                                </select>
                            </div>
                            <div className="space-y-1.5 md:col-span-1">
                                <label className="block text-[10px] font-bold text-zinc-400">画像アスペクト比</label>
                                <select
                                    value={section.data.aspectRatio || '4:3'}
                                    onChange={e => updateSectionData(sIdx, { aspectRatio: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold outline-none"
                                >
                                    <option value="4:3">4:3 (400×300 横長)</option>
                                    <option value="1:1">1:1 (正方形)</option>
                                    <option value="contain">全体表示 (切抜きなし)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[11px] font-black text-zinc-300">施工グループ管理</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const newGroups = [...groups];
                                        newGroups.push({
                                            id: `grp_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,
                                            title: '新しい施工グループ',
                                            items: []
                                        });
                                        updateSectionData(sIdx, { groups: newGroups });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> グループを追加
                                </button>
                            </div>

                            <div className="space-y-6">
                                {groups.map((grp: any, gIdx: number) => (
                                    <div key={grp.id || gIdx} className="bg-black/30 border border-zinc-800/80 rounded-2xl p-4 space-y-4">
                                        <div className="flex justify-between items-center gap-4">
                                            <div className="flex-1 space-y-2">
                                                <div>
                                                    <label className="block text-[9px] font-bold text-zinc-500 mb-1">グループ名 (例: ドアチューニング施工)</label>
                                                    <input 
                                                        type="text"
                                                        value={grp.title || ''}
                                                        onChange={e => {
                                                            const newGroups = [...groups];
                                                            newGroups[gIdx] = { ...grp, title: e.target.value };
                                                            updateSectionData(sIdx, { groups: newGroups });
                                                        }}
                                                        placeholder="例: フロントドア防音施工"
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[9px] font-bold text-zinc-500 mb-1">グループ説明文 (改行可)</label>
                                                    <textarea 
                                                        rows={2}
                                                        value={grp.description || grp.desc || ''}
                                                        onChange={e => {
                                                            const newGroups = [...groups];
                                                            newGroups[gIdx] = { ...grp, description: e.target.value };
                                                            updateSectionData(sIdx, { groups: newGroups });
                                                        }}
                                                        placeholder="例: お客様のご要望に応じてカスタム可能ですのでお気軽にご相談ください。"
                                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold focus:border-blue-500 outline-none resize-y"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 pt-4">
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        const newGroups = [...groups];
                                                        const items = [...(grp.items || [])];
                                                        items.push({ url: '/images/Top/speaker.webp', title: '', caption: '' });
                                                        newGroups[gIdx] = { ...grp, items };
                                                        updateSectionData(sIdx, { groups: newGroups });
                                                    }}
                                                    className="flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold"
                                                >
                                                    <Plus className="w-3 h-3 text-blue-400" /> 画像追加
                                                </button>
                                                {groups.length > 1 && (
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            const newGroups = groups.filter((_: any, i: number) => i !== gIdx);
                                                            updateSectionData(sIdx, { groups: newGroups });
                                                        }}
                                                        className="p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                        title="グループを削除"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                            {(grp.items || []).map((item: any, itemIdx: number) => {
                                                const imgUrl = typeof item === 'string' ? item : item.url;
                                                const itemTitle = typeof item === 'string' ? '' : (item.title || '');
                                                const itemCaption = typeof item === 'string' ? '' : (item.caption || '');

                                                return (
                                                    <div key={itemIdx} className="bg-zinc-900/90 border border-zinc-800/80 p-3 rounded-xl flex items-start gap-3 relative">
                                                        <button 
                                                            type="button"
                                                            onClick={() => {
                                                                const newGroups = [...groups];
                                                                const newItems = grp.items.filter((_: any, i: number) => i !== itemIdx);
                                                                newGroups[gIdx] = { ...grp, items: newItems };
                                                                updateSectionData(sIdx, { groups: newGroups });
                                                            }}
                                                            className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                                            title="画像削除"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>

                                                        <div className="w-20 h-20 bg-black border border-zinc-800 rounded-lg overflow-hidden shrink-0 flex items-center justify-center mt-1">
                                                            <img src={imgUrl} alt="Preview" className="w-full h-full object-cover" />
                                                        </div>

                                                        <div className="flex-1 space-y-2 pr-6">
                                                            <div>
                                                                <label className="block text-[8px] font-bold text-zinc-500">画像パス</label>
                                                                <input 
                                                                    type="text"
                                                                    value={imgUrl}
                                                                    onChange={e => {
                                                                        const newGroups = [...groups];
                                                                        const newItems = [...grp.items];
                                                                        const current = typeof item === 'string' ? { url: item, title: '', caption: '' } : { ...item };
                                                                        newItems[itemIdx] = { ...current, url: cleanPathInput(e.target.value) };
                                                                        newGroups[gIdx] = { ...grp, items: newItems };
                                                                        updateSectionData(sIdx, { groups: newGroups });
                                                                    }}
                                                                    className="w-full bg-black/60 border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold"
                                                                    placeholder="/images/..."
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-[8px] font-bold text-zinc-500">画像タイトル (任意)</label>
                                                                <input 
                                                                    type="text"
                                                                    value={itemTitle}
                                                                    onChange={e => {
                                                                        const newGroups = [...groups];
                                                                        const newItems = [...grp.items];
                                                                        const current = typeof item === 'string' ? { url: item, title: '', caption: '' } : { ...item };
                                                                        newItems[itemIdx] = { ...current, title: e.target.value };
                                                                        newGroups[gIdx] = { ...grp, items: newItems };
                                                                        updateSectionData(sIdx, { groups: newGroups });
                                                                    }}
                                                                    className="w-full bg-black/60 border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold"
                                                                    placeholder="例: フロントドア制振処理"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-[8px] font-bold text-zinc-500">画像説明文 (任意)</label>
                                                                <input 
                                                                    type="text"
                                                                    value={itemCaption}
                                                                    onChange={e => {
                                                                        const newGroups = [...groups];
                                                                        const newItems = [...grp.items];
                                                                        const current = typeof item === 'string' ? { url: item, title: '', caption: '' } : { ...item };
                                                                        newItems[itemIdx] = { ...current, caption: e.target.value };
                                                                        newGroups[gIdx] = { ...grp, items: newItems };
                                                                        updateSectionData(sIdx, { groups: newGroups });
                                                                    }}
                                                                    className="w-full bg-black/60 border border-zinc-800 rounded px-2 py-1 text-white text-[10px] font-bold"
                                                                    placeholder="例: アウターパネルに制振シートを密着施工"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
            case 'package_summary': {
                const summaryItems = section.data.items || [];
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">見出しタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.title || ''}
                                    onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[10px] font-bold text-zinc-400">見出しサブタイトル</label>
                                <input 
                                    type="text"
                                    value={section.data.subtitle || ''}
                                    onChange={e => updateSectionData(sIdx, { subtitle: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">部材・施工一式内容一覧</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const items = [...summaryItems];
                                        items.push({ title: '施工内容/部材', desc: '説明文を入力', value: '1ペア' });
                                        updateSectionData(sIdx, { items });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> 項目を追加
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {summaryItems.map((item: any, itemIdx: number) => (
                                    <div key={itemIdx} className="bg-black/40 border border-zinc-800 p-4 rounded-xl space-y-3 relative pr-8">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const items = summaryItems.filter((_: any, i: number) => i !== itemIdx);
                                                updateSectionData(sIdx, { items });
                                            }}
                                            className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5 font-bold text-zinc-500">
                                                <label className="block text-[9px] font-bold text-zinc-500">部材名 / 施工</label>
                                                <input 
                                                    type="text"
                                                    value={item.title || ''}
                                                    onChange={e => {
                                                        const items = [...summaryItems];
                                                        items[itemIdx] = { ...item, title: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[9px] font-bold text-zinc-500">数量・備考表記</label>
                                                <input 
                                                    type="text"
                                                    value={item.value || ''}
                                                    onChange={e => {
                                                        const items = [...summaryItems];
                                                        items[itemIdx] = { ...item, value: e.target.value };
                                                        updateSectionData(sIdx, { items });
                                                    }}
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                                    placeholder="例: 1セット"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[9px] font-bold text-zinc-500">詳細説明</label>
                                            <input 
                                                type="text"
                                                value={item.desc || ''}
                                                onChange={e => {
                                                    const items = [...summaryItems];
                                                    items[itemIdx] = { ...item, desc: e.target.value };
                                                    updateSectionData(sIdx, { items });
                                                }}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
            case 'notes': {
                const noteItems = section.data.items || [];
                return (
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-zinc-400">見出しタイトル</label>
                            <input 
                                type="text"
                                value={section.data.title || ''}
                                onChange={e => updateSectionData(sIdx, { title: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs font-bold"
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                            <div className="flex justify-between items-center">
                                <label className="block text-[10px] font-black text-zinc-400">注意事項一覧 (箇条書き項目)</label>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const items = [...noteItems];
                                        items.push('新しい注意事項を入力してください');
                                        updateSectionData(sIdx, { items });
                                    }}
                                    className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-black"
                                >
                                    <Plus className="w-3.5 h-3.5 text-blue-400" /> 注意事項を追加
                                </button>
                            </div>

                            <div className="space-y-3">
                                {noteItems.map((note: string, noteIdx: number) => (
                                    <div key={noteIdx} className="bg-black/40 border border-zinc-800 p-3 rounded-xl flex items-center gap-3 relative pr-10">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const items = noteItems.filter((_: any, i: number) => i !== noteIdx);
                                                updateSectionData(sIdx, { items });
                                            }}
                                            className="absolute top-3.5 right-2.5 p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="text-[10px] font-black text-zinc-500">#{noteIdx + 1}</span>
                                        <textarea 
                                            value={note}
                                            onChange={e => {
                                                const items = [...noteItems];
                                                items[noteIdx] = e.target.value;
                                                updateSectionData(sIdx, { items });
                                            }}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                            rows={2}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
            default:
                return <div className="text-zinc-500 text-xs">未知のセクションタイプです: {section.type}</div>;
        }
    };

    return (
        <div className="space-y-12">
            {/* Audio Menu Header Overview */}
            <div className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Audio Package Menu</h2>
                    <p className="text-zinc-500 font-bold text-xs mt-2">
                        オーディオ特設ラインごとの専用LPコンテンツを複数追加・一括管理します。各プラン専用 of URL(Slug)も設定可能です。
                    </p>
                </div>
                {/* アクションボタン群 */}
                <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
                    <button 
                        onClick={() => window.open(`/admin/print/audio/${data.slug || 'sp-standard'}`, '_blank')}
                        className="flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/30 text-blue-400 hover:text-white px-4 py-2.5 rounded-xl font-black text-xs transition-all"
                    >
                        <Printer className="w-4 h-4" />
                        このプランを資料印刷 (A4)
                    </button>
                    <button 
                        onClick={handleAddPlan}
                        className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-4 py-2.5 rounded-xl font-black text-xs transition-all"
                    >
                        <Plus className="w-4 h-4 text-blue-400" />
                        プランを追加
                    </button>
                </div>
            </div>

            {/* カテゴリごとにグループ分けされたタブ切り替えリスト */}
            <div className="space-y-6 border-b border-zinc-800/60 pb-6">
                {CATEGORIES.map(cat => {
                    const catLPs = lps.filter(lp => (lp.parentCategoryId || 'speaker_package') === cat.id);
                    if (catLPs.length === 0) return null;
                    
                    const getLPType = (p: any) => {
                        if (p.subType) return p.subType;
                        if (p.showInMenu === false) return 'standalone';
                        const name = p.name || '';
                        if (name.includes('BMW') || name.includes('Mercedes') || name.includes('車種別')) {
                            return 'vehicle';
                        }
                        return 'package';
                    };

                    const subGroups = [
                        { id: 'package', name: '一般パッケージプラン', color: 'text-blue-400' },
                        { id: 'vehicle', name: '車種専用プラン', color: 'text-amber-400' },
                        { id: 'standalone', name: '非表示・単体LP', color: 'text-zinc-500' }
                    ];

                    return (
                            <div key={cat.id} className="space-y-4 bg-zinc-900/20 border border-zinc-800/60 p-4 rounded-2xl mb-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/50 pb-3">
                                    <div className="text-[12px] font-black text-white uppercase tracking-widest pl-1">{cat.name}</div>
                                    <div className="flex items-center gap-2 flex-1 md:max-w-md">
                                        <span className="text-[10px] font-black text-blue-400 shrink-0">MENUカード背景画像:</span>
                                        <input 
                                            type="text"
                                            value={(plans.find(p => p.id === cat.id)?.image) || ''}
                                            onChange={e => updateCategory(cat.id, { image: e.target.value })}
                                            placeholder="例: /images/Audio/Speaker/door-b.webp"
                                            className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-1.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                            <div className="space-y-4 pl-2">
                                {subGroups.map(sub => {
                                    const groupLPs = catLPs.filter(p => getLPType(p) === sub.id);
                                    if (groupLPs.length === 0) return null;

                                    return (
                                        <div key={sub.id} className="space-y-2">
                                            <div className={`text-[9px] font-black uppercase tracking-wider pl-1 flex items-center gap-1.5 ${sub.color}`}>
                                                <div className="w-1 h-1 rounded-full bg-current" />
                                                {sub.name}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {groupLPs.map((p, catIdx) => {
                                                    const isSelected = p.id === selectedId;
                                                    return (
                                                        <div 
                                                            key={p.id}
                                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                                                                isSelected 
                                                                ? 'bg-blue-600/10 border-blue-500/40 text-white shadow-lg shadow-blue-600/5' 
                                                                : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                                                            }`}
                                                            onClick={() => setSelectedId(p.id || '')}
                                                        >
                                                            <Music className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-zinc-600'}`} />
                                                            <span>{p.name || p.header?.badge || '無名プラン'}</span>
                                                            {p.showInMenu === false && (
                                                                <span className="text-[9px] font-black bg-zinc-800 text-zinc-400 border border-zinc-700/60 px-1.5 py-0.5 rounded-md scale-95 origin-left tracking-tighter">単体LP</span>
                                                            )}
                                                            
                                                            {/* 順序移動ボタン (同じサブグループ内での移動) */}
                                                            <div className="flex items-center gap-0.5 ml-1 border-l border-zinc-800/50 pl-1.5" onClick={e => e.stopPropagation()}>
                                                                {catIdx > 0 && (
                                                                    <button 
                                                                        onClick={() => handleMovePlan(p.id || '', 'left')}
                                                                        className="p-1 hover:bg-zinc-800 rounded text-zinc-600 hover:text-blue-400 transition-colors"
                                                                        title="左に移動"
                                                                    >
                                                                        <ArrowLeft className="w-3 h-3" />
                                                                    </button>
                                                                )}
                                                                {catIdx < groupLPs.length - 1 && (
                                                                    <button 
                                                                        onClick={() => handleMovePlan(p.id || '', 'right')}
                                                                        className="p-1 hover:bg-zinc-800 rounded text-zinc-600 hover:text-blue-400 transition-colors"
                                                                        title="右に移動"
                                                                    >
                                                                        <ArrowRight className="w-3 h-3" />
                                                                    </button>
                                                                )}
                                                            </div>

                                                            {/* コピーボタン */}
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleCopyPlan(p);
                                                                }}
                                                                className="p-1 hover:bg-blue-500/20 rounded text-zinc-600 hover:text-blue-400 transition-colors ml-1"
                                                                title="このプランをコピー"
                                                            >
                                                                <Copy className="w-3 h-3" />
                                                            </button>

                                                            {/* 削除ボタン */}
                                                            {lps.length > 1 && (
                                                                <button 
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleDeletePlan(p.id || '', p.name || 'プラン');
                                                                    }}
                                                                    className="p-1 hover:bg-red-500/20 rounded text-zinc-600 hover:text-red-400 transition-colors ml-1"
                                                                    title="このプランを削除"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 選択中のプラン編集画面 */}
            <motion.div 
                key={selectedId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-950 border-2 border-zinc-800 rounded-[3rem] p-8 md:p-12 space-y-12 relative"
            >
                {/* 共通基本設定: 名前とSlug */}
                <div className="bg-zinc-900/30 border border-zinc-800/80 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded uppercase tracking-widest">基本設定</span>
                        <span className="text-xs font-bold text-zinc-400">管理名およびURLスラッグ</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 pt-2">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-zinc-400">プラン名 (管理・タブ表示用)</label>
                            <input 
                                type="text"
                                value={data.name || ''}
                                onChange={e => setData({ ...data, name: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="例: スタンダードライン"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-zinc-400">URL Slug (英数字・ハイフン)</label>
                            <div className="flex items-center bg-black border border-zinc-800 rounded-xl overflow-hidden focus-within:border-blue-500">
                                <span className="text-zinc-600 text-xs font-bold pl-4 pr-1 select-none">/</span>
                                <input 
                                    type="text"
                                    value={data.slug || ''}
                                    onChange={e => setData({ ...data, slug: e.target.value.replace(/[^a-zA-Z0-9-_]/g, '') })}
                                    className="w-full bg-transparent py-2.5 pr-4 text-blue-400 text-xs font-bold outline-none"
                                    placeholder="sp-standard"
                                  />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-zinc-400">親メニューカテゴリ</label>
                            <select
                                value={data.parentCategoryId || 'speaker_package'}
                                onChange={e => setData({ ...data, parentCategoryId: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                            >
                                <option value="speaker_package">スピーカー交換・車種別プラン</option>
                                <option value="bass_power">低音強化・パワーアップ（アンプ）</option>
                                <option value="digital_source">DSP・プレーヤー・高音音質ナビ</option>
                                <option value="install_tuning">デッドニング・施工・電源</option>
                                <option value="custom_install">カスタムインストール・造作</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-zinc-400">プラン分類</label>
                            <select
                                value={
                                    data.subType 
                                        ? data.subType 
                                        : (data.showInMenu === false ? 'standalone' : ((data.name || '').includes('BMW') || (data.name || '').includes('Mercedes') || (data.name || '').includes('車種別') ? 'vehicle' : 'package'))
                                }
                                onChange={e => {
                                    const val = e.target.value;
                                    setData({
                                        ...data,
                                        subType: val,
                                        showInMenu: val !== 'standalone'
                                    });
                                }}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                            >
                                <option value="package">一般パッケージプラン</option>
                                <option value="vehicle">車種専用プラン</option>
                                <option value="standalone">非表示・単体LP</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-zinc-400">公開ステータス</label>
                            <select
                                value={data.publishStatus || 'published'}
                                onChange={e => setData({ ...data, publishStatus: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                            >
                                <option value="published">公開中 (Published)</option>
                                <option value="draft">下書き (Draft)</option>
                                <option value="archived">保管済 (Archived)</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-zinc-400">外部リンク (オプション)</label>
                            <input 
                                type="text"
                                value={data.externalLink || ''}
                                onChange={e => setData({ ...data, externalLink: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-xs font-bold focus:border-blue-500 outline-none"
                                placeholder="例: https://example.com"
                            />
                        </div>
                    </div>
                </div>

                {/* --- Dynamic Page Sections Editor --- */}
                <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-[2rem] p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                                <Layers className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">Dynamic Page Sections</h4>
                                <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mt-1">LP内の各セクションコンテンツの構成と並び替え</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {sections.map((section: any, sIdx: number) => {
                            const isExpanded = expandedSectionId === section.id;
                            return (
                                <div key={section.id} className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden">
                                    {/* Section Header */}
                                    <div 
                                        onClick={() => setExpandedSectionId(isExpanded ? null : section.id)}
                                        className="flex items-center justify-between px-6 py-4 bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer select-none border-b border-zinc-800/40"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Reordering Controls */}
                                            <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                                                <button 
                                                    type="button"
                                                    disabled={sIdx === 0}
                                                    onClick={() => {
                                                        const next = [...sections];
                                                        const temp = next[sIdx];
                                                        next[sIdx] = next[sIdx - 1];
                                                        next[sIdx - 1] = temp;
                                                        updateSections(next);
                                                    }}
                                                    className="p-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 disabled:opacity-30 rounded-lg text-zinc-400 hover:text-white transition-all"
                                                    title="上に移動"
                                                >
                                                    <ChevronUp className="w-3.5 h-3.5" />
                                                </button>
                                                <button 
                                                    type="button"
                                                    disabled={sIdx === sections.length - 1}
                                                    onClick={() => {
                                                        const next = [...sections];
                                                        const temp = next[sIdx];
                                                        next[sIdx] = next[sIdx + 1];
                                                        next[sIdx + 1] = temp;
                                                        updateSections(next);
                                                    }}
                                                    className="p-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 disabled:opacity-30 rounded-lg text-zinc-400 hover:text-white transition-all"
                                                    title="下に移動"
                                                >
                                                    <ChevronDown className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            {/* Type and Name */}
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                                                    {section.type}
                                                </span>
                                                <span className="text-xs font-black text-white">
                                                    {section.data?.title || section.data?.badge || `セクション #${sIdx + 1}`}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                                            <button 
                                                type="button"
                                                onClick={() => {
                                                    if (confirm(`本当にこの「${section.type}」セクションを削除しますか？`)) {
                                                        const next = sections.filter((_: any, idx: number) => idx !== sIdx);
                                                        updateSections(next);
                                                        if (expandedSectionId === section.id) setExpandedSectionId(null);
                                                    }
                                                }}
                                                className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="セクションを削除"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <div className="text-zinc-500 hover:text-white transition-all">
                                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Section Editor Form */}
                                    {isExpanded && (
                                        <div className="p-6 md:p-8 space-y-6 bg-black/30 border-t border-zinc-800/40">
                                            {renderSectionForm(section, sIdx)}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {sections.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-3xl">
                                <p className="text-sm text-zinc-500 font-bold">セクションが登録されていません。下のボタンから追加してください。</p>
                            </div>
                        )}
                    </div>

                    {/* Add Section Controls */}
                    <div className="pt-6 border-t border-zinc-800/80">
                        <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">新しいセクションを追加</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                            {[
                                { type: 'hero', label: 'Hero (メイン看板)' },
                                { type: 'pricing', label: 'Pricing (価格表)' },
                                { type: 'features', label: 'Features (3大施工)' },
                                { type: 'upgrades', label: 'Upgrades (オプション)' },
                                { type: 'speakers', label: 'Speakers (スピーカー)' },
                                { type: 'text', label: 'Text (テキスト文章)' },
                                { type: 'banner', label: 'Banner (横帯バナー)' },
                                { type: 'link_cards', label: 'Link Cards (リンク枠)' },
                                { type: 'cta', label: 'CTA (相談ボタン)' },
                                { type: 'floating_cta', label: 'Floating CTA (常駐ボタン)' },
                                { type: 'faq', label: 'FAQ (よくある質問)' },
                                { type: 'gallery', label: 'Gallery (写真枠)' },
                                { type: 'package_summary', label: 'Summary (構成表)' },
                                { type: 'notes', label: 'Notes (注意事項)' }
                            ].map((btn) => (
                                <button
                                    key={btn.type}
                                    type="button"
                                    onClick={() => {
                                        const newSec: any = {
                                            id: `sec_${btn.type}_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,
                                            type: btn.type,
                                            data: {}
                                        };
                                        // Initialize default values for the specific type
                                        if (btn.type === 'hero') {
                                            newSec.data = { badge: 'SPECIAL PACKAGE', title: 'NEW LINE', subtitle: 'New Sound Experience', desc: '説明文を入力', image: '/images/Audio/Speaker/door-b.webp', imageOpacity: 0.3, useDarkTheme: true };
                                        } else if (btn.type === 'pricing') {
                                            newSec.data = { specialPrice: '100000', fixedPrice: '30000', normalPriceText: '通常目安: 150,000円', savingsText: '約 50,000円 お得!', taxRate: '10', note: '※構成により変動します。' };
                                        } else if (btn.type === 'features') {
                                            newSec.data = {
                                                doorTuning: { title: 'ドアチューニング', desc: '防振施工', image: '/images/Audio/Speaker/door-b.webp' },
                                                baffle: { title: 'インナーバッフル', desc: 'バッフル固定', image: '/images/Audio/Speaker/baffle.webp' },
                                                cable: { title: '配線ケーブル', desc: '高音質伝送', image: '/images/Audio/Speaker/ang-cable.webp' }
                                            };
                                        } else if (btn.type === 'upgrades') {
                                            newSec.data = { title: 'アップグレードオプション', subtitle: 'さらなる高音質へ', courses: [], options: { metalBaffleDiscount: '20% OFF', tweeterMountPrice: '¥46,200〜', metalBaffleImage: '/images/Audio/Speaker/metal.webp', tweeterMountImage: '/images/Audio/Speaker/tw-mount.webp' } };
                                        } else if (btn.type === 'speakers') {
                                            newSec.data = { title: 'Speaker Lineup', subtitle: '試聴可能ユニット一覧', hideTitle: false, hideSubtitle: false, subtitleAlign: 'right', fixedPrice: '30000', speakers: [] };
                                        } else if (btn.type === 'text') {
                                            newSec.data = { title: '見出しタイトル', content: '<p>文章を入力してください</p>' };
                                        } else if (btn.type === 'banner') {
                                            newSec.data = { title: 'バナータイトル', badge: 'RECOMMENDED', opacity: 0.4, height: '400px', image: '/images/Audio/Speaker/door-b.webp' };
                                        } else if (btn.type === 'link_cards') {
                                            newSec.data = { title: '関連リンク', subtitle: '各種メニュー', items: [] };
                                        } else if (btn.type === 'cta') {
                                            newSec.data = { title: 'まずはお気軽にご相談ください', desc: 'お見積り・ご質問など随時受付中', btnText: 'LINEで無料相談・ご予約', btnLink: '/reservation' };
                                        } else if (btn.type === 'floating_cta') {
                                            newSec.data = { showLine: true, showReservation: true, theme: 'audio' };
                                        } else if (btn.type === 'faq') {
                                            newSec.data = { title: 'よくあるご質問', items: [] };
                                        } else if (btn.type === 'gallery') {
                                            newSec.data = { title: '施工ギャラリー', images: [] };
                                        } else if (btn.type === 'package_summary') {
                                            newSec.data = { title: 'パッケージ全内容', subtitle: '構成部材・施工一覧', items: [] };
                                        } else if (btn.type === 'notes') {
                                            newSec.data = { title: '注意事項', items: [] };
                                        }
                                        const next = [...sections, newSec];
                                        updateSections(next);
                                        setExpandedSectionId(newSec.id);
                                    }}
                                    className="flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white px-3 py-2 rounded-xl text-[10px] font-black transition-all"
                                >
                                    <Plus className="w-3 h-3 text-blue-400" /> {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 保存ボタン */}
                <div className="flex justify-end pt-4">
                    <button 
                        onClick={handleSave}
                        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-1"
                    >
                        <Save className="w-5 h-5" />
                        設定内容を確定して保存
                    </button>
                </div>
            </motion.div>
        </div>
    );
};


const AnnouncementManager = () => {
    const { 
        audioEmergencyAnnouncement, setAudioEmergencyAnnouncement, 
        securityEmergencyAnnouncement, setSecurityEmergencyAnnouncement,
        audioHeroAlert, setAudioHeroAlert,
        securityHeroAlert, setSecurityHeroAlert,
        saveSiteData 
    } = usePrices();
    
    const [activeDomain, setActiveDomain] = useState<'audio' | 'security'>('audio');

    const emergency = activeDomain === 'audio' ? audioEmergencyAnnouncement : securityEmergencyAnnouncement;
    const setEmergency = activeDomain === 'audio' ? setAudioEmergencyAnnouncement : setSecurityEmergencyAnnouncement;
    const hero = activeDomain === 'audio' ? audioHeroAlert : securityHeroAlert;
    const setHero = activeDomain === 'audio' ? setAudioHeroAlert : setSecurityHeroAlert;
  
    return (
      <div className="space-y-8">
        {/* Domain Switcher */}
        <div className="flex gap-4 mb-8">
            <button 
                onClick={() => setActiveDomain('audio')}
                className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeDomain === 'audio' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
            >
                Audio Domain
            </button>
            <button 
                onClick={() => setActiveDomain('security')}
                className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeDomain === 'security' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
            >
                Security Domain
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 ${activeDomain === 'audio' ? 'bg-red-600' : 'bg-emerald-600'} rounded-2xl flex items-center justify-center shadow-xl shadow-red-600/20`}>
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">{activeDomain} EMERGENCY BAR</h3>
            </div>
            <div className="space-y-6">
              <ToggleButton active={emergency.active} onClick={() => setEmergency({...emergency, active: !emergency.active})} label="Status" />
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Notice Text</label>
                <textarea 
                  value={emergency.text}
                  onChange={e => setEmergency({...emergency, text: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm font-bold h-32"
                />
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 ${activeDomain === 'audio' ? 'bg-blue-600' : 'bg-emerald-600'} rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">{activeDomain} HERO SPECIAL</h3>
            </div>
            <div className="space-y-6">
              <ToggleButton active={hero.active} onClick={() => setHero({...hero, active: !hero.active})} label="Visibility" />
              <div className="grid grid-cols-3 gap-4">
                  <Input field="Badge" value={hero.badge} onChange={v => setHero({...hero, badge: v})} />
                  <div className="col-span-2">
                      <Input field="Main Message" value={hero.text} onChange={v => setHero({...hero, text: v})} />
                  </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={() => {
                if (activeDomain === 'audio') {
                    saveSiteData({ audioEmergencyAnnouncement: emergency, audioHeroAlert: hero });
                } else {
                    saveSiteData({ securityEmergencyAnnouncement: emergency, securityHeroAlert: hero });
                }
                alert(`${activeDomain.toUpperCase()} 設定を保存しました。`);
            }}
            className={`flex items-center gap-3 px-12 py-5 ${activeDomain === 'audio' ? 'bg-blue-600 shadow-blue-600/20' : 'bg-emerald-600 shadow-emerald-600/20'} text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 shadow-xl transition-all`}
          >
            <Save className="w-5 h-5" /> Save {activeDomain} Announcements
          </button>
        </div>
      </div>
    );
};

const RecruitmentManager = () => {
    const { 
        audioRecruitment, setAudioRecruitment,
        securityRecruitment, setSecurityRecruitment,
        saveSiteData 
    } = usePrices();

    const [activeDomain, setActiveDomain] = useState<'audio' | 'security'>('audio');
    
    const rec = activeDomain === 'audio' ? audioRecruitment : securityRecruitment;
    const setRec = activeDomain === 'audio' ? setAudioRecruitment : setSecurityRecruitment;

    return (
        <div className="space-y-8">
            {/* Domain Switcher */}
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => setActiveDomain('audio')}
                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeDomain === 'audio' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                >
                    Audio Domain
                </button>
                <button 
                    onClick={() => setActiveDomain('security')}
                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeDomain === 'security' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                >
                    Security Domain
                </button>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-12">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{activeDomain} RECRUITMENT</h3>
                    <ToggleButton active={rec.active} onClick={() => setRec({...rec, active: !rec.active})} label="Display on Site" />
                </div>
                <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <Input field="Headline" value={rec.title} onChange={v => setRec({...rec, title: v})} />
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Job Message</label>
                            <textarea 
                                value={rec.description || rec.message} 
                                onChange={e => setRec({...rec, description: e.target.value})}
                                className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm font-bold h-48"
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <Input field="Requirements (JSON-like)" value={rec.link} onChange={v => setRec({...rec, link: v})} />
                        <Input field="Featured Image Path" value={rec.image || ''} onChange={v => setRec({...rec, image: v})} />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button 
                    onClick={() => {
                        if (activeDomain === 'audio') {
                            saveSiteData({ audioRecruitment: rec });
                        } else {
                            saveSiteData({ securityRecruitment: rec });
                        }
                        alert(`${activeDomain.toUpperCase()} 採用情報を保存しました。`);
                    }}
                    className={`flex items-center gap-3 px-12 py-5 ${activeDomain === 'audio' ? 'bg-blue-600 shadow-blue-600/20' : 'bg-emerald-600 shadow-emerald-600/20'} text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 shadow-xl transition-all`}
                >
                    <Save className="w-5 h-5" /> Save {activeDomain} Recruitment
                </button>
            </div>
        </div>
    );
};

const EventManager = () => {
    const { audioEvents, setAudioEvents, securityEvents, setSecurityEvents } = usePrices();
    const [activeDomain, setActiveDomain] = useState<'audio' | 'security'>('audio');
    const [editingEvent, setEditingEvent] = useState<any>(null);

    const events = activeDomain === 'audio' ? audioEvents : securityEvents;
    const setEvents = activeDomain === 'audio' ? setAudioEvents : setSecurityEvents;

    const handleAdd = () => {
        const newEvent = {
            id: Date.now().toString(),
            slug: 'new-event-' + Date.now(),
            title: 'New Event',
            description: '',
            content: '<!-- Paste your HTML here -->\n<div style="padding: 100px; text-align: center;"><h1>New Event Page</h1></div>',
            css: '',
            status: 'draft',
            date: new Date().toISOString().split('T')[0],
            category: activeDomain
        };
        setEvents([newEvent, ...events]);
        setEditingEvent(newEvent);
    };

    const handleUpdate = (id: string, updates: any) => {
        const newEvents = events.map(e => e.id === id ? { ...e, ...updates } : e);
        setEvents(newEvents);
        if (editingEvent && editingEvent.id === id) {
            setEditingEvent({ ...editingEvent, ...updates });
        }
    };

    const handleRemove = (id: string) => {
        if (!confirm('Are you sure you want to delete this event page?')) return;
        setEvents(events.filter(e => e.id !== id));
        if (editingEvent && editingEvent.id === id) setEditingEvent(null);
    };

    return (
        <div className="space-y-12">
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => setActiveDomain('audio')}
                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeDomain === 'audio' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                >
                    Audio Events
                </button>
                <button 
                    onClick={() => setActiveDomain('security')}
                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeDomain === 'security' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                >
                    Security Events
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* List */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Pages</h3>
                        <button onClick={handleAdd} className="p-2 bg-blue-600/10 text-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Plus className="w-5 h-5" /></button>
                    </div>
                    {events.length === 0 && (
                        <div className="p-12 text-center border-2 border-dashed border-zinc-800 rounded-3xl text-zinc-600 font-bold italic">
                            No events found.
                        </div>
                    )}
                    {events.map(e => (
                        <div 
                            key={e.id}
                            onClick={() => setEditingEvent(e)}
                            className={`p-6 rounded-2xl border cursor-pointer transition-all ${editingEvent?.id === e.id ? 'bg-blue-600/10 border-blue-600' : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-600'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${e.status === 'published' ? 'bg-emerald-500 text-white' : e.status === 'archived' ? 'bg-zinc-700 text-zinc-400' : 'bg-amber-500 text-white'}`}>
                                    {e.status}
                                </span>
                                <span className="text-[10px] text-zinc-500 font-mono">{e.date}</span>
                            </div>
                            <h4 className="font-black text-white truncate">{e.title}</h4>
                            <p className="text-[10px] text-zinc-500 font-mono mt-1">/{activeDomain}/news/{e.slug}</p>
                        </div>
                    ))}
                </div>

                {/* Editor */}
                <div className="lg:col-span-2">
                    {editingEvent ? (
                        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[3rem] space-y-8 sticky top-24">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Edit Page</h3>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => window.open(`/${activeDomain}/news/${editingEvent.slug}`, '_blank')}
                                        className="p-3 bg-zinc-800 text-zinc-400 rounded-xl hover:text-white transition-all"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleRemove(editingEvent.id)}
                                        className="p-3 bg-red-600/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <Input field="Title" value={editingEvent.title} onChange={v => handleUpdate(editingEvent.id, { title: v })} />
                                <Input field="URL Slug" value={editingEvent.slug} onChange={v => handleUpdate(editingEvent.id, { slug: v })} />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</label>
                                    <select 
                                        value={editingEvent.status} 
                                        onChange={e => handleUpdate(editingEvent.id, { status: e.target.value })}
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-3 text-white font-bold"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived (SEO Only)</option>
                                    </select>
                                </div>
                                <Input field="Date" value={editingEvent.date} onChange={v => handleUpdate(editingEvent.id, { date: v })} />
                            </div>

                            <Input field="Meta Description" value={editingEvent.description} onChange={v => handleUpdate(editingEvent.id, { description: v })} />

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">HTML Content</label>
                                <textarea 
                                    value={editingEvent.content} 
                                    onChange={e => handleUpdate(editingEvent.id, { content: e.target.value })}
                                    className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-xs font-mono h-64"
                                    placeholder="Paste your raw HTML here..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Custom CSS (Optional)</label>
                                <textarea 
                                    value={editingEvent.css || ''} 
                                    onChange={e => handleUpdate(editingEvent.id, { css: e.target.value })}
                                    className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-xs font-mono h-32"
                                    placeholder=".my-class { color: red; }"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-20 border-2 border-dashed border-zinc-800 rounded-[3rem] text-zinc-700">
                            <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                            <p className="font-black italic text-xl uppercase tracking-widest">Select or create a page</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PartnerManager = () => {
    const { partners, brandPartners, updatePartner, updateBrandPartner, addPartner, removePartner, addBrandPartner, removeBrandPartner } = useSite();
    const { securityData, updateSecurityHome } = usePrices();
    
    const [activeDomain, setActiveDomain] = useState<'audio' | 'security'>('audio');

    const sPartners = securityData.home?.partners || [];
    const sTechPartners = securityData.home?.techPartners || [];

    const updateSPartner = (index: number, updates: any) => {
        const newList = [...sPartners];
        newList[index] = { ...newList[index], ...updates };
        updateSecurityHome({ partners: newList });
    };

    const addSPartner = () => {
        updateSecurityHome({ partners: [...sPartners, { name: 'New Partner', brand: '', url: '' }] });
    };

    const removeSPartner = (index: number) => {
        updateSecurityHome({ partners: sPartners.filter((_, i) => i !== index) });
    };

    const updateSTech = (index: number, updates: any) => {
        const newList = [...sTechPartners];
        newList[index] = { ...newList[index], ...updates };
        updateSecurityHome({ techPartners: newList });
    };

    const addSTech = () => {
        updateSecurityHome({ techPartners: [...sTechPartners, { name: 'New Tech Partner', desc: '', url: '' }] });
    };

    const removeSTech = (index: number) => {
        updateSecurityHome({ techPartners: sTechPartners.filter((_, i) => i !== index) });
    };

    return (
        <div className="space-y-12">
            {/* Domain Switcher */}
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => setActiveDomain('audio')}
                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeDomain === 'audio' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                >
                    Audio Domain
                </button>
                <button 
                    onClick={() => setActiveDomain('security')}
                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeDomain === 'security' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                >
                    Security Domain
                </button>
            </div>

            {activeDomain === 'audio' ? (
                <>
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-white italic tracking-tighter">AUDIO NETWORK SHOPS</h3>
                            <button onClick={() => addPartner({ id: Date.now().toString(), name: 'New Shop', location: '', url: '', description: '' })} className="px-4 py-2 bg-blue-600/10 text-blue-500 rounded-lg text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all">+ Add Shop</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {partners.map(p => (
                                <div key={p.id} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl relative group">
                                    <button onClick={() => removePartner(p.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-red-500 transition-all"><X className="w-4 h-4" /></button>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <Input field="Name" value={p.name} onChange={v => updatePartner(p.id, { name: v })} />
                                        <Input field="Area" value={p.location} onChange={v => updatePartner(p.id, { location: v })} />
                                    </div>
                                    <Input field="URL" value={p.url} onChange={v => updatePartner(p.id, { url: v })} />
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-white italic tracking-tighter">AUDIO BRAND PARTNERS</h3>
                            <button onClick={() => addBrandPartner({ id: Date.now().toString(), name: 'New Brand', category: '', description: '', url: '', iconName: 'Speaker' })} className="px-4 py-2 bg-blue-600/10 text-blue-500 rounded-lg text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all">+ Add Brand</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {brandPartners.map(p => (
                                <div key={p.id} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl relative group">
                                    <button onClick={() => removeBrandPartner(p.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-red-500 transition-all"><X className="w-4 h-4" /></button>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <Input field="Brand Name" value={p.name} onChange={v => updateBrandPartner(p.id, { name: v })} />
                                        <Input field="Category" value={p.category} onChange={v => updateBrandPartner(p.id, { category: v })} />
                                    </div>
                                    <Input field="Description" value={p.description} onChange={v => updateBrandPartner(p.id, { description: v })} />
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Security Manufacturers</h3>
                            <button onClick={addSPartner} className="px-4 py-2 bg-emerald-600/10 text-emerald-500 rounded-lg text-[10px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all">+ Add Manufacturer</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sPartners.map((p: any, idx: number) => (
                                <div key={idx} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl relative group">
                                    <button onClick={() => removeSPartner(idx)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-red-500 transition-all"><X className="w-4 h-4" /></button>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <Input field="Name" value={p.name} onChange={v => updateSPartner(idx, { name: v })} />
                                        <Input field="Brand" value={p.brand} onChange={v => updateSPartner(idx, { brand: v })} />
                                    </div>
                                    <Input field="URL" value={p.url} onChange={v => updateSPartner(idx, { url: v })} />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Security Tech Partners</h3>
                            <button onClick={addSTech} className="px-4 py-2 bg-emerald-600/10 text-emerald-500 rounded-lg text-[10px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all">+ Add Tech Partner</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sTechPartners.map((p: any, idx: number) => (
                                <div key={idx} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl relative group">
                                    <button onClick={() => removeSTech(idx)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-red-500 transition-all"><X className="w-4 h-4" /></button>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <Input field="Name" value={p.name} onChange={v => updateSTech(idx, { name: v })} />
                                        <Input field="Description" value={p.desc} onChange={v => updateSTech(idx, { desc: v })} />
                                    </div>
                                    <Input field="URL" value={p.url} onChange={v => updateSTech(idx, { url: v })} />
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

const CalendarManager = () => {
    const { holidays, setHolidays, saveCalendar } = usePrices();
    
    // Generate current month and next 5 months dynamically
    const months = React.useMemo(() => {
        const result = [];
        const now = new Date();
        for (let i = 0; i < 6; i++) {
            const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            result.push(`${year}-${month}`);
        }
        return result;
    }, []);

    const getDaysInMonth = (monthKey: string) => {
        const [year, month] = monthKey.split('-').map(Number);
        return new Date(year, month, 0).getDate();
    };

    const getMonthName = (monthKey: string) => {
        const [year, month] = monthKey.split('-').map(Number);
        return `${year}年 ${month}月`;
    };

    const getFirstDayOfMonth = (monthKey: string) => {
        const [year, month] = monthKey.split('-').map(Number);
        return new Date(year, month - 1, 1).getDay();
    };
    
    return (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-10">
            <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Holiday Settings</h3>
                <button onClick={saveCalendar} className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black text-xs shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 transition-all">
                    SAVE CALENDAR DATA
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {months.map(month => {
                    const daysCount = getDaysInMonth(month);
                    const firstDay = getFirstDayOfMonth(month);
                    return (
                        <div key={month} className="bg-black p-8 rounded-3xl border border-zinc-800 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-sm font-black text-white uppercase tracking-widest">{getMonthName(month)}</h4>
                                <span className="text-[10px] text-zinc-600 font-mono">{month}</span>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-4">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                    <div key={i} className={`text-[8px] font-black text-center ${i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-zinc-600'}`}>{d}</div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {/* Spacers for first day */}
                                {Array.from({ length: firstDay }).map((_, i) => (
                                    <div key={`empty-${i}`} className="aspect-square" />
                                ))}
                                {Array.from({ length: daysCount }, (_, i) => i + 1).map(day => {
                                    const active = (holidays[month] || []).includes(day);
                                    return (
                                        <button 
                                            key={day}
                                            onClick={() => {
                                                const current = holidays[month] || [];
                                                const next = active ? current.filter(d => d !== day) : [...current, day].sort((a,b) => a-b);
                                                setHolidays(month, next);
                                            }}
                                            className={`aspect-square rounded-lg font-black text-[10px] transition-all flex items-center justify-center ${
                                                active 
                                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                                                    : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 p-8 bg-zinc-900/20 border border-zinc-800/50 rounded-3xl">
                <div className="flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-zinc-600 mt-1" />
                    <div className="space-y-1">
                        <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Helpful Note</p>
                        <p className="text-xs text-zinc-600 font-bold leading-relaxed">
                            火曜日と金曜日はシステムにより「自動定休日」として設定されています。<br />
                            ここで選択した日付は、その定休日を **反転（営業日に変更）** させる、または **臨時休業を追加** するために使用されます。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const KnowledgeManager = () => {
    const { securityKnowledge, setSecurityKnowledge } = usePrices();
    const [subTab, setSubTab] = useState<'methods' | 'faqs' | 'menu'>('methods');
    const [editingItem, setEditingItem] = useState<any>(null);

    const theftMethods = securityKnowledge.theftMethods || [];
    const faqs = securityKnowledge.faqs || [];
    const menuCategories = securityKnowledge.menuCategories || [];

    const handleAddItem = () => {
        if (subTab === 'methods') {
            const newItem = { id: Date.now().toString(), title: 'New Theft Method', slug: 'method-' + Date.now(), description: '', content: '' };
            setSecurityKnowledge({ ...securityKnowledge, theftMethods: [newItem, ...theftMethods] });
            setEditingItem(newItem);
        } else if (subTab === 'faqs') {
            const newItem = { id: Date.now().toString(), question: 'New Question', answer: '', category: 'General' };
            setSecurityKnowledge({ ...securityKnowledge, faqs: [newItem, ...faqs] });
            setEditingItem(newItem);
        }
    };

    const handleUpdateItem = (id: string, updates: any) => {
        let nextKnowledge = { ...securityKnowledge };
        if (subTab === 'methods') {
            nextKnowledge.theftMethods = theftMethods.map(item => item.id === id ? { ...item, ...updates } : item);
        } else if (subTab === 'faqs') {
            nextKnowledge.faqs = faqs.map(item => item.id === id ? { ...item, ...updates } : item);
        }
        setSecurityKnowledge(nextKnowledge);
        if (editingItem?.id === id) setEditingItem({ ...editingItem, ...updates });
    };

    const handleRemoveItem = (id: string) => {
        if (!confirm('Are you sure?')) return;
        let nextKnowledge = { ...securityKnowledge };
        if (subTab === 'methods') {
            nextKnowledge.theftMethods = theftMethods.filter(item => item.id !== id);
        } else if (subTab === 'faqs') {
            nextKnowledge.faqs = faqs.filter(item => item.id !== id);
        }
        setSecurityKnowledge(nextKnowledge);
        if (editingItem?.id === id) setEditingItem(null);
    };

    return (
        <div className="space-y-10">
            <div className="flex gap-4 p-1.5 bg-zinc-900/50 rounded-2xl w-fit">
                <button onClick={() => {setSubTab('methods'); setEditingItem(null);}} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${subTab === 'methods' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-zinc-500 hover:text-white'}`}>Theft Methods</button>
                <button onClick={() => {setSubTab('faqs'); setEditingItem(null);}} className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${subTab === 'faqs' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-zinc-500 hover:text-white'}`}>FAQ Library</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">{subTab === 'methods' ? 'Theft Articles' : 'Q&A Items'}</h3>
                        <button onClick={handleAddItem} className="p-2 bg-emerald-600/10 text-emerald-500 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"><Plus className="w-5 h-5" /></button>
                    </div>
<div className="space-y-3">
                        {(subTab === 'methods' ? theftMethods : faqs).map((item: any) => (
                            <div 
                                key={item.id}
                                onClick={() => setEditingItem(item)}
                                className={`p-5 rounded-2xl border cursor-pointer transition-all ${editingItem?.id === item.id ? 'bg-emerald-600/10 border-emerald-600' : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'}`}
                            >
                                <h4 className="font-black text-white text-sm truncate">{subTab === 'methods' ? item.title : item.question}</h4>
                                <p className="text-[10px] text-zinc-500 font-mono mt-1">{subTab === 'methods' ? `/${item.slug}` : item.category}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {editingItem ? (
                        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black text-white uppercase italic">Edit {subTab === 'methods' ? 'Article' : 'FAQ'}</h3>
                                <button onClick={() => handleRemoveItem(editingItem.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-all"><Trash2 className="w-5 h-5" /></button>
                            </div>
                            
                            <div className="space-y-6">
                                {subTab === 'methods' ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input field="Title" value={editingItem.title} onChange={v => handleUpdateItem(editingItem.id, { title: v })} />
                                            <Input field="URL Slug" value={editingItem.slug} onChange={v => handleUpdateItem(editingItem.id, { slug: v })} />
                                        </div>
                                        <Input field="Link URL (Optional)" value={editingItem.link || ''} onChange={v => handleUpdateItem(editingItem.id, { link: v })} />
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Description</label>
                                            <textarea value={editingItem.description} onChange={e => handleUpdateItem(editingItem.id, { description: e.target.value })} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs h-24" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Full Content (HTML)</label>
                                            <textarea value={editingItem.content} onChange={e => handleUpdateItem(editingItem.id, { content: e.target.value })} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-[10px] font-mono h-64" placeholder="<p>Article body here...</p>" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Input field="Question" value={editingItem.question} onChange={v => handleUpdateItem(editingItem.id, { question: v })} />
                                        <Input field="Category" value={editingItem.category} onChange={v => handleUpdateItem(editingItem.id, { category: v })} />
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Answer</label>
                                            <textarea value={editingItem.answer} onChange={e => handleUpdateItem(editingItem.id, { answer: e.target.value })} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs h-48" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-[2.5rem] text-zinc-700">
                            <BookOpen className="w-12 h-12 mb-4 opacity-20" />
                            <p className="font-black italic uppercase tracking-widest">Select an item to edit</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AssetManager = () => {
    const { assets, updateAssets } = useSite();
    return (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-10 space-y-10">
            <div>
                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-6">Global Site Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input field="Hero Main Image" value={assets?.heroImage || ''} onChange={(v: string) => updateAssets({ heroImage: v })} />
                    <Input field="Security Hero Image" value={assets?.securityHeroImage || ''} onChange={(v: string) => updateAssets({ securityHeroImage: v })} />
                </div>
            </div>

            <div className="pt-8 border-t border-zinc-800/80">
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-2">ショップ Info (店舗施設ギャラリー画像)</h3>
                <p className="text-xs text-zinc-500 font-bold mb-6">トップページおよび各ページの「SHOP INFO」セクションに表示される店舗ギャラリー写真のパスを設定できます。</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input field="ショールーム画像 (Showroom)" value={assets?.showroomImage || ''} placeholder="例: /images/Top/showroom.webp" onChange={(v: string) => updateAssets({ showroomImage: v })} />
                    <Input field="ピット画像 (Pit)" value={assets?.pitImage || ''} placeholder="例: /images/Top/pit.webp" onChange={(v: string) => updateAssets({ pitImage: v })} />
                    <Input field="ワークスペース画像 (Workspace)" value={assets?.workspaceImage || ''} placeholder="例: /images/Top/workspace.webp" onChange={(v: string) => updateAssets({ workspaceImage: v })} />
                    <Input field="試聴室画像 (Audition Room)" value={assets?.auditionRoomImage || ''} placeholder="例: /images/Top/auditionRoom.webp" onChange={(v: string) => updateAssets({ auditionRoomImage: v })} />
                </div>
            </div>
        </div>
    );
};

const AuditionSpeakerManager = () => {
    const { auditionSpeakers, setAuditionSpeakers } = usePrices();

    const handleUpdateBrand = (index: number, updates: any) => {
        const newList = [...auditionSpeakers];
        newList[index] = { ...newList[index], ...updates };
        setAuditionSpeakers(newList);
    };

    const handleAddBrand = () => {
        const newBrand = {
            brand: "NEW BRAND",
            origin: "Japan",
            image: "/images/Audio/Speaker/door-b.webp",
            status: "Available",
            units: [
                { model: "モデル名", price: "30000", status: "Available", image: "/images/Top/speaker.webp" }
            ]
        };
        setAuditionSpeakers([...auditionSpeakers, newBrand]);
    };

    const handleRemoveBrand = (index: number) => {
        if (confirm('この試聴ブランドを削除しますか？')) {
            const newList = auditionSpeakers.filter((_, i) => i !== index);
            setAuditionSpeakers(newList);
        }
    };

    const handleAddUnit = (bIdx: number) => {
        const newList = [...auditionSpeakers];
        const units = newList[bIdx].units ? [...newList[bIdx].units!] : [];
        units.push({ model: "新モデル", price: "0", status: "Available", image: "/images/Top/speaker.webp" });
        newList[bIdx] = { ...newList[bIdx], units };
        setAuditionSpeakers(newList);
    };

    const handleRemoveUnit = (bIdx: number, uIdx: number) => {
        const newList = [...auditionSpeakers];
        const units = (newList[bIdx].units || []).filter((_, i) => i !== uIdx);
        newList[bIdx] = { ...newList[bIdx], units };
        setAuditionSpeakers(newList);
    };

    const handleUpdateUnit = (bIdx: number, uIdx: number, updates: any) => {
        const newList = [...auditionSpeakers];
        const units = [...(newList[bIdx].units || [])];
        units[uIdx] = { ...units[uIdx], ...updates };
        newList[bIdx] = { ...newList[bIdx], units };
        setAuditionSpeakers(newList);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">AUDITION (常時試聴ユニット管理)</h3>
                    <p className="text-xs text-zinc-400 font-bold mt-1">トップページの「AUDITION (SONIC EXPERIENCE CENTER)」に表示されるブランド・試聴可能ユニットを編集できます。</p>
                </div>
                <button 
                    onClick={handleAddBrand}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                    <Plus className="w-4 h-4" /> ブランドを追加
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {auditionSpeakers.map((b, bIdx) => (
                    <div key={bIdx} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] space-y-6 relative group">
                        <button 
                            onClick={() => handleRemoveBrand(bIdx)}
                            className="absolute top-6 right-6 p-2 text-zinc-600 hover:text-red-500 transition-all"
                            title="ブランド削除"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input field="ブランド名 (Brand)" value={b.brand || ''} onChange={(v: string) => handleUpdateBrand(bIdx, { brand: v })} />
                            <Input field="原産国 / 説明 (Origin)" value={b.origin || ''} onChange={(v: string) => handleUpdateBrand(bIdx, { origin: v })} />
                            <Input field="カード表示画像パス (Image)" value={b.image || ''} placeholder="例: /images/Audio/Speaker/door-b.webp" onChange={(v: string) => handleUpdateBrand(bIdx, { image: v })} />
                        </div>

                        {/* Units list */}
                        <div className="space-y-4 pt-4 border-t border-zinc-800/80">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest">試聴可能ユニット・モデル一覧</h4>
                                <button 
                                    onClick={() => handleAddUnit(bIdx)}
                                    className="px-3 py-1.5 bg-blue-600/10 text-blue-500 border border-blue-500/20 rounded-lg text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all"
                                >
                                    + ユニット追加
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(b.units || []).map((unit, uIdx) => (
                                    <div key={uIdx} className="bg-black/40 border border-zinc-800 p-4 rounded-2xl space-y-3 relative">
                                        <button 
                                            onClick={() => handleRemoveUnit(bIdx, uIdx)}
                                            className="absolute top-3 right-3 text-zinc-600 hover:text-red-500"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input field="モデル名" value={unit.model || unit.name || ''} onChange={(v: string) => handleUpdateUnit(bIdx, uIdx, { model: v, name: v })} />
                                            <Input field="価格 (税込)" value={unit.price || ''} onChange={(v: string) => handleUpdateUnit(bIdx, uIdx, { price: v })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input field="ユニット画像パス" value={unit.image || ''} placeholder="例: /images/Top/speaker.webp" onChange={(v: string) => handleUpdateUnit(bIdx, uIdx, { image: v })} />
                                            <Input field="YouTube URL" value={unit.youtube || ''} placeholder="https://..." onChange={(v: string) => handleUpdateUnit(bIdx, uIdx, { youtube: v })} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PeripheralProductManager = () => {
    const { plans, updatePrice, updateCategory, addItem, removeItem, addCategory, removeCategory } = usePrices();
    const [selectedCatId, setSelectedCatId] = useState('dashcam');
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [originalName, setOriginalName] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    
    const othersCategories = plans.filter(p => 
        p.type === 'others' && 
        p.id !== 'safety_device' && 
        p.id !== 'campit'
    );
    const currentCat = othersCategories.find(c => c.id === selectedCatId) || othersCategories[0];

    useEffect(() => {
        if (!currentCat && othersCategories.length > 0) {
            setSelectedCatId(othersCategories[0].id);
        }
    }, [othersCategories, currentCat]);

    if (!currentCat && !isAddingCategory && othersCategories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-[3rem]">
                <Monitor className="w-16 h-16 text-zinc-700 mb-6" />
                <h3 className="text-xl font-black text-zinc-500 uppercase tracking-widest mb-8">No Categories Configured</h3>
                <button 
                    onClick={() => setIsAddingCategory(true)}
                    className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20"
                >
                    Create First Category
                </button>
            </div>
        );
    }

    const handleUpdateItem = (oldName: string, updates: any) => {
        updatePrice(selectedCatId, oldName, updates);
    };

    const startEditing = (item: any) => {
        setEditingItem(JSON.parse(JSON.stringify(item))); // Deep clone
        setOriginalName(item.name);
    };

    const handleAddProduct = () => {
        const newProduct = {
            name: `New Product ${currentCat.items.length + 1}`,
            price: "0",
            badge: "NEW",
            image: "/images/Security/drive_recorder/default.webp",
            features: [],
            description: "",
            slug: `new-product-${Date.now()}`,
            specSummary: [],
            detailedSections: []
        };
        addItem(selectedCatId, newProduct);
    };

    const handleAddCategory = () => {
        if (!newCategoryName) return;
        const id = newCategoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        const newCat = {
            id,
            category: newCategoryName,
            type: 'others',
            items: [],
            images: [],
            description: ""
        };
        addCategory(newCat as any);
        setSelectedCatId(id);
        setIsAddingCategory(false);
        setNewCategoryName('');
    };

    const handleDeleteCategory = () => {
        if (confirm(`本当にカテゴリ「${currentCat.category}」を削除しますか？内のすべての製品も削除されます。`)) {
            removeCategory(selectedCatId);
            if (othersCategories.length > 1) {
                const next = othersCategories.find(c => c.id !== selectedCatId);
                if (next) setSelectedCatId(next.id);
            }
        }
    };

    return (
        <>
        <div className="space-y-12">
            <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-zinc-900/50 p-2 rounded-3xl border border-zinc-800 w-fit">
                    {othersCategories.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setSelectedCatId(cat.id)}
                            className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                                selectedCatId === cat.id 
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                                : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                            {cat.category}
                        </button>
                    ))}
                    <button 
                        onClick={() => setIsAddingCategory(true)}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl text-zinc-500 hover:text-blue-500 hover:bg-blue-500/5 transition-all"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {isAddingCategory && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] flex items-end gap-6 max-w-2xl"
                >
                    <div className="flex-grow space-y-3">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">New Category Name</label>
                        <input 
                            autoFocus
                            type="text" 
                            value={newCategoryName}
                            onChange={e => setNewCategoryName(e.target.value)}
                            placeholder="e.g. Laser Detectors"
                            className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleAddCategory}
                            className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all"
                        >
                            <Check className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={() => setIsAddingCategory(false)}
                            className="bg-zinc-800 text-zinc-500 p-4 rounded-2xl hover:text-white transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </motion.div>
            )}

            {currentCat && (
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] p-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-6">
                            <div>
                                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">{currentCat.category}</h3>
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Manage lineup and specifications</p>
                            </div>
                            <button 
                                onClick={handleDeleteCategory}
                                className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-700 hover:text-red-500 hover:bg-red-500/5 transition-all mt-2"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={handleAddProduct}
                                className="flex items-center gap-3 px-6 py-3 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-xl shadow-emerald-600/5"
                            >
                                <Plus className="w-4 h-4" /> Add Product
                            </button>
                            <div className="text-[10px] font-black text-blue-500 bg-blue-500/10 border border-blue-500/20 px-4 py-3 rounded-xl uppercase tracking-widest">
                                {currentCat.items.length} Products
                            </div>
                        </div>
                    </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Category Name</label>
                            <input 
                                type="text"
                                value={currentCat.category || ''}
                                onChange={(e) => updateCategory(currentCat.id, { category: e.target.value, title: e.target.value })}
                                className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-3.5 text-white text-sm font-bold outline-none focus:border-blue-500"
                                placeholder="カテゴリー名"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Card Background Image (MENU背景画像パス)</label>
                            <input 
                                type="text"
                                value={currentCat.image || ''}
                                onChange={(e) => updateCategory(currentCat.id, { image: e.target.value })}
                                className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-3.5 text-white text-sm font-bold outline-none focus:border-blue-500"
                                placeholder="例: /images/Audio/Speaker/door-b.webp"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Category Description</label>
                        <textarea 
                            value={currentCat.description || ''}
                            onChange={(e) => updateCategory(currentCat.id, { description: e.target.value })}
                            className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm font-bold min-h-[100px]"
                            placeholder="Enter category introduction..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {currentCat.items.map(item => (
                            <div key={item.name} className="bg-black/40 border border-zinc-800 rounded-[2rem] overflow-hidden flex flex-col group hover:border-zinc-700 transition-all relative">
                                <button 
                                    onClick={() => {
                                        if(confirm(`製品「${item.name}」を削除しますか？`)) {
                                            removeItem(selectedCatId, item.name);
                                        }
                                    }}
                                    className="absolute top-4 left-4 z-10 w-10 h-10 bg-black/60 backdrop-blur-md border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <div className="aspect-video relative overflow-hidden bg-zinc-800">
                                    <img src={item.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="" />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">
                                            {item.badge || 'STANDARD'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 space-y-4">
                                    <div>
                                        <h4 className="font-black text-white text-lg tracking-tight leading-tight mb-1">{item.name}</h4>
                                        <p className="text-blue-500 font-black text-sm">¥{parseInt(item.price).toLocaleString()}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {item.features?.slice(0, 3).map((f: string, i: number) => (
                                            <span key={i} className="text-[9px] font-black text-zinc-600 bg-zinc-800/50 px-2 py-1 rounded-lg uppercase">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => startEditing(item)}
                                        className="w-full bg-zinc-800 hover:bg-blue-600 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all mt-4 shadow-xl"
                                    >
                                        Edit Details
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Add Product Placeholder Card */}
                        <button 
                            onClick={handleAddProduct}
                            className="bg-zinc-900/30 border border-dashed border-zinc-800 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group min-h-[300px]"
                        >
                            <div className="w-16 h-16 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                <Plus className="w-8 h-8" />
                            </div>
                            <span className="text-sm font-black text-zinc-500 uppercase tracking-widest">Add New Product</span>
                        </button>
                    </div>
                </div>
            </div>
        )}
        </div>

            {/* Editor Modal for Peripheral Product */}
            <AnimatePresence>
                {editingItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingItem(null)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-zinc-900 border border-zinc-800 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar p-12 shadow-2xl">
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20">
                                        <Monitor className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Product Editor</h3>
                                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">Refining {editingItem.name}</p>
                                    </div>
                                </div>
                                <button onClick={() => setEditingItem(null)} className="w-12 h-12 bg-black/40 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="space-y-6">
                                        <div className="px-4 text-[10px] font-black text-blue-500 uppercase tracking-widest">Base Information</div>
                                        <Input field="Product Name" value={editingItem.name} onChange={(v: string) => setEditingItem({...editingItem, name: v})} />
                                        <div className="grid grid-cols-2 gap-6">
                                            <Input field="Price (Excl. Tax)" value={editingItem.price} onChange={(v: string) => setEditingItem({...editingItem, price: v})} />
                                            <Input field="Badge" value={editingItem.badge || ''} onChange={(v: string) => setEditingItem({...editingItem, badge: v})} />
                                        </div>
                                        <Input field="Image Path" value={editingItem.image} onChange={(v: string) => setEditingItem({...editingItem, image: v})} />
                                        <Input field="YouTube Video ID" value={editingItem.youtubeId || ''} onChange={(v: string) => setEditingItem({...editingItem, youtubeId: v})} />
                                        <Input field="URL Slug" value={editingItem.slug || ''} onChange={(v: string) => setEditingItem({...editingItem, slug: v})} />
                                    </div>

                                    <div className="space-y-6">
                                        <div className="px-4 text-[10px] font-black text-blue-500 uppercase tracking-widest">Key Features</div>
                                        <div className="space-y-2">
                                            {(editingItem.features || []).map((f: string, i: number) => (
                                                <div key={i} className="flex gap-2">
                                                    <input 
                                                        type="text" 
                                                        value={f}
                                                        onChange={(e) => {
                                                            const next = [...editingItem.features];
                                                            next[i] = e.target.value;
                                                            setEditingItem({...editingItem, features: next});
                                                        }}
                                                        className="flex-grow bg-black border border-zinc-800 rounded-xl px-4 py-2 text-white text-xs font-bold"
                                                    />
                                                    <button 
                                                        onClick={() => {
                                                            const next = editingItem.features.filter((_: any, idx: number) => idx !== i);
                                                            setEditingItem({...editingItem, features: next});
                                                        }}
                                                        className="bg-red-500/10 text-red-500 p-2 rounded-xl border border-red-500/20 hover:bg-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => setEditingItem({...editingItem, features: [...(editingItem.features || []), '']})}
                                                className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-black py-3 rounded-xl text-[9px] uppercase tracking-widest"
                                            >
                                                + Add Feature
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Introduction Text</label>
                                        <div className="space-y-4">
                                            <Input
                                                field="タイトル"
                                                value={editingItem.title || ''}
                                                onChange={(v: string) => setEditingItem({ ...editingItem, title: v })}
                                            />
                                            <Input
                                                field="リンクURL (任意)"
                                                value={editingItem.link || ''}
                                                onChange={(v: string) => setEditingItem({ ...editingItem, link: v })}
                                            />
                                            <textarea 
                                                value={editingItem.description || ''}
                                                onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                                                className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm font-bold min-h-[120px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="px-4 text-[10px] font-black text-blue-500 uppercase tracking-widest">Specifications (Spec Summary)</div>
                                        <div className="space-y-4">
                                            {(editingItem.specSummary || []).map((spec: any, i: number) => (
                                                <div key={i} className="bg-black/40 border border-zinc-800 p-6 rounded-2xl space-y-4 relative group">
                                                    <button 
                                                        onClick={() => {
                                                            const next = editingItem.specSummary.filter((_: any, idx: number) => idx !== i);
                                                            setEditingItem({...editingItem, specSummary: next});
                                                        }}
                                                        className="absolute top-4 right-4 text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input field="Label" value={spec.label} onChange={(v: string) => {
                                                            const next = [...editingItem.specSummary];
                                                            next[i] = {...next[i], label: v};
                                                            setEditingItem({...editingItem, specSummary: next});
                                                        }} />
                                                        <Input field="Value" value={spec.value} onChange={(v: string) => {
                                                            const next = [...editingItem.specSummary];
                                                            next[i] = {...next[i], value: v};
                                                            setEditingItem({...editingItem, specSummary: next});
                                                        }} />
                                                    </div>
                                                    <Input field="Icon (Lucide name)" value={spec.icon} onChange={(v: string) => {
                                                        const next = [...editingItem.specSummary];
                                                        next[i] = {...next[i], icon: v};
                                                        setEditingItem({...editingItem, specSummary: next});
                                                    }} />
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => setEditingItem({...editingItem, specSummary: [...(editingItem.specSummary || []), { label: '', value: '', icon: 'Info' }]})}
                                                className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-black py-3 rounded-xl text-[9px] uppercase tracking-widest"
                                            >
                                                + Add Specification
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-zinc-800 flex justify-end gap-4">
                                <button 
                                    onClick={() => setEditingItem(null)}
                                    className="px-10 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        handleUpdateItem(originalName, editingItem);
                                        setEditingItem(null);
                                    }}
                                    className="px-12 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 shadow-2xl shadow-blue-600/20 transition-all transform hover:-translate-y-1"
                                >
                                    Confirm Changes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

const TemplateManager = () => {
    const { securityData, updateSecurityTemplate, addSecurityTemplate, removeSecurityTemplate } = usePrices();
    const [editingTemplate, setEditingTemplate] = useState<any>(null);

    const templates = (securityData as any).featuredPlanTemplates || [];

    const handleAdd = () => {
        const newTemplate = {
            id: 'template-' + Date.now(),
            name: 'New Template',
            title: 'New Featured Package',
            description: 'Description goes here...',
            tags: ['TAG 1', 'TAG 2'],
            feature1: { title: 'Feature 1', description: 'Feature 1 details...' },
            feature2: { title: 'Feature 2', description: 'Feature 2 details...' }
        };
        addSecurityTemplate(newTemplate);
        setEditingTemplate(newTemplate);
    };

    const handleUpdate = (id: string, updates: any) => {
        const template = templates.find((t: any) => t.id === id);
        if (template) {
            const updated = { ...template, ...updates };
            updateSecurityTemplate(updated);
            if (editingTemplate?.id === id) setEditingTemplate(updated);
        }
    };

    const handleRemove = (id: string) => {
        if (!confirm('Are you sure you want to delete this template? Any vehicles using it will revert to defaults.')) return;
        removeSecurityTemplate(id);
        if (editingTemplate?.id === id) setEditingTemplate(null);
    };

    const handleTagChange = (index: number, value: string) => {
        if (!editingTemplate) return;
        const nextTags = [...editingTemplate.tags];
        nextTags[index] = value;
        handleUpdate(editingTemplate.id, { tags: nextTags });
    };

    const addTag = () => {
        if (!editingTemplate) return;
        handleUpdate(editingTemplate.id, { tags: [...editingTemplate.tags, 'NEW TAG'] });
    };

    const removeTag = (index: number) => {
        if (!editingTemplate) return;
        handleUpdate(editingTemplate.id, { tags: editingTemplate.tags.filter((_: any, i: number) => i !== index) });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Patterns</h3>
                    <button onClick={handleAdd} className="p-2 bg-emerald-600/10 text-emerald-500 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"><Plus className="w-5 h-5" /></button>
                </div>
                <div className="space-y-3">
                    {templates.map((t: any) => (
                        <div 
                            key={t.id}
                            onClick={() => setEditingTemplate(t)}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all ${editingTemplate?.id === t.id ? 'bg-emerald-600/10 border-emerald-600' : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'}`}
                        >
                            <h4 className="font-black text-white text-sm truncate">{t.name}</h4>
                            <p className="text-[10px] text-zinc-500 font-mono mt-1">{t.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2">
                {editingTemplate ? (
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-white uppercase italic">Edit Template</h3>
                            <button onClick={() => handleRemove(editingTemplate.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-all"><Trash2 className="w-5 h-5" /></button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <Input field="Internal Name (Dashboard only)" value={editingTemplate.name} onChange={(v: string) => handleUpdate(editingTemplate.id, { name: v })} />
                            <Input field="Public Title (e.g. CANインベーダー対策パッケージ)" value={editingTemplate.title} onChange={(v: string) => handleUpdate(editingTemplate.id, { title: v })} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Description</label>
                            <textarea 
                                value={editingTemplate.description}
                                onChange={e => handleUpdate(editingTemplate.id, { description: e.target.value })}
                                className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-3 text-white font-bold h-24"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Tags / Threats</label>
                                <button onClick={addTag} className="text-[9px] font-black text-emerald-500 uppercase">+ Add Tag</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {editingTemplate.tags.map((tag: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-2 bg-black border border-zinc-800 rounded-lg pl-3 pr-1 py-1">
                                        <input 
                                            value={tag}
                                            onChange={e => handleTagChange(idx, e.target.value)}
                                            className="bg-transparent border-none outline-none text-[10px] font-bold text-white w-24"
                                        />
                                        <button onClick={() => removeTag(idx)} className="p-1 text-zinc-600 hover:text-red-500"><X className="w-3 h-3" /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4 p-6 bg-black/40 rounded-3xl border border-zinc-800">
                                <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">Feature Block 1</h4>
                                <Input field="Feature 1 Title" value={editingTemplate.feature1.title} onChange={(v: string) => handleUpdate(editingTemplate.id, { feature1: { ...editingTemplate.feature1, title: v } })} />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Feature 1 Description</label>
                                    <textarea 
                                        value={editingTemplate.feature1.description}
                                        onChange={e => handleUpdate(editingTemplate.id, { feature1: { ...editingTemplate.feature1, description: e.target.value } })}
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white h-20"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 p-6 bg-black/40 rounded-3xl border border-zinc-800">
                                <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">Feature Block 2</h4>
                                <Input field="Feature 2 Title" value={editingTemplate.feature2.title} onChange={(v: string) => handleUpdate(editingTemplate.id, { feature2: { ...editingTemplate.feature2, title: v } })} />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Feature 2 Description</label>
                                    <textarea 
                                        value={editingTemplate.feature2.description}
                                        onChange={e => handleUpdate(editingTemplate.id, { feature2: { ...editingTemplate.feature2, description: e.target.value } })}
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white h-20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center p-20 border-2 border-dashed border-zinc-800 rounded-[3rem] text-zinc-700">
                        <Layout className="w-16 h-16 mb-4 opacity-20" />
                        <p className="font-black italic text-xl uppercase tracking-widest">Select or create a template</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
