import { createRoot } from 'react-dom/client';
import App from '@/App';
import '@/index.css';
createRoot(document.getElementById('root')!).render(<App/>);
if (import.meta.env.PROD && 'serviceWorker' in navigator) window.addEventListener('load', () => { navigator.serviceWorker.register('/service-worker.js').then(() => console.log('[PWA] Offline workspace ready')).catch(error => console.error('[PWA] Registration failed', error)); });
