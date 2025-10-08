import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, ModernInput, GradientButton, AppColors } from '../components/common';
import { StyleSheet, View, Text } from '../components/react-native';
import { Transaction, TransactionType, User } from '../types';

const RegistrationProgress = ({ step, total }: { step: number, total: number }) => (
    <View style={styles.progressContainer}>
        <View
            style={[styles.progressBar, { width: `${(step / total) * 100}%` }]}
        />
    </View>
);

const Step1_PersonalInfo = ({ onNext }: { onNext: (data: any) => void }) => {
    const [formData, setFormData] = useState({ name: '', phoneNumber: '' });
    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };
    return (
        <>
            <Text style={styles.title}>Personal Information</Text>
            <Text style={styles.subtitle}>Let's start with the basics.</Text>
            <View style={styles.formContainer}>
                <ModernInput icon="👤" label="Full Name" name="name" value={formData.name} onChangeText={(val) => handleChange('name', val)} />
                <ModernInput icon="📱" label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChangeText={(val) => handleChange('phoneNumber', val)} />
            </View>
            <View style={styles.buttonWrapper}>
                <GradientButton onPress={() => onNext(formData)} disabled={!formData.name || !formData.phoneNumber}>Next</GradientButton>
            </View>
        </>
    );
};

const Step2_Security = ({ onNext }: { onNext: (data: any) => void }) => {
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };
    const isPasswordValid = formData.password.length >= 6;
    const isConfirmed = formData.password === formData.confirmPassword;
    return (
        <>
            <Text style={styles.title}>Account Security</Text>
            <Text style={styles.subtitle}>Create a strong password for your account.</Text>
            <View style={styles.formContainer}>
                <ModernInput icon="🔒" label="Create Password" name="password" type="password" value={formData.password} onChangeText={(val) => handleChange('password', val)} />
                {formData.password && !isPasswordValid && <Text style={styles.validationText}>Password must be at least 6 characters.</Text>}
                <ModernInput icon="🔒" label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChangeText={(val) => handleChange('confirmPassword', val)} />
                {formData.confirmPassword && !isConfirmed && <Text style={styles.errorText}>Passwords do not match.</Text>}
            </View>
            <View style={styles.buttonWrapper}>
                <GradientButton onPress={() => onNext(formData)} disabled={!isPasswordValid || !isConfirmed}>Next</GradientButton>
            </View>
        </>
    );
};


const Step3_PINSetup = ({ onComplete }: { onComplete: (data: any) => void }) => {
    const [pin, setPin] = useState('');
    return (
        <>
            <Text style={styles.title}>Transaction PIN</Text>
            <Text style={styles.subtitle}>Create a 4-digit PIN for secure transactions.</Text>
            <ModernInput icon="🔢" label="4-Digit PIN" name="pin" type="password" value={pin} onChangeText={(val) => {if (val.length <= 4 && /^\d*$/.test(val)) setPin(val)}} />
            <View style={styles.buttonWrapper}>
                <GradientButton onPress={() => onComplete({ pin })} disabled={pin.length !== 4}>Complete Setup</GradientButton>
            </View>
        </>
    );
};


export const OnboardingScreen = () => {
    const { state, dispatch } = useAppContext();
    const [step, setStep] = useState(1);
    
    const handleNext = (data: any) => {
        dispatch({ type: 'SET_TEMP_AUTH_DATA', payload: data });
        setStep(step + 1);
    };

    const handleComplete = (data: any) => {
        const finalData = { ...state.tempAuthData, ...data };
        const newUser: User = {
            id: `user_${Date.now()}`,
            phoneNumber: finalData.phoneNumber,
            pin: finalData.pin,
            password: finalData.password,
            name: finalData.name,
            nationalId: `1199${Math.floor(10000000 + Math.random() * 90000000)}`, // Mock national ID
            balance: 1000,
            securityScore: 85,
            biometricsEnabled: false,
        };
        const initialTransaction: Transaction = {
            id: `txn_${Date.now()}`,
            type: TransactionType.RECEIVED,
            amount: 1000,
            description: 'Welcome Bonus',
            date: new Date().toISOString(),
            status: 'Successful',
            category: 'Bonus',
        };
        dispatch({ type: 'CREATE_ACCOUNT', payload: { user: newUser, initialTransactions: [initialTransaction] } });
        dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD });
    };

    const renderStep = () => {
        switch(step) {
            case 1: return <Step1_PersonalInfo onNext={handleNext} />;
            case 2: return <Step2_Security onNext={handleNext} />;
            case 3: return <Step3_PINSetup onComplete={handleComplete} />;
            default: return <Step1_PersonalInfo onNext={handleNext} />;
        }
    };

    return (
        <Container style={styles.container}>
            <Header title="Create Your Account" variant="transparent" onBack={() => step > 1 ? setStep(step - 1) : dispatch({ type: 'NAVIGATE', payload: Screen.LANDING })} />
            <View style={styles.content}>
                <RegistrationProgress step={step} total={3} />
                {renderStep()}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: AppColors.darkBackground },
    content: { flex: 1, padding: 24, display: 'flex', flexDirection: 'column' },
    progressContainer: { width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 9999, height: 6, marginBottom: 32 },
    progressBar: { backgroundColor: '#22C55E', height: 6, borderRadius: 9999, transition: 'width 0.5s' },
    title: { fontSize: 28, fontWeight: 'bold', color: AppColors.darkText, marginBottom: 8 },
    subtitle: { color: AppColors.darkSubText, marginBottom: 32 },
    formContainer: { display: 'flex', flexDirection: 'column', gap: 16 },
    buttonWrapper: { marginTop: 'auto', width: '100%', paddingVertical: 16 },
    validationText: { fontSize: 12, color: '#FBBF24' },
    errorText: { fontSize: 12, color: '#F87171' },
});
