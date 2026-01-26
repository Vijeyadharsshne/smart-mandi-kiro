import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, TrendingDown, Minus, MessageCircle } from 'lucide-react';
import { Listing, PriceInsight } from '../types';
import { translate } from '../services/translationService';
import { getPriceInsight } from '../services/priceService';
import { useApp } from '../contexts/AppContext';

interface ProductCardProps {
  listing: Listing;
  onContact: (listing: Listing) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ listing, onContact }) => {
  const { state } = useApp();
  const [priceInsight, setPriceInsight] = useState<PriceInsight | null>(null);

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
            <span className="text-gray-500">Market</span>
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
          <div className="text-xs text-gray-500">
            Market avg: ₹{priceInsight.averagePrice}/{listing.product.unit}
          </div>
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