import React, { useEffect, useState } from 'react';
import { getPackages, getPopularPackages } from '../api/client';

const Packages = () => {
  const [faqOpen, setFaqOpen] = useState(null);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    // Initialize animations and effects
    initializeScrollEffects();
    initializeAnimations();
    initializeButtons();
    // Load dynamic packages
    getPopularPackages().catch(() => null); // preload popular
  }, []);

  const initializeScrollEffects = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach(el => observer.observe(el));
  };

  const initializeAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .fade-in {
        animation: fadeInUp 0.6s ease-out;
      }
      
      @keyframes ripple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      .ripple {
        position: relative;
        overflow: hidden;
      }
      
      .ripple::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }
      
      .ripple:active::before {
        width: 300px;
        height: 300px;
      }
    `;
    document.head.appendChild(style);
  };

  const initializeButtons = () => {
    const buttons = document.querySelectorAll('.btn, .cta-button');
    buttons.forEach(button => {
      button.classList.add('ripple');
    });
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showPhoneNumber = () => {
    setShowPhone(true);
    // Auto hide after 5 seconds
    setTimeout(() => setShowPhone(false), 5000);
  };

  const [apiPackages, setApiPackages] = useState([]);
  useEffect(() => {
    let mounted = true;
    getPackages()
      .then((items) => {
        if (!mounted) return;
        const mapped = (Array.isArray(items) ? items : []).map((p) => ({
          name: p.nameVi || p.name,
          features: Array.isArray(p.featuresVi) && p.featuresVi.length ? p.featuresVi : (p.features || []),
          popular: false
        }));
        setApiPackages(mapped.slice(0, 3));
      })
      .catch((e) => console.error('Failed to load packages:', e));
    return () => { mounted = false; };
  }, []);

  const faqs = [
    {
      question: 'Tôi có thể thay đổi gói dịch vụ không?',
      answer: 'Có, bạn có thể thay đổi gói dịch vụ bất kỳ lúc nào. Chúng tôi sẽ hỗ trợ chuyển đổi giữa các gói một cách linh hoạt.'
    },
    {
      question: 'Có hỗ trợ kỹ thuật không?',
      answer: 'Có, chúng tôi cung cấp hỗ trợ kỹ thuật 24/7 cho tất cả khách hàng.'
    },
    {
      question: 'Tôi có thể yêu cầu tính năng tùy chỉnh không?',
      answer: 'Có, đặc biệt với gói Enterprise, chúng tôi có thể phát triển các tính năng tùy chỉnh theo yêu cầu.'
    },
    {
      question: 'Thời gian triển khai dịch vụ là bao lâu?',
      answer: 'Thời gian triển khai tùy thuộc vào gói dịch vụ, thường từ 1-4 tuần. Chúng tôi sẽ cung cấp timeline cụ thể sau khi tư vấn.'
    },
    {
      question: 'Có báo cáo định kỳ không?',
      answer: 'Có, chúng tôi cung cấp báo cáo chi tiết về hiệu quả dịch vụ theo định kỳ hàng tháng.'
    }
  ];

  return (
    <div className="packages-page">
      {/* Packages Hero Section */}
      <section className="packages-hero fade-in-section">
        <div className="container">
          <div className="packages-hero-content">
            <h1 data-vi="Gói dịch vụ" data-en="Service Packages">Gói dịch vụ</h1>
            <p data-vi="Chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của bạn" data-en="Choose the service package that fits your needs and budget">
              Chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của bạn
            </p>
          </div>
        </div>
      </section>



      {/* Add-on Services (static UI preserved) */}
      <section className="addon-services-section fade-in-section">
        <div className="container">
          <h2 data-vi="Dịch vụ bổ sung" data-en="Add-on Services">Dịch vụ bổ sung</h2>
          <div className="addon-grid">
            <div className="addon-card">
              <div className="addon-icon">🎥</div>
              <h3 data-vi="Video Production" data-en="Video Production">Video Production</h3>
              <p data-vi="Sản xuất video quảng cáo chuyên nghiệp" data-en="Professional video advertising production">
                Sản xuất video quảng cáo chuyên nghiệp
              </p>
            </div>
            <div className="addon-card">
              <div className="addon-icon">📊</div>
              <h3 data-vi="Advanced Analytics" data-en="Advanced Analytics">Advanced Analytics</h3>
              <p data-vi="Phân tích dữ liệu nâng cao và báo cáo chi tiết" data-en="Advanced data analysis and detailed reporting">
                Phân tích dữ liệu nâng cao và báo cáo chi tiết
              </p>
            </div>
            <div className="addon-card">
              <div className="addon-icon">🌐</div>
              <h3 data-vi="Multi-language Support" data-en="Multi-language Support">Multi-language Support</h3>
              <p data-vi="Hỗ trợ đa ngôn ngữ cho thị trường quốc tế" data-en="Multi-language support for international markets">
                Hỗ trợ đa ngôn ngữ cho thị trường quốc tế
              </p>
            </div>
            <div className="addon-card">
              <div className="addon-icon">🔧</div>
              <h3 data-vi="Custom Development" data-en="Custom Development">Custom Development</h3>
              <p data-vi="Phát triển tính năng tùy chỉnh theo yêu cầu" data-en="Custom feature development on demand">
                Phát triển tính năng tùy chỉnh theo yêu cầu
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Packages Grid (texts from API, same visuals) */}
      <section className="packages-grid-section fade-in-section">
        <div className="container">
          <h2 data-vi="Gói đề xuất" data-en="Recommended Packages">Gói đề xuất</h2>
          <div className="packages-grid">
            {(apiPackages.length ? apiPackages : []).map((pkg, idx) => (
              <div key={idx} className={`package-card ${idx === 0 ? 'featured-package' : ''}`}>
                {idx === 0 && <div className="popular-badge">Most Popular</div>}
                <div className="package-header">
                  <div className="crown-icon"></div>
                  <div className="package-badge">On demand</div>
                </div>
                <h3 className="package-title">{pkg.name}</h3>
                <div className="package-features">
                  {(pkg.features || []).slice(0, 6).map((f, i) => (
                    <div key={i} className="feature-item">
                      <div className="feature-icon">✓</div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section fade-in-section">
        <div className="container">
          <h2 data-vi="Câu hỏi thường gặp" data-en="Frequently Asked Questions">Câu hỏi thường gặp</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={`faq-question ${faqOpen === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{faqOpen === index ? '−' : '+'}</span>
                </button>
                {faqOpen === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section fade-in-section">
        <div className="container">
          <div className="cta-content">
            <h2 data-vi="Sẵn sàng bắt đầu?" data-en="Ready to Get Started?">Sẵn sàng bắt đầu?</h2>
            <p data-vi="Hãy liên hệ với chúng tôi để được tư vấn miễn phí và chọn gói dịch vụ phù hợp." data-en="Contact us for a free consultation and choose the right service package.">
              Hãy liên hệ với chúng tôi để được tư vấn miễn phí và chọn gói dịch vụ phù hợp.
            </p>
            <div className="cta-buttons">
              <button onClick={scrollToContact} className="btn btn-primary">
                <span data-vi="Nhận tư vấn miễn phí" data-en="Get Free Consultation">Nhận tư vấn miễn phí</span>
              </button>
              <button onClick={showPhoneNumber} className="btn btn-secondary">
                <span data-vi="Liên hệ" data-en="Contact">Liên hệ</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Phone Number Display */}
      {showPhone && (
        <div className="phone-display-overlay" onClick={() => setShowPhone(false)}>
          <div className="phone-display-modal" onClick={(e) => e.stopPropagation()}>
            <h3 data-vi="Số điện thoại liên hệ" data-en="Contact Phone Number">Số điện thoại liên hệ</h3>
            <div className="phone-number">+84 364 750 316</div>
            <button 
              className="btn btn-primary"
              onClick={() => window.open('tel:+84364750316')}
            >
              <span data-vi="Gọi ngay" data-en="Call Now">Gọi ngay</span>
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowPhone(false)}
            >
              <span data-vi="Đóng" data-en="Close">Đóng</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
