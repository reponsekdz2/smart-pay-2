import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, ModernInput, GradientButton, AppColors } from '../components/common';
import { StyleSheet, View, Text, TouchableOpacity } from '../components/react-native';

export const LoginScreen = () => {
    const { state, dispatch } = useAppContext();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const demoUser = state.user;

    const handleLogin = () => {
        if (demoUser && phone === demoUser.phoneNumber && password === demoUser.password) {
            dispatch({ type: 'LOGIN', payload: demoUser });
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };
    
    const handleBiometricLogin = () => {
        if (demoUser) {
            dispatch({ type: 'LOGIN', payload: demoUser });
        }
    }

    return (
        <Container style={styles.container}>
            <Header title="Welcome Back" variant="transparent" onBack={() => dispatch({type: 'NAVIGATE', payload: Screen.LANDING})} />
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sign In</Text>
                    {demoUser && <Text style={styles.subtitle}>Enter details for {demoUser.name}</Text>}
                </View>

                <View style={styles.formContainer}>
                    <ModernInput icon="📱" label="Phone Number" type="tel" value={phone} onChangeText={setPhone} />
                    <ModernInput icon="🔒" label="Password" type="password" value={password} onChangeText={setPassword} />
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

                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>Or continue with</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialLoginContainer}>
                    <TouchableOpacity onPress={handleBiometricLogin} style={styles.socialButton}>
                        <Text style={styles.socialIcon}>🖐️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleBiometricLogin} style={styles.socialButton}>
                         <Text style={styles.socialIcon}>😀</Text>
                    </TouchableOpacity>
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
    subtitle: { color: AppColors.darkSubText },
    formContainer: { display: 'flex', flexDirection: 'column', gap: 16 },
    errorText: { color: '#F87171', fontSize: 14, marginTop: 16, textAlign: 'center' },
    forgotPasswordContainer: { width: '100%', textAlign: 'center', marginVertical: 16 },
    linkText: { color: AppColors.primary, fontWeight: '600' },
    signInButtonContainer: { marginTop: 16, width: '100%' },
    dividerContainer: { marginVertical: 32, display: 'flex', flexDirection: 'row', alignItems: 'center' },
    dividerLine: { flex: 1, borderTopWidth: 1, borderColor: AppColors.darkBorder },
    dividerText: { marginHorizontal: 16, color: AppColors.darkSubText, fontSize: 14 },
    socialLoginContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 16 },
    socialButton: { width: 64, height: 64, backgroundColor: AppColors.darkCard, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    socialIcon: { fontSize: 32 },
    signUpContainer: { marginTop: 'auto', textAlign: 'center', paddingVertical: 16 },
});
