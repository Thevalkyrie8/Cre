import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { productionBehindTheScenes, productionHeroVideo, productionWorks } from '../data/productionPortfolio';
import './PhotographyVideoService.css';

const CHANNELS = ['TikTok & Reels', 'Facebook Ads', 'YouTube', 'Website', 'E-commerce'];

const AutoVideo = ({ src, poster, className, labelVi, labelEn, eager = false }) => {
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
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? 'auto' : 'metadata'}
      aria-label={labelEn}
      data-aria-label-vi={labelVi}
      data-aria-label-en={labelEn}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

const PhotographyVideoService = () => (
  <div className="production-page theme-synced-page">
    <section className="production-hero" aria-labelledby="production-title">
      <div className="production-shell production-hero__grid">
        <div className="production-hero__copy">
          <Link className="production-back" to="/services">
            <span aria-hidden="true">←</span>
            <span data-vi="Tất cả giải pháp" data-en="All solutions">All solutions</span>
          </Link>
          <p className="production-kicker">Production × Performance</p>
          <h1
            id="production-title"
            data-vi="Video quảng cáo khiến khách dừng lại—và biết phải làm gì tiếp theo."
            data-en="Advertising films that stop the scroll—and make the next action clear."
          >
            Advertising films that stop the scroll—and make the next action clear.
          </h1>
          <p
            className="production-hero__lead"
            data-vi="Unitrux xây ý tưởng, quay, dựng và bàn giao video theo đúng hành vi của từng nền tảng. Một buổi sản xuất có thể tạo ra nhiều phiên bản cho Facebook, Instagram, TikTok, YouTube, website và sàn thương mại điện tử."
            data-en="Unitrux develops the concept, shoots, edits and delivers each film for the behavior of its platform. One production can become multiple versions for Facebook, Instagram, TikTok, YouTube, websites and marketplaces."
          >
            Unitrux develops the concept, shoots, edits and delivers each film for the behavior of its platform. One production can become multiple versions for Facebook, Instagram, TikTok, YouTube, websites and marketplaces.
          </p>
          <div className="production-actions">
            <a className="production-button production-button--primary" href="https://zalo.me/3299309778518905129">
              <span data-vi="Trao đổi concept" data-en="Discuss a concept">Discuss a concept</span>
              <span aria-hidden="true">↗</span>
            </a>
            <Link className="production-button production-button--secondary" to="/contact">
              <span data-vi="Nhận đề xuất sản xuất" data-en="Request a production plan">Request a production plan</span>
            </Link>
          </div>
          <p
            className="production-hero__note"
            data-vi="Gửi sản phẩm, kênh dự kiến và mục tiêu chiến dịch. Unitrux sẽ đề xuất định dạng và phạm vi phù hợp."
            data-en="Share your product, intended channels and campaign goal. Unitrux will recommend a suitable format and scope."
          >
            Share your product, intended channels and campaign goal. Unitrux will recommend a suitable format and scope.
          </p>
        </div>

        <figure className="production-hero__media">
          <AutoVideo
            src={productionHeroVideo.src}
            poster={productionHeroVideo.thumbnail}
            className="production-hero__video"
            labelVi={productionHeroVideo.titleVi}
            labelEn={productionHeroVideo.title}
            eager
          />
          <figcaption>
            <span data-vi={productionHeroVideo.labelVi} data-en={productionHeroVideo.labelEn}>{productionHeroVideo.labelEn}</span>
            <span data-vi="Sản xuất bởi Unitrux" data-en="Produced by Unitrux">Produced by Unitrux</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section className="production-channel-strip" aria-label="Delivery channels">
      <div className="production-shell">
        {CHANNELS.map((channel) => <span key={channel}>{channel}</span>)}
      </div>
    </section>

    <section className="production-showcase" aria-labelledby="production-showcase-title">
      <div className="production-shell">
        <div className="production-heading production-heading--split">
          <h2
            id="production-showcase-title"
            data-vi="Đừng hình dung năng lực sản xuất qua lời mô tả. Hãy xem chuyển động."
            data-en="Do not judge production through a description. Watch the work move."
          >
            Do not judge production through a description. Watch the work move.
          </h2>
          <p
            data-vi="Mỗi video được xây từ một vai trò cụ thể: thu hút sự chú ý, giải thích sản phẩm, tạo niềm tin hoặc dẫn khách đến bước chuyển đổi."
            data-en="Each film is built around a specific job: earn attention, explain the product, build trust or lead viewers toward conversion."
          >
            Each film is built around a specific job: earn attention, explain the product, build trust or lead viewers toward conversion.
          </p>
        </div>

        <div className="production-work-grid">
          {productionWorks.map((work) => (
            <figure className="production-work" style={{ '--production-aspect': work.ratio }} key={work.src}>
              <AutoVideo
                src={work.src}
                poster={work.thumbnail}
                className="production-work__video"
                labelVi={work.labelVi}
                labelEn={work.labelEn}
              />
              <figcaption data-vi={work.labelVi} data-en={work.labelEn}>{work.labelEn}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    <section className="production-bts" aria-labelledby="production-bts-title">
      <div className="production-shell">
        <div className="production-heading production-heading--split">
          <h2
            id="production-bts-title"
            data-vi="Không chỉ có video: chụp ảnh sản phẩm, thương hiệu và hậu trường sản xuất."
            data-en="Beyond video: product photography, brand photography and the production process."
          >
            Beyond video: product photography, brand photography and the production process.
          </h2>
          <p
            data-vi="Ảnh thật từ studio, buổi quay tại địa điểm khách hàng và sự kiện — không phải ảnh minh họa."
            data-en="Real photos from the studio, on-location shoots and event coverage — not stock imagery."
          >
            Real photos from the studio, on-location shoots and event coverage — not stock imagery.
          </p>
        </div>

        <div className="production-bts-grid">
          {productionBehindTheScenes.map((photo) => (
            <figure className="production-bts-item" key={photo.id}>
              <img src={photo.src} alt={photo.labelEn} loading="lazy" />
              <span className="production-bts-item__tag" data-vi={photo.categoryVi} data-en={photo.categoryEn}>{photo.categoryEn}</span>
              <figcaption data-vi={photo.labelVi} data-en={photo.labelEn}>{photo.labelEn}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    <section className="production-services" aria-labelledby="production-services-title">
      <div className="production-shell production-services__layout">
        <div className="production-heading production-heading--sticky">
          <h2
            id="production-services-title"
            data-vi="Một đội ngũ sản xuất. Nhiều điểm chạm bán hàng."
            data-en="One production team. Multiple selling moments."
          >
            One production team. Multiple selling moments.
          </h2>
          <p
            data-vi="Không bắt đầu bằng máy quay. Chúng tôi bắt đầu từ người xem, bối cảnh hiển thị và hành động mà nội dung cần tạo ra."
            data-en="We do not start with the camera. We start with the viewer, the viewing context and the action the content needs to create."
          >
            We do not start with the camera. We start with the viewer, the viewing context and the action the content needs to create.
          </p>
        </div>

        <div className="production-service-list">
          <article>
            <span>01</span>
            <div>
              <h3 data-vi="Video quảng cáo ngắn" data-en="Short-form advertising">Short-form advertising</h3>
              <p
                data-vi="Hook, kịch bản, quay và dựng cho Reels, TikTok, Stories, Spark Ads và các chiến dịch chuyển đổi."
                data-en="Hooks, scripts, production and editing for Reels, TikTok, Stories, Spark Ads and conversion campaigns."
              >
                Hooks, scripts, production and editing for Reels, TikTok, Stories, Spark Ads and conversion campaigns.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3 data-vi="Video sản phẩm & thương mại điện tử" data-en="Product & e-commerce film">Product & e-commerce film</h3>
              <p
                data-vi="Trình diễn công dụng, chất liệu, kích thước và trải nghiệm sử dụng cho website, landing page và sàn."
                data-en="Demonstrate features, materials, dimensions and real use for websites, landing pages and marketplaces."
              >
                Demonstrate features, materials, dimensions and real use for websites, landing pages and marketplaces.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3 data-vi="Chụp ảnh sản phẩm & chiến dịch" data-en="Product & campaign photography">Product & campaign photography</h3>
              <p
                data-vi="Ảnh nền sạch, ảnh bối cảnh, key visual và bộ ảnh đa tỷ lệ để thương hiệu xuất hiện nhất quán trên mọi kênh."
                data-en="Clean product imagery, lifestyle scenes, key visuals and multi-ratio sets for consistent presence across channels."
              >
                Clean product imagery, lifestyle scenes, key visuals and multi-ratio sets for consistent presence across channels.
              </p>
            </div>
          </article>
          <article>
            <span>04</span>
            <div>
              <h3 data-vi="Video thương hiệu & doanh nghiệp" data-en="Brand & corporate film">Brand & corporate film</h3>
              <p
                data-vi="Câu chuyện thương hiệu, phỏng vấn, không gian làm việc và quy trình vận hành được kể rõ, tự nhiên và có chủ đích."
                data-en="Brand stories, interviews, workspaces and operations told with clarity, natural direction and intent."
              >
                Brand stories, interviews, workspaces and operations told with clarity, natural direction and intent.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className="production-delivery" aria-labelledby="production-delivery-title">
      <div className="production-shell production-delivery__layout">
        <div>
          <p className="production-kicker">One shoot → many formats</p>
          <h2
            id="production-delivery-title"
            data-vi="Quay một lần. Bàn giao đúng tỷ lệ cho từng kênh."
            data-en="Shoot once. Deliver the right ratio for every channel."
          >
            Shoot once. Deliver the right ratio for every channel.
          </h2>
        </div>
        <div className="production-ratios" aria-label="Video aspect ratios">
          <span className="production-ratio production-ratio--vertical"><strong>9:16</strong><small>Reels · TikTok</small></span>
          <span className="production-ratio production-ratio--portrait"><strong>4:5</strong><small>Social feed</small></span>
          <span className="production-ratio production-ratio--square"><strong>1:1</strong><small>Ads · E-commerce</small></span>
          <span className="production-ratio production-ratio--wide"><strong>16:9</strong><small>YouTube · Website</small></span>
        </div>
      </div>
    </section>

    <section className="production-process" aria-labelledby="production-process-title">
      <div className="production-shell">
        <div className="production-heading production-heading--split">
          <h2
            id="production-process-title"
            data-vi="Từ brief đến bộ nội dung sẵn sàng chạy."
            data-en="From brief to campaign-ready content."
          >
            From brief to campaign-ready content.
          </h2>
          <p
            data-vi="Bốn quyết định rõ ràng giúp buổi quay tập trung và giảm sửa đổi không cần thiết."
            data-en="Four clear decisions keep the shoot focused and reduce unnecessary revision."
          >
            Four clear decisions keep the shoot focused and reduce unnecessary revision.
          </p>
        </div>
        <ol className="production-process__steps">
          <li>
            <span>01</span>
            <h3 data-vi="Chốt mục tiêu & kênh" data-en="Define the goal & channel">Define the goal & channel</h3>
            <p data-vi="Sản phẩm, người xem, thông điệp và hành động cần tạo ra." data-en="Product, audience, message and the action to create.">Product, audience, message and the action to create.</p>
          </li>
          <li>
            <span>02</span>
            <h3 data-vi="Concept & shot list" data-en="Concept & shot list">Concept & shot list</h3>
            <p data-vi="Hướng hình ảnh, kịch bản, bối cảnh, đạo cụ và danh sách cảnh quay." data-en="Visual direction, script, locations, props and a focused shot list.">Visual direction, script, locations, props and a focused shot list.</p>
          </li>
          <li>
            <span>03</span>
            <h3 data-vi="Sản xuất" data-en="Production">Production</h3>
            <p data-vi="Quay tại studio hoặc địa điểm của doanh nghiệp với phạm vi đã thống nhất." data-en="Shoot in studio or on location within the agreed scope.">Shoot in studio or on location within the agreed scope.</p>
          </li>
          <li>
            <span>04</span>
            <h3 data-vi="Hậu kỳ & bàn giao" data-en="Post-production & delivery">Post-production & delivery</h3>
            <p data-vi="Dựng, chỉnh màu, âm thanh, phụ đề và xuất phiên bản cho từng nền tảng." data-en="Edit, grade, sound, subtitle and export versions for each platform.">Edit, grade, sound, subtitle and export versions for each platform.</p>
          </li>
        </ol>
      </div>
    </section>

    <section className="production-faq" aria-labelledby="production-faq-title">
      <div className="production-shell production-faq__layout">
        <div>
          <h2 id="production-faq-title" data-vi="Làm rõ trước ngày quay." data-en="Clear before shoot day.">Clear before shoot day.</h2>
          <p
            data-vi="Phạm vi sản xuất được xác định từ đầu để đội ngũ của bạn biết điều gì sẽ được quay, sửa và bàn giao."
            data-en="Production scope is defined upfront so your team knows what will be shot, revised and delivered."
          >
            Production scope is defined upfront so your team knows what will be shot, revised and delivered.
          </p>
        </div>
        <div className="production-faq__list">
          <details>
            <summary data-vi="Chưa có ý tưởng thì có bắt đầu được không?" data-en="Can we start without a concept?">Can we start without a concept?</summary>
            <p data-vi="Có. Bạn chỉ cần chia sẻ sản phẩm, mục tiêu, kênh và khoảng ngân sách. Unitrux sẽ đề xuất hướng nội dung phù hợp để cùng duyệt." data-en="Yes. Share the product, goal, channels and budget range. Unitrux will propose a content direction for review.">Yes. Share the product, goal, channels and budget range. Unitrux will propose a content direction for review.</p>
          </details>
          <details>
            <summary data-vi="Có thể quay tại cửa hàng hoặc nhà máy không?" data-en="Can you shoot at our store or factory?">Can you shoot at our store or factory?</summary>
            <p data-vi="Có. Sau khi khảo sát điều kiện ánh sáng, âm thanh và vận hành, chúng tôi sẽ đề xuất thiết bị và lịch quay phù hợp." data-en="Yes. After reviewing lighting, sound and operations, we will recommend the right setup and schedule.">Yes. After reviewing lighting, sound and operations, we will recommend the right setup and schedule.</p>
          </details>
          <details>
            <summary data-vi="Một video có dùng cho nhiều nền tảng được không?" data-en="Can one film work across multiple platforms?">Can one film work across multiple platforms?</summary>
            <p data-vi="Có thể dùng chung nguồn quay, nhưng mỗi nền tảng cần tỷ lệ, nhịp dựng, thời lượng và vùng chữ riêng. Các phiên bản này sẽ được xác định trong phạm vi bàn giao." data-en="The same footage can be used, but each platform needs its own ratio, pace, duration and safe text area. These versions are defined in the delivery scope.">The same footage can be used, but each platform needs its own ratio, pace, duration and safe text area. These versions are defined in the delivery scope.</p>
          </details>
          <details>
            <summary data-vi="Chi phí được tính như thế nào?" data-en="How is production priced?">How is production priced?</summary>
            <p data-vi="Chi phí phụ thuộc vào số ngày quay, bối cảnh, thiết bị, nhân sự, người mẫu, đạo cụ, số phiên bản và mức độ hậu kỳ. Báo giá sẽ tách rõ từng phạm vi." data-en="Pricing depends on shoot days, locations, equipment, crew, talent, props, version count and post-production. The quotation itemizes the scope.">Pricing depends on shoot days, locations, equipment, crew, talent, props, version count and post-production. The quotation itemizes the scope.</p>
          </details>
        </div>
      </div>
    </section>

    <section className="production-final" aria-labelledby="production-final-title">
      <div className="production-shell production-final__panel">
        <div>
          <h2
            id="production-final-title"
            data-vi="Bạn có sản phẩm. Unitrux xây câu chuyện để sản phẩm được nhìn thấy đúng cách."
            data-en="You have the product. Unitrux builds the story that helps people see it clearly."
          >
            You have the product. Unitrux builds the story that helps people see it clearly.
          </h2>
          <p
            data-vi="Bắt đầu bằng một brief ngắn: sản phẩm, khách hàng, nền tảng và thời điểm dự kiến."
            data-en="Start with a short brief: product, audience, platforms and expected timing."
          >
            Start with a short brief: product, audience, platforms and expected timing.
          </p>
        </div>
        <div className="production-actions">
          <a className="production-button production-button--primary" href="https://zalo.me/3299309778518905129">
            <span data-vi="Gửi brief qua Zalo" data-en="Send a brief on Zalo">Send a brief on Zalo</span>
            <span aria-hidden="true">↗</span>
          </a>
          <Link className="production-button production-button--secondary" to="/contact">
            <span data-vi="Đặt lịch trao đổi" data-en="Book a conversation">Book a conversation</span>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default PhotographyVideoService;
