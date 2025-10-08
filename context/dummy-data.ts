
import React from 'react';
import { User, Wallet, Transaction, Notification, SavingsGoal, Loan, CryptoAsset, IbiminaGroup, CommunityProject, Goal, Badge, Quest, BusinessMetric, Course, ImpactFund, SDGProgress, FinancialNFT, GameProfile, Prediction, SyncConflict, OfflineTransaction, BackendService, SystemSetting, FraudRule, ApiKey, UserStatus, KycStatus, TransactionType, TransactionStatus, TransactionCategory, GoalType } from '../types';
import { ServerStackIcon, CircleStackIcon } from '../components/icons';

const USERS: User[] = [
    { id: 'user_1', first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone: '0788123456', national_id: '1199080012345678', status: UserStatus.ACTIVE, kyc_status: KycStatus.VERIFIED, created_at: new Date().toISOString(), dnaProfileAvailable: true },
    { id: 'admin_1', first_name: 'Admin', last_name: 'User', email: 'admin@example.com', phone: '0788111222', national_id: '1198080011112222', status: UserStatus.ACTIVE, kyc_status: KycStatus.VERIFIED, created_at: new Date().toISOString() },
    { id: 'user_2', first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', phone: '0788987654', national_id: '1199180098765432', status: UserStatus.ACTIVE, kyc_status: KycStatus.PENDING, created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
    { id: 'user_3', first_name: 'Peter', last_name: 'Jones', email: 'peter@example.com', phone: '0733123456', national_id: '1198580055554444', status: UserStatus.SUSPENDED, kyc_status: KycStatus.VERIFIED, created_at: new Date(Date.now() - 86400000 * 10).toISOString() },
];

const WALLETS: Wallet[] = [
    { id: 'wallet_1', user_id: 'user_1', balance: 150000, currency: 'RWF' },
    { id: 'wallet_2', user_id: 'user_2', balance: 75000, currency: 'RWF' },
    { id: 'wallet_3', user_id: 'user_3', balance: 10000, currency: 'RWF' },
];

const TRANSACTIONS: Transaction[] = [
    { id: 'txn_1', reference: 'REF001', from_wallet_id: 'wallet_2', to_wallet_id: 'wallet_1', from_user_id: 'user_2', to_user_id: 'user_1', amount: 5000, fee: 50, tax: 10, total_amount: 5060, currency: 'RWF', type: TransactionType.SENT, description: 'Payment for services', status: TransactionStatus.COMPLETED, category: TransactionCategory.TRANSFER, provider: 'INTERNAL', risk_score: 0.1, created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date().toISOString(), ip_address: '192.168.1.1' },
    { id: 'txn_2', reference: 'REF002', from_wallet_id: 'external', to_wallet_id: 'wallet_1', from_user_id: 'external', to_user_id: 'user_1', amount: 25000, fee: 0, tax: 0, total_amount: 25000, currency: 'RWF', type: TransactionType.DEPOSIT, description: 'Monthly Salary', status: TransactionStatus.COMPLETED, category: TransactionCategory.OTHER, provider: 'BK', risk_score: 0.05, created_at: new Date(Date.now() - 86400000 * 2).toISOString(), updated_at: new Date().toISOString(), ip_address: '10.0.0.1' },
    { id: 'txn_3', reference: 'REF003', from_wallet_id: 'wallet_1', to_wallet_id: 'external_bill', from_user_id: 'user_1', to_user_id: 'biller', amount: -12000, fee: 100, tax: 20, total_amount: -12120, currency: 'RWF', type: TransactionType.PAYMENT, description: 'Canal+ Subscription', status: TransactionStatus.PENDING, category: TransactionCategory.BILLS, provider: 'MTN', risk_score: 0.8, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ip_address: '192.168.1.1' },
];

const SAVINGS_GOALS: SavingsGoal[] = [
    { id: 'sg_1', name: 'New Laptop', target_amount: 800000, current_amount: 350000 },
    { id: 'sg_2', name: 'Vacation to Zanzibar', target_amount: 1200000, current_amount: 400000 },
];

const LOANS: Loan[] = [
    { id: 'loan_1', amount: 50000, interestRate: 0.05, dueDate: new Date(Date.now() + 86400000 * 15).toISOString(), isRepaid: false },
];

const CRYPTO_ASSETS: CryptoAsset[] = [
    { id: 'ca_1', symbol: 'BTC', name: 'Bitcoin', balance: 0.005, valueRWF: 250000 },
    { id: 'ca_2', symbol: 'ETH', name: 'Ethereum', balance: 0.1, valueRWF: 200000 },
    { id: 'ca_3', symbol: 'RWT', name: 'Rwanda Token', balance: 1000, valueRWF: 100000 },
];

const IBIMINA_GROUPS: IbiminaGroup[] = [
    { id: 'ig_1', name: 'Kigali Coders Ibimina', members: 12, nextMeeting: '2024-08-01', totalSavings: 1250000 },
];

const COMMUNITY_PROJECTS: CommunityProject[] = [
    { id: 'cp_1', title: 'Build a new classroom for G.S. Kimironko', organizer: 'Kigali City', verified: true, goal: 5000000, collected: 1200000 },
];

const GOALS: Goal[] = [
    { id: 'g_1', name: 'Buy a Moto', type: 'asset', target: 1500000, current: 400000 },
    { id: 'g_2', name: 'Masters Degree', type: 'education', target: 5000000, current: 500000 },
    { id: 'g_3', name: 'Downpayment', type: 'housing', target: 10000000, current: 1500000 },
];

const BADGES: Badge[] = [
    { id: 'b_1', name: 'First Saver', description: 'Made your first deposit to a savings pot', icon: '💰', unlocked: true },
    { id: 'b_2', name: 'Community Builder', description: 'Contributed to a community project', icon: '🏗️', unlocked: false },
];

const QUESTS: Quest[] = [
    { id: 'q_1', title: 'Save 50,000 RWF this month', reward: 500, progress: 70 },
];

const BUSINESS_METRICS: BusinessMetric[] = [
    { title: 'Today\'s Revenue', value: 'RWF 150,000', trend: 'up', change: '+15%' },
    { title: 'New Customers', value: '12', trend: 'up', change: '+2' },
];

const COURSES: Course[] = [
    { id: 'c_1', title: 'Intro to Budgeting', difficulty: 'beginner', duration: '30 mins', reward: 500 },
    { id: 'c_2', title: 'Understanding Crypto', difficulty: 'intermediate', duration: '1 hour', reward: 1000 },
];

const IMPACT_FUNDS: ImpactFund[] = [
    { id: 'if_1', title: 'Rwanda Green Energy Fund', description: 'Invest in solar and hydro projects across Rwanda.', category: 'Renewable Energy', apy: 8.5, minInvestment: 50000, investedAmount: 0 },
];

const SDG_PROGRESS: SDGProgress[] = [
    { goal: 7, title: 'Affordable and Clean Energy', impact: 65 },
];

const FINANCIAL_NFTS: FinancialNFT[] = [
    { id: 'nft_1', title: 'Millionaire Club', imageUrl: 'https://via.placeholder.com/150' },
];

const GAME_PROFILE: GameProfile = { level: 5, netWorthXP: 150000, skillPoints: 3 };

const PREDICTIONS: Prediction[] = [
    { id: 'p_1', title: 'High Savings Potential Detected', description: 'Based on your income and spending, you could save an extra 25,000 RWF monthly. Consider setting up a recurring deposit.' },
];

const SYNC_CONFLICTS: SyncConflict[] = [];
const OFFLINE_QUEUE: OfflineTransaction[] = [];
// FIX: Add icon React elements to backend services to match the updated BackendService type.
const BACKEND_SERVICES: BackendService[] = [
    { name: 'Core Banking', status: 'Online', icon: <ServerStackIcon /> },
    { name: 'Payments API', status: 'Online', icon: <CircleStackIcon /> }
];

const SYSTEM_SETTINGS: SystemSetting[] = [
    { id: 'ss_1', setting_key: 'MAX_TRANSFER_LIMIT', setting_value: '500000', description: 'Maximum daily transfer amount per user' },
    { id: 'ss_2', setting_key: 'INTEREST_RATE_SAVINGS', setting_value: '4.5', description: 'Annual interest rate for savings accounts' },
];

const FRAUD_RULES: FraudRule[] = [
    { id: 'fr_1', name: 'High-Value Transfer', description: 'Flag transfers over 1,000,000 RWF for review', condition: 'amount > 1000000', action: 'FLAG', is_active: true },
];

const API_KEYS: ApiKey[] = [
    { id: 'ak_1', name: 'Default Merchant', api_key: 'sk_live_123abc', api_secret: 'secret_xyz', status: 'ACTIVE', permissions: {}, rate_limit_per_minute: 100, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];


const DUMMY_DATA = {
    users: USERS,
    wallets: WALLETS,
    transactions: TRANSACTIONS,
    notifications: [] as Notification[],
    savingsGoals: SAVINGS_GOALS,
    loans: LOANS,
    cryptoAssets: CRYPTO_ASSETS,
    ibiminaGroups: IBIMINA_GROUPS,
    communityProjects: COMMUNITY_PROJECTS,
    goals: GOALS,
    badges: BADGES,
    quests: QUESTS,
    businessMetrics: BUSINESS_METRICS,
    courses: COURSES,
    impactFunds: IMPACT_FUNDS,
    sdgProgress: SDG_PROGRESS,
    financialNFTs: FINANCIAL_NFTS,
    gameProfile: GAME_PROFILE,
    predictions: PREDICTIONS,
    isOnline: true,
    offlineQueue: OFFLINE_QUEUE,
    syncConflicts: SYNC_CONFLICTS,
    lastSyncTimestamp: null,
    tempLoginData: null,
    tempAuthData: null,
    backendServices: BACKEND_SERVICES,
    systemSettings: SYSTEM_SETTINGS,
    fraudRules: FRAUD_RULES,
    apiKeys: API_KEYS,
};

export default DUMMY_DATA;