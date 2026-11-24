/**
 * 소수의 소리 엔진 (Web Audio).
 * 원고 구현 메모: 파동 cos(γ·ln x)를 시간 t = ln x 로 보면 각진동수가 γ.
 *   f_k = f0 · γ_k / γ_1 (f0 = 220Hz), 진폭 ∝ 1/|ρ_k|.
 * "가설이 틀린 세계": 첫 영점의 실수부가 β ≠ ½ 이면 그 파동의 진폭은 x^{β−½} = e^{(β−½)t} 로 자란다.
 *   t(=ln x)를 초당 GROWTH_RATE 만큼 흐르게 해 소리로 들려주고, 커진 음은 tanh 소프트 클리핑으로 찌그러진다.
 */

export const F0 = 220;
const MASTER = 0.25;
const FADE = 0.08;
const GROWTH_RATE = 0.6; // 초당 ln x 증가량
const MAX_GROWTH = 400;

export type SoundMode = 'chord' | 'solo';

interface Voice {
  osc: OscillatorNode;
  gain: GainNode;
  base: number;
}

export function frequencies(gammas: ArrayLike<number>, K: number): number[] {
  return Array.from({ length: K }, (_, k) => (F0 * gammas[k]) / gammas[0]);
}

export function amplitudes(gammas: ArrayLike<number>, K: number): number[] {
  const raw = Array.from({ length: K }, (_, k) => 1 / Math.hypot(0.5, gammas[k]));
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((a) => a / sum);
}

/** 첫 영점 진폭 배율 x^{β−½}, t초 경과 시. */
export function growthFactor(beta: number, seconds: number): number {
  return Math.min(MAX_GROWTH, Math.exp((beta - 0.5) * GROWTH_RATE * seconds));
}

function softClip(n = 2048): Float32Array<ArrayBuffer> {
  const c = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    c[i] = Math.tanh(3 * x) / Math.tanh(3);
  }
  return c;
}

export class PrimeSoundEngine {
  private ctx: AudioContext | null = null;
  private out: GainNode | null = null;
  private voices: Voice[] = [];
  private beta = 0.5;
  private startedAt = 0;
  private soloTimer: number | null = null;

  static supported(): boolean {
    return typeof window !== 'undefined' && ('AudioContext' in window || 'webkitAudioContext' in window);
  }

  private ensure(): AudioContext {
    if (!this.ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
      // voices → bus → tanh 소프트 클리핑 → master → 출력
      const shaper = this.ctx.createWaveShaper();
      shaper.curve = softClip();
      shaper.oversample = '2x';
      const master = this.ctx.createGain();
      master.gain.value = MASTER;
      this.out = this.ctx.createGain();
      this.out.connect(shaper).connect(master).connect(this.ctx.destination);
    }
    return this.ctx;
  }

  get playing(): boolean {
    return this.voices.length > 0 || this.soloTimer !== null;
  }

  /** 재생 시작 후 경과 초 (첫 영점 성장 표시용). */
  elapsed(): number {
    return this.ctx && this.playing ? this.ctx.currentTime - this.startedAt : 0;
  }

  async start(gammas: ArrayLike<number>, K: number, mode: SoundMode, beta: number) {
    this.stop();
    const ctx = this.ensure();
    if (ctx.state === 'suspended') await ctx.resume();
    this.beta = beta;
    this.startedAt = ctx.currentTime;
    const fs = frequencies(gammas, K);
    const amps = amplitudes(gammas, K);
    if (mode === 'chord') {
      this.voices = fs.map((f, k) => this.voice(f, amps[k] * 4, ctx.currentTime));
      this.applyBeta();
    } else {
      let k = 0;
      const next = () => {
        if (k >= K) {
          this.soloTimer = null;
          return;
        }
        const v = this.voice(fs[k], 0.9, ctx.currentTime);
        const end = ctx.currentTime + 0.32;
        v.gain.gain.setTargetAtTime(0, end, 0.05);
        v.osc.stop(end + 0.4);
        k++;
        this.soloTimer = window.setTimeout(next, 350);
      };
      next();
    }
  }

  /** 프롤로그 티저: 영점 음이 하나씩 들어와 화음을 이루고, seconds 뒤 사라진다. */
  async teaser(gammas: ArrayLike<number>, K: number, seconds = 5) {
    this.stop();
    const ctx = this.ensure();
    if (ctx.state === 'suspended') await ctx.resume();
    this.startedAt = ctx.currentTime;
    const fs = frequencies(gammas, K);
    const amps = amplitudes(gammas, K);
    const t0 = ctx.currentTime;
    const enter = (seconds * 0.45) / K;
    this.voices = fs.map((f, k) => {
      const v = this.voice(f, amps[k] * 4, t0 + k * enter);
      v.gain.gain.setTargetAtTime(0, t0 + seconds - 0.8, 0.25);
      v.osc.stop(t0 + seconds + 0.5);
      return v;
    });
    this.soloTimer = window.setTimeout(() => {
      this.voices = [];
      this.soloTimer = null;
    }, (seconds + 0.5) * 1000);
  }

  private voice(freq: number, amp: number, at: number): Voice {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(amp, at + FADE);
    osc.connect(gain).connect(this.out!);
    osc.start(at);
    return { osc, gain, base: amp };
  }

  /** β를 바꾸면 첫 영점 음량이 지금부터 e^{(β−½)·rate·t}로 자라기 시작한다. */
  setBeta(beta: number) {
    this.beta = beta;
    if (this.ctx) this.startedAt = this.ctx.currentTime;
    this.applyBeta();
  }

  private applyBeta() {
    const v = this.voices[0];
    if (!v || !this.ctx) return;
    const now = this.ctx.currentTime;
    const g = v.gain.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(v.base, now);
    if (this.beta !== 0.5) {
      const secs = Math.log(MAX_GROWTH) / (Math.abs(this.beta - 0.5) * GROWTH_RATE);
      g.exponentialRampToValueAtTime(v.base * growthFactor(this.beta, secs), now + secs);
    }
  }

  stop() {
    if (this.soloTimer !== null) {
      clearTimeout(this.soloTimer);
      this.soloTimer = null;
    }
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (const v of this.voices) {
      v.gain.gain.cancelScheduledValues(now);
      v.gain.gain.setTargetAtTime(0, now, 0.03);
      v.osc.stop(now + 0.2);
    }
    this.voices = [];
  }
}
