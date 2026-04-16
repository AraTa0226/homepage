import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppAudio from './AppAudio.tsx';
import AppSecurity from './AppSecurity.tsx';
import './index.css';

const siteMode = import.meta.env.VITE_SITE_MODE || 'audio';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {siteMode === 'security' ? <AppSecurity /> : <AppAudio />}
  </StrictMode>,
);
