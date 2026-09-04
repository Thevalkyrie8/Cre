import { onCLS, onINP, onLCP } from 'web-vitals';

let vitalsStarted = false;

const eventParameterKeys = [
  'page_location',
  'page_path',
  'page_title',
  'method',
  'placement',
  'service',
  'form_name',
  'content_type',
  'content_id',
  'content_name',
  'metric_name',
  'metric_value',
  'metric_rating',
  'metric_id',
  'navigation_type',
  'non_interaction',
  'cta_name',
  'link_domain',
  'link_url',
  'link_text',
];

const pushToDataLayer = (payload) => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  const clearedParameters = Object.fromEntries(eventParameterKeys.map((key) => [key, undefined]));
  window.dataLayer.push({
    ...clearedParameters,
    ...payload,
  });
};

export const trackPageView = (path) => {
  if (!path || path === window.__unitruxLastPagePath) return;
  window.__unitruxLastPagePath = path;
  pushToDataLayer({
    event: 'page_view',
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  });
};

export const trackEvent = (name, parameters = {}) => {
  if (!name) return;
  const { event: _ignoredEvent, ...safeParameters } = parameters;
  pushToDataLayer({
    event: name,
    ...safeParameters,
  });
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
