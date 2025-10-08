import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, ModernInput, GradientButton, AppColors } from '../components/common';
import { StyleSheet, View, Text, TouchableOpacity } from '../components/react-native';
import { AdminUser, User } from '../types';

export const LoginScreen = () => {
    const { state, dispatch } = useAppContext();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const regularUserForDemo = state.users[0]; // For easy login to user account

    // Hardcoded admin user from prompt
    const adminUser: AdminUser = {
        id: 'admin_001',
        phone: '0789447620',
        email: 'admin@smartpay.rw',
        username: 'superadmin',
        password_hash: '123456',
        first_name: 'System',
        last_name: 'Administrator',
        role: 'SUPER_ADMIN' as any,
        permissions: { users: ["create", "read", "update", "delete"], transactions: ["full"], system: ["full_access"] },
        two_factor_enabled: true,
        status: 'ACTIVE',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        login_attempts: 0
    };


    const handleLogin = () => {
        // Check for Admin Login
        if (phone === adminUser.phone && password === adminUser.password_hash) {
            dispatch({ type: 'ADMIN_LOGIN', payload: { adminUser } });
            dispatch({ type: 'ADD_NOTIFICATION', payload: { message: `Welcome Super Admin, ${adminUser.first_name}!`, type: 'success' } });
            return;
        }

        // Check for Regular User Login
        const user = state.users.find(u => u.phone === phone);
        if (user && password === user.pin_hash) { // Using pin_hash for password in this simulation
             // In a real app, MFA would be required. Here we simplify.
             dispatch({ type: 'LOGIN', payload: { user } });
             dispatch({ type: 'ADD_NOTIFICATION', payload: { message: `Welcome back, ${user.first_name}!`, type: 'success' } });
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };
    
    return (
        <Container style={styles.container}>
            <Header title="Welcome Back" variant="transparent" onBack={() => dispatch({type: 'NAVIGATE', payload: Screen.LANDING})} />
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sign In</Text>
                    <Text style={styles.subtitle}>
                        Demo User: {regularUserForDemo.phone} / {regularUserForDemo.pin_hash}
                    </Text>
                     <Text style={styles.subtitle}>
                        Admin: {adminUser.phone} / {adminUser.password_hash}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <ModernInput icon="📱" label="Phone Number" type="tel" value={phone} onChangeText={setPhone} />
                    <ModernInput icon="🔒" label="Password or PIN" type="password" value={password} onChangeText={setPassword} />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <View style={styles.forgotPasswordContainer}>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.signInButtonContainer}>
                    <GradientButton onPress={handleLogin}>Sign In</GradientButton>
                </View>

                <View style={styles.signUpContainer}>
                    <Text style={styles.subtitle}>
                        Don't have an account?{' '}
                        <TouchableOpacity onPress={() => dispatch({type: 'NAVIGATE', payload: Screen.ONBOARDING_PHONE})}>
                            <Text style={styles.linkText}>Sign Up</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: AppColors.darkBackground },
    content: { flex: 1, padding: 24, display: 'flex', flexDirection: 'column' },
    titleContainer: { textAlign: 'center', marginVertical: 16 },
    title: { fontSize: 28, fontWeight: 'bold', color: AppColors.darkText },
    subtitle: { color: AppColors.darkSubText, marginTop: 4 },
    formContainer: { display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 },
    errorText: { color: '#F87171', fontSize: 14, marginTop: 16, textAlign: 'center' },
    forgotPasswordContainer: { width: '100%', textAlign: 'center', marginVertical: 16 },
    linkText: { color: AppColors.primary, fontWeight: '600' },
    signInButtonContainer: { marginTop: 16, width: '100%' },
    signUpContainer: { marginTop: 'auto', textAlign: 'center', paddingVertical: 16 },
});
