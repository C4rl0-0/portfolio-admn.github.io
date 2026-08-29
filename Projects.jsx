import React, { useState } from 'react';
import { 
  FolderGit2, 
  ArrowUpRight, 
  Plus, 
  Sparkles, 
  Film, 
  Lock,
  Unlock,
  Trash2,
  FolderPlus
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { playFuturisticClick, playHoverChime } from '../utils/audioFeedback';

const CATEGORIES = [
  { id: 'all', label: 'ALL' },
  { id: 'video', label: 'VIDEO' },
  { id: 'design', label: 'DESIGN' },
  { id: 'writing', label: 'WRITING' },
  { id: 'web', label: 'WEB' }
];

export const Projects = ({ 
  isDark, 
  projects = PROJECTS_DATA,
  onSelectProject,
  isOwnerAuthenticated,
  onOpenAddProject,
  onDeleteProject
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleFilterClick = (catId) => {
    playFuturisticClick();
    setActiveFilter(catId);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Curated Portfolio</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            SELECTED WORK
          </h2>

          <p className={`text-base sm:text-lg font-medium font-display tracking-wide ${
            isDark ? 'text-cyan-400' : 'text-blue-600'
          }`}>
            A collection of creative and technology-focused work.
          </p>

          {/* Owner Project Management Quick Actions */}
          {isOwnerAuthenticated && <div className="pt-2 flex items-center justify-center gap-3">
            <button
              id="btn-owner-add-project"
              onClick={() => {
                playFuturisticClick();
                onOpenAddProject();
              }}
              onMouseEnter={playHoverChime}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold tracking-wider flex items-center gap-2 transition-all duration-300 border cursor-pointer ${
                isOwnerAuthenticated
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300'
              }`}
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>+ Add / Upload Project</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-black/40 border border-white/10 text-slate-300">
                {isOwnerAuthenticated ? 'Owner' : 'Owner Only'}
              </span>
            </button>
          </div>}
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-btn-${cat.id}`}
                onClick={() => handleFilterClick(cat.id)}
                onMouseEnter={playHoverChime}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(0,102,255,0.4)] scale-105'
                      : 'bg-blue-600 text-white shadow-md scale-105'
                    : isDark
                    ? 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Standard Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                playFuturisticClick();
                onSelectProject(project);
              }}
              onMouseEnter={playHoverChime}
              className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:scale-[1.02] cursor-pointer relative ${
                isDark 
                  ? 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/70 shadow-lg' 
                  : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Project Image Box */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 filter brightness-[0.95]"
                  />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/10 text-cyan-300">
                    {project.categoryLabel}
                  </span>

                  {/* Project Type Badge */}
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-blue-600/85 text-white backdrop-blur-sm">
                    {project.typeLabel}
                  </span>

                  {/* Owner Delete Custom Project Option */}
                  {isOwnerAuthenticated && project.isCustom && onDeleteProject && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playFuturisticClick();
                        if (window.confirm(`Delete custom project "${project.title}"?`)) {
                          onDeleteProject(project.id);
                        }
                      }}
                      title="Delete Custom Project (Owner)"
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white backdrop-blur-md transition-all shadow-md cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-lg font-heading font-bold tracking-tight group-hover:text-cyan-400 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>

                  <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Tool tags & status */}
              <div className="p-6 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/40">
                  {project.tools.slice(0, 3).map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isDark 
                          ? 'bg-slate-950 text-slate-400 border border-slate-800' 
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="text-[10px] font-mono text-slate-400 px-1 py-0.5">
                      +{project.tools.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-400">
                  <span className="text-cyan-400">{project.status}</span>
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
