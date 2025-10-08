import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, Button, AppColors, Card, BottomNav } from '../components/common';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from '../components/react-native';
import { Transaction, TransactionType } from '../types';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    const isCredit = transaction.type === TransactionType.RECEIVED || transaction.type === TransactionType.DEPOSIT;
    return (
        <View style={styles.txItem}>
            <View>
                <Text style={styles.txDescription}>{transaction.description}</Text>
                <Text style={styles.txDate}>{new Date(transaction.created_at).toLocaleDateString()}</Text>
            </View>
            <Text style={[styles.txAmount, isCredit ? styles.txAmountCredit : styles.txAmountDebit]}>
                {isCredit ? '+' : ''}{transaction.amount.toLocaleString()} RWF
            </Text>
        </View>
    );
}


export const DashboardScreen = () => {
    const { state, dispatch } = useAppContext();
    const { user, wallets, transactions } = state;
    const navigate = (screen: Screen) => dispatch({ type: 'NAVIGATE', payload: screen });

    const userWallet = wallets.find(w => w.user_id === user?.id);
    const recentTransactions = transactions.slice(0, 3);

    return (
        <Container>
            <Header title={`Welcome, ${user?.first_name}`} />
            <ScrollView style={styles.content}>
                <Card style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <Text style={styles.balanceAmount}>{userWallet?.balance.toLocaleString()} RWF</Text>
                </Card>

                <View style={styles.actionsGrid}>
                     <TouchableOpacity style={styles.actionButton} onPress={() => navigate(Screen.SEND_MONEY)}><Text>Send</Text></TouchableOpacity>
                     <TouchableOpacity style={styles.actionButton} onPress={() => navigate(Screen.PAY_BILLS)}><Text>Pay Bills</Text></TouchableOpacity>
                     <TouchableOpacity style={styles.actionButton} onPress={() => navigate(Screen.QR_SCAN)}><Text>Scan QR</Text></TouchableOpacity>
                     <TouchableOpacity style={styles.actionButton} onPress={() => navigate(Screen.TRANSACTION_HISTORY)}><Text>History</Text></TouchableOpacity>
                </View>

                <Card>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    {recentTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
                </Card>
                
                <Card style={{marginTop: 24}}>
                     <Text style={styles.sectionTitle}>Explore</Text>
                      <TouchableOpacity style={styles.exploreItem} onPress={() => navigate(Screen.LOANS)}><Text>Apply for Loans</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.exploreItem} onPress={() => navigate(Screen.SAVINGS)}><Text>Savings Accounts</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.exploreItem} onPress={() => navigate(Screen.CRYPTO_WALLET)}><Text>Crypto Wallet</Text></TouchableOpacity>
                </Card>

            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    balanceCard: {
        backgroundColor: AppColors.primary,
        alignItems: 'center',
    },
    balanceLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    balanceAmount: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 8,
    },
    actionsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: 16,
        marginVertical: 24,
    },
    actionButton: {
        backgroundColor: AppColors.surface,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '500'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    txItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: AppColors.cardBorder,
    },
    txDescription: { fontWeight: '500' },
    txDate: { fontSize: 12, color: AppColors.textSecondary },
    txAmount: { fontWeight: 'bold' },
    txAmountCredit: { color: AppColors.success },
    txAmountDebit: { color: AppColors.danger },
    exploreItem: {
        paddingVertical: 12,
        fontWeight: '500',
        color: AppColors.primary,
    }
});
