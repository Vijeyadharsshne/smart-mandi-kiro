import React from 'react';
import { MarketTrendData } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarketTrendChartProps {
  data: MarketTrendData[];
  productName: string;
  trend: 'up' | 'down' | 'stable';
}

export const MarketTrendChart: React.FC<MarketTrendChartProps> = ({ 
  data, 
  productName, 
  trend 
}) => {
  if (!data || data.length === 0) return null;

  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const priceRange = maxPrice - minPrice || 1;

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <h4 className="text-sm font-medium text-gray-800">
            7-Day Price Trend - {productName}
          </h4>
        </div>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          AI Interpreted
        </span>
      </div>

      {/* Simple Line Chart */}
      <div className="relative h-24 bg-white rounded border">
        <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="50" height="20" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Price line */}
          <polyline
            fill="none"
            stroke={trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#6b7280'}
            strokeWidth="2"
            points={data.map((point, index) => {
              const x = (index / (data.length - 1)) * 280 + 10;
              const y = 70 - ((point.price - minPrice) / priceRange) * 50;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 280 + 10;
            const y = 70 - ((point.price - minPrice) / priceRange) * 50;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill={trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#6b7280'}
              />
            );
          })}
        </svg>
      </div>

      {/* Chart labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{data[0]?.date.split('-').slice(1).join('/')}</span>
        <span className={`font-medium ${getTrendColor()}`}>
          Latest: ₹{data[data.length - 1]?.price}
        </span>
        <span>{data[data.length - 1]?.date.split('-').slice(1).join('/')}</span>
      </div>

      {/* Volume indicator */}
      <div className="mt-2 text-xs text-gray-600">
        <span>Avg Volume: {Math.round(data.reduce((sum, d) => sum + d.volume, 0) / data.length)} tons/day</span>
      </div>
    </div>
  );
};