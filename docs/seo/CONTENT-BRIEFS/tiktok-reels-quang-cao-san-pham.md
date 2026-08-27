# Content Brief — "quay video TikTok / Reels quảng cáo sản phẩm TP.HCM" (Cụm D)

Status: DRAFT brief — not published. The news CMS (`be.unitrux.site`) is read-only from this repo (no write endpoint, no admin script, no creds — confirmed 2026-08-20). This file is the ready-to-paste draft; a human with CMS access publishes it.

Source: `docs/seo/cluster-research-tphcm-video-photo.md` §3 "Cụm D (mới)" + `docs/seo/SEO-AEO-PLAYBOOK.md` (§7, §8, §11, §23, §28) + live source read (`src/seo/seoConfig.js`, `src/data/mediaPricing.js`, `src/data/productionPortfolio.js`, `src/components/PhotographyVideoService.jsx`).

---

## 1. SEO Pre-Flight (Playbook §28)

```
Primary Keyword:      quay video TikTok / Reels quảng cáo sản phẩm (TP.HCM)
Secondary Keywords:   quay reels tiktok sản phẩm, quay video tiktok facebook tphcm,
                      giá quay video tiktok, quay video reels cho shop, video ngắn quảng cáo sản phẩm
Search Intent:        Commercial / Commercial-investigation (price + process before hiring)
Page Type:            Supporting Article (Level 5), pairs with the /media-pricing short-form tier
Target URL:           /news/quay-video-tiktok-reels-quang-cao-san-pham  (proposed slug — set exactly in the CMS `slug` field)
Parent Cluster:       Cụm F / Advertising Video Production (co-pillar: /photography-video)
Primary Money Page:   /photography-video
Cannibalization:      PASS — see §3. Distinct SERP cluster from the TVC/"sản xuất video quảng cáo" set;
                      no existing URL or live news post targets "quay reels/tiktok sản phẩm" head-on.
Internal Links IN:    /photography-video (service-list item 01 "Video quảng cáo ngắn" links here),
                      /media-pricing (short-form group intro), sibling article
                      /news/quay-video-san-pham-can-chuan-bi-gi
Internal Links OUT:   /photography-video (down-funnel), /media-pricing#group-video-short-form (price),
                      /content-creation (sideways — batch repurposing), /contact (conversion)
Information Gain:     Real 9:16 portfolio proof (5 spa social films 31–47s + 2 spa 16:9 shorts,
                      all shot 2026-08-14/15); a batch shot-list model that turns one 3–4h session
                      into 3–5 videos; concrete VND anchors from /media-pricing (Reel/TikTok Basic
                      2.000.000đ, 3 Video Pack 4.700.000đ, 5 Video Pack 7.900.000đ).
```

## 2. Search Intent

Two overlapping searchers:
- **Shop owners / SME marketers** who already run TikTok/Facebook and want short ad videos made — they search "quay video tiktok cho shop", "giá quay reels". Commercial, close to hiring.
- **Brand/marketing leads** comparing a batch-video vendor vs. a freelancer/KOC — they search "quay video tiktok tphcm", "báo giá 3 video tiktok". Commercial-investigation.

Neither is the TVC audience (that intent = "sản xuất TVC quảng cáo", 30tr+ budgets, different SERP). Per the 2026-08-25 sampling the domains ranking for "quay reels tiktok sản phẩm" (kingmarketing.vn, zafago.com, mediawinwin.vn, thuestudio.com, beelancer.vn) do **not** overlap the TVC set (leagency.vn, famemedia.vn, 9pm.com.vn) — est. overlap 0–1/10 → its own cluster, safe to own.

## 3. Cannibalization Analysis (Playbook §11)

| Keyword | Existing owner in codebase | Verdict |
|---|---|---|
| sản xuất video quảng cáo | `/photography-video` (title, heading, schema serviceType) | Owned — this article must NOT target the bare head term |
| quay video sản phẩm | `/photography-video` (offerCatalog "Video sản phẩm và E-commerce", FAQ) + `/news/quay-video-san-pham-can-chuan-bi-gi` (prep/checklist angle) | Owned — link to both, don't restate |
| video short-form / Reels / TikTok pricing | `/media-pricing` group `video-short-form` (Reel/TikTok Basic, 3/5 Video Pack) | Owned as a pricing hub — link to it, quote it, don't rebuild the table |
| quay video TikTok / Reels **quảng cáo sản phẩm** (as a how-much / how-fast guide) | **No URL. No live news post.** `/photography-video` names "Reels, TikTok, Stories, Spark Ads" only as an output list; `/content-creation` covers multi-channel content ops, not a shoot-a-batch guide | **Gap confirmed. Safe to create as ONE supporting article, not a new Money Page.** |

`CANNIBALIZATION WARNING` not raised — the article is scoped to the format + speed + batch-pricing angle and funnels into `/photography-video`. Do **not** let it drift into "dịch vụ quay video quảng cáo" framing.

Live-CMS check still owed before publish: run `getNews()` against `be.unitrux.site` and scan for an existing TikTok/Reels shoot post (the repo has no local news store). Nearest existing slugs to eyeball: `quay-video-chup-hinh-cho-content`, `sang-tao-noi-dung-da-kenh`, `dich-vu-chay-ads-da-kenh` — all adjacent, none head-on.

## 4. Content Gap / Information Gain

- `/photography-video` proves batch multi-format delivery with real data but never writes it up as a buyer benefit for the TikTok/Reels buyer specifically.
- No page states a **starting price** for a single Reel/TikTok video in running prose (it's in the `/media-pricing` table only) — this article can quote it and link.
- No **batch shot-list model** anywhere on the site: how a 3–4h session → 3–5 usable vertical videos.
- Real proof to cite (all genuine, in `src/data/productionPortfolio.js`): spa client — 5 separate 9:16 social films (`spa-social-film-1..5`, 31.07s–47.32s), plus 2 short 16:9 cuts (`spa-short-film-6` 8.21s, `spa-short-film-7` 6.93s), all dated 2026-08-14/15 → one production relationship, 7 vertical/short deliverables.

## 5. Titles / Meta

**SEO Title (chosen):** Quay Video TikTok, Reels Quảng Cáo Sản Phẩm Tại TP.HCM: Giá Và Quy Trình
- alt: Quay Reels / TikTok Cho Shop Tại TP.HCM: Một Buổi Quay Được Mấy Video?
- alt: Video Ngắn Quảng Cáo Sản Phẩm: Quay Batch TikTok/Reels Ở TP.HCM

**Meta Description (chosen, 149 chars):** Quay video TikTok, Reels quảng cáo sản phẩm tại TP.HCM: một buổi quay batch được 3–5 video, giá tham khảo từ 2.000.000đ/video và quy trình từng bước.

**Slug:** `quay-video-tiktok-reels-quang-cao-san-pham`

**H1 (= CMS Title field, rendered once by `NewsDetailShowcase.jsx`):** same as SEO Title. Body starts at `##`.

**Category:** Kiến thức Digital  **Author:** Unitrux Team
**Tags:** `quay video tiktok, quay reels sản phẩm, video ngắn quảng cáo, quay video tiktok tphcm, giá quay video tiktok`

## 6. Featured Image

`/images/img2.jpg` — real asset (`bts-lighting-check` in `productionBehindTheScenes`), crew + camera + softbox before filming.
**ALT:** `Ekip Unitrux chuẩn bị máy quay và ánh sáng cho một buổi quay video ngắn`
(Describes only what's in frame — crew, camera, lighting. No product/client/location claim.)

## 7. Internal Links (place where marked `→ LINK` in body)

| Anchor | Target | Purpose |
|---|---|---|
| Sản xuất Video quảng cáo | `/photography-video` | Down-funnel to Money Page |
| bảng giá video short-form | `/media-pricing#group-video-short-form` | Price reference (Level-4 hub) |
| Quay video sản phẩm cần chuẩn bị gì | `/news/quay-video-san-pham-can-chuan-bi-gi` | Sideways — sibling spoke (publish that one first) |
| Sáng tạo nội dung đa kênh | `/content-creation` | Sideways — batch repurposing / monthly cadence |
| Gửi sản phẩm để Unitrux đề xuất concept | `/contact` | Conversion |

CMS structured field: `relatedServiceIds: ["/photography-video"]`.

## 8. Full Markdown Article (paste as body — keep `## Câu Hỏi Thường Gặp` verbatim for `extractFaqFromMarkdown()`)

---

Quay video TikTok và Reels quảng cáo sản phẩm là việc sản xuất các video dọc ngắn (9:16, thường 15–60 giây) để chạy trên TikTok, Reels, Facebook và Stories. Ở TP.HCM, cách làm tiết kiệm nhất là quay theo lô (batch): trong một buổi 3–4 giờ, một ekip có thể quay đủ nội dung cho 3–5 video nếu đã thống nhất shot list trước. Giá tham khảo bắt đầu từ khoảng 2.000.000đ cho một video lẻ và rẻ hơn theo video khi đặt gói nhiều video.

## Video TikTok/Reels quảng cáo sản phẩm là gì?

Đây là video dọc ngắn, tối ưu cho việc xem trên điện thoại và cho thuật toán khám phá của TikTok/Reels: hook trong 1–2 giây đầu, tiết tấu nhanh, chữ on-screen, âm thanh bắt trend hoặc voiceover, và một lời kêu gọi hành động rõ ràng ở cuối. Khác với video quảng cáo dài hoặc TVC, video TikTok/Reels ưu tiên số lượng và tần suất — thương hiệu cần nhiều video để thử hook, không phải một video "hoàn hảo". Đây là lý do quy trình quay batch bên dưới quan trọng hơn việc đầu tư quá nhiều vào một video đơn lẻ.

## Một buổi quay batch được mấy video?

Trên thực tế, một buổi quay được lên kế hoạch tốt tạo ra nhiều video hơn là quay lẻ từng cái. Trong portfolio hiện tại của Unitrux, cùng một khách hàng spa có 5 video social dọc 9:16 riêng biệt (khoảng 31–47 giây mỗi video) cùng 2 bản cắt ngắn 16:9 — tất cả trong cùng một giai đoạn sản xuất, không quay lại nhiều lần. Xem thêm ví dụ tại [Sản xuất Video quảng cáo](/photography-video). → LINK

Con số phụ thuộc vào độ phức tạp: sản phẩm đơn giản, một bối cảnh, không người mẫu → 4–5 video/buổi là khả thi. Có nhiều sản phẩm, thay đổi bối cảnh, hoặc có talent → 2–3 video/buổi.

## Quy trình quay video TikTok/Reels

**1. Chốt mục tiêu và số lượng.** Cần bao nhiêu video, đăng trong bao lâu, thử mấy hook khác nhau.

**2. Hook list + shot list.** Với video ngắn, viết trước 3–5 câu hook và các cảnh cần có cho mỗi hook. Đây là bước quyết định buổi quay batch có nhanh hay không.

**3. Chuẩn bị sản phẩm và bối cảnh.** Gom sản phẩm ưu tiên, bản dự phòng, đạo cụ, một góc quay đủ sáng.

**4. Quay batch.** Quay hết các cảnh của tất cả video trong một lần dựng máy, thay vì dựng lại máy cho từng video.

**5. Dựng theo từng video.** Mỗi video một bản dựng riêng: nhịp cắt, chữ, nhạc, phụ đề, khung an toàn cho chữ của TikTok/Reels.

**6. Xuất 9:16 (và 1:1 / 16:9 nếu cần).** Bản dọc là chính; các tỷ lệ khác chỉ làm khi kênh yêu cầu.

## Cần chuẩn bị gì trước buổi quay

- Số lượng video cần và deadline đăng
- 3–5 hook muốn thử (mỗi hook là một góc bán hàng khác nhau)
- Sản phẩm ưu tiên + bản dự phòng nếu dễ trầy/hư
- Ví dụ video TikTok/Reels mà thương hiệu thích tiết tấu
- Người duyệt nội dung trước khi đăng
- Tài khoản/định dạng đăng (TikTok, Reels, Facebook) để chốt khung chữ an toàn

Danh sách đầy đủ hơn cho quay sản phẩm nói chung có trong bài [Quay video sản phẩm cần chuẩn bị gì](/news/quay-video-san-pham-can-chuan-bi-gi). → LINK

## Giá quay video TikTok/Reels quảng cáo sản phẩm

Giá không cố định vì phụ thuộc số video, bối cảnh, có talent hay không, và mức độ hậu kỳ. Mức tham khảo hiện tại của Unitrux trong [bảng giá video short-form](/media-pricing#group-video-short-form): → LINK

- **1 video lẻ (Reel/TikTok Basic):** từ 2.000.000đ/video — quay tối đa 3 giờ, 1 video 30–60 giây, có subtitle, nhạc/SFX, color, 1–2 vòng chỉnh sửa.
- **Gói 3 video:** từ 4.700.000đ (khoảng 1.567.000đ/video) — quay batch tối đa 4 giờ.
- **Gói 5 video:** từ 7.900.000đ (khoảng 1.580.000đ/video) — quay batch tối đa 8 giờ.

Talent/KOL/KOC, thuê studio, props đặc thù và di chuyển ngoài khu vực được báo riêng. Mức này định vị thấp hơn đáng kể so với mặt bằng TVC thị trường (15–150tr+) vì đây là nội dung số lượng nhiều cho SME, không phải phim quảng cáo đơn lẻ.

## Những lỗi thường gặp

- Đầu tư quá nhiều vào một video "hoàn hảo" thay vì quay nhiều video để thử hook.
- Quay ngang rồi crop dọc, làm mất chi tiết và vỡ bố cục — video dọc cần quay dọc từ đầu.
- Không chừa khung an toàn cho chữ và nút của TikTok/Reels, khiến nội dung quan trọng bị che.
- Không thống nhất hook list trước, khiến buổi quay batch kéo dài và ra ít video.

## Câu Hỏi Thường Gặp

**Quay video TikTok/Reels quảng cáo sản phẩm giá bao nhiêu?**
Giá tham khảo của Unitrux bắt đầu từ 2.000.000đ cho một video lẻ, và khoảng 1.560.000–1.580.000đ/video khi đặt gói 3 hoặc 5 video quay batch. Giá chính thức phụ thuộc số video, bối cảnh, talent và mức hậu kỳ.

**Một buổi quay được bao nhiêu video TikTok/Reels?**
Thường 3–5 video nếu sản phẩm đơn giản, một bối cảnh và đã có hook list; 2–3 video nếu nhiều sản phẩm, đổi bối cảnh hoặc có người mẫu.

**Unitrux có quay video TikTok/Reels ngoài TP.HCM không?**
Có. Ekip đặt tại TP.HCM và có thể di chuyển đến các tỉnh lân cận tùy dự án — chi phí di chuyển được báo riêng.

**Có cần chuẩn bị kịch bản trước không?**
Không bắt buộc. Chỉ cần chia sẻ sản phẩm, mục tiêu và ví dụ video thích tiết tấu — Unitrux sẽ đề xuất hook list và shot list để cùng duyệt trước buổi quay.

## Bắt đầu một buổi quay video TikTok/Reels

[Gửi sản phẩm để Unitrux đề xuất concept](/contact) hoặc xem thêm tại [Sản xuất Video quảng cáo](/photography-video). → LINK

---

## 9. Image Plan (real assets only)

| Image (existing) | ALT (vi) | Position |
|---|---|---|
| `/images/img2.jpg` | Ekip Unitrux chuẩn bị máy quay và ánh sáng cho một buổi quay video ngắn | Featured + Quy trình §4 |
| `/images/img3.jpg` | Không gian dựng và hậu kỳ video của đội ngũ Unitrux | "Dựng theo từng video" §5 |
| `/images/img1.jpg` | Buổi quay tại địa điểm khách hàng | "Chuẩn bị sản phẩm và bối cảnh" |

`[UNITRUX CẦN BỔ SUNG: 1 ảnh chụp màn hình grid 5 video dọc của khách hàng spa (che thông tin nhận diện nếu cần) — bằng chứng trực quan mạnh nhất cho phần "một buổi được mấy video".]`

## 10. Social Distribution Package (Playbook §34+)

Campaign slug: `tiktok-reels-san-pham`. Destination = the article; conversion = `/photography-video`.

- **Facebook Page ×2:** (1) "Một buổi quay được 5 video TikTok — nếu chuẩn bị đúng 1 thứ" (hook list). (2) BTS 30s: một buổi quay batch diễn ra thế nào.
- **FB Group ×2:** nhóm chủ shop online / nhóm spa-salon — mở đầu bằng lỗi "quay ngang crop dọc", soft CTA về checklist.
- **Instagram:** 1 carousel "Hook list → shot list → quay batch → 5 video"; 1 Reel BTS 20s.
- **Threads ×3:** insight ("video TikTok cần nhiều bản, không cần 1 bản hoàn hảo"); lesson learned; câu hỏi thảo luận về ưu tiên ngân sách.
- **TikTok ×2:** "3 lỗi khiến video sản phẩm nhìn rẻ tiền"; "30s BTS một buổi quay batch".
- **Image assets:** 3–4 (dùng BTS thật ở §9). **Video assets:** 1–2 (bản cắt BTS batch — `[UNITRUX CẦN BỔ SUNG]`).

UTM: `?utm_source=<kênh>&utm_medium=organic-social&utm_campaign=tiktok-reels-san-pham`.

## 11. Post-Writing Audit (Playbook §28)

| Requirement | Status |
|---|---|
| Intent satisfied (commercial + price) | PASS |
| Correct keyword owner (§8) — funnels to /photography-video | PASS |
| No cannibalization | PASS (scoped to format/price/batch angle) |
| Direct answers (AEO §20) | PASS (Quick answer + FAQ lead with the answer) |
| Entity clarity (GEO §21) | PASS ("video TikTok/Reels quảng cáo sản phẩm" named, no "dịch vụ này") |
| Information gain (§17) | PASS (real 9:16 portfolio proof + batch model + VND anchors) |
| E-E-A-T (§18) | PASS (prices are the real `/media-pricing` figures; no fabricated clients/results; gaps marked) |
| Internal links (§13) | PASS (up: /photography-video; sideways: sibling article, /content-creation; down: /media-pricing; convert: /contact) |
| CTA (§16) | PASS (specific, not "xem thêm") |
| Images (§25) | PASS (real BTS only; 1 gap flagged) |
| Schema (§27) | PASS by pipeline (BlogPosting + FAQPage auto from markdown; no manual schema) |
| No keyword stuffing / unsupported claims | PASS |

## 12. Blocked / owed before publish

1. Publish to the external CMS (not doable from this repo).
2. Live `getNews()` scan for a pre-existing TikTok/Reels post.
3. Publish sibling `quay-video-san-pham-can-chuan-bi-gi` first (this article links to it).
4. After publish: confirm canonical `https://unitrux.com/news/quay-video-tiktok-reels-quang-cao-san-pham/`, request indexing in Search Console.
