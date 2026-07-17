import { useState } from 'react';
import { createContact } from '../api/client';

const initialForm = { name: '', email: '', phone: '', company: '', service: 'Website & Web App', message: '' };

const ContactIcon = ({ type }) => {
  const paths = {
    email: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m5 8 7 5 7-5" /></>,
    phone: <><path d="M8 3H5a2 2 0 0 0-2 2c0 9 7 16 16 16a2 2 0 0 0 2-2v-3l-5-1-1.5 3c-4-1.5-7-4.5-8.5-8.5L9 8 8 3Z" /></>,
    time: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></>,
  };
  return <svg viewBox="0 0 24 24" className="tw-h-5 tw-w-5" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
};

const ContactShowcase = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete your name, email, and project message.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    try {
      const context = [`Service: ${form.service}`, form.company.trim() && `Company: ${form.company.trim()}`].filter(Boolean).join(' | ');
      await createContact({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), message: `${context}\n\n${form.message.trim()}` });
      setForm(initialForm);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('We could not send your message right now. Please email info@unitrux.com or try again.');
    }
  };

  const details = [
    { type: 'email', label: 'Email', value: 'info@unitrux.com', href: 'mailto:info@unitrux.com' },
    { type: 'phone', label: 'Phone', value: '+84 364 750 316', href: 'tel:+84364750316' },
    { type: 'time', label: 'Working hours', value: 'Mon–Fri · 08:00–17:30 ICT' },
  ];

  return (
    <div className="theme-synced-page contact-light-page tw-overflow-hidden tw-bg-[#FAF8F5] tw-text-[#263B35]">
      <section className="tw-relative tw-isolate tw-pb-24 tw-pt-36 sm:tw-pb-32 sm:tw-pt-44">
        <div className="tw-pointer-events-none tw-absolute tw-inset-0 -tw-z-10 tw-bg-[radial-gradient(circle_at_8%_12%,rgba(13,94,77,.11),transparent_27%),radial-gradient(circle_at_90%_20%,rgba(230,140,35,.10),transparent_24%)]" />
        <div className="tw-mx-auto tw-w-[min(78rem,calc(100%_-_2rem))]">
          <header className="tw-grid tw-gap-10 lg:tw-grid-cols-12 lg:tw-items-end" data-reveal>
            <div className="lg:tw-col-span-8"><div className="tw-flex tw-items-center tw-gap-4"><span className="tw-h-px tw-w-12 tw-bg-[#E68C23]" /><p className="tw-m-0 tw-text-[.68rem] tw-font-black tw-uppercase tw-tracking-[.28em] tw-text-[#0D5E4D]" data-en="Start a conversation" data-vi="Bắt đầu cuộc trò chuyện">Start a conversation</p></div><h1 data-title-reveal className="master-title tw-mb-0 tw-mt-10 tw-font-editorial tw-text-[clamp(4.3rem,9vw,9rem)] tw-font-semibold tw-leading-[.78] tw-tracking-[-.067em] tw-text-[#0D5E4D]" data-en="Ready to start something useful?" data-vi="Sẵn sàng bắt đầu một điều hữu ích?">Ready to start something useful?</h1></div>
            <p className="tw-m-0 tw-max-w-sm tw-text-base tw-leading-8 tw-text-[#536A61] lg:tw-col-span-3 lg:tw-col-start-10">Tell us what needs to change. We’ll respond with focused questions and a practical next step—not a generic sales pitch.</p>
          </header>

          <div className="tw-relative tw-mt-20 tw-grid tw-gap-7 lg:tw-grid-cols-12 lg:tw-items-start">
            <aside className="tw-relative tw-z-10 lg:tw-col-span-4 lg:tw-mt-14" data-reveal>
              <div className="tw-rounded-[2rem] tw-border tw-border-[#0D5E4D]/15 tw-bg-[#FEF7EA] tw-p-7 tw-shadow-[0_30px_70px_-48px_rgba(13,94,77,.5)] sm:tw-p-8">
                <p className="tw-m-0 tw-text-xs tw-font-black tw-uppercase tw-tracking-[.19em] tw-text-[#E68C23]">Contact information</p>
                <div className="tw-mt-8 tw-space-y-4">{details.map((item) => <div key={item.label} className="tw-flex tw-items-center tw-gap-4 tw-rounded-[1.2rem] tw-border tw-border-[#0D5E4D]/10 tw-bg-[#FAF8F5]/80 tw-p-4"><span className="tw-grid tw-h-11 tw-w-11 tw-shrink-0 tw-place-items-center tw-rounded-xl tw-bg-[#E7EFE9] tw-text-[#0D5E4D]"><ContactIcon type={item.type} /></span><div><span className="tw-block tw-text-[.64rem] tw-font-black tw-uppercase tw-tracking-[.15em] tw-text-[#70827B]">{item.label}</span>{item.href ? <a href={item.href} className="tw-mt-1 tw-block tw-font-semibold tw-text-[#0D5E4D] tw-no-underline hover:tw-text-[#E68C23]">{item.value}</a> : <strong className="tw-mt-1 tw-block tw-font-semibold tw-text-[#0D5E4D]">{item.value}</strong>}</div></div>)}</div>
                <p className="tw-mb-0 tw-mt-8 tw-border-l-2 tw-border-[#E68C23] tw-pl-4 tw-font-editorial tw-text-xl tw-font-semibold tw-leading-7 tw-text-[#0D5E4D]">Most enquiries receive a thoughtful reply within one business day.</p>
              </div>
            </aside>

            <div className="lg:tw-col-span-8" data-reveal>
              <form onSubmit={handleSubmit} className="tw-relative tw-rounded-[2.4rem] tw-border tw-border-[#0D5E4D]/15 tw-bg-[#FEF7EA] tw-p-6 tw-shadow-[0_38px_90px_-55px_rgba(13,94,77,.55)] sm:tw-p-10" noValidate>
                <div className="tw-grid tw-gap-5 sm:tw-grid-cols-2">
                  <label className="contact-field"><span>Full name *</span><input name="name" value={form.name} onChange={updateField} autoComplete="name" placeholder="Your name" /></label>
                  <label className="contact-field"><span>Email *</span><input type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" placeholder="you@company.com" /></label>
                  <label className="contact-field"><span>Phone</span><input name="phone" value={form.phone} onChange={updateField} autoComplete="tel" placeholder="+84 ..." /></label>
                  <label className="contact-field"><span>Company</span><input name="company" value={form.company} onChange={updateField} autoComplete="organization" placeholder="Company or brand" /></label>
                  <label className="contact-field sm:tw-col-span-2"><span>What can we help with?</span><select name="service" value={form.service} onChange={updateField}><option>Website & Web App</option><option>E-commerce Operations</option><option>Digital Marketing</option><option>Brand & Content</option><option>Strategy & Consulting</option></select></label>
                  <label className="contact-field sm:tw-col-span-2"><span>Project message *</span><textarea name="message" value={form.message} onChange={updateField} rows="6" placeholder="A short description of the challenge, goals, and timing..." /></label>
                </div>

                <div className="tw-mt-6 tw-flex tw-flex-col tw-items-start tw-justify-between tw-gap-5 sm:tw-flex-row sm:tw-items-center">
                  <div aria-live="polite" className="tw-min-h-6 tw-text-sm tw-font-semibold">{status === 'success' && <span className="tw-text-[#0D5E4D]">Message received. We’ll be in touch shortly.</span>}{status === 'error' && <span className="tw-text-[#A94F21]">{errorMessage}</span>}</div>
                  <button type="submit" disabled={status === 'loading'} data-magnetic data-ripple className="master-magnetic tw-relative tw-isolate tw-min-w-44 tw-overflow-hidden tw-rounded-full tw-border-0 tw-bg-[#E68C23] tw-px-7 tw-py-4 tw-text-sm tw-font-black tw-text-[#FFF9F1] tw-shadow-[0_18px_34px_-20px_rgba(230,140,35,.8)] tw-transition-colors hover:tw-bg-[#0D5E4D] disabled:tw-cursor-wait disabled:tw-opacity-65">{status === 'loading' ? 'Sending…' : 'Send Message ↗'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="tw-border-y tw-border-[#0D5E4D]/10 tw-bg-[#E7EFE9] tw-py-20" data-reveal>
        <div className="tw-mx-auto tw-grid tw-w-[min(78rem,calc(100%_-_2rem))] tw-gap-10 lg:tw-grid-cols-[.75fr_1.25fr] lg:tw-items-center"><div><p className="tw-m-0 tw-text-[.68rem] tw-font-black tw-uppercase tw-tracking-[.24em] tw-text-[#E68C23]">Working across borders</p><h2 className="tw-mb-0 tw-mt-5 tw-font-editorial tw-text-5xl tw-font-semibold tw-leading-[.9] tw-text-[#0D5E4D]">Based in Vietnam. Built to collaborate anywhere.</h2></div><div className="contact-map tw-relative tw-h-72 tw-overflow-hidden tw-rounded-[2rem] tw-border tw-border-[#0D5E4D]/14 tw-bg-[#FAF8F5]"><svg viewBox="0 0 760 320" className="tw-absolute tw-inset-0 tw-h-full tw-w-full" fill="none" aria-hidden="true"><path d="M-20 230C120 125 210 260 345 157S610 105 790 25M-15 278c150-88 256-20 356-105S602 74 785 88M68-20c52 92 26 177 115 358M330-25c-42 105 40 190 22 370M600-12c-80 110 20 196-10 350" stroke="#0D5E4D" strokeOpacity=".11" strokeWidth="1.3"/><path d="M458 142c18-38 55-45 79-25 24 19 21 58-7 76-28 18-61 2-72-23-5-12-5-19 0-28Z" fill="#E68C23" fillOpacity=".16"/><circle cx="495" cy="153" r="8" fill="#E68C23"/><circle cx="495" cy="153" r="22" stroke="#E68C23" strokeOpacity=".34"/><path d="M495 153 338 105 188 188" stroke="#0D5E4D" strokeOpacity=".24" strokeDasharray="5 7"/></svg><span className="tw-absolute tw-bottom-6 tw-left-7 tw-rounded-full tw-bg-[#0D5E4D] tw-px-4 tw-py-2 tw-text-xs tw-font-bold tw-text-[#FFF9F1]">Ho Chi Minh City · ICT (UTC+7)</span></div></div>
      </section>
    </div>
  );
};

export default ContactShowcase;
