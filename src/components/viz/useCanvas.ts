import { useEffect, useRef } from 'react';

export const readVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** 크기 변화·DPR을 처리하고 deps가 바뀔 때마다 draw를 rAF로 1회 호출한다. */
export function useCanvas(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, deps: unknown[]) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  const raf = useRef(0);

  const schedule = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const cv = ref.current;
      if (!cv) return;
      const dpr = window.devicePixelRatio || 1;
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
        cv.width = Math.round(w * dpr);
        cv.height = Math.round(h * dpr);
      }
      const ctx = cv.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawRef.current(ctx, w, h);
    });
  };

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ro = new ResizeObserver(schedule);
    ro.observe(cv);
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', schedule);
    return () => {
      ro.disconnect();
      mq.removeEventListener('change', schedule);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(schedule, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}
