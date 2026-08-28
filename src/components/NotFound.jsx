import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="theme-synced-page tw-grid tw-min-h-[78vh] tw-place-items-center tw-bg-[var(--u-surface)] tw-px-4 tw-pb-20 tw-pt-36">
    <div className="tw-w-full tw-max-w-3xl tw-rounded-[2rem] tw-border tw-border-[color-mix(in_srgb,var(--u-accent)_14%,transparent)] tw-bg-[var(--u-line)] tw-p-8 tw-text-center tw-shadow-[0_32px_80px_-58px_color-mix(in_srgb,var(--u-accent)_65%,transparent)] sm:tw-p-14">
      <p className="tw-m-0 tw-text-xs tw-font-black tw-uppercase tw-tracking-[.24em] tw-text-[var(--u-secondary)]">404 · Page not found</p>
      <h1 className="tw-mb-0 tw-mt-6 tw-font-editorial tw-text-6xl tw-font-semibold tw-leading-none tw-text-[var(--u-accent)]" data-en="This page is no longer here." data-vi="Trang này không tồn tại.">This page is no longer here.</h1>
      <p className="tw-mx-auto tw-mb-0 tw-mt-6 tw-max-w-xl tw-text-base tw-leading-7 tw-text-[var(--u-subtle)]" data-en="The address may have changed. Return home or explore the digital services available from Unitrux." data-vi="Địa chỉ có thể đã thay đổi. Hãy quay lại trang chủ hoặc khám phá các dịch vụ Digital của Unitrux.">The address may have changed. Return home or explore the digital services available from Unitrux.</p>
      <div className="tw-mt-9 tw-flex tw-flex-wrap tw-justify-center tw-gap-3">
        <Link to="/" className="tw-rounded-full tw-bg-[var(--u-accent)] tw-px-6 tw-py-3 tw-font-bold tw-text-[var(--u-surface)] tw-no-underline">Về trang chủ</Link>
        <Link to="/services" className="tw-rounded-full tw-border tw-border-[color-mix(in_srgb,var(--u-accent)_25%,transparent)] tw-px-6 tw-py-3 tw-font-bold tw-text-[var(--u-accent)] tw-no-underline">Xem dịch vụ</Link>
      </div>
    </div>
  </section>
);

export default NotFound;
