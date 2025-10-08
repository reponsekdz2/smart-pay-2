

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Container, BottomNav, AppColors } from '../components/common';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from '../components/react-native';
import { Screen } from '../constants';
// FIX: Import TransactionStatus from types
import { Transaction, OfflineTransaction, TransactionType, TransactionStatus } from '../types';
import { DownloadIcon, SendIcon, BanknotesIcon, SparklesIcon, AcademicCapIcon, AtomIcon } from '../components/icons';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    // FIX: Use correct enum values for checking transaction type.
    const isCredit = transaction.type === TransactionType.RECEIVED || transaction.type === TransactionType.DEPOSIT || transaction.type === TransactionType.LOAN_DISBURSEMENT;
    const amount = transaction.amount;
    return (
        <View style={styles.txItem}>
            <View style={styles.txItemLeft}>
                <View style={[styles.txIconContainer, isCredit ? styles.txIconContainerCredit : styles.txIconContainerDebit]}>
                    {isCredit ? <DownloadIcon style={styles.txIcon} /> : <SendIcon style={styles.txIcon} />}
                </View>
                <View>
                    <Text style={styles.txDescription}>{transaction.description}</Text>
                    {/* FIX: Use `created_at` instead of non-existent `date` property. */}
                    <Text style={styles.txDate}>{new Date(transaction.created_at).toLocaleDateString()}</Text>
                </View>
            </View>
            <Text style={[styles.txAmount, isCredit ? styles.txAmountCredit : styles.txAmountDebit]}>
                {isCredit ? '+' : '-'}KES {Math.abs(amount).toLocaleString()}
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

const DashboardSkeleton = () => (
    <View style={styles.skeletonContainer}>
        <View style={styles.skeletonHeader} />
        <View style={styles.skeletonBalanceCard} />
        <View style={styles.skeletonQuickActions} />
        <View style={styles.skeletonSection} />
        <View style={styles.skeletonTransaction} />
        <View style={styles.skeletonTransaction} />
    </View>
);

const OfflineIndicator = ({ isOnline, queueSize }: { isOnline: boolean; queueSize: number }) => {
    if (isOnline && queueSize > 0) {
        return <View style={styles.syncingIndicator}><Text style={styles.indicatorText}>Syncing {queueSize} items...</Text></View>;
    }
    if (!isOnline) {
        return <View style={styles.offlineIndicator}><Text style={styles.indicatorText}>Offline Mode {queueSize > 0 ? `(${queueSize} pending)` : ''}</Text></View>;
    }
    return null;
}

export const DashboardScreen = () => {
    const { state, dispatch } = useAppContext();
    const { user, wallets, transactions, isOnline, offlineQueue, chaosMode } = state;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data like react-query
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Simulate processing queue when coming back online
        if (isOnline && offlineQueue.length > 0) {
            setTimeout(() => {
                // FIX: The 'PROCESS_OFFLINE_QUEUE' action does not take a payload.
                // The reducer processes one transaction from the queue at a time.
                // This useEffect will be re-triggered as the queue length changes until it's empty.
                dispatch({ type: 'PROCESS_OFFLINE_QUEUE' });
            }, 2000);
        }
    }, [isOnline, offlineQueue.length, dispatch]);

    if (!user) return null;

    // FIX: Get user's balance from their wallet instead of the user object.
    const userWallet = wallets.find(w => w.user_id === user.id);
    const balance = userWallet ? userWallet.balance : 0;

    const navigate = (screen: Screen) => dispatch({ type: 'NAVIGATE', payload: screen });

    if (isLoading) {
        return (
             <Container style={{ backgroundColor: AppColors.darkBackground }}>
                <DashboardSkeleton />
                <BottomNav />
            </Container>
        )
    }

    return (
        <Container style={{ backgroundColor: AppColors.darkBackground }}>
            <OfflineIndicator isOnline={isOnline} queueSize={offlineQueue.length} />
            <ScrollView>
                <View style={styles.header}>
                    <View>
                        {/* FIX: Use `user.first_name` instead of non-existent `user.name`. */}
                        <Text style={styles.greeting}>Hello, {user.first_name}!</Text>
                        <Text style={styles.subGreeting}>Welcome back</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate(Screen.SECURITY)} style={styles.avatar}>
                        {/* FIX: Use `user.first_name` for avatar initial. */}
                        <Text style={styles.avatarText}>{user.first_name?.charAt(0)}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    {/* FIX: Use balance from wallet. */}
                    <Text style={styles.balanceAmount}>KES {balance.toLocaleString()}</Text>
                </View>

                <View style={styles.quickActionsContainer}>
                    <QuickActionButton label="Pay" icon="💸" onPress={() => navigate(Screen.PAYMENT_GATEWAY)} />
                    <QuickActionButton label="Top Up" icon="💰" onPress={() => {}} />
                    <QuickActionButton label="Scan QR" icon="📷" onPress={() => navigate(Screen.QR_SCAN)} />
                    <QuickActionButton label="Services" icon="⚙️" onPress={() => {}} />
                </View>
                
                <View style={styles.contentArea}>
                    <TouchableOpacity onPress={() => navigate(Screen.FUTURE_HUB)} style={styles.futureCard}>
                        <AtomIcon style={styles.aiIcon} />
                        <View>
                            <Text style={styles.aiTitle}>The Future of Finance</Text>
                            <Text style={styles.aiSubtitle}>Explore Next-Gen Banking Features</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.transactionsSection}>
                        <View style={styles.transactionsHeader}>
                            <Text style={styles.sectionTitle}>Recent Transactions</Text>
                            <TouchableOpacity onPress={() => navigate(Screen.TRANSACTION_HISTORY)}>
                                <Text style={styles.viewAll}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.transactionsList}>
                            {transactions.slice(0, 3).map(tx => <TransactionItem key={tx.id} transaction={tx} />)}
                        </View>
                    </View>

                     <View style={styles.devTools}>
                        <Text style={styles.sectionTitle}>Dev Tools</Text>
                        <TouchableOpacity onPress={() => dispatch({type: 'SET_ONLINE_STATUS', payload: !isOnline})} style={styles.toggleRow}>
                            <Text>Offline Mode</Text>
                            <View style={[styles.toggleBase, !isOnline && styles.toggleActive]}><View style={[styles.toggleKnob, !isOnline && styles.toggleKnobActive]} /></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch({type: 'TOGGLE_CHAOS_MODE'})} style={styles.toggleRow}>
                            <Text style={{color: chaosMode ? AppColors.danger : AppColors.textPrimary}}>Chaos Mode (Inject Latency)</Text>
                            <View style={[styles.toggleBase, chaosMode && styles.toggleActive, chaosMode && {backgroundColor: AppColors.danger}]}><View style={[styles.toggleKnob, chaosMode && styles.toggleKnobActive]} /></View>
                        </TouchableOpacity>
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
    contentArea: { backgroundColor: AppColors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, flex: 1, minHeight: 400 },
    futureCard: { display: 'flex', flexDirection: 'row', alignItems: 'center', background: 'linear-gradient(135deg, #6B21A8, #1877F2)', color: 'white', padding: 16, borderRadius: 12, marginBottom: 24 },
    aiIcon: { width: 40, height: 40, color: 'white', marginRight: 16 },
    aiTitle: { fontSize: 16, fontWeight: 'bold', color: 'white' },
    aiSubtitle: { color: 'rgba(255,255,255,0.8)' },
    transactionsSection: {},
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
    skeletonContainer: { padding: 24, paddingTop: 48 },
    skeletonHeader: { height: 48, width: '60%', backgroundColor: AppColors.darkCard, borderRadius: 8, marginBottom: 24 },
    skeletonBalanceCard: { height: 130, backgroundColor: AppColors.darkCard, borderRadius: 16, marginBottom: 24 },
    skeletonQuickActions: { height: 96, backgroundColor: AppColors.darkCard, borderRadius: 16, marginBottom: 24 },
    skeletonSection: { height: 60, backgroundColor: AppColors.background, borderRadius: 12, marginBottom: 24 },
    skeletonTransaction: { height: 68, backgroundColor: AppColors.background, borderRadius: 12, marginBottom: 8 },
    offlineIndicator: { backgroundColor: AppColors.danger, padding: 8, textAlign: 'center' },
    syncingIndicator: { backgroundColor: '#F59E0B', padding: 8, textAlign: 'center' },
    indicatorText: { color: 'white', fontWeight: 'bold' },
    devTools: { marginTop: 32, backgroundColor: '#f3f4f6', padding: 16, borderRadius: 12 },
    toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
    toggleBase: { width: 50, height: 28, borderRadius: 9999, padding: 3, backgroundColor: '#e5e7eb' },
    toggleActive: { backgroundColor: AppColors.success },
    toggleKnob: { width: 22, height: 22, backgroundColor: 'white', borderRadius: 9999, transition: 'transform 0.2s' },
    toggleKnobActive: { transform: 'translateX(22px)' },
});