import React from 'react';
import { 
  Sparkles, 
  ExternalLink,
  Mail,
  Shield
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playFuturisticClick, playHoverChime } from '../utils/audioFeedback';

export const Footer = ({ 
  isDark, 
  personalInfo = PERSONAL_INFO,
  onOpenOwnerStudio
}) => {
  const scrollTo = (id) => {
    playFuturisticClick();
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className={`relative border-t transition-colors ${
      isDark 
        ? 'bg-[#06080d] border-slate-800/80 text-slate-400' 
        : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-between pb-12 border-b border-slate-800/60">
          
          {/* Brand & Identity */}
          <div className="md:col-span-6 space-y-3 text-center md:text-left">
            <h3 className={`text-xl sm:text-2xl font-heading font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {personalInfo.name}
            </h3>

            <p className="text-xs sm:text-sm font-display text-cyan-400 font-medium">
              BSIT Student • Video Editor • Graphic Designer • Writer • Aspiring Web Developer
            </p>

            <p className="text-xs text-slate-500 max-w-md font-mono">
              Creative Portfolio & Technology Space • Static Web Edition
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-xs font-mono">
            {['hero', 'about', 'skills', 'projects', 'services', 'experience', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                onMouseEnter={playHoverChime}
                className={`uppercase tracking-wider transition-colors hover:text-cyan-400 cursor-pointer ${
                  isDark ? 'text-slate-400' : 'text-slate-700'
                }`}
              >
                {id === 'hero' ? 'Home' : id}
              </button>
            ))}
          </div>

        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          
          <div className="flex items-center gap-6">
            <a
              href={personalInfo.socials?.facebook || PERSONAL_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverChime}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>Facebook</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={personalInfo.socials?.instagram || PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverChime}
              className="hover:text-pink-400 transition-colors flex items-center gap-1"
            >
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              onMouseEnter={playHoverChime}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>Email</span>
              <Mail className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-center sm:text-right">
              © 2026 {personalInfo.name}. All rights reserved.
            </p>
            {onOpenOwnerStudio && (
              <button
                onClick={onOpenOwnerStudio}
                title="Owner Portal (Admin Access)"
                className="opacity-40 hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-cyan-400 cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Subtle tagline */}
        <div className="pt-4 text-center">
          <p className="text-[11px] font-mono text-slate-500/80 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Built with modern web standards, responsive design, and creative passion.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
