import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ServicesShowcase.css';

const serviceStages = [
  {
    number: '01',
    title: 'Attract the right demand',
    titleVi: 'Thu hút đúng nhu cầu',
    description: 'Reach people with a clear message, platform-aware creative, and measurement that follows the journey beyond the click.',
    descriptionVi: 'Tiếp cận khách hàng bằng thông điệp rõ, nội dung đúng nền tảng và hệ thống đo lường theo sát hành trình sau lượt nhấp.',
    services: [
      {
        to: '/digital-marketing',
        title: 'Multi-platform advertising',
        titleVi: 'Quảng cáo đa nền tảng',
        description: 'Google, Facebook, Instagram, TikTok and YouTube campaigns connected to landing pages, chat and conversion tracking.',
        descriptionVi: 'Chiến dịch Google, Facebook, Instagram, TikTok và YouTube được kết nối với landing page, chat và đo lường chuyển đổi.',
        tags: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'Measurement'],
      },
      {
        to: '/photography-video',
        title: 'Advertising film & photography',
        titleVi: 'Video quảng cáo & chụp ảnh',
        description: 'Concept, production and multi-format delivery for social ads, product pages, websites and marketplaces.',
        descriptionVi: 'Concept, quay chụp, hậu kỳ và bàn giao đa định dạng cho quảng cáo, trang sản phẩm, website và sàn thương mại điện tử.',
        tags: ['Reels', 'TikTok', 'Product film', 'Photography'],
      },
    ],
  },
  {
    number: '02',
    title: 'Turn attention into action',
    titleVi: 'Biến sự chú ý thành hành động',
    description: 'Shape the digital experience people use to understand, trust, compare and buy from the business.',
    descriptionVi: 'Xây trải nghiệm số giúp khách hàng hiểu, tin tưởng, so sánh và mua hàng thuận lợi hơn.',
    services: [
      {
        to: '/web-development',
        title: 'Website & web development',
        titleVi: 'Website & phát triển web',
        description: 'Fast, SEO-ready websites and custom web systems built around customer intent and operational requirements.',
        descriptionVi: 'Website tốc độ cao, sẵn sàng cho SEO và hệ thống web tùy chỉnh theo nhu cầu khách hàng lẫn vận hành doanh nghiệp.',
        tags: ['Corporate website', 'Landing page', 'Web app', 'SEO foundation'],
      },
      {
        to: '/ui-ux-design',
        title: 'UI/UX design',
        titleVi: 'Thiết kế UI/UX',
        description: 'Information architecture, interface systems and responsive journeys that make the next step easy to understand.',
        descriptionVi: 'Kiến trúc thông tin, hệ thống giao diện và hành trình responsive giúp người dùng luôn hiểu bước tiếp theo.',
        tags: ['UX research', 'Wireframe', 'UI system', 'Prototype'],
      },
      {
        to: '/ecommerce',
        title: 'E-commerce & marketplace',
        titleVi: 'E-commerce & marketplace',
        description: 'Storefronts, catalog structure, product content and order flows connected into one coherent buying experience.',
        descriptionVi: 'Storefront, cấu trúc danh mục, nội dung sản phẩm và luồng đơn hàng được kết nối thành một trải nghiệm mua thống nhất.',
        tags: ['Storefront', 'Product listing', 'Marketplace', 'Order flow'],
      },
    ],
  },
  {
    number: '03',
    title: 'Respond and operate at scale',
    titleVi: 'Phản hồi và vận hành ở quy mô lớn hơn',
    description: 'Connect conversations, lead handling and recurring workflows so the team can respond faster without losing control.',
    descriptionVi: 'Kết nối hội thoại, xử lý lead và các quy trình lặp lại để đội ngũ phản hồi nhanh hơn mà vẫn kiểm soát được vận hành.',
    services: [
      {
        to: '/chatbox-ai',
        title: 'Multi-channel AI chatbot',
        titleVi: 'Chatbot AI đa kênh',
        description: 'AI-assisted consultation, lead capture and human handover across Facebook Fanpage, Zalo OA and the website.',
        descriptionVi: 'Tư vấn tự động, thu lead và chuyển nhân viên trên Facebook Fanpage, Zalo OA và website.',
        tags: ['Facebook', 'Zalo OA', 'Website chat', 'Lead capture'],
      },
      {
        to: '/automation',
        title: 'Business automation',
        titleVi: 'Tự động hóa doanh nghiệp',
        description: 'Connect CRM, marketing, customer care and internal workflows to reduce repetitive work and delayed follow-up.',
        descriptionVi: 'Kết nối CRM, marketing, chăm sóc khách hàng và quy trình nội bộ để giảm thao tác lặp lại và phản hồi chậm.',
        tags: ['CRM', 'Lead routing', 'Notifications', 'Operations'],
      },
    ],
  },
];

const orderedServiceStages = [
  serviceStages[2],
  serviceStages[0],
  serviceStages[1],
].map((stage, index) => ({
  ...stage,
  number: `0${index + 1}`,
}));

const ServiceReel = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      video.pause();
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0.2 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="services-map__video"
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Unitrux advertising and production work"
      data-aria-label-vi="Video quảng cáo và sản xuất nội dung của Unitrux"
      data-aria-label-en="Unitrux advertising and production work"
    >
      <source src="/Ls-ad.mp4" type="video/mp4" />
    </video>
  );
};

const ServiceLink = ({ service }) => (
  <Link className="services-map__link" to={service.to}>
    <div className="services-map__link-copy">
      <h3 data-vi={service.titleVi} data-en={service.title}>{service.title}</h3>
      <p data-vi={service.descriptionVi} data-en={service.description}>{service.description}</p>
      <ul
        aria-label="Service capabilities"
        data-aria-label-vi="Năng lực dịch vụ"
        data-aria-label-en="Service capabilities"
      >
        {service.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
    </div>
    <span className="services-map__arrow" aria-hidden="true">↗</span>
  </Link>
);

const ServicesShowcase = () => (
  <div className="services-map theme-synced-page">
    <section className="services-map__hero" aria-labelledby="services-map-title">
      <div className="services-map__shell services-map__hero-layout">
        <div className="services-map__hero-copy">
          <p className="services-map__kicker">The connected growth system</p>
          <h1
            id="services-map-title"
            data-vi="Không phải bảy dịch vụ rời rạc. Là một hệ thống tăng trưởng được kết nối."
            data-en="Not seven isolated services. One connected growth system."
          >
            Not seven isolated services. One connected growth system.
          </h1>
          <p
            className="services-map__lead"
            data-vi="Unitrux kết nối quảng cáo, nội dung, website, thương mại điện tử, chatbot và automation quanh cùng một hành trình khách hàng. Bạn có thể bắt đầu từ một điểm nghẽn cụ thể rồi mở rộng khi hệ thống sẵn sàng."
            data-en="Unitrux connects advertising, content, websites, commerce, chat and automation around one customer journey. Start with one clear bottleneck, then expand when the system is ready."
          >
            Unitrux connects advertising, content, websites, commerce, chat and automation around one customer journey. Start with one clear bottleneck, then expand when the system is ready.
          </p>
          <div className="services-map__actions">
            <a className="services-map__button services-map__button--primary" href="https://zalo.me/3299309778518905129">
              <span data-vi="Chia sẻ bài toán" data-en="Share your challenge">Share your challenge</span>
              <span aria-hidden="true">↗</span>
            </a>
            <Link className="services-map__button services-map__button--secondary" to="/packages">
              <span data-vi="Xem gói dịch vụ" data-en="View service plans">View service plans</span>
            </Link>
          </div>
        </div>

        <figure className="services-map__media">
          <ServiceReel />
          <figcaption>
            <strong data-vi="Một hành trình, nhiều năng lực" data-en="One journey, multiple capabilities">One journey, multiple capabilities</strong>
            <span>Attention → Experience → Conversation → Operations</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section className="services-map__flow" aria-label="Connected service journey">
      <div className="services-map__shell">
        <span data-vi="Thu hút nhu cầu" data-en="Attract demand">Attract demand</span>
        <b aria-hidden="true">→</b>
        <span data-vi="Tạo trải nghiệm" data-en="Shape the experience">Shape the experience</span>
        <b aria-hidden="true">→</b>
        <span data-vi="Bắt đầu hội thoại" data-en="Start conversations">Start conversations</span>
        <b aria-hidden="true">→</b>
        <span data-vi="Kết nối vận hành" data-en="Connect operations">Connect operations</span>
      </div>
    </section>

    <div className="services-map__stages">
      {orderedServiceStages.map((stage) => (
        <section className="services-map__stage" key={stage.number} aria-labelledby={`service-stage-${stage.number}`}>
          <div className="services-map__shell services-map__stage-layout">
            <header className="services-map__stage-heading">
              <span className="services-map__stage-number">{stage.number}</span>
              <h2 id={`service-stage-${stage.number}`} data-vi={stage.titleVi} data-en={stage.title}>{stage.title}</h2>
              <p data-vi={stage.descriptionVi} data-en={stage.description}>{stage.description}</p>
            </header>
            <div className="services-map__links">
              {stage.services.map((service) => <ServiceLink service={service} key={service.to} />)}
            </div>
          </div>
        </section>
      ))}
    </div>

    <section className="services-map__decision" aria-labelledby="services-decision-title">
      <div className="services-map__shell services-map__decision-layout">
        <div>
          <h2
            id="services-decision-title"
            data-vi="Không chắc nên bắt đầu từ dịch vụ nào?"
            data-en="Not sure which service should come first?"
          >
            Not sure which service should come first?
          </h2>
          <p
            data-vi="Bắt đầu bằng điểm nghẽn đang ảnh hưởng trực tiếp đến khách hàng hoặc đội ngũ. Unitrux sẽ giúp xác định bước đầu tiên đủ nhỏ để triển khai và đủ quan trọng để tạo thay đổi."
            data-en="Start with the bottleneck affecting customers or the team most directly. Unitrux will help define a first step that is small enough to deliver and important enough to matter."
          >
            Start with the bottleneck affecting customers or the team most directly. Unitrux will help define a first step that is small enough to deliver and important enough to matter.
          </p>
        </div>
        <div className="services-map__decision-actions">
          <Link className="services-map__button services-map__button--primary" to="/contact">
            <span data-vi="Nhận đề xuất phù hợp" data-en="Request a recommendation">Request a recommendation</span>
          </Link>
          <a className="services-map__text-link" href="https://zalo.me/3299309778518905129">
            <span data-vi="Trao đổi nhanh qua Zalo" data-en="Talk on Zalo">Talk on Zalo</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default ServicesShowcase;
