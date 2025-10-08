import React from 'react';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { Container, Header, AppColors, Card } from '../components/common';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { BackendService } from '../types';

const ServiceStatusCard = ({ service }: { service: BackendService }) => {
    const statusColor = service.status === 'Online' ? AppColors.accent : service.status === 'Degraded' ? '#F59E0B' : AppColors.danger;
    
    return (
        <Card style={styles.serviceCard}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 {/* FIX: Removed type cast after updating the 'icon' prop type in the BackendService interface. */}
                 {service.icon && React.cloneElement(service.icon, { style: styles.serviceIcon })}
                <Text style={styles.serviceName}>{service.name}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
                <Text style={{ color: statusColor, fontWeight: '600' }}>{service.status}</Text>
            </View>
        </Card>
    );
};

export const BackendDashboardScreen = () => {
     const { state, dispatch } = useAppContext();

    return (
        <Container>
            <Header title="Backend Services Status" onBack={() => dispatch({type: 'NAVIGATE', payload: Screen.SECURITY})} />
            <ScrollView style={styles.content}>
                <Text style={styles.pageSubtitle}>Real-time status of production microservices.</Text>
                <View style={styles.grid}>
                    {state.backendServices.map(service => (
                        <ServiceStatusCard key={service.name} service={service} />
                    ))}
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 24,
    },
    pageSubtitle: {
        textAlign: 'center',
        color: AppColors.subtext,
        marginBottom: 24,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 16,
    },
    serviceCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    serviceIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
        color: AppColors.subtext,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '600',
        color: AppColors.text,
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 9999,
        marginRight: 8,
    },
});