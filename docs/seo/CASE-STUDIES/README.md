# Case Study drafts — from real Unitrux portfolio assets

Status: DRAFTS. Not published. Publishing needs (a) the external news CMS (`be.unitrux.site` is read-only from this repo) and (b) client permission + the facts currently marked `[UNITRUX CẦN BỔ SUNG]` (client name or anonymized label, the actual brief/problem, and any results Unitrux is allowed to state).

Per `docs/seo/SEO-AEO-PLAYBOOK.md` §7: the site has **no** narrative case-study format today. These three drafts introduce the Context → Problem → Objective → Approach → Result structure, built only from data that genuinely exists in `src/data/productionPortfolio.js` (video ids, real durations, real upload dates, aspect ratios, the "spa" vertical, the "Biên Hòa" location, the "Miss Universe Business 2026" event). Everything not backed by that data is flagged, not invented (Playbook §18).

All three funnel to `/photography-video` (Money Page 08 — the only page with live `VideoObject` portfolio schema).

| Draft | Real asset spine | Funnels to |
|---|---|---|
| `01-spa-social-video-system.md` | `spa-social-film-1..5` (9:16, 31.07–47.32s) + `spa-short-film-6/7` (16:9, 8.21s / 6.93s), all 2026-08-14/15 | `/photography-video` |
| `02-bienhoa-brand-film-standard-and-extended.md` | `bienhoa-brand-film-1` (55.54s) + `bienhoa-brand-film-2` (102.86s, "for website and channel use") | `/photography-video` |
| `03-event-production-miss-universe-business-2026.md` | `bts-event-wide`, `bts-event-monitor` (event coverage BTS) | `/photography-video` |

## Before publishing any of these

1. Get the client's written OK to be named or an agreed anonymized label ("một chuỗi spa tại…", "một thương hiệu sản xuất tại Biên Hòa").
2. Fill every `[UNITRUX CẦN BỔ SUNG]` — a case study with fabricated problem/result fails Playbook §18 and must not go live.
3. Cannibalization: these are Level-6 proof assets linking DOWN to `/photography-video`; they do not target a transactional head term, so no `CANNIBALIZATION WARNING`. Still run a live `getNews()` check for an existing spa/Biên Hòa case post.
4. Publish as `/news/<slug>` with a "[Case Study]" title convention (matches existing `case-study-audit-trai-nghiem-di-dong-tang-chuyen-doi`).
5. After publish: add the new slug to the `/photography-video` page copy as a portfolio link, confirm canonical, request indexing.
