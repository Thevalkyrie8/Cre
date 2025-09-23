import React, { useState } from 'react';
import { createContact } from '../api/client';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await createContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error creating contact:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" data-vi="Họ và tên" data-en="Full Name">Họ và tên</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" data-vi="Email" data-en="Email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
        </div>
        
        
        <div className="form-group">
          <label htmlFor="message" data-vi="Nội dung tin nhắn" data-en="Message Content">Nội dung tin nhắn</label>
          <textarea 
            id="message"
            name="message"
            rows="5" 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        {submitStatus === 'success' && (
          <div className="alert alert-success">
            <div className="alert-icon">✅</div>
            <span data-vi="Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại với bạn sớm nhất." data-en="Message sent successfully! We will contact you soon.">
              Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại với bạn sớm nhất.
            </span>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="alert alert-error">
            <div className="alert-icon">❌</div>
            <span data-vi="Có lỗi xảy ra, vui lòng thử lại sau." data-en="An error occurred, please try again later.">
              Có lỗi xảy ra, vui lòng thử lại sau.
            </span>
          </div>
        )}
        
        <button 
          type="submit" 
          className="btn btn-primary btn-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span data-vi="Đang gửi..." data-en="Sending...">Đang gửi...</span>
          ) : (
            <span data-vi="Gửi tin nhắn" data-en="Send Message">Gửi tin nhắn</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
