## Proof sketch: convergence of the Euler product

For $\mathrm{Re}(s) = \sigma > 1$, $\sum |n^{-s}| = \sum n^{-\sigma} < \infty$. Expanding the finite product over primes up to $P$ gives the sum of $n^{-s}$ over $n$ whose prime factors are all at most $P$. Hence

$$
\left| \zeta(s) - \prod_{p \le P} \frac{1}{1 - p^{-s}} \right| \le \sum_{n > P} n^{-\sigma} \to 0
$$

Euler's infinite product for $\sin x$ was made rigorous by the Weierstrass factorization theorem (19th century).

## Compute: comparing the two speeds of convergence

```python
from math import pi
from sympy import primerange
N = 10**4
s = sum(1 / n**2 for n in range(1, N + 1))
prod = 1.0
for p in primerange(2, N + 1):
    prod /= 1 - p**-2
print(pi**2 / 6 - s, pi**2 / 6 - prod)   # about 1e-4, about 1e-5
```

## Further reading

- W. Dunham, *Euler: The Master of Us All* (1999), ch. 3
- Apostol, *Introduction to Analytic Number Theory*, ch. 11
