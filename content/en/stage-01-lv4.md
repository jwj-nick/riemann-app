## Proof sketch: Euclid's lemma

Let $p$ be prime with $p \mid ab$ and $p \nmid a$. Since $\gcd(p, a) = 1$, Bézout gives integers $x, y$ with $px + ay = 1$. Multiply by $b$: $pbx + aby = b$. Both terms on the left are multiples of $p$, so $p \mid b$.

## Compute: a sieve

```python
def sieve(n):
    is_p = [True] * (n + 1)
    is_p[0:2] = [False, False]
    for p in range(2, int(n**0.5) + 1):
        if is_p[p]:
            for m in range(p * p, n + 1, p):   # start at p²
                is_p[m] = False
    return [k for k in range(n + 1) if is_p[k]]

print(len(sieve(120)), sieve(120)[-3:])   # 30 [107, 109, 113]
```

## Further reading

- G. H. Hardy, E. M. Wright, *An Introduction to the Theory of Numbers*, ch. 1–2
- Euclid, *Elements* IX.20
