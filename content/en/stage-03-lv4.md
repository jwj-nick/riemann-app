## Proof sketch: why multiplying rotates

In polar form $z = r e^{i\theta}$, $w = s e^{i\varphi}$, so $zw = rs\, e^{i(\theta + \varphi)}$: lengths multiply, angles add. This is exactly the addition formula

$$
\cos(\theta + \varphi) = \cos\theta\cos\varphi - \sin\theta\sin\varphi
$$

Since $i = e^{i\pi/2}$, multiplying by $i$ turns by 90°.

## Compute: Bombelli's cube roots

```python
z = 2 + 11j
r = z ** (1 / 3)            # principal cube root
print(r, r + r.conjugate())  # about 2+1j; the sum is 4
```

## Further reading

- T. Needham, *Visual Complex Analysis* (1997), ch. 1
- P. J. Nahin, *An Imaginary Tale* (1998)
