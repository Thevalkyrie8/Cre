import React, { useEffect, useState } from 'react';
import { createContact } from '../api/client';
import { trackEvent } from '../analytics/tracking';

const getInitialLanguage = () => {
  try {
    return localStorage.getItem('language') === 'vi' ? 'vi' : 'en';
  } catch {
    return 'en';
  }
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [language, setLanguage] = useState(getInitialLanguage);
  const isVietnamese = language === 'vi';

  useEffect(() => {
    const handleLanguageChange = (event) => setLanguage(event.detail?.language === 'vi' ? 'vi' : 'en');
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await createContact({ ...formData, phone: '' });
      trackEvent('generate_lead', { method: 'contact_form', form_name: 'homepage_growth_brief' });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error creating contact:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container engine-surface-card">
      <form className="contact-form" onSubmit={handleSubmit}>
        <header className="contact-form__intro">
          <div>
            <h3 data-en="A quick project brief" data-vi="Chia sẻ nhanh về dự án">A quick project brief</h3>
            <p
              data-en="A few details are enough for us to prepare a useful first response."
              data-vi="Chỉ cần vài thông tin để chúng tôi chuẩn bị phản hồi phù hợp ngay từ đầu."
            >
              A few details are enough for us to prepare a useful first response.
            </p>
          </div>
          <span className="contact-form__privacy" data-en="Your details stay private" data-vi="Thông tin được bảo mật">
            Your details stay private
          </span>
        </header>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" data-vi="Họ và tên" data-en="Full name">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Nguyễn Minh Anh"
              data-placeholder-vi="Nguyễn Minh Anh"
              data-placeholder-en="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" data-vi="Email công việc" data-en="Work email">Work email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              data-placeholder-vi="ban@congty.vn"
              data-placeholder-en="you@company.com"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message" data-vi="Bạn muốn cải thiện điều gì?" data-en="What would you like to improve?">
            What would you like to improve?
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            maxLength="1000"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your current website, lead flow or marketing bottleneck."
            data-placeholder-vi="Chia sẻ ngắn về website, nguồn lead hoặc điểm nghẽn marketing hiện tại."
            data-placeholder-en="Tell us about your current website, lead flow or marketing bottleneck."
            required
          />
          <div className="contact-form__meta">
            <span data-en="No polished brief needed." data-vi="Không cần chuẩn bị brief hoàn chỉnh.">No polished brief needed.</span>
            <span aria-live="polite">{formData.message.length}/1000</span>
          </div>
        </div>

        <div className="contact-form__footer">
          <div className="contact-form__status" aria-live="polite" aria-atomic="true">
            {submitStatus === 'success' && (
              <div className="alert alert-success" role="status">
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10 3 3 7-7" /></svg>
                <span>{isVietnamese ? 'Đã gửi thành công. Unitrux sẽ liên hệ lại với bạn sớm.' : 'Message sent. Unitrux will get back to you soon.'}</span>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="alert alert-error" role="alert">
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v6m0 3h.01" /></svg>
                <span>{isVietnamese ? 'Chưa thể gửi tin nhắn. Vui lòng thử lại hoặc chat trực tiếp với chúng tôi.' : 'We could not send this yet. Please retry or chat with us directly.'}</span>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-full contact-form__submit engine-pill-cta" disabled={isSubmitting}>
            <span>{isSubmitting ? (isVietnamese ? 'Đang gửi...' : 'Sending...') : (isVietnamese ? 'Gửi yêu cầu' : 'Send enquiry')}</span>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
