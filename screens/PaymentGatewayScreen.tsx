
import React, { useState } from 'react';
import { View, Text, StyleSheet } from '../components/react-native';
import { Container, Header, Button, AppColors } from '../components/common';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';

export const PaymentGatewayScreen = () => {
    const { state, dispatch } = useAppContext();
    const { tempAuthData } = state;
    const [pin, setPin] = useState('');

    const handleConfirm = () => {
        if (pin === '1234') { // Demo PIN
            alert('Payment Successful!');
            // In real app, create and dispatch transaction
            dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD });
        } else {
            alert('Incorrect PIN');
        }
    };

    return (
        <Container>
            <Header title="Confirm Payment" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <View style={styles.content}>
                <Text style={styles.label}>You are paying</Text>
                <Text style={styles.amount}>{tempAuthData?.amount || 0} RWF</Text>
                <Text style={styles.label}>To</Text>
                <Text style={styles.recipient}>{tempAuthData?.recipient || 'Unknown'}</Text>
                <Text style={styles.reason}>For: {tempAuthData?.reason || 'N/A'}</Text>

                <View style={styles.pinContainer}>
                    <Text style={styles.pinLabel}>Enter your PIN to confirm</Text>
                    <input 
                        type="password" 
                        value={pin} 
                        onChange={e => setPin(e.target.value)} 
                        maxLength={4} 
                        style={styles.pinInput}
                    />
                </View>

                <Button onPress={handleConfirm} disabled={pin.length !== 4}>Confirm Payment</Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
    },
    label: {
        color: AppColors.textSecondary,
        fontSize: 16,
    },
    amount: {
        fontSize: 48,
        fontWeight: 'bold',
        color: AppColors.primary,
        marginVertical: 8,
    },
    recipient: {
        fontSize: 24,
        fontWeight: '500',
    },
    reason: {
        color: AppColors.textSecondary,
        marginBottom: 48,
    },
    pinContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
    },
    pinLabel: {
        marginBottom: 16,
        fontWeight: '500',
    },
    pinInput: {
        width: 150,
        height: 50,
        textAlign: 'center',
        fontSize: 24,
        letterSpacing: '0.5em',
        borderWidth: 2,
        borderColor: AppColors.primary,
        borderRadius: 8,
    }
});
