import { onCLS, onINP, onLCP } from 'web-vitals';

let lastPagePath = '';
let vitalsStarted = false;

const sendGtag = (...args) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag(...args);
};

export const trackPageView = (path) => {
  if (!path || path === lastPagePath) return;
  lastPagePath = path;
  sendGtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  });
};

export const trackEvent = (name, parameters = {}) => {
  if (!name) return;
  sendGtag('event', name, parameters);
};

export const startWebVitalsTracking = () => {
  if (vitalsStarted || typeof window === 'undefined') return;
  vitalsStarted = true;

  const report = ({ name, value, rating, id, navigationType }) => {
    trackEvent('web_vitals', {
      metric_name: name,
      metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_rating: rating,
      metric_id: id,
      navigation_type: navigationType,
      non_interaction: true,
    });
  };

  onCLS(report);
  onINP(report);
  onLCP(report);
};
