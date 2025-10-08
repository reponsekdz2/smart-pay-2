import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Button, Container, Header, Input, Card, AppColors } from '../components/common';
import { StyleSheet, View, Text, TouchableOpacity, Picker } from '../components/react-native';
// FIX: Import missing types
import { Transaction, TransactionType, TransactionStatus, TransactionCategory } from '../types';

const billers = [
    { id: '1', name: 'KPLC Postpaid' },
    { id: '2', name: 'Nairobi Water' },
    { id: '3', name: 'Zuku Internet' },
    { id: '4', name: 'GoTV' },
];

const PayBillsForm = () => {
    const { dispatch } = useAppContext();
    const [biller, setBiller] = useState('');
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState('');

    const handleContinue = () => {
        dispatch({ type: 'SET_TEMP_AUTH_DATA', payload: { biller: billers.find(b=>b.id === biller)?.name, account, amount: parseFloat(amount) } });
        dispatch({ type: 'NAVIGATE', payload: Screen.PAY_BILLS_CONFIRM });
    };

    return (
        <Container>
            <Header title="Pay Bill" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <View style={styles.content}>
                <View style={styles.formContainer}>
                    <View>
                        <Text style={styles.label}>Select Biller</Text>
                        <Picker selectedValue={biller} onValueChange={setBiller} style={styles.picker}>
                            <Picker.Item label="-- Choose a biller --" value="" />
                            {billers.map(b => <Picker.Item key={b.id} label={b.name} value={b.id} />)}
                        </Picker>
                    </View>
                    <Input label="Account Number" value={account} onChangeText={setAccount} placeholder="e.g. 123456-01" />
                    <Input label="Amount (KES)" type="number" value={amount} onChangeText={setAmount} placeholder="1500" />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button onPress={handleContinue} disabled={!biller || !account || !amount}>Continue</Button>
                </View>
            </View>
        </Container>
    );
};

const PayBillsConfirm = () => {
    const { state, dispatch } = useAppContext();
    const { biller, account, amount } = state.tempAuthData;
    const { user, wallets } = state;

    if (!user) return null;

    const fee = 10; // Mock fee
    const total = amount + fee;

    const handleConfirm = () => {
        const fromWallet = wallets.find(w => w.user_id === user.id);
        if (!fromWallet) {
            alert('Could not find your wallet.');
            return;
        }
        // FIX: Create a valid transaction object with correct enum types and all required fields.
        const newTransaction: Transaction = {
            id: `txn_${Date.now()}`,
            reference: `BILL_${Date.now()}`,
            from_wallet_id: fromWallet.id,
            to_wallet_id: 'biller_wallet',
            from_user_id: user.id,
            to_user_id: 'biller',
            amount: amount,
            fee: fee,
            tax: 0,
            total_amount: total,
            currency: 'RWF',
            type: TransactionType.BILL_PAYMENT,
            description: `Payment to ${biller}`,
            status: TransactionStatus.COMPLETED,
            category: TransactionCategory.BILLS,
            provider: 'INTERNAL',
            risk_score: 0.1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
        // FIX: Correctly dispatch UPDATE_BALANCE with walletId and newBalance from the wallet.
        dispatch({ type: 'UPDATE_BALANCE', payload: { walletId: fromWallet.id, newBalance: fromWallet.balance - total } });
        dispatch({ type: 'NAVIGATE', payload: Screen.PAY_BILLS_SUCCESS });
    };

    return (
        <Container>
            <Header title="Confirm Payment" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.PAY_BILLS })} />
            <View style={styles.content}>
                <Card>
                    <Text style={styles.confirmLabel}>You are paying</Text>
                    <Text style={styles.confirmAmount}>KES {amount.toLocaleString()}</Text>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>To:</Text> <Text style={styles.detailValue}>{biller}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Account:</Text> <Text style={styles.detailValue}>{account}</Text></View>
                        <View style={[styles.detailRow, styles.detailRowBorder]}><Text style={styles.detailLabel}>Fee:</Text> <Text style={styles.detailValue}>KES {fee.toLocaleString()}</Text></View>
                        <View style={styles.detailRowTotal}><Text style={styles.detailLabelTotal}>Total:</Text> <Text style={styles.detailValueTotal}>KES {total.toLocaleString()}</Text></View>
                    </View>
                </Card>
                <View style={styles.buttonWrapper}>
                    <Button onPress={handleConfirm}>Confirm & Pay</Button>
                </View>
            </View>
        </Container>
    );
};

const PayBillsSuccess = () => {
    const { state, dispatch } = useAppContext();
    const { amount, biller } = state.tempAuthData;
    return (
      <Container>
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Text style={styles.successIcon}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Payment Sent!</Text>
          <Text style={styles.successMessage}>Your payment of <Text style={styles.bold}>KES {amount.toLocaleString()}</Text> to <Text style={styles.bold}>{biller}</Text> is being processed.</Text>
          <View style={styles.successButtonContainer}>
            <Button onPress={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })}>Done</Button>
            <Button onPress={() => {}} variant="ghost">Save Biller</Button>
          </View>
        </View>
      </Container>
    );
};


export const PayBillsScreen = () => {
    const { state } = useAppContext();

    switch(state.currentScreen) {
        case Screen.PAY_BILLS:
            return <PayBillsForm />;
        case Screen.PAY_BILLS_CONFIRM:
            return <PayBillsConfirm />;
        case Screen.PAY_BILLS_SUCCESS:
            return <PayBillsSuccess />;
        default:
            return <PayBillsForm />;
    }
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24, display: 'flex', flexDirection: 'column' },
    formContainer: { display: 'flex', flexDirection: 'column', gap: 16 },
    buttonWrapper: { marginTop: 'auto', width: '100%', paddingVertical: 16 },
    label: { display: 'block', fontSize: 14, fontWeight: '500', color: AppColors.textSecondary, marginBottom: 4 },
    picker: { width: '100%', padding: 12, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, backgroundColor: 'white' },
    confirmLabel: { textAlign: 'center', color: AppColors.textSecondary, marginBottom: 8 },
    confirmAmount: { textAlign: 'center', fontSize: 36, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 24 },
    detailsContainer: { display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 },
    detailRow: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    detailRowBorder: { borderTopWidth: 1, borderColor: '#e5e7eb', paddingTop: 12, marginTop: 12 },
    detailRowTotal: { fontWeight: 'bold', fontSize: 16 },
    detailLabel: { color: AppColors.textSecondary },
    detailValue: { fontWeight: '600', color: AppColors.textPrimary },
    detailLabelTotal: { color: AppColors.textPrimary },
    detailValueTotal: { color: AppColors.textPrimary },
    successContainer: { flex: 1, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
    successIconContainer: { backgroundColor: '#D1FAE5', borderRadius: 9999, padding: 16, marginBottom: 24, width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    successIcon: { fontSize: 48, color: AppColors.success },
    successTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: AppColors.textPrimary },
    successMessage: { color: AppColors.textSecondary, marginBottom: 32 },
    successButtonContainer: { width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 8 },
    bold: { fontWeight: 'bold', color: AppColors.textPrimary },
});