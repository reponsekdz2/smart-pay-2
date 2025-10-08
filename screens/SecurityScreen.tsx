import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from '../components/react-native';
import { Container, Header, AppColors } from '../components/common';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { KeyIcon, ShieldCheckIcon, FingerPrintIcon, CloudArrowUpIcon, ServerStackIcon } from '../components/icons';

const SecurityOption = ({ title, description, onPress, icon }: { title: string, description: string, onPress: () => void, icon: React.ReactNode }) => (
    <TouchableOpacity style={styles.option} onPress={onPress}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={{flex: 1}}>
            <Text style={styles.optionTitle}>{title}</Text>
            <Text style={styles.optionDescription}>{description}</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
);

export const SecurityScreen = () => {
    const { dispatch } = useAppContext();

    const options = [
        { title: "Change PIN", description: "Update your 4-digit login PIN", icon: <KeyIcon style={styles.icon} />, screen: Screen.DASHBOARD },
        { title: "Two-Factor Authentication", description: "Add an extra layer of security", icon: <ShieldCheckIcon style={styles.icon} />, screen: Screen.MFA },
        { title: "Biometric Login", description: "Enable fingerprint or face ID", icon: <FingerPrintIcon style={styles.icon} />, screen: Screen.BIOMETRIC_SETUP },
        { title: "Sync Center", description: "Manage offline data and conflicts", icon: <CloudArrowUpIcon style={styles.icon} />, screen: Screen.SYNC_CENTER },
        { title: "Backend Services", description: "View system status", icon: <ServerStackIcon style={styles.icon} />, screen: Screen.ADMIN_DASHBOARD /* Placeholder */ },
    ]

    return (
        <Container>
            <Header title="Security & Profile" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <View style={styles.content}>
                {options.map(opt => (
                     <SecurityOption 
                        key={opt.title}
                        title={opt.title} 
                        description={opt.description} 
                        icon={opt.icon}
                        onPress={() => dispatch({ type: 'NAVIGATE', payload: opt.screen })}
                    />
                ))}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 24,
    },
    option: {
        backgroundColor: AppColors.cardBackground,
        borderWidth: 1,
        borderColor: AppColors.cardBorder,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        transition: 'background-color 0.2s ease-in-out',
        cursor: 'pointer',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        backgroundColor: AppColors.inputBackground,
    },
    icon: {
        width: 24,
        height: 24,
        color: AppColors.primary,
    },
    optionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: AppColors.text,
    },
    optionDescription: {
        color: AppColors.subtext,
        fontSize: 14,
        marginTop: 4,
    },
    arrow: {
        fontSize: 24,
        color: AppColors.subtext,
    }
});