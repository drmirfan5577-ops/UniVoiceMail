import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MailProvider } from '@/hooks/useMail';
import AppLayout from '@/components/layout/AppLayout';
import AppErrorBoundary from '@/components/features/AppErrorBoundary';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
const Social = lazy(() => import('@/pages/Social'));
const Settings = lazy(() => import('@/pages/Settings'));
export default function App() { return <AppErrorBoundary><TooltipProvider><MailProvider><BrowserRouter><Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">Opening your workspace…</div>}><Routes><Route element={<AppLayout/>}>{['/', '/voice', '/starred', '/sent', '/drafts', '/archive', '/trash'].map(path => <Route key={path} path={path} element={<Index/>}/>)}<Route path="/social" element={<Social/>}/><Route path="/settings" element={<Settings/>}/></Route><Route path="*" element={<NotFound/>}/></Routes></Suspense></BrowserRouter><Toaster position="bottom-right" richColors closeButton/></MailProvider></TooltipProvider></AppErrorBoundary>; }
