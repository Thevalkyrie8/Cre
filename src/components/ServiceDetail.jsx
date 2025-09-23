import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById } from '../api/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Helper function to get current language
const getCurrentLanguage = () => {
  try {
    return localStorage.getItem('language') || 'en';
  } catch {
    return 'en';
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState(getCurrentLanguage());

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await getServiceById(id);
        setService(data);
      } catch (err) {
        console.error('Failed to load service:', err);
        setError('Không thể tải dịch vụ. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setLang(getCurrentLanguage());
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  if (loading) {
    return (
      <div className="service-detail-page">
        {/* Progress bar at top */}
        <div className="loading-progress-bar">
          <div className="loading-progress-fill"></div>
        </div>
        <div style={{ padding: '50px', textAlign: 'center', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="loading-spinner"></div>
        </div>
        <style>{`
          .loading-progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #333;
            z-index: 1000;
            overflow: hidden;
          }
          .loading-progress-fill {
            height: 100%;
            background: #99EA48;
            width: 30%;
            animation: loadingProgress 1.5s ease-in-out infinite;
          }
          @keyframes loadingProgress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #333;
            border-top: 4px solid #99EA48;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="service-detail-page">
        <div style={{ padding: '50px', textAlign: 'center', color: '#fff' }}>
          {error || 'Dịch vụ không tồn tại.'}
          <br />
          <button
            onClick={() => navigate('/services')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#99EA48',
              color: '#0b0b0b',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Quay lại danh sách dịch vụ
          </button>
        </div>
      </div>
    );
  }

  const title = lang === 'vi' ? (service.nameVi || service.name || 'Untitled') : (service.name || service.nameVi || 'Untitled');
  const description = lang === 'vi' ? (service.descriptionVi || service.description || '') : (service.description || service.descriptionVi || '');
  const features = lang === 'vi' ? (service.featuresVi || service.features || []) : (service.features || service.featuresVi || []);
  const image = service.icon ? service.icon : '/logo-unitrux.jpg';
  const category = service.category || 'service';
  const date = service.createdAt ? new Date(service.createdAt).toLocaleDateString('vi-VN') : '';
  const author = service.author || 'Unitrux Team';

  // Create content from description and features
  const content = `${description}\n\n${features.length > 0 ? `## Key Features\n\n${features.map(feature => `- ${feature}`).join('\n')}` : ''}`;

  return (
    <div className="service-detail-page">
      {/* Progress bar at top when loading */}
      {loading && (
        <div className="loading-progress-bar">
          <div className="loading-progress-fill"></div>
        </div>
      )}
      {/* Page-scoped styles */}
      <style>{`
        .service-detail-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: #fff;
        }
        .breadcrumbs {
          padding: 20px 0;
          background: #0a0a0a;
          border-bottom: 1px solid #333;
        }
        .breadcrumbs .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .breadcrumb-list {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 14px;
          color: #ccc;
        }
        .breadcrumb-link {
          color: #99EA48;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .breadcrumb-link:hover {
          color: #7BCF3A;
        }
        .breadcrumb-separator {
          color: #666;
        }
        .service-detail-hero {
          padding: 60px 0 40px;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        }
        .service-detail-hero .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
        }
        .service-detail-title {
          font-size: 42px;
          line-height: 1.2;
          margin: 0 0 20px;
          background: linear-gradient(135deg, #99EA48 0%, #7BCF3A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }
        .service-detail-meta {
          display: flex;
          justify-content: center;
          gap: 20px;
          align-items: center;
          font-size: 16px;
          color: #ccc;
          margin-bottom: 30px;
        }
        .service-detail-meta span {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .service-detail-image {
          width: 100%;
          max-width: 800px;
          height: 400px;
          object-fit: cover;
          border-radius: 16px;
          margin: 0 auto 40px;
          display: block;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .service-detail-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px 60px;
          line-height: 1.8;
          font-size: 18px;
          color: #e0e0e0;
        }
        .service-detail-content h2 {
          color: #99EA48;
          margin: 40px 0 20px;
          font-size: 28px;
          font-weight: 600;
        }
        .service-detail-content h3 {
          color: #99EA48;
          margin: 30px 0 15px;
          font-size: 24px;
          font-weight: 600;
        }
        .service-detail-content p {
          margin-bottom: 20px;
        }
        .service-detail-content ul, .service-detail-content ol {
          margin: 20px 0;
          padding-left: 30px;
        }
        .service-detail-content li {
          margin-bottom: 10px;
        }
        .back-button {
          display: inline-block;
          margin-bottom: 40px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #99EA48, #7BCF3A);
          color: #0b0b0b;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(153,234,72,0.3);
        }
        @media (max-width: 768px) {
          .service-detail-title {
            font-size: 32px;
          }
          .service-detail-meta {
            flex-direction: column;
            gap: 10px;
          }
          .service-detail-image {
            height: 250px;
          }
          .service-detail-content {
            font-size: 16px;
            padding: 0 15px 40px;
          }
        }
      `}</style>

      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <div className="container">
          <ol className="breadcrumb-list">
            <li><a href="/" className="breadcrumb-link">Trang chủ</a></li>
            <li className="breadcrumb-separator">/</li>
            <li><a href="/services" className="breadcrumb-link">Dịch vụ</a></li>
            <li className="breadcrumb-separator">/</li>
            <li><span>{title}</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="service-detail-hero">
        <div className="container">
          <h1 className="service-detail-title">{title}</h1>
          <div className="service-detail-meta">
            <span>📅 {date}</span>
            <span>👤 {author}</span>
            <span>🏷️ {category}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="service-detail-content">
        <a href="/services" className="back-button">← back services</a>
        <div style={{
          fontSize: '120px',
          textAlign: 'center',
          marginBottom: '40px',
          filter: 'drop-shadow(0 0 20px rgba(153,234,72,0.3))'
        }}>
          {service.icon || '✨'}
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </section>
    </div>
  );
};

export default ServiceDetail;
