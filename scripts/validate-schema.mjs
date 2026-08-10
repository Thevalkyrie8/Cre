import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { join } from 'node:path';
import { productionPortfolio } from '../src/data/productionPortfolio.js';
import {
  buildArticleStructuredData,
  buildCmsServiceStructuredData,
  buildStructuredData,
  legacyRedirects,
  seoPages,
  SITE_URL,
} from '../src/seo/seoConfig.js';
import {
  assertStructuredData,
  extractFaqFromMarkdown,
  validateStructuredData,
} from '../src/seo/schemaFactory.js';

const findType = (data, type) => data['@graph'].filter((node) => {
  const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
  return types.includes(type);
});

for (const path of Object.keys(seoPages)) {
  assertStructuredData(buildStructuredData(path), path);
}

const marketing = buildStructuredData('/digital-marketing');
const marketingService = findType(marketing, 'Service')[0];
assert.ok(marketingService, 'Digital Marketing must expose a Service node');
assert.equal(marketingService.provider['@id'], `${SITE_URL}/#organization`);
assert.equal(marketingService.hasOfferCatalog['@type'], 'OfferCatalog');
assert.equal(marketingService.hasOfferCatalog.itemListElement.length, 4);

const portfolio = buildStructuredData('/photography-video');
const videos = findType(portfolio, 'VideoObject');
const images = findType(portfolio, 'ImageObject')
  .filter((node) => node['@id']?.includes('#thumbnail-'));
assert.equal(videos.length, productionPortfolio.items.length);
assert.equal(images.length, productionPortfolio.items.length);
assert.ok(videos.every((video) => /^PT(?:\d+H)?(?:\d+M)?(?:\d+S)?$/.test(video.duration)));
assert.ok(videos.every((video) => video.contentUrl.startsWith(SITE_URL)));
assert.ok(videos.every((video) => video.thumbnailUrl[0].startsWith(SITE_URL)));

const portfolioFaqPages = findType(portfolio, 'FAQPage');
assert.equal(portfolioFaqPages.length, 1, 'Photography/video page must expose exactly one FAQPage node');
const portfolioFaqs = portfolioFaqPages[0].mainEntity;
assert.equal(portfolioFaqs.length, seoPages['/photography-video'].faqs.length);
assert.ok(portfolioFaqs.every((question) => (
  question['@type'] === 'Question'
  && typeof question.name === 'string' && question.name.length > 0
  && question.acceptedAnswer?.['@type'] === 'Answer'
  && typeof question.acceptedAnswer.text === 'string' && question.acceptedAnswer.text.length > 0
)), 'Every FAQ entry must have a non-empty question and answer');

const chatbox = buildStructuredData('/chatbox-ai');
assert.equal(findType(chatbox, 'FAQPage').length, 1, 'Chatbox AI page must expose an FAQPage node');

const noFaqPage = buildStructuredData('/ecommerce');
assert.equal(findType(noFaqPage, 'FAQPage').length, 0, 'Pages without FAQ content must not emit an empty FAQPage node');

// New/rebuilt service pages: each must expose both a Service node and an FAQPage
// node with a non-empty question/answer for every configured FAQ.
const newServiceRoutes = [
  '/digital-solutions',
  '/fanpage-management',
  '/content-creation',
  '/seo-services',
  '/product-photography',
  '/web-development',
];
for (const route of newServiceRoutes) {
  const data = buildStructuredData(route);
  assertStructuredData(data, route);

  const serviceNode = findType(data, 'Service')[0];
  assert.ok(serviceNode, `${route} must expose a Service node`);
  assert.equal(serviceNode.provider['@id'], `${SITE_URL}/#organization`);

  const faqPages = findType(data, 'FAQPage');
  assert.equal(faqPages.length, 1, `${route} must expose exactly one FAQPage node`);
  assert.equal(faqPages[0].mainEntity.length, seoPages[route].faqs.length, `${route} FAQPage question count must match its faqs config`);
  assert.ok(faqPages[0].mainEntity.every((question) => (
    question['@type'] === 'Question'
    && typeof question.name === 'string' && question.name.length > 0
    && question.acceptedAnswer?.['@type'] === 'Answer'
    && typeof question.acceptedAnswer.text === 'string' && question.acceptedAnswer.text.length > 0
  )), `${route}: every FAQ entry must have a non-empty question and answer`);
}

// /ui-ux-design retired in favor of the merged /web-development page.
assert.ok(!('/ui-ux-design' in seoPages), '/ui-ux-design must be removed from seoPages once merged into /web-development');
assert.equal(legacyRedirects['/ui-ux-design'], '/web-development');

for (const item of productionPortfolio.items) {
  await access(join(process.cwd(), 'public', item.src.replace(/^\//, '')));
  await access(join(process.cwd(), 'public', item.thumbnail.replace(/^\//, '')));
}

const cmsService = buildCmsServiceStructuredData({
  pathname: '/services/schema-test',
  language: 'vi',
  service: {
    id: 'schema-test',
    name: 'Performance Marketing',
    nameVi: 'Quảng cáo hiệu suất',
    description: 'A measurable acquisition service.',
    descriptionVi: 'Dịch vụ thu hút khách hàng có đo lường.',
    category: 'Digital Marketing',
    featuresVi: ['Google Ads', 'Meta Ads'],
    isActive: true,
    createdAt: '2026-07-01T00:00:00+07:00',
    updatedAt: '2026-07-20T00:00:00+07:00',
    packages: [
      {
        id: 'consult',
        nameVi: 'Tư vấn theo nhu cầu',
        price: '0.00',
        priceType: 'custom',
        isActive: true,
      },
      {
        id: 'setup',
        nameVi: 'Thiết lập chiến dịch',
        price: '5000000',
        priceType: 'one-time',
        priceCurrency: 'VND',
        isActive: true,
      },
      {
        id: 'retired',
        nameVi: 'Gói ngừng bán',
        price: '1000000',
        priceType: 'one-time',
        isActive: false,
      },
    ],
  },
});

assert.deepEqual(validateStructuredData(cmsService), []);
const cmsOffers = findType(cmsService, 'Service')[0].hasOfferCatalog.itemListElement;
assert.equal(cmsOffers.length, 2, 'Inactive CMS packages must not be published');
assert.equal(cmsOffers[0].price, undefined, 'Custom prices must not become a fake zero price');
assert.equal(cmsOffers[0].priceCurrency, undefined);
assert.equal(cmsOffers[1].price, '5000000.00');
assert.equal(cmsOffers[1].priceCurrency, 'VND');

const article = buildArticleStructuredData({
  path: '/news/schema-tags-test',
  title: 'Schema tags test',
  description: 'Kiểm tra tags của bài viết.',
  articleSection: 'SEO',
  keywords: ['seo', 'marketing', 'google-ranking'],
  datePublished: '2026-07-28T00:00:00+07:00',
});
assertStructuredData(article, 'article tags');

const noFaqArticle = findType(article, 'FAQPage');
assert.equal(noFaqArticle.length, 0, 'Article without an FAQ section must not emit an FAQPage node');

const faqMarkdown = `# Article title\n\nSome intro paragraph.\n\n## Frequently Asked Questions\n\n**Does this work?**\nYes, it does.\n\n**What about edge cases?**\nThey are handled too.\n\n## Next section\n\nUnrelated content that must not be picked up as an answer.`;
const parsedFaqs = extractFaqFromMarkdown(faqMarkdown);
assert.deepEqual(parsedFaqs, [
  { question: 'Does this work?', answer: 'Yes, it does.' },
  { question: 'What about edge cases?', answer: 'They are handled too.' },
]);

const viFaqMarkdown = '## Câu Hỏi Thường Gặp\n\n**Có phí không?**\nKhông.';
assert.deepEqual(extractFaqFromMarkdown(viFaqMarkdown), [{ question: 'Có phí không?', answer: 'Không.' }]);
assert.deepEqual(extractFaqFromMarkdown('No FAQ heading here.'), []);

// Some CMS articles format each FAQ question as its own "###" sub-heading instead
// of a bold line — both shapes must be supported.
const headingFaqMarkdown = '## Frequently Asked Questions\n\n### What determines the cost?\n\nIt depends on scope.\n\n### How long does it take?\n\nIt depends on complexity.\n\n## Next section\n\nUnrelated content.';
assert.deepEqual(extractFaqFromMarkdown(headingFaqMarkdown), [
  { question: 'What determines the cost?', answer: 'It depends on scope.' },
  { question: 'How long does it take?', answer: 'It depends on complexity.' },
]);

const articleWithFaq = buildArticleStructuredData({
  path: '/news/schema-faq-test',
  title: 'Schema FAQ test',
  description: 'Kiểm tra FAQ schema của bài viết.',
  content: faqMarkdown,
  datePublished: '2026-07-28T00:00:00+07:00',
});
assertStructuredData(articleWithFaq, 'article faq');
const articleFaqPages = findType(articleWithFaq, 'FAQPage');
assert.equal(articleFaqPages.length, 1, 'Article with an FAQ section must emit one FAQPage node');
assert.equal(articleFaqPages[0].mainEntity.length, 2);
const articleNode = findType(article, 'BlogPosting')[0];
assert.deepEqual(articleNode.keywords, ['seo', 'marketing', 'google-ranking']);

console.log(
  `Schema validation passed: ${Object.keys(seoPages).length} static routes, `
  + `${videos.length} videos, ${images.length} thumbnails, 1 CMS service fixture, and 1 article tags fixture.`,
);
