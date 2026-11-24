import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Prose, { type Segment } from '../components/Prose';

const LAYERS = ['lv1', 'lv2', 'lv3', 'lv4'] as const;
type Layer = (typeof LAYERS)[number];

export interface StageContent {
  story: Record<string, Segment[]>;
  lv3?: Record<string, Segment[]>;
}

interface Props {
  n: number;
  content: StageContent;
  graphics: Record<string, ReactNode>;
  prev?: number;
  next?: number;
}

/** 스테이지 공통 틀: 4개 깊이 탭(이야기/직관/수식/심화) + 이전·다음. */
export default function StagePage({ n, content, graphics, prev, next }: Props) {
  const { t, i18n } = useTranslation();
  const [layer, setLayer] = useState<Layer>('lv1');
  const pick = (m?: Record<string, Segment[]>) => m && (m[i18n.language] ?? m.ko);
  const lv3 = pick(content.lv3);

  return (
    <article className="page stage">
      <p className="eyebrow">Stage {n}</p>
      <nav className="layers" role="tablist">
        {LAYERS.map((l) => (
          <button
            key={l}
            role="tab"
            aria-selected={layer === l}
            className={layer === l ? 'on' : ''}
            onClick={() => {
              setLayer(l);
              window.scrollTo({ top: 0 });
            }}
          >
            {t(`layer.${l}`)}
          </button>
        ))}
      </nav>
      {layer === 'lv1' && <Prose segments={pick(content.story)!} graphics={graphics} />}
      {layer === 'lv2' && (
        <div className="prose">
          <h1>{t(`stages.${n}`)}</h1>
          {Object.entries(graphics).map(([id, g]) => (
            <div key={id}>{g}</div>
          ))}
        </div>
      )}
      {layer === 'lv3' &&
        (lv3 ? (
          <Prose segments={lv3} graphics={graphics} />
        ) : (
          <div className="prose">
            <p className="note">{t('layer.lv3Soon')}</p>
          </div>
        ))}
      {layer === 'lv4' && (
        <div className="prose">
          <p className="note">{t('layer.lv4Soon')}</p>
        </div>
      )}
      <nav className="stage-nav">
        {prev !== undefined ? <Link to={`/stage/${prev}`}>← {t(`stages.${prev}`)}</Link> : <span />}
        {next !== undefined ? <Link to={`/stage/${next}`}>{t(`stages.${next}`)} →</Link> : <span />}
      </nav>
    </article>
  );
}
