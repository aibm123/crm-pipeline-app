# CRM Pipeline App

Ứng dụng CRM quản lý pipeline bán hàng với AI chatbot tích hợp.

## 🚀 Tính năng

- Dashboard quản lý deals và phân tích dữ liệu
- Chatbot AI tích hợp Gemini API
- Quản lý thành viên với phân quyền admin/user
- Biểu đồ trực quan với Recharts
- Giao diện responsive với Tailwind CSS

## 🏗️ Cấu trúc dự án

```
src/
├── components/          # React components
│   ├── Charts/         # Chart components
│   ├── Dashboard/      # Dashboard components
│   ├── Chatbot/        # Chatbot components
│   └── UI/            # Reusable UI components
├── services/           # API services
│   ├── api.ts         # Main API service
│   └── chatService.ts # Chat AI service
├── App.tsx            # Main app component
└── main.tsx           # App entry point
```

## 🛠️ Cài đặt

1. **Clone repository**
```bash
git clone <your-repo-url>
cd crm-pipeline-app
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Tạo file môi trường**
```bash
cp env.example .env.local
```

4. **Chạy development server**
```bash
npm run dev
```

## 🌍 Biến môi trường

Tạo file `.env.local` với các biến sau:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_AI_API_URL=http://localhost:3001
```

## 🚀 Deploy lên Vercel

### 1. Push code lên GitHub

```bash
git add .
git commit -m "Initial commit: CRM Pipeline App"
git push origin main
```

### 2. Deploy lên Vercel

1. Truy cập [vercel.com](https://vercel.com)
2. Import repository từ GitHub
3. Cấu hình biến môi trường trong Vercel:
   - `VITE_API_BASE_URL`: URL backend API
   - `VITE_AI_API_URL`: URL AI service API

### 3. Cấu hình Vercel

Trong Vercel dashboard, thêm các biến môi trường:

```env
VITE_API_BASE_URL=https://your-backend-api.vercel.app
VITE_AI_API_URL=https://your-ai-service.vercel.app
```

## 🔒 Bảo mật

- **KHÔNG** commit file `.env.local` vào Git
- **KHÔNG** expose API keys trong frontend code
- Tất cả API calls phải thông qua backend service
- Sử dụng biến môi trường Vercel để bảo vệ secrets

## 📱 Responsive Design

Ứng dụng được thiết kế responsive với Tailwind CSS:
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid system

## 🎨 UI Components

- **Card**: Container component với title
- **Button**: Button component với variants
- **Modal**: Deal detail modal
- **Charts**: Recharts integration

## 🔧 Development

```bash
# Development
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

## 📊 API Integration

Ứng dụng sử dụng service layer để gọi API:

- `apiService`: Gọi backend API
- `chatService`: Gọi AI chat service
- Error handling và fallback data
- TypeScript interfaces cho type safety

## 🚨 Lưu ý quan trọng

1. **Backend API**: Cần có backend service riêng biệt
2. **AI Service**: Tích hợp Gemini API thông qua backend
3. **Database**: Sử dụng backend database, không lưu trữ trong frontend
4. **Authentication**: Implement authentication system trong backend

## 📝 License

MIT License
