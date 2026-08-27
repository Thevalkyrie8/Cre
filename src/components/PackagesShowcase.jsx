import { createElement } from 'react';
import { Link } from 'react-router-dom';
import { packageGroups, addOns, pricingCopy } from '../data/packagesPricing';
import { SEO_LAST_MODIFIED } from '../seo/seoConfig';

const Bilingual = ({ as = 'span', en, vi, children, ...props }) => (
  createElement(as, { 'data-en': en, 'data-vi': vi, 'data-default': 'vi', ...props }, children ?? vi)
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h11M11 6l4 4-4 4" />
  </svg>
);

const contactHref = (serviceTitle, tierName) => {
  const params = new URLSearchParams({ package: `${serviceTitle} — ${tierName}` });
  return `/contact?${params.toString()}`;
};

const priceLabel = (price, unit, unitEn) => ({
  vi: pricingCopy.priceLabelVi(price, unit),
  en: pricingCopy.priceLabelEn(price, unitEn),
});

const TierCard = ({ group, tier }) => {
  const label = priceLabel(tier.price, tier.unit, tier.unitEn);
  return (
    <article className="packages-hub__tier-card">
      <header>
        <h4>{tier.name}</h4>
        <Bilingual as="p" className="packages-hub__tier-price" en={label.en} vi={label.vi} />
      </header>
      <Bilingual as="p" className="packages-hub__tier-audience" en={tier.audienceEn} vi={tier.audienceVi} />
      <ul className="packages-hub__tier-includes">
        {tier.includesVi.map((item, index) => (
          <Bilingual as="li" key={index} en={tier.includesEn[index]} vi={item} />
        ))}
      </ul>
      <Bilingual as="p" className="packages-hub__tier-excludes" en={tier.excludesEn} vi={tier.excludesVi} />
      <Link to={contactHref(group.titleVi, tier.name)} className="packages-hub__tier-cta">
        <Bilingual en={tier.ctaEn} vi={tier.ctaVi} /> <ArrowIcon />
      </Link>
    </article>
  );
};

const ServiceBlock = ({ group }) => (
  <section className="packages-hub__service-block" aria-labelledby={`service-${group.number}`}>
    <header className="packages-hub__service-head">
      <div>
        <Bilingual as="span" className="packages-hub__stage" en={`Service ${group.number}`} vi={`Dịch vụ ${group.number}`} />
        <Bilingual as="h3" id={`service-${group.number}`} en={group.titleEn} vi={group.titleVi} />
      </div>
      <Link to={group.to} className="packages-hub__plan-secondary-link">
        <Bilingual en="See full service page" vi="Xem trang dịch vụ đầy đủ" />
      </Link>
    </header>
    <div className="packages-hub__tier-grid">
      {group.tiers.map((tier) => (
        <TierCard key={tier.name} group={group} tier={tier} />
      ))}
    </div>
    {(group.to === '/photography-video' || group.to === '/product-photography') && (
      <p className="packages-hub__service-more">
        <Link to="/media-pricing">
          <Bilingual en="See the full photography & video pricing list →" vi="Xem đầy đủ bảng giá quay chụp & media →" />
        </Link>
      </p>
    )}
  </section>
);

const AddOnRow = ({ item }) => (
  <tr>
    <Bilingual as="td" en={item.groupEn} vi={item.groupVi} />
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

const PackagesShowcase = () => {
  const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat'));

  return (
    <main className="theme-synced-page packages-hub">
      <section className="packages-hub__hero" aria-labelledby="packages-title">
        <div className="packages-hub__container packages-hub__hero-grid">
          <div className="packages-hub__intro">
            <nav aria-label="Breadcrumb">
              <Bilingual as={Link} to="/" en="Home" vi="Trang chủ" />
              <span aria-hidden="true">/</span>
              <Bilingual en="Pricing" vi="Bảng giá" />
            </nav>
            <Bilingual as="p" className="packages-hub__label" en="10 services, one growth system" vi="10 dịch vụ, một hệ thống tăng trưởng" />
            <Bilingual as="h1" id="packages-title" en={pricingCopy.titleEn} vi={pricingCopy.titleVi} />
            <Bilingual as="p" className="packages-hub__lede" en={pricingCopy.introEn} vi={pricingCopy.introVi} />
            <Bilingual as="p" className="packages-hub__updated-note" en={`Prices last reviewed ${SEO_LAST_MODIFIED}`} vi={`Giá cập nhật lần cuối ${SEO_LAST_MODIFIED}`} />
            <div className="packages-hub__hero-actions">
              <Link to="/contact" className="packages-hub__primary-action"><Bilingual en="Get a tailored quote" vi="Nhận báo giá" /> <ArrowIcon /></Link>
              <Bilingual as="a" href="#packages" en="Explore all pricing" vi="Xem tất cả bảng giá" />
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

          <aside className="packages-hub__spotlight" aria-label="Product photography and advertising video">
            <Bilingual as="span" className="packages-hub__label" en="Priority" vi="Ưu tiên" />
            <Bilingual as="h2" en="Product shoots & advertising video" vi="Quay chụp sản phẩm & Video quảng cáo" />
            <Bilingual as="p" en="Real photos and video are the foundation everything else is built on — start here before running ads or publishing content." vi="Hình ảnh và video thật là nền tảng cho mọi nội dung khác — nên bắt đầu từ đây trước khi chạy quảng cáo hay đăng bài." />
            <Link to="/media-pricing" className="packages-hub__spotlight-cta">
              <Bilingual en="See photography & video pricing" vi="Xem bảng giá quay chụp & video" /> <ArrowIcon />
            </Link>
          </aside>
        </div>
      </section>

      <section className="packages-hub__plans" id="packages" aria-labelledby="plans-title">
        <div className="packages-hub__container">
          <header className="packages-hub__section-head">
            <div>
              <Bilingual as="h2" id="plans-title" en="10 services, 3 tiers each. Pick where to start." vi="10 dịch vụ, mỗi dịch vụ 3 mức giá. Chọn nơi bắt đầu." />
              <Bilingual as="p" en="Every price below is a starting reference — the official quote is confirmed after we understand your scope." vi="Mọi mức giá bên dưới là giá tham khảo khởi điểm — báo giá chính thức được xác định sau khi hiểu rõ phạm vi công việc của bạn." />
            </div>
            <button type="button" onClick={openChat}><Bilingual en="Ask Unitrux to help me choose" vi="Nhờ Unitrux tư vấn chọn gói" /></button>
          </header>

          {packageGroups.map((group) => (
            <ServiceBlock key={group.to} group={group} />
          ))}
        </div>
      </section>

      <section className="packages-hub__addons" aria-labelledby="addons-title">
        <div className="packages-hub__container">
          <header className="packages-hub__section-head">
            <div>
              <Bilingual as="h2" id="addons-title" en="Add-ons & extra costs" vi="Add-on & chi phí phát sinh" />
              <Bilingual as="p" en="Used to quote work beyond a package's main scope." vi="Dùng để báo giá bổ sung khi khách có nhu cầu ngoài phạm vi gói chính." />
            </div>
          </header>
          <div className="packages-hub__addon-table-wrap">
            <table className="packages-hub__addon-table">
              <thead>
                <tr>
                  <Bilingual as="th" en="Group" vi="Nhóm" />
                  <Bilingual as="th" en="Item" vi="Hạng mục" />
                  <Bilingual as="th" en="Price" vi="Giá" />
                  <Bilingual as="th" en="Note" vi="Ghi chú" />
                </tr>
              </thead>
              <tbody>
                {addOns.map((item, index) => (
                  <AddOnRow key={index} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="packages-hub__notes" aria-labelledby="notes-title">
        <div className="packages-hub__container">
          <Bilingual as="h2" id="notes-title" en="Good to know before you commit" vi="Lưu ý trước khi quyết định" />
          <ul>
            <Bilingual as="li" en={pricingCopy.adsNoteEn} vi={pricingCopy.adsNoteVi} />
            <Bilingual as="li" en={pricingCopy.aiNoteEn} vi={pricingCopy.aiNoteVi} />
            <Bilingual as="li" en={pricingCopy.seoNoteEn} vi={pricingCopy.seoNoteVi} />
            <Bilingual as="li" en={pricingCopy.vatNoteEn} vi={pricingCopy.vatNoteVi} />
          </ul>
          <Bilingual as="p" className="packages-hub__footnote" en={pricingCopy.footnoteEn} vi={pricingCopy.footnoteVi} />
        </div>
      </section>

      <section className="packages-hub__cta" aria-labelledby="packages-cta-title">
        <div className="packages-hub__container">
          <div>
            <Bilingual as="h2" id="packages-cta-title" en="Not sure which package fits?" vi="Chưa chắc gói nào phù hợp?" />
            <Bilingual as="p" en="Tell us where growth is stuck. We will recommend the smallest useful scope." vi="Chia sẻ nơi tăng trưởng đang gặp trở ngại. Chúng tôi sẽ đề xuất phạm vi nhỏ nhất nhưng hữu ích." />
          </div>
          <div>
            <Link to="/contact" className="packages-hub__primary-action"><Bilingual en="Build my quote" vi="Nhận báo giá phù hợp" /> <ArrowIcon /></Link>
            <button type="button" onClick={openChat}><Bilingual en="Chat with Unitrux" vi="Trao đổi với Unitrux" /></button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PackagesShowcase;
