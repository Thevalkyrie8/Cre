import { Link } from 'react-router-dom';

const principles = [
  {
    number: '01',
    title: 'Ai chịu trách nhiệm',
    titleEn: 'Who is responsible',
    body: 'Mỗi bài viết hiển thị tác giả hoặc nhóm biên tập chịu trách nhiệm. Người đọc có thể xem tiêu chuẩn biên tập và liên hệ với Unitrux khi cần làm rõ thông tin.',
    bodyEn: 'Each article identifies the author or editorial team responsible. Readers can review these standards and contact Unitrux when information needs clarification.',
  },
  {
    number: '02',
    title: 'Nội dung được tạo ra thế nào',
    titleEn: 'How content is made',
    body: 'Chúng tôi bắt đầu từ câu hỏi thực tế của doanh nghiệp, kinh nghiệm triển khai và nguồn chính thức phù hợp. Bài viết được kiểm tra về tính rõ ràng, tính hữu ích và các dữ kiện có thể xác minh trước khi xuất bản.',
    bodyEn: 'We start with real business questions, delivery experience, and relevant primary sources. Articles are checked for clarity, usefulness, and verifiable facts before publication.',
  },
  {
    number: '03',
    title: 'Vì sao bài viết tồn tại',
    titleEn: 'Why the article exists',
    body: 'Mục tiêu là giúp người đọc hiểu vấn đề và đưa ra quyết định tốt hơn. Chúng tôi không viết theo số lượng từ cố định, không đổi ngày để tạo cảm giác mới và không xuất bản hàng loạt chỉ để thu hút lượt tìm kiếm.',
    bodyEn: 'The goal is to help readers understand a problem and make a better decision. We do not target arbitrary word counts, change dates to appear fresh, or mass-publish solely for search traffic.',
  },
];

const ContentStandards = () => (
  <div className="theme-synced-page tw-bg-[#FAF8F5] tw-text-[#263B35]">
    <header className="tw-relative tw-overflow-hidden tw-px-4 tw-pb-20 tw-pt-36 sm:tw-pt-44">
      <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[radial-gradient(circle_at_15%_20%,rgba(13,94,77,.10),transparent_28%),radial-gradient(circle_at_86%_30%,rgba(230,140,35,.10),transparent_25%)]" />
      <div className="tw-relative tw-mx-auto tw-w-[min(74rem,100%)]">
        <p className="tw-m-0 tw-text-xs tw-font-black tw-uppercase tw-tracking-[.24em] tw-text-[#C5751E]" data-vi="Tiêu chuẩn nội dung" data-en="Content standards">Tiêu chuẩn nội dung</p>
        <h1 data-title-reveal className="master-title tw-mb-0 tw-mt-7 tw-max-w-5xl tw-font-editorial tw-text-[clamp(3.6rem,8vw,7.8rem)] tw-font-semibold tw-leading-[.82] tw-tracking-[-.06em] tw-text-[#0D4537]" data-vi="Nội dung dành cho người đọc trước tiên." data-en="People come first in our content.">Nội dung dành cho người đọc trước tiên.</h1>
        <p className="tw-mb-0 tw-mt-8 tw-max-w-3xl tw-text-lg tw-leading-8 tw-text-[#536A61]" data-vi="Unitrux xuất bản kiến thức để giải quyết câu hỏi thực tế, trình bày rõ điều chúng tôi biết, cách chúng tôi biết và ai chịu trách nhiệm về nội dung." data-en="Unitrux publishes knowledge to answer real questions and clearly explain what we know, how we know it, and who is accountable for the content.">Unitrux xuất bản kiến thức để giải quyết câu hỏi thực tế, trình bày rõ điều chúng tôi biết, cách chúng tôi biết và ai chịu trách nhiệm về nội dung.</p>
      </div>
    </header>

    <div>
      <section className="tw-px-4 tw-pb-24">
        <div className="tw-mx-auto tw-grid tw-w-[min(74rem,100%)] tw-gap-5 lg:tw-grid-cols-3">
          {principles.map((item) => (
            <article key={item.number} className="tw-rounded-[1.75rem] tw-border tw-border-[#0D5E4D]/15 tw-bg-[#FEF7EA] tw-p-7 tw-shadow-[0_28px_65px_-50px_rgba(13,69,55,.45)] sm:tw-p-9">
              <span className="tw-font-editorial tw-text-5xl tw-font-semibold tw-text-[#E68C23]">{item.number}</span>
              <h2 className="tw-mb-0 tw-mt-8 tw-font-editorial tw-text-3xl tw-font-semibold tw-text-[#0D4537]" data-vi={item.title} data-en={item.titleEn}>{item.title}</h2>
              <p className="tw-mb-0 tw-mt-5 tw-leading-7 tw-text-[#526860]" data-vi={item.body} data-en={item.bodyEn}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="editorial-process" className="tw-border-y tw-border-[#0D5E4D]/10 tw-bg-[#E7EFE9] tw-px-4 tw-py-24">
        <div className="tw-mx-auto tw-grid tw-w-[min(74rem,100%)] tw-gap-12 lg:tw-grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="tw-m-0 tw-text-xs tw-font-black tw-uppercase tw-tracking-[.22em] tw-text-[#C5751E]" data-vi="Quy trình biên tập" data-en="Editorial process">Quy trình biên tập</p>
            <h2 className="tw-mb-0 tw-mt-5 tw-font-editorial tw-text-5xl tw-font-semibold tw-leading-[.92] tw-text-[#0D4537]" data-vi="Rõ nguồn, rõ ngày, rõ giới hạn." data-en="Clear sources, dates, and limits.">Rõ nguồn, rõ ngày, rõ giới hạn.</h2>
          </div>
          <div className="tw-space-y-7 tw-leading-7 tw-text-[#486158]">
            <p data-vi="Khi sử dụng dữ liệu, nghiên cứu hoặc quy định bên ngoài, chúng tôi ưu tiên nguồn gốc và dẫn nguồn ngay tại phần nội dung liên quan. Ngày cập nhật chỉ thay đổi khi bài viết có chỉnh sửa đáng kể." data-en="When using external data, research, or rules, we prioritize primary sources and cite them near the relevant claim. Update dates change only when an article receives a meaningful revision.">Khi sử dụng dữ liệu, nghiên cứu hoặc quy định bên ngoài, chúng tôi ưu tiên nguồn gốc và dẫn nguồn ngay tại phần nội dung liên quan. Ngày cập nhật chỉ thay đổi khi bài viết có chỉnh sửa đáng kể.</p>
            <p data-vi="Công cụ tự động hoặc AI có thể hỗ trợ nghiên cứu, cấu trúc hoặc biên tập. Nội dung vẫn phải được con người kiểm tra trước khi xuất bản; chúng tôi sẽ công khai cách sử dụng khi điều đó cần thiết để người đọc hiểu nội dung được tạo ra như thế nào." data-en="Automation or AI may assist research, structure, or editing. A person must still check content before publication, and we disclose material use when readers would reasonably need it to understand how the content was made.">Công cụ tự động hoặc AI có thể hỗ trợ nghiên cứu, cấu trúc hoặc biên tập. Nội dung vẫn phải được con người kiểm tra trước khi xuất bản; chúng tôi sẽ công khai cách sử dụng khi điều đó cần thiết để người đọc hiểu nội dung được tạo ra như thế nào.</p>
            <p data-vi="Nếu phát hiện lỗi, chúng tôi sửa nội dung thay vì che giấu. Bạn có thể gửi góp ý hoặc yêu cầu làm rõ qua email bên dưới." data-en="If we find an error, we correct the content rather than hide it. You can send feedback or request clarification using the email below.">Nếu phát hiện lỗi, chúng tôi sửa nội dung thay vì che giấu. Bạn có thể gửi góp ý hoặc yêu cầu làm rõ qua email bên dưới.</p>
            <a href="mailto:info@unitrux.com?subject=Gop%20y%20noi%20dung%20Unitrux" className="tw-inline-flex tw-rounded-full tw-bg-[#0D5E4D] tw-px-6 tw-py-3 tw-font-bold tw-text-[#FFF9F1] tw-no-underline hover:tw-bg-[#E68C23]">info@unitrux.com</a>
          </div>
        </div>
      </section>

      <section id="ai-search" className="tw-bg-[#FAF8F5] tw-px-4 tw-py-24">
        <div className="tw-mx-auto tw-grid tw-w-[min(74rem,100%)] tw-gap-10 lg:tw-grid-cols-[1.05fr_.95fr] lg:tw-items-start">
          <div>
            <p className="tw-m-0 tw-text-xs tw-font-black tw-uppercase tw-tracking-[.22em] tw-text-[#C5751E]" data-vi="Tìm kiếm có AI" data-en="AI-powered search">Tìm kiếm có AI</p>
            <h2 className="tw-mb-0 tw-mt-5 tw-font-editorial tw-text-5xl tw-font-semibold tw-leading-[.92] tw-text-[#0D4537]" data-vi="SEO rõ ràng, không chạy theo mẹo GEO." data-en="Clear SEO, without GEO shortcuts.">SEO rõ ràng, không chạy theo mẹo GEO.</h2>
            <p className="tw-mb-0 tw-mt-7 tw-max-w-2xl tw-leading-7 tw-text-[#526860]" data-vi="Theo hướng dẫn chính thức của Google, AI Overviews và AI Mode vẫn dựa trên hệ thống tìm kiếm cốt lõi. Vì vậy Unitrux tập trung vào nội dung nguyên bản, có thể thu thập dữ liệu, cấu trúc dễ đọc, hình ảnh liên quan và trải nghiệm tốt trên mọi thiết bị." data-en="Google's official guidance says AI Overviews and AI Mode still rely on core Search systems. Unitrux therefore focuses on original content, crawlability, readable structure, relevant media, and a good experience across devices.">Theo hướng dẫn chính thức của Google, AI Overviews và AI Mode vẫn dựa trên hệ thống tìm kiếm cốt lõi. Vì vậy Unitrux tập trung vào nội dung nguyên bản, có thể thu thập dữ liệu, cấu trúc dễ đọc, hình ảnh liên quan và trải nghiệm tốt trên mọi thiết bị.</p>
            <a href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" target="_blank" rel="noopener noreferrer" className="tw-mt-7 tw-inline-flex tw-font-bold tw-text-[#0D5E4D] tw-underline tw-underline-offset-4" data-vi="Đọc hướng dẫn chính thức của Google ↗" data-en="Read Google's official guide ↗">Đọc hướng dẫn chính thức của Google ↗</a>
          </div>
          <div className="tw-rounded-[1.75rem] tw-border tw-border-[#0D5E4D]/15 tw-bg-[#FEF7EA] tw-p-7 sm:tw-p-9">
            <h3 className="tw-m-0 tw-font-editorial tw-text-3xl tw-font-semibold tw-text-[#0D4537]" data-vi="Những việc chúng tôi không làm" data-en="What we do not do">Những việc chúng tôi không làm</h3>
            <ul className="tw-mb-0 tw-mt-6 tw-space-y-4 tw-pl-5 tw-leading-7 tw-text-[#526860]">
              <li data-vi="Không tạo llms.txt chỉ để tác động thứ hạng trên Google." data-en="We do not create llms.txt solely to influence Google rankings.">Không tạo llms.txt chỉ để tác động thứ hạng trên Google.</li>
              <li data-vi="Không thêm schema hoặc đánh dấu “dành riêng cho AI” không được Google hỗ trợ." data-en="We do not add unsupported AI-only schema or markup.">Không thêm schema hoặc đánh dấu “dành riêng cho AI” không được Google hỗ trợ.</li>
              <li data-vi="Không tách hàng loạt trang theo mọi biến thể câu hỏi hoặc từ khóa dài." data-en="We do not mass-create pages for every query variation or long-tail keyword.">Không tách hàng loạt trang theo mọi biến thể câu hỏi hoặc từ khóa dài.</li>
              <li data-vi="Không mua đề cập giả hoặc viết lại nội dung chỉ để máy đọc." data-en="We do not buy inauthentic mentions or rewrite content only for machines.">Không mua đề cập giả hoặc viết lại nội dung chỉ để máy đọc.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="tw-px-4 tw-py-20">
        <div className="tw-mx-auto tw-flex tw-w-[min(74rem,100%)] tw-flex-col tw-items-start tw-justify-between tw-gap-6 sm:tw-flex-row sm:tw-items-center">
          <p className="tw-m-0 tw-max-w-2xl tw-font-editorial tw-text-3xl tw-font-semibold tw-leading-tight tw-text-[#0D4537]" data-vi="Đọc các bài viết và tự đánh giá nội dung theo những cam kết này." data-en="Read our articles and hold us to these commitments.">Đọc các bài viết và tự đánh giá nội dung theo những cam kết này.</p>
          <Link to="/news" className="content-standards-cta tw-rounded-full tw-border tw-border-[#0D5E4D]/25 tw-px-6 tw-py-3 tw-font-bold tw-text-[#0D5E4D] tw-no-underline hover:tw-bg-[#0D5E4D] hover:tw-text-[#FFF9F1]" data-vi="Xem bài viết" data-en="Read articles">Xem bài viết</Link>
        </div>
      </section>
    </div>
  </div>
);

export default ContentStandards;
