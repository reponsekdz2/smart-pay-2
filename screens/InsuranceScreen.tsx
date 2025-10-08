import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, Button, Card, AppColors } from '../components/common';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'components/react-native';
import { Transaction, TransactionType, Policy } from '../types';
import { HeartIcon } from '../components/icons';

const availablePolicies = [
    { id: 'ins_health_1', name: 'Basic Health Cover', premium: 500, coverage: 25000, description: 'Covers basic hospital consultations and medication.' },
    { id: 'ins_accident_1', name: 'Personal Accident', premium: 300, coverage: 50000, description: 'Protection against accidental injury or death.' },
    { id: 'ins_crop_1', name: 'Crop Failure Shield', premium: 1000, coverage: 75000, description: 'Protects your farm harvest from unforeseen events.' },
];

const PolicyCard = ({ policy, onSubscribe, subscribed }: { policy: Omit<Policy, 'nextDueDate'> & { description: string }, onSubscribe: () => void, subscribed: boolean }) => (
    <Card style={styles.policyCard}>
        <View style={styles.policyHeader}>
            <HeartIcon style={{width: 24, height: 24, color: AppColors.primary, marginRight: 12}} />
            <Text style={styles.policyName}>{policy.name}</Text>
        </View>
        <Text style={styles.policyDescription}>{policy.description}</Text>
        <View style={styles.policyDetails}>
            <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Premium</Text>
                <Text style={styles.detailValue}>KES {policy.premium}/mo</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Coverage</Text>
                <Text style={styles.detailValue}>Up to KES {policy.coverage.toLocaleString()}</Text>
            </View>
        </View>
        <Button onPress={onSubscribe} disabled={subscribed} variant={subscribed ? 'secondary' : 'primary'} style={{marginTop: 16}}>
            {subscribed ? 'Subscribed' : 'Get Covered'}
        </Button>
    </Card>
);

export const InsuranceScreen = () => {
    const { state, dispatch } = useAppContext();
    const { user, policies } = state;

    const handleSubscribe = (policy: Omit<Policy, 'nextDueDate'>) => {
        if (!user || user.balance < policy.premium) {
            alert("Insufficient balance to subscribe.");
            return;
        }

        const newPolicy: Policy = {
            ...policy,
            nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        };

        const newTransaction: Transaction = {
            id: `txn_${Date.now()}`,
            type: TransactionType.BILL_PAYMENT,
            amount: -policy.premium,
            description: `Insurance: ${policy.name}`,
            date: new Date().toISOString(),
            status: 'Successful',
            category: 'Insurance',
        };

        dispatch({ type: 'ADD_POLICY', payload: newPolicy });
        dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
        dispatch({ type: 'UPDATE_BALANCE', payload: user.balance - policy.premium });
    };

    const isSubscribed = (policyId: string) => policies.some(p => p.id === policyId);

    return (
        <Container>
            <Header title="Insurance" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Protect What Matters Most</Text>
                <Text style={styles.subtitle}>Affordable and reliable insurance plans at your fingertips.</Text>
                <View style={styles.policyList}>
                    {availablePolicies.map(p => (
                        <PolicyCard 
                            key={p.id} 
                            policy={p} 
                            onSubscribe={() => handleSubscribe(p)}
                            subscribed={isSubscribed(p.id)}
                        />
                    ))}
                </View>

                {policies.length > 0 && (
                     <View style={{marginTop: 32}}>
                         <Text style={styles.title}>Your Active Policies</Text>
                         <Card>
                         {policies.map(p => (
                            <View key={p.id} style={styles.activePolicy}>
                                <Text style={styles.activePolicyName}>{p.name}</Text>
                                <Text style={styles.activePolicyDate}>Next payment: {new Date(p.nextDueDate).toLocaleDateString()}</Text>
                            </View>
                         ))}
                         </Card>
                    </View>
                )}
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    title: { fontSize: 22, fontWeight: 'bold', color: AppColors.textPrimary, textAlign: 'center' },
    subtitle: { color: AppColors.textSecondary, textAlign: 'center', marginBottom: 24 },
    policyList: { display: 'flex', flexDirection: 'column', gap: 16 },
    policyCard: {},
    policyHeader: { display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    policyName: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary },
    policyDescription: { color: AppColors.textSecondary, marginBottom: 16 },
    policyDetails: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#f3f4f6', paddingTop: 16 },
    detailItem: { flex: 1 },
    detailLabel: { fontSize: 12, color: AppColors.textSecondary },
    detailValue: { fontWeight: '600', color: AppColors.textPrimary },
    activePolicy: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#f3f4f6' },
    activePolicyName: { fontWeight: '500' },
    activePolicyDate: { color: AppColors.textSecondary },
});