"""public/data/*.json 검증: 알려진 영점 값(Odlyzko 표)·π(x) 값과 대조한다.

사용: python3 scripts/verify_data.py
"""
import json
import sys
from pathlib import Path

D = Path(__file__).resolve().parent.parent / "public" / "data"
KNOWN_ZEROS = {1: 14.134725142, 2: 21.022039639, 3: 25.010857580, 10: 49.773832478, 100: 236.524229666, 1000: 1419.422480946}
KNOWN_PI = {"1e1": 4, "1e2": 25, "1e3": 168, "1e4": 1229, "1e5": 9592, "1e6": 78498, "1e7": 664579}

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
print("PASS" if ok else "FAIL")
sys.exit(0 if ok else 1)
