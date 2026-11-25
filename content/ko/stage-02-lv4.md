## 증명 스케치: 소수정리로 가는 길 (1896)

1. 체비쇼프 함수 $\psi(x) = \sum_{p^k \le x} \ln p$로 바꾸면 $\pi(x) \sim x/\ln x \iff \psi(x) \sim x$.
2. $-\zeta'(s)/\zeta(s) = \sum \Lambda(n) n^{-s}$ (Stage 6 Lv3 2단계).
3. 핵심: $\zeta(1 + it) \neq 0$. 즉 임계띠의 **오른쪽 가장자리**에는 영점이 없다. 아다마르와 드 라 발레 푸생이 각각 증명. 부등식 $3 + 4\cos\theta + \cos 2\theta \ge 0$을 이용하는 메르텐스의 짧은 논증이 유명합니다.
4. 타우버형 정리로 2·3에서 $\psi(x) \sim x$를 끌어냅니다.

## 계산: π(x)와 근사식 비교

```python
from mpmath import li, log
from sympy import primepi
for e in (3, 6):
    x = 10**e
    print(e, int(primepi(x)), round(x / float(log(x))), round(float(li(x) - li(2))))
```

## 더 읽을거리

- T. M. Apostol, *Introduction to Analytic Number Theory* 4장, 13장
- D. J. Newman, "Simple Analytic Proof of the Prime Number Theorem", *Amer. Math. Monthly* 87 (1980) — 가장 짧은 해석적 증명
