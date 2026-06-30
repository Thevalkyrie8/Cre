import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Packages from './components/Packages';
import News from './components/News';
import NewsDetail from './components/NewsDetail';
import ServiceDetail from './components/ServiceDetail';
import WebDevelopmentService from './components/WebDevelopmentService';
import EcommerceService from './components/EcommerceService';
import DigitalMarketingService from './components/DigitalMarketingService';
import AutomationService from './components/AutomationService';
import PhotographyVideoService from './components/PhotographyVideoService';
import UIUXDesignService from './components/UIUXDesignService';
import PrivacyPolicy from './components/PrivacyPolicy';

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
          color: '#333',
          fontFamily: 'Arial, sans-serif',
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
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/web-development" element={<WebDevelopmentService />} />
            <Route path="/ecommerce" element={<EcommerceService />} />
            <Route path="/digital-marketing" element={<DigitalMarketingService />} />
            <Route path="/automation" element={<AutomationService />} />
            <Route path="/photography-video" element={<PhotographyVideoService />} />
            <Route path="/ui-ux-design" element={<UIUXDesignService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
