"""Stage 8 간격 통계 데이터 → public/data/spacings.json

사용: python3 scripts/compute_spacings.py   (zeros.json 필요)
- zeta:    제타 영점의 정규화 간격 δ_n = (γ_{n+1} − γ_n) · log(γ_n / 2π) / 2π  (평균 1)
- gue:     GUE 무작위 행렬 고유값 간격 (반원 법칙으로 펼친 뒤 중앙부, 평균 1로 정규화)
- poisson: 완전 무작위 점(균일 분포)의 간격, 평균 1
비교 곡선은 브라우저가 그린다: GUE Wigner surmise p(s) = (32/π²) s² e^{−4s²/π}, 포아송 e^{−s}.
"""
import json
import math
import os

os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")  # 스레드 경합으로 매우 느려지는 것 방지
from pathlib import Path

import numpy as np  # noqa: E402

D = Path(__file__).resolve().parent.parent / "public" / "data"
rng = np.random.default_rng(1859)


def gue_spacings(n: int = 400, trials: int = 40) -> np.ndarray:
    out = []
    for _ in range(trials):
        a = rng.normal(size=(n, n)) + 1j * rng.normal(size=(n, n))
        h = (a + a.conj().T) / 2
        ev = np.linalg.eigvalsh(h)
        # 반원 법칙 밀도로 펼치기: 고유값 반경 R = sqrt(2n) (이 정규화에서)
        r = math.sqrt(2 * n)
        x = np.clip(ev / r, -1, 1)
        unfolded = n * (0.5 + (x * np.sqrt(1 - x**2) + np.arcsin(x)) / math.pi)  # 누적 밀도
        mid = unfolded[n // 4 : 3 * n // 4]  # 가장자리 제외
        out.append(np.diff(mid))
    s = np.concatenate(out)
    return s / s.mean()


def main() -> None:
    g = np.array(json.loads((D / "zeros.json").read_text())["gamma"])
    zeta = np.diff(g) * np.log(g[:-1] / (2 * math.pi)) / (2 * math.pi)
    zeta = zeta / zeta.mean()
    gue = gue_spacings()
    pts = np.sort(rng.uniform(0, 1, size=len(zeta) + 1))
    poisson = np.diff(pts) * len(zeta)
    r4 = lambda a: [round(float(v), 4) for v in a]
    data = {"zeta": r4(zeta), "gue": r4(gue[: len(zeta)]), "poisson": r4(poisson), "zerosUsed": len(g)}
    (D / "spacings.json").write_text(json.dumps(data, separators=(",", ":")))
    for k in ("zeta", "gue", "poisson"):
        a = np.array(data[k])
        print(f"{k}: n={len(a)} mean={a.mean():.3f} var={a.var():.3f} P(s<0.25)={np.mean(a < 0.25):.3f}")
    print("기대: GUE var≈0.178, P(s<0.25)≈0.014 / 포아송 var≈1, P(s<0.25)≈0.221")


if __name__ == "__main__":
    main()
