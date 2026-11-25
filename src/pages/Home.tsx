import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadProgress, resetProgress } from '../lib/progress';

const READY = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

export default function Home() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(loadProgress);
  const done = (i: number) => (progress.seen[i]?.length ?? 0) > 0;
  const visited = Object.keys(progress.seen).length;
  return (
    <div className="page">
      <h1>{t('app.title')}</h1>
      <p className="subtitle">
        {t('app.subtitle')} <span className="badge">{t('app.draft')}</span>
      </p>
      <p>{t('home.intro')}</p>
      {progress.last !== undefined && (
        <p className="resume">
          <Link to={`/stage/${progress.last}`} className="btn primary">
            {t('home.resume', { n: progress.last })}
          </Link>{' '}
          <span className="muted">{t('home.visited', { n: visited })}</span>{' '}
          <button
            className="ghost"
            onClick={() => {
              resetProgress();
              setProgress({ seen: {} });
            }}
          >
            {t('home.reset')}
          </button>
        </p>
      )}
      <ol className="stage-list">
        {Array.from({ length: 10 }, (_, i) => (
          <li key={i} className={READY.has(i) ? 'ready' : 'soon'}>
            <span className="num">{done(i) ? '✓' : i}</span>
            <span className="name">{t(`stages.${i}`)}</span>
            {READY.has(i) ? (
              <Link to={`/stage/${i}`} className="btn">
                {t('home.start')}
              </Link>
            ) : (
              <span className="muted">{t('home.comingSoon')}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
