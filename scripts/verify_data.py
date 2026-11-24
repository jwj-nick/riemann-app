"""public/data/*.json 검증: 알려진 영점 값(Odlyzko 표)·π(x) 값과 대조한다.

사용: python3 scripts/verify_data.py
"""
import json
import sys
from pathlib import Path

D = Path(__file__).resolve().parent.parent / "public" / "data"
KNOWN_ZEROS = {1: 14.134725142, 2: 21.022039639, 3: 25.010857580, 10: 49.773832478, 100: 236.524229666, 1000: 1419.422480946}
KNOWN_PI = {"1e1": 4, "1e2": 25, "1e3": 168, "1e4": 1229, "1e5": 9592, "1e6": 78498, "1e7": 664579, "1e8": 5761455, "1e9": 50847534}

zeros = json.loads((D / "zeros.json").read_text())["gamma"]
pi = json.loads((D / "pi_x.json").read_text())
ok = True
print("k | 계산 γ_k | 기준값 | 차이")
for k, ref in KNOWN_ZEROS.items():
    if k > len(zeros):
        continue
    d = abs(zeros[k - 1] - ref)
    ok &= d < 1e-8
    print(f"{k} | {zeros[k-1]:.9f} | {ref:.9f} | {d:.1e}")
mono = all(a < b for a, b in zip(zeros, zeros[1:]))
ok &= mono
print(f"영점 {len(zeros)}개, 단조 증가: {mono}")
print("x | π(x) | 기준값")
for x, ref in KNOWN_PI.items():
    ok &= pi["pi"][x] == ref
    print(f"{x} | {pi['pi'][x]} | {ref}")
# 격자 값: 단조 증가, 끝점 = 10^d 값, 작은 격자는 소수 목록으로 직접 대조
N = pi["gridN"]
for d, g in pi["grids"].items():
    ok &= all(a <= b for a, b in zip(g, g[1:])) and g[-1] == pi["pi"][f"1e{d}"]
primes = pi["primes"]
g4 = pi["grids"]["4"]
direct = all(g4[k] == sum(1 for p in primes if p <= k * 10**4 // N) for k in range(0, N + 1, 50))
ok &= direct
print(f"격자 d=4..9 단조·끝점 일치, d=4 직접 대조: {direct}")
# 제타 데이터 (compute_zeta.py)
import math
line = json.loads((D / "zeta_line.json").read_text())
z0 = complex(line["re"][0], line["im"][0])
ok_line = abs(z0 - (-1.4603545)) < 1e-3
for k in (1, 2, 3):
    i = round(zeros[k - 1] / line["dt"])
    m = min(abs(complex(line["re"][j], line["im"][j])) for j in (i - 1, i, i + 1))
    ok_line &= m < 0.02
print(f"zeta_line: ζ(½) = {z0.real:.4f} (기준 −1.4604), 첫 3개 영점에서 |ζ| < 0.02: {ok_line}")
meta = json.loads((D / "zeta_grid.json").read_text())
raw = (D / "zeta_grid.bin").read_bytes()
W, Hh = meta["width"], meta["height"]
lo, hi = meta["logRange"]
def grid_abs(sig):
    i = round((sig - meta["sigma"][0]) / (meta["sigma"][1] - meta["sigma"][0]) * (W - 1))
    px = raw[4 * i : 4 * i + 4]
    s_actual = meta["sigma"][0] + (meta["sigma"][1] - meta["sigma"][0]) * i / (W - 1)
    return s_actual, math.exp(lo + (hi - lo) * (px[2] * 256 + px[3]) / 65535), (px[0] / 255 * 2 - 1)
s2, a2, c2 = grid_abs(2.0)
ok_grid = abs(s2 - 2) < 0.02 and abs(a2 - math.pi**2 / 6) < 0.05 and c2 > 0.99
print(f"zeta_grid: |ζ({s2:.3f})| = {a2:.4f} (기준 ≈ π²/6 = 1.6449), 양의 실수: {c2 > 0.99}")
ok &= ok_line and ok_grid
print("PASS" if ok else "FAIL")
sys.exit(0 if ok else 1)
