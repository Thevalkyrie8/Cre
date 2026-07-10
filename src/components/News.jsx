import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNews, getFeaturedNews, resolveAssetUrl } from '../api/client';

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
    eyebrow: 'Unitrux Journal',
    title: 'News, ideas, and field notes for smarter growth',
    subtitle: 'Practical updates across marketing, automation, commerce, creative production, and technology.',
    search: 'Search articles or topics',
    all: 'All',
    featured: 'Featured',
    latest: 'Latest articles',
    edition: 'Current issue',
    topics: 'Topics',
    showing: 'Showing',
    editorNote: 'From the desk',
    editorNoteBody: 'A tighter read on the signals we are watching across growth, content, systems, and commerce.',
    read: 'Read article',
    noResults: 'No articles found',
    noResultsBody: 'Try a different keyword or category.',
    loading: 'Loading articles',
    newsletterTitle: 'Get the next signal',
    newsletterBody: 'Fresh Unitrux insights, useful frameworks, and launch notes in your inbox.',
    email: 'Your email',
    subscribe: 'Subscribe',
    minRead: 'min read',
    fallbackAuthor: 'Unitrux Team'
  },
  vi: {
    home: 'Trang chủ',
    news: 'Tin tức',
    eyebrow: 'Unitrux Journal',
    title: 'Tin tức, góc nhìn và ghi chú giúp tăng trưởng thông minh hơn',
    subtitle: 'Cập nhật thực tế về marketing, tự động hóa, thương mại, sáng tạo nội dung và công nghệ.',
    search: 'Tìm bài viết hoặc chủ đề',
    all: 'Tất cả',
    featured: 'Nổi bật',
    latest: 'Bài viết mới nhất',
    read: 'Đọc bài viết',
    noResults: 'Chưa tìm thấy bài viết',
    noResultsBody: 'Thử đổi từ khóa hoặc danh mục khác.',
    loading: 'Đang tải bài viết',
    newsletterTitle: 'Nhận tín hiệu mới nhất',
    newsletterBody: 'Insight, framework và cập nhật từ Unitrux gửi thẳng vào hộp thư của bạn.',
    email: 'Email của bạn',
    subscribe: 'Đăng ký',
    minRead: 'phút đọc',
    fallbackAuthor: 'Unitrux Team'
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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return '';
  }
};

const normalizeNewsItem = (item, language) => {
  const title = language === 'vi'
    ? (item.titleVi || item.title || 'Untitled')
    : (item.title || item.titleVi || 'Untitled');
  const content = language === 'vi'
    ? (item.contentVi || item.content || '')
    : (item.content || item.contentVi || '');
  const excerptSource = language === 'vi'
    ? (item.excerptVi || item.excerpt || content)
    : (item.excerpt || item.excerptVi || content);
  const excerpt = stripMarkdown(excerptSource).slice(0, 170);

  const image = resolveAssetUrl(item.image);

  return {
    id: item.id,
    slug: item.slug,
    title,
    category: item.category || 'news',
    excerpt: excerpt.length === 170 ? `${excerpt}...` : excerpt,
    content,
    image,
    isLogoImage: image.toLowerCase().includes('logo'),
    date: item.createdAt || item.updatedAt || '',
    dateLabel: formatDate(item.createdAt || item.updatedAt, language),
    author: item.author || copy[language].fallbackAuthor,
    readingTime: calculateReadingTime(content || excerptSource)
  };
};

const NewsCard = ({ article, language, onOpen }) => {
  const t = copy[language];

  return (
    <article className="journal-card" onClick={() => onOpen(article.slug)}>
      <div className={`journal-card-image ${article.isLogoImage ? 'is-logo' : ''}`}>
        <img src={article.image} alt={article.title} loading="lazy" />
      </div>
      <div className="journal-card-body">
        <div className="journal-card-meta">
          <span>{article.category}</span>
          {article.dateLabel && <span>{article.dateLabel}</span>}
        </div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="journal-card-footer">
          <span>{article.readingTime} {t.minRead}</span>
          <button type="button" aria-label={`${t.read}: ${article.title}`}>
            {t.read}
          </button>
        </div>
      </div>
    </article>
  );
};

const News = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(getCurrentLanguage());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [categories, setCategories] = useState([{ id: 'all', label: copy[language].all }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const t = copy[language] || copy.en;

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

  const buildCategories = useCallback((items) => {
    const uniqueCategories = [...new Set(items.map((item) => item.category).filter(Boolean))];
    setCategories([
      { id: 'all', label: copy[language].all },
      ...uniqueCategories.map((category) => ({ id: category, label: category }))
    ]);
  }, [language]);

  const loadNews = useCallback(async (params = {}) => {
    setLoading(true);
    setError('');

    try {
      const list = await getNews({ lang: language, ...params });
      const mapped = (Array.isArray(list) ? list : []).map((item) => normalizeNewsItem(item, language));
      setArticles(mapped);

      if (!params.search && !params.category) buildCategories(mapped);
    } catch (err) {
      console.error('Failed to load news:', err);
      setError(language === 'vi' ? 'Không thể tải danh sách bài viết.' : 'Could not load articles.');
    } finally {
      setLoading(false);
    }
  }, [buildCategories, language]);

  useEffect(() => {
    let ignore = false;

    getFeaturedNews({ lang: language })
      .then((data) => {
        if (ignore) return;
        const source = Array.isArray(data) ? data[0] : data;
        if (source) setFeatured(normalizeNewsItem(source, language));
      })
      .catch((err) => console.error('Failed to load featured news:', err));

    loadNews();

    return () => {
      ignore = true;
    };
  }, [language, loadNews]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = {};
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (selectedCategory !== 'all') params.category = selectedCategory;
      loadNews(params);
    }, 280);

    return () => clearTimeout(timeout);
  }, [searchTerm, selectedCategory, loadNews]);

  const leadArticle = useMemo(() => featured || articles[0] || null, [articles, featured]);
  const gridArticles = useMemo(() => {
    if (!leadArticle) return articles;
    return articles.filter((article) => article.id !== leadArticle.id);
  }, [articles, leadArticle]);

  return (
    <div className="news-page journal-page">
      <style>{`
        .journal-page {
          --journal-bg: #020817;
          --journal-panel: rgba(7, 20, 48, 0.76);
          --journal-panel-strong: rgba(9, 26, 61, 0.9);
          --journal-line: rgba(77, 150, 255, 0.22);
          --journal-muted: #9fb2d6;
          --journal-text: #f7fbff;
          --journal-accent: #19D9FF;
          min-height: 100vh;
          color: var(--journal-text);
          background:
            radial-gradient(circle at 8% 8%, rgba(25, 217, 255, 0.2), transparent 32rem),
            radial-gradient(circle at 95% 6%, rgba(11, 99, 255, 0.18), transparent 28rem),
            linear-gradient(180deg, #020817 0%, #051126 54%, #020817 100%);
          position: relative;
          isolation: isolate;
        }
        .journal-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: linear-gradient(180deg, rgba(0,0,0,0.68), transparent 62%);
          pointer-events: none;
          z-index: -1;
        }
        .journal-container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }
        .journal-breadcrumbs {
          padding: 112px 0 0;
          color: var(--journal-muted);
          font-size: 14px;
        }
        .journal-breadcrumbs ol {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0;
          margin: 0;
        }
        .journal-breadcrumbs a {
          color: #dbe8ff;
          text-decoration: none;
        }
        .journal-hero {
          padding: 42px 0 34px;
        }
        .journal-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
          gap: 34px;
          align-items: end;
        }
        .journal-eyebrow {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          padding: 8px 12px;
          border: 1px solid var(--journal-line);
          border-radius: 999px;
          color: var(--journal-accent);
          background: rgba(25, 217, 255, 0.07);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .journal-hero h1 {
          margin: 18px 0 18px;
          max-width: 760px;
          font-size: clamp(42px, 7vw, 82px);
          line-height: 0.95;
          letter-spacing: 0;
          color: #fff;
        }
        .journal-hero p {
          max-width: 650px;
          margin: 0;
          color: #bfd0ef;
          font-size: clamp(16px, 2vw, 19px);
          line-height: 1.7;
        }
        .journal-search-panel {
          position: relative;
          overflow: hidden;
          padding: 22px;
          border: 1px solid var(--journal-line);
          border-radius: 8px;
          background: linear-gradient(180deg, rgba(9, 31, 72, 0.84), rgba(6, 17, 39, 0.76));
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.26);
        }
        .journal-search-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent 42%);
          pointer-events: none;
        }
        .journal-search-panel > * {
          position: relative;
        }
        .journal-search-panel input {
          width: 100%;
          min-height: 54px;
          padding: 0 18px;
          border: 1px solid rgba(159, 178, 214, 0.26);
          border-radius: 8px;
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
          font-size: 15px;
          outline: none;
        }
        .journal-search-panel input:focus {
          border-color: var(--journal-accent);
          box-shadow: 0 0 0 4px rgba(25, 217, 255, 0.11);
        }
        .journal-search-panel input::placeholder {
          color: #7f91b2;
        }
        .journal-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 14px;
        }
        .journal-tabs button,
        .journal-card-footer button,
        .journal-featured button,
        .journal-newsletter button {
          border: 0;
          cursor: pointer;
          font: inherit;
        }
        .journal-tabs button {
          min-height: 38px;
          padding: 0 14px;
          border-radius: 999px;
          color: #c8d7f2;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(159, 178, 214, 0.2);
          transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease;
        }
        .journal-tabs button:hover {
          transform: translateY(-1px);
          border-color: rgba(25, 217, 255, 0.45);
        }
        .journal-tabs button.active {
          color: #021126;
          background: var(--journal-accent);
          border-color: var(--journal-accent);
          font-weight: 800;
        }
        .journal-issue-strip {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 1fr;
          gap: 1px;
          margin: 6px 0 24px;
          padding: 0;
          overflow: hidden;
          border: 1px solid var(--journal-line);
          border-radius: 8px;
          background: var(--journal-line);
        }
        .journal-issue-cell {
          min-height: 112px;
          padding: 20px;
          background:
            linear-gradient(135deg, rgba(25, 217, 255, 0.08), transparent 50%),
            rgba(7, 20, 48, 0.82);
        }
        .journal-issue-cell span {
          display: block;
          color: var(--journal-muted);
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 10px;
        }
        .journal-issue-cell strong {
          display: block;
          color: #fff;
          font-size: clamp(24px, 3vw, 38px);
          line-height: 1;
          letter-spacing: 0;
          text-transform: capitalize;
        }
        .journal-featured {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(300px, 0.92fr);
          gap: 0;
          margin: 20px 0 56px;
          overflow: hidden;
          border: 1px solid var(--journal-line);
          border-radius: 8px;
          background: var(--journal-panel-strong);
        }
        .journal-featured::after {
          content: "";
          position: absolute;
          inset: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          pointer-events: none;
        }
        .journal-featured-media {
          min-height: 430px;
          background: #061126;
        }
        .journal-featured-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .journal-featured-media.is-logo,
        .journal-card-image.is-logo {
          background:
            radial-gradient(circle at 20% 18%, rgba(25, 217, 255, 0.16), transparent 18rem),
            #061126;
        }
        .journal-featured-media.is-logo img,
        .journal-card-image.is-logo img {
          object-fit: contain;
          padding: clamp(24px, 6vw, 64px);
        }
        .journal-featured-copy {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(24px, 5vw, 46px);
        }
        .journal-label {
          color: var(--journal-accent);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.02em;
        }
        .journal-featured h2 {
          margin: 14px 0 16px;
          color: #fff;
          font-size: clamp(30px, 4vw, 52px);
          line-height: 1;
          letter-spacing: 0;
        }
        .journal-featured p {
          margin: 0 0 22px;
          color: #bfd0ef;
          font-size: 17px;
          line-height: 1.7;
        }
        .journal-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 16px;
          color: var(--journal-muted);
          font-size: 14px;
          margin-bottom: 26px;
        }
        .journal-featured button {
          width: fit-content;
          min-height: 48px;
          padding: 0 20px;
          border-radius: 8px;
          color: #021126;
          background: #fff;
          font-weight: 800;
          transition: transform 180ms ease, background 180ms ease;
        }
        .journal-featured button:hover {
          transform: translateY(-2px);
          background: var(--journal-accent);
        }
        .journal-section-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 20px;
        }
        .journal-section-head h2 {
          margin: 0;
          color: #fff;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.05;
        }
        .journal-section-head p {
          margin: 0;
          color: var(--journal-muted);
          font-size: 15px;
        }
        .journal-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .journal-latest-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 20px;
          align-items: start;
        }
        .journal-grid.is-short {
          grid-template-columns: repeat(auto-fit, minmax(280px, 430px));
        }
        .journal-editor-note {
          position: sticky;
          top: 96px;
          border: 1px solid var(--journal-line);
          border-radius: 8px;
          background:
            linear-gradient(180deg, rgba(25, 217, 255, 0.1), rgba(7, 20, 48, 0.72)),
            rgba(7, 20, 48, 0.72);
          padding: 20px;
        }
        .journal-editor-note h3 {
          margin: 0 0 10px;
          color: #fff;
          font-size: 22px;
          line-height: 1.1;
        }
        .journal-editor-note p {
          margin: 0 0 18px;
          color: #b8c8e8;
          line-height: 1.65;
          font-size: 14px;
        }
        .journal-note-list {
          display: grid;
          gap: 10px;
        }
        .journal-note-list button {
          width: 100%;
          min-height: 40px;
          border: 1px solid rgba(159, 178, 214, 0.2);
          border-radius: 8px;
          color: #dbe8ff;
          background: rgba(255,255,255,0.06);
          text-align: left;
          padding: 0 12px;
          cursor: pointer;
          text-transform: capitalize;
        }
        .journal-note-list button:hover {
          color: #021126;
          background: var(--journal-accent);
          border-color: var(--journal-accent);
        }
        .journal-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          overflow: hidden;
          border: 1px solid rgba(77, 150, 255, 0.2);
          border-radius: 8px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.045), transparent 34%),
            rgba(7, 20, 48, 0.72);
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
        }
        .journal-card:hover {
          transform: translateY(-5px);
          border-color: rgba(25, 217, 255, 0.55);
          background: rgba(10, 31, 70, 0.86);
          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.28);
        }
        .journal-card-image {
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #061126;
        }
        .journal-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 240ms ease;
        }
        .journal-card:hover img {
          transform: scale(1.035);
        }
        .journal-card-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 18px;
        }
        .journal-card-meta {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: var(--journal-accent);
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 12px;
          text-transform: capitalize;
        }
        .journal-card h3 {
          margin: 0 0 12px;
          color: #fff;
          font-size: 21px;
          line-height: 1.22;
        }
        .journal-card p {
          margin: 0;
          color: #b8c8e8;
          line-height: 1.65;
          font-size: 14px;
        }
        .journal-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          margin-top: auto;
          padding-top: 20px;
          color: var(--journal-muted);
          font-size: 13px;
        }
        .journal-card-footer button {
          min-height: 38px;
          padding: 0 14px;
          border-radius: 8px;
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          font-weight: 800;
        }
        .journal-card-footer button:hover {
          background: var(--journal-accent);
          color: #021126;
        }
        .journal-state {
          min-height: 280px;
          display: grid;
          place-items: center;
          border: 1px solid var(--journal-line);
          border-radius: 8px;
          background: rgba(7, 20, 48, 0.58);
          color: var(--journal-muted);
          text-align: center;
          padding: 28px;
        }
        .journal-state h3 {
          margin: 0 0 8px;
          color: #fff;
          font-size: 24px;
        }
        .journal-skeleton {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .journal-skeleton-card {
          height: 350px;
          border-radius: 8px;
          border: 1px solid rgba(77, 150, 255, 0.16);
          background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.11), rgba(255,255,255,0.05));
          background-size: 220% 100%;
          animation: journalPulse 1.2s ease-in-out infinite;
        }
        @keyframes journalPulse {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .journal-newsletter {
          margin-top: 70px;
          padding: 46px;
          border-top: 1px solid var(--journal-line);
          background: linear-gradient(90deg, rgba(25, 217, 255, 0.1), rgba(11, 99, 255, 0.08), transparent);
        }
        .journal-newsletter-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 460px);
          gap: 28px;
          align-items: center;
        }
        .journal-newsletter h2 {
          margin: 0 0 10px;
          color: #fff;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.05;
        }
        .journal-newsletter p {
          margin: 0;
          color: #bfd0ef;
          line-height: 1.7;
        }
        .journal-newsletter form {
          display: flex;
          gap: 10px;
        }
        .journal-newsletter input {
          min-width: 0;
          flex: 1;
          min-height: 52px;
          padding: 0 16px;
          border-radius: 8px;
          border: 1px solid rgba(159, 178, 214, 0.28);
          color: #fff;
          background: rgba(255, 255, 255, 0.07);
          outline: none;
        }
        .journal-newsletter input:focus {
          border-color: var(--journal-accent);
          box-shadow: 0 0 0 4px rgba(25, 217, 255, 0.11);
        }
        .journal-newsletter button {
          min-height: 52px;
          padding: 0 18px;
          border-radius: 8px;
          color: #021126;
          background: var(--journal-accent);
          font-weight: 900;
        }
        .journal-newsletter button:active,
        .journal-featured button:active,
        .journal-tabs button:active,
        .journal-card-footer button:active {
          transform: translateY(1px);
        }
        @media (prefers-reduced-motion: reduce) {
          .journal-card,
          .journal-card-image img,
          .journal-tabs button,
          .journal-featured button,
          .journal-skeleton-card {
            animation: none;
            transition: none;
          }
        }
        @media (max-width: 980px) {
          .journal-hero-grid,
          .journal-featured,
          .journal-newsletter-grid,
          .journal-latest-layout {
            grid-template-columns: 1fr;
          }
          .journal-issue-strip {
            grid-template-columns: 1fr;
          }
          .journal-grid,
          .journal-skeleton {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .journal-editor-note {
            position: static;
          }
          .journal-featured-media {
            min-height: 320px;
          }
        }
        @media (max-width: 640px) {
          body:has(.journal-page) .floating-buttons {
            display: none;
          }
          .journal-container {
            width: min(100% - 28px, 1180px);
          }
          .journal-breadcrumbs {
            padding-top: 92px;
          }
          .journal-hero {
            padding-top: 30px;
          }
          .journal-search-panel,
          .journal-newsletter {
            padding: 18px;
          }
          .journal-grid,
          .journal-skeleton {
            grid-template-columns: 1fr;
          }
          .journal-issue-cell {
            min-height: auto;
          }
          .journal-section-head {
            display: block;
          }
          .journal-section-head p {
            margin-top: 8px;
          }
          .journal-newsletter form {
            flex-direction: column;
          }
          .journal-newsletter button,
          .journal-featured button {
            width: 100%;
          }
        }
      `}</style>

      <nav className="journal-breadcrumbs">
        <div className="journal-container">
          <ol>
            <li><a href="/">{t.home}</a></li>
            <li>/</li>
            <li>{t.news}</li>
          </ol>
        </div>
      </nav>

      <section className="journal-hero">
        <div className="journal-container journal-hero-grid">
          <div>
            <span className="journal-eyebrow">{t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>

          <div className="journal-search-panel">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={t.search}
              aria-label={t.search}
            />
            <div className="journal-tabs">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={selectedCategory === category.id ? 'active' : ''}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.id === 'all' ? t.all : category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="journal-container">
        <section className="journal-issue-strip" aria-label={t.edition || 'Current issue'}>
          <div className="journal-issue-cell">
            <span>{t.edition || (language === 'vi' ? 'Số hiện tại' : 'Current issue')}</span>
            <strong>{leadArticle?.category || selectedCategory}</strong>
          </div>
          <div className="journal-issue-cell">
            <span>{t.showing || (language === 'vi' ? 'Đang hiển thị' : 'Showing')}</span>
            <strong>{articles.length}</strong>
          </div>
          <div className="journal-issue-cell">
            <span>{t.topics || (language === 'vi' ? 'Chủ đề' : 'Topics')}</span>
            <strong>{Math.max(categories.length - 1, 1)}</strong>
          </div>
        </section>

        {leadArticle && (
          <section className="journal-featured" aria-label={t.featured}>
            <div className={`journal-featured-media ${leadArticle.isLogoImage ? 'is-logo' : ''}`}>
              <img src={leadArticle.image} alt={leadArticle.title} />
            </div>
            <div className="journal-featured-copy">
              <span className="journal-label">{t.featured}</span>
              <h2>{leadArticle.title}</h2>
              <p>{leadArticle.excerpt}</p>
              <div className="journal-meta-row">
                <span>{leadArticle.category}</span>
                {leadArticle.dateLabel && <span>{leadArticle.dateLabel}</span>}
                <span>{leadArticle.readingTime} {t.minRead}</span>
              </div>
              <button type="button" onClick={() => navigate(`/news/${encodeURIComponent(leadArticle.slug)}`)}>
                {t.read}
              </button>
            </div>
          </section>
        )}

        <section>
          <div className="journal-section-head">
            <h2>{t.latest}</h2>
            <p>{error || `${articles.length} ${language === 'vi' ? 'bài viết' : 'articles'}`}</p>
          </div>

          {loading ? (
            <div className="journal-skeleton" aria-label={t.loading}>
              <div className="journal-skeleton-card"></div>
              <div className="journal-skeleton-card"></div>
              <div className="journal-skeleton-card"></div>
            </div>
          ) : gridArticles.length > 0 ? (
            <div className="journal-latest-layout">
              <div className={`journal-grid ${gridArticles.length <= 2 ? 'is-short' : ''}`}>
                {gridArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    language={language}
                    onOpen={(slug) => navigate(`/news/${encodeURIComponent(slug)}`)}
                  />
                ))}
              </div>
              <aside className="journal-editor-note">
                <h3>{t.editorNote || (language === 'vi' ? 'Ghi chú biên tập' : 'From the desk')}</h3>
                <p>{t.editorNoteBody || (language === 'vi' ? 'Những tín hiệu đáng chú ý về tăng trưởng, nội dung và thương mại.' : 'A tighter read on the signals we are watching across growth, content, systems, and commerce.')}</p>
                <div className="journal-note-list">
                  {categories.slice(0, 5).map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.id === 'all' ? t.all : category.label}
                    </button>
                  ))}
                </div>
              </aside>
            </div>
          ) : (
            <div className="journal-state">
              <div>
                <h3>{t.noResults}</h3>
                <p>{error || t.noResultsBody}</p>
              </div>
            </div>
          )}
        </section>
      </main>

      <section className="journal-newsletter">
        <div className="journal-container journal-newsletter-grid">
          <div>
            <h2>{t.newsletterTitle}</h2>
            <p>{t.newsletterBody}</p>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder={t.email} aria-label={t.email} required />
            <button type="submit">{t.subscribe}</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default News;
