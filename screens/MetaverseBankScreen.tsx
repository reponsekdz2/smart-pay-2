import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button, Card, GradientButton } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { CubeTransparentIcon } from '../components/icons';

const MetaverseFeatureCard = ({ title, description, buttonText, icon }: { title: string, description: string, buttonText: string, icon: string }) => (
    <Card style={styles.featureCard}>
        <Text style={styles.featureIcon}>{icon}</Text>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
        <Button onPress={() => alert(`${title} loading...`)} style={{ marginTop: 16 }}>{buttonText}</Button>
    </Card>
);

export const MetaverseBankScreen = () => {
    const { dispatch } = useAppContext();

    return (
        <Container style={{backgroundColor: AppColors.darkBackground}}>
            <Header title="Metaverse Banking" variant="transparent" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.FUTURE_HUB })} />
            <ScrollView style={styles.content}>
                <View style={styles.hero}>
                    <CubeTransparentIcon style={styles.heroIcon} />
                    <Text style={styles.heroTitle}>Enter the Financial Metaverse</Text>
                    <Text style={styles.heroSubtitle}>A new dimension for your wealth. Experience banking like never before.</Text>
                </View>
                
                <MetaverseFeatureCard 
                    icon="🏦"
                    title="3D Virtual Bank Branch"
                    description="Meet with AI tellers, explore your wealth in our NFT gallery, and attend live talks in the financial theater."
                    buttonText="Enter Virtual Branch"
                />
                 <MetaverseFeatureCard 
                    icon="📈"
                    title="VR Trading Floor"
                    description="Visualize market data in 3D, execute trades with hand gestures, and collaborate with other traders in real-time."
                    buttonText="Launch VR Trading"
                />
                 <MetaverseFeatureCard 
                    icon="🏘️"
                    title="Digital Twin Economy"
                    description="Manage virtual versions of your real-world assets, simulate business ideas, and explore new digital investment opportunities."
                    buttonText="Open Digital Twin"
                />

            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    hero: { alignItems: 'center', textAlign: 'center', marginBottom: 32 },
    heroIcon: { width: 80, height: 80, color: AppColors.primary },
    heroTitle: { fontSize: 28, fontWeight: 'bold', color: AppColors.darkText, marginTop: 16 },
    heroSubtitle: { color: AppColors.darkSubText, marginTop: 8, maxWidth: 320 },
    
    featureCard: {
        backgroundColor: AppColors.darkCard,
        borderWidth: 1,
        borderColor: AppColors.darkBorder,
        marginBottom: 16,
        alignItems: 'center',
        textAlign: 'center',
        padding: 24,
    },
    featureIcon: { fontSize: 48 },
    featureTitle: { color: AppColors.darkText, fontSize: 20, fontWeight: 'bold', marginTop: 16 },
    featureDescription: { color: AppColors.darkSubText, marginTop: 8 },
});