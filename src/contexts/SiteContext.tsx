import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
}

const initialBrandPartners: BrandPartner[] = [
  {
    id: 'b1',
    name: "Yupiteru",
    category: "Security / Dashcam",
    description: "Panthera・Grgoの正規販売店として、高度なセキュリティシステムを提供しています。",
    iconName: 'ShieldCheck',
    url: "https://www.yupiteru.co.jp/"
  },
  {
    id: 'b2',
    name: "Focal",
    category: "Car Audio",
    description: "フランスの名門ブランド。繊細で表現力豊かなサウンドを車内へ。",
    iconName: 'Speaker',
    url: "https://www.focal-audio.jp/"
  },
  {
    id: 'b3',
    name: "Alpine",
    category: "Navigation / Audio",
    description: "先進のテクノロジーで、快適なカーライフをサポートする国内トップブランド。",
    iconName: 'Video',
    url: "https://www.alpine.co.jp/"
  },
  {
    id: 'b4',
    name: "Bewith",
    category: "High-End Audio",
    description: "妥協のない音質を追求する、日本発のハイエンドオーディオブランド。",
    iconName: 'Speaker',
    url: "https://www.bewith.jp/"
  },
  {
    id: 'b5',
    name: "加藤電機",
    category: "Security",
    description: "VIPER・HORNETなど、世界基準のセキュリティシステムを展開。",
    iconName: 'ShieldCheck',
    url: "https://www.kato-denki.com/"
  },
  {
    id: 'b6',
    name: "Pioneer",
    category: "Carrozzeria",
    description: "カーナビゲーションからオーディオまで、業界をリードする革新性。",
    iconName: 'Video',
    url: "https://jpn.pioneer/ja/carrozzeria/"
  }
];

const initialPartners: Partner[] = [
  {
    id: 'p1',
    name: "オーディオファイル",
    location: "千葉県",
    url: "https://audiophile.co.jp/",
    description: "ハイエンドオーディオからカスタムまで、確かな技術で理想のサウンドを実現。"
  },
  {
    id: 'p2',
    name: "尾林ファクトリー",
    location: "東京都",
    url: "http://www.obayashi-f.jp/",
    description: "独創的なカスタムオーディオと、妥協のない音質追求で知られる名門ショップ。"
  },
  {
    id: 'p3',
    name: "キッズガレージ",
    location: "愛知県",
    url: "https://www.kidsgarage.jp/",
    description: "セキュリティとオーディオの両立。中部エリアを代表するプロショップ。"
  },
  {
    id: 'p4',
    name: "ケンテック",
    location: "佐賀県",
    url: "http://www.03g.xyz/",
    description: "九州エリアの技術拠点。きめ細やかな施工 and アフターサポートが魅力。"
  },
  {
    id: 'p5',
    name: "サウンドプログレス",
    location: "千葉県",
    url: "https://sound-progress.jp/",
    description: "音のプロフェッショナルが、お客様一人ひとりに最適なシステムを提案。"
  },
  {
    id: 'p6',
    name: "シミズファクトリー",
    location: "長野県",
    url: "http://www.shimizu-factory.com/",
    description: "信州のカーオーディオシーンをリード。高い技術力と信頼の実績。"
  },
  {
    id: 'p7',
    name: "ジム・インダストリー",
    location: "栃木県",
    url: "http://www.gymindustry.co.jp/",
    description: "北関東エリアをカバー。音質向上からドレスアップまで幅広く対応。"
  },
  {
    id: 'p8',
    name: "ビクトリー",
    location: "愛知県",
    url: "http://www.victory1987.co.jp/",
    description: "カーオーディオとセキュリティの専門店。愛車に最高の価値をプラス。"
  },
  {
    id: 'p9',
    name: "Sound ANG",
    location: "福岡県",
    url: "https://www.soundang.com/",
    description: "当ショップ。九州屈指の技術力で、お客様の理想を形にします。"
  }
];

const initialAssets: SiteAssets = {
  heroImage: "/images/Top/tenpo.jpg",
  logoText: "Sound ANG",
  audioMenuImage: "/images/Top/speaker.jpg",
  securityMenuImage: "/images/Top/security.jpg",
  dashcamMenuImage: "/images/Top/dorareko.jpg",
  showroomImage: "/images/Top/inner1.jpg",
  pitImage: "/images/Top/pitroom.jpg",
  workspaceImage: "/images/Top/workroom.jpg",
  auditionRoomImage: "/images/Top/demoroom1.jpg",
  kyushuNo1Image: "/images/Top/tenpo.jpg",
  spsCertifiedImage: "/images/Top/security.jpg",
  snaponImage: "/images/Top/tenpo.jpg",
  batteryChargerImage: "/images/Top/pitroom.jpg"
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('ang_partners');
    return saved ? JSON.parse(saved) : initialPartners;
  });

  const [brandPartners, setBrandPartners] = useState<BrandPartner[]>(initialBrandPartners);

  const [assets, setAssets] = useState<SiteAssets>(() => {
    const saved = localStorage.getItem('ang_assets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration: if images are still placeholders or old defaults, use new defaults
        const migrated = { ...parsed };
        let changed = false;

        Object.keys(initialAssets).forEach((key) => {
          const k = key as keyof SiteAssets;
          if (migrated[k]?.includes('picsum.photos') || !migrated[k]) {
            migrated[k] = initialAssets[k];
            changed = true;
          }
        });

        if (changed) {
          localStorage.setItem('ang_assets', JSON.stringify(migrated));
          return migrated;
        }
        return parsed;
      } catch (e) {
        return initialAssets;
      }
    }
    return initialAssets;
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
      saveSiteData
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
