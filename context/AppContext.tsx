import React, { createContext, useReducer, ReactNode } from 'react';
import { AppState, Action, AppContextType, Transaction, KycStatus, UserStatus } from '../types';
import DUMMY_DATA from './dummy-data';
import { Screen } from '../constants';

const initialState: AppState = {
  screen: Screen.ONBOARDING,
  user: null,
  ...DUMMY_DATA,
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, screen: action.payload };
    case 'LOGIN':
      return { ...state, user: action.payload.user, screen: Screen.DASHBOARD };
    case 'LOGOUT':
      return { ...state, user: null, screen: Screen.LOGIN };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, { ...action.payload, id: `notif_${Date.now()}` }] };
    case 'REMOVE_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_BALANCE':
      return {
        ...state,
        wallets: state.wallets.map(w => w.id === action.payload.walletId ? { ...w, balance: action.payload.newBalance } : w),
      };
    case 'SET_TEMP_AUTH_DATA':
        return { ...state, tempAuthData: action.payload };
    case 'APPLY_LOAN':
        return { ...state, loans: [action.payload, ...state.loans] };
    case 'INVEST_IMPACT_FUND':
        return {
            ...state,
            impactFunds: state.impactFunds.map(f => f.id === action.payload.fundId ? {...f, investedAmount: f.investedAmount + action.payload.amount} : f)
        }
    case 'RESOLVE_CONFLICT':
        const conflict = state.syncConflicts.find(c => c.id === action.payload.conflictId);
        if (!conflict) return state;

        let newTransactions = state.transactions;
        if (action.payload.resolution === 'RETRY') {
            // In a real app, this would re-dispatch the transaction logic.
            // Here, we'll just optimistically add it.
            const retriedTx: Transaction = {
                ...conflict.offlineTransaction.payload,
                status: 'COMPLETED' // Assume it succeeds now
            }
            newTransactions = [retriedTx, ...state.transactions];
        }

        return {
            ...state,
            transactions: newTransactions,
            syncConflicts: state.syncConflicts.filter(c => c.id !== action.payload.conflictId),
        };
    case 'PROCESS_OFFLINE_QUEUE':
        // Simplified: process one item. A real implementation would be more robust.
        const [itemToProcess, ...restOfQueue] = state.offlineQueue;
        if (!itemToProcess) return state;
        return {
            ...state,
            transactions: [itemToProcess.payload, ...state.transactions],
            offlineQueue: restOfQueue,
            lastSyncTimestamp: new Date(),
        };
    case 'ADMIN_UPDATE_USER_KYC':
        return {
            ...state,
            users: state.users.map(u => u.id === action.payload.userId ? {...u, kyc_status: action.payload.kycStatus} : u)
        };
    case 'ADMIN_UPDATE_USER_STATUS':
        return {
            ...state,
            users: state.users.map(u => u.id === action.payload.userId ? {...u, status: action.payload.status} : u)
        };
    case 'ADMIN_UPDATE_SETTING':
        return {
            ...state,
            systemSettings: state.systemSettings.map(s => s.setting_key === action.payload.key ? {...s, setting_value: action.payload.value} : s)
        };
    case 'ADMIN_CREATE_API_KEY':
        return {
            ...state,
            apiKeys: [action.payload, ...state.apiKeys]
        };
    default:
      return state;
  }
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
