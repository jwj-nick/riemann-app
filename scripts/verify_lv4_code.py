"""Lv4 원고(content/{ko,en}/stage-*-lv4.md)의 ```python 코드 블록을 모두 실행해 본다.

사용: python3 scripts/verify_lv4_code.py   (mpmath, numpy, sympy 필요)
각 블록의 출력을 보여 주고, 예외가 나면 실패로 센다.
"""
import contextlib
import io
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
fails = 0
for f in sorted((ROOT / "content").glob("*/stage-*-lv4.md")):
    for i, code in enumerate(re.findall(r"```python\n(.*?)```", f.read_text(), re.S)):
        buf = io.StringIO()
        try:
            with contextlib.redirect_stdout(buf):
                exec(compile(code, f"{f.name}#{i}", "exec"), {})
            print(f"PASS {f.parent.name}/{f.name}#{i}: {buf.getvalue().strip()[:160]}")
        except Exception as e:  # noqa: BLE001
            fails += 1
            print(f"FAIL {f.parent.name}/{f.name}#{i}: {e!r}")
print("FAIL" if fails else "ALL PASS")
sys.exit(1 if fails else 0)
