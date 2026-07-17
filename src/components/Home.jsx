import React, { useEffect, useState, useCallback } from 'react';
import { getProducts } from '../api/client';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import NewsSection from './NewsSection';
import HeroShowcase from './HeroShowcase';
import WhyChooseUs from './WhyChooseUs';

const NeonIcon = ({ type }) => {
  const paths = {
    web: (
      <>
        <rect x="4" y="6" width="40" height="28" rx="4" />
        <path d="M8 14h32M18 42h12M15 42h18M14 22h8M14 28h16" />
      </>
    ),
    mobile: (
      <>
        <rect x="15" y="4" width="18" height="40" rx="5" />
        <path d="M21 10h6M23.5 38h1" />
      </>
    ),
    design: (
      <>
        <path d="M10 34l4 4 22-22-4-4L10 34z" />
        <path d="M30 14l4 4M12 36l-2 8 8-2M30 8l10 10" />
      </>
    ),
    growth: (
      <>
        <path d="M8 36h32M12 32V22M22 32V16M33 32V10" />
        <path d="M10 18l9-7 8 5 11-12M38 4v9h-9" />
      </>
    ),
    rocket: (
      <>
        <path d="M25 5c8 3 13 11 14 22l-9 9c-11-1-19-6-22-14l9-2 6-6 2-9z" />
        <path d="M18 30l-6 6M28 14h.1M13 35l-5 5" />
      </>
    ),
    idea: (
      <>
        <path d="M24 6a13 13 0 0 0-8 23v5h16v-5A13 13 0 0 0 24 6z" />
        <path d="M18 40h12M20 45h8M24 1v3M8 9l3 3M40 9l-3 3" />
      </>
    ),
    target: (
      <>
        <circle cx="24" cy="24" r="17" />
        <circle cx="24" cy="24" r="9" />
        <circle cx="24" cy="24" r="2" />
        <path d="M34 14l7-7M37 7h4v4" />
      </>
    ),
    chart: (
      <>
        <path d="M8 38h32M13 32v-9M23 32V14M33 32V20" />
        <path d="M12 16l10-7 8 8 9-11" />
      </>
    ),
    support: (
      <>
        <path d="M10 28v-5a14 14 0 0 1 28 0v5" />
        <path d="M10 28a5 5 0 0 0 5 5h2V21h-2a5 5 0 0 0-5 5v2zM38 28a5 5 0 0 1-5 5h-2V21h2a5 5 0 0 1 5 5v2z" />
        <path d="M30 38c-2 2-4 3-7 3" />
      </>
    ),
    cost: (
      <>
        <circle cx="24" cy="24" r="17" />
        <path d="M24 13v22M30 17c-2-2-10-3-11 2-1 4 4 5 8 6 6 2 5 9-1 10-4 1-8-1-10-3" />
      </>
    )
  };

  return (
    <svg className="neon-icon-svg" viewBox="0 0 48 48" aria-hidden="true">
      {paths[type]}
    </svg>
  );
};

const Home = () => {
  const [testimonialTab, setTestimonialTab] = useState('web');
  const [testimonialCards, setTestimonialCards] = useState([]);
  const [caseStudyProducts, setCaseStudyProducts] = useState([]);

  const initializeTestimonialTabs = useCallback(() => {
    // Initialize with random 3 testimonials from web category
    const allTestimonials = getAllTestimonials();
    const webTestimonials = allTestimonials.filter(t => t.category === 'web');
    const shuffled = webTestimonials.sort(() => 0.5 - Math.random());
    setTestimonialCards(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    // Initialize testimonials
    try {
      initializeTestimonialTabs();
    } catch (error) {
      console.error('Error initializing testimonials:', error);
    }
  }, [initializeTestimonialTabs]);

  // Load dynamic case studies from products API but keep visuals
  useEffect(() => {
    let isMounted = true;
    getProducts({ category: '3d-animation' })
      .then((data) => {
        if (!isMounted) return;
        const items = Array.isArray(data) ? data : [];
        const sorted = items.sort((a, b) => (a?.sortOrder || 0) - (b?.sortOrder || 0));
        setCaseStudyProducts(sorted.slice(0, 3));
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Failed to load case study products:', err);
      });
    return () => { isMounted = false; };
  }, []);


  const getAllTestimonials = () => {
    return [
      // Web & App testimonials
      { id: 1, category: 'web', name: 'Nguyen Van Minh', company: 'Vietnam – Furniture SME', content: 'Unitrux rebuilt our old website into a modern e-commerce platform. They redesigned the UI, optimized UX, and added a secure payment gateway. After launching, our online sales nearly doubled within two months. The team worked fast, communicated clearly, and delivered exactly what we needed.' },
      { id: 2, category: 'web', name: 'Sarah Johnson', company: 'USA – Startup, E-commerce', content: 'Unitrux developed our custom Shopify store with Amazon FBA integration and PayPal checkout. The best part is the admin dashboard they built, which saves our team hours of manual work every week. They\'re not just developers; they\'re real growth partners.' },
      
      // E-commerce testimonials
      { id: 3, category: 'ecommerce', name: 'Tran Hoai An', company: 'Vietnam – Amazon Handmade Seller', content: 'I sell handicrafts on Amazon but struggled with product listings and images. Unitrux handled professional product photography, edited all visuals to Amazon\'s standard, and rewrote my listings with SEO optimization. Within 3 weeks, my products ranked on the first search page, and sales grew significantly.' },
      { id: 4, category: 'ecommerce', name: 'Elena Rossi', company: 'Italy – Etsy Seller', content: 'They helped me restructure my Etsy shop with new product images, optimized titles and descriptions, and even suggested bundle promotions. My sales increased by 40% in just one month. Their proactive updates and transparent reports gave me full confidence.' },
      
      // Marketing testimonials
      { id: 5, category: 'marketing', name: 'Le Thi Huong', company: 'Vietnam – Skincare Brand', content: 'Unitrux managed our Facebook and Instagram pages, creating content calendars, eye-catching visuals, and targeted ad campaigns for young women. The results: over 15,000 new organic followers in two months, and our ad cost per conversion dropped compared to before.' },
      { id: 6, category: 'marketing', name: 'James Walker', company: 'Australia – Fashion Retailer', content: 'The team produced short TikTok and Instagram Reels ads for our campaign. Creative transitions, trendy music, and clear branding made a huge difference. The videos reached 300,000+ views and delivered excellent ROI. They truly understand social media trends.' },
      
      // Automation testimonials
      { id: 7, category: 'automation', name: 'Pham Quoc Huy', company: 'Vietnam – Education Services', content: 'Unitrux integrated a CRM system and automated email marketing for our training center. Now every new student receives welcome emails and class schedules automatically. Our sales team saved 70% of the time previously spent on manual data entry. They also trained our staff to manage the system afterward.' },
      { id: 8, category: 'automation', name: 'Olivia Chen', company: 'Canada – Online Store Owner', content: 'They built a Messenger chatbot that answers 70% of our customer inquiries. It handles FAQs, order tracking, and forwards complex cases to our support team. This drastically reduced our customer service workload and improved response time.' },
      
      // Affiliate testimonials
      { id: 9, category: 'affiliate', name: 'Tran Bao Long', company: 'Vietnam – Local Fashion Brand', content: 'Unitrux set up our affiliate marketing system, onboarded micro-influencers, and designed all the promotional banners. They provided weekly performance reports and sales tracking. Thanks to this, we gained many new customers through affiliates with very cost-effective results.' },
      { id: 10, category: 'affiliate', name: 'Rachel Lim', company: 'Singapore – Tech Startup', content: 'We worked with Unitrux on an influencer + affiliate campaign across Instagram, Facebook, and TikTok. They handled influencer negotiations, content approvals, and ROI tracking. The campaign delivered 3x return, and we\'re already planning our next projects with them.' },
      
      // Photography testimonials
      { id: 11, category: 'photo', name: 'Nguyen Thu Trang', company: 'Vietnam – Handmade Jewelry Brand', content: 'Unitrux created a full product photography set for my jewelry collection. The lighting, background setup, and editing made my items look premium and consistent across all platforms. They also shot short promo videos for Instagram which brought immediate engagement and new followers.' },
      { id: 12, category: 'photo', name: 'David Kim', company: 'South Korea – Electronics Startup', content: 'We hired Unitrux for product videography. They filmed our gadgets with smooth gimbal shots and close-up angles, then edited with sleek motion graphics. The final video looked like a high-budget commercial and helped us secure new retail partners.' },
      
      // 3D testimonials
      { id: 13, category: '3d', name: 'Pham Thanh Binh', company: 'Vietnam – Furniture Manufacturer', content: 'Unitrux produced a 3D animation video to showcase our new sofa design. The video highlighted every detail, from texture to mechanism, making it easy for international buyers to understand. It was far more effective than static images in our sales presentations.' },
      { id: 14, category: '3d', name: 'Anna Müller', company: 'Germany – Healthcare Tech Company', content: 'They created a 3D explainer animation for our medical device. The visuals were clean, scientifically accurate, and easy to understand for doctors and patients. The animation was used at trade shows and received excellent feedback from professionals.' },
      { id: 15, category: '3d', name: 'Tran Quoc Duy', company: 'Vietnam – Real Estate Developer', content: 'Unitrux designed 3D architectural models for our new housing project. The renders looked realistic, with detailed textures and lighting. Thanks to these visuals, our sales team closed deals faster because clients could \'see\' the project before it was built.' },
      { id: 16, category: '3d', name: 'Emily Parker', company: 'UK – Product Designer', content: 'They modeled our prototype into 3D for pre-launch marketing. The renders looked so real that customers thought the product was already manufactured. It allowed us to start advertising and collecting pre-orders months ahead of actual production.' },
      
      // UI/UX Design testimonials
      { id: 17, category: 'UI-UX', name: 'Emma Clark', company: 'UK – SaaS Startup', content: 'Unitrux completely redesigned our website\'s UI/UX and the difference was night and day. The navigation became intuitive, the layout more , and our bounce rate dropped by half within the first month.' },
      { id: 18, category: 'UI-UX', name: 'Mika Tanaka', company: 'Japan – E-learning Platform', content: 'Their UX audit uncovered issues we didn\'t even notice. After implementing the new flows, user satisfaction scores went up dramatically. Simple, clean, and effective design.' },
      { id: 19, category: 'UI-UX', name: 'Lucas Brown', company: 'Australia – Fintech App', content: 'Great team for UI/UX. They listened to our needs, delivered wireframes quickly, and the final app design was both sleek and user-friendly.' },
      
      // Video Editing testimonials
      { id: 20, category: 'video-editing', name: 'Daniel Lee', company: 'Singapore – Digital Agency', content: 'We needed fast, high-quality video edits for our ad campaigns. The Unitrux team delivered polished videos with smooth transitions, captions, and brand-consistent effects.' },
      { id: 21, category: 'video-editing', name: 'Anna Petrova', company: 'Russia – Fitness Influencer', content: 'I send them raw clips every week, and they always turn it into engaging reels. My follower engagement grew by 40% in two months.' },
      { id: 22, category: 'video-editing', name: 'Michael Johnson', company: 'USA – Non-profit Org', content: 'They helped us tell our story through video. Professional cuts, meaningful pacing, and attention to detail. It moved our audience and increased donations.' },
      
      // Product Photography / Shooting testimonials
      { id: 23, category: 'shooting', name: 'Isabella Martinez', company: 'Spain – Online Fashion Brand', content: 'As an online fashion retailer, product images are everything. Unitrux handled our photoshoots and delivered high-resolution pictures that boosted our sales.' },
      { id: 24, category: 'shooting', name: 'Chen Wei', company: 'China – Electronics Seller', content: 'They set up a full product shoot with lighting and angles that highlighted every detail. Our Amazon listing conversions went up instantly.' },
      { id: 25, category: 'shooting', name: 'Sofia Rossi', company: 'Italy – Handmade Jewelry Shop', content: 'Beautiful product photos, exactly what we needed for Instagram and our store. Elegant style, natural lighting, and quick delivery.' }
    ];
  };

  const handleTestimonialTabChange = (category) => {
    setTestimonialTab(category);
    const allTestimonials = getAllTestimonials();
    const filtered = allTestimonials.filter(t => t.category === category);
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    setTestimonialCards(shuffled.slice(0, 3));
  };

  return (
    <div className="home">
      <HeroShowcase />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background parallax">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content-wrapper">
            <div className="hero-content fade-in-section">
                <div className="hero-badge">
                  <span data-en="Digital Growth Experts" data-vi="Chuyên Gia Tăng Trưởng Số">
                   Digital Growth Experts
                  </span>
                </div>
              <h1 data-en="Innovative Solutions Exceptional Results" data-vi="Giải Pháp Sáng Tạo Kết Quả Vượt Trội">
              Innovative Solutions Exceptional Results
              </h1>
              <p data-en="We build websites, e-commerce systems, content assets, and marketing campaigns that help businesses launch faster, sell better, and measure what is working." data-vi="Chúng tôi xây dựng website, hệ thống thương mại điện tử, nội dung và chiến dịch marketing giúp doanh nghiệp ra mắt nhanh hơn, bán tốt hơn và đo lường rõ hơn.">
              We build websites, e-commerce systems, content assets, and marketing campaigns that help businesses launch faster, sell better, and measure what is working.
              </p>
              <div className="hero-buttons">
                <Link  to="https://drive.google.com/drive/folders/1C-WjM-Y4mBzHvfX1Mpvo5Vmd_rgXK3MQ" className="btn btn-primary">
                  <span data-en="View Our Success Stories" data-vi="Xem Câu Chuyện Thành Công">View Our Success Stories</span>
                </Link>
                <button onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }} className="btn btn-secondary">
                  <span data-en="Get Free Consultation" data-vi="Nhận Tư Vấn Miễn Phí">Get Free Consultation</span>
                </button>
              </div>
            </div>
            
            <div className="services-hero-visual">
              <div className="poster-panel" aria-hidden="true">
                <div className="poster-panel-top"><span></span><span></span><span></span></div>
                <div className="poster-panel-grid"><i></i><i></i><i></i><i></i></div>
                <div className="poster-panel-chart"><span></span><span></span><span></span><span></span></div>
              </div>
              <div className="floating-cards">
                <div className="floating-card card-1">
                  <div className="card-icon"><NeonIcon type="web" /></div>
                  <span data-en="Web Development" data-vi="Phát triển Web">Web Development</span>
                </div>
                <div className="floating-card card-2">
                  <div className="card-icon"><NeonIcon type="mobile" /></div>
                  <span data-en="Mobile Apps" data-vi="Ứng dụng Di động">Mobile Apps</span>
                </div>
                <div className="floating-card card-3">
                  <div className="card-icon"><NeonIcon type="design" /></div>
                  <span data-en="UI/UX Design" data-vi="Thiết kế UI/UX">UI/UX Design</span>
                </div>
                <div className="floating-card card-4">
                  <div className="card-icon"><NeonIcon type="growth" /></div>
                  <span data-en="Digital Marketing" data-vi="Tiếp thị Số">Digital Marketing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsSection />

      <WhyChooseUs />

      {/* Why Choose Us Section */}
      <section className="why-choose-us fade-in-section">
        <div className="container">
          <div className="section-header">
              <div className="section-badge">
                <span data-en="Why Choose Us" data-vi="Tại sao chọn chúng tôi">Why Choose Us</span>
              </div>
            <h2 data-en="What Value Do We Bring to Your Business?" data-vi="Chúng tôi mang lại giá trị gì cho doanh nghiệp của bạn?">What Value Do We Bring to Your Business?</h2>
            <p data-en="What Makes Us Your Ideal Digital Partner" data-vi="Điều Gì Làm Chúng Tôi Trở Thành Đối Tác Kỹ Thuật Số Lý Tưởng Của Bạn">
            What Makes Us Your Ideal Digital Partner
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><NeonIcon type="rocket" /></div>
              <h3 data-en="Rapid Growth" data-vi="Tăng trưởng nhanh chóng">Rapid Growth</h3>
              <p data-en="We help businesses grow revenue by 300% in the first 6 months through optimized marketing strategies." data-vi="Chúng tôi giúp doanh nghiệp tăng trưởng doanh thu 300% trong 6 tháng đầu tiên thông qua các chiến lược marketing được tối ưu hóa.">
                We help businesses grow revenue by 300% in the first 6 months through optimized marketing strategies.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><NeonIcon type="idea" /></div>
              <h3 data-en="Creative & Unique" data-vi="Sáng tạo và độc đáo">Creative & Unique</h3>
              <p data-en="Each of our marketing strategies is uniquely designed to fit the characteristics and goals of each business." data-vi="Mỗi chiến lược marketing của chúng tôi đều được thiết kế riêng biệt, phù hợp với đặc thù và mục tiêu của từng doanh nghiệp.">
                Each of our marketing strategies is uniquely designed to fit the characteristics and goals of each business.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><NeonIcon type="target" /></div>
              <h3 data-en="Precise Targeting" data-vi="Targeting chính xác">Precise Targeting</h3>
              <p data-en="Using data and deep analysis to accurately identify target customers, maximizing advertising effectiveness." data-vi="Sử dụng dữ liệu và phân tích sâu để xác định chính xác đối tượng khách hàng mục tiêu, tối đa hóa hiệu quả quảng cáo.">
                Using data and deep analysis to accurately identify target customers, maximizing advertising effectiveness.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><NeonIcon type="chart" /></div>
              <h3 data-en="Transparent Reporting" data-vi="Báo cáo minh bạch">Transparent Reporting</h3>
              <p data-en="Provide detailed and transparent reports on the effectiveness of each marketing campaign, helping you track ROI clearly." data-vi="Cung cấp báo cáo chi tiết và minh bạch về hiệu quả của từng chiến dịch marketing, giúp bạn theo dõi ROI một cách rõ ràng.">
                Provide detailed and transparent reports on the effectiveness of each marketing campaign, helping you track ROI clearly.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><NeonIcon type="support" /></div>
              <h3 data-en="24/7 Support" data-vi="Hỗ trợ 24/7">24/7 Support</h3>
              <p data-en="Our team of experts is always ready to support you 24/7, ensuring all issues are resolved quickly." data-vi="Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7, đảm bảo mọi vấn đề được giải quyết nhanh chóng.">
                Our team of experts is always ready to support you 24/7, ensuring all issues are resolved quickly.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><NeonIcon type="cost" /></div>
              <h3 data-en="Reasonable Cost" data-vi="Chi phí hợp lý">Reasonable Cost</h3>
              <p data-en="Provide service packages at competitive prices, suitable for businesses of all sizes." data-vi="Cung cấp các gói dịch vụ với mức giá cạnh tranh, phù hợp với ngân sách của mọi quy mô doanh nghiệp.">
                Provide service packages at competitive prices, suitable for businesses of all sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section fade-in-section">
        <div className="container">
          <div className="about-container">
            <div className="about-content">
              <div className="about-badge">
                <span data-en="About Us" data-vi="Về chúng tôi">About Us</span>
              </div>
              <h2 className="about-title" data-en="Your Partner in Digital Growth" data-vi="Đối tác của bạn trong tăng trưởng số">Your Partner in Digital Growth</h2>
              <p className="about-description" data-en="Unitrux is your trusted partner for E-commerce growth, Website design, and Digital Marketing solutions. We provide full Amazon seller support to help individuals and SMEs build their brand, optimize sales, and expand globally. With creative strategies and professional services, Unitrux empowers your business to thrive in the digital age." data-vi="Unitrux là đối tác tin cậy của bạn cho tăng trưởng thương mại điện tử, thiết kế website và giải pháp tiếp thị số. Chúng tôi cung cấp hỗ trợ đầy đủ cho người bán Amazon để giúp các cá nhân và doanh nghiệp vừa và nhỏ xây dựng thương hiệu, tối ưu hóa doanh số và mở rộng toàn cầu. Với các chiến lược sáng tạo và dịch vụ chuyên nghiệp, Unitrux trao quyền cho doanh nghiệp của bạn phát triển mạnh trong thời đại số.">
                Unitrux is your trusted partner for E-commerce growth, Website design, and Digital Marketing solutions. We provide full Amazon seller support to help individuals and SMEs build their brand, optimize sales, and expand globally. With creative strategies and professional services, Unitrux empowers your business to thrive in the digital age.
              </p>
            </div>
            
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-highlight"></div>
                <div className="stat-number" data-en="24/7" data-vi="24/7">24/7</div>
                <div className="stat-label" data-en="support" data-vi="hỗ trợ">support</div>
              </div>
              <div className="stat-card">
                <div className="stat-highlight"></div>
                <div className="stat-number" data-en="Fair" data-vi="Công bằng">Fair</div>
                <div className="stat-label" data-en="Price" data-vi="Giá cả">Price</div>
              </div>
              <div className="stat-card">
                <div className="stat-highlight"></div>
                <div className="stat-number" data-en="Professional" data-vi="Chuyên nghiệp">Professional</div>
                <div className="stat-label" data-en="Staff" data-vi="Nhân viên">Staff</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="features-list-section">
        <div className="features-scroll-container">
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">Conversion-focused websites</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">E-commerce operations</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">Campaign reporting</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">Product photo and video</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">Automation support</span>
            </div>
            
            {/* Duplicate content for seamless loop */}
            <div className="feature-item">
              <div className="feature-check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">Conversion-focused websites</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">E-commerce operations</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">Campaign reporting</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">Product photo and video</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">Automation support</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="feature-text">Product photo and video</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section fade-in-section">
        <div className="services-bg">
          <div className="bg-blur-1"></div>
          <div className="bg-blur-2"></div>
          <div className="bg-blur-3"></div>
        </div>
        
        <div className="services-container">
          <div className="section-header">
            <div className="section-badge">
              <span data-en="Our Services" data-vi="Dịch vụ của chúng tôi">Our Services</span>
            </div>
            <h2 className="section-title" data-en="Digital Solutions That Drive Growth" data-vi="Giải pháp số thúc đẩy tăng trưởng">Digital Solutions That Drive Growth</h2>
            <p className="section-description" data-en="Explore our comprehensive range of services designed to elevate your business in the digital landscape" data-vi="Khám phá loạt dịch vụ toàn diện của chúng tôi được thiết kế để nâng cao doanh nghiệp của bạn trong lĩnh vực số">Explore our comprehensive range of services designed to elevate your business in the digital landscape</p>          
          </div>
          
          <div className="services-grid">
            <div className="service-card service-card--chatbox">
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 14.5C20 17.54 16.42 20 12 20c-1.02 0-2-.13-2.9-.38L4 21l1.48-3.7C4.55 16.5 4 15.54 4 14.5 4 11.46 7.58 9 12 9s8 2.46 8 5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 14.5h.01M12 14.5h.01M15 14.5h.01M15.5 3l.55 1.45L17.5 5l-1.45.55L15.5 7l-.55-1.45L13.5 5l1.45-.55L15.5 3ZM20 5.5l.32.82.82.32-.82.32L20 7.8l-.32-.84-.82-.32.82-.32L20 5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="service-content">
                <h3 className="service-title" data-en="Chatbox AI Integration" data-vi="Tích hợp Chatbox AI">Chatbox AI Integration</h3>
                <p className="service-description" data-en="AI-powered customer support connected across Fanpage, Zalo, and your website" data-vi="Trợ lý AI chăm sóc khách hàng được kết nối đồng bộ trên Fanpage, Zalo và website">AI-powered customer support connected across Fanpage, Zalo, and your website</p>
                <ul className="service-features">
                  <li data-en="Facebook Fanpage Integration" data-vi="Tích hợp Facebook Fanpage">Facebook Fanpage Integration</li>
                  <li data-en="Zalo OA Automation" data-vi="Tự động hóa Zalo OA">Zalo OA Automation</li>
                  <li data-en="Website AI Assistant" data-vi="Trợ lý AI trên website">Website AI Assistant</li>
                </ul>
                <Link to="/chatbox-ai" className="btn-learn-more">
                  <span data-en="Learn More" data-vi="Tìm hiểu thêm">Learn More</span>
                </Link>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 8H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 16H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="service-content">
                <h3 className="service-title" data-en="Web Development" data-vi="Phát triển Web">Web Development</h3>
                <p className="service-description" data-en="Custom websites, web applications, and operational systems tailored to your business needs" data-vi="Website tùy chỉnh, ứng dụng web và hệ thống vận hành được thiết kế phù hợp với nhu cầu doanh nghiệp của bạn">Custom websites, web applications, and operational systems tailored to your business needs</p>
                <ul className="service-features">
                  <li>E-commerce & Service Websites</li>
                  <li>Management Web Applications</li>
                  <li>Automation Systems</li>
                </ul>
                <Link to="/web-development" className="btn-learn-more">
                  <span data-en="Learn More" data-vi="Tìm hiểu thêm">Learn More</span>
                </Link>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="service-content">
                <h3 className="service-title" data-en="E-commerce Solutions" data-vi="Giải pháp Thương mại Điện tử">E-commerce Solutions</h3>
                <p className="service-description" data-en="Comprehensive services for online sellers on major platforms like Amazon, Etsy, and Shopee" data-vi="Dịch vụ toàn diện cho người bán online trên các nền tảng lớn như Amazon, Etsy và Shopee">Comprehensive services for online sellers on major platforms like Amazon, Etsy, and Shopee</p>
                <ul className="service-features">
                  <li>Store Setup & Brand Building</li>
                  <li>SEO & Listing Optimization</li>
                  <li>Product Photography & Design</li>
                </ul>
                <Link to="/ecommerce" className="btn-learn-more">
                  <span data-en="Learn More" data-vi="Tìm hiểu thêm">Learn More</span>
                </Link>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="service-content">
                <h3 className="service-title" data-en="Digital Marketing" data-vi="Tiếp thị Số">Digital Marketing</h3>
                <p className="service-description" data-en="All-in-one marketing solutions to boost your online presence and drive conversions" data-vi="Giải pháp tiếp thị toàn diện để tăng cường sự hiện diện online và thúc đẩy chuyển đổi">All-in-one marketing solutions to boost your online presence and drive conversions</p>
                <ul className="service-features">
                  <li>Social Media Management</li>
                  <li>Targeted Ad Campaigns</li>
                  <li>Video Content Production</li>
                </ul>
                <Link to="/digital-marketing" className="btn-learn-more">
                  <span data-en="Learn More" data-vi="Tìm hiểu thêm">Learn More</span>
                </Link>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="service-content">
                <h3 className="service-title" data-en="Automation Systems" data-vi="Hệ thống Tự động hóa">Automation Systems</h3>
                <p className="service-description" data-en="Streamline your business operations with intelligent automation solutions" data-vi="Tối ưu hóa hoạt động kinh doanh với các giải pháp tự động hóa thông minh">Streamline your business operations with intelligent automation solutions</p>
                <ul className="service-features">
                  <li>CRM Integration & Setup</li>
                  <li>Email Marketing Automation</li>
                  <li>Chatbot Development</li>
                </ul>
                <Link to="/automation" className="btn-learn-more">
                  <span data-en="Learn More" data-vi="Tìm hiểu thêm">Learn More</span>
                </Link>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H7L9 5H21C21.5304 5 22.0391 5.21071 22.4142 5.58579C22.7893 5.96086 23 6.46957 23 7V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="service-content">
                <h3 className="service-title" data-en="Photography & Video" data-vi="Chụp ảnh & Video">Photography & Video</h3>
                <p className="service-description" data-en="Professional photography and video services for websites, social media & e-commerce marketplaces" data-vi="Dịch vụ chụp ảnh và video chuyên nghiệp cho website, mạng xã hội & sàn TMĐT">Professional photography and video services for websites, social media & e-commerce marketplaces</p>
                <ul className="service-features">
                  <li>Product Photography & Design</li>
                  <li>Corporate & Product Videos</li>
                  <li>Social Media Content</li>
                </ul>
                <Link to="/photography-video" className="btn-learn-more">
                  <span data-en="Learn More" data-vi="Tìm hiểu thêm">Learn More</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section fade-in-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span data-vi="Client Testimonials" data-en="Client Testimonials">Client Testimonials</span>
            </div>
            <h2 data-vi="What Our Clients Say" data-en="What Our Clients Say">What Our Clients Say</h2>
            <h3 data-vi="Real feedback from businesses we've helped succeed" data-en="Real feedback from businesses we've helped succeed">Real feedback from businesses we've helped succeed</h3>
          </div>
          
          {/* Tabs */}
          <div className="testimonial-tabs">
            <button 
              className={`tab-button ${testimonialTab === 'web' ? 'active' : ''}`}
              onClick={() => handleTestimonialTabChange('web')}
            >
              Web & App
            </button>
            <button 
              className={`tab-button ${testimonialTab === 'ecommerce' ? 'active' : ''}`}
              onClick={() => handleTestimonialTabChange('ecommerce')}
            >
              E-commerce
            </button>
            <button 
              className={`tab-button ${testimonialTab === 'marketing' ? 'active' : ''}`}
              onClick={() => handleTestimonialTabChange('marketing')}
            >
              Marketing
            </button>
            <button 
              className={`tab-button ${testimonialTab === 'automation' ? 'active' : ''}`}
              onClick={() => handleTestimonialTabChange('automation')}
            >
              Automation
            </button>
            <button 
              className={`tab-button ${testimonialTab === 'affiliate' ? 'active' : ''}`}
              onClick={() => handleTestimonialTabChange('affiliate')}
            >
              Affiliate
            </button>
            <button 
              className={`tab-button ${testimonialTab === 'photo' ? 'active' : ''}`}
              onClick={() => handleTestimonialTabChange('photo')}
            >
              Photography
            </button>
            <button 
              className={`tab-button ${testimonialTab === '3d' ? 'active' : ''}`}
              onClick={() => handleTestimonialTabChange('3d')}
            >
              3D
            </button>
            <button 
              className={`tab-button ${testimonialTab === 'UI-UX' ? 'active' : ''}`}
              onClick={() => handleTestimonialTabChange('UI-UX')}
            >
              UI/UX Design
            </button>
            <button 
              className={`tab-button ${testimonialTab === 'video-editing' ? 'active' : ''}`}
              onClick={() => handleTestimonialTabChange('video-editing')}
            >
              Video Editing
            </button>
            <button 
              className={`tab-button ${testimonialTab === 'shooting' ? 'active' : ''}`}
              onClick={() => handleTestimonialTabChange('shooting')}
            >
              Product Photography / Shooting
            </button>
          </div>
          
          {/* Grid */}
          <div className="testimonials-grid">
            {testimonialCards.map(card => (
              <div key={card.id} className="testimonial-card" data-category={card.category}>
                <p className="testimonial-text">"{card.content}"</p>
                <h4 className="author">{card.name}</h4>
                <p className="location">{card.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section (texts from API, visuals preserved) */}
      <section className="testimonials-section">
          <div className="section-header">
            <div className="section-badge">
            <span>Case Studies</span>
          </div>
          <h2 className="section-title">{caseStudyProducts[0]?.nameVi || caseStudyProducts[0]?.name || '3D Product Animation Showcase'}</h2>
          <p className="section-subtitle">{caseStudyProducts[0]?.descriptionVi || caseStudyProducts[0]?.description || 'Explore our recent works demonstrating creativity, realism, and impactful storytelling across industries.'}</p>
          </div>
          <div className="case-studies-grid">
          <div className="case-study-card">
            <div className="case-study-image">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="hero-video"
                preload="auto"
                webkit-playsinline="true"
                controls
                onError={(e) => console.error('Video error:', e)}
              >
                  <source src="/product-commercial-ads.mp4" type="video/mp4" />
                <source src="./product-commercial-ads.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
              </div>
              <div className="case-study-content">
              <h3>{caseStudyProducts[0]?.nameVi || caseStudyProducts[0]?.name || 'Professional 3D Animation Explainer, Commercial Ad'}</h3>
              <p>{caseStudyProducts[0]?.descriptionVi || caseStudyProducts[0]?.description || 'I create high-quality 3D animation videos that transform complex ideas and products into engaging, easy-to-understand visuals. My work is designed to elevate brands, boost marketing campaigns, and attract customers through cinematic motion and polished storytelling.'}</p>
              <div className="case-study-results">
                <div className="result-item">
                  <div className="result-number">{caseStudyProducts[0]?.results?.[0]?.label || 'Duration'}</div>
                  <div className="result-label">{caseStudyProducts[0]?.results?.[0]?.value || '7-30 days'}</div>
                </div>
                <div className="result-item">
                  <div className="result-number">{caseStudyProducts[0]?.results?.[1]?.label || 'Industries'}</div>
                  <div className="result-label">{caseStudyProducts[0]?.results?.[1]?.value || '3D Design +5'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="case-study-card">
            <div className="case-study-image">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="hero-video"
                preload="auto"
                webkit-playsinline="true"
                controls
                onError={(e) => console.error('Video error:', e)}
              >
                  <source src="/video-commercial.mp4" type="video/mp4" />
                <source src="./video-commercial.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
              </div>
              <div className="case-study-content">
              <h3>{caseStudyProducts[1]?.nameVi || caseStudyProducts[1]?.name || '3D Product Commercial Ads Portfolio'}</h3>
              <p>{caseStudyProducts[1]?.descriptionVi || caseStudyProducts[1]?.description || 'This portfolio showcases my work in creating cinematic 3D product commercials designed to grab attention, highlight brand identity, and boost engagement. From sleek pickleball paddles to luxury cosmetics and everyday consumer goods, I transform ideas into eye-catching visuals that are perfect for social media ads, e-commerce, and brand campaigns.'}</p>
              <div className="case-study-results">
                <div className="result-item">
                  <div className="result-number">{caseStudyProducts[1]?.results?.[0]?.label || 'Duration'}</div>
                  <div className="result-label">{caseStudyProducts[1]?.results?.[0]?.value || '7-30 days'}</div>
                </div>
                <div className="result-item">
                  <div className="result-number">{caseStudyProducts[1]?.results?.[1]?.label || 'Industries'}</div>
                  <div className="result-label">{caseStudyProducts[1]?.results?.[1]?.value || '3D Design +5'}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="case-study-card">
            <div className="case-study-image">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="hero-video"
                preload="auto"
                webkit-playsinline="true"
                controls
                onError={(e) => console.error('Video error:', e)}
              >
                  <source src="/Ls-ad.mp4" type="video/mp4" />
                <source src="./Ls-ad.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
              </div>
              <div className="case-study-content">
              <h3>{caseStudyProducts[2]?.nameVi || caseStudyProducts[2]?.name || '3D product animation ads created for shoe insoles.'}</h3>
              <p>{caseStudyProducts[2]?.descriptionVi || caseStudyProducts[2]?.description || 'This video highlights key features such as arch support, cushioning, and AEROSPACE-GRACE PREMIUM CARBON FIBER through dynamic visuals and lifestyle scenes. Designed for use in social media campaigns and e-commerce promotions.'}
              </p>
              <div className="case-study-results">
                <div className="result-item">
                  <div className="result-number">{caseStudyProducts[2]?.results?.[0]?.label || 'Duration'}</div>
                  <div className="result-label">{caseStudyProducts[2]?.results?.[0]?.value || '7-30 days'}</div>
                </div>
                <div className="result-item">
                  <div className="result-number">{caseStudyProducts[2]?.results?.[1]?.label || 'Industries'}</div>
                  <div className="result-label">{caseStudyProducts[2]?.results?.[1]?.value || '3D Design +5'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="case-study-card">
            <div className="case-study-image">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="hero-video"
                preload="auto"
                webkit-playsinline="true"
                controls
                onError={(e) => {
                  console.error('Video error:', e);
                  // Fallback to image if video fails
                  e.target.style.display = 'none';
                  const img = document.createElement('img');
                  img.src = '/Anh-Trai-Dat-2.jpeg';
                  img.style.width = '100%';
                  img.style.height = '100%';
                  img.style.objectFit = 'cover';
                  e.target.parentNode.appendChild(img);
                }}
              >
                  <source src="/fan.mp4" type="video/mp4" />
                <source src="./fan.mp4" type="video/mp4" />
                <source src="fan.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
              </div>
              <div className="case-study-content">
              <h3>Portable Travel Fan</h3>
              <p>Stay cool and comfortable on the go with this ultra-portable travel fan. Designed for maximum convenience and performance, this fan is your perfect companion for hot days, travel, outdoor events, or simply for personal use at your desk.</p>
              <div className="case-study-results">
                <div className="result-item">
                  <div className="result-number">Duration</div>
                  <div className="result-label">7-30 days</div>
                </div>
                <div className="result-item">
                  <div className="result-number">Industries</div>
                  <div className="result-label">Motion design & Animation +5</div>
                </div>
              </div>
            </div>
          </div>



        </div>
      </section>

       {/* Packages Section */}
       <section className="packages-section fade-in-section">
        <div className="packages-container">
          <div className="section-header">
            <div className="section-badge">
              <span>Service Packages On Demand</span>
            </div>
            <h2 className="section-title">Tailored Solutions for Your Business Growth</h2>
            <p className="section-description">Choose the package that best fits your business needs and goals. All packages include dedicated support and regular performance reports.</p>
          </div>
          
          <div className="packages-grid">
            <div className="package-card featured-package">
              <div className="popular-badge">Most Popular</div>
              <div className="package-header">
                <div className="crown-icon">
                  <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
                    <path d="M1.2 5.7L4.8 9.5L9.5 3.8L14.2 9.5L17.8 5.7L15.2 15.2H3.8L1.2 5.7Z" fill="#99EA48"/>
                    <circle cx="12" cy="8" r="2" fill="#FFD700"/>
                    <path d="M12 10V14" stroke="#FFD700" strokeWidth="2"/>
                    <path d="M10 12H14" stroke="#FFD700" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="package-badge">Monthly / Quarterly / Yearly</div>
              </div>
              <h3 className="package-title">Full Operation Package</h3>
              <p className="package-description">Our comprehensive solution for businesses looking to maximize growth across all channels.</p>
              <div className="package-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Complete digital marketing & sales strategy</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Multi-channel management (Web, Social, E-commerce)</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Content creation & promotional videos</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Performance analytics & optimization</span>
                </div>
              </div>
            </div>

            <div className="package-card">
              <div className="package-header">
                <div className="crown-icon">
                  <svg width="19.2" height="19.2" viewBox="0 0 19 19" fill="none">
                    <path d="M1.2 5.7L4.8 9.5L9.5 3.8L14.2 9.5L17.8 5.7L15.2 15.2H3.8L1.2 5.7Z" fill="#99EA48"/>
                  </svg>
                </div>
                <div className="package-badge">One-time payment</div>
              </div>
              <h3 className="package-title">Starter Package</h3>
              <p className="package-description">Perfect for new businesses looking to establish their digital presence.</p>
              <div className="package-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Professional website or app setup</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>E-commerce functionality</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Basic SEO optimization</span>
                </div>
              </div>
            </div>

            <div className="package-card">
              <div className="package-header">
                <div className="crown-icon">
                  <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#99EA48"/>
                    <circle cx="6" cy="6" r="2" fill="#99EA48"/>
                    <circle cx="18" cy="6" r="2" fill="#99EA48"/>
                    <circle cx="6" cy="18" r="2" fill="#99EA48"/>
                    <circle cx="18" cy="18" r="2" fill="#99EA48"/>
                  </svg>
                </div>
                <div className="package-badge">Monthly / Quarterly</div>
              </div>
              <h3 className="package-title">Multi-channel Sales Package</h3>
              <p className="package-description">Expand your reach across multiple platforms to maximize sales opportunities.</p>
              <div className="package-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Social media management</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Targeted ad campaigns</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Marketplace management (Shopee/TikTok/Amazon)</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Cross-platform inventory management</span>
                </div>
              </div>
            </div>

            <div className="package-card">
              <div className="package-header">
                <div className="crown-icon">
                  <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#99EA48" strokeWidth="2" fill="none"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="#99EA48"/>
                    <polyline points="21,15 16,10 5,21" stroke="#99EA48" strokeWidth="2" fill="none"/>
                    <polygon points="7,2 13,2 13,8 10,6 7,8" fill="#99EA48"/>
                  </svg>
                </div>
                <div className="package-badge">Per product</div>
              </div>
              <h3 className="package-title">Image & Video Package</h3>
              <p className="package-description">High-quality visual content to showcase your products and services.</p>
              <div className="package-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Professional photography</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>3D product rendering</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Promotional videos</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Social media-optimized content</span>
                </div>
              </div>
            </div>

            <div className="package-card">
              <div className="package-header">
                <div className="crown-icon">
                  <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="package-badge">Monthly / Quarterly</div>
              </div>
              <h3 className="package-title">SEO & Analytics Package</h3>
              <p className="package-description">Boost your online visibility and track performance with advanced SEO strategies.</p>
              <div className="package-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Advanced SEO optimization</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Google Analytics setup</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Keyword research & strategy</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Performance tracking & reports</span>
                </div>
              </div>
            </div>

            <div className="package-card">
              <div className="package-header">
                <div className="crown-icon">
                  <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0413 20.9991 15.5763 20.2 15.37" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13C16.8 3.34 17.5047 3.805 18.0108 4.4614C18.5169 5.1178 18.8014 5.9282 18.8014 6.7636C18.8014 7.599 18.5169 8.4094 18.0108 9.0658C17.5047 9.7222 16.8 10.1872 16 10.3972" stroke="#99EA48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="package-badge">Monthly / Quarterly</div>
              </div>
              <h3 className="package-title">Consulting & Strategy Package</h3>
              <p className="package-description">Get expert guidance and strategic planning for your digital transformation.</p>
              <div className="package-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Digital strategy consultation</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Market analysis & research</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Competitor analysis</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Custom roadmap development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="contact-section fade-in-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span data-vi="Liên hệ" data-en="Contact">Liên hệ</span>
            </div>
            <h2 data-vi="Sẵn sàng bắt đầu dự án của bạn?" data-en="Ready to Start Your Project?">Sẵn sàng bắt đầu dự án của bạn?</h2>
            <p data-vi="Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và bắt đầu hành trình phát triển doanh nghiệp của bạn." data-en="Contact us today for a free consultation and start your business development journey.">
              Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và bắt đầu hành trình phát triển doanh nghiệp của bạn.
            </p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3 data-vi="Thông tin liên hệ" data-en="Contact Information">Thông tin liên hệ</h3>
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <strong data-vi="Email" data-en="Email">Email</strong>
                  <span>info@unitrux.com</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <strong data-vi="Điện thoại" data-en="Phone">Điện thoại</strong>
                  <div className="phone-numbers">
                  <div>+84 938 695 186</div>
                  <div>+84 364 750 316</div>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div className="contact-details">
                  <strong data-vi="Giờ làm việc" data-en="Working Hours">Giờ làm việc</strong>
                  <span>Thứ 2 - Thứ 6: 8:00 - 18:00</span>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
