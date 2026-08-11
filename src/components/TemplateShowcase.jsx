import { useEffect, useRef, useState } from 'react';

const templateGroups = [
  {
    id: 'salon',
    labelEn: 'Salon & beauty',
    labelVi: 'Salon & làm đẹp',
    items: [
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
    ],
  },
  {
    id: 'cafe',
    labelEn: 'Coffee & cafe',
    labelVi: 'Quán cà phê',
    items: [
      {
        href: 'https://template-cafe-1.unitrux.site/',
        titleEn: 'Lá & Hạt',
        titleVi: 'Lá & Hạt',
        tagEn: 'Fresh & natural',
        tagVi: 'Tươi mới & gần gũi',
      },
      {
        href: 'https://template-cafe-2.unitrux.site/',
        titleEn: 'MORENO',
        titleVi: 'MORENO',
        tagEn: 'Bold & moody',
        tagVi: 'Đậm chất & cuốn hút',
      },
      {
        href: 'https://template-cafe-3.unitrux.site/',
        titleEn: 'OCEANO',
        titleVi: 'OCEANO',
        tagEn: 'Distinctive theme',
        tagVi: 'Chủ đề độc đáo',
      },
    ],
  },
  {
    id: 'estate',
    labelEn: 'Real estate',
    labelVi: 'Bất động sản',
    items: [
      {
        href: 'https://template-estate-1.unitrux.site/',
        titleEn: 'Việt Home Premium',
        titleVi: 'Việt Home Premium',
        tagEn: 'Premium & data-rich',
        tagVi: 'Cao cấp & giàu dữ liệu',
      },
      {
        href: 'https://template-estate-2.unitrux.site/',
        titleEn: 'Haven Estates',
        titleVi: 'Haven Estates',
        tagEn: 'Editorial & trustworthy',
        tagVi: 'Biên tập & đáng tin cậy',
      },
      {
        href: 'https://template-estate-3.unitrux.site/',
        titleEn: 'MARIVA',
        titleVi: 'MARIVA',
        tagEn: 'Resort & coastal',
        tagVi: 'Nghỉ dưỡng & biển đảo',
      },
      {
        href: 'https://template-estate-4.unitrux.site/',
        titleEn: 'Emerald Estate',
        titleVi: 'Emerald Estate',
        tagEn: 'Boutique & nature',
        tagVi: 'Boutique & thiên nhiên',
      },
    ],
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

const TemplateShowcase = () => (
  <section id="templates" className="template-showcase" aria-labelledby="template-showcase-title">
    <div className="home-shell">
      <header className="template-showcase__header">
        <div>
          <p className="home-kicker" data-en="Ready-made template" data-vi="Mẫu website dựng sẵn">Ready-made template</p>
          <h2 id="template-showcase-title" data-en="Starting from a carefully selected website template, we refine every detail to create a unique version that reflects your brand’s identity." data-vi="Từ mẫu website được tuyển chọn, chúng tôi tinh chỉnh từng chi tiết để tạo nên phiên bản mang dấu ấn riêng của doanh nghiệp bạn.">
            Starting from a carefully selected website template, we refine every detail to create a unique version that reflects your brand’s identity.
          </h2>
        </div>
        <p data-en="A first look at our template library — salon & beauty, coffee & cafe, and real estate — live previews, not mockups. Ask us to adapt one to your business." data-vi="Xem thử thư viện mẫu website của Unitrux — salon & làm đẹp, quán cà phê, và bất động sản — bản xem trực tiếp, không phải ảnh dựng. Liên hệ để chúng tôi tinh chỉnh theo đúng thương hiệu của bạn.">
          A first look at our template library — salon & beauty, coffee & cafe, and real estate — live previews, not mockups. Ask us to adapt one to your business.
        </p>
      </header>

      {templateGroups.map((group) => (
        <div className="template-showcase__group" key={group.id}>
          <h3 className="template-showcase__group-title" data-en={group.labelEn} data-vi={group.labelVi}>{group.labelEn}</h3>
          <div className={`template-showcase__grid${group.items.length >= 4 ? ' template-showcase__grid--wide' : ''}`}>
            {group.items.map((template) => <TemplateCard template={template} key={template.href} />)}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TemplateShowcase;
