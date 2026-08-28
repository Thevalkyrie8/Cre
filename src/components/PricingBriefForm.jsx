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

const SERVICE_OPTIONS = [
  { value: 'video', vi: 'Quay video', en: 'Video production' },
  { value: 'photo', vi: 'Chụp ảnh sản phẩm', en: 'Product photography' },
  { value: 'combo', vi: 'Combo quay + chụp', en: 'Photo + video combo' },
  { value: 'livestream', vi: 'Setup livestream / studio', en: 'Livestream / studio setup' },
  { value: 'unsure', vi: 'Chưa chắc, cần tư vấn', en: 'Not sure, need advice' },
];

const PLATFORM_OPTIONS = [
  { value: 'website', vi: 'Website', en: 'Website' },
  { value: 'ecommerce', vi: 'Sàn TMĐT', en: 'Marketplace' },
  { value: 'facebook', vi: 'Facebook / Instagram', en: 'Facebook / Instagram' },
  { value: 'tiktok', vi: 'TikTok / Reels', en: 'TikTok / Reels' },
  { value: 'youtube', vi: 'YouTube', en: 'YouTube' },
  { value: 'ads', vi: 'Quảng cáo (Meta/Google/TikTok Ads)', en: 'Ads (Meta/Google/TikTok Ads)' },
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

const PricingBriefForm = () => {
  const [form, setForm] = useState(EMPTY);
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
      <form className="pricing-brief__form" onSubmit={handleSubmit}>
        <div className="pricing-brief__row">
          <label className="pricing-brief__field">
            <span data-vi="Họ và tên" data-en="Full name">Full name</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} autoComplete="name" required />
          </label>
          <label className="pricing-brief__field">
            <span data-vi="Email" data-en="Email">Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" inputMode="email" required />
          </label>
        </div>

        <div className="pricing-brief__row">
          <label className="pricing-brief__field">
            <span data-vi="Loại dịch vụ" data-en="Service type">Service type</span>
            <select name="serviceType" value={form.serviceType} onChange={handleChange}>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{L(isVi, o)}</option>
              ))}
            </select>
          </label>
          <label className="pricing-brief__field">
            <span data-vi="Số sản phẩm / không gian" data-en="Products / spaces">Products / spaces</span>
            <input type="text" name="productCount" value={form.productCount} onChange={handleChange} inputMode="numeric" placeholder="10" />
          </label>
        </div>

        <div className="pricing-brief__row pricing-brief__row--three">
          <label className="pricing-brief__field">
            <span data-vi="Số ảnh" data-en="Photos">Photos</span>
            <input type="text" name="photoCount" value={form.photoCount} onChange={handleChange} inputMode="numeric" />
          </label>
          <label className="pricing-brief__field">
            <span data-vi="Số video" data-en="Videos">Videos</span>
            <input type="text" name="videoCount" value={form.videoCount} onChange={handleChange} inputMode="numeric" />
          </label>
          <label className="pricing-brief__field">
            <span data-vi="Thời lượng video" data-en="Video length">Video length</span>
            <input type="text" name="videoLength" value={form.videoLength} onChange={handleChange} placeholder="15–30s" data-placeholder-vi="15–30 giây" data-placeholder-en="15–30s" />
          </label>
        </div>

        <fieldset className="pricing-brief__fieldset">
          <legend data-vi="Nền tảng sẽ sử dụng nội dung" data-en="Where the content will be used">Where the content will be used</legend>
          <div className="pricing-brief__checks">
            {PLATFORM_OPTIONS.map((o) => (
              <label className="pricing-brief__check" key={o.value}>
                <input type="checkbox" checked={form.platforms.includes(o.value)} onChange={() => togglePlatform(o.value)} />
                <span data-vi={o.vi} data-en={o.en}>{o.en}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="pricing-brief__row pricing-brief__row--three">
          <label className="pricing-brief__field">
            <span data-vi="Có người mẫu?" data-en="Model?">Model?</span>
            <select name="model" value={form.model} onChange={handleChange}>
              {TRISTATE.map((o) => <option key={o.value} value={o.value}>{L(isVi, o)}</option>)}
            </select>
          </label>
          <label className="pricing-brief__field">
            <span data-vi="Cần studio?" data-en="Studio?">Studio?</span>
            <select name="studio" value={form.studio} onChange={handleChange}>
              {TRISTATE.map((o) => <option key={o.value} value={o.value}>{L(isVi, o)}</option>)}
            </select>
          </label>
          <label className="pricing-brief__field">
            <span data-vi="Voice-over?" data-en="Voice-over?">Voice-over?</span>
            <select name="voiceover" value={form.voiceover} onChange={handleChange}>
              {TRISTATE.map((o) => <option key={o.value} value={o.value}>{L(isVi, o)}</option>)}
            </select>
          </label>
        </div>

        <label className="pricing-brief__field">
          <span data-vi="Deadline dự kiến" data-en="Expected deadline">Expected deadline</span>
          <input type="text" name="deadline" value={form.deadline} onChange={handleChange} placeholder="Cuối tháng 9 / 20-09-2026" data-placeholder-vi="Cuối tháng 9 / 20-09-2026" data-placeholder-en="End of September / 2026-09-20" />
        </label>

        <label className="pricing-brief__field">
          <span data-vi="Ghi chú thêm" data-en="Additional notes">Additional notes</span>
          <textarea name="notes" rows="3" maxLength="1000" value={form.notes} onChange={handleChange}
            placeholder="Concept, tham chiếu, yêu cầu đặc biệt…"
            data-placeholder-vi="Concept, tham chiếu, yêu cầu đặc biệt…"
            data-placeholder-en="Concept, references, special requirements…" />
        </label>

        <div className="pricing-brief__footer">
          <div className="pricing-brief__status" aria-live="polite" aria-atomic="true">
            {status === 'success' && (
              <p className="pricing-brief__alert pricing-brief__alert--ok" role="status">
                {isVi ? 'Đã nhận brief. Unitrux sẽ gửi báo giá tách hạng mục cho bạn sớm.' : 'Brief received. Unitrux will send you an itemized quote soon.'}
              </p>
            )}
            {status === 'error' && (
              <p className="pricing-brief__alert pricing-brief__alert--err" role="alert">
                {isVi ? 'Chưa gửi được. Vui lòng thử lại hoặc nhắn Zalo cho Unitrux.' : 'Could not send. Please retry or message Unitrux on Zalo.'}
              </p>
            )}
          </div>
          <button type="submit" className="pricing-brief__submit" disabled={isSubmitting}>
            {isSubmitting
              ? (isVi ? 'Đang gửi…' : 'Sending…')
              : (isVi ? 'Nhận báo giá chi tiết' : 'Get a detailed quote')}
          </button>
        </div>
        <p className="pricing-brief__hint" data-vi="Không cần điền hết — thông tin nào chưa rõ Unitrux sẽ trao đổi thêm." data-en="No need to fill everything — Unitrux will follow up on anything unclear.">
          No need to fill everything — Unitrux will follow up on anything unclear.
        </p>
      </form>
    </div>
  );
};

export default PricingBriefForm;
