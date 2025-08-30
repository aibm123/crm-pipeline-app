# 🚀 Hướng dẫn Deploy CRM Pipeline App

## 📋 Bước 1: Chuẩn bị GitHub Repository

### 1.1 Tạo repository mới trên GitHub
```bash
# Tạo folder mới (nếu chưa có)
mkdir crm-pipeline-app
cd crm-pipeline-app

# Khởi tạo Git
git init
git remote add origin https://github.com/YOUR_USERNAME/crm-pipeline-app.git
```

### 1.2 Push code lên GitHub
```bash
# Add tất cả files
git add .

# Commit đầu tiên
git commit -m "Initial commit: CRM Pipeline App with proper structure"

# Push lên main branch
git branch -M main
git push -u origin main
```

## 📋 Bước 2: Deploy lên Vercel

### 2.1 Truy cập Vercel
1. Mở [vercel.com](https://vercel.com)
2. Đăng nhập với GitHub account
3. Click "New Project"

### 2.2 Import Repository
1. Chọn repository `crm-pipeline-app` từ danh sách
2. Click "Import"

### 2.3 Cấu hình Build
- **Framework Preset**: Vite
- **Root Directory**: `./` (để trống)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.4 Cấu hình Environment Variables
Trong Vercel dashboard, thêm các biến môi trường:

```env
# Production URLs (thay thế bằng URL thực tế của bạn)
VITE_API_BASE_URL=https://your-backend-api.vercel.app
VITE_AI_API_URL=https://your-ai-service.vercel.app

# Development URLs (cho local testing)
VITE_API_BASE_URL=http://localhost:3001
VITE_AI_API_URL=http://localhost:3001
```

### 2.5 Deploy
1. Click "Deploy"
2. Chờ quá trình build hoàn tất
3. Lưu URL production (ví dụ: `https://crm-pipeline-app.vercel.app`)

## 📋 Bước 3: Cấu hình Backend API

### 3.1 Tạo Backend Service
Bạn cần tạo một backend service riêng biệt để:

- Xử lý business logic
- Kết nối database
- Gọi Gemini API
- Xử lý authentication

### 3.2 Backend Structure (Gợi ý)
```
backend/
├── src/
│   ├── routes/
│   │   ├── dashboard.ts
│   │   ├── deals.ts
│   │   ├── users.ts
│   │   └── chat.ts
│   ├── services/
│   │   ├── geminiService.ts
│   │   └── databaseService.ts
│   └── middleware/
│       └── auth.ts
├── package.json
└── .env
```

### 3.3 Backend Environment Variables
```env
# Gemini API
GEMINI_API_KEY=your_actual_gemini_api_key

# Database
DATABASE_URL=your_database_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key
```

## 📋 Bước 4: Cập nhật Frontend URLs

### 4.1 Cập nhật Vercel Environment Variables
Sau khi có backend URL, cập nhật trong Vercel:

1. Vào Project Settings > Environment Variables
2. Cập nhật `VITE_API_BASE_URL` và `VITE_AI_API_URL`
3. Redeploy project

### 4.2 Test API Integration
```bash
# Test local development
npm run dev

# Test production build
npm run build
npm run preview
```

## 📋 Bước 5: Bảo mật và Monitoring

### 5.1 Bảo mật
- ✅ **Đã thực hiện**: Không expose API keys trong frontend
- ✅ **Đã thực hiện**: Sử dụng biến môi trường Vercel
- 🔄 **Cần thêm**: CORS configuration trong backend
- 🔄 **Cần thêm**: Rate limiting
- 🔄 **Cần thêm**: Input validation

### 5.2 Monitoring
- Vercel Analytics
- Error tracking (Sentry)
- Performance monitoring

## 🚨 Troubleshooting

### Build Errors
```bash
# Kiểm tra dependencies
npm install

# Clear cache
npm run build --force

# Check TypeScript errors
npx tsc --noEmit
```

### Environment Variables Issues
1. Kiểm tra tên biến có đúng `VITE_` prefix
2. Redeploy sau khi thay đổi environment variables
3. Kiểm tra Vercel logs

### API Connection Issues
1. Kiểm tra CORS configuration
2. Kiểm tra backend service status
3. Kiểm tra network requests trong browser DevTools

## 📱 Testing Checklist

- [ ] Local development server chạy được
- [ ] Build production thành công
- [ ] Deploy lên Vercel thành công
- [ ] Environment variables hoạt động
- [ ] API calls thành công
- [ ] Responsive design trên mobile
- [ ] Charts render đúng
- [ ] Chatbot hoạt động

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Configuration](https://vitejs.dev/config/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org/)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra Vercel deployment logs
2. Kiểm tra browser console errors
3. Kiểm tra network requests
4. Tạo issue trên GitHub repository
