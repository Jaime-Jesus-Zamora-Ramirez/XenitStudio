import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Film } from 'lucide-react';
import { sound } from './AudioController';

interface InteractiveShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCENES = [
  {
    id: 1,
    title: 'THE AWAKENING',
    subtitle: 'Project Zenith · Unreal Engine 5.5',
    image: '/src/assets/images/xenit_game_zenith_1790184656423.jpg',
    time: '0:12',
    description: 'Activación del rayo coherente en el monolito cenital a 4K 60FPS.',
  },
  {
    id: 2,
    title: 'ATMOSPHERIC ENTRY',
    subtitle: 'Aetheria: Fractured Sky · Nanite Geometry',
    image: '/src/assets/images/xenit_game_scifi_rpg_1790184636677.jpg',
    time: '0:45',
    description: 'Descenso orbital a la superficie exo-planetaria sin pantallas de carga.',
  },
  {
    id: 3,
    title: 'COMBAT CADENCE',
    subtitle: 'Void Pulse · Cyberpunk 120 FPS',
    image: '/src/assets/images/xenit_game_cyberpunk_1790184646446.jpg',
    time: '1:18',
    description: 'Secuencia de combate rítmico con parry y reflejos de luz volumétrica.',
  },
  {
    id: 4,
    title: 'THE ENGINE LAB',
    subtitle: 'Xenit Studio Workspace · Tech Pipeline',
    image: '/src/assets/images/xenit_studio_space_1790184665792.jpg',
    time: '1:42',
    description: 'Herramientas propietarias de renderizado e iluminación en tiempo real.',
  },
];

export const InteractiveShowreelModal: React.FC<InteractiveShowreelModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSceneIndex((idx) => (idx + 1) % SCENES.length);
          return 0;
        }
        return prev + 1.2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, activeSceneIndex]);

  if (!isOpen) return null;

  const currentScene = SCENES[activeSceneIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-4xl rounded-2xl border border-white/20 bg-[#050508] p-0 text-white shadow-2xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2.5">
            <Film className="h-4 w-4 text-white" />
            <span className="font-display text-sm font-bold tracking-wider">
              XENIT STUDIO · CINEMATIC SHOWREEL 2026
            </span>
            <span className="text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded text-neutral-300">
              4K 60FPS MASTER
            </span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Viewport Frame */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src={currentScene.image}
            alt={currentScene.title}
            className="w-full h-full object-cover transition-opacity duration-700 filter brightness-95"
            referrerPolicy="no-referrer"
          />

          {/* Letterbox cinematic film bars */}
          <div className="absolute top-0 inset-x-0 h-6 bg-black/80 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-6 bg-black/80 pointer-events-none" />

          {/* Scene Title overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between pointer-events-none">
            <div className="bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-lg">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                SCENE {activeSceneIndex + 1} / {SCENES.length} · {currentScene.time}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-wide mt-0.5">
                {currentScene.title}
              </h3>
              <p className="text-xs text-neutral-300 mt-1 font-sans">
                {currentScene.description}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-neutral-300">
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>REALTIME SHADER PIPELINE</span>
            </div>
          </div>
        </div>

        {/* Playback Controls & Progress Bar */}
        <div className="p-4 bg-[#09090e] border-t border-white/10 space-y-3">
          {/* Progress bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden cursor-pointer">
            <div
              className="bg-white h-full transition-all duration-75 shadow-[0_0_8px_#ffffff]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>

              <span className="text-xs font-mono text-neutral-400">
                {currentScene.time} / 2:04
              </span>
            </div>

            {/* Scene Selectors */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
              {SCENES.map((scene, i) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveSceneIndex(i);
                    setProgress(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                    activeSceneIndex === i
                      ? 'bg-white text-black font-semibold'
                      : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  0{i + 1}. {scene.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
