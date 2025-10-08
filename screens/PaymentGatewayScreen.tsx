import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header } from '../components/common';
import { View, Text } from '../components/react-native';

export const PaymentGatewayScreen = () => {
    const { dispatch } = useAppContext();
    return (
        <Container>
            <Header title="Payment Gateway" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Payment Gateway Screen</Text>
            </View>
        </Container>
    );
};
