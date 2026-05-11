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
  Trash2,
  AlertCircle,
  Zap,
  ChevronRight,
  Eye,
  Search,
  Layout,
  Type,
  Image as ImageIcon,
  Users,
  Calendar as CalendarIcon,
  Check,
  BookOpen,
  HelpCircle,
  FileText,
  Monitor,
  Globe
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
    removeItem
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

  const [activeTab, setActiveTab] = useState<'vehicles' | 'security' | 'announcements' | 'recruitment' | 'events' | 'knowledge' | 'audio' | 'partners' | 'calendar' | 'assets' | 'others'>('vehicles');
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
    window.location.href = '/'; // Hard redirect to home
  };

  const forceReset = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] w-full max-w-md backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-blue-600/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white italic tracking-tighter">ADMIN ACCESS v4</h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">Sound ANG Management System (Strict)</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-white focus:border-blue-600 transition-colors outline-none font-bold"
            />
            <button className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10">
              AUTHENTICATE
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <button 
              onClick={forceReset}
              className="w-full text-zinc-600 hover:text-zinc-400 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-3 h-3" />
              Force Logout & Clear Cache
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-72 bg-zinc-900 border-r border-zinc-800 z-50 flex flex-col overflow-y-auto custom-scrollbar">
        <div className="p-8 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white text-lg tracking-tighter italic leading-none">ANG ADMIN v4</span>
              <span className="text-[9px] font-black text-blue-500 tracking-widest uppercase mt-1">Strict Auth Mode</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-1 mt-4">
          <div className="px-4 mb-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Main Products</div>
          <NavItem active={activeTab === 'vehicles'} onClick={() => setActiveTab('vehicles')} icon={Car} label="Vehicle Config" />
          <NavItem active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={ShieldCheck} label="Security Plans" />
          <NavItem active={activeTab === 'audio'} onClick={() => setActiveTab('audio')} icon={Music} label="Audio Menu" />
          <NavItem active={activeTab === 'others'} onClick={() => setActiveTab('others')} icon={Monitor} label="Peripherals" />
          
          <div className="px-4 mb-2 mt-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Marketing</div>
          <NavItem active={activeTab === 'announcements'} onClick={() => setActiveTab('announcements')} icon={Megaphone} label="Alerts & News" />
          <NavItem active={activeTab === 'recruitment'} onClick={() => setActiveTab('recruitment')} icon={Layout} label="Recruitment" />
          <NavItem active={activeTab === 'events'} onClick={() => setActiveTab('events')} icon={Globe} label="EVENTS" />
          <NavItem active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} icon={BookOpen} label="Knowledge & FAQ" />
          
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
          {activeTab === 'announcements' && <AnnouncementManager />}
          {activeTab === 'recruitment' && <RecruitmentManager />}
          {activeTab === 'events' && <EventManager />}
          {activeTab === 'knowledge' && <KnowledgeManager />}
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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);
  const [currentSlug, setCurrentSlug] = useState(slug);

  useEffect(() => {
    if (isEditing) {
        setFormData(data);
        setCurrentSlug(slug);
    }
  }, [isEditing, data, slug]);

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
        canguard: false
      }
    };
    setFormData({ ...formData, plans: [...(formData.plans || []), newPlan] });
  };

  const removePlan = (index: number) => {
    const next = [...formData.plans];
    next.splice(index, 1);
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
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
                        <div className="flex items-center gap-4">
                           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                           <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Security Plans Configuration</h4>
                        </div>
                        <button 
                            onClick={addPlan}
                            className="group flex items-center gap-3 text-[11px] font-black text-emerald-400 hover:text-white uppercase tracking-widest bg-emerald-500/10 hover:bg-emerald-500 px-6 py-3 rounded-2xl transition-all duration-300"
                        >
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add New Plan
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {(formData.plans || []).map((p: any, i: number) => (
                            <div key={i} className="bg-zinc-900/60 border border-zinc-800 rounded-[2rem] overflow-hidden group/plan hover:border-zinc-700 transition-colors">
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
                                        onClick={() => removePlan(i)}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-700 hover:text-red-500 hover:bg-red-500/10 transition-all"
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
                                            {[
                                                { id: 'triple', label: 'トリプル' },
                                                { id: 'tilt', label: '傾斜' },
                                                { id: 'bonnet', label: 'ボンネット' },
                                                { id: 'microwave', label: 'マイクロ波' },
                                                { id: 'siren', label: 'サイレン' },
                                                { id: 'algorithm', label: 'アルゴリズム' },
                                                { id: 'canguard', label: 'CANガード' },
                                                { id: 'keyless', label: 'キーレス連動' }
                                            ].map(f => (
                                                <button 
                                                    key={f.id}
                                                    onClick={() => {
                                                        const next = [...formData.plans];
                                                        next[i] = { 
                                                            ...next[i], 
                                                            features: { 
                                                                ...(next[i].features || {}), 
                                                                [f.id]: !next[i].features?.[f.id] 
                                                            } 
                                                        };
                                                        setFormData({ ...formData, plans: next });
                                                    }}
                                                    className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-300 ${
                                                        p.features?.[f.id] 
                                                        ? 'bg-blue-600/10 border-blue-500/50 text-blue-400' 
                                                        : 'bg-black/20 border-zinc-800 text-zinc-600 hover:border-zinc-700'
                                                    }`}
                                                >
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{f.label}</span>
                                                    <div className={`w-2 h-2 rounded-full ${p.features?.[f.id] ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-zinc-800'}`}></div>
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
    const { plans, updatePrice } = usePrices();
    const securityPlans = plans.filter(p => p.type === 'security');
  
    return (
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
    );
};

const AudioPlanManager = () => {
    const { plans, updatePrice } = usePrices();
    const audioPlans = plans.filter(p => p.type === 'audio');
  
    return (
      <div className="grid grid-cols-1 gap-8">
         {audioPlans.map(cat => (
          <div key={cat.id} className="bg-zinc-900/30 border border-zinc-800 rounded-[2rem] p-10">
            <h3 className="text-2xl font-black text-white italic tracking-tighter mb-8">{cat.title}</h3>
            <div className="space-y-3">
              {cat.items.map(item => (
                <div key={item.name} className="bg-black/40 border border-zinc-800/50 p-5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.image} className="w-12 h-12 rounded-lg object-cover bg-zinc-800" alt="" />
                    <div>
                      <h4 className="font-black text-white text-sm leading-none mb-1">{item.name}</h4>
                      <p className="text-zinc-600 text-[10px] font-medium">{cat.subtitle}</p>
                    </div>
                  </div>
                  <input 
                    type="text" 
                    defaultValue={item.price}
                    onBlur={(e) => updatePrice(cat.id, item.name, { price: e.target.value })}
                    className="w-32 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white font-black text-right"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
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
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-10">
            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-8">Global Site Assets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Input field="Hero Main Image" value={assets?.heroImage || ''} onChange={(v: string) => updateAssets({ heroImage: v })} />
                <Input field="Security Hero Image" value={assets?.securityHeroImage || ''} onChange={(v: string) => updateAssets({ securityHeroImage: v })} />
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

                <div className="space-y-4">
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

export default AdminDashboard;
