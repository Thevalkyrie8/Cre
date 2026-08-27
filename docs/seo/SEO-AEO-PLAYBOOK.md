# Unitrux SEO/AEO/GEO Playbook

**This file is the SEO Source of Truth for the entire Unitrux website project.**

Every AI agent (and every human) that creates, edits, extends, or optimizes a page, service, article, or case study on this site **must read this file before doing that work.** It exists so that content decisions stay consistent over time instead of being re-invented (and re-contradicted) session by session.

Every non-trivial claim in this file is tagged as one of three kinds, per the audit protocol that produced it:

- **[CURRENT]** — what the website actually has today, verified by reading the source code on 2026-08-20.
- **[RULE]** — a mandatory rule every future AI/agent must follow when touching SEO-relevant content.
- **[RECOMMENDATION]** — a change that would help but that the website does **not** have yet. Never present a recommendation as if it were already live.

Where a `[CURRENT]` claim conflicts with an existing doc or with itself, the conflict is called out explicitly rather than silently resolved — see [§31 Known Technical Debt](#31-known-technical-debt) and [§32 Decisions Pending](#32-decisions-pending).

---

## 1. Purpose

Unitrux is a Vietnamese digital agency selling 10 named growth services plus e-commerce, built on a Vite + React 18 SPA (bilingual EN/VI) deployed to GitHub Pages at `unitrux.com`. This playbook exists to prevent the two failure modes that hit growing content sites hardest:

1. **Keyword cannibalization** — two pages competing for the same search intent because nobody checked what already exists.
2. **Content without a system** — articles written because "we need more content" rather than because they fill a specific, owned gap in a topic cluster that funnels toward a specific Money Page.

**[RULE]** No AI agent may create a new SEO-relevant page, article, or route without first reading this file and completing the [Article Pre-Flight Check](#28-article-creation-protocol--pre-publish-checklist) in §28–29.

---

## 2. Current Website Architecture

**[CURRENT]** — audited directly from source on 2026-08-20.

- **Stack**: Vite + React 18 SPA, `react-router-dom`, no TypeScript, no SSR. Real entry: `index.html` → `src/main.jsx` → `src/App.jsx`.
- **Routing**: `src/App.jsx`. `Home` is eager; every other route is `React.lazy()`.
- **SEO config**: `src/seo/seoConfig.js` is the single source of truth for per-route title/description/FAQ/schema data (the `seoPages` object). `src/seo/schemaFactory.js` builds the actual JSON-LD nodes and validates them.
- **SEO runtime**: `src/components/SEO.jsx` rewrites `<title>`, meta tags, canonical, and injects JSON-LD on every client-side route change (`useLocation` effect), and listens for `seo:service` / `seo:article` custom events so CMS-driven detail pages (services, news) can override the static config with live data.
- **Build-time prerendering**: `npm run build` = `node scripts/validate-schema.mjs` (schema/SEO contract gate — **fails the build** on any violation) → `vite build` → `node scripts/generate-seo-pages.mjs`. The generator script fetches live `/services` and `/news` from the backend (`be.unitrux.site`) and writes fully-formed, crawlable static HTML (title, meta, JSON-LD, visible content) into `dist/<route>/index.html` for every static route in `seoPages`, every CMS service, and every news article — plus a fresh `dist/sitemap.xml`.
- **Deploy**: `.github/workflows/deploy.yml` builds and pushes `dist/` to GitHub Pages on push to `feat/init-project-react` / `main` / `master`. Custom domain `unitrux.com` via root `CNAME` (not copied into `dist/` by Vite — the domain binding lives in the GitHub Pages settings, not the build artifact).
- **CMS**: Two dynamic content types come from a backend at `https://be.unitrux.site/api` — **News articles** (`/news`, `/news/:id`) and **CMS Services** (`/services/:id`, a secondary, admin-managed service catalog distinct from the 10 hand-coded service routes below). Both get JSON-LD built at request time client-side (`buildArticleStructuredData`, `buildCmsServiceStructuredData`) and pre-rendered at build time.
- **i18n**: Bilingual EN/VI via `data-en` / `data-vi` attributes swapped by `Layout.jsx`'s `applyLanguage()`, not a routing-level i18n split (no `/en/`, `/vi/` path prefixes, no `hreflang`).

**[CURRENT] Full route table** (from `src/App.jsx`):

| Route | Component | Page type |
|---|---|---|
| `/` | `Home` | Homepage |
| `/about` | `ThemedAbout` | AboutPage |
| `/services` | `ThemedServices` | CollectionPage (catalog of all services) |
| `/services/:id` | `ServiceDetail` | CMS Service detail — **noindex always** (client default; static prerender only exists for active CMS services) |
| `/packages` | `ThemedPackages` | CollectionPage (pricing) |
| `/news` | `ThemedNews` | CollectionPage (article index) |
| `/news/:id` | `ThemedNewsDetail` | BlogPosting (CMS article) |
| `/digital-solutions` | `ServiceLanding` (`serviceKey="digital-solutions"`) | Service / Money Page (01) |
| `/fanpage-management` | `ServiceLanding` (`serviceKey="fanpage-management"`) | Service / Money Page (02) |
| `/chatbox-ai` | `ThemedServiceDetail` (`type="chatbox"`) | Service / Money Page (03) |
| `/content-creation` | `ServiceLanding` (`serviceKey="content-creation"`) | Service / Money Page (04) |
| `/digital-marketing` | `DigitalMarketingLanding` | Service / Money Page (05) |
| `/automation` | `AutomationService` | Service / Money Page (06) |
| `/seo-services` | `ServiceLanding` (`serviceKey="seo-services"`) | Service / Money Page (07) |
| `/photography-video` | `PhotographyVideoService` | Service / Money Page (08) — carries the only live VideoObject/portfolio schema |
| `/product-photography` | `ServiceLanding` (`serviceKey="product-photography"`) | Service / Money Page (09) |
| `/web-development` | `ServiceLanding` (`serviceKey="web-development"`) | Service / Money Page (10) |
| `/ecommerce` | `ThemedServiceDetail` (`type="ecommerce"`) | Service / Money Page (not in the numbered 10, but same tier) |
| `/templates` | `TemplatesPage` | CollectionPage (live demo-site catalog) |
| `/ui-ux-design` | → redirect to `/web-development` | Retired route (`legacyRedirects`) |
| `/contact` | `ThemedContact` | ContactPage (funnel destination) |
| `/content-standards` | `ContentStandards` | WebPage (E-E-A-T / editorial-policy page) |
| `/privacy-policy`, `/terms`, `/delete-data` | — | Compliance pages, not SEO-targeted |
| `*` | `NotFound` | noindex |

**[CURRENT]** Six service routes share one template component, `ServiceLanding.jsx`, driven by two data files that must stay in sync: `src/data/servicesContent.js` (page copy: intro, stats, problem, capabilities, process, deliverables, **relatedServices** — the internal-link-out list) and `src/seo/seoConfig.js` (FAQs + JSON-LD schema config, keyed by the same `serviceKey`). The other five service-tier routes (`chatbox-ai`, `ecommerce`, `digital-marketing`, `automation`, `photography-video`) each have their own bespoke component and do not follow the `servicesContent.js` shape.

---

## 3. Business & SEO Objectives

**[RULE]** The funnel this whole architecture is built to serve:

```
Search Query → Unitrux Result → Helpful Content → Service Page → Portfolio/Case Study → Contact/Zalo/Form → Lead
```

**[RULE]** Priority order for SEO work, in this order, not by raw search volume:

1. Qualified organic traffic (real buyer intent, not vanity traffic)
2. Commercial search intent
3. Local search (Ho Chi Minh City / Vietnam)
4. Topical authority
5. Brand authority
6. Classic Google Search ranking
7. Google AI Overview appearance
8. AEO (featured snippets, "People also ask")
9. GEO / AI-search citation (ChatGPT, other AI answer engines)
10. Conversion (the `/contact` form and the Zalo link are the two live conversion endpoints — see §9)

---

## 4. Entity Architecture

**[CURRENT]** Primary entity, exactly as declared in the live `Organization` JSON-LD node (`src/seo/seoConfig.js`, emitted on every page):

- **Name**: Unitrux — legal name **CÔNG TY TNHH UNITRUX**, tax ID `0319201007`, founding date `2025-10-06`.
- **Legal representative**: NGUYỄN TRUNG ĐỨC (separate `Person` node, `worksFor` the organization).
- **Address**: 84/12 Đường An Phú Đông 03, Phường An Phú Đông, Thành phố Hồ Chí Minh, VN.
- **Contact**: `info@unitrux.com`, `+84 938 695 186`, hours Mon–Fri 08:00–17:30 ICT.
- **`sameAs` entity graph** (exactly these four, per the live schema): Facebook `/UnitruxCreativeStudio`, LinkedIn `/company/unitrux`, YouTube `@UnitruxDigitalMarketing`, TikTok `@unitruxmarketing`.
  - Note: the site footer also links two more Facebook pages (`UnitruxEcommercePro`, `UnitruxDigitalMarketing`) that are **not** in the `sameAs` graph — see §31.
- **`knowsAbout`**: Product Photography, Advertising Video Production, Website Development, Search Engine Optimization, AI Chatbot, Digital Marketing, Marketing Automation, E-commerce, UI/UX Design.

**[CURRENT]** Entity relationship map, derived from the real 10-service catalog (`src/data/services.js`) plus e-commerce:

```
Unitrux
 ├─ App & Digital Solution Design        (/digital-solutions)
 ├─ Professional Fanpage Setup           (/fanpage-management)
 ├─ AI Chatbot Customer Care             (/chatbox-ai)
 ├─ Multi-Channel Content Creation       (/content-creation)
 ├─ Multi-Platform Advertising           (/digital-marketing)
 ├─ Marketing Automation                 (/automation)
 ├─ SEO / AEO / GEO                      (/seo-services)
 ├─ Advertising Video Production         (/photography-video)
 ├─ Product & Brand Photography          (/product-photography)
 ├─ Website Design (UI/UX + SEO/AEO/GEO) (/web-development)
 └─ E-commerce & Marketplace             (/ecommerce)
```

**[RULE]** Do not add a service, entity, or `knowsAbout` value to this map that is not backed by an actual route/schema in the codebase. If a new service is added to `src/data/services.js`, update this section in the same change (see §33 Changelog discipline).

---

## 5. Service Taxonomy

**[CURRENT]** — Money Keyword column is inferred from each page's own live title/H1/schema copy (not from keyword-tool volume data — see the caveat in §8). Supporting Clusters are what currently exists, not proposed new content.

| Service | Primary URL | Primary Entity | Primary Search Intent | Money Keyword (inferred from on-page copy) | Supporting Clusters (currently live) |
|---|---|---|---|---|---|
| 01 App & digital solution design | `/digital-solutions` | Digital solutions / MVP | Commercial | "thiết kế ứng dụng và giải pháp số" | none — no dedicated articles exist |
| 02 Fanpage setup | `/fanpage-management` | Facebook Fanpage setup | Commercial | "xây dựng fanpage chuyên nghiệp" | none |
| 03 AI chatbot | `/chatbox-ai` | AI Chatbot | Commercial / Transactional | "chatbot ai cho fanpage" | none |
| 04 Multi-channel content | `/content-creation` | Content production | Commercial | "sáng tạo nội dung đa kênh" | none |
| 05 Multi-platform advertising | `/digital-marketing` | Paid ads (Google/Meta/TikTok) | Transactional | "dịch vụ chạy quảng cáo đa nền tảng" | none |
| 06 Marketing automation | `/automation` | Marketing/CRM automation | Commercial | "tự động hóa quy trình doanh nghiệp" | none |
| 07 SEO/AEO/GEO | `/seo-services` | Search/answer/AI-search optimization | Commercial | "dịch vụ seo/aeo/geo" | none |
| 08 Advertising video production | `/photography-video` | Video production | Commercial / Transactional | "sản xuất video quảng cáo" | portfolio (VideoObject ×9, live) |
| 09 Product & brand photography | `/product-photography` | Product/brand photography | Commercial / Transactional | "chụp ảnh sản phẩm và thương hiệu" (re-scoped away from video language 2026-08-27, CANN-01) | gallery (4 images, shared with §08 BTS set) |
| 10 Website design (UI/UX+SEO) | `/web-development` | Web design agency | Commercial / Transactional | "thiết kế website chuẩn seo" | `/templates` (17 live demo sites across 5 industry groups — salon, cafe, F&B, real estate, e-commerce) |
| E-commerce | `/ecommerce` | E-commerce/marketplace builds | Commercial | "giải pháp e-commerce" | none |

**[RECOMMENDATION]** Every "Supporting Clusters" cell that reads "none" is a real content gap — see §26 Content Gap. Do not fill these by mass-producing generic articles; follow §7's Pillar/Service/Article distinction and the cannibalization check in §11 first.

---

## 6. SEO Page Types

**[RULE]** Six levels. Every new page must be assigned one before it is built.

| Level | Definition | Current examples |
|---|---|---|
| **1 — Brand/Category** | The homepage; establishes the brand and the 10-service system as a whole | `/` |
| **2 — Core Service** | `/services` catalog page, aggregating all services | `/services` |
| **3 — Sub-service / Money Page** | One service, one primary transactional intent, one URL | The 11 routes in §5 |
| **4 — Commercial Content** | Pricing/comparison/checklist content that supports a Money Page without competing with it | `/packages` (pricing) is the only one live |
| **5 — Informational Content** | How-to / definition / guide content, TOFU–MOFU | `/news/:id` (CMS-driven, currently generic — not mapped per-cluster, see §26) |
| **6 — Case Study / Proof** | Evidence of real work | The `/photography-video` portfolio (9 real client videos) and `/product-photography` gallery (4 real shoot photos) are the only true Level-6 assets on the site today |

**Every level, when built, needs**: a goal, keyword intent, URL pattern, internal-link rule, CTA rule, matching schema type, content requirements. See §13 (linking), §21 (on-page), §19–21 (schema/structured data) for the concrete rules.

---

## 7. Topic Cluster Architecture

**[RULE — Pillar vs. Service vs. Article vs. Case Study]**

- **Pillar Page**: broad topic coverage, links down into every Money Page in its cluster. **[CURRENT: none exist.]** `/services` is the closest thing (a catalog, Level 2), but it is not written as a topic pillar with in-depth coverage — it is a listing.
- **Service / Money Page**: targets a clear transactional/commercial query. The 11 routes in §5.
- **Supporting Article**: how-to, pricing explainer, comparison, checklist, definition, mistakes, prep guide. **[CURRENT: `/news` is CMS-driven and could hold these, but nothing in the codebase maps a news article to a specific service cluster — there's no `relatedService` or `cluster` field on news content.]**
- **Case Study**: proof of real work. Only the video/photo galleries above qualify today; there is no narrative case-study format (Context → Problem → Objective → Approach → Result) anywhere in the codebase.

**[RULE]** A Supporting Article must never be allowed to out-rank or compete with its own cluster's Money Page for the same primary transactional keyword. Since `/news` currently has no cluster mapping, this is a live risk the moment news content starts covering service topics — flag it per §11 before publishing any news article whose topic overlaps a Money Page in §5.

---

## 8. Keyword Ownership Map

**[RECOMMENDATION — read this caveat first]**: The table below assigns one owner URL per keyword **based on what each live page's own title/H1/schema already claims**, not on Search Console data, a keyword tool, or estimated volume (none of that data exists in this repo). Treat "Priority" here as a placeholder ordering by service-catalog position (`src/data/services.js`'s `number` field), not a real business-value ranking, until real Search Console/GSC data is available (§30, §50).

| Primary Keyword | Search Intent | Primary URL | Page Type | Priority | Supporting Keywords (from on-page copy) |
|---|---|---|---|---|---|
| thiết kế ứng dụng và giải pháp số | Commercial | `/digital-solutions` | Money Page | 1 | MVP, hệ thống đặt lịch, ứng dụng quản lý dữ liệu |
| xây dựng fanpage chuyên nghiệp | Commercial | `/fanpage-management` | Money Page | 2 | thiết lập hình ảnh fanpage, content pillar |
| chatbot ai cho fanpage | Transactional | `/chatbox-ai` | Money Page | 3 | chatbot ai zalo oa, trợ lý ai website |
| sáng tạo nội dung đa kênh | Commercial | `/content-creation` | Money Page | 4 | content calendar, content pillar đa kênh |
| dịch vụ chạy quảng cáo đa nền tảng | Transactional | `/digital-marketing` | Money Page | 5 | google ads, facebook ads, tiktok ads |
| tự động hóa quy trình doanh nghiệp | Commercial | `/automation` | Money Page | 6 | marketing automation, tự động hóa crm |
| dịch vụ seo/aeo/geo | Commercial | `/seo-services` | Money Page | 7 | technical seo audit, aeo geo cho thương hiệu |
| sản xuất video quảng cáo | Transactional | `/photography-video` | Money Page | 8 | quay video sản phẩm, video social tiktok/reels |
| chụp ảnh sản phẩm và thương hiệu | Transactional | `/product-photography` | Money Page | 9 | chụp ảnh sản phẩm, chụp ảnh không gian, hình ảnh thương hiệu (video intent handed off to `/photography-video` — CANN-01) |
| thiết kế website chuẩn seo | Transactional | `/web-development` | Money Page | 10 | ui/ux website, core web vitals, mẫu website |
| giải pháp e-commerce | Commercial | `/ecommerce` | Money Page | 11 | marketplace, storefront |
| mẫu website thật | Commercial | `/templates` | Collection | — | (feeds `/web-development`, does not compete with it) |
| bảng giá dịch vụ digital | Commercial | `/packages` | Collection | — | (feeds every Money Page above) |

**[RULE]** Before adding any new keyword to this table, check it is not already implicitly owned by a row above (see §11).

---

## 9. Money Pages

**[CURRENT]** The 11 routes in §5's Service Taxonomy table are the Money Pages. All 11 share the same two conversion endpoints:

- `/contact` (a form, `ContactForm.jsx` → `createContact()` in `src/api/client.js`, POST `/contacts`)
- A direct Zalo link (`https://zalo.me/3299309778518905129`), present as a CTA on every `ServiceLanding`-templated page and floating in `Layout.jsx`'s footer buttons.

**[RULE]** No Money Page may exist without both: a working link to `/contact` and a clear statement of what the service includes, who it's for, and what happens after contact. See §37.

---

## 10. Search Intent Rules

**[RULE]** Classify every keyword before writing: Informational / Commercial Investigation / Transactional / Local / Navigational / Mixed.

- Informational → guide/article (Level 5)
- Commercial → comparison/pricing/supporting content (Level 4)
- Transactional → Money Page (Level 3)
- Local → only build a dedicated local landing page if there is a real local value proposition; **[CURRENT] there is no local-landing-page pattern anywhere in this codebase, and none should be invented as a "quận-1, quận-2, quận-3" doorway set (see §36, §54).**

---

## 11. Cannibalization Rules

**[RULE]** Before creating **any** new page or article, check, in order:

1. Does a URL already own this keyword? → check §8's Keyword Ownership Map.
2. Does the Search Intent match an existing page's intent?
3. Is there a Money Page (§5/§9) already targeting this exact transactional intent?
4. Is there a similar `/news` article already live? (Requires querying the live CMS via `getNews()` in `src/api/client.js` — this repo has no static list of news content, it's fetched at runtime/build time from `be.unitrux.site`.)
5. Should the old page be updated instead of a new one created?

If any check raises a risk, output:

```
CANNIBALIZATION WARNING
```

and propose one of: merge, update, change keyword, change intent, canonical, or (only if truly necessary) redirect. **Never** silently create a second URL for a keyword/intent §8 already assigns to another page.

**[CURRENT] Worked example already in this codebase**: `/ui-ux-design` used to be its own service page; it was merged into `/web-development` and is now a `legacyRedirects` entry (`src/seo/seoConfig.js`) that both the client router (`<Navigate>` in `App.jsx`) and the build script (a meta-refresh HTML stub in `generate-seo-pages.mjs`) redirect to `/web-development/`. This is the reference pattern for resolving a cannibalization/consolidation decision — reuse it if two service pages are ever merged again.

---

## 12. URL Rules

**[RULE]**

- lowercase, no diacritics, hyphen-separated, descriptive, short — matches every current route (`/digital-solutions`, `/product-photography`, etc.)
- Do not change a live route's URL without going through the `legacyRedirects` pattern in §11.
- Do not create a `#fragment` as a substitute for a real page when the search intent needs a dedicated landing page.
- News article URLs use a slug (`getNewsSlug()` in `src/utils/newsSlug.js`, `/news/:slug`) sourced from the CMS — not hand-authored per this repo, so slug quality depends on what the CMS produces.

---

## 13. Internal Linking Architecture

**[CURRENT]** The only structured, code-level internal-link-out data that exists today is `servicesContent.js`'s `relatedServices` array, used only by the 6 `ServiceLanding`-templated pages (§2). Verified live links:

| Source | Target(s) | Relationship |
|---|---|---|
| `/digital-solutions` | `/automation`, `/web-development`, `/content-creation` | Related service |
| `/fanpage-management` | `/content-creation`, `/chatbox-ai`, `/digital-marketing` | Related service |
| `/content-creation` | `/digital-marketing`, `/fanpage-management`, `/seo-services` | Related service |
| `/seo-services` | `/web-development`, `/content-creation`, `/digital-marketing` | Related service |
| `/product-photography` | `/photography-video`, `/content-creation`, `/digital-marketing` | Related service |
| `/web-development` | `/templates`, `/seo-services`, `/ecommerce`, `/digital-solutions` | Related service |

The other 5 service-tier routes (`chatbox-ai`, `ecommerce`, `digital-marketing`, `automation`, `photography-video`) have **no** equivalent `relatedServices` internal-link-out block — they are bespoke components without that data shape.

**[CURRENT]** Sitewide navigation and footer (`Layout.jsx`) link to all 10 numbered services + `/ecommerce` + `/templates` + `/packages` + `/about` + `/news` + compliance pages — every Money Page is at minimum one click from the global nav/footer, so there are no orphan Money Pages today.

**[RULE]** Priority link structure for any new content:

```
Informational Article → Commercial Supporting Content → Service/Money Page → Contact
Case Study → Relevant Service → Contact
Related Article ↔ Related Article (same cluster)
```

**[RULE]** Every new SEO page/article must define:
- **Link UP** — to its parent service/cluster
- **Link SIDEWAYS** — to a same-cluster page
- **Link DOWN FUNNEL** — to the relevant Money Page
- **Conversion Link** — to `/contact` where appropriate

Do not add links just to hit a count; every link must reflect a real topical relationship, following the pattern already used in `servicesContent.js`'s `relatedServices`.

**[RECOMMENDATION]** Extend the `relatedServices` pattern to the 5 bespoke service components so all 11 Money Pages have the same structured internal-link-out data, and add a matching `relatedServices` (or equivalent "Link UP / Link SIDEWAYS" mapping) whenever a new Supporting Article or Case Study is created — update the table above when that happens.

---

## 14. Anchor Text Rules

**[RULE]** No exact-match spam. Mix: exact match, partial match, branded, contextual, natural phrase — matching the tone already used in `servicesContent.js`'s `relatedServices` labels (e.g. "Multi-channel content" / "Nội dung đa kênh", not "dịch vụ sáng tạo nội dung đa kênh" repeated everywhere).

---

## 15. Search Intent Classification

See §10 — same rules apply per-page as per-keyword. No doorway pages (§36, §54).

---

## 16. Funnel

**[RULE]** Every content asset is TOFU / MOFU / BOFU. Priority = Search Demand × Business Value × Commercial Intent × Conversion Potential × Topical Importance × Ranking Opportunity × Existing Authority × Original Asset Availability — not raw keyword volume.

**[CURRENT]** Today the site is almost entirely BOFU (the 11 Money Pages) plus a thin, unmapped MOFU/TOFU layer (`/news`, whatever the CMS currently holds) with no visible connective tissue between the two. See §26.

---

## 17. Content Quality Standard

**[RULE]** Every piece of content must answer: *why read the Unitrux page instead of the other 10 results?* It needs Information Gain from: real experience, real process, real projects, case studies, checklists, templates, frameworks, original images/video, BTS, comparisons, tables, workflows, lessons learned, recommendations. Never paraphrase the top 10 Google results.

**[CURRENT]** The site already has two genuine, reusable Information Gain assets:
- 9 real client videos with real durations/dates in `productionPortfolio.js` (spa + Biên Hòa client work) — not stock footage.
- A real BTS/process photo set in `productionBehindTheScenes` (studio setup, on-location shoot, lighting check, team workspace, event coverage at "Miss Universe Business 2026").

Use these before reaching for generic stock imagery (§31).

---

## 18. E-E-A-T

**[RULE]** Maximize Experience, Expertise, Authoritativeness, Trust on every page. Never fabricate numbers, clients, case studies, results, prices, reviews, testimonials, awards, or experience. Where Unitrux hasn't supplied real data yet, write:

```
[UNITRUX CẦN BỔ SUNG]
```

**[CURRENT]** `/content-standards` (`ContentStandards.jsx`) already documents Unitrux's own editorial/E-E-A-T commitments: identify the responsible author/editorial team, prioritize real experience and primary sources, fact-check, publish/update dates, disclose AI use where relevant, transparent correction channel, and — explicitly — "tối ưu AI Search bằng nền tảng SEO, không dùng llms.txt hoặc đánh dấu AI không được hỗ trợ" (optimize for AI Search via the SEO foundation itself, not via `llms.txt` or AI-blocking directives). Any new content must be consistent with these public commitments — don't contradict a policy the site has already published.

---

## 19. On-Page SEO

**[RULE]** Before writing, define: Primary Keyword, Secondary Keywords, Search Intent, Primary Entity, Supporting Entities, Parent Cluster, Primary URL, Page Type, Funnel stage, Conversion Goal. Only then write.

### 19.1 SEO Title
~50–65 characters is a guideline, not a hard rule. Must reflect real intent, be distinct, never clickbait or keyword-stuffed.

### 19.2 Meta Description
~140–160 characters guideline. Must describe the actual content, state a real benefit, never repeat keywords mechanically, never promise something the page doesn't deliver.

### 19.3 H1
One H1 per page (semantic hierarchy), accurately describing the page; may differ from the SEO Title.

### 19.4 Heading structure
H2/H3 must reflect real user questions, not keyword variants stuffed as separate headings (e.g. never "## Từ khóa quay video quảng cáo" followed by "## Từ khóa quay phim quảng cáo").

**[CURRENT]** `ServiceLanding.jsx`'s template already encodes a disciplined heading structure per Money Page: hero H1 → "What's included" (H2, capabilities) → "How we work" (H2, process) → "What you receive" (H2, deliverables) → "FAQ" (H2) → "Related services" (H2) → CTA. Follow this shape for any new service-tier content rather than inventing a new structure per page.

---

## 20. AEO Standard

**[RULE]** For important questions: **Question → Direct Answer (≈40–100 words, not a hard limit) → Explanation → Example/Evidence → Recommendation.** Never bury the answer under 300 words of preamble.

**[CURRENT]** FAQ content already exists in this exact shape for 9 of the 11 Money Pages (`chatboxFaqs`, `marketingFaqs`, `productionFaqs`, `digitalSolutionsFaqs`, `fanpageFaqs`, `contentCreationFaqs`, `seoServicesFaqs`, `productPhotographyFaqs`, `webDevelopmentFaqs` in `src/seo/seoConfig.js`), each rendered into visible `<details>/<summary>` FAQ UI (`ServiceLanding.jsx`) or bespoke FAQ sections, and each backed by a real `FAQPage` JSON-LD node built by `buildFaqNode()` in `schemaFactory.js`. **Missing FAQ blocks**: `/ecommerce` and `/automation` currently have no FAQ array in `seoPages` — `scripts/validate-schema.mjs` explicitly asserts `/ecommerce` emits **zero** FAQPage nodes today (line 59-60), confirming this is deliberate/known, not an oversight to silently "fix" by inventing FAQ content. **[RECOMMENDATION]** If real FAQs are written for `/ecommerce` or `/automation`, add them to `seoPages` following the exact same `{question, answer, questionEn, answerEn}` shape used by the other 8.

---

## 21. GEO / AI-Search Standard

**[RULE]** Write so a paragraph still makes sense when an AI system quotes it in isolation. Avoid vague back-references ("dịch vụ này", "như đã nói ở trên", "phương pháp trên") — name the entity again when it matters.

- Not good: *"Dịch vụ này phù hợp doanh nghiệp nhỏ."*
- Better: *"Dịch vụ quay video sản phẩm phù hợp với doanh nghiệp cần nội dung cho website, quảng cáo và mạng xã hội."*

**[CURRENT]** `servicesContent.js`'s copy already leans this direction in places (e.g. product-photography intro names "ảnh sản phẩm, ảnh không gian và hình ảnh thương hiệu" explicitly rather than "these services"). Keep matching that register in new content.

---

## 22. AI Overview Rules

**[RULE]** Do not claim there is a secret schema, secret keyword density, secret word count, or any "AI Overview hack." There isn't one. Prioritize: content quality, crawlability, unique information, clear direct answers, entity clarity, real evidence, internal linking, authoritative sourcing, and clean structured layout — nothing else is provable or controllable.

---

## 23. Query Fan-Out

**[RULE]** Think beyond the exact keyword when planning a cluster (e.g. "quay video sản phẩm" fans out to price, process, duration, concept, shot list, lighting, TikTok format, Facebook Ads format, product prep, freelancer-vs-agency). Not every fanned-out query needs its own URL — most should be sections within an existing Money Page or a single Supporting Article, not a new page each.

---

## 24. Entity Map

**[CURRENT]** Derived from the two production-tier services' real on-page copy:

**Video Production** (`/photography-video`): video production, pre-production, concept, script, shot list, filming, lighting, sound, editing, color grading, motion graphics, advertising, social media, short-form (9:16), landscape (16:9).

**Photography** (`/product-photography`): product photography, space/interior photography, lighting, composition, background, lifestyle photography, e-commerce, brand identity, multi-format delivery.

**[RULE]** Only use an entity in content if it's genuinely relevant to what's being written — don't pad an entity map with terms borrowed from generic industry listicles.

---

## 25. Image SEO

**[RULE]** Priority order: 1) Unitrux's own photos, 2) real project images, 3) BTS, 4) screenshots, 5) infographics, 6) comparisons, 7) diagrams. Never use meaningless stock photography just to "have an image."

**[CURRENT]** Real, reusable image assets already in the codebase: `productionBehindTheScenes` (studio setup, on-location branding, lighting check, team workspace, 2× event coverage at "Miss Universe Business 2026") and the `product-photography` service's own `gallery` array (same 4 core images, reused). These are the only genuinely-Unitrux images currently wired into SEO-relevant components; most other imagery in `public/images/` has not been audited for provenance as part of this pass.

---

## 26. Video SEO

**[RULE]** Important video needs a descriptive title, thumbnail, surrounding context copy, and — where the data actually supports it — `VideoObject` schema. Transcript is a recommendation when it genuinely helps, never a stated requirement for AI Overview inclusion (no such guarantee exists — see §22).

**[CURRENT]** `/photography-video` is the only page with real `VideoObject` schema: 9 videos in `productionPortfolio.items`, each with title, description, thumbnail, real `uploadDate`, real `durationSeconds` (converted to ISO 8601 duration by `toIsoDuration()`), dimensions, keywords, and a `productionCompany`/`creator`/`copyrightHolder` link back to the Organization node. `scripts/validate-schema.mjs` asserts this schema shape on every build (durations must match the `PT#H#M#S` pattern, URLs must be absolute and same-origin). No transcripts exist for any of these videos today.

---

## 27. Structured Data

**[RULE]** Only use schema types that reflect content actually visible on the page. Never fabricate schema. `FAQPage` only where real FAQ content exists (see §20's `/ecommerce`/`/automation` note — a page with zero FAQs must emit zero `FAQPage` nodes, which is exactly what `validate-schema.mjs` enforces).

**[CURRENT]** Schema types actually live on this site, per `schemaFactory.js` / `seoConfig.js`:

- `Organization` + `LocalBusiness` + `ProfessionalService` (combined `@type` array) + `Person` (legal rep) + `WebSite` — on every page, always.
- `WebPage` / `AboutPage` / `CollectionPage` / `ContactPage` (from each page's `type` field in `seoPages`)
- `Service` (+ `OfferCatalog`/`Offer` sub-nodes) — the 11 Money Pages
- `FAQPage` — 9 of the 11 Money Pages, plus any CMS news article whose markdown contains a "## Frequently Asked Questions" / "## Câu Hỏi Thường Gặp" section (auto-extracted by `extractFaqFromMarkdown()` — a best-effort markdown parser, not a structured CMS field; prefer a real structured `faqs` field if the CMS ever adds one, per the comment in `schemaFactory.js`)
- `BreadcrumbList` — every page except `/`
- `VideoObject` + `ImageObject` + `CreativeWork` + `ItemList` — the `/photography-video` portfolio only
- `BlogPosting` — CMS news articles

`validate-schema.mjs` runs as part of `npm run build` and hard-fails the build on: unresolved CMS placeholders, `localhost` URLs shipping to prod, duplicate `@id`s, incomplete `VideoObject`/`Service` nodes, or a schema-count mismatch against each page's configured FAQ list. Treat this script as the enforced contract — any new page's schema must pass it.

**[CURRENT — flag, do not silently "fix"]** The `LocalBusiness` type, with a real street address, is live in the `Organization` node on **every single page**, right now, in production (confirmed directly in `index.html`'s pre-baked homepage schema and in `seoConfig.js`). See §31 for the doc conflict this creates.

---

## 28. Article Creation Protocol & Pre-Publish Checklist

**[RULE — mandatory sequence, applies to any new Service page, Supporting Article, Case Study, or CMS News post]**

**STEP 1.** Read this file (`docs/seo/SEO-AEO-PLAYBOOK.md`).
**STEP 2.** Identify: keyword, search intent, cluster, parent page, current URL owner (§8).
**STEP 3.** Search the codebase / live CMS (`getNews()`, `getServices()`) for an existing similar page.
**STEP 4.** Cannibalization check (§11).
**STEP 5.** Define internal links in/out (§13).
**STEP 6.** Define the Information Gain (§17).
**STEP 7.** Outline.
**STEP 8.** Write.
**STEP 9.** Run the Post-Writing Audit (below).
**STEP 10.** If a new URL was created, update this Playbook's tables (§5, §8, §13, §25 as applicable) in the same change.

### Pre-Flight Check (output before writing)

```
Primary Keyword:
Search Intent:
Page Type:
Target URL:
Parent Cluster:
Primary Money Page:
Cannibalization: PASS / WARNING
Internal Links IN:
Internal Links OUT:
Information Gain:
```

If any field can't be filled in, do not start writing yet.

### Post-Writing Audit

| Requirement | Status |
|---|---|
| Intent satisfied | PASS/FAIL |
| Correct keyword owner (matches §8) | PASS/FAIL |
| No cannibalization | PASS/FAIL |
| Useful direct answers (AEO, §20) | PASS/FAIL |
| Entity clarity (GEO, §21) | PASS/FAIL |
| Information gain | PASS/FAIL |
| E-E-A-T (§18) | PASS/FAIL |
| Sources | PASS/FAIL |
| Internal links (§13) | PASS/FAIL |
| CTA | PASS/FAIL |
| Images (§25) | PASS/FAIL |
| Schema relevance (§27, passes `validate-schema.mjs`) | PASS/FAIL |
| Human readability | PASS/FAIL |
| No keyword stuffing | PASS/FAIL |
| No unsupported claims | PASS/FAIL |

Do not publish with a FAIL on anything load-bearing (cannibalization, unsupported claims, schema).

---

## 29. Pre-Publish Checklist

Same table as §28's Post-Writing Audit — run it once more immediately before the content goes live, after any last edits.

---

## 30. Measurement & Update Strategy

**[CURRENT]** `docs/measurement-and-local-setup.md` is the existing doc for what analytics is actually wired up. Key facts from it, cross-checked against the code in this audit:

- GA4 measurement ID `G-C3XWY1BMVB` is referenced in that doc as the active tag.
- **[CURRENT — contradicts the doc, code wins per §32's source-of-truth hierarchy]**: `index.html` and `CLAUDE.md` show GTM container `GTM-NNLZW545` is **live** (both the `gtm.js` loader script and the `<noscript>` iframe are present in `index.html`), while `measurement-and-local-setup.md` states *"GTM is not activated because no container ID or container access was provided."* That statement is stale — see §31.
- `AnalyticsTracker.jsx` pushes typed events to `window.dataLayer` only (no direct `gtag()` calls): route-change page views, Web Vitals (CLS/INP/LCP), `contact_click`/`outbound_click` classification, and (per the doc) `generate_lead`, `chat_open`, `chat_start`, `view_content` events without PII.

**[RULE]** When Search Console data exists, prioritize it over keyword-tool estimates (§8's caveat) or SERP hypothesis. Update pages nearing page-1/top-10 before creating new pages targeting adjacent keywords (§49-equivalent priority rule).

---

## 31. Known Technical Debt

**[CURRENT — confirmed by direct source read on 2026-08-20]**

1. **`docs/measurement-and-local-setup.md` is stale on two points**: it says GTM "is not activated" (it is — `GTM-NNLZW545` is live in `index.html`), and it says `LocalBusiness` structured data "is intentionally not published yet, [pending] exact public business name; street address...; primary Google Business Profile category; verified Business Profile URL" (it already is published, on every page, with a specific street address, via the `Organization`+`LocalBusiness`+`ProfessionalService` combined-type node in `seoConfig.js` / baked into `index.html`). **Action needed**: either update that doc to match reality, or — if the address/GBP category truly isn't verified yet — that's a data-accuracy risk worth flagging to Unitrux, since real `PostalAddress` data is currently live in production schema. This playbook does not resolve which doc is "right"; it records the conflict per §58's source-of-truth hierarchy (code > docs).
2. **`public/sitemap.xml` (the checked-in static file) is incomplete and partially stale**: it lists only 16 URLs and is missing `/digital-solutions`, `/fanpage-management`, `/content-creation`, `/seo-services`, `/product-photography`, `/templates`, and `/content-standards` — and it still lists the now-retired `/ui-ux-design` as a live indexable URL. This file does **not** ship as-is: `scripts/generate-seo-pages.mjs` overwrites `dist/sitemap.xml` at build time from the current, complete `seoPages` object (which does include all current routes, correctly). The risk is only if the build pipeline is ever changed such that `generate-seo-pages.mjs` doesn't run — keep this stale file in mind as a trap for future debugging, and ideally delete/regenerate it so the source tree doesn't contradict what actually ships.
3. **`CLAUDE.md` references two docs that don't exist in the repo**: `docs/schema-cms-contract.md` and `docs/HUONG-DAN-CAU-HINH-GTM-GA4.md`. Only `docs/measurement-and-local-setup.md` and `docs/CNAME` currently exist under `docs/`. Anyone relying on `CLAUDE.md`'s description of those two files will not find them — either they were never created, or removed. Do not assume their contents exist elsewhere.
4. **`sameAs` vs. footer social links mismatch** (§4): the footer links 3 Facebook pages; the `Organization` schema's `sameAs` only lists 1 of them (`UnitruxCreativeStudio`) plus LinkedIn/YouTube/TikTok. Not necessarily wrong (schema `sameAs` is meant for the brand's primary canonical profiles), but worth a deliberate decision rather than an accident.
5. **No topic-cluster mapping for `/news`** (§7, §26 Content Gap): CMS news articles have no `cluster`/`relatedService` field, so there is currently no code-level guardrail against a news article cannibalizing a Money Page's keyword (§11 must be done manually, every time, until this exists).
6. **Root-level legacy files** (`build.bat`, `deploy.bat`, `web.config`, `nginx.conf`, `.htaccess*`, root/`public` `_redirects`, root `styles.css`, `public/styles.css`, `digital-marketing.css`, `public/digital-marketing.css`, `public/index.html`, `docs/CNAME`) are pre-Vite-migration leftovers per `CLAUDE.md` and irrelevant to the live GitHub Pages deploy. Do not "fix" them expecting production impact.

---

## 32. Decisions Pending

- Whether `docs/measurement-and-local-setup.md`'s LocalBusiness/GTM sections should be rewritten to match reality, or whether the live `LocalBusiness` schema/address needs a compliance re-check first (this is a business decision for Unitrux, not something an AI agent should resolve unilaterally by editing schema).
- Whether news content should get a `cluster`/`relatedService` field added on the CMS side, to make §11's cannibalization check automatic instead of manual.
- Whether `/ecommerce` and `/automation` should get real FAQ content (§20) — only add it when Unitrux supplies real, non-fabricated Q&A.
- Whether the `relatedServices` internal-linking pattern (§13) should be extended to the 5 bespoke service components that currently lack it.

---

## 33. Changelog


## 34. SOCIAL DISTRIBUTION → WEBSITE TRAFFIC RULES

Website Unitrux là SOURCE OF TRUTH cho toàn bộ nội dung chuyên sâu.

Facebook, Facebook Groups, Instagram, Threads và TikTok là các DISCOVERY NODES dùng để:

- tạo nhận diện chủ đề;
- tiếp cận người có nhu cầu;
- củng cố entity Unitrux;
- tạo branded search;
- tạo referral traffic;
- dẫn người dùng về đúng bài Website;
- sau đó dẫn từ bài Website về Service/Money Page;
- cuối cùng chuyển thành Lead.

Luồng chuẩn:

SOCIAL CONTENT
↓
RELEVANT WEBSITE ARTICLE
↓
SERVICE / MONEY PAGE
↓
CASE STUDY / PORTFOLIO
↓
CONTACT / ZALO / FORM
↓
LEAD

---

## ONE TOPIC → MULTI-PLATFORM DISTRIBUTION

Mỗi Core Topic trên Website phải được xem xét phân phối thành:

1. Website Article
2. Facebook Page
3. Facebook Group
4. Instagram Carousel
5. Instagram Reel
6. Threads
7. TikTok
8. Short-form video nếu phù hợp

Không copy-paste cùng một nội dung lên tất cả nền tảng.

Mỗi platform khai thác một góc khác nhau nhưng phải giữ chung:

- Primary Topic
- Main Entity
- Brand Entity: Unitrux
- Core Facts
- Expertise
- Destination URL

---

# DESTINATION URL RULE

Mỗi social content phải xác định trước:

Primary Website Destination:
[URL]

Secondary Conversion Page:
[URL]

Không được gắn link về homepage một cách mặc định.

Phải dẫn về URL liên quan nhất.

Ví dụ:

Topic:
"Chụp sản phẩm nền trắng hay concept?"

Facebook / Instagram / Threads / TikTok

→

`unitrux.com/news/chup-san-pham-nen-trang-hay-concept`

→

internal link

→

`unitrux.com/product-photography`

→

Contact.

---

# LINK INTENT

Social post không được sử dụng CTA chung chung:

"Xem thêm tại website."

CTA phải cho người dùng biết họ nhận được gì sau khi click.

Ví dụ:

- Xem checklist đầy đủ
- Xem bảng chi phí chi tiết
- Xem quy trình 7 bước
- Xem toàn bộ case study
- Xem portfolio dự án
- Xem bảng so sánh
- Xem shot list mẫu
- Xem hướng dẫn đầy đủ
- Xem before/after
- Xem các yếu tố ảnh hưởng báo giá

---

# CURIOSITY LOOP

Social content phải cung cấp giá trị ngay trên platform.

Sau đó mở rộng nội dung trên Website.

Cấu trúc:

HOOK
↓
USEFUL INFORMATION
↓
INSIGHT
↓
OPEN LOOP
↓
WEBSITE RESOURCE

Ví dụ:

Facebook:

"Trước một buổi quay sản phẩm, có 11 thứ brand nên chuẩn bị.
Ba lỗi mình gặp nhiều nhất là..."

→ giải thích 3 lỗi thật sự hữu ích.

→ CTA:

"Checklist đủ 11 hạng mục mình để trong bài hướng dẫn này: [URL]"

Website phải thực sự chứa đủ 11 hạng mục.

Không clickbait.

---

# FACEBOOK PAGE

Mỗi Website Topic có thể tạo:

- Educational Post
- Pain Point Post
- Comparison
- Checklist
- BTS
- Case Study
- Before/After
- Commercial Post

Mỗi post phải xác định:

Topic:
Keyword/Entity:
Content Angle:
Hook:
Useful Takeaway:
CTA:
Destination URL:
UTM:
Image/Video Asset:

---

# FACEBOOK GROUPS

Không đăng bài kiểu:

"Unitrux cung cấp dịch vụ..."

Phải bắt đầu từ pain point của cộng đồng.

Ví dụ nhóm chủ Spa:

"Một lỗi mình thấy khá nhiều khi spa tự quay Reels là quay toàn bộ không gian bằng góc ngang rồi crop dọc..."

Sau đó:

- giải thích;
- đưa ví dụ;
- đưa tip;
- tạo thảo luận.

Cuối bài nếu phù hợp mới dẫn:

"Mình có breakdown đầy đủ một case quay spa ở đây: [URL]"

Không spam cùng một nội dung vào hàng chục group.

Mỗi group phải được contextualize theo audience.

---

# INSTAGRAM

Mỗi Topic xem xét:

Carousel
Reel
Static
BTS
Before/After

Instagram content phải:

- cung cấp giá trị ngay trên Instagram;
- củng cố topic/entity;
- tạo lý do truy cập Website/Profile;
- sử dụng Website Article làm tài nguyên chuyên sâu.

Destination phải được ghi rõ trong content plan.

---

# THREADS

Threads ưu tiên:

- insight;
- opinion;
- lesson learned;
- observation;
- mini case study;
- discussion.

Không biến Threads thành feed toàn link.

Một số post dùng để xây chuyên môn/brand.

Một số post có thể dẫn về bài chuyên sâu khi có lý do rõ ràng.

---

# TIKTOK

TikTok content ưu tiên:

- demonstration;
- BTS;
- before/after;
- mistake;
- tutorial;
- process;
- comparison;
- transformation;
- production breakdown.

Website chứa phiên bản chuyên sâu hơn.

Ví dụ:

TikTok:

"3 lỗi khiến video sản phẩm nhìn rẻ tiền"

↓

Website:

"11 lỗi thường gặp khi quay video sản phẩm + checklist khắc phục"

↓

Service:

Advertising Video Production.

---

# SOCIAL KEYWORD RULE

Social content vẫn phải sử dụng ngôn ngữ liên quan đến Search Topic.

Keyword phải xuất hiện tự nhiên trong:

- headline;
- caption;
- spoken content;
- on-screen text;
- description;

khi phù hợp.

Không keyword stuffing.

Mục tiêu là giúp cả:

- người dùng;
- Search Engine;
- Social Search;
- AI systems

hiểu rõ nội dung đang nói về entity/topic nào.

---

# UTM TRACKING

Tất cả traffic social → Website phải được đo lường.

Ví dụ:

Facebook:

?utm_source=facebook&utm_medium=organic-social&utm_campaign=[topic]

Facebook Group:

?utm_source=facebook-group&utm_medium=community&utm_campaign=[topic]

Instagram:

?utm_source=instagram&utm_medium=organic-social&utm_campaign=[topic]

Threads:

?utm_source=threads&utm_medium=organic-social&utm_campaign=[topic]

TikTok:

?utm_source=tiktok&utm_medium=organic-social&utm_campaign=[topic]

Tên campaign phải thống nhất.

Ví dụ:

`video-product-2026`

---

# SOCIAL CONTENT DATABASE

Playbook phải duy trì bảng:

| Core Topic | Website URL | Service Page | Facebook | FB Group | Instagram | Threads | TikTok |
|---|---|---|---|---|---|---|---|

Mỗi Topic phải xác định rõ social content nào dẫn về đâu.

---

# CONTENT PACKAGE RULE

Khi AI viết một Website Article mới, sau khi bài được hoàn thành phải đề xuất Content Package:

## Website

Main SEO Article

## Facebook

2 posts

## Facebook Group

2 adaptations

## Instagram

1 carousel
1 Reel

## Threads

3 posts

## TikTok

2 video concepts

## Image Assets

3–6 assets

## Video Assets

1–3 assets

## Destination URL

[URL bài Website]

## Conversion URL

[Service/Money Page]

---

# SOCIAL → SEO RELATIONSHIP

Không được tuyên bố social link tự động làm Google ranking tăng.

Social Distribution được sử dụng để:

- đưa đúng audience đến content;
- tăng discovery;
- tạo referral traffic;
- tạo brand awareness;
- tăng branded search;
- phân phối original content;
- giúp content được biết tới;
- hỗ trợ acquisition;
- tạo thêm touchpoint trước conversion.

Website và internal linking vẫn là trung tâm của SEO architecture.

---

# AI ARTICLE CREATION PROTOCOL UPDATE

Mỗi lần AI được yêu cầu viết bài Website:

1. Đọc SEO-AEO-PLAYBOOK.md.
2. Kiểm tra Keyword Ownership.
3. Kiểm tra cannibalization.
4. Viết Website Article.
5. Xác định Internal Links.
6. Xác định Service/Money Page cần đẩy.
7. Tạo Social Distribution Package.
8. Xác định URL đích cho từng platform.
9. Tạo UTM.
10. Đề xuất hình ảnh/video.
11. Kiểm tra Social → Website → Service → Lead funnel.

Không xem một bài Website là hoàn thành nếu chưa xác định cách phân phối nội dung đó.

## 2026-08-20

- Initial SEO/AEO/GEO architecture audited and documented from source code (`src/App.jsx`, `src/seo/seoConfig.js`, `src/seo/schemaFactory.js`, `src/data/services.js`, `src/data/servicesContent.js`, `src/data/productionPortfolio.js`, `src/data/templateGroups.js`, `src/components/Layout.jsx`, `src/components/SEO.jsx`, `src/components/ServiceLanding.jsx`, `scripts/generate-seo-pages.mjs`, `scripts/validate-schema.mjs`, `public/robots.txt`, `public/sitemap.xml`, `index.html`, `docs/measurement-and-local-setup.md`, `package.json`, `.github/workflows/deploy.yml`).
- Service taxonomy (11 Money Pages), keyword ownership map, and internal-link database initialized from real on-page content.
- Known technical debt recorded: stale measurement doc (GTM/LocalBusiness claims), incomplete static `public/sitemap.xml`, two CLAUDE.md-referenced docs that don't exist, no cluster mapping on `/news`.
- No new articles, pages, or code were created in this pass — this file only.

## 2026-08-27

- **CANN-01 on-page fix applied** (`cluster-plan.json` CANN-01, recommendation 1). Re-scoped `/product-photography` away from video-production language so it owns only "chụp ảnh sản phẩm và thương hiệu" (photography-only), leaving "sản xuất video quảng cáo" / "quay video sản phẩm" wholly to `/photography-video`. Changed: page `title` / `heading` / `serviceName` / meta `description` in `src/seo/seoConfig.js`; `title.vi` + process step label in `src/data/servicesContent.js`; `titleVi` + `descriptionVi` in `src/data/services.js`; the `/services` bullet and homepage `description`/`summary`/FAQ brand copy ("quay chụp sản phẩm" → "chụp ảnh sản phẩm"); Organization `knowsAbout` ("Quay chụp sản phẩm" → "Chụp ảnh sản phẩm"). §5 and §8 tables updated above. `npm run build` + `validate-schema.mjs` pass; `/photography-video` FAQ already hands video intent to itself, so no reciprocal change needed there.
- `/media-pricing` verified as the shared Level-4 pricing hub per CANN-01 rec 2 — kept its "quay chụp & sản xuất Media" framing (distinct "bảng giá" commercial-investigation intent), 8 starting prices render in static HTML, OfferCatalog + FAQPage JSON-LD intact. Both `/photography-video` and `/product-photography` link to it.
- **Still blocked (needs external access, not doable from this repo):** (a) publishing `docs/seo/PUBLISH-READY/quay-video-san-pham.md` (slug `quay-video-san-pham-can-chuan-bi-gi`) — the news CMS at `be.unitrux.site` is read-only from this codebase; `src/components/PhotographyVideoService.jsx` lines 230 & 359 already link to that unpublished slug (currently dead). (b) Search Console indexing requests — no GSC credentials wired in, and the page must be live first.
