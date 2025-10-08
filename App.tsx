
import React from 'react';
import { AppProvider } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import { Screen } from './constants';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { SendMoneyScreen } from './screens/SendMoneyScreen';
import { PayBillsScreen } from './screens/PayBillsScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { TransactionHistoryScreen } from './screens/TransactionHistoryScreen';
import { SecurityScreen } from './screens/SecurityScreen';
import { QrScanScreen } from './screens/QrScanScreen';
import { PaymentGatewayScreen } from './screens/PaymentGatewayScreen';
import { LoansScreen } from './screens/LoansScreen';
import { SavingsScreen } from './screens/SavingsScreen';
import { InsuranceScreen } from './screens/InsuranceScreen';
import { QuantumAdvisorScreen } from './screens/AIAssistantScreen';
import { CryptoWalletScreen } from './screens/CryptoWalletScreen';
import { CommunityBankingScreen } from './screens/CommunityBankingScreen';
import { GoalsScreen } from './screens/GoalsScreen';
import { MerchantPortalScreen } from './screens/MerchantPortalScreen';
import { FinancialEducationScreen } from './screens/FinancialEducationScreen';
import { FutureHubScreen } from './screens/FutureHubScreen';
import { ImpactInvestingScreen } from './screens/ImpactInvestingScreen';
import { MetaverseBankScreen } from './screens/MetaverseBankScreen';
import { FinancialGamingScreen } from './screens/FinancialGamingScreen';
import { BioFinanceScreen } from './screens/BioFinanceScreen';
import { MfaScreen } from './screens/MfaScreen';
import { SyncCenterScreen } from './screens/SyncCenterScreen';
import { AdminDashboardScreen } from './screens/admin/AdminDashboardScreen';
import { AdminUserManagementScreen } from './screens/admin/AdminUserManagementScreen';
import { AdminTransactionScreen } from './screens/admin/AdminTransactionScreen';
import { AdminSystemScreen } from './screens/admin/AdminSystemScreen';
import { NotificationContainer } from './components/Notification';
import { BiometricSetupScreen } from './screens/BiometricSetupScreen';

const AppContent = () => {
    const { state } = useAppContext();

    const renderScreen = () => {
        switch (state.screen) {
            case Screen.ONBOARDING: return <OnboardingScreen />;
            case Screen.LOGIN: return <LoginScreen />;
            case Screen.DASHBOARD: return <DashboardScreen />;
            case Screen.SEND_MONEY: return <SendMoneyScreen />;
            case Screen.PAY_BILLS: return <PayBillsScreen />;
            case Screen.ANALYTICS: return <AnalyticsScreen />;
            case Screen.TRANSACTION_HISTORY: return <TransactionHistoryScreen />;
            case Screen.SECURITY: return <SecurityScreen />;
            case Screen.QR_SCAN: return <QrScanScreen />;
            case Screen.PAYMENT_GATEWAY: return <PaymentGatewayScreen />;
            case Screen.LOANS: return <LoansScreen />;
            case Screen.SAVINGS: return <SavingsScreen />;
            case Screen.INSURANCE: return <InsuranceScreen />;
            case Screen.QUANTUM_ADVISOR: return <QuantumAdvisorScreen />;
            case Screen.CRYPTO_WALLET: return <CryptoWalletScreen />;
            case Screen.COMMUNITY_BANKING: return <CommunityBankingScreen />;
            case Screen.GOALS: return <GoalsScreen />;
            case Screen.MERCHANT_PORTAL: return <MerchantPortalScreen />;
            case Screen.FINANCIAL_EDUCATION: return <FinancialEducationScreen />;
            case Screen.FUTURE_HUB: return <FutureHubScreen />;
            case Screen.IMPACT_INVESTING: return <ImpactInvestingScreen />;
            case Screen.METAVERSE_BANK: return <MetaverseBankScreen />;
            case Screen.FINANCIAL_GAMING: return <FinancialGamingScreen />;
            case Screen.BIO_FINANCE: return <BioFinanceScreen />;
            case Screen.MFA: return <MfaScreen />;
            case Screen.SYNC_CENTER: return <SyncCenterScreen />;
            case Screen.ADMIN_DASHBOARD: return <AdminDashboardScreen />;
            case Screen.ADMIN_USERS: return <AdminUserManagementScreen />;
            case Screen.ADMIN_TRANSACTIONS: return <AdminTransactionScreen />;
            case Screen.ADMIN_SYSTEM: return <AdminSystemScreen />;
            case Screen.BIOMETRIC_SETUP: return <BiometricSetupScreen />;
            default: return <OnboardingScreen />;
        }
    };

    return (
        <>
            {renderScreen()}
            <NotificationContainer />
        </>
    );
};

const App = () => (
    <AppProvider>
        <AppContent />
    </AppProvider>
);

export default App;
