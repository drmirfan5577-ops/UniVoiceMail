import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { toast } from 'sonner';
import { INITIAL_MAIL } from '@/constants/mail';
import type { Mail, ComposeValues, SocialConnection, Folder } from '@/types/mail';
interface MailContextValue { mails: Mail[]; composeOpen: boolean; setComposeOpen: (open: boolean) => void; replyTo: Mail | null; reply: (mail: Mail) => void; update: (id: string, patch: Partial<Mail>) => void; move: (id: string, folder: Folder) => void; send: (values: ComposeValues, audio?: string, draft?: boolean) => void; connections: SocialConnection[]; addConnection: (item: SocialConnection) => void; removeConnection: (id: string) => void; }
const MailContext = createContext<MailContextValue | null>(null);
export function MailProvider({ children }: { children: ReactNode }) {
 const [mails, setMails] = useState<Mail[]>(() => JSON.parse(localStorage.getItem('univoice-mails') || 'null') || INITIAL_MAIL);
 const [connections, setConnections] = useState<SocialConnection[]>(() => JSON.parse(localStorage.getItem('univoice-social') || '[]'));
 const [composeOpen, setComposeOpen] = useState(false);
 const [replyTo, setReplyTo] = useState<Mail | null>(null);
 useEffect(() => { localStorage.setItem('univoice-mails', JSON.stringify(mails)); }, [mails]);
 useEffect(() => { localStorage.setItem('univoice-social', JSON.stringify(connections)); }, [connections]);
 const update = useCallback((id: string, patch: Partial<Mail>) => setMails(items => items.map(m => m.id === id ? { ...m, ...patch } : m)), []);
 const move = useCallback((id: string, folder: Folder) => { update(id, { folder }); toast.success(folder === 'archive' ? 'Message archived' : folder === 'trash' ? 'Message moved to trash' : 'Message restored'); }, [update]);
 const reply = useCallback((mail: Mail) => { setReplyTo(mail); setComposeOpen(true); }, []);
 const openCompose = useCallback((open: boolean) => { setComposeOpen(open); if (!open) setReplyTo(null); }, []);
 const send = useCallback((values: ComposeValues, audio?: string, draft = false) => {
  if (audio && mails.filter(m => m.id !== replyTo?.id).reduce((total, m) => total + (m.audio?.length || 0), audio.length) > 3000000) { toast.error('This demo’s recording storage is full. Send a text message instead.'); return; }
  console.log('[ESMail] Local message saved', { recipient: values.to, draft, voice: !!audio });
  const mail: Mail = { id: crypto.randomUUID(), sender: 'You', email: 'irfan@uniorbi.com', to: values.to, initials: 'IR', subject: values.subject, preview: values.body, body: values.body, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), date: 'Today', unread: false, starred: false, folder: draft ? 'drafts' : 'sent', kind: audio ? 'voice' : 'email', category: 'Personal', summary: values.body.slice(0, 220), audio };
  setMails(items => [mail, ...items.filter(item => !(replyTo?.folder === 'drafts' && item.id === replyTo.id))]); setComposeOpen(false); setReplyTo(null);
  toast.success(draft ? 'Draft saved on this device' : 'Message added to Sent', { description: draft ? undefined : 'Demo mode: no external email was delivered.' });
 }, [mails, replyTo]);
 const addConnection = useCallback((item: SocialConnection) => { setConnections(items => [...items, item]); toast.success('Social shortcut added'); }, []);
 const removeConnection = useCallback((id: string) => { setConnections(items => items.filter(item => item.id !== id)); toast.success('Shortcut removed'); }, []);
 return <MailContext.Provider value={{ mails, composeOpen, setComposeOpen: openCompose, replyTo, reply, update, move, send, connections, addConnection, removeConnection }}>{children}</MailContext.Provider>;
}
export function useMail() { const context = useContext(MailContext); if (!context) throw new Error('MailProvider is required'); return context; }
