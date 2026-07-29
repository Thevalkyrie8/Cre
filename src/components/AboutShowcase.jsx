import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ZALO_URL = 'https://zalo.me/3299309778518905129';

const principles = [
  {
    icon: 'target',
    titleEn: 'Commercial clarity',
    titleVi: 'Rõ ràng về mục tiêu kinh doanh',
    copyEn: 'We begin with the customer journey and the business outcome—not a list of tools to sell.',
    copyVi: 'Chúng tôi bắt đầu từ hành trình khách hàng và kết quả kinh doanh, không phải danh sách công cụ cần bán.',
  },
  {
    icon: 'connect',
    titleEn: 'Connected execution',
    titleVi: 'Triển khai liền mạch',
    copyEn: 'Website, conversations, campaigns and follow-up work as one accountable system.',
    copyVi: 'Website, hội thoại, chiến dịch và follow-up vận hành như một hệ thống có trách nhiệm rõ ràng.',
  },
  {
    icon: 'measure',
    titleEn: 'Measurable improvement',
    titleVi: 'Tối ưu có thể đo lường',
    copyEn: 'Traffic, enquiries and conversion signals guide what the team improves next.',
    copyVi: 'Traffic, lượt liên hệ và tín hiệu chuyển đổi cho biết đội ngũ cần cải thiện điều gì tiếp theo.',
  },
];

const approach = [
  {
    number: '01',
    icon: 'diagnose',
    titleEn: 'Diagnose',
    titleVi: 'Chẩn đoán',
    copyEn: 'Find the bottleneck across your customer journey, channels and current operations.',
    copyVi: 'Xác định điểm nghẽn trong hành trình khách hàng, các kênh và cách vận hành hiện tại.',
  },
  {
    number: '02',
    icon: 'build',
    titleEn: 'Build',
    titleVi: 'Xây dựng',
    copyEn: 'Create the smallest useful combination of strategy, content, website and automation.',
    copyVi: 'Xây dựng tổ hợp vừa đủ gồm chiến lược, nội dung, website và tự động hóa.',
  },
  {
    number: '03',
    icon: 'connect',
    titleEn: 'Connect',
    titleVi: 'Kết nối',
    copyEn: 'Link conversations and lead data across Website, Facebook, Zalo and Instagram.',
    copyVi: 'Kết nối hội thoại và dữ liệu lead từ Website, Facebook, Zalo và Instagram.',
  },
  {
    number: '04',
    icon: 'measure',
    titleEn: 'Improve',
    titleVi: 'Tối ưu',
    copyEn: 'Measure the signals that matter, learn quickly and improve the system over time.',
    copyVi: 'Đo đúng tín hiệu, học nhanh và liên tục cải thiện hệ thống theo thời gian.',
  },
];

const capabilities = [
  {
    icon: 'website',
    titleEn: 'Website & UX',
    titleVi: 'Website & UX',
    copyEn: 'Conversion-focused websites and landing pages that explain value clearly and turn attention into enquiries.',
    copyVi: 'Website và landing page tập trung chuyển đổi, truyền đạt giá trị rõ ràng và biến sự chú ý thành lượt liên hệ.',
    link: '/web-development',
  },
  {
    icon: 'chat',
    titleEn: 'Chatbot & social messaging',
    titleVi: 'Chatbot & nhắn tin đa kênh',
    copyEn: 'Website chatbot, Facebook Messenger, Zalo and Instagram flows that capture, qualify and route leads.',
    copyVi: 'Luồng chatbot Website, Facebook Messenger, Zalo và Instagram giúp thu lead, phân loại và chuyển đúng người phụ trách.',
    noteEn: 'Automation connects every conversation to follow-up.',
    noteVi: 'Automation kết nối mọi cuộc hội thoại với quy trình follow-up.',
    link: '/chatbox-ai',
  },
  {
    icon: 'search',
    titleEn: 'SEO & content',
    titleVi: 'SEO & nội dung',
    copyEn: 'Search and content systems that build visibility, trust and a steady flow of qualified traffic.',
    copyVi: 'Hệ thống SEO và nội dung giúp tăng khả năng được tìm thấy, xây niềm tin và tạo traffic phù hợp.',
    link: '/digital-marketing',
  },
  {
    icon: 'campaign',
    titleEn: 'Ads & measurement',
    titleVi: 'Quảng cáo & đo lường',
    copyEn: 'Performance campaigns and tracking that connect media spend to leads, decisions and improvement.',
    copyVi: 'Chiến dịch hiệu suất và tracking giúp kết nối ngân sách với lead, quyết định và hoạt động tối ưu.',
    link: '/digital-marketing',
  },
];

const proofStages = [
  {
    icon: 'problem',
    titleEn: 'Problem',
    titleVi: 'Vấn đề',
    copyEn: 'Document the real bottleneck, context and constraints.',
    copyVi: 'Ghi nhận đúng điểm nghẽn, bối cảnh và giới hạn thực tế.',
  },
  {
    icon: 'system',
    titleEn: 'System',
    titleVi: 'Hệ thống',
    copyEn: 'Show what was designed, connected and operated.',
    copyVi: 'Trình bày những gì đã được thiết kế, kết nối và vận hành.',
  },
  {
    icon: 'result',
    titleEn: 'Result',
    titleVi: 'Kết quả',
    copyEn: 'Add verified outcomes and lessons when the evidence is ready.',
    copyVi: 'Bổ sung kết quả đã xác minh và bài học khi dữ liệu sẵn sàng.',
  },
];

const channelNames = [
  ['website', 'Website'],
  ['facebook', 'Facebook'],
  ['zalo', 'Zalo'],
  ['instagram', 'Instagram'],
];

const iconPaths = {
  website: <><rect x="5" y="7" width="22" height="18" rx="2" /><path d="M5 12h22M10 9.5h.01M14 9.5h.01M9 17h9M9 21h13" /></>,
  chat: <><path d="M5 7.5h22v15H15l-6 4v-4H5v-15Z" /><circle cx="11" cy="15" r="1" /><circle cx="16" cy="15" r="1" /><circle cx="21" cy="15" r="1" /></>,
  facebook: <><path d="M5 7.5h22v15H15l-6 4v-4H5v-15Z" /><path d="m11 19 5-7 2.5 3 3.5-3-5 7-2.5-3-3.5 3Z" /></>,
  zalo: <><path d="M5 7.5h22v15H15l-6 4v-4H5v-15Z" /><path d="M10 13h5l-5 6h5M18 19v-6h4M19 16h3" /></>,
  instagram: <><rect x="6" y="6" width="20" height="20" rx="5" /><circle cx="16" cy="16" r="5" /><circle cx="22.5" cy="9.5" r="1" /></>,
  target: <><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="6" /><circle cx="16" cy="16" r="1.5" /><path d="m20 12 7-7M23 5h4v4" /></>,
  connect: <><circle cx="8" cy="16" r="4" /><circle cx="24" cy="8" r="4" /><circle cx="24" cy="24" r="4" /><path d="m11.5 14 9-4M11.5 18l9 4" /></>,
  measure: <><path d="M6 26V15M12 26V9M18 26V18M24 26V5M4 26h24" /><path d="m6 12 6-4 6 6 8-9" /></>,
  diagnose: <><circle cx="14" cy="14" r="8" /><path d="m20 20 7 7M10 14h8M14 10v8" /></>,
  build: <><path d="m7 25 13-13M18 8l3-3 6 6-3 3M6 20l6 6M9 17l6 6" /><path d="M6 8h7v7" /></>,
  search: <><circle cx="14" cy="14" r="8" /><path d="m20 20 7 7" /></>,
  campaign: <><path d="M5 14h5l12-6v16l-12-6H5v-4Z" /><path d="M10 18v7h5M26 12l3-2M26 20l3 2" /></>,
  problem: <><path d="M16 4 29 27H3L16 4Z" /><path d="M16 12v7M16 23h.01" /></>,
  system: <><circle cx="16" cy="16" r="5" /><path d="M16 3v4M16 25v4M3 16h4M25 16h4M7 7l3 3M22 22l3 3M25 7l-3 3M10 22l-3 3" /></>,
  result: <><path d="M5 27V6M5 27h23" /><path d="m8 22 6-6 5 3 8-10" /></>,
};

const LineIcon = ({ name, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {iconPaths[name] || iconPaths.connect}
  </svg>
);

const openChat = (placement) => window.dispatchEvent(new CustomEvent('unitrux:open-chat', {
  detail: { placement },
}));

const AboutShowcase = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-about-reveal]');
    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="theme-synced-page about-engine-page">
      <section className="about-engine-hero" aria-labelledby="about-engine-title">
        <div className="about-engine-shell about-engine-hero__grid">
          <div className="about-engine-hero__copy" data-about-reveal>
            <p className="about-engine-kicker" data-en="About Unitrux" data-vi="Về Unitrux">About Unitrux</p>
            <h1 id="about-engine-title" data-en="A technology partner built around business outcomes." data-vi="Đối tác công nghệ được xây dựng quanh kết quả kinh doanh.">
              A technology partner built around business outcomes.
            </h1>
            <p className="about-engine-lead" data-en="Unitrux helps SMEs turn technology into predictable growth. We design and connect the right pieces—website, conversations, marketing and measurement—so your team can focus on what moves the business forward." data-vi="Unitrux giúp SME biến công nghệ thành tăng trưởng có thể dự đoán. Chúng tôi thiết kế và kết nối đúng các mảnh ghép—website, hội thoại, marketing và đo lường—để đội ngũ tập trung vào điều thực sự thúc đẩy kinh doanh.">
              Unitrux helps SMEs turn technology into predictable growth. We design and connect the right pieces—website, conversations, marketing and measurement—so your team can focus on what moves the business forward.
            </p>
            <div className="about-engine-actions">
              <button type="button" className="about-engine-button about-engine-button--primary" onClick={() => openChat('about_hero')}>
                <span data-en="Talk about your growth plan" data-vi="Trao đổi kế hoạch tăng trưởng">Talk about your growth plan</span>
                <span aria-hidden="true">↗</span>
              </button>
              <a className="about-engine-text-link" href="#about-approach">
                <span data-en="Explore our approach" data-vi="Xem cách chúng tôi triển khai">Explore our approach</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="about-system-map" data-about-reveal aria-label="Unitrux connected growth system">
            <span className="about-system-map__orbit" aria-hidden="true" />
            <div className="about-system-map__core">
              <strong>Unitrux</strong>
              <span data-en="Connected growth engine" data-vi="Hệ thống tăng trưởng kết nối">Connected growth engine</span>
            </div>
            <div className="about-system-node about-system-node--website">
              <LineIcon name="website" />
              <strong>Website</strong>
              <span data-en="Build trust" data-vi="Xây niềm tin">Build trust</span>
            </div>
            <div className="about-system-node about-system-node--chat">
              <div className="about-system-node__heading"><LineIcon name="chat" /><strong data-en="Omnichannel chat" data-vi="Chat đa kênh">Omnichannel chat</strong></div>
              <ul className="about-channel-list" aria-label="Messaging channels">
                {channelNames.map(([icon, label]) => (
                  <li key={label}><LineIcon name={icon} size={20} /><span>{label}</span></li>
                ))}
              </ul>
            </div>
            <div className="about-system-node about-system-node--follow">
              <LineIcon name="connect" />
              <strong>Follow-up</strong>
              <span data-en="Route every lead" data-vi="Chuyển đúng lead">Route every lead</span>
            </div>
            <div className="about-system-node about-system-node--marketing">
              <LineIcon name="campaign" />
              <strong>SEO & Ads</strong>
              <span data-en="Attract demand" data-vi="Thu hút nhu cầu">Attract demand</span>
            </div>
            <div className="about-system-node about-system-node--analytics">
              <LineIcon name="measure" />
              <strong>Analytics</strong>
              <span data-en="Learn and improve" data-vi="Đo và tối ưu">Learn and improve</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-belief" aria-labelledby="about-belief-title">
        <div className="about-engine-shell about-belief__grid" data-about-reveal>
          <div className="about-belief__statement">
            <p className="about-engine-kicker" data-en="Business first" data-vi="Kinh doanh là trọng tâm">Business first</p>
            <h2 id="about-belief-title" data-en="Technology should create momentum—not more tools to manage." data-vi="Công nghệ phải tạo đà tăng trưởng, không phải thêm công cụ để quản lý.">
              Technology should create momentum—not more tools to manage.
            </h2>
            <p data-en="For SMEs, every technology investment should earn its place. Our work stays practical, connected and accountable to the next useful business outcome." data-vi="Với SME, mỗi khoản đầu tư công nghệ đều phải chứng minh giá trị. Công việc của chúng tôi luôn thực tế, kết nối và gắn với kết quả kinh doanh hữu ích tiếp theo.">
              For SMEs, every technology investment should earn its place. Our work stays practical, connected and accountable to the next useful business outcome.
            </p>
          </div>
          <ul className="about-principles">
            {principles.map((item) => (
              <li key={item.titleEn}>
                <span className="about-principles__icon"><LineIcon name={item.icon} /></span>
                <div><h3 data-en={item.titleEn} data-vi={item.titleVi}>{item.titleEn}</h3><p data-en={item.copyEn} data-vi={item.copyVi}>{item.copyEn}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about-approach" className="about-approach" aria-labelledby="about-approach-title">
        <div className="about-engine-shell">
          <header className="about-section-heading" data-about-reveal>
            <p className="about-engine-kicker" data-en="Our approach" data-vi="Cách chúng tôi triển khai">Our approach</p>
            <h2 id="about-approach-title" data-en="A clear, repeatable path to growth." data-vi="Một lộ trình tăng trưởng rõ ràng và có thể lặp lại.">A clear, repeatable path to growth.</h2>
          </header>
          <ol className="about-approach__steps">
            {approach.map((item) => (
              <li key={item.number} data-about-reveal>
                <span className="about-approach__number">{item.number}</span>
                <span className="about-approach__icon"><LineIcon name={item.icon} /></span>
                <h3 data-en={item.titleEn} data-vi={item.titleVi}>{item.titleEn}</h3>
                <p data-en={item.copyEn} data-vi={item.copyVi}>{item.copyEn}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-capabilities" aria-labelledby="about-capabilities-title">
        <div className="about-engine-shell">
          <header className="about-section-heading" data-about-reveal>
            <p className="about-engine-kicker" data-en="What we connect" data-vi="Những gì chúng tôi kết nối">What we connect</p>
            <h2 id="about-capabilities-title" data-en="Specialists working as one system." data-vi="Nhiều chuyên môn, vận hành như một hệ thống.">Specialists working as one system.</h2>
          </header>
          <ul className="about-capability-list">
            {capabilities.map((item) => (
              <li key={item.titleEn} data-about-reveal>
                <span className="about-capability-list__icon"><LineIcon name={item.icon} /></span>
                <div className="about-capability-list__name"><h3 data-en={item.titleEn} data-vi={item.titleVi}>{item.titleEn}</h3></div>
                <div className="about-capability-list__copy">
                  <p data-en={item.copyEn} data-vi={item.copyVi}>{item.copyEn}</p>
                  {item.noteEn && <small data-en={item.noteEn} data-vi={item.noteVi}>{item.noteEn}</small>}
                </div>
                <Link to={item.link} aria-label={`Explore ${item.titleEn}`}><span aria-hidden="true">→</span></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-proof" aria-labelledby="about-proof-title">
        <div className="about-engine-shell" data-about-reveal>
          <header className="about-section-heading">
            <p className="about-engine-kicker" data-en="Honest proof" data-vi="Bằng chứng trung thực">Honest proof</p>
            <h2 id="about-proof-title" data-en="Proof, documented as the work grows." data-vi="Bằng chứng được ghi nhận cùng quá trình triển khai.">Proof, documented as the work grows.</h2>
            <p data-en="We do not publish borrowed metrics or invented outcomes. Real case studies will be added with the problem, system and verified result clearly documented." data-vi="Chúng tôi không sử dụng số liệu vay mượn hoặc kết quả dựng sẵn. Case study thật sẽ được bổ sung với vấn đề, hệ thống và kết quả đã xác minh.">
              We do not publish borrowed metrics or invented outcomes. Real case studies will be added with the problem, system and verified result clearly documented.
            </p>
          </header>
          <ol className="about-proof__stages">
            {proofStages.map((item) => (
              <li key={item.titleEn}>
                <span><LineIcon name={item.icon} /></span>
                <h3 data-en={item.titleEn} data-vi={item.titleVi}>{item.titleEn}</h3>
                <p data-en={item.copyEn} data-vi={item.copyVi}>{item.copyEn}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-final-cta">
        <div className="about-engine-shell about-final-cta__panel" data-about-reveal>
          <div>
            <p className="about-engine-kicker" data-en="The next useful step" data-vi="Bước tiếp theo hữu ích">The next useful step</p>
            <h2 data-en="Start with the bottleneck." data-vi="Bắt đầu từ nhu cầu của bạn.">Start with the bottleneck.</h2>
            <p data-en="Tell us what is slowing growth. We will suggest the smallest useful next step." data-vi="Cho chúng tôi biết điều gì đang cản trở tăng trưởng. Unitrux sẽ đề xuất bước tiếp theo vừa đủ và hữu ích.">
              Tell us what is slowing growth. We will suggest the smallest useful next step.
            </p>
          </div>
          <div className="about-engine-actions">
            <button type="button" className="about-engine-button about-engine-button--primary" onClick={() => openChat('about_final_cta')}>
              <LineIcon name="chat" size={20} /><span data-en="Chat with us" data-vi="Chat với Unitrux">Chat with us</span>
            </button>
            <a className="about-engine-button about-engine-button--secondary" href={ZALO_URL} target="_blank" rel="noopener noreferrer">
              <LineIcon name="zalo" size={20} /><span data-en="Chat on Zalo" data-vi="Chat qua Zalo">Chat on Zalo</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutShowcase;
