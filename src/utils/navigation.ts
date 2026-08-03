export const resolveMenuNavigation = (
  item: any,
  {
    plans = [],
    audioLPs = [],
    securityData,
    findSlugByFlexibleName,
    navigate,
    onClose
  }: {
    plans?: any[];
    audioLPs?: any[];
    securityData?: any;
    findSlugByFlexibleName?: (name: string) => string | null;
    navigate: (path: string) => void;
    onClose?: () => void;
  }
) => {
  if (onClose) onClose();

  if (!item) return;

  // 1. Direct path/link check
  const directPath = item.link || item.path || item.url;
  if (directPath) {
    if (typeof directPath === 'string' && directPath.startsWith('http')) {
      window.open(directPath, '_blank');
    } else {
      navigate(directPath);
    }
    return;
  }

  if (item.isExternal) {
    window.open(item.url || item.path, '_blank');
    return;
  }
  if (item.isAnchor) {
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  // 2. Handle security vehicle navigation
  if (item.id === 'security_car') {
    const slug = findSlugByFlexibleName ? findSlugByFlexibleName(item.name) : null;
    navigate(`/security/vehicle/${slug || 'special-model'}`);
    return;
  }

  // 3. Match by category or LP slug/name
  const category = (plans || []).find((p: any) => p.id === item.id || p.id === item.parentId);
  const targetId = item.planId || item.planName || item.name || item.slug || (typeof item === 'string' ? item : '');
  const targetIdStr = String(targetId);

  // Search in audioLPs first
  const matchedLP = audioLPs?.find((lp: any) => {
    if (!lp) return false;
    return (item.id && lp.id === item.id) || 
           (item.slug && lp.slug === item.slug) ||
           (lp.name === targetIdStr) ||
           (lp.slug === targetIdStr);
  });

  if (matchedLP && matchedLP.slug) {
    navigate(`/${matchedLP.slug}`);
    return;
  }

  if (
    targetIdStr === 'スピーカー交換STANDARD line（10万円まで）' || 
    targetIdStr === 'STANDARD line' ||
    targetIdStr === 'standard-line' ||
    (typeof targetIdStr === 'string' && targetIdStr.includes('STANDARD line')) ||
    (typeof targetIdStr === 'string' && targetIdStr.includes('スタンダード'))
  ) {
    navigate('/sp-standard');
    return;
  }

  if (
    targetIdStr.includes('BASIC') || 
    targetIdStr.includes('ベーシック')
  ) {
    const basicLP = audioLPs?.find((lp: any) => lp.slug?.includes('basic') || lp.name?.includes('ベーシック'));
    if (basicLP) {
      navigate(`/${basicLP.slug}`);
      return;
    }
  }

  // Path Mappings fallback
  const pathMap: Record<string, string> = {
    'security_panthera': '/security/panthera',
    'security_grgo': '/security/grgo',
    'security_grgo_v2': '/security/grgo-v2',
    'security_viper': '/security/viper',
    'security_clifford': '/security/clifford',
    'dashcam': '/security/drive_recorder',
    'security_radar': '/security/radar',
    'digital_mirror': '/security/digital_mirror',
    'スピーカー交換STANDARD line（10万円まで）': '/sp-standard',
    'STANDARD line': '/sp-standard',
    'Panthera': '/security/panthera',
    'V2': '/security/grgo-v2',
    'VⅡ': '/security/grgo',
    'Grgo': '/security/grgo',
    'Viper': '/security/viper',
    'Clifford': '/security/clifford',
    'ドライブレコーダー': '/security/drive_recorder'
  };

  if (item.id && pathMap[item.id]) {
    navigate(pathMap[item.id]);
    return;
  }
  if (targetIdStr && pathMap[targetIdStr]) {
    navigate(pathMap[targetIdStr]);
    return;
  }

  if (targetIdStr && targetIdStr !== 'undefined') {
    navigate(`/audio/plan/${encodeURIComponent(targetIdStr)}`);
  } else {
    navigate('/');
  }
};
