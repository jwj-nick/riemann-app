## 증명 스케치: 오일러 곱의 수렴

$\mathrm{Re}(s) = \sigma > 1$이면 $\sum |n^{-s}| = \sum n^{-\sigma} < \infty$. $P$ 이하 소수에 대한 유한 곱을 펼치면, 소인수가 모두 $P$ 이하인 $n$들의 $n^{-s}$ 합입니다. 따라서

$$
\left| \zeta(s) - \prod_{p \le P} \frac{1}{1 - p^{-s}} \right| \le \sum_{n > P} n^{-\sigma} \to 0
$$

오일러의 $\sin x$ 무한곱은 바이어슈트라스 인수분해 정리로 엄밀해졌습니다(19세기).

## 계산: 두 수렴 속도 비교

```python
from math import pi
from sympy import primerange
N = 10**4
s = sum(1 / n**2 for n in range(1, N + 1))
prod = 1.0
for p in primerange(2, N + 1):
    prod /= 1 - p**-2
print(pi**2 / 6 - s, pi**2 / 6 - prod)   # 약 1e-4, 약 1e-5
```

## 더 읽을거리

- W. Dunham, *Euler: The Master of Us All* (1999) 3장 — 바젤 문제
- Apostol, *Introduction to Analytic Number Theory* 11장
