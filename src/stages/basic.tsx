/** Stage 1~4 (M2: 기초 그래픽) */
import StagePage from './StagePage';
import Sieve from '../components/viz/Sieve';
import NextPrime from '../components/viz/NextPrime';
import ZoomGraph from '../components/viz/ZoomGraph';
import ComplexPlane from '../components/viz/ComplexPlane';
import PartialSums from '../components/viz/PartialSums';
import s1ko from '../../content/ko/stage-01.md';
import s1en from '../../content/en/stage-01.md';
import s2ko from '../../content/ko/stage-02.md';
import s2en from '../../content/en/stage-02.md';
import s3ko from '../../content/ko/stage-03.md';
import s3en from '../../content/en/stage-03.md';
import s4ko from '../../content/ko/stage-04.md';
import s4en from '../../content/en/stage-04.md';

export const Stage01 = () => (
  <StagePage n={1} next={2} content={{ story: { ko: s1ko, en: s1en } }} graphics={{ sieve: <Sieve />, 'next-prime': <NextPrime /> }} />
);
export const Stage02 = () => (
  <StagePage n={2} prev={1} next={3} content={{ story: { ko: s2ko, en: s2en } }} graphics={{ 'zoom-graph': <ZoomGraph /> }} />
);
export const Stage03 = () => (
  <StagePage n={3} prev={2} next={4} content={{ story: { ko: s3ko, en: s3en } }} graphics={{ 'complex-plane': <ComplexPlane /> }} />
);
export const Stage04 = () => (
  <StagePage n={4} prev={3} next={6} content={{ story: { ko: s4ko, en: s4en } }} graphics={{ 'partial-sums': <PartialSums /> }} />
);
