import { productionHeroVideo, productionPortfolio } from '../data/productionPortfolio.js';
import { templateCount, templateGroups } from '../data/templateGroups.js';
import { packageGroups } from '../data/packagesPricing.js';
import { services } from '../data/services.js';
import {
  buildFaqNode,
  buildPortfolioNodes,
  buildServiceListNode,
  buildServiceNode,
  extractFaqFromMarkdown,
  normalizeCmsService,
  removeEmptySchemaValues,
} from './schemaFactory.js';

// Every /packages tier as a flat, machine-readable Offer — real VND prices
// sourced from packagesPricing.js (same data the pricing page itself renders),
// not duplicated as hand-typed literals.
const packagesOfferItems = packageGroups.flatMap((group) => group.tiers.map((tier) => ({
  id: `${group.to.replace('/', '')}-${tier.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-')}`,
  nameVi: `${group.titleVi} — ${tier.name}`,
  descriptionVi: tier.audienceVi,
  price: tier.price,
  priceCurrency: 'VND',
  isActive: true,
})));

export const SITE_URL = 'https://unitrux.com';
export const SITE_NAME = 'Unitrux';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.jpg`;
export const SEO_LAST_MODIFIED = '2026-08-24';

// Retired routes that now redirect to a merged/replacement page. Consumed by
// scripts/generate-seo-pages.mjs to emit a meta-refresh + canonical redirect
// stub, and by App.jsx's client-side <Navigate> for the same paths.
export const legacyRedirects = {
  '/ui-ux-design': '/web-development',
};

export const chatboxFaqs = [
  {
    question: 'Chatbot AI cho Fanpage là gì?',
    answer: 'Chatbot AI cho Fanpage là trợ lý tự động hoạt động trong Messenger, dùng dữ liệu của doanh nghiệp để trả lời câu hỏi, tư vấn sản phẩm, thu thông tin khách hàng và chuyển hội thoại cho nhân viên khi cần.',
    questionEn: 'What is an AI chatbot for Facebook Fanpage?',
    answerEn: 'An AI chatbot for Facebook Fanpage is an automated Messenger assistant that uses approved business information to answer questions, guide product discovery, collect lead details, and transfer conversations to staff when needed.',
  },
  {
    question: 'Chatbot AI có thể tích hợp với những kênh nào?',
    answer: 'Unitrux triển khai Chatbot AI trên Facebook Fanpage, Zalo OA và website, tùy theo quyền truy cập và API mà từng nền tảng cung cấp.',
    questionEn: 'Which channels can the AI chatbot connect to?',
    answerEn: 'Unitrux can deploy the AI chatbot on Facebook Fanpage, Zalo OA, and your website, subject to the access permissions and APIs available on each platform.',
  },
  {
    question: 'Chatbot AI cho Fanpage hoạt động như thế nào?',
    answer: 'Khi khách gửi tin nhắn, chatbot xác định ý định, tìm thông tin phù hợp trong kho kiến thức đã duyệt rồi phản hồi theo luồng tư vấn. Hệ thống có thể lưu thông tin lead hoặc chuyển nhân viên theo quy tắc triển khai.',
    questionEn: 'How does an AI chatbot for Facebook Fanpage work?',
    answerEn: 'When a customer sends a message, the chatbot identifies the intent, finds relevant information in the approved knowledge base, and responds through the configured consultation flow. It can capture lead details or escalate to staff according to deployment rules.',
  },
  {
    question: 'Chatbot AI có chuyển cuộc trò chuyện cho nhân viên được không?',
    answer: 'Có. Hệ thống có thể thu thập thông tin khách hàng, nhận diện trường hợp cần hỗ trợ chuyên sâu và chuyển cuộc trò chuyện cho nhân viên theo quy tắc đã thiết lập.',
    questionEn: 'Can the AI chatbot transfer a conversation to a human advisor?',
    answerEn: 'Yes. It can collect lead information, recognize conversations that need specialist support, and transfer them to your team using agreed escalation rules.',
  },
  {
    question: 'Chatbot AI có thể tự động chốt đơn không?',
    answer: 'Chatbot có thể tư vấn, thu thông tin đặt hàng và hướng khách đến bước mua phù hợp. Việc xác nhận đơn, thanh toán hoặc chốt đơn hoàn toàn phụ thuộc vào quy trình và các hệ thống bán hàng được kết nối.',
    questionEn: 'Can an AI chatbot close an order automatically?',
    answerEn: 'The chatbot can provide guidance, collect order details, and direct customers to the right purchase step. Full order confirmation, payment, or closing depends on the sales workflow and connected systems.',
  },
  {
    question: 'Chatbot AI được chuẩn bị bằng dữ liệu nào?',
    answer: 'Nội dung trả lời được xây dựng từ thông tin doanh nghiệp cung cấp như sản phẩm, dịch vụ, bảng giá, chính sách và câu hỏi thường gặp, kèm các nguyên tắc giới hạn câu trả lời.',
    questionEn: 'What information is used to prepare the AI chatbot?',
    answerEn: 'Its answers are prepared from business-provided information such as products, services, pricing, policies, and FAQs, together with clear response guardrails.',
  },
  {
    question: 'Mất bao lâu để triển khai Chatbot AI?',
    answer: 'Thời gian triển khai phụ thuộc vào số kênh, chất lượng dữ liệu, số luồng tư vấn và mức độ tích hợp. Unitrux xác định lịch triển khai sau khi khảo sát nội dung và hệ thống hiện có.',
    questionEn: 'How long does an AI chatbot implementation take?',
    answerEn: 'The timeline depends on the number of channels, data readiness, consultation flows, and integration scope. Unitrux defines the implementation schedule after reviewing the available content and systems.',
  },
  {
    question: 'Chi phí tích hợp Chatbot AI được tính như thế nào?',
    answer: 'Chi phí phụ thuộc vào số kênh cần kết nối, quy mô kho kiến thức, luồng tư vấn và các tích hợp như CRM. Unitrux sẽ khảo sát nhu cầu trước khi đề xuất phạm vi phù hợp.',
    questionEn: 'How is AI chatbot integration priced?',
    answerEn: 'Pricing depends on the number of connected channels, knowledge-base size, consultation flows, and integrations such as CRM. Unitrux scopes the requirements before proposing a suitable plan.',
  },
];

const marketingFaqs = [
  {
    question: 'Unitrux triển khai quảng cáo trên những nền tảng nào?',
    answer: 'Unitrux triển khai Google Ads, Facebook Ads, Instagram Ads, TikTok Ads, YouTube và remarketing liên kết. Tổ hợp kênh phù hợp phụ thuộc vào khách hàng, sản phẩm, chu kỳ bán hàng, khả năng sản xuất nội dung và ngân sách.',
  },
  {
    question: 'Unitrux có sản xuất video quảng cáo không?',
    answer: 'Có. Phạm vi có thể gồm định hướng sáng tạo, kịch bản, quay, dựng, phiên bản video ngắn và định dạng riêng cho Facebook, Instagram, TikTok, YouTube và landing page.',
  },
  {
    question: 'Ngân sách chạy quảng cáo có nằm trong phí dịch vụ không?',
    answer: 'Ngân sách trả cho nền tảng và phí dịch vụ thường được tách riêng để minh bạch. Báo giá sẽ ghi rõ phạm vi vận hành, sản xuất nội dung, thiết lập đo lường và ngân sách truyền thông dự kiến.',
  },
  {
    question: 'Unitrux có cam kết chắc chắn doanh thu hoặc ROAS không?',
    answer: 'Không thể bảo đảm một kết quả kinh doanh cố định trước khi thử nghiệm vì hiệu quả còn phụ thuộc sản phẩm, giá, thị trường, website, quy trình bán hàng và cạnh tranh. Unitrux cam kết triển khai, đo lường, thử nghiệm và tối ưu minh bạch.',
  },
];

const productionFaqs = [
  {
    question: 'Chưa có ý tưởng video quảng cáo thì có bắt đầu được không?',
    answer: 'Có. Doanh nghiệp chỉ cần chia sẻ sản phẩm, mục tiêu, kênh dự kiến và khoảng ngân sách. Unitrux sẽ đề xuất concept, định dạng và phạm vi sản xuất để cùng duyệt trước ngày quay.',
  },
  {
    question: 'Unitrux có thể quay tại cửa hàng hoặc nhà máy không?',
    answer: 'Có. Sau khi khảo sát ánh sáng, âm thanh, không gian và hoạt động vận hành, Unitrux sẽ đề xuất thiết bị, nhân sự và lịch quay phù hợp.',
  },
  {
    question: 'Một lần quay có thể tạo video cho nhiều nền tảng không?',
    answer: 'Có thể dùng chung nguồn quay, nhưng mỗi nền tảng cần tỷ lệ khung hình, nhịp dựng, thời lượng và vùng chữ riêng. Các phiên bản 9:16, 4:5, 1:1 hoặc 16:9 sẽ được xác định trong phạm vi bàn giao.',
  },
  {
    question: 'Chi phí sản xuất video quảng cáo được tính như thế nào?',
    answer: 'Chi phí phụ thuộc vào số ngày quay, bối cảnh, thiết bị, nhân sự, người mẫu, đạo cụ, số phiên bản và mức độ hậu kỳ. Báo giá của Unitrux sẽ tách rõ từng phạm vi.',
  },
  {
    question: 'Quay video sản phẩm cần chuẩn bị gì trước ngày quay?',
    answer: 'Nên xác định trước sản phẩm ưu tiên quay, số lượng cần có mặt trên set, kênh sẽ đăng nội dung và tỷ lệ khung hình cần dùng (ngang cho website, dọc cho TikTok/Reels). Unitrux có hướng dẫn chi tiết hơn về quy trình và checklist chuẩn bị trên trang Kiến thức Digital.',
  },
  {
    question: 'Video sản phẩm khác gì với video quảng cáo thương hiệu?',
    answer: 'Video sản phẩm tập trung trình diễn công dụng, chất liệu và cách dùng của một sản phẩm cụ thể cho website, landing page và sàn thương mại điện tử. Video quảng cáo thương hiệu kể câu chuyện, giá trị và định vị của cả thương hiệu. Hai loại có thể quay trong cùng một buổi nếu được lên kế hoạch từ bước concept.',
  },
  {
    question: 'Unitrux có quay video quảng cáo ngoài TPHCM không?',
    answer: 'Có. Ekip đặt tại TPHCM và có thể di chuyển đến các tỉnh lân cận hoặc toàn quốc tuỳ dự án — chi phí di chuyển sẽ được báo riêng.',
  },
];

export const digitalSolutionsFaqs = [
  {
    question: 'MVP là gì và có phù hợp với doanh nghiệp nhỏ không?',
    answer: 'MVP (Minimum Viable Product) là phiên bản nhỏ nhất giải quyết đúng vấn đề ưu tiên, giúp kiểm tra nhu cầu thật trước khi đầu tư một hệ thống đầy đủ. Đây là cách phù hợp với hầu hết doanh nghiệp nhỏ vì kiểm soát được chi phí và rủi ro.',
    questionEn: 'What is an MVP, and is it right for a small business?',
    answerEn: 'An MVP (Minimum Viable Product) is the smallest version that solves the priority problem, letting you test real demand before investing in a full system. It suits most small businesses because it keeps cost and risk under control.',
  },
  {
    question: 'Chi phí thiết kế ứng dụng và giải pháp số được tính như thế nào?',
    answer: 'Chi phí phụ thuộc vào số vai trò người dùng, số màn hình, mức độ tùy chỉnh, số hệ thống cần tích hợp và yêu cầu bảo mật. Unitrux khảo sát nhu cầu trước rồi mới báo giá theo phạm vi cụ thể.',
    questionEn: 'How is app and digital solution design priced?',
    answerEn: 'Cost depends on the number of user roles, screens, level of customization, integrations, and security requirements. Unitrux scopes the requirements first, then quotes against that specific scope.',
  },
  {
    question: 'Tôi có sở hữu mã nguồn sau khi hoàn thành không?',
    answer: 'Có. Mã nguồn, tài khoản và tài liệu kỹ thuật được bàn giao đầy đủ, quyền sở hữu thuộc về bạn.',
    questionEn: 'Do I own the source code once the project is finished?',
    answerEn: 'Yes. Source code, accounts and technical documentation are fully handed over, and ownership belongs to you.',
  },
  {
    question: 'Mất bao lâu để có một MVP hoạt động?',
    answer: 'Thường khoảng 4–8 tuần tùy phạm vi, tính từ lúc chốt yêu cầu đến khi có phiên bản hoạt động thực tế để thử nghiệm.',
    questionEn: 'How long does it take to get a working MVP?',
    answerEn: 'Usually 4–8 weeks depending on scope, from finalized requirements to a working version ready for real-world testing.',
  },
];

export const fanpageFaqs = [
  {
    question: 'Xây dựng Fanpage khác gì với chạy quảng cáo Facebook?',
    answer: 'Xây dựng Fanpage là hoàn thiện nền tảng: hình ảnh, thông tin và cấu trúc nội dung để trang đủ uy tín trước khi có khách truy cập. Quảng cáo là bước đưa người xem đến trang đó — nếu trang chưa hoàn thiện, quảng cáo sẽ kém hiệu quả hơn.',
    questionEn: 'How is Fanpage setup different from running Facebook ads?',
    answerEn: 'Fanpage setup builds the foundation — visuals, information and content structure — so the page looks trustworthy before any visitor arrives. Advertising is what brings people to that page; if the page isn\'t ready, the ads underperform.',
  },
  {
    question: 'Sau khi hoàn thiện, tôi có tự quản lý được Fanpage không?',
    answer: 'Có. Unitrux bàn giao kèm hướng dẫn ngắn gọn để đội ngũ của bạn tự cập nhật trang mà không cần hỗ trợ liên tục từ bên ngoài.',
    questionEn: 'Can I manage the Fanpage myself after setup?',
    answerEn: 'Yes. Unitrux hands over a short guide so your team can keep the page updated without needing ongoing outside support.',
  },
  {
    question: 'Dịch vụ có bao gồm sản xuất nội dung đăng bài hằng ngày không?',
    answer: 'Xây dựng Fanpage tập trung vào nền tảng (hình ảnh, thông tin, cấu trúc). Sản xuất nội dung đăng bài định kỳ thuộc dịch vụ Sáng tạo nội dung đa kênh, có thể kết hợp cùng lúc nếu cần.',
    questionEn: 'Does this include producing daily posts?',
    answerEn: 'Fanpage setup focuses on the foundation (visuals, information, structure). Ongoing post production is part of the Multi-channel content creation service, and can be combined if needed.',
  },
  {
    question: 'Mất bao lâu để hoàn thiện một Fanpage?',
    answer: 'Thường 1–2 tuần tùy khối lượng thông tin cần rà soát và số nội dung cũ cần dọn dẹp.',
    questionEn: 'How long does a Fanpage setup take?',
    answerEn: 'Usually 1–2 weeks, depending on how much information needs review and how much old content needs cleanup.',
  },
];

export const contentCreationFaqs = [
  {
    question: 'Có cần đăng bài mỗi ngày không?',
    answer: 'Không có tần suất chuẩn cho mọi doanh nghiệp. Tần suất nên dựa trên nguồn lực, chất lượng nội dung và khả năng đo lường. Đăng ít nhưng có mục tiêu rõ thường hiệu quả hơn đăng nhiều nhưng rời rạc.',
    questionEn: 'Do we need to post every day?',
    answerEn: 'There\'s no standard frequency that fits every business. Frequency should be based on resources, content quality and measurement capability. Posting less often but with clear purpose usually outperforms posting a lot but disconnectedly.',
  },
  {
    question: 'Nội dung có được viết riêng cho từng kênh không hay dùng chung?',
    answer: 'Nội dung dựa trên cùng một thông điệp gốc, nhưng được điều chỉnh về độ dài, định dạng và cách trình bày theo hành vi người dùng của từng nền tảng — không copy nguyên văn giữa các kênh.',
    questionEn: 'Is content written separately for each channel, or reused as-is?',
    answerEn: 'Content is built from the same core message, but adapted in length, format and presentation to match user behavior on each platform — not copy-pasted across channels.',
  },
  {
    question: 'Làm sao đo được hiệu quả của nội dung?',
    answer: 'Đo theo 3 lớp: chất lượng triển khai (đúng hạn, đúng CTA), hành vi người dùng (lượt xem, lượt nhấp, form gửi) và kết quả kinh doanh (lead, cuộc hẹn, chuyển đổi) — không chỉ dựa vào lượt xem hay lượt thích.',
    questionEn: 'How is content performance measured?',
    answerEn: 'Across three layers: execution quality (on-time, right CTA), user behavior (views, clicks, form submissions) and business outcomes (leads, bookings, conversions) — not just views or likes.',
  },
  {
    question: 'Dịch vụ có bao gồm cả thiết kế hình ảnh/video không?',
    answer: 'Có — nội dung được sản xuất kèm hình ảnh, video ngắn hoặc carousel phù hợp từng định dạng. Video quảng cáo dài hơn hoặc chụp ảnh sản phẩm chuyên sâu thuộc dịch vụ riêng, có thể kết hợp khi cần.',
    questionEn: 'Does this include image/video design?',
    answerEn: 'Yes — content is produced with matching images, short videos or carousels per format. Longer advertising video or dedicated product photography sit under their own services and can be combined when needed.',
  },
];

export const seoServicesFaqs = [
  {
    question: 'SEO, AEO và GEO khác nhau như thế nào?',
    answer: 'SEO giúp trang xếp hạng trong kết quả tìm kiếm truyền thống. AEO tối ưu để nội dung được trích vào featured snippet và "Mọi người cũng hỏi". GEO giúp công cụ AI (ChatGPT, Google AI Overviews...) trích dẫn thương hiệu khi trả lời câu hỏi. Cả ba cùng dựa trên một nền tảng: nội dung chính xác và dữ liệu có cấu trúc thật.',
    questionEn: 'What\'s the difference between SEO, AEO and GEO?',
    answerEn: 'SEO helps a page rank in classic search results. AEO structures content to get pulled into featured snippets and "People also ask". GEO helps AI tools (ChatGPT, Google AI Overviews...) cite your brand when answering a question. All three rest on the same foundation: accurate content and real structured data.',
  },
  {
    question: 'Bao lâu thì thấy kết quả SEO?',
    answer: 'Các vấn đề kỹ thuật thường khắc phục được ngay, nhưng thứ hạng và lượng truy cập cần thời gian dài hơn — thường vài tháng — và phụ thuộc vào mức độ cạnh tranh của từ khóa, tuổi domain và tần suất cập nhật nội dung.',
    questionEn: 'How soon will I see SEO results?',
    answerEn: 'Technical issues can usually be fixed right away, but rankings and traffic take longer — typically a few months — and depend on keyword competitiveness, domain age and how often content gets updated.',
  },
  {
    question: 'Có cam kết lên top Google không?',
    answer: 'Không đơn vị nào có thể cam kết chắc chắn một vị trí cụ thể trên Google, vì thứ hạng còn phụ thuộc thuật toán, đối thủ và hành vi tìm kiếm thực tế. Unitrux cam kết về quy trình, tính minh bạch trong báo cáo và việc tối ưu đúng chuẩn kỹ thuật.',
    questionEn: 'Do you guarantee a #1 Google ranking?',
    answerEn: 'No agency can guarantee a specific ranking, since it depends on Google\'s algorithm, competitors, and real search behavior. Unitrux commits to a transparent process, honest reporting, and technically correct optimization.',
  },
  {
    question: 'Dịch vụ SEO có bao gồm việc viết lại nội dung website không?',
    answer: 'Có, trong phạm vi tối ưu on-page. Nếu cần xây nội dung mới quy mô lớn (bài viết, trang dịch vụ mới), phạm vi này thường kết hợp với dịch vụ Sáng tạo nội dung đa kênh.',
    questionEn: 'Does this include rewriting website content?',
    answerEn: 'Yes, within the scope of on-page optimization. Larger new-content needs (articles, new service pages) are usually combined with the Multi-channel content creation service.',
  },
];

export const productPhotographyFaqs = [
  {
    question: 'Có thể chụp tại cửa hàng/salon của tôi không hay phải mang sản phẩm đến studio?',
    answer: 'Cả hai đều được. Sau khi khảo sát ánh sáng và không gian thực tế, Unitrux sẽ đề xuất phương án phù hợp — chụp tại chỗ hoặc mang về studio.',
    questionEn: 'Can you shoot at my store/salon, or do I need to bring products to a studio?',
    answerEn: 'Either works. After surveying the actual lighting and space, Unitrux will recommend the right option — on-location or in-studio.',
  },
  {
    question: 'Unitrux nhận chụp ảnh sản phẩm ở khu vực nào?',
    answer: 'Studio và ekip chụp ảnh của Unitrux đặt tại TP.HCM. Có thể chụp tại studio, tại cửa hàng hoặc showroom của bạn trong khu vực TP.HCM, hoặc di chuyển đến các tỉnh lân cận tùy dự án — chi phí di chuyển được báo riêng.',
    questionEn: 'Which areas does Unitrux cover for product photography?',
    answerEn: 'Unitrux\'s photography studio and crew are based in Ho Chi Minh City. Shoots can happen in the studio, at your store or showroom within HCMC, or on location in nearby provinces depending on the project — travel costs are quoted separately.',
  },
  {
    question: 'Một buổi chụp có thể dùng cho cả website lẫn sàn TMĐT không?',
    answer: 'Có thể dùng chung nguồn ảnh gốc, nhưng mỗi kênh cần kích thước và tỷ lệ khung hình riêng — các phiên bản này được xác định rõ trong phạm vi bàn giao.',
    questionEn: 'Can one shoot cover both website and marketplace needs?',
    answerEn: 'The source images can be shared, but each channel needs its own sizing and aspect ratio — these versions are defined clearly in the delivery scope.',
  },
  {
    question: 'Chi phí chụp ảnh sản phẩm được tính như thế nào?',
    answer: 'Chi phí phụ thuộc vào số sản phẩm/không gian cần chụp, địa điểm, thiết bị, số buổi chụp và mức độ hậu kỳ. Báo giá của Unitrux sẽ tách rõ từng phạm vi.',
    questionEn: 'How is product photography priced?',
    answerEn: 'Cost depends on the number of products/spaces to shoot, location, equipment, shoot days and level of post-production. Unitrux\'s quote breaks each scope down clearly.',
  },
  {
    question: 'Có làm luôn video ngắn trong buổi chụp không?',
    answer: 'Dịch vụ này tập trung vào ảnh tĩnh. Nếu cần video quảng cáo hoặc Reels/TikTok, đây thuộc dịch vụ Sản xuất Video quảng cáo, có thể kết hợp cùng lịch quay để tối ưu chi phí.',
    questionEn: 'Can you also shoot a short video during the same session?',
    answerEn: 'This service focuses on still photography. Advertising video or Reels/TikTok content falls under the Advertising Video Production service, which can be scheduled alongside the photo shoot to save cost.',
  },
];

export const webDevelopmentFaqs = [
  {
    question: 'Trang này có gì khác với dịch vụ SEO/AEO/GEO riêng?',
    answer: 'Thiết kế website là xây một website mới với nền tảng UI/UX và SEO/AEO/GEO ngay từ đầu. Dịch vụ SEO/AEO/GEO riêng là tối ưu liên tục cho một website đang hoạt động, bất kể ai đã thiết kế ra nó.',
    questionEn: 'How is this different from the standalone SEO/AEO/GEO service?',
    answerEn: 'Website design builds a new website with UI/UX and SEO/AEO/GEO foundations from day one. The standalone SEO/AEO/GEO service is ongoing optimization for a website that\'s already live, regardless of who built it.',
  },
  {
    question: 'Website mới có tự động chuẩn SEO không hay cần làm thêm?',
    answer: 'Nền tảng SEO on-page (cấu trúc heading, metadata, dữ liệu có cấu trúc, tốc độ tải) được xây sẵn trong quá trình thiết kế. Việc tối ưu liên tục theo từ khóa và cạnh tranh thị trường vẫn cần một quy trình riêng sau khi ra mắt.',
    questionEn: 'Is the new website automatically SEO-ready, or is extra work needed?',
    answerEn: 'The on-page SEO foundation (heading structure, metadata, structured data, load speed) is built in during design. Ongoing keyword and competitive optimization still needs its own process after launch.',
  },
  {
    question: 'Bao lâu thì website hoàn thành?',
    answer: 'Gói cơ bản thường 3–5 tuần; dự án nhiều tính năng hoặc cần tích hợp thêm 6–8 tuần. Lịch trình được chốt ngay từ đầu sau khi khảo sát.',
    questionEn: 'How long does the website take to complete?',
    answerEn: 'Basic packages usually take 3–5 weeks; projects with more features or integrations take 6–8 weeks. The schedule is finalized upfront after discovery.',
  },
  {
    question: 'Tôi có thể tự cập nhật nội dung sau khi bàn giao không?',
    answer: 'Có. Bạn sẽ có hướng dẫn ngắn để thêm/sửa nội dung; nếu muốn, có thể chọn gói bảo trì để Unitrux hỗ trợ cập nhật liên tục.',
    questionEn: 'Can I update content myself after handover?',
    answerEn: 'Yes. You\'ll get a short guide to add/edit content yourself; a maintenance package is also available if you\'d rather have Unitrux handle ongoing updates.',
  },
];

export const mediaPricingFaqs = [
  {
    question: 'Giá trên đã bao gồm VAT chưa?',
    answer: 'Chưa. Giá trên chưa bao gồm VAT (nếu áp dụng) — thuế và chứng từ sẽ được thể hiện rõ theo báo giá và hợp đồng chính thức.',
    questionEn: 'Do these prices include VAT?',
    answerEn: 'No. The prices above exclude VAT (where applicable) — tax and invoicing are stated clearly in the official quote and contract.',
  },
  {
    question: 'Có thể kết hợp nhiều gói trong cùng một buổi quay không?',
    answer: 'Có. Nhóm Combo Media (Photo + 3 Reels, Campaign Media Day) được thiết kế riêng để gộp ảnh và video trong cùng một buổi — tiết kiệm thời gian hơn đặt từng gói riêng lẻ.',
    questionEn: 'Can multiple packages be combined in one shoot?',
    answerEn: 'Yes. The Combo Media group (Photo + 3 Reels, Campaign Media Day) is built specifically to bundle photo and video in one session — faster than booking each separately.',
  },
  {
    question: 'Chưa biết chọn gói nào thì sao?',
    answer: 'Chia sẻ sản phẩm, không gian hoặc mục tiêu quay dựng — Unitrux sẽ đề xuất gói và concept phù hợp trước khi báo giá chính thức.',
    questionEn: "What if I don't know which package to pick?",
    answerEn: 'Share your product, space, or shoot goal — Unitrux will recommend a matching package and concept before the official quote.',
  },
  {
    question: 'Cần thêm giờ quay hoặc hậu kỳ ngoài gói thì tính thế nào?',
    answer: 'Xem bảng "Add-on Media" trên trang — mỗi hạng mục phát sinh (giờ quay thêm, hậu kỳ, tỷ lệ khung hình, vòng chỉnh sửa...) đều có giá tham khảo riêng.',
    questionEn: 'How is extra time or post-production beyond a package priced?',
    answerEn: 'See the "Media add-ons" table on the page — each extra item (additional hours, editing, aspect ratios, revision rounds...) has its own reference price.',
  },
];

// Single source for /media-pricing's 8 category starting prices — reused for
// both the JSON-LD OfferCatalog and the prerendered <dl> facts, so raw
// crawlable HTML (GPTBot, Perplexity...) states actual VND figures, not just
// FAQ prose without numbers.
const mediaPricingOfferCatalog = [
  { name: 'Chụp ảnh sản phẩm — Từ 1.200.000đ/buổi' },
  { name: 'Food & Beverage — Từ 2.000.000đ/buổi' },
  { name: 'Không gian / Nội thất / Dịch vụ — Từ 2.000.000đ/buổi' },
  { name: 'Brand / Nhân sự — Từ 2.800.000đ/buổi' },
  { name: 'Video short-form — Từ 2.000.000đ/video' },
  { name: 'Video quảng cáo — Từ 5.500.000đ/video' },
  { name: 'Combo Media — Từ 7.100.000đ/gói' },
  { name: 'Setup Livestream / Studio — Từ 5.500.000đ/dự án' },
];

export const seoPages = {
  '/': {
    title: 'Unitrux | Thiết kế Website, Digital Marketing & Chatbox AI',
    description: 'Unitrux chụp ảnh sản phẩm, sản xuất video quảng cáo và thiết kế website chuẩn SEO/AEO/GEO, Chatbot AI, Fanpage, quảng cáo đa nền tảng cho doanh nghiệp.',
    heading: 'Giải pháp tăng trưởng số cho doanh nghiệp',
    summary: 'Chụp ảnh sản phẩm, sản xuất video quảng cáo, website, marketing, chatbot AI và tự động hóa được kết nối thành một hệ thống tăng trưởng rõ ràng.',
    bullets: services.map((service) => service.titleVi),
    faqs: [
      {
        question: 'Unitrux cung cấp những dịch vụ gì?',
        answer: '10 dịch vụ kết nối thành một hệ thống tăng trưởng: ứng dụng & giải pháp số, Fanpage, Chatbot AI, nội dung đa kênh, quảng cáo đa nền tảng, Marketing Automation, SEO/AEO/GEO, sản xuất video quảng cáo, chụp ảnh sản phẩm và thiết kế website.',
      },
      {
        question: 'Unitrux có trụ sở ở đâu?',
        answer: 'Unitrux đặt tại Thành phố Hồ Chí Minh và phục vụ khách hàng trên toàn Việt Nam.',
      },
    ],
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
    title: 'Dịch vụ Website, Fanpage, SEO/AEO/GEO, AI & Automation | Unitrux',
    description: '10 dịch vụ của Unitrux: ứng dụng & giải pháp số, Fanpage, Chatbot AI, nội dung đa kênh, quảng cáo, Marketing Automation, SEO/AEO/GEO, video, chụp ảnh và thiết kế website.',
    heading: 'Hệ thống dịch vụ tăng trưởng số của Unitrux',
    summary: '10 năng lực được kết nối quanh hành trình thu hút nhu cầu, tạo trải nghiệm, bắt đầu hội thoại và tối ưu vận hành.',
    bullets: [
      'Thiết kế ứng dụng và giải pháp số',
      'Xây dựng Fanpage chuyên nghiệp',
      'Chatbot AI chăm sóc khách hàng',
      'Sáng tạo nội dung đa kênh',
      'Quảng cáo đa nền tảng',
      'Marketing Automation',
      'Dịch vụ SEO/AEO/GEO',
      'Sản xuất video quảng cáo',
      'Chụp ảnh sản phẩm và thương hiệu',
      'Thiết kế website chuẩn UI/UX và SEO/AEO/GEO',
    ],
    type: 'CollectionPage',
    serviceList: packageGroups.map((group) => ({ name: group.titleVi, url: group.to })),
  },
  '/templates': {
    title: `Thư viện ${templateCount} mẫu website thật | Unitrux`,
    description: `Xem thử ${templateCount} mẫu website thật của Unitrux — salon & làm đẹp, quán cà phê, bất động sản và thương mại điện tử — bản xem trực tiếp, không phải ảnh dựng.`,
    heading: `${templateCount} mẫu website thật, sẵn sàng tinh chỉnh theo thương hiệu của bạn`,
    summary: 'Mỗi mẫu là một website thật đang hoạt động — không phải ảnh chụp. Xem thử rồi cho chúng tôi biết hướng nào phù hợp để tinh chỉnh theo đúng thương hiệu.',
    bullets: templateGroups.map((group) => group.labelVi),
    type: 'CollectionPage',
  },
  '/chatbox-ai': {
    title: 'Chatbot AI cho Fanpage, Zalo OA & Website | Unitrux',
    description: 'Tích hợp Chatbot AI cho Facebook Fanpage, Zalo OA và website để tự động trả lời, tư vấn, thu lead và chuyển hội thoại cho nhân viên.',
    heading: 'Chatbot AI cho Fanpage, Zalo OA và Website',
    summary: 'Chatbot AI là trợ lý tự động dùng dữ liệu doanh nghiệp để trả lời khách hàng, tư vấn sản phẩm, thu thông tin lead và chuyển nhân viên đúng lúc.',
    bullets: ['Chatbot AI cho Facebook Fanpage', 'Tự động hóa Zalo OA', 'Trợ lý AI trên website', 'Thu lead và đồng bộ quy trình chăm sóc khách hàng'],
    facts: [
      ['Dịch vụ', 'Tích hợp Chatbot AI đa kênh'],
      ['Kênh hỗ trợ', 'Facebook Fanpage, Zalo OA và website'],
      ['Chức năng chính', 'Tự động trả lời, tư vấn, thu lead và chuyển nhân viên'],
      ['Dữ liệu chuẩn bị', 'Sản phẩm, dịch vụ, bảng giá, chính sách và câu hỏi thường gặp'],
      ['Đơn vị triển khai', 'Unitrux'],
    ],
    faqs: chatboxFaqs,
    type: 'Service',
    serviceName: 'Tích hợp Chatbot AI đa kênh',
  },
  '/web-development': {
    title: 'Thiết kế Website chuẩn UI/UX và SEO/AEO/GEO | Unitrux',
    description: 'Thiết kế website tốc độ cao, chuẩn UI/UX, có sẵn nền tảng SEO/AEO/GEO và tối ưu chuyển đổi cho doanh nghiệp.',
    heading: 'Thiết kế website chuẩn UI/UX và SEO/AEO/GEO',
    summary: 'Giao diện và nền tảng SEO/AEO/GEO được thiết kế cùng lúc — kiến trúc thông tin rõ ràng, tốc độ tải nhanh và cấu trúc nội dung mà công cụ tìm kiếm lẫn AI có thể đọc được ngay từ đầu.',
    faqs: webDevelopmentFaqs,
    type: 'Service',
    serviceName: 'Thiết kế website chuẩn UI/UX và SEO/AEO/GEO',
    schema: {
      serviceType: 'Thiết kế website và UI/UX',
      categories: ['Thiết kế website', 'UI/UX', 'SEO on-page', 'Corporate website', 'Landing page', 'Web app'],
      areaServed: ['Việt Nam', 'Thành phố Hồ Chí Minh'],
      audienceType: 'Doanh nghiệp cần website mới hoặc tái thiết kế với nền tảng SEO/AEO/GEO ngay từ đầu',
      offerCatalogName: 'Hạng mục thiết kế website',
      offerCatalog: [
        { name: 'Kiến trúc thông tin và UX' },
        { name: 'Thiết kế UI và hệ thống giao diện' },
        { name: 'Nền tảng SEO/AEO/GEO on-page' },
        { name: 'Tối ưu tốc độ và Core Web Vitals' },
      ],
    },
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
    title: 'Dịch vụ chạy quảng cáo đa nền tảng | Unitrux',
    description: 'Unitrux triển khai Google Ads, Facebook Ads, Instagram Ads, TikTok Ads, sản xuất video, landing page và đo lường chuyển đổi cho doanh nghiệp.',
    heading: 'Quảng cáo đa nền tảng cho doanh nghiệp',
    summary: 'Google, Meta và TikTok Ads được kết nối với nội dung, video, landing page, chat và đo lường thành một hệ thống thu hút khách hàng.',
    faqs: marketingFaqs,
    type: 'Service',
    serviceName: 'Dịch vụ chạy quảng cáo đa nền tảng',
    schema: {
      serviceType: 'Digital Marketing',
      categories: ['Quảng cáo đa nền tảng', 'Facebook Ads', 'Instagram Ads', 'Google Ads', 'TikTok Ads', 'Lead Generation'],
      areaServed: ['Việt Nam', 'Thành phố Hồ Chí Minh'],
      audienceType: 'Doanh nghiệp cần quảng cáo, thu lead và phát triển doanh thu online',
      offerCatalogName: 'Hạng mục Digital Marketing',
      offerCatalog: [
        { name: 'Quảng cáo đa nền tảng' },
        { name: 'Quảng cáo thu lead' },
        { name: 'Sáng tạo nội dung quảng cáo' },
        { name: 'Landing page và đo lường chuyển đổi' },
      ],
    },
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
    title: 'Dịch vụ Quay Video Quảng Cáo TPHCM | Unitrux',
    description: 'Sản xuất video quảng cáo và quay video sản phẩm tại TPHCM — concept, quay, dựng, bàn giao đa định dạng cho Facebook, TikTok, YouTube, website và sàn thương mại điện tử.',
    ogImage: `${SITE_URL}${productionHeroVideo.thumbnail}`,
    heading: 'Sản xuất Video quảng cáo TPHCM',
    summary: 'Ekip và studio đặt tại TPHCM. Từ concept, quay dựng đến bàn giao đa định dạng cho quảng cáo, mạng xã hội, website và thương mại điện tử — có thể di chuyển đến các tỉnh lân cận.',
    faqs: productionFaqs,
    type: 'Service',
    serviceName: 'Sản xuất Video quảng cáo',
    portfolio: productionPortfolio,
    schema: {
      serviceType: 'Sản xuất video quảng cáo',
      categories: ['Video quảng cáo', 'Video sản phẩm', 'Video social', 'Corporate film'],
      areaServed: ['Việt Nam', 'Thành phố Hồ Chí Minh'],
      audienceType: 'Doanh nghiệp cần nội dung video cho quảng cáo, website hoặc E-commerce',
      offerCatalogName: 'Hạng mục sản xuất video',
      offerCatalog: [
        { name: 'Video quảng cáo ngắn' },
        { name: 'Video sản phẩm và E-commerce' },
        { name: 'Video thương hiệu và doanh nghiệp' },
      ],
    },
  },
  '/digital-solutions': {
    title: 'Thiết kế ứng dụng và giải pháp số | Unitrux',
    description: 'Tư vấn và phát triển ứng dụng, hệ thống đặt lịch, quản lý dữ liệu và giải pháp số phù hợp với hoạt động doanh nghiệp.',
    heading: 'Thiết kế ứng dụng và giải pháp số',
    summary: 'Unitrux thiết kế đúng hệ thống nhỏ nhất giải quyết được vấn đề vận hành thật, bắt đầu từ MVP và mở rộng khi dữ liệu thực tế chứng minh nhu cầu.',
    faqs: digitalSolutionsFaqs,
    type: 'Service',
    serviceName: 'Thiết kế ứng dụng và giải pháp số',
    schema: {
      serviceType: 'Thiết kế ứng dụng và giải pháp số',
      categories: ['Ứng dụng đặt lịch', 'Ứng dụng quản lý dữ liệu', 'MVP', 'Web app nội bộ'],
      areaServed: ['Việt Nam', 'Thành phố Hồ Chí Minh'],
      audienceType: 'Doanh nghiệp cần hệ thống đặt lịch, quản lý dữ liệu hoặc MVP để kiểm tra ý tưởng',
      offerCatalogName: 'Hạng mục giải pháp số',
      offerCatalog: [
        { name: 'Hệ thống đặt lịch' },
        { name: 'Ứng dụng quản lý khách hàng và dữ liệu' },
        { name: 'Công cụ quản lý công việc nội bộ' },
        { name: 'MVP cho ý tưởng mới' },
      ],
    },
  },
  '/fanpage-management': {
    title: 'Xây dựng Fanpage chuyên nghiệp | Unitrux',
    description: 'Hoàn thiện hình ảnh, thông tin, nội dung và cấu trúc Fanpage giúp doanh nghiệp tăng nhận diện, uy tín và thu hút khách hàng.',
    heading: 'Xây dựng Fanpage chuyên nghiệp',
    summary: 'Unitrux xây lại cấu trúc trang, thông tin và nền tảng nội dung để khách truy cập đủ tin tưởng để nhắn hỏi.',
    faqs: fanpageFaqs,
    type: 'Service',
    serviceName: 'Xây dựng Fanpage chuyên nghiệp',
    schema: {
      serviceType: 'Xây dựng Fanpage',
      categories: ['Facebook Fanpage', 'Thiết lập trang doanh nghiệp', 'Content pillar'],
      areaServed: ['Việt Nam', 'Thành phố Hồ Chí Minh'],
      audienceType: 'Doanh nghiệp cần hoàn thiện Fanpage trước khi chạy quảng cáo hoặc chăm sóc khách hàng',
      offerCatalogName: 'Hạng mục xây dựng Fanpage',
      offerCatalog: [
        { name: 'Thiết lập hình ảnh & bộ nhận diện trang' },
        { name: 'Rà soát thông tin doanh nghiệp' },
        { name: 'Cấu trúc nội dung & bài ghim' },
      ],
    },
  },
  '/content-creation': {
    title: 'Sáng tạo nội dung đa kênh | Unitrux',
    description: 'Xây dựng nội dung phù hợp cho Facebook, Website, Zalo, TikTok, Instagram và LinkedIn theo định hướng thương hiệu.',
    heading: 'Sáng tạo nội dung đa kênh',
    summary: 'Unitrux xây một hệ thống thông điệp thống nhất, rồi điều chỉnh theo định dạng và hành vi người dùng của từng nền tảng.',
    faqs: contentCreationFaqs,
    type: 'Service',
    serviceName: 'Sáng tạo nội dung đa kênh',
    schema: {
      serviceType: 'Sáng tạo nội dung đa kênh',
      categories: ['Content pillar', 'Content calendar', 'Facebook', 'TikTok', 'Instagram', 'LinkedIn'],
      areaServed: ['Việt Nam', 'Thành phố Hồ Chí Minh'],
      audienceType: 'Doanh nghiệp cần hệ thống nội dung nhất quán trên nhiều kênh',
      offerCatalogName: 'Hạng mục sáng tạo nội dung',
      offerCatalog: [
        { name: 'Hệ thống thông điệp & content pillar' },
        { name: 'Content calendar & content map' },
        { name: 'Sản xuất nội dung đa định dạng' },
      ],
    },
  },
  '/seo-services': {
    title: 'Dịch vụ SEO/AEO/GEO cho thương hiệu và website | Unitrux',
    description: 'Nghiên cứu từ khóa, tối ưu nội dung và kỹ thuật website nhằm tăng khả năng xuất hiện trên Google, AI và câu trả lời của AI.',
    heading: 'Dịch vụ SEO/AEO/GEO cho thương hiệu và website',
    summary: 'Unitrux nghiên cứu từ khóa, cấu trúc nội dung và xử lý nền tảng kỹ thuật để thương hiệu bạn xuất hiện đúng trên cả kết quả tìm kiếm, featured snippet và câu trả lời của AI.',
    faqs: seoServicesFaqs,
    type: 'Service',
    serviceName: 'Dịch vụ SEO/AEO/GEO',
    schema: {
      serviceType: 'SEO, AEO và GEO',
      categories: ['SEO', 'AEO', 'GEO', 'Technical SEO', 'Content optimization'],
      areaServed: ['Việt Nam', 'Thành phố Hồ Chí Minh'],
      audienceType: 'Doanh nghiệp cần tăng khả năng xuất hiện trên Google và công cụ AI',
      offerCatalogName: 'Hạng mục SEO/AEO/GEO',
      offerCatalog: [
        { name: 'Nghiên cứu từ khóa & search intent' },
        { name: 'Tối ưu on-page & nội dung' },
        { name: 'Audit kỹ thuật SEO' },
        { name: 'Cấu trúc & schema cho AEO/GEO' },
      ],
    },
  },
  '/product-photography': {
    title: 'Chụp ảnh sản phẩm và thương hiệu TP.HCM | Unitrux',
    description: 'Dịch vụ chụp ảnh sản phẩm, ảnh không gian và hình ảnh thương hiệu tại TP.HCM cho website, sàn thương mại điện tử, mạng xã hội và truyền thông thương hiệu — theo một tiêu chuẩn hình ảnh nhất quán.',
    heading: 'Chụp ảnh sản phẩm và thương hiệu',
    summary: 'Ảnh sản phẩm, ảnh không gian và hình ảnh thương hiệu cho website, sàn thương mại điện tử và mạng xã hội — chụp theo một tiêu chuẩn hình ảnh nhất quán.',
    faqs: productPhotographyFaqs,
    type: 'Service',
    serviceName: 'Chụp ảnh sản phẩm và thương hiệu',
    schema: {
      serviceType: 'Chụp ảnh sản phẩm và thương hiệu',
      categories: ['Chụp ảnh sản phẩm', 'Chụp ảnh không gian', 'Hình ảnh thương hiệu'],
      areaServed: ['Việt Nam', 'Thành phố Hồ Chí Minh'],
      audienceType: 'Doanh nghiệp cần hình ảnh sản phẩm và thương hiệu cho website, sàn TMĐT hoặc mạng xã hội',
      offerCatalogName: 'Hạng mục chụp ảnh',
      offerCatalog: [
        { name: 'Chụp ảnh sản phẩm' },
        { name: 'Chụp ảnh không gian' },
        { name: 'Hình ảnh thương hiệu & lifestyle' },
      ],
    },
  },
  '/packages': {
    title: 'Bảng giá dịch vụ Unitrux | 10 dịch vụ, 3 mức giá mỗi dịch vụ',
    description: 'Bảng giá tham khảo cho 10 dịch vụ của Unitrux: website, marketing, chatbot AI, automation, SEO/AEO/GEO, video và quay chụp — mỗi dịch vụ 3 mức giá rõ ràng.',
    heading: 'Bảng giá dịch vụ Unitrux',
    summary: 'Mỗi dịch vụ có 3 mức giá tham khảo rõ ràng — từ gói khởi điểm đến gói mở rộng — cùng add-on chi phí phát sinh nếu cần.',
    type: 'Service',
    serviceName: 'Bảng giá dịch vụ Unitrux',
    schema: {
      serviceType: 'Bảng giá dịch vụ Unitrux',
      categories: packageGroups.map((group) => group.titleVi),
      areaServed: ['Việt Nam'],
      audienceType: 'Doanh nghiệp cần tham khảo giá cho 10 dịch vụ tăng trưởng số trước khi liên hệ',
      offerCatalogName: 'Bảng giá dịch vụ Unitrux',
      packages: packagesOfferItems,
    },
  },
  '/media-pricing': {
    title: 'Bảng giá quay chụp & sản xuất Media | Unitrux',
    description: 'Bảng giá chi tiết quay chụp sản phẩm, không gian, thương hiệu và sản xuất video ngắn — 17 gói theo 8 nhóm dịch vụ, giá tham khảo rõ ràng.',
    heading: 'Bảng giá quay chụp & sản xuất Media',
    summary: 'Giá tham khảo cho chụp ảnh sản phẩm, F&B, không gian, brand, video short-form, video quảng cáo, combo media và setup livestream.',
    type: 'Service',
    serviceName: 'Bảng giá quay chụp & sản xuất Media',
    faqs: mediaPricingFaqs,
    // Rendered into both the JSON-LD OfferCatalog and a plain <dl> of facts in
    // the prerendered static HTML, so non-JS crawlers (GPTBot, Perplexity...)
    // can read real starting prices, not just the FAQ prose.
    facts: mediaPricingOfferCatalog.map(({ name }) => name.split(' — ')),
    schema: {
      serviceType: 'Bảng giá quay chụp & sản xuất Media',
      categories: ['Chụp ảnh sản phẩm', 'Chụp ảnh không gian', 'Video short-form', 'Video quảng cáo', 'Combo Media', 'Setup livestream'],
      areaServed: ['Việt Nam', 'Thành phố Hồ Chí Minh'],
      audienceType: 'Doanh nghiệp cần tham khảo giá quay chụp sản phẩm, thương hiệu hoặc sản xuất video trước khi liên hệ',
      offerCatalogName: 'Bảng giá quay chụp & Media',
      offerCatalog: mediaPricingOfferCatalog.map(({ name }) => ({ name })),
    },
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
  '/content-standards': {
    title: 'Tiêu chuẩn nội dung hữu ích và đáng tin cậy | Unitrux',
    description: 'Cách Unitrux xác định tác giả, kiểm tra nguồn, cập nhật, sửa lỗi và sử dụng AI để tạo nội dung hữu ích, đáng tin cậy cho người đọc.',
    heading: 'Tiêu chuẩn nội dung của Unitrux',
    summary: 'Cam kết về người chịu trách nhiệm, quy trình biên tập, nguồn thông tin, ngày cập nhật, sửa lỗi và việc sử dụng công cụ tự động trong nội dung.',
    bullets: [
      'Xác định tác giả hoặc nhóm biên tập chịu trách nhiệm',
      'Ưu tiên kinh nghiệm thực tế và nguồn thông tin gốc',
      'Kiểm tra dữ kiện, ghi ngày xuất bản và ngày cập nhật rõ ràng',
      'Công khai việc sử dụng AI khi cần thiết để người đọc hiểu cách nội dung được tạo ra',
      'Sửa lỗi minh bạch qua kênh liên hệ công khai',
      'Tối ưu AI Search bằng nền tảng SEO, không dùng llms.txt hoặc đánh dấu AI không được hỗ trợ',
    ],
    type: 'WebPage',
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

export const buildStructuredData = (pathname, overrides = {}) => {
  const basePage = getSeoForPath(pathname);
  const page = {
    ...basePage,
    ...overrides,
    schema: {
      ...(basePage.schema || {}),
      ...(overrides.schema || {}),
    },
  };
  const canonical = overrides.canonical || getCanonicalUrl(page.path || pathname);
  const organizationId = `${SITE_URL}/#organization`;
  const graph = [
    {
      '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: 'CÔNG TY TNHH UNITRUX',
      alternateName: ['UNITRUX COMPANY LIMITED', 'UNITRUX CO.,LTD'],
      taxID: '0319201007',
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'Mã số thuế Việt Nam',
        value: '0319201007',
      },
      foundingDate: '2025-10-06',
      url: `${SITE_URL}/`,
      description: 'Unitrux – Giải pháp marketing và công nghệ trọn gói cho SME. Triển khai trọn bộ 10 dịch vụ tăng trưởng số: gồm website chuẩn SEO/AEO/GEO, Chatbot AI, Fanpage, nội dung đa kênh, quảng cáo đa nền tảng, Marketing Automation và ứng dụng số cho doanh nghiệp.',
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_OG_IMAGE,
        width: 1000,
        height: 1000,
      },
      image: DEFAULT_OG_IMAGE,
      email: 'info@unitrux.com',
      telephone: '+84 938 695 186',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '84/12 Đường An Phú Đông 03',
        addressLocality: 'Phường An Phú Đông',
        addressRegion: 'Thành phố Hồ Chí Minh',
        addressCountry: 'VN',
      },
      isicV4: '7310',
      areaServed: { '@type': 'Country', name: 'Vietnam' },
      knowsAbout: ['Chụp ảnh sản phẩm', 'Sản xuất video quảng cáo', 'Thiết kế website', 'SEO/AEO/GEO', 'Chatbot AI', 'Digital Marketing', 'Marketing Automation', 'E-commerce', 'Thiết kế UI/UX'],
      sameAs: [
        'https://www.facebook.com/UnitruxCreativeStudio',
        'https://www.linkedin.com/company/unitrux',
        'https://www.youtube.com/@UnitruxDigitalMarketing',
        'https://www.tiktok.com/@unitruxmarketing',
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:30',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@unitrux.com',
        telephone: '+84 938 695 186',
        availableLanguage: ['Vietnamese', 'English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:30',
        },
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#legal-representative`,
      name: 'NGUYỄN TRUNG ĐỨC',
      jobTitle: 'Người đại diện theo pháp luật',
      worksFor: { '@id': `${SITE_URL}/#organization` },
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
      about: { '@id': organizationId },
      inLanguage: page.language || 'vi-VN',
      mainEntity: page.type === 'Service'
        ? { '@id': `${canonical}#service` }
        : (page.serviceList ? buildServiceListNode({ services: page.serviceList, siteUrl: SITE_URL }) : undefined),
      breadcrumb: page.path !== '/' ? { '@id': `${canonical}#breadcrumb` } : undefined,
      hasPart: page.portfolio ? { '@id': `${canonical}#portfolio` } : undefined,
      datePublished: page.datePublished,
      dateModified: page.dateModified,
    },
  ];

  if (page.type === 'Service') {
    graph.push(buildServiceNode({
      page,
      canonical,
      providerId: organizationId,
      language: page.language || 'vi-VN',
    }));
  }

  if (page.portfolio) {
    graph.push(...buildPortfolioNodes({
      portfolio: page.portfolio,
      canonical,
      siteUrl: SITE_URL,
      organizationId,
    }));
  }

  const faqNode = buildFaqNode({ faqs: page.faqs, canonical });
  if (faqNode) graph.push(faqNode);

  if (page.path !== '/') {
    const itemListElement = [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
    ];

    if (page.type === 'Service') {
      itemListElement.push(
        { '@type': 'ListItem', position: 2, name: 'Dịch vụ', item: `${SITE_URL}/services/` },
        { '@type': 'ListItem', position: 3, name: page.heading, item: canonical },
      );
    } else {
      itemListElement.push(
        { '@type': 'ListItem', position: 2, name: page.heading, item: canonical },
      );
    }

    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement,
    });
  }

  return removeEmptySchemaValues({ '@context': 'https://schema.org', '@graph': graph });
};

export const buildCmsServiceStructuredData = ({
  service,
  pathname,
  language = 'vi',
}) => {
  const canonical = getCanonicalUrl(pathname);
  const page = normalizeCmsService({
    service,
    pathname,
    canonical,
    language,
  });
  return buildStructuredData(pathname, page);
};

export const buildArticleStructuredData = ({
  path,
  title,
  description,
  image,
  author,
  datePublished,
  dateModified,
  articleSection,
  keywords,
  content,
  language = 'vi',
}) => {
  const canonical = getCanonicalUrl(path);
  const base = buildStructuredData(path);
  const authorName = author || `${SITE_NAME} Team`;
  const isOrganizationAuthor = /unitrux|team|đội ngũ|ban biên tập/i.test(authorName);
  const article = {
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    mainEntityOfPage: { '@id': `${canonical}#webpage` },
    headline: title,
    description,
    image: [image || DEFAULT_OG_IMAGE],
    thumbnailUrl: image || DEFAULT_OG_IMAGE,
    author: isOrganizationAuthor
      ? { '@type': 'Organization', name: authorName, url: `${SITE_URL}/` }
      : { '@type': 'Person', name: authorName },
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: language,
    keywords: Array.isArray(keywords) && keywords.length ? keywords : undefined,
  };

  if (datePublished) article.datePublished = datePublished;
  if (dateModified) article.dateModified = dateModified;
  if (articleSection) article.articleSection = articleSection;

  const articleGraph = base['@graph'].map((item) => {
    if (item['@id'] === `${canonical}#webpage`) {
      return {
        ...item,
        '@type': 'WebPage',
        name: title,
        description,
        primaryImageOfPage: { '@id': `${canonical}#primaryimage` },
      };
    }
    if (item['@type'] === 'BreadcrumbList') {
      return {
        ...item,
        itemListElement: item.itemListElement.map((listItem) => (
          listItem.position === 2 ? { ...listItem, name: title } : listItem
        )),
      };
    }
    return item;
  });
  articleGraph.push({
    '@type': 'ImageObject',
    '@id': `${canonical}#primaryimage`,
    url: image || DEFAULT_OG_IMAGE,
    contentUrl: image || DEFAULT_OG_IMAGE,
  });

  const articleFaqNode = buildFaqNode({ faqs: extractFaqFromMarkdown(content), canonical });
  if (articleFaqNode) articleGraph.push(articleFaqNode);

  return { ...base, '@graph': [...articleGraph, article] };
};
