// FIX: Provide definitions for all custom types used in the application.
export enum TransactionType {
  SENT = 'Sent',
  RECEIVED = 'Received',
  BILL_PAYMENT = 'Bill Payment',
  LOAN_DISBURSEMENT = 'Loan Disbursement',
  LOAN_REPAYMENT = 'Loan Repayment',
  SAVINGS_DEPOSIT = 'Savings Deposit',
  SAVINGS_WITHDRAWAL = 'Savings Withdrawal',
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

export interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  transactions: Transaction[];
  loans: Loan[];
  savings: Savings;
  policies: Policy[];
  currentScreen: string; // Using string to match Screen enum values
  tempAuthData: any;
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
  | { type: 'INITIALIZE_STATE'; payload: AppState };

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}