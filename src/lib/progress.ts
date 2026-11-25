/** 진행 저장 (v1: 이 기기 브라우저의 localStorage만). 저장 불가 환경에서는 조용히 무시. */
const KEY = 'riemann-progress-v1';

export interface Progress {
  /** 스테이지 번호 → 본 깊이 레이어 목록 */
  seen: Record<string, string[]>;
  last?: number;
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Progress;
  } catch {
    /* ignore */
  }
  return { seen: {} };
}

export function markSeen(stage: number, layer: string) {
  const p = loadProgress();
  const list = new Set(p.seen[stage] ?? []);
  list.add(layer);
  p.seen[stage] = [...list];
  p.last = stage;
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export function resetProgress() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
