import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button, Card } from '../components/common';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from '../components/react-native';
import { MicrophoneIcon, AtomIcon } from '../components/icons';
import { Prediction } from '../types';

const InfoCard = ({ title, value, unit }: { title: string, value: string | number, unit?: string }) => (
    <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>{title}</Text>
        <Text style={styles.infoCardValue}>{value} <Text style={styles.infoCardUnit}>{unit}</Text></Text>
    </View>
);

const StrategyCard = ({ title, description }: { title: string, description: string }) => (
    <View style={styles.strategyCard}>
        <Text style={styles.strategyTitle}>{title}</Text>
        <Text style={styles.strategyDescription}>{description}</Text>
    </View>
);

const PredictionCard = ({ title, description, onAction }: { title: string, description: string, onAction: () => void }) => (
    <View style={styles.predictionCard}>
        <Text style={styles.predictionTitle}>{title}</Text>
        <Text style={styles.strategyDescription}>{description}</Text>
        <Button onPress={onAction} variant="ghost" style={{alignSelf: 'flex-start', paddingLeft: 0, marginTop: 8}}>Create Savings Goal</Button>
    </View>
);

export const QuantumAdvisorScreen = () => {
    const { state, dispatch } = useAppContext();
    const { predictions } = state;

    return (
        <Container style={{backgroundColor: AppColors.background}}>
            <Header title="Quantum AI Advisor" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <ScrollView style={styles.content}>
                <View style={styles.assistantHeader}>
                    <AtomIcon style={styles.headerIcon} />
                    <Text style={styles.headerTitle}>Quantum Analysis Complete</Text>
                    <Text style={styles.headerSubtitle}>Ask me anything, from simple transfers to complex financial modeling.</Text>
                </View>

                <Card style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Neural Financial Analysis</Text>
                    <View style={styles.infoGrid}>
                        <InfoCard title="30-Year Wealth Projection" value="245.8M" unit="RWF" />
                        <InfoCard title="Life Event Prediction (Marriage)" value="85" unit="%" />
                        <InfoCard title="AI-Assessed Risk Tolerance" value="Moderate" />
                        <InfoCard title="Financial Health Score" value="91" unit="/100" />
                    </View>
                </Card>
                
                 <Card style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>AI-Powered Predictions</Text>
                    {predictions.map(p => (
                         <PredictionCard 
                            key={p.id}
                            title={p.title}
                            description={p.description}
                            onAction={() => dispatch({type: 'NAVIGATE', payload: Screen.GOALS})}
                         />
                    ))}
                </Card>

                 <Card style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>AI-Generated Financial Strategies</Text>
                    <StrategyCard title="Portfolio Optimization" description="Rebalance portfolio towards emerging tech and renewable energy sectors for a 2.5% projected alpha." />
                     <StrategyCard title="Tax Optimization" description="Utilize tax-loss harvesting in your crypto assets to offset RWF 250,000 in capital gains." />
                      <StrategyCard title="Estate Planning" description="Recommendation: Establish a trust to streamline inheritance and minimize tax liabilities." />
                </Card>

            </ScrollView>
            <View style={styles.micContainer}>
                <TouchableOpacity style={styles.micButton}>
                    <MicrophoneIcon style={styles.micIcon} />
                </TouchableOpacity>
                <Text style={styles.micLabel}>"Invest 100,000 in the Agri-Tech fund"</Text>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    assistantHeader: { alignItems: 'center', textAlign: 'center', marginBottom: 32 },
    headerIcon: { width: 64, height: 64, color: AppColors.primary, marginBottom: 16 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: AppColors.text, marginBottom: 8 },
    headerSubtitle: { fontSize: 16, color: AppColors.subtext, maxWidth: 300 },
    
    sectionCard: { backgroundColor: AppColors.cardBackground, borderWidth: 1, borderColor: AppColors.cardBorder, marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.text, marginBottom: 16 },
    
    infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
    infoCard: { backgroundColor: AppColors.background, padding: 12, borderRadius: 8 },
    infoCardTitle: { color: AppColors.subtext, fontSize: 12 },
    infoCardValue: { color: AppColors.text, fontSize: 20, fontWeight: 'bold' },
    infoCardUnit: { color: AppColors.subtext, fontSize: 14, fontWeight: 'normal'},

    strategyCard: { paddingVertical: 12, borderTopWidth: 1, borderColor: AppColors.cardBorder },
    strategyTitle: { color: AppColors.text, fontWeight: '600' },
    strategyDescription: { color: AppColors.subtext, fontSize: 14, marginTop: 4 },

    predictionCard: { paddingVertical: 12, borderTopWidth: 1, borderColor: AppColors.cardBorder, backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 12, borderRadius: 8},
    predictionTitle: { color: '#F59E0B', fontWeight: 'bold' },

    micContainer: { padding: 24, alignItems: 'center', borderTopWidth: 1, borderColor: AppColors.cardBorder, backgroundColor: AppColors.cardBackground },
    micButton: { width: 72, height: 72, borderRadius: 9999, backgroundColor: AppColors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${AppColors.primary}`},
    micIcon: { width: 36, height: 36, color: 'white' },
    micLabel: { marginTop: 12, color: AppColors.subtext, fontStyle: 'italic' }
});