import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { User } from '../../services/api';

interface MemberManagementProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const MemberManagement: React.FC<MemberManagementProps> = ({ users, setUsers }) => {
  const handleRoleChange = async (userId: number, newRole: string) => {
    // TODO: Call API service to update user role
    console.log(`Thay đổi vai trò cho user ${userId} thành ${newRole}`);
    setUsers(users.map(u => u.id === userId ? { ...u, quyen: newRole } : u));
  };

  const handleDeleteUser = async (userId: number) => {
    // TODO: Call API service to delete user
    console.log(`Xóa user ${userId}`);
    setUsers(users.filter(u => u.id !== userId));
  };
  
  return (
    <Card title="Quản lý Thành viên">
      <div className="mb-4">
        <Button>
          <PlusCircle size={16} /> Thêm thành viên mới
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-gray-700 text-xs text-gray-400 uppercase">
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">Quyền</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="p-3 font-medium text-white">{user.mail}</td>
                <td className="p-3">
                  <select 
                    value={user.quyen} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-gray-600 text-white p-1 rounded"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="p-3">
                  <button 
                    onClick={() => handleDeleteUser(user.id)} 
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
