// Sync Marker: 2026-04-13-0755
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import { RecruitmentSection } from '../Shared/RecruitmentSection';
import { SafeImage } from '../ui/SafeImage';
import {
  ArrowLeft,
  Speaker,
  Music,
  Zap,
  Shield,
  CheckCircle2,
  ChevronRight,
  Info,
  Search,
  Filter,
  Star,
  Car,
  Settings2,
  Volume2,
  LayoutGrid,
  List,
  Menu,
  X,
  Calendar,
  MessageSquare,
  Activity,
  Wrench,
  Layers,
  Youtube,
  Play,
  TrendingDown,
  ExternalLink,
  Thermometer
} from 'lucide-react';

const isHtmlString = (str: string) => /<[a-z][\s\S]*>/i.test(str);
const isFullHtmlDocument = (str: string) => /<!DOCTYPE html>|<html/i.test(str);

const stripHtml = (html: string) => {
  if (!html) return "";
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const nodes = doc.querySelectorAll('script, style');
    nodes.forEach(n => n.remove());
    return doc.body.textContent?.trim() || "";
  } catch (e) {
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]*>?/gm, '')
      .trim();
  }
};

interface AudioMenuDetailProps {
  onBack: () => void;
}

export const AudioMenuDetail: React.FC<AudioMenuDetailProps> = ({ onBack }) => {
  const { assets } = useSite();
  const { plans, optionals, guides, audioRecruitment, auditionSpeakers } = usePrices();
  const { planSlug } = useParams<{ planSlug: string }>();
  const [activeCategory, setActiveCategory] = useState<'all' | 'speaker_package' | 'bass_power' | 'digital_source' | 'install_tuning' | 'custom_install'>('all');
  const [viewingFullList, setViewingFullList] = useState<string | null>(null);
  const [viewingCategoryDetail, setViewingCategoryDetail] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState<string>('blue');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFullAuditionList, setShowFullAuditionList] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [selectedAuditionImage, setSelectedAuditionImage] = useState<string | null>(null);
  const [showAllGuides, setShowAllGuides] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<string>('level');

  const categorySubTabs: Record<string, { id: string; label: string; en: string; info: string }[]> = {
    speaker_package: [
      { id: 'level', label: '繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙・繝ｩ繝ｳ', en: 'Standard Packages', info: '縺比ｺ育ｮ励ｄ髻ｳ雉ｪ繝ｬ繝吶Ν縺九ｉ驕ｸ縺ｹ繧区ｨ呎ｺ悶ヱ繝・こ繝ｼ繧ｸ' },
      { id: 'car', label: '霆顔ｨｮ蛻･繝励Λ繝ｳ', en: 'Car-Specific', info: '霆ｽ閾ｪ蜍戊ｻ翫ｄ谺ｧ蟾櫁ｻ翫↑縺ｩ縲∫音螳夊ｻ顔ｨｮ縺ｫ譛驕ｩ蛹悶＆繧後◆繝励Λ繝ｳ' }
    ],
    bass_power: [
      { id: 'amp', label: '繧｢繝ｳ繝励・繝代ャ繧ｱ繝ｼ繧ｸ', en: 'Amp Package', info: '髻ｳ縺ｮ隗｣蜒丞ｺｦ縺ｨ鬧・虚蜉帙ｒ鬮倥ａ繧句､夜Κ繧｢繝ｳ繝励・蟆主・' },
      { id: 'subwoofer', label: '繧ｵ繝悶え繝ｼ繝上・', en: 'Subwoofer', info: '髻ｳ讌ｽ縺ｫ鬲ゅｒ蜷ｹ縺崎ｾｼ繧驥堺ｽ朱浹縺ｮ霑ｽ蜉' }
    ],
    digital_source: [
      { id: 'dsp', label: 'DSP繝励Ο繧ｻ繝・し繝ｼ', en: 'DSP Processor', info: '邏疲ｭ｣繧ｷ繧ｹ繝・Β繧呈ｴｻ縺九＠縺溽ｷｻ蟇・↑髻ｳ髻ｿ隱ｿ謨ｴ' },
      { id: 'media', label: '繝励Ξ繝ｼ繝､繝ｼ繝ｻ繝翫ン', en: 'Media & Navi', info: '鬮倬ｮｮ蠎ｦ縺ｪ蜀咲函繧貞ｮ溽樟縺吶ｋ繝｡繝・ぅ繧｢繝励Ξ繝ｼ繝､繝ｼ縺ｨ繝翫ン' }
    ],
    install_tuning: [
      { id: 'tuning', label: '繝・ャ繝峨ル繝ｳ繧ｰ', en: 'Deadening', info: '繧ｹ繝斐・繧ｫ繝ｼ譛ｬ譚･縺ｮ諤ｧ閭ｽ繧貞ｼ輔″蜃ｺ縺咏腸蠅・紛蛯・ },
      { id: 'power', label: '髮ｻ貅舌・髱咎浹蛹・, en: 'Environment', info: '繝弱う繧ｺ菴取ｸ帙→螳牙ｮ壹＠縺滄崕蜉帑ｾ帷ｵｦ縺ｫ繧医ｋ髻ｳ雉ｪ蜷台ｸ・ }
    ],
    custom_install: [
      { id: 'craft', label: '繧ｫ繧ｹ繧ｿ繝騾蠖｢', en: 'Craftsmanship', info: '繝斐Λ繝ｼ蝓九ａ霎ｼ縺ｿ繧・ヰ繝・ヵ繝ｫ陬ｽ菴懊↑縺ｩ縺ｮ蛹縺ｮ謚' },
      { id: 'oneoff', label: '繝ｯ繝ｳ繧ｪ繝戊｣ｽ菴・, en: 'One-off Build', info: '繝医Λ繝ｳ繧ｯ蛻ｶ菴懊↑縺ｩ縲∽ｸ也阜縺ｫ荳蜿ｰ縺ｮ繧ｫ繧ｹ繧ｿ繝' }
    ]
  };

  useEffect(() => {
    // Handle planSlug from URL
    if (planSlug && plans.length > 0) {
      // Strip .html extension if present
      const cleanSlug = planSlug.replace(/\.html$/, '');
      for (const category of plans) {
        const found = category.items.find((item: any) => item.slug === cleanSlug);
        if (found) {
          setSelectedItem(found);
          setActiveCategory(category.id as any);
          break;
        }
      }
    }
  }, [planSlug, plans]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const categoryExplanations: Record<string, any> = {
    speaker_package: {
      title: "繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙・霆顔ｨｮ蛻･繝励Λ繝ｳ",
      subtitle: "**髻ｳ繧定憶縺上☆繧狗ｬｬ荳豁ｩ**縲∵・霆翫↓**繝斐ャ繧ｿ繝ｪ**縺ｮ髻ｳ繧停ｦ",
      description: "蜉蟾･繧呈怙蟆城剞縺ｫ謚代∴縺､縺､縲∝括逧・↑髻ｳ雉ｪ蜷台ｸ翫ｒ螳溽樟縺吶ｋ**霆顔ｨｮ蛻･繝励Λ繝ｳ**縺ｨ縲∝嵜蜀・､悶・繧ｹ繝斐・繧ｫ繝ｼ縺九ｉ驕ｸ縺ｹ繧・*莠､謠帙ヱ繝・こ繝ｼ繧ｸ**繧堤ｵｱ蜷医・,
      sampleDescription: "縲先命蟾･萓九腺MW蟆ら畑繧ｹ繝斐・繧ｫ繝ｼ莠､謠幢ｼ壼・陬・・諢丞権繧剃ｸ蛻・､峨∴繧九％縺ｨ縺ｪ縺上∽ｸｭ鬮伜沺縺ｮ隗｣蜒丞ｺｦ繧貞､ｧ蟷・↓蜷台ｸ翫ょｰら畑險ｭ險医・縺溘ａ縲∬ｻ贋ｸ｡縺ｸ縺ｮ繝繝｡繝ｼ繧ｸ繧よ怙蟆城剞縺ｫ謚代∴繧峨ｌ縺ｾ縺吶・,
      benefits: [
        "霆贋ｸ｡縺ｮ驟咲ｷ壼刈蟾･縺御ｸ崎ｦ√↑螳牙ｿ・・繧､繝ｳ繧ｹ繝医・繝ｫ",
        "蜀・｣・・髮ｰ蝗ｲ豌励ｒ荳蛻・｣翫＆縺ｪ縺・ｴ疲ｭ｣繝ｫ繝・け縺ｪ莉穂ｸ翫′繧・,
        "蝗ｽ蜀・､悶・繝悶Λ繝ｳ繝峨°繧峨♀螂ｽ縺ｿ縺ｮ髻ｳ繧帝∈謚槫庄閭ｽ"
      ],
      image: assets.audioMenuImage,
      icon: Speaker,
      color: "blue",
      upgrades: [
        { title: "鬮伜央諤ｧ繝舌ャ繝輔Ν縺ｸ螟画峩", price: "+ﾂ･11,000縲・, icon: Shield, description: "繧ｹ繝斐・繧ｫ繝ｼ縺ｮ蝨溷床繧貞ｼｷ蛹悶＠縲∽ｸ崎ｦ√↑蜈ｱ謖ｯ繧呈賜髯､縲ゆｽ朱浹縺ｮ繝ｬ繧ｹ繝昴Φ繧ｹ縺悟髄荳翫＠縺ｾ縺吶・ },
        { title: "繝・ぅ繝ｼ繧ｿ繝ｼ蝓九ａ霎ｼ縺ｿ蜉蟾･", price: "+ﾂ･33,000縲・, icon: Settings2, description: "A繝斐Λ繝ｼ遲峨↓譛驕ｩ縺ｪ隗貞ｺｦ縺ｧ險ｭ鄂ｮ縲ら炊諠ｳ逧・↑繧ｹ繝・・繧ｸ繝ｳ繧ｰ繧貞ｮ溽樟縺励∪縺吶・ }
      ]
    },
    bass_power: {
      title: "菴朱浹蠑ｷ蛹悶・繝代Ρ繝ｼ繧｢繝・・",
      subtitle: "**菴朱浹縺ｮ霄榊虚諢・*縺ｨ縲・浹蜈ｨ菴薙・**魄ｮ譏弱＆繝ｻ繝代Ρ繝ｼ**繧停ｦ",
      description: "**繧ｵ繝悶え繝ｼ繝輔ぃ繝ｼ**縺ｫ繧医ｋ驥堺ｽ朱浹縺ｮ霑ｽ蜉縺ｨ縲・*螟夜Κ繧｢繝ｳ繝・*縺ｫ繧医ｋ蠑ｷ蜉帙↑繧ｹ繝斐・繧ｫ繝ｼ鬧・虚繧堤ｵｱ蜷医る浹讌ｽ縺ｮ陦ｨ迴ｾ蜉帙ｒ蛻･谺｡蜈・∈蠑輔″荳翫￡縺ｾ縺吶・,
      sampleDescription: "縲先命蟾･萓九代ヱ繝ｯ繝ｼ繝峨し繝悶え繝ｼ繝輔ぃ繝ｼ・句ｰ丞梛繧｢繝ｳ繝苓ｨｭ鄂ｮ・壹せ繝壹・繧ｹ繧堤刈迚ｲ縺ｫ縺吶ｋ縺薙→縺ｪ縺上∽ｸ崎ｶｳ縺励※縺・◆菴朱浹縺ｮ蜴壹∩繧定｣懷ｮ後＠縲∬ｧ｣蜒丞ｺｦ繧貞括逧・↓蜷台ｸ翫＆縺帙∪縺吶・,
      benefits: [
        "髻ｳ讌ｽ蜈ｨ菴薙・蜴壹∩縺ｨ霄榊虚諢溘・蜷台ｸ・,
        "繧｢繝ｳ繝励↓繧医ｋ豁ｪ縺ｿ縺ｮ縺ｪ縺・け繝ｪ繧｢縺ｪ蜀咲函",
        "繝ｩ繧､繝紋ｼ壼ｴ縺ｮ繧医≧縺ｪ遨ｺ豌玲─縺ｮ蜀咲樟"
      ],
      image: assets.audioMenuImage,
      icon: Music,
      color: "indigo",
      upgrades: [
        { title: "繝懊ャ繧ｯ繧ｹ繧ｿ繧､繝励∈螟画峩", price: "+ﾂ･44,000縲・, icon: Music, description: "繧医ｊ螟ｧ蜿｣蠕・・繝ｦ繝九ャ繝医→螳ｹ驥上・螟ｧ縺阪↑繝懊ャ繧ｯ繧ｹ縺ｧ縲∝悸蛟堤噪縺ｪ驥堺ｽ朱浹繧貞ｮ溽樟縲・ },
        { title: "繝医Λ繝ｳ繧ｯ蝓九ａ霎ｼ縺ｿ蜉蟾･", price: "+ﾂ･88,000縲・, icon: Settings2, description: "霆贋ｸ｡縺ｮ蠖｢迥ｶ縺ｫ蜷医ｏ縺帙※繧ｫ繧ｹ繧ｿ繝陬ｽ菴懊り差螳､繧呈怏蜉ｹ豢ｻ逕ｨ縺励↑縺後ｉ鬮倬浹雉ｪ繧剃ｸ｡遶九・ }
      ]
    },
    digital_source: {
      title: "繝・ず繧ｿ繝ｫ繝ｻ髻ｳ雉ｪ蛻ｶ蠕｡",
      subtitle: "邏疲ｭ｣繧ｷ繧ｹ繝・Β繧呈ｴｻ縺九＠縲・*遨ｶ讌ｵ縺ｮ螳壻ｽ・*縺ｨ**鬮倬ｮｮ蠎ｦ蜀咲函**繧停ｦ",
      description: "**DSP・医・繝ｭ繧ｻ繝・し繝ｼ・・*縲・*鬮倬浹雉ｪ繝翫ン**縲・*繝｡繝・ぅ繧｢繝励Ξ繝ｼ繝､繝ｼ**繧堤ｵｱ蜷医らｴ疲ｭ｣繧ｷ繧ｹ繝・Β縺ｮ蛻ｶ髯舌ｒ隗｣髯､縺励√い繝ｼ繝・ぅ繧ｹ繝医′逶ｮ縺ｮ蜑阪↓豬ｮ縺九・荳翫′繧区─蜍輔ｒ蜑ｵ繧翫∪縺吶・,
      sampleDescription: "縲先命蟾･萓九船SP・九Γ繝・ぅ繧｢繝励Ξ繝ｼ繝､繝ｼ蟆主・・夂ｴ疲ｭ｣繝翫ン繧呈ｴｻ縺九＠縺溘∪縺ｾ縲√せ繝槭・繧ДAP縺九ｉ縺ｮ繝・ず繧ｿ繝ｫ鬮倬ｮｮ蠎ｦ蜀咲函繧貞ｮ溽樟縲ょｮ檎挑縺ｪ髻ｳ蜒丞ｮ壻ｽ阪→蝨ｧ蛟堤噪縺ｪ隗｣蜒丞ｺｦ繧剃ｸ｡遶九＠縺ｾ縺吶・,
      benefits: [
        "繝繝・す繝･繝懊・繝我ｸｭ螟ｮ縺ｫ螳壻ｽ阪☆繧区ｭ｣遒ｺ縺ｪ髻ｳ蜒・,
        "繝上う繝ｬ繧ｾ髻ｳ貅舌・繝昴ユ繝ｳ繧ｷ繝｣繝ｫ繧・00%蠑輔″蜃ｺ縺吶ョ繧ｸ繧ｿ繝ｫ謗･邯・,
        "邏疲ｭ｣繝翫ン繧ДA縺ｮ髻ｳ雉ｪ蛻ｶ髯舌ｒ辟｡隕悶〒縺阪ｋ鬮倬浹雉ｪ繧ｽ繝ｼ繧ｹ"
      ],
      image: assets.audioMenuImage,
      icon: Zap,
      color: "purple",
      upgrades: [
        { title: "鬮倡ｲｾ蠎ｦ螟夜Κ繧ｯ繝ｭ繝・け", price: "ﾂ･44,000縲・, icon: Activity, description: "髻ｳ縺ｮ貊ｲ縺ｿ繧呈･ｵ髯舌∪縺ｧ謗帝勁縺励√ｈ繧頑ｷｱ縺・Μ繧｢繝ｪ繝・ぅ繧貞ｮ溽樟縲・ },
        { title: "螟ｧ螳ｹ驥輯SD謠幄｣・, price: "ﾂ･22,000縲・, icon: Layers, description: "蟾ｨ螟ｧ縺ｪ繝ｩ繧､繝悶Λ繝ｪ繝ｼ繧定ｻ願ｼ峨ょ・繧ｳ繝ｬ繧ｯ繧ｷ繝ｧ繝ｳ繧貞ｸｸ縺ｫ謳ｺ蟶ｯ縲・ }
      ]
    },
    install_tuning: {
      title: "譁ｽ蟾･繝ｻ迺ｰ蠅・メ繝･繝ｼ繝九Φ繧ｰ",
      subtitle: "讖滓攝縺ｮ諤ｧ閭ｽ繧・*120%**蠑輔″蜃ｺ縺励・*蠢ｫ驕ｩ縺ｪ霆雁・遨ｺ髢・*繧停ｦ",
      description: "**繝・ャ繝峨ル繝ｳ繧ｰ**繧・*髮ｻ貅仙ｼｷ蛹・*縲∫黄逅・噪縺ｪ迺ｰ蠅・隼蝟・ｒ邨ｱ蜷医ゅΟ繝ｼ繝峨ヮ繧､繧ｺ繧呈椛縺医√が繝ｼ繝・ぅ繧ｪ讖滓攝縺ｮ逵滉ｾ｡繧堤匱謠ｮ縺輔○繧九◆繧√・蠢・域命蟾･縺ｧ縺吶・,
      sampleDescription: "縲先命蟾･萓九代ヵ繝ｫ繝・ャ繝峨ル繝ｳ繧ｰ・九ヰ繝・峩驟咲ｷ夲ｼ壹Ο繝ｼ繝峨ヮ繧､繧ｺ繧貞､ｧ蟷・↓菴取ｸ帙＠縲・撕蟇ゅ・荳ｭ縺ｫ髻ｳ讌ｽ縺梧ｵｮ縺九・荳翫′繧狗腸蠅・ｒ讒狗ｯ峨る崕貅仙ｼｷ蛹悶↓繧医ｊ髻ｳ縺ｮ遶九■荳翫′繧翫ｂ豼螟峨＠縺ｾ縺吶・,
      benefits: [
        "讖滓攝縺ｮ繝昴ユ繝ｳ繧ｷ繝｣繝ｫ繧偵ヵ繝ｫ縺ｫ蠑輔″蜃ｺ縺咎浹髻ｿ險ｭ險・,
        "繝ｭ繝ｼ繝峨ヮ繧､繧ｺ菴取ｸ帙↓繧医ｋ蠢ｫ驕ｩ諤ｧ縺ｮ蜷台ｸ・,
        "髮ｻ貅仙ｮ牙ｮ壼喧縺ｫ繧医ｋ蝨ｧ蛟堤噪縺ｪS/N諢溘→霄榊虚諢・
      ],
      image: assets.audioMenuImage,
      icon: Shield,
      color: "orange",
      upgrades: [
        { title: "繝上う繧ｰ繝ｬ繝ｼ繝蛾・邱・, price: "+ﾂ･11,000縲・, icon: Zap, description: "謗･轤ｹ繝ｭ繧ｹ繧・ｼ晞√Ο繧ｹ繧呈･ｵ髯舌∪縺ｧ謚代∴繧九・繝ｬ繝溘い繝繧ｱ繝ｼ繝悶Ν縲・ },
        { title: "莉ｮ諠ｳ繧｢繝ｼ繧ｹ霑ｽ蜉", price: "+ﾂ･33,000縲・, icon: Activity, description: "繝弱う繧ｺ繧貞精蜿弱＠縲・浹縺ｮ騾乗・諢溘ｒ縺輔ｉ縺ｫ蜷台ｸ翫＆縺帙∪縺吶・ }
      ]
    },
    custom_install: {
      title: "繧ｫ繧ｹ繧ｿ繝繧､繝ｳ繧ｹ繝医・繝ｫ繝ｻ騾菴・,
      subtitle: "**蛹縺ｮ謚**縺ｧ縲・浹縺ｨ鄒弱＠縺輔′陞榊粋縺吶ｋ**蜚ｯ荳辟｡莠・*縺ｮ遨ｺ髢薙ｒ窶ｦ",
      description: "髻ｳ髻ｿ逅・ｫ悶↓蝓ｺ縺･縺・◆**繝斐Λ繝ｼ蜉蟾･**繧・√ラ繧｢縺ｮ魑ｴ繧翫ｒ讌ｵ髯舌∪縺ｧ蠑輔″蜃ｺ縺・*繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν**縲よｩ溯・鄒弱ｒ霑ｽ豎ゅ＠縺滄菴懊↓繧医ｊ縲∵・霆翫ｒ迚ｹ蛻･縺ｪ繝ｪ繧ｹ繝九Φ繧ｰ繝ｫ繝ｼ繝縺ｸ縺ｨ螟芽ｲ後＆縺帙∪縺吶・,
      sampleDescription: "縲先命蟾･萓九羨繝斐Λ繝ｼ3WAY蝓九ａ霎ｼ縺ｿ・九ヨ繝ｩ繝ｳ繧ｯ繧ｫ繧ｹ繧ｿ繝・壹せ繝斐・繧ｫ繝ｼ縺ｮ謖・髄諤ｧ繧呈怙驕ｩ蛹悶＠縲∝悸蛟堤噪縺ｪ繧ｹ繝・・繧ｸ繝ｳ繧ｰ繧貞ｮ溽樟縲ゅΛ繧､繝・ぅ繝ｳ繧ｰ繧堤ｵ・∩蜷医ｏ縺帙ｋ縺薙→縺ｧ縲∝､懊・繝峨Λ繧､繝悶ｂ蠖ｩ繧翫∪縺吶・,
      benefits: [
        "髻ｳ髻ｿ迚ｹ諤ｧ繧呈怙螟ｧ髯舌↓蠑輔″蜃ｺ縺咏ｷｻ蟇・↑隗貞ｺｦ險ｭ險・,
        "邏疲ｭ｣縺ｮ蜀・｣・↓鬥ｴ譟薙・縲√≠繧九＞縺ｯ蜃碁ｧ輔☆繧九ワ繧､繧ｯ繧ｪ繝ｪ繝・ぅ縺ｪ莉穂ｸ翫′繧・,
        "繧ｪ繝ｼ繝翫・讒倥・縺薙□繧上ｊ繧貞・迴ｾ蛹悶☆繧九ヵ繝ｫ繧ｪ繝ｼ繝繝ｼ繝｡繧､繝・
      ],
      image: assets.audioMenuImage,
      icon: Settings2,
      color: "cyan",
      upgrades: [
        { title: "繧ｨ繧ｯ繧ｻ繝ｼ繝・繧｢繝ｫ繧ｫ繝ｳ繧ｿ繝ｼ繝ｩ莉穂ｸ翫￡", price: "+ﾂ･11,550縲・, icon: Layers, description: "雉ｪ諢溘ｒ鬮倥ａ繧矩ｫ倡ｴ夂ｴ譚舌ょ・縺ｮ蜿榊ｰ・ｒ謚代∴縲√ム繝・す繝･繝懊・繝峨・鬮倡ｴ壽─繧呈ｼ泌・縺励∪縺吶・ },
        { title: "LED繝ｩ繧､繝・ぅ繝ｳ繧ｰ貍泌・", price: "+ﾂ･22,000縲・, icon: Zap, description: "繧｢繧ｯ繝ｪ繝ｫ縺ｨLED繧堤ｵ・∩蜷医ｏ縺帙∝､憺俣縺ｮ霆雁・繧貞ｹｻ諠ｳ逧・↓繧｢繝・・繝・・繝医・ }
      ]
    },
    deadening_opt: {
      title: "讓呎ｺ悶ョ繝・ラ繝九Φ繧ｰ",
      subtitle: "繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙・繝ｩ繝ｳ縺ｫ讓呎ｺ紋ｻ伜ｸｯ縲・,
      description: "蠖灘ｺ励・繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙・繝ｩ繝ｳ縺ｫ縺ｯ縲√せ繝斐・繧ｫ繝ｼ縺ｮ諤ｧ閭ｽ繧呈怙菴朱剞蠑輔″蜃ｺ縺吶◆繧√・縲檎ｰ｡譏薙ョ繝・ラ繝九Φ繧ｰ縲阪′譛蛻昴°繧牙性縺ｾ繧後※縺・∪縺吶ゅ＆繧峨↓髻ｳ雉ｪ繧定ｿｽ豎ゅ＠縺溘＞蝣ｴ蜷医・縲∝ｷｮ鬘榊・縺ｮ縺ｿ縺ｧ荳贋ｽ阪・繝・ャ繝峨ル繝ｳ繧ｰ繝励Λ繝ｳ縺ｸ繧｢繝・・繧ｰ繝ｬ繝ｼ繝峨☆繧九％縺ｨ繧ょ庄閭ｽ縺ｧ縺吶・,
      benefits: [
        "繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙・繝ｩ繝ｳ縺ｫ辟｡譁吶〒莉伜ｱ・,
        "蟾ｮ鬘阪・縺ｿ縺ｧ譛ｬ譬ｼ繝・ャ繝峨ル繝ｳ繧ｰ縺ｸ螟画峩蜿ｯ閭ｽ",
        "譁ｽ蟾･縺ｮ蝓ｺ譛ｬ縺ｨ縺励※蜈ｨ縺ｦ縺ｮ霆翫↓螳滓命"
      ],
      image: assets.audioMenuImage,
      icon: Shield,
      color: "green"
    },
    cable_opt: {
      title: "繧ｹ繝斐・繧ｫ繝ｼ繧ｱ繝ｼ繝悶Ν",
      subtitle: "讓呎ｺ悶こ繝ｼ繝悶Ν莉伜ｱ槭ゅい繝・・繧ｰ繝ｬ繝ｼ繝峨ｂ蜿ｯ閭ｽ縲・,
      description: "蜿悶ｊ莉倥￠縺ｫ蠢・ｦ√↑繧ｹ繝斐・繧ｫ繝ｼ繧ｱ繝ｼ繝悶Ν縺ｯ讓呎ｺ悶〒蜷ｫ縺ｾ繧後※縺・∪縺吶ゅｈ繧願ｧ｣蜒丞ｺｦ繧帝ｫ倥ａ縺溘＞縲・浹縺ｮ諠・ｱ驥上ｒ蠅励ｄ縺励◆縺・→縺・≧譁ｹ縺ｫ縺ｯ縲∝ｷｮ鬘阪ｒ縺・◆縺縺上％縺ｨ縺ｧ鬮倬浹雉ｪ縺ｪOFC繧ｱ繝ｼ繝悶Ν繧・ワ繧､繧ｨ繝ｳ繝峨こ繝ｼ繝悶Ν縺ｸ縺ｮ螟画峩繧よ価縺｣縺ｦ縺翫ｊ縺ｾ縺吶・,
      benefits: [
        "讓呎ｺ也噪縺ｪ驟咲ｷ壹・繝励Λ繝ｳ譁咎≡縺ｫ霎ｼ縺ｿ",
        "蟾ｮ鬘阪〒鬮倬浹雉ｪ繧ｱ繝ｼ繝悶Ν縺ｸ螟画峩蜿ｯ閭ｽ",
        "繧ｷ繧ｹ繝・Β讒区・縺ｫ蜷医ｏ縺帙◆譛驕ｩ縺ｪ謠先｡・
      ],
      image: assets.audioMenuImage,
      icon: Zap,
      color: "purple"
    },
    tuning_opt: {
      title: "繧ｵ繧ｦ繝ｳ繝峨メ繝･繝ｼ繝九Φ繧ｰ",
      subtitle: "蠖灘ｺ励＃雉ｼ蜈･閠・ｧ倥・縲梧ｰｸ蟷ｴ辟｡譁吶阪〒隱ｿ謨ｴ縲・,
      description: "繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｯ蜿悶ｊ莉倥￠蠕後・縲瑚ｪｿ謨ｴ縲阪〒髻ｳ縺梧ｱｺ縺ｾ繧翫∪縺吶ょｽ灘ｺ励〒繝ｦ繝九ャ繝医ｒ縺碑ｳｼ蜈･繝ｻ譁ｽ蟾･縺・◆縺縺・◆縺雁ｮ｢讒倥↓縺ｯ縲∫ｴ崎ｻ頑凾縺ｮ繧ｻ繝・ユ繧｣繝ｳ繧ｰ縺ｯ繧ゅ■繧阪ｓ縲√お繝ｼ繧ｸ繝ｳ繧ｰ蠕後・蜀崎ｪｿ謨ｴ繧ら┌譁吶〒螳滓命縺励※縺翫ｊ縺ｾ縺吶ゅ・繝ｭ縺ｮ謚陦薙〒蟶ｸ縺ｫ譛鬮倥・迥ｶ諷九ｒ邯ｭ謖√＠縺ｾ縺吶・,
      sampleDescription: "縲先命蟾･萓九船SP蟆主・蠕後・螳壽悄繧ｻ繝・ユ繧｣繝ｳ繧ｰ・壹お繝ｼ繧ｸ繝ｳ繧ｰ縺碁ｲ繧薙□3繝ｶ譛亥ｾ後↓蜀崎ｪｿ謨ｴ縲ゅせ繝斐・繧ｫ繝ｼ縺ｮ蜍輔″縺後せ繝繝ｼ繧ｺ縺ｫ縺ｪ縺｣縺溷・縲√ｈ繧顔ｷｻ蟇・↑EQ陬懈ｭ｣繧定｡後≧縺薙→縺ｧ縲√＆繧峨↓豺ｱ縺ｿ縺ｮ縺ゅｋ髻ｳ縺ｸ縺ｨ騾ｲ蛹悶＆縺帙∪縺吶・,
      benefits: [
        "蠖灘ｺ玲命蟾･霆翫・縺・▽縺ｧ繧りｪｿ謨ｴ辟｡譁・,
        "貂ｬ螳壼勣縺ｨ閠ｳ繧剃ｽｿ縺｣縺溘・繝ｭ縺ｮ霑ｽ縺・ｾｼ縺ｿ",
        "繧ｨ繝ｼ繧ｸ繝ｳ繧ｰ蠕後・螟牙喧縺ｫ繧ら┌蜆溷ｯｾ蠢・
      ],
      image: assets.audioMenuImage,
      icon: Settings2,
      color: "orange"
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'purpose-nav', label: '逶ｮ逧・挨繝翫ン' },
    { id: 'plan-list', label: '繝励Λ繝ｳ荳隕ｧ' },
    { id: 'knowledge-guide', label: '繧ｳ繝ｩ繝繝ｻ遏･隴倥ぎ繧､繝・ },
    { id: 'cta', label: '縺雁撫縺・粋繧上○' },
  ];

  const purposeNav = [
    { id: 'speaker_package', title: "繧ｹ繝斐・繧ｫ繝ｼ莠､謠帙・霆顔ｨｮ蛻･繝励Λ繝ｳ", desc: "邏疲ｭ｣縺ｮ荳肴ｺ繧定ｧ｣豎ｺ縲よ・霆翫↓繝斐ャ繧ｿ繝ｪ縺ｮ髻ｳ繧偵・, icon: Speaker, color: "blue" },
    { id: 'bass_power', title: "菴朱浹蠑ｷ蛹悶・繝代Ρ繝ｼ繧｢繝・・", desc: "霑ｫ蜉帙・驥堺ｽ朱浹縺ｨ縲・ｮｮ譏弱↑隗｣蜒丞ｺｦ繧偵・繝ｩ繧ｹ縲・, icon: Zap, color: "indigo" },
    { id: 'digital_source', title: "繝・ず繧ｿ繝ｫ繝ｻ髻ｳ雉ｪ蛻ｶ蠕｡", desc: "DSP縺ｨ繝｡繝・ぅ繧｢繝励Ξ繝ｼ繝､繝ｼ縺ｧ讌ｵ荳翫・髻ｳ蜒上ｒ縲・, icon: Settings2, color: "purple" },
    { id: 'install_tuning', title: "迺ｰ蠅・メ繝･繝ｼ繝九Φ繧ｰ", desc: "讖滓攝縺ｮ諤ｧ閭ｽ繧・20%蠑輔″蜃ｺ縺吝渕遉主ｷ･莠九・, icon: Shield, color: "orange" },
    { id: 'custom_install', title: "繧ｫ繧ｹ繧ｿ繝繧､繝ｳ繧ｹ繝医・繝ｫ", desc: "蛹縺ｮ謚縺ｧ縲∽ｸ也阜縺ｫ荳蜿ｰ縺ｮ繝ｪ繧ｹ繝九Φ繧ｰ繝ｫ繝ｼ繝繧偵・, icon: Settings2, color: "cyan" },
    { id: 'knowledge-guide', title: "縺頑か縺ｿ隗｣豎ｺ繧ｳ繝ｩ繝", desc: "繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ遏･隴倥ｄ莠倶ｾ九ｒ隱ｭ繧縲・, icon: Info, color: "sky" },
  ];

  const categories = [
    { id: 'speaker_package', title: "繧ｹ繝斐・繧ｫ繝ｼ繝ｻ霆顔ｨｮ蛻･", items: ["BASIC line", "STANDARD line", "3-WAY line", "霆顔ｨｮ蟆ら畑繝励Λ繝ｳ"], icon: Speaker },
    { id: 'bass_power', title: "菴朱浹繝ｻ繧｢繝ｳ繝・, items: ["繧ｵ繝悶え繝ｼ繝上・", "螟夜Κ繧｢繝ｳ繝・], icon: Zap },
    { id: 'digital_source', title: "繝・ず繧ｿ繝ｫ繝ｻDSP", items: ["DSP", "繝励Ξ繝ｼ繝､繝ｼ", "繝翫ン"], icon: Settings2 },
    { id: 'install_tuning', title: "譁ｽ蟾･繝ｻ髮ｻ貅・, items: ["繝・ャ繝峨ル繝ｳ繧ｰ", "髮ｻ貅仙ｼｷ蛹・, "霆雁・髱咎浹"], icon: Shield },
    { id: 'custom_install', title: "騾菴懊・繧ｫ繧ｹ繧ｿ繝", items: ["繝斐Λ繝ｼ蜉蟾･", "繧｢繧ｦ繧ｿ繝ｼ繝舌ャ繝輔Ν", "繝医Λ繝ｳ繧ｯ騾菴・], icon: Settings2 },
  ];

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-600 text-blue-600 border-blue-600",
    indigo: "bg-indigo-600 text-indigo-600 border-indigo-600",
    purple: "bg-purple-600 text-purple-600 border-purple-600",
    orange: "bg-orange-600 text-orange-600 border-orange-600",
    green: "bg-green-600 text-green-600 border-green-600",
    cyan: "bg-cyan-600 text-cyan-600 border-cyan-600"
  };

  const renderHighlightedText = (text: string, color: string) => {
    if (!text) return null;

    const parts = text.split(/(\*\*.*?\*\*)/g);
    const colorClass = colorClasses[color]?.split(' ')[1] || 'text-blue-600';

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} className={`${colorClass} font-black`}>
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  const renderDescriptionWithImages = (text: string, color: string) => {
    if (!text) return null;

    return text.split('\n').map((line, lineIdx) => {
      const imgRegex = /!\[(.*?)\]\((.*?)\)/g;

      // If line only contains images and whitespace/commas
      const textWithoutImages = line.replace(imgRegex, '').trim();
      const matches = Array.from(line.matchAll(imgRegex));

      if (matches.length > 1 && (textWithoutImages === '' || textWithoutImages === ',')) {
        // Determine grid layout based on number of images
        const gridClass = matches.length === 2 ? 'grid-cols-2 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-3';
        return (
          <div key={lineIdx} className={`my-8 grid ${gridClass} gap-4 w-full`}>
            {matches.map((match, imgIdx) => (
              <SafeImage
                key={imgIdx}
                src={match[2]}
                alt={match[1]}
                className="w-full aspect-square rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 object-cover"
              />
            ))}
          </div>
        );
      }

      // For general cases (single image or text)
      const parts = line.split(/(!\[.*?\]\(.*?\))/g);
      return (
        <span key={lineIdx} className="block min-h-[1.5em] mb-1">
          {parts.map((part, i) => {
            const match = part.match(/^!\[(.*?)\]\((.*?)\)$/);
            if (match) {
              return (
                <span key={i} className="block my-8 w-full max-w-3xl mx-auto">
                  <SafeImage
                    src={match[2]}
                    alt={match[1]}
                    className="w-full h-auto rounded-3xl shadow-xl border border-gray-100 object-cover"
                  />
                </span>
              );
            }
            return <span key={i}>{renderHighlightedText(part, color)}</span>;
          })}
        </span>
      );
    });
  };

  const isHtmlGuide = selectedItem?.isGuide && isHtmlString(selectedItem.description || "");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pb-24"
    >


      {/* Plan Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-gray-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col relative ${isHtmlGuide ? 'bg-transparent shadow-none' : 'bg-white'}`}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all z-20 ${isHtmlGuide ? 'bg-gray-900/60 backdrop-blur-md text-white hover:bg-gray-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                aria-label="隧ｳ邏ｰ繧帝哩縺倥ｋ"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-grow overflow-y-auto w-full">
                {!isHtmlGuide && (
                  <div className="relative h-64 md:h-96">
                    <SafeImage
                      src={selectedItem.image || "https://picsum.photos/seed/speaker/1200/800"}
                      className="w-full h-full object-cover"
                      alt={selectedItem.name + "縺ｮ陬ｽ蜩√う繝｡繝ｼ繧ｸ"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                      <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg mb-4 inline-block">
                        {selectedItem.badge || "Premium Plan"}
                      </span>
                      <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
                        {selectedItem.name}
                      </h2>
                    </div>
                  </div>
                )}

                <div className={isHtmlGuide ? "w-full" : "p-8 md:p-12"}>
                  {/* Savings Badge for Packages */}
                  {selectedItem.packageDetails && !selectedItem.isGuide && selectedItem.showSavings !== false && (
                    <div className="mb-10 flex flex-wrap items-center gap-4">
                      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-center gap-6 flex-grow">
                        <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-200">
                          <TrendingDown className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Package Value</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-red-600 tracking-tighter">
                              {formatPrice(selectedItem.packageDetails.savings)}
                            </span>
                            <span className="text-sm font-bold text-red-400 uppercase tracking-widest">繧ゅ♀繝医け・・/span>
                          </div>
                          <div className="text-[10px] text-gray-500 font-bold mt-1">
                            騾壼ｸｸ譁ｽ蟾･蜷郁ｨ・ {formatPrice(selectedItem.packageDetails.standardPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex-grow">
                      <div className="mb-10">
                        {!selectedItem.isGuide && (
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Description
                          </h3>
                        )}
                        <div className="text-gray-600 text-lg font-bold leading-relaxed whitespace-pre-wrap">
                          {isFullHtmlDocument(selectedItem.description || "") ? (
                            <iframe
                              srcDoc={selectedItem.description}
                              className="w-full border-none rounded-2xl bg-white"
                              style={{ minHeight: '600px', height: '75vh' }}
                              title="HTML Content"
                            />
                          ) : isHtmlString(selectedItem.description || "") ? (
                            <div className="html-content" dangerouslySetInnerHTML={{ __html: selectedItem.description }} />
                          ) : (
                            renderDescriptionWithImages(selectedItem.description || "隧ｳ邏ｰ縺ｪ隱ｬ譏弱・迴ｾ蝨ｨ貅門ｙ荳ｭ縺ｧ縺吶よ命蟾･蜀・ｮｹ繧・←蜷郁ｻ顔ｨｮ縺ｫ縺､縺・※縺ｯ縲√♀豌苓ｻｽ縺ｫ縺雁撫縺・粋繧上○縺上□縺輔＞縲・, selectedCategoryColor)
                          )}
                        </div>
                      </div>

                      {/* Package Contents Grid */}
                      {selectedItem.packageDetails && !selectedItem.isGuide && (
                        <div className="mb-12">
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <LayoutGrid className="w-4 h-4" />
                            Package Contents
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedItem.packageDetails.contents.map((content: any, idx: number) => {
                              const Icon = { Speaker, Activity, Layers, Zap, Wrench, Thermometer }[content.icon] || Info;
                              return (
                                <div key={idx} className="flex items-start gap-4 p-5 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg transition-all group">
                                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="font-black text-gray-900 text-sm mb-1">{content.title}</h4>
                                    <p className="text-xs text-gray-500 font-bold leading-relaxed">{content.description}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Speaker Lineup Section */}
                      {selectedItem.lineup && selectedItem.lineup.length > 0 && !selectedItem.isGuide && (
                        <div className="mb-10">
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <List className="w-4 h-4" />
                            Lineup & Audition
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedItem.lineup.map((item: any, idx: number) => (
                              <div key={idx} className="flex flex-col p-5 rounded-3xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-all group relative overflow-hidden">
                                <div className="flex items-center gap-4 mb-4">
                                  {item.image && (
                                    <div
                                      className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-gray-200 bg-white cursor-zoom-in relative group/img"
                                      onClick={() => setSelectedGalleryImage(item.image)}
                                    >
                                      <SafeImage
                                        src={item.image}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt={item.name}
                                      />
                                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                        <Search className="w-4 h-4 text-white" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex-grow">
                                    <div className="font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">{item.name}</div>
                                    {item.description ? (
                                      <div className="text-[10px] font-bold text-gray-500 mt-1 leading-relaxed line-clamp-2">{item.description}</div>
                                    ) : (
                                      <div className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">Speaker Unit</div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/50">
                                  {item.price && parseInt(item.price) > 0 ? (
                                    <span className="font-black text-blue-600">{formatPrice(item.price)}</span>
                                  ) : (
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Consultation Required</span>
                                  )}
                                  {item.youtube && (
                                    <button
                                      onClick={() => {
                                        const videoId = item.youtube.split('v=')[1]?.split('&')[0];
                                        if (videoId) setActiveYoutubeId(videoId);
                                      }}
                                      className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-black text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all min-h-[44px]"
                                    >
                                      <Play className="w-3 h-3 fill-current" />
                                      隧ｦ閨ｴ繧ｵ繝ｳ繝励Ν
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Upgrade Options Table */}
                      {selectedItem.packageDetails?.upgrades && !selectedItem.isGuide && (
                        <div className="mb-12">
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <TrendingDown className="w-4 h-4 rotate-180" />
                            Upgrade Options
                          </h3>
                          <div className="space-y-3">
                            {selectedItem.packageDetails.upgrades.map((upgrade: any, idx: number) => (
                              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gray-900 text-white group hover:bg-blue-900 transition-all">
                                <div className="flex-grow">
                                  <h4 className="font-black text-lg mb-1 group-hover:text-blue-300 transition-colors">{upgrade.title}</h4>
                                  <p className="text-xs text-gray-500 font-bold leading-relaxed">{upgrade.description}</p>
                                </div>
                                <div className="shrink-0 text-right">
                                  <div className="text-blue-400 font-black text-lg tracking-tighter">
                                    {upgrade.price.startsWith('+') || upgrade.price.includes('%') ? upgrade.price : `+${formatPrice(upgrade.price)}`}
                                  </div>
                                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Add-on Price</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notes Section */}
                      {selectedItem.packageDetails?.notes && !selectedItem.isGuide && (
                        <div className="mb-10">
                          <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Notes & Conditions
                          </h3>
                          <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                            <ul className="space-y-3">
                              {selectedItem.packageDetails.notes.map((note: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 text-xs font-bold text-gray-500 leading-relaxed">
                                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                                  {note}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {selectedItem.features && selectedItem.features.length > 0 && !selectedItem.isGuide && (
                        <div>
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Included Features
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {selectedItem.features.map((f: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm font-bold text-gray-700">{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Gallery Section */}
                      {selectedItem.gallery && selectedItem.gallery.length > 0 && !selectedItem.isGuide && (
                        <div className="mt-12">
                          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-8 flex items-center gap-2">
                            <LayoutGrid className="w-4 h-4" />
                            Installation Gallery
                          </h3>
                          <div className="space-y-12">
                            {selectedItem.gallery.map((group: any, groupIdx: number) => (
                              <div key={groupIdx} className="space-y-4">
                                <h4 className="text-lg font-black text-gray-900 flex items-center gap-3">
                                  <div className="w-2 h-8 bg-blue-600 rounded-full" />
                                  {group.title}
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                  {group.images.map((img: string, imgIdx: number) => (
                                    <motion.button
                                      key={imgIdx}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => setSelectedGalleryImage(img)}
                                      className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm group"
                                    >
                                      <SafeImage
                                        src={img}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt={`${group.title} - ${imgIdx + 1}`}
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <Search className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedItem.isGuide && selectedItem.link && (
                        <div className="mt-8">
                          <a
                            href={selectedItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-bold text-sm md:text-base tracking-widest transition-all shadow-lg"
                          >
                            <ExternalLink className="w-5 h-5" />
                            蜈ｬ蠑上し繧､繝医〒隧ｳ邏ｰ繧定ｪｭ繧
                          </a>
                        </div>
                      )}
                    </div>

                    {!selectedItem.isGuide && (
                      <div className="w-full md:w-80 shrink-0">
                        <div className="bg-gray-900 rounded-[2rem] p-8 text-white sticky top-0">
                          <div className="mb-8">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Price (Tax Incl.)</p>
                            <div className="text-4xl font-black text-blue-400 tracking-tighter">
                              {formatPrice(selectedItem.price)}
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2">窶ｻ蜿紋ｻ伜ｷ･雉・・繧ｷ繝ｧ繝ｼ繝医ヱ繝ｼ繝・ｾｼ縺ｿ</p>
                          </div>

                          {selectedItem.link && (
                            <div className="mb-6">
                              <a
                                href={selectedItem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-xs tracking-widest transition-all border border-white/10"
                              >
                                <ExternalLink className="w-4 h-4" />
                                蜈ｬ蠑上し繧､繝医〒隧ｳ邏ｰ繧定ｦ九ｋ
                              </a>
                            </div>
                          )}

                          <div className="space-y-4">
                            <a
                              href="https://page.line.me/312qjhsq?openQrModal=true"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-3 w-full bg-[#06C755] text-white py-4 rounded-xl font-black text-sm tracking-widest hover:scale-105 transition-all"
                            >
                              <MessageSquare className="w-5 h-5" />
                              LINE縺ｧ逶ｸ隲・                            </a>
                            <button
                              onClick={() => {
                                setSelectedItem(null);
                                scrollToSection('cta');
                              }}
                              className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm tracking-widest hover:scale-105 transition-all"
                            >
                              <Calendar className="w-5 h-5" />
                              譚･蠎嶺ｺ育ｴ・                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Modal */}
      <AnimatePresence>
        {activeYoutubeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setActiveYoutubeId(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                aria-label="蜍慕判繧帝哩縺倥ｋ"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {selectedGalleryImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGalleryImage(null)}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedGalleryImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors flex items-center gap-2 font-black text-sm tracking-widest uppercase"
                aria-label="逕ｻ蜒上ｒ髢峨§繧・
              >
                CLOSE <X className="w-6 h-6" />
              </button>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={selectedGalleryImage}
                  className="max-w-full max-h-[85vh] object-contain"
                  alt="Gallery Preview"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audition Speaker Image Modal */}
      <AnimatePresence>
        {selectedAuditionImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAuditionImage(null)}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAuditionImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors flex items-center gap-2 font-black text-sm tracking-widest uppercase"
              >
                CLOSE <X className="w-6 h-6" />
              </button>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900">
                <img
                  src={selectedAuditionImage}
                  className="max-w-full max-h-[85vh] object-contain"
                  alt="Speaker Preview"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {viewingCategoryDetail ? (
          <motion.div
            key="category-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            {(() => {
              const detail = categoryExplanations[viewingCategoryDetail];
              if (!detail) return null;
              return (
                <div className="min-h-screen bg-gray-50 pb-24">
                  <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                      <button
                        onClick={() => setViewingCategoryDetail(null)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-bold group"
                        aria-label="繝｡繝九Η繝ｼ縺ｫ謌ｻ繧・
                      >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">BACK TO MENU</span>
                      </button>
                      <h2 className="font-black text-xl tracking-tighter">繧ｫ繝・ざ繝ｪ繝ｼ隗｣隱ｬ</h2>
                      <div className="w-24"></div>
                    </div>
                  </div>

                  <div className="max-w-4xl mx-auto px-4 py-12">
                    <div className="relative h-[300px] md:h-[450px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
                      <img src={detail.image} className="w-full h-full object-cover" alt={detail.title} referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 ${colorClasses[detail.color].split(' ')[0]} text-white shadow-lg`}>
                          <detail.icon className="w-7 h-7 md:w-8 md:h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">{detail.title}</h1>
                        <p className="text-lg md:text-xl text-gray-200 font-bold leading-tight">
                          {renderHighlightedText(detail.subtitle, detail.color)}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-gray-100 mb-12">
                      <div className="mb-16">
                        <h3 className="text-2xl font-black mb-6 text-gray-900 flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full ${colorClasses[detail.color].split(' ')[0]}`}></div>
                          隗｣隱ｬ
                        </h3>
                        <p className="text-gray-600 text-lg font-medium leading-relaxed mb-12 whitespace-pre-wrap">
                          {renderHighlightedText(detail.description, detail.color)}
                        </p>

                        {detail.sampleDescription && (
                          <div className={`p-8 rounded-[2.5rem] ${colorClasses[detail.color].split(' ')[1].replace('text-', 'bg-').replace('600', '50')} border border-current/10`}>
                            <h4 className={`text-sm font-black mb-4 uppercase tracking-[0.2em] ${colorClasses[detail.color].split(' ')[1]}`}>Sample Description</h4>
                            <p className="text-gray-800 font-bold leading-relaxed italic">
                              {detail.sampleDescription}
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-2xl font-black mb-8 text-gray-900 flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full ${colorClasses[detail.color].split(' ')[0]}`}></div>
                          譁ｽ蟾･縺ｮ繝｡繝ｪ繝・ヨ
                        </h3>
                        <div className="grid gap-6">
                          {detail.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-5 bg-gray-50 p-8 rounded-3xl border border-gray-100 group hover:bg-white hover:shadow-lg transition-all">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[detail.color].split(' ')[1].replace('text-', 'bg-').replace('600', '100')} ${colorClasses[detail.color].split(' ')[1]} shrink-0`}>
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                              <p className="font-black text-gray-800 text-lg leading-snug">{benefit}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {detail.upgrades && (
                        <div className="mt-20 pt-20 border-t border-gray-100">
                          <h3 className="text-2xl font-black mb-8 text-gray-900 flex items-center gap-3">
                            <div className={`w-2 h-8 rounded-full ${colorClasses[detail.color].split(' ')[0]}`}></div>
                            縺輔ｉ縺ｫ讌ｵ繧√ｋ縺溘ａ縺ｮ繧｢繝・・繧ｰ繝ｬ繝ｼ繝・                          </h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            {detail.upgrades.map((upgrade, i) => (
                              <div key={i} className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                                <div className="relative z-10">
                                  <div className="flex items-center justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[detail.color].split(' ')[0]}`}>
                                      <upgrade.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-blue-400 font-black text-sm">{upgrade.price}</span>
                                  </div>
                                  <h4 className="text-xl font-black mb-3">{upgrade.title}</h4>
                                  <p className="text-gray-500 text-sm font-bold leading-relaxed">
                                    {upgrade.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                      <button
                        onClick={() => {
                          const isOptional = optionals.some(o => o.id === viewingCategoryDetail);
                          if (isOptional) {
                            setViewingCategoryDetail(null);
                            setTimeout(() => scrollToSection('options'), 100);
                          } else {
                            setViewingFullList(viewingCategoryDetail);
                            setViewingCategoryDetail(null);
                            window.scrollTo(0, 0);
                          }
                        }}
                        className="flex-grow bg-gray-900 text-white py-6 rounded-[2rem] font-black text-lg tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-200"
                      >
                        {optionals.some(o => o.id === viewingCategoryDetail) ? '莉伜ｸｯ繧ｵ繝ｼ繝薙せ荳隕ｧ繧定ｦ九ｋ' : '繝励Λ繝ｳ荳隕ｧ繧定ｦ九ｋ'}
                      </button>
                      <button
                        onClick={() => setViewingCategoryDetail(null)}
                        className="flex-grow bg-white text-gray-900 py-6 rounded-[2rem] font-black text-lg tracking-widest border border-gray-200 hover:bg-gray-50 transition-all"
                      >
                        繝｡繝九Η繝ｼ縺ｫ謌ｻ繧・                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        ) : viewingFullList ? (
          <motion.div
            key="full-list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            {(() => {
              const currentCategory = plans.find(p => p.id === viewingFullList);
              return (
                <div className="min-h-screen bg-gray-50 pb-24">
                  <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setViewingFullList(null);
                          window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-bold group"
                        aria-label="繝｡繝九Η繝ｼ縺ｫ謌ｻ繧・
                      >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">BACK TO MENU</span>
                      </button>
                      <h2 className="font-black text-xl tracking-tighter">{currentCategory?.category} 荳隕ｧ</h2>
                      <div className="w-24"></div>
                    </div>
                  </div>

                  <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Category Description Section */}
                    {currentCategory?.showDescriptionInList && (currentCategory.description || (currentCategory.images && currentCategory.images.length > 0)) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 relative"
                      >
                        <div className="absolute -top-10 -left-4 text-[8rem] md:text-[12rem] font-black text-blue-600/[0.03] select-none pointer-events-none tracking-tighter leading-none z-0">
                          AUDIO
                        </div>
                        <div className="relative z-10 bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 overflow-hidden border border-gray-200 shadow-sm">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-gray-50/30"></div>
                          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center relative z-10">
                            {currentCategory.images && currentCategory.images.length > 0 && (
                              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {currentCategory.images.map((img, i) => (
                                  <div key={i} className={`relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 group ${currentCategory.images!.length === 1 ? 'sm:col-span-2 aspect-video' : 'aspect-square'}`}>
                                    <img
                                      src={img}
                                      alt={`${currentCategory.category} image ${i + 1}`}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className={`w-full ${currentCategory.images && currentCategory.images.length > 0 ? 'lg:w-1/2' : 'lg:w-full'}`}>
                              <div className="flex items-center gap-3 mb-6 md:mb-8">
                                <div className="w-10 h-[2px] bg-blue-600/30"></div>
                                <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
                                  Category Story
                                </span>
                              </div>
                              <h4 className="text-2xl md:text-4xl font-black mb-6 md:mb-10 tracking-tighter leading-[1.1] text-gray-900">
                                {currentCategory.category}
                              </h4>
                              <div className="text-gray-600 font-medium text-base md:text-xl leading-relaxed whitespace-pre-wrap max-w-2xl mb-8">
                                {renderHighlightedText(currentCategory.description || "", categoryExplanations[currentCategory.id]?.color || 'blue')}
                              </div>

                              {/* Dynamic Sub-category Tabs in Full List - Only show if > 3 items */}
                              {categorySubTabs[currentCategory.id] && currentCategory.items.length > 3 && (
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-6 border-t border-blue-600/10">
                                  <div className="flex bg-gray-900/5 p-1 rounded-2xl md:rounded-full backdrop-blur-sm border border-black/5">
                                    {categorySubTabs[currentCategory.id].map(tab => (
                                      <button
                                        key={tab.id}
                                        onClick={() => {
                                          setActiveSubTab(tab.id);
                                          // Scroll to start of items if needed
                                        }}
                                        className={`px-6 py-2.5 rounded-2xl md:rounded-full text-xs font-black transition-all ${activeSubTab === tab.id ? 'bg-white text-blue-600 shadow-xl' : 'text-gray-500 hover:text-gray-700'}`}
                                      >
                                        {tab.label} <span className="text-[10px] opacity-70 ml-1">{tab.en}</span>
                                      </button>
                                    ))}
                                  </div>
                                  <p className="text-[11px] font-bold text-blue-600/60 flex items-center gap-2">
                                    <Info className="w-3.5 h-3.5" />
                                    竊・{categorySubTabs[currentCategory.id].find(t => t.id === activeSubTab)?.info || "繝励Λ繝ｳ繧帝∈謚槭＠縺ｦ縺上□縺輔＞"}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {currentCategory?.items
                        .filter(item => {
                          const hasTabs = currentCategory.items.length > 3;
                          if (!hasTabs) return true;
                          // If this category has tabs, only show matches. 
                          // If current activeSubTab doesn't belong to this category, show first tab by default
                          const availableTabIds = categorySubTabs[currentCategory.id]?.map(t => t.id) || [];
                          const isRelevantTab = availableTabIds.includes(activeSubTab);
                          if (!isRelevantTab) return item.subType === availableTabIds[0];
                          return item.subType === activeSubTab;
                        })
                        .map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => {
                              setSelectedItem(item);
                              setSelectedCategoryColor(categoryExplanations[currentCategory.id]?.color || 'blue');
                            }}
                            className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col relative group overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
                          >
                            <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden">
                              <img
                                src={item.image || "https://picsum.photos/seed/speaker/800/600"}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                              <div className="absolute top-4 right-4">
                                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                  {item.badge}
                                </span>
                              </div>
                            </div>
                            <div className="relative z-10">
                              <h4 className="text-2xl font-black mb-2 text-gray-900">{item.name}</h4>
                              <div className="text-3xl font-black text-blue-600 mb-6">{formatPrice(item.price)}</div>
                              <ul className="space-y-4 mb-8">
                                {item.features.map((f, j) => (
                                  <li key={j} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    {f}
                                  </li>
                                ))}
                              </ul>

                              {categoryExplanations[currentCategory.id]?.upgrades && (
                                <div className="mt-auto pt-6 border-t border-gray-100">
                                  <div className="flex items-center justify-between mb-4">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Upgrade Options</p>
                                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">蟾ｮ鬘阪〒繧｢繝・・繧ｰ繝ｬ繝ｼ繝牙庄閭ｽ</span>
                                  </div>
                                  <div className="grid grid-cols-1 gap-2">
                                    {categoryExplanations[currentCategory.id].upgrades?.map((upg, k) => (
                                      <div key={k} className="group/upg relative">
                                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100 group-hover/upg:border-blue-200 group-hover/upg:bg-blue-50 transition-all cursor-help">
                                          <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover/upg:text-blue-600 transition-colors">
                                              <upg.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-[11px] font-bold text-gray-700">{upg.title}</span>
                                          </div>
                                          <span className="text-[11px] font-black text-blue-600">{upg.price}</span>
                                        </div>

                                        {/* Hover Details */}
                                        <div className="absolute bottom-full left-0 right-0 mb-2 opacity-0 invisible group-hover/upg:opacity-100 group-hover/upg:visible transition-all z-20">
                                          <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-2xl text-[11px] leading-relaxed border border-white/10">
                                            <p className="font-bold mb-1 text-blue-400">{upg.title}</p>
                                            {upg.description}
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(item);
                                setSelectedCategoryColor(categoryExplanations[currentCategory.id]?.color || 'blue');
                              }}
                              className="mt-8 w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
                            >
                              PLAN DETAILS
                            </button>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        ) : (
          <motion.div
            key="main-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >

            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-2">
                {/* Left: Back Button */}
                <div className="flex-1 flex items-center">
                  <button
                    onClick={onBack}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors font-bold group shrink-0"
                    aria-label="繝医ャ繝励↓謌ｻ繧・
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Center: Title */}
                <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                  <Speaker className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  <h2 className="font-black text-sm md:text-xl tracking-tighter whitespace-nowrap">AUDIO MENU</h2>
                </div>

                {/* Right: Actions */}
                <div className="flex-1 flex items-center justify-end gap-1.5 md:gap-3">
                  {/* LINE Inquiry */}
                  <a
                    href="https://page.line.me/312qjhsq?openQrModal=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-[#06C755] text-white rounded-xl font-black transition-all hover:bg-[#05b34c] shadow-sm shrink-0"
                    aria-label="LINE縺ｧ逶ｸ隲・☆繧・
                  >
                    <MessageSquare className="w-5 h-5 md:mr-2" />
                    <span className="hidden md:inline text-[10px]">LINE逶ｸ隲・/span>
                  </a>

                  {/* Reservation */}
                  <button
                    onClick={() => scrollToSection('cta')}
                    className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-2.5 bg-blue-600 text-white rounded-xl font-black transition-all hover:bg-blue-700 shadow-sm shrink-0"
                    aria-label="譚･蠎嶺ｺ育ｴ・
                  >
                    <Calendar className="w-5 h-5 md:mr-2" />
                    <span className="hidden md:inline text-[10px]">譚･蠎嶺ｺ育ｴ・/span>
                  </button>

                  <div className="relative shrink-0">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors"
                      aria-label={isMenuOpen ? "繝｡繝九Η繝ｼ繧帝哩縺倥ｋ" : "繝｡繝九Η繝ｼ繧帝幕縺・}
                    >
                      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    <AnimatePresence>
                      {isMenuOpen && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 overflow-hidden"
                          >
                            <div className="space-y-3 mb-4 pb-4 border-b border-gray-100 md:hidden">
                              <a
                                href="https://page.line.me/312qjhsq?openQrModal=true"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 w-full px-4 py-3 bg-[#06C755] text-white rounded-xl font-black text-xs shadow-sm"
                              >
                                <MessageSquare className="w-5 h-5" />
                                LINE縺ｧ逶ｸ隲・☆繧・                              </a>
                              <button
                                onClick={() => scrollToSection('cta')}
                                className="flex items-center gap-3 w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-black text-xs shadow-sm"
                              >
                                <Calendar className="w-5 h-5" />
                                譚･蠎嶺ｺ育ｴ・・縺雁撫縺・粋繧上○
                              </button>
                            </div>
                            <div className="space-y-1">
                              {navLinks.map((link) => (
                                <button
                                  key={link.id}
                                  onClick={() => scrollToSection(link.id)}
                                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-black text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-between group"
                                >
                                  {link.label}
                                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
              <SafeImage
                src={assets.audioMenuImage}
                className="absolute inset-0 w-full h-full object-cover scale-105"
                alt="鬮伜刀雉ｪ縺ｪ繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ繧ｷ繧ｹ繝・Β譁ｽ蟾･繧､繝｡繝ｼ繧ｸ"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gray-50"></div>
              <div className="relative z-10 text-center px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-blue-400 font-black tracking-[0.3em] uppercase text-xs mb-6 block">Premium Car Audio Solution</span>
                  <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                    SOUND<br />EXPERIENCE
                  </h1>
                  <p className="text-gray-200 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                    縲悟・驛ｨ隕九○繧九阪〒縺ｯ縺ｪ縺上碁∈縺ｰ縺帙※縺九ｉ蜈ｨ驛ｨ隕九○繧九阪・br />
                    縺ゅ↑縺溘・逶ｮ逧・↓蜷医ｏ縺帙◆縲∵怙驕ｩ縺ｪ繧ｪ繝ｼ繝・ぅ繧ｪ繝励Λ繝ｳ繧偵＃謠先｡医＠縺ｾ縺吶・                  </p>
                </motion.div>
              </div>
            </section>

            {/* Layer 1: Purpose Navigation */}
            <section id="purpose-nav" className="max-w-7xl mx-auto px-4 -mt-8 md:-mt-12 relative z-20 mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                {purposeNav.map((nav, i) => (
                  <motion.button
                    key={nav.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.3 }}
                    onClick={() => {
                      if (nav.id === 'knowledge-guide') {
                        const element = document.getElementById('knowledge-guide');
                        if (element) {
                          const bodyRect = document.body.getBoundingClientRect().top;
                          const elementRect = element.getBoundingClientRect().top;
                          window.scrollTo({ top: (elementRect - bodyRect) - 80, behavior: 'smooth' });
                        }
                        return;
                      }
                      setActiveCategory(nav.id as any);
                      setExpandedSection(nav.id);
                      setTimeout(() => {
                        const element = document.getElementById('plan-list');
                        if (element) {
                          const offset = 120;
                          const bodyRect = document.body.getBoundingClientRect().top;
                          const elementRect = element.getBoundingClientRect().top;
                          window.scrollTo({ top: (elementRect - bodyRect) - offset, behavior: 'smooth' });
                        }
                      }, 50);
                    }}
                    className={`group bg-white p-3 md:p-4 rounded-[1rem] md:rounded-[1.25rem] shadow-lg border transition-all text-left flex items-center gap-3 md:gap-4 h-full ${activeCategory === nav.id ? 'border-blue-500 ring-2 ring-blue-50' : 'border-white hover:border-blue-200'
                      }`}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${nav.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                      nav.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                        nav.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                          nav.color === 'red' ? 'bg-red-50 text-red-600' :
                            nav.color === 'sky' ? 'bg-white border border-sky-100 text-sky-500 shadow-sm' :
                              'bg-purple-50 text-purple-600'
                      }`}>
                      <nav.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h2 className={`font-black text-xs md:text-sm mb-0.5 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tighter ${nav.color === 'sky' ? 'text-sky-600' : 'text-gray-900'}`}>{nav.title}</h2>
                      <p className="text-[10px] text-gray-500 font-bold leading-tight line-clamp-1">{nav.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* Layer 2: Plan List */}
            <section id="plan-list" className="max-w-7xl mx-auto px-4 mb-32 scroll-mt-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <div className="w-6 md:w-8 h-1 bg-blue-600"></div>
                    <span className="text-blue-600 font-black tracking-widest uppercase text-[10px] md:text-xs">Plan Packages</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black tracking-tighter">繝励Λ繝ｳ繝ｻ繝代ャ繧ｱ繝ｼ繧ｸ荳隕ｧ</h2>
                </div>

                {/* Tab Bar / Accordion Controller */}
                <div className="sticky top-16 z-40 md:relative md:top-0 -mx-4 px-4 md:mx-0 md:px-0 py-3 bg-white/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border-b border-gray-100 md:border-none shadow-sm md:shadow-none">
                  <div className="flex overflow-x-auto pb-1 md:flex-wrap items-center gap-2 no-scrollbar">
                    <button
                      onClick={() => {
                        setActiveCategory('all');
                        setExpandedSection(null);
                      }}
                      className={`px-5 py-3 rounded-full text-[10px] md:text-xs font-black transition-all whitespace-nowrap min-h-[44px] ${activeCategory === 'all' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-700'}`}
                    >
                      縺吶∋縺ｦ陦ｨ遉ｺ
                    </button>
                    {purposeNav.map(nav => (
                      <button
                        key={nav.id}
                        onClick={() => {
                          setActiveCategory(nav.id as any);
                          setExpandedSection(nav.id);
                          // Reset sub tab to the first one defined for the category
                          if (categorySubTabs[nav.id]) {
                            setActiveSubTab(categorySubTabs[nav.id][0].id);
                          }
                          const element = document.getElementById(`section-${nav.id}`);
                          if (element) {
                            const offset = 120;
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = element.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className={`px-5 py-3 rounded-full text-[10px] md:text-xs font-black transition-all whitespace-nowrap min-h-[44px] ${activeCategory === nav.id ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-700'}`}
                      >
                        {nav.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-24">
                {plans
                  .filter(p => ['speaker_package', 'bass_power', 'digital_source', 'install_tuning', 'custom_install'].includes(p.id))
                  .filter(p => activeCategory === 'all' || p.id === activeCategory)
                  .map((section, idx) => (
                    <motion.div
                      key={section.id}
                      id={`section-${section.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white md:bg-transparent rounded-3xl md:rounded-none overflow-hidden border border-gray-100 md:border-none shadow-sm md:shadow-none"
                    >
                      {/* Accordion Header for Mobile / Section Header for Desktop */}
                      <div
                        onClick={() => {
                          if (isMobile) {
                            setExpandedSection(expandedSection === section.id ? null : section.id);
                          }
                        }}
                        className={`flex items-center justify-between p-5 md:p-0 md:mb-8 transition-colors ${isMobile ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'}`}
                      >
                        <div className="flex items-center gap-3 md:gap-4 flex-grow">
                          <h3 className="text-sm md:text-2xl font-black tracking-tighter bg-gray-900 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full">
                            {section.category}
                          </h3>
                          <div className="hidden md:block flex-grow h-px bg-gray-200"></div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingFullList(section.id);
                              window.scrollTo(0, 0);
                            }}
                            className="hidden md:flex items-center gap-1.5 text-[10px] md:text-xs font-black text-blue-600 hover:text-blue-700 transition-colors group shrink-0"
                          >
                            縺吶∋縺ｦ隕九ｋ
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                          {isMobile && (
                            <div className="md:hidden">
                              <motion.div
                                animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronRight className="w-5 h-5 text-gray-500" />
                              </motion.div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Category Description Section */}
                      {section.showDescriptionInMenu && (section.description || (section.images && section.images.length > 0)) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => {
                            if (isMobile) {
                              setExpandedSection(expandedSection === section.id ? null : section.id);
                            }
                          }}
                          className={`px-4 md:px-0 mb-12 md:mb-20 relative ${isMobile ? 'cursor-pointer' : ''}`}
                        >
                          <div className="absolute -top-10 -left-4 text-[8rem] md:text-[12rem] font-black text-blue-600/[0.03] select-none pointer-events-none tracking-tighter leading-none z-0">
                            AUDIO
                          </div>
                          <div className={`relative z-10 bg-gradient-to-br from-white via-blue-50/10 to-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 overflow-hidden ${isMobile ? 'active:scale-[0.99] transition-transform duration-200' : ''}`}>
                            <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
                              {section.images && section.images.length > 0 && (
                                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                  {section.images.map((img, i) => (
                                    <div key={i} className={`relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 group ${section.images!.length === 1 ? 'sm:col-span-2 aspect-video' : 'aspect-square'}`}>
                                      <SafeImage
                                        src={img}
                                        alt={`${section.category} image ${i + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className={`w-full ${section.images && section.images.length > 0 ? 'lg:w-1/2' : 'lg:w-full'}`}>
                                <div className="flex items-center gap-3 mb-6 md:mb-8">
                                  <div className="w-10 h-[2px] bg-blue-600/30"></div>
                                  <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
                                    Category Story
                                  </span>
                                </div>
                                <h4 className="text-2xl md:text-4xl font-black mb-6 md:mb-10 tracking-tighter leading-[1.1] text-gray-900">
                                  {section.category}
                                </h4>
                                <div className="text-gray-600 font-medium text-base md:text-xl leading-relaxed whitespace-pre-wrap max-w-2xl mb-8">
                                  {renderHighlightedText(section.description || "", categoryExplanations[section.id]?.color || 'blue')}
                                </div>

                                {/* Dynamic Sub-category Tabs - Only show if > 3 items */}
                                {categorySubTabs[section.id] && section.items.length > 3 && (
                                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-6 border-t border-blue-600/10">
                                    <div className="flex bg-gray-900/5 p-1 rounded-2xl md:rounded-full backdrop-blur-sm border border-black/5">
                                      {categorySubTabs[section.id].map(tab => (
                                        <button
                                          key={tab.id}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveSubTab(tab.id);
                                            if (isMobile) {
                                              setExpandedSection(section.id);
                                            }
                                          }}
                                          className={`px-6 py-2.5 rounded-2xl md:rounded-full text-xs font-black transition-all ${activeSubTab === tab.id ? 'bg-white text-blue-600 shadow-xl' : 'text-gray-500 hover:text-gray-700'}`}
                                        >
                                          {tab.label} <span className="text-[10px] opacity-70 ml-1">{tab.en}</span>
                                        </button>
                                      ))}
                                    </div>
                                    <p className="text-[11px] font-bold text-blue-600/60 flex items-center gap-2">
                                      <Info className="w-3.5 h-3.5" />
                                      竊・{categorySubTabs[section.id].find(t => t.id === activeSubTab)?.info || (categorySubTabs[section.id] && categorySubTabs[section.id][0].info)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Content Area: Accordion on Mobile, Grid on Desktop */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: (!isMobile || expandedSection === section.id) ? 'auto' : 0,
                          opacity: (!isMobile || expandedSection === section.id) ? 1 : 0
                        }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 md:p-0 space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
                          {(section.items || [])
                            .filter(item => {
                              const hasTabs = section.items.length > 3;
                              if (!hasTabs) return true;
                              const availableTabIds = categorySubTabs[section.id]?.map(t => t.id) || [];
                              const isRelevantTab = availableTabIds.includes(activeSubTab);
                              if (!isRelevantTab) return item.subType === availableTabIds[0];
                              return item.subType === activeSubTab;
                            })
                            .slice(0, isMobile ? undefined : 3)
                            .map((item, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ y: !isMobile ? -10 : 0 }}
                                className="bg-white rounded-2xl md:rounded-[2.5rem] shadow-md md:shadow-xl border border-gray-100 flex flex-row md:flex-col relative group overflow-hidden"
                              >
                                {/* Mobile List Image / Desktop Card Image */}
                                <div className="relative w-32 h-20 md:h-48 shrink-0 md:w-full overflow-hidden">
                                  <img
                                    src={item.image || "https://picsum.photos/seed/speaker/800/600"}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
                                  <div className="absolute top-2 right-2 md:top-4 md:right-4">
                                    <span className="bg-blue-600 text-white text-[7px] md:text-[10px] font-black px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-widest shadow-lg">
                                      {item.badge}
                                    </span>
                                  </div>
                                </div>

                                <div className="p-4 md:p-8 pt-3 md:pt-4 relative z-10 flex flex-col flex-grow min-w-0">
                                  <div className="flex flex-col md:block mb-2 md:mb-0">
                                    <h4 className="text-sm md:text-2xl font-black text-gray-900 leading-tight truncate md:whitespace-normal mb-0.5 md:mb-1">
                                      {item.name}
                                    </h4>
                                    <div className="text-lg md:text-3xl font-black text-blue-600">
                                      {formatPrice(item.price)}
                                    </div>
                                  </div>

                                  <ul className="hidden md:block space-y-2.5 md:space-y-3 mb-6">
                                    {(item.features || []).slice(0, 3).map((f, j) => (
                                      <li key={j} className="flex items-start gap-2 text-xs md:text-sm font-bold text-gray-600">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                        <span className="leading-tight">{f}</span>
                                      </li>
                                    ))}
                                  </ul>

                                  {/* Mobile: Simple feature list */}
                                  <div className="md:hidden flex flex-wrap gap-1.5 mb-3">
                                    {(item.features || []).slice(0, 2).map((f, j) => (
                                      <span key={j} className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                        {f}
                                      </span>
                                    ))}
                                  </div>

                                  <button
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setSelectedCategoryColor(categoryExplanations[section.id]?.color || 'blue');
                                    }}
                                    className="mt-auto w-full bg-gray-900 text-white py-2 md:py-3.5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-xs tracking-widest hover:bg-blue-600 transition-all shadow-sm md:shadow-lg"
                                  >
                                    PLAN DETAILS
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                        </div>

                        {/* Bottom View All Button */}
                        {!isMobile && (
                          <div className="mt-6 md:mt-10 px-4 md:px-0">
                            <button
                              onClick={() => {
                                setViewingFullList(section.id);
                                // Reset sub tab to the first one defined for the category
                                if (categorySubTabs[section.id]) {
                                  setActiveSubTab(categorySubTabs[section.id][0].id);
                                }
                                window.scrollTo(0, 0);
                              }}
                              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-blue-100 text-blue-600 py-4 md:py-6 rounded-2xl md:rounded-[2.5rem] font-black text-xs md:text-lg tracking-widest hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm group"
                            >
                              <span className="hidden md:inline">{section.category}縺ｮ蜈ｨ繝励Λ繝ｳ繧偵メ繧ｧ繝・け縺吶ｋ</span>
                              <span className="md:hidden">{section.category}縺ｮ蜈ｨ繝励Λ繝ｳ繧定ｦ九ｋ</span>
                              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
              </div>
            </section>

            {/* Knowledge Guide Section */}
            <section id="knowledge-guide" className="py-20 md:py-32 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12 md:mb-20">
                  <span className="text-blue-600 font-black tracking-[0.4em] mb-4 md:mb-6 block text-[10px] md:text-sm">Audio Upgrade Guide</span>
                  <h2 className="text-3xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6 md:mb-8">
                    逅・Φ縺ｮ髻ｳ繧定ｦ九▽縺代ｋ<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">繧｢繧､繝・い髮・/span>
                  </h2>
                  <p className="text-gray-500 font-bold text-sm md:text-lg max-w-2xl mx-auto mb-10 md:mb-16">
                    繧ｫ繝ｼ繧ｪ繝ｼ繝・ぅ繧ｪ縺ｮ螂･豺ｱ縺・ｸ也阜縺ｸ繧医≧縺薙◎縲ょ・繧√※縺ｮ譁ｹ縺ｸ縺ｮ蟆主・繝偵Φ繝医°繧峨∵怙譁ｰ繝医Ξ繝ｳ繝峨・蠕ｹ蠎戊ｧ｣隱ｬ縺ｾ縺ｧ縲√≠縺ｪ縺溘・霆翫ｒ繝ｯ繝ｳ繝ｩ繝ｳ繧ｯ荳翫・遨ｺ髢薙↓螟峨∴繧区ュ蝣ｱ繧偵♀螻翫￠縺励∪縺吶・                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {(showAllGuides ? guides : guides.slice(0, 3)).map((guide) => (
                    <div key={guide.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col cursor-pointer"
                      onClick={() => {
                        setSelectedItem({
                          name: guide.title,
                          price: "0",
                          features: guide.features,
                          badge: guide.badge,
                          image: guide.image,
                          description: guide.description,
                          packageDetails: guide.packageDetails,
                          lineup: guide.lineup,
                          isGuide: true
                        });
                        setSelectedCategoryColor('sky');
                      }}>
                      <div className="h-48 md:h-64 relative overflow-hidden">
                        <SafeImage src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-4 md:top-6 left-4 md:left-6">
                          <span className="bg-blue-600 text-white text-[10px] md:text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg">
                            {guide.badge}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col flex-1">
                        <h3 className="text-lg md:text-2xl font-black text-gray-900 mb-4 leading-tight">
                          {guide.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                          {guide.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="text-[9px] md:text-xs font-bold text-gray-500 bg-gray-100/80 px-2 py-1 rounded-md">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-500 text-xs md:text-sm font-medium line-clamp-2 md:line-clamp-3 mb-6 md:mb-8 flex-1 leading-relaxed whitespace-pre-line">
                          {isHtmlString(guide.description || "") ? stripHtml(guide.description).split('\n')[0] : guide.description.split('\n')[0]}
                        </p>
                        <button className="flex items-center justify-center gap-3 w-full bg-gray-50 group-hover:bg-blue-50 text-gray-600 group-hover:text-blue-600 py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm transition-colors mt-auto">
                          <span>邯壹″繧定ｪｭ繧</span>
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Guides Toggle */}
                {!showAllGuides && guides.length > 3 && (
                  <div className="mt-8 md:mt-12 px-4 md:px-0 flex justify-center">
                    <button
                      onClick={() => setShowAllGuides(true)}
                      className="w-full max-w-3xl flex items-center justify-center gap-3 bg-white border-2 border-blue-100 text-blue-600 py-3 md:py-5 rounded-2xl md:rounded-[2.5rem] font-black text-xs md:text-lg tracking-widest hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm group"
                    >
                      <span className="hidden md:inline">縺吶∋縺ｦ縺ｮ繧ｳ繝ｩ繝繧偵メ繧ｧ繝・け縺吶ｋ</span>
                      <span className="md:hidden">縺吶∋縺ｦ縺ｮ險倅ｺ九ｒ隕九ｋ</span>
                      <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Audition Speakers Showcase Section */}
            <section id="options" className="py-20 md:py-32 bg-gray-900 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[150px]"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12 md:mb-20">
                  <span className="text-blue-400 font-black tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 block">Audition Units</span>
                  <h2 className="text-3xl md:text-8xl font-black text-white tracking-tighter mb-6 md:mb-8 leading-none">
                    蟶ｸ譎りｩｦ閨ｴ蜿ｯ閭ｽ縺ｪ<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">繧ｹ繝斐・繧ｫ繝ｼ縺ｮ縺皮ｴｹ莉・/span>
                  </h2>
                  <p className="text-gray-400 font-bold text-sm md:text-xl max-w-3xl mx-auto mb-10 md:mb-16 leading-relaxed">
                    逋ｾ閨槭・荳隕具ｼ井ｸ閨ｴ・峨↓螯ゅ°縺壹・NG縺ｧ縺ｯ縲∝嵜蜀・､悶・蜴ｳ驕ｸ縺輔ｌ縺溘せ繝斐・繧ｫ繝ｼ繧貞ｮ滄圀縺ｫ閨ｴ縺肴ｯ斐∋縲∫ｴ榊ｾ励・縺・￥髻ｳ繧定ｦ九▽縺代※縺・◆縺縺代ｋ迺ｰ蠅・ｒ謨ｴ縺医※縺・∪縺吶・                  </p>
                </div>

                {/* Dynamic Grid for Speakers */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-12 md:mb-24">
                  {auditionSpeakers.flatMap(brand =>
                    brand.units.map(unit => ({ ...unit, brand: brand.brand, origin: brand.origin }))
                  ).slice(0, 5).map((sp, i) => {
                    const layouts = [
                      { col: "md:col-span-8", row: "h-[300px] md:h-[500px]" },
                      { col: "md:col-span-4", row: "h-[300px] md:h-[500px]" },
                      { col: "md:col-span-4", row: "h-[300px] md:h-[450px]" },
                      { col: "md:col-span-4", row: "h-[300px] md:h-[450px]" },
                      { col: "md:col-span-4", row: "h-[300px] md:h-[450px]" }
                    ];
                    const layout = layouts[i] || { col: "md:col-span-4", row: "h-[300px] md:h-[400px]" };

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className={`relative ${layout.col} ${layout.row} rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-gray-900 group cursor-pointer`}
                        onClick={(e) => {
                          if (sp.image) {
                            e.stopPropagation();
                            setSelectedAuditionImage(sp.image);
                          } else {
                            setShowFullAuditionList(true);
                          }
                        }}
                      >
                        <SafeImage
                          src={sp.image || `https://picsum.photos/seed/speaker${i}/800/600`}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                          alt={sp.model}
                        />
                        {sp.image && (
                          <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                              <Search className="w-5 h-5 md:w-7 md:h-7" />
                            </div>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>

                        <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                          <div className="flex items-center gap-2 mb-2 md:mb-3">
                            <span className="px-2 py-0.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full">
                              {sp.brand} ({sp.origin})
                            </span>
                            {sp.status === 'Demo Car' && (
                              <span className="px-2 py-0.5 bg-green-600/20 border border-green-500/30 text-green-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full">
                                Demo Car
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl md:text-5xl font-black text-white mb-1 md:mb-4 tracking-tighter leading-none">
                            {sp.model}
                          </h3>

                          <p className="text-gray-400 font-bold text-[10px] md:text-lg leading-relaxed line-clamp-2">
                            {sp.description || "隧ｦ閨ｴ螳､縺ｫ縺ｦ螳滄圀縺ｮ髻ｳ隱ｿ繧偵＃遒ｺ隱阪＞縺溘□縺代∪縺吶りｱ翫°縺ｪ髻ｳ讌ｽ菴馴ｨ薙ｒANG縺ｧ縲・}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-12">
                    <button
                      onClick={() => setShowFullAuditionList(!showFullAuditionList)}
                      className={`relative px-8 md:px-16 py-4 md:py-8 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xs md:text-xl tracking-widest transition-all shadow-2xl flex items-center gap-3 md:gap-6 group ${showFullAuditionList ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 hover:bg-blue-600 hover:text-white'
                        }`}
                    >
                      <Speaker className={`w-5 h-5 md:w-8 md:h-8 ${showFullAuditionList ? 'animate-pulse' : ''}`} />
                      {showFullAuditionList ? '隧ｦ閨ｴ繧ｹ繝斐・繧ｫ繝ｼ荳隕ｧ繧帝哩縺倥ｋ' : `隧ｦ閨ｴ繧ｹ繝斐・繧ｫ繝ｼ荳隕ｧ繧定ｦ九ｋ (${auditionSpeakers.length}繝悶Λ繝ｳ繝・`}
                      <ChevronRight className={`w-4 h-4 md:w-6 md:h-6 transition-transform ${showFullAuditionList ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {showFullAuditionList && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full overflow-hidden"
                      >
                        {auditionSpeakers.length === 0 ? (
                          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-gray-500 font-bold mb-4">繝・・繧ｿ縺瑚ｪｭ縺ｿ霎ｼ繧√∪縺帙ｓ縺ｧ縺励◆縲・/p>
                            <button onClick={() => window.location.reload()} className="text-blue-400 underline">繝壹・繧ｸ繧貞・隱ｭ縺ｿ霎ｼ縺ｿ縺吶ｋ</button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 md:px-4 pb-24">
                            {auditionSpeakers.map((brand, bIdx) => (
                              <div key={bIdx} className="space-y-4">
                                <div className="flex items-center gap-3 border-b border-white/10 pb-2 mb-4">
                                  <h4 className="text-lg md:text-xl font-black text-white">{brand.brand}</h4>
                                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">{brand.origin}</span>
                                </div>
                                <div className="space-y-2">
                                  {brand.units.map((unit, uIdx) => (
                                    <div key={uIdx} className="group p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-blue-500/30 transition-all flex gap-4">
                                      {unit.image && (
                                        <div
                                          className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 cursor-zoom-in relative group/img"
                                          onClick={() => setSelectedAuditionImage(unit.image!)}
                                        >
                                          <SafeImage src={unit.image} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" alt={unit.model} />
                                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                            <Search className="w-4 h-4 text-white" />
                                          </div>
                                        </div>
                                      )}
                                      <div className="flex-1 flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                          <div className="text-white font-bold text-xs md:text-sm group-hover:text-blue-400 transition-colors uppercase tracking-tight">{unit.model}</div>
                                          <div className="flex items-center gap-1.5 shrink-0">
                                            <div className={`w-1 h-1 rounded-full ${unit.status === 'Demo Car' ? 'bg-blue-400' : 'bg-green-400'}`}></div>
                                            <span className={`text-[8px] font-black uppercase tracking-tighter ${unit.status === 'Demo Car' ? 'text-blue-400' : 'text-green-400'}`}>
                                              {unit.status === 'Demo Car' ? 'DEMO' : 'AVAIL'}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                          <div className="text-[10px] md:text-xs font-black text-blue-500">
                                            {unit.price === 'Open' ? 'OPEN' : `${parseInt(unit.price || "0").toLocaleString()}蜀・}
                                            {unit.taxExcluded && <span className="text-gray-600 text-[8px] ml-1 font-bold">({parseInt(unit.taxExcluded).toLocaleString()}蜀・ｨ取栢)</span>}
                                          </div>
                                          {unit.youtube && (
                                            <a
                                              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                                                typeof unit.youtube === 'string' && unit.youtube !== 'true'
                                                  ? unit.youtube
                                                  : `${brand.brand} ${unit.model}`
                                              )}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="flex items-center gap-1 text-[8px] font-black text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                                            >
                                              <Youtube className="w-2.5 h-2.5" />
                                              SAMPLE
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* Layer 3: Category Details */}
            <section id="category-details" className="py-20 md:py-32 max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-4 mb-10 md:mb-16">
                <h2 className="text-2xl md:text-4xl font-black tracking-tighter">繧ｫ繝・ざ繝ｪ繝ｼ隧ｳ邏ｰ</h2>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setViewingCategoryDetail(cat.id)}
                    className="bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-gray-50 hover:border-blue-200 transition-all group text-left flex flex-col"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <cat.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="font-black text-xs md:text-lg mb-2 md:mb-4 text-gray-900 leading-tight">{cat.title}</h4>
                    <div className="mt-auto pt-2 flex items-center gap-1 text-[8px] md:text-[9px] font-black text-blue-600">
                      DETAILS <ChevronRight className="w-2 h-2" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Recruitment Section */}
            <RecruitmentSection data={audioRecruitment} />

            {/* CTA Section */}
            <section id="cta" className="py-20 px-4">
              <div className="max-w-5xl mx-auto bg-gray-900 rounded-[4rem] p-16 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -ml-48 -mb-48"></div>

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
                    逅・Φ縺ｮ髻ｳ髻ｿ遨ｺ髢薙ｒ縲・br />蜈ｱ縺ｫ蜑ｵ繧贋ｸ翫￡縺ｾ縺励ｇ縺・・                  </h2>
                  <p className="text-gray-400 mb-12 max-w-xl mx-auto font-bold leading-relaxed">
                    霆顔ｨｮ繧・＃莠育ｮ励∝･ｽ縺ｿ縺ｮ髻ｳ讌ｽ繧ｸ繝｣繝ｳ繝ｫ縺ｫ蜷医ｏ縺帙※縲∵怙驕ｩ縺ｪ繝励Λ繝ｳ繧偵す繝溘Η繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ縺・◆縺励∪縺吶・                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                      href="https://page.line.me/312qjhsq?openQrModal=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-[#06C755] text-white px-12 py-5 rounded-[2rem] font-black shadow-xl shadow-green-500/20 hover:bg-[#05b34c] transition-all flex items-center justify-center gap-3 text-lg tracking-widest"
                    >
                      <MessageCircle className="w-6 h-6" />
                      LINE縺ｧ逶ｸ隲・☆繧・                    </a>
                    <button
                      onClick={onBack}
                      className="w-full sm:w-auto bg-white text-gray-900 px-12 py-5 rounded-[2rem] font-black hover:bg-gray-100 transition-all text-lg tracking-widest"
                    >
                      縺雁撫縺・粋繧上○
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MessageCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z" />
  </svg>
);
