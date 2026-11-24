import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { primePowerJumps, psiKCurve } from '../../lib/explicit';
import { useZeros } from '../../lib/data';
import { useCanvas, readVar } from './useCanvas';

const K = 100;
const RANGES = [1000, 10000, 100000];

/**
 * "가설이 틀린 세계": 오차 ψ(x) − x 를 본다. 영점이 모두 β=½ 이면 오차는 √x 크기 안에서 출렁이고,
 * 첫 영점을 β>½ 로 옮기면 그 파동이 x^β 로 자라 띠를 벗어난다.
 */
export default function OffLineWorld({ beta, onBeta }: { beta: number; onBeta: (b: number) => void }) {
  const { t } = useTranslation();
  const { zeros } = useZeros();
  const [xmax, setXmax] = useState(RANGES[1]);
  const jumps = useMemo(() => primePowerJumps(100000), []);

  const canvasRef = useCanvas(
    (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      const pad = { l: 40, r: 14, t: 10, b: 24 };
      const pw = w - pad.l - pad.r;
      const ph = h - pad.t - pad.b;
      const X0 = 2;
      const ylim = 2.5 * Math.sqrt(xmax);
      const X = (x: number) => pad.l + ((x - X0) / (xmax - X0)) * pw;
      const Y = (y: number) => pad.t + ph / 2 - (y / ylim) * (ph / 2);
      const c = { grid: readVar('--grid'), text: readVar('--muted'), fg: readVar('--fg'), a: readVar('--accent'), d: readVar('--danger') };
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillStyle = c.text;
      ctx.strokeStyle = c.grid;
      ctx.lineWidth = 1;
      // 0선과 눈금
      ctx.beginPath();
      ctx.moveTo(pad.l, Y(0));
      ctx.lineTo(pad.l + pw, Y(0));
      ctx.stroke();
      ctx.textAlign = 'center';
      for (let k = 1; k <= 4; k++) {
        ctx.textAlign = k === 4 ? 'right' : 'center';
        ctx.fillText(((xmax * k) / 4).toLocaleString(), X((xmax * k) / 4) + (k === 4 ? 8 : 0), h - 6);
      }
      ctx.textAlign = 'right';
      for (const v of [-ylim / 2, ylim / 2]) ctx.fillText(String(Math.round(v)), pad.l - 4, Y(v) + 4);
      // ±√x 띠
      const n = 900;
      ctx.fillStyle = c.grid;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const x = X0 + ((xmax - X0) * i) / n;
        ctx.lineTo(X(x), Y(Math.sqrt(x)));
      }
      for (let i = n; i >= 0; i--) {
        const x = X0 + ((xmax - X0) * i) / n;
        ctx.lineTo(X(x), Y(-Math.sqrt(x)));
      }
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.save();
      ctx.beginPath();
      ctx.rect(pad.l, pad.t, pw, ph);
      ctx.clip();
      // 실제 ψ(x) − x
      ctx.strokeStyle = c.fg;
      ctx.lineWidth = 1;
      ctx.beginPath();
      let psi = 0;
      ctx.moveTo(X(X0), Y(0 - X0));
      for (const j of jumps) {
        if (j.n > xmax) break;
        ctx.lineTo(X(j.n), Y(psi - j.n));
        psi += Math.log(j.p);
        ctx.lineTo(X(j.n), Y(psi - j.n));
      }
      ctx.lineTo(X(xmax), Y(psi - xmax));
      ctx.stroke();
      // 영점 K개 모델 (β 반영)
      if (zeros) {
        const xs = new Float64Array(n + 1);
        for (let i = 0; i <= n; i++) xs[i] = X0 + ((xmax - X0) * i) / n;
        const ys = psiKCurve(xs, zeros, K, { smooth: true, offLine: { index: 0, beta } });
        ctx.strokeStyle = beta === 0.5 ? c.a : c.d;
        ctx.lineWidth = 2;
        ctx.beginPath();
        xs.forEach((x, i) => (i ? ctx.lineTo(X(x), Y(ys[i] - x)) : ctx.moveTo(X(x), Y(ys[i] - x))));
        ctx.stroke();
      }
      ctx.restore();
    },
    [zeros, beta, xmax, jumps],
  );

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('offline.title')}</strong>
        <span className={beta === 0.5 ? 'kval' : 'kval danger-text'}>β = {beta.toFixed(2)}</span>
      </figcaption>
      <div className="canvas-wrap">
        <canvas ref={canvasRef} aria-label={t('offline.title')} />
        {!zeros && <div className="overlay">{t('explicit.loading')}</div>}
      </div>
      <div className="legend">
        <span className="sw fg" /> {t('offline.actual')}
        <span className={beta === 0.5 ? 'sw accent' : 'sw danger'} /> {t('offline.model', { k: K })}
        <span className="sw band" /> {t('offline.band')}
      </div>
      <label className="beta">
        <span>{t('sound.hypothesis')}</span>
        <input type="range" className="slider" min={0.5} max={0.95} step={0.01} value={beta} onChange={(e) => onBeta(Number(e.target.value))} />
      </label>
      <div className="controls">
        <button className="btn" onClick={() => onBeta(0.5)} disabled={beta === 0.5}>
          β = ½
        </button>
        <span className="seg" role="group">
          {RANGES.map((r) => (
            <button key={r} className={r === xmax ? 'on' : ''} onClick={() => setXmax(r)}>
              ≤10{['', '', '', '³', '⁴', '⁵'][Math.log10(r)]}
            </button>
          ))}
        </span>
      </div>
      <p className={beta === 0.5 ? 'note' : 'note danger'}>{beta === 0.5 ? t('offline.on') : t('offline.off')}</p>
    </figure>
  );
}
