import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedNews, getNews, resolveAssetUrl } from '../api/client';
import { getLocalizedNewsFields, getNewsSlug, getStoredLanguage, unwrapNewsList } from '../utils/newsSlug';

const copy = {
  en: {
    home: 'Home', news: 'Insights', heroLabel: 'Unitrux Growth Library',
    title: 'Ideas that turn traffic into growth.',
    description: 'Practical playbooks for Vietnamese SMEs—connecting websites, SEO, advertising and automation into one measurable growth system.',
    search: 'Search by challenge, channel or topic', clear: 'Clear search', all: 'All topics',
    featured: 'Editor’s pick', readFeatured: 'Read the featured article', latest: 'Latest thinking',
    latestBody: 'Direct, useful guidance for the next decision in your growth journey.',
    article: 'article', articles: 'articles', result: 'matching', min: 'min read', read: 'Read article',
    empty: 'No insight matches that search.', emptyBody: 'Try a broader keyword or return to all topics.', reset: 'Reset filters',
    flowTitle: 'One connected growth system', flowBody: 'Every article helps you improve one part of the journey—and understand what it changes downstream.',
    flow: ['Build trust', 'Attract demand', 'Start conversations', 'Measure growth'],
    ctaTitle: 'Turn the next insight into action.', ctaBody: 'Tell us where growth is getting stuck. Unitrux will help connect the right website, SEO, Ads and chatbot solution.',
    contact: 'Discuss your growth system', chat: 'Chat with Unitrux', loading: 'Loading insights…', error: 'Insights could not be loaded right now.', retry: 'Try again'
  },
  vi: {
    home: 'Trang chủ', news: 'Góc nhìn', heroLabel: 'Thư viện tăng trưởng Unitrux',
    title: 'Kiến thức biến traffic thành tăng trưởng.',
    description: 'Các hướng dẫn thực tế dành cho SME Việt Nam—kết nối Website, SEO, quảng cáo và tự động hóa thành một hệ thống tăng trưởng có thể đo lường.',
    search: 'Tìm theo vấn đề, kênh hoặc chủ đề', clear: 'Xóa tìm kiếm', all: 'Tất cả chủ đề',
    featured: 'Bài viết nổi bật', readFeatured: 'Đọc bài viết nổi bật', latest: 'Góc nhìn mới nhất',
    latestBody: 'Thông tin trực tiếp, hữu ích cho quyết định tiếp theo trong hành trình tăng trưởng.',
    article: 'bài viết', articles: 'bài viết', result: 'phù hợp', min: 'phút đọc', read: 'Đọc bài viết',
    empty: 'Chưa có bài viết phù hợp.', emptyBody: 'Hãy thử từ khóa rộng hơn hoặc quay lại tất cả chủ đề.', reset: 'Xóa bộ lọc',
    flowTitle: 'Một hệ thống tăng trưởng kết nối', flowBody: 'Mỗi bài viết giúp anh/chị cải thiện một mắt xích và hiểu tác động của nó tới toàn bộ hành trình.',
    flow: ['Xây niềm tin', 'Thu hút nhu cầu', 'Bắt đầu hội thoại', 'Đo lường tăng trưởng'],
    ctaTitle: 'Biến góc nhìn tiếp theo thành hành động.', ctaBody: 'Cho Unitrux biết tăng trưởng đang mắc ở đâu. Chúng tôi sẽ giúp kết nối Website, SEO, Ads và Chatbot thành giải pháp phù hợp.',
    contact: 'Trao đổi về hệ thống tăng trưởng', chat: 'Chat với Unitrux', loading: 'Đang tải bài viết…', error: 'Hiện chưa thể tải bài viết.', retry: 'Thử lại'
  }
};

const normalizeText = (value = '') => String(value).normalize('NFC');
const stripText = (value = '') => normalizeText(value).replace(/[#*_>`~[\]()]/g, '').replace(/\s+/g, ' ').trim();
const readingTime = (value = '') => Math.max(1, Math.ceil(stripText(value).split(' ').filter(Boolean).length / 200));
const formatDate = (value, language) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const normalizeArticle = (item, language) => {
  const { title, content, excerpt: sourceExcerpt } = getLocalizedNewsFields(item, language);
  const excerpt = stripText(sourceExcerpt).slice(0, 190);
  return {
    id: item.id || getNewsSlug(item),
    slug: getNewsSlug(item),
    title: normalizeText(title || 'Untitled'),
    category: normalizeText(item.category || 'Business'),
    excerpt: excerpt.length === 190 ? `${excerpt}…` : excerpt,
    image: resolveAssetUrl(item.image, '/logo.jpg'),
    dateLabel: formatDate(item.createdAt || item.updatedAt || item.date, language),
    minutes: readingTime(content || sourceExcerpt),
    isLogo: !item.image || String(item.image).toLowerCase().includes('logo')
  };
};

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
);

const NewsSkeleton = () => (
  <div className="news-hub__skeleton" aria-hidden="true">
    <div className="news-hub__skeleton-feature" />
    <div className="news-hub__skeleton-row" /><div className="news-hub__skeleton-row" />
  </div>
);

const NewsShowcase = () => {
  const [language, setLanguage] = useState(getStoredLanguage);
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const t = copy[language] || copy.en;

  useEffect(() => {
    const handleLanguage = (event) => setLanguage(event.detail?.language === 'vi' ? 'vi' : 'en');
    const handleStorage = (event) => event.key === 'language' && setLanguage(event.newValue === 'vi' ? 'vi' : 'en');
    window.addEventListener('languageChange', handleLanguage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('languageChange', handleLanguage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    Promise.allSettled([getNews({ lang: language }), getFeaturedNews({ lang: language })]).then(([listResult, featuredResult]) => {
      if (!active) return;
      const rawList = listResult.status === 'fulfilled' ? unwrapNewsList(listResult.value) : [];
      const mapped = rawList.map((item) => normalizeArticle(item, language));
      let rawFeatured = null;
      if (featuredResult.status === 'fulfilled') {
        const payload = featuredResult.value;
        rawFeatured = Array.isArray(payload) ? payload[0] : payload?.data && !Array.isArray(payload.data) ? payload.data : payload;
      }
      setArticles(mapped);
      setFeatured(rawFeatured?.id || rawFeatured?.title ? normalizeArticle(rawFeatured, language) : mapped[0] || null);
      if (listResult.status === 'rejected' && !mapped.length) setError(t.error);
      setLoading(false);
    });
    return () => { active = false; };
  }, [language, t.error]);

  const categories = useMemo(() => [...new Set(articles.map((article) => article.category).filter(Boolean))], [articles]);
  const filtered = useMemo(() => articles.filter((article) => {
    const matchesCategory = category === 'all' || article.category === category;
    const needle = query.trim().toLocaleLowerCase(language === 'vi' ? 'vi' : 'en');
    const haystack = `${article.title} ${article.excerpt} ${article.category}`.toLocaleLowerCase(language === 'vi' ? 'vi' : 'en');
    return matchesCategory && (!needle || haystack.includes(needle));
  }), [articles, category, query, language]);

  const showFeatured = featured && category === 'all' && !query.trim();
  const latest = filtered.filter((article) => !showFeatured || article.slug !== featured.slug);
  const resetFilters = () => { setCategory('all'); setQuery(''); };
  const openChat = () => window.dispatchEvent(new CustomEvent('unitrux:open-chat'));

  return (
    <div className="theme-synced-page news-hub">
      <section className="news-hub__hero" aria-labelledby="news-title">
        <div className="news-hub__container news-hub__hero-grid">
          <div className="news-hub__intro">
            <nav className="news-hub__breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">{t.home}</Link><span aria-hidden="true">/</span><span>{t.news}</span>
            </nav>
            <p className="news-hub__label">{t.heroLabel}</p>
            <h1 id="news-title">{t.title}</h1>
            <p className="news-hub__lede">{t.description}</p>

            <div className="news-hub__search-group">
              <label className="news-hub__search">
              <span className="news-hub__sr-only">{t.search}</span>
              <SearchIcon />
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} autoComplete="off" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label={t.clear}>×</button>}
              </label>
              {!loading && !error && <p className="news-hub__result-count" aria-live="polite"><strong>{filtered.length}</strong> {filtered.length === 1 ? t.article : t.articles} {t.result}</p>}
            </div>
          </div>

          <aside className="news-hub__flow" aria-label={t.flowTitle}>
            <div className="news-hub__flow-head">
              <span className="news-hub__signal" aria-hidden="true" />
              <h2>{t.flowTitle}</h2>
            </div>
            <p>{t.flowBody}</p>
            <ol>
              {t.flow.map((item, index) => <li key={item}><span>{index + 1}</span><strong>{item}</strong></li>)}
            </ol>
          </aside>
        </div>
      </section>

      <div className="news-hub__topic-shell">
        <div className="news-hub__container news-hub__topics" role="group" aria-label={t.all}>
          <button type="button" className={category === 'all' ? 'is-active' : ''} onClick={() => setCategory('all')}>{t.all}</button>
          {categories.map((item) => <button type="button" key={item} className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </div>

      <main className="news-hub__container news-hub__content">
        {loading ? <NewsSkeleton /> : error ? (
          <section className="news-hub__state" aria-live="polite">
            <h2>{error}</h2><button type="button" onClick={() => window.location.reload()}>{t.retry}</button>
          </section>
        ) : (
          <>
            {showFeatured && (
              <section className="news-hub__featured" aria-labelledby="featured-title">
                <div className={`news-hub__featured-media ${featured.isLogo ? 'is-logo' : ''}`}>
                  <img src={featured.image} alt="" width="1200" height="675" fetchPriority="high" decoding="async" />
                </div>
                <div className="news-hub__featured-copy">
                  <p className="news-hub__section-label">{t.featured}</p>
                  <h2 id="featured-title">{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <div className="news-hub__meta"><span>{featured.category}</span><span>{featured.dateLabel}</span><span>{featured.minutes} {t.min}</span></div>
                  <Link to={`/news/${featured.slug}`} className="news-hub__primary-link">{t.readFeatured}<ArrowIcon /></Link>
                </div>
              </section>
            )}

            <section className="news-hub__latest" aria-labelledby="latest-title">
              <header className="news-hub__section-head">
                <div><h2 id="latest-title">{t.latest}</h2><p>{t.latestBody}</p></div>
                {(query || category !== 'all') && <button type="button" onClick={resetFilters}>{t.reset}</button>}
              </header>

              {latest.length ? (
                <div className="news-hub__article-list">
                  {latest.map((article) => (
                    <Link key={article.id} to={`/news/${article.slug}`} className="news-hub__article">
                      <div className={`news-hub__article-media ${article.isLogo ? 'is-logo' : ''}`}><img src={article.image} alt="" width="640" height="400" loading="lazy" decoding="async" /></div>
                      <div className="news-hub__article-copy">
                        <div className="news-hub__meta"><span>{article.category}</span><span>{article.dateLabel}</span><span>{article.minutes} {t.min}</span></div>
                        <h3>{article.title}</h3>
                        <p>{article.excerpt}</p>
                      </div>
                      <span className="news-hub__article-action" aria-label={t.read}><ArrowIcon /></span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="news-hub__state">
                  <h3>{t.empty}</h3><p>{t.emptyBody}</p><button type="button" onClick={resetFilters}>{t.reset}</button>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <section className="news-hub__cta" aria-labelledby="news-cta-title">
        <div className="news-hub__container news-hub__cta-inner">
          <div><h2 id="news-cta-title">{t.ctaTitle}</h2><p>{t.ctaBody}</p></div>
          <div className="news-hub__cta-actions">
            <Link to="/contact" className="news-hub__cta-primary">{t.contact}<ArrowIcon /></Link>
            <button type="button" onClick={openChat}>{t.chat}</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsShowcase;
