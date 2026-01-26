import React, { useState } from 'react';
import { ShoppingCart, Store } from 'lucide-react';
import { translate } from '../services/translationService';
import { useApp } from '../contexts/AppContext';
import { User } from '../types';

export const UserTypeSelector: React.FC = () => {
  const { state, dispatch } = useApp();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [userType, setUserType] = useState<'vendor' | 'buyer'>('buyer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;

    const user: User = {
      id: Date.now().toString(),
      name: name.trim(),
      type: userType,
      language: state.currentLanguage,
      location: location.trim(),
    };

    dispatch({ type: 'SET_USER', payload: user });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {translate('Welcome', state.currentLanguage)}
          </h2>
          <p className="text-gray-600">
            {translate('Smart Mandi', state.currentLanguage)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name / नाम
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translate('Location', state.currentLanguage)}
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="City, State"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              I want to:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('buyer')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'buyer'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-primary-500" />
                <div className="text-sm font-medium">
                  {translate('Buy', state.currentLanguage)}
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setUserType('vendor')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'vendor'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Store className="h-8 w-8 mx-auto mb-2 text-primary-500" />
                <div className="text-sm font-medium">
                  {translate('Sell', state.currentLanguage)}
                </div>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};