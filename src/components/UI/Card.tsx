import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => (
  <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-md ${className}`}>
    <h3 className="text-lg font-semibold text-gray-200 mb-4">{title}</h3>
    {children}
  </div>
);
