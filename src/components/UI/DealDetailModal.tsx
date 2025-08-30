import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Deal } from '../../services/api';

interface DealDetailModalProps {
  deal: Deal | null;
  onClose: () => void;
  onSave: (deal: Deal) => void;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({ deal, onClose, onSave }) => {
  const [editedDeal, setEditedDeal] = useState<Deal | null>(null);

  useEffect(() => {
    setEditedDeal(deal);
  }, [deal]);

  if (!editedDeal) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedDeal(prev => prev ? {...prev, [name]: value} : null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg border border-gray-700 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Chi tiết Deal</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Tên Deal</label>
            <input 
              type="text" 
              name="name" 
              value={editedDeal.name} 
              onChange={handleChange} 
              className="w-full bg-gray-700 text-white p-2 rounded mt-1" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Tên Khách hàng</label>
            <input 
              type="text" 
              name="customer" 
              value={editedDeal.customer} 
              onChange={handleChange} 
              className="w-full bg-gray-700 text-white p-2 rounded mt-1" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Giá trị</label>
            <input 
              type="number" 
              name="value" 
              value={editedDeal.value} 
              onChange={handleChange} 
              className="w-full bg-gray-700 text-white p-2 rounded mt-1" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Giai đoạn</label>
            <select 
              name="stage" 
              value={editedDeal.stage} 
              onChange={handleChange} 
              className="w-full bg-gray-700 text-white p-2 rounded mt-1"
            >
              <option>Lead</option>
              <option>Contacted</option>
              <option>Negotiation</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button onClick={onClose} variant="secondary">Hủy</Button>
          <Button onClick={() => onSave(editedDeal)}>Lưu thay đổi</Button>
        </div>
      </div>
    </div>
  );
};
