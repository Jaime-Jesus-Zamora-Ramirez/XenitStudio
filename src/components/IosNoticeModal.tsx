import React from 'react';
import { AlertTriangle, Smartphone, Youtube, Globe, X, ExternalLink } from 'lucide-react';
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
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-notice-title"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-amber-500/30 bg-[#0e0e13] p-6 sm:p-8 text-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.15)]"
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
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 id="ios-notice-title" className="text-lg font-bold font-display text-white tracking-wide">
              Próximas actualizaciones
            </h3>
          </div>
        </div>

        {/* Main Notice Box */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5 mb-6 text-sm leading-relaxed space-y-3">
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
              <span className="text-sm font-medium">YouTube: <strong className="text-white group-hover:text-red-400 transition-colors">@XenitStudio</strong></span>
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
              <span className="text-sm font-medium">Web: <strong className="text-white group-hover:text-cyan-400 transition-colors">https://xenitstudio.com</strong></span>
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Abrir formulario de testers
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
