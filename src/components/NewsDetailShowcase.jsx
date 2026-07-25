import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getNews, getNewsById, resolveAssetUrl } from '../api/client';
import { getLocalizedNewsFields, getNewsSlug, getStoredLanguage, isNewsUuid, unwrapNewsList } from '../utils/newsSlug';
import { trackEvent } from '../analytics/tracking';

const copy = {
  en: { home: 'Home', news: 'News', back: 'Back to news', loading: 'Preparing the article…', error: 'This article could not be loaded.', note: 'About this article', noteBody: '', standards: 'Editorial standards', published: 'Published', updated: 'Updated', min: 'min read', keep: 'Keep reading', trend: 'Trend watch' },
  vi: { home: 'Trang chủ', news: 'Tin tức', back: 'Quay lại tin tức', loading: 'Đang chuẩn bị bài viết…', error: 'Không thể tải bài viết này.', note: 'Về bài viết này', noteBody: '', standards: 'Tiêu chuẩn biên tập', published: 'Xuất bản', updated: 'Cập nhật', min: 'phút đọc', keep: 'Đọc tiếp', trend: 'Theo dõi xu hướng' }
};

const stripMarkdown = (value = '') => String(value).replace(/[#*_>`~[\]()]/g, '').replace(/\s+/g, ' ').trim();
const normalizeUnicode = (value = '') => String(value).normalize('NFC');
const readingTime = (value = '') => Math.max(1, Math.ceil(stripMarkdown(value).split(' ').filter(Boolean).length / 200));
const formatDate = (value, language) => {
  const date = new Date(value || '');
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const toIsoDate = (value) => {
  const date = new Date(value || '');
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
};

const normalizeArticle = (article, language) => {
  const localized = getLocalizedNewsFields(article, language);
  const title = normalizeUnicode(localized.title);
  const content = normalizeUnicode(localized.content);
  const excerpt = normalizeUnicode(localized.excerpt);
  return {
    ...article, title: title || 'Untitled', content: content || '', excerpt: stripMarkdown(excerpt || ''),
    slug: getNewsSlug(article), category: article.category || 'Business', author: article.author || 'Unitrux Team',
    image: resolveAssetUrl(article.image, '/logo.jpg'), dateLabel: formatDate(article.createdAt || article.updatedAt, language),
    publishedLabel: formatDate(article.createdAt, language), updatedLabel: formatDate(article.updatedAt, language),
    datePublished: toIsoDate(article.createdAt), dateModified: toIsoDate(article.updatedAt || article.createdAt),
    minutes: readingTime(content || excerpt), number: String(article.sortOrder || article.viewCount || 1).padStart(3, '0')
  };
};

const BotanicalDrawing = () => (
  <svg viewBox="0 0 320 300" className="tw-h-full tw-w-full" fill="none" aria-hidden="true">
    <path d="M176 292c-8-88 23-176 74-257M174 252c-45-38-67-82-74-132M192 202c47-27 75-62 91-105M151 182c-39-19-68-50-87-91" stroke="#345D50" strokeOpacity=".34" strokeWidth="2"/>
    <g fill="#5B786E" fillOpacity=".2" stroke="#345D50" strokeOpacity=".25"><ellipse cx="116" cy="208" rx="45" ry="16" transform="rotate(39 116 208)"/><ellipse cx="222" cy="177" rx="48" ry="16" transform="rotate(-37 222 177)"/><ellipse cx="83" cy="120" rx="42" ry="14" transform="rotate(43 83 120)"/><ellipse cx="270" cy="91" rx="39" ry="13" transform="rotate(-49 270 91)"/><ellipse cx="245" cy="44" rx="34" ry="12" transform="rotate(-67 245 44)"/></g>
    <g stroke="#B77A2B" strokeOpacity=".42"><circle cx="205" cy="132" r="18"/><path d="m205 114 5 18-5 18-5-18 5-18ZM187 132h36"/></g>
  </svg>
);

const NewsDetailShowcase = () => {
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(getStoredLanguage);
  const [rawArticle, setRawArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const t = copy[language] || copy.en;
  const article = useMemo(() => rawArticle ? normalizeArticle(rawArticle, language) : null, [rawArticle, language]);

  useEffect(() => {
    const change = (event) => setLanguage(event.detail?.language === 'vi' ? 'vi' : 'en');
    const syncAcrossTabs = (event) => {
      if (event.key === 'language') setLanguage(event.newValue === 'vi' ? 'vi' : 'en');
    };
    window.addEventListener('languageChange', change);
    window.addEventListener('storage', syncAcrossTabs);
    return () => {
      window.removeEventListener('languageChange', change);
      window.removeEventListener('storage', syncAcrossTabs);
    };
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true); setError('');
    const load = async () => {
      try {
        let list = [];
        let result;
        if (isNewsUuid(routeId)) result = await getNewsById(routeId, { lang: language });
        else {
          list = unwrapNewsList(await getNews({ lang: language }));
          result = list.find((item) => getNewsSlug(item) === routeId);
          if (!result) result = await getNewsById(routeId, { lang: language });
        }
        if (!result) throw new Error('Not found');
        if (!active) return;
        setRawArticle(result);
        const canonical = getNewsSlug(result);
        if (canonical !== routeId) navigate(`/news/${canonical}`, { replace: true });
        if (!list.length) list = unwrapNewsList(await getNews({ lang: language, category: result.category }));
        if (active) setRelated(list.filter((item) => item.id !== result.id).slice(0, 3).map((item) => normalizeArticle(item, language)));
      } catch {
        if (active) setError(t.error);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [routeId, language, navigate, t.error]);

  useEffect(() => {
    if (!article) return;
    trackEvent('view_content', { content_type: 'article', content_id: article.slug, content_name: article.title });
    window.dispatchEvent(new CustomEvent('seo:article', {
      detail: {
        path: `/news/${article.slug}`,
        title: article.title,
        description: (article.excerpt || stripMarkdown(article.content)).slice(0, 180),
        image: article.image,
        author: article.author,
        articleSection: article.category,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        language,
      },
    }));
  }, [article, language]);

  if (loading) return <div className="tw-min-h-screen tw-bg-[#FAF8F5] tw-px-4 tw-pb-24 tw-pt-40"><div className="tw-mx-auto tw-w-[min(74rem,100%)] tw-space-y-7"><div className="tw-h-10 tw-w-48 tw-animate-pulse tw-rounded-full tw-bg-[#E9E1D5]"/><div className="tw-h-44 tw-max-w-4xl tw-animate-pulse tw-rounded-[2rem] tw-bg-[#E9E1D5]"/><div className="tw-h-[34rem] tw-animate-pulse tw-rounded-[2rem] tw-bg-[#E9E1D5]"/><p className="tw-text-sm tw-text-[#61756F]">{t.loading}</p></div></div>;
  if (error || !article) return <div className="tw-grid tw-min-h-screen tw-place-items-center tw-bg-[#FAF8F5] tw-p-6"><div className="tw-rounded-[2rem] tw-border tw-border-[#0D5E4D]/15 tw-bg-[#FEF7EA] tw-p-10 tw-text-center"><h1 className="tw-font-editorial tw-text-5xl tw-text-[#0D5E4D]">{error || t.error}</h1><Link to="/news" className="tw-mt-5 tw-inline-block tw-rounded-full tw-bg-[#0D5E4D] tw-px-6 tw-py-3 tw-font-bold tw-text-[#FFF9F1] tw-no-underline">{t.back}</Link></div></div>;

  return (
    <article className="theme-synced-page news-detail-light tw-overflow-hidden tw-bg-[#FAF8F5] tw-text-[#263B35]">
      <header className="tw-relative tw-isolate tw-pb-14 tw-pt-36 sm:tw-pt-44">
        <div className="tw-pointer-events-none tw-absolute tw-inset-0 -tw-z-10 tw-bg-[radial-gradient(circle_at_12%_12%,rgba(230,140,35,.07),transparent_24%),radial-gradient(circle_at_80%_26%,rgba(13,94,77,.07),transparent_22%)]"/>
        <div className="tw-mx-auto tw-grid tw-w-[min(76rem,calc(100%_-_2rem))] tw-gap-8 lg:tw-grid-cols-12">
          <div className="lg:tw-col-span-10" data-reveal>
            <nav className="tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-text-xs tw-font-semibold tw-text-[#61756F]"><Link to="/" className="tw-text-[#0D5E4D] tw-no-underline">{t.home}</Link><span>/</span><Link to="/news" className="tw-text-[#0D5E4D] tw-no-underline">{t.news}</Link><span>/</span><span>{article.category}</span></nav>
            <div className="tw-mt-12 tw-flex tw-items-center tw-gap-3 tw-text-[.7rem] tw-font-black tw-uppercase tw-tracking-[.2em] tw-text-[#C5751E]"><span>{article.category}</span><span>•</span><span>{article.dateLabel}</span></div>
            <h1 data-title-reveal className="master-title news-detail-title tw-mb-0 tw-mt-7 tw-max-w-[68rem] tw-text-[#0D4537]">{article.title}</h1>
            {article.excerpt && <p className="tw-mb-0 tw-mt-8 tw-max-w-3xl tw-text-lg tw-leading-8 tw-text-[#536A61]">{article.excerpt}</p>}
            <div className="tw-mt-7 tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-text-sm tw-text-[#315248]"><span className="tw-grid tw-h-8 tw-w-8 tw-place-items-center tw-rounded-full tw-bg-[#0D5E4D] tw-font-editorial tw-text-[#F5BC72]">U.</span><Link to="/content-standards#editorial-process" className="tw-font-bold tw-text-[#315248] tw-underline-offset-4 hover:tw-underline">{article.author}</Link><span className="tw-h-5 tw-w-px tw-bg-[#0D5E4D]/25"/><span>◷&nbsp; {article.minutes} {t.min}</span></div>
          </div>
          <aside className="tw-relative tw-hidden lg:tw-col-span-2 lg:tw-block"><div className="tw-absolute -tw-right-[8rem] -tw-top-44 tw-h-[34rem] tw-w-[15rem] tw-bg-[#0D4537] tw-px-8 tw-pt-40 tw-text-[#F5BC72]"><span className="tw-text-[.6rem] tw-font-black tw-uppercase tw-tracking-[.2em]">Article No.</span><strong className="tw-mt-4 tw-block tw-font-editorial tw-text-5xl tw-font-medium">{article.number}</strong><i className="tw-mt-4 tw-block tw-h-px tw-w-12 tw-bg-[#F5BC72]"/></div><div className="tw-absolute -tw-left-14 tw-top-0 tw-h-72 tw-w-72 tw-opacity-80"><BotanicalDrawing/></div></aside>
        </div>
      </header>

      <figure className="tw-mx-auto tw-mb-14 tw-mt-0 tw-w-[min(76rem,calc(100%_-_2rem))] tw-overflow-hidden tw-rounded-2xl tw-bg-[#0B2035]" data-reveal>
        <img
          src={article.image}
          alt={article.title}
          width="1600"
          height="900"
          fetchPriority="high"
          decoding="async"
          className="tw-block tw-h-auto tw-w-full"
        />
      </figure>

      <section className="tw-relative tw-mx-auto tw-grid tw-w-[min(76rem,calc(100%_-_2rem))] tw-gap-8 tw-pb-28 lg:tw-grid-cols-12">
        <aside className="editor-note-paper tw-relative tw-z-20 tw-self-start tw-bg-[#FEF7EA] tw-p-7 tw-shadow-[0_30px_65px_-45px_rgba(13,69,55,.6)] lg:tw-col-span-3" data-reveal>
          <span className="tw-absolute -tw-top-5 tw-left-7 tw-h-12 tw-w-3 tw-rotate-[-8deg] tw-rounded-full tw-border-2 tw-border-[#C58A2F]"/>
          <h2 className="tw-mb-0 tw-mt-4 tw-font-editorial tw-text-3xl tw-font-medium tw-italic tw-text-[#0D4537]">{t.note}</h2><i className="tw-mt-5 tw-block tw-h-0.5 tw-w-8 tw-bg-[#E68C23]"/><p className="tw-mb-0 tw-mt-6 tw-font-editorial tw-text-lg tw-leading-8 tw-text-[#4D625A]">{t.noteBody}</p>
          <dl className="tw-mb-0 tw-mt-9 tw-space-y-4 tw-text-xs tw-text-[#526860]"><div className="tw-flex tw-gap-3"><dt>▱</dt><dd className="tw-m-0">{article.category}</dd></div>{article.publishedLabel && <div className="tw-flex tw-gap-3"><dt>▦</dt><dd className="tw-m-0">{t.published}: <time dateTime={article.datePublished}>{article.publishedLabel}</time></dd></div>}{article.updatedLabel && article.dateModified !== article.datePublished && <div className="tw-flex tw-gap-3"><dt>↻</dt><dd className="tw-m-0">{t.updated}: <time dateTime={article.dateModified}>{article.updatedLabel}</time></dd></div>}<div className="tw-flex tw-gap-3"><dt>◷</dt><dd className="tw-m-0">{article.minutes} {t.min}</dd></div></dl>
          <Link to="/content-standards#editorial-process" className="tw-mt-7 tw-inline-flex tw-font-bold tw-text-[#0D5E4D] tw-underline-offset-4 hover:tw-underline">{t.standards} →</Link>
          <Link to="/news" className="tw-mt-9 tw-inline-flex tw-items-center tw-gap-3 tw-font-bold tw-text-[#C5751E] tw-no-underline">← {t.back}</Link>
        </aside>
        <div className="tw-relative tw-pt-16 lg:tw-col-span-7 lg:tw-col-start-5 lg:tw-pt-14" data-reveal><div className="article-editorial-body"><ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown></div></div>
        <aside className="tw-hidden tw-pt-20 lg:tw-col-span-2 lg:tw-block"><span className="tw-text-[.62rem] tw-font-black tw-uppercase tw-tracking-[.18em] tw-text-[#C5751E]">{t.trend}</span><div className="tw-mt-4 tw-grid tw-h-28 tw-w-28 tw-place-items-center tw-rounded-full tw-border tw-border-[#C58A2F] tw-font-editorial tw-text-xl tw-text-[#0D4537]">{new Date(article.createdAt || Date.now()).getFullYear()} →</div></aside>
      </section>

      {related.length > 0 && <section className="tw-border-t tw-border-[#0D5E4D]/10 tw-bg-[#F1EBE2] tw-py-20"><div className="tw-mx-auto tw-w-[min(76rem,calc(100%_-_2rem))]"><h2 className="tw-m-0 tw-font-editorial tw-text-5xl tw-font-medium tw-text-[#0D4537]">{t.keep}</h2><div className="tw-mt-9 tw-grid tw-gap-5 md:tw-grid-cols-3">{related.map((item) => <Link key={item.id} to={`/news/${item.slug}`} className="tw-group tw-overflow-hidden tw-rounded-[1.4rem] tw-border tw-border-[#0D5E4D]/12 tw-bg-[#FEF7EA] tw-text-inherit tw-no-underline"><img src={item.image} alt={item.title} width="800" height="450" loading="lazy" decoding="async" className="tw-h-48 tw-w-full tw-object-cover tw-transition tw-duration-700 group-hover:tw-scale-105"/><div className="tw-p-5"><span className="tw-text-[.62rem] tw-font-black tw-uppercase tw-tracking-[.15em] tw-text-[#E68C23]">{item.category}</span><h3 className="tw-mb-0 tw-mt-4 tw-font-editorial tw-text-2xl tw-font-medium tw-leading-none tw-text-[#0D4537]">{item.title}</h3></div></Link>)}</div></div></section>}
    </article>
  );
};

export default NewsDetailShowcase;
