import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

import fs from 'fs';

const localCmsPlugin = () => ({
  name: 'local-cms-plugin',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const dataPath = path.resolve(__dirname, 'src/data/cms.json');

      if (req.method === 'GET' && req.url === '/api/cms') {
        try {
          const data = fs.readFileSync(dataPath, 'utf-8');
          res.setHeader('Content-Type', 'application/json');
          res.end(data);
        } catch (e: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: e.message }));
        }
        return;
      }

function sanitizeCmsData(data: any): any {
  if (!data) return data;
  if (typeof data === 'string') {
    if (data.includes('\uFFFD') || data.includes('正シ') || data.includes('スぴーかー') || data.includes('????')) {
      let cleaned = data;
      if (cleaned.includes('輸入車の中でも')) {
        return '輸入車の中でも、音質改善のご相談が特に多いのがBMWです。グレードを問わず純正システムの構成はほぼ同じで、多くのオーナー様が同じお悩みを抱えています。純正の見た目を崩さず、加工を抑えた方法で音質改善できるパッケージをご用意しています。';
      }
      if (cleaned.includes('フロントに10cm程度') || cleaned.includes('シート下のウーハー')) {
        return 'BMWの標準オーディオシステムはフロントに10cm程度のスピーカー、ツイーターなし、シート下のウーハーで低音を補うという構成がほとんどです。加工を抑えてコストを抑えた改善方法として、まずはフロントスピーカーの交換とツイーターの追加。さらに適合車種であればウーハーも交換することで、ハリのあるサウンドに生まれ変わります。このパッケージではトレードインで交換可能なスピーカーをご紹介しています。';
      }
      if (cleaned.includes('純正ツィーター非装着車') || cleaned.includes('純正部品が必要')) {
        return '純正ツィーター非装着車の場合、別途純正部品が必要になる場合があります。（おおよそ15000円前後)';
      }
      return cleaned.replace(/\uFFFD+/g, '').replace(/\?\?\?\?+/g, '');
    }
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(item => sanitizeCmsData(item));
  }
  if (typeof data === 'object') {
    const cleanedObj: any = {};
    for (const key of Object.keys(data)) {
      cleanedObj[key] = sanitizeCmsData(data[key]);
    }
    return cleanedObj;
  }
  return data;
}

      if (req.method === 'POST' && req.url === '/api/save-cms') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const dataPath = path.resolve(__dirname, 'src/data/cms.json');
            console.log('[CMS SAVE] Saving to:', dataPath);
            let currentData = {};
            if (fs.existsSync(dataPath)) {
              currentData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
            }
            const payload = JSON.parse(body);
            console.log('[CMS SAVE] Payload keys:', Object.keys(payload));
            const rawData = { ...currentData, ...payload };
            const newData = sanitizeCmsData(rawData);
            fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2), 'utf-8');
            console.log('[CMS SAVE] Write complete with auto-sanitization. Size:', JSON.stringify(newData).length);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e: any) {
            console.error('[CMS SAVE] Error:', e.message);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
        return;
      }
      next();
    });
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), localCmsPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        ignored: ['**/src/data/cms.json']
      }
    },
  };
});
