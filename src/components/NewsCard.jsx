import { Link } from 'react-router-dom';
import { resolveAssetUrl } from '../api/client';

const cardLayouts = [
  'lg:tw-col-span-6 lg:tw-row-span-2',
  'lg:tw-col-span-3',
  'lg:tw-col-span-3',
  'lg:tw-col-span-6',
];

const getInitials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const NewsCard = ({ article, index = 0 }) => {
  const isLead = index === 0;
  const layout = cardLayouts[index] ?? 'lg:tw-col-span-3';
  const articleUrl = `/news/${encodeURIComponent(article.slug)}`;
  const imageUrl = resolveAssetUrl(article.image, '');
  const avatarUrl = resolveAssetUrl(article.author?.avatar, '');

  return (
    <article
      className={`news-insights-card tw-group tw-relative tw-isolate tw-flex tw-min-h-full tw-overflow-hidden tw-rounded-[1.4rem] tw-border tw-border-white/10 tw-bg-white/[0.055] tw-shadow-news-card tw-backdrop-blur-xl tw-transition tw-duration-300 hover:-tw-translate-y-1 hover:tw-border-sky-300/30 hover:tw-shadow-news-card-hover ${layout}`}
    >
      <div className="tw-pointer-events-none tw-absolute tw-inset-x-8 tw-top-0 tw-h-px tw-bg-gradient-to-r tw-from-transparent tw-via-white/35 tw-to-transparent" />

      <Link
        to={articleUrl}
        className={`tw-flex tw-w-full tw-flex-col tw-text-inherit tw-no-underline ${
          isLead ? 'lg:tw-grid lg:tw-grid-rows-[minmax(19rem,1.3fr)_auto]' : ''
        }`}
        aria-label={`Read: ${article.title}`}
      >
        <div
          className={`tw-relative tw-overflow-hidden tw-bg-slate-950 ${
            isLead
              ? 'tw-aspect-[16/10] lg:tw-aspect-auto lg:tw-min-h-[19rem]'
              : index === 3
                ? 'tw-aspect-[16/8]'
                : 'tw-aspect-[4/3]'
          }`}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={article.title}
              className="tw-h-full tw-w-full tw-object-cover tw-transition tw-duration-700 group-hover:tw-scale-[1.035]"
              loading={isLead ? 'eager' : 'lazy'}
            />
          ) : (
            <div className="tw-h-full tw-w-full tw-bg-[radial-gradient(circle_at_25%_20%,rgba(56,189,248,0.25),transparent_34%),linear-gradient(145deg,#111827,#05070c)]" />
          )}
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#080b12]/80 tw-via-transparent tw-to-white/[0.04]" />
          <span className="tw-absolute tw-bottom-4 tw-left-4 tw-rounded-full tw-border tw-border-white/15 tw-bg-[#080b12]/75 tw-px-3 tw-py-1 tw-text-[0.68rem] tw-font-bold tw-uppercase tw-tracking-[0.16em] tw-text-sky-100 tw-backdrop-blur-md">
            {article.category}
          </span>
        </div>

        <div className={`tw-flex tw-flex-1 tw-flex-col ${isLead ? 'tw-p-6 sm:tw-p-7' : 'tw-p-5'}`}>
          <h3
            className={`tw-m-0 tw-font-editorial tw-font-semibold tw-leading-[1.04] tw-tracking-[-0.025em] tw-text-white tw-transition-colors group-hover:tw-text-sky-100 ${
              isLead ? 'tw-text-[2rem] sm:tw-text-[2.45rem]' : 'tw-text-[1.55rem]'
            }`}
          >
            {article.title}
          </h3>

          {article.excerpt && (
            <p className={`tw-mt-3 tw-text-sm tw-leading-6 tw-text-slate-300/80 ${isLead ? 'tw-line-clamp-3' : 'tw-line-clamp-2'}`}>
              {article.excerpt}
            </p>
          )}

          <footer className="tw-mt-auto tw-flex tw-items-center tw-gap-3 tw-border-t tw-border-white/[0.08] tw-pt-5">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`Ảnh đại diện ${article.author?.name || 'Unitrux'}`}
                className="tw-h-9 tw-w-9 tw-shrink-0 tw-rounded-full tw-border tw-border-white/15 tw-object-cover"
                loading="lazy"
              />
            ) : (
              <span className="tw-grid tw-h-9 tw-w-9 tw-shrink-0 tw-place-items-center tw-rounded-full tw-border tw-border-sky-300/20 tw-bg-sky-400/10 tw-text-[0.68rem] tw-font-bold tw-text-sky-100">
                {getInitials(article.author?.name)}
              </span>
            )}
            <span className="tw-min-w-0">
              <span className="tw-block tw-truncate tw-text-xs tw-font-semibold tw-text-slate-100">
                {article.author?.name}
              </span>
              <time className="tw-mt-0.5 tw-block tw-text-[0.7rem] tw-text-slate-400" dateTime={article.dateTime}>
                {article.dateLabel}
              </time>
            </span>
            <span aria-hidden="true" className="tw-ml-auto tw-text-lg tw-text-sky-200/80 tw-transition-transform group-hover:tw-translate-x-1">
              ↗
            </span>
          </footer>
        </div>
      </Link>
    </article>
  );
};

export default NewsCard;
