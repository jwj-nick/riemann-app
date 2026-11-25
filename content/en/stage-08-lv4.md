## What Montgomery actually proved

Assuming RH, for test functions whose Fourier transform vanishes outside $(-1, 1)$, the (normalized) pair correlation of zeros gives the same value as computed with $1 - (\sin \pi u/\pi u)^2$. Agreement for all test functions (Montgomery's conjecture) is still open.

## Compute: a small GUE experiment

```python
import numpy as np
rng = np.random.default_rng(0)
n = 200
a = rng.normal(size=(n, n)) + 1j * rng.normal(size=(n, n))
ev = np.linalg.eigvalsh((a + a.conj().T) / 2)
mid = np.diff(ev[n // 4 : 3 * n // 4])
s = mid / mid.mean()
print(round(float(np.mean(s < 0.25)), 3))   # around 0.01–0.03
```

## Further reading

- H. L. Montgomery, "The pair correlation of zeros of the zeta function", *Proc. Sympos. Pure Math.* 24 (1973)
- A. M. Odlyzko, "On the distribution of spacings between zeros of the zeta function", *Math. Comp.* 48 (1987)
- O. Bohigas, M.-J. Giannoni, C. Schmit, *Phys. Rev. Lett.* 52 (1984)
- M. V. Berry, J. P. Keating, "The Riemann zeros and eigenvalue asymptotics", *SIAM Review* 41 (1999)
- Data: JEFF-3.3 evaluated nuclear data (OECD/NEA), U-238 resonance parameters
