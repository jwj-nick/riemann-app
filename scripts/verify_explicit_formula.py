"""Stage 6 Lv3 검증: 명시공식 부분합 psi_K(x)가 실제 psi(x)에 수렴하는지 확인한다.

psi_K(x) = x - sum_{k<=K} 2 Re(x^rho_k / rho_k) - log(2 pi) - 1/2 log(1 - x^-2)

사용: python3 scripts/verify_explicit_formula.py
"""
import math

from mpmath import log, mp, mpf, pi, re, zetazero

mp.dps = 20


def psi(x: float) -> float:
    """체비쇼프 함수: x 이하 소수 거듭제곱 p^k마다 log p를 더한다."""
    total = 0.0
    for n in range(2, int(x) + 1):
        m, p = n, next(q for q in range(2, n + 1) if n % q == 0)
        while m % p == 0:
            m //= p
        if m == 1:
            total += math.log(p)
    return total


def psi_k(x: float, zeros, k: int) -> float:
    x = mpf(x)
    s = x - log(2 * pi) - log(1 - x**-2) / 2
    s -= sum(2 * re(x**rho / rho) for rho in zeros[:k])
    return float(s)


if __name__ == "__main__":
    zeros = [zetazero(k) for k in range(1, 201)]
    ks = [0, 1, 10, 50, 200]
    print("x | 실제 psi(x) | " + " | ".join(f"K={k}" for k in ks))
    for x in [10.5, 100.5, 1000.5]:
        row = [f"{psi_k(x, zeros, k):.3f}" for k in ks]
        print(f"{x} | {psi(x):.4f} | " + " | ".join(row))
