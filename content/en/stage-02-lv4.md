## Proof sketch: the road to the prime number theorem (1896)

1. With Chebyshev's $\psi(x) = \sum_{p^k \le x} \ln p$: $\pi(x) \sim x/\ln x \iff \psi(x) \sim x$.
2. $-\zeta'(s)/\zeta(s) = \sum \Lambda(n) n^{-s}$ (Stage 6 Lv3, Step 2).
3. Key: $\zeta(1 + it) \neq 0$ — no zeros on the **right edge** of the critical strip. Proved by Hadamard and de la Vallée Poussin; Mertens' short argument with $3 + 4\cos\theta + \cos 2\theta \ge 0$ is famous.
4. A Tauberian theorem turns 2–3 into $\psi(x) \sim x$.

## Compute: π(x) against the approximations

```python
from mpmath import li, log
from sympy import primepi
for e in (3, 6):
    x = 10**e
    print(e, int(primepi(x)), round(x / float(log(x))), round(float(li(x) - li(2))))
```

## Further reading

- T. M. Apostol, *Introduction to Analytic Number Theory*, ch. 4, 13
- D. J. Newman, "Simple Analytic Proof of the Prime Number Theorem", *Amer. Math. Monthly* 87 (1980)
