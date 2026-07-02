import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ShieldCheck, Music, Settings, Zap, ArrowRight, Info, Wrench, MessageCircle, Calendar, ChevronDown, Menu as MenuIcon, Sparkles, Disc, Layers, Headphones, ChevronRight, Youtube } from 'lucide-react';
import { usePrices } from '../../contexts/PriceContext';
import { MegaMenu } from '../../components/Menu/MegaMenu';
import { FloatingCTA } from '../../components/Shared/FloatingCTA';

export const StandardLinePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plans, standardLineLanding, audioLPs } = usePrices();

  const pathSlug = location.pathname.startsWith('/') ? location.pathname.substring(1) : location.pathname;
  const matchedLP = audioLPs?.find(p => p.slug === pathSlug) || (pathSlug === 'sp-standard' ? standardLineLanding : null);
  
  const finalLP = matchedLP;
  // data is defined below after null check

  // Create audio categories - preserve objects to keep link info for dynamic LPs
  const audioCategories = (Array.isArray(plans) ? plans : []).filter(p => p && p.type === 'audio').map(p => ({
      ...p,
      items: (Array.isArray(p.items) ? p.items : [])
  }));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const parsePrice = (priceStr: any) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    const str = priceStr.toString();
    return parseInt(str.replace(/[^0-9]/g, '')) || 0;
  };


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
  }, [finalLP, pathSlug]);

  // If no LP found for this slug, redirect to home
  if (!finalLP && pathSlug !== 'sp-standard') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-black text-gray-200 mb-4">404</div>
          <p className="text-gray-500 font-bold mb-8">ページが見つかりません</p>
          <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black">トップへ戻る</button>
        </div>
      </div>
    );
  }

  const data = finalLP || {
    header: {
      badge: "スタンダードライン",
      mainTitle: "STANDARD LINE",
      subTitle: "スピーカー交換パッケージ",
      description: "純正の音に不満がある方へ。音質アップの第一歩は確実なスピーカー交換から。"
    },
    pricing: {
      specialPrice: "81840",
      fixedPrice: 41140,
      normalPriceText: "通常目安: 117,700円",
      savingsText: "約 35,860円 お得!",
      note: "※KICKER CSS674（40,700円）を選択した場合の例。"
    },
    features: {
      doorTuning: { title: "ドアチューニング Bコース", desc: "制振施工。", image: "/images/Audio/Speaker/door-b.webp" },
      baffle: { title: "カスタムインナーバッフル", desc: "バーチ材バッフル。", image: "/images/Audio/Speaker/baffle.webp" },
      cable: { title: "ANGオリジナルケーブル", desc: "高品位ケーブル。", image: "/images/Audio/Speaker/ang-cable.webp" }
    },
    upgrades: {
      courses: [],
      options: { metalBaffleDiscount: "20% OFF", tweeterMountPrice: "¥46,200〜" }
    }
  };

  const calculateAppliedPrice = (spk: any) => {
    if (!spk) return 0;
    const isString = typeof spk === 'string';
    const standalonePrice = isString ? spk : spk.standalonePrice;
    const speakerPrice = parsePrice(standalonePrice);
    const fixedFee = parsePrice(!isString && spk.fixedPriceOverride !== undefined && spk.fixedPriceOverride !== ''
      ? spk.fixedPriceOverride
      : (data.pricing?.fixedPrice || 0));
    return speakerPrice + fixedFee;
  };

  const floatingCTASection = data.sections?.find(s => s.type === 'floating_cta');
  const showFloatingCTA = !!floatingCTASection || !!data.showFloatingCTA;
  const ctaConfig = floatingCTASection?.data || {};

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white pb-24 md:pb-28 print:pb-0">
      
      {/* Dynamic Sections Rendering */}
      {data.sections && data.sections.length > 0 ? (
        <>
          {/* Navigation Overlay (Fixed) */}
          <div className="fixed top-8 right-8 z-50 flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="bg-white/90 backdrop-blur-md shadow-lg text-gray-900 font-bold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 border border-gray-100"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" /> HOME
            </button>
            <div className="relative group/nav" ref={menuRef} onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-900 shadow-xl text-white font-bold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors border border-gray-800"
              >
                <MenuIcon className="w-3.5 h-3.5" /> MENU <ChevronDown className={"w-3.5 h-3.5 transition-transform " + (isMenuOpen ? 'rotate-180' : '')} />
              </button>
              <MegaMenu show={isMenuOpen} categories={audioCategories} theme="dark" onClose={() => setIsMenuOpen(false)} navigate={navigate} handleMenuClick={(item) => { setIsMenuOpen(false); navigate(item.path || `/audio/plan/${item.name}`); }} positionClassName="right-0 -mr-4 md:right-0 md:mr-0" />
            </div>
          </div>

          {console.log('Rendering sections:', data.sections)}
          {(() => {
            const groupedSections: any[] = [];
            let currentGroup: any[] = [];

            data.sections.forEach((section: any) => {
              const sectionWidth = section.data?.sectionWidth || 'full';
              if (sectionWidth === 'full') {
                if (currentGroup.length > 0) {
                  groupedSections.push({ type: 'grid_group', sections: currentGroup });
                  currentGroup = [];
                }
                groupedSections.push(section);
              } else {
                currentGroup.push(section);
              }
            });
            if (currentGroup.length > 0) {
              groupedSections.push({ type: 'grid_group', sections: currentGroup });
            }

            const renderSectionContent = (section: any) => {
              switch(section.type) {
              case 'hero':
                return (
                  <div 
                    key={section.id} 
                    className={`pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b-[8px] border-blue-600 relative overflow-hidden ${section.data.useDarkTheme !== false ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                    style={section.data.bgColor ? { backgroundColor: section.data.bgColor } : {}}
                  >
                    {section.data.image && (
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={section.data.image} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          style={{ opacity: section.data.imageOpacity ?? 0.3 }} 
                        />
                        {section.data.useDarkTheme !== false && (
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent"></div>
                        )}
                      </div>
                    )}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="max-w-6xl mx-auto relative z-10">
                      <div className={`text-3xl md:text-4xl font-black italic tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-12 uppercase`}>SOUND ANG</div>
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
                        <span className={`block text-[lg] md:text-2xl ${section.data.useDarkTheme !== false ? 'text-gray-400' : 'text-gray-500'} mb-3 tracking-[0.2em] font-bold`}>
                          {section.data.badge || data.header?.badge || ''}
                        </span>
                        {section.data.mainTitle || section.data.title || data.header?.mainTitle || ''}
                        <span className="block text-2xl md:text-4xl text-blue-400 mt-4 tracking-widest font-bold">
                          {section.data.subTitle || section.data.subtitle || data.header?.subTitle || ''}
                        </span>
                      </h1>
                      <p className={`${section.data.useDarkTheme !== false ? 'text-gray-300' : 'text-gray-600'} font-bold leading-relaxed max-w-4xl text-base md:text-lg whitespace-pre-line`}>
                        {section.data.description || section.data.desc || data.header?.description || ''}
                      </p>
                    </div>
                  </div>
                );
              case 'pricing':
                return (
                  <div key={section.id} className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20">
                    <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-[3rem] p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-xl shadow-blue-900/5 relative overflow-hidden">
                      <div className="relative z-10 w-full lg:w-auto">
                        <div className="inline-block bg-blue-600 text-white text-[15px] font-black px-5 py-2 rounded-full tracking-widest mb-6">PACKAGE PRICE</div>
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                          {(section.data.normalPriceText || section.data.normalPrice) && (
                            <div className="text-gray-500 line-through font-bold text-2xl">
                              {section.data.normalPriceText || `通常価格: ${section.data.normalPrice}`}
                            </div>
                          )}
                          <div className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter">
                            ¥{parsePrice(section.data.specialPrice || section.data.fixedPrice || 0).toLocaleString()}
                            <span className="text-2xl md:text-3xl text-gray-600 font-bold ml-2">〜(税込)</span>
                          </div>
                        </div>
                        <p className="text-[15px] text-gray-500 font-bold bg-white/80 inline-block px-4 py-2 rounded-lg border border-gray-100">{section.data.note || data.pricing?.note || ''}</p>
                      </div>
                      {section.data.savingsText && (
                        <div className="relative z-10 bg-white rounded-3xl shadow-xl border border-blue-100 p-8 md:p-10 text-center shrink-0 w-full lg:w-auto transform lg:rotate-2">
                          <div className="text-[15px] font-black text-gray-500 tracking-widest mb-3">通常個別施工より</div>
                          <div className="text-3xl md:text-4xl font-black text-red-600 tracking-tighter">{section.data.savingsText}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              case 'features':
                return (
                  <div key={section.id} className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-24">
                    {(section.data.title || section.data.description) && (
                      <div className="mb-12">
                        {section.data.title && (
                          <div className="flex items-center gap-5 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                              <Settings className="w-7 h-7 text-blue-600" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{section.data.title}</h2>
                          </div>
                        )}
                        {section.data.description && (
                          <p className="text-base md:text-lg text-gray-600 font-bold leading-relaxed max-w-4xl">{section.data.description}</p>
                        )}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                      {[
                        { title: section.data.doorTuning?.title, desc: section.data.doorTuning?.desc, image: section.data.doorTuning?.image || "/images/Audio/Speaker/door-b.webp" },
                        { title: section.data.baffle?.title, desc: section.data.baffle?.desc, image: section.data.baffle?.image || "/images/Audio/Speaker/baffle.webp" },
                        { title: section.data.cable?.title, desc: section.data.cable?.desc, image: section.data.cable?.image || "/images/Audio/Speaker/ang-cable.webp" }
                      ].filter(f => f.title).map((f: any, i: number) => (
                        <div key={i} className="group relative">
                          <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-2xl relative">
                            <img src={f.image} alt={f.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            <div className="absolute bottom-6 left-6 text-white font-black text-4xl italic opacity-20">0{i+1}</div>
                          </div>
                          <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                            <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                            {f.title}
                          </h3>
                          <p className="text-gray-600 font-bold leading-relaxed text-[15px] md:text-base">{f.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              case 'upgrades':
                return (
                  <div key={section.id} className="bg-gray-50 py-24 px-6 md:px-12 lg:px-20">
                    <div className="max-w-6xl mx-auto">
                      <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
                        <div className="md:w-1/3">
                          {section.data.title ? (
                            <h2 className="text-4xl font-black text-gray-900 italic tracking-tighter uppercase mb-6 leading-none">
                              {section.data.title}
                            </h2>
                          ) : (
                            <h2 className="text-4xl font-black text-gray-900 italic tracking-tighter uppercase mb-6 leading-none">
                              Upgrade<br />
                              <span className="text-blue-600">Options</span>
                            </h2>
                          )}
                          <p className="text-gray-500 font-bold leading-relaxed">
                            {section.data.subtitle || "より高みを目指す方への、特別なチューニング・オプション。施工と同時にお申し込みいただくことで、お得なパッケージ価格で提供いたします。"}
                          </p>
                        </div>
                        <div className="md:w-2/3 space-y-4">
                          {/* Upgrade Courses (Door Tuning, etc) - NO IMAGES */}
                          {(section.data.courses || []).map((c: any, i: number) => (
                            <div key={i} className={`flex gap-5 p-6 rounded-3xl border items-center justify-between transition-all group ${c.pop ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-gray-100 hover:shadow-xl'}`}>
                              <div className="flex gap-5 items-center flex-1">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${c.pop ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                                  <Zap className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <h3 className="font-black text-gray-900 text-lg leading-tight">{c.name}</h3>
                                    {c.pop && <span className="bg-blue-600 text-white text-[12px] font-black px-2 py-1 rounded-full uppercase tracking-widest">おすすめ</span>}
                                  </div>
                                  <p className="text-[15px] text-gray-500 font-bold mt-2 leading-relaxed">{c.desc}</p>
                                </div>
                              </div>
                              <div className="text-xl font-black text-blue-600 shrink-0 bg-white px-6 py-3 rounded-2xl border border-blue-100 shadow-sm ml-4">{c.price}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hardware Options (Metal Baffle, Tweeter Mount) - PROMINENT WITH IMAGES */}
                      {(section.data.options?.metalBaffleDiscount || section.data.options?.tweeterMountPrice) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-16">
                          {section.data.options?.metalBaffleDiscount && (
                            <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500 flex flex-col">
                              <div className="aspect-[16/9] overflow-hidden relative">
                                <img src={section.data.options?.metalBaffleImage || "/images/Audio/Speaker/metal.webp"} alt="Metal Baffle" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-6 left-6">
                                  <div className="bg-black/60 backdrop-blur-md text-white text-[12px] font-black px-4 py-2 rounded-full tracking-widest uppercase border border-white/20">高剛性化</div>
                                </div>
                              </div>
                              <div className="p-10 flex flex-col flex-grow">
                                <h4 className="text-2xl font-black text-gray-900 mb-2">メタルバッフル</h4>
                                <p className="text-[15px] text-gray-500 font-bold mb-8 flex-grow leading-relaxed">{section.data.options?.metalBaffleDesc || 'より高剛性な土台を求める方へ。ドアの振動を抑え、解像度の高い低域再生を実現します。'}</p>
                                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                  <div className="text-[12px] font-black text-gray-400 tracking-widest uppercase">特別価格</div>
                                  <div className="text-3xl font-black text-blue-600">{section.data.options?.metalBaffleDiscount}</div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {section.data.options?.tweeterMountPrice && (
                            <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500 flex flex-col">
                              <div className="aspect-[16/9] overflow-hidden relative">
                                <img src={section.data.options?.tweeterMountImage || "/images/Audio/Speaker/tw-mount.webp"} alt="Tweeter Mount" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-6 left-6">
                                  <div className="bg-black/60 backdrop-blur-md text-white text-[12px] font-black px-4 py-2 rounded-full tracking-widest uppercase border border-white/20">理想的な定位</div>
                                </div>
                              </div>
                              <div className="p-10 flex flex-col flex-grow">
                                <h4 className="text-2xl font-black text-gray-900 mb-2">ツィーター埋込加工</h4>
                                <p className="text-[15px] text-gray-500 font-bold mb-8 flex-grow leading-relaxed">{section.data.options?.tweeterMountDesc || '理想的な音像定位を実現する、ピラー埋め込み加工。ステージが目の前に広がるような臨場感を生み出します。'}</p>
                                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                  <div className="text-[12px] font-black text-gray-400 tracking-widest uppercase">参考価格</div>
                                  <div className="text-3xl font-black text-blue-600">{section.data.options?.tweeterMountPrice}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              case 'speakers': {
                const sectionWidth = section.data?.sectionWidth || 'full';
                const speakersList = section.data?.speakers && section.data.speakers.length > 0
                  ? section.data.speakers
                  : (data.speakers || []);
                
                const sectionFixedPrice = parsePrice(section.data?.fixedPrice !== undefined && section.data.fixedPrice !== null && section.data.fixedPrice !== ''
                  ? section.data.fixedPrice
                  : (data.pricing?.fixedPrice || 0));

                const displayMode = section.data?.displayMode || 'standard';

                const calculateAppliedPriceForSection = (spk: any) => {
                  if (!spk) return 0;
                  const isString = typeof spk === 'string';
                  const standalonePrice = isString ? spk : spk.standalonePrice;
                  const speakerPrice = parsePrice(standalonePrice);
                  const fixedFee = !isString && spk.fixedPriceOverride !== undefined && spk.fixedPriceOverride !== ''
                    ? parsePrice(spk.fixedPriceOverride)
                    : sectionFixedPrice;
                  return speakerPrice + fixedFee;
                };

                const sectionTitle = section.data?.title || "Speaker Lineup";
                const sectionSubtitle = section.data?.subtitle || "Selected high-quality units";

                const totalSpeakers = speakersList.length;
                const cols = section.data?.columns || 3;
                let gridColsClass = "lg:grid-cols-3";
                if (cols === 2) gridColsClass = "lg:grid-cols-2";
                if (cols === 4) gridColsClass = "lg:grid-cols-4";
                let gridContainerClass = `grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-10`;
                if (sectionWidth !== 'full') {
                  gridContainerClass = "grid grid-cols-1 gap-6 w-full";
                } else if (totalSpeakers === 1) {
                  gridContainerClass = "max-w-md mx-auto";
                } else if (totalSpeakers === 2) {
                  gridContainerClass = "grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto";
                }

                const spacing = section.data?.borderSpacing || 'standard';
                let spacingClass = "pb-8 mb-16";
                let minHClass = "min-h-[90px] md:min-h-[120px] lg:min-h-[140px]";
                if (spacing === 'narrow') {
                  spacingClass = "pb-4 mb-8";
                  minHClass = "min-h-0";
                } else if (spacing === 'wide') {
                  spacingClass = "pb-12 mb-20";
                }

                const font = section.data?.subtitleFont || 'sans';
                let fontClass = "font-sans";
                if (font === 'serif') fontClass = "font-serif";
                if (font === 'mono') fontClass = "font-mono";

                const wrapperPadding = sectionWidth === 'full'
                  ? "max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-24 w-full"
                  : "px-4 md:px-6 lg:px-8 py-16 w-full h-full flex flex-col justify-start bg-white border border-gray-100 rounded-[2.5rem] shadow-sm";

                return (
                  <div key={section.id} className={wrapperPadding}>
                    <div className={(sectionWidth === 'full' ? 'flex-grow' : '') + " flex flex-col justify-start w-full"}>
                      {(!section.data?.hideTitle || !section.data?.hideSubtitle) && (
                        <div className={`flex flex-col md:flex-row items-baseline justify-between gap-4 border-b-4 border-gray-900 ${minHClass} ${spacingClass}`}>
                          {!section.data?.hideTitle && (
                            <h2 className="text-5xl md:text-7xl font-black text-gray-900 italic tracking-tighter uppercase leading-none" dangerouslySetInnerHTML={{ __html: sectionTitle.includes('<br') || sectionTitle.includes('\n') ? sectionTitle.replace(/\n/g, '<br />') : sectionTitle }} />
                          )}
                          {!section.data?.hideSubtitle && (() => {
                            const isTitleHidden = !!section.data?.hideTitle;
                            const align = section.data?.subtitleAlign || 'right';
                            
                            let alignClasses = "ml-auto text-right";
                            if (isTitleHidden) {
                              if (align === 'left') alignClasses = "mr-auto text-left";
                              else if (align === 'center') alignClasses = "mx-auto text-center";
                            }
                            
                            return (
                               <p 
                                 className={`text-gray-500 font-black tracking-widest uppercase text-[15px] whitespace-pre-line ${alignClasses} ${fontClass}`} 
                                 style={{
                                   fontSize: section.data?.subtitleFontSize ? `${section.data.subtitleFontSize}px` : undefined,
                                   color: section.data?.subtitleColor || undefined
                                 }}
                                 dangerouslySetInnerHTML={{ __html: sectionSubtitle.includes('\n') || sectionSubtitle.includes('<br') ? sectionSubtitle.replace(/\n/g, '<br />') : sectionSubtitle }} 
                               />
                            );
                          })()}
                        </div>
                      )}
                      {section.data?.content && (
                        <div 
                          className="text-gray-600 font-bold text-[16px] leading-relaxed mb-12 max-w-4xl"
                          dangerouslySetInnerHTML={{ 
                            __html: section.data.content.includes('\n') 
                              ? section.data.content.replace(/\n/g, '<br />') 
                              : section.data.content 
                          }}
                        />
                      )}
                      {section.data?.sectionImage && (
                        <div className="flex justify-center mb-20 w-full">
                          <div className="aspect-[16/10] w-full max-w-2xl rounded-[2.5rem] overflow-hidden border border-zinc-200/80 shadow-[0_15px_45px_-20px_rgba(0,0,0,0.08)] bg-zinc-50/50 p-6 md:p-12 flex items-center justify-center">
                            <img 
                              src={section.data.sectionImage} 
                              alt={sectionTitle} 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                        </div>
                      )}
                      {section.data?.showPackageSummary && (
                        <div className="mb-20">
                          <div className="flex items-center gap-5 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                              <Music className="w-7 h-7 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{section.data.packageSummaryTitle || 'パッケージに含まれる内容'}</h3>
                              {section.data.packageSummarySubtitle && (
                                <p className="text-[15px] text-gray-500 font-bold mt-2">{section.data.packageSummarySubtitle}</p>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(section.data.packageSummaryItems || []).map((item: any, i: number) => (
                              <div key={i} className="flex gap-5 p-6 rounded-3xl bg-gray-50 border border-gray-100 items-center justify-between hover:bg-white hover:shadow-xl transition-all group">
                                <div className="flex gap-5 items-center">
                                  <div className="text-2xl font-black text-blue-200 group-hover:text-blue-400 italic transition-colors">0{i+1}</div>
                                  <div>
                                    <h4 className="font-black text-gray-900 text-lg leading-tight">{item.title}</h4>
                                    {item.desc && <p className="text-[15px] text-gray-500 font-bold mt-1">{item.desc}</p>}
                                  </div>
                                </div>
                                {item.value && <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-black text-gray-600 shadow-sm">{item.value}</div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={gridContainerClass + (sectionWidth !== 'full' ? " flex-grow flex flex-col" : "")}>
                      {speakersList.map((spk: any, i: number) => {
                        const rawBrand = (spk.brand || '').trim();
                        const displayBrand = rawBrand === 'ICKER' ? 'KICKER' : rawBrand;
                        return (
                          <div key={i} className="group flex flex-col h-full bg-white border border-zinc-200/80 rounded-[2.5rem] overflow-hidden shadow-[0_15px_45px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.1),0_15px_30px_-10px_rgba(0,0,0,0.04)] hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-500 ease-out">
                            {displayMode !== 'no_image' && displayMode !== 'text_only' && (
                              <div className="aspect-square relative overflow-hidden bg-zinc-50/50 flex items-center justify-center p-12 group-hover:bg-zinc-100/50 border-b border-zinc-100 transition-colors duration-500">
                                <img src={spk.image} alt={`${displayBrand} ${spk.name}`} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-xl" />
                                <div className="absolute top-6 left-6 animate-fade-in">
                                  {spk.brandLogo ? (
                                    <div className={`backdrop-blur-md px-4 py-2 rounded-2xl h-11 flex items-center justify-center shadow-lg border ${
                                      spk.logoBg === 'light' 
                                        ? 'bg-zinc-100/95 border-zinc-200/80' 
                                        : 'bg-black/80 border-white/20'
                                    }`}>
                                      <img 
                                        src={spk.brandLogo} 
                                        alt={displayBrand} 
                                        className="h-full object-contain max-w-[110px]" 
                                      />
                                    </div>
                                  ) : (
                                    <div className="bg-black/80 backdrop-blur-md text-white text-[12px] font-black px-4 py-2 rounded-full tracking-widest uppercase border border-white/20 shadow-lg">{displayBrand}</div>
                                  )}
                                </div>
                                {spk.youtubeUrl && (
                                  <a 
                                    href={spk.youtubeUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute top-6 right-6 z-10 w-11 h-11 bg-black/60 hover:bg-[#FF0000] backdrop-blur-md text-white hover:text-white border border-white/10 rounded-full flex items-center justify-center shadow-lg hover:shadow-red-600/40 transition-all duration-300 hover:scale-110 active:scale-95"
                                    title="YouTubeで試聴音源を聴く"
                                  >
                                    <Youtube className="w-5 h-5 shrink-0" />
                                  </a>
                                )}
                              </div>
                            )}
                            <div className="p-8 flex flex-col flex-grow justify-between">
                            {(displayMode === 'no_image' || displayMode === 'text_only') && displayBrand && (
                              <div className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">{displayBrand}</div>
                            )}
                            <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{spk.name}</h3>
                            
                            {spk.youtubeUrl && (displayMode === 'no_image' || displayMode === 'text_only') && (
                              <a 
                                href={spk.youtubeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 text-xs font-black text-red-600 hover:text-red-500 mb-4 transition-colors w-fit"
                                title="YouTubeで試聴音源を聴く"
                              >
                                <Youtube className="w-4 h-4 shrink-0" />
                                <span>YouTubeで試聴</span>
                              </a>
                            )}

                            {/* Technical Specs */}
                            {(displayMode === 'standard' || displayMode === 'no_image') && (
                              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
                                {spk.mountingHoleSize && (
                                  <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">取付穴径</span>
                                    <span className="text-base font-black text-gray-800">{spk.mountingHoleSize}</span>
                                  </div>
                                )}
                                {spk.depthSize && (
                                  <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">取付奥行</span>
                                    <span className="text-base font-black text-gray-800">{spk.depthSize}</span>
                                  </div>
                                )}
                                {spk.hasGrille && (
                                  <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">グリル</span>
                                    <span className="text-base font-black text-gray-800">{spk.hasGrille}</span>
                                  </div>
                                )}
                                {spk.hasTweeterMount && (
                                  <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">TWマウント</span>
                                    <span className="text-base font-black text-gray-800">{spk.hasTweeterMount}</span>
                                  </div>
                                )}
                              </div>
                            )}

                            {spk.showCardSummary && (
                              <div className="mb-6 bg-gray-50/50 rounded-2xl border border-gray-100 p-4 space-y-2 text-left">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">パッケージ内容</div>
                                <div className="space-y-1.5">
                                  {(spk.cardSummaryItems || []).map((item: any, cIdx: number) => (
                                    <div key={cIdx} className="flex justify-between items-center text-sm text-gray-700 font-bold border-b border-gray-100/50 last:border-0 pb-1.5 last:pb-0">
                                      <div>
                                        <span className="font-bold text-gray-800">{item.title}</span>
                                        {item.desc && <span className="text-xs text-gray-400 font-normal ml-2">({item.desc})</span>}
                                      </div>
                                      {item.value && <span className="text-xs text-gray-500 font-black">{item.value}</span>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {spk.remarks && <p className="text-gray-600 text-base font-bold mb-8 flex-grow leading-relaxed" dangerouslySetInnerHTML={{ __html: '● ' + spk.remarks.replace(/\n/g, '<br />') }} />}
                            
                            <div className="pt-6 border-t border-gray-100">
                              {spk.prices && spk.prices.length > 0 ? (
                                <div className="space-y-4">
                                  {spk.prices.map((pItem: any, pIdx: number) => {
                                    const priceVal = parsePrice(pItem.price);
                                    const taxExcluded = Math.round(priceVal / (1 + (data.pricing?.taxRate || 10) / 100));
                                    return (
                                      <div key={pIdx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{pItem.label || 'パッケージ合計 (税込)'}</div>
                                        <div className="flex justify-between items-end">
                                          <div className="flex items-baseline gap-2">
                                            <div className="text-2xl font-black text-blue-600 tracking-tighter">¥{priceVal.toLocaleString()}</div>
                                            <div className="text-xs text-gray-400 uppercase italic">incl. tax</div>
                                          </div>
                                          <div className="text-right">
                                            <span className="text-xs text-gray-400 uppercase tracking-tighter mr-1">(税別)</span>
                                            <span className="text-base font-black text-gray-600 italic">¥{taxExcluded.toLocaleString()}</span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="flex justify-between items-end">
                                  <div>
                                    <div className="text-base font-bold text-gray-500 tracking-widest uppercase mb-1">パッケージ合計 (税込)</div>
                                    <div className="flex items-baseline gap-2">
                                      <div className="text-3xl font-black text-blue-600 tracking-tighter">¥{calculateAppliedPriceForSection(spk).toLocaleString()}</div>
                                      <div className="text-xs text-gray-400 uppercase italic">incl. tax</div>
                                    </div>
                                  </div>
                                  <div className="text-right pb-1">
                                    <div className="text-xs text-gray-400 uppercase tracking-tighter">(税別)</div>
                                    <div className="text-base font-black text-gray-600 italic">¥{Math.round(calculateAppliedPriceForSection(spk) / (1 + (data.pricing.taxRate || 10) / 100)).toLocaleString()}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    </div>
                  </div>
                );
              }
              case 'text':
                return (
                  <div key={section.id} className="max-w-4xl mx-auto px-6 py-20">
                    {section.data.title && <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-10 tracking-tighter italic uppercase">{section.data.title}</h2>}
                    <div className="prose prose-lg max-w-none text-gray-600 font-bold leading-relaxed" dangerouslySetInnerHTML={{ __html: section.data.content || '' }} />
                  </div>
                );
              case 'banner':
                return (
                  <div 
                    key={section.id} 
                    className="relative overflow-hidden group border-b-[8px] border-blue-600" 
                    style={{ 
                      height: section.data.height || '400px',
                      backgroundColor: section.data.bgColor || undefined
                    }}
                  >
                    {section.data.image && (
                      <img src={section.data.image} alt={section.data.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6" style={{ backgroundColor: `rgba(0,0,0,${section.data.opacity !== undefined && section.data.opacity !== null ? section.data.opacity : 0.4})` }}>
                      <div className="max-w-4xl">
                        {section.data.badge && (
                          <div 
                            className="text-gray-300 font-bold text-sm md:text-[15px] tracking-[0.2em] uppercase mb-2 animate-fade-in drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-pre-line"
                            dangerouslySetInnerHTML={{ 
                              __html: section.data.badge.includes('\n') 
                                ? section.data.badge.replace(/\n/g, '<br />') 
                                : section.data.badge 
                            }}
                          />
                        )}
                        {section.data.subTitle && <div className="text-blue-400 font-black text-[15px] md:text-base tracking-[0.3em] uppercase mb-4 animate-fade-in drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{section.data.subTitle}</div>}
                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">{section.data.title}</h2>
                        {section.data.description && (
                          <p className="text-gray-100 text-sm md:text-base font-bold mt-6 max-w-2xl mx-auto leading-relaxed animate-fade-in whitespace-pre-line drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                            {section.data.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              case 'link_cards': {
                const cardItems = section.data?.items || [];
                const sectionTitle = section.data?.title;
                const sectionSubtitle = section.data?.subtitle;
                return (
                  <div key={section.id} className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-24 border-b border-gray-100">
                    {(sectionTitle || sectionSubtitle) && (
                      <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-16 border-b-4 border-gray-900 pb-8">
                        {sectionTitle && (
                          <h2 className="text-4xl md:text-6xl font-black text-gray-900 italic tracking-tighter uppercase leading-none" dangerouslySetInnerHTML={{ __html: sectionTitle.includes('<br') || sectionTitle.includes('\n') ? sectionTitle.replace(/\n/g, '<br />') : sectionTitle }} />
                        )}
                        {sectionSubtitle && (
                          <p className="text-gray-500 font-black tracking-widest uppercase text-[15px]">{sectionSubtitle}</p>
                        )}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {cardItems.map((item: any, i: number) => {
                        const handleClick = () => {
                          if (!item.slug) return;
                          if (item.slug.startsWith('http://') || item.slug.startsWith('https://')) {
                            window.open(item.slug, '_blank', 'noopener,noreferrer');
                          } else {
                            const path = item.slug.startsWith('/') ? item.slug : `/${item.slug}`;
                            navigate(path);
                          }
                        };
                        return (
                          <div 
                            key={i} 
                            onClick={handleClick}
                            className="group flex flex-col h-full bg-white border border-gray-150 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2 cursor-pointer transition-all duration-500 shadow-sm"
                          >
                            <div className="aspect-[16/10] relative overflow-hidden bg-zinc-50 flex items-center justify-center">
                              {item.badge && (
                                <div className="absolute top-5 left-5 z-10">
                                  <span className="inline-block bg-blue-600 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full tracking-widest uppercase shadow-lg border border-blue-500/20">
                                    {item.badge}
                                  </span>
                                </div>
                              )}
                              {item.image ? (
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center p-8 text-center text-white/50 text-xs font-black uppercase">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                              <h3 className="text-2xl font-black text-gray-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors duration-300 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: (item.title || 'Untitled Card').replace(/\n/g, '<br />') }} />
                              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-blue-600 font-black text-sm tracking-wider uppercase">
                                <span>{item.linkText || '詳しく見る'}</span>
                                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              case 'cta':
                return (
                  <div key={section.id} className="max-w-6xl mx-auto px-6 py-20">
                    <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
                      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 italic uppercase">{section.data.title}</h2>
                        <p className="text-blue-100 text-lg md:text-xl font-bold mb-12 max-w-2xl mx-auto">{section.data.desc}</p>
                        <button onClick={() => navigate(section.data.btnLink || '/reservation')} className="group bg-white text-blue-600 px-12 py-6 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all flex items-center gap-4 mx-auto uppercase tracking-tighter italic">
                          {section.data.btnText || 'Contact Us'} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              case 'faq':
                return (
                  <div key={section.id} className="max-w-4xl mx-auto px-6 py-24">
                    <div className="text-center mb-16">
                      <div className="inline-block bg-gray-100 text-gray-500 text-[12px] font-black px-4 py-2 rounded-full tracking-widest uppercase mb-4">{section.data.subtitle || 'Questions & Answers'}</div>
                      <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter italic uppercase">{section.data.title || 'よくあるご質問'}</h2>
                    </div>
                    <div className="space-y-6">
                      {(section.data.items || []).map((faq:any, i:number) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 hover:shadow-xl transition-all">
                          <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 font-black text-xl italic">Q</div>
                            <div className="flex-grow">
                              <h4 className="text-xl font-black text-gray-900 mb-4">{faq.q}</h4>
                              <div className="flex gap-6 pt-6 border-t border-gray-50">
                                <div className="text-gray-400 font-black text-xl italic shrink-0">A</div>
                                <p className="text-gray-600 font-bold leading-relaxed">{faq.a}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              case 'gallery':
                return (
                  <div key={section.id} className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(section.data.images || []).map((img:string, i:number) => (
                        <div key={i} className={`relative overflow-hidden rounded-3xl aspect-square group ${i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                          <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              case 'package_summary':
                return (
                  <div key={section.id} className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20">
                    <div className="flex items-center gap-5 mb-12">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Music className="w-7 h-7 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{section.data.title || 'パッケージ全内容'}</h2>
                        {section.data.subtitle && (
                          <p className="text-[15px] text-gray-500 font-bold mt-2">{section.data.subtitle}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(section.data.items || []).map((item: any, i: number) => (
                        <div key={i} className="flex gap-5 p-6 rounded-3xl bg-gray-50 border border-gray-100 items-center justify-between hover:bg-white hover:shadow-xl transition-all group">
                          <div className="flex gap-5 items-center">
                            <div className="text-2xl font-black text-blue-200 group-hover:text-blue-400 italic transition-colors">0{i+1}</div>
                            <div>
                              <h3 className="font-black text-gray-900 text-lg leading-tight">{item.title}</h3>
                              <p className="text-[15px] text-gray-500 font-bold mt-1">{item.desc}</p>
                            </div>
                          </div>
                          {item.value && <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-black text-gray-600 shadow-sm">{item.value}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              case 'notes':
                return (
                  <div key={section.id} className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20">
                    <div className="bg-gray-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden border-b-8 border-blue-600">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                      <div className="relative z-10">
                        <h2 className={`text-2xl md:text-3xl font-black flex items-center gap-4 italic uppercase ${(section.data.items || []).length === 1 ? 'mb-6' : 'mb-10'}`}>
                          <Info className="w-8 h-8 text-blue-400" /> {section.data.title || '施工に関する注意事項'}
                        </h2>
                        {(section.data.items || []).length === 1 ? (
                          <div className="text-gray-300 font-bold leading-relaxed text-[15px] md:text-base whitespace-pre-line" dangerouslySetInnerHTML={{ __html: section.data.items[0] }} />
                        ) : (
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {(section.data.items || []).map((note: any, i: number) => (
                              <li key={i} className="flex gap-4 items-start text-gray-300 font-bold leading-relaxed text-[15px] md:text-base">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                <div dangerouslySetInnerHTML={{ __html: note }} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                );
              default:
                return null;
            }
          };

          return groupedSections.map((groupOrSection: any, gIdx: number) => {
            if (groupOrSection.type === 'grid_group') {
              return (
                <div key={`group-${gIdx}`} className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-12 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12 items-stretch">
                    {groupOrSection.sections.map((sec: any, sIdx: number) => {
                      const sectionWidth = sec.data?.sectionWidth || 'full';
                      const colSpan = sectionWidth === 'half' ? 'lg:col-span-3' : 'lg:col-span-2';
                      const content = renderSectionContent(sec);
                      if (!content) return null;
                      return (
                        <div key={sec.id || sIdx} className={`${colSpan} flex flex-col`}>
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            } else {
              const content = renderSectionContent(groupOrSection);
              return content;
            }
          });
        })()}
      </>
      ) : (
        <>
          {/* --- ヘッダー領域 (Legacy) --- */}
          <div className="bg-gray-900 text-white pt-24 pb-16 px-6 md:px-12 lg:px-20 border-b-[8px] border-blue-600 relative z-40">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="flex justify-between items-center mb-10 relative z-20">
                <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white font-bold text-[15px] flex items-center gap-2 transition-colors group"><ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />トップページへ戻る</button>
                <div className="relative group/nav" ref={menuRef} onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)}>
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-gray-800 hover:bg-gray-700 text-white font-bold text-[15px] px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors border border-gray-700 shadow-sm"><MenuIcon className="w-4 h-4" /><span className="hidden sm:inline">MENU (他のプラン)</span><span className="sm:hidden">Menu</span><ChevronDown className={"w-4 h-4 transition-transform ml-1 " + (isMenuOpen ? 'rotate-180' : '')} /></button>
                  <MegaMenu show={isMenuOpen} categories={audioCategories} theme="dark" onClose={() => setIsMenuOpen(false)} navigate={navigate} handleMenuClick={(item) => { setIsMenuOpen(false); navigate(item.path || `/audio/plan/${item.name}`); }} positionClassName="right-0 -mr-4 md:right-0 md:mr-0" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6"><div className="text-3xl md:text-4xl font-black italic tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">SOUND ANG</div><div className="text-left md:text-right"><div className="text-[15px] md:text-base font-bold text-gray-400 tracking-widest uppercase">Speaker Installation Package</div></div></div>
              <div><h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1]"><span className="block text-lg md:text-2xl text-gray-400 mb-3 tracking-[0.2em] font-bold">{data.header.badge}</span>{data.header.mainTitle}<span className="block text-2xl md:text-4xl text-blue-400 mt-4 tracking-widest font-bold">{data.header.subTitle}</span></h1><p className="text-gray-300 font-bold leading-relaxed max-w-4xl text-base md:text-lg mt-8 whitespace-pre-line">{data.header.description}</p></div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
            {data.pricing.showPricingDisplay !== false && (
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-[2rem] p-10 md:p-14 mb-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-xl shadow-blue-900/5 relative overflow-hidden">
                <div className="relative z-10 w-full lg:w-auto">
                  <div className="inline-block bg-blue-600 text-white text-[15px] md:text-base font-black px-5 py-2 rounded-full tracking-widest mb-6 shadow-md">パッケージ特別価格</div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                    <div className="text-gray-500 line-through font-bold text-2xl">{data.pricing.normalPriceText}</div>
                    <div className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter">{data.pricing.pricingMode === 'manual' ? (<>{(data.pricing.specialPrice || "").toString().startsWith('¥') ? '' : '¥'}{parseInt((data.pricing.specialPrice || "").toString().replace(/[^0-9]/g, '')) ? parseInt((data.pricing.specialPrice || "").toString().replace(/[^0-9]/g, '')).toLocaleString() : (data.pricing.specialPrice || '0')}</>) : (<>¥{(calculateAppliedPrice(data.speakers?.[0]?.standalonePrice || "0")).toLocaleString()}</>)}<span className="text-2xl md:text-3xl text-gray-600 font-bold ml-2">〜(税込)</span></div>
                  </div>
                  <p className="text-[15px] text-gray-500 font-bold bg-white/80 inline-block px-4 py-2 rounded-lg border border-gray-100">{data.pricing.note}</p>
                </div>
                <div className="relative z-10 bg-white rounded-3xl shadow-xl shadow-blue-900/10 border border-blue-100 p-8 md:p-10 text-center shrink-0 w-full lg:w-auto transform lg:rotate-2 lg:hover:rotate-0 transition-transform duration-300"><div className="text-[15px] md:text-base font-black text-gray-500 tracking-widest mb-3">通常個別施工より</div><div className="text-3xl md:text-4xl font-black text-red-600 tracking-tighter">{data.pricing.savingsText}</div></div>
              </div>
            )}

            <div className="mb-28">
              <div className="flex items-center gap-5 mb-8"><div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0"><Settings className="w-7 h-7 text-blue-600" /></div><h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">音質を決定づける「3つの重要施工」を標準装備</h2></div>
              <p className="text-base md:text-lg text-gray-600 mb-12 font-bold leading-relaxed max-w-4xl">スピーカーの性能を100%引き出すためには、ただ取り付けるだけでは不十分です。本パッケージは以下の必須環境づくりがすべて含まれています。</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {[
                  { title: data.features.doorTuning.title, desc: data.features.doorTuning.desc, image: data.features.doorTuning.image || "/images/Audio/Speaker/door-b.webp" },
                  { title: data.features.baffle.title, desc: data.features.baffle.desc, image: data.features.baffle.image || "/images/Audio/Speaker/baffle.webp" },
                  { title: data.features.cable.title, desc: data.features.cable.desc, image: data.features.cable.image || "/images/Audio/Speaker/ang-cable.webp" }
                ].map((f, i) => (
                  <div key={i} className="group relative"><div className="aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-2xl relative"><img src={f.image} alt={f.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div><div className="absolute bottom-6 left-6 text-white font-black text-4xl italic opacity-20">0{i+1}</div></div><h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3"><div className="w-2 h-8 bg-blue-600 rounded-full"></div>{f.title}</h3><p className="text-gray-600 font-bold leading-relaxed text-[15px] md:text-base">{f.desc}</p></div>
                ))}
              </div>
            </div>

            <div className="mb-32">
              <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-16 border-b-4 border-gray-900 pb-8"><h2 className="text-5xl md:text-7xl font-black text-gray-900 italic tracking-tighter uppercase leading-none">Speaker<br />Lineup</h2><p className="text-gray-500 font-black tracking-widest uppercase text-[15px]">Selected high-quality units</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {(data.speakers || []).map((spk, i) => (
                  <div key={i} className="group flex flex-col h-full bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500"><div className="aspect-square relative overflow-hidden bg-gray-50"><img src={spk.image} alt={`${spk.brand} ${spk.name}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute top-6 left-6"><div className="bg-black/80 backdrop-blur-md text-white text-[12px] font-black px-4 py-2 rounded-full tracking-widest uppercase border border-white/20">{spk.brand}</div></div><div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div></div><div className="p-8 flex flex-col flex-grow"><h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{spk.name}</h3><p className="text-gray-500 text-sm font-bold mb-6 flex-grow" dangerouslySetInnerHTML={{ __html: (spk.remarks || '').replace(/\n/g, '<br />') }} /><div className="pt-6 border-t border-gray-100"><div className="text-[12px] font-black text-gray-400 tracking-widest uppercase mb-1">Package Total</div><div className="flex items-baseline gap-2"><div className="text-3xl font-black text-blue-600 tracking-tighter">¥{(calculateAppliedPrice(spk)).toLocaleString()}</div><div className="text-sm font-black text-gray-500 uppercase italic">tax incl.</div></div></div></div></div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden"><div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full transform translate-x-1/2 -translate-y-1/2"></div><div className="relative z-10 max-w-4xl mx-auto text-center"><div className="inline-block bg-blue-600 text-sm font-black px-6 py-2 rounded-full tracking-widest mb-10 uppercase">Optional Upgrades</div><h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-16 leading-tight italic uppercase">さらに高みを目指す<br /><span className="text-blue-500">特別なオプション</span></h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">{(data.upgrades?.courses || []).map((course, i) => (<div key={i} className={`bg-gray-800/50 backdrop-blur-sm border p-10 rounded-[2.5rem] transition-all hover:bg-gray-800 group ${course.pop ? 'border-blue-500 shadow-2xl shadow-blue-500/10' : 'border-gray-700'}`}><div className="flex justify-between items-start mb-6"><h4 className="text-2xl font-black group-hover:text-blue-400 transition-colors">{course.name}</h4><div className="bg-blue-600 text-white text-[12px] font-black px-4 py-2 rounded-full tracking-widest">{course.price}</div></div><p className="text-gray-400 font-bold leading-relaxed">{course.desc}</p></div>))}</div><div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">{(data.upgrades?.options?.metalBaffleDiscount || data.upgrades?.options?.tweeterMountPrice) && <div className="bg-gray-800/30 border border-gray-700 p-8 rounded-3xl flex items-center justify-between gap-6 group hover:border-blue-500 transition-all"><div className="text-left"><div className="text-[12px] font-black text-blue-500 tracking-widest uppercase mb-1">Speaker Baffle</div><div className="text-xl font-black italic">METAL BAFFLE <span className="text-blue-500">{data.upgrades.options.metalBaffleDiscount}</span></div></div><div className="w-12 h-12 rounded-2xl bg-gray-700 flex items-center justify-center group-hover:bg-blue-600 transition-colors"><ChevronRight className="w-6 h-6" /></div></div>}</div><div className="mt-20"><button onClick={() => navigate('/reservation')} className="group bg-white text-gray-900 px-12 py-6 rounded-2xl font-black text-lg hover:bg-blue-600 hover:text-white transition-all shadow-2xl shadow-blue-500/20 flex items-center gap-4 mx-auto uppercase tracking-tighter italic"><MessageCircle className="w-6 h-6" /> お問い合わせ・ご予約はこちら <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></button></div></div></div>
          </div>
        </>
      )}

      {/* --- フッター --- */}
      <footer className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-black italic tracking-widest text-gray-900">SOUND ANG</div>
          <p className="text-gray-400 font-bold text-[15px]">© {new Date().getFullYear()} SOUND ANG. All rights reserved.</p>
        </div>
      </footer>

      {showFloatingCTA && (
        <FloatingCTA 
          showLine={ctaConfig.showLine !== false} 
          showReservation={ctaConfig.showReservation !== false} 
          theme={ctaConfig.theme}
        />
      )}
    </div>
  );

};

export default StandardLinePage;
