# CMS-Ready Article — Copy Fields Below Directly Into the News CMS

Source: `docs/seo/CONTENT-BRIEFS/quay-video-san-pham.md` (approved brief, no new research done here).
Why this file exists instead of a live URL: audited on 2026-08-20 — `src/api/client.js` only exposes `GET` endpoints for news (`getNews`, `getNewsById`, `getFeaturedNews`); there is no `createNews`/write endpoint, no `.env`, and no admin script anywhere in this repository. News content is managed entirely by an external CMS at `be.unitrux.site` that this repo has no write access to. Everything below is field-for-field ready to paste into that CMS.

---

## Title

Quay Video Sản Phẩm Cần Chuẩn Bị Gì? Quy Trình Và Chi Phí Thực Tế

## Slug

```
quay-video-san-pham-can-chuan-bi-gi
```

This is the slug requested. Note: `src/utils/newsSlug.js`'s `getNewsSlug()` prefers a CMS-supplied `slug` field over the title-derived one — **set this exact value in the CMS's `slug` field** rather than relying on auto-slugification of the Title above (auto-slugifying the Vietnamese title would not reproduce this exact string).

## SEO Title

Quay Video Sản Phẩm Cần Chuẩn Bị Gì? Quy Trình Và Chi Phí Thực Tế

(No separate "| Unitrux" suffix needed — `scripts/generate-seo-pages.mjs`'s `buildPageTitle()` / the client `SEO.jsx` article handler already appends the site name pattern used elsewhere for articles.)

## Meta Description

Quay video sản phẩm cần chuẩn bị gì? Xem checklist, quy trình từng bước và các yếu tố ảnh hưởng chi phí từ kinh nghiệm thực tế của Unitrux.

(Verified by direct count, not estimated: 139 characters / 139 Unicode code points.)

## H1

There is **no separate H1 field** to fill in — `NewsDetailShowcase.jsx` renders the Title field above (`article.title`) as the page's one and only `<h1>` automatically. Do not create a separate H1 anywhere else (e.g. do not start the article body with a top-level `# ` markdown heading) — the body below intentionally starts at `##`, so exactly one `<h1>` exists on the live page: the Title, "Quay Video Sản Phẩm Cần Chuẩn Bị Gì? Quy Trình Và Chi Phí Thực Tế".

## Excerpt

Quay video sản phẩm là quá trình biến sản phẩm thật thành nội dung video dùng cho website, sàn thương mại điện tử, mạng xã hội và quảng cáo. Bài viết này đi qua quy trình từng bước, checklist chuẩn bị trước ngày quay, và các yếu tố ảnh hưởng đến chi phí — dựa trên kinh nghiệm sản xuất thật của Unitrux.

## Category

Kiến thức Digital

(Matches the category convention already used for `/news` content — `article.category || 'Kiến thức Digital'` per `generate-seo-pages.mjs`'s default.)

## Tags

```
quay video sản phẩm, sản xuất video sản phẩm, video quảng cáo, quy trình sản xuất video, video sản phẩm
```

## Author

Unitrux Team

(No named individual author exists in the source material for this topic; using the team byline per the site's existing `${SITE_NAME} Team` fallback convention rather than inventing a person.)

---

## Featured Image

**File:** `/images/img2.jpg` (already live in `public/images/`, used in `productionBehindTheScenes` as `bts-lighting-check` — a real Unitrux asset, not stock)

**Why this asset instead of `/images/img4.jpg`:** `img4.jpg` is explicitly categorized in `productionBehindTheScenes` as `"Chụp ảnh sản phẩm"` / "Product photography" (its own visible content, checked directly, is a still-camera + laptop tethering setup — a photography rig, not a video shoot). `img2.jpg` is the more fitting asset for a "quay video sản phẩm" article: its existing category is `"Hậu trường sản xuất"` / "Production process" and its existing Vietnamese label already uses the video-specific verb "quay" (`"Ekip canh sáng trước khi quay"` — crew checking lighting before filming), and it's also one of the real thumbnail images already tied to two live entries in `productionPortfolio.items` (`bienhoa-brand-film-1`, `spa-social-film-2`).

**Verified by direct visual inspection of the file:** two crew members working around a camera mounted on a stand with a softbox light — one person adjusting the camera's flip-out screen/settings, the other standing just behind. No product is visibly identifiable in the frame, so the ALT below does not claim one is shown.

**ALT text:** Ekip Unitrux canh sáng và kiểm tra máy quay trước một buổi quay video

This describes only what the frame actually shows (crew, camera, lighting check, pre-shoot moment) — it does not claim a specific product is visible, and does not overclaim beyond the image (no invented client name, location, or product detail).

If the CMS requires uploading a fresh copy rather than referencing the existing public path, upload the same file and keep this exact ALT text.

---

## Internal Links (place exactly where marked `→ LINK` in the article body below)

| Anchor text | Target URL | Purpose |
|---|---|---|
| Sản xuất Video quảng cáo | `/photography-video` | Link DOWN FUNNEL to the Money Page (already updated in code to link back — see note at the end of this file) |
| Sáng tạo nội dung đa kênh | `/content-creation` | Sideways — downstream repurposing service |
| Gửi sản phẩm để Unitrux đề xuất hướng quay | `/contact` | Conversion CTA |

`/product-photography` is deliberately **not** linked from this article — nothing in the body discusses still photography specifically, and forcing that link in would not read naturally. Only link it in a future revision if a section genuinely needs it.

**CMS structured fields, if available** (seen consumed by `NewsDetailShowcase.jsx`):
- `relatedServiceIds`: `["/photography-video"]` — this renders an automatic "Related services" block at the bottom of the article pointing to `/photography-video`; set this even if you also hand-link it in the body copy above.
- `relatedArticleIds`: leave empty unless another live `/news` article on this same topic already exists — could not be checked from this repo (the news list is only reachable via a live network call to `be.unitrux.site`, which timed out when attempted during this session's build — see the build log note at the end).

---

## CTA

Primary: **Gửi sản phẩm để Unitrux đề xuất hướng quay** → `/contact`
Secondary: **Xem portfolio video sản phẩm** → `/photography-video`

---

## Full Markdown Article

Paste everything between the two `---` markers below as the article body / content field. The `## Câu Hỏi Thường Gặp` heading and the bold-question format in the FAQ section are written to match `src/seo/schemaFactory.js`'s `extractFaqFromMarkdown()` parser exactly, so the CMS's existing pipeline will auto-generate `FAQPage` JSON-LD from this markdown without any extra schema configuration — do not reformat that section into a different heading style or the parser will not pick it up.

---

Quay video sản phẩm là quá trình biến sản phẩm thật thành nội dung video dùng cho website, sàn thương mại điện tử, mạng xã hội và quảng cáo. Trước khi quay, doanh nghiệp cần xác định rõ sản phẩm nào ưu tiên, kênh sẽ đăng, và tỷ lệ khung hình cần dùng (ngang cho website/YouTube, dọc cho TikTok/Reels). Chi phí phụ thuộc vào số ngày quay, bối cảnh, thiết bị, nhân sự và số phiên bản cần bàn giao — không có một mức giá chung cho mọi trường hợp.

## Quay video sản phẩm là gì? Dùng ở đâu?

Quay video sản phẩm là việc ghi hình sản phẩm, cách sử dụng hoặc không gian liên quan để tạo ra nội dung video phục vụ nhiều mục đích: giới thiệu trên website, làm nội dung listing cho sàn thương mại điện tử, đăng trên Facebook và Instagram, cắt bản dọc cho TikTok/Reels, hoặc dùng trực tiếp làm quảng cáo trả phí. Cùng một sản phẩm, cách quay và dựng sẽ khác nhau tùy kênh sẽ đăng — đây là lý do quy trình dưới đây bắt đầu từ việc xác định mục tiêu trước, không phải từ việc quay trước rồi tính sau.

## Quy trình quay video sản phẩm

**1. Xác định mục tiêu.** Video này phục vụ website, quảng cáo, hay mạng xã hội? Mục tiêu khác nhau dẫn đến cách quay, độ dài và nhịp dựng khác nhau.

**2. Concept.** Thống nhất hướng hình ảnh: video sản phẩm đơn giản, có người mẫu sử dụng, hay theo hướng storytelling thương hiệu.

**3. Shot list.** Danh sách cảnh quay cụ thể — góc máy, chi tiết cần nhấn, thứ tự ưu tiên nếu thời gian quay có hạn.

**4. Sản xuất.** Quay tại studio hoặc tại địa điểm thực tế (cửa hàng, xưởng, không gian sử dụng sản phẩm), sau khi đã khảo sát ánh sáng và không gian.

**5. Hậu kỳ.** Dựng, chỉnh màu, thêm nhạc/chữ theo từng phiên bản.

**6. Xuất đa định dạng.** Cùng một nguồn quay được xuất thành các tỷ lệ khung hình khác nhau (16:9 cho website/YouTube, 9:16 cho TikTok/Reels, 1:1 hoặc 4:5 cho feed) theo đúng phạm vi đã thống nhất.

## Quay video sản phẩm cần chuẩn bị gì? (Checklist)

- Danh sách sản phẩm ưu tiên quay (không cần quay hết mọi sản phẩm trong một buổi)
- Số lượng mỗi sản phẩm cần có mặt tại buổi quay (kể cả bản dự phòng nếu dễ hư/trầy)
- Ví dụ hình ảnh/video tham khảo mà doanh nghiệp thích phong cách
- Kênh sẽ đăng (website, quảng cáo, TikTok, Instagram...) để xác định tỷ lệ khung hình
- Người phê duyệt nội dung trước khi bàn giao bản cuối
- Địa điểm quay: studio hay tại chỗ (cửa hàng, xưởng, không gian sử dụng)
- Khung giờ có ánh sáng tự nhiên tốt nhất nếu quay tại chỗ
- Người mẫu hoặc nhân sự xuất hiện trong video (nếu có)
- Đạo cụ hoặc bối cảnh phụ trợ cần chuẩn bị thêm
- Thời hạn cần nhận bản dựng đầu tiên

## Những yếu tố ảnh hưởng đến chi phí

Chi phí quay video sản phẩm không cố định vì phụ thuộc vào nhiều biến số thực tế:

- Số ngày quay và số sản phẩm/bối cảnh cần ghi hình
- Địa điểm: quay tại studio hay di chuyển đến địa điểm khách hàng
- Thiết bị: máy quay, ánh sáng, thiết bị chuyển động (nếu cần)
- Nhân sự: quay phim, đạo diễn hình ảnh, trợ lý, người mẫu (nếu có)
- Đạo cụ và bối cảnh phụ trợ
- Số phiên bản cần bàn giao (một video gốc so với nhiều bản cắt cho từng kênh)
- Mức độ hậu kỳ: dựng đơn giản so với color grading và motion graphics chuyên sâu

## Một dự án có thể tạo ra bao nhiêu phiên bản nội dung?

Một dự án sản xuất được lên kế hoạch tốt có thể tạo ra nhiều phiên bản nội dung cho các kênh khác nhau, thay vì phải quay lại riêng cho từng kênh. Trong portfolio hiện tại của Unitrux, cùng một khách hàng spa có nhiều phiên bản video ở cả tỷ lệ ngang 16:9 và dọc 9:16, phù hợp với các nhóm kênh và mục đích phân phối khác nhau. Một khách hàng khác tại Biên Hòa cũng có cả một bản phim tiêu chuẩn và một bản mở rộng được sản xuất riêng cho website và các kênh nội dung. Đây là ví dụ cho thấy cách một dự án có thể được tổ chức để phục vụ nhiều điểm chạm nội dung, nếu mục tiêu và kênh phân phối được xác định rõ ngay từ bước đầu tiên của quy trình ở trên. Xem thêm ví dụ thực tế tại [Sản xuất Video quảng cáo](/photography-video).

## Video ngang hay dọc?

Không có câu trả lời chung cho mọi kênh:

- **16:9 (ngang)**: website, YouTube, phần lớn nội dung trình chiếu trên màn hình lớn
- **9:16 (dọc)**: TikTok, Reels, Stories
- **1:1 / 4:5**: feed Facebook và Instagram

Quyết định này cần được thống nhất ở bước "Xác định mục tiêu" và "Shot list", không phải sau khi quay xong mới tính cách cắt.

## Những lỗi thường gặp

- Mang toàn bộ sản phẩm đến buổi quay mà chưa xác định sản phẩm nào ưu tiên quay trước, dẫn đến buổi quay kéo dài và bỏ sót sản phẩm quan trọng.
- Chưa xác định kênh sẽ đăng trước khi quay, nên chỉ có một tỷ lệ khung hình và phải quay lại nếu cần bản dọc cho TikTok.
- Không có người chịu trách nhiệm duyệt nội dung, khiến bản dựng bị sửa nhiều vòng sau khi đã hoàn thành.

Nội dung được sản xuất, dựng và xuất bản theo checklist này thường phối hợp cùng dịch vụ [Sáng tạo nội dung đa kênh](/content-creation) của Unitrux khi cần phân phối đồng thời trên nhiều nền tảng.

## Câu Hỏi Thường Gặp

**Quay video sản phẩm giá bao nhiêu?**
Không có một mức giá cố định vì chi phí phụ thuộc vào số ngày quay, địa điểm, thiết bị, nhân sự và số phiên bản cần bàn giao. Unitrux khảo sát nhu cầu cụ thể trước khi báo giá theo đúng phạm vi.

**Có cần ý tưởng sẵn trước khi liên hệ không?**
Không bắt buộc. Chỉ cần chia sẻ sản phẩm, mục tiêu và kênh dự kiến đăng — Unitrux sẽ đề xuất concept và shot list để cùng duyệt trước ngày quay.

**Một buổi quay có dùng được cho nhiều kênh không?**
Có thể dùng chung nguồn quay, nhưng mỗi kênh cần tỷ lệ khung hình, nhịp dựng và thời lượng riêng — các phiên bản này cần được xác định trong phạm vi bàn giao trước khi quay, không phải sau khi quay xong.

**Có thể quay tại cửa hàng hoặc xưởng thay vì studio không?**
Có. Sau khi khảo sát ánh sáng, âm thanh và không gian thực tế, Unitrux sẽ đề xuất phương án phù hợp.

## Bắt đầu một dự án quay video sản phẩm

[Gửi sản phẩm để Unitrux đề xuất hướng quay](/contact) hoặc xem thêm tại [Sản xuất Video quảng cáo](/photography-video).

---

## Schema data (only if the CMS asks for it explicitly — normally auto-generated)

The site's own pipeline (`buildArticleStructuredData()` in `src/seo/seoConfig.js`, invoked both client-side via the `seo:article` event and at build time by `scripts/generate-seo-pages.mjs`) generates `BlogPosting` + `FAQPage` JSON-LD automatically from the CMS fields above — **no manual schema entry should be needed** as long as:
- `title`, `excerpt`/`description`, `image`, `author`, `category` (→ `articleSection`), `tags` (→ `keywords`), `createdAt`/`updatedAt` are filled in the CMS as normal fields, and
- the FAQ section in the body keeps the exact `## Câu Hỏi Thường Gặp` heading + bold-question format shown above (this is what `extractFaqFromMarkdown()` parses).

**On what this FAQ schema actually does — checked against current Google documentation, not assumed:** `developers.google.com/search/docs/appearance/structured-data/faqpage` states the FAQ rich result was deprecated in **May 2026** and "is no longer shown in Google Search results" for any site (the documentation itself, the Search Console report, and Rich Results Test support for it were all removed by June 2026). FAQPage JSON-LD can keep being generated by this existing pipeline — it's harmless and keeps the site's structured data consistent — but it should not be described as producing a rich result, and it is **not** a requirement or ranking signal for appearing in AI Overview or AI Search. The real value of this FAQ section is answering the reader's actual questions directly, supporting AEO/query-fan-out coverage, and giving both readers and AI systems a clear, self-contained statement of entity and intent — not chasing a rich snippet that no longer exists in Google Search.

If the CMS has a **separate structured `faqs` field** (distinct from the markdown body) instead of relying on markdown parsing, prefer that field and enter the same 4 Q&A pairs there — `schemaFactory.js`'s own comment states a structured field should be preferred over markdown-parsing once one exists.

---

## Publish Checklist

**Before publishing**
- [ ] Title entered exactly as in the Title section above
- [ ] Slug set exactly to `quay-video-san-pham-can-chuan-bi-gi` (not auto-generated from the Vietnamese title)
- [ ] Meta description entered exactly as in the Meta Description section above (139 characters, verified by count, no truncation)
- [ ] Excerpt entered
- [ ] Category set to `Kiến thức Digital`
- [ ] Tags entered
- [ ] Author set (Unitrux Team, or a real named author if Unitrux wants to attribute one)
- [ ] Featured image uploaded/linked (`/images/img2.jpg`), ALT text set exactly as specified — describes only what's visible (crew, camera, lighting check) with no product claim
- [ ] Full article body pasted, including the `## Câu Hỏi Thường Gặp` section verbatim (heading text must not be altered)
- [ ] Internal links present in the body: `/photography-video`, `/content-creation`, `/contact`
- [ ] `relatedServiceIds` includes `/photography-video` if that field exists in the CMS
- [ ] `createdAt` set to the actual publish date (this file does not assume one)
- [ ] No H1 duplication — the CMS template should render `article.title` as the page's only H1; do not also add an `# H1`-level heading inside the body (the body already starts at `##`)
- [ ] No unsupported claims present — pricing, KPIs, and "same shoot" framing were deliberately removed/reworded in this revision; do not re-add specific prices, client results, or a claim that specific deliverables came from one shoot/session without new evidence

**After publishing**
- [ ] Canonical tag on the live page is `https://unitrux.com/news/quay-video-san-pham-can-chuan-bi-gi/`
- [ ] Live URL loads correctly and matches the intended slug
- [ ] `<title>` and meta description on the live page match what was entered
- [ ] Structured data has no errors — confirm the page's JSON-LD parses without console/validator errors if the CMS pipeline generates it (a clean FAQPage node is a "no errors" check, not a requirement to show a Google rich result — see the Schema data section above for why)
- [ ] Mobile render checked — layout, images and FAQ accordion (if any) display correctly on a mobile viewport
- [ ] No broken internal links — `/photography-video`, `/content-creation`, and `/contact` all resolve
- [ ] Money Page backlink confirmed — `/photography-video` links back to this article under the same slug (already applied in `src/components/PhotographyVideoService.jsx`; recheck if the CMS assigns a different slug — see the code-side note below)
- [ ] Featured image renders correctly at its live URL with the specified ALT text intact

---

## Note on the code-side link dependency

The Money Page update applied in this same task (`src/components/PhotographyVideoService.jsx`, `src/seo/seoConfig.js`) already links to `/news/quay-video-san-pham-can-chuan-bi-gi` in two places, trusting that this article will be published under that exact slug. **If the CMS ends up assigning a different slug**, those two links in `PhotographyVideoService.jsx` need a one-line update to match — search the file for `quay-video-san-pham-can-chuan-bi-gi` to find both occurrences.
