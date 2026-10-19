import { useEffect, useState } from 'react';
import { Play, Pause, Mic, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import type { Mail } from '@/types/mail';
const BARS = [10,16,25,12,30,20,34,14,22,38,26,15,28,40,20,32,14,24,36,18,30,40,24,12,20,32,18,38,28,14,24,36,20,12,28,18,32,24,10,20,32,16,26,12,20];
export default function VoicePlayer({ mail }: { mail: Mail }) {
 const [playing, setPlaying] = useState(false); const [expanded, setExpanded] = useState(false);
 useEffect(() => { setPlaying(false); setExpanded(false); return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }; }, [mail.id]);
 const play = () => {
  if (!('speechSynthesis' in window)) { toast.info('Voice playback is unavailable in this browser. Read the transcript below.'); setExpanded(true); return; }
  if (playing) { window.speechSynthesis.cancel(); setPlaying(false); return; }
  const voice = new SpeechSynthesisUtterance(mail.transcript || mail.body); voice.rate = 0.95;
  voice.onend = () => setPlaying(false); voice.onerror = () => setPlaying(false); window.speechSynthesis.cancel(); window.speechSynthesis.speak(voice); setPlaying(true);
 };
 return <div className="my-5 rounded-xl border border-primary/15 bg-brand-soft/50 p-4"><div className="mb-4 flex items-center justify-between"><span className="flex items-center gap-2 text-xs font-semibold text-primary"><Mic size={14}/>Voice message</span><span className="text-[10px] text-muted-foreground">{mail.audio ? 'Your recording' : 'Demo audio · text-to-speech'}</span></div>{mail.audio ? <audio className="h-11 w-full" src={mail.audio} controls preload="metadata"/> : <div className="flex items-center gap-3"><button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90" aria-label={playing ? 'Stop voice message' : 'Play voice message'} onClick={play}>{playing ? <Pause size={17}/> : <Play size={17} className="ml-0.5"/>}</button><div className="flex h-10 flex-1 items-center justify-between gap-[2px] overflow-hidden" aria-hidden="true">{BARS.map((height, i) => <span key={i} style={{ height }} className="w-[3px] shrink-0 rounded-full bg-primary/50"/>)}</div><span className="text-[10px] font-medium text-primary">{mail.duration}</span></div>}{mail.transcript && <><button onClick={() => setExpanded(!expanded)} aria-expanded={expanded} className="mt-3 flex min-h-11 w-full items-center justify-between border-t border-primary/15 pt-2 text-xs text-muted-foreground">{expanded ? 'Hide transcript' : 'Read transcript'}<ChevronDown size={14} className={expanded ? 'rotate-180' : ''}/></button>{expanded && <p className="pt-2 text-sm leading-relaxed text-muted-foreground">{mail.transcript}</p>}</>}</div>;
}
