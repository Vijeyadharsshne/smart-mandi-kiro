import React from 'react';
import { Calendar, Users, Target, Award, Clock } from 'lucide-react';
import { CropInsight } from '../types';
import { translate } from '../services/translationService';
import { useApp } from '../contexts/AppContext';

interface CropInsightCardProps {
  cropInsight: CropInsight;
  productName: string;
}

export const CropInsightCard: React.FC<CropInsightCardProps> = ({ 
  cropInsight, 
  productName 
}) => {
  const { state } = useApp();

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getDemandIcon = (level: string) => {
    switch (level) {
      case 'high':
        return '🔥';
      case 'medium':
        return '📊';
      case 'low':
        return '📉';
      default:
        return '📊';
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 mt-3 border border-indigo-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-indigo-800 flex items-center space-x-2">
          <Target className="h-4 w-4" />
          <span>AI Crop Intelligence - {productName}</span>
        </h4>
        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
          Smart Insights
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Optimal Selling Window */}
        <div className="bg-white rounded-lg p-3 border border-indigo-100">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-medium text-indigo-700">Optimal Window</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">{cropInsight.optimalSellingWindow}</p>
        </div>

        {/* Demand Level */}
        <div className="bg-white rounded-lg p-3 border border-indigo-100">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm">{getDemandIcon(cropInsight.demandLevel)}</span>
            <span className="text-xs font-medium text-indigo-700">Demand Level</span>
          </div>
          <div className={`text-sm font-semibold px-2 py-1 rounded-full ${getDemandColor(cropInsight.demandLevel)}`}>
            {cropInsight.demandLevel.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Recommended Buyer Type */}
      <div className="bg-white rounded-lg p-3 border border-indigo-100 mb-3">
        <div className="flex items-center space-x-2 mb-1">
          <Users className="h-4 w-4 text-indigo-600" />
          <span className="text-xs font-medium text-indigo-700">Best Buyers</span>
        </div>
        <p className="text-sm font-semibold text-gray-800">{cropInsight.recommendedBuyerType}</p>
      </div>

      {/* Quality Premium */}
      <div className="bg-white rounded-lg p-3 border border-indigo-100 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-medium text-indigo-700">Quality Premium</span>
          </div>
          <span className="text-sm font-bold text-green-600">+{cropInsight.qualityPremium}%</span>
        </div>
      </div>

      {/* Seasonal Factors */}
      <div className="bg-white rounded-lg p-3 border border-indigo-100">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="h-4 w-4 text-indigo-600" />
          <span className="text-xs font-medium text-indigo-700">Key Factors</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {cropInsight.seasonalFactors.map((factor, index) => (
            <span
              key={index}
              className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
            >
              {factor}
            </span>
          ))}
        </div>
      </div>

      {/* Bharat Impact Mode Enhancement */}
      {state.bharatImpactMode.enabled && state.bharatImpactMode.smallFarmerGuidance && (
        <div className="mt-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm">🇮🇳</span>
            <span className="text-xs font-medium text-orange-700">Bharat Farmer Guidance</span>
          </div>
          <p className="text-xs text-orange-600">
            {cropInsight.demandLevel === 'high' 
              ? "Excellent opportunity! Consider direct sales to maximize returns."
              : cropInsight.demandLevel === 'medium'
              ? "Stable market. Focus on quality to get premium pricing."
              : "Consider value addition or cooperative selling for better prices."
            }
          </p>
        </div>
      )}
    </div>
  );
};