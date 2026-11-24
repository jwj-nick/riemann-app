import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { psiExact, psiK, psiKCurve } from './explicit';

const { gamma } = JSON.parse(readFileSync('public/data/zeros.json', 'utf8')) as { gamma: number[] };

// 기대값: scripts/verify_explicit_formula.py (mpmath) 출력 = 원고 수치표
const table: [number, number, Record<number, number>][] = [
  [10.5, 7.832, { 0: 8.667, 1: 8.227, 10: 7.702, 50: 7.975, 200: 7.847 }],
  [100.5, 94.0453, { 0: 98.662, 1: 97.67, 10: 95.776, 50: 94.905, 200: 93.91 }],
  [1000.5, 996.6809, { 0: 998.662, 1: 999.951, 10: 997.77, 50: 994.733, 200: 996.048 }],
];

describe('명시공식 (mpmath 대조)', () => {
  it('실제 ψ(x)', () => {
    for (const [x, psi] of table) expect(psiExact(x)).toBeCloseTo(psi, 3);
  });
  it('psi_K(x) 부분합', () => {
    for (const [x, , byK] of table)
      for (const [K, v] of Object.entries(byK)) expect(psiK(x, gamma, Number(K))).toBeCloseTo(v, 2);
  });
  it('곡선 버전 = 단일 버전', () => {
    const xs = Float64Array.from([10.5, 100.5, 1000.5]);
    const c = psiKCurve(xs, gamma, 1000, { smooth: true, offLine: { index: 0, beta: 0.7 } });
    xs.forEach((x, i) => expect(c[i]).toBeCloseTo(psiK(x, gamma, 1000, { smooth: true, offLine: { index: 0, beta: 0.7 } }), 8));
  });
  it('β=½ 에서 연속', () => {
    expect(psiK(50.5, gamma, 10, { offLine: { index: 0, beta: 0.5 + 1e-9 } })).toBeCloseTo(psiK(50.5, gamma, 10), 6);
  });
});
