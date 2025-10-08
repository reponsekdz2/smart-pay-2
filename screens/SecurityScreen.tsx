import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Container, Header, BottomNav, Card, AppColors } from '../components/common';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from '../components/react-native';
import { ShieldCheckIcon, UserIcon } from '../components/icons';

const CircularProgress = ({ score }: { score: number }) => {
    const size = 120;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = score / 100;
    const strokeDashoffset = circumference * (1 - progress);

    const scoreColor = score > 80 ? AppColors.success : score > 50 ? '#F59E0B' : AppColors.danger;

    return (
        <View style={{ width: size, height: size, position: 'relative' }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    stroke={scoreColor}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s' }}
                />
            </svg>
            <View style={styles.progressTextContainer}>
                <Text style={[styles.progressScore, { color: scoreColor }]}>{score}</Text>
                <Text style={styles.progressLabel}>Secure</Text>
            </View>
        </View>
    );
};

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
    const { user } = state;

    if (!user) return null;

    return (
        <Container>
            <Header title="Security & Profile" />
            <ScrollView style={styles.main}>
                <Card style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
                    </View>
                    <Text style={styles.profileName}>{user.name}</Text>
                    <Text style={styles.profilePhone}>{user.phoneNumber}</Text>
                </Card>

                <Card style={{ marginTop: 24, alignItems: 'center' }}>
                    <Text style={styles.sectionTitle}>Security Score</Text>
                    <CircularProgress score={user.securityScore} />
                    <Text style={styles.scoreDescription}>Your account is well-protected. Keep up the good work!</Text>
                </Card>

                <Card style={{ marginTop: 24 }}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <SecurityOption 
                        label="Biometric Login"
                        value={user.biometricsEnabled}
                        onToggle={() => dispatch({ type: 'TOGGLE_BIOMETRICS' })}
                    />
                    <View style={styles.optionRow}>
                         <Text style={styles.optionLabel}>Change PIN</Text>
                         <Text style={styles.optionAction}>›</Text>
                    </View>
                    <View style={styles.optionRow}>
                         <Text style={styles.optionLabel}>Manage Devices</Text>
                         <Text style={styles.optionAction}>›</Text>
                    </View>
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
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16, textAlign: 'center' },
    progressTextContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    progressScore: { fontSize: 28, fontWeight: 'bold' },
    progressLabel: { fontSize: 12, color: AppColors.textSecondary },
    scoreDescription: { textAlign: 'center', color: AppColors.textSecondary, marginTop: 16, maxWidth: 250 },
    optionRow: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderColor: '#f3f4f6' },
    optionLabel: { fontSize: 16, fontWeight: '500', color: AppColors.textPrimary },
    optionAction: { fontSize: 20, color: AppColors.textSecondary },
    toggleBase: { width: 50, height: 28, borderRadius: 9999, padding: 3, transition: 'background-color 0.2s' },
    toggleInactive: { backgroundColor: '#e5e7eb' },
    toggleActive: { backgroundColor: AppColors.success },
    toggleKnob: { width: 22, height: 22, backgroundColor: 'white', borderRadius: 9999, boxShadow: '0 1px 2px rgba(0,0,0,0.2)', transition: 'transform 0.2s' },
    toggleKnobActive: { transform: 'translateX(22px)' },
    logoutButton: { marginTop: 32, paddingVertical: 12, backgroundColor: '#FEE2E2', borderRadius: 8 },
    logoutButtonText: { color: AppColors.danger, textAlign: 'center', fontWeight: '600' },
});
