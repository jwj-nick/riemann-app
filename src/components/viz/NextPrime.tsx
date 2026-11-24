import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { primesUpTo } from '../../lib/primes';

const ROUNDS = 8;
const CHOICES = [2, 4, 6, 8, 10, 12]; // 12 = "12 이상"

/** 다음 소수 맞히기: 간격을 고르게 해 불규칙성을 체감시킨다. */
export default function NextPrime() {
  const { t } = useTranslation();
  const primes = useMemo(() => primesUpTo(20000), []);
  const pickStart = () => {
    // 100~10000 사이 소수 하나 (다음 소수까지 포함되도록)
    const lo = primes.findIndex((p) => p > 100);
    const hi = primes.findIndex((p) => p > 10000);
    return lo + Math.floor(Math.random() * (hi - lo));
  };
  const [idx, setIdx] = useState(pickStart);
  const [answer, setAnswer] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  const [total, setTotal] = useState(0);
  const [logs, setLogs] = useState<number[]>([]);

  const p = primes[idx];
  const q = primes[idx + 1];
  const gap = q - p;
  const bucket = (g: number) => (g >= 12 ? 12 : g);
  const done = total >= ROUNDS && answer !== null;

  const choose = (c: number) => {
    if (answer !== null) return;
    setAnswer(c);
    setTotal((n) => n + 1);
    setLogs((l) => [...l, Math.log(p)]);
    if (c === bucket(gap)) setRight((n) => n + 1);
  };
  const next = () => {
    if (done) {
      setRight(0);
      setTotal(0);
      setLogs([]);
    }
    setAnswer(null);
    setIdx(pickStart());
  };
  const avg = logs.length ? (logs.reduce((a, b) => a + b, 0) / logs.length).toFixed(1) : '';

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('nextPrime.title')}</strong>
        <span className="kval">{t('nextPrime.score', { right, total })}</span>
      </figcaption>
      <p className="question">{t('nextPrime.question', { p })}</p>
      <div className="choices">
        {CHOICES.map((c) => {
          const correct = answer !== null && c === bucket(gap);
          const picked = answer === c;
          return (
            <button
              key={c}
              className={`btn choice${correct ? ' correct' : ''}${picked && !correct ? ' wrong' : ''}`}
              onClick={() => choose(c)}
              disabled={answer !== null}
            >
              {c === 12 ? t('nextPrime.more', { n: '+12' }) : `+${c}`}
            </button>
          );
        })}
      </div>
      {answer !== null && (
        <p className={`note ${answer === bucket(gap) ? 'ok' : 'danger'}`} aria-live="polite">
          {answer === bucket(gap) ? t('nextPrime.right', { q }) : t('nextPrime.wrong', { q, gap })}
        </p>
      )}
      {done && <p className="note">{t('nextPrime.summary', { right, total, avg })}</p>}
      {answer !== null && (
        <div className="controls">
          <button className="btn primary" onClick={next}>
            {done ? t('common.reset') : t('nextPrime.next')}
          </button>
        </div>
      )}
    </figure>
  );
}
