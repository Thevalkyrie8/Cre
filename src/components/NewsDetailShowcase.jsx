import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getNews, getNewsById, getSeoMetadata, resolveAssetUrl } from '../api/client';
import { getLocalizedNewsFields, getNewsSlug, getStoredLanguage, isNewsUuid, unwrapNewsList } from '../utils/newsSlug';
import { services as unitruxServices } from '../data/services';
import { trackEvent } from '../analytics/tracking';
import { articleMarkdownComponents } from '../utils/markdownComponents';
import { buildToc, createHeadingSlugger, dedupeHeadings, shouldShowToc } from '../utils/articleToc';
import { truncateAtWordBoundary } from '../utils/text';

const copy = {
  en: { home: 'Home', news: 'News', back: 'Back to news', loading: 'Preparing the article…', error: 'This article could not be loaded.', note: 'About this article', noteBody: '', standards: 'Editorial standards', published: 'Published', updated: 'Updated', min: 'min read', keep: 'Keep reading', trend: 'Trend watch', relatedServices: 'Related services' },
  vi: { home: 'Trang chủ', news: 'Tin tức', back: 'Quay lại tin tức', loading: 'Đang chuẩn bị bài viết…', error: 'Không thể tải bài viết này.', note: 'Về bài viết này', noteBody: '', standards: 'Tiêu chuẩn biên tập', published: 'Xuất bản', updated: 'Cập nhật', min: 'phút đọc', keep: 'Đọc tiếp', trend: 'Theo dõi xu hướng', relatedServices: 'Dịch vụ liên quan' }
};

const stripMarkdown = (value = '') => String(value).replace(/[#*_>`~[\]()]/g, '').replace(/\s+/g, ' ').trim();
const normalizeUnicode = (value = '') => String(value).normalize('NFC');
const normalizeTags = (value) => {
  const tags = Array.isArray(value)
    ? value
    : String(value || '').split(',');

  return [...new Set(tags
    .map((tag) => normalizeUnicode(tag).trim().replace(/^#+/, ''))
    .filter(Boolean))];
};
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

const normalizeAuthor = (value) => {
  if (value && typeof value === 'object') {
    return { name: normalizeUnicode(value.name || 'Unitrux Team'), bio: normalizeUnicode(value.bio || ''), avatarUrl: value.avatarUrl || '' };
  }
  return { name: normalizeUnicode(value || 'Unitrux Team'), bio: '', avatarUrl: '' };
};

const normalizeArticle = (article, language) => {
  const localized = getLocalizedNewsFields(article, language);
  const title = normalizeUnicode(localized.title);
  const content = normalizeUnicode(localized.content);
  const excerpt = normalizeUnicode(localized.excerpt);
  return {
    ...article, title: title || 'Untitled', content: content || '', excerpt: stripMarkdown(excerpt || ''),
    slug: getNewsSlug(article), category: article.category || 'Business', author: normalizeAuthor(article.author),
    tags: normalizeTags(article.tags),
    image: resolveAssetUrl(article.image, '/logo.jpg'), dateLabel: formatDate(article.createdAt || article.updatedAt, language),
    publishedLabel: formatDate(article.createdAt, language), updatedLabel: formatDate(article.updatedAt, language),
    datePublished: toIsoDate(article.createdAt), dateModified: toIsoDate(article.updatedAt || article.createdAt),
    minutes: readingTime(content || excerpt), number: String(article.sortOrder || article.viewCount || 1).padStart(3, '0')
  };
};

const BotanicalDrawing = () => (
  <svg viewBox="0 0 320 300" className="tw-h-full tw-w-full" fill="none" aria-hidden="true">
    <path d="M176 292c-8-88 23-176 74-257M174 252c-45-38-67-82-74-132M192 202c47-27 75-62 91-105M151 182c-39-19-68-50-87-91" stroke="var(--u-ink)" strokeOpacity=".34" strokeWidth="2"/>
    <g fill="var(--u-dark-muted)" fillOpacity=".2" stroke="var(--u-ink)" strokeOpacity=".25"><ellipse cx="116" cy="208" rx="45" ry="16" transform="rotate(39 116 208)"/><ellipse cx="222" cy="177" rx="48" ry="16" transform="rotate(-37 222 177)"/><ellipse cx="83" cy="120" rx="42" ry="14" transform="rotate(43 83 120)"/><ellipse cx="270" cy="91" rx="39" ry="13" transform="rotate(-49 270 91)"/><ellipse cx="245" cy="44" rx="34" ry="12" transform="rotate(-67 245 44)"/></g>
    <g stroke="var(--u-accent)" strokeOpacity=".42"><circle cx="205" cy="132" r="18"/><path d="m205 114 5 18-5 18-5-18 5-18ZM187 132h36"/></g>
  </svg>
);

const NewsDetailShowcase = () => {
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(getStoredLanguage);
  const [rawArticle, setRawArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tocEnabled, setTocEnabled] = useState(null);
  const bodyRef = useRef(null);
  const t = copy[language] || copy.en;
  const article = useMemo(() => rawArticle ? normalizeArticle(rawArticle, language) : null, [rawArticle, language]);
  const toc = useMemo(() => dedupeHeadings(buildToc(article?.content || '')), [article?.content]);
  const showToc = shouldShowToc(tocEnabled, toc);

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

        const relatedArticleIds = Array.isArray(result.relatedArticleIds) ? result.relatedArticleIds : [];
        let relatedItems = [];
        if (relatedArticleIds.length) {
          const fetched = await Promise.all(relatedArticleIds.map((relatedId) => getNewsById(relatedId, { lang: language }).catch(() => null)));
          relatedItems = fetched.filter(Boolean);
        }
        if (!relatedItems.length) {
          if (!list.length) list = unwrapNewsList(await getNews({ lang: language, category: result.category }));
          relatedItems = list.filter((item) => item.id !== result.id);
        }
        if (active) setRelated(relatedItems.slice(0, 3).map((item) => normalizeArticle(item, language)));

        const relatedServiceIds = Array.isArray(result.relatedServiceIds) ? result.relatedServiceIds : [];
        if (active) {
          setRelatedServices(unitruxServices.filter((service) => relatedServiceIds.includes(service.to)));
        }
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
        description: truncateAtWordBoundary(article.excerpt || stripMarkdown(article.content), 160),
        image: article.image,
        author: article.author?.name,
        articleSection: article.category,
        keywords: article.tags,
        content: article.content,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        language,
      },
    }));
  }, [article, language]);

  // Whether the CMS turned the table of contents on for this article.
  useEffect(() => {
    const id = rawArticle?.id;
    if (!id) return undefined;
    let active = true;
    setTocEnabled(null);
    getSeoMetadata({ entityType: 'news', entityRef: id }).then((rows) => {
      if (!active) return;
      const row =
        rows.find((r) => r.locale === language) ||
        rows.find((r) => r.locale === '*') ||
        rows[0];
      setTocEnabled(row && typeof row.tocEnabled === 'boolean' ? row.tocEnabled : null);
    });
    return () => {
      active = false;
    };
  }, [rawArticle?.id, language]);

  // Give the rendered headings stable ids so the TOC (and #hash links) can jump
  // to them. Uses the same de-duping slugger as buildToc().
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const slug = createHeadingSlugger();
    el.querySelectorAll('h2, h3').forEach((heading) => {
      heading.id = slug(heading.textContent || '');
    });
  }, [article?.content]);

  const scrollToHeading = (slug) => (event) => {
    const target = bodyRef.current?.querySelector(`#${CSS.escape(slug)}`);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.history?.replaceState) {
      window.history.replaceState(null, '', `#${slug}`);
    }
  };

  if (loading) return <div className="tw-min-h-screen tw-bg-[var(--u-surface)] tw-px-4 tw-pb-24 tw-pt-40"><div className="tw-mx-auto tw-w-[min(74rem,100%)] tw-space-y-7"><div className="tw-h-10 tw-w-48 tw-animate-pulse tw-rounded-full tw-bg-[var(--u-subtle)]"/><div className="tw-h-44 tw-max-w-4xl tw-animate-pulse tw-rounded-[2rem] tw-bg-[var(--u-subtle)]"/><div className="tw-h-[34rem] tw-animate-pulse tw-rounded-[2rem] tw-bg-[var(--u-subtle)]"/><p className="tw-text-sm tw-text-[var(--u-subtle)]">{t.loading}</p></div></div>;
  if (error || !article) return <div className="tw-grid tw-min-h-screen tw-place-items-center tw-bg-[var(--u-surface)] tw-p-6"><div className="tw-rounded-[2rem] tw-border tw-border-[color-mix(in_srgb,var(--u-accent)_15%,transparent)] tw-bg-[var(--u-line)] tw-p-10 tw-text-center"><h1 className="tw-font-editorial tw-text-5xl tw-text-[var(--u-accent)]">{error || t.error}</h1><Link to="/news" className="tw-mt-5 tw-inline-block tw-rounded-full tw-bg-[var(--u-accent)] tw-px-6 tw-py-3 tw-font-bold tw-text-[var(--u-surface)] tw-no-underline">{t.back}</Link></div></div>;

  return (
    <article className="theme-synced-page news-detail-light tw-overflow-hidden tw-bg-[var(--u-surface)] tw-text-[var(--u-dark)]">
      <header className="tw-relative tw-isolate tw-pb-14 tw-pt-36 sm:tw-pt-44">
        <div className="tw-pointer-events-none tw-absolute tw-inset-0 -tw-z-10 tw-bg-[radial-gradient(circle_at_12%_12%,color-mix(in_srgb,var(--u-secondary)_7%,transparent),transparent_24%),radial-gradient(circle_at_80%_26%,color-mix(in_srgb,var(--u-accent)_7%,transparent),transparent_22%)]"/>
        <div className="tw-mx-auto tw-grid tw-w-[min(76rem,calc(100%_-_2rem))] tw-gap-8 lg:tw-grid-cols-12">
          <div className="lg:tw-col-span-10" data-reveal>
            <nav className="tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-text-xs tw-font-semibold tw-text-[var(--u-subtle)]"><Link to="/" className="tw-text-[var(--u-accent)] tw-no-underline">{t.home}</Link><span>/</span><Link to="/news" className="tw-text-[var(--u-accent)] tw-no-underline">{t.news}</Link><span>/</span><span>{article.category}</span></nav>
            <div className="tw-mt-12 tw-flex tw-items-center tw-gap-3 tw-text-[.7rem] tw-font-black tw-uppercase tw-tracking-[.2em] tw-text-[var(--u-secondary)]"><span>{article.category}</span><span>•</span><span>{article.dateLabel}</span></div>
            <h1 data-title-reveal className="master-title news-detail-title tw-mb-0 tw-mt-7 tw-max-w-[68rem] tw-text-[var(--u-dark)]">{article.title}</h1>
            {article.excerpt && <p className="tw-mb-0 tw-mt-8 tw-max-w-3xl tw-text-lg tw-leading-8 tw-text-[var(--u-dark-muted)]">{article.excerpt}</p>}
            <div className="tw-mt-7 tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-text-sm tw-text-[var(--u-subtle)]">
              {article.author.avatarUrl ? (
                <img src={resolveAssetUrl(article.author.avatarUrl, '')} alt={article.author.name} className="tw-h-8 tw-w-8 tw-rounded-full tw-border tw-border-[color-mix(in_srgb,var(--u-accent)_20%,transparent)] tw-object-cover"/>
              ) : (
                <span className="tw-grid tw-h-8 tw-w-8 tw-place-items-center tw-rounded-full tw-bg-[var(--u-accent)] tw-font-editorial tw-text-[var(--u-subtle)]">{article.author.name.charAt(0).toUpperCase()}.</span>
              )}
              <span className="tw-flex tw-flex-col tw-leading-tight">
                <Link to="/content-standards#editorial-process" className="tw-font-bold tw-text-[var(--u-subtle)] tw-underline-offset-4 hover:tw-underline">{article.author.name}</Link>
                {article.author.bio && <span className="tw-text-xs tw-text-[var(--u-subtle)]">{article.author.bio}</span>}
              </span>
              <span className="tw-h-5 tw-w-px tw-bg-[color-mix(in_srgb,var(--u-accent)_25%,transparent)]"/><span>◷&nbsp; {article.minutes} {t.min}</span>
            </div>
            {article.tags.length > 0 && (
              <ul
                className="tw-mb-0 tw-mt-6 tw-flex tw-list-none tw-flex-wrap tw-gap-2 tw-p-0"
                aria-label={language === 'vi' ? 'Chủ đề bài viết' : 'Article topics'}
              >
                {article.tags.map((tag) => (
                  <li
                    key={tag}
                    className="tw-rounded-full tw-border tw-border-[color-mix(in_srgb,var(--u-accent)_25%,transparent)] tw-bg-[var(--u-line)] tw-px-3 tw-py-1.5 tw-text-xs tw-font-semibold tw-text-[var(--u-subtle)]"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside className="tw-relative tw-hidden lg:tw-col-span-2 lg:tw-block"><div className="tw-absolute -tw-right-[8rem] -tw-top-44 tw-h-[34rem] tw-w-[15rem] tw-bg-[var(--u-dark)] tw-px-8 tw-pt-40 tw-text-[var(--u-subtle)]"><span className="tw-text-[.6rem] tw-font-black tw-uppercase tw-tracking-[.2em]">Article No.</span><strong className="tw-mt-4 tw-block tw-font-editorial tw-text-5xl tw-font-medium">{article.number}</strong><i className="tw-mt-4 tw-block tw-h-px tw-w-12 tw-bg-[var(--u-subtle)]"/></div><div className="tw-absolute -tw-left-14 tw-top-0 tw-h-72 tw-w-72 tw-opacity-80"><BotanicalDrawing/></div></aside>
        </div>
      </header>

      <figure className="tw-mx-auto tw-mb-14 tw-mt-0 tw-w-[min(76rem,calc(100%_-_2rem))] tw-overflow-hidden tw-rounded-2xl tw-bg-[var(--u-dark)]" data-reveal>
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
        <aside className="editor-note-paper tw-relative tw-z-20 tw-self-start tw-bg-[var(--u-surface)] tw-p-7 tw-shadow-[0_30px_65px_-45px_rgb(from var(--u-dark) r g b / .6)] lg:tw-col-span-3" data-reveal>
          <span className="tw-absolute -tw-top-5 tw-left-7 tw-h-12 tw-w-3 tw-rotate-[-8deg] tw-rounded-full tw-border-2 tw-border-[var(--u-line)]"/>
          <h2 className="tw-mb-0 tw-mt-4 tw-font-editorial tw-text-3xl tw-font-medium tw-italic tw-text-[var(--u-dark)]">{t.note}</h2><i className="tw-mt-5 tw-block tw-h-0.5 tw-w-8 tw-bg-[var(--u-secondary)]"/><p className="tw-mb-0 tw-mt-6 tw-font-editorial tw-text-lg tw-leading-8 tw-text-[var(--u-subtle)]">{t.noteBody}</p>
          <dl className="tw-mb-0 tw-mt-9 tw-space-y-4 tw-text-xs tw-text-[var(--u-subtle)]"><div className="tw-flex tw-gap-3"><dt>▱</dt><dd className="tw-m-0">{article.category}</dd></div>{article.publishedLabel && <div className="tw-flex tw-gap-3"><dt>▦</dt><dd className="tw-m-0">{t.published}: <time dateTime={article.datePublished}>{article.publishedLabel}</time></dd></div>}{article.updatedLabel && article.dateModified !== article.datePublished && <div className="tw-flex tw-gap-3"><dt>↻</dt><dd className="tw-m-0">{t.updated}: <time dateTime={article.dateModified}>{article.updatedLabel}</time></dd></div>}<div className="tw-flex tw-gap-3"><dt>◷</dt><dd className="tw-m-0">{article.minutes} {t.min}</dd></div></dl>
          {showToc && toc.length > 0 && (
            <nav className="article-toc tw-mt-8" aria-label={language === 'vi' ? 'Mục lục' : 'Table of contents'}>
              <h2 className="tw-mb-3 tw-mt-0 tw-font-editorial tw-text-lg tw-font-medium tw-not-italic tw-text-[var(--u-dark)]">
                {language === 'vi' ? 'Mục lục' : 'On this page'}
              </h2>
              <ol className="tw-m-0 tw-list-none tw-space-y-1.5 tw-p-0 tw-text-sm">
                {toc.map((item) => (
                  <li key={item.slug} className={item.level === 3 ? 'tw-pl-4' : ''}>
                    <a
                      href={`#${item.slug}`}
                      onClick={scrollToHeading(item.slug)}
                      className="tw-text-[var(--u-subtle)] tw-no-underline hover:tw-text-[var(--u-accent)]"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <Link to="/content-standards#editorial-process" className="tw-mt-7 tw-inline-flex tw-font-bold tw-text-[var(--u-accent)] tw-underline-offset-4 hover:tw-underline">{t.standards} →</Link>
          <Link to="/news" className="tw-mt-9 tw-inline-flex tw-items-center tw-gap-3 tw-font-bold tw-text-[var(--u-secondary)] tw-no-underline">← {t.back}</Link>
        </aside>
        <div className="tw-relative tw-pt-16 lg:tw-col-span-7 lg:tw-col-start-5 lg:tw-pt-14" data-reveal><div className="article-editorial-body" ref={bodyRef}><ReactMarkdown remarkPlugins={[remarkGfm]} components={articleMarkdownComponents}>{article.content}</ReactMarkdown></div></div>
        <aside className="tw-hidden tw-pt-20 lg:tw-col-span-2 lg:tw-block"><span className="tw-text-[.62rem] tw-font-black tw-uppercase tw-tracking-[.18em] tw-text-[var(--u-secondary)]">{t.trend}</span><div className="tw-mt-4 tw-grid tw-h-28 tw-w-28 tw-place-items-center tw-rounded-full tw-border tw-border-[var(--u-line)] tw-font-editorial tw-text-xl tw-text-[var(--u-dark)]">{new Date(article.createdAt || Date.now()).getFullYear()} →</div></aside>
      </section>

      {related.length > 0 && <section className="tw-border-t tw-border-[color-mix(in_srgb,var(--u-accent)_10%,transparent)] tw-bg-[var(--u-line)] tw-py-20"><div className="tw-mx-auto tw-w-[min(76rem,calc(100%_-_2rem))]"><h2 className="tw-m-0 tw-font-editorial tw-text-5xl tw-font-medium tw-text-[var(--u-dark)]">{t.keep}</h2><div className="tw-mt-9 tw-grid tw-gap-5 md:tw-grid-cols-3">{related.map((item) => <Link key={item.id} to={`/news/${item.slug}`} className="tw-group tw-overflow-hidden tw-rounded-[1.4rem] tw-border tw-border-[color-mix(in_srgb,var(--u-accent)_12%,transparent)] tw-bg-[var(--u-line)] tw-text-inherit tw-no-underline"><img src={item.image} alt={item.title} width="800" height="450" loading="lazy" decoding="async" className="tw-h-48 tw-w-full tw-object-cover tw-transition tw-duration-700 group-hover:tw-scale-105"/><div className="tw-p-5"><span className="tw-text-[.62rem] tw-font-black tw-uppercase tw-tracking-[.15em] tw-text-[var(--u-secondary)]">{item.category}</span><h3 className="tw-mb-0 tw-mt-4 tw-font-editorial tw-text-2xl tw-font-medium tw-leading-none tw-text-[var(--u-dark)]">{item.title}</h3></div></Link>)}</div></div></section>}

      {relatedServices.length > 0 && <section className="tw-border-t tw-border-[color-mix(in_srgb,var(--u-accent)_10%,transparent)] tw-bg-[var(--u-line)] tw-py-16"><div className="tw-mx-auto tw-w-[min(76rem,calc(100%_-_2rem))]"><h2 className="tw-m-0 tw-font-editorial tw-text-4xl tw-font-medium tw-text-[var(--u-dark)]">{t.relatedServices}</h2><ul className="tw-mb-0 tw-mt-7 tw-flex tw-list-none tw-flex-wrap tw-gap-3 tw-p-0">{relatedServices.map((service) => <li key={service.to}><Link to={service.to} className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-[color-mix(in_srgb,var(--u-accent)_25%,transparent)] tw-bg-[var(--u-line)] tw-px-5 tw-py-2.5 tw-text-sm tw-font-semibold tw-text-[var(--u-dark)] tw-no-underline tw-transition hover:tw-border-[color-mix(in_srgb,var(--u-accent)_50%,transparent)]">{language === 'vi' && service.titleVi ? service.titleVi : service.title} →</Link></li>)}</ul></div></section>}
    </article>
  );
};

export default NewsDetailShowcase;
