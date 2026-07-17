import { Link } from 'react-router-dom';

const services = [
  {
    number: '01',
    type: 'web',
    title: 'Web Development',
    titleVi: 'Phát triển Web',
    description: 'Fast, conversion-minded websites and custom systems shaped around the way your business actually works.',
    descriptionVi: 'Website tốc độ cao, tối ưu chuyển đổi và hệ thống tùy chỉnh được thiết kế theo đúng cách doanh nghiệp của bạn vận hành.',
    features: ['Conversion architecture', 'Custom web applications', 'SEO-ready foundations'],
    featuresVi: ['Kiến trúc tối ưu chuyển đổi', 'Ứng dụng web tùy chỉnh', 'Nền tảng sẵn sàng cho SEO'],
    to: '/web-development',
    layout: 'lg:tw-col-span-7 lg:tw-min-h-[27rem]',
    tone: 'tw-bg-[#FEF7EA]',
  },
  {
    number: '02',
    type: 'commerce',
    title: 'E-commerce',
    titleVi: 'Thương mại điện tử',
    description: 'Connected storefronts, marketplace operations, and product experiences built to reduce friction at every step.',
    descriptionVi: 'Cửa hàng kết nối, vận hành marketplace và trải nghiệm sản phẩm giúp giảm ma sát trong từng bước mua hàng.',
    features: ['Store & marketplace setup', 'Listing optimization', 'Order-flow automation'],
    featuresVi: ['Thiết lập cửa hàng và marketplace', 'Tối ưu listing sản phẩm', 'Tự động hóa luồng đơn hàng'],
    to: '/ecommerce',
    layout: 'lg:tw-col-span-5 lg:tw-mt-16 lg:tw-min-h-[23rem]',
    tone: 'tw-bg-[#E8F0EB]',
  },
  {
    number: '03',
    type: 'marketing',
    title: 'Digital Marketing',
    titleVi: 'Tiếp thị số',
    description: 'A measurable growth system connecting search, paid media, content, and retention around one commercial goal.',
    descriptionVi: 'Hệ thống tăng trưởng có thể đo lường, kết nối tìm kiếm, quảng cáo, nội dung và chăm sóc khách hàng quanh một mục tiêu kinh doanh.',
    features: ['SEO & performance media', 'Content systems', 'Transparent reporting'],
    featuresVi: ['SEO và quảng cáo hiệu suất', 'Hệ thống nội dung', 'Báo cáo minh bạch'],
    to: '/digital-marketing',
    layout: 'lg:tw-col-span-8 lg:tw-col-start-4 lg:-tw-mt-2 lg:tw-min-h-[24rem]',
    tone: 'tw-bg-[#F6EDDF]',
  },
];

const ServiceGlyph = ({ type }) => {
  const paths = {
    web: <><rect x="5" y="8" width="38" height="27" rx="4" /><path d="M5 15h38M17 41h14M24 35v6M11 20h10M11 25h17" /></>,
    commerce: <><path d="M8 13h5l4 20h20l4-14H15" /><path d="M20 13c0-5 3-8 8-8s8 3 8 8" /><circle cx="20" cy="40" r="2" /><circle cx="35" cy="40" r="2" /></>,
    marketing: <><path d="M7 38h35M12 33V22M22 33V15M32 33V8" /><path d="m9 18 11-8 8 4 13-10M35 4h6v6" /></>,
  };
  return (
    <span className="tw-relative tw-grid tw-h-20 tw-w-20 tw-place-items-center tw-rounded-[1.6rem] tw-border tw-border-[#0D5E4D]/20 tw-bg-[#FAF8F5]/75 tw-text-[#0D5E4D] tw-shadow-[5px_6px_0_rgba(13,94,77,.09)] tw-transition tw-duration-500 group-hover:-tw-translate-y-1 group-hover:tw-rotate-[-4deg] group-hover:tw-shadow-[7px_8px_0_rgba(230,140,35,.18)]">
      <svg viewBox="0 0 48 48" className="tw-h-11 tw-w-11" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
      <i className="tw-absolute -tw-right-1 -tw-top-1 tw-h-3 tw-w-3 tw-rounded-full tw-bg-[#E68C23] tw-ring-4 tw-ring-[#FAF8F5] tw-transition-transform tw-duration-500 group-hover:tw-scale-125" />
    </span>
  );
};

const ServiceCard = ({ service }) => (
  <article className={`tw-group tw-relative tw-isolate tw-flex tw-flex-col tw-overflow-hidden tw-rounded-[2rem] tw-border tw-border-[#0D5E4D]/15 tw-p-7 tw-shadow-[0_30px_75px_-52px_rgba(13,94,77,.48)] tw-transition tw-duration-500 hover:-tw-translate-y-2 hover:tw-border-[#E68C23]/50 hover:tw-shadow-[0_38px_85px_-46px_rgba(13,94,77,.42)] sm:tw-p-9 ${service.layout} ${service.tone}`}>
    <span className="tw-pointer-events-none tw-absolute -tw-right-20 -tw-top-20 -tw-z-10 tw-h-64 tw-w-64 tw-rounded-full tw-border tw-border-[#0D5E4D]/[0.07] tw-transition-transform tw-duration-700 group-hover:tw-scale-125" />
    <span className="tw-absolute tw-right-8 tw-top-7 tw-font-editorial tw-text-7xl tw-font-semibold tw-leading-none tw-text-[#0D5E4D]/[0.075]">{service.number}</span>
    <ServiceGlyph type={service.type} />
    <div className="tw-mt-auto tw-pt-12">
      <h2 className="tw-m-0 tw-font-editorial tw-text-[clamp(2.5rem,5vw,4.7rem)] tw-font-semibold tw-leading-[0.86] tw-tracking-[-0.055em] tw-text-[#0D5E4D]">
        <span data-en={service.title} data-vi={service.titleVi}>{service.title}</span>
      </h2>
      <p className="tw-mt-6 tw-max-w-[42rem] tw-text-[0.96rem] tw-leading-7 tw-text-[#3F5A51]/80">
        <span data-en={service.description} data-vi={service.descriptionVi}>{service.description}</span>
      </p>
      <ul className="tw-mt-7 tw-grid tw-list-none tw-gap-2 tw-p-0 sm:tw-grid-cols-3">
        {service.features.map((feature, index) => (
          <li key={feature} className="tw-flex tw-items-start tw-gap-2 tw-text-xs tw-font-semibold tw-leading-5 tw-text-[#315248]">
            <span className="tw-mt-1.5 tw-h-1.5 tw-w-1.5 tw-shrink-0 tw-rounded-full tw-bg-[#E68C23]" />
            <span data-en={feature} data-vi={service.featuresVi[index]}>{feature}</span>
          </li>
        ))}
      </ul>
      <Link to={service.to} className="tw-mt-8 tw-inline-flex tw-items-center tw-gap-3 tw-rounded-full tw-border tw-border-[#0D5E4D]/30 tw-px-5 tw-py-3 tw-text-sm tw-font-extrabold tw-text-[#0D5E4D] tw-no-underline tw-transition tw-duration-300 hover:tw-border-[#E68C23] hover:tw-bg-[#E68C23] hover:tw-text-[#FFF9F1]">
        <span data-en="Learn More" data-vi="Tìm hiểu thêm">Learn More</span>
        <span className="tw-transition-transform tw-duration-300 group-hover:tw-translate-x-1" aria-hidden="true">↗</span>
      </Link>
    </div>
  </article>
);

const ServicesShowcase = () => (
  <div className="theme-synced-page services-light-page tw-bg-[#FAF8F5] tw-text-[#263B35]">
    <section className="tw-relative tw-isolate tw-overflow-hidden tw-pb-28 tw-pt-36 sm:tw-pt-44">
      <div className="tw-pointer-events-none tw-absolute tw-inset-0 -tw-z-10 tw-bg-[radial-gradient(circle_at_12%_12%,rgba(13,94,77,.10),transparent_26%),radial-gradient(circle_at_88%_34%,rgba(230,140,35,.10),transparent_24%)]" />
      <div className="tw-mx-auto tw-w-[min(78rem,calc(100%_-_2rem))]">
        <header className="tw-mb-16 tw-grid tw-items-end tw-gap-8 md:tw-grid-cols-[.68fr_1.45fr] md:tw-gap-16 lg:tw-mb-24">
          <div className="tw-flex tw-items-center tw-gap-4 md:tw-pb-3"><span className="tw-h-px tw-w-12 tw-bg-[#E68C23]" /><p className="tw-m-0 tw-text-[0.68rem] tw-font-extrabold tw-uppercase tw-tracking-[0.28em] tw-text-[#0D5E4D]" data-en="Digital solutions" data-vi="Giải pháp số">Digital solutions</p></div>
          <div>
            <h1 className="tw-m-0 tw-max-w-[54rem] tw-font-editorial tw-text-[clamp(3.7rem,7vw,7.4rem)] tw-font-semibold tw-leading-[0.82] tw-tracking-[-0.065em] tw-text-[#0D5E4D]" data-en="Built for the way growth really happens." data-vi="Được kiến tạo theo cách tăng trưởng thực sự diễn ra.">Built for the way growth really happens.</h1>
            <p className="tw-mt-8 tw-max-w-[42rem] tw-text-base tw-leading-8 tw-text-[#49635A]" data-en="Not isolated deliverables. Three connected disciplines that turn attention into useful digital experiences—and useful experiences into measurable business momentum." data-vi="Không phải những hạng mục rời rạc. Ba năng lực kết nối giúp biến sự chú ý thành trải nghiệm số hữu ích, rồi chuyển trải nghiệm thành động lực kinh doanh có thể đo lường.">Not isolated deliverables. Three connected disciplines that turn attention into useful digital experiences—and useful experiences into measurable business momentum.</p>
          </div>
        </header>

        <div className="tw-grid tw-grid-cols-1 tw-gap-6 lg:tw-grid-cols-12 lg:tw-gap-7">
          {services.map((service) => <ServiceCard key={service.number} service={service} />)}
        </div>
      </div>
    </section>

    <section className="tw-border-y tw-border-[#0D5E4D]/10 tw-bg-[#E7EFE9] tw-py-16">
      <div className="tw-mx-auto tw-grid tw-w-[min(78rem,calc(100%_-_2rem))] tw-gap-9 md:tw-grid-cols-[1fr_2fr] md:tw-items-center">
        <h2 className="tw-m-0 tw-font-editorial tw-text-4xl tw-font-semibold tw-leading-none tw-text-[#0D5E4D]" data-en="One connected working rhythm." data-vi="Một nhịp làm việc xuyên suốt.">One connected working rhythm.</h2>
        <ol className="tw-grid tw-list-none tw-grid-cols-2 tw-gap-5 tw-p-0 sm:tw-grid-cols-4">
          {['Discover', 'Shape', 'Build', 'Improve'].map((step, index) => <li key={step} className="tw-border-l tw-border-[#0D5E4D]/20 tw-pl-4"><span className="tw-block tw-text-[0.65rem] tw-font-bold tw-text-[#E68C23]">0{index + 1}</span><strong className="tw-mt-1 tw-block tw-font-editorial tw-text-2xl tw-font-semibold tw-text-[#0D5E4D]">{step}</strong></li>)}
        </ol>
      </div>
    </section>
  </div>
);

export default ServicesShowcase;
