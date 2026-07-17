export const SITE_URL = 'https://unitrux.com';
export const SITE_NAME = 'Unitrux';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.jpg`;
export const SEO_LAST_MODIFIED = '2026-07-17';

export const chatboxFaqs = [
  {
    question: 'Chatbox AI có thể tích hợp với những kênh nào?',
    answer: 'Unitrux triển khai Chatbox AI trên Facebook Fanpage, Zalo OA và website, tùy theo quyền truy cập và API mà từng nền tảng cung cấp.',
    questionEn: 'Which channels can the AI chatbox connect to?',
    answerEn: 'Unitrux can deploy the AI chatbox on Facebook Fanpage, Zalo OA, and your website, subject to the access permissions and APIs available on each platform.',
  },
  {
    question: 'Chatbox AI có chuyển cuộc trò chuyện cho nhân viên được không?',
    answer: 'Có. Hệ thống có thể thu thập thông tin khách hàng, nhận diện trường hợp cần hỗ trợ chuyên sâu và chuyển cuộc trò chuyện cho nhân viên theo quy tắc đã thiết lập.',
    questionEn: 'Can the AI chatbox transfer a conversation to a human advisor?',
    answerEn: 'Yes. It can collect lead information, recognize conversations that need specialist support, and transfer them to your team using agreed escalation rules.',
  },
  {
    question: 'Chatbox AI được huấn luyện bằng dữ liệu nào?',
    answer: 'Nội dung trả lời được xây dựng từ thông tin doanh nghiệp cung cấp như sản phẩm, dịch vụ, bảng giá, chính sách và câu hỏi thường gặp, kèm các nguyên tắc giới hạn câu trả lời.',
    questionEn: 'What information is used to prepare the AI chatbox?',
    answerEn: 'Its answers are prepared from business-provided information such as products, services, pricing, policies, and FAQs, together with clear response guardrails.',
  },
  {
    question: 'Chi phí tích hợp Chatbox AI được tính như thế nào?',
    answer: 'Chi phí phụ thuộc vào số kênh cần kết nối, quy mô kho kiến thức, luồng tư vấn và các tích hợp như CRM. Unitrux sẽ khảo sát nhu cầu trước khi đề xuất phạm vi phù hợp.',
    questionEn: 'How is AI chatbox integration priced?',
    answerEn: 'Pricing depends on the number of connected channels, knowledge-base size, consultation flows, and integrations such as CRM. Unitrux scopes the requirements before proposing a suitable plan.',
  },
];

export const seoPages = {
  '/': {
    title: 'Unitrux | Thiết kế Website, Digital Marketing & Chatbox AI',
    description: 'Unitrux cung cấp thiết kế website, Digital Marketing, E-commerce và Chatbox AI tích hợp Fanpage, Zalo OA, website cho doanh nghiệp.',
    heading: 'Giải pháp tăng trưởng số cho doanh nghiệp',
    summary: 'Website, marketing, thương mại điện tử và tự động hóa AI được kết nối thành một hệ thống tăng trưởng rõ ràng.',
    type: 'WebPage',
  },
  '/about': {
    title: 'Giới thiệu Unitrux | Đối tác tăng trưởng số',
    description: 'Tìm hiểu Unitrux và đội ngũ kết nối chiến lược, thiết kế, công nghệ, marketing và vận hành cho doanh nghiệp.',
    heading: 'Về Unitrux',
    summary: 'Đội ngũ đa chuyên môn đồng hành từ chiến lược đầu tiên đến vận hành và tối ưu hằng ngày.',
    type: 'AboutPage',
  },
  '/services': {
    title: 'Dịch vụ Digital cho doanh nghiệp | Unitrux',
    description: 'Dịch vụ website, E-commerce, Digital Marketing, tự động hóa và Chatbox AI giúp doanh nghiệp thu hút khách hàng và tăng trưởng.',
    heading: 'Dịch vụ Digital của Unitrux',
    summary: 'Các giải pháp số tập trung vào trải nghiệm khách hàng, hiệu quả vận hành và kết quả kinh doanh có thể đo lường.',
    type: 'CollectionPage',
  },
  '/chatbox-ai': {
    title: 'Chatbox AI cho Fanpage, Zalo OA & Website | Unitrux',
    description: 'Tích hợp Chatbox AI chăm sóc khách hàng 24/7 trên Facebook Fanpage, Zalo OA và website; tự động tư vấn, thu lead và chuyển nhân viên.',
    heading: 'Chatbox AI tích hợp Fanpage, Zalo OA và Website',
    summary: 'Một trợ lý AI thống nhất giúp trả lời khách hàng, tư vấn sản phẩm, thu thập thông tin và chuyển hội thoại cho nhân viên đúng lúc.',
    bullets: ['Chatbot AI cho Facebook Fanpage', 'Tự động hóa Zalo OA', 'Trợ lý AI trên website', 'Thu lead và đồng bộ quy trình chăm sóc khách hàng'],
    faqs: chatboxFaqs,
    type: 'Service',
    serviceName: 'Tích hợp Chatbox AI đa kênh',
  },
  '/web-development': {
    title: 'Thiết kế Website chuẩn SEO cho doanh nghiệp | Unitrux',
    description: 'Thiết kế website tốc độ cao, chuẩn SEO, tối ưu chuyển đổi và hệ thống web tùy chỉnh phù hợp quy trình doanh nghiệp.',
    heading: 'Thiết kế và phát triển Website',
    summary: 'Website và ứng dụng web được xây dựng quanh nhu cầu khách hàng, tốc độ, SEO và hiệu quả vận hành.',
    type: 'Service',
    serviceName: 'Thiết kế và phát triển Website',
  },
  '/ecommerce': {
    title: 'Giải pháp E-commerce và Marketplace | Unitrux',
    description: 'Xây dựng cửa hàng E-commerce, tối ưu listing, vận hành marketplace và kết nối quy trình đơn hàng cho doanh nghiệp.',
    heading: 'Giải pháp E-commerce',
    summary: 'Kết nối storefront, nội dung sản phẩm, marketplace và vận hành thành một hành trình mua hàng thống nhất.',
    type: 'Service',
    serviceName: 'Giải pháp E-commerce',
  },
  '/digital-marketing': {
    title: 'Dịch vụ Digital Marketing tăng trưởng | Unitrux',
    description: 'Chiến lược SEO, quảng cáo, nội dung, social media và đo lường giúp doanh nghiệp tăng trưởng bền vững.',
    heading: 'Digital Marketing hướng đến tăng trưởng',
    summary: 'SEO, quảng cáo, nội dung và dữ liệu được kết nối quanh cùng một mục tiêu kinh doanh.',
    type: 'Service',
    serviceName: 'Digital Marketing',
  },
  '/automation': {
    title: 'Tự động hóa quy trình doanh nghiệp | Unitrux',
    description: 'Tư vấn và triển khai tự động hóa CRM, marketing, chăm sóc khách hàng và quy trình nội bộ cho doanh nghiệp.',
    heading: 'Tự động hóa quy trình doanh nghiệp',
    summary: 'Giảm thao tác lặp lại, tăng tốc phản hồi và giúp đội ngũ tập trung vào công việc tạo ra giá trị.',
    type: 'Service',
    serviceName: 'Tự động hóa doanh nghiệp',
  },
  '/photography-video': {
    title: 'Chụp ảnh & Video sản phẩm chuyên nghiệp | Unitrux',
    description: 'Dịch vụ chụp ảnh, quay video và sản xuất nội dung hình ảnh cho website, social media và sàn thương mại điện tử.',
    heading: 'Chụp ảnh và sản xuất Video',
    summary: 'Nội dung hình ảnh chất lượng cao giúp sản phẩm dễ hiểu, đáng tin và nổi bật trên các kênh bán hàng.',
    type: 'Service',
    serviceName: 'Chụp ảnh và sản xuất Video',
  },
  '/ui-ux-design': {
    title: 'Thiết kế UI/UX tối ưu chuyển đổi | Unitrux',
    description: 'Thiết kế UI/UX rõ ràng, responsive và tối ưu hành trình người dùng cho website, ứng dụng và sản phẩm số.',
    heading: 'Thiết kế UI/UX',
    summary: 'Giao diện dễ hiểu và hành trình hợp lý giúp khách hàng hành động nhanh hơn và quay lại nhiều hơn.',
    type: 'Service',
    serviceName: 'Thiết kế UI/UX',
  },
  '/packages': {
    title: 'Bảng giá và gói dịch vụ Digital | Unitrux',
    description: 'Tham khảo các gói website, marketing, E-commerce, hình ảnh, SEO và tư vấn phù hợp mục tiêu doanh nghiệp.',
    heading: 'Gói dịch vụ Unitrux',
    summary: 'Các gói triển khai linh hoạt theo phạm vi, mục tiêu và giai đoạn tăng trưởng của doanh nghiệp.',
    type: 'CollectionPage',
  },
  '/news': {
    title: 'Kiến thức Marketing, AI và E-commerce | Unitrux',
    description: 'Bài viết thực tế về Digital Marketing, SEO, Chatbox AI, tự động hóa, E-commerce và công nghệ cho doanh nghiệp.',
    heading: 'Kiến thức Digital từ Unitrux',
    summary: 'Góc nhìn và hướng dẫn thực tế giúp doanh nghiệp đưa ra quyết định tốt hơn về marketing, công nghệ và vận hành.',
    type: 'CollectionPage',
  },
  '/contact': {
    title: 'Liên hệ tư vấn Digital & Chatbox AI | Unitrux',
    description: 'Liên hệ Unitrux để được tư vấn website, Digital Marketing, E-commerce, tự động hóa và Chatbox AI cho doanh nghiệp.',
    heading: 'Liên hệ Unitrux',
    summary: 'Chia sẻ mục tiêu và thách thức của bạn để nhận đề xuất giải pháp cùng bước triển khai phù hợp.',
    type: 'ContactPage',
  },
  '/privacy-policy': {
    title: 'Chính sách bảo mật | Unitrux',
    description: 'Chính sách bảo mật và cách Unitrux thu thập, sử dụng và bảo vệ dữ liệu cá nhân.',
    heading: 'Chính sách bảo mật',
    summary: 'Thông tin về quyền riêng tư và cách dữ liệu cá nhân được xử lý tại Unitrux.',
    type: 'WebPage',
  },
  '/terms': {
    title: 'Điều khoản dịch vụ | Unitrux',
    description: 'Điều khoản áp dụng khi truy cập website và sử dụng dịch vụ của Unitrux.',
    heading: 'Điều khoản dịch vụ',
    summary: 'Các điều kiện và trách nhiệm liên quan đến việc sử dụng website và dịch vụ Unitrux.',
    type: 'WebPage',
  },
  '/delete-data': {
    title: 'Yêu cầu xóa dữ liệu | Unitrux',
    description: 'Hướng dẫn gửi yêu cầu xóa dữ liệu cá nhân khỏi hệ thống Unitrux.',
    heading: 'Yêu cầu xóa dữ liệu cá nhân',
    summary: 'Các bước liên hệ Unitrux để yêu cầu xem xét và xóa dữ liệu cá nhân.',
    type: 'WebPage',
  },
};

export const normalizePath = (pathname = '/') => {
  const cleanPath = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return cleanPath || '/';
};

export const getSeoForPath = (pathname) => {
  const path = normalizePath(pathname);
  if (seoPages[path]) return { path, ...seoPages[path] };
  if (path.startsWith('/news/')) return { path, ...seoPages['/news'], title: `Bài viết chuyên môn | ${SITE_NAME}` };
  if (path.startsWith('/services/')) {
    return {
      path,
      ...seoPages['/services'],
      title: `Chi tiết dịch vụ | ${SITE_NAME}`,
      noindex: true,
    };
  }
  return {
    path,
    title: `Không tìm thấy trang | ${SITE_NAME}`,
    description: 'Đường dẫn bạn truy cập không tồn tại hoặc đã được chuyển sang địa chỉ khác.',
    heading: 'Không tìm thấy trang',
    summary: 'Quay lại trang chủ hoặc khám phá các dịch vụ chính của Unitrux.',
    type: 'WebPage',
    noindex: true,
  };
};

export const getCanonicalUrl = (pathname) => {
  const path = normalizePath(pathname);
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
};

export const buildStructuredData = (pathname) => {
  const page = getSeoForPath(pathname);
  const canonical = getCanonicalUrl(page.path);
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: DEFAULT_OG_IMAGE,
      email: 'info@unitrux.com',
      telephone: ['+84 938 695 186', '+84 364 750 316'],
      sameAs: [
        'https://www.facebook.com/UnitruxCreativeStudio',
        'https://www.linkedin.com/company/unitrux',
        'https://www.youtube.com/@UnitruxDigitalMarketing',
        'https://www.tiktok.com/@unitruxmarketing',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@unitrux.com',
        telephone: '+84 938 695 186',
        availableLanguage: ['Vietnamese', 'English'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: ['vi', 'en'],
    },
    {
      '@type': page.type === 'Service' ? 'WebPage' : page.type,
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'vi',
    },
  ];

  if (page.type === 'Service') {
    graph.push({
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: page.serviceName,
      description: page.description,
      url: canonical,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: ['VN', 'Worldwide'],
      serviceType: page.serviceName,
    });
  }

  if (page.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: page.faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  if (page.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: page.heading, item: canonical },
      ],
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};
