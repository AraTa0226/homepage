import { createClient } from 'microcms-js-sdk';

const client = createClient({
    serviceDomain: 'ang-home',
    apiKey: 'qlvT6cfFckMLzYHWFb6GhUIfCgDnrCwDeNZP',
});

async function test() {
    try {
        const res = await client.get({ endpoint: 'plans' });
        console.log('GET successful, found', res.contents.length, 'plans');
        
        // Try a dummy update to see if it's a write key
        // Note: We don't want to break anything, so we just try to fetch a specific one first
        if (res.contents.length > 0) {
            console.log('Sample Plan ID:', res.contents[0].id);
        }
    } catch (e) {
        console.error('API Test failed:', e);
    }
}

test();
