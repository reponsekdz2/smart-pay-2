import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, Button, AppColors, ModernInput } from '../components/common';
import { View, Text, StyleSheet } from '../components/react-native';
import { Transaction, TransactionStatus, TransactionType } from '../types';
import { UserIcon } from '../components/icons';

export const SendMoneyScreen = () => {
    const { state, dispatch } = useAppContext();
    const { user, wallets } = state;
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');

    const handleSend = () => {
        const numericAmount = parseFloat(amount);
        const userWallet = wallets.find(w => w.user_id === user?.id);
        const recipientUser = state.users.find(u => u.phone === recipient || u.email === recipient);
        const recipientWallet = recipientUser ? wallets.find(w => w.user_id === recipientUser.id) : null;


        if (!userWallet || !recipientWallet || isNaN(numericAmount) || numericAmount <= 0) {
             dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Invalid recipient or amount.', type: 'error' } });
            return;
        }

        if(userWallet.balance < numericAmount) {
            dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Insufficient balance.', type: 'error' } });
            return;
        }


        const newTransaction: Transaction = {
            id: `txn_${Date.now()}`,
            reference: `SEND_${Date.now()}`,
            from_wallet_id: userWallet.id,
            to_wallet_id: recipientWallet.id,
            from_user_id: userWallet.user_id,
            to_user_id: recipientWallet.user_id,
            amount: -numericAmount,
            fee: 50,
            tax: 10,
            total_amount: -(numericAmount + 60),
            currency: 'RWF',
            type: TransactionType.SENT,
            description: reason || `Transfer to ${recipientUser.first_name}`,
            status: TransactionStatus.COMPLETED,
            provider: 'INTERNAL',
            risk_score: 0.2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
        // Only update balance if online, otherwise it's handled by sync
        if(state.isOnline) {
             dispatch({ type: 'UPDATE_BALANCE', payload: { walletId: userWallet.id, newBalance: userWallet.balance - numericAmount - 60 } });
        }
       
        dispatch({ type: 'ADD_NOTIFICATION', payload: { message: `Successfully sent ${numericAmount} RWF to ${recipientUser?.first_name}!`, type: 'success' } });
        dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD });
    };

    return (
        <Container>
            <Header title="Send Money" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <View style={styles.content}>
                <ModernInput 
                    label="Recipient (Phone or Email)" 
                    value={recipient} 
                    onChangeText={setRecipient}
                    icon={<UserIcon />}
                />
                <ModernInput 
                    label="Amount (RWF)" 
                    value={amount} 
                    onChangeText={setAmount} 
                    keyboardType="numeric"
                />
                <ModernInput 
                    label="Reason (Optional)" 
                    value={reason} 
                    onChangeText={setReason} 
                />
                <Button onPress={handleSend} style={{marginTop: 16}}>Send Money</Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 24,
    },
});