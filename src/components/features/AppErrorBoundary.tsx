import { Component, type ReactNode, type ErrorInfo } from 'react';
interface Props { children: ReactNode; }
interface State { failed: boolean; }
export default class AppErrorBoundary extends Component<Props, State> {
 state: State = { failed: false };
 static getDerivedStateFromError() { return { failed: true }; }
 componentDidCatch(error: Error, info: ErrorInfo) { console.error('[UniVoiceMail] Rendering error', error, info); }
 render() { if (this.state.failed) return <div className="flex min-h-screen items-center justify-center bg-background p-8"><div className="max-w-md text-center"><h1 className="mb-3 text-2xl font-bold">Your workspace needs a refresh</h1><p className="mb-5 leading-relaxed text-muted-foreground">Reload the page to try again. If the issue persists, clear this site’s browser data to reset the demo.</p><button className="secondary-button" onClick={() => { localStorage.removeItem('univoice-mails'); localStorage.removeItem('univoice-social'); localStorage.removeItem('univoice-senders'); this.setState({ failed: false }); }}>Reset demo workspace</button></div></div>; return this.props.children; }
}
