import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import { legacyRedirects } from './seo/seoConfig';

// After a new deploy, a visitor/crawler holding a stale index.html can request
// a route chunk whose hashed filename no longer exists (404), throwing inside
// import(). Retry once via a hard reload (picks up the fresh index.html and
// chunk map) before surfacing the error to the ErrorBoundary.
const lazyWithChunkRetry = (importer) => lazy(async () => {
  const retryFlag = 'unitrux:chunk-retry';
  try {
    const mod = await importer();
    sessionStorage.removeItem(retryFlag);
    return mod;
  } catch (error) {
    if (!sessionStorage.getItem(retryFlag)) {
      sessionStorage.setItem(retryFlag, '1');
      window.location.reload();
      return new Promise(() => {}); // reload is in flight; never resolve
    }
    sessionStorage.removeItem(retryFlag);
    throw error;
  }
});

const ThemedAbout = lazyWithChunkRetry(() => import('./components/ThemedAbout'));
const ThemedServices = lazyWithChunkRetry(() => import('./components/ThemedServices'));
const ThemedPackages = lazyWithChunkRetry(() => import('./components/ThemedPackages'));
const ThemedNews = lazyWithChunkRetry(() => import('./components/ThemedNews'));
const ThemedNewsDetail = lazyWithChunkRetry(() => import('./components/ThemedNewsDetail'));
const ServiceDetail = lazyWithChunkRetry(() => import('./components/ServiceDetail'));
const ThemedServiceDetail = lazyWithChunkRetry(() => import('./components/ThemedServiceDetail'));
const ServiceLanding = lazyWithChunkRetry(() => import('./components/ServiceLanding'));
const TemplatesPage = lazyWithChunkRetry(() => import('./components/TemplatesPage'));
const DigitalMarketingLanding = lazyWithChunkRetry(() => import('./components/DigitalMarketingLanding'));
const AutomationService = lazyWithChunkRetry(() => import('./components/AutomationService'));
const PhotographyVideoService = lazyWithChunkRetry(() => import('./components/PhotographyVideoService'));
const PrivacyPolicy = lazyWithChunkRetry(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazyWithChunkRetry(() => import('./components/TermsOfService'));
const DeleteData = lazyWithChunkRetry(() => import('./components/DeleteData'));
const ThemedContact = lazyWithChunkRetry(() => import('./components/ThemedContact'));
const NotFound = lazyWithChunkRetry(() => import('./components/NotFound'));
const ContentStandards = lazyWithChunkRetry(() => import('./components/ContentStandards'));
const MediaPricingShowcase = lazyWithChunkRetry(() => import('./components/MediaPricingShowcase'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: 'var(--u-ink, #0F172A)',
          backgroundColor: 'var(--u-bg, #F8FAFC)',
          fontFamily: 'Segoe UI Variable, Segoe UI, Arial, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or try again later.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--u-accent, #0284C7)',
              color: 'var(--u-accent-ink, #FFFFFF)',
              border: 'none',
              borderRadius: '999px',
              fontSize: '19px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Suspense fallback={<div role="status" aria-live="polite" style={{ minHeight: '70vh', paddingTop: '160px', textAlign: 'center' }}>Loading…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<ThemedAbout />} />
              <Route path="/services" element={<ThemedServices />} />
              <Route path="/packages" element={<ThemedPackages />} />
              <Route path="/news" element={<ThemedNews />} />
              <Route path="/news/:id" element={<ThemedNewsDetail />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/web-development" element={<ServiceLanding serviceKey="web-development" />} />
              <Route path="/ecommerce" element={<ThemedServiceDetail type="ecommerce" />} />
              <Route path="/digital-marketing" element={<DigitalMarketingLanding />} />
              <Route path="/chatbox-ai" element={<ThemedServiceDetail type="chatbox" />} />
              <Route path="/automation" element={<AutomationService />} />
              <Route path="/photography-video" element={<PhotographyVideoService />} />
              <Route path="/digital-solutions" element={<ServiceLanding serviceKey="digital-solutions" />} />
              <Route path="/fanpage-management" element={<ServiceLanding serviceKey="fanpage-management" />} />
              <Route path="/content-creation" element={<ServiceLanding serviceKey="content-creation" />} />
              <Route path="/seo-services" element={<ServiceLanding serviceKey="seo-services" />} />
              <Route path="/product-photography" element={<ServiceLanding serviceKey="product-photography" />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/media-pricing" element={<MediaPricingShowcase />} />
              {Object.entries(legacyRedirects).map(([from, to]) => (
                <Route key={from} path={from} element={<Navigate to={to} replace />} />
              ))}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/delete-data" element={<DeleteData />} />
              <Route path="/contact" element={<ThemedContact />} />
              <Route path="/content-standards" element={<ContentStandards />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
