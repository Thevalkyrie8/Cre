// Trust signals for the Cluster F money pages. Playbook §18: only real,
// verifiable statements — no fabricated project counts, client counts, awards
// or ratings. Where a real number would strengthen the page but Unitrux has
// not supplied one, the item stays qualitative and a TODO note records what
// number would go there.

export const TODO = '[UNITRUX CẦN BỔ SUNG]';

export const serviceTrust = {
  '/photography-video': {
    headingVi: 'Vì sao doanh nghiệp chọn Unitrux cho dịch vụ quay video',
    headingEn: 'Why businesses choose Unitrux for video production',
    items: [
      {
        vi: 'Ekip sản xuất và studio đặt tại TP.HCM — quay tại studio hoặc di chuyển đến địa điểm của bạn trong khu vực TP.HCM và các tỉnh lân cận.',
        en: 'Production crew and studio based in Ho Chi Minh City — shoot in-studio or on location across HCMC and nearby provinces.',
      },
      {
        vi: 'Portfolio là video khách hàng thật đang phát trên trang này — nội dung social cho spa và video thương hiệu tại Biên Hòa, không phải footage minh họa.',
        en: 'The portfolio on this page is real client work — spa social content and a Biên Hòa brand film, not stock footage.',
      },
      {
        vi: 'Một buổi sản xuất được lên kế hoạch để tạo nhiều phiên bản cho Facebook, TikTok, YouTube, website và sàn thương mại điện tử.',
        en: 'One production is planned to yield multiple versions for Facebook, TikTok, YouTube, websites and marketplaces.',
      },
      {
        vi: 'Báo giá tách rõ từng hạng mục — ngày quay, bối cảnh, thiết bị, nhân sự, số phiên bản, mức hậu kỳ — không gộp thành một con số.',
        en: 'Quotes itemize every line — shoot days, locations, equipment, crew, version count, post-production level — never a single lump sum.',
      },
    ],
    // TODO: real numbers Unitrux may publish (projects delivered, industries
    // served, years of production experience).
    metricsTodo: TODO,
  },

  '/product-photography': {
    headingVi: 'Vì sao doanh nghiệp chọn Unitrux cho dịch vụ chụp ảnh sản phẩm',
    headingEn: 'Why businesses choose Unitrux for product photography',
    items: [
      {
        vi: 'Studio và ekip chụp ảnh đặt tại TP.HCM — chụp tại studio, tại cửa hàng/showroom của bạn trong khu vực TP.HCM, hoặc di chuyển đến các tỉnh lân cận.',
        en: 'Photography studio and crew based in Ho Chi Minh City — shoot in-studio, at your store/showroom in HCMC, or on location in nearby provinces.',
      },
      {
        vi: 'Ảnh được chụp theo một tiêu chuẩn hình ảnh nhất quán để website, sàn TMĐT và mạng xã hội cùng mang một nhận diện.',
        en: 'Images are shot to one consistent visual standard so website, marketplace and social all carry the same identity.',
      },
      {
        vi: 'Chụp được cả ảnh nền trắng chuẩn sàn và ảnh concept/lifestyle trong cùng một buổi khi được lên kế hoạch từ bước brief.',
        en: 'Both marketplace-ready white-background shots and concept/lifestyle images in one session when planned from the brief stage.',
      },
      {
        vi: 'Bàn giao file đã căn chỉnh kích thước và tỷ lệ theo đúng yêu cầu của từng kênh, không phải một bộ ảnh "dùng chung".',
        en: 'Files delivered sized and cropped to each channel’s actual requirements, not one "one-size-fits-all" set.',
      },
    ],
    metricsTodo: TODO,
  },
};

export const getServiceTrust = (path) => serviceTrust[path] || null;
