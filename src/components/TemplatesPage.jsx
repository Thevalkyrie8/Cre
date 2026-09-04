import { Fragment } from 'react';
import { templateGroups } from '../data/templateGroups';
import TemplateHero from './templates/TemplateHero';
import CategoryIndex from './templates/CategoryIndex';
import CategorySection from './templates/CategorySection';
import ClosingCTA from './templates/ClosingCTA';
import './templates/TemplatesPage.css';

const TemplatesPage = () => (
  <main className="tpl-showroom">
    <TemplateHero />
    <CategoryIndex />

    {templateGroups.map((group, position) => (
      <Fragment key={group.id}>
        <CategorySection group={group} position={position} />
      </Fragment>
    ))}

    <ClosingCTA />
  </main>
);

export default TemplatesPage;
