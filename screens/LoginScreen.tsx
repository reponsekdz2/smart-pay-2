import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Button, AppColors, ModernInput } from '../components/common';
import { View, Text, StyleSheet } from '../components/react-native';

export const LoginScreen = () => {
    const { state, dispatch } = useAppContext();
    const [email, setEmail] = useState('john.doe@example.com');
    const [pin, setPin] = useState('1234');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const user = state.users.find(u => u.email === email);
        if (user && pin === '1234') { // Using a demo PIN
             dispatch({ type: 'LOGIN', payload: { user } });
             dispatch({ type: 'ADD_NOTIFICATION', payload: { message: `Welcome back, ${user.first_name}!`, type: 'success' } });
        } else {
            setError('Invalid email or PIN.');
        }
    };

    return (
        <Container style={styles.container}>
            <View style={styles.loginBox}>
                <Text style={styles.title}>Login</Text>
                {error && <Text style={styles.errorText}>{error}</Text>}
                <ModernInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <ModernInput
                    label="PIN"
                    value={pin}
                    onChangeText={setPin}
                />
                <Button onPress={handleLogin} style={{marginTop: 16}}>Login</Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBox: {
        width: '100%',
        maxWidth: 400,
        padding: 24,
        backgroundColor: AppColors.surface,
        borderRadius: 12,
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    errorText: {
        color: AppColors.danger,
        textAlign: 'center',
        marginBottom: 16,
    }
});
