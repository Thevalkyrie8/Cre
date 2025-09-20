import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Packages from './components/Packages';
import News from './components/News';
import WebDevelopmentService from './components/WebDevelopmentService';
import EcommerceService from './components/EcommerceService';
import DigitalMarketingService from './components/DigitalMarketingService';
import AutomationService from './components/AutomationService';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/news" element={<News />} />
          <Route path="/services/web-development" element={<WebDevelopmentService />} />
          <Route path="/services/ecommerce-solutions" element={<EcommerceService />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketingService />} />
          <Route path="/services/automation-systems" element={<AutomationService />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;