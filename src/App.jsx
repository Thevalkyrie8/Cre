import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';

const ThemedAbout = lazy(() => import('./components/ThemedAbout'));
const ThemedServices = lazy(() => import('./components/ThemedServices'));
const ThemedPackages = lazy(() => import('./components/ThemedPackages'));
const ThemedNews = lazy(() => import('./components/ThemedNews'));
const ThemedNewsDetail = lazy(() => import('./components/ThemedNewsDetail'));
const ServiceDetail = lazy(() => import('./components/ServiceDetail'));
const ThemedServiceDetail = lazy(() => import('./components/ThemedServiceDetail'));
const AutomationService = lazy(() => import('./components/AutomationService'));
const PhotographyVideoService = lazy(() => import('./components/PhotographyVideoService'));
const UIUXDesignService = lazy(() => import('./components/UIUXDesignService'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const DeleteData = lazy(() => import('./components/DeleteData'));
const ThemedContact = lazy(() => import('./components/ThemedContact'));
const NotFound = lazy(() => import('./components/NotFound'));
const ContentStandards = lazy(() => import('./components/ContentStandards'));

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
          color: '#0F172A',
          backgroundColor: '#F8FAFC',
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
              backgroundColor: '#0284C7',
              color: '#FFFFFF',
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
              <Route path="/web-development" element={<ThemedServiceDetail type="web" />} />
              <Route path="/ecommerce" element={<ThemedServiceDetail type="ecommerce" />} />
              <Route path="/digital-marketing" element={<ThemedServiceDetail type="marketing" />} />
              <Route path="/chatbox-ai" element={<ThemedServiceDetail type="chatbox" />} />
              <Route path="/automation" element={<AutomationService />} />
              <Route path="/photography-video" element={<PhotographyVideoService />} />
              <Route path="/ui-ux-design" element={<UIUXDesignService />} />
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
