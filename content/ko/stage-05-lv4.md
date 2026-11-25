## 증명 스케치: 함수방정식 (리만의 두 번째 증명)

세타 함수 $\theta(t) = \sum_{n \in \mathbb{Z}} e^{-\pi n^2 t}$는 푸아송 합 공식으로 $\theta(1/t) = \sqrt{t}\,\theta(t)$를 만족합니다. 멜린 변환을 쓰면

$$
\pi^{-s/2}\Gamma(s/2)\zeta(s) = \int_0^\infty \frac{\theta(t) - 1}{2}\, t^{s/2 - 1}\, dt
$$

이고, 적분을 $t = 1$에서 둘로 나눠 $\theta$의 대칭을 쓰면 우변이 $s \leftrightarrow 1 - s$에 대해 대칭인 식이 됩니다. 즉 $\Lambda(s) = \pi^{-s/2}\Gamma(s/2)\zeta(s)$라 두면 $\Lambda(s) = \Lambda(1-s)$. 여기에 $\tfrac12 s(s-1)$을 곱해 극을 없앤 것이 리만의 $\xi(s)$입니다.

## 계산: 연속된 값들

```python
from mpmath import zeta, mpf
print(zeta(-1), zeta(-2), zeta(0), zeta(mpf('0.5')))   # -1/12, 0, -1/2, -1.4603…
```

## 더 읽을거리

- B. Riemann, "Ueber die Anzahl der Primzahlen unter einer gegebenen Grösse" (1859) — 8쪽짜리 원 논문. 영역본은 Edwards 책 부록
- H. M. Edwards, *Riemann's Zeta Function* (1974) 1장
- E. C. Titchmarsh, *The Theory of the Riemann Zeta-Function* 2판 (D. R. Heath-Brown 개정, 1986) 2장
