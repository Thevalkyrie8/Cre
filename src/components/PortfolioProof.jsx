import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    src: '/product-commercial-ads.mp4',
    titleEn: 'Product commercial',
    titleVi: 'Video quảng cáo sản phẩm',
    typeEn: 'Creative & paid media asset',
    typeVi: 'Nội dung sáng tạo & quảng cáo',
  },
  {
    src: '/video-commercial.mp4',
    titleEn: 'Brand campaign',
    titleVi: 'Chiến dịch thương hiệu',
    typeEn: 'Campaign storytelling',
    typeVi: 'Kể chuyện chiến dịch',
  },
  {
    src: '/Ls-ad.mp4',
    titleEn: 'Performance creative',
    titleVi: 'Nội dung tối ưu hiệu suất',
    typeEn: 'Social advertising',
    typeVi: 'Quảng cáo mạng xã hội',
  },
  {
    src: '/fan.mp4',
    titleEn: 'Short-form content',
    titleVi: 'Nội dung video ngắn',
    typeEn: 'Audience engagement',
    typeVi: 'Tương tác khách hàng',
  },
];

const DeferredVideo = ({ project, featured = false }) => {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '240px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;

    const playback = videoRef.current.play();
    if (playback) playback.catch(() => undefined);
  }, [shouldLoad]);

  return (
    <article className={`proof-project${featured ? ' proof-project--featured' : ''}`} ref={frameRef}>
      <div className="proof-project__media">
        {hasError ? (
          <div className="proof-project__fallback">
            <span data-en="Preview unavailable" data-vi="Chưa thể tải bản xem trước">Preview unavailable</span>
          </div>
        ) : shouldLoad ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/logo.jpg"
            onCanPlay={(event) => event.currentTarget.play().catch(() => undefined)}
            onError={() => setHasError(true)}
            aria-label={project.titleEn}
          >
            <source src={project.src} type="video/mp4" />
          </video>
        ) : (
          <div className="proof-project__placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="proof-project__caption">
        <h3 data-en={project.titleEn} data-vi={project.titleVi}>{project.titleEn}</h3>
        <p data-en={project.typeEn} data-vi={project.typeVi}>{project.typeEn}</p>
      </div>
    </article>
  );
};

const PortfolioProof = () => (
  <section id="selected-work" className="portfolio-proof" aria-labelledby="portfolio-proof-title">
    <div className="home-shell">
      <header className="portfolio-proof__header">
        <div>
          <p className="home-kicker" data-en="Selected creative work" data-vi="Một số sản phẩm sáng tạo">Selected creative work</p>
          <h2 id="portfolio-proof-title" data-en="See the craft. Add the business context next." data-vi="Xem chất lượng thực thi. Case study thực tế sẽ được bổ sung tiếp theo.">
            See the craft. Add the business context next.
          </h2>
        </div>
        <p data-en="These are production samples from Unitrux. We keep the proof honest: no invented outcomes, no borrowed metrics." data-vi="Đây là các sản phẩm do Unitrux thực hiện. Chúng tôi trình bày đúng những gì đang có: không dựng kết quả, không dùng số liệu vay mượn.">
          These are production samples from Unitrux. We keep the proof honest: no invented outcomes, no borrowed metrics.
        </p>
      </header>

      <div className="portfolio-proof__layout">
        <DeferredVideo project={projects[0]} featured />
        <div className="portfolio-proof__rail">
          {projects.slice(1).map((project) => <DeferredVideo key={project.src} project={project} />)}
        </div>
      </div>
    </div>
  </section>
);

export default PortfolioProof;
