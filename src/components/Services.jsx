import React, { useEffect } from 'react';

const Services = () => {
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

      {/* Digital Marketing Section */}
      <section className="digital-marketing-section fade-in-section">
        <div className="container">
          <h2 data-vi="Digital Marketing" data-en="Digital Marketing">Digital Marketing</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3 data-vi="Facebook Ads" data-en="Facebook Ads">Facebook Ads</h3>
              <p data-vi="Quảng cáo Facebook hiệu quả với targeting chính xác và ROI cao." data-en="Effective Facebook advertising with precise targeting and high ROI.">
                Quảng cáo Facebook hiệu quả với targeting chính xác và ROI cao.
              </p>
              <ul>
                <li data-vi="Setup và quản lý campaign" data-en="Campaign setup and management">Setup và quản lý campaign</li>
                <li data-vi="A/B testing và tối ưu" data-en="A/B testing and optimization">A/B testing và tối ưu</li>
                <li data-vi="Báo cáo chi tiết" data-en="Detailed reporting">Báo cáo chi tiết</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🔍</div>
              <h3 data-vi="Google Ads" data-en="Google Ads">Google Ads</h3>
              <p data-vi="Quảng cáo Google Search, Display và YouTube để tăng visibility." data-en="Google Search, Display and YouTube advertising to increase visibility.">
                Quảng cáo Google Search, Display và YouTube để tăng visibility.
              </p>
              <ul>
                <li data-vi="Keyword research" data-en="Keyword research">Keyword research</li>
                <li data-vi="Ad copywriting" data-en="Ad copywriting">Ad copywriting</li>
                <li data-vi="Landing page optimization" data-en="Landing page optimization">Landing page optimization</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">📈</div>
              <h3 data-vi="SEO" data-en="SEO">SEO</h3>
              <p data-vi="Tối ưu hóa website để đạt thứ hạng cao trên Google." data-en="Website optimization to achieve high rankings on Google.">
                Tối ưu hóa website để đạt thứ hạng cao trên Google.
              </p>
              <ul>
                <li data-vi="Technical SEO" data-en="Technical SEO">Technical SEO</li>
                <li data-vi="Content optimization" data-en="Content optimization">Content optimization</li>
                <li data-vi="Link building" data-en="Link building">Link building</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">📝</div>
              <h3 data-vi="Content Marketing" data-en="Content Marketing">Content Marketing</h3>
              <p data-vi="Tạo nội dung chất lượng để thu hút và giữ chân khách hàng." data-en="Create quality content to attract and retain customers.">
                Tạo nội dung chất lượng để thu hút và giữ chân khách hàng.
              </p>
              <ul>
                <li data-vi="Blog writing" data-en="Blog writing">Blog writing</li>
                <li data-vi="Social media content" data-en="Social media content">Social media content</li>
                <li data-vi="Video content" data-en="Video content">Video content</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className="branding-section fade-in-section">
        <div className="container">
          <h2 data-vi="Branding & Design" data-en="Branding & Design">Branding & Design</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3 data-vi="Logo Design" data-en="Logo Design">Logo Design</h3>
              <p data-vi="Thiết kế logo chuyên nghiệp và độc đáo cho thương hiệu." data-en="Professional and unique logo design for your brand.">
                Thiết kế logo chuyên nghiệp và độc đáo cho thương hiệu.
              </p>
              <ul>
                <li data-vi="Concept development" data-en="Concept development">Concept development</li>
                <li data-vi="Multiple variations" data-en="Multiple variations">Multiple variations</li>
                <li data-vi="Brand guidelines" data-en="Brand guidelines">Brand guidelines</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🎯</div>
              <h3 data-vi="Brand Identity" data-en="Brand Identity">Brand Identity</h3>
              <p data-vi="Xây dựng bộ nhận diện thương hiệu hoàn chỉnh." data-en="Build a complete brand identity system.">
                Xây dựng bộ nhận diện thương hiệu hoàn chỉnh.
              </p>
              <ul>
                <li data-vi="Brand strategy" data-en="Brand strategy">Brand strategy</li>
                <li data-vi="Visual identity" data-en="Visual identity">Visual identity</li>
                <li data-vi="Brand guidelines" data-en="Brand guidelines">Brand guidelines</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3 data-vi="Social Media Design" data-en="Social Media Design">Social Media Design</h3>
              <p data-vi="Thiết kế nội dung cho các nền tảng social media." data-en="Design content for social media platforms.">
                Thiết kế nội dung cho các nền tảng social media.
              </p>
              <ul>
                <li data-vi="Post templates" data-en="Post templates">Post templates</li>
                <li data-vi="Story designs" data-en="Story designs">Story designs</li>
                <li data-vi="Banner designs" data-en="Banner designs">Banner designs</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">📄</div>
              <h3 data-vi="Print Design" data-en="Print Design">Print Design</h3>
              <p data-vi="Thiết kế các ấn phẩm in ấn cho thương hiệu." data-en="Design print materials for your brand.">
                Thiết kế các ấn phẩm in ấn cho thương hiệu.
              </p>
              <ul>
                <li data-vi="Business cards" data-en="Business cards">Business cards</li>
                <li data-vi="Brochures" data-en="Brochures">Brochures</li>
                <li data-vi="Flyers" data-en="Flyers">Flyers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Web Development Section */}
      <section className="web-development-section fade-in-section">
        <div className="container">
          <h2 data-vi="Web Development" data-en="Web Development">Web Development</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3 data-vi="Website Development" data-en="Website Development">Website Development</h3>
              <p data-vi="Phát triển website responsive và hiện đại." data-en="Develop responsive and modern websites.">
                Phát triển website responsive và hiện đại.
              </p>
              <ul>
                <li data-vi="Responsive design" data-en="Responsive design">Responsive design</li>
                <li data-vi="CMS integration" data-en="CMS integration">CMS integration</li>
                <li data-vi="SEO optimization" data-en="SEO optimization">SEO optimization</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🛒</div>
              <h3 data-vi="E-commerce" data-en="E-commerce">E-commerce</h3>
              <p data-vi="Xây dựng cửa hàng online chuyên nghiệp." data-en="Build professional online stores.">
                Xây dựng cửa hàng online chuyên nghiệp.
              </p>
              <ul>
                <li data-vi="Shopping cart" data-en="Shopping cart">Shopping cart</li>
                <li data-vi="Payment integration" data-en="Payment integration">Payment integration</li>
                <li data-vi="Inventory management" data-en="Inventory management">Inventory management</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3 data-vi="Mobile App" data-en="Mobile App">Mobile App</h3>
              <p data-vi="Phát triển ứng dụng di động cho iOS và Android." data-en="Develop mobile applications for iOS and Android.">
                Phát triển ứng dụng di động cho iOS và Android.
              </p>
              <ul>
                <li data-vi="Native development" data-en="Native development">Native development</li>
                <li data-vi="Cross-platform" data-en="Cross-platform">Cross-platform</li>
                <li data-vi="App store optimization" data-en="App store optimization">App store optimization</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3 data-vi="Web Maintenance" data-en="Web Maintenance">Web Maintenance</h3>
              <p data-vi="Bảo trì và cập nhật website thường xuyên." data-en="Regular website maintenance and updates.">
                Bảo trì và cập nhật website thường xuyên.
              </p>
              <ul>
                <li data-vi="Security updates" data-en="Security updates">Security updates</li>
                <li data-vi="Performance optimization" data-en="Performance optimization">Performance optimization</li>
                <li data-vi="Content updates" data-en="Content updates">Content updates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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
            <h2 data-vi="Sẵn sàng bắt đầu dự án của bạn?" data-en="Ready to Start Your Project?">Sẵn sàng bắt đầu dự án của bạn?</h2>
            <p data-vi="Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí." data-en="Contact us today for a free consultation.">
              Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí.
            </p>
            <div className="cta-buttons">
              <a href="#contact" className="btn btn-primary">
                <span data-vi="Liên hệ ngay" data-en="Contact Now">Liên hệ ngay</span>
              </a>
              <a href="/packages" className="btn btn-secondary">
                <span data-vi="Xem gói dịch vụ" data-en="View Packages">Xem gói dịch vụ</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
