import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { X } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ComposeDialog from '@/components/forms/ComposeDialog';
import { cn } from '@/lib/utils';
export default function AppLayout() {
 const [menu, setMenu] = useState(false);
 return <div className="flex min-h-screen lg:h-screen lg:overflow-hidden">
  {menu && <button aria-label="Close navigation" onClick={() => setMenu(false)} className="fixed inset-0 z-40 bg-ink/50 lg:hidden"/>}
  <div className={cn('fixed inset-y-0 left-0 z-50 lg:static lg:z-auto', menu ? 'block' : 'hidden lg:block')}><Sidebar close={() => setMenu(false)}/>{menu && <button onClick={() => setMenu(false)} className="icon-button absolute right-2 top-1 lg:hidden" aria-label="Close navigation"><X size={16}/></button>}</div>
  <div className="flex min-w-0 flex-1 flex-col"><Header openMenu={() => setMenu(true)}/><main className="min-h-0 flex-1 overflow-y-auto"><Outlet/></main></div><ComposeDialog/>
 </div>;
}
