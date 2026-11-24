import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const R = 2.6; // 보이는 범위 [−R, R]
const SIZE = 300;
const toPx = (v: number) => (v / R) * (SIZE / 2);
const fmt = (v: number) => (Math.abs(v) < 0.005 ? '0' : v.toFixed(2).replace('-', '−'));
const fmtZ = (a: number, b: number) => `${fmt(a)} ${b < 0 ? '−' : '+'} ${fmt(Math.abs(b))}i`;

/** 복소평면 놀이터: 점 드래그, ×i 회전 애니메이션, e^{iθ} 단위원. */
export default function ComplexPlane() {
  const { t } = useTranslation();
  const [z, setZ] = useState<[number, number]>([1.5, 0.5]);
  const [turns, setTurns] = useState(0);
  const [trail, setTrail] = useState<[number, number][]>([]);
  const [anim, setAnim] = useState(false);
  const [theta, setTheta] = useState(Math.PI / 3);
  const [showEuler, setShowEuler] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const raf = useRef(0);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const rotate = (angle: number, count: number) => {
    if (anim) return;
    const [a, b] = z;
    const r = Math.hypot(a, b);
    const a0 = Math.atan2(b, a);
    const t0 = performance.now();
    const pts: [number, number][] = [];
    setAnim(true);
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / 450);
      const e = 1 - (1 - k) ** 3;
      const ang = a0 + angle * e;
      const p: [number, number] = [r * Math.cos(ang), r * Math.sin(ang)];
      pts.push(p);
      setTrail([...pts]);
      setZ(p);
      if (k < 1) raf.current = requestAnimationFrame(tick);
      else {
        // 누적 오차 제거: 정확한 곱셈 결과로 스냅
        setZ(count === 1 ? [-b, a] : [-a, -b]);
        setTurns((n) => n + count);
        setAnim(false);
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  const pointFromEvent = (ev: React.PointerEvent) => {
    const svg = svgRef.current!;
    const rect = svg.getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / rect.width - 0.5) * 2 * R;
    const y = -((ev.clientY - rect.top) / rect.height - 0.5) * 2 * R;
    const clamp = (v: number) => Math.max(-R + 0.1, Math.min(R - 0.1, v));
    setZ([clamp(x), clamp(y)]);
    setTrail([]);
    setTurns(0);
  };

  const [a, b] = z;
  const eu: [number, number] = [Math.cos(theta), Math.sin(theta)];
  const ticks = [-2, -1, 1, 2];

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('complex.title')}</strong>
        <span className="kval">z = {fmtZ(a, b)}</span>
      </figcaption>
      <svg
        ref={svgRef}
        className="plane"
        viewBox={`${-SIZE / 2} ${-SIZE / 2} ${SIZE} ${SIZE}`}
        onPointerDown={(ev) => {
          if (anim) return;
          dragging.current = true;
          (ev.target as Element).setPointerCapture?.(ev.pointerId);
          pointFromEvent(ev);
        }}
        onPointerMove={(ev) => dragging.current && pointFromEvent(ev)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {ticks.map((v) => (
          <g key={v} className="grid">
            <line x1={toPx(v)} y1={-SIZE / 2} x2={toPx(v)} y2={SIZE / 2} />
            <line x1={-SIZE / 2} y1={toPx(v)} x2={SIZE / 2} y2={toPx(v)} />
            <text x={toPx(v)} y={14} textAnchor="middle">
              {v}
            </text>
            <text x={-6} y={-toPx(v) + 4} textAnchor="end">
              {v === 1 ? 'i' : v === -1 ? '−i' : `${v}i`}
            </text>
          </g>
        ))}
        <line className="axis" x1={-SIZE / 2} y1={0} x2={SIZE / 2} y2={0} />
        <line className="axis" x1={0} y1={-SIZE / 2} x2={0} y2={SIZE / 2} />
        <text className="axis-label" x={SIZE / 2 - 4} y={-6} textAnchor="end">
          {t('complex.re')}
        </text>
        <text className="axis-label" x={6} y={-SIZE / 2 + 12}>
          {t('complex.im')}
        </text>
        <circle className="unit" r={toPx(1)} />
        {showEuler && (
          <g className="euler">
            <path
              d={`M ${toPx(0.35)} 0 A ${toPx(0.35)} ${toPx(0.35)} 0 ${theta > Math.PI ? 1 : 0} 0 ${toPx(0.35 * eu[0])} ${-toPx(0.35 * eu[1])}`}
            />
            <line x1={0} y1={0} x2={toPx(eu[0])} y2={-toPx(eu[1])} />
            <line className="proj" x1={toPx(eu[0])} y1={0} x2={toPx(eu[0])} y2={-toPx(eu[1])} />
            <circle cx={toPx(eu[0])} cy={-toPx(eu[1])} r={6} />
          </g>
        )}
        {trail.length > 1 && <polyline className="trail" points={trail.map(([x, y]) => `${toPx(x)},${-toPx(y)}`).join(' ')} />}
        <line className="zvec" x1={0} y1={0} x2={toPx(a)} y2={-toPx(b)} />
        <circle className="zpt" cx={toPx(a)} cy={-toPx(b)} r={9} />
      </svg>
      <p className="note">{turns % 4 === 0 && turns > 0 ? t('complex.full') : turns > 0 ? t('complex.count', { n: turns, deg: turns * 90 }) : t('complex.drag')}</p>
      <div className="controls">
        <button className="btn primary" onClick={() => rotate(Math.PI / 2, 1)} disabled={anim}>
          {t('complex.times')}
        </button>
        <button className="btn" onClick={() => rotate(Math.PI, 2)} disabled={anim}>
          {t('complex.neg')}
        </button>
        <button
          className="btn"
          onClick={() => {
            setZ([1, 0]);
            setTrail([]);
            setTurns(0);
          }}
          disabled={anim}
        >
          {t('common.reset')}
        </button>
        <label className="toggle">
          <input type="checkbox" checked={showEuler} onChange={(e) => setShowEuler(e.target.checked)} /> {t('complex.eulerOn')}
        </label>
      </div>
      {showEuler && (
        <label className="beta">
          <span>
            θ = {Math.round((theta * 180) / Math.PI)}° → e<sup>iθ</sup> = {fmtZ(eu[0], eu[1])}
          </span>
          <input
            type="range"
            className="slider"
            min={0}
            max={2 * Math.PI}
            step={0.01}
            value={theta}
            onChange={(e) => setTheta(Number(e.target.value))}
            aria-label={t('complex.euler')}
          />
        </label>
      )}
    </figure>
  );
}
