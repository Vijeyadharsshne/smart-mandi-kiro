import React from 'react';
import { Language } from '../types';
import { getLanguageName } from '../services/translationService';
import { useApp } from '../contexts/AppContext';

const languages: Language[] = ['en', 'hi', 'ta', 'te', 'bn', 'gu', 'mr', 'kn'];

export const LanguageSelector: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleLanguageChange = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  return (
    <div className="relative">
      <select
        value={state.currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {getLanguageName(lang)}
          </option>
        ))}
      </select>
    </div>
  );
};