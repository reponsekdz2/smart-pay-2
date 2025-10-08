import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Action, AppContextType, TransactionType, Transaction } from '../types';
import { Screen } from '../constants';

const initialState: AppState = {
  isAuthenticated: false,
  user: null,
  transactions: [],
  loans: [],
  savings: { balance: 0, goal: 100000, interestEarned: 0 },
  policies: [],
  currentScreen: Screen.LANDING,
  tempAuthData: {},
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentScreen: action.payload };
    case 'SET_TEMP_AUTH_DATA':
        return { ...state, tempAuthData: { ...state.tempAuthData, ...action.payload } };
    case 'CREATE_ACCOUNT':
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
            transactions: action.payload.initialTransactions,
            currentScreen: Screen.DASHBOARD,
            tempAuthData: {},
        };
    case 'LOGIN':
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
            currentScreen: Screen.DASHBOARD,
            tempAuthData: {},
        };
    case 'LOGOUT':
        return { ...initialState, user: state.user ? { ...state.user, balance: state.user.balance} : null, currentScreen: Screen.LANDING, isAuthenticated: false };
    case 'ADD_TRANSACTION':
        return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_BALANCE':
        return state.user ? { ...state, user: { ...state.user, balance: action.payload } } : state;
    case 'APPLY_LOAN':
        return { ...state, loans: [action.payload, ...state.loans] };
    case 'REPAY_LOAN':
        return {
            ...state,
            loans: state.loans.map(loan => loan.id === action.payload ? { ...loan, isRepaid: true } : loan),
        };
    case 'UPDATE_SAVINGS':
        return { ...state, savings: { ...state.savings, ...action.payload } };
    case 'ADD_POLICY':
        return { ...state, policies: [action.payload, ...state.policies] };
    case 'TOGGLE_BIOMETRICS':
        return state.user ? { ...state, user: { ...state.user, biometricsEnabled: !state.user.biometricsEnabled } } : state;
    case 'INITIALIZE_STATE':
        return action.payload;
    default:
      return state;
  }
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem('smartPayProState');
      if (storedState) {
        const parsedState = JSON.parse(storedState) as AppState;
        // Ensure that a returning user always starts at a login or landing screen
        if (parsedState.user && !parsedState.isAuthenticated) {
            parsedState.currentScreen = Screen.LOGIN;
        } else if (!parsedState.user) {
            parsedState.currentScreen = Screen.LANDING;
        }
        dispatch({ type: 'INITIALIZE_STATE', payload: parsedState });
      }
    } catch (error) {
      console.error('Could not load state from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('smartPayProState', JSON.stringify(state));
    } catch (error) {
      console.error('Could not save state to localStorage', error);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};