import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, ShieldCheck, Music, Settings, Zap, Printer, ArrowRight, Info, Wrench, MessageCircle } from 'lucide-react';
import { usePrices, AudioSpeakerItem } from '../../contexts/PriceContext';

export const StandardLinePrintPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();
  const { audioLPs, standardLineLanding } = usePrices();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const targetSlug = slug || 'sp-standard';
  const data = audioLPs?.find(p => p.slug === targetSlug) || standardLineLanding;

  if (!data || !data.header) return null;

  const parsePrice = (priceStr: any) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    const str = priceStr.toString();
    return parseInt(str.replace(/[^0-9]/g, '')) || 0;
  };

  const calculateAppliedPrice = (spk: any) => {
    if (!spk) return 0;
    const isString = typeof spk === 'string';
    const standalonePrice = isString ? spk : spk.standalonePrice;
    const speakerPrice = parsePrice(standalonePrice);
    const fixedFee = !isString && spk.fixedPriceOverride !== undefined && spk.fixedPriceOverride !== ''
      ? parsePrice(spk.fixedPriceOverride)
      : (data.pricing?.fixedPrice || 0);
    return speakerPrice + fixedFee;
  };

  // Gather speakers dynamically from all 'speakers' sections, or fallback to global list
  const gatheredSpeakers: AudioSpeakerItem[] = [];
  const speakersSections = data.sections?.filter((s: any) => s.type === 'speakers') || [];
  
  if (speakersSections.length > 0) {
    speakersSections.forEach((sec: any) => {
      const secSpeakers = sec.data?.speakers || [];
      secSpeakers.forEach((spk: any) => {
        gatheredSpeakers.push({
          ...spk,
          fixedPriceOverride: spk.fixedPriceOverride !== undefined && spk.fixedPriceOverride !== ''
            ? spk.fixedPriceOverride
            : (sec.data?.fixedPrice !== undefined && sec.data.fixedPrice !== null ? sec.data.fixedPrice : undefined)
        });
      });
    });
  }
  
  if (gatheredSpeakers.length === 0 && data.speakers && data.speakers.length > 0) {
    data.speakers.forEach((spk: any) => {
      gatheredSpeakers.push(spk);
    });
  }

  const formattedSpecialPrice = data.pricing?.pricingMode === 'manual' 
    ? ((data.pricing.specialPrice || "").toString().startsWith('¥') ? data.pricing.specialPrice : `¥${parseInt((data.pricing.specialPrice || "").toString().replace(/[^0-9]/g, '')) ? parseInt((data.pricing.specialPrice || "").toString().replace(/[^0-9]/g, '')).toLocaleString() : (data.pricing.specialPrice || '0')}`)
    : `¥${(calculateAppliedPrice(gatheredSpeakers[0])).toLocaleString()}`;

  // 適用可能なスピーカー配列を 1ページあたり最大12個 (3列×4行) のチャンクに動的分割
  const speakerChunks: AudioSpeakerItem[][] = [];
  if (gatheredSpeakers.length > 0) {
    for (let i = 0; i < gatheredSpeakers.length; i += 12) {
      speakerChunks.push(gatheredSpeakers.slice(i, i + 12));
    }
  }

  const totalPages = 1 + speakerChunks.length;
  
  const getSectionData = (type: string) => {
    return data.sections?.find((s: any) => s.type === type)?.data;
  };

  const featuresData = getSectionData('features');
  const pkgSummaryData = getSectionData('package_summary');
  const upgradesSectionData = getSectionData('upgrades');
  const notesData = getSectionData('notes');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 print:p-0 print:bg-white flex flex-col items-center gap-12 print:gap-0 font-sans">
      {/* 印刷時の設定: @pageの余白を強制的にゼロにし、コンテナを物理用紙サイズ(210mm×297mm)に完全固定することで余白設定による隙間やズレを根本から遮断します */}
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0 !important; }
          html, body { 
            width: 210mm; 
            height: 100%; 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white; 
            color: #111827;
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
          }
          .no-print { display: none !important; }
          .print-shadow-none { box-shadow: none !important; border: none !important; }
          /* 確実なカラムレイアウト維持のための独自プリント用クラス */
          .print-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .print-grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
          .print-flex-row { flex-direction: row !important; }
          /* 別紙の開始時に確実に改ページさせる */
          .print-break-before { page-break-before: always !important; break-before: page !important; }
          /* ページをまたぐ要素の分割を制御 */
          .page-break-avoid { page-break-inside: avoid; break-inside: avoid; }
        }
      `}</style>

      {/* プリントボタン (画面プレビュー時のみ最上部に固定表示) */}
      <div className="w-full max-w-[210mm] flex justify-end no-print">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg"
        >
          <Printer className="w-4 h-4" />
          資料一式を印刷する（全{totalPages}ページ）
        </button>
      </div>

      {/* ========================================== */}
      {/* === PAGE 1: パッケージ本編（プラン・施工内容） === */}
      {/* ========================================== */}
      {/* 物理的な用紙サイズに完全一致する h-[297mm] と flex-col justify-between により、上下端へ完璧に吸着させます */}
      <div className="relative w-full max-w-[210mm] print:max-w-none print:w-[210mm] print:h-[297mm] print:box-border bg-white rounded-xl shadow-2xl print-shadow-none overflow-hidden print:flex print:flex-col print:justify-between">
        
        {/* --- ヘッダー --- */}
        <div className="bg-gray-900 text-white p-8 md:p-10 print:p-6 print:pb-5 border-b-[6px] print:border-b-4 border-blue-600 shrink-0">
          <div className="flex justify-between items-start mb-6 print:mb-3">
            <div className="text-xl print:text-base font-black italic tracking-widest text-blue-500">SOUND ANG</div>
            <div className="text-right">
              <div className="text-xs print:text-[9px] font-bold text-gray-400 tracking-widest uppercase">Speaker Installation Package</div>
              <div className="text-[10px] print:text-[8px] text-gray-500 mt-1 print:mt-0">フロントエンド用 / 総合資料集</div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl print:text-3xl font-black tracking-tight mb-4 print:mb-2 leading-tight">
            <span className="block text-sm md:text-base print:text-[11px] text-gray-400 mb-2 print:mb-1 tracking-[0.2em] font-bold">{data.header.badge || 'スタンダードライン'}</span>
            {data.header.mainTitle || 'STANDARD LINE'}
            <span className="inline-block text-lg md:text-xl print:text-sm text-blue-400 mt-2 print:mt-0 print:ml-3 tracking-widest">{data.header.subTitle || 'スピーカー交換パッケージ'}</span>
          </h1>
          <p className="text-gray-300 font-bold leading-relaxed max-w-2xl text-sm print:text-[10px] print:leading-relaxed print:max-w-none">
            {data.header.description}
          </p>
        </div>

        {/* --- メインコンテンツ（中間エリア全体を使って各ブロックを均等配置） --- */}
        <div className="p-8 md:p-10 print:p-7 print:py-6 flex-1 flex flex-col justify-between">
          
          <div>
            {/* 価格ハイライト (フル幅) */}
            {data.pricing?.showPricingDisplay !== false && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl print:rounded-xl p-6 print:p-4 mb-8 print:mb-4 flex flex-col md:flex-row print:flex-row print-flex-row items-center justify-between gap-6 print:gap-4">
                <div className="print:flex-1">
                  <div className="inline-block bg-blue-600 text-white text-[10px] print:text-[9px] font-black px-3 print:px-3 py-1 print:py-1 rounded-full tracking-widest mb-3 print:mb-1.5">
                    パッケージ特別価格
                  </div>
                  <div className="flex items-baseline gap-4 print:gap-3">
                    <div className="text-gray-500 line-through font-bold text-lg print:text-sm">{data.pricing?.normalPriceText || ''}</div>
                    <div className="text-4xl md:text-5xl print:text-3xl font-black text-gray-900 tracking-tighter">
                      {formattedSpecialPrice}<span className="text-lg print:text-sm text-gray-600 font-bold ml-1">〜(税込)</span>
                    </div>
                  </div>
                  <p className="text-[10px] print:text-[8.5px] text-gray-500 mt-2 print:mt-1.5 leading-tight">
                    {data.pricing?.note || ''}
                  </p>
                </div>
                <div className="bg-white rounded-xl print:rounded-lg p-4 print:p-3 text-center shrink-0 border border-blue-100 min-w-[120px]">
                  <div className="text-[10px] print:text-[8.5px] font-bold text-gray-500 mb-1 print:mb-0.5">通常個別施工より</div>
                  <div className="text-xl print:text-base font-black text-red-600">{data.pricing?.savingsText || ''}</div>
                </div>
              </div>
            )}

            {/* 3つの重要画像セクション (フル幅) */}
            <div className="mb-10 print:mb-4">
              <div className="flex items-center gap-3 print:gap-2 mb-4 print:mb-2">
                <Settings className="w-5 h-5 print:w-4.5 print:h-4.5 text-blue-600 shrink-0" />
                <h2 className="text-lg print:text-sm font-black text-gray-900 tracking-tight leading-tight">
                  {featuresData?.title || "音質を決定づける「3つの重要施工」を標準装備"}
                </h2>
              </div>
              <p className="text-xs print:text-[9.5px] text-gray-600 mb-5 print:mb-3 leading-relaxed font-bold">
                {featuresData?.description || "スピーカーの性能を100%引き出すためには、ただ取り付けるだけでは不十分です。本パッケージは以下の必須環境づくりがすべて含まれています。"}
              </p>
              
              <div className="grid grid-cols-3 print-grid-cols-3 gap-5 print:gap-5">
                {(featuresData?.items || [
                  { 
                    title: (data.features as any)?.doorTuning?.title || "ドアチューニング Bコース", 
                    desc: (data.features as any)?.doorTuning?.desc || "", 
                    image: (data.features as any)?.doorTuning?.image || "/images/Audio/Speaker/door-b.webp" 
                  },
                  { 
                    title: (data.features as any)?.baffle?.title || "カスタムインナーバッフル", 
                    desc: (data.features as any)?.baffle?.desc || "", 
                    image: (data.features as any)?.baffle?.image || "/images/Audio/Speaker/baffle.webp" 
                  },
                  { 
                    title: (data.features as any)?.cable?.title || "ANGオリジナルケーブル", 
                    desc: (data.features as any)?.cable?.desc || "", 
                    image: (data.features as any)?.cable?.image || "/images/Audio/Speaker/ang-cable.webp" 
                  }
                ]).slice(0, 3).map((feature: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-xl print:rounded-lg overflow-hidden border border-gray-200 print:border-gray-300 shadow-sm flex flex-col justify-between">
                    <div className="aspect-[4/3] print:aspect-[16/9] overflow-hidden bg-gray-100">
                      <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 print:p-3 flex-1 flex flex-col justify-between">
                      <h3 className="font-black text-sm print:text-xs text-gray-900 mb-2 print:mb-1.5 leading-tight line-clamp-1">{feature.title}</h3>
                      <p className="text-[10px] print:text-[8.5px] text-gray-600 leading-relaxed print:line-clamp-2">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2カラム構成：パッケージの残り＆アップグレード */}
          <div className="grid grid-cols-1 lg:grid-cols-2 print-grid-cols-2 gap-10 print:gap-8 page-break-avoid">
            
            {/* 左カラム：その他のパッケージ内容 */}
            <div>
              <div className="flex items-center gap-3 print:gap-2 mb-4 print:mb-2.5 border-b-2 print:border-b border-gray-100 print:border-gray-300 pb-3 print:pb-1.5">
                <Music className="w-5 h-5 print:w-4 print:h-4 text-blue-600 shrink-0" />
                <h2 className="text-md print:text-xs font-black text-gray-900 tracking-tight leading-tight">
                  {pkgSummaryData?.title || "パッケージ全内容（まとめ）"}
                </h2>
              </div>
              {pkgSummaryData?.subtitle && (
                <p className="text-[10px] print:text-[8.5px] text-gray-500 mb-4 print:mb-2.5 leading-tight font-bold">{pkgSummaryData.subtitle}</p>
              )}
              
              <ul className="space-y-3 print:space-y-2.5">
                {(pkgSummaryData?.items || [
                  { title: "17cmモデル2WAYスピーカー", desc: "10万円までのモデルから選択（※詳細は別紙参照）" },
                  { title: (data.features as any)?.doorTuning?.title || "ドアチューニング", desc: "制振・防音処理" },
                  { title: (data.features as any)?.baffle?.title || "インナーバッフル", desc: "専用マウント製作" },
                  { title: (data.features as any)?.cable?.title || "オリジナルスピーカーケーブル", desc: "繊細な情報まで伝送" },
                  { title: "ツィーター取付", desc: "純正位置、もしくはオンダッシュ取り付け" },
                  { title: "ワイヤリング工賃", value: "通常 ¥22,000", desc: "正確な配線と極性チェックを含む" }
                ]).map((item: any, idx: number) => (
                  <li key={idx} className="flex gap-3 print:gap-2.5 p-2.5 print:py-2 print:px-2.5 rounded-lg print:rounded-lg bg-gray-50/50 print:bg-gray-50/80 border border-gray-100 print:border-gray-200 items-center justify-between">
                    <div className="flex gap-3 print:gap-2.5 items-start w-full">
                      <div className="text-sm print:text-[10px] font-black text-blue-300 italic shrink-0 w-5 print:w-4">{(idx + 1).toString().padStart(2, '0')}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-xs print:text-[9.5px] leading-tight">{item.title}</h3>
                        <p className="text-[9px] print:text-[8px] text-gray-500 mt-0.5 leading-tight">{item.desc}</p>
                      </div>
                      {(item.value || item.price) && (
                        <div className="shrink-0 text-right">
                          <span className="text-[10px] print:text-[8px] font-black text-gray-600 bg-white border border-gray-200 px-2 print:px-1.5 py-1 print:py-0.5 rounded shadow-sm whitespace-nowrap">{item.value || item.price}</span>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 右カラム：アップグレードオプション */}
            <div>
              <div className="flex items-center gap-3 print:gap-2 mb-4 print:mb-2.5 border-b-2 print:border-b border-gray-100 print:border-gray-300 pb-3 print:pb-1.5">
                <Zap className="w-5 h-5 print:w-4 print:h-4 text-blue-600 shrink-0" />
                <h2 className="text-md print:text-xs font-black text-gray-900 tracking-tight leading-tight">
                  {upgradesSectionData?.title || "アップグレード オプション"}
                </h2>
              </div>
              <p className="text-[10px] print:text-[8.5px] text-gray-500 mb-4 print:mb-2.5 leading-tight font-bold">
                {upgradesSectionData?.subtitle || "基本コースからのグレードアップ一覧です。（同時施工の特別価格）"}
              </p>
              
              <div className="grid grid-cols-1 gap-2 print:gap-2.5 mb-4 print:mb-3">
                {(upgradesSectionData?.courses || data.upgrades?.courses || []).map((opt: any, idx: number) => (
                  <div key={idx} className={`flex justify-between items-center p-2.5 print:py-2 print:px-2.5 border rounded-lg print:rounded-lg ${opt.pop ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <div>
                      <div className="flex items-center gap-2 print:gap-2">
                        <span className="font-bold text-[11px] print:text-[9.5px] text-gray-900 leading-tight">{opt.name}</span>
                        {opt.pop && <span className="text-[8px] print:text-[7.5px] bg-blue-600 text-white px-1.5 print:px-1.5 py-0.5 print:py-0.2 rounded font-bold tracking-wider">おすすめ</span>}
                      </div>
                      <div className="text-[9px] print:text-[8px] text-gray-500 mt-0.5 leading-tight">{opt.desc}</div>
                    </div>
                    <div className="font-black text-blue-600 text-xs print:text-[10px] whitespace-nowrap">{opt.price}</div>
                  </div>
                ))}
              </div>

              <div className="flex print:flex-row print-flex-row gap-2 print:gap-3">
                <div className="bg-white border border-gray-200 print:border-gray-300 rounded-lg print:rounded-lg flex-1 overflow-hidden flex">
                  <div className="w-1/3 bg-gray-100 overflow-hidden shrink-0 border-r border-gray-100 print:border-gray-200">
                    <img src={upgradesSectionData?.options?.metalBaffleImage || data.upgrades?.options?.metalBaffleImage || "/images/Audio/Speaker/metal.webp"} alt="メタルバッフル" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-1.5 print:py-1.5 px-2 print:px-2 flex flex-col justify-center items-center text-center">
                    <span className="block text-gray-500 text-[8px] print:text-[7.5px] mb-0.5 tracking-widest font-bold">高剛性化</span>
                    <span className="text-[10px] print:text-[8.5px] font-bold text-gray-900 leading-tight">メタルバッフル<br/><span className="text-blue-600 font-black print:text-[9.5px]">{upgradesSectionData?.options?.metalBaffleDiscount || data.upgrades?.options?.metalBaffleDiscount || '20% OFF'}</span></span>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 print:border-gray-300 rounded-lg print:rounded-lg flex-1 overflow-hidden flex">
                  <div className="w-1/3 bg-gray-100 overflow-hidden shrink-0 border-r border-gray-100 print:border-gray-200">
                    <img src={upgradesSectionData?.options?.tweeterMountImage || data.upgrades?.options?.tweeterMountImage || "/images/Audio/Speaker/tw-mount.webp"} alt="ツィーター埋込" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-1.5 print:py-1.5 px-2 print:px-2 flex flex-col justify-center items-center text-center">
                    <span className="block text-gray-500 text-[8px] print:text-[7.5px] mb-0.5 tracking-widest font-bold">理想の定位</span>
                    <span className="text-[10px] print:text-[8.5px] font-bold text-gray-900 leading-tight">埋込加工<br/><span className="text-blue-600 font-black print:text-[9.5px]">{upgradesSectionData?.options?.tweeterMountPrice || data.upgrades?.options?.tweeterMountPrice || '¥46,200〜'}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- フッター / 注意事項: justify-between構造により物理用紙最下端へ完全にフルブリード密着 --- */}
        <div className="bg-gray-900 text-gray-400 p-8 print:p-6 print:py-4.5 border-t-[6px] print:border-t-2 border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 print:gap-0 shrink-0 border-box">
          <div className="flex-1 w-full">
            <h4 className="text-xs print:text-[10px] font-black text-white mb-3 print:mb-1.5 flex items-center gap-2">
              <Info className="w-4 h-4 print:w-3.5 print:h-3.5 text-blue-400" /> {notesData?.title || "施工に関する注意事項"}
            </h4>
            <ul className="text-[10px] print:text-[8.5px] space-y-1.5 print:space-y-1 list-disc list-inside leading-relaxed">
              {(notesData?.items || [
                "作業は<strong className=\"text-white\">1日お車をお預かり</strong>します（無料代車をご用意可能です）。",
                "バッフル適合がない車種は別途<strong className=\"text-white\">¥5,500</strong>の製作費が必要になります。",
                "ツィーター固定にマウント等が必要な車種は追加費用が発生する場合があります。",
                "ドア通線に加工が必要な車両（ハーネスがカプラ等）は別途加工費用がかかる場合があります。"
              ]).map((note: string, idx: number) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: note }} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* =================================================== */}
      {/* === PAGE 2〜: 適用可能スピーカー一覧（3×4画像付きグリッド分割出力） === */}
      {/* =================================================== */}
      {speakerChunks.map((chunk, pageIndex) => (
        <div key={pageIndex} className="relative w-full max-w-[210mm] print:max-w-none print:w-[210mm] print:h-[297mm] print:box-border bg-white rounded-xl shadow-2xl print-shadow-none overflow-hidden print:flex print:flex-col print:justify-between print-break-before">
          
          {/* 付属資料 専用ヘッダー */}
          <div className="bg-gray-900 text-white p-6 md:p-8 print:p-4 border-b-[4px] print:border-b-2 border-blue-600 shrink-0">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] print:text-[8px] text-blue-400 font-bold tracking-widest block mb-0.5">SOUND ANG / 付属資料</span>
                <h2 className="text-xl md:text-2xl print:text-sm font-black tracking-tight">
                  {data.header.badge || 'スタンダードライン'} 適用スピーカー ラインナップ {speakerChunks.length > 1 ? `(${pageIndex + 1}/${speakerChunks.length})` : ''}
                </h2>
              </div>
              <div className="text-right text-[10px] print:text-[7.5px] text-gray-400 font-bold">
                別紙資料 (Page {pageIndex + 2})
              </div>
            </div>
          </div>

          {/* 付属資料 メインエリア（中間キャンバス領域全体をフレキシブルに使用） */}
          <div className="p-8 md:p-10 print:p-6 print:py-4 flex-1 flex flex-col justify-start">
            {pageIndex === 0 && (
              <p className="text-xs print:text-[8.5px] text-gray-600 mb-4 print:mb-2.5 leading-relaxed font-bold shrink-0">
                本パッケージをご注文の際、基本料金内（または差額表記あり）で選択可能な代表的スピーカーユニットの一覧です。車両の取付穴サイズや深さをご確認の上、お好みの音質・ブランドをお選びください。
              </p>
            )}
            
            {/* 3×4 画像付きグリッド出力 (キャンバス全体の高さを均等に埋め尽くすよう content-stretch を適用し、最下部フッターとの隙間を完全に解消) */}
            <div className="grid grid-cols-1 md:grid-cols-3 print-grid-cols-3 gap-4 print:gap-3 flex-1 content-stretch items-stretch">
              {chunk.map((spk) => (
                <div key={spk.id} className="border border-gray-200 print:border-gray-300 rounded-lg print:rounded-xl overflow-hidden bg-white flex flex-col justify-between shadow-sm page-break-avoid print:h-full">
                  
                  {/* スピーカー画像エリア */}
                  <div className="w-full h-24 print:h-[28mm] bg-white relative border-b border-gray-100 flex items-center justify-center p-3 shrink-0">
                    <img 
                      src={spk.image || "/images/Audio/Speaker/default.webp"} 
                      alt={spk.name} 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/Audio/Speaker/default.webp";
                      }}
                    />
                    {/* 左上にブランド名バッジをスマートに配置 */}
                    <span className="absolute top-1 left-1 bg-gray-900 text-white text-[7px] print:text-[6.5px] font-black px-1.5 py-0.5 rounded tracking-wider shadow-sm">
                      {spk.brand}
                    </span>
                    {/* 右上にグリル有無などのアイコン */}
                    <div className="absolute top-1 right-1 flex gap-0.5">
                      {spk.hasGrille && <span className="bg-emerald-600 text-white text-[7px] print:text-[7px] font-bold px-1.5 py-0.5 rounded" title="グリル付">G</span>}
                      {spk.hasTweeterMount && <span className="bg-blue-600 text-white text-[7px] print:text-[7px] font-bold px-1.5 py-0.5 rounded" title="TWマウント付">TW</span>}
                    </div>
                  </div>

                  {/* 詳細テキスト＆価格情報エリア (均等に引き伸ばされたカード高さ全体を使って美しく配置) */}
                  <div className="p-2.5 print:p-2 print:px-2.5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h4 className="text-xs print:text-[9.5px] font-black text-gray-900 mb-1 leading-tight truncate" title={spk.name}>
                        {spk.name}
                      </h4>
                      
                      <div className="text-[10px] print:text-[8.5px] text-gray-600 flex justify-between items-center gap-1 mb-1.5 font-bold bg-gray-50 print:bg-transparent print:border print:border-gray-100 p-1 print:p-1 rounded shrink-0">
                        <span className="truncate">取付穴: <strong className="text-gray-900">{spk.mountingHoleSize || '―'}</strong></span>
                        <span className="text-gray-300">|</span>
                        <span className="truncate">奥行: <strong className="text-gray-900">{spk.depthSize || '―'}</strong></span>
                      </div>

                      {spk.remarks && (
                        <p className="text-[9.5px] print:text-[8px] text-gray-500 line-clamp-2 print:line-clamp-2 leading-tight mb-2" dangerouslySetInnerHTML={{ __html: '● ' + spk.remarks.replace(/\n/g, '<br />') }} />
                      )}
                    </div>

                    {/* 単体価格＆適用総額エリア */}
                    <div className="mt-1 pt-1 border-t border-gray-100 flex flex-col gap-0.5 shrink-0">
                      <div className="flex justify-between items-center">
                        <span className="text-[9.5px] print:text-[8px] text-gray-400 font-bold uppercase tracking-tighter">スピーカー単品</span>
                        <div className="text-right">
                          <span className="text-[9px] print:text-[8px] font-bold text-gray-600">¥{parsePrice(spk.standalonePrice).toLocaleString()} (税込)</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-baseline bg-blue-50/50 p-1 rounded">
                        <span className="text-[8px] print:text-[7.5px] font-black text-blue-900 uppercase">パッケージ合計</span>
                        <div className="text-right flex flex-col items-end">
                          <span className="text-[12px] print:text-[10.5px] text-blue-700 font-black italic leading-none">¥{calculateAppliedPrice(spk).toLocaleString()} (税込)</span>
                          <span className="text-[9px] print:text-[8px] text-gray-400 font-bold leading-none mt-0.5">
                            (税抜 ¥{Math.round(calculateAppliedPrice(spk) / (1 + (data.pricing?.taxRate || 10) / 100)).toLocaleString()})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 付属資料 専用統合フッター (注意書き文言とボトムバーを一体化させ、下端フルブリード固定することで中途半端な隙間を完全消滅) */}
          <div className="bg-gray-50 print:bg-gray-50/90 print:border-t print:border-gray-200 p-4 print:p-3 shrink-0 text-center w-full box-border">
            <div className="text-[8px] print:text-[7.5px] text-gray-500 font-bold leading-tight mb-1 print:mb-1 max-w-md mx-auto">
              ※記載のラインナップ・仕様・画像は代表例であり、予告なく変更される場合がございます。最新の適合情報は店頭スタッフまでお気軽にお尋ねください。
            </div>
            <div className="text-[7px] print:text-[6.5px] text-gray-400 font-bold tracking-wider pt-1 print:pt-1 border-t border-gray-200/60 max-w-xs mx-auto">
              SOUND ANG Speaker Package Layout System
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StandardLinePrintPage;
