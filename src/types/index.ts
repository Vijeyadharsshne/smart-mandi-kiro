export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'gu' | 'mr' | 'kn';

export interface User {
  id: string;
  name: string;
  type: 'vendor' | 'buyer';
  language: Language;
  location: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  image?: string;
  description?: string;
}

export interface Listing {
  id: string;
  vendorId: string;
  vendorName: string;
  product: Product;
  quantity: number;
  pricePerUnit: number;
  location: string;
  createdAt: Date;
  isActive: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  originalContent?: string;
  originalLanguage?: Language;
  timestamp: Date;
  type: 'text' | 'offer' | 'counter_offer';
  offerAmount?: number;
}

export interface Negotiation {
  id: string;
  listingId: string;
  buyerId: string;
  vendorId: string;
  currentOffer: number;
  status: 'active' | 'accepted' | 'rejected' | 'expired';
  messages: ChatMessage[];
  createdAt: Date;
}

export interface PriceInsight {
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  lastUpdated: Date;
}