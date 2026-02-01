import React from 'react';
import { AlertTriangle, Shield, TrendingUp, X } from 'lucide-react';
import { FairTradeAlert as FairTradeAlertType } from '../types';

interface FairTradeAlertProps {
  alert: FairTradeAlertType;
  onDismiss: () => void;
}

export const FairTradeAlert: React.FC<FairTradeAlertProps> = ({ alert, onDismiss }) => {
  const getAlertStyles = () => {
    switch (alert.severity) {
      case 'high':
        return {
          container: 'bg-red-50 border-red-200 border-2',
          icon: 'text-red-600',
          title: 'text-red-800',
          message: 'text-red-700',
          button: 'bg-red-100 hover:bg-red-200 text-red-800'
        };
      case 'medium':
        return {
          container: 'bg-yellow-50 border-yellow-200 border-2',
          icon: 'text-yellow-600',
          title: 'text-yellow-800',
          message: 'text-yellow-700',
          button: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
        };
      default:
        return {
          container: 'bg-blue-50 border-blue-200 border-2',
          icon: 'text-blue-600',
          title: 'text-blue-800',
          message: 'text-blue-700',
          button: 'bg-blue-100 hover:bg-blue-200 text-blue-800'
        };
    }
  };

  const getAlertIcon = () => {
    switch (alert.type) {
      case 'price_too_low':
        return <Shield className="h-5 w-5" />;
      case 'price_too_high':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getAlertTitle = () => {
    switch (alert.type) {
      case 'price_too_low':
        return 'Farmer Protection Alert';
      case 'price_too_high':
        return 'Premium Price Notice';
      default:
        return 'Market Volatility Notice';
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`rounded-lg p-4 mb-4 ${styles.container} animate-pulse`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={styles.icon}>
            {getAlertIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className={`text-sm font-semibold ${styles.title}`}>
                {getAlertTitle()}
              </h4>
              <span className="text-xs bg-white px-2 py-1 rounded-full font-medium">
                AI Fair Trade System
              </span>
            </div>
            <p className={`text-sm ${styles.message} mb-2`}>
              {alert.message}
            </p>
            <div className={`text-xs ${styles.message} bg-white rounded p-2 border-l-4 ${
              alert.severity === 'high' ? 'border-red-400' : 
              alert.severity === 'medium' ? 'border-yellow-400' : 'border-blue-400'
            }`}>
              <strong>AI Recommendation:</strong> {alert.recommendation}
            </div>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className={`p-1 rounded-full ${styles.button} transition-colors`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Bharat Impact Mode Enhancement */}
      {alert.type === 'price_too_low' && (
        <div className="mt-3 bg-white rounded p-2 border-l-4 border-orange-400">
          <div className="flex items-center space-x-2">
            <span className="text-sm">🇮🇳</span>
            <span className="text-xs font-medium text-orange-700">Viksit Bharat Initiative</span>
          </div>
          <p className="text-xs text-orange-600 mt-1">
            Protecting farmer interests through AI-powered fair pricing. Every farmer deserves dignity and fair compensation.
          </p>
        </div>
      )}
    </div>
  );
};