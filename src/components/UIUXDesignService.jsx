import React from 'react';
import { Link } from 'react-router-dom';

const UIUXDesignService = () => {
  return (
    <div className="service-detail-page">
      <div className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <div className="service-badge">
              <span data-vi="Dịch vụ" data-en="Service">Service</span>
            </div>
            <h1 className="service-title" data-vi="UI/UX Design – Thiết kế dễ hiểu để khách bấm ngay và quay lại" data-en="UI/UX Design – Clear design that makes customers click right away and come back">
              UI/UX Design – Clear design that makes customers click right away and come back
            </h1>
            <p className="service-subtitle" data-vi="Bạn không cần một giao diện hoa mỹ. Bạn cần một trang dễ hiểu, nút bấm đúng chỗ, điền thông tin không mệt, và khách quay lại nhiều lần. UI/UX Design của Unitrux làm đúng điều đó: nói bằng ngôn ngữ đời thường, sắp xếp thông tin theo cách người thật đọc, và đo lường kết quả rõ ràng." data-en="You don't need a flashy interface. You need a page that's easy to understand, buttons in the right places, form-filling that isn't tiring, and customers who return many times. Unitrux's UI/UX Design does exactly that: speaking in everyday language, arranging information the way real people read, and measuring results clearly.">
              You don't need a flashy interface. You need a page that's easy to understand, buttons in the right places, form-filling that isn't tiring, and customers who return many times. Unitrux's UI/UX Design does exactly that: speaking in everyday language, arranging information the way real people read, and measuring results clearly.
            </p>
          </div>
        </div>
      </div>

      {/* Why customers leave */}
      <section className="why-choose-section">
        <div className="container">
          <h2 data-vi="Vì sao khách hay rời đi?" data-en="Why do customers often leave?">Why do customers often leave?</h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">😵</div>
              <h3 data-vi="Đẹp nhưng rối" data-en="Beautiful but confusing">Beautiful but confusing</h3>
              <p data-vi="tiêu đề không nói rõ lợi ích, khách không biết phải bấm vào đâu." data-en="headlines don't state the benefits clearly, and customers don't know where to click.">
                headlines don't state the benefits clearly, and customers don't know where to click.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">📝</div>
              <h3 data-vi="Biểu mẫu quá dài" data-en="Forms that are too long">Forms that are too long</h3>
              <p data-vi="khách dự định để lại thông tin… rồi thôi." data-en="customers intend to leave their information… then drop it.">
                customers intend to leave their information… then drop it.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">❌</div>
              <h3 data-vi="Thiếu tin cậy" data-en="Lack of trust">Lack of trust</h3>
              <p data-vi="không thấy đánh giá, ảnh thật, chính sách rõ ràng." data-en="no reviews, real photos, or clear policies.">
                no reviews, real photos, or clear policies.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">📱</div>
              <h3 data-vi="Trên điện thoại khó dùng" data-en="Hard to use on mobile">Hard to use on mobile</h3>
              <p data-vi="chữ nhỏ, nút bé, kéo lên kéo xuống mỏi tay." data-en="small text, tiny buttons, scrolling up and down is tiring.">
                small text, tiny buttons, scrolling up and down is tiring.
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">🎨</div>
              <h3 data-vi="Mỗi trang một kiểu" data-en="Every page has a different style">Every page has a different style</h3>
              <p data-vi="hôm nay đổi một chút, mai đổi tiếp, lâu dần vỡ bố cục." data-en="change a bit today, change again tomorrow, and over time the layout breaks.">
                change a bit today, change again tomorrow, and over time the layout breaks.
              </p>
            </div>
          </div>
          <p className="note" data-vi="Nếu bạn gật đầu ở vài điểm, đây chính xác là lúc UI/UX cần vào cuộc." data-en="If you nodded at a few points, this is exactly the time for UI/UX to step in.">
            If you nodded at a few points, this is exactly the time for UI/UX to step in.
          </p>
        </div>
      </section>

      {/* Unitrux solution */}
      <section className="what-we-do-section">
        <div className="container">
          <h2 data-vi="Giải pháp UI/UX của Unitrux: rõ ràng – mạch lạc – chuyển đổi" data-en="Unitrux's UI/UX solution: clarity – coherence – conversion">Unitrux's UI/UX solution: clarity – coherence – conversion</h2>
          <div className="services-list">
            <div className="service-item">
              <h3 data-vi="Nói rõ điều khách cần nghe" data-en="State clearly what customers need to hear">State clearly what customers need to hear</h3>
              <p data-vi="tiêu đề ngắn gọn, đi thẳng vào lợi ích." data-en="concise headlines that go straight to the benefits.">
                concise headlines that go straight to the benefits.
              </p>
            </div>
            <div className="service-item">
              <h3 data-vi="Dẫn dắt theo từng bước" data-en="Guide step by step">Guide step by step</h3>
              <p data-vi="thông tin quan trọng ở trên, chứng cứ/đánh giá kèm ngay dưới, nút kêu gọi hành động (CTA) đặt đúng chỗ." data-en="important information on top, proof/reviews right below, calls to action (CTAs) placed in the right spots.">
                important information on top, proof/reviews right below, calls to action (CTAs) placed in the right spots.
              </p>
            </div>
            <div className="service-item">
              <h3 data-vi="Viết lời ngắn gọn, dễ đọc" data-en="Write short, easy-to-read copy">Write short, easy-to-read copy</h3>
              <p data-vi="câu chữ thân thiện, tránh thuật ngữ." data-en="friendly wording, avoid jargon.">
                friendly wording, avoid jargon.
              </p>
            </div>
            <div className="service-item">
              <h3 data-vi="Tăng niềm tin" data-en="Increase trust">Increase trust</h3>
              <p data-vi="hình/clip thật, phản hồi thật, chính sách đổi trả/bảo hành rõ ràng." data-en="real images/clips, real feedback, clear return/warranty policies.">
                real images/clips, real feedback, clear return/warranty policies.
              </p>
            </div>
            <div className="service-item">
              <h3 data-vi="Ưu tiên điện thoại" data-en="Prioritize mobile">Prioritize mobile</h3>
              <p data-vi="chữ dễ đọc, nút to vừa tay, thao tác ít bước." data-en="readable text, comfortably sized buttons, fewer steps.">
                readable text, comfortably sized buttons, fewer steps.
              </p>
            </div>
            <div className="service-item">
              <h3 data-vi="Một kiểu cho tất cả" data-en="One style for all">One style for all</h3>
              <p data-vi="làm bộ quy tắc thiết kế (màu, font, nút, thẻ, khoảng cách) để mọi trang đi cùng một phong cách." data-en="create a design ruleset (colors, fonts, buttons, cards, spacing) so every page follows one consistent style.">
                create a design ruleset (colors, fonts, buttons, cards, spacing) so every page follows one consistent style.
              </p>
            </div>
          </div>
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
                <h3 data-vi="Hiểu mục tiêu & người dùng" data-en="Understand goals & users">Understand goals & users</h3>
                <p data-vi="Bạn muốn khách làm gì? Đặt lịch? Gọi điện? Mua ngay? Unitrux chốt mục tiêu, đọc số liệu hiện tại, hỏi nhanh vài khách điển hình để hiểu vướng mắc của họ." data-en="What do you want customers to do? Book? Call? Buy now? Unitrux finalizes the goals, reviews current metrics, and quickly interviews a few typical customers to understand their hurdles.">
                  What do you want customers to do? Book? Call? Buy now? Unitrux finalizes the goals, reviews current metrics, and quickly interviews a few typical customers to understand their hurdles.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="process-step-content">
                <h3 data-vi="Vẽ lại luồng đi của khách" data-en="Map the customer flow">Map the customer flow</h3>
                <p data-vi="Chúng tôi nhìn toàn bộ hành trình: từ lúc khách vào trang cho tới khi để lại thông tin/mua hàng. Xác định điểm rơi khiến khách bỏ cuộc (ví dụ: tìm số điện thoại lâu, phí ship không rõ)." data-en="We look at the entire journey: from when customers land on the page to when they leave information/make a purchase. Identify drop-off points that make them give up (e.g., taking too long to find the phone number, unclear shipping fees).">
                  We look at the entire journey: from when customers land on the page to when they leave information/make a purchase. Identify drop-off points that make them give up (e.g., taking too long to find the phone number, unclear shipping fees).
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="process-step-content">
                <h3 data-vi="Phác thảo giao diện (bản nháp không màu)" data-en="Sketch the interface (low-fidelity, no color)">Sketch the interface (low-fidelity, no color)</h3>
                <p data-vi="Tạo bản nháp trắng đen cho các trang chính (trang chủ, dịch vụ/sản phẩm, trang đích, liên hệ). Đặt nút kêu gọi ở vị trí dễ thấy, thông tin ngắn gọn, khoảng trắng thoáng. Mời bạn góp ý trực tiếp." data-en="Create black-and-white drafts for key pages (home, service/product, landing, contact). Place calls to action where they're easy to see, keep information concise, and whitespace generous. Invite your direct feedback.">
                  Create black-and-white drafts for key pages (home, service/product, landing, contact). Place calls to action where they're easy to see, keep information concise, and whitespace generous. Invite your direct feedback.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="process-step-content">
                <h3 data-vi="Lên giao diện hoàn chỉnh & bộ quy tắc" data-en="Finalize the interface & the design ruleset">Finalize the interface & the design ruleset</h3>
                <p data-vi="Đổ màu, chọn font, hoàn thiện nút, biểu mẫu, thẻ thông tin… Sau đó gom lại thành bộ quy tắc thiết kế để sau này làm thêm trang mới cũng giữ đúng chất." data-en="Add colors, choose fonts, refine buttons, forms, information cards… Then consolidate them into a design ruleset so future pages keep the same 'feel.'">
                  Add colors, choose fonts, refine buttons, forms, information cards… Then consolidate them into a design ruleset so future pages keep the same "feel."
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="process-step-content">
                <h3 data-vi="Thử nhanh trước khi đưa lên web" data-en="Quick testing before going live">Quick testing before going live</h3>
                <p data-vi="Làm bản thử có thể bấm và mời 5-10 người dùng thử. So sánh 2 phiên bản (thử A/B) – cái nào nhiều người bấm hơn sẽ được chọn." data-en="Build a clickable prototype and invite 5-10 users to test. Compare two versions (A/B test) — the one more people click wins.">
                  Build a clickable prototype and invite 5-10 users to test. Compare two versions (A/B test) — the one more people click wins.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">6</div>
              <div className="process-step-content">
                <h3 data-vi="Bàn giao & theo dõi sau khi chạy" data-en="Handover & follow-up after launch">Handover & follow-up after launch</h3>
                <p data-vi="Bàn giao file cho đội kỹ thuật; đồng thời Unitrux đặt sẵn sự kiện đo (ví dụ: bấm nút, gửi form, gọi điện). Sau khi chạy vài tuần, chúng tôi xem lại số liệu, nếu có điểm yếu – sửa tiếp." data-en="Hand over files to the engineering team; at the same time, Unitrux pre-sets tracking events (e.g., button clicks, form submissions, phone calls). After running for a few weeks, we review the numbers and, if there are weak spots, we fix them.">
                  Hand over files to the engineering team; at the same time, Unitrux pre-sets tracking events (e.g., button clicks, form submissions, phone calls). After running for a few weeks, we review the numbers and, if there are weak spots, we fix them.
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
              <div className="result-icon">🎯</div>
              <h3 data-vi="Trang dễ hiểu – dễ bấm" data-en="Pages that are easy to understand and easy to click">Pages that are easy to understand and easy to click</h3>
              <p data-vi="khách không lạc lối." data-en="customers don't get lost.">
                customers don't get lost.
              </p>
            </div>
            <div className="result-item">
              <div className="result-icon">📊</div>
              <h3 data-vi="Nút kêu gọi đúng chỗ" data-en="Calls to action in the right places">Calls to action in the right places</h3>
              <p data-vi="biểu mẫu ngắn gọn → tỉ lệ để lại thông tin tăng." data-en="concise forms → higher information-submission rates.">
                concise forms → higher information-submission rates.
              </p>
            </div>
            <div className="result-item">
              <div className="result-icon">✅</div>
              <h3 data-vi="Niềm tin rõ ràng" data-en="Clear trust signals">Clear trust signals</h3>
              <p data-vi="review, ảnh thật, chính sách minh bạch." data-en="reviews, real photos, transparent policies.">
                reviews, real photos, transparent policies.
              </p>
            </div>
            <div className="result-item">
              <div className="result-icon">⚡</div>
              <h3 data-vi="Đội ngũ có bộ quy tắc chung" data-en="The team shares a common design ruleset">The team shares a common design ruleset</h3>
              <p data-vi="làm trang mới nhanh và ít sửa." data-en="making new pages faster to build and requiring fewer revisions.">
                making new pages faster to build and requiring fewer revisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2 data-vi="Câu hỏi thường gặp" data-en="Frequently Asked Questions">Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3 data-vi="Có cần làm lại toàn bộ website không?" data-en="Do we need to rebuild the entire website?">Do we need to rebuild the entire website?</h3>
              <p data-vi="Không nhất thiết. Nhiều khi chỉ cần sửa trang đích quan trọng là đã thấy khác biệt." data-en="Not necessarily. Often, just fixing the key landing pages already makes a noticeable difference.">
                Not necessarily. Often, just fixing the key landing pages already makes a noticeable difference.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="Khi nào thấy kết quả?" data-en="When will we see results?">When will we see results?</h3>
              <p data-vi="Thường 2–6 tuần sau khi áp dụng bản mới và chạy đủ lượt truy cập để đo." data-en="Typically 2-6 weeks after applying the new version and running enough traffic to measure.">
                Typically 2-6 weeks after applying the new version and running enough traffic to measure.
              </p>
            </div>
            <div className="faq-item">
              <h3 data-vi="Đội marketing có tự làm tiếp được không?" data-en="Can the marketing team continue on their own?">Can the marketing team continue on their own?</h3>
              <p data-vi="Có. Bạn sẽ nhận bộ quy tắc thiết kế để tự thêm/sửa trang sau này mà không sợ lệch." data-en="Yes. You'll receive the design ruleset so you can add/edit pages later without worrying about inconsistency.">
                Yes. You'll receive the design ruleset so you can add/edit pages later without worrying about inconsistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 data-vi="Xem mẫu giao diện theo ngành của bạn • Đặt lịch đánh giá UI/UX miễn phí 30' • Nhận báo giá & thời gian triển khai" data-en="View interface samples for your industry • Book a free 30-minute UI/UX evaluation • Get a quote & timeline for implementation">View interface samples for your industry • Book a free 30-minute UI/UX evaluation • Get a quote & timeline for implementation</h2>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">
                <span data-vi="Xem mẫu giao diện" data-en="View Samples">View Samples</span>
              </Link>
              <Link to="/contact" className="btn-secondary">
                <span data-vi="Đặt lịch đánh giá miễn phí" data-en="Book Free Evaluation">Book Free Evaluation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UIUXDesignService;
