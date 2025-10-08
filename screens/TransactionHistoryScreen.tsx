import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Container, Header, BottomNav, AppColors } from '../components/common';
import { StyleSheet, View, Text, ScrollView } from '../components/react-native';
import { Transaction, TransactionType } from '../types';
import { DownloadIcon, SendIcon } from '../components/icons';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    const isCredit = transaction.type === TransactionType.RECEIVED || transaction.type === TransactionType.LOAN_DISBURSEMENT || transaction.type === TransactionType.SAVINGS_WITHDRAWAL;
    return (
        <View style={styles.txItem}>
            <View style={styles.txItemLeft}>
                <View style={[styles.txIconContainer, isCredit ? styles.txIconContainerCredit : styles.txIconContainerDebit]}>
                    {isCredit ? <DownloadIcon style={styles.txIcon} /> : <SendIcon style={styles.txIcon} />}
                </View>
                <View>
                    <Text style={styles.txDescription}>{transaction.description}</Text>
                    <Text style={styles.txDate}>{new Date(transaction.date).toLocaleString()}</Text>
                </View>
            </View>
            <View>
                <Text style={[styles.txAmount, isCredit ? styles.txAmountCredit : styles.txAmountDebit]}>
                    {isCredit ? '+' : ''}{transaction.amount.toLocaleString()}
                </Text>
                <Text style={[
                    styles.txStatus,
                    transaction.status === 'Successful' ? styles.txStatusSuccess : 
                    transaction.status === 'Pending' ? styles.txStatusPending : styles.txStatusFailed
                ]}>{transaction.status}</Text>
            </View>
        </View>
    );
}

export const TransactionHistoryScreen = () => {
    const { state } = useAppContext();
    const { transactions } = state;

    return (
        <Container>
            <Header title="Transaction History" />
            <ScrollView style={styles.main}>
                {transactions.length > 0 ? (
                    <View style={styles.card}>
                        {transactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
                    </View>
                ) : (
                    <View style={styles.noTransactionsContainer}>
                        <Text style={styles.noTransactionsText}>No transactions yet.</Text>
                    </View>
                )}
            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    main: { flex: 1, padding: 24 },
    card: { backgroundColor: 'white', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', padding: 16 },
    noTransactionsContainer: { textAlign: 'center', paddingVertical: 80 },
    noTransactionsText: { color: AppColors.textSecondary },
    txItem: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderColor: '#f3f4f6' },
    txItemLeft: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
    txIconContainer: { borderRadius: 9999, padding: 8, marginRight: 16 },
    txIconContainerCredit: { backgroundColor: '#D1FAE5', color: '#059669' },
    txIconContainerDebit: { backgroundColor: '#FEE2E2', color: '#DC2626' },
    txIcon: { height: 20, width: 20 },
    txDescription: { fontWeight: '600', color: AppColors.textPrimary },
    txDate: { fontSize: 14, color: AppColors.textSecondary },
    txAmount: { fontWeight: 'bold', textAlign: 'right' },
    txAmountCredit: { color: AppColors.success },
    txAmountDebit: { color: AppColors.danger },
    txStatus: { fontSize: 12, textAlign: 'right' },
    txStatusSuccess: { color: AppColors.success },
    txStatusPending: { color: '#F59E0B' },
    txStatusFailed: { color: AppColors.danger },
});
