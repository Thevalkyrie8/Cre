import { createElement } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

const Bilingual = ({ as = 'span', en, vi, children, ...props }) => (
  createElement(as, { 'data-en': en, 'data-vi': vi, 'data-default': 'en', ...props }, children ?? en)
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
);

const contactHref = (service) => {
  const params = new URLSearchParams({ package: service.title });
  return `/contact?${params.toString()}`;
};

const ServicePackageCard = ({ service }) => (
  <article className="packages-hub__plan">
    <header>
      <Bilingual as="span" className="packages-hub__stage" en={`Service ${service.number}`} vi={`Dịch vụ ${service.number}`} />
    </header>
    <Bilingual as="h3" en={service.title} vi={service.titleVi} />
    <Bilingual as="p" className="packages-hub__plan-description" en={service.description} vi={service.descriptionVi} />
    <div className="packages-hub__plan-links">
      <Link to={service.to} className="packages-hub__plan-secondary-link">
        <Bilingual en="See what's included" vi="Xem chi tiết phạm vi" />
      </Link>
      <Link to={contactHref(service)} className="packages-hub__plan-link">
        <Bilingual en="Discuss this service" vi="Trao đổi về dịch vụ này" /> <ArrowIcon />
      </Link>
    </div>
  </article>
);

const PackagesShowcase = () => {
  const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat'));

  return (
    <main className="theme-synced-page packages-hub">
      <section className="packages-hub__hero" aria-labelledby="packages-title">
        <div className="packages-hub__container packages-hub__hero-grid">
          <div className="packages-hub__intro">
            <nav aria-label="Breadcrumb">
              <Bilingual as={Link} to="/" en="Home" vi="Trang chủ" />
              <span aria-hidden="true">/</span>
              <Bilingual en="Packages" vi="Gói dịch vụ" />
            </nav>
            <Bilingual as="p" className="packages-hub__label" en="10 services, one growth system" vi="10 dịch vụ, một hệ thống tăng trưởng" />
            <Bilingual as="h1" id="packages-title" en="Choose the service your business needs right now." vi="Chọn dịch vụ doanh nghiệp bạn cần ngay lúc này." />
            <Bilingual
              as="p"
              className="packages-hub__lede"
              en="Every service below can stand alone or connect with the others into one measurable growth system — website, content, acquisition and automation working together."
              vi="Mỗi dịch vụ bên dưới có thể triển khai độc lập hoặc kết nối với các dịch vụ khác thành một hệ thống tăng trưởng có thể đo lường — website, nội dung, thu hút khách hàng và tự động hóa cùng vận hành."
            />
            <div className="packages-hub__hero-actions">
              <Link to="/contact" className="packages-hub__primary-action"><Bilingual en="Get a tailored recommendation" vi="Nhận đề xuất phù hợp" /> <ArrowIcon /></Link>
              <Bilingual as="a" href="#packages" en="Explore all services" vi="Xem tất cả dịch vụ" />
            </div>
          </div>

          <aside className="packages-hub__engine" aria-label="Connected Growth Engine">
            <header><span aria-hidden="true" /><Bilingual as="h2" en="Connected Growth Engine" vi="Hệ thống tăng trưởng kết nối" /></header>
            <Bilingual as="p" en="One operating model. Four connected capabilities." vi="Một mô hình vận hành. Bốn năng lực được kết nối." />
            <ol>
              <li><Bilingual as="strong" en="Build trust" vi="Xây dựng niềm tin" /><Bilingual en="Website and brand foundation" vi="Nền tảng website và thương hiệu" /></li>
              <li><Bilingual as="strong" en="Attract demand" vi="Thu hút nhu cầu" /><Bilingual en="SEO, ads and content" vi="SEO, quảng cáo và nội dung" /></li>
              <li><Bilingual as="strong" en="Convert leads" vi="Chuyển đổi khách hàng tiềm năng" /><Bilingual en="Chatbot and sales automation" vi="Chatbot và tự động hóa bán hàng" /></li>
              <li><Bilingual as="strong" en="Measure growth" vi="Đo lường tăng trưởng" /><Bilingual en="Analytics and optimization" vi="Phân tích và tối ưu" /></li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="packages-hub__guide" aria-labelledby="package-guide-title">
        <div className="packages-hub__container">
          <div className="packages-hub__guide-intro">
            <Bilingual as="h2" id="package-guide-title" en="Start from the bottleneck." vi="Bắt đầu từ nhu cầu của bạn." />
            <Bilingual as="p" en="You do not need everything at once. Choose the one service that is holding growth back today, then expand when it is time." vi="Bạn không cần triển khai mọi thứ cùng lúc. Hãy chọn một dịch vụ đang kìm hãm tăng trưởng hôm nay, rồi mở rộng khi cần thiết." />
          </div>
        </div>
      </section>

      <section className="packages-hub__plans" id="packages" aria-labelledby="plans-title">
        <div className="packages-hub__container">
          <header className="packages-hub__section-head">
            <div>
              <Bilingual as="h2" id="plans-title" en="10 services. Pick where to start." vi="10 dịch vụ. Chọn nơi bắt đầu." />
              <Bilingual as="p" en="Every scope is clarified before work begins. Send us the service you're interested in and we'll follow up with a tailored plan." vi="Mọi phạm vi đều được làm rõ trước khi bắt đầu. Gửi cho chúng tôi dịch vụ bạn quan tâm, Unitrux sẽ phản hồi với kế hoạch phù hợp." />
            </div>
            <button type="button" onClick={openChat}><Bilingual en="Ask Unitrux to help me choose" vi="Nhờ Unitrux tư vấn chọn dịch vụ" /></button>
          </header>

          <div className="packages-hub__plan-grid">
            {services.map((service) => (
              <ServicePackageCard key={service.to} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="packages-hub__assurance" aria-labelledby="assurance-title">
        <div className="packages-hub__container">
          <div>
            <Bilingual as="h2" id="assurance-title" en="Clear before you commit." vi="Rõ ràng trước khi cam kết." />
            <Bilingual as="p" en="Unitrux scopes the work around your operating reality, not a generic checklist." vi="Unitrux xác định phạm vi theo thực tế vận hành của bạn, không dùng danh sách kiểm tra chung." />
          </div>
          <dl>
            <div><Bilingual as="dt" en="Defined scope" vi="Phạm vi xác định" /><Bilingual as="dd" en="Deliverables, ownership and timelines agreed before kickoff." vi="Hạng mục, trách nhiệm và tiến độ được thống nhất trước khi bắt đầu." /></div>
            <div><Bilingual as="dt" en="Measurable baseline" vi="Mốc đo lường rõ ràng" /><Bilingual as="dd" en="Tracking and success signals established from the start." vi="Thiết lập theo dõi và tín hiệu thành công ngay từ đầu." /></div>
            <div><Bilingual as="dt" en="Flexible expansion" vi="Mở rộng linh hoạt" /><Bilingual as="dd" en="Add specialist capabilities only when they create leverage." vi="Chỉ bổ sung năng lực chuyên môn khi thực sự tạo đòn bẩy." /></div>
          </dl>
        </div>
      </section>

      <section className="packages-hub__cta" aria-labelledby="packages-cta-title">
        <div className="packages-hub__container">
          <div>
            <Bilingual as="h2" id="packages-cta-title" en="Not sure which service fits?" vi="Chưa chắc dịch vụ nào phù hợp?" />
            <Bilingual as="p" en="Tell us where growth is stuck. We will recommend the smallest useful scope." vi="Chia sẻ nơi tăng trưởng đang gặp trở ngại. Chúng tôi sẽ đề xuất phạm vi nhỏ nhất nhưng hữu ích." />
          </div>
          <div>
            <Link to="/contact" className="packages-hub__primary-action"><Bilingual en="Build my scope" vi="Xây dựng phạm vi phù hợp" /> <ArrowIcon /></Link>
            <button type="button" onClick={openChat}><Bilingual en="Chat with Unitrux" vi="Trao đổi với Unitrux" /></button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PackagesShowcase;
