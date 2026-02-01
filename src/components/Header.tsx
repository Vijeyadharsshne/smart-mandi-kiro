import React from 'react';
import { Store, User, Brain } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { translate } from '../services/translationService';
import { useApp } from '../contexts/AppContext';

export const Header: React.FC = () => {
  const { state } = useApp();

  return (
    <header className="bg-primary-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Store className="h-8 w-8" />
            <h1 className="text-xl font-bold">
              {translate('Smart Mandi', state.currentLanguage)}
            </h1>
            <div className="hidden sm:flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1">
              <Brain className="h-4 w-4" />
              <span className="text-xs font-medium">AI-Powered</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            {state.user && (
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">{state.user.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};