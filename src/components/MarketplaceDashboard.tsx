import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, TrendingUp, Users, Clock, Award } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ChatInterface } from './ChatInterface';
import { BharatImpactToggle } from './BharatImpactToggle';
import { FinalistShowcase } from './FinalistShowcase';
import { Listing, Negotiation, Product } from '../types';
import { translate } from '../services/translationService';
import { useApp } from '../contexts/AppContext';

// Mock data for demonstration
const mockProducts: Product[] = [
  { id: '1', name: 'Tomato', category: 'Vegetables', unit: 'kg' },
  { id: '2', name: 'Onion', category: 'Vegetables', unit: 'kg' },
  { id: '3', name: 'Potato', category: 'Vegetables', unit: 'kg' },
  { id: '4', name: 'Rice', category: 'Grains', unit: 'kg' },
  { id: '5', name: 'Wheat', category: 'Grains', unit: 'kg' },
];

const mockListings: Listing[] = [
  {
    id: '1',
    vendorId: 'vendor1',
    vendorName: 'Raj Kumar',
    product: mockProducts[0],
    quantity: 100,
    pricePerUnit: 28,
    location: 'Delhi Mandi',
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: '2',
    vendorId: 'vendor2',
    vendorName: 'Priya Sharma',
    product: mockProducts[1],
    quantity: 50,
    pricePerUnit: 16,
    location: 'Mumbai Market',
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: '3',
    vendorId: 'vendor3',
    vendorName: 'Suresh Patel',
    product: mockProducts[2],
    quantity: 200,
    pricePerUnit: 14,
    location: 'Pune Mandi',
    createdAt: new Date(),
    isActive: true,
  },
];

export const MarketplaceDashboard: React.FC = () => {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentNegotiation, setCurrentNegotiation] = useState<Negotiation | null>(null);
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);

  useEffect(() => {
    dispatch({ type: 'SET_LISTINGS', payload: mockListings });
  }, [dispatch]);

  const filteredListings = state.listings.filter((listing) => {
    const matchesSearch = listing.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || listing.product.category === selectedCategory;
    return matchesSearch && matchesCategory && listing.isActive;
  });

  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  const handleContactVendor = (listing: Listing) => {
    if (!state.user) return;

    const negotiation: Negotiation = {
      id: Date.now().toString(),
      listingId: listing.id,
      buyerId: state.user.type === 'buyer' ? state.user.id : 'buyer1',
      vendorId: state.user.type === 'vendor' ? state.user.id : listing.vendorId,
      currentOffer: listing.pricePerUnit,
      status: 'active',
      messages: [
        {
          id: '1',
          senderId: state.user.id,
          senderName: state.user.name,
          content: `Hi! I'm interested in your ${listing.product.name}. Can we discuss the price?`,
          timestamp: new Date(),
          type: 'text',
        }
      ],
      createdAt: new Date(),
    };

    setCurrentNegotiation(negotiation);
    setCurrentListing(listing);
    dispatch({ type: 'ADD_NEGOTIATION', payload: negotiation });
  };

  const handleUpdateNegotiation = (updatedNegotiation: Negotiation) => {
    setCurrentNegotiation(updatedNegotiation);
    dispatch({ type: 'UPDATE_NEGOTIATION', payload: updatedNegotiation });
  };

  const handleBackToMarketplace = () => {
    setCurrentNegotiation(null);
    setCurrentListing(null);
  };

  if (currentNegotiation && currentListing) {
    return (
      <ChatInterface
        negotiation={currentNegotiation}
        listing={currentListing}
        onBack={handleBackToMarketplace}
        onUpdateNegotiation={handleUpdateNegotiation}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Finalist Showcase */}
      <FinalistShowcase />

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={translate('Search products or vendors', state.currentLanguage)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">{translate('All Categories', state.currentLanguage)}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bharat Impact Mode Toggle */}
      <div className="mb-6">
        <BharatImpactToggle />
      </div>

      {/* Welcome Message */}
      <div className={`mb-6 rounded-lg p-6 ${
        state.bharatImpactMode.enabled 
          ? 'bg-gradient-to-r from-orange-50 to-green-50 border border-orange-200' 
          : 'bg-gradient-to-r from-primary-50 to-secondary-50'
      }`}>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {translate('Welcome', state.currentLanguage)}, {state.user?.name}!
        </h2>
        <p className="text-gray-600">
          {state.user?.type === 'buyer' 
            ? state.bharatImpactMode.enabled
              ? 'Discover fresh products with AI-powered fair pricing that supports our farmers 🇮🇳'
              : 'Discover fresh products from local vendors with AI-powered fair pricing.'
            : state.bharatImpactMode.enabled
              ? 'Connect with buyers using smart tools designed to protect farmer interests 🇮🇳'
              : 'Manage your listings and connect with buyers using smart negotiation tools.'
          }
        </p>
        {state.bharatImpactMode.enabled && (
          <div className="mt-2 text-sm text-orange-700 font-medium">
            🎯 Active: Fair Trade Protection • Enhanced Multilingual • Farmer-First Guidance
          </div>
        )}
      </div>

      {/* Impact Metrics Panel */}
      <div className={`mb-6 rounded-lg shadow-sm border p-6 ${
        state.bharatImpactMode.enabled 
          ? 'bg-gradient-to-br from-white to-orange-50 border-orange-200' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <span>{translate('Impact Metrics', state.currentLanguage)}</span>
            {state.bharatImpactMode.enabled && <span className="text-lg">🇮🇳</span>}
          </h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {state.bharatImpactMode.enabled ? 'Bharat Impact Mode' : 'Demo Data'}
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`text-center p-4 rounded-lg ${
            state.bharatImpactMode.enabled ? 'bg-green-100' : 'bg-green-50'
          }`}>
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">
              {state.bharatImpactMode.enabled ? '18%' : '15%'}
            </div>
            <div className="text-sm text-green-600">
              {translate('Improved Price Realization', state.currentLanguage)}
            </div>
          </div>
          
          <div className={`text-center p-4 rounded-lg ${
            state.bharatImpactMode.enabled ? 'bg-blue-100' : 'bg-blue-50'
          }`}>
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">8</div>
            <div className="text-sm text-blue-600">Languages Supported</div>
          </div>
          
          <div className={`text-center p-4 rounded-lg ${
            state.bharatImpactMode.enabled ? 'bg-purple-100' : 'bg-purple-50'
          }`}>
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">
              {state.bharatImpactMode.enabled ? '75%' : '60%'}
            </div>
            <div className="text-sm text-purple-600">Faster Deal Closure</div>
          </div>
          
          <div className={`text-center p-4 rounded-lg ${
            state.bharatImpactMode.enabled ? 'bg-orange-100' : 'bg-orange-50'
          }`}>
            <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">
              {state.bharatImpactMode.enabled ? '98%' : '95%'}
            </div>
            <div className="text-sm text-orange-600">
              {state.bharatImpactMode.enabled ? 'Farmer Satisfaction' : 'User Satisfaction'}
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            <strong>Vision:</strong> {state.bharatImpactMode.enabled 
              ? 'Empowering 10M+ farmers across Bharat with AI-driven fair trade by 2030 🇮🇳'
              : 'Empowering 10M+ farmers across India with AI-driven fair trade by 2030'
            }
          </p>
        </div>
        
        {state.bharatImpactMode.enabled && (
          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="text-center">
              <p className="text-sm text-orange-800 font-medium">
                🚀 Bharat Impact: Advanced AI protecting farmer interests, enhanced multilingual support, and fair trade alerts active
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Listing Button for Vendors */}
      {state.user?.type === 'vendor' && (
        <div className="mb-6">
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>{translate('Add New Listing', state.currentLanguage)}</span>
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <ProductCard
            key={listing.id}
            listing={listing}
            onContact={handleContactVendor}
          />
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{translate('No products found', state.currentLanguage)}</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};