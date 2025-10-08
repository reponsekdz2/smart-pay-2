import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Container, Header, AppColors, BottomNav } from '../../components/common';
import { View, Text, StyleSheet, ScrollView, TextInput } from '../../components/react-native';
import { Transaction, TransactionStatus, User } from '../../types';

const TransactionRow = ({ tx, users }: { tx: Transaction, users: User[] }) => {
    const fromUser = users.find(u => u.id === tx.from_user_id);
    const toUser = users.find(u => u.id === tx.to_user_id);

    const getStatusColor = (status: TransactionStatus) => ({
        [TransactionStatus.COMPLETED]: AppColors.success,
        [TransactionStatus.PENDING]: '#F59E0B',
        [TransactionStatus.FAILED]: AppColors.danger,
        [TransactionStatus.ON_HOLD]: '#6B7280',
        [TransactionStatus.CANCELLED]: AppColors.textSecondary,
        [TransactionStatus.REVERSED]: AppColors.primary,
    }[status]);

    return (
        <View style={styles.txRow}>
            <View style={{flex: 3}}>
                <Text style={styles.txDesc}>{tx.description}</Text>
                <Text style={styles.txSub}>From: {fromUser?.first_name} To: {toUser?.first_name}</Text>
                <Text style={styles.txSub}>Ref: {tx.reference}</Text>
            </View>
            <View style={{flex: 2, alignItems: 'flex-end'}}>
                 <Text style={styles.txAmount}>{tx.amount.toLocaleString()} {tx.currency}</Text>
                 <Text style={[styles.statusBadge, {backgroundColor: getStatusColor(tx.status)}]}>{tx.status}</Text>
            </View>
             <View style={{flex: 2, alignItems: 'flex-end'}}>
                 <Text>Risk: <Text style={{fontWeight: 'bold', color: tx.risk_score > 0.7 ? AppColors.danger : AppColors.success}}>{(tx.risk_score * 100).toFixed(1)}%</Text></Text>
                 <Text style={styles.txSub}>IP: {tx.ip_address}</Text>
            </View>
        </View>
    );
};

export const AdminTransactionScreen = () => {
    const { state } = useAppContext();
    const { transactions, users } = state;
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTransactions = useMemo(() => {
        if (!searchTerm) return transactions;
        return transactions.filter(tx => 
            tx.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.from_user_id.includes(searchTerm) ||
            tx.to_user_id.includes(searchTerm)
        );
    }, [transactions, searchTerm]);

    return (
        <Container>
            <Header title="Transaction Monitoring" />
            <View style={styles.filterBar}>
                <TextInput 
                    placeholder="Search by Ref, User ID, Description..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    style={styles.searchInput}
                />
            </View>
            <ScrollView style={styles.txList}>
                 <View style={styles.tableHeader}>
                    <Text style={[styles.headerCell, {flex: 3}]}>Details</Text>
                    <Text style={[styles.headerCell, {flex: 2, textAlign: 'right'}]}>Amount</Text>
                    <Text style={[styles.headerCell, {flex: 2, textAlign: 'right'}]}>Risk</Text>
                </View>
                {filteredTransactions.map(tx => (
                    <TransactionRow key={tx.id} tx={tx} users={users} />
                ))}
            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    filterBar: { padding: 16, backgroundColor: AppColors.surface, borderBottomWidth: 1, borderColor: AppColors.cardBorder },
    searchInput: { width: '100%', padding: 12, backgroundColor: AppColors.background, borderRadius: 8, borderWidth: 1, borderColor: AppColors.cardBorder },
    txList: { flex: 1 },
    tableHeader: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: AppColors.background },
    headerCell: { fontWeight: 'bold', color: AppColors.textSecondary },
    txRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: AppColors.cardBorder, backgroundColor: AppColors.cardBackground },
    txDesc: { fontWeight: '600' },
    txSub: { color: AppColors.textSecondary, fontSize: 12, marginTop: 2 },
    txAmount: { fontWeight: 'bold' },
    statusBadge: { color: 'white', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 9999, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 4 },
});