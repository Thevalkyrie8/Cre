const systemNodes = [
  { en: 'SEO & Ads', vi: 'SEO & Ads' },
  { en: 'Website', vi: 'Website' },
  { en: 'Chat & Zalo', vi: 'Chat & Zalo' },
  { en: 'Follow-up', vi: 'Chăm sóc lead' },
  { en: 'Analytics', vi: 'Đo lường' },
];

const HeroShowcase = () => {
  const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat', {
    detail: { placement: 'homepage_hero' },
  }));

  const viewSystem = () => document.getElementById('growth-system')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="unitrux-hero" aria-labelledby="unitrux-hero-title">
      <div className="home-shell unitrux-hero__layout">
        <div className="unitrux-hero__copy">
          <p className="home-kicker" data-en="Digital growth system for Vietnamese SMEs" data-vi="Hệ thống tăng trưởng số cho SME Việt Nam">
            Digital growth system for Vietnamese SMEs
          </p>
          <h1 id="unitrux-hero-title" data-title-reveal>
            <span data-en="Website, chatbot, SEO and Ads." data-vi="Website, chatbot, SEO và Ads.">Website, chatbot, SEO and Ads.</span>
            {' '}
            <span className="unitrux-hero__emphasis" data-en="One system built to grow." data-vi="Một hệ thống để tăng trưởng.">One system built to grow.</span>
          </h1>
          <p className="unitrux-hero__lead" data-en="Unitrux connects the touchpoints that attract, convince and convert customers—then gives your team the signals to improve what happens next." data-vi="Unitrux kết nối các điểm chạm để thu hút, thuyết phục và chuyển đổi khách hàng — đồng thời cung cấp dữ liệu để đội ngũ tối ưu bước tiếp theo.">
            Unitrux connects the touchpoints that attract, convince and convert customers—then gives your team the signals to improve what happens next.
          </p>
          <div className="unitrux-hero__actions">
            <button type="button" className="home-primary-action engine-pill-cta" onClick={openChat} data-magnetic data-ripple>
              <span data-en="Chat about your growth plan" data-vi="Chat về kế hoạch tăng trưởng">Chat about your growth plan</span>
              <span aria-hidden="true">↗</span>
            </button>
            <button type="button" className="home-secondary-action engine-pill-control" onClick={viewSystem}>
              <span data-en="See how the system works" data-vi="Xem hệ thống vận hành">See how the system works</span>
              <span aria-hidden="true">↓</span>
            </button>
          </div>
          <p className="unitrux-hero__assurance" data-en="Strategy, implementation and measurement—with one accountable partner." data-vi="Chiến lược, triển khai và đo lường — cùng một đối tác chịu trách nhiệm.">
            Strategy, implementation and measurement—with one accountable partner.
          </p>
        </div>

        <div className="system-map engine-surface-card" aria-label="Unitrux connected growth system">
          <div className="system-map__header">
            <span data-en="Customer journey" data-vi="Hành trình khách hàng">Customer journey</span>
            <strong data-en="Connected" data-vi="Đã kết nối">Connected</strong>
          </div>
          <ol className="system-map__nodes">
            {systemNodes.map((node, index) => (
              <li key={node.en} className={index === 2 ? 'is-active' : ''}>
                <span className="system-map__index">{String(index + 1).padStart(2, '0')}</span>
                <span data-en={node.en} data-vi={node.vi}>{node.en}</span>
                {index < systemNodes.length - 1 && <i aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <div className="system-map__signal">
            <span aria-hidden="true" />
            <p>
              <strong data-en="Live intent signal" data-vi="Tín hiệu nhu cầu trực tiếp">Live intent signal</strong>
              <small data-en="Ready for the next action" data-vi="Sẵn sàng cho hành động tiếp theo">Ready for the next action</small>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroShowcase;
