import React from 'react';
import { Screen } from './constants';

// --- ENUMS from SCHEMA ---
export enum KycStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export enum UserType {
  CUSTOMER = 'CUSTOMER',
  AGENT = 'AGENT',
  MERCHANT = 'MERCHANT',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
  BLOCKED = 'BLOCKED',
}

export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  COMPLIANCE = 'COMPLIANCE',
  FINANCE = 'FINANCE',
}

export enum WalletType {
  PERSONAL = 'PERSONAL',
  BUSINESS = 'BUSINESS',
  SAVINGS = 'SAVINGS',
  INVESTMENT = 'INVESTMENT',
}

export enum WalletStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  CLOSED = 'CLOSED',
  SUSPENDED = 'SUSPENDED',
}

export enum TransactionType {
  TRANSFER = 'TRANSFER',
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  PAYMENT = 'PAYMENT',
  REFUND = 'REFUND',
  CHARGE = 'CHARGE',
  REVERSAL = 'REVERSAL',
  // FIX: Add missing transaction types used across various screens.
  RECEIVED = 'RECEIVED',
  SENT = 'SENT',
  BILL_PAYMENT = 'BILL_PAYMENT',
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
    FOOD = 'FOOD',
    TRANSPORT = 'TRANSPORT',
    BILLS = 'BILLS',
    SHOPPING = 'SHOPPING',
    ENTERTAINMENT = 'ENTERTAINMENT',
    HEALTH = 'HEALTH',
    EDUCATION = 'EDUCATION',
    SALARY = 'SALARY',
    BUSINESS = 'BUSINESS',
    OTHER = 'OTHER',
    // FIX: Add missing transaction categories.
    BONUS = 'BONUS',
    LOAN = 'LOAN',
    TRANSFER = 'TRANSFER',
}

// --- NEW ENUMS ---
// FIX: Add missing MicroserviceStatus enum.
export enum MicroserviceStatus {
    ONLINE = 'Online',
    DEGRADED = 'Degraded',
    OFFLINE = 'Offline',
}

// --- TABLE INTERFACES ---

export interface User {
  id: string;
  phone: string;
  email?: string | null;
  national_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  date_of_birth?: string | null;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | null;
  kyc_status: KycStatus;
  kyc_verified_at?: string | null;
  risk_level: RiskLevel;
  user_type: UserType;
  status: UserStatus;
  pin_hash: string; // In a real app, never store PINs plaintext. This is a stand-in.
  biometric_data?: string | null;
  last_login?: string | null;
  login_attempts: number;
  created_at: string;
  updated_at: string;
  // FIX: Add missing properties to support advanced features.
  dailyTransactionLimit: number;
  deviceTrustScore: number;
  biometricsEnabled: boolean;
  dnaProfileAvailable: boolean;
}

export interface AdminUser {
  id: string;
  phone: string;
  email: string;
  username: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: AdminRole;
  permissions: Record<string, string[]>;
  two_factor_enabled: boolean;
  last_login?: string | null;
  login_attempts: number;
  status: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
  created_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  wallet_number: string;
  balance: number;
  available_balance: number;
  locked_balance: number;
  currency: 'RWF' | 'USD' | 'EUR' | 'GBP';
  type: WalletType;
  status: WalletStatus;
  min_balance: number;
  max_balance: number;
  created_at: string;
  updated_at: string;
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
  currency: 'RWF' | 'USD' | 'EUR' | 'GBP';
  type: TransactionType;
  category: TransactionCategory;
  status: TransactionStatus;
  description?: string | null;
  provider: 'MTN' | 'AIRTEL' | 'BK' | 'EQUITY' | 'COGEBANQUE' | 'PAYPAL' | 'STRIPE' | 'INTERNAL';
  provider_reference?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  device_id?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  metadata?: Record<string, any> | null;
  risk_score: number;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SavingsGoal {
    id: string;
    user_id: string;
    name: string;
    description?: string | null;
    target_amount: number;
    current_amount: number;
    deadline?: string | null;
    color: string;
    icon: string;
    auto_save: boolean;
    auto_save_amount: number;
    auto_save_frequency?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | null;
    auto_save_day: number;
    status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'PAUSED';
    progress_percentage: number;
    completed_at?: string | null;
    created_at: string;
    updated_at: string;
}

// --- NEW INTERFACES for advanced features ---
export interface Loan {
    id: string;
    amount: number;
    interestRate: number;
    dueDate: string;
    isRepaid: boolean;
}
export interface Prediction {
    id: string;
    title: string;
    description: string;
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
    collected: number;
    goal: number;
}
export interface Goal {
    id: string;
    name: string;
    current: number;
    target: number;
    type: 'asset' | 'education' | 'housing' | 'travel';
}
export interface Badge {
    id: string;
    icon: string;
    name: string;
    description: string;
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
    trend: 'up' | 'down';
    change: string;
}
export interface Course {
    id: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    title: string;
    reward: number;
}
export interface ImpactFund {
    id: string;
    category: string;
    title: string;
    description: string;
    apy: number;
    investedAmount: number;
    minInvestment: number;
}
export interface SDGProgress {
    goal: number;
    title: string;
    impact: number;
}
export interface FinancialNFT {
    id: string;
    imageUrl: string;
    title: string;
}
export interface GameProfile {
    level: number;
    netWorthXP: number;
    skillPoints: number;
}

export interface InsurancePolicy {
    id: string;
    user_id: string;
    type: 'HEALTH' | 'VEHICLE' | 'PROPERTY' | 'LIFE' | 'TRAVEL' | 'BUSINESS';
    provider: string;
    policy_number: string;
    premium_amount: number;
    coverage_amount: number;
    start_date: string;
    end_date: string;
    renewal_date?: string | null;
    status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PENDING_RENEWAL';
    payment_frequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'ONE_TIME';
    documents?: Record<string, any> | null;
    terms_and_conditions?: string | null;
    created_at: string;
    updated_at: string;
}

export interface InsuranceClaim {
    id: string;
    policy_id: string;
    claim_number: string;
    claim_amount: number;
    description: string;
    incident_date: string;
    incident_location?: string | null;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW' | 'PROCESSING';
    documents?: Record<string, any> | null;
    photos?: Record<string, any> | null;
    adjuster_notes?: string | null;
    settled_amount?: number | null;
    settled_date?: string | null;
    approved_by?: string | null;
    approved_at?: string | null;
    created_at: string;
    updated_at: string;
}

export interface SystemSetting {
    id: string;
    setting_key: string;
    setting_value: string;
    setting_type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON' | 'ARRAY';
    description?: string | null;
    is_public: boolean;
    updated_by?: string | null;
    created_at: string;
    updated_at: string;
}

export interface FraudRule {
    id: string;
    name: string;
    description?: string | null;
    rule_condition: Record<string, any>;
    action: 'BLOCK' | 'REVIEW' | 'NOTIFY' | 'LIMIT';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    is_active: boolean;
    created_by?: string | null;
    created_at: string;
    updated_at: string;
}

export interface ApiKey {
    id: string;
    name: string;
    api_key: string;
    api_secret: string; // This would be a hash in a real DB
    merchant_id?: string | null;
    permissions: Record<string, any>;
    whitelist_ips?: string[] | null;
    rate_limit_per_minute: number;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    expires_at?: string | null;
    last_used_at?: string | null;
    created_by?: string | null;
    created_at: string;
    updated_at: string;
}

export interface AuditTrail {
    id: string;
    user_id?: string | null;
    user_type: 'CUSTOMER' | 'ADMIN' | 'SYSTEM';
    action: string;
    resource_type: string;
    resource_id?: string | null;
    old_values?: Record<string, any> | null;
    new_values?: Record<string, any> | null;
    ip_address?: string | null;
    user_agent?: string | null;
    location?: string | null;
    created_at: string;
}

// --- LEGACY & SIMULATION TYPES ---
// These types are kept for compatibility with existing components or for simulation purposes.

export interface OfflineTransaction {
  id: string;
  payload: Transaction;
  timestamp: number;
}
export interface Notification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}
export interface SyncConflict {
    id: string;
    offlineTransaction: OfflineTransaction;
    serverState: { reason: string };
    aiResolution: { description: string; recommendedAction: 'RETRY' | 'CANCEL' };
}
export interface Microservice {
    id: string;
    name: string;
    status: MicroserviceStatus;
    apiCalls: number;
    avgLatency: number;
    icon: React.FC<any>;
}


// --- App State ---

export interface AppState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentScreen: Screen;
  
  // Data from DB
  user: User | null;
  adminUser: AdminUser | null;
  users: User[];
  wallets: Wallet[];
  transactions: Transaction[];
  savingsGoals: SavingsGoal[];
  insurancePolicies: InsurancePolicy[];
  insuranceClaims: InsuranceClaim[];
  systemSettings: SystemSetting[];
  fraudRules: FraudRule[];
  apiKeys: ApiKey[];
  auditTrail: AuditTrail[];
  
  // Temp/Session Data
  tempAuthData: any;
  tempLoginData: { user: User } | { adminUser: AdminUser } | null;
  
  // Simulation features
  isOnline: boolean;
  offlineQueue: OfflineTransaction[];
  syncConflicts: SyncConflict[];
  lastSyncTimestamp: Date | null;
  chaosMode: boolean;
  notifications: Notification[];
  backendServices: Microservice[];

  // --- NEW STATE for advanced features ---
  quantumSecurity?: any; // Define a proper type if needed
  loans: Loan[];
  predictions: Prediction[];
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
  gameProfile: GameProfile;
  financialNFTs: FinancialNFT[];
}

export type Action =
  | { type: 'NAVIGATE'; payload: Screen }
  | { type: 'LOGIN'; payload: { user: User } }
  | { type: 'ADMIN_LOGIN'; payload: { adminUser: AdminUser } }
  | { type: 'LOGOUT' }
  | { type: 'REQUIRE_MFA', payload: { user: User } }
  | { type: 'CREATE_ACCOUNT'; payload: { user: User; wallet: Wallet; initialTransactions: Transaction[] } }
  | { type: 'SET_TEMP_AUTH_DATA'; payload: any }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_BALANCE'; payload: { walletId: string, newBalance: number } }
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'TOGGLE_CHAOS_MODE' }
  | { type: 'QUEUE_TRANSACTION'; payload: OfflineTransaction }
  | { type: 'PROCESS_OFFLINE_QUEUE' }
  | { type: 'ADD_NOTIFICATION', payload: Omit<Notification, 'id'> }
  | { type: 'REMOVE_NOTIFICATION', payload: string }
  | { type: 'UPDATE_SERVICE_METRICS', payload: { id: string, metrics: { apiCalls: number, avgLatency: number } } }
  | { type: 'RESOLVE_CONFLICT', payload: { conflictId: string, resolution: 'RETRY' | 'CANCEL' } }
  // Admin Actions
  | { type: 'ADMIN_UPDATE_USER_STATUS'; payload: { userId: string, status: UserStatus } }
  | { type: 'ADMIN_UPDATE_USER_KYC'; payload: { userId: string, kycStatus: KycStatus } }
  | { type: 'ADMIN_UPDATE_SETTING'; payload: { key: string, value: string } }
  | { type: 'ADMIN_CREATE_API_KEY'; payload: ApiKey }
  // --- NEW ACTIONS for advanced features ---
  | { type: 'UPDATE_TRANSACTION_LIMIT'; payload: number }
  | { type: 'TOGGLE_BIOMETRICS' }
  | { type: 'APPLY_LOAN'; payload: Loan }
  | { type: 'INVEST_IMPACT_FUND'; payload: { fundId: string, amount: number } };

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}