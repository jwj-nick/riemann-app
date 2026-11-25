/** Stage 0~4 (M2: 기초 그래픽, M4: 프롤로그) */
import StagePage from './StagePage';
import j0 from '../../content/ko/junior/stage-00.md';
import j1 from '../../content/ko/junior/stage-01.md';
import j2 from '../../content/ko/junior/stage-02.md';
import j3 from '../../content/ko/junior/stage-03.md';
import j4 from '../../content/ko/junior/stage-04.md';
import Teaser from '../components/viz/Teaser';
import Sieve from '../components/viz/Sieve';
import NextPrime from '../components/viz/NextPrime';
import ZoomGraph from '../components/viz/ZoomGraph';
import ComplexPlane from '../components/viz/ComplexPlane';
import PartialSums from '../components/viz/PartialSums';
import EulerSieve from '../components/viz/EulerSieve';
import s0ko from '../../content/ko/stage-00.md';
import s0en from '../../content/en/stage-00.md';
import d0 from '../../content/ko/stage-00-lv4.md';
import f0 from '../../content/en/stage-00-lv4.md';
import d1 from '../../content/ko/stage-01-lv4.md';
import f1 from '../../content/en/stage-01-lv4.md';
import d2 from '../../content/ko/stage-02-lv4.md';
import f2 from '../../content/en/stage-02-lv4.md';
import d3 from '../../content/ko/stage-03-lv4.md';
import f3 from '../../content/en/stage-03-lv4.md';
import d4 from '../../content/ko/stage-04-lv4.md';
import f4 from '../../content/en/stage-04-lv4.md';
import l1 from '../../content/ko/stage-01-lv3.md';
import e1 from '../../content/en/stage-01-lv3.md';
import l2 from '../../content/ko/stage-02-lv3.md';
import e2 from '../../content/en/stage-02-lv3.md';
import l3 from '../../content/ko/stage-03-lv3.md';
import e3 from '../../content/en/stage-03-lv3.md';
import l4 from '../../content/ko/stage-04-lv3.md';
import e4 from '../../content/en/stage-04-lv3.md';
import s1ko from '../../content/ko/stage-01.md';
import s1en from '../../content/en/stage-01.md';
import s2ko from '../../content/ko/stage-02.md';
import s2en from '../../content/en/stage-02.md';
import s3ko from '../../content/ko/stage-03.md';
import s3en from '../../content/en/stage-03.md';
import s4ko from '../../content/ko/stage-04.md';
import s4en from '../../content/en/stage-04.md';

export const Stage00 = () => (
  <StagePage n={0} next={1} content={{ story: { ko: s0ko, en: s0en }, junior: { ko: j0 }, lv4: { ko: d0, en: f0 }, lv4Draft: true }} graphics={{ teaser: <Teaser /> }} />
);
export const Stage01 = () => (
  <StagePage n={1} prev={0} next={2} content={{ story: { ko: s1ko, en: s1en }, junior: { ko: j1 }, lv3: { ko: l1, en: e1 }, lv3Draft: true, lv4: { ko: d1, en: f1 }, lv4Draft: true }} graphics={{ sieve: <Sieve />, 'next-prime': <NextPrime /> }} />
);
export const Stage02 = () => (
  <StagePage n={2} prev={1} next={3} content={{ story: { ko: s2ko, en: s2en }, junior: { ko: j2 }, lv3: { ko: l2, en: e2 }, lv3Draft: true, lv4: { ko: d2, en: f2 }, lv4Draft: true }} graphics={{ 'zoom-graph': <ZoomGraph /> }} />
);
export const Stage03 = () => (
  <StagePage n={3} prev={2} next={4} content={{ story: { ko: s3ko, en: s3en }, junior: { ko: j3 }, lv3: { ko: l3, en: e3 }, lv3Draft: true, lv4: { ko: d3, en: f3 }, lv4Draft: true }} graphics={{ 'complex-plane': <ComplexPlane /> }} />
);
export const Stage04 = () => (
  <StagePage n={4} prev={3} next={5} content={{ story: { ko: s4ko, en: s4en }, junior: { ko: j4 }, lv3: { ko: l4, en: e4 }, lv3Draft: true, lv4: { ko: d4, en: f4 }, lv4Draft: true }} graphics={{ 'partial-sums': <PartialSums />, 'euler-sieve': <EulerSieve /> }} />
);
