import React, { useEffect } from 'react';

const EcommerceService = () => {
  useEffect(() => {
    // Initialize animations
    initializeScrollEffects();
  }, []);

  const initializeScrollEffects = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach(el => observer.observe(el));
  };

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="service-hero fade-in-section">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-badge">
              <span data-vi="Dịch vụ" data-en="Service" data-default="en">Dịch vụ</span>
            </div>
            <h1 data-vi="Giải pháp Thương mại Điện tử – Tăng đơn hàng trên Facebook, Tiktok, Amazon, Etsy, Shopee" data-en="E-commerce Solutions – Increase orders on Facebook, Tiktok, Amazon, Etsy, Shopee" data-default="en">
              Giải pháp Thương mại Điện tử – Tăng đơn hàng trên Facebook, Tiktok, Amazon, Etsy, Shopee
            </h1>
            <p data-vi="Bạn bán hàng online nhưng đơn chưa ổn định, khách bỏ giỏ giữa chừng, hình ảnh chưa đủ thuyết phục? Giải pháp thương mại điện tử của Unitrux là gói dịch vụ trọn vẹn cho người bán trên FB, Tiktok, Amazon, Etsy, Shopee và website riêng: mở gian hàng, tối ưu trang sản phẩm, làm ảnh/video biết bán, và sắp xếp quy trình mua hàng thật gọn." data-en="Do you sell online but orders are still unstable, customers abandon carts midway, and visuals aren't persuasive enough? Unitrux's e-commerce solution is an all-in-one service package for sellers on Facebook, Tiktok, Amazon, Etsy, Shopee, and your own website: set up stores, optimize product pages, create sales-savvy photos/videos, and streamline the purchase flow." data-default="en">
              Bạn bán hàng online nhưng đơn chưa ổn định, khách bỏ giỏ giữa chừng, hình ảnh chưa đủ thuyết phục? Giải pháp thương mại điện tử của Unitrux là gói dịch vụ trọn vẹn cho người bán trên FB, Tiktok, Amazon, Etsy, Shopee và website riêng: mở gian hàng, tối ưu trang sản phẩm, làm ảnh/video biết bán, và sắp xếp quy trình mua hàng thật gọn.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section fade-in-section">
        <div className="container">
          <h2 data-vi="Vì sao nên chọn Unitrux?" data-en="Why choose Unitrux?" data-default="en">
            Vì sao nên chọn Unitrux?
          </h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">🎨</div>
              <h3 data-vi="Một phong cách – nhiều kênh" data-en="One style – many channels" data-default="en">
                Một phong cách – nhiều kênh
              </h3>
              <p data-vi="từ sàn đến website, khách nhìn đâu cũng nhận ra thương hiệu của bạn." data-en="from marketplaces to your website, customers recognize your brand everywhere." data-default="en">
                từ sàn đến website, khách nhìn đâu cũng nhận ra thương hiệu của bạn.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">🔍</div>
              <h3 data-vi="Dễ được tìm thấy" data-en="Easy to be found" data-default="en">
                Dễ được tìm thấy
              </h3>
              <p data-vi="đặt tiêu đề, mô tả, danh mục rõ ràng để sản phẩm lên kết quả tìm kiếm cao hơn (tối ưu tìm kiếm/SEO)." data-en="clear titles, descriptions, and categories so products rank higher in search results (search optimization/SEO)." data-default="en">
                đặt tiêu đề, mô tả, danh mục rõ ràng để sản phẩm lên kết quả tìm kiếm cao hơn (tối ưu tìm kiếm/SEO).
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">📸</div>
              <h3 data-vi="Trang sản phẩm thuyết phục" data-en="Persuasive product pages" data-default="en">
                Trang sản phẩm thuyết phục
              </h3>
              <p data-vi="ảnh rõ, video ngắn dễ hiểu, thông tin vừa đủ – đúng điều khách quan tâm." data-en="clear photos, short easy-to-understand videos, just-enough information—exactly what customers care about." data-default="en">
                ảnh rõ, video ngắn dễ hiểu, thông tin vừa đủ – đúng điều khách quan tâm.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">🛒</div>
              <h3 data-vi="Giỏ hàng/Thanh toán gọn" data-en="Streamlined Cart/Checkout" data-default="en">
                Giỏ hàng/Thanh toán gọn
              </h3>
              <p data-vi="ít bước hơn, đỡ mất kiên nhẫn khi sắp mua." data-en="fewer steps, less impatience right before purchase." data-default="en">
                ít bước hơn, đỡ mất kiên nhẫn khi sắp mua.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">📊</div>
              <h3 data-vi="Số liệu rõ ràng" data-en="Clear numbers" data-default="en">
                Số liệu rõ ràng
              </h3>
              <p data-vi="có bảng theo dõi lượt xem – thêm giỏ – thanh toán – đơn hàng, giúp bạn biết chỗ nào cần cải thiện." data-en="a dashboard tracking views – add-to-cart – checkout – orders, helping you see where to improve." data-default="en">
                có bảng theo dõi lượt xem – thêm giỏ – thanh toán – đơn hàng, giúp bạn biết chỗ nào cần cải thiện.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section fade-in-section">
        <div className="container">
          <h2 data-vi="Unitrux làm gì cho bạn?" data-en="What does Unitrux do for you?" data-default="en">
            Unitrux làm gì cho bạn?
          </h2>
          <div className="services-list">
            <div className="service-item">
              <h3 data-vi="Thiết lập cửa hàng & Xây dựng thương hiệu" data-en="Store Setup & Brand Building" data-default="en">
                Thiết lập cửa hàng & Xây dựng thương hiệu
              </h3>
              <ul>
                <li data-vi="Chọn nền tảng hợp lý: Amazon/Etsy/Shopee hay website riêng (Shopify/WooCommerce) – Unitrux tư vấn theo sản phẩm và cách bạn vận hành." data-en="Choose the right platform: Amazon/Etsy/Shopee or your own website (Shopify/WooCommerce) — Unitrux advises based on your products and how you operate." data-default="en">
                  Chọn nền tảng hợp lý: Amazon/Etsy/Shopee hay website riêng (Shopify/WooCommerce) – Unitrux tư vấn theo sản phẩm và cách bạn vận hành.
                </li>
                <li data-vi="Sắp xếp danh mục rõ ràng: khách tìm đúng sản phẩm chỉ sau 2–3 lần bấm." data-en="Arrange clear categories: customers find the right product after just 2–3 clicks." data-default="en">
                  Sắp xếp danh mục rõ ràng: khách tìm đúng sản phẩm chỉ sau 2–3 lần bấm.
                </li>
                <li data-vi="Bộ nhận diện gọn gàng: ảnh đại diện, banner, tông màu, cách trình bày giống nhau giữa sàn và web." data-en="Tidy brand identity: avatars, banners, color tones, and presentation consistent between marketplaces and the website." data-default="en">
                  Bộ nhận diện gọn gàng: ảnh đại diện, banner, tông màu, cách trình bày giống nhau giữa sàn và web.
                </li>
                <li data-vi="Chính sách tạo niềm tin: giao hàng, đổi trả, bảo hành rõ ràng; tận dụng huy hiệu uy tín nếu nền tảng hỗ trợ." data-en="Trust-building policies: clear shipping, returns, and warranty; leverage trust badges if the platform supports them." data-default="en">
                  Chính sách tạo niềm tin: giao hàng, đổi trả, bảo hành rõ ràng; tận dụng huy hiệu uy tín nếu nền tảng hỗ trợ.
                </li>
                <li data-vi="Xin đánh giá sau mua: có kịch bản nhắc khách để lại nhận xét, trả lời bình luận nhanh và lịch sự." data-en="Request post-purchase reviews: have scenarios to remind customers to leave feedback; respond quickly and politely to comments." data-default="en">
                  Xin đánh giá sau mua: có kịch bản nhắc khách để lại nhận xét, trả lời bình luận nhanh và lịch sự.
                </li>
              </ul>
            </div>

            <div className="service-item">
              <h3 data-vi="Tối ưu tìm kiếm & Danh sách sản phẩm" data-en="Search Optimization & Product Listings" data-default="en">
                Tối ưu tìm kiếm & Danh sách sản phẩm
              </h3>
              <ul>
                <li data-vi="Từ khóa dễ hiểu: dùng cụm từ mà khách hay gõ; thêm câu hỏi thường gặp." data-en="Easy-to-understand keywords: use phrases customers commonly type; add frequently asked questions." data-default="en">
                  Từ khóa dễ hiểu: dùng cụm từ mà khách hay gõ; thêm câu hỏi thường gặp.
                </li>
                <li data-vi="Tiêu đề – mô tả – thuộc tính: nêu lợi ích trước, thông số sau; trình bày dạng gạch đầu dòng dễ đọc." data-en="Titles – descriptions – attributes: lead with benefits, specs after; use easy-to-read bullet points." data-default="en">
                  Tiêu đề – mô tả – thuộc tính: nêu lợi ích trước, thông số sau; trình bày dạng gạch đầu dòng dễ đọc.
                </li>
                <li data-vi="Gắn nhãn/nhóm đúng chuẩn sàn: để sản phẩm xuất hiện đúng nơi khi khách lọc." data-en="Labels/grouping to marketplace standards: so products appear in the right places when customers filter." data-default="en">
                  Gắn nhãn/nhóm đúng chuẩn sàn: để sản phẩm xuất hiện đúng nơi khi khách lọc.
                </li>
                <li data-vi="Trang sản phẩm & trang danh mục: thêm phần Hỏi–Đáp, chính sách, gợi ý mua kèm hoặc mua theo bộ." data-en="Product and category pages: add Q&A sections, policies, and suggestions for add-ons or bundles." data-default="en">
                  Trang sản phẩm & trang danh mục: thêm phần Hỏi–Đáp, chính sách, gợi ý mua kèm hoặc mua theo bộ.
                </li>
                <li data-vi="Nhắc giỏ bỏ quên & nhắc lại người đã xem: email/SMS hoặc quảng cáo nhắc nhẹ để khách quay lại mua." data-en="Abandoned-cart & viewer reminders: email/SMS or gentle remarketing nudges to bring customers back to purchase." data-default="en">
                  Nhắc giỏ bỏ quên & nhắc lại người đã xem: email/SMS hoặc quảng cáo nhắc nhẹ để khách quay lại mua.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section fade-in-section">
        <div className="container">
          <h2 data-vi="Quy trình triển khai 6 bước" data-en="6-step implementation process" data-default="en">
            Quy trình triển khai 6 bước
          </h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3 data-vi="Nghe mục tiêu & kiểm tra nhanh cửa hàng" data-en="Hear goals & quick store check" data-default="en">
                Nghe mục tiêu & kiểm tra nhanh cửa hàng
              </h3>
              <p data-vi="Unitrux lắng nghe mục tiêu (tăng đơn, tăng giá trị đơn, đẩy dòng sản phẩm mới), xem qua danh mục – trang sản phẩm – tốc độ tải – giỏ hàng/checkout – số liệu theo dõi." data-en="Unitrux listens to your goals (increase orders, grow average order value, push a new product line), reviews categories – product pages – load speed – cart/checkout – tracking data." data-default="en">
                Unitrux lắng nghe mục tiêu (tăng đơn, tăng giá trị đơn, đẩy dòng sản phẩm mới), xem qua danh mục – trang sản phẩm – tốc độ tải – giỏ hàng/checkout – số liệu theo dõi.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3 data-vi="Tìm hiểu người mua & đối thủ" data-en="Understand buyers & competitors" data-default="en">
                Tìm hiểu người mua & đối thủ
              </h3>
              <p data-vi="Chúng tôi phân tích từ khóa, thói quen mua sắm, lý do bỏ giỏ, và so sánh với gian hàng đang bán tốt." data-en="We analyze keywords, shopping habits, reasons for cart abandonment, and compare with top-performing stores." data-default="en">
                Chúng tôi phân tích từ khóa, thói quen mua sắm, lý do bỏ giỏ, và so sánh với gian hàng đang bán tốt.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3 data-vi="Lên phương án & demo cửa hàng" data-en="Plan & store demo" data-default="en">
                Lên phương án & demo cửa hàng
              </h3>
              <p data-vi="Unitrux trình bày cách sắp xếp danh mục, mẫu trang sản phẩm (ảnh/video, gạch đầu dòng, Hỏi–Đáp), nút Mua ngay/Thêm giỏ dễ thấy, và bản giỏ hàng/checkout gọn." data-en="Unitrux presents category arrangement, product page templates (photos/videos, bullet points, Q&A), clear Buy now/Add to cart buttons, and a streamlined cart/checkout version." data-default="en">
                Unitrux trình bày cách sắp xếp danh mục, mẫu trang sản phẩm (ảnh/video, gạch đầu dòng, Hỏi–Đáp), nút "Mua ngay"/"Thêm giỏ" dễ thấy, và bản giỏ hàng/checkout gọn.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3 data-vi="Báo giá & kết nối hệ thống" data-en="Quotation & system connections" data-default="en">
                Báo giá & kết nối hệ thống
              </h3>
              <p data-vi="Chốt nền tảng, kết nối thanh toán – giao hàng – quản lý kho – quản lý khách, quy định bảo mật và hỗ trợ sau bán." data-en="Finalize the platform, connect payments – shipping – inventory – customer management, define security policies and after-sales support." data-default="en">
                Chốt nền tảng, kết nối thanh toán – giao hàng – quản lý kho – quản lý khách, quy định bảo mật và hỗ trợ sau bán.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3 data-vi="Thiết lập & chạy thử" data-en="Setup & trial run" data-default="en">
                Thiết lập & chạy thử
              </h3>
              <p data-vi="Dựng gian hàng/website theo mẫu đã chốt, nhập sản phẩm, đặt quy tắc theo dõi số liệu, kiểm tra trên máy tính và điện thoại." data-en="Build the store/website according to approved templates, import products, set tracking rules, and test on both desktop and mobile." data-default="en">
                Dựng gian hàng/website theo mẫu đã chốt, nhập sản phẩm, đặt quy tắc theo dõi số liệu, kiểm tra trên máy tính và điện thoại.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">6</div>
              <h3 data-vi="Vận hành & tối ưu doanh thu" data-en="Operate & optimize revenue" data-default="en">
                Vận hành & tối ưu doanh thu
              </h3>
              <p data-vi="Chạy thực tế, thử hai phiên bản tiêu đề/ảnh/nút bấm để chọn cái hiệu quả hơn; nhắc giỏ bỏ quên; xem báo cáo mỗi 2–4 tuần và tăng tốc cho nhóm sản phẩm bán tốt." data-en="Run live, A/B test titles/images/buttons to choose the more effective version; send abandoned-cart reminders; review reports every 2–4 weeks and double down on strong-selling product groups." data-default="en">
                Chạy thực tế, thử hai phiên bản tiêu đề/ảnh/nút bấm để chọn cái hiệu quả hơn; nhắc giỏ bỏ quên; xem báo cáo mỗi 2–4 tuần và tăng tốc cho nhóm sản phẩm bán tốt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section fade-in-section">
        <div className="container">
          <h2 data-vi="Kết quả Unitrux mang đến cho bạn" data-en="Results Unitrux brings you" data-default="en">
            Kết quả Unitrux mang đến cho bạn
          </h2>
          <div className="results-grid">
            <div className="result-item">
              <div className="result-icon">🛒</div>
              <h3 data-vi="Giỏ hàng/Thanh toán mượt, ít rơi đơn" data-en="Smooth Cart/Checkout with fewer dropped orders" data-default="en">
                Giỏ hàng/Thanh toán mượt, ít rơi đơn
              </h3>
            </div>
            <div className="result-item">
              <div className="result-icon">📸</div>
              <h3 data-vi="Trang sản phẩm thuyết phục: ảnh/video rõ, mô tả đúng ý, khách hiểu nhanh" data-en="Persuasive product pages: clear photos/videos, spot-on descriptions, customers understand quickly" data-default="en">
                Trang sản phẩm thuyết phục: ảnh/video rõ, mô tả đúng ý, khách hiểu nhanh
              </h3>
            </div>
            <div className="result-item">
              <div className="result-icon">📈</div>
              <h3 data-vi="Tỷ lệ mua và giá trị đơn tăng, khách quay lại nhiều hơn" data-en="Higher purchase rates and order values, more returning customers" data-default="en">
                Tỷ lệ mua và giá trị đơn tăng, khách quay lại nhiều hơn
              </h3>
            </div>
            <div className="result-item">
              <div className="result-icon">⚙️</div>
              <h3 data-vi="Vận hành gọn, số liệu doanh thu nhìn là hiểu" data-en="Streamlined operations, revenue metrics that are understandable at a glance" data-default="en">
                Vận hành gọn, số liệu doanh thu nhìn là hiểu
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section fade-in-section">
        <div className="container">
          <h2 data-vi="FAQ nhanh" data-en="Quick FAQ" data-default="en">
            FAQ nhanh
          </h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3 data-vi="Nên chọn Shopee, Shopify hay WooCommerce?" data-en="Should I choose Shopee, Shopify, or WooCommerce?" data-default="en">
                Nên chọn Shopee, Shopify hay WooCommerce?
              </h3>
              <p data-vi="Nếu muốn tận dụng lưu lượng khách có sẵn trên sàn, dùng Shopee/Etsy/Amazon. Nếu muốn xây thương hiệu lâu dài và giữ dữ liệu khách, nên có website riêng (Shopify/WooCommerce). Unitrux tư vấn theo sản phẩm và cách bạn vận hành." data-en="If you want to leverage existing marketplace traffic, use Shopee/Etsy/Amazon. If you want long-term brand building and to keep customer data, have your own website (Shopify/WooCommerce). Unitrux advises based on your products and how you operate." data-default="en">
                Nếu muốn tận dụng lưu lượng khách có sẵn trên sàn, dùng Shopee/Etsy/Amazon. Nếu muốn xây thương hiệu lâu dài và giữ dữ liệu khách, nên có website riêng (Shopify/WooCommerce). Unitrux tư vấn theo sản phẩm và cách bạn vận hành.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="Bao lâu thì chạy mượt?" data-en="How long until it runs smoothly?" data-default="en">
                Bao lâu thì chạy mượt?
              </h3>
              <p data-vi="Phổ biến 3–8 tuần tùy số lượng sản phẩm và mức độ kết nối. Sau khi có dữ liệu thật, trang sẽ tiếp tục được cải thiện đều." data-en="Typically 3–8 weeks depending on product volume and integration level. After real data comes in, the pages will continue to improve steadily." data-default="en">
                Phổ biến 3–8 tuần tùy số lượng sản phẩm và mức độ kết nối. Sau khi có dữ liệu thật, trang sẽ tiếp tục được cải thiện đều.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="Unitrux có lo phần ảnh/video và nội dung không?" data-en="Does Unitrux handle photos/videos and content?" data-default="en">
                Unitrux có lo phần ảnh/video và nội dung không?
              </h3>
              <p data-vi="Có. Từ ảnh sản phẩm, video 15–30 giây đến mô tả dễ hiểu, kịch bản xin đánh giá sau mua – Unitrux chuẩn bị trọn gói." data-en="Yes. From product photos and 15–30 second videos to easy-to-understand descriptions and post-purchase review prompts — Unitrux prepares the full package." data-default="en">
                Có. Từ ảnh sản phẩm, video 15–30 giây đến mô tả dễ hiểu, kịch bản xin đánh giá sau mua – Unitrux chuẩn bị trọn gói.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section fade-in-section">
        <div className="container">
          <div className="cta-content">
            <h2 data-vi="Nhận demo cửa hàng tối ưu chuyển đổi" data-en="Get a demo of a conversion-optimized store" data-default="en">
              Nhận demo cửa hàng tối ưu chuyển đổi
            </h2>
            <p data-vi="Xin báo giá & lộ trình 30–60–90 ngày • Đặt lịch tư vấn miễn phí 30'" data-en="Request a quote & a 30–60–90 day roadmap • Book a free 30-minute consultation" data-default="en">
              Xin báo giá & lộ trình 30–60–90 ngày • Đặt lịch tư vấn miễn phí 30'
            </p>
            <div className="cta-buttons">
              <a href="#contact" className="btn btn-primary">
                <span data-vi="Liên hệ ngay" data-en="Contact Now" data-default="en">Liên hệ ngay</span>
              </a>
              <a href="/packages" className="btn btn-secondary">
                <span data-vi="Xem gói dịch vụ" data-en="View Packages" data-default="en">Xem gói dịch vụ</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcommerceService;
