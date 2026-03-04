
import React from 'react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Globe, 
  Mail, 
  Layers,
  Sparkles,
  Link as LinkIcon,
  Palette,
  User,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Zap,
  Facebook,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import { LinkItem, UserProfile } from './types';

export const INITIAL_LINKS: LinkItem[] = [
  { id: '1', title: 'Portfolio Website', url: 'https://example.com', icon: 'Globe', active: true },
  { id: '2', title: 'My GitHub Profile', url: 'https://github.com', icon: 'Github', active: true },
  { id: '3', title: 'Connect on LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', active: true },
  { id: '4', title: 'Follow on Twitter', url: 'https://twitter.com', icon: 'Twitter', active: true },
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Alex Rivera',
  bio: 'Full-stack developer & UI designer crafting digital experiences with purpose.',
  avatarUrl: 'https://picsum.photos/id/64/200/200',
  theme: 'deep-space'
};

export const ICON_MAP: Record<string, React.ReactNode> = {
  Github: <Github size={20} />,
  Twitter: <Twitter size={20} />,
  Linkedin: <Linkedin size={20} />,
  Instagram: <Instagram size={20} />,
  Youtube: <Youtube size={20} />,
  Globe: <Globe size={20} />,
  Mail: <Mail size={20} />,
  Layers: <Layers size={20} />,
  LinkIcon: <LinkIcon size={20} />,
  Facebook: <Facebook size={20} />,
  Whatsapp: <MessageCircle size={20} />,
};

export const THEMES = {
  'deep-space': 'from-slate-900 via-slate-800 to-slate-900',
  'aurora': 'from-emerald-900 via-teal-950 to-cyan-900',
  'sunset': 'from-orange-900 via-red-950 to-purple-900',
  'minimal': 'from-zinc-900 via-stone-900 to-black'
};

export { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Globe, 
  Mail, 
  Layers, 
  Sparkles, 
  LinkIcon, 
  Palette, 
  User, 
  Plus, 
  Trash2, 
  ExternalLink, 
  ChevronRight,
  Zap,
  Facebook,
  MessageCircle,
  Copy,
  Check
};
