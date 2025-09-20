import React, { useEffect } from 'react';

const WebDevelopmentService = () => {
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
              <span data-vi="Dịch vụ" data-en="Service" data-default="en">Service</span>
            </div>
            <h1 data-vi="Phát triển Web, Ứng dụng Web & Hệ thống Tùy chỉnh cho Doanh nghiệp" data-en="Web Development, Web Applications & Custom Systems for Businesses" data-default="en">
              Web Development, Web Applications & Custom Systems for Businesses
            </h1>
            <p data-vi="Bạn đang cần một nền tảng bền – nhanh – dễ mở rộng để bán hàng, chăm khách và quản trị nội bộ? Dịch vụ Phát triển web và app của Unitrux tập trung vào kết quả thực tế: giao diện mượt trên mọi thiết bị, tối ưu tìm kiếm ngay từ đầu, bảo mật rõ ràng, đo lường minh bạch và kết nối linh hoạt với các công cụ bạn đang dùng." data-en="Are you looking for a durable – fast – easily scalable platform to sell, serve customers, and manage internal operations? Unitrux's web and app development service focuses on real results: smooth interfaces on every device, search optimization from the start, clear security, transparent measurement, and flexible connections with the tools you already use." data-default="en">
              Are you looking for a durable – fast – easily scalable platform to sell, serve customers, and manage internal operations? Unitrux's web and app development service focuses on real results: smooth interfaces on every device, search optimization from the start, clear security, transparent measurement, and flexible connections with the tools you already use.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section fade-in-section">
        <div className="container">
            <h2 data-vi="Vì sao nên làm web theo nhu cầu doanh nghiệp?" data-en="Why build a website tailored to your business needs?" data-default="en">
              Why build a website tailored to your business needs?
            </h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">🎯</div>
              <h3 data-vi="Mỗi ngành một quy trình riêng" data-en="Every industry has its own processes" data-default="en">
                Mỗi ngành một quy trình riêng
              </h3>
              <p data-vi="đặt lịch, báo giá, tư vấn, thanh toán… Website cần ăn khớp với cách bạn vận hành." data-en="booking, quoting, consulting, payments… The website needs to fit how you operate." data-default="en">
                đặt lịch, báo giá, tư vấn, thanh toán… Website cần ăn khớp với cách bạn vận hành.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">⏰</div>
              <h3 data-vi="Khách ngày càng thiếu kiên nhẫn" data-en="Customers are increasingly impatient" data-default="en">
                Khách ngày càng thiếu kiên nhẫn
              </h3>
              <p data-vi="trang chậm, form dài, thông tin rối ⇒ cơ hội trôi qua." data-en="slow pages, long forms, messy information ⇒ opportunities slip away." data-default="en">
                trang chậm, form dài, thông tin rối ⇒ cơ hội trôi qua.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">📊</div>
              <h3 data-vi="Quyết định dựa trên dữ liệu" data-en="Data-driven decisions" data-default="en">
                Quyết định dựa trên dữ liệu
              </h3>
              <p data-vi="bạn cần nhìn được lượt truy cập, số người để lại thông tin, tỷ lệ chốt… thay vì đoán cảm giác." data-en="you need to see visits, the number of people who leave information, closing rate… instead of gut-feel guesses." data-default="en">
                bạn cần nhìn được lượt truy cập, số người để lại thông tin, tỷ lệ chốt… thay vì đoán cảm giác.
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
              <h3 data-vi="1) Website bán hàng & website dịch vụ" data-en="1) Sales websites & service websites" data-default="en">
                1) Website bán hàng & website dịch vụ
              </h3>
              <ul>
                <li data-vi="Cửa hàng online/website dịch vụ có bố cục danh mục rõ ràng, dễ tìm đúng thứ cần." data-en="Online store/service website with a clear category layout, easy to find exactly what's needed." data-default="en">
                  Cửa hàng online/website dịch vụ có bố cục danh mục rõ ràng, dễ tìm đúng thứ cần.
                </li>
                <li data-vi="Thanh toán – giao hàng cài đặt phù hợp, thao tác gọn để giảm rơi đơn." data-en="Payment – shipping configured appropriately, streamlined steps to reduce dropped orders." data-default="en">
                  Thanh toán – giao hàng cài đặt phù hợp, thao tác gọn để giảm rơi đơn.
                </li>
                <li data-vi="Tối ưu tìm kiếm cho sản phẩm/dịch vụ: tiêu đề, mô tả, đường dẫn rõ ràng; bổ sung dấu hiệu để Google hiểu nội dung tốt hơn." data-en="Search optimization for products/services: clear titles, descriptions, and URLs; add signals so Google understands the content better." data-default="en">
                  Tối ưu tìm kiếm cho sản phẩm/dịch vụ: tiêu đề, mô tả, đường dẫn rõ ràng; bổ sung dấu hiệu để Google hiểu nội dung tốt hơn.
                </li>
                <li data-vi="Hiện diện địa phương (Local): tối ưu hồ sơ doanh nghiệp trên Google, trang đích theo khu vực." data-en="Local presence (Local): optimize your business profile on Google, area-based landing pages." data-default="en">
                  Hiện diện địa phương (Local): tối ưu hồ sơ doanh nghiệp trên Google, trang đích theo khu vực.
                </li>
              </ul>
            </div>

            <div className="service-item">
              <h3 data-vi="2) Ứng dụng web quản lý công việc" data-en="2) Work management web applications" data-default="en">
                2) Ứng dụng web quản lý công việc
              </h3>
              <ul>
                <li data-vi="Web app cho đặt lịch – quản lý khách – kho – đơn – báo cáo (tất cả trên trình duyệt)." data-en="Web apps for booking – customer management – inventory – orders – reporting (all in the browser)." data-default="en">
                  Web app cho đặt lịch – quản lý khách – kho – đơn – báo cáo (tất cả trên trình duyệt).
                </li>
                <li data-vi="Phân quyền theo vai trò, ghi lại lịch sử thao tác, nhắc việc tự động." data-en="Role-based permissions, action history logging, automatic reminders." data-default="en">
                  Phân quyền theo vai trò, ghi lại lịch sử thao tác, nhắc việc tự động.
                </li>
                <li data-vi="Có thể thêm biểu tượng app trên điện thoại để mở nhanh, dùng gần như ứng dụng cài đặt." data-en="Can add an app icon on the phone for quick access, used almost like an installed app." data-default="en">
                  Có thể thêm biểu tượng app trên điện thoại để mở nhanh, dùng gần như ứng dụng cài đặt.
                </li>
              </ul>
            </div>

            <div className="service-item">
              <h3 data-vi="3) Hệ thống tự động hóa nhẹ tay" data-en="3) Light-touch automation systems" data-default="en">
                3) Hệ thống tự động hóa nhẹ tay
              </h3>
              <ul>
                <li data-vi="Chuỗi email/SMS: chào mừng, nuôi dưỡng, nhắc lịch, chăm sau mua." data-en="Email/SMS sequences: welcome, nurturing, reminders, post-purchase care." data-default="en">
                  Chuỗi email/SMS: chào mừng, nuôi dưỡng, nhắc lịch, chăm sau mua.
                </li>
                <li data-vi="Ưu tiên khách tiềm năng, tự giao việc cho sale đúng người." data-en="Prioritize potential customers, auto-assign tasks to the right sales rep." data-default="en">
                  Ưu tiên khách tiềm năng, tự giao việc cho sale đúng người.
                </li>
                <li data-vi="Kết nối với phần mềm bán hàng, lịch hẹn, cổng thanh toán… để dữ liệu chạy liền mạch." data-en="Connect with sales software, scheduling, payment gateways… so data flows seamlessly." data-default="en">
                  Kết nối với phần mềm bán hàng, lịch hẹn, cổng thanh toán… để dữ liệu chạy liền mạch.
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
              <div className="process-step-content">
                <h3 data-vi="Lắng nghe & kiểm tra nhanh hiện trạng" data-en="Listen & quick status check" data-default="en">
                  Lắng nghe & kiểm tra nhanh hiện trạng
                </h3>
                <p data-vi="Unitrux chốt mục tiêu (lead, đặt lịch, doanh thu), đối tượng khách và tính năng cần. Đồng thời kiểm tra tốc độ, khả năng hiển thị trên Google, mức độ an toàn và việc theo dõi số liệu hiện có." data-en="Unitrux finalizes goals (leads, bookings, revenue), target audiences, and required features. At the same time, we check speed, Google visibility, security level, and existing analytics tracking." data-default="en">
                  Unitrux chốt mục tiêu (lead, đặt lịch, doanh thu), đối tượng khách và tính năng cần. Đồng thời kiểm tra tốc độ, khả năng hiển thị trên Google, mức độ an toàn và việc theo dõi số liệu hiện có.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="process-step-content">
                <h3 data-vi="Lên khung & lộ trình" data-en="Framework & roadmap" data-default="en">
                  Lên khung & lộ trình
                </h3>
                <p data-vi="Chúng tôi vẽ sơ đồ trang và đường đi của khách (từ trang chủ → xem dịch vụ → để lại thông tin). Lập kế hoạch 30–60–90 ngày để bạn biết từng mốc sẽ có gì." data-en="We draw the page map and customer path (from homepage → view services → leave information). Create a 30–60–90 day plan so you know what to expect at each milestone." data-default="en">
                  Chúng tôi vẽ sơ đồ trang và đường đi của khách (từ trang chủ → xem dịch vụ → để lại thông tin). Lập kế hoạch 30–60–90 ngày để bạn biết từng mốc sẽ có gì.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="process-step-content">
                <h3 data-vi="Bản nháp & demo có thể bấm" data-en="Draft & clickable demo" data-default="en">
                  Bản nháp & demo có thể bấm
                </h3>
                <p data-vi="Unitrux làm bản nháp trắng đen cho các trang chính (trang chủ, dịch vụ/sản phẩm, trang đích, liên hệ), đặt nút kêu gọi đúng chỗ, viết lời ngắn gọn. Sau đó gửi demo có thể bấm để bạn góp ý." data-en="Unitrux creates black-and-white drafts for key pages (homepage, services/products, landing, contact), places calls to action in the right spots, and writes concise copy. Then we send a clickable demo for your feedback." data-default="en">
                  Unitrux làm bản nháp trắng đen cho các trang chính (trang chủ, dịch vụ/sản phẩm, trang đích, liên hệ), đặt nút kêu gọi đúng chỗ, viết lời ngắn gọn. Sau đó gửi demo có thể bấm để bạn góp ý.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="process-step-content">
                <h3 data-vi="Báo giá & cam kết chất lượng" data-en="Quotation & quality commitments" data-default="en">
                  Báo giá & cam kết chất lượng
                </h3>
                <p data-vi="Chốt phạm vi – thời gian – chi phí, tiêu chuẩn chất lượng, cách kiểm tra trước khi bàn giao và bảo hành sau triển khai." data-en="Finalize scope – timeline – costs, quality standards, pre-handover checks, and post-deployment warranty." data-default="en">
                  Chốt phạm vi – thời gian – chi phí, tiêu chuẩn chất lượng, cách kiểm tra trước khi bàn giao và bảo hành sau triển khai.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="process-step-content">
                <h3 data-vi="Thiết lập & chạy thử" data-en="Setup & trial run" data-default="en">
                  Thiết lập & chạy thử
                </h3>
                <p data-vi="Unitrux dựng bản chạy thử riêng, cài theo dõi lượt truy cập và chuyển đổi, nếu đổi từ site cũ thì chuyển dữ liệu & giữ thứ hạng." data-en="Unitrux builds a separate staging version, installs visit and conversion tracking, and if migrating from an old site, transfers data & preserves rankings." data-default="en">
                  Unitrux dựng bản chạy thử riêng, cài theo dõi lượt truy cập và chuyển đổi, nếu đổi từ site cũ thì chuyển dữ liệu & giữ thứ hạng.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">6</div>
              <div className="process-step-content">
                <h3 data-vi="Ra mắt & tối ưu liên tục" data-en="Launch & continuous optimization" data-default="en">
                  Ra mắt & tối ưu liên tục
                </h3>
                <p data-vi="Xuất bản chính thức, kiểm tra trên nhiều thiết bị, đọc số liệu thật để tối ưu tốc độ – nội dung – nút bấm. Mỗi 2–4 tuần có báo cáo và kế hoạch cải tiến tiếp theo." data-en="Publish officially, test across devices, and read real data to optimize speed – content – buttons. Every 2-4 weeks there's a report and a plan for the next improvements." data-default="en">
                  Xuất bản chính thức, kiểm tra trên nhiều thiết bị, đọc số liệu thật để tối ưu tốc độ – nội dung – nút bấm. Mỗi 2–4 tuần có báo cáo và kế hoạch cải tiến tiếp theo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section fade-in-section">
        <div className="container">
          <h2 data-vi="Kết quả Unitrux mang lại cho bạn" data-en="Results Unitrux brings you" data-default="en">
            Kết quả Unitrux mang lại cho bạn
          </h2>
          <div className="results-grid">
            <div className="result-item">
              <div className="result-icon">⚡</div>
              <h3 data-vi="Web/app nhanh & ổn định, xem mượt trên điện thoại" data-en="Fast & stable web/app, smooth on mobile" data-default="en">
                Web/app nhanh & ổn định, xem mượt trên điện thoại
              </h3>
            </div>
            <div className="result-item">
              <div className="result-icon">🔍</div>
              <h3 data-vi="Dễ tìm trên Google nhờ cấu trúc rõ ràng và nội dung đúng ý người tìm" data-en="Easier to find on Google thanks to clear structure and content aligned with search intent" data-default="en">
                Dễ tìm trên Google nhờ cấu trúc rõ ràng và nội dung đúng ý người tìm
              </h3>
            </div>
            <div className="result-item">
              <div className="result-icon">📝</div>
              <h3 data-vi="Form/đặt lịch dễ dùng, tỉ lệ để lại thông tin cao hơn" data-en="Easy-to-use forms/booking, higher information-submission rates" data-default="en">
                Form/đặt lịch dễ dùng, tỉ lệ để lại thông tin cao hơn
              </h3>
            </div>
            <div className="result-item">
              <div className="result-icon">🔒</div>
              <h3 data-vi="An toàn & yên tâm bảo trì, khi cần thêm tính năng cũng triển khai nhanh" data-en="Secure & worry-free maintenance; new features can be rolled out quickly when needed" data-default="en">
                An toàn & yên tâm bảo trì, khi cần thêm tính năng cũng triển khai nhanh
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section fade-in-section">
        <div className="container">
          <h2 data-vi="Câu hỏi thường gặp (FAQ)" data-en="Frequently Asked Questions (FAQ)" data-default="en">
            Câu hỏi thường gặp (FAQ)
          </h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3 data-vi="Tôi nên chọn nền tảng nào?" data-en="Which platform should I choose?" data-default="en">
                Tôi nên chọn nền tảng nào?
              </h3>
              <p data-vi="Tùy mục tiêu: bán hàng tập trung → cửa hàng online; nội dung nhiều → website dịch vụ; quy trình nội bộ → ứng dụng web. Unitrux tư vấn theo nhu cầu thật của bạn." data-en="Depending on your goals: focused selling → online store; lots of content → service website; internal processes → web application. Unitrux advises based on your real needs." data-default="en">
                Tùy mục tiêu: bán hàng tập trung → cửa hàng online; nội dung nhiều → website dịch vụ; quy trình nội bộ → ứng dụng web. Unitrux tư vấn theo nhu cầu thật của bạn.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="Bao lâu thì online?" data-en="How soon will it be online?" data-default="en">
                Bao lâu thì online?
              </h3>
              <p data-vi="Gói cơ bản thường 3–5 tuần; dự án nhiều tính năng hoặc cần tích hợp thêm 6–10 tuần. Lịch trình được chốt ngay từ đầu." data-en="Basic packages usually take 3-5 weeks; projects with many features or extra integrations take 6-10 weeks. The schedule is set from the start." data-default="en">
                Gói cơ bản thường 3–5 tuần; dự án nhiều tính năng hoặc cần tích hợp thêm 6–10 tuần. Lịch trình được chốt ngay từ đầu.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="Tôi không rành kỹ thuật, có tự quản lý được không?" data-en="I'm not tech-savvy—can I manage it myself?" data-default="en">
                Tôi không rành kỹ thuật, có tự quản lý được không?
              </h3>
              <p data-vi="Có. Bạn sẽ có hướng dẫn ngắn để thêm/sửa nội dung, xem báo cáo; hoặc chọn gói bảo trì để Unitrux làm giúp." data-en="Yes. You'll have short guides to add/edit content and view reports; or choose a maintenance package for Unitrux to handle it." data-default="en">
                Có. Bạn sẽ có hướng dẫn ngắn để thêm/sửa nội dung, xem báo cáo; hoặc chọn gói bảo trì để Unitrux làm giúp.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="Đổi từ website cũ có mất dữ liệu không?" data-en="Will switching from the old website cause data loss?" data-default="en">
                Đổi từ website cũ có mất dữ liệu không?
              </h3>
              <p data-vi="Không. Chúng tôi hỗ trợ chuyển dữ liệu và giữ đường dẫn quan trọng để hạn chế ảnh hưởng thứ hạng." data-en="No. We help migrate data and preserve important URLs to minimize ranking impact." data-default="en">
                Không. Chúng tôi hỗ trợ chuyển dữ liệu và giữ đường dẫn quan trọng để hạn chế ảnh hưởng thứ hạng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section fade-in-section">
        <div className="container">
          <div className="cta-content">
            <h2 data-vi="Nhận tư vấn web/app 'nhanh - chuẩn - chuyển đổi'" data-en="Get a consultation for a 'fast - standard - conversion-focused' web/app" data-default="en">
              Nhận tư vấn web/app 'nhanh - chuẩn - chuyển đổi'
            </h2>
            <p data-vi="Xem demo theo ngành của bạn • Nhận báo giá & lộ trình 30-60-90 ngày" data-en="See demos for your industry • Get a quote & a 30-60-90 day roadmap" data-default="en">
              Xem demo theo ngành của bạn • Nhận báo giá & lộ trình 30-60-90 ngày
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

export default WebDevelopmentService;
