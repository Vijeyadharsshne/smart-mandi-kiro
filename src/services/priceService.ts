import { PriceInsight, Product } from '../types';

// Mock mandi price data - in production, integrate with real mandi APIs
const mockPriceData: Record<string, PriceInsight> = {
  'tomato': {
    averagePrice: 25,
    minPrice: 20,
    maxPrice: 30,
    trend: 'up',
    confidence: 0.85,
    lastUpdated: new Date()
  },
  'onion': {
    averagePrice: 18,
    minPrice: 15,
    maxPrice: 22,
    trend: 'stable',
    confidence: 0.90,
    lastUpdated: new Date()
  },
  'potato': {
    averagePrice: 12,
    minPrice: 10,
    maxPrice: 15,
    trend: 'down',
    confidence: 0.88,
    lastUpdated: new Date()
  },
  'rice': {
    averagePrice: 45,
    minPrice: 40,
    maxPrice: 50,
    trend: 'stable',
    confidence: 0.92,
    lastUpdated: new Date()
  },
  'wheat': {
    averagePrice: 22,
    minPrice: 20,
    maxPrice: 25,
    trend: 'up',
    confidence: 0.87,
    lastUpdated: new Date()
  }
};

export const getPriceInsight = async (productName: string): Promise<PriceInsight | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const key = productName.toLowerCase();
  return mockPriceData[key] || null;
};

export const suggestFairPrice = (
  productName: string,
  currentOffer: number,
  isVendor: boolean
): number => {
  const insight = mockPriceData[productName.toLowerCase()];
  if (!insight) return currentOffer;
  
  const { averagePrice, minPrice, maxPrice } = insight;
  
  if (isVendor) {
    // Vendor: suggest price closer to average or slightly above
    if (currentOffer < averagePrice) {
      return Math.min(averagePrice, currentOffer * 1.1);
    }
    return Math.min(maxPrice, currentOffer * 1.05);
  } else {
    // Buyer: suggest price closer to average or slightly below
    if (currentOffer > averagePrice) {
      return Math.max(averagePrice, currentOffer * 0.9);
    }
    return Math.max(minPrice, currentOffer * 0.95);
  }
};

export const generateNegotiationResponse = (
  productName: string,
  offer: number,
  isVendor: boolean
): string => {
  const insight = mockPriceData[productName.toLowerCase()];
  if (!insight) return isVendor ? "Let me consider your offer." : "That seems reasonable.";
  
  const { averagePrice } = insight;
  const fairPrice = suggestFairPrice(productName, offer, isVendor);
  
  if (isVendor) {
    if (offer >= averagePrice) {
      return `Your offer of ₹${offer} is fair. I can accept this price.`;
    } else {
      return `The market rate for ${productName} is around ₹${averagePrice}. How about ₹${fairPrice}?`;
    }
  } else {
    if (offer <= averagePrice) {
      return `₹${offer} seems reasonable for ${productName}. Let's proceed.`;
    } else {
      return `The current market rate is ₹${averagePrice}. Would you consider ₹${fairPrice}?`;
    }
  }
};