import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import './ServicesShowcase.css';

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

const ServiceCard = ({ service }) => (
  <Link className="services-map__catalog-card" to={service.to}>
    <span className="services-map__catalog-number" aria-hidden="true">{service.number}</span>
    <div className="services-map__catalog-copy">
      <h3 data-vi={service.titleVi} data-en={service.title}>{service.title}</h3>
      <p data-vi={service.descriptionVi} data-en={service.description}>{service.description}</p>
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
            data-vi="Không phải mười dịch vụ rời rạc. Là một hệ thống tăng trưởng được kết nối."
            data-en="Not ten isolated services. One connected growth system."
          >
            Not ten isolated services. One connected growth system.
          </h1>
          <p
            className="services-map__lead"
            data-vi="Unitrux kết nối ứng dụng & giải pháp số, Fanpage, Chatbot AI, nội dung, quảng cáo, automation, SEO/AEO/GEO, video, chụp ảnh và website quanh cùng một hành trình khách hàng. Bạn có thể bắt đầu từ một điểm nghẽn cụ thể rồi mở rộng khi hệ thống sẵn sàng."
            data-en="Unitrux connects app & digital solutions, Fanpage, AI chatbot, content, advertising, automation, SEO/AEO/GEO, video, photography and website design around one customer journey. Start with one clear bottleneck, then expand when the system is ready."
          >
            Unitrux connects app & digital solutions, Fanpage, AI chatbot, content, advertising, automation, SEO/AEO/GEO, video, photography and website design around one customer journey. Start with one clear bottleneck, then expand when the system is ready.
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
            <strong data-vi="Một hành trình, mười năng lực" data-en="One journey, ten capabilities">One journey, ten capabilities</strong>
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

    <section className="services-map__catalog" aria-label="Unitrux services">
      <div className="services-map__shell">
        <div className="services-map__catalog-grid">
          {services.map((service) => <ServiceCard service={service} key={service.to} />)}
        </div>
      </div>
    </section>

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
