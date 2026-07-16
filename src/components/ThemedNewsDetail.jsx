import NewsDetail from './NewsDetail';
import NewsDetailShowcase from './NewsDetailShowcase';
import useLightMode from '../hooks/useLightMode';

const ThemedNewsDetail = () => {
  const isLight = useLightMode();
  return isLight ? <NewsDetailShowcase /> : <NewsDetail />;
};

export default ThemedNewsDetail;
