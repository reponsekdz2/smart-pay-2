import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Container, Header, BottomNav, Card, AppColors } from '../components/common';
import { StyleSheet, View, Text, ScrollView } from '../components/react-native';
import { Transaction, TransactionType } from '../types';

const ChartBar = ({ label, value, maxValue, color }: { label: string, value: number, maxValue: number, color: string }) => {
    const height = maxValue > 0 ? (value / maxValue) * 150 : 0;
    return (
        <View style={styles.chartBarContainer}>
            <View style={styles.chartBarOuter}>
                <View style={[styles.chartBarInner, { height: `${height}px`, backgroundColor: color }]} />
            </View>
            <Text style={styles.chartBarLabel}>{label}</Text>
        </View>
    );
};

const CategorySpend = ({ category, amount, percentage }: { category: string, amount: number, percentage: number }) => {
    return (
        <View style={styles.categoryContainer}>
            <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.categoryAmount}>KES {amount.toLocaleString()}</Text>
            </View>
            <View style={styles.categoryProgressBar}>
                <View style={[styles.categoryProgress, { width: `${percentage}%` }]} />
            </View>
        </View>
    );
};

export const AnalyticsScreen = () => {
    const { state } = useAppContext();
    const { transactions } = state;

    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
    const categories = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => {
            const category = t.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + Math.abs(t.amount);
            return acc;
        }, {} as Record<string, number>);
    
    const sortedCategories = Object.entries(categories).sort(([, a], [, b]) => b - a);
    const totalExpenses = expenses;

    const maxValue = Math.max(income, expenses, 1);

    return (
        <Container>
            <Header title="Financial Analytics" />
            <ScrollView style={styles.main}>
                <Card>
                    <Text style={styles.sectionTitle}>Income vs Expense</Text>
                    <View style={styles.chartContainer}>
                        <ChartBar label="Income" value={income} maxValue={maxValue} color={AppColors.success} />
                        <ChartBar label="Expense" value={expenses} maxValue={maxValue} color={AppColors.danger} />
                    </View>
                    <View style={styles.summaryContainer}>
                        <View>
                            <Text style={styles.summaryLabel}>Total Income</Text>
                            <Text style={[styles.summaryValue, { color: AppColors.success }]}>KES {income.toLocaleString()}</Text>
                        </View>
                        <View>
                            <Text style={styles.summaryLabel}>Total Expense</Text>
                            <Text style={[styles.summaryValue, { color: AppColors.danger }]}>KES {expenses.toLocaleString()}</Text>
                        </View>
                    </View>
                </Card>

                <Card style={{ marginTop: 24 }}>
                    <Text style={styles.sectionTitle}>Spending by Category</Text>
                    {sortedCategories.length > 0 ? sortedCategories.map(([category, amount]) => (
                        <CategorySpend
                            key={category}
                            category={category}
                            amount={amount}
                            percentage={totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0}
                        />
                    )) : <Text style={styles.noDataText}>No expense data available.</Text>}
                </Card>
            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    main: { flex: 1, padding: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    chartContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 180, paddingHorizontal: 16 },
    chartBarContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
    chartBarOuter: { height: 150, width: 40, backgroundColor: '#f3f4f6', borderRadius: 6, display: 'flex', justifyContent: 'flex-end' },
    chartBarInner: { width: '100%', borderRadius: 6, transition: 'height 0.5s ease-out' },
    chartBarLabel: { fontSize: 12, color: AppColors.textSecondary },
    summaryContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 24, borderTopWidth: 1, borderColor: '#e5e7eb', paddingTop: 16 },
    summaryLabel: { fontSize: 14, color: AppColors.textSecondary, textAlign: 'center' },
    summaryValue: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 4 },
    categoryContainer: { marginVertical: 8 },
    categoryInfo: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    categoryName: { color: AppColors.textPrimary, fontWeight: '500' },
    categoryAmount: { color: AppColors.textSecondary, fontSize: 14 },
    categoryProgressBar: { height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden' },
    categoryProgress: { height: '100%', backgroundColor: AppColors.primary, borderRadius: 4 },
    noDataText: { textAlign: 'center', color: AppColors.textSecondary, paddingVertical: 20 },
});
