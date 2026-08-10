import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ServicesShowcase.css';

const services = [
  {
    number: '01',
    to: '/digital-solutions',
    title: 'App & digital solution design',
    titleVi: 'Thiết kế ứng dụng và giải pháp số',
    description: 'Consulting and development of applications, booking systems, data management and digital solutions tailored to how your business operates.',
    descriptionVi: 'Tư vấn và phát triển ứng dụng, hệ thống đặt lịch, quản lý dữ liệu và giải pháp số phù hợp với hoạt động của doanh nghiệp.',
  },
  {
    number: '02',
    to: '/fanpage-management',
    title: 'Professional Fanpage setup',
    titleVi: 'Xây dựng Fanpage chuyên nghiệp',
    description: 'Rebuilding visuals, information, content and structure so your Fanpage builds recognition, trust and attracts more customers.',
    descriptionVi: 'Hoàn thiện hình ảnh, thông tin, nội dung và cấu trúc Fanpage giúp doanh nghiệp tăng nhận diện, uy tín và thu hút khách hàng.',
  },
  {
    number: '03',
    to: '/chatbox-ai',
    title: 'AI chatbot customer care',
    titleVi: 'Chatbot AI chăm sóc khách hàng',
    description: 'Setting up an AI chatbot that consults 24/7, answers questions, collects information and routes customers to the right staff member.',
    descriptionVi: 'Thiết lập chatbot AI hỗ trợ tư vấn 24/7, trả lời câu hỏi, thu thập thông tin và chuyển khách hàng đến đúng nhân viên.',
  },
  {
    number: '04',
    to: '/content-creation',
    title: 'Multi-channel content creation',
    titleVi: 'Sáng tạo nội dung đa kênh',
    description: 'Building content tailored for Facebook, Website, Zalo, TikTok, Instagram and LinkedIn around one brand direction.',
    descriptionVi: 'Xây dựng nội dung phù hợp cho Facebook, Website, Zalo, TikTok, Instagram và LinkedIn theo định hướng thương hiệu.',
  },
  {
    number: '05',
    to: '/digital-marketing',
    title: 'Multi-platform advertising',
    titleVi: 'Quảng cáo đa nền tảng',
    description: 'Running and optimizing Facebook, Google, TikTok and Zalo ads toward lead generation and revenue growth.',
    descriptionVi: 'Triển khai và tối ưu quảng cáo Facebook, Google, TikTok, Zalo theo mục tiêu tạo khách hàng tiềm năng và tăng doanh thu.',
  },
  {
    number: '06',
    to: '/automation',
    title: 'Marketing automation',
    titleVi: 'Marketing Automation',
    description: 'Automating post scheduling, customer care, data segmentation and connecting your marketing tools.',
    descriptionVi: 'Tự động hóa quy trình đăng bài, chăm sóc khách hàng, phân loại dữ liệu và kết nối các công cụ marketing của doanh nghiệp.',
  },
  {
    number: '07',
    to: '/seo-services',
    title: 'SEO / AEO / GEO for your brand & website',
    titleVi: 'Dịch vụ SEO/AEO/GEO cho thương hiệu và website',
    description: 'Keyword research, content and technical optimization to increase visibility on Google, AI tools and AI-generated answers, reaching the right customers.',
    descriptionVi: 'Nghiên cứu từ khóa, tối ưu nội dung và kỹ thuật website nhằm tăng khả năng xuất hiện trên Google, AI, câu trả lời của AI và tiếp cận đúng khách hàng.',
  },
  {
    number: '08',
    to: '/photography-video',
    title: 'Advertising video production',
    titleVi: 'Sản xuất video quảng cáo',
    description: 'Producing short videos, Reels, TikTok content and advertising video shaped around viewer behavior, brand message and conversion goals.',
    descriptionVi: 'Sản xuất video ngắn, Reels, TikTok và video quảng cáo theo hành vi người xem, thông điệp thương hiệu và mục tiêu chuyển đổi.',
  },
  {
    number: '09',
    to: '/product-photography',
    title: 'Product & brand photography',
    titleVi: 'Quay chụp sản phẩm và thương hiệu',
    description: 'Filming and photographing products, spaces and services for advertising, website, social media and brand communication.',
    descriptionVi: 'Quay phim, chụp ảnh sản phẩm, không gian và dịch vụ phục vụ quảng cáo, website, mạng xã hội và truyền thông thương hiệu.',
  },
  {
    number: '10',
    to: '/web-development',
    title: 'Website design — UI/UX + SEO/AEO/GEO',
    titleVi: 'Thiết kế website chuẩn UI/UX và SEO/AEO/GEO',
    description: 'Designing a website that’s beautiful, easy to use, optimized for Google, and built around a journey that helps customers contact, register or purchase.',
    descriptionVi: 'Thiết kế website đẹp, dễ sử dụng, tối ưu Google và xây dựng hành trình giúp khách hàng liên hệ, đăng ký hoặc đặt mua.',
  },
];

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
