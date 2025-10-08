import React, { useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors } from '../components/common';
import { StyleSheet, View, Text } from '../components/react-native';

export const QrScanScreen = () => {
    const { dispatch } = useAppContext();

    useEffect(() => {
        // Simulate scanning a QR code after a delay
        const timer = setTimeout(() => {
            // Pre-fill data as if a QR code was scanned
            dispatch({
                type: 'SET_TEMP_AUTH_DATA',
                payload: {
                    recipient: '0788123456', // Scanned recipient
                    amount: 500, // Scanned amount
                    reason: 'Payment via QR',
                },
            });
            dispatch({ type: 'NAVIGATE', payload: Screen.PAYMENT_GATEWAY });
        }, 4000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    return (
        <Container style={styles.container}>
            <Header title="Scan QR to Pay" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <View style={styles.content}>
                <View style={styles.cameraView}>
                    <Text style={styles.cameraText}>Camera view would appear here.</Text>
                    <View style={styles.scannerOverlay}>
                        <View style={styles.scannerLine} />
                        <View style={styles.corner} />
                        <View style={[styles.corner, { top: 0, right: 0, transform: 'rotate(90deg)' }]} />
                        <View style={[styles.corner, { bottom: 0, right: 0, transform: 'rotate(180deg)' }]} />
                        <View style={[styles.corner, { bottom: 0, left: 0, transform: 'rotate(270deg)' }]} />
                    </View>
                </View>
                <Text style={styles.instructions}>Position the QR code within the frame</Text>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: AppColors.background },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    cameraView: {
        width: 300,
        height: 300,
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    cameraText: {
        color: AppColors.subtext,
    },
    scannerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    scannerLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: AppColors.primary,
        boxShadow: `0 0 10px ${AppColors.primary}`,
        animation: 'scan 2s infinite linear',
    },
    corner: {
        position: 'absolute',
        width: 30,
        height: 30,
        border: `4px solid ${AppColors.primary}`,
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRadius: '8px 0 0 0',
    },
    instructions: {
        marginTop: 24,
        color: AppColors.subtext,
        fontSize: 16,
        textAlign: 'center',
    },
    // CSS Keyframes for animation
    '@keyframes scan': {
        '0%': { top: '0%' },
        '100%': { top: '100%' },
    },
});

// A bit of a hack to inject keyframes into the document head for the web version
const keyframes = `@keyframes scan { 0% { top: 0; } 100% { top: 100%; } }`;
const styleSheet = document.createElement("style");
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);