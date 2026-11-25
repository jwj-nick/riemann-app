# Stage 1 · Lv3 — Three proofs about primes

## Step 1 · The primes never end (Euclid)

**Conclusion**: However long your list of primes, there is always a prime not on it.

Suppose the only primes are $p_1, p_2, \dots, p_n$ and form

$$
N = p_1 p_2 \cdots p_n + 1
$$

Dividing $N$ by any $p_i$ leaves remainder 1. But every number from 2 up is divisible by some prime (its smallest divisor is prime). That prime is not on the list — a contradiction.

**Predict**: "Is 2·3·5·7·11·13 + 1 = 30031 prime?" → No: 30031 = 59 × 509. The proof never says N is prime, only that some *new* prime divides it.
**Hints**: Does the proof say "N is prime" or "a new prime divides N"? || Try dividing 30031 by primes in turn; you stop a little above 50.

## Step 2 · Factorization is unique (fundamental theorem of arithmetic)

**Conclusion**: Every natural number is a product of primes in exactly one way, up to order.

Existence is easy: split a non-prime into two smaller factors and keep going. The key to uniqueness is **Euclid's lemma**:

$$
p \mid ab \;\Rightarrow\; p \mid a \ \text{or}\ p \mid b
$$

If $p_1 \cdots p_r = q_1 \cdots q_s$, then $p_1$ divides some $q_j$, which is prime, so $p_1 = q_j$. Cancel and repeat.

**Intuition**: The Lego analogy is exact: one finished model cannot come from two different sets of bricks. This is what makes Euler's product in Stage 4 work.

## Step 3 · The sieve can stop at √N

**Conclusion**: Every composite number up to $N$ has a prime factor at most $\sqrt N$.

If $n = ab$ with $1 < a \le b$, then $a^2 \le ab = n \le N$, so $a \le \sqrt N$. Once multiples of primes up to $\sqrt N$ are crossed out, everything left is prime. For the same reason, multiples of $p$ can be crossed out starting at $p^2$.

**Predict**: "In a sieve of 1–120, how many primes do you need to process?" → √120 ≈ 10.95, so four: 2, 3, 5, 7.
**Hints**: If n = a × b, how large can the smaller factor a be? || √120 is about 11. Which primes are below 11?
