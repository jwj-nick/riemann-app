## 증명 스케치: 페론 공식과 경로 이동

$c > 1$에서

$$
\psi(x) = \frac{1}{2\pi i}\int_{c - i\infty}^{c + i\infty} \left(-\frac{\zeta'(s)}{\zeta(s)}\right) \frac{x^s}{s}\, ds
$$

(Lv3 3단계). 적분 경로를 왼쪽으로 옮기면 지나치는 극마다 유수가 남습니다: $s=1$에서 $x$, 영점 $\rho$마다 $-x^\rho/\rho$, $s=0$에서 $-\ln 2\pi$, 자명한 영점들에서 $-\tfrac12\ln(1-x^{-2})$. 엄밀하게는 높이 $T$에서 잘라 수평 선분의 적분이 $T \to \infty$에서 사라짐을 보여야 하고, 여기에 영점 개수 $N(T) \approx \frac{T}{2\pi}\ln\frac{T}{2\pi e}$가 쓰입니다.

## 계산: 명시공식 부분합

```python
from mpmath import zetazero, log, pi, re, mpf
zs = [zetazero(k) for k in range(1, 51)]
x = mpf('100.5')
psi_k = x - log(2 * pi) - log(1 - x**-2) / 2 - sum(2 * re(x**r / r) for r in zs)
print(psi_k)   # 실제 ψ(100.5) = 94.045…
```

## 더 읽을거리

- H. Davenport, *Multiplicative Number Theory* 17~19장
- Edwards, *Riemann's Zeta Function* 3장 (폰 망골트의 증명)
