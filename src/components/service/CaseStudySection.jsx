import { Link } from 'react-router-dom';
import { productionPortfolio, productionBehindTheScenes } from '../../data/productionPortfolio';
import { getReadyCaseStudies } from '../../data/caseStudies';
import { T } from './ServiceSections';
import './serviceSections.css';
import './caseStudySection.css';

/* Level-6 proof (Playbook §7). Renders ONLY case studies flagged ready:true in
   src/data/caseStudies.js — so an unverified draft never reaches a page. When
   no case study is ready the whole section is omitted. */

const videoById = (id) => productionPortfolio.items.find((item) => item.id === id);
const photoById = (id) => productionBehindTheScenes.find((item) => item.id === id);

const CaseMedia = ({ media = [] }) => {
  if (!media.length) return null;
  return (
    <div className="cs-media">
      {media.map((m, i) => {
        if (m.type === 'video') {
          const v = videoById(m.id);
          if (!v) return null;
          return (
            <figure className="cs-media__item" key={i} style={{ '--cs-ratio': v.ratio }}>
              <video
                className="cs-media__video"
                poster={v.thumbnail}
                controls
                muted
                playsInline
                preload="metadata"
                aria-label={v.title}
                data-aria-label-vi={v.titleVi}
                data-aria-label-en={v.title}
              >
                <source src={v.src} type={v.mimeType || 'video/mp4'} />
              </video>
              <figcaption data-vi={v.labelVi} data-en={v.labelEn}>{v.labelEn}</figcaption>
            </figure>
          );
        }
        const p = photoById(m.id);
        if (!p) return null;
        return (
          <figure className="cs-media__item" key={i}>
            <img src={p.src} alt={p.labelEn} loading="lazy" />
            <figcaption data-vi={p.labelVi} data-en={p.labelEn}>{p.labelEn}</figcaption>
          </figure>
        );
      })}
    </div>
  );
};

const Field = ({ labelVi, labelEn, value }) => {
  if (!value?.vi && !value?.en) return null;
  return (
    <div className="cs-field">
      <T as="dt" className="cs-field__label" vi={labelVi} en={labelEn} />
      <T as="dd" className="cs-field__value" vi={value.vi} en={value.en} />
    </div>
  );
};

const CaseStudySection = ({
  money,
  titleVi = 'Case study',
  titleEn = 'Case study',
  leadVi,
  leadEn,
}) => {
  const items = getReadyCaseStudies(money);
  if (!items.length) return null;

  return (
    <section className="svc svc-sec cs" aria-labelledby="svc-case-study">
      <div className="svc-shell">
        <T as="h2" id="svc-case-study" className="svc-sec__title" vi={titleVi} en={titleEn} />
        {(leadVi || leadEn) && <T as="p" className="svc-sec__lead" vi={leadVi} en={leadEn} />}

        {items.map((cs) => (
          <article className="cs-card" key={cs.id}>
            <T as="h3" className="cs-card__title" vi={cs.project.vi} en={cs.project.en} />
            <dl className="cs-fields">
              <Field labelVi="Khách hàng" labelEn="Client" value={cs.client} />
              <Field labelVi="Ngành hàng" labelEn="Industry" value={cs.industry} />
              <Field labelVi="Mục tiêu" labelEn="Objective" value={cs.objective} />
              <Field labelVi="Vấn đề" labelEn="Problem" value={cs.problem} />
              <Field labelVi="Phạm vi" labelEn="Scope" value={cs.scope} />
            </dl>

            {cs.process?.length > 0 && (
              <>
                <T as="h4" className="cs-subhead" vi="Cách Unitrux triển khai" en="How Unitrux approached it" />
                <ol className="cs-process">
                  {cs.process.map((step, i) => (
                    <T as="li" key={i} vi={step.vi} en={step.en} />
                  ))}
                </ol>
              </>
            )}

            {cs.deliverables?.length > 0 && (
              <>
                <T as="h4" className="cs-subhead" vi="Bàn giao" en="Deliverables" />
                <ul className="cs-deliverables">
                  {cs.deliverables.map((d, i) => (
                    <T as="li" key={i} vi={d.vi} en={d.en} />
                  ))}
                </ul>
              </>
            )}

            {(cs.result?.vi || cs.result?.en) && (
              <>
                <T as="h4" className="cs-subhead" vi="Kết quả" en="Result" />
                <T as="p" className="cs-result" vi={cs.result.vi} en={cs.result.en} />
              </>
            )}

            <CaseMedia media={cs.media} />

            <p className="cs-card__cta">
              <Link className="svc-expert__link" to={cs.money || '/photography-video'}>
                <T vi="Xem dịch vụ liên quan" en="See the related service" />
              </Link>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CaseStudySection;
