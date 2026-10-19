import { Mic, Square, X } from 'lucide-react';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
interface VoiceRecorderProps { audio: string | undefined; onChange: (audio: string | undefined) => void; }
export default function VoiceRecorder({ audio, onChange }: VoiceRecorderProps) {
 const { recording, seconds, start, stop } = useVoiceRecorder(onChange);
 return <div className="rounded-lg border bg-muted p-3">{audio ? <div className="flex items-center gap-3"><audio className="h-10 min-w-0 flex-1" controls src={audio}/><button type="button" className="icon-button" onClick={() => onChange(undefined)} aria-label="Remove recording"><X size={17}/></button></div> : <div className="flex items-center justify-between gap-3"><button type="button" className="secondary-button" onClick={recording ? stop : start}>{recording ? <Square size={15} className="fill-primary text-primary"/> : <Mic size={16}/>} {recording ? `Stop · 0:${seconds.toString().padStart(2, '0')}` : 'Add your voice'}</button><p className="text-[11px] text-muted-foreground">{recording ? 'Recording from your microphone' : 'A personal touch · up to 60 seconds'}</p></div>}</div>;
}
