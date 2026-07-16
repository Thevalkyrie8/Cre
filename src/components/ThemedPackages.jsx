import Packages from './Packages';
import PackagesShowcase from './PackagesShowcase';
import useLightMode from '../hooks/useLightMode';

const ThemedPackages = () => {
  const isLight = useLightMode();
  return isLight ? <PackagesShowcase /> : <Packages />;
};

export default ThemedPackages;
