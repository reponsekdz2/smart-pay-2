import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Container, Header, BottomNav, Card, AppColors, Button } from '../components/common';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from '../components/react-native';
import { ShieldCheckIcon, UserIcon, BuildingStorefrontIcon, PuzzlePieceIcon } from '../components/icons';
import { Screen } from '../constants';

const SecurityOption = ({ label, value, onToggle }: { label: string, value: boolean, onToggle: () => void }) => (
    <View style={styles.optionRow}>
        <Text style={styles.optionLabel}>{label}</Text>
        <TouchableOpacity onPress={onToggle} style={[styles.toggleBase, value ? styles.toggleActive : styles.toggleInactive]}>
            <View style={[styles.toggleKnob, value ? styles.toggleKnobActive : {}]} />
        </TouchableOpacity>
    </View>
);

export const SecurityScreen = () => {
    const { state, dispatch } = useAppContext();
    // FIX: Access user from state, which can be null.
    const { user } = state;
    // FIX: Initialize state from the user object safely.
    const [limit, setLimit] = useState(user?.dailyTransactionLimit.toString() || '0');

    if (!user) return null;

    const handleLimitUpdate = () => {
        const newLimit = parseInt(limit);
        if(!isNaN(newLimit)) {
            // FIX: Dispatch a valid action type.
            dispatch({ type: 'UPDATE_TRANSACTION_LIMIT', payload: newLimit });
            alert('Limit updated successfully!');
        }
    };

    return (
        <Container>
            <Header title="Security & Profile" />
            <ScrollView style={styles.main}>
                <Card style={styles.profileCard}>
                    <View style={styles.avatar}>
                        {/* FIX: Use `first_name` for avatar initial. */}
                        <Text style={styles.avatarText}>{user.first_name?.charAt(0)}</Text>
                    </View>
                    {/* FIX: Use `first_name` and `last_name` for full name. */}
                    <Text style={styles.profileName}>{user.first_name} {user.last_name}</Text>
                    {/* FIX: Use `phone` instead of `phoneNumber`. */}
                    <Text style={styles.profilePhone}>{user.phone}</Text>
                </Card>

                <Card style={{ marginTop: 24 }}>
                     <Button variant="secondary" onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.MERCHANT_PORTAL})} style={{width: 'auto', paddingHorizontal: 20, alignSelf: 'center', marginBottom: 16}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <BuildingStorefrontIcon style={{width: 20, height: 20, marginRight: 8}}/>
                            <Text>Switch to Merchant</Text>
                        </View>
                    </Button>
                    <View style={{flexDirection: 'row', justifyContent: 'center', gap: 12}}>
                        <Button variant="secondary" onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.SYNC_CENTER})} style={{width: 'auto', paddingHorizontal: 20, backgroundColor: '#f0fdf4', borderColor: '#bbf7d0'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, marginRight: 8}}>🔄</Text>
                                <Text style={{color: '#166534'}}>Sync Center</Text>
                            </View>
                        </Button>
                        <Button variant="secondary" onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.BACKEND_DASHBOARD})} style={{width: 'auto', paddingHorizontal: 20, backgroundColor: '#eef2ff', borderColor: '#a5b4fc'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <PuzzlePieceIcon style={{width: 20, height: 20, marginRight: 8, color: '#4f46e5'}}/>
                                <Text style={{color: '#4f46e5'}}>Admin Panel</Text>
                            </View>
                        </Button>
                    </View>
                </Card>

                <Card style={{ marginTop: 24 }}>
                    <Text style={styles.sectionTitle}>Quantum Security Status</Text>
                    <View style={styles.optionRow}>
                        <Text style={styles.optionLabel}>Post-Quantum Encryption</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                             <View style={{width: 10, height: 10, borderRadius: 9999, backgroundColor: AppColors.success }}/>
                             <Text style={{fontWeight: 'bold', color: AppColors.success}}>ACTIVE</Text>
                        </View>
                    </View>
                    <View style={styles.optionRow}>
                        <Text style={styles.optionLabel}>Algorithm</Text>
                        <Text style={{fontFamily: 'monospace', color: AppColors.textSecondary}}>CRYSTALS-KYBER</Text>
                    </View>
                </Card>

                <Card style={{ marginTop: 24 }}>
                    <Text style={styles.sectionTitle}>Transaction Security</Text>
                    <View style={styles.optionRow}>
                        <Text style={styles.optionLabel}>Device Trust Score</Text>
                        {/* FIX: Use `deviceTrustScore` from the user object. */}
                        <Text style={{fontWeight: 'bold', color: user.deviceTrustScore > 80 ? AppColors.success : '#F59E0B'}}>{user.deviceTrustScore}/100</Text>
                    </View>
                     <View style={styles.optionRow}>
                        <Text style={styles.optionLabel}>Daily Send Limit (RWF)</Text>
                        <TextInput value={limit} onChangeText={setLimit} style={styles.limitInput} keyboardType='numeric' />
                    </View>
                    <Button onPress={handleLimitUpdate} style={{marginTop: 8}}>Update Limit</Button>
                </Card>

                <Card style={{ marginTop: 24 }}>
                    <Text style={styles.sectionTitle}>Biometric Authentication</Text>
                     <SecurityOption 
                        label="Fingerprint/Face ID"
                        // FIX: Use `biometricsEnabled` from the user object.
                        value={user.biometricsEnabled}
                        // FIX: Dispatch a valid action type.
                        onToggle={() => dispatch({ type: 'TOGGLE_BIOMETRICS' })}
                    />
                </Card>
                
                <TouchableOpacity style={styles.logoutButton} onPress={() => dispatch({ type: 'LOGOUT' })}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    main: { flex: 1, padding: 24 },
    profileCard: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    avatar: { width: 80, height: 80, backgroundColor: AppColors.primary, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    avatarText: { fontSize: 36, fontWeight: 'bold', color: 'white' },
    profileName: { fontSize: 22, fontWeight: 'bold', color: AppColors.textPrimary },
    profilePhone: { fontSize: 16, color: AppColors.textSecondary, marginTop: 4 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 8 },
    optionRow: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderColor: '#f3f4f6' },
    optionLabel: { fontSize: 16, fontWeight: '500', color: AppColors.textPrimary },
    toggleBase: { width: 50, height: 28, borderRadius: 9999, padding: 3, transition: 'background-color 0.2s' },
    toggleInactive: { backgroundColor: '#e5e7eb' },
    toggleActive: { backgroundColor: AppColors.success },
    toggleKnob: { width: 22, height: 22, backgroundColor: 'white', borderRadius: 9999, boxShadow: '0 1px 2px rgba(0,0,0,0.2)', transition: 'transform 0.2s' },
    toggleKnobActive: { transform: 'translateX(22px)' },
    limitInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, width: 120, textAlign: 'right'},
    logoutButton: { marginTop: 32, paddingVertical: 12, backgroundColor: '#FEE2E2', borderRadius: 8 },
    logoutButtonText: { color: AppColors.danger, textAlign: 'center', fontWeight: '600' },
});