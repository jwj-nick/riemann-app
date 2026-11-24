import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useZeros } from '../../lib/data';
import { PrimeSoundEngine, amplitudes, growthFactor, type SoundMode } from '../../lib/audio';
import { useCanvas, readVar } from './useCanvas';

interface Props {
  beta: number;
  onBeta: (b: number) => void;
}

export default function PrimeSound({ beta, onBeta }: Props) {
  const { t } = useTranslation();
  const { zeros } = useZeros();
  const engine = useRef<PrimeSoundEngine | null>(null);
  const [playing, setPlaying] = useState(false);
  const [K, setK] = useState(20);
  const [mode, setMode] = useState<SoundMode>('chord');
  const [elapsed, setElapsed] = useState(0);
  const supported = PrimeSoundEngine.supported();

  useEffect(() => () => engine.current?.stop(), []);

  // 재생 중 경과 시간 추적 (막대 성장·종료 감지)
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const e = engine.current;
      if (!e?.playing) {
        setPlaying(false);
        setElapsed(0);
        return;
      }
      setElapsed(e.elapsed());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = async () => {
    if (!zeros) return;
    engine.current ??= new PrimeSoundEngine();
    if (playing) {
      engine.current.stop();
      setPlaying(false);
      return;
    }
    await engine.current.start(zeros, K, mode, beta);
    setPlaying(true);
  };

  const changeBeta = (b: number) => {
    onBeta(b);
    engine.current?.setBeta(b);
  };

  // 영점 "악보": 진동수 위치에 진폭 막대
  const canvasRef = useCanvas(
    (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      if (!zeros) return;
      const n = Math.min(K, zeros.length);
      const amps = amplitudes(zeros, n);
      const gmax = zeros[n - 1] * 1.05;
      const pad = 8;
      const X = (g: number) => pad + (g / gmax) * (w - 2 * pad);
      const grow = playing && mode === 'chord' ? growthFactor(beta, elapsed) : 1;
      const scale = (h - 20) / (amps[0] * 1.6);
      ctx.strokeStyle = readVar('--grid');
      ctx.beginPath();
      ctx.moveTo(pad, h - 12);
      ctx.lineTo(w - pad, h - 12);
      ctx.stroke();
      for (let k = 0; k < n; k++) {
        const a = amps[k] * (k === 0 ? grow : 1);
        const bh = Math.min(h - 14, a * scale);
        ctx.fillStyle = k === 0 && beta !== 0.5 ? readVar('--danger') : readVar('--accent');
        ctx.fillRect(X(zeros[k]) - 1.5, h - 12 - bh, 3, bh);
      }
      ctx.fillStyle = readVar('--muted');
      ctx.font = '10px system-ui, sans-serif';
      ctx.fillText('γ₁', X(zeros[0]) - 5, h - 1);
    },
    [zeros, K, beta, elapsed, playing, mode],
  );

  if (!supported) return <p className="note">{t('sound.unsupported')}</p>;

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('sound.title')}</strong>
        <span className="kval">{t('sound.voices', { count: K })}</span>
      </figcaption>
      <div className="canvas-wrap short">
        <canvas ref={canvasRef} aria-hidden />
      </div>
      <input
        type="range"
        className="slider"
        min={1}
        max={100}
        value={K}
        disabled={playing}
        onChange={(e) => setK(Number(e.target.value))}
        aria-label={t('sound.voices', { count: K })}
      />
      <div className="controls">
        <button className="btn primary" onClick={toggle} disabled={!zeros}>
          {playing ? `■ ${t('sound.stop')}` : `▶ ${t('sound.play')}`}
        </button>
        <label className="toggle">
          <input
            type="checkbox"
            checked={mode === 'solo'}
            disabled={playing}
            onChange={(e) => setMode(e.target.checked ? 'solo' : 'chord')}
          />{' '}
          {t('sound.solo')}
        </label>
      </div>
      <label className="beta">
        <span>
          {t('sound.hypothesis')}: <b>{beta.toFixed(2)}</b>
        </span>
        <input
          type="range"
          className="slider"
          min={0.5}
          max={0.95}
          step={0.01}
          value={beta}
          onChange={(e) => changeBeta(Number(e.target.value))}
        />
      </label>
      <p className={beta === 0.5 ? 'note' : 'note danger'}>{beta === 0.5 ? t('sound.onLine') : t('sound.offLine')}</p>
      <p className="note">{t('sound.mapping')}</p>
    </figure>
  );
}
