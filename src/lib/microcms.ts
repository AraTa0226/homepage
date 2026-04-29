import { createClient } from 'microcms-js-sdk';

if (!import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN) {
    console.warn('microCMS Service Domain is not defined. CMS integration will not work.');
}

export const client = createClient({
    serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN || '',
    apiKey: import.meta.env.VITE_MICROCMS_API_KEY || '',
});
