import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsById } from '../api/client';
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

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState(getCurrentLanguage());

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Add preload hint for better performance
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'fetch';
        link.href = `/api/news/${id}`;
        document.head.appendChild(link);

        const data = await getNewsById(id);
        setNews(data);

        // Remove preload link after loading
        document.head.removeChild(link);
      } catch (err) {
        console.error('Failed to load news:', err);
        setError('Không thể tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
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
      <div className="news-detail-page">
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
            background: #0B63FF;
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
            border-top: 4px solid #0B63FF;
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

  if (error || !news) {
    return (
      <div className="news-detail-page">
        <div style={{ padding: '50px', textAlign: 'center', color: '#fff' }}>
          {error || 'Bài viết không tồn tại.'}
          <br />
          <button
            onClick={() => navigate('/news')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#0B63FF',
              color: '#0b0b0b',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Quay lại danh sách tin tức
          </button>
        </div>
      </div>
    );
  }

  const title = lang === 'vi' ? (news.titleVi || news.title || 'Untitled') : (news.title || news.titleVi || 'Untitled');
  const content = lang === 'vi' ? (news.contentVi || news.content || '') : (news.content || news.contentVi || '');
  const excerpt = lang === 'vi' ? (news.excerptVi || news.excerpt || '') : (news.excerpt || news.excerptVi || '');
  const image = news.image || '/logo-unitrux.jpg';
  const category = news.category || 'news';
  const date = news.createdAt ? new Date(news.createdAt).toLocaleDateString('vi-VN') : '';
  const author = news.author || 'Unitrux Team';

  return (
    <div className="news-detail-page">
      {/* Progress bar at top when loading */}
      {loading && (
        <div className="loading-progress-bar">
          <div className="loading-progress-fill"></div>
        </div>
      )}
      {/* Page-scoped styles */}
      <style>{`
        .news-detail-page {
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
          color: #0B63FF;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .breadcrumb-link:hover {
          color: #19D9FF;
        }
        .breadcrumb-separator {
          color: #666;
        }
        .news-detail-hero {
          padding: 60px 0 40px;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        }
        .news-detail-hero .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
        }
        .news-detail-title {
          font-size: 42px;
          line-height: 1.2;
          margin: 0 0 20px;
          background: linear-gradient(135deg, #0B63FF 0%, #19D9FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }
        .news-detail-meta {
          display: flex;
          justify-content: center;
          gap: 20px;
          align-items: center;
          font-size: 16px;
          color: #ccc;
          margin-bottom: 30px;
        }
        .news-detail-meta span {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .news-detail-image {
          width: 100%;
          max-width: 800px;
          height: 400px;
          object-fit: cover;
          border-radius: 16px;
          margin: 0 auto 40px;
          display: block;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .news-detail-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px 60px;
          line-height: 1.8;
          font-size: 18px;
          color: #e0e0e0;
        }
        .news-detail-content h2 {
          color: #0B63FF;
          margin: 40px 0 20px;
          font-size: 28px;
          font-weight: 600;
        }
        .news-detail-content h3 {
          color: #0B63FF;
          margin: 30px 0 15px;
          font-size: 24px;
          font-weight: 600;
        }
        .news-detail-content p {
          margin-bottom: 20px;
        }
        .news-detail-content ul, .news-detail-content ol {
          margin: 20px 0;
          padding-left: 30px;
        }
        .news-detail-content li {
          margin-bottom: 10px;
        }
        .back-button {
          display: inline-block;
          margin-bottom: 40px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #0B63FF, #19D9FF);
          color: #0b0b0b;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(11, 99, 255, 0.3);
        }
        @media (max-width: 768px) {
          .news-detail-title {
            font-size: 32px;
          }
          .news-detail-meta {
            flex-direction: column;
            gap: 10px;
          }
          .news-detail-image {
            height: 250px;
          }
          .news-detail-content {
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
            <li><a href="/news" className="breadcrumb-link">Tin tức</a></li>
            <li className="breadcrumb-separator">/</li>
            <li><span>{title}</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="news-detail-hero">
        <div className="container">
          <h1 className="news-detail-title">{title}</h1>
          <div className="news-detail-meta">
            <span>📅 {date}</span>
            <span>👤 {author}</span>
            <span>🏷️ {category}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="news-detail-content">
        <a href="/news" className="back-button">← back news</a>
        <img src={image} alt={title} className="news-detail-image" />
        {excerpt && (
          <p style={{ fontSize: '20px', fontStyle: 'italic', color: '#ccc', marginBottom: '30px' }}>
            {excerpt}
          </p>
        )}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </section>
    </div>
  );
};

export default NewsDetail;
