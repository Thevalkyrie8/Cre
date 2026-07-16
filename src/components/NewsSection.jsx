import { useEffect, useState } from 'react';
import { getNews } from '../api/client';
import NewsCard from './NewsCard';
import { getNewsSlug, unwrapNewsList } from '../utils/newsSlug';

const stripMarkup = (value = '') =>
  String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_>`~[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const formatDate = (value) => {
  if (!value) return { dateTime: '', dateLabel: '' };

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { dateTime: '', dateLabel: String(value) };
  }

  return {
    dateTime: date.toISOString(),
    dateLabel: new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date),
  };
};

const normalizeArticle = (item, index) => {
  const rawAuthor = item?.author;
  const author = typeof rawAuthor === 'object' && rawAuthor !== null
    ? rawAuthor
    : { name: rawAuthor || item?.authorName || 'Unitrux Editorial' };
  const sourceText = item?.excerpt || item?.summary || item?.description || item?.content || '';
  const excerpt = stripMarkup(sourceText).slice(0, 210);
  const date = formatDate(item?.date || item?.publishedAt || item?.createdAt || item?.updatedAt);

  return {
    id: item?.id || item?.slug || `news-${index}`,
    slug: getNewsSlug(item),
    category: item?.category?.name || item?.category || item?.type || 'Insights',
    title: item?.title || item?.name || 'Untitled article',
    excerpt: excerpt.length === 210 ? `${excerpt}…` : excerpt,
    author: {
      name: author.name || 'Unitrux Editorial',
      avatar: author.avatar || author.avatarUrl || item?.authorAvatar || '',
    },
    image: item?.image?.url || item?.image || item?.coverImage || item?.thumbnail || '',
    ...date,
  };
};

const NewsSkeleton = () => (
  <div className="tw-grid tw-auto-rows-fr tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-12" role="status" aria-label="Loading news">
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
    <span className="tw-sr-only">Loading news and insights…</span>
  </div>
);

const NewsSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadNews = async () => {
      setLoading(true);
      setError('');

      try {
        const payload = await getNews();
        const nextArticles = unwrapNewsList(payload)
          .slice(0, 4)
          .map(normalizeArticle);

        if (!isActive) return;
        setArticles(nextArticles);
      } catch (requestError) {
        if (!isActive) return;
        console.error('Unable to load News & Insights:', requestError);
        setError('We could not load the latest stories right now. Please try again.');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadNews();
    return () => {
      isActive = false;
    };
  }, [requestKey]);

  return (
    <section
      aria-labelledby="news-insights-title"
      className="news-insights-section tw-relative tw-isolate tw-overflow-hidden tw-bg-[#090b10] tw-pb-24 tw-pt-8 sm:tw-pb-28 sm:tw-pt-10"
    >
      <div className="tw-pointer-events-none tw-absolute tw-inset-0 -tw-z-10 tw-bg-[radial-gradient(circle_at_14%_18%,rgba(56,189,248,0.10),transparent_28%),radial-gradient(circle_at_88%_76%,rgba(99,102,241,0.10),transparent_31%)]" />
      <div className="tw-pointer-events-none tw-absolute tw-inset-0 -tw-z-10 tw-opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="tw-mx-auto tw-w-[min(100%-2rem,76rem)]">
        <header className="tw-mb-9 tw-flex tw-items-end tw-justify-between tw-gap-6">
          <div>
            <p className="tw-mb-3 tw-text-[0.68rem] tw-font-bold tw-uppercase tw-tracking-[0.28em] tw-text-sky-300/90">
              Ideas · Work · Perspective
            </p>
            <h2 id="news-insights-title" className="tw-m-0 tw-font-editorial tw-text-4xl tw-font-semibold tw-leading-none tw-tracking-[-0.035em] tw-text-white sm:tw-text-5xl">
              News &amp; Insights
            </h2>
          </div>
          <a href="/news" className="tw-hidden tw-items-center tw-gap-2 tw-text-sm tw-font-semibold tw-text-slate-300 tw-no-underline tw-transition-colors hover:tw-text-sky-200 sm:tw-flex">
            View all stories <span aria-hidden="true">↗</span>
          </a>
        </header>

        {loading ? (
          <NewsSkeleton />
        ) : error ? (
          <div className="tw-rounded-[1.4rem] tw-border tw-border-rose-300/15 tw-bg-white/[0.045] tw-px-6 tw-py-12 tw-text-center tw-backdrop-blur-xl">
            <h3 className="tw-m-0 tw-font-editorial tw-text-2xl tw-font-semibold tw-text-white">Stories are taking a little longer.</h3>
            <p className="tw-mx-auto tw-mt-2 tw-max-w-lg tw-text-sm tw-leading-6 tw-text-slate-400">{error}</p>
            <button
              type="button"
              onClick={() => setRequestKey((key) => key + 1)}
              className="tw-mt-5 tw-cursor-pointer tw-rounded-full tw-border tw-border-sky-300/25 tw-bg-sky-300/10 tw-px-5 tw-py-2.5 tw-text-sm tw-font-semibold tw-text-sky-100 tw-transition hover:tw-bg-sky-300/20"
            >
              Try again
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
            No stories have been published yet.
          </div>
        )}

        <a href="/news" className="tw-mt-7 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-text-sm tw-font-semibold tw-text-slate-300 tw-no-underline sm:tw-hidden">
          View all stories <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
};

export default NewsSection;
