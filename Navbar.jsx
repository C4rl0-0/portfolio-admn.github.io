import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playHoverChime, playFuturisticClick } from '../utils/audioFeedback';

const NAV_ITEMS = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'services', label: 'SERVICES' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact', label: 'CONTACT' }
];

export const Navbar = ({
  isDark,
  toggleTheme,
  personalInfo = PERSONAL_INFO
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    playFuturisticClick();
    setMobileMenuOpen(false);
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
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#090b10]/85 border-b border-cyan-500/15 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]'
            : 'bg-white/85 border-b border-slate-200/80 backdrop-blur-xl shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Personal Logo Mark - BSIT/Creative text removed as requested */}
        <button
          id="nav-logo"
          onClick={() => scrollToSection('hero')}
          onMouseEnter={playHoverChime}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-600 p-[1.5px] transition-transform group-hover:scale-105 duration-300">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-heading font-bold text-sm tracking-wider ${
              isDark ? 'bg-[#090b10] text-white' : 'bg-slate-50 text-slate-900'
            }`}>
              {personalInfo.initials || 'JC'}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-bold tracking-tight text-sm sm:text-base transition-colors ${
              isDark ? 'text-slate-100 group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-600'
            }`}>
              {personalInfo.shortName || personalInfo.name}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (Cleanly spaced for laptops and desktops, no overlap) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={playHoverChime}
                className={`relative px-2.5 xl:px-3.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]'
                      : 'text-blue-600 bg-blue-50 border border-blue-200'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Controls & Quick CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark / Light Mode Toggle */}
          <button
            id="btn-toggle-theme"
            onClick={() => {
              toggleTheme();
              playFuturisticClick();
            }}
            onMouseEnter={playHoverChime}
            aria-label="Toggle dark and light theme"
            className={`p-2 rounded-lg border text-xs transition-all duration-300 cursor-pointer ${
              isDark
                ? 'bg-slate-900/60 border-cyan-500/30 text-amber-300 hover:bg-slate-800 shadow-[0_0_12px_rgba(251,191,36,0.15)]'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Quick Contact CTA */}
          <button
            id="nav-btn-hire"
            onClick={() => scrollToSection('contact')}
            onMouseEnter={playHoverChime}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile/Tablet Hamburger Menu Toggle */}
          <button
            id="btn-mobile-menu"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              playFuturisticClick();
            }}
            aria-label="Toggle navigation menu"
            className={`p-2 rounded-lg border lg:hidden transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-200'
                : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className={`lg:hidden px-4 pt-2 pb-6 border-b transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            isDark
              ? 'bg-[#090b10]/95 border-cyan-500/20 backdrop-blur-2xl'
              : 'bg-white/95 border-slate-200 backdrop-blur-2xl'
          }`}
        >
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'bg-blue-50 text-blue-600 border border-blue-200'
                      : isDark
                      ? 'text-slate-300 hover:bg-slate-800/60'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}

            <button
              onClick={() => scrollToSection('contact')}
              className="mt-3 w-full py-3 rounded-lg text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
