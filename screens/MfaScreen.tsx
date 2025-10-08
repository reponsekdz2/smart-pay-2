import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, GradientButton, AppColors } from '../components/common';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from '../components/react-native';

export const MfaScreen = () => {
    const { state, dispatch } = useAppContext();
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [error, setError] = useState('');
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const demoOtp = "123456";

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value;
        if (!/^[0-9]$/.test(value) && value !== '') return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus next input
        if (value !== '' && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const enteredOtp = otp.join('');
        if (enteredOtp === demoOtp) {
            // FIX: Safely access user data and dispatch LOGIN with the required payload.
            if (state.tempLoginData && 'user' in state.tempLoginData) {
                dispatch({ type: 'LOGIN', payload: { user: state.tempLoginData.user } });
                dispatch({ type: 'ADD_NOTIFICATION', payload: { message: `Welcome back, ${state.tempLoginData.user.first_name}!`, type: 'success' } });
            } else {
                // Handle case where tempLoginData is not for a regular user (e.g., admin) or is null
                setError('An error occurred. Please try logging in again.');
            }
        } else {
            setError('Invalid OTP code. Please try again.');
            setOtp(new Array(6).fill(''));
            inputsRef.current[0]?.focus();
        }
    };

    return (
        <Container style={styles.container}>
            <Header title="Two-Factor Authentication" variant="transparent" onBack={() => dispatch({type: 'NAVIGATE', payload: Screen.LOGIN})} />
            <View style={styles.content}>
                <Text style={styles.title}>Enter OTP</Text>
                <Text style={styles.subtitle}>A 6-digit code has been sent to your phone number.</Text>
                <Text style={styles.demoOtp}>Demo code: {demoOtp}</Text>

                <View style={styles.otpContainer}>
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            style={styles.otpInput}
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            onFocus={e => e.target.select()}
// FIX: The ref callback in React expects a function that returns `void`. An arrow function with an expression body `(el => ref.current = el)` implicitly returns the assigned value, causing a type mismatch. Changing it to a block body `{ ref.current = el; }` ensures the function returns `void` and satisfies the type checker.
                            ref={el => { inputsRef.current[index] = el; }}
                        />
                    ))}
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}
                
                <View style={styles.buttonWrapper}>
                    <GradientButton onPress={handleSubmit} disabled={otp.join('').length !== 6}>
                        Verify Code
                    </GradientButton>
                </View>
                
                 <View style={styles.resendContainer}>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Resend Code</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: AppColors.darkBackground },
    content: { flex: 1, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', color: AppColors.darkText, marginTop: 32 },
    subtitle: { color: AppColors.darkSubText, marginTop: 8, textAlign: 'center', maxWidth: 300 },
    demoOtp: { color: AppColors.primary, backgroundColor: AppColors.darkCard, padding: 8, borderRadius: 4, marginTop: 16, fontFamily: 'monospace'},
    otpContainer: { flexDirection: 'row', gap: 10, marginVertical: 48 },
    otpInput: {
        width: 48,
        height: 56,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: AppColors.darkCard,
        color: AppColors.darkText,
        borderWidth: 1,
        borderColor: AppColors.darkBorder,
        borderRadius: 8,
    },
    errorText: { color: '#F87171', fontSize: 14, textAlign: 'center' },
    buttonWrapper: { width: '100%', maxWidth: 320, marginTop: 24 },
    resendContainer: { marginTop: 24 },
    linkText: { color: AppColors.primary, fontWeight: '600' },
});