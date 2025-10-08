import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Screen } from './constants';

import { LoginScreen } from './screens/LoginScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { SendMoneyScreen } from './screens/SendMoneyScreen';
import { PayBillsScreen } from './screens/PayBillsScreen';
import { QrScanScreen } from './screens/QrScanScreen';
import { TransactionHistoryScreen } from './screens/TransactionHistoryScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { SecurityScreen } from './screens/SecurityScreen';
import { PaymentGatewayScreen } from './screens/PaymentGatewayScreen';
import { Button } from './components/common';

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
    case Screen.SEND_MONEY:
    case Screen.SEND_MONEY_CONFIRM:
    case Screen.SEND_MONEY_SUCCESS:
      return <SendMoneyScreen />;
    case Screen.PAY_BILLS:
    case Screen.PAY_BILLS_CONFIRM:
    case Screen.PAY_BILLS_SUCCESS:
        return <PayBillsScreen />;
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
    default:
      // If a user is logged in, default to dashboard, otherwise landing
      return state.isAuthenticated ? <DashboardScreen /> : <LandingScreen />;
  }
};

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
