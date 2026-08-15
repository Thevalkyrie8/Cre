import { Link, useParams } from 'react-router-dom';
import { getServiceContent } from '../data/servicesContent';
import {
  contentCreationFaqs,
  digitalSolutionsFaqs,
  fanpageFaqs,
  productPhotographyFaqs,
  seoServicesFaqs,
  webDevelopmentFaqs,
} from '../seo/seoConfig';
import './ServiceLanding.css';

const faqsByKey = {
  'digital-solutions': digitalSolutionsFaqs,
  'fanpage-management': fanpageFaqs,
  'content-creation': contentCreationFaqs,
  'seo-services': seoServicesFaqs,
  'product-photography': productPhotographyFaqs,
  'web-development': webDevelopmentFaqs,
};

const Bilingual = ({ as: Tag = 'span', value, ...rest }) => (
  <Tag data-en={value.en} data-vi={value.vi} {...rest}>{value.en}</Tag>
);

const ServiceLanding = ({ serviceKey: propServiceKey }) => {
  const params = useParams();
  const serviceKey = propServiceKey || params.serviceKey;
  const content = getServiceContent(serviceKey);
  const faqs = faqsByKey[serviceKey] || [];

  if (!content) return null;

  return (
    <div className="service-landing">
      <header className="service-landing__hero">
        <div className="service-landing__shell service-landing__hero-layout">
          <div className="service-landing__hero-copy">
            <nav className="service-landing__breadcrumbs" aria-label="Breadcrumb">
              <Link to="/"><span data-en="Home" data-vi="Trang chủ">Home</span></Link>
              <span aria-hidden="true">/</span>
              <Link to="/services"><span data-en="Services" data-vi="Dịch vụ">Services</span></Link>
              <span aria-hidden="true">/</span>
              <Bilingual value={content.title} />
            </nav>
            <p className="service-landing__eyebrow"><Bilingual value={content.eyebrow} /></p>
            <Bilingual as="h1" value={content.title} />
            <Bilingual as="p" className="service-landing__intro" value={content.intro} />
            <div className="service-landing__actions">
              <Link to="/contact" className="service-landing__button service-landing__button--primary">
                <span data-en="Request a proposal" data-vi="Nhận đề xuất triển khai">Request a proposal</span>
              </Link>
              <a className="service-landing__button service-landing__button--secondary" href="https://zalo.me/3299309778518905129">
                <span data-en="Talk on Zalo" data-vi="Trao đổi qua Zalo">Talk on Zalo</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          {content.stats?.length > 0 && (
            <ul className="service-landing__stats" aria-label="Key facts">
              {content.stats.map((stat, index) => (
                <li key={index}>
                  <strong>{stat.value}</strong>
                  <Bilingual as="span" value={stat.label} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {content.problem && (
        <section className="service-landing__section service-landing__problem" aria-labelledby="service-problem-title">
          <div className="service-landing__shell">
            <Bilingual as="h2" id="service-problem-title" value={content.problem.title} />
            <ul className="service-landing__problem-list">
              {content.problem.points.map((point, index) => (
                <li key={index}>
                  <span className="service-landing__problem-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <Bilingual as="p" value={point} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content.capabilities?.length > 0 && (
        <section className="service-landing__section service-landing__capabilities" aria-labelledby="service-capabilities-title">
          <div className="service-landing__shell">
            <h2 id="service-capabilities-title" data-en="What's included" data-vi="Hạng mục triển khai">What&rsquo;s included</h2>
            <div className="service-landing__capabilities-grid">
              {content.capabilities.map((capability, index) => (
                <article key={index} className="service-landing__capability-card">
                  <Bilingual as="h3" value={capability.title} />
                  <Bilingual as="p" value={capability.description} />
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.gallery?.length > 0 && (
        <section className="service-landing__section service-landing__gallery" aria-labelledby="service-gallery-title">
          <div className="service-landing__shell">
            <h2 id="service-gallery-title" data-en="From recent shoots" data-vi="Hình ảnh từ những buổi chụp gần đây">From recent shoots</h2>
            <div className="service-landing__gallery-grid">
              {content.gallery.map((photo, index) => (
                <figure className="service-landing__gallery-item" key={index}>
                  <img src={photo.src} alt={photo.labelEn} loading="lazy" />
                  <figcaption data-en={photo.labelEn} data-vi={photo.labelVi}>{photo.labelEn}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.process?.length > 0 && (
        <section className="service-landing__section service-landing__process" aria-labelledby="service-process-title">
          <div className="service-landing__shell">
            <h2 id="service-process-title" data-en="How we work" data-vi="Quy trình triển khai">How we work</h2>
            <ol className="service-landing__process-list">
              {content.process.map((step, index) => (
                <li key={index}>
                  <span className="service-landing__process-index" aria-hidden="true">{index + 1}</span>
                  <div>
                    <Bilingual as="h3" value={step.title} />
                    <Bilingual as="p" value={step.description} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {content.deliverables?.length > 0 && (
        <section className="service-landing__section service-landing__deliverables" aria-labelledby="service-deliverables-title">
          <div className="service-landing__shell">
            <h2 id="service-deliverables-title" data-en="What you receive" data-vi="Bàn giao khi hoàn tất">What you receive</h2>
            <ul className="service-landing__deliverables-list">
              {content.deliverables.map((item, index) => (
                <li key={index}><Bilingual value={item} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="service-landing__section service-landing__faq" aria-labelledby="service-faq-title">
          <div className="service-landing__shell">
            <h2 id="service-faq-title" data-en="Frequently asked questions" data-vi="Câu hỏi thường gặp">Frequently asked questions</h2>
            <div className="service-landing__faq-list">
              {faqs.map((faq) => (
                <details key={faq.question} className="service-landing__faq-item">
                  <summary data-en={faq.questionEn} data-vi={faq.question}>{faq.questionEn}</summary>
                  <p data-en={faq.answerEn} data-vi={faq.answer}>{faq.answerEn}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.relatedServices?.length > 0 && (
        <section className="service-landing__section service-landing__related" aria-labelledby="service-related-title">
          <div className="service-landing__shell">
            <h2 id="service-related-title" data-en="Related services" data-vi="Dịch vụ liên quan">Related services</h2>
            <div className="service-landing__related-list">
              {content.relatedServices.map((related) => (
                <Link key={related.path} to={related.path} className="service-landing__related-link">
                  <Bilingual value={related.label} />
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="service-landing__cta" aria-labelledby="service-cta-title">
        <div className="service-landing__shell service-landing__cta-layout">
          <div>
            <h2 id="service-cta-title" data-en="Ready to talk about your project?" data-vi="Sẵn sàng trao đổi về dự án của bạn?">Ready to talk about your project?</h2>
            <p data-en="Share your goals and current setup — Unitrux will recommend the smallest useful next step." data-vi="Chia sẻ mục tiêu và hiện trạng của bạn — Unitrux sẽ đề xuất bước tiếp theo phù hợp và đủ nhỏ để triển khai ngay.">
              Share your goals and current setup — Unitrux will recommend the smallest useful next step.
            </p>
          </div>
          <div className="service-landing__cta-actions">
            <Link to="/contact" className="service-landing__button service-landing__button--primary">
              <span data-en="Request a proposal" data-vi="Nhận đề xuất triển khai">Request a proposal</span>
            </Link>
            <a className="service-landing__text-link" href="https://zalo.me/3299309778518905129">
              <span data-en="Talk on Zalo" data-vi="Trao đổi qua Zalo">Talk on Zalo</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceLanding;
