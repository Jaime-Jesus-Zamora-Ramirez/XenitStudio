import React, { useState, useEffect } from 'react';
import { BackgroundMesh } from './components/BackgroundMesh';
import { Navbar } from './components/Navbar';
import { XenitLogo } from './components/XenitLogo';
import { Footer } from './components/Footer';
import { sound } from './components/AudioController';
import { IosNoticeModal } from './components/IosNoticeModal';
import { Youtube, Sparkles, Smartphone, ArrowRight, ExternalLink } from 'lucide-react';

const TESTERS_FORM_URL = 'https://forms.gle/ZVSJy3qbTXv1zDMr6';
const YOUTUBE_URL = 'https://www.youtube.com/@XenitStudio';

export default function App() {
  const [isIosModalOpen, setIsIosModalOpen] = useState(false);
  const [isIosDevice, setIsIosDevice] = useState(false);

  useEffect(() => {
    // Attempt playback immediately and on any initial gesture
    sound.ensurePlaying();

    // Detect iOS devices (iPhone, iPad, iPod)
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
      setIsIosDevice(true);
    }
  }, []);

  const handleTestersClick = (e?: React.MouseEvent) => {
    sound.playClick();
    if (isIosDevice) {
      // If iOS, prevent direct form navigation and show tailored alert modal
      if (e) e.preventDefault();
      setIsIosModalOpen(true);
    } else {
      // If not iOS, open Google Form in new tab
      window.open(TESTERS_FORM_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={() => sound.ensurePlaying()}
      className="relative min-h-screen flex flex-col justify-between bg-[#070709] text-neutral-100 selection:bg-white selection:text-black"
    >
      {/* Dynamic Interactive Particle Grid */}
      <BackgroundMesh interactive={true} />

      {/* Top Bar Header */}
      <Navbar onOpenTesters={handleTestersClick} />

      <main className="relative z-10 flex-1 flex items-center justify-center">
        {/* ================= HERO SECTION (LOGO SPOTLIGHT) ================= */}
        <section className="relative w-full overflow-hidden py-12 md:py-20 flex flex-col items-center text-center px-4">
          {/* Subtle Ambient Radial Backlight behind the Hero */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[540px] w-[540px] rounded-full bg-white/[0.04] blur-[120px]" />

          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* The Centerpiece: Interactive XENIT STUDIO Logo */}
            <div className="w-full flex justify-center mb-6">
              <XenitLogo variant="hero" interactive={true} />
            </div>

            {/* Value Proposition */}
            <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed text-balance">
              Estudio independiente de nueva generación enfocado en experiencias interactivas impulsado por IA.
            </p>

            {/* Quick Action Buttons: Testers & YouTube */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={(e) => handleTestersClick(e)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:bg-neutral-200 hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-all cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-neutral-900 group-hover:rotate-12 transition-transform" />
                <span>Unirse como Tester (Android)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-red-500/10 hover:border-red-500/40 text-neutral-200 hover:text-white font-medium text-sm transition-all cursor-pointer group"
              >
                <Youtube className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span>Canal @XenitStudio</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Interactive Notice trigger if user wants to see iOS status directly */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsIosModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>¿Tienes iOS? Consulta disponibilidad aquí</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* iOS Notice Modal Popup */}
      <IosNoticeModal
        isOpen={isIosModalOpen}
        onClose={() => setIsIosModalOpen(false)}
        formUrl={TESTERS_FORM_URL}
        youtubeUrl={YOUTUBE_URL}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
