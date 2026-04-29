import { createClient } from 'microcms-js-sdk';

const client = createClient({
    serviceDomain: 'ang-home',
    apiKey: 'qlvT6cfFckMLzYHWFb6GhUIfCgDnrCwDeNZP',
});

// ============================================================
// ✏️ ここを編集するだけで新しい車種を追加できます
// ============================================================

const NEW_VEHICLE = {
    // microCMS上のID（英数字とアンダーバーのみ）
    id: 'new_vehicle_id',

    // プランカテゴリ見出し
    category: '車種名 専用パッケージ',

    // 車種の説明文
    description: '車種の説明文をここに入力。',

    // プラン一覧（必要な数だけ追加・削除OK）
    items: [
        {
            name: 'Grgo ZVT II ＋ CANガード',
            price: '336,600',
            badge: 'おすすめ',  // 'おすすめ' | '推奨構成' | '最強プラン' | ''
            description: 'プランの説明文。',
            features: {
                triple: true,     // トリプルセンサー
                tilt: true,       // 傾斜センサー
                bonnet: true,     // ボンネットセンサー
                microwave: false, // マイクロ波センサー
                siren: false,     // バックアップサイレン
                algorithm: true,  // アルゴリズム
                canguard: true,   // CANガード
            }
        },
        {
            name: 'Panthera Z306 ＋ CANガード',
            price: '396,800',
            badge: '推奨構成',
            description: 'プランの説明文。',
            features: {
                triple: true,
                tilt: true,
                bonnet: true,
                microwave: false,
                siren: false,
                algorithm: true,
                canguard: true,
            }
        },
        {
            name: 'Panthera Z706 ＋ CANガード',
            price: '486,800',
            badge: '最強プラン',
            description: 'プランの説明文。',
            features: {
                triple: true,
                tilt: true,
                bonnet: true,
                microwave: true,
                siren: true,
                algorithm: true,
                canguard: true,
            }
        },
    ]
};

// ============================================================
// ⚠️ 追加後に VehicleSecurityDetail.tsx も更新してください
//
// 1. vehicleConfigs に追加（約1560行目付近）:
//
//    'url-slug-here': {
//        name: '表示名',
//        year: '2024-',
//        image: '/images/Security/vehicle/xxx.webp',
//        description: '説明文',
//        plans: []
//    },
//
// 2. idMapping に追加（約1705行目付近）:
//
//    'url-slug-here': 'new_vehicle_id',
//
// ============================================================

async function addVehicle() {
    const items = NEW_VEHICLE.items.map(item => ({
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
        category: NEW_VEHICLE.category,
        description: NEW_VEHICLE.description,
        items,
    };

    console.log(`\nSyncing: ${NEW_VEHICLE.id} ...`);
    try {
        let exists = false;
        try {
            await client.get({ endpoint: 'plans', contentId: NEW_VEHICLE.id });
            exists = true;
        } catch (_) {}

        if (exists) {
            await client.update({ endpoint: 'plans', contentId: NEW_VEHICLE.id, content: data });
            console.log(`  ✓ Updated: ${NEW_VEHICLE.id}`);
        } else {
            await client.create({ endpoint: 'plans', contentId: NEW_VEHICLE.id, content: data });
            console.log(`  ✓ Created: ${NEW_VEHICLE.id}`);
        }
        console.log('\n✅ 完了！次に VehicleSecurityDetail.tsx の vehicleConfigs と idMapping を更新してください。');
    } catch (error: any) {
        console.error(`  ✗ Error:`, error.message);
    }
}

addVehicle();
