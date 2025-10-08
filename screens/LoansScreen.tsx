import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, Button, Card, AppColors } from '../components/common';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from '../components/react-native';
import { Transaction, TransactionType, Loan } from '../types';

const LoanItem = ({ loan }: { loan: Loan }) => {
    return (
        <View style={[styles.loanItem, loan.isRepaid ? styles.loanItemRepaid : {}]}>
            <View>
                <Text style={styles.loanAmount}>KES {loan.amount.toLocaleString()}</Text>
                <Text style={styles.loanDate}>Due on {new Date(loan.dueDate).toLocaleDateString()}</Text>
            </View>
            <Text style={[styles.loanStatus, loan.isRepaid ? styles.loanStatusRepaid : styles.loanStatusActive]}>
                {loan.isRepaid ? 'Paid' : 'Active'}
            </Text>
        </View>
    );
}

export const LoansScreen = () => {
    const { state, dispatch } = useAppContext();
    const { user, loans } = state;
    const [loanAmount, setLoanAmount] = useState(500);
    const [view, setView] = useState<'apply' | 'history'>('apply');

    if (!user) return null;

    const loanLimit = 50000;
    const interestRate = 0.05; // 5%
    const interest = loanAmount * interestRate;
    const totalRepayment = loanAmount + interest;

    const handleApplyLoan = () => {
        const newLoan: Loan = {
            id: `loan_${Date.now()}`,
            amount: loanAmount,
            interestRate,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            isRepaid: false,
        };

        const newTransaction: Transaction = {
            id: `txn_${Date.now()}`,
            type: TransactionType.LOAN_DISBURSEMENT,
            amount: loanAmount,
            description: 'Loan disbursed to your account',
            date: new Date().toISOString(),
            status: 'Successful',
            category: 'Loan',
        };

        dispatch({ type: 'APPLY_LOAN', payload: newLoan });
        dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
        dispatch({ type: 'UPDATE_BALANCE', payload: user.balance + loanAmount });
        alert(`Loan of KES ${loanAmount} approved and disbursed!`);
    };

    return (
        <Container>
            <Header title="Loans" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setView('apply')} style={[styles.tab, view === 'apply' && styles.tabActive]}>
                    <Text style={[styles.tabText, view === 'apply' && styles.tabTextActive]}>Apply for Loan</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setView('history')} style={[styles.tab, view === 'history' && styles.tabActive]}>
                    <Text style={[styles.tabText, view === 'history' && styles.tabTextActive]}>Loan History</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.content}>
                {view === 'apply' ? (
                    <>
                        <Card style={styles.limitCard}>
                            <Text style={styles.limitLabel}>Your Loan Limit</Text>
                            <Text style={styles.limitAmount}>KES {loanLimit.toLocaleString()}</Text>
                        </Card>
                        <Card style={{ marginTop: 24 }}>
                            <Text style={styles.sectionTitle}>How much do you need?</Text>
                            <Text style={styles.selectedAmount}>KES {loanAmount.toLocaleString()}</Text>
                            <input
                                type="range"
                                min="500"
                                max={loanLimit}
                                step="500"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                                style={{ width: '100%', marginTop: 16 }}
                            />
                            <View style={styles.loanSummary}>
                                <View style={styles.summaryItem}><Text>Interest (5%)</Text><Text>KES {interest.toLocaleString()}</Text></View>
                                <View style={styles.summaryItem}><Text>Due Date</Text><Text>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</Text></View>
                                <View style={[styles.summaryItem, styles.summaryTotal]}><Text>Total Repayment</Text><Text>KES {totalRepayment.toLocaleString()}</Text></View>
                            </View>
                            <Button onPress={handleApplyLoan} style={{marginTop: 24}}>Apply Now</Button>
                        </Card>
                    </>
                ) : (
                    <Card>
                        <Text style={styles.sectionTitle}>Your Loans</Text>
                        {loans.length > 0 ? (
                           <View style={styles.loanList}>
                                {loans.map(loan => <LoanItem key={loan.id} loan={loan} />)}
                           </View>
                        ) : (
                            // FIX: Replace non-standard 'paddingVertical' with 'paddingTop' and 'paddingBottom' for web compatibility.
                            <Text style={{textAlign: 'center', color: AppColors.textSecondary, paddingTop: 32, paddingBottom: 32}}>No loan history.</Text>
                        )}
                    </Card>
                )}
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    tabs: { flexDirection: 'row', paddingHorizontal: 24, backgroundColor: AppColors.surface, borderBottomWidth: 1, borderColor: '#e5e7eb' },
    tab: { flex: 1, paddingVertical: 16, alignItems: 'center', borderBottomWidth: 2, borderColor: 'transparent' },
    tabActive: { borderColor: AppColors.primary },
    tabText: { color: AppColors.textSecondary, fontWeight: '500' },
    tabTextActive: { color: AppColors.primary },
    limitCard: { backgroundColor: AppColors.primary, alignItems: 'center' },
    limitLabel: { color: 'rgba(255,255,255,0.8)' },
    limitAmount: { color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 8 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16, textAlign: 'center' },
    selectedAmount: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', color: AppColors.primary },
    loanSummary: { marginTop: 24, borderTopWidth: 1, borderColor: '#f3f4f6', paddingTop: 16 },
    summaryItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
    summaryTotal: { fontWeight: 'bold', fontSize: 16, marginTop: 8 },
    loanList: { display: 'flex', flexDirection: 'column', gap: 8 },
    loanItem: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8 },
    loanItemRepaid: { backgroundColor: '#f9fafb', borderColor: '#f3f4f6' },
    loanAmount: { fontWeight: 'bold', fontSize: 16 },
    loanDate: { color: AppColors.textSecondary, fontSize: 12 },
    loanStatus: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 9999, fontSize: 12, fontWeight: '500' },
    loanStatusActive: { backgroundColor: '#FEF3C7', color: '#D97706' },
    loanStatusRepaid: { backgroundColor: '#D1FAE5', color: '#059669' },
});