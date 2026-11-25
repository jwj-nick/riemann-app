## Proof sketch: the functional equation (Riemann's second proof)

The theta function $\theta(t) = \sum_{n \in \mathbb{Z}} e^{-\pi n^2 t}$ satisfies $\theta(1/t) = \sqrt{t}\,\theta(t)$ by Poisson summation. A Mellin transform gives

$$
\pi^{-s/2}\Gamma(s/2)\zeta(s) = \int_0^\infty \frac{\theta(t) - 1}{2}\, t^{s/2 - 1}\, dt
$$

Split the integral at $t = 1$ and use the symmetry of $\theta$: the right side becomes symmetric under $s \leftrightarrow 1 - s$. So with $\Lambda(s) = \pi^{-s/2}\Gamma(s/2)\zeta(s)$, $\Lambda(s) = \Lambda(1-s)$. Multiplying by $\tfrac12 s(s-1)$ to remove the poles gives Riemann's $\xi(s)$.

## Compute: continued values

```python
from mpmath import zeta, mpf
print(zeta(-1), zeta(-2), zeta(0), zeta(mpf('0.5')))   # -1/12, 0, -1/2, -1.4603…
```

## Further reading

- B. Riemann, "Ueber die Anzahl der Primzahlen unter einer gegebenen Grösse" (1859) — English translation in Edwards' book
- H. M. Edwards, *Riemann's Zeta Function* (1974), ch. 1
- E. C. Titchmarsh, *The Theory of the Riemann Zeta-Function*, 2nd ed. (rev. D. R. Heath-Brown, 1986), ch. 2
