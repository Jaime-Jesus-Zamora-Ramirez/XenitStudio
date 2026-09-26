import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from './AudioController';

interface AlienPeekProps {
  onPeek?: () => void;
  className?: string;
}

export const AlienPeek: React.FC<AlienPeekProps> = ({ onPeek, className = '' }) => {
  // Animation phases:
  // 1. 'hidden': safely tucked behind the logo
  // 2. 'peeking': emerges smoothly into view
  // 3. 'peace': raises hand, makes the Peace & Love sign (✌️) with sparkles and animated floating/swaying
  // 4. 'waving_bye': lowers peace sign and gives a quick adorable goodbye wave before ducking down
  // 5. 'hiding': swiftly glides back behind the letters of the logo into complete hiding
  const [phase, setPhase] = useState<'hidden' | 'peeking' | 'peace' | 'waving_bye' | 'hiding'>('hidden');
  const [blink, setBlink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive screen detection: on mobile (< 640px), peek directly over the top of the letters
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Natural living blinks while in peace pose
  useEffect(() => {
    if (phase !== 'peace') return;

    const blinkTimer1 = setTimeout(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 1200);

    const blinkTimer2 = setTimeout(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 2800);

    const blinkTimer3 = setTimeout(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 4500);

    return () => {
      clearTimeout(blinkTimer1);
      clearTimeout(blinkTimer2);
      clearTimeout(blinkTimer3);
    };
  }, [phase]);

  const triggerPeekSequence = () => {
    if (phase !== 'hidden') return;

    // 1. Emerges outwards
    setPhase('peeking');
    sound.playAlienChirp();
    if (onPeek) onPeek();

    // 2. Raises hand with Peace sign (✌️)
    const tPeace = setTimeout(() => {
      setPhase('peace');
    }, 650);

    // 3. Cute goodbye transition: Alien gives a brief wave / farewell before hiding
    const tBye = setTimeout(() => {
      setPhase('waving_bye');
    }, 5600);

    // 4. Swift duck back behind the logo
    const tHiding = setTimeout(() => {
      setPhase('hiding');
    }, 6300);

    // 5. Completely hidden
    const tHidden = setTimeout(() => {
      setPhase('hidden');
    }, 7050);

    return () => {
      clearTimeout(tPeace);
      clearTimeout(tBye);
      clearTimeout(tHiding);
      clearTimeout(tHidden);
    };
  };

  useEffect(() => {
    // Initial surprise peek shortly after loading
    const initialTimer = setTimeout(() => {
      triggerPeekSequence();
    }, 2000);

    // Periodic spontaneous peek
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 4000;
      setTimeout(() => {
        triggerPeekSequence();
      }, randomDelay);
    }, 22000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const isVisible = phase !== 'hidden';
  const isOut = phase === 'peeking' || phase === 'peace' || phase === 'waving_bye';
  const isPeace = phase === 'peace';
  const isWavingBye = phase === 'waving_bye';

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        triggerPeekSequence();
      }}
      className={`absolute z-10 select-none cursor-pointer group ${className}`}
      style={{
        // Adaptive positioning:
        // On mobile (<640px): Above the letters of XENIT, shifted towards the right side (over the 'I' / 'T' area)
        // On desktop/tablet (>=640px): Placed on the right flank, popping out sideways
        ...(isMobile
          ? {
              left: '68%',
              top: '22%',
              transform: isOut
                ? 'translateX(-30%) translateY(-54px) rotate(4deg) scale(0.95)'
                : 'translateX(-30%) translateY(32px) rotate(-4deg) scale(0.6)',
              right: 'auto',
            }
          : {
              right: '-10%',
              top: '32%',
              transform: isOut
                ? 'translateX(55px) translateY(-5px) rotate(6deg) scale(1)'
                : 'translateX(-38px) translateY(16px) rotate(-12deg) scale(0.55)',
              left: 'auto',
            }),
        // Stays fully opaque while retreating smoothly behind the letters, only fading at the very final tuck
        opacity: phase === 'hidden' ? 0 : 1,
        transition:
          phase === 'hiding'
            ? 'transform 0.72s cubic-bezier(0.5, 0, 0.2, 1), opacity 0.5s ease-in 0.22s'
            : 'transform 0.7s cubic-bezier(0.34, 1.45, 0.64, 1), opacity 0.35s ease-out',
        pointerEvents: phase === 'hidden' ? 'none' : 'auto',
      }}
      title="¡Alien de XENIT! Haz clic para saludarlo"
    >
      {/* framer-motion container: adds subtle organic floating and swaying when in peace/idle state */}
      <motion.div
        animate={
          isPeace
            ? {
                y: [0, -5, 0, -3, 0],
                rotate: [0, 2, -1.5, 1, 0],
                transition: {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }
            : isWavingBye
            ? {
                y: [0, -2, 2],
                rotate: [0, 3, -1],
                transition: { duration: 0.7, ease: 'easeOut' },
              }
            : { y: 0, rotate: 0 }
        }
        className="relative w-24 h-32 sm:w-28 sm:h-40 md:w-32 md:h-44 filter drop-shadow-[0_8px_24px_rgba(74,222,128,0.45)]"
      >
        {/* Soft cosmic glow aura - smoothly fades out with AnimatePresence */}
        <AnimatePresence>
          {isOut && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'hiding' ? 0 : 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 rounded-full bg-lime-500/20 blur-2xl"
            />
          )}
        </AnimatePresence>

        {/* Clean, high-fidelity Vector Illustration of the Alien */}
        <svg
          viewBox="0 0 140 160"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Vibrant Lime Green Skin Gradient */}
            <linearGradient id="peekLimeSkin" x1="40" y1="20" x2="100" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a5ff36" />
              <stop offset="35%" stopColor="#82eb18" />
              <stop offset="70%" stopColor="#67cf10" />
              <stop offset="100%" stopColor="#4f9a0c" />
            </linearGradient>

            {/* Arm & Hand Specific Anatomical Gradient for Volume */}
            <linearGradient id="armVolumeSkin" x1="90" y1="120" x2="120" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7ce61a" />
              <stop offset="45%" stopColor="#8ef624" />
              <stop offset="100%" stopColor="#a5ff36" />
            </linearGradient>

            {/* Cranium Volume Highlight */}
            <radialGradient id="headHighlight" cx="45%" cy="30%" r="55%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#a5ff36" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#67cf10" stopOpacity="0" />
            </radialGradient>

            {/* Glossy Black Eye Gradient with soft cosmic reflection */}
            <radialGradient id="eyeGloss" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1a202c" />
              <stop offset="60%" stopColor="#08090c" />
              <stop offset="100%" stopColor="#020304" />
            </radialGradient>

            {/* Buckle cyan gem glow */}
            <radialGradient id="peekCyanGem" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="80%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>

            {/* Clip path of the exact head shape so spots and blush can NEVER overflow outside */}
            <clipPath id="headClip">
              <path d="M 70 14 C 102 14 116 38 112 68 C 108 92 92 102 70 102 C 48 102 32 92 28 68 C 24 38 38 14 70 14 Z" />
            </clipPath>

            {/* Clip path of the torso shape */}
            <clipPath id="torsoClip">
              <path d="M 50 110 C 44 125 44 145 46 150 C 52 153 88 153 94 150 C 96 145 94 125 88 112 Z" />
            </clipPath>
          </defs>

          {/* ================= ANTENNAE ================= */}
          {/* Left Antenna: 45° Angle with Trumpet/Cup Tip + subtle antenna bounce */}
          <motion.g
            animate={
              isPeace
                ? {
                    rotate: [0, -3.5, 2, -1.5, 0],
                    transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
                  }
                : phase === 'hiding'
                ? {
                    rotate: -12,
                    transition: { duration: 0.5, ease: 'easeIn' },
                  }
                : {}
            }
            style={{ transformOrigin: '40px 32px' }}
          >
            <path
              d="M 40 32 C 30 24 20 18 10 18"
              stroke="#050508"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 40 32 C 30 24 20 18 10 18"
              stroke="url(#peekLimeSkin)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Trumpet Tip */}
            <ellipse cx="8" cy="18" rx="5.5" ry="4" transform="rotate(-20 8 18)" fill="#7ce61a" stroke="#050508" strokeWidth="2.5" />
            <ellipse cx="7.5" cy="17.5" rx="3" ry="2" transform="rotate(-20 7.5 17.5)" fill="#c7fc72" />
            <circle cx="7" cy="17" r="0.8" fill="#ffffff" />
          </motion.g>

          {/* Right Top Antenna: Upward with Trumpet Tip + subtle sway */}
          <motion.g
            animate={
              isPeace
                ? {
                    rotate: [0, 4, -2.5, 1.5, 0],
                    transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
                  }
                : phase === 'hiding'
                ? {
                    rotate: 10,
                    transition: { duration: 0.5, ease: 'easeIn' },
                  }
                : {}
            }
            style={{ transformOrigin: '88px 18px' }}
          >
            <path
              d="M 88 18 C 90 12 91 6 92 2"
              stroke="#050508"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 88 18 C 90 12 91 6 92 2"
              stroke="url(#peekLimeSkin)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Trumpet Tip */}
            <ellipse cx="93" cy="2" rx="5.5" ry="3.5" fill="#7ce61a" stroke="#050508" strokeWidth="2.5" />
            <ellipse cx="93" cy="2" rx="3" ry="1.8" fill="#c7fc72" />
            <circle cx="92.5" cy="1.6" r="0.8" fill="#ffffff" />
          </motion.g>

          {/* ================= BULBOUS HEAD ================= */}
          <path
            d="M 70 14 C 102 14 116 38 112 68 C 108 92 92 102 70 102 C 48 102 32 92 28 68 C 24 38 38 14 70 14 Z"
            fill="url(#peekLimeSkin)"
            stroke="#050508"
            strokeWidth="4"
          />

          {/* Soft Cranium 3D Light Glow */}
          <path
            d="M 70 14 C 102 14 116 38 112 68 C 108 92 92 102 70 102 C 48 102 32 92 28 68 C 24 38 38 14 70 14 Z"
            fill="url(#headHighlight)"
            pointerEvents="none"
          />

          {/* Soft Organic Spots on Head - strictly clipped inside head contour */}
          <g clipPath="url(#headClip)">
            <ellipse cx="52" cy="28" rx="6.5" ry="5.5" fill="#c7fc72" opacity="0.85" />
            <ellipse cx="74" cy="25" rx="7.5" ry="6" fill="#c7fc72" opacity="0.85" />
            <ellipse cx="90" cy="34" rx="6.5" ry="5.5" fill="#c7fc72" opacity="0.85" />
            <ellipse cx="98" cy="54" rx="5" ry="6.5" fill="#c7fc72" opacity="0.85" />
            <ellipse cx="42" cy="48" rx="5.5" ry="6" fill="#c7fc72" opacity="0.85" />
            <ellipse cx="70" cy="44" rx="6" ry="5" fill="#c7fc72" opacity="0.85" />

            {/* Soft Cheeks Blush */}
            <ellipse cx="38" cy="72" rx="5" ry="3" fill="#84cc16" opacity="0.35" />
            <ellipse cx="102" cy="72" rx="5" ry="3" fill="#84cc16" opacity="0.35" />
          </g>

          {/* ================= LARGE TEARDROP OVAL BLACK EYES ================= */}
          {/* Left Eye */}
          <g transform="rotate(-8 48 64)">
            {blink ? (
              /* Curved closed eyelid line when blinking */
              <>
                <ellipse cx="48" cy="64" rx="14" ry="18" fill="url(#peekLimeSkin)" stroke="#050508" strokeWidth="3" />
                <path d="M 36 65 Q 48 70 60 65" stroke="#050508" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 40 68 L 38 72" stroke="#050508" strokeWidth="2" strokeLinecap="round" />
                <path d="M 56 68 L 58 72" stroke="#050508" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <ellipse cx="48" cy="64" rx="14" ry="18" fill="url(#eyeGloss)" stroke="#050508" strokeWidth="1" />
                <ellipse cx="52" cy="56" rx="4.5" ry="5.5" fill="#ffffff" />
                <circle cx="53" cy="55" r="1.5" fill="#f0fdf4" />
                <ellipse cx="43" cy="71" rx="2.5" ry="3" fill="#ffffff" />
              </>
            )}
          </g>

          {/* Right Eye */}
          <g transform="rotate(8 92 64)">
            {blink ? (
              /* Curved closed eyelid line when blinking */
              <>
                <ellipse cx="92" cy="64" rx="14" ry="18" fill="url(#peekLimeSkin)" stroke="#050508" strokeWidth="3" />
                <path d="M 80 65 Q 92 70 104 65" stroke="#050508" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 84 68 L 82 72" stroke="#050508" strokeWidth="2" strokeLinecap="round" />
                <path d="M 100 68 L 102 72" stroke="#050508" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <ellipse cx="92" cy="64" rx="14" ry="18" fill="url(#eyeGloss)" stroke="#050508" strokeWidth="1" />
                <ellipse cx="96" cy="56" rx="4.5" ry="5.5" fill="#ffffff" />
                <circle cx="97" cy="55" r="1.5" fill="#f0fdf4" />
                <ellipse cx="87" cy="71" rx="2.5" ry="3" fill="#ffffff" />
              </>
            )}
          </g>

          {/* Mouth: Cute alien line */}
          <path
            d="M 62 90 Q 70 87 78 90"
            stroke="#050508"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* ================= NECK & HALF BODY (TORSO & BELT) ================= */}
          {/* Neck */}
          <path
            d="M 64 100 L 64 112 L 76 112 L 76 100"
            fill="#67c716"
            stroke="#050508"
            strokeWidth="3.5"
          />

          {/* Torso - perfectly aligns from shoulder (x:88, y:112) down to hip */}
          <path
            d="M 50 110 C 44 125 44 145 46 150 C 52 153 88 153 94 150 C 96 145 94 125 88 112 Z"
            fill="url(#peekLimeSkin)"
            stroke="#050508"
            strokeWidth="4"
          />

          {/* Chest Spots strictly clipped inside torso contour */}
          <g clipPath="url(#torsoClip)">
            <ellipse cx="64" cy="126" rx="6" ry="5" fill="#c7fc72" opacity="0.85" />
            <ellipse cx="78" cy="122" rx="7" ry="6" fill="#c7fc72" opacity="0.85" />
            <ellipse cx="80" cy="138" rx="6" ry="5" fill="#c7fc72" opacity="0.85" />
          </g>

          {/* Left Arm: Resting behind edge */}
          <g>
            <path
              d="M 48 114 Q 32 128 34 148"
              stroke="#050508"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 48 114 Q 32 128 34 148"
              stroke="url(#peekLimeSkin)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="34" cy="150" rx="5.5" ry="6" fill="#7ce61a" stroke="#050508" strokeWidth="2.5" />
          </g>

          {/* Blue Blaster Holster on Hip */}
          <g transform="translate(36, 138)">
            <rect x="0" y="0" width="10" height="20" rx="3.5" fill="#2563eb" stroke="#050508" strokeWidth="2.5" />
            <path d="M 2 0 L 2 -5 Q 5 -7 8 -5 L 8 0 Z" fill="#93c5fd" stroke="#050508" strokeWidth="2" />
            <line x1="2" y1="6" x2="8" y2="6" stroke="#1e3a8a" strokeWidth="1.5" />
            <line x1="2" y1="12" x2="8" y2="12" stroke="#1e3a8a" strokeWidth="1.5" />
          </g>

          {/* Red Belt with Big Golden & Cyan Gem Buckle */}
          <rect x="44" y="142" width="54" height="11" rx="3" fill="#dc2626" stroke="#050508" strokeWidth="3" />
          <line x1="46" y1="145" x2="96" y2="145" stroke="#f87171" strokeWidth="1.2" />

          {/* Golden Oval Buckle Rim */}
          <ellipse cx="68" cy="147" rx="13" ry="11" fill="#ffd700" stroke="#050508" strokeWidth="3" />
          {/* Cyan Gemstone Core with specular glint */}
          <ellipse cx="68" cy="147" rx="9" ry="7.5" fill="url(#peekCyanGem)" stroke="#0284c7" strokeWidth="1.5" />
          <ellipse cx="66" cy="144.5" rx="2" ry="1.2" fill="#ffffff" opacity="0.9" />

          {/* ======================================================== */}
          {/* RIGHT ARM & PEACE SIGN ✌️ / FAREWELL WAVE                */}
          {/* ======================================================== */}
          <motion.g
            animate={
              isPeace
                ? {
                    rotate: [0, 4, -4, 0],
                    transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                  }
                : isWavingBye
                ? {
                    // Friendly goodbye wave: rotates wrist and hand back and forth before ducking
                    rotate: [-12, 10, -10, 6, -2],
                    transition: { duration: 0.7, ease: 'easeInOut' },
                  }
                : phase === 'hiding'
                ? {
                    // Arm tucks inward smoothly as the alien ducks down
                    rotate: 28,
                    transition: { duration: 0.45, ease: 'easeIn' },
                  }
                : { rotate: 30 }
            }
            style={{
              transformOrigin: '88px 114px',
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Deltoid / Shoulder cap that sits exactly over the torso junction */}
            <circle cx="88" cy="114" r="7.5" fill="#7ce61a" stroke="#050508" strokeWidth="3" />

            {/* Seamless Black Outline for Arm, Wrist, and Fingers */}
            <path
              d="
                M 88 108
                C 98 106 112 110 118 96
                C 121 88 116 80 114 74
                L 110 56
                C 109 52 115 50 118 54
                L 122 70
                C 124 70 126 70 127 70
                L 131 52
                C 134 48 140 50 138 55
                L 133 74
                C 135 78 136 84 133 90
                C 129 98 122 104 114 108
                C 105 113 97 122 88 120
                Z
              "
              fill="#050508"
            />

            {/* Seamless Arm & Hand Skin Fill */}
            <path
              d="
                M 89 110
                C 98 108 110 112 115.5 95.5
                C 118.5 87 114 79 112 73
                L 110 57.5
                C 110 54.5 114 53 116 55.5
                L 120.5 71
                C 122.5 71 125.5 71 127 71
                L 131 53.5
                C 133 51 137.5 52.5 136 56
                L 131.5 74
                C 133 78 133.5 83.5 131 88.5
                C 127 96 120.5 101.5 113 105.5
                C 104.5 110.5 97 118.5 89 118
                Z
              "
              fill="url(#armVolumeSkin)"
            />

            {/* Deltoid muscle highlight blend */}
            <ellipse cx="89" cy="114" rx="4.5" ry="4" fill="#a5ff36" opacity="0.6" />

            {/* Bicep and Forearm cylindrical 3D light reflection */}
            <path
              d="M 94 111 C 104 112 112 112 115 97 C 117 89 114 81 112 75"
              stroke="#a5ff36"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* Soft fingertip pads / highlights on Peace fingers */}
            <ellipse cx="113" cy="56" rx="2.5" ry="1.8" fill="#c7fc72" opacity="0.95" />
            <ellipse cx="133.5" cy="54" rx="2.5" ry="1.8" fill="#c7fc72" opacity="0.95" />
            <circle cx="113" cy="55.5" r="0.8" fill="#ffffff" />
            <circle cx="133.5" cy="53.5" r="0.8" fill="#ffffff" />

            {/* Natural Palm Anatomy: Folded Ring & Pinky Fingers */}
            <path
              d="M 124 76 C 128 76 130 80 128 84 C 126 86 123 86 121 84"
              fill="#67c716"
              stroke="#050508"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Folded Thumb wrapping across front palm */}
            <path
              d="M 114 79 C 116 75 122 75 124 78 C 125 81 121 84 116 82 Z"
              fill="#7ce61a"
              stroke="#050508"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Cosmic Stardust particles radiating around Peace Sign */}
            {isPeace && (
              <>
                <circle cx="104" cy="48" r="2.5" fill="#ffffff" className="animate-ping" />
                <circle cx="142" cy="49" r="3" fill="#facc15" />
                <circle cx="123" cy="40" r="2" fill="#ffffff" />
                <text x="140" y="44" fontSize="11" fill="#facc15" opacity="0.9">✦</text>
              </>
            )}
          </motion.g>
        </svg>

        {/* Floating Peace badge with bounce and smooth exit */}
        <AnimatePresence>
          {isPeace && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.8, transition: { duration: 0.25 } }}
              className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/95 border-2 border-lime-400 font-mono text-[10px] text-lime-300 px-2.5 py-0.5 shadow-[0_0_15px_rgba(143,252,40,0.6)] flex items-center gap-1.5 whitespace-nowrap rounded-sm"
            >
              <span>✌️</span>
              <span className="font-black tracking-wider uppercase">¡HOLA GAMERS!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
