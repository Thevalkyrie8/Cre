import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNews, getFeaturedNews } from '../api/client';
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

// Helper functions for news site features
const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

const shareOnSocial = (platform, url, title) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  let shareUrl = '';

  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      break;
    default:
      return;
  }

  window.open(shareUrl, '_blank', 'width=600,height=400');
};

const News = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // No local cache needed; we render from filteredNews directly
  const [filteredNews, setFilteredNews] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([{ id: 'all', name: 'Tất cả', nameEn: 'All' }]);

  useEffect(() => {
    // Initialize animations and effects
    initializeScrollEffects();
    initializeAnimations();
    initializeButtons();
    initializeNews();
  }, []); // initialize animations once

  const initializeScrollEffects = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach(el => observer.observe(el));
  };

  const initializeAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .fade-in {
        animation: fadeInUp 0.6s ease-out;
      }
      
      @keyframes ripple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
          opacity: 0;
        }
      }
      
      .ripple {
        position: relative;
        overflow: hidden;
      }
      
      .ripple::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }
      
      .ripple:active::before {
        width: 300px;
        height: 300px;
      }
    `;
    document.head.appendChild(style);
  };

  const initializeButtons = () => {
    const buttons = document.querySelectorAll('.btn, .cta-button');
    buttons.forEach(button => {
      button.classList.add('ripple');
    });
  };

  const initializeNews = useCallback(() => {
    const lang = getCurrentLanguage();

    // Load featured and list from API, fallback to current static layout if fails
    getFeaturedNews({ lang })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setFeatured(data[0]);
      })
      .catch((e) => console.error('Failed to load featured news:', e));

    // initial load
    setLoading(true);
    getNews({ lang })
      .then((list) => {
        const mapped = (Array.isArray(list) ? list : []).map(mapNewsItem);
        setFilteredNews(mapped);

        // Extract unique categories from news
        const uniqueCategories = [...new Set(mapped.map(item => item.category).filter(cat => cat))];
        const categoryObjects = uniqueCategories.map(cat => ({
          id: cat,
          name: cat,
          nameEn: cat
        }));
        const allCat = { id: 'all', name: 'Tất cả', nameEn: 'All' };
        setCategories([allCat, ...categoryObjects]);
      })
      .catch((e) => console.error('Failed to load news:', e))
      .finally(() => setLoading(false));
  }, []);

  // Kick off API loads once
  useEffect(() => {
    initializeNews();
  }, [initializeNews]);

  const mapNewsItem = (n) => ({
    id: n.id,
    title: n.title || n.titleVi,
    category: n.category || 'news',
    excerpt: n.excerpt || n.excerptVi || (n.contentVi || n.content || '').slice(0, 200) + '...',
    content: n.content || n.contentVi || '',
    image: n.image || '/logo-unitrux.jpg',
    date: n.createdAt ? new Date(n.createdAt).toISOString().slice(0, 10) : '',
    author: n.author || 'Unitrux Team'
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  // Debounced fetch from API when search/category changes
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      setLoading(true);
      const params = { lang: getCurrentLanguage() };
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (selectedCategory !== 'all') params.category = selectedCategory;
      getNews(params)
        .then((list) => {
          const mapped = (Array.isArray(list) ? list : []).map(mapNewsItem);
          setFilteredNews(mapped);
        })
        .catch((e) => console.error('Failed to filter news:', e))
        .finally(() => setLoading(false));
    }, 300); // Reduced debounce time for faster response
    return () => { clearTimeout(timeout); controller.abort(); };
  }, [searchTerm, selectedCategory]);



  return (
    <div className="news-page">
      {/* Progress bar at top when loading */}
      {loading && (
        <div className="loading-progress-bar">
          <div className="loading-progress-fill"></div>
        </div>
      )}
      {/* Page-scoped styles to enhance visuals without touching global CSS */}
      <style>{`
        .news-page {
          background: #000;
          min-height: 100vh;
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
        .news-hero {
          position: relative;
          padding: 60px 0 40px;
          overflow: hidden;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        }
        .news-hero .glow {
          position: absolute; inset: -30% -20% auto -20%; height: 80%;
          background: radial-gradient(800px 400px at 20% 10%, rgba(153,234,72,0.2), rgba(153,234,72,0.05) 40%, transparent 70%);
          filter: blur(30px);
          pointer-events: none;
          animation: pulse 4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .news-hero-title {
          font-size: 42px;
          line-height: 1.1;
          margin: 0 0 16px;
          background: linear-gradient(135deg, #99EA48 0%, #7BCF3A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          text-shadow: 0 0 30px rgba(153,234,72,0.3);
        }
        .news-hero-sub {
          opacity: .9;
          max-width: 840px;
          font-size: 18px;
          line-height: 1.6;
          color: #e0e0e0;
        }
        .news-toolbar {
          display:flex;
          gap:16px;
          align-items:center;
          margin-top:30px;
          flex-wrap: wrap;
        }
        .news-search-input {
          flex:1;
          min-width: 280px;
          padding: 16px 20px;
          border-radius: 16px;
          border:2px solid #333;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          color: #fff;
          font-size: 16px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .news-search-input:focus {
          border-color: #99EA48;
          box-shadow: 0 0 20px rgba(153,234,72,0.3);
          outline: none;
        }
        .news-search-input::placeholder { color: #888; }
        .category-tab {
          border-radius: 999px;
          border:2px solid #333;
          padding:12px 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          color: #e0e0e0;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          backdrop-filter: blur(10px);
        }
        .category-tab:hover {
          border-color: #99EA48;
          background: linear-gradient(135deg, rgba(153,234,72,0.1), rgba(153,234,72,0.05));
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(153,234,72,0.2);
        }
        .category-tab.active {
          background: linear-gradient(135deg, #99EA48, #7BCF3A);
          color:#0b0b0b;
          border-color:#99EA48;
          box-shadow: 0 0 20px rgba(153,234,72,0.4);
        }
        .featured-wrap {
          display:grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 30px;
          align-items: stretch;
          margin-top: 40px;
        }
        .featured-card {
          position: relative;
          overflow:hidden;
          border-radius: 20px;
          border:2px solid #333;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          backdrop-filter: blur(20px);
          transition: all 0.4s ease;
          cursor: pointer;
        }
        .featured-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(153,234,72,0.3), 0 0 30px rgba(153,234,72,0.2);
          border-color: rgba(153,234,72,0.5);
        }
        .featured-media {
          height: 280px;
          background:#0f0f0f;
          overflow: hidden;
          position: relative;
        }
        .featured-media img {
          width:100%;
          height:100%;
          object-fit:cover;
          transition: transform 0.4s ease;
        }
        .featured-card:hover .featured-media img {
          transform: scale(1.05);
        }
        .featured-content {
          padding: 24px;
          background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6));
        }
        .featured-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
          color: #99EA48;
        }
        .featured-author {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .featured-author img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
        .featured-reading-time {
          color: #ccc;
        }
        .featured-title {
          margin:0 0 12px;
          font-size:24px;
          font-weight: 600;
          color: #fff;
          line-height: 1.3;
        }
        .featured-content p {
          color: #ccc;
          line-height: 1.6;
          margin: 0 0 16px;
        }
        .social-share {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.3s ease;
        }
        .social-btn.facebook { background: #1877f2; color: white; }
        .social-btn.twitter { background: #1da1f2; color: white; }
        .social-btn.linkedin { background: #0077b5; color: white; }
        .social-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .news-main-content {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 40px;
          margin-top: 40px;
        }
        .news-grid {
          display:grid;
          grid-template-columns: repeat(auto-fill, minmax(320px,1fr));
          gap:24px;
        }
        .news-card {
          border:2px solid #333;
          border-radius: 16px;
          overflow:hidden;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          backdrop-filter: blur(20px);
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
        }
        .news-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(153,234,72,0.25), 0 0 25px rgba(153,234,72,0.15);
          border-color: rgba(153,234,72,0.4);
        }
        .news-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(153,234,72,0.1), transparent);
          transition: left 0.5s ease;
        }
        .news-card:hover::before {
          left: 100%;
        }
        .news-image {
          height: 180px;
          background:#0f0f0f;
          overflow: hidden;
          position: relative;
        }
        .news-image img {
          width:100%;
          height:100%;
          object-fit:cover;
          transition: transform 0.4s ease;
        }
        .news-card:hover .news-image img {
          transform: scale(1.1);
        }
        .news-content {
          padding: 20px;
          background: linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0.7));
        }
        .news-meta {
          display:flex;
          justify-content: space-between;
          align-items: center;
          font-size:13px;
          opacity:.8;
          margin-bottom:12px;
          color: #99EA48;
          font-weight: 500;
        }
        .news-meta-left {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .news-author {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .news-author img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
        }
        .news-reading-time {
          color: #ccc;
        }
        .news-content h3 {
          margin: 0 0 12px;
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
        }
        .news-content p {
          color: #ccc;
          line-height: 1.5;
          margin: 0 0 16px;
        }
        .news-card .social-share {
          margin-top: 0;
          justify-content: flex-start;
        }
        .sidebar {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border: 2px solid #333;
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(20px);
          height: fit-content;
        }
        .sidebar h3 {
          margin: 0 0 20px;
          font-size: 20px;
          color: #fff;
          font-weight: 600;
        }
        .trending-item {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #333;
        }
        .trending-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .trending-image {
          width: 80px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          background: #0f0f0f;
          flex-shrink: 0;
        }
        .trending-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .trending-content {
          flex: 1;
        }
        .trending-meta {
          font-size: 12px;
          color: #99EA48;
          margin-bottom: 4px;
        }
        .trending-title {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          line-height: 1.3;
          margin: 0;
        }
        .load-more-btn {
          display: block;
          margin: 40px auto 0;
          padding: 16px 32px;
          border-radius: 12px;
          border: 2px solid #99EA48;
          background: transparent;
          color: #99EA48;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .load-more-btn:hover {
          background: #99EA48;
          color: #0b0b0b;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(153,234,72,0.3);
        }
        .dm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-top: 20px;
        }
        .dm-item {
          padding: 24px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border: 2px solid #333;
          text-align: center;
          transition: all 0.4s ease;
          backdrop-filter: blur(20px);
        }
        .dm-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(153,234,72,0.2);
          border-color: rgba(153,234,72,0.4);
          background: linear-gradient(135deg, rgba(153,234,72,0.1), rgba(153,234,72,0.05));
        }
        .dm-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
        }
        .dm-item h3 {
          margin: 0 0 12px;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
        }
        .dm-item p {
          color: #ccc;
          line-height: 1.5;
          margin: 0;
        }
        .newsletter-section {
          padding: 60px 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          margin-top: 40px;
        }
        .newsletter-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }
        .newsletter-content h2 {
          font-size: 32px;
          margin: 0 0 16px;
          background: linear-gradient(135deg, #99EA48 0%, #7BCF3A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }
        .newsletter-content p {
          color: #ccc;
          font-size: 16px;
          margin: 0 0 30px;
          line-height: 1.6;
        }
        .newsletter-form {
          display: flex;
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
          flex-wrap: wrap;
        }
        .newsletter-form input {
          flex: 1;
          min-width: 250px;
          padding: 16px 20px;
          border-radius: 12px;
          border: 2px solid #333;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          color: #fff;
          font-size: 16px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .newsletter-form input:focus {
          border-color: #99EA48;
          box-shadow: 0 0 20px rgba(153,234,72,0.3);
          outline: none;
        }
        .newsletter-form input::placeholder { color: #888; }
        .newsletter-form button {
          padding: 16px 24px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #99EA48, #7BCF3A);
          color: #0b0b0b;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(153,234,72,0.3);
        }
        .newsletter-form button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(153,234,72,0.4);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        h2 {
          font-size: 32px;
          margin: 0 0 20px;
          background: linear-gradient(135deg, #99EA48 0%, #7BCF3A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          text-align: center;
        }
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }
        .fade-in-section.fade-in {
          opacity: 1;
          transform: translateY(0);
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
        @media (max-width: 768px) {
          .news-main-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .sidebar {
            order: -1;
          }
          .featured-wrap {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .news-hero-title {
            font-size: 36px;
          }
        }
      `}</style>

      {/* Breadcrumbs */}
      <nav className="breadcrumbs fade-in-section">
        <div className="container">
          <ol className="breadcrumb-list">
            <li><a href="/" className="breadcrumb-link">Trang chủ</a></li>
            <li className="breadcrumb-separator">/</li>
            <li><span>Tin tức</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero + Toolbar */}
      <section className="news-hero fade-in-section">
        <div className="glow"></div>
        <div className="container">
          <h1 className="news-hero-title" data-vi="Tin tức & Insights" data-en="News & Insights">Tin tức & Insights</h1>
          <p className="news-hero-sub" data-vi="Cập nhật những xu hướng mới nhất trong lĩnh vực marketing và công nghệ" data-en="Stay updated with the latest trends in marketing and technology">
            Cập nhật những xu hướng mới nhất trong lĩnh vực marketing và công nghệ
          </p>
          <div className="news-toolbar">
            <input 
              type="text" 
              className="news-search-input"
              placeholder="Tìm kiếm bài viết, chủ đề..." 
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="category-tabs" style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter(category.id)}
                >
                  <span data-vi={category.name} data-en={category.nameEn}>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {/* Divider */}
      <div className="fade-in-section" style={{height:1, background:'linear-gradient(90deg, transparent, #222, transparent)', margin:'24px 0'}}></div>

      <section className="news-grid-section fade-in-section">
        <div className="container">
          <h2 data-vi="Tin tức mới nhất" data-en="Latest News">Tin tức mới nhất</h2>
          <div className="news-grid">
            {loading && (
              <div style={{ padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="loading-spinner"></div>
              </div>
            )}
            {filteredNews.map(article => (
              <article
                key={article.id}
                className="news-card"
                onClick={() => navigate(`/news/${article.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="news-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="news-content">
                  <div className="news-meta">
                    <span className="category">{article.category}</span>
                    {article.date && <span className="date">{article.date}</span>}
                  </div>
                  <h3>{article.title}</h3>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.excerpt}</ReactMarkdown>
                  {/* <p>{article.excerpt}</p> */}
                  {/* Removed author and CTA for a cleaner, card-only layout */}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section fade-in-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 data-vi="Đăng ký nhận tin" data-en="Subscribe to Newsletter">Đăng ký nhận tin</h2>
            <p data-vi="Nhận những tin tức và insights mới nhất từ Unitrux" data-en="Get the latest news and insights from Unitrux">
              Nhận những tin tức và insights mới nhất từ Unitrux
            </p>
            <form className="newsletter-form">
              <input type="email" placeholder="Email của bạn" required />
              <button type="submit" className="btn btn-primary">
                <span data-vi="Đăng ký" data-en="Subscribe">Đăng ký</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
