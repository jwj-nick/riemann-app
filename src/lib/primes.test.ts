import { describe, expect, it } from 'vitest';
import { Li, basel, li, primesUpTo, smallestFactor } from './primes';

describe('primes', () => {
  it('π(1000) = 168, 가장 작은 소인수', () => {
    expect(primesUpTo(1000).length).toBe(168);
    const spf = smallestFactor(100);
    expect([spf[2], spf[9], spf[91], spf[97]]).toEqual([2, 3, 7, 97]);
  });
  it('li, Li (mpmath 대조)', () => {
    const ref: [number, number][] = [
      [10, 6.1655995047872979],
      [100, 30.126141584079630],
      [1e4, 1246.1372158993885],
      [1e6, 78627.549159462182],
      [1e9, 50849234.957001798],
    ];
    for (const [x, v] of ref) expect(li(x) / v).toBeCloseTo(1, 11);
    expect(Li(1e9)).toBeCloseTo(50849233.911838018, 3);
  });
  it('바젤: 덧셈과 소수 곱 모두 π²/6 로', () => {
    const { sum, product } = basel(100000, 2);
    expect(sum[100000]).toBeCloseTo(Math.PI ** 2 / 6, 4);
    expect(product[100000]).toBeCloseTo(Math.PI ** 2 / 6, 4);
    expect(basel(1000, 4).sum[1000]).toBeCloseTo(Math.PI ** 4 / 90, 8);
  });
});
