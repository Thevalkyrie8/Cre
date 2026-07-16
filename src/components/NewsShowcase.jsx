import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFeaturedNews, getNews, resolveAssetUrl } from '../api/client';
import { getNewsSlug, unwrapNewsList } from '../utils/newsSlug';

const getLanguage = () => {
  try { return localStorage.getItem('language') || 'en'; } catch { return 'en'; }
};

const text = {
  en: {
    subtitle: 'for smarter growth',
    description: 'Practical perspectives across marketing, automation, commerce, creative production, and technology.',
    search: 'Search articles or topics', all: 'All topics', current: 'Current issue', showing: 'Showing', topics: 'Topics', covered: 'covered', article: 'article', articles: 'articles', featured: 'Featured', read: 'Read article', latest: 'Latest articles', viewAll: 'View all articles', empty: 'No articles found', emptyBody: 'Try a different keyword or category.', browse: 'Browse topics', newsletter: 'Get the next signal', newsletterBody: 'Fresh Unitrux insights, useful frameworks, and launch notes in your inbox.', email: 'Your email', subscribe: 'Subscribe', loading: 'Curating the journal…', error: 'The journal could not be loaded right now.', retry: 'Try again', min: 'min read', home: 'Home', journal: 'Journal'
  },
  vi: {
    subtitle: 'để tăng trưởng thông minh hơn',
    description: 'Góc nhìn thực tế về marketing, tự động hóa, thương mại, sản xuất sáng tạo và công nghệ.',
    search: 'Tìm bài viết hoặc chủ đề', all: 'Tất cả chủ đề', current: 'Ấn bản hiện tại', showing: 'Đang hiển thị', topics: 'Chủ đề', covered: 'được đề cập', article: 'bài viết', articles: 'bài viết', featured: 'Nổi bật', read: 'Đọc bài viết', latest: 'Bài viết mới nhất', viewAll: 'Xem tất cả', empty: 'Chưa tìm thấy bài viết', emptyBody: 'Hãy thử từ khóa hoặc chủ đề khác.', browse: 'Xem chủ đề', newsletter: 'Nhận tín hiệu tiếp theo', newsletterBody: 'Insight, framework và ghi chú mới từ Unitrux được gửi vào hộp thư của bạn.', email: 'Email của bạn', subscribe: 'Đăng ký', loading: 'Đang biên tập tạp chí…', error: 'Hiện chưa thể tải tạp chí.', retry: 'Thử lại', min: 'phút đọc', home: 'Trang chủ', journal: 'Tạp chí'
  }
};

const stripText = (value = '') => String(value).replace(/[#*_>`~[\]()]/g, '').replace(/\s+/g, ' ').trim();
const readingTime = (value = '') => Math.max(1, Math.ceil(stripText(value).split(' ').filter(Boolean).length / 200));
const formatDate = (value, language) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const normalizeArticle = (item, language) => {
  const title = language === 'vi' ? item.titleVi || item.title : item.title || item.titleVi;
  const content = language === 'vi' ? item.contentVi || item.content : item.content || item.contentVi;
  const excerptSource = language === 'vi' ? item.excerptVi || item.excerpt || content : item.excerpt || item.excerptVi || content;
  const excerpt = stripText(excerptSource).slice(0, 180);
  return {
    id: item.id || getNewsSlug(item), slug: getNewsSlug(item), title: title || 'Untitled',
    category: item.category || 'Business', excerpt: excerpt.length === 180 ? `${excerpt}…` : excerpt,
    image: resolveAssetUrl(item.image, '/logo.jpg'), date: item.createdAt || item.updatedAt || item.date,
    dateLabel: formatDate(item.createdAt || item.updatedAt || item.date, language),
    minutes: readingTime(content || excerptSource), isLogo: !item.image || String(item.image).toLowerCase().includes('logo')
  };
};

const HeroArtwork = () => (
  <div className="journal-artwork tw-relative tw-h-[18rem] tw-overflow-hidden tw-rounded-bl-[3rem] md:tw-h-[24rem] lg:tw-h-[31rem] lg:tw-rounded-bl-[4rem]">
    <div className="tw-absolute tw-bottom-12 tw-left-8 tw-h-[23rem] tw-w-[20rem] tw-rounded-t-full tw-bg-[#E8E0D2] tw-shadow-inner" />
    <div className="tw-absolute tw-bottom-12 tw-left-2 tw-h-5 tw-w-[94%] tw-rounded-full tw-bg-[#8B6541] tw-shadow-[0_18px_25px_-16px_rgba(51,34,17,.65)]" />
    <div className="tw-absolute tw-bottom-16 tw-left-11 tw-h-36 tw-w-14 tw-rounded-t-full tw-bg-[#C9BDA9] tw-shadow-[inset_-8px_-6px_16px_rgba(79,61,42,.18)]"><span className="tw-absolute -tw-left-5 tw-top-1 tw-h-12 tw-w-24 tw-rounded-t-full tw-bg-[#D8CCBA]" /></div>
    <div className="tw-absolute tw-bottom-[4.25rem] tw-left-36 tw-h-11 tw-w-12 tw-rounded-b-xl tw-bg-[#EFE8DB] tw-shadow-md"><span className="tw-absolute -tw-right-4 tw-top-2 tw-h-6 tw-w-6 tw-rounded-full tw-border-[3px] tw-border-[#EFE8DB]" /></div>
    <div className="tw-absolute tw-bottom-16 tw-right-12 tw-h-10 tw-w-40 -tw-rotate-2 tw-rounded tw-bg-[#B4A58E] tw-shadow-lg" />
    <svg viewBox="0 0 360 500" className="tw-absolute tw-bottom-9 tw-right-4 tw-h-[30rem] tw-w-[22rem]" fill="none" aria-hidden="true">
      <path d="M205 472C210 360 206 255 228 112M213 390c-50-69-76-130-86-198M218 318c41-57 63-109 72-171" stroke="#173E33" strokeWidth="9" strokeLinecap="round"/>
      <g fill="#244F3C"><ellipse cx="151" cy="320" rx="62" ry="23" transform="rotate(32 151 320)"/><ellipse cx="255" cy="274" rx="70" ry="25" transform="rotate(-35 255 274)"/><ellipse cx="126" cy="222" rx="66" ry="23" transform="rotate(34 126 222)"/><ellipse cx="279" cy="178" rx="64" ry="22" transform="rotate(-39 279 178)"/><ellipse cx="211" cy="120" rx="55" ry="20" transform="rotate(-77 211 120)"/></g>
    </svg>
    <div className="tw-absolute tw-right-7 tw-top-24 tw-grid tw-h-32 tw-w-32 tw-place-items-center tw-rounded-full tw-border tw-border-[#E68C23]/55 tw-bg-[#FAF8F5]/80 tw-text-center tw-backdrop-bl"><span className="tw-text-[.58rem] tw-font-black tw-uppercase tw-leading-5 tw-tracking-[.2em] tw-text-[#E68C23]">Unitrux Journal<br/><b className="tw-font-editorial tw-text-4xl tw-font-medium tw-text-[#E68C23]">U</b><br/>Ideas · Insights</span></div>
  </div>
);

const NewsSkeleton = () => <div className="tw-space-y-6"><div className="tw-h-[36rem] tw-animate-pulse tw-rounded-[2rem] tw-bg-[#E9E1D5]"/><div className="tw-grid tw-gap-5 md:tw-grid-cols-2"><div className="tw-h-72 tw-animate-pulse tw-rounded-[1.5rem] tw-bg-[#E9E1D5]"/><div className="tw-h-72 tw-animate-pulse tw-rounded-[1.5rem] tw-bg-[#E9E1D5]"/></div></div>;

const NewsShowcase = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(getLanguage);
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');
  const t = text[language] || text.en;

  useEffect(() => {
    const change = (event) => setLanguage(event.detail?.language || getLanguage());
    window.addEventListener('languageChange', change);
    return () => window.removeEventListener('languageChange', change);
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true); setError('');
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
    const needle = query.trim().toLowerCase();
    return matchesCategory && (!needle || `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(needle));
  }), [articles, category, query]);
  const latestWithoutFeatured = filtered.filter((article) => article.slug !== featured?.slug);
  const latest = latestWithoutFeatured.length ? latestWithoutFeatured : filtered;

  const subscribe = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    setNewsletterStatus(String(email || '').includes('@') ? 'success' : 'error');
  };

  return (
    <div className="journal-light-page tw-overflow-hidden tw-bg-[#FAF8F5] tw-text-[#263B35]">
      <section className="tw-relative tw-pb-16 tw-pt-32 sm:tw-pt-40">
        <div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[radial-gradient(circle_at_12%_16%,rgba(230,140,35,.08),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(13,94,77,.08),transparent_25%)]" />
        <div className="tw-relative tw-mx-auto tw-w-[min(78rem,calc(100%_-_2rem))]">
          <div className="tw-grid tw-gap-8 md:tw-grid-cols-12 md:tw-items-center lg:tw-gap-10">
            <header className="md:tw-col-span-6" data-reveal>
              <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3"><nav className="tw-flex tw-items-center tw-gap-2 tw-text-xs tw-font-bold tw-text-[#597067]"><Link to="/" className="tw-text-[#0D5E4D] tw-no-underline">{t.home}</Link><span>›</span><span>{t.journal}</span></nav>{!loading && <span className="tw-rounded-full tw-border tw-border-[#0D5E4D]/14 tw-bg-[#FEF7EA] tw-px-3 tw-py-1.5 tw-text-[.62rem] tw-font-black tw-uppercase tw-tracking-[.14em] tw-text-[#0D5E4D]">{articles.length} {articles.length === 1 ? t.article : t.articles} live</span>}</div>
              <h1 data-title-reveal className="master-title tw-mb-0 tw-mt-8 tw-font-editorial tw-text-[clamp(3.9rem,7.5vw,8.2rem)] tw-font-medium tw-leading-[.76] tw-tracking-[-.055em] tw-text-[#123E33]">Ideas,<br/>insights <em className="tw-font-normal tw-text-[#E68C23]">&amp;</em><br/>field notes</h1>
              <p className="tw-mb-0 tw-mt-6 tw-font-editorial tw-text-4xl tw-font-medium tw-italic tw-text-[#17483B]">{t.subtitle}</p>
              <p className="tw-mb-0 tw-mt-6 tw-max-w-lg tw-text-sm tw-leading-7 tw-text-[#536A61]">{t.description}</p>
            </header>
            <div className="md:tw-col-span-6" data-reveal><HeroArtwork /></div>
          </div>

          <div className="tw-mt-8 tw-flex tw-flex-col tw-gap-3 lg:tw-flex-row" data-reveal>
            <label className="tw-flex tw-min-h-12 tw-flex-1 tw-items-center tw-gap-3 tw-rounded-full tw-border tw-border-[#0D5E4D]/15 tw-bg-[#FEF7EA] tw-px-5"><svg viewBox="0 0 24 24" className="tw-h-4 tw-w-4 tw-text-[#0D5E4D]" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} className="tw-w-full tw-border-0 tw-bg-transparent tw-text-sm tw-text-[#263B35] tw-outline-none" /></label>
            <div className="tw-flex tw-flex-wrap tw-gap-2"><button type="button" onClick={() => setCategory('all')} className={`tw-rounded-full tw-border tw-px-5 tw-text-xs tw-font-bold tw-transition ${category === 'all' ? 'tw-border-[#0D5E4D] tw-bg-[#0D5E4D] tw-text-[#FFF9F1]' : 'tw-border-[#0D5E4D]/15 tw-bg-[#FEF7EA] tw-text-[#405B52] hover:tw-border-[#E68C23]'}`}>{t.all}</button>{categories.slice(0, 4).map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`tw-rounded-full tw-border tw-px-5 tw-text-xs tw-font-bold tw-transition ${category === item ? 'tw-border-[#0D5E4D] tw-bg-[#0D5E4D] tw-text-[#FFF9F1]' : 'tw-border-[#0D5E4D]/15 tw-bg-[#FEF7EA] tw-text-[#405B52] hover:tw-border-[#E68C23]'}`}>{item}</button>)}</div>
          </div>
        </div>
      </section>

      <main className="tw-mx-auto tw-w-[min(78rem,calc(100%_-_2rem))] tw-pb-28">
        {loading ? <NewsSkeleton /> : error ? <div className="tw-rounded-[2rem] tw-border tw-border-[#A94F21]/20 tw-bg-[#FEF7EA] tw-p-10 tw-text-center"><h2 className="tw-font-editorial tw-text-4xl tw-text-[#0D5E4D]">{error}</h2><button type="button" onClick={() => window.location.reload()} className="tw-rounded-full tw-border tw-border-[#0D5E4D] tw-bg-transparent tw-px-5 tw-py-3 tw-font-bold tw-text-[#0D5E4D]">{t.retry}</button></div> : <>
          <section>
            <div className="tw-grid tw-overflow-hidden tw-rounded-tl-[1.8rem] tw-rounded-br-[4rem] tw-bg-[#0D3F32] tw-px-8 tw-py-7 tw-text-[#FFF9F1] sm:tw-grid-cols-3"><div><span className="tw-text-[.62rem] tw-font-bold tw-uppercase tw-tracking-[.16em] tw-text-[#BFD4CB]">{t.current}</span><strong className="tw-mt-2 tw-block tw-font-editorial tw-text-4xl">{category === 'all' ? (featured?.category || 'Journal') : category}</strong></div><div><span className="tw-text-[.62rem] tw-font-bold tw-uppercase tw-tracking-[.16em] tw-text-[#BFD4CB]">{t.showing}</span><strong className="tw-mt-2 tw-block tw-font-editorial tw-text-4xl">{filtered.length} <i className="tw-font-sans tw-text-xs tw-font-normal">{filtered.length === 1 ? t.article : t.articles}</i></strong></div><div><span className="tw-text-[.62rem] tw-font-bold tw-uppercase tw-tracking-[.16em] tw-text-[#BFD4CB]">{t.topics}</span><strong className="tw-mt-2 tw-block tw-font-editorial tw-text-4xl">{categories.length} <i className="tw-font-sans tw-text-xs tw-font-normal">{t.covered}</i></strong></div></div>
            {featured && (category === 'all' || featured.category === category) && !query && <article className="tw-grid tw-overflow-hidden tw-rounded-b-[1.5rem] tw-border tw-border-[#0D5E4D]/12 tw-bg-[#FEF7EA] lg:tw-grid-cols-[1.08fr_.92fr]"><div className={`tw-min-h-[27rem] tw-overflow-hidden ${featured.isLogo ? 'tw-bg-[#F2EBDD] tw-p-14' : ''}`}><img src={featured.image} alt={featured.title} className={`tw-h-full tw-w-full ${featured.isLogo ? 'tw-object-contain tw-mix-blend-multiply' : 'tw-object-cover'}`} /></div><div className="tw-flex tw-flex-col tw-justify-center tw-p-8 sm:tw-p-12"><span className="tw-text-[.63rem] tw-font-black tw-uppercase tw-tracking-[.18em] tw-text-[#E68C23]">{t.featured}</span><h2 className="tw-mb-0 tw-mt-8 tw-font-editorial tw-text-5xl tw-font-medium tw-leading-[.92] tw-text-[#0D5E4D]">{featured.title}</h2><p className="tw-mb-0 tw-mt-6 tw-text-sm tw-leading-7 tw-text-[#536A61]">{featured.excerpt}</p><div className="tw-mt-6 tw-flex tw-flex-wrap tw-gap-2 tw-text-xs tw-text-[#61756F]"><span>{featured.category}</span><span>•</span><span>{featured.dateLabel}</span><span>•</span><span>{featured.minutes} {t.min}</span></div><button type="button" data-magnetic data-ripple onClick={() => navigate(`/news/${featured.slug}`)} className="master-magnetic tw-relative tw-mt-8 tw-flex tw-w-fit tw-items-center tw-gap-8 tw-overflow-hidden tw-rounded-full tw-border-0 tw-bg-[#0D5E4D] tw-px-6 tw-py-3 tw-text-sm tw-font-bold tw-text-[#FFF9F1]">{t.read}<span>→</span></button></div></article>}
          </section>

          <section className="tw-pt-24">
            <header className="tw-flex tw-items-end tw-gap-5"><h2 className="tw-m-0 tw-font-editorial tw-text-6xl tw-font-medium tw-leading-[.85] tw-text-[#0D5E4D]">{t.latest}</h2><span className="tw-mb-2 tw-h-px tw-flex-1 tw-bg-[#0D5E4D]/20"/><button type="button" onClick={() => { setCategory('all'); setQuery(''); }} className="tw-mb-[-.2rem] tw-border-0 tw-bg-transparent tw-text-xs tw-font-bold tw-text-[#536A61]">{t.viewAll} →</button></header>
            {latest.length ? <div className="tw-mt-10 tw-grid tw-gap-5 lg:tw-grid-cols-12">{latest.map((article, index) => <Link key={article.id} to={`/news/${article.slug}`} className={`tw-group tw-grid tw-overflow-hidden tw-rounded-[1.6rem] tw-border tw-border-[#0D5E4D]/12 tw-bg-[#FEF7EA] tw-text-inherit tw-no-underline tw-transition tw-duration-500 hover:-tw-translate-y-2 hover:tw-border-[#E68C23]/50 hover:tw-shadow-[0_32px_70px_-50px_rgba(13,94,77,.55)] ${index % 3 === 0 ? 'lg:tw-col-span-7 sm:tw-grid-cols-[.9fr_1.1fr]' : 'lg:tw-col-span-5'}`}><div className={`tw-h-56 tw-overflow-hidden ${article.isLogo ? 'tw-bg-[#F2EBDD] tw-p-8' : ''}`}><img src={article.image} alt={article.title} loading="lazy" className={`tw-h-full tw-w-full tw-transition tw-duration-700 group-hover:tw-scale-[1.04] ${article.isLogo ? 'tw-object-contain tw-mix-blend-multiply' : 'tw-object-cover'}`}/></div><div className="tw-flex tw-flex-col tw-p-6"><span className="tw-text-[.62rem] tw-font-black tw-uppercase tw-tracking-[.16em] tw-text-[#E68C23]">{article.category}</span><h3 className="tw-mb-0 tw-mt-5 tw-font-editorial tw-text-3xl tw-font-medium tw-leading-[.95] tw-text-[#0D5E4D]">{article.title}</h3><p className="tw-mb-0 tw-mt-4 tw-line-clamp-3 tw-text-sm tw-leading-6 tw-text-[#5A6F67]">{article.excerpt}</p><span className="tw-mt-auto tw-pt-6 tw-text-xs tw-font-bold tw-text-[#536A61]">{article.dateLabel} · {article.minutes} {t.min}</span></div></Link>)}</div> : <div className="tw-mt-10 tw-grid tw-overflow-hidden tw-rounded-[1.7rem] tw-border tw-border-[#0D5E4D]/12 tw-bg-[#FEF7EA] sm:tw-grid-cols-2"><div className="tw-relative tw-min-h-72 tw-bg-[radial-gradient(circle_at_60%_40%,#0D5E4D_0_12%,transparent_12.5%),linear-gradient(135deg,#E9E0D2,#F7F0E5)]"><span className="tw-absolute tw-left-1/2 tw-top-1/2 tw-h-28 tw-w-28 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-rounded-full tw-border-[10px] tw-border-[#263B35]"/><span className="tw-absolute tw-left-[58%] tw-top-[61%] tw-h-24 tw-w-3 -tw-rotate-45 tw-rounded-full tw-bg-[#263B35]"/></div><div className="tw-flex tw-flex-col tw-items-start tw-justify-center tw-p-10"><h3 className="tw-m-0 tw-font-editorial tw-text-4xl tw-text-[#0D5E4D]">{t.empty}</h3><p className="tw-mb-0 tw-mt-4 tw-text-sm tw-text-[#536A61]">{t.emptyBody}</p><button type="button" onClick={() => { setCategory('all'); setQuery(''); }} className="tw-mt-7 tw-rounded-full tw-border tw-border-[#0D5E4D]/25 tw-bg-transparent tw-px-5 tw-py-3 tw-text-xs tw-font-bold tw-text-[#0D5E4D]">{t.browse} →</button></div></div>}
          </section>
        </>}
      </main>

      <section className="journal-newsletter tw-relative tw-overflow-hidden tw-bg-[#0D3F32] tw-py-20 tw-text-[#FFF9F1]" data-reveal><div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-bg-[radial-gradient(circle_at_88%_80%,rgba(230,140,35,.2),transparent_27%)]"/><div className="tw-relative tw-mx-auto tw-grid tw-w-[min(78rem,calc(100%_-_2rem))] tw-gap-10 lg:tw-grid-cols-[.8fr_1.2fr] lg:tw-items-center"><div><h2 className="tw-m-0 tw-font-editorial tw-text-6xl tw-font-medium tw-leading-[.86]">{t.newsletter}</h2><p className="tw-mb-0 tw-mt-5 tw-max-w-md tw-text-sm tw-leading-7 tw-text-[#C8D9D1]">{t.newsletterBody}</p></div><form onSubmit={subscribe} className="tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row"><input type="email" name="email" placeholder={t.email} className="tw-min-h-14 tw-flex-1 tw-rounded-xl tw-border tw-border-[#FFF9F1]/20 tw-bg-[#FFF9F1] tw-px-5 tw-text-[#263B35] tw-outline-none focus:tw-border-[#E68C23]"/><button type="submit" data-magnetic data-ripple className="master-magnetic tw-relative tw-overflow-hidden tw-rounded-xl tw-border-0 tw-bg-[#E68C23] tw-px-7 tw-font-bold tw-text-[#FFF9F1]">{t.subscribe} →</button>{newsletterStatus === 'success' && <span className="tw-self-center tw-text-xs tw-text-[#F5BC72]">Thank you.</span>}{newsletterStatus === 'error' && <span className="tw-self-center tw-text-xs tw-text-[#F5BC72]">Enter a valid email.</span>}</form></div></section>
    </div>
  );
};

export default NewsShowcase;
