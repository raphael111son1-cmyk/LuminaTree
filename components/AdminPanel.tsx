
import React, { useState, useRef } from 'react';
import { UserProfile, LinkItem, ThemeType } from '../types';
import { 
  User, 
  Palette, 
  Layers, 
  Plus, 
  Trash2, 
  Globe,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Plus as PlusIcon,
  Facebook,
  MessageCircle,
  Copy,
  Check
} from '../constants';

interface AdminPanelProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  links: LinkItem[];
  setLinks: React.Dispatch<React.SetStateAction<LinkItem[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ profile, setProfile, links, setLinks }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'links' | 'appearance'>('profile');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: 'New Link',
      url: 'https://',
      icon: 'Globe',
      active: true
    };
    setLinks([...links, newLink]);
  };

  const updateLink = (id: string, updates: Partial<LinkItem>) => {
    setLinks(links.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const copyToClipboard = () => {
    // In a real app, this would be the actual published URL
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const vanityUrl = `luminatree.me/${profile.name.toLowerCase().replace(/\s+/g, '-') || 'username'}`;

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-white/10 w-full md:w-96 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">LuminaTree</h1>
        <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded uppercase tracking-wider">Draft</div>
      </div>

      {/* Share Section - Persistent */}
      <div className="px-6 py-4 bg-white/5 border-b border-white/10">
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Your Public Link</label>
        <div className="flex items-center space-x-2 bg-slate-950/50 border border-white/5 rounded-xl p-1.5 pl-3">
          <span className="text-xs text-slate-400 truncate flex-1 font-mono">{vanityUrl}</span>
          <button 
            onClick={copyToClipboard}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
          >
            {copied ? (
              <><Check size={14} /> <span>Copied!</span></>
            ) : (
              <><Copy size={14} /> <span>Copy</span></>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex-1 p-4 flex items-center justify-center space-x-2 transition-colors ${activeTab === 'profile' ? 'bg-white/5 border-b-2 border-blue-500' : 'hover:bg-white/5'}`}
        >
          <User size={18} />
          <span className="text-sm font-medium">Profile</span>
        </button>
        <button 
          onClick={() => setActiveTab('links')}
          className={`flex-1 p-4 flex items-center justify-center space-x-2 transition-colors ${activeTab === 'links' ? 'bg-white/5 border-b-2 border-blue-500' : 'hover:bg-white/5'}`}
        >
          <Layers size={18} />
          <span className="text-sm font-medium">Links</span>
        </button>
        <button 
          onClick={() => setActiveTab('appearance')}
          className={`flex-1 p-4 flex items-center justify-center space-x-2 transition-colors ${activeTab === 'appearance' ? 'bg-white/5 border-b-2 border-blue-500' : 'hover:bg-white/5'}`}
        >
          <Palette size={18} />
          <span className="text-sm font-medium">Design</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {activeTab === 'profile' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Avatar Upload Section */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-3">Profile Picture</label>
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group bg-slate-800">
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <PlusIcon size={16} className="text-white" />
                  </button>
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-slate-800 border border-white/10 hover:border-blue-500/50 rounded-xl text-xs font-semibold text-slate-300 transition-all"
                >
                  Upload from Gallery
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Display Name</label>
              <input 
                type="text" 
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Profile Bio</label>
              <textarea 
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                rows={4}
                className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'links' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
            <button 
              onClick={addLink}
              className="w-full flex items-center justify-center space-x-2 border-2 border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 text-slate-300 hover:text-blue-400 p-4 rounded-2xl transition-all group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              <span className="font-semibold text-sm">Add New Link</span>
            </button>
            
            <div className="space-y-3">
              {links.map((link) => (
                <div key={link.id} className="bg-slate-800 border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <input 
                      type="text" 
                      value={link.title}
                      onChange={(e) => updateLink(link.id, { title: e.target.value })}
                      className="bg-transparent border-none p-0 text-sm font-bold text-white focus:ring-0 w-full"
                    />
                    <button 
                      onClick={() => removeLink(link.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <input 
                    type="text" 
                    value={link.url}
                    onChange={(e) => updateLink(link.id, { url: e.target.value })}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg p-2 text-xs text-blue-400 outline-none"
                    placeholder="URL (https://...)"
                  />
                  <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                    {['Globe', 'Github', 'Twitter', 'Linkedin', 'Instagram', 'Youtube', 'Mail', 'Facebook', 'Whatsapp'].map(iconName => (
                      <button
                        key={iconName}
                        onClick={() => updateLink(link.id, { icon: iconName })}
                        className={`p-2 rounded-lg transition-all ${link.icon === iconName ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-500 hover:text-slate-300'}`}
                        title={iconName}
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          {iconName === 'Globe' && <Globe size={14} />}
                          {iconName === 'Github' && <Github size={14} />}
                          {iconName === 'Twitter' && <Twitter size={14} />}
                          {iconName === 'Linkedin' && <Linkedin size={14} />}
                          {iconName === 'Instagram' && <Instagram size={14} />}
                          {iconName === 'Youtube' && <Youtube size={14} />}
                          {iconName === 'Mail' && <Mail size={14} />}
                          {iconName === 'Facebook' && <Facebook size={14} />}
                          {iconName === 'Whatsapp' && <MessageCircle size={14} />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Choose Background Theme</label>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(ThemeType) as Array<keyof typeof ThemeType>).map((key) => {
                const themeValue = ThemeType[key];
                return (
                  <button
                    key={themeValue}
                    onClick={() => setProfile(prev => ({ ...prev, theme: themeValue }))}
                    className={`h-24 rounded-2xl border-2 transition-all overflow-hidden relative ${profile.theme === themeValue ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-white/5 opacity-70 hover:opacity-100'}`}
                  >
                    <div className={`w-full h-full bg-gradient-to-br ${themeValue === 'deep-space' ? 'from-slate-900 to-slate-800' : themeValue === 'aurora' ? 'from-emerald-900 to-cyan-900' : themeValue === 'sunset' ? 'from-orange-900 to-purple-900' : 'from-zinc-900 to-black'}`}></div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white">{key.replace('_', ' ')}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-auto p-6 border-t border-white/10">
        <p className="text-[10px] text-slate-500 text-center">Changes are saved locally in your browser session.</p>
      </div>
    </div>
  );
};

export default AdminPanel;
