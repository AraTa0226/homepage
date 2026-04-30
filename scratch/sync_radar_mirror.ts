import { createClient } from 'microcms-js-sdk';

const client = createClient({
    serviceDomain: 'ang-home',
    apiKey: 'qlvT6cfFckMLzYHWFb6GhUIfCgDnrCwDeNZP',
});

// ============================================================
// レーダー探知機 (radar)
// ============================================================
const radarProducts = [
    {
        slug: 'zk2200',
        name: 'Yupiteru ZK2200 (2ピースセパレート型)',
        price: '49,500円',
        badge: '最新指定店モデル',
        description: '最新の移動型オービスMSSS/LSMに対応した、ユピテル最高峰のセパレート型レーダー探知機。第2世代レーザーアンテナを搭載し、レーザー式取締機への対応精度を大幅向上。無線LANによる自動データ更新で、常に最新の取締情報を維持します。',
        link: 'https://www.yupiteru.co.jp/',
        features: ['移動型オービスMSSS対応', '第2世代レーザーアンテナ', '無線LAN自動更新対応'],
    },
    {
        slug: 'z2000',
        name: 'Yupiteru Z2000 (セパレート型)',
        price: '49,500円',
        badge: '指定店モデル',
        description: 'レーザー光の超高感度受信と、最新の移動オービスMSSS対応を両立したセパレート型モデル。ディスプレイと受信部を分離することで、視認性と検知性能を最大化します。',
        link: 'https://www.yupiteru.co.jp/',
        features: ['レーザー光超高感度受信', '移動オービスMSSS対応'],
    },
    {
        slug: 'z1100',
        name: 'Yupiteru Z1100 (ワンボディ型)',
        price: '38,500円',
        badge: '指定店モデル',
        description: '1ボディタイプとして最高峰の性能を誇るユピテルの指定店専用モデル。MSSS識別警報に対応しており、高精度な取締機検知を小型ボディに凝縮しています。',
        link: 'https://www.yupiteru.co.jp/',
        features: ['1ボディ最高峰', 'MSSS識別警報'],
    },
];

// ============================================================
// デジタルインナーミラー (digital_mirror)
// ============================================================
const digitalMirrorProducts = [
    {
        slug: 'dvr-dm1200a2-ic',
        name: '純正交換タイプ 12型ドラレコミラー\n「車内用リアカメラ」',
        price: '0',
        badge: 'NEW 4月下旬発売',
        description: '後方視界を確実に映すアルパインの最新フラッグシップデジタルミラー。12型の大画面・高画質液晶と、リア370万画素（WQHD）の高画質カメラを採用。STARVIS 2搭載により昼夜を問わず自然で鮮明な映像を実現します。純正ミラー交換タイプで車内に美しく調和します。',
        link: 'https://www.alpine.co.jp/',
        features: ['12型大画面・高画質液晶', 'リア370万画素(WQHD)カメラ', 'STARVIS 2搭載・夜間鮮明', '純正ミラー交換タイプ', '駐車録画モード標準装備'],
    },
    {
        slug: 'dvr-dm1200a2-oc',
        name: '純正交換タイプ 12型ドラレコミラー\n「車外用リアカメラ」',
        price: '0',
        badge: 'NEW 4月下旬発売',
        description: '後方視界を確実に映すアルパインの最新フラッグシップデジタルミラー。車外設置専用のWQHD（370万画素）カメラを採用。雨天時や夜間のスモークガラス越しでは困難な視認性も、車外カメラなら常にクリアに確保。STARVIS 2搭載により、あらゆる環境下で自然で鮮明な映像を提供します。',
        link: 'https://www.alpine.co.jp/',
        features: ['12型大画面・高画質液晶', '車外用リアカメラ(WQHD)', 'STARVIS 2搭載・夜間鮮明', '純正ミラー交換タイプ', '駐車録画モード標準装備'],
    },
    {
        slug: 'dvr-dm1000a2-ic',
        name: '純正交換タイプ 10型ドラレコミラー\n「車内用リアカメラ」',
        price: '0',
        badge: 'NEW 4月下旬発売',
        description: '後方視界を確実に映すアルパインの最新10型デジタルミラー。コンパクトな車室内にも圧迫感なくフィットする10型液晶を採用。リア370万画素（WQHD）カメラとSTARVIS 2を搭載し、昼夜を問わず圧倒的な鮮明さで安全運転をサポートします。純正ミラー交換タイプで美しく装着可能です。',
        link: 'https://www.alpine.co.jp/',
        features: ['10型大画面・高画質液晶', 'リア370万画素(WQHD)カメラ', 'STARVIS 2搭載・夜間鮮明', '純正ミラー交換タイプ', '駐車録画モード標準装備'],
    },
    {
        slug: 'dvr-dm1000a2-oc',
        name: '純正交換タイプ 10型ドラレコミラー\n「車外用リアカメラ」',
        price: '0',
        badge: 'NEW 4月下旬発売',
        description: '後方視界を確実に映すアルパインの最新10型デジタルミラー。車外設置専用のWQHD（370万画素）カメラを採用。雨天時や夜間のスモークガラス越しでは困難な視認性も、車外カメラなら常にクリアに確保。STARVIS 2搭載により、あらゆる環境下で自然で鮮明な映像を提供します。',
        link: 'https://www.alpine.co.jp/',
        features: ['10型大画面・高画質液晶', '車外用リアカメラ(WQHD)', 'STARVIS 2搭載・夜間鮮明', '純正ミラー交換タイプ', '駐車録画モード標準装備'],
    },
];

// ============================================================
// 汎用同期関数
// ============================================================
async function syncProducts(endpoint: string, products: any[]) {
    console.log(`\n=== ${endpoint} 同期開始 (${products.length}商品) ===`);
    let success = 0, errors = 0;

    for (const product of products) {
        try {
            const { features, ...rest } = product;
            const data: Record<string, any> = {
                ...rest,
                features: features ? features.join('\n') : '',
            };
            const contentId = product.slug;

            try {
                await client.get({ endpoint, contentId });
                await client.update({ endpoint, contentId, content: data });
                console.log(`✅ 更新: ${product.name.replace('\n', ' ')} (${contentId})`);
            } catch (e: any) {
                if (e.status === 404 || (e.message && e.message.includes('404'))) {
                    await client.create({ endpoint, contentId, content: data });
                    console.log(`✅ 新規: ${product.name.replace('\n', ' ')} (${contentId})`);
                } else {
                    throw e;
                }
            }
            success++;
        } catch (error: any) {
            console.error(`❌ 失敗: ${product.name.replace('\n', ' ')}`);
            console.error(`   ${error.message || error}`);
            errors++;
        }
    }

    console.log(`→ 成功: ${success}, 失敗: ${errors}`);
}

async function main() {
    await syncProducts('radar', radarProducts);
    await syncProducts('digital_mirror', digitalMirrorProducts);
    console.log('\n=== 全同期完了 ===');
}

main().catch(console.error);
