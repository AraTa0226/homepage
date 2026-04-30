import { createClient } from 'microcms-js-sdk';

const client = createClient({
    serviceDomain: 'ang-home',
    apiKey: 'qlvT6cfFckMLzYHWFb6GhUIfCgDnrCwDeNZP',
});

const ENDPOINT = 'dashcam';

// cms.json の dashcam データ
const dashcamProducts = [
    {
        name: 'Yupiteru Z-330',
        price: '46,200円',
        badge: '3カメラ・最上位',
        slug: 'z-330',
        youtubeId: 'yfkHQGr6VQQ',
        description: 'フロント+リア席側+リア後方の3つのカメラで死角をカバー。後方から見渡すように前方状況を記録でき、車内プライバシーにも配慮された最新モデル。電源監視ユニット標準装備で自動駐車監視切り替えが可能です。',
        link: 'https://www.yupiteru.co.jp/products/drive_recorder/z-330/',
        features: ['3カメラ(フロント+リアデュアル)', 'STARVIS 2搭載', '駐車監視標準装備', 'SDフォーマット不要'],
    },
    {
        name: 'Yupiteru ZQ-60ai',
        price: '46,200円',
        badge: '全周囲360°+AI',
        slug: 'zq-60ai',
        youtubeId: 'zPQXFBSEsRc',
        description: '全周囲360°カメラ+リアカメラで全方位をカバー。人検知A.I.搭載で駐車中の人物接近を自動検知し録画開始。3年間の安心保証付き。',
        link: 'https://www.yupiteru.co.jp/',
        features: ['全周囲360°+リアカメラ', '人検知A.I.搭載', '駐車監視 標準装備', '3年保証'],
    },
    {
        name: 'Yupiteru ZQ-40si',
        price: '47,300円',
        badge: '360°+スマホ連動',
        slug: 'zq-40si',
        youtubeId: '-tw86afGHRY',
        description: '全周囲360°録画にスマートフォンアプリ連動機能を搭載。外出先からでもリアルタイムに映像確認が可能な最新モデル。',
        link: 'https://www.yupiteru.co.jp/',
        features: ['全周囲360°+リアカメラ', 'スマホアプリ連動機能', '自動駐車モード切替'],
    },
    {
        name: 'Yupiteru ZQ-50AI',
        price: '41,800円',
        badge: '360°+AI・ADAS',
        slug: 'zq-50ai',
        youtubeId: 'GDVFZoNu4qQ',
        description: '全周囲360°録画と人検知A.I.に加え、安全運転支援システム(ADAS)を搭載。前方衝突警告・車線逸脱警告など多彩な安全機能で日々のドライブをサポートします。',
        link: 'https://www.yupiteru.co.jp/',
        features: ['全周囲360°録画', '人検知A.I.搭載', '安全運転サポート(ADAS)'],
    },
    {
        name: 'Yupiteru ZQ-21',
        price: '27,500円',
        badge: '360°・エントリー',
        slug: 'zq-21',
        description: '全周囲360°録画をリーズナブルに導入できるエントリーモデル。SDフォーマット不要の新方式採用でメンテナンスも楽々。',
        link: 'https://www.yupiteru.co.jp/',
        features: ['全周囲360°録画', 'SDフォーマット不要'],
    },
    {
        name: 'Yupiteru ZQ-25',
        price: '29,700円',
        badge: '360°+スマホ連動',
        slug: 'zq-25',
        description: '全周囲360°録画に無線LAN・スマホ連動機能を搭載したコスパ優秀モデル。外出先からの映像確認も可能です。',
        link: 'https://www.yupiteru.co.jp/',
        features: ['全周囲360°録画', '無線LAN搭載・スマホ連動'],
    },
    {
        name: 'Yupiteru Q-03',
        price: '38,500円',
        badge: '全天球720°記録',
        slug: 'q-03',
        description: '上下左右すべての方向を720°全天球で記録する革新的なモデル。STARVIS搭載で夜間も鮮明な映像を記録します。',
        link: 'https://www.yupiteru.co.jp/',
        features: ['全方位720°録画', 'STARVIS搭載・夜間鮮明'],
    },
    {
        name: 'Yupiteru SN-TW88d',
        price: '36,300円',
        badge: '前後STARVIS・駐車監視標準',
        slug: 'sn-tw88d',
        description: '前後両方にSTARVIS搭載した高画質2カメラモデル。駐車監視機能が標準装備されており、別途オプション不要で導入できます。',
        link: 'https://www.yupiteru.co.jp/',
        features: ['前後STARVIS搭載・夜間鮮明', '駐車監視機能 標準装備'],
    },
    {
        name: 'Yupiteru SN-R13d',
        price: '19,250円',
        badge: 'リア専用',
        slug: 'sn-r13d',
        description: 'フロントレコーダーに追加するリア専用カメラ。STARVIS搭載で夜間も鮮明に記録。スモークガラスにも対応しています。',
        link: 'https://www.yupiteru.co.jp/',
        features: ['リア専用追加モデル', 'STARVIS搭載', 'スモーク対応'],
    },
];

async function syncDashcam() {
    console.log(`=== dashcam 同期開始 (${dashcamProducts.length}商品) ===`);
    
    let successCount = 0;
    let errorCount = 0;

    for (const product of dashcamProducts) {
        try {
            const { features, ...rest } = product;
            
            // microCMSのテキストフィールドは繰り返しを別の方法で渡す必要がある
            // featuresは改行区切りのテキストとして保存
            const data: Record<string, any> = {
                name: rest.name,
                price: rest.price,
                badge: rest.badge,
                slug: rest.slug,
                description: rest.description || '',
                link: rest.link || '',
                features: features ? features.join('\n') : '',
            };
            
            if (rest.youtubeId) {
                data.youtubeId = rest.youtubeId;
            }

            // slug をコンテンツIDとして使用
            const contentId = product.slug;
            
            // まず既存コンテンツの確認
            try {
                await client.get({ endpoint: ENDPOINT, contentId });
                // 存在する場合はPATCH（更新）
                const result = await client.update({ endpoint: ENDPOINT, contentId, content: data });
                console.log(`✅ 更新: ${product.name} (ID: ${contentId})`);
            } catch (e: any) {
                if (e.status === 404 || (e.message && e.message.includes('404'))) {
                    // 存在しない場合はPUT（新規作成、IDを指定）
                    const result = await client.create({ endpoint: ENDPOINT, contentId, content: data });
                    console.log(`✅ 新規作成: ${product.name} (ID: ${contentId})`);
                } else {
                    throw e;
                }
            }
            successCount++;
        } catch (error: any) {
            console.error(`❌ 失敗: ${product.name}`);
            console.error(`   エラー:`, error.message || error);
            if (error.response) {
                try {
                    const body = await error.response.json?.();
                    console.error(`   詳細:`, JSON.stringify(body));
                } catch {}
            }
            errorCount++;
        }
    }

    console.log(`\n=== 同期完了 ===`);
    console.log(`成功: ${successCount}商品`);
    console.log(`失敗: ${errorCount}商品`);
}

syncDashcam().catch(console.error);
