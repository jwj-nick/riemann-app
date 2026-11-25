# Stage 8 · Lv3 — Measuring gaps fairly

## Step 1 · How many zeros up to height T?

**Conclusion** (Riemann–von Mangoldt):

$$
N(T) \approx \frac{T}{2\pi}\ln\frac{T}{2\pi e} + \frac{7}{8}
$$

Zeros get denser higher up. The average gap near height $T$ is $\dfrac{2\pi}{\ln(T/2\pi)}$.

**Predict**: "What is the average gap near height 5000?" → $2\pi/\ln(5000/2\pi) \approx 0.94$ — much tighter than at the bottom (near 14).
**Hints**: Average gap = 2π / ln(T/2π). || 5000/2π ≈ 796, and ln 796 ≈ 6.7.

## Step 2 · Normalizing: make the mean gap 1

**Conclusion**: To remove the height-dependent density, multiply each gap by the local density.

$$
\delta_n = (\gamma_{n+1} - \gamma_n)\cdot\frac{1}{2\pi}\ln\frac{\gamma_n}{2\pi}
$$

Now the mean is 1, so different heights and different systems (nuclei, random matrices) can share one axis.

## Step 3 · Montgomery's pair correlation and GUE

**Conclusion**: The relative chance of two zeros at (normalized) distance $u$ is

$$
1 - \left(\frac{\sin \pi u}{\pi u}\right)^2
$$

(Montgomery, proved under some conditions). It goes to 0 as $u \to 0$: that is "repulsion".

The black curve in the histogram is a simple approximation to the nearest-gap distribution (the Wigner surmise):

$$
p(s) = \frac{32}{\pi^2} s^2 e^{-4s^2/\pi}
$$

For fully random points, $p(s) = e^{-s}$, highest at $s=0$, because the points do not avoid each other.

**Predict**: "Roughly what share of gaps is below ¼ for random points and for GUE?" → Random: $1 - e^{-1/4} \approx 22\%$; GUE (Wigner approximation): about 1.6%. Compare with the numbers under the histogram.
**Hints**: Random gaps follow e^{−s}. What is the area from 0 to ¼? || The GUE curve is flat like s² near 0. Bigger or smaller than random?

## Step 4 · Nuclei follow GOE, not GUE

**Conclusion**: Real nuclear levels (uranium-238 neutron resonances) follow GOE; zeta zeros follow GUE. Both repel, with different strength.

Random matrices come in three families by symmetry. Systems whose physics is unchanged when time runs backwards (nuclei without magnetic fields) are real symmetric matrices: GOE. Others are complex Hermitian: GUE. For small gaps $s$,

$$
p_{\mathrm{GOE}}(s) \approx \frac{\pi}{2}\, s, \qquad p_{\mathrm{GUE}}(s) \approx \frac{32}{\pi^2}\, s^2
$$

(in the Wigner surmise), so GUE repulsion is stronger. What Dyson recognized in Montgomery's formula was GUE pair correlation; measured nuclear data do not lie on "exactly the same" curve as the zeta zeros.

**Predict**: "What share of gaps is below ¼ for GOE?" → $1 - e^{-\pi/64} \approx 4.8\%$. The uranium data give about 4.9%.
**Hints**: The cumulative GOE Wigner distribution is 1 − e^{−πs²/4}. || Put in s = ¼.
