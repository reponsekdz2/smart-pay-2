import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, Button, Card, AppColors, BottomNav } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { SavingsGoal } from '../types';

const SavingsPot = ({ name, current, target }: { name: string, current: number, target: number }) => {
    const progress = (current / target) * 100;
    return (
        <Card style={styles.potCard}>
            <Text style={styles.potName}>{name}</Text>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.potAmounts}>{current.toLocaleString()} / {target.toLocaleString()} RWF</Text>
        </Card>
    );
};

export const SavingsScreen = () => {
    const { state, dispatch } = useAppContext();
    const { savingsGoals } = state;

    const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.current_amount, 0);

    return (
        <Container>
            <Header title="Savings" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <ScrollView style={styles.content}>
                <Card style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Total Savings</Text>
                    <Text style={styles.summaryAmount}>KES {totalSaved.toLocaleString()}</Text>
                    <Text style={styles.interestText}>Est. Annual Interest: KES {(totalSaved * 0.045).toLocaleString()}</Text>
                </Card>

                <View style={styles.actions}>
                    <Button onPress={() => alert('Creating a new savings pot...')}>Create New Pot</Button>
                </View>

                <Text style={styles.sectionTitle}>Your Savings Pots</Text>
                {savingsGoals.map(goal => (
                    <SavingsPot key={goal.id} name={goal.name} current={goal.current_amount} target={goal.target_amount} />
                ))}

            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    summaryCard: {
        backgroundColor: AppColors.cardBackground,
        alignItems: 'center',
    },
    summaryLabel: {
        color: AppColors.textSecondary,
    },
    summaryAmount: {
        color: AppColors.primary,
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 8,
    },
    interestText: {
        color: AppColors.textSecondary,
        fontSize: 12,
    },
    actions: {
        marginTop: 24,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppColors.textPrimary,
        marginBottom: 16,
    },
    potCard: {
        marginBottom: 16,
    },
    potName: {
        fontSize: 16,
        fontWeight: '600',
    },
    progressContainer: {
        width: '100%',
        height: 8,
        backgroundColor: AppColors.cardBorder,
        borderRadius: 9999,
        marginTop: 8,
        marginBottom: 8,
    },
    progressBar: {
        height: '100%',
        backgroundColor: AppColors.success,
        borderRadius: 9999,
    },
    potAmounts: {
        textAlign: 'right',
        fontSize: 12,
        color: AppColors.textSecondary,
    },
});