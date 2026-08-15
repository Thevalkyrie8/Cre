import TemplateProjectCard from './TemplateProjectCard';

const descriptors = {
  salon: {
    en: 'Identity-led digital experiences for salons, beauty studios and personal brands.',
    vi: 'Trải nghiệm số đậm bản sắc thương hiệu cho salon, beauty studio và thương hiệu cá nhân.',
  },
  cafe: {
    en: 'Warm, tactile digital experiences built around the ritual of coffee.',
    vi: 'Trải nghiệm số ấm áp, gần gũi xoay quanh nghi thức thưởng thức cà phê.',
  },
  fnb: {
    en: 'Editorial digital experiences across restaurants, bars and food brands.',
    vi: 'Trải nghiệm số mang tính biên tập cho nhà hàng, quán ăn và thương hiệu ẩm thực.',
  },
  estate: {
    en: 'Architectural clarity for premium property and hospitality brands.',
    vi: 'Sự rõ ràng kiến trúc cho thương hiệu bất động sản và nghỉ dưỡng cao cấp.',
  },
  ecommerce: {
    en: 'Product-first storefronts built to convert browsing into buying.',
    vi: 'Storefront lấy sản phẩm làm trung tâm, biến lượt xem thành đơn hàng.',
  },
};

const Header = ({ position, group }) => (
  <header className="tpl-section__header">
    <span className="tpl-section__index" aria-hidden="true">{String(position + 1).padStart(2, '0')}</span>
    <h2 id={`group-${group.id}-title`} className="tpl-section__title" data-en={group.labelEn} data-vi={group.labelVi}>{group.labelEn}</h2>
    <p className="tpl-section__descriptor" data-en={descriptors[group.id].en} data-vi={descriptors[group.id].vi}>
      {descriptors[group.id].en}
    </p>
  </header>
);

// Salon & beauty — editorial magazine spread: one tall featured project on the
// left, one matching portrait project on the right.
const SalonLayout = ({ group, indexPrefix }) => (
  <div className="tpl-composition tpl-composition--editorial">
    <TemplateProjectCard template={group.items[0]} index={`${indexPrefix}.01`} size="featured" aspect="4 / 5" className="tpl-composition__primary" />
    <TemplateProjectCard template={group.items[1]} index={`${indexPrefix}.02`} size="featured" aspect="4 / 5" />
  </div>
);

// Coffee & cafe — a paired horizontal strip, side by side.
const CafeLayout = ({ group, indexPrefix }) => (
  <div className="tpl-composition tpl-composition--horizontal tpl-composition--horizontal-2">
    <TemplateProjectCard template={group.items[0]} index={`${indexPrefix}.01`} size="large" aspect="4 / 3" className="tpl-composition__strip-item" />
    <TemplateProjectCard template={group.items[1]} index={`${indexPrefix}.02`} size="large" aspect="4 / 3" className="tpl-composition__strip-item" />
  </div>
);

// Food & beverage — one premium featured project, a stacked pair beside it,
// then a three-across strip for the rest. Six items, three distinct card
// scales so the section doesn't read as a repeated grid of identical tiles.
const FnbLayout = ({ group, indexPrefix }) => (
  <div className="tpl-composition tpl-composition--fnb">
    <TemplateProjectCard template={group.items[0]} index={`${indexPrefix}.01`} size="featured" aspect="4 / 5" className="tpl-composition__primary" />
    <div className="tpl-composition__stack">
      <TemplateProjectCard template={group.items[1]} index={`${indexPrefix}.02`} size="medium" aspect="16 / 11" />
      <TemplateProjectCard template={group.items[2]} index={`${indexPrefix}.03`} size="medium" aspect="16 / 11" />
    </div>
    <div className="tpl-composition__row tpl-composition__row--fnb">
      <TemplateProjectCard template={group.items[3]} index={`${indexPrefix}.04`} size="medium" aspect="4 / 3" />
      <TemplateProjectCard template={group.items[4]} index={`${indexPrefix}.05`} size="medium" aspect="4 / 3" />
      <TemplateProjectCard template={group.items[5]} index={`${indexPrefix}.06`} size="medium" aspect="4 / 3" />
    </div>
  </div>
);

// Real estate — a wide cinematic hero project, then three asymmetric projects.
const EstateLayout = ({ group, indexPrefix }) => (
  <div className="tpl-composition tpl-composition--cinematic">
    <TemplateProjectCard template={group.items[2]} index={`${indexPrefix}.01`} size="featured" aspect="21 / 9" className="tpl-composition__wide" />
    <div className="tpl-composition__row">
      <TemplateProjectCard template={group.items[0]} index={`${indexPrefix}.02`} size="medium" aspect="4 / 3" className="tpl-composition__row-wide" />
      <TemplateProjectCard template={group.items[1]} index={`${indexPrefix}.03`} size="small" aspect="3 / 4" />
      <TemplateProjectCard template={group.items[3]} index={`${indexPrefix}.04`} size="small" aspect="3 / 4" />
    </div>
  </div>
);

// E-commerce — bento grid, mirrored from the salon composition (featured on
// the right) with product-card portrait crops for the secondary pair.
const EcommerceLayout = ({ group, indexPrefix }) => (
  <div className="tpl-composition tpl-composition--bento">
    <div className="tpl-composition__stack">
      <TemplateProjectCard template={group.items[1]} index={`${indexPrefix}.02`} size="medium" aspect="4 / 5" />
      <TemplateProjectCard template={group.items[2]} index={`${indexPrefix}.03`} size="medium" aspect="4 / 5" />
    </div>
    <TemplateProjectCard template={group.items[0]} index={`${indexPrefix}.01`} size="featured" aspect="1 / 1" className="tpl-composition__primary" />
  </div>
);

const layouts = {
  salon: SalonLayout,
  cafe: CafeLayout,
  fnb: FnbLayout,
  estate: EstateLayout,
  ecommerce: EcommerceLayout,
};

const CategorySection = ({ group, position }) => {
  const Layout = layouts[group.id];
  const indexPrefix = String(position + 1).padStart(2, '0');

  return (
    <section
      id={`group-${group.id}`}
      data-group-id={group.id}
      className={`tpl-section tpl-section--${group.id}`}
      aria-labelledby={`group-${group.id}-title`}
    >
      <div className="tpl-container">
        <Header position={position} group={group} />
        <Layout group={group} indexPrefix={indexPrefix} />
      </div>
    </section>
  );
};

export default CategorySection;
