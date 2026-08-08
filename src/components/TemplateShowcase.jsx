import { useEffect, useRef, useState } from 'react';

const templates = [
  {
    href: 'https://template-salon-1.unitrux.com/',
    titleEn: 'MORIÉ Hair Atelier',
    titleVi: 'MORIÉ Hair Atelier',
    tagEn: 'Bold & editorial',
    tagVi: 'Cá tính & biên tập',
  },
  {
    href: 'https://template-salon-2.unitrux.com/',
    titleEn: 'Lụa Studio',
    titleVi: 'Lụa Studio',
    tagEn: 'Warm & personal',
    tagVi: 'Ấm áp & gần gũi',
  },
  {
    href: 'https://template-salon-3.unitrux.com/',
    titleEn: 'Lumière',
    titleVi: 'Lumière',
    tagEn: 'Soft & romantic',
    tagVi: 'Nhẹ nhàng & lãng mạn',
  },
];

const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 1080;

const LivePreviewFrame = ({ href, title }) => {
  const wrapperRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [scale, setScale] = useState(0.25);

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
    }, { rootMargin: '240px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || !('ResizeObserver' in window)) return undefined;

    const updateScale = () => {
      const width = node.offsetWidth;
      if (width > 0) setScale(width / FRAME_WIDTH);
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
          style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT, transform: `scale(${scale})` }}
        />
      ) : (
        <div className="template-card__placeholder" aria-hidden="true" />
      )}
    </div>
  );
};

const TemplateShowcase = () => (
  <section id="templates" className="template-showcase" aria-labelledby="template-showcase-title">
    <div className="home-shell">
      <header className="template-showcase__header">
        <div>
          <p className="home-kicker" data-en="Ready-made template" data-vi="Mẫu website dựng sẵn">Ready-made template</p>
          <h2 id="template-showcase-title" data-en="Start from a template, tailor it to your brand." data-vi="Bắt đầu từ mẫu có sẵn, tinh chỉnh theo thương hiệu của bạn.">
            Start from a template, tailor it to your brand.
          </h2>
        </div>
        <p data-en="A first look at our salon & beauty template line — live previews, not mockups. Ask us to adapt one to your business." data-vi="Xem thử dòng mẫu website ngành salon & làm đẹp của Unitrux — bản xem trực tiếp, không phải ảnh dựng. Liên hệ để chúng tôi tinh chỉnh theo đúng thương hiệu của bạn.">
          A first look at our salon & beauty template line — live previews, not mockups. Ask us to adapt one to your business.
        </p>
      </header>

      <div className="template-showcase__grid">
        {templates.map((template) => (
          <a
            key={template.href}
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
        ))}
      </div>
    </div>
  </section>
);

export default TemplateShowcase;
