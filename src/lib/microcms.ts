import { createClient } from 'microcms-js-sdk';

if (!import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN) {
    console.warn('microCMS Service Domain is not defined. CMS integration will not work.');
}

export const client = createClient({
    serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN || '',
    apiKey: import.meta.env.VITE_MICROCMS_API_KEY || '',
});

// ドライブレコーダー商品の型定義
export interface DashcamProduct {
    id: string;
    name: string;
    price: string;
    badge: string;
    slug: string;
    description?: string;
    link?: string;
    youtubeId?: string;
    features?: string; // 改行区切りのテキスト
    image?: { url: string };
    featureImage?: { url: string };
}

// ドライブレコーダー商品一覧取得
export async function fetchDashcamProducts(): Promise<DashcamProduct[]> {
    try {
        const response = await client.getList<DashcamProduct>({
            endpoint: 'dashcam',
            queries: { limit: 50 },
        });
        return response.contents;
    } catch (error) {
        console.error('[microCMS] Failed to fetch dashcam products:', error);
        return [];
    }
}
