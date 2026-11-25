## Further reading

- E. Bombieri, "Problems of the Millennium: the Riemann Hypothesis", Clay Mathematics Institute official problem description (2000)
- J. B. Conrey, "The Riemann Hypothesis", *Notices of the AMS* 50(3), 2003 — an expert overview for mathematicians
- J. Derbyshire, *Prime Obsession* (2003) — popular book alternating maths and history chapters
- B. Mazur, W. Stein, *Prime Numbers and the Riemann Hypothesis* (2016) — picture-driven, closest in spirit to this app

## Make the app's sound yourself

```python
# Heights of the first 5 zeros → pitches (f = 220 Hz × γ/γ₁)
from mpmath import zetazero
g = [float(zetazero(k).imag) for k in range(1, 6)]
print([round(220 * x / g[0], 1) for x in g])
```
