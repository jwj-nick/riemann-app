import { useState } from 'react';
import StagePage from './StagePage';
import ExplicitFormula from '../components/viz/ExplicitFormula';
import PrimeSound from '../components/viz/PrimeSound';
import storyKo from '../../content/ko/stage-06.md';
import storyEn from '../../content/en/stage-06.md';
import lv3Ko from '../../content/ko/stage-06-lv3-derivation.md';
import lv3En from '../../content/en/stage-06-lv3.md';

export default function Stage06() {
  const [beta, setBeta] = useState(0.5); // 영점 1의 실수부, 슬라이더·소리 공유
  return (
    <StagePage
      n={6}
      prev={5}
      next={7}
      content={{ story: { ko: storyKo, en: storyEn }, lv3: { ko: lv3Ko, en: lv3En } }}
      graphics={{
        'explicit-formula': <ExplicitFormula beta={beta} />,
        'prime-sound': <PrimeSound beta={beta} onBeta={setBeta} />,
      }}
    />
  );
}
