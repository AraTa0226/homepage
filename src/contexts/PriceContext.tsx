import React, { createContext, useContext, useState, ReactNode } from 'react';
import cmsData from '../data/cms.json';
export interface LineupItem {
  name: string;
  price?: string;
  image?: string;
  youtube?: string;
  description?: string;
}

export interface PlanItem {
  name: string;
  price: string;
  features: string[];
  badge: string;
  image?: string;
  description?: string;
  link?: string;
  showSavings?: boolean;
  gallery?: { title: string; images: string[] }[];
  lineup?: LineupItem[];
  packageDetails?: {
    standardPrice: string;
    savings: string;
    contents: { title: string; description: string; icon: string }[];
    upgrades?: { title: string; price: string; description: string }[];
    notes?: string[];
  };
}

export interface OptionalService {
  id: string;
  name: string;
  price: string;
  description: string;
  effect: string;
  percentage: number;
  image?: string;
}

export interface PlanCategory {
  id: string;
  category: string;
  type: 'audio' | 'security' | 'others';
  items: PlanItem[];
  description?: string;
  images?: string[];
  showDescription?: boolean;
  showDescriptionInMenu?: boolean;
  showDescriptionInList?: boolean;
}

export interface KnowledgeGuide {
  id: string;
  title: string;
  badge: string;
  features: string[];
  image?: string;
  description: string;
  content?: string;
  category: string;
  link?: string;
  gallery?: { title: string; images: string[] }[];
  lineup?: LineupItem[];
  packageDetails?: {
    standardPrice: string;
    savings: string;
    contents: { title: string; description: string; icon: string }[];
    upgrades?: { title: string; price: string; description: string }[];
    notes?: string[];
  };
}

export interface AuditionUnit {
  model: string;
  price?: string;
  taxExcluded?: string;
  series?: string;
  status: string;
  youtube?: string;
  image?: string;
  description?: string;
}

export interface AuditionBrand {
  brand: string;
  origin: string;
  units: AuditionUnit[];
}

interface PriceContextType {
  plans: PlanCategory[];
  guides: KnowledgeGuide[];
  optionals: OptionalService[];
  updatePrice: (categoryId: string, oldItemName: string, newItem: Partial<PlanItem>) => void;
  updateCategory: (categoryId: string, newCategory: Partial<PlanCategory>) => void;
  updateOptionalPrice: (id: string, newPrice: string) => void;
  bulkUpdatePrices: (newPlans: PlanCategory[], newOptionals: OptionalService[], newGuides: KnowledgeGuide[]) => void;
  adjustAllPrices: (percentage: number) => void;
  addItem: (categoryId: string, item: PlanItem) => void;
  removeItem: (categoryId: string, itemName: string) => void;
  addCategory: (category: PlanCategory) => void;
  removeCategory: (categoryId: string) => void;
  addOptional: (optional: OptionalService) => void;
  removeOptional: (id: string) => void;
  updateGuide: (id: string, newGuide: Partial<KnowledgeGuide>) => void;
  addGuide: (guide: KnowledgeGuide) => void;
  removeGuide: (id: string) => void;
  securityStatus: string;
  setSecurityStatus: (status: string) => void;
  emergencyAnnouncement: EmergencyAnnouncement;
  setEmergencyAnnouncement: (announcement: EmergencyAnnouncement) => void;
  recruitment: RecruitmentInfo;
  setRecruitment: (info: RecruitmentInfo) => void;
  audioRecruitment: RecruitmentInfo;
  setAudioRecruitment: (info: RecruitmentInfo) => void;
  securityRecruitment: RecruitmentInfo;
  setSecurityRecruitment: (info: RecruitmentInfo) => void;
  auditionSpeakers: AuditionBrand[];
  setAuditionSpeakers: (speakers: AuditionBrand[]) => void;
  saveSiteData: (updates: any) => void;
}

export interface RecruitmentInfo {
  visible: boolean;
  title: string;
  message: string;
  requirements: string[];
  showRequirements: boolean;
  salary: string;
  showSalary: boolean;
  contactInfo: string;
}

export interface EmergencyAnnouncement {
  text: string;
  link?: string;
  image?: string;
  active: boolean;
}

const initialRecruitment: RecruitmentInfo = {
  visible: false,
  title: "採用情報",
  message: "一緒にカーオーディオの世界を盛り上げませんか？経験者優遇・未経験歓迎",
  requirements: ["車が好きな方", "元気で明るい方", "要普通免許"],
  showRequirements: true,
  salary: "基本給 応相談（経験・能力を考慮の上決定）",
  showSalary: true,
  contactInfo: "お電話にてお問い合わせください"
};

const initialGuides: KnowledgeGuide[] = [
  {
    id: 'hires_guide',
    title: "ハイレゾ導入のススメ",
    badge: "高解像度",
    features: ["CD超えの情報量", "多彩な接続プラン", "DAP/スマホ連携"],
    image: "https://picsum.photos/seed/hi-res/800/600",
    description: "ハイレゾはCDを超える高音質スペックを持っている新しい音楽ファイルです。CDの情報量を1とすると、ハイレゾは3倍から6.5倍ほど増加し、アナログテレビから4Kテレビに変わるように、細かい部分まで見通せるリアルな音場を表現できます。\n\nCDでは超えられなかった空気感や実像感が、マスター本来の音を再現するかのごとく忠実に得られるのがハイレゾの一番の魅力です。車の中でも意外と簡単に始めることができます。まずはハイレゾの世界を体験してみませんか？",
    category: "知識・ガイド",
    link: "https://www.soundang.com/hires.html",
    packageDetails: {
      standardPrice: "0",
      savings: "0",
      contents: [
        { title: "ハイレゾ対応ユニット", description: "デジタル信号をアナログ変換可能な機材の選定", icon: "Music" },
        { title: "高音質ワイヤリング", description: "デジタル伝送ロスを抑える高品質ケーブル", icon: "Zap" },
        { title: "再生アプリ・設定", description: "スマホやDAPでの最適な再生環境の構築", icon: "Activity" },
        { title: "サウンドチューニング", description: "ハイレゾの広帯域を活かす精密な調整", icon: "Wrench" }
      ],
      notes: [
        "ハイレゾ再生には対応した機材（ナビ、DSP、DAP等）が必要です。",
        "従来のCDプレーヤーやナビでは再生できない場合があります。",
        "FLAC, WAV, DSDなど、機材に合ったフォーマットの選定が重要です。",
        "スピーカー交換などの再生環境を整えることで、より効果を実感できます。",
        "当店ディスプレイにて各プランのデモが可能です。お気軽にお試しください。"
      ]
    },
    lineup: [
      { name: "プランA：Bluetooth接続", price: "0", description: "スマホやDAPから無線で送信。最も手軽に始められるプラン。対応アプリ（1,000円前後）が必要な場合があります。" },
      { name: "プランB：AUX/HDMI外部入力", price: "0", description: "既存ナビの外部入力を利用。HDMI入力があれば高音質伝送が可能。接続用ケーブルが別途必要です。" },
      { name: "プランC：USBトランスポート追加", price: "0", description: "デジタル信号のまま取り出し、高音質なD/Aコンバーターを通して接続。音質が大きく改善されます。" },
      { name: "プランD：ハイレゾ対応ナビ導入", price: "0", description: "操作性も音質も抜群。SDカードやUSBメモリを差し込むだけでスマートに再生。タッチパネル操作も可能。" },
      { name: "プランE：ハイレゾ対応DSP構築", price: "0", description: "現在の主流。デジタル信号のままDSPへ入力し、内蔵の高音質DACで変換。ロスの極めて少ないシステム。" },
      { name: "プランF：LDACワイヤレス接続", price: "0", description: "ワイヤレスながら96k/24bitのハイレゾ伝送を実現。利便性と音質を両立。" },
      { name: "プランG：メディアプレーヤー導入", price: "0", description: "大容量SSD等に対応した専用機。究極を求めるユーザーに人気. ライブラリーを丸ごと持ち歩けます。" }
    ]
  },
  {
    id: 'media_player_guide',
    title: "いま注目！車載メディアプレーヤー",
    badge: "最新トレンド",
    features: ["デジタル高音質伝送", "DSP連携", "車載専用設計"],
    image: "https://picsum.photos/seed/media-player/800/600",
    description: "ナビやCDプレーヤーといったヘッドユニット交換が簡単にできたのは過去の話。最近は純正で装着されたナビゲーションは取り外すことができず、音の入口となるヘッドユニットの音質向上は困難になりました。\n\nそこで新しい選択肢となるのが「車載メディアプレーヤー」です。純正のディスプレイオーディオなどをメインソースとしてカーオーディオの拡張を進めてきた方におすすめで、基本的にはDSPとの組み合わせでシステムを構成します。\n\n光や同軸端子を使ってデジタルデータをそのままDSPへ入力することで、純正オーディオの制限を受けない圧倒的な高音質を実現。スマートフォンやDAPとは異なり、車両に設置して運転しながら楽しむことを前提に設計された、車のための新しい音楽ソースです。",
    category: "知識・ガイド",
    packageDetails: {
      standardPrice: "0",
      savings: "0",
      contents: [
        { title: "メディアプレーヤー本体", description: "高音質フォーマット（ハイレゾ/DSD等）対応の再生機", icon: "Music" },
        { title: "デジタル配線", description: "光（オプティカル）や同軸（コアキシャル）でのデジタル伝送", icon: "Zap" },
        { title: "インストール・固定", description: "車両への確実な設置と電源ワイヤリング", icon: "Wrench" },
        { title: "DSP連携設定", description: "DSP側の入力切替やサウンドチューニング", icon: "Activity" }
      ],
      notes: [
        "基本的にはDSP（デジタルプロセッサー）との組み合わせが必要です。",
        "純正ナビの音質に不満がある方のステップアップに最適です。",
        "USBメモリやSSD等に保存した膨大なライブラリーを車内で楽しめます。",
        "機種により操作方法（リモコン、スマホアプリ等）が異なります。",
        "取付位置やシステム構成により、別途工賃やケーブル代が発生します。"
      ]
    },
    lineup: [
      { name: "audio-technica / AT-HRP5", price: "0", description: "ハイレゾ対応メディアプレーヤー。幅広いフォーマットに対応し、安定した動作が魅力。" },
      { name: "GOLDHORN / G3シリーズ (GTS1PRO / GTS2 / GTS3)", price: "0", description: "圧倒的な高音質を誇るハイエンド・メディアプレーヤー。大容量SSDにも対応。" },
      { name: "GOLDHORN / Pシリーズ (P1 / P2PRO / P3PLUS)", price: "0", description: "コストパフォーマンスに優れたプレーヤー。DSP内蔵モデルもあり、システム構築がスムーズ。" },
      { name: "ALPINE / DSD-Z10", price: "0", description: "DSD再生に対応したハイレゾプレーヤー。繊細な音のニュアンスを余すことなく再現。" }
    ]
  },
  {
    id: 'hi_end_guide',
    title: "ハイエンドスピーカーへの誘い",
    badge: "至高の音",
    features: ["圧倒的な解像度", "正確な音像定位", "芸術的な表現力"],
    image: "https://picsum.photos/seed/hi-end-sp/800/600",
    description: "ハイエンドスピーカーをインストールするには・・・\n\n各ブランドの上位モデルでは、そのスペックをしっかりと活かせるインストレーションやケーブル選びが大切になります。ハイエンドスピーカーに施したいインストール、ケーブル選びなどをご紹介します。\n\nハイエンドスピーカーに興味を持ったらぜひご相談ください。オーナー様の理想を形にする最適なシステムをご提案いたします。",
    category: "知識・ガイド",
    packageDetails: {
      standardPrice: "0",
      savings: "0",
      contents: [
        { title: "ツィーター加工取付", description: "反射を考慮したピラーやドアミラー裏への埋め込み加工", icon: "Activity" },
        { title: "ドアスピーカー取付", description: "抜けを良くする アウターバッフルや強固なバッフル製作", icon: "Wrench" },
        { title: "高音質ワイヤリング", description: "レグザット、M&M、アクロリンク等の高級ケーブル選定", icon: "Zap" },
        { title: "システム構成", description: "DSPを用いたマルチワイヤリング（アクティブ）等の構築", icon: "Layers" }
      ],
      notes: [
        "ハイエンドスピーカーはユニットの性能を引き出すための環境作りが不可欠です。",
        "インナーバッフルでの施工でも、市販品を避けスピーカーをしっかり受け止める製作が重要です。",
        "試聴室ではスピーカーケーブルの比較も可能です。音の違いを体感して選べます。"
      ]
    },
    lineup: [
      { name: "Aピラーツィーター埋め込み加工", price: "44000", description: "反射の影響を考慮した角度決め。左右込 44,000円〜" },
      { name: "オリジナルアウターバッフル製作", price: "107800", description: "スピーカーの抜けを良くし、情報量を最大限に引き出すインストール。" },
      { name: "エンクロージャー仕様アウターバッフル", price: "0", description: "スピーカーと車両に合わせて、排圧をコントロールするこだわりのエンクロージャーを製作。" }
    ]
  },
  {
    id: 'subwoofer_style_guide',
    title: "サブウーハーインストール・スタイルガイド",
    badge: "低音の極致",
    features: ["低音補強", "BOX製作", "ラゲッジ埋め込み"],
    image: "https://picsum.photos/seed/subwoofer/800/600",
    description: "とっても重要なサブウーハーの役割！可聴帯域のほんの一部ですが、建物の基礎と同じでここがしっかりしていないと全体のイメージが希薄になってしまいます。\n\n音は倍音で構成されていますので、サブウーハーが中心でないようなボーカルやピアノの音も、サブウーハーのオンオフで様変わりします。HiFiスタイルからパワーサウンド、重低音スタイルまで、自分だけの個室を好きなサウンドにアレンジして楽しみましょう！",
    category: "知識・ガイド",
    packageDetails: {
      standardPrice: "0",
      savings: "0",
      contents: [
        { title: "サブウーハーユニット", description: "8インチ(20cm)〜18インチ(45cm)まで幅広く対応", icon: "Music" },
        { title: "パワーアンプ", description: "Dクラスモノアンプや2chブリッジ接続など最適な駆動", icon: "Zap" },
        { title: "エンクロージャー(BOX)", description: "シールド・バスレフ等、性能を引き出す適正容量の設計", icon: "Wrench" },
        { title: "ワイヤリング・取付", description: "電源・RCA・SPケーブルの配線と確実な固定・調整", icon: "Activity" }
      ],
      notes: [
        "フロントスピーカーとのバランスを考えた10〜12インチがお勧めです。",
        "BOXの設計（容量や形状）によってウーハーの性能が大きく変わります。",
        "トランク設置時は、荷物の積載を考慮した脱着しやすい固定方法も可能です。"
      ]
    },
    lineup: [
      { name: "お手軽パワードサブウーハー設置", price: "0", description: "アンプ内蔵タイプでコストとスペースを抑制。" },
      { name: "スタンダードBOX設置（トランク）", price: "0", description: "四角いタイプの箱を製作してトランクに設置。" },
      { name: "フロア/スペアタイヤスペース埋め込み", price: "0", description: "サブトランクやスペアタイヤスペースを利用してBOXを製作。" },
      { name: "カスタム・ショーアップインストール", price: "0", description: "LEDライティングやアクリルを組み合わせた魅せるカスタム。" }
    ]
  },
  {
    id: 'custom_install_guide',
    title: "カスタムインストール・ワンオフ製作",
    badge: "完全オーダー",
    features: ["トランクカスタム", "アウターバッフル", "LEDライティング"],
    image: "https://picsum.photos/seed/custom-inst/800/600",
    description: "カーオーディオならでは！いい音を耳で楽しむだけではなく、クールなインストールで目で見て楽しむカスタムオーディオの世界。\n\n代表的な取り付け例をご紹介します。取り付けるユニットや車両、またインストール方法により費用は様々です。まずはお気軽にご相談ください。\n\nオーナー様のイメージするカスタムを具現化するお手伝いをいたします。ワンオフでのカスタムとなり、お車を確認しながらの商談が必要となりますので、ぜひご来店の上ご相談ください。",
    category: "知識・ガイド",
    packageDetails: {
      standardPrice: "0",
      savings: "0",
      contents: [
        { title: "デザイン・設計", description: "車両形状と機材に合わせたワンオフデザイン", icon: "Layers" },
        { title: "造作・加工", description: "MDF、アクリル、パテ等を用いた高度な加工技術", icon: "Wrench" },
        { title: "仕上げ・装飾", description: "レザー、ペイント、LEDライティング等の演出", icon: "Activity" },
        { title: "音響チューニング", description: "カスタム環境に合わせた最適なサウンド調整", icon: "Music" }
      ],
      notes: [
        "記載している価格は一例です。施工内容により大きく変動します。",
        "ワンオフ製作のため、お車をお預かりしての作業となります。",
        "まずはご来店いただき、ご要望をお聞かせください。お見積もりを作成いたします。"
      ]
    },
    lineup: [
      { name: "トランク・カーゴスペースインストール", price: "100000", description: "フロアへの埋め込みやカバー製作. およそ10万円〜。" },
      { name: "セダンタイプトランクインストール", price: "150000", description: "背もたれ裏へのウーハー埋め込みやアンプボード製作. およそ15万円〜。" },
      { name: "ドアカスタムアウターバッフル製作", price: "200000", description: "純正パネルに馴染むカスタムインストール. 左右でおよそ20万円〜。" },
      { name: "ドアパネル全面施工・エンクロージャー", price: "250000", description: "パネル丸ごと張り替えやエンクロージャー化. およそ25万円〜。" },
      { name: "カスタムピラーインストール（3WAY対応）", price: "80000", description: "フロント3WAYに欠かせないピラー加工. 左右でおよそ8万円〜。" }
    ]
  }
];

const initialPlans: PlanCategory[] = [
  {
    id: 'speaker_exchange',
    category: "純正の音に不満がある方へ",
    type: 'audio',
    description: "音がこもる、はっきりしない…\n**スピーカー交換**で驚くほど**クリア**に変わります。\n\n選べる**5つのプラン**をご用意しています。",
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "スピーカー交換BASIC line（コアキシャル）",
        price: "44000",
        features: ["コアキシャルスピーカー交換", "簡易デッドニング", "バーチ材バッフル"],
        badge: "お手軽導入",
        image: "/images/basic-line-coaxial.png",
        description: "音質アップの第一歩はスピーカー交換から！\n\nスピーカー交換パッケージベーシックライン（コアキシャル）ではツィーターがミッドレンジスピーカーの真ん中にビルトインされているコアキシャル（同軸）タイプスピーカーを選んでのスピーカー交換をリーズナブルに取り付けまで行うパッケージです。\nカーオーディオシステムアップが初めての方におすすめのパッケージでツィーターとミッドレンジが一体になっているので手軽に取り付けられるメリットがあります。純正がフルレンジタイプのスピーカーが装着されている車両では、高音専用のツィーターが増えるので、純正スピーカーを交換するだけで音が明るく華やかになります。",
        packageDetails: {
          standardPrice: "55000",
          savings: "11000",
          contents: [
            { title: "スピーカー", description: "17cmモデルまたは10cmモデルのコアキシャルスピーカー", icon: "Speaker" },
            { title: "軽防振", description: "ドアの不要な振動を抑える簡易デッドニング", icon: "Activity" },
            { title: "カスタムインナーバッフル", description: "高剛性バーチ材バッフル（17cmモデルのみ）", icon: "Layers" },
            { title: "スピーカー交換工賃", description: "プロによる確実な取り付け作業", icon: "Wrench" }
          ],
          notes: [
            "バッフル適合が無い車種では別途製作費11,000円が必要です。",
            "このパッケージは現金でのお支払いとなります。",
            "作業時間は車種によりますが1〜3時間の予定です。代車が必要な場合はご予約時にお伝えください。"
          ]
        },
        lineup: [
          { name: "DLS (17cm)", price: "44000", image: "https://picsum.photos/seed/dls-c/200/200" },
          { name: "Rockford (17cm)", price: "44000", image: "https://picsum.photos/seed/rockford-c/200/200" },
          { name: "GroundZero (17cm)", price: "44000", image: "https://picsum.photos/seed/gz-c/200/200" },
          { name: "KICKER (17cm)", price: "44000", image: "https://picsum.photos/seed/kicker-c/200/200" },
          { name: "AUDISON (17cm)", price: "44000", image: "https://picsum.photos/seed/audison-c/200/200" },
          { name: "KICKER (10cm)", price: "44000", image: "https://picsum.photos/seed/kicker-10/200/200" },
          { name: "MOREL (10cm)", price: "44000", image: "https://picsum.photos/seed/morel-10/200/200" },
          { name: "AUDISON (10cm)", price: "44000", image: "https://picsum.photos/seed/audison-10/200/200" },
          { name: "BLAM (10cm)", price: "44000", image: "https://picsum.photos/seed/blam-10/200/200" }
        ]
      },
      {
        name: "スピーカー交換BASIC line（セパレート）",
        price: "59400",
        features: ["セパレートスピーカー交換", "簡易デッドニング", "インラインNW"],
        badge: "初心者おすすめ",
        image: "/images/basic-line-separates.png",
        description: "音質アップの第一歩はスピーカー交換から！\n\nセパレートスピーカーを手軽に楽しめるパッケージ\nスピーカー交換パッケージベーシックライン（セパレート）では高域再生用のツィーターと中低域再生用のミッドレンジが別々に分かれたセパレートタイプのスピーカーを選んでリーズナブルに取り付けまで行うパッケージです。\nカーオーディオシステムアップが初めての方におすすめのパッケージでリーズナブルな取り付けを実現するためにネットワーク（高域と中低域に分離するユニット）はインラインタイプなどを中心にラインアップしています。ツィーターは純正位置、もしくはダッシュボード上へ置き型マウントを使っての装着. 音楽の楽しさを今まで以上に楽しんでいただけるパッケージです。",
        packageDetails: {
          standardPrice: "75900",
          savings: "16500",
          contents: [
            { title: "スピーカー", description: "17cmモデル2WAYセパレートスピーカー", icon: "Speaker" },
            { title: "ツィーター取付", description: "純正位置もしくはオンダッシュ取り付け", icon: "Settings2" },
            { title: "軽防振", description: "ドアの不要な振動を抑える簡易デッドニング", icon: "Activity" },
            { title: "カスタムインナーバッフル", description: "高剛性バーチ材バッフル", icon: "Layers" },
            { title: "スピーカー交換工賃", description: "プロによる確実な取り付け作業", icon: "Wrench" }
          ],
          notes: [
            "バッフル適合が無い車種では別途製作費11,000円が必要です。",
            "ツィーター固定にマウントなどが必要な車種では別途追加が必要になります。",
            "このパッケージは現金でのお支払いとなります。",
            "作業時間は車種によりますが3〜4時間の予定です. 代車が必要な場合はご予約時にお伝えください。"
          ]
        },
        lineup: [
          { name: "ROCKFORD", price: "59400", image: "https://picsum.photos/seed/rockford-s/200/200" },
          { name: "GROUNDZERO", price: "59400", image: "https://picsum.photos/seed/gz-s/200/200" },
          { name: "BLAM", price: "59400", image: "https://picsum.photos/seed/blam-s/200/200" },
          { name: "AUDISON 1", price: "59400", image: "https://picsum.photos/seed/audison-s1/200/200" },
          { name: "AUDISON 2", price: "59400", image: "https://picsum.photos/seed/audison-s2/200/200" },
          { name: "AUDISON 3", price: "59400", image: "https://picsum.photos/seed/audison-s3/200/200" }
        ]
      },
      {
        name: "スピーカー交換STANDARD line（10万円まで）",
        price: "104500",
        features: ["ミドルグレードスピーカー", "本格デッドニング", "インナーバッフル"],
        badge: "コスパ最強",
        image: "/images/standard-line.png",
        description: "音質アップの第一歩はスピーカー交換から！\nスピーカー交換パッケージスタンダードラインでは１０万円までのスピーカーの中からお気に入りのスピーカーを選んでいただき、ドアチューニング、スピーカーケーブルなどがセットになったこだわった内容です。\n\nこの価格帯は各社とも人気商品がラインアップされていて個性が強いユニットが並んでいます。取り付け優先だったり音優先だったりと入り乱れている価格帯でもありますので、商品選びのときはご希望のインストール方法が可能かどうかの判断も必要です。",
        packageDetails: {
          standardPrice: "166400",
          savings: "61900",
          contents: [
            { title: "スピーカー", description: "17cmモデル2WAYスピーカー（10万円まで）", icon: "Speaker" },
            { title: "ドアチューニングAコース", description: "制振材によるドアの環境整備（通常22,000円）", icon: "Activity" },
            { title: "カスタムインナーバッフル", description: "車種に合わせた高剛性バッフル（通常11,000円）", icon: "Layers" },
            { title: "スピーカーケーブル", description: "ANGオリジナル（オーディオテクニカ製相当 10m）", icon: "Zap" },
            { title: "ワイヤリング工賃", description: "プロによる確実な配線・取付（通常22,000円）", icon: "Wrench" }
          ],
          upgrades: [
            { title: "ドアチューニング Bコース", price: "5500", description: "制振材増量（通常27,500円）" },
            { title: "ドアチューニング Aコース", price: "11000", description: "背圧処理にフェリソニDS-1.5WPを使用、制振材増量（通常16,500円）" },
            { title: "メタルバッフル化", price: "定価より20%OFF", description: "カロッツェリア製メタルバッフル. タイトで張りのある再生が可能に。" },
            { title: "ツィーターAピラー埋め込み", price: "46200〜", description: "反射を抑えクリアな音像へ. クールなインテリアも実現。" }
          ],
          notes: [
            "ツィーターは純正位置への取り付け、もしくはダッシュボードへの据え置き取り付けとなります。",
            "ドアスピーカーはインナー取り付けです。",
            "作業は1日お預かりしますが無料代車をご用意していますのでご利用ください。"
          ]
        },
        lineup: [
          { name: "carrozzeria TS-V173S", price: "104500", image: "https://picsum.photos/seed/v173s/200/200" },
          { name: "MOREL MAXIMO ULTRA 602 Mk2", price: "108900", image: "https://picsum.photos/seed/morel602/200/200" },
          { name: "FOCAL PS 165 FXE", price: "110000", image: "https://picsum.photos/seed/focal-fxe/200/200" },
          { name: "DYNAUDIO ESOTAN 232", price: "110000", image: "https://picsum.photos/seed/esotan232/200/200" },
          { name: "BLAM 165 LSQ", price: "110000", image: "https://picsum.photos/seed/blam-lsq/200/200" },
          { name: "DIATONE DS-G400", price: "132000", image: "https://picsum.photos/seed/ds-g400/200/200" }
        ]
      },
      {
        name: "スピーカー交換PREMIUM line（10万円以上）",
        price: "184800",
        features: ["ハイグレードスピーカー", "フルデッドニング", "ツィーター調整"],
        badge: "人気No.1",
        image: "/images/premium-line.png",
        description: "音質アップの第一歩はスピーカー交換から！\nスピーカー交換パッケージプレミアムラインでは１０万円以上のスピーカーの中からお気に入りのスピーカーを選んでいただき、ドアチューニング、スピーカーケーブルなどがセットになったこだわった内容です。\n\nこの価格帯は各社とも音楽性の再現に重きを置き、素材選びから構造までそれぞれのブランドのこだわりが凝縮されているところで、音質的には情報量が多く質感やフォーカス、ステレオイメージの再現性などがワンランク上の世界を楽しませてくれます。",
        packageDetails: {
          standardPrice: "252200",
          savings: "67400",
          contents: [
            { title: "スピーカー", description: "17cmモデル2WAYスピーカー（10万円以上）", icon: "Speaker" },
            { title: "ドアチューニングBコース", description: "制振材によるドアの環境整備（通常27,500円）", icon: "Activity" },
            { title: "カスタムインナーバッフル", description: "車種に合わせた高剛性バッフル（通常11,000円）", icon: "Layers" },
            { title: "スピーカーケーブル", description: "ANGオリジナル（オーディオテクニカ製相当 10m）", icon: "Zap" },
            { title: "ワイヤリング工賃", description: "プロによる確実な配線・取付（通常22,000円）", icon: "Wrench" }
          ],
          upgrades: [
            { title: "ドアチューニング Aコース", price: "11000", description: "背圧処理にフェリソニDS-1.5WPを使用、制振材増量（通常16,500円）" },
            { title: "ドアチューニング A+コース", price: "22000", description: "背圧処理にフェリソニC2を使用、制振材増量（通常27,500円）" },
            { title: "メタルバッフル化", price: "定価より20%OFF", description: "カロッツェリア製メタルバッフル. タイトで張りのある再生が可能に。" },
            { title: "ツィーターAピラー埋め込み", price: "46200〜", description: "反射を抑えクリアな音像へ. クールなインテリアも実現。" }
          ],
          notes: [
            "ツィーターは純正位置への取り付け、もしくはダッシュボードへの据え置き取り付けとなります。",
            "ドアスピーカーはインナー取り付けです。",
            "作業は1日お預かりしますが無料代車をご用意していますのでご利用ください。"
          ]
        },
        lineup: [
          { name: "carrozzeria TS-Z900PRS", price: "184800", image: "https://picsum.photos/seed/z900prs/200/200" },
          { name: "MOREL HYBRID 602", price: "198000", image: "https://picsum.photos/seed/morel-hybrid/200/200" },
          { name: "FOCAL ES 165 K2", price: "210000", image: "https://picsum.photos/seed/focal-k2/200/200" },
          { name: "DYNAUDIO ESOTEC 242", price: "220000", image: "https://picsum.photos/seed/esotec242/200/200" },
          { name: "BLAM 165 Signature", price: "230000", image: "https://picsum.photos/seed/blam-sig/200/200" }
        ]
      }
    ]
  },
  {
    id: 'bass_enhancement',
    category: "低音を強化したい方へ",
    type: 'audio',
    description: "低音が物足りない、迫力が欲しい…\n**サブウーファーの追加**で、音楽の土台となる**厚みと迫力**をプラスします。\n\nお好みに合わせたシステムをご提案します。",
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "お手軽低音増強セット",
        price: "42000",
        features: ["シート下設置可", "アンプ内蔵タイプ", "取付工賃込"],
        badge: "パワードウーハー",
        image: "/images/Top/speaker.webp",
        description: "お手軽低音増強セット\n建物と同じように、音楽にも基礎となる低域はとても重要です。しっかりとした低音(ウーハー)は音楽に臨場感を与えてくれます。ここでご紹介するウーハーはアンプ内蔵タイプのパワードウーハー（チューンアップウーハー）。シート下に収まるようなコンパクトなウーハーからパワードタイプとは思えない本格的なサウンドのウーハーまで取り付け込みでご提案しています。",
        packageDetails: {
          standardPrice: "55000",
          savings: "13000",
          contents: [
            { title: "パワードウーハー", description: "アンプ内蔵型サブウーファーユニット", icon: "Speaker" },
            { title: "配線一式", description: "必要な電源ケーブル・信号ケーブル一式", icon: "Zap" },
            { title: "ワイヤリング工賃", description: "プロによる確実な配線・取付作業", icon: "Wrench" }
          ],
          notes: [
            "車種や仕様によりパッケージ価格に追加が必要な場合があります。",
            "作業は1日お車をお預かりしますが無料代車をご用意していますのでご利用ください。"
          ]
        },
        lineup: [
          { name: "ALPINE SWE-1080", price: "42000", image: "https://picsum.photos/seed/swe1080/200/200" },
          { name: "PIONEER TS-WH500A", price: "51000", image: "https://picsum.photos/seed/wh500a/200/200" },
          { name: "PIONEER TS-WX400DA/WX300TA/WX300A/WX1010A", price: "57000", image: "https://picsum.photos/seed/wx400da/200/200" },
          { name: "carrozzeria TS-WX1210A", price: "62000", image: "https://picsum.photos/seed/wx1210a/200/200" },
          { name: "PIONEER TS-WH1000A", price: "76000", image: "https://picsum.photos/seed/wh1000a/200/200" },
          { name: "HELIX U10A", price: "86000", image: "https://picsum.photos/seed/u10a/200/200" },
          { name: "CERWIN VEGA VPAS10", price: "91000", image: "https://picsum.photos/seed/vpas10/200/200" },
          { name: "audison (105セット)", price: "100000", image: "https://picsum.photos/seed/audison105/200/200" },
          { name: "KICKER HYDEAWAY (108セット)", price: "108000", image: "https://picsum.photos/seed/hydeaway/200/200" }
        ]
      },
      {
        name: "お手軽低音増強セット”プラス”",
        price: "110000",
        features: ["BOX+ウーハー", "別体アンプ"],
        badge: "本格低音",
        image: "/images/subwoofer-plus.png",
        description: "ウーハー＋BOXに別体アンプを組み合わせます\nお手軽低音増強セットはスピーカー交換パッケージと同じく大人気のパッケージです。手軽に追加できるパワードウーハーはシート下などの空きスペースを上手く活用することで音楽表現を一歩グレードアップしてくれます。ここで紹介するお手軽低音増強セット”プラス”では、パワードウーハーではなくアンプとウーハーを別々にセットアップすることでもう一歩本格的な低音体験を実現します。",
        link: "https://www.soundang.com/amp&swpac.html",
        packageDetails: {
          standardPrice: "110000",
          savings: "22000",
          contents: [
            { title: "BOX+ウーハーのセットモデル", description: "専用設計のウーファーボックスとユニットのセット", icon: "Speaker" },
            { title: "ウーハー用パワーアンプ", description: "ウーファーを強力に駆動する専用外部アンプ", icon: "Zap" },
            { title: "電源ケーブル", description: "8AWGまたは12AWG高品質電源ケーブル（機種による）", icon: "Zap" },
            { title: "信号入力", description: "ヘッドユニットに応じた最適な入力配線", icon: "Layers" },
            { title: "ワイヤリング工賃", description: "プロによる確実な配線・設置作業", icon: "Wrench" }
          ],
          notes: [
            "車種や仕様によりパッケージ価格に追加が必要な場合があります。",
            "電源ケーブルは機種により8AWGまたは12AWGを使用します。",
            "アンプやBOXの設置にボード製作が必要な場合は別途5,500円〜承ります。",
            "アンプの性能を出し切るためにボディアース施工を行います。",
            "作業は１日お車をお預かりしますが無料代車をご用意していますのでご利用ください。"
          ]
        },
        lineup: [
          { name: "GLADEN MOSCONI (88セット)", price: "88000", image: "https://picsum.photos/seed/gladen/200/200" },
          { name: "carrozzeria (98セット)", price: "98000", image: "https://picsum.photos/seed/carrozzeria-plus/200/200" },
          { name: "VIBE British Audio (108セット)", price: "108000", image: "https://picsum.photos/seed/vibe/200/200" },
          { name: "Kicker (128セット)", price: "128000", image: "https://picsum.photos/seed/kicker-plus1/200/200" },
          { name: "Rockford Fosgate (148セット)", price: "148000", image: "https://picsum.photos/seed/rockford-plus1/200/200" },
          { name: "AUDISON (168セット)", price: "168000", image: "https://picsum.photos/seed/audison-plus/200/200" },
          { name: "Kicker (198セット)", price: "198000", image: "https://picsum.photos/seed/kicker-plus2/200/200" },
          { name: "Rockford Fosgate (240セット)", price: "240000", image: "https://picsum.photos/seed/rockford-plus2/200/200" }
        ]
      }
    ]
  },
  {
    id: 'dsp_control',
    category: "音を整えたい・臨場感を出したい方へ",
    type: 'audio',
    description: "音がバラバラに聞こえる、定位がはっきりしない…\n**DSP（デジタルプロセッサー）**で音のタイミングを緻密に補正。\n\nダッシュボード上にアーティストが浮かび上がるような**音像**を創ります。",
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "アンプ内蔵DSPパッケージ",
        price: "110000",
        features: ["純正ナビ連動", "タイムアライメント調整", "高音質アンプ内蔵"],
        badge: "音像定位",
        image: "https://picsum.photos/seed/amp-dsp/800/600",
        description: "今のナビはそのままに音質をグレードアップさせることができるのが「アンプ内蔵タイプのDSP」です。\n\n【こんな方におすすめ】\n・今あるナビやヘッドユニットを替えずに音質アップしたい！\n・大画面ナビを購入したいけど、そのナビの音質に不満…\n・フロント3WAYシステムを手軽に始めたい！\n・フロントマルチ接続にしたいけどリアスピーカーも使いたい…\n\n特別な操作は必要ありません。今まで通りお使いいただけますが、目の前に臨場感豊かなステージが出現したかのようなサウンドに生まれ変わります。ハイエンドオーディオ機に匹敵するほどの緻密な調整機能を備えています。",
        link: "https://www.soundang.com/ampDSP.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "110000",
          savings: "0",
          contents: [
            { title: "電源ケーブル", description: "バッテリーから直接電源を取り出すワイヤリング（プラス・マイナス）", icon: "Zap" },
            { title: "ヒューズホルダー・ヒューズ", description: "安全性を確保するための保護回路", icon: "Activity" },
            { title: "入出力信号ケーブル", description: "入力信号用および出力用スピーカーケーブル一式", icon: "Layers" },
            { title: "インストール・チューニング", description: "プロによる精密な設置とサウンドチューニング費用込", icon: "Wrench" }
          ],
          notes: [
            "商品代金・ワイヤリング工賃・ケーブル代・調整代を含めたパッケージ価格です。",
            "ドア通線などが必要な車両は別途追加が必要な場合があります。",
            "本体の取り付け位置やバッテリーの位置によって追加費用（約5,500円〜）が発生する場合があります。",
            "純正マルチシステム等ではチャンネル合成機能（サミング）の確認が必要です。",
            "作業時間はほとんどの場合1日です。無料代車をご用意しています。"
          ]
        },
        lineup: [
          { name: "MATCH / M-5.4DSP", price: "110000", image: "https://picsum.photos/seed/m54dsp/200/200" },
          { name: "MATCH / PP-62DSP", price: "110000", image: "https://picsum.photos/seed/pp62dsp/200/200" },
          { name: "MATCH / UP-7DSP", price: "165000", image: "https://picsum.photos/seed/up7dsp/200/200" },
          { name: "HELIX / V-EIGHT DSP MK2", price: "220000", image: "https://picsum.photos/seed/v8dsp/200/200" },
          { name: "PLUG&PLAY / 1080", price: "121000", image: "https://picsum.photos/seed/pp1080/200/200" },
          { name: "GOLDHORN / GDT42", price: "88000", image: "https://picsum.photos/seed/gdt42/200/200" }
        ]
      }
    ]
  },
  {
    id: 'amp_power',
    category: "音のパワー・解像度を上げたい方へ",
    type: 'audio',
    description: "音が痩せている、もっとパワーが欲しい…\n**外部アンプ**を導入し、スピーカーを強力に駆動。\n\n繊細な音からダイナミックな音まで、**余裕を持って再生**します。",
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "アンプインストベーシック",
        price: "55000",
        features: ["4chパワーアンプ", "高音質配線", "取付工賃込パッケージ"],
        badge: "駆動力UP",
        image: "https://picsum.photos/seed/amp/800/600",
        description: "「スピーカーを変えたけど、もっと良くしたい」「音に力強さが欲しい」そんな方に次にお勧めするのがパワーアンプの追加です。\n\nパワーアンプの役割は、スピーカーをしっかりとコントロールしリニアなサウンドを再生することです。それにより微細な再現力が増加し、情報量がアップします。音像の輪郭や空気感、奥行きや音のハリ、スピード感が劇的に改善されます。\n\n大音量で鳴らすためだけではなく、通常のドライブでいい音楽を楽しむためにアンプを搭載することは、さらなる臨場感の獲得、今まで感じていた目の前の霧が晴れるようなサウンドを得るために非常に有効です。ブランドやモデルによっても音作りの狙いが異なり、様々な変化を楽しめるのも魅力です。",
        link: "https://www.soundang.com/ampbasic-inst.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "55000",
          savings: "0",
          contents: [
            { title: "パワーアンプ本体", description: "お好みのブランドから選択可能（差額対応あり）", icon: "Zap" },
            { title: "電源ケーブル一式", description: "バッテリー直接配線、メインヒューズ、リモート線等", icon: "Activity" },
            { title: "音声入出力ケーブル", description: "RCAまたはスピーカー入力、スピーカー出力用配線", icon: "Music" },
            { title: "取付・ワイヤリング", description: "アンプ設置ボード製作、内装脱着、配線引き回し工賃込", icon: "Wrench" }
          ],
          notes: [
            "車種により追加費用が必要な場合があります。",
            "ヘッドユニットにRCA出力がない場合は、ハイレベル入力対応アンプの使用やハイローコンバーターの追加が可能です。",
            "このパッケージは現金でのお支払いとなります。詳しくはお問い合わせください。",
            "作業は1〜2日お預かりとなります。無料代車をご用意しています。"
          ]
        },
        lineup: [
          { name: "ZAPCO / HELIX / KICKER 等", description: "世界的な定番ブランド。力強く正確なドライブが魅力。" },
          { name: "ATOMO2 / ETON POWER220.4", description: "小型ながら高音質。設置場所を選ばない最新モデル。" },
          { name: "PRS-D800 / ARCA ATOMO4", description: "解像度重視の国産・海外ブランド。繊細な表現力。" },
          { name: "MOSCONI GLADEN PRO / DLS", description: "ハイエンドな質感。音楽性を重視する方へ。" }
        ]
      },
      {
        name: "省スペース”小型”パワーアンプパッケージ",
        price: "33000",
        features: ["コンパクト設置", "省電力設計", "取付工賃込パッケージ"],
        badge: "スマート導入",
        image: "https://picsum.photos/seed/miniamp/800/600",
        description: "最近は小型省エネながら高音質なパワーアンプが数々登場してきました。パワーアンプの取り付けには取り付けスペースと消費電力アップなどの問題が絡んできます。\n\nとくに近年は充電制御された車両が多く、思ったほどバッテリーのリカバリーがスムーズにされない場合もあり、バッテリーあがりを懸念してパワーアンプ導入をためらうユーザーも少なくありません。ここでは省電力でなおかつ小型の高音質パワーアンプを取付込みにてご提案します。",
        link: "https://www.soundang.com/miniamp.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "33000",
          savings: "0",
          contents: [
            { title: "パワーアンプ本体", description: "小型・高効率なDクラスアンプ等から選択", icon: "Zap" },
            { title: "ワイヤリング工賃", description: "バッテリー直接配線（バッ直）を含む標準取付工賃", icon: "Wrench" },
            { title: "電源アクセサリー", description: "電源ケーブル、ヒューズホルダー、端子類一式", icon: "Activity" },
            { title: "信号・出力ケーブル", description: "RCAケーブル、スピーカーケーブル等", icon: "Music" }
          ],
          notes: [
            "スピーカーケーブルワイヤリングは純正スピーカーの場合はナビ裏まで、スピーカー交換済みの場合は付属のネットワークまでのワイヤリングとなります。",
            "ドア通線を伴うワイヤリングが必要な場合は別途11,000円が必要となります。（ドア通線がカプラー方式の場合は別途加工賃が必要となります。）",
            "車種により追加パーツが必要な場合があります。",
            "作業時間は半日〜1日程度です。無料代車をご用意しています。"
          ]
        },
        lineup: [
          { name: "VIBE / POWERBOX65.4M-V7", description: "超小型ながらパワフルな4chアンプ。" },
          { name: "Pioneer / GM-D1400-2", description: "コンソール内に収まるコンパクト設計の定番モデル。" },
          { name: "MATCH / M2.1AMP", description: "ドイツ製。ハイレゾ対応の超小型2chアンプ。" },
          { name: "Ground Zero / GZ-MINI", description: "高音質とパワーを両立したミニシリーズ。" },
          { name: "KICKER / KEY200.4", description: "自動音場補正DSP機能を内蔵した画期的な小型アンプ。" },
          { name: "MOSCONI / ATOMO2", description: "イタリア製。マッチ箱サイズのハイエンドアンプ。" },
          { name: "PLUG&PLAY / 1080", description: "純正オーディオにカプラーオンで接続可能なモデル。" }
        ]
      }
    ]
  },
  {
    id: 'source_headunit',
    category: "最新機能を追加したい・ソースを良くしたい方へ",
    type: 'audio',
    description: "機能が古い、音源の質を上げたい…\n**高音質ユニット**への交換で、音源の読み取り精度を向上。\n\n**上質な信号**をシステム全体に送り出します。",
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "ナビゲーションの頂点【サイバーナビ】で楽しむ！",
        price: "220000",
        features: ["最高峰の音質", "ネットワーク機能", "エンタメ進化"],
        badge: "究極のソース",
        image: "https://picsum.photos/seed/cyber-navi/800/600",
        description: "LTE回線による高速インターネットを装備したカーナビ、カロッツェリア「サイバーナビ」シリーズ。いままでになかった新たな領域へカーナビが進化しました。\n\nナビ性能・音質・さらに次世代のエンターテイメント機能を手に入れた唯一無二の存在です。当店では、プロによる確実なインストールと緻密なサウンド調整を含めた「サイバーナビパッケージ」をご用意しました。サイバーナビの持つ真のポテンシャルを最大限に引き出します。",
        showSavings: false,
        packageDetails: {
          standardPrice: "220000",
          savings: "0",
          contents: [
            { title: "サイバーナビ本体", description: "最新の912Ⅳシリーズ（DCモデルまたは通常モデル）", icon: "Music" },
            { title: "ナビインストール費用", description: "車両への確実な設置とワイヤリング", icon: "Wrench" },
            { title: "サウンド調整", description: "サイバーナビの高度な調整機能を活かしたプロのセッティング", icon: "Activity" },
            { title: "ネットワーク設定", description: "DCモデルの場合の通信設定サポート", icon: "Zap" }
          ],
          notes: [
            "別途、車種ごとの取付金具・配線キットが必要です。",
            "9インチ・8インチモデルは電源ケーブルが同梱されていないため、別途必要です。",
            "スピーカー接続は「フロント・リア接続」または「フロントマルチ接続」から選択可能です。",
            "適合不可な車種でも、加工により他サイズを施工できる場合があります。ご相談ください。",
            "車種により追加工賃が発生する場合があります。"
          ]
        },
        lineup: [
          {
            name: "サイバーナビDC (ネットワークスティック同梱)",
            price: "220000",
            description: "エンターテイメントを楽しみ尽くすプラン。912Ⅳ-DCシリーズ。車内がWi-Fiスポットに。",
            image: "https://picsum.photos/seed/cyber-dc/400/300"
          },
          {
            name: "サイバーナビ (ネットワークスティックレス)",
            price: "198000",
            description: "ネットワークスティックを省いたお手軽プラン。後からスティックを追加することも可能です。",
            image: "https://picsum.photos/seed/cyber-std/400/300"
          },
          {
            name: "対応モデル：CQ912-4DC / CL912-4DC / CW912-4DC / CZ912-4DC",
            price: "0",
            description: "9インチから7インチまで、お車に最適なサイズをラインナップ。",
            image: "https://picsum.photos/seed/cyber-lineup/400/300"
          }
        ]
      },
      { name: "ヘッドユニット/プロセッサー", price: "110000", features: ["1DIN/2DIN高音質機", "デジタル出力"], badge: "ピュアオーディオ", image: "/images/speaker.jpg" }
    ]
  },
  {
    id: 'car_specific',
    category: "自分の車に最適なプランを知りたい方へ",
    type: 'audio',
    description: "自分の車に合うものがわからない…\n**車種専用設計**のパッケージで、加工を最小限に抑えつつ**最大限の効果**を発揮。\n\n安心のインストールをご提案します。",
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "BMWスピーカー交換パッケージ",
        price: "77000",
        features: ["車種専用設計", "純正加工なし", "音質劇的向上"],
        badge: "純正交換",
        image: "https://picsum.photos/seed/bmw-audio/800/600",
        description: "BMWの音質にお悩みの方に！BMWは輸入車の中でダントツに改善のご相談が多いブランドです。\n\n多くのグレードでフロントスピーカーが10cm程度と小さく、高音用のツィーターが非装着、シート下のウーハーで低音を補うシステムになっています。このため、音がこもりがちでメリハリが足りないと感じるオーナー様が多いのが現状です。\n\n加工を抑え、安価かつ効果的に音質改善する方法として「トレードインスピーカー」への交換をご提案します。ツィーターの追加やシート下ウーハーの交換により、BMW本来の走りに見合うハリのあるサウンドへと生まれ変わります。",
        showSavings: false,
        packageDetails: {
          standardPrice: "77000",
          savings: "0",
          contents: [
            { title: "トレードインスピーカー", description: "BMW専用設計のボルトオン交換スピーカー", icon: "Speaker" },
            { title: "インストール費用", description: "内張り脱着、スピーカー固定、配線処理", icon: "Wrench" },
            { title: "ドアチューニング", description: "スピーカーの性能を引き出す制振・吸音処理", icon: "Activity" },
            { title: "サウンドチェック", description: "位相確認および簡易音響測定・調整", icon: "Zap" }
          ],
          notes: [
            "純正ツィーター非装着車の場合、別途純正ツィーターカバー等が必要になる場合があります（約15,000円前後）。",
            "シート下ウーハーの交換も可能です。2Ω/4Ωモデルの選択が必要な場合があります。",
            "車種やグレードにより適合が異なります。車検証等で正確な適合を確認いたします。",
            "作業時間はフロントスピーカー交換で約3〜4時間程度です。代車もご利用いただけます。",
            "センタースピーカーやリアスピーカーの交換も承っております。"
          ]
        },
        lineup: [
          {
            name: "Focal IS BMW 100L (2WAY)",
            price: "93500",
            description: "フランスの名門Focal。繊細で透明感のある高域が特徴。適合：F20, F30, G30, F48等多数。",
            image: "https://picsum.photos/seed/focal-bmw/400/300"
          },
          {
            name: "Focal IC BMW 100L (同軸)",
            price: "77000",
            description: "コアキシャル（同軸）タイプ。手軽にFocalサウンドを楽しめます。適合：F20, F30, G30, MINI等。",
            image: "https://picsum.photos/seed/focal-ic/400/300"
          },
          {
            name: "Focal BMF30KV2 (ハイグレード)",
            price: "151800",
            description: "Focal K2 Powerシリーズを採用したハイグレードモデル。圧倒的な情報量とパワー感。",
            image: "https://picsum.photos/seed/focal-k2/400/300"
          },
          {
            name: "Focal ISUB BMW 2/4 (ウーハー)",
            price: "104500",
            description: "シート下ウーハー交換用。低域のキレと厚みが劇的に改善されます。左右セット価格。",
            image: "https://picsum.photos/seed/focal-isub/400/300"
          },
          {
            name: "BLAM Signatureシリーズ",
            price: "168080",
            description: "フランスBLAMの最上級シリーズ。ヴォーカルの艶やかさとリアリティが際立ちます。",
            image: "https://picsum.photos/seed/blam-bmw/400/300"
          },
          {
            name: "ETON B100W / B100T / B100N",
            price: "96800",
            description: "ドイツETON。BMW専用設計の先駆け。ナチュラルで聴き疲れしないサウンド。適合車種が非常に豊富です。",
            image: "https://picsum.photos/seed/eton-bmw/400/300"
          },
          {
            name: "a/tack PFS10A / PFS10B",
            price: "84240",
            description: "BMW専用品に特化したa/tack。純正の雰囲気を壊さず、確実な音質アップを約束します。",
            image: "https://picsum.photos/seed/atack-bmw/400/300"
          }
        ]
      },
      {
        name: "Mercedes Benzスピーカー交換パッケージ",
        price: "88000",
        features: ["車種専用設計", "純正加工なし", "音質劇的向上"],
        badge: "純正交換",
        image: "https://picsum.photos/seed/benz-audio/800/600",
        description: "Mercedes-Benzの音質にお悩みの方に！最近のベンツ一部車種ではスピーカーの小型化が進み、音質に不満を持つ方が多くなってきました。\n\nお車にダメージを与えない「トレードインタイプ」のスピーカー交換であれば、比較的手軽に、そして良好に音質アップさせることが可能です。純正の雰囲気を損なわず、ボルトオンで装着可能な専用設計モデルを多数ラインナップしています。\n\nフロントスピーカーの交換はもちろん、リア、センター、そして足元のウーハーまで、トータルでのシステムアップをご提案いたします。",
        showSavings: false,
        packageDetails: {
          standardPrice: "88000",
          savings: "0",
          contents: [
            { title: "トレードインスピーカー", description: "メルセデス専用設計のボルトオン交換スピーカー", icon: "Speaker" },
            { title: "インストール費用", description: "内張り脱着、スピーカー固定、配線処理", icon: "Wrench" },
            { title: "ドアチューニング", description: "スピーカーの性能を引き出す制振・吸音処理", icon: "Activity" },
            { title: "サウンドチェック", description: "位相確認および簡易音響測定・調整", icon: "Zap" }
          ],
          notes: [
            "Cクラス(W205)、Eクラス(W213)、GLC(X253)等、主要モデルに幅広く対応しています。",
            "オプションや年式により、別途純正部品やフィルターが必要になる場合があります。",
            "足元の純正サブウーハーが片側のみの車両も、左右セットへのアップグレードが可能です。",
            "作業時間はフロントスピーカー交換で約3〜4時間程度です。代車もご利用いただけます。",
            "センタースピーカーやリアスピーカーの交換も承っております。"
          ]
        },
        lineup: [
          {
            name: "Focal K2 POWER シリーズ (MB213/205KJ2)",
            price: "154000",
            description: "Focalの代名詞K2 Powerを採用。圧倒的な解像度とパワー感。フロント2WAYセット。",
            image: "https://picsum.photos/seed/focal-benz-k2/400/300"
          },
          {
            name: "Focal FLAX EVO シリーズ (IS MBZ 100)",
            price: "99000",
            description: "ナチュラルな音質が魅力のFLAXコーン。フロント2WAYセット。",
            image: "https://picsum.photos/seed/focal-benz-flax/400/300"
          },
          {
            name: "BLAM Signature シリーズ (100S24 MB)",
            price: "138600",
            description: "フランスBLAMの最上級シリーズ。ヴォーカルの艶やかさとリアリティが際立ちます。",
            image: "https://picsum.photos/seed/blam-benz/400/300"
          },
          {
            name: "MATCH UP C42MB-FRT",
            price: "72900",
            description: "ドイツMATCH。コストパフォーマンスに優れ、純正からのステップアップに最適。",
            image: "https://picsum.photos/seed/match-benz/400/300"
          },
          {
            name: "ETON UG MB-100F",
            price: "132000",
            description: "ドイツETON。BMW同様、ベンツ専用設計でも高い信頼性を誇るハイグレードモデル。",
            image: "https://picsum.photos/seed/eton-benz/400/300"
          },
          {
            name: "BEWITH MBZSUB/213R (ウーハー)",
            price: "79200",
            description: "日本BEWITH。足元のウーハーを交換し、低域のキレを劇的に改善。左右セット価格。",
            image: "https://picsum.photos/seed/bewith-benz/400/300"
          },
          {
            name: "Focal MB213KJ5T (フルセット)",
            price: "385000",
            description: "フロント/リア/センターを全てK2 Powerで統一する究極のパッケージ。",
            image: "https://picsum.photos/seed/focal-benz-full/400/300"
          }
        ]
      },
      {
        name: "車種別スピーカー交換プラン",
        price: "44000",
        features: ["人気車種別セット", "工賃込", "純正復帰可能"],
        badge: "安心パック",
        image: "https://picsum.photos/seed/car-specific-audio/800/600",
        description: "人気車種にフィットするお手軽スピーカー交換プラン！初めてカーオーディオにチャレンジしてみるという方を対象に、できるだけローコストで楽しんでもらえるプランをご用意しました。\n\nコストを抑えるために車種ごとに特化したパッケージ化を行っており、最近増えているサブスク型の車両購入に合わせて、車両側へのダメージをなくし、売却時には元に戻せるような設計になっています。まずは人気車種から対応を開始しており、順次対象車種を拡大中です。",
        showSavings: false,
        packageDetails: {
          standardPrice: "44000",
          savings: "0",
          contents: [
            { title: "セパレートスピーカー", description: "車種に合わせた最適なスピーカーユニット", icon: "Speaker" },
            { title: "専用バッフル・配線", description: "無加工で取り付け可能な専用マウントとカプラー", icon: "Wrench" },
            { title: "インストール費用", description: "車種ごとのノウハウを活かした確実な取り付け", icon: "Activity" },
            { title: "サウンドチェック", description: "位相確認および簡易音響測定・調整", icon: "Zap" }
          ],
          notes: [
            "表示価格はエントリープランの目安です。選択するスピーカーにより価格が変動します。",
            "車両側の加工を一切行わないため、将来的な純正復帰が容易です。",
            "サブスクリプションやリース車両の方でも安心してご利用いただけます。",
            "作業時間は約2〜3時間程度です。店頭でお待ちいただくことも可能です。",
            "対象車種にない場合でも、汎用バッフル等で対応可能な場合があります。お気軽にご相談ください。"
          ]
        },
        lineup: [
          {
            name: "ダイハツ：タント / ムーヴ・キャンバス / ウェイク",
            price: "44000",
            description: "軽自動車の人気モデルに特化。クリアな中高域でドライブがもっと楽しくなります。",
            image: "https://picsum.photos/seed/daihatsu-audio/400/300"
          },
          {
            name: "ホンダ：N-BOX / N-WGN / FIT",
            price: "44000",
            description: "圧倒的な販売台数を誇るNシリーズ。純正の物足りなさを手軽に解消します。",
            image: "https://picsum.photos/seed/honda-audio/400/300"
          },
          {
            name: "スズキ：ジムニー / スイフト",
            price: "44000",
            description: "ジムニー/シエラ(H30.7〜)やスイフトスポーツ等、趣味性の高い車種にも対応。",
            image: "https://picsum.photos/seed/suzuki-audio/400/300"
          },
          {
            name: "トヨタ：アルファード / ヴェルファイア / プリウス",
            price: "55000",
            description: "30/40系アルヴェル、新型プリウス(R5.1〜)等、最新モデルの適合も充実。",
            image: "https://picsum.photos/seed/toyota-audio/400/300"
          },
          {
            name: "トヨタ：ランクル300 / プラド / C-HR",
            price: "55000",
            description: "SUVの人気モデル。大柄な車体に負けない、芯のあるサウンドを実現します。",
            image: "https://picsum.photos/seed/toyota-suv/400/300"
          },
          {
            name: "スバル：レヴォーグ / フォレスター",
            price: "55000",
            description: "走りのスバル車に。ロードノイズに負けないクリアな音楽空間を提供します。",
            image: "https://picsum.photos/seed/subaru-audio/400/300"
          },
          {
            name: "JEEP：RENEGADE / COMPASS",
            price: "66000",
            description: "輸入車SUVのエントリーモデル。専用設計でスマートに音質アップが可能です。",
            image: "https://picsum.photos/seed/jeep-audio/400/300"
          }
        ]
      }
    ]
  },
  {
    id: 'environment_tuning',
    category: "静かにしたい・環境を整えたい方へ",
    type: 'audio',
    description: "ロードノイズが気になる、もっと静かにしたい…\n**デッドニング**や**遮音施工**で、物理的な環境を改善。\n\n機材のポテンシャルを**120%引き出し**、快適な車内空間を作ります。",
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "ドアチューニング",
        price: "27500",
        features: ["制振・吸音・拡散・遮音", "予算に合わせた4コース", "スピーカーの性能を最大化"],
        badge: "音質向上の必須施工",
        image: "https://picsum.photos/seed/door/800/600",
        description: "カーオーディオの音質向上の一番手はスピーカー交換です。そしてその効果を揺るぎないものにするためにはドアチューニング(デッドニング)が必要不可欠です。一般的にはデッドニング(防振)と呼ばれていますが、ドアでスピーカーを適切に鳴らすにはデッドニング(防振)だけではなく、吸音・拡散・遮音などの要素を複合的に処理していく必要があります。そのため当店ではドアチューニングというネーミングを使っています。このパッケージではお客様の予算に応じて適切な施工を行います。ドアの構造や取り付けるスピーカーの組み合わせに応じて材料やアプローチを臨機応変に対応し、予算の中で最もパフォーマンスの高い方法を選択するようにしています。",
        link: "https://www.soundang.com/door-turning.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "0",
          savings: "0",
          contents: [
            { title: "制振材", description: "鉄板の共振を抑え、不要なノイズを低減", icon: "Activity" },
            { title: "吸音材", description: "スピーカー背面の音を処理し、クリアな音質へ", icon: "Speaker" },
            { title: "遮音・拡散材", description: "音の透過を防ぎ、理想的な響きをコントロール", icon: "Layers" },
            { title: "施工工賃", description: "ドアの構造に合わせた最適なアプローチでの施工", icon: "Wrench" }
          ],
          notes: [
            "車種やドアの構造により、最適な材料を臨機応変に選択します。",
            "コンペ仕様や静音仕様など、ご要望に合わせたカスタムプランも可能です。",
            "作業時間はコースにより異なります。無料代車をご用意しています。"
          ]
        },
        lineup: [
          {
            name: "Bコース（ベーシック）",
            price: "27500",
            description: "スピーカー周辺の鉄板共振を抑えるデッドニングを中心に施工。外板にもデッドニングを施し、大きなサービスホールがある場合は吸音材などを使用します。スピーカー周りは定在波を抑えるため鉄板側・内張り側個別に対策します。",
            image: "https://picsum.photos/seed/door-b/400/300"
          },
          {
            name: "Aコース",
            price: "44000",
            description: "内板・外板ともBコースよりデッドニング材料を増やし、より強固にアップグレード。スピーカー裏の背圧処理を行い、音の立ち上がりを改善します。",
            image: "https://picsum.photos/seed/door-a/400/300"
          },
          {
            name: "Sコース",
            price: "66000",
            description: "ドア全面施工。外からの音の侵入や音漏れを軽減。外板には高機能制振材、スピーカー裏には評価の高い吸音材を使用。内板表面を遮音材で抑え、内張り側にも吸音材を張り込みS/Nアップを図ります。",
            image: "https://picsum.photos/seed/door-s/400/300"
          },
          {
            name: "SSコース（強度優先）",
            price: "99000",
            description: "ドア全面施工。ドア強度を上げてタイトでハリのあるサウンドを再生。複数種類のデッドニング材を貼り合わせ音速をコントロール。ミニバンやクーペなどドアの大きな車両に特にお勧めです。",
            image: "https://picsum.photos/seed/door-ss/400/300"
          }
        ]
      },
      {
        name: "サイレントチューニング(車内静音施工)",
        price: "19800",
        features: ["ロードノイズ低減", "遮音・制振・遮熱", "各部位別パッケージ"],
        badge: "静粛性UP",
        image: "/images/Top/speaker.webp",
        link: "https://www.soundang.com/silent.html",
        showSavings: false,
        gallery: [
          { title: "フォレスター：ルーフ施工", images: ["https://picsum.photos/seed/forester1/800/600", "https://picsum.photos/seed/forester2/800/600", "https://picsum.photos/seed/forester3/800/600"] },
          { title: "N-WGN：フルパッケージ施工", images: ["https://picsum.photos/seed/nwgn1/800/600", "https://picsum.photos/seed/nwgn2/800/600", "https://picsum.photos/seed/nwgn3/800/600", "https://picsum.photos/seed/nwgn4/800/600", "https://picsum.photos/seed/nwgn5/800/600"] },
          { title: "レクサスLS600H/L：フロア・トランク施工", images: ["https://picsum.photos/seed/ls600-1/800/600", "https://picsum.photos/seed/ls600-2/800/600", "https://picsum.photos/seed/ls600-3/800/600"] },
          { title: "ポルシェ：フロア施工", images: ["https://picsum.photos/seed/porsche1/800/600", "https://picsum.photos/seed/porsche2/800/600"] },
          { title: "ウェイク：ルーフ・リアドア施工", images: ["https://picsum.photos/seed/wake1/800/600", "https://picsum.photos/seed/wake2/800/600"] }
        ],
        description: "”サイレントチューニング”とは、車の中を静かな空間へと変貌させるためのいろいろな施工を各部位ごとにパッケージしたものです。\n\n車内のノイズで代表的なものはロードノイズ。走行中に”ゴーッ”となるあれです。大きな騒音は少なからずドライブ中のストレスになりますし、会話のボリュームもそれに連れて大きくなります。車内が静かになれば微細な音も聴き取れるようになり、カーオーディオの音質向上には持ってこい！ハイレゾシステム等にはとくにお勧めです。\n\n■メニュー\n・ルーフコース\n・フロアコース\n・トランクコース\n・インナーフェンダーコース\n・バルクヘッドコース\n・リアゲートコース\n・ドアコース\n・ボンネットコース\n\n当店ではチューニング材料を通常で２０種類以上ストックし、様々なメーカーの部材を適材適所で使用しています。たくさんの施工実績からくる経験が当店の自信のポイントです。メニューにないパーツも施工対応いたしますので、お気軽にご相談ください。",
        packageDetails: {
          standardPrice: "19800",
          savings: "0",
          contents: [
            { title: "制振材", description: "レアルシルト匠、Dr.ARTEX SKYARMOR等、20種類以上の材料から適材適所で使用", icon: "Activity" },
            { title: "遮音・吸音材", description: "オーディオテクニカ アクワイエ、ノイズレスラグ、ニードルフェルト等", icon: "Layers" },
            { title: "遮熱材", description: "ヒートシールドラグ、サーモプロテクト等（ルーフ・ボンネット等）", icon: "Thermometer" },
            { title: "施工工賃", description: "各部位ごとの専門的な取り付け作業", icon: "Wrench" }
          ],
          notes: [
            "車種や仕様、天井の形状、サンルーフの有無等により追加費用が必要な場合があります。",
            "一部施工できない車種もございます。事前のご相談をお勧めします。",
            "作業時間は部位により異なります（1日〜数日）。無料代車をご用意していますのでご利用ください。"
          ]
        },
        lineup: [
          { name: "ルーフコース (軽・コンパクト・セダン等)", price: "125400" },
          { name: "ルーフコース (ミニバン・ワゴン・SUV等)", price: "182600" },
          { name: "フロアコース (デッドニング＆遮音 軽等)", price: "111100" },
          { name: "フロアコース (デッドニング＆遮音 ミニバン等)", price: "145200" },
          { name: "フロアコース (遮音のみ 軽等)", price: "53900" },
          { name: "フロアコース (遮音のみ ミニバン等)", price: "75900" },
          { name: "トランクコース (デッドニング＆遮音)", price: "115500" },
          { name: "トランクコース (遮音のみ)", price: "77000" },
          { name: "インナーフェンダーコース (4輪施工)", price: "124080" },
          { name: "バルクヘッドコース", price: "38500" },
          { name: "リアゲートコース", price: "38500" },
          { name: "ドアコース (フロントorリア左右)", price: "47300" },
          { name: "ボンネットコース (純正フードあり)", price: "19800" },
          { name: "ボンネットコース (純正フードなし)", price: "47300" }
        ]
      },
      {
        name: "ツィーターをCOOLにマウントするパッケージ",
        price: "46200",
        features: ["ピラー埋め込み加工", "レザー/エクセーヌ仕上げ", "角度・位置の最適化"],
        badge: "魅せる設置",
        image: "https://picsum.photos/seed/tw-mount/800/600",
        description: "カーオーディオカスタムの第一歩！ツィーター埋め込みインストール。\n\n高音を再生するツィーターは反射の影響をとても受けやすく、スピーカーの性能を発揮することにおいて角度はとても重要な意味を持っています。上位モデルのスピーカーに置き型マウントが付属しないのは、取り付ける角度や位置が音質に直結するからです。\n\nDSP機能が標準化してきた昨今では、よりツィーターの波形を妨げる障害が少ないダッシュより上、Aピラーやドアミラー裏への埋め込みが主流となっています。最適な角度でインストールすることで、圧倒的な臨場感とクリアな音像を実現します。",
        link: "https://www.soundang.com/tw-mount.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "46200",
          savings: "0",
          contents: [
            { title: "角度・位置決め", description: "リスニングポジションに合わせた最適な角度調整", icon: "Activity" },
            { title: "パテ成形・加工", description: "純正ピラーやパネルをベースに美しく成形", icon: "Wrench" },
            { title: "表面仕上げ", description: "レザー、サランネット、エクセーヌ等から選択", icon: "Layers" },
            { title: "取付・固定", description: "左右セットの加工・材料代込（ワイヤリング別）", icon: "Zap" }
          ],
          upgrades: [
            { title: "サランネット（メッシュ調）仕上げ", price: "51700", description: "スバル車や欧州車の純正に近い質感" },
            { title: "エクセーヌ（アルカンターラ調）仕上げ", price: "57750", description: "高級感のあるスエード調の質感" }
          ],
          notes: [
            "価格は左右セットの価格です。加工・材料代を含みます。",
            "ワイヤリング工賃は含みません。車種や構造により追加が必要なことがあります。",
            "施工するツィーターによってはレザー仕上げができない場合があります。",
            "プラン以外のご要望（3WAY化など）にも柔軟に対応いたします。"
          ]
        },
        lineup: [
          {
            name: "プランA：ストレートピラー埋め込み",
            price: "46200",
            description: "ストレートタイプのAピラーへの埋め込み。角度決め後パテ成形し、レザーで仕上げます。レザー色は見本から選択可能です。",
            image: "https://picsum.photos/seed/tw-plana/400/300"
          },
          {
            name: "プランB：特殊形状ピラー埋め込み",
            price: "69300",
            description: "三角窓があるYタイプや四角窓があるピラーが対象。パテ成形後、エクセーヌ（アルカンターラ調）で仕上げます。",
            image: "https://picsum.photos/seed/tw-planb/400/300"
          },
          {
            name: "プランC：ドアミラー裏パネル埋め込み",
            price: "57750",
            description: "ドアミラー裏の樹脂パネルに埋め込み。パテ成形後、マットブラックペイントで純正のような質感に仕上げます。",
            image: "https://picsum.photos/seed/tw-planc/400/300"
          }
        ]
      },
      {
        name: "オリジナルアウターバッフル製作",
        price: "107800",
        features: ["音抜け改善", "ワンオフ製作", "スピーカー露出"],
        badge: "理想の音抜け",
        image: "https://picsum.photos/seed/outer-baffle/800/600",
        description: "音も見た目も満足度アップ！インナーバッフルとは一味違う抜けの良いサウンドを求める方におすすめです。\n\nそれまでスピーカーの音を遮っていたドアパネルの干渉がなくなるので音のヌケが良くなり、ドア内部に溜まっていた音がそのまま車内に送り出されるのでスピーカーの性能を最大限に引き出しやすくなります。\n\nまた、強固なインナーバッフルにアウターバッフルを追加することで固定の安定感が増し、厚みの制約から開放されるためスピーカーの選択肢も広がります。なにより、スピーカーが表に見えるだけでも満足度は抜群です！",
        link: "https://www.soundang.com/outer.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "107800",
          savings: "0",
          contents: [
            { title: "オリジナルインナーバッフル", description: "土台となる強固なインナーバッフル製作", icon: "Layers" },
            { title: "アウターバッフル製作", description: "車種に合わせたワンオフのアウター部製作", icon: "Wrench" },
            { title: "ドアトリム加工", description: "純正ドアパネルの精密な切削・加工", icon: "Activity" },
            { title: "表面仕上げ", description: "レザーやペイントによる美しいフィニッシュ", icon: "Layers" }
          ],
          notes: [
            "価格は左右セットの価格です。加工・材料代を含みます。",
            "形状は車種により異なります。純正位置付近を中心として加工を行います。",
            "ドアにスピーカーがない車両でも施工可能ですが、料金は別途ご相談ください。",
            "車種や仕様により追加費用が必要になる場合があります。"
          ]
        },
        lineup: [
          {
            name: "アウターバッフル Ver.1",
            price: "107800",
            description: "シンプルな1ピース構成。スピーカー付属のグリルを使用します。グリルがない場合は別途作成も可能です。",
            image: "https://picsum.photos/seed/outer-v1/400/300"
          },
          {
            name: "アウターバッフル Ver.2",
            price: "132000",
            description: "2ピース構成で製作。色や素材を変えられるので、カスタム感がより際立つインストールです。",
            image: "https://picsum.photos/seed/outer-v2/400/300"
          },
          {
            name: "アウターバッフル Ver.3",
            price: "176000",
            description: "1ピースまたは2ピース構成に、アルミやアクリルでデザイン加工を施します。LED追加も可能です。",
            image: "https://picsum.photos/seed/outer-v3/400/300"
          }
        ]
      },
      {
        name: "本格サブウーハーインストール",
        price: "0",
        features: ["本格的重低音", "カスタムBOX対応", "アンプ組み合わせ"],
        badge: "重低音増強",
        image: "https://picsum.photos/seed/subwoofer/800/600",
        description: "とっても重要なサブウーハーの役割！可聴帯域のほんの一部ですが、建物の基礎と同じでここがしっかりしていないと全体のイメージが希薄になってしまいます。\n\n音は倍音で構成されていますので、サブウーハーが中心でないようなボーカルやピアノの音も、サブウーハーのオンオフで様変わりします。HiFiスタイルからパワーサウンド、重低音スタイルまで、自分だけの個室を好きなサウンドにアレンジして楽しみましょう！",
        showSavings: false,
        packageDetails: {
          standardPrice: "0",
          savings: "0",
          contents: [
            { title: "サブウーハーユニット", description: "8インチ(20cm)〜18インチ(45cm)まで幅広く対応", icon: "Music" },
            { title: "パワーアンプ", description: "Dクラスモノアンプや2chブリッジ接続など最適な駆動", icon: "Zap" },
            { title: "エンクロージャー(BOX)", description: "シールド・バスレフ等、性能を引き出す適正容量の設計", icon: "Wrench" },
            { title: "ワイヤリング・取付", description: "電源・RCA・SPケーブルの配線と確実な固定・調整", icon: "Activity" }
          ],
          notes: [
            "フロントスピーカーとのバランスを考えた10〜12インチがお勧めです。",
            "BOXの設計（容量や形状）によってウーハーの性能が大きく変わります。",
            "トランク設置時は、荷物の積載を考慮した脱着しやすい固定方法も可能です。",
            "スペアタイヤスペース利用時は、パンク補修材の常備をお勧めします。",
            "パワードタイプ（アンプ内蔵）ならシート下等の省スペース設置も可能です。"
          ]
        },
        lineup: [
          {
            name: "お手軽パワードサブウーハー設置",
            price: "0",
            description: "アンプ内蔵タイプでコストとスペースを抑制。シート下等のデッドスペースを利用可能。詳細は「お手軽低音増強セット」へ。",
            image: "https://picsum.photos/seed/powered-sub/400/300"
          },
          {
            name: "スタンダードBOX設置（トランク）",
            price: "0",
            description: "四角いタイプの箱を製作してトランクに設置。手軽に本格的な低音を楽しめるスタイル。脱着も考慮して設置します。",
            image: "https://picsum.photos/seed/box-sub/400/300"
          },
          {
            name: "フロア/スペアタイヤスペース埋め込み",
            price: "0",
            description: "サブトランクやスペアタイヤスペースを利用してBOXを製作。荷物を積める実用性とスマートな見た目を両立。",
            image: "https://picsum.photos/seed/floor-sub/400/300"
          },
          {
            name: "カスタム・ショーアップインストール",
            price: "0",
            description: "LEDライティングやアクリルを組み合わせた魅せるカスタム。1台だけのオリジナルデザインで製作します。",
            image: "https://picsum.photos/seed/custom-sub/400/300"
          }
        ]
      },
      {
        name: "カスタムインストール・ワンオフ製作",
        price: "0",
        features: ["トランクカスタム", "アウターバッフル", "LEDライティング"],
        badge: "完全オーダー",
        image: "https://picsum.photos/seed/custom-inst/800/600",
        description: "カーオーディオならでは！いい音を耳で楽しむだけではなく、クールなインストールで目で見て楽しむカスタムオーディオの世界。\n\n代表的な取り付け例をご紹介します。取り付けるユニットや車両、またインストール方法により費用は様々です。とはいえ何ができて何ができない、どのくらいかかるか見当もつかないというのが現実のところだと思います。まずはお気軽にご相談ください。\n\nオーナー様のイメージするカスタムを具現化するお手伝いをいたします。ワンオフでのカスタムとなり、お車を確認しながらの商談が必要となりますので、ぜひご来店の上ご相談ください。",
        showSavings: false,
        packageDetails: {
          standardPrice: "0",
          savings: "0",
          contents: [
            { title: "デザイン・設計", description: "車両形状と機材に合わせたワンオフデザイン", icon: "Layers" },
            { title: "造作・加工", description: "MDF、アクリル、パテ等を用いた高度な加工技術", icon: "Wrench" },
            { title: "仕上げ・装飾", description: "レザー、ペイント、LEDライティング等の演出", icon: "Activity" },
            { title: "音響チューニング", description: "カスタム環境に合わせた最適なサウンド調整", icon: "Music" }
          ],
          notes: [
            "記載している価格は一例です。施工内容により大きく変動します。",
            "ワンオフ製作のため、お車をお預かりしての作業となります。",
            "既存ユニットの移設や取り外しが必要な場合は、別途費用が発生します。",
            "まずはご来店いただき、ご要望をお聞かせください。お見積もりを作成いたします。"
          ]
        },
        lineup: [
          {
            name: "トランク・カーゴスペースインストール",
            price: "100000",
            description: "フロアへの埋め込みやカバー製作。カッコよさと実用性を両立。シンプルなシステムでおよそ10万円〜。",
            image: "https://picsum.photos/seed/trunk-inst/400/300"
          },
          {
            name: "セダンタイプトランクインストール",
            price: "150000",
            description: "背もたれ裏へのウーハー埋め込みやアンプボード製作。車両構造によりますがおよそ15万円〜。",
            image: "https://picsum.photos/seed/sedan-trunk/400/300"
          },
          {
            name: "ドアカスタムアウターバッフル製作",
            price: "200000",
            description: "純正パネルに馴染むカスタムインストール。音質向上のためのインナー構造にも拘ります。左右でおよそ20万円〜。",
            image: "https://picsum.photos/seed/door-outer/400/300"
          },
          {
            name: "ドアパネル全面施工・エンクロージャー",
            price: "250000",
            description: "パネル丸ごと張り替えやエンクロージャー化。音漏れ軽減や音質激変。およそ25万円〜40万円。",
            image: "https://picsum.photos/seed/door-full/400/300"
          },
          {
            name: "カスタムピラーインストール（3WAY対応）",
            price: "80000",
            description: "フロント3WAYに欠かせないピラー加工。スコーカーとツィーターを美しく配置。左右でおよそ8万円〜。",
            image: "https://picsum.photos/seed/pillar-3way/400/300"
          },
          {
            name: "カスタムコンソール・モニター加工",
            price: "100000",
            description: "センターコンソール製作やモニターの埋め込み加工。利便性とデザインを両立。およそ10万円〜20万円。",
            image: "https://picsum.photos/seed/console-monitor/400/300"
          }
        ]
      }
    ]
  },
  {
    id: 'performance_up',
    category: "性能を更に引き出すアレコレ",
    type: 'audio',
    description: "カーオーディオの源となる電源を改善することで、機材の性能を今よりももっと引き出す方法やおすすめのパーツをご紹介します。\n\n電源の質は最終的な音像のステレオイメージに大きな影響を与えます。電源系にこだわることはS/Nや解像度アップに劇的な効果が現れます。",
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "電源バッ直レグザットコース",
        price: "42240",
        features: ["ハイグレード配線", "S/N向上", "解像度アップ"],
        badge: "ハイグレード",
        image: "https://picsum.photos/seed/power-rexat/800/600",
        description: "DSPやヘッドユニットの常時電源をオーディオテクニカのハイグレードシリーズ【レグザットシリーズ】でバッテリーから直接ワイヤリングします。14AWGを2本引き込むことで、システムに応じた最適な電源供給を可能にします。",
        packageDetails: {
          standardPrice: "0",
          savings: "0",
          contents: [
            { title: "ケーブル", description: "オーディオテクニカ レグザット AT-RX3514P (14AWG) x 2本", icon: "Zap" },
            { title: "パーツ", description: "高音質ヒューズホルダー、Iヒューズ、金メッキ端子等", icon: "Layers" },
            { title: "施工", description: "バッテリーからユニットまでの直接ワイヤリング・インストール", icon: "Wrench" }
          ],
          notes: [
            "ユニットの設置場所がバッテリーと離れている場合はケーブル代金が追加となります。",
            "ボンネットバッテリーからシート下DSP設置を想定した価格です。"
          ]
        }
      },
      {
        name: "電源バッ直スタンダードコース",
        price: "27390",
        features: ["安定供給", "純正比アップグレード", "コストパフォーマンス"],
        badge: "スタンダード",
        image: "https://picsum.photos/seed/power-std/800/600",
        description: "ナビ・DSPの常時電源を直接バッテリーからワイヤリングします。一般的な純正ハーネスより太い12AWGケーブル（オーディオテクニカ TPC-12）を使用し、電源供給を安定させます。",
        packageDetails: {
          standardPrice: "0",
          savings: "0",
          contents: [
            { title: "ケーブル", description: "オーディオテクニカ TPC12 (12AWG) x 2本", icon: "Zap" },
            { title: "パーツ", description: "オーディオテクニカ TFH-RATC、ATCヒューズ、端子類", icon: "Layers" },
            { title: "施工", description: "バッテリーからユニットまでの直接ワイヤリング・インストール", icon: "Wrench" }
          ],
          notes: [
            "ユニットの設置場所がバッテリーと離れている場合はケーブル代金が追加となります。",
            "ボンネットバッテリーからシート下DSP設置を想定した価格です。"
          ]
        }
      },
      {
        name: "ミニキャパシターコース",
        price: "34650",
        features: ["低域の再現性", "リアルな表現力", "瞬発力向上"],
        badge: "音質改善",
        image: "https://picsum.photos/seed/capacitor/800/600",
        description: "BAラボ BE-101J's を導入。聴感上のS/N向上、音の輪郭、スリリングでリアルな表現力、瞬発力とタイトな低域の再現性が体験できます。",
        packageDetails: {
          standardPrice: "34650",
          savings: "0",
          contents: [
            { title: "ユニット", description: "BAラボ BE-101J's (商品価格 26,950円)", icon: "Activity" },
            { title: "施工", description: "基本取り付け工賃込み", icon: "Wrench" }
          ],
          notes: [
            "脱着内容や施工場所により取り付け工賃が別途必要になることがあります。"
          ]
        }
      },
      {
        name: "仮想アースコース",
        price: "25300",
        features: ["高周波ノイズ対策", "GND面積拡大", "S/Nアップ"],
        badge: "ノイズ抑制",
        image: "https://picsum.photos/seed/ground/800/600",
        description: "KOJO TECHNOLOGY NVe06 を導入。高周波ノイズ対策に特化し、インバータやスイッチング電源、内部クロックなどから発生するノイズを抑制・減衰させます。小型ながら広大なGND面積を保有します。",
        packageDetails: {
          standardPrice: "25300",
          savings: "0",
          contents: [
            { title: "ユニット", description: "KOJO TECHNOLOGY NVe06 (商品価格 17,600円)", icon: "Activity" },
            { title: "施工", description: "基本取り付け工賃込み", icon: "Wrench" }
          ],
          notes: [
            "脱着内容や施工場所により取り付け工賃が別途必要になることがあります。"
          ]
        }
      }
    ]
  },
  {
    id: 'security_panthera',
    category: "Panthera (パンテーラ)",
    type: 'security',
    items: [
      { name: "Z706シリーズ", price: "286000", features: ["フルカラータッチパネルリモコン", "3ゾーン衝撃センサー", "デジタル傾斜センサー", "ドラレコ連動対応"], badge: "最高峰モデル", image: "/images/Top/security.webp" },
      { name: "Z306シリーズ", price: "242000", features: ["モノクロ液晶リモコン", "2ゾーン衝撃センサー", "イモビライザー", "ボイスアンサーバック"], badge: "スタンダード", image: "/images/Top/security.webp" },
      { name: "Z106シリーズ", price: "198000", features: ["1WAYリモコン", "衝撃センサー", "ドアセンサー", "ボンネットセンサー"], badge: "エントリー", image: "/images/Top/security.webp" }
    ]
  },
  {
    id: 'security_grgo',
    category: "Grgo (ゴルゴ)",
    type: 'security',
    items: [
      { name: "ZVシリーズ", price: "165000", features: ["アンサーバックリモコン", "マイクロ波センサー対応", "暗証番号式解除", "純正キー連動可"], badge: "人気No.1", image: "/images/security.jpg" },
      { name: "Vシリーズ", price: "132000", features: ["1WAYリモコン", "衝撃センサー", "ドアセンサー", "ステータスLED"], badge: "コスパ重視", image: "/images/security.jpg" },
      { name: "1/0シリーズ", price: "99000", features: ["純正キーレス連動", "シンプル構成", "誤作動防止機能"], badge: "スマート施工", image: "/images/security.jpg" }
    ]
  },
  {
    id: 'security_viper',
    category: "VIPER (バイパー)",
    type: 'security',
    items: [
      { name: "DS4V", price: "110000", features: ["スマホ連動", "エンジンスターター内蔵", "純正キーレス連動"], badge: "最新デジタル", image: "/images/security.jpg" },
      { name: "5706V", price: "132000", features: ["液晶アンサーバックリモコン", "エンジンスターター", "2段階衝撃センサー"], badge: "定番モデル", image: "/images/security.jpg" },
      { name: "330V", price: "77000", features: ["純正キーレス連動", "衝撃センサー", "ドアセンサー"], badge: "エントリー", image: "/images/security.jpg" }
    ]
  },
  {
    id: 'security_clifford',
    category: "CLIFFORD (クリフォード)",
    type: 'security',
    items: [
      { name: "G6シリーズ", price: "220000", features: ["オムニセンサー", "ブラックジャックスシステム", "ダブルイモビライザー"], badge: "世界最高峰", image: "/images/security.jpg" },
      { name: "Matrixシリーズ", price: "154000", features: ["アンサーバックリモコン", "エンジンスターター対応", "高精度センサー"], badge: "高性能", image: "/images/security.jpg" }
    ]
  },
  {
    id: 'security_car',
    category: "車種別おすすめパッケージ",
    type: 'security',
    items: [
      { name: "SUV / ランドクルーザー / アルファード", price: "350000", features: ["Panthera Z706", "CLIFFORD G6", "ダブルガード施工"], badge: "最強プラン", image: "/images/security.jpg" },
      { name: "スポーツカー / プレミアムセダン", price: "280000", features: ["Grgo ZV", "VIPER DS4", "エンジンスターター"], badge: "快適・安心", image: "/images/security.jpg" },
      { name: "コンパクトカー / 軽自動車", price: "150000", features: ["Grgo Vシリーズ", "VIPER 330V", "純正キーレス連動"], badge: "お手軽プラン", image: "/images/security.jpg" }
    ]
  },
  {
    id: 'dashcam',
    category: "ドライブレコーダー",
    type: 'others',
    items: [
      { name: "前後2カメラモデル", price: "44000", features: ["フルHD録画", "夜間補正", "駐車監視対応", "セキュリティ連動可"], badge: "定番人気", image: "/images/Top/dorareko.webp" },
      { name: "360度＋リアカメラ", price: "66000", features: ["全方位録画", "死角なし", "煽り運転対策", "セキュリティ連動可"], badge: "死角ゼロ", image: "/images/Top/dorareko.webp" }
    ]
  },
  {
    id: 'digital_mirror',
    category: "デジタルインナーミラー",
    type: 'others',
    items: [
      { name: "アルパイン 純正交換型", price: "77000", features: ["前後ドラレコ機能付", "夜間鮮明映像", "タッチパネル操作"], badge: "視界クリア", image: "/images/dorareko.jpg" },
      { name: "アルパイン バンド固定型", price: "55000", features: ["簡単取り付け", "広角レンズ", "駐車監視対応"], badge: "お手楽導入", image: "/images/dorareko.jpg" }
    ]
  },
  {
    id: 'radar',
    category: "レーダー探知機 / レーザー受信機",
    type: 'others',
    items: [
      { name: "セパレート型レーダー", price: "49500", features: ["最新移動式オービス対応", "無線LAN更新", "OBDII対応"], badge: "最強感度", image: "/images/dorareko.jpg" },
      { name: "ワンボディ型レーダー", price: "38500", features: ["フルマップ表示", "レーザー光受信", "タッチパネル"], badge: "人気モデル", image: "/images/dorareko.jpg" }
    ]
  },
  {
    id: 'safety_device',
    category: "置き去り防止安全装置",
    type: 'others',
    items: [
      { name: "ホーネット車内置き去り防止システム", price: "88000", features: ["降車時確認ブザー", "車内センサー検知", "外部サイレン通知"], badge: "補助金対応", image: "/images/dorareko.jpg" },
      { name: "バス専用安全装置", price: "110000", features: ["複数センサー連動", "緊急通報機能", "音声ガイダンス"], badge: "高信頼性", image: "/images/dorareko.jpg" }
    ]
  },
  {
    id: 'campit',
    category: "Campit (キャンピット)",
    type: 'others',
    items: [
      { name: "ポータブル電源走行充電システム", price: "132000", features: ["サブバッテリー不要", "急速充電", "専用配線施工"], badge: "車中泊革命", image: "/images/dorareko.jpg" },
      { name: "車内AC100Vコンセント増設", price: "44000", features: ["純正風仕上げ", "大容量インバーター対応", "安全回路設計"], badge: "快適電装", image: "/images/dorareko.jpg" }
    ]
  }
];

const initialOptionals: OptionalService[] = [
  { id: 'deadening_opt', name: "標準デッドニング", price: "0", description: "スピーカー交換プランには標準で付属。差額で上位プランへの変更も可能です。", effect: "音の締まり向上", percentage: 40, image: "/images/speaker.jpg" },
  { id: 'cable_opt', name: "スピーカーケーブル", price: "0", description: "標準ケーブルが付属。差額で高音質OFCケーブル等へアップグレード可能です。", effect: "情報量UP", percentage: 30, image: "/images/speaker.jpg" },
  { id: 'tuning_opt', name: "サウンドチューニング", price: "0", description: "当店でご購入・施工いただいたお客様には、無料で音響調整を行っております。", effect: "鮮度回復", percentage: 100, image: "/images/speaker.jpg" },
];

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plans, setPlans] = useState<PlanCategory[]>(() => {
    const saved = localStorage.getItem('ang_plans');
    const basePlans = (cmsData as any).plans || initialPlans;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return basePlans.map((initialCat: any) => {
          const savedCat = parsed.find((c: any) => c.id === initialCat.id);
          if (!savedCat) return initialCat;
          return {
            ...initialCat,
            ...savedCat,
            items: initialCat.items.map((initialItem: any) => {
              const savedItem = savedCat.items?.find((i: any) => i.name === initialItem.name);
              if (!savedItem) return initialItem;

              const isLegacy = savedItem.image?.includes('picsum.photos') ||
                savedItem.image?.endsWith('.jpg') ||
                savedItem.image?.endsWith('.png');

              return {
                ...initialItem,
                ...savedItem,
                image: isLegacy ? initialItem.image : savedItem.image,
                // Ensure other critical fields from initialItem (new defaults) are preserved if needed
              };
            })
          };
        });
      } catch (e) {
        return basePlans;
      }
    }
    return basePlans;
  });

  const [guides, setGuides] = useState<KnowledgeGuide[]>(() => {
    const saved = localStorage.getItem('ang_guides');
    const baseGuides = (cmsData as any).guides || initialGuides;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return baseGuides.map((initialGuide: any) => {
          const savedGuide = parsed.find((g: any) => g.id === initialGuide.id);
          if (!savedGuide) return initialGuide;
          return {
            ...savedGuide,
            image: (savedGuide.image?.includes('picsum.photos') || savedGuide.image?.endsWith('.jpg') || savedGuide.image?.endsWith('.png')) ? initialGuide.image : savedGuide.image,
            description: initialGuide.description || savedGuide.description,
          };
        });
      } catch (e) {
        return baseGuides;
      }
    }
    return baseGuides;
  });

  const [optionals, setOptionals] = useState<OptionalService[]>(() => {
    if ((cmsData as any).optionals) return (cmsData as any).optionals;
    const saved = localStorage.getItem('ang_optionals');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialOptionals; }
    }
    return initialOptionals;
  });

  const [securityStatus, setSecurityStatus] = useState<string>(() => {
    if ((cmsData as any).securityStatus !== undefined) return (cmsData as any).securityStatus;
    return localStorage.getItem('ang_security_status') || "";
  });

  const [emergencyAnnouncement, setEmergencyAnnouncement] = useState<EmergencyAnnouncement>(() => {
    if ((cmsData as any).emergencyAnnouncement) return (cmsData as any).emergencyAnnouncement;
    const saved = localStorage.getItem('ang_emergency');
    return saved ? JSON.parse(saved) : {
      text: "【緊急のお知らせ】現在、施工予約が大変混み合っております。お早めにご相談ください。",
      link: "",
      image: "",
      active: false
    };
  });

  const initialData = (cmsData as any) || {};

  const [recruitment, setRecruitmentState] = useState<RecruitmentInfo>(initialData.recruitment || initialRecruitment);
  const [audioRecruitment, setAudioRecruitmentState] = useState<RecruitmentInfo>(initialData.audioRecruitment || initialRecruitment);
  const [securityRecruitment, setSecurityRecruitmentState] = useState<RecruitmentInfo>(initialData.securityRecruitment || initialRecruitment);
  const [auditionSpeakers, setAuditionSpeakersState] = useState<AuditionBrand[]>(() => {
    return (cmsData as any).auditionSpeakers || [];
  });

  const saveSiteData = (updates: any) => {
    if (import.meta.env.DEV) {
      fetch('/api/save-cms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      }).catch(console.error);
    }
  };

  const setRecruitment = (info: RecruitmentInfo) => {
    setRecruitmentState(info);
    localStorage.setItem('ang_recruitment', JSON.stringify(info));
    saveSiteData({ recruitment: info });
  };

  const setAudioRecruitment = (info: RecruitmentInfo) => {
    setAudioRecruitmentState(info);
    localStorage.setItem('ang_audio_recruitment', JSON.stringify(info));
    saveSiteData({ audioRecruitment: info });
  };

  const setSecurityRecruitment = (info: RecruitmentInfo) => {
    setSecurityRecruitmentState(info);
    localStorage.setItem('ang_security_recruitment', JSON.stringify(info));
    saveSiteData({ securityRecruitment: info });
  };

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    if (import.meta.env.DEV) {
      fetch('/api/cms')
        .then(res => res.json())
        .then(data => {
          if (data.auditionSpeakers) {
            setAuditionSpeakersState(data.auditionSpeakers);
          }
          if (data.plans) setPlans(data.plans);
          if (data.guides) setGuides(data.guides);
          if (data.optionals) setOptionals(data.optionals);
          // ... add other fields if needed ...
        })
        .catch(console.error);
    }
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ang_plans', JSON.stringify(plans));
    saveSiteData({ plans });
  }, [plans, isMounted]);

  React.useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ang_guides', JSON.stringify(guides));
    saveSiteData({ guides });
  }, [guides, isMounted]);

  React.useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ang_optionals', JSON.stringify(optionals));
    saveSiteData({ optionals });
  }, [optionals, isMounted]);

  React.useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ang_security_status', securityStatus);
    saveSiteData({ securityStatus });
  }, [securityStatus, isMounted]);

  React.useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ang_emergency', JSON.stringify(emergencyAnnouncement));
    saveSiteData({ emergencyAnnouncement });
  }, [emergencyAnnouncement, isMounted]);

  const setAuditionSpeakers = (speakers: AuditionBrand[]) => {
    setAuditionSpeakersState(speakers);
    saveSiteData({ auditionSpeakers: speakers });
  };

  const updatePrice = (categoryId: string, oldItemName: string, newItem: Partial<PlanItem>) => {
    setPlans(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: cat.items.map(item =>
            item.name === oldItemName ? { ...item, ...newItem } : item
          )
        };
      }
      return cat;
    }));
  };

  const updateCategory = (categoryId: string, newCategory: Partial<PlanCategory>) => {
    setPlans(prev => prev.map(cat =>
      cat.id === categoryId ? { ...cat, ...newCategory } : cat
    ));
  };

  const updateOptionalPrice = (id: string, newPrice: string) => {
    setOptionals(prev => prev.map(opt =>
      opt.id === id ? { ...opt, price: newPrice } : opt
    ));
  };

  const bulkUpdatePrices = (newPlans: PlanCategory[], newOptionals: OptionalService[], newGuides: KnowledgeGuide[]) => {
    setPlans(newPlans);
    setOptionals(newOptionals);
    setGuides(newGuides);
  };

  const adjustAllPrices = (percentage: number) => {
    const adjust = (p: string) => {
      const num = parseInt(p);
      if (isNaN(num) || num === 0) return p;
      return Math.round(num * (1 + percentage / 100)).toString();
    };

    setPlans(prev => prev.map(cat => ({
      ...cat,
      items: cat.items.map(item => ({ ...item, price: adjust(item.price) }))
    })));
    setOptionals(prev => prev.map(opt => ({ ...opt, price: adjust(opt.price) })));
  };

  const addItem = (categoryId: string, item: PlanItem) => {
    setPlans(prev => prev.map(cat =>
      cat.id === categoryId ? { ...cat, items: [...cat.items, item] } : cat
    ));
  };

  const removeItem = (categoryId: string, itemName: string) => {
    setPlans(prev => prev.map(cat =>
      cat.id === categoryId ? { ...cat, items: cat.items.filter(item => item.name !== itemName) } : cat
    ));
  };

  const addCategory = (category: PlanCategory) => {
    setPlans(prev => [...prev, category]);
  };

  const removeCategory = (categoryId: string) => {
    setPlans(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const updateGuide = (id: string, newGuide: Partial<KnowledgeGuide>) => {
    setGuides(prev => prev.map(guide =>
      guide.id === id ? { ...guide, ...newGuide } : guide
    ));
  };

  const addGuide = (guide: KnowledgeGuide) => {
    setGuides(prev => [...prev, guide]);
  };

  const removeGuide = (id: string) => {
    setGuides(prev => prev.filter(guide => guide.id !== id));
  };

  const addOptional = (optional: OptionalService) => {
    setOptionals(prev => [...prev, optional]);
  };

  const removeOptional = (id: string) => {
    setOptionals(prev => prev.filter(opt => opt.id !== id));
  };

  return (
    <PriceContext.Provider value={{
      plans,
      guides,
      optionals,
      updatePrice,
      updateCategory,
      updateOptionalPrice,
      bulkUpdatePrices,
      adjustAllPrices,
      addItem,
      removeItem,
      addCategory,
      removeCategory,
      addOptional,
      removeOptional,
      updateGuide,
      addGuide,
      removeGuide,
      securityStatus,
      setSecurityStatus,
      emergencyAnnouncement,
      setEmergencyAnnouncement,
      recruitment,
      setRecruitment,
      audioRecruitment,
      setAudioRecruitment,
      securityRecruitment,
      setSecurityRecruitment,
      auditionSpeakers,
      setAuditionSpeakers,
      saveSiteData
    }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrices = () => {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error('usePrices must be used within a PriceProvider');
  }
  return {
    ...context,
    guides: context.guides,
    addGuide: context.addGuide,
    removeGuide: context.removeGuide,
    updateGuide: context.updateGuide
  };
};

export const formatPrice = (price: string) => {
  const num = parseInt(price);
  if (isNaN(num) || num === 0) return "要相談 / ASK";
  return `¥${num.toLocaleString()}〜`;
};
