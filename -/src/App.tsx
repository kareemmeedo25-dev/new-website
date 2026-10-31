import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import ParticlesBackground from '@/components/ParticlesBackground';
import Navbar from '@/components/Navbar';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ProjectModal from '@/components/ProjectModal';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Terminal from '@/components/sections/Terminal';
import GitHubRepos from '@/components/sections/GitHubRepos';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import CyberBat from '@/components/CyberBat';
import type { Project } from '@/lib/projects';

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ParticlesBackground />
      <CyberBat />

      <div className="relative min-h-screen">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects onOpenProject={setActiveProject} />
          <Services />
          <Terminal />
          <GitHubRepos />
          <Contact />
        </main>

        <Footer />
      </div>

      <FloatingWhatsApp />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
