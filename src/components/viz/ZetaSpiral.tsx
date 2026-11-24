import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useJson, useZeros } from '../../lib/data';
import { useCanvas, readVar } from './useCanvas';

interface Line {
  dt: number;
  re: number[];
  im: number[];
}

const T_MAX = 100;
const BOX = { x0: -2, x1: 5, y0: -3.2, y1: 3.2 };

/** 제타 나선: t를 올리며 ζ(½+it)의 궤적을 그린다. 원점을 지날 때마다 영점이 켜진다. */
export default function ZetaSpiral() {
  const { t } = useTranslation();
  const { data } = useJson<Line>('zeta_line.json');
  const { zeros } = useZeros();
  const [T, setT] = useState(15);
  const [playing, setPlaying] = useState(false);
  const [ping, setPing] = useState(true);
  const audio = useRef<AudioContext | null>(null);
  const lastCount = useRef(0);

  const found: number[] = zeros ? Array.from(zeros.filter((g) => g <= T)) : [];

  // 원점 통과 효과음
  useEffect(() => {
    if (found.length > lastCount.current && playing && ping) {
      try {
        audio.current ??= new AudioContext();
        const ctx = audio.current;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.frequency.value = 660 + 40 * (found.length % 8);
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
        o.connect(g).connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.4);
      } catch {
        /* 오디오 불가 환경 무시 */
      }
    }
    lastCount.current = found.length;
  }, [found.length, playing, ping]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = (now - prev) / 1000;
      prev = now;
      let done = false;
      setT((x) => {
        const nx = Math.min(T_MAX, x + dt * 4); // 초당 t 4
        done = nx >= T_MAX;
        return nx;
      });
      if (!done) raf = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const n = data ? Math.min(data.re.length - 1, Math.round(T / data.dt)) : 0;
  const cur = data ? [data.re[n], data.im[n]] : [0, 0];
  const mod = Math.hypot(cur[0], cur[1]);

  const canvasRef = useCanvas(
    (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      const sx = w / (BOX.x1 - BOX.x0);
      const sy = h / (BOX.y1 - BOX.y0);
      const s = Math.min(sx, sy);
      const ox = (w - s * (BOX.x1 - BOX.x0)) / 2 - BOX.x0 * s;
      const oy = h / 2;
      const X = (x: number) => ox + x * s;
      const Y = (y: number) => oy - y * s;
      const c = { grid: readVar('--grid'), text: readVar('--muted'), fg: readVar('--fg'), a: readVar('--accent'), p: readVar('--prime') };
      ctx.strokeStyle = c.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, Y(0));
      ctx.lineTo(w, Y(0));
      ctx.moveTo(X(0), 0);
      ctx.lineTo(X(0), h);
      ctx.stroke();
      ctx.fillStyle = c.text;
      ctx.font = '11px system-ui, sans-serif';
      for (const v of [-1, 1, 2, 3, 4]) ctx.fillText(String(v), X(v) - 3, Y(0) + 14);
      if (!data) return;
      // 궤적: 오래된 부분은 흐리게
      const start = Math.max(0, n - 1500);
      ctx.lineWidth = 1.6;
      for (let k = start + 1; k <= n; k++) {
        const age = (n - k) / 1500;
        ctx.strokeStyle = c.a;
        ctx.globalAlpha = 0.25 + 0.75 * (1 - age);
        ctx.beginPath();
        ctx.moveTo(X(data.re[k - 1]), Y(data.im[k - 1]));
        ctx.lineTo(X(data.re[k]), Y(data.im[k]));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // 원점
      const near = mod < 0.25;
      ctx.fillStyle = near ? c.p : c.fg;
      ctx.beginPath();
      ctx.arc(X(0), Y(0), near ? 7 : 4, 0, Math.PI * 2);
      ctx.fill();
      // 현재 점
      ctx.fillStyle = c.a;
      ctx.beginPath();
      ctx.arc(X(cur[0]), Y(cur[1]), 5, 0, Math.PI * 2);
      ctx.fill();
    },
    [data, n],
  );

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('spiral.title')}</strong>
        <span className="kval">t = {T.toFixed(2)}</span>
      </figcaption>
      <div className="canvas-wrap">
        <canvas ref={canvasRef} aria-label={t('spiral.title')} />
        {!data && <div className="overlay">{t('explicit.loading')}</div>}
      </div>
      <p className="note">
        ζ(½ + {T.toFixed(2)}i) = {cur[0].toFixed(3)} {cur[1] < 0 ? '−' : '+'} {Math.abs(cur[1]).toFixed(3)}i · |ζ| = {mod.toFixed(3)}
      </p>
      <input
        type="range"
        className="slider"
        min={0}
        max={T_MAX}
        step={0.02}
        value={T}
        onChange={(e) => {
          setPlaying(false);
          setT(Number(e.target.value));
        }}
        aria-label="t"
      />
      <div className="controls">
        <button className="btn primary" onClick={() => (playing ? setPlaying(false) : (T >= T_MAX && setT(0), setPlaying(true)))}>
          {playing ? t('common.pause') : t('common.play')}
        </button>
        <label className="toggle">
          <input type="checkbox" checked={ping} onChange={(e) => setPing(e.target.checked)} /> {t('spiral.ping')}
        </label>
      </div>
      <div className="zero-chips" aria-live="polite">
        <span className="muted">{t('spiral.found', { count: found.length })}</span>
        {found.slice(-6).map((g) => (
          <span key={g} className="chip">
            {g.toFixed(3)}
          </span>
        ))}
      </div>
    </figure>
  );
}
