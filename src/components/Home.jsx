import HeroShowcase from './HeroShowcase';
import GrowthSystemFlow from './GrowthSystemFlow';
import PortfolioProof from './PortfolioProof';
import NewsSection from './NewsSection';
import ContactForm from './ContactForm';

const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat', {
  detail: { placement: 'contact_stage' },
}));

const Home = () => (
  <main className="home home--flow">
    <HeroShowcase />
    <GrowthSystemFlow />
    <PortfolioProof />

    <section className="home-insights" aria-labelledby="home-insights-title">
      <div className="home-shell home-insights__intro">
        <p className="home-kicker" data-en="Useful thinking, not noise" data-vi="Kiến thức hữu ích, không thêm nhiễu">
          Useful thinking, not noise
        </p>
        <h2 id="home-insights-title" data-en="Insights for better digital decisions." data-vi="Góc nhìn giúp SME ra quyết định số tốt hơn.">
          Insights for better digital decisions.
        </h2>
        <p data-en="Practical notes on websites, search, advertising and automation—loaded from our existing news service." data-vi="Ghi chú thực tế về website, tìm kiếm, quảng cáo và tự động hóa — được cập nhật từ hệ thống tin tức hiện có.">
          Practical notes on websites, search, advertising and automation—loaded from our existing news service.
        </p>
      </div>
      <NewsSection compact />
    </section>

    <section id="contact" className="home-contact-stage" aria-labelledby="home-contact-title">
      <div className="home-shell home-contact-stage__layout">
        <div className="home-contact-stage__copy">
          <p className="home-kicker" data-en="Start with the bottleneck" data-vi="Bắt đầu từ điểm nghẽn">Start with the bottleneck</p>
          <h2 id="home-contact-title" data-en="Tell us where growth is getting stuck." data-vi="Cho chúng tôi biết tăng trưởng đang mắc ở đâu.">
            Tell us where growth is getting stuck.
          </h2>
          <p data-en="We will look at the whole customer journey, then recommend the smallest useful system—not a list of disconnected services." data-vi="Chúng tôi sẽ nhìn toàn bộ hành trình khách hàng, sau đó đề xuất hệ thống gọn nhất có thể tạo giá trị — không phải một danh sách dịch vụ rời rạc.">
            We will look at the whole customer journey, then recommend the smallest useful system—not a list of disconnected services.
          </p>
          <button type="button" className="home-chat-action" onClick={openChat}>
            <span data-en="Chat with Unitrux now" data-vi="Chat với Unitrux ngay">Chat with Unitrux now</span>
            <span aria-hidden="true">↗</span>
          </button>
          <p className="home-contact-stage__note" data-en="Prefer a detailed brief? Use the form and we will respond through your contact email." data-vi="Muốn gửi brief chi tiết? Điền form và chúng tôi sẽ phản hồi qua email liên hệ.">
            Prefer a detailed brief? Use the form and we will respond through your contact email.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  </main>
);

export default Home;
