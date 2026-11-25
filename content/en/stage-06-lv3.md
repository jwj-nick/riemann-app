# Stage 6 · Lv3 — Writing the primes as waves of the zeros

> Translation of `content/ko/stage-06-lv3-derivation.md`.

## The map

$$
\underbrace{\pi(x)}_{\text{prime count}}
\;\xrightarrow{\ \text{1. weights}\ }\;
\psi(x)
\;\xrightarrow{\ \text{2. Euler product}\ }\;
-\frac{\zeta'(s)}{\zeta(s)}
\;\xrightarrow{\ \text{3. switch integral}\ }\;
\oint
\;\xrightarrow{\ \text{4. one share per pole}\ }\;
x-\sum_\rho \frac{x^\rho}{\rho}-\cdots
$$

One goal: **write the prime staircase exactly as a sum of waves, one for each zero ρ.** That formula is what the Stage 6 slider actually computes.

---

## Step 1 · Count primes "with weights"

**Conclusion**: Instead of π(x), use ψ(x), which adds log p for every prime power pᵏ. The formulas become much cleaner.

$$
\psi(x) = \sum_{p^k \le x} \log p = \sum_{n \le x} \Lambda(n),
\qquad
\Lambda(n)=\begin{cases}\log p & n=p^k\\ 0 & \text{otherwise}\end{cases}
$$

<details><summary>Example: count ψ(10) by hand</summary>

Prime powers up to 10: 2, 3, 4, 5, 7, 8, 9

$$
\psi(10) = \underbrace{3\log 2}_{2,4,8} + \underbrace{2\log 3}_{3,9} + \log 5 + \log 7 = \log 2520 \approx 7.832
$$

2520 is the least common multiple of 1 to 10. In general **ψ(x) = log(lcm of 1…x)**.
</details>

**Intuition**: The prime number theorem π(x) ≈ x/log x says the same as ψ(x) ≈ x. Larger primes are rarer (density 1/log p), but each carries weight log p; the two cancel to "weight 1 per unit length". So the target curve is simply the line y = x.

**Predict**: "Roughly what shape should ψ(x) have? Think of the prime number theorem." → A staircase near the line of slope 1.
**Hints**: PNT: π(x) ≈ x / ln x. What if each prime carries weight ln p? || x/ln x primes × weight about ln x = ?

**Graphic link**: The slider's default mode is the ψ(x) staircase with the line y = x. A π(x) mode is discussed in Step 8.

---

## Step 2 · Extract prime information from the Euler product

**Conclusion**: Taking the "logarithmic derivative" of zeta makes Λ(n) pop out as coefficients.

$$
-\frac{\zeta'(s)}{\zeta(s)} = \sum_{n=1}^{\infty} \frac{\Lambda(n)}{n^s}
\qquad (\operatorname{Re} s > 1)
$$

<details><summary>Why?</summary>

Take the log of the Euler product from Stage 4; the product becomes a sum.

$$
\log \zeta(s) = -\sum_p \log\!\left(1 - p^{-s}\right) = \sum_p \sum_{k\ge 1} \frac{p^{-ks}}{k}
$$

(using −log(1−u) = u + u²/2 + u³/3 + ⋯.) Differentiate in s: p^{−ks} = e^{−ks log p} gives −k log p · p^{−ks}, and the k cancels.

$$
\frac{\zeta'(s)}{\zeta(s)} = -\sum_p \sum_{k\ge1} \log p \cdot (p^k)^{-s}
$$

The coefficient at n = pᵏ is log p, i.e. Λ(n).
</details>

**Intuition**: The Euler product is a safe that locks the primes together by multiplication. The log turns the product into a sum, and the derivative tags each term with log p — exactly the weights of Step 1.

**Predict**: "What tool turns multiplication into addition?" → The logarithm.
**Hints**: log(ab) = ? || Apply it to the Euler product and the product becomes a sum.

---

## Step 3 · A switch integral that picks out the staircase

**Conclusion**: Integrating xˢ/s along a vertical line in the complex plane gives a switch: 1 if n ≤ x, else 0. Using it to select the n ≤ x terms of Step 2's series gives ψ(x).

$$
\frac{1}{2\pi i}\int_{c-i\infty}^{c+i\infty} \frac{y^s}{s}\,ds =
\begin{cases} 1 & y>1 \\ \tfrac12 & y=1 \\ 0 & 0<y<1 \end{cases}
\qquad (c>0)
$$

$$
\boxed{\;\psi(x) = \frac{1}{2\pi i}\int_{c-i\infty}^{c+i\infty} \left(-\frac{\zeta'(s)}{\zeta(s)}\right)\frac{x^s}{s}\,ds\qquad (c>1)\;}
$$

<details><summary>Why is it a switch?</summary>

If y > 1, yˢ shrinks to the left, so the path can be closed by a big loop to the left. The only singularity inside is s = 0, where 1/s has "residue" 1.

If y < 1, close to the right instead; there are no singularities there, so the value is 0.

Put y = x/n into Step 2's series term by term and only Σ_{n≤x} Λ(n) = ψ(x) survives. (If x is exactly a prime power, that term counts ½: the midpoint of the jump.)
</details>

**Intuition**: Think of an audio equalizer or a filter in signal processing: one integral builds a filter that lets through only the n smaller than x.

**Predict**: "This integral jumps from 0 to 1 as y passes 1. Which feature of the prime staircase does that resemble?" → The sudden one-step jump at a prime.
**Hints**: Where does ψ(x) jump? || What is added to ψ when x passes a prime power n?

---

## Step 4 · Push the path left: one share per pole

**Conclusion**: Push the path all the way left and the integral vanishes, leaving only the sum of "contributions (residues)" at the points where the integrand blows up.

Where F(s) = (−ζ′/ζ)(s) · xˢ/s blows up, and the contributions:

| Location | Why it blows up | Contribution |
|---|---|---|
| s = 1 | pole of ζ itself | **x** |
| s = ρ (nontrivial zero) | ζ = 0, so −ζ′/ζ blows up | **−x^ρ/ρ** |
| s = 0 | 1/s | −log 2π |
| s = −2, −4, … (trivial zeros) | ζ = 0 | together −½ log(1 − x⁻²) |

<details><summary>Why −x^ρ/ρ at a zero?</summary>

If ζ has a simple zero at s = ρ, then ζ(s) ≈ a(s−ρ), so

$$
-\frac{\zeta'(s)}{\zeta(s)} \approx -\frac{1}{s-\rho}
$$

So −ζ′/ζ has **a pole of exactly −1 at every zero**. Multiply by the rest of the integrand, x^ρ/ρ, to get −x^ρ/ρ.

By the same logic, ζ has a pole at s = 1, so −ζ′/ζ ≈ +1/(s−1) and the contribution is +x. The sign rule "zeros subtract, poles add" comes from here.
</details>

<details><summary>Rigour deferred to Lv4</summary>

To really push the path to infinity one must show the integrals along horizontal segments go to 0, and how the sum over zeros converges (pair ρ with its conjugate and add in order of |Im ρ|). Von Mangoldt completed this in 1895.
</details>

**Intuition**: The zeros are "black holes" in the landscape of −ζ′/ζ. The integral ends up reading off the list of black holes.

---

## Step 5 · The explicit formula

$$
\boxed{\;\psi(x) = x \;-\; \sum_{\rho} \frac{x^{\rho}}{\rho} \;-\; \log 2\pi \;-\; \tfrac12\log\!\left(1-x^{-2}\right)\;}
$$

**How to read it**
- **x**: Gauss's smooth trend (the line of Step 1)
- **Σ x^ρ/ρ**: one wobble per zero, the deviation from the trend
- The last two terms: small corrections, negligible for large x

**This is an identity, not an approximation.** Adding all the zeros reproduces every jump of the staircase exactly.

**Predict**: "With no zeros (K = 0), what does the graph look like? And adding them one by one?" → Line → wobbles → staircase.
**Hints**: With K = 0 the main term left is just x. || Each zero adds one wave of the form cos(γ ln x).

---

## Step 6 · One pair of zeros = one wave

**Conclusion**: A zero ρ = β + iγ together with its conjugate gives **a cosine wave on the log x axis**, with frequency γ and amplitude x^β.

$$
x^{\rho} = x^{\beta}\, x^{i\gamma} = x^{\beta}\, e^{i\gamma \log x}
$$

$$
\frac{x^\rho}{\rho} + \frac{x^{\bar\rho}}{\bar\rho}
= \frac{2\,x^{\beta}}{|\rho|}\cos\!\big(\gamma \log x - \arg \rho\big)
$$

<details><summary>Why?</summary>

As in Stage 3, e^{iθ} is a rotation by θ. Since x^{iγ} = e^{iγ log x}, it keeps turning in proportion to log x. A conjugate pair is two rotations in opposite directions; adding them cancels the imaginary parts and leaves a real cosine (z + z̄ = 2 Re z).
</details>

| Part of the zero | Role in the wave | Music analogy |
|---|---|---|
| γ (height, imaginary part) | speed of oscillation on the log x axis | **pitch** |
| β (horizontal, real part) | amplitude grows like x^β | **volume** |
| 1/\|ρ\| | higher zeros contribute less | higher overtones are quieter |

γ of the first three zeros: **14.1347, 21.0220, 25.0109** (checked by the scripts).

**Graphic link**: Switching on one zero in the slider adds exactly this cosine. The sound mode maps γ proportionally to frequency.

---

## Step 7 · The Riemann hypothesis = "every volume is the same"

**Conclusion**: If every zero has β = ½, every wave has amplitude √x, and the error is as small as it can be.

$$
\beta = \tfrac12 \;\Rightarrow\; \frac{2\,x^{1/2}}{|\rho|}\cos(\cdots)
\quad\text{every wave of size } \sqrt{x}
$$

$$
\text{RH} \iff \psi(x) = x + O\!\left(\sqrt{x}\,\log^2 x\right)
\iff \pi(x) = \operatorname{Li}(x) + O\!\left(\sqrt{x}\,\log x\right)
$$

<details><summary>Why equivalent (sketch)</summary>

(⇒) If every β = ½, each term is at most √x/|ρ|, and there are about (T/2π) log T zeros up to height T, so truncating and estimating the sum gives about √x log²x (von Koch, 1901).

(⇐) If some zero has β > ½, its wave grows like x^β, faster than √x, so the error must at some point exceed that.

Intuitively: **size of the error = β of the rightmost zero**. It is also known that it cannot be smaller than ½, so ½ is the best possible.
</details>

**Predict**: "If one zero sat off the line at β = 0.8, how would its wave compare with the others as x grows?" → It alone keeps growing and drags the staircase to one side. (Links to the Stage 7 graphic "a world where the hypothesis fails".)
**Hints**: A wave's size is proportional to x^β. || Compare x^0.8 and x^0.5 at x = 10⁶.

---

## Step 8 · Back to π(x) (Riemann's original formula)

**Conclusion**: To use π directly instead of ψ, use the formula from Riemann's 1859 paper. The structure is the same, with Li(x^ρ) in place of x^ρ/ρ.

$$
J(x) = \sum_{n\ge1}\frac{\pi(x^{1/n})}{n}
= \operatorname{Li}(x) - \sum_\rho \operatorname{Li}(x^\rho) - \log 2 + \int_x^\infty \frac{dt}{t(t^2-1)\log t}
$$

Extracting π by Möbius inversion, a practical approximation is

$$
\pi(x) \approx R(x) - \sum_\rho R(x^\rho),
\qquad R(x) = \sum_{n\ge1}\frac{\mu(n)}{n}\operatorname{Li}(x^{1/n})
$$

**Intuition**: J(x) is a staircase giving 1 to primes, ½ to squares of primes, ⅓ to cubes … Like ψ, it "counts prime powers a little too", which keeps the formula clean; removing the extra with the Möbius function leaves the true π.

---

## Step 9 · Check with numbers

Output of `scripts/verify_explicit_formula.py` (up to 200 zeros), measured at half-integers like x = 10.5 to avoid the jumps.

| x | actual ψ(x) | K = 0 | K = 1 | K = 10 | K = 50 | K = 200 |
|---|---|---|---|---|---|---|
| 10.5 | 7.832 | 8.667 | 8.227 | 7.702 | 7.975 | **7.847** |
| 100.5 | 94.045 | 98.662 | 97.670 | 95.776 | 94.905 | **93.910** |
| 1000.5 | 996.681 | 998.662 | 999.951 | 997.770 | 994.733 | **996.048** |

**How to read it**
- K = 0 is the straight trend only. Adding zeros, the value approaches the truth **while oscillating** — not monotonically, as expected for a sum of waves.
- Convergence is slow because higher zeros contribute only about 1/|ρ| less. That is also why the corners of the staircase "ripple" in the slider (like the Gibbs phenomenon).
