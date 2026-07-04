import React, { useEffect, useMemo, useRef, useState } from 'react';
import { sendUnitruxChat } from '../api/client';

const QUICK_REPLIES = {
  MENU_MAIN: [
    { title: 'Dịch vụ Unitrux', payload: 'MAIN_SERVICES' },
    { title: 'Bảng giá', payload: 'MAIN_PRICING' },
    { title: 'Tư vấn E-com', payload: 'MAIN_ECOM' },
    { title: 'Đặt lịch', payload: 'MAIN_BOOKING' }
  ],
  MAIN_SERVICES: [
    { title: 'Web & Shopify', payload: 'SERVICE_WEB' },
    { title: 'Marketing & SEO', payload: 'SERVICE_MARKETING' },
    { title: 'Branding & AI', payload: 'SERVICE_BRANDING' },
    { title: 'Menu chính', payload: 'MENU_MAIN' }
  ],
  MAIN_PRICING: [
    { title: 'Giá Website', payload: 'PRICING_WEB' },
    { title: 'Giá Marketing', payload: 'PRICING_MARKETING' },
    { title: 'Menu chính', payload: 'MENU_MAIN' }
  ],
  MAIN_ECOM: [
    { title: 'Shopify', payload: 'SERVICE_WEB' },
    { title: 'Amazon Seller', payload: 'MAIN_BOOKING' },
    { title: 'Bán hàng online', payload: 'MAIN_BOOKING' },
    { title: 'Menu chính', payload: 'MENU_MAIN' }
  ],
  MAIN_BOOKING: [
    { title: 'Gửi số điện thoại', payload: 'ASK_CONTACT' },
    { title: 'Gửi email', payload: 'ASK_CONTACT' },
    { title: 'Menu chính', payload: 'MENU_MAIN' }
  ]
};

const FLOW_RESPONSES = {
  MENU_MAIN: {
    text: 'Chào bạn, Unitrux rất vui được hỗ trợ. Bên mình cung cấp các giải pháp Digital Marketing, thiết kế website, Shopify, SEO, branding, AI và e-commerce để giúp doanh nghiệp phát triển doanh thu online.\n\nBạn đang quan tâm đến nhóm thông tin nào để mình tư vấn nhanh hơn?',
    quickReplies: QUICK_REPLIES.MENU_MAIN
  },
  MAIN_SERVICES: {
    text: 'Unitrux hỗ trợ doanh nghiệp xây dựng hệ sinh thái bán hàng và marketing online, từ website, Shopify, SEO, nội dung, quảng cáo đa kênh đến branding và ứng dụng AI.\n\nBạn đang cần hỗ trợ mảng nào trước?',
    quickReplies: QUICK_REPLIES.MAIN_SERVICES
  },
  MAIN_PRICING: {
    text: 'Chi phí dịch vụ tại Unitrux sẽ phụ thuộc vào phạm vi triển khai, số lượng tính năng, mục tiêu kinh doanh và mức độ tùy chỉnh của dự án.\n\nBạn muốn nhận báo giá sơ bộ cho website, marketing/SEO hay một hạng mục khác?',
    quickReplies: QUICK_REPLIES.MAIN_PRICING
  },
  SERVICE_WEB: {
    text: 'Unitrux có thể hỗ trợ thiết kế website chuẩn SEO, landing page, website bán hàng, Shopify và các tích hợp phục vụ chuyển đổi như form lead, thanh toán hoặc CRM.\n\nBạn đang muốn làm website mới, tối ưu website hiện tại hay triển khai Shopify?',
    quickReplies: QUICK_REPLIES.MAIN_BOOKING
  },
  SERVICE_MARKETING: {
    text: 'Unitrux hỗ trợ chiến lược nội dung SEO, quảng cáo đa kênh, video marketing và tối ưu phễu bán hàng để tăng traffic, lead hoặc doanh thu.\n\nBạn đang ưu tiên tăng nhận diện, tăng khách hàng tiềm năng hay tăng đơn hàng?',
    quickReplies: QUICK_REPLIES.MAIN_BOOKING
  },
  SERVICE_BRANDING: {
    text: 'Unitrux có thể hỗ trợ nhận diện thương hiệu, logo, ấn phẩm truyền thông và ứng dụng AI trong quy trình sáng tạo nội dung.\n\nBạn đang xây thương hiệu mới hay muốn nâng cấp bộ nhận diện hiện tại?',
    quickReplies: QUICK_REPLIES.MAIN_BOOKING
  },
  MAIN_ECOM: {
    text: 'Unitrux hỗ trợ các hoạt động e-commerce như Shopify, Amazon Seller và hệ thống bán hàng online theo nhu cầu riêng.\n\nBạn đang kinh doanh trên nền tảng nào, hoặc đang chuẩn bị triển khai từ đầu?',
    quickReplies: QUICK_REPLIES.MAIN_ECOM
  },
  MAIN_BOOKING: {
    text: 'Để Unitrux tư vấn sát hơn với tình hình kinh doanh của bạn, bạn vui lòng để lại số điện thoại hoặc email liên hệ nhé.',
    quickReplies: QUICK_REPLIES.MAIN_BOOKING
  },
  ASK_CONTACT: {
    text: 'Để Unitrux tư vấn chính xác và gửi thông tin phù hợp, bạn vui lòng để lại số điện thoại hoặc email liên hệ nhé.',
    quickReplies: []
  },
  ASK_LOCATION: {
    text: 'Unitrux có thể hỗ trợ tư vấn online trước để nắm rõ nhu cầu và đề xuất hướng triển khai phù hợp.\n\nNếu bạn muốn trao đổi trực tiếp, vui lòng để lại số điện thoại hoặc email để đội ngũ Unitrux liên hệ sắp xếp lịch tư vấn.',
    quickReplies: QUICK_REPLIES.MAIN_BOOKING
  },
  FALLBACK: {
    text: 'Mình chưa nắm rõ nhu cầu của bạn. Bạn có thể nói thêm là bạn đang cần hỗ trợ về website, marketing/SEO, branding, AI hay e-commerce không?',
    quickReplies: QUICK_REPLIES.MENU_MAIN
  }
};

const CONTACT_PROMPT = 'Cảm ơn bạn. Bạn chia sẻ thêm ngắn gọn nhu cầu hiện tại được không? Ví dụ: cần làm website bán hàng, tối ưu SEO, chạy quảng cáo, setup Shopify hoặc tư vấn Amazon.';
const LEAD_CONFIRMATION = 'Unitrux đã ghi nhận thông tin của bạn. Đội ngũ tư vấn sẽ xem nhu cầu và liên hệ lại trong thời gian sớm nhất.';

const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const hasContact = (value) => /(\+?\d[\d\s().-]{7,}\d)|([^\s@]+@[^\s@]+\.[^\s@]+)/.test(value);

const getSessionId = () => {
  const key = 'unitruxChatSessionId';
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const next = `web-user-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(key, next);
  return next;
};

const detectIntent = (message) => {
  const text = normalize(message);

  if (/^(hi|hello|hey|xin chao|chao|start|bat dau)\b/.test(text)) return 'MENU_MAIN';
  if (/(gia|bao gia|chi phi|price|cost|bao nhieu)/.test(text)) return 'MAIN_PRICING';
  if (/(shopify|amazon|ecommerce|e-commerce|thuong mai dien tu|ban hang online)/.test(text)) return 'MAIN_ECOM';
  if (/(tu van|lien he|dat lich|goi lai|so dien thoai|sdt|email|phone)/.test(text)) return 'MAIN_BOOKING';
  if (/(dia chi|o dau|gap truc tiep|van phong|location|address)/.test(text)) return 'ASK_LOCATION';
  if (/(dich vu|website|landing|seo|marketing|branding|logo| ai |tri tue nhan tao)/.test(` ${text} `)) return 'MAIN_SERVICES';

  return 'FALLBACK';
};

const getLocalFlowResponse = (message, leadState) => {
  if (leadState.awaitingNeed && message.trim().length > 4) {
    return { text: LEAD_CONFIRMATION, quickReplies: QUICK_REPLIES.MENU_MAIN, leadState: 'complete' };
  }

  if (hasContact(message)) {
    return { text: CONTACT_PROMPT, quickReplies: [], leadState: 'awaitingNeed' };
  }

  const response = FLOW_RESPONSES[detectIntent(message)] || FLOW_RESPONSES.FALLBACK;
  return { ...response, leadState: response === FLOW_RESPONSES.MAIN_BOOKING ? 'awaitingContact' : undefined };
};

const getPayloadMessage = (payload) => {
  const labels = {
    MENU_MAIN: 'xin chào',
    MAIN_SERVICES: 'dịch vụ Unitrux',
    MAIN_PRICING: 'bảng giá',
    MAIN_ECOM: 'tư vấn e-commerce',
    MAIN_BOOKING: 'đặt lịch tư vấn',
    SERVICE_WEB: 'tư vấn website và Shopify',
    SERVICE_MARKETING: 'tư vấn marketing và SEO',
    SERVICE_BRANDING: 'tư vấn branding và AI',
    PRICING_WEB: 'báo giá website',
    PRICING_MARKETING: 'báo giá marketing',
    ASK_CONTACT: 'tôi muốn để lại thông tin liên hệ'
  };

  return labels[payload] || payload;
};

const readApiReply = (data) => ({
  text: data?.message || data?.reply || data?.response || data?.answer || '',
  quickReplies: data?.quickReplies || data?.quick_replies || []
});

const BotMascotIcon = ({ size = 30 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M18 49c-7 4.8-11 12.6-11 22 0 10.4 5 19.3 13.6 23.5C18.4 86 18 78.6 18 70V49Z"
      fill="#0B63FF"
    />
    <path
      d="M102 49c7 4.8 11 12.6 11 22 0 10.4-5 19.3-13.6 23.5 2.2-8.5 2.6-15.9 2.6-24.5V49Z"
      fill="#0B63FF"
    />
    <rect x="4" y="28" width="8" height="37" rx="4" fill="#0B63FF" />
    <rect x="108" y="28" width="8" height="37" rx="4" fill="#0B63FF" />
    <path
      d="M60 18c29.8 0 50 19.9 50 48.4 0 28.8-20.2 47.2-50 47.2-8.6 0-16.4-1.5-23.1-4.4l-13.7 6.9 4.6-12.1C16.5 96 10 83.2 10 66.4 10 37.9 30.2 18 60 18Z"
      fill="#0B63FF"
    />
    <rect x="24" y="39" width="72" height="50" rx="18" fill="white" />
    <path
      d="M36.5 62.8c3.5-6.8 15.8-6.8 19.3 0 1.5 2.9-.7 6.1-3.9 5.4-4.1-.9-7.2-.9-11.4 0-3.2.7-5.5-2.5-4-5.4Z"
      fill="#0B63FF"
    />
    <path
      d="M64.2 62.8c3.5-6.8 15.8-6.8 19.3 0 1.5 2.9-.8 6.1-4 5.4-4.1-.9-7.2-.9-11.3 0-3.2.7-5.5-2.5-4-5.4Z"
      fill="#0B63FF"
    />
    <path
      d="M51.4 77.8c4.7 6.3 12.5 6.3 17.2 0"
      stroke="#0B63FF"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [leadState, setLeadState] = useState({ awaitingContact: false, awaitingNeed: false });
  const sessionId = useMemo(getSessionId, []);
  const endRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'bot',
      text: FLOW_RESPONSES.MENU_MAIN.text,
      quickReplies: FLOW_RESPONSES.MENU_MAIN.quickReplies
    }
  ]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setShowNudge(false);
      return undefined;
    }

    const showTimer = setTimeout(() => setShowNudge(true), 2500);
    const interval = setInterval(() => {
      setShowNudge(true);
      setTimeout(() => setShowNudge(false), 4200);
    }, 14000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, [isOpen]);

  const addBotMessage = (reply) => {
    setMessages((current) => [
      ...current,
      {
        id: `bot-${Date.now()}`,
        role: 'bot',
        text: reply.text || FLOW_RESPONSES.FALLBACK.text,
        quickReplies: reply.quickReplies || []
      }
    ]);
  };

  const sendMessage = async (message, options = {}) => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;

    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        text: options.displayText || trimmed
      }
    ]);
    setInputValue('');
    setIsLoading(true);

    const localReply = getLocalFlowResponse(trimmed, leadState);

    try {
      const apiReply = readApiReply(await sendUnitruxChat({ sessionId, message: trimmed }));
      const finalReply = apiReply.text ? apiReply : localReply;
      addBotMessage(finalReply);
    } catch (error) {
      console.warn('Unitrux chat API fallback:', error);
      addBotMessage(localReply);
    } finally {
      if (localReply.leadState === 'awaitingNeed') {
        setLeadState({ awaitingContact: false, awaitingNeed: true });
      } else if (localReply.leadState === 'complete') {
        setLeadState({ awaitingContact: false, awaitingNeed: false });
      } else if (localReply.leadState === 'awaitingContact') {
        setLeadState({ awaitingContact: true, awaitingNeed: false });
      }

      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply) => {
    const flow = FLOW_RESPONSES[reply.payload];

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', text: reply.title }
    ]);

    if (flow) {
      addBotMessage(flow);
      setLeadState(reply.payload === 'MAIN_BOOKING' ? { awaitingContact: true, awaitingNeed: false } : leadState);
      return;
    }

    sendMessage(getPayloadMessage(reply.payload), { displayText: reply.title });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(inputValue);
  };

  const latestQuickReplies = messages[messages.length - 1]?.quickReplies || [];

  return (
    <div className={`chatbox-widget ${isOpen ? 'open' : ''}`}>
      <section className="chatbox-panel" aria-label="Unitrux chat assistant">
        <header className="chatbox-header">
          <div className="chatbox-agent">
            <div className="chatbox-avatar" aria-hidden="true">
              <BotMascotIcon size={34} />
            </div>
            <div>
              <h3>Unitrux Assistant</h3>
              <p>Sẵn sàng tư vấn</p>
            </div>
          </div>
          <button type="button" className="chatbox-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="chatbox-body">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.role}`}>
              <p>{message.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message bot">
              <p className="chatbox-typing">Unitrux đang soạn trả lời...</p>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {latestQuickReplies.length > 0 && (
          <div className="chatbox-suggestions">
            {latestQuickReplies.map((reply) => (
              <button key={reply.payload} type="button" onClick={() => handleQuickReply(reply)} disabled={isLoading}>
                {reply.title}
              </button>
            ))}
          </div>
        )}

        <form className="chatbox-composer" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Nhập tin nhắn..."
            data-placeholder-vi="Nhập tin nhắn..."
            data-placeholder-en="Type your message..."
          />
          <button type="submit" aria-label="Send message" disabled={!inputValue.trim() || isLoading}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m5 12 14-7-4 14-3-6-7-1Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </section>

      <button
        type="button"
        className="chatbox-launcher"
        onClick={() => {
          setShowNudge(false);
          setIsOpen((value) => !value);
        }}
        aria-label="Open chat"
        aria-expanded={isOpen}
      >
        {!isOpen && showNudge && <span className="chatbox-nudge">Can I help you?</span>}
        <BotMascotIcon size={38} />
      </button>
    </div>
  );
};

export default ChatBox;
