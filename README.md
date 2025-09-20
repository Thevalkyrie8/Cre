# Unitrux React Website

Đây là phiên bản React.js của website Unitrux, được chuyển đổi từ HTML/CSS/JavaScript gốc.

## Tính năng

- ✅ Responsive design
- ✅ Dark/Light theme toggle
- ✅ Multi-language support (Vietnamese/English)
- ✅ Smooth scrolling và animations
- ✅ Contact form với API integration
- ✅ Video embedding
- ✅ Modern React architecture với hooks
- ✅ React Router cho navigation

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Build cho production:
```bash
npm run build
```

## Cấu trúc project

```
src/
├── components/
│   ├── Layout.jsx          # Layout chung với navbar và footer
│   ├── Home.jsx            # Trang chủ
│   ├── About.jsx           # Trang về chúng tôi
│   ├── Services.jsx        # Trang dịch vụ
│   ├── Packages.jsx        # Trang gói dịch vụ
│   ├── News.jsx            # Trang tin tức
│   └── ContactForm.jsx     # Form liên hệ
├── App.jsx                 # App component chính
├── main.jsx               # Entry point
├── styles.css             # CSS chính
└── digital-marketing.css  # CSS cho digital marketing
```

## Công nghệ sử dụng

- React 18
- React Router DOM
- Vite
- Axios
- CSS3 với animations

## API Integration

Contact form sử dụng API endpoint: `https://be-unitrux.onrender.com/send-email`

## Responsive Design

Website được thiết kế responsive cho:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)