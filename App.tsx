
import React, { useState, useEffect } from 'react';
import { UserProfile, LinkItem, ThemeType } from './types';
import { INITIAL_LINKS, INITIAL_PROFILE, THEMES, Github, Instagram, Twitter, Mail } from './constants';
import LinkCard from './components/LinkCard';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [links, setLinks] = useState<LinkItem[]>(INITIAL_LINKS);
  const [isPreview, setIsPreview] = useState(false);

  // Sync state with some visual transitions
  useEffect(() => {
    // We could persist to localStorage here if desired
  }, [profile, links]);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-slate-950 font-sans">
      
      {/* Admin Panel (Mobile-First Hidden in Preview Mode) */}
      {!isPreview && (
        <AdminPanel 
          profile={profile} 
          setProfile={setProfile} 
          links={links} 
          setLinks={setLinks} 
        />
      )}

      {/* Main Preview Area */}
      <div className={`flex-1 relative overflow-y-auto bg-gradient-to-b ${THEMES[profile.theme as keyof typeof THEMES] || THEMES['deep-space']} transition-all duration-700 ease-in-out`}>
        
        {/* Mobile Preview Header */}
        <div className="sticky top-0 z-50 p-4 flex justify-between items-center md:px-8">
          <div className="flex items-center space-x-2">
             <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
               <span className="text-sm font-bold text-white">L</span>
             </div>
             <span className="text-xs font-semibold text-white/50 hidden md:block">LuminaTree Live Preview</span>
          </div>
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className="px-4 py-2 glass rounded-full text-xs font-bold hover:bg-white/10 transition-all border border-white/10 text-white"
          >
            {isPreview ? 'Back to Editor' : 'Toggle Preview Mode'}
          </button>
        </div>

        {/* Public Landing Page View */}
        <div className="max-w-xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center">
          
          {/* Profile Section */}
          <div className="text-center mb-10 group">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="relative w-32 h-32 rounded-full border-4 border-slate-900 object-cover shadow-2xl"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">{profile.name}</h2>
            <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed font-light">
              {profile.bio}
            </p>
          </div>

          {/* Links List */}
          <div className="w-full space-y-4">
            {links.filter(l => l.active).map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>

          {/* Social Icons Footer */}
          <div className="mt-16 pb-12 flex items-center justify-center space-x-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={22} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={22} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Github size={22} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Mail size={22} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
