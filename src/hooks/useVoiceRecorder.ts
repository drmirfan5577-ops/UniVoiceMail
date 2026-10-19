import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
export function useVoiceRecorder(onRecorded: (data: string) => void) {
 const [recording, setRecording] = useState(false); const [seconds, setSeconds] = useState(0);
 const recorder = useRef<MediaRecorder | null>(null); const stream = useRef<MediaStream | null>(null); const chunks = useRef<Blob[]>([]);
 const stop = () => { if (recorder.current?.state === 'recording') recorder.current.stop(); stream.current?.getTracks().forEach(track => track.stop()); setRecording(false); };
 useEffect(() => { if (!recording) return; const timer = setInterval(() => setSeconds(s => s + 1), 1000); return () => clearInterval(timer); }, [recording]);
 useEffect(() => { if (seconds >= 60) stop(); }, [seconds]);
 useEffect(() => () => { if (recorder.current) recorder.current.onstop = null; stream.current?.getTracks().forEach(t => t.stop()); }, []);
 const start = async () => {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { toast.error('Voice recording needs a supported browser and a secure HTTPS connection.'); return; }
  try { const media = await navigator.mediaDevices.getUserMedia({ audio: true }); stream.current = media; const rec = new MediaRecorder(media); recorder.current = rec; chunks.current = [];
   rec.ondataavailable = event => { if (event.data.size) chunks.current.push(event.data); };
   rec.onstop = () => { const blob = new Blob(chunks.current, { type: rec.mimeType }); if (blob.size > 1024 * 1024) { toast.error('Recording is too large. Try a shorter voice message.'); return; } const reader = new FileReader(); reader.onload = () => { onRecorded(String(reader.result)); toast.success('Voice recording attached'); }; reader.readAsDataURL(blob); };
   rec.start(); setSeconds(0); setRecording(true);
  } catch { toast.error('Microphone access was not granted. Allow microphone access in your browser settings.'); }
 };
 return { recording, seconds, start, stop };
}
