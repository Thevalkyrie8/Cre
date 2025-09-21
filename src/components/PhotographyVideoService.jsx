import React from 'react';
import { Link } from 'react-router-dom';

const PhotographyVideoService = () => {
  return (
    <div className="service-detail-page">
      <div className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-badge">
              <span data-vi="Dịch vụ" data-en="Service">Service</span>
            </div>
            <h1 className="service-title" data-vi="Chụp ảnh & Video – Hình ảnh biết bán hàng cho web, mạng xã hội & sàn TMĐT" data-en="Photography & Video – Images that sell for websites, social media & e-commerce marketplaces">
              Photography & Video – Images that sell for websites, social media & e-commerce marketplaces
            </h1>
            <p className="service-subtitle" data-vi="Bạn cần hình ảnh đẹp – đúng – đủ để khách hiểu sản phẩm trong vài giây và muốn mua ngay? Dịch vụ Nhiếp ảnh & Video của Unitrux tạo ra bộ ảnh/video dễ xem – dễ tin – dễ chia sẻ, dùng tốt trên website, Facebook/TikTok/YouTube và các sàn thương mại điện tử." data-en="Do you need visuals that are beautiful – accurate – sufficient so customers understand the product in a few seconds and want to buy immediately? Unitrux's Photography & Video service creates photo/video sets that are easy to view – easy to trust – easy to share, working well on websites, Facebook/TikTok/YouTube, and e-commerce marketplaces.">
              Do you need visuals that are beautiful – accurate – sufficient so customers understand the product in a few seconds and want to buy immediately? Unitrux's Photography & Video service creates photo/video sets that are easy to view – easy to trust – easy to share, working well on websites, Facebook/TikTok/YouTube, and e-commerce marketplaces.
            </p>
          </div>
        </div>
      </div>

      {/* Why visuals matter */}
      <section className="why-choose-section">
        <div className="container">
          <h2 data-vi="Vì sao hình ảnh quyết định chuyển đổi?" data-en="Why do visuals determine conversion?">Why do visuals determine conversion?</h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">👁️</div>
              <h3 data-vi="Khách tin vào mắt" data-en="Customers trust their eyes">Customers trust their eyes</h3>
              <p data-vi="ảnh rõ ràng, video ngắn gọn giúp hiểu nhanh giá trị sản phẩm." data-en="clear photos and concise videos help them quickly grasp the product's value.">
                clear photos and concise videos help them quickly grasp the product's value.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">🛒</div>
              <h3 data-vi="Trang sản phẩm thuyết phục" data-en="Persuasive product pages">Persuasive product pages</h3>
              <p data-vi="khi ảnh, mô tả, đánh giá nói cùng đồng bộ, tỷ lệ thêm vào giỏ tăng lên rõ rệt." data-en="when photos, descriptions, and reviews 'speak the same language,' the add-to-cart rate rises significantly.">
                when photos, descriptions, and reviews "speak the same language," the add-to-cart rate rises significantly.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">📈</div>
              <h3 data-vi="Quảng cáo hiệu quả hơn" data-en="More effective ads">More effective ads</h3>
              <p data-vi="nội dung đúng, đỡ tốn tiền thử đi thử lại." data-en="the right content reduces wasted budget on repeated trial and error.">
                the right content reduces wasted budget on repeated trial and error.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Unitrux does */}
      <section className="what-we-do-section">
        <div className="container">
          <h2 data-vi="Unitrux làm gì cho bạn?" data-en="What does Unitrux do for you?">What does Unitrux do for you?</h2>
          <div className="services-list">
            <div className="service-item">
              <h3 data-vi="Chụp ảnh sản phẩm" data-en="Product photography">Product photography</h3>
              <p data-vi="ảnh rõ từng chi tiết và ảnh bối cảnh gần gũi đời thường." data-en="'clear down to every detail' and lifestyle/context shots close to everyday use.">
                "clear down to every detail" and lifestyle/context shots close to everyday use.
              </p>
            </div>
            <div className="service-item">
              <h3 data-vi="Video doanh nghiệp & sản phẩm" data-en="Corporate & product videos">Corporate & product videos</h3>
              <p data-vi="video 15–30 giây (giới thiệu, cách dùng, review), clip ngắn cho mạng xã hội." data-en="15–30 second videos (introduction, how-to, reviews), short clips for social media.">
                15–30 second videos (introduction, how-to, reviews), short clips for social media.
              </p>
            </div>
            <div className="service-item">
              <h3 data-vi="Nội dung truyền thông xã hội" data-en="Social media content">Social media content</h3>
              <p data-vi="bộ ảnh/đoạn clip sẵn mẫu chữ, dễ đăng, đồng nhất phong cách." data-en="photo/clip sets with ready text templates, easy to post, consistent in style.">
                photo/clip sets with ready text templates, easy to post, consistent in style.
              </p>
            </div>
            <div className="service-item">
              <h3 data-vi="Kết xuất 3D" data-en="3D rendering">3D rendering</h3>
              <p data-vi="mô phỏng sản phẩm 3 chiều khi khó chụp (nhiều màu, nhiều góc), thay đổi mẫu mã nhanh." data-en="simulate products in 3D when they're hard to shoot (many colors, many angles), quickly change variants.">
                simulate products in 3D when they're hard to shoot (many colors, many angles), quickly change variants.
              </p>
            </div>
          </div>
          <p className="note" data-vi="Tất cả đều được tối ưu tải nhanh (dung lượng nhẹ), đặt tên file – chú thích ảnh rõ ràng để hỗ trợ SEO khi lên website." data-en="Everything is optimized for fast loading (light file sizes), with clear file names and image captions to support SEO when published on the website.">
            Everything is optimized for fast loading (light file sizes), with clear file names and image captions to support SEO when published on the website.
          </p>
        </div>
      </section>

      {/* 6-step process */}
      <section className="process-section">
        <div className="container">
          <h2 data-vi="Quy trình 6 bước" data-en="6-step process">6-step process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="process-step-content">
                <h3 data-vi="Lắng nghe mục tiêu & sản phẩm" data-en="Listen to goals & products">Listen to goals & products</h3>
                <p data-vi="Unitrux hỏi ngắn gọn: bạn muốn tăng điều gì (lượt nhấp, đơn hàng, nhận diện)? Dùng ảnh/video ở đâu (web, mạng xã hội, sàn)? Sản phẩm có điểm nổi bật nào cần làm rõ?" data-en="Unitrux asks briefly: what do you want to increase (clicks, orders, awareness)? Where will photos/videos be used (web, social, marketplaces)? What standout points of the product need to be highlighted?">
                  Unitrux asks briefly: what do you want to increase (clicks, orders, awareness)? Where will photos/videos be used (web, social, marketplaces)? What standout points of the product need to be highlighted?
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="process-step-content">
                <h3 data-vi="Lên ý tưởng & kịch bản" data-en="Concept & scripting">Concept & scripting</h3>
                <p data-vi="Unitrux gửi moodboard (tham khảo bố cục – ánh sáng – màu), danh sách góc chụp (shot‑list) hoặc kịch bản video ngắn gọn, văn nói dễ hiểu." data-en="Unitrux sends a moodboard (references for composition – lighting – color), a shot list, or a concise, conversational video script.">
                  Unitrux sends a moodboard (references for composition – lighting – color), a shot list, or a concise, conversational video script.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="process-step-content">
                <h3 data-vi="Demo nhanh & chốt lịch" data-en="Quick demo & lock schedule">Quick demo & lock schedule</h3>
                <p data-vi="Unitrux làm demo 1–2 khung hình/khung cảnh để bạn hình dung; chốt địa điểm (studio hay tại cửa hàng), thời gian, số lượng sản phẩm, người mẫu (nếu cần)." data-en="Unitrux makes a demo of 1–2 frames/scenes for visualization; finalizes location (studio or at your store), time, number of products, and models (if needed).">
                  Unitrux makes a demo of 1–2 frames/scenes for visualization; finalizes location (studio or at your store), time, number of products, and models (if needed).
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="process-step-content">
                <h3 data-vi="Chuẩn bị kỹ & báo giá cuối" data-en="Thorough preparation & final quotation">Thorough preparation & final quotation</h3>
                <p data-vi="Unitrux chuẩn bị ánh sáng, phông nền, đạo cụ; xin phép địa điểm nếu quay ngoài trời; gửi bảng giá minh bạch theo số ảnh/video & phạm vi chỉnh sửa." data-en="Unitrux prepares lighting, backdrops, props; secures location permits if shooting outdoors; sends a transparent price sheet by photo/video count and edit scope.">
                  Unitrux prepares lighting, backdrops, props; secures location permits if shooting outdoors; sends a transparent price sheet by photo/video count and edit scope.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="process-step-content">
                <h3 data-vi="Chụp/quay tại studio hoặc on‑site" data-en="Shoot/film in studio or on-site">Shoot/film in studio or on-site</h3>
                <p data-vi="Unitrux làm việc gọn gàng, hướng dẫn tạo dáng/bối cảnh, ưu tiên góc nhìn biết bán hàng (rõ điểm mạnh, rõ kích thước, rõ công dụng)." data-en="Unitrux works neatly, guides posing/context, prioritizes 'sales-savvy' angles (clear strengths, clear dimensions, clear functions).">
                  Unitrux works neatly, guides posing/context, prioritizes "sales-savvy" angles (clear strengths, clear dimensions, clear functions).
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">6</div>
              <div className="process-step-content">
                <h3 data-vi="Hậu kỳ & bàn giao đa định dạng" data-en="Post-production & multi-format delivery">Post-production & multi-format delivery</h3>
                <p data-vi="Unitrux chỉnh màu, xóa khuyết điểm vừa đủ, lồng chữ ngắn khi cần; xuất bộ ảnh/video dùng cho web – quảng cáo – mạng xã hội – sàn (mỗi kênh một kích thước phù hợp)." data-en="Unitrux color-grades, retouches just enough, overlays short text when needed; exports photo/video sets for web – ads – social – marketplaces (each channel in an appropriate size).">
                  Unitrux color-grades, retouches just enough, overlays short text when needed; exports photo/video sets for web – ads – social – marketplaces (each channel in an appropriate size).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="results-section">
        <div className="container">
          <h2 data-vi="Kết quả bạn có thể kỳ vọng" data-en="Results you can expect">Results you can expect</h2>
          <div className="results-grid">
            <div className="result-item">
              <div className="result-icon">📸</div>
              <h3 data-vi="Ảnh/video rõ – thật – đẹp" data-en="Clear – authentic – attractive photos/videos">Clear – authentic – attractive photos/videos</h3>
              <p data-vi="khách nhìn là hiểu sản phẩm." data-en="that let customers understand the product at a glance.">
                that let customers understand the product at a glance.
              </p>
            </div>
            <div className="result-item">
              <div className="result-icon">🛍️</div>
              <h3 data-vi="Trang sản phẩm hút mắt hơn" data-en="More eye-catching product pages">More eye-catching product pages</h3>
              <p data-vi="tỷ lệ thêm vào giỏ và đặt mua tăng." data-en="higher add-to-cart and purchase rates.">
                higher add-to-cart and purchase rates.
              </p>
            </div>
            <div className="result-item">
              <div className="result-icon">💰</div>
              <h3 data-vi="Quảng cáo dễ ra đơn hơn" data-en="Ads that generate orders more easily">Ads that generate orders more easily</h3>
              <p data-vi="đỡ tốn chi phí thử nghiệm." data-en="with lower experimentation costs.">
                with lower experimentation costs.
              </p>
            </div>
            <div className="result-item">
              <div className="result-icon">📱</div>
              <h3 data-vi="Tài khoản mạng xã hội đều tay" data-en="Consistent content across social accounts">Consistent content across social accounts</h3>
              <p data-vi="nội dung, giữ phong cách thương hiệu thống nhất." data-en="maintaining a unified brand style.">
                maintaining a unified brand style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2 data-vi="Câu hỏi thường gặp (FAQ)" data-en="Frequently Asked Questions (FAQ)">Frequently Asked Questions (FAQ)</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3 data-vi="1) Không có ý tưởng, Unitrux có gợi ý giúp không?" data-en="No ideas—can Unitrux suggest concepts?">No ideas—can Unitrux suggest concepts?</h3>
              <p data-vi="Có. Bạn chỉ cần cho biết sản phẩm, mục tiêu và ngân sách; Unitrux đề xuất phong cách phù hợp." data-en="Yes. You only need to share the product, goals, and budget; Unitrux will propose a suitable style.">
                Yes. You only need to share the product, goals, and budget; Unitrux will propose a suitable style.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="2) Chụp ở đâu?" data-en="Where is the shoot?">Where is the shoot?</h3>
              <p data-vi="Tại studio của Unitrux hoặc ngay cửa hàng/nhà máy của bạn. Với quay ngoại cảnh, Unitrux hỗ trợ xin phép địa điểm." data-en="At Unitrux's studio or right at your store/factory. For outdoor filming, Unitrux helps obtain location permits.">
                At Unitrux's studio or right at your store/factory. For outdoor filming, Unitrux helps obtain location permits.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="3) Sửa mấy lần?" data-en="How many rounds of edits?">How many rounds of edits?</h3>
              <p data-vi="Thông thường 1–2 vòng chỉnh (màu, bố cục, cắt ghép). Nếu cần thêm, mình báo rõ chi phí phát sinh." data-en="Typically 1–2 rounds (color, composition, cropping). If more are needed, we'll clearly outline additional costs.">
                Typically 1–2 rounds (color, composition, cropping). If more are needed, we'll clearly outline additional costs.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="4) Bao lâu thì xong?" data-en="How long does it take?">How long does it take?</h3>
              <p data-vi="Phổ biến từ 3–7 ngày làm việc tính từ lúc chụp/quay (tùy số lượng & mức độ hậu kỳ)." data-en="Commonly 3–7 business days from the shoot/filming date (depending on volume & post-production level).">
                Commonly 3–7 business days from the shoot/filming date (depending on volume & post-production level).
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="5) Kết xuất 3D dùng khi nào?" data-en="When is 3D rendering used?">When is 3D rendering used?</h3>
              <p data-vi="Khi sản phẩm khó chụp, nhiều màu/góc hoặc chưa có sẵn mẫu thật; 3D giúp nhìn như thật và đổi màu/nhãn rất nhanh." data-en="When the product is hard to shoot, has many colors/angles, or you don't yet have a physical sample; 3D makes it look real and allows very fast color/label changes.">
                When the product is hard to shoot, has many colors/angles, or you don't yet have a physical sample; 3D makes it look real and allows very fast color/label changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 data-vi="Nhận báo giá & xem demo concept • Đặt lịch chụp/quay • Yêu cầu bộ ảnh tối ưu cho web/sàn" data-en="Get a quote & see demo concepts • Book a photo/video shoot • Request an image set optimized for web/marketplaces">Get a quote & see demo concepts • Book a photo/video shoot • Request an image set optimized for web/marketplaces</h2>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">
                <span data-vi="Nhận báo giá miễn phí" data-en="Get Free Quote">Get Free Quote</span>
              </Link>
              <Link to="/contact" className="btn-secondary">
                <span data-vi="Đặt lịch tư vấn" data-en="Book Consultation">Book Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhotographyVideoService;
