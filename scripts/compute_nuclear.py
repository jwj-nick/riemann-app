"""원자핵 에너지 준위 간격 (Stage 8) → public/data/spacings.json 의 "nuclear" 항목 추가

사용: python3 scripts/compute_nuclear.py   (compute_spacings.py 다음에 실행)
데이터: JEFF-3.3 평가 핵데이터(OECD/NEA, 공개)의 U-238 파일, MF=2 MT=151 분해 공명 매개변수.
  NJOY2016 저장소의 테스트 자료(tests/resources/J33U238)를 커밋 고정 URL로 받는다.
  - 0~10 keV 의 s파(L=0) 공명만 사용: 모두 J^π = 1/2^+ 인 '한 종류' 준위 열 (473개)
  - 에너지 구간 겹침(외부 공명) 제거: 각 구간 [EL, EH) 안의 공명만
  - 평균 간격이 이 구간에서 거의 일정(≈21 eV)하므로 평균으로 나눠 정규화
중성자 공명은 시간 반전 대칭이 있어 GOE(위그너: (π/2) s e^{−πs²/4})를 따른다. 제타 영점은 GUE.
"""
import json
import math
import urllib.request
import warnings
from pathlib import Path

import numpy as np

D = Path(__file__).resolve().parent.parent / "public" / "data"
URL = "https://raw.githubusercontent.com/njoy/NJOY2016/ab27c6414a0f25b173f2b637e6dc7e428fdaff00/tests/resources/J33U238"
CACHE = Path(__file__).resolve().parent / ".cache" / "J33U238"


def main() -> None:
    import endf  # pip install endf

    if not CACHE.exists():
        CACHE.parent.mkdir(exist_ok=True)
        urllib.request.urlretrieve(URL, CACHE)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        mat = endf.Material(str(CACHE))
    ranges = mat.section_data[2, 151]["isotopes"][0]["ranges"]
    levels = set()
    for r in ranges:
        if r.get("LRU") != 1:
            continue
        for sec in r["sections"]:
            if sec["L"] != 0:
                continue
            for e, j in zip(sec["ER"], sec["AJ"]):
                if r["EL"] <= e < r["EH"] and e > 0:
                    assert abs(j - 0.5) < 1e-9
                    levels.add(float(e))
    E = np.array(sorted(levels))
    s = np.diff(E)
    s = s / s.mean()
    p_small = float(np.mean(s < 0.25))
    print(f"U-238 s파 공명 {len(E)}개 ({E[0]:.2f} ~ {E[-1]:.1f} eV), 평균 간격 {np.diff(E).mean():.2f} eV")
    print(f"정규화 간격 var={s.var():.3f}, P(s<¼)={p_small:.3f}  (GOE 위그너: var≈0.273, P≈{1 - math.exp(-math.pi / 64):.3f})")
    data = json.loads((D / "spacings.json").read_text())
    data["nuclear"] = [round(float(v), 4) for v in s]
    data["nuclearSource"] = "JEFF-3.3 U-238, s-wave (J=1/2+) resonances 0-10 keV"
    (D / "spacings.json").write_text(json.dumps(data, separators=(",", ":")))
    print("wrote spacings.json (nuclear)")


if __name__ == "__main__":
    main()
