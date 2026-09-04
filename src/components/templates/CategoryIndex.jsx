import { useEffect, useState } from 'react';
import { templateGroups } from '../../data/templateGroups';
import { scrollToId } from '../../utils/scrollToId';

const CategoryIndex = () => {
  const [active, setActive] = useState(templateGroups[0].id);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;

    const sections = templateGroups
      .map((group) => document.getElementById(`group-${group.id}`))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.dataset.groupId);
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav id="template-gallery" className="tpl-index" aria-label="Template categories">
      <div className="tpl-container">
        {templateGroups.map((group, position) => (
          <a
            key={group.id}
            href={`#group-${group.id}`}
            className={`tpl-index__row${active === group.id ? ' is-active' : ''}`}
            onClick={(event) => scrollToId(event, `group-${group.id}`)}
          >
            <span className="tpl-index__number">{String(position + 1).padStart(2, '0')}</span>
            <span className="tpl-index__label" data-en={group.labelEn} data-vi={group.labelVi}>{group.labelEn}</span>
            <span className="tpl-index__line" aria-hidden="true" />
            <span className="tpl-index__count">{String(group.items.length).padStart(2, '0')}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default CategoryIndex;
