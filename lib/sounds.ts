/**
 * Web Audio API Sound System
 * Provides spatial audio generation and playback for the kids landing page.
 * Gracefully degrades if Web Audio API unavailable.
 * Sound state persisted to localStorage.
 */

type SoundKey = 'hover' | 'click' | 'success';

interface SoundConfig {
  frequency: number;
  duration: number;
  type: OscillatorType;
  attack: number;
  decay: number;
}

const SOUND_CONFIGS: Record<SoundKey, SoundConfig> = {
  hover: {
    frequency: 800,
    duration: 0.1,
    type: 'sine',
    attack: 0.01,
    decay: 0.09,
  },
  click: {
    frequency: 1200,
    duration: 0.08,
    type: 'square',
    attack: 0.005,
    decay: 0.075,
  },
  success: {
    frequency: 1400,
    duration: 0.15,
    type: 'triangle',
    attack: 0.02,
    decay: 0.13,
  },
};

const STORAGE_KEY = 'kids-landing-sound-enabled';

let audioContext: AudioContext | null = null;
let soundEnabled = false;

/**
 * Initialize audio context (lazy, on first use)
 */
function getAudioContext(): AudioContext | null {
  if (!audioContext && typeof window !== 'undefined') {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      return audioContext;
    } catch {
      return null;
    }
  }
  return audioContext;
}

/**
 * Load sound enabled state from localStorage
 */
export function getSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'true';
}

/**
 * Set sound enabled state and persist to localStorage
 */
export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
  }
}

/**
 * Play a sound by key
 */
export function playSound(key: SoundKey): void {
  if (!soundEnabled || typeof window === 'undefined') return;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const config = SOUND_CONFIGS[key];
    const now = ctx.currentTime;

    // Oscillator
    const osc = ctx.createOscillator();
    osc.type = config.type;
    osc.frequency.value = config.frequency;

    // Gain envelope (attack + decay)
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + config.attack);
    gain.gain.linearRampToValueAtTime(0, now + config.duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + config.duration);
  } catch {
    // Gracefully degrade if sound fails
  }
}

/**
 * Preload sounds by initializing audio context
 * Call on page mount to warm up the system
 */
export function preloadSounds(): void {
  if (typeof window === 'undefined') return;
  soundEnabled = getSoundEnabled();
  if (soundEnabled) {
    getAudioContext();
  }
}
