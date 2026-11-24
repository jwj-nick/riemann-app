/**
 * content/*.md 를 빌드 시점에 HTML 조각으로 변환하는 Vite 플러그인.
 * - 수식($, $$)은 KaTeX로 미리 렌더링 → 브라우저는 CSS만 필요
 * - <details> 같은 원시 HTML 허용
 * - "[그래픽:id] 설명" 줄은 React 컴포넌트 자리(segment)로 분리
 * - "**팩트체크**", "**Junior 한 줄**" 단락과 "## 구현 메모" 이후는 앱에 내보내지 않음
 * MDX 대신 이 방식을 쓰는 이유: 수식 원고의 p^{−ks} 같은 중괄호가 MDX 표현식으로 해석되어 깨진다.
 */
import type { Plugin } from 'vite';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

export type Segment = { html: string } | { graphic: string };

const HIDDEN = /^\*\*(팩트체크|Fact ?check|Junior[^*]*)\*\*/i;
const GRAPHIC = /^\[(?:그래픽|graphic):([\w-]+)\][^\n]*$/;

const PREDICT = /^\*\*(예측 질문|Predict)\*\*:\s*(.+?)\s*→\s*(?:기대 답:\s*)?(.+)$/s;
const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/**
 * - 첫 "## " 이전의 인용문(원고 메타 설명)과 "(원고 vX)" 표기 제거
 * - "**예측 질문**: 질문 → 기대 답" 은 답을 접어 둔다 (사용자가 먼저 생각하게)
 */
export function preprocess(src: string, lang = 'ko'): string {
  const cut = src.search(/^## (구현 메모|Lv4로 넘길 것|Implementation notes)/m);
  const body = cut >= 0 ? src.slice(0, cut) : src;
  let beforeFirstH2 = true;
  return body
    .split(/\n{2,}/)
    .filter((para) => {
      const p = para.trim();
      if (p.startsWith('## ')) beforeFirstH2 = false;
      if (beforeFirstH2 && p.startsWith('>')) return false;
      return !HIDDEN.test(p);
    })
    .map((para) => {
      const p = para.trim().replace(/^(# .*?)\s*\(원고 v[\d.]+\)\s*$/, '$1');
      const m = p.match(PREDICT);
      if (!m) return p;
      const label = lang === 'ko' ? '먼저 생각해 보기' : 'Think first';
      const reveal = lang === 'ko' ? '답 보기' : 'Show answer';
      return `<div class="predict"><p><b>${label}</b> ${escapeHtml(m[2])}</p><details><summary>${reveal}</summary>\n\n${m[3]}\n\n</details></div>`;
    })
    .join('\n\n');
}

async function toHtml(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex, { strict: false })
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

export async function mdToSegments(src: string, lang = 'ko'): Promise<Segment[]> {
  const segments: Segment[] = [];
  let buf: string[] = [];
  const flush = async () => {
    if (buf.length) segments.push({ html: await toHtml(buf.join('\n\n')) });
    buf = [];
  };
  for (const para of preprocess(src, lang).split(/\n{2,}/)) {
    const m = para.trim().match(GRAPHIC);
    if (m) {
      await flush();
      segments.push({ graphic: m[1] });
    } else buf.push(para);
  }
  await flush();
  return segments;
}

export function contentMd(): Plugin {
  return {
    name: 'content-md',
    async transform(code, id) {
      if (!id.endsWith('.md')) return null;
      const lang = /[\\/]content[\\/]en[\\/]/.test(id) ? 'en' : 'ko';
      const segments = await mdToSegments(code, lang);
      return { code: `export default ${JSON.stringify(segments)};`, map: null };
    },
  };
}
