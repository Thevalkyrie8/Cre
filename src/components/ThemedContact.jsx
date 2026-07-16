import ContactForm from './ContactForm';
import ContactShowcase from './ContactShowcase';
import useLightMode from '../hooks/useLightMode';

const ThemedContact = () => {
  const isLight = useLightMode();
  if (isLight) return <ContactShowcase />;

  return <div className="contact-page"><section className="contact-section"><div className="container"><div className="section-header"><h1>Ready to Start Your Project?</h1><p>Contact us today for a free consultation and a clear next step.</p></div><ContactForm /></div></section></div>;
};

export default ThemedContact;
