import Services from './Services';
import ServicesShowcase from './ServicesShowcase';
import useLightMode from '../hooks/useLightMode';

const ThemedServices = () => {
  const isLight = useLightMode();
  return isLight ? <ServicesShowcase /> : <Services />;
};

export default ThemedServices;
