import React, { useState } from 'react';
import { Heart, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const BharatImpactToggle: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showSettings, setShowSettings] = useState(false);

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_BHARAT_MODE' });
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    dispatch({ 
      type: 'UPDATE_BHARAT_SETTINGS', 
      payload: { [setting]: value } 
    });
  };

  return (
    <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-lg p-4 border-2 border-orange-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🇮🇳</span>
            <Heart className={`h-5 w-5 ${state.bharatImpactMode.enabled ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Bharat Impact Mode</h3>
            <p className="text-xs text-gray-600">
              {state.bharatImpactMode.enabled 
                ? 'Prioritizing farmer welfare & fair trade' 
                : 'Standard marketplace mode'
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 hover:bg-white rounded transition-colors"
          >
            <Settings className="h-4 w-4 text-gray-600" />
          </button>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.bharatImpactMode.enabled}
              onChange={handleToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
        </div>
      </div>

      {/* Advanced Settings */}
      {showSettings && (
        <div className="mt-4 pt-4 border-t border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-gray-700">Advanced Settings</h4>
            <button
              onClick={() => setShowSettings(false)}
              className="p-1 hover:bg-white rounded"
            >
              <ChevronUp className="h-3 w-3 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-gray-700">Prioritize Farmers</span>
                <p className="text-xs text-gray-500">Enhanced protection for farmer interests</p>
              </div>
              <input
                type="checkbox"
                checked={state.bharatImpactMode.prioritizeFarmers}
                onChange={(e) => handleSettingChange('prioritizeFarmers', e.target.checked)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-gray-700">Enhanced Multilingual</span>
                <p className="text-xs text-gray-500">Advanced language support features</p>
              </div>
              <input
                type="checkbox"
                checked={state.bharatImpactMode.enhancedMultilingual}
                onChange={(e) => handleSettingChange('enhancedMultilingual', e.target.checked)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-gray-700">Small Farmer Guidance</span>
                <p className="text-xs text-gray-500">Specialized support for small-scale farmers</p>
              </div>
              <input
                type="checkbox"
                checked={state.bharatImpactMode.smallFarmerGuidance}
                onChange={(e) => handleSettingChange('smallFarmerGuidance', e.target.checked)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
          
          {state.bharatImpactMode.enabled && (
            <div className="mt-3 bg-white rounded p-2 border border-orange-200">
              <p className="text-xs text-orange-700 font-medium">
                🎯 Active Features: AI Fair Trade Alerts, Farmer Protection, Enhanced Multilingual Support
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};