import React from 'react';
import { 
  Sparkles, 
  Compass,
  Film,
  PenTool,
  Code2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playHoverChime } from '../utils/audioFeedback';

export const About = ({ isDark, personalInfo = PERSONAL_INFO }) => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle Section Divider Glow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-blue-500/10 border border-blue-500/30 text-cyan-400">
            <Compass className="w-3.5 h-3.5" />
            <span>Profile & Direction</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            ABOUT ME
          </h2>

          <p className={`text-base sm:text-lg font-medium font-display tracking-wide ${
            isDark ? 'text-cyan-400' : 'text-blue-600'
          }`}>
            Creative Mind. Technology Student. Future Developer.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Narrative Bio & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
              isDark 
                ? 'bg-slate-900/50 border-slate-800 text-slate-300 shadow-xl' 
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <div className="space-y-5 text-sm sm:text-base leading-relaxed">
                <p>
                  I am <strong className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>{personalInfo.name}</strong>, a first-year Bachelor of Science in Information Technology student. I am passionate about combining creativity and technology to create meaningful digital experiences.
                </p>

                <p>
                  My interests include video editing, graphic design, writing, and web development. I currently work as a freelance video editor while continuously developing my skills in information technology.
                </p>

                <p>
                  As I continue my journey in BSIT, I aim to expand my technical knowledge while maintaining my creative identity. My goal is to become someone who can bridge design, storytelling, and technology.
                </p>
              </div>

              {/* Guiding Creative Principle */}
              <div className={`mt-8 pt-6 border-t flex items-center gap-4 ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-cyan-400">Core Identity</p>
                  <p className={`text-sm font-heading font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Technology × Creativity × Personality
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Key Structured Information Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* FREELANCE VIDEO EDITING */}
            <div
              onMouseEnter={playHoverChime}
              className={`p-5 rounded-xl border transition-all duration-300 hover:border-cyan-500/40 ${
                isDark 
                  ? 'bg-slate-900/40 border-slate-800/80' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                    CREATIVE PRACTICE
                  </p>
                  <h4 className={`text-sm sm:text-base font-heading font-bold mt-0.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Freelance Video Editor
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Crafting compelling stories with precise cut timing, music sync & color
                  </p>
                </div>
              </div>
            </div>

            {/* GRAPHIC DESIGN & WRITING */}
            <div
              onMouseEnter={playHoverChime}
              className={`p-5 rounded-xl border transition-all duration-300 hover:border-violet-500/40 ${
                isDark 
                  ? 'bg-slate-900/40 border-slate-800/80' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-400 flex items-center justify-center shrink-0">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
                    DESIGN & STORYTELLING
                  </p>
                  <h4 className={`text-sm sm:text-base font-heading font-bold mt-0.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Graphic Design & Writing
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Developing creative concepts, branding layouts, scripts & narratives
                  </p>
                </div>
              </div>
            </div>

            {/* ASPIRING WEB DEVELOPER */}
            <div
              onMouseEnter={playHoverChime}
              className={`p-5 rounded-xl border transition-all duration-300 hover:border-sky-500/40 ${
                isDark 
                  ? 'bg-slate-900/40 border-slate-800/80' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
                    FUTURE TARGET
                  </p>
                  <h4 className={`text-sm sm:text-base font-heading font-bold mt-0.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Aspiring Web Developer
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Learning HTML, CSS, JavaScript, and modern web application interfaces
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
