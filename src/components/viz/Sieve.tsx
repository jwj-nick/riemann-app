import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { smallestFactor } from '../../lib/primes';
import { useEdition } from '../../lib/edition';

const BEST_KEY = 'sieve-best';
const readBest = (n: number): number | null => {
  try {
    const v = localStorage.getItem(`${BEST_KEY}-${n}`);
    return v ? Number(v) : null;
  } catch {
    return null;
  }
};

const SIZES = [60, 120, 200];
const PALETTE = ['--c1', '--c2', '--c3', '--c4', '--c5', '--c6'];

/** 에라토스테네스의 체: 소수를 누르면 배수가 차례로 지워진다. */
export default function Sieve() {
  const { t } = useTranslation();
  const [N, setN] = useState(SIZES[1]);
  const spf = useMemo(() => smallestFactor(200), []);
  const [crossedBy, setCrossedBy] = useState<Map<number, number>>(new Map());
  const [primes, setPrimes] = useState<number[]>([]);
  const [msg, setMsg] = useState<string>(t('sieve.tapHint'));
  const [busy, setBusy] = useState(false);
  const timers = useRef<number[]>([]);
  // Junior 타임어택: 첫 탭부터 완료까지 (자동 사용 시 기록 안 함)
  const junior = useEdition() === 'junior';
  const [t0, setT0] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [usedAuto, setUsedAuto] = useState(false);
  const [best, setBest] = useState<number | null>(() => readBest(N));
  const [record, setRecord] = useState<number | null>(null);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const reset = (n = N) => {
    clearTimers();
    setT0(null);
    setUsedAuto(false);
    setRecord(null);
    setBest(readBest(n));
    setN(n);
    setCrossedBy(new Map());
    setPrimes([]);
    setBusy(false);
    setMsg(t('sieve.tapHint'));
  };

  const isPrime = new Set(primes);
  const nextCandidate = (() => {
    for (let k = 2; k <= N; k++) if (!crossedBy.has(k) && !isPrime.has(k)) return k;
    return null;
  })();
  const finished = nextCandidate === null;
  const pastSqrt = nextCandidate !== null && nextCandidate * nextCandidate > N && primes.length > 0;

  const strike = (p: number, onDone?: () => void) => {
    setPrimes((ps) => [...ps, p]);
    const multiples: number[] = [];
    for (let m = p * p; m <= N; m += p) multiples.push(m);
    // p의 배수 중 p² 미만은 이미 더 작은 소수에서 지워졌다
    setBusy(true);
    multiples.forEach((m, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setCrossedBy((prev) => (prev.has(m) ? prev : new Map(prev).set(m, p)));
        }, 40 * i),
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setBusy(false);
        onDone?.();
      }, 40 * multiples.length + 60),
    );
  };

  const tap = (k: number) => {
    if (busy || k < 2) return;
    if (isPrime.has(k)) return;
    const by = crossedBy.get(k);
    if (by) return setMsg(t('sieve.crossed', { n: k, p: by }));
    if (spf[k] !== k) return setMsg(t('sieve.notYet', { n: k, p: spf[k] }));
    setMsg(t('sieve.tapHint'));
    if (t0 === null) setT0(performance.now());
    strike(k);
  };

  // √N 이하 소수를 다 처리하면 남은 수 = 소수 (타이머 안에서도 안전하도록 상태 대신 spf로 판정)
  const finishAll = () =>
    setPrimes((ps) => {
      const have = new Set(ps);
      const rest: number[] = [];
      for (let k = 2; k <= N; k++) if (spf[k] === k && !have.has(k)) rest.push(k);
      return [...ps, ...rest];
    });

  const auto = () => {
    if (busy) return;
    setUsedAuto(true);
    const todo: number[] = [];
    for (let q = 2; q * q <= N; q++) if (spf[q] === q && !isPrime.has(q)) todo.push(q);
    const step = (i: number) => (i < todo.length ? strike(todo[i], () => step(i + 1)) : finishAll());
    step(0);
  };

  // 타이머 표시
  useEffect(() => {
    if (!junior || t0 === null || finished) return;
    const id = window.setInterval(() => setNow(performance.now()), 100);
    return () => clearInterval(id);
  }, [junior, t0, finished]);
  // 완료 시 기록
  useEffect(() => {
    if (!junior || !finished || t0 === null || usedAuto || record !== null) return;
    const sec = Math.round((performance.now() - t0) / 100) / 10;
    setRecord(sec);
    if (best === null || sec < best) {
      setBest(sec);
      try {
        localStorage.setItem(`${BEST_KEY}-${N}`, String(sec));
      } catch {
        /* ignore */
      }
    }
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (finished && primes.length) setMsg(t('sieve.done', { n: N, count: primes.length }));
    else if (pastSqrt) setMsg(t('sieve.sqrtDone', { p: nextCandidate, sq: nextCandidate! * nextCandidate!, n: N }));
  }, [finished, pastSqrt]); // eslint-disable-line react-hooks/exhaustive-deps

  const colorOf = (p: number) => `var(${PALETTE[Math.max(0, [2, 3, 5, 7, 11, 13].indexOf(p)) % PALETTE.length]})`;

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('sieve.title')}</strong>
        <span className="kval">
          {junior && t0 !== null && !finished && t('sieve.time', { s: ((now - t0) / 1000).toFixed(1) }) + ' · '}
          {t('sieve.found', { count: primes.length })}
        </span>
      </figcaption>
      <div className="sieve-grid" role="grid">
        {Array.from({ length: N }, (_, i) => i + 1).map((k) => {
          const by = crossedBy.get(k);
          const cls = k === 1 ? 'one' : isPrime.has(k) ? 'prime' : by ? 'crossed' : k === nextCandidate ? 'next' : '';
          return (
            <button
              key={k}
              className={`cell ${cls}`}
              style={by ? { color: colorOf(by), borderColor: colorOf(by) } : undefined}
              onClick={() => tap(k)}
              aria-label={String(k)}
            >
              {k}
            </button>
          );
        })}
      </div>
      <p className="note" aria-live="polite">
        {msg}
      </p>
      {junior && (record !== null || best !== null) && (
        <p className="note ok">{record !== null && record === best ? t('sieve.newBest', { s: record }) : best !== null ? t('sieve.best', { s: best }) : ''}</p>
      )}
      <div className="controls">
        {pastSqrt && !finished && (
          <button className="btn primary" onClick={finishAll} disabled={busy}>
            {t('sieve.finishAll')}
          </button>
        )}
        <button className="btn" onClick={auto} disabled={busy || finished}>
          {t('common.auto')}
        </button>
        <button className="btn" onClick={() => reset()}>
          {t('common.reset')}
        </button>
        <span className="seg" role="group">
          {SIZES.map((s) => (
            <button key={s} className={s === N ? 'on' : ''} onClick={() => reset(s)}>
              {s}
            </button>
          ))}
        </span>
      </div>
    </figure>
  );
}
