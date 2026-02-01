import { PriceInsight, MarketTrendData, CropInsight, FairTradeAlert } from '../types';

export interface AIExplanation {
  explanation: string;
  factors: string[];
  confidence: number;
  confidenceReason: string;
  recommendation: string;
}

export interface EnhancedPriceInsight extends PriceInsight {
  aiExplanation: AIExplanation;
  trendData: MarketTrendData[];
  cropInsight: CropInsight;
}

// Enhanced mock mandi price data with advanced AI features
const mockPriceData: Record<string, EnhancedPriceInsight> = {
  'tomato': {
    averagePrice: 25,
    minPrice: 20,
    maxPrice: 30,
    trend: 'up',
    confidence: 0.85,
    lastUpdated: new Date(),
    aiExplanation: {
      explanation: "Based on recent mandi trends, seasonal demand, and buyer activity, the suggested fair price range is ₹20–₹30.",
      factors: ["High seasonal demand", "Limited supply due to weather", "Increased buyer activity"],
      confidence: 0.85,
      confidenceReason: "High confidence due to stable recent market trends and consistent data patterns",
      recommendation: "Prices trending upward - good time for vendors to sell"
    },
    trendData: [
      { date: '2024-01-25', price: 22, volume: 1200 },
      { date: '2024-01-26', price: 23, volume: 1150 },
      { date: '2024-01-27', price: 24, volume: 1300 },
      { date: '2024-01-28', price: 25, volume: 1250 },
      { date: '2024-01-29', price: 26, volume: 1400 },
      { date: '2024-01-30', price: 25, volume: 1350 },
      { date: '2024-01-31', price: 27, volume: 1500 }
    ],
    cropInsight: {
      optimalSellingWindow: "Next 7-10 days",
      demandLevel: 'high',
      recommendedBuyerType: "Retail chains and restaurants",
      seasonalFactors: ["Winter harvest peak", "Festival season demand"],
      qualityPremium: 15
    }
  },
  'onion': {
    averagePrice: 18,
    minPrice: 15,
    maxPrice: 22,
    trend: 'stable',
    confidence: 0.90,
    lastUpdated: new Date(),
    aiExplanation: {
      explanation: "Market analysis shows stable pricing with consistent supply-demand balance, suggesting ₹15–₹22 range.",
      factors: ["Steady supply chain", "Normal seasonal patterns", "Balanced demand"],
      confidence: 0.90,
      confidenceReason: "Very high confidence due to consistent market behavior and reliable data sources",
      recommendation: "Stable market conditions - fair pricing for both parties"
    },
    trendData: [
      { date: '2024-01-25', price: 17, volume: 2200 },
      { date: '2024-01-26', price: 18, volume: 2150 },
      { date: '2024-01-27', price: 18, volume: 2300 },
      { date: '2024-01-28', price: 17, volume: 2250 },
      { date: '2024-01-29', price: 18, volume: 2400 },
      { date: '2024-01-30', price: 19, volume: 2350 },
      { date: '2024-01-31', price: 18, volume: 2300 }
    ],
    cropInsight: {
      optimalSellingWindow: "Anytime in next 2 weeks",
      demandLevel: 'medium',
      recommendedBuyerType: "Wholesale markets and processors",
      seasonalFactors: ["Post-harvest stability", "Consistent consumption"],
      qualityPremium: 8
    }
  },
  'potato': {
    averagePrice: 12,
    minPrice: 10,
    maxPrice: 15,
    trend: 'down',
    confidence: 0.88,
    lastUpdated: new Date(),
    aiExplanation: {
      explanation: "Recent harvest surplus and reduced export demand indicate declining prices, fair range ₹10–₹15.",
      factors: ["Surplus harvest", "Reduced export demand", "Storage availability"],
      confidence: 0.88,
      confidenceReason: "High confidence based on government procurement data and storage reports",
      recommendation: "Buyers have negotiation advantage - good time to purchase"
    },
    trendData: [
      { date: '2024-01-25', price: 15, volume: 3200 },
      { date: '2024-01-26', price: 14, volume: 3150 },
      { date: '2024-01-27', price: 13, volume: 3300 },
      { date: '2024-01-28', price: 12, volume: 3250 },
      { date: '2024-01-29', price: 12, volume: 3400 },
      { date: '2024-01-30', price: 11, volume: 3350 },
      { date: '2024-01-31', price: 12, volume: 3500 }
    ],
    cropInsight: {
      optimalSellingWindow: "Immediate sale recommended",
      demandLevel: 'low',
      recommendedBuyerType: "Food processors and cold storage",
      seasonalFactors: ["Post-harvest glut", "Storage costs rising"],
      qualityPremium: 5
    }
  },
  'rice': {
    averagePrice: 45,
    minPrice: 40,
    maxPrice: 50,
    trend: 'stable',
    confidence: 0.92,
    lastUpdated: new Date(),
    aiExplanation: {
      explanation: "Government procurement and steady demand maintain stable pricing at ₹40–₹50 per kg.",
      factors: ["Government support price", "Steady consumption", "Quality grade variations"],
      confidence: 0.92,
      confidenceReason: "Very high confidence due to government price support and MSP data",
      recommendation: "Stable commodity - reliable pricing for long-term contracts"
    },
    trendData: [
      { date: '2024-01-25', price: 44, volume: 800 },
      { date: '2024-01-26', price: 45, volume: 850 },
      { date: '2024-01-27', price: 45, volume: 830 },
      { date: '2024-01-28', price: 46, volume: 820 },
      { date: '2024-01-29', price: 45, volume: 840 },
      { date: '2024-01-30', price: 45, volume: 860 },
      { date: '2024-01-31', price: 45, volume: 850 }
    ],
    cropInsight: {
      optimalSellingWindow: "Flexible - stable market",
      demandLevel: 'high',
      recommendedBuyerType: "Government agencies and mills",
      seasonalFactors: ["MSP support", "Export opportunities"],
      qualityPremium: 20
    }
  },
  'wheat': {
    averagePrice: 22,
    minPrice: 20,
    maxPrice: 25,
    trend: 'up',
    confidence: 0.87,
    lastUpdated: new Date(),
    aiExplanation: {
      explanation: "Rising flour demand and festival season approach drive prices up, suggesting ₹20–₹25 range.",
      factors: ["Festival season demand", "Flour mill requirements", "Quality premium"],
      confidence: 0.87,
      confidenceReason: "High confidence based on seasonal patterns and mill procurement data",
      recommendation: "Upward trend expected - vendors should consider timing"
    },
    trendData: [
      { date: '2024-01-25', price: 20, volume: 1800 },
      { date: '2024-01-26', price: 21, volume: 1750 },
      { date: '2024-01-27', price: 21, volume: 1900 },
      { date: '2024-01-28', price: 22, volume: 1850 },
      { date: '2024-01-29', price: 23, volume: 1950 },
      { date: '2024-01-30', price: 22, volume: 1900 },
      { date: '2024-01-31', price: 23, volume: 2000 }
    ],
    cropInsight: {
      optimalSellingWindow: "Next 5-7 days for premium",
      demandLevel: 'high',
      recommendedBuyerType: "Flour mills and exporters",
      seasonalFactors: ["Festival demand surge", "Quality harvest"],
      qualityPremium: 12
    }
  }
};

export const getPriceInsight = async (productName: string): Promise<EnhancedPriceInsight | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const key = productName.toLowerCase();
  return mockPriceData[key] || null;
};

export const getAIExplanation = async (productName: string): Promise<AIExplanation | null> => {
  const insight = await getPriceInsight(productName);
  return insight?.aiExplanation || null;
};

export const getCropInsight = async (productName: string): Promise<CropInsight | null> => {
  const insight = await getPriceInsight(productName);
  return insight?.cropInsight || null;
};

export const generateFairTradeAlert = (
  productName: string,
  offeredPrice: number,
  isVendor: boolean
): FairTradeAlert | null => {
  const insight = mockPriceData[productName.toLowerCase()];
  if (!insight) return null;

  const { minPrice, maxPrice, averagePrice } = insight;
  const deviation = Math.abs(offeredPrice - averagePrice) / averagePrice;

  if (offeredPrice < minPrice * 0.8) {
    return {
      id: Date.now().toString(),
      type: 'price_too_low',
      severity: 'high',
      message: `⚠️ Price Alert: ₹${offeredPrice} is significantly below fair market range (₹${minPrice}-₹${maxPrice})`,
      recommendation: isVendor 
        ? "Consider rejecting this offer. Your produce deserves fair pricing."
        : "This offer may be unfair to the farmer. Consider increasing your offer.",
      isActive: true
    };
  }

  if (offeredPrice > maxPrice * 1.2) {
    return {
      id: Date.now().toString(),
      type: 'price_too_high',
      severity: 'medium',
      message: `💰 Price Alert: ₹${offeredPrice} is above typical market range (₹${minPrice}-₹${maxPrice})`,
      recommendation: isVendor 
        ? "Great offer! This is above market rate."
        : "This price is higher than market average. Verify quality justification.",
      isActive: true
    };
  }

  if (deviation > 0.15) {
    return {
      id: Date.now().toString(),
      type: 'market_volatility',
      severity: 'low',
      message: `📊 Market Notice: Price varies from average by ${Math.round(deviation * 100)}%`,
      recommendation: "Consider current market conditions and quality factors.",
      isActive: true
    };
  }

  return null;
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

export const generateIntelligentResponse = (
  message: string,
  productName: string,
  currentOffer: number,
  isVendor: boolean
): string => {
  const insight = mockPriceData[productName.toLowerCase()];
  if (!insight) return "Thank you for your message. Let me consider your proposal.";

  const { averagePrice, minPrice, maxPrice } = insight;
  const lowerMessage = message.toLowerCase();

  // Keyword-based intelligent responses
  if (lowerMessage.includes('accept') || lowerMessage.includes('agree')) {
    return isVendor 
      ? `Great! I'm happy to accept your offer of ₹${currentOffer}. This seems fair for both of us.`
      : `Excellent! I accept your price of ₹${currentOffer}. Looking forward to doing business.`;
  }

  if (lowerMessage.includes('bulk') || lowerMessage.includes('quantity')) {
    const bulkDiscount = Math.round(averagePrice * 0.95);
    return isVendor
      ? `For bulk orders, I can offer a special price of ₹${bulkDiscount} per ${insight.cropInsight?.optimalSellingWindow.includes('Immediate') ? 'kg' : 'unit'}. What quantity are you looking for?`
      : `I'm interested in bulk purchase. Can you provide better rates for larger quantities?`;
  }

  if (lowerMessage.includes('negotiate') || lowerMessage.includes('discuss')) {
    return isVendor
      ? `I'm open to negotiation. The current market rate is ₹${averagePrice}, but I understand your position. What would work for you?`
      : `Let's find a fair price that works for both of us. I see the market average is ₹${averagePrice}.`;
  }

  if (lowerMessage.includes('offer') && /₹?\d+/.test(message)) {
    const offeredAmount = parseInt(message.match(/₹?(\d+)/)?.[1] || '0');
    if (offeredAmount < minPrice) {
      return isVendor
        ? `I appreciate your offer of ₹${offeredAmount}, but it's below the fair market range (₹${minPrice}-₹${maxPrice}). Can we discuss ₹${Math.round((minPrice + averagePrice) / 2)}?`
        : `My offer of ₹${offeredAmount} might be low. Let me reconsider based on current market rates.`;
    } else if (offeredAmount > maxPrice) {
      return isVendor
        ? `Your generous offer of ₹${offeredAmount} is above market rate! I'm happy to accept this premium price.`
        : `I'm offering ₹${offeredAmount} which is above average market rate. I hope this shows my commitment to fair trade.`;
    } else {
      return isVendor
        ? `₹${offeredAmount} is within the fair range. I can work with this price.`
        : `My offer of ₹${offeredAmount} aligns with current market rates. I hope this works for you.`;
    }
  }

  // Default intelligent response based on market conditions
  if (insight.trend === 'up') {
    return isVendor
      ? `Market prices are trending upward for ${productName}. Current fair range is ₹${minPrice}-₹${maxPrice}. What are your thoughts?`
      : `I notice prices are rising for ${productName}. I'd like to secure a fair deal soon.`;
  } else if (insight.trend === 'down') {
    return isVendor
      ? `While prices are softening, I believe ₹${averagePrice} is still fair for quality ${productName}.`
      : `With current market trends, I'm hoping we can find a mutually beneficial price.`;
  }

  return isVendor
    ? `Thank you for your interest in my ${productName}. The current market rate is ₹${averagePrice}. How can we make this work?`
    : `I'm interested in your ${productName}. Based on market rates around ₹${averagePrice}, what would be your best price?`;
};

export const generateNegotiationSuggestions = (
  productName: string,
  currentOffer: number,
  isVendor: boolean
): string[] => {
  const insight = mockPriceData[productName.toLowerCase()];
  if (!insight) return ["Let me consider your offer"];

  const { averagePrice } = insight;
  const fairPrice = suggestFairPrice(productName, currentOffer, isVendor);

  if (isVendor) {
    return [
      `Offer fair counter price: ₹${fairPrice}`,
      `Accept suggested market price: ₹${averagePrice}`,
      `Request bulk discount consideration`,
      `Highlight quality premium factors`
    ];
  } else {
    return [
      `Offer fair counter price: ₹${fairPrice}`,
      `Accept suggested market price: ₹${averagePrice}`,
      `Request bulk discount for large quantity`,
      `Negotiate based on market trends`
    ];
  }
};