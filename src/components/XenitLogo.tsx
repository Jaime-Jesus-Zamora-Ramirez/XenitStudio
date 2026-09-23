import React, { useState, useRef } from 'react';
import { sound } from './AudioController';

interface XenitLogoProps {
  variant?: 'hero' | 'nav' | 'footer' | 'symbol';
  className?: string;
  interactive?: boolean;
}

export const XenitLogo: React.FC<XenitLogoProps> = ({
  variant = 'hero',
  className = '',
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant !== 'hero' || !interactive) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Gentle 3D tilt
    setRotate({
      x: -(y / (rect.height / 2)) * 12,
      y: (x / (rect.width / 2)) * 14,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (interactive) {
      sound.playLaserRay();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive) return;
    sound.playClick();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newSparks = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: clickX + (Math.random() - 0.5) * 40,
      y: clickY + (Math.random() - 0.5) * 40,
    }));
    setSparks((prev) => [...prev, ...newSparks]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.some((ns) => ns.id === s.id)));
    }, 800);
  };

  if (variant === 'nav') {
    return (
      <div
        className={`flex items-center gap-2.5 transition-transform duration-200 hover:scale-102 ${className}`}
        onMouseEnter={() => sound.playHover()}
      >
        <svg
          viewBox="0 0 1000 1000"
          className="h-8 w-8 shrink-0 text-white"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Diagonal Ray */}
          <line
            x1="175"
            y1="618"
            x2="445"
            y2="195"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
            className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
          <circle cx="456" cy="186" r="14" fill="currentColor" />
          {/* X */}
          <path d="M 215 414 L 275 414 L 345 556 L 285 556 Z" fill="currentColor" />
          <path d="M 320 414 L 380 414 L 240 556 L 180 556 Z" fill="currentColor" />
          {/* E */}
          <path d="M 378 414 H 460 V 440 H 408 V 472 H 455 V 498 H 408 V 530 H 460 V 556 H 378 Z" fill="currentColor" />
          {/* N */}
          <path d="M 488 414 H 518 L 575 508 V 414 H 605 V 556 H 575 L 518 462 V 556 H 488 Z" fill="currentColor" />
          {/* I */}
          <path d="M 650 414 H 680 V 556 H 650 Z" fill="currentColor" />
          {/* T */}
          <path d="M 700 414 H 810 V 442 H 770 V 556 H 740 V 442 H 700 Z" fill="currentColor" />
        </svg>
        <div className="flex flex-col">
          <span className="font-display text-sm font-bold tracking-[0.2em] text-white leading-none">
            XENIT
          </span>
          <span className="text-[9px] font-semibold tracking-[0.32em] text-neutral-400 leading-tight">
            STUDIO
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col items-start gap-1 ${className}`}>
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 1000 1000"
            className="h-7 w-7 text-neutral-200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line x1="175" y1="618" x2="445" y2="195" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
            <circle cx="456" cy="186" r="12" fill="currentColor" />
            <path d="M 215 414 L 275 414 L 345 556 L 285 556 Z" fill="currentColor" />
            <path d="M 320 414 L 380 414 L 240 556 L 180 556 Z" fill="currentColor" />
            <path d="M 378 414 H 460 V 440 H 408 V 472 H 455 V 498 H 408 V 530 H 460 V 556 H 378 Z" fill="currentColor" />
            <path d="M 488 414 H 518 L 575 508 V 414 H 605 V 556 H 575 L 518 462 V 556 H 488 Z" fill="currentColor" />
            <path d="M 650 414 H 680 V 556 H 650 Z" fill="currentColor" />
            <path d="M 700 414 H 810 V 442 H 770 V 556 H 740 V 442 H 700 Z" fill="currentColor" />
          </svg>
          <span className="font-display text-base font-bold tracking-[0.18em] text-white">
            XENIT STUDIO
          </span>
        </div>
        <p className="text-xs text-neutral-400">Next-Generation Game Development</p>
      </div>
    );
  }

  // Hero Centerpiece Variant
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative select-none cursor-pointer flex flex-col items-center justify-center py-6 px-4 md:px-12 ${className}`}
      title="Toca para interactuar con la energía de XENIT"
    >
      {/* Dynamic Ambient Backlight Glow */}
      <div
        className={`absolute -inset-8 -z-10 rounded-full bg-gradient-to-r from-neutral-800/40 via-white/10 to-neutral-800/40 blur-3xl transition-opacity duration-700 ${
          isHovered ? 'opacity-90 scale-105' : 'opacity-40'
        }`}
      />

      {/* Sparks particles on click */}
      {sparks.map((spark) => (
        <span
          key={spark.id}
          style={{ left: spark.x, top: spark.y }}
          className="pointer-events-none absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_#ffffff] animate-ping"
        />
      ))}

      {/* Center SVG Logo */}
      <div className="relative w-full max-w-[420px] md:max-w-[540px] aspect-square flex items-center justify-center">
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full text-white filter drop-shadow-[0_12px_36px_rgba(255,255,255,0.12)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dynamic laser beam gradient */}
            <linearGradient id="laserBeam" x1="175" y1="618" x2="445" y2="195" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>

            <filter id="zenithGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background subtle diagonal guide line */}
          <line
            x1="175"
            y1="618"
            x2="445"
            y2="195"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Animated Kinetic Ray (The Laser Slicing the X) */}
          <line
            x1="175"
            y1="618"
            x2="445"
            y2="195"
            stroke="url(#laserBeam)"
            strokeWidth={isHovered ? '14' : '9'}
            strokeLinecap="round"
            className="transition-all duration-300 animate-ray-pulse"
            filter="url(#zenithGlow)"
          />

          {/* Apex Zenith Star / Dot */}
          <circle
            cx="456"
            cy="186"
            r={isHovered ? '11' : '8'}
            fill="#ffffff"
            filter="url(#zenithGlow)"
            className="transition-all duration-300"
          />
          {/* Subtle pulse ring around apex dot */}
          <circle
            cx="456"
            cy="186"
            r={isHovered ? '22' : '15'}
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.5"
            fill="none"
            className="animate-ping"
            style={{ animationDuration: '3s' }}
          />

          {/* Letter X (Forward & Backward Slashes) */}
          <g className="transition-transform duration-300">
            {/* Slash 1 */}
            <path
              d="M 215 414 L 275 414 L 345 556 L 285 556 Z"
              fill="#ffffff"
              className="drop-shadow-sm"
            />
            {/* Slash 2 */}
            <path
              d="M 320 414 L 380 414 L 240 556 L 180 556 Z"
              fill="#ffffff"
              className="drop-shadow-sm"
            />
          </g>

          {/* Letter E */}
          <path
            d="M 378 414 H 460 V 440 H 408 V 472 H 455 V 498 H 408 V 530 H 460 V 556 H 378 Z"
            fill="#ffffff"
          />

          {/* Letter N */}
          <path
            d="M 488 414 H 518 L 575 508 V 414 H 605 V 556 H 575 L 518 462 V 556 H 488 Z"
            fill="#ffffff"
          />

          {/* Letter I */}
          <path
            d="M 650 414 H 680 V 556 H 650 Z"
            fill="#ffffff"
          />

          {/* Letter T */}
          <path
            d="M 700 414 H 810 V 442 H 770 V 556 H 740 V 442 H 700 Z"
            fill="#ffffff"
          />

          {/* STUDIO Under-Text */}
          <text
            x="492"
            y="650"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="78"
            fontWeight="700"
            letterSpacing="6"
            fill="#ffffff"
            className="transition-opacity duration-300"
            opacity={isHovered ? 1 : 0.9}
          >
            STUDIO
          </text>
        </svg>
      </div>

      {/* Interactive Micro-hint */}
      <div className="mt-1 flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400">
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
      </div>
    </div>
  );
};
