import React, { useState, useMemo } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { DealDetailModal } from '../UI/DealDetailModal';
import { DealsByStageChart } from '../Charts/DealsByStageChart';
import { ValueByStageChart } from '../Charts/ValueByStageChart';
import { RevenueOverTimeChart } from '../Charts/RevenueOverTimeChart';
import { MemberManagement } from './MemberManagement';
import { Deal, User } from '../../services/api';

interface DashboardProps {
  currentUser: { mail: string; role: string };
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isLoading: boolean;
  fetchData: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  currentUser, 
  deals, 
  setDeals, 
  users, 
  setUsers, 
  isLoading, 
  fetchData 
}) => {
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'management'>('overview');
  const [employeeFilter, setEmployeeFilter] = useState('all');

  const handleAIAnalysis = async (prompt: string) => {
    setIsAnalysisLoading(true);
    setAnalysisResult('');
    // TODO: Implement AI analysis through API service
    setAnalysisResult(`Phân tích AI cho: "${prompt}" - Kết quả sẽ được gọi từ backend API.`);
    setIsAnalysisLoading(false);
  };
  
  const handleSaveDeal = async (updatedDeal: Deal) => {
    // TODO: Call API service to update deal
    console.log("Lưu deal:", updatedDeal);
    setDeals(prev => prev.map(d => d.id === updatedDeal.id ? updatedDeal : d));
    setSelectedDeal(null);
  };

  const filteredDeals = useMemo(() => {
    let dealsToFilter = deals;
    
    if (currentUser.role === 'admin' && employeeFilter !== 'all') {
      dealsToFilter = dealsToFilter.filter(deal => deal.owner.includes(employeeFilter));
    }
    
    if (searchTerm) {
      dealsToFilter = dealsToFilter.filter(deal =>
        deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return dealsToFilter;
  }, [deals, searchTerm, currentUser.role, employeeFilter]);

  if (isLoading) {
    return <div className="text-center p-10 text-gray-400">Đang tải dữ liệu Dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        {currentUser.role === 'admin' && (
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Tổng quan
            </button>
            <button 
              onClick={() => setActiveTab('management')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'management' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Quản lý Thành viên
            </button>
          </div>
        )}
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-6">
          {/* AI Analysis Section */}
          <Card title="Phân tích AI (Gemini)">
            <div className="flex flex-wrap gap-4 mb-4">
              <Button onClick={() => handleAIAnalysis("Tóm tắt hiệu suất tuần này")}>
                Tóm tắt tuần
              </Button>
              <Button onClick={() => handleAIAnalysis("Dự báo doanh thu tháng tới")}>
                Dự báo tháng
              </Button>
              <Button onClick={() => handleAIAnalysis("Đề xuất các deal cần ưu tiên")}>
                Đề xuất ưu tiên
              </Button>
            </div>
            {isAnalysisLoading && <p className="text-gray-400">Đang phân tích...</p>}
            {analysisResult && (
              <div className="bg-gray-700 p-4 rounded-md text-gray-300">{analysisResult}</div>
            )}
          </Card>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card title="Số lượng Deal theo Giai đoạn">
              <DealsByStageChart data={filteredDeals} />
            </Card>
            <Card title="Giá trị Deal theo Giai đoạn">
              <ValueByStageChart data={filteredDeals} />
            </Card>
            <Card title="Doanh thu theo Thời gian" className="lg:col-span-2 xl:col-span-1">
              <RevenueOverTimeChart data={filteredDeals} />
            </Card>
          </div>

          {/* Data Table Section */}
          <Card title="Tất cả Deals">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm deal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {currentUser.role === 'admin' && (
                <select 
                  value={employeeFilter}
                  onChange={(e) => setEmployeeFilter(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả nhân viên</option>
                  {users.map(user => (
                    <option key={user.id} value={user.mail}>{user.mail}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="bg-gray-700 text-xs text-gray-400 uppercase">
                  <tr>
                    <th className="p-3">Tên Deal</th>
                    <th className="p-3">Khách hàng</th>
                    <th className="p-3">Giá trị</th>
                    <th className="p-3">Giai đoạn</th>
                    <th className="p-3">Người phụ trách</th>
                    <th className="p-3">Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeals.map(deal => (
                    <tr 
                      key={deal.id} 
                      onClick={() => setSelectedDeal(deal)} 
                      className="border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer"
                    >
                      <td className="p-3 font-medium text-white">{deal.name}</td>
                      <td className="p-3">{deal.customer}</td>
                      <td className="p-3">${deal.value.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          deal.stage === 'Won' ? 'bg-green-500/20 text-green-300' :
                          deal.stage === 'Lost' ? 'bg-red-500/20 text-red-300' :
                          deal.stage === 'Negotiation' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-gray-600/50 text-gray-300'
                        }`}>
                          {deal.stage}
                        </span>
                      </td>
                      <td className="p-3">{deal.owner}</td>
                      <td className="p-3">{deal.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : (
        <MemberManagement users={users} setUsers={setUsers} />
      )}

      <DealDetailModal 
        deal={selectedDeal} 
        onClose={() => setSelectedDeal(null)} 
        onSave={handleSaveDeal} 
      />
    </div>
  );
};
