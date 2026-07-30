import { createElement, useState } from 'react';
import { Link } from 'react-router-dom';

const packages = [
  {
    id: 'full-operation',
    stage: ['Scale', 'Mở rộng'],
    period: ['Monthly / Quarterly / Yearly', 'Theo tháng / quý / năm'],
    name: ['Full Operation Package', 'Gói vận hành toàn diện'],
    description: [
      'A complete growth team coordinating strategy, content, acquisition and measurement across every active channel.',
      'Đội ngũ tăng trưởng toàn diện phối hợp chiến lược, nội dung, thu hút khách hàng và đo lường trên mọi kênh đang hoạt động.',
    ],
    features: [
      ['End-to-end digital marketing strategy', 'Chiến lược digital marketing từ đầu đến cuối'],
      ['Multi-channel campaign management', 'Quản lý chiến dịch đa kênh'],
      ['Content creation and production', 'Sáng tạo và sản xuất nội dung'],
      ['Performance reporting and optimization', 'Báo cáo hiệu suất và tối ưu'],
    ],
    addOns: [
      ['Conversion website', 'Website tối ưu chuyển đổi'],
      ['Sales automation', 'Tự động hóa bán hàng'],
    ],
    popular: true,
  },
  {
    id: 'starter',
    stage: ['Launch', 'Khởi động'],
    period: ['One-time payment', 'Thanh toán một lần'],
    name: ['Starter Package', 'Gói khởi đầu'],
    description: [
      'A focused digital foundation for a new business or an existing brand ready to look credible online.',
      'Nền tảng số thiết yếu cho doanh nghiệp mới hoặc thương hiệu đang muốn xây dựng hình ảnh chuyên nghiệp trên môi trường trực tuyến.',
    ],
    features: [
      ['Professional website or store setup', 'Thiết lập website hoặc cửa hàng chuyên nghiệp'],
      ['Essential brand positioning', 'Định vị thương hiệu nền tảng'],
      ['Basic SEO optimization', 'Tối ưu SEO cơ bản'],
    ],
    addOns: [['CRM starter setup', 'Thiết lập CRM cơ bản']],
  },
  {
    id: 'multi-channel',
    stage: ['Sell', 'Bán hàng'],
    period: ['Monthly / Quarterly', 'Theo tháng / quý'],
    name: ['Multi-channel Sales', 'Bán hàng đa kênh'],
    description: [
      'Connect social channels, marketplaces and storefronts into one practical operating rhythm.',
      'Kết nối mạng xã hội, sàn thương mại điện tử và cửa hàng thành một quy trình vận hành bán hàng thống nhất.',
    ],
    features: [
      ['Social media management', 'Quản lý mạng xã hội'],
      ['Marketplace store operations', 'Vận hành gian hàng trên sàn'],
      ['Sales platform integration', 'Tích hợp nền tảng bán hàng'],
      ['Inventory coordination', 'Đồng bộ quản lý tồn kho'],
    ],
    addOns: [
      ['Mobile sales app', 'Ứng dụng bán hàng di động'],
      ['E-commerce website', 'Website thương mại điện tử'],
    ],
  },
  {
    id: 'image-video',
    stage: ['Create', 'Sáng tạo'],
    period: ['Per project', 'Theo dự án'],
    name: ['Image & Video', 'Hình ảnh & Video'],
    description: [
      'Sales-focused visual content built around your products, services and campaign objectives.',
      'Nội dung hình ảnh phục vụ bán hàng, được xây dựng theo sản phẩm, dịch vụ và mục tiêu chiến dịch của bạn.',
    ],
    features: [
      ['Professional photography', 'Chụp ảnh chuyên nghiệp'],
      ['Commercial video', 'Video thương mại'],
      ['Retouched asset library', 'Thư viện hình ảnh đã hậu kỳ'],
      ['Social media content formats', 'Định dạng nội dung cho mạng xã hội'],
    ],
  },
  {
    id: 'seo-analytics',
    stage: ['Measure', 'Đo lường'],
    period: ['Monthly / Quarterly', 'Theo tháng / quý'],
    name: ['SEO & Analytics', 'SEO & Phân tích dữ liệu'],
    description: [
      'Build organic visibility and turn performance data into clear, commercially useful next actions.',
      'Tăng khả năng hiển thị tự nhiên và chuyển dữ liệu hiệu suất thành những hành động tiếp theo rõ ràng, hữu ích cho kinh doanh.',
    ],
    features: [
      ['Advanced SEO optimization', 'Tối ưu SEO chuyên sâu'],
      ['Google Analytics setup', 'Thiết lập Google Analytics'],
      ['Keyword research and content plan', 'Nghiên cứu từ khóa và kế hoạch nội dung'],
      ['Tracking and reporting', 'Theo dõi và báo cáo'],
    ],
    addOns: [['Landing page system', 'Hệ thống landing page']],
  },
  {
    id: 'consulting',
    stage: ['Decide', 'Ra quyết định'],
    period: ['Monthly / Quarterly', 'Theo tháng / quý'],
    name: ['Consulting & Strategy', 'Tư vấn & Chiến lược'],
    description: [
      'Expert guidance and a decision-ready roadmap before your business commits budget or resources.',
      'Tư vấn chuyên môn và lộ trình rõ ràng trước khi doanh nghiệp phân bổ ngân sách hoặc nguồn lực.',
    ],
    features: [
      ['Digital strategy consultation', 'Tư vấn chiến lược số'],
      ['Market analysis and research', 'Phân tích và nghiên cứu thị trường'],
      ['Conversion audits', 'Đánh giá khả năng chuyển đổi'],
      ['Custom roadmap development', 'Xây dựng lộ trình riêng'],
    ],
  },
];

const Bilingual = ({ as = 'span', en, vi, children, ...props }) => (
  createElement(as, { 'data-en': en, 'data-vi': vi, 'data-default': 'en', ...props }, children ?? en)
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4 9.3 3 2.8 7-7" />
  </svg>
);

const AddOnPicker = ({ item, selectedAddOns, onToggle }) => {
  if (!item.addOns) return null;

  return (
    <div className="packages-hub__addons">
      <Bilingual as="p" en="Optional add-ons" vi="Hạng mục bổ sung tùy chọn" />
      <div>
        {item.addOns.map(([addOnEn, addOnVi]) => {
          const key = `${item.id}:${addOnEn}`;
          const selected = selectedAddOns.has(key);
          return (
            <button key={addOnEn} type="button" aria-pressed={selected} onClick={() => onToggle(key)}>
              <span className="packages-hub__addon-icon" aria-hidden="true">{selected ? '✓' : '+'}</span>
              <Bilingual en={addOnEn} vi={addOnVi} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PackageCard = ({ item, selectedAddOns, onToggleAddOn, contactHref }) => (
  <article className="packages-hub__plan">
    <header>
      <Bilingual className="packages-hub__stage" en={item.stage[0]} vi={item.stage[1]} />
      <Bilingual className="packages-hub__period" en={item.period[0]} vi={item.period[1]} />
    </header>
    <Bilingual as="h3" en={item.name[0]} vi={item.name[1]} />
    <Bilingual as="p" className="packages-hub__plan-description" en={item.description[0]} vi={item.description[1]} />
    <ul>
      {item.features.map(([featureEn, featureVi]) => (
        <li key={featureEn}><CheckIcon /><Bilingual en={featureEn} vi={featureVi} /></li>
      ))}
    </ul>
    <AddOnPicker item={item} selectedAddOns={selectedAddOns} onToggle={onToggleAddOn} />
    <Link to={contactHref} className="packages-hub__plan-link">
      <Bilingual en="Discuss this package" vi="Trao đổi về gói này" /> <ArrowIcon />
    </Link>
  </article>
);

const PackagesShowcase = () => {
  const [selectedAddOns, setSelectedAddOns] = useState(() => new Set());
  const featured = packages.find((item) => item.popular);
  const standardPackages = packages.filter((item) => !item.popular);

  const toggleAddOn = (key) => setSelectedAddOns((current) => {
    const next = new Set(current);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });

  const contactHref = (item) => {
    const addOns = [...selectedAddOns]
      .filter((key) => key.startsWith(`${item.id}:`))
      .map((key) => key.split(':').slice(1).join(':'));
    const params = new URLSearchParams({ package: item.name[0] });
    if (addOns.length) params.set('addons', addOns.join(', '));
    return `/contact?${params.toString()}`;
  };

  const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat'));

  return (
    <main className="theme-synced-page packages-hub">
      <section className="packages-hub__hero" aria-labelledby="packages-title">
        <div className="packages-hub__container packages-hub__hero-grid">
          <div className="packages-hub__intro">
            <nav aria-label="Breadcrumb">
              <Bilingual as={Link} to="/" en="Home" vi="Trang chủ" />
              <span aria-hidden="true">/</span>
              <Bilingual en="Packages" vi="Gói dịch vụ" />
            </nav>
            <Bilingual as="p" className="packages-hub__label" en="Flexible service packages" vi="Gói dịch vụ linh hoạt" />
            <Bilingual as="h1" id="packages-title" en="Choose the system your next stage needs." vi="Chọn hệ thống phù hợp với giai đoạn tiếp theo của doanh nghiệp." />
            <Bilingual
              as="p"
              className="packages-hub__lede"
              en="Start with a clear business outcome—not a list of disconnected deliverables. Every package can connect website, content, acquisition and automation into one measurable growth system."
              vi="Bắt đầu từ một kết quả kinh doanh rõ ràng — không phải danh sách đầu việc rời rạc. Mỗi gói có thể kết nối website, nội dung, thu hút khách hàng và tự động hóa thành một hệ thống tăng trưởng có thể đo lường."
            />
            <div className="packages-hub__hero-actions">
              <Link to="/contact" className="packages-hub__primary-action"><Bilingual en="Get a tailored recommendation" vi="Nhận đề xuất phù hợp" /> <ArrowIcon /></Link>
              <Bilingual as="a" href="#packages" en="Explore all packages" vi="Xem tất cả gói dịch vụ" />
            </div>
          </div>

          <aside className="packages-hub__engine" aria-label="Connected Growth Engine">
            <header><span aria-hidden="true" /><Bilingual as="h2" en="Connected Growth Engine" vi="Hệ thống tăng trưởng kết nối" /></header>
            <Bilingual as="p" en="One operating model. Four connected capabilities." vi="Một mô hình vận hành. Bốn năng lực được kết nối." />
            <ol>
              <li><Bilingual as="strong" en="Build trust" vi="Xây dựng niềm tin" /><Bilingual en="Website and brand foundation" vi="Nền tảng website và thương hiệu" /></li>
              <li><Bilingual as="strong" en="Attract demand" vi="Thu hút nhu cầu" /><Bilingual en="SEO, ads and content" vi="SEO, quảng cáo và nội dung" /></li>
              <li><Bilingual as="strong" en="Convert leads" vi="Chuyển đổi khách hàng tiềm năng" /><Bilingual en="Chatbot and sales automation" vi="Chatbot và tự động hóa bán hàng" /></li>
              <li><Bilingual as="strong" en="Measure growth" vi="Đo lường tăng trưởng" /><Bilingual en="Analytics and optimization" vi="Phân tích và tối ưu" /></li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="packages-hub__guide" aria-labelledby="package-guide-title">
        <div className="packages-hub__container">
          <div className="packages-hub__guide-intro">
            <Bilingual as="h2" id="package-guide-title" en="Start from the bottleneck." vi="Bắt đầu từ nhu cầu của bạn." />
            <Bilingual as="p" en="You do not need everything at once. Choose the stage that is holding growth back today." vi="Bạn không cần triển khai mọi thứ cùng lúc. Hãy chọn giai đoạn đang kìm hãm tăng trưởng hôm nay." />
          </div>
          <div className="packages-hub__guide-steps">
            <div><Bilingual as="strong" en="Need credibility?" vi="Cần tăng uy tín?" /><Bilingual en="Start with Launch." vi="Bắt đầu với Khởi động." /></div>
            <div><Bilingual as="strong" en="Need more demand?" vi="Cần thêm nhu cầu?" /><Bilingual en="Choose Create or Measure." vi="Chọn Sáng tạo hoặc Đo lường." /></div>
            <div><Bilingual as="strong" en="Need one operating team?" vi="Cần một đội ngũ vận hành thống nhất?" /><Bilingual en="Move to Scale." vi="Chuyển sang Mở rộng." /></div>
          </div>
        </div>
      </section>

      <section className="packages-hub__plans" id="packages" aria-labelledby="plans-title">
        <div className="packages-hub__container">
          <header className="packages-hub__section-head">
            <div>
              <Bilingual as="h2" id="plans-title" en="Packages built around outcomes." vi="Các gói được xây dựng theo kết quả." />
              <Bilingual as="p" en="Every scope is clarified before work begins. Add-ons stay optional and selected choices follow you into the contact form." vi="Mọi phạm vi đều được làm rõ trước khi bắt đầu. Hạng mục bổ sung luôn tùy chọn và lựa chọn của bạn sẽ được chuyển sang biểu mẫu liên hệ." />
            </div>
            <button type="button" onClick={openChat}><Bilingual en="Ask Unitrux to help me choose" vi="Nhờ Unitrux tư vấn chọn gói" /></button>
          </header>

          <article className="packages-hub__featured-plan">
            <div className="packages-hub__featured-summary">
              <div className="packages-hub__featured-top">
                <Bilingual en="Recommended" vi="Đề xuất" />
                <Bilingual en={featured.period[0]} vi={featured.period[1]} />
              </div>
              <Bilingual as="p" className="packages-hub__stage" en={featured.stage[0]} vi={featured.stage[1]} />
              <Bilingual as="h2" en={featured.name[0]} vi={featured.name[1]} />
              <Bilingual as="p" en={featured.description[0]} vi={featured.description[1]} />
              <Link to={contactHref(featured)} className="packages-hub__primary-action"><Bilingual en="Discuss the full operation plan" vi="Trao đổi về gói vận hành toàn diện" /> <ArrowIcon /></Link>
            </div>
            <div className="packages-hub__featured-scope">
              <Bilingual as="h3" en="What the team operates" vi="Phạm vi đội ngũ vận hành" />
              <ul>
                {featured.features.map(([featureEn, featureVi]) => (
                  <li key={featureEn}><CheckIcon /><Bilingual en={featureEn} vi={featureVi} /></li>
                ))}
              </ul>
              <AddOnPicker item={featured} selectedAddOns={selectedAddOns} onToggle={toggleAddOn} />
            </div>
          </article>

          <div className="packages-hub__plan-grid">
            {standardPackages.map((item) => (
              <PackageCard key={item.id} item={item} selectedAddOns={selectedAddOns} onToggleAddOn={toggleAddOn} contactHref={contactHref(item)} />
            ))}
          </div>
        </div>
      </section>

      <section className="packages-hub__assurance" aria-labelledby="assurance-title">
        <div className="packages-hub__container">
          <div>
            <Bilingual as="h2" id="assurance-title" en="Clear before you commit." vi="Rõ ràng trước khi cam kết." />
            <Bilingual as="p" en="Unitrux scopes the work around your operating reality, not a generic checklist." vi="Unitrux xác định phạm vi theo thực tế vận hành của bạn, không dùng danh sách kiểm tra chung." />
          </div>
          <dl>
            <div><Bilingual as="dt" en="Defined scope" vi="Phạm vi xác định" /><Bilingual as="dd" en="Deliverables, ownership and timelines agreed before kickoff." vi="Hạng mục, trách nhiệm và tiến độ được thống nhất trước khi bắt đầu." /></div>
            <div><Bilingual as="dt" en="Measurable baseline" vi="Mốc đo lường rõ ràng" /><Bilingual as="dd" en="Tracking and success signals established from the start." vi="Thiết lập theo dõi và tín hiệu thành công ngay từ đầu." /></div>
            <div><Bilingual as="dt" en="Flexible expansion" vi="Mở rộng linh hoạt" /><Bilingual as="dd" en="Add specialist capabilities only when they create leverage." vi="Chỉ bổ sung năng lực chuyên môn khi thực sự tạo đòn bẩy." /></div>
          </dl>
        </div>
      </section>

      <section className="packages-hub__cta" aria-labelledby="packages-cta-title">
        <div className="packages-hub__container">
          <div>
            <Bilingual as="h2" id="packages-cta-title" en="Not sure which package fits?" vi="Chưa chắc gói nào phù hợp?" />
            <Bilingual as="p" en="Tell us where growth is stuck. We will recommend the smallest useful scope." vi="Chia sẻ nơi tăng trưởng đang gặp trở ngại. Chúng tôi sẽ đề xuất phạm vi nhỏ nhất nhưng hữu ích." />
          </div>
          <div>
            <Link to="/contact" className="packages-hub__primary-action"><Bilingual en="Build my scope" vi="Xây dựng phạm vi phù hợp" /> <ArrowIcon /></Link>
            <button type="button" onClick={openChat}><Bilingual en="Chat with Unitrux" vi="Trao đổi với Unitrux" /></button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PackagesShowcase;
