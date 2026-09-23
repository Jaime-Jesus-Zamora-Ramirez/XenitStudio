import React from 'react';
import { XenitLogo } from './XenitLogo';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#070709]/80 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="group flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          aria-label="XENIT STUDIO Inicio"
        >
          <XenitLogo variant="nav" interactive={false} />
        </a>
      </div>
    </header>
  );
};
