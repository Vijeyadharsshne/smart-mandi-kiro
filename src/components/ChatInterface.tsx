import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, IndianRupee } from 'lucide-react';
import { ChatMessage, Negotiation, Listing } from '../types';
import { translate, detectLanguage } from '../services/translationService';
import { generateNegotiationResponse, suggestFairPrice } from '../services/priceService';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isVendor = state.user?.id === negotiation.vendorId;
  const otherPartyName = isVendor ? 'Buyer' : listing.vendorName;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [negotiation.messages]);

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
      const aiResponse = generateNegotiationResponse(
        listing.product.name,
        amount || negotiation.currentOffer,
        !isVendor,
        state.currentLanguage
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

    const offerText = `I offer ₹${amount} per ${listing.product.unit}`;
    sendMessage(offerText, 'offer', amount);
    setOfferAmount('');
    setShowOfferInput(false);
  };

  const suggestCounterOffer = () => {
    const suggested = suggestFairPrice(listing.product.name, negotiation.currentOffer, isVendor);
    setOfferAmount(suggested.toString());
    setShowOfferInput(true);
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
        </div>
      </div>

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

      {/* AI Suggestions */}
      <div className="bg-yellow-50 border-t border-yellow-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-yellow-800">AI Suggestion:</span>
          <button
            onClick={suggestCounterOffer}
            className="text-sm bg-yellow-200 hover:bg-yellow-300 px-3 py-1 rounded-full transition-colors"
          >
            Get Fair Price
          </button>
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