import React from 'react';
import { XenitLogo } from './XenitLogo';
import { sound } from './AudioController';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#050508]/90 backdrop-blur-md pt-10 pb-8 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          {/* Brand & Philosophy */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1.5">
            <XenitLogo variant="footer" interactive={false} />
            <p className="text-xs text-neutral-400 max-w-sm">
              Estudio independiente de desarrollo de videojuegos y experiencias interactivas.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs"
            aria-label="Volver arriba"
          >
            <span>Volver arriba</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex items-center justify-center text-xs text-neutral-400 text-center">
          <span>© {new Date().getFullYear()} XENIT STUDIO. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
};
