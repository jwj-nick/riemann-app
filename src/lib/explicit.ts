/**
 * 명시공식(폰 망골트) 부분합. 원고: content/ko/stage-06-lv3-derivation.md "구현 메모".
 *   psi_K(x) = x − Σ_{k≤K} w_k · 2·Re(x^{ρ_k}/ρ_k) − log(2π) − ½·log(1 − x⁻²)
 * ρ_k = β_k + iγ_k. 가설이 참이면 β_k = ½.
 */

const LOG_2PI = Math.log(2 * Math.PI);

/** 영점 ρ=β+iγ 와 켤레 ρ̄ 가 만드는 파동 2·Re(x^ρ/ρ) (lnx = ln x). */
export function zeroWave(lnx: number, gamma: number, beta = 0.5): number {
  const xb = Math.exp(beta * lnx);
  const a = gamma * lnx;
  return (2 * xb * (beta * Math.cos(a) + gamma * Math.sin(a))) / (beta * beta + gamma * gamma);
}

/** 매끈하게 창: w_k = exp(−(γ_k/γ_K)²). */
export function smoothWeights(gammas: ArrayLike<number>, K: number): Float64Array {
  const w = new Float64Array(K);
  const gK = gammas[K - 1];
  for (let k = 0; k < K; k++) w[k] = Math.exp(-((gammas[k] / gK) ** 2));
  return w;
}

export interface PsiOptions {
  smooth?: boolean;
  /**
   * "가설이 틀린 세계": 영점 index(0-based)를 β로 옮긴다.
   * 함수방정식 대칭에 따라 1−β 짝도 함께 생기며, β=½에서 연속이 되도록 두 항에 ½씩 가중한다.
   */
  offLine?: { index: number; beta: number };
}

export function psiK(x: number, gammas: ArrayLike<number>, K: number, opts: PsiOptions = {}): number {
  const lnx = Math.log(x);
  const w = opts.smooth && K > 0 ? smoothWeights(gammas, K) : null;
  let s = x - LOG_2PI - 0.5 * Math.log(1 - 1 / (x * x));
  for (let k = 0; k < K; k++) {
    const g = gammas[k];
    let term: number;
    if (opts.offLine && opts.offLine.index === k && opts.offLine.beta !== 0.5) {
      const b = opts.offLine.beta;
      term = 0.5 * (zeroWave(lnx, g, b) + zeroWave(lnx, g, 1 - b));
    } else term = zeroWave(lnx, g);
    s -= w ? w[k] * term : term;
  }
  return s;
}

/** 여러 x에 대해 한 번에 계산 (그래프용). 가중치 계산을 한 번만 한다. */
export function psiKCurve(xs: Float64Array, gammas: ArrayLike<number>, K: number, opts: PsiOptions = {}): Float64Array {
  const out = new Float64Array(xs.length);
  const w = opts.smooth && K > 0 ? smoothWeights(gammas, K) : null;
  const off = opts.offLine && opts.offLine.beta !== 0.5 ? opts.offLine : null;
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    const lnx = Math.log(x);
    const sx = Math.sqrt(x);
    let s = x - LOG_2PI - 0.5 * Math.log(1 - 1 / (x * x));
    for (let k = 0; k < K; k++) {
      const g = gammas[k];
      let term: number;
      if (off && off.index === k) term = 0.5 * (zeroWave(lnx, g, off.beta) + zeroWave(lnx, g, 1 - off.beta));
      else {
        const a = g * lnx;
        term = (2 * sx * (0.5 * Math.cos(a) + g * Math.sin(a))) / (0.25 + g * g);
      }
      s -= w ? w[k] * term : term;
    }
    out[i] = s;
  }
  return out;
}

/** 실제 체비쇼프 ψ의 점프 목록: 소수 거듭제곱 n=p^k 와 log p. */
export function primePowerJumps(max: number): { n: number; p: number; isPrime: boolean }[] {
  const sieve = new Uint8Array(max + 1);
  const jumps: { n: number; p: number; isPrime: boolean }[] = [];
  for (let p = 2; p <= max; p++) {
    if (sieve[p]) continue;
    for (let m = p * p; m <= max; m += p) sieve[m] = 1;
    for (let n = p; n <= max; n *= p) jumps.push({ n, p, isPrime: n === p });
  }
  return jumps.sort((a, b) => a.n - b.n);
}

/** 실제 ψ(x). */
export function psiExact(x: number): number {
  let s = 0;
  for (const j of primePowerJumps(Math.floor(x))) s += Math.log(j.p);
  return s;
}
