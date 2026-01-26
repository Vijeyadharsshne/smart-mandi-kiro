import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/Header';
import { UserTypeSelector } from './components/UserTypeSelector';
import { MarketplaceDashboard } from './components/MarketplaceDashboard';

const AppContent: React.FC = () => {
  const { state } = useApp();

  if (!state.user) {
    return <UserTypeSelector />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MarketplaceDashboard />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;