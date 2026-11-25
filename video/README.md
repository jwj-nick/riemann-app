# video/ — Manim 쇼츠 (M6 파일럿)

앱과 같은 데이터(`public/data/*.json`)와 같은 공식을 쓰는 세로형(9:16) 쇼츠 스크립트.

| 파일 | 내용 | 길이 |
|---|---|---|
| `explicit_formula_short.py` | 영점 1 → 10 → 100 → 1000개를 더하며 소수 계단이 나타나는 장면 (Stage 6) | 약 25초 |

## 렌더
```bash
pip install manim            # 시스템 파이썬에서 실패하면 venv 사용 (srt 빌드 문제)
manim -qm video/explicit_formula_short.py ExplicitFormulaShort   # 720p 미리보기
manim -qh video/explicit_formula_short.py ExplicitFormulaShort   # 1080x1920 최종
```
LaTeX 없이 동작하도록 `Text`만 쓴다. 한글 폰트는 스크립트의 `FONT` 상수(기본 WenQuanYi Zen Hei)를 환경에 맞게 바꾼다.
렌더 결과(mp4)는 레포에 커밋하지 않는다.
