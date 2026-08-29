import React from 'react';
import { 
  Film, 
  Layout, 
  PenTool, 
  Code, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';
import { playHoverChime, playFuturisticClick } from '../utils/audioFeedback';

export const Services = ({ isDark, onContactClick }) => {
  const getIcon = (icon) => {
    switch (icon) {
      case 'Film': return <Film className="w-6 h-6" />;
      case 'Layout': return <Layout className="w-6 h-6" />;
      case 'PenTool': return <PenTool className="w-6 h-6" />;
      case 'Code': return <Code className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Creative Solutions</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            WHAT I CAN DO
          </h2>

          <p className={`text-base sm:text-lg font-medium font-display tracking-wide ${
            isDark ? 'text-cyan-400' : 'text-blue-600'
          }`}>
            Creative services combining narrative storytelling, visual precision, and digital craft.
          </p>
        </div>

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onMouseEnter={playHoverChime}
              className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between transition-all duration-300 relative group hover:scale-[1.02] ${
                isDark 
                  ? 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/70 shadow-lg' 
                  : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-4">
                {/* Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    service.isLearning
                      ? isDark 
                        ? 'bg-violet-500/15 border border-violet-500/30 text-violet-400' 
                        : 'bg-violet-50 border border-violet-200 text-violet-600'
                      : isDark
                      ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400'
                      : 'bg-blue-50 border border-blue-200 text-blue-600'
                  }`}>
                    {getIcon(service.icon)}
                  </div>

                  {service.isLearning ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-violet-500/20 border border-violet-500/40 text-violet-300">
                      CURRENTLY LEARNING
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      AVAILABLE
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className={`text-lg font-heading font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {service.title}
                  </h3>

                  <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {service.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-3 border-t border-slate-800/60 space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    KEY FOCUS
                  </p>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                        service.isLearning ? 'text-violet-400' : 'text-cyan-400'
                      }`} />
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger in Card */}
              <div className="pt-6 mt-4 border-t border-slate-800/40">
                <button
                  onClick={() => {
                    playFuturisticClick();
                    onContactClick();
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isDark
                      ? 'bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 hover:bg-slate-900'
                      : 'bg-slate-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  }`}
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
