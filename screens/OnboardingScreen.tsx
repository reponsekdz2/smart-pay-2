import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Button, AppColors } from '../components/common';
import { View, Text, StyleSheet } from '../components/react-native';
import { SparklesIcon } from '../components/icons';

export const OnboardingScreen = () => {
    const { dispatch } = useAppContext();

    return (
        <Container style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <SparklesIcon style={styles.icon} />
                </View>
                <Text style={styles.title}>The Future of Finance is Here.</Text>
                <Text style={styles.subtitle}>Welcome to Smart Pay. Secure, intelligent, and seamless transactions for Rwanda.</Text>
                <Button onPress={() => dispatch({ type: 'NAVIGATE', payload: Screen.LOGIN })} style={styles.button}>
                    Create Account or Sign In
                </Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    content: {
        textAlign: 'center',
        alignItems: 'center',
        maxWidth: 400,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.primary,
        marginBottom: 32,
    },
    icon: {
        width: 60,
        height: 60,
        color: 'white',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: AppColors.text,
        marginBottom: 16,
        lineHeight: 1.2,
    },
    subtitle: {
        fontSize: 18,
        color: AppColors.subtext,
        marginBottom: 48,
    },
    button: {
        width: '100%',
        paddingVertical: 16,
    },
});