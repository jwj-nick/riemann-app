import { useEffect } from 'react';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import Stage06 from './stages/Stage06';
import { Stage01, Stage02, Stage03, Stage04 } from './stages/basic';
import { Stage05, Stage07, Stage08 } from './stages/advanced';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { t, i18n } = useTranslation();
  return (
    <HashRouter>
      <ScrollToTop />
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
          <Route path="/stage/1" element={<Stage01 />} />
          <Route path="/stage/2" element={<Stage02 />} />
          <Route path="/stage/3" element={<Stage03 />} />
          <Route path="/stage/4" element={<Stage04 />} />
          <Route path="/stage/5" element={<Stage05 />} />
          <Route path="/stage/6" element={<Stage06 />} />
          <Route path="/stage/7" element={<Stage07 />} />
          <Route path="/stage/8" element={<Stage08 />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </HashRouter>
  );
}
