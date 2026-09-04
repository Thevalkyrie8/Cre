import { LivePreviewFrame } from '../TemplateCard';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

// size controls typography/meta scale; aspect controls the crop of the live
// preview (landscape for cinematic featured moments, tighter for stacked
// secondary cards) — both purely presentational, no data changes.
const TemplateProjectCard = ({ template, index, size = 'medium', aspect = '4 / 3', className = '', style }) => {
  const { ref, visible } = useRevealOnScroll();

  return (
    <a
      ref={ref}
      href={template.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`tpl-card tpl-card--${size}${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--tpl-frame-aspect': aspect, ...style }}
    >
      <div className="tpl-card__frame">
        <div className="tpl-card__chrome" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="tpl-card__viewport">
          <LivePreviewFrame href={template.href} title={template.titleEn} />
        </div>
      </div>
      <div className="tpl-card__meta">
        <span className="tpl-card__index" aria-hidden="true">{index}</span>
        <div className="tpl-card__info">
          <h3 data-en={template.titleEn} data-vi={template.titleVi}>{template.titleEn}</h3>
          <p data-en={template.tagEn} data-vi={template.tagVi}>{template.tagEn}</p>
        </div>
        <span className="tpl-card__cta">
          <span data-en="View live experience" data-vi="Xem trải nghiệm thật">View live experience</span>
          <span aria-hidden="true">↗</span>
        </span>
      </div>
    </a>
  );
};

export default TemplateProjectCard;
