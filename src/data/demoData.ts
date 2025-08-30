// Demo data for testing when backend is not available
// This file should be removed in production

export const demoDeals = [
  { id: 1, name: 'Dự án Website TMĐT', customer: 'TechCorp', value: 5000, stage: 'Negotiation', owner: 'user@example.com', created: '2025-08-01' },
  { id: 2, name: 'Xây dựng App Mobile', customer: 'Innovate Ltd.', value: 12000, stage: 'Won', owner: 'admin@example.com', created: '2025-07-15' },
  { id: 3, name: 'Tư vấn Chuyển đổi số', customer: 'Global Solutions', value: 8500, stage: 'Won', owner: 'user@example.com', created: '2025-07-20' },
  { id: 4, name: 'Hợp đồng Bảo trì Hệ thống', customer: 'Data Systems', value: 3000, stage: 'Contacted', owner: 'admin@example.com', created: '2025-08-10' },
  { id: 5, name: 'Cung cấp Giải pháp Cloud', customer: 'SkyNet Services', value: 25000, stage: 'Negotiation', owner: 'admin@example.com', created: '2025-06-05' },
  { id: 6, name: 'Đào tạo nhân sự', customer: 'EduFuture', value: 1500, stage: 'Lost', owner: 'user@example.com', created: '2025-08-05' },
  { id: 7, name: 'Nâng cấp Hạ tầng Mạng', customer: 'ConnectAll', value: 7200, stage: 'Lead', owner: 'admin@example.com', created: '2025-08-12' },
];

export const demoUsers = [
  { id: 1, mail: 'admin@example.com', quyen: 'admin' },
  { id: 2, mail: 'user@example.com', quyen: 'user' },
  { id: 3, mail: 'sales.lead@example.com', quyen: 'user' },
];

export const demoAnalysisResults = {
  'Tóm tắt hiệu suất tuần này': 'Dựa trên dữ liệu tuần này: Tổng cộng 3 deals mới, 2 deals chuyển giai đoạn, doanh thu dự kiến $15,000. Tỷ lệ chuyển đổi: 67%.',
  'Dự báo doanh thu tháng tới': 'Dựa trên xu hướng hiện tại, dự báo doanh thu tháng tới: $45,000 - $60,000. Các deal Negotiation có tiềm năng cao nhất.',
  'Đề xuất các deal cần ưu tiên': '1. Dự án Website TMĐT (TechCorp) - $5,000 - Đang Negotiation\n2. Cung cấp Giải pháp Cloud (SkyNet) - $25,000 - Đang Negotiation\n3. Nâng cấp Hạ tầng Mạng (ConnectAll) - $7,200 - Mới Lead'
};
