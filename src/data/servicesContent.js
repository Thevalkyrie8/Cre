// Copy for the ServiceLanding template (src/components/ServiceLanding.jsx).
// Every string is bilingual ({ en, vi }) per the site's data-en/data-vi convention.
// FAQ content for each service lives in src/seo/seoConfig.js (imported per serviceKey
// by ServiceLanding), not here — keeps FAQ copy and FAQPage schema in one place.

export const servicesContent = {
  'digital-solutions': {
    eyebrow: { en: 'Service', vi: 'Dịch vụ' },
    title: {
      en: 'App & Digital Solution Design',
      vi: 'Thiết kế ứng dụng và giải pháp số',
    },
    intro: {
      en: 'Booking systems, customer databases, internal tools, or a small MVP to test an idea — Unitrux designs the smallest system that actually solves your operating problem, then expands it once real usage proves it out.',
      vi: 'Hệ thống đặt lịch, quản lý dữ liệu khách hàng, công cụ nội bộ, hay một MVP nhỏ để kiểm tra ý tưởng — Unitrux thiết kế đúng hệ thống nhỏ nhất giải quyết được vấn đề vận hành thật, rồi mở rộng khi dữ liệu thực tế đã chứng minh nhu cầu.',
    },
    stats: [
      { value: '4–8', label: { en: 'weeks for a scoped MVP', vi: 'tuần cho một MVP đã xác định phạm vi' } },
      { value: '1', label: { en: 'process, mapped before any screen is designed', vi: 'quy trình được vẽ ra trước khi thiết kế màn hình đầu tiên' } },
      { value: '100%', label: { en: 'source code and data ownership handed to you', vi: 'mã nguồn và dữ liệu bàn giao thuộc quyền sở hữu của bạn' } },
    ],
    problem: {
      title: { en: 'Signs your current process has hit its ceiling', vi: 'Dấu hiệu quy trình hiện tại đang chạm giới hạn' },
      points: [
        {
          en: 'Staff re-enter the same customer information across a messaging app, a spreadsheet, and a sales tool.',
          vi: 'Nhân viên phải nhập lại cùng một thông tin khách hàng qua nhiều nơi: tin nhắn, bảng tính, phần mềm bán hàng.',
        },
        {
          en: 'Nobody can say for sure where a lead is stuck, or who is responsible for following up.',
          vi: 'Không ai chắc chắn một lead đang dừng ở bước nào, hay ai đang chịu trách nhiệm theo dõi tiếp.',
        },
        {
          en: 'The whole process depends on one person who happens to know how the file/system works.',
          vi: 'Toàn bộ quy trình phụ thuộc vào một người duy nhất biết cách vận hành file hay hệ thống đó.',
        },
        {
          en: 'A workflow that was fine at 20 requests a day is breaking down at 100–200.',
          vi: 'Một quy trình từng ổn với 20 yêu cầu mỗi ngày bắt đầu quá tải khi tăng lên 100–200.',
        },
      ],
    },
    capabilities: [
      {
        title: { en: 'Booking & scheduling systems', vi: 'Hệ thống đặt lịch' },
        description: {
          en: 'Service listings, available time slots, confirmations and reminders — for salons, clinics, studios or training centers.',
          vi: 'Danh sách dịch vụ, khung giờ trống, xác nhận và nhắc lịch — phù hợp salon, phòng khám, studio hay trung tâm đào tạo.',
        },
      },
      {
        title: { en: 'Customer & data management apps', vi: 'Ứng dụng quản lý khách hàng & dữ liệu' },
        description: {
          en: 'One place to track customers, orders and transaction history instead of scattered spreadsheets.',
          vi: 'Một nơi duy nhất theo dõi khách hàng, đơn hàng và lịch sử giao dịch thay vì rải rác nhiều bảng tính.',
        },
      },
      {
        title: { en: 'Internal work management tools', vi: 'Công cụ quản lý công việc nội bộ' },
        description: {
          en: 'Role-based permissions, task assignment and status tracking for teams that outgrew chat groups and shared files.',
          vi: 'Phân quyền theo vai trò, giao việc và theo dõi trạng thái cho đội ngũ đã vượt quá khả năng của nhóm chat và file dùng chung.',
        },
      },
      {
        title: { en: 'MVP for a new idea', vi: 'MVP cho ý tưởng mới' },
        description: {
          en: 'The smallest working version to test real demand before committing budget to a full system.',
          vi: 'Phiên bản hoạt động nhỏ nhất để kiểm tra nhu cầu thật trước khi đầu tư vào một hệ thống đầy đủ.',
        },
      },
    ],
    process: [
      {
        title: { en: 'Assess the current process', vi: 'Khảo sát quy trình hiện tại' },
        description: {
          en: 'Understand goals, who will use the system, and where the current process loses time or customers.',
          vi: 'Hiểu mục tiêu, ai sẽ dùng hệ thống, và quy trình hiện tại đang mất thời gian hay mất khách ở đâu.',
        },
      },
      {
        title: { en: 'Map the journey', vi: 'Vẽ bản đồ hành trình' },
        description: {
          en: 'Break the process into concrete steps: who does what, what data is created, and what happens next.',
          vi: 'Chia quy trình thành các bước cụ thể: ai thực hiện, dữ liệu nào được tạo ra, và bước tiếp theo là gì.',
        },
      },
      {
        title: { en: 'Define MVP scope', vi: 'Xác định phạm vi MVP' },
        description: {
          en: 'Sort features into must-have, should-have and later — so budget stays controlled and scope stays finite.',
          vi: 'Phân loại tính năng theo mức bắt buộc, nên có và để sau — giúp kiểm soát ngân sách và phạm vi rõ ràng.',
        },
      },
      {
        title: { en: 'Design, build and test', vi: 'Thiết kế, phát triển và kiểm thử' },
        description: {
          en: 'Clickable wireframes reviewed before development, built in small sprints, tested against real-world edge cases.',
          vi: 'Wireframe có thể bấm thử được duyệt trước khi code, phát triển theo từng sprint nhỏ, kiểm thử với các tình huống thực tế.',
        },
      },
      {
        title: { en: 'Launch and hand over', vi: 'Ra mắt và bàn giao' },
        description: {
          en: 'Full handover of source code, accounts, and documentation — you own what you paid for.',
          vi: 'Bàn giao đầy đủ mã nguồn, tài khoản và tài liệu — bạn sở hữu toàn bộ những gì đã đầu tư.',
        },
      },
    ],
    deliverables: [
      { en: 'Journey map of the current and future process', vi: 'Bản đồ hành trình quy trình hiện tại và tương lai' },
      { en: 'Clickable wireframes / prototype', vi: 'Wireframe / prototype có thể bấm thử' },
      { en: 'Working application or system', vi: 'Ứng dụng hoặc hệ thống hoạt động thực tế' },
      { en: 'Source code, credentials and technical documentation', vi: 'Mã nguồn, tài khoản truy cập và tài liệu kỹ thuật' },
    ],
    relatedServices: [
      { path: '/automation', label: { en: 'Marketing automation', vi: 'Marketing Automation' } },
      { path: '/web-development', label: { en: 'Website design', vi: 'Thiết kế website' } },
      { path: '/content-creation', label: { en: 'Multi-channel content', vi: 'Nội dung đa kênh' } },
    ],
  },

  'fanpage-management': {
    eyebrow: { en: 'Service', vi: 'Dịch vụ' },
    title: {
      en: 'Professional Facebook Fanpage Setup',
      vi: 'Xây dựng Fanpage chuyên nghiệp',
    },
    intro: {
      en: 'Most Fanpages lose customers before a single message is sent — an unclear cover photo, missing business info, no pinned post explaining what you actually sell. Unitrux rebuilds the page structure, information and content foundation so visitors trust it enough to ask a question.',
      vi: 'Phần lớn Fanpage mất khách ngay từ trước khi có tin nhắn đầu tiên — ảnh bìa không rõ thông điệp, thông tin doanh nghiệp thiếu, không có bài ghim giải thích đang bán gì. Unitrux xây lại cấu trúc trang, thông tin và nền tảng nội dung để khách truy cập đủ tin tưởng để nhắn hỏi.',
    },
    stats: [
      { value: '100%', label: { en: 'business info verified and complete', vi: 'thông tin doanh nghiệp được xác minh đầy đủ' } },
      { value: '3', label: { en: 'layers rebuilt: identity, info, content', vi: 'lớp được xây lại: hình ảnh, thông tin, nội dung' } },
      { value: '1', label: { en: 'content structure your team can keep running', vi: 'cấu trúc nội dung đội ngũ bạn có thể tự duy trì' } },
    ],
    problem: {
      title: { en: 'What makes a Fanpage look untrustworthy', vi: 'Điều gì khiến một Fanpage trông thiếu uy tín' },
      points: [
        {
          en: 'Cover photo and profile picture do not clearly say what the business sells.',
          vi: 'Ảnh bìa và ảnh đại diện không nói rõ doanh nghiệp đang bán gì.',
        },
        {
          en: 'Business info (address, hours, categories) is incomplete or inconsistent with the website.',
          vi: 'Thông tin doanh nghiệp (địa chỉ, giờ mở cửa, danh mục) thiếu hoặc không khớp với website.',
        },
        {
          en: 'Old posts, broken links, or outdated pricing are still visible on the timeline.',
          vi: 'Bài đăng cũ, liên kết hỏng hoặc bảng giá đã lỗi thời vẫn còn hiển thị trên dòng thời gian.',
        },
        {
          en: 'No pinned post or About section tells a first-time visitor what to do next.',
          vi: 'Không có bài ghim hay phần Giới thiệu nào hướng dẫn khách truy cập lần đầu nên làm gì tiếp theo.',
        },
      ],
    },
    capabilities: [
      {
        title: { en: 'Page identity & visual setup', vi: 'Thiết lập hình ảnh & bộ nhận diện trang' },
        description: {
          en: 'Cover photo, profile picture, highlights and page layout aligned with your brand identity.',
          vi: 'Ảnh bìa, ảnh đại diện, mục nổi bật và bố cục trang đồng bộ với bộ nhận diện thương hiệu.',
        },
      },
      {
        title: { en: 'Business information audit', vi: 'Rà soát thông tin doanh nghiệp' },
        description: {
          en: 'Address, hours, categories, contact buttons and About section verified and kept consistent with your website.',
          vi: 'Địa chỉ, giờ mở cửa, danh mục, nút liên hệ và phần Giới thiệu được xác minh và đồng bộ với website.',
        },
      },
      {
        title: { en: 'Content structure & pinned post', vi: 'Cấu trúc nội dung & bài ghim' },
        description: {
          en: 'A clear content pillar structure and a pinned post that tells new visitors exactly what to do next.',
          vi: 'Cấu trúc content pillar rõ ràng và bài ghim hướng dẫn khách truy cập mới biết chính xác bước tiếp theo.',
        },
      },
      {
        title: { en: 'Review & reputation cleanup', vi: 'Dọn dẹp đánh giá & uy tín trang' },
        description: {
          en: 'Outdated posts, broken links and unanswered reviews cleaned up or addressed.',
          vi: 'Bài đăng lỗi thời, liên kết hỏng và đánh giá chưa phản hồi được dọn dẹp hoặc xử lý.',
        },
      },
    ],
    process: [
      {
        title: { en: 'Audit the current page', vi: 'Kiểm tra trang hiện tại' },
        description: { en: 'Review visuals, information, past content and how visitors typically arrive.', vi: 'Rà soát hình ảnh, thông tin, nội dung cũ và cách khách truy cập thường tìm đến trang.' },
      },
      {
        title: { en: 'Rebuild identity & information', vi: 'Xây lại hình ảnh & thông tin' },
        description: { en: 'Replace visuals, correct business info, and set up the About section and contact buttons.', vi: 'Thay hình ảnh, sửa thông tin doanh nghiệp, thiết lập phần Giới thiệu và nút liên hệ.' },
      },
      {
        title: { en: 'Set the content structure', vi: 'Thiết lập cấu trúc nội dung' },
        description: { en: 'Define content pillars and a pinned post so the page has a clear first impression.', vi: 'Xác định content pillar và bài ghim để trang có ấn tượng đầu tiên rõ ràng.' },
      },
      {
        title: { en: 'Hand over with a simple guide', vi: 'Bàn giao kèm hướng dẫn đơn giản' },
        description: { en: 'A short guide so your team can keep the page updated without external help.', vi: 'Hướng dẫn ngắn gọn để đội ngũ bạn tự cập nhật trang mà không cần hỗ trợ bên ngoài.' },
      },
    ],
    deliverables: [
      { en: 'Rebuilt cover, profile and page layout', vi: 'Ảnh bìa, ảnh đại diện và bố cục trang được xây lại' },
      { en: 'Verified, consistent business information', vi: 'Thông tin doanh nghiệp đã xác minh, nhất quán' },
      { en: 'Content pillar structure and pinned post', vi: 'Cấu trúc content pillar và bài ghim' },
      { en: 'Simple handover guide for your team', vi: 'Hướng dẫn bàn giao đơn giản cho đội ngũ' },
    ],
    relatedServices: [
      { path: '/content-creation', label: { en: 'Multi-channel content', vi: 'Nội dung đa kênh' } },
      { path: '/chatbox-ai', label: { en: 'AI chatbot for Fanpage', vi: 'Chatbot AI cho Fanpage' } },
      { path: '/digital-marketing', label: { en: 'Multi-platform advertising', vi: 'Quảng cáo đa nền tảng' } },
    ],
  },

  'content-creation': {
    eyebrow: { en: 'Service', vi: 'Dịch vụ' },
    title: {
      en: 'Multi-Channel Content Creation',
      vi: 'Sáng tạo nội dung đa kênh',
    },
    intro: {
      en: 'Posting daily on Facebook, TikTok, Instagram, LinkedIn and the website rarely fails from a lack of content — it fails when every channel says something different. Unitrux builds one messaging system, then adapts it to each platform\'s format and audience behavior.',
      vi: 'Đăng bài đều đặn trên Facebook, TikTok, Instagram, LinkedIn và website hiếm khi thất bại vì thiếu nội dung — mà vì mỗi kênh đang nói một thông điệp khác nhau. Unitrux xây một hệ thống thông điệp thống nhất, rồi điều chỉnh theo định dạng và hành vi người dùng của từng nền tảng.',
    },
    stats: [
      { value: '1', label: { en: 'unified messaging system across every channel', vi: 'hệ thống thông điệp thống nhất trên mọi kênh' } },
      { value: '6', label: { en: 'channels covered: Facebook, Website, Zalo, TikTok, Instagram, LinkedIn', vi: 'kênh triển khai: Facebook, Website, Zalo, TikTok, Instagram, LinkedIn' } },
      { value: '30–90', label: { en: 'day content calendar, built around your capacity', vi: 'ngày lịch nội dung, xây theo đúng năng lực sản xuất' } },
    ],
    problem: {
      title: { en: 'Signs your content isn\'t working as a system', vi: 'Dấu hiệu nội dung chưa vận hành như một hệ thống' },
      points: [
        {
          en: 'Content is planned around a post count ("20 posts a month"), not a role in the customer journey.',
          vi: 'Nội dung được lên kế hoạch theo số lượng ("mỗi tháng 20 bài"), không theo vai trò trong hành trình khách hàng.',
        },
        {
          en: 'A post gets views or engagement but rarely leads anywhere — no link, no next step.',
          vi: 'Bài đăng có lượt xem hoặc tương tác nhưng hiếm khi dẫn đến đâu — không có liên kết, không có bước tiếp theo.',
        },
        {
          en: 'Marketing, the website and the sales team don\'t share data on what customers are actually asking.',
          vi: 'Marketing, website và đội bán hàng không chia sẻ dữ liệu về điều khách hàng thực sự đang hỏi.',
        },
        {
          en: 'Only views and likes get tracked — nobody can say which content actually produced a lead.',
          vi: 'Chỉ đo lượt xem và lượt thích — không ai biết nội dung nào thực sự tạo ra lead.',
        },
      ],
    },
    capabilities: [
      {
        title: { en: 'Messaging system & content pillars', vi: 'Hệ thống thông điệp & content pillar' },
        description: {
          en: 'One consistent core message about who you serve, what problem you solve, and what evidence backs it up.',
          vi: 'Một thông điệp cốt lõi nhất quán về đối tượng phục vụ, vấn đề giải quyết và bằng chứng đi kèm.',
        },
      },
      {
        title: { en: 'Content calendar & content map', vi: 'Lịch nội dung & content map' },
        description: {
          en: 'Every piece mapped to a customer segment, journey stage, channel, format and a clear next step (CTA).',
          vi: 'Mỗi nội dung được gắn với nhóm khách hàng, giai đoạn hành trình, kênh, định dạng và một bước tiếp theo (CTA) rõ ràng.',
        },
      },
      {
        title: { en: 'Original content, repurposed by platform', vi: 'Nội dung gốc, tái sử dụng theo từng nền tảng' },
        description: {
          en: 'One in-depth piece becomes short videos, carousels, posts and emails — adapted, not copy-pasted.',
          vi: 'Một nội dung chuyên sâu trở thành video ngắn, carousel, bài đăng và email — được điều chỉnh, không copy nguyên văn.',
        },
      },
      {
        title: { en: 'Review workflow & measurement', vi: 'Quy trình duyệt & đo lường' },
        description: {
          en: 'A clear approval process before publishing, and KPIs tied to behavior and leads, not just views.',
          vi: 'Quy trình duyệt rõ ràng trước khi đăng, và KPI gắn với hành vi và lead, không chỉ lượt xem.',
        },
      },
    ],
    process: [
      { title: { en: 'Audit existing content', vi: 'Audit nội dung hiện có' }, description: { en: 'Review what\'s accurate, outdated, repeated, or reusable across every channel.', vi: 'Rà soát nội dung nào còn đúng, đã lỗi thời, lặp lại, hoặc có thể tái sử dụng trên các kênh.' } },
      { title: { en: 'Build the messaging system', vi: 'Xây hệ thống thông điệp' }, description: { en: 'Define who you serve, the problem, the evidence, and what claims need sign-off.', vi: 'Xác định đối tượng phục vụ, vấn đề, bằng chứng và các tuyên bố cần xác nhận trước khi đăng.' } },
      { title: { en: 'Plan content pillars & calendar', vi: 'Lên content pillar & lịch nội dung' }, description: { en: 'A 30–90 day calendar mapped to customer segments, channels and CTAs.', vi: 'Lịch nội dung 30–90 ngày gắn với nhóm khách hàng, kênh và CTA.' } },
      { title: { en: 'Produce & distribute', vi: 'Sản xuất & phân phối' }, description: { en: 'Produce original content, adapt it per channel, and review before publishing.', vi: 'Sản xuất nội dung gốc, điều chỉnh theo từng kênh, duyệt trước khi đăng.' } },
      { title: { en: 'Measure & update', vi: 'Đo lường & cập nhật' }, description: { en: 'Track behavior and lead-generating content, then update the calendar based on real data.', vi: 'Theo dõi hành vi và nội dung tạo ra lead, sau đó cập nhật lịch nội dung dựa trên dữ liệu thật.' } },
    ],
    deliverables: [
      { en: 'Messaging system document', vi: 'Tài liệu hệ thống thông điệp' },
      { en: 'Content pillars & content map', vi: 'Content pillar & content map' },
      { en: '30–90 day content calendar', vi: 'Lịch nội dung 30–90 ngày' },
      { en: 'Published, channel-adapted content', vi: 'Nội dung đã xuất bản, điều chỉnh theo từng kênh' },
    ],
    relatedServices: [
      { path: '/digital-marketing', label: { en: 'Multi-platform advertising', vi: 'Quảng cáo đa nền tảng' } },
      { path: '/fanpage-management', label: { en: 'Fanpage setup', vi: 'Xây dựng Fanpage' } },
      { path: '/seo-services', label: { en: 'SEO / AEO / GEO', vi: 'SEO/AEO/GEO' } },
    ],
  },

  'seo-services': {
    eyebrow: { en: 'Service', vi: 'Dịch vụ' },
    title: {
      en: 'SEO, AEO & GEO for Your Brand and Website',
      vi: 'Dịch vụ SEO/AEO/GEO cho thương hiệu và website',
    },
    intro: {
      en: 'Search is splitting into three surfaces: Google\'s classic results (SEO), the direct-answer box or featured snippet (AEO), and what AI tools like ChatGPT or Google AI Overviews cite when someone asks a question (GEO). Unitrux researches keywords, structures content and fixes technical foundations so your brand shows up correctly on all three.',
      vi: 'Tìm kiếm đang tách thành ba bề mặt: kết quả Google truyền thống (SEO), khung trả lời trực tiếp/featured snippet (AEO), và những gì công cụ AI như ChatGPT hay Google AI Overviews trích dẫn khi có người hỏi (GEO). Unitrux nghiên cứu từ khóa, cấu trúc nội dung và xử lý nền tảng kỹ thuật để thương hiệu bạn xuất hiện đúng trên cả ba bề mặt này.',
    },
    stats: [
      { value: '3', label: { en: 'search surfaces covered: SEO, AEO, GEO', vi: 'bề mặt tìm kiếm: SEO, AEO, GEO' } },
      { value: '1', label: { en: 'technical + content audit before any work starts', vi: 'buổi audit kỹ thuật + nội dung trước khi bắt đầu' } },
      { value: '0', label: { en: 'fabricated rankings guaranteed — only what real data supports', vi: 'cam kết thứ hạng ảo — chỉ báo cáo đúng những gì dữ liệu thật cho thấy' } },
    ],
    problem: {
      title: { en: 'What is SEO, AEO and GEO — in plain terms', vi: 'SEO, AEO và GEO khác nhau như thế nào — nói ngắn gọn' },
      points: [
        {
          en: 'SEO (Search Engine Optimization): getting a page to rank in Google\'s classic search results through keywords, content and technical structure.',
          vi: 'SEO (Search Engine Optimization): giúp trang xếp hạng trong kết quả tìm kiếm truyền thống của Google thông qua từ khóa, nội dung và cấu trúc kỹ thuật.',
        },
        {
          en: 'AEO (Answer Engine Optimization): structuring content — clear questions and answers, FAQ schema — so it gets pulled into featured snippets and "People also ask" boxes.',
          vi: 'AEO (Answer Engine Optimization): cấu trúc nội dung — câu hỏi và câu trả lời rõ ràng, schema FAQ — để được trích vào featured snippet và mục "Mọi người cũng hỏi".',
        },
        {
          en: 'GEO (Generative Engine Optimization): writing content substantive and well-structured enough that AI tools cite and reference your brand when generating an answer.',
          vi: 'GEO (Generative Engine Optimization): viết nội dung đủ sâu và có cấu trúc rõ để công cụ AI trích dẫn, nhắc đến thương hiệu bạn khi tạo câu trả lời.',
        },
        {
          en: 'All three depend on the same foundation: accurate content, clean site structure, and real structured data — not tricks specific to any one engine.',
          vi: 'Cả ba đều dựa trên cùng một nền tảng: nội dung chính xác, cấu trúc site sạch và dữ liệu có cấu trúc thật — không phải mẹo vặt riêng cho từng công cụ.',
        },
      ],
    },
    capabilities: [
      {
        title: { en: 'Keyword & search-intent research', vi: 'Nghiên cứu từ khóa & search intent' },
        description: {
          en: 'Identify what your real customers search for, in Vietnamese and English, and what question each page should answer.',
          vi: 'Xác định khách hàng thật đang tìm gì, bằng tiếng Việt lẫn tiếng Anh, và mỗi trang cần trả lời câu hỏi nào.',
        },
      },
      {
        title: { en: 'On-page & content optimization', vi: 'Tối ưu on-page & nội dung' },
        description: {
          en: 'Titles, headings, internal linking and content structure rewritten so both readers and search engines understand the page quickly.',
          vi: 'Tiêu đề, heading, internal link và cấu trúc nội dung được viết lại để người đọc lẫn công cụ tìm kiếm hiểu nhanh nội dung trang.',
        },
      },
      {
        title: { en: 'Technical SEO audit', vi: 'Audit kỹ thuật SEO' },
        description: {
          en: 'Site speed, crawlability, structured data (JSON-LD), sitemap and mobile experience checked and fixed.',
          vi: 'Tốc độ site, khả năng crawl, dữ liệu có cấu trúc (JSON-LD), sitemap và trải nghiệm mobile được kiểm tra và khắc phục.',
        },
      },
      {
        title: { en: 'AEO / GEO structure & schema', vi: 'Cấu trúc & schema cho AEO/GEO' },
        description: {
          en: 'FAQ sections, direct-answer formatting and FAQPage/Article schema so AI and answer engines can extract your content cleanly.',
          vi: 'Phần FAQ, định dạng trả lời trực tiếp và schema FAQPage/Article để công cụ AI và answer engine trích xuất nội dung dễ dàng.',
        },
      },
    ],
    process: [
      { title: { en: 'Audit', vi: 'Audit' }, description: { en: 'Technical health, existing content, keyword gaps and competitor landscape.', vi: 'Sức khỏe kỹ thuật, nội dung hiện có, khoảng trống từ khóa và bối cảnh đối thủ.' } },
      { title: { en: 'Strategy & keyword map', vi: 'Chiến lược & bản đồ từ khóa' }, description: { en: 'Priority keywords and topics mapped to existing or new pages.', vi: 'Từ khóa và chủ đề ưu tiên được gắn với trang hiện có hoặc trang mới.' } },
      { title: { en: 'On-page & technical fixes', vi: 'Xử lý on-page & kỹ thuật' }, description: { en: 'Content rewrites, structured data, internal linking, and technical issues resolved.', vi: 'Viết lại nội dung, dữ liệu có cấu trúc, internal link và các vấn đề kỹ thuật được xử lý.' } },
      { title: { en: 'Publish & submit', vi: 'Xuất bản & khai báo' }, description: { en: 'Sitemap resubmitted, indexing requested, rich results verified with Google\'s own tools.', vi: 'Khai báo lại sitemap, yêu cầu index, kiểm tra rich results bằng công cụ chính thức của Google.' } },
      { title: { en: 'Monitor & report', vi: 'Theo dõi & báo cáo' }, description: { en: 'Search Console and analytics data reviewed monthly against real, agreed targets.', vi: 'Dữ liệu Search Console và analytics được rà soát hằng tháng theo mục tiêu thật đã thống nhất.' } },
    ],
    deliverables: [
      { en: 'Keyword & content gap report', vi: 'Báo cáo từ khóa & khoảng trống nội dung' },
      { en: 'Technical SEO audit with fixes applied', vi: 'Báo cáo audit kỹ thuật SEO kèm các mục đã xử lý' },
      { en: 'Optimized page content and structured data', vi: 'Nội dung trang và dữ liệu có cấu trúc đã tối ưu' },
      { en: 'Monthly performance report (Search Console + Analytics)', vi: 'Báo cáo hiệu quả hằng tháng (Search Console + Analytics)' },
    ],
    relatedServices: [
      { path: '/web-development', label: { en: 'Website design', vi: 'Thiết kế website' } },
      { path: '/content-creation', label: { en: 'Multi-channel content', vi: 'Nội dung đa kênh' } },
      { path: '/digital-marketing', label: { en: 'Multi-platform advertising', vi: 'Quảng cáo đa nền tảng' } },
    ],
  },

  'product-photography': {
    eyebrow: { en: 'Service', vi: 'Dịch vụ' },
    title: {
      en: 'Product & Brand Photography',
      vi: 'Quay chụp sản phẩm và thương hiệu',
    },
    intro: {
      en: 'Product photos, space photography and brand imagery for your website, marketplace listings and social profiles — shot to a consistent visual standard so every channel looks like it belongs to the same brand.',
      vi: 'Ảnh sản phẩm, ảnh không gian và hình ảnh thương hiệu cho website, sàn thương mại điện tử và các trang mạng xã hội — chụp theo một tiêu chuẩn hình ảnh nhất quán để mọi kênh đều mang cùng một nhận diện thương hiệu.',
    },
    stats: [
      { value: '1', label: { en: 'visual standard applied across every channel', vi: 'tiêu chuẩn hình ảnh áp dụng trên mọi kênh' } },
      { value: '3', label: { en: 'coverage types: product, space, brand', vi: 'loại hình chụp: sản phẩm, không gian, thương hiệu' } },
      { value: 'Multi-format', label: { en: 'delivery for website, marketplace and social', vi: 'bàn giao đa định dạng cho website, sàn TMĐT và mạng xã hội' } },
    ],
    problem: {
      title: { en: 'Where inconsistent product photos hurt you', vi: 'Ảnh sản phẩm thiếu nhất quán gây thiệt hại ở đâu' },
      points: [
        {
          en: 'Product photos taken at different times, angles and lighting make a catalog look unprofessional.',
          vi: 'Ảnh sản phẩm chụp ở nhiều thời điểm, góc độ và ánh sáng khác nhau khiến danh mục sản phẩm trông thiếu chuyên nghiệp.',
        },
        {
          en: 'Marketplace listings with weak photos convert worse, even when the product itself is good.',
          vi: 'Gian hàng trên sàn TMĐT với ảnh yếu chuyển đổi kém hơn, dù bản thân sản phẩm tốt.',
        },
        {
          en: 'Website and social photos don\'t match, so the brand feels different from one channel to the next.',
          vi: 'Ảnh trên website và mạng xã hội không khớp nhau, khiến thương hiệu trông khác nhau giữa các kênh.',
        },
        {
          en: 'No usable space/brand photography exists for a new landing page, ad, or press mention.',
          vi: 'Không có sẵn ảnh không gian/thương hiệu để dùng cho landing page mới, quảng cáo hoặc bài truyền thông.',
        },
      ],
    },
    capabilities: [
      {
        title: { en: 'Product photography', vi: 'Chụp ảnh sản phẩm' },
        description: {
          en: 'Studio or on-location product shots for website catalogs, marketplace listings and ads.',
          vi: 'Chụp sản phẩm tại studio hoặc tại địa điểm thực tế cho danh mục website, gian hàng TMĐT và quảng cáo.',
        },
      },
      {
        title: { en: 'Space & interior photography', vi: 'Chụp ảnh không gian' },
        description: {
          en: 'Salons, showrooms, offices and retail spaces photographed to represent the real customer experience.',
          vi: 'Salon, showroom, văn phòng và không gian bán lẻ được chụp đúng trải nghiệm thực tế của khách hàng.',
        },
      },
      {
        title: { en: 'Brand & lifestyle imagery', vi: 'Hình ảnh thương hiệu & lifestyle' },
        description: {
          en: 'Team, process and in-use shots that support brand storytelling beyond the product itself.',
          vi: 'Ảnh đội ngũ, quy trình và sản phẩm trong sử dụng thực tế, hỗ trợ kể chuyện thương hiệu ngoài bản thân sản phẩm.',
        },
      },
      {
        title: { en: 'Multi-format delivery', vi: 'Bàn giao đa định dạng' },
        description: {
          en: 'Images edited and sized for website, marketplace platforms, and social profile requirements.',
          vi: 'Hình ảnh được hậu kỳ và căn chỉnh kích thước theo đúng yêu cầu của website, sàn TMĐT và các nền tảng mạng xã hội.',
        },
      },
    ],
    process: [
      { title: { en: 'Brief & shot list', vi: 'Lên brief & shot list' }, description: { en: 'Agree on products, spaces, angles and how each image will be used.', vi: 'Thống nhất sản phẩm, không gian, góc chụp và cách sử dụng từng ảnh.' } },
      { title: { en: 'Site survey', vi: 'Khảo sát thực tế' }, description: { en: 'Check lighting, space and operating hours before proposing equipment and crew.', vi: 'Kiểm tra ánh sáng, không gian và giờ hoạt động trước khi đề xuất thiết bị và nhân sự.' } },
      { title: { en: 'Shoot day', vi: 'Ngày quay chụp' }, description: { en: 'Product, space and brand imagery captured to the agreed shot list.', vi: 'Ảnh sản phẩm, không gian và thương hiệu được chụp theo đúng shot list đã thống nhất.' } },
      { title: { en: 'Edit & deliver', vi: 'Hậu kỳ & bàn giao' }, description: { en: 'Color-corrected, retouched and sized per channel, delivered with usage-ready files.', vi: 'Chỉnh màu, retouch và căn chỉnh kích thước theo từng kênh, bàn giao file sẵn sàng sử dụng.' } },
    ],
    deliverables: [
      { en: 'Edited product photo set', vi: 'Bộ ảnh sản phẩm đã hậu kỳ' },
      { en: 'Space / interior photo set', vi: 'Bộ ảnh không gian' },
      { en: 'Brand / lifestyle photo set', vi: 'Bộ ảnh thương hiệu / lifestyle' },
      { en: 'Channel-ready file sizes (website, marketplace, social)', vi: 'File đã căn chỉnh kích thước theo từng kênh (website, TMĐT, mạng xã hội)' },
    ],
    gallery: [
      {
        src: '/images/img4.jpg',
        labelEn: 'Product photography studio setup',
        labelVi: 'Dựng set chụp sản phẩm trong studio',
      },
      {
        src: '/images/img1.jpg',
        labelEn: 'Brand photography shot on location',
        labelVi: 'Ảnh thương hiệu chụp tại địa điểm khách hàng',
      },
      {
        src: '/images/img2.jpg',
        labelEn: 'Crew checking lighting before a shoot',
        labelVi: 'Ekip canh sáng trước khi quay',
      },
      {
        src: '/images/img3.jpg',
        labelEn: 'Team workspace & post-production',
        labelVi: 'Không gian làm việc & hậu kỳ của đội ngũ',
      },
    ],
    relatedServices: [
      { path: '/media-pricing', label: { en: 'See detailed photo & video pricing', vi: 'Xem bảng giá chi tiết quay chụp' } },
      { path: '/photography-video', label: { en: 'Advertising video production', vi: 'Sản xuất video quảng cáo' } },
      { path: '/content-creation', label: { en: 'Multi-channel content', vi: 'Nội dung đa kênh' } },
      { path: '/digital-marketing', label: { en: 'Multi-platform advertising', vi: 'Quảng cáo đa nền tảng' } },
    ],
  },

  'web-development': {
    eyebrow: { en: 'Service', vi: 'Dịch vụ' },
    title: {
      en: 'Website Design — UI/UX + SEO/AEO/GEO Built In',
      vi: 'Thiết kế website chuẩn UI/UX và SEO/AEO/GEO',
    },
    intro: {
      en: 'A website designed after the fact rarely ranks well, because search structure gets bolted on instead of built in. Unitrux designs the interface and the SEO/AEO/GEO foundation together — clear information architecture, fast pages, and content structure search engines and AI tools can read from day one.',
      vi: 'Một website thiết kế xong rồi mới tính đến SEO thường khó lên hạng, vì cấu trúc tìm kiếm bị gắn thêm sau thay vì xây từ đầu. Unitrux thiết kế giao diện và nền tảng SEO/AEO/GEO cùng lúc — kiến trúc thông tin rõ ràng, tốc độ tải nhanh và cấu trúc nội dung mà công cụ tìm kiếm lẫn AI có thể đọc được ngay từ ngày đầu.',
    },
    stats: [
      { value: '2 in 1', label: { en: 'UI/UX design and SEO foundation, one engagement', vi: 'thiết kế UI/UX và nền tảng SEO trong một dự án' } },
      { value: '3–8', label: { en: 'weeks depending on scope', vi: 'tuần tùy phạm vi triển khai' } },
      { value: 'Core Web Vitals', label: { en: 'checked before launch, not after', vi: 'được kiểm tra trước khi ra mắt, không phải sau' } },
    ],
    problem: {
      title: { en: 'Why UI/UX and SEO need to be designed together', vi: 'Vì sao UI/UX và SEO cần được thiết kế cùng lúc' },
      points: [
        {
          en: 'A confusing information architecture is bad for users and bad for Google\'s ability to understand your site — same root cause, two symptoms.',
          vi: 'Kiến trúc thông tin rối rắm vừa gây khó cho người dùng, vừa khiến Google khó hiểu cấu trúc website — cùng một nguyên nhân, hai hậu quả.',
        },
        {
          en: 'Heavy, unoptimized visuals hurt page speed, which hurts both conversion rate and search ranking.',
          vi: 'Hình ảnh nặng, chưa tối ưu làm chậm tốc độ tải, ảnh hưởng cả tỷ lệ chuyển đổi lẫn thứ hạng tìm kiếm.',
        },
        {
          en: 'Headings and content added purely for visual design, without a heading structure, give search engines and AI nothing clean to extract.',
          vi: 'Heading và nội dung chỉ được thêm vì mục đích thị giác, không có cấu trúc rõ ràng, khiến công cụ tìm kiếm và AI không có gì "sạch" để trích xuất.',
        },
        {
          en: 'Retrofitting SEO onto a finished design usually means rebuilding pages that were never meant to hold that much content.',
          vi: 'Gắn SEO vào một thiết kế đã hoàn thiện thường có nghĩa phải làm lại các trang chưa từng được tính toán để chứa lượng nội dung đó.',
        },
      ],
    },
    capabilities: [
      {
        title: { en: 'Information architecture & UX', vi: 'Kiến trúc thông tin & UX' },
        description: {
          en: 'A site map and user journey designed around what customers actually search for and need to decide.',
          vi: 'Sơ đồ trang và hành trình người dùng được thiết kế theo đúng những gì khách hàng thực sự tìm kiếm và cần để ra quyết định.',
        },
      },
      {
        title: { en: 'UI system & responsive design', vi: 'Hệ thống giao diện & responsive' },
        description: {
          en: 'A consistent interface system that works cleanly across desktop, tablet and mobile.',
          vi: 'Hệ thống giao diện nhất quán, hoạt động mượt trên desktop, tablet và di động.',
        },
      },
      {
        title: { en: 'On-page SEO foundation', vi: 'Nền tảng SEO on-page' },
        description: {
          en: 'Heading structure, internal linking, metadata and structured data (JSON-LD) built into every template.',
          vi: 'Cấu trúc heading, internal link, metadata và dữ liệu có cấu trúc (JSON-LD) được xây sẵn trong từng template.',
        },
      },
      {
        title: { en: 'Speed & Core Web Vitals', vi: 'Tốc độ & Core Web Vitals' },
        description: {
          en: 'Image optimization, lazy loading and code splitting checked before launch, not treated as an afterthought.',
          vi: 'Tối ưu hình ảnh, lazy loading và code splitting được kiểm tra trước khi ra mắt, không phải xử lý sau.',
        },
      },
      {
        title: { en: 'Start from a live template', vi: 'Bắt đầu từ mẫu website có sẵn' },
        description: {
          en: 'Browse our live template library across several industries and pick a starting point, or begin fully custom — either way the same UI/UX and SEO/AEO/GEO foundation applies.',
          vi: 'Xem thư viện mẫu website thật của Unitrux theo nhiều ngành và chọn điểm khởi đầu, hoặc bắt đầu thiết kế mới hoàn toàn — cả hai hướng đều có cùng nền tảng UI/UX và SEO/AEO/GEO.',
        },
      },
    ],
    process: [
      { title: { en: 'Discovery & sitemap', vi: 'Khảo sát & sơ đồ trang' }, description: { en: 'Goals, target keywords and the customer journey mapped into a page structure.', vi: 'Mục tiêu, từ khóa mục tiêu và hành trình khách hàng được chuyển thành sơ đồ trang.' } },
      { title: { en: 'Wireframe & clickable draft', vi: 'Wireframe & bản nháp có thể bấm' }, description: { en: 'Black-and-white drafts of key pages reviewed before visual design starts.', vi: 'Bản nháp trắng đen của các trang chính được duyệt trước khi bắt đầu thiết kế thị giác.' } },
      { title: { en: 'UI design & SEO structure', vi: 'Thiết kế UI & cấu trúc SEO' }, description: { en: 'Visual design and on-page SEO foundation (headings, metadata, schema) built in parallel.', vi: 'Thiết kế thị giác và nền tảng SEO on-page (heading, metadata, schema) được xây song song.' } },
      { title: { en: 'Build & QA', vi: 'Phát triển & kiểm tra' }, description: { en: 'Development, cross-device testing, and a speed/Core Web Vitals check before launch.', vi: 'Phát triển, kiểm tra đa thiết bị và kiểm tra tốc độ/Core Web Vitals trước khi ra mắt.' } },
      { title: { en: 'Launch & handover', vi: 'Ra mắt & bàn giao' }, description: { en: 'Analytics and Search Console connected, sitemap submitted, short guide handed over.', vi: 'Kết nối analytics và Search Console, khai báo sitemap, bàn giao hướng dẫn ngắn gọn.' } },
    ],
    deliverables: [
      { en: 'Site map & user journey', vi: 'Sơ đồ trang & hành trình người dùng' },
      { en: 'Responsive website, live and tested', vi: 'Website responsive, đã ra mắt và kiểm tra' },
      { en: 'On-page SEO foundation (structured data, metadata)', vi: 'Nền tảng SEO on-page (dữ liệu có cấu trúc, metadata)' },
      { en: 'Analytics & Search Console setup', vi: 'Thiết lập analytics & Search Console' },
    ],
    relatedServices: [
      { path: '/templates', label: { en: 'Browse template library', vi: 'Xem thư viện mẫu website' } },
      { path: '/seo-services', label: { en: 'SEO / AEO / GEO', vi: 'SEO/AEO/GEO' } },
      { path: '/ecommerce', label: { en: 'E-commerce & marketplace', vi: 'E-commerce & marketplace' } },
      { path: '/digital-solutions', label: { en: 'App & digital solutions', vi: 'Ứng dụng & giải pháp số' } },
    ],
  },
};

export const getServiceContent = (serviceKey) => servicesContent[serviceKey];
