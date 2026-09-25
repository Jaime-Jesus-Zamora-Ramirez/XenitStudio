import React, { useEffect, useRef } from 'react';
import { AlertTriangle, Smartphone, ExternalLink, X, Globe } from 'lucide-react';
import { sound } from './AudioController';

interface IosNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  formUrl?: string;
  youtubeUrl?: string;
}

export const IosNoticeModal: React.FC<IosNoticeModalProps> = ({
  isOpen,
  onClose,
  formUrl = 'https://forms.gle/ZVSJy3qbTXv1zDMr6',
  youtubeUrl = 'https://www.youtube.com/@XenitStudio',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle nodes for cosmic starfield
    const particleCount = Math.min(Math.floor((width * height) / 16000), 80);
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.55 + 0.25,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Draw starry nodes & interconnecting subtle constellations
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle interactive mouse deflection
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.2;
          p.x += (dx / (dist || 1)) * force;
          p.y += (dy / (dist || 1)) * force;
        }

        const twinkle = Math.sin(time * p.twinkleSpeed + p.twinklePhase) * 0.2;
        const alpha = Math.max(0.1, Math.min(0.9, p.baseAlpha + twinkle));

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby stars with faint stellar web
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < 110) {
            const lineAlpha = (1 - distBetween / 110) * 0.16;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-notice-title"
    >
      {/* Interactive Stellar Canvas Background for Modal */}
      <canvas
        ref={canvasRef}
        className="pointer-events-auto absolute inset-0 z-0 opacity-75"
      />

      {/* Atmospheric ambient glow */}
      <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[130px] z-0" />

      {/* Modal Card Content */}
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-amber-500/30 bg-[#0c0c12]/90 backdrop-blur-2xl p-6 sm:p-8 text-neutral-100 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.18)]"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 id="ios-notice-title" className="text-lg font-bold font-display text-white tracking-wide">
              Próximas actualizaciones
            </h3>
          </div>
        </div>

        {/* Main Notice Box */}
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 sm:p-5 mb-6 text-sm leading-relaxed space-y-3 shadow-inner">
          <p className="text-amber-200 font-medium flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
            <span>
              Lamentamos comunicarte que por el momento solo aceptamos testers con dispositivos <strong>Android</strong>.
            </span>
          </p>

          <div className="pt-2 text-neutral-300 text-xs sm:text-sm space-y-1">
            <p className="font-semibold text-white">Mantente atento: Pronto expandiremos a iOS.</p>
            <p className="text-neutral-400">Sigue nuestras redes para ser el primero en enterarte.</p>
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-2.5 mb-6">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-red-500/40 text-neutral-200 hover:text-white transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-base">📱</span>
              <span className="text-sm font-medium">
                YouTube: <strong className="text-white group-hover:text-red-400 transition-colors">@XenitStudio</strong>
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
          </a>

          <a
            href="https://xenitstudio.com"
            onClick={() => sound.playClick()}
            className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/40 text-neutral-200 hover:text-white transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-base">🌐</span>
              <span className="text-sm font-medium">
                Web: <strong className="text-white group-hover:text-cyan-400 transition-colors">https://xenitstudio.com</strong>
              </span>
            </div>
            <Globe className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Secondary option if they also have an Android */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-neutral-400 text-center sm:text-left">
            ¿También cuentas con un Android?
          </span>
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Abrir formulario de testers
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
