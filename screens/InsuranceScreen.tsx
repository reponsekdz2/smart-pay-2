
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, Button, Card, AppColors, BottomNav } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';

const InsuranceCard = ({ title, icon, description }: { title: string, icon: string, description: string }) => (
    <Card style={styles.insuranceCard}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        <Button onPress={() => alert(`Getting a quote for ${title}...`)} variant="secondary" style={{ marginTop: 16 }}>Get a Quote</Button>
    </Card>
);

export const InsuranceScreen = () => {
    const { dispatch } = useAppContext();
    
    return (
        <Container>
            <Header title="Insurance" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <ScrollView style={styles.content}>
                <Text style={styles.pageTitle}>Protect What Matters Most</Text>
                <InsuranceCard
                    title="Health Insurance"
                    icon="❤️"
                    description="Comprehensive health coverage for you and your family."
                />
                <InsuranceCard
                    title="Motor Insurance"
                    icon="🚗"
                    description="Protect your vehicle against accidents and theft."
                />
                 <InsuranceCard
                    title="Home Insurance"
                    icon="🏠"
                    description="Secure your home and belongings from unforeseen events."
                />
            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    insuranceCard: {
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 16,
    },
    cardIcon: {
        fontSize: 48,
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardDescription: {
        color: AppColors.textSecondary,
    },
});