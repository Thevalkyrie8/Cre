# Measurement, advertising, and local visibility setup

This document records what is active in the website and what still requires an authenticated platform account or verified business data.

## Active in the website

- GA4 measurement ID: `G-C3XWY1BMVB`.
- SPA `page_view` events fire when the React route changes.
- Successful contact forms fire the recommended GA4 `generate_lead` event without sending names, email addresses, phone numbers, or message text to Analytics.
- Chatbox interactions fire `chat_open`, `chat_start`, and `generate_lead` events without sending conversation content.
- Article views fire `view_content`.
- LCP, INP, and CLS are measured in the browser and sent as `web_vitals` events.
- Published News entries returned by the API during a production build are prerendered as crawlable HTML and added to `sitemap.xml`.

## GA4 account actions

1. In GA4 Realtime, verify `page_view`, `generate_lead`, and `web_vitals` after deployment.
2. In Admin > Events, mark `generate_lead` as a key event.
3. Create custom dimensions only if reporting needs them: `form_name`, `service`, `metric_name`, and `metric_rating`.
4. Keep Enhanced Measurement enabled unless it duplicates a deliberately configured event.

The site currently uses the Google tag directly. Do not add the same GA4 destination through Google Tag Manager without removing or disabling the direct configuration, because that can double-count events.

## Google Tag Manager

GTM is not activated because no container ID or container access was provided. To migrate:

1. Provide the `GTM-XXXXXXX` container ID.
2. Add the GTM container once, then configure the Google tag with `G-C3XWY1BMVB`.
3. Use Preview / Tag Assistant to verify route page views and lead events.
4. Publish a named container version only after validation.

## Meta Pixel and Conversions API

These are not activated because the Meta Pixel ID, dataset access, consent decision, and server-side endpoint were not provided.

- Pixel events must be enabled only under the site's applicable consent policy.
- Conversions API credentials and access tokens must stay on the server, never in Vite variables or browser JavaScript.
- For browser/server deduplication, the Pixel event and server event must use the same event name and `event_id`.
- Recommended lead event: `Lead`, triggered only after the contact API confirms success.

Required inputs: Pixel ID, Business Manager access, server endpoint ownership, consent requirements, and a backend deployment plan.

## LinkedIn Insight Tag

The tag is not activated because no LinkedIn Partner ID or Campaign Manager access was provided. After receiving those:

1. Install one Insight Tag under the applicable consent policy.
2. Define contact success as the conversion, not the submit-button click.
3. Verify the domain and conversion status in Campaign Manager.

For Sponsored Content, prepare 4–5 ad variants, keep headlines concise, use a clear CTA, and test one material variable at a time. Campaign creation, targeting, budgets, and publishing require access to the advertising account.

## Google Business Profile and LocalBusiness data

The website visibly states Ho Chi Minh City, Vietnam, working hours Monday–Friday 08:00–17:30 ICT, phone, and email. Organization structured data reflects only those visible facts.

`LocalBusiness` structured data is intentionally not published yet. Before adding it, provide and verify:

- exact public business name;
- street address and postal code, or confirmed service-area-business configuration;
- primary Google Business Profile category;
- verified Business Profile URL;
- customer-facing opening hours and holiday exceptions.

Do not invent an address or use a virtual location solely for ranking.

## TikTok and LinkedIn creative research

Use TikTok Top Ads and LinkedIn examples to study hooks, formats, pacing, CTA placement, and audience fit. Do not copy another advertiser's creative or claims. Record each experiment with its objective, audience, creative version, spend, and conversion result.
