import { Inbox, SearchX } from 'lucide-react';
interface EmptyInboxProps { searching: boolean; }
export default function EmptyInbox({ searching }: EmptyInboxProps) {
 return <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center"><span className="mb-4 rounded-2xl bg-secondary p-5 text-muted-foreground">{searching ? <SearchX size={28}/> : <Inbox size={28}/>}</span><h3 className="mb-2 font-bold">{searching ? 'No matching conversations' : 'A little room to breathe'}</h3><p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{searching ? 'Try a different sender, subject, or keyword.' : 'There are no messages here yet. New conversations will feel right at home.'}</p></div>;
}
