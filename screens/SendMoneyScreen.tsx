import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Button, Container, Header, Input, Card, AppColors } from '../components/common';
import { StyleSheet, View, Text, TouchableOpacity } from '../components/react-native';
// FIX: Import missing types
import { Transaction, TransactionType, TransactionStatus, TransactionCategory } from '../types';

const SendMoneyForm = () => {
    const { dispatch } = useAppContext();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');

    const handleContinue = () => {
        dispatch({ type: 'SET_TEMP_AUTH_DATA', payload: { recipient, amount: parseFloat(amount), reason } });
        dispatch({ type: 'NAVIGATE', payload: Screen.SEND_MONEY_CONFIRM });
    };

    return (
        <Container>
            <Header title="Send Money" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <View style={styles.content}>
                <View style={styles.formContainer}>
                    <Input label="Recipient Phone Number" type="tel" value={recipient} onChangeText={setRecipient} placeholder="0712345678" />
                    <Input label="Amount (KES)" type="number" value={amount} onChangeText={setAmount} placeholder="1000" />
                    <Input label="Reason (Optional)" value={reason} onChangeText={setReason} placeholder="Lunch" />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button onPress={handleContinue} disabled={!recipient || !amount}>Continue</Button>
                </View>
            </View>
        </Container>
    );
};

const SendMoneyConfirm = () => {
    const { state, dispatch } = useAppContext();
    const { recipient, amount, reason } = state.tempAuthData;
    const { user, wallets } = state;

    if (!user) return null;

    const fee = 5; // Mock fee
    const total = amount + fee;

    const handleConfirm = () => {
        const fromWallet = wallets.find(w => w.user_id === user.id);
        const toUser = state.users.find(u => u.phone === recipient);
        const toWallet = toUser ? wallets.find(w => w.user_id === toUser.id) : null;

        if (!fromWallet) {
            alert("Could not find your wallet.");
            return;
        }

        // FIX: Create a valid transaction object with correct enum types and all required fields.
        const newTransaction: Transaction = {
            id: `txn_${Date.now()}`,
            reference: `SEND_${Date.now()}`,
            from_wallet_id: fromWallet.id,
            to_wallet_id: toWallet?.id || 'external',
            from_user_id: user.id,
            to_user_id: toUser?.id || 'external',
            amount: amount,
            fee: fee,
            tax: 0,
            total_amount: total,
            currency: 'RWF',
            type: TransactionType.SENT,
            description: `To: ${recipient}`,
            status: TransactionStatus.COMPLETED,
            category: TransactionCategory.TRANSFER,
            provider: 'INTERNAL',
            risk_score: 0.2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
        // FIX: Correctly dispatch UPDATE_BALANCE with walletId and newBalance from the wallet.
        dispatch({ type: 'UPDATE_BALANCE', payload: { walletId: fromWallet.id, newBalance: fromWallet.balance - total } });
        dispatch({ type: 'NAVIGATE', payload: Screen.SEND_MONEY_SUCCESS });
    };

    return (
        <Container>
            <Header title="Confirm Transaction" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.SEND_MONEY })} />
            <View style={styles.content}>
                <Card>
                    <Text style={styles.confirmLabel}>You are sending</Text>
                    <Text style={styles.confirmAmount}>KES {amount.toLocaleString()}</Text>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>To:</Text> <Text style={styles.detailValue}>{recipient}</Text></View>
                        <View style={styles.detailRow}><Text style={styles.detailLabel}>Reason:</Text> <Text style={styles.detailValue}>{reason || 'N/A'}</Text></View>
                        <View style={[styles.detailRow, styles.detailRowBorder]}><Text style={styles.detailLabel}>Fee:</Text> <Text style={styles.detailValue}>KES {fee.toLocaleString()}</Text></View>
                        <View style={styles.detailRowTotal}><Text style={styles.detailLabelTotal}>Total:</Text> <Text style={styles.detailValueTotal}>KES {total.toLocaleString()}</Text></View>
                    </View>
                </Card>
                <View style={styles.buttonWrapper}>
                    <Button onPress={handleConfirm}>Confirm & Send</Button>
                </View>
            </View>
        </Container>
    );
};

const SendMoneySuccess = () => {
    const { state, dispatch } = useAppContext();
    const { amount, recipient } = state.tempAuthData;
    return (
      <Container>
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Success!</Text>
          <Text style={styles.successMessage}>You have successfully sent <Text style={styles.bold}>KES {amount.toLocaleString()}</Text> to <Text style={styles.bold}>{recipient}</Text>.</Text>
          <View style={styles.successButtonContainer}>
            <Button onPress={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })}>Done</Button>
            <Button onPress={() => {}} variant="ghost">Share Receipt</Button>
          </View>
        </View>
      </Container>
    );
};

export const SendMoneyScreen = () => {
    const { state } = useAppContext();

    switch(state.currentScreen) {
        case Screen.SEND_MONEY:
            return <SendMoneyForm />;
        case Screen.SEND_MONEY_CONFIRM:
            return <SendMoneyConfirm />;
        case Screen.SEND_MONEY_SUCCESS:
            return <SendMoneySuccess />;
        default:
            return <SendMoneyForm />;
    }
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24, display: 'flex', flexDirection: 'column' },
    formContainer: { display: 'flex', flexDirection: 'column', gap: 16 },
    buttonWrapper: { marginTop: 'auto', width: '100%', paddingVertical: 16 },
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