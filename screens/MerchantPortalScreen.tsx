import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Card, Button } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { BusinessMetric } from '../types';

const MetricCard = ({ metric }: { metric: BusinessMetric }) => {
    const isUp = metric.trend === 'up';
    return (
        <Card style={styles.metricCard}>
            <Text style={styles.metricTitle}>{metric.title}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={[styles.metricChange, { color: isUp ? AppColors.success : AppColors.danger }]}>
                {isUp ? '↑' : '↓'} {metric.change}
            </Text>
        </Card>
    );
};

export const MerchantPortalScreen = () => {
    const { state, dispatch } = useAppContext();
    const { user, businessMetrics } = state;

    return (
        <Container>
            <Header title={`${user?.name}'s Business`} onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.SECURITY })} />
            <ScrollView style={styles.content}>
                <Text style={styles.dashboardTitle}>Business Dashboard</Text>
                <View style={styles.metricsGrid}>
                    {businessMetrics.map(metric => <MetricCard key={metric.title} metric={metric} />)}
                </View>

                <Card style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Payment Solutions</Text>
                    <Button onPress={() => {}} style={{marginBottom: 8}}>Create Payment Link</Button>
                    <Button onPress={() => {}} variant="secondary">Generate Invoice</Button>
                </Card>

                <Card style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Inventory Management</Text>
                     <Text style={styles.placeholderText}>Low stock alerts and product management will appear here.</Text>
                </Card>

                 <Card style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Customer Relationship Mgmt</Text>
                    <Text style={styles.placeholderText}>Loyalty programs and customer database will be managed here.</Text>
                </Card>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    dashboardTitle: { fontSize: 24, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    metricsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 },
    metricCard: { flex: 1 },
    metricTitle: { fontSize: 14, color: AppColors.textSecondary },
    metricValue: { fontSize: 22, fontWeight: 'bold', marginVertical: 8 },
    metricChange: { fontWeight: '500' },
    sectionCard: { marginTop: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    placeholderText: { color: AppColors.textSecondary, fontStyle: 'italic' },
});
