import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useZeros } from '../../lib/data';
import { PrimeSoundEngine, amplitudes } from '../../lib/audio';
import { useCanvas, readVar } from './useCanvas';

const K = 24;
const SECONDS = 5;

/** 프롤로그: 영점 주파수로 만든 5초 "소수의 소리". 정체는 Stage 6에서 밝혀진다. */
export default function Teaser() {
  const { t } = useTranslation();
  const { zeros } = useZeros();
  const engine = useRef<PrimeSoundEngine | null>(null);
  const [elapsed, setElapsed] = useState(-1);
  const playing = elapsed >= 0;

  useEffect(() => () => engine.current?.stop(), []);
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const e = (now - t0) / 1000;
      if (e > SECONDS + 0.3) return setElapsed(-1);
      setElapsed(e);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const play = async () => {
    if (!zeros || playing) return;
    engine.current ??= new PrimeSoundEngine();
    await engine.current.teaser(zeros, K, SECONDS);
    setElapsed(0);
  };

  // 원형 파문: 음이 하나씩 들어올 때마다 고리가 켜진다
  const canvasRef = useCanvas(
    (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      if (!zeros) return;
      const amps = amplitudes(zeros, K);
      const cx = w / 2;
      const cy = h / 2;
      const rmax = Math.min(w, h) * 0.46;
      const accent = readVar('--accent');
      const muted = readVar('--grid');
      const entered = playing ? Math.min(K, Math.floor(elapsed / ((SECONDS * 0.45) / K)) + 1) : 0;
      const fade = playing ? Math.min(1, Math.max(0, (SECONDS - elapsed) / 0.8)) : 0;
      for (let k = 0; k < K; k++) {
        const r = rmax * (0.18 + 0.82 * (zeros[k] - zeros[0]) / (zeros[K - 1] - zeros[0]));
        const on = k < entered;
        const wobble = on ? Math.sin(elapsed * zeros[k] * 0.6) * 2.5 * (amps[k] / amps[0]) : 0;
        ctx.strokeStyle = on ? accent : muted;
        ctx.globalAlpha = on ? 0.25 + 0.75 * fade * (amps[k] / amps[0]) : 0.6;
        ctx.lineWidth = on ? 2 : 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r + wobble, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    },
    [zeros, elapsed, playing],
  );

  return (
    <figure className="viz teaser">
      <div className="canvas-wrap square">
        <canvas ref={canvasRef} aria-hidden />
        <button className="btn primary play-big" onClick={play} disabled={!zeros || playing}>
          {playing ? '♪' : `▶ ${t('teaser.play')}`}
        </button>
      </div>
      <p className="note center">{t('teaser.caption')}</p>
    </figure>
  );
}
