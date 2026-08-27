import { createElement, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { mediaGroups, mediaOverview, mediaAddOns, mediaPricingCopy } from '../data/mediaPricing';
import { productionBehindTheScenes } from '../data/productionPortfolio';
import { SEO_LAST_MODIFIED } from '../seo/seoConfig';

const Bilingual = ({ as = 'span', en, vi, children, ...props }) => (
  createElement(as, { 'data-en': en, 'data-vi': vi, 'data-default': 'vi', ...props }, children ?? vi)
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
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

const OverviewCard = ({ item }) => (
  <article className="packages-hub__media-overview-card">
    <Bilingual as="h3" en={item.titleEn} vi={item.titleVi} />
    <Bilingual as="p" className="packages-hub__tier-price" en={mediaPricingCopy.priceLabelEn(item.price, item.unitEn)} vi={mediaPricingCopy.priceLabelVi(item.price, item.unit)} />
    <Bilingual as="p" className="packages-hub__tier-audience" en={item.descEn} vi={item.descVi} />
    <a href="#media-groups" className="packages-hub__tier-cta">
      <Bilingual en={item.ctaEn} vi={item.ctaVi} /> <ArrowIcon />
    </a>
  </article>
);

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

const MediaGroupBlock = ({ group, registerRef }) => (
  <section
    ref={(el) => registerRef(group.id, el)}
    className="packages-hub__service-block"
    aria-labelledby={`media-group-${group.id}`}
    id={`group-${group.id}`}
    style={{ scrollMarginTop: '7rem' }}
  >
    <header className="packages-hub__service-head">
      <Bilingual as="h3" id={`media-group-${group.id}`} en={group.titleEn} vi={group.titleVi} />
    </header>
    <div className="packages-hub__tier-grid">
      {group.packages.map((pkg, index) => (
        <MediaPackageCard key={pkg.name} group={group} pkg={pkg} featured={index === 0} />
      ))}
    </div>
  </section>
);

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
    <main className="theme-synced-page packages-hub">
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

      <section className="packages-hub__plans" aria-labelledby="media-overview-title">
        <div className="packages-hub__container">
          <header className="packages-hub__section-head">
            <div>
              <Bilingual as="h2" id="media-overview-title" en="Start here" vi="Bắt đầu từ đâu" />
              <Bilingual as="p" en={mediaPricingCopy.conventionEn} vi={mediaPricingCopy.conventionVi} />
            </div>
          </header>
          <div className="packages-hub__media-overview-grid">
            {mediaOverview.map((item) => (
              <OverviewCard key={item.titleVi} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="packages-hub__plans" id="media-groups" aria-labelledby="media-groups-title">
        <div className="packages-hub__container">
          <header className="packages-hub__section-head">
            <div>
              <Bilingual as="h2" id="media-groups-title" en="Every package, by group" vi="Toàn bộ các gói, theo từng nhóm" />
              <Bilingual as="p" en="17 packages across 8 groups — full detail, no hidden tiers." vi="17 gói trong 8 nhóm dịch vụ — hiển thị đầy đủ, không ẩn mức giá nào." />
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
