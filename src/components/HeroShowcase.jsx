const ServiceIcon = ({ type }) => {
  const paths = {
    web: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 22h10M8 10h8M7 14h5" /></>,
    mobile: <><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M10 5h4M11.5 18h1" /></>,
    design: <><path d="m5 18 3.5-.8L19 6.7 16.3 4 5.8 14.5 5 18Z" /><path d="m14.7 5.7 2.7 2.7" /></>,
    growth: <><path d="M4 20h17M7 17v-5M12 17V8M17 17V4" /><path d="m5 9 5-4 4 2 6-5" /></>,
  };
  return <span className="tw-grid tw-h-8 tw-w-8 tw-place-items-center tw-rounded-lg tw-border tw-border-sky-300/20 tw-bg-sky-400/10 tw-text-sky-300"><svg viewBox="0 0 24 24" className="tw-h-4 tw-w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg></span>;
};

const BrowserArtwork = () => (
  <div className="tw-relative tw-mx-auto tw-mt-3 tw-h-36 tw-w-[92%]">
    <div className="tw-absolute tw-inset-x-0 tw-bottom-0 tw-top-2 tw-overflow-hidden tw-rounded-xl tw-border tw-border-white/15 tw-bg-[#121722]/90 tw-shadow-2xl">
      <div className="tw-flex tw-h-7 tw-items-center tw-gap-1.5 tw-border-b tw-border-white/10 tw-bg-white/[0.08] tw-px-3"><i className="tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-rose-400" /><i className="tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-amber-300" /><i className="tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-emerald-300" /><span className="tw-ml-3 tw-h-3 tw-flex-1 tw-rounded tw-bg-black/25" /></div>
      <div className="tw-space-y-2 tw-p-4 tw-font-mono tw-text-[6px] tw-text-slate-400"><p><span className="tw-text-sky-300">&lt;html&gt;</span></p><p className="tw-pl-3"><span className="tw-text-violet-300">&lt;body</span> class=<span className="tw-text-amber-200">&quot;studio&quot;</span><span className="tw-text-violet-300">&gt;</span></p><p className="tw-pl-6"><span className="tw-text-sky-300">const</span> growth = <span className="tw-text-emerald-300">build()</span>;</p><p className="tw-ml-6 tw-w-2/3 tw-border-b tw-border-sky-400/50" /><p className="tw-pl-3"><span className="tw-text-violet-300">&lt;/body&gt;</span></p></div>
    </div>
    <div className="tw-absolute -tw-bottom-1 -tw-right-3 tw-h-20 tw-w-20 tw-rounded-full tw-border tw-border-white/20 tw-bg-[radial-gradient(circle_at_35%_30%,#a6b4c7,#303b4c_55%,#111722)] tw-shadow-[0_14px_35px_rgba(0,0,0,.65)]"><span className="tw-absolute tw-left-3 tw-top-5 tw-h-7 tw-w-12 tw-rotate-12 tw-rounded-[50%] tw-border tw-border-slate-300/25" /><span className="tw-absolute tw-left-7 tw-top-1 tw-h-16 tw-w-7 -tw-rotate-12 tw-rounded-[50%] tw-border tw-border-slate-300/20" /></div>
  </div>
);

const PhoneArtwork = () => (
  <div className="mobile-artwork tw-relative tw-mx-auto tw-mt-5 tw-h-36 tw-w-28"><span className="mobile-ring tw-absolute tw-inset-0 tw-rounded-full tw-border tw-border-white/[0.08]" /><span className="mobile-ring tw-absolute tw-inset-3 tw-rounded-full tw-border tw-border-white/[0.08]" /><div className="mobile-phone-shell tw-absolute tw-left-1/2 tw-top-0 tw-h-32 tw-w-16 -tw-translate-x-1/2 tw-rounded-[1rem] tw-border tw-border-white/20 tw-bg-gradient-to-br tw-from-slate-500/70 tw-to-slate-950 tw-p-1.5 tw-shadow-2xl"><span className="mobile-speaker tw-mx-auto tw-block tw-h-0.5 tw-w-5 tw-rounded tw-bg-white/25" /><span className="mobile-screen tw-mt-2 tw-block tw-h-[4.8rem] tw-rounded-lg tw-border tw-border-white/10 tw-bg-gradient-to-br tw-from-slate-600 tw-to-slate-900" /><span className="mobile-accent tw-mt-1.5 tw-block tw-h-4 tw-rounded tw-bg-gradient-to-r tw-from-slate-700 tw-to-sky-300" /></div></div>
);

const DesignArtwork = () => (
  <div className="tw-relative tw-mx-auto tw-mt-4 tw-h-32 tw-w-[94%] tw-overflow-hidden tw-rounded-lg tw-border tw-border-white/10 tw-bg-[#171d28] tw-p-3"><div className="tw-flex tw-items-center tw-justify-between tw-text-[5px] tw-text-slate-400"><span>Your team collaboration</span><span className="tw-rounded tw-bg-sky-400/40 tw-px-2 tw-py-0.5">Share</span></div><div className="tw-mt-3 tw-grid tw-grid-cols-[.8fr_1.6fr_1fr] tw-gap-2"><div className="tw-space-y-2">{[1,2,3,4].map((item) => <i key={item} className="tw-block tw-h-1 tw-rounded tw-bg-white/10" />)}</div><div className="tw-relative tw-h-20 tw-border tw-border-sky-300/35 tw-bg-sky-400/[0.06]"><span className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(to_top_right,transparent_49%,rgba(125,211,252,.35)_50%,transparent_51%)]" /></div><div className="tw-space-y-2">{[1,2,3].map((item) => <i key={item} className="tw-block tw-h-3 tw-rounded tw-bg-white/10" />)}</div></div></div>
);

const ChartArtwork = () => (
  <div className="growth-artwork tw-mx-auto tw-mt-5 tw-flex tw-h-32 tw-w-[88%] tw-items-end tw-justify-between tw-gap-2 tw-border-b tw-border-white/10 tw-px-2 tw-pb-2">{[40, 68, 48, 74, 100].map((height, index) => <span key={height} className="growth-bar tw-w-full tw-rounded-t tw-bg-gradient-to-t tw-from-indigo-600 tw-to-cyan-300 tw-shadow-[0_0_20px_rgba(56,189,248,.12)]" style={{ height: `${height}%`, opacity: 0.84 + index * 0.035 }} />)}</div>
);

const ServiceCard = ({ type, title, children, className = '' }) => (
  <article className={`crafted-service-card crafted-service-card--${type} tw-relative tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/15 tw-bg-white/[0.075] tw-p-4 tw-shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_24px_70px_rgba(0,0,0,.32)] tw-backdrop-blur-xl ${className}`}><div className="tw-flex tw-items-center tw-gap-3"><ServiceIcon type={type} /><h2 className="tw-m-0 tw-whitespace-nowrap tw-text-sm tw-font-bold tw-tracking-[-0.02em] tw-text-slate-100 xl:tw-text-base">{title}</h2></div>{children}</article>
);

const HeroShowcase = () => {
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="unitrux-approved-hero tw-relative tw-isolate tw-overflow-hidden tw-bg-[#090b10] tw-pt-32 sm:tw-pt-36 lg:tw-pt-40">
      <div className="hero-ambient tw-pointer-events-none tw-absolute tw-inset-0 -tw-z-10 tw-bg-[radial-gradient(circle_at_12%_28%,rgba(89,174,231,.18),transparent_25%),radial-gradient(circle_at_31%_24%,rgba(166,199,190,.10),transparent_26%),linear-gradient(110deg,#10151c_0%,#0b0e14_47%,#08090e_100%)]" />
      <svg className="hero-wave tw-pointer-events-none tw-absolute -tw-right-40 tw-top-10 -tw-z-10 tw-h-[44rem] tw-w-[68rem] tw-opacity-[0.12]" viewBox="0 0 900 600" fill="none" aria-hidden="true">{Array.from({ length: 20 }, (_, index) => <path key={index} d={`M50 ${450 - index * 8} C 250 ${190 - index * 2}, 480 ${590 - index * 4}, 860 ${110 + index * 11}`} stroke="#93c5fd" strokeWidth="1" />)}</svg>
      <div className="tw-mx-auto tw-grid tw-w-[min(86rem,calc(100%_-_2rem))] tw-items-center tw-gap-10 lg:tw-grid-cols-[1.08fr_.92fr] xl:tw-gap-16">
        <div className="hero-copy tw-max-w-[39rem]">
          <p className="tw-mb-5 tw-inline-flex tw-rounded-full tw-border tw-border-white/15 tw-bg-white/[0.035] tw-px-4 tw-py-1.5 tw-text-xs tw-font-bold tw-text-sky-300 tw-shadow-inner"><span data-en="Digital Growth Experts" data-vi="Chuyên gia tăng trưởng số">Digital Growth Experts</span></p>
          <h1 data-title-reveal className="master-title tw-m-0 tw-text-[clamp(2.75rem,4.5vw,4.15rem)] tw-font-extrabold tw-leading-[0.99] tw-tracking-[-0.055em] tw-text-slate-100"><span data-en="Innovative Solutions," data-vi="Giải pháp sáng tạo," className="tw-block">Innovative Solutions,</span><span data-en="Exceptional Results." data-vi="Kết quả vượt trội." className="tw-mt-2 tw-block">Exceptional Results.</span></h1>
          <p className="tw-mt-6 tw-max-w-[37rem] tw-text-base tw-leading-7 tw-text-slate-300/75 sm:tw-text-lg"><span data-en="We build websites, e-commerce systems, content assets, and marketing campaigns that help businesses launch faster, sell better, and measure what is working." data-vi="Chúng tôi xây dựng website, hệ thống thương mại điện tử, nội dung và chiến dịch marketing giúp doanh nghiệp ra mắt nhanh hơn, bán hàng tốt hơn và đo lường hiệu quả rõ ràng.">We build websites, e-commerce systems, content assets, and marketing campaigns that help businesses launch faster, sell better, and measure what is working.</span></p>
          <div className="tw-mt-8 tw-flex tw-flex-wrap tw-gap-3"><a href="https://drive.google.com/drive/folders/1C-WjM-Y4mBzHvfX1Mpvo5Vmd_rgXK3MQ" target="_blank" rel="noreferrer" className="hero-proof-cta tw-inline-flex tw-h-12 tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-sky-400 tw-px-6 tw-text-sm tw-font-bold tw-text-sky-300 tw-no-underline tw-shadow-[0_0_28px_rgba(56,189,248,.12)] tw-transition hover:tw-bg-sky-400/10"><span data-en="View Our Success Stories" data-vi="Xem câu chuyện thành công">View Our Success Stories</span><span aria-hidden="true">›</span></a><button type="button" onClick={scrollToContact} data-magnetic data-ripple className="master-magnetic hero-consult-cta tw-relative tw-h-12 tw-cursor-pointer tw-overflow-hidden tw-rounded-full tw-border-0 tw-bg-white tw-px-7 tw-text-sm tw-font-extrabold tw-text-slate-950 tw-shadow-xl tw-transition-colors hover:tw-bg-sky-100"><span data-en="Get Free Consultation" data-vi="Nhận tư vấn miễn phí">Get Free Consultation</span></button></div>
        </div>
        <div className="tw-grid tw-grid-cols-1 tw-gap-3 sm:tw-grid-cols-3" aria-label="Core services"><ServiceCard type="web" title="Web Development" className="tw-min-h-[14rem] sm:tw-col-span-2"><BrowserArtwork /></ServiceCard><ServiceCard type="mobile" title="Mobile Apps" className="tw-min-h-[14rem]"><PhoneArtwork /></ServiceCard><ServiceCard type="design" title="UI/UX Design" className="tw-min-h-[12rem] sm:tw-col-span-2"><DesignArtwork /></ServiceCard><ServiceCard type="growth" title="Digital Marketing" className="tw-min-h-[12rem]"><ChartArtwork /></ServiceCard></div>
      </div>
      <div className="tw-h-14" />
    </section>
  );
};

export default HeroShowcase;
