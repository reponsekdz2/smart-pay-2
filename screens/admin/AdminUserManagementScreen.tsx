import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Screen } from '../../constants';
import { Container, Header, AppColors, Card, BottomNav, Button } from '../../components/common';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Picker } from '../../components/react-native';
import { User, UserStatus, KycStatus } from '../../types';

const UserDetailsPane = ({ user, onClose }: { user: User; onClose: () => void }) => {
    const { dispatch } = useAppContext();

    const handleKycChange = (newStatus: KycStatus) => {
        if (window.confirm(`Are you sure you want to change KYC status to ${newStatus}?`)) {
            dispatch({ type: 'ADMIN_UPDATE_USER_KYC', payload: { userId: user.id, kycStatus: newStatus } });
        }
    };
    
    const handleStatusChange = (newStatus: UserStatus) => {
        if (window.confirm(`Are you sure you want to change user status to ${newStatus}?`)) {
            dispatch({ type: 'ADMIN_UPDATE_USER_STATUS', payload: { userId: user.id, status: newStatus } });
        }
    };

    return (
        <View style={styles.detailsPane}>
            <View style={styles.detailsHeader}>
                <Text style={styles.detailsTitle}>{user.first_name} {user.last_name}</Text>
                <TouchableOpacity onPress={onClose}><Text style={{fontSize: 24}}>×</Text></TouchableOpacity>
            </View>
            <ScrollView>
                 <Text style={styles.detailItem}><strong>User ID:</strong> {user.id}</Text>
                 <Text style={styles.detailItem}><strong>Phone:</strong> {user.phone}</Text>
                 <Text style={styles.detailItem}><strong>Email:</strong> {user.email}</Text>
                 <Text style={styles.detailItem}><strong>National ID:</strong> {user.national_id}</Text>
                 <Text style={styles.detailItem}><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</Text>
                 
                 <View style={styles.actionSection}>
                     <Text style={styles.sectionTitle}>KYC Status: {user.kyc_status}</Text>
                     <View style={styles.buttonGroup}>
                        <Button variant="secondary" onPress={() => handleKycChange(KycStatus.VERIFIED)}>Approve</Button>
                        <Button variant="secondary" onPress={() => handleKycChange(KycStatus.REJECTED)}>Reject</Button>
                        <Button variant="secondary" onPress={() => handleKycChange(KycStatus.UNDER_REVIEW)}>Review</Button>
                     </View>
                 </View>
                 <View style={styles.actionSection}>
                     <Text style={styles.sectionTitle}>Account Status: {user.status}</Text>
                     <View style={styles.buttonGroup}>
                        {user.status !== UserStatus.ACTIVE && <Button variant="secondary" onPress={() => handleStatusChange(UserStatus.ACTIVE)}>Activate</Button>}
                        {user.status !== UserStatus.SUSPENDED && <Button variant="danger" onPress={() => handleStatusChange(UserStatus.SUSPENDED)}>Suspend</Button>}
                        {user.status !== UserStatus.BLOCKED && <Button variant="danger" onPress={() => handleStatusChange(UserStatus.BLOCKED)}>Block</Button>}
                     </View>
                 </View>
            </ScrollView>
        </View>
    );
};


export const AdminUserManagementScreen = () => {
    const { state } = useAppContext();
    const { users } = state;
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const getStatusColor = (status: UserStatus) => ({
        [UserStatus.ACTIVE]: AppColors.success,
        [UserStatus.SUSPENDED]: '#F59E0B',
        [UserStatus.BLOCKED]: AppColors.danger,
        [UserStatus.DELETED]: AppColors.textSecondary,
    }[status]);

    const getKycColor = (status: KycStatus) => ({
        [KycStatus.VERIFIED]: AppColors.success,
        [KycStatus.PENDING]: '#F59E0B',
        [KycStatus.REJECTED]: AppColors.danger,
        [KycStatus.UNDER_REVIEW]: AppColors.primary,
    }[status]);

    return (
        <Container>
            <Header title="User Management" />
            <View style={{flexDirection: 'row', flex: 1}}>
                <ScrollView style={styles.userList}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerCell, {flex: 2}]}>User</Text>
                        <Text style={[styles.headerCell, {flex: 1}]}>KYC</Text>
                        <Text style={[styles.headerCell, {flex: 1}]}>Status</Text>
                    </View>
                    {users.map(user => (
                        <TouchableOpacity key={user.id} style={styles.userRow} onPress={() => setSelectedUser(user)}>
                            <View style={{flex: 2}}>
                                <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
                                <Text style={styles.userPhone}>{user.phone}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={[styles.statusBadge, {backgroundColor: getKycColor(user.kyc_status)}]}>{user.kyc_status}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                 <Text style={[styles.statusBadge, {backgroundColor: getStatusColor(user.status)}]}>{user.status}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {selectedUser && <UserDetailsPane user={selectedUser} onClose={() => setSelectedUser(null)} />}
            </View>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    userList: { flex: 2, borderRightWidth: 1, borderColor: AppColors.cardBorder },
    tableHeader: { flexDirection: 'row', padding: 16, backgroundColor: AppColors.background, borderBottomWidth: 1, borderColor: AppColors.cardBorder },
    headerCell: { fontWeight: 'bold', color: AppColors.textSecondary },
    userRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: AppColors.cardBorder, cursor: 'pointer', backgroundColor: AppColors.cardBackground },
    userName: { fontWeight: '600' },
    userPhone: { color: AppColors.textSecondary, fontSize: 12 },
    statusBadge: { color: 'white', paddingVertical: 2, paddingHorizontal: 8, borderRadius: 9999, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' },
    detailsPane: { flex: 1, padding: 24, backgroundColor: AppColors.background },
    detailsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    detailsTitle: { fontSize: 20, fontWeight: 'bold' },
    detailItem: { marginBottom: 8, borderBottomWidth: 1, borderColor: AppColors.cardBorder, paddingBottom: 8 },
    actionSection: { marginTop: 24 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    buttonGroup: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' }
});