import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Button, AppColors } from '../components/common';
import { View, Text, StyleSheet } from '../components/react-native';

export const OnboardingScreen = () => {
    const { dispatch } = useAppContext();

    return (
        <Container style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to QuantumBank</Text>
                <Text style={styles.subtitle}>The future of finance, in your pocket. Manage your money, invest in your future, and explore a new financial dimension.</Text>
                <Button onPress={() => dispatch({ type: 'NAVIGATE', payload: Screen.LOGIN })}>
                    Get Started
                </Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.primary,
    },
    content: {
        padding: 24,
        textAlign: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 32,
        maxWidth: 320,
    },
});
