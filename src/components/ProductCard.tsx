import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, TrendingDown, Minus, MessageCircle, Brain, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { Listing } from '../types';
import { translate } from '../services/translationService';
import { getPriceInsight } from '../services/priceService';
import { MarketTrendChart } from './MarketTrendChart';
import { CropInsightCard } from './CropInsightCard';
import { useApp } from '../contexts/AppContext';

interface ProductCardProps {
  listing: Listing;
  onContact: (listing: Listing) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ listing, onContact }) => {
  const { state } = useApp();
  const [priceInsight, setPriceInsight] = useState<any>(null);
  const [showAIExplanation, setShowAIExplanation] = useState(false);
  const [showTrendChart, setShowTrendChart] = useState(false);
  const [showCropInsight, setShowCropInsight] = useState(false);

  useEffect(() => {
    getPriceInsight(listing.product.name).then(setPriceInsight);
  }, [listing.product.name]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriceColor = () => {
    if (!priceInsight) return 'text-gray-900';
    
    if (listing.pricePerUnit <= priceInsight.averagePrice * 0.9) {
      return 'text-green-600'; // Good deal
    } else if (listing.pricePerUnit >= priceInsight.averagePrice * 1.1) {
      return 'text-red-600'; // Above market
    }
    return 'text-gray-900'; // Fair price
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {listing.product.name}
          </h3>
          <p className="text-sm text-gray-600">{listing.vendorName}</p>
        </div>
        {priceInsight && (
          <div className="flex items-center space-x-1 text-sm">
            {getTrendIcon(priceInsight.trend)}
            <span className="text-gray-500">
              {translate('Market Trends', state.currentLanguage)}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {translate('Price', state.currentLanguage)}:
          </span>
          <span className={`font-bold text-lg ${getPriceColor()}`}>
            ₹{listing.pricePerUnit}/{listing.product.unit}
          </span>
        </div>

        {priceInsight && (
          <>
            <div className="text-xs text-gray-500">
              Market avg: ₹{priceInsight.averagePrice}/{listing.product.unit}
            </div>
            
            {/* AI Price Analysis Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
              <button
                onClick={() => setShowAIExplanation(!showAIExplanation)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    {translate('AI Price Analysis', state.currentLanguage)}
                  </span>
                  {/* AI Confidence Indicator */}
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                    {Math.round(priceInsight.aiExplanation.confidence * 100)}% confidence
                  </span>
                </div>
                {showAIExplanation ? (
                  <ChevronUp className="h-4 w-4 text-blue-600" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-blue-600" />
                )}
              </button>
              
              {showAIExplanation && priceInsight.aiExplanation && (
                <div className="mt-3 space-y-3">
                  <div className="text-sm text-blue-700">
                    <strong>{translate('Fair Price Range', state.currentLanguage)}:</strong> ₹{priceInsight.minPrice}–₹{priceInsight.maxPrice}
                  </div>
                  <p className="text-xs text-blue-600">
                    {priceInsight.aiExplanation.explanation}
                  </p>
                  <div className="text-xs text-blue-500">
                    <strong>Key Factors:</strong> {priceInsight.aiExplanation.factors.join(', ')}
                  </div>
                  
                  {/* Enhanced Confidence Explanation */}
                  <div className="bg-white rounded p-2 border border-blue-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-blue-600 font-medium">AI Confidence Analysis:</span>
                      <span className="font-bold text-blue-700">
                        {Math.round(priceInsight.aiExplanation.confidence * 100)}%
                      </span>
                    </div>
                    <p className="text-xs text-blue-600">
                      {priceInsight.aiExplanation.confidenceReason}
                    </p>
                  </div>
                  
                  <div className="text-xs text-blue-600 font-medium bg-blue-100 rounded p-2">
                    💡 {priceInsight.aiExplanation.recommendation}
                  </div>
                </div>
              )}
            </div>

            {/* Market Trend Visualization */}
            {priceInsight.trendData && (
              <div className="mt-3">
                <button
                  onClick={() => setShowTrendChart(!showTrendChart)}
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Market Trend Analysis</span>
                  {showTrendChart ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </button>
                
                {showTrendChart && (
                  <MarketTrendChart
                    data={priceInsight.trendData}
                    productName={listing.product.name}
                    trend={priceInsight.trend}
                  />
                )}
              </div>
            )}

            {/* Crop-Specific AI Insights */}
            {priceInsight.cropInsight && (
              <div className="mt-3">
                <button
                  onClick={() => setShowCropInsight(!showCropInsight)}
                  className="flex items-center space-x-2 text-sm text-indigo-700 hover:text-indigo-900 transition-colors"
                >
                  <Brain className="h-4 w-4" />
                  <span>Crop Intelligence</span>
                  {showCropInsight ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </button>
                
                {showCropInsight && (
                  <CropInsightCard
                    cropInsight={priceInsight.cropInsight}
                    productName={listing.product.name}
                  />
                )}
              </div>
            )}
          </>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {translate('Quantity', state.currentLanguage)}:
          </span>
          <span className="font-medium">
            {listing.quantity} {listing.product.unit}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {listing.location}
        </div>
      </div>

      <button
        onClick={() => onContact(listing)}
        className="w-full btn-primary flex items-center justify-center space-x-2"
      >
        <MessageCircle className="h-4 w-4" />
        <span>{translate('Send Message', state.currentLanguage)}</span>
      </button>
    </div>
  );
};