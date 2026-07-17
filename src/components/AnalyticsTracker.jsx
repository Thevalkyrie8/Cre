import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { startWebVitalsTracking, trackPageView } from '../analytics/tracking';

const AnalyticsTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView(`${pathname}${search}`);
  }, [pathname, search]);

  useEffect(() => {
    startWebVitalsTracking();
  }, []);

  return null;
};

export default AnalyticsTracker;
