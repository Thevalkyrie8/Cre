import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="privacy-policy container" style={{ padding: '101px 20px', maxWidth: '960px', margin: '0 auto' }}>
      <h1>Terms of Service</h1>
      <p><strong>Last updated:</strong> July 1, 2026</p>

      <p>
        Welcome to Unitrux. By accessing or using our website and services, you agree to be bound by the terms below.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By using the website, you confirm that you have read, understood, and agreed to these terms. If you do not agree, please stop using the website immediately.
      </p>

      <h2>2. Description of Services</h2>
      <p>
        Unitrux provides services related to website development, e-commerce, digital marketing, UI/UX design, automation, and content production. The scope and content of services may change over time.
      </p>

      <h2>3. User Responsibilities</h2>
      <ul>
        <li>Provide accurate information when contacting us or registering for services.</li>
        <li>Do not use the website for illegal, fraudulent, or harmful purposes.</li>
        <li>Do not share your login credentials or account information with third parties.</li>
      </ul>

      <h2>4. Copyright and Content</h2>
      <p>
        All content on the website, including text, images, design, logos, and source code, is owned by Unitrux or its licensors unless otherwise stated. You may not copy, distribute, or use such content without prior written consent.
      </p>

      <h2>5. Data and Privacy</h2>
      <p>
        We collect and process your personal data to provide services, improve user experience, and fulfill legal obligations. Please review our <Link to="/privacy-policy">Privacy Policy</Link> for more details.
      </p>

      <h2>6. Suspension and Termination</h2>
      <p>
        We may suspend or terminate your access if we detect violations of these terms, security risks, or behavior that negatively affects the website.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        Unitrux shall not be liable for indirect, incidental, or consequential damages arising from the use of the website or services, except as required by law.
      </p>

      <h2>8. Changes to These Terms</h2>
      <p>
        We may update these terms at any time. Changes become effective once published on the website.
      </p>

      <h2>9. Contact</h2>
      <p>
        If you have any questions about these terms, please contact us at <a href="mailto:info@unitrux.com">info@unitrux.com</a>.
      </p>

      <p style={{ marginTop: '32px' }}>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>&larr; Back to Home</Link>
      </p>
    </div>
  );
};

export default TermsOfService;
