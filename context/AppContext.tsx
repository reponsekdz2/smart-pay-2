import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { 
    AppState, Action, AppContextType, TransactionType, User, AdminUser, MicroserviceStatus, OfflineTransaction, SyncConflict, 
    KycStatus, RiskLevel, UserType, UserStatus, AdminRole, Wallet, WalletType, WalletStatus, Transaction, TransactionStatus, 
    TransactionCategory, SavingsGoal, InsurancePolicy, InsuranceClaim, SystemSetting, FraudRule, ApiKey, AuditTrail 
} from '../types';
import { Screen } from '../constants';
import { ApiGatewayIcon, DockerIcon, KubernetesIcon, NestJsIcon, PostgreSqlIcon, RabbitMqIcon, RedisIcon } from '../components/icons';

// --- MOCK DATA GENERATION ---

const createMockUser = (id: number, name: string, phone: string, status: UserStatus, kyc: KycStatus): User => ({
    id: `user_${id}`,
    phone,
    email: `${name.split(' ')[0].toLowerCase()}@example.com`,
    national_id: `1199${id}800${Math.floor(10000000 + Math.random() * 90000000)}`,
    first_name: name.split(' ')[0],
    last_name: name.split(' ')[1],
    date_of_birth: '1990-01-01',
    gender: 'MALE',
    kyc_status: kyc,
    risk_level: RiskLevel.LOW,
    user_type: UserType.CUSTOMER,
    status,
    pin_hash: '1234',
    last_login: new Date().toISOString(),
    login_attempts: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    // FIX: Add default values for new user properties
    dailyTransactionLimit: 500000,
    deviceTrustScore: 95,
    biometricsEnabled: id === 1,
    dnaProfileAvailable: id === 1,
});

const mockUsers: User[] = [
    createMockUser(1, 'John Doe', '0712345678', UserStatus.ACTIVE, KycStatus.VERIFIED),
    createMockUser(2, 'Jane Smith', '0787654321', UserStatus.ACTIVE, KycStatus.PENDING),
    createMockUser(3, 'Peter Jones', '0734567890', UserStatus.SUSPENDED, KycStatus.VERIFIED),
    createMockUser(4, 'Maryanne Bee', '0723456789', UserStatus.ACTIVE, KycStatus.REJECTED),
];

const superAdmin: AdminUser = {
    id: 'admin_001',
    phone: '0789447620',
    email: 'admin@smartpay.rw',
    username: 'superadmin',
    password_hash: '123456',
    first_name: 'System',
    last_name: 'Administrator',
    role: AdminRole.SUPER_ADMIN,
    permissions: { users: ["create", "read", "update", "delete"], transactions: ["full"], system: ["full_access"] },
    two_factor_enabled: true,
    status: 'ACTIVE',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    login_attempts: 0
};

const mockWallets: Wallet[] = mockUsers.map((user, i) => ({
    id: `wallet_${i+1}`,
    user_id: user.id,
    wallet_number: `SPRW${user.phone}`,
    balance: 50000 * (i+1),
    available_balance: 48000 * (i+1),
    locked_balance: 2000 * (i+1),
    currency: 'RWF',
    type: WalletType.PERSONAL,
    status: WalletStatus.ACTIVE,
    min_balance: 0,
    max_balance: 10000000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
}));

const mockTransactions: Transaction[] = [
    { id: 'tx1', reference: 'REF001', from_wallet_id: 'wallet_2', to_wallet_id: 'wallet_1', from_user_id: 'user_2', to_user_id: 'user_1', amount: 5000, fee: 50, tax: 10, total_amount: 5060, currency: 'RWF', type: TransactionType.TRANSFER, category: TransactionCategory.BUSINESS, status: TransactionStatus.COMPLETED, description: 'Payment for services', provider: 'INTERNAL', risk_score: 0.1, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString(), ip_address: '192.168.1.1' },
    { id: 'tx2', reference: 'REF002', from_wallet_id: 'wallet_1', to_wallet_id: 'wallet_3', from_user_id: 'user_1', to_user_id: 'user_3', amount: 1500, fee: 25, tax: 5, total_amount: 1530, currency: 'RWF', type: TransactionType.PAYMENT, category: TransactionCategory.FOOD, status: TransactionStatus.PENDING, description: 'Lunch at Cafe', provider: 'MTN', risk_score: 0.45, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString(), ip_address: '10.0.0.5' },
];

const mockApiKeys: ApiKey[] = [
    { id: 'api_1', name: 'Kigali Mart', api_key: 'km_live_abcdef123456', api_secret: 'hashed_secret', merchant_id: 'user_1', permissions: { payments: ['create', 'read'] }, rate_limit_per_minute: 100, status: 'ACTIVE', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];

const mockFraudRules: FraudRule[] = [
    { id: 'rule_1', name: 'High Amount Transfer', description: 'Flag transfers over 1,000,000 RWF', rule_condition: { max_amount: 1000000 }, action: 'REVIEW', severity: 'HIGH', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];

const mockSystemSettings: SystemSetting[] = [
    { id: 'set_1', setting_key: 'MAX_LOGIN_ATTEMPTS', setting_value: '5', setting_type: 'NUMBER', description: 'Max failed login attempts before account lock.', is_public: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'set_2', setting_key: 'DEFAULT_USER_LIMIT', setting_value: '500000', setting_type: 'NUMBER', description: 'Default daily transaction limit for new users.', is_public: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];


const initialState: AppState = {
    isAuthenticated: false,
    isAdmin: false,
    currentScreen: Screen.LANDING,
    user: null, // No user logged in initially
    adminUser: null, // No admin logged in initially
    users: mockUsers,
    wallets: mockWallets,
    transactions: mockTransactions,
    apiKeys: mockApiKeys,
    fraudRules: mockFraudRules,
    systemSettings: mockSystemSettings,
    savingsGoals: [],
    insurancePolicies: [],
    insuranceClaims: [],
    auditTrail: [],
    tempAuthData: {},
    tempLoginData: null,
    isOnline: true,
    offlineQueue: [],
    syncConflicts: [],
    lastSyncTimestamp: null,
    chaosMode: false,
    notifications: [],
    backendServices: [
        { id: 'auth-service', name: 'Auth Service', status: MicroserviceStatus.ONLINE, apiCalls: 152, avgLatency: 55, icon: NestJsIcon },
        { id: 'tx-service', name: 'Transaction Service', status: MicroserviceStatus.ONLINE, apiCalls: 890, avgLatency: 80, icon: NestJsIcon },
    ],
    // FIX: Add initial state for new advanced features
    loans: [],
    predictions: [
        { id: 'pred_1', title: 'Upcoming Expense Detected', description: 'Our AI predicts a large education payment of ~RWF 250,000 is due in 3 months.' },
    ],
    cryptoAssets: [
        { id: 'crypto_1', symbol: 'BTC', name: 'Bitcoin', balance: 0.005, valueRWF: 420000 },
        { id: 'crypto_2', symbol: 'ETH', name: 'Ethereum', balance: 0.1, valueRWF: 250000 },
        { id: 'crypto_3', symbol: 'RWT', name: 'Rwanda Token', balance: 1000, valueRWF: 100000 },
    ],
    ibiminaGroups: [
        { id: 'group_1', name: 'Kigali Tech Innovators', members: 12, nextMeeting: '2024-08-01', totalSavings: 1250000 },
    ],
    communityProjects: [
        { id: 'proj_1', title: 'Build Musanze Community Library', organizer: 'Rwanda Reads', verified: true, collected: 850000, goal: 2000000 },
    ],
    goals: [
        { id: 'goal_1', name: 'Buy a Car', current: 1200000, target: 5000000, type: 'asset' },
        { id: 'goal_2', name: 'Masters Degree', current: 500000, target: 2000000, type: 'education' },
    ],
    badges: [{ id: 'badge_1', icon: '💰', name: 'First Deposit', description: 'You made your first deposit!', unlocked: true }],
    quests: [{ id: 'quest_1', title: 'Save 10,000 RWF this week', reward: 500, progress: 60 }],
    businessMetrics: [{ title: 'Revenue', value: '1.2M RWF', trend: 'up', change: '+15%' }],
    courses: [{ id: 'course_1', difficulty: 'beginner', duration: '15 min', title: 'Intro to Budgeting', reward: 1000 }],
    impactFunds: [{ id: 'fund_1', category: 'Agriculture', title: 'Rwanda Coffee Co-op', description: 'Invest in local coffee farmers.', apy: 8.5, investedAmount: 0, minInvestment: 50000 }],
    sdgProgress: [{ goal: 8, title: 'Decent Work & Economic Growth', impact: 75 }],
    gameProfile: { level: 5, netWorthXP: 125000, skillPoints: 3 },
    financialNFTs: [{ id: 'nft_1', imageUrl: 'https://via.placeholder.com/150', title: 'Savvy Saver #1' }],
};

const appReducer = (state: AppState, action: Action): AppState => {
    // Simulate latency for chaos mode
    if (state.chaosMode && action.type !== 'TOGGLE_CHAOS_MODE' && action.type !== 'SET_ONLINE_STATUS') {
        const start = Date.now();
        while (Date.now() - start < 700) {} // 700ms delay
    }

    switch (action.type) {
        case 'NAVIGATE':
            return { ...state, currentScreen: action.payload };
        case 'LOGIN':
            return { ...state, isAuthenticated: true, user: action.payload.user, currentScreen: Screen.DASHBOARD, tempLoginData: null };
        case 'ADMIN_LOGIN':
            return { ...state, isAuthenticated: true, isAdmin: true, adminUser: action.payload.adminUser, currentScreen: Screen.ADMIN_DASHBOARD, tempLoginData: null };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, isAdmin: false, user: null, adminUser: null, currentScreen: Screen.LANDING };
        case 'REQUIRE_MFA':
            // This now needs to handle both user and admin, but for now we simplify
             return { ...state, currentScreen: Screen.MFA, tempLoginData: action.payload };
        case 'CREATE_ACCOUNT':
            const { user, wallet, initialTransactions } = action.payload;
            return { 
                ...state, 
                isAuthenticated: true, 
                user: user,
                users: [...state.users, user],
                wallets: [...state.wallets, wallet],
                transactions: [...state.transactions, ...initialTransactions], 
                currentScreen: Screen.DASHBOARD 
            };
        case 'SET_TEMP_AUTH_DATA':
            return { ...state, tempAuthData: { ...state.tempAuthData, ...action.payload } };
        
        // ADMIN ACTIONS
        case 'ADMIN_UPDATE_USER_STATUS':
            return { ...state, users: state.users.map(u => u.id === action.payload.userId ? { ...u, status: action.payload.status } : u) };
        case 'ADMIN_UPDATE_USER_KYC':
            return { ...state, users: state.users.map(u => u.id === action.payload.userId ? { ...u, kyc_status: action.payload.kycStatus } : u) };
        case 'ADMIN_UPDATE_SETTING':
            return { ...state, systemSettings: state.systemSettings.map(s => s.setting_key === action.payload.key ? { ...s, setting_value: action.payload.value } : s) };
        case 'ADMIN_CREATE_API_KEY':
            return { ...state, apiKeys: [...state.apiKeys, action.payload] };

        // Other actions
        case 'ADD_TRANSACTION':
            return { ...state, transactions: [action.payload, ...state.transactions] };
        case 'UPDATE_BALANCE':
             return { ...state, wallets: state.wallets.map(w => w.id === action.payload.walletId ? { ...w, balance: action.payload.newBalance, available_balance: action.payload.newBalance } : w) };
        case 'SET_ONLINE_STATUS':
             return { ...state, isOnline: action.payload };
        case 'TOGGLE_CHAOS_MODE':
            return { ...state, chaosMode: !state.chaosMode };
        case 'ADD_NOTIFICATION':
            return { ...state, notifications: [...state.notifications, { ...action.payload, id: `notif_${Date.now()}` }] };
        case 'REMOVE_NOTIFICATION':
            return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };

        default:
            return state;
    }
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        const handleOnline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: true });
        const handleOffline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: false });
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};