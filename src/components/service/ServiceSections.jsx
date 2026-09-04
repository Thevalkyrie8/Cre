import { createElement } from 'react';
import { Link } from 'react-router-dom';
import './serviceSections.css';

/* Shared, data-driven presentational sections for the Cluster F money pages.
   Bilingual per the site convention: the English string is the JSX child
   (pre-hydration text) and both data-en / data-vi are set on the same element,
   so Layout.jsx's applyLanguage() can swap textContent. Only leaf text nodes
   carry the attributes. */

export const T = ({ as = 'span', vi, en, ...rest }) => createElement(
  as,
  { 'data-vi': vi, 'data-en': en, ...rest },
  en,
);

const slug = (value = '') => value
  .toString()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const Section = ({ id, titleVi, titleEn, eyebrowVi, eyebrowEn, leadVi, leadEn, tint, flush, children }) => {
  const headingId = id || `svc-${slug(titleEn || titleVi || 'section')}`;
  return (
    <section
      className={`svc svc-sec${tint ? ' svc-sec--tint' : ''}${flush ? ' svc-sec--flush' : ''}`}
      aria-labelledby={headingId}
    >
      <div className="svc-shell">
        {(eyebrowVi || eyebrowEn) && <T className="svc-sec__eyebrow" vi={eyebrowVi} en={eyebrowEn} />}
        <T as="h2" id={headingId} className="svc-sec__title" vi={titleVi} en={titleEn} />
        {(leadVi || leadEn) && <T as="p" className="svc-sec__lead" vi={leadVi} en={leadEn} />}
        {children}
      </div>
    </section>
  );
};

/* ---- Direct Answer (AEO): question as H2, self-contained answer paragraph --- */
export const DirectAnswer = ({ id, questionVi, questionEn, answerVi, answerEn }) => (
  <Section id={id} titleVi={questionVi} titleEn={questionEn} flush>
    <div className="svc-answer">
      <T as="p" className="svc-answer__text" vi={answerVi} en={answerEn} />
    </div>
  </Section>
);

/* ---- Trust Signals ------------------------------------------------------------ */
export const TrustSignals = ({ data }) => {
  if (!data?.items?.length) return null;
  return (
    <Section titleVi={data.headingVi} titleEn={data.headingEn} tint>
      <ul className="svc-list svc-list--check">
        {data.items.map((item, i) => (
          <T as="li" key={i} vi={item.vi} en={item.en} />
        ))}
      </ul>
    </Section>
  );
};

/* ---- Service Types (sub-services, short — link out to deep content) --------- */
export const ServiceTypes = ({ titleVi, titleEn, leadVi, leadEn, items = [] }) => {
  if (!items.length) return null;
  return (
    <Section titleVi={titleVi} titleEn={titleEn} leadVi={leadVi} leadEn={leadEn}>
      <div className="svc-grid">
        {items.map((item, i) => (
          <article className="svc-card" key={i}>
            <T as="h3" className="svc-card__title" vi={item.titleVi} en={item.titleEn} />
            <T as="p" className="svc-card__body" vi={item.bodyVi} en={item.bodyEn} />
            {item.to && (item.linkVi || item.linkEn) && (
              <Link className="svc-card__link" to={item.to}>
                <T vi={item.linkVi} en={item.linkEn} />
              </Link>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
};

/* ---- Who it's for --------------------------------------------------------- */
export const WhoItsFor = ({ titleVi, titleEn, leadVi, leadEn, items = [] }) => {
  if (!items.length) return null;
  return (
    <Section titleVi={titleVi} titleEn={titleEn} leadVi={leadVi} leadEn={leadEn}>
      <ul className="svc-list">
        {items.map((item, i) => (
          <T as="li" key={i} vi={item.vi} en={item.en} />
        ))}
      </ul>
    </Section>
  );
};

/* ---- Deliverables ------------------------------------------------------------ */
export const Deliverables = ({ titleVi, titleEn, leadVi, leadEn, items = [] }) => {
  if (!items.length) return null;
  return (
    <Section titleVi={titleVi} titleEn={titleEn} leadVi={leadVi} leadEn={leadEn}>
      <ul className="svc-list svc-list--check">
        {items.map((item, i) => (
          <T as="li" key={i} vi={item.vi} en={item.en} />
        ))}
      </ul>
    </Section>
  );
};

/* ---- Numbered process ---------------------------------------------------------- */
export const ServiceProcess = ({ id, titleVi, titleEn, leadVi, leadEn, steps = [], tint }) => {
  if (!steps.length) return null;
  return (
    <Section id={id} titleVi={titleVi} titleEn={titleEn} leadVi={leadVi} leadEn={leadEn} tint={tint}>
      <ol className="svc-steps">
        {steps.map((step, i) => (
          <li key={i}>
            <div>
              <T as="h3" className="svc-steps__title" vi={step.titleVi} en={step.titleEn} />
              <T as="p" className="svc-steps__body" vi={step.descVi} en={step.descEn} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
};

/* ---- Cost factors ------------------------------------------------------------ */
export const CostFactors = ({ titleVi, titleEn, leadVi, leadEn, items = [], pricingLink }) => {
  if (!items.length) return null;
  return (
    <Section titleVi={titleVi} titleEn={titleEn} leadVi={leadVi} leadEn={leadEn}>
      <ul className="svc-list">
        {items.map((item, i) => (
          <T as="li" key={i} vi={item.vi} en={item.en} />
        ))}
      </ul>
      {pricingLink && (
        <p className="svc-note">
          <Link className="svc-expert__link" to={pricingLink.to}>
            <T vi={pricingLink.anchorVi} en={pricingLink.anchorEn} />
          </Link>
        </p>
      )}
    </Section>
  );
};

/* ---- Generic spec list (aspect ratios, product requirements, post-production) - */
export const SpecList = ({ id, titleVi, titleEn, leadVi, leadEn, items = [], check }) => {
  if (!items.length) return null;
  return (
    <Section id={id} titleVi={titleVi} titleEn={titleEn} leadVi={leadVi} leadEn={leadEn}>
      <ul className={`svc-list${check ? ' svc-list--check' : ''}`}>
        {items.map((item, i) => (
          <T as="li" key={i} vi={item.vi} en={item.en} />
        ))}
      </ul>
    </Section>
  );
};

/* ---- Client prep (grouped, deeper) --------------------------------------------- */
export const ClientPrep = ({ titleVi, titleEn, leadVi, leadEn, groups = [] }) => {
  if (!groups.length) return null;
  return (
    <Section titleVi={titleVi} titleEn={titleEn} leadVi={leadVi} leadEn={leadEn}>
      <div className="svc-prep">
        {groups.map((group, i) => (
          <div className="svc-prep__group" key={i}>
            <T as="h3" className="svc-prep__heading" vi={group.headingVi} en={group.headingEn} />
            <ul>
              {group.items.map((item, j) => (
                <T as="li" key={j} vi={item.vi} en={item.en} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

/* ---- Expert / author (E-E-A-T) ---------------------------------------------- */
export const ExpertAuthor = ({ data }) => {
  if (!data) return null;
  return (
    <Section titleVi={data.headingVi} titleEn={data.headingEn}>
      <div className="svc-expert">
        <div className="svc-expert__body">
          <T as="p" className="svc-expert__name" vi={data.teamVi} en={data.teamEn} />
          <T as="p" className="svc-expert__text" vi={data.bodyVi} en={data.bodyEn} />
          {data.link && (
            <Link className="svc-expert__link" to={data.link.to}>
              <T vi={data.link.labelVi} en={data.link.labelEn} />
            </Link>
          )}
        </div>
      </div>
    </Section>
  );
};

/* ---- FAQ (visible list — must mirror seoConfig faqs for the schema contract) - */
export const FAQSection = ({ id, titleVi = 'Câu hỏi thường gặp', titleEn = 'Frequently asked questions', faqs = [] }) => {
  if (!faqs.length) return null;
  return (
    <Section id={id} titleVi={titleVi} titleEn={titleEn} tint>
      <div className="svc-faq">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary data-vi={faq.question} data-en={faq.questionEn || faq.question}>
              {faq.questionEn || faq.question}
            </summary>
            <p data-vi={faq.answer} data-en={faq.answerEn || faq.answer}>
              {faq.answerEn || faq.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
};

/* ---- Final CTA ------------------------------------------------------------- */
const ZALO_URL = 'https://zalo.me/3299309778518905129';

export const FinalCTA = ({
  titleVi, titleEn, textVi, textEn,
  primaryVi = 'Gửi brief qua Zalo', primaryEn = 'Send a brief on Zalo', primaryHref = ZALO_URL,
  secondaryVi = 'Đặt lịch trao đổi', secondaryEn = 'Book a conversation', secondaryTo = '/contact',
}) => (
  <Section titleVi={titleVi} titleEn={titleEn} flush>
    <div className="svc-cta">
      <div className="svc-cta__copy">
        {(textVi || textEn) && <T as="p" className="svc-cta__text" vi={textVi} en={textEn} />}
      </div>
      <div className="svc-cta__actions">
        <a className="svc-action" href={primaryHref}>
          <T vi={primaryVi} en={primaryEn} />
        </a>
        <Link className="svc-textlink" to={secondaryTo}>
          <T vi={secondaryVi} en={secondaryEn} />
        </Link>
      </div>
    </div>
  </Section>
);
