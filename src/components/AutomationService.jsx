import React, { useEffect } from 'react';

const AutomationService = () => {
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
            <h1 data-vi="Giải pháp tự động hóa – Vận hành nhẹ tay, khách hàng không bị bỏ sót" data-en="Automation Solutions – Light-touch operations, no customers left behind" data-default="en">
              Giải pháp tự động hóa – Vận hành nhẹ tay, khách hàng không bị bỏ sót
            </h1>
            <p data-vi="Bạn có nhiều việc lặp đi lặp lại mỗi ngày: xác nhận đơn, nhắc lịch, gửi báo giá, chăm lại khách cũ…? Giải pháp tự động hóa của Unitrux giúp hệ thống làm hộ bạn: khách được chăm đúng lúc, đội ngũ bớt việc vặt, còn bạn nhìn thấy kết quả rõ ràng trên một màn hình." data-en="Do you have many repetitive tasks every day: order confirmation, appointment reminders, sending quotes, re-engaging past customers…? Unitrux's automation solution lets the system do it for you: customers are cared for at the right time, your team has fewer small tasks, and you can see clear results on a single screen." data-default="en">
              Bạn có nhiều việc lặp đi lặp lại mỗi ngày: xác nhận đơn, nhắc lịch, gửi báo giá, chăm lại khách cũ…? Giải pháp tự động hóa của Unitrux giúp hệ thống làm hộ bạn: khách được chăm đúng lúc, đội ngũ bớt việc vặt, còn bạn nhìn thấy kết quả rõ ràng trên một màn hình.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section fade-in-section">
        <div className="container">
          <h2 data-vi="Vì sao doanh nghiệp nên tự động hóa?" data-en="Why should businesses automate?" data-default="en">
            Vì sao doanh nghiệp nên tự động hóa?
          </h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">⏰</div>
              <h3 data-vi="Phản hồi chậm là mất khách" data-en="Slow responses lose customers" data-default="en">
                Phản hồi chậm là mất khách
              </h3>
              <p data-vi="khách để lại thông tin nhưng chưa ai gọi – họ quên ngay." data-en="customers leave their information but no one calls yet—they forget right away." data-default="en">
                khách để lại thông tin nhưng chưa ai gọi – họ quên ngay.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">🔀</div>
              <h3 data-vi="Quy trình rời rạc" data-en="Fragmented processes" data-default="en">
                Quy trình rời rạc
              </h3>
              <p data-vi="sale, marketing, CSKH mỗi nơi một kiểu; dữ liệu không khớp." data-en="sales, marketing, and customer service each do things differently; data doesn't match." data-default="en">
                sale, marketing, CSKH mỗi nơi một kiểu; dữ liệu không khớp.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">🤖</div>
              <h3 data-vi="Làm tay quá nhiều" data-en="Too much manual work" data-default="en">
                Làm tay quá nhiều
              </h3>
              <p data-vi="copy‑paste, nhập file, gửi mail từng người – vừa tốn thời gian vừa dễ sai." data-en="copy-paste, file entry, emailing one by one—time-consuming and error-prone." data-default="en">
                copy‑paste, nhập file, gửi mail từng người – vừa tốn thời gian vừa dễ sai.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">📊</div>
              <h3 data-vi="Khó đo lường" data-en="Hard to measure" data-default="en">
                Khó đo lường
              </h3>
              <p data-vi="không biết khách đang ở bước nào, kịch bản nào hiệu quả." data-en="you don't know which stage customers are in, which scenario is effective." data-default="en">
                không biết khách đang ở bước nào, kịch bản nào hiệu quả.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section fade-in-section">
        <div className="container">
          <h2 data-vi="Unitrux mang đến điều gì?" data-en="What does Unitrux bring?" data-default="en">
            Unitrux mang đến điều gì?
          </h2>
          <div className="services-list">
            <div className="service-item">
              <h3 data-vi="Tự động hóa quy trình làm việc" data-en="Workflow automation" data-default="en">
                Tự động hóa quy trình làm việc
              </h3>
              <p data-vi="việc thường ngày như gửi báo giá, xác nhận lịch, cảm ơn sau mua… được chạy tự động theo quy tắc rõ ràng." data-en="everyday tasks like sending quotes, confirming appointments, post-purchase thank you… run automatically based on clear rules." data-default="en">
                việc thường ngày như gửi báo giá, xác nhận lịch, cảm ơn sau mua… được chạy tự động theo quy tắc rõ ràng.
              </p>
            </div>

            <div className="service-item">
              <h3 data-vi="Tích hợp CRM (hệ thống quản lý khách hàng)" data-en="CRM integration (customer relationship management)" data-default="en">
                Tích hợp CRM (hệ thống quản lý khách hàng)
              </h3>
              <p data-vi="tập trung thông tin khách một chỗ; ai phụ trách, tiến độ tới đâu – nhìn là biết." data-en="centralize customer information; who is in charge and current progress-easy to see at a glance." data-default="en">
                tập trung thông tin khách một chỗ; ai phụ trách, tiến độ tới đâu – nhìn là biết.
              </p>
            </div>

            <div className="service-item">
              <h3 data-vi="Tiếp thị qua email/SMS" data-en="Email/SMS marketing" data-default="en">
                Tiếp thị qua email/SMS
              </h3>
              <p data-vi="chuỗi thư nuôi dưỡng nhẹ nhàng, nhắc lịch đúng lúc; nói bằng giọng thương hiệu của bạn, không spam." data-en="gentle nurturing sequences and timely reminders; in your brand voice, not spam." data-default="en">
                chuỗi thư nuôi dưỡng nhẹ nhàng, nhắc lịch đúng lúc; nói bằng giọng thương hiệu của bạn, không spam.
              </p>
            </div>

            <div className="service-item">
              <h3 data-vi="Xử lý & đồng bộ dữ liệu" data-en="Data processing & synchronization" data-default="en">
                Xử lý & đồng bộ dữ liệu
              </h3>
              <p data-vi="web, form, cửa hàng online, công cụ quảng cáo… nói chuyện với nhau, hạn chế nhập tay." data-en="website, forms, online store, ad tools… talk to each other, minimizing manual input." data-default="en">
                web, form, cửa hàng online, công cụ quảng cáo… nói chuyện với nhau, hạn chế nhập tay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section fade-in-section">
        <div className="container">
          <h2 data-vi="Quy trình 6 bước" data-en="6-step process" data-default="en">
            Quy trình 6 bước
          </h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3 data-vi="Lắng nghe & kiểm tra nhanh hiện trạng" data-en="Listen & quickly assess current state" data-default="en">
                Lắng nghe & kiểm tra nhanh hiện trạng
              </h3>
              <p data-vi="Unitrux hỏi mục tiêu của bạn (tăng lead, chốt lịch, bán lại cho khách cũ…), xem các kênh đang dùng, và kiểm tra quy trình hiện có." data-en="Unitrux asks your goals (increase leads, book appointments, resell to existing customers…), reviews the channels you use, and checks existing processes." data-default="en">
                Unitrux hỏi mục tiêu của bạn (tăng lead, chốt lịch, bán lại cho khách cũ…), xem các kênh đang dùng, và kiểm tra quy trình hiện có.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3 data-vi="Vẽ hành trình chăm khách" data-en="Map the customer care journey" data-default="en">
                Vẽ hành trình chăm khách
              </h3>
              <p data-vi="Chúng tôi cùng bạn phác thảo đường đi của khách: thấy quảng cáo → vào web → để lại thông tin → tư vấn → đặt lịch/mua → chăm sau bán." data-en="Together we sketch the customer path: see an ad → visit website → leave information → consult → book/purchase → post-sale care." data-default="en">
                Chúng tôi cùng bạn phác thảo đường đi của khách: thấy quảng cáo → vào web → để lại thông tin → tư vấn → đặt lịch/mua → chăm sau bán.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3 data-vi="Thiết kế kịch bản tự động" data-en="Design automation scenarios" data-default="en">
                Thiết kế kịch bản tự động
              </h3>
              <p data-vi="Unitrux viết các kịch bản ngắn gọn, dễ hiểu" data-en="Unitrux writes concise, easy-to-understand scenarios." data-default="en">
                Unitrux viết các kịch bản ngắn gọn, dễ hiểu
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3 data-vi="Kết nối hệ thống" data-en="Connect the systems" data-default="en">
                Kết nối hệ thống
              </h3>
              <p data-vi="Unitrux kết nối website/form, cửa hàng online, phần mềm bán hàng, lịch hẹn, công cụ email/SMS… để dữ liệu chạy một mạch." data-en="Unitrux connects the website/forms, online store, sales software, scheduling, email/SMS tools… so data flows end to end." data-default="en">
                Unitrux kết nối website/form, cửa hàng online, phần mềm bán hàng, lịch hẹn, công cụ email/SMS… để dữ liệu chạy một mạch.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3 data-vi="Chạy thử & đo lường" data-en="Test & measure" data-default="en">
                Chạy thử & đo lường
              </h3>
              <p data-vi="Chúng tôi kiểm tra từng kịch bản: gửi thử, đo tỉ lệ mở – tỉ lệ nhấp – tỉ lệ phản hồi, xem có bị gửi trùng hay không. Nếu cần, Unitrux chỉnh lại tần suất và nội dung cho ấm & thật." data-en="We check each scenario: test sends, measure open rate – click rate – reply rate, and verify there's no duplicate sending. If needed, Unitrux adjusts frequency and content to be warm & genuine." data-default="en">
                Chúng tôi kiểm tra từng kịch bản: gửi thử, đo tỉ lệ mở – tỉ lệ nhấp – tỉ lệ phản hồi, xem có bị gửi trùng hay không. Nếu cần, Unitrux chỉnh lại tần suất và nội dung cho ấm & thật.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">6</div>
              <h3 data-vi="Vận hành & tối ưu liên tục" data-en="Operate & continuously optimize" data-default="en">
                Vận hành & tối ưu liên tục
              </h3>
              <p data-vi="Mỗi 2-4 tuần, Unitrux xem số liệu, thêm/bớt bước cho phù hợp, dọn dữ liệu trùng, hướng dẫn đội ngũ sử dụng hàng ngày." data-en="Every 2-4 weeks, Unitrux reviews metrics, adds/removes steps as needed, cleans duplicate data, and trains your team for daily use." data-default="en">
                Mỗi 2-4 tuần, Unitrux xem số liệu, thêm/bớt bước cho phù hợp, dọn dữ liệu trùng, hướng dẫn đội ngũ sử dụng hàng ngày.
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
              <div className="result-icon">✅</div>
              <h3 data-vi="Không bỏ sót khách" data-en="No missed customers" data-default="en">
                Không bỏ sót khách
              </h3>
              <p data-vi="phản hồi tự động ngay sau khi khách để lại thông tin." data-en="automatic responses right after customers leave information." data-default="en">
                phản hồi tự động ngay sau khi khách để lại thông tin.
              </p>
            </div>
            <div className="result-item">
              <div className="result-icon">📅</div>
              <h3 data-vi="No‑show giảm" data-en="Fewer no-shows" data-default="en">
                No‑show giảm
              </h3>
              <p data-vi="lịch được nhắc đúng giờ, khách chủ động đổi lịch khi bận." data-en="appointments are reminded on time; customers can proactively reschedule when busy." data-default="en">
                lịch được nhắc đúng giờ, khách chủ động đổi lịch khi bận.
              </p>
            </div>
            <div className="result-item">
              <div className="result-icon">👥</div>
              <h3 data-vi="Đội sale đỡ việc vặt" data-en="Less busywork for sales" data-default="en">
                Đội sale đỡ việc vặt
              </h3>
              <p data-vi="tập trung nói chuyện với khách thật sự quan tâm." data-en="focus on talking to truly interested customers." data-default="en">
                tập trung nói chuyện với khách thật sự quan tâm.
              </p>
            </div>
            <div className="result-item">
              <div className="result-icon">📊</div>
              <h3 data-vi="Dữ liệu rõ ràng" data-en="Clear data" data-default="en">
                Dữ liệu rõ ràng
              </h3>
              <p data-vi="biết ai ở bước nào, kịch bản nào mang về doanh thu tốt." data-en="know who is at which stage, and which scenario drives good revenue." data-default="en">
                biết ai ở bước nào, kịch bản nào mang về doanh thu tốt.
              </p>
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
              <h3 data-vi="Tự động hóa có làm phiền khách không?" data-en="Will automation annoy customers?" data-default="en">
                Tự động hóa có làm phiền khách không?
              </h3>
              <p data-vi="Không, nếu gửi đúng lúc – đúng nội dung – tần suất vừa phải. Unitrux viết nội dung ngắn gọn, thân thiện, cho phép khách tắt thông báo khi muốn." data-en="No, if sent at the right time – with the right content – at a reasonable frequency. Unitrux writes concise, friendly content and allows customers to turn off notifications when they want." data-default="en">
                Không, nếu gửi đúng lúc – đúng nội dung – tần suất vừa phải. Unitrux viết nội dung ngắn gọn, thân thiện, cho phép khách tắt thông báo khi muốn.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="Tôi không rành kỹ thuật, có dùng được không?" data-en="I'm not tech-savvy—can I use it?" data-default="en">
                Tôi không rành kỹ thuật, có dùng được không?
              </h3>
              <p data-vi="Có. Mục tiêu của Unitrux là để bạn xem – hiểu – dùng ngay. Mọi thứ đều có hướng dẫn ngắn." data-en="Yes. Unitrux's goal is for you to view – understand – use immediately. Everything comes with short guides." data-default="en">
                Có. Mục tiêu của Unitrux là để bạn xem – hiểu – dùng ngay. Mọi thứ đều có hướng dẫn ngắn.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="Bao lâu thấy hiệu quả?" data-en="How soon will we see results?" data-default="en">
                Bao lâu thấy hiệu quả?
              </h3>
              <p data-vi="Thường 2-6 tuần là thấy rõ: trả lời nhanh hơn, ít quên lịch, nhiều cuộc hẹn/đơn hàng hơn." data-en="Usually 2-6 weeks to see clearly: faster responses, fewer missed appointments, more meetings/orders." data-default="en">
                Thường 2-6 tuần là thấy rõ: trả lời nhanh hơn, ít quên lịch, nhiều cuộc hẹn/đơn hàng hơn.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="Dữ liệu có an toàn không?" data-en="Is the data safe?" data-default="en">
                Dữ liệu có an toàn không?
              </h3>
              <p data-vi="Chúng tôi phân quyền tài khoản, ghi lịch sử thay đổi, sao lưu định kỳ; bạn vẫn là chủ dữ liệu." data-en="We assign account permissions, log change history, and back up regularly; you remain the data owner." data-default="en">
                Chúng tôi phân quyền tài khoản, ghi lịch sử thay đổi, sao lưu định kỳ; bạn vẫn là chủ dữ liệu.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="Tôi đã dùng công cụ A/B/C rồi, có phải thay không?" data-en="I already use tool A/B/C - do I have to switch?" data-default="en">
                Tôi đã dùng công cụ A/B/C rồi, có phải thay không?
              </h3>
              <p data-vi="Không nhất thiết. Unitrux kết nối những gì bạn đang có; chỉ đề xuất đổi khi thật cần." data-en="Not necessarily. Unitrux connects what you already have; we only suggest changes when truly necessary." data-default="en">
                Không nhất thiết. Unitrux kết nối những gì bạn đang có; chỉ đề xuất đổi khi thật cần.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section fade-in-section">
        <div className="container">
          <div className="cta-content">
            <h2 data-vi="Xem demo kịch bản tự động hóa cho doanh nghiệp bạn" data-en="See a demo of automation scenarios for your business" data-default="en">
              Xem demo kịch bản tự động hóa cho doanh nghiệp bạn
            </h2>
            <p data-vi="Đặt lịch tư vấn 30' miễn phí • Nhận báo giá & thời gian triển khai" data-en="Book a free 30-minute consultation • Get a quote & implementation timeline" data-default="en">
              Đặt lịch tư vấn 30' miễn phí • Nhận báo giá & thời gian triển khai
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

export default AutomationService;
