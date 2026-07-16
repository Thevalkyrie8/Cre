import { useEffect, useState } from 'react';

const packages = [
  {
    id: 'full-operation',
    eyebrow: 'Monthly / Quarterly / Yearly',
    name: 'Full Operation Package',
    description: 'A complete growth team for businesses ready to coordinate every digital channel.',
    features: ['End-to-end digital marketing strategy', 'Multi-channel management', 'Content creation and production', 'Performance reporting and optimization'],
    addOns: ['Conversion website', 'Sales automation'],
    popular: true,
    layout: 'lg:tw-col-span-7 lg:tw-row-span-2 lg:tw-min-h-[43rem]',
  },
  {
    id: 'starter',
    eyebrow: 'One-time payment',
    name: 'Starter Package',
    description: 'A focused foundation for a new business establishing its digital presence.',
    features: ['Professional website or store setup', 'Essential brand positioning', 'Basic SEO optimization'],
    addOns: ['CRM starter setup'],
    layout: 'lg:tw-col-span-5 lg:tw-mt-16 lg:tw-min-h-[23rem]',
  },
  {
    id: 'multi-channel',
    eyebrow: 'Monthly / Quarterly',
    name: 'Multi-channel Sales',
    description: 'Connect storefronts and marketplaces into one practical operating rhythm.',
    features: ['Social media management', 'Marketplace store operations', 'Sales platform integration', 'Inventory coordination'],
    addOns: ['Mobile sales app', 'E-commerce website'],
    layout: 'lg:tw-col-span-5 lg:tw-ml-10 lg:tw-min-h-[27rem]',
  },
  {
    id: 'image-video',
    eyebrow: 'Per project',
    name: 'Image & Video',
    description: 'High-quality visual content designed around products, services, and campaigns.',
    features: ['Professional photography', 'Commercial video', 'Retouched asset library', 'Social media content formats'],
    layout: 'lg:tw-col-span-4 lg:-tw-mt-10 lg:tw-min-h-[26rem]',
  },
  {
    id: 'seo-analytics',
    eyebrow: 'Monthly / Quarterly',
    name: 'SEO & Analytics',
    description: 'Build organic visibility and turn performance data into clear next actions.',
    features: ['Advanced SEO optimization', 'Google Analytics setup', 'Keyword research and content plan', 'Tracking and reporting'],
    addOns: ['Landing page system'],
    layout: 'lg:tw-col-span-5 lg:tw-mt-9 lg:tw-min-h-[29rem]',
  },
  {
    id: 'consulting',
    eyebrow: 'Monthly / Quarterly',
    name: 'Consulting & Strategy',
    description: 'Expert guidance and a decision-ready roadmap for your digital transformation.',
    features: ['Digital strategy consultation', 'Market analysis and research', 'Conversion audits', 'Custom roadmap development'],
    layout: 'lg:tw-col-span-3 lg:-tw-mt-4 lg:tw-min-h-[24rem]',
  },
];

const CheckMark = ({ inverted = false }) => (
  <span className={`tw-mt-0.5 tw-grid tw-h-5 tw-w-5 tw-shrink-0 tw-place-items-center tw-rounded-full tw-border ${inverted ? 'tw-border-[#F5BC72]/55 tw-bg-[#F5BC72]/10 tw-text-[#F5BC72]' : 'tw-border-[#0D5E4D]/25 tw-bg-[#E7EFE9] tw-text-[#0D5E4D]'}`}>
    <svg viewBox="0 0 16 16" className="tw-h-3 tw-w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.25 8.2 2.7 2.55 6.1-6.05" /></svg>
  </span>
);

const PackageCard = ({ item, selectedAddOns, onToggleAddOn }) => {
  const inverted = item.popular;
  return (
    <article data-pricing-reveal className={`pricing-reveal pricing-card ${inverted ? 'pricing-card--popular' : 'pricing-card--standard'} tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded-[2rem] tw-border tw-p-7 tw-transition-[transform,box-shadow,border-color] tw-duration-500 hover:tw-scale-[1.02] sm:tw-p-8 ${item.layout} ${inverted ? 'tw-z-10 tw-border-[#0D5E4D] tw-bg-[#0D5E4D] tw-text-[#FFF9F1] tw-shadow-[0_40px_90px_-48px_rgba(13,94,77,.8)]' : 'tw-border-[#0D5E4D]/14 tw-bg-[#FEF7EA] tw-text-[#263B35] tw-shadow-[0_25px_65px_-52px_rgba(13,94,77,.45)] hover:tw-border-[#E68C23]/45 hover:tw-shadow-[0_36px_80px_-48px_rgba(13,94,77,.5)]'}`}>
      {inverted && <><div className="tw-pointer-events-none tw-absolute -tw-right-24 -tw-top-24 tw-h-80 tw-w-80 tw-rounded-full tw-border tw-border-[#FFF9F1]/10" /><div className="tw-pointer-events-none tw-absolute -tw-bottom-28 tw-left-16 tw-h-72 tw-w-72 tw-rounded-full tw-bg-[#E68C23]/10 tw-blur-3xl" /></>}
      <header className="tw-relative tw-flex tw-items-start tw-justify-between tw-gap-4">
        <span className={`tw-grid tw-h-11 tw-w-11 tw-place-items-center tw-rounded-2xl ${inverted ? 'tw-bg-[#FFF9F1]/10 tw-text-[#F5BC72]' : 'tw-bg-[#E7EFE9] tw-text-[#0D5E4D]'}`}>
          <svg viewBox="0 0 32 32" className="tw-h-6 tw-w-6 tw-transition-transform tw-duration-500 group-hover:-tw-rotate-6 group-hover:tw-scale-110" fill="none" stroke="currentColor" strokeWidth="1.45" aria-hidden="true"><path d="M6 24.5 9.8 9l6.2 6.5L22.2 9 26 24.5Z" /><path d="M8 25h16M12 21.5h8" /></svg>
        </span>
        <span className={`tw-rounded-full tw-border tw-px-3 tw-py-1.5 tw-text-[.62rem] tw-font-extrabold tw-uppercase tw-tracking-[.15em] ${inverted ? 'tw-border-[#F5BC72]/45 tw-text-[#F5BC72]' : 'tw-border-[#0D5E4D]/16 tw-text-[#0D5E4D]'}`}>{item.eyebrow}</span>
      </header>

      {inverted && <div className="tw-relative tw-mt-9 tw-flex tw-items-center tw-gap-3"><span className="tw-rounded-full tw-bg-[#E68C23] tw-px-4 tw-py-2 tw-text-[.66rem] tw-font-black tw-uppercase tw-tracking-[.19em] tw-text-[#FFF9F1]">Most popular</span><span className="tw-h-px tw-flex-1 tw-bg-[#FFF9F1]/15" /></div>}
      <h2 className={`tw-relative tw-m-0 tw-mt-8 tw-font-editorial tw-font-semibold tw-leading-[.92] tw-tracking-[-.045em] ${inverted ? 'tw-max-w-xl tw-text-[clamp(3.8rem,6vw,6.7rem)] tw-text-[#FFF9F1]' : 'tw-text-[2.55rem] tw-text-[#0D5E4D]'}`}>{item.name}</h2>
      <p className={`tw-relative tw-mb-0 tw-mt-5 tw-max-w-xl tw-leading-7 ${inverted ? 'tw-text-base tw-text-[#DDE9E3]' : 'tw-text-sm tw-text-[#546B63]'}`}>{item.description}</p>

      <ul className={`tw-relative tw-mb-0 tw-list-none tw-p-0 ${inverted ? 'tw-mt-12 tw-grid tw-gap-x-8 tw-gap-y-5 sm:tw-grid-cols-2' : 'tw-mt-8 tw-space-y-4'}`}>
        {item.features.map((feature, index) => (
          <li key={feature} style={{ transitionDelay: `${index * 55}ms` }} className={`pricing-feature tw-flex tw-translate-y-1 tw-items-start tw-gap-3 tw-text-sm tw-leading-6 tw-opacity-80 tw-transition tw-duration-500 group-hover:tw-translate-y-0 group-hover:tw-opacity-100 ${inverted ? 'tw-text-[#EEF5F1]' : 'tw-text-[#405A51]'}`}><CheckMark inverted={inverted} /><span>{feature}</span></li>
        ))}
      </ul>

      {item.addOns && (
        <aside className={`tw-relative tw-mt-auto tw-pt-9 ${inverted ? 'sm:tw-max-w-lg' : ''}`}>
          <div className={`tw-rounded-[1.35rem] tw-border tw-p-4 ${inverted ? 'tw-border-[#FFF9F1]/14 tw-bg-[#FFF9F1]/[.06]' : 'tw-border-[#0D5E4D]/12 tw-bg-[#FAF8F5]/80'}`}>
            <div className="tw-flex tw-items-center tw-justify-between tw-gap-4"><p className={`tw-m-0 tw-text-[.64rem] tw-font-black tw-uppercase tw-tracking-[.17em] ${inverted ? 'tw-text-[#F5BC72]' : 'tw-text-[#E68C23]'}`}>Consultant’s note</p><span className={`tw-text-[.65rem] ${inverted ? 'tw-text-[#C8D9D1]' : 'tw-text-[#71837D]'}`}>Optional add-ons</span></div>
            <div className="tw-mt-3 tw-flex tw-flex-wrap tw-gap-2">
              {item.addOns.map((addOn) => {
                const key = `${item.id}:${addOn}`;
                const selected = selectedAddOns.has(key);
                return <button key={addOn} type="button" aria-pressed={selected} onClick={() => onToggleAddOn(key)} className={`tw-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-px-3 tw-py-2 tw-text-xs tw-font-bold tw-transition ${inverted ? selected ? 'tw-border-[#F5BC72] tw-bg-[#F5BC72] tw-text-[#0D5E4D]' : 'tw-border-[#FFF9F1]/20 tw-bg-transparent tw-text-[#EEF5F1] hover:tw-border-[#F5BC72]' : selected ? 'tw-border-[#0D5E4D] tw-bg-[#0D5E4D] tw-text-[#FFF9F1]' : 'tw-border-[#0D5E4D]/16 tw-bg-[#FEF7EA] tw-text-[#0D5E4D] hover:tw-border-[#E68C23]'}`}><span className="tw-grid tw-h-4 tw-w-4 tw-place-items-center tw-rounded-full tw-border tw-border-current tw-text-[.65rem]">{selected ? '✓' : '+'}</span>{addOn}</button>;
              })}
            </div>
          </div>
        </aside>
      )}

      <a href="/contact" data-magnetic data-ripple className={`master-magnetic tw-relative tw-mt-8 tw-inline-flex tw-w-fit tw-items-center tw-gap-3 tw-overflow-hidden tw-rounded-full tw-px-5 tw-py-3 tw-text-sm tw-font-extrabold tw-no-underline tw-transition-colors ${inverted ? 'tw-bg-[#E68C23] tw-text-[#FFF9F1] hover:tw-bg-[#FFF9F1] hover:tw-text-[#0D5E4D]' : 'tw-border tw-border-[#0D5E4D]/24 tw-text-[#0D5E4D] hover:tw-border-[#E68C23] hover:tw-bg-[#E68C23] hover:tw-text-[#FFF9F1]'}`}>Get Started <span aria-hidden="true">↗</span></a>
    </article>
  );
};

const PackagesShowcase = () => {
  const [selectedAddOns, setSelectedAddOns] = useState(() => new Set());

  useEffect(() => {
    const elements = document.querySelectorAll('[data-pricing-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const toggleAddOn = (key) => setSelectedAddOns((current) => {
    const next = new Set(current);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });

  return (
    <main className="packages-light-page tw-overflow-hidden tw-bg-[#FAF8F5] tw-text-[#263B35]">
      <section className="tw-relative tw-pb-24 tw-pt-36 sm:tw-pb-32 sm:tw-pt-44">
        <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[radial-gradient(circle_at_9%_10%,rgba(13,94,77,.10),transparent_25%),radial-gradient(circle_at_91%_18%,rgba(230,140,35,.10),transparent_20%)]" />
        <div className="tw-relative tw-mx-auto tw-w-[min(78rem,calc(100%_-_2rem))]">
          <header data-pricing-reveal className="pricing-reveal tw-grid tw-gap-10 lg:tw-grid-cols-12 lg:tw-items-end">
            <div className="lg:tw-col-span-8"><div className="tw-flex tw-items-center tw-gap-4"><span className="tw-h-px tw-w-12 tw-bg-[#E68C23]" /><p className="tw-m-0 tw-text-[.68rem] tw-font-black tw-uppercase tw-tracking-[.27em] tw-text-[#0D5E4D]">Service packages on demand</p></div><h1 data-title-reveal className="master-title tw-mb-0 tw-mt-9 tw-font-editorial tw-text-[clamp(4.2rem,8.5vw,8.6rem)] tw-font-semibold tw-leading-[.8] tw-tracking-[-.065em] tw-text-[#0D5E4D]">Plans shaped around momentum.</h1></div>
            <div className="lg:tw-col-span-3 lg:tw-col-start-10 lg:tw-pb-3"><p className="tw-m-0 tw-text-base tw-leading-8 tw-text-[#536A61]">Start with the operating model that fits today. Add specialist capabilities only when they create real leverage.</p><span className="tw-mt-7 tw-block tw-font-editorial tw-text-2xl tw-font-semibold tw-italic tw-text-[#E68C23]">No forced bundles.</span></div>
          </header>

          <div className="tw-mt-24 tw-grid tw-grid-cols-1 tw-gap-5 md:tw-grid-cols-2 lg:tw-grid-cols-12 lg:tw-gap-6">
            {packages.map((item) => <PackageCard key={item.id} item={item} selectedAddOns={selectedAddOns} onToggleAddOn={toggleAddOn} />)}
          </div>
        </div>
      </section>

      <section className="tw-border-t tw-border-[#0D5E4D]/10 tw-bg-[#E7EFE9] tw-py-20">
        <div data-pricing-reveal className="pricing-reveal tw-mx-auto tw-flex tw-w-[min(78rem,calc(100%_-_2rem))] tw-flex-col tw-items-start tw-justify-between tw-gap-8 lg:tw-flex-row lg:tw-items-end"><div><p className="tw-m-0 tw-text-xs tw-font-black tw-uppercase tw-tracking-[.2em] tw-text-[#E68C23]">Need a hybrid scope?</p><h2 className="tw-mb-0 tw-mt-5 tw-max-w-3xl tw-font-editorial tw-text-5xl tw-font-semibold tw-leading-[.9] tw-text-[#0D5E4D]">We can compose a plan without making it complicated.</h2></div><a href="/contact" data-magnetic data-ripple className="master-magnetic tw-relative tw-shrink-0 tw-overflow-hidden tw-rounded-full tw-bg-[#0D5E4D] tw-px-6 tw-py-3.5 tw-text-sm tw-font-extrabold tw-text-[#FFF9F1] tw-no-underline tw-transition-colors hover:tw-bg-[#E68C23]">Build my scope</a></div>
      </section>
    </main>
  );
};

export default PackagesShowcase;
