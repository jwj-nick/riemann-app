"""ζ(s) 사전 계산 (Stage 5 제타 풍경, Stage 7 제타 나선).

사용: python3 scripts/compute_zeta.py
- public/data/zeta_grid.bin : σ∈[S0,S1], t∈[0,T1] 격자의 ζ값을 RGBA uint8로 저장.
    R = cos arg, G = sin arg, B·A = log|ζ| 16비트(상위·하위 바이트).
    행 = t (0→T1), 열 = σ (S0→S1). 음의 t는 켤레 대칭 ζ(s̄)=ζ(s)̄ 로 셰이더가 처리.
- public/data/zeta_grid.json: 격자 메타데이터
- public/data/zeta_line.json: 임계선 ζ(½+it), t∈[0, LINE_T], 간격 LINE_DT
"""
import json
import math
import struct
from pathlib import Path

from mpmath import mp, mpc, zeta

OUT = Path(__file__).resolve().parent.parent / "public" / "data"
S0, S1, W = -4.0, 5.0, 288  # σ 범위, 열 수
T1, H = 60.0, 768  # t 범위, 행 수
LOG_MIN, LOG_MAX = -9.0, 7.0  # log|ζ| 저장 범위 (자연로그)
LINE_T, LINE_DT = 100.0, 0.02


def main() -> None:
    mp.dps = 12
    buf = bytearray()
    for j in range(H):
        t = T1 * j / (H - 1)
        for i in range(W):
            s = S0 + (S1 - S0) * i / (W - 1)
            if abs(s - 1) < 1e-9 and t == 0:
                z = complex(1e6, 0)
            else:
                z = complex(zeta(mpc(s, t)))
            a = math.atan2(z.imag, z.real)
            lm = math.log(abs(z)) if z != 0 else LOG_MIN
            q = lambda v, lo, hi, top=255: max(0, min(top, round((v - lo) / (hi - lo) * top)))
            l16 = q(lm, LOG_MIN, LOG_MAX, 65535)
            buf += bytes((q(math.cos(a), -1, 1), q(math.sin(a), -1, 1), l16 >> 8, l16 & 255))
        if j % 128 == 0:
            print(f"grid row {j}/{H}", flush=True)
    (OUT / "zeta_grid.bin").write_bytes(bytes(buf))
    (OUT / "zeta_grid.json").write_text(
        json.dumps({"sigma": [S0, S1], "t": [0, T1], "width": W, "height": H, "logRange": [LOG_MIN, LOG_MAX], "channels": "cos(arg),sin(arg),log|zeta| hi,lo"})
    )

    n = int(LINE_T / LINE_DT) + 1
    re, im = [], []
    for k in range(n):
        z = complex(zeta(mpc(0.5, k * LINE_DT)))
        re.append(round(z.real, 4))
        im.append(round(z.imag, 4))
    (OUT / "zeta_line.json").write_text(json.dumps({"t0": 0, "dt": LINE_DT, "re": re, "im": im}, separators=(",", ":")))
    print("wrote zeta_grid.bin/json, zeta_line.json")


if __name__ == "__main__":
    main()
