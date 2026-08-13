import { Link } from 'react-router-dom';

const ClosingCTA = () => (
  <section className="tpl-closing">
    <div className="tpl-closing__glow" aria-hidden="true" />
    <div className="tpl-container tpl-closing__layout">
      <div className="tpl-closing__copy">
        <h2 className="tpl-closing__headline">
          <span data-en="Don't see" data-vi="Chưa thấy">Don't see</span>
          <span data-en="your industry?" data-vi="đúng ngành của bạn?">your industry?</span>
        </h2>
        <p className="tpl-closing__lead" data-en="That's the point." data-vi="Đó chính là vấn đề.">That&rsquo;s the point.</p>
        <p
          className="tpl-closing__body"
          data-en="Templates are only the starting point. We adapt the structure, identity and experience around your business."
          data-vi="Mẫu chỉ là điểm khởi đầu. Chúng tôi tinh chỉnh cấu trúc, bản sắc và trải nghiệm theo đúng doanh nghiệp của bạn."
        >
          Templates are only the starting point. We adapt the structure, identity and experience around your business.
        </p>
        <div className="tpl-hero__actions">
          <Link className="tpl-button tpl-button--primary" to="/contact">
            <span data-en="Build something unique" data-vi="Xây dựng điều riêng biệt">Build something unique</span>
            <span aria-hidden="true">→</span>
          </Link>
          <a className="tpl-hero__secondary-link" href="https://zalo.me/3299309778518905129">
            <span data-en="Talk to Unitrux" data-vi="Trao đổi cùng Unitrux">Talk to Unitrux</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ClosingCTA;
