"""Lv3 초안(content/ko/stage-0{1,2,3,4,5,7,8}-lv3.md)에 나오는 수치·항등식 검증.

사용: python3 scripts/verify_lv3_drafts.py
"""
import json
import math
from pathlib import Path

from mpmath import exp, gamma, li, log, mp, mpf, pi, quad, sin, zeta

mp.dps = 25
D = Path(__file__).resolve().parent.parent / "public" / "data"
checks: list[tuple[str, bool, str]] = []


def check(name, ok, detail=""):
    checks.append((name, bool(ok), detail))


# Stage 1
check("S1 30031 = 59·509", 2 * 3 * 5 * 7 * 11 * 13 + 1 == 30031 == 59 * 509)
check("S1 √120 이하 소수 = 2,3,5,7", [p for p in range(2, 11) if all(p % q for q in range(2, p))] == [2, 3, 5, 7])
# Stage 2
check("S2 ln10 ≈ 2.303", abs(math.log(10) - 2.303) < 5e-4, f"{math.log(10):.4f}")
pi_full = json.loads((D / "pi_x.json").read_text())
pi_x = pi_full["pi"]
Li = lambda x: li(x) - li(2)
for e, xl, L in [(6, 72382, 78627), (9, 48254942, 50849234)]:
    x = 10**e
    check(f"S2 표 x=1e{e}", round(x / math.log(x)) == xl and round(float(Li(x))) == L, f"x/lnx={x/math.log(x):.0f} Li={float(Li(x)):.0f} π={pi_x[f'1e{e}']}")
check("S2 1e9 오차 ≈ 1700", abs(float(Li(1e9)) - pi_x["1e9"] - 1700) < 50, f"{float(Li(1e9)) - pi_x['1e9']:.0f}")
# Stage 3
check("S3 (2+i)^3 = 2+11i", (2 + 1j) ** 3 == 2 + 11j)
check("S3 x=4 가 x^3=15x+4 의 해", 4**3 == 15 * 4 + 4)
check("S3 e^{iπ} = −1", abs(complex(exp(1j * pi)) + 1) < 1e-20)
# Stage 4
check("S4 ζ(2) = π²/6", abs(zeta(2) - pi**2 / 6) < mpf(10) ** -20)
check("S4 sin x/x 의 x² 계수 −1/6", abs((math.sin(1e-3) / 1e-3 - 1) / 1e-6 + 1 / 6) < 1e-6)
# Stage 5
s = mpf("0.5")
eta = sum((-1) ** (n + 1) / mpf(n) ** s for n in range(1, 200001)) - (-1) ** 200001 / (2 * mpf(200001) ** s)
check("S5 η(½) = (1−2^{½})ζ(½)", abs(eta - (1 - 2 ** (1 - s)) * zeta(s)) < 1e-5, f"η={float(eta):.6f}")
check("S5 ζ(½) ≈ −1.4604", abs(zeta(0.5) + 1.4604) < 1e-4)
for z in (mpf("0.3") + 2j, mpf("-1.7") + 5j):
    rhs = 2**z * pi ** (z - 1) * sin(pi * z / 2) * gamma(1 - z) * zeta(1 - z)
    check(f"S5 함수방정식 s={z}", abs(zeta(z) - rhs) < 1e-15)
check("S5 ζ(−2)=ζ(−4)=0", zeta(-2) == 0 and zeta(-4) == 0)
check("S5 ζ(−1) = −1/12", abs(zeta(-1) + mpf(1) / 12) < 1e-20)
# Stage 7
psi_err = []
check("S7 |x^{iγ}| = 1", abs(abs(complex(mpf(100) ** (14.1347j))) - 1) < 1e-12)
# Stage 8
g = json.loads((D / "zeros.json").read_text())["gamma"]
T = g[-1] + 0.01
NT = T / (2 * math.pi) * math.log(T / (2 * math.pi * math.e)) + 7 / 8
check("S8 N(T) 근사 vs 실제 개수", abs(NT - len(g)) < 3, f"T={T:.2f} N≈{NT:.1f}, 실제 {len(g)}")
check("S8 높이 5000 평균 간격 ≈ 0.94", abs(2 * math.pi / math.log(5000 / (2 * math.pi)) - 0.94) < 0.005)
p = lambda x: 32 / math.pi**2 * x * x * math.exp(-4 * x * x / math.pi)
check("S8 위그너: 넓이 1, 평균 1", abs(float(quad(p, [0, mp.inf])) - 1) < 1e-10 and abs(float(quad(lambda x: x * p(x), [0, mp.inf])) - 1) < 1e-10)
check("S8 포아송 P(s<¼) ≈ 22%", abs(1 - math.exp(-0.25) - 0.221) < 1e-3)
check("S8 위그너 P(s<¼) ≈ 1.6%", abs(float(quad(p, [0, 0.25])) - 0.016) < 1e-3, f"{float(quad(p, [0, 0.25])):.4f}")

q = lambda x: math.pi / 2 * x * math.exp(-math.pi * x * x / 4)
check("S8 GOE P(s<¼) = 1−e^{−π/64} ≈ 4.8%", abs(float(quad(q, [0, 0.25])) - (1 - math.exp(-math.pi / 64))) < 1e-12 and abs(1 - math.exp(-math.pi / 64) - 0.048) < 5e-4)
check("S8 GOE 위그너 원점 기울기 π/2", abs((q(1e-6) / 1e-6) - math.pi / 2) < 1e-6)
check("S8 GUE 위그너 원점 계수 32/π²", abs(p(1e-4) / 1e-8 - 32 / math.pi**2) < 1e-4)
sp = json.loads((D / "spacings.json").read_text())
nuc = sp.get("nuclear", [])
check("S8 우라늄 P(s<¼) ≈ 4.9%", nuc and abs(sum(v < 0.25 for v in nuc) / len(nuc) - 0.049) < 0.005, f"n={len(nuc)}")

Lam = lambda z: pi ** (-z / 2) * gamma(z / 2) * zeta(z)
check("Lv4 S5 Λ(s) = Λ(1−s)", abs(Lam(mpf("0.3") + 4.1j) - Lam(1 - (mpf("0.3") + 4.1j))) < 1e-15)

viol = 0
for dd, gr in pi_full["grids"].items():
    for kk in range(1, pi_full["gridN"] + 1):
        x = kk * 10 ** int(dd) // pi_full["gridN"]
        if x >= 2657 and abs(gr[kk] - float(li(x))) > math.sqrt(x) * math.log(x) / (8 * math.pi):
            viol += 1
check("S2 쇤펠트 한계 |π−li| < √x·ln x/8π (격자 전부)", viol == 0, f"위반 {viol}")
s4 = mpf(2)
from sympy import primerange
prod = 1.0
for p_ in primerange(2, 1001):
    prod *= 1 - p_**-2
check("S4 오일러의 체: ζ(2)·∏_{p≤1000}(1−p⁻²) ≈ 1", abs(float(zeta(2)) * prod - 1) < 2e-4, f"{float(zeta(2)) * prod:.6f}")

for name, ok, detail in checks:
    print(("PASS " if ok else "FAIL ") + name + (f"  ({detail})" if detail else ""))
bad = [c for c in checks if not c[1]]
print(f"{len(checks) - len(bad)}/{len(checks)} PASS")
raise SystemExit(1 if bad else 0)
