
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button, Card } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { SyncConflict, OfflineTransaction } from '../types';

const OfflineItem = ({ item }: { item: OfflineTransaction }) => (
    <View style={styles.queueItem}>
        <Text>Transaction to {item.payload.description}</Text>
        <Text style={{fontWeight: 'bold'}}>RWF {Math.abs(item.payload.amount).toLocaleString()}</Text>
        <Text style={{color: AppColors.textSecondary, fontSize: 12}}>Pending...</Text>
    </View>
);

const ConflictItem = ({ conflict }: { conflict: SyncConflict }) => {
    const { dispatch } = useAppContext();
    const [isResolving, setIsResolving] = useState(false);

    const handleResolve = (resolution: 'RETRY' | 'CANCEL') => {
        setIsResolving(true);
        setTimeout(() => {
            dispatch({ type: 'RESOLVE_CONFLICT', payload: { conflictId: conflict.id, resolution }});
            dispatch({ type: 'ADD_NOTIFICATION', payload: { message: `Conflict resolved. Transaction ${resolution === 'RETRY' ? 'retried' : 'cancelled'}.`, type: 'success' } });
        }, 1500);
    };

    return (
        <Card style={styles.conflictCard}>
            <Text style={styles.conflictTitle}>Sync Conflict Detected</Text>
            <View style={styles.conflictDetails}>
                <Text>Offline Action: <Text style={{fontWeight: 'bold'}}>Send {Math.abs(conflict.offlineTransaction.payload.amount).toLocaleString()}</Text></Text>
                <Text>Server Reason: <Text style={{color: AppColors.danger}}>{conflict.serverState.reason}</Text></Text>
            </View>
            <View style={styles.aiResolution}>
                <Text style={styles.aiTitle}>🤖 AI Conflict Resolution</Text>
                <Text style={styles.aiSuggestion}>{conflict.aiResolution.description}</Text>
                 <View style={styles.resolutionActions}>
                    <Button onPress={() => handleResolve('RETRY')} style={{flex: 1}} disabled={isResolving}>
                        {isResolving ? 'Working...' : 'Accept & Retry'}
                    </Button>
                    <Button onPress={() => handleResolve('CANCEL')} variant="danger" style={{flex: 1}} disabled={isResolving}>
                        Cancel
                    </Button>
                </View>
            </View>
        </Card>
    );
};

export const SyncCenterScreen = () => {
    const { state, dispatch } = useAppContext();
    const { isOnline, offlineQueue, syncConflicts, lastSyncTimestamp } = state;
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = () => {
        setIsSyncing(true);
        const processQueue = () => {
            if (state.offlineQueue.length > 0) {
                dispatch({ type: 'PROCESS_OFFLINE_QUEUE' });
                setTimeout(processQueue, 1000); // Process one item per second
            } else {
                setIsSyncing(false);
                dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'All items synced successfully!', type: 'success' } });
            }
        };
        setTimeout(processQueue, 1000);
    };

    // Auto-sync when navigating to this screen if online
    useEffect(() => {
        if(isOnline && offlineQueue.length > 0 && !isSyncing) {
            handleSync();
        }
    }, [isOnline]);

    const getStatusText = () => {
        if (isSyncing) return "Syncing...";
        if (!isOnline) return "Offline";
        if (offlineQueue.length > 0) return "Pending Sync";
        if (syncConflicts.length > 0) return "Action Required";
        return "Online & Synced";
    }

    const getStatusColor = () => {
        if (isSyncing || (!isOnline && offlineQueue.length > 0)) return '#F59E0B'; // Orange
        if (!isOnline) return AppColors.textSecondary;
        if (syncConflicts.length > 0) return AppColors.danger;
        return AppColors.success;
    }

    return (
        <Container>
            <Header title="Sync Center" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.SECURITY })} />
            <ScrollView style={styles.content}>
                <Card style={styles.statusCard}>
                    <Text style={styles.statusLabel}>Connection Status</Text>
                    <View style={styles.statusDisplay}>
                        <View style={[styles.statusIndicator, {backgroundColor: getStatusColor()}]} />
                        <Text style={[styles.statusText, {color: getStatusColor()}]}>{getStatusText()}</Text>
                    </View>
                    {lastSyncTimestamp && <Text style={styles.lastSync}>Last sync: {lastSyncTimestamp.toLocaleTimeString()}</Text>}
                </Card>

                {syncConflicts.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Conflicts Requiring Action</Text>
                        {syncConflicts.map(conflict => <ConflictItem key={conflict.id} conflict={conflict} />)}
                    </View>
                )}

                <View style={styles.section}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.sectionTitle}>Offline Queue</Text>
                         <Button onPress={handleSync} disabled={!isOnline || offlineQueue.length === 0 || isSyncing}>
                            {isSyncing ? 'Syncing...' : 'Sync Now'}
                         </Button>
                    </View>
                    {offlineQueue.length > 0 ? (
                        <Card style={{padding: 8}}>
                             {offlineQueue.map(item => <OfflineItem key={item.id} item={item} />)}
                        </Card>
                    ) : (
                        <Text style={styles.emptyText}>Offline queue is empty.</Text>
                    )}
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    section: { marginTop: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    statusCard: { alignItems: 'center' },
    statusLabel: { color: AppColors.textSecondary },
    statusDisplay: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    statusIndicator: { width: 12, height: 12, borderRadius: 9999, marginRight: 8 },
    statusText: { fontSize: 24, fontWeight: 'bold' },
    lastSync: { color: AppColors.textSecondary, fontSize: 12, marginTop: 4 },
    emptyText: { textAlign: 'center', color: AppColors.textSecondary, marginTop: 16 },
    
    queueItem: { padding: 16, borderBottomWidth: 1, borderColor: '#f3f4f6' },
    
    conflictCard: { borderColor: AppColors.danger, borderWidth: 2 },
    conflictTitle: { fontSize: 16, fontWeight: 'bold', color: AppColors.danger, marginBottom: 12 },
    conflictDetails: { backgroundColor: '#FFFBEB', padding: 8, borderRadius: 4, marginBottom: 12, gap: 4 },
    aiResolution: { backgroundColor: '#F0F9FF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#BAE6FD' },
    aiTitle: { fontWeight: 'bold', color: '#0369A1' },
    aiSuggestion: { color: '#075985', marginVertical: 8 },
    resolutionActions: { flexDirection: 'row', gap: 8, marginTop: 8 },
});