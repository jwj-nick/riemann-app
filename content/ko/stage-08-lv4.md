## 몽고메리 정리의 정확한 내용

리만 가설을 가정하면, 푸리에 변환이 구간 $(-1, 1)$ 밖에서 0인 테스트 함수에 대해 영점 쌍의 (정규화) 상관이 $1 - (\sin \pi u/\pi u)^2$로 계산한 값과 같아집니다. 모든 테스트 함수에 대한 일치(몽고메리 추측)는 여전히 추측입니다.

## 계산: 작은 GUE 실험

```python
import numpy as np
rng = np.random.default_rng(0)
n = 200
a = rng.normal(size=(n, n)) + 1j * rng.normal(size=(n, n))
ev = np.linalg.eigvalsh((a + a.conj().T) / 2)
mid = np.diff(ev[n // 4 : 3 * n // 4])
s = mid / mid.mean()
print(round(float(np.mean(s < 0.25)), 3))   # 0.01~0.03 근처
```

## 더 읽을거리

- H. L. Montgomery, "The pair correlation of zeros of the zeta function", *Proc. Sympos. Pure Math.* 24 (1973)
- A. M. Odlyzko, "On the distribution of spacings between zeros of the zeta function", *Math. Comp.* 48 (1987)
- O. Bohigas, M.-J. Giannoni, C. Schmit, *Phys. Rev. Lett.* 52 (1984) — 혼돈계와 무작위 행렬
- M. V. Berry, J. P. Keating, "The Riemann zeros and eigenvalue asymptotics", *SIAM Review* 41 (1999)
- 데이터: JEFF-3.3 평가 핵데이터(OECD/NEA) U-238 공명 매개변수
