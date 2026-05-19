const fs = require('fs');
const path = require('path');

const cmsPath = path.join(__dirname, '..', 'src', 'data', 'cms.json');
const data = JSON.parse(fs.readFileSync(cmsPath, 'utf8'));

data.audioLPs.forEach(lp => {
    // We only modify the 4 specified LPs
    if (!['basiccoax', 'basicsep', 'sp-standard', 'sp-premium'].includes(lp.slug)) return;

    const sections = lp.sections || [];

    // Check pricing section
    let pricingSecIndex = sections.findIndex(s => s.type === 'pricing');
    if (pricingSecIndex === -1) {
        // Insert pricing section after banner or hero
        const bannerIdx = sections.findIndex(s => s.type === 'banner' || s.type === 'hero');
        const insertIdx = bannerIdx !== -1 ? bannerIdx + 1 : 0;
        
        const newPricingSec = {
            id: `sec_pricing_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,
            type: 'pricing',
            data: {}
        };
        sections.splice(insertIdx, 0, newPricingSec);
        pricingSecIndex = insertIdx;
    }

    // Check features section
    let featuresSecIndex = sections.findIndex(s => s.type === 'features');
    if (featuresSecIndex === -1) {
        const insertIdx = pricingSecIndex !== -1 ? pricingSecIndex + 1 : 0;
        const newFeaturesSec = {
            id: `sec_features_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,
            type: 'features',
            data: {}
        };
        sections.splice(insertIdx, 0, newFeaturesSec);
    }

    // Now populate pricing and features specific to each LP
    const pSec = sections.find(s => s.type === 'pricing');
    const fSec = sections.find(s => s.type === 'features');

    if (lp.slug === 'basiccoax') {
        pSec.data = {
            specialPrice: "39600",
            fixedPrice: 17600,
            normalPriceText: "通常目安: 50,000円",
            savingsText: "約 10,000円 お得!",
            note: "※KICKER CSC674（22,000円）を選択した場合の例。"
        };
        fSec.data = {
            title: "手軽に良い音を！ベーシック施工",
            description: "スピーカー交換に必要な基本施工がセットになっています。",
            doorTuning: { title: "軽防振処理", desc: "スピーカー周辺の制振・防音処理", image: "/images/Audio/Speaker/door-b.webp" },
            baffle: { title: "インナーバッフル", desc: "お車に適合したバッフル", image: "/images/Audio/Speaker/baffle.webp" },
            cable: { title: "純正ケーブル活用", desc: "コストを抑えつつ確実な接続", image: "/images/Audio/Speaker/ang-cable.webp" }
        };
        lp.pricing = pSec.data; // Sync root
    } else if (lp.slug === 'basicsep') {
        pSec.data = {
            specialPrice: "64900",
            fixedPrice: 24200,
            normalPriceText: "通常目安: 80,000円",
            savingsText: "約 15,000円 お得!",
            note: "※KICKER CSS674（40,700円）を選択した場合の例。"
        };
        fSec.data = {
            title: "セパレートの魅力を引き出す施工",
            description: "高音と中低音を分けることで、よりクリアな音像を実現します。",
            doorTuning: { title: "軽防振処理", desc: "スピーカー周辺の制振・防音処理", image: "/images/Audio/Speaker/door-b.webp" },
            baffle: { title: "インナーバッフル", desc: "お車に適合したバッフル", image: "/images/Audio/Speaker/baffle.webp" },
            cable: { title: "ツィーター取付", desc: "純正位置またはダッシュボード上", image: "/images/Audio/Speaker/tw-mount.webp" }
        };
        lp.pricing = pSec.data; // Sync root
    } else if (lp.slug === 'sp-standard') {
        pSec.data = {
            specialPrice: "82500",
            fixedPrice: 41800,
            normalPriceText: "通常目安: 110,000円",
            savingsText: "約 27,500円 お得!",
            note: "※KICKER CSS674（40,700円）を選択した場合の例。"
        };
        lp.pricing = pSec.data; // Sync root
    } else if (lp.slug === 'sp-premium') {
        pSec.data = {
            specialPrice: "162800",
            fixedPrice: 52800,
            normalPriceText: "通常目安: 200,000円",
            savingsText: "約 37,200円 お得!",
            note: "※DIATONE DS-G400（110,000円）を選択した場合の例。"
        };
        if (!fSec.data.doorTuning) {
            fSec.data = {
                title: "プレミアムな音響空間を創り出す施工",
                description: "ハイクラスなスピーカーの性能を余すことなく発揮するための専用施工。",
                doorTuning: { title: "ドアチューニング Aコース", desc: "より広範囲かつ強固な制振・防音処理", image: "/images/Audio/Speaker/door-b.webp" },
                baffle: { title: "高剛性カスタムバッフル", desc: "樺桜材などを使用した専用バッフル", image: "/images/Audio/Speaker/baffle.webp" },
                cable: { title: "プレミアムケーブル", desc: "より情報量の多い高音質ケーブル", image: "/images/Audio/Speaker/ang-cable.webp" }
            };
        }
        lp.pricing = pSec.data; // Sync root
    }

    // Re-assign sections
    lp.sections = sections;
});

// Update the plans array items prices
data.plans.forEach(plan => {
    if (plan.type !== 'audio') return;
    plan.items.forEach(item => {
        const matchingLP = data.audioLPs.find(lp => lp.slug === item.slug);
        if (matchingLP && matchingLP.pricing && matchingLP.pricing.specialPrice) {
            item.price = matchingLP.pricing.specialPrice;
        }
    });
});

fs.writeFileSync(cmsPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Fixed missing registration contents for BASIC, STANDARD, and PREMIUM lines.');
