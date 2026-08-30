import { createElement, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  mediaGroups, mediaAddOns, mediaPricingCopy,
  mediaPriceInclusions, mediaBriefSteps, mediaQuoteExamples,
  mediaMarketContext, mediaWorkflow, mediaValueProps, mediaCostFactors,
} from '../data/mediaPricing';
import { productionBehindTheScenes } from '../data/productionPortfolio';
import { SEO_LAST_MODIFIED } from '../seo/seoConfig';
import { DirectAnswer, ServiceProcess } from './service/ServiceSections';
import RelatedContent from './service/RelatedContent';
import PricingBriefForm from './PricingBriefForm';
import './MediaPricingExtras.css';

const fmtVnd = (n) => `${Number(n).toLocaleString('vi-VN')}đ`;

const Bilingual = ({ as = 'span', en, vi, children, ...props }) => (
  createElement(as, { 'data-en': en, 'data-vi': vi, 'data-default': 'vi', ...props }, children ?? vi)
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4 10.5 4 4 8-9" />
  </svg>
);

// Line icons for the workflow / value / cost-factor cards.
const stepIcons = [
  <path key="1" d="M4 5h12M4 10h12M4 15h8" />,
  <path key="2" d="M4 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8l-4 3z" />,
  <path key="3" d="M3 15V7l4-3 6 3 4-2v9l-4 2-6-3z M9 7v9" />,
  <path key="4" d="M4 10a6 6 0 1 0 12 0 6 6 0 0 0-12 0z m3 0 2 2 4-4" />,
];
const factorIcons = [
  <path key="a" d="M3 5h14M3 10h9M3 15h5" />,
  <path key="b" d="M10 3c3 3 4.5 5.5 4.5 8a4.5 4.5 0 0 1-9 0C5.5 8.5 7 6 10 3z" />,
  <path key="c" d="M4 4h12v12H4z M4 9h12 M9 4v12" />,
  <path key="d" d="M6 4h8l2 3-6 9-6-9z" />,
  <path key="e" d="M10 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6z M4 17c1-3 3.5-4.5 6-4.5S15 14 16 17" />,
  <path key="f" d="M10 3v14M3 10h14M6 6l8 8M14 6l-8 8" />,
];

const IconTile = ({ paths }) => (
  <span className="mp-tile" aria-hidden="true">
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths}
    </svg>
  </span>
);

const MarketContext = () => (
  <section className="packages-hub__plans mp-extra" aria-labelledby="media-context-title">
    <div className="packages-hub__container">
      <div className="mp-context">
        <Bilingual as="h2" id="media-context-title" en={mediaMarketContext.headingEn} vi={mediaMarketContext.headingVi} />
        <ul className="mp-context__list">
          {mediaMarketContext.items.map((item, i) => (
            <li key={i}>
              <span className="mp-context__mark" aria-hidden="true"><CheckIcon /></span>
              <Bilingual as="span" en={item.en} vi={item.vi} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const Workflow = () => (
  <section className="packages-hub__plans mp-extra" aria-labelledby="media-workflow-title">
    <div className="packages-hub__container">
      <header className="packages-hub__section-head">
        <div>
          <Bilingual as="h2" id="media-workflow-title" en={mediaWorkflow.headingEn} vi={mediaWorkflow.headingVi} />
          <Bilingual as="p" en={mediaWorkflow.leadEn} vi={mediaWorkflow.leadVi} />
        </div>
      </header>
      <div className="mp-flow">
        {mediaWorkflow.steps.map((step, i) => (
          <article className="mp-flow__card" key={i}>
            <IconTile paths={stepIcons[i]} />
            <Bilingual as="h3" en={step.titleEn} vi={step.titleVi} />
            <Bilingual as="p" en={step.descEn} vi={step.descVi} />
          </article>
        ))}
        <article className="mp-flow__card mp-flow__card--custom">
          <Bilingual as="h3" en={mediaWorkflow.custom.titleEn} vi={mediaWorkflow.custom.titleVi} />
          <Bilingual as="p" en={mediaWorkflow.custom.descEn} vi={mediaWorkflow.custom.descVi} />
          <Link to="/contact" className="mp-flow__link">
            <Bilingual en={mediaWorkflow.custom.ctaEn} vi={mediaWorkflow.custom.ctaVi} /> <ArrowIcon />
          </Link>
        </article>
      </div>
    </div>
  </section>
);

const ValueProps = () => (
  <section className="packages-hub__plans mp-extra" aria-labelledby="media-value-title">
    <div className="packages-hub__container">
      <header className="packages-hub__section-head">
        <div>
          <Bilingual as="h2" id="media-value-title" en={mediaValueProps.headingEn} vi={mediaValueProps.headingVi} />
          <Bilingual as="p" en={mediaValueProps.leadEn} vi={mediaValueProps.leadVi} />
        </div>
      </header>
      <div className="mp-value">
        {mediaValueProps.items.map((item, i) => (
          <article className="mp-value__card" key={i}>
            <Bilingual as="h3" en={item.titleEn} vi={item.titleVi} />
            <ul>
              {item.pointsVi.map((vi, j) => (
                <li key={j} data-vi={vi} data-en={item.pointsEn[j]}>{item.pointsEn[j]}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const CostFactorsGrid = () => (
  <section className="packages-hub__plans mp-extra" aria-labelledby="media-factors-title">
    <div className="packages-hub__container">
      <header className="packages-hub__section-head">
        <div>
          <Bilingual as="h2" id="media-factors-title" en={mediaCostFactors.headingEn} vi={mediaCostFactors.headingVi} />
          <Bilingual as="p" en={mediaCostFactors.leadEn} vi={mediaCostFactors.leadVi} />
        </div>
      </header>
      <div className="mp-factors">
        {mediaCostFactors.items.map((item, i) => (
          <article className="mp-factors__card" key={i}>
            <IconTile paths={factorIcons[i]} />
            <div>
              <Bilingual as="h3" en={item.titleEn} vi={item.titleVi} />
              <Bilingual as="p" en={item.hintEn} vi={item.hintVi} />
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const contactHref = (groupTitle, packageName) => {
  const params = new URLSearchParams({ package: `${groupTitle} — ${packageName}` });
  return `/contact?${params.toString()}`;
};

const heroPhotoIds = ['bts-onsite-branding', 'bts-event-wide'];
const heroPhotos = heroPhotoIds
  .map((id) => productionBehindTheScenes.find((photo) => photo.id === id))
  .filter(Boolean);

const faqs = [
  {
    qVi: 'Giá trên đã bao gồm VAT chưa?',
    qEn: 'Do these prices include VAT?',
    aVi: 'Chưa. Giá trên chưa bao gồm VAT (nếu áp dụng) — thuế và chứng từ sẽ được thể hiện rõ theo báo giá và hợp đồng chính thức.',
    aEn: 'No. The prices above exclude VAT (where applicable) — tax and invoicing are stated clearly in the official quote and contract.',
  },
  {
    qVi: 'Có thể kết hợp nhiều gói trong cùng một buổi quay không?',
    qEn: 'Can multiple packages be combined in one shoot?',
    aVi: 'Có. Nhóm Combo Media (Photo + 3 Reels, Campaign Media Day) được thiết kế riêng để gộp ảnh và video trong cùng một buổi — tiết kiệm thời gian hơn đặt từng gói riêng lẻ.',
    aEn: 'Yes. The Combo Media group (Photo + 3 Reels, Campaign Media Day) is built specifically to bundle photo and video in one session — faster than booking each separately.',
  },
  {
    qVi: 'Chưa biết chọn gói nào thì sao?',
    qEn: "What if I don't know which package to pick?",
    aVi: 'Chia sẻ sản phẩm, không gian hoặc mục tiêu quay dựng — Unitrux sẽ đề xuất gói và concept phù hợp trước khi báo giá chính thức.',
    aEn: 'Share your product, space, or shoot goal — Unitrux will recommend a matching package and concept before the official quote.',
  },
  {
    qVi: 'Cần thêm giờ quay hoặc hậu kỳ ngoài gói thì tính thế nào?',
    qEn: 'How is extra time or post-production beyond a package priced?',
    aVi: 'Xem bảng "Add-on Media" ngay bên dưới — mỗi hạng mục phát sinh (giờ quay thêm, hậu kỳ, tỷ lệ khung hình, vòng chỉnh sửa...) đều có giá tham khảo riêng.',
    aEn: 'See the "Media add-ons" table below — each extra item (additional hours, editing, aspect ratios, revision rounds...) has its own reference price.',
  },
];

const MediaPackageCard = ({ group, pkg, featured }) => (
  <article className={`packages-hub__tier-card packages-hub__media-card${featured ? ' packages-hub__tier-card--featured' : ''}`}>
    {featured && (
      <Bilingual as="span" className="packages-hub__tier-tag" en="Start here" vi="Bắt đầu ở đây" />
    )}
    <header>
      <h4>{pkg.nameEn ? <Bilingual en={pkg.nameEn} vi={pkg.name} /> : pkg.name}</h4>
      <Bilingual as="p" className="packages-hub__tier-price" en={mediaPricingCopy.priceLabelEn(pkg.price, pkg.unitEn)} vi={mediaPricingCopy.priceLabelVi(pkg.price, pkg.unit)} />
    </header>
    <dl className="packages-hub__media-meta">
      <div><Bilingual as="dt" en="Duration" vi="Thời lượng" /><Bilingual as="dd" en={pkg.durationEn} vi={pkg.durationVi} /></div>
      <div><Bilingual as="dt" en="Output" vi="Đầu ra" /><Bilingual as="dd" en={pkg.outputEn} vi={pkg.outputVi} /></div>
    </dl>
    <Bilingual as="p" className="packages-hub__tier-audience" en={pkg.audienceEn} vi={pkg.audienceVi} />
    <Bilingual as="p" className="packages-hub__media-includes" en={pkg.includesEn} vi={pkg.includesVi} />
    <Bilingual as="p" className="packages-hub__tier-excludes" en={pkg.excludesEn} vi={pkg.excludesVi} />
    <Link to={contactHref(group.titleVi, pkg.name)} className="packages-hub__tier-cta">
      <Bilingual en={pkg.ctaEn} vi={pkg.ctaVi} /> <ArrowIcon />
    </Link>
  </article>
);

const groupPriceRange = (group) => {
  const prices = group.packages.map((p) => p.price).filter(Boolean);
  return prices.length ? Math.min(...prices) : null;
};

const MediaGroupBlock = ({ group, registerRef }) => {
  const low = groupPriceRange(group);
  return (
    <section
      ref={(el) => registerRef(group.id, el)}
      className="packages-hub__service-block"
      aria-labelledby={`media-group-${group.id}`}
      id={`group-${group.id}`}
      style={{ scrollMarginTop: '7rem' }}
    >
      <header className="packages-hub__service-head">
        <Bilingual as="h3" id={`media-group-${group.id}`} en={group.titleEn} vi={group.titleVi} />
        {low && (
          <span className="packages-hub__group-fold-meta">
            <Bilingual en={`${group.packages.length} packages · from ${fmtVnd(low)}`} vi={`${group.packages.length} gói · từ ${fmtVnd(low)}`} />
          </span>
        )}
      </header>
      <div className="packages-hub__tier-grid">
        {group.packages.map((pkg, index) => (
          <MediaPackageCard key={pkg.name} group={group} pkg={pkg} featured={index === 0} />
        ))}
      </div>
    </section>
  );
};

const AddOnRow = ({ item }) => (
  <tr>
    <Bilingual as="td" en={item.nameEn} vi={item.nameVi} />
    <td>
      {item.hardPrice ? (
        <Bilingual en={`From ${item.price.toLocaleString('en-US')}₫/${item.unitEn}`} vi={`Từ ${item.price.toLocaleString('vi-VN')}đ/${item.unit}`} />
      ) : (
        <Bilingual en="Quoted separately" vi="Báo giá riêng" />
      )}
    </td>
    <Bilingual as="td" className="packages-hub__addon-note" en={item.noteEn} vi={item.noteVi} />
  </tr>
);

const MediaPricingShowcase = () => {
  const [activeGroup, setActiveGroup] = useState(mediaGroups[0]?.id);
  const sectionRefs = useRef({});

  const registerRef = (id, el) => {
    if (el) sectionRefs.current[id] = el;
  };

  const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat'));

  useEffect(() => {
    const sections = Object.values(sectionRefs.current);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = Object.keys(sectionRefs.current).find((key) => sectionRefs.current[key] === visible.target);
          if (id) setActiveGroup(id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="theme-synced-page packages-hub packages-hub--media">
      <section className="packages-hub__hero packages-hub__hero--media" aria-labelledby="media-pricing-title">
        <div className="packages-hub__container packages-hub__hero-grid">
          <div className="packages-hub__intro">
            <nav aria-label="Breadcrumb">
              <Bilingual as={Link} to="/" en="Home" vi="Trang chủ" />
              <span aria-hidden="true">/</span>
              <Bilingual as={Link} to="/packages" en="Pricing" vi="Bảng giá" />
              <span aria-hidden="true">/</span>
              <Bilingual en="Media" vi="Quay chụp" />
            </nav>
            <Bilingual as="p" className="packages-hub__label" en="8 groups, 17 packages" vi="8 nhóm, 17 gói dịch vụ" />
            <Bilingual as="h1" id="media-pricing-title" en={mediaPricingCopy.titleEn} vi={mediaPricingCopy.titleVi} />
            <Bilingual as="p" className="packages-hub__lede" en={mediaPricingCopy.introEn} vi={mediaPricingCopy.introVi} />
            <Bilingual as="p" className="packages-hub__updated-note" en={`Prices last reviewed ${SEO_LAST_MODIFIED}`} vi={`Giá cập nhật lần cuối ${SEO_LAST_MODIFIED}`} />
            <div className="packages-hub__hero-actions">
              <Link to="/contact" className="packages-hub__primary-action"><Bilingual en="Get a shoot quote" vi="Nhận báo giá quay chụp" /> <ArrowIcon /></Link>
              <a href="#media-groups"><Bilingual en="See every package" vi="Xem tất cả các gói" /></a>
            </div>
          </div>

          <aside className="packages-hub__media-hero-strip" aria-label="Real Unitrux production work">
            {heroPhotos.map((photo) => (
              <figure key={photo.id}>
                <img src={photo.src} alt={photo.labelEn} loading="lazy" />
                <figcaption data-en={photo.labelEn} data-vi={photo.labelVi} data-default="vi">{photo.labelVi}</figcaption>
              </figure>
            ))}
          </aside>
        </div>
      </section>

      <MarketContext />

      <DirectAnswer
        questionVi="Giá quay video và chụp ảnh tại TP.HCM được tính như thế nào?"
        questionEn="How is video and photography pricing worked out in Ho Chi Minh City?"
        answerVi="Đây là bảng giá tham khảo để doanh nghiệp dự trù ngân sách quay video và chụp ảnh tại TP.HCM, không phải giá cố định. Giá chính thức của Unitrux phụ thuộc vào concept, số lượng sản phẩm, số ảnh và số video, thời lượng, số bối cảnh, việc có dùng studio, người mẫu, voice-over, motion graphics, mức độ hậu kỳ, số lần chỉnh sửa, tỷ lệ xuất file và deadline. Để nhận báo giá chính xác, gửi brief qua form bên dưới hoặc Zalo — Unitrux sẽ trả về báo giá tách rõ từng hạng mục."
        answerEn="This is a reference price list for planning a video or photography budget in Ho Chi Minh City — not a fixed rate. Unitrux's official price depends on the concept, number of products, photo and video counts, duration, number of sets, whether a studio, models, voice-over or motion graphics are used, the level of post-production, revision rounds, exported aspect ratios and the deadline. For an exact quote, send a brief via the form below or on Zalo — Unitrux replies with an itemized quotation."
      />

      <nav className="packages-hub__group-nav" aria-label="Jump to a package group">
        <div className="packages-hub__container packages-hub__group-nav-scroller">
          {mediaGroups.map((group) => (
            <a
              key={group.id}
              href={`#group-${group.id}`}
              className={`packages-hub__group-pill${activeGroup === group.id ? ' packages-hub__group-pill--active' : ''}`}
            >
              <Bilingual en={group.titleEn} vi={group.titleVi} />
            </a>
          ))}
        </div>
      </nav>

      <Workflow />

      <section className="packages-hub__plans" id="media-groups" aria-labelledby="media-groups-title">
        <div className="packages-hub__container">
          <header className="packages-hub__section-head">
            <div>
              <Bilingual as="h2" id="media-groups-title" en="Every package, by group" vi="Toàn bộ các gói, theo từng nhóm" />
              <Bilingual as="p" en={mediaPricingCopy.conventionEn} vi={mediaPricingCopy.conventionVi} />
            </div>
            <button type="button" onClick={openChat}><Bilingual en="Ask Unitrux to help me choose" vi="Nhờ Unitrux tư vấn chọn gói" /></button>
          </header>

          {mediaGroups.map((group) => (
            <MediaGroupBlock key={group.id} group={group} registerRef={registerRef} />
          ))}
        </div>
      </section>

      <section className="packages-hub__addons" aria-labelledby="media-addons-title">
        <div className="packages-hub__container">
          <header className="packages-hub__section-head">
            <div>
              <Bilingual as="h2" id="media-addons-title" en="Media add-ons" vi="Add-on Media" />
              <Bilingual as="p" en="Extra hours, retouching, formats, and equipment beyond a package's scope." vi="Giờ quay bổ sung, hậu kỳ, định dạng và thiết bị ngoài phạm vi gói chính." />
            </div>
          </header>
          <div className="packages-hub__addon-table-wrap">
            <table className="packages-hub__addon-table">
              <thead>
                <tr>
                  <Bilingual as="th" en="Item" vi="Hạng mục" />
                  <Bilingual as="th" en="Price" vi="Giá" />
                  <Bilingual as="th" en="Note" vi="Ghi chú" />
                </tr>
              </thead>
              <tbody>
                {mediaAddOns.map((item, index) => (
                  <AddOnRow key={index} item={item} />
                ))}
              </tbody>
            </table>
          </div>
          <Bilingual as="p" className="packages-hub__footnote" en={mediaPricingCopy.quayChupNoteEn} vi={mediaPricingCopy.quayChupNoteVi} />
        </div>
      </section>

      <ValueProps />

      <section className="packages-hub__plans mp-extra" aria-labelledby="media-inclusions-title">
        <div className="packages-hub__container">
          <header className="packages-hub__section-head">
            <div>
              <Bilingual as="h2" id="media-inclusions-title" en="What every price includes — and what is quoted on top" vi="Chi phí đã bao gồm và chưa bao gồm những gì" />
              <Bilingual as="p" en="Every package price already covers the items on the left. The items on the right are quoted separately when a project needs them." vi="Mỗi mức giá gói đã bao gồm các mục bên trái. Các mục bên phải được báo giá riêng khi dự án cần đến." />
            </div>
          </header>
          <div className="mp-incl">
            <div className="mp-incl__col">
              <Bilingual as="h3" en="Included in the package price" vi="Đã bao gồm trong giá gói" />
              <ul className="mp-incl__list mp-incl__list--yes">
                {mediaPriceInclusions.includedVi.map((vi, i) => (
                  <li key={i} data-vi={vi} data-en={mediaPriceInclusions.includedEn[i]}>{mediaPriceInclusions.includedEn[i]}</li>
                ))}
              </ul>
            </div>
            <div className="mp-incl__col">
              <Bilingual as="h3" en="Quoted separately" vi="Báo giá riêng" />
              <ul className="mp-incl__list mp-incl__list--no">
                {mediaPriceInclusions.excludedVi.map((vi, i) => (
                  <li key={i} data-vi={vi} data-en={mediaPriceInclusions.excludedEn[i]}>{mediaPriceInclusions.excludedEn[i]}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="packages-hub__plans mp-extra" aria-labelledby="media-examples-title">
        <div className="packages-hub__container">
          <header className="packages-hub__section-head">
            <div>
              <Bilingual as="h2" id="media-examples-title" en="How a quote comes together — worked examples" vi="Ví dụ cách hình thành một báo giá" />
              <Bilingual as="p" en="Each example combines a published package with published add-on lines so the arithmetic is transparent. These are illustrations, not price commitments." vi="Mỗi ví dụ ghép một gói và các dòng add-on đã công bố để bạn thấy rõ cách cộng. Đây là ví dụ minh hoạ, không phải báo giá cam kết." />
            </div>
          </header>
          <div className="mp-examples">
            {mediaQuoteExamples.map((ex, i) => {
              const total = ex.lines.reduce((s, l) => s + l.amount, 0);
              return (
                <article className="mp-example" key={i}>
                  <Bilingual as="h3" en={ex.titleEn} vi={ex.titleVi} />
                  <table className="mp-example__table">
                    <tbody>
                      {ex.lines.map((line, j) => (
                        <tr key={j}>
                          <td data-vi={line.labelVi} data-en={line.labelEn}>{line.labelEn}</td>
                          <td className="mp-example__amt">{fmtVnd(line.amount)}</td>
                        </tr>
                      ))}
                      <tr className="mp-example__total">
                        <td><Bilingual en="Illustrative subtotal" vi="Tạm tính minh hoạ" /></td>
                        <td className="mp-example__amt">{fmtVnd(total)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Bilingual as="p" className="mp-example__note" en={ex.disclaimerEn} vi={ex.disclaimerVi} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CostFactorsGrid />

      <ServiceProcess
        id="media-brief-steps"
        titleVi="Quy trình sản xuất – minh bạch"
        titleEn="A transparent production process"
        leadVi="Đơn giản – Rõ ràng – Hiệu quả."
        leadEn="Simple, clear, effective."
        steps={mediaBriefSteps}
      />

      <section className="packages-hub__plans mp-extra" aria-labelledby="media-brief-form-title">
        <div className="packages-hub__container">
          <PricingBriefForm headingId="media-brief-form-title" />
        </div>
      </section>

      <section className="packages-hub__notes" aria-labelledby="media-faq-title">
        <div className="packages-hub__container">
          <Bilingual as="h2" id="media-faq-title" en="Frequently asked questions" vi="Câu hỏi thường gặp" />
          <div className="packages-hub__faq-list">
            {faqs.map((faq) => (
              <details key={faq.qVi} className="packages-hub__faq-item">
                <summary data-en={faq.qEn} data-vi={faq.qVi} data-default="vi">{faq.qVi}</summary>
                <p data-en={faq.aEn} data-vi={faq.aVi} data-default="vi">{faq.aVi}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedContent path="/media-pricing" />

      <section className="packages-hub__cta" aria-labelledby="media-cta-title">
        <div className="packages-hub__container">
          <div>
            <Bilingual as="h2" id="media-cta-title" en="Have a product or space in mind?" vi="Đã có sản phẩm hoặc không gian cần quay chụp?" />
            <Bilingual as="p" en="Share your product, space, or footage need — Unitrux will recommend the right package and concept." vi="Chia sẻ sản phẩm, không gian hoặc nhu cầu quay dựng — Unitrux sẽ đề xuất gói và concept phù hợp." />
          </div>
          <div>
            <Link to="/contact" className="packages-hub__primary-action"><Bilingual en="Get a shoot quote" vi="Nhận báo giá quay chụp" /> <ArrowIcon /></Link>
            <button type="button" onClick={openChat}><Bilingual en="Chat with Unitrux" vi="Trao đổi với Unitrux" /></button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MediaPricingShowcase;
