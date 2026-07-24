import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { startWebVitalsTracking, trackEvent, trackPageView } from '../analytics/tracking';

const getLinkText = (link) => (link.getAttribute('aria-label') || link.textContent || '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 100);

const trackBusinessLink = (event) => {
  const link = event.target.closest?.('a[href]');
  if (!link) return;

  const rawHref = link.getAttribute('href') || '';
  const lowerHref = rawHref.toLowerCase();
  const placement = link.dataset.trackingPlacement || window.location.pathname;

  if (lowerHref.startsWith('tel:')) {
    trackEvent('contact_click', { method: 'phone', placement });
    return;
  }

  if (lowerHref.startsWith('mailto:')) {
    trackEvent('contact_click', { method: 'email', placement });
    return;
  }

  if (lowerHref.includes('zalo.me/')) {
    trackEvent('contact_click', { method: 'zalo', placement });
    return;
  }

  try {
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) {
      trackEvent('outbound_click', {
        link_domain: destination.hostname,
        link_url: `${destination.origin}${destination.pathname}`,
        link_text: getLinkText(link),
        placement,
      });
    }
  } catch {
    // Ignore malformed or browser-handled links.
  }
};

const AnalyticsTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView(`${pathname}${search}`);
  }, [pathname, search]);

  useEffect(() => {
    startWebVitalsTracking();
  }, []);

  useEffect(() => {
    document.addEventListener('click', trackBusinessLink);
    return () => document.removeEventListener('click', trackBusinessLink);
  }, []);

  return null;
};

export default AnalyticsTracker;
