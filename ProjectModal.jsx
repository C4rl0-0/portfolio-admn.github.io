import React, { useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Wrench, 
  ExternalLink,
  Film,
  Code2,
  PenTool,
  Palette
} from 'lucide-react';
import { playFuturisticClick } from '../utils/audioFeedback';

export const ProjectModal = ({
  project,
  onClose,
  isDark,
  onOpenContact
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'video': return <Film className="w-4 h-4 text-cyan-400" />;
      case 'web': return <Code2 className="w-4 h-4 text-blue-400" />;
      case 'writing': return <PenTool className="w-4 h-4 text-violet-400" />;
      case 'design': return <Palette className="w-4 h-4 text-teal-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => {
          playFuturisticClick();
          onClose();
        }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-3xl rounded-2xl border overflow-hidden shadow-2xl z-10 my-8 animate-in zoom-in-95 duration-200 ${
          isDark 
            ? 'bg-[#090b10] border-cyan-500/30 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header Bar */}
        <div className={`p-4 sm:p-6 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-100 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              {getCategoryIcon(project.category)}
            </span>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                {project.typeLabel}
              </span>
              <h3 className="text-base sm:text-xl font-heading font-bold">
                {project.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playFuturisticClick();
              onClose();
            }}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isDark 
                ? 'border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white' 
                : 'border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Image Showcase */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-400">
              {project.status}
            </div>
          </div>

          {/* Full Narrative Overview */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              PROJECT OVERVIEW & SCOPE
            </h4>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {project.fullDetails || project.description}
            </p>
          </div>

          {/* Key Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                KEY HIGHLIGHTS & EXECUTION
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Workflow */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
              <span>TOOLS & TECHNOLOGIES USED</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-lg text-xs font-mono border ${
                    isDark
                      ? 'bg-slate-900 border-cyan-500/30 text-cyan-300'
                      : 'bg-slate-100 border-slate-300 text-slate-800'
                  }`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`p-4 sm:p-6 border-t flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'
        }`}>
          <button
            onClick={() => {
              playFuturisticClick();
              onClose();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider border cursor-pointer ${
              isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Close Details
          </button>

          <button
            onClick={() => {
              playFuturisticClick();
              onClose();
              onOpenContact();
            }}
            className="px-6 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Inquire About Similar Work</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
