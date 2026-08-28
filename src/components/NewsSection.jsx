import { useEffect, useState } from 'react';
import { getFeaturedNews } from '../api/client';
import NewsCard from './NewsCard';
import { getLocalizedNewsFields, getNewsSlug, getStoredLanguage, unwrapNewsList } from '../utils/newsSlug';

const copy = {
  en: {
    eyebrow: 'Ideas · Work · Perspective', title: 'News & Insights', viewAll: 'View all stories',
    loading: 'Loading news', errorTitle: 'Stories are taking a little longer.',
    errorBody: 'We could not load the latest stories right now. Please try again.', retry: 'Try again',
    empty: 'No stories have been published yet.', untitled: 'Untitled article', fallbackAuthor: 'Unitrux Editorial',
  },
  vi: {
    eyebrow: 'Ý tưởng · Công việc · Góc nhìn', title: 'Tin tức & Góc nhìn', viewAll: 'Xem tất cả bài viết',
    loading: 'Đang tải tin tức', errorTitle: 'Tin tức đang tải lâu hơn dự kiến.',
    errorBody: 'Hiện chưa thể tải các bài viết mới nhất. Vui lòng thử lại.', retry: 'Thử lại',
    empty: 'Chưa có bài viết nào được xuất bản.', untitled: 'Bài viết chưa có tiêu đề', fallbackAuthor: 'Ban biên tập Unitrux',
  },
};

const stripMarkup = (value = '') =>
  String(value)
    .normalize('NFC')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_>`~[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const formatDate = (value, language) => {
  if (!value) return { dateTime: '', dateLabel: '' };

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { dateTime: '', dateLabel: String(value) };
  }

  return {
    dateTime: date.toISOString(),
    dateLabel: new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date),
  };
};

const normalizeArticle = (item, index, language) => {
  const t = copy[language] || copy.en;
  const localized = getLocalizedNewsFields(item, language);
  const rawAuthor = item?.author;
  const author = typeof rawAuthor === 'object' && rawAuthor !== null
    ? rawAuthor
    : { name: rawAuthor || item?.authorName || t.fallbackAuthor };
  const sourceText = localized.excerpt || item?.summary || item?.description || localized.content;
  const excerpt = stripMarkup(sourceText).slice(0, 210);
  const date = formatDate(item?.date || item?.publishedAt || item?.createdAt || item?.updatedAt, language);

  return {
    id: item?.id || item?.slug || `news-${index}`,
    slug: getNewsSlug(item),
    category: String(item?.category?.name || item?.category || item?.type || 'Insights').normalize('NFC'),
    title: String(localized.title || item?.name || t.untitled).normalize('NFC'),
    excerpt: excerpt.length === 210 ? `${excerpt}…` : excerpt,
    author: {
      name: String(author.name || t.fallbackAuthor).normalize('NFC'),
      avatar: author.avatar || author.avatarUrl || item?.authorAvatar || '',
    },
    image: item?.image?.url || item?.image || item?.coverImage || item?.thumbnail || '',
    ...date,
  };
};

const NewsSkeleton = ({ label }) => (
  <div className="tw-grid tw-auto-rows-fr tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-12" role="status" aria-label={label}>
    {[0, 1, 2, 3].map((index) => (
      <div
        key={index}
        className={`tw-overflow-hidden tw-rounded-[1.4rem] tw-border tw-border-white/[0.08] tw-bg-white/[0.04] ${
          index === 0 ? 'lg:tw-col-span-6 lg:tw-row-span-2' : index === 3 ? 'lg:tw-col-span-6' : 'lg:tw-col-span-3'
        }`}
      >
        <div className={`tw-animate-pulse tw-bg-white/[0.07] ${index === 0 ? 'tw-h-80' : 'tw-h-48'}`} />
        <div className="tw-space-y-3 tw-p-5">
          <div className="tw-h-3 tw-w-20 tw-animate-pulse tw-rounded tw-bg-white/10" />
          <div className="tw-h-6 tw-w-11/12 tw-animate-pulse tw-rounded tw-bg-white/10" />
          <div className="tw-h-4 tw-w-3/4 tw-animate-pulse tw-rounded tw-bg-white/[0.07]" />
          <div className="tw-mt-6 tw-h-9 tw-w-36 tw-animate-pulse tw-rounded-full tw-bg-white/[0.07]" />
        </div>
      </div>
    ))}
    <span className="tw-sr-only">{label}</span>
  </div>
);

const NewsSection = ({ compact = false }) => {
  const [language, setLanguage] = useState(getStoredLanguage);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestKey, setRequestKey] = useState(0);
  const t = copy[language] || copy.en;

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
    let isActive = true;

    const loadNews = async () => {
      setLoading(true);
      setError('');

      try {
        const payload = await getFeaturedNews({ lang: language });
        const nextArticles = unwrapNewsList(payload)
          .filter((item) => item?.isFeatured === true || item?.featured === true)
          .slice(0, 4)
          .map((item, index) => normalizeArticle(item, index, language));

        if (!isActive) return;
        setArticles(nextArticles);
      } catch (requestError) {
        if (!isActive) return;
        console.error('Unable to load News & Insights:', requestError);
        setError(t.errorBody);
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadNews();
    return () => {
      isActive = false;
    };
  }, [language, requestKey, t.errorBody]);

  return (
    <section
      aria-labelledby={compact ? undefined : 'news-insights-title'}
      aria-label={compact ? t.title : undefined}
      className="news-insights-section tw-relative tw-isolate tw-overflow-hidden tw-bg-[var(--u-dark)] tw-pb-24 tw-pt-8 sm:tw-pb-28 sm:tw-pt-10"
    >
      <div className="tw-pointer-events-none tw-absolute tw-inset-0 -tw-z-10 tw-bg-[radial-gradient(circle_at_14%_18%,color-mix(in_srgb,var(--u-accent)_10%,transparent),transparent_28%),radial-gradient(circle_at_88%_76%,color-mix(in_srgb,var(--u-secondary)_10%,transparent),transparent_31%)]" />
      <div className="tw-pointer-events-none tw-absolute tw-inset-0 -tw-z-10 tw-opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="tw-mx-auto tw-w-[min(100%-2rem,76rem)]">
        {!compact && <header className="tw-mb-9 tw-flex tw-items-end tw-justify-between tw-gap-6">
          <div>
            <p className="tw-mb-3 tw-text-[0.68rem] tw-font-bold tw-uppercase tw-tracking-[0.28em] tw-text-sky-300/90">
              {t.eyebrow}
            </p>
            <h2 id="news-insights-title" className="tw-m-0 tw-font-editorial tw-text-4xl tw-font-semibold tw-leading-none tw-tracking-[-0.035em] tw-text-white sm:tw-text-5xl">
              {t.title}
            </h2>
          </div>
          <a href="/news" className="tw-hidden tw-items-center tw-gap-2 tw-text-sm tw-font-semibold tw-text-slate-300 tw-no-underline tw-transition-colors hover:tw-text-sky-200 sm:tw-flex">
            {t.viewAll} <span aria-hidden="true">↗</span>
          </a>
        </header>}

        {loading ? (
          <NewsSkeleton label={t.loading} />
        ) : error ? (
          <div className="tw-rounded-[1.4rem] tw-border tw-border-rose-300/15 tw-bg-white/[0.045] tw-px-6 tw-py-12 tw-text-center tw-backdrop-blur-xl">
            <h3 className="tw-m-0 tw-font-editorial tw-text-2xl tw-font-semibold tw-text-white">{t.errorTitle}</h3>
            <p className="tw-mx-auto tw-mt-2 tw-max-w-lg tw-text-sm tw-leading-6 tw-text-slate-400">{error}</p>
            <button
              type="button"
              onClick={() => setRequestKey((key) => key + 1)}
              className="tw-mt-5 tw-cursor-pointer tw-rounded-full tw-border tw-border-sky-300/25 tw-bg-sky-300/10 tw-px-5 tw-py-2.5 tw-text-sm tw-font-semibold tw-text-sky-100 tw-transition hover:tw-bg-sky-300/20"
            >
              {t.retry}
            </button>
          </div>
        ) : articles.length > 0 ? (
          <div className="tw-grid tw-auto-rows-fr tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-12">
            {articles.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="tw-rounded-[1.4rem] tw-border tw-border-white/10 tw-bg-white/[0.045] tw-px-6 tw-py-12 tw-text-center tw-text-sm tw-text-slate-400">
            {t.empty}
          </div>
        )}

        <a href="/news" className="tw-mt-7 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-text-sm tw-font-semibold tw-text-slate-300 tw-no-underline sm:tw-hidden">
          {t.viewAll} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
};

export default NewsSection;
