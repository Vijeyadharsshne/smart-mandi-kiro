import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, IndianRupee, Brain, Mic } from 'lucide-react';
import { ChatMessage, Negotiation, Listing, FairTradeAlert as FairTradeAlertType } from '../types';
import { translate } from '../services/translationService';
import { generateIntelligentResponse, generateNegotiationSuggestions, generateFairTradeAlert } from '../services/priceService';
import { FairTradeAlert } from './FairTradeAlert';
import { useApp } from '../contexts/AppContext';

interface ChatInterfaceProps {
  negotiation: Negotiation;
  listing: Listing;
  onBack: () => void;
  onUpdateNegotiation: (negotiation: Negotiation) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  negotiation,
  listing,
  onBack,
  onUpdateNegotiation,
}) => {
  const { state } = useApp();
  const [message, setMessage] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [showOfferInput, setShowOfferInput] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAISuggestions, setShowAISuggestions] = useState(true);
  const [fairTradeAlert, setFairTradeAlert] = useState<FairTradeAlertType | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isVendor = state.user?.id === negotiation.vendorId;
  const otherPartyName = isVendor ? 'Buyer' : listing.vendorName;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [negotiation.messages]);

  useEffect(() => {
    // Generate AI suggestions based on current context
    const suggestions = generateNegotiationSuggestions(
      listing.product.name,
      negotiation.currentOffer,
      isVendor
    );
    setAiSuggestions(suggestions);
  }, [listing.product.name, negotiation.currentOffer, isVendor]);

  const sendMessage = (content: string, type: 'text' | 'offer' | 'counter_offer' = 'text', amount?: number) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: state.user!.id,
      senderName: state.user!.name,
      content,
      originalContent: content,
      originalLanguage: state.currentLanguage,
      timestamp: new Date(),
      type,
      offerAmount: amount,
    };

    const updatedNegotiation = {
      ...negotiation,
      messages: [...negotiation.messages, newMessage],
      currentOffer: amount || negotiation.currentOffer,
    };

    onUpdateNegotiation(updatedNegotiation);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateIntelligentResponse(
        content,
        listing.product.name,
        amount || negotiation.currentOffer,
        !isVendor
      );

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: isVendor ? negotiation.buyerId : negotiation.vendorId,
        senderName: otherPartyName,
        content: translate(aiResponse, state.currentLanguage),
        originalContent: aiResponse,
        originalLanguage: 'en',
        timestamp: new Date(),
        type: 'text',
      };

      const finalNegotiation = {
        ...updatedNegotiation,
        messages: [...updatedNegotiation.messages, aiMessage],
      };

      onUpdateNegotiation(finalNegotiation);
    }, 1000 + Math.random() * 2000);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage('');
  };

  const handleSendOffer = () => {
    const amount = parseFloat(offerAmount);
    if (!amount || amount <= 0) return;

    // Check for fair trade alerts
    const alert = generateFairTradeAlert(listing.product.name, amount, isVendor);
    if (alert && state.bharatImpactMode.enabled) {
      setFairTradeAlert(alert);
    }

    const offerText = `I offer ₹${amount} per ${listing.product.unit}`;
    sendMessage(offerText, 'offer', amount);
    setOfferAmount('');
    setShowOfferInput(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.includes('₹')) {
      // Extract price from suggestion and set as offer
      const priceMatch = suggestion.match(/₹(\d+)/);
      if (priceMatch) {
        setOfferAmount(priceMatch[1]);
        setShowOfferInput(true);
      }
    } else {
      // Set as message
      setMessage(suggestion);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="font-semibold">{listing.product.name}</h3>
            <p className="text-sm text-gray-600">{otherPartyName}</p>
          </div>
          {state.bharatImpactMode.enabled && (
            <div className="ml-auto flex items-center space-x-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
              <span>🇮🇳</span>
              <span>Fair Trade Mode</span>
            </div>
          )}
        </div>
      </div>

      {/* Fair Trade Alert */}
      {fairTradeAlert && (
        <div className="px-4 py-2">
          <FairTradeAlert
            alert={fairTradeAlert}
            onDismiss={() => setFairTradeAlert(null)}
          />
        </div>
      )}

      {/* Current Offer Display */}
      <div className="bg-primary-50 border-b border-primary-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-primary-700">Current Offer:</span>
          <span className="font-semibold text-primary-800">
            ₹{negotiation.currentOffer}/{listing.product.unit}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {negotiation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === state.user?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.senderId === state.user?.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              {msg.offerAmount && (
                <div className="flex items-center mt-1 text-xs opacity-75">
                  <IndianRupee className="h-3 w-3 mr-1" />
                  {msg.offerAmount}/{listing.product.unit}
                </div>
              )}
              <p className="text-xs opacity-75 mt-1">
                {msg.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* AI Suggestions Panel */}
      {showAISuggestions && aiSuggestions.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-t border-purple-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">AI Negotiation Assistant</span>
            </div>
            <button
              onClick={() => setShowAISuggestions(false)}
              className="text-xs text-purple-600 hover:text-purple-800"
            >
              Hide
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-left text-sm bg-white hover:bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Voice Feature Coming Soon */}
      <div className="bg-yellow-50 border-t border-yellow-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mic className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              {translate('Voice Negotiation Coming Soon', state.currentLanguage)}
            </span>
          </div>
          <div className="text-xs text-yellow-600">
            Speak in your native language
          </div>
        </div>
      </div>

      {/* Offer Input */}
      {showOfferInput && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-3">
              <IndianRupee className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="number"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                placeholder="Enter offer amount"
                className="flex-1 py-2 focus:outline-none"
              />
              <span className="text-sm text-gray-500 ml-2">/{listing.product.unit}</span>
            </div>
            <button onClick={handleSendOffer} className="btn-secondary">
              Send Offer
            </button>
            <button
              onClick={() => setShowOfferInput(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={translate('Send Message', state.currentLanguage)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={() => setShowOfferInput(!showOfferInput)}
            className="btn-secondary flex items-center space-x-1"
          >
            <IndianRupee className="h-4 w-4" />
            <span>Offer</span>
          </button>
          <button onClick={handleSendMessage} className="btn-primary">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};