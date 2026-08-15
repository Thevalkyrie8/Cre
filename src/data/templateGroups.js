// Shared template catalog — consumed by the homepage teaser (TemplateShowcase.jsx)
// and the full dedicated catalog page (TemplatesPage.jsx). Live URLs are real,
// hosted demo sites (not screenshots), so keep hrefs accurate when adding more.

export const templateGroups = [
  {
    id: 'salon',
    labelEn: 'Salon & beauty',
    labelVi: 'Salon & làm đẹp',
    items: [
      {
        href: 'https://template-salon-1.unitrux.com/',
        titleEn: 'MORIÉ Hair Atelier',
        titleVi: 'MORIÉ Hair Atelier',
        tagEn: 'Bold & editorial',
        tagVi: 'Cá tính & biên tập',
      },
      {
        href: 'https://template-salon-2.unitrux.com/',
        titleEn: 'Lụa Studio',
        titleVi: 'Lụa Studio',
        tagEn: 'Warm & personal',
        tagVi: 'Ấm áp & gần gũi',
      },
    ],
  },
  {
    id: 'cafe',
    labelEn: 'Coffee & cafe',
    labelVi: 'Quán cà phê',
    items: [
      {
        href: 'https://template-cafe-1.unitrux.site/',
        titleEn: 'Lá & Hạt',
        titleVi: 'Lá & Hạt',
        tagEn: 'Fresh & natural',
        tagVi: 'Tươi mới & gần gũi',
      },
      {
        href: 'https://template-cafe-2.unitrux.site/',
        titleEn: 'MORENO',
        titleVi: 'MORENO',
        tagEn: 'Bold & moody',
        tagVi: 'Đậm chất & cuốn hút',
      },
    ],
  },
  {
    id: 'fnb',
    labelEn: 'Food & beverage',
    labelVi: 'Ẩm thực & đồ uống',
    items: [
      {
        href: 'https://template-fnb5.unitrux.site/',
        titleEn: 'Amber & Oak',
        titleVi: 'Amber & Oak',
        tagEn: 'Fine dining elegance',
        tagVi: 'Tinh tế & sang trọng',
      },
      {
        href: 'https://template-fnb2.unitrux.site/',
        titleEn: 'Oakfire Steakhouse',
        titleVi: 'Oakfire Steakhouse',
        tagEn: 'Bold & smoky',
        tagVi: 'Đậm chất & khói lửa',
      },
      {
        href: 'https://template-fnb3.unitrux.site/',
        titleEn: 'WasabiMai',
        titleVi: 'WasabiMai',
        tagEn: 'Fresh Japanese sushi',
        tagVi: 'Sushi Nhật tươi mỗi ngày',
      },
      {
        href: 'https://template-fnb1.unitrux.site/',
        titleEn: 'Flavora',
        titleVi: 'Flavora',
        tagEn: 'Vibrant food delivery',
        tagVi: 'Giao đồ ăn sống động',
      },
      {
        href: 'https://template-fnb4.unitrux.site/',
        titleEn: 'Wildflour Bakery & Café',
        titleVi: 'Wildflour Bakery & Café',
        tagEn: 'Warm & handcrafted',
        tagVi: 'Ấm áp & thủ công',
      },
      {
        href: 'https://template-cafe-3.unitrux.site/',
        titleEn: 'OCEANO',
        titleVi: 'OCEANO',
        tagEn: 'Distinctive theme',
        tagVi: 'Chủ đề độc đáo',
      },
    ],
  },
  {
    id: 'estate',
    labelEn: 'Real estate',
    labelVi: 'Bất động sản',
    items: [
      {
        href: 'https://template-estate-1.unitrux.site/',
        titleEn: 'Việt Home Premium',
        titleVi: 'Việt Home Premium',
        tagEn: 'Premium & data-rich',
        tagVi: 'Cao cấp & giàu dữ liệu',
      },
      {
        href: 'https://template-estate-2.unitrux.site/',
        titleEn: 'Haven Estates',
        titleVi: 'Haven Estates',
        tagEn: 'Editorial & trustworthy',
        tagVi: 'Biên tập & đáng tin cậy',
      },
      {
        href: 'https://template-estate-3.unitrux.site/',
        titleEn: 'MARIVA',
        titleVi: 'MARIVA',
        tagEn: 'Resort & coastal',
        tagVi: 'Nghỉ dưỡng & biển đảo',
      },
      {
        href: 'https://template-estate-4.unitrux.site/',
        titleEn: 'Emerald Estate',
        titleVi: 'Emerald Estate',
        tagEn: 'Boutique & nature',
        tagVi: 'Boutique & thiên nhiên',
      },
    ],
  },
  {
    id: 'ecommerce',
    labelEn: 'E-commerce',
    labelVi: 'Thương mại điện tử',
    items: [
      {
        href: 'https://template-ec1.unitrux.site/',
        titleEn: 'Auria',
        titleVi: 'Auria',
        tagEn: 'Vibrant & feature-rich',
        tagVi: 'Sống động & đầy đủ tính năng',
      },
      {
        href: 'https://template-ec2.unitrux.site/',
        titleEn: 'Woodnest',
        titleVi: 'Woodnest',
        tagEn: 'Earthy & catalog-driven',
        tagVi: 'Mộc mạc & giàu danh mục',
      },
      {
        href: 'https://template-ec3.unitrux.site/',
        titleEn: 'LUMINA Beauty',
        titleVi: 'LUMINA Beauty',
        tagEn: 'Elegant & editorial',
        tagVi: 'Tinh tế & biên tập',
      },
    ],
  },
];

export const templateCount = templateGroups.reduce((total, group) => total + group.items.length, 0);
