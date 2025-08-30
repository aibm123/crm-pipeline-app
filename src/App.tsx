import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, MessageSquare } from 'lucide-react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Chatbot } from './components/Chatbot/Chatbot';
import { apiService, Deal, User } from './services/api';

export default function App() {
  const [page, setPage] = useState<'dashboard' | 'chatbot'>('dashboard');
  const [currentUser, setCurrentUser] = useState({ mail: 'admin@example.com', role: 'admin' });
  const [deals, setDeals] = useState<Deal[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const result = await apiService.getDashboardData(currentUser.mail);
      if (result.data) {
        setDeals(result.data.deals || []);
        setUsers(result.data.users || []);
      } else {
        console.error('Failed to fetch data:', result.error);
        // Fallback to demo data if API fails
        import('./data/demoData').then(({ demoDeals, demoUsers }) => {
          setDeals(demoDeals);
          setUsers(demoUsers);
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback data
      import('./data/demoData').then(({ demoDeals, demoUsers }) => {
        setDeals(demoDeals);
        setUsers(demoUsers);
      });
    } finally {
      setIsLoadingData(false);
    }
  }, [currentUser.mail]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    const newMail = selectedRole === 'admin' ? 'admin@example.com' : 'user@example.com';
    setCurrentUser({ mail: newMail, role: selectedRole });
    setPage('dashboard');
  };

  const NavItem: React.FC<{
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    active: boolean;
    onClick: () => void;
  }> = ({ icon: Icon, label, active, onClick }) => (
    <button 
      onClick={onClick} 
      className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
        active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <Icon size={20} className="mr-3" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 flex flex-col border-r border-gray-700">
        <div className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-500">
            <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM2.25 7.93v8.518c0 .266.145.503.372.648L12 22.25v-9l-9-5.25z" />
          </svg>
          <span>CRM Pipeline</span>
        </div>
        <nav className="flex-1 space-y-2">
          <NavItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={page === 'dashboard'} 
            onClick={() => setPage('dashboard')} 
          />
          <NavItem 
            icon={MessageSquare} 
            label="Chatbot" 
            active={page === 'chatbot'} 
            onClick={() => setPage('chatbot')} 
          />
        </nav>
        <div className="mt-auto">
          {/* Role Switcher for Demo */}
          <div className="p-4 bg-gray-700/50 rounded-lg">
            <label htmlFor="role-switcher" className="block text-sm font-medium text-gray-400 mb-2">
              Chuyển đổi vai trò (Demo)
            </label>
            <select
              id="role-switcher"
              value={currentUser.role}
              onChange={handleRoleChange}
              className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <p className="text-xs text-gray-400 mt-2">Email: {currentUser.mail}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {page === 'dashboard' && (
          <Dashboard 
            currentUser={currentUser} 
            deals={deals}
            setDeals={setDeals}
            users={users}
            setUsers={setUsers}
            isLoading={isLoadingData}
            fetchData={fetchData}
          />
        )}
        {page === 'chatbot' && (
          <Chatbot 
            currentUser={currentUser} 
            deals={deals} 
            users={users} 
          />
        )}
      </main>
    </div>
  );
}
