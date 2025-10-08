import React from 'react';
import { AppProvider } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import { Screen } from './constants';

import { LoginScreen } from './screens/LoginScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { QrScanScreen } from './screens/QrScanScreen';
import { TransactionHistoryScreen } from './screens/TransactionHistoryScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { SecurityScreen } from './screens/SecurityScreen';
import { PaymentGatewayScreen } from './screens/PaymentGatewayScreen';
import { LoansScreen } from './screens/LoansScreen';
import { SavingsScreen } from './screens/SavingsScreen';
import { InsuranceScreen } from './screens/InsuranceScreen';
import { Button } from './components/common';
import { SendMoneyScreen } from './screens/SendMoneyScreen';
import { PayBillsScreen } from './screens/PayBillsScreen';

// --- NEW ADVANCED SCREEN IMPORTS ---
import { QuantumAdvisorScreen } from './screens/AIAssistantScreen';
import { CryptoWalletScreen } from './screens/CryptoWalletScreen';
import { CommunityBankingScreen } from './screens/CommunityBankingScreen';
import { GoalsScreen } from './screens/GoalsScreen';
import { MerchantPortalScreen } from './screens/MerchantPortalScreen';
import { FinancialEducationScreen } from './screens/FinancialEducationScreen';

// --- NEW NEXT-LEVEL SCREEN IMPORTS ---
import { FutureHubScreen } from './screens/FutureHubScreen';
import { ImpactInvestingScreen } from './screens/ImpactInvestingScreen';
import { MetaverseBankScreen } from './screens/MetaverseBankScreen';
import { FinancialGamingScreen } from './screens/FinancialGamingScreen';
import { BioFinanceScreen } from './screens/BioFinanceScreen';
import { BackendDashboardScreen } from './screens/BackendDashboardScreen';


// A simple landing screen component
const LandingScreen = () => {
    const { dispatch, state } = useAppContext();
    return (
        <div style={{ padding: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: 20, maxWidth: 480, margin: 'auto' }}>
            <h1>SmartPay Pro</h1>
            <p>Your seamless financial companion.</p>
            <div style={{width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 12}}>
              { state.user && <Button onPress={() => dispatch({ type: 'NAVIGATE', payload: Screen.LOGIN })}>Login as {state.user.name}</Button>}
              <Button onPress={() => dispatch({ type: 'NAVIGATE', payload: Screen.ONBOARDING_PHONE })} variant={state.user ? 'secondary' : 'primary'}>Create New Account</Button>
            </div>
        </div>
    )
};


const AppContent = () => {
  const { state } = useAppContext();

  switch (state.currentScreen) {
    case Screen.LANDING:
      return <LandingScreen />;
    case Screen.ONBOARDING_PHONE:
      return <OnboardingScreen />;
    case Screen.LOGIN:
      return <LoginScreen />;
    case Screen.DASHBOARD:
      return <DashboardScreen />;
    case Screen.QR_SCAN:
        return <QrScanScreen />;
    case Screen.TRANSACTION_HISTORY:
        return <TransactionHistoryScreen />;
    case Screen.ANALYTICS:
        return <AnalyticsScreen />;
    case Screen.SECURITY:
        return <SecurityScreen />;
    case Screen.PAYMENT_GATEWAY:
        return <PaymentGatewayScreen />;
    case Screen.SEND_MONEY:
    case Screen.SEND_MONEY_CONFIRM:
    case Screen.SEND_MONEY_SUCCESS:
        return <SendMoneyScreen />;
    case Screen.PAY_BILLS:
    case Screen.PAY_BILLS_CONFIRM:
    case Screen.PAY_BILLS_SUCCESS:
        return <PayBillsScreen />;
    case Screen.LOANS:
        return <LoansScreen />;
    case Screen.SAVINGS:
        return <SavingsScreen />;
    case Screen.INSURANCE:
        return <InsuranceScreen />;
    // --- NEW ADVANCED SCREEN ROUTING ---
    case Screen.QUANTUM_ADVISOR:
        return <QuantumAdvisorScreen />;
    case Screen.CRYPTO_WALLET:
        return <CryptoWalletScreen />;
    case Screen.COMMUNITY_BANKING:
        return <CommunityBankingScreen />;
    case Screen.GOALS:
        return <GoalsScreen />;
    case Screen.MERCHANT_PORTAL:
        return <MerchantPortalScreen />;
    case Screen.FINANCIAL_EDUCATION:
        return <FinancialEducationScreen />;
    // --- NEW NEXT-LEVEL SCREEN ROUTING ---
    case Screen.FUTURE_HUB:
        return <FutureHubScreen />;
    case Screen.IMPACT_INVESTING:
        return <ImpactInvestingScreen />;
    case Screen.METAVERSE_BANK:
        return <MetaverseBankScreen />;
    case Screen.FINANCIAL_GAMING:
        return <FinancialGamingScreen />;
    case Screen.BIO_FINANCE:
        return <BioFinanceScreen />;
    case Screen.BACKEND_DASHBOARD:
        return <BackendDashboardScreen />;
    default:
      return state.isAuthenticated ? <DashboardScreen /> : <LandingScreen />;
  }
};

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;