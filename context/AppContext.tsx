import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Action, AppContextType, TransactionType, Transaction, QuantumSecurity, OfflineTransaction, MicroserviceStatus } from '../types';
import { Screen } from '../constants';
import { 
    NestJsIcon, PostgreSqlIcon, RedisIcon, RabbitMqIcon, DockerIcon, KubernetesIcon, ApiGatewayIcon,
    UserIcon, BanknotesIcon, ShieldCheckIcon, PieChartIcon, HeartIcon, BuildingStorefrontIcon
} from '../components/icons';

const initialState: AppState = {
  isAuthenticated: false,
  user: null,
  transactions: [],
  loans: [],
  savings: { balance: 0, goal: 100000, interestEarned: 0 },
  policies: [],
  currentScreen: Screen.LANDING,
  tempAuthData: {},
  isOnline: true,
  offlineQueue: [],
  backendServices: [
      { id: 'api-gateway', name: 'API Gateway', status: MicroserviceStatus.ONLINE, apiCalls: 128, avgLatency: 52, icon: ApiGatewayIcon },
      { id: 'auth-service', name: 'Auth Service', status: MicroserviceStatus.ONLINE, apiCalls: 45, avgLatency: 80, icon: NestJsIcon },
      { id: 'user-service', name: 'User Service', status: MicroserviceStatus.ONLINE, apiCalls: 30, avgLatency: 65, icon: NestJsIcon },
      { id: 'payment-service', name: 'Payment Service', status: MicroserviceStatus.ONLINE, apiCalls: 25, avgLatency: 120, icon: NestJsIcon },
      { id: 'wallet-service', name: 'Wallet Service', status: MicroserviceStatus.DEGRADED, apiCalls: 80, avgLatency: 250, icon: NestJsIcon },
      { id: 'notification-service', name: 'Notification Service', status: MicroserviceStatus.ONLINE, apiCalls: 60, avgLatency: 40, icon: NestJsIcon },
      { id: 'analytics-service', name: 'Analytics Service', status: MicroserviceStatus.OFFLINE, apiCalls: 0, avgLatency: 0, icon: NestJsIcon },
      { id: 'compliance-service', name: 'Compliance Service', status: MicroserviceStatus.ONLINE, apiCalls: 15, avgLatency: 150, icon: NestJsIcon },
      { id: 'admin-service', name: 'Admin Service', status: MicroserviceStatus.ONLINE, apiCalls: 5, avgLatency: 90, icon: NestJsIcon },
      { id: 'postgres-db', name: 'PostgreSQL DB', status: MicroserviceStatus.ONLINE, apiCalls: 250, avgLatency: 15, icon: PostgreSqlIcon },
      { id: 'redis-cache', name: 'Redis Cache', status: MicroserviceStatus.ONLINE, apiCalls: 500, avgLatency: 5, icon: RedisIcon },
      { id: 'rabbitmq-bus', name: 'RabbitMQ Bus', status: MicroserviceStatus.ONLINE, apiCalls: 150, avgLatency: 10, icon: RabbitMqIcon },
      { id: 'docker-runtime', name: 'Docker Runtime', status: MicroserviceStatus.ONLINE, apiCalls: 0, avgLatency: 0, icon: DockerIcon },
      { id: 'kubernetes-cluster', name: 'Kubernetes Cluster', status: MicroserviceStatus.ONLINE, apiCalls: 0, avgLatency: 0, icon: KubernetesIcon },
  ],
  cryptoAssets: [
      { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: 0.0052, valueRWF: 1250000, network: 'Mainnet' },
      { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: 0.84, valueRWF: 945000, network: 'Mainnet' },
      { id: 'rwt', name: 'RWF-Token', symbol: 'RWT', balance: 15000, valueRWF: 15000, network: 'Local' },
  ],
  ibiminaGroups: [
      { id: 'ibi1', name: 'Abavandimwe Cooperative', members: 25, totalSavings: 2500000, yourShare: 100000, nextMeeting: 'Saturday, 10 AM' }
  ],
  communityProjects: [
      { id: 'proj1', title: 'School Renovation Fund', goal: 5000000, collected: 3200000, contributors: 150, organizer: 'Local Sector Office', verified: true }
  ],
  goals: [
      { id: 'goal1', name: 'Buy Car', target: 8000000, current: 3200000, priority: 'high', type: 'asset' },
      { id: 'goal2', name: 'University Fund', target: 12000000, current: 1500000, priority: 'medium', type: 'education' },
  ],
  badges: [
      { id: 'badge1', name: 'Savings Champion', icon: '🏆', description: 'Saved 1,000,000 RWF', unlocked: true, progress: 100 },
      { id: 'badge2', name: 'Investment Guru', icon: '📈', description: 'Made 10 successful investments', unlocked: false, progress: 60 },
      { id: 'badge3', name: 'Community Helper', icon: '🤝', description: 'Participated in 5 community funds', unlocked: true, progress: 100 },
  ],
  quests: [
      { id: 'quest1', title: 'Emergency Fund Builder', description: 'Save 3 months of expenses', reward: 5000, xp: 250, progress: 65 },
      { id: 'quest2', title: 'Debt Free Journey', description: 'Pay off all high-interest debt', reward: 10000, xp: 500, progress: 30 },
  ],
  businessMetrics: [
      { title: "Today's Sales", value: "125,430 RWF", change: "+15%", trend: 'up' },
      { title: "Pending Orders", value: "18", change: "+3", trend: 'up' },
      { title: "Customer Growth", value: "45", change: "+12%", trend: 'up' },
  ],
  courses: [
      { id: 'c1', title: 'Budgeting for Beginners', duration: '2 weeks', difficulty: 'beginner', reward: 1000 },
      { id: 'c2', title: 'Investment Strategies', duration: '4 weeks', difficulty: 'intermediate', reward: 2500 },
  ],
  impactFunds: [
      { id: 'if1', title: 'Agriculture Tech Fund', category: 'Agri-Tech', description: 'Invest in smallholder farmers and sustainable practices.', minInvestment: 10000, apy: 12, investedAmount: 50000 },
      { id: 'if2', title: 'Rwanda Renewable Energy', category: 'Renewable Energy', description: 'Support solar and hydro projects across the country.', minInvestment: 25000, apy: 9.5, investedAmount: 0 },
  ],
  sdgProgress: [
      { goal: 1, title: 'No Poverty', impact: 78 },
      { goal: 4, title: 'Quality Education', impact: 65 },
      { goal: 7, title: 'Affordable & Clean Energy', impact: 82 },
  ],
  gameProfile: {
      level: 5,
      netWorthXP: 125000,
      skillPoints: 3,
  },
  financialNFTs: [
      { id: 'nft1', title: 'First 100k Saved', description: 'Awarded for reaching your first major savings milestone.', type: 'Milestone', imageUrl: 'https://via.placeholder.com/150/FFD700/000000?text=100k' },
  ],
  quantumSecurity: {
      quantumEncryption: true,
      gaitAnalysis: false,
      decentralizedID: true,
  },
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
    case 'TOGGLE_FACE_ID':
        return state.user ? { ...state, user: { ...state.user, faceIdEnabled: !state.user.faceIdEnabled } } : state;
    case 'TOGGLE_VOICE_PRINT':
        return state.user ? { ...state, user: { ...state.user, voicePrintEnabled: !state.user.voicePrintEnabled } } : state;
    case 'TOGGLE_QUANTUM_SECURITY':
        return { ...state, quantumSecurity: { ...state.quantumSecurity, [action.payload]: !state.quantumSecurity[action.payload] } };
    case 'COMPLETE_QUEST':
        return {
            ...state,
            quests: state.quests.map(q => q.id === action.payload ? { ...q, progress: 100 } : q),
        };
    case 'INVEST_IMPACT_FUND':
        return {
            ...state,
            impactFunds: state.impactFunds.map(f => f.id === action.payload.fundId ? { ...f, investedAmount: f.investedAmount + action.payload.amount } : f),
        };
    case 'INITIALIZE_STATE':
        return action.payload;
    // --- PRODUCTION SIMULATION REDUCERS ---
    case 'SET_ONLINE_STATUS':
        return { ...state, isOnline: action.payload };
    case 'QUEUE_TRANSACTION':
        return { ...state, offlineQueue: [...state.offlineQueue, action.payload] };
    case 'PROCESS_OFFLINE_QUEUE':
        return {
            ...state,
            transactions: [...action.payload, ...state.transactions],
            offlineQueue: [],
        };
    case 'UPDATE_TRANSACTION_LIMIT':
        return state.user ? { ...state, user: { ...state.user, dailyTransactionLimit: action.payload } } : state;
    case 'UPDATE_SERVICE_METRICS':
        return {
            ...state,
            backendServices: state.backendServices.map(service => 
                service.id === action.payload.id ? { ...service, ...action.payload.metrics } : service
            )
        };
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
        if (parsedState.user && !parsedState.isAuthenticated) {
            parsedState.currentScreen = Screen.LOGIN;
        } else if (!parsedState.user) {
            parsedState.currentScreen = Screen.LANDING;
        }
        // Ensure new state fields are initialized
        parsedState.isOnline = parsedState.isOnline ?? true;
        parsedState.offlineQueue = parsedState.offlineQueue ?? [];
        parsedState.backendServices = initialState.backendServices; // Always reset backend state on load
        dispatch({ type: 'INITIALIZE_STATE', payload: parsedState });
      }
    } catch (error) {
      console.error('Could not load state from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      const stateToSave = { ...state, backendServices: [] }; // Don't persist backend sim state
      localStorage.setItem('smartPayProState', JSON.stringify(stateToSave));
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