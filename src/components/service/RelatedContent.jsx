import { Link } from 'react-router-dom';
import { getRelatedContent } from '../../data/relatedContent';
import { T } from './ServiceSections';
import './serviceSections.css';

/* Purposeful internal linking (Playbook §13/§14). Data in
   src/data/relatedContent.js. Article links only render once their CMS slug is
   live (`published: true`) — getRelatedContent() filters them out otherwise, so
   this never ships a dead link. Section is omitted when nothing is renderable. */

const RelatedContent = ({ path }) => {
  const data = getRelatedContent(path);
  if (!data) return null;

  return (
    <section className="svc svc-sec" aria-labelledby="svc-related">
      <div className="svc-shell">
        <T as="h2" id="svc-related" className="svc-sec__title" vi={data.headingVi} en={data.headingEn} />
        <ul className="svc-related">
          {data.links.map((link) => (
            <li className="svc-related__item" key={link.to}>
              <Link className="svc-related__anchor" to={link.to}>
                <T vi={link.anchorVi} en={link.anchorEn} />
              </Link>
              {(link.blurbVi || link.blurbEn) && (
                <T as="p" className="svc-related__blurb" vi={link.blurbVi} en={link.blurbEn} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedContent;
