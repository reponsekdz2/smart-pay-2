// FIX: Add React import for using React types.
import React from 'react';
import { Screen } from './constants';

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    BLOCKED = 'BLOCKED',
    DELETED = 'DELETED',
}

export enum KycStatus {
    PENDING = 'PENDING',
    VERIFIED = 'VERIFIED',
    REJECTED = 'REJECTED',
    UNDER_REVIEW = 'UNDER_REVIEW',
}

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    national_id: string;
    status: UserStatus;
    kyc_status: KycStatus;
    created_at: string;
    dnaProfileAvailable?: boolean;
}

export interface Wallet {
    id: string;
    user_id: string;
    balance: number;
    currency: string;
}

export enum TransactionType {
    SENT = 'SENT',
    RECEIVED = 'RECEIVED',
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
    PAYMENT = 'PAYMENT',
    LOAN_DISBURSEMENT = 'LOAN_DISBURSEMENT',
    SAVINGS_WITHDRAWAL = 'SAVINGS_WITHDRAWAL',
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    REVERSED = 'REVERSED',
    ON_HOLD = 'ON_HOLD',
}

export enum TransactionCategory {
    TRANSFER = 'TRANSFER',
    BILLS = 'BILLS',
    SHOPPING = 'SHOPPING',
    FOOD = 'FOOD',
    LOAN = 'LOAN',
    SAVINGS = 'SAVINGS',
    OTHER = 'OTHER',
}

export interface Transaction {
    id: string;
    reference: string;
    from_wallet_id: string;
    to_wallet_id: string;
    from_user_id: string;
    to_user_id: string;
    amount: number;
    fee: number;
    tax: number;
    total_amount: number;
    currency: string;
    type: TransactionType;
    description: string;
    status: TransactionStatus;
    category?: TransactionCategory;
    provider: string;
    risk_score: number;
    created_at: string;
    updated_at: string;
    ip_address?: string;
}

export interface Notification {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

export interface SavingsGoal {
    id: string;
    name: string;
    target_amount: number;
    current_amount: number;
}

export interface Loan {
    id: string;
    amount: number;
    interestRate: number;
    dueDate: string;
    isRepaid: boolean;
}

export interface CryptoAsset {
    id: string;
    symbol: 'BTC' | 'ETH' | 'RWT';
    name: string;
    balance: number;
    valueRWF: number;
}

export interface IbiminaGroup {
    id: string;
    name: string;
    members: number;
    nextMeeting: string;
    totalSavings: number;
}

export interface CommunityProject {
    id: string;
    title: string;
    organizer: string;
    verified: boolean;
    goal: number;
    collected: number;
}

export type GoalType = 'asset' | 'education' | 'housing' | 'travel';
export interface Goal {
    id: string;
    name: string;
    type: GoalType;
    target: number;
    current: number;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
}

export interface Quest {
    id: string;
    title: string;
    reward: number;
    progress: number;
}

export interface BusinessMetric {
    title: string;
    value: string;
    trend: 'up' | 'down' | 'neutral';
    change: string;
}

export interface Course {
    id: string;
    title: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    reward: number;
}

export interface ImpactFund {
    id: string;
    title: string;
    description: string;
    category: string;
    apy: number;
    minInvestment: number;
    investedAmount: number;
}

export interface SDGProgress {
    goal: number;
    title: string;
    impact: number;
}

export interface FinancialNFT {
    id: string;
    title: string;
    imageUrl: string;
}

export interface GameProfile {
    level: number;
    netWorthXP: number;
    skillPoints: number;
}

export interface Prediction {
    id: string;
    title: string;
    description: string;
}

export interface OfflineTransaction {
    id: string;
    type: 'ADD_TRANSACTION';
    payload: Transaction;
}

export interface SyncConflict {
    id: string;
    offlineTransaction: OfflineTransaction;
    serverState: {
        reason: string;
    };
    aiResolution: {
        description: string;
    };
}

export interface BackendService {
    name: string;
    status: 'Online' | 'Offline' | 'Degraded';
    // FIX: Updated icon type to be more specific, allowing style props to be passed via React.cloneElement.
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

export interface SystemSetting {
    id: string;
    setting_key: string;
    setting_value: string;
    description: string;
}

export interface FraudRule {
    id: string;
    name: string;
    description: string;
    condition: string;
    action: 'FLAG' | 'BLOCK' | 'ALERT';
    is_active: boolean;
}

export interface ApiKey {
    id: string;
    name: string;
    api_key: string;
    api_secret: string;
    status: 'ACTIVE' | 'INACTIVE';
    permissions: Record<string, any>;
    rate_limit_per_minute: number;
    created_at: string;
    updated_at: string;
}

export interface AppState {
    screen: Screen;
    user: User | null;
    wallets: Wallet[];
    transactions: Transaction[];
    notifications: Notification[];
    savingsGoals: SavingsGoal[];
    loans: Loan[];
    cryptoAssets: CryptoAsset[];
    ibiminaGroups: IbiminaGroup[];
    communityProjects: CommunityProject[];
    goals: Goal[];
    badges: Badge[];
    quests: Quest[];
    businessMetrics: BusinessMetric[];
    courses: Course[];
    impactFunds: ImpactFund[];
    sdgProgress: SDGProgress[];
    financialNFTs: FinancialNFT[];
    gameProfile: GameProfile;
    predictions: Prediction[];
    isOnline: boolean;
    offlineQueue: OfflineTransaction[];
    syncConflicts: SyncConflict[];
    lastSyncTimestamp: Date | null;
    tempLoginData: any;
    tempAuthData: any;
    backendServices: BackendService[];
    systemSettings: SystemSetting[];
    fraudRules: FraudRule[];
    apiKeys: ApiKey[];
    users: User[]; // For admin
}

export type Action =
    | { type: 'NAVIGATE'; payload: Screen }
    | { type: 'LOGIN'; payload: { user: User } }
    | { type: 'LOGOUT' }
    | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id'> }
    | { type: 'REMOVE_NOTIFICATION'; payload: number }
    | { type: 'ADD_TRANSACTION'; payload: Transaction }
    | { type: 'UPDATE_BALANCE'; payload: { walletId: string, newBalance: number } }
    | { type: 'APPLY_LOAN'; payload: Loan }
    | { type: 'INVEST_IMPACT_FUND'; payload: { fundId: string, amount: number } }
    | { type: 'SET_TEMP_LOGIN_DATA'; payload: any }
    | { type: 'SET_TEMP_AUTH_DATA'; payload: any }
    | { type: 'PROCESS_OFFLINE_QUEUE' }
    | { type: 'RESOLVE_CONFLICT', payload: { conflictId: string, resolution: 'RETRY' | 'CANCEL' } }
    | { type: 'TOGGLE_ONLINE_STATUS' }
    | { type: 'ADMIN_UPDATE_USER_KYC', payload: { userId: string, kycStatus: KycStatus } }
    | { type: 'ADMIN_UPDATE_USER_STATUS', payload: { userId: string, status: UserStatus } }
    | { type: 'ADMIN_CREATE_API_KEY', payload: ApiKey }
    | { type: 'ADMIN_UPDATE_SETTING', payload: { key: string, value: string } };

export interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<Action>;
}