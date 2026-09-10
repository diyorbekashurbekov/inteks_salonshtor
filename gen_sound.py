code = """// Web Audio API Sound Synthesizer (Luxury Tactile Sounds)
let audioCtx = null;
let soundEnabled = true;

export function toggleSound() {
  soundEnabled = !soundEnabled;
  if (soundEnabled) playChime(680, 0.08);
  return soundEnabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

function getCtx() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTick(freq = 900, duration = 0.018) {
  if (!soundEnabled) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

export function playChime(freq = 587.33, duration = 0.14) {
  if (!soundEnabled) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}
"""
import os
os.makedirs(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\utils", exist_ok=True)
with open(r"C:\Users\User\.gemini\antigravity\scratch\inteks-studio\src\utils\sound.js", "w", encoding="utf-8") as f:
    f.write(code)
print("Created src/utils/sound.js")
