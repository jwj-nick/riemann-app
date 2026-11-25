## 증명 스케치: 왜 곱하면 회전하나

극형식 $z = r e^{i\theta}$, $w = s e^{i\varphi}$에서 $zw = rs\, e^{i(\theta + \varphi)}$. 길이는 곱해지고 각은 더해집니다. 이 사실은 삼각함수 덧셈정리

$$
\cos(\theta + \varphi) = \cos\theta\cos\varphi - \sin\theta\sin\varphi
$$

와 정확히 같은 내용입니다. $i = e^{i\pi/2}$이므로 $i$를 곱하면 90° 회전.

## 계산: 봄벨리의 세제곱근

```python
z = 2 + 11j
r = z ** (1 / 3)            # 주값 세제곱근
print(r, r + r.conjugate())  # (2+1j) 근처, 합은 4
```

## 더 읽을거리

- T. Needham, *Visual Complex Analysis* (1997) 1장 — 그림으로 보는 복소수
- P. J. Nahin, *An Imaginary Tale* (1998) — 허수의 역사
