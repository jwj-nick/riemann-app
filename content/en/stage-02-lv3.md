# Stage 2 · Lv3 — The density of primes

## Step 1 · "The chance of being prime near x" is about 1/ln x

**Conclusion**: The prime number theorem says $\pi(x) \sim \dfrac{x}{\ln x}$: their ratio tends to 1.

Written as a density, Gauss's observation says a number near $x$ is prime with "probability" about $1/\ln x$. The average gap is the reciprocal, $\ln x$.

**Predict**: "When numbers gain one digit, how much does the average gap grow?" → $\ln(10x) - \ln x = \ln 10 \approx 2.303$.
**Hints**: The average gap is ≈ ln x. || Simplify ln(10x) − ln x with the log rules.

## Step 2 · Adding up the density gives Li(x)

**Conclusion**: Accumulating (integrating) the density $1/\ln t$ from 2 to $x$ gives a better approximation.

$$
\mathrm{Li}(x) = \int_2^x \frac{dt}{\ln t}
$$

$x/\ln x$ is only the first approximation of this integral. One integration by parts gives

$$
\mathrm{Li}(x) = \frac{x}{\ln x} + \int_2^x \frac{dt}{(\ln t)^2} + (\text{constant})
$$

so $x/\ln x$ is always a little smaller. That is why the orange dashed line sits below in the zoom graph.

<details><summary>Check the numbers</summary>

| $x$ | $\pi(x)$ | $x/\ln x$ | $\mathrm{Li}(x)$ |
|---|---|---|---|
| $10^6$ | 78,498 | 72,382 | 78,627 |
| $10^9$ | 50,847,534 | 48,254,942 | 50,849,234 |

At $10^9$ the error of $\mathrm{Li}$ is about 1,700 — a relative error of 0.003%.
</details>

## Step 3 · The open question: how big is the error?

**Conclusion**: The size of $\pi(x) - \mathrm{Li}(x)$ is exactly what the Riemann hypothesis is about.

The 1896 proofs showed the error is "a little" smaller than $x/\ln x$. If the Riemann hypothesis is true, the error is roughly as small as $\sqrt{x}\,\ln x$. Stage 7 shows this directly.

**Predict**: "In the error graph π − Li hugs zero. Does that mean the error is zero?" → No — it is just tiny compared with $x$. At $10^9$ it is still about 1,700.
**Hints**: Look at the units on the vertical axis. || Subtract π and Li yourself at 10⁹.
