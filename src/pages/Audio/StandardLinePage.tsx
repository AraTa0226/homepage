import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ShieldCheck, Music, Settings, Zap, ArrowRight, Info, Wrench, MessageCircle, Calendar, ChevronDown, Menu as MenuIcon } from 'lucide-react';
import { usePrices } from '../../contexts/PriceContext';
import { MegaMenu } from '../../components/Menu/MegaMenu';

export const StandardLinePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plans, standardLineLanding, audioLPs } = usePrices();

  const pathSlug = location.pathname.split('/').filter(Boolean).pop() || 'sp-standard';
  const matchedLP = audioLPs?.find(p => p.slug === pathSlug) || standardLineLanding;

  const data = matchedLP || {
    header: {
      badge: "スタンダードライン",
      mainTitle: "STANDARD LINE",
      subTitle: "スピーカー交換パッケージ",
      description: "純正の音に不満がある方へ。音質アップの第一歩は確実なスピーカー交換から。ただユニットを取り替えるだけではなく、スピーカーの真価を発揮するための必須施工（ドアチューニング・専用バッフル・配線）をすべてセットにした、明朗会計のコミコミパッケージです。"
    },
    pricing: {
      specialPrice: "81840",
      normalPriceText: "通常目安: 117,700円",
      savingsText: "約 35,860円 お得!",
      note: "※KICKER CSS674（40,700円）を選択した場合の例。選ぶスピーカーの本体価格により総額は変動します。"
    },
    features: {
      doorTuning: { title: "ドアチューニング Bコース", desc: "薄い鉄板のドア内部の振動・共振を抑え、音の漏れを防ぐ制振・防音処理。（通常¥27,500相当）" },
      baffle: { title: "カスタムインナーバッフル", desc: "強固な土台を作り、不要な振動を徹底排除。音の立ち上がりと定位感が劇的に改善します。（通常¥11,000相当）" },
      cable: { title: "ANGオリジナルケーブル", desc: "オーディオテクニカ製ベースの高品位スピーカーケーブル(10m)で繊細な情報までロスなく伝送。（通常¥16,500相当）" }
    },
    upgrades: {
      courses: [
        { name: "B → A コース", price: "+¥11,000", desc: "フェリソニDS-1.5WP使用・制振材増量" },
        { name: "B → A+ コース", price: "+¥22,000", desc: "フェリソニC2使用・制振材増量" },
        { name: "B → S コース", price: "+¥33,000", desc: "DS-1.5WPをさらに増量。最新マテリアル高密度施工", pop: true },
        { name: "B → S+ コース", price: "+¥44,000", desc: "フェリソニC2を贅沢に使用。最高峰の制振・吸音・遮音" }
      ],
      options: { metalBaffleDiscount: "20% OFF", tweeterMountPrice: "¥46,200〜" }
    }
  };

  // Create audio categories exactly like MainPage
  const audioCategories = (Array.isArray(plans) ? plans : []).filter(p => p && p.type === 'audio').map(p => ({
      ...p,
      items: (Array.isArray(p.items) ? p.items : []).map((item: any) => {
          if (typeof item === 'string') return item;
          return item?.name || '';
      })
  }));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white pb-0">
      
      {/* --- ヘッダー領域 (フル幅) --- */}
      <div className="bg-gray-900 text-white pt-24 pb-16 px-6 md:px-12 lg:px-20 border-b-[8px] border-blue-600 relative z-40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Top Actions (Breadcrumb & Menu) */}
          <div className="flex justify-between items-center mb-10 relative z-20">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white font-bold text-sm flex items-center gap-2 transition-colors group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              トップページへ戻る
            </button>
            
            <div className="relative group/nav" ref={menuRef} onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors border border-gray-700 shadow-sm"
              >
                <MenuIcon className="w-4 h-4" />
                <span className="hidden sm:inline">MENU (他のプラン)</span>
                <span className="sm:hidden">Menu</span>
                <ChevronDown className={`w-4 h-4 transition-transform ml-1 ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <MegaMenu
                show={isMenuOpen}
                categories={audioCategories}
                theme="dark"
                onClose={() => setIsMenuOpen(false)}
                navigate={navigate}
                handleMenuClick={(item: any) => {
                  setIsMenuOpen(false);
                  navigate(item.path || `/audio/plan/${item.name}`);
                }}
                positionClassName="right-0 -mr-4 md:right-0 md:mr-0"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div className="text-3xl md:text-4xl font-black italic tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">SOUND ANG</div>
            <div className="text-left md:text-right">
              <div className="text-sm md:text-base font-bold text-gray-400 tracking-widest uppercase">Speaker Installation Package</div>
            </div>
          </div>

          <div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1]">
              <span className="block text-lg md:text-2xl text-gray-400 mb-3 tracking-[0.2em] font-bold">{data.header.badge}</span>
              {data.header.mainTitle}
              <span className="block text-2xl md:text-4xl text-blue-400 mt-4 tracking-widest font-bold">{data.header.subTitle}</span>
            </h1>
            <p className="text-gray-300 font-bold leading-relaxed max-w-4xl text-base md:text-lg mt-8 whitespace-pre-line">
              {data.header.description}
            </p>
          </div>
        </div>
      </div>

      {/* --- メインコンテンツ --- */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        
        {/* 価格ハイライト */}
        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-[2rem] p-10 md:p-14 mb-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-xl shadow-blue-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 blur-[80px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 w-full lg:w-auto">
            <div className="inline-block bg-blue-600 text-white text-sm md:text-base font-black px-5 py-2 rounded-full tracking-widest mb-6 shadow-md">
              パッケージ特別価格
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
              <div className="text-gray-500 line-through font-bold text-2xl">{data.pricing.normalPriceText}</div>
              <div className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter">
                {data.pricing.specialPrice.startsWith('¥') ? '' : '¥'}{parseInt(data.pricing.specialPrice.replace(/[^0-9]/g, '')) ? parseInt(data.pricing.specialPrice.replace(/[^0-9]/g, '')).toLocaleString() : data.pricing.specialPrice}<span className="text-2xl md:text-3xl text-gray-600 font-bold ml-2">〜(税込)</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-bold bg-white/80 inline-block px-4 py-2 rounded-lg border border-gray-100">
              {data.pricing.note}
            </p>
          </div>
          
          <div className="relative z-10 bg-white rounded-3xl shadow-xl shadow-blue-900/10 border border-blue-100 p-8 md:p-10 text-center shrink-0 w-full lg:w-auto transform lg:rotate-2 lg:hover:rotate-0 transition-transform duration-300">
            <div className="text-sm md:text-base font-black text-gray-500 tracking-widest mb-3">通常個別施工より</div>
            <div className="text-3xl md:text-4xl font-black text-red-600 tracking-tighter">{data.pricing.savingsText}</div>
          </div>
        </div>

        {/* 3つの重要画像セクション */}
        <div className="mb-28">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
              <Settings className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">音質を決定づける「3つの重要施工」を標準装備</h2>
          </div>
          <p className="text-base md:text-lg text-gray-600 mb-12 font-bold leading-relaxed max-w-4xl">
            スピーカーの性能を100%引き出すためには、ただ取り付けるだけでは不十分です。本パッケージは以下の必須環境づくりがすべて含まれています。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              { 
                title: data.features.doorTuning.title, 
                desc: data.features.doorTuning.desc, 
                image: data.features.doorTuning.image || "/images/Audio/Speaker/door-b.webp" 
              },
              { 
                title: data.features.baffle.title, 
                desc: data.features.baffle.desc, 
                image: data.features.baffle.image || "/images/Audio/Speaker/baffle.webp" 
              },
              { 
                title: data.features.cable.title, 
                desc: data.features.cable.desc, 
                image: data.features.cable.image || "/images/Audio/Speaker/ang-cable.webp" 
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/40 group">
                <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8 md:p-10 relative z-10 bg-white">
                  <h3 className="font-black text-xl md:text-2xl text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed font-bold">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2カラム構成：パッケージの残り＆アップグレード */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-10">
          
          {/* 左カラム：その他のパッケージ内容 */}
          <div>
            <div className="flex items-center gap-5 mb-10 border-b-[4px] border-gray-100 pb-6">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200">
                <Music className="w-7 h-7 text-gray-900" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">パッケージ全内容（まとめ）</h2>
            </div>
            
            <ul className="space-y-4">
              {[
                { num: "01", title: "17cmモデル2WAYスピーカー", desc: "10万円までのモデルから選択（※詳細は別紙参照）" },
                { num: "02", title: data.features.doorTuning.title, value: "通常 ¥27,500", desc: "制振・防音処理" },
                { num: "03", title: data.features.baffle.title, value: "通常 ¥11,000", desc: "専用マウント製作" },
                { num: "04", title: data.features.cable.title, value: "通常 ¥16,500", desc: "オーディオテクニカ製¥1,500/m相当×10m計算" },
                { num: "05", title: "ツィーター取付", desc: "純正位置、もしくはオンダッシュ取り付け" },
                { num: "06", title: "ワイヤリング工賃", value: "通常 ¥22,000", desc: "正確な配線と極性チェックを含む" }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-5 p-6 rounded-3xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-900/5 transition-all items-center justify-between group">
                  <div className="flex gap-5 items-start w-full">
                    <div className="text-2xl font-black text-blue-200 italic shrink-0 w-10 pt-1 group-hover:text-blue-500 transition-colors">{item.num}</div>
                    <div className="flex-1">
                      <h3 className="font-black text-gray-900 text-base md:text-lg leading-tight mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-tight font-bold">{item.desc}</p>
                    </div>
                    {item.value && (
                      <div className="shrink-0 text-right">
                        <span className="text-xs md:text-sm font-black text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm whitespace-nowrap">{item.value}</span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 右カラム：アップグレードオプション */}
          <div>
            <div className="flex items-center gap-5 mb-10 border-b-[4px] border-gray-100 pb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <Zap className="w-7 h-7 text-blue-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">アップグレード オプション</h2>
            </div>
            <p className="text-base font-bold text-gray-600 mb-10 leading-relaxed">
              基本の「Bコース」から、制振・吸音処理のグレードアップが可能です。（パッケージ同時施工の特別価格）
            </p>
            
            <div className="grid grid-cols-1 gap-4 mb-10">
              {data.upgrades.courses.map((opt, idx) => (
                <div key={idx} className={`flex justify-between items-center p-6 border-2 rounded-3xl transition-all ${opt.pop ? 'border-blue-500 bg-blue-50/40 shadow-lg shadow-blue-900/5 transform hover:-translate-y-1' : 'border-gray-100 bg-white hover:border-blue-200'}`}>
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-black text-base md:text-lg text-gray-900">{opt.name}</span>
                      {opt.pop && <span className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md font-black tracking-widest shadow-sm">おすすめ</span>}
                    </div>
                    <div className="text-sm text-gray-500 font-bold">{opt.desc}</div>
                  </div>
                  <div className="font-black text-blue-600 text-xl md:text-2xl whitespace-nowrap ml-6">{opt.price}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="bg-white border border-gray-200 rounded-3xl flex-1 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all overflow-hidden group">
                <div className="h-32 md:h-40 bg-gray-100 overflow-hidden relative border-b border-gray-100">
                  <img src={data.upgrades.options.metalBaffleImage || "/images/Audio/Speaker/metal.webp"} alt="メタルバッフル" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 text-center">
                  <span className="block text-gray-400 text-xs mb-2 tracking-widest uppercase font-black">高剛性化</span>
                  <span className="text-base md:text-lg font-black text-gray-900">メタルバッフル変更 <br/><span className="text-blue-600 text-xl md:text-2xl mt-1 inline-block">{data.upgrades.options.metalBaffleDiscount}</span></span>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-3xl flex-1 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all overflow-hidden group">
                <div className="h-32 md:h-40 bg-gray-100 overflow-hidden relative border-b border-gray-100">
                  <img src={data.upgrades.options.tweeterMountImage || "/images/Audio/Speaker/tw-mount.webp"} alt="ツィーター埋込" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 text-center">
                  <span className="block text-gray-400 text-xs mb-2 tracking-widest uppercase font-black">理想の音像定位</span>
                  <span className="text-base md:text-lg font-black text-gray-900">ツィーター埋込 <br/><span className="text-blue-600 text-xl md:text-2xl mt-1 inline-block">{data.upgrades.options.tweeterMountPrice}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- フッター / 注意事項 (フル幅) --- */}
      <div className="bg-gray-900 text-gray-400 py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t-[8px] border-gray-800 pb-36 md:pb-48">
        <div className="max-w-6xl mx-auto flex flex-col justify-center items-center">
          
          <div className="w-full max-w-4xl bg-gray-800/50 p-8 md:p-10 rounded-3xl border border-gray-700">
            <h4 className="text-lg md:text-xl font-black text-white mb-8 flex items-center gap-3">
              <Info className="w-6 h-6 text-blue-500" /> 施工に関する注意事項
            </h4>
            <ul className="text-sm md:text-base space-y-4 font-bold">
              <li className="flex items-start gap-4"><span className="text-blue-500 mt-1">●</span> 作業は<strong className="text-white mx-1 font-black border-b border-gray-600">1日お車をお預かり</strong>します（無料代車をご用意可能です）。</li>
              <li className="flex items-start gap-4"><span className="text-blue-500 mt-1">●</span> バッフル適合がない車種は別途<strong className="text-white mx-1 font-black">¥5,500</strong>の製作費が必要になります。</li>
              <li className="flex items-start gap-4"><span className="text-blue-500 mt-1">●</span> ツィーター固定にマウント等が必要な車種は追加費用が発生する場合があります。</li>
              <li className="flex items-start gap-4"><span className="text-blue-500 mt-1">●</span> ドア通線に加工が必要な車両（ハーネスがカプラ等）は別途加工費用がかかる場合があります。</li>
            </ul>
          </div>

        </div>
      </div>

      {/* --- 追従フッター (CTA) --- */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] p-4 md:p-6">
        <div className="max-w-4xl mx-auto flex gap-3 md:gap-6 justify-center">
          <a 
            href="https://page.line.me/312qjhsq?openQrModal=true"
            target="_blank" rel="noopener noreferrer"
            className="flex-1 bg-[#06C755] text-white py-4 md:py-5 rounded-2xl font-black text-sm md:text-lg tracking-widest hover:bg-[#05b34c] transition-colors shadow-lg shadow-[#06C755]/20 flex items-center justify-center gap-2 md:gap-3"
          >
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-current" />
            <span className="hidden sm:inline">LINEで無料相談</span>
            <span className="sm:hidden">LINEで相談</span>
          </a>
          <button 
            onClick={() => navigate('/reservation')}
            className="flex-1 bg-blue-600 text-white py-4 md:py-5 rounded-2xl font-black text-sm md:text-lg tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 md:gap-3"
          >
            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
            <span className="hidden sm:inline">来店予約フォーム</span>
            <span className="sm:hidden">来店予約</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default StandardLinePage;
