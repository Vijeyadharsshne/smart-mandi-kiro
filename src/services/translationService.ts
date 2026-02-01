import { Language } from '../types';

// Enhanced translation service with Tamil focus
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
  },
  'AI Price Analysis': {
    en: 'AI Price Analysis',
    hi: 'एआई मूल्य विश्लेषण',
    ta: 'AI விலை பகுப்பாய்வு',
    te: 'AI ధర విశ్లేషణ',
    bn: 'AI মূল্য বিশ্লেষণ',
    gu: 'AI કિંમત વિશ્લેષણ',
    mr: 'AI किंमत विश्लेषण',
    kn: 'AI ಬೆಲೆ ವಿಶ್ಲೇಷಣೆ'
  },
  'Market Trends': {
    en: 'Market Trends',
    hi: 'बाजार के रुझान',
    ta: 'சந்தை போக்குகள்',
    te: 'మార్కెట్ ట్రెండ్స్',
    bn: 'বাজারের প্রবণতা',
    gu: 'બજાર વલણો',
    mr: 'बाजार ट्रेंड',
    kn: 'ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು'
  },
  'Fair Price Range': {
    en: 'Fair Price Range',
    hi: 'उचित मूल्य सीमा',
    ta: 'நியாயமான விலை வரம்பு',
    te: 'న్యాయమైన ధర పరిధి',
    bn: 'ন্যায্য মূল্য পরিসীমা',
    gu: 'વાજબી કિંમત શ્રેણી',
    mr: 'वाजवी किंमत श्रेणी',
    kn: 'ನ್ಯಾಯಯುತ ಬೆಲೆ ಶ್ರೇಣಿ'
  },
  'Voice Negotiation Coming Soon': {
    en: 'Voice-based negotiation – Coming Soon',
    hi: 'आवाज आधारित बातचीत - जल्द आ रहा है',
    ta: 'குரல் அடிப்படையிலான பேச்சுவார்த்தை - விரைவில் வரும்',
    te: 'వాయిస్ ఆధారిత చర్చలు - త్వరలో వస్తుంది',
    bn: 'ভয়েস-ভিত্তিক আলোচনা - শীঘ্রই আসছে',
    gu: 'અવાજ આધારિત વાટાઘાટો - જલ્દી આવી રહ્યું છે',
    mr: 'आवाज आधारित वाटाघाटी - लवकरच येत आहे',
    kn: 'ಧ್ವನಿ ಆಧಾರಿತ ಮಾತುಕತೆ - ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ'
  },
  'Impact Metrics': {
    en: 'Impact Metrics (Simulated)',
    hi: 'प्रभाव मेट्रिक्स (सिमुलेटेड)',
    ta: 'தாக்க அளவீடுகள் (உருவகப்படுத்தப்பட்டது)',
    te: 'ప్రభావ మెట్రిక్స్ (అనుకరణ)',
    bn: 'প্রভাব মেট্রিক্স (সিমুলেটেড)',
    gu: 'અસર મેટ્રિક્સ (સિમ્યુલેટેડ)',
    mr: 'प्रभाव मेट्रिक्स (सिम्युलेटेड)',
    kn: 'ಪ್ರಭಾವ ಮೆಟ್ರಿಕ್ಸ್ (ಸಿಮ್ಯುಲೇಟೆಡ್)'
  },
  'Improved Price Realization': {
    en: 'Improved Price Realization for Farmers',
    hi: 'किसानों के लिए बेहतर मूल्य प्राप्ति',
    ta: 'விவசாயிகளுக்கு மேம்பட்ட விலை உணர்வு',
    te: 'రైతులకు మెరుగైన ధర సాధన',
    bn: 'কৃষকদের জন্য উন্নত মূল্য উপলব্ধি',
    gu: 'ખેડૂતો માટે સુધારેલ કિંમત પ્રાપ્તિ',
    mr: 'शेतकऱ्यांसाठी सुधारित किंमत प्राप्ती',
    kn: 'ರೈತರಿಗೆ ಸುಧಾರಿತ ಬೆಲೆ ಸಾಕ್ಷಾತ್ಕಾರ'
  },
  'Search products or vendors': {
    en: 'Search products or vendors...',
    hi: 'उत्पाद या विक्रेता खोजें...',
    ta: 'தயாரிப்புகள் அல்லது விற்பனையாளர்களைத் தேடுங்கள்...',
    te: 'ఉత్పత్తులు లేదా విక్రేతలను వెతకండి...',
    bn: 'পণ্য বা বিক্রেতা খুঁজুন...',
    gu: 'ઉત્પાદનો અથવા વિક્રેતાઓ શોધો...',
    mr: 'उत्पादने किंवा विक्रेते शोधा...',
    kn: 'ಉತ್ಪನ್ನಗಳು ಅಥವಾ ಮಾರಾಟಗಾರರನ್ನು ಹುಡುಕಿ...'
  },
  'All Categories': {
    en: 'All Categories',
    hi: 'सभी श्रेणियां',
    ta: 'அனைத்து வகைகள்',
    te: 'అన్ని వర్గాలు',
    bn: 'সব বিভাগ',
    gu: 'બધી શ્રેણીઓ',
    mr: 'सर्व श्रेणी',
    kn: 'ಎಲ್ಲಾ ವರ್ಗಗಳು'
  },
  'Add New Listing': {
    en: 'Add New Listing',
    hi: 'नई लिस्टिंग जोड़ें',
    ta: 'புதிய பட்டியல் சேர்க்கவும்',
    te: 'కొత్త జాబితా జోడించండి',
    bn: 'নতুন তালিকা যোগ করুন',
    gu: 'નવી લિસ્ટિંગ ઉમેરો',
    mr: 'नवीन लिस्टिंग जोडा',
    kn: 'ಹೊಸ ಪಟ್ಟಿಯನ್ನು ಸೇರಿಸಿ'
  },
  'No products found': {
    en: 'No products found matching your criteria.',
    hi: 'आपके मानदंडों से मेल खाने वाले कोई उत्पाद नहीं मिले।',
    ta: 'உங்கள் அளவுகோல்களுக்கு பொருந்தும் தயாரிப்புகள் எதுவும் கிடைக்கவில்லை.',
    te: 'మీ ప్రమాణాలకు సరిపోలే ఉత్పత్తులు ఏవీ కనుగొనబడలేదు.',
    bn: 'আপনার মানদণ্ড অনুযায়ী কোনো পণ্য পাওয়া যায়নি।',
    gu: 'તમારા માપદંડો સાથે મેળ ખાતા કોઈ ઉત્પાદનો મળ્યા નથી.',
    mr: 'तुमच्या निकषांशी जुळणारी कोणतीही उत्पादने सापडली नाहीत.',
    kn: 'ನಿಮ್ಮ ಮಾನದಣ್ಡಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಉತ್ಪನ್ನಗಳು ಕಂಡುಬಂದಿಲ್ಲ.'
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

// AI-powered translation simulation for dynamic content
export const aiTranslate = (text: string, targetLanguage: Language): string => {
  // Simulate AI translation for dynamic content
  const commonPhrases: Record<string, Record<Language, string>> = {
    'good deal': {
      en: 'good deal',
      ta: 'நல்ல ஒப்பந்தம்',
      hi: 'अच्छा सौदा'
    },
    'above market': {
      en: 'above market',
      ta: 'சந்தைக்கு மேல்',
      hi: 'बाजार से ऊपर'
    },
    'fair price': {
      en: 'fair price',
      ta: 'நியாயமான விலை',
      hi: 'उचित मूल्य'
    }
  };

  // Check for exact matches first
  const lowerText = text.toLowerCase();
  if (commonPhrases[lowerText] && commonPhrases[lowerText][targetLanguage]) {
    return commonPhrases[lowerText][targetLanguage];
  }

  // Fallback: add language indicator for demo
  if (targetLanguage === 'ta') {
    return `${text} (தமிழ்)`;
  } else if (targetLanguage === 'hi') {
    return `${text} (हिंदी)`;
  }
  
  return text;
};
// Enhanced Bharat Impact Mode translations
export const bharatTranslations: Record<string, Record<Language, string>> = {
  'Bharat Impact Mode': {
    en: 'Bharat Impact Mode',
    ta: 'பாரத் தாக்க முறை',
    hi: 'भारत प्रभाव मोड'
  },
  'Fair Trade Protection': {
    en: 'Fair Trade Protection',
    ta: 'நியாயமான வர்த்தக பாதுகாப்பு',
    hi: 'निष्पक्ष व्यापार सुरक्षा'
  },
  'Farmer Protection Alert': {
    en: 'Farmer Protection Alert',
    ta: 'விவசாயி பாதுகாப்பு எச்சரிக்கை',
    hi: 'किसान सुरक्षा अलर्ट'
  },
  'AI Fair Trade System': {
    en: 'AI Fair Trade System',
    ta: 'AI நியாயமான வர்த்தக அமைப்பு',
    hi: 'AI निष्पक्ष व्यापार प्रणाली'
  }
};

// Enhanced translation with Bharat Impact Mode support
export const bharatTranslate = (text: string, targetLanguage: Language): string => {
  // Check Bharat-specific translations first
  if (bharatTranslations[text] && bharatTranslations[text][targetLanguage]) {
    return bharatTranslations[text][targetLanguage];
  }
  
  // Fall back to regular translation
  return translate(text, targetLanguage);
};