import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const values = [
  {
    number: '01',
    value: '24/7',
    label: 'Support',
    labelVi: 'Hỗ trợ',
    description: 'A responsive team that stays close before, during, and after launch.',
    descriptionVi: 'Đội ngũ phản hồi nhanh, luôn đồng hành trước, trong và sau khi ra mắt.',
    layout: 'lg:tw-col-span-5 lg:tw-min-h-[19rem]',
    tone: 'tw-bg-[#FEF7EA]',
  },
  {
    number: '02',
    value: 'Fair',
    label: 'Price',
    labelVi: 'Chi phí',
    description: 'Clear scope and practical investment levels—without surprise additions.',
    descriptionVi: 'Phạm vi rõ ràng và mức đầu tư thực tế, không có chi phí bất ngờ.',
    layout: 'lg:tw-col-span-3 lg:tw-mt-16 lg:tw-min-h-[16rem]',
    tone: 'tw-bg-[#E7EFE9]',
  },
  {
    number: '03',
    value: 'Pro',
    label: 'Staff',
    labelVi: 'Đội ngũ',
    description: 'Cross-disciplinary specialists who understand both craft and commercial outcomes.',
    descriptionVi: 'Chuyên gia đa lĩnh vực, am hiểu cả chất lượng chuyên môn lẫn hiệu quả kinh doanh.',
    layout: 'lg:tw-col-span-4 lg:-tw-mt-7 lg:tw-min-h-[18rem]',
    tone: 'tw-bg-[#F5ECDE]',
  },
];

const services = [
  ['Conversion-focused websites', 'Website tối ưu chuyển đổi'],
  ['E-commerce operations', 'Vận hành thương mại điện tử'],
  ['Campaign reporting', 'Báo cáo chiến dịch'],
  ['Product photo & video', 'Hình ảnh và video sản phẩm'],
  ['Automation support', 'Hỗ trợ tự động hóa'],
  ['UI/UX systems', 'Hệ thống UI/UX'],
];

const ValueMark = ({ index }) => {
  const paths = [
    <><path key="a" d="M9 29v-6a15 15 0 0 1 30 0v6" /><path key="b" d="M9 28c0-3 2-5 5-5h3v12h-3c-3 0-5-2-5-5v-2ZM39 28c0-3-2-5-5-5h-3v12h3c3 0 5-2 5-5v-2Z" /><path key="c" d="M31 38c-2 2-5 3-8 3" /></>,
    <><circle key="a" cx="24" cy="24" r="17" /><path key="b" d="M24 12v24M30 17c-2-3-11-4-12 2-1 5 5 5 9 7 6 2 5 9-2 10-5 0-8-2-10-4" /></>,
    <><circle key="a" cx="18" cy="17" r="7" /><circle key="b" cx="34" cy="19" r="5" /><path key="c" d="M5 40c1-8 6-12 13-12s12 4 13 12M28 31c2-3 5-5 9-4 5 1 8 5 8 11" /></>,
  ];
  return <svg viewBox="0 0 48 48" className="tw-h-10 tw-w-10" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index]}</svg>;
};

const AboutShowcase = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-about-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-light-page tw-overflow-hidden tw-bg-[#FAF8F5] tw-text-[#263B35]">
      <section className="tw-relative tw-isolate tw-pb-24 tw-pt-36 sm:tw-pb-32 sm:tw-pt-44">
        <div className="tw-pointer-events-none tw-absolute tw-inset-0 -tw-z-10 tw-bg-[radial-gradient(circle_at_10%_12%,rgba(13,94,77,.10),transparent_27%),radial-gradient(circle_at_88%_28%,rgba(230,140,35,.09),transparent_23%)]" />
        <div className="tw-mx-auto tw-w-[min(78rem,calc(100%_-_2rem))]">
          <div className="tw-grid tw-items-center lg:tw-grid-cols-12">
            <div data-about-reveal className="about-reveal tw-relative tw-z-10 lg:tw-col-span-7 lg:tw-row-start-1 lg:tw-py-12">
              <div className="tw-flex tw-items-center tw-gap-4"><span className="tw-h-px tw-w-12 tw-bg-[#E68C23]" /><p className="tw-m-0 tw-text-[.68rem] tw-font-extrabold tw-uppercase tw-tracking-[.28em] tw-text-[#0D5E4D]" data-en="About Unitrux" data-vi="Về Unitrux">About Unitrux</p></div>
              <h1 data-title-reveal className="master-title tw-m-0 tw-mt-10 tw-max-w-[51rem] tw-font-editorial tw-text-[clamp(4rem,8vw,8.2rem)] tw-font-semibold tw-leading-[.79] tw-tracking-[-.07em] tw-text-[#0D5E4D]" data-en="Your partner in digital growth." data-vi="Đối tác trong hành trình tăng trưởng số.">Your partner in digital growth.</h1>
              <p className="tw-mt-9 tw-max-w-[42rem] tw-text-lg tw-leading-8 tw-text-[#4B645B]" data-en="Unitrux brings strategy, design, technology, and operations together—helping ambitious businesses launch with clarity and grow with confidence." data-vi="Unitrux kết nối chiến lược, thiết kế, công nghệ và vận hành, giúp doanh nghiệp giàu tham vọng ra mắt rõ ràng và tăng trưởng tự tin.">Unitrux brings strategy, design, technology, and operations together—helping ambitious businesses launch with clarity and grow with confidence.</p>
            </div>

            <div data-about-reveal className="about-reveal about-reveal-delay tw-relative tw-mt-12 tw-min-h-[25rem] lg:tw-col-span-6 lg:tw-col-start-7 lg:tw-row-start-1 lg:tw-mt-0 lg:tw-min-h-[36rem]">
              <div className="tw-absolute tw-inset-0 tw-overflow-hidden tw-rounded-[2.6rem] tw-border tw-border-[#0D5E4D]/12 tw-bg-[#E7EFE9] tw-shadow-[0_36px_90px_-58px_rgba(13,94,77,.5)]">
                <div className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(135deg,rgba(250,248,245,.24),rgba(13,94,77,.08))]" />
                <div className="about-brand-image tw-absolute tw-inset-10 tw-bg-contain tw-bg-center tw-bg-no-repeat tw-opacity-[.16] tw-blur-[1px]" />
                <span className="tw-absolute -tw-bottom-20 -tw-right-14 tw-h-72 tw-w-72 tw-rounded-full tw-border tw-border-[#0D5E4D]/10" />
                <span className="tw-absolute tw-right-10 tw-top-10 tw-font-editorial tw-text-[9rem] tw-font-semibold tw-leading-none tw-text-[#0D5E4D]/[.055]">U</span>
              </div>
              <div className="tw-absolute -tw-bottom-8 -tw-left-6 tw-max-w-[17rem] tw-rounded-[1.6rem] tw-border tw-border-[#0D5E4D]/15 tw-bg-[#FEF7EA]/95 tw-p-6 tw-shadow-[0_28px_60px_-40px_rgba(13,94,77,.5)] tw-backdrop-blur-lg lg:-tw-left-20">
                <span className="tw-text-xs tw-font-extrabold tw-uppercase tw-tracking-[.18em] tw-text-[#E68C23]">Built together</span>
                <p className="tw-mb-0 tw-mt-4 tw-font-editorial tw-text-2xl tw-font-semibold tw-leading-7 tw-text-[#0D5E4D]">One team from first sketch to daily operation.</p>
              </div>
            </div>
          </div>

          <div className="tw-mt-28 tw-grid tw-grid-cols-1 tw-gap-5 md:tw-grid-cols-2 lg:tw-grid-cols-12 lg:tw-gap-6">
            {values.map((item, index) => (
              <article key={item.number} data-about-reveal style={{ '--reveal-delay': `${index * 90}ms` }} className={`about-reveal tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded-[1.8rem] tw-border tw-border-[#0D5E4D]/15 tw-p-7 tw-shadow-[0_28px_70px_-50px_rgba(13,94,77,.48)] tw-transition tw-duration-500 hover:-tw-translate-y-2 hover:tw-border-[#E68C23]/45 sm:tw-p-8 ${item.layout} ${item.tone}`}>
                <span className="tw-text-[#0D5E4D] tw-transition tw-duration-500 group-hover:-tw-translate-y-1 group-hover:tw-rotate-[-5deg]"><ValueMark index={index} /></span>
                <span className="tw-absolute tw-right-7 tw-top-6 tw-font-editorial tw-text-6xl tw-font-semibold tw-text-[#0D5E4D]/[.06]">{item.number}</span>
                <div className="tw-mt-auto tw-pt-12"><strong className="tw-block tw-font-editorial tw-text-[3.6rem] tw-font-semibold tw-leading-none tw-tracking-[-.055em] tw-text-[#0D5E4D]">{item.value}</strong><h2 className="tw-m-0 tw-mt-1 tw-font-editorial tw-text-3xl tw-font-semibold tw-text-[#0D5E4D]" data-en={item.label} data-vi={item.labelVi}>{item.label}</h2><p className="tw-mb-0 tw-mt-4 tw-max-w-md tw-text-sm tw-leading-7 tw-text-[#50675F]" data-en={item.description} data-vi={item.descriptionVi}>{item.description}</p></div>
                <i className="tw-absolute tw-bottom-6 tw-right-7 tw-h-px tw-w-8 tw-bg-[#E68C23] tw-transition-all tw-duration-500 group-hover:tw-w-16" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tw-border-y tw-border-[#0D5E4D]/10 tw-bg-[#FEF7EA] tw-py-16 sm:tw-py-20">
        <div data-about-reveal className="about-reveal tw-mx-auto tw-grid tw-w-[min(78rem,calc(100%_-_2rem))] tw-gap-9 lg:tw-grid-cols-[.7fr_1.3fr] lg:tw-items-center">
          <div><p className="tw-m-0 tw-text-[.68rem] tw-font-extrabold tw-uppercase tw-tracking-[.26em] tw-text-[#E68C23]">What we connect</p><h2 className="tw-m-0 tw-mt-4 tw-font-editorial tw-text-5xl tw-font-semibold tw-leading-[.9] tw-text-[#0D5E4D]">A wider view of digital work.</h2></div>
          <ul className="tw-m-0 tw-flex tw-list-none tw-flex-wrap tw-gap-3 tw-p-0">
            {services.map(([label, labelVi], index) => <li key={label} style={{ '--reveal-delay': `${index * 55}ms` }} className="tw-rounded-full tw-border tw-border-[#0D5E4D]/16 tw-bg-[#FAF8F5] tw-px-5 tw-py-3 tw-text-sm tw-font-bold tw-text-[#0D5E4D] tw-shadow-[0_10px_26px_-22px_rgba(13,94,77,.5)] tw-transition tw-duration-300 hover:-tw-translate-y-1 hover:tw-border-[#E68C23] hover:tw-bg-[#E68C23] hover:tw-text-[#FFF9F1]"><span data-en={label} data-vi={labelVi}>{label}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="tw-py-24 sm:tw-py-32">
        <div data-about-reveal className="about-reveal tw-mx-auto tw-flex tw-w-[min(78rem,calc(100%_-_2rem))] tw-flex-col tw-items-start tw-justify-between tw-gap-8 tw-rounded-[2rem] tw-bg-[#0D5E4D] tw-p-8 sm:tw-p-12 lg:tw-flex-row lg:tw-items-end">
          <div><p className="tw-m-0 tw-text-xs tw-font-bold tw-uppercase tw-tracking-[.2em] tw-text-[#F5BC72]">The next useful step</p><h2 className="tw-mb-0 tw-mt-5 tw-max-w-2xl tw-font-editorial tw-text-5xl tw-font-semibold tw-leading-[.9] tw-text-[#FFF9F1]">Let’s make the complicated feel clear.</h2></div>
          <div className="tw-flex tw-flex-wrap tw-gap-3"><Link to="/contact" data-magnetic data-ripple className="master-magnetic tw-relative tw-overflow-hidden tw-rounded-full tw-bg-[#E68C23] tw-px-6 tw-py-3 tw-text-sm tw-font-bold tw-text-[#FFF9F1] tw-no-underline tw-transition-colors hover:tw-bg-[#FFF9F1] hover:tw-text-[#0D5E4D]">Start a conversation</Link><Link to="/services" className="tw-rounded-full tw-border tw-border-[#FFF9F1]/35 tw-px-6 tw-py-3 tw-text-sm tw-font-bold tw-text-[#FFF9F1] tw-no-underline hover:tw-bg-[#FFF9F1]/10">Explore services</Link></div>
        </div>
      </section>
    </div>
  );
};

export default AboutShowcase;
