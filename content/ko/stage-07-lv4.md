## 증명 스케치: 폰 코흐 동치의 반대 방향

$\psi(x) - x = O(x^{\theta})$라고 하면, 부분합으로

$$
-\frac{\zeta'(s)}{\zeta(s)} - \frac{s}{s-1} = s\int_1^\infty \frac{\psi(x) - x}{x^{s+1}}\, dx
$$

의 우변이 $\mathrm{Re}(s) > \theta$에서 수렴하는 해석함수가 됩니다. 그러면 좌변도 거기서 극이 없으니, $\zeta$는 $\mathrm{Re}(s) > \theta$에 영점이 없습니다. $\theta = \tfrac12 + \varepsilon$이면 리만 가설.

## 리틀우드와 스큐스

리틀우드(1914): $\pi(x) - \mathrm{Li}(x)$는 무한히 자주 부호를 바꿉니다. 첫 부호 변화의 위치는 아직 모릅니다. 스큐스(1933)의 첫 상한은 리만 가설을 가정한 상상 밖의 수였고, 지금은 계산으로 약 $1.4 \times 10^{316}$ 근처까지 내려왔습니다(베이스·허드슨 2000 및 이후 개선).

## 계산: 첫 영점들이 선 위에 있는지 확인

```python
from mpmath import zetazero, zeta
for k in (1, 10, 100):
    r = zetazero(k)
    print(k, r.real, abs(zeta(r)) < 1e-10)
```

## 더 읽을거리

- H. von Koch, "Sur la distribution des nombres premiers", *Acta Math.* 24 (1901)
- J. E. Littlewood, "Sur la distribution des nombres premiers", *C. R. Acad. Sci. Paris* 158 (1914)
