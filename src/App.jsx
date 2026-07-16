import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ThemedAbout from './components/ThemedAbout';
import ThemedServices from './components/ThemedServices';
import ThemedPackages from './components/ThemedPackages';
import ThemedNews from './components/ThemedNews';
import ThemedNewsDetail from './components/ThemedNewsDetail';
import ServiceDetail from './components/ServiceDetail';
import ThemedServiceDetail from './components/ThemedServiceDetail';
import AutomationService from './components/AutomationService';
import PhotographyVideoService from './components/PhotographyVideoService';
import UIUXDesignService from './components/UIUXDesignService';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import DeleteData from './components/DeleteData';
import ThemedContact from './components/ThemedContact';

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
            <Route path="/about" element={<ThemedAbout />} />
            <Route path="/services" element={<ThemedServices />} />
            <Route path="/packages" element={<ThemedPackages />} />
            <Route path="/news" element={<ThemedNews />} />
            <Route path="/news/:id" element={<ThemedNewsDetail />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/web-development" element={<ThemedServiceDetail type="web" />} />
            <Route path="/ecommerce" element={<ThemedServiceDetail type="ecommerce" />} />
            <Route path="/digital-marketing" element={<ThemedServiceDetail type="marketing" />} />
            <Route path="/automation" element={<AutomationService />} />
            <Route path="/photography-video" element={<PhotographyVideoService />} />
            <Route path="/ui-ux-design" element={<UIUXDesignService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/delete-data" element={<DeleteData />} />
            <Route path="/contact" element={<ThemedContact />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
