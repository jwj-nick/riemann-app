import { useEffect, useState } from 'react';

/** public/data/*.json 로더 (Pages base 경로 반영, 1회 캐시). */
let zerosPromise: Promise<Float64Array> | null = null;

export function loadZeros(): Promise<Float64Array> {
  zerosPromise ??= fetch(`${import.meta.env.BASE_URL}data/zeros.json`)
    .then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    })
    .then((d: { gamma: number[] }) => Float64Array.from(d.gamma))
    .catch((e) => {
      zerosPromise = null;
      throw e;
    });
  return zerosPromise;
}



export function useZeros(): { zeros: Float64Array | null; error: boolean } {
  const [zeros, setZeros] = useState<Float64Array | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let alive = true;
    loadZeros().then(
      (z) => alive && setZeros(z),
      () => alive && setError(true),
    );
    return () => {
      alive = false;
    };
  }, []);
  return { zeros, error };
}

export interface PiData {
  pi: Record<string, number>;
  grids: Record<string, number[]>;
  gridN: number;
  primes: number[];
}
let piPromise: Promise<PiData> | null = null;

export function usePiData(): { data: PiData | null; error: boolean } {
  const [data, setData] = useState<PiData | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let alive = true;
    piPromise ??= fetch(`${import.meta.env.BASE_URL}data/pi_x.json`).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    });
    piPromise.then(
      (d) => alive && setData(d),
      () => {
        piPromise = null;
        if (alive) setError(true);
      },
    );
    return () => {
      alive = false;
    };
  }, []);
  return { data, error };
}
