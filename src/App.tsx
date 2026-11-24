import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';

export default function App() {
  const { t, i18n } = useTranslation();
  return (
    <HashRouter>
      <header className="topbar">
        <Link to="/" className="brand">
          {t('app.title')}
        </Link>
        <button className="ghost" onClick={() => i18n.changeLanguage(i18n.language === 'ko' ? 'en' : 'ko')}>
          {t('nav.lang')}
        </button>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </HashRouter>
  );
}
