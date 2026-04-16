import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import cmsData from '../data/cms.json';

export interface Partner {
  id: string;
  name: string;
  location: string;
  url: string;
  description: string;
}

export interface BrandPartner {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: 'ShieldCheck' | 'Speaker' | 'Video' | 'Globe';
  url: string;
}

export interface SiteAssets {
  heroImage: string;
  logoText: string;
  audioMenuImage: string;
  securityMenuImage: string;
  dashcamMenuImage: string;
  showroomImage: string;
  pitImage: string;
  workspaceImage: string;
  auditionRoomImage: string;
  kyushuNo1Image: string;
  spsCertifiedImage: string;
  snaponImage: string;
  batteryChargerImage: string;
}

interface SiteContextType {
  partners: Partner[];
  brandPartners: BrandPartner[];
  assets: SiteAssets;
  updatePartner: (id: string, updated: Partial<Partner>) => void;
  addPartner: (partner: Partner) => void;
  removePartner: (id: string) => void;
  updateBrandPartner: (id: string, updated: Partial<BrandPartner>) => void;
  addBrandPartner: (partner: BrandPartner) => void;
  removeBrandPartner: (id: string) => void;
  updateAssets: (updated: Partial<SiteAssets>) => void;
  saveSiteData: () => void;
  resetSystem: () => void;
}

const initialBrandPartners: BrandPartner[] = [
  {
    id: 'b1',
    name: "Yupiteru",
    category: "Security / Dashcam",
    description: "Panthera繝ｻGrgo縺ｮ豁｣隕剰ｲｩ螢ｲ蠎励→縺励※縲・ｫ伜ｺｦ縺ｪ繧ｻ繧ｭ繝･繝ｪ繝・ぅ繧ｷ繧ｹ繝・Β繧呈署萓帙＠縺ｦ縺・∪縺吶・,
    iconName: 'ShieldCheck',
    url: "https://www.yupiteru.co.jp/"
  },
  {
    id: 'b2',
    name: "Focal",
    category: "Car Audio",
    description: "繝輔Λ繝ｳ繧ｹ縺ｮ蜷埼摩繝悶Λ繝ｳ繝峨らｹ顔ｴｰ縺ｧ陦ｨ迴ｾ蜉幄ｱ翫°縺ｪ繧ｵ繧ｦ繝ｳ繝峨ｒ霆雁・縺ｸ縲・,
    iconName: 'Speaker',
    url: "https://www.focal-audio.jp/"
  },
  {
    id: 'b3',
    name: "Alpine",
    category: "Navigation / Audio",
    description: "蜈磯ｲ縺ｮ繝・け繝弱Ο繧ｸ繝ｼ縺ｧ縲∝ｿｫ驕ｩ縺ｪ繧ｫ繝ｼ繝ｩ繧､繝輔ｒ繧ｵ繝昴・繝医☆繧句嵜蜀・ヨ繝・・繝悶Λ繝ｳ繝峨・,
    iconName: 'Video',
    url: "https://www.alpine.co.jp/"
  },
  {
    id: 'b4',
    name: "Bewith",
    category: "High-End Audio",
    description: "螯･蜊斐・縺ｪ縺・浹雉ｪ繧定ｿｽ豎ゅ☆繧九∵律譛ｬ逋ｺ縺ｮ繝上う繧ｨ繝ｳ繝峨が繝ｼ繝・ぅ繧ｪ繝悶Λ繝ｳ繝峨・,
    iconName: 'Speaker',
    url: "https://www.bewith.jp/"
  },
  {
    id: 'b5',
    name: "蜉阯､髮ｻ讖・,
    category: "Security",
    description: "VIPER繝ｻHORNET縺ｪ縺ｩ縲∽ｸ也阜蝓ｺ貅悶・繧ｻ繧ｭ繝･繝ｪ繝・ぅ繧ｷ繧ｹ繝・Β繧貞ｱ暮幕縲・,
    iconName: 'ShieldCheck',
    url: "https://www.kato-denki.com/"
  },
  {
    id: 'b6',
    name: "Pioneer",
    category: "Carrozzeria",
    description: "繧ｫ繝ｼ繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ縺九ｉ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｾ縺ｧ縲∵･ｭ逡後ｒ繝ｪ繝ｼ繝峨☆繧矩擠譁ｰ諤ｧ縲・,
    iconName: 'Video',
    url: "https://jpn.pioneer/ja/carrozzeria/"
  }
];

const initialPartners: Partner[] = [
  {
    id: 'p1',
    name: "繧ｪ繝ｼ繝・ぅ繧ｪ繝輔ぃ繧､繝ｫ",
    location: "蜊・痩逵・,
    url: "https://audiophile.co.jp/",
    description: "繝上う繧ｨ繝ｳ繝峨が繝ｼ繝・ぅ繧ｪ縺九ｉ繧ｫ繧ｹ繧ｿ繝縺ｾ縺ｧ縲∫｢ｺ縺九↑謚陦薙〒逅・Φ縺ｮ繧ｵ繧ｦ繝ｳ繝峨ｒ螳溽樟縲・
  },
  {
    id: 'p2',
    name: "蟆ｾ譫励ヵ繧｡繧ｯ繝医Μ繝ｼ",
    location: "譚ｱ莠ｬ驛ｽ",
    url: "http://www.obayashi-f.jp/",
    description: "迢ｬ蜑ｵ逧・↑繧ｫ繧ｹ繧ｿ繝繧ｪ繝ｼ繝・ぅ繧ｪ縺ｨ縲∝ｦ･蜊斐・縺ｪ縺・浹雉ｪ霑ｽ豎ゅ〒遏･繧峨ｌ繧句錐髢繧ｷ繝ｧ繝・・縲・
  },
  {
    id: 'p3',
    name: "繧ｭ繝・ぜ繧ｬ繝ｬ繝ｼ繧ｸ",
    location: "諢帷衍逵・,
    url: "https://www.kidsgarage.jp/",
    description: "繧ｻ繧ｭ繝･繝ｪ繝・ぅ縺ｨ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ荳｡遶九ゆｸｭ驛ｨ繧ｨ繝ｪ繧｢繧剃ｻ｣陦ｨ縺吶ｋ繝励Ο繧ｷ繝ｧ繝・・縲・
  },
  {
    id: 'p4',
    name: "繧ｱ繝ｳ繝・ャ繧ｯ",
    location: "菴占ｳ逵・,
    url: "http://www.03g.xyz/",
    description: "荵晏ｷ槭お繝ｪ繧｢縺ｮ謚陦捺侠轤ｹ縲ゅ″繧∫ｴｰ繧・°縺ｪ譁ｽ蟾･ and 繧｢繝輔ち繝ｼ繧ｵ繝昴・繝医′鬲・鴨縲・
  },
  {
    id: 'p5',
    name: "繧ｵ繧ｦ繝ｳ繝峨・繝ｭ繧ｰ繝ｬ繧ｹ",
    location: "蜊・痩逵・,
    url: "https://sound-progress.jp/",
    description: "髻ｳ縺ｮ繝励Ο繝輔ぉ繝・す繝ｧ繝翫Ν縺後√♀螳｢讒倅ｸ莠ｺ縺ｲ縺ｨ繧翫↓譛驕ｩ縺ｪ繧ｷ繧ｹ繝・Β繧呈署譯医・
  },
  {
    id: 'p6',
    name: "繧ｷ繝溘ぜ繝輔ぃ繧ｯ繝医Μ繝ｼ",
    location: "髟ｷ驥守恁",
    url: "http://www.shimizu-factory.com/",
    description: "菫｡蟾槭・繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ繧ｷ繝ｼ繝ｳ繧偵Μ繝ｼ繝峨るｫ倥＞謚陦灘鴨縺ｨ菫｡鬆ｼ縺ｮ螳溽ｸｾ縲・
  },
  {
    id: 'p7',
    name: "繧ｸ繝繝ｻ繧､繝ｳ繝繧ｹ繝医Μ繝ｼ",
    location: "譬・惠逵・,
    url: "http://www.gymindustry.co.jp/",
    description: "蛹鈴未譚ｱ繧ｨ繝ｪ繧｢繧偵き繝舌・縲る浹雉ｪ蜷台ｸ翫°繧峨ラ繝ｬ繧ｹ繧｢繝・・縺ｾ縺ｧ蟷・ｺ・￥蟇ｾ蠢懊・
  },
  {
    id: 'p8',
    name: "繝薙け繝医Μ繝ｼ",
    location: "諢帷衍逵・,
    url: "http://www.victory1987.co.jp/",
    description: "繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｨ繧ｻ繧ｭ繝･繝ｪ繝・ぅ縺ｮ蟆る摩蠎励よ・霆翫↓譛鬮倥・萓｡蛟､繧偵・繝ｩ繧ｹ縲・
  },
  {
    id: 'p9',
    name: "Sound ANG",
    location: "遖丞ｲ｡逵・,
    url: "https://www.soundang.com/",
    description: "蠖薙す繝ｧ繝・・縲ゆｹ晏ｷ槫ｱ域欠縺ｮ謚陦灘鴨縺ｧ縲√♀螳｢讒倥・逅・Φ繧貞ｽ｢縺ｫ縺励∪縺吶・
  }
];

const initialAssets: SiteAssets = {
  heroImage: "/images/Top/tenpo.webp",
  logoText: "Sound ANG Security",
  audioMenuImage: "/images/Top/speaker.webp",
  securityMenuImage: "/images/Top/security.webp",
  dashcamMenuImage: "/images/Top/dorareko.webp",
  showroomImage: "/images/Top/inner1.webp",
  pitImage: "/images/Top/pitroom.webp",
  workspaceImage: "/images/Top/workroom.webp",
  auditionRoomImage: "/images/Top/demoroom1.webp",
  kyushuNo1Image: "/images/Top/tenpo.webp",
  spsCertifiedImage: "/images/Top/security.webp",
  snaponImage: "/images/Top/tenpo.webp",
  batteryChargerImage: "/images/Top/pitroom.webp"
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('ang_partners');
    if (saved) return JSON.parse(saved);
    return (cmsData as any).partners || initialPartners;
  });

  const [brandPartners, setBrandPartners] = useState<BrandPartner[]>(() => {
    const saved = localStorage.getItem('ang_brand_partners');
    if (saved) return JSON.parse(saved);
    return (cmsData as any).brandPartners || initialBrandPartners;
  });

  const [assets, setAssets] = useState<SiteAssets>(() => {
    const saved = localStorage.getItem('ang_assets');
    const baseAssets = (cmsData as any).assets || initialAssets;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration: if images are still placeholders or old defaults, use new defaults
        const migrated = { ...parsed };
        let changed = false;

        Object.keys(baseAssets).forEach((key) => {
          const k = key as keyof SiteAssets;
          const val = migrated[k];
          if (val?.includes('picsum.photos') || val?.endsWith('.jpg') || val?.endsWith('.png') || !val) {
            migrated[k] = baseAssets[k];
            changed = true;
          }
        });

        // Force update logo text if it's the old version
        if (migrated.logoText === "Sound ANG") {
          migrated.logoText = baseAssets.logoText;
          changed = true;
        }

        if (changed) {
          localStorage.setItem('ang_assets', JSON.stringify(migrated));
          return migrated;
        }
        return parsed;
      } catch (e) {
        return baseAssets;
      }
    }
    return baseAssets;
  });

  const [isMounted, setIsMounted] = useState(false);

  // Load from CMS on mount
  useEffect(() => {
    if (import.meta.env.DEV) {
      fetch('/api/cms')
        .then(res => res.json())
        .then(data => {
          if (data.brandPartners) {
            setBrandPartners(data.brandPartners);
          }
          if (data.partners) {
            setPartners(data.partners);
          }
          if (data.assets) {
            setAssets(data.assets);
          }
        })
        .catch(console.error);
    }
    setIsMounted(true);
  }, []);

  // Save to CMS when brandPartners change
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ang_brand_partners', JSON.stringify(brandPartners));
    if (import.meta.env.DEV) {
      fetch('/api/save-cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandPartners })
      }).catch(console.error);
    }
  }, [brandPartners, isMounted]);

  // Save to CMS when partners change
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ang_partners', JSON.stringify(partners));
    if (import.meta.env.DEV) {
      fetch('/api/save-cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partners })
      }).catch(console.error);
    }
  }, [partners, isMounted]);

  // Save to CMS when assets change
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('ang_assets', JSON.stringify(assets));
    if (import.meta.env.DEV) {
      fetch('/api/save-cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assets })
      }).catch(console.error);
    }
  }, [assets, isMounted]);

  const updatePartner = (id: string, updated: Partial<Partner>) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const addPartner = (partner: Partner) => {
    setPartners(prev => [...prev, partner]);
  };

  const removePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  const updateBrandPartner = (id: string, updated: Partial<BrandPartner>) => {
    setBrandPartners(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const addBrandPartner = (partner: BrandPartner) => {
    setBrandPartners(prev => [...prev, partner]);
  };

  const removeBrandPartner = (id: string) => {
    setBrandPartners(prev => prev.filter(p => p.id !== id));
  };

  const updateAssets = (updated: Partial<SiteAssets>) => {
    setAssets(prev => ({ ...prev, ...updated }));
  };

  const resetSystem = () => {
    const keys = [
      'ang_partners',
      'ang_brand_partners',
      'ang_assets',
      'ang_plans',
      'ang_guides',
      'ang_optionals',
      'ang_security_status',
      'ang_emergency',
      'ang_recruitment',
      'ang_audio_recruitment',
      'ang_security_recruitment',
      'sound_ang_holidays'
    ];
    keys.forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  const saveSiteData = () => {
    // Explicit save trigger (already handled by useEffects, but kept for compatibility)
    localStorage.setItem('ang_partners', JSON.stringify(partners));
    localStorage.setItem('ang_brand_partners', JSON.stringify(brandPartners));
    localStorage.setItem('ang_assets', JSON.stringify(assets));
  };

  return (
    <SiteContext.Provider value={{
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
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
