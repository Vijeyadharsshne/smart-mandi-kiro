import React, { useState } from 'react';
import { Award, Brain, Globe, Shield, TrendingUp, ChevronRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const FinalistShowcase: React.FC = () => {
  const { state } = useApp();
  const [activeFeature, setActiveFeature] = useState<string>('ai');

  const features = [
    {
      id: 'ai',
      icon: <Brain className="h-6 w-6" />,
      title: 'Explainable AI',
      description: 'Transparent AI decisions with confidence scores',
      color: 'blue',
      stats: '85-92% AI Confidence'
    },
    {
      id: 'multilingual',
      icon: <Globe className="h-6 w-6" />,
      title: 'Multilingual Intelligence',
      description: 'Seamless Tamil-English AI translation',
      color: 'green',
      stats: '8 Languages Supported'
    },
    {
      id: 'protection',
      icon: <Shield className="h-6 w-6" />,
      title: 'Fair Trade Protection',
      description: 'AI-powered farmer protection alerts',
      color: 'red',
      stats: '100% Fair Trade Coverage'
    },
    {
      id: 'intelligence',
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Market Intelligence',
      description: 'Real-time trend analysis & crop insights',
      color: 'purple',
      stats: '7-Day Trend Analysis'
    }
  ];

  const getColorClasses = (color: string, active: boolean) => {
    const colors = {
      blue: active ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      green: active ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100',
      red: active ? 'bg-red-500 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100',
      purple: active ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl p-6 border-2 border-indigo-200 mb-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Award className="h-8 w-8 text-yellow-500" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Finalist-Grade AI Prototype
          </h2>
          <Award className="h-8 w-8 text-yellow-500" />
        </div>
        <p className="text-gray-600 text-sm">
          Demonstrating Advanced AI for Agricultural Trade in Viksit Bharat 🇮🇳
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveFeature(feature.id)}
            className={`p-4 rounded-lg transition-all duration-200 ${getColorClasses(
              feature.color,
              activeFeature === feature.id
            )}`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              {feature.icon}
              <div className="text-xs font-semibold">{feature.title}</div>
              <div className="text-xs opacity-75">{feature.stats}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Active Feature Details */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        {activeFeature === 'ai' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-800 flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Explainable AI Intelligence</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <div className="font-medium text-blue-800">Confidence Scoring</div>
                <div className="text-blue-600">Every AI decision includes confidence percentage and detailed reasoning</div>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <div className="font-medium text-blue-800">Market Analysis</div>
                <div className="text-blue-600">Real-time price trends with AI interpretation and visualization</div>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <div className="font-medium text-blue-800">Intelligent Responses</div>
                <div className="text-blue-600">Context-aware negotiation assistance based on keywords and prices</div>
              </div>
            </div>
          </div>
        )}

        {activeFeature === 'multilingual' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-green-800 flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Multilingual AI Translation</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <div className="font-medium text-green-800">Tamil-English Focus</div>
                <div className="text-green-600">Seamless switching with cultural context preservation</div>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <div className="font-medium text-green-800">AI Translation Workflow</div>
                <div className="text-green-600">Simulated AI translation with business context understanding</div>
              </div>
            </div>
          </div>
        )}

        {activeFeature === 'protection' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-red-800 flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Fair Trade Protection System</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-red-50 p-3 rounded">
                <div className="font-medium text-red-800">Price Monitoring</div>
                <div className="text-red-600">Real-time detection of unfair pricing attempts</div>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <div className="font-medium text-red-800">Farmer Protection</div>
                <div className="text-red-600">AI alerts when offers are below fair market range</div>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <div className="font-medium text-red-800">Bharat Impact Mode</div>
                <div className="text-red-600">Enhanced protection aligned with Viksit Bharat vision</div>
              </div>
            </div>
          </div>
        )}

        {activeFeature === 'intelligence' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-purple-800 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Market Intelligence Engine</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-purple-50 p-3 rounded">
                <div className="font-medium text-purple-800">Trend Visualization</div>
                <div className="text-purple-600">Interactive charts showing 7-day price movements with AI interpretation</div>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <div className="font-medium text-purple-800">Crop Intelligence</div>
                <div className="text-purple-600">Optimal selling windows, demand levels, and buyer recommendations</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Impact Stats */}
      <div className="mt-6 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg p-4 border border-orange-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
            <span>🇮🇳</span>
            <span>Viksit Bharat Impact Projection</span>
          </h4>
          {state.bharatImpactMode.enabled && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
              Active Mode
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">10M+</div>
            <div className="text-xs text-gray-600">Farmers Empowered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {state.bharatImpactMode.enabled ? '18%' : '15%'}
            </div>
            <div className="text-xs text-gray-600">Price Improvement</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">75%</div>
            <div className="text-xs text-gray-600">Faster Deals</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">Zero</div>
            <div className="text-xs text-gray-600">Language Barriers</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Experience the future of agricultural trade with responsible AI
        </p>
        <div className="flex items-center justify-center space-x-1 text-indigo-600 font-medium">
          <span className="text-sm">Explore Features Below</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};