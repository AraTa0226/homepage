import { createClient } from 'microcms-js-sdk';

const client = createClient({
    serviceDomain: 'ang-home',
    apiKey: 'qlvT6cfFckMLzYHWFb6GhUIfCgDnrCwDeNZP',
});

const ENDPOINT = 'plans';

const allPlans = [
    {
        id: 'lexus_nx',
        category: 'LEXUS NX 専用パッケージ',
        description: '都会派SUVとして高い支持。利便性を損なわず、かつ強力な防犯性能を両立させます。',
        items: [
            { name: 'Grgo ZV II ＋ CANガード ＋ トリプル', price: '314,600', badge: '', description: 'スマート連動とトリプルセンサー。NXオーナーに一番支持される構成。', features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Grgo ZVT II ＋ CANガード', price: '331,600', badge: 'おすすめ', description: '傾斜センサーとCANガード、1WAYリモコン。安心をワンランク上げるプラン。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z306 ＋ CANガード', price: '391,800', badge: '推奨構成', description: '全方位監視とCANインベーダー対策を完全に両立させたプラン。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z706 ＋ CANガード', price: '481,800', badge: '最強プラン', description: '全機能を解放。NXを守るためのANGフラッグシッププラン。', features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true } },
        ]
    },
    {
        id: 'lexus_lx',
        category: 'LEXUS LX600 専用パッケージ',
        description: 'レクサスのフラッグシップSUV。最新のデジタル窃盗手口への完全対策が必須であり、Pantheraを中心とした最強の多重防御を推奨します。',
        items: [
            { name: 'Panthera Z106 ＋ CANガード ＋ トリプル', price: '384,800', badge: '', description: 'パンテーラの緻密なアルゴリズムで誤報を排し鉄壁の護り。', features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z306 ＋ CANガード', price: '406,800', badge: 'おすすめ', description: 'フラッグシップSUVに相応しい多機能検知パッケージ。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z306 ＋ CANガード ＋ マイクロ波', price: '458,800', badge: '推奨構成', description: '多機能検知パッケージに、事前検知のマイクロ波をプラス。', features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z706 ＋ CANガード', price: '496,800', badge: '最強プラン', description: '全センサー装備の最高峰。LXを守り抜く最強の選択肢。', features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true } },
        ]
    },
    {
        id: 'lexus_lbx',
        category: 'LEXUS LBX 専用パッケージ',
        description: '「高級車の概念を変える」コンパクトSUV。小型車ながら狙われやすいため、確実なデジタル対策が必要です。',
        items: [
            { name: 'Grgo ZV II ＋ CANガード', price: '302,800', badge: '', description: 'LBX必須のボンネットセンサーとCANガードを含む基本パッケージ。', features: { triple: false, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Grgo ZVT II ＋ CANガード', price: '334,600', badge: 'おすすめ', description: '感度良好な傾斜センサーを搭載。LBXに最高水準の守りを。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z306 ＋ CANガード', price: '394,800', badge: '推奨構成', description: '充実のセンサー群で死角なし。デジタル盗難手口も完全ブロック。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z306 ＋ CANガード ＋ マイクロ波', price: '446,800', badge: '', description: '車外検知を追加し、高級コンパクトLBXの価値を徹底防衛。', features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z706 ＋ CANガード', price: '484,800', badge: '最強プラン', description: 'すべてのセンサーを纏った、LBXのための最強仕様。', features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true } },
        ]
    },
    {
        id: 'alphard_40',
        category: 'ALPHARD / VELLFIRE (40系) 専用パッケージ',
        description: '最新の40系。CANインベーダーや最新手口に対し、スマートキー連動や物理CANガードを組み合わせた鉄壁の布陣をご提案します。',
        items: [
            { name: 'Grgo ZV II ＋ CANガード ＋ トリプル', price: '270,728', badge: '', description: '物理的なCANインベーダー対策とトリプルセンサーを組み合わせた実戦的パッケージ。', features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Grgo ZVT II ＋ CANガード', price: '295,273', badge: 'おすすめ', description: 'ZVT IIをベースに、物理CAN対策を統合。多重のセンサーと物理防御で40系をガード。', features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z106 ＋ CANガード ＋ トリプル', price: '315,545', badge: '', description: 'パンテーラの基本性能に物理CANガードをプラス。デジタルとアナログ両面から阻止。', features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z306 ＋ CANガード', price: '358,909', badge: '推奨構成', description: 'Z306の多重センサーに物理CAN対策を統合。レッカー盗難もCANインベーダーも防ぎます。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z706 ＋ CANガード', price: '440,727', badge: '最強プラン', description: 'ANGが提案する究極の40系防衛プラン。フルスペックパンテーラと物理CANガードの正真正銘の鉄壁。', features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true } },
        ]
    },
    {
        id: 'land_cruiser_70',
        category: 'LAND CRUISER 70 専用パッケージ',
        description: '不変の信頼性を誇る本格オフローダー。最新モデルでは盗難リスクも高まっており、伝統的な物理防御と最新システムの融合が必要です。',
        items: [
            { name: 'Grgo 5Vf II ＋ トリプル', price: '225,800', badge: '', description: '1WAYリモコンのみ付属のモデル。トリプルセンサーを追加し検知を強化。アドブルーリッド対策も対応可。', features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false } },
            { name: 'Grgo ZV II ＋ トリプル', price: '243,800', badge: '', description: 'アンサーバックリモコンモデル。トリプルセンサーで検知能力を強化。', features: { triple: true, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false } },
            { name: 'Grgo ZVT II', price: '265,800', badge: 'おすすめ', description: '傾斜センサー・1WAYリモコン付属の最上位Grgo。アナログキー車に最適なセッティングで施工。', features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false } },
            { name: 'Panthera Z306', price: '335,800', badge: '推奨構成', description: '人気の傾斜センサーを標準装備。70の盗難・レッカー被害を徹底阻止。', features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false } },
            { name: 'Panthera Z706', price: '425,800', badge: '最強プラン', description: '全センサー装備の最高峰。70を守り抜くANGのフルスペックパッケージ。', features: { triple: true, tilt: true, bonnet: false, microwave: true, siren: true, algorithm: false, canguard: false } },
        ]
    },
    {
        id: 'crown_2024',
        category: 'CROWN 専用パッケージ',
        description: 'スポーツ、クロスオーバー、セダン、エステート。最新のクラウンシリーズに対し、CANガードやパンテーラを組み合わせた最適な防犯対策をご提案します。',
        items: [
            { name: 'Grgo ZV II ＋ CANガード', price: '314,600', badge: '', description: '最新のクラウンシリーズに最適。物理CANガードと最新システムを組み合わせ、利便性と防犯を両立。', features: { triple: true, tilt: false, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Grgo ZVT II ＋ CANガード', price: '336,600', badge: 'おすすめ', description: '傾斜センサーと1WAYリモコンを標準装備。ジャッキアップやレッカー移動にも対応する多重防御プラン。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z306 ＋ CANガード', price: '396,800', badge: '推奨構成', description: '傾斜センサー標準装備の人気モデル。クラウンのあらゆる弱点を補い、誤作動を排した高度な警備を実現。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z306 ＋ CANガード ＋ マイクロ波', price: '448,800', badge: '', description: 'センサー満載のフルガードパッケージ。うろつき検知を追加し、高級車クラウンを全方位から監視。', features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: false, algorithm: true, canguard: true } },
            { name: 'Panthera Z706 ＋ CANガード', price: '486,800', badge: '最強プラン', description: '全センサー＋バックアップサイレン仕様のパンテーラ最上位。クラウンを守り抜く究極の回答。', features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: true } },
        ]
    },
    {
        id: 'kcar_special',
        category: 'K-CAR 専用パッケージ',
        description: '軽自動車だからこそ、センサー感度の追求と利便性を両立。車上荒らしやイタズラから愛車を守る、K-CAR専用の最適パッケージをご提案します。',
        items: [
            { name: 'Grgo 1Vs II', price: '124,800', badge: '', description: '難しい操作は一切不要。純正キーのロック・アンロックに連動して警備を開始する、K-CARオーナーに一番人気のパッケージ。', features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false } },
            { name: 'Grgo ZV II ＋ スマキー連動/スマクロ', price: '207,800', badge: '', description: 'ZV IIにスマートキー連動（スマクロ）を追加。利便性を損なわず、最新の手口から愛車を守ります。', features: { triple: false, tilt: false, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false } },
            { name: 'Grgo ZVT II', price: '219,800', badge: 'おすすめ', description: '傾斜・トリプルセンサーを同梱。ジャッキアップや車体へのあらゆる衝撃を逃さず検知する、Grgo最上位構成。', features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: false, canguard: false } },
            { name: 'Grgo ZVT II ＋ スマキー連動/スマクロ', price: '264,600', badge: '', description: '最高位Grgoにスマートキー連動を追加。あらゆる衝撃・傾斜検知に利便性をプラスした究極の軽カープラン。', features: { triple: true, tilt: true, bonnet: false, microwave: false, siren: false, algorithm: true, canguard: false } },
            { name: 'Panthera Z306 ＋ スマキー連動/スマクロ', price: '315,800', badge: '推奨構成', description: '人気センサーを網羅したZ306にスマクロを追加。ホイール盗難からイタズラまで、全方位で車両を監視。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false } },
            { name: 'Panthera Z706 ＋ スマキー連動/スマクロ', price: '395,800', badge: '最強プラン', description: '全センサー解放。マイクロ波による接近検知やバックアップサイレンまで備えた、K-CARの防犯を極めるための頂点プラン。', features: { triple: true, tilt: true, bonnet: true, microwave: true, siren: true, algorithm: true, canguard: false } },
        ]
    },
    {
        id: 'hiace_200_full',
        category: 'HIACE (200系) フルラインナップ',
        description: '仕事からレジャーまで幅広く活躍するハイエース。狙われやすい車種だからこそ、センサー感度の追求と利便性を両立した専用プランをご用意しました。',
        items: [
            { name: 'Grgo ZVT II ＋ ミラー連動', price: '250,800', badge: 'おすすめ', description: '傾斜・トリプルセンサーを同梱した上位モデル。ハイエースのレッカー盗難も確実に検知。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false } },
            { name: 'Grgo ZVT II ＋ スマキー連動/スマクロ ＋ ミラー連動', price: '293,800', badge: '', description: '最高位Grgoにスマキー連動を追加。利便性と鉄壁の防犯、さらにミラー連動の快適性を一台に。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false } },
            { name: 'Panthera Z306 ＋ ミラー連動', price: '320,800', badge: '推奨構成', description: '全センサー標準装備。ハイエースオーナーに最も支持される、高性能とお買得感を両立したプラン。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false } },
            { name: 'Panthera Z306 ＋ スマキー連動/スマクロ ＋ ミラー連動', price: '343,800', badge: '', description: 'Z306の多機能検知にスマキー連動の便利さをプラス。最新のインベーダー対策も網羅したハイエンドプラン。', features: { triple: true, tilt: true, bonnet: true, microwave: false, siren: false, algorithm: true, canguard: false } },
        ]
    },
];

async function sync() {
    for (const plan of allPlans) {
        console.log(`\nSyncing ${plan.id}...`);
        try {
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

            const data = {
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
            console.error(`  ✗ Failed ${plan.id}:`, error.message);
        }
    }
    console.log('\nAll done.');
}

sync();
