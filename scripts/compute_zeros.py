"""제타 영점 허수부를 사전 계산해 public/data/zeros.json으로 저장한다.

사용: python3 scripts/compute_zeros.py [영점 개수, 기본 1000]
- public/data/zeros.json : 첫 N개 영점의 허수부 γ_k (ρ_k = ½ + iγ_k), 소수점 9자리
(π(x) 데이터는 scripts/compute_pi.py)
"""
import json
import sys
from pathlib import Path

from mpmath import mp, zetazero

OUT = Path(__file__).resolve().parent.parent / "public" / "data"


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

    print("wrote", OUT / "zeros.json")


if __name__ == "__main__":
    main()
