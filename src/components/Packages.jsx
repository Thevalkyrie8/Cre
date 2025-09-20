import React, { useEffect, useState } from 'react';

const Packages = () => {
  const [pricingToggle, setPricingToggle] = useState('monthly');
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => {
    // Initialize animations and effects
    initializeScrollEffects();
    initializeAnimations();
    initializeButtons();
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

  const packages = {
    monthly: [
      {
        name: 'Starter',
        price: 299,
        period: '/tháng',
        features: [
          'SEO cơ bản',
          'Social Media Management',
          'Content Marketing',
          'Email Marketing',
          'Báo cáo hàng tháng'
        ],
        popular: false
      },
      {
        name: 'Professional',
        price: 599,
        period: '/tháng',
        features: [
          'Tất cả gói Starter',
          'Google Ads',
          'Facebook Ads',
          'Email Marketing nâng cao',
          'Báo cáo chi tiết',
          'Hỗ trợ 24/7'
        ],
        popular: true
      },
      {
        name: 'Enterprise',
        price: 999,
        period: '/tháng',
        features: [
          'Tất cả gói Professional',
          'Dedicated Account Manager',
          'Custom Solutions',
          'Priority Support',
          'Advanced Analytics',
          'Unlimited Revisions'
        ],
        popular: false
      }
    ],
    yearly: [
      {
        name: 'Starter',
        price: 2999,
        period: '/năm',
        features: [
          'SEO cơ bản',
          'Social Media Management',
          'Content Marketing',
          'Email Marketing',
          'Báo cáo hàng tháng',
          'Tiết kiệm 2 tháng'
        ],
        popular: false
      },
      {
        name: 'Professional',
        price: 5999,
        period: '/năm',
        features: [
          'Tất cả gói Starter',
          'Google Ads',
          'Facebook Ads',
          'Email Marketing nâng cao',
          'Báo cáo chi tiết',
          'Hỗ trợ 24/7',
          'Tiết kiệm 2 tháng'
        ],
        popular: true
      },
      {
        name: 'Enterprise',
        price: 9999,
        period: '/năm',
        features: [
          'Tất cả gói Professional',
          'Dedicated Account Manager',
          'Custom Solutions',
          'Priority Support',
          'Advanced Analytics',
          'Unlimited Revisions',
          'Tiết kiệm 2 tháng'
        ],
        popular: false
      }
    ]
  };

  const faqs = [
    {
      question: 'Tôi có thể thay đổi gói dịch vụ không?',
      answer: 'Có, bạn có thể thay đổi gói dịch vụ bất kỳ lúc nào. Chúng tôi sẽ tính toán lại chi phí dựa trên thời gian sử dụng.'
    },
    {
      question: 'Có phí setup không?',
      answer: 'Không, chúng tôi không tính phí setup cho tất cả các gói dịch vụ.'
    },
    {
      question: 'Tôi có thể hủy dịch vụ bất kỳ lúc nào không?',
      answer: 'Có, bạn có thể hủy dịch vụ với thông báo trước 30 ngày.'
    },
    {
      question: 'Có hỗ trợ kỹ thuật không?',
      answer: 'Có, chúng tôi cung cấp hỗ trợ kỹ thuật 24/7 cho tất cả khách hàng.'
    },
    {
      question: 'Tôi có thể yêu cầu tính năng tùy chỉnh không?',
      answer: 'Có, đặc biệt với gói Enterprise, chúng tôi có thể phát triển các tính năng tùy chỉnh theo yêu cầu.'
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

      {/* Pricing Toggle */}
      <section className="pricing-toggle-section fade-in-section">
        <div className="container">
          <div className="pricing-toggle">
            <button 
              className={`toggle-btn ${pricingToggle === 'monthly' ? 'active' : ''}`}
              onClick={() => setPricingToggle('monthly')}
            >
              <span data-vi="Hàng tháng" data-en="Monthly">Hàng tháng</span>
            </button>
            <button 
              className={`toggle-btn ${pricingToggle === 'yearly' ? 'active' : ''}`}
              onClick={() => setPricingToggle('yearly')}
            >
              <span data-vi="Hàng năm" data-en="Yearly">Hàng năm</span>
              <span className="discount-badge" data-vi="Tiết kiệm 2 tháng" data-en="Save 2 months">Tiết kiệm 2 tháng</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards-section fade-in-section">
        <div className="container">
          <div className="pricing-cards">
            {packages[pricingToggle].map((pkg, index) => (
              <div key={index} className={`pricing-card ${pkg.popular ? 'featured' : ''}`}>
                {pkg.popular && (
                  <div className="popular-badge" data-vi="Phổ biến nhất" data-en="Most Popular">Phổ biến nhất</div>
                )}
                <div className="card-header">
                  <h3>{pkg.name}</h3>
                  <div className="price">
                    <span className="currency">$</span>
                    <span className="amount">{pkg.price.toLocaleString()}</span>
                    <span className="period">{pkg.period}</span>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="features-list">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <span className="check-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">
                    <span data-vi="Chọn gói" data-en="Choose Plan">Chọn gói</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on Services */}
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
              <div className="addon-price">$500 - $2000</div>
            </div>
            <div className="addon-card">
              <div className="addon-icon">📊</div>
              <h3 data-vi="Advanced Analytics" data-en="Advanced Analytics">Advanced Analytics</h3>
              <p data-vi="Phân tích dữ liệu nâng cao và báo cáo chi tiết" data-en="Advanced data analysis and detailed reporting">
                Phân tích dữ liệu nâng cao và báo cáo chi tiết
              </p>
              <div className="addon-price">$200/tháng</div>
            </div>
            <div className="addon-card">
              <div className="addon-icon">🌐</div>
              <h3 data-vi="Multi-language Support" data-en="Multi-language Support">Multi-language Support</h3>
              <p data-vi="Hỗ trợ đa ngôn ngữ cho thị trường quốc tế" data-en="Multi-language support for international markets">
                Hỗ trợ đa ngôn ngữ cho thị trường quốc tế
              </p>
              <div className="addon-price">$300/tháng</div>
            </div>
            <div className="addon-card">
              <div className="addon-icon">🔧</div>
              <h3 data-vi="Custom Development" data-en="Custom Development">Custom Development</h3>
              <p data-vi="Phát triển tính năng tùy chỉnh theo yêu cầu" data-en="Custom feature development on demand">
                Phát triển tính năng tùy chỉnh theo yêu cầu
              </p>
              <div className="addon-price">$100/giờ</div>
            </div>
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
              <a href="#contact" className="btn btn-primary">
                <span data-vi="Liên hệ ngay" data-en="Contact Now">Liên hệ ngay</span>
              </a>
              <a href="/services" className="btn btn-secondary">
                <span data-vi="Xem dịch vụ" data-en="View Services">Xem dịch vụ</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
