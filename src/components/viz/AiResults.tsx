import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/** Stage 9: 2026년 두 AI 결과를 한 그림에 — "선 위 비율" 게이지와 "좁아진 띠". */
const STRIPS = [
  { lo: 0, hi: 1, key: 'critical', cls: 'strip-0' },
  { lo: 1 / 12, hi: 11 / 12, key: 'q12', cls: 'strip-1' },
  { lo: 1 / 8, hi: 7 / 8, key: 'q8', cls: 'strip-2' },
] as const;

export default function AiResults() {
  const { t } = useTranslation();
  const [p, setP] = useState(41.6);
  const [shown, setShown] = useState<number>(STRIPS.length);
  useEffect(() => {
    const id = window.setTimeout(() => setP(67.2), 400);
    return () => clearTimeout(id);
  }, []);

  const W = 320;
  const X = (re: number) => 20 + re * (W - 40);
  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('ai.title')}</strong>
      </figcaption>

      <p className="question">{t('ai.gaugeTitle')}</p>
      <div className="gauge" role="img" aria-label={`${p}%`}>
        <div className="gauge-old" style={{ width: '41.6%' }} />
        <div className="gauge-new" style={{ width: `${p}%` }} />
        <span className="gauge-mark" style={{ left: '41.6%' }}>41.6%</span>
        <span className="gauge-mark new" style={{ left: '67.2%' }}>67.2%</span>
        <span className="gauge-end">100% = RH</span>
      </div>
      <p className="note">{t('ai.gaugeNote')}</p>

      <p className="question">{t('ai.stripTitle')}</p>
      <svg viewBox={`0 0 ${W} 150`} className="strips">
        {STRIPS.slice(0, shown).map((s, i) => (
          <g key={s.key}>
            <rect className={s.cls} x={X(s.lo)} y={10 + i * 8} width={X(s.hi) - X(s.lo)} height={110 - i * 16} rx={3} />
          </g>
        ))}
        <line className="rh-line" x1={X(0.5)} y1={4} x2={X(0.5)} y2={126} />
        {[0, 0.5, 1].map((v) => (
          <text key={v} x={X(v)} y={142} textAnchor="middle">
            {v === 0.5 ? '½' : v}
          </text>
        ))}
        <text x={X(1 / 8)} y={142} textAnchor="middle" className="small">⅛</text>
        <text x={X(7 / 8)} y={142} textAnchor="middle" className="small">⅞</text>
      </svg>
      <div className="legend strips-legend">
        {STRIPS.map((s, i) => (
          <button key={s.key} className={`chip-btn ${i < shown ? 'on' : ''}`} onClick={() => setShown(i + 1)}>
            <span className={`swatch ${s.cls}`} /> {t(`ai.${s.key}`)}
          </button>
        ))}
        <span className="chip-static">
          <span className="swatch rh" /> {t('ai.rh')}
        </span>
      </div>
      <p className="note">{t('ai.stripNote')}</p>
    </figure>
  );
}
