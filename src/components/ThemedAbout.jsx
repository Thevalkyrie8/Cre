import About from './About';
import AboutShowcase from './AboutShowcase';
import useLightMode from '../hooks/useLightMode';

const ThemedAbout = () => {
  const isLight = useLightMode();
  return isLight ? <AboutShowcase /> : <About />;
};

export default ThemedAbout;
