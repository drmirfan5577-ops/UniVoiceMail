import { Menu, Search, ChevronDown, CircleHelp } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
interface HeaderProps { openMenu: () => void; }
export default function Header({ openMenu }: HeaderProps) {
 const location = useLocation(); const navigate = useNavigate();
 const query = new URLSearchParams(location.search).get('q') || '';
 return <header className="flex h-[84px] shrink-0 items-center gap-4 border-b bg-card px-5 lg:px-8">
  <button className="icon-button lg:hidden" aria-label="Open navigation" onClick={openMenu}><Menu size={22}/></button>
  <Link to="/" className="mr-5 hidden items-center gap-2 font-display text-lg font-extrabold sm:flex">ESMail <span className="mt-0.5 rounded-md border px-1.5 py-0.5 text-[9px] font-sans font-semibold tracking-wide text-muted-foreground">BY UNIVOICEMAIL</span></Link>
  <div className="relative w-full max-w-[420px]"><Search size={17} className="absolute left-3 top-3.5 text-muted-foreground"/><input aria-label="Search your conversations" value={query} onChange={e => navigate(`${['/social', '/settings'].includes(location.pathname) ? '/' : location.pathname}${e.target.value ? `?q=${encodeURIComponent(e.target.value)}` : ''}`, { replace: true })} className="h-11 w-full rounded-lg border-0 bg-muted pl-10 pr-12 text-sm placeholder:text-muted-foreground focus:ring-1 focus:ring-primary" placeholder="Search your conversations…"/><span className="absolute right-3 top-3 hidden text-xs text-muted-foreground md:block">⌕</span></div>
  <div className="ml-auto flex shrink-0 items-center gap-3"><span className="hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium text-muted-foreground xl:flex"><span className="h-1.5 w-1.5 rounded-full bg-primary"/>Demo workspace</span><button className="icon-button hidden sm:flex" aria-label="Help" onClick={() => toast.info('Welcome to ESMail', { description: 'Explore the inbox, record a voice message, or add a social shortcut. External delivery and AI are simulated.' })}><CircleHelp size={19}/></button><Link to="/settings" aria-label="Profile and settings" className="flex min-h-11 items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-primary">IR</span><ChevronDown className="hidden sm:block" size={14}/></Link></div>
 </header>;
}
