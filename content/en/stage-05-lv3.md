# Stage 5 · Lv3 — Widening the domain

## Step 1 · Where the sum stops

**Conclusion**: $\sum 1/n^s$ converges only for $\mathrm{Re}(s) > 1$. At $s=1$ it is the divergent harmonic series.

Since $|n^{-s}| = n^{-\mathrm{Re}(s)}$, convergence depends only on the real part. Riemann uses the fact that exactly one function "continues naturally" past this boundary.

## Step 2 · One step further by flipping signs (the eta function)

**Conclusion**: The alternating series $\eta(s) = 1 - \dfrac{1}{2^s} + \dfrac{1}{3^s} - \cdots$ converges for $\mathrm{Re}(s)>0$, and

$$
\eta(s) = \left(1 - 2^{1-s}\right)\zeta(s)
$$

<details><summary>Why?</summary>

Subtract the even terms twice from $\zeta(s)$ to get the alternating series. The even terms sum to $\sum \dfrac{1}{(2n)^s} = 2^{-s}\zeta(s)$, so $\eta = \zeta - 2\cdot 2^{-s}\zeta = (1-2^{1-s})\zeta$.
</details>

So $\zeta(s) = \eta(s)/(1-2^{1-s})$ extends the definition to the strip $0 < \mathrm{Re}(s) \le 1$ (the pole at $s=1$ remains).

**Predict**: "Can this method compute $\zeta(1/2)$?" → Yes: $\zeta(1/2) \approx -1.4604$, the starting point of the spiral graphic.
**Hints**: η(s) converges for Re(s) > 0. Is ½ in that range? || Does 1 − 2^{1−s} vanish at s = ½?

## Step 3 · The functional equation: a mirror

**Conclusion**: $\zeta(s)$ and $\zeta(1-s)$ are linked like mirror images.

$$
\zeta(s) = 2^s \pi^{s-1} \sin\!\left(\frac{\pi s}{2}\right) \Gamma(1-s)\, \zeta(1-s)
$$

This fills the whole left half-plane from values on the right. Two facts follow at once:

- **Trivial zeros**: at $s = -2, -4, -6, \dots$, $\sin(\pi s/2) = 0$, so $\zeta(s)=0$.
- **Symmetry**: zeros in the strip come in pairs mirrored across $\mathrm{Re}(s) = \tfrac12$. That makes "all on ½" a natural guess.

## Step 4 · What −1/12 really means

**Conclusion**: $\zeta(-1) = -\tfrac{1}{12}$ is true, but "$1+2+3+\cdots = -1/12$" is not.

$\sum n$ diverges. $-1/12$ is the value at $s=-1$ of the **continued function** of that series — what the extended function gives where the original sum stopped, not the result of adding.
