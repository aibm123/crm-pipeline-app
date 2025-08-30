import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Deal {
  stage: string;
  value: number;
}

interface ValueByStageChartProps {
  data: Deal[];
}

export const ValueByStageChart: React.FC<ValueByStageChartProps> = ({ data }) => {
  const COLORS = ['#0ea5e9', '#6366f1', '#f97316', '#10b981', '#ef4444'];
  
  const chartData = useMemo(() => {
    const stages = ['Lead', 'Contacted', 'Negotiation', 'Won', 'Lost'];
    return stages.map(stage => ({
      name: stage,
      value: data.filter(deal => deal.stage === stage).reduce((sum, deal) => sum + deal.value, 0),
    })).filter(item => item.value > 0);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={110}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} 
          formatter={(value) => `$${value.toLocaleString()}`} 
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
