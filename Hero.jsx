import React from 'react';
import { 
  ArrowUpRight, 
  User, 
  Edit3
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playFuturisticClick, playHoverChime } from '../utils/audioFeedback';

export const Hero = ({ 
  isDark, 
  personalInfo = PERSONAL_INFO,
  isOwnerAuthenticated,
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
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-20 xl:pt-36 xl:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Background Soft Radial Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (No forced overlapping line breaks) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-5 lg:space-y-6">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all duration-300 backdrop-blur-md shadow-sm bg-cyan-500/10 border-cyan-500/30 text-cyan-400 max-w-full">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px] truncate">
                Available for Freelance Video Editing & Creative Work
              </span>
            </div>

            {/* Main Greeting & Name with spacious line-height */}
            <div className="space-y-2 sm:space-y-3">
              <p className={`font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold transition-colors ${
                isDark ? 'text-cyan-400' : 'text-blue-600'
              }`}>
                HELLO, I'M
              </p>
              
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-heading font-black tracking-tight leading-tight sm:leading-tight lg:leading-[1.12] transition-colors break-words ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <span>{personalInfo.name.split(' ').slice(0, 2).join(' ')} </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-400">
                  {personalInfo.name.split(' ').slice(2).join(' ') || 'ABLING'}
                </span>
              </h1>
            </div>

            {/* Professional Identity Subtitle */}
            <p className={`text-sm sm:text-base lg:text-base xl:text-lg font-medium tracking-wide leading-relaxed font-display ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <span className="text-cyan-400 font-semibold">BSIT Student</span> • Freelance Video Editor • Graphic Designer • Writer • <span className="text-violet-400 font-semibold">Aspiring Web Developer</span>
            </p>

            {/* Engaging Quote / Intro */}
            <div className={`p-4 rounded-xl border relative max-w-2xl mx-auto lg:mx-0 ${
              isDark 
                ? 'bg-slate-900/40 border-slate-800 text-slate-300' 
                : 'bg-white/80 border-slate-200 text-slate-600 shadow-sm'
            }`}>
              <p className="text-xs sm:text-sm md:text-base italic leading-relaxed">
                "{personalInfo.quote}"
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              {/* VIEW MY WORK */}
              <button
                id="hero-btn-view-work"
                onClick={() => scrollTo('projects')}
                onMouseEnter={playHoverChime}
                className="px-6 py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white shadow-[0_0_25px_rgba(0,102,255,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <span>VIEW MY WORK</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* ABOUT ME */}
              <button
                id="hero-btn-about-me"
                onClick={() => scrollTo('about')}
                onMouseEnter={playHoverChime}
                className={`px-6 py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase tracking-wider border transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 shadow-[0_0_15px_rgba(0,0,0,0.3)]'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-blue-400 hover:text-blue-600 shadow-sm'
                }`}
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span>ABOUT ME</span>
              </button>

              {/* Quick Edit Studio Trigger */}
              {onOpenOwnerStudio && (
                <button
                  id="hero-btn-owner-edit"
                  onClick={onOpenOwnerStudio}
                  title="Owner Studio Live Editor"
                  className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isOwnerAuthenticated
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                      : isDark
                      ? 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Circular Cybernetic Profile Avatar with Rotating Rings */}
          <div className="lg:col-span-5 flex justify-center items-center py-6 lg:py-0">
            <div className="relative flex items-center justify-center">
              
              {/* Outer Cyber Glow Ambient Light */}
              <div className="absolute w-72 h-72 sm:w-88 sm:h-88 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-600 opacity-40 blur-2xl animate-pulse pointer-events-none" />

              {/* Orbital Ring 1: Smooth Slow Clockwise Rotating Dashed Tech Ring */}
              <div className="absolute w-72 h-72 sm:w-84 sm:h-84 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full border-2 border-dashed border-cyan-500/40 animate-[spin_30s_linear_infinite] pointer-events-none">
                {/* Orbital Tech Nodes */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa]" />
                <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
              </div>

              {/* Orbital Ring 2: Counter-Rotating Fine Ring */}
              <div className="absolute w-64 h-64 sm:w-76 sm:h-76 lg:w-72 lg:h-72 xl:w-88 xl:h-88 rounded-full border border-violet-500/30 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />

              {/* Center Circular Profile Avatar Container */}
              <div className="relative group p-2">
                <div className={`relative w-56 h-56 sm:w-68 sm:h-68 lg:w-64 lg:h-64 xl:w-80 xl:h-80 rounded-full overflow-hidden border-4 transition-all duration-500 shadow-2xl ${
                  isDark
                    ? 'border-cyan-400/80 shadow-[0_0_40px_rgba(6,182,212,0.4)] bg-slate-950'
                    : 'border-blue-500/80 shadow-[0_0_30px_rgba(37,99,235,0.3)] bg-white'
                }`}>
                  <img
                    src={personalInfo.portrait || PERSONAL_INFO.portrait}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Tech Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
