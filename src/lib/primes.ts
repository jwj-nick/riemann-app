/** 소수 관련 가벼운 계산 (브라우저용). 무거운 값은 public/data/pi_x.json 사전 계산. */

/** n 이하 각 수의 가장 작은 소인수 (0,1은 0). 체 그래픽 힌트용. */
export function smallestFactor(n: number): Int32Array {
  const spf = new Int32Array(n + 1);
  for (let i = 2; i <= n; i++) {
    if (spf[i]) continue;
    for (let m = i; m <= n; m += i) if (!spf[m]) spf[m] = i;
  }
  return spf;
}

export function primesUpTo(n: number): number[] {
  const spf = smallestFactor(n);
  const out: number[] = [];
  for (let i = 2; i <= n; i++) if (spf[i] === i) out.push(i);
  return out;
}

const EULER_GAMMA = 0.5772156649015329;
const LI2 = 1.0451637801174928; // li(2)

/** 로그적분 li(x), x > 1. 라마누잔 급수 (x ≤ 1e12 에서 상대오차 < 1e-12). */
export function li(x: number): number {
  const L = Math.log(x);
  let sum = 0;
  let term = L; // (−1)^{n−1} L^n / (n! 2^{n−1})
  let inner = 0; // Σ_{k=0}^{⌊(n−1)/2⌋} 1/(2k+1)
  for (let n = 1; n < 200; n++) {
    if (n > 1) term *= -L / (2 * n);
    if (n % 2 === 1) inner += 1 / n;
    const add = term * inner;
    sum += add;
    if (Math.abs(add) < 1e-17 * Math.abs(sum) && n > 10) break;
  }
  return EULER_GAMMA + Math.log(L) + Math.sqrt(x) * sum;
}

/** 오프셋 로그적분 Li(x) = ∫₂ˣ dt/ln t = li(x) − li(2). */
export const Li = (x: number) => li(x) - LI2;

/** 바젤 부분합 Σ_{n≤N} 1/n^s 과 소수 곱 ∏_{p≤N} 1/(1 − p^{−s}) 를 N=1..max 에 대해. */
export function basel(max: number, s: number): { sum: Float64Array; product: Float64Array } {
  const spf = smallestFactor(max);
  const sum = new Float64Array(max + 1);
  const product = new Float64Array(max + 1);
  product[0] = product[1] = 1;
  for (let n = 1; n <= max; n++) {
    sum[n] = sum[n - 1] + n ** -s;
    if (n >= 2) product[n] = spf[n] === n ? product[n - 1] / (1 - n ** -s) : product[n - 1];
  }
  return { sum, product };
}
