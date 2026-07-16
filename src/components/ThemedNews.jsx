import News from './News';
import NewsShowcase from './NewsShowcase';
import useLightMode from '../hooks/useLightMode';

const ThemedNews = () => {
  const isLight = useLightMode();
  return isLight ? <NewsShowcase /> : <News />;
};

export default ThemedNews;
