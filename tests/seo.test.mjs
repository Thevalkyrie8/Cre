import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolvePageSeo } from '../src/seo/resolvePageSeo.js';
import { applyStaticMeta, isSitemapIndexable } from '../src/seo/staticSeo.js';
import { mergeStructuredData } from '../src/seo/seoRemote.js';
import { publishEntitySeo, getEntitySeo, subscribeEntitySeo } from '../src/seo/entitySeoStore.js';

const article = { kind: 'article', path: '/news/test', data: { id: 'news-uuid', path: '/news/test', title: 'Article title', description: 'Visible article description', author: 'Unitrux Team', language: 'en' } };
test('late metadata preserves article type and applies overrides by UUID and locale', () => {
  const initial = resolvePageSeo('/news/test/', null, article);
  const updated = resolvePageSeo('/news/test/', { 'news-uuid': { '*': { seoTitle: 'Default' }, en: { seoTitle: 'Exact Admin title', robotsFollow: false, ogDescription: 'Social description' }, vi: { seoTitle: 'Vietnamese' } } }, article);
  assert.equal(initial.type, 'article');
  assert.equal(updated.title, 'Exact Admin title');
  assert.equal(updated.type, 'article');
  assert.equal(updated.robots, 'index, nofollow');
  assert.equal(updated.ogDescription, 'Social description');
  assert.equal(updated.author, 'Unitrux Team');
  assert.ok(updated.schema['@graph'].some((node) => node['@type'] === 'BlogPosting'));
});
test('navigation does not reuse the previous article metadata', () => {
  const next = resolvePageSeo('/contact/', null, article);
  assert.equal(next.type, 'website');
  assert.equal(next.author, undefined);
  assert.equal(next.canonical, 'https://unitrux.com/contact/');
});
test('entity metadata published before the SEO component mounts is retained', () => {
  let calls = 0;
  const unsubscribe = subscribeEntitySeo(() => calls++);
  publishEntitySeo('article', article.data);
  assert.equal(getEntitySeo().data.id, 'news-uuid');
  assert.equal(calls, 1);
  unsubscribe();
});
test('static metadata honors social description, title, canonical and robots', () => {
  const block = '<title>Default</title><meta name="description" content="Default" /><meta property="og:title" content="Default" /><meta name="twitter:title" content="Default" /><meta property="og:description" content="Default" /><meta name="twitter:description" content="Default" /><meta name="robots" content="index, follow" /><link rel="canonical" href="https://unitrux.com/" /><meta property="og:url" content="https://unitrux.com/" />';
  const html = applyStaticMeta(block, { seoTitle: 'Title $& < &', metaDescription: 'Search', ogDescription: 'Social', robotsFollow: false, canonicalUrl: 'https://unitrux.com/test/' });
  assert.ok(html.includes('<title>Title $&amp; &lt; &amp;</title>'));
  assert.ok(html.includes('name="twitter:description" content="Social"'));
  assert.ok(html.includes('name="description" content="Search"'));
  assert.ok(html.includes('content="index, nofollow"'));
  assert.ok(html.includes('property="og:url" content="https://unitrux.com/test/"'));
});
test('sitemap excludes noindex and pages canonicalized elsewhere', () => {
  assert.equal(isSitemapIndexable('https://unitrux.com/a/', { canonicalUrl: 'https://unitrux.com/a' }), true);
  assert.equal(isSitemapIndexable('https://unitrux.com/a/', { canonicalUrl: 'https://unitrux.com/b/' }), false);
  assert.equal(isSitemapIndexable('https://unitrux.com/a/', { robotsIndex: false }), false);
});
test('schema overrides update matching IDs without duplicate nodes or mutating the original', () => {
  const original = { '@graph': [{ '@id': '#page', '@type': 'WebPage', name: 'Old' }] };
  const merged = mergeStructuredData(original, { '@graph': [{ '@id': '#page', name: 'New' }] });
  assert.equal(merged['@graph'].length, 1);
  assert.equal(merged['@graph'][0].name, 'New');
  assert.equal(original['@graph'][0].name, 'Old');
});
