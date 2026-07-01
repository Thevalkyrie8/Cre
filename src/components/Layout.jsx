import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    try {
      // Load saved language and theme
      const savedLanguage = localStorage.getItem('language') || 'en';
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setLanguage(savedLanguage);
      setTheme(savedTheme);
      
      // Apply theme
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      
      // Apply saved language immediately
      applyLanguage(savedLanguage);
    } catch (error) {
      console.error('Error loading saved preferences:', error);
      // Set defaults if localStorage fails
      setLanguage('en');
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply language when language state changes
  useEffect(() => {
    applyLanguage(language);
  }, [language]);

  const toggleLanguage = () => {
    try {
      const newLanguage = language === 'vi' ? 'en' : 'vi';
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      // Language will be applied automatically via useEffect
    } catch (error) {
      console.error('Error toggling language:', error);
    }
  };

  const applyLanguage = (lang) => {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      // Translate page content
      const elements = document.querySelectorAll('[data-vi], [data-en]');
      elements.forEach(element => {
        const viText = element.getAttribute('data-vi');
        const enText = element.getAttribute('data-en');
        const defaultLang = element.getAttribute('data-default') || 'en';
        
        if (lang === 'vi' && viText) {
          element.textContent = viText;
        } else if (lang === 'en' && enText) {
          element.textContent = enText;
        } else if (defaultLang === 'vi' && viText) {
          element.textContent = viText;
        } else if (defaultLang === 'en' && enText) {
          element.textContent = enText;
        } else if (enText) {
          // Fallback to English if no default is set
          element.textContent = enText;
        }
      });
    }, 50);
  };

  const toggleTheme = () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Background */}
      <div className="bg-container">
        <div className="earth-bg"></div>
        <div className="earth-overlay"></div>
        <div className="earth-color"></div>
      </div>

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="logo-unitrux"></div>
          </Link>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Trang chủ" data-en="Home" data-default="en">Home</span>
            </Link>
            <Link to="/services" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Dịch vụ" data-en="Services" data-default="en">Services</span>
            </Link>
            <Link to="/packages" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Gói dịch vụ" data-en="Packages" data-default="en">Packages</span>
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Về chúng tôi" data-en="About" data-default="en">About</span>
            </Link>
            <Link to="/news" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Tin tức" data-en="News" data-default="en">News</span>
            </Link>
            <Link to="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Liên hệ" data-en="Contact" data-default="en">Contact</span>
            </Link>
            <Link to="/privacy-policy" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Chính sách bảo mật" data-en="Privacy Policy" data-default="en">Privacy Policy</span>
            </Link>
            <Link to="/terms" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Điều khoản dịch vụ" data-en="Terms of Service" data-default="en">Terms of Service</span>
            </Link>
            <Link to="/delete-data" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Xóa dữ liệu" data-en="Delete Data" data-default="en">Delete Data</span>
            </Link>
          </div>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="language-toggle" onClick={toggleLanguage}>
              {language === 'vi' ? 'EN' : 'VI'}
            </button>
            <button 
              className="nav-toggle" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 data-vi="Unitrux" data-en="Unitrux" data-default="en">Unitrux</h3>
              <p data-vi="Chúng tôi cung cấp các giải pháp marketing toàn diện để giúp doanh nghiệp phát triển bền vững." data-en="We provide comprehensive marketing solutions to help businesses grow sustainably." data-default="en">
                We provide comprehensive marketing solutions to help businesses grow sustainably.
              </p>
            </div>
            <div className="footer-section">
              <h4 data-vi="Dịch vụ" data-en="Services" data-default="en">Services</h4>
              <ul>
                <li><Link to="/services">Digital Marketing</Link></li>
                <li><Link to="/services">Branding</Link></li>
                <li><Link to="/services">Web Development</Link></li>
                <li><Link to="/services">SEO</Link></li>
                <li><Link to="/services">E-commerce</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 data-vi="Thông tin pháp lý" data-en="Legal" data-default="en">Legal</h4>
              <ul>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/delete-data">Delete Data</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 data-vi="Kết nối với chúng tôi" data-en="Connect With Us" data-default="en">Connect With Us</h4>
              <div className="social-links">
                <a 
                  href="https://www.facebook.com/UnitruxCreativeStudio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link facebook"
                  title="Facebook - Unitrux Creative Studio"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Unitrux Creative Studio</span>
                </a>
                <a 
                  href="https://www.facebook.com/UnitruxEcommercePro" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link facebook"
                  title="Facebook - Unitrux Ecommerce Pro"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Unitrux Ecommerce Pro</span>
                </a>
                <a 
                  href="https://www.facebook.com/UnitruxDigitalMarketing" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link facebook"
                  title="Facebook - Unitrux Digital Marketing"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Unitrux Digital Marketing</span>
                </a>
                <a 
                  href="https://www.linkedin.com/company/unitrux?trk=blended-typeahead" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link linkedin"
                  title="LinkedIn - Unitrux Company"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn Company</span>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Unitrux. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="floating-buttons">
        <button className="scroll-to-top" onClick={scrollToTop} title="Scroll to top">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <a href="https://www.youtube.com/@UnitruxDigitalMarketing" target="_blank" rel="noopener noreferrer" className="youtube-fab" title="YouTube Channel">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
        <a href="https://www.tiktok.com/@unitruxmarketing" target="_blank" rel="noopener noreferrer" className="tiktok-fab" title="TikTok Channel">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Layout;
