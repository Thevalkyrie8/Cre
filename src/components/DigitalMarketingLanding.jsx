import { createElement, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../analytics/tracking';
import './DigitalMarketingLanding.css';

const ZALO_URL = 'https://zalo.me/3299309778518905129';

const platforms = [
  {
    key: 'meta',
    label: 'META ADS',
    titleEn: 'Facebook & Instagram Ads',
    titleVi: 'Quảng cáo Facebook & Instagram',
    copyEn: 'Reach the right audience across Feed, Reels, Stories, and Messenger with a clear offer, conversion-ready creative, and structured remarketing.',
    copyVi: 'Tiếp cận đúng khách hàng trên Feed, Reels, Stories và Messenger bằng thông điệp rõ ràng, nội dung phù hợp chuyển đổi và remarketing có cấu trúc.',
    items: [
      ['Campaign and audience structure', 'Cấu trúc chiến dịch và tệp khách hàng'],
      ['Static, carousel, Reels, and lead-form creative', 'Ảnh, carousel, Reels và biểu mẫu thu lead'],
      ['Pixel, Conversions API, and remarketing', 'Pixel, Conversions API và remarketing'],
    ],
  },
  {
    key: 'google',
    label: 'GOOGLE ADS',
    titleEn: 'Capture active search demand',
    titleVi: 'Đón đúng nhu cầu đang tìm kiếm',
    copyEn: 'Connect high-intent searches to the most relevant landing page, then measure calls, forms, chat, and qualified leads—not just clicks.',
    copyVi: 'Kết nối nhu cầu tìm kiếm có ý định cao với đúng landing page, sau đó đo cuộc gọi, biểu mẫu, chat và lead phù hợp—không chỉ đo lượt nhấp.',
    items: [
      ['Search, Performance Max, Display, and YouTube', 'Search, Performance Max, Display và YouTube'],
      ['Search themes, copy, extensions, and landing pages', 'Chủ đề tìm kiếm, nội dung, tiện ích và landing page'],
      ['Conversion tracking and search-term review', 'Theo dõi chuyển đổi và rà soát cụm từ tìm kiếm'],
    ],
  },
  {
    key: 'tiktok',
    label: 'TIKTOK ADS',
    titleEn: 'Turn attention into a useful next step',
    titleVi: 'Biến sự chú ý thành hành động tiếp theo',
    copyEn: 'Build short-form campaigns around a strong first three seconds, native platform pacing, and a direct path from video to inquiry.',
    copyVi: 'Xây chiến dịch video ngắn với ba giây đầu đủ mạnh, nhịp nội dung phù hợp nền tảng và đường đi trực tiếp từ video đến tư vấn.',
    items: [
      ['Creative angles and short-form scripts', 'Góc nội dung và kịch bản video ngắn'],
      ['Spark Ads and conversion campaigns', 'Spark Ads và chiến dịch chuyển đổi'],
      ['Creative testing by hook, format, and CTA', 'Thử nghiệm hook, định dạng và CTA'],
    ],
  },
];

const process = [
  {
    titleEn: 'Find the growth bottleneck',
    titleVi: 'Tìm đúng điểm nghẽn tăng trưởng',
    copyEn: 'Review the offer, audience, current channels, landing experience, tracking, and lead-handling process before deciding where to spend.',
    copyVi: 'Rà soát sản phẩm, khách hàng, kênh hiện tại, landing page, tracking và quy trình xử lý lead trước khi quyết định phân bổ ngân sách.',
  },
  {
    titleEn: 'Build one campaign system',
    titleVi: 'Xây một hệ thống chiến dịch thống nhất',
    copyEn: 'Define the channel role, campaign structure, creative direction, landing page, measurement plan, and handoff to sales.',
    copyVi: 'Xác định vai trò từng kênh, cấu trúc chiến dịch, hướng nội dung, landing page, kế hoạch đo lường và cách bàn giao lead cho đội bán hàng.',
  },
  {
    titleEn: 'Launch with clean measurement',
    titleVi: 'Khởi chạy với đo lường rõ ràng',
    copyEn: 'Complete QA, connect analytics and advertising platforms, verify conversion events, and launch with controlled tests.',
    copyVi: 'Hoàn tất QA, kết nối nền tảng phân tích và quảng cáo, kiểm tra sự kiện chuyển đổi rồi khởi chạy bằng các thử nghiệm có kiểm soát.',
  },
  {
    titleEn: 'Learn, report, and improve',
    titleVi: 'Học từ dữ liệu, báo cáo và tối ưu',
    copyEn: 'Review search terms, audiences, creative, landing behavior, and lead quality to decide what to stop, refine, or scale.',
    copyVi: 'Rà soát cụm từ tìm kiếm, tệp khách hàng, nội dung, hành vi trên trang và chất lượng lead để quyết định dừng, chỉnh hay mở rộng.',
  },
];

const deliverables = [
  ['Channel and budget direction', 'Định hướng kênh và ngân sách'],
  ['Campaign structure and media plan', 'Cấu trúc chiến dịch và media plan'],
  ['Ad copy, design, and video creative', 'Nội dung, thiết kế và video quảng cáo'],
  ['Landing-page recommendations', 'Đề xuất tối ưu landing page'],
  ['Tracking and conversion setup', 'Thiết lập tracking và chuyển đổi'],
  ['Optimization and reporting cadence', 'Nhịp tối ưu và báo cáo định kỳ'],
];

const faqs = [
  {
    qEn: 'Which advertising platforms does Unitrux support?',
    qVi: 'Unitrux triển khai quảng cáo trên những nền tảng nào?',
    aEn: 'Unitrux supports Google Ads, Facebook Ads, Instagram Ads, TikTok Ads, YouTube, and connected remarketing. The recommended mix depends on your audience, offer, sales cycle, creative readiness, and budget.',
    aVi: 'Unitrux triển khai Google Ads, Facebook Ads, Instagram Ads, TikTok Ads, YouTube và remarketing liên kết. Tổ hợp kênh phù hợp phụ thuộc vào khách hàng, sản phẩm, chu kỳ bán hàng, khả năng sản xuất nội dung và ngân sách.',
  },
  {
    qEn: 'Can Unitrux produce advertising videos?',
    qVi: 'Unitrux có sản xuất video quảng cáo không?',
    aEn: 'Yes. The scope can include creative direction, scripts, filming, editing, short-form adaptations, and platform-specific versions for Facebook, Instagram, TikTok, YouTube, and landing pages.',
    aVi: 'Có. Phạm vi có thể gồm định hướng sáng tạo, kịch bản, quay, dựng, phiên bản video ngắn và định dạng riêng cho Facebook, Instagram, TikTok, YouTube và landing page.',
  },
  {
    qEn: 'Is advertising spend included in the service fee?',
    qVi: 'Ngân sách chạy quảng cáo có nằm trong phí dịch vụ không?',
    aEn: 'Advertising spend and service fees are normally separated so the media budget remains transparent. The proposal will state the management scope, production work, measurement setup, and expected media spend clearly.',
    aVi: 'Ngân sách trả cho nền tảng và phí dịch vụ thường được tách riêng để minh bạch. Báo giá sẽ ghi rõ phạm vi vận hành, sản xuất nội dung, thiết lập đo lường và ngân sách truyền thông dự kiến.',
  },
  {
    qEn: 'Does Unitrux guarantee revenue or ROAS?',
    qVi: 'Unitrux có cam kết chắc chắn doanh thu hoặc ROAS không?',
    aEn: 'No responsible partner can guarantee a fixed business result before testing because performance also depends on the offer, price, market, website, sales process, and competition. Unitrux commits to transparent setup, measurement, testing, and optimization.',
    aVi: 'Không đối tác có trách nhiệm nào có thể bảo đảm một kết quả kinh doanh cố định trước khi thử nghiệm, vì hiệu quả còn phụ thuộc sản phẩm, giá, thị trường, website, quy trình bán hàng và cạnh tranh. Unitrux cam kết triển khai, đo lường, thử nghiệm và tối ưu minh bạch.',
  },
];

const Bilingual = ({ as = 'span', en, vi, children, ...props }) => (
  createElement(as, { 'data-en': en, 'data-vi': vi, ...props }, children || en)
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M14 7l5 5-5 5" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const DigitalMarketingLanding = () => {
  const pageRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const applyPageLanguage = (language) => {
      pageRef.current?.querySelectorAll('[data-en], [data-vi]').forEach((element) => {
        const text = language === 'vi' ? element.getAttribute('data-vi') : element.getAttribute('data-en');
        if (text) element.textContent = text;
      });
    };

    const savedLanguage = localStorage.getItem('language') === 'en' ? 'en' : 'vi';
    applyPageLanguage(savedLanguage);

    const handleLanguageChange = (event) => applyPageLanguage(event.detail?.language === 'en' ? 'en' : 'vi');
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncVideoPlayback = () => {
      if (!videoRef.current) return;
      if (reducedMotion.matches) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // Browsers may still defer autoplay in restrictive power-saving modes.
        });
      }
    };

    syncVideoPlayback();
    reducedMotion.addEventListener?.('change', syncVideoPlayback);
    return () => reducedMotion.removeEventListener?.('change', syncVideoPlayback);
  }, []);

  const trackCta = (placement) => {
    trackEvent('contact_click', { method: 'zalo', service: 'digital_marketing', placement });
  };

  return (
    <div className="ads-landing" ref={pageRef}>
      <section className="ads-hero" aria-labelledby="ads-hero-title">
        <div className="ads-shell ads-hero__layout">
          <div className="ads-hero__copy">
            <Link className="ads-back-link" to="/services">
              <span aria-hidden="true">←</span>
              <Bilingual en="All services" vi="Tất cả dịch vụ" />
            </Link>
            <Bilingual
              as="p"
              className="ads-hero__kicker"
              en="Multi-platform performance marketing"
              vi="Quảng cáo hiệu suất đa nền tảng"
            />
            <Bilingual
              as="h1"
              id="ads-hero-title"
              en="Turn advertising spend into a connected path to customers."
              vi="Biến ngân sách quảng cáo thành hành trình kết nối đến khách hàng."
            />
            <Bilingual
              as="p"
              className="ads-hero__lead"
              en="Unitrux plans and operates Google, Facebook, Instagram, and TikTok advertising—then connects creative, video, landing pages, chat, and measurement into one accountable system."
              vi="Unitrux lập kế hoạch và vận hành quảng cáo Google, Facebook, Instagram và TikTok—đồng thời kết nối nội dung, video, landing page, chat và đo lường thành một hệ thống rõ ràng."
            />
            <div className="ads-hero__actions">
              <a className="ads-button ads-button--primary" href={ZALO_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackCta('hero')}>
                <Bilingual en="Discuss your campaign" vi="Trao đổi chiến dịch" />
                <ArrowIcon />
              </a>
              <Link className="ads-button ads-button--secondary" to="/contact">
                <Bilingual en="Request a media plan" vi="Yêu cầu media plan" />
              </Link>
            </div>
            <Bilingual
              as="p"
              className="ads-hero__note"
              en="Start with your objective, current channels, and expected budget. We will recommend the smallest useful next step."
              vi="Bắt đầu từ mục tiêu, các kênh hiện tại và ngân sách dự kiến. Unitrux sẽ đề xuất bước tiếp theo vừa đủ và hữu ích."
            />
          </div>

          <div className="ads-orchestration" aria-label="Connected advertising system">
            <div className="ads-orchestration__top">
              <Bilingual en="Campaign control" vi="Điều phối chiến dịch" />
              <span className="ads-live-dot"><i /> <Bilingual en="Connected" vi="Đã kết nối" /></span>
            </div>
            <div className="ads-orchestration__channels" aria-hidden="true">
              <span>Google</span><span>Meta</span><span>TikTok</span>
            </div>
            <div className="ads-orchestration__flow">
              <div>
                <Bilingual as="small" en="Demand" vi="Nhu cầu" />
                <Bilingual as="strong" en="Search & social" vi="Tìm kiếm & mạng xã hội" />
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <Bilingual as="small" en="Experience" vi="Trải nghiệm" />
                <Bilingual as="strong" en="Creative & landing" vi="Nội dung & landing" />
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <Bilingual as="small" en="Conversion" vi="Chuyển đổi" />
                <Bilingual as="strong" en="Form, chat & Zalo" vi="Form, chat & Zalo" />
              </div>
            </div>
            <div className="ads-orchestration__signal">
              <span />
              <div>
                <Bilingual as="strong" en="Measure the whole journey" vi="Đo toàn bộ hành trình" />
                <Bilingual as="small" en="From impression to qualified conversation" vi="Từ lượt hiển thị đến cuộc trao đổi phù hợp" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ads-platform-strip" aria-label="Advertising platforms">
        <div className="ads-shell">
          {['Google Ads', 'Facebook Ads', 'Instagram Ads', 'TikTok Ads', 'YouTube'].map((platform) => <span key={platform}>{platform}</span>)}
        </div>
      </section>

      <section className="ads-intro" aria-labelledby="ads-intro-title">
        <div className="ads-shell ads-intro__layout">
          <div>
            <Bilingual
              as="h2"
              id="ads-intro-title"
              en="Ads work better when the system after the click is ready."
              vi="Quảng cáo hiệu quả hơn khi hệ thống sau lượt nhấp đã sẵn sàng."
            />
          </div>
          <div className="ads-intro__body">
            <Bilingual
              as="p"
              en="A campaign cannot repair a vague offer, slow page, weak creative, missing tracking, or delayed follow-up. Unitrux treats paid media as one part of the customer journey—not an isolated dashboard."
              vi="Một chiến dịch không thể tự sửa thông điệp mơ hồ, trang chậm, nội dung yếu, thiếu tracking hoặc phản hồi khách hàng trễ. Unitrux xem quảng cáo là một phần của hành trình khách hàng, không phải một dashboard đứng riêng."
            />
            <ul>
              {[
                ['One commercial objective across every channel', 'Một mục tiêu kinh doanh thống nhất trên mọi kênh'],
                ['Creative designed for the platform and funnel stage', 'Nội dung đúng nền tảng và đúng giai đoạn hành trình'],
                ['Landing pages, chat, and sales handoff connected', 'Landing page, chat và quy trình bàn giao lead được kết nối'],
                ['Decisions based on conversion and lead quality', 'Quyết định dựa trên chuyển đổi và chất lượng lead'],
              ].map(([en, vi]) => (
                <li key={en}><CheckIcon /><Bilingual en={en} vi={vi} /></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ads-platforms" aria-labelledby="ads-platforms-title">
        <div className="ads-shell">
          <div className="ads-section-heading">
            <Bilingual
              as="h2"
              id="ads-platforms-title"
              en="The right role for every advertising platform."
              vi="Đúng vai trò cho từng nền tảng quảng cáo."
            />
            <Bilingual
              as="p"
              en="We select channels from customer behavior and commercial intent, then give each platform a clear job in the same growth system."
              vi="Chúng tôi chọn kênh dựa trên hành vi khách hàng và ý định mua, sau đó giao cho mỗi nền tảng một vai trò rõ trong cùng hệ thống tăng trưởng."
            />
          </div>

          <div className="ads-platform-grid">
            {platforms.map((platform, index) => (
              <article className={`ads-platform ads-platform--${platform.key}`} key={platform.key}>
                <div className="ads-platform__index">0{index + 1}</div>
                <div className="ads-platform__content">
                  <span className="ads-platform__label">{platform.label}</span>
                  <Bilingual as="h3" en={platform.titleEn} vi={platform.titleVi} />
                  <Bilingual as="p" en={platform.copyEn} vi={platform.copyVi} />
                  <ul>
                    {platform.items.map(([en, vi]) => <li key={en}><CheckIcon /><Bilingual en={en} vi={vi} /></li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ads-creative" aria-labelledby="ads-creative-title">
        <div className="ads-shell ads-creative__layout">
          <div className="ads-creative__media">
            <video ref={videoRef} autoPlay muted loop playsInline controls preload="metadata" poster="/logo.jpg" aria-label="Unitrux advertising video production">
              <source src="/product-commercial-ads.mp4" type="video/mp4" />
            </video>
            <span><Bilingual en="Real Unitrux production media" vi="Video sản xuất thực tế của Unitrux" /></span>
          </div>
          <div className="ads-creative__copy">
            <Bilingual
              as="h2"
              id="ads-creative-title"
              en="Campaign strategy and video production, in one working loop."
              vi="Chiến lược quảng cáo và sản xuất video trong cùng một vòng làm việc."
            />
            <Bilingual
              as="p"
              en="A strong media plan still needs creative people want to watch. Unitrux can develop concepts, scripts, filming, editing, static assets, short-form cuts, and platform-specific variations."
              vi="Một media plan tốt vẫn cần nội dung khiến khách hàng muốn xem. Unitrux có thể triển khai ý tưởng, kịch bản, quay, dựng, thiết kế ảnh, video ngắn và các phiên bản riêng cho từng nền tảng."
            />
            <div className="ads-creative__formats">
              {[
                ['Reels & Stories', 'Reels & Stories'],
                ['TikTok short-form', 'Video ngắn TikTok'],
                ['YouTube & Display', 'YouTube & Display'],
                ['Landing-page video', 'Video cho landing page'],
              ].map(([en, vi]) => <Bilingual key={en} en={en} vi={vi} />)}
            </div>
            <Link className="ads-text-link" to="/photography-video">
              <Bilingual en="Explore video production" vi="Xem dịch vụ sản xuất video" />
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="ads-process" aria-labelledby="ads-process-title">
        <div className="ads-shell ads-process__layout">
          <div className="ads-process__heading">
            <Bilingual as="h2" id="ads-process-title" en="A practical path from budget to learning." vi="Lộ trình thực tế từ ngân sách đến dữ liệu học được." />
            <Bilingual as="p" en="Every stage produces a decision your team can review." vi="Mỗi giai đoạn đều tạo ra một quyết định mà đội ngũ của bạn có thể kiểm tra." />
          </div>
          <ol>
            {process.map((step, index) => (
              <li key={step.titleEn}>
                <span>0{index + 1}</span>
                <div>
                  <Bilingual as="h3" en={step.titleEn} vi={step.titleVi} />
                  <Bilingual as="p" en={step.copyEn} vi={step.copyVi} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ads-deliverables" aria-labelledby="ads-deliverables-title">
        <div className="ads-shell">
          <div className="ads-section-heading ads-section-heading--light">
            <Bilingual as="h2" id="ads-deliverables-title" en="What the engagement can include." vi="Phạm vi triển khai có thể bao gồm." />
            <Bilingual as="p" en="The final scope is shaped around your objective, readiness, channels, and budget—without hiding media spend inside vague packages." vi="Phạm vi cuối cùng được xây quanh mục tiêu, mức độ sẵn sàng, kênh và ngân sách—không giấu chi phí truyền thông trong các gói mơ hồ." />
          </div>
          <div className="ads-deliverables__list">
            {deliverables.map(([en, vi], index) => (
              <div key={en}><span>0{index + 1}</span><Bilingual as="strong" en={en} vi={vi} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="ads-faq" aria-labelledby="ads-faq-title">
        <div className="ads-shell ads-faq__layout">
          <div>
            <Bilingual as="h2" id="ads-faq-title" en="Clear answers before you spend." vi="Làm rõ trước khi chi ngân sách." />
            <Bilingual as="p" en="No guaranteed results, borrowed metrics, or vague channel promises—only a transparent scope and a measurable operating process." vi="Không hứa chắc kết quả, không dùng số liệu vay mượn, không mô tả kênh mơ hồ—chỉ có phạm vi minh bạch và quy trình vận hành đo lường được." />
          </div>
          <div className="ads-faq__items">
            {faqs.map((faq) => (
              <details key={faq.qEn}>
                <Bilingual as="summary" en={faq.qEn} vi={faq.qVi} />
                <Bilingual as="p" en={faq.aEn} vi={faq.aVi} />
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="ads-final-cta">
        <div className="ads-shell ads-final-cta__inner">
          <div>
            <Bilingual as="h2" en="Bring the objective. We’ll shape the campaign system." vi="Bạn mang mục tiêu. Unitrux xây hệ thống chiến dịch." />
            <Bilingual as="p" en="Share your product, audience, current channels, and expected budget to start a focused conversation." vi="Chia sẻ sản phẩm, khách hàng, kênh hiện tại và ngân sách dự kiến để bắt đầu một cuộc trao đổi đúng trọng tâm." />
          </div>
          <div className="ads-final-cta__actions">
            <a className="ads-button ads-button--primary" href={ZALO_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackCta('footer')}>
              <Bilingual en="Chat on Zalo" vi="Trao đổi qua Zalo" />
              <ArrowIcon />
            </a>
            <Link className="ads-button ads-button--secondary" to="/contact"><Bilingual en="Send a brief" vi="Gửi yêu cầu tư vấn" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketingLanding;
