import { Link } from 'react-router-dom';
import { mediaOverview, mediaPricingCopy } from '../../data/mediaPricing';
import { T } from './ServiceSections';
import './serviceSections.css';

/* Compact pricing teaser for the two production money pages — real starting
   prices from src/data/mediaPricing.js, funnelling to /media-pricing. */

const PricingPreview = ({
  titleVi = 'Tham khảo bảng giá quay video và chụp ảnh',
  titleEn = 'Video and photography pricing at a glance',
  leadVi = 'Đây là mức giá khởi điểm để dự trù ngân sách. Giá chính thức phụ thuộc concept, số lượng sản phẩm, địa điểm, thời lượng quay/chụp và hậu kỳ.',
  leadEn = 'These are starting prices for budget planning. The official price depends on concept, product quantity, location, shoot duration and post-production.',
  pick = ['Chụp ảnh sản phẩm', 'Video Reels / TikTok', 'Combo Photo + Video', 'Chụp không gian & thương hiệu'],
}) => {
  const items = pick
    .map((label) => mediaOverview.find((o) => o.titleVi === label))
    .filter(Boolean);
  if (!items.length) return null;

  return (
    <section className="svc svc-sec svc-pricing" aria-labelledby="svc-pricing-preview">
      <div className="svc-shell">
        <T as="h2" id="svc-pricing-preview" className="svc-sec__title" vi={titleVi} en={titleEn} />
        <T as="p" className="svc-sec__lead" vi={leadVi} en={leadEn} />

        <div className="svc-pricing__grid">
          {items.map((item) => (
            <div className="svc-pricing__card" key={item.titleVi}>
              <T as="p" className="svc-pricing__label" vi={item.titleVi} en={item.titleEn} />
              <T
                as="p"
                className="svc-pricing__price"
                vi={mediaPricingCopy.priceLabelVi(item.price, item.unit)}
                en={mediaPricingCopy.priceLabelEn(item.price, item.unitEn)}
              />
            </div>
          ))}
        </div>

        <p className="svc-pricing__note">
          <T
            vi="Giá chưa gồm VAT, studio, talent/model, makeup, đạo cụ đặc thù và chi phí thuê ngoài."
            en="Prices exclude VAT, studio, talent/models, makeup, specialty props and outside rentals."
          />
        </p>

        <Link className="svc-action" to="/media-pricing">
          <T vi="Xem bảng giá quay video và chụp ảnh" en="See the full video and photography pricing" />
        </Link>
      </div>
    </section>
  );
};

export default PricingPreview;
