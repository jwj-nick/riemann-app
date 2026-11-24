import type { ReactNode } from 'react';

export type Segment = { html: string } | { graphic: string };

/** 빌드 시 변환된 원고(HTML 조각 + 그래픽 자리)를 렌더링한다. */
export default function Prose({ segments, graphics }: { segments: Segment[]; graphics: Record<string, ReactNode> }) {
  return (
    <div className="prose">
      {segments.map((s, i) =>
        'html' in s ? (
          <div key={i} dangerouslySetInnerHTML={{ __html: s.html }} />
        ) : (
          <div key={i} className="graphic-slot">
            {graphics[s.graphic] ?? null}
          </div>
        ),
      )}
    </div>
  );
}
