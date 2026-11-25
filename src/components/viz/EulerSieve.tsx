import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { primesUpTo, smallestFactor } from '../../lib/primes';

const N = 60;
const ZETA2 = Math.PI ** 2 / 6;

/**
 * 오일러의 체: ζ(2)에 (1 − 1/p²)를 곱할 때마다 p로 나뉘는 항이 사라진다.
 * 남은 항 = 소인수가 모두 지금까지 고른 소수보다 큰 n. 끝까지 하면 1만 남는다 → ζ(2)·∏(1 − p⁻²) = 1.
 */
export default function EulerSieve() {
  const { t } = useTranslation();
  const primes = useMemo(() => primesUpTo(1000), []);
  const spf = useMemo(() => smallestFactor(N), []);
  const [k, setK] = useState(0); // 곱한 소수 개수
  const used = primes.slice(0, k);
  const factor = used.reduce((acc, p) => acc * (1 - p ** -2), 1);
  const remaining = ZETA2 * factor;
  const last = used[used.length - 1] ?? 1;

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('eulerSieve.title')}</strong>
        <span className="kval">{remaining.toFixed(6)}</span>
      </figcaption>
      <p className="note formula">
        ζ(2){used.map((p) => ` × (1 − 1/${p}²)`).join('')} = {remaining.toFixed(6)}
      </p>
      <div className="sieve-grid">
        {Array.from({ length: N }, (_, i) => i + 1).map((n) => {
          const gone = n > 1 && spf[n] <= last;
          return (
            <span key={n} className={`cell term ${gone ? 'crossed' : n === 1 ? 'prime' : ''}`}>
              1/{n}²
            </span>
          );
        })}
      </div>
      <div className="controls">
        <button className="btn primary" onClick={() => setK((x) => Math.min(x + 1, primes.length))} disabled={k >= 15}>
          {t('eulerSieve.next', { p: primes[k] })}
        </button>
        <button className="btn" onClick={() => setK(primes.length)}>
          {t('eulerSieve.all')}
        </button>
        <button className="btn" onClick={() => setK(0)}>
          {t('common.reset')}
        </button>
      </div>
      <p className="note">{k >= primes.length ? t('eulerSieve.done', { n: primes.length }) : t('eulerSieve.explain', { p: primes[k] })}</p>
    </figure>
  );
}
