import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { basel } from '../../lib/primes';
import { useCanvas, readVar } from './useCanvas';

const NMAX = 10000;
const TARGET: Record<number, number> = { 2: Math.PI ** 2 / 6, 4: Math.PI ** 4 / 90 };
const sliderToN = (v: number) => Math.max(1, Math.round(10 ** (v / 100)));

/** 바젤 문제: 덧셈 Σ1/n^s 과 오일러 소수 곱이 같은 값으로 수렴. N축은 로그. */
export default function PartialSums() {
  const { t } = useTranslation();
  const [sExp, setSExp] = useState(2);
  const [v, setV] = useState(100); // N = 10
  const [playing, setPlaying] = useState(false);
  const N = sliderToN(v);
  const { sum, product } = useMemo(() => basel(NMAX, sExp), [sExp]);
  const target = TARGET[sExp];

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const nv = Math.min(400, ((now - t0) / 6000) * 400);
      setV(nv);
      if (nv < 400) raf = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const canvasRef = useCanvas(
    (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      const pad = { l: 40, r: 22, t: 12, b: 24 };
      const pw = w - pad.l - pad.r;
      const ph = h - pad.t - pad.b;
      const ymin = 1;
      const ymax = target + (target - 1) * 0.15;
      const X = (n: number) => pad.l + (Math.log10(n) / 4) * pw;
      const Y = (y: number) => pad.t + ph - ((y - ymin) / (ymax - ymin)) * ph;
      const c = { grid: readVar('--grid'), text: readVar('--muted'), fg: readVar('--fg'), a: readVar('--accent'), p: readVar('--prime') };
      ctx.font = '11px system-ui, sans-serif';
      ctx.lineWidth = 1;
      ctx.textAlign = 'center';
      ctx.fillStyle = c.text;
      for (const n of [1, 10, 100, 1000, 10000]) {
        ctx.strokeStyle = c.grid;
        ctx.beginPath();
        ctx.moveTo(X(n), pad.t);
        ctx.lineTo(X(n), pad.t + ph);
        ctx.stroke();
        ctx.textAlign = n === 10000 ? 'right' : 'center';
        ctx.fillText(n.toLocaleString(), n === 10000 ? X(n) + 18 : X(n), h - 6);
      }
      ctx.textAlign = 'right';
      const step = sExp === 2 ? 0.1 : 0.02;
      for (let y = ymin; y <= ymax; y += step) {
        ctx.strokeStyle = c.grid;
        ctx.beginPath();
        ctx.moveTo(pad.l, Y(y));
        ctx.lineTo(pad.l + pw, Y(y));
        ctx.stroke();
        ctx.fillText(y.toFixed(sExp === 2 ? 1 : 2), pad.l - 4, Y(y) + 4);
      }
      // 목표선
      ctx.strokeStyle = c.fg;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(pad.l, Y(target));
      ctx.lineTo(pad.l + pw, Y(target));
      ctx.stroke();
      ctx.setLineDash([]);
      // 두 시리즈 (계단: 정수 N에서만 값이 바뀜)
      const draw = (arr: Float64Array, color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(X(1), Y(arr[1]));
        for (let n = 2; n <= N; n++) {
          ctx.lineTo(X(n), Y(arr[n - 1]));
          ctx.lineTo(X(n), Y(arr[n]));
        }
        ctx.lineTo(X(N + 0.999), Y(arr[N]));
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(X(N), Y(arr[N]), 4, 0, Math.PI * 2);
        ctx.fill();
      };
      draw(sum, c.a);
      draw(product, c.p);
    },
    [N, sum, product, target, sExp],
  );

  const gapSum = (target - sum[N]).toExponential(2);
  const gapProd = (target - product[N]).toExponential(2);

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('sums.title')}</strong>
        <span className="kval">N = {N.toLocaleString()}</span>
      </figcaption>
      <div className="canvas-wrap">
        <canvas ref={canvasRef} aria-label={t('sums.title')} />
      </div>
      <div className="legend">
        <span className="sw accent" /> {t('sums.sum')}
        <span className="sw prime" /> {t('sums.product')}
        <span className="sw dashed" /> {sExp === 2 ? t('sums.target') : t('sums.targetS4')}
      </div>
      <input
        type="range"
        className="slider"
        min={0}
        max={400}
        value={v}
        onChange={(e) => {
          setPlaying(false);
          setV(Number(e.target.value));
        }}
        aria-label={`N = ${N}`}
      />
      <div className="controls">
        <button className="btn" onClick={() => (playing ? setPlaying(false) : (setV(0), setPlaying(true)))}>
          {playing ? t('common.pause') : t('common.play')}
        </button>
        <span className="seg" role="group" aria-label={t('sums.exp')}>
          {[2, 4].map((s) => (
            <button key={s} className={s === sExp ? 'on' : ''} onClick={() => setSExp(s)}>
              s = {s}
            </button>
          ))}
        </span>
      </div>
      <p className="note">
        {sum[N].toFixed(6)} · {product[N].toFixed(6)} — {t('sums.gap', { a: gapSum, b: gapProd })}
      </p>
    </figure>
  );
}
