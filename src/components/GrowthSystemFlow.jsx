import { Link } from 'react-router-dom';

const stages = [
  {
    number: '01',
    titleEn: 'Attract the right traffic',
    titleVi: 'Thu hút đúng khách hàng',
    copyEn: 'SEO, content and paid media bring qualified demand into one focused destination.',
    copyVi: 'SEO, nội dung và quảng cáo đưa nhu cầu phù hợp về một điểm đến có chủ đích.',
    labelEn: 'SEO & Ads',
    labelVi: 'SEO & Quảng cáo',
    to: '/digital-marketing',
  },
  {
    number: '02',
    titleEn: 'Turn attention into trust',
    titleVi: 'Biến sự chú ý thành niềm tin',
    copyEn: 'A fast, credible website explains your value before a sales conversation begins.',
    copyVi: 'Website nhanh và đáng tin giúp khách hiểu giá trị trước khi cuộc tư vấn bắt đầu.',
    labelEn: 'Website',
    labelVi: 'Website',
    to: '/web-development',
  },
  {
    number: '03',
    titleEn: 'Capture intent while it is warm',
    titleVi: 'Bắt lead ngay khi nhu cầu còn nóng',
    copyEn: 'Chatbot and Zalo answer instantly, qualify needs and collect contact details around the clock.',
    copyVi: 'Chatbot và Zalo phản hồi tức thì, phân loại nhu cầu và thu thập liên hệ 24/7.',
    labelEn: 'Chatbot & Zalo',
    labelVi: 'Chatbot & Zalo',
    to: '/chatbox-ai',
  },
  {
    number: '04',
    titleEn: 'Follow up without losing context',
    titleVi: 'Tự động follow-up, không mất ngữ cảnh',
    copyEn: 'Lead data moves into a clear follow-up workflow so your team knows what to do next.',
    copyVi: 'Dữ liệu lead đi vào quy trình chăm sóc rõ ràng để đội ngũ biết bước tiếp theo.',
    labelEn: 'Automation',
    labelVi: 'Tự động hóa',
    to: '/automation',
  },
  {
    number: '05',
    titleEn: 'Measure, learn and improve',
    titleVi: 'Đo lường, học hỏi và tối ưu',
    copyEn: 'Traffic, enquiries and campaign signals become the evidence for your next decision.',
    copyVi: 'Traffic, lượt liên hệ và tín hiệu chiến dịch trở thành căn cứ cho quyết định tiếp theo.',
    labelEn: 'Analytics',
    labelVi: 'Đo lường',
    to: '/services',
  },
];

const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat', {
  detail: { placement: 'growth_system' },
}));

const GrowthSystemFlow = () => (
  <section id="growth-system" className="growth-system" aria-labelledby="growth-system-title">
    <div className="home-shell growth-system__layout">
      <div className="growth-system__intro">
        <p className="home-kicker" data-en="One connected growth system" data-vi="Một hệ thống tăng trưởng liền mạch">
          One connected growth system
        </p>
        <h2 id="growth-system-title" data-en="Every touchpoint moves the customer forward." data-vi="Mỗi điểm chạm đều đưa khách hàng tiến gần hơn đến quyết định.">
          Every touchpoint moves the customer forward.
        </h2>
        <p data-en="Unitrux connects acquisition, experience, conversation and measurement—so each investment supports the next instead of operating alone." data-vi="Unitrux kết nối thu hút, trải nghiệm, hội thoại và đo lường — để mỗi khoản đầu tư hỗ trợ cho bước tiếp theo thay vì hoạt động riêng lẻ.">
          Unitrux connects acquisition, experience, conversation and measurement—so each investment supports the next instead of operating alone.
        </p>
        <button type="button" className="home-text-action" onClick={openChat}>
          <span data-en="Discuss your growth bottleneck" data-vi="Trao đổi điểm nghẽn tăng trưởng">Discuss your growth bottleneck</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <ol className="growth-system__steps">
        {stages.map((stage) => (
          <li key={stage.number} className="growth-stage">
            <span className="growth-stage__number" aria-hidden="true">{stage.number}</span>
            <div className="growth-stage__content">
              <h3 data-en={stage.titleEn} data-vi={stage.titleVi}>{stage.titleEn}</h3>
              <p data-en={stage.copyEn} data-vi={stage.copyVi}>{stage.copyEn}</p>
            </div>
            <Link className="growth-stage__link" to={stage.to}>
              <span data-en={stage.labelEn} data-vi={stage.labelVi}>{stage.labelEn}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default GrowthSystemFlow;
