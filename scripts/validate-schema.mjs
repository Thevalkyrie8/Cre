import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { join } from 'node:path';
import { productionPortfolio } from '../src/data/productionPortfolio.js';
import {
  buildArticleStructuredData,
  buildCmsServiceStructuredData,
  buildStructuredData,
  seoPages,
  SITE_URL,
} from '../src/seo/seoConfig.js';
import {
  assertStructuredData,
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
assert.equal(findType(portfolio, 'FAQPage').length, 0);

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
const articleNode = findType(article, 'BlogPosting')[0];
assert.deepEqual(articleNode.keywords, ['seo', 'marketing', 'google-ranking']);

console.log(
  `Schema validation passed: ${Object.keys(seoPages).length} static routes, `
  + `${videos.length} videos, ${images.length} thumbnails, 1 CMS service fixture, and 1 article tags fixture.`,
);
