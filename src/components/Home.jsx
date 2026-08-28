import { useEffect, useRef } from 'react';
import HeroShowcase from './HeroShowcase';
import GrowthSystemFlow from './GrowthSystemFlow';
import PortfolioProof from './PortfolioProof';
import TemplateShowcase from './TemplateShowcase';
import PartnerMarquee from './PartnerMarquee';
import NewsSection from './NewsSection';
import ContactForm from './ContactForm';

const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat', {
  detail: { placement: 'contact_stage' },
}));

// Self-contained scroll reveal — the shared useMasterInteractions hook doesn't
// pick up eager-loaded Home reliably, so drive it here and always fail open.
const useHomeReveal = (rootRef) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const items = [...root.querySelectorAll('[data-reveal]')];
    if (!items.length) return undefined;

    const revealAll = () => items.forEach((el) => el.classList.add('master-reveal-ready'));

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      revealAll();
      return undefined;
    }

    items.forEach((el, i) => el.style.setProperty('--reveal-delay', `${Math.min(i * 60, 240)}ms`));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('master-reveal-ready');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));

    const failsafe = window.setTimeout(revealAll, 1600);
    return () => { io.disconnect(); window.clearTimeout(failsafe); };
  }, [rootRef]);
};

const Home = () => {
  const rootRef = useRef(null);
  useHomeReveal(rootRef);
  return (
  <main className="home home--flow" ref={rootRef}>
    <HeroShowcase />
    <GrowthSystemFlow />
    <PortfolioProof />
    <TemplateShowcase />
    <PartnerMarquee />

    <section className="home-insights" aria-labelledby="home-insights-title">
      <div className="home-shell home-insights__intro" data-reveal>
        <p className="home-kicker" data-en="Insights & knowledge" data-vi="Insights & Kiến thức">
          Insights &amp; knowledge
        </p>
        <h2 id="home-insights-title" data-en="A perspective that helps SMEs make better digital decisions." data-vi="Góc nhìn giúp SME ra quyết định số tốt hơn.">
          A perspective that helps SMEs make better digital decisions.
        </h2>
        <p data-en="Practical notes on websites, search, advertising and automation — from our existing library." data-vi="Ghi chú thực tế về website, tìm kiếm, quảng cáo và tự động hóa — từ thư viện hiện có.">
          Practical notes on websites, search, advertising and automation — from our existing library.
        </p>
      </div>
      <NewsSection compact />
    </section>

    <section id="contact" className="home-contact-stage" aria-labelledby="home-contact-title">
      <div className="home-shell home-contact-stage__layout">
        <div className="home-contact-stage__copy" data-reveal>
          <p className="home-kicker" data-en="Ready to grow with Unitrux?" data-vi="Sẵn sàng tăng trưởng cùng Unitrux?">Ready to grow with Unitrux?</p>
          <h2 id="home-contact-title" data-en="Let's find the next step for your growth journey." data-vi="Cùng tìm ra bước tiếp theo cho hành trình phát triển.">
            Let&apos;s find the next step for your growth journey.
          </h2>
          <p data-en="Our team reviews where you are today and recommends a practical roadmap for sustainable growth." data-vi="Đội ngũ Unitrux sẽ phân tích hiện trạng & đề xuất lộ trình phù hợp, giúp bạn tăng trưởng bền vững.">
            Our team reviews where you are today and recommends a practical roadmap for sustainable growth.
          </p>
          <ul className="home-contact-stage__checklist">
            <li><span aria-hidden="true">✓</span><span data-en="1:1 strategy consultation" data-vi="Tư vấn chiến lược 1:1">1:1 strategy consultation</span></li>
            <li><span aria-hidden="true">✓</span><span data-en="A recommendation matched to your situation" data-vi="Đề xuất giải pháp phù hợp">A recommendation matched to your situation</span></li>
            <li><span aria-hidden="true">✓</span><span data-en="A transparent, itemised quote" data-vi="Báo giá minh bạch">A transparent, itemised quote</span></li>
          </ul>
          <button type="button" className="home-chat-action" onClick={openChat}>
            <span data-en="Book a free consultation" data-vi="Đặt lịch tư vấn miễn phí">Book a free consultation</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <ContactForm />
      </div>
    </section>
  </main>
  );
};

export default Home;
