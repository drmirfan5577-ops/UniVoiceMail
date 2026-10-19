import { Star, Mic, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMail } from '@/hooks/useMail';
import type { Mail } from '@/types/mail';
interface MailRowProps { mail: Mail; selected: boolean; onSelect: () => void; }
export default function MailRow({ mail, selected, onSelect }: MailRowProps) {
 const { update } = useMail();
 return <div className={cn('group relative flex items-start gap-3 border-b px-4 py-5 last:border-b-0', selected ? 'bg-accent' : 'bg-card hover:bg-muted/70')}>
  {selected && <div className="absolute inset-y-0 left-0 w-[3px] bg-primary"/>}
  <button onClick={onSelect} className="flex min-w-0 flex-1 items-start gap-3 text-left"><span className={cn('mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold', mail.kind === 'voice' ? 'bg-brand-soft text-primary' : mail.category === 'Personal' ? 'bg-success-soft text-success' : 'bg-secondary text-muted-foreground')}>{mail.initials}</span><span className="min-w-0 flex-1"><span className="mb-1.5 flex items-center justify-between gap-2"><span className={cn('truncate text-[13px]', mail.unread ? 'font-bold' : 'font-medium')}>{mail.sender}{mail.unread && <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary"/>}</span><span className="shrink-0 text-[10px] text-muted-foreground">{mail.time}</span></span><span className={cn('mb-1 block truncate text-[13px]', mail.unread && 'font-semibold')}>{mail.subject}</span><span className="block truncate text-xs text-muted-foreground">{mail.preview}</span><span className="mt-3 flex items-center gap-2"><span className={cn('rounded px-1.5 py-0.5 text-[9px] font-medium', mail.category === 'Work' ? 'bg-secondary text-muted-foreground' : mail.category === 'Personal' ? 'bg-success-soft text-success' : 'bg-brand-soft text-primary')}>{mail.category}</span>{mail.kind === 'voice' && <span className="flex items-center gap-1 text-[10px] text-primary"><Mic size={11}/>Voice message · {mail.duration || 'Recording'}</span>}{mail.attachment && <Paperclip size={12} className="text-muted-foreground"/>}</span></span></button>
  <button onClick={() => update(mail.id, { starred: !mail.starred })} aria-label={mail.starred ? 'Unstar message' : 'Star message'} className="absolute bottom-3 right-2 flex h-11 w-11 items-center justify-center"><Star size={15} className={mail.starred ? 'fill-primary text-primary' : 'text-muted-foreground/60'}/></button>
 </div>;
}
