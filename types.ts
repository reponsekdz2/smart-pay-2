// FIX: Provide definitions for all custom types used in the application.
export enum TransactionType {
  SENT = 'Sent',
  RECEIVED = 'Received',
  BILL_PAYMENT = 'Bill Payment',
  LOAN_DISBURSEMENT = 'Loan Disbursement',
  LOAN_REPAYMENT = 'Loan Repayment',
  SAVINGS_DEPOSIT = 'Savings Deposit',
  SAVINGS_WITHDRAWAL = 'Savings Withdrawal',
  IMPACT_INVESTMENT = 'Impact Investment',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  status: 'Successful' | 'Pending' | 'Failed';
  category?: string;
  provider?: string;
}

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  password?: string;
  pin: string;
  nationalId: string;
  balance: number;
  securityScore: number;
  biometricsEnabled: boolean;
  faceIdEnabled: boolean;
  voicePrintEnabled: boolean;
  dnaProfileAvailable: boolean;
  // New Production-level fields
  dailyTransactionLimit: number;
  deviceTrustScore: number; // 0-100
}

export interface Loan {
    id: string;
    amount: number;
    interestRate: number;
    dueDate: string;
    isRepaid: boolean;
}

export interface Savings {
    balance: number;
    goal: number;
    interestEarned: number;
}

export interface Policy {
    id: string;
    name: string;
    premium: number;
    coverage: number;
    nextDueDate: string;
}

export interface CryptoAsset {
    id: string;
    name: string;
    symbol: 'BTC' | 'ETH' | 'RWT';
    balance: number;
    valueRWF: number;
    network: string;
}

export interface IbiminaGroup {
    id: string;
    name: string;
    members: number;
    totalSavings: number;
    yourShare: number;
    nextMeeting: string;
}

export interface CommunityProject {
    id: string;
    title: string;
    goal: number;
    collected: number;
    contributors: number;
    organizer: string;
    verified: boolean;
}

export interface Goal {
    id: string;
    name: string;
    target: number;
    current: number;
    priority: 'high' | 'medium' | 'low';
    type: 'asset' | 'education' | 'housing' | 'travel';
}

export interface Badge {
    id: string;
    name: string;
    icon: string;
    description: string;
    unlocked: boolean;
    progress: number;
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    reward: number;
    xp: number;
    progress: number;
}

export interface BusinessMetric {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'flat';
}

export interface Course {
    id: string;
    title: string;
    duration: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    reward: number;
}

export interface ImpactFund {
    id: string;
    title: string;
    category: 'Agri-Tech' | 'Renewable Energy' | 'Edu-Tech';
    description: string;
    minInvestment: number;
    apy: number; // Annual Percentage Yield
    investedAmount: number;
}

export interface SDGProgress {
    goal: number; // UN SDG goal number
    title: string;
    impact: number; // 0 to 100
}

export interface GameProfile {
    level: number;
    netWorthXP: number;
    skillPoints: number;
}

export interface FinancialNFT {
    id: string;
    title: string;
    description: string;
    type: 'Milestone' | 'Skill';
    imageUrl: string;
}

export interface QuantumSecurity {
    quantumEncryption: boolean;
    gaitAnalysis: boolean;
    decentralizedID: boolean;
}

export interface OfflineTransaction {
    id: string;
    payload: Transaction;
    timestamp: number;
}

export enum MicroserviceStatus {
    ONLINE = 'Online',
    DEGRADED = 'Degraded',
    OFFLINE = 'Offline',
}

export interface Microservice {
    id: string;
    name: string;
    status: MicroserviceStatus;
    apiCalls: number;
    avgLatency: number;
    icon: React.FC<any>;
}


export interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  transactions: Transaction[];
  loans: Loan[];
  savings: Savings;
  policies: Policy[];
  currentScreen: string;
  tempAuthData: any;
  // --- PRODUCTION SIMULATION STATE ---
  isOnline: boolean;
  offlineQueue: OfflineTransaction[];
  backendServices: Microservice[];

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
  quantumSecurity: QuantumSecurity;
}

export type Action =
  | { type: 'NAVIGATE'; payload: string }
  | { type: 'SET_TEMP_AUTH_DATA'; payload: any }
  | { type: 'CREATE_ACCOUNT'; payload: { user: User; initialTransactions: Transaction[] } }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_BALANCE'; payload: number }
  | { type: 'APPLY_LOAN'; payload: Loan }
  | { type: 'REPAY_LOAN'; payload: string }
  | { type: 'UPDATE_SAVINGS'; payload: Partial<Savings> }
  | { type: 'ADD_POLICY'; payload: Policy }
  | { type: 'TOGGLE_BIOMETRICS' }
  | { type: 'TOGGLE_FACE_ID' }
  | { type: 'TOGGLE_VOICE_PRINT' }
  | { type: 'TOGGLE_QUANTUM_SECURITY'; payload: keyof QuantumSecurity }
  | { type: 'COMPLETE_QUEST'; payload: string }
  | { type: 'INVEST_IMPACT_FUND'; payload: { fundId: string, amount: number } }
  | { type: 'INITIALIZE_STATE'; payload: AppState }
  // --- PRODUCTION SIMULATION ACTIONS ---
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'QUEUE_TRANSACTION'; payload: OfflineTransaction }
  | { type: 'PROCESS_OFFLINE_QUEUE'; payload: Transaction[] }
  | { type: 'UPDATE_TRANSACTION_LIMIT'; payload: number }
  | { type: 'UPDATE_SERVICE_METRICS'; payload: { id: string; metrics: Partial<Microservice> } };


export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}