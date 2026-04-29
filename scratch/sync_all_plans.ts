import { createClient } from 'microcms-js-sdk';

const client = createClient({
    serviceDomain: 'ang-home',
    apiKey: 'qlvT6cfFckMLzYHWFb6GhUIfCgDnrCwDeNZP',
});

const ENDPOINT = 'plans';

interface PlanItem {
    name: string;
    price: string;
    badge?: string;
    description?: string;
    features: {
        triple: boolean;
        tilt: boolean;
        bonnet: boolean;
        microwave: boolean;
        siren: boolean;
        algorithm: boolean;
        canguard: boolean;
    };
}

interface Plan {
    id: string;
    category: string;
    description: string;
    items: PlanItem[];
}

const allPlans: Plan[] = [
    {
        id: 'land_cruiser_300',
        category: 'LAND CRUISER 300 専用パッケージ',
        description: '世界的に需要が高く、最も警戒が必要な一台。CANインベーダー、リレーアタック、指紋認証回避など、あらゆる手口を想定した最強の布陣を推奨します。',
        items: [
            {
                name: 'Grgo ZV II ＋ CANガード ＋ トリプル',
                price: '314,600',
                description: '最も狙われる300必須のアナログ防御と電子対策をパッケージ。',
                features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Grgo ZVT II ＋ CANガード',
                price: '336,600',
                badge: 'おすすめ',
                description: '高精度な傾斜センサーが、300のパーツ盗難やレッカーを阻止。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z706 ＋ CANガード',
                price: '486,800',
                badge: '最強プラン',
                description: 'ANGノウハウを結集。300を守るためのバックアップサイレン付最終回答。',
                features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true }
            }
        ]
    },
    {
        id: 'land_cruiser_250',
        category: 'LAND CRUISER 250 専用パッケージ',
        description: 'プラドの後継として登場した注目の新型モデル。伝統の信頼性に加え、最新のデジタルセキュリティを融合させた最強の防犯対策をご提案します。',
        items: [
            {
                name: 'Grgo ZVT II ＋ CANガード',
                price: '336,600',
                badge: 'おすすめ',
                description: '傾斜センサーと1WAYリモコン付属。多重防御のANG推奨プラン。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z706 ＋ CANガード',
                price: '486,800',
                badge: '最強プラン',
                description: '全センサー＋バックアップサイレン。250を守り抜く究極の回答。',
                features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true }
            }
        ]
    },
    {
        id: 'land_cruiser_prado',
        category: 'LAND CRUISER PRADO (150系) 専用パッケージ',
        description: '今なお狙われ続ける150系。スマートキー連動による最新の窃盗対策や、物理的なCANガードなど、年式に応じた最適な対策をご提案します。',
        items: [
            {
                name: 'Grgo ZVT II ＋ スマキー連動/スマクロ',
                price: '299,600',
                badge: 'おすすめ',
                description: '傾斜センサー含むフルセンサー構成にスマートキー連動をプラスし、利便性を高めた一台。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false }
            },
            {
                name: 'Grgo ZVT II ＋ CANガード',
                price: '310,827',
                description: '傾斜センサー含むフルセンサー構成にCANガードを統合した最良バランスの一台。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z706 ＋ CANガード',
                price: '449,800',
                badge: '最強プラン',
                description: 'ANG最強の組み合わせ。バックアップサイレン、全センサー、物理CAN対策の集大成。',
                features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true }
            }
        ]
    },
    {
        id: 'lexus_rx',
        category: 'LEXUS RX 専用パッケージ',
        description: '高い人気を誇るラグジュアリーSUV。スマートキーの利便性を活かしつつ、CANガード等で最新の盗難手口から死角なく守ります。',
        items: [
            {
                name: 'Grgo ZVT II ＋ CANガード',
                price: '336,600',
                badge: 'おすすめ',
                description: '傾斜センサーとCANガード。1WAYリモコンも付属した上位モデル。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z306 ＋ CANガード',
                price: '396,800',
                badge: '推奨構成',
                description: 'Z306の多機能にデジタル対策のCANガードを完全統合。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z706 ＋ CANガード',
                price: '486,800',
                badge: '最強プラン',
                description: 'あらゆる手口から車を守る、ANGノウハウの結晶プラン。',
                features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true }
            }
        ]
    },
    {
        id: 'lexus_gx550',
        category: 'LEXUS GX550 専用パッケージ',
        description: '最新鋭のオフローダー。CANインベーダーやゲームボーイといった最新手口への完全対策が必須です。',
        items: [
            {
                name: 'Grgo ZVT II ＋ CANガード',
                price: '336,600',
                badge: 'おすすめ',
                description: '傾斜センサー標準装備。CANガードと1WAYリモコンも付属。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z306 ＋ CANガード',
                price: '396,800',
                badge: '推奨構成',
                description: '全方位検知のZ306に最新のCANガードを融合。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z706 ＋ CANガード',
                price: '486,800',
                badge: '最強プラン',
                description: 'すべてのセンサーを装備した究極の多重防御モデル。',
                features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true }
            }
        ]
    },
    {
        id: 'harrier_80',
        category: 'HARRIER (80系) 専用パッケージ',
        description: '高い人気を誇るSUV。最新の盗難手口に対し、スマクロ機能や物理CANガードを組み合わせた、都市部でも安心のセキュリティをご提供します。',
        items: [
            {
                name: 'Grgo ZVT II ＋ CANガード',
                price: '316,800',
                badge: 'おすすめ',
                description: 'ZVT IIの高度な検知能力に、物理CANガードを統合。ハリアーの盗難・部品盗を徹底阻止。',
                features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z306 ＋ CANガード',
                price: '386,800',
                badge: '推奨構成',
                description: 'Z306の多機能検知に物理CAN対策をプラス。レッカー盗難もインベーダーも、どちらも妥協なく防ぎます。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z706 ＋ CANガード',
                price: '476,800',
                badge: '最強プラン',
                description: 'ANG最強のハリアー防衛プラン。フルスペックパンテーラ＋物理CANガードの、正真正銘の鉄壁モデル。',
                features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true }
            }
        ]
    },
    {
        id: 'jimny_jb64',
        category: 'JIMNY / SIERRA (JB64/74) 専用パッケージ',
        description: '絶大な人気を誇るジムニーシリーズ。車上荒らしや盗難のリスクが高いため、GrgoやPantheraによる確実なガードを推奨します。',
        items: [
            {
                name: 'Grgo ZVT II',
                price: '248,800',
                badge: 'おすすめ',
                description: '傾斜センサーとトリプルセンサーを標準装備。ジャッキアップや車体への衝撃を確実にキャッチする上位モデル。',
                features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false }
            },
            {
                name: 'Panthera Z306',
                price: '318,800',
                badge: '推奨構成',
                description: 'トリプルセンサーと傾斜センサーが同梱。ジムニーの人気カスタムパーツであるタイヤ・ホイールも死角なくガード。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: false, canguard: false }
            },
            {
                name: 'Panthera Z706',
                price: '408,800',
                badge: '最強プラン',
                description: 'すべてのセンサーを網羅した最高峰フルスペックモデル。ジムニーを愛するオーナー様のための究極の守り。',
                features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: false, canguard: false }
            }
        ]
    },
    {
        id: 'hiace_200',
        category: 'HIACE (200系) 専用パッケージ',
        description: '仕事からレジャーまで幅広く活躍するハイエース。狙われやすい車種だからこそ、センサー感度の追求と利便性を両立した専用プランをご用意しました。',
        items: [
            {
                name: 'Grgo ZVT II ＋ ミラー連動',
                price: '250,800',
                badge: 'おすすめ',
                description: '傾斜・トリプルセンサーを同梱した上位モデル。ハイエースのレッカー盗難も確実に検知。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false }
            },
            {
                name: 'Panthera Z306 ＋ ミラー連動',
                price: '320,800',
                badge: '推奨構成',
                description: '全センサー標準装備。ハイエースオーナーに最も支持される、高性能とお買得感を両立したプラン。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false }
            }
        ]
    },
    {
        id: 'prius_60',
        category: 'PRIUS (60系) 専用パッケージ',
        description: '洗練されたデザインと高い防犯性能の両立。最新の60系プリウスに対し、CANガードやパンテーラを組み合わせた、都市部でも安心のパッケージをご提案します。',
        items: [
            {
                name: 'Grgo ZVT II ＋ CANガード',
                price: '304,800',
                badge: 'おすすめ',
                description: 'ZVT IIの高度な検知に、物理CANガードを統合。プリウスに求められる全ての防犯性能を凝縮。',
                features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z306 ＋ CANガード',
                price: '374,800',
                badge: '推奨構成',
                description: '多重センサー警備のZ306に、物理CAN対策をプラス。プリウスオーナーに一番支持される最強の一台。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z706 ＋ CANガード',
                price: '464,800',
                badge: '最強プラン',
                description: 'パンテーラ最高峰。全機能と全センサーを解放し、物理的なデジタル対策も完備した頂点モデル。',
                features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true }
            }
        ]
    },
    {
        id: 'civic_fl5',
        category: 'CIVIC TYPE-R (FL5) 専用パッケージ',
        description: '究極のFFスポーツ性能を誇るFL5。最新のCANインベーダー対策を含めた、実戦的な多重防御をご提案します。',
        items: [
            {
                name: 'Grgo ZVT II ＋ CANガード',
                price: '309,800',
                badge: 'おすすめ',
                description: '最上位ZVT IIにスマートキー連動と物理CANガードを追加。利便性と鉄壁の防犯性能を両立した推奨パッケージ。',
                features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z306 ＋ CANガード',
                price: '379,800',
                badge: '推奨構成',
                description: '充実のセンサー構成に多重の盗難防止策を上乗せ。FL5オーナーに一番支持される、隙のない最強構成。',
                features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true }
            },
            {
                name: 'Panthera Z706 ＋ CANガード',
                price: '469,800',
                badge: '最強プラン',
                description: 'ANGのノウハウを全て投入。フルスペックパンテーラに物理CAN対策を加えた、TYPE-Rを守り抜くための最終結論。',
                features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true }
            }
        ]
    }
];

async function sync() {
    for (const plan of allPlans) {
        console.log(`\nSyncing ${plan.id}...`);
        try {
            // itemsフィールドのデータ形式: カスタムフィールドの繰り返し型
            const items = plan.items.map(item => ({
                fieldId: 'item',
                name: item.name,
                price: item.price,
                badge: item.badge ?? '',
                description: item.description ?? '',
                triple: item.features.triple,
                tilt: item.features.tilt,
                bonnet: item.features.bonnet,
                microwave: item.features.microwave,
                siren: item.features.siren,
                algorithm: item.features.algorithm,
                canguard: item.features.canguard,
            }));

            const data: Record<string, any> = {
                category: plan.category,
                description: plan.description,
                items,
            };

            let exists = false;
            try {
                await client.get({ endpoint: ENDPOINT, contentId: plan.id });
                exists = true;
            } catch (e) {
                exists = false;
            }

            if (exists) {
                await client.update({ endpoint: ENDPOINT, contentId: plan.id, content: data });
                console.log(`  ✓ Updated ${plan.id}`);
            } else {
                await client.create({ endpoint: ENDPOINT, contentId: plan.id, content: data });
                console.log(`  ✓ Created ${plan.id}`);
            }
        } catch (error: any) {
            console.error(`  ✗ Failed to sync ${plan.id}:`, error.message);
        }
    }
    console.log('\nAll sync tasks completed.');
}

sync();
