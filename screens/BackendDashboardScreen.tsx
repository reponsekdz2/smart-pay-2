import React, { useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { Microservice, MicroserviceStatus } from '../types';

const ServiceCard = ({ service }: { service: Microservice }) => {
    const statusColors = {
        [MicroserviceStatus.ONLINE]: '#42B72A',
        [MicroserviceStatus.DEGRADED]: '#F59E0B',
        [MicroserviceStatus.OFFLINE]: '#FA383E',
    };
    const Icon = service.icon;

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Icon style={{ width: 24, height: 24, marginRight: 8, color: AppColors.textPrimary }} />
                <Text style={styles.cardTitle}>{service.name}</Text>
                <View style={[styles.statusIndicator, { backgroundColor: statusColors[service.status] }]} />
            </View>
            <View style={styles.metricsContainer}>
                <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Status</Text>
                    <Text style={[styles.metricValue, { color: statusColors[service.status] }]}>{service.status}</Text>
                </View>
                <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>API Calls/sec</Text>
                    <Text style={styles.metricValue}>{service.apiCalls}</Text>
                </View>
                <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Avg Latency</Text>
                    <Text style={styles.metricValue}>{service.avgLatency}ms</Text>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                <Button onPress={() => alert(`Showing logs for ${service.name}...`)} variant="ghost" style={styles.actionButton}>View Logs</Button>
                <Button onPress={() => alert(`Restarting ${service.name}...`)} variant="ghost" style={styles.actionButton}>Restart</Button>
            </View>
        </View>
    );
};

export const BackendDashboardScreen = () => {
    const { state, dispatch } = useAppContext();
    const { backendServices } = state;

    useEffect(() => {
        const interval = setInterval(() => {
            backendServices.forEach(service => {
                if (service.status !== MicroserviceStatus.OFFLINE) {
                    const newApiCalls = Math.max(0, service.apiCalls + Math.floor(Math.random() * 21) - 10); // Fluctuate by +/- 10
                    const newLatency = Math.max(20, service.avgLatency + Math.floor(Math.random() * 11) - 5); // Fluctuate by +/- 5
                    dispatch({
                        type: 'UPDATE_SERVICE_METRICS',
                        payload: { id: service.id, metrics: { apiCalls: newApiCalls, avgLatency: newLatency } },
                    });
                }
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [backendServices, dispatch]);

    const appServices = backendServices.filter(s => s.id.endsWith('-service') || s.id.endsWith('gateway'));
    const infraServices = backendServices.filter(s => !appServices.some(as => as.id === s.id));

    return (
        <Container style={{ backgroundColor: AppColors.background }}>
            <Header title="Backend Services" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.SECURITY })} />
            <ScrollView style={styles.content}>
                <Text style={styles.sectionTitle}>Application Microservices</Text>
                <View style={styles.grid}>
                    {appServices.map(service => <ServiceCard key={service.id} service={service} />)}
                </View>

                <Text style={styles.sectionTitle}>Infrastructure & Data</Text>
                <View style={styles.grid}>
                    {infraServices.map(service => <ServiceCard key={service.id} service={service} />)}
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: AppColors.textPrimary,
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: '#e5e7eb',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
        marginBottom: 32,
    },
    card: {
        backgroundColor: AppColors.surface,
        borderRadius: 12,
        padding: 16,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: AppColors.textPrimary,
    },
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 9999,
    },
    metricsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderColor: '#f3f4f6',
    },
    metricItem: {
        flex: 1,
        textAlign: 'center',
    },
    metricLabel: {
        fontSize: 12,
        color: AppColors.textSecondary,
    },
    metricValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 1,
        borderColor: '#f3f4f6',
    },
    actionButton: {
        flex: 1,
        color: AppColors.primary,
        fontWeight: '500',
    },
});