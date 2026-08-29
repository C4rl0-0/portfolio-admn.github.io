import React, { useState } from 'react';
import { 
  Film, 
  Palette, 
  PenTool, 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  Cpu
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { playHoverChime, playFuturisticClick } from '../utils/audioFeedback';

export const Skills = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState('all');

  const getIcon = (name) => {
    switch (name) {
      case 'Film': return <Film className="w-6 h-6" />;
      case 'Palette': return <Palette className="w-6 h-6" />;
      case 'PenTool': return <PenTool className="w-6 h-6" />;
      case 'Code2': return <Code2 className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const filteredCategories = activeTab === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Capability Matrix</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            MY SKILLS
          </h2>

          <p className={`text-base sm:text-lg font-medium font-display tracking-wide ${
            isDark ? 'text-cyan-400' : 'text-blue-600'
          }`}>
            Creativity backed by technology.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => {
              setActiveTab('all');
              playFuturisticClick();
            }}
            onMouseEnter={playHoverChime}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'all'
                ? isDark
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]'
                  : 'bg-blue-600 text-white shadow-md'
                : isDark
                ? 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            ALL CAPABILITIES
          </button>

          {SKILLS_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                playFuturisticClick();
              }}
              onMouseEnter={playHoverChime}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === cat.id
                  ? isDark
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]'
                    : 'bg-blue-600 text-white shadow-md'
                  : isDark
                  ? 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onMouseEnter={playHoverChime}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative group hover:scale-[1.01] ${
                isDark 
                  ? 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/70 shadow-lg' 
                  : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Category Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.accentColor} p-[1.5px] shadow-sm`}>
                    <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                      isDark ? 'bg-[#090b10] text-cyan-400' : 'bg-white text-blue-600'
                    }`}>
                      {getIcon(category.iconName)}
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg sm:text-xl font-heading font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Aspiring / Learning Flag Badge */}
                {category.isAspiring ? (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-violet-500/20 border border-violet-500/40 text-violet-300">
                    LEARNING FOCUS
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    CORE SKILL
                  </span>
                )}
              </div>

              {/* Skills Item Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                      isDark 
                        ? 'bg-slate-950/60 border-slate-800/80 group-hover:border-slate-700/80' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className={`text-xs sm:text-sm font-medium ${
                        isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        {skill.name}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 whitespace-nowrap">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>

              {/* Category Footer Note */}
              <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Total Key Competencies: {category.skills.length}</span>
                <span className="text-cyan-400">PRACTICE × GROWTH</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
