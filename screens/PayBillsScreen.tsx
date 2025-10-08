

import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
// FIX: The 'Input' component is not exported from common components. Replaced with the correctly exported 'ModernInput'.
import { Container, Header, Button, AppColors, ModernInput } from '../components/common';
import { View, Text, StyleSheet, Picker } from '../components/react-native';

export const PayBillsScreen = () => {
    const { dispatch } = useAppContext();
    const [biller, setBiller] = useState('canal');
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState('');

    const handlePay = () => {
        if (!account || !amount) {
            alert('Please fill all fields.');
            return;
        }
        alert(`Paying ${amount} RWF to ${biller} for account ${account}...`);
        // In a real app, dispatch transaction and update balance here.
        dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD });
    };

    return (
        <Container>
            <Header title="Pay Bills" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <View style={styles.content}>
                <View style={{marginBottom: 16}}>
                    <Text style={styles.label}>Select Biller</Text>
                    <Picker selectedValue={biller} onValueChange={setBiller} style={styles.picker}>
                        <Picker.Item label="Canal+" value="canal" />
                        <Picker.Item label="StarTimes" value="startimes" />
                        <Picker.Item label="EUCL" value="eucl" />
                        <Picker.Item label="WASAC" value="wasac" />
                    </Picker>
                </View>

                {/* FIX: Use ModernInput component. */}
                <ModernInput label="Account / Meter Number" value={account} onChangeText={setAccount} placeholder="123456789" />
                <ModernInput label="Amount (RWF)" value={amount} onChangeText={setAmount} placeholder="10000" keyboardType="numeric" />
                
                <Button onPress={handlePay}>Pay Now</Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 24,
    },
    label: {
        marginBottom: 8,
        color: AppColors.textPrimary,
        fontWeight: '500',
    },
    picker: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: AppColors.surface,
    },
});