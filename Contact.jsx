import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  Copy,
  Check,
  ArrowUpRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playFuturisticClick, playHoverChime } from '../utils/audioFeedback';

export const Contact = ({ isDark, personalInfo = PERSONAL_INFO }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email format.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    if (!formData.message.trim()) errs.message = 'Please provide a message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playFuturisticClick();

    if (!validate()) return;

    setIsSubmitting(true);

    // Smooth dispatch simulation with notification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const copyEmailToClipboard = () => {
    playFuturisticClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(formData.subject || 'Creative Project Inquiry');
    const body = encodeURIComponent(
      `Hello ${personalInfo.shortName || 'Jhon Carlo'},\n\nMy name is ${formData.name || '[Your Name]'}.\n\n${formData.message || '[Your Message]'}\n\nBest regards,\n${formData.email || ''}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            LET'S CREATE SOMETHING
          </h2>

          <p className={`text-base sm:text-lg font-medium font-display tracking-wide ${
            isDark ? 'text-cyan-400' : 'text-blue-600'
          }`}>
            Have an idea, project, or creative concept? Let's turn it into something meaningful.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card */}
            <div
              onMouseEnter={playHoverChime}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                isDark 
                  ? 'bg-slate-900/50 border-slate-800' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-cyan-400">EMAIL</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className={`text-sm sm:text-base font-heading font-bold hover:underline ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmailToClipboard}
                  title="Copy email to clipboard"
                  className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                    isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location & Status Card */}
            <div
              onMouseEnter={playHoverChime}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                isDark 
                  ? 'bg-slate-900/50 border-slate-800' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-blue-400">LOCATION & AVAILABILITY</p>
                  <p className={`text-sm sm:text-base font-heading font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Philippines (Remote Collaboration)
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Open for commissions, freelance editing, and creative inquiries
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Matrix */}
            <div className={`p-6 rounded-2xl border ${
              isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
                SOCIAL CONNECTIVITY
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Facebook */}
                <a
                  href={personalInfo.socials?.facebook || PERSONAL_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverChime}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all hover:scale-[1.02] ${
                    isDark 
                      ? 'bg-slate-950/60 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900' 
                      : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                      FB
                    </div>
                    <span className={`text-xs font-heading font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      Facebook
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

                {/* Instagram */}
                <a
                  href={personalInfo.socials?.instagram || PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverChime}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all hover:scale-[1.02] ${
                    isDark 
                      ? 'bg-slate-950/60 border-slate-800 hover:border-pink-500/50 hover:bg-slate-900' 
                      : 'bg-slate-50 border-slate-200 hover:border-pink-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center font-bold text-xs">
                      IG
                    </div>
                    <span className={`text-xs font-heading font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      Instagram
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
              isDark 
                ? 'bg-slate-900/50 border-slate-800 shadow-xl' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              {isSuccess ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className={`text-2xl font-heading font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Message Prepared & Ready!
                  </h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Thank you for reaching out! You can send this inquiry directly using your email client or send another message.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <button
                      onClick={handleOpenMailClient}
                      className="px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Launch In Default Email Client</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className={`px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                        isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Santos"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                          isDark 
                            ? 'bg-slate-950/70 border-slate-800 text-white placeholder:text-slate-600' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-400 font-mono">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                          isDark 
                            ? 'bg-slate-950/70 border-slate-800 text-white placeholder:text-slate-600' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-400 font-mono">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Subject / Project Type
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Video Editing Commission or Web Consultation"
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                        isDark 
                          ? 'bg-slate-950/70 border-slate-800 text-white placeholder:text-slate-600' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                    {errors.subject && <p className="text-xs text-red-400 font-mono">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Your Message & Details
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your vision, timeline, deliverables, or questions..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50 resize-none ${
                        isDark 
                          ? 'bg-slate-950/70 border-slate-800 text-white placeholder:text-slate-600' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-400 font-mono">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 text-white shadow-[0_0_25px_rgba(0,102,255,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        PREPARING MESSAGE...
                      </span>
                    ) : (
                      <>
                        <span>SEND MESSAGE / INQUIRY</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
