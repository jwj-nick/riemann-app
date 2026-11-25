/** Stage 5, 7, 8 (M3: 풍경·나선·통계), Stage 9 (M4) */
import { useState } from 'react';
import StagePage from './StagePage';
import j5 from '../../content/ko/junior/stage-05.md';
import j7 from '../../content/ko/junior/stage-07.md';
import j8 from '../../content/ko/junior/stage-08.md';
import j9 from '../../content/ko/junior/stage-09.md';
import ZetaLandscape from '../components/viz/ZetaLandscape';
import ZetaSpiral from '../components/viz/ZetaSpiral';
import OffLineWorld from '../components/viz/OffLineWorld';
import PrimeSound from '../components/viz/PrimeSound';
import SpacingHistogram from '../components/viz/SpacingHistogram';
import AiResults from '../components/viz/AiResults';
import s9ko from '../../content/ko/stage-09.md';
import s9en from '../../content/en/stage-09.md';
import s9lv4ko from '../../content/ko/stage-09-lv4.md';
import s9lv4en from '../../content/en/stage-09-lv4.md';
import lv4en from '../../content/en/lv4-pending.md';
import d5 from '../../content/ko/stage-05-lv4.md';
import d7 from '../../content/ko/stage-07-lv4.md';
import d8 from '../../content/ko/stage-08-lv4.md';
import lv3en from '../../content/en/lv3-pending.md';
import l5 from '../../content/ko/stage-05-lv3.md';
import l7 from '../../content/ko/stage-07-lv3.md';
import l8 from '../../content/ko/stage-08-lv3.md';
import s5ko from '../../content/ko/stage-05.md';
import s5en from '../../content/en/stage-05.md';
import s7ko from '../../content/ko/stage-07.md';
import s7en from '../../content/en/stage-07.md';
import s8ko from '../../content/ko/stage-08.md';
import s8en from '../../content/en/stage-08.md';

export const Stage05 = () => (
  <StagePage n={5} prev={4} next={6} content={{ story: { ko: s5ko, en: s5en }, junior: { ko: j5 }, lv3: { ko: l5, en: lv3en }, lv3Draft: true, lv4: { ko: d5, en: lv4en }, lv4Draft: true }} graphics={{ 'zeta-landscape': <ZetaLandscape /> }} />
);

export function Stage07() {
  const [beta, setBeta] = useState(0.5);
  return (
    <StagePage
      n={7}
      prev={6}
      next={8}
      content={{ story: { ko: s7ko, en: s7en }, junior: { ko: j7 }, lv3: { ko: l7, en: lv3en }, lv3Draft: true, lv4: { ko: d7, en: lv4en }, lv4Draft: true }}
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
  <StagePage n={8} prev={7} next={9} content={{ story: { ko: s8ko, en: s8en }, junior: { ko: j8 }, lv3: { ko: l8, en: lv3en }, lv3Draft: true, lv4: { ko: d8, en: lv4en }, lv4Draft: true }} graphics={{ spacing: <SpacingHistogram /> }} />
);

export const Stage09 = () => (
  <StagePage
    n={9}
    prev={8}
    content={{ story: { ko: s9ko, en: s9en }, junior: { ko: j9 }, lv4: { ko: s9lv4ko, en: s9lv4en } }}
    graphics={{ 'ai-results': <AiResults /> }}
  />
);
