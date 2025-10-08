
import React from 'react';
import { View, Text, StyleSheet } from '../components/react-native';
import { Container, Header, Button } from '../components/common';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';

export const BiometricSetupScreen = () => {
    const { dispatch } = useAppContext();

    return (
        <Container>
            <Header title="Biometric Setup" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.SECURITY })} />
            <View style={styles.content}>
                <Text style={styles.icon}>Fingerprint Icon</Text>
                <Text style={styles.title}>Enable Biometric Login</Text>
                <Text style={styles.subtitle}>Use your fingerprint or face to log in securely and quickly.</Text>
                <Button onPress={() => alert('Biometrics enabled!')}>Enable Now</Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        textAlign: 'center',
    },
    icon: {
        fontSize: 48,
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 32,
        maxWidth: 300,
    }
});
