import { useEffect, useState } from 'react';
import { createContact } from '../api/client';
import { trackEvent } from '../analytics/tracking';
import './PricingBriefForm.css';

/* Pricing brief -> lead. Reuses the existing createContact() endpoint
   (POST /contacts, fields name/email/message/phone) — the structured brief is
   serialized into `message`, so no backend change is needed. Mirrors
   ContactForm.jsx's submit/status pattern. */

const getInitialLanguage = () => {
  try {
    return localStorage.getItem('language') === 'en' ? 'en' : 'vi';
  } catch {
    return 'vi';
  }
};

const NOTES_MAX = 500;

const SERVICE_OPTIONS = [
  { value: 'video', vi: 'Quay video', en: 'Video production' },
  { value: 'photo', vi: 'Chụp ảnh sản phẩm', en: 'Product photography' },
  { value: 'combo', vi: 'Combo quay + chụp', en: 'Photo + video combo' },
  { value: 'livestream', vi: 'Setup livestream / studio', en: 'Livestream / studio setup' },
  { value: 'unsure', vi: 'Chưa chắc, cần tư vấn', en: 'Not sure, need advice' },
];

const PLATFORM_OPTIONS = [
  { value: 'website', vi: 'Website', en: 'Website', icon: 'globe' },
  { value: 'ecommerce', vi: 'Sàn TMĐT', en: 'Marketplace', icon: 'cart' },
  { value: 'facebook', vi: 'Facebook / Instagram', en: 'Facebook / Instagram', icon: 'social' },
  { value: 'tiktok', vi: 'TikTok / Reels', en: 'TikTok / Reels', icon: 'music' },
  { value: 'youtube', vi: 'YouTube', en: 'YouTube', icon: 'play' },
  { value: 'ads', vi: 'Quảng cáo (Meta/Google/TikTok Ads)', en: 'Ads (Meta/Google/TikTok Ads)', icon: 'megaphone' },
];

const TRISTATE = [
  { value: '', vi: '— Chọn —', en: '— Select —' },
  { value: 'yes', vi: 'Có', en: 'Yes' },
  { value: 'no', vi: 'Không', en: 'No' },
  { value: 'unsure', vi: 'Chưa chắc', en: 'Not sure' },
];

const L = (isVi, item) => (isVi ? item.vi : item.en);

const EMPTY = {
  name: '', email: '',
  serviceType: 'video',
  productCount: '', photoCount: '', videoCount: '', videoLength: '',
  platforms: [],
  model: '', studio: '', voiceover: '',
  deadline: '', notes: '',
};

/* ---- Icons — single-path line set, matches the /media-pricing card icons ---- */
const P = {
  brief: 'M6 3h6l4 4v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M12 3v4h4 M8 12h6 M8 15h4',
  shield: 'M10 3l6 2v4c0 4-2.6 6.6-6 8-3.4-1.4-6-4-6-8V5l6-2z M7.5 10l1.8 1.8L13 8',
  user: 'M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M4.5 16c.8-2.6 3-4 5.5-4s4.7 1.4 5.5 4',
  mail: 'M3 5h14v10H3z M3 6l7 5 7-5',
  layers: 'M10 3l7 4-7 4-7-4 7-4z M3 11l7 4 7-4 M3 14.5l7 4 7-4',
  box: 'M10 3l7 4v6l-7 4-7-4V7l7-4z M3 7l7 4 7-4 M10 11v7',
  image: 'M3 4h14v12H3z M3 13l4-4 3 3 4-4 3 3 M7 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  video: 'M3 5h10v10H3z M13 8l4-2v8l-4-2',
  clock: 'M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12z M10 7v3.2l2.2 1.3',
  globe: 'M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M3 10h14 M10 3c2.2 2 3.2 4.4 3.2 7S12.2 15 10 17c-2.2-2-3.2-4.4-3.2-7S7.8 5 10 3z',
  cart: 'M3 4h2l2 9h8l2-6H6 M8 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M15 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  social: 'M4 6a2 2 0 0 1 2-2h4v12H6a2 2 0 0 1-2-2V6z M13 4h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1 M13 8.5h.01',
  music: 'M8 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M8 14V5l7-2v8 M15 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0z',
  play: 'M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 3 14.5v-9z M8.5 7.5l4 2.5-4 2.5v-5z',
  megaphone: 'M4 8v4l9 4V4L4 8z M4 8H3v4h1 M13 7c1.5.6 1.5 5.4 0 6',
  monitor: 'M3 4h14v9H3z M7 17h6 M10 13v4',
  mic: 'M10 3a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-5 0v-4A2.5 2.5 0 0 1 10 3z M5.5 9a4.5 4.5 0 0 0 9 0 M10 13.5V17',
  calendar: 'M4 5h12v11H4z M4 8h12 M8 3v3 M12 3v3',
  pencil: 'M13 4l3 3-8 8H5v-3l8-8z M12 5l3 3',
  send: 'M17 3L9 11 M17 3l-5 14-3-6-6-3 14-5z',
};

const Icon = ({ d, className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const Field = ({ icon, labelVi, labelEn, children, className = '' }) => (
  <label className={`pricing-brief__field ${className}`.trim()}>
    <span className="pricing-brief__label">
      <Icon d={P[icon]} className="pricing-brief__label-icon" />
      <span data-vi={labelVi} data-en={labelEn}>{labelEn}</span>
    </span>
    {children}
  </label>
);

const PricingBriefForm = ({ headingId = 'pricing-brief-title' }) => {
  const [form, setForm] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [language, setLanguage] = useState(getInitialLanguage);
  const isVi = language === 'vi';

  useEffect(() => {
    const onLang = (e) => setLanguage(e.detail?.language === 'vi' ? 'vi' : 'en');
    window.addEventListener('languageChange', onLang);
    return () => window.removeEventListener('languageChange', onLang);
  }, []);

  const set = (name, value) => setForm((cur) => ({ ...cur, [name]: value }));
  const handleChange = (e) => set(e.target.name, e.target.value);
  const togglePlatform = (value) => setForm((cur) => ({
    ...cur,
    platforms: cur.platforms.includes(value)
      ? cur.platforms.filter((p) => p !== value)
      : [...cur.platforms, value],
  }));

  const buildMessage = () => {
    const svc = SERVICE_OPTIONS.find((o) => o.value === form.serviceType);
    const tri = (v) => TRISTATE.find((o) => o.value === v);
    const platforms = form.platforms
      .map((p) => PLATFORM_OPTIONS.find((o) => o.value === p))
      .filter(Boolean)
      .map((o) => L(isVi, o))
      .join(', ');
    const rows = [
      [isVi ? 'Loại dịch vụ' : 'Service type', svc ? L(isVi, svc) : form.serviceType],
      [isVi ? 'Số sản phẩm / không gian' : 'Products / spaces', form.productCount],
      [isVi ? 'Số ảnh cần' : 'Photos needed', form.photoCount],
      [isVi ? 'Số video cần' : 'Videos needed', form.videoCount],
      [isVi ? 'Thời lượng video' : 'Video length', form.videoLength],
      [isVi ? 'Nền tảng sử dụng' : 'Target platforms', platforms],
      [isVi ? 'Có người mẫu' : 'Model needed', tri(form.model) ? L(isVi, tri(form.model)) : ''],
      [isVi ? 'Cần studio' : 'Studio needed', tri(form.studio) ? L(isVi, tri(form.studio)) : ''],
      [isVi ? 'Voice-over' : 'Voice-over', tri(form.voiceover) ? L(isVi, tri(form.voiceover)) : ''],
      [isVi ? 'Deadline' : 'Deadline', form.deadline],
      [isVi ? 'Ghi chú' : 'Notes', form.notes],
    ].filter(([, v]) => String(v || '').trim());
    const header = isVi ? '[Brief báo giá quay video / chụp ảnh]' : '[Video / photography pricing brief]';
    return `${header}\n${rows.map(([k, v]) => `- ${k}: ${v}`).join('\n')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) {
      console.warn('Bot brief submission blocked via honeypot.');
      setStatus('success');
      setForm(EMPTY);
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      await createContact({ name: form.name, email: form.email, phone: '', message: buildMessage() });
      trackEvent('generate_lead', { method: 'pricing_brief_form', form_name: 'media_pricing_brief' });
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      console.error('Error sending pricing brief:', err);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pricing-brief">
      <div className="pricing-brief__head">
        <div className="pricing-brief__head-main">
          <span className="pricing-brief__head-icon" aria-hidden="true">
            <Icon d={P.brief} />
          </span>
          <div>
            <h2 id={headingId} className="pricing-brief__title"
              data-vi="Gửi brief để nhận báo giá chi tiết"
              data-en="Send a brief to get a detailed quote">
              Send a brief to get a detailed quote
            </h2>
            <p className="pricing-brief__subtitle"
              data-vi="Chia sẻ nhu cầu và Unitrux sẽ trả về báo giá tách hạng mục theo đúng phạm vi và deadline của bạn."
              data-en="Share what you need and Unitrux will reply with an itemized quotation matched to your scope and deadline.">
              Share what you need and Unitrux will reply with an itemized quotation matched to your scope and deadline.
            </p>
          </div>
        </div>
        <div className="pricing-brief__privacy">
          <span className="pricing-brief__privacy-icon" aria-hidden="true">
            <Icon d={P.shield} />
          </span>
          <div>
            <strong data-vi="Thông tin của bạn được bảo mật" data-en="Your information stays private">
              Your information stays private
            </strong>
            <span data-vi="Unitrux chỉ dùng thông tin này để lập báo giá và liên hệ lại với bạn."
              data-en="Unitrux uses these details only to prepare your quote and follow up.">
              Unitrux uses these details only to prepare your quote and follow up.
            </span>
          </div>
        </div>
      </div>

      <form className="pricing-brief__form" onSubmit={handleSubmit}>
        {/* Honeypot field - hidden from legitimate human users */}
        <div style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
          <input
            type="text"
            name="client_company_fax"
            tabIndex="-1"
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="pricing-brief__row">
          <Field icon="user" labelVi="Họ và tên" labelEn="Full name">
            <input type="text" name="name" value={form.name} onChange={handleChange}
              autoComplete="name" required
              placeholder="Nhập họ và tên của bạn"
              data-placeholder-vi="Nhập họ và tên của bạn" data-placeholder-en="Enter your full name" />
          </Field>
          <Field icon="mail" labelVi="Email" labelEn="Email">
            <input type="email" name="email" value={form.email} onChange={handleChange}
              autoComplete="email" inputMode="email" required
              placeholder="Nhập email để chúng tôi liên hệ"
              data-placeholder-vi="Nhập email để chúng tôi liên hệ" data-placeholder-en="Enter your email so we can reply" />
          </Field>
        </div>

        <div className="pricing-brief__row">
          <Field icon="layers" labelVi="Loại dịch vụ" labelEn="Service type" className="pricing-brief__field--select">
            <select name="serviceType" value={form.serviceType} onChange={handleChange}>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{L(isVi, o)}</option>
              ))}
            </select>
          </Field>
          <Field icon="box" labelVi="Số sản phẩm / không gian" labelEn="Products / spaces">
            <input type="text" name="productCount" value={form.productCount} onChange={handleChange}
              inputMode="numeric" placeholder="10" />
          </Field>
        </div>

        <div className="pricing-brief__row pricing-brief__row--three">
          <Field icon="image" labelVi="Số ảnh" labelEn="Photos">
            <input type="text" name="photoCount" value={form.photoCount} onChange={handleChange}
              inputMode="numeric" placeholder="Ví dụ: 20"
              data-placeholder-vi="Ví dụ: 20" data-placeholder-en="e.g. 20" />
          </Field>
          <Field icon="video" labelVi="Số video" labelEn="Videos">
            <input type="text" name="videoCount" value={form.videoCount} onChange={handleChange}
              inputMode="numeric" placeholder="Ví dụ: 5"
              data-placeholder-vi="Ví dụ: 5" data-placeholder-en="e.g. 5" />
          </Field>
          <Field icon="clock" labelVi="Thời lượng video" labelEn="Video length">
            <input type="text" name="videoLength" value={form.videoLength} onChange={handleChange}
              placeholder="15–30 giây"
              data-placeholder-vi="15–30 giây" data-placeholder-en="15–30s" />
          </Field>
        </div>

        <fieldset className="pricing-brief__fieldset">
          <legend className="pricing-brief__label">
            <Icon d={P.globe} className="pricing-brief__label-icon" />
            <span data-vi="Nền tảng sẽ sử dụng nội dung" data-en="Where the content will be used">
              Where the content will be used
            </span>
          </legend>
          <div className="pricing-brief__chips">
            {PLATFORM_OPTIONS.map((o) => (
              <label className="pricing-brief__chip" key={o.value}
                data-checked={form.platforms.includes(o.value) ? 'true' : undefined}>
                <Icon d={P[o.icon]} className="pricing-brief__chip-icon" />
                <span data-vi={o.vi} data-en={o.en}>{o.en}</span>
                <input type="checkbox" checked={form.platforms.includes(o.value)}
                  onChange={() => togglePlatform(o.value)} />
                <span className="pricing-brief__chip-box" aria-hidden="true" />
              </label>
            ))}
          </div>
        </fieldset>

        <div className="pricing-brief__row pricing-brief__row--three">
          <Field icon="user" labelVi="Có người mẫu?" labelEn="Model?" className="pricing-brief__field--select">
            <select name="model" value={form.model} onChange={handleChange}>
              {TRISTATE.map((o) => <option key={o.value} value={o.value}>{L(isVi, o)}</option>)}
            </select>
          </Field>
          <Field icon="monitor" labelVi="Cần studio?" labelEn="Studio?" className="pricing-brief__field--select">
            <select name="studio" value={form.studio} onChange={handleChange}>
              {TRISTATE.map((o) => <option key={o.value} value={o.value}>{L(isVi, o)}</option>)}
            </select>
          </Field>
          <Field icon="mic" labelVi="Voice-over?" labelEn="Voice-over?" className="pricing-brief__field--select">
            <select name="voiceover" value={form.voiceover} onChange={handleChange}>
              {TRISTATE.map((o) => <option key={o.value} value={o.value}>{L(isVi, o)}</option>)}
            </select>
          </Field>
        </div>

        <Field icon="calendar" labelVi="Deadline dự kiến" labelEn="Expected deadline"
          className="pricing-brief__field--trailing">
          <input type="text" name="deadline" value={form.deadline} onChange={handleChange}
            placeholder="Cuối tháng 9 / 20-09-2026"
            data-placeholder-vi="Cuối tháng 9 / 20-09-2026" data-placeholder-en="End of September / 2026-09-20" />
          <Icon d={P.calendar} className="pricing-brief__trailing-icon" />
        </Field>

        <Field icon="pencil" labelVi="Ghi chú thêm" labelEn="Additional notes"
          className="pricing-brief__field--notes">
          <textarea name="notes" rows="3" maxLength={NOTES_MAX} value={form.notes} onChange={handleChange}
            placeholder="Concept, tham chiếu, yêu cầu đặc biệt…"
            data-placeholder-vi="Concept, tham chiếu, yêu cầu đặc biệt…"
            data-placeholder-en="Concept, references, special requirements…" />
          <span className="pricing-brief__count" aria-hidden="true">{form.notes.length}/{NOTES_MAX}</span>
        </Field>

        <div className="pricing-brief__footer">
          <div className="pricing-brief__status" aria-live="polite" aria-atomic="true">
            <span className={`pricing-brief__status-icon${status ? ` is-${status}` : ''}`} aria-hidden="true">
              <Icon d={status === 'error' ? P.shield : P.send} />
            </span>
            <div>
              {status === 'success' && (
                <p className="pricing-brief__alert pricing-brief__alert--ok" role="status">
                  {isVi
                    ? 'Đã nhận brief. Unitrux sẽ gửi báo giá tách hạng mục cho bạn sớm.'
                    : 'Brief received. Unitrux will send you an itemized quote soon.'}
                </p>
              )}
              {status === 'error' && (
                <p className="pricing-brief__alert pricing-brief__alert--err" role="alert">
                  {isVi
                    ? 'Chưa gửi được. Vui lòng thử lại hoặc nhắn Zalo cho Unitrux.'
                    : 'Could not send. Please retry or message Unitrux on Zalo.'}
                </p>
              )}
              {!status && (
                <p className="pricing-brief__hint"
                  data-vi="Không cần điền hết — thông tin nào chưa rõ Unitrux sẽ trao đổi thêm."
                  data-en="No need to fill everything — Unitrux will follow up on anything unclear.">
                  No need to fill everything — Unitrux will follow up on anything unclear.
                </p>
              )}
            </div>
          </div>
          <button type="submit" className="pricing-brief__submit" disabled={isSubmitting}>
            <Icon d={P.send} className="pricing-brief__submit-icon" />
            <span>
              {isSubmitting
                ? (isVi ? 'Đang gửi…' : 'Sending…')
                : (isVi ? 'Nhận báo giá chi tiết' : 'Get a detailed quote')}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PricingBriefForm;
