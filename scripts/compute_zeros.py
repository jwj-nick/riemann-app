"""제타 영점 허수부와 π(x) 데이터를 사전 계산해 public/data/*.json으로 저장한다.

사용: python3 scripts/compute_zeros.py [영점 개수, 기본 1000]
- public/data/zeros.json : 첫 N개 영점의 허수부 γ_k (ρ_k = ½ + iγ_k), 소수점 9자리
- public/data/pi_x.json  : 10^1..10^7 의 π(x), 그리고 10^4 이하 소수 목록
"""
import json
import sys
from pathlib import Path

from mpmath import mp, zetazero

OUT = Path(__file__).resolve().parent.parent / "public" / "data"


def sieve(n: int) -> list[int]:
    is_p = bytearray([1]) * (n + 1)
    is_p[0:2] = b"\x00\x00"
    for i in range(2, int(n**0.5) + 1):
        if is_p[i]:
            is_p[i * i :: i] = bytearray(len(range(i * i, n + 1, i)))
    return [i for i in range(n + 1) if is_p[i]]


def main() -> None:
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 1000
    mp.dps = 20
    gammas = []
    for k in range(1, n + 1):
        gammas.append(round(float(zetazero(k).imag), 9))
        if k % 100 == 0:
            print(f"zeros: {k}/{n}", flush=True)
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "zeros.json").write_text(
        json.dumps({"source": "mpmath.zetazero", "count": n, "gamma": gammas}, separators=(",", ":"))
    )

    primes = sieve(10**7)
    pi_x = {f"1e{e}": sum(1 for p in primes if p <= 10**e) for e in range(1, 8)}
    (OUT / "pi_x.json").write_text(
        json.dumps({"pi": pi_x, "primes": [p for p in primes if p <= 10**4]}, separators=(",", ":"))
    )
    print("wrote", OUT / "zeros.json", OUT / "pi_x.json")


if __name__ == "__main__":
    main()
