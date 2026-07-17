import React, { useEffect } from 'react';

const About = () => {
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
    <div className="about-page">
      {/* About Hero Section */}
      <section className="about-hero fade-in-section">
        <div className="container">
          <div className="about-hero-content">
            <h1 data-vi="Về chúng tôi" data-en="About Us">Về chúng tôi</h1>
            <p data-vi="Unitrux - Đối tác tin cậy cho sự phát triển bền vững của doanh nghiệp" data-en="Unitrux - Trusted partner for sustainable business growth">
              Unitrux - Đối tác tin cậy cho sự phát triển bền vững của doanh nghiệp
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <h3>10+</h3>
              <p data-vi="Dự án thành công" data-en="Successful Projects">Dự án thành công</p>
            </div>
            <div className="stat-item">
              <h3>20+</h3>
              <p data-vi="Khách hàng hài lòng" data-en="Satisfied Clients">Khách hàng hài lòng</p>
            </div>
            <div className="stat-item">
              <h3>3+</h3>
              <p data-vi="Năm kinh nghiệm" data-en="Years Experience">Năm kinh nghiệm</p>
            </div>
            <div className="stat-item">
              <h3>15+</h3>
              <p data-vi="Nhân viên chuyên nghiệp" data-en="Professional Staff">Nhân viên chuyên nghiệp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="mission-vision-values fade-in-section">
        <div className="container">
          <div className="mvv-grid">
            <div className="mvv-item">
              <div className="mvv-icon">🎯</div>
              <h3 data-vi="Sứ mệnh" data-en="Mission">Sứ mệnh</h3>
              <p data-vi="Chúng tôi cam kết mang đến những giải pháp marketing sáng tạo và hiệu quả, giúp doanh nghiệp phát triển bền vững trong thời đại số." data-en="We are committed to providing creative and effective marketing solutions, helping businesses grow sustainably in the digital age.">
                Chúng tôi cam kết mang đến những giải pháp marketing sáng tạo và hiệu quả, giúp doanh nghiệp phát triển bền vững trong thời đại số.
              </p>
            </div>
            <div className="mvv-item">
              <div className="mvv-icon">👁️</div>
              <h3 data-vi="Tầm nhìn" data-en="Vision">Tầm nhìn</h3>
              <p data-vi="Trở thành công ty marketing hàng đầu Việt Nam, được khách hàng tin tưởng và đối tác đánh giá cao." data-en="To become Vietnam's leading marketing company, trusted by customers and highly valued by partners.">
                Trở thành công ty marketing hàng đầu Việt Nam, được khách hàng tin tưởng và đối tác đánh giá cao.
              </p>
            </div>
            <div className="mvv-item">
              <div className="mvv-icon">💎</div>
              <h3 data-vi="Giá trị cốt lõi" data-en="Core Values">Giá trị cốt lõi</h3>
              <p data-vi="Sáng tạo, chuyên nghiệp, minh bạch và cam kết mang lại giá trị thực sự cho khách hàng." data-en="Creative, professional, transparent and committed to delivering real value to customers.">
                Sáng tạo, chuyên nghiệp, minh bạch và cam kết mang lại giá trị thực sự cho khách hàng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section
      <section className="team-section fade-in-section">
        <div className="container">
          <h2 data-vi="Đội ngũ của chúng tôi" data-en="Our Team">Đội ngũ của chúng tôi</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <img src="/logo-unitrux.jpg" alt="" loading="lazy" />
              </div>
              <h3>Nguyễn Văn A</h3>
              <p data-vi="CEO & Founder" data-en="CEO & Founder">CEO & Founder</p>
              <p data-vi="10+ năm kinh nghiệm trong lĩnh vực marketing và quản lý doanh nghiệp." data-en="10+ years of experience in marketing and business management.">
                10+ năm kinh nghiệm trong lĩnh vực marketing và quản lý doanh nghiệp.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src="/logo-unitrux.jpg" alt="" loading="lazy" />
              </div>
              <h3>Trần Thị B</h3>
              <p data-vi="Creative Director" data-en="Creative Director">Creative Director</p>
              <p data-vi="Chuyên gia về branding và creative strategy với 8+ năm kinh nghiệm." data-en="Expert in branding and creative strategy with 8+ years of experience.">
                Chuyên gia về branding và creative strategy với 8+ năm kinh nghiệm.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src="/logo-unitrux.jpg" alt="" loading="lazy" />
              </div>
              <h3>Lê Văn C</h3>
              <p data-vi="Technical Lead" data-en="Technical Lead">Technical Lead</p>
              <p data-vi="Chuyên gia về web development và digital solutions với 7+ năm kinh nghiệm." data-en="Expert in web development and digital solutions with 7+ years of experience.">
                Chuyên gia về web development và digital solutions với 7+ năm kinh nghiệm.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src="/logo-unitrux.jpg" alt="" loading="lazy" />
              </div>
              <h3>Phạm Thị D</h3>
              <p data-vi="Marketing Manager" data-en="Marketing Manager">Marketing Manager</p>
              <p data-vi="Chuyên gia về digital marketing và growth hacking với 6+ năm kinh nghiệm." data-en="Expert in digital marketing and growth hacking with 6+ years of experience.">
                Chuyên gia về digital marketing và growth hacking với 6+ năm kinh nghiệm.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Company Timeline */}
      <section className="timeline-section fade-in-section">
        <div className="container">
          <h2 data-vi="Hành trình phát triển" data-en="Development Journey">Hành trình phát triển</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2019</div>
              <div className="timeline-content">
                <h3 data-vi="Thành lập công ty" data-en="Company Founded">Thành lập công ty</h3>
                <p data-vi="Unitrux được thành lập với đội ngũ 5 người và tầm nhìn trở thành công ty marketing hàng đầu." data-en="Unitrux was founded with a team of 5 people and a vision to become a leading marketing company.">
                  Unitrux được thành lập với đội ngũ 5 người và tầm nhìn trở thành công ty marketing hàng đầu.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3 data-vi="Mở rộng dịch vụ" data-en="Service Expansion">Mở rộng dịch vụ</h3>
                <p data-vi="Bắt đầu cung cấp dịch vụ web development và mở rộng team lên 10 người." data-en="Started providing web development services and expanded team to 15 people.">
                  Bắt đầu cung cấp dịch vụ web development và mở rộng team lên 10 người.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <h3 data-vi="Đạt 10 dự án" data-en="100 Projects Milestone">Đạt 10 dự án</h3>
                <p data-vi="Hoàn thành 10 dự án thành công và được khách hàng đánh giá cao." data-en="Completed 100 successful projects and received high customer ratings.">
                  Hoàn thành 10 dự án thành công và được khách hàng đánh giá cao.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3 data-vi="Mở văn phòng mới" data-en="New Office">Mở văn phòng mới</h3>
                <p data-vi="Chuyển đến văn phòng mới rộng hơn và mở rộng team lên 30 người." data-en="Moved to a larger new office and expanded team to 30 people.">
                  Chuyển đến văn phòng mới rộng hơn và mở rộng team lên 30 người.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3 data-vi="Đạt 15 dự án" data-en="15 Projects Milestone">Đạt 10 dự án</h3>
                <p data-vi="Hoàn thành 15 dự án thành công và trở thành đối tác tin cậy của nhiều doanh nghiệp lớn." data-en="Completed 500 successful projects and became a trusted partner of many large businesses.">
                  Hoàn thành 15 dự án thành công và trở thành đối tác tin cậy của nhiều doanh nghiệp lớn.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3 data-vi="Tương lai" data-en="Future">Tương lai</h3>
                <p data-vi="Tiếp tục phát triển và mở rộng dịch vụ ra thị trường quốc tế." data-en="Continue to develop and expand services to international markets.">
                  Tiếp tục phát triển và mở rộng dịch vụ ra thị trường quốc tế.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="culture-section fade-in-section">
        <div className="container">
          <h2 data-vi="Văn hóa công ty" data-en="Company Culture">Văn hóa công ty</h2>
          <div className="culture-grid">
            <div className="culture-item">
              <div className="culture-icon">🤝</div>
              <h3 data-vi="Hợp tác" data-en="Collaboration">Hợp tác</h3>
              <p data-vi="Chúng tôi tin tưởng vào sức mạnh của teamwork và sự hợp tác." data-en="We believe in the power of teamwork and collaboration.">
                Chúng tôi tin tưởng vào sức mạnh của teamwork và sự hợp tác.
              </p>
            </div>
            <div className="culture-item">
              <div className="culture-icon">💡</div>
              <h3 data-vi="Sáng tạo" data-en="Innovation">Sáng tạo</h3>
              <p data-vi="Khuyến khích tư duy sáng tạo và đổi mới trong mọi hoạt động." data-en="Encourage creative thinking and innovation in all activities.">
                Khuyến khích tư duy sáng tạo và đổi mới trong mọi hoạt động.
              </p>
            </div>
            <div className="culture-item">
              <div className="culture-icon">🎯</div>
              <h3 data-vi="Tập trung" data-en="Focus">Tập trung</h3>
              <p data-vi="Luôn tập trung vào mục tiêu và kết quả cuối cùng." data-en="Always focus on goals and final results.">
                Luôn tập trung vào mục tiêu và kết quả cuối cùng.
              </p>
            </div>
            <div className="culture-item">
              <div className="culture-icon">📈</div>
              <h3 data-vi="Phát triển" data-en="Growth">Phát triển</h3>
              <p data-vi="Khuyến khích sự phát triển cá nhân và chuyên môn của nhân viên." data-en="Encourage personal and professional development of employees.">
                Khuyến khích sự phát triển cá nhân và chuyên môn của nhân viên.
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

export default About;
