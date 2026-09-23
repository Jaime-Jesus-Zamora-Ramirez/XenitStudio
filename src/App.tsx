import React, { useEffect } from 'react';
import { BackgroundMesh } from './components/BackgroundMesh';
import { Navbar } from './components/Navbar';
import { XenitLogo } from './components/XenitLogo';
import { Footer } from './components/Footer';
import { sound } from './components/AudioController';

export default function App() {
  useEffect(() => {
    // Attempt playback immediately and on any initial gesture
    sound.ensurePlaying();
  }, []);

  return (
    <div
      onClick={() => sound.ensurePlaying()}
      className="relative min-h-screen flex flex-col justify-between bg-[#070709] text-neutral-100 selection:bg-white selection:text-black"
    >
      {/* Dynamic Interactive Particle Grid */}
      <BackgroundMesh interactive={true} />

      {/* Top Bar Header */}
      <Navbar />

      <main className="relative z-10 flex-1 flex items-center justify-center">
        {/* ================= HERO SECTION (LOGO SPOTLIGHT) ================= */}
        <section className="relative w-full overflow-hidden py-16 md:py-24 flex flex-col items-center text-center px-4">
          {/* Subtle Ambient Radial Backlight behind the Hero */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[540px] w-[540px] rounded-full bg-white/[0.04] blur-[120px]" />

          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* The Centerpiece: Interactive XENIT STUDIO Logo */}
            <div className="w-full flex justify-center mb-6">
              <XenitLogo variant="hero" interactive={true} />
            </div>

            {/* Value Proposition */}
            <p className="mt-5 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed text-balance">
              Estudio independiente de nueva generación enfocado en experiencias interactivas impulsado por IA.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
