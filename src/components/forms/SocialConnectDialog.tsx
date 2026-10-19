import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Link2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { socialSchema } from '@/lib/validations';
import { SOCIAL_PLATFORMS } from '@/constants/social';
import { useMail } from '@/hooks/useMail';
interface SocialConnectDialogProps { platform: string | null; onClose: () => void; }
interface SocialValues { platform: string; url: string; }
export default function SocialConnectDialog({ platform, onClose }: SocialConnectDialogProps) {
 const { addConnection } = useMail(); const { register, reset, handleSubmit, formState: { errors } } = useForm<SocialValues>({ resolver: zodResolver(socialSchema) });
 useEffect(() => { reset({ platform: platform || '', url: '' }); }, [platform, reset]);
 const example = SOCIAL_PLATFORMS.find(p => p.name === platform)?.example;
 return <Dialog open={!!platform} onOpenChange={open => { if (!open) onClose(); }}><DialogContent className="bg-card sm:max-w-[480px]"><DialogHeader><DialogTitle>Add {platform} to your space</DialogTitle><DialogDescription>A one-click shortcut to your profile, channel, or conversation.</DialogDescription></DialogHeader><form onSubmit={handleSubmit(values => { addConnection({ id: crypto.randomUUID(), ...values }); onClose(); })} className="space-y-4"><input type="hidden" {...register('platform')}/><div><label htmlFor="social-url" className="mb-2 block text-sm font-semibold">Your {platform} URL</label><input id="social-url" className="field text-sm" placeholder={example} {...register('url')} aria-invalid={!!errors.url}/>{errors.url && <p className="mt-2 flex items-center gap-1 text-xs text-destructive"><AlertCircle size={12}/>{errors.url.message}</p>}</div><p className="rounded-lg bg-muted p-3 text-xs leading-relaxed text-muted-foreground">This saves a shortcut, not a signed-in connection. Chat, replies, and direct email-to-social delivery require official platform integrations.</p><button className="primary-button w-full" type="submit"><Link2 size={16}/>Add shortcut</button></form></DialogContent></Dialog>;
}
