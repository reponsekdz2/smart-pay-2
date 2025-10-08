
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Screen } from '../../constants';
import { Container, Header, AppColors, Card, BottomNav } from '../../components/common';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from '../../components/react-native';
import { UserStatus, KycStatus, TransactionStatus } from '../../types';

const StatCard = ({ title, value, change, changeType }: { title: string, value: string, change?: string, changeType?: 'up' | 'down' | 'neutral' }) => {
    const changeColor = changeType === 'up' ? AppColors.success : changeType === 'down' ? AppColors.danger : AppColors.textSecondary;
    return (
        <Card style={styles.statCard}>
            <Text style={styles.statTitle}>{title}</Text>
            <Text style={styles.statValue}>{value}</Text>
            {change && <Text style={[styles.statChange, { color: changeColor }]}>{change}</Text>}
        </Card>
    );
};

export const AdminDashboardScreen = () => {
    const { state, dispatch } = useAppContext();
    const { users, transactions } = state;

    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === UserStatus.ACTIVE).length;
    const pendingKYC = users.filter(u => u.kyc_status === KycStatus.PENDING).length;

    const totalVolume = transactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const completedTransactions = transactions.filter(tx => tx.status === TransactionStatus.COMPLETED).length;
    const failedTransactions = transactions.filter(tx => tx.status === TransactionStatus.FAILED).length;

    const systemHealth = state.backendServices.every(s => s.status === 'Online') ? 'All Systems Operational' : 'System Degraded';

    return (
        <Container>
            <Header title={`Admin Dashboard`} />
            <ScrollView style={styles.content}>
                <View style={styles.grid}>
                    <StatCard title="Total Users" value={totalUsers.toLocaleString()} change={`+${(Math.random() * 5).toFixed(0)} today`} changeType="up" />
                    <StatCard title="Active Users" value={activeUsers.toLocaleString()} change={`${((activeUsers/totalUsers)*100).toFixed(1)}%`} changeType="neutral" />
                    <StatCard title="Pending KYC" value={pendingKYC.toLocaleString()} change={`${pendingKYC > 0 ? 'Action Required' : 'All Clear'}`} changeType={pendingKYC > 0 ? 'down' : 'up'} />
                    <StatCard title="Total Volume (RWF)" value={totalVolume.toLocaleString()} change={`+${(totalVolume * 0.01).toLocaleString()} today`} changeType="up" />
                    <StatCard title="Completed Txs" value={completedTransactions.toLocaleString()} />
                    <StatCard title="Failed Txs" value={failedTransactions.toLocaleString()} />
                    <StatCard title="System Health" value={systemHealth} changeType={systemHealth.includes('Operational') ? 'up' : 'down'}/>
                </View>

                <Card style={{ marginTop: 24 }}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                     <View style={styles.quickActions}>
                        <TouchableOpacity onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.ADMIN_USERS})}>
                            <Text style={styles.actionItem}>Manage Users</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.ADMIN_TRANSACTIONS})}>
                            <Text style={styles.actionItem}>Review Transactions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.ADMIN_SYSTEM})}>
                            <Text style={styles.actionItem}>System Settings</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
    statCard: { flex: 1 },
    statTitle: { fontSize: 14, color: AppColors.textSecondary, marginBottom: 4 },
    statValue: { fontSize: 24, fontWeight: 'bold', color: AppColors.textPrimary },
    statChange: { fontSize: 12, fontWeight: '500', marginTop: 4 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    quickActions: { display: 'flex', flexDirection: 'column', gap: 12 },
    actionItem: { color: AppColors.primary, fontWeight: '600', padding: 8, cursor: 'pointer' },
});