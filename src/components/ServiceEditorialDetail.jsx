import { Link } from 'react-router-dom';
import { chatboxFaqs } from '../seo/seoConfig';

const serviceDetails = {
  web: {
    index: '01',
    eyebrow: 'Web Development',
    eyebrowVi: 'Phát triển Web',
    title: 'Digital foundations that feel effortless—and work relentlessly.',
    titleVi: 'Nền tảng số vận hành bền bỉ nhưng mang lại cảm giác thật nhẹ nhàng.',
    intro: 'We design and engineer fast websites, web applications, and connected systems around customer intent and operational reality.',
    introVi: 'Chúng tôi thiết kế website tốc độ cao, ứng dụng web và hệ thống kết nối dựa trên ý định khách hàng cùng thực tế vận hành.',
    promise: 'From the first click to the internal workflow behind it, every layer is designed to reduce friction.',
    metrics: [['90+', 'Performance target'], ['AA', 'Accessibility goal'], ['24/7', 'Operational confidence']],
    challengeTitle: 'The challenge',
    challenge: 'Most websites are assembled around pages. We begin with decisions: what customers need to understand, what action matters next, and what your team needs after conversion.',
    capabilities: [
      ['Experience architecture', 'User journeys, information architecture, wireframes, and conversion paths shaped before visual polish.'],
      ['Design systems', 'Reusable responsive components that keep the product coherent as content and teams grow.'],
      ['Engineering', 'React storefronts, web applications, APIs, integrations, analytics, performance, and security.'],
      ['Continuous improvement', 'Measurement plans and focused iterations after launch, based on real behavior rather than assumptions.'],
    ],
    process: ['Discovery & audit', 'Prototype & validate', 'Build & integrate', 'Launch & improve'],
    deliverables: ['UX and content architecture', 'Responsive interface system', 'Production-ready implementation', 'Analytics and handover'],
  },
  ecommerce: {
    index: '02',
    eyebrow: 'E-commerce',
    eyebrowVi: 'Thương mại điện tử',
    title: 'Commerce designed as a living system—not a catalogue.',
    titleVi: 'Thương mại được thiết kế như một hệ thống sống, không chỉ là danh mục sản phẩm.',
    intro: 'We connect storefront experience, product content, marketplace operations, fulfillment, and retention into one coherent buying journey.',
    introVi: 'Chúng tôi kết nối trải nghiệm cửa hàng, nội dung sản phẩm, vận hành marketplace, hoàn tất đơn và giữ chân khách hàng thành một hành trình thống nhất.',
    promise: 'Every improvement is tied to a commercial moment: discovery, trust, checkout, fulfillment, or return purchase.',
    metrics: [['↓', 'Checkout friction'], ['360°', 'Commerce operations'], ['1:1', 'Product clarity']],
    challengeTitle: 'The challenge',
    challenge: 'Revenue leaks rarely live in one place. A confusing listing, missing trust cue, slow workflow, or disconnected follow-up can each undermine the same order.',
    capabilities: [
      ['Storefront experience', 'Navigation, product discovery, product detail, bundles, trust, checkout, and mobile commerce.'],
      ['Marketplace operations', 'Amazon, Etsy, and channel-ready listings, media standards, catalog structure, and optimization.'],
      ['Connected operations', 'Inventory, orders, payments, shipping, CRM, and reporting connected to reduce repetitive work.'],
      ['Retention loops', 'Email flows, remarketing audiences, post-purchase care, review systems, and repeat-order strategy.'],
    ],
    process: ['Commerce audit', 'Journey redesign', 'System connection', 'Optimize revenue'],
    deliverables: ['Store and catalog architecture', 'Conversion-ready product system', 'Operations integrations', 'Growth measurement plan'],
  },
  marketing: {
    index: '03',
    eyebrow: 'Digital Marketing',
    eyebrowVi: 'Tiếp thị số',
    title: 'Make every channel tell one measurable growth story.',
    titleVi: 'Để mọi kênh cùng kể một câu chuyện tăng trưởng có thể đo lường.',
    intro: 'We align search, paid media, social content, landing experiences, and automation around the same audience truth and commercial target.',
    introVi: 'Chúng tôi đồng bộ tìm kiếm, quảng cáo, nội dung xã hội, landing page và automation quanh cùng một sự thật khách hàng và mục tiêu kinh doanh.',
    promise: 'Creative judgment and clean measurement work together—so momentum never depends on vanity metrics.',
    metrics: [['GA4', 'Measurement ready'], ['30–90', 'Day roadmap'], ['ROAS', 'Commercial focus']],
    challengeTitle: 'The challenge',
    challenge: 'Channels often work in isolation: content says one thing, ads promise another, and the landing experience breaks continuity. We design the system between them.',
    capabilities: [
      ['Search demand', 'Technical SEO, topic architecture, local visibility, and useful content aligned with real intent.'],
      ['Performance media', 'Google, Meta, and TikTok campaigns structured around funnel stage, testing, and cost control.'],
      ['Content system', 'A practical editorial rhythm for campaigns, organic channels, short-form video, and brand authority.'],
      ['Measurement & automation', 'GA4, GSC, UTM governance, dashboards, lead nurturing, reminders, and post-purchase flows.'],
    ],
    process: ['Audit the signals', 'Shape the strategy', 'Launch & learn', 'Scale what works'],
    deliverables: ['30–60–90 day roadmap', 'Campaign and content system', 'Tracking and live dashboard', 'Optimization cadence'],
  },
  chatbox: {
    index: '06',
    eyebrow: 'AI Chatbot Integration',
    eyebrowVi: 'Tích hợp Chatbot AI',
    title: 'AI chatbot for Facebook Fanpage, Zalo OA, and your website.',
    titleVi: 'Chatbot AI cho Fanpage, Zalo OA và website.',
    intro: 'We connect an AI chatbot to Facebook Fanpage, Zalo OA, and your website to answer questions, guide customers, capture leads, and transfer conversations to staff.',
    introVi: 'Chatbot AI dùng dữ liệu doanh nghiệp để trả lời câu hỏi, tư vấn sản phẩm, thu thông tin lead và chuyển hội thoại cho nhân viên trên Facebook Fanpage, Zalo OA và website.',
    promise: 'Answer common questions, qualify leads, collect customer information, and hand complex conversations to your team at the right moment.',
    metrics: [['24/7', 'Instant support'], ['3-in-1', 'Connected channels'], ['AI', 'Smart qualification']],
    challengeTitle: 'The challenge',
    challenge: 'Customers message businesses across different channels and expect an immediate answer. Disconnected inboxes create slow responses, repeated work, and lost sales opportunities.',
    capabilities: [
      ['Facebook Fanpage', 'Automated Messenger responses, lead capture, product guidance, and seamless transfer to a human advisor.'],
      ['Zalo OA', 'Structured consultation flows, customer information collection, reminders, and Vietnamese-first support.'],
      ['Website assistant', 'A branded AI chat experience trained around your services, policies, FAQs, and conversion goals.'],
      ['Unified automation', 'Shared conversation logic, CRM-ready data, reporting, and escalation rules across all connected channels.'],
    ],
    process: ['Map conversations', 'Prepare knowledge', 'Connect channels', 'Train & optimize'],
    deliverables: ['Conversation and lead-flow design', 'Fanpage, Zalo OA, and website setup', 'AI knowledge base and guardrails', 'Analytics, training, and handover'],
  },
};

const relatedServices = {
  web: [
    ['/digital-marketing', 'Digital Marketing tăng trưởng'],
    ['/ecommerce', 'Giải pháp E-commerce'],
    ['/chatbox-ai', 'Tích hợp Chatbot AI'],
  ],
  ecommerce: [
    ['/web-development', 'Thiết kế website bán hàng'],
    ['/digital-marketing', 'Digital Marketing'],
    ['/automation', 'Tự động hóa vận hành'],
  ],
  marketing: [
    ['/web-development', 'Thiết kế website chuẩn SEO'],
    ['/chatbox-ai', 'Chatbot AI đa kênh'],
    ['/photography-video', 'Sản xuất hình ảnh và video'],
  ],
  chatbox: [
    ['/automation', 'Tự động hóa chăm sóc khách hàng'],
    ['/web-development', 'Tích hợp Chatbot vào website'],
    ['/digital-marketing', 'Digital Marketing và thu lead'],
  ],
};

const DetailIcon = () => (
  <svg viewBox="0 0 64 64" className="tw-h-16 tw-w-16" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" aria-hidden="true">
    <circle cx="32" cy="32" r="23" /><circle cx="32" cy="32" r="13" /><path d="M32 2v8M32 54v8M2 32h8M54 32h8" /><path d="m23 33 6 6 13-15" />
  </svg>
);

const ServiceEditorialDetail = ({ type }) => {
  const service = serviceDetails[type];

  return (
  <div className="theme-synced-page service-editorial-detail tw-bg-[#FAF8F5] tw-text-[#263B35]">
    <section data-reveal className="tw-relative tw-isolate tw-overflow-hidden tw-pb-20 tw-pt-36 sm:tw-pb-28 sm:tw-pt-44">
      <div className="tw-pointer-events-none tw-absolute tw-inset-0 -tw-z-10 tw-bg-[radial-gradient(circle_at_12%_10%,rgba(13,94,77,.11),transparent_27%),radial-gradient(circle_at_90%_35%,rgba(230,140,35,.10),transparent_24%)]" />
      <div className="tw-mx-auto tw-grid tw-w-[min(76rem,calc(100%_-_2rem))] tw-gap-14 lg:tw-grid-cols-[1.45fr_.55fr] lg:tw-items-end">
        <div>
          <Link to="/services" className="tw-inline-flex tw-items-center tw-gap-2 tw-text-xs tw-font-bold tw-uppercase tw-tracking-[.18em] tw-text-[#0D5E4D] tw-no-underline"><span aria-hidden="true">←</span> All services</Link>
          <p className="tw-mb-5 tw-mt-12 tw-text-[.7rem] tw-font-extrabold tw-uppercase tw-tracking-[.28em] tw-text-[#E68C23]" data-en={service.eyebrow} data-vi={service.eyebrowVi}>{service.eyebrow}</p>
          <h1 data-title-reveal className="master-title tw-m-0 tw-max-w-[58rem] tw-font-editorial tw-text-[clamp(3.8rem,7.4vw,7.8rem)] tw-font-semibold tw-leading-[.82] tw-tracking-[-.067em] tw-text-[#0D5E4D]" data-en={service.title} data-vi={service.titleVi}>{service.title}</h1>
          <p className="tw-mt-9 tw-max-w-[48rem] tw-text-lg tw-leading-8 tw-text-[#49635A]" data-en={service.intro} data-vi={service.introVi}>{service.intro}</p>
        </div>
        <aside className="tw-relative tw-overflow-hidden tw-rounded-[2rem] tw-border tw-border-[#0D5E4D]/15 tw-bg-[#FEF7EA] tw-p-7 tw-shadow-[0_30px_70px_-48px_rgba(13,94,77,.5)]">
          <span className="tw-absolute tw-right-5 tw-top-3 tw-font-editorial tw-text-8xl tw-font-semibold tw-text-[#0D5E4D]/[.06]">{service.index}</span>
          <span className="tw-text-[#0D5E4D]"><DetailIcon /></span>
          <p className="tw-relative tw-mb-0 tw-mt-10 tw-text-sm tw-leading-6 tw-text-[#49635A]">{service.promise}</p>
        </aside>
      </div>
    </section>

    <section className="tw-border-y tw-border-[#0D5E4D]/10 tw-bg-[#E7EFE9] tw-py-10">
      <div className="tw-mx-auto tw-grid tw-w-[min(76rem,calc(100%_-_2rem))] tw-grid-cols-1 tw-gap-6 sm:tw-grid-cols-3">
        {service.metrics.map(([value, label]) => <div key={label} className="tw-border-l tw-border-[#0D5E4D]/20 tw-pl-5"><strong className="tw-block tw-font-editorial tw-text-4xl tw-font-semibold tw-text-[#0D5E4D]">{value}</strong><span className="tw-text-xs tw-font-bold tw-uppercase tw-tracking-[.12em] tw-text-[#61756F]">{label}</span></div>)}
      </div>
    </section>

    {type === 'chatbox' && (
      <section data-reveal className="tw-py-20 sm:tw-py-24" aria-labelledby="chatbot-ai-definition">
        <div className="tw-mx-auto tw-grid tw-w-[min(76rem,calc(100%_-_2rem))] tw-gap-10 lg:tw-grid-cols-[.8fr_1.2fr] lg:tw-gap-16">
          <div>
            <p className="tw-m-0 tw-text-[.68rem] tw-font-black tw-uppercase tw-tracking-[.24em] tw-text-[#E68C23]" data-en="Quick answer" data-vi="Câu trả lời ngắn">Quick answer</p>
            <h2 id="chatbot-ai-definition" className="tw-mb-0 tw-mt-4 tw-font-editorial tw-text-[clamp(2.35rem,5vw,4.25rem)] tw-font-semibold tw-leading-[.95] tw-text-[#0D5E4D]" data-en="What is an AI chatbot for Facebook Fanpage?" data-vi="Chatbot AI cho Fanpage là gì?">What is an AI chatbot for Facebook Fanpage?</h2>
            <p className="tw-mb-0 tw-mt-6 tw-text-lg tw-leading-8 tw-text-[#49635A]" data-en="It is an automated Messenger assistant that uses approved business information to answer questions, guide product discovery, collect lead details, and transfer conversations to staff when needed." data-vi="Đây là trợ lý tự động trong Messenger, dùng dữ liệu đã được doanh nghiệp duyệt để trả lời câu hỏi, tư vấn sản phẩm, thu thông tin khách hàng và chuyển hội thoại cho nhân viên khi cần.">It is an automated Messenger assistant that uses approved business information to answer questions, guide product discovery, collect lead details, and transfer conversations to staff when needed.</p>
          </div>
          <dl className="tw-m-0 tw-grid tw-gap-3 sm:tw-grid-cols-2">
            {[
              ['Service', 'Dịch vụ', 'Multi-channel AI chatbot integration', 'Tích hợp Chatbot AI đa kênh'],
              ['Supported channels', 'Kênh hỗ trợ', 'Facebook Fanpage, Zalo OA, and website', 'Facebook Fanpage, Zalo OA và website'],
              ['Core functions', 'Chức năng chính', 'Automated answers, consultation, lead capture, and staff handover', 'Tự động trả lời, tư vấn, thu lead và chuyển nhân viên'],
              ['Knowledge source', 'Dữ liệu chuẩn bị', 'Products, services, pricing, policies, and FAQs', 'Sản phẩm, dịch vụ, bảng giá, chính sách và câu hỏi thường gặp'],
            ].map(([labelEn, labelVi, valueEn, valueVi]) => (
              <div key={labelEn} className="tw-rounded-2xl tw-border tw-border-[#0D5E4D]/14 tw-bg-[#FEF7EA] tw-p-5">
                <dt className="tw-text-xs tw-font-black tw-uppercase tw-tracking-[.12em] tw-text-[#E68C23]" data-en={labelEn} data-vi={labelVi}>{labelEn}</dt>
                <dd className="tw-m-0 tw-mt-3 tw-text-sm tw-font-semibold tw-leading-6 tw-text-[#315248]" data-en={valueEn} data-vi={valueVi}>{valueEn}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    )}

    <section data-reveal className="tw-py-24 sm:tw-py-32">
      <div className="tw-mx-auto tw-w-[min(76rem,calc(100%_-_2rem))]">
        <div className="tw-grid tw-gap-10 lg:tw-grid-cols-[.7fr_1.3fr] lg:tw-gap-20">
          <h2 className="tw-m-0 tw-font-editorial tw-text-5xl tw-font-semibold tw-leading-[.9] tw-text-[#0D5E4D]">{service.challengeTitle}</h2>
          <p className="tw-m-0 tw-max-w-[48rem] tw-text-xl tw-leading-9 tw-text-[#49635A]">{service.challenge}</p>
        </div>

        <div className="tw-mt-20 tw-grid tw-grid-cols-1 tw-gap-5 md:tw-grid-cols-2 lg:tw-grid-cols-12">
          {service.capabilities.map(([title, description], index) => (
            <article key={title} className={`tw-group tw-relative tw-overflow-hidden tw-rounded-[1.7rem] tw-border tw-border-[#0D5E4D]/15 tw-p-7 tw-transition tw-duration-500 hover:-tw-translate-y-2 hover:tw-border-[#E68C23]/45 ${index === 0 || index === 3 ? 'lg:tw-col-span-7 tw-bg-[#FEF7EA]' : 'lg:tw-col-span-5 tw-bg-[#E8F0EB]'} ${index === 1 ? 'lg:tw-mt-12' : ''}`}>
              <span className="tw-text-xs tw-font-bold tw-text-[#E68C23]">0{index + 1}</span>
              <h3 className="tw-mb-0 tw-mt-10 tw-font-editorial tw-text-4xl tw-font-semibold tw-leading-none tw-text-[#0D5E4D]">{title}</h3>
              <p className="tw-mb-0 tw-mt-4 tw-text-sm tw-leading-7 tw-text-[#50675F]">{description}</p>
              <i className="tw-absolute tw-bottom-6 tw-right-7 tw-h-px tw-w-8 tw-bg-[#E68C23] tw-transition-all tw-duration-500 group-hover:tw-w-16" />
            </article>
          ))}
        </div>
      </div>
    </section>

    <section data-reveal className="tw-bg-[#F2EDE5] tw-py-24">
      <div className="tw-mx-auto tw-grid tw-w-[min(76rem,calc(100%_-_2rem))] tw-gap-14 lg:tw-grid-cols-2">
        <div>
          <p className="tw-text-[.68rem] tw-font-extrabold tw-uppercase tw-tracking-[.25em] tw-text-[#E68C23]">How we work</p>
          <h2 className="tw-m-0 tw-max-w-md tw-font-editorial tw-text-6xl tw-font-semibold tw-leading-[.88] tw-text-[#0D5E4D]">A clear path from ambiguity to momentum.</h2>
        </div>
        <ol className="tw-m-0 tw-list-none tw-p-0">
          {service.process.map((step, index) => <li key={step} className="tw-grid tw-grid-cols-[3rem_1fr] tw-gap-4 tw-border-b tw-border-[#0D5E4D]/12 tw-py-5"><span className="tw-text-xs tw-font-bold tw-text-[#E68C23]">0{index + 1}</span><strong className="tw-font-editorial tw-text-2xl tw-font-semibold tw-text-[#0D5E4D]">{step}</strong></li>)}
        </ol>
      </div>
    </section>

    <section data-reveal className="tw-relative tw-overflow-hidden tw-bg-[#0D5E4D] tw-py-24 tw-text-[#FFF9F1]">
      <div className="tw-pointer-events-none tw-absolute -tw-right-32 -tw-top-32 tw-h-96 tw-w-96 tw-rounded-full tw-border tw-border-[#FFF9F1]/10" />
      <div className="tw-mx-auto tw-grid tw-w-[min(76rem,calc(100%_-_2rem))] tw-gap-12 lg:tw-grid-cols-[.75fr_1.25fr] lg:tw-items-end">
        <div><p className="tw-m-0 tw-text-[.68rem] tw-font-extrabold tw-uppercase tw-tracking-[.25em] tw-text-[#F5BC72]">Case-study model</p><h2 className="tw-mb-0 tw-mt-5 tw-font-editorial tw-text-6xl tw-font-semibold tw-leading-[.86] tw-text-[#FFF9F1]">Measure the system, not the decoration.</h2><p className="tw-mb-0 tw-mt-7 tw-max-w-md tw-text-sm tw-leading-7 tw-text-[#D8E6DF]">A representative launch dashboard showing how experience quality, speed, and conversion signals are reviewed together. Indexed values are illustrative—not client performance claims.</p></div>
        <div className="tw-rounded-[2rem] tw-border tw-border-[#FFF9F1]/14 tw-bg-[#FFF9F1]/[.07] tw-p-5 tw-backdrop-blur sm:tw-p-7">
          <div className="tw-flex tw-items-center tw-justify-between tw-gap-4"><span className="tw-text-xs tw-font-bold tw-uppercase tw-tracking-[.15em] tw-text-[#F5BC72]">Transformation index</span><span className="tw-rounded-full tw-border tw-border-[#FFF9F1]/16 tw-px-3 tw-py-1 tw-text-[.65rem] tw-text-[#D8E6DF]">Prototype benchmark</span></div>
          <svg viewBox="0 0 680 300" className="tw-mt-7 tw-w-full" fill="none" aria-label="Illustrative market trend graph">
            {[55,105,155,205,255].map((y) => <path key={y} d={`M44 ${y}H650`} stroke="#FFF9F1" strokeOpacity=".09" />)}
            <path d="M50 240C122 226 143 204 198 210s92-70 148-55 85-48 136-36 88-57 158-69" stroke="#F5BC72" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 240C122 226 143 204 198 210s92-70 148-55 85-48 136-36 88-57 158-69V270H50Z" fill="url(#trendFill)" />
            {[['50','240'],['198','210'],['346','155'],['482','119'],['640','50']].map(([x,y]) => <g key={x}><circle cx={x} cy={y} r="8" fill="#0D5E4D" stroke="#F5BC72" strokeWidth="3"/><circle cx={x} cy={y} r="18" stroke="#F5BC72" strokeOpacity=".2"/></g>)}
            <defs><linearGradient id="trendFill" x1="340" y1="40" x2="340" y2="270" gradientUnits="userSpaceOnUse"><stop stopColor="#E68C23" stopOpacity=".28"/><stop offset="1" stopColor="#E68C23" stopOpacity="0"/></linearGradient></defs>
          </svg>
          <div className="tw-grid tw-grid-cols-3 tw-gap-3">{[['+48', 'Conversion index'], ['94', 'Experience score'], ['1.4s', 'Load-time target']].map(([value,label]) => <div key={label} className="tw-rounded-xl tw-bg-[#FFF9F1]/[.06] tw-p-3"><strong className="tw-block tw-font-editorial tw-text-2xl tw-text-[#F5BC72]">{value}</strong><span className="tw-text-[.62rem] tw-font-bold tw-uppercase tw-tracking-[.1em] tw-text-[#D8E6DF]">{label}</span></div>)}</div>
        </div>
      </div>
    </section>

    <section data-reveal className="tw-py-24 sm:tw-py-32">
      <div className="tw-mx-auto tw-grid tw-w-[min(76rem,calc(100%_-_2rem))] tw-gap-12 lg:tw-grid-cols-12 lg:tw-items-center">
        <div className="tw-relative lg:tw-col-span-7">
          <div className="tw-overflow-hidden tw-rounded-[2.2rem] tw-border tw-border-[#0D5E4D]/14 tw-bg-[#E7EFE9] tw-shadow-[0_38px_85px_-55px_rgba(13,94,77,.6)]"><video className="tw-aspect-[16/10] tw-h-full tw-w-full tw-object-cover" src="/President.mp4" poster="/logo.jpg" autoPlay muted loop playsInline aria-label="Unitrux real-world production footage" /></div>
          <div className="tw-absolute -tw-bottom-7 tw-right-5 tw-rounded-[1.4rem] tw-border tw-border-[#0D5E4D]/14 tw-bg-[#FEF7EA]/95 tw-p-5 tw-shadow-[0_24px_52px_-38px_rgba(13,94,77,.6)] tw-backdrop-blur sm:tw-right-10"><span className="tw-text-[.65rem] tw-font-black tw-uppercase tw-tracking-[.17em] tw-text-[#E68C23]">Real project media</span><p className="tw-mb-0 tw-mt-2 tw-font-editorial tw-text-xl tw-font-semibold tw-text-[#0D5E4D]">Strategy, craft, and delivery in one room.</p></div>
        </div>
        <div className="lg:tw-col-span-4 lg:tw-col-start-9"><p className="tw-m-0 tw-text-[.68rem] tw-font-black tw-uppercase tw-tracking-[.24em] tw-text-[#E68C23]">The working team</p><h2 className="tw-mb-0 tw-mt-5 tw-font-editorial tw-text-6xl tw-font-semibold tw-leading-[.86] tw-text-[#0D5E4D]">Senior eyes on the work that matters.</h2><p className="tw-mb-0 tw-mt-7 tw-text-sm tw-leading-7 tw-text-[#50675F]">A compact cross-disciplinary team keeps product thinking, interface craft, engineering, and measurement connected from kickoff through improvement.</p><div className="tw-mt-8 tw-flex tw-flex-wrap tw-gap-2">{['Strategy', 'Experience', 'Engineering', 'Growth'].map((role) => <span key={role} className="tw-rounded-full tw-border tw-border-[#0D5E4D]/16 tw-bg-[#FEF7EA] tw-px-4 tw-py-2 tw-text-xs tw-font-bold tw-text-[#0D5E4D]">{role}</span>)}</div></div>
      </div>
    </section>

    <section data-reveal className="tw-py-24">
      <div className="tw-mx-auto tw-grid tw-w-[min(76rem,calc(100%_-_2rem))] tw-gap-12 lg:tw-grid-cols-[.8fr_1.2fr]">
        <h2 className="tw-m-0 tw-font-editorial tw-text-5xl tw-font-semibold tw-leading-none tw-text-[#0D5E4D]">What you leave with</h2>
        <div className="tw-grid tw-gap-4 sm:tw-grid-cols-2">{service.deliverables.map((item, index) => <div key={item} className="tw-rounded-2xl tw-border tw-border-[#0D5E4D]/14 tw-bg-[#FEF7EA] tw-p-5"><span className="tw-text-xs tw-font-bold tw-text-[#E68C23]">0{index + 1}</span><p className="tw-mb-0 tw-mt-5 tw-font-semibold tw-text-[#315248]">{item}</p></div>)}</div>
      </div>
    </section>

    <section className="tw-pb-24" aria-labelledby="related-services-title">
      <div className="tw-mx-auto tw-w-[min(76rem,calc(100%_-_2rem))] tw-rounded-[2rem] tw-border tw-border-[#0D5E4D]/14 tw-bg-[#E7EFE9] tw-p-7 sm:tw-p-10">
        <h2 id="related-services-title" className="tw-m-0 tw-font-editorial tw-text-4xl tw-font-semibold tw-text-[#0D5E4D]" data-en="Related services" data-vi="Dịch vụ liên quan">Related services</h2>
        <nav className="tw-mt-6 tw-flex tw-flex-wrap tw-gap-3" aria-label="Related services">
          {relatedServices[type].map(([to, label]) => (
            <Link key={to} to={to} className="tw-rounded-full tw-border tw-border-[#0D5E4D]/20 tw-bg-[#FEF7EA] tw-px-5 tw-py-3 tw-text-sm tw-font-bold tw-text-[#0D5E4D] tw-no-underline tw-transition hover:tw-border-[#E68C23] hover:tw-text-[#C5751E]">{label}</Link>
          ))}
        </nav>
      </div>
    </section>

    {type === 'chatbox' && (
      <section data-reveal className="tw-bg-[#F2EDE5] tw-py-24" aria-labelledby="chatbox-faq-title">
        <div className="tw-mx-auto tw-grid tw-w-[min(76rem,calc(100%_-_2rem))] tw-gap-12 lg:tw-grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="tw-m-0 tw-text-[.68rem] tw-font-black tw-uppercase tw-tracking-[.24em] tw-text-[#E68C23]" data-en="Frequently asked questions" data-vi="Câu hỏi thường gặp">Frequently asked questions</p>
            <h2 id="chatbox-faq-title" className="tw-mb-0 tw-mt-5 tw-font-editorial tw-text-5xl tw-font-semibold tw-leading-none tw-text-[#0D5E4D]" data-en="AI chatbot integration, explained clearly." data-vi="Giải đáp về Chatbot AI cho Fanpage.">AI chatbot integration, explained clearly.</h2>
            <p className="tw-mb-0 tw-mt-6 tw-max-w-md tw-text-sm tw-leading-7 tw-text-[#50675F]" data-en="Practical answers about Facebook Fanpage, Zalo OA, website deployment, handover, data, and project scope." data-vi="Thông tin thực tế về triển khai trên Facebook Fanpage, Zalo OA, website, chuyển nhân viên, dữ liệu và phạm vi dự án.">Practical answers about Facebook Fanpage, Zalo OA, website deployment, handover, data, and project scope.</p>
          </div>
          <div className="tw-space-y-3">
            {chatboxFaqs.map((faq) => (
              <details key={faq.question} className="tw-group tw-rounded-2xl tw-border tw-border-[#0D5E4D]/14 tw-bg-[#FEF7EA] tw-px-5 tw-py-4">
                <summary className="tw-cursor-pointer tw-list-none tw-pr-8 tw-font-editorial tw-text-xl tw-font-semibold tw-text-[#0D5E4D]" data-en={faq.questionEn} data-vi={faq.question}>{faq.questionEn}</summary>
                <p className="tw-mb-1 tw-mt-4 tw-text-sm tw-leading-7 tw-text-[#50675F]" data-en={faq.answerEn} data-vi={faq.answer}>{faq.answerEn}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    )}

    <section className="tw-pb-28">
      <div className="tw-mx-auto tw-flex tw-w-[min(76rem,calc(100%_-_2rem))] tw-flex-col tw-items-start tw-justify-between tw-gap-8 tw-rounded-[2rem] tw-bg-[#0D5E4D] tw-p-8 sm:tw-p-12 lg:tw-flex-row lg:tw-items-end">
        <div><p className="tw-m-0 tw-text-xs tw-font-bold tw-uppercase tw-tracking-[.2em] tw-text-[#F6BD73]">Start a useful conversation</p><h2 className="tw-mb-0 tw-mt-5 tw-max-w-2xl tw-font-editorial tw-text-5xl tw-font-semibold tw-leading-[.9] tw-text-[#FFF9F1]">Bring the challenge. We’ll shape the right path.</h2></div>
        <div className="tw-flex tw-flex-wrap tw-gap-3"><Link to="/contact" data-magnetic data-ripple className="master-magnetic tw-relative tw-overflow-hidden tw-rounded-full tw-bg-[#E68C23] tw-px-6 tw-py-3 tw-text-sm tw-font-bold tw-text-[#FFF9F1] tw-no-underline tw-transition-colors hover:tw-bg-[#FFF9F1] hover:tw-text-[#0D5E4D]">Get consultation</Link><Link to="/packages" className="tw-rounded-full tw-border tw-border-[#FFF9F1]/35 tw-px-6 tw-py-3 tw-text-sm tw-font-bold tw-text-[#FFF9F1] tw-no-underline tw-transition hover:tw-bg-[#FFF9F1]/10">View packages</Link></div>
      </div>
    </section>
  </div>
  );
};

export default ServiceEditorialDetail;
