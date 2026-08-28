const values = [
  {
    key: 'targeting',
    titleEn: 'Marketing that reaches the right people',
    titleVi: 'Tiếp thị đúng khách hàng',
    copyEn: 'Strategy and messaging built around who your customer is and what they actually need.',
    copyVi: 'Chiến lược & thông điệp đáp ứng đúng người, đúng nhu cầu.',
    icon: <path d="M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM10 6.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM10 9.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6z" />,
  },
  {
    key: 'experience',
    titleEn: 'A seamless customer experience',
    titleVi: 'Trải nghiệm liền mạch',
    copyEn: 'Website, systems and workflows in sync so people move from a first touch to action.',
    copyVi: 'Website, hệ thống & quy trình đồng bộ để khách hàng đi từ chạm đến hành động.',
    icon: <path d="M4 6.5h12M4 10h12M4 13.5h7M15 12l2 2 3-3.5" />,
  },
  {
    key: 'content',
    titleEn: 'Content that persuades',
    titleVi: 'Nội dung & nghệ thuật thuyết phục',
    copyEn: 'Content that connects emotionally, guides behaviour and builds trust.',
    copyVi: 'Nội dung chạm cảm xúc, dẫn dắt hành vi và tạo ra sự tin tưởng.',
    icon: <path d="M5 4h10v9l-5 3-5-3zM8 8h4M8 11h4" />,
  },
  {
    key: 'team',
    titleEn: 'Specialists who stay with you',
    titleVi: 'Đội ngũ chuyên gia đồng hành',
    copyEn: 'A long-term partner working through every growth problem alongside you.',
    copyVi: 'Chúng tôi là đối tác dài hạn, cùng bạn vượt mọi bài toán tăng trưởng.',
    icon: <path d="M7 8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 16c0-2.4 1.9-4 4-4s4 1.6 4 4M13 9a2 2 0 1 0 0-4M12 12.4c2.5.1 4 1.7 4 3.6" />,
  },
  {
    key: 'data',
    titleEn: 'Data, tracking and optimisation',
    titleVi: 'Dữ liệu, theo dõi & tối ưu',
    copyEn: 'Detailed measurement and continuous optimisation to lift results at every stage.',
    copyVi: 'Đo lường chi tiết, liên tục tối ưu & tăng hiệu quả mỗi giai đoạn.',
    icon: <path d="M3 17h14M6 13v2M10 8v7M14 4v11M4 8l4-3 4 2 5-4" />,
  },
  {
    key: 'automation',
    titleEn: 'Automation and productivity',
    titleVi: 'Tự động hóa & tăng năng suất',
    copyEn: 'Automated workflows that save your team time and get more done.',
    copyVi: 'Tự động hóa quy trình, tiết kiệm thời gian & tối đa hiệu suất.',
    icon: <path d="M10 3v3M10 14v3M3 10h3M14 10h3M5.6 5.6l2.1 2.1M12.3 12.3l2.1 2.1M14.4 5.6l-2.1 2.1M7.7 12.3l-2.1 2.1M10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />,
  },
];

const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat', {
  detail: { placement: 'growth_system' },
}));

const GrowthSystemFlow = () => (
  <section id="growth-system" className="growth-system" aria-labelledby="growth-system-title">
    <div className="home-shell growth-system__layout">
      <div className="growth-system__intro" data-reveal>
        <p className="home-kicker" data-en="The value we bring" data-vi="Giá trị chúng tôi mang lại">
          The value we bring
        </p>
        <h2 id="growth-system-title" data-en="Every touchpoint moves the customer closer to a decision." data-vi="Mỗi điểm chạm đều đưa khách hàng tiến gần hơn đến quyết định.">
          Every touchpoint moves the customer closer to a decision.
        </h2>
        <p data-en="Unitrux connects acquisition, experience, conversation and measurement — so each investment supports the next instead of working alone." data-vi="Chúng tôi kết nối công nghệ, nội dung và hệ thống truyền thông thành một hành trình tăng trưởng liền mạch.">
          Unitrux connects acquisition, experience, conversation and measurement — so each investment supports the next instead of working alone.
        </p>
        <button type="button" className="home-text-action" onClick={openChat}>
          <span data-en="Explore our method" data-vi="Tìm hiểu phương pháp của chúng tôi">Explore our method</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <ul className="growth-values">
        {values.map((value) => (
          <li key={value.key} className="growth-value" data-reveal>
            <span className="growth-value__icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{value.icon}</svg>
            </span>
            <h3 data-en={value.titleEn} data-vi={value.titleVi}>{value.titleEn}</h3>
            <p data-en={value.copyEn} data-vi={value.copyVi}>{value.copyEn}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default GrowthSystemFlow;
