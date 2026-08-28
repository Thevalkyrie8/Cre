import { Link } from 'react-router-dom';

const ecosystem = [
  {
    key: 'tech', vi: 'Công nghệ', en: 'Technology',
    subVi: 'Website, tích hợp & hệ thống', subEn: 'Websites, integration & systems',
    to: '/web-development',
    icon: <path d="M3 5.5h14v9H3zM3 17h14M8 14.5v2.5M12 14.5v2.5" />,
  },
  {
    key: 'content', vi: 'Nội dung', en: 'Content',
    subVi: 'Nội dung, hình ảnh & SEO', subEn: 'Content, imagery & SEO',
    to: '/digital-marketing',
    icon: <path d="M5 3h7l4 4v10H5zM12 3v4h4M8 11h5M8 14h5" />,
  },
  {
    key: 'comms', vi: 'Truyền thông', en: 'Communications',
    subVi: 'Quảng cáo & mạng xã hội', subEn: 'Advertising & social media',
    to: '/digital-marketing',
    icon: <path d="M4 8v4h3l6 4V4L7 8zM16 8a3 3 0 0 1 0 4" />,
  },
  {
    key: 'automation', vi: 'Tự động hóa', en: 'Automation',
    subVi: 'Quy trình & Marketing Automation', subEn: 'Workflows & marketing automation',
    to: '/automation',
    icon: <path d="M10 3v3M10 14v3M3 10h3M14 10h3M5.6 5.6l2.1 2.1M12.3 12.3l2.1 2.1M14.4 5.6l-2.1 2.1M7.7 12.3l-2.1 2.1M10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />,
  },
  {
    key: 'analytics', vi: 'Phân tích & tối ưu', en: 'Analytics & optimisation',
    subVi: 'Dữ liệu & tăng trưởng', subEn: 'Data & growth',
    to: '/services',
    icon: <path d="M3 17h14M6 13v2M10 8v7M14 4v11" />,
  },
];

const chips = [
  { vi: 'Chiến lược rõ ràng', en: 'Clear strategy' },
  { vi: 'Triển khai nhanh', en: 'Fast execution' },
  { vi: 'Đo lường minh bạch', en: 'Transparent measurement' },
  { vi: 'Tăng trưởng bền vững', en: 'Sustainable growth' },
];

const HeroShowcase = () => {
  const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat', {
    detail: { placement: 'homepage_hero' },
  }));

  const viewProjects = () => document.getElementById('portfolio-proof')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="unitrux-hero" aria-labelledby="unitrux-hero-title">
      <div className="home-shell unitrux-hero__layout">
        <div className="unitrux-hero__copy" data-reveal>
          <p className="home-kicker" data-en="Unitrux — Digital Growth Engine" data-vi="Unitrux — Digital Growth Engine">
            Unitrux — Digital Growth Engine
          </p>
          <h1 id="unitrux-hero-title" data-title-reveal>
            <span data-en="Connecting technology, content and communications into " data-vi="Kết nối công nghệ, nội dung & truyền thông thành ">Connecting technology, content and communications into </span>
            <span className="unitrux-hero__emphasis" data-en="one unified growth system" data-vi="một hệ thống tăng trưởng duy nhất">one unified growth system</span>
            <span data-en=" for your business." data-vi=" cho doanh nghiệp."> for your business.</span>
          </h1>
          <p className="unitrux-hero__lead" data-en="We help Vietnamese SMEs build websites, marketing systems and automation — from digital foundations to one connected growth ecosystem." data-vi="Chúng tôi giúp SME xây dựng website, hệ thống marketing tự động và nền tảng số — vươn lên như một hệ sinh thái tăng trưởng thống nhất. Từ đó, thu hút khách hàng, tối ưu chuyển đổi và tăng trưởng bền vững.">
            We help Vietnamese SMEs build websites, marketing systems and automation — from digital foundations to one connected growth ecosystem.
          </p>
          <div className="unitrux-hero__actions">
            <Link to="/contact" className="home-primary-action engine-pill-cta" data-magnetic data-ripple>
              <span data-en="Start a project with Unitrux" data-vi="Bắt đầu dự án cùng Unitrux">Start a project with Unitrux</span>
              <span aria-hidden="true">→</span>
            </Link>
            <button type="button" className="home-secondary-action engine-pill-control" onClick={viewProjects}>
              <span data-en="See featured projects" data-vi="Xem các dự án tiêu biểu">See featured projects</span>
              <span aria-hidden="true">↓</span>
            </button>
          </div>
          <ul className="unitrux-hero__chips" aria-label="What working with Unitrux looks like">
            {chips.map((chip) => (
              <li key={chip.en}>
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span data-en={chip.en} data-vi={chip.vi}>{chip.en}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="unitrux-hero__visual" data-reveal>
          <article className="hero-ecosystem engine-surface-card" aria-label="Unitrux ecosystem">
            <header className="hero-ecosystem__header">
              <span className="hero-ecosystem__dot" aria-hidden="true" />
              <span data-en="Unitrux ecosystem" data-vi="Hệ sinh thái Unitrux">Unitrux ecosystem</span>
            </header>
            <ul className="hero-ecosystem__list">
              {ecosystem.map((node) => (
                <li key={node.key}>
                  <Link to={node.to}>
                    <span className="hero-ecosystem__icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{node.icon}</svg>
                    </span>
                    <span className="hero-ecosystem__text">
                      <strong data-en={node.en} data-vi={node.vi}>{node.en}</strong>
                      <small data-en={node.subEn} data-vi={node.subVi}>{node.subEn}</small>
                    </span>
                    <svg className="hero-ecosystem__chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <Link to="/photography-video" className="hero-media-card" aria-label="Video production service">
            <span className="hero-media-card__eyebrow" data-en="Ad & product video" data-vi="Quay dựng video quảng cáo">Ad &amp; product video</span>
            <strong data-en="In-house production for ads, product and brand" data-vi="Sản xuất video quảng cáo, sản phẩm & thương hiệu">In-house production for ads, product and brand</strong>
            <span className="hero-media-card__link">
              <span data-en="See the work" data-vi="Xem portfolio">See the work</span>
              <span aria-hidden="true">→</span>
            </span>
          </Link>

          <Link to="/media-pricing" className="hero-media-card hero-media-card--pricing" aria-label="Media pricing">
            <span className="hero-media-card__eyebrow" data-en="Photo & video pricing" data-vi="Bảng giá quay chụp">Photo &amp; video pricing</span>
            <strong data-en="17 packages, itemised — plan a media budget" data-vi="17 gói, tách hạng mục — dự trù ngân sách quay chụp">17 packages, itemised — plan a media budget</strong>
            <span className="hero-media-card__link">
              <span data-en="View pricing" data-vi="Xem bảng giá">View pricing</span>
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroShowcase;
