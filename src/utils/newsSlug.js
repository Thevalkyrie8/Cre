export const slugifyNewsTitle = (value = '') =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const getNewsSlug = (article = {}) =>
  slugifyNewsTitle(article.slug || article.title || article.titleVi || 'article');

export const getStoredLanguage = () => {
  try {
    return localStorage.getItem('language') === 'vi' ? 'vi' : 'en';
  } catch {
    return 'en';
  }
};

export const getLocalizedNewsFields = (article = {}, language = 'en') => {
  const isVietnamese = language === 'vi';
  const title = isVietnamese
    ? article.titleVi || article.title
    : article.title || article.titleVi;
  const content = isVietnamese
    ? article.contentVi || article.content
    : article.content || article.contentVi;
  const excerpt = isVietnamese
    ? article.excerptVi || article.excerpt || content
    : article.excerpt || article.excerptVi || content;

  return { title: title || '', excerpt: excerpt || '', content: content || '' };
};

export const unwrapNewsList = (payload) => {
  if (Array.isArray(payload)) return payload;
  const candidates = [
    payload?.data,
    payload?.items,
    payload?.news,
    payload?.results,
    payload?.data?.items,
    payload?.data?.news,
    payload?.data?.results,
  ];
  return candidates.find(Array.isArray) || [];
};

export const isNewsUuid = (value = '') =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
