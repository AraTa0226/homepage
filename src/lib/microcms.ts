import { createClient } from 'microcms-js-sdk';

if (!import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN) {
    console.warn('microCMS Service Domain is not defined. CMS integration will not work.');
}

export const client = (import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN && import.meta.env.VITE_MICROCMS_API_KEY)
    ? createClient({
        serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
        apiKey: import.meta.env.VITE_MICROCMS_API_KEY,
    })
    : null;

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
        if (!client) return [];
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

// レーダー探知機商品の型定義
export interface RadarProduct {
    id: string;
    name: string;
    price: string;
    badge: string;
    slug: string;
    description?: string;
    link?: string;
    features?: string; // 改行区切りのテキスト
    image?: { url: string };
    featureImage?: { url: string };
}

// レーダー探知機商品一覧取得
export async function fetchRadarProducts(): Promise<RadarProduct[]> {
    try {
        if (!client) return [];
        const response = await client.getList<RadarProduct>({
            endpoint: 'radar',
            queries: { limit: 50 },
        });
        return response.contents;
    } catch (error) {
        console.error('[microCMS] Failed to fetch radar products:', error);
        return [];
    }
}

// デジタルインナーミラー商品の型定義
export interface DigitalMirrorProduct {
    id: string;
    name: string;
    price: string;
    badge: string;
    slug: string;
    description?: string;
    link?: string;
    features?: string; // 改行区切りのテキスト
    image?: { url: string };
    featureImage?: { url: string };
}

// デジタルインナーミラー商品一覧取得
export async function fetchDigitalMirrorProducts(): Promise<DigitalMirrorProduct[]> {
    try {
        if (!client) return [];
        const response = await client.getList<DigitalMirrorProduct>({
            endpoint: 'digital_mirror',
            queries: { limit: 50 },
        });
        return response.contents;
    } catch (error) {
        console.error('[microCMS] Failed to fetch digital mirror products:', error);
        return [];
    }
}
