import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams } from 'react-router-dom';
import { usePrices, formatPrice } from '../../contexts/PriceContext';
import { useSite } from '../../contexts/SiteContext';
import { RecruitmentSection } from '../Shared/RecruitmentSection';
import { SafeImage } from '../ui/SafeImage';
import {
  ArrowLeft,
  Shield,
  ShieldCheck,
  Lock,
  Eye,
  Bell,
  Smartphone,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Info,
  Search,
  Filter,
  Star,
  Car,
  Settings2,
  LayoutGrid,
  List,
  Menu,
  X,
  Calendar,
  MessageSquare,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface SecurityMenuDetailProps {
  onBack: () => void;
  onNavigateToDashcam?: () => void;
}

export const SecurityMenuDetail: React.FC<SecurityMenuDetailProps> = ({ onBack, onNavigateToDashcam }) => {
  const { assets } = useSite();
  const { plans, securityStatus, securityRecruitment } = usePrices();
  const { planSlug } = useParams<{ planSlug: string }>();
  const [activeCategory, setActiveCategory] = useState<'all' | 'security_panthera' | 'security_grgo' | 'security_digital' | 'dashcam'>('all');
  const [viewingFullList, setViewingFullList] = useState<string | null>(null);
  const [viewingCategoryDetail, setViewingCategoryDetail] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const achievementsScrollRef = useRef<HTMLDivElement>(null);
  const [activeAchievementIndex, setActiveAchievementIndex] = useState(0);

  useEffect(() => {
    // Handle planSlug from URL
    if (planSlug && plans.length > 0) {
      // Strip .html extension if present
      const cleanSlug = planSlug.replace(/\.html$/, '');
      for (const category of plans) {
        const found = category.items.find((item: any) => item.slug === cleanSlug);
        if (found) {
          setSelectedItem(found);
          // Map category.id to activeCategory if possible
          if (category.id === 'security_basic' || category.id === 'security_advanced') {
            // Basic matching or default to 'all'
          }
          break;
        }
      }
    }
  }, [planSlug, plans]);

  const handleAchievementsScroll = () => {
    if (achievementsScrollRef.current) {
      const { scrollLeft, offsetWidth } = achievementsScrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveAchievementIndex(index);
    }
  };

  const scrollToAchievementIndex = (index: number) => {
    if (achievementsScrollRef.current) {
      const { offsetWidth } = achievementsScrollRef.current;
      achievementsScrollRef.current.scrollTo({
        left: index * offsetWidth,
        behavior: 'smooth'
      });
      setActiveAchievementIndex(index);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const securityBrands = [
    {
      name: "Panthera",
      description: "譌･譛ｬ譛鬮伜ｳｰ縺ｮ繧ｻ繧ｭ繝･繝ｪ繝・ぅ諤ｧ閭ｽ縲りｪ､菴懷虚繧呈･ｵ髯舌∪縺ｧ謚代∴縺滄ｫ伜ｺｦ縺ｪ繧｢繝ｫ繧ｴ繝ｪ繧ｺ繝縲・,
      image: assets.securityMenuImage,
      id: "security_panthera"
    },
    {
      name: "Grgo",
      description: "譌･譛ｬ縺ｮ迺ｰ蠅・↓譛驕ｩ蛹悶＆繧後◆菴ｿ縺・ｄ縺吶＆縺ｨ菫｡鬆ｼ諤ｧ縲ょ､壼ｽｩ縺ｪ繧ｻ繝ｳ繧ｵ繝ｼ諡｡蠑ｵ縺悟庄閭ｽ縲・,
      image: assets.securityMenuImage,
      id: "security_grgo"
    },
    {
      name: "VIPER",
      description: "荳也阜縺ｧ譛繧よ怏蜷阪↑繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝悶Λ繝ｳ繝峨ゅお繝ｳ繧ｸ繝ｳ繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ蜀・鳩繝｢繝・Ν縺御ｺｺ豌励・,
      image: assets.securityMenuImage,
      id: "security_viper"
    },
    {
      name: "CLIFFORD",
      description: "縲悟・邀ｳ縺ｧ1蜿ｰ繧ら尢縺ｾ繧後◆縺薙→縺後↑縺・堺ｼ晁ｪｬ繧呈戟縺､縲∽ｸ也阜譛鬮伜ｳｰ縺ｮ菫｡鬆ｼ諤ｧ縲・,
      image: assets.securityMenuImage,
      id: "security_clifford"
    }
  ];

  const categoryExplanations: Record<string, any> = {
    security_panthera: {
      title: "Panthera (繝代Φ繝・・繝ｩ)",
      subtitle: "譌･譛ｬ譛鬮伜ｳｰ縺ｮ繧ｻ繧ｭ繝･繝ｪ繝・ぅ諤ｧ閭ｽ縲りｪ､菴懷虚繧呈･ｵ髯舌∪縺ｧ謚代∴縺滄ｫ伜ｺｦ縺ｪ繧｢繝ｫ繧ｴ繝ｪ繧ｺ繝縲・,
      description: "譌･譛ｬ縺ｮ鬧占ｻ顔腸蠅・↓蜷医ｏ縺帙◆迢ｬ閾ｪ繧｢繝ｫ繧ｴ繝ｪ繧ｺ繝繧呈治逕ｨ縲・繧ｾ繝ｼ繝ｳ陦晄茶繧ｻ繝ｳ繧ｵ繝ｼ繧・ョ繧ｸ繧ｿ繝ｫ蛯ｾ譁懊そ繝ｳ繧ｵ繝ｼ縺ｫ繧医ｊ縲√Ξ繝・き繝ｼ逶鈴屮繧・Κ蜩∫尢髮｣繧ら｢ｺ螳溘↓讀懃衍縺励∪縺吶ゅラ繝ｩ繝ｬ繧ｳ騾｣蜍墓ｩ溯・繧よ政霈峨・,
      sampleDescription: "縲先命蟾･萓九代Λ繝ｳ繝峨け繝ｫ繝ｼ繧ｶ繝ｼ300 ・・Panthera Z706・壹ヵ繝ｫ繧ｻ繝ｳ繧ｵ繝ｼ讒区・縺ｫ蜉縺医√ョ繧ｸ繧ｿ繝ｫ繧､繝｢繝薙Λ繧､繧ｶ繝ｼ縺ｧ繧ｨ繝ｳ繧ｸ繝ｳ蟋句虚繧貞宛蠕｡縲ゅラ繝ｩ繝ｬ繧ｳ騾｣蜍輔〒逡ｰ蟶ｸ譎ゅ・險ｼ諡繧ら｢ｺ螳溘↓谿九＠縺ｾ縺吶・,
      benefits: [
        "譌･譛ｬ蝗ｽ蜀・・迺ｰ蠅・↓迚ｹ蛹悶＠縺滄ｫ倡ｲｾ蠎ｦ繧ｻ繝ｳ繧ｵ繝ｼ",
        "3繧ｾ繝ｼ繝ｳ陦晄茶繧ｻ繝ｳ繧ｵ繝ｼ縺ｧ隱､菴懷虚繧帝亟豁｢",
        "繝峨Λ繧､繝悶Ξ繧ｳ繝ｼ繝繝ｼ騾｣蜍墓ｩ溯・・医Δ繝・Ν縺ｫ繧医ｋ・・,
        "SPS・医せ繝ｼ繝代・繝励Ο繧ｷ繝ｧ繝・・・芽ｪ榊ｮ壼ｺ励↓繧医ｋ邊ｾ蟇・命蟾･"
      ],
      image: assets.securityMenuImage,
      icon: ShieldCheck,
      color: "purple",
      upgrades: [
        { title: "繧ｹ繝槭・繝医く繝ｼ騾｣蜍・, price: "+ﾂ･22,000縲・, icon: Smartphone, description: "邏疲ｭ｣繧ｹ繝槭・繝医く繝ｼ縺ｮ謫堺ｽ懊↓繧ｻ繧ｭ繝･繝ｪ繝・ぅ繧帝｣蜍輔＆縺帙∪縺吶・ },
        { title: "繝舌ャ繧ｯ繧｢繝・・繧ｵ繧､繝ｬ繝ｳ", price: "+ﾂ･22,000縲・, icon: Bell, description: "繝舌ャ繝・Μ繝ｼ繧貞､悶＆繧後※繧り・遶矩崕貅舌〒魑ｴ繧顔ｶ壹￠繧区怙蠑ｷ縺ｮ繧ｵ繧､繝ｬ繝ｳ縲・ }
      ]
    },
    security_grgo: {
      title: "Grgo (繧ｴ繝ｫ繧ｴ)",
      subtitle: "譌･譛ｬ縺ｮ迺ｰ蠅・↓譛驕ｩ蛹悶＆繧後◆菴ｿ縺・ｄ縺吶＆縺ｨ菫｡鬆ｼ諤ｧ縲ょ､壼ｽｩ縺ｪ繧ｻ繝ｳ繧ｵ繝ｼ諡｡蠑ｵ縺悟庄閭ｽ縲・,
      description: "隕冶ｪ肴ｧ縺ｮ鬮倥＞繧｢繝ｳ繧ｵ繝ｼ繝舌ャ繧ｯ繝ｪ繝｢繧ｳ繝ｳ縺檎音蠕ｴ縲ゅΘ繝ｼ繧ｶ繝ｼ縺ｮ迺ｰ蠅・↓蜷医ｏ縺帙※諢溷ｺｦ隱ｿ謨ｴ縺檎ｴｰ縺九￥險ｭ螳壹〒縺阪∝・繧√※縺ｮ繧ｻ繧ｭ繝･繝ｪ繝・ぅ蟆主・縺ｫ繧よ怙驕ｩ縺ｧ縺吶・,
      sampleDescription: "縲先命蟾･萓九代い繝ｫ繝輔ぃ繝ｼ繝・・・Grgo ZV・壹い繝ｳ繧ｵ繝ｼ繝舌ャ繧ｯ繝ｪ繝｢繧ｳ繝ｳ縺ｧ霆贋ｸ｡迥ｶ諷九ｒ蟶ｸ縺ｫ謚頑升縲らｴ疲ｭ｣繧ｭ繝ｼ繝ｬ繧ｹ騾｣蜍輔↓繧医ｊ縲∵勸谿ｵ騾壹ｊ縺ｮ謫堺ｽ懊〒髦ｲ迥ｯ諤ｧ閭ｽ繧呈怙螟ｧ蛹悶＠縺ｾ縺吶・,
      benefits: [
        "繧｢繝ｳ繧ｵ繝ｼ繝舌ャ繧ｯ繝ｪ繝｢繧ｳ繝ｳ縺ｧ逡ｰ蟶ｸ繧貞叉蠎ｧ縺ｫ騾夂衍",
        "螟壼ｽｩ縺ｪ繧ｪ繝励す繝ｧ繝ｳ繧ｻ繝ｳ繧ｵ繝ｼ縺ｧ繧ｫ繧ｹ繧ｿ繝槭う繧ｺ蜿ｯ閭ｽ",
        "證苓ｨｼ逡ｪ蜿ｷ蠑剰ｧ｣髯､讖溯・縺ｧ荳・′荳縺ｮ髫帙ｂ螳牙ｿ・,
        "SPS隱榊ｮ壼ｺ励↓繧医ｋ鬮伜ｺｦ縺ｪ繧ｻ繝・ユ繧｣繝ｳ繧ｰ"
      ],
      image: assets.securityMenuImage,
      icon: Shield,
      color: "blue",
      upgrades: [
        { title: "繝槭う繧ｯ繝ｭ豕｢繧ｻ繝ｳ繧ｵ繝ｼ", price: "+ﾂ･16,500縲・, icon: Eye, description: "霆贋ｸ｡縺ｸ縺ｮ謗･霑代ｒ讀懃衍縲らｪ楢ｶ翫＠縺ｫ荳ｭ繧定ｦ励″霎ｼ繧陦檎ぜ縺ｫ蜿榊ｿ懊＠縺ｾ縺吶・ },
        { title: "繝医Μ繝励Ν繧ｻ繝ｳ繧ｵ繝ｼ", price: "+ﾂ･11,000縲・, icon: AlertTriangle, description: "陦晄茶繧ｻ繝ｳ繧ｵ繝ｼ縺ｮ邊ｾ蠎ｦ繧偵＆繧峨↓鬮倥ａ縲∝ｾｮ邏ｰ縺ｪ謖ｯ蜍輔ｂ騾・＠縺ｾ縺帙ｓ縲・ }
      ]
    },
    security_viper: {
      title: "VIPER (繝舌う繝代・)",
      subtitle: "荳也阜繧ｷ繧ｧ繧｢No.1縲ゅお繝ｳ繧ｸ繝ｳ繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ繧・せ繝槭・騾｣蜍輔↑縺ｩ縲∝茜萓ｿ諤ｧ縺ｨ髦ｲ迥ｯ繧剃ｸ｡遶九・,
      description: "荳也阜荳ｭ縺ｧ諢帷畑縺輔ｌ繧倶ｿ｡鬆ｼ縺ｮ繝悶Λ繝ｳ繝峨よ怙譁ｰ縺ｮDS4繧ｷ繝ｪ繝ｼ繧ｺ縺ｯ霆贋ｸ｡縺ｮ繝・ず繧ｿ繝ｫ騾壻ｿ｡縺ｫ蟇ｾ蠢懊＠縲∫ｴ疲ｭ｣繧ｭ繝ｼ繝ｬ繧ｹ騾｣蜍輔ｄ繧ｨ繝ｳ繧ｸ繝ｳ繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ讖溯・繧偵せ繝槭・繝医↓螳溽樟縺励∪縺吶・,
      sampleDescription: "縲先命蟾･萓九代・繝ｩ繝・・・VIPER DS4V・壹お繝ｳ繧ｸ繝ｳ繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ讖溯・縺ｧ螟丞・繧ょｿｫ驕ｩ縲らｴ疲ｭ｣繧ｭ繝ｼ繝ｬ繧ｹ騾｣蜍輔〒謫堺ｽ懊ｂ繧ｹ繝繝ｼ繧ｺ縲ゅせ繝槭・縺九ｉ縺ｮ繧ｳ繝ｳ繝医Ο繝ｼ繝ｫ繧ょ庄閭ｽ縺ｧ縺吶・,
      benefits: [
        "荳也阜繝医ャ繝励け繝ｩ繧ｹ縺ｮ隱咲衍蠎ｦ縺ｨ菫｡鬆ｼ諤ｧ",
        "繧ｨ繝ｳ繧ｸ繝ｳ繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ蜀・鳩繝｢繝・Ν縺瑚ｱ雁ｯ・,
        "繧ｹ繝槭・繧｢繝励Μ縺九ｉ縺ｮ謫堺ｽ懊・迥ｶ諷狗｢ｺ隱阪↓蟇ｾ蠢・,
        "邏疲ｭ｣繧ｭ繝ｼ繝ｬ繧ｹ騾｣蜍輔〒繧ｹ繝槭・繝医↑謫堺ｽ懈─"
      ],
      image: assets.securityMenuImage,
      icon: ShieldCheck,
      color: "blue",
      upgrades: [
        { title: "繝懊う繧ｹ繝｢繧ｸ繝･繝ｼ繝ｫ", price: "+ﾂ･16,500縲・, icon: Bell, description: "縲祁iper Armed縲阪↑縺ｩ縲∬恭隱槭・髻ｳ螢ｰ縺ｧ螽∝嚊繝ｻ騾夂衍繧定｡後＞縺ｾ縺吶・ },
        { title: "繧ｹ繝槭・騾｣蜍輔Θ繝九ャ繝・, price: "+ﾂ･33,000縲・, icon: Smartphone, description: "蟆ら畑繧｢繝励Μ縺九ｉ繝峨い繝ｭ繝・け繧・お繝ｳ繧ｸ繝ｳ蟋句虚縺悟庄閭ｽ縺ｫ縺ｪ繧翫∪縺吶・ }
      ]
    },
    security_clifford: {
      title: "CLIFFORD (繧ｯ繝ｪ繝輔か繝ｼ繝・",
      subtitle: "縲檎ｵｶ蟇ｾ縺ｫ逶励∪縺帙↑縺・堺ｸ也阜譛鬮伜ｳｰ縺ｮ菫｡鬆ｼ縲ら峡閾ｪ縺ｮ繝繝悶Ν繧､繝｢繝薙Λ繧､繧ｶ繝ｼ繧呈政霈峨・,
      description: "繧ｻ繧ｭ繝･繝ｪ繝・ぅ縺ｮ莉｣蜷崎ｩ槭→繧りｨ縺医ｋ繝悶Λ繝ｳ繝峨ら峡閾ｪ縺ｮ縲後ヶ繝ｩ繝・け繧ｸ繝｣繝・け繧ｹ縲阪す繧ｹ繝・Β繧・∵─蠎ｦ隱ｿ謨ｴ縺梧･ｵ繧√※邊ｾ蟇・↑繧ｪ繝繝九そ繝ｳ繧ｵ繝ｼ縺ｫ繧医ｊ縲・延螢√・螳医ｊ繧呈署萓帙＠縺ｾ縺吶・,
      sampleDescription: "縲先命蟾･萓九代せ繧ｫ繧､繝ｩ繧､繝ｳGT-R ・・CLIFFORD G6・壹が繝繝九そ繝ｳ繧ｵ繝ｼ縺ｧ蠕ｮ邏ｰ縺ｪ謖ｯ蜍輔ｂ讀懃衍縲ゅム繝悶Ν繧､繝｢繝薙Λ繧､繧ｶ繝ｼ縺ｧ閾ｪ襍ｰ逶鈴屮繧堤黄逅・噪縺ｫ髦ｻ豁｢縺励∪縺吶・,
      benefits: [
        "迢ｬ閾ｪ縺ｮ繝繝悶Ν繧､繝｢繝薙Λ繧､繧ｶ繝ｼ縺ｫ繧医ｋ蠑ｷ蜉帙↑閾ｪ襍ｰ髦ｲ豁｢",
        "隱､菴懷虚繧呈･ｵ髯舌∪縺ｧ謚代∴繧矩ｫ倡ｲｾ蠎ｦ繧ｪ繝繝九そ繝ｳ繧ｵ繝ｼ",
        "繝悶Λ繝・け繧ｸ繝｣繝・け繧ｹ縺ｫ繧医ｋ蠑ｷ蝗ｺ縺ｪ隱崎ｨｼ繧ｷ繧ｹ繝・Β",
        "譛鬮倡ｴ壹・繧ｹ繝・・繧ｿ繧ｹ縺ｨ螳牙ｿ・─"
      ],
      image: assets.securityMenuImage,
      icon: ShieldCheck,
      color: "indigo",
      upgrades: [
        { title: "繧ｪ繝繝九そ繝ｳ繧ｵ繝ｼ", price: "+ﾂ･22,000縲・, icon: Zap, description: "陦晄茶縺ｮ蠑ｷ蠑ｱ繧堤ｲｾ蟇・↓蛻､蛻･縺励∬ｪ､菴懷虚縺ｪ縺剰ｭｦ蝣ｱ繧帝ｳｴ繧峨＠縺ｾ縺吶・ },
        { title: "繝ｪ繝｢繝ｼ繝医お繝ｳ繧ｸ繝ｳ蟋句虚", price: "+ﾂ･44,000縲・, icon: Zap, description: "繧ｯ繝ｪ繝輔か繝ｼ繝峨・繝ｪ繝｢繧ｳ繝ｳ縺九ｉ繧ｨ繝ｳ繧ｸ繝ｳ蟋句虚縺悟庄閭ｽ縺ｫ縺ｪ繧翫∪縺吶・ }
      ]
    },
    dashcam: {
      title: "繝峨Λ繝ｬ繧ｳ騾｣蜍墓ｩ溯・",
      subtitle: "繧ｻ繧ｭ繝･繝ｪ繝・ぅ縺ｮ隴ｦ蝣ｱ縺ｫ騾｣蜍輔＠縺ｦ縲√ラ繝ｩ繝ｬ繧ｳ繧貞ｼｷ蛻ｶ骭ｲ逕ｻ縲・,
      description: "Panthera繧Жrgo縺ｮ繧ｻ繝ｳ繧ｵ繝ｼ縺檎焚蟶ｸ繧呈､懃衍縺励◆髫帙√ラ繝ｩ繧､繝悶Ξ繧ｳ繝ｼ繝繝ｼ縺ｮ髮ｻ貅舌ｒ蠑ｷ蛻ｶ逧・↓ON縺ｫ縺励※骭ｲ逕ｻ繧帝幕蟋九＠縺ｾ縺吶るｧ占ｻ贋ｸｭ縺ｮ蠖薙※騾・￡繧・＞縺溘★繧峨・險ｼ諡繧堤｢ｺ螳溘↓谿九☆縺溘ａ縺ｮ蠢・医が繝励す繝ｧ繝ｳ縺ｧ縺吶・,
      sampleDescription: "縲先命蟾･萓九賎rgo ZV ・・蜑榊ｾ後ラ繝ｩ繝ｬ繧ｳ騾｣蜍包ｼ壻ｸ榊ｯｩ閠・・謗･霑代ｒ繝槭う繧ｯ繝ｭ豕｢繧ｻ繝ｳ繧ｵ繝ｼ縺梧､懃衍縺吶ｋ縺ｨ縲√ラ繝ｩ繝ｬ繧ｳ縺悟叉蠎ｧ縺ｫ骭ｲ逕ｻ繧帝幕蟋九よ焔蜈・・繝ｪ繝｢繧ｳ繝ｳ縺ｫ繧る夂衍縺悟ｱ翫″縺ｾ縺吶・,
      benefits: [
        "繧ｻ繧ｭ繝･繝ｪ繝・ぅ隴ｦ蝣ｱ譎ゅ↓閾ｪ蜍輔〒骭ｲ逕ｻ繧帝幕蟋・,
        "鬧占ｻ顔屮隕悶Δ繝ｼ繝峨ｈ繧翫ｂ遒ｺ螳溘↓險ｼ諡繧定ｨ倬鹸",
        "繝舌ャ繝・Μ繝ｼ雋闕ｷ繧呈椛縺医▽縺､縲∝ｿ・ｦ√↑譎ゅ□縺鷹鹸逕ｻ",
        "譛譁ｰ縺ｮ繝・ず繧ｿ繝ｫ繝溘Λ繝ｼ蝙九ラ繝ｩ繝ｬ繧ｳ縺ｫ繧ょｯｾ蠢・
      ],
      image: assets.dashcamMenuImage,
      icon: Eye,
      color: "indigo",
      upgrades: [
        { title: "繝峨Λ繝ｬ繧ｳ譛ｬ菴薙Λ繧､繝ｳ繝翫ャ繝・, price: "隧ｳ邏ｰ縺ｯ縺薙■繧・, icon: LayoutGrid, description: "蜊倅ｽ薙〒縺ｮ蜿悶ｊ莉倥￠繧・∵怙譁ｰ繝｢繝・Ν縺ｮ隧ｳ邏ｰ縺ｯ繝峨Λ繝ｬ繧ｳ蟆ら畑繝壹・繧ｸ繧偵＃隕ｧ縺上□縺輔＞縲・, onClick: onNavigateToDashcam },
        { title: "繧ｻ繧ｭ繝･繝ｪ繝・ぅ騾｣蜍輔Θ繝九ャ繝・, price: "+ﾂ･11,000縲・, icon: Shield, description: "繧ｻ繧ｭ繝･繝ｪ繝・ぅ縺ｮ隴ｦ蝣ｱ縺ｫ騾｣蜍輔＠縺ｦ縲√ラ繝ｩ繝ｬ繧ｳ縺ｮ髮ｻ貅舌ｒ蠑ｷ蛻ｶON縺ｫ縺励∪縺吶・ }
      ]
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
    { id: 'achievements', label: '蠖灘ｺ励・蠑ｷ縺ｿ' },
    { id: 'purpose-nav', label: '逶ｮ逧・挨繝翫ン' },
    { id: 'car-type-nav', label: '霆顔ｨｮ蛻･縺翫☆縺吶ａ' },
    { id: 'plan-list', label: '繝励Λ繝ｳ荳隕ｧ' },
    { id: 'brands', label: '蜿匁桶縺・ヶ繝ｩ繝ｳ繝・ },
    { id: 'diagnosis', label: '繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ險ｺ譁ｭ' },
    { id: 'cta', label: '縺雁撫縺・粋繧上○' },
  ];

  const achievements = [
    {
      title: "荵晏ｷ朦o.1縺ｮ譁ｽ蟾･螳溽ｸｾ",
      desc: "髟ｷ蟷ｴ縺ｮ邨碁ｨ薙→閹ｨ螟ｧ縺ｪ譁ｽ蟾･繝・・繧ｿ縺ｫ蝓ｺ縺･縺阪∬ｻ顔ｨｮ縺斐→縺ｮ蠑ｱ轤ｹ繧堤・遏･縺励◆譛驕ｩ縺ｪ繧､繝ｳ繧ｹ繝医・繝ｫ繧定｡後＞縺ｾ縺吶・,
      icon: Star,
      badge: "KYUSHU #1",
      image: assets.kyushuNo1Image
    },
    {
      title: "SPS隱榊ｮ壼ｺ・(Grgo/Panthera)",
      desc: "繝｡繝ｼ繧ｫ繝ｼ縺九ｉ鬮伜ｺｦ縺ｪ謚陦灘鴨繧定ｪ阪ａ繧峨ｌ縺溘後せ繝ｼ繝代・繝励Ο繧ｷ繝ｧ繝・・縲崎ｪ榊ｮ壼ｺ励ょｰる摩蠎励↑繧峨〒縺ｯ縺ｮ邊ｾ蟇・↑繧ｻ繝・ユ繧｣繝ｳ繧ｰ縺悟庄閭ｽ縺ｧ縺吶・,
      icon: ShieldCheck,
      badge: "CERTIFIED",
      image: assets.spsCertifiedImage
    },
    {
      title: "Snap-on 險ｺ譁ｭ讖溷ｮ悟ｙ",
      desc: "鬮俶ｧ閭ｽ縺ｪSnap-on險ｺ譁ｭ讖溘ｒ蟆主・縲よ命蟾･蠕後・繧ｨ繝ｩ繝ｼ繝√ぉ繝・け縺ｯ繧ゅ■繧阪ｓ縲∽ｸ・′荳縺ｮ霆贋ｸ｡繝医Λ繝悶Ν縺ｫ繧りｿ・溘↓蟇ｾ蠢懷庄閭ｽ縺ｧ縺吶・,
      icon: Settings2,
      badge: "HIGH-TECH",
      image: assets.snaponImage
    },
    {
      title: "繝舌ャ繝・Μ繝ｼ蜈・崕蝎ｨ螳悟ｙ",
      desc: "譁ｽ蟾･荳ｭ繧・聞譛滄舌°繧頑凾繧ゅヰ繝・ユ繝ｪ繝ｼ繧ｳ繝ｳ繝・ぅ繧ｷ繝ｧ繝ｳ繧呈怙驕ｩ縺ｫ邯ｭ謖√ょｮ牙ｿ・＠縺ｦ縺願ｻ翫ｒ縺企舌￠縺・◆縺縺代∪縺吶・,
      icon: Zap,
      badge: "SAFETY",
      image: assets.batteryChargerImage
    }
  ];

  const carTypeRecommendations = [
    {
      type: "SUV / 繝ｩ繝ｳ繝峨け繝ｫ繝ｼ繧ｶ繝ｼ / 繧｢繝ｫ繝輔ぃ繝ｼ繝・,
      recommend: "Panthera Z706 + CLIFFORD G6",
      image: assets.securityMenuImage,
      desc: "譛繧ら尢髮｣繝ｪ繧ｹ繧ｯ縺ｮ鬮倥＞霆顔ｨｮ縺ｫ縺ｯ縲∵怙鬮伜ｳｰ縺ｮ繧｢繝翫Ο繧ｰ繧ｻ繧ｭ繝･繝ｪ繝・ぅ縺ｨ繝繝悶Ν繧､繝｢繝薙Λ繧､繧ｶ繝ｼ縺ｮ邨・∩蜷医ｏ縺帙ｒ謗ｨ螂ｨ縺励∪縺吶・,
    },
    {
      type: "繧ｹ繝昴・繝・き繝ｼ / 繝励Ξ繝溘い繝繧ｻ繝繝ｳ",
      recommend: "Grgo ZV + VIPER DS4",
      image: assets.securityMenuImage,
      desc: "繧ｹ繝槭・繝医く繝ｼ縺ｮ蛻ｩ萓ｿ諤ｧ繧呈ｴｻ縺九＠縺､縺､縲√お繝ｳ繧ｸ繝ｳ繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ讖溯・繧りｿｽ蜉縲ゅい繝ｳ繧ｵ繝ｼ繝舌ャ繧ｯ繝ｪ繝｢繧ｳ繝ｳ縺ｧ蟶ｸ縺ｫ迥ｶ諷九ｒ遒ｺ隱阪〒縺阪∪縺吶・,
    },
    {
      type: "繧ｳ繝ｳ繝代け繝医き繝ｼ / 霆ｽ閾ｪ蜍戊ｻ・,
      recommend: "Grgo V繧ｷ繝ｪ繝ｼ繧ｺ / VIPER 330V",
      image: assets.securityMenuImage,
      desc: "霆贋ｸ願穀繧峨＠蟇ｾ遲悶ｒ繝｡繧､繝ｳ縺ｫ縲∝ｿ・ｦ∵怙蟆城剞縺九▽遒ｺ螳溘↑髦ｲ迥ｯ諤ｧ閭ｽ繧偵らｴ疲ｭ｣繧ｭ繝ｼ繝ｬ繧ｹ騾｣蜍輔・繧ｹ繝槭・繝医↑蟇ｾ遲悶′莠ｺ豌励〒縺吶・,
    }
  ];

  const purposeNav = [
    { id: 'security_panthera', title: "譛鬮伜ｳｰ縺ｧ螳医ｊ縺溘＞", desc: "Panthera Z繧ｷ繝ｪ繝ｼ繧ｺ", icon: ShieldCheck, color: "purple" },
    { id: 'security_grgo', title: "繝舌Λ繝ｳ繧ｹ濶ｯ縺丞ｮ医ｊ縺溘＞", desc: "Grgo V繧ｷ繝ｪ繝ｼ繧ｺ", icon: Shield, color: "blue" },
    { id: 'security_viper', title: "蛻ｩ萓ｿ諤ｧ繧る㍾隕悶＠縺溘＞", desc: "VIPER DS4 / 5706V", icon: Smartphone, color: "blue" },
    { id: 'security_clifford', title: "驩・｣√・螳医ｊ縺梧ｬｲ縺励＞", desc: "CLIFFORD G6 / Matrix", icon: Lock, color: "indigo" },
  ];

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500 text-blue-600",
    purple: "bg-purple-500 text-purple-600",
    indigo: "bg-indigo-500 text-indigo-600",
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-50 pb-24">
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
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col relative"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-900 transition-all z-20"
                aria-label="隧ｳ邏ｰ繧帝哩縺倥ｋ"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-grow overflow-y-auto">
                <div className="relative h-64 md:h-96">
                  <SafeImage
                    src={selectedItem.image || "https://picsum.photos/seed/security/1200/800"}
                    className="w-full h-full object-cover"
                    alt={selectedItem.name + "縺ｮ繧ｻ繧ｭ繝･繝ｪ繝・ぅ繧ｷ繧ｹ繝・Β"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg mb-4 inline-block">
                      {selectedItem.badge || "Security Plan"}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
                      {selectedItem.name}
                    </h2>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex-grow">
                      <div className="mb-10">
                        <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          Description
                        </h3>
                        <p className="text-gray-600 text-lg font-bold leading-relaxed whitespace-pre-wrap">
                          {selectedItem.description || "隧ｳ邏ｰ縺ｪ隱ｬ譏弱・迴ｾ蝨ｨ貅門ｙ荳ｭ縺ｧ縺吶よ命蟾･蜀・ｮｹ繧・←蜷郁ｻ顔ｨｮ縺ｫ縺､縺・※縺ｯ縲√♀豌苓ｻｽ縺ｫ縺雁撫縺・粋繧上○縺上□縺輔＞縲・}
                        </p>
                      </div>

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
                    </div>

                    <div className="w-full md:w-80 shrink-0">
                      <div className="bg-gray-900 rounded-[2rem] p-8 text-white sticky top-0">
                        <div className="mb-8">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Price (Tax Incl.)</p>
                          <div className="text-4xl font-black text-blue-400 tracking-tighter">
                            {formatPrice(selectedItem.price)}
                          </div>
                          <p className="text-[10px] text-gray-500 mt-2">窶ｻ蜿紋ｻ伜ｷ･雉・・繧ｷ繝ｧ繝ｼ繝医ヱ繝ｼ繝・ｾｼ縺ｿ</p>
                        </div>

                        <div className="space-y-4">
                          <a
                            href="https://page.line.me/312qjhsq?openQrModal=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full bg-[#06C755] text-white py-4 rounded-xl font-black text-sm tracking-widest hover:scale-105 transition-all"
                          >
                            <MessageSquare className="w-5 h-5" />
                            LINE縺ｧ逶ｸ隲・
                          </a>
                          <button
                            onClick={() => {
                              setSelectedItem(null);
                              scrollToSection('cta');
                            }}
                            className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm tracking-widest hover:scale-105 transition-all"
                          >
                            <Calendar className="w-5 h-5" />
                            譚･蠎嶺ｺ育ｴ・
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      <SafeImage src={detail.image} className="w-full h-full object-cover" alt={detail.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 ${colorClasses[detail.color].split(' ')[0]} text-white shadow-lg`}>
                          <detail.icon className="w-7 h-7 md:w-8 md:h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">{detail.title}</h1>
                        <p className="text-lg md:text-xl text-gray-200 font-bold leading-tight">{detail.subtitle}</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-gray-100 mb-12">
                      <div className="mb-16">
                        <h3 className="text-2xl font-black mb-6 text-gray-900 flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full ${colorClasses[detail.color].split(' ')[0]}`}></div>
                          隗｣隱ｬ
                        </h3>
                        <p className="text-gray-600 text-lg font-medium leading-relaxed mb-12">{detail.description}</p>
                        <div className={`p-8 rounded-[2.5rem] ${colorClasses[detail.color].split(' ')[1].replace('text-', 'bg-').replace('600', '50')} border border-current/10`}>
                          <h4 className={`text-sm font-black mb-4 uppercase tracking-[0.2em] ${colorClasses[detail.color].split(' ')[1]}`}>Sample Description</h4>
                          <p className="text-gray-800 font-bold leading-relaxed italic">{detail.sampleDescription}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-black mb-8 text-gray-900 flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full ${colorClasses[detail.color].split(' ')[0]}`}></div>
                          譁ｽ蟾･縺ｮ繝｡繝ｪ繝・ヨ
                        </h3>
                        <div className="grid gap-6">
                          {detail.benefits.map((benefit: string, i: number) => (
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
                            縺輔ｉ縺ｫ讌ｵ繧√ｋ縺溘ａ縺ｮ繧｢繝・・繧ｰ繝ｬ繝ｼ繝・
                          </h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            {detail.upgrades.map((upgrade: any, i: number) => (
                              <div key={i}
                                onClick={upgrade.onClick}
                                className={`bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group ${upgrade.onClick ? 'cursor-pointer hover:bg-blue-900' : ''}`}
                              >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                                <div className="relative z-10">
                                  <div className="flex items-center justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[detail.color].split(' ')[0]}`}>
                                      <upgrade.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-blue-400 font-black text-sm">{upgrade.price}</span>
                                  </div>
                                  <h4 className="text-xl font-black mb-3">{upgrade.title}</h4>
                                  <p className="text-gray-400 text-sm font-bold leading-relaxed">{upgrade.description}</p>
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
                          setViewingFullList(viewingCategoryDetail);
                          setViewingCategoryDetail(null);
                          window.scrollTo(0, 0);
                        }}
                        className="flex-grow bg-gray-900 text-white py-6 rounded-[2rem] font-black text-lg tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-200"
                      >
                        繝励Λ繝ｳ荳隕ｧ繧定ｦ九ｋ
                      </button>
                      <button onClick={() => setViewingCategoryDetail(null)} className="flex-grow bg-white text-gray-900 py-6 rounded-[2rem] font-black text-lg tracking-widest border border-gray-200 hover:bg-gray-50 transition-all">
                        繝｡繝九Η繝ｼ縺ｫ謌ｻ繧・
                      </button>
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
                        onClick={() => { setViewingFullList(null); window.scrollTo(0, 0); }}
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
                        className="mb-16"
                      >
                        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 border border-gray-200 overflow-hidden relative shadow-sm group">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 via-transparent to-gray-50/20"></div>
                          {/* Watermark Background */}
                          <div className="absolute -right-8 -bottom-8 text-[12rem] font-black text-emerald-900/[0.03] select-none pointer-events-none tracking-tighter leading-none group-hover:text-emerald-900/[0.05] transition-colors duration-1000">
                            SECURITY
                          </div>

                          <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-start relative z-10">
                            {currentCategory.images && currentCategory.images.length > 0 && (
                              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {currentCategory.images.map((img, i) => (
                                  <div key={i} className={`relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group/img ${currentCategory.images!.length === 1 ? 'sm:col-span-2 aspect-video' : 'aspect-square'}`}>
                                    <SafeImage
                                      src={img}
                                      alt={`${currentCategory.category} image ${i + 1}`}
                                      className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-emerald-900/10 group-hover/img:bg-transparent transition-colors duration-700"></div>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className={`w-full ${currentCategory.images && currentCategory.images.length > 0 ? 'lg:w-1/2' : 'lg:w-full'}`}>
                              <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                                  <ShieldCheck className="w-6 h-6" />
                                </div>
                                <span className="text-emerald-600 font-black tracking-[0.3em] uppercase text-xs md:text-sm">Category Insight</span>
                              </div>
                              <h4 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter leading-[1.1] text-gray-900">
                                {currentCategory.category}<span className="text-emerald-600">.</span>
                              </h4>
                              <div className="text-gray-600 font-bold text-base md:text-xl leading-relaxed whitespace-pre-wrap max-w-2xl">
                                {currentCategory.description}
                              </div>

                              <div className="mt-12 pt-8 border-t border-emerald-100 flex items-center gap-4 text-emerald-600">
                                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
                                <span className="text-xs font-black tracking-widest uppercase">Expert Installation Guaranteed</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {currentCategory?.items.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => setSelectedItem(item)}
                          className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col relative group overflow-hidden cursor-pointer"
                        >
                          <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden">
                            <SafeImage src={item.image || "https://picsum.photos/seed/security/800/600"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4">
                              <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{item.badge}</span>
                            </div>
                          </div>
                          <div className="relative z-10">
                            <h4 className="text-2xl font-black mb-2 text-gray-900">{item.name}</h4>
                            <div className="text-3xl font-black text-blue-600 mb-6">{formatPrice(item.price)}</div>
                            <ul className="space-y-4 mb-8">
                              {(item.features || []).map((f, j) => (
                                <li key={j} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                            }}
                            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
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
                <div className="flex-1 flex items-center">
                  <button
                    onClick={onBack}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors font-bold group shrink-0"
                    aria-label="繝医ャ繝励↓謌ｻ繧・
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  <h2 className="font-black text-sm md:text-xl tracking-tighter whitespace-nowrap">SECURITY MENU</h2>
                </div>
                <div className="flex-1 flex items-center justify-end gap-1.5 md:gap-3">
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
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
                          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 overflow-hidden">
                            <div className="space-y-1">
                              {navLinks.map((link) => (
                                <button key={link.id} onClick={() => scrollToSection(link.id)} className="w-full text-left px-4 py-3 rounded-xl text-sm font-black text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-between group">
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
            <section className="relative py-20 md:py-32 overflow-hidden bg-gray-900">
              <div className="absolute inset-0 opacity-40">
                <SafeImage
                  src={assets.securityMenuImage}
                  className="w-full h-full object-cover"
                  alt="鬮伜ｺｦ縺ｪ繧ｫ繝ｼ繧ｻ繧ｭ繝･繝ｪ繝・ぅ繧ｷ繧ｹ繝・Β縺ｮ譁ｽ蟾･繧､繝｡繝ｼ繧ｸ"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>
              </div>
              <div className="relative max-w-7xl mx-auto px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-6 shadow-lg shadow-blue-600/20">
                    Vehicle Security Systems
                  </span>
                  <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                    PROTECT YOUR<br /><span className="text-blue-500">VALUABLES.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-400 font-bold max-w-2xl mx-auto leading-relaxed">
                    譛譁ｰ縺ｮ逶鈴屮謇句哨縺九ｉ諢幄ｻ翫ｒ繧ｬ繝ｼ繝峨ら｢ｺ縺九↑謚陦薙→菫｡鬆ｼ縺ｮ繧ｷ繧ｹ繝・Β縺ｧ縲√≠縺ｪ縺溘↓縲悟ｮ牙ｿ・阪→縺・≧譛鬮倥・雍・ｲ｢繧偵♀螻翫￠縺励∪縺吶・
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Security Status Alert */}
            {securityStatus && (
              <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-30">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl border-2 border-blue-600 flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-blue-600 font-black text-xs uppercase tracking-widest mb-1">Current Status</h3>
                    <p className="text-gray-900 font-black text-lg md:text-xl leading-tight whitespace-pre-wrap">
                      {securityStatus}
                    </p>
                  </div>
                  <button
                    onClick={() => scrollToSection('cta')}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-sm tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 shrink-0"
                  >
                    逶ｸ隲・ｺ育ｴ・
                  </button>
                </motion.div>
              </div>
            )}

            {/* Achievements Section */}
            <section id="achievements" className="py-20 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-4">
                <div
                  ref={achievementsScrollRef}
                  onScroll={handleAchievementsScroll}
                  className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide"
                >
                  {achievements.map((item, i) => (
                    <div key={i} className="min-w-[280px] md:min-w-0 bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 relative group flex flex-col snap-center">
                      <div className="h-40 overflow-hidden relative">
                        <SafeImage src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <span className="text-[8px] font-black tracking-widest text-blue-600 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">{item.badge}</span>
                        </div>
                      </div>
                      <div className="p-8 pt-4 flex-grow">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform -mt-10 relative z-10">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black mb-3 text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Dots for Mobile */}
                <div className="flex justify-center gap-1 mt-6 md:hidden">
                  {achievements.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToAchievementIndex(i)}
                      className="w-12 h-12 flex items-center justify-center group"
                      aria-label={`Go to slide ${i + 1}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeAchievementIndex === i ? 'bg-blue-600 w-4' : 'bg-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Purpose Navigation */}
            <section id="purpose-nav" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">WHAT IS YOUR PURPOSE?</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">逶ｮ逧・°繧画爾縺・/p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {purposeNav.map((item, i) => (
                    <button key={i} onClick={() => { setViewingCategoryDetail(item.id); window.scrollTo(0, 0); }} className="group relative bg-gray-50 rounded-[2rem] p-8 text-left border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all overflow-hidden">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' : item.color === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-indigo-100 text-indigo-600'}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight">{item.title}</h3>
                      <p className="text-xs text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Car Type Recommendations */}
            <section id="car-type-nav" className="py-20 bg-gray-900 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-white">RECOMMENDED BY CAR TYPE</h2>
                    <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">霆顔ｨｮ蛻･縺翫☆縺吶ａ繝｢繝・Ν</p>
                  </div>
                  <button
                    onClick={() => { setViewingFullList('security_car'); window.scrollTo(0, 0); }}
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all border border-white/10 flex items-center gap-2"
                  >
                    荳隕ｧ繧定ｦ九ｋ
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
                  {carTypeRecommendations.map((item, i) => {
                    const itemId = `car-type-${i}`;
                    return (
                      <div key={i} className="bg-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 group hover:bg-white/10 transition-all">
                        <div
                          onClick={() => isMobile && setExpandedSection(expandedSection === itemId ? null : itemId)}
                          className={`flex items-center justify-between p-6 md:p-0 md:block ${isMobile ? 'cursor-pointer' : ''}`}
                        >
                          <div className="flex items-center gap-4 md:block">
                            <div className="w-16 h-16 md:w-full md:h-48 rounded-xl md:rounded-none overflow-hidden shrink-0">
                              <SafeImage src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.type} />
                            </div>
                            <div className="md:p-8 md:pb-0">
                              <h3 className="text-blue-400 text-[10px] md:text-xs font-black tracking-widest uppercase mb-1 md:mb-2">{item.type}</h3>
                              <h4 className="text-lg md:text-xl font-black text-white md:mb-4">{item.recommend}</h4>
                            </div>
                          </div>
                          {isMobile && (
                            <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform ${expandedSection === itemId ? 'rotate-180' : ''}`}>
                              <ChevronRight className="w-4 h-4 text-white rotate-90" />
                            </div>
                          )}
                        </div>

                        <AnimatePresence>
                          {(!isMobile || expandedSection === itemId) && (
                            <motion.div
                              initial={isMobile ? { height: 0, opacity: 0 } : {}}
                              animate={isMobile ? { height: 'auto', opacity: 1 } : {}}
                              exit={isMobile ? { height: 0, opacity: 0 } : {}}
                            >
                              <div className="px-6 pb-6 md:px-8 md:pb-8">
                                <p className="text-sm text-gray-400 font-bold leading-relaxed">{item.desc}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom View All Button for Car Type Recommendations */}
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => { setViewingFullList('security_car'); window.scrollTo(0, 0); }}
                    className="w-full md:w-auto flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-4 px-12 rounded-2xl font-black text-xs md:text-lg tracking-widest hover:bg-white/10 transition-all shadow-sm group"
                  >
                    霆顔ｨｮ蛻･縺翫☆縺吶ａ繝｢繝・Ν繧偵☆縺ｹ縺ｦ隕九ｋ
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* Plan List with Accordion for Mobile */}
            <section id="plan-list" className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">SECURITY PACKAGES</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">繝励Λ繝ｳ荳隕ｧ</p>
                </div>

                <div className="space-y-4 md:space-y-8">
                  {plans.filter(p => p.id.startsWith('security') && p.id !== 'security_car').map((category) => (
                    <div key={category.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
                      <div
                        onClick={() => isMobile && setExpandedSection(expandedSection === category.id ? null : category.id)}
                        className={`w-full px-8 py-8 flex items-center justify-between text-left transition-colors ${isMobile ? 'hover:bg-gray-50 cursor-pointer' : ''}`}
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Shield className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-black tracking-tight">{category.category}</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{category.items.length} MODELS AVAILABLE</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); setViewingFullList(category.id); window.scrollTo(0, 0); }}
                            className="hidden md:flex bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-2 rounded-xl font-black text-[10px] tracking-widest transition-all items-center gap-2"
                          >
                            荳隕ｧ繧定ｦ九ｋ
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          {isMobile && (
                            <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-transform ${expandedSection === category.id ? 'rotate-180' : ''}`}>
                              <ChevronRight className="w-5 h-5 rotate-90" />
                            </div>
                          )}
                        </div>
                      </div>

                      <AnimatePresence>
                        {(!isMobile || expandedSection === category.id) && (
                          <motion.div
                            initial={isMobile ? { height: 0, opacity: 0 } : {}}
                            animate={isMobile ? { height: 'auto', opacity: 1 } : {}}
                            exit={isMobile ? { height: 0, opacity: 0 } : {}}
                            className="border-t border-gray-50"
                          >
                            {/* Category Description Section */}
                            {category.showDescriptionInMenu && (category.description || (category.images && category.images.length > 0)) && (
                              <div className="px-4 md:px-8 py-12 border-b border-gray-50 bg-gray-50/10">
                                <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-gray-200 overflow-hidden relative shadow-sm group">
                                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 via-transparent to-gray-50/20"></div>
                                  {/* Watermark Background */}
                                  <div className="absolute -right-4 -bottom-4 text-7xl md:text-9xl font-black text-emerald-900/[0.03] select-none pointer-events-none tracking-tighter leading-none group-hover:text-emerald-900/[0.05] transition-colors duration-1000">
                                    SECURITY
                                  </div>

                                  <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start relative z-10">
                                    {category.images && category.images.length > 0 && (
                                      <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {category.images.map((img, i) => (
                                          <div key={i} className={`relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl group/img ${category.images!.length === 1 ? 'sm:col-span-2 aspect-video' : 'aspect-square'}`}>
                                            <SafeImage
                                              src={img}
                                              alt={`${category.category} image ${i + 1}`}
                                              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-emerald-900/5 group-hover/img:bg-transparent transition-colors duration-700"></div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <div className={`w-full ${category.images && category.images.length > 0 ? 'lg:w-1/2' : 'lg:w-full'}`}>
                                      <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                                          <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <span className="text-emerald-600 font-black tracking-[0.2em] uppercase text-[10px] md:text-xs">Category Insight</span>
                                      </div>
                                      <h4 className="text-2xl md:text-4xl font-black mb-6 tracking-tighter leading-tight text-gray-900">
                                        {category.category}<span className="text-emerald-600">.</span>
                                      </h4>
                                      <div className="text-gray-600 font-bold text-sm md:text-lg leading-relaxed whitespace-pre-wrap max-w-xl">
                                        {category.description}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className={`p-4 md:p-8 ${isMobile ? 'space-y-3' : 'grid md:grid-cols-3 gap-6'}`}>
                              {category.items.slice(0, 3).map((item, i) => (
                                <div
                                  key={i}
                                  onClick={() => setSelectedItem(item)}
                                  className={`bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all group cursor-pointer ${isMobile ? 'flex items-center gap-4' : 'flex flex-col'}`}
                                >
                                  {isMobile ? (
                                    <>
                                      <div className="w-32 h-20 rounded-2xl overflow-hidden shrink-0 border border-gray-200">
                                        <SafeImage src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                      </div>
                                      <div className="flex-grow">
                                        <h4 className="font-black text-gray-900 text-sm mb-1">{item.name}</h4>
                                        <div className="text-blue-600 font-black text-sm">{formatPrice(item.price)}</div>
                                      </div>
                                      <ChevronRight className="w-5 h-5 text-gray-300" />
                                    </>
                                  ) : (
                                    <>
                                      <div className="relative h-40 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-3xl">
                                        <SafeImage src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                                        <div className="absolute top-4 right-4">
                                          <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest">{item.badge}</span>
                                        </div>
                                      </div>
                                      <h4 className="text-lg font-black mb-1 text-gray-900">{item.name}</h4>
                                      <div className="text-xl font-black text-blue-600 mb-4">{formatPrice(item.price)}</div>
                                      <ul className="space-y-2 mb-6 flex-grow">
                                        {(item.features || []).map((f, j) => (
                                          <li key={j} className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                            {f}
                                          </li>
                                        ))}
                                      </ul>
                                      <button
                                        onClick={() => setSelectedItem(item)}
                                        className="w-full bg-white text-gray-900 py-3 rounded-xl font-black text-[10px] tracking-widest border border-gray-200 hover:bg-gray-900 hover:text-white transition-all"
                                      >
                                        PLAN DETAILS
                                      </button>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Bottom View All Button */}
                            <div className="px-4 md:px-8 pb-8">
                              <button
                                onClick={() => {
                                  setViewingFullList(category.id);
                                  window.scrollTo(0, 0);
                                }}
                                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-blue-100 text-blue-600 py-4 md:py-6 rounded-2xl md:rounded-[2.5rem] font-black text-xs md:text-lg tracking-widest hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm group"
                              >
                                <span className="hidden md:inline">{category.category}縺ｮ蜈ｨ繝励Λ繝ｳ繧偵メ繧ｧ繝・け縺吶ｋ</span>
                                <span className="md:hidden">{category.category}縺ｮ蜈ｨ繝励Λ繝ｳ繧定ｦ九ｋ</span>
                                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Brands Section */}
            <section id="brands" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">TRUSTED BRANDS</h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">蜿匁桶縺・ヶ繝ｩ繝ｳ繝・/p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {securityBrands.map((brand, i) => (
                    <div key={i} className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-2xl transition-all group flex flex-col">
                      <div className="h-12 flex items-center mb-6">
                        <h3 className="text-2xl font-black tracking-tighter group-hover:text-blue-600 transition-colors">{brand.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 font-bold leading-relaxed mb-6 flex-grow">{brand.description}</p>
                      <div className="h-40 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 mb-6">
                        <SafeImage src={brand.image} className="w-full h-full object-cover" alt={brand.name} />
                      </div>
                      <button
                        onClick={() => { setViewingFullList(brand.id); window.scrollTo(0, 0); }}
                        className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black text-xs tracking-widest border border-gray-200 hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        荳隕ｧ繧定ｦ九ｋ
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Paid Diagnosis Section */}
            <section id="diagnosis" className="py-20 bg-blue-600 overflow-hidden relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              </div>
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-white/20 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 text-center md:text-left">
                    <span className="inline-block px-4 py-1.5 bg-white text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest mb-6">
                      SECURITY CHECKUP
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                      莉門ｺ励〒縺ｮ譁ｽ蟾･縺ｧ縺雁峅繧翫・譁ｹ縺ｸ<br />
                      <span className="text-blue-200">譛画侭繧ｻ繧ｭ繝･繝ｪ繝・ぅ繝ｼ險ｺ譁ｭ</span>
                    </h2>
                    <p className="text-blue-100 font-bold leading-relaxed mb-8 text-lg">
                      縲梧怙霑題ｪ､菴懷虚縺悟､壹＞縲阪御ｸｭ蜿､霆翫ｒ雋ｷ縺｣縺溘ｉ繧ｻ繧ｭ繝･繝ｪ繝・ぅ縺御ｻ倥＞縺ｦ縺・◆縺御ｽｿ縺・婿縺後ｏ縺九ｉ縺ｪ縺・阪御ｻ翫・繧ｷ繧ｹ繝・Β縺梧ｭ｣蟶ｸ縺ｫ蜍輔＞縺ｦ縺・ｋ縺倶ｸ榊ｮ峨阪↑縺ｩ縲∽ｻ門ｺ励〒譁ｽ蟾･縺輔ｌ縺溘す繧ｹ繝・Β繧・ｸｭ蜿､霆願ｳｼ蜈･譎ゅ・繧ｻ繧ｭ繝･繝ｪ繝・ぅ縺ｫ髢｢縺吶ｋ險ｺ譁ｭ繝ｻ險ｭ螳壼､画峩繧よ価縺｣縺ｦ縺翫ｊ縺ｾ縺吶・
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-white text-sm font-bold border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-blue-300" />
                        繧ｷ繧ｹ繝・Β蜍穂ｽ懊メ繧ｧ繝・け
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-white text-sm font-bold border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-blue-300" />
                        諢溷ｺｦ蜀崎ｪｿ謨ｴ
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-white text-sm font-bold border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-blue-300" />
                        謫堺ｽ懆ｪｬ譏・
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 bg-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="text-center mb-6">
                      <p className="text-gray-400 font-black text-xs tracking-widest uppercase mb-2">DIAGNOSIS FEE</p>
                      <div className="text-4xl font-black text-gray-900">ﾂ･11,000<span className="text-sm ml-1">縲・/span></div>
                      <p className="text-gray-400 text-[10px] font-bold mt-2">窶ｻ繧ｷ繧ｹ繝・Β縺ｮ遞ｮ鬘槭ｄ迥ｶ諷九↓繧医ｊ逡ｰ縺ｪ繧翫∪縺・/p>
                    </div>
                    <button onClick={() => scrollToSection('cta')} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                      險ｺ譁ｭ繧剃ｺ育ｴ・☆繧・
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Recruitment Section */}
            <RecruitmentSection data={securityRecruitment} />

            {/* CTA Section */}
            <section id="cta" className="py-20 bg-gray-900 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>
              <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">SECURE YOUR CAR TODAY.</h2>
                <p className="text-lg text-gray-400 font-bold mb-12 leading-relaxed">
                  諢幄ｻ翫・繧ｻ繧ｭ繝･繝ｪ繝・ぅ縺ｫ縺､縺・※縲√・繝ｭ縺ｮ繧ｹ繧ｿ繝・ヵ縺御ｸ∝ｯｧ縺ｫ縺碑ｪｬ譏弱＞縺溘＠縺ｾ縺吶・br />
                  縺ｾ縺壹・縺頑ｰ苓ｻｽ縺ｫ縺皮嶌隲・￥縺縺輔＞縲・
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a href="https://page.line.me/312qjhsq?openQrModal=true" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 bg-[#06C755] text-white px-10 py-6 rounded-[2rem] font-black text-lg tracking-widest hover:scale-105 transition-all shadow-xl shadow-green-500/20">
                    <MessageSquare className="w-6 h-6" />
                    LINE縺ｧ辟｡譁咏嶌隲・
                  </a>
                  <button className="flex items-center justify-center gap-4 bg-blue-600 text-white px-10 py-6 rounded-[2rem] font-black text-lg tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-600/20">
                    <Calendar className="w-6 h-6" />
                    譚･蠎嶺ｺ育ｴ・・隕狗ｩ阪ｊ
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
