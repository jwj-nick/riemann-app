/** Stage 5, 7, 8 (M3: 풍경·나선·통계) */
import { useState } from 'react';
import StagePage from './StagePage';
import ZetaLandscape from '../components/viz/ZetaLandscape';
import ZetaSpiral from '../components/viz/ZetaSpiral';
import OffLineWorld from '../components/viz/OffLineWorld';
import PrimeSound from '../components/viz/PrimeSound';
import SpacingHistogram from '../components/viz/SpacingHistogram';
import s5ko from '../../content/ko/stage-05.md';
import s5en from '../../content/en/stage-05.md';
import s7ko from '../../content/ko/stage-07.md';
import s7en from '../../content/en/stage-07.md';
import s8ko from '../../content/ko/stage-08.md';
import s8en from '../../content/en/stage-08.md';

export const Stage05 = () => (
  <StagePage n={5} prev={4} next={6} content={{ story: { ko: s5ko, en: s5en } }} graphics={{ 'zeta-landscape': <ZetaLandscape /> }} />
);

export function Stage07() {
  const [beta, setBeta] = useState(0.5);
  return (
    <StagePage
      n={7}
      prev={6}
      next={8}
      content={{ story: { ko: s7ko, en: s7en } }}
      graphics={{
        'zeta-spiral': <ZetaSpiral />,
        'off-line': (
          <>
            <OffLineWorld beta={beta} onBeta={setBeta} />
            <PrimeSound beta={beta} onBeta={setBeta} />
          </>
        ),
      }}
    />
  );
}

export const Stage08 = () => (
  <StagePage n={8} prev={7} content={{ story: { ko: s8ko, en: s8en } }} graphics={{ spacing: <SpacingHistogram /> }} />
);
