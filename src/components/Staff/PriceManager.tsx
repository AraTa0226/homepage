import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Save, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { usePrices, PlanCategory, OptionalService, formatPrice } from '../../contexts/PriceContext';

interface PriceManagerProps {
  onBack: () => void;
}

export const PriceManager: React.FC<PriceManagerProps> = ({ onBack }) => {
  const { plans, optionals, bulkUpdatePrices } = usePrices();
  const [localPlans, setLocalPlans] = useState<PlanCategory[]>(JSON.parse(JSON.stringify(plans)));
  const [localOptionals, setLocalOptionals] = useState<OptionalService[]>(JSON.parse(JSON.stringify(optionals)));
  const [adjustment, setAdjustment] = useState<string>("0");
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePriceChange = (catId: string, itemName: string, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setLocalPlans(prev => prev.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          items: cat.items.map(item => 
            item.name === itemName ? { ...item, price: numericValue } : item
          )
        };
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

  const handleSave = () => {
    bulkUpdatePrices(localPlans, localOptionals);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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

  const handleReset = () => {
    setLocalPlans(JSON.parse(JSON.stringify(plans)));
    setLocalOptionals(JSON.parse(JSON.stringify(optionals)));
  };

  const filteredPlans = localPlans.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  const filteredOptionals = localOptionals.filter(opt => 
    opt.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-black tracking-tighter">STAFF PRICE MANAGER</h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">価格一括管理システム</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              リセット
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              <Save className="w-4 h-4" />
              すべての変更を保存
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search and Bulk Adjustment Tool */}
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

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <RefreshCw className="w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="プラン名やカテゴリーで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-lg font-bold w-full focus:ring-0 placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-2xl font-black shadow-2xl z-[100] flex items-center gap-3"
          >
            <CheckCircle2 className="w-6 h-6" />
            価格の更新が完了しました！
          </motion.div>
        )}

        {/* Excel-like Table */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Category</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Item Name</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-200">Current Display</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">New Price (Edit)</th>
                </tr>
              </thead>
              <tbody>
                {/* Optional Services Section */}
                {filteredOptionals.length > 0 && (
                  <>
                    <tr className="bg-blue-50/50">
                      <td colSpan={4} className="px-6 py-3 text-xs font-black text-blue-600 uppercase tracking-widest border-b border-gray-200">
                        オプションメニュー
                      </td>
                    </tr>
                    {filteredOptionals.map((opt) => (
                      <tr key={opt.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border-r border-gray-100">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Optional</span>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <div className="font-black text-gray-900">{opt.name}</div>
                          <div className="text-[10px] text-gray-400 font-bold">{opt.effect}</div>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <div className="font-black text-blue-600">{formatPrice(opt.price)}</div>
                        </td>
                        <td className="px-6 py-4">
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
                      </tr>
                    ))}
                  </>
                )}

                {/* Main Plans Sections */}
                {filteredPlans.map((cat) => (
                  <React.Fragment key={cat.id}>
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="px-6 py-3 text-xs font-black text-gray-600 uppercase tracking-widest border-b border-gray-200">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((item) => (
                      <tr key={item.name} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border-r border-gray-100">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cat.id}</span>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <div className="font-black text-gray-900">{item.name}</div>
                          <div className="text-[10px] text-gray-400 font-bold">{item.badge}</div>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <div className="font-black text-blue-600">{formatPrice(item.price)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative flex items-center">
                            <span className="absolute left-3 font-black text-gray-400 text-sm">¥</span>
                            <input 
                              type="text" 
                              value={item.price}
                              onChange={(e) => handlePriceChange(cat.id, item.name, e.target.value)}
                              className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg font-black text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
