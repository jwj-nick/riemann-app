import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useJson } from '../../lib/data';
import { useCanvas, readVar } from './useCanvas';

interface Spacings {
  zeta: number[];
  gue: number[];
  poisson: number[];
  zerosUsed: number;
}

const BIN = 0.1;
const SMAX = 3;
const wigner = (s: number) => (32 / Math.PI ** 2) * s * s * Math.exp((-4 * s * s) / Math.PI);
const poissonPdf = (s: number) => Math.exp(-s);

function hist(a: number[]): number[] {
  const n = Math.round(SMAX / BIN);
  const h = new Array(n).fill(0);
  for (const v of a) if (v < SMAX) h[Math.floor(v / BIN)]++;
  return h.map((c) => c / (a.length * BIN)); // 밀도
}

type Cmp = 'gue' | 'poisson';

/** 정규화된 영점 간격 히스토그램 vs GUE(밀어냄) vs 무작위 점(포아송). */
export default function SpacingHistogram() {
  const { t } = useTranslation();
  const { data } = useJson<Spacings>('spacings.json');
  const [cmp, setCmp] = useState<Cmp>('poisson');
  const h = useMemo(() => (data ? { zeta: hist(data.zeta), gue: hist(data.gue), poisson: hist(data.poisson) } : null), [data]);
  const small = (a?: number[]) => (a ? ((100 * a.filter((v) => v < 0.25).length) / a.length).toFixed(1) : '');

  const canvasRef = useCanvas(
    (ctx, w, hgt) => {
      ctx.clearRect(0, 0, w, hgt);
      const pad = { l: 30, r: 10, t: 10, b: 24 };
      const pw = w - pad.l - pad.r;
      const ph = hgt - pad.t - pad.b;
      const YMAX = 1.3;
      const X = (s: number) => pad.l + (s / SMAX) * pw;
      const Y = (y: number) => pad.t + ph - (Math.min(y, YMAX) / YMAX) * ph;
      const c = { grid: readVar('--grid'), text: readVar('--muted'), fg: readVar('--fg'), a: readVar('--accent'), p: readVar('--prime') };
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillStyle = c.text;
      ctx.strokeStyle = c.grid;
      ctx.textAlign = 'center';
      for (const s of [0, 1, 2, 3]) {
        ctx.beginPath();
        ctx.moveTo(X(s), pad.t);
        ctx.lineTo(X(s), pad.t + ph);
        ctx.stroke();
        ctx.fillText(String(s), X(s), hgt - 6);
      }
      ctx.textAlign = 'right';
      for (const y of [0.5, 1]) {
        ctx.beginPath();
        ctx.moveTo(pad.l, Y(y));
        ctx.lineTo(pad.l + pw, Y(y));
        ctx.stroke();
        ctx.fillText(String(y), pad.l - 4, Y(y) + 4);
      }
      if (!h) return;
      const bw = (BIN / SMAX) * pw;
      // 비교 데이터: 외곽선 막대
      ctx.strokeStyle = cmp === 'gue' ? c.fg : c.p;
      ctx.lineWidth = 1.2;
      h[cmp].forEach((v, i) => ctx.strokeRect(X(i * BIN) + 1, Y(v), bw - 2, Y(0) - Y(v)));
      // 제타 영점: 채운 막대
      ctx.fillStyle = c.a;
      ctx.globalAlpha = 0.55;
      h.zeta.forEach((v, i) => ctx.fillRect(X(i * BIN) + 1, Y(v), bw - 2, Y(0) - Y(v)));
      ctx.globalAlpha = 1;
      // 이론 곡선
      const curve = (f: (s: number) => number, color: string, dash: number[]) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash(dash);
        ctx.beginPath();
        for (let i = 0; i <= 300; i++) {
          const s = (SMAX * i) / 300;
          i ? ctx.lineTo(X(s), Y(f(s))) : ctx.moveTo(X(s), Y(f(s)));
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };
      curve(wigner, c.fg, []);
      curve(poissonPdf, c.p, [5, 4]);
    },
    [h, cmp],
  );

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('spacing.title')}</strong>
        {data && <span className="kval">{t('spacing.n', { n: data.zeta.length.toLocaleString() })}</span>}
      </figcaption>
      <div className="canvas-wrap">
        <canvas ref={canvasRef} aria-label={t('spacing.title')} />
        {!data && <div className="overlay">{t('explicit.loading')}</div>}
      </div>
      <div className="legend">
        <span className="sw accent thick" /> {t('spacing.zeta')}
        <span className="sw fg" /> {t('spacing.gueCurve')}
        <span className="sw prime dashed-prime" /> {t('spacing.poissonCurve')}
      </div>
      <div className="controls">
        <span className="muted">{t('spacing.compare')}</span>
        <span className="seg" role="group">
          {(['poisson', 'gue'] as Cmp[]).map((k) => (
            <button key={k} className={k === cmp ? 'on' : ''} onClick={() => setCmp(k)}>
              {t(`spacing.${k}`)}
            </button>
          ))}
        </span>
      </div>
      {data && (
        <p className="note">
          {t('spacing.small', { zeta: small(data.zeta), gue: small(data.gue), poisson: small(data.poisson) })}
        </p>
      )}
      <p className="note">{t('spacing.nuclear')}</p>
    </figure>
  );
}
