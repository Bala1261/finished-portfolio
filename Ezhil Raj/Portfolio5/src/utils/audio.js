// Web Audio API Synthesizer for High-Tech UI feedback (No external MP3s needed)
let audioCtx = null;
let isMuted = true;

export function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function toggleAudio() {
  initAudio();
  isMuted = !isMuted;
  if (!isMuted) {
    playCyberTone(880, 'sine', 0.12, 0.08);
  }
  return !isMuted;
}

export function getAudioState() {
  return !isMuted;
}

export function playCyberTone(freq = 600, type = 'sine', duration = 0.08, gainVal = 0.04) {
  if (isMuted || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Audio context may not be ready
  }
}
