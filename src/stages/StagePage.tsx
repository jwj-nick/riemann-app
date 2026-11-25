import { useEffect, useState, type ReactNode } from 'react';
import { markSeen } from '../lib/progress';
import { useEdition } from '../lib/edition';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Prose, { type Segment } from '../components/Prose';

const LAYERS = ['lv1', 'lv2', 'lv3', 'lv4'] as const;
type Layer = (typeof LAYERS)[number];

export interface StageContent {
  story: Record<string, Segment[]>;
  /** 중고생판 이야기 (없는 언어는 일반판으로) */
  junior?: Record<string, Segment[]>;
  lv3?: Record<string, Segment[]>;
  lv4?: Record<string, Segment[]>;
  /** 직관 탭 해설(그래픽 자리 포함). 없으면 그래픽만 나열 */
  lv2?: Record<string, Segment[]>;
  /** Lv3 원고가 오너 검토 전 초안이면 true */
  lv3Draft?: boolean;
  lv4Draft?: boolean;
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
  const edition = useEdition();
  const pick = (m?: Record<string, Segment[]>) => m && (m[i18n.language] ?? m.ko);
  const story = (edition === 'junior' && content.junior?.[i18n.language]) || pick(content.story)!;
  const lv3 = pick(content.lv3);
  const lv4 = pick(content.lv4);
  const lv2 = content.lv2?.[i18n.language];
  useEffect(() => {
    markSeen(n, layer);
  }, [n, layer]);

  return (
    <article className="page stage">
      <p className="eyebrow">
        Stage {n}
        {edition === 'junior' && <span className="badge junior">{t('nav.junior')}</span>}
      </p>
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
      {(layer === 'lv2' || layer === 'lv3') && (
        <p className="note glossary-hint">
          <Link to="/glossary">{t('nav.glossaryHint')}</Link>
        </p>
      )}
      {layer === 'lv1' && <Prose segments={story} graphics={graphics} />}
      {layer === 'lv2' &&
        (lv2 ? (
          <>
            <div className="prose">
              <h1>{t(`stages.${n}`)}</h1>
            </div>
            <Prose segments={lv2} graphics={graphics} />
            {/* 해설에 자리가 없는 그래픽은 끝에 붙인다 */}
            <div className="prose">
              {Object.entries(graphics)
                .filter(([id]) => !lv2.some((sg) => 'graphic' in sg && sg.graphic === id))
                .map(([id, g]) => (
                  <div key={id}>{g}</div>
                ))}
            </div>
          </>
        ) : (
          <div className="prose">
            <h1>{t(`stages.${n}`)}</h1>
            {Object.entries(graphics).map(([id, g]) => (
              <div key={id}>{g}</div>
            ))}
          </div>
        ))}
      {layer === 'lv3' &&
        (lv3 ? (
          <>
            {content.lv3Draft && <p className="draft-banner">{t('layer.draft')}</p>}
            <Prose segments={lv3} graphics={graphics} />
          </>
        ) : (
          <div className="prose">
            <p className="note">{t('layer.lv3Soon')}</p>
          </div>
        ))}
      {layer === 'lv4' &&
        (lv4 ? (
          <>
            {content.lv4Draft && <p className="draft-banner">{t('layer.draft')}</p>}
            <Prose segments={lv4} graphics={graphics} />
          </>
        ) : (
          <div className="prose">
            <p className="note">{t('layer.lv4Soon')}</p>
          </div>
        ))}
      <nav className="stage-nav">
        {prev !== undefined ? <Link to={`/stage/${prev}`}>← {t(`stages.${prev}`)}</Link> : <span />}
        {next !== undefined ? <Link to={`/stage/${next}`}>{t(`stages.${next}`)} →</Link> : <span />}
      </nav>
    </article>
  );
}
