import { Link } from 'react-router-dom';
import { templateCount, templateGroups } from '../data/templateGroups';
import TemplateCard from './TemplateCard';

const featured = templateGroups.map((group) => ({ ...group.items[0], groupLabelEn: group.labelEn, groupLabelVi: group.labelVi }));

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
        <p data-en={`A first look at ${templateCount} live templates across salon & beauty, coffee & cafe, real estate and e-commerce — real previews, not mockups.`} data-vi={`Xem thử ${templateCount} mẫu website thật của Unitrux — salon & làm đẹp, quán cà phê, bất động sản và thương mại điện tử — bản xem trực tiếp, không phải ảnh dựng.`}>
          {`A first look at ${templateCount} live templates across salon & beauty, coffee & cafe, real estate and e-commerce — real previews, not mockups.`}
        </p>
      </header>

      <div className="template-showcase__grid">
        {featured.map((template) => <TemplateCard template={template} key={template.href} />)}
      </div>

      <div className="template-showcase__footer">
        <Link className="template-showcase__view-all" to="/templates">
          <span data-en={`View all ${templateCount} templates`} data-vi={`Xem tất cả ${templateCount} mẫu website`}>{`View all ${templateCount} templates`}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  </section>
);

export default TemplateShowcase;
