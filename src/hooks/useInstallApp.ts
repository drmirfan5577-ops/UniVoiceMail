import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
interface InstallEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>; }
export function useInstallApp() {
 const eventRef = useRef<InstallEvent | null>(null); const [installed, setInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches);
 useEffect(() => { const handle = (event: Event) => { event.preventDefault(); eventRef.current = event as InstallEvent; }; const done = () => { setInstalled(true); eventRef.current = null; toast.success('UniVoiceMail installed'); }; window.addEventListener('beforeinstallprompt', handle); window.addEventListener('appinstalled', done); return () => { window.removeEventListener('beforeinstallprompt', handle); window.removeEventListener('appinstalled', done); }; }, []);
 const install = async () => { if (eventRef.current) { await eventRef.current.prompt(); const choice = await eventRef.current.userChoice; console.log('[PWA] Install choice', choice.outcome); eventRef.current = null; } else toast.info('Install UniVoiceMail', { description: 'On the published HTTPS site, use your browser’s Install app or Add to Home Screen option. Installation may be unavailable inside previews.' }); };
 return { installed, install };
}
