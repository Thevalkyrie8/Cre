## Tài liệu API Unitrux

Base URL: `https://<host>/api`

- **Swagger UI**: `/api/docs`
- **Auth**: JWT Bearer token cho các endpoint yêu cầu (ví dụ: `Authorization: Bearer <token>`)

### Auth

- **POST** `/auth/signup`
  - Mô tả: Tạo tài khoản admin mới
  - Body:
    - `email` (string, required)
    - `password` (string, min 6, required)
    - `name` (string, required)
  - 201: Trả về `access_token` và thông tin user

- **POST** `/auth/login`
  - Mô tả: Đăng nhập
  - Body:
    - `email` (string, required)
    - `password` (string, required)
  - 200: Trả về `access_token` và thông tin user

- **GET** `/auth/profile` (Yêu cầu Bearer Token)
  - Mô tả: Lấy thông tin user hiện tại
  - 200: Trả về user (ẩn `password`)

- **GET** `/auth/users` (Yêu cầu Bearer Token)
  - Mô tả: Lấy danh sách tất cả users (admin)
  - 200: Danh sách users

### Contact

- **POST** `/contacts`
  - Mô tả: Tạo message liên hệ
  - Body:
    - `name` (string, required)
    - `email` (string, required)
    - `phone` (string, optional)
    - `message` (string, required)
    - `subject` (string, optional)
  - 201: Tạo thành công

- **GET** `/contacts`
  - Mô tả: Lấy tất cả message liên hệ
  - 200: Danh sách messages

- **GET** `/contacts/unread-count`
  - Mô tả: Đếm số message chưa đọc
  - 200: `{ count: number }`

- **GET** `/contacts/:id`
  - Mô tả: Lấy message theo ID
  - Params: `id` (UUID)
  - 200 | 404

- **PATCH** `/contacts/:id/read`
  - Mô tả: Đánh dấu đã đọc
  - Params: `id` (UUID)
  - 200 | 404

- **PATCH** `/contacts/:id/reply`
  - Mô tả: Đánh dấu đã phản hồi, lưu nội dung phản hồi
  - Params: `id` (UUID)
  - Body: `{ replyMessage: string }`
  - 200 | 404

- **DELETE** `/contacts/:id`
  - Mô tả: Xoá message
  - Params: `id` (UUID)
  - 200 | 404

### Media

- **POST** `/media/upload`
  - Mô tả: Upload file (disk lưu tại `./uploads` hoặc liên kết Cloudinary khi service xử lý)
  - Form-Data:
    - `file` (binary, required)
  - Query:
    - `category` (string, required)
    - `productId` (string, optional)
    - `newsId` (string, optional)
  - Giới hạn: kích thước ≤ 50MB; loại: jpg|jpeg|png|gif|mp4|avi|mov|pdf|doc|docx

- **GET** `/media`
  - Mô tả: Lấy tất cả media hoặc theo `category`
  - Query: `category` (string, optional)

- **GET** `/media/product/:productId`
  - Mô tả: Lấy media theo `productId`

- **GET** `/media/news/:newsId`
  - Mô tả: Lấy media theo `newsId`

- **GET** `/media/:id`
  - Mô tả: Lấy media theo ID

- **GET** `/media/file/:id`
  - Mô tả: Trả file thực tế. Nếu có `cloudinaryUrl` sẽ redirect, nếu không sẽ trả file từ `uploads`.

- **DELETE** `/media/:id`
  - Mô tả: Xoá media

- **POST** `/media/fix-urls`
  - Mô tả: Sửa các URL media bị sai định dạng

- **POST** `/media/cleanup-soft-deleted`
  - Mô tả: Dọn dẹp bản ghi media đã soft-delete

### News

- **POST** `/news`
  - Mô tả: Tạo bài viết
  - Body: theo `CreateNewsDto` (title, content, category, ...; các trường `*Vi` là tuỳ chọn)

- **GET** `/news`
  - Mô tả: Lấy danh sách bài viết; hỗ trợ lọc `category` hoặc `search`
  - Query: `category?`, `search?`

- **GET** `/news/featured`
  - Mô tả: Lấy danh sách bài viết nổi bật

- **GET** `/news/:id`
  - Mô tả: Lấy bài viết theo ID

- **PATCH** `/news/:id`
  - Mô tả: Cập nhật bài viết (body theo `UpdateNewsDto`)

- **DELETE** `/news/:id`
  - Mô tả: Xoá bài viết

### Packages

- **POST** `/packages`
  - Mô tả: Tạo gói dịch vụ
  - Body: theo `CreatePackageDto` (name, features, price, serviceId, ...)

- **GET** `/packages`
  - Mô tả: Lấy danh sách gói; có thể lọc theo `serviceId`
  - Query: `serviceId?`

- **GET** `/packages/popular`
  - Mô tả: Lấy gói phổ biến

- **GET** `/packages/:id`
  - Mô tả: Lấy gói theo ID

- **PATCH** `/packages/:id`
  - Mô tả: Cập nhật gói (body theo `UpdatePackageDto`)

- **DELETE** `/packages/:id`
  - Mô tả: Xoá gói

### Products

- **POST** `/products`
  - Mô tả: Tạo sản phẩm
  - Body: theo `CreateProductDto`

- **GET** `/products`
  - Mô tả: Lấy danh sách; có thể lọc theo `category`
  - Query: `category?`

- **GET** `/products/:id`
  - Mô tả: Lấy sản phẩm theo ID

- **PATCH** `/products/:id`
  - Mô tả: Cập nhật sản phẩm (body theo `UpdateProductDto`)

- **DELETE** `/products/:id`
  - Mô tả: Xoá sản phẩm

### Services

- **POST** `/services`
  - Mô tả: Tạo dịch vụ
  - Body: theo `CreateServiceDto`

- **GET** `/services`
  - Mô tả: Lấy danh sách dịch vụ; có thể lọc theo `category`
  - Query: `category?`

- **GET** `/services/:id`
  - Mô tả: Lấy dịch vụ theo ID

- **PATCH** `/services/:id`
  - Mô tả: Cập nhật dịch vụ (body theo `UpdateServiceDto`)

- **DELETE** `/services/:id`
  - Mô tả: Xoá dịch vụ

### Ghi chú sử dụng

- **Prefix**: Tất cả route đều bắt đầu với `/api` (ví dụ: `/api/products`).
- **CORS**: Hỗ trợ nhiều origin; có thể cấu hình qua biến môi trường `CORS_ORIGIN`.
- **Validation**: Bật `ValidationPipe` với `whitelist`, `forbidNonWhitelisted`, `transform`.
- **Auth**: Thêm header `Authorization: Bearer <token>` cho endpoint yêu cầu.


