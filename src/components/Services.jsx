import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../api/client';

const Services = () => {
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    initializeScrollEffects();
    initializeAnimations();
    initializeButtons();
    injectServiceCardStyles(); // 👈 thêm dòng này để inject CSS fix gạch xanh
  }, []);

  useEffect(() => {
    let mounted = true;
    getServices()
      .then((list) => {
        if (!mounted) return;
        const mapped = (Array.isArray(list) ? list : []).slice(0, 6);
        setServiceList(mapped);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const initializeScrollEffects = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('fade-in');
      });
    }, observerOptions);
    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach(el => observer.observe(el));
  };

  const initializeAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fadeInUp 0.6s ease-out; }
      @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
      }
      .ripple { position: relative; overflow: hidden; }
      .ripple::before {
        content: '';
        position: absolute;
        top: 50%; left: 50%;
        width: 0; height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }
      .ripple:active::before { width: 300px; height: 300px; }
    `;
    document.head.appendChild(style);
  };

  const initializeButtons = () => {
    const buttons = document.querySelectorAll('.btn, .cta-button');
    buttons.forEach(button => button.classList.add('ripple'));
  };

  // 💅 Thêm CSS fix underline & layout cho service cards
  const injectServiceCardStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .service-card-link {
        text-decoration: none !important;
        color: inherit !important;
      }
      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        margin-top: 40px;
      }
      .service-card {
        background: #111218;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 16px;
        padding: 28px 22px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        height: 100%;
      }
      .service-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      }
      .service-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 42px;
        margin-bottom: 18px;
        line-height: 1;
        text-decoration: none !important;
      }
      .service-card h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .service-card p {
        color: #aaa;
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 12px;
      }
      .service-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .service-card ul li {
        font-size: 0.9rem;
        margin: 6px 0;
        color: #ccc;
        display: flex;
        align-items: center;
      }
      .service-card ul li::before {
        content: '✔';
        color: #00e676;
        font-size: 0.9rem;
        margin-right: 8px;
      }
    `;
    document.head.appendChild(style);
  };

  return (
    <div className="services-page">
      {/* Services Hero Section */}
      <section className="services-hero fade-in-section">
        <div className="container">
          <div className="services-hero-content">
            <h1 data-vi="Dịch vụ của chúng tôi" data-en="Our Services">Dịch vụ của chúng tôi</h1>
            <p data-vi="Chúng tôi cung cấp các giải pháp marketing toàn diện để giúp doanh nghiệp phát triển bền vững" data-en="We provide comprehensive marketing solutions to help businesses grow sustainably">
              Chúng tôi cung cấp các giải pháp marketing toàn diện để giúp doanh nghiệp phát triển bền vững
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Services */}
      {serviceList.length > 0 && (
        <section className="digital-marketing-section fade-in-section">
          <div className="container">
            <div className="services-grid">
              {serviceList.map((s, idx) => (
                <Link key={s.id || idx} to={`/services/${s.id}`} className="service-card-link">
                  <div className="service-card">
                    <div className="service-icon">{s.icon}</div>
                    <h3>{s.nameVi || s.name}</h3>
                    <p>{s.descriptionVi || s.description}</p>
                    {Array.isArray(s.features) && s.features.length > 0 && (
                      <ul>
                        {s.features.slice(0, 3).map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="process-section fade-in-section">
        <div className="container">
          <h2 data-vi="Quy trình làm việc" data-en="Our Process">Quy trình làm việc</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3 data-vi="Tư vấn" data-en="Consultation">Tư vấn</h3>
              <p data-vi="Tìm hiểu nhu cầu và mục tiêu của khách hàng." data-en="Understand customer needs and goals.">
                Tìm hiểu nhu cầu và mục tiêu của khách hàng.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3 data-vi="Lập kế hoạch" data-en="Planning">Lập kế hoạch</h3>
              <p data-vi="Xây dựng chiến lược và kế hoạch thực hiện." data-en="Build strategy and implementation plan.">
                Xây dựng chiến lược và kế hoạch thực hiện.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3 data-vi="Thực hiện" data-en="Implementation">Thực hiện</h3>
              <p data-vi="Triển khai dự án theo đúng tiến độ và chất lượng." data-en="Implement project on schedule and quality.">
                Triển khai dự án theo đúng tiến độ và chất lượng.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3 data-vi="Báo cáo" data-en="Reporting">Báo cáo</h3>
              <p data-vi="Theo dõi và báo cáo kết quả thường xuyên." data-en="Monitor and report results regularly.">
                Theo dõi và báo cáo kết quả thường xuyên.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section fade-in-section">
        <div className="container">
          <div className="cta-content">
            <h2 data-vi="Sẵn sàng bắt đầu dự án của bạn?" data-en="Ready to Start Your Project?">
              Sẵn sàng bắt đầu dự án của bạn?
            </h2>
            <p data-vi="Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí." data-en="Contact us today for a free consultation.">
              Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <span data-vi="Liên hệ ngay" data-en="Contact Now">Liên hệ ngay</span>
              </Link>
              <Link to="/packages" className="btn btn-secondary">
                <span data-vi="Xem gói dịch vụ" data-en="View Packages">Xem gói dịch vụ</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
