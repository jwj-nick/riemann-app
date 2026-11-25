import { useEffect, useState } from 'react';

/** 에디션: 일반(standard) / 중고생(junior). localStorage에 기억하고 탭 간 동기화. */
export type Edition = 'standard' | 'junior';
const KEY = 'edition';
const EVT = 'edition-change';

export function getEdition(): Edition {
  try {
    return localStorage.getItem(KEY) === 'junior' ? 'junior' : 'standard';
  } catch {
    return 'standard';
  }
}

export function setEdition(e: Edition) {
  try {
    localStorage.setItem(KEY, e);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVT));
}

export function useEdition(): Edition {
  const [e, setE] = useState<Edition>(getEdition);
  useEffect(() => {
    const on = () => setE(getEdition());
    window.addEventListener(EVT, on);
    return () => window.removeEventListener(EVT, on);
  }, []);
  return e;
}
