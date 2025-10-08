import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Container, BottomNav, AppColors } from '../components/common';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from '../components/react-native';
import { Screen } from '../constants';
import { Transaction, TransactionType } from '../types';
import { DownloadIcon, SendIcon } from '../components/icons';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    const isCredit = transaction.amount > 0;
    return (
        <View style={styles.txItem}>
            <View style={styles.txItemLeft}>
                <View style={[styles.txIconContainer, isCredit ? styles.txIconContainerCredit : styles.txIconContainerDebit]}>
                    {isCredit ? <DownloadIcon style={styles.txIcon} /> : <SendIcon style={styles.txIcon} />}
                </View>
                <View>
                    <Text style={styles.txDescription}>{transaction.description}</Text>
                    <Text style={styles.txDate}>{new Date(transaction.date).toLocaleDateString()}</Text>
                </View>
            </View>
            <Text style={[styles.txAmount, isCredit ? styles.txAmountCredit : styles.txAmountDebit]}>
                {isCredit ? '+' : ''}KES {Math.abs(transaction.amount).toLocaleString()}
            </Text>
        </View>
    );
}

const QuickActionButton = ({ label, icon, onPress }: { label: string, icon: string, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={styles.quickAction}>
        <View style={styles.quickActionIconContainer}>
            <Text style={styles.quickActionIcon}>{icon}</Text>
        </View>
        <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
);

export const DashboardScreen = () => {
    const { state, dispatch } = useAppContext();
    const { user, transactions } = state;

    if (!user) {
        // This should ideally not happen if isAuthenticated is true
        return null; 
    }

    const navigate = (screen: Screen) => {
        dispatch({ type: 'NAVIGATE', payload: screen });
    }

    return (
        <Container style={{ backgroundColor: AppColors.darkBackground }}>
            <ScrollView>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Hello, {user.name.split(' ')[0]}!</Text>
                        <Text style={styles.subGreeting}>Welcome back</Text>
                    </View>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
                    </View>
                </View>

                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <Text style={styles.balanceAmount}>KES {user.balance.toLocaleString()}</Text>
                </View>

                <View style={styles.quickActionsContainer}>
                    <QuickActionButton label="Send" icon="💸" onPress={() => navigate(Screen.SEND_MONEY)} />
                    <QuickActionButton label="Pay Bill" icon="🧾" onPress={() => navigate(Screen.PAY_BILLS)} />
                    <QuickActionButton label="Scan QR" icon="📷" onPress={() => navigate(Screen.QR_SCAN)} />
                    <QuickActionButton label="More" icon="⚙️" onPress={() => {}} />
                </View>

                <View style={styles.transactionsSection}>
                    <View style={styles.transactionsHeader}>
                        <Text style={styles.sectionTitle}>Recent Transactions</Text>
                        <TouchableOpacity onPress={() => navigate(Screen.TRANSACTION_HISTORY)}>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.transactionsList}>
                        {transactions.slice(0, 5).map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
                    </View>
                </View>
            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    header: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, paddingTop: 48 },
    greeting: { color: AppColors.darkText, fontSize: 24, fontWeight: 'bold' },
    subGreeting: { color: AppColors.darkSubText, fontSize: 16 },
    avatar: { width: 48, height: 48, backgroundColor: AppColors.primary, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    balanceCard: { backgroundColor: AppColors.primary, marginHorizontal: 24, padding: 24, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' },
    balanceLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 16 },
    balanceAmount: { color: 'white', fontSize: 36, fontWeight: 'bold', marginTop: 8 },
    quickActionsContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 24 },
    quickAction: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
    quickActionIconContainer: { width: 64, height: 64, backgroundColor: AppColors.darkCard, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    quickActionIcon: { fontSize: 28 },
    quickActionLabel: { color: AppColors.darkSubText, fontSize: 14, fontWeight: '500' },
    transactionsSection: { backgroundColor: AppColors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, flex: 1, minHeight: 300 },
    transactionsHeader: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary },
    viewAll: { color: AppColors.primary, fontWeight: '600' },
    transactionsList: { display: 'flex', flexDirection: 'column', gap: 8 },
    txItem: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, backgroundColor: 'white', padding: 16, borderRadius: 12 },
    txItemLeft: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 },
    txIconContainer: { borderRadius: 9999, padding: 8 },
    txIconContainerCredit: { backgroundColor: '#D1FAE5', color: '#059669' },
    txIconContainerDebit: { backgroundColor: '#FEE2E2', color: '#DC2626' },
    txIcon: { height: 20, width: 20 },
    txDescription: { fontWeight: '600', color: AppColors.textPrimary },
    txDate: { fontSize: 14, color: AppColors.textSecondary },
    txAmount: { fontWeight: 'bold' },
    txAmountCredit: { color: AppColors.success },
    txAmountDebit: { color: AppColors.danger },
});
