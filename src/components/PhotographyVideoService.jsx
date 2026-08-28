import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { productionBehindTheScenes, productionHeroVideo, productionWorks } from '../data/productionPortfolio';
import { getServiceTrust } from '../data/serviceTrust';
import { getServiceExpert } from '../data/serviceExperts';
import {
  DirectAnswer,
  TrustSignals,
  ServiceTypes,
  WhoItsFor,
  Deliverables,
  ServiceProcess,
  CostFactors,
  ExpertAuthor,
} from './service/ServiceSections';
import PricingPreview from './service/PricingPreview';
import CaseStudySection from './service/CaseStudySection';
import RelatedContent from './service/RelatedContent';
import './PhotographyVideoService.css';

const PATH = '/photography-video';
const CHANNELS = ['TikTok & Reels', 'Facebook Ads', 'YouTube', 'Website', 'E-commerce'];

const SERVICE_TYPES = [
  {
    titleVi: 'Quay video quảng cáo sản phẩm',
    titleEn: 'Product advertising video',
    bodyVi: 'Trình diễn công dụng, chất liệu, kích thước và cách dùng của một sản phẩm cụ thể cho quảng cáo, website và sàn thương mại điện tử.',
    bodyEn: 'Demonstrate one product’s features, materials, size and use for ads, the website and marketplaces.',
    to: '/news/quay-video-san-pham-can-chuan-bi-gi',
    linkVi: 'Quay video sản phẩm cần chuẩn bị gì?',
    linkEn: 'What to prepare for a product video shoot',
  },
  {
    titleVi: 'Video giới thiệu doanh nghiệp',
    titleEn: 'Company introduction film',
    bodyVi: 'Câu chuyện, hoạt động và không gian của doanh nghiệp được kể rõ ràng và có chủ đích, dùng cho website và hồ sơ năng lực.',
    bodyEn: 'A company’s story, operations and space told clearly and with intent, for the website and company profile.',
  },
  {
    titleVi: 'Video TikTok / Reels / Shorts',
    titleEn: 'TikTok / Reels / Shorts',
    bodyVi: 'Hook, kịch bản và dựng theo hành vi người xem của định dạng dọc, cho chiến dịch chuyển đổi và nội dung đều đặn.',
    bodyEn: 'Hook, script and edit built for vertical viewing behaviour, for conversion campaigns and a steady content cadence.',
  },
  {
    titleVi: 'Video cửa hàng, showroom, spa, salon',
    titleEn: 'Store, showroom, spa & salon video',
    bodyVi: 'Quay tại địa điểm kinh doanh để thể hiện không gian, dịch vụ và trải nghiệm thực tế của khách hàng.',
    bodyEn: 'Filmed on site to show the space, the service and the real customer experience.',
  },
  {
    titleVi: 'Video phỏng vấn',
    titleEn: 'Interview video',
    bodyVi: 'Phỏng vấn nhân sự, chuyên gia hoặc khách hàng — dựng gọn, rõ thông điệp, có phụ đề.',
    bodyEn: 'Interviews with staff, experts or customers — tightly edited, on-message, subtitled.',
  },
  {
    titleVi: 'Video hướng dẫn và trải nghiệm sản phẩm',
    titleEn: 'How-to & product experience video',
    bodyVi: 'Hướng dẫn sử dụng, unbox hoặc trải nghiệm sản phẩm theo từng bước, dùng cho website và chăm sóc khách hàng.',
    bodyEn: 'Step-by-step usage, unboxing or product experience, for the website and customer support.',
  },
];

const WHO_ITS_FOR = [
  { vi: 'Doanh nghiệp ra mắt sản phẩm mới cần video cho quảng cáo và trang bán hàng', en: 'Businesses launching a product that need video for ads and sales pages' },
  { vi: 'Thương hiệu cần nội dung video đều đặn cho TikTok, Reels và Facebook', en: 'Brands needing steady video content for TikTok, Reels and Facebook' },
  { vi: 'Cửa hàng, spa, salon, showroom cần thể hiện không gian và dịch vụ', en: 'Stores, spas, salons and showrooms that need to show their space and service' },
  { vi: 'Doanh nghiệp cần video giới thiệu cho website, hồ sơ năng lực hoặc gọi vốn', en: 'Companies needing an introduction film for the website, a profile or fundraising' },
  { vi: 'Nhà bán hàng trên sàn thương mại điện tử cần video mô tả sản phẩm', en: 'Marketplace sellers needing product demonstration video' },
];

const DELIVERABLES = [
  { vi: 'File video hoàn chỉnh theo từng nền tảng (đã chỉnh màu, âm thanh, phụ đề)', en: 'Finished video files per platform (graded, sound-mixed, subtitled)' },
  { vi: 'Các phiên bản tỷ lệ khung hình: 9:16, 4:5, 1:1, 16:9 trong phạm vi đã thống nhất', en: 'Aspect-ratio versions — 9:16, 4:5, 1:1, 16:9 — within the agreed scope' },
  { vi: 'Bản cutdown ngắn để chạy quảng cáo (nếu trong gói)', en: 'A short cutdown for advertising (where included)' },
  { vi: 'Phụ đề tiếng Việt; phụ đề tiếng Anh khi có yêu cầu', en: 'Vietnamese subtitles; English subtitles on request' },
  { vi: 'Thumbnail / ảnh trích từ video khi cần', en: 'Thumbnails / stills pulled from the video when needed' },
];

const PROCESS = [
  { titleVi: 'Brief', titleEn: 'Brief', descVi: 'Doanh nghiệp chia sẻ sản phẩm, khách hàng mục tiêu, thông điệp, kênh đăng và khoảng ngân sách.', descEn: 'You share the product, target customer, message, channels and budget range.' },
  { titleVi: 'Research', titleEn: 'Research', descVi: 'Unitrux tìm hiểu sản phẩm, đối thủ và cách nội dung tương tự đang hoạt động trên từng nền tảng.', descEn: 'Unitrux studies the product, competitors and how similar content performs per platform.' },
  { titleVi: 'Concept', titleEn: 'Concept', descVi: 'Đề xuất hướng nội dung, phong cách hình ảnh và thông điệp chính để hai bên cùng duyệt.', descEn: 'A proposed content direction, visual style and core message for both sides to approve.' },
  { titleVi: 'Script / shot list', titleEn: 'Script / shot list', descVi: 'Kịch bản chi tiết, danh sách cảnh quay, bối cảnh và đạo cụ cần chuẩn bị.', descEn: 'A detailed script, shot list, and the locations and props to prepare.' },
  { titleVi: 'Pre-production', titleEn: 'Pre-production', descVi: 'Chốt lịch, nhân sự, thiết bị, người mẫu (nếu có) và khảo sát địa điểm quay.', descEn: 'Lock the schedule, crew, equipment, talent (if any) and survey the location.' },
  { titleVi: 'Quay', titleEn: 'Filming', descVi: 'Quay tại studio hoặc tại địa điểm của doanh nghiệp theo đúng shot list.', descEn: 'Shoot in studio or on location to the agreed shot list.' },
  { titleVi: 'Hậu kỳ', titleEn: 'Post-production', descVi: 'Dựng, chỉnh màu, âm thanh, phụ đề, motion graphics và các vòng chỉnh sửa trong phạm vi.', descEn: 'Edit, colour grade, sound, subtitle, motion graphics and the revision rounds in scope.' },
  { titleVi: 'Bàn giao đa nền tảng', titleEn: 'Multi-platform delivery', descVi: 'Xuất các phiên bản theo tỷ lệ, thời lượng và vùng chữ an toàn của từng nền tảng.', descEn: 'Export versions matched to each platform’s ratio, duration and safe text area.' },
];

const COST_FACTORS = [
  { vi: 'Số ngày quay và số bối cảnh', en: 'Number of shoot days and locations' },
  { vi: 'Thiết bị, nhân sự ekip và người mẫu / talent', en: 'Equipment, crew and models / talent' },
  { vi: 'Studio, đạo cụ và thi công bối cảnh', en: 'Studio, props and set construction' },
  { vi: 'Số video và số phiên bản tỷ lệ khung hình cần xuất', en: 'Number of videos and aspect-ratio versions to export' },
  { vi: 'Thời lượng và độ phức tạp hậu kỳ (motion graphics, VFX, voice-over)', en: 'Duration and post-production complexity (motion graphics, VFX, voice-over)' },
  { vi: 'Số vòng chỉnh sửa và deadline (triển khai gấp có phụ phí)', en: 'Revision rounds and deadline (rush turnaround carries a surcharge)' },
];

const PRICING_LINK = {
  to: '/media-pricing',
  anchorVi: 'Xem bảng giá quay video và chụp ảnh tại TP.HCM',
  anchorEn: 'See video and photography pricing in Ho Chi Minh City',
};

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

const PhotographyVideoService = () => {
  const trust = getServiceTrust(PATH);
  const expert = getServiceExpert(PATH);

  return (
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
              data-vi="Dịch vụ quay video quảng cáo tại TP.HCM"
              data-en="Advertising video production in Ho Chi Minh City"
            >
              Advertising video production in Ho Chi Minh City
            </h1>
            <p
              className="production-hero__lead"
              data-vi="Unitrux xây concept, quay, dựng và bàn giao video quảng cáo theo đúng hành vi của từng nền tảng. Một buổi sản xuất có thể tạo ra nhiều phiên bản cho Facebook, Instagram, TikTok, YouTube, website và sàn thương mại điện tử."
              data-en="Unitrux develops the concept, shoots, edits and delivers each advertising film for the behavior of its platform. One production can become multiple versions for Facebook, Instagram, TikTok, YouTube, websites and marketplaces."
            >
              Unitrux develops the concept, shoots, edits and delivers each advertising film for the behavior of its platform. One production can become multiple versions for Facebook, Instagram, TikTok, YouTube, websites and marketplaces.
            </p>
            <p
              className="production-hero__location"
              data-vi="Ekip sản xuất và studio của Unitrux đặt tại Thành phố Hồ Chí Minh — có thể quay tại studio hoặc di chuyển đến địa điểm của bạn trong khu vực TP.HCM và các tỉnh lân cận."
              data-en="Unitrux's production crew and studio are based in Ho Chi Minh City — we can shoot in-studio or travel on-location within HCMC and nearby provinces."
            >
              Unitrux's production crew and studio are based in Ho Chi Minh City — we can shoot in-studio or travel on-location within HCMC and nearby provinces.
            </p>
            <div className="production-actions">
              <a className="production-button production-button--primary" href="https://zalo.me/3299309778518905129">
                <span data-vi="Gửi brief qua Zalo" data-en="Send a brief on Zalo">Send a brief on Zalo</span>
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

      <DirectAnswer
        questionVi="Unitrux cung cấp dịch vụ quay video quảng cáo gì?"
        questionEn="What does Unitrux offer for advertising video production?"
        answerVi="Unitrux là đơn vị sản xuất video quảng cáo tại TP.HCM, phục vụ doanh nghiệp cần nội dung video cho quảng cáo, website và mạng xã hội. Dịch vụ gồm quay video quảng cáo sản phẩm, video giới thiệu doanh nghiệp, TikTok/Reels/Shorts, video cửa hàng và video phỏng vấn. Quy trình đi qua 8 bước từ brief, research, concept, kịch bản và shot list, tiền kỳ, quay, hậu kỳ, đến bàn giao các phiên bản theo đúng tỷ lệ và thời lượng của từng nền tảng. Ekip và studio đặt tại TP.HCM, có thể di chuyển đến các tỉnh lân cận."
        answerEn="Unitrux is an advertising video production company in Ho Chi Minh City, working with businesses that need video for ads, their website and social media. The service covers product advertising video, company introduction films, TikTok/Reels/Shorts, store video and interview video. It runs through eight steps — brief, research, concept, script and shot list, pre-production, filming, post-production, and delivery of versions matched to each platform’s ratio and duration. The crew and studio are based in Ho Chi Minh City and can travel to nearby provinces."
      />

      {trust && <TrustSignals data={trust} />}

      <ServiceTypes
        titleVi="Các dịch vụ quay video của Unitrux"
        titleEn="Unitrux video production services"
        leadVi="Mỗi loại video được xây quanh một vai trò cụ thể. Mô tả dưới đây đủ để chọn hướng phù hợp; nội dung chuyên sâu về từng loại nằm ở các bài hướng dẫn liên quan."
        leadEn="Each video type is built around a specific job. The descriptions below are enough to pick a direction; deeper guidance lives in the related articles."
        items={SERVICE_TYPES}
      />

      <section className="production-showcase" aria-labelledby="production-showcase-title">
        <div className="production-shell">
          <div className="production-heading production-heading--split">
            <h2
              id="production-showcase-title"
              data-vi="Portfolio video Unitrux đã sản xuất"
              data-en="Video Unitrux has produced"
            >
              Video Unitrux has produced
            </h2>
            <p
              data-vi="Video khách hàng thật — nội dung social cho spa và video thương hiệu tại Biên Hòa. Mỗi video được xây quanh một vai trò cụ thể: thu hút chú ý, giải thích sản phẩm, tạo niềm tin hoặc dẫn đến chuyển đổi."
              data-en="Real client work — spa social content and a Biên Hòa brand film. Each film is built around a specific job: earn attention, explain the product, build trust or lead to conversion."
            >
              Real client work — spa social content and a Biên Hòa brand film. Each film is built around a specific job: earn attention, explain the product, build trust or lead to conversion.
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
              data-vi="Không chỉ video: hậu trường và ảnh sản xuất"
              data-en="Beyond video: the production process and real photos"
            >
              Beyond video: the production process and real photos
            </h2>
            <p
              data-vi="Ảnh thật từ studio, buổi quay tại địa điểm khách hàng và sự kiện — không phải ảnh minh họa. Cần chụp ảnh sản phẩm thay vì video? Xem dịch vụ chụp ảnh sản phẩm chuyên nghiệp."
              data-en="Real photos from the studio, on-location shoots and event coverage — not stock imagery. Need product photography instead of video? See the product photography service."
            >
              Real photos from the studio, on-location shoots and event coverage — not stock imagery. Need product photography instead of video? See the product photography service.
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

      <WhoItsFor
        titleVi="Dịch vụ quay video phù hợp với doanh nghiệp nào"
        titleEn="Which businesses this video service fits"
        items={WHO_ITS_FOR}
      />

      <Deliverables
        titleVi="Doanh nghiệp nhận được gì sau dự án"
        titleEn="What you receive after the project"
        items={DELIVERABLES}
      />

      <ServiceProcess
        id="production-process"
        titleVi="Quy trình sản xuất video 8 bước"
        titleEn="The 8-step video production process"
        leadVi="Tám bước rõ ràng giúp buổi quay tập trung và giảm chỉnh sửa không cần thiết."
        leadEn="Eight clear steps keep the shoot focused and cut unnecessary revision."
        steps={PROCESS}
        tint
      />

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

      <CostFactors
        titleVi="Các yếu tố ảnh hưởng đến chi phí quay video quảng cáo"
        titleEn="What affects the cost of advertising video production"
        leadVi="Báo giá của Unitrux tách rõ từng phạm vi. Các yếu tố dưới đây là những gì thường làm thay đổi con số cuối cùng."
        leadEn="Unitrux quotes each scope separately. These are the factors that usually move the final number."
        items={COST_FACTORS}
        pricingLink={PRICING_LINK}
      />

      <PricingPreview />

      <CaseStudySection money={PATH} />

      {expert && <ExpertAuthor data={expert} />}

      <section className="production-faq" aria-labelledby="production-faq-title">
        <div className="production-shell production-faq__layout">
          <div>
            <h2 id="production-faq-title" data-vi="Câu hỏi thường gặp về dịch vụ quay video quảng cáo" data-en="FAQ about advertising video production">FAQ about advertising video production</h2>
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
            <details>
              <summary data-vi="Quay video sản phẩm cần chuẩn bị gì trước ngày quay?" data-en="What should we prepare before a product video shoot?">What should we prepare before a product video shoot?</summary>
              <p data-vi="Nên xác định trước sản phẩm ưu tiên quay, số lượng cần có mặt trên set, kênh sẽ đăng nội dung và tỷ lệ khung hình cần dùng (ngang cho website, dọc cho TikTok/Reels)." data-en="Decide in advance which products to prioritize, how many units to have on set, which channels the content will run on, and which aspect ratio you need (horizontal for the website, vertical for TikTok/Reels).">Decide in advance which products to prioritize, how many units to have on set, which channels the content will run on, and which aspect ratio you need (horizontal for the website, vertical for TikTok/Reels).</p>
            </details>
            <details>
              <summary data-vi="Video sản phẩm khác gì với video quảng cáo thương hiệu?" data-en="How is a product film different from a brand advertising film?">How is a product film different from a brand advertising film?</summary>
              <p data-vi="Video sản phẩm tập trung trình diễn công dụng, chất liệu và cách dùng của một sản phẩm cụ thể cho website, landing page và sàn thương mại điện tử. Video quảng cáo thương hiệu kể câu chuyện, giá trị và định vị của cả thương hiệu. Hai loại có thể quay trong cùng một buổi nếu được lên kế hoạch từ bước concept." data-en="A product film focuses on demonstrating the features, materials and real use of one specific product for websites, landing pages and marketplaces. A brand advertising film tells the story, values and positioning of the whole brand. Both can be shot in one session when planned from the concept stage.">A product film focuses on demonstrating the features, materials and real use of one specific product for websites, landing pages and marketplaces. A brand advertising film tells the story, values and positioning of the whole brand. Both can be shot in one session when planned from the concept stage.</p>
            </details>
            <details>
              <summary data-vi="Unitrux có quay video quảng cáo ngoài TPHCM không?" data-en="Do you shoot advertising video outside Ho Chi Minh City?">Do you shoot advertising video outside Ho Chi Minh City?</summary>
              <p data-vi="Có. Ekip đặt tại TPHCM và có thể di chuyển đến các tỉnh lân cận hoặc toàn quốc tuỳ dự án — chi phí di chuyển sẽ được báo riêng." data-en="Yes. Our crew is based in Ho Chi Minh City and can travel to nearby provinces or nationwide depending on the project — travel costs are quoted separately.">Yes. Our crew is based in Ho Chi Minh City and can travel to nearby provinces or nationwide depending on the project — travel costs are quoted separately.</p>
            </details>
          </div>
        </div>
      </section>

      <RelatedContent path={PATH} />

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
};

export default PhotographyVideoService;
