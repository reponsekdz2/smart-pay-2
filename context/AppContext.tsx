import React, { createContext, useReducer, ReactNode } from 'react';
import { Screen } from '../constants';
import { AppState, Action, AppContextType, Transaction, User, UserStatus, KycStatus, Loan, ImpactFund, ApiKey, SystemSetting } from '../types';
import DUMMY_DATA from './dummy-data';
import { ServerStackIcon } from '../components/icons';

const initialState: AppState = {
    screen: Screen.ONBOARDING,
    user: null,
    ...DUMMY_DATA,
    backendServices: DUMMY_DATA.backendServices.map(service => ({
        ...service,
        icon: <ServerStackIcon />
    })),
};

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'NAVIGATE':
            return { ...state, screen: action.payload };
        case 'LOGIN':
            return { ...state, user: action.payload.user, screen: action.payload.user.email.includes('admin') ? Screen.ADMIN_DASHBOARD : Screen.DASHBOARD };
        case 'LOGOUT':
            return { ...state, user: null, screen: Screen.LOGIN };
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [...state.notifications, { ...action.payload, id: Date.now() }],
            };
        case 'REMOVE_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.filter(n => n.id !== action.payload),
            };
        case 'ADD_TRANSACTION': {
            const newTransaction = action.payload;
            if (!state.isOnline) {
                const offlineTx = { id: `offline_${Date.now()}`, type: 'ADD_TRANSACTION' as const, payload: newTransaction };
                return { 
                    ...state, 
                    offlineQueue: [...state.offlineQueue, offlineTx],
                    notifications: [...state.notifications, {id: Date.now(), message: 'You are offline. Transaction queued.', type: 'info'}]
                };
            }
            return { ...state, transactions: [newTransaction, ...state.transactions] };
        }
        case 'UPDATE_BALANCE': {
            return {
                ...state,
                wallets: state.wallets.map(w =>
                    w.id === action.payload.walletId ? { ...w, balance: action.payload.newBalance } : w
                ),
            };
        }
        case 'PROCESS_OFFLINE_QUEUE': {
            if (state.offlineQueue.length === 0) return state;
            const itemToProcess = state.offlineQueue[0];
            const remainingQueue = state.offlineQueue.slice(1);
            
            // SIMULATE CONFLICT: Randomly create a conflict for demonstration
            if (Math.random() < 0.25) { // 25% chance of conflict
                 const newConflict = {
                    id: `conflict_${Date.now()}`,
                    offlineTransaction: itemToProcess,
                    serverState: { reason: 'Insufficient funds on server.' },
                    aiResolution: { description: 'The server-side balance was lower than expected. It is recommended to retry the transaction. If it fails again, the user may need to deposit funds.' }
                };
                return {
                    ...state,
                    offlineQueue: remainingQueue,
                    syncConflicts: [...state.syncConflicts, newConflict],
                }
            }
            
            // If no conflict, process normally
            const newTransactions = [itemToProcess.payload, ...state.transactions];
            return {
                ...state,
                transactions: newTransactions,
                offlineQueue: remainingQueue,
                lastSyncTimestamp: new Date(),
            };
        }
        case 'RESOLVE_CONFLICT': {
            const { conflictId, resolution } = action.payload;
            const conflict = state.syncConflicts.find(c => c.id === conflictId);
            if (!conflict) return state;

            const remainingConflicts = state.syncConflicts.filter(c => c.id !== conflictId);
            if (resolution === 'RETRY') {
                 // Put back in queue to be processed again
                return { ...state, syncConflicts: remainingConflicts, offlineQueue: [conflict.offlineTransaction, ...state.offlineQueue] };
            }
            // If 'CANCEL', just remove it
            return { ...state, syncConflicts: remainingConflicts };
        }

        case 'TOGGLE_ONLINE_STATUS': {
            return { ...state, isOnline: !state.isOnline };
        }
        
        case 'APPLY_LOAN': {
             return { ...state, loans: [action.payload, ...state.loans] };
        }
        case 'INVEST_IMPACT_FUND': {
            return {
                ...state,
                impactFunds: state.impactFunds.map(f =>
                    f.id === action.payload.fundId ? { ...f, investedAmount: f.investedAmount + action.payload.amount } : f
                ),
            };
        }
        case 'SET_TEMP_LOGIN_DATA':
        case 'SET_TEMP_AUTH_DATA':
            return { ...state, ...action.payload };
        
        case 'ADMIN_UPDATE_USER_KYC':
            return { ...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, kyc_status: action.payload.kycStatus} : u) };
        case 'ADMIN_UPDATE_USER_STATUS':
            return { ...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, status: action.payload.status} : u) };
        case 'ADMIN_CREATE_API_KEY':
            return { ...state, apiKeys: [action.payload, ...state.apiKeys]};
        case 'ADMIN_UPDATE_SETTING':
            return { ...state, systemSettings: state.systemSettings.map(s => s.setting_key === action.payload.key ? {...s, setting_value: action.payload.value} : s)};

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