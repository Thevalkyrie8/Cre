const values = [
  {
    id: '01',
    icon: 'growth',
    title: 'Rapid Growth',
    titleVi: 'Tăng trưởng nhanh chóng',
    description: 'We help businesses grow revenue by 300% in the first 6 months through optimized marketing strategies.',
    descriptionVi: 'Chúng tôi giúp doanh nghiệp tăng trưởng doanh thu 300% trong 6 tháng đầu tiên thông qua các chiến lược marketing được tối ưu hóa.',
    layout: 'lg:tw-col-span-7 lg:tw-min-h-[19rem]',
    tone: 'tw-bg-[var(--u-surface)]',
    hover: 'hover:-tw-translate-y-2 hover:-tw-rotate-[0.35deg]',
  },
  {
    id: '02',
    icon: 'idea',
    title: 'Creative & Unique',
    titleVi: 'Sáng tạo và độc đáo',
    description: 'Each of our marketing strategies is uniquely designed to fit the characteristics and goals of each business.',
    descriptionVi: 'Mỗi chiến lược marketing của chúng tôi đều được thiết kế riêng biệt, phù hợp với đặc thù và mục tiêu của từng doanh nghiệp.',
    layout: 'lg:tw-col-span-5 lg:tw-mt-14 lg:tw-min-h-[16rem]',
    tone: 'tw-bg-[var(--u-subtle)]',
    hover: 'hover:-tw-translate-y-2 hover:tw-rotate-[0.45deg]',
  },
  {
    id: '03',
    icon: 'target',
    title: 'Precise Targeting',
    titleVi: 'Nhắm mục tiêu chính xác',
    description: 'Using data and deep analysis to accurately identify target customers, maximizing advertising effectiveness.',
    descriptionVi: 'Sử dụng dữ liệu và phân tích sâu để xác định chính xác đối tượng khách hàng mục tiêu, tối đa hóa hiệu quả quảng cáo.',
    layout: 'lg:tw-col-span-4 lg:-tw-mt-3 lg:tw-min-h-[17rem]',
    tone: 'tw-bg-[var(--u-subtle)]',
    hover: 'hover:-tw-translate-y-2 hover:-tw-rotate-[0.5deg]',
  },
  {
    id: '04',
    icon: 'report',
    title: 'Transparent Reporting',
    titleVi: 'Báo cáo minh bạch',
    description: 'Provide detailed and transparent reports on the effectiveness of each marketing campaign, helping you track ROI clearly.',
    descriptionVi: 'Cung cấp báo cáo chi tiết và minh bạch về hiệu quả của từng chiến dịch marketing, giúp bạn theo dõi ROI một cách rõ ràng.',
    layout: 'lg:tw-col-span-4 lg:tw-mt-10 lg:tw-min-h-[18rem]',
    tone: 'tw-bg-[var(--u-surface)]',
    hover: 'hover:-tw-translate-y-2 hover:tw-rotate-[0.35deg]',
  },
  {
    id: '05',
    icon: 'support',
    title: '24/7 Support',
    titleVi: 'Hỗ trợ 24/7',
    description: 'Our team of experts is always ready to support you 24/7, ensuring all issues are resolved quickly.',
    descriptionVi: 'Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7, đảm bảo mọi vấn đề được giải quyết nhanh chóng.',
    layout: 'lg:tw-col-span-4 lg:-tw-mt-7 lg:tw-min-h-[16rem]',
    tone: 'tw-bg-[var(--u-surface)]',
    hover: 'hover:-tw-translate-y-2 hover:-tw-rotate-[0.4deg]',
  },
  {
    id: '06',
    icon: 'cost',
    title: 'Reasonable Cost',
    titleVi: 'Chi phí hợp lý',
    description: 'Provide service packages at competitive prices, suitable for businesses of all sizes.',
    descriptionVi: 'Cung cấp các gói dịch vụ với mức giá cạnh tranh, phù hợp với ngân sách của mọi quy mô doanh nghiệp.',
    layout: 'lg:tw-col-span-7 lg:tw-col-start-6 lg:-tw-mt-1 lg:tw-min-h-[15rem]',
    tone: 'tw-bg-[var(--u-surface)]',
    hover: 'hover:-tw-translate-y-2 hover:tw-rotate-[0.3deg]',
  },
];

const ValueIcon = ({ type }) => {
  const art = {
    growth: <><path d="M7 29c7-3 12-8 17-18 3 7 7 11 14 14" /><path d="m29 14 9 11-14 2" /><path d="M9 36c7 0 13-2 18-7" /></>,
    idea: <><path d="M16 30c-3-3-5-6-5-10a13 13 0 0 1 26 0c0 4-2 8-6 11l-2 3H18l-2-4Z" /><path d="M19 39h9M20 43h7M24 3V0M7 8l3 3M41 8l-3 3" /></>,
    target: <><circle cx="24" cy="24" r="16" /><circle cx="24" cy="24" r="9" /><circle cx="24" cy="24" r="2" /><path d="m30 18 11-11M35 7h6v6" /></>,
    report: <><path d="M9 39V12c0-2 2-4 4-4h22c2 0 4 2 4 4v27" /><path d="M15 32V22M24 32V15M33 32v-6M6 39h36" /><path d="m15 17 8-6 8 5 8-9" /></>,
    support: <><path d="M9 28v-6a15 15 0 0 1 30 0v6" /><path d="M9 27c0-3 2-5 5-5h3v12h-3c-3 0-5-2-5-5v-2ZM39 27c0-3-2-5-5-5h-3v12h3c3 0 5-2 5-5v-2Z" /><path d="M32 37c-2 3-5 4-9 4" /></>,
    cost: <><circle cx="24" cy="24" r="17" /><path d="M24 12v24M31 17c-2-3-12-4-13 2-1 5 5 5 9 7 7 2 5 10-2 10-5 0-8-2-10-4" /></>,
  };

  return (
    <span className="tw-relative tw-grid tw-h-14 tw-w-14 tw-place-items-center tw-rounded-[1.1rem] tw-border tw-border-[color-mix(in_srgb,var(--u-accent)_20%,transparent)] tw-bg-[var(--u-line)]/80 tw-text-[var(--u-accent)] tw-shadow-[3px_4px_0_color-mix(in_srgb,var(--u-accent)_10%,transparent)]">
      <svg viewBox="0 0 48 48" className="tw-h-8 tw-w-8" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {art[type]}
      </svg>
      <i className="tw-absolute -tw-right-1 -tw-top-1 tw-h-2.5 tw-w-2.5 tw-rounded-full tw-bg-[var(--u-secondary)] tw-ring-4 tw-ring-[var(--u-surface)]" />
    </span>
  );
};

const ValueCard = ({ value }) => (
  <article className={`tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded-[1.75rem] tw-border tw-border-[color-mix(in_srgb,var(--u-accent)_15%,transparent)] tw-p-6 tw-shadow-[0_18px_55px_-38px_color-mix(in_srgb,var(--u-accent)_48%,transparent)] tw-transition tw-duration-500 tw-ease-out hover:tw-border-[color-mix(in_srgb,var(--u-accent)_35%,transparent)] hover:tw-shadow-[0_28px_68px_-34px_color-mix(in_srgb,var(--u-accent)_35%,transparent)] sm:tw-p-8 ${value.layout} ${value.tone} ${value.hover}`}>
    <span className="tw-pointer-events-none tw-absolute -tw-right-12 -tw-top-12 tw-h-36 tw-w-36 tw-rounded-full tw-border tw-border-[var(--u-accent)]/[0.07] tw-transition-transform tw-duration-700 group-hover:tw-scale-125" />
    <span className="tw-pointer-events-none tw-absolute tw-right-8 tw-top-8 tw-font-editorial tw-text-5xl tw-font-semibold tw-leading-none tw-text-[var(--u-accent)]/[0.08]">{value.id}</span>
    <ValueIcon type={value.icon} />
    <div className="tw-mt-auto tw-pt-10">
      <h3 className="tw-m-0 tw-font-editorial tw-text-[2rem] tw-font-semibold tw-leading-none tw-tracking-[-0.03em] tw-text-[var(--u-accent)] sm:tw-text-[2.3rem]">
        <span data-en={value.title} data-vi={value.titleVi}>{value.title}</span>
      </h3>
      <p className="tw-mt-4 tw-max-w-[35rem] tw-text-[0.92rem] tw-leading-7 tw-text-[var(--u-dark)]/75">
        <span data-en={value.description} data-vi={value.descriptionVi}>{value.description}</span>
      </p>
    </div>
    <span className="tw-absolute tw-bottom-6 tw-right-7 tw-h-px tw-w-8 tw-bg-[var(--u-secondary)] tw-transition-all tw-duration-500 group-hover:tw-w-14" />
  </article>
);

const WhyChooseUs = () => (
  <section className="why-choose-us-light tw-relative tw-isolate tw-overflow-hidden tw-bg-[var(--u-surface)] tw-py-24 sm:tw-py-32" aria-labelledby="why-choose-us-title">
    <div className="tw-pointer-events-none tw-absolute tw-left-[-8rem] tw-top-28 -tw-z-10 tw-h-80 tw-w-80 tw-rounded-full tw-border tw-border-[var(--u-accent)]/[0.06]" />
    <div className="tw-pointer-events-none tw-absolute tw-bottom-20 tw-right-[-6rem] -tw-z-10 tw-h-52 tw-w-52 tw-rounded-full tw-bg-[var(--u-secondary)]/[0.06] tw-blur-3xl" />

    <div className="tw-mx-auto tw-w-[min(78rem,calc(100%_-_2rem))]">
      <header className="tw-mb-14 tw-grid tw-items-end tw-gap-7 md:tw-grid-cols-[.75fr_1.5fr] md:tw-gap-16 lg:tw-mb-20">
        <div className="tw-flex tw-items-center tw-gap-4 md:tw-pb-2">
          <span className="tw-h-px tw-w-12 tw-bg-[var(--u-secondary)]" />
          <p className="tw-m-0 tw-text-[0.7rem] tw-font-extrabold tw-uppercase tw-tracking-[0.27em] tw-text-[var(--u-accent)]">
            <span data-en="Why choose us" data-vi="Tại sao chọn chúng tôi">Why choose us</span>
          </p>
        </div>
        <div>
          <h2 id="why-choose-us-title" className="tw-m-0 tw-max-w-[48rem] tw-font-editorial tw-text-[clamp(3rem,6vw,5.7rem)] tw-font-semibold tw-leading-[0.87] tw-tracking-[-0.055em] tw-text-[var(--u-accent)]">
            <span data-en="Value, shaped around your ambition." data-vi="Giá trị được kiến tạo từ tham vọng của bạn.">Value, shaped around your ambition.</span>
          </h2>
          <p className="tw-mt-7 tw-max-w-xl tw-text-base tw-leading-7 tw-text-[var(--u-dark)]/70">
            <span data-en="Six principles guide how we turn complex digital challenges into measurable, lasting momentum." data-vi="Sáu nguyên tắc định hướng cách chúng tôi biến những thách thức số phức tạp thành động lực tăng trưởng bền vững và có thể đo lường.">Six principles guide how we turn complex digital challenges into measurable, lasting momentum.</span>
          </p>
        </div>
      </header>

      <div className="tw-grid tw-grid-cols-1 tw-gap-5 md:tw-grid-cols-2 lg:tw-grid-cols-12 lg:tw-gap-6">
        {values.map((value) => <ValueCard key={value.id} value={value} />)}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
