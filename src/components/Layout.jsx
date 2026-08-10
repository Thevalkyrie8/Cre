import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useMasterInteractions from '../hooks/useMasterInteractions';
import SEO from './SEO';
import AnalyticsTracker from './AnalyticsTracker';

const ChatBox = lazy(() => import('./ChatBox'));

const PRIMARY_SERVICE_PATHS = [
  '/digital-solutions',
  '/fanpage-management',
  '/chatbox-ai',
  '/content-creation',
  '/digital-marketing',
  '/automation',
  '/seo-services',
  '/photography-video',
  '/product-photography',
  '/web-development',
  '/ecommerce',
];

const Layout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/+$/, '') || '/';
  const isActivePath = (path) => (
    path === '/'
      ? currentPath === '/'
      : currentPath === path
        || currentPath.startsWith(`${path}/`)
        || (path === '/services' && PRIMARY_SERVICE_PATHS.some((servicePath) => currentPath === servicePath))
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const navigationRef = useRef(null);
  useMasterInteractions(`${location.pathname}:${theme}`);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const closeMenuOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    const closeMenuOutside = (event) => {
      if (navigationRef.current && !navigationRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    const closeMenuOnDesktop = () => {
      if (window.innerWidth > 1240) setIsMenuOpen(false);
    };

    document.addEventListener('keydown', closeMenuOnEscape);
    document.addEventListener('pointerdown', closeMenuOutside);
    window.addEventListener('resize', closeMenuOnDesktop);

    return () => {
      document.removeEventListener('keydown', closeMenuOnEscape);
      document.removeEventListener('pointerdown', closeMenuOutside);
      window.removeEventListener('resize', closeMenuOnDesktop);
    };
  }, []);

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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  // Apply language when language state changes
  useEffect(() => {
    applyLanguage(language);

    const contentRoot = document.querySelector('.engine-main');
    if (!contentRoot) return undefined;

    const observer = new MutationObserver(() => {
      applyLanguage(language);
    });

    observer.observe(contentRoot, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [language, location.pathname]);

  const toggleLanguage = () => {
    try {
      const newLanguage = language === 'vi' ? 'en' : 'vi';
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      window.dispatchEvent(new CustomEvent('languageChange', {
        detail: { language: newLanguage }
      }));
    } catch (error) {
      console.error('Error toggling language:', error);
    }
  };

  const applyLanguage = (lang) => {
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }

    const elements = document.querySelectorAll('[data-vi], [data-en]');
    elements.forEach(element => {
      const viText = element.getAttribute('data-vi');
      const enText = element.getAttribute('data-en');
      const defaultLang = element.getAttribute('data-default') || 'en';
      const nextText = lang === 'vi'
        ? viText || (defaultLang === 'en' ? enText : viText)
        : enText || (defaultLang === 'vi' ? viText : enText);

      if (nextText && element.textContent !== nextText) {
        element.textContent = nextText;
      }
    });

    const localizedAttributes = [
      ['placeholder', 'data-placeholder-vi', 'data-placeholder-en'],
      ['aria-label', 'data-aria-label-vi', 'data-aria-label-en'],
    ];

    localizedAttributes.forEach(([attribute, viAttribute, enAttribute]) => {
      document.querySelectorAll(`[${viAttribute}], [${enAttribute}]`).forEach(element => {
        const nextValue = element.getAttribute(lang === 'vi' ? viAttribute : enAttribute);
        if (nextValue && element.getAttribute(attribute) !== nextValue) {
          element.setAttribute(attribute, nextValue);
        }
      });
    });
  };

  const toggleTheme = () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      window.dispatchEvent(new CustomEvent('themeChange', {
        detail: { theme: newTheme }
      }));
      
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
    <div className={`app ${location.pathname === '/' ? 'app--home' : ''}`}>
      <SEO />
      <AnalyticsTracker />
      {/* Background */}
      <div className="bg-container">
        <div className="earth-bg"></div>
        <div className="earth-overlay"></div>
        <div className="earth-color"></div>
      </div>

      {/* Navigation */}
      <nav ref={navigationRef} className={`navbar ${location.pathname === '/' ? 'homepage-navbar' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" aria-label="Unitrux - Trang chủ">
            <div className="logo-unitrux"></div>
          </Link>
          
          <div id="primary-navigation" className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/services" className={`nav-link ${isActivePath('/services') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Giải pháp" data-en="Solutions" data-default="en">Solutions</span>
            </Link>
            <Link to="/packages" className={`nav-link ${isActivePath('/packages') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Gói dịch vụ" data-en="Service plans" data-default="en">Service plans</span>
            </Link>
            <Link to="/about" className={`nav-link ${isActivePath('/about') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Về Unitrux" data-en="About Unitrux" data-default="en">About Unitrux</span>
            </Link>
            <Link to="/news" className={`nav-link ${isActivePath('/news') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Góc tăng trưởng" data-en="Growth insights" data-default="en">Growth insights</span>
            </Link>
            <a
              href="tel:+84938695186"
              className="nav-link nav-link--mobile-hotline"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Gọi hotline Unitrux 0938 695 186"
            >
              <span className="nav-hotline-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7.2 3.8 9.7 7a1.4 1.4 0 0 1-.1 1.8L8.2 10a14.7 14.7 0 0 0 5.8 5.8l1.2-1.4a1.4 1.4 0 0 1 1.8-.1l3.2 2.5a1.4 1.4 0 0 1 .4 1.7l-.7 1.6a2.5 2.5 0 0 1-2.6 1.4A17.2 17.2 0 0 1 2.5 6.7 2.5 2.5 0 0 1 3.9 4l1.6-.7a1.4 1.4 0 0 1 1.7.5Z" />
                </svg>
              </span>
              <span>Hotline: 0938 695 186</span>
            </a>
            <Link to="/contact" className={`nav-link nav-link--mobile-cta ${isActivePath('/contact') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              <span data-vi="Bắt đầu dự án" data-en="Start a project" data-default="en">Start a project</span>
            </Link>
          </div>

          <div className="nav-actions">
            <a
              href="tel:+84938695186"
              className="nav-hotline"
              aria-label="Gọi hotline Unitrux 0938 695 186"
              title="Gọi 0938 695 186"
            >
              <span className="nav-hotline-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7.2 3.8 9.7 7a1.4 1.4 0 0 1-.1 1.8L8.2 10a14.7 14.7 0 0 0 5.8 5.8l1.2-1.4a1.4 1.4 0 0 1 1.8-.1l3.2 2.5a1.4 1.4 0 0 1 .4 1.7l-.7 1.6a2.5 2.5 0 0 1-2.6 1.4A17.2 17.2 0 0 1 2.5 6.7 2.5 2.5 0 0 1 3.9 4l1.6-.7a1.4 1.4 0 0 1 1.7.5Z" />
                </svg>
              </span>
              <span
                className="nav-hotline-nudge"
                aria-hidden="true"
              >
                <span
                  className="nav-hotline-nudge__label"
                  data-vi="Gọi ngay"
                  data-en="Call now"
                  data-default="en"
                >
                  Call now
                </span>
                <strong>0938 695 186</strong>
                <span className="nav-hotline-nudge__scan" aria-hidden="true" />
              </span>
            </a>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="theme-toggle-icon theme-toggle-icon--sun" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="3.75" />
                  <path d="M12 2.25v2M12 19.75v2M2.25 12h2M19.75 12h2M5.1 5.1l1.42 1.42M17.48 17.48l1.42 1.42M18.9 5.1l-1.42 1.42M6.52 17.48 5.1 18.9" />
                </svg>
              ) : (
                <svg className="theme-toggle-icon theme-toggle-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.2 15.35A8.65 8.65 0 0 1 8.65 3.8 8.7 8.7 0 1 0 20.2 15.35Z" />
                </svg>
              )}
            </button>
            <button
              className="language-toggle"
              onClick={toggleLanguage}
              aria-label={language === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
              title={language === 'vi' ? 'English' : 'Tiếng Việt'}
            >
              {language === 'vi' ? 'EN' : 'VI'}
            </button>
            <Link
              to="/contact"
              className={`nav-contact-cta ${isActivePath('/contact') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span data-vi="Bắt đầu dự án" data-en="Start a project" data-default="en">Start a project</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 10h11M11 6l4 4-4 4" />
              </svg>
            </Link>
            <button 
              className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              aria-label={isMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
              aria-expanded={isMenuOpen}
              aria-controls="primary-navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="engine-main">
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
                <li><Link to="/digital-solutions"><span data-vi="Ứng dụng & giải pháp số" data-en="App & digital solutions" data-default="en">App & digital solutions</span></Link></li>
                <li><Link to="/fanpage-management"><span data-vi="Xây dựng Fanpage" data-en="Fanpage setup" data-default="en">Fanpage setup</span></Link></li>
                <li><Link to="/chatbox-ai"><span data-vi="Chatbot AI" data-en="AI chatbot" data-default="en">AI chatbot</span></Link></li>
                <li><Link to="/content-creation"><span data-vi="Nội dung đa kênh" data-en="Multi-channel content" data-default="en">Multi-channel content</span></Link></li>
                <li><Link to="/digital-marketing"><span data-vi="Quảng cáo đa nền tảng" data-en="Multi-platform advertising" data-default="en">Multi-platform advertising</span></Link></li>
                <li><Link to="/automation"><span data-vi="Marketing Automation" data-en="Marketing automation" data-default="en">Marketing automation</span></Link></li>
                <li><Link to="/seo-services"><span data-vi="SEO/AEO/GEO" data-en="SEO/AEO/GEO" data-default="en">SEO/AEO/GEO</span></Link></li>
                <li><Link to="/photography-video"><span data-vi="Video quảng cáo" data-en="Advertising video" data-default="en">Advertising video</span></Link></li>
                <li><Link to="/product-photography"><span data-vi="Chụp ảnh sản phẩm" data-en="Product photography" data-default="en">Product photography</span></Link></li>
                <li><Link to="/web-development"><span data-vi="Thiết kế website" data-en="Website design" data-default="en">Website design</span></Link></li>
                <li><Link to="/ecommerce"><span data-vi="E-commerce" data-en="E-commerce" data-default="en">E-commerce</span></Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 data-vi="Thông tin pháp lý" data-en="Legal" data-default="en">Legal</h4>
              <ul>
                <li><Link to="/content-standards">Content Standards</Link></li>
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
            <p>&copy; {new Date().getFullYear()} Unitrux. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Floating Buttons */}
      <div className="floating-buttons">
        <div className="floating-buttons__utility">
          <button className="scroll-to-top" onClick={scrollToTop} title="Scroll to top" aria-label="Scroll to top">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="floating-buttons__social">
          <a href="https://www.youtube.com/@UnitruxDigitalMarketing" target="_blank" rel="noopener noreferrer" className="youtube-fab" title="YouTube Channel" aria-label="Visit Unitrux on YouTube">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a href="https://www.tiktok.com/@unitruxmarketing" target="_blank" rel="noopener noreferrer" className="tiktok-fab" title="TikTok Channel" aria-label="Visit Unitrux on TikTok">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        </div>
        <div className="floating-buttons__conversion">
          <a href="https://zalo.me/3299309778518905129" target="_blank" rel="noopener noreferrer" className="zalo-fab" aria-label="Liên hệ qua Zalo">
            <span className="zalo-fab__wordmark" aria-hidden="true">Zalo</span>
            <span className="zalo-fab__tooltip" aria-hidden="true">Liên hệ qua Zalo</span>
          </a>
          <Suspense fallback={null}><ChatBox /></Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout;


