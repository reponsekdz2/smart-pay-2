import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, ModernInput, GradientButton, AppColors, Button } from '../components/common';
import { StyleSheet, View, Text } from '../components/react-native';
// FIX: Import missing types
import { Transaction, TransactionType, User, Wallet, KycStatus, RiskLevel, UserType, UserStatus, TransactionStatus, TransactionCategory, WalletType, WalletStatus } from '../types';

const RegistrationProgress = ({ step, total }: { step: number, total: number }) => (
    <View style={styles.progressContainer}>
        <View
            style={[styles.progressBar, { width: `${(step / total) * 100}%` }]}
        />
    </View>
);

const Step1_PersonalInfo = ({ onNext }: { onNext: (data: any) => void }) => {
    const [formData, setFormData] = useState({ name: '', phoneNumber: '', nationalId: '' });
    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };
    return (
        <>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>Let's start with the basics.</Text>
            <View style={styles.formContainer}>
                <ModernInput icon="👤" label="Full Name" name="name" value={formData.name} onChangeText={(val) => handleChange('name', val)} />
                <ModernInput icon="📱" label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChangeText={(val) => handleChange('phoneNumber', val)} />
                <ModernInput icon="💳" label="National ID (NIDA)" name="nationalId" value={formData.nationalId} onChangeText={(val) => handleChange('nationalId', val)} />
            </View>
            <View style={styles.buttonWrapper}>
                <GradientButton onPress={() => onNext(formData)} disabled={!formData.name || !formData.phoneNumber || !formData.nationalId}>Next</GradientButton>
            </View>
        </>
    );
};

const Step2_KYC = ({ onNext }: { onNext: () => void }) => {
    const [verifying, setVerifying] = useState(true);
    React.useEffect(() => {
        const timer = setTimeout(() => setVerifying(false), 2500);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <Text style={styles.title}>KYC Verification</Text>
            <View style={styles.kycContainer}>
                {verifying ? (
                    <>
                        <View style={styles.loader} />
                        <Text style={styles.kycText}>Verifying your details with NIDA...</Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.kycIcon}>✅</Text>
                        <Text style={styles.kycText}>Verification Successful!</Text>
                    </>
                )}
            </View>
            <View style={styles.buttonWrapper}>
                <GradientButton onPress={onNext} disabled={verifying}>Continue</GradientButton>
            </View>
        </>
    );
};


const Step3_Security = ({ onNext }: { onNext: (data: any) => void }) => {
    const [formData, setFormData] = useState({ password: '', pin: '' });
    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };
    return (
        <>
            <Text style={styles.title}>Account Security</Text>
            <Text style={styles.subtitle}>Create a strong password and a 4-digit transaction PIN.</Text>
            <View style={styles.formContainer}>
                <ModernInput icon="🔒" label="Create Password" name="password" type="password" value={formData.password} onChangeText={(val) => handleChange('password', val)} />
                <ModernInput icon="🔢" label="4-Digit PIN" name="pin" type="password" value={formData.pin} onChangeText={(val) => {if (val.length <= 4 && /^\d*$/.test(val)) handleChange('pin', val)}} />
            </View>
            <View style={styles.buttonWrapper}>
                <GradientButton onPress={() => onNext(formData)} disabled={formData.password.length < 6 || formData.pin.length !== 4}>Next</GradientButton>
            </View>
        </>
    );
};

const Step4_Biometrics = ({ onComplete }: { onComplete: (data: any) => void }) => {
    return (
        <>
            <Text style={styles.title}>Biometric Setup</Text>
            <Text style={styles.subtitle}>Enable fingerprint or Face ID for faster, secure logins and payments.</Text>
            {/* FIX: Replaced non-standard 'marginVertical' with 'marginTop' and 'marginBottom' for web compatibility. */}
            <View style={{alignItems: 'center', marginTop: 48, marginBottom: 48}}>
                <Text style={{fontSize: 80}}>🖐️</Text>
            </View>
            <View style={styles.buttonWrapper}>
                <GradientButton onPress={() => onComplete({ biometricsEnabled: true })}>Enable Biometrics</GradientButton>
                <Button variant="ghost" onPress={() => onComplete({ biometricsEnabled: false })} style={{marginTop: 8}}>
                    <Text style={{color: AppColors.darkSubText}}>Skip for now</Text>
                </Button>
            </View>
        </>
    );
}

export const OnboardingScreen = () => {
    const { state, dispatch } = useAppContext();
    const [step, setStep] = useState(1);
    
    const handleNext = (data: any = {}) => {
        dispatch({ type: 'SET_TEMP_AUTH_DATA', payload: data });
        setStep(step + 1);
    };

    const handleComplete = (data: any) => {
        const finalData = { ...state.tempAuthData, ...data };
        // FIX: Construct a valid User object according to the `User` interface.
        const nameParts = finalData.name.split(' ');
        const newUser: User = {
            id: `user_${Date.now()}`,
            phone: finalData.phoneNumber,
            pin_hash: finalData.pin,
            first_name: nameParts[0],
            last_name: nameParts.slice(1).join(' '),
            national_id: finalData.nationalId,
            kyc_status: KycStatus.VERIFIED,
            risk_level: RiskLevel.LOW,
            user_type: UserType.CUSTOMER,
            status: UserStatus.ACTIVE,
            login_attempts: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            dailyTransactionLimit: 500000,
            deviceTrustScore: 95,
            biometricsEnabled: finalData.biometricsEnabled,
            dnaProfileAvailable: false,
        };

        // FIX: Create a wallet for the new user.
        const newWallet: Wallet = {
            id: `wallet_${Date.now()}`,
            user_id: newUser.id,
            wallet_number: `SPRW${finalData.phoneNumber}`,
            balance: 1000,
            available_balance: 1000,
            locked_balance: 0,
            currency: 'RWF',
            type: WalletType.PERSONAL,
            status: WalletStatus.ACTIVE,
            min_balance: 0,
            max_balance: 10000000,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        // FIX: Construct a valid Transaction object with all required fields and correct enum values.
        const initialTransaction: Transaction = {
            id: `txn_${Date.now()}`,
            reference: `WELCOME_${Date.now()}`,
            from_wallet_id: 'system_wallet',
            to_wallet_id: newWallet.id,
            from_user_id: 'system',
            to_user_id: newUser.id,
            amount: 1000,
            fee: 0,
            tax: 0,
            total_amount: 1000,
            currency: 'RWF',
            type: TransactionType.RECEIVED,
            description: 'Welcome Bonus',
            status: TransactionStatus.COMPLETED,
            category: TransactionCategory.BONUS,
            provider: 'INTERNAL',
            risk_score: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        // FIX: Provide the required `wallet` property in the action payload.
        dispatch({ type: 'CREATE_ACCOUNT', payload: { user: newUser, wallet: newWallet, initialTransactions: [initialTransaction] } });
    };

    const renderStep = () => {
        switch(step) {
            case 1: return <Step1_PersonalInfo onNext={handleNext} />;
            case 2: return <Step2_KYC onNext={handleNext} />;
            case 3: return <Step3_Security onNext={handleNext} />;
            case 4: return <Step4_Biometrics onComplete={handleComplete} />;
            default: return <Step1_PersonalInfo onNext={handleNext} />;
        }
    };

    return (
        <Container style={styles.container}>
            <Header title="" variant="transparent" onBack={() => step > 1 ? setStep(step - 1) : dispatch({ type: 'NAVIGATE', payload: Screen.LANDING })} />
            <View style={styles.content}>
                <RegistrationProgress step={step} total={4} />
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
    title: { fontSize: 28, fontWeight: 'bold', color: AppColors.darkText, marginBottom: 8, textAlign: 'center' },
    subtitle: { color: AppColors.darkSubText, marginBottom: 32, textAlign: 'center' },
    formContainer: { display: 'flex', flexDirection: 'column', gap: 16 },
    buttonWrapper: { marginTop: 'auto', width: '100%', paddingVertical: 16 },
    kycContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    kycIcon: { fontSize: 80 },
    kycText: { color: AppColors.darkText, fontSize: 18, marginTop: 16 },
    loader: { width: 60, height: 60, borderRadius: 9999, border: '5px solid #333', borderTopColor: AppColors.primary, animation: 'spin 1s linear infinite' },
});

const keyframes = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
const styleSheet = document.createElement("style");
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);