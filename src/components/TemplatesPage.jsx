import { Fragment } from 'react';
import { templateGroups } from '../data/templateGroups';
import TemplateHero from './templates/TemplateHero';
import CategoryIndex from './templates/CategoryIndex';
import CategorySection from './templates/CategorySection';
import FeaturedExperience from './templates/FeaturedExperience';
import ClosingCTA from './templates/ClosingCTA';
import './templates/TemplatesPage.css';

const cafeGroup = templateGroups.find((group) => group.id === 'cafe');
const featuredBreak = cafeGroup.items.find((item) => item.titleEn === 'OCEANO');

const TemplatesPage = () => (
  <main className="tpl-showroom">
    <TemplateHero />
    <CategoryIndex />

    {templateGroups.map((group, position) => (
      <Fragment key={group.id}>
        <CategorySection group={group} position={position} />
        {group.id === 'cafe' && (
          <FeaturedExperience template={featuredBreak} tagEn={featuredBreak.tagEn} tagVi={featuredBreak.tagVi} />
        )}
      </Fragment>
    ))}

    <ClosingCTA />
  </main>
);

export default TemplatesPage;
