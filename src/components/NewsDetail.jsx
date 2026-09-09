import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNews, getNewsById, resolveAssetUrl } from '../api/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { safeUrlTransform } from '../utils/markdownComponents.js';
import { getNewsSlug, isNewsUuid, unwrapNewsList } from '../utils/newsSlug';

const getCurrentLanguage = () => {
  try {
    return localStorage.getItem('language') || 'en';
  } catch {
    return 'en';
  }
};

const copy = {
  en: {
    home: 'Home',
    news: 'News',
    back: 'Back to news',
    loading: 'Loading article',
    error: 'Could not load this article. Please try again later.',
    missing: 'Article not found.',
    retry: 'Back to news',
    fallbackAuthor: 'Unitrux Team',
    minRead: 'min read',
    articleNote: 'Reading note',
    articleNoteBody: 'Save the practical parts, then come back to the strategy layer when planning your next campaign.',
    related: 'Keep reading',
    read: 'Read article'
  },
  vi: {
    home: 'Trang chủ',
    news: 'Tin tức',
    back: 'Quay lại tin tức',
    loading: 'Đang tải bài viết',
    error: 'Không thể tải bài viết. Vui lòng thử lại sau.',
    missing: 'Bài viết không tồn tại.',
    retry: 'Quay lại tin tức',
    fallbackAuthor: 'Unitrux Team',
    minRead: 'phút đọc'
  }
};

const stripMarkdown = (value = '') =>
  value
    .replace(/[#*_>`~[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const calculateReadingTime = (text = '') => {
  const words = stripMarkdown(text).split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const formatDate = (date, language) => {
  if (!date) return '';
  try {
    return new Date(date).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return '';
  }
};

const normalizeArticle = (article, language) => {
  const title = language === 'vi'
    ? (article.titleVi || article.title || 'Untitled')
    : (article.title || article.titleVi || 'Untitled');
  const content = language === 'vi'
    ? (article.contentVi || article.content || '')
    : (article.content || article.contentVi || '');
  const excerpt = language === 'vi'
    ? (article.excerptVi || article.excerpt || '')
    : (article.excerpt || article.excerptVi || '');

  const image = resolveAssetUrl(article.image);

  return {
    id: article.id,
    slug: getNewsSlug(article),
    title,
    content,
    excerpt,
    image,
    isLogoImage: image.toLowerCase().includes('logo'),
    category: article.category || 'news',
    author: article.author || copy[language].fallbackAuthor,
    dateLabel: formatDate(article.createdAt || article.updatedAt, language),
    readingTime: calculateReadingTime(content || excerpt)
  };
};

const NewsDetail = () => {
  const { id: newsSlug } = useParams();
  const navigate = useNavigate();
  const [rawNews, setRawNews] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState(getCurrentLanguage());

  const t = copy[language] || copy.en;
  const news = useMemo(() => rawNews ? normalizeArticle(rawNews, language) : null, [rawNews, language]);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail?.language || getCurrentLanguage());
    };
    const handleStorageChange = (event) => {
      if (event.key === 'language') setLanguage(event.newValue || 'en');
    };

    window.addEventListener('languageChange', handleLanguageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchNews = async () => {
      setLoading(true);
      setError('');
      setRelatedArticles([]);

      try {
        let data;
        let availableNews = [];

        if (isNewsUuid(newsSlug)) {
          data = await getNewsById(newsSlug, { lang: language });
        } else {
          const listPayload = await getNews({ lang: language });
          availableNews = unwrapNewsList(listPayload);
          data = availableNews.find((item) => getNewsSlug(item) === newsSlug);

          if (!data) {
            data = await getNewsById(newsSlug, { lang: language });
          }
        }

        if (!data) throw new Error('Article not found');
        if (!ignore) setRawNews(data);

        const canonicalSlug = getNewsSlug(data);
        if (!ignore && newsSlug !== canonicalSlug) {
          navigate(`/news/${canonicalSlug}`, { replace: true });
        }

        const relatedParams = { lang: language };
        if (data.category) relatedParams.category = data.category;

        const relatedRequest = availableNews.length ? Promise.resolve(availableNews) : getNews(relatedParams);
        relatedRequest
          .then((payload) => {
            if (ignore) return;
            const related = unwrapNewsList(payload)
              .filter((item) => item.id !== data.id)
              .slice(0, 3)
              .map((item) => normalizeArticle(item, language));
            setRelatedArticles(related);
          })
          .catch((relatedErr) => console.error('Failed to load related news:', relatedErr));
      } catch (err) {
        console.error('Failed to load news:', err);
        if (!ignore) setError(t.error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    if (newsSlug) fetchNews();

    return () => {
      ignore = true;
    };
  }, [newsSlug, language, t.error, navigate]);

  return (
    <div className="news-detail-page article-page">
      <style>{`
        .article-page {
          --article-bg: var(--u-dark);
          --article-panel: rgb(from var(--u-dark) r g b / 0.78);
          --article-line: rgb(from var(--u-accent) r g b / 0.22);
          --article-muted: var(--u-muted);
          --article-accent: var(--u-accent-soft);
          min-height: 100vh;
          color: var(--u-dark-ink);
          background:
            radial-gradient(circle at 16% 0%, rgb(from var(--u-accent) r g b / 0.2), transparent 30rem),
            radial-gradient(circle at 88% 12%, rgb(from var(--u-accent) r g b / 0.18), transparent 28rem),
            linear-gradient(180deg, var(--u-dark) 0%, var(--u-dark) 52%, var(--u-dark) 100%);
          position: relative;
          isolation: isolate;
        }
        .article-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgb(from var(--u-surface) r g b / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgb(from var(--u-surface) r g b / 0.03) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(180deg, rgb(from var(--u-dark) r g b / 0.6), transparent 58%);
          pointer-events: none;
          z-index: -1;
        }
        .article-container {
          width: min(1060px, calc(100% - 40px));
          margin: 0 auto;
        }
        .article-breadcrumbs {
          padding: 112px 0 0;
          color: var(--article-muted);
          font-size: 14px;
        }
        .article-breadcrumbs ol {
          list-style: none;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          padding: 0;
          margin: 0;
        }
        .article-breadcrumbs a {
          color: var(--u-dark-ink);
          text-decoration: none;
        }
        .article-breadcrumbs a:hover {
          color: var(--article-accent);
        }
        .article-loading,
        .article-error {
          min-height: 70vh;
          display: grid;
          place-items: center;
          padding-top: 80px;
          text-align: center;
        }
        .article-loading-card,
        .article-error-card {
          width: min(520px, 100%);
          padding: 32px;
          border-radius: 8px;
          border: 1px solid var(--article-line);
          background: var(--article-panel);
        }
        .article-loader {
          height: 8px;
          width: 100%;
          overflow: hidden;
          border-radius: 999px;
          background: rgb(from var(--u-surface) r g b / 0.08);
          margin-top: 18px;
        }
        .article-loader span {
          display: block;
          width: 42%;
          height: 100%;
          border-radius: inherit;
          background: var(--article-accent);
          animation: articleLoad 1.2s ease-in-out infinite;
        }
        @keyframes articleLoad {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(260%); }
        }
        .article-error-card h1 {
          margin: 0 0 12px;
          font-size: 30px;
        }
        .article-button,
        .article-back {
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 18px;
          border-radius: 8px;
          border: 0;
          color: var(--u-ink);
          background: var(--article-accent);
          font-weight: 900;
          text-decoration: none;
          cursor: pointer;
        }
        .article-button:active,
        .article-back:active {
          transform: translateY(1px);
        }
        .article-hero {
          padding: 42px 0 34px;
        }
        .article-kicker {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 16px;
          margin-bottom: 18px;
          color: var(--article-accent);
          font-size: 14px;
          font-weight: 800;
          text-transform: capitalize;
        }
        .article-title {
          max-width: 920px;
          margin: 0;
          color: #fff;
          font-size: clamp(40px, 7vw, 78px);
          line-height: 0.98;
          letter-spacing: 0;
          text-wrap: balance;
        }
        .article-excerpt {
          max-width: 780px;
          margin: 22px 0 0;
          color: var(--u-dark-muted);
          font-size: clamp(17px, 2vw, 21px);
          line-height: 1.65;
        }
        .article-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 18px;
          margin-top: 26px;
          color: var(--article-muted);
          font-size: 15px;
        }
        .article-cover {
          position: relative;
          width: min(1180px, calc(100% - 40px));
          margin: 6px auto 0;
          overflow: hidden;
          border: 1px solid var(--article-line);
          border-radius: 8px;
          background: var(--u-dark);
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.28);
        }
        .article-cover::after {
          content: "";
          position: absolute;
          inset: 14px;
          border: 1px solid rgb(from var(--u-line) r g b / 0.08);
          border-radius: 6px;
          pointer-events: none;
        }
        .article-cover img {
          display: block;
          width: 100%;
          height: min(62vw, 560px);
          min-height: 280px;
          object-fit: contain;
          background:
            radial-gradient(circle at 20% 18%, rgb(from var(--u-accent) r g b / 0.12), transparent 18rem),
            var(--u-dark);
        }
        .article-cover.is-logo {
          background:
            radial-gradient(circle at 20% 18%, rgb(from var(--u-accent) r g b / 0.16), transparent 18rem),
            var(--u-dark);
        }
        .article-cover.is-logo img {
          object-fit: contain;
          padding: clamp(28px, 7vw, 74px);
        }
        .article-layout {
          display: grid;
          grid-template-columns: 220px minmax(0, 760px);
          gap: 46px;
          padding: 54px 0 80px;
          align-items: start;
        }
        .article-aside {
          position: sticky;
          top: 96px;
          padding: 18px;
          border: 1px solid var(--article-line);
          border-radius: 8px;
          background:
            linear-gradient(180deg, rgb(from var(--u-accent) r g b / 0.1), rgb(from var(--u-dark) r g b / 0.62)),
            rgb(from var(--u-dark) r g b / 0.62);
        }
        .article-aside h2 {
          margin: 8px 0 10px;
          color: #fff;
          font-size: 22px;
          line-height: 1.12;
        }
        .article-aside p {
          margin: 0 0 14px;
          color: var(--article-muted);
          font-size: 14px;
          line-height: 1.6;
        }
        .article-body {
          min-width: 0;
          color: var(--u-dark-ink);
          font-size: 18px;
          line-height: 1.85;
          padding: 10px 0 0;
        }
        .article-body > *:first-child {
          margin-top: 0;
          color: var(--u-dark-ink);
          font-size: 22px;
          line-height: 1.65;
        }
        .article-body p {
          margin: 0 0 24px;
        }
        .article-body h1,
        .article-body h2,
        .article-body h3 {
          color: #fff;
          line-height: 1.16;
          letter-spacing: 0;
        }
        .article-body h1 {
          font-size: 42px;
          margin: 44px 0 18px;
        }
        .article-body h2 {
          font-size: 34px;
          margin: 42px 0 16px;
        }
        .article-body h3 {
          font-size: 25px;
          margin: 34px 0 14px;
        }
        .article-body a {
          color: var(--article-accent);
        }
        .article-body ul,
        .article-body ol {
          margin: 0 0 26px;
          padding-left: 24px;
        }
        .article-body li {
          margin-bottom: 10px;
          padding-left: 4px;
        }
        .article-body blockquote {
          margin: 34px 0;
          padding: 22px 24px;
          border-left: 4px solid var(--article-accent);
          border-radius: 8px;
          background: rgb(from var(--u-accent) r g b / 0.08);
          color: var(--u-dark-ink);
        }
        .article-related {
          width: min(1060px, calc(100% - 40px));
          margin: 0 auto 84px;
          padding-top: 10px;
        }
        .article-related h2 {
          margin: 0 0 18px;
          color: #fff;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.05;
        }
        .article-related-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .article-related-card {
          overflow: hidden;
          border: 1px solid var(--article-line);
          border-radius: 8px;
          background:
            linear-gradient(180deg, rgb(from var(--u-surface) r g b / 0.045), transparent 34%),
            rgb(from var(--u-dark) r g b / 0.72);
          cursor: pointer;
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }
        .article-related-card:hover {
          transform: translateY(-4px);
          border-color: rgb(from var(--u-accent) r g b / 0.55);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
        }
        .article-related-card img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
          background: var(--u-dark);
        }
        .article-related-card.is-logo img {
          object-fit: contain;
          padding: 26px;
        }
        .article-related-card div {
          padding: 16px;
        }
        .article-related-card span {
          display: block;
          color: var(--article-accent);
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 8px;
          text-transform: capitalize;
        }
        .article-related-card h3 {
          margin: 0 0 12px;
          color: #fff;
          font-size: 19px;
          line-height: 1.2;
        }
        .article-related-card p {
          margin: 0;
          color: var(--article-muted);
          font-size: 13px;
          font-weight: 800;
        }
        .article-body code {
          padding: 2px 6px;
          border-radius: 6px;
          color: #fff;
          background: rgb(from var(--u-surface) r g b / 0.1);
        }
        .article-body pre {
          overflow-x: auto;
          padding: 18px;
          border-radius: 8px;
          border: 1px solid var(--article-line);
          background: var(--u-dark);
        }
        .article-body pre code {
          padding: 0;
          background: transparent;
        }
        .article-body img {
          max-width: 100%;
          border-radius: 8px;
          border: 1px solid var(--article-line);
        }
        @media (prefers-reduced-motion: reduce) {
          .article-loader span {
            animation: none;
          }
        }
        @media (max-width: 900px) {
          .article-layout {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .article-aside {
            position: static;
          }
          .article-related-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          body:has(.article-page) .floating-buttons {
            display: none;
          }
          .article-container,
          .article-cover {
            width: min(100% - 28px, 1180px);
          }
          .article-breadcrumbs {
            padding-top: 92px;
          }
          .article-hero {
            padding-top: 30px;
          }
          .article-body {
            font-size: 16px;
            line-height: 1.78;
          }
          .article-body h1 {
            font-size: 32px;
          }
          .article-body h2 {
            font-size: 28px;
          }
          .article-body h3 {
            font-size: 22px;
          }
        }
      `}</style>

      {loading && (
        <div className="article-loading">
          <div className="article-loading-card">
            <p>{t.loading}</p>
            <div className="article-loader"><span></span></div>
          </div>
        </div>
      )}

      {!loading && (error || !news) && (
        <div className="article-error">
          <div className="article-error-card">
            <h1>{error ? t.error : t.missing}</h1>
            <button className="article-button" type="button" onClick={() => navigate('/news')}>
              {t.retry}
            </button>
          </div>
        </div>
      )}

      {!loading && !error && news && (
        <>
          <nav className="article-breadcrumbs">
            <div className="article-container">
              <ol>
                <li><a href="/">{t.home}</a></li>
                <li>/</li>
                <li><a href="/news">{t.news}</a></li>
                <li>/</li>
                <li>{news.category}</li>
              </ol>
            </div>
          </nav>

          <header className="article-hero">
            <div className="article-container">
              <div className="article-kicker">
                <span>{news.category}</span>
                {news.dateLabel && <span>{news.dateLabel}</span>}
              </div>
              <h1 className="article-title">{news.title}</h1>
              {news.excerpt && <p className="article-excerpt">{stripMarkdown(news.excerpt)}</p>}
              <div className="article-meta">
                <span>{news.author}</span>
                <span>{news.readingTime} {t.minRead}</span>
              </div>
            </div>
          </header>

          <div className={`article-cover ${news.isLogoImage ? 'is-logo' : ''}`}>
            <img src={news.image} alt={news.title} />
          </div>

          <main className="article-container article-layout">
            <aside className="article-aside">
              <h2>{t.articleNote || (language === 'vi' ? 'Ghi chú đọc' : 'Reading note')}</h2>
              <p>{t.articleNoteBody || (language === 'vi' ? 'Lưu lại phần thực thi, rồi quay lại lớp chiến lược khi lập kế hoạch chiến dịch.' : 'Save the practical parts, then come back to the strategy layer when planning your next campaign.')}</p>
              <p>{news.category}</p>
              {news.dateLabel && <p>{news.dateLabel}</p>}
              <p>{news.readingTime} {t.minRead}</p>
              <button className="article-back" type="button" onClick={() => navigate('/news')}>
                {t.back}
              </button>
            </aside>

            <article className="article-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]} urlTransform={safeUrlTransform}>{news.content}</ReactMarkdown>
            </article>
          </main>

          {relatedArticles.length > 0 && (
            <section className="article-related">
              <h2>{t.related || (language === 'vi' ? 'Đọc tiếp' : 'Keep reading')}</h2>
              <div className="article-related-grid">
                {relatedArticles.map((article) => (
                  <article
                    key={article.id}
                    className={`article-related-card ${article.isLogoImage ? 'is-logo' : ''}`}
                    onClick={() => navigate(`/news/${article.slug}`)}
                  >
                    <img src={article.image} alt={article.title} loading="lazy" />
                    <div>
                      <span>{article.category}</span>
                      <h3>{article.title}</h3>
                      <p>{article.readingTime} {t.minRead}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default NewsDetail;
