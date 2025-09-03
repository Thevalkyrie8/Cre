// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavbar();
    initializeScrollEffects();
    initializeAnimations();
    initializeButtons();
    initializeParallax();
    initializeLoadingAnimation();
    initializeFloatingButtons();
});

// Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactBtn = document.querySelector('.nav-contact');
    
    // Scroll effect for navbar
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(0, 7, 18, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translate3d(0, -100%, 0)';
        } else {
            navbar.style.transform = 'translate3d(0, 0, 0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Add smooth scroll to sections when implemented
        });
    });
    
    // Contact button functionality
    contactBtn.addEventListener('click', () => {
        // Scroll to footer or contact section
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.hero-container, .about-content, .stat-card, .feature-card, .service-card, .section-header'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize animations
function initializeAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .hero-container,
        .about-content,
        .stat-card,
        .feature-card,
        .service-card,
        .section-header {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .navbar {
            transition: all 0.3s ease;
        }
        
        .feature-card,
        .service-card {
            transition: all 0.3s ease, opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-card:hover,
        .service-card:hover {
            transform: translateY(-5px);
            border-color: rgba(153, 234, 72, 0.3);
        }
        
        .btn-primary,
        .btn-secondary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .loading {
            opacity: 0;
            animation: fadeIn 1s ease-in-out forwards;
        }
        
        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Button interactions
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Button actions
        button.addEventListener('click', function() {
            if (this.textContent.includes('Portfolio')) {
                // Scroll to services section
                const servicesSection = document.querySelector('.services-section');
                if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (this.textContent.includes('Contact')) {
                // Scroll to footer or show contact info
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effect for background
function initializeParallax() {
    const earthBg = document.querySelector('.earth-bg');
    const earthOverlay = document.querySelector('.earth-overlay');
    const earthColor = document.querySelector('.earth-color');
    
    if (earthBg && earthOverlay && earthColor) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;
            
            const yPos = -(scrolled * parallaxSpeed);
            
            earthBg.style.transform = `translate3d(0, ${yPos}px, 0)`;
            earthOverlay.style.transform = `translate3d(0, ${yPos}px, 0)`;
            earthColor.style.transform = `translate3d(0, ${yPos}px, 0)`;
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
}

// Loading animation
function initializeLoadingAnimation() {
    document.body.classList.add('loading');
    
    // Stagger animations for different sections
    setTimeout(() => {
        const heroContainer = document.querySelector('.hero-container');
        if (heroContainer) {
            heroContainer.classList.add('animate-in');
        }
    }, 300);
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Smooth scrolling utility
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Add hover effects for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .service-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.borderColor = 'rgba(153, 234, 72, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = '#1B1B1D';
        });
    });
});

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Initialize non-critical features when browser is idle
        console.log('Unitrux website loaded successfully!');
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', throttle(() => {
    // Recalculate positions if needed
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth <= 768) {
        navbar.style.transform = 'translateY(0)';
    }
}, 250));

// Floating Action Buttons Functionality
function initializeFloatingButtons() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const languageToggleBtn = document.getElementById('languageToggleBtn');
    
    // Scroll to top functionality
    let isScrolling = false;
    
    function updateScrollToTopButton() {
        const scrollY = window.scrollY;
        
        if (scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
        
        isScrolling = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(updateScrollToTopButton);
            isScrolling = true;
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Theme toggle functionality
    const sunIcon = themeToggleBtn.querySelector('.sun-icon');
    const moonIcon = themeToggleBtn.querySelector('.moon-icon');
    
    // Check for saved theme preference - default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        // Only switch to light mode if explicitly saved
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        // Default to dark mode
        document.body.classList.add('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'dark');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'dark');
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Language toggle functionality
    const langText = languageToggleBtn.querySelector('.lang-text');
    let currentLang = localStorage.getItem('language') || 'en';
    langText.textContent = currentLang.toUpperCase();
    
    const translations = {
        en: {
            // Navbar
            'Store': 'Store',
            'Developer': 'Developer',
            'Teams': 'Teams',
            'Contact': 'Contact',
            
            // Hero Section
            'One team & one vision': 'One team & one vision',
            'Transforming Ideas': 'Transforming Ideas',
            'into Success': 'into Success',
            'View Portfolio': 'View Portfolio',
            'Contact Us': 'Contact Us',
            
            // About Section
            'About Us': 'About Us',
            'Your Partner in Digital Growth': 'Your Partner in Digital Growth',
            'Unitrux is your trusted partner for E-commerce growth, Website design, and Digital Marketing solutions. We provide full Amazon seller support to help individuals and SMEs build their brand, optimize sales, and expand globally. With creative strategies and professional services, Unitrux empowers your business to thrive in the digital age.': 'Unitrux is your trusted partner for E-commerce growth, Website design, and Digital Marketing solutions. We provide full Amazon seller support to help individuals and SMEs build their brand, optimize sales, and expand globally. With creative strategies and professional services, Unitrux empowers your business to thrive in the digital age.',
            'support': 'support',
            'Price': 'Price',
            'Staff': 'Staff',
            
            // Features Section
            'Why Choose Us': 'Why Choose Us',
            'We Are Here to Grow Your Business Exponentially': 'We Are Here to Grow Your Business Exponentially',
            'Strategic Marketing & Advertising': 'Strategic Marketing & Advertising',
            'Comprehensive Amazon Seller Support': 'Comprehensive Amazon Seller Support',
            'Cross-Channel Promotion': 'Cross-Channel Promotion',
            'Campaign Management & Optimization': 'Campaign Management & Optimization',
            
            // Services Section
            'Our Services': 'Our Services',
            'Custom IT Solutions for Your Successful Business': 'Custom IT Solutions for Your Successful Business',
            'Web Apps, Websites, and Operational Systems': 'Web Apps, Websites, and Operational Systems',
            'E-commerce Seller Services (Amazon, Etsy, Shopee, etc)': 'E-commerce Seller Services (Amazon, Etsy, Shopee, etc)',
            'All-in-One Marketing for Individuals & Sellers': 'All-in-One Marketing for Individuals & Sellers',
            'CRM - Email - Chatbot - Automation Systems': 'CRM - Email - Chatbot - Automation Systems',
            'Affiliate Services for Sellers & Businesses': 'Affiliate Services for Sellers & Businesses',
            'Call Us For Quote': 'Call Us For Quote',
            
            // Packages Section
            'Service Packages On Demand': 'Service Packages On Demand',
            'Our packages are designed to fit your goals': 'Our packages are designed to fit your goals',
            'Starter Package': 'Starter Package',
            'Growth Package': 'Growth Package',
            'Premium Package': 'Premium Package',
            'Image & Video Package': 'Image & Video Package',
            'Conversion Ads Package': 'Conversion Ads Package',
            'Affiliate Builder Package': 'Affiliate Builder Package',
            'One-time payment': 'One-time payment',
            'Monthly subscription': 'Monthly subscription',
            'Monthly / Quarterly': 'Monthly / Quarterly',
            'Per product': 'Per product',
            'One-time payment + maintenance': 'One-time payment + maintenance',
            'Get started': 'Get started',
            
            // Package Features
            'E-commerce & Service Websites': 'E-commerce & Service Websites',
            'Order, Customer & Internal Management Web Apps': 'Order, Customer & Internal Management Web Apps',
            'Payment, Chatbot & Email Automation Systems': 'Payment, Chatbot & Email Automation Systems',
            'Product consulting, store setup, and brand building': 'Product consulting, store setup, and brand building',
            'SEO optimization for listings, keywords, conversion-focused descriptions': 'SEO optimization for listings, keywords, conversion-focused descriptions',
            '2023+ product image design, professional studio photography': '2023+ product image design, professional studio photography',
            'Affiliate program setup to boost sales without ad costs': 'Affiliate program setup to boost sales without ad costs',
            'Fanpage, TikTok, Instagram, LinkedIn management': 'Fanpage, TikTok, Instagram, LinkedIn management',
            'Targeted advertising campaigns: Facebook, TikTok, Google, Amazon Ads': 'Targeted advertising campaigns: Facebook, TikTok, Google, Amazon Ads',
            'Professional video content production optimized for high conversion and advertising': 'Professional video content production optimized for high conversion and advertising',
            'Producing images (photography, 3D rendering)': 'Producing images (photography, 3D rendering)',
            'Promotional/viral videos': 'Promotional/viral videos',
            'Operating and optimizing ad campaigns on Facebook, TikTok, and Google': 'Operating and optimizing ad campaigns on Facebook, TikTok, and Google',
            'Operating stores on Shopee/TikTok Shop and Amazon': 'Operating stores on Shopee/TikTok Shop and Amazon',
            'Combine all services for sales growth and retention goals': 'Combine all services for sales growth and retention goals',
            
            // Missing Package Features
            'Managing Fanpages': 'Managing Fanpages',
            'Running ads': 'Running ads',
            'Creating content': 'Creating content',
            'Designing visuals': 'Designing visuals',
            'Scheduled social posting': 'Scheduled social posting',
            'Build affiliate system': 'Build affiliate system',
            'Tracking links': 'Tracking links',
            'Commission dashboard': 'Commission dashboard',
            'Multi-channel Sales Package': 'Multi-channel Sales Package',
            'Social & Content Package': 'Social & Content Package',
            'Full Operation Package': 'Full Operation Package',
            'Monthly': 'Monthly',
            'Campaign Planning & Launch':'Campaign Planning & Launch',
            'Custom affiliate systems with tracking links and commission management': 'Custom affiliate systems with tracking links and commission management',
            'Professional video content production, optimized for high conversion and advertising': 'Professional video content production, optimized for high conversion and advertising',
            'Chatbot setup for consultation, support, and upselling': 'Chatbot setup for consultation, support, and upselling',
            'Automated email funnels based on customer behavior': 'Automated email funnels based on customer behavior',
            'CRM integration for lead storage, segmentation, and nurturing': 'CRM integration for lead storage, segmentation, and nurturing',
            'Mass messaging, automated quotes, and upsell triggers': 'Mass messaging, automated quotes, and upsell triggers',
            'Plan and launch campaigns with affiliates, KOLs, reviewers, and publishers — tailored for your business goals': 'Plan and launch campaigns with affiliates, KOLs, reviewers, and publishers — tailored for your business goals',
            'Design customized strategies to expand your brand visibility and drive sustainable sales': 'Design customized strategies to expand your brand visibility and drive sustainable sales',
            'Promote across fanpages, social media platforms, and email marketing for maximum reach': 'Promote across fanpages, social media platforms, and email marketing for maximum reach',
            'From system setup to execution, we manage and optimize campaigns for growth and long-term success': 'From system setup to execution, we manage and optimize campaigns for growth and long-term success',
            'Seamless Multi-chain Integration': 'Seamless Multi-chain Integration',
            'Cutting-edge Features': 'Cutting-edge Features',
            'Enhanced User Experience': 'Enhanced User Experience',
            'On-chain Trading': 'On-chain Trading',
            'Industry-leading Partners': 'Industry-leading Partners'
        },
        vi: {
            // Navbar
            'Store': 'Cửa Hàng',
            'Developer': 'Nhà Phát Triển',
            'Teams': 'Đội Ngũ',
            'Contact': 'Liên Hệ',
            
            // Hero Section
            'One team & one vision': 'Một đội ngũ & một tầm nhìn',
            'Transforming Ideas': 'Biến Ý Tưởng',
            'into Success': 'Thành Thành Công',
            'View Portfolio': 'Xem Portfolio',
            'Contact Us': 'Liên Hệ Chúng Tôi',
            
            // About Section
            'About Us': 'Về Chúng Tôi',
            'Your Partner in Digital Growth': 'Đối Tác Phát Triển Số Của Bạn',
            'Unitrux is your trusted partner for E-commerce growth, Website design, and Digital Marketing solutions. We provide full Amazon seller support to help individuals and SMEs build their brand, optimize sales, and expand globally. With creative strategies and professional services, Unitrux empowers your business to thrive in the digital age.': 'Unitrux là đối tác đáng tin cậy của bạn trong việc phát triển thương mại điện tử, thiết kế website và các giải pháp marketing số. Chúng tôi cung cấp hỗ trợ toàn diện cho người bán Amazon giúp cá nhân và doanh nghiệp vừa và nhỏ xây dựng thương hiệu, tối ưu hóa doanh số và mở rộng toàn cầu. Với các chiến lược sáng tạo và dịch vụ chuyên nghiệp, Unitrux trao quyền cho doanh nghiệp của bạn phát triển mạnh mẽ trong kỷ nguyên số.',
            'support': 'hỗ trợ',
            'Price': 'Giá Cả',
            'Staff': 'Nhân Viên',
            
            // Features Section
            'Why Choose Us': 'Tại Sao Chọn Chúng Tôi',
            'We Are Here to Grow Your Business Exponentially': 'Chúng Tôi Ở Đây Để Phát Triển Doanh Nghiệp Của Bạn Theo Cấp Số Nhân',
            'Strategic Marketing & Advertising': 'Marketing & Quảng Cáo Chiến Lược',
            'Comprehensive Amazon Seller Support': 'Hỗ Trợ Toàn Diện Người Bán Amazon',
            'Cross-Channel Promotion': 'Quảng Bá Đa Kênh',
            'Campaign Management & Optimization': 'Quản Lý & Tối Ưu Chiến Dịch',
            
            // Services Section
            'Our Services': 'Dịch Vụ Của Chúng Tôi',
            'Custom IT Solutions for Your Successful Business': 'Giải Pháp CNTT Tùy Chỉnh Cho Doanh Nghiệp Thành Công Của Bạn',
            'Web Apps, Websites, and Operational Systems': 'Ứng Dụng Web, Website và Hệ Thống Vận Hành',
            'E-commerce Seller Services (Amazon, Etsy, Shopee, etc)': 'Dịch Vụ Người Bán Thương Mại Điện Tử (Amazon, Etsy, Shopee, v.v.)',
            'All-in-One Marketing for Individuals & Sellers': 'Marketing Tổng Thể cho Cá Nhân & Người Bán',
            'CRM - Email - Chatbot - Automation Systems': 'Hệ Thống CRM - Email - Chatbot - Tự Động Hóa',
            'Affiliate Services for Sellers & Businesses': 'Dịch Vụ Tiếp Thị Liên Kết cho Người Bán & Doanh Nghiệp',
            'Call Us For Quote': 'Gọi Để Báo Giá',
            
            // Packages Section
            'Service Packages On Demand': 'Gói Dịch Vụ Theo Yêu Cầu',
            'Our packages are designed to fit your goals': 'Các gói của chúng tôi được thiết kế phù hợp với mục tiêu của bạn',
            'Starter Package': 'Gói Khởi Đầu',
            'Growth Package': 'Gói Phát Triển',
            'Premium Package': 'Gói Cao Cấp',
            'Image & Video Package': 'Gói Hình Ảnh & Video',
            'Conversion Ads Package': 'Gói Quảng Cáo Chuyển Đổi',
            'Affiliate Builder Package': 'Gói Xây Dựng Affiliate',
            'One-time payment': 'Thanh toán một lần',
            'Monthly subscription': 'Đăng ký hàng tháng',
            'Monthly / Quarterly': 'Hàng tháng / Hàng quý',
            'Per product': 'Theo sản phẩm',
            'One-time payment + maintenance': 'Thanh toán một lần + bảo trì',
            'Get started': 'Bắt đầu',
            
            // Package Features
            'E-commerce & Service Websites': 'Website Thương Mại Điện Tử & Dịch Vụ',
            'Order, Customer & Internal Management Web Apps': 'Ứng Dụng Web Quản Lý Đơn Hàng, Khách Hàng & Nội Bộ',
            'Payment, Chatbot & Email Automation Systems': 'Hệ Thống Thanh Toán, Chatbot & Tự Động Hóa Email',
            'Product consulting, store setup, and brand building': 'Tư vấn sản phẩm, thiết lập cửa hàng và xây dựng thương hiệu',
            'SEO optimization for listings, keywords, conversion-focused descriptions': 'Tối ưu SEO cho danh sách, từ khóa, mô tả tập trung chuyển đổi',
            '2023+ product image design, professional studio photography': 'Thiết kế hình ảnh sản phẩm 2023+, chụp ảnh studio chuyên nghiệp',
            'Affiliate program setup to boost sales without ad costs': 'Thiết lập chương trình affiliate để tăng doanh số mà không tốn chi phí quảng cáo',
            'Fanpage, TikTok, Instagram, LinkedIn management': 'Quản lý Fanpage, TikTok, Instagram, LinkedIn',
            'Targeted advertising campaigns: Facebook, TikTok, Google, Amazon Ads': 'Chiến dịch quảng cáo có mục tiêu: Facebook, TikTok, Google, Amazon Ads',
            'Professional video content production optimized for high conversion and advertising': 'Sản xuất nội dung video chuyên nghiệp được tối ưu cho chuyển đổi cao và quảng cáo',
            'Producing images (photography, 3D rendering)': 'Sản xuất hình ảnh (chụp ảnh, kết xuất 3D)',
            'Promotional/viral videos': 'Video quảng bá/viral',
            'Operating and optimizing ad campaigns on Facebook, TikTok, and Google': 'Vận hành và tối ưu chiến dịch quảng cáo trên Facebook, TikTok và Google',
            'Operating stores on Shopee/TikTok Shop and Amazon': 'Vận hành cửa hàng trên Shopee/TikTok Shop và Amazon',
            'Combine all services for sales growth and retention goals': 'Kết hợp tất cả dịch vụ cho mục tiêu tăng trưởng doanh số và giữ chân khách hàng',
            
            // Missing Package Features
            'Managing Fanpages': 'Quản lý Fanpage',
            'Running ads': 'Chạy quảng cáo',
            'Creating content': 'Tạo nội dung',
            'Designing visuals': 'Thiết kế hình ảnh',
            'Scheduled social posting': 'Đăng bài mạng xã hội theo lịch',
            'Build affiliate system': 'Xây dựng hệ thống affiliate',
            'Tracking links': 'Liên kết theo dõi',
            'Commission dashboard': 'Bảng điều khiển hoa hồng',
            'Multi-channel Sales Package': 'Gói Bán Hàng Đa Kênh',
            'Social & Content Package': 'Gói Mạng Xã Hội & Nội Dung',
            'Full Operation Package': 'Gói Vận Hành Toàn Diện',
            'Monthly': 'Hàng tháng',
            
            // Additional Services Translations
            'Custom IT Solutions for Your Successful Business': 'Giải Pháp CNTT Tùy Chỉnh Cho Doanh Nghiệp Thành Công',
            'Web Apps, Websites, and Operational Systems': 'Ứng Dụng Web, Website và Hệ Thống Vận Hành',
            'E-commerce Seller Services (Amazon, Etsy, Shopee, etc)': 'Dịch Vụ Bán Hàng Thương Mại Điện Tử (Amazon, Etsy, Shopee, v.v.)',
            'All-in-One Marketing for Individuals & Sellers': 'Marketing Tổng Thể Cho Cá Nhân & Người Bán',
            'CRM - Email - Chatbot - Automation Systems': 'Hệ Thống CRM - Email - Chatbot - Tự Động Hóa',
            'Affiliate Services for Sellers & Businesses': 'Dịch Vụ Affiliate Cho Người Bán & Doanh Nghiệp',
            'Call Us For Quote': 'Gọi Để Báo Giá',
             
            // Package Features
            'E-commerce & Service Websites': 'Website Thương Mại Điện Tử & Dịch Vụ',
            'Order, Customer & Internal Management Web Apps': 'Ứng Dụng Web Quản Lý Đơn Hàng, Khách Hàng & Nội Bộ',
            'Payment, Chatbot & Email Automation Systems': 'Hệ Thống Thanh Toán, Chatbot & Tự Động Hóa Email',
            'Product consulting, store setup, and brand building': 'Tư vấn sản phẩm, thiết lập cửa hàng và xây dựng thương hiệu',
            'SEO optimization for listings, keywords, conversion-focused descriptions': 'Tối ưu SEO cho danh sách, từ khóa, mô tả tập trung chuyển đổi',
            '2023+ product image design, professional studio photography': 'Thiết kế hình ảnh sản phẩm 2023+, chụp ảnh studio chuyên nghiệp',
            'Affiliate program setup to boost sales without ad costs': 'Thiết lập chương trình affiliate để tăng doanh số không cần chi phí quảng cáo',
            'Fanpage, TikTok, Instagram, LinkedIn management': 'Quản lý Fanpage, TikTok, Instagram, LinkedIn',
            'Targeted advertising campaigns: Facebook, TikTok, Google, Amazon Ads': 'Chiến dịch quảng cáo có mục tiêu: Facebook, TikTok, Google, Amazon Ads',
            'Professional video content production optimized for high conversion and advertising': 'Sản xuất nội dung video chuyên nghiệp tối ưu cho chuyển đổi cao và quảng cáo',
            'Producing images (photography, 3D rendering)': 'Sản xuất hình ảnh (chụp ảnh, kết xuất 3D)',
            'Promotional/viral videos': 'Video quảng cáo/viral',
            'Operating and optimizing ad campaigns on Facebook, TikTok, and Google': 'Vận hành và tối ưu chiến dịch quảng cáo trên Facebook, TikTok và Google',
            'Operating stores on Shopee/TikTok Shop and Amazon': 'Vận hành cửa hàng trên Shopee/TikTok Shop và Amazon',
            'Combine all services for sales growth and retention goals': 'Kết hợp tất cả dịch vụ cho mục tiêu tăng trưởng doanh số và giữ chân khách hàng',
             
            'Campaign Planning & Launch': 'Lập Kế Hoạch & Ra Mắt Chiến Dịch',
            'Custom affiliate systems with tracking links and commission management': 'Hệ thống affiliate tùy chỉnh với theo dõi liên kết và quản lý hoa hồng',
            'Professional video content production, optimized for high conversion and advertising': 'Sản xuất nội dung video chuyên nghiệp, tối ưu cho chuyển đổi cao và quảng cáo',
            'Mass messaging, automated quotes, and upsell triggers':'Gửi tin nhắn hàng loạt, báo giá tự động và kích hoạt upsell',
            'CRM integration for lead storage, segmentation, and nurturing': 'Tích hợp CRM để lưu trữ, phân loại và nuôi dưỡng khách hàng tiềm năng',
            'Automated email funnels based on customer behavior':'Hệ thống email tự động dựa trên hành vi khách hàng',
            'Chatbot setup for consultation, support, and upselling': 'Thiết lập chatbot cho tư vấn, hỗ trợ và bán thêm',
            'Plan and launch campaigns with affiliates, KOLs, reviewers, and publishers — tailored for your business goals': '',
            'Design customized strategies to expand your brand visibility and drive sustainable sales': 'Thiết kế các chiến lược tùy chỉnh để mở rộng khả năng nhận diện thương hiệu và thúc đẩy doanh số bền vững',
            'Promote across fanpages, social media platforms, and email marketing for maximum reach': 'Quảng bá trên fanpage, các nền tảng mạng xã hội và email marketing để đạt phạm vi tiếp cận tối đa',
            'From system setup to execution, we manage and optimize campaigns for growth and long-term success': 'Từ thiết lập hệ thống đến triển khai, chúng tôi quản lý và tối ưu các chiến dịch để tăng trưởng và thành công lâu dài',
            'Seamless Multi-chain Integration':'Tích hợp đa chuỗi liền mạch',
            'Cutting-edge Features':'Các tính năng tiên tiến',
            'Enhanced User Experience': 'Trải nghiệm người dùng nâng cao',
            'On-chain Trading': 'Giao dịch trên chuỗi',
            'Industry-leading Partners': 'Đối tác hàng đầu trong ngành',
            // Footer
            'info@unitrux.com': 'info@unitrux.com',
            '© 2088 Nayzak': '© 2088 Nayzak'
        }
    };
    
    function translatePage(lang) {
        // Store original text if not already stored
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(element => {
            // Skip if element has children (to avoid overwriting nested content)
            if (element.children.length === 0 && element.textContent.trim()) {
                const text = element.textContent.trim();
                
                // Store original text if not already stored
                if (!element.dataset.originalText) {
                    element.dataset.originalText = text;
                }
                
                const originalText = element.dataset.originalText;
                
                if (lang === 'en') {
                    // Restore to original English text
                    element.textContent = originalText;
                } else if (lang === 'vi' && translations[lang][originalText]) {
                    // Translate to Vietnamese
                    element.textContent = translations[lang][originalText];
                }
            }
        });
        
        // Handle specific elements that might have been missed
        const specificSelectors = {
            '.nav-link': 'textContent',
            '.nav-contact span': 'textContent',
            '.hero-badge span': 'textContent',
            '.title-line': 'textContent',
            '.btn-primary': 'textContent',
            '.btn-secondary': 'textContent',
            '.about-badge span': 'textContent',
            '.about-title': 'textContent',
            '.about-description': 'textContent',
            '.stat-label': 'textContent',
            '.section-badge span': 'textContent',
            '.section-title': 'textContent',
            '.feature-title': 'textContent',
            '.service-card h3': 'textContent',
            '.service-content h3': 'textContent',
            '.service-card p': 'textContent',
            '.service-content p': 'textContent',
            '.package-title': 'textContent',
            '.package-badge': 'textContent',
            '.service-features li': 'textContent',
            '.feature-item span': 'textContent',
            '.footer-link': 'textContent',
            '.footer-cta-btn': 'textContent'
        };
        
        Object.keys(specificSelectors).forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                const text = element.textContent.trim();
                
                // Store original text if not already stored
                if (!element.dataset.originalText) {
                    element.dataset.originalText = text;
                }
                
                const originalText = element.dataset.originalText;
                
                if (lang === 'en') {
                    // Restore to original English text
                    element.textContent = originalText;
                } else if (lang === 'vi' && translations[lang][originalText]) {
                    // Translate to Vietnamese
                    element.textContent = translations[lang][originalText];
                }
            });
        });
        
        // Force update language toggle button text
        langText.textContent = lang.toUpperCase();
    }
    
    // Apply saved language
    if (currentLang === 'vi') {
        translatePage('vi');
    }
    
    languageToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'vi' : 'en';
        langText.textContent = currentLang.toUpperCase();
        localStorage.setItem('language', currentLang);
        translatePage(currentLang);
    });
}