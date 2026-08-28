// Internal-link data for the Cluster F money pages (/photography-video,
// /product-photography, /media-pricing) — Playbook §13 (link UP / SIDEWAYS /
// DOWN FUNNEL) + docs/seo/cluster-plan.json internal_link_matrix.
//
// Two kinds of link live here:
//  1. `money`  — links between the three money pages themselves (always live).
//  2. `article` — links to supporting /news spokes. The Unitrux news CMS lives
//     at be.unitrux.site and is read-only from this repo, so a spoke that has
//     not been pasted into the CMS yet is a dead link. Every article entry
//     carries `published` — RelatedContent.jsx renders ONLY `published: true`
//     entries. Flip the flag (and nothing else) once the slug is live in the CMS.
//
// Anchor text is descriptive per Playbook §14 — never "xem thêm" / "tại đây".

export const relatedContent = {
  '/photography-video': {
    headingVi: 'Nội dung liên quan',
    headingEn: 'Related content',
    links: [
      {
        type: 'money',
        to: '/product-photography',
        anchorVi: 'Dịch vụ chụp ảnh sản phẩm chuyên nghiệp tại TP.HCM',
        anchorEn: 'Professional product photography in Ho Chi Minh City',
        blurbVi: 'Cần ảnh tĩnh thay vì video? Xem dịch vụ chụp ảnh sản phẩm và thương hiệu.',
        blurbEn: 'Need stills instead of video? See the product and brand photography service.',
      },
      {
        type: 'money',
        to: '/media-pricing',
        anchorVi: 'Bảng giá quay video và chụp ảnh tại TP.HCM',
        anchorEn: 'Video and photography pricing in Ho Chi Minh City',
        blurbVi: 'Các gói, mức giá khởi điểm và yếu tố ảnh hưởng đến báo giá quay dựng.',
        blurbEn: 'Packages, starting prices and the factors that move a production quote.',
      },
      {
        type: 'article',
        published: false,
        slug: 'quay-video-san-pham-can-chuan-bi-gi',
        to: '/news/quay-video-san-pham-can-chuan-bi-gi',
        anchorVi: 'Quay video sản phẩm cần chuẩn bị gì? Quy trình và chi phí thực tế',
        anchorEn: 'What to prepare before a product video shoot',
        blurbVi: 'Checklist chuẩn bị trước ngày quay và các yếu tố ảnh hưởng chi phí.',
        blurbEn: 'A prep checklist for shoot day and what drives the cost.',
        note: 'PUBLISH-READY: docs/seo/PUBLISH-READY/quay-video-san-pham.md',
      },
      {
        type: 'article',
        published: false,
        slug: 'quay-video-tiktok-reels-quang-cao-san-pham',
        to: '/news/quay-video-tiktok-reels-quang-cao-san-pham',
        anchorVi: 'Quay video TikTok / Reels quảng cáo sản phẩm',
        anchorEn: 'Shooting TikTok / Reels product ads',
        blurbVi: 'Định dạng dọc, nhịp dựng và cách quay cho quảng cáo ngắn.',
        blurbEn: 'Vertical format, edit pace and how to shoot short-form ads.',
        note: 'PUBLISH-READY: docs/seo/PUBLISH-READY/quay-video-tiktok-reels.md',
      },
      {
        type: 'article',
        published: false,
        slug: 'chup-anh-hay-quay-video-san-pham',
        to: '/news/chup-anh-hay-quay-video-san-pham',
        anchorVi: 'Chụp ảnh hay quay video sản phẩm: nên chọn gì cho từng mục tiêu?',
        anchorEn: 'Product photo or product video: which fits which goal?',
        blurbVi: 'So sánh chi phí, thời gian và hiệu quả của ảnh và video sản phẩm.',
        blurbEn: 'Comparing cost, time and impact of product stills vs. video.',
        note: 'cluster-plan.json Cluster F — comparison spoke (rewrite of existing post)',
      },
    ],
  },

  '/product-photography': {
    headingVi: 'Nội dung liên quan',
    headingEn: 'Related content',
    links: [
      {
        type: 'money',
        to: '/photography-video',
        anchorVi: 'Dịch vụ quay video quảng cáo tại TP.HCM',
        anchorEn: 'Advertising video production in Ho Chi Minh City',
        blurbVi: 'Cần video quảng cáo, video sản phẩm hoặc TikTok/Reels? Xem dịch vụ sản xuất video.',
        blurbEn: 'Need an ad film, product video or TikTok/Reels? See the video production service.',
      },
      {
        type: 'money',
        to: '/media-pricing',
        anchorVi: 'Bảng giá quay video và chụp ảnh tại TP.HCM',
        anchorEn: 'Video and photography pricing in Ho Chi Minh City',
        blurbVi: 'Mức giá khởi điểm theo buổi/ngày chụp và các yếu tố ảnh hưởng báo giá.',
        blurbEn: 'Starting prices per session/day and the factors behind a quote.',
      },
      {
        type: 'article',
        published: false,
        slug: 'quy-trinh-chup-anh-san-pham-chuyen-nghiep',
        to: '/news/quy-trinh-chup-anh-san-pham-chuyen-nghiep',
        anchorVi: 'Quy trình chụp ảnh sản phẩm chuyên nghiệp: từng bước, từ chuẩn bị đến giao file',
        anchorEn: 'The professional product photography process, step by step',
        blurbVi: 'Toàn bộ quy trình từ brief, khảo sát, buổi chụp đến hậu kỳ và bàn giao.',
        blurbEn: 'The full flow from brief and survey through the shoot to edit and handover.',
        note: 'cluster-plan.json Cluster F — process spoke (rewrite of existing post #13)',
      },
      {
        type: 'article',
        published: false,
        slug: 'anh-sang-phong-nen-concept-chup-anh-san-pham',
        to: '/news/anh-sang-phong-nen-concept-chup-anh-san-pham',
        anchorVi: 'Ánh sáng, phông nền và concept chụp ảnh sản phẩm: hướng dẫn cho doanh nghiệp SME',
        anchorEn: 'Lighting, backgrounds and concept for product photography',
        blurbVi: 'Cách chọn nền trắng hay concept, và ánh sáng phù hợp từng chất liệu sản phẩm.',
        blurbEn: 'Choosing white-background vs. concept, and lighting per product material.',
        note: 'cluster-plan.json Cluster F — new informational spoke',
      },
      {
        type: 'article',
        published: false,
        slug: 'chup-anh-quay-video-mon-an-quan-cafe-nha-hang',
        to: '/news/chup-anh-quay-video-mon-an-quan-cafe-nha-hang',
        anchorVi: 'Chụp ảnh và quay video món ăn cho quán cà phê, nhà hàng',
        anchorEn: 'Food photography and video for cafes and restaurants',
        blurbVi: 'Chuẩn bị món, ánh sáng và bố cục cho ảnh menu và video F&B.',
        blurbEn: 'Dish prep, lighting and composition for menu photos and F&B video.',
        note: 'PUBLISH-READY: docs/seo/PUBLISH-READY/chup-anh-quay-video-mon-an-fnb.md',
      },
    ],
  },

  '/media-pricing': {
    headingVi: 'Nội dung liên quan',
    headingEn: 'Related content',
    links: [
      {
        type: 'money',
        to: '/photography-video',
        anchorVi: 'Dịch vụ quay video quảng cáo tại TP.HCM',
        anchorEn: 'Advertising video production in Ho Chi Minh City',
        blurbVi: 'Chi tiết quy trình, portfolio và các loại video Unitrux sản xuất.',
        blurbEn: 'The full process, portfolio and the video types Unitrux produces.',
      },
      {
        type: 'money',
        to: '/product-photography',
        anchorVi: 'Dịch vụ chụp ảnh sản phẩm chuyên nghiệp tại TP.HCM',
        anchorEn: 'Professional product photography in Ho Chi Minh City',
        blurbVi: 'Các hình thức chụp, quy trình và những gì cần chuẩn bị trước buổi chụp.',
        blurbEn: 'Shooting styles, the process and what to prepare before a shoot.',
      },
      {
        type: 'article',
        published: false,
        slug: 'quay-video-san-pham-can-chuan-bi-gi',
        to: '/news/quay-video-san-pham-can-chuan-bi-gi',
        anchorVi: 'Quay video sản phẩm cần chuẩn bị gì? Quy trình và chi phí thực tế',
        anchorEn: 'What to prepare before a product video shoot',
        blurbVi: 'Phần "yếu tố ảnh hưởng chi phí" giải thích chi tiết cách hình thành báo giá.',
        blurbEn: 'Its cost-factors section explains in detail how a quote is built.',
        note: 'PUBLISH-READY: docs/seo/PUBLISH-READY/quay-video-san-pham.md',
      },
    ],
  },
};

// Only entries that are safe to render: money-page links always, article links
// only once their CMS slug is live.
export const getRelatedContent = (path) => {
  const entry = relatedContent[path];
  if (!entry) return null;
  const links = entry.links.filter((link) => link.type !== 'article' || link.published === true);
  if (!links.length) return null;
  return { ...entry, links };
};
