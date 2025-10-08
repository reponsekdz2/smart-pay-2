
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Container, Header, BottomNav, Card, AppColors } from '../components/common';
import { StyleSheet, View, Text, ScrollView } from '../components/react-native';
import { Screen } from '../constants';
import { TransactionType } from '../types';

const ChartBar = ({ label, value, maxValue, color }: { label: string, value: number, maxValue: number, color: string }) => {
    const height = (value / maxValue) * 100;
    return (
        <View style={styles.barContainer}>
            <View style={[styles.bar, { height: `${height}%`, backgroundColor: color }]} />
            <Text style={styles.barLabel}>{label}</Text>
        </View>
    );
};

export const AnalyticsScreen = () => {
    const { state, dispatch } = useAppContext();
    const { transactions } = state;

    // FIX: Add explicit generic type to reduce to ensure correct type inference for `spendingData`.
    const spendingData = transactions
        .filter(t => t.type !== TransactionType.RECEIVED && t.type !== TransactionType.DEPOSIT && t.type !== TransactionType.LOAN_DISBURSEMENT)
        .reduce<Record<string, number>>((acc, tx) => {
            const category = tx.category || 'Other';
            acc[category] = (acc[category] || 0) + Math.abs(tx.amount);
            return acc;
        }, {});
    
    const maxSpending = Math.max(...Object.values(spendingData), 1);

    return (
        <Container>
            <Header title="Analytics" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <ScrollView style={styles.content}>
                <Card>
                    <Text style={styles.sectionTitle}>Spending by Category</Text>
                    <View style={styles.chartContainer}>
                        {Object.entries(spendingData).map(([category, amount]) => (
                            <ChartBar key={category} label={category} value={amount} maxValue={maxSpending} color={AppColors.primary} />
                        ))}
                    </View>
                </Card>

                <Card style={{ marginTop: 24 }}>
                    <Text style={styles.sectionTitle}>Cash Flow</Text>
                    <View style={styles.cashFlowContainer}>
                        <View style={styles.cashFlowItem}>
                            <Text style={styles.cashFlowLabel}>Total In</Text>
                            <Text style={[styles.cashFlowValue, { color: AppColors.success }]}>
                                + KES {transactions.filter(t => t.type === TransactionType.RECEIVED || t.type === TransactionType.DEPOSIT).reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                            </Text>
                        </View>
                        <View style={styles.cashFlowItem}>
                            <Text style={styles.cashFlowLabel}>Total Out</Text>
                            <Text style={[styles.cashFlowValue, { color: AppColors.danger }]}>
                                - KES {transactions.filter(t => t.type !== TransactionType.RECEIVED && t.type !== TransactionType.DEPOSIT).reduce((sum, t) => sum + Math.abs(t.amount), 0).toLocaleString()}
                            </Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    chartContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: 200,
        borderBottomWidth: 1,
        borderColor: '#e5e7eb',
        paddingBottom: 8,
    },
    barContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-end',
    },
    bar: {
        width: 30,
        borderRadius: 4,
    },
    barLabel: {
        marginTop: 8,
        fontSize: 12,
        color: AppColors.textSecondary,
    },
    cashFlowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cashFlowItem: {
        alignItems: 'center',
    },
    cashFlowLabel: {
        color: AppColors.textSecondary,
    },
    cashFlowValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 4,
    },
});