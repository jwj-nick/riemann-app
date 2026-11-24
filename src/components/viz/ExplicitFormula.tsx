import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { primePowerJumps, psiKCurve } from '../../lib/explicit';
import { useZeros } from '../../lib/data';
import { useCanvas, readVar } from './useCanvas';

const RANGES = [30, 100, 300];
const X0 = 1.5;
const sliderToK = (v: number) => Math.max(1, Math.round(10 ** (v / 100)));
const kToSlider = (k: number) => Math.round(100 * Math.log10(Math.max(1, k)));

export interface ExplicitFormulaProps {
  /** 소리 컴포넌트와 공유하는 "가설이 틀린 세계" 상태 (첫 영점의 β) */
  beta?: number;
}

export default function ExplicitFormula({ beta = 0.5 }: ExplicitFormulaProps) {
  const { t } = useTranslation();
  const { zeros, error } = useZeros();
  const [v, setV] = useState(kToSlider(10));
  const [xmax, setXmax] = useState(RANGES[0]);
  const [smooth, setSmooth] = useState(false);
  const [playing, setPlaying] = useState(false);
  const K = Math.min(sliderToK(v), zeros?.length ?? 1);
  const jumps = useMemo(() => primePowerJumps(1000), []);

  // 1 → 1000 재생 (약 6초)
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const nv = Math.min(300, ((now - t0) / 6000) * 300);
      setV(nv);
      if (nv < 300) raf = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const canvasRef = useCanvas(
    (ctx, w, h) => {
      const pad = { l: 34, r: 10, t: 10, b: 26 };
      const pw = w - pad.l - pad.r;
      const ph = h - pad.t - pad.b;
      const ymax = xmax * 1.12;
      const X = (x: number) => pad.l + ((x - X0) / (xmax - X0)) * pw;
      const Y = (y: number) => pad.t + ph - (y / ymax) * ph;
      const c = {
        grid: readVar('--grid'),
        text: readVar('--muted'),
        fg: readVar('--fg'),
        wave: readVar('--accent'),
        prime: readVar('--prime'),
        power: readVar('--muted'),
      };
      ctx.clearRect(0, 0, w, h);

      // 축·눈금
      ctx.strokeStyle = c.grid;
      ctx.fillStyle = c.text;
      ctx.lineWidth = 1;
      ctx.font = '11px system-ui, sans-serif';
      const step = xmax <= 30 ? 5 : xmax <= 100 ? 20 : 50;
      ctx.textAlign = 'center';
      for (let x = step; x <= xmax; x += step) {
        ctx.beginPath();
        ctx.moveTo(X(x), pad.t);
        ctx.lineTo(X(x), pad.t + ph);
        ctx.stroke();
        ctx.fillText(String(x), X(x), h - 8);
      }
      ctx.textAlign = 'right';
      for (let y = step; y < ymax; y += step) {
        ctx.beginPath();
        ctx.moveTo(pad.l, Y(y));
        ctx.lineTo(pad.l + pw, Y(y));
        ctx.stroke();
        ctx.fillText(String(y), pad.l - 4, Y(y) + 4);
      }

      // 소수 / 소수 거듭제곱 눈금
      for (const j of jumps) {
        if (j.n > xmax) break;
        ctx.fillStyle = j.isPrime ? c.prime : c.power;
        ctx.fillRect(X(j.n) - 1, pad.t + ph - (j.isPrime ? 7 : 4), 2, j.isPrime ? 7 : 4);
      }

      // 추세 x
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = c.text;
      ctx.beginPath();
      ctx.moveTo(X(X0), Y(X0));
      ctx.lineTo(X(xmax), Y(xmax));
      ctx.stroke();
      ctx.setLineDash([]);

      // 실제 ψ 계단
      ctx.strokeStyle = c.fg;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      let psi = 0;
      ctx.moveTo(X(X0), Y(0));
      for (const j of jumps) {
        if (j.n > xmax) break;
        ctx.lineTo(X(j.n), Y(psi));
        psi += Math.log(j.p);
        ctx.lineTo(X(j.n), Y(psi));
      }
      ctx.lineTo(X(xmax), Y(psi));
      ctx.stroke();

      // 영점 파동의 합
      if (zeros) {
        const n = Math.min(2400, Math.max(600, Math.round(pw * 3)));
        const xs = new Float64Array(n);
        for (let i = 0; i < n; i++) xs[i] = X0 + ((xmax - X0) * i) / (n - 1);
        const ys = psiKCurve(xs, zeros, K, { smooth, offLine: { index: 0, beta } });
        ctx.save();
        ctx.beginPath();
        ctx.rect(pad.l, pad.t, pw, ph);
        ctx.clip();
        ctx.strokeStyle = c.wave;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const px = X(xs[i]);
          const py = Y(ys[i]);
          if (i) ctx.lineTo(px, py);
          else ctx.moveTo(px, py);
        }
        ctx.stroke();
        ctx.restore();
      }
    },
    [zeros, K, xmax, smooth, beta, jumps],
  );

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('explicit.title')}</strong>
        <span className="kval">{t('explicit.zeros', { count: K })}</span>
      </figcaption>
      <div className="canvas-wrap">
        <canvas ref={canvasRef} aria-label={t('explicit.title')} />
        {!zeros && <div className="overlay">{error ? t('explicit.error') : t('explicit.loading')}</div>}
      </div>
      <div className="legend">
        <span className="sw fg" /> {t('explicit.legendTrue')}
        <span className="sw accent" /> {t('explicit.legendWave')}
        <span className="sw dashed" /> {t('explicit.legendTrend')}
      </div>
      <input
        type="range"
        className="slider"
        min={0}
        max={300}
        step={1}
        value={v}
        onChange={(e) => {
          setPlaying(false);
          setV(Number(e.target.value));
        }}
        aria-label={t('explicit.zeros', { count: K })}
      />
      <div className="controls">
        <button className="btn" onClick={() => (playing ? setPlaying(false) : (setV(0), setPlaying(true)))}>
          {playing ? t('explicit.pause') : t('explicit.play')}
        </button>
        <label className="toggle">
          <input type="checkbox" checked={smooth} onChange={(e) => setSmooth(e.target.checked)} /> {t('explicit.smooth')}
        </label>
        <span className="seg" role="group" aria-label={t('explicit.range')}>
          {RANGES.map((r) => (
            <button key={r} className={r === xmax ? 'on' : ''} onClick={() => setXmax(r)}>
              ≤{r}
            </button>
          ))}
        </span>
      </div>
      <p className="note">
        <span className="tick prime" /> {t('explicit.prime')} <span className="tick power" /> {t('explicit.primePower')} ·{' '}
        {t('explicit.note')}
      </p>
    </figure>
  );
}
