import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, AppColors, ModernInput, Button } from '../components/common';
import { View, Text, StyleSheet, TouchableOpacity } from '../components/react-native';
import { FingerPrintIcon, LockClosedIcon, UserIcon } from '../components/icons';

export const LoginScreen = () => {
    const { state, dispatch } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const user = state.users.find(u => u.email === email);
        if (user && password === 'password123') { // Demo password
            setError('');
            dispatch({ type: 'SET_TEMP_LOGIN_DATA', payload: { user } });
            dispatch({ type: 'NAVIGATE', payload: Screen.MFA });
        } else {
             const adminUser = state.users.find(u => u.email.includes('admin') && u.email === email);
             if (adminUser && password === 'password123') {
                setError('');
                dispatch({ type: 'LOGIN', payload: { user: adminUser } });
                return;
             }
            setError('Invalid email or password.');
        }
    };

    return (
        <Container style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Log in to your Smart Pay account.</Text>
                
                <ModernInput 
                    label="Email" 
                    value={email} 
                    onChangeText={setEmail} 
                    keyboardType="email-address"
                    icon={<UserIcon />} 
                />
                <ModernInput 
                    label="Password" 
                    value={password} 
                    onChangeText={setPassword} 
                    secureTextEntry 
                    icon={<LockClosedIcon />}
                />

                {error && <Text style={styles.errorText}>{error}</Text>}

                <Button onPress={handleLogin} style={styles.button}>
                    Sign In
                </Button>
                
                <Button variant="ghost" style={{marginTop: 16}}>
                    <FingerPrintIcon style={{width: 24, height: 24, marginRight: 8}}/>
                    Login with Biometrics
                </Button>

                <TouchableOpacity style={{ marginTop: 24 }}>
                    <Text style={{ color: AppColors.primary, textAlign: 'center' }}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 32,
    },
    content: {
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: AppColors.text,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: AppColors.subtext,
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        marginTop: 16,
        width: '100%',
    },
    errorText: {
        color: AppColors.danger,
        textAlign: 'center',
        marginBottom: 16,
    }
});