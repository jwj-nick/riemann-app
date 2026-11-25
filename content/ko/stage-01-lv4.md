## 증명 스케치: 유클리드 보조정리

$p$가 소수이고 $p \mid ab$, $p \nmid a$라고 합시다. $\gcd(p, a) = 1$이므로 베주 항등식으로 $px + ay = 1$인 정수 $x, y$가 있습니다. 양변에 $b$를 곱하면 $pbx + aby = b$. 왼쪽 두 항이 모두 $p$의 배수이니 $p \mid b$.

## 계산: 체 구현

```python
def sieve(n):
    is_p = [True] * (n + 1)
    is_p[0:2] = [False, False]
    for p in range(2, int(n**0.5) + 1):
        if is_p[p]:
            for m in range(p * p, n + 1, p):   # p² 부터 지운다
                is_p[m] = False
    return [k for k in range(n + 1) if is_p[k]]

print(len(sieve(120)), sieve(120)[-3:])   # 30 [107, 109, 113]
```

## 더 읽을거리

- G. H. Hardy, E. M. Wright, *An Introduction to the Theory of Numbers* 1~2장
- 유클리드 『원론』 9권 정리 20
