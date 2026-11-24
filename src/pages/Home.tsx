import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const READY = new Set([1, 2, 3, 4, 5, 6, 7, 8]);

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="page">
      <h1>{t('app.title')}</h1>
      <p className="subtitle">
        {t('app.subtitle')} <span className="badge">{t('app.draft')}</span>
      </p>
      <p>{t('home.intro')}</p>
      <ol className="stage-list">
        {Array.from({ length: 10 }, (_, i) => (
          <li key={i} className={READY.has(i) ? 'ready' : 'soon'}>
            <span className="num">{i}</span>
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
