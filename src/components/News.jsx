import React, { useEffect, useState } from 'react';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    // Initialize animations and effects
    initializeScrollEffects();
    initializeAnimations();
    initializeButtons();
    initializeNews();
  }, []);

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
        100% {
          transform: scale(4);
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

  const initializeNews = () => {
    const newsData = [
      {
        id: 1,
        title: 'Xu hướng Digital Marketing 2024',
        category: 'digital',
        excerpt: 'Khám phá những xu hướng digital marketing mới nhất trong năm 2024...',
        content: 'Digital marketing đang phát triển với tốc độ chóng mặt. Trong năm 2024, chúng ta sẽ thấy sự gia tăng mạnh mẽ của AI trong marketing, video content ngắn, và personalization...',
        image: '/logo-unitrux.jpg',
        date: '2024-01-15',
        author: 'Unitrux Team'
      },
      {
        id: 2,
        title: 'Cách tối ưu hóa SEO cho website',
        category: 'seo',
        excerpt: 'Hướng dẫn chi tiết về cách tối ưu hóa SEO để tăng thứ hạng website...',
        content: 'SEO là một trong những yếu tố quan trọng nhất trong digital marketing. Để tối ưu hóa SEO hiệu quả, bạn cần chú ý đến technical SEO, content quality, và link building...',
        image: '/logo-unitrux.jpg',
        date: '2024-01-10',
        author: 'SEO Expert'
      },
      {
        id: 3,
        title: 'Branding hiệu quả cho startup',
        category: 'branding',
        excerpt: 'Những bước cơ bản để xây dựng thương hiệu mạnh cho startup...',
        content: 'Branding là yếu tố quyết định sự thành công của startup. Một thương hiệu mạnh sẽ giúp startup nổi bật trong thị trường cạnh tranh...',
        image: '/logo-unitrux.jpg',
        date: '2024-01-05',
        author: 'Branding Team'
      },
      {
        id: 4,
        title: 'Web Development với React.js',
        category: 'web',
        excerpt: 'Tại sao React.js là lựa chọn tốt nhất cho web development...',
        content: 'React.js đã trở thành một trong những framework phổ biến nhất cho web development. Với component-based architecture và virtual DOM...',
        image: '/logo-unitrux.jpg',
        date: '2024-01-01',
        author: 'Dev Team'
      },
      {
        id: 5,
        title: 'Social Media Marketing 2024',
        category: 'social',
        excerpt: 'Chiến lược social media marketing hiệu quả trong năm 2024...',
        content: 'Social media marketing đang thay đổi nhanh chóng. Với sự phát triển của TikTok, Instagram Reels, và các nền tảng mới...',
        image: '/logo-unitrux.jpg',
        date: '2023-12-28',
        author: 'Social Media Team'
      },
      {
        id: 6,
        title: 'Email Marketing Automation',
        category: 'email',
        excerpt: 'Cách sử dụng email marketing automation để tăng conversion...',
        content: 'Email marketing automation là một công cụ mạnh mẽ để nuôi dưỡng leads và tăng conversion rate. Với các workflow thông minh...',
        image: '/logo-unitrux.jpg',
        date: '2023-12-25',
        author: 'Email Marketing Team'
      }
    ];

    setFilteredNews(newsData);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterNews(e.target.value, selectedCategory);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterNews(searchTerm, category);
  };

  const filterNews = (search, category) => {
    const newsData = [
      {
        id: 1,
        title: 'Xu hướng Digital Marketing 2024',
        category: 'digital',
        excerpt: 'Khám phá những xu hướng digital marketing mới nhất trong năm 2024...',
        content: 'Digital marketing đang phát triển với tốc độ chóng mặt. Trong năm 2024, chúng ta sẽ thấy sự gia tăng mạnh mẽ của AI trong marketing, video content ngắn, và personalization...',
        image: '/logo-unitrux.jpg',
        date: '2024-01-15',
        author: 'Unitrux Team'
      },
      {
        id: 2,
        title: 'Cách tối ưu hóa SEO cho website',
        category: 'seo',
        excerpt: 'Hướng dẫn chi tiết về cách tối ưu hóa SEO để tăng thứ hạng website...',
        content: 'SEO là một trong những yếu tố quan trọng nhất trong digital marketing. Để tối ưu hóa SEO hiệu quả, bạn cần chú ý đến technical SEO, content quality, và link building...',
        image: '/logo-unitrux.jpg',
        date: '2024-01-10',
        author: 'SEO Expert'
      },
      {
        id: 3,
        title: 'Branding hiệu quả cho startup',
        category: 'branding',
        excerpt: 'Những bước cơ bản để xây dựng thương hiệu mạnh cho startup...',
        content: 'Branding là yếu tố quyết định sự thành công của startup. Một thương hiệu mạnh sẽ giúp startup nổi bật trong thị trường cạnh tranh...',
        image: '/logo-unitrux.jpg',
        date: '2024-01-05',
        author: 'Branding Team'
      },
      {
        id: 4,
        title: 'Web Development với React.js',
        category: 'web',
        excerpt: 'Tại sao React.js là lựa chọn tốt nhất cho web development...',
        content: 'React.js đã trở thành một trong những framework phổ biến nhất cho web development. Với component-based architecture và virtual DOM...',
        image: '/logo-unitrux.jpg',
        date: '2024-01-01',
        author: 'Dev Team'
      },
      {
        id: 5,
        title: 'Social Media Marketing 2024',
        category: 'social',
        excerpt: 'Chiến lược social media marketing hiệu quả trong năm 2024...',
        content: 'Social media marketing đang thay đổi nhanh chóng. Với sự phát triển của TikTok, Instagram Reels, và các nền tảng mới...',
        image: '/logo-unitrux.jpg',
        date: '2023-12-28',
        author: 'Social Media Team'
      },
      {
        id: 6,
        title: 'Email Marketing Automation',
        category: 'email',
        excerpt: 'Cách sử dụng email marketing automation để tăng conversion...',
        content: 'Email marketing automation là một công cụ mạnh mẽ để nuôi dưỡng leads và tăng conversion rate. Với các workflow thông minh...',
        image: '/logo-unitrux.jpg',
        date: '2023-12-25',
        author: 'Email Marketing Team'
      }
    ];

    let filtered = newsData;

    if (search) {
      filtered = filtered.filter(news => 
        news.title.toLowerCase().includes(search.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        news.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(news => news.category === category);
    }

    setFilteredNews(filtered);
  };

  const categories = [
    { id: 'all', name: 'Tất cả', nameEn: 'All' },
    { id: 'digital', name: 'Digital Marketing', nameEn: 'Digital Marketing' },
    { id: 'seo', name: 'SEO', nameEn: 'SEO' },
    { id: 'branding', name: 'Branding', nameEn: 'Branding' },
    { id: 'web', name: 'Web Development', nameEn: 'Web Development' },
    { id: 'social', name: 'Social Media', nameEn: 'Social Media' },
    { id: 'email', name: 'Email Marketing', nameEn: 'Email Marketing' }
  ];

  return (
    <div className="news-page">
      {/* News Hero Section */}
      <section className="news-hero fade-in-section">
        <div className="container">
          <div className="news-hero-content">
            <h1 data-vi="Tin tức & Insights" data-en="News & Insights">Tin tức & Insights</h1>
            <p data-vi="Cập nhật những xu hướng mới nhất trong lĩnh vực marketing và công nghệ" data-en="Stay updated with the latest trends in marketing and technology">
              Cập nhật những xu hướng mới nhất trong lĩnh vực marketing và công nghệ
            </p>
            <div className="news-search">
              <input 
                type="text" 
                placeholder="Tìm kiếm tin tức..." 
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="search-btn">🔍</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="featured-article fade-in-section">
        <div className="container">
          <h2 data-vi="Bài viết nổi bật" data-en="Featured Article">Bài viết nổi bật</h2>
          <div className="featured-content">
            <div className="featured-image">
              <img src="/logo-unitrux.jpg" alt="Featured Article" />
            </div>
            <div className="featured-text">
              <h3>Xu hướng Digital Marketing 2024</h3>
              <p>Khám phá những xu hướng digital marketing mới nhất trong năm 2024 và cách áp dụng chúng vào chiến lược marketing của bạn.</p>
              <div className="article-meta">
                <span className="author">Unitrux Team</span>
                <span className="date">15/01/2024</span>
              </div>
              <button className="btn btn-primary">
                <span data-vi="Đọc thêm" data-en="Read More">Đọc thêm</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Marketing Content */}
      <section className="digital-marketing-content fade-in-section">
        <div className="container">
          <h2 data-vi="Digital Marketing" data-en="Digital Marketing">Digital Marketing</h2>
          <div className="dm-grid">
            <div className="dm-item">
              <div className="dm-icon">📱</div>
              <h3 data-vi="Mobile Marketing" data-en="Mobile Marketing">Mobile Marketing</h3>
              <p data-vi="Tối ưu hóa trải nghiệm người dùng trên mobile" data-en="Optimize user experience on mobile">
                Tối ưu hóa trải nghiệm người dùng trên mobile
              </p>
            </div>
            <div className="dm-item">
              <div className="dm-icon">🎯</div>
              <h3 data-vi="Targeting" data-en="Targeting">Targeting</h3>
              <p data-vi="Targeting chính xác đối tượng khách hàng" data-en="Precise customer targeting">
                Targeting chính xác đối tượng khách hàng
              </p>
            </div>
            <div className="dm-item">
              <div className="dm-icon">📊</div>
              <h3 data-vi="Analytics" data-en="Analytics">Analytics</h3>
              <p data-vi="Phân tích dữ liệu để tối ưu hóa chiến lược" data-en="Analyze data to optimize strategy">
                Phân tích dữ liệu để tối ưu hóa chiến lược
              </p>
            </div>
            <div className="dm-item">
              <div className="dm-icon">🤖</div>
              <h3 data-vi="Automation" data-en="Automation">Automation</h3>
              <p data-vi="Tự động hóa quy trình marketing" data-en="Automate marketing processes">
                Tự động hóa quy trình marketing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Categories */}
      <section className="news-categories fade-in-section">
        <div className="container">
          <h2 data-vi="Danh mục tin tức" data-en="News Categories">Danh mục tin tức</h2>
          <div className="category-tabs">
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
      </section>

      {/* News Grid */}
      <section className="news-grid-section fade-in-section">
        <div className="container">
          <h2 data-vi="Tin tức mới nhất" data-en="Latest News">Tin tức mới nhất</h2>
          <div className="news-grid">
            {filteredNews.map(article => (
              <article key={article.id} className="news-card">
                <div className="news-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="news-content">
                  <div className="news-meta">
                    <span className="category">{article.category}</span>
                    <span className="date">{article.date}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="news-author">
                    <span>By {article.author}</span>
                  </div>
                  <button className="btn btn-outline">
                    <span data-vi="Đọc thêm" data-en="Read More">Đọc thêm</span>
                  </button>
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
