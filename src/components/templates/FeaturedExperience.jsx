import { LivePreviewFrame } from '../TemplateCard';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

const FeaturedExperience = ({ template, tagEn, tagVi }) => {
  const { ref, visible } = useRevealOnScroll();

  return (
    <section className={`tpl-featured${visible ? ' is-visible' : ''}`} ref={ref} aria-label={template.titleEn}>
      <a className="tpl-featured__frame" href={template.href} target="_blank" rel="noopener noreferrer">
        <div className="tpl-featured__chrome" aria-hidden="true"><span /><span /><span /></div>
        <LivePreviewFrame href={template.href} title={template.titleEn} />
      </a>
      <div className="tpl-container tpl-featured__caption">
        <span className="tpl-eyebrow" data-en="Featured experience" data-vi="Trải nghiệm nổi bật">Featured experience</span>
        <h3 data-en={template.titleEn} data-vi={template.titleVi}>{template.titleEn}</h3>
        <p data-en={tagEn} data-vi={tagVi}>{tagEn}</p>
        <a className="tpl-hero__secondary-link" href={template.href} target="_blank" rel="noopener noreferrer">
          <span data-en="Live website" data-vi="Xem website">Live website</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
};

export default FeaturedExperience;
