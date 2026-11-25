# Stage 4 · Lv3 — The bridge between sums and products

## Step 1 · The Euler product

**Conclusion**: For $\mathrm{Re}(s) > 1$,

$$
\zeta(s) = \sum_{n=1}^\infty \frac{1}{n^s} = \prod_{p}\frac{1}{1 - p^{-s}}
$$

Expand each prime's factor as a geometric series:

$$
\frac{1}{1-p^{-s}} = 1 + \frac{1}{p^s} + \frac{1}{p^{2s}} + \cdots
$$

Multiplying over all primes gives the sum of all products $\dfrac{1}{(p_1^{a_1}p_2^{a_2}\cdots)^s}$ formed by picking one term per prime. Thanks to unique factorization, every $n$ appears **exactly once**.

**Predict**: "What if some number had two different factorizations?" → That $n$ would be counted twice and the identity would break.
**Hints**: Expanding Euler's product, each n comes from 'one combination of primes'. || If there were two combinations, how many times would that n be added?

## Step 2 · The Basel problem $\zeta(2) = \pi^2/6$ (Euler's idea)

**Conclusion**: "Factor" the sine function by its zeros and the answer drops out.

The zeros of $\sin x$ are $0, \pm\pi, \pm2\pi, \dots$. Euler wrote, as for a polynomial,

$$
\frac{\sin x}{x} = \left(1 - \frac{x^2}{\pi^2}\right)\left(1 - \frac{x^2}{4\pi^2}\right)\left(1 - \frac{x^2}{9\pi^2}\right)\cdots
$$

Comparing the series $1 - \dfrac{x^2}{6} + \cdots$ with the $x^2$ coefficient $-\dfrac{1}{\pi^2}\sum \dfrac{1}{n^2}$ on the right gives $\sum \dfrac{1}{n^2} = \dfrac{\pi^2}{6}$.

**Intuition**: "Write a function through its zeros" — this idea returns 120 years later in Riemann's hands, as the explicit formula of Stage 6.

## Step 3 · Another proof that the primes are infinite

**Conclusion**: As $s \to 1$ the left side $\sum 1/n$ diverges. With finitely many primes the right side would be a finite product and could not diverge.

**Graphic link**: In the partial sums graph, the sum (blue) and the prime product (orange) approach the same value $\pi^2/6$ — the visible form of this identity. The product converges faster.
