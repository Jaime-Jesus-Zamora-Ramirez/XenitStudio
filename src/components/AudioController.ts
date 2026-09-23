/**
 * Futuristic Web Audio Synthesizer & Soundtrack Engine for XENIT STUDIO
 * Zero external audio dependencies — 100% generated in real-time with Web Audio API.
 * Autoplays perpetually upon any user interaction / navigation (no stop, no disable buttons).
 */

class FuturisticSoundSystem {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  // Active soundtrack nodes
  private padOsc1: OscillatorNode | null = null;
  private padOsc2: OscillatorNode | null = null;
  private bassOsc: OscillatorNode | null = null;
  private subBassOsc: OscillatorNode | null = null;
  private arpTimer: number | null = null;
  private drumTimer: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const startOnInteraction = () => {
        this.ensurePlaying();
      };

      // Ensure it starts as soon as user touches or clicks anywhere on the page
      window.addEventListener('click', startOnInteraction, { passive: true });
      window.addEventListener('touchstart', startOnInteraction, { passive: true });
      window.addEventListener('keydown', startOnInteraction, { passive: true });
      window.addEventListener('mousemove', startOnInteraction, { once: true, passive: true });
      window.addEventListener('scroll', startOnInteraction, { once: true, passive: true });
    }
  }

  public ensurePlaying() {
    if (!this.isMusicPlaying) {
      this.startFuturisticSoundtrack();
    } else if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    return this.ctx;
  }

  // ============================================
  // PROCEDURAL FUTURISTIC SOUNDTRACK GENERATOR
  // ============================================
  public startFuturisticSoundtrack() {
    try {
      const ctx = this.getAudioContext();
      if (this.isMusicPlaying) return;

      this.isMusicPlaying = true;

      // 1. Deep Reese / Drone Bass (Warm Sci-Fi Foundation in D Minor)
      const bassOsc = ctx.createOscillator();
      const bassSub = ctx.createOscillator();
      const bassFilter = ctx.createBiquadFilter();
      const bassGain = ctx.createGain();

      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(73.42, ctx.currentTime); // D2
      bassSub.type = 'sine';
      bassSub.frequency.setValueAtTime(36.71, ctx.currentTime); // D1 Sub

      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(260, ctx.currentTime);
      bassFilter.Q.setValueAtTime(4, ctx.currentTime);

      bassGain.gain.setValueAtTime(0.001, ctx.currentTime);
      bassGain.gain.linearRampToValueAtTime(0.24, ctx.currentTime + 2.0);

      bassOsc.connect(bassFilter);
      bassSub.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(this.musicGain!);

      bassOsc.start();
      bassSub.start();
      this.bassOsc = bassOsc;
      this.subBassOsc = bassSub;

      // 2. Cosmic Ethereal Detuned Pads
      const pad1 = ctx.createOscillator();
      const pad2 = ctx.createOscillator();
      const padFilter = ctx.createBiquadFilter();
      const padGain = ctx.createGain();

      pad1.type = 'triangle';
      pad1.frequency.setValueAtTime(293.66, ctx.currentTime); // D4
      pad1.detune.setValueAtTime(-9, ctx.currentTime);

      pad2.type = 'sine';
      pad2.frequency.setValueAtTime(440.00, ctx.currentTime); // A4
      pad2.detune.setValueAtTime(11, ctx.currentTime);

      padFilter.type = 'bandpass';
      padFilter.frequency.setValueAtTime(600, ctx.currentTime);
      padFilter.Q.setValueAtTime(1.5, ctx.currentTime);

      padGain.gain.setValueAtTime(0.001, ctx.currentTime);
      padGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.5);

      pad1.connect(padFilter);
      pad2.connect(padFilter);
      padFilter.connect(padGain);
      padGain.connect(this.musicGain!);

      pad1.start();
      pad2.start();
      this.padOsc1 = pad1;
      this.padOsc2 = pad2;

      // 3. Futuristic Cyber Arpeggiator (D Minor Pentatonic Sequence)
      const arpNotes = [293.66, 349.23, 392.00, 440.00, 523.25, 587.33, 440.00, 349.23];
      let arpStep = 0;

      const triggerArpStep = () => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(arpNotes[arpStep % arpNotes.length], now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, now);
        filter.frequency.exponentialRampToValueAtTime(400, now + 0.18);

        noteGain.gain.setValueAtTime(0.08, now);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.musicGain!);

        osc.start(now);
        osc.stop(now + 0.24);

        arpStep++;
      };

      this.arpTimer = window.setInterval(triggerArpStep, 220);

      // 4. Subtle Cosmic Kick / Optical Pulse
      let beatStep = 0;
      const triggerBeat = () => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        if (beatStep % 2 === 0) {
          const kickOsc = this.ctx.createOscillator();
          const kickGain = this.ctx.createGain();

          kickOsc.type = 'sine';
          kickOsc.frequency.setValueAtTime(110, now);
          kickOsc.frequency.exponentialRampToValueAtTime(32, now + 0.25);

          kickGain.gain.setValueAtTime(0.28, now);
          kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

          kickOsc.connect(kickGain);
          kickGain.connect(this.musicGain!);

          kickOsc.start(now);
          kickOsc.stop(now + 0.3);
        } else {
          const hatOsc = this.ctx.createOscillator();
          const hatGain = this.ctx.createGain();

          hatOsc.type = 'triangle';
          hatOsc.frequency.setValueAtTime(3500, now);

          hatGain.gain.setValueAtTime(0.025, now);
          hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

          hatOsc.connect(hatGain);
          hatGain.connect(this.musicGain!);

          hatOsc.start(now);
          hatOsc.stop(now + 0.09);
        }

        beatStep++;
      };

      this.drumTimer = window.setInterval(triggerBeat, 440);
    } catch (e) {
      console.warn('Audio auto-start initialization:', e);
    }
  }

  // ============================================
  // INTERACTIVE SFX (LOGO & UI)
  // ============================================
  public playClick() {
    this.ensurePlaying();
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // safe
    }
  }

  public playHover() {
    this.ensurePlaying();
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // safe
    }
  }

  public playLaserRay() {
    this.ensurePlaying();
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.28);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start();
      osc.stop(ctx.currentTime + 0.34);
    } catch {
      // safe
    }
  }
}

export const sound = new FuturisticSoundSystem();
