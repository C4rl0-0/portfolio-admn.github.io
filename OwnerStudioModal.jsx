import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  Save, 
  RotateCcw, 
  Download, 
  Check, 
  ShieldCheck, 
  User, 
  Share2, 
  Sparkles,
  KeyRound,
  LogOut,
  AlertCircle,
  Copy,
  FolderPlus,
  Trash2,
  ExternalLink,
  Plus
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  PROJECTS_DATA,
  STORAGE_KEYS
} from '../data/portfolioData';
import { playFuturisticClick, playHoverChime } from '../utils/audioFeedback';

export const OwnerStudioModal = ({
  isOpen,
  onClose,
  isDark,
  isOwnerAuthenticated,
  onAuthenticatedChange,
  personalInfo,
  onUpdatePersonalInfo,
  projects = PROJECTS_DATA,
  onOpenAddProject,
  onDeleteProject,
  onResetProjects
}) => {
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  
  const [formData, setFormData] = useState(personalInfo);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(personalInfo);
      setPasscodeInput('');
      setPasscodeError('');
      setSavedSuccess(false);
    }
  }, [isOpen, personalInfo]);

  if (!isOpen) return null;

  const handlePasscodeLogin = async (e) => {
    e.preventDefault();
    playFuturisticClick();
    setPasscodeError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password: passcodeInput })
      });
      if (!response.ok) throw new Error('Invalid credentials');
      onAuthenticatedChange(true);
      setPasscodeInput('');
    } catch (err) {
      setPasscodeError('Incorrect owner password.');
    }
  };

  const handleLogout = async () => {
    playFuturisticClick();
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } finally {
      onAuthenticatedChange(false);
    }
  };

  const handleSaveProfile = () => {
    playFuturisticClick();
    onUpdatePersonalInfo(formData);
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(formData));
    } catch (err) {
      console.error(err);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetDefaults = () => {
    playFuturisticClick();
    if (window.confirm('Reset all custom profile and project changes back to factory defaults?')) {
      setFormData(PERSONAL_INFO);
      onUpdatePersonalInfo(PERSONAL_INFO);
      if (onResetProjects) onResetProjects();
      try {
        localStorage.removeItem(STORAGE_KEYS.PROFILE);
      } catch (err) {
        console.error(err);
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };


  const handleDownloadJSON = () => {
    playFuturisticClick();
    const exportData = {
      profile: formData,
      projects: projects,
      exportedAt: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyJSON = () => {
    playFuturisticClick();
    const exportData = {
      profile: formData,
      projects: projects
    };
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => {
          if (isOwnerAuthenticated) onClose();
        }}
        className="fixed inset-0 bg-black/85 backdrop-blur-md animate-in fade-in"
      />

      {/* Modal Card */}
      <div className={`relative w-full max-w-4xl rounded-2xl border overflow-hidden shadow-2xl z-10 my-6 animate-in zoom-in-95 duration-200 ${
        isDark 
          ? 'bg-[#0a0d14] border-cyan-500/40 text-slate-100 shadow-[0_0_50px_rgba(6,182,212,0.15)]' 
          : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
      }`}>
        
        {/* Header Bar */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base sm:text-lg">
                  Owner Studio
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  Owner Exclusive
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Add projects, manage portfolio work, and configure profile
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isOwnerAuthenticated && (
              <button
                onClick={handleLogout}
                title="Lock / Logout"
                className="p-2 rounded-lg border border-slate-700 hover:border-red-400/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors text-xs flex items-center gap-1.5 cursor-pointer font-mono"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock</span>
              </button>
            )}
            {isOwnerAuthenticated && <button
              onClick={onClose}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isDark 
                  ? 'border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white' 
                  : 'border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>}
          </div>
        </div>

        {/* Modal Content */}
        {!isOwnerAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-heading font-bold">Owner Access Required</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Enter your security passcode to add or upload projects and manage portfolio details.
              </p>
            </div>

            <form onSubmit={handlePasscodeLogin} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Owner Password</span>
                  <span className="text-[10px] text-cyan-400">Server protected</span>
                </label>
                <input
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Enter passcode..."
                  autoFocus
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                {passcodeError && (
                  <p className="text-xs text-red-400 font-mono flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{passcodeError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Owner Studio</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div>
            {/* Tabs Bar */}
            <div className={`flex border-b px-6 pt-3 gap-2 overflow-x-auto ${
              isDark ? 'border-slate-800 bg-slate-950/30' : 'border-slate-100 bg-slate-50/50'
            }`}>
              {[
                { id: 'projects', label: 'Manage Projects', icon: FolderPlus },
                { id: 'profile', label: 'Profile & Bio', icon: User },
                { id: 'socials', label: 'Links & Socials', icon: Share2 },
                { id: 'security', label: 'Passcode & Access', icon: KeyRound },
                { id: 'export', label: 'Export & Backup', icon: Download }
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playFuturisticClick();
                      setActiveTab(tab.id);
                    }}
                    onMouseEnter={playHoverChime}
                    className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-semibold tracking-wider flex items-center gap-2 transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panels */}
            <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
              
              {/* TAB: MANAGE PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Top Action Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border bg-cyan-500/5 border-cyan-500/30">
                    <div className="space-y-1">
                      <h4 className="font-heading font-bold text-sm text-cyan-400 flex items-center gap-2">
                        <FolderPlus className="w-4 h-4" />
                        <span>Project Upload & Management</span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Upload custom project showcases, thumbnails, descriptions, and media links.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        playFuturisticClick();
                        if (onOpenAddProject) onOpenAddProject();
                      }}
                      className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add New Project</span>
                    </button>
                  </div>

                  {/* Projects List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
                        Active Portfolio Projects ({projects.length})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-16 h-12 rounded-lg overflow-hidden border border-slate-800 shrink-0 bg-slate-950">
                              <img
                                src={proj.image}
                                alt={proj.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h5 className="text-sm font-heading font-bold text-slate-200">
                                  {proj.title}
                                </h5>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                                  {proj.categoryLabel || proj.category}
                                </span>
                                {proj.isCustom && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                                    Custom Upload
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-1">
                                {proj.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            {proj.isCustom && onDeleteProject && (
                              <button
                                onClick={() => {
                                  playFuturisticClick();
                                  if (window.confirm(`Delete project "${proj.title}"?`)) {
                                    onDeleteProject(proj.id);
                                  }
                                }}
                                title="Delete Project"
                                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: PROFILE & BIO */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  {/* Default Portrait Info Notice */}
                  <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-500/60 bg-slate-950 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      <img
                        src={PERSONAL_INFO.portrait}
                        alt="Portrait"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                          Default Profile Portrait
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Fixed Default
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Portrait photo is locked to your clean high-resolution studio photo.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-400">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                          isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-400">Short Name / First Name</label>
                      <input
                        type="text"
                        value={formData.shortName || ''}
                        onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                          isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400">Role Subtitle & Specialization</label>
                    <input
                      type="text"
                      value={formData.workRole || ''}
                      onChange={(e) => setFormData({ ...formData, workRole: e.target.value })}
                      placeholder="e.g. Freelance Video Editor & Independent Creative"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400">Featured Quote / Elevator Pitch</label>
                    <textarea
                      rows={3}
                      value={formData.quote}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 resize-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400">Primary Contact Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* TAB: SOCIALS */}
              {activeTab === 'socials' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400">Facebook URL</label>
                    <input
                      type="url"
                      value={formData.socials?.facebook || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        socials: { ...formData.socials, facebook: e.target.value }
                      })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400">Instagram URL</label>
                    <input
                      type="url"
                      value={formData.socials?.instagram || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        socials: { ...formData.socials, instagram: e.target.value }
                      })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* TAB: SECURITY */}
              {activeTab === 'security' && (
                <div className="space-y-4 max-w-md">
                  <h4 className="text-sm font-heading font-bold">Server-Side Security</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Your owner password is stored on the server as an environment secret. It is not embedded in this website's JavaScript and cannot be changed from the public browser.
                  </p>
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-300">
                    <ShieldCheck className="w-4 h-4 inline mr-2" />
                    Frontend source does not contain the owner password.
                  </div>
                </div>
              )}

              {/* TAB: EXPORT / BACKUP */}
              {activeTab === 'export' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-heading font-bold">Backup & Sync Configuration</h4>
                    <p className="text-xs text-slate-400">
                      Download your customized portfolio profile and projects as JSON to keep a backup or sync across devices.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleDownloadJSON}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Full Backup (Profile + Projects)</span>
                    </button>

                    <button
                      onClick={handleCopyJSON}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono border border-slate-700 hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {copiedJSON ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedJSON ? 'Copied to Clipboard!' : 'Copy Raw JSON'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions Bar */}
            <div className={`px-6 py-4 border-t flex flex-wrap items-center justify-between gap-3 ${
              isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'
            }`}>
              <button
                onClick={handleResetDefaults}
                className="text-xs font-mono text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Factory Defaults</span>
              </button>

              <div className="flex items-center gap-3">
                {savedSuccess && (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 animate-in fade-in">
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved to Live Preview!</span>
                  </span>
                )}

                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

