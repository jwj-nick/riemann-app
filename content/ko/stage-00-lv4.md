## 더 읽을거리

- E. Bombieri, "Problems of the Millennium: the Riemann Hypothesis", Clay Mathematics Institute 공식 문제 설명 (2000)
- J. B. Conrey, "The Riemann Hypothesis", *Notices of the AMS* 50(3), 2003 — 전문가가 일반 수학자에게 쓴 개관
- J. Derbyshire, *Prime Obsession* (2003) — 교양서. 수식 장과 역사 장이 번갈아 나옴
- B. Mazur, W. Stein, *Prime Numbers and the Riemann Hypothesis* (2016) — 그림 중심, 이 앱과 가장 가까운 책

## 이 앱의 소리 직접 만들기

```python
# 첫 영점 5개의 높이 → 음 높이 (f = 220 Hz × γ/γ₁)
from mpmath import zetazero
g = [float(zetazero(k).imag) for k in range(1, 6)]
print([round(220 * x / g[0], 1) for x in g])
```
