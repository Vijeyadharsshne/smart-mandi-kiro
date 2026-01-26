import { Language } from '../types';

// Mock translation service - in production, integrate with Google Translate API or similar
const translations: Record<string, Record<Language, string>> = {
  'Smart Mandi': {
    en: 'Smart Mandi',
    hi: 'स्मार्ट मंडी',
    ta: 'ஸ்மார்ட் மண்டி',
    te: 'స్మార్ట్ మండి',
    bn: 'স্মার্ট মান্ডি',
    gu: 'સ્માર્ટ મંડી',
    mr: 'स्मार्ट मंडी',
    kn: 'ಸ್ಮಾರ್ಟ್ ಮಂಡಿ'
  },
  'Welcome': {
    en: 'Welcome',
    hi: 'स्वागत है',
    ta: 'வரவேற்கிறோம்',
    te: 'స్వాగతం',
    bn: 'স্বাগতম',
    gu: 'સ્વાગત છે',
    mr: 'स्वागत आहे',
    kn: 'ಸ್ವಾಗತ'
  },
  'Buy': {
    en: 'Buy',
    hi: 'खरीदें',
    ta: 'வாங்கு',
    te: 'కొనండి',
    bn: 'কিনুন',
    gu: 'ખરીદો',
    mr: 'खरेदी करा',
    kn: 'ಖರೀದಿಸಿ'
  },
  'Sell': {
    en: 'Sell',
    hi: 'बेचें',
    ta: 'விற்கவும்',
    te: 'అమ్మండి',
    bn: 'বিক্রি করুন',
    gu: 'વેચો',
    mr: 'विका',
    kn: 'ಮಾರಾಟ ಮಾಡಿ'
  },
  'Price': {
    en: 'Price',
    hi: 'कीमत',
    ta: 'விலை',
    te: 'ధర',
    bn: 'দাম',
    gu: 'કિંમત',
    mr: 'किंमत',
    kn: 'ಬೆಲೆ'
  },
  'Quantity': {
    en: 'Quantity',
    hi: 'मात्रा',
    ta: 'அளவு',
    te: 'పరిమాణం',
    bn: 'পরিমাণ',
    gu: 'માત્રા',
    mr: 'प्रमाण',
    kn: 'ಪ್ರಮಾಣ'
  },
  'Location': {
    en: 'Location',
    hi: 'स्थान',
    ta: 'இடம்',
    te: 'స్థానం',
    bn: 'অবস্থান',
    gu: 'સ્થાન',
    mr: 'स्थान',
    kn: 'ಸ್ಥಳ'
  },
  'Send Message': {
    en: 'Send Message',
    hi: 'संदेश भेजें',
    ta: 'செய்தி அனுப்பவும்',
    te: 'సందేశం పంపండి',
    bn: 'বার্তা পাঠান',
    gu: 'સંદેશ મોકલો',
    mr: 'संदेश पाठवा',
    kn: 'ಸಂದೇಶ ಕಳುಹಿಸಿ'
  }
};

export const translate = (text: string, targetLanguage: Language): string => {
  if (translations[text] && translations[text][targetLanguage]) {
    return translations[text][targetLanguage];
  }
  
  // Fallback: simulate translation for dynamic content
  if (targetLanguage === 'hi') {
    return `${text} (हिंदी)`;
  } else if (targetLanguage === 'ta') {
    return `${text} (தமிழ்)`;
  }
  
  return text;
};

export const detectLanguage = (text: string): Language => {
  // Simple language detection based on script
  if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Devanagari
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te'; // Telugu
  if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn'; // Kannada
  
  return 'en'; // Default to English
};

export const getLanguageName = (code: Language): string => {
  const names: Record<Language, string> = {
    en: 'English',
    hi: 'हिंदी',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    bn: 'বাংলা',
    gu: 'ગુજરાતી',
    mr: 'मराठी',
    kn: 'ಕನ್ನಡ'
  };
  return names[code];
};