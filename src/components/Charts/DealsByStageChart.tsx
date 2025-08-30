import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Deal {
  stage: string;
}

interface DealsByStageChartProps {
  data: Deal[];
}

export const DealsByStageChart: React.FC<DealsByStageChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const stages = ['Lead', 'Contacted', 'Negotiation', 'Won', 'Lost'];
    return stages.map(stage => ({
      name: stage,
      count: data.filter(deal => deal.stage === stage).length,
    }));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis dataKey="name" stroke="#888888" />
        <YAxis stroke="#888888" />
        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
        <Legend />
        <Bar dataKey="count" name="Số lượng Deal" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};
