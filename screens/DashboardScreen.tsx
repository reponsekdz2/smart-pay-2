import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Card, AppColors, BottomNav } from '../components/common';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from '../components/react-native';
import { SendIcon, DownloadIcon, ChartBarIcon, PuzzlePieceIcon } from '../components/icons';
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
                {isCredit ? '+' : ''} {transaction.amount.toLocaleString()} <Text style={styles.txCurrency}>RWF</Text>
            </Text>
        </View>
    );
};

const ActionCard = ({ title, icon, onPress }: { title: string; icon: React.ReactNode; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={styles.actionCard}>
        {icon}
        <Text style={styles.actionLabel}>{title}</Text>
    </TouchableOpacity>
);

export const DashboardScreen = () => {
    const { state, dispatch } = useAppContext();
    const { user, wallets, transactions, isOnline, offlineQueue } = state;

    if (!user) return null;

    const userWallet = wallets.find(w => w.user_id === user.id);
    const recentTransactions = transactions.slice(0, 5);

    return (
        <Container>
            <ScrollView style={styles.content}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Hello, {user.first_name}</Text>
                        <Text style={styles.welcome}>Welcome back to Smart Pay</Text>
                    </View>
                </View>

                <Card style={styles.balanceCard}>
                    <Text style={styles.walletLabel}>Main Wallet Balance</Text>
                    <Text style={styles.balance}>RWF {userWallet?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}</Text>
                </Card>

                <View style={styles.actionsGrid}>
                    <ActionCard title="Send Money" icon={<SendIcon style={styles.actionIcon} />} onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.SEND_MONEY})} />
                    <ActionCard title="Pay a Bill" icon={<DownloadIcon style={styles.actionIcon} />} onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.PAY_BILLS})} />
                    <ActionCard title="Analytics" icon={<ChartBarIcon style={styles.actionIcon} />} onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.ANALYTICS})} />
                    <ActionCard title="Future Hub" icon={<PuzzlePieceIcon style={styles.actionIcon} />} onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.FUTURE_HUB})} />
                </View>
                
                 {/* DEV TOOL for offline simulation */}
                <View style={styles.devTool}>
                    <Text style={styles.devToolText}>Dev Tool: </Text>
                    <TouchableOpacity style={styles.onlineToggle} onPress={() => dispatch({type: 'TOGGLE_ONLINE_STATUS'})}>
                        <View style={[styles.onlineIndicator, {backgroundColor: isOnline ? AppColors.accent : AppColors.danger }]} />
                        <Text style={styles.devToolText}>{isOnline ? 'Online' : 'Offline'}</Text>
                    </TouchableOpacity>
                     {offlineQueue.length > 0 && <Text style={styles.queueBadge}>{offlineQueue.length}</Text>}
                </View>
                
                <Card>
                     <View style={styles.cardHeader}>
                        <Text style={styles.sectionTitle}>Recent Transactions</Text>
                        <TouchableOpacity onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.TRANSACTION_HISTORY})}>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    {recentTransactions.length > 0 ? (
                        recentTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)
                    ) : (
                        <Text style={{color: AppColors.subtext, textAlign: 'center', padding: 20}}>No recent transactions.</Text>
                    )}
                </Card>
            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24, paddingBottom: 100 },
    header: { marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    greeting: { fontSize: 28, fontWeight: 'bold', color: AppColors.text },
    welcome: { color: AppColors.subtext },
    
    balanceCard: {
        padding: 24,
        borderRadius: 20,
        marginBottom: 24,
        backgroundColor: AppColors.cardBackground
    },
    walletLabel: { color: AppColors.subtext },
    balance: { fontSize: 36, fontWeight: 'bold', color: AppColors.primary, marginTop: 8 },

    actionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 },
    actionCard: {
        backgroundColor: AppColors.cardBackground,
        borderWidth: 1,
        borderColor: AppColors.cardBorder,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
    },
    actionIcon: { width: 28, height: 28, color: AppColors.subtext, marginBottom: 12 },
    actionLabel: { fontWeight: '600', color: AppColors.text, textAlign: 'center' },

    devTool: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: AppColors.cardBackground, borderRadius: 12, padding: 8, marginBottom: 24, borderWidth: 1, borderColor: AppColors.cardBorder },
    devToolText: { color: AppColors.subtext, fontSize: 12 },
    onlineToggle: { flexDirection: 'row', alignItems: 'center', marginLeft: 8, padding: '4px 8px', borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.05)' },
    onlineIndicator: { width: 8, height: 8, borderRadius: 9999, marginRight: 6 },
    queueBadge: { backgroundColor: AppColors.danger, color: 'white', fontSize: 10, fontWeight: 'bold', padding: '2px 6px', borderRadius: 8, marginLeft: 8 },

    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.text },
    viewAll: { color: AppColors.primary, fontWeight: '600' },
    
    txItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderTopWidth: 1, borderColor: AppColors.cardBorder },
    txDescription: { fontWeight: '600', color: AppColors.text },
    txDate: { color: AppColors.subtext, fontSize: 12 },
    txAmount: { fontWeight: 'bold', fontSize: 16 },
    txCurrency: { fontWeight: 'normal', color: AppColors.subtext, fontSize: 14 },
    txAmountCredit: { color: AppColors.accent },
    txAmountDebit: { color: AppColors.danger },
});