import React, { createContext, useContext, useState, ReactNode } from 'react';
import cmsData from '../data/cms.json';

// 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
// LocalStorage 繝舌・繧ｸ繝ｧ繝ｳ邂｡逅・// cms.json 縺ｮ "cacheVersion" 繧呈峩譁ｰ縺励※繝励ャ繧ｷ繝･縺吶ｋ縺縺代〒繧ｭ繝｣繝・す繝･縺瑚・蜍輔け繝ｪ繧｢縺輔ｌ縺ｾ縺吶・// 笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏笏
const CMS_DATA_VERSION: string = (cmsData as any).cacheVersion || '1';
const LS_VERSION_KEY = 'ang_cms_version';
const LS_MANAGED_KEYS = [
  'ang_plans', 'ang_guides', 'ang_optionals',
  'ang_security_status', 'ang_emergency',
  'ang_partners', 'ang_brand_partners', 'ang_assets',
];

(function clearStaleLocalStorage() {
  try {
    const stored = localStorage.getItem(LS_VERSION_KEY);
    if (stored !== CMS_DATA_VERSION) {
      LS_MANAGED_KEYS.forEach(k => localStorage.removeItem(k));
      localStorage.setItem(LS_VERSION_KEY, CMS_DATA_VERSION);
    }
  } catch (_) { /* localStorage unavailable */ }
})();

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
  title: "謗｡逕ｨ諠・ｱ",
  message: "荳邱偵↓繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ荳也阜繧堤屁繧贋ｸ翫￡縺ｾ縺帙ｓ縺具ｼ溽ｵ碁ｨ楢・━驕・・譛ｪ邨碁ｨ捺ｭ楢ｿ・,
  requirements: ["霆翫′螂ｽ縺阪↑譁ｹ", "蜈・ｰ励〒譏弱ｋ縺・婿", "隕∵勸騾壼・險ｱ"],
  showRequirements: true,
  salary: "蝓ｺ譛ｬ邨ｦ 蠢懃嶌隲・ｼ育ｵ碁ｨ薙・閭ｽ蜉帙ｒ閠・・縺ｮ荳頑ｱｺ螳夲ｼ・,
  showSalary: true,
  contactInfo: "縺企崕隧ｱ縺ｫ縺ｦ縺雁撫縺・粋繧上○縺上□縺輔＞"
};

const initialGuides: KnowledgeGuide[] = [
  {
    id: 'hires_guide',
    title: "繝上う繝ｬ繧ｾ蟆主・縺ｮ繧ｹ繧ｹ繝｡",
    badge: "鬮倩ｧ｣蜒丞ｺｦ",
    features: ["CD雜・∴縺ｮ諠・ｱ驥・, "螟壼ｽｩ縺ｪ謗･邯壹・繝ｩ繝ｳ", "DAP/繧ｹ繝槭・騾｣謳ｺ"],
    image: "https://picsum.photos/seed/hi-res/800/600",
    description: "繝上う繝ｬ繧ｾ縺ｯCD繧定ｶ・∴繧矩ｫ倬浹雉ｪ繧ｹ繝壹ャ繧ｯ繧呈戟縺｣縺ｦ縺・ｋ譁ｰ縺励＞髻ｳ讌ｽ繝輔ぃ繧､繝ｫ縺ｧ縺吶・D縺ｮ諠・ｱ驥上ｒ1縺ｨ縺吶ｋ縺ｨ縲√ワ繧､繝ｬ繧ｾ縺ｯ3蛟阪°繧・.5蛟阪⊇縺ｩ蠅怜刈縺励√い繝翫Ο繧ｰ繝・Ξ繝薙°繧・K繝・Ξ繝薙↓螟峨ｏ繧九ｈ縺・↓縲∫ｴｰ縺九＞驛ｨ蛻・∪縺ｧ隕矩壹○繧九Μ繧｢繝ｫ縺ｪ髻ｳ蝣ｴ繧定｡ｨ迴ｾ縺ｧ縺阪∪縺吶・n\nCD縺ｧ縺ｯ雜・∴繧峨ｌ縺ｪ縺九▲縺溽ｩｺ豌玲─繧・ｮ溷ワ諢溘′縲√・繧ｹ繧ｿ繝ｼ譛ｬ譚･縺ｮ髻ｳ繧貞・迴ｾ縺吶ｋ縺九・縺斐→縺丞ｿ螳溘↓蠕励ｉ繧後ｋ縺ｮ縺後ワ繧､繝ｬ繧ｾ縺ｮ荳逡ｪ縺ｮ鬲・鴨縺ｧ縺吶りｻ翫・荳ｭ縺ｧ繧よэ螟悶→邁｡蜊倥↓蟋九ａ繧九％縺ｨ縺後〒縺阪∪縺吶ゅ∪縺壹・繝上う繝ｬ繧ｾ縺ｮ荳也阜繧剃ｽ馴ｨ薙＠縺ｦ縺ｿ縺ｾ縺帙ｓ縺具ｼ・,
    category: "遏･隴倥・繧ｬ繧､繝・,
    link: "https://www.soundang.com/hires.html",
    packageDetails: {
      standardPrice: "0",
      savings: "0",
      contents: [
        { title: "繝上う繝ｬ繧ｾ蟇ｾ蠢懊Θ繝九ャ繝・, description: "繝・ず繧ｿ繝ｫ菫｡蜿ｷ繧偵い繝翫Ο繧ｰ螟画鋤蜿ｯ閭ｽ縺ｪ讖滓攝縺ｮ驕ｸ螳・, icon: "Music" },
        { title: "鬮倬浹雉ｪ繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ", description: "繝・ず繧ｿ繝ｫ莨晞√Ο繧ｹ繧呈椛縺医ｋ鬮伜刀雉ｪ繧ｱ繝ｼ繝悶Ν", icon: "Zap" },
        { title: "蜀咲函繧｢繝励Μ繝ｻ險ｭ螳・, description: "繧ｹ繝槭・繧ДAP縺ｧ縺ｮ譛驕ｩ縺ｪ蜀咲函迺ｰ蠅・・讒狗ｯ・, icon: "Activity" },
        { title: "繧ｵ繧ｦ繝ｳ繝峨メ繝･繝ｼ繝九Φ繧ｰ", description: "繝上う繝ｬ繧ｾ縺ｮ蠎・ｸｯ蝓溘ｒ豢ｻ縺九☆邊ｾ蟇・↑隱ｿ謨ｴ", icon: "Wrench" }
      ],
      notes: [
        "繝上う繝ｬ繧ｾ蜀咲函縺ｫ縺ｯ蟇ｾ蠢懊＠縺滓ｩ滓攝・医リ繝薙．SP縲．AP遲会ｼ峨′蠢・ｦ√〒縺吶・,
        "蠕捺擂縺ｮCD繝励Ξ繝ｼ繝､繝ｼ繧・リ繝薙〒縺ｯ蜀咲函縺ｧ縺阪↑縺・ｴ蜷医′縺ゅｊ縺ｾ縺吶・,
        "FLAC, WAV, DSD縺ｪ縺ｩ縲∵ｩ滓攝縺ｫ蜷医▲縺溘ヵ繧ｩ繝ｼ繝槭ャ繝医・驕ｸ螳壹′驥崎ｦ√〒縺吶・,
        "繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙↑縺ｩ縺ｮ蜀咲函迺ｰ蠅・ｒ謨ｴ縺医ｋ縺薙→縺ｧ縲√ｈ繧雁柑譫懊ｒ螳滓─縺ｧ縺阪∪縺吶・,
        "蠖灘ｺ励ョ繧｣繧ｹ繝励Ξ繧､縺ｫ縺ｦ蜷・・繝ｩ繝ｳ縺ｮ繝・Δ縺悟庄閭ｽ縺ｧ縺吶ゅ♀豌苓ｻｽ縺ｫ縺願ｩｦ縺励￥縺縺輔＞縲・
      ]
    },
    lineup: [
      { name: "繝励Λ繝ｳA・咤luetooth謗･邯・, price: "0", description: "繧ｹ繝槭・繧ДAP縺九ｉ辟｡邱壹〒騾∽ｿ｡縲よ怙繧よ焔霆ｽ縺ｫ蟋九ａ繧峨ｌ繧九・繝ｩ繝ｳ縲ょｯｾ蠢懊い繝励Μ・・,000蜀・燕蠕鯉ｼ峨′蠢・ｦ√↑蝣ｴ蜷医′縺ゅｊ縺ｾ縺吶・ },
      { name: "繝励Λ繝ｳB・哂UX/HDMI螟夜Κ蜈･蜉・, price: "0", description: "譌｢蟄倥リ繝薙・螟夜Κ蜈･蜉帙ｒ蛻ｩ逕ｨ縲・DMI蜈･蜉帙′縺ゅｌ縺ｰ鬮倬浹雉ｪ莨晞√′蜿ｯ閭ｽ縲よ磁邯夂畑繧ｱ繝ｼ繝悶Ν縺悟挨騾泌ｿ・ｦ√〒縺吶・ },
      { name: "繝励Λ繝ｳC・啅SB繝医Λ繝ｳ繧ｹ繝昴・繝郁ｿｽ蜉", price: "0", description: "繝・ず繧ｿ繝ｫ菫｡蜿ｷ縺ｮ縺ｾ縺ｾ蜿悶ｊ蜃ｺ縺励・ｫ倬浹雉ｪ縺ｪD/A繧ｳ繝ｳ繝舌・繧ｿ繝ｼ繧帝壹＠縺ｦ謗･邯壹る浹雉ｪ縺悟､ｧ縺阪￥謾ｹ蝟・＆繧後∪縺吶・ },
      { name: "繝励Λ繝ｳD・壹ワ繧､繝ｬ繧ｾ蟇ｾ蠢懊リ繝灘ｰ主・", price: "0", description: "謫堺ｽ懈ｧ繧る浹雉ｪ繧よ栢鄒､縲４D繧ｫ繝ｼ繝峨ｄUSB繝｡繝｢繝ｪ繧貞ｷｮ縺苓ｾｼ繧縺縺代〒繧ｹ繝槭・繝医↓蜀咲函縲ゅち繝・メ繝代ロ繝ｫ謫堺ｽ懊ｂ蜿ｯ閭ｽ縲・ },
      { name: "繝励Λ繝ｳE・壹ワ繧､繝ｬ繧ｾ蟇ｾ蠢廛SP讒狗ｯ・, price: "0", description: "迴ｾ蝨ｨ縺ｮ荳ｻ豬√ゅョ繧ｸ繧ｿ繝ｫ菫｡蜿ｷ縺ｮ縺ｾ縺ｾDSP縺ｸ蜈･蜉帙＠縲∝・阡ｵ縺ｮ鬮倬浹雉ｪDAC縺ｧ螟画鋤縲ゅΟ繧ｹ縺ｮ讌ｵ繧√※蟆代↑縺・す繧ｹ繝・Β縲・ },
      { name: "繝励Λ繝ｳF・哭DAC繝ｯ繧､繝､繝ｬ繧ｹ謗･邯・, price: "0", description: "繝ｯ繧､繝､繝ｬ繧ｹ縺ｪ縺後ｉ96k/24bit縺ｮ繝上う繝ｬ繧ｾ莨晞√ｒ螳溽樟縲ょ茜萓ｿ諤ｧ縺ｨ髻ｳ雉ｪ繧剃ｸ｡遶九・ },
      { name: "繝励Λ繝ｳG・壹Γ繝・ぅ繧｢繝励Ξ繝ｼ繝､繝ｼ蟆主・", price: "0", description: "螟ｧ螳ｹ驥輯SD遲峨↓蟇ｾ蠢懊＠縺溷ｰら畑讖溘らｩｶ讌ｵ繧呈ｱゅａ繧九Θ繝ｼ繧ｶ繝ｼ縺ｫ莠ｺ豌・ 繝ｩ繧､繝悶Λ繝ｪ繝ｼ繧剃ｸｸ縺斐→謖√■豁ｩ縺代∪縺吶・ }
    ]
  },
  {
    id: 'media_player_guide',
    title: "縺・∪豕ｨ逶ｮ・∬ｻ願ｼ峨Γ繝・ぅ繧｢繝励Ξ繝ｼ繝､繝ｼ",
    badge: "譛譁ｰ繝医Ξ繝ｳ繝・,
    features: ["繝・ず繧ｿ繝ｫ鬮倬浹雉ｪ莨晞・, "DSP騾｣謳ｺ", "霆願ｼ牙ｰら畑險ｭ險・],
    image: "https://picsum.photos/seed/media-player/800/600",
    description: "繝翫ン繧ГD繝励Ξ繝ｼ繝､繝ｼ縺ｨ縺・▲縺溘・繝・ラ繝ｦ繝九ャ繝井ｺ､謠帙′邁｡蜊倥↓縺ｧ縺阪◆縺ｮ縺ｯ驕主悉縺ｮ隧ｱ縲よ怙霑代・邏疲ｭ｣縺ｧ陬・捩縺輔ｌ縺溘リ繝薙ご繝ｼ繧ｷ繝ｧ繝ｳ縺ｯ蜿悶ｊ螟悶☆縺薙→縺後〒縺阪★縲・浹縺ｮ蜈･蜿｣縺ｨ縺ｪ繧九・繝・ラ繝ｦ繝九ャ繝医・髻ｳ雉ｪ蜷台ｸ翫・蝗ｰ髮｣縺ｫ縺ｪ繧翫∪縺励◆縲・n\n縺昴％縺ｧ譁ｰ縺励＞驕ｸ謚櫁い縺ｨ縺ｪ繧九・縺後瑚ｻ願ｼ峨Γ繝・ぅ繧｢繝励Ξ繝ｼ繝､繝ｼ縲阪〒縺吶らｴ疲ｭ｣縺ｮ繝・ぅ繧ｹ繝励Ξ繧､繧ｪ繝ｼ繝・ぅ繧ｪ縺ｪ縺ｩ繧偵Γ繧､繝ｳ繧ｽ繝ｼ繧ｹ縺ｨ縺励※繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ諡｡蠑ｵ繧帝ｲ繧√※縺阪◆譁ｹ縺ｫ縺翫☆縺吶ａ縺ｧ縲∝渕譛ｬ逧・↓縺ｯDSP縺ｨ縺ｮ邨・∩蜷医ｏ縺帙〒繧ｷ繧ｹ繝・Β繧呈ｧ区・縺励∪縺吶・n\n蜈峨ｄ蜷瑚ｻｸ遶ｯ蟄舌ｒ菴ｿ縺｣縺ｦ繝・ず繧ｿ繝ｫ繝・・繧ｿ繧偵◎縺ｮ縺ｾ縺ｾDSP縺ｸ蜈･蜉帙☆繧九％縺ｨ縺ｧ縲∫ｴ疲ｭ｣繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ蛻ｶ髯舌ｒ蜿励￠縺ｪ縺・悸蛟堤噪縺ｪ鬮倬浹雉ｪ繧貞ｮ溽樟縲ゅせ繝槭・繝医ヵ繧ｩ繝ｳ繧ДAP縺ｨ縺ｯ逡ｰ縺ｪ繧翫∬ｻ贋ｸ｡縺ｫ險ｭ鄂ｮ縺励※驕玖ｻ｢縺励↑縺後ｉ讌ｽ縺励・縺薙→繧貞燕謠舌↓險ｭ險医＆繧後◆縲∬ｻ翫・縺溘ａ縺ｮ譁ｰ縺励＞髻ｳ讌ｽ繧ｽ繝ｼ繧ｹ縺ｧ縺吶・,
    category: "遏･隴倥・繧ｬ繧､繝・,
    packageDetails: {
      standardPrice: "0",
      savings: "0",
      contents: [
        { title: "繝｡繝・ぅ繧｢繝励Ξ繝ｼ繝､繝ｼ譛ｬ菴・, description: "鬮倬浹雉ｪ繝輔か繝ｼ繝槭ャ繝茨ｼ医ワ繧､繝ｬ繧ｾ/DSD遲会ｼ牙ｯｾ蠢懊・蜀咲函讖・, icon: "Music" },
        { title: "繝・ず繧ｿ繝ｫ驟咲ｷ・, description: "蜈会ｼ医が繝励ユ繧｣繧ｫ繝ｫ・峨ｄ蜷瑚ｻｸ・医さ繧｢繧ｭ繧ｷ繝｣繝ｫ・峨〒縺ｮ繝・ず繧ｿ繝ｫ莨晞・, icon: "Zap" },
        { title: "繧､繝ｳ繧ｹ繝医・繝ｫ繝ｻ蝗ｺ螳・, description: "霆贋ｸ｡縺ｸ縺ｮ遒ｺ螳溘↑險ｭ鄂ｮ縺ｨ髮ｻ貅舌Ρ繧､繝､繝ｪ繝ｳ繧ｰ", icon: "Wrench" },
        { title: "DSP騾｣謳ｺ險ｭ螳・, description: "DSP蛛ｴ縺ｮ蜈･蜉帛・譖ｿ繧・し繧ｦ繝ｳ繝峨メ繝･繝ｼ繝九Φ繧ｰ", icon: "Activity" }
      ],
      notes: [
        "蝓ｺ譛ｬ逧・↓縺ｯDSP・医ョ繧ｸ繧ｿ繝ｫ繝励Ο繧ｻ繝・し繝ｼ・峨→縺ｮ邨・∩蜷医ｏ縺帙′蠢・ｦ√〒縺吶・,
        "邏疲ｭ｣繝翫ン縺ｮ髻ｳ雉ｪ縺ｫ荳肴ｺ縺後≠繧区婿縺ｮ繧ｹ繝・ャ繝励い繝・・縺ｫ譛驕ｩ縺ｧ縺吶・,
        "USB繝｡繝｢繝ｪ繧ТSD遲峨↓菫晏ｭ倥＠縺溯・螟ｧ縺ｪ繝ｩ繧､繝悶Λ繝ｪ繝ｼ繧定ｻ雁・縺ｧ讌ｽ縺励ａ縺ｾ縺吶・,
        "讖溽ｨｮ縺ｫ繧医ｊ謫堺ｽ懈婿豕包ｼ医Μ繝｢繧ｳ繝ｳ縲√せ繝槭・繧｢繝励Μ遲会ｼ峨′逡ｰ縺ｪ繧翫∪縺吶・,
        "蜿紋ｻ倅ｽ咲ｽｮ繧・す繧ｹ繝・Β讒区・縺ｫ繧医ｊ縲∝挨騾泌ｷ･雉・ｄ繧ｱ繝ｼ繝悶Ν莉｣縺檎匱逕溘＠縺ｾ縺吶・
      ]
    },
    lineup: [
      { name: "audio-technica / AT-HRP5", price: "0", description: "繝上う繝ｬ繧ｾ蟇ｾ蠢懊Γ繝・ぅ繧｢繝励Ξ繝ｼ繝､繝ｼ縲ょｹ・ｺ・＞繝輔か繝ｼ繝槭ャ繝医↓蟇ｾ蠢懊＠縲∝ｮ牙ｮ壹＠縺溷虚菴懊′鬲・鴨縲・ },
      { name: "GOLDHORN / G3繧ｷ繝ｪ繝ｼ繧ｺ (GTS1PRO / GTS2 / GTS3)", price: "0", description: "蝨ｧ蛟堤噪縺ｪ鬮倬浹雉ｪ繧定ｪ・ｋ繝上う繧ｨ繝ｳ繝峨・繝｡繝・ぅ繧｢繝励Ξ繝ｼ繝､繝ｼ縲ょ､ｧ螳ｹ驥輯SD縺ｫ繧ょｯｾ蠢懊・ },
      { name: "GOLDHORN / P繧ｷ繝ｪ繝ｼ繧ｺ (P1 / P2PRO / P3PLUS)", price: "0", description: "繧ｳ繧ｹ繝医ヱ繝輔か繝ｼ繝槭Φ繧ｹ縺ｫ蜆ｪ繧後◆繝励Ξ繝ｼ繝､繝ｼ縲・SP蜀・鳩繝｢繝・Ν繧ゅ≠繧翫√す繧ｹ繝・Β讒狗ｯ峨′繧ｹ繝繝ｼ繧ｺ縲・ },
      { name: "ALPINE / DSD-Z10", price: "0", description: "DSD蜀咲函縺ｫ蟇ｾ蠢懊＠縺溘ワ繧､繝ｬ繧ｾ繝励Ξ繝ｼ繝､繝ｼ縲らｹ顔ｴｰ縺ｪ髻ｳ縺ｮ繝九Η繧｢繝ｳ繧ｹ繧剃ｽ吶☆縺薙→縺ｪ縺丞・迴ｾ縲・ }
    ]
  },
  {
    id: 'hi_end_guide',
    title: "繝上う繧ｨ繝ｳ繝峨せ繝斐・繧ｫ繝ｼ縺ｸ縺ｮ隱倥＞",
    badge: "閾ｳ鬮倥・髻ｳ",
    features: ["蝨ｧ蛟堤噪縺ｪ隗｣蜒丞ｺｦ", "豁｣遒ｺ縺ｪ髻ｳ蜒丞ｮ壻ｽ・, "闃ｸ陦鍋噪縺ｪ陦ｨ迴ｾ蜉・],
    image: "https://picsum.photos/seed/hi-end-sp/800/600",
    description: "繝上う繧ｨ繝ｳ繝峨せ繝斐・繧ｫ繝ｼ繧偵う繝ｳ繧ｹ繝医・繝ｫ縺吶ｋ縺ｫ縺ｯ繝ｻ繝ｻ繝ｻ\n\n蜷・ヶ繝ｩ繝ｳ繝峨・荳贋ｽ阪Δ繝・Ν縺ｧ縺ｯ縲√◎縺ｮ繧ｹ繝壹ャ繧ｯ繧偵＠縺｣縺九ｊ縺ｨ豢ｻ縺九○繧九う繝ｳ繧ｹ繝医Ξ繝ｼ繧ｷ繝ｧ繝ｳ繧・こ繝ｼ繝悶Ν驕ｸ縺ｳ縺悟､ｧ蛻・↓縺ｪ繧翫∪縺吶ゅワ繧､繧ｨ繝ｳ繝峨せ繝斐・繧ｫ繝ｼ縺ｫ譁ｽ縺励◆縺・う繝ｳ繧ｹ繝医・繝ｫ縲√こ繝ｼ繝悶Ν驕ｸ縺ｳ縺ｪ縺ｩ繧偵＃邏ｹ莉九＠縺ｾ縺吶・n\n繝上う繧ｨ繝ｳ繝峨せ繝斐・繧ｫ繝ｼ縺ｫ闊亥袖繧呈戟縺｣縺溘ｉ縺懊・縺皮嶌隲・￥縺縺輔＞縲ゅが繝ｼ繝翫・讒倥・逅・Φ繧貞ｽ｢縺ｫ縺吶ｋ譛驕ｩ縺ｪ繧ｷ繧ｹ繝・Β繧偵＃謠先｡医＞縺溘＠縺ｾ縺吶・,
    category: "遏･隴倥・繧ｬ繧､繝・,
    packageDetails: {
      standardPrice: "0",
      savings: "0",
      contents: [
        { title: "繝・ぅ繝ｼ繧ｿ繝ｼ蜉蟾･蜿紋ｻ・, description: "蜿榊ｰ・ｒ閠・・縺励◆繝斐Λ繝ｼ繧・ラ繧｢繝溘Λ繝ｼ陬上∈縺ｮ蝓九ａ霎ｼ縺ｿ蜉蟾･", icon: "Activity" },
        { title: "繝峨い繧ｹ繝斐・繧ｫ繝ｼ蜿紋ｻ・, description: "謚懊￠繧定憶縺上☆繧・繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν繧・ｼｷ蝗ｺ縺ｪ繝舌ャ繝輔Ν陬ｽ菴・, icon: "Wrench" },
        { title: "鬮倬浹雉ｪ繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ", description: "繝ｬ繧ｰ繧ｶ繝・ヨ縲｀&M縲√い繧ｯ繝ｭ繝ｪ繝ｳ繧ｯ遲峨・鬮倡ｴ壹こ繝ｼ繝悶Ν驕ｸ螳・, icon: "Zap" },
        { title: "繧ｷ繧ｹ繝・Β讒区・", description: "DSP繧堤畑縺・◆繝槭Ν繝√Ρ繧､繝､繝ｪ繝ｳ繧ｰ・医い繧ｯ繝・ぅ繝厄ｼ臥ｭ峨・讒狗ｯ・, icon: "Layers" }
      ],
      notes: [
        "繝上う繧ｨ繝ｳ繝峨せ繝斐・繧ｫ繝ｼ縺ｯ繝ｦ繝九ャ繝医・諤ｧ閭ｽ繧貞ｼ輔″蜃ｺ縺吶◆繧√・迺ｰ蠅・ｽ懊ｊ縺御ｸ榊庄谺縺ｧ縺吶・,
        "繧､繝ｳ繝翫・繝舌ャ繝輔Ν縺ｧ縺ｮ譁ｽ蟾･縺ｧ繧ゅ∝ｸりｲｩ蜩√ｒ驕ｿ縺代せ繝斐・繧ｫ繝ｼ繧偵＠縺｣縺九ｊ蜿励￠豁｢繧√ｋ陬ｽ菴懊′驥崎ｦ√〒縺吶・,
        "隧ｦ閨ｴ螳､縺ｧ縺ｯ繧ｹ繝斐・繧ｫ繝ｼ繧ｱ繝ｼ繝悶Ν縺ｮ豈碑ｼ・ｂ蜿ｯ閭ｽ縺ｧ縺吶る浹縺ｮ驕輔＞繧剃ｽ捺─縺励※驕ｸ縺ｹ縺ｾ縺吶・
      ]
    },
    lineup: [
      { name: "A繝斐Λ繝ｼ繝・ぅ繝ｼ繧ｿ繝ｼ蝓九ａ霎ｼ縺ｿ蜉蟾･", price: "44000", description: "蜿榊ｰ・・蠖ｱ髻ｿ繧定・・縺励◆隗貞ｺｦ豎ｺ繧√ょｷｦ蜿ｳ霎ｼ 44,000蜀・・ },
      { name: "繧ｪ繝ｪ繧ｸ繝翫Ν繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν陬ｽ菴・, price: "107800", description: "繧ｹ繝斐・繧ｫ繝ｼ縺ｮ謚懊￠繧定憶縺上＠縲∵ュ蝣ｱ驥上ｒ譛螟ｧ髯舌↓蠑輔″蜃ｺ縺吶う繝ｳ繧ｹ繝医・繝ｫ縲・ },
      { name: "繧ｨ繝ｳ繧ｯ繝ｭ繝ｼ繧ｸ繝｣繝ｼ莉墓ｧ倥い繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν", price: "0", description: "繧ｹ繝斐・繧ｫ繝ｼ縺ｨ霆贋ｸ｡縺ｫ蜷医ｏ縺帙※縲∵賜蝨ｧ繧偵さ繝ｳ繝医Ο繝ｼ繝ｫ縺吶ｋ縺薙□繧上ｊ縺ｮ繧ｨ繝ｳ繧ｯ繝ｭ繝ｼ繧ｸ繝｣繝ｼ繧定｣ｽ菴懊・ }
    ]
  },
  {
    id: 'subwoofer_style_guide',
    title: "繧ｵ繝悶え繝ｼ繝上・繧､繝ｳ繧ｹ繝医・繝ｫ繝ｻ繧ｹ繧ｿ繧､繝ｫ繧ｬ繧､繝・,
    badge: "菴朱浹縺ｮ讌ｵ閾ｴ",
    features: ["菴朱浹陬懷ｼｷ", "BOX陬ｽ菴・, "繝ｩ繧ｲ繝・ず蝓九ａ霎ｼ縺ｿ"],
    image: "https://picsum.photos/seed/subwoofer/800/600",
    description: "縺ｨ縺｣縺ｦ繧る㍾隕√↑繧ｵ繝悶え繝ｼ繝上・縺ｮ蠖ｹ蜑ｲ・∝庄閨ｴ蟶ｯ蝓溘・縺ｻ繧薙・荳驛ｨ縺ｧ縺吶′縲∝ｻｺ迚ｩ縺ｮ蝓ｺ遉弱→蜷後§縺ｧ縺薙％縺後＠縺｣縺九ｊ縺励※縺・↑縺・→蜈ｨ菴薙・繧､繝｡繝ｼ繧ｸ縺悟ｸ瑚埋縺ｫ縺ｪ縺｣縺ｦ縺励∪縺・∪縺吶・n\n髻ｳ縺ｯ蛟埼浹縺ｧ讒区・縺輔ｌ縺ｦ縺・∪縺吶・縺ｧ縲√し繝悶え繝ｼ繝上・縺御ｸｭ蠢・〒縺ｪ縺・ｈ縺・↑繝懊・繧ｫ繝ｫ繧・ヴ繧｢繝弱・髻ｳ繧ゅ√し繝悶え繝ｼ繝上・縺ｮ繧ｪ繝ｳ繧ｪ繝輔〒讒伜､峨ｏ繧翫＠縺ｾ縺吶・iFi繧ｹ繧ｿ繧､繝ｫ縺九ｉ繝代Ρ繝ｼ繧ｵ繧ｦ繝ｳ繝峨・㍾菴朱浹繧ｹ繧ｿ繧､繝ｫ縺ｾ縺ｧ縲∬・蛻・□縺代・蛟句ｮ､繧貞･ｽ縺阪↑繧ｵ繧ｦ繝ｳ繝峨↓繧｢繝ｬ繝ｳ繧ｸ縺励※讌ｽ縺励∩縺ｾ縺励ｇ縺・ｼ・,
    category: "遏･隴倥・繧ｬ繧､繝・,
    packageDetails: {
      standardPrice: "0",
      savings: "0",
      contents: [
        { title: "繧ｵ繝悶え繝ｼ繝上・繝ｦ繝九ャ繝・, description: "8繧､繝ｳ繝・20cm)縲・8繧､繝ｳ繝・45cm)縺ｾ縺ｧ蟷・ｺ・￥蟇ｾ蠢・, icon: "Music" },
        { title: "繝代Ρ繝ｼ繧｢繝ｳ繝・, description: "D繧ｯ繝ｩ繧ｹ繝｢繝弱い繝ｳ繝励ｄ2ch繝悶Μ繝・ず謗･邯壹↑縺ｩ譛驕ｩ縺ｪ鬧・虚", icon: "Zap" },
        { title: "繧ｨ繝ｳ繧ｯ繝ｭ繝ｼ繧ｸ繝｣繝ｼ(BOX)", description: "繧ｷ繝ｼ繝ｫ繝峨・繝舌せ繝ｬ繝慕ｭ峨∵ｧ閭ｽ繧貞ｼ輔″蜃ｺ縺咎←豁｣螳ｹ驥上・險ｭ險・, icon: "Wrench" },
        { title: "繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ繝ｻ蜿紋ｻ・, description: "髮ｻ貅舌・RCA繝ｻSP繧ｱ繝ｼ繝悶Ν縺ｮ驟咲ｷ壹→遒ｺ螳溘↑蝗ｺ螳壹・隱ｿ謨ｴ", icon: "Activity" }
      ],
      notes: [
        "繝輔Ο繝ｳ繝医せ繝斐・繧ｫ繝ｼ縺ｨ縺ｮ繝舌Λ繝ｳ繧ｹ繧定・∴縺・0縲・2繧､繝ｳ繝√′縺雁匡繧√〒縺吶・,
        "BOX縺ｮ險ｭ險茨ｼ亥ｮｹ驥上ｄ蠖｢迥ｶ・峨↓繧医▲縺ｦ繧ｦ繝ｼ繝上・縺ｮ諤ｧ閭ｽ縺悟､ｧ縺阪￥螟峨ｏ繧翫∪縺吶・,
        "繝医Λ繝ｳ繧ｯ險ｭ鄂ｮ譎ゅ・縲∬差迚ｩ縺ｮ遨崎ｼ峨ｒ閠・・縺励◆閼ｱ逹縺励ｄ縺吶＞蝗ｺ螳壽婿豕輔ｂ蜿ｯ閭ｽ縺ｧ縺吶・
      ]
    },
    lineup: [
      { name: "縺頑焔霆ｽ繝代Ρ繝ｼ繝峨し繝悶え繝ｼ繝上・險ｭ鄂ｮ", price: "0", description: "繧｢繝ｳ繝怜・阡ｵ繧ｿ繧､繝励〒繧ｳ繧ｹ繝医→繧ｹ繝壹・繧ｹ繧呈椛蛻ｶ縲・ },
      { name: "繧ｹ繧ｿ繝ｳ繝繝ｼ繝隠OX險ｭ鄂ｮ・医ヨ繝ｩ繝ｳ繧ｯ・・, price: "0", description: "蝗幄ｧ偵＞繧ｿ繧､繝励・邂ｱ繧定｣ｽ菴懊＠縺ｦ繝医Λ繝ｳ繧ｯ縺ｫ險ｭ鄂ｮ縲・ },
      { name: "繝輔Ο繧｢/繧ｹ繝壹い繧ｿ繧､繝､繧ｹ繝壹・繧ｹ蝓九ａ霎ｼ縺ｿ", price: "0", description: "繧ｵ繝悶ヨ繝ｩ繝ｳ繧ｯ繧・せ繝壹い繧ｿ繧､繝､繧ｹ繝壹・繧ｹ繧貞茜逕ｨ縺励※BOX繧定｣ｽ菴懊・ },
      { name: "繧ｫ繧ｹ繧ｿ繝繝ｻ繧ｷ繝ｧ繝ｼ繧｢繝・・繧､繝ｳ繧ｹ繝医・繝ｫ", price: "0", description: "LED繝ｩ繧､繝・ぅ繝ｳ繧ｰ繧・い繧ｯ繝ｪ繝ｫ繧堤ｵ・∩蜷医ｏ縺帙◆鬲・○繧九き繧ｹ繧ｿ繝縲・ }
    ]
  },
  {
    id: 'custom_install_guide',
    title: "繧ｫ繧ｹ繧ｿ繝繧､繝ｳ繧ｹ繝医・繝ｫ繝ｻ繝ｯ繝ｳ繧ｪ繝戊｣ｽ菴・,
    badge: "螳悟・繧ｪ繝ｼ繝繝ｼ",
    features: ["繝医Λ繝ｳ繧ｯ繧ｫ繧ｹ繧ｿ繝", "繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν", "LED繝ｩ繧､繝・ぅ繝ｳ繧ｰ"],
    image: "https://picsum.photos/seed/custom-inst/800/600",
    description: "繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｪ繧峨〒縺ｯ・√＞縺・浹繧定ｳ縺ｧ讌ｽ縺励・縺縺代〒縺ｯ縺ｪ縺上√け繝ｼ繝ｫ縺ｪ繧､繝ｳ繧ｹ繝医・繝ｫ縺ｧ逶ｮ縺ｧ隕九※讌ｽ縺励・繧ｫ繧ｹ繧ｿ繝繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ荳也阜縲・n\n莉｣陦ｨ逧・↑蜿悶ｊ莉倥￠萓九ｒ縺皮ｴｹ莉九＠縺ｾ縺吶ょ叙繧贋ｻ倥￠繧九Θ繝九ャ繝医ｄ霆贋ｸ｡縲√∪縺溘う繝ｳ繧ｹ繝医・繝ｫ譁ｹ豕輔↓繧医ｊ雋ｻ逕ｨ縺ｯ讒倥・〒縺吶ゅ∪縺壹・縺頑ｰ苓ｻｽ縺ｫ縺皮嶌隲・￥縺縺輔＞縲・n\n繧ｪ繝ｼ繝翫・讒倥・繧､繝｡繝ｼ繧ｸ縺吶ｋ繧ｫ繧ｹ繧ｿ繝繧貞・迴ｾ蛹悶☆繧九♀謇倶ｼ昴＞繧偵＞縺溘＠縺ｾ縺吶ゅΡ繝ｳ繧ｪ繝輔〒縺ｮ繧ｫ繧ｹ繧ｿ繝縺ｨ縺ｪ繧翫√♀霆翫ｒ遒ｺ隱阪＠縺ｪ縺後ｉ縺ｮ蝠・ｫ・′蠢・ｦ√→縺ｪ繧翫∪縺吶・縺ｧ縲√●縺ｲ縺疲擂蠎励・荳翫＃逶ｸ隲・￥縺縺輔＞縲・,
    category: "遏･隴倥・繧ｬ繧､繝・,
    packageDetails: {
      standardPrice: "0",
      savings: "0",
      contents: [
        { title: "繝・じ繧､繝ｳ繝ｻ險ｭ險・, description: "霆贋ｸ｡蠖｢迥ｶ縺ｨ讖滓攝縺ｫ蜷医ｏ縺帙◆繝ｯ繝ｳ繧ｪ繝輔ョ繧ｶ繧､繝ｳ", icon: "Layers" },
        { title: "騾菴懊・蜉蟾･", description: "MDF縲√い繧ｯ繝ｪ繝ｫ縲√ヱ繝・ｭ峨ｒ逕ｨ縺・◆鬮伜ｺｦ縺ｪ蜉蟾･謚陦・, icon: "Wrench" },
        { title: "莉穂ｸ翫￡繝ｻ陬・｣ｾ", description: "繝ｬ繧ｶ繝ｼ縲√・繧､繝ｳ繝医´ED繝ｩ繧､繝・ぅ繝ｳ繧ｰ遲峨・貍泌・", icon: "Activity" },
        { title: "髻ｳ髻ｿ繝√Η繝ｼ繝九Φ繧ｰ", description: "繧ｫ繧ｹ繧ｿ繝迺ｰ蠅・↓蜷医ｏ縺帙◆譛驕ｩ縺ｪ繧ｵ繧ｦ繝ｳ繝芽ｪｿ謨ｴ", icon: "Music" }
      ],
      notes: [
        "險倩ｼ峨＠縺ｦ縺・ｋ萓｡譬ｼ縺ｯ荳萓九〒縺吶よ命蟾･蜀・ｮｹ縺ｫ繧医ｊ螟ｧ縺阪￥螟牙虚縺励∪縺吶・,
        "繝ｯ繝ｳ繧ｪ繝戊｣ｽ菴懊・縺溘ａ縲√♀霆翫ｒ縺企舌°繧翫＠縺ｦ縺ｮ菴懈･ｭ縺ｨ縺ｪ繧翫∪縺吶・,
        "縺ｾ縺壹・縺疲擂蠎励＞縺溘□縺阪√＃隕∵悍繧偵♀閨槭°縺帙￥縺縺輔＞縲ゅ♀隕狗ｩ阪ｂ繧翫ｒ菴懈・縺・◆縺励∪縺吶・
      ]
    },
    lineup: [
      { name: "繝医Λ繝ｳ繧ｯ繝ｻ繧ｫ繝ｼ繧ｴ繧ｹ繝壹・繧ｹ繧､繝ｳ繧ｹ繝医・繝ｫ", price: "100000", description: "繝輔Ο繧｢縺ｸ縺ｮ蝓九ａ霎ｼ縺ｿ繧・き繝舌・陬ｽ菴・ 縺翫ｈ縺・0荳・・縲懊・ },
      { name: "繧ｻ繝繝ｳ繧ｿ繧､繝励ヨ繝ｩ繝ｳ繧ｯ繧､繝ｳ繧ｹ繝医・繝ｫ", price: "150000", description: "閭後ｂ縺溘ｌ陬上∈縺ｮ繧ｦ繝ｼ繝上・蝓九ａ霎ｼ縺ｿ繧・い繝ｳ繝励・繝ｼ繝芽｣ｽ菴・ 縺翫ｈ縺・5荳・・縲懊・ },
      { name: "繝峨い繧ｫ繧ｹ繧ｿ繝繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν陬ｽ菴・, price: "200000", description: "邏疲ｭ｣繝代ロ繝ｫ縺ｫ鬥ｴ譟薙・繧ｫ繧ｹ繧ｿ繝繧､繝ｳ繧ｹ繝医・繝ｫ. 蟾ｦ蜿ｳ縺ｧ縺翫ｈ縺・0荳・・縲懊・ },
      { name: "繝峨い繝代ロ繝ｫ蜈ｨ髱｢譁ｽ蟾･繝ｻ繧ｨ繝ｳ繧ｯ繝ｭ繝ｼ繧ｸ繝｣繝ｼ", price: "250000", description: "繝代ロ繝ｫ荳ｸ縺斐→蠑ｵ繧頑崛縺医ｄ繧ｨ繝ｳ繧ｯ繝ｭ繝ｼ繧ｸ繝｣繝ｼ蛹・ 縺翫ｈ縺・5荳・・縲懊・ },
      { name: "繧ｫ繧ｹ繧ｿ繝繝斐Λ繝ｼ繧､繝ｳ繧ｹ繝医・繝ｫ・・WAY蟇ｾ蠢懶ｼ・, price: "80000", description: "繝輔Ο繝ｳ繝・WAY縺ｫ谺縺九○縺ｪ縺・ヴ繝ｩ繝ｼ蜉蟾･. 蟾ｦ蜿ｳ縺ｧ縺翫ｈ縺・荳・・縲懊・ }
    ]
  }
];

const initialPlans: PlanCategory[] = [
  {
    id: 'speaker_exchange',
    category: "邏疲ｭ｣縺ｮ髻ｳ縺ｫ荳肴ｺ縺後≠繧区婿縺ｸ",
    type: 'audio',
    description: "髻ｳ縺後％繧ゅｋ縲√・縺｣縺阪ｊ縺励↑縺・ｦ\n**繧ｹ繝斐・繧ｫ繝ｼ莠､謠・*縺ｧ鬩壹￥縺ｻ縺ｩ**繧ｯ繝ｪ繧｢**縺ｫ螟峨ｏ繧翫∪縺吶・n\n驕ｸ縺ｹ繧・*5縺､縺ｮ繝励Λ繝ｳ**繧偵＃逕ｨ諢上＠縺ｦ縺・∪縺吶・,
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "繧ｹ繝斐・繧ｫ繝ｼ莠､謠妝ASIC line・医さ繧｢繧ｭ繧ｷ繝｣繝ｫ・・,
        price: "44000",
        features: ["繧ｳ繧｢繧ｭ繧ｷ繝｣繝ｫ繧ｹ繝斐・繧ｫ繝ｼ莠､謠・, "邁｡譏薙ョ繝・ラ繝九Φ繧ｰ", "繝舌・繝∵攝繝舌ャ繝輔Ν"],
        badge: "縺頑焔霆ｽ蟆主・",
        image: "/images/Audio/basic_line_coaxial.webp",
        description: "髻ｳ雉ｪ繧｢繝・・縺ｮ隨ｬ荳豁ｩ縺ｯ繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙°繧会ｼ―n\n繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙ヱ繝・こ繝ｼ繧ｸ繝吶・繧ｷ繝・け繝ｩ繧､繝ｳ・医さ繧｢繧ｭ繧ｷ繝｣繝ｫ・峨〒縺ｯ繝・ぅ繝ｼ繧ｿ繝ｼ縺後Α繝・ラ繝ｬ繝ｳ繧ｸ繧ｹ繝斐・繧ｫ繝ｼ縺ｮ逵溘ｓ荳ｭ縺ｫ繝薙Ν繝医う繝ｳ縺輔ｌ縺ｦ縺・ｋ繧ｳ繧｢繧ｭ繧ｷ繝｣繝ｫ・亥酔霆ｸ・峨ち繧､繝励せ繝斐・繧ｫ繝ｼ繧帝∈繧薙〒縺ｮ繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙ｒ繝ｪ繝ｼ繧ｺ繝翫ヶ繝ｫ縺ｫ蜿悶ｊ莉倥￠縺ｾ縺ｧ陦後≧繝代ャ繧ｱ繝ｼ繧ｸ縺ｧ縺吶・n繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ繧ｷ繧ｹ繝・Β繧｢繝・・縺悟・繧√※縺ｮ譁ｹ縺ｫ縺翫☆縺吶ａ縺ｮ繝代ャ繧ｱ繝ｼ繧ｸ縺ｧ繝・ぅ繝ｼ繧ｿ繝ｼ縺ｨ繝溘ャ繝峨Ξ繝ｳ繧ｸ縺御ｸ菴薙↓縺ｪ縺｣縺ｦ縺・ｋ縺ｮ縺ｧ謇玖ｻｽ縺ｫ蜿悶ｊ莉倥￠繧峨ｌ繧九Γ繝ｪ繝・ヨ縺後≠繧翫∪縺吶らｴ疲ｭ｣縺後ヵ繝ｫ繝ｬ繝ｳ繧ｸ繧ｿ繧､繝励・繧ｹ繝斐・繧ｫ繝ｼ縺瑚｣・捩縺輔ｌ縺ｦ縺・ｋ霆贋ｸ｡縺ｧ縺ｯ縲・ｫ倬浹蟆ら畑縺ｮ繝・ぅ繝ｼ繧ｿ繝ｼ縺悟｢励∴繧九・縺ｧ縲∫ｴ疲ｭ｣繧ｹ繝斐・繧ｫ繝ｼ繧剃ｺ､謠帙☆繧九□縺代〒髻ｳ縺梧・繧九￥闖ｯ繧・°縺ｫ縺ｪ繧翫∪縺吶・,
        packageDetails: {
          standardPrice: "55000",
          savings: "11000",
          contents: [
            { title: "繧ｹ繝斐・繧ｫ繝ｼ", description: "17cm繝｢繝・Ν縺ｾ縺溘・10cm繝｢繝・Ν縺ｮ繧ｳ繧｢繧ｭ繧ｷ繝｣繝ｫ繧ｹ繝斐・繧ｫ繝ｼ", icon: "Speaker" },
            { title: "霆ｽ髦ｲ謖ｯ", description: "繝峨い縺ｮ荳崎ｦ√↑謖ｯ蜍輔ｒ謚代∴繧狗ｰ｡譏薙ョ繝・ラ繝九Φ繧ｰ", icon: "Activity" },
            { title: "繧ｫ繧ｹ繧ｿ繝繧､繝ｳ繝翫・繝舌ャ繝輔Ν", description: "鬮伜央諤ｧ繝舌・繝∵攝繝舌ャ繝輔Ν・・7cm繝｢繝・Ν縺ｮ縺ｿ・・, icon: "Layers" },
            { title: "繧ｹ繝斐・繧ｫ繝ｼ莠､謠帛ｷ･雉・, description: "繝励Ο縺ｫ繧医ｋ遒ｺ螳溘↑蜿悶ｊ莉倥￠菴懈･ｭ", icon: "Wrench" }
          ],
          notes: [
            "繝舌ャ繝輔Ν驕ｩ蜷医′辟｡縺・ｻ顔ｨｮ縺ｧ縺ｯ蛻･騾碑｣ｽ菴懆ｲｻ11,000蜀・′蠢・ｦ√〒縺吶・,
            "縺薙・繝代ャ繧ｱ繝ｼ繧ｸ縺ｯ迴ｾ驥代〒縺ｮ縺頑髪謇輔＞縺ｨ縺ｪ繧翫∪縺吶・,
            "菴懈･ｭ譎る俣縺ｯ霆顔ｨｮ縺ｫ繧医ｊ縺ｾ縺吶′1縲・譎る俣縺ｮ莠亥ｮ壹〒縺吶ゆｻ｣霆翫′蠢・ｦ√↑蝣ｴ蜷医・縺比ｺ育ｴ・凾縺ｫ縺贋ｼ昴∴縺上□縺輔＞縲・
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
        name: "繧ｹ繝斐・繧ｫ繝ｼ莠､謠妝ASIC line・医そ繝代Ξ繝ｼ繝茨ｼ・,
        price: "59400",
        features: ["繧ｻ繝代Ξ繝ｼ繝医せ繝斐・繧ｫ繝ｼ莠､謠・, "邁｡譏薙ョ繝・ラ繝九Φ繧ｰ", "繧､繝ｳ繝ｩ繧､繝ｳNW"],
        badge: "蛻晏ｿ・・♀縺吶☆繧・,
        image: "/images/Audio/basic_line_separate.webp",
        description: "髻ｳ雉ｪ繧｢繝・・縺ｮ隨ｬ荳豁ｩ縺ｯ繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙°繧会ｼ―n\n繧ｻ繝代Ξ繝ｼ繝医せ繝斐・繧ｫ繝ｼ繧呈焔霆ｽ縺ｫ讌ｽ縺励ａ繧九ヱ繝・こ繝ｼ繧ｸ\n繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙ヱ繝・こ繝ｼ繧ｸ繝吶・繧ｷ繝・け繝ｩ繧､繝ｳ・医そ繝代Ξ繝ｼ繝茨ｼ峨〒縺ｯ鬮伜沺蜀咲函逕ｨ縺ｮ繝・ぅ繝ｼ繧ｿ繝ｼ縺ｨ荳ｭ菴主沺蜀咲函逕ｨ縺ｮ繝溘ャ繝峨Ξ繝ｳ繧ｸ縺悟挨縲・↓蛻・°繧後◆繧ｻ繝代Ξ繝ｼ繝医ち繧､繝励・繧ｹ繝斐・繧ｫ繝ｼ繧帝∈繧薙〒繝ｪ繝ｼ繧ｺ繝翫ヶ繝ｫ縺ｫ蜿悶ｊ莉倥￠縺ｾ縺ｧ陦後≧繝代ャ繧ｱ繝ｼ繧ｸ縺ｧ縺吶・n繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ繧ｷ繧ｹ繝・Β繧｢繝・・縺悟・繧√※縺ｮ譁ｹ縺ｫ縺翫☆縺吶ａ縺ｮ繝代ャ繧ｱ繝ｼ繧ｸ縺ｧ繝ｪ繝ｼ繧ｺ繝翫ヶ繝ｫ縺ｪ蜿悶ｊ莉倥￠繧貞ｮ溽樟縺吶ｋ縺溘ａ縺ｫ繝阪ャ繝医Ρ繝ｼ繧ｯ・磯ｫ伜沺縺ｨ荳ｭ菴主沺縺ｫ蛻・屬縺吶ｋ繝ｦ繝九ャ繝茨ｼ峨・繧､繝ｳ繝ｩ繧､繝ｳ繧ｿ繧､繝励↑縺ｩ繧剃ｸｭ蠢・↓繝ｩ繧､繝ｳ繧｢繝・・縺励※縺・∪縺吶ゅヤ繧｣繝ｼ繧ｿ繝ｼ縺ｯ邏疲ｭ｣菴咲ｽｮ縲√ｂ縺励￥縺ｯ繝繝・す繝･繝懊・繝我ｸ翫∈鄂ｮ縺榊梛繝槭え繝ｳ繝医ｒ菴ｿ縺｣縺ｦ縺ｮ陬・捩. 髻ｳ讌ｽ縺ｮ讌ｽ縺励＆繧剃ｻ翫∪縺ｧ莉･荳翫↓讌ｽ縺励ｓ縺ｧ縺・◆縺縺代ｋ繝代ャ繧ｱ繝ｼ繧ｸ縺ｧ縺吶・,
        packageDetails: {
          standardPrice: "75900",
          savings: "16500",
          contents: [
            { title: "繧ｹ繝斐・繧ｫ繝ｼ", description: "17cm繝｢繝・Ν2WAY繧ｻ繝代Ξ繝ｼ繝医せ繝斐・繧ｫ繝ｼ", icon: "Speaker" },
            { title: "繝・ぅ繝ｼ繧ｿ繝ｼ蜿紋ｻ・, description: "邏疲ｭ｣菴咲ｽｮ繧ゅ＠縺上・繧ｪ繝ｳ繝繝・す繝･蜿悶ｊ莉倥￠", icon: "Settings2" },
            { title: "霆ｽ髦ｲ謖ｯ", description: "繝峨い縺ｮ荳崎ｦ√↑謖ｯ蜍輔ｒ謚代∴繧狗ｰ｡譏薙ョ繝・ラ繝九Φ繧ｰ", icon: "Activity" },
            { title: "繧ｫ繧ｹ繧ｿ繝繧､繝ｳ繝翫・繝舌ャ繝輔Ν", description: "鬮伜央諤ｧ繝舌・繝∵攝繝舌ャ繝輔Ν", icon: "Layers" },
            { title: "繧ｹ繝斐・繧ｫ繝ｼ莠､謠帛ｷ･雉・, description: "繝励Ο縺ｫ繧医ｋ遒ｺ螳溘↑蜿悶ｊ莉倥￠菴懈･ｭ", icon: "Wrench" }
          ],
          notes: [
            "繝舌ャ繝輔Ν驕ｩ蜷医′辟｡縺・ｻ顔ｨｮ縺ｧ縺ｯ蛻･騾碑｣ｽ菴懆ｲｻ11,000蜀・′蠢・ｦ√〒縺吶・,
            "繝・ぅ繝ｼ繧ｿ繝ｼ蝗ｺ螳壹↓繝槭え繝ｳ繝医↑縺ｩ縺悟ｿ・ｦ√↑霆顔ｨｮ縺ｧ縺ｯ蛻･騾碑ｿｽ蜉縺悟ｿ・ｦ√↓縺ｪ繧翫∪縺吶・,
            "縺薙・繝代ャ繧ｱ繝ｼ繧ｸ縺ｯ迴ｾ驥代〒縺ｮ縺頑髪謇輔＞縺ｨ縺ｪ繧翫∪縺吶・,
            "菴懈･ｭ譎る俣縺ｯ霆顔ｨｮ縺ｫ繧医ｊ縺ｾ縺吶′3縲・譎る俣縺ｮ莠亥ｮ壹〒縺・ 莉｣霆翫′蠢・ｦ√↑蝣ｴ蜷医・縺比ｺ育ｴ・凾縺ｫ縺贋ｼ昴∴縺上□縺輔＞縲・
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
        name: "繧ｹ繝斐・繧ｫ繝ｼ莠､謠婀TANDARD line・・0荳・・縺ｾ縺ｧ・・,
        price: "104500",
        features: ["繝溘ラ繝ｫ繧ｰ繝ｬ繝ｼ繝峨せ繝斐・繧ｫ繝ｼ", "譛ｬ譬ｼ繝・ャ繝峨ル繝ｳ繧ｰ", "繧､繝ｳ繝翫・繝舌ャ繝輔Ν"],
        badge: "繧ｳ繧ｹ繝第怙蠑ｷ",
        image: "/images/Audio/standard-line.png",
        description: "髻ｳ雉ｪ繧｢繝・・縺ｮ隨ｬ荳豁ｩ縺ｯ繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙°繧会ｼ―n繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙ヱ繝・こ繝ｼ繧ｸ繧ｹ繧ｿ繝ｳ繝繝ｼ繝峨Λ繧､繝ｳ縺ｧ縺ｯ・托ｼ蝉ｸ・・縺ｾ縺ｧ縺ｮ繧ｹ繝斐・繧ｫ繝ｼ縺ｮ荳ｭ縺九ｉ縺頑ｰ励↓蜈･繧翫・繧ｹ繝斐・繧ｫ繝ｼ繧帝∈繧薙〒縺・◆縺縺阪√ラ繧｢繝√Η繝ｼ繝九Φ繧ｰ縲√せ繝斐・繧ｫ繝ｼ繧ｱ繝ｼ繝悶Ν縺ｪ縺ｩ縺後そ繝・ヨ縺ｫ縺ｪ縺｣縺溘％縺繧上▲縺溷・螳ｹ縺ｧ縺吶・n\n縺薙・萓｡譬ｼ蟶ｯ縺ｯ蜷・､ｾ縺ｨ繧ゆｺｺ豌怜膚蜩√′繝ｩ繧､繝ｳ繧｢繝・・縺輔ｌ縺ｦ縺・※蛟区ｧ縺悟ｼｷ縺・Θ繝九ャ繝医′荳ｦ繧薙〒縺・∪縺吶ょ叙繧贋ｻ倥￠蜆ｪ蜈医□縺｣縺溘ｊ髻ｳ蜆ｪ蜈医□縺｣縺溘ｊ縺ｨ蜈･繧贋ｹｱ繧後※縺・ｋ萓｡譬ｼ蟶ｯ縺ｧ繧ゅ≠繧翫∪縺吶・縺ｧ縲∝膚蜩・∈縺ｳ縺ｮ縺ｨ縺阪・縺泌ｸ梧悍縺ｮ繧､繝ｳ繧ｹ繝医・繝ｫ譁ｹ豕輔′蜿ｯ閭ｽ縺九←縺・°縺ｮ蛻､譁ｭ繧ょｿ・ｦ√〒縺吶・,
        packageDetails: {
          standardPrice: "166400",
          savings: "61900",
          contents: [
            { title: "繧ｹ繝斐・繧ｫ繝ｼ", description: "17cm繝｢繝・Ν2WAY繧ｹ繝斐・繧ｫ繝ｼ・・0荳・・縺ｾ縺ｧ・・, icon: "Speaker" },
            { title: "繝峨い繝√Η繝ｼ繝九Φ繧ｰA繧ｳ繝ｼ繧ｹ", description: "蛻ｶ謖ｯ譚舌↓繧医ｋ繝峨い縺ｮ迺ｰ蠅・紛蛯呻ｼ磯壼ｸｸ22,000蜀・ｼ・, icon: "Activity" },
            { title: "繧ｫ繧ｹ繧ｿ繝繧､繝ｳ繝翫・繝舌ャ繝輔Ν", description: "霆顔ｨｮ縺ｫ蜷医ｏ縺帙◆鬮伜央諤ｧ繝舌ャ繝輔Ν・磯壼ｸｸ11,000蜀・ｼ・, icon: "Layers" },
            { title: "繧ｹ繝斐・繧ｫ繝ｼ繧ｱ繝ｼ繝悶Ν", description: "ANG繧ｪ繝ｪ繧ｸ繝翫Ν・医が繝ｼ繝・ぅ繧ｪ繝・け繝九き陬ｽ逶ｸ蠖・10m・・, icon: "Zap" },
            { title: "繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ蟾･雉・, description: "繝励Ο縺ｫ繧医ｋ遒ｺ螳溘↑驟咲ｷ壹・蜿紋ｻ假ｼ磯壼ｸｸ22,000蜀・ｼ・, icon: "Wrench" }
          ],
          upgrades: [
            { title: "繝峨い繝√Η繝ｼ繝九Φ繧ｰ B繧ｳ繝ｼ繧ｹ", price: "5500", description: "蛻ｶ謖ｯ譚仙｢鈴㍼・磯壼ｸｸ27,500蜀・ｼ・ },
            { title: "繝峨い繝√Η繝ｼ繝九Φ繧ｰ A繧ｳ繝ｼ繧ｹ", price: "11000", description: "閭悟悸蜃ｦ逅・↓繝輔ぉ繝ｪ繧ｽ繝汽S-1.5WP繧剃ｽｿ逕ｨ縲∝宛謖ｯ譚仙｢鈴㍼・磯壼ｸｸ16,500蜀・ｼ・ },
            { title: "繝｡繧ｿ繝ｫ繝舌ャ繝輔Ν蛹・, price: "螳壻ｾ｡繧医ｊ20%OFF", description: "繧ｫ繝ｭ繝・ヤ繧ｧ繝ｪ繧｢陬ｽ繝｡繧ｿ繝ｫ繝舌ャ繝輔Ν. 繧ｿ繧､繝医〒蠑ｵ繧翫・縺ゅｋ蜀咲函縺悟庄閭ｽ縺ｫ縲・ },
            { title: "繝・ぅ繝ｼ繧ｿ繝ｼA繝斐Λ繝ｼ蝓九ａ霎ｼ縺ｿ", price: "46200縲・, description: "蜿榊ｰ・ｒ謚代∴繧ｯ繝ｪ繧｢縺ｪ髻ｳ蜒上∈. 繧ｯ繝ｼ繝ｫ縺ｪ繧､繝ｳ繝・Μ繧｢繧ょｮ溽樟縲・ }
          ],
          notes: [
            "繝・ぅ繝ｼ繧ｿ繝ｼ縺ｯ邏疲ｭ｣菴咲ｽｮ縺ｸ縺ｮ蜿悶ｊ莉倥￠縲√ｂ縺励￥縺ｯ繝繝・す繝･繝懊・繝峨∈縺ｮ謐ｮ縺育ｽｮ縺榊叙繧贋ｻ倥￠縺ｨ縺ｪ繧翫∪縺吶・,
            "繝峨い繧ｹ繝斐・繧ｫ繝ｼ縺ｯ繧､繝ｳ繝翫・蜿悶ｊ莉倥￠縺ｧ縺吶・,
            "菴懈･ｭ縺ｯ1譌･縺企舌°繧翫＠縺ｾ縺吶′辟｡譁吩ｻ｣霆翫ｒ縺皮畑諢上＠縺ｦ縺・∪縺吶・縺ｧ縺泌茜逕ｨ縺上□縺輔＞縲・
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
        name: "繧ｹ繝斐・繧ｫ繝ｼ莠､謠娜REMIUM line・・0荳・・莉･荳奇ｼ・,
        price: "184800",
        features: ["繝上う繧ｰ繝ｬ繝ｼ繝峨せ繝斐・繧ｫ繝ｼ", "繝輔Ν繝・ャ繝峨ル繝ｳ繧ｰ", "繝・ぅ繝ｼ繧ｿ繝ｼ隱ｿ謨ｴ"],
        badge: "莠ｺ豌湧o.1",
        image: "/images/Audio/premium-line.png",
        description: "髻ｳ雉ｪ繧｢繝・・縺ｮ隨ｬ荳豁ｩ縺ｯ繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙°繧会ｼ―n繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙ヱ繝・こ繝ｼ繧ｸ繝励Ξ繝溘い繝繝ｩ繧､繝ｳ縺ｧ縺ｯ・托ｼ蝉ｸ・・莉･荳翫・繧ｹ繝斐・繧ｫ繝ｼ縺ｮ荳ｭ縺九ｉ縺頑ｰ励↓蜈･繧翫・繧ｹ繝斐・繧ｫ繝ｼ繧帝∈繧薙〒縺・◆縺縺阪√ラ繧｢繝√Η繝ｼ繝九Φ繧ｰ縲√せ繝斐・繧ｫ繝ｼ繧ｱ繝ｼ繝悶Ν縺ｪ縺ｩ縺後そ繝・ヨ縺ｫ縺ｪ縺｣縺溘％縺繧上▲縺溷・螳ｹ縺ｧ縺吶・n\n縺薙・萓｡譬ｼ蟶ｯ縺ｯ蜷・､ｾ縺ｨ繧る浹讌ｽ諤ｧ縺ｮ蜀咲樟縺ｫ驥阪″繧堤ｽｮ縺阪∫ｴ譚宣∈縺ｳ縺九ｉ讒矩縺ｾ縺ｧ縺昴ｌ縺槭ｌ縺ｮ繝悶Λ繝ｳ繝峨・縺薙□繧上ｊ縺悟・邵ｮ縺輔ｌ縺ｦ縺・ｋ縺ｨ縺薙ｍ縺ｧ縲・浹雉ｪ逧・↓縺ｯ諠・ｱ驥上′螟壹￥雉ｪ諢溘ｄ繝輔か繝ｼ繧ｫ繧ｹ縲√せ繝・Ξ繧ｪ繧､繝｡繝ｼ繧ｸ縺ｮ蜀咲樟諤ｧ縺ｪ縺ｩ縺後Ρ繝ｳ繝ｩ繝ｳ繧ｯ荳翫・荳也阜繧呈･ｽ縺励∪縺帙※縺上ｌ縺ｾ縺吶・,
        packageDetails: {
          standardPrice: "252200",
          savings: "67400",
          contents: [
            { title: "繧ｹ繝斐・繧ｫ繝ｼ", description: "17cm繝｢繝・Ν2WAY繧ｹ繝斐・繧ｫ繝ｼ・・0荳・・莉･荳奇ｼ・, icon: "Speaker" },
            { title: "繝峨い繝√Η繝ｼ繝九Φ繧ｰB繧ｳ繝ｼ繧ｹ", description: "蛻ｶ謖ｯ譚舌↓繧医ｋ繝峨い縺ｮ迺ｰ蠅・紛蛯呻ｼ磯壼ｸｸ27,500蜀・ｼ・, icon: "Activity" },
            { title: "繧ｫ繧ｹ繧ｿ繝繧､繝ｳ繝翫・繝舌ャ繝輔Ν", description: "霆顔ｨｮ縺ｫ蜷医ｏ縺帙◆鬮伜央諤ｧ繝舌ャ繝輔Ν・磯壼ｸｸ11,000蜀・ｼ・, icon: "Layers" },
            { title: "繧ｹ繝斐・繧ｫ繝ｼ繧ｱ繝ｼ繝悶Ν", description: "ANG繧ｪ繝ｪ繧ｸ繝翫Ν・医が繝ｼ繝・ぅ繧ｪ繝・け繝九き陬ｽ逶ｸ蠖・10m・・, icon: "Zap" },
            { title: "繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ蟾･雉・, description: "繝励Ο縺ｫ繧医ｋ遒ｺ螳溘↑驟咲ｷ壹・蜿紋ｻ假ｼ磯壼ｸｸ22,000蜀・ｼ・, icon: "Wrench" }
          ],
          upgrades: [
            { title: "繝峨い繝√Η繝ｼ繝九Φ繧ｰ A繧ｳ繝ｼ繧ｹ", price: "11000", description: "閭悟悸蜃ｦ逅・↓繝輔ぉ繝ｪ繧ｽ繝汽S-1.5WP繧剃ｽｿ逕ｨ縲∝宛謖ｯ譚仙｢鈴㍼・磯壼ｸｸ16,500蜀・ｼ・ },
            { title: "繝峨い繝√Η繝ｼ繝九Φ繧ｰ A+繧ｳ繝ｼ繧ｹ", price: "22000", description: "閭悟悸蜃ｦ逅・↓繝輔ぉ繝ｪ繧ｽ繝気2繧剃ｽｿ逕ｨ縲∝宛謖ｯ譚仙｢鈴㍼・磯壼ｸｸ27,500蜀・ｼ・ },
            { title: "繝｡繧ｿ繝ｫ繝舌ャ繝輔Ν蛹・, price: "螳壻ｾ｡繧医ｊ20%OFF", description: "繧ｫ繝ｭ繝・ヤ繧ｧ繝ｪ繧｢陬ｽ繝｡繧ｿ繝ｫ繝舌ャ繝輔Ν. 繧ｿ繧､繝医〒蠑ｵ繧翫・縺ゅｋ蜀咲函縺悟庄閭ｽ縺ｫ縲・ },
            { title: "繝・ぅ繝ｼ繧ｿ繝ｼA繝斐Λ繝ｼ蝓九ａ霎ｼ縺ｿ", price: "46200縲・, description: "蜿榊ｰ・ｒ謚代∴繧ｯ繝ｪ繧｢縺ｪ髻ｳ蜒上∈. 繧ｯ繝ｼ繝ｫ縺ｪ繧､繝ｳ繝・Μ繧｢繧ょｮ溽樟縲・ }
          ],
          notes: [
            "繝・ぅ繝ｼ繧ｿ繝ｼ縺ｯ邏疲ｭ｣菴咲ｽｮ縺ｸ縺ｮ蜿悶ｊ莉倥￠縲√ｂ縺励￥縺ｯ繝繝・す繝･繝懊・繝峨∈縺ｮ謐ｮ縺育ｽｮ縺榊叙繧贋ｻ倥￠縺ｨ縺ｪ繧翫∪縺吶・,
            "繝峨い繧ｹ繝斐・繧ｫ繝ｼ縺ｯ繧､繝ｳ繝翫・蜿悶ｊ莉倥￠縺ｧ縺吶・,
            "菴懈･ｭ縺ｯ1譌･縺企舌°繧翫＠縺ｾ縺吶′辟｡譁吩ｻ｣霆翫ｒ縺皮畑諢上＠縺ｦ縺・∪縺吶・縺ｧ縺泌茜逕ｨ縺上□縺輔＞縲・
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
    category: "菴朱浹繧貞ｼｷ蛹悶＠縺溘＞譁ｹ縺ｸ",
    type: 'audio',
    description: "菴朱浹縺檎黄雜ｳ繧翫↑縺・∬ｿｫ蜉帙′谺ｲ縺励＞窶ｦ\n**繧ｵ繝悶え繝ｼ繝輔ぃ繝ｼ縺ｮ霑ｽ蜉**縺ｧ縲・浹讌ｽ縺ｮ蝨溷床縺ｨ縺ｪ繧・*蜴壹∩縺ｨ霑ｫ蜉・*繧偵・繝ｩ繧ｹ縺励∪縺吶・n\n縺雁･ｽ縺ｿ縺ｫ蜷医ｏ縺帙◆繧ｷ繧ｹ繝・Β繧偵＃謠先｡医＠縺ｾ縺吶・,
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "縺頑焔霆ｽ菴朱浹蠅怜ｼｷ繧ｻ繝・ヨ",
        price: "42000",
        features: ["繧ｷ繝ｼ繝井ｸ玖ｨｭ鄂ｮ蜿ｯ", "繧｢繝ｳ繝怜・阡ｵ繧ｿ繧､繝・, "蜿紋ｻ伜ｷ･雉・ｾｼ"],
        badge: "繝代Ρ繝ｼ繝峨え繝ｼ繝上・",
        image: "/images/Top/speaker.webp",
        description: "縺頑焔霆ｽ菴朱浹蠅怜ｼｷ繧ｻ繝・ヨ\n蟒ｺ迚ｩ縺ｨ蜷後§繧医≧縺ｫ縲・浹讌ｽ縺ｫ繧ょ渕遉弱→縺ｪ繧倶ｽ主沺縺ｯ縺ｨ縺ｦ繧る㍾隕√〒縺吶ゅ＠縺｣縺九ｊ縺ｨ縺励◆菴朱浹(繧ｦ繝ｼ繝上・)縺ｯ髻ｳ讌ｽ縺ｫ閾ｨ蝣ｴ諢溘ｒ荳弱∴縺ｦ縺上ｌ縺ｾ縺吶ゅ％縺薙〒縺皮ｴｹ莉九☆繧九え繝ｼ繝上・縺ｯ繧｢繝ｳ繝怜・阡ｵ繧ｿ繧､繝励・繝代Ρ繝ｼ繝峨え繝ｼ繝上・・医メ繝･繝ｼ繝ｳ繧｢繝・・繧ｦ繝ｼ繝上・・峨ゅす繝ｼ繝井ｸ九↓蜿弱∪繧九ｈ縺・↑繧ｳ繝ｳ繝代け繝医↑繧ｦ繝ｼ繝上・縺九ｉ繝代Ρ繝ｼ繝峨ち繧､繝励→縺ｯ諤昴∴縺ｪ縺・悽譬ｼ逧・↑繧ｵ繧ｦ繝ｳ繝峨・繧ｦ繝ｼ繝上・縺ｾ縺ｧ蜿悶ｊ莉倥￠霎ｼ縺ｿ縺ｧ縺疲署譯医＠縺ｦ縺・∪縺吶・,
        packageDetails: {
          standardPrice: "55000",
          savings: "13000",
          contents: [
            { title: "繝代Ρ繝ｼ繝峨え繝ｼ繝上・", description: "繧｢繝ｳ繝怜・阡ｵ蝙九し繝悶え繝ｼ繝輔ぃ繝ｼ繝ｦ繝九ャ繝・, icon: "Speaker" },
            { title: "驟咲ｷ壻ｸ蠑・, description: "蠢・ｦ√↑髮ｻ貅舌こ繝ｼ繝悶Ν繝ｻ菫｡蜿ｷ繧ｱ繝ｼ繝悶Ν荳蠑・, icon: "Zap" },
            { title: "繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ蟾･雉・, description: "繝励Ο縺ｫ繧医ｋ遒ｺ螳溘↑驟咲ｷ壹・蜿紋ｻ倅ｽ懈･ｭ", icon: "Wrench" }
          ],
          notes: [
            "霆顔ｨｮ繧・ｻ墓ｧ倥↓繧医ｊ繝代ャ繧ｱ繝ｼ繧ｸ萓｡譬ｼ縺ｫ霑ｽ蜉縺悟ｿ・ｦ√↑蝣ｴ蜷医′縺ゅｊ縺ｾ縺吶・,
            "菴懈･ｭ縺ｯ1譌･縺願ｻ翫ｒ縺企舌°繧翫＠縺ｾ縺吶′辟｡譁吩ｻ｣霆翫ｒ縺皮畑諢上＠縺ｦ縺・∪縺吶・縺ｧ縺泌茜逕ｨ縺上□縺輔＞縲・
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
          { name: "audison (105繧ｻ繝・ヨ)", price: "100000", image: "https://picsum.photos/seed/audison105/200/200" },
          { name: "KICKER HYDEAWAY (108繧ｻ繝・ヨ)", price: "108000", image: "https://picsum.photos/seed/hydeaway/200/200" }
        ]
      },
      {
        name: "縺頑焔霆ｽ菴朱浹蠅怜ｼｷ繧ｻ繝・ヨ窶昴・繝ｩ繧ｹ窶・,
        price: "110000",
        features: ["BOX+繧ｦ繝ｼ繝上・", "蛻･菴薙い繝ｳ繝・],
        badge: "譛ｬ譬ｼ菴朱浹",
        image: "/images/subwoofer-plus.png",
        description: "繧ｦ繝ｼ繝上・・毅OX縺ｫ蛻･菴薙い繝ｳ繝励ｒ邨・∩蜷医ｏ縺帙∪縺兔n縺頑焔霆ｽ菴朱浹蠅怜ｼｷ繧ｻ繝・ヨ縺ｯ繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙ヱ繝・こ繝ｼ繧ｸ縺ｨ蜷後§縺丞､ｧ莠ｺ豌励・繝代ャ繧ｱ繝ｼ繧ｸ縺ｧ縺吶よ焔霆ｽ縺ｫ霑ｽ蜉縺ｧ縺阪ｋ繝代Ρ繝ｼ繝峨え繝ｼ繝上・縺ｯ繧ｷ繝ｼ繝井ｸ九↑縺ｩ縺ｮ遨ｺ縺阪せ繝壹・繧ｹ繧剃ｸ頑焔縺乗ｴｻ逕ｨ縺吶ｋ縺薙→縺ｧ髻ｳ讌ｽ陦ｨ迴ｾ繧剃ｸ豁ｩ繧ｰ繝ｬ繝ｼ繝峨い繝・・縺励※縺上ｌ縺ｾ縺吶ゅ％縺薙〒邏ｹ莉九☆繧九♀謇玖ｻｽ菴朱浹蠅怜ｼｷ繧ｻ繝・ヨ窶昴・繝ｩ繧ｹ窶昴〒縺ｯ縲√ヱ繝ｯ繝ｼ繝峨え繝ｼ繝上・縺ｧ縺ｯ縺ｪ縺上い繝ｳ繝励→繧ｦ繝ｼ繝上・繧貞挨縲・↓繧ｻ繝・ヨ繧｢繝・・縺吶ｋ縺薙→縺ｧ繧ゅ≧荳豁ｩ譛ｬ譬ｼ逧・↑菴朱浹菴馴ｨ薙ｒ螳溽樟縺励∪縺吶・,
        link: "https://www.soundang.com/amp&swpac.html",
        packageDetails: {
          standardPrice: "110000",
          savings: "22000",
          contents: [
            { title: "BOX+繧ｦ繝ｼ繝上・縺ｮ繧ｻ繝・ヨ繝｢繝・Ν", description: "蟆ら畑險ｭ險医・繧ｦ繝ｼ繝輔ぃ繝ｼ繝懊ャ繧ｯ繧ｹ縺ｨ繝ｦ繝九ャ繝医・繧ｻ繝・ヨ", icon: "Speaker" },
            { title: "繧ｦ繝ｼ繝上・逕ｨ繝代Ρ繝ｼ繧｢繝ｳ繝・, description: "繧ｦ繝ｼ繝輔ぃ繝ｼ繧貞ｼｷ蜉帙↓鬧・虚縺吶ｋ蟆ら畑螟夜Κ繧｢繝ｳ繝・, icon: "Zap" },
            { title: "髮ｻ貅舌こ繝ｼ繝悶Ν", description: "8AWG縺ｾ縺溘・12AWG鬮伜刀雉ｪ髮ｻ貅舌こ繝ｼ繝悶Ν・域ｩ溽ｨｮ縺ｫ繧医ｋ・・, icon: "Zap" },
            { title: "菫｡蜿ｷ蜈･蜉・, description: "繝倥ャ繝峨Θ繝九ャ繝医↓蠢懊§縺滓怙驕ｩ縺ｪ蜈･蜉幃・邱・, icon: "Layers" },
            { title: "繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ蟾･雉・, description: "繝励Ο縺ｫ繧医ｋ遒ｺ螳溘↑驟咲ｷ壹・險ｭ鄂ｮ菴懈･ｭ", icon: "Wrench" }
          ],
          notes: [
            "霆顔ｨｮ繧・ｻ墓ｧ倥↓繧医ｊ繝代ャ繧ｱ繝ｼ繧ｸ萓｡譬ｼ縺ｫ霑ｽ蜉縺悟ｿ・ｦ√↑蝣ｴ蜷医′縺ゅｊ縺ｾ縺吶・,
            "髮ｻ貅舌こ繝ｼ繝悶Ν縺ｯ讖溽ｨｮ縺ｫ繧医ｊ8AWG縺ｾ縺溘・12AWG繧剃ｽｿ逕ｨ縺励∪縺吶・,
            "繧｢繝ｳ繝励ｄBOX縺ｮ險ｭ鄂ｮ縺ｫ繝懊・繝芽｣ｽ菴懊′蠢・ｦ√↑蝣ｴ蜷医・蛻･騾・,500蜀・懈価繧翫∪縺吶・,
            "繧｢繝ｳ繝励・諤ｧ閭ｽ繧貞・縺怜・繧九◆繧√↓繝懊ョ繧｣繧｢繝ｼ繧ｹ譁ｽ蟾･繧定｡後＞縺ｾ縺吶・,
            "菴懈･ｭ縺ｯ・第律縺願ｻ翫ｒ縺企舌°繧翫＠縺ｾ縺吶′辟｡譁吩ｻ｣霆翫ｒ縺皮畑諢上＠縺ｦ縺・∪縺吶・縺ｧ縺泌茜逕ｨ縺上□縺輔＞縲・
          ]
        },
        lineup: [
          { name: "GLADEN MOSCONI (88繧ｻ繝・ヨ)", price: "88000", image: "https://picsum.photos/seed/gladen/200/200" },
          { name: "carrozzeria (98繧ｻ繝・ヨ)", price: "98000", image: "https://picsum.photos/seed/carrozzeria-plus/200/200" },
          { name: "VIBE British Audio (108繧ｻ繝・ヨ)", price: "108000", image: "https://picsum.photos/seed/vibe/200/200" },
          { name: "Kicker (128繧ｻ繝・ヨ)", price: "128000", image: "https://picsum.photos/seed/kicker-plus1/200/200" },
          { name: "Rockford Fosgate (148繧ｻ繝・ヨ)", price: "148000", image: "https://picsum.photos/seed/rockford-plus1/200/200" },
          { name: "AUDISON (168繧ｻ繝・ヨ)", price: "168000", image: "https://picsum.photos/seed/audison-plus/200/200" },
          { name: "Kicker (198繧ｻ繝・ヨ)", price: "198000", image: "https://picsum.photos/seed/kicker-plus2/200/200" },
          { name: "Rockford Fosgate (240繧ｻ繝・ヨ)", price: "240000", image: "https://picsum.photos/seed/rockford-plus2/200/200" }
        ]
      }
    ]
  },
  {
    id: 'dsp_control',
    category: "髻ｳ繧呈紛縺医◆縺・・閾ｨ蝣ｴ諢溘ｒ蜃ｺ縺励◆縺・婿縺ｸ",
    type: 'audio',
    description: "髻ｳ縺後ヰ繝ｩ繝舌Λ縺ｫ閨槭％縺医ｋ縲∝ｮ壻ｽ阪′縺ｯ縺｣縺阪ｊ縺励↑縺・ｦ\n**DSP・医ョ繧ｸ繧ｿ繝ｫ繝励Ο繧ｻ繝・し繝ｼ・・*縺ｧ髻ｳ縺ｮ繧ｿ繧､繝溘Φ繧ｰ繧堤ｷｻ蟇・↓陬懈ｭ｣縲・n\n繝繝・す繝･繝懊・繝我ｸ翫↓繧｢繝ｼ繝・ぅ繧ｹ繝医′豬ｮ縺九・荳翫′繧九ｈ縺・↑**髻ｳ蜒・*繧貞卸繧翫∪縺吶・,
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "繧｢繝ｳ繝怜・阡ｵDSP繝代ャ繧ｱ繝ｼ繧ｸ",
        price: "110000",
        features: ["邏疲ｭ｣繝翫ン騾｣蜍・, "繧ｿ繧､繝繧｢繝ｩ繧､繝｡繝ｳ繝郁ｪｿ謨ｴ", "鬮倬浹雉ｪ繧｢繝ｳ繝怜・阡ｵ"],
        badge: "髻ｳ蜒丞ｮ壻ｽ・,
        image: "https://picsum.photos/seed/amp-dsp/800/600",
        description: "莉翫・繝翫ン縺ｯ縺昴・縺ｾ縺ｾ縺ｫ髻ｳ雉ｪ繧偵げ繝ｬ繝ｼ繝峨い繝・・縺輔○繧九％縺ｨ縺後〒縺阪ｋ縺ｮ縺後後い繝ｳ繝怜・阡ｵ繧ｿ繧､繝励・DSP縲阪〒縺吶・n\n縲舌％繧薙↑譁ｹ縺ｫ縺翫☆縺吶ａ縲曾n繝ｻ莉翫≠繧九リ繝薙ｄ繝倥ャ繝峨Θ繝九ャ繝医ｒ譖ｿ縺医★縺ｫ髻ｳ雉ｪ繧｢繝・・縺励◆縺・ｼ―n繝ｻ螟ｧ逕ｻ髱｢繝翫ン繧定ｳｼ蜈･縺励◆縺・￠縺ｩ縲√◎縺ｮ繝翫ン縺ｮ髻ｳ雉ｪ縺ｫ荳肴ｺ窶ｦ\n繝ｻ繝輔Ο繝ｳ繝・WAY繧ｷ繧ｹ繝・Β繧呈焔霆ｽ縺ｫ蟋九ａ縺溘＞・―n繝ｻ繝輔Ο繝ｳ繝医・繝ｫ繝∵磁邯壹↓縺励◆縺・￠縺ｩ繝ｪ繧｢繧ｹ繝斐・繧ｫ繝ｼ繧ゆｽｿ縺・◆縺・ｦ\n\n迚ｹ蛻･縺ｪ謫堺ｽ懊・蠢・ｦ√≠繧翫∪縺帙ｓ縲ゆｻ翫∪縺ｧ騾壹ｊ縺贋ｽｿ縺・＞縺溘□縺代∪縺吶′縲∫岼縺ｮ蜑阪↓閾ｨ蝣ｴ諢溯ｱ翫°縺ｪ繧ｹ繝・・繧ｸ縺悟・迴ｾ縺励◆縺九・繧医≧縺ｪ繧ｵ繧ｦ繝ｳ繝峨↓逕溘∪繧悟､峨ｏ繧翫∪縺吶ゅワ繧､繧ｨ繝ｳ繝峨が繝ｼ繝・ぅ繧ｪ讖溘↓蛹ｹ謨ｵ縺吶ｋ縺ｻ縺ｩ縺ｮ邱ｻ蟇・↑隱ｿ謨ｴ讖溯・繧貞ｙ縺医※縺・∪縺吶・,
        link: "https://www.soundang.com/ampDSP.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "110000",
          savings: "0",
          contents: [
            { title: "髮ｻ貅舌こ繝ｼ繝悶Ν", description: "繝舌ャ繝・Μ繝ｼ縺九ｉ逶ｴ謗･髮ｻ貅舌ｒ蜿悶ｊ蜃ｺ縺吶Ρ繧､繝､繝ｪ繝ｳ繧ｰ・医・繝ｩ繧ｹ繝ｻ繝槭う繝翫せ・・, icon: "Zap" },
            { title: "繝偵Η繝ｼ繧ｺ繝帙Ν繝繝ｼ繝ｻ繝偵Η繝ｼ繧ｺ", description: "螳牙・諤ｧ繧堤｢ｺ菫昴☆繧九◆繧√・菫晁ｭｷ蝗櫁ｷｯ", icon: "Activity" },
            { title: "蜈･蜃ｺ蜉帑ｿ｡蜿ｷ繧ｱ繝ｼ繝悶Ν", description: "蜈･蜉帑ｿ｡蜿ｷ逕ｨ縺翫ｈ縺ｳ蜃ｺ蜉帷畑繧ｹ繝斐・繧ｫ繝ｼ繧ｱ繝ｼ繝悶Ν荳蠑・, icon: "Layers" },
            { title: "繧､繝ｳ繧ｹ繝医・繝ｫ繝ｻ繝√Η繝ｼ繝九Φ繧ｰ", description: "繝励Ο縺ｫ繧医ｋ邊ｾ蟇・↑險ｭ鄂ｮ縺ｨ繧ｵ繧ｦ繝ｳ繝峨メ繝･繝ｼ繝九Φ繧ｰ雋ｻ逕ｨ霎ｼ", icon: "Wrench" }
          ],
          notes: [
            "蝠・刀莉｣驥代・繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ蟾･雉・・繧ｱ繝ｼ繝悶Ν莉｣繝ｻ隱ｿ謨ｴ莉｣繧貞性繧√◆繝代ャ繧ｱ繝ｼ繧ｸ萓｡譬ｼ縺ｧ縺吶・,
            "繝峨い騾夂ｷ壹↑縺ｩ縺悟ｿ・ｦ√↑霆贋ｸ｡縺ｯ蛻･騾碑ｿｽ蜉縺悟ｿ・ｦ√↑蝣ｴ蜷医′縺ゅｊ縺ｾ縺吶・,
            "譛ｬ菴薙・蜿悶ｊ莉倥￠菴咲ｽｮ繧・ヰ繝・ユ繝ｪ繝ｼ縺ｮ菴咲ｽｮ縺ｫ繧医▲縺ｦ霑ｽ蜉雋ｻ逕ｨ・育ｴ・,500蜀・懶ｼ峨′逋ｺ逕溘☆繧句ｴ蜷医′縺ゅｊ縺ｾ縺吶・,
            "邏疲ｭ｣繝槭Ν繝√す繧ｹ繝・Β遲峨〒縺ｯ繝√Ε繝ｳ繝阪Ν蜷域・讖溯・・医し繝溘Φ繧ｰ・峨・遒ｺ隱阪′蠢・ｦ√〒縺吶・,
            "菴懈･ｭ譎る俣縺ｯ縺ｻ縺ｨ繧薙←縺ｮ蝣ｴ蜷・譌･縺ｧ縺吶ら┌譁吩ｻ｣霆翫ｒ縺皮畑諢上＠縺ｦ縺・∪縺吶・
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
    category: "髻ｳ縺ｮ繝代Ρ繝ｼ繝ｻ隗｣蜒丞ｺｦ繧剃ｸ翫￡縺溘＞譁ｹ縺ｸ",
    type: 'audio',
    description: "髻ｳ縺檎掠縺帙※縺・ｋ縲√ｂ縺｣縺ｨ繝代Ρ繝ｼ縺梧ｬｲ縺励＞窶ｦ\n**螟夜Κ繧｢繝ｳ繝・*繧貞ｰ主・縺励√せ繝斐・繧ｫ繝ｼ繧貞ｼｷ蜉帙↓鬧・虚縲・n\n郢顔ｴｰ縺ｪ髻ｳ縺九ｉ繝繧､繝翫Α繝・け縺ｪ髻ｳ縺ｾ縺ｧ縲・*菴呵｣輔ｒ謖√▲縺ｦ蜀咲函**縺励∪縺吶・,
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "繧｢繝ｳ繝励う繝ｳ繧ｹ繝医・繝ｼ繧ｷ繝・け",
        price: "55000",
        features: ["4ch繝代Ρ繝ｼ繧｢繝ｳ繝・, "鬮倬浹雉ｪ驟咲ｷ・, "蜿紋ｻ伜ｷ･雉・ｾｼ繝代ャ繧ｱ繝ｼ繧ｸ"],
        badge: "鬧・虚蜉婉P",
        image: "https://picsum.photos/seed/amp/800/600",
        description: "縲後せ繝斐・繧ｫ繝ｼ繧貞､峨∴縺溘￠縺ｩ縲√ｂ縺｣縺ｨ濶ｯ縺上＠縺溘＞縲阪碁浹縺ｫ蜉帛ｼｷ縺輔′谺ｲ縺励＞縲阪◎繧薙↑譁ｹ縺ｫ谺｡縺ｫ縺雁匡繧√☆繧九・縺後ヱ繝ｯ繝ｼ繧｢繝ｳ繝励・霑ｽ蜉縺ｧ縺吶・n\n繝代Ρ繝ｼ繧｢繝ｳ繝励・蠖ｹ蜑ｲ縺ｯ縲√せ繝斐・繧ｫ繝ｼ繧偵＠縺｣縺九ｊ縺ｨ繧ｳ繝ｳ繝医Ο繝ｼ繝ｫ縺励Μ繝九い縺ｪ繧ｵ繧ｦ繝ｳ繝峨ｒ蜀咲函縺吶ｋ縺薙→縺ｧ縺吶ゅ◎繧後↓繧医ｊ蠕ｮ邏ｰ縺ｪ蜀咲樟蜉帙′蠅怜刈縺励∵ュ蝣ｱ驥上′繧｢繝・・縺励∪縺吶る浹蜒上・霈ｪ驛ｭ繧・ｩｺ豌玲─縲∝･･陦後″繧・浹縺ｮ繝上Μ縲√せ繝斐・繝画─縺悟括逧・↓謾ｹ蝟・＆繧後∪縺吶・n\n螟ｧ髻ｳ驥上〒魑ｴ繧峨☆縺溘ａ縺縺代〒縺ｯ縺ｪ縺上・壼ｸｸ縺ｮ繝峨Λ繧､繝悶〒縺・＞髻ｳ讌ｽ繧呈･ｽ縺励・縺溘ａ縺ｫ繧｢繝ｳ繝励ｒ謳ｭ霈峨☆繧九％縺ｨ縺ｯ縲√＆繧峨↑繧玖・蝣ｴ諢溘・迯ｲ蠕励∽ｻ翫∪縺ｧ諢溘§縺ｦ縺・◆逶ｮ縺ｮ蜑阪・髴ｧ縺梧匐繧後ｋ繧医≧縺ｪ繧ｵ繧ｦ繝ｳ繝峨ｒ蠕励ｋ縺溘ａ縺ｫ髱槫ｸｸ縺ｫ譛牙柑縺ｧ縺吶ゅヶ繝ｩ繝ｳ繝峨ｄ繝｢繝・Ν縺ｫ繧医▲縺ｦ繧る浹菴懊ｊ縺ｮ迢吶＞縺檎焚縺ｪ繧翫∵ｧ倥・↑螟牙喧繧呈･ｽ縺励ａ繧九・繧るｭ・鴨縺ｧ縺吶・,
        link: "https://www.soundang.com/ampbasic-inst.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "55000",
          savings: "0",
          contents: [
            { title: "繝代Ρ繝ｼ繧｢繝ｳ繝玲悽菴・, description: "縺雁･ｽ縺ｿ縺ｮ繝悶Λ繝ｳ繝峨°繧蛾∈謚槫庄閭ｽ・亥ｷｮ鬘榊ｯｾ蠢懊≠繧奇ｼ・, icon: "Zap" },
            { title: "髮ｻ貅舌こ繝ｼ繝悶Ν荳蠑・, description: "繝舌ャ繝・Μ繝ｼ逶ｴ謗･驟咲ｷ壹√Γ繧､繝ｳ繝偵Η繝ｼ繧ｺ縲√Μ繝｢繝ｼ繝育ｷ夂ｭ・, icon: "Activity" },
            { title: "髻ｳ螢ｰ蜈･蜃ｺ蜉帙こ繝ｼ繝悶Ν", description: "RCA縺ｾ縺溘・繧ｹ繝斐・繧ｫ繝ｼ蜈･蜉帙√せ繝斐・繧ｫ繝ｼ蜃ｺ蜉帷畑驟咲ｷ・, icon: "Music" },
            { title: "蜿紋ｻ倥・繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ", description: "繧｢繝ｳ繝苓ｨｭ鄂ｮ繝懊・繝芽｣ｽ菴懊∝・陬・┳逹縲・・邱壼ｼ輔″蝗槭＠蟾･雉・ｾｼ", icon: "Wrench" }
          ],
          notes: [
            "霆顔ｨｮ縺ｫ繧医ｊ霑ｽ蜉雋ｻ逕ｨ縺悟ｿ・ｦ√↑蝣ｴ蜷医′縺ゅｊ縺ｾ縺吶・,
            "繝倥ャ繝峨Θ繝九ャ繝医↓RCA蜃ｺ蜉帙′縺ｪ縺・ｴ蜷医・縲√ワ繧､繝ｬ繝吶Ν蜈･蜉帛ｯｾ蠢懊い繝ｳ繝励・菴ｿ逕ｨ繧・ワ繧､繝ｭ繝ｼ繧ｳ繝ｳ繝舌・繧ｿ繝ｼ縺ｮ霑ｽ蜉縺悟庄閭ｽ縺ｧ縺吶・,
            "縺薙・繝代ャ繧ｱ繝ｼ繧ｸ縺ｯ迴ｾ驥代〒縺ｮ縺頑髪謇輔＞縺ｨ縺ｪ繧翫∪縺吶りｩｳ縺励￥縺ｯ縺雁撫縺・粋繧上○縺上□縺輔＞縲・,
            "菴懈･ｭ縺ｯ1縲・譌･縺企舌°繧翫→縺ｪ繧翫∪縺吶ら┌譁吩ｻ｣霆翫ｒ縺皮畑諢上＠縺ｦ縺・∪縺吶・
          ]
        },
        lineup: [
          { name: "ZAPCO / HELIX / KICKER 遲・, description: "荳也阜逧・↑螳夂分繝悶Λ繝ｳ繝峨ょ鴨蠑ｷ縺乗ｭ｣遒ｺ縺ｪ繝峨Λ繧､繝悶′鬲・鴨縲・ },
          { name: "ATOMO2 / ETON POWER220.4", description: "蟆丞梛縺ｪ縺後ｉ鬮倬浹雉ｪ縲りｨｭ鄂ｮ蝣ｴ謇繧帝∈縺ｰ縺ｪ縺・怙譁ｰ繝｢繝・Ν縲・ },
          { name: "PRS-D800 / ARCA ATOMO4", description: "隗｣蜒丞ｺｦ驥崎ｦ悶・蝗ｽ逕｣繝ｻ豬ｷ螟悶ヶ繝ｩ繝ｳ繝峨らｹ顔ｴｰ縺ｪ陦ｨ迴ｾ蜉帙・ },
          { name: "MOSCONI GLADEN PRO / DLS", description: "繝上う繧ｨ繝ｳ繝峨↑雉ｪ諢溘る浹讌ｽ諤ｧ繧帝㍾隕悶☆繧区婿縺ｸ縲・ }
        ]
      },
      {
        name: "逵√せ繝壹・繧ｹ窶晏ｰ丞梛窶昴ヱ繝ｯ繝ｼ繧｢繝ｳ繝励ヱ繝・こ繝ｼ繧ｸ",
        price: "33000",
        features: ["繧ｳ繝ｳ繝代け繝郁ｨｭ鄂ｮ", "逵・崕蜉幄ｨｭ險・, "蜿紋ｻ伜ｷ･雉・ｾｼ繝代ャ繧ｱ繝ｼ繧ｸ"],
        badge: "繧ｹ繝槭・繝亥ｰ主・",
        image: "https://picsum.photos/seed/miniamp/800/600",
        description: "譛霑代・蟆丞梛逵√お繝阪↑縺後ｉ鬮倬浹雉ｪ縺ｪ繝代Ρ繝ｼ繧｢繝ｳ繝励′謨ｰ縲・匳蝣ｴ縺励※縺阪∪縺励◆縲ゅヱ繝ｯ繝ｼ繧｢繝ｳ繝励・蜿悶ｊ莉倥￠縺ｫ縺ｯ蜿悶ｊ莉倥￠繧ｹ繝壹・繧ｹ縺ｨ豸郁ｲｻ髮ｻ蜉帙い繝・・縺ｪ縺ｩ縺ｮ蝠城｡後′邨｡繧薙〒縺阪∪縺吶・n\n縺ｨ縺上↓霑大ｹｴ縺ｯ蜈・崕蛻ｶ蠕｡縺輔ｌ縺溯ｻ贋ｸ｡縺悟､壹￥縲∵昴▲縺溘⊇縺ｩ繝舌ャ繝・Μ繝ｼ縺ｮ繝ｪ繧ｫ繝舌Μ繝ｼ縺後せ繝繝ｼ繧ｺ縺ｫ縺輔ｌ縺ｪ縺・ｴ蜷医ｂ縺ゅｊ縲√ヰ繝・ユ繝ｪ繝ｼ縺ゅ′繧翫ｒ諛ｸ蠢ｵ縺励※繝代Ρ繝ｼ繧｢繝ｳ繝怜ｰ主・繧偵◆繧√ｉ縺・Θ繝ｼ繧ｶ繝ｼ繧ょｰ代↑縺上≠繧翫∪縺帙ｓ縲ゅ％縺薙〒縺ｯ逵・崕蜉帙〒縺ｪ縺翫°縺､蟆丞梛縺ｮ鬮倬浹雉ｪ繝代Ρ繝ｼ繧｢繝ｳ繝励ｒ蜿紋ｻ倩ｾｼ縺ｿ縺ｫ縺ｦ縺疲署譯医＠縺ｾ縺吶・,
        link: "https://www.soundang.com/miniamp.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "33000",
          savings: "0",
          contents: [
            { title: "繝代Ρ繝ｼ繧｢繝ｳ繝玲悽菴・, description: "蟆丞梛繝ｻ鬮伜柑邇・↑D繧ｯ繝ｩ繧ｹ繧｢繝ｳ繝礼ｭ峨°繧蛾∈謚・, icon: "Zap" },
            { title: "繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ蟾･雉・, description: "繝舌ャ繝・Μ繝ｼ逶ｴ謗･驟咲ｷ夲ｼ医ヰ繝・峩・峨ｒ蜷ｫ繧讓呎ｺ門叙莉伜ｷ･雉・, icon: "Wrench" },
            { title: "髮ｻ貅舌い繧ｯ繧ｻ繧ｵ繝ｪ繝ｼ", description: "髮ｻ貅舌こ繝ｼ繝悶Ν縲√ヲ繝･繝ｼ繧ｺ繝帙Ν繝繝ｼ縲∫ｫｯ蟄宣｡樔ｸ蠑・, icon: "Activity" },
            { title: "菫｡蜿ｷ繝ｻ蜃ｺ蜉帙こ繝ｼ繝悶Ν", description: "RCA繧ｱ繝ｼ繝悶Ν縲√せ繝斐・繧ｫ繝ｼ繧ｱ繝ｼ繝悶Ν遲・, icon: "Music" }
          ],
          notes: [
            "繧ｹ繝斐・繧ｫ繝ｼ繧ｱ繝ｼ繝悶Ν繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ縺ｯ邏疲ｭ｣繧ｹ繝斐・繧ｫ繝ｼ縺ｮ蝣ｴ蜷医・繝翫ン陬上∪縺ｧ縲√せ繝斐・繧ｫ繝ｼ莠､謠帶ｸ医∩縺ｮ蝣ｴ蜷医・莉伜ｱ槭・繝阪ャ繝医Ρ繝ｼ繧ｯ縺ｾ縺ｧ縺ｮ繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ縺ｨ縺ｪ繧翫∪縺吶・,
            "繝峨い騾夂ｷ壹ｒ莨ｴ縺・Ρ繧､繝､繝ｪ繝ｳ繧ｰ縺悟ｿ・ｦ√↑蝣ｴ蜷医・蛻･騾・1,000蜀・′蠢・ｦ√→縺ｪ繧翫∪縺吶ゑｼ医ラ繧｢騾夂ｷ壹′繧ｫ繝励Λ繝ｼ譁ｹ蠑上・蝣ｴ蜷医・蛻･騾泌刈蟾･雉・′蠢・ｦ√→縺ｪ繧翫∪縺吶ゑｼ・,
            "霆顔ｨｮ縺ｫ繧医ｊ霑ｽ蜉繝代・繝・′蠢・ｦ√↑蝣ｴ蜷医′縺ゅｊ縺ｾ縺吶・,
            "菴懈･ｭ譎る俣縺ｯ蜊頑律縲・譌･遞句ｺｦ縺ｧ縺吶ら┌譁吩ｻ｣霆翫ｒ縺皮畑諢上＠縺ｦ縺・∪縺吶・
          ]
        },
        lineup: [
          { name: "VIBE / POWERBOX65.4M-V7", description: "雜・ｰ丞梛縺ｪ縺後ｉ繝代Ρ繝輔Ν縺ｪ4ch繧｢繝ｳ繝励・ },
          { name: "Pioneer / GM-D1400-2", description: "繧ｳ繝ｳ繧ｽ繝ｼ繝ｫ蜀・↓蜿弱∪繧九さ繝ｳ繝代け繝郁ｨｭ險医・螳夂分繝｢繝・Ν縲・ },
          { name: "MATCH / M2.1AMP", description: "繝峨う繝・｣ｽ縲ゅワ繧､繝ｬ繧ｾ蟇ｾ蠢懊・雜・ｰ丞梛2ch繧｢繝ｳ繝励・ },
          { name: "Ground Zero / GZ-MINI", description: "鬮倬浹雉ｪ縺ｨ繝代Ρ繝ｼ繧剃ｸ｡遶九＠縺溘Α繝九す繝ｪ繝ｼ繧ｺ縲・ },
          { name: "KICKER / KEY200.4", description: "閾ｪ蜍暮浹蝣ｴ陬懈ｭ｣DSP讖溯・繧貞・阡ｵ縺励◆逕ｻ譛溽噪縺ｪ蟆丞梛繧｢繝ｳ繝励・ },
          { name: "MOSCONI / ATOMO2", description: "繧､繧ｿ繝ｪ繧｢陬ｽ縲ゅ・繝・メ邂ｱ繧ｵ繧､繧ｺ縺ｮ繝上う繧ｨ繝ｳ繝峨い繝ｳ繝励・ },
          { name: "PLUG&PLAY / 1080", description: "邏疲ｭ｣繧ｪ繝ｼ繝・ぅ繧ｪ縺ｫ繧ｫ繝励Λ繝ｼ繧ｪ繝ｳ縺ｧ謗･邯壼庄閭ｽ縺ｪ繝｢繝・Ν縲・ }
        ]
      }
    ]
  },
  {
    id: 'source_headunit',
    category: "譛譁ｰ讖溯・繧定ｿｽ蜉縺励◆縺・・繧ｽ繝ｼ繧ｹ繧定憶縺上＠縺溘＞譁ｹ縺ｸ",
    type: 'audio',
    description: "讖溯・縺悟商縺・・浹貅舌・雉ｪ繧剃ｸ翫￡縺溘＞窶ｦ\n**鬮倬浹雉ｪ繝ｦ繝九ャ繝・*縺ｸ縺ｮ莠､謠帙〒縲・浹貅舌・隱ｭ縺ｿ蜿悶ｊ邊ｾ蠎ｦ繧貞髄荳翫・n\n**荳願ｳｪ縺ｪ菫｡蜿ｷ**繧偵す繧ｹ繝・Β蜈ｨ菴薙↓騾√ｊ蜃ｺ縺励∪縺吶・,
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ縺ｮ鬆らせ縲舌し繧､繝舌・繝翫ン縲代〒讌ｽ縺励・・・,
        price: "220000",
        features: ["譛鬮伜ｳｰ縺ｮ髻ｳ雉ｪ", "繝阪ャ繝医Ρ繝ｼ繧ｯ讖溯・", "繧ｨ繝ｳ繧ｿ繝｡騾ｲ蛹・],
        badge: "遨ｶ讌ｵ縺ｮ繧ｽ繝ｼ繧ｹ",
        image: "https://picsum.photos/seed/cyber-navi/800/600",
        description: "LTE蝗樒ｷ壹↓繧医ｋ鬮倬溘う繝ｳ繧ｿ繝ｼ繝阪ャ繝医ｒ陬・ｙ縺励◆繧ｫ繝ｼ繝翫ン縲√き繝ｭ繝・ヤ繧ｧ繝ｪ繧｢縲後し繧､繝舌・繝翫ン縲阪す繝ｪ繝ｼ繧ｺ縲ゅ＞縺ｾ縺ｾ縺ｧ縺ｫ縺ｪ縺九▲縺滓眠縺溘↑鬆伜沺縺ｸ繧ｫ繝ｼ繝翫ン縺碁ｲ蛹悶＠縺ｾ縺励◆縲・n\n繝翫ン諤ｧ閭ｽ繝ｻ髻ｳ雉ｪ繝ｻ縺輔ｉ縺ｫ谺｡荳紋ｻ｣縺ｮ繧ｨ繝ｳ繧ｿ繝ｼ繝・う繝｡繝ｳ繝域ｩ溯・繧呈焔縺ｫ蜈･繧後◆蜚ｯ荳辟｡莠後・蟄伜惠縺ｧ縺吶ょｽ灘ｺ励〒縺ｯ縲√・繝ｭ縺ｫ繧医ｋ遒ｺ螳溘↑繧､繝ｳ繧ｹ繝医・繝ｫ縺ｨ邱ｻ蟇・↑繧ｵ繧ｦ繝ｳ繝芽ｪｿ謨ｴ繧貞性繧√◆縲後し繧､繝舌・繝翫ン繝代ャ繧ｱ繝ｼ繧ｸ縲阪ｒ縺皮畑諢上＠縺ｾ縺励◆縲ゅし繧､繝舌・繝翫ン縺ｮ謖√▽逵溘・繝昴ユ繝ｳ繧ｷ繝｣繝ｫ繧呈怙螟ｧ髯舌↓蠑輔″蜃ｺ縺励∪縺吶・,
        showSavings: false,
        packageDetails: {
          standardPrice: "220000",
          savings: "0",
          contents: [
            { title: "繧ｵ繧､繝舌・繝翫ン譛ｬ菴・, description: "譛譁ｰ縺ｮ912竇｣繧ｷ繝ｪ繝ｼ繧ｺ・・C繝｢繝・Ν縺ｾ縺溘・騾壼ｸｸ繝｢繝・Ν・・, icon: "Music" },
            { title: "繝翫ン繧､繝ｳ繧ｹ繝医・繝ｫ雋ｻ逕ｨ", description: "霆贋ｸ｡縺ｸ縺ｮ遒ｺ螳溘↑險ｭ鄂ｮ縺ｨ繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ", icon: "Wrench" },
            { title: "繧ｵ繧ｦ繝ｳ繝芽ｪｿ謨ｴ", description: "繧ｵ繧､繝舌・繝翫ン縺ｮ鬮伜ｺｦ縺ｪ隱ｿ謨ｴ讖溯・繧呈ｴｻ縺九＠縺溘・繝ｭ縺ｮ繧ｻ繝・ユ繧｣繝ｳ繧ｰ", icon: "Activity" },
            { title: "繝阪ャ繝医Ρ繝ｼ繧ｯ險ｭ螳・, description: "DC繝｢繝・Ν縺ｮ蝣ｴ蜷医・騾壻ｿ｡險ｭ螳壹し繝昴・繝・, icon: "Zap" }
          ],
          notes: [
            "蛻･騾斐∬ｻ顔ｨｮ縺斐→縺ｮ蜿紋ｻ倬≡蜈ｷ繝ｻ驟咲ｷ壹く繝・ヨ縺悟ｿ・ｦ√〒縺吶・,
            "9繧､繝ｳ繝√・8繧､繝ｳ繝√Δ繝・Ν縺ｯ髮ｻ貅舌こ繝ｼ繝悶Ν縺悟酔譴ｱ縺輔ｌ縺ｦ縺・↑縺・◆繧√∝挨騾泌ｿ・ｦ√〒縺吶・,
            "繧ｹ繝斐・繧ｫ繝ｼ謗･邯壹・縲後ヵ繝ｭ繝ｳ繝医・繝ｪ繧｢謗･邯壹阪∪縺溘・縲後ヵ繝ｭ繝ｳ繝医・繝ｫ繝∵磁邯壹阪°繧蛾∈謚槫庄閭ｽ縺ｧ縺吶・,
            "驕ｩ蜷井ｸ榊庄縺ｪ霆顔ｨｮ縺ｧ繧ゅ∝刈蟾･縺ｫ繧医ｊ莉悶し繧､繧ｺ繧呈命蟾･縺ｧ縺阪ｋ蝣ｴ蜷医′縺ゅｊ縺ｾ縺吶ゅ＃逶ｸ隲・￥縺縺輔＞縲・,
            "霆顔ｨｮ縺ｫ繧医ｊ霑ｽ蜉蟾･雉・′逋ｺ逕溘☆繧句ｴ蜷医′縺ゅｊ縺ｾ縺吶・
          ]
        },
        lineup: [
          {
            name: "繧ｵ繧､繝舌・繝翫ンDC (繝阪ャ繝医Ρ繝ｼ繧ｯ繧ｹ繝・ぅ繝・け蜷梧｢ｱ)",
            price: "220000",
            description: "繧ｨ繝ｳ繧ｿ繝ｼ繝・う繝｡繝ｳ繝医ｒ讌ｽ縺励∩蟆ｽ縺上☆繝励Λ繝ｳ縲・12竇｣-DC繧ｷ繝ｪ繝ｼ繧ｺ縲りｻ雁・縺係i-Fi繧ｹ繝昴ャ繝医↓縲・,
            image: "https://picsum.photos/seed/cyber-dc/400/300"
          },
          {
            name: "繧ｵ繧､繝舌・繝翫ン (繝阪ャ繝医Ρ繝ｼ繧ｯ繧ｹ繝・ぅ繝・け繝ｬ繧ｹ)",
            price: "198000",
            description: "繝阪ャ繝医Ρ繝ｼ繧ｯ繧ｹ繝・ぅ繝・け繧堤怐縺・◆縺頑焔霆ｽ繝励Λ繝ｳ縲ょｾ後°繧峨せ繝・ぅ繝・け繧定ｿｽ蜉縺吶ｋ縺薙→繧ょ庄閭ｽ縺ｧ縺吶・,
            image: "https://picsum.photos/seed/cyber-std/400/300"
          },
          {
            name: "蟇ｾ蠢懊Δ繝・Ν・咾Q912-4DC / CL912-4DC / CW912-4DC / CZ912-4DC",
            price: "0",
            description: "9繧､繝ｳ繝√°繧・繧､繝ｳ繝√∪縺ｧ縲√♀霆翫↓譛驕ｩ縺ｪ繧ｵ繧､繧ｺ繧偵Λ繧､繝ｳ繝翫ャ繝励・,
            image: "https://picsum.photos/seed/cyber-lineup/400/300"
          }
        ]
      },
      { name: "繝倥ャ繝峨Θ繝九ャ繝・繝励Ο繧ｻ繝・し繝ｼ", price: "110000", features: ["1DIN/2DIN鬮倬浹雉ｪ讖・, "繝・ず繧ｿ繝ｫ蜃ｺ蜉・], badge: "繝斐Η繧｢繧ｪ繝ｼ繝・ぅ繧ｪ", image: "/images/speaker.jpg" }
    ]
  },
  {
    id: 'car_specific',
    category: "閾ｪ蛻・・霆翫↓譛驕ｩ縺ｪ繝励Λ繝ｳ繧堤衍繧翫◆縺・婿縺ｸ",
    type: 'audio',
    description: "閾ｪ蛻・・霆翫↓蜷医≧繧ゅ・縺後ｏ縺九ｉ縺ｪ縺・ｦ\n**霆顔ｨｮ蟆ら畑險ｭ險・*縺ｮ繝代ャ繧ｱ繝ｼ繧ｸ縺ｧ縲∝刈蟾･繧呈怙蟆城剞縺ｫ謚代∴縺､縺､**譛螟ｧ髯舌・蜉ｹ譫・*繧堤匱謠ｮ縲・n\n螳牙ｿ・・繧､繝ｳ繧ｹ繝医・繝ｫ繧偵＃謠先｡医＠縺ｾ縺吶・,
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "BMW繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙ヱ繝・こ繝ｼ繧ｸ",
        price: "77000",
        features: ["霆顔ｨｮ蟆ら畑險ｭ險・, "邏疲ｭ｣蜉蟾･縺ｪ縺・, "髻ｳ雉ｪ蜉・噪蜷台ｸ・],
        badge: "邏疲ｭ｣莠､謠・,
        image: "https://picsum.photos/seed/bmw-audio/800/600",
        description: "BMW縺ｮ髻ｳ雉ｪ縺ｫ縺頑か縺ｿ縺ｮ譁ｹ縺ｫ・。MW縺ｯ霈ｸ蜈･霆翫・荳ｭ縺ｧ繝繝ｳ繝医ヤ縺ｫ謾ｹ蝟・・縺皮嶌隲・′螟壹＞繝悶Λ繝ｳ繝峨〒縺吶・n\n螟壹￥縺ｮ繧ｰ繝ｬ繝ｼ繝峨〒繝輔Ο繝ｳ繝医せ繝斐・繧ｫ繝ｼ縺・0cm遞句ｺｦ縺ｨ蟆上＆縺上・ｫ倬浹逕ｨ縺ｮ繝・ぅ繝ｼ繧ｿ繝ｼ縺碁撼陬・捩縲√す繝ｼ繝井ｸ九・繧ｦ繝ｼ繝上・縺ｧ菴朱浹繧定｣懊≧繧ｷ繧ｹ繝・Β縺ｫ縺ｪ縺｣縺ｦ縺・∪縺吶ゅ％縺ｮ縺溘ａ縲・浹縺後％繧ゅｊ縺後■縺ｧ繝｡繝ｪ繝上Μ縺瑚ｶｳ繧翫↑縺・→諢溘§繧九が繝ｼ繝翫・讒倥′螟壹＞縺ｮ縺檎樟迥ｶ縺ｧ縺吶・n\n蜉蟾･繧呈椛縺医∝ｮ我ｾ｡縺九▽蜉ｹ譫懃噪縺ｫ髻ｳ雉ｪ謾ｹ蝟・☆繧区婿豕輔→縺励※縲後ヨ繝ｬ繝ｼ繝峨う繝ｳ繧ｹ繝斐・繧ｫ繝ｼ縲阪∈縺ｮ莠､謠帙ｒ縺疲署譯医＠縺ｾ縺吶ゅヤ繧｣繝ｼ繧ｿ繝ｼ縺ｮ霑ｽ蜉繧・す繝ｼ繝井ｸ九え繝ｼ繝上・縺ｮ莠､謠帙↓繧医ｊ縲。MW譛ｬ譚･縺ｮ襍ｰ繧翫↓隕句粋縺・ワ繝ｪ縺ｮ縺ゅｋ繧ｵ繧ｦ繝ｳ繝峨∈縺ｨ逕溘∪繧悟､峨ｏ繧翫∪縺吶・,
        showSavings: false,
        packageDetails: {
          standardPrice: "77000",
          savings: "0",
          contents: [
            { title: "繝医Ξ繝ｼ繝峨う繝ｳ繧ｹ繝斐・繧ｫ繝ｼ", description: "BMW蟆ら畑險ｭ險医・繝懊Ν繝医が繝ｳ莠､謠帙せ繝斐・繧ｫ繝ｼ", icon: "Speaker" },
            { title: "繧､繝ｳ繧ｹ繝医・繝ｫ雋ｻ逕ｨ", description: "蜀・ｼｵ繧願┳逹縲√せ繝斐・繧ｫ繝ｼ蝗ｺ螳壹・・邱壼・逅・, icon: "Wrench" },
            { title: "繝峨い繝√Η繝ｼ繝九Φ繧ｰ", description: "繧ｹ繝斐・繧ｫ繝ｼ縺ｮ諤ｧ閭ｽ繧貞ｼ輔″蜃ｺ縺吝宛謖ｯ繝ｻ蜷ｸ髻ｳ蜃ｦ逅・, icon: "Activity" },
            { title: "繧ｵ繧ｦ繝ｳ繝峨メ繧ｧ繝・け", description: "菴咲嶌遒ｺ隱阪♀繧医・邁｡譏馴浹髻ｿ貂ｬ螳壹・隱ｿ謨ｴ", icon: "Zap" }
          ],
          notes: [
            "邏疲ｭ｣繝・ぅ繝ｼ繧ｿ繝ｼ髱櫁｣・捩霆翫・蝣ｴ蜷医∝挨騾皮ｴ疲ｭ｣繝・ぅ繝ｼ繧ｿ繝ｼ繧ｫ繝舌・遲峨′蠢・ｦ√↓縺ｪ繧句ｴ蜷医′縺ゅｊ縺ｾ縺呻ｼ育ｴ・5,000蜀・燕蠕鯉ｼ峨・,
            "繧ｷ繝ｼ繝井ｸ九え繝ｼ繝上・縺ｮ莠､謠帙ｂ蜿ｯ閭ｽ縺ｧ縺吶・ﾎｩ/4ﾎｩ繝｢繝・Ν縺ｮ驕ｸ謚槭′蠢・ｦ√↑蝣ｴ蜷医′縺ゅｊ縺ｾ縺吶・,
            "霆顔ｨｮ繧・げ繝ｬ繝ｼ繝峨↓繧医ｊ驕ｩ蜷医′逡ｰ縺ｪ繧翫∪縺吶りｻ頑､懆ｨｼ遲峨〒豁｣遒ｺ縺ｪ驕ｩ蜷医ｒ遒ｺ隱阪＞縺溘＠縺ｾ縺吶・,
            "菴懈･ｭ譎る俣縺ｯ繝輔Ο繝ｳ繝医せ繝斐・繧ｫ繝ｼ莠､謠帙〒邏・縲・譎る俣遞句ｺｦ縺ｧ縺吶ゆｻ｣霆翫ｂ縺泌茜逕ｨ縺・◆縺縺代∪縺吶・,
            "繧ｻ繝ｳ繧ｿ繝ｼ繧ｹ繝斐・繧ｫ繝ｼ繧・Μ繧｢繧ｹ繝斐・繧ｫ繝ｼ縺ｮ莠､謠帙ｂ謇ｿ縺｣縺ｦ縺翫ｊ縺ｾ縺吶・
          ]
        },
        lineup: [
          {
            name: "Focal IS BMW 100L (2WAY)",
            price: "93500",
            description: "繝輔Λ繝ｳ繧ｹ縺ｮ蜷埼摩Focal縲らｹ顔ｴｰ縺ｧ騾乗・諢溘・縺ゅｋ鬮伜沺縺檎音蠕ｴ縲る←蜷茨ｼ哥20, F30, G30, F48遲牙､壽焚縲・,
            image: "https://picsum.photos/seed/focal-bmw/400/300"
          },
          {
            name: "Focal IC BMW 100L (蜷瑚ｻｸ)",
            price: "77000",
            description: "繧ｳ繧｢繧ｭ繧ｷ繝｣繝ｫ・亥酔霆ｸ・峨ち繧､繝励よ焔霆ｽ縺ｫFocal繧ｵ繧ｦ繝ｳ繝峨ｒ讌ｽ縺励ａ縺ｾ縺吶る←蜷茨ｼ哥20, F30, G30, MINI遲峨・,
            image: "https://picsum.photos/seed/focal-ic/400/300"
          },
          {
            name: "Focal BMF30KV2 (繝上う繧ｰ繝ｬ繝ｼ繝・",
            price: "151800",
            description: "Focal K2 Power繧ｷ繝ｪ繝ｼ繧ｺ繧呈治逕ｨ縺励◆繝上う繧ｰ繝ｬ繝ｼ繝峨Δ繝・Ν縲ょ悸蛟堤噪縺ｪ諠・ｱ驥上→繝代Ρ繝ｼ諢溘・,
            image: "https://picsum.photos/seed/focal-k2/400/300"
          },
          {
            name: "Focal ISUB BMW 2/4 (繧ｦ繝ｼ繝上・)",
            price: "104500",
            description: "繧ｷ繝ｼ繝井ｸ九え繝ｼ繝上・莠､謠帷畑縲ゆｽ主沺縺ｮ繧ｭ繝ｬ縺ｨ蜴壹∩縺悟括逧・↓謾ｹ蝟・＆繧後∪縺吶ょｷｦ蜿ｳ繧ｻ繝・ヨ萓｡譬ｼ縲・,
            image: "https://picsum.photos/seed/focal-isub/400/300"
          },
          {
            name: "BLAM Signature繧ｷ繝ｪ繝ｼ繧ｺ",
            price: "168080",
            description: "繝輔Λ繝ｳ繧ｹBLAM縺ｮ譛荳顔ｴ壹す繝ｪ繝ｼ繧ｺ縲ゅΧ繧ｩ繝ｼ繧ｫ繝ｫ縺ｮ濶ｶ繧・°縺輔→繝ｪ繧｢繝ｪ繝・ぅ縺碁圀遶九■縺ｾ縺吶・,
            image: "https://picsum.photos/seed/blam-bmw/400/300"
          },
          {
            name: "ETON B100W / B100T / B100N",
            price: "96800",
            description: "繝峨う繝ЕTON縲・MW蟆ら畑險ｭ險医・蜈磯ｧ・￠縲ゅリ繝√Η繝ｩ繝ｫ縺ｧ閨ｴ縺咲夢繧後＠縺ｪ縺・し繧ｦ繝ｳ繝峨る←蜷郁ｻ顔ｨｮ縺碁撼蟶ｸ縺ｫ雎雁ｯ後〒縺吶・,
            image: "https://picsum.photos/seed/eton-bmw/400/300"
          },
          {
            name: "a/tack PFS10A / PFS10B",
            price: "84240",
            description: "BMW蟆ら畑蜩√↓迚ｹ蛹悶＠縺歛/tack縲らｴ疲ｭ｣縺ｮ髮ｰ蝗ｲ豌励ｒ螢翫＆縺壹∫｢ｺ螳溘↑髻ｳ雉ｪ繧｢繝・・繧堤ｴ・據縺励∪縺吶・,
            image: "https://picsum.photos/seed/atack-bmw/400/300"
          }
        ]
      },
      {
        name: "Mercedes Benz繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙ヱ繝・こ繝ｼ繧ｸ",
        price: "88000",
        features: ["霆顔ｨｮ蟆ら畑險ｭ險・, "邏疲ｭ｣蜉蟾･縺ｪ縺・, "髻ｳ雉ｪ蜉・噪蜷台ｸ・],
        badge: "邏疲ｭ｣莠､謠・,
        image: "https://picsum.photos/seed/benz-audio/800/600",
        description: "Mercedes-Benz縺ｮ髻ｳ雉ｪ縺ｫ縺頑か縺ｿ縺ｮ譁ｹ縺ｫ・∵怙霑代・繝吶Φ繝・ｸ驛ｨ霆顔ｨｮ縺ｧ縺ｯ繧ｹ繝斐・繧ｫ繝ｼ縺ｮ蟆丞梛蛹悶′騾ｲ縺ｿ縲・浹雉ｪ縺ｫ荳肴ｺ繧呈戟縺､譁ｹ縺悟､壹￥縺ｪ縺｣縺ｦ縺阪∪縺励◆縲・n\n縺願ｻ翫↓繝繝｡繝ｼ繧ｸ繧剃ｸ弱∴縺ｪ縺・後ヨ繝ｬ繝ｼ繝峨う繝ｳ繧ｿ繧､繝励阪・繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙〒縺ゅｌ縺ｰ縲∵ｯ碑ｼ・噪謇玖ｻｽ縺ｫ縲√◎縺励※濶ｯ螂ｽ縺ｫ髻ｳ雉ｪ繧｢繝・・縺輔○繧九％縺ｨ縺悟庄閭ｽ縺ｧ縺吶らｴ疲ｭ｣縺ｮ髮ｰ蝗ｲ豌励ｒ謳阪↑繧上★縲√・繝ｫ繝医が繝ｳ縺ｧ陬・捩蜿ｯ閭ｽ縺ｪ蟆ら畑險ｭ險医Δ繝・Ν繧貞､壽焚繝ｩ繧､繝ｳ繝翫ャ繝励＠縺ｦ縺・∪縺吶・n\n繝輔Ο繝ｳ繝医せ繝斐・繧ｫ繝ｼ縺ｮ莠､謠帙・繧ゅ■繧阪ｓ縲√Μ繧｢縲√そ繝ｳ繧ｿ繝ｼ縲√◎縺励※雜ｳ蜈・・繧ｦ繝ｼ繝上・縺ｾ縺ｧ縲√ヨ繝ｼ繧ｿ繝ｫ縺ｧ縺ｮ繧ｷ繧ｹ繝・Β繧｢繝・・繧偵＃謠先｡医＞縺溘＠縺ｾ縺吶・,
        showSavings: false,
        packageDetails: {
          standardPrice: "88000",
          savings: "0",
          contents: [
            { title: "繝医Ξ繝ｼ繝峨う繝ｳ繧ｹ繝斐・繧ｫ繝ｼ", description: "繝｡繝ｫ繧ｻ繝・せ蟆ら畑險ｭ險医・繝懊Ν繝医が繝ｳ莠､謠帙せ繝斐・繧ｫ繝ｼ", icon: "Speaker" },
            { title: "繧､繝ｳ繧ｹ繝医・繝ｫ雋ｻ逕ｨ", description: "蜀・ｼｵ繧願┳逹縲√せ繝斐・繧ｫ繝ｼ蝗ｺ螳壹・・邱壼・逅・, icon: "Wrench" },
            { title: "繝峨い繝√Η繝ｼ繝九Φ繧ｰ", description: "繧ｹ繝斐・繧ｫ繝ｼ縺ｮ諤ｧ閭ｽ繧貞ｼ輔″蜃ｺ縺吝宛謖ｯ繝ｻ蜷ｸ髻ｳ蜃ｦ逅・, icon: "Activity" },
            { title: "繧ｵ繧ｦ繝ｳ繝峨メ繧ｧ繝・け", description: "菴咲嶌遒ｺ隱阪♀繧医・邁｡譏馴浹髻ｿ貂ｬ螳壹・隱ｿ謨ｴ", icon: "Zap" }
          ],
          notes: [
            "C繧ｯ繝ｩ繧ｹ(W205)縲・繧ｯ繝ｩ繧ｹ(W213)縲；LC(X253)遲峨∽ｸｻ隕√Δ繝・Ν縺ｫ蟷・ｺ・￥蟇ｾ蠢懊＠縺ｦ縺・∪縺吶・,
            "繧ｪ繝励す繝ｧ繝ｳ繧・ｹｴ蠑上↓繧医ｊ縲∝挨騾皮ｴ疲ｭ｣驛ｨ蜩√ｄ繝輔ぅ繝ｫ繧ｿ繝ｼ縺悟ｿ・ｦ√↓縺ｪ繧句ｴ蜷医′縺ゅｊ縺ｾ縺吶・,
            "雜ｳ蜈・・邏疲ｭ｣繧ｵ繝悶え繝ｼ繝上・縺檎援蛛ｴ縺ｮ縺ｿ縺ｮ霆贋ｸ｡繧ゅ∝ｷｦ蜿ｳ繧ｻ繝・ヨ縺ｸ縺ｮ繧｢繝・・繧ｰ繝ｬ繝ｼ繝峨′蜿ｯ閭ｽ縺ｧ縺吶・,
            "菴懈･ｭ譎る俣縺ｯ繝輔Ο繝ｳ繝医せ繝斐・繧ｫ繝ｼ莠､謠帙〒邏・縲・譎る俣遞句ｺｦ縺ｧ縺吶ゆｻ｣霆翫ｂ縺泌茜逕ｨ縺・◆縺縺代∪縺吶・,
            "繧ｻ繝ｳ繧ｿ繝ｼ繧ｹ繝斐・繧ｫ繝ｼ繧・Μ繧｢繧ｹ繝斐・繧ｫ繝ｼ縺ｮ莠､謠帙ｂ謇ｿ縺｣縺ｦ縺翫ｊ縺ｾ縺吶・
          ]
        },
        lineup: [
          {
            name: "Focal K2 POWER 繧ｷ繝ｪ繝ｼ繧ｺ (MB213/205KJ2)",
            price: "154000",
            description: "Focal縺ｮ莉｣蜷崎ｩ朏2 Power繧呈治逕ｨ縲ょ悸蛟堤噪縺ｪ隗｣蜒丞ｺｦ縺ｨ繝代Ρ繝ｼ諢溘ゅヵ繝ｭ繝ｳ繝・WAY繧ｻ繝・ヨ縲・,
            image: "https://picsum.photos/seed/focal-benz-k2/400/300"
          },
          {
            name: "Focal FLAX EVO 繧ｷ繝ｪ繝ｼ繧ｺ (IS MBZ 100)",
            price: "99000",
            description: "繝翫メ繝･繝ｩ繝ｫ縺ｪ髻ｳ雉ｪ縺碁ｭ・鴨縺ｮFLAX繧ｳ繝ｼ繝ｳ縲ゅヵ繝ｭ繝ｳ繝・WAY繧ｻ繝・ヨ縲・,
            image: "https://picsum.photos/seed/focal-benz-flax/400/300"
          },
          {
            name: "BLAM Signature 繧ｷ繝ｪ繝ｼ繧ｺ (100S24 MB)",
            price: "138600",
            description: "繝輔Λ繝ｳ繧ｹBLAM縺ｮ譛荳顔ｴ壹す繝ｪ繝ｼ繧ｺ縲ゅΧ繧ｩ繝ｼ繧ｫ繝ｫ縺ｮ濶ｶ繧・°縺輔→繝ｪ繧｢繝ｪ繝・ぅ縺碁圀遶九■縺ｾ縺吶・,
            image: "https://picsum.photos/seed/blam-benz/400/300"
          },
          {
            name: "MATCH UP C42MB-FRT",
            price: "72900",
            description: "繝峨う繝МATCH縲ゅさ繧ｹ繝医ヱ繝輔か繝ｼ繝槭Φ繧ｹ縺ｫ蜆ｪ繧後∫ｴ疲ｭ｣縺九ｉ縺ｮ繧ｹ繝・ャ繝励い繝・・縺ｫ譛驕ｩ縲・,
            image: "https://picsum.photos/seed/match-benz/400/300"
          },
          {
            name: "ETON UG MB-100F",
            price: "132000",
            description: "繝峨う繝ЕTON縲・MW蜷梧ｧ倥√・繝ｳ繝・ｰら畑險ｭ險医〒繧るｫ倥＞菫｡鬆ｼ諤ｧ繧定ｪ・ｋ繝上う繧ｰ繝ｬ繝ｼ繝峨Δ繝・Ν縲・,
            image: "https://picsum.photos/seed/eton-benz/400/300"
          },
          {
            name: "BEWITH MBZSUB/213R (繧ｦ繝ｼ繝上・)",
            price: "79200",
            description: "譌･譛ｬBEWITH縲りｶｳ蜈・・繧ｦ繝ｼ繝上・繧剃ｺ､謠帙＠縲∽ｽ主沺縺ｮ繧ｭ繝ｬ繧貞括逧・↓謾ｹ蝟・ょｷｦ蜿ｳ繧ｻ繝・ヨ萓｡譬ｼ縲・,
            image: "https://picsum.photos/seed/bewith-benz/400/300"
          },
          {
            name: "Focal MB213KJ5T (繝輔Ν繧ｻ繝・ヨ)",
            price: "385000",
            description: "繝輔Ο繝ｳ繝・繝ｪ繧｢/繧ｻ繝ｳ繧ｿ繝ｼ繧貞・縺ｦK2 Power縺ｧ邨ｱ荳縺吶ｋ遨ｶ讌ｵ縺ｮ繝代ャ繧ｱ繝ｼ繧ｸ縲・,
            image: "https://picsum.photos/seed/focal-benz-full/400/300"
          }
        ]
      },
      {
        name: "霆顔ｨｮ蛻･繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙・繝ｩ繝ｳ",
        price: "44000",
        features: ["莠ｺ豌苓ｻ顔ｨｮ蛻･繧ｻ繝・ヨ", "蟾･雉・ｾｼ", "邏疲ｭ｣蠕ｩ蟶ｰ蜿ｯ閭ｽ"],
        badge: "螳牙ｿ・ヱ繝・け",
        image: "https://picsum.photos/seed/car-specific-audio/800/600",
        description: "莠ｺ豌苓ｻ顔ｨｮ縺ｫ繝輔ぅ繝・ヨ縺吶ｋ縺頑焔霆ｽ繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙・繝ｩ繝ｳ・∝・繧√※繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｫ繝√Ε繝ｬ繝ｳ繧ｸ縺励※縺ｿ繧九→縺・≧譁ｹ繧貞ｯｾ雎｡縺ｫ縲√〒縺阪ｋ縺縺代Ο繝ｼ繧ｳ繧ｹ繝医〒讌ｽ縺励ｓ縺ｧ繧ゅｉ縺医ｋ繝励Λ繝ｳ繧偵＃逕ｨ諢上＠縺ｾ縺励◆縲・n\n繧ｳ繧ｹ繝医ｒ謚代∴繧九◆繧√↓霆顔ｨｮ縺斐→縺ｫ迚ｹ蛹悶＠縺溘ヱ繝・こ繝ｼ繧ｸ蛹悶ｒ陦後▲縺ｦ縺翫ｊ縲∵怙霑大｢励∴縺ｦ縺・ｋ繧ｵ繝悶せ繧ｯ蝙九・霆贋ｸ｡雉ｼ蜈･縺ｫ蜷医ｏ縺帙※縲∬ｻ贋ｸ｡蛛ｴ縺ｸ縺ｮ繝繝｡繝ｼ繧ｸ繧偵↑縺上＠縲∝｣ｲ蜊ｴ譎ゅ↓縺ｯ蜈・↓謌ｻ縺帙ｋ繧医≧縺ｪ險ｭ險医↓縺ｪ縺｣縺ｦ縺・∪縺吶ゅ∪縺壹・莠ｺ豌苓ｻ顔ｨｮ縺九ｉ蟇ｾ蠢懊ｒ髢句ｧ九＠縺ｦ縺翫ｊ縲・・ｬ｡蟇ｾ雎｡霆顔ｨｮ繧呈僑螟ｧ荳ｭ縺ｧ縺吶・,
        showSavings: false,
        packageDetails: {
          standardPrice: "44000",
          savings: "0",
          contents: [
            { title: "繧ｻ繝代Ξ繝ｼ繝医せ繝斐・繧ｫ繝ｼ", description: "霆顔ｨｮ縺ｫ蜷医ｏ縺帙◆譛驕ｩ縺ｪ繧ｹ繝斐・繧ｫ繝ｼ繝ｦ繝九ャ繝・, icon: "Speaker" },
            { title: "蟆ら畑繝舌ャ繝輔Ν繝ｻ驟咲ｷ・, description: "辟｡蜉蟾･縺ｧ蜿悶ｊ莉倥￠蜿ｯ閭ｽ縺ｪ蟆ら畑繝槭え繝ｳ繝医→繧ｫ繝励Λ繝ｼ", icon: "Wrench" },
            { title: "繧､繝ｳ繧ｹ繝医・繝ｫ雋ｻ逕ｨ", description: "霆顔ｨｮ縺斐→縺ｮ繝弱え繝上え繧呈ｴｻ縺九＠縺溽｢ｺ螳溘↑蜿悶ｊ莉倥￠", icon: "Activity" },
            { title: "繧ｵ繧ｦ繝ｳ繝峨メ繧ｧ繝・け", description: "菴咲嶌遒ｺ隱阪♀繧医・邁｡譏馴浹髻ｿ貂ｬ螳壹・隱ｿ謨ｴ", icon: "Zap" }
          ],
          notes: [
            "陦ｨ遉ｺ萓｡譬ｼ縺ｯ繧ｨ繝ｳ繝医Μ繝ｼ繝励Λ繝ｳ縺ｮ逶ｮ螳峨〒縺吶る∈謚槭☆繧九せ繝斐・繧ｫ繝ｼ縺ｫ繧医ｊ萓｡譬ｼ縺悟､牙虚縺励∪縺吶・,
            "霆贋ｸ｡蛛ｴ縺ｮ蜉蟾･繧剃ｸ蛻・｡後ｏ縺ｪ縺・◆繧√∝ｰ・擂逧・↑邏疲ｭ｣蠕ｩ蟶ｰ縺悟ｮｹ譏薙〒縺吶・,
            "繧ｵ繝悶せ繧ｯ繝ｪ繝励す繝ｧ繝ｳ繧・Μ繝ｼ繧ｹ霆贋ｸ｡縺ｮ譁ｹ縺ｧ繧ょｮ牙ｿ・＠縺ｦ縺泌茜逕ｨ縺・◆縺縺代∪縺吶・,
            "菴懈･ｭ譎る俣縺ｯ邏・縲・譎る俣遞句ｺｦ縺ｧ縺吶ょｺ鈴ｭ縺ｧ縺雁ｾ・■縺・◆縺縺上％縺ｨ繧ょ庄閭ｽ縺ｧ縺吶・,
            "蟇ｾ雎｡霆顔ｨｮ縺ｫ縺ｪ縺・ｴ蜷医〒繧ゅ∵ｱ守畑繝舌ャ繝輔Ν遲峨〒蟇ｾ蠢懷庄閭ｽ縺ｪ蝣ｴ蜷医′縺ゅｊ縺ｾ縺吶ゅ♀豌苓ｻｽ縺ｫ縺皮嶌隲・￥縺縺輔＞縲・
          ]
        },
        lineup: [
          {
            name: "繝繧､繝上ヤ・壹ち繝ｳ繝・/ 繝繝ｼ繝ｴ繝ｻ繧ｭ繝｣繝ｳ繝舌せ / 繧ｦ繧ｧ繧､繧ｯ",
            price: "44000",
            description: "霆ｽ閾ｪ蜍戊ｻ翫・莠ｺ豌励Δ繝・Ν縺ｫ迚ｹ蛹悶ゅけ繝ｪ繧｢縺ｪ荳ｭ鬮伜沺縺ｧ繝峨Λ繧､繝悶′繧ゅ▲縺ｨ讌ｽ縺励￥縺ｪ繧翫∪縺吶・,
            image: "https://picsum.photos/seed/daihatsu-audio/400/300"
          },
          {
            name: "繝帙Φ繝・哢-BOX / N-WGN / FIT",
            price: "44000",
            description: "蝨ｧ蛟堤噪縺ｪ雋ｩ螢ｲ蜿ｰ謨ｰ繧定ｪ・ｋN繧ｷ繝ｪ繝ｼ繧ｺ縲らｴ疲ｭ｣縺ｮ迚ｩ雜ｳ繧翫↑縺輔ｒ謇玖ｻｽ縺ｫ隗｣豸医＠縺ｾ縺吶・,
            image: "https://picsum.photos/seed/honda-audio/400/300"
          },
          {
            name: "繧ｹ繧ｺ繧ｭ・壹ず繝繝九・ / 繧ｹ繧､繝輔ヨ",
            price: "44000",
            description: "繧ｸ繝繝九・/繧ｷ繧ｨ繝ｩ(H30.7縲・繧・せ繧､繝輔ヨ繧ｹ繝昴・繝・ｭ峨∬ｶ｣蜻ｳ諤ｧ縺ｮ鬮倥＞霆顔ｨｮ縺ｫ繧ょｯｾ蠢懊・,
            image: "https://picsum.photos/seed/suzuki-audio/400/300"
          },
          {
            name: "繝医Κ繧ｿ・壹い繝ｫ繝輔ぃ繝ｼ繝・/ 繝ｴ繧ｧ繝ｫ繝輔ぃ繧､繧｢ / 繝励Μ繧ｦ繧ｹ",
            price: "55000",
            description: "30/40邉ｻ繧｢繝ｫ繝ｴ繧ｧ繝ｫ縲∵眠蝙九・繝ｪ繧ｦ繧ｹ(R5.1縲・遲峨∵怙譁ｰ繝｢繝・Ν縺ｮ驕ｩ蜷医ｂ蜈・ｮ溘・,
            image: "https://picsum.photos/seed/toyota-audio/400/300"
          },
          {
            name: "繝医Κ繧ｿ・壹Λ繝ｳ繧ｯ繝ｫ300 / 繝励Λ繝・/ C-HR",
            price: "55000",
            description: "SUV縺ｮ莠ｺ豌励Δ繝・Ν縲ょ､ｧ譟・↑霆贋ｽ薙↓雋縺代↑縺・∬官縺ｮ縺ゅｋ繧ｵ繧ｦ繝ｳ繝峨ｒ螳溽樟縺励∪縺吶・,
            image: "https://picsum.photos/seed/toyota-suv/400/300"
          },
          {
            name: "繧ｹ繝舌Ν・壹Ξ繝ｴ繧ｩ繝ｼ繧ｰ / 繝輔か繝ｬ繧ｹ繧ｿ繝ｼ",
            price: "55000",
            description: "襍ｰ繧翫・繧ｹ繝舌Ν霆翫↓縲ゅΟ繝ｼ繝峨ヮ繧､繧ｺ縺ｫ雋縺代↑縺・け繝ｪ繧｢縺ｪ髻ｳ讌ｽ遨ｺ髢薙ｒ謠蝉ｾ帙＠縺ｾ縺吶・,
            image: "https://picsum.photos/seed/subaru-audio/400/300"
          },
          {
            name: "JEEP・啌ENEGADE / COMPASS",
            price: "66000",
            description: "霈ｸ蜈･霆慨UV縺ｮ繧ｨ繝ｳ繝医Μ繝ｼ繝｢繝・Ν縲ょｰら畑險ｭ險医〒繧ｹ繝槭・繝医↓髻ｳ雉ｪ繧｢繝・・縺悟庄閭ｽ縺ｧ縺吶・,
            image: "https://picsum.photos/seed/jeep-audio/400/300"
          }
        ]
      }
    ]
  },
  {
    id: 'environment_tuning',
    category: "髱吶°縺ｫ縺励◆縺・・迺ｰ蠅・ｒ謨ｴ縺医◆縺・婿縺ｸ",
    type: 'audio',
    description: "繝ｭ繝ｼ繝峨ヮ繧､繧ｺ縺梧ｰ励↓縺ｪ繧九√ｂ縺｣縺ｨ髱吶°縺ｫ縺励◆縺・ｦ\n**繝・ャ繝峨ル繝ｳ繧ｰ**繧・*驕ｮ髻ｳ譁ｽ蟾･**縺ｧ縲∫黄逅・噪縺ｪ迺ｰ蠅・ｒ謾ｹ蝟・・n\n讖滓攝縺ｮ繝昴ユ繝ｳ繧ｷ繝｣繝ｫ繧・*120%蠑輔″蜃ｺ縺・*縲∝ｿｫ驕ｩ縺ｪ霆雁・遨ｺ髢薙ｒ菴懊ｊ縺ｾ縺吶・,
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "繝峨い繝√Η繝ｼ繝九Φ繧ｰ",
        price: "27500",
        features: ["蛻ｶ謖ｯ繝ｻ蜷ｸ髻ｳ繝ｻ諡｡謨｣繝ｻ驕ｮ髻ｳ", "莠育ｮ励↓蜷医ｏ縺帙◆4繧ｳ繝ｼ繧ｹ", "繧ｹ繝斐・繧ｫ繝ｼ縺ｮ諤ｧ閭ｽ繧呈怙螟ｧ蛹・],
        badge: "髻ｳ雉ｪ蜷台ｸ翫・蠢・域命蟾･",
        image: "https://picsum.photos/seed/door/800/600",
        description: "繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ髻ｳ雉ｪ蜷台ｸ翫・荳逡ｪ謇九・繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙〒縺吶ゅ◎縺励※縺昴・蜉ｹ譫懊ｒ謠ｺ繧九℃縺ｪ縺・ｂ縺ｮ縺ｫ縺吶ｋ縺溘ａ縺ｫ縺ｯ繝峨い繝√Η繝ｼ繝九Φ繧ｰ(繝・ャ繝峨ル繝ｳ繧ｰ)縺悟ｿ・ｦ∽ｸ榊庄谺縺ｧ縺吶ゆｸ闊ｬ逧・↓縺ｯ繝・ャ繝峨ル繝ｳ繧ｰ(髦ｲ謖ｯ)縺ｨ蜻ｼ縺ｰ繧後※縺・∪縺吶′縲√ラ繧｢縺ｧ繧ｹ繝斐・繧ｫ繝ｼ繧帝←蛻・↓魑ｴ繧峨☆縺ｫ縺ｯ繝・ャ繝峨ル繝ｳ繧ｰ(髦ｲ謖ｯ)縺縺代〒縺ｯ縺ｪ縺上∝精髻ｳ繝ｻ諡｡謨｣繝ｻ驕ｮ髻ｳ縺ｪ縺ｩ縺ｮ隕∫ｴ繧定､・粋逧・↓蜃ｦ逅・＠縺ｦ縺・￥蠢・ｦ√′縺ゅｊ縺ｾ縺吶ゅ◎縺ｮ縺溘ａ蠖灘ｺ励〒縺ｯ繝峨い繝√Η繝ｼ繝九Φ繧ｰ縺ｨ縺・≧繝阪・繝溘Φ繧ｰ繧剃ｽｿ縺｣縺ｦ縺・∪縺吶ゅ％縺ｮ繝代ャ繧ｱ繝ｼ繧ｸ縺ｧ縺ｯ縺雁ｮ｢讒倥・莠育ｮ励↓蠢懊§縺ｦ驕ｩ蛻・↑譁ｽ蟾･繧定｡後＞縺ｾ縺吶ゅラ繧｢縺ｮ讒矩繧・叙繧贋ｻ倥￠繧九せ繝斐・繧ｫ繝ｼ縺ｮ邨・∩蜷医ｏ縺帙↓蠢懊§縺ｦ譚先侭繧・い繝励Ο繝ｼ繝√ｒ閾ｨ讖溷ｿ懷､峨↓蟇ｾ蠢懊＠縲∽ｺ育ｮ励・荳ｭ縺ｧ譛繧ゅヱ繝輔か繝ｼ繝槭Φ繧ｹ縺ｮ鬮倥＞譁ｹ豕輔ｒ驕ｸ謚槭☆繧九ｈ縺・↓縺励※縺・∪縺吶・,
        link: "https://www.soundang.com/door-turning.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "0",
          savings: "0",
          contents: [
            { title: "蛻ｶ謖ｯ譚・, description: "驩・攸縺ｮ蜈ｱ謖ｯ繧呈椛縺医∽ｸ崎ｦ√↑繝弱う繧ｺ繧剃ｽ取ｸ・, icon: "Activity" },
            { title: "蜷ｸ髻ｳ譚・, description: "繧ｹ繝斐・繧ｫ繝ｼ閭碁擇縺ｮ髻ｳ繧貞・逅・＠縲√け繝ｪ繧｢縺ｪ髻ｳ雉ｪ縺ｸ", icon: "Speaker" },
            { title: "驕ｮ髻ｳ繝ｻ諡｡謨｣譚・, description: "髻ｳ縺ｮ騾城℃繧帝亟縺弱∫炊諠ｳ逧・↑髻ｿ縺阪ｒ繧ｳ繝ｳ繝医Ο繝ｼ繝ｫ", icon: "Layers" },
            { title: "譁ｽ蟾･蟾･雉・, description: "繝峨い縺ｮ讒矩縺ｫ蜷医ｏ縺帙◆譛驕ｩ縺ｪ繧｢繝励Ο繝ｼ繝√〒縺ｮ譁ｽ蟾･", icon: "Wrench" }
          ],
          notes: [
            "霆顔ｨｮ繧・ラ繧｢縺ｮ讒矩縺ｫ繧医ｊ縲∵怙驕ｩ縺ｪ譚先侭繧定・讖溷ｿ懷､峨↓驕ｸ謚槭＠縺ｾ縺吶・,
            "繧ｳ繝ｳ繝壻ｻ墓ｧ倥ｄ髱咎浹莉墓ｧ倥↑縺ｩ縲√＃隕∵悍縺ｫ蜷医ｏ縺帙◆繧ｫ繧ｹ繧ｿ繝繝励Λ繝ｳ繧ょ庄閭ｽ縺ｧ縺吶・,
            "菴懈･ｭ譎る俣縺ｯ繧ｳ繝ｼ繧ｹ縺ｫ繧医ｊ逡ｰ縺ｪ繧翫∪縺吶ら┌譁吩ｻ｣霆翫ｒ縺皮畑諢上＠縺ｦ縺・∪縺吶・
          ]
        },
        lineup: [
          {
            name: "B繧ｳ繝ｼ繧ｹ・医・繝ｼ繧ｷ繝・け・・,
            price: "27500",
            description: "繧ｹ繝斐・繧ｫ繝ｼ蜻ｨ霎ｺ縺ｮ驩・攸蜈ｱ謖ｯ繧呈椛縺医ｋ繝・ャ繝峨ル繝ｳ繧ｰ繧剃ｸｭ蠢・↓譁ｽ蟾･縲ょ､匁攸縺ｫ繧ゅョ繝・ラ繝九Φ繧ｰ繧呈命縺励∝､ｧ縺阪↑繧ｵ繝ｼ繝薙せ繝帙・繝ｫ縺後≠繧句ｴ蜷医・蜷ｸ髻ｳ譚舌↑縺ｩ繧剃ｽｿ逕ｨ縺励∪縺吶ゅせ繝斐・繧ｫ繝ｼ蜻ｨ繧翫・螳壼惠豕｢繧呈椛縺医ｋ縺溘ａ驩・攸蛛ｴ繝ｻ蜀・ｼｵ繧雁・蛟句挨縺ｫ蟇ｾ遲悶＠縺ｾ縺吶・,
            image: "https://picsum.photos/seed/door-b/400/300"
          },
          {
            name: "A繧ｳ繝ｼ繧ｹ",
            price: "44000",
            description: "蜀・攸繝ｻ螟匁攸縺ｨ繧・繧ｳ繝ｼ繧ｹ繧医ｊ繝・ャ繝峨ル繝ｳ繧ｰ譚先侭繧貞｢励ｄ縺励√ｈ繧雁ｼｷ蝗ｺ縺ｫ繧｢繝・・繧ｰ繝ｬ繝ｼ繝峨ゅせ繝斐・繧ｫ繝ｼ陬上・閭悟悸蜃ｦ逅・ｒ陦後＞縲・浹縺ｮ遶九■荳翫′繧翫ｒ謾ｹ蝟・＠縺ｾ縺吶・,
            image: "https://picsum.photos/seed/door-a/400/300"
          },
          {
            name: "S繧ｳ繝ｼ繧ｹ",
            price: "66000",
            description: "繝峨い蜈ｨ髱｢譁ｽ蟾･縲ょ､悶°繧峨・髻ｳ縺ｮ萓ｵ蜈･繧・浹貍上ｌ繧定ｻｽ貂帙ょ､匁攸縺ｫ縺ｯ鬮俶ｩ溯・蛻ｶ謖ｯ譚舌√せ繝斐・繧ｫ繝ｼ陬上↓縺ｯ隧穂ｾ｡縺ｮ鬮倥＞蜷ｸ髻ｳ譚舌ｒ菴ｿ逕ｨ縲ょ・譚ｿ陦ｨ髱｢繧帝・髻ｳ譚舌〒謚代∴縲∝・蠑ｵ繧雁・縺ｫ繧ょ精髻ｳ譚舌ｒ蠑ｵ繧願ｾｼ縺ｿS/N繧｢繝・・繧貞峙繧翫∪縺吶・,
            image: "https://picsum.photos/seed/door-s/400/300"
          },
          {
            name: "SS繧ｳ繝ｼ繧ｹ・亥ｼｷ蠎ｦ蜆ｪ蜈茨ｼ・,
            price: "99000",
            description: "繝峨い蜈ｨ髱｢譁ｽ蟾･縲ゅラ繧｢蠑ｷ蠎ｦ繧剃ｸ翫￡縺ｦ繧ｿ繧､繝医〒繝上Μ縺ｮ縺ゅｋ繧ｵ繧ｦ繝ｳ繝峨ｒ蜀咲函縲り､・焚遞ｮ鬘槭・繝・ャ繝峨ル繝ｳ繧ｰ譚舌ｒ雋ｼ繧雁粋繧上○髻ｳ騾溘ｒ繧ｳ繝ｳ繝医Ο繝ｼ繝ｫ縲ゅΑ繝九ヰ繝ｳ繧・け繝ｼ繝壹↑縺ｩ繝峨い縺ｮ螟ｧ縺阪↑霆贋ｸ｡縺ｫ迚ｹ縺ｫ縺雁匡繧√〒縺吶・,
            image: "https://picsum.photos/seed/door-ss/400/300"
          }
        ]
      },
      {
        name: "繧ｵ繧､繝ｬ繝ｳ繝医メ繝･繝ｼ繝九Φ繧ｰ(霆雁・髱咎浹譁ｽ蟾･)",
        price: "19800",
        features: ["繝ｭ繝ｼ繝峨ヮ繧､繧ｺ菴取ｸ・, "驕ｮ髻ｳ繝ｻ蛻ｶ謖ｯ繝ｻ驕ｮ辭ｱ", "蜷・Κ菴榊挨繝代ャ繧ｱ繝ｼ繧ｸ"],
        badge: "髱咏ｲ帶ｧUP",
        image: "/images/Top/speaker.webp",
        link: "https://www.soundang.com/silent.html",
        showSavings: false,
        gallery: [
          { title: "繝輔か繝ｬ繧ｹ繧ｿ繝ｼ・壹Ν繝ｼ繝墓命蟾･", images: ["https://picsum.photos/seed/forester1/800/600", "https://picsum.photos/seed/forester2/800/600", "https://picsum.photos/seed/forester3/800/600"] },
          { title: "N-WGN・壹ヵ繝ｫ繝代ャ繧ｱ繝ｼ繧ｸ譁ｽ蟾･", images: ["https://picsum.photos/seed/nwgn1/800/600", "https://picsum.photos/seed/nwgn2/800/600", "https://picsum.photos/seed/nwgn3/800/600", "https://picsum.photos/seed/nwgn4/800/600", "https://picsum.photos/seed/nwgn5/800/600"] },
          { title: "繝ｬ繧ｯ繧ｵ繧ｹLS600H/L・壹ヵ繝ｭ繧｢繝ｻ繝医Λ繝ｳ繧ｯ譁ｽ蟾･", images: ["https://picsum.photos/seed/ls600-1/800/600", "https://picsum.photos/seed/ls600-2/800/600", "https://picsum.photos/seed/ls600-3/800/600"] },
          { title: "繝昴Ν繧ｷ繧ｧ・壹ヵ繝ｭ繧｢譁ｽ蟾･", images: ["https://picsum.photos/seed/porsche1/800/600", "https://picsum.photos/seed/porsche2/800/600"] },
          { title: "繧ｦ繧ｧ繧､繧ｯ・壹Ν繝ｼ繝輔・繝ｪ繧｢繝峨い譁ｽ蟾･", images: ["https://picsum.photos/seed/wake1/800/600", "https://picsum.photos/seed/wake2/800/600"] }
        ],
        description: "窶昴し繧､繝ｬ繝ｳ繝医メ繝･繝ｼ繝九Φ繧ｰ窶昴→縺ｯ縲∬ｻ翫・荳ｭ繧帝撕縺九↑遨ｺ髢薙∈縺ｨ螟芽ｲ後＆縺帙ｋ縺溘ａ縺ｮ縺・ｍ縺・ｍ縺ｪ譁ｽ蟾･繧貞推驛ｨ菴阪＃縺ｨ縺ｫ繝代ャ繧ｱ繝ｼ繧ｸ縺励◆繧ゅ・縺ｧ縺吶・n\n霆雁・縺ｮ繝弱う繧ｺ縺ｧ莉｣陦ｨ逧・↑繧ゅ・縺ｯ繝ｭ繝ｼ繝峨ヮ繧､繧ｺ縲りｵｰ陦御ｸｭ縺ｫ窶昴ざ繝ｼ繝・昴→縺ｪ繧九≠繧後〒縺吶ょ､ｧ縺阪↑鬨帝浹縺ｯ蟆代↑縺九ｉ縺壹ラ繝ｩ繧､繝紋ｸｭ縺ｮ繧ｹ繝医Ξ繧ｹ縺ｫ縺ｪ繧翫∪縺吶＠縲∽ｼ夊ｩｱ縺ｮ繝懊Μ繝･繝ｼ繝繧ゅ◎繧後↓騾｣繧後※螟ｧ縺阪￥縺ｪ繧翫∪縺吶りｻ雁・縺碁撕縺九↓縺ｪ繧後・蠕ｮ邏ｰ縺ｪ髻ｳ繧り・縺榊叙繧後ｋ繧医≧縺ｫ縺ｪ繧翫√き繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ髻ｳ雉ｪ蜷台ｸ翫↓縺ｯ謖√▲縺ｦ縺薙＞・√ワ繧､繝ｬ繧ｾ繧ｷ繧ｹ繝・Β遲峨↓縺ｯ縺ｨ縺上↓縺雁匡繧√〒縺吶・n\n笆繝｡繝九Η繝ｼ\n繝ｻ繝ｫ繝ｼ繝輔さ繝ｼ繧ｹ\n繝ｻ繝輔Ο繧｢繧ｳ繝ｼ繧ｹ\n繝ｻ繝医Λ繝ｳ繧ｯ繧ｳ繝ｼ繧ｹ\n繝ｻ繧､繝ｳ繝翫・繝輔ぉ繝ｳ繝繝ｼ繧ｳ繝ｼ繧ｹ\n繝ｻ繝舌Ν繧ｯ繝倥ャ繝峨さ繝ｼ繧ｹ\n繝ｻ繝ｪ繧｢繧ｲ繝ｼ繝医さ繝ｼ繧ｹ\n繝ｻ繝峨い繧ｳ繝ｼ繧ｹ\n繝ｻ繝懊Φ繝阪ャ繝医さ繝ｼ繧ｹ\n\n蠖灘ｺ励〒縺ｯ繝√Η繝ｼ繝九Φ繧ｰ譚先侭繧帝壼ｸｸ縺ｧ・抵ｼ千ｨｮ鬘樔ｻ･荳翫せ繝医ャ繧ｯ縺励∵ｧ倥・↑繝｡繝ｼ繧ｫ繝ｼ縺ｮ驛ｨ譚舌ｒ驕ｩ譚宣←謇縺ｧ菴ｿ逕ｨ縺励※縺・∪縺吶ゅ◆縺上＆繧薙・譁ｽ蟾･螳溽ｸｾ縺九ｉ縺上ｋ邨碁ｨ薙′蠖灘ｺ励・閾ｪ菫｡縺ｮ繝昴う繝ｳ繝医〒縺吶ゅΓ繝九Η繝ｼ縺ｫ縺ｪ縺・ヱ繝ｼ繝・ｂ譁ｽ蟾･蟇ｾ蠢懊＞縺溘＠縺ｾ縺吶・縺ｧ縲√♀豌苓ｻｽ縺ｫ縺皮嶌隲・￥縺縺輔＞縲・,
        packageDetails: {
          standardPrice: "19800",
          savings: "0",
          contents: [
            { title: "蛻ｶ謖ｯ譚・, description: "繝ｬ繧｢繝ｫ繧ｷ繝ｫ繝亥権縲．r.ARTEX SKYARMOR遲峨・0遞ｮ鬘樔ｻ･荳翫・譚先侭縺九ｉ驕ｩ譚宣←謇縺ｧ菴ｿ逕ｨ", icon: "Activity" },
            { title: "驕ｮ髻ｳ繝ｻ蜷ｸ髻ｳ譚・, description: "繧ｪ繝ｼ繝・ぅ繧ｪ繝・け繝九き 繧｢繧ｯ繝ｯ繧､繧ｨ縲√ヮ繧､繧ｺ繝ｬ繧ｹ繝ｩ繧ｰ縲√ル繝ｼ繝峨Ν繝輔ぉ繝ｫ繝育ｭ・, icon: "Layers" },
            { title: "驕ｮ辭ｱ譚・, description: "繝偵・繝医す繝ｼ繝ｫ繝峨Λ繧ｰ縲√し繝ｼ繝｢繝励Ο繝・け繝育ｭ会ｼ医Ν繝ｼ繝輔・繝懊Φ繝阪ャ繝育ｭ会ｼ・, icon: "Thermometer" },
            { title: "譁ｽ蟾･蟾･雉・, description: "蜷・Κ菴阪＃縺ｨ縺ｮ蟆る摩逧・↑蜿悶ｊ莉倥￠菴懈･ｭ", icon: "Wrench" }
          ],
          notes: [
            "霆顔ｨｮ繧・ｻ墓ｧ倥∝､ｩ莠輔・蠖｢迥ｶ縲√し繝ｳ繝ｫ繝ｼ繝輔・譛臥┌遲峨↓繧医ｊ霑ｽ蜉雋ｻ逕ｨ縺悟ｿ・ｦ√↑蝣ｴ蜷医′縺ゅｊ縺ｾ縺吶・,
            "荳驛ｨ譁ｽ蟾･縺ｧ縺阪↑縺・ｻ顔ｨｮ繧ゅ＃縺悶＞縺ｾ縺吶ゆｺ句燕縺ｮ縺皮嶌隲・ｒ縺雁匡繧√＠縺ｾ縺吶・,
            "菴懈･ｭ譎る俣縺ｯ驛ｨ菴阪↓繧医ｊ逡ｰ縺ｪ繧翫∪縺呻ｼ・譌･縲懈焚譌･・峨ら┌譁吩ｻ｣霆翫ｒ縺皮畑諢上＠縺ｦ縺・∪縺吶・縺ｧ縺泌茜逕ｨ縺上□縺輔＞縲・
          ]
        },
        lineup: [
          { name: "繝ｫ繝ｼ繝輔さ繝ｼ繧ｹ (霆ｽ繝ｻ繧ｳ繝ｳ繝代け繝医・繧ｻ繝繝ｳ遲・", price: "125400" },
          { name: "繝ｫ繝ｼ繝輔さ繝ｼ繧ｹ (繝溘ル繝舌Φ繝ｻ繝ｯ繧ｴ繝ｳ繝ｻSUV遲・", price: "182600" },
          { name: "繝輔Ο繧｢繧ｳ繝ｼ繧ｹ (繝・ャ繝峨ル繝ｳ繧ｰ・・・髻ｳ 霆ｽ遲・", price: "111100" },
          { name: "繝輔Ο繧｢繧ｳ繝ｼ繧ｹ (繝・ャ繝峨ル繝ｳ繧ｰ・・・髻ｳ 繝溘ル繝舌Φ遲・", price: "145200" },
          { name: "繝輔Ο繧｢繧ｳ繝ｼ繧ｹ (驕ｮ髻ｳ縺ｮ縺ｿ 霆ｽ遲・", price: "53900" },
          { name: "繝輔Ο繧｢繧ｳ繝ｼ繧ｹ (驕ｮ髻ｳ縺ｮ縺ｿ 繝溘ル繝舌Φ遲・", price: "75900" },
          { name: "繝医Λ繝ｳ繧ｯ繧ｳ繝ｼ繧ｹ (繝・ャ繝峨ル繝ｳ繧ｰ・・・髻ｳ)", price: "115500" },
          { name: "繝医Λ繝ｳ繧ｯ繧ｳ繝ｼ繧ｹ (驕ｮ髻ｳ縺ｮ縺ｿ)", price: "77000" },
          { name: "繧､繝ｳ繝翫・繝輔ぉ繝ｳ繝繝ｼ繧ｳ繝ｼ繧ｹ (4霈ｪ譁ｽ蟾･)", price: "124080" },
          { name: "繝舌Ν繧ｯ繝倥ャ繝峨さ繝ｼ繧ｹ", price: "38500" },
          { name: "繝ｪ繧｢繧ｲ繝ｼ繝医さ繝ｼ繧ｹ", price: "38500" },
          { name: "繝峨い繧ｳ繝ｼ繧ｹ (繝輔Ο繝ｳ繝・r繝ｪ繧｢蟾ｦ蜿ｳ)", price: "47300" },
          { name: "繝懊Φ繝阪ャ繝医さ繝ｼ繧ｹ (邏疲ｭ｣繝輔・繝峨≠繧・", price: "19800" },
          { name: "繝懊Φ繝阪ャ繝医さ繝ｼ繧ｹ (邏疲ｭ｣繝輔・繝峨↑縺・", price: "47300" }
        ]
      },
      {
        name: "繝・ぅ繝ｼ繧ｿ繝ｼ繧辰OOL縺ｫ繝槭え繝ｳ繝医☆繧九ヱ繝・こ繝ｼ繧ｸ",
        price: "46200",
        features: ["繝斐Λ繝ｼ蝓九ａ霎ｼ縺ｿ蜉蟾･", "繝ｬ繧ｶ繝ｼ/繧ｨ繧ｯ繧ｻ繝ｼ繝御ｻ穂ｸ翫￡", "隗貞ｺｦ繝ｻ菴咲ｽｮ縺ｮ譛驕ｩ蛹・],
        badge: "鬲・○繧玖ｨｭ鄂ｮ",
        image: "https://picsum.photos/seed/tw-mount/800/600",
        description: "繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ繧ｫ繧ｹ繧ｿ繝縺ｮ隨ｬ荳豁ｩ・√ヤ繧｣繝ｼ繧ｿ繝ｼ蝓九ａ霎ｼ縺ｿ繧､繝ｳ繧ｹ繝医・繝ｫ縲・n\n鬮倬浹繧貞・逕溘☆繧九ヤ繧｣繝ｼ繧ｿ繝ｼ縺ｯ蜿榊ｰ・・蠖ｱ髻ｿ繧偵→縺ｦ繧ょ女縺代ｄ縺吶￥縲√せ繝斐・繧ｫ繝ｼ縺ｮ諤ｧ閭ｽ繧堤匱謠ｮ縺吶ｋ縺薙→縺ｫ縺翫＞縺ｦ隗貞ｺｦ縺ｯ縺ｨ縺ｦ繧る㍾隕√↑諢丞袖繧呈戟縺｣縺ｦ縺・∪縺吶ゆｸ贋ｽ阪Δ繝・Ν縺ｮ繧ｹ繝斐・繧ｫ繝ｼ縺ｫ鄂ｮ縺榊梛繝槭え繝ｳ繝医′莉伜ｱ槭＠縺ｪ縺・・縺ｯ縲∝叙繧贋ｻ倥￠繧玖ｧ貞ｺｦ繧・ｽ咲ｽｮ縺碁浹雉ｪ縺ｫ逶ｴ邨舌☆繧九°繧峨〒縺吶・n\nDSP讖溯・縺梧ｨ呎ｺ門喧縺励※縺阪◆譏ｨ莉翫〒縺ｯ縲√ｈ繧翫ヤ繧｣繝ｼ繧ｿ繝ｼ縺ｮ豕｢蠖｢繧貞ｦｨ縺偵ｋ髫懷ｮｳ縺悟ｰ代↑縺・ム繝・す繝･繧医ｊ荳翫、繝斐Λ繝ｼ繧・ラ繧｢繝溘Λ繝ｼ陬上∈縺ｮ蝓九ａ霎ｼ縺ｿ縺御ｸｻ豬√→縺ｪ縺｣縺ｦ縺・∪縺吶よ怙驕ｩ縺ｪ隗貞ｺｦ縺ｧ繧､繝ｳ繧ｹ繝医・繝ｫ縺吶ｋ縺薙→縺ｧ縲∝悸蛟堤噪縺ｪ閾ｨ蝣ｴ諢溘→繧ｯ繝ｪ繧｢縺ｪ髻ｳ蜒上ｒ螳溽樟縺励∪縺吶・,
        link: "https://www.soundang.com/tw-mount.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "46200",
          savings: "0",
          contents: [
            { title: "隗貞ｺｦ繝ｻ菴咲ｽｮ豎ｺ繧・, description: "繝ｪ繧ｹ繝九Φ繧ｰ繝昴ず繧ｷ繝ｧ繝ｳ縺ｫ蜷医ｏ縺帙◆譛驕ｩ縺ｪ隗貞ｺｦ隱ｿ謨ｴ", icon: "Activity" },
            { title: "繝代ユ謌仙ｽ｢繝ｻ蜉蟾･", description: "邏疲ｭ｣繝斐Λ繝ｼ繧・ヱ繝阪Ν繧偵・繝ｼ繧ｹ縺ｫ鄒弱＠縺乗・蠖｢", icon: "Wrench" },
            { title: "陦ｨ髱｢莉穂ｸ翫￡", description: "繝ｬ繧ｶ繝ｼ縲√し繝ｩ繝ｳ繝阪ャ繝医√お繧ｯ繧ｻ繝ｼ繝檎ｭ峨°繧蛾∈謚・, icon: "Layers" },
            { title: "蜿紋ｻ倥・蝗ｺ螳・, description: "蟾ｦ蜿ｳ繧ｻ繝・ヨ縺ｮ蜉蟾･繝ｻ譚先侭莉｣霎ｼ・医Ρ繧､繝､繝ｪ繝ｳ繧ｰ蛻･・・, icon: "Zap" }
          ],
          upgrades: [
            { title: "繧ｵ繝ｩ繝ｳ繝阪ャ繝茨ｼ医Γ繝・す繝･隱ｿ・我ｻ穂ｸ翫￡", price: "51700", description: "繧ｹ繝舌Ν霆翫ｄ谺ｧ蟾櫁ｻ翫・邏疲ｭ｣縺ｫ霑代＞雉ｪ諢・ },
            { title: "繧ｨ繧ｯ繧ｻ繝ｼ繝鯉ｼ医い繝ｫ繧ｫ繝ｳ繧ｿ繝ｼ繝ｩ隱ｿ・我ｻ穂ｸ翫￡", price: "57750", description: "鬮倡ｴ壽─縺ｮ縺ゅｋ繧ｹ繧ｨ繝ｼ繝芽ｪｿ縺ｮ雉ｪ諢・ }
          ],
          notes: [
            "萓｡譬ｼ縺ｯ蟾ｦ蜿ｳ繧ｻ繝・ヨ縺ｮ萓｡譬ｼ縺ｧ縺吶ょ刈蟾･繝ｻ譚先侭莉｣繧貞性縺ｿ縺ｾ縺吶・,
            "繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ蟾･雉・・蜷ｫ縺ｿ縺ｾ縺帙ｓ縲りｻ顔ｨｮ繧・ｧ矩縺ｫ繧医ｊ霑ｽ蜉縺悟ｿ・ｦ√↑縺薙→縺後≠繧翫∪縺吶・,
            "譁ｽ蟾･縺吶ｋ繝・ぅ繝ｼ繧ｿ繝ｼ縺ｫ繧医▲縺ｦ縺ｯ繝ｬ繧ｶ繝ｼ莉穂ｸ翫￡縺後〒縺阪↑縺・ｴ蜷医′縺ゅｊ縺ｾ縺吶・,
            "繝励Λ繝ｳ莉･螟悶・縺碑ｦ∵悍・・WAY蛹悶↑縺ｩ・峨↓繧よ沐霆溘↓蟇ｾ蠢懊＞縺溘＠縺ｾ縺吶・
          ]
        },
        lineup: [
          {
            name: "繝励Λ繝ｳA・壹せ繝医Ξ繝ｼ繝医ヴ繝ｩ繝ｼ蝓九ａ霎ｼ縺ｿ",
            price: "46200",
            description: "繧ｹ繝医Ξ繝ｼ繝医ち繧､繝励・A繝斐Λ繝ｼ縺ｸ縺ｮ蝓九ａ霎ｼ縺ｿ縲りｧ貞ｺｦ豎ｺ繧∝ｾ後ヱ繝・・蠖｢縺励√Ξ繧ｶ繝ｼ縺ｧ莉穂ｸ翫￡縺ｾ縺吶ゅΞ繧ｶ繝ｼ濶ｲ縺ｯ隕区悽縺九ｉ驕ｸ謚槫庄閭ｽ縺ｧ縺吶・,
            image: "https://picsum.photos/seed/tw-plana/400/300"
          },
          {
            name: "繝励Λ繝ｳB・夂音谿雁ｽ｢迥ｶ繝斐Λ繝ｼ蝓九ａ霎ｼ縺ｿ",
            price: "69300",
            description: "荳芽ｧ堤ｪ薙′縺ゅｋY繧ｿ繧､繝励ｄ蝗幄ｧ堤ｪ薙′縺ゅｋ繝斐Λ繝ｼ縺悟ｯｾ雎｡縲ゅヱ繝・・蠖｢蠕後√お繧ｯ繧ｻ繝ｼ繝鯉ｼ医い繝ｫ繧ｫ繝ｳ繧ｿ繝ｼ繝ｩ隱ｿ・峨〒莉穂ｸ翫￡縺ｾ縺吶・,
            image: "https://picsum.photos/seed/tw-planb/400/300"
          },
          {
            name: "繝励Λ繝ｳC・壹ラ繧｢繝溘Λ繝ｼ陬上ヱ繝阪Ν蝓九ａ霎ｼ縺ｿ",
            price: "57750",
            description: "繝峨い繝溘Λ繝ｼ陬上・讓ｹ閼ゅヱ繝阪Ν縺ｫ蝓九ａ霎ｼ縺ｿ縲ゅヱ繝・・蠖｢蠕後√・繝・ヨ繝悶Λ繝・け繝壹う繝ｳ繝医〒邏疲ｭ｣縺ｮ繧医≧縺ｪ雉ｪ諢溘↓莉穂ｸ翫￡縺ｾ縺吶・,
            image: "https://picsum.photos/seed/tw-planc/400/300"
          }
        ]
      },
      {
        name: "繧ｪ繝ｪ繧ｸ繝翫Ν繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν陬ｽ菴・,
        price: "107800",
        features: ["髻ｳ謚懊￠謾ｹ蝟・, "繝ｯ繝ｳ繧ｪ繝戊｣ｽ菴・, "繧ｹ繝斐・繧ｫ繝ｼ髴ｲ蜃ｺ"],
        badge: "逅・Φ縺ｮ髻ｳ謚懊￠",
        image: "https://picsum.photos/seed/outer-baffle/800/600",
        description: "髻ｳ繧りｦ九◆逶ｮ繧よｺ雜ｳ蠎ｦ繧｢繝・・・√う繝ｳ繝翫・繝舌ャ繝輔Ν縺ｨ縺ｯ荳蜻ｳ驕輔≧謚懊￠縺ｮ濶ｯ縺・し繧ｦ繝ｳ繝峨ｒ豎ゅａ繧区婿縺ｫ縺翫☆縺吶ａ縺ｧ縺吶・n\n縺昴ｌ縺ｾ縺ｧ繧ｹ繝斐・繧ｫ繝ｼ縺ｮ髻ｳ繧帝・縺｣縺ｦ縺・◆繝峨い繝代ロ繝ｫ縺ｮ蟷ｲ貂峨′縺ｪ縺上↑繧九・縺ｧ髻ｳ縺ｮ繝後こ縺瑚憶縺上↑繧翫√ラ繧｢蜀・Κ縺ｫ貅懊∪縺｣縺ｦ縺・◆髻ｳ縺後◎縺ｮ縺ｾ縺ｾ霆雁・縺ｫ騾√ｊ蜃ｺ縺輔ｌ繧九・縺ｧ繧ｹ繝斐・繧ｫ繝ｼ縺ｮ諤ｧ閭ｽ繧呈怙螟ｧ髯舌↓蠑輔″蜃ｺ縺励ｄ縺吶￥縺ｪ繧翫∪縺吶・n\n縺ｾ縺溘∝ｼｷ蝗ｺ縺ｪ繧､繝ｳ繝翫・繝舌ャ繝輔Ν縺ｫ繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν繧定ｿｽ蜉縺吶ｋ縺薙→縺ｧ蝗ｺ螳壹・螳牙ｮ壽─縺悟｢励＠縲∝字縺ｿ縺ｮ蛻ｶ邏・°繧蛾幕謾ｾ縺輔ｌ繧九◆繧√せ繝斐・繧ｫ繝ｼ縺ｮ驕ｸ謚櫁い繧ょｺ・′繧翫∪縺吶ゅ↑縺ｫ繧医ｊ縲√せ繝斐・繧ｫ繝ｼ縺瑚｡ｨ縺ｫ隕九∴繧九□縺代〒繧よｺ雜ｳ蠎ｦ縺ｯ謚懃ｾ､縺ｧ縺呻ｼ・,
        link: "https://www.soundang.com/outer.html",
        showSavings: false,
        packageDetails: {
          standardPrice: "107800",
          savings: "0",
          contents: [
            { title: "繧ｪ繝ｪ繧ｸ繝翫Ν繧､繝ｳ繝翫・繝舌ャ繝輔Ν", description: "蝨溷床縺ｨ縺ｪ繧句ｼｷ蝗ｺ縺ｪ繧､繝ｳ繝翫・繝舌ャ繝輔Ν陬ｽ菴・, icon: "Layers" },
            { title: "繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν陬ｽ菴・, description: "霆顔ｨｮ縺ｫ蜷医ｏ縺帙◆繝ｯ繝ｳ繧ｪ繝輔・繧｢繧ｦ繧ｿ繝ｼ驛ｨ陬ｽ菴・, icon: "Wrench" },
            { title: "繝峨い繝医Μ繝蜉蟾･", description: "邏疲ｭ｣繝峨い繝代ロ繝ｫ縺ｮ邊ｾ蟇・↑蛻・炎繝ｻ蜉蟾･", icon: "Activity" },
            { title: "陦ｨ髱｢莉穂ｸ翫￡", description: "繝ｬ繧ｶ繝ｼ繧・・繧､繝ｳ繝医↓繧医ｋ鄒弱＠縺・ヵ繧｣繝九ャ繧ｷ繝･", icon: "Layers" }
          ],
          notes: [
            "萓｡譬ｼ縺ｯ蟾ｦ蜿ｳ繧ｻ繝・ヨ縺ｮ萓｡譬ｼ縺ｧ縺吶ょ刈蟾･繝ｻ譚先侭莉｣繧貞性縺ｿ縺ｾ縺吶・,
            "蠖｢迥ｶ縺ｯ霆顔ｨｮ縺ｫ繧医ｊ逡ｰ縺ｪ繧翫∪縺吶らｴ疲ｭ｣菴咲ｽｮ莉倩ｿ代ｒ荳ｭ蠢・→縺励※蜉蟾･繧定｡後＞縺ｾ縺吶・,
            "繝峨い縺ｫ繧ｹ繝斐・繧ｫ繝ｼ縺後↑縺・ｻ贋ｸ｡縺ｧ繧よ命蟾･蜿ｯ閭ｽ縺ｧ縺吶′縲∵侭驥代・蛻･騾斐＃逶ｸ隲・￥縺縺輔＞縲・,
            "霆顔ｨｮ繧・ｻ墓ｧ倥↓繧医ｊ霑ｽ蜉雋ｻ逕ｨ縺悟ｿ・ｦ√↓縺ｪ繧句ｴ蜷医′縺ゅｊ縺ｾ縺吶・
          ]
        },
        lineup: [
          {
            name: "繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν Ver.1",
            price: "107800",
            description: "繧ｷ繝ｳ繝励Ν縺ｪ1繝斐・繧ｹ讒区・縲ゅせ繝斐・繧ｫ繝ｼ莉伜ｱ槭・繧ｰ繝ｪ繝ｫ繧剃ｽｿ逕ｨ縺励∪縺吶ゅげ繝ｪ繝ｫ縺後↑縺・ｴ蜷医・蛻･騾比ｽ懈・繧ょ庄閭ｽ縺ｧ縺吶・,
            image: "https://picsum.photos/seed/outer-v1/400/300"
          },
          {
            name: "繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν Ver.2",
            price: "132000",
            description: "2繝斐・繧ｹ讒区・縺ｧ陬ｽ菴懊り牡繧・ｴ譚舌ｒ螟峨∴繧峨ｌ繧九・縺ｧ縲√き繧ｹ繧ｿ繝諢溘′繧医ｊ髫帷ｫ九▽繧､繝ｳ繧ｹ繝医・繝ｫ縺ｧ縺吶・,
            image: "https://picsum.photos/seed/outer-v2/400/300"
          },
          {
            name: "繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν Ver.3",
            price: "176000",
            description: "1繝斐・繧ｹ縺ｾ縺溘・2繝斐・繧ｹ讒区・縺ｫ縲√い繝ｫ繝溘ｄ繧｢繧ｯ繝ｪ繝ｫ縺ｧ繝・じ繧､繝ｳ蜉蟾･繧呈命縺励∪縺吶・ED霑ｽ蜉繧ょ庄閭ｽ縺ｧ縺吶・,
            image: "https://picsum.photos/seed/outer-v3/400/300"
          }
        ]
      },
      {
        name: "譛ｬ譬ｼ繧ｵ繝悶え繝ｼ繝上・繧､繝ｳ繧ｹ繝医・繝ｫ",
        price: "0",
        features: ["譛ｬ譬ｼ逧・㍾菴朱浹", "繧ｫ繧ｹ繧ｿ繝BOX蟇ｾ蠢・, "繧｢繝ｳ繝礼ｵ・∩蜷医ｏ縺・],
        badge: "驥堺ｽ朱浹蠅怜ｼｷ",
        image: "https://picsum.photos/seed/subwoofer/800/600",
        description: "縺ｨ縺｣縺ｦ繧る㍾隕√↑繧ｵ繝悶え繝ｼ繝上・縺ｮ蠖ｹ蜑ｲ・∝庄閨ｴ蟶ｯ蝓溘・縺ｻ繧薙・荳驛ｨ縺ｧ縺吶′縲∝ｻｺ迚ｩ縺ｮ蝓ｺ遉弱→蜷後§縺ｧ縺薙％縺後＠縺｣縺九ｊ縺励※縺・↑縺・→蜈ｨ菴薙・繧､繝｡繝ｼ繧ｸ縺悟ｸ瑚埋縺ｫ縺ｪ縺｣縺ｦ縺励∪縺・∪縺吶・n\n髻ｳ縺ｯ蛟埼浹縺ｧ讒区・縺輔ｌ縺ｦ縺・∪縺吶・縺ｧ縲√し繝悶え繝ｼ繝上・縺御ｸｭ蠢・〒縺ｪ縺・ｈ縺・↑繝懊・繧ｫ繝ｫ繧・ヴ繧｢繝弱・髻ｳ繧ゅ√し繝悶え繝ｼ繝上・縺ｮ繧ｪ繝ｳ繧ｪ繝輔〒讒伜､峨ｏ繧翫＠縺ｾ縺吶・iFi繧ｹ繧ｿ繧､繝ｫ縺九ｉ繝代Ρ繝ｼ繧ｵ繧ｦ繝ｳ繝峨・㍾菴朱浹繧ｹ繧ｿ繧､繝ｫ縺ｾ縺ｧ縲∬・蛻・□縺代・蛟句ｮ､繧貞･ｽ縺阪↑繧ｵ繧ｦ繝ｳ繝峨↓繧｢繝ｬ繝ｳ繧ｸ縺励※讌ｽ縺励∩縺ｾ縺励ｇ縺・ｼ・,
        showSavings: false,
        packageDetails: {
          standardPrice: "0",
          savings: "0",
          contents: [
            { title: "繧ｵ繝悶え繝ｼ繝上・繝ｦ繝九ャ繝・, description: "8繧､繝ｳ繝・20cm)縲・8繧､繝ｳ繝・45cm)縺ｾ縺ｧ蟷・ｺ・￥蟇ｾ蠢・, icon: "Music" },
            { title: "繝代Ρ繝ｼ繧｢繝ｳ繝・, description: "D繧ｯ繝ｩ繧ｹ繝｢繝弱い繝ｳ繝励ｄ2ch繝悶Μ繝・ず謗･邯壹↑縺ｩ譛驕ｩ縺ｪ鬧・虚", icon: "Zap" },
            { title: "繧ｨ繝ｳ繧ｯ繝ｭ繝ｼ繧ｸ繝｣繝ｼ(BOX)", description: "繧ｷ繝ｼ繝ｫ繝峨・繝舌せ繝ｬ繝慕ｭ峨∵ｧ閭ｽ繧貞ｼ輔″蜃ｺ縺咎←豁｣螳ｹ驥上・險ｭ險・, icon: "Wrench" },
            { title: "繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ繝ｻ蜿紋ｻ・, description: "髮ｻ貅舌・RCA繝ｻSP繧ｱ繝ｼ繝悶Ν縺ｮ驟咲ｷ壹→遒ｺ螳溘↑蝗ｺ螳壹・隱ｿ謨ｴ", icon: "Activity" }
          ],
          notes: [
            "繝輔Ο繝ｳ繝医せ繝斐・繧ｫ繝ｼ縺ｨ縺ｮ繝舌Λ繝ｳ繧ｹ繧定・∴縺・0縲・2繧､繝ｳ繝√′縺雁匡繧√〒縺吶・,
            "BOX縺ｮ險ｭ險茨ｼ亥ｮｹ驥上ｄ蠖｢迥ｶ・峨↓繧医▲縺ｦ繧ｦ繝ｼ繝上・縺ｮ諤ｧ閭ｽ縺悟､ｧ縺阪￥螟峨ｏ繧翫∪縺吶・,
            "繝医Λ繝ｳ繧ｯ險ｭ鄂ｮ譎ゅ・縲∬差迚ｩ縺ｮ遨崎ｼ峨ｒ閠・・縺励◆閼ｱ逹縺励ｄ縺吶＞蝗ｺ螳壽婿豕輔ｂ蜿ｯ閭ｽ縺ｧ縺吶・,
            "繧ｹ繝壹い繧ｿ繧､繝､繧ｹ繝壹・繧ｹ蛻ｩ逕ｨ譎ゅ・縲√ヱ繝ｳ繧ｯ陬應ｿｮ譚舌・蟶ｸ蛯吶ｒ縺雁匡繧√＠縺ｾ縺吶・,
            "繝代Ρ繝ｼ繝峨ち繧､繝暦ｼ医い繝ｳ繝怜・阡ｵ・峨↑繧峨す繝ｼ繝井ｸ狗ｭ峨・逵√せ繝壹・繧ｹ險ｭ鄂ｮ繧ょ庄閭ｽ縺ｧ縺吶・
          ]
        },
        lineup: [
          {
            name: "縺頑焔霆ｽ繝代Ρ繝ｼ繝峨し繝悶え繝ｼ繝上・險ｭ鄂ｮ",
            price: "0",
            description: "繧｢繝ｳ繝怜・阡ｵ繧ｿ繧､繝励〒繧ｳ繧ｹ繝医→繧ｹ繝壹・繧ｹ繧呈椛蛻ｶ縲ゅす繝ｼ繝井ｸ狗ｭ峨・繝・ャ繝峨せ繝壹・繧ｹ繧貞茜逕ｨ蜿ｯ閭ｽ縲りｩｳ邏ｰ縺ｯ縲後♀謇玖ｻｽ菴朱浹蠅怜ｼｷ繧ｻ繝・ヨ縲阪∈縲・,
            image: "https://picsum.photos/seed/powered-sub/400/300"
          },
          {
            name: "繧ｹ繧ｿ繝ｳ繝繝ｼ繝隠OX險ｭ鄂ｮ・医ヨ繝ｩ繝ｳ繧ｯ・・,
            price: "0",
            description: "蝗幄ｧ偵＞繧ｿ繧､繝励・邂ｱ繧定｣ｽ菴懊＠縺ｦ繝医Λ繝ｳ繧ｯ縺ｫ險ｭ鄂ｮ縲よ焔霆ｽ縺ｫ譛ｬ譬ｼ逧・↑菴朱浹繧呈･ｽ縺励ａ繧九せ繧ｿ繧､繝ｫ縲り┳逹繧り・・縺励※險ｭ鄂ｮ縺励∪縺吶・,
            image: "https://picsum.photos/seed/box-sub/400/300"
          },
          {
            name: "繝輔Ο繧｢/繧ｹ繝壹い繧ｿ繧､繝､繧ｹ繝壹・繧ｹ蝓九ａ霎ｼ縺ｿ",
            price: "0",
            description: "繧ｵ繝悶ヨ繝ｩ繝ｳ繧ｯ繧・せ繝壹い繧ｿ繧､繝､繧ｹ繝壹・繧ｹ繧貞茜逕ｨ縺励※BOX繧定｣ｽ菴懊り差迚ｩ繧堤ｩ阪ａ繧句ｮ溽畑諤ｧ縺ｨ繧ｹ繝槭・繝医↑隕九◆逶ｮ繧剃ｸ｡遶九・,
            image: "https://picsum.photos/seed/floor-sub/400/300"
          },
          {
            name: "繧ｫ繧ｹ繧ｿ繝繝ｻ繧ｷ繝ｧ繝ｼ繧｢繝・・繧､繝ｳ繧ｹ繝医・繝ｫ",
            price: "0",
            description: "LED繝ｩ繧､繝・ぅ繝ｳ繧ｰ繧・い繧ｯ繝ｪ繝ｫ繧堤ｵ・∩蜷医ｏ縺帙◆鬲・○繧九き繧ｹ繧ｿ繝縲・蜿ｰ縺縺代・繧ｪ繝ｪ繧ｸ繝翫Ν繝・じ繧､繝ｳ縺ｧ陬ｽ菴懊＠縺ｾ縺吶・,
            image: "https://picsum.photos/seed/custom-sub/400/300"
          }
        ]
      },
      {
        name: "繧ｫ繧ｹ繧ｿ繝繧､繝ｳ繧ｹ繝医・繝ｫ繝ｻ繝ｯ繝ｳ繧ｪ繝戊｣ｽ菴・,
        price: "0",
        features: ["繝医Λ繝ｳ繧ｯ繧ｫ繧ｹ繧ｿ繝", "繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν", "LED繝ｩ繧､繝・ぅ繝ｳ繧ｰ"],
        badge: "螳悟・繧ｪ繝ｼ繝繝ｼ",
        image: "https://picsum.photos/seed/custom-inst/800/600",
        description: "繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｪ繧峨〒縺ｯ・√＞縺・浹繧定ｳ縺ｧ讌ｽ縺励・縺縺代〒縺ｯ縺ｪ縺上√け繝ｼ繝ｫ縺ｪ繧､繝ｳ繧ｹ繝医・繝ｫ縺ｧ逶ｮ縺ｧ隕九※讌ｽ縺励・繧ｫ繧ｹ繧ｿ繝繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ荳也阜縲・n\n莉｣陦ｨ逧・↑蜿悶ｊ莉倥￠萓九ｒ縺皮ｴｹ莉九＠縺ｾ縺吶ょ叙繧贋ｻ倥￠繧九Θ繝九ャ繝医ｄ霆贋ｸ｡縲√∪縺溘う繝ｳ繧ｹ繝医・繝ｫ譁ｹ豕輔↓繧医ｊ雋ｻ逕ｨ縺ｯ讒倥・〒縺吶ゅ→縺ｯ縺・∴菴輔′縺ｧ縺阪※菴輔′縺ｧ縺阪↑縺・√←縺ｮ縺上ｉ縺・°縺九ｋ縺玖ｦ句ｽ薙ｂ縺､縺九↑縺・→縺・≧縺ｮ縺檎樟螳溘・縺ｨ縺薙ｍ縺縺ｨ諤昴＞縺ｾ縺吶ゅ∪縺壹・縺頑ｰ苓ｻｽ縺ｫ縺皮嶌隲・￥縺縺輔＞縲・n\n繧ｪ繝ｼ繝翫・讒倥・繧､繝｡繝ｼ繧ｸ縺吶ｋ繧ｫ繧ｹ繧ｿ繝繧貞・迴ｾ蛹悶☆繧九♀謇倶ｼ昴＞繧偵＞縺溘＠縺ｾ縺吶ゅΡ繝ｳ繧ｪ繝輔〒縺ｮ繧ｫ繧ｹ繧ｿ繝縺ｨ縺ｪ繧翫√♀霆翫ｒ遒ｺ隱阪＠縺ｪ縺後ｉ縺ｮ蝠・ｫ・′蠢・ｦ√→縺ｪ繧翫∪縺吶・縺ｧ縲√●縺ｲ縺疲擂蠎励・荳翫＃逶ｸ隲・￥縺縺輔＞縲・,
        showSavings: false,
        packageDetails: {
          standardPrice: "0",
          savings: "0",
          contents: [
            { title: "繝・じ繧､繝ｳ繝ｻ險ｭ險・, description: "霆贋ｸ｡蠖｢迥ｶ縺ｨ讖滓攝縺ｫ蜷医ｏ縺帙◆繝ｯ繝ｳ繧ｪ繝輔ョ繧ｶ繧､繝ｳ", icon: "Layers" },
            { title: "騾菴懊・蜉蟾･", description: "MDF縲√い繧ｯ繝ｪ繝ｫ縲√ヱ繝・ｭ峨ｒ逕ｨ縺・◆鬮伜ｺｦ縺ｪ蜉蟾･謚陦・, icon: "Wrench" },
            { title: "莉穂ｸ翫￡繝ｻ陬・｣ｾ", description: "繝ｬ繧ｶ繝ｼ縲√・繧､繝ｳ繝医´ED繝ｩ繧､繝・ぅ繝ｳ繧ｰ遲峨・貍泌・", icon: "Activity" },
            { title: "髻ｳ髻ｿ繝√Η繝ｼ繝九Φ繧ｰ", description: "繧ｫ繧ｹ繧ｿ繝迺ｰ蠅・↓蜷医ｏ縺帙◆譛驕ｩ縺ｪ繧ｵ繧ｦ繝ｳ繝芽ｪｿ謨ｴ", icon: "Music" }
          ],
          notes: [
            "險倩ｼ峨＠縺ｦ縺・ｋ萓｡譬ｼ縺ｯ荳萓九〒縺吶よ命蟾･蜀・ｮｹ縺ｫ繧医ｊ螟ｧ縺阪￥螟牙虚縺励∪縺吶・,
            "繝ｯ繝ｳ繧ｪ繝戊｣ｽ菴懊・縺溘ａ縲√♀霆翫ｒ縺企舌°繧翫＠縺ｦ縺ｮ菴懈･ｭ縺ｨ縺ｪ繧翫∪縺吶・,
            "譌｢蟄倥Θ繝九ャ繝医・遘ｻ險ｭ繧・叙繧雁､悶＠縺悟ｿ・ｦ√↑蝣ｴ蜷医・縲∝挨騾碑ｲｻ逕ｨ縺檎匱逕溘＠縺ｾ縺吶・,
            "縺ｾ縺壹・縺疲擂蠎励＞縺溘□縺阪√＃隕∵悍繧偵♀閨槭°縺帙￥縺縺輔＞縲ゅ♀隕狗ｩ阪ｂ繧翫ｒ菴懈・縺・◆縺励∪縺吶・
          ]
        },
        lineup: [
          {
            name: "繝医Λ繝ｳ繧ｯ繝ｻ繧ｫ繝ｼ繧ｴ繧ｹ繝壹・繧ｹ繧､繝ｳ繧ｹ繝医・繝ｫ",
            price: "100000",
            description: "繝輔Ο繧｢縺ｸ縺ｮ蝓九ａ霎ｼ縺ｿ繧・き繝舌・陬ｽ菴懊ゅき繝・さ繧医＆縺ｨ螳溽畑諤ｧ繧剃ｸ｡遶九ゅす繝ｳ繝励Ν縺ｪ繧ｷ繧ｹ繝・Β縺ｧ縺翫ｈ縺・0荳・・縲懊・,
            image: "https://picsum.photos/seed/trunk-inst/400/300"
          },
          {
            name: "繧ｻ繝繝ｳ繧ｿ繧､繝励ヨ繝ｩ繝ｳ繧ｯ繧､繝ｳ繧ｹ繝医・繝ｫ",
            price: "150000",
            description: "閭後ｂ縺溘ｌ陬上∈縺ｮ繧ｦ繝ｼ繝上・蝓九ａ霎ｼ縺ｿ繧・い繝ｳ繝励・繝ｼ繝芽｣ｽ菴懊りｻ贋ｸ｡讒矩縺ｫ繧医ｊ縺ｾ縺吶′縺翫ｈ縺・5荳・・縲懊・,
            image: "https://picsum.photos/seed/sedan-trunk/400/300"
          },
          {
            name: "繝峨い繧ｫ繧ｹ繧ｿ繝繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν陬ｽ菴・,
            price: "200000",
            description: "邏疲ｭ｣繝代ロ繝ｫ縺ｫ鬥ｴ譟薙・繧ｫ繧ｹ繧ｿ繝繧､繝ｳ繧ｹ繝医・繝ｫ縲る浹雉ｪ蜷台ｸ翫・縺溘ａ縺ｮ繧､繝ｳ繝翫・讒矩縺ｫ繧よ鋸繧翫∪縺吶ょｷｦ蜿ｳ縺ｧ縺翫ｈ縺・0荳・・縲懊・,
            image: "https://picsum.photos/seed/door-outer/400/300"
          },
          {
            name: "繝峨い繝代ロ繝ｫ蜈ｨ髱｢譁ｽ蟾･繝ｻ繧ｨ繝ｳ繧ｯ繝ｭ繝ｼ繧ｸ繝｣繝ｼ",
            price: "250000",
            description: "繝代ロ繝ｫ荳ｸ縺斐→蠑ｵ繧頑崛縺医ｄ繧ｨ繝ｳ繧ｯ繝ｭ繝ｼ繧ｸ繝｣繝ｼ蛹悶る浹貍上ｌ霆ｽ貂帙ｄ髻ｳ雉ｪ豼螟峨ゅ♀繧医◎25荳・・縲・0荳・・縲・,
            image: "https://picsum.photos/seed/door-full/400/300"
          },
          {
            name: "繧ｫ繧ｹ繧ｿ繝繝斐Λ繝ｼ繧､繝ｳ繧ｹ繝医・繝ｫ・・WAY蟇ｾ蠢懶ｼ・,
            price: "80000",
            description: "繝輔Ο繝ｳ繝・WAY縺ｫ谺縺九○縺ｪ縺・ヴ繝ｩ繝ｼ蜉蟾･縲ゅせ繧ｳ繝ｼ繧ｫ繝ｼ縺ｨ繝・ぅ繝ｼ繧ｿ繝ｼ繧堤ｾ弱＠縺城・鄂ｮ縲ょｷｦ蜿ｳ縺ｧ縺翫ｈ縺・荳・・縲懊・,
            image: "https://picsum.photos/seed/pillar-3way/400/300"
          },
          {
            name: "繧ｫ繧ｹ繧ｿ繝繧ｳ繝ｳ繧ｽ繝ｼ繝ｫ繝ｻ繝｢繝九ち繝ｼ蜉蟾･",
            price: "100000",
            description: "繧ｻ繝ｳ繧ｿ繝ｼ繧ｳ繝ｳ繧ｽ繝ｼ繝ｫ陬ｽ菴懊ｄ繝｢繝九ち繝ｼ縺ｮ蝓九ａ霎ｼ縺ｿ蜉蟾･縲ょ茜萓ｿ諤ｧ縺ｨ繝・じ繧､繝ｳ繧剃ｸ｡遶九ゅ♀繧医◎10荳・・縲・0荳・・縲・,
            image: "https://picsum.photos/seed/console-monitor/400/300"
          }
        ]
      }
    ]
  },
  {
    id: 'performance_up',
    category: "諤ｧ閭ｽ繧呈峩縺ｫ蠑輔″蜃ｺ縺吶い繝ｬ繧ｳ繝ｬ",
    type: 'audio',
    description: "繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ貅舌→縺ｪ繧矩崕貅舌ｒ謾ｹ蝟・☆繧九％縺ｨ縺ｧ縲∵ｩ滓攝縺ｮ諤ｧ閭ｽ繧剃ｻ翫ｈ繧翫ｂ繧ゅ▲縺ｨ蠑輔″蜃ｺ縺呎婿豕輔ｄ縺翫☆縺吶ａ縺ｮ繝代・繝・ｒ縺皮ｴｹ莉九＠縺ｾ縺吶・n\n髮ｻ貅舌・雉ｪ縺ｯ譛邨ら噪縺ｪ髻ｳ蜒上・繧ｹ繝・Ξ繧ｪ繧､繝｡繝ｼ繧ｸ縺ｫ螟ｧ縺阪↑蠖ｱ髻ｿ繧剃ｸ弱∴縺ｾ縺吶る崕貅千ｳｻ縺ｫ縺薙□繧上ｋ縺薙→縺ｯS/N繧・ｧ｣蜒丞ｺｦ繧｢繝・・縺ｫ蜉・噪縺ｪ蜉ｹ譫懊′迴ｾ繧後∪縺吶・,
    showDescriptionInMenu: true,
    showDescriptionInList: true,
    items: [
      {
        name: "髮ｻ貅舌ヰ繝・峩繝ｬ繧ｰ繧ｶ繝・ヨ繧ｳ繝ｼ繧ｹ",
        price: "42240",
        features: ["繝上う繧ｰ繝ｬ繝ｼ繝蛾・邱・, "S/N蜷台ｸ・, "隗｣蜒丞ｺｦ繧｢繝・・"],
        badge: "繝上う繧ｰ繝ｬ繝ｼ繝・,
        image: "https://picsum.photos/seed/power-rexat/800/600",
        description: "DSP繧・・繝・ラ繝ｦ繝九ャ繝医・蟶ｸ譎る崕貅舌ｒ繧ｪ繝ｼ繝・ぅ繧ｪ繝・け繝九き縺ｮ繝上う繧ｰ繝ｬ繝ｼ繝峨す繝ｪ繝ｼ繧ｺ縲舌Ξ繧ｰ繧ｶ繝・ヨ繧ｷ繝ｪ繝ｼ繧ｺ縲代〒繝舌ャ繝・Μ繝ｼ縺九ｉ逶ｴ謗･繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ縺励∪縺吶・4AWG繧・譛ｬ蠑輔″霎ｼ繧縺薙→縺ｧ縲√す繧ｹ繝・Β縺ｫ蠢懊§縺滓怙驕ｩ縺ｪ髮ｻ貅蝉ｾ帷ｵｦ繧貞庄閭ｽ縺ｫ縺励∪縺吶・,
        packageDetails: {
          standardPrice: "0",
          savings: "0",
          contents: [
            { title: "繧ｱ繝ｼ繝悶Ν", description: "繧ｪ繝ｼ繝・ぅ繧ｪ繝・け繝九き 繝ｬ繧ｰ繧ｶ繝・ヨ AT-RX3514P (14AWG) x 2譛ｬ", icon: "Zap" },
            { title: "繝代・繝・, description: "鬮倬浹雉ｪ繝偵Η繝ｼ繧ｺ繝帙Ν繝繝ｼ縲！繝偵Η繝ｼ繧ｺ縲・≡繝｡繝・く遶ｯ蟄千ｭ・, icon: "Layers" },
            { title: "譁ｽ蟾･", description: "繝舌ャ繝・Μ繝ｼ縺九ｉ繝ｦ繝九ャ繝医∪縺ｧ縺ｮ逶ｴ謗･繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ繝ｻ繧､繝ｳ繧ｹ繝医・繝ｫ", icon: "Wrench" }
          ],
          notes: [
            "繝ｦ繝九ャ繝医・險ｭ鄂ｮ蝣ｴ謇縺後ヰ繝・ユ繝ｪ繝ｼ縺ｨ髮｢繧後※縺・ｋ蝣ｴ蜷医・繧ｱ繝ｼ繝悶Ν莉｣驥代′霑ｽ蜉縺ｨ縺ｪ繧翫∪縺吶・,
            "繝懊Φ繝阪ャ繝医ヰ繝・ユ繝ｪ繝ｼ縺九ｉ繧ｷ繝ｼ繝井ｸ汽SP險ｭ鄂ｮ繧呈Φ螳壹＠縺滉ｾ｡譬ｼ縺ｧ縺吶・
          ]
        }
      },
      {
        name: "髮ｻ貅舌ヰ繝・峩繧ｹ繧ｿ繝ｳ繝繝ｼ繝峨さ繝ｼ繧ｹ",
        price: "27390",
        features: ["螳牙ｮ壻ｾ帷ｵｦ", "邏疲ｭ｣豈斐い繝・・繧ｰ繝ｬ繝ｼ繝・, "繧ｳ繧ｹ繝医ヱ繝輔か繝ｼ繝槭Φ繧ｹ"],
        badge: "繧ｹ繧ｿ繝ｳ繝繝ｼ繝・,
        image: "https://picsum.photos/seed/power-std/800/600",
        description: "繝翫ン繝ｻDSP縺ｮ蟶ｸ譎る崕貅舌ｒ逶ｴ謗･繝舌ャ繝・Μ繝ｼ縺九ｉ繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ縺励∪縺吶ゆｸ闊ｬ逧・↑邏疲ｭ｣繝上・繝阪せ繧医ｊ螟ｪ縺・2AWG繧ｱ繝ｼ繝悶Ν・医が繝ｼ繝・ぅ繧ｪ繝・け繝九き TPC-12・峨ｒ菴ｿ逕ｨ縺励・崕貅蝉ｾ帷ｵｦ繧貞ｮ牙ｮ壹＆縺帙∪縺吶・,
        packageDetails: {
          standardPrice: "0",
          savings: "0",
          contents: [
            { title: "繧ｱ繝ｼ繝悶Ν", description: "繧ｪ繝ｼ繝・ぅ繧ｪ繝・け繝九き TPC12 (12AWG) x 2譛ｬ", icon: "Zap" },
            { title: "繝代・繝・, description: "繧ｪ繝ｼ繝・ぅ繧ｪ繝・け繝九き TFH-RATC縲、TC繝偵Η繝ｼ繧ｺ縲∫ｫｯ蟄宣｡・, icon: "Layers" },
            { title: "譁ｽ蟾･", description: "繝舌ャ繝・Μ繝ｼ縺九ｉ繝ｦ繝九ャ繝医∪縺ｧ縺ｮ逶ｴ謗･繝ｯ繧､繝､繝ｪ繝ｳ繧ｰ繝ｻ繧､繝ｳ繧ｹ繝医・繝ｫ", icon: "Wrench" }
          ],
          notes: [
            "繝ｦ繝九ャ繝医・險ｭ鄂ｮ蝣ｴ謇縺後ヰ繝・ユ繝ｪ繝ｼ縺ｨ髮｢繧後※縺・ｋ蝣ｴ蜷医・繧ｱ繝ｼ繝悶Ν莉｣驥代′霑ｽ蜉縺ｨ縺ｪ繧翫∪縺吶・,
            "繝懊Φ繝阪ャ繝医ヰ繝・ユ繝ｪ繝ｼ縺九ｉ繧ｷ繝ｼ繝井ｸ汽SP險ｭ鄂ｮ繧呈Φ螳壹＠縺滉ｾ｡譬ｼ縺ｧ縺吶・
          ]
        }
      },
      {
        name: "繝溘ル繧ｭ繝｣繝代す繧ｿ繝ｼ繧ｳ繝ｼ繧ｹ",
        price: "34650",
        features: ["菴主沺縺ｮ蜀咲樟諤ｧ", "繝ｪ繧｢繝ｫ縺ｪ陦ｨ迴ｾ蜉・, "迸ｬ逋ｺ蜉帛髄荳・],
        badge: "髻ｳ雉ｪ謾ｹ蝟・,
        image: "https://picsum.photos/seed/capacitor/800/600",
        description: "BA繝ｩ繝・BE-101J's 繧貞ｰ主・縲り・諢滉ｸ翫・S/N蜷台ｸ翫・浹縺ｮ霈ｪ驛ｭ縲√せ繝ｪ繝ｪ繝ｳ繧ｰ縺ｧ繝ｪ繧｢繝ｫ縺ｪ陦ｨ迴ｾ蜉帙∫椪逋ｺ蜉帙→繧ｿ繧､繝医↑菴主沺縺ｮ蜀咲樟諤ｧ縺御ｽ馴ｨ薙〒縺阪∪縺吶・,
        packageDetails: {
          standardPrice: "34650",
          savings: "0",
          contents: [
            { title: "繝ｦ繝九ャ繝・, description: "BA繝ｩ繝・BE-101J's (蝠・刀萓｡譬ｼ 26,950蜀・", icon: "Activity" },
            { title: "譁ｽ蟾･", description: "蝓ｺ譛ｬ蜿悶ｊ莉倥￠蟾･雉・ｾｼ縺ｿ", icon: "Wrench" }
          ],
          notes: [
            "閼ｱ逹蜀・ｮｹ繧・命蟾･蝣ｴ謇縺ｫ繧医ｊ蜿悶ｊ莉倥￠蟾･雉・′蛻･騾泌ｿ・ｦ√↓縺ｪ繧九％縺ｨ縺後≠繧翫∪縺吶・
          ]
        }
      },
      {
        name: "莉ｮ諠ｳ繧｢繝ｼ繧ｹ繧ｳ繝ｼ繧ｹ",
        price: "25300",
        features: ["鬮伜捉豕｢繝弱う繧ｺ蟇ｾ遲・, "GND髱｢遨肴僑螟ｧ", "S/N繧｢繝・・"],
        badge: "繝弱う繧ｺ謚大宛",
        image: "https://picsum.photos/seed/ground/800/600",
        description: "KOJO TECHNOLOGY NVe06 繧貞ｰ主・縲るｫ伜捉豕｢繝弱う繧ｺ蟇ｾ遲悶↓迚ｹ蛹悶＠縲√う繝ｳ繝舌・繧ｿ繧・せ繧､繝・メ繝ｳ繧ｰ髮ｻ貅舌∝・驛ｨ繧ｯ繝ｭ繝・け縺ｪ縺ｩ縺九ｉ逋ｺ逕溘☆繧九ヮ繧､繧ｺ繧呈椛蛻ｶ繝ｻ貂幄｡ｰ縺輔○縺ｾ縺吶ょｰ丞梛縺ｪ縺後ｉ蠎・､ｧ縺ｪGND髱｢遨阪ｒ菫晄怏縺励∪縺吶・,
        packageDetails: {
          standardPrice: "25300",
          savings: "0",
          contents: [
            { title: "繝ｦ繝九ャ繝・, description: "KOJO TECHNOLOGY NVe06 (蝠・刀萓｡譬ｼ 17,600蜀・", icon: "Activity" },
            { title: "譁ｽ蟾･", description: "蝓ｺ譛ｬ蜿悶ｊ莉倥￠蟾･雉・ｾｼ縺ｿ", icon: "Wrench" }
          ],
          notes: [
            "閼ｱ逹蜀・ｮｹ繧・命蟾･蝣ｴ謇縺ｫ繧医ｊ蜿悶ｊ莉倥￠蟾･雉・′蛻･騾泌ｿ・ｦ√↓縺ｪ繧九％縺ｨ縺後≠繧翫∪縺吶・
          ]
        }
      }
    ]
  },
  {
    id: 'security_panthera',
    category: "Panthera (繝代Φ繝・・繝ｩ)",
    type: 'security',
    items: [
      { name: "Z706繧ｷ繝ｪ繝ｼ繧ｺ", price: "286000", features: ["繝輔Ν繧ｫ繝ｩ繝ｼ繧ｿ繝・メ繝代ロ繝ｫ繝ｪ繝｢繧ｳ繝ｳ", "3繧ｾ繝ｼ繝ｳ陦晄茶繧ｻ繝ｳ繧ｵ繝ｼ", "繝・ず繧ｿ繝ｫ蛯ｾ譁懊そ繝ｳ繧ｵ繝ｼ", "繝峨Λ繝ｬ繧ｳ騾｣蜍募ｯｾ蠢・], badge: "譛鬮伜ｳｰ繝｢繝・Ν", image: "/images/Top/security.webp" },
      { name: "Z306繧ｷ繝ｪ繝ｼ繧ｺ", price: "242000", features: ["繝｢繝弱け繝ｭ豸ｲ譎ｶ繝ｪ繝｢繧ｳ繝ｳ", "2繧ｾ繝ｼ繝ｳ陦晄茶繧ｻ繝ｳ繧ｵ繝ｼ", "繧､繝｢繝薙Λ繧､繧ｶ繝ｼ", "繝懊う繧ｹ繧｢繝ｳ繧ｵ繝ｼ繝舌ャ繧ｯ"], badge: "繧ｹ繧ｿ繝ｳ繝繝ｼ繝・, image: "/images/Top/security.webp" },
      { name: "Z106繧ｷ繝ｪ繝ｼ繧ｺ", price: "198000", features: ["1WAY繝ｪ繝｢繧ｳ繝ｳ", "陦晄茶繧ｻ繝ｳ繧ｵ繝ｼ", "繝峨い繧ｻ繝ｳ繧ｵ繝ｼ", "繝懊Φ繝阪ャ繝医そ繝ｳ繧ｵ繝ｼ"], badge: "繧ｨ繝ｳ繝医Μ繝ｼ", image: "/images/Top/security.webp" }
    ]
  },
  {
    id: 'security_grgo',
    category: "Grgo (繧ｴ繝ｫ繧ｴ)",
    type: 'security',
    items: [
      { name: "ZV繧ｷ繝ｪ繝ｼ繧ｺ", price: "165000", features: ["繧｢繝ｳ繧ｵ繝ｼ繝舌ャ繧ｯ繝ｪ繝｢繧ｳ繝ｳ", "繝槭う繧ｯ繝ｭ豕｢繧ｻ繝ｳ繧ｵ繝ｼ蟇ｾ蠢・, "證苓ｨｼ逡ｪ蜿ｷ蠑剰ｧ｣髯､", "邏疲ｭ｣繧ｭ繝ｼ騾｣蜍募庄"], badge: "莠ｺ豌湧o.1", image: "/images/security.jpg" },
      { name: "V繧ｷ繝ｪ繝ｼ繧ｺ", price: "132000", features: ["1WAY繝ｪ繝｢繧ｳ繝ｳ", "陦晄茶繧ｻ繝ｳ繧ｵ繝ｼ", "繝峨い繧ｻ繝ｳ繧ｵ繝ｼ", "繧ｹ繝・・繧ｿ繧ｹLED"], badge: "繧ｳ繧ｹ繝鷹㍾隕・, image: "/images/security.jpg" },
      { name: "1/0繧ｷ繝ｪ繝ｼ繧ｺ", price: "99000", features: ["邏疲ｭ｣繧ｭ繝ｼ繝ｬ繧ｹ騾｣蜍・, "繧ｷ繝ｳ繝励Ν讒区・", "隱､菴懷虚髦ｲ豁｢讖溯・"], badge: "繧ｹ繝槭・繝域命蟾･", image: "/images/security.jpg" }
    ]
  },
  {
    id: 'security_viper',
    category: "VIPER (繝舌う繝代・)",
    type: 'security',
    items: [
      { name: "DS4V", price: "110000", features: ["繧ｹ繝槭・騾｣蜍・, "繧ｨ繝ｳ繧ｸ繝ｳ繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ蜀・鳩", "邏疲ｭ｣繧ｭ繝ｼ繝ｬ繧ｹ騾｣蜍・], badge: "譛譁ｰ繝・ず繧ｿ繝ｫ", image: "/images/security.jpg" },
      { name: "5706V", price: "132000", features: ["豸ｲ譎ｶ繧｢繝ｳ繧ｵ繝ｼ繝舌ャ繧ｯ繝ｪ繝｢繧ｳ繝ｳ", "繧ｨ繝ｳ繧ｸ繝ｳ繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ", "2谿ｵ髫手｡晄茶繧ｻ繝ｳ繧ｵ繝ｼ"], badge: "螳夂分繝｢繝・Ν", image: "/images/security.jpg" },
      { name: "330V", price: "77000", features: ["邏疲ｭ｣繧ｭ繝ｼ繝ｬ繧ｹ騾｣蜍・, "陦晄茶繧ｻ繝ｳ繧ｵ繝ｼ", "繝峨い繧ｻ繝ｳ繧ｵ繝ｼ"], badge: "繧ｨ繝ｳ繝医Μ繝ｼ", image: "/images/security.jpg" }
    ]
  },
  {
    id: 'security_clifford',
    category: "CLIFFORD (繧ｯ繝ｪ繝輔か繝ｼ繝・",
    type: 'security',
    items: [
      { name: "G6繧ｷ繝ｪ繝ｼ繧ｺ", price: "220000", features: ["繧ｪ繝繝九そ繝ｳ繧ｵ繝ｼ", "繝悶Λ繝・け繧ｸ繝｣繝・け繧ｹ繧ｷ繧ｹ繝・Β", "繝繝悶Ν繧､繝｢繝薙Λ繧､繧ｶ繝ｼ"], badge: "荳也阜譛鬮伜ｳｰ", image: "/images/security.jpg" },
      { name: "Matrix繧ｷ繝ｪ繝ｼ繧ｺ", price: "154000", features: ["繧｢繝ｳ繧ｵ繝ｼ繝舌ャ繧ｯ繝ｪ繝｢繧ｳ繝ｳ", "繧ｨ繝ｳ繧ｸ繝ｳ繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ蟇ｾ蠢・, "鬮倡ｲｾ蠎ｦ繧ｻ繝ｳ繧ｵ繝ｼ"], badge: "鬮俶ｧ閭ｽ", image: "/images/security.jpg" }
    ]
  },
  {
    id: 'security_car',
    category: "霆顔ｨｮ蛻･縺翫☆縺吶ａ繝代ャ繧ｱ繝ｼ繧ｸ",
    type: 'security',
    items: [
      { name: "SUV / 繝ｩ繝ｳ繝峨け繝ｫ繝ｼ繧ｶ繝ｼ / 繧｢繝ｫ繝輔ぃ繝ｼ繝・, price: "350000", features: ["Panthera Z706", "CLIFFORD G6", "繝繝悶Ν繧ｬ繝ｼ繝画命蟾･"], badge: "譛蠑ｷ繝励Λ繝ｳ", image: "/images/security.jpg" },
      { name: "繧ｹ繝昴・繝・き繝ｼ / 繝励Ξ繝溘い繝繧ｻ繝繝ｳ", price: "280000", features: ["Grgo ZV", "VIPER DS4", "繧ｨ繝ｳ繧ｸ繝ｳ繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ"], badge: "蠢ｫ驕ｩ繝ｻ螳牙ｿ・, image: "/images/security.jpg" },
      { name: "繧ｳ繝ｳ繝代け繝医き繝ｼ / 霆ｽ閾ｪ蜍戊ｻ・, price: "150000", features: ["Grgo V繧ｷ繝ｪ繝ｼ繧ｺ", "VIPER 330V", "邏疲ｭ｣繧ｭ繝ｼ繝ｬ繧ｹ騾｣蜍・], badge: "縺頑焔霆ｽ繝励Λ繝ｳ", image: "/images/security.jpg" }
    ]
  },
  {
    id: 'dashcam',
    category: "繝峨Λ繧､繝悶Ξ繧ｳ繝ｼ繝繝ｼ",
    type: 'others',
    items: [
      { name: "蜑榊ｾ・繧ｫ繝｡繝ｩ繝｢繝・Ν", price: "44000", features: ["繝輔ΝHD骭ｲ逕ｻ", "螟憺俣陬懈ｭ｣", "鬧占ｻ顔屮隕門ｯｾ蠢・, "繧ｻ繧ｭ繝･繝ｪ繝・ぅ騾｣蜍募庄"], badge: "螳夂分莠ｺ豌・, image: "/images/Top/dorareko.webp" },
      { name: "360蠎ｦ・九Μ繧｢繧ｫ繝｡繝ｩ", price: "66000", features: ["蜈ｨ譁ｹ菴埼鹸逕ｻ", "豁ｻ隗偵↑縺・, "辣ｽ繧企°霆｢蟇ｾ遲・, "繧ｻ繧ｭ繝･繝ｪ繝・ぅ騾｣蜍募庄"], badge: "豁ｻ隗偵ぞ繝ｭ", image: "/images/Top/dorareko.webp" }
    ]
  },
  {
    id: 'digital_mirror',
    category: "繝・ず繧ｿ繝ｫ繧､繝ｳ繝翫・繝溘Λ繝ｼ",
    type: 'others',
    items: [
      { name: "繧｢繝ｫ繝代う繝ｳ 邏疲ｭ｣莠､謠帛梛", price: "77000", features: ["蜑榊ｾ後ラ繝ｩ繝ｬ繧ｳ讖溯・莉・, "螟憺俣魄ｮ譏取丐蜒・, "繧ｿ繝・メ繝代ロ繝ｫ謫堺ｽ・], badge: "隕也阜繧ｯ繝ｪ繧｢", image: "/images/dorareko.jpg" },
      { name: "繧｢繝ｫ繝代う繝ｳ 繝舌Φ繝牙崋螳壼梛", price: "55000", features: ["邁｡蜊伜叙繧贋ｻ倥￠", "蠎・ｧ偵Ξ繝ｳ繧ｺ", "鬧占ｻ顔屮隕門ｯｾ蠢・], badge: "縺頑焔讌ｽ蟆主・", image: "/images/dorareko.jpg" }
    ]
  },
  {
    id: 'radar',
    category: "繝ｬ繝ｼ繝繝ｼ謗｢遏･讖・/ 繝ｬ繝ｼ繧ｶ繝ｼ蜿嶺ｿ｡讖・,
    type: 'others',
    items: [
      { name: "繧ｻ繝代Ξ繝ｼ繝亥梛繝ｬ繝ｼ繝繝ｼ", price: "49500", features: ["譛譁ｰ遘ｻ蜍募ｼ上が繝ｼ繝薙せ蟇ｾ蠢・, "辟｡邱哭AN譖ｴ譁ｰ", "OBDII蟇ｾ蠢・], badge: "譛蠑ｷ諢溷ｺｦ", image: "/images/dorareko.jpg" },
      { name: "繝ｯ繝ｳ繝懊ョ繧｣蝙九Ξ繝ｼ繝繝ｼ", price: "38500", features: ["繝輔Ν繝槭ャ繝苓｡ｨ遉ｺ", "繝ｬ繝ｼ繧ｶ繝ｼ蜈牙女菫｡", "繧ｿ繝・メ繝代ロ繝ｫ"], badge: "莠ｺ豌励Δ繝・Ν", image: "/images/dorareko.jpg" }
    ]
  },
  {
    id: 'safety_device',
    category: "鄂ｮ縺榊悉繧企亟豁｢螳牙・陬・ｽｮ",
    type: 'others',
    items: [
      { name: "繝帙・繝阪ャ繝郁ｻ雁・鄂ｮ縺榊悉繧企亟豁｢繧ｷ繧ｹ繝・Β", price: "88000", features: ["髯崎ｻ頑凾遒ｺ隱阪ヶ繧ｶ繝ｼ", "霆雁・繧ｻ繝ｳ繧ｵ繝ｼ讀懃衍", "螟夜Κ繧ｵ繧､繝ｬ繝ｳ騾夂衍"], badge: "陬懷勧驥大ｯｾ蠢・, image: "/images/Top/dorareko.webp" },
      { name: "繝舌せ蟆ら畑螳牙・陬・ｽｮ", price: "110000", features: ["隍・焚繧ｻ繝ｳ繧ｵ繝ｼ騾｣蜍・, "邱頑･騾壼ｱ讖溯・", "髻ｳ螢ｰ繧ｬ繧､繝繝ｳ繧ｹ"], badge: "鬮倅ｿ｡鬆ｼ諤ｧ", image: "/images/Top/dorareko.webp" }
    ]
  },
  {
    id: 'campit',
    category: "Campit (繧ｭ繝｣繝ｳ繝斐ャ繝・",
    type: 'others',
    items: [
      { name: "繝昴・繧ｿ繝悶Ν髮ｻ貅占ｵｰ陦悟・髮ｻ繧ｷ繧ｹ繝・Β", price: "132000", features: ["繧ｵ繝悶ヰ繝・ユ繝ｪ繝ｼ荳崎ｦ・, "諤･騾溷・髮ｻ", "蟆ら畑驟咲ｷ壽命蟾･"], badge: "霆贋ｸｭ豕企擠蜻ｽ", image: "/images/Top/dorareko.webp" },
      { name: "霆雁・AC100V繧ｳ繝ｳ繧ｻ繝ｳ繝亥｢苓ｨｭ", price: "44000", features: ["邏疲ｭ｣鬚ｨ莉穂ｸ翫￡", "螟ｧ螳ｹ驥上う繝ｳ繝舌・繧ｿ繝ｼ蟇ｾ蠢・, "螳牙・蝗櫁ｷｯ險ｭ險・], badge: "蠢ｫ驕ｩ髮ｻ陬・, image: "/images/Top/dorareko.webp" }
    ]
  }
];

const initialOptionals: OptionalService[] = [
  { id: 'deadening_opt', name: "讓呎ｺ悶ョ繝・ラ繝九Φ繧ｰ", price: "0", description: "繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙・繝ｩ繝ｳ縺ｫ縺ｯ讓呎ｺ悶〒莉伜ｱ槭ょｷｮ鬘阪〒荳贋ｽ阪・繝ｩ繝ｳ縺ｸ縺ｮ螟画峩繧ょ庄閭ｽ縺ｧ縺吶・, effect: "髻ｳ縺ｮ邱縺ｾ繧雁髄荳・, percentage: 40, image: "/images/Top/speaker.webp" },
  { id: 'cable_opt', name: "繧ｹ繝斐・繧ｫ繝ｼ繧ｱ繝ｼ繝悶Ν", price: "0", description: "讓呎ｺ悶こ繝ｼ繝悶Ν縺御ｻ伜ｱ槭ょｷｮ鬘阪〒鬮倬浹雉ｪOFC繧ｱ繝ｼ繝悶Ν遲峨∈繧｢繝・・繧ｰ繝ｬ繝ｼ繝牙庄閭ｽ縺ｧ縺吶・, effect: "諠・ｱ驥酋P", percentage: 30, image: "/images/Top/speaker.webp" },
  { id: 'tuning_opt', name: "繧ｵ繧ｦ繝ｳ繝峨メ繝･繝ｼ繝九Φ繧ｰ", price: "0", description: "蠖灘ｺ励〒縺碑ｳｼ蜈･繝ｻ譁ｽ蟾･縺・◆縺縺・◆縺雁ｮ｢讒倥↓縺ｯ縲∫┌譁吶〒髻ｳ髻ｿ隱ｿ謨ｴ繧定｡後▲縺ｦ縺翫ｊ縺ｾ縺吶・, effect: "魄ｮ蠎ｦ蝗槫ｾｩ", percentage: 100, image: "/images/Top/speaker.webp" },
];

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Normalize a stored image path: only lowercase the FILENAME, preserve folder casing
  const normalizeStoredImagePath = (path: string | undefined): string | undefined => {
    if (!path) return path;
    // Already a fully valid external URL 竊・leave untouched
    if (path.startsWith('http')) return path;
    // Ensure leading slash
    const p = path.startsWith('/') ? path : '/' + path;
    // Only lowercase the filename part 窶・folder names stay as-is (Vercel is case-sensitive)
    const lastSlash = p.lastIndexOf('/');
    const folder = p.substring(0, lastSlash + 1); // preserve original casing for folders
    const file = p.substring(lastSlash + 1).toLowerCase(); // lowercase filename only
    return folder + file;
  };

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

              // Normalize the saved image path to fix stale uppercase/wrong paths
              const normalizedSavedImage = normalizeStoredImagePath(savedItem.image);
              return {
                ...initialItem,
                ...savedItem,
                // Dashboard (savedItem) wins, but path is normalized; fall back to cms.json
                image: normalizedSavedImage || initialItem.image,
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
      text: "縲千ｷ頑･縺ｮ縺顔衍繧峨○縲醍樟蝨ｨ縲∵命蟾･莠育ｴ・′螟ｧ螟画ｷｷ縺ｿ蜷医▲縺ｦ縺翫ｊ縺ｾ縺吶ゅ♀譌ｩ繧√↓縺皮嶌隲・￥縺縺輔＞縲・,
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
  if (isNaN(num) || num === 0) return "隕∫嶌隲・/ ASK";
  return `ﾂ･${num.toLocaleString()}縲彖;
};
