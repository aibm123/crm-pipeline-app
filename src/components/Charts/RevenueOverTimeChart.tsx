import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Deal {
  stage: string;
  value: number;
  created: string;
}

interface RevenueOverTimeChartProps {
  data: Deal[];
}

export const RevenueOverTimeChart: React.FC<RevenueOverTimeChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const wonDeals = data.filter(deal => deal.stage === 'Won');
    const revenueByMonth: Record<string, number> = {};
    
    wonDeals.forEach(deal => {
      const month = new Date(deal.created).toLocaleString('default', { month: 'short', year: 'numeric' });
      if (!revenueByMonth[month]) {
        revenueByMonth[month] = 0;
      }
      revenueByMonth[month] += deal.value;
    });
    
    return Object.keys(revenueByMonth).map(month => ({
      name: month,
      revenue: revenueByMonth[month]
    })).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
  }, [data]);
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis dataKey="name" stroke="#888888" />
        <YAxis stroke="#888888" tickFormatter={(value) => `$${value/1000}k`} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} 
          formatter={(value) => `$${value.toLocaleString()}`} 
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          name="Doanh thu" 
          stroke="#10b981" 
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
