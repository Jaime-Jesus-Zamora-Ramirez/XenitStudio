import React, { useState } from 'react';
import { GameProject } from '../data/games';
import { X, Check, Monitor, Cpu, Sparkles, Share2 } from 'lucide-react';
import { sound } from './AudioController';

interface GameDetailsModalProps {
  game: GameProject | null;
  onClose: () => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ game, onClose }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!game) return null;

  const handleWishlist = () => {
    sound.playClick();
    setWishlisted(!wishlisted);
  };

  const handleShare = () => {
    sound.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-white/15 bg-[#09090e] p-0 text-neutral-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Banner with image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-950 shrink-0">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover object-center filter brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-[#09090e]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white/80 hover:bg-black hover:text-white backdrop-blur-md border border-white/10 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Tag & Status */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 tracking-widest uppercase">
              {game.status}
            </span>
          </div>

          {/* Title lockup on image */}
          <div className="absolute bottom-5 left-6 right-6">
            <div className="text-xs font-mono tracking-widest text-neutral-300 uppercase">
              {game.genre} · {game.year}
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              {game.title} <span className="font-light text-neutral-300">{game.subtitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl line-clamp-2">
              {game.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Synopsis */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Sinopsis & Visión de Juego
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {game.synopsis}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
              Mecánicas & Pilares
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {game.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-neutral-200"
                >
                  <Sparkles className="h-4 w-4 text-white shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
              Especificaciones Técnicas & Motor
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {game.techSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-white/10 bg-black/40 p-3"
                >
                  <div className="text-[10px] font-mono uppercase text-neutral-400">
                    {spec.label}
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Plataformas Soportadas
            </h4>
            <div className="flex flex-wrap gap-2">
              {game.platforms.map((plat) => (
                <span
                  key={plat}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-neutral-900 px-3 py-1 text-xs text-neutral-300 font-medium"
                >
                  <Monitor className="h-3 w-3 text-neutral-400" />
                  {plat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="border-t border-white/10 bg-black/50 p-4 sm:p-5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="font-mono tabular-nums font-semibold text-white">{game.wishlistCount}</span>
            <span>jugadores en lista de deseos</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
              title="Copiar enlace"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedLink ? 'Copiado' : 'Compartir'}</span>
            </button>

            <button
              onClick={handleWishlist}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                wishlisted
                  ? 'bg-emerald-500 text-black'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              {wishlisted ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>En Wishlist</span>
                </>
              ) : (
                <span>Añadir a Wishlist</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
