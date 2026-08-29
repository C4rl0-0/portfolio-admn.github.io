import React from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Code, 
  Palette, 
  Video, 
  Cpu, 
  Globe,
  CheckCircle,
  Terminal,
  Layers
} from 'lucide-react';
import { CURRENTLY_LEARNING, MILESTONES } from '../data/portfolioData';
import { playHoverChime } from '../utils/audioFeedback';

export const ExperienceEducation = ({ isDark }) => {
  const getLearningIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Code': return <Code className="w-5 h-5 text-blue-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Video': return <Video className="w-5 h-5 text-violet-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-pink-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* SECTION 1: FREELANCE EXPERIENCE & TECHNICAL GROWTH */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Background & Formation</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              EXPERIENCE & MILESTONES
            </h2>

            <p className={`text-base sm:text-lg font-medium font-display tracking-wide ${
              isDark ? 'text-cyan-400' : 'text-blue-600'
            }`}>
              Balancing real-world freelance editing with ongoing technical IT development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* FREELANCE EXPERIENCE */}
            <div
              onMouseEnter={playHoverChime}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative group ${
                isDark 
                  ? 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/40 shadow-lg' 
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                    ACTIVE PRACTICE
                  </span>
                  <h3 className={`text-xl font-heading font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    FREELANCE VIDEO EDITING
                  </h3>
                </div>
              </div>

              {/* Timeline Item */}
              <div className="relative pl-6 border-l-2 border-cyan-500/30 space-y-4">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#090b10] border-2 border-cyan-400" />
                
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    Independent Creative Work
                  </span>
                  
                  <h4 className={`text-lg font-heading font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Freelance Video Editor & Content Creator
                  </h4>

                  <p className={`text-sm mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Providing video editing services for creative and digital content while continuously improving my technical and creative workflow.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Tailored pacing, dynamic cuts, and audio-visual synchronization</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Clear creative communication and milestone-based project turnaround</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Continuous exploration of motion graphics and narrative structure</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TECHNICAL & DIGITAL CAPABILITIES */}
            <div
              onMouseEnter={playHoverChime}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative group ${
                isDark 
                  ? 'bg-slate-900/40 border-slate-800 hover:border-blue-500/40 shadow-lg' 
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest">
                    INFORMATION TECHNOLOGY
                  </span>
                  <h3 className={`text-xl font-heading font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    BSIT STUDY & CODE
                  </h3>
                </div>
              </div>

              {/* Timeline Item */}
              <div className="relative pl-6 border-l-2 border-blue-500/30 space-y-4">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#090b10] border-2 border-blue-400" />
                
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 border border-blue-500/30 text-blue-400">
                    1st Year Degree Journey • 2026
                  </span>
                  
                  <h4 className={`text-lg font-heading font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Bachelor of Science in Information Technology
                  </h4>

                  <p className={`text-sm mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Building strong fundamentals in computing, programming paradigms, computer systems, and aspiring front-end web development practices.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Learning web fundamentals (HTML5, modern CSS, JavaScript interfaces)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Developing programming logic, computational thinking, and software literacy</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Synthesizing IT engineering structure with creative multimedia production</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: LEARNING & GROWTH JOURNEY */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className={`text-2xl font-heading font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CURRENT LEARNING & FOCUS
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Continual expansion of technical and design frontiers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURRENTLY_LEARNING.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={playHoverChime}
                className={`p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                  isDark 
                    ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/30' 
                    : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    {getLearningIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    {item.progress}
                  </span>
                </div>

                <h4 className={`text-base font-heading font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.name}
                </h4>

                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: MILESTONE ROADMAP */}
        <div className="pt-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className={`text-2xl font-heading font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CAREER & SKILL ROADMAP
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Key phases along the creative and technology path
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MILESTONES.map((m, idx) => (
              <div
                key={idx}
                onMouseEnter={playHoverChime}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative ${
                  isDark 
                    ? 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/40' 
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      PHASE 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      {m.year}
                    </span>
                  </div>

                  <div>
                    <h4 className={`text-base font-heading font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {m.title}
                    </h4>
                    <p className="text-xs text-cyan-400 font-mono mt-0.5">
                      {m.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/50">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    {m.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
