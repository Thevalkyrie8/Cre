import React, { useEffect } from 'react';

const DigitalMarketingService = () => {
  useEffect(() => {
    // Initialize animations
    initializeScrollEffects();
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

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="service-hero fade-in-section">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-badge">
              <span data-vi="Dịch vụ" data-en="Service" data-default="en">Dịch vụ</span>
            </div>
            <h1 data-vi="Digital Marketing – Chiến lược đa kênh cho doanh nghiệp và cá nhân" data-en="Digital Marketing — A Multichannel Strategy for Businesses and Individuals" data-default="en">
              Digital Marketing – Chiến lược đa kênh cho doanh nghiệp và cá nhân
            </h1>
            <p data-vi="Trong thời đại 'khách hàng online trước tiên', Digital Marketing không chỉ là quảng cáo mà là một hệ thống đa kênh giúp bạn tăng hiện diện, thu hút khách hàng đúng lúc và tối ưu chi phí. Unitrux mang đến giải pháp Digital Marketing dựa trên dữ liệu thật, đo lường minh bạch và hướng chuyển đổi." data-en="In today's 'online-first customer' era, Digital Marketing isn't just advertising—it's a multichannel system that lifts your visibility, reaches the right customers at the right moment, and optimizes costs. Unitrux delivers data-driven Digital Marketing with transparent measurement and a relentless focus on conversions." data-default="en">
              Trong thời đại 'khách hàng online trước tiên', Digital Marketing không chỉ là quảng cáo mà là một hệ thống đa kênh giúp bạn tăng hiện diện, thu hút khách hàng đúng lúc và tối ưu chi phí. Unitrux mang đến giải pháp Digital Marketing dựa trên dữ liệu thật, đo lường minh bạch và hướng chuyển đổi.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section fade-in-section">
        <div className="container">
          <h2 data-vi="Vì sao chọn Digital Marketing của Unitrux?" data-en="Why Choose Unitrux for Digital Marketing?" data-default="en">
            Vì sao chọn Digital Marketing của Unitrux?
          </h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">🔍</div>
              <h3 data-vi="SEO tổng thể & Local SEO" data-en="Full-funnel SEO & Local SEO" data-default="en">
                SEO tổng thể & Local SEO
              </h3>
              <p data-vi="xây dựng nội dung theo cụm chủ đề, tối ưu hồ sơ Google Business Profile để khách địa phương dễ tìm ra bạn." data-en="Build topic-clustered content and optimize your Google Business Profile so local customers can find you fast." data-default="en">
                xây dựng nội dung theo cụm chủ đề, tối ưu hồ sơ Google Business Profile để khách địa phương dễ tìm ra bạn.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">🎯</div>
              <h3 data-vi="Quảng cáo mục tiêu" data-en="Targeted advertising" data-default="en">
                Quảng cáo mục tiêu
              </h3>
              <p data-vi="Google, Meta, TikTok theo phễu; remarketing thông minh đúng hành trình." data-en="Google, Meta, and TikTok campaigns mapped to your funnel; smart remarketing aligned to the customer journey." data-default="en">
                Google, Meta, TikTok theo phễu; remarketing thông minh đúng hành trình.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">📝</div>
              <h3 data-vi="Content chuẩn E-E-A-T" data-en="E-E-A-T-ready content" data-default="en">
                Content chuẩn E-E-A-T
              </h3>
              <p data-vi="bài viết hữu ích, video ngắn, lịch nội dung 4–8 tuần, đảm bảo 'Helpful Content'." data-en="Helpful, trustworthy articles, short-form videos, and a 4–8 week content calendar engineered for 'Helpful Content' guidelines." data-default="en">
                bài viết hữu ích, video ngắn, lịch nội dung 4–8 tuần, đảm bảo 'Helpful Content'.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">📧</div>
              <h3 data-vi="Email & automation" data-en="Email & automation" data-default="en">
                Email & automation
              </h3>
              <p data-vi="nuôi dưỡng lead, nhắc lịch, chăm sóc sau mua." data-en="Nurture leads, send reminders, and power post-purchase care." data-default="en">
                nuôi dưỡng lead, nhắc lịch, chăm sóc sau mua.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">📊</div>
              <h3 data-vi="Báo cáo minh bạch" data-en="Transparent reporting" data-default="en">
                Báo cáo minh bạch
              </h3>
              <p data-vi="GA4/GSC/UTM, dashboard theo dõi traffic – lead – CPL/CPA – ROAS." data-en="GA4/GSC/UTM tracking with a real-time dashboard for traffic → leads → CPL/CPA → ROAS." data-default="en">
                GA4/GSC/UTM, dashboard theo dõi traffic – lead – CPL/CPA – ROAS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section fade-in-section">
        <div className="container">
          <h2 data-vi="Quy trình triển khai chi tiết Digital Marketing của Unitrux" data-en="Unitrux's Step-by-Step Digital Marketing Implementation" data-default="en">
            Quy trình triển khai chi tiết Digital Marketing của Unitrux
          </h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3 data-vi="Nghe & hiểu nhu cầu" data-en="Listen & understand your goals" data-default="en">
                Nghe & hiểu nhu cầu
              </h3>
              <p data-vi="Unitrux bắt đầu bằng việc trao đổi nhanh để nắm rõ mục tiêu của bạn: tăng lead, tăng doanh thu, mở rộng thương hiệu hay 'làm mới' nội dung. Song song đó, Unitrux thực hiện mini-audit web/SEO/Ads để kiểm tra: tốc độ website, Core Web Vitals, index, tracking GA4/GSC và tình trạng các chiến dịch hiện tại." data-en="We start with a quick discovery to clarify targets: more leads, higher revenue, brand expansion, or a content refresh. In parallel, we run a mini audit across web/SEO/Ads to check site speed, Core Web Vitals, indexing, GA4/GSC tracking, and the health of current campaigns." data-default="en">
                Unitrux bắt đầu bằng việc trao đổi nhanh để nắm rõ mục tiêu của bạn: tăng lead, tăng doanh thu, mở rộng thương hiệu hay 'làm mới' nội dung. Song song đó, Unitrux thực hiện mini-audit web/SEO/Ads để kiểm tra: tốc độ website, Core Web Vitals, index, tracking GA4/GSC và tình trạng các chiến dịch hiện tại.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3 data-vi="Nghiên cứu thị trường & đối thủ" data-en="Market & competitor research" data-default="en">
                Nghiên cứu thị trường & đối thủ
              </h3>
              <p data-vi="Unitrux phân tích khách hàng mục tiêu, từ khóa chính/phụ, đối thủ và xu hướng ngành. Nhờ đó bạn biết đâu là cơ hội, đâu là lỗ hổng trước khi đầu tư." data-en="We analyze your target audience, primary/secondary keywords, competitors, and industry trends—so you can see opportunities and gaps before investing." data-default="en">
                Unitrux phân tích khách hàng mục tiêu, từ khóa chính/phụ, đối thủ và xu hướng ngành. Nhờ đó bạn biết đâu là cơ hội, đâu là lỗ hổng trước khi đầu tư.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3 data-vi="Đưa ra hướng đi & demo" data-en="Direction & live demo" data-default="en">
                Đưa ra hướng đi & demo
              </h3>
              <p data-vi="Unitrux soạn bản chiến lược 30–60–90 ngày: SEO, Ads, Social, Email/Automation. Đồng thời trình bày demo landing page, creative, workflow nuôi dưỡng để bạn góp ý trực tiếp." data-en="We draft a 30–60–90 day plan spanning SEO, Ads, Social, and Email/Automation. You also get demo assets—landing page, creatives, and nurturing workflows—for hands-on feedback." data-default="en">
                Unitrux soạn bản chiến lược 30–60–90 ngày: SEO, Ads, Social, Email/Automation. Đồng thời trình bày demo landing page, creative, workflow nuôi dưỡng để bạn góp ý trực tiếp.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3 data-vi="Tư vấn & báo giá minh bạch" data-en="Clear proposal & pricing" data-default="en">
                Tư vấn & báo giá minh bạch
              </h3>
              <p data-vi="Unitrux nêu rõ phạm vi – chi phí – thời gian – SLA & KPI (CPL/CPA/CR/ROAS). Bạn chọn gói phù hợp ngân sách, không phát sinh bất ngờ." data-en="We spell out scope, fees, timelines, SLA & KPI (CPL/CPA/CR/ROAS). Choose a package that fits your budget—no surprises." data-default="en">
                Unitrux nêu rõ phạm vi – chi phí – thời gian – SLA & KPI (CPL/CPA/CR/ROAS). Bạn chọn gói phù hợp ngân sách, không phát sinh bất ngờ.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3 data-vi="Ký kết & khởi động" data-en="Contract & kickoff" data-default="en">
                Ký kết & khởi động
              </h3>
              <p data-vi="Unitrux ký hợp đồng, họp kickoff. Thiết lập GA4/GSC/UTM tracking chuẩn, phân quyền tài khoản Ads/CRM, lên lịch sprint/tuần, checklist QA trước khi chạy." data-en="We sign, run a kickoff, and set up precise GA4/GSC/UTM tracking. We align ad/CRM permissions, schedule weekly sprints, and complete a QA checklist before launch." data-default="en">
                Unitrux ký hợp đồng, họp kickoff. Thiết lập GA4/GSC/UTM tracking chuẩn, phân quyền tài khoản Ads/CRM, lên lịch sprint/tuần, checklist QA trước khi chạy.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">6</div>
              <h3 data-vi="Triển khai & tối ưu liên tục" data-en="Execution & continuous optimization" data-default="en">
                Triển khai & tối ưu liên tục
              </h3>
              <p data-vi="Unitrux vận hành đa kênh: SEO/Content, Ads, Social, Email/Automation. Liên tục A/B test, tối ưu ngân sách, theo dõi Core Web Vitals và hành vi người dùng (heatmap). Báo cáo định kỳ các KPI: traffic – lead – CPL/CPA – CR – ROAS." data-en="We operate across channels—SEO/Content, Ads, Social, and Email/Automation—while running A/B tests, optimizing budgets, monitoring Core Web Vitals and on-site behavior (heatmaps). We report KPIs on cadence: traffic, leads, CPL/CPA, CR, and ROAS." data-default="en">
                Unitrux vận hành đa kênh: SEO/Content, Ads, Social, Email/Automation. Liên tục A/B test, tối ưu ngân sách, theo dõi Core Web Vitals và hành vi người dùng (heatmap). Báo cáo định kỳ các KPI: traffic – lead – CPL/CPA – CR – ROAS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section fade-in-section">
        <div className="container">
          <h2 data-vi="Kết quả mà Unitrux mang đến cho bạn" data-en="Results You Can Expect from Unitrux" data-default="en">
            Kết quả mà Unitrux mang đến cho bạn
          </h2>
          <div className="results-grid">
            <div className="result-item">
              <div className="result-icon">🎯</div>
              <h3 data-vi="Khách hàng tiềm năng thật – chi phí tối ưu" data-en="Real, qualified leads at optimized cost" data-default="en">
                Khách hàng tiềm năng thật – chi phí tối ưu
              </h3>
              <p data-vi="không còn 'đốt ngân sách' mà không rõ kết quả." data-en="No more 'burning budget' without clarity." data-default="en">
                không còn 'đốt ngân sách' mà không rõ kết quả.
              </p>
            </div>
            <div className="result-item">
              <div className="result-icon">🔄</div>
              <h3 data-vi="Nội dung đồng bộ đa kênh" data-en="Consistent cross-channel messaging" data-default="en">
                Nội dung đồng bộ đa kênh
              </h3>
              <p data-vi="khách thấy cùng một thông điệp từ Ads tới Social." data-en="Customers see one cohesive story—from ads to social." data-default="en">
                khách thấy cùng một thông điệp từ Ads tới Social.
              </p>
            </div>
            <div className="result-item">
              <div className="result-icon">📊</div>
              <h3 data-vi="Dữ liệu minh bạch" data-en="Actionable, transparent data" data-default="en">
                Dữ liệu minh bạch
              </h3>
              <p data-vi="dashboard theo dõi trực tiếp, quyết định nhanh hơn." data-en="Live dashboards for faster, more confident decisions." data-default="en">
                dashboard theo dõi trực tiếp, quyết định nhanh hơn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section fade-in-section">
        <div className="container">
          <div className="cta-content">
            <h2 data-vi="Digital Marketing của Unitrux giúp bạn tăng trưởng có kiểm soát, đo lường minh bạch, tối ưu chuyển đổi" data-en="Unitrux helps you grow in a controlled, measurable, conversion-focused way" data-default="en">
              Digital Marketing của Unitrux giúp bạn tăng trưởng có kiểm soát, đo lường minh bạch, tối ưu chuyển đổi
            </h2>
            <p data-vi="Đặt lịch tư vấn 30' miễn phí • Nhận mini-audit hiện trạng • Xem case study thực tế" data-en="Book a free 30-minute consultation • Get a mini audit of your current setup • Review real case studies" data-default="en">
              Đặt lịch tư vấn 30' miễn phí • Nhận mini-audit hiện trạng • Xem case study thực tế
            </p>
            <div className="cta-buttons">
              <a href="#contact" className="btn btn-primary">
                <span data-vi="Liên hệ ngay" data-en="Contact Now" data-default="en">Liên hệ ngay</span>
              </a>
              <a href="/packages" className="btn btn-secondary">
                <span data-vi="Xem gói dịch vụ" data-en="View Packages" data-default="en">Xem gói dịch vụ</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketingService;
