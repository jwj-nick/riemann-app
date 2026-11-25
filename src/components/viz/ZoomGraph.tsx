import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Li, li } from '../../lib/primes';
import { usePiData, type PiData } from '../../lib/data';
import { useCanvas, readVar } from './useCanvas';

/** x ≤ xmax 범위의 π(x) 표본: 작은 배율은 정확한 계단, 큰 배율은 사전 계산 격자. */
function piSamples(d: PiData, xmax: number): { xs: number[]; ys: number[]; stairs: boolean } {
  if (xmax <= 1e4) {
    const xs = [0];
    const ys = [0];
    let c = 0;
    for (const p of d.primes) {
      if (p > xmax) break;
      xs.push(p, p);
      ys.push(c, ++c);
    }
    xs.push(xmax);
    ys.push(c);
    return { xs, ys, stairs: true };
  }
  const dec = Math.ceil(Math.log10(xmax) - 1e-9);
  const g = d.grids[String(dec)];
  const step = 10 ** dec / d.gridN;
  const xs: number[] = [];
  const ys: number[] = [];
  for (let k = 0; k <= d.gridN && k * step <= xmax * 1.0001; k++) {
    xs.push(Math.floor(k * step));
    ys.push(g[k]);
  }
  return { xs, ys, stairs: false };
}

export default function ZoomGraph() {
  const { t, i18n } = useTranslation();
  const { data, error } = usePiData();
  const [e, setE] = useState(2);
  const [showErr, setShowErr] = useState(false);
  const [liOnly, setLiOnly] = useState(false);
  const xmax = 10 ** e;
  const fmt = useMemo(() => new Intl.NumberFormat(i18n.language, { notation: 'compact', maximumSignificantDigits: 3 }), [i18n.language]);
  const fmtInt = useMemo(() => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 0 }), [i18n.language]);

  const s = useMemo(() => (data ? piSamples(data, xmax) : null), [data, xmax]);
  // 읽기값은 마지막 표본점 기준 (격자 모드에서 xmax와 조금 다를 수 있음)
  const xr = s ? Math.max(2, s.xs[s.xs.length - 1]) : xmax;
  const piAt = s ? s.ys[s.ys.length - 1] : 0;
  const xl = xr / Math.log(xr);
  const liVal = Li(xr);

  const canvasRef = useCanvas(
    (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      if (!s) return;
      const pad = { l: 44, r: 10, t: 10, b: 24 };
      const pw = w - pad.l - pad.r;
      const ph = h - pad.t - pad.b;
      const c = { grid: readVar('--grid'), text: readVar('--muted'), fg: readVar('--fg'), a: readVar('--accent'), p: readVar('--prime') };
      const X0 = 2;
      const curveXs = Array.from({ length: 300 }, (_, i) => X0 + ((xmax - X0) * i) / 299);

      // 그릴 시리즈 정의
      type Series = { xs: number[]; ys: number[]; color: string; width: number; dash?: number[] };
      let series: Series[];
      if (!showErr) {
        series = [
          { xs: curveXs, ys: curveXs.map((x) => x / Math.log(x)), color: c.p, width: 1.5, dash: [5, 4] },
          { xs: curveXs, ys: curveXs.map(Li), color: c.a, width: 1.5 },
          { xs: s.xs, ys: s.ys, color: c.fg, width: 2 },
        ];
      } else if (liOnly) {
        // π(x) − li(x) 와, 리만 가설 아래 쇤펠트(1976) 한계 ±√x·ln x/(8π) (x ≥ 2657)
        const pts = s.xs.map((x, i) => [x, s.ys[i]]).filter(([x]) => x >= X0);
        const bx = curveXs.filter((x) => x >= 2657);
        const bound = (x: number) => (Math.sqrt(x) * Math.log(x)) / (8 * Math.PI);
        series = [
          { xs: bx, ys: bx.map(bound), color: c.text, width: 1, dash: [3, 3] },
          { xs: bx, ys: bx.map((x) => -bound(x)), color: c.text, width: 1, dash: [3, 3] },
          { xs: pts.map((p) => p[0]), ys: pts.map(([x, y]) => y - li(x)), color: c.a, width: 1.5 },
        ];
      } else {
        const pts = s.xs.map((x, i) => [x, s.ys[i]]).filter(([x]) => x >= X0);
        series = [
          { xs: pts.map((p) => p[0]), ys: pts.map(([x, y]) => y - x / Math.log(x)), color: c.p, width: 1.5 },
          { xs: pts.map((p) => p[0]), ys: pts.map(([x, y]) => y - Li(x)), color: c.a, width: 1.5 },
        ];
      }
      let ymin = 0;
      let ymax = 0;
      for (const sr of series) for (const y of sr.ys) (ymin = Math.min(ymin, y)), (ymax = Math.max(ymax, y));
      const span = ymax - ymin || 1;
      ymax += span * 0.08;
      if (showErr) ymin -= span * 0.08;
      const X = (x: number) => pad.l + (x / xmax) * pw;
      const Y = (y: number) => pad.t + ph - ((y - ymin) / (ymax - ymin)) * ph;

      // 눈금
      ctx.font = '11px system-ui, sans-serif';
      ctx.strokeStyle = c.grid;
      ctx.fillStyle = c.text;
      ctx.lineWidth = 1;
      const nice = (span: number) => {
        const raw = span / 4;
        const p = 10 ** Math.floor(Math.log10(raw));
        return [1, 2, 5, 10].map((m) => m * p).find((v) => v >= raw)!;
      };
      const sx = nice(xmax);
      ctx.textAlign = 'center';
      for (let x = sx; x <= xmax * 1.0001; x += sx) {
        ctx.beginPath();
        ctx.moveTo(X(x), pad.t);
        ctx.lineTo(X(x), pad.t + ph);
        ctx.stroke();
        ctx.fillText(fmt.format(x), X(x), h - 6);
      }
      const sy = nice(ymax - ymin);
      ctx.textAlign = 'right';
      for (let y = Math.ceil(ymin / sy) * sy; y <= ymax; y += sy) {
        ctx.strokeStyle = Math.abs(y) < sy / 2 && showErr ? c.text : c.grid;
        ctx.beginPath();
        ctx.moveTo(pad.l, Y(y));
        ctx.lineTo(pad.l + pw, Y(y));
        ctx.stroke();
        ctx.fillText(Math.abs(y) < sy / 2 ? '0' : fmt.format(Math.round(y)), pad.l - 4, Y(y) + 4);
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(pad.l, pad.t, pw, ph);
      ctx.clip();
      for (const sr of series) {
        ctx.strokeStyle = sr.color;
        ctx.lineWidth = sr.width;
        ctx.setLineDash(sr.dash ?? []);
        ctx.beginPath();
        sr.xs.forEach((x, i) => (i ? ctx.lineTo(X(x), Y(sr.ys[i])) : ctx.moveTo(X(x), Y(sr.ys[i]))));
        ctx.stroke();
      }
      ctx.restore();
    },
    [s, showErr, liOnly, xmax, fmt],
  );

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('zoom.title')}</strong>
        <span className="kval">{t('zoom.xmax', { x: fmt.format(xmax) })}</span>
      </figcaption>
      <div className="canvas-wrap">
        <canvas ref={canvasRef} aria-label={t('zoom.title')} />
        {!data && <div className="overlay">{error ? t('explicit.error') : t('explicit.loading')}</div>}
      </div>
      <div className="legend">
        {showErr && liOnly ? (
          <>
            <span className="sw accent" /> {t('zoom.errLiOnly')}
            <span className="sw dashed" /> {t('zoom.rhBound')}
          </>
        ) : showErr ? (
          <>
            <span className="sw prime" /> {t('zoom.errPi')}
            <span className="sw accent" /> {t('zoom.errLi')}
          </>
        ) : (
          <>
            <span className="sw fg" /> {t('zoom.pi')}
            <span className="sw prime dashed-prime" /> {t('zoom.xlog')}
            <span className="sw accent" /> {t('zoom.li')}
          </>
        )}
      </div>
      <input
        type="range"
        className="slider"
        min={1}
        max={9}
        step={0.01}
        value={e}
        onChange={(ev) => setE(Number(ev.target.value))}
        aria-label={t('zoom.xmax', { x: fmt.format(xmax) })}
      />
      <div className="controls">
        <label className="toggle">
          <input type="checkbox" checked={showErr} onChange={(ev) => setShowErr(ev.target.checked)} /> {t('zoom.error')}
        </label>
        {showErr && (
          <label className="toggle">
            <input type="checkbox" checked={liOnly} onChange={(ev) => setLiOnly(ev.target.checked)} /> {t('zoom.liOnly')}
          </label>
        )}
        <span className="seg" role="group">
          {[2, 4, 6, 9].map((v) => (
            <button key={v} className={Math.abs(e - v) < 0.005 ? 'on' : ''} onClick={() => setE(v)}>
              10{['', '', '²', '', '⁴', '', '⁶', '', '', '⁹'][v]}
            </button>
          ))}
        </span>
      </div>
      {data && (
        <p className="note">
          {t('zoom.readout', { x: fmtInt.format(Math.floor(xr)), pi: fmtInt.format(piAt), xl: fmtInt.format(xl), li: fmtInt.format(liVal) })}
          <br />
          {t('zoom.ratio', { r: (piAt / xl).toFixed(4) })}
        </p>
      )}
    </figure>
  );
}
