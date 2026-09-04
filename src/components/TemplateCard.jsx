import { useEffect, useRef, useState } from 'react';

const FRAME_WIDTH = 1440;

export const LivePreviewFrame = ({ href, title }) => {
  const wrapperRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [scale, setScale] = useState(0.25);
  const [frameHeight, setFrameHeight] = useState(FRAME_WIDTH * 0.75);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '120px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || !('ResizeObserver' in window)) return undefined;

    // Render the iframe at the container's own aspect ratio (fixed width,
    // height derived from it) so a plain width-based scale lands exactly on
    // the container's height too — no leftover gap, no cropping, and no
    // zoomed-in look from over-scaling to force-cover a taller container.
    const updateScale = () => {
      const { offsetWidth: width, offsetHeight: height } = node;
      if (width > 0 && height > 0) {
        setFrameHeight(FRAME_WIDTH * (height / width));
        setScale(width / FRAME_WIDTH);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="template-card__frame" ref={wrapperRef}>
      {shouldLoad ? (
        <iframe
          src={href}
          title={title}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          scrolling="no"
          style={{ width: FRAME_WIDTH, height: frameHeight, transform: `scale(${scale})` }}
        />
      ) : (
        <div className="template-card__placeholder" aria-hidden="true" />
      )}
    </div>
  );
};

const TemplateCard = ({ template }) => (
  <a
    className="template-card"
    href={template.href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <LivePreviewFrame href={template.href} title={template.titleEn} />
    <div className="template-card__caption">
      <div>
        <h3 data-en={template.titleEn} data-vi={template.titleVi}>{template.titleEn}</h3>
        <p data-en={template.tagEn} data-vi={template.tagVi}>{template.tagEn}</p>
      </div>
      <span className="template-card__cta">
        <span data-en="View demo" data-vi="Xem demo">View demo</span>
        <span aria-hidden="true">↗</span>
      </span>
    </div>
  </a>
);

export default TemplateCard;
