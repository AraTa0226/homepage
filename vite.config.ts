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

      if (req.method === 'POST' && req.url === '/api/save-cms') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const dataPath = path.resolve(__dirname, 'src/data/cms.json');
            let currentData = {};
            if (fs.existsSync(dataPath)) {
              currentData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
            }
            const payload = JSON.parse(body);
            const newData = { ...currentData, ...payload };
            fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e: any) {
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
