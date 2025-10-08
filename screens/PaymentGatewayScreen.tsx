import React, { useState, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button, Card, Input } from '../components/common';
import { View, Text, StyleSheet, TouchableOpacity } from '../components/react-native';
import { MtnIcon, AirtelIcon, BankIcon, CardIcon } from '../components/icons';
// FIX: Import TransactionStatus from types
import { Transaction, TransactionType, OfflineTransaction, TransactionStatus, TransactionCategory } from '../types';

type Step = 'select' | 'details' | 'routing' | 'confirm' | 'processing' | 'result';
type ProcessingSubStep = 'fraud_check' | 'provider_comm' | 'done';
type Provider = { id: string; name: string; icon: React.FC<any>; type: 'momo' | 'bank' | 'biller' };
type RouteInfo = { provider: string, cost: number, speed: string, successRate: number };

const providers: { title: string; items: Provider[] }[] = [
    {
        title: 'Mobile Money',
        items: [
            { id: 'mtn', name: 'MTN Mobile Money', icon: MtnIcon, type: 'momo' },
            { id: 'airtel', name: 'Airtel Money', icon: AirtelIcon, type: 'momo' },
        ],
    },
    {
        title: 'Banks & Cards',
        items: [
            { id: 'bk', name: 'Bank of Kigali', icon: BankIcon, type: 'bank' },
            { id: 'visa_mastercard', name: 'Card Payment', icon: CardIcon, type: 'bank' },
        ],
    },
];

export const PaymentGatewayScreen = () => {
    const { state, dispatch } = useAppContext();
    const { isOnline, user } = state;
    const [step, setStep] = useState<Step>('select');
    const [processingStep, setProcessingStep] = useState<ProcessingSubStep>('fraud_check');
    const [result, setResult] = useState<{success: boolean, message: string} | null>(null);
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
    const [smartRoute, setSmartRoute] = useState<RouteInfo | null>(null);
    const [formData, setFormData] = useState({ to: '', amount: '', reason: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const { tempAuthData } = state;
        if (tempAuthData && tempAuthData.recipient && tempAuthData.amount) {
            setFormData({
                to: tempAuthData.recipient,
                amount: String(tempAuthData.amount),
                reason: tempAuthData.reason || '',
            });
            setSelectedProvider(providers[0].items[0]); 
            setStep('details');
            dispatch({ type: 'SET_TEMP_AUTH_DATA', payload: {} });
        }
    }, []);
    
    useEffect(() => {
        if (step === 'routing') {
            const timer1 = setTimeout(() => {
                const routes: RouteInfo[] = [
                    { provider: 'MTN', cost: 5, speed: 'Fast', successRate: 99.2 },
                    { provider: 'Airtel', cost: 3, speed: 'Normal', successRate: 97.8 },
                ];
                // Simple cost-based optimization
                const bestRoute = routes.reduce((best, current) => current.cost < best.cost ? current : best);
                setSmartRoute(bestRoute);
                
                const timer2 = setTimeout(() => {
                    setStep('confirm');
                }, 2000);
                return () => clearTimeout(timer2);
            }, 1500);
            return () => clearTimeout(timer1);
        }
    }, [step]);

    const handleProviderSelect = (provider: Provider) => {
        setSelectedProvider(provider);
        setStep('details');
    };
    
    const handleDetailsSubmit = () => {
        const amountNum = parseFloat(formData.amount);
        if (!formData.to || !formData.amount || isNaN(amountNum) || amountNum <= 0) {
            setError('Please fill in all required fields with valid values.');
            return;
        }
        // FIX: Use `dailyTransactionLimit` from user object.
        if (user && amountNum > user.dailyTransactionLimit) {
            // FIX: Use `dailyTransactionLimit` from user object.
            setError(`Amount exceeds your daily limit of ${user.dailyTransactionLimit.toLocaleString()} RWF.`);
            return;
        }
        setError('');
        setStep('routing');
    };

    const processPayment = () => {
        setStep('processing');
        setProcessingStep('fraud_check');
        setResult(null);

        const amountNum = parseFloat(formData.amount);
        const fromWallet = state.wallets.find(w => w.user_id === user?.id);

        if (!fromWallet) {
            alert('Could not find your wallet.');
            setStep('result');
            setResult({ success: false, message: 'User wallet not found.' });
            return;
        }
        
        // --- BACKEND SIMULATION ---
        setTimeout(() => {
            // 1. Fraud Check Simulation
            const isFraudulent = Math.random() < 0.1; // 10% chance of being flagged as fraud
            if (isFraudulent) {
                setResult({ success: false, message: 'Transaction flagged for review by our security system and was cancelled.' });
                setStep('result');
                dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Payment failed security check.', type: 'error' } });
                return;
            }
            
            setProcessingStep('provider_comm');

            // 2. Provider Communication Simulation
            setTimeout(() => {
                const providerName = smartRoute ? smartRoute.provider : selectedProvider?.name;
                // FIX: Create a valid transaction object with correct enum types and all required fields.
                const newTransaction: Transaction = {
                    id: `txn_${Date.now()}`,
                    reference: `PAY_${Date.now()}`,
                    from_wallet_id: fromWallet.id,
                    to_wallet_id: 'external_wallet',
                    from_user_id: user!.id,
                    to_user_id: 'external',
                    amount: amountNum,
                    fee: smartRoute?.cost || 0,
                    tax: 0,
                    total_amount: amountNum + (smartRoute?.cost || 0),
                    currency: 'RWF',
                    type: selectedProvider?.type === 'biller' ? TransactionType.BILL_PAYMENT : TransactionType.SENT,
                    description: `To: ${providerName} - ${formData.to}`,
                    status: isOnline ? TransactionStatus.COMPLETED : TransactionStatus.PENDING,
                    category: selectedProvider?.type === 'biller' ? TransactionCategory.BILLS : TransactionCategory.TRANSFER,
                    provider: providerName as any,
                    risk_score: 0.3,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                if (isOnline) {
                    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
                    // FIX: Correctly dispatch UPDATE_BALANCE with walletId and newBalance.
                    if (state.user) {
                        dispatch({ type: 'UPDATE_BALANCE', payload: { walletId: fromWallet.id, newBalance: fromWallet.balance - newTransaction.total_amount } });
                    }
                    dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Payment successful!', type: 'success' } });
                    setResult({ success: true, message: `RWF ${amountNum.toLocaleString()} sent to ${formData.to}.` });
                } else {
                    const offlineTx: OfflineTransaction = { id: newTransaction.id, payload: newTransaction, timestamp: Date.now() };
                    dispatch({ type: 'QUEUE_TRANSACTION', payload: offlineTx });
                    dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Transaction queued for offline.', type: 'info' } });
                    setResult({ success: true, message: `Transaction will be sent when you're back online.` });
                }
                setStep('result');

            }, 2000); // Simulate API call to provider

        }, 2000); // Simulate fraud check
    };
    
    const handleConfirm = () => {
        const amountNum = parseFloat(formData.amount);
        // --- ZERO-TRUST SECURITY SIMULATION ---
        if (amountNum > 10000 && Math.random() < 0.3) { // 30% chance for large payments
            // FIX: Use `pin_hash` instead of non-existent `pin`.
            const pin = prompt("Security Challenge: Unusual activity detected. Please re-enter your PIN to continue.");
            if (pin === user?.pin_hash) {
                dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Step-Up Authentication Successful.', type: 'success' } });
                processPayment();
            } else {
                dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Step-Up Authentication Failed.', type: 'error' } });
                alert("Incorrect PIN. Transaction cancelled.");
            }
        } else {
            processPayment();
        }
    };
    
    const handleBack = () => {
        if (step === 'details') setStep('select');
        else if (step === 'confirm') setStep('details');
        else if (step === 'routing') setStep('details');
        else dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD });
    };
    
    const getTitle = () => {
        switch (step) {
            case 'select': return 'Send & Pay';
            case 'details': return selectedProvider?.name || 'Enter Details';
            case 'routing': return 'Optimizing Route...';
            case 'confirm': return 'Confirm Payment';
            case 'processing': return 'Processing...';
            case 'result': return result?.success ? 'Transaction Complete' : 'Transaction Failed';
            default: return 'Payment';
        }
    };
    
    const getProcessingMessage = () => {
        switch (processingStep) {
            case 'fraud_check': return 'Running fraud analysis...';
            case 'provider_comm': return 'Communicating with payment provider...';
            default: return 'Processing...';
        }
    }
    
    return (
        <Container>
            <Header title={getTitle()} onBack={step === 'result' ? undefined : handleBack} />
            
            {step === 'select' && (
                <View style={styles.content}>
                    {providers.map(group => (
                        <View key={group.title} style={styles.providerGroup}>
                            <Text style={styles.groupTitle}>{group.title}</Text>
                            {group.items.map(provider => (
                                <TouchableOpacity key={provider.id} style={styles.providerButton} onPress={() => handleProviderSelect(provider)}>
                                    <provider.icon />
                                    <Text style={styles.providerName}>{provider.name}</Text>
                                    <Text style={styles.arrow}>›</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            )}

            {step === 'details' && selectedProvider && (
                <View style={styles.content}>
                    <View style={{alignItems: 'center', marginBottom: 24}}>
                        <selectedProvider.icon width={64} height={64} />
                    </View>
                    <Input label={selectedProvider.type === 'momo' ? "Recipient Phone" : "Account Number"} value={formData.to} onChangeText={val => setFormData({...formData, to: val})} type="tel" />
                    <Input label="Amount (RWF)" value={formData.amount} onChangeText={val => setFormData({...formData, amount: val})} type="number" />
                    <Input label="Reason (Optional)" value={formData.reason} onChangeText={val => setFormData({...formData, reason: val})} />
                    {error && <Text style={{color: AppColors.danger, marginTop: 8, textAlign: 'center'}}>{error}</Text>}
                    <View style={styles.buttonWrapper}>
                        <Button onPress={handleDetailsSubmit}>Continue</Button>
                    </View>
                </View>
            )}

            {step === 'routing' && (
                 <View style={styles.centeredContent}>
                     <View style={styles.loader} />
                     <Text style={styles.resultTitle}>Finding Optimal Route...</Text>
                     {smartRoute ? (
                        <View style={{marginTop: 16, alignItems: 'center'}}>
                            <Text style={styles.resultMessage}>Best route found via {smartRoute.provider}!</Text>
                            <Text style={{color: AppColors.success}}>Lowest Cost: {smartRoute.cost} RWF</Text>
                        </View>
                     ) : (
                         <Text style={styles.resultMessage}>Analyzing transaction costs, speed, and reliability...</Text>
                     )}
                 </View>
            )}

            {step === 'confirm' && selectedProvider && (
                 <View style={styles.content}>
                    <Card>
                        <Text style={styles.confirmLabel}>You are sending</Text>
                        <Text style={styles.confirmAmount}>RWF {parseFloat(formData.amount).toLocaleString()}</Text>
                        <View style={styles.detailsContainer}>
                            <View style={styles.detailRow}><Text>To Provider:</Text> <Text style={{fontWeight: 'bold'}}>{smartRoute ? smartRoute.provider : selectedProvider.name}</Text></View>
                            <View style={styles.detailRow}><Text>To Account:</Text> <Text style={{fontWeight: 'bold'}}>{formData.to}</Text></View>
                            <View style={styles.detailRow}><Text>Reason:</Text> <Text style={{fontWeight: 'bold'}}>{formData.reason || 'N/A'}</Text></View>
                            {smartRoute && <View style={styles.detailRow}><Text>Fee:</Text> <Text style={{fontWeight: 'bold', color: AppColors.success}}>{smartRoute.cost} RWF (Optimized)</Text></View>}
                            <View style={[styles.detailRow, {borderTopWidth: 1, borderColor: '#eee', paddingTop: 12, marginTop: 12}]}>
                                <Text style={{fontWeight: 'bold'}}>Total:</Text>
                                <Text style={{fontWeight: 'bold'}}>RWF {(parseFloat(formData.amount) + (smartRoute?.cost || 0)).toLocaleString()}</Text>
                            </View>
                        </View>
                    </Card>
                    <View style={styles.buttonWrapper}>
                        <Button onPress={handleConfirm}>Confirm & Pay</Button>
                    </View>
                </View>
            )}
            
            {(step === 'processing' || step === 'result') && (
                <View style={styles.centeredContent}>
                    {step === 'processing' ? (
                        <>
                            <View style={styles.loader} />
                            <Text style={styles.resultTitle}>Processing Payment...</Text>
                            <Text style={styles.resultMessage}>{getProcessingMessage()}</Text>
                        </>
                    ) : (
                       <>
                            <View style={[styles.iconContainer, result?.success ? styles.successIconContainer : styles.failIconContainer]}>
                                <Text style={styles.resultIcon}>{result?.success ? '✓' : '✕'}</Text>
                            </View>
                            <Text style={styles.resultTitle}>{result?.success ? 'Payment Successful!' : 'Payment Failed'}</Text>
                            <Text style={styles.resultMessage}>{result?.message}</Text>
                            <View style={{width: '100%', marginTop: 32}}>
                                <Button onPress={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })}>Done</Button>
                            </View>
                       </>
                    )}
                </View>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    centeredContent: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
    providerGroup: { marginBottom: 24 },
    groupTitle: { fontSize: 16, fontWeight: 'bold', color: AppColors.textSecondary, marginBottom: 8 },
    providerButton: { display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: AppColors.surface, padding: 16, borderRadius: 12, marginBottom: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
    providerName: { flex: 1, marginLeft: 16, fontSize: 16, fontWeight: '500' },
    arrow: { fontSize: 20, color: AppColors.textSecondary },
    buttonWrapper: { marginTop: 'auto', paddingTop: 16 },
    confirmLabel: { textAlign: 'center', color: AppColors.textSecondary, marginBottom: 8 },
    confirmAmount: { textAlign: 'center', fontSize: 36, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 24 },
    detailsContainer: { display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 },
    detailRow: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    resultTitle: { fontSize: 24, fontWeight: 'bold', color: AppColors.textPrimary, marginTop: 16, textAlign: 'center' },
    resultMessage: { fontSize: 16, color: AppColors.textSecondary, marginTop: 8, textAlign: 'center', maxWidth: 300 },
    loader: { width: 60, height: 60, borderRadius: 9999, border: '5px solid #f3f3f3', borderTopColor: AppColors.primary, animation: 'spin 1s linear infinite' },
    iconContainer: { width: 80, height: 80, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    successIconContainer: { backgroundColor: '#D1FAE5' },
    failIconContainer: { backgroundColor: '#FEE2E2' },
    resultIcon: { fontSize: 48, color: 'white' },
    successIcon: { color: AppColors.success },
    failIcon: { color: AppColors.danger },
});

const keyframes = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
const styleSheet = document.createElement("style");
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);