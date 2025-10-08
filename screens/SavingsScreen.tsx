import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, Button, Card, AppColors, Input } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from 'components/react-native';
import { Transaction, TransactionType } from '../types';

const SavingsGauge = ({ balance, goal }: { balance: number, goal: number }) => {
    const size = 200;
    const strokeWidth = 20;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(balance / goal, 1);
    const strokeDashoffset = circumference * (1 - progress);

    return (
        // FIX: Replace non-standard 'marginVertical' with 'marginTop' and 'marginBottom' for web compatibility.
        <View style={{ width: size, height: size, position: 'relative', marginTop: 24, marginBottom: 24 }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    stroke={AppColors.success}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s' }}
                />
            </svg>
            <View style={styles.gaugeTextContainer}>
                <Text style={styles.gaugeBalance}>KES {balance.toLocaleString()}</Text>
                <Text style={styles.gaugeGoal}>of KES {goal.toLocaleString()}</Text>
            </View>
        </View>
    );
};

export const SavingsScreen = () => {
    const { state, dispatch } = useAppContext();
    const { user, savings } = state;
    const [amount, setAmount] = useState('');
    const [isDepositing, setIsDepositing] = useState(true);

    if (!user) return null;
    
    const handleTransaction = () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        if (isDepositing) {
            if (user.balance < numAmount) {
                alert("Insufficient balance.");
                return;
            }
            dispatch({ type: 'UPDATE_SAVINGS', payload: { balance: savings.balance + numAmount } });
            dispatch({ type: 'UPDATE_BALANCE', payload: user.balance - numAmount });
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: {
                    id: `txn_${Date.now()}`,
                    type: TransactionType.SAVINGS_DEPOSIT,
                    amount: -numAmount,
                    description: 'Deposit to savings',
                    date: new Date().toISOString(),
                    status: 'Successful',
                    category: 'Savings',
                },
            });
        } else {
            if (savings.balance < numAmount) {
                alert("Insufficient savings balance.");
                return;
            }
            dispatch({ type: 'UPDATE_SAVINGS', payload: { balance: savings.balance - numAmount } });
            dispatch({ type: 'UPDATE_BALANCE', payload: user.balance + numAmount });
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: {
                    id: `txn_${Date.now()}`,
                    type: TransactionType.SAVINGS_WITHDRAWAL,
                    amount: numAmount,
                    description: 'Withdrawal from savings',
                    date: new Date().toISOString(),
                    status: 'Successful',
                    category: 'Savings',
                },
            });
        }
        setAmount('');
    };

    return (
        <Container>
            <Header title="Savings" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <ScrollView style={styles.content}>
                <Card style={{alignItems: 'center'}}>
                    <Text style={styles.sectionTitle}>Your Savings Goal</Text>
                    <SavingsGauge balance={savings.balance} goal={savings.goal} />
                    <Text style={styles.interestText}>Interest Earned: KES {savings.interestEarned.toLocaleString()}</Text>
                </Card>

                <Card style={{marginTop: 24}}>
                    <Text style={styles.sectionTitle}>Manage Savings</Text>
                     <View style={styles.toggleButtons}>
                        <Button variant={isDepositing ? 'primary' : 'secondary'} onPress={() => setIsDepositing(true)} style={styles.toggleButton}>Deposit</Button>
                        <Button variant={!isDepositing ? 'primary' : 'secondary'} onPress={() => setIsDepositing(false)} style={styles.toggleButton}>Withdraw</Button>
                    </View>
                    <Input 
                        label={`Amount to ${isDepositing ? 'Deposit' : 'Withdraw'}`}
                        type="number"
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="e.g. 5000"
                    />
                    <Button onPress={handleTransaction} style={{marginTop: 16}}>
                        {isDepositing ? 'Deposit Funds' : 'Withdraw Funds'}
                    </Button>
                </Card>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16, textAlign: 'center' },
    gaugeTextContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    gaugeBalance: { fontSize: 28, fontWeight: 'bold', color: AppColors.textPrimary },
    gaugeGoal: { color: AppColors.textSecondary },
    interestText: { marginTop: 16, color: AppColors.success, fontWeight: '500' },
    toggleButtons: { display: 'flex', flexDirection: 'row', marginBottom: 16, gap: 8 },
    toggleButton: { flex: 1 },
});