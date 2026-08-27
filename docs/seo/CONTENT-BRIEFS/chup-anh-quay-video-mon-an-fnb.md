# Content Brief — "chụp ảnh / quay video món ăn cho quán cafe, nhà hàng TP.HCM" (Cụm E)

Status: DRAFT brief — not published. The news CMS (`be.unitrux.site`) is read-only from this repo. This file is the ready-to-paste draft; a human with CMS access publishes it.

Source: `docs/seo/cluster-research-tphcm-video-photo.md` §3 "Cụm E (mới)" + `docs/seo/SEO-AEO-PLAYBOOK.md` (§7, §8, §11, §24, §28) + live source read (`src/seo/seoConfig.js`, `src/data/mediaPricing.js`, `src/data/servicesContent.js`).

---

## 1. SEO Pre-Flight (Playbook §28)

```
Primary Keyword:      chụp ảnh món ăn cho quán cafe / nhà hàng (TP.HCM)
Secondary Keywords:   chụp ảnh menu nhà hàng, chụp hình món ăn quán cafe, chụp ảnh đồ uống,
                      quay video món ăn, chụp ảnh không gian quán cafe, chụp ảnh F&B tphcm
Search Intent:        Commercial / Commercial-investigation (menu refresh, delivery-app listing, price check)
Page Type:            Supporting Article (Level 5), pairs with the /media-pricing Food & Beverage tier
Target URL:           /news/chup-anh-quay-video-mon-an-quan-cafe-nha-hang  (proposed slug — set exactly in CMS `slug`)
Parent Cluster:       Cụm F / co-pillar split — photo → /product-photography, video → /photography-video
Primary Money Page:   /product-photography  (photo is the dominant intent for "chụp ảnh món ăn")
Cannibalization:      PASS — see §3. Distinct F&B-specialist SERP set; no URL or live news post
                      targets F&B food/menu photography. CANN-01-safe: photo intent → /product-photography,
                      any video mention explicitly hands off to /photography-video.
Internal Links IN:    /product-photography (capability "Chụp ảnh không gian" / "Hình ảnh thương hiệu"),
                      /media-pricing (Food & Beverage group)
Internal Links OUT:   /product-photography (down-funnel, photo), /photography-video (video hand-off),
                      /media-pricing#group-food-beverage (price), /digital-marketing (sideways —
                      food photos feed delivery-app + Meta ad creative), /contact (conversion)
Information Gain:     Real F&B-relevant capability + BTS assets (on-location space photography,
                      lighting-check); the real /media-pricing Menu Basic (2.000.000đ / ~8–10 món /
                      ~20 ảnh) and Menu Pro (3.900.000đ / ~15–20 món / ~35 ảnh) package specs;
                      an angle checklist specific to food (steam/gloss window, prop plates, shoot
                      order by dish temperature).
```

## 2. Search Intent

- **Quán cafe / nhà hàng chủ nhỏ** refreshing a menu or launching on GrabFood/ShopeeFood/Be — search "chụp ảnh menu nhà hàng", "chụp hình món ăn quán cafe giá". Commercial, near hiring.
- **Marketing/brand của chuỗi F&B** comparing an F&B-specialist studio vs. a generalist — search "chụp ảnh F&B tphcm", "báo giá chụp menu". Commercial-investigation.

Per the 2026-08-25 sampling, "chụp ảnh món ăn nhà hàng quán cafe tphcm" pulls an F&B-specialist competitor set (chuphinhmenu.com, menudep.com, vuaphache.com) that does **not** overlap the generalist product-photo set (mona.media, sikido.vn) — est. overlap 0–1/10 → its own cluster.

## 3. Cannibalization Analysis (Playbook §11)

| Keyword | Existing owner in codebase | Verdict |
|---|---|---|
| chụp ảnh sản phẩm và thương hiệu | `/product-photography` (title/H1/schema, re-scoped photo-only 2026-08-27 per CANN-01) | Owned — this article is a spoke that links UP to it, does not restate the service pitch |
| chụp ảnh không gian | `/product-photography` capability "Chụp ảnh không gian" | Owned — article covers the F&B *application* of it |
| Food & Beverage pricing | `/media-pricing` group `food-beverage` (Menu Basic 2.000.000đ, Menu Pro 3.900.000đ) | Owned as a pricing hub — link + quote, don't rebuild |
| quay video món ăn | `/photography-video` (video production) | Owned — mention only, hand off with an explicit link (CANN-01 discipline) |
| chụp ảnh **món ăn cho quán cafe / nhà hàng** (as a menu-refresh guide with price + food-specific tips) | **No URL. No live news post.** `/product-photography` never mentions food/menu; `/media-pricing` has the F&B packages but no surrounding guidance | **Gap confirmed. Safe to create as ONE supporting article, not a new Money Page.** |

`CANNIBALIZATION WARNING` not raised. Guardrail: the article's service framing points to `/product-photography`; it never sells "dịch vụ chụp ảnh món ăn" as if it were a separate page.

Live-CMS check still owed: `getNews()` scan for an F&B / menu photography post. Adjacent existing slug to eyeball: `dich-vu-marketing-spa-tron-goi` (different vertical), none head-on.

## 4. Content Gap / Information Gain

- The site sells F&B photography (via `/media-pricing`) but publishes **zero** guidance for that searcher.
- Real package specs to quote in prose: Menu Basic — tối đa 3h, ~8–10 món, ~20 ảnh hậu kỳ, góc top/45°/detail; Menu Pro — tối đa 4h, ~15–20 món, ~35 ảnh, concept + nhiều layout + ảnh không gian.
- Food-specific craft notes that are genuine Information Gain (not generic listicle): shoot order by dish temperature (hot dishes first, ice drinks last), backlight for steam and gloss, prop plates and surfaces brought to set, why "~8–10 dishes in 3 hours" is realistic and 25 dishes is not.
- Real BTS assets usable directly: `bts-onsite-branding` (on-location space shoot), `bts-lighting-check` (lighting setup), `bts-product-studio` (studio tabletop setup).

## 5. Titles / Meta

**SEO Title (chosen):** Chụp Ảnh, Quay Video Món Ăn Cho Quán Cafe, Nhà Hàng Tại TP.HCM: Giá Và Lưu Ý
- alt: Chụp Ảnh Menu Nhà Hàng, Quán Cafe Ở TP.HCM: Một Buổi Chụp Được Bao Nhiêu Món?
- alt: Chụp Hình Món Ăn Cho Menu Và App Giao Đồ Ăn: Quy Trình, Giá, Checklist

**Meta Description (chosen, 152 chars):** Chụp ảnh và quay video món ăn cho quán cafe, nhà hàng tại TP.HCM: một buổi chụp được khoảng 8–20 món, giá tham khảo từ 2.000.000đ/buổi, kèm lưu ý theo từng món.

**Slug:** `chup-anh-quay-video-mon-an-quan-cafe-nha-hang`

**H1 (= CMS Title field):** same as SEO Title. Body starts at `##`.

**Category:** Kiến thức Digital  **Author:** Unitrux Team
**Tags:** `chụp ảnh món ăn, chụp ảnh menu nhà hàng, chụp hình món ăn quán cafe, chụp ảnh F&B, quay video món ăn`

## 6. Featured Image

`/images/img1.jpg` — real asset (`bts-onsite-branding`, brand photography shot on location).
**ALT:** `Buổi chụp hình ảnh thương hiệu tại địa điểm khách hàng của Unitrux`
(No food/dish claim — the frame shows an on-location brand shoot, not a plated dish.)

`[UNITRUX CẦN BỔ SUNG: nếu có ảnh menu F&B thật đã chụp (che tên quán nếu cần), dùng làm featured image sẽ mạnh hơn nhiều.]`

## 7. Internal Links (place where marked `→ LINK` in body)

| Anchor | Target | Purpose |
|---|---|---|
| Chụp ảnh sản phẩm và thương hiệu | `/product-photography` | Down-funnel to the photo Money Page (link UP for the spoke) |
| bảng giá chụp ảnh Food & Beverage | `/media-pricing#group-food-beverage` | Price reference (Level-4 hub) |
| Sản xuất Video quảng cáo | `/photography-video` | Video hand-off (CANN-01 — video intent belongs here) |
| Quảng cáo đa nền tảng | `/digital-marketing` | Sideways — food assets feed delivery-app + Meta ads |
| Gửi menu để Unitrux đề xuất buổi chụp | `/contact` | Conversion |

CMS structured field: `relatedServiceIds: ["/product-photography"]`.

## 8. Full Markdown Article (paste as body — keep `## Câu Hỏi Thường Gặp` verbatim)

---

Chụp ảnh món ăn cho quán cafe và nhà hàng là việc chụp món, đồ uống và không gian quán để dùng cho menu, website, app giao đồ ăn (GrabFood, ShopeeFood, Be) và mạng xã hội. Ở TP.HCM, một buổi chụp 3–4 giờ thường xử lý được khoảng 8–20 món tùy độ phức tạp, với giá tham khảo bắt đầu từ 2.000.000đ/buổi. Quay video món ăn là một hạng mục riêng và có thể ghép cùng buổi chụp nếu lên kế hoạch từ đầu.

## Ảnh món ăn dùng ở đâu?

Cùng một bộ ảnh món ăn phục vụ nhiều nơi: menu in và menu điện tử tại quán, listing trên app giao đồ ăn, website đặt bàn, bài đăng Facebook/Instagram, và ảnh cho quảng cáo trả phí. Mỗi nơi cần tỷ lệ và cách crop khác nhau — app giao đồ ăn thường dùng ảnh vuông hoặc ngang sát món, mạng xã hội cần cả bản dọc — nên cần thống nhất danh sách kênh trước khi chụp. Bộ ảnh được hậu kỳ và căn kích thước theo từng kênh là một phần của dịch vụ [Chụp ảnh sản phẩm và thương hiệu](/product-photography). → LINK

## Một buổi chụp được bao nhiêu món?

Con số thực tế thấp hơn nhiều người nghĩ, vì mỗi món cần set lại ánh sáng, bày biện, canh góc và chụp nhiều frame. Mức tham khảo của Unitrux:

- **Menu Basic** (từ 2.000.000đ/buổi): tối đa 3 giờ, khoảng 8–10 món, khoảng 20 ảnh hậu kỳ, góc top-down / 45° / detail, cân màu và retouch cơ bản. Phù hợp quán cafe, menu online.
- **Menu Pro** (từ 3.900.000đ/buổi): tối đa 4 giờ, khoảng 15–20 món, khoảng 35 ảnh hậu kỳ, có concept hình ảnh, nhiều layout, thêm ảnh không gian và detail. Phù hợp nhà hàng refresh toàn bộ menu.

Xem chi tiết tại [bảng giá chụp ảnh Food & Beverage](/media-pricing#group-food-beverage). → LINK Food stylist chuyên nghiệp, nguyên liệu/props đặc thù và thuê studio được báo riêng.

## Quy trình một buổi chụp món ăn

**1. Nhận menu và chốt danh sách món ưu tiên.** Không chụp hết mọi món trong một buổi — chọn món bán chạy và món có hình thức tốt trước.

**2. Concept và tham chiếu.** Thống nhất phong cách: nền sáng tự nhiên, nền tối "moody", hay ảnh có bối cảnh quán.

**3. Chuẩn bị đạo cụ và bề mặt.** Dĩa, khay, khăn, bề mặt gỗ/đá — mang đến set hoặc dùng sẵn của quán.

**4. Bếp chuẩn bị món theo thứ tự chụp.** Món nóng và món cần độ tươi chụp trước, đồ uống đá chụp sau cùng.

**5. Chụp.** Set ánh sáng cho từng nhóm món, canh góc top/45°/detail, chụp nhiều frame mỗi món.

**6. Hậu kỳ và bàn giao.** Cân màu, retouch, cắt kích thước theo menu, app giao đồ ăn và mạng xã hội.

## Lưu ý riêng khi chụp món ăn

- **Món nóng bốc khói:** dùng ánh sáng ngược (backlight) để thấy khói; chụp nhanh trong 1–2 phút đầu khi món còn bốc hơi.
- **Đồ uống và món bóng dầu:** ánh sáng ngược làm nổi độ bóng và lớp đá; tránh đèn thẳng mặt làm món bẹt.
- **Kem, đá, món lạnh:** chụp cuối buổi, chuẩn bị bản dự phòng vì tan nhanh.
- **Màu sắc thật:** cân màu để món lên đúng màu như khi phục vụ, không đẩy bão hòa làm món trông giả.
- **Số lượng thực tế:** 8–10 món trong 3 giờ là hợp lý; ép 25 món một buổi thì ảnh sẽ đuối dần về cuối.

## Quay video món ăn thì sao?

Quay video món ăn (rót, cắt, kéo phô mai, đổ nước sốt) là một hạng mục sản xuất riêng, không nằm trong buổi chụp ảnh tĩnh. Nếu cần cả ảnh và video, nên ghép lịch trong cùng một buổi và thống nhất từ bước concept để tối ưu chi phí — phần video thuộc dịch vụ [Sản xuất Video quảng cáo](/photography-video). → LINK

## Những lỗi thường gặp

- Đưa cả menu 30 món cho một buổi 3 giờ, khiến các món cuối bị chụp vội.
- Chưa chốt kênh sử dụng (app giao đồ ăn cần crop khác mạng xã hội), phải hậu kỳ lại nhiều lần.
- Không chuẩn bị bản món dự phòng cho món dễ tan/xỉn màu.
- Trộn quá nhiều phong cách trong một bộ ảnh, làm menu trông thiếu nhất quán.

## Câu Hỏi Thường Gặp

**Chụp ảnh món ăn cho quán cafe, nhà hàng giá bao nhiêu?**
Giá tham khảo của Unitrux bắt đầu từ 2.000.000đ/buổi cho gói Menu Basic (khoảng 8–10 món, ~20 ảnh) và từ 3.900.000đ/buổi cho gói Menu Pro (khoảng 15–20 món, ~35 ảnh, có concept và ảnh không gian). Giá chính thức phụ thuộc số món, phong cách và có cần food stylist hay không.

**Một buổi chụp được bao nhiêu món ăn?**
Khoảng 8–10 món trong 3 giờ hoặc 15–20 món trong 4 giờ, vì mỗi món cần set lại ánh sáng, bày biện và chụp nhiều frame.

**Có chụp tại quán được không hay phải mang món đến studio?**
Chụp tại quán được. Sau khi khảo sát ánh sáng và không gian, Unitrux đề xuất chụp tại chỗ hoặc tại studio tùy điều kiện.

**Có quay video món ăn trong cùng buổi chụp không?**
Quay video là hạng mục riêng thuộc dịch vụ Sản xuất Video quảng cáo, nhưng có thể ghép cùng lịch chụp nếu thống nhất từ bước concept để tiết kiệm chi phí.

## Bắt đầu một buổi chụp món ăn

[Gửi menu để Unitrux đề xuất buổi chụp](/contact) hoặc xem thêm dịch vụ [Chụp ảnh sản phẩm và thương hiệu](/product-photography). → LINK

---

## 9. Image Plan (real assets only)

| Image (existing) | ALT (vi) | Position |
|---|---|---|
| `/images/img1.jpg` | Buổi chụp hình ảnh thương hiệu tại địa điểm khách hàng của Unitrux | Featured + "Chụp tại quán" |
| `/images/img2.jpg` | Ekip Unitrux chuẩn bị ánh sáng cho buổi chụp | Quy trình §5 |
| `/images/img4.jpg` | Dựng set chụp trong studio | "Chuẩn bị đạo cụ và bề mặt" |

`[UNITRUX CẦN BỔ SUNG: ảnh món ăn/menu thật đã chụp cho khách F&B — hiện chưa có trong asset set; đây là gap lớn nhất của bài này.]`

## 10. Social Distribution Package (Playbook §34+)

Campaign slug: `fnb-mon-an-2026`. Destination = the article; conversion = `/product-photography`.

- **Facebook Page ×2:** (1) "Vì sao một buổi chụp chỉ được 8–10 món?" (giải thích quy trình). (2) "4 lưu ý khi chụp món nóng, đồ uống đá".
- **FB Group ×2:** nhóm chủ quán cafe / nhóm F&B TP.HCM — mở đầu bằng lỗi "đưa cả menu 30 món cho một buổi", soft CTA về checklist.
- **Instagram:** 1 carousel "Thứ tự chụp món theo nhiệt độ"; 1 Reel BTS set ánh sáng cho một món.
- **Threads ×3:** insight ("ảnh menu đẹp nhưng sai crop cho app giao đồ ăn thì vẫn phải làm lại"); lesson learned; thảo luận nền sáng vs nền moody.
- **TikTok ×2:** "Chụp món nóng bốc khói thế nào"; "30s BTS một buổi chụp menu".
- **Image assets:** 3–4 (BTS thật §9 + `[UNITRUX CẦN BỔ SUNG]` ảnh món thật). **Video assets:** 1 (BTS set-up — `[UNITRUX CẦN BỔ SUNG]`).

UTM: `?utm_source=<kênh>&utm_medium=organic-social&utm_campaign=fnb-mon-an-2026`.

## 11. Post-Writing Audit (Playbook §28)

| Requirement | Status |
|---|---|
| Intent satisfied (F&B menu photo, price, tips) | PASS |
| Correct keyword owner (§8) — funnels to /product-photography, video → /photography-video | PASS |
| No cannibalization | PASS (spoke links UP; CANN-01 video hand-off explicit) |
| Direct answers (AEO §20) | PASS (Quick answer + FAQ) |
| Entity clarity (GEO §21) | PASS ("chụp ảnh món ăn cho quán cafe, nhà hàng" named; no "dịch vụ này") |
| Information gain (§17) | PASS (real package specs + food-specific craft notes + realistic dish counts) |
| E-E-A-T (§18) | PASS (real `/media-pricing` figures; no fabricated clients; food-photo gap flagged) |
| Internal links (§13) | PASS (up: /product-photography; sideways: /digital-marketing; hand-off: /photography-video; hub: /media-pricing; convert: /contact) |
| CTA (§16) | PASS (specific) |
| Images (§25) | PASS (real BTS; food-photo gap flagged as `[UNITRUX CẦN BỔ SUNG]`) |
| Schema (§27) | PASS by pipeline (BlogPosting + FAQPage auto) |
| No keyword stuffing / unsupported claims | PASS |

## 12. Blocked / owed before publish

1. Publish to the external CMS (not doable from this repo).
2. Live `getNews()` scan for a pre-existing F&B/menu photography post.
3. Strongly recommended: get at least one real F&B food photo before publishing (featured image + social).
4. After publish: confirm canonical `https://unitrux.com/news/chup-anh-quay-video-mon-an-quan-cafe-nha-hang/`, request indexing in Search Console.
