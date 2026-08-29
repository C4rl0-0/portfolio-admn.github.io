import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  FolderPlus, 
  Film, 
  Palette, 
  PenTool, 
  Code2, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { playFuturisticClick, playHoverChime } from '../utils/audioFeedback';

const CATEGORY_OPTIONS = [
  { id: 'video', label: 'VIDEO EDITING', defaultType: 'Video Showreel / Commercial' },
  { id: 'design', label: 'GRAPHIC DESIGN', defaultType: 'Visual Identity & Branding' },
  { id: 'writing', label: 'CREATIVE WRITING', defaultType: 'Scriptwriting & Story' },
  { id: 'web', label: 'WEB DEVELOPMENT', defaultType: 'Web UI / Frontend Prototype' }
];

export const AddProjectModal = ({
  isOpen,
  onClose,
  isDark,
  onSaveProject
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('video');
  const [typeLabel, setTypeLabel] = useState('Video Showreel / Commercial');
  const [description, setDescription] = useState('');
  const [fullDetails, setFullDetails] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [toolsInput, setToolsInput] = useState('Adobe Premiere Pro, After Effects, DaVinci Resolve');
  const [highlightsInput, setHighlightsInput] = useState('');
  const [status, setStatus] = useState('Featured Work');
  const [liveUrl, setLiveUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCategoryChange = (catId) => {
    setCategory(catId);
    const opt = CATEGORY_OPTIONS.find(c => c.id === catId);
    if (opt) setTypeLabel(opt.defaultType);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('File size too large. Please select an image under 5MB.');
      return;
    }
    setError('');
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt.target?.result) return;
      const source = new Image();
      source.onload = () => {
        const maxSide = 1200;
        const scale = Math.min(1, maxSide / Math.max(source.width, source.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(source.width * scale));
        canvas.height = Math.max(1, Math.round(source.height * scale));
        const ctx = canvas.getContext('2d');
        ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
        const optimized = canvas.toDataURL('image/webp', 0.72);
        setImage(optimized);
        setImagePreview(optimized);
      };
      source.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playFuturisticClick();

    if (!title.trim()) {
      setError('Please provide a project title.');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a brief project summary description.');
      return;
    }

    const tools = toolsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const highlights = highlightsInput
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);

    const newProject = {
      id: `custom-project-${Date.now()}`,
      title: title.trim(),
      category: category,
      categoryLabel: CATEGORY_OPTIONS.find(c => c.id === category)?.label || 'PROJECT',
      typeLabel: typeLabel.trim() || 'Showcase Project',
      status: status.trim() || 'Completed Project',
      description: description.trim(),
      fullDetails: fullDetails.trim() || description.trim(),
      image: imagePreview || image || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      tools: tools.length > 0 ? tools : ['Creative Suite', 'Digital Media'],
      highlights: highlights.length > 0 ? highlights : ['Custom creative workflow', 'High-fidelity deliverables', 'Precision execution'],
      liveUrl: liveUrl.trim() || undefined,
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    onSaveProject(newProject);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setFullDetails('');
      setImage('');
      setImagePreview('');
      setHighlightsInput('');
      setLiveUrl('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md animate-in fade-in"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-2xl rounded-2xl border overflow-hidden shadow-2xl z-10 my-6 animate-in zoom-in-95 duration-200 ${
          isDark
            ? 'bg-[#0a0d14] border-cyan-500/40 text-slate-100 shadow-[0_0_50px_rgba(6,182,212,0.15)]'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}
      >
        {/* Header Bar */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base sm:text-lg">
                  Add New Project
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Owner Exclusive
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Upload and publish a new project directly to your live portfolio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white'
                : 'border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>Project uploaded and published successfully!</span>
            </div>
          )}

          {/* Project Image Upload & Preview */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              Project Cover Image / Thumbnail
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-5 aspect-video rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 flex items-center justify-center relative shadow-inner">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-3 space-y-1 text-slate-500">
                    <Upload className="w-6 h-6 mx-auto opacity-50 text-cyan-400" />
                    <p className="text-[11px] font-mono">No Image Uploaded</p>
                  </div>
                )}
              </div>

              <div className="sm:col-span-7 space-y-2.5">
                <label className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Image File from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>

                <div className="relative">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    placeholder="Or paste an Image URL..."
                    className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Project Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cinematic Brand Commercial 2026"
              required
              className={`w-full px-4 py-2.5 rounded-xl border text-sm font-heading font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Project Type / Tag
              </label>
              <input
                type="text"
                value={typeLabel}
                onChange={(e) => setTypeLabel(e.target.value)}
                placeholder="e.g. Commercial Video / Branding"
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Short Card Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Short Card Summary * (1-2 sentences)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief overview displayed on the portfolio grid card..."
              required
              className={`w-full px-4 py-2.5 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Full Narrative Overview */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Full Project Scope & Story (Detail Modal)
            </label>
            <textarea
              rows={3}
              value={fullDetails}
              onChange={(e) => setFullDetails(e.target.value)}
              placeholder="In-depth explanation of the objective, creative process, challenges, and results..."
              className={`w-full px-4 py-2.5 rounded-xl border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Tools & Technologies */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Tools & Software Used (comma-separated)
            </label>
            <input
              type="text"
              value={toolsInput}
              onChange={(e) => setToolsInput(e.target.value)}
              placeholder="e.g. Adobe Premiere Pro, After Effects, Photoshop, CapCut"
              className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Highlights */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Key Highlights & Execution (one bullet per line)
            </label>
            <textarea
              rows={2}
              value={highlightsInput}
              onChange={(e) => setHighlightsInput(e.target.value)}
              placeholder="Multi-track rhythmic audio design&#10;Dynamic kinetic typography and LUT grading&#10;High-retention social media pacing"
              className={`w-full px-4 py-2.5 rounded-xl border text-xs leading-relaxed font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Live URL & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Live URL / Video Link (Optional)
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://..."
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Status Badge
              </label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="e.g. Completed Project"
                className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 border border-slate-700/60 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
