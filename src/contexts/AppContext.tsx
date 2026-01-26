import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Language, Listing, Negotiation } from '../types';

interface AppState {
  user: User | null;
  currentLanguage: Language;
  listings: Listing[];
  negotiations: Negotiation[];
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_LISTINGS'; payload: Listing[] }
  | { type: 'ADD_LISTING'; payload: Listing }
  | { type: 'SET_NEGOTIATIONS'; payload: Negotiation[] }
  | { type: 'ADD_NEGOTIATION'; payload: Negotiation }
  | { type: 'UPDATE_NEGOTIATION'; payload: Negotiation }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  user: null,
  currentLanguage: 'en',
  listings: [],
  negotiations: [],
  isLoading: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, currentLanguage: action.payload };
    case 'SET_LISTINGS':
      return { ...state, listings: action.payload };
    case 'ADD_LISTING':
      return { ...state, listings: [...state.listings, action.payload] };
    case 'SET_NEGOTIATIONS':
      return { ...state, negotiations: action.payload };
    case 'ADD_NEGOTIATION':
      return { ...state, negotiations: [...state.negotiations, action.payload] };
    case 'UPDATE_NEGOTIATION':
      return {
        ...state,
        negotiations: state.negotiations.map(n =>
          n.id === action.payload.id ? action.payload : n
        ),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};