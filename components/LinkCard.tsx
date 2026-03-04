
import React from 'react';
import { LinkItem } from '../types';
import { ICON_MAP, ChevronRight } from '../constants';

interface LinkCardProps {
  link: LinkItem;
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  if (!link.active) return null;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-between p-4 glass-card rounded-2xl mb-4 group animate-fade-in"
    >
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
          {link.icon && ICON_MAP[link.icon] ? ICON_MAP[link.icon] : ICON_MAP['LinkIcon']}
        </div>
        <span className="font-medium text-white/90 group-hover:text-white">{link.title}</span>
      </div>
      <ChevronRight size={18} className="text-white/30 group-hover:text-white/60 transition-colors" />
    </a>
  );
};

export default LinkCard;
