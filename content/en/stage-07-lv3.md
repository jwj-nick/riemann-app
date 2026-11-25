# Stage 7 · Lv3 — Horizontal position of a zero = size of the error

## Step 1 · Reading the error terms in the explicit formula

**Conclusion**: The wave from one zero $\rho = \beta + i\gamma$ has size proportional to $x^\beta$.

From the explicit formula of Stage 6,

$$
\psi(x) - x = -\sum_\rho \frac{x^\rho}{\rho} - \log 2\pi - \tfrac12 \log(1 - x^{-2})
$$

and $|x^\rho| = x^{\beta}$ ($x^{i\gamma}$ is only a rotation, of size 1).

**Predict**: "If every $\beta$ is ½, roughly how big is the error?" → About $\sqrt{x}$ (with a log factor from the number of zeros).
**Hints**: |x^ρ| = x^β. || If β = ½, what is x^β?

## Step 2 · Equivalence: RH ⇔ error of size √x

**Conclusion** (von Koch, 1901): the Riemann hypothesis is equivalent to

$$
\pi(x) = \mathrm{Li}(x) + O\!\left(\sqrt{x}\,\ln x\right)
$$

One direction is Step 1: if every zero has $\beta = \tfrac12$, every wave has size $\sqrt{x}$. Conversely, if some zero has $\beta > \tfrac12$, its wave grows like $x^\beta$ and eventually exceeds $\sqrt{x}\ln x$; the key to the proof is that the other waves cannot keep cancelling it (Lv4).

**Graphic link**: In "a world where the hypothesis fails", raising β pushes the red curve out of the ±√x band — the picture of this equivalence.

## Step 3 · Why zeros move in groups

**Conclusion**: Zeros come in groups of four: $\rho,\ \bar\rho,\ 1-\rho,\ 1-\bar\rho$.

$\zeta(\bar s) = \overline{\zeta(s)}$ (real coefficients) gives up–down symmetry, and the functional equation (Stage 5) gives left–right symmetry about ½. When $\beta = \tfrac12$ the four collapse to two.

**Predict**: "If a zero sat at $\beta = 0.3$, would the Riemann hypothesis be fine?" → No: its partner at $1-\beta = 0.7$ makes the error grow like $x^{0.7}$.
**Hints**: Zeros pair up symmetrically about ½. || Where is 0.3's partner, and how big is its wave?
