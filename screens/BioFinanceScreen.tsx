
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button, Card } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { DnaIcon, HeartIcon, BrainIcon } from '../components/icons';

const BioFeatureCard = ({ icon, title, description, actionText, onAction }: { icon: React.ReactNode, title: string, description: string, actionText: string, onAction: () => void}) => (
    <Card style={styles.card}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
            {icon}
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <Button onPress={onAction} variant="secondary" style={{marginTop: 16}}>{actionText}</Button>
    </Card>
);


export const BioFinanceScreen = () => {
    const { state, dispatch } = useAppContext();
    const { user } = state;

    return (
        <Container>
            <Header title="Bio-Financial Wellness" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.FUTURE_HUB })} />
            <ScrollView style={styles.content}>
                <BioFeatureCard 
                    icon={<HeartIcon style={styles.icon} />}
                    title="Health-Wealth Analytics"
                    description="Connect your wearable data to discover correlations between your physical health (stress, sleep, activity) and your financial behaviors. Get suggestions to improve both."
                    actionText="Connect Wearable"
                    onAction={() => alert('Searching for nearby health devices...')}
                />
                 <BioFeatureCard 
                    icon={<DnaIcon style={styles.icon} />}
                    title="DNA-Based Financial Planning"
                    description="Securely link your genetic profile to get AI-powered insights into your innate risk tolerance and longevity projections, helping you build a truly personalized financial plan."
                    actionText={user?.dnaProfileAvailable ? "View DNA Profile" : "Connect Genetic Data"}
                    onAction={() => alert('Redirecting to secure genetics provider...')}
                />
                 <BioFeatureCard 
                    icon={<BrainIcon style={styles.icon} />}
                    title="Neuro-Financial Optimization"
                    description="Coming Soon: Integrate with Brain-Computer Interface (BCI) devices to enable focus-based trading and emotion-aware investing, helping you overcome cognitive biases."
                    actionText="Learn More"
                    onAction={() => {}}
                />
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    card: { marginBottom: 24 },
    icon: { width: 28, height: 28, color: AppColors.primary, marginRight: 12 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: AppColors.textPrimary },
    description: { color: AppColors.textSecondary, lineHeight: 1.5 },
});