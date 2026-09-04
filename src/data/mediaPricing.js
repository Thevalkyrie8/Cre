// Real Unitrux media/photography pricing data — source:
// Bang_gia_dich_vu_Unitrux_website_chi_tiet_media.xlsx, sheet "Media - Quay chup".
// Prices are VND, starting-price reference figures ("Từ ..."), not final quotes.
// Convention from the sheet: 1 buổi (session) ≈ up to 4 hours, 1 ngày (day) ≈ up to 8 hours.

const fmt = (n) => n.toLocaleString('vi-VN');

export const mediaGroups = [
  {
    id: 'product-photo',
    titleVi: 'Chụp ảnh sản phẩm',
    titleEn: 'Product Photography',
    packages: [
      {
        name: 'E-commerce Basic',
        price: 1200000,
        unit: 'buổi',
        unitEn: 'session',
        durationVi: 'Tối đa 2 giờ',
        durationEn: 'Up to 2 hours',
        outputVi: 'Tối đa 10 sản phẩm; ~20 ảnh hậu kỳ',
        outputEn: 'Up to 10 products; ~20 edited photos',
        includesVi: 'Setup ánh sáng cơ bản; nền đơn sắc; chụp nhiều góc; cân màu; retouch tiêu chuẩn; 1 vòng chỉnh sửa.',
        includesEn: 'Basic lighting setup; solid-color background; multiple angles; color correction; standard retouching; 1 revision round.',
        audienceVi: 'Shop online, catalog, website, sàn TMĐT',
        audienceEn: 'Online shops, catalogs, websites, marketplaces',
        excludesVi: 'Không gồm styling phức tạp, model, studio, props đặc thù.',
        excludesEn: 'Complex styling, models, studio, and specialty props not included.',
        ctaVi: 'Nhận báo giá',
        ctaEn: 'Get a quote',
      },
      {
        name: 'Product Branding',
        price: 2800000,
        unit: 'buổi',
        unitEn: 'session',
        durationVi: 'Tối đa 4 giờ',
        durationEn: 'Up to 4 hours',
        outputVi: 'Tối đa 15 sản phẩm; ~30–35 ảnh hậu kỳ',
        outputEn: 'Up to 15 products; ~30–35 edited photos',
        includesVi: 'Concept nhẹ; setup ánh sáng; bố cục thương hiệu; ảnh hero/detail/lifestyle cơ bản; retouch; 1–2 vòng chỉnh sửa.',
        includesEn: 'Light concept direction; lighting setup; brand-led composition; basic hero/detail/lifestyle shots; retouching; 1–2 revision rounds.',
        audienceVi: 'Brand cần bộ ảnh social + website',
        audienceEn: 'Brands needing a photo set for social + website',
        excludesVi: 'Không gồm model/talent, studio, set lớn, đạo cụ đặc thù.',
        excludesEn: 'Models/talent, studio, large sets, and specialty props not included.',
        ctaVi: 'Nhận báo giá',
        ctaEn: 'Get a quote',
      },
      {
        name: 'Product Campaign',
        price: 5500000,
        unit: 'ngày',
        unitEn: 'day',
        durationVi: 'Tối đa 8 giờ',
        durationEn: 'Up to 8 hours',
        outputVi: 'Tối đa 20 sản phẩm; ~50 ảnh hậu kỳ',
        outputEn: 'Up to 20 products; ~50 edited photos',
        includesVi: 'Định hướng concept; shot list; 2–3 setup; hero/detail/lifestyle; retouch nâng cao chọn lọc; bàn giao đa kích thước.',
        includesEn: 'Concept direction; shot list; 2–3 setups; hero/detail/lifestyle shots; selective advanced retouching; multi-size delivery.',
        audienceVi: 'Campaign ra mắt sản phẩm, key visual',
        audienceEn: 'Product launch campaigns, key visuals',
        excludesVi: 'Chi phí art/props lớn, model, makeup, studio và location tính riêng.',
        excludesEn: 'Large art/props, models, makeup, studio, and location costs are billed separately.',
        ctaVi: 'Nhận concept',
        ctaEn: 'Get a concept',
      },
    ],
  },
  {
    id: 'food-beverage',
    titleVi: 'Food & Beverage',
    titleEn: 'Food & Beverage',
    packages: [
      {
        name: 'Menu Basic',
        price: 2000000,
        unit: 'buổi',
        unitEn: 'session',
        durationVi: 'Tối đa 3 giờ',
        durationEn: 'Up to 3 hours',
        outputVi: 'Khoảng 8–10 món; ~20 ảnh hậu kỳ',
        outputEn: '~8–10 dishes; ~20 edited photos',
        includesVi: 'Setup ánh sáng; chụp món; góc top/45°/detail; cân màu; retouch cơ bản.',
        includesEn: 'Lighting setup; dish photography; top/45°/detail angles; color correction; basic retouching.',
        audienceVi: 'Cafe, nhà hàng, menu online',
        audienceEn: 'Cafes, restaurants, online menus',
        excludesVi: 'Food stylist, nguyên liệu/props đặc thù và studio tính riêng.',
        excludesEn: 'Food stylist, specialty ingredients/props, and studio are billed separately.',
        ctaVi: 'Nhận báo giá',
        ctaEn: 'Get a quote',
      },
      {
        name: 'Menu Pro',
        price: 3900000,
        unit: 'buổi',
        unitEn: 'session',
        durationVi: 'Tối đa 4 giờ',
        durationEn: 'Up to 4 hours',
        outputVi: 'Khoảng 15–20 món; ~35 ảnh hậu kỳ',
        outputEn: '~15–20 dishes; ~35 edited photos',
        includesVi: 'Concept hình ảnh; nhiều layout; ảnh món + không gian/detail; retouch; tối ưu social/website.',
        includesEn: 'Visual concept; multiple layouts; dish + space/detail shots; retouching; social/website optimization.',
        audienceVi: 'Nhà hàng cần refresh toàn bộ menu',
        audienceEn: 'Restaurants refreshing their whole menu',
        excludesVi: 'Stylist chuyên nghiệp, talent và props đặc thù tính riêng.',
        excludesEn: 'Professional stylist, talent, and specialty props are billed separately.',
        ctaVi: 'Nhận báo giá',
        ctaEn: 'Get a quote',
      },
    ],
  },
  {
    id: 'space-interior',
    titleVi: 'Không gian / Nội thất / Dịch vụ',
    titleEn: 'Space / Interior / Service',
    packages: [
      {
        name: 'Space Basic',
        price: 2000000,
        unit: 'buổi',
        unitEn: 'session',
        durationVi: 'Tối đa 3 giờ',
        durationEn: 'Up to 3 hours',
        outputVi: '~20 ảnh hậu kỳ',
        outputEn: '~20 edited photos',
        includesVi: 'Chụp toàn cảnh, góc rộng, detail; cân sáng/màu; chỉnh phối cảnh cơ bản.',
        includesEn: 'Wide/overview and detail shots; light/color correction; basic perspective correction.',
        audienceVi: 'Spa, salon, showroom, văn phòng, cửa hàng',
        audienceEn: 'Spas, salons, showrooms, offices, retail stores',
        excludesVi: 'Dọn/set décor lớn, travel xa, drone tính riêng.',
        excludesEn: 'Large décor prep, long-distance travel, and drone are billed separately.',
        ctaVi: 'Đặt lịch chụp',
        ctaEn: 'Book a shoot',
      },
      {
        name: 'Space Premium',
        price: 3600000,
        unit: 'buổi',
        unitEn: 'session',
        durationVi: 'Tối đa 4 giờ',
        durationEn: 'Up to 4 hours',
        outputVi: '~35 ảnh hậu kỳ',
        outputEn: '~35 edited photos',
        includesVi: 'Không gian + chi tiết + trải nghiệm dịch vụ + nhân sự cơ bản; retouch đồng bộ brand.',
        includesEn: 'Space + details + service experience + basic staff shots; brand-consistent retouching.',
        audienceVi: 'Spa/salon/office cần bộ ảnh truyền thông',
        audienceEn: 'Spas/salons/offices needing a media-ready photo set',
        excludesVi: 'Model chuyên nghiệp, makeup, drone, set design tính riêng.',
        excludesEn: 'Professional models, makeup, drone, and set design are billed separately.',
        ctaVi: 'Đặt lịch chụp',
        ctaEn: 'Book a shoot',
      },
    ],
  },
  {
    id: 'brand-personal',
    titleVi: 'Brand / Nhân sự',
    titleEn: 'Brand / Personal',
    packages: [
      {
        name: 'Personal & Team Brand',
        price: 2800000,
        unit: 'buổi',
        unitEn: 'session',
        durationVi: 'Tối đa 3 giờ',
        durationEn: 'Up to 3 hours',
        outputVi: '~20 ảnh hậu kỳ',
        outputEn: '~20 edited photos',
        includesVi: 'Portrait cá nhân/đội ngũ; 1 địa điểm; setup ánh sáng; hướng dẫn pose cơ bản; retouch.',
        includesEn: 'Individual/team portraits; 1 location; lighting setup; basic pose direction; retouching.',
        audienceVi: 'Founder, đội ngũ, profile doanh nghiệp',
        audienceEn: 'Founders, teams, company profiles',
        excludesVi: 'Studio, makeup, wardrobe stylist tính riêng.',
        excludesEn: 'Studio, makeup, and wardrobe stylist are billed separately.',
        ctaVi: 'Đặt lịch chụp',
        ctaEn: 'Book a shoot',
      },
      {
        name: 'Brand Story',
        price: 4700000,
        unit: 'buổi',
        unitEn: 'session',
        durationVi: 'Tối đa 4 giờ',
        durationEn: 'Up to 4 hours',
        outputVi: '~35 ảnh hậu kỳ',
        outputEn: '~35 edited photos',
        includesVi: 'Ảnh founder/team/sản phẩm/dịch vụ/không gian theo câu chuyện thương hiệu; shot list; retouch.',
        includesEn: 'Founder/team/product/service/space photos telling the brand story; shot list; retouching.',
        audienceVi: 'Website, PR, social, company profile',
        audienceEn: 'Website, PR, social, company profile',
        excludesVi: 'Talent ngoài doanh nghiệp, studio và location phí tính riêng.',
        excludesEn: 'External talent, studio, and location fees are billed separately.',
        ctaVi: 'Nhận concept',
        ctaEn: 'Get a concept',
      },
    ],
  },
  {
    id: 'video-short-form',
    titleVi: 'Video short-form',
    titleEn: 'Short-Form Video',
    packages: [
      {
        name: 'Reel / TikTok Basic',
        price: 2000000,
        unit: 'video',
        unitEn: 'video',
        durationVi: 'Quay tối đa 3 giờ',
        durationEn: 'Up to 3 hours of filming',
        outputVi: '01 video 30–60 giây',
        outputEn: '1 video, 30–60 seconds',
        includesVi: 'Concept cơ bản; quay 1 địa điểm; dựng nhịp; subtitle; nhạc/SFX; color; 1–2 vòng chỉnh sửa.',
        includesEn: 'Basic concept; filming at 1 location; paced edit; subtitles; music/SFX; color grading; 1–2 revision rounds.',
        audienceVi: 'Reels, TikTok, Facebook short video',
        audienceEn: 'Reels, TikTok, Facebook short video',
        excludesVi: 'Talent, studio, props lớn, motion phức tạp tính riêng.',
        excludesEn: 'Talent, studio, large props, and complex motion are billed separately.',
        ctaVi: 'Nhận concept video',
        ctaEn: 'Get a video concept',
      },
      {
        name: '3 Video Pack',
        price: 4700000,
        unit: 'gói',
        unitEn: 'package',
        durationVi: 'Quay batch tối đa 4 giờ',
        durationEn: 'Up to 4 hours of batch filming',
        outputVi: '03 video 20–60 giây/video',
        outputEn: '3 videos, 20–60 seconds each',
        includesVi: 'Hướng nội dung; shot list; quay batch; dựng; subtitle; color; nhạc/SFX; định dạng social.',
        includesEn: 'Content direction; shot list; batch filming; editing; subtitles; color grading; music/SFX; social formats.',
        audienceVi: 'SME cần content đều trong tháng',
        audienceEn: 'SMEs needing a steady monthly cadence',
        excludesVi: 'Không gồm diễn viên/KOL/KOC, studio, props đặc thù.',
        excludesEn: 'Actors/KOL/KOC, studio, and specialty props not included.',
        ctaVi: 'Nhận concept video',
        ctaEn: 'Get a video concept',
      },
      {
        name: '5 Video Pack',
        price: 7900000,
        unit: 'gói',
        unitEn: 'package',
        durationVi: 'Quay batch tối đa 8 giờ',
        durationEn: 'Up to 8 hours of batch filming',
        outputVi: '05 video 20–60 giây/video',
        outputEn: '5 videos, 20–60 seconds each',
        includesVi: 'Content direction; 5 shot list; quay batch; dựng đồng bộ; subtitle; color; 2 vòng chỉnh sửa/video.',
        includesEn: 'Content direction; 5 shot lists; batch filming; synchronized editing; subtitles; color grading; 2 revision rounds/video.',
        audienceVi: 'Brand cần batch content / campaign',
        audienceEn: 'Brands needing batch content / a campaign',
        excludesVi: 'Talent/KOL/KOC, studio, props, travel tính riêng.',
        excludesEn: 'Talent/KOL/KOC, studio, props, and travel are billed separately.',
        ctaVi: 'Nhận concept video',
        ctaEn: 'Get a video concept',
      },
    ],
  },
  {
    id: 'video-ads',
    titleVi: 'Video quảng cáo',
    titleEn: 'Advertising Video',
    packages: [
      {
        name: 'Commercial Ads',
        price: 5500000,
        unit: 'video',
        unitEn: 'video',
        durationVi: 'Tối đa 1 ngày quay',
        durationEn: 'Up to 1 day of filming',
        outputVi: '01 video 30–90 giây + 01 cutdown',
        outputEn: '1 video, 30–90 seconds, plus 1 cutdown',
        includesVi: 'Concept; kịch bản/shot list; quay; dựng; color; subtitle; sound design cơ bản; 2 vòng chỉnh sửa.',
        includesEn: 'Concept; script/shot list; filming; editing; color grading; subtitles; basic sound design; 2 revision rounds.',
        audienceVi: 'Quảng cáo Meta/TikTok/website',
        audienceEn: 'Meta/TikTok/website advertising',
        excludesVi: 'Casting, voice-over chuyên nghiệp, studio, set design, VFX lớn tính riêng.',
        excludesEn: 'Casting, professional voice-over, studio, set design, and heavy VFX are billed separately.',
        ctaVi: 'Nhận proposal',
        ctaEn: 'Get a proposal',
      },
    ],
  },
  {
    id: 'combo-media',
    titleVi: 'Combo Media',
    titleEn: 'Combo Media',
    packages: [
      {
        name: 'Photo + 3 Reels',
        price: 7100000,
        unit: 'gói',
        unitEn: 'package',
        durationVi: 'Tối đa 1 ngày',
        durationEn: 'Up to 1 day',
        outputVi: '~30 ảnh hậu kỳ + 03 video short-form',
        outputEn: '~30 edited photos + 3 short-form videos',
        includesVi: 'Concept đồng bộ; quay/chụp batch; ảnh hero/detail/lifestyle; 3 reels; hậu kỳ; social formats.',
        includesEn: 'Unified concept; batch shooting; hero/detail/lifestyle photos; 3 reels; post-production; social formats.',
        audienceVi: 'Doanh nghiệp cần bộ media 1 tháng',
        audienceEn: 'Businesses needing a month\'s worth of media',
        excludesVi: 'Talent, studio, props, travel và chi phí bên thứ ba tính riêng.',
        excludesEn: 'Talent, studio, props, travel, and third-party costs are billed separately.',
        ctaVi: 'Nhận báo giá combo',
        ctaEn: 'Get a combo quote',
      },
      {
        name: 'Campaign Media Day',
        price: 11900000,
        unit: 'ngày',
        unitEn: 'day',
        durationVi: 'Tối đa 8 giờ',
        durationEn: 'Up to 8 hours',
        outputVi: '~50 ảnh hậu kỳ + 05 video short-form',
        outputEn: '~50 edited photos + 5 short-form videos',
        includesVi: 'Pre-production; concept/shot list; 1 ngày quay/chụp; nhiều setup; hậu kỳ ảnh/video; format đa kênh.',
        includesEn: 'Pre-production; concept/shot list; 1 day of filming/shooting; multiple setups; photo/video post-production; multi-channel formats.',
        audienceVi: 'Ra mắt thương hiệu/sản phẩm, chiến dịch tháng',
        audienceEn: 'Brand/product launches, monthly campaigns',
        excludesVi: 'Talent/KOL, studio, set lớn, drone, travel tính riêng.',
        excludesEn: 'Talent/KOL, studio, large sets, drone, and travel are billed separately.',
        ctaVi: 'Nhận proposal',
        ctaEn: 'Get a proposal',
      },
    ],
  },
  {
    id: 'livestream-studio',
    titleVi: 'Livestream / Studio',
    titleEn: 'Livestream / Studio',
    packages: [
      {
        name: 'Setup góc livestream cơ bản',
        nameEn: 'Basic livestream corner setup',
        price: 5500000,
        unit: 'dự án',
        unitEn: 'project',
        durationVi: 'Theo khảo sát',
        durationEn: 'Based on a site survey',
        outputVi: '01 phương án setup + hướng dẫn vận hành',
        outputEn: '1 setup plan + an operating guide',
        includesVi: 'Khảo sát nhu cầu; bố trí góc máy/ánh sáng/phông; đề xuất thiết bị; setup/cân chỉnh cơ bản; test hình/âm thanh.',
        includesEn: 'Needs survey; camera angle/lighting/backdrop layout; equipment recommendations; basic setup/calibration; video/audio testing.',
        audienceVi: 'Shop, spa, salon, SME livestream bán hàng',
        audienceEn: 'Shops, spas, salons, SMEs selling via livestream',
        excludesVi: 'Giá thiết bị, nội thất, thi công điện/mạng và vật tư mua ngoài tính riêng.',
        excludesEn: 'Equipment cost, furnishing, electrical/network work, and outside materials are billed separately.',
        ctaVi: 'Khảo sát setup',
        ctaEn: 'Book a setup survey',
      },
      {
        name: 'Setup phòng livestream nâng cao',
        nameEn: 'Advanced livestream room setup',
        price: 11900000,
        unit: 'dự án',
        unitEn: 'project',
        durationVi: 'Theo khảo sát',
        durationEn: 'Based on a site survey',
        outputVi: 'Layout + setup + test workflow',
        outputEn: 'Layout + setup + workflow test',
        includesVi: 'Tư vấn layout; nhiều góc quay; lighting; audio; background; cấu hình streaming cơ bản; test workflow; hướng dẫn team.',
        includesEn: 'Layout consulting; multiple camera angles; lighting; audio; backgrounds; basic streaming configuration; workflow testing; team training.',
        audienceVi: 'Brand livestream thường xuyên',
        audienceEn: 'Brands livestreaming regularly',
        excludesVi: 'Thiết bị, nội thất, thi công, máy tính/encoder và phần mềm trả phí tính riêng.',
        excludesEn: 'Equipment, furnishing, construction, computer/encoder, and paid software are billed separately.',
        ctaVi: 'Khảo sát setup',
        ctaEn: 'Book a setup survey',
      },
    ],
  },
];

// Sheet's own "GỢI Ý HIỂN THỊ – NGẮN GỌN" — a 5-line simplified summary, used for the
// page's hero/overview strip before the full detailed groups below it.
export const mediaOverview = [
  { titleVi: 'Chụp ảnh sản phẩm', titleEn: 'Product Photography', price: 1200000, unit: 'buổi', unitEn: 'session', descVi: 'Ảnh sản phẩm chuẩn website, social, catalog và quảng cáo.', descEn: 'Product photos ready for website, social, catalog, and ads.', ctaVi: 'Nhận báo giá', ctaEn: 'Get a quote' },
  { titleVi: 'Chụp không gian & thương hiệu', titleEn: 'Space & Brand Photography', price: 2000000, unit: 'buổi', unitEn: 'session', descVi: 'Không gian, dịch vụ, đội ngũ và câu chuyện thương hiệu.', descEn: 'Spaces, services, teams, and brand storytelling.', ctaVi: 'Đặt lịch chụp', ctaEn: 'Book a shoot' },
  { titleVi: 'Video Reels / TikTok', titleEn: 'Reels / TikTok Video', price: 2000000, unit: 'video', unitEn: 'video', descVi: 'Quay + dựng video ngắn phù hợp hành vi người xem và mục tiêu chuyển đổi.', descEn: 'Filmed and edited short-form video matched to viewer behavior and conversion goals.', ctaVi: 'Nhận concept', ctaEn: 'Get a concept' },
  { titleVi: 'Combo Photo + Video', titleEn: 'Photo + Video Combo', price: 7100000, unit: 'gói', unitEn: 'package', descVi: 'Bộ ảnh và video đồng bộ để sử dụng đa kênh trong một chiến dịch.', descEn: 'A synchronized photo and video set for multi-channel use in one campaign.', ctaVi: 'Nhận báo giá combo', ctaEn: 'Get a combo quote' },
  { titleVi: 'Setup phòng livestream', titleEn: 'Livestream Room Setup', price: 5500000, unit: 'dự án', unitEn: 'project', descVi: 'Tư vấn và setup góc/phòng livestream theo nhu cầu thực tế của doanh nghiệp.', descEn: 'Consulting and setup for a livestream corner/room fitted to real business needs.', ctaVi: 'Khảo sát setup', ctaEn: 'Book a setup survey' },
];

// Sheet "Media - Quay chup" bottom section — media-specific add-ons.
export const mediaAddOns = [
  { nameVi: 'Giờ quay/chụp bổ sung', nameEn: 'Additional filming/shooting hour', price: 650000, unit: 'giờ', unitEn: 'hour', noteVi: 'Áp dụng khi vượt thời lượng gói đã chốt', noteEn: 'Applies when a package\'s confirmed duration is exceeded', hardPrice: true },
  { nameVi: 'Hậu kỳ ảnh bổ sung', nameEn: 'Additional photo editing', price: 40000, unit: 'ảnh', unitEn: 'photo', noteVi: 'Retouch tiêu chuẩn theo style của bộ ảnh', noteEn: 'Standard retouching matching the set\'s style', hardPrice: true },
  { nameVi: 'Retouch nâng cao', nameEn: 'Advanced retouching', price: 120000, unit: 'ảnh', unitEn: 'photo', noteVi: 'Xử lý chi tiết, compositing đơn giản', noteEn: 'Detailed retouching, simple compositing', hardPrice: true },
  { nameVi: 'Video cutdown/phiên bản bổ sung', nameEn: 'Additional video cutdown/version', price: 400000, unit: 'video', unitEn: 'video', noteVi: 'Cắt lại từ footage/video chính, không quay mới', noteEn: 'Re-cut from the main footage/video, no new filming', hardPrice: true },
  { nameVi: 'Tỷ lệ khung hình bổ sung', nameEn: 'Additional aspect ratio', price: 160000, unit: 'phiên bản', unitEn: 'version', noteVi: 'Ví dụ 9:16 / 1:1 / 16:9 ngoài phạm vi gói', noteEn: 'e.g. 9:16 / 1:1 / 16:9 outside the package scope', hardPrice: true },
  { nameVi: 'Phụ đề tiếng Anh', nameEn: 'English subtitles', price: 240000, unit: 'video', unitEn: 'video', noteVi: 'Dịch và chèn subtitle cơ bản', noteEn: 'Basic subtitle translation and insertion', hardPrice: true },
  { nameVi: 'Vòng chỉnh sửa video bổ sung', nameEn: 'Additional video revision round', price: 240000, unit: 'vòng', unitEn: 'round', noteVi: 'Ngoài số vòng chỉnh sửa của gói', noteEn: 'Beyond the package\'s included revisions', hardPrice: true },
  { nameVi: 'Studio / location', nameEn: 'Studio / location', price: null, unit: 'theo thực tế', unitEn: 'at cost', noteVi: 'Báo theo chi phí thuê thực tế và yêu cầu dự án', noteEn: 'Quoted at actual rental cost and project requirements', hardPrice: false },
  { nameVi: 'Talent / model / makeup / props', nameEn: 'Talent / model / makeup / props', price: null, unit: 'theo thực tế', unitEn: 'at cost', noteVi: 'Báo giá riêng theo concept và lựa chọn nhân sự/vật tư', noteEn: 'Quoted separately based on concept and personnel/material chosen', hardPrice: false },
  { nameVi: 'Di chuyển ngoài khu vực', nameEn: 'Out-of-area travel', price: null, unit: 'theo thực tế', unitEn: 'at cost', noteVi: 'Tính theo địa điểm, nhân sự và thiết bị', noteEn: 'Based on location, personnel, and equipment', hardPrice: false },
  { nameVi: 'Triển khai gấp', nameEn: 'Rush delivery', price: null, unit: 'theo scope', unitEn: 'per scope', noteVi: 'Phụ phí tùy mức độ rút ngắn timeline', noteEn: 'Surcharge depends on how much the timeline is shortened', hardPrice: false },
];

// What every package price already covers vs. what is quoted on top — pulled
// out of the sheet convention line so the page can show it as a clear two-column
// section instead of one dense sentence.
export const mediaPriceInclusions = {
  includedVi: [
    'Lên ý tưởng / concept ở mức của gói đã chọn',
    'Setup ánh sáng và thiết bị quay/chụp tiêu chuẩn',
    'Nhân sự ekip cơ bản cho buổi quay/chụp',
    'Cân màu, hậu kỳ và retouch tiêu chuẩn theo gói',
    'Số vòng chỉnh sửa ghi trong từng gói',
    'Xuất file theo định dạng nêu trong phần "Đầu ra" của gói',
  ],
  includedEn: [
    'Concept development at the selected package level',
    'Standard lighting and camera/photo equipment setup',
    'Core crew for the shoot',
    'Color correction, post-production and standard retouching per package',
    'The revision rounds stated in each package',
    'File export in the formats listed under each package’s "Output"',
  ],
  excludedVi: [
    'VAT (nếu áp dụng)',
    'Thuê studio hoặc địa điểm quay ngoài',
    'Talent, người mẫu, KOL/KOC, makeup, stylist',
    'Đạo cụ đặc thù, thi công bối cảnh lớn',
    'Voice-over chuyên nghiệp, motion graphics / VFX lớn',
    'Di chuyển ngoài khu vực TP.HCM và chi phí bên thứ ba',
    'Giờ quay/chụp, tỷ lệ khung hình, vòng chỉnh sửa vượt phạm vi gói (xem bảng Add-on)',
  ],
  excludedEn: [
    'VAT (where applicable)',
    'Studio or external location rental',
    'Talent, models, KOL/KOC, makeup, stylists',
    'Specialty props, large set construction',
    'Professional voice-over, heavy motion graphics / VFX',
    'Travel outside Ho Chi Minh City and third-party costs',
    'Filming/shooting hours, aspect ratios or revision rounds beyond the package scope (see the add-on table)',
  ],
};

// Quy trình sản xuất – minh bạch: the end-to-end flow from first contact to
// delivery, shown as a short numbered path so the pricing page has a clear
// conversion route into the brief form, not just tables.
export const mediaBriefSteps = [
  {
    titleVi: 'Tiếp nhận yêu cầu',
    titleEn: 'Receive the request',
    descVi: 'Bạn gửi form brief bên dưới hoặc nhắn Zalo: mục tiêu, ý tưởng, loại dịch vụ, số sản phẩm/không gian, số ảnh/video, nền tảng và deadline dự kiến.',
    descEn: 'You send the brief form below or a Zalo message: goal, idea, service type, number of products/spaces, photo/video count, platforms and expected deadline.',
  },
  {
    titleVi: 'Tư vấn & báo giá cụ thể',
    titleEn: 'Advise & quote in detail',
    descVi: 'Unitrux xác nhận concept, số buổi, studio/địa điểm, nhân sự và add-on, rồi gửi báo giá ghi rõ từng hạng mục và điều kiện thanh toán.',
    descEn: 'Unitrux confirms the concept, sessions, studio/location, crew and add-ons, then sends a quote itemizing every line and the payment terms.',
  },
  {
    titleVi: 'Sản xuất theo kế hoạch',
    titleEn: 'Produce to plan',
    descVi: 'Sau khi bạn duyệt báo giá, hai bên chốt lịch và Unitrux quay/chụp theo shot list đã thống nhất.',
    descEn: 'Once you approve the quote, both sides lock the schedule and Unitrux shoots to the agreed shot list.',
  },
  {
    titleVi: 'Hậu kỳ & bàn giao',
    titleEn: 'Post & hand over',
    descVi: 'Dựng, cân màu và hậu kỳ theo tiêu chuẩn đã cam kết; bàn giao đúng tỷ lệ khung hình và đúng thời gian.',
    descEn: 'Edit, colour and post to the committed standard; deliver at the right aspect ratios, on time.',
  },
];

// Worked examples of how a final quote forms — NOT price commitments. Each is a
// documented combination of published package + published add-on line items so
// the arithmetic is transparent and traceable to the tables on the page.
export const mediaQuoteExamples = [
  {
    titleVi: 'Shop online cần bộ ảnh sàn TMĐT + vài tỷ lệ social',
    titleEn: 'Online shop needing marketplace photos + a few social ratios',
    disclaimerVi: 'Ví dụ minh hoạ cách cộng gói và add-on — không phải báo giá cam kết.',
    disclaimerEn: 'An illustration of how a package and add-ons combine — not a committed quote.',
    lines: [
      { labelVi: 'Chụp ảnh sản phẩm — E-commerce Basic (1 buổi)', labelEn: 'Product Photography — E-commerce Basic (1 session)', amount: 1200000 },
      { labelVi: 'Hậu kỳ ảnh bổ sung × 10', labelEn: 'Additional photo editing × 10', amount: 400000 },
      { labelVi: 'Tỷ lệ khung hình bổ sung × 2 (1:1, 4:5)', labelEn: 'Additional aspect ratio × 2 (1:1, 4:5)', amount: 320000 },
    ],
  },
  {
    titleVi: 'Thương hiệu cần bộ media 1 tháng: ảnh + 3 Reels',
    titleEn: 'Brand needing a month of media: photos + 3 Reels',
    disclaimerVi: 'Ví dụ minh hoạ — chi phí thật phụ thuộc concept, địa điểm và các hạng mục thuê ngoài.',
    disclaimerEn: 'An illustration — the real cost depends on concept, location and any outside rentals.',
    lines: [
      { labelVi: 'Combo Media — Photo + 3 Reels (1 ngày)', labelEn: 'Combo Media — Photo + 3 Reels (1 day)', amount: 7100000 },
      { labelVi: 'Phụ đề tiếng Anh × 3 video', labelEn: 'English subtitles × 3 videos', amount: 720000 },
      { labelVi: 'Giờ quay/chụp bổ sung × 2', labelEn: 'Additional filming/shooting hours × 2', amount: 1300000 },
    ],
  },
];

export const mediaPricingCopy = {
  titleVi: 'Bảng giá quay video và chụp ảnh tại TP.HCM',
  titleEn: 'Video and Photography Pricing in Ho Chi Minh City',
  introVi: 'Giá tham khảo để dự trù ngân sách quay video và chụp ảnh tại TP.HCM. Giá chính thức phụ thuộc concept, số lượng sản phẩm, số video, thời lượng, địa điểm, hậu kỳ và các chi phí bên thứ ba.',
  introEn: 'Reference prices for planning a video or photography budget in Ho Chi Minh City. The official price depends on the concept, product quantity, video count, duration, location, post-production, and third-party costs.',
  conventionVi: 'Quy ước: 1 buổi ≈ tối đa 4 giờ | 1 ngày ≈ tối đa 8 giờ | Giá chưa bao gồm VAT (nếu áp dụng), studio, talent/model, makeup, props đặc thù, travel và các chi phí thuê ngoài.',
  conventionEn: 'Convention: 1 session ≈ up to 4 hours | 1 day ≈ up to 8 hours | Prices exclude VAT (where applicable), studio, talent/models, makeup, specialty props, travel, and other outside rentals.',
  quayChupNoteVi: 'Talent, KOL/KOC, studio, đạo cụ, makeup, di chuyển và yêu cầu production đặc thù được báo giá riêng khi phát sinh.',
  quayChupNoteEn: 'Talent, KOL/KOC, studio, props, makeup, travel, and specific production requirements are quoted separately when they arise.',
  priceLabelVi: (price, unit) => `Từ ${fmt(price)}đ/${unit}`,
  priceLabelEn: (price, unit) => `From ${fmt(price)}₫/${unit}`,
};

/* =============================================================================
   Redesign sections (2026-08-28) — context / workflow / value / cost-factor
   blocks for /media-pricing. All statements are general truths about media
   production in HCMC or restatements of the pricing rules already on the page —
   no fabricated project counts, client names, awards or results.
   ========================================================================== */

// "Chúng tôi hiểu rõ thị trường TP.HCM & nhu cầu thực tế của bạn" — market
// context that frames why a transparent, itemized quote matters.
export const mediaMarketContext = {
  headingVi: 'Chúng tôi hiểu thị trường TP.HCM và nhu cầu thực tế của bạn',
  headingEn: 'We understand the Ho Chi Minh City market and what you actually need',
  items: [
    {
      vi: 'Chi phí sản xuất video và hình ảnh tại TP.HCM thường cao hơn nhiều khu vực khác — do mặt bằng studio, thiết bị và nhân sự.',
      en: 'Producing video and photography in Ho Chi Minh City usually costs more than in many other areas — studio space, equipment and crew all cost more here.',
    },
    {
      vi: 'Một sản phẩm đạt chuẩn cần ê-kíp, thiết bị và một quy trình bài bản, không chỉ một người cầm máy.',
      en: 'A production that meets standard needs a crew, proper equipment and a real workflow — not just one person with a camera.',
    },
    {
      vi: 'Doanh nghiệp cần thấy rõ mức giá đi kèm giá trị nhận được, thay vì một con số gộp không giải thích được.',
      en: 'Businesses need to see the price alongside the value it buys, not a single lump sum with nothing behind it.',
    },
    {
      vi: 'Unitrux báo giá tách rõ từng hạng mục để bạn tối ưu ngân sách mà vẫn giữ được chất lượng đầu ra.',
      en: 'Unitrux itemizes every quote so you can optimise the budget without giving up output quality.',
    },
  ],
};

// "Để bắt đầu dễ dàng" — the working relationship in five plain steps.
export const mediaWorkflow = {
  headingVi: 'Để bắt đầu dễ dàng',
  headingEn: 'An easy way to start',
  leadVi: 'Chọn gói phù hợp — Unitrux lo phần còn lại.',
  leadEn: 'Pick the package that fits — Unitrux handles the rest.',
  steps: [
    {
      titleVi: 'Chọn gói dịch vụ',
      titleEn: 'Choose a package',
      descVi: 'Chọn theo nhu cầu và mục tiêu truyền thông; chưa chắc thì để Unitrux gợi ý.',
      descEn: 'Pick by your need and communication goal; unsure — let Unitrux suggest one.',
    },
    {
      titleVi: 'Trao đổi & tư vấn',
      titleEn: 'Talk it through',
      descVi: 'Unitrux hiểu rõ nhu cầu, đề xuất concept và giải pháp tối ưu ngân sách.',
      descEn: 'Unitrux clarifies the need and proposes a concept and a budget-efficient plan.',
    },
    {
      titleVi: 'Sản xuất & bàn giao',
      titleEn: 'Produce & hand over',
      descVi: 'Quay/chụp, dựng và bàn giao đúng phạm vi, đúng tỷ lệ và đúng thời gian đã cam kết.',
      descEn: 'Film/shoot, edit and deliver to the agreed scope, ratios and timeline.',
    },
    {
      titleVi: 'Hỗ trợ sau dự án',
      titleEn: 'Post-project support',
      descVi: 'Đồng hành khi bạn cần chỉnh sửa trong phạm vi hoặc lên kế hoạch nội dung tiếp theo.',
      descEn: 'On hand for in-scope tweaks or planning the next round of content.',
    },
  ],
  custom: {
    titleVi: 'Bạn cần một gói riêng?',
    titleEn: 'Need a custom package?',
    descVi: 'Liên hệ để được tư vấn và nhận báo giá riêng theo đúng dự án của bạn.',
    descEn: 'Get in touch for advice and a quote scoped to your specific project.',
    ctaVi: 'Liên hệ ngay',
    ctaEn: 'Contact us',
  },
};

// "Chi phí tối ưu, giá trị tối đa" — two value pillars, each backed by the way
// Unitrux actually prices and produces (all restated from the page, not new claims).
export const mediaValueProps = {
  headingVi: 'Chi phí tối ưu, giá trị tối đa',
  headingEn: 'Efficient cost, maximum value',
  leadVi: 'Vì sao doanh nghiệp chọn Unitrux cho quay chụp và sản xuất video.',
  leadEn: 'Why businesses pick Unitrux for photography and video production.',
  items: [
    {
      titleVi: 'Giá hợp lý',
      titleEn: 'Fair pricing',
      pointsVi: [
        'Báo giá tách hạng mục, ghi rõ phần nào đã gồm và phần nào tính thêm.',
        'Có bảng Add-on công khai nên không phát sinh chi phí bất ngờ.',
        'Điều chỉnh phạm vi theo ngân sách thực tế của từng dự án.',
      ],
      pointsEn: [
        'Itemized quotes that state exactly what is included and what is billed on top.',
        'A public add-on table, so there are no surprise costs.',
        'Scope adjusted to each project’s real budget.',
      ],
    },
    {
      titleVi: 'Chất lượng cao',
      titleEn: 'High quality',
      pointsVi: [
        'Ê-kíp sản xuất và studio đặt tại TP.HCM, quay tại studio hoặc di chuyển đến địa điểm của bạn.',
        'Một buổi sản xuất được lên kế hoạch để tạo nhiều phiên bản cho từng nền tảng.',
        'Cân màu, hậu kỳ và bàn giao theo đúng tiêu chuẩn đã cam kết trong báo giá.',
      ],
      pointsEn: [
        'Production crew and studio based in Ho Chi Minh City — in-studio or on location.',
        'One shoot planned to produce multiple platform-specific versions.',
        'Colour, post and delivery to the standard committed in the quote.',
      ],
    },
  ],
};

// "Yếu tố ảnh hưởng đến mức báo giá" — the same variables named in the direct
// answer and the "quoted separately" list, grouped for scanning.
export const mediaCostFactors = {
  headingVi: 'Yếu tố ảnh hưởng đến mức báo giá',
  headingEn: 'What moves the quote',
  leadVi: 'Giá cuối cùng thay đổi theo những yếu tố sau — vì vậy bảng giá này là mức tham khảo, không phải giá cố định.',
  leadEn: 'The final price moves with the factors below — which is why this list is a reference, not a fixed rate.',
  items: [
    {
      titleVi: 'Thời lượng video / số lượng ảnh',
      titleEn: 'Video length / photo count',
      hintVi: 'Video ngắn hay dài, ít hay nhiều sản phẩm, số bộ ảnh cần bàn giao.',
      hintEn: 'Short or long video, few or many products, how many image sets to deliver.',
    },
    {
      titleVi: 'Địa điểm quay / chụp',
      titleEn: 'Shoot location',
      hintVi: 'Trong TP.HCM hay tỉnh lân cận, số bối cảnh, có cần khảo sát địa điểm.',
      hintEn: 'Within HCMC or nearby provinces, number of sets, whether a location recce is needed.',
    },
    {
      titleVi: 'Mức độ hậu kỳ',
      titleEn: 'Post-production level',
      hintVi: 'Cân màu cơ bản hay dựng nâng cao, motion graphics, số vòng chỉnh sửa.',
      hintEn: 'Basic colour or advanced edit, motion graphics, number of revision rounds.',
    },
    {
      titleVi: 'Studio & thiết bị đặc thù',
      titleEn: 'Studio & specialty gear',
      hintVi: 'Thuê studio, thiết bị chuyên dụng, flycam, thiết bị âm thanh hiện trường.',
      hintEn: 'Studio rental, specialty equipment, drone, on-location audio kit.',
    },
    {
      titleVi: 'Diễn viên / người mẫu / voice-over',
      titleEn: 'Talent / models / voice-over',
      hintVi: 'Có hay không, số lượng và mức độ chuyên nghiệp; makeup, stylist.',
      hintEn: 'Whether they’re used, how many and at what level; makeup, stylist.',
    },
    {
      titleVi: 'Tỷ lệ xuất file & deadline',
      titleEn: 'Export ratios & deadline',
      hintVi: 'Số tỷ lệ khung hình cần bàn giao và mức độ gấp của lịch.',
      hintEn: 'How many aspect ratios to deliver and how tight the schedule is.',
    },
  ],
};
