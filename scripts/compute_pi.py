"""π(x) 사전 계산 → public/data/pi_x.json (Stage 2 줌 그래프용).

사용: python3 scripts/compute_pi.py   (분할 체로 10^9까지, 1~2분)
- pi:    10^1..10^9 의 π(x)
- grids: d=4..9 각각 [0, 10^d]를 N등분한 점의 π(x)  (줌 배율에 맞는 격자를 골라 그린다)
- primes: 10^4 이하 소수 (작은 배율은 브라우저가 정확한 계단을 그림)
"""
import json
from pathlib import Path

import numpy as np

OUT = Path(__file__).resolve().parent.parent / "public" / "data" / "pi_x.json"
LIMIT = 10**9
N = 1000  # 격자 등분 수
SEG = 10**7


def small_primes(n: int) -> np.ndarray:
    s = np.ones(n + 1, dtype=bool)
    s[:2] = False
    for i in range(2, int(n**0.5) + 1):
        if s[i]:
            s[i * i :: i] = False
    return np.nonzero(s)[0]


def main() -> None:
    base = small_primes(int(LIMIT**0.5) + 1)
    # 질의할 점들: 10^e 와 각 격자점
    queries = {10**e for e in range(1, 10)}
    for d in range(4, 10):
        queries.update(k * 10**d // N for k in range(N + 1))
    qs = np.array(sorted(queries), dtype=np.int64)
    answers: dict[int, int] = {}

    count = 0  # [0, lo) 의 소수 개수
    qi = 0
    for lo in range(0, LIMIT + 1, SEG):
        hi = min(lo + SEG, LIMIT + 1)  # [lo, hi)
        seg = np.ones(hi - lo, dtype=bool)
        if lo == 0:
            seg[:2] = False
        for p in base:
            if p * p >= hi:
                break
            start = max(p * p, ((lo + p - 1) // p) * p)
            seg[start - lo :: p] = False
        cum = np.cumsum(seg, dtype=np.int64)  # cum[i] = [lo, lo+i] 의 소수 개수
        while qi < len(qs) and qs[qi] < hi:
            q = int(qs[qi])
            answers[q] = count + (int(cum[q - lo]) if q >= lo else 0)
            qi += 1
        count += int(cum[-1])
        if lo % 10**8 == 0:
            print(f"sieve: {lo:.0e}", flush=True)

    data = {
        "pi": {f"1e{e}": answers[10**e] for e in range(1, 10)},
        "grids": {str(d): [answers[k * 10**d // N] for k in range(N + 1)] for d in range(4, 10)},
        "gridN": N,
        "primes": [int(p) for p in small_primes(10**4)],
    }
    OUT.write_text(json.dumps(data, separators=(",", ":")))
    print("wrote", OUT, f"{OUT.stat().st_size/1024:.0f} KB")


if __name__ == "__main__":
    main()
