// Narrative case studies (Playbook §7 Level-6 proof: Context → Problem →
// Objective → Approach → Result). The site had no case-study format before this;
// these entries introduce one.
//
// RULE (Playbook §18): never fabricate a client, brief, result or number.
// Every entry below is `ready: false` and only its verifiable factual spine
// (from src/data/productionPortfolio.js — real video ids, durations, upload
// dates, the "spa" vertical, the "Biên Hòa" location, the "Miss Universe
// Business 2026" event) is filled in. Fields Unitrux must supply are marked
// TODO. CaseStudySection.jsx renders ONLY entries with `ready: true`, so
// nothing unverified reaches a page.
//
// To publish one: get client permission, replace every TODO with the real
// fact, set `ready: true`. Drafts with more context:
// docs/seo/CASE-STUDIES/*.md

export const TODO = '[UNITRUX CẦN BỔ SUNG]';

export const caseStudies = {
  'spa-social-video-system': {
    ready: false,
    money: '/photography-video',
    project: {
      vi: 'Hệ thống video social cho một cơ sở spa',
      en: 'A social video system for a spa',
    },
    client: { vi: TODO, en: TODO }, // client name or approved anonymized label
    industry: { vi: 'Spa / chăm sóc sức khỏe & làm đẹp', en: 'Spa / wellness & beauty' },
    objective: {
      vi: TODO, // agreed goal: videos/month, priority channel, message, any measurable target
      en: TODO,
    },
    problem: {
      vi: TODO, // the real problem before working together — only what Unitrux confirms
      en: TODO,
    },
    scope: {
      vi: 'Sản xuất tập trung trong 2 ngày liền kề (14–15/08/2026), một lần dựng máy phục vụ nhiều phiên bản.',
      en: 'One concentrated 2-day production (14–15 Aug 2026); a single camera setup feeding many versions.',
    },
    process: [
      { vi: 'Lên kế hoạch đa phiên bản từ đầu — không quay lẻ từng video.', en: 'Plan for multiple versions upfront — no shooting one clip at a time.' },
      { vi: 'Shot list phục vụ cả 9:16 (feed TikTok/Reels) và 16:9 (video mở đầu nhanh).', en: 'A shot list that serves both 9:16 (TikTok/Reels feed) and 16:9 (fast-open clips).' },
      { vi: 'Quay batch trong hai ngày liền kề.', en: 'Batch filming across two consecutive days.' },
      { vi: 'Dựng riêng từng phiên bản với nhịp và nội dung khác nhau.', en: 'Edit each version separately, with its own pace and content.' },
      { vi: 'Bàn giao theo cụm kênh thay vì một file dùng chung.', en: 'Deliver grouped by channel, not as one shared file.' },
    ],
    deliverables: [
      { vi: '5 video dọc 9:16 (31.07s, 32.96s, 37.87s, 44.04s, 47.32s)', en: '5 vertical 9:16 films (31.07s, 32.96s, 37.87s, 44.04s, 47.32s)' },
      { vi: '2 video ngắn 16:9 (6.93s, 8.21s) dựng để bắt chú ý ngay giây đầu', en: '2 short 16:9 clips (6.93s, 8.21s) edited to catch attention in the first second' },
    ],
    result: {
      vi: '7 phiên bản nội dung từ một giai đoạn sản xuất — đủ nội dung dọc cho nhiều tuần đăng TikTok/Reels từ một lần huy động ekip. ' + TODO,
      en: '7 content versions from one production — enough vertical content for weeks of TikTok/Reels posting off a single crew mobilization. ' + TODO,
    },
    media: [
      { type: 'video', id: 'spa-short-film-6' },
      { type: 'video', id: 'spa-social-film-1' },
      { type: 'video', id: 'spa-social-film-2' },
    ],
  },

  'bienhoa-brand-film': {
    ready: false,
    money: '/photography-video',
    project: {
      vi: 'Video thương hiệu cho một khách hàng tại Biên Hòa — bản chuẩn và bản dài',
      en: 'A brand film for a Biên Hòa client — standard and extended cuts',
    },
    client: { vi: TODO, en: TODO },
    industry: { vi: TODO, en: TODO }, // sector of the Biên Hòa business
    objective: { vi: TODO, en: TODO },
    problem: { vi: TODO, en: TODO },
    scope: {
      vi: 'Quay tại địa điểm khách hàng ở Biên Hòa, giới thiệu hoạt động và không gian kinh doanh; xuất hai bản dùng cho các mục đích khác nhau.',
      en: 'Filmed on location at the client site in Biên Hòa, covering the business and its space; two cuts for different uses.',
    },
    process: [
      { vi: 'Khảo sát không gian và điều kiện quay tại Biên Hòa.', en: 'Survey the space and filming conditions in Biên Hòa.' },
      { vi: 'Quay tại địa điểm khách hàng.', en: 'Film on location at the client site.' },
      { vi: 'Dựng bản chuẩn (~55 giây) cho quảng cáo và social.', en: 'Edit a standard cut (~55s) for advertising and social.' },
      { vi: 'Dựng bản dài (~103 giây) cho website và các kênh nội dung.', en: 'Edit an extended cut (~103s) for the website and content channels.' },
    ],
    deliverables: [
      { vi: 'Video thương hiệu bản chuẩn — 55.54 giây', en: 'Standard brand film — 55.54 seconds' },
      { vi: 'Video thương hiệu bản dài — 102.86 giây, dùng cho website và kênh nội dung', en: 'Extended brand film — 102.86 seconds, for website and channel use' },
    ],
    result: { vi: TODO, en: TODO },
    media: [
      { type: 'video', id: 'bienhoa-brand-film-1' },
      { type: 'video', id: 'bienhoa-brand-film-2' },
    ],
  },

  'miss-universe-business-2026-event': {
    ready: false,
    money: '/photography-video',
    project: {
      vi: 'Tác nghiệp sự kiện — Miss Universe Business 2026',
      en: 'Event production — Miss Universe Business 2026',
    },
    client: { vi: TODO, en: TODO },
    industry: { vi: 'Sự kiện', en: 'Events' },
    objective: { vi: TODO, en: TODO },
    problem: { vi: TODO, en: TODO },
    scope: {
      vi: 'Ekip Unitrux tác nghiệp tại sự kiện Miss Universe Business 2026.',
      en: 'The Unitrux crew shooting on location at Miss Universe Business 2026.',
    },
    process: [
      { vi: TODO, en: TODO }, // real event-coverage workflow Unitrux ran
    ],
    deliverables: [
      { vi: TODO, en: TODO }, // real deliverables handed to the client
    ],
    result: { vi: TODO, en: TODO },
    media: [
      { type: 'photo', id: 'bts-event-wide' },
      { type: 'photo', id: 'bts-event-monitor' },
    ],
  },
};

export const getReadyCaseStudies = (money) => Object.entries(caseStudies)
  .filter(([, cs]) => cs.ready === true && (!money || cs.money === money))
  .map(([id, cs]) => ({ id, ...cs }));
