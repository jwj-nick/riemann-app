# Stage 3 · Lv3 — Numbers that rotate

## Step 1 · Bombelli's calculation

**Conclusion**: For $x^3 = 15x + 4$, Cardano's formula reaches the answer 4 only by passing through imaginary numbers.

Cardano's formula gives

$$
x = \sqrt[3]{2 + \sqrt{-121}} + \sqrt[3]{2 - \sqrt{-121}} = \sqrt[3]{2 + 11i} + \sqrt[3]{2 - 11i}
$$

Bombelli noticed that $(2+i)^3 = 2 + 11i$:

$$
(2+i)^3 = 8 + 12i + 6i^2 + i^3 = 8 + 12i - 6 - i = 2 + 11i
$$

So $x = (2+i) + (2-i) = 4$. The ghosts cancel.

**Predict**: "What is $(2-i)^3$?" → $2 - 11i$. Taking the conjugate mirrors every step.
**Hints**: How are 2+i and 2−i related? || The cube of a conjugate is the conjugate of the cube.

## Step 2 · Multiplying by i turns 90°

**Conclusion**: $i(a+bi) = -b + ai$: the point $(a, b)$ moves to $(-b, a)$, a 90° turn about the origin.

$$
i(a + bi) = ai + bi^2 = -b + ai
$$

Twice gives $(-a, -b)$: 180°. That is the picture of $i^2 = -1$.

## Step 3 · Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$

**Conclusion**: Turning by an angle $\theta$ is multiplying by $e^{i\theta}$.

Put $x = i\theta$ into the series for $e^x$ and use $i^2 = -1$: the even powers form the cosine series and the odd powers the sine series.

$$
e^{i\theta} = 1 + i\theta - \frac{\theta^2}{2!} - i\frac{\theta^3}{3!} + \frac{\theta^4}{4!} + \cdots = \cos\theta + i\sin\theta
$$

**Intuition**: The point on the unit circle drawn by the playground's θ slider is exactly $e^{i\theta}$. With $\theta = \pi$, $e^{i\pi} = -1$.

**Graphic link**: The zero waves of Stage 6, $x^{i\gamma} = e^{i\gamma \ln x}$, are this rotation running with $\ln x$ as time.
