# Keyword research bổ sung — "quay chụp / quay video quảng cáo TPHCM"

Nguồn: WebSearch trực tiếp (2026-08-25), đối chiếu với `docs/seo/cluster-plan.json` (Cluster F — đã có sẵn, không viết lại từ đầu). File này chỉ ghi phần **mới** phát hiện thêm.

## 1. Việc high-value nhất: đã có sẵn, chỉ chưa publish

`docs/seo/PUBLISH-READY/quay-video-san-pham.md` là bài viết đã viết xong, đã review, format sẵn để dán vào CMS — nhắm đúng "quay video sản phẩm cần chuẩn bị gì", link về `/photography-video`. Verify lại hôm nay: **slug `quay-video-san-pham-can-chuan-bi-gi` KHÔNG có trong `dist/news/` sau build** → bài này chưa lên live, dù đã "sẵn sàng" từ 2026-08-20. Đây là việc tốn ít công nhất, tác động tức thì nhất trong toàn bộ danh sách bên dưới.

## 2. Cannibalization fix cũ (CANN-01) vẫn chưa áp dụng

`cluster-plan.json` đã khuyến nghị: đổi tên `/product-photography` khỏi ngôn ngữ "quay" (video-coded) để chỉ sở hữu "chụp ảnh sản phẩm". Kiểm tra `src/data/servicesContent.js:394-396` hôm nay: title vẫn là **"Quay chụp sản phẩm và thương hiệu"** — chưa sửa. Đây là fix 1 dòng, rủi ro thấp, nên làm cùng đợt với việc publish bài viết ở mục 1.

## 3. Từ khóa MỚI — chưa nằm trong cluster-plan.json cũ

### Cụm D (mới) — TikTok/Reels quảng cáo (khác hẳn tập từ khóa TVC)
Search "quay reels tiktok sản phẩm", "quay video tiktok facebook tphcm" trả về **domain hoàn toàn khác** nhóm TVC (kingmarketing.vn, zafago.com, mediawinwin.vn, thuestudio.com, beelancer.vn — không trùng jgo với leagency.vn/famemedia.vn/9pm.com.vn của nhóm TVC). Overlap ước tính 0-1/10 → cụm riêng, không cannibalize.

Đáng chú ý về giá: thị trường báo giá TikTok/Reels riêng lẻ **1-2 triệu/video** — khớp gần đúng với tier "Video short-form — Từ 2.000.000đ/video" đã có sẵn trong `/media-pricing`, nhưng **chưa có content nào** (trang hay bài viết) nhắm trực tiếp cụm từ khóa này. `/photography-video` có nhắc TikTok/Reels như một output format, nhưng không phải nội dung chính.

- Đề xuất: 1 bài blog "Quay Video TikTok/Reels Quảng Cáo Sản Phẩm Tại TPHCM: Giá & Quy Trình Nhanh Gọn" — link `/photography-video` + tier short-form trong `/media-pricing`. Không tạo trang riêng (tránh lặp lỗi tạo quá nhiều Money Page cho biến thể nhỏ).

### Cụm E (mới) — Chụp ảnh/quay F&B (nhà hàng, quán cafe)
Search "chụp ảnh món ăn nhà hàng quán cafe tphcm" trả về nhóm đối thủ **chuyên biệt F&B** (chuphinhmenu.com, menudep.com, vuaphache.com) — hoàn toàn khác domain-set so với nhóm chụp sản phẩm chung (mona.media, sikido.vn...). Overlap ước tính 0-1/10 → cụm riêng.

Unitrux **đã có giá cho nhóm này** ("Food & Beverage — Từ 2.000.000đ/buổi" trong `/media-pricing`, `packagesPricing.js`) nhưng zero content phục vụ đúng intent tìm kiếm này — khoảng trống thật.

- Đề xuất: 1 bài blog "Chụp Ảnh, Quay Video Món Ăn Cho Quán Cafe/Nhà Hàng Tại TPHCM: Giá & Lưu Ý" — link `/product-photography` (năng lực space/brand đã có) + tier F&B trong `/media-pricing`.

### Loại trừ — không nên nhắm
"cho thuê studio quay phim tphcm", "cho thuê thiết bị quay phim chụp hình" — đây là intent **thuê thiết bị/không gian tự quay**, khác mô hình kinh doanh của Unitrux (full-service production, không cho thuê gear/studio). Đối thủ ở đây (thietbigao.com, chothuestudio.com) không phải đối thủ cạnh tranh thật — nhắm từ khóa này sẽ kéo traffic sai intent.

## 4. Dữ liệu giá thị trường (để tham khảo định vị)
- TVC quảng cáo đầy đủ: 30tr – 350tr+ (phân khúc SME thấp nhất ~100-150tr)
- Video quảng cáo ngắn/doanh nghiệp: ~15tr/video trở lên (theo bảng giá đối thủ tổng hợp)
- TikTok/Reels riêng lẻ: 1-2tr/video, gói trọn từ ~2tr

→ Mức giá hiện tại của Unitrux ở `/media-pricing` ("Video quảng cáo — Từ 5.500.000đ/video") định vị **thấp hơn đáng kể** so với mặt bằng TVC thị trường (15-150tr+) — đây là lợi thế cạnh tranh thật cho SME, đáng nhấn mạnh rõ trong content mới (đặc biệt bài "Chi Phí Sản Xuất TVC..." đã có trong plan cũ).

## 5. Trạng thái — briefs đã viết (2026-08-27)

- **Cụm D (TikTok/Reels)** → `docs/seo/CONTENT-BRIEFS/tiktok-reels-quang-cao-san-pham.md` — full brief + bản markdown sẵn dán CMS. Slug đề xuất `quay-video-tiktok-reels-quang-cao-san-pham`. Link UP: `/photography-video`; price: `/media-pricing#group-video-short-form`; sibling: `quay-video-san-pham-can-chuan-bi-gi`.
- **Cụm E (F&B)** → `docs/seo/CONTENT-BRIEFS/chup-anh-quay-video-mon-an-fnb.md` — full brief + bản markdown sẵn dán CMS. Slug đề xuất `chup-anh-quay-video-mon-an-quan-cafe-nha-hang`. Link UP: `/product-photography` (photo); video hand-off: `/photography-video`; price: `/media-pricing#group-food-beverage`.
- Cả hai **chưa publish** — CMS `be.unitrux.site` read-only từ repo. Còn nợ: `getNews()` scan chống trùng bài live, publish sibling `quay-video-san-pham-can-chuan-bi-gi` trước (Cụm D link tới nó), request indexing sau khi live.
- CANN-01 đã fix trong code 2026-08-27 (commit `4ba6b62`) — `/product-photography` re-scope về photo-only. Xem SEO-AEO-PLAYBOOK.md changelog.
