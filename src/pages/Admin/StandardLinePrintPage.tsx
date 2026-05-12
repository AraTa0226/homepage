import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Music, Settings, Zap, Printer, ArrowRight, Info, Wrench, MessageCircle } from 'lucide-react';

export const StandardLinePrintPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 print:p-0 print:bg-white flex justify-center font-sans">
      {/* 印刷時の設定 */}
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 10mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
          .no-print { display: none !important; }
          .print-shadow-none { box-shadow: none !important; }
        }
      `}</style>

      {/* A4サイズのコンテナ */}
      <div className="relative w-full max-w-[210mm] bg-white rounded-xl shadow-2xl print-shadow-none overflow-hidden print:overflow-visible">
        
        {/* プリントボタン (画面表示のみ) */}
        <button 
          onClick={handlePrint}
          className="absolute top-4 right-4 z-10 no-print flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg"
        >
          <Printer className="w-4 h-4" />
          印刷する（資料用）
        </button>

        {/* --- ヘッダー --- */}
        <div className="bg-gray-900 text-white p-8 md:p-10 border-b-[6px] border-blue-600">
          <div className="flex justify-between items-start mb-6">
            <div className="text-xl font-black italic tracking-widest text-blue-500">SOUND ANG</div>
            <div className="text-right">
              <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">Speaker Installation Package</div>
              <div className="text-[10px] text-gray-500 mt-1">フロントエンド用 / A4資料</div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="block text-sm md:text-base text-gray-400 mb-2 tracking-[0.2em] font-bold">スタンダードライン</span>
            STANDARD LINE
            <span className="block text-lg md:text-xl text-blue-400 mt-2 tracking-widest">スピーカー交換パッケージ</span>
          </h1>
          <p className="text-gray-300 font-bold leading-relaxed max-w-2xl text-sm">
            純正の音に不満がある方へ。音質アップの第一歩は確実なスピーカー交換から。
            ただユニットを取り替えるだけではなく、<span className="text-white border-b border-blue-500 pb-0.5">スピーカーの真価を発揮するための必須施工（ドアチューニング・専用バッフル・配線）をすべてセットにした、明朗会計のコミコミパッケージ</span>です。
          </p>
        </div>

        {/* --- メインコンテンツ --- */}
        <div className="p-8 md:p-10 pt-6">
          
          {/* 価格ハイライト (フル幅) */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-block bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest mb-3">
                パッケージ特別価格
              </div>
              <div className="flex items-baseline gap-4">
                <div className="text-gray-500 line-through font-bold text-lg">通常目安: 117,700円</div>
                <div className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                  ¥81,840<span className="text-lg text-gray-600 font-bold ml-1">〜(税込)</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-2">
                ※KICKER CSS674（40,700円）を選択した場合の例。選ぶスピーカーの本体価格により総額は変動します。
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 text-center shrink-0">
              <div className="text-[10px] font-bold text-gray-500 mb-1">通常個別施工より</div>
              <div className="text-xl font-black text-red-600">約 35,860円 お得!</div>
            </div>
          </div>

          {/* 3つの重要画像セクション (フル幅) */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-black text-gray-900 tracking-tight">音質を決定づける「3つの重要施工」を標準装備</h2>
            </div>
            <p className="text-xs text-gray-600 mb-5">スピーカーの性能を100%引き出すためには、ただ取り付けるだけでは不十分です。本パッケージは以下の必須環境づくりがすべて含まれています。</p>
            
            <div className="grid grid-cols-3 gap-5">
              {[
                { 
                  title: "ドアチューニング Bコース", 
                  desc: "薄い鉄板のドア内部の振動・共振を抑え、音の漏れを防ぐ制振・防音処理。（通常¥27,500相当）", 
                  image: "/images/Audio/Speaker/door-b.webp" 
                },
                { 
                  title: "カスタムインナーバッフル", 
                  desc: "強固な土台を作り、不要な振動を徹底排除。音の立ち上がりと定位感が劇的に改善します。（通常¥11,000相当）", 
                  image: "/images/Audio/Speaker/baffle.webp" 
                },
                { 
                  title: "ANGオリジナルケーブル", 
                  desc: "オーディオテクニカ製ベースの高品位スピーカーケーブル(10m)で繊細な情報までロスなく伝送。（通常¥16,500相当）", 
                  image: "/images/Audio/Speaker/ang-cable.webp" 
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-black text-sm text-gray-900 mb-2 leading-tight">{feature.title}</h3>
                    <p className="text-[10px] text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2カラム構成：パッケージの残り＆アップグレード */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* 左カラム：その他のパッケージ内容 */}
            <div>
              <div className="flex items-center gap-3 mb-4 border-b-2 border-gray-100 pb-3">
                <Music className="w-5 h-5 text-blue-600" />
                <h2 className="text-md font-black text-gray-900 tracking-tight">パッケージ全内容（まとめ）</h2>
              </div>
              
              <ul className="space-y-3">
                {[
                  { num: "01", title: "17cmモデル2WAYスピーカー", desc: "10万円までのモデルから選択（※詳細は別紙参照）" },
                  { num: "02", title: "ドアチューニング Bコース", value: "通常 ¥27,500", desc: "制振・防音処理" },
                  { num: "03", title: "カスタムインナーバッフル", value: "通常 ¥11,000", desc: "専用マウント製作" },
                  { num: "04", title: "ANGオリジナルスピーカーケーブル", value: "通常 ¥16,500", desc: "オーディオテクニカ製¥1,500/m相当×10m計算" },
                  { num: "05", title: "ツィーター取付", desc: "純正位置、もしくはオンダッシュ取り付け" },
                  { num: "06", title: "ワイヤリング工賃", value: "通常 ¥22,000", desc: "正確な配線と極性チェックを含む" }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 p-2.5 rounded-lg bg-gray-50/50 border border-gray-100 items-center justify-between">
                    <div className="flex gap-3 items-start w-full">
                      <div className="text-sm font-black text-blue-300 italic shrink-0 w-5">{item.num}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-xs leading-tight">{item.title}</h3>
                        <p className="text-[9px] text-gray-500 mt-0.5 leading-tight">{item.desc}</p>
                      </div>
                      {item.value && (
                        <div className="shrink-0 text-right">
                          <span className="text-[10px] font-black text-gray-600 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm whitespace-nowrap">{item.value}</span>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 右カラム：アップグレードオプション */}
            <div>
              <div className="flex items-center gap-3 mb-4 border-b-2 border-gray-100 pb-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <h2 className="text-md font-black text-gray-900 tracking-tight">アップグレード オプション</h2>
              </div>
              <p className="text-[10px] text-gray-500 mb-4">基本の「Bコース」から、制振・吸音処理のグレードアップが可能です。（パッケージ同時施工の特別価格）</p>
              
              <div className="grid grid-cols-1 gap-2 mb-4">
                {[
                  { name: "B → A コース", price: "+¥11,000", desc: "フェリソニDS-1.5WP使用・制振材増量" },
                  { name: "B → A+ コース", price: "+¥22,000", desc: "フェリソニC2使用・制振材増量" },
                  { name: "B → S コース", price: "+¥33,000", desc: "DS-1.5WPをさらに増量。最新マテリアル高密度施工", pop: true },
                  { name: "B → S+ コース", price: "+¥44,000", desc: "フェリソニC2を贅沢に使用。最高峰の制振・吸音・遮音" }
                ].map((opt, idx) => (
                  <div key={idx} className={`flex justify-between items-center p-2.5 border rounded-lg ${opt.pop ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[11px] text-gray-900">{opt.name}</span>
                        {opt.pop && <span className="text-[8px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold tracking-wider">おすすめ</span>}
                      </div>
                      <div className="text-[9px] text-gray-500 mt-0.5">{opt.desc}</div>
                    </div>
                    <div className="font-black text-blue-600 text-xs whitespace-nowrap">{opt.price}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="bg-white border border-gray-200 rounded-lg flex-1 overflow-hidden flex">
                  <div className="w-1/3 bg-gray-100 overflow-hidden shrink-0 border-r border-gray-100">
                    <img src="/images/Audio/Speaker/metal.webp" alt="メタルバッフル" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-1.5 px-2 flex flex-col justify-center items-center text-center">
                    <span className="block text-gray-500 text-[8px] mb-0.5 tracking-widest font-bold">高剛性化</span>
                    <span className="text-[10px] font-bold text-gray-900 leading-tight">メタルバッフル<br/><span className="text-blue-600 font-black">20% OFF</span></span>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg flex-1 overflow-hidden flex">
                  <div className="w-1/3 bg-gray-100 overflow-hidden shrink-0 border-r border-gray-100">
                    <img src="/images/Audio/Speaker/tw-mount.webp" alt="ツィーター埋込" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-1.5 px-2 flex flex-col justify-center items-center text-center">
                    <span className="block text-gray-500 text-[8px] mb-0.5 tracking-widest font-bold">理想の定位</span>
                    <span className="text-[10px] font-bold text-gray-900 leading-tight">埋込加工<br/><span className="text-blue-600 font-black">¥46,200〜</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- フッター / 注意事項 --- */}
        <div className="bg-gray-900 text-gray-400 p-8 border-t-[6px] border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1 w-full">
            <h4 className="text-xs font-black text-white mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" /> 施工に関する注意事項
            </h4>
            <ul className="text-[10px] space-y-1.5 list-disc list-inside">
              <li>作業は<strong className="text-white">1日お車をお預かり</strong>します（無料代車をご用意可能です）。</li>
              <li>バッフル適合がない車種は別途<strong className="text-white">¥5,500</strong>の製作費が必要になります。</li>
              <li>ツィーター固定にマウント等が必要な車種は追加費用が発生する場合があります。</li>
              <li>ドア通線に加工が必要な車両（ハーネスがカプラ等）は別途加工費用がかかる場合があります。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardLinePrintPage;
