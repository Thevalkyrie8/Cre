import { buildArticleStructuredData, buildCmsServiceStructuredData, buildStructuredData,
  DEFAULT_OG_IMAGE, getCanonicalUrl, getSeoForPath, normalizePath, SITE_NAME } from './seoConfig.js';
import { applyPageOverride, buildRobotsContent, mergeStructuredData, resolveRemoteSeo } from './seoRemote.js';
import { buildPageTitle } from '../utils/text.js';

/** One metadata contract for initial content and late Admin overrides. */
export const resolvePageSeo = (pathname, remoteMap, entity) => {
  const path = normalizePath(pathname);
  let override = resolveRemoteSeo(remoteMap, path, 'vi');
  let page = applyPageOverride(getSeoForPath(path), override);
  let schema = buildStructuredData(path);
  let type = 'website';
  let language = 'vi';
  let author, published, modified;
  if (entity?.path === path && entity.kind === 'article') {
    const article = entity.data;
    language = article.language || 'vi';
    override = resolveRemoteSeo(remoteMap, article.id, language);
    page = {
      title: override?.seoTitle || buildPageTitle(article.title, SITE_NAME),
      description: override?.metaDescription || article.description || '',
      ogTitle: override?.ogTitle || override?.seoTitle || article.title,
      ogDescription: override?.ogDescription,
      ogImage: override?.ogImage || article.image,
      canonical: override?.canonicalUrl,
      noindex: override?.robotsIndex === false,
      nofollow: override?.robotsFollow === false,
    };
    type = 'article';
    author = article.author; published = article.datePublished; modified = article.dateModified;
    schema = buildArticleStructuredData(article);
  } else if (entity?.path === path && entity.kind === 'service') {
    const { service, language: locale } = entity.data;
    language = locale || 'vi';
    override = resolveRemoteSeo(remoteMap, String(service.id), language);
    schema = buildCmsServiceStructuredData({ service, pathname: path, language });
    const webpage = schema['@graph']?.find((node) => node['@id'] === `${getCanonicalUrl(path)}#webpage`);
    page = applyPageOverride({ title: webpage?.name || page.title, description: webpage?.description || '',
      noindex: service.isActive === false }, override);
    // Inactive CMS content cannot be made public by a metadata override.
    page.noindex = service.isActive === false || page.noindex;
  }
  return { ...page, canonical: page.canonical || getCanonicalUrl(path),
    ogTitle: page.ogTitle || page.title, ogDescription: page.ogDescription || page.description,
    ogImage: page.ogImage || DEFAULT_OG_IMAGE,
    robots: buildRobotsContent(!page.noindex, !page.nofollow), type, language,
    author, published, modified, schema: mergeStructuredData(schema, override?.schemaJson) };
};
