import WebDevelopmentService from './WebDevelopmentService';
import EcommerceService from './EcommerceService';
import DigitalMarketingService from './DigitalMarketingService';
import ServiceEditorialDetail from './ServiceEditorialDetail';
import useLightMode from '../hooks/useLightMode';

const darkComponents = {
  web: WebDevelopmentService,
  ecommerce: EcommerceService,
  marketing: DigitalMarketingService,
};

const ThemedServiceDetail = ({ type }) => {
  const isLight = useLightMode();
  if (isLight) return <ServiceEditorialDetail type={type} />;

  const DarkComponent = darkComponents[type];
  return <DarkComponent />;
};

export default ThemedServiceDetail;
