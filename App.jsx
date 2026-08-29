import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { ExperienceEducation } from './components/ExperienceEducation';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ProjectModal } from './components/ProjectModal';
import { OwnerStudioModal } from './components/OwnerStudioModal';
import { AddProjectModal } from './components/AddProjectModal';
import { PERSONAL_INFO, PROJECTS_DATA, ALL_PROJECTS_DATA } from './data/portfolioData';

export function App() {
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
  const [isDark, setIsDark] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(PERSONAL_INFO);
  const [projects, setProjects] = useState(ALL_PROJECTS_DATA);
  const [isOwnerStudioOpen, setIsOwnerStudioOpen] = useState(isAdminRoute);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false);

  // Theme remains local to each visitor. Projects and owner authentication are server-side.
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('jc_portfolio_theme');
      if (savedTheme) setIsDark(savedTheme === 'dark');
    } catch (e) {
      console.error(e);
    }

    const loadPortfolio = async () => {
      try {
        const response = await fetch('/api/projects', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.projects)) {
            const merged = [...PROJECTS_DATA, ...data.projects];
            const unique = Array.from(new Map(merged.map((project) => [project.id, project])).values());
            setProjects(unique);
          }
        }
        const auth = await fetch('/api/auth/me', { credentials: 'include' });
        if (auth.ok) {
          const data = await auth.json();
          setIsOwnerAuthenticated(Boolean(data.authenticated));
        }
      } catch (e) {
        console.error('Portfolio API unavailable; showing built-in projects.', e);
      }
    };
    loadPortfolio();
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('jc_portfolio_theme', next ? 'dark' : 'light');
      } catch {
        // LocalStorage fallback
      }
      return next;
    });
  };

  const handleOpenAddProject = () => {
    if (isOwnerAuthenticated) setIsAddProjectOpen(true);
  };

  const handleSaveProject = async (newProject) => {
    if (!isOwnerAuthenticated) return;
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newProject)
      });
      if (!response.ok) throw new Error('Project could not be published.');
      const data = await response.json();
      setProjects(data.projects || [newProject, ...projects]);
    } catch (err) {
      console.error(err);
      alert('Project could not be published. Please check your owner login and server configuration.');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!isOwnerAuthenticated) return;
    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Delete failed');
      const data = await response.json();
      setProjects(data.projects || projects.filter((p) => p.id !== projectId));
    } catch (err) {
      console.error(err);
      alert('Project could not be deleted.');
    }
  };

  const handleResetProjects = async () => {
    if (!isOwnerAuthenticated) return;
    try {
      const response = await fetch('/api/projects/reset', { method: 'POST', credentials: 'include' });
      if (!response.ok) throw new Error('Reset failed');
      const data = await response.json();
      setProjects(data.projects || PROJECTS_DATA);
    } catch (err) {
      console.error(err);
      alert('Projects could not be reset.');
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  // The public portfolio stays unchanged. /admin is a dedicated owner entry point.
  // It still uses the same secure server session, but visitors never see an owner control on the public page.
  if (isAdminRoute) {
    return (
      <div className={`min-h-screen relative font-sans ${isDark ? 'bg-[#06080d] text-slate-100' : 'bg-[#f8fafc] text-slate-900'}`}>
        <OwnerStudioModal
          isOpen={true}
          onClose={() => {
            if (isOwnerAuthenticated) window.location.href = '/';
          }}
          isDark={isDark}
          isOwnerAuthenticated={isOwnerAuthenticated}
          onAuthenticatedChange={setIsOwnerAuthenticated}
          personalInfo={personalInfo}
          onUpdatePersonalInfo={setPersonalInfo}
          projects={projects}
          onOpenAddProject={() => setIsAddProjectOpen(true)}
          onDeleteProject={handleDeleteProject}
          onResetProjects={handleResetProjects}
        />
        <AddProjectModal
          isOpen={isAddProjectOpen}
          onClose={() => setIsAddProjectOpen(false)}
          isDark={isDark}
          onSaveProject={handleSaveProject}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative font-sans transition-colors duration-300 ${
        isDark
          ? 'bg-[#06080d] text-slate-100 selection:bg-cyan-500 selection:text-black'
          : 'bg-[#f8fafc] text-slate-900 selection:bg-blue-600 selection:text-white'
      }`}
    >
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Interactive Cyber Canvas */}
      <BackgroundCanvas isDark={isDark} />

      {/* Cybernetic Custom Cursor */}
      <CustomCursor isDark={isDark} />

      {/* Navigation Header */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        personalInfo={personalInfo}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        <Hero
          isDark={isDark}
          personalInfo={personalInfo}
          isOwnerAuthenticated={isOwnerAuthenticated}
          onOpenOwnerStudio={isAdminRoute ? () => setIsOwnerStudioOpen(true) : null}
        />

        <About
          isDark={isDark}
          personalInfo={personalInfo}
        />

        <Skills
          isDark={isDark}
        />

        <Projects
          isDark={isDark}
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
          isOwnerAuthenticated={isOwnerAuthenticated}
          onOpenAddProject={handleOpenAddProject}
          onDeleteProject={handleDeleteProject}
        />

        <Services
          isDark={isDark}
          onContactClick={scrollToContact}
        />

        <ExperienceEducation
          isDark={isDark}
        />

        <Contact
          isDark={isDark}
          personalInfo={personalInfo}
        />
      </main>

      {/* Footer */}
      <Footer
        isDark={isDark}
        personalInfo={personalInfo}
        onOpenOwnerStudio={isAdminRoute ? () => setIsOwnerStudioOpen(true) : null}
      />

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isDark={isDark}
          onClose={() => setSelectedProject(null)}
          onOpenContact={() => {
            setSelectedProject(null);
            scrollToContact();
          }}
        />
      )}

    </div>
  );
}

export default App;
