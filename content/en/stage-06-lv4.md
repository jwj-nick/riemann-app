## Proof sketch: Perron's formula and moving the path

For $c > 1$,

$$
\psi(x) = \frac{1}{2\pi i}\int_{c - i\infty}^{c + i\infty} \left(-\frac{\zeta'(s)}{\zeta(s)}\right) \frac{x^s}{s}\, ds
$$

(Lv3, Step 3). Moving the path left leaves a residue at each pole passed: $x$ at $s=1$, $-x^\rho/\rho$ at each zero, $-\ln 2\pi$ at $s=0$, and $-\tfrac12\ln(1-x^{-2})$ from the trivial zeros. Rigorously one truncates at height $T$ and shows the horizontal segments vanish as $T \to \infty$, using the zero count $N(T) \approx \frac{T}{2\pi}\ln\frac{T}{2\pi e}$.

## Compute: partial sums of the explicit formula

```python
from mpmath import zetazero, log, pi, re, mpf
zs = [zetazero(k) for k in range(1, 51)]
x = mpf('100.5')
psi_k = x - log(2 * pi) - log(1 - x**-2) / 2 - sum(2 * re(x**r / r) for r in zs)
print(psi_k)   # actual ψ(100.5) = 94.045…
```

## Further reading

- H. Davenport, *Multiplicative Number Theory*, ch. 17–19
- Edwards, *Riemann's Zeta Function*, ch. 3 (von Mangoldt's proof)
