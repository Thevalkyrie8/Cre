import React from 'react';
import { Link } from 'react-router-dom';

const DeleteData = () => {
  return (
    <div className="privacy-policy container" style={{ padding: '101px 20px', maxWidth: '960px', margin: '0 auto' }}>
      <h1>Delete Data Instructions</h1>
      <p><strong>Last updated:</strong> July 1, 2026</p>

      <p>
        If you want to request the deletion of your personal data from Unitrux systems, you can follow the steps below.
      </p>

      <h2>1. Send a request by email</h2>
      <p>
        Please email <a href="mailto:info@unitrux.com">info@unitrux.com</a> with the subject: <strong>Request to Delete Personal Data</strong>.
      </p>

      <h2>2. Provide the necessary information</h2>
      <p>
        To help us verify your identity, you may provide your full name, the email address used for contact, phone number, or details about the service you previously used.
      </p>

      <h2>3. Verification and processing</h2>
      <p>
        Once we receive your request, Unitrux will verify the information and process it in accordance with applicable legal requirements and our privacy policy.
      </p>

      <h2>4. Data that may be retained</h2>
      <p>
        Some data may be retained where necessary to comply with legal obligations, resolve disputes, or protect legitimate interests of Unitrux.
      </p>

      <h2>5. Processing time</h2>
      <p>
        We will make every effort to handle your request as quickly as possible. In some cases, deletion may take additional time to complete verification and security checks.
      </p>

      <h2>6. Contact us for support</h2>
      <p>
        If you need assistance or want to follow up on your request, please contact us at <a href="mailto:info@unitrux.com">info@unitrux.com</a>.
      </p>

      <p style={{ marginTop: '32px' }}>
        <Link to="/" style={{ color: 'var(--u-accent)', textDecoration: 'none' }}>&larr; Back to Home</Link>
      </p>
    </div>
  );
};

export default DeleteData;
