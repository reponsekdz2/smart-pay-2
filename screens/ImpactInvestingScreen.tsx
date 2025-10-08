import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button, Card } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { ImpactFund, SDGProgress } from '../types';
import { LeafIcon } from '../components/icons';

const FundCard = ({ fund }: { fund: ImpactFund }) => {
    const { state, dispatch } = useAppContext();
    const handleInvest = () => {
        const amount = parseInt(prompt(`How much to invest in ${fund.title}? (Min: ${fund.minInvestment})`) || '0');
        if (amount >= fund.minInvestment && state.user && state.user.balance >= amount) {
             dispatch({ type: 'INVEST_IMPACT_FUND', payload: { fundId: fund.id, amount } });
             dispatch({ type: 'UPDATE_BALANCE', payload: state.user.balance - amount });
             alert(`Successfully invested ${amount} RWF!`);
        } else {
            alert('Invalid amount or insufficient balance.');
        }
    };
    return (
        <Card style={styles.card}>
            <Text style={styles.fundCategory}>{fund.category}</Text>
            <Text style={styles.fundTitle}>{fund.title}</Text>
            <Text style={styles.fundDescription}>{fund.description}</Text>
            <View style={styles.fundMetrics}>
                <Text>APY: <Text style={{color: AppColors.success}}>{fund.apy}%</Text></Text>
                <Text>Your Investment: <Text style={{fontWeight: 'bold'}}>{fund.investedAmount.toLocaleString()} RWF</Text></Text>
            </View>
            <Button onPress={handleInvest} style={{marginTop: 16}}>Invest Now</Button>
        </Card>
    );
};

const SDGTracker = ({ progress }: { progress: SDGProgress[] }) => (
    <Card style={styles.card}>
        <Text style={styles.sectionTitle}>SDG Alignment</Text>
        {progress.map(p => (
            <View key={p.goal} style={styles.sdgItem}>
                <Text style={styles.sdgTitle}>Goal {p.goal}: {p.title}</Text>
                <View style={styles.sdgProgressContainer}>
                    <View style={[styles.sdgProgressBar, {width: `${p.impact}%`}]} />
                </View>
            </View>
        ))}
    </Card>
);


export const ImpactInvestingScreen = () => {
    const { state, dispatch } = useAppContext();

    return (
        <Container>
            <Header title="Impact Investing" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.FUTURE_HUB })} />
            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rwanda-Focused Impact Funds</Text>
                    {state.impactFunds.map(fund => <FundCard key={fund.id} fund={fund} />)}
                </View>
                <View style={styles.section}>
                    <SDGTracker progress={state.sdgProgress} />
                </View>
                <Card style={styles.card}>
                    <Text style={styles.sectionTitle}>Green Banking</Text>
                    <View style={{alignItems: 'center'}}>
                        <LeafIcon style={{width: 48, height: 48, color: AppColors.success}}/>
                        {/* FIX: Replace non-standard 'marginVertical' with 'marginTop' and 'marginBottom' for web compatibility. */}
                        <Text style={{marginTop: 8, marginBottom: 8}}>Your Monthly Carbon Footprint:</Text>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>350 kg CO2</Text>
                        {/* FIX: Add missing 'onPress' prop to satisfy the Button component's requirements. */}
                        <Button onPress={() => alert('Offsetting carbon footprint...')} variant='ghost' style={{marginTop: 8}}>Offset Now</Button>
                    </View>
                </Card>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    card: { marginBottom: 16 },
    fundCategory: { fontSize: 12, fontWeight: '500', color: AppColors.primary, marginBottom: 4 },
    fundTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    fundDescription: { color: AppColors.textSecondary, marginBottom: 16 },
    fundMetrics: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#f3f4f6', paddingTop: 12 },
    sdgItem: { marginBottom: 12 },
    sdgTitle: { fontWeight: '500' },
    sdgProgressContainer: { width: '100%', backgroundColor: '#e5e7eb', borderRadius: 9999, height: 8, marginTop: 4 },
    sdgProgressBar: { backgroundColor: AppColors.primary, height: '100%', borderRadius: 9999 }
});