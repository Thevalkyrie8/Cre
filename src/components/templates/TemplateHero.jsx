import { useEffect, useRef } from 'react';
import { LivePreviewFrame } from '../TemplateCard';
import { templateCount, templateGroups } from '../../data/templateGroups';
import { scrollToId } from '../../utils/scrollToId';

const findItem = (groupId, predicate) => {
  const group = templateGroups.find((g) => g.id === groupId);
  return predicate ? group.items.find(predicate) : group.items[0];
};

// One representative per industry, front-to-back: e-commerce leads (Auria),
// then real estate and salon fall away behind it. Kept to 3 layers so the
// hero doesn't load 4 heavy cross-origin previews at once on first paint.
const stack = [
  { ...findItem('ecommerce'), depth: 0 },
  { ...findItem('estate', (item) => item.titleEn === 'MARIVA'), depth: 1 },
  { ...findItem('salon'), depth: 2 },
];

const TemplateHero = () => {
  const stackRef = useRef(null);

  useEffect(() => {
    const node = stackRef.current;
    if (!node) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia?.('(pointer: fine)').matches) return undefined;

    let frame = null;
    const handleMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.setProperty('--tilt-x', (y * -4).toFixed(2));
        node.style.setProperty('--tilt-y', (x * 4).toFixed(2));
        frame = null;
      });
    };
    const handleLeave = () => {
      node.style.setProperty('--tilt-x', 0);
      node.style.setProperty('--tilt-y', 0);
    };

    node.addEventListener('mousemove', handleMove);
    node.addEventListener('mouseleave', handleLeave);
    return () => {
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseleave', handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="tpl-hero">
      <div className="tpl-hero__field" aria-hidden="true" />
      <div className="tpl-container tpl-hero__layout">
        <div className="tpl-hero__copy">
          <p className="tpl-eyebrow" data-en="Unitrux — Template Library — 2026" data-vi="Unitrux — Thư viện mẫu — 2026">
            Unitrux — Template Library — 2026
          </p>
          <h1 className="tpl-hero__headline">
            <span data-en={`${templateCount} live websites.`} data-vi={`${templateCount} website thật.`}>{`${templateCount} live websites.`}</span>
            <span data-en="One starting point for your next brand." data-vi="Một điểm khởi đầu cho thương hiệu tiếp theo của bạn." className="tpl-hero__headline-accent">
              One starting point for your next brand.
            </span>
          </h1>
          <p
            className="tpl-hero__lead"
            data-en="Every project below is a real, working website — not a screenshot. Explore them, then tell us which direction fits your business so we can adapt it into something entirely yours."
            data-vi="Mỗi dự án bên dưới là một website thật đang hoạt động — không phải ảnh chụp. Khám phá rồi cho chúng tôi biết hướng nào phù hợp với doanh nghiệp bạn, chúng tôi sẽ tinh chỉnh thành phiên bản của riêng bạn."
          >
            Every project below is a real, working website — not a screenshot. Explore them, then tell us which direction fits your business so we can adapt it into something entirely yours.
          </p>
          <div className="tpl-hero__actions">
            <a className="tpl-button tpl-button--primary" href="#template-gallery" onClick={(event) => scrollToId(event, 'template-gallery')}>
              <span data-en="Explore templates" data-vi="Khám phá mẫu website">Explore templates</span>
            </a>
            <a className="tpl-hero__secondary-link" href="/web-development">
              <span data-en="Bespoke website design" data-vi="Thiết kế website riêng">Bespoke website design</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <dl className="tpl-hero__proof">
            <div>
              <dt data-en="Live experiences" data-vi="Trải nghiệm thật">Live experiences</dt>
              <dd>{templateCount}</dd>
            </div>
            <div>
              <dt data-en="Industries" data-vi="Ngành nghề">Industries</dt>
              <dd>{templateGroups.length}</dd>
            </div>
            <div>
              <dt data-en="Customization" data-vi="Tùy chỉnh">Customization</dt>
              <dd data-en="Full" data-vi="Toàn diện">Full</dd>
            </div>
          </dl>
        </div>

        <div className="tpl-hero__stack" ref={stackRef}>
          {[...stack].reverse().map((item) => (
            <a
              key={item.href}
              className="tpl-hero__stack-item"
              style={{ '--depth': item.depth }}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.titleEn}
              tabIndex={item.depth === 0 ? 0 : -1}
            >
              <div className="tpl-hero__stack-chrome" aria-hidden="true"><span /><span /><span /></div>
              <LivePreviewFrame href={item.href} title={item.titleEn} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateHero;
