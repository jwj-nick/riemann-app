## Proof sketch: the other direction of von Koch's equivalence

If $\psi(x) - x = O(x^{\theta})$, partial summation gives

$$
-\frac{\zeta'(s)}{\zeta(s)} - \frac{s}{s-1} = s\int_1^\infty \frac{\psi(x) - x}{x^{s+1}}\, dx
$$

whose right side is analytic for $\mathrm{Re}(s) > \theta$. So the left side has no poles there, and $\zeta$ has no zeros with $\mathrm{Re}(s) > \theta$. With $\theta = \tfrac12 + \varepsilon$ this is the Riemann hypothesis.

## Littlewood and Skewes

Littlewood (1914): $\pi(x) - \mathrm{Li}(x)$ changes sign infinitely often. Where the first change happens is still unknown. Skewes' first bound (1933) assumed RH and was unimaginably large; computations have since brought it down to around $1.4 \times 10^{316}$ (Bays–Hudson 2000 and later improvements).

## Compute: check that the first zeros lie on the line

```python
from mpmath import zetazero, zeta
for k in (1, 10, 100):
    r = zetazero(k)
    print(k, r.real, abs(zeta(r)) < 1e-10)
```

## Further reading

- H. von Koch, "Sur la distribution des nombres premiers", *Acta Math.* 24 (1901)
- J. E. Littlewood, "Sur la distribution des nombres premiers", *C. R. Acad. Sci. Paris* 158 (1914)
