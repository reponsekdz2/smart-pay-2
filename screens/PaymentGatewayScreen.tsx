import React, { useState, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button, Card, Input } from '../components/common';
import { View, Text, StyleSheet, TouchableOpacity } from '../components/react-native';
import { MtnIcon, AirtelIcon, BankIcon, CardIcon, ArrowLeftIcon } from '../components/icons';
import { Transaction, TransactionType } from '../types';

type Step = 'select' | 'details' | 'confirm' | 'processing' | 'result';
type Provider = { id: string; name: string; icon: React.FC<any>; type: 'momo' | 'bank' | 'biller' };

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
            { id: 'equity', name: 'Equity Bank', icon: BankIcon, type: 'bank' },
            { id: 'visa_mastercard', name: 'Card Payment', icon: CardIcon, type: 'bank' },
        ],
    },
];

export const PaymentGatewayScreen = () => {
    const { state, dispatch } = useAppContext();
    const [step, setStep] = useState<Step>('select');
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
    const [formData, setFormData] = useState({ to: '', amount: '', reason: '' });
    const [error, setError] = useState('');

    const handleProviderSelect = (provider: Provider) => {
        setSelectedProvider(provider);
        setStep('details');
    };
    
    const handleDetailsSubmit = () => {
        if (!formData.to || !formData.amount) {
            setError('Please fill in all required fields.');
            return;
        }
        setError('');
        setStep('confirm');
    };

    const handleConfirm = () => {
        setStep('processing');
        setTimeout(() => {
            const amountNum = parseFloat(formData.amount);
            const newTransaction: Transaction = {
                id: `txn_${Date.now()}`,
                type: selectedProvider?.type === 'biller' ? TransactionType.BILL_PAYMENT : TransactionType.SENT,
                amount: -amountNum,
                description: `To: ${selectedProvider?.name} - ${formData.to}`,
                date: new Date().toISOString(),
                status: 'Successful',
                category: selectedProvider?.type === 'biller' ? 'Bills' : 'Transfer',
                provider: selectedProvider?.name,
            };
            dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
            if (state.user) {
                dispatch({ type: 'UPDATE_BALANCE', payload: state.user.balance - amountNum });
            }
            setStep('result');
        }, 2000);
    };
    
    const resetFlow = () => {
        setStep('select');
        setSelectedProvider(null);
        setFormData({ to: '', amount: '', reason: '' });
        setError('');
    };

    const handleBack = () => {
        if (step === 'details') setStep('select');
        else if (step === 'confirm') setStep('details');
        else dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD });
    };
    
    const getTitle = () => {
        switch (step) {
            case 'select': return 'Send & Pay';
            case 'details': return selectedProvider?.name || 'Enter Details';
            case 'confirm': return 'Confirm Payment';
            case 'processing': return 'Processing...';
            case 'result': return 'Transaction Complete';
            default: return 'Payment';
        }
    };
    
    return (
        <Container>
            <Header title={getTitle()} onBack={handleBack} />
            
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
                    <Input label="Amount (KES)" value={formData.amount} onChangeText={val => setFormData({...formData, amount: val})} type="number" />
                    <Input label="Reason (Optional)" value={formData.reason} onChangeText={val => setFormData({...formData, reason: val})} />
                    {error && <Text style={{color: AppColors.danger, marginTop: 8}}>{error}</Text>}
                    <View style={styles.buttonWrapper}>
                        <Button onPress={handleDetailsSubmit}>Continue</Button>
                    </View>
                </View>
            )}

            {step === 'confirm' && selectedProvider && (
                 <View style={styles.content}>
                    <Card>
                        <Text style={styles.confirmLabel}>You are sending</Text>
                        <Text style={styles.confirmAmount}>KES {parseFloat(formData.amount).toLocaleString()}</Text>
                        <View style={styles.detailsContainer}>
                            <View style={styles.detailRow}><Text>To Provider:</Text> <Text style={{fontWeight: 'bold'}}>{selectedProvider.name}</Text></View>
                            <View style={styles.detailRow}><Text>To Account:</Text> <Text style={{fontWeight: 'bold'}}>{formData.to}</Text></View>
                            <View style={styles.detailRow}><Text>Reason:</Text> <Text style={{fontWeight: 'bold'}}>{formData.reason || 'N/A'}</Text></View>
                            <View style={[styles.detailRow, {borderTopWidth: 1, borderColor: '#eee', paddingTop: 12, marginTop: 12}]}>
                                <Text style={{fontWeight: 'bold'}}>Total:</Text>
                                <Text style={{fontWeight: 'bold'}}>KES {parseFloat(formData.amount).toLocaleString()}</Text>
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
                            <Text style={styles.resultMessage}>Please wait a moment.</Text>
                        </>
                    ) : (
                       <>
                            <View style={styles.successIconContainer}>
                                <Text style={styles.successIcon}>✓</Text>
                            </View>
                            <Text style={styles.resultTitle}>Payment Successful!</Text>
                            <Text style={styles.resultMessage}>KES {parseFloat(formData.amount).toLocaleString()} sent to {formData.to}.</Text>
                            <View style={{width: '100%', marginTop: 32}}>
                                <Button onPress={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })}>Done</Button>
                                <Button onPress={resetFlow} variant="ghost">Make Another Payment</Button>
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
    resultMessage: { fontSize: 16, color: AppColors.textSecondary, marginTop: 8, textAlign: 'center' },
    loader: { width: 60, height: 60, borderRadius: 9999, border: '5px solid #f3f3f3', borderTopColor: AppColors.primary, animation: 'spin 1s linear infinite' },
    successIconContainer: { width: 80, height: 80, borderRadius: 9999, backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    successIcon: { fontSize: 48, color: AppColors.success },
});

const keyframes = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
const styleSheet = document.createElement("style");
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);