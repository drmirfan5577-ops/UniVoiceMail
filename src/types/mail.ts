export type Folder = 'inbox' | 'sent' | 'drafts' | 'archive' | 'trash';
export interface Mail { id: string; sender: string; email: string; initials: string; to?: string; subject: string; preview: string; body: string; time: string; date: string; unread: boolean; starred: boolean; folder: Folder; kind: 'email' | 'voice'; category: 'Work' | 'Personal' | 'Updates'; priority?: boolean; duration?: string; transcript?: string; summary: string; attachment?: string; audio?: string; }
export interface SocialConnection { id: string; platform: string; url: string; }
export interface ComposeValues { to: string; subject: string; body: string; }
