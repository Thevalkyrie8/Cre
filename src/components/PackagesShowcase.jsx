import { useState } from 'react';
import { Link } from 'react-router-dom';

const packages = [
  {
    id: 'full-operation',
    stage: 'Scale',
    period: 'Monthly / Quarterly / Yearly',
    name: 'Full Operation Package',
    description: 'A complete growth team coordinating strategy, content, acquisition and measurement across every active channel.',
    features: ['End-to-end digital marketing strategy', 'Multi-channel campaign management', 'Content creation and production', 'Performance reporting and optimization'],
    addOns: ['Conversion website', 'Sales automation'],
    popular: true,
  },
  {
    id: 'starter',
    stage: 'Launch',
    period: 'One-time payment',
    name: 'Starter Package',
    description: 'A focused digital foundation for a new business or an existing brand ready to look credible online.',
    features: ['Professional website or store setup', 'Essential brand positioning', 'Basic SEO optimization'],
    addOns: ['CRM starter setup'],
  },
  {
    id: 'multi-channel',
    stage: 'Sell',
    period: 'Monthly / Quarterly',
    name: 'Multi-channel Sales',
    description: 'Connect social channels, marketplaces and storefronts into one practical operating rhythm.',
    features: ['Social media management', 'Marketplace store operations', 'Sales platform integration', 'Inventory coordination'],
    addOns: ['Mobile sales app', 'E-commerce website'],
  },
  {
    id: 'image-video',
    stage: 'Create',
    period: 'Per project',
    name: 'Image & Video',
    description: 'Sales-focused visual content built around your products, services and campaign objectives.',
    features: ['Professional photography', 'Commercial video', 'Retouched asset library', 'Social media content formats'],
  },
  {
    id: 'seo-analytics',
    stage: 'Measure',
    period: 'Monthly / Quarterly',
    name: 'SEO & Analytics',
    description: 'Build organic visibility and turn performance data into clear, commercially useful next actions.',
    features: ['Advanced SEO optimization', 'Google Analytics setup', 'Keyword research and content plan', 'Tracking and reporting'],
    addOns: ['Landing page system'],
  },
  {
    id: 'consulting',
    stage: 'Decide',
    period: 'Monthly / Quarterly',
    name: 'Consulting & Strategy',
    description: 'Expert guidance and a decision-ready roadmap before your business commits budget or resources.',
    features: ['Digital strategy consultation', 'Market analysis and research', 'Conversion audits', 'Custom roadmap development'],
  },
];

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
      <p>Optional add-ons</p>
      <div>
        {item.addOns.map((addOn) => {
          const key = `${item.id}:${addOn}`;
          const selected = selectedAddOns.has(key);
          return (
            <button key={addOn} type="button" aria-pressed={selected} onClick={() => onToggle(key)}>
              <span aria-hidden="true">{selected ? '✓' : '+'}</span>{addOn}
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
      <span className="packages-hub__stage">{item.stage}</span>
      <span className="packages-hub__period">{item.period}</span>
    </header>
    <h3>{item.name}</h3>
    <p className="packages-hub__plan-description">{item.description}</p>
    <ul>
      {item.features.map((feature) => <li key={feature}><CheckIcon /><span>{feature}</span></li>)}
    </ul>
    <AddOnPicker item={item} selectedAddOns={selectedAddOns} onToggle={onToggleAddOn} />
    <Link to={contactHref} className="packages-hub__plan-link">Discuss this package <ArrowIcon /></Link>
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
    const params = new URLSearchParams({ package: item.name });
    if (addOns.length) params.set('addons', addOns.join(', '));
    return `/contact?${params.toString()}`;
  };

  const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat'));

  return (
    <main className="theme-synced-page packages-hub">
      <section className="packages-hub__hero" aria-labelledby="packages-title">
        <div className="packages-hub__container packages-hub__hero-grid">
          <div className="packages-hub__intro">
            <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>Packages</span></nav>
            <p className="packages-hub__label">Flexible service packages</p>
            <h1 id="packages-title">Choose the system your next stage needs.</h1>
            <p className="packages-hub__lede">Start with a clear business outcome—not a list of disconnected deliverables. Every package can connect website, content, acquisition and automation into one measurable growth system.</p>
            <div className="packages-hub__hero-actions">
              <Link to="/contact" className="packages-hub__primary-action">Get a tailored recommendation <ArrowIcon /></Link>
              <a href="#packages">Explore all packages</a>
            </div>
          </div>

          <aside className="packages-hub__engine" aria-label="Connected Growth Engine">
            <header><span aria-hidden="true" /><h2>Connected Growth Engine</h2></header>
            <p>One operating model. Four connected capabilities.</p>
            <ol>
              <li><strong>Build trust</strong><span>Website and brand foundation</span></li>
              <li><strong>Attract demand</strong><span>SEO, ads and content</span></li>
              <li><strong>Convert leads</strong><span>Chatbot and sales automation</span></li>
              <li><strong>Measure growth</strong><span>Analytics and optimization</span></li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="packages-hub__guide" aria-labelledby="package-guide-title">
        <div className="packages-hub__container">
          <div className="packages-hub__guide-intro"><h2 id="package-guide-title">Start from the bottleneck.</h2><p>You do not need everything at once. Choose the stage that is holding growth back today.</p></div>
          <div className="packages-hub__guide-steps">
            <div><strong>Need credibility?</strong><span>Start with Launch.</span></div>
            <div><strong>Need more demand?</strong><span>Choose Create or Measure.</span></div>
            <div><strong>Need one operating team?</strong><span>Move to Scale.</span></div>
          </div>
        </div>
      </section>

      <section className="packages-hub__plans" id="packages" aria-labelledby="plans-title">
        <div className="packages-hub__container">
          <header className="packages-hub__section-head">
            <div><h2 id="plans-title">Packages built around outcomes.</h2><p>Every scope is clarified before work begins. Add-ons stay optional and selected choices follow you into the contact form.</p></div>
            <button type="button" onClick={openChat}>Ask Unitrux to help me choose</button>
          </header>

          <article className="packages-hub__featured-plan">
            <div className="packages-hub__featured-summary">
              <div className="packages-hub__featured-top"><span>Recommended</span><span>{featured.period}</span></div>
              <p className="packages-hub__stage">{featured.stage}</p>
              <h2>{featured.name}</h2>
              <p>{featured.description}</p>
              <Link to={contactHref(featured)} className="packages-hub__primary-action">Discuss the full operation plan <ArrowIcon /></Link>
            </div>
            <div className="packages-hub__featured-scope">
              <h3>What the team operates</h3>
              <ul>{featured.features.map((feature) => <li key={feature}><CheckIcon /><span>{feature}</span></li>)}</ul>
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
          <div><h2 id="assurance-title">Clear before you commit.</h2><p>Unitrux scopes the work around your operating reality, not a generic checklist.</p></div>
          <dl>
            <div><dt>Defined scope</dt><dd>Deliverables, ownership and timelines agreed before kickoff.</dd></div>
            <div><dt>Measurable baseline</dt><dd>Tracking and success signals established from the start.</dd></div>
            <div><dt>Flexible expansion</dt><dd>Add specialist capabilities only when they create leverage.</dd></div>
          </dl>
        </div>
      </section>

      <section className="packages-hub__cta" aria-labelledby="packages-cta-title">
        <div className="packages-hub__container">
          <div><h2 id="packages-cta-title">Not sure which package fits?</h2><p>Tell us where growth is stuck. We will recommend the smallest useful scope.</p></div>
          <div><Link to="/contact" className="packages-hub__primary-action">Build my scope <ArrowIcon /></Link><button type="button" onClick={openChat}>Chat with Unitrux</button></div>
        </div>
      </section>
    </main>
  );
};

export default PackagesShowcase;
