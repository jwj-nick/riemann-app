import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Prose, { type Segment } from '../components/Prose';
import ExplicitFormula from '../components/viz/ExplicitFormula';
import storyKo from '../../content/ko/stage-06.md';
import storyEn from '../../content/en/stage-06.md';
import lv3Ko from '../../content/ko/stage-06-lv3-derivation.md';
import lv3En from '../../content/en/stage-06-lv3.md';

const LAYERS = ['lv1', 'lv2', 'lv3', 'lv4'] as const;
type Layer = (typeof LAYERS)[number];

const content: Record<string, { story: Segment[]; lv3: Segment[] }> = {
  ko: { story: storyKo, lv3: lv3Ko },
  en: { story: storyEn, lv3: lv3En },
};

export default function Stage06() {
  const { t, i18n } = useTranslation();
  const [layer, setLayer] = useState<Layer>('lv1');
  const beta = 0.5;
  const c = content[i18n.language] ?? content.ko;
  const graphics: Record<string, JSX.Element> = {
    'explicit-formula': <ExplicitFormula beta={beta} />,
  };

  return (
    <article className="page stage">
      <p className="eyebrow">Stage 6</p>
      <nav className="layers" role="tablist">
        {LAYERS.map((l) => (
          <button key={l} role="tab" aria-selected={layer === l} className={layer === l ? 'on' : ''} onClick={() => {
              setLayer(l);
              window.scrollTo({ top: 0 });
            }}>
            {t(`layer.${l}`)}
          </button>
        ))}
      </nav>
      {layer === 'lv1' && <Prose segments={c.story} graphics={graphics} />}
      {layer === 'lv2' && (
        <div className="prose">
          <h1>{t('stages.6')}</h1>
          {graphics['explicit-formula']}
        </div>
      )}
      {layer === 'lv3' && <Prose segments={c.lv3} graphics={graphics} />}
      {layer === 'lv4' && (
        <div className="prose">
          <p className="note">{t('layer.lv4Soon')}</p>
        </div>
      )}
    </article>
  );
}
