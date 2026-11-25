import { useTranslation } from 'react-i18next';
import Prose from '../components/Prose';
import ko from '../../content/ko/glossary.md';
import en from '../../content/en/glossary.md';

/** 용어 사전: 스테이지에 나오는 수학 용어를 쉬운 말로. */
export default function Glossary() {
  const { i18n } = useTranslation();
  return (
    <div className="page glossary">
      <Prose segments={i18n.language === 'en' ? en : ko} graphics={{}} />
    </div>
  );
}
