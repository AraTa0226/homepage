// ESMモジュールとして実行 (node scratch/debug_plans.mjs)
const API_KEY = 'qlvT6cfFckMLzYHWFb6GhUIfCgDnrCwDeNZP';
const SERVICE_DOMAIN = 'ang-home';
const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;

async function fetchWithKey(path, options = {}) {
    const url = `${BASE_URL}${path}`;
    const res = await fetch(url, {
        ...options,
        headers: {
            'X-MICROCMS-API-KEY': API_KEY,
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });
    const text = await res.text();
    console.log(`[${res.status}] ${path}`);
    if (!res.ok) {
        console.error('Error body:', text);
    } else {
        // 最初の300文字だけ表示
        console.log('Response preview:', text.substring(0, 500));
    }
    return { status: res.status, text };
}

// 1. plans の既存データを取得してスキーマ確認
async function checkExistingData() {
    console.log('\n=== Checking existing plans data ===');
    const { text, status } = await fetchWithKey('/plans?limit=1');
    if (status === 200) {
        const data = JSON.parse(text);
        if (data.contents && data.contents.length > 0) {
            const first = data.contents[0];
            console.log('First item ID:', first.id);
            console.log('Keys:', Object.keys(first));
            if (first.items) {
                console.log('items type:', typeof first.items);
                if (Array.isArray(first.items)) {
                    console.log('items[0] keys:', first.items[0] ? Object.keys(first.items[0]) : 'empty');
                    console.log('items[0]:', JSON.stringify(first.items[0], null, 2));
                }
            }
        } else {
            console.log('No contents found. totalCount:', data.totalCount);
        }
    }
}

// 2. シンプルなテストデータで POST を試す
async function testSimplePost() {
    console.log('\n=== Testing simple POST ===');
    const testData = {
        category: 'TEST CATEGORY',
        description: 'テスト説明文',
        items: [
            {
                fieldId: 'item',
                name: 'テストプラン',
                price: '100,000',
                badge: 'テスト',
                description: 'テスト用',
                triple: true,
                tilt: false,
                bonnet: true,
                microwave: false,
                siren: false,
                algorithm: true,
                canguard: false,
            }
        ]
    };
    
    // まず GET で test_item が存在するか確認
    const getRes = await fetchWithKey('/plans/test_debug_item');
    
    if (getRes.status === 200) {
        // 更新
        console.log('Item exists, trying PATCH...');
        await fetchWithKey('/plans/test_debug_item', {
            method: 'PATCH',
            body: JSON.stringify(testData),
        });
    } else {
        // 作成
        console.log('Item not found, trying POST with contentId...');
        await fetchWithKey('/plans/test_debug_item', {
            method: 'PUT',
            body: JSON.stringify(testData),
        });
    }
}

// 3. items なしでテスト
async function testWithoutItems() {
    console.log('\n=== Testing POST without items ===');
    const testData = {
        category: 'TEST NO ITEMS',
        description: 'アイテムなしテスト',
    };
    
    const { status, text } = await fetchWithKey('/plans/test_no_items', {
        method: 'PUT',
        body: JSON.stringify(testData),
    });
    
    console.log('Status:', status);
}

async function main() {
    await checkExistingData();
    await testWithoutItems();
    await testSimplePost();
}

main().catch(console.error);
