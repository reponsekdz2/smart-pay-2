import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Container, Header, AppColors, BottomNav, Card, Button, Input } from '../../components/common';
// FIX: Import TextInput component.
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from '../../components/react-native';
import { SystemSetting, FraudRule, ApiKey } from '../../types';

const SettingsManager = ({ settings }: { settings: SystemSetting[] }) => {
    const { dispatch } = useAppContext();
    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [currentValue, setCurrentValue] = useState('');

    const handleEdit = (setting: SystemSetting) => {
        setEditingKey(setting.setting_key);
        setCurrentValue(setting.setting_value);
    };

    const handleSave = () => {
        if (editingKey) {
            dispatch({ type: 'ADMIN_UPDATE_SETTING', payload: { key: editingKey, value: currentValue }});
            setEditingKey(null);
        }
    };

    return (
        <Card>
            <Text style={styles.sectionTitle}>System Settings</Text>
            {settings.map(s => (
                <View key={s.id} style={styles.itemRow}>
                    <View style={{flex: 1}}>
                        <Text style={styles.itemName}>{s.setting_key}</Text>
                        <Text style={styles.itemDesc}>{s.description}</Text>
                    </View>
                    {editingKey === s.setting_key ? (
                        <View style={{flexDirection: 'row', gap: 8}}>
                            <TextInput value={currentValue} onChangeText={setCurrentValue} style={{width: 80, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4}} />
                            <Button onPress={handleSave}>Save</Button>
                        </View>
                    ) : (
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                            <Text style={styles.itemValue}>{s.setting_value}</Text>
                            <Button variant="ghost" onPress={() => handleEdit(s)}>Edit</Button>
                        </View>
                    )}
                </View>
            ))}
        </Card>
    );
};

const FraudRulesManager = ({ rules }: { rules: FraudRule[] }) => (
    <Card>
        <Text style={styles.sectionTitle}>Fraud Detection Rules</Text>
        {rules.map(r => (
            <View key={r.id} style={styles.itemRow}>
                <View>
                    <Text style={styles.itemName}>{r.name} <Text style={{color: r.is_active ? AppColors.success : AppColors.danger}}>({r.is_active ? 'Active' : 'Inactive'})</Text></Text>
                    <Text style={styles.itemDesc}>{r.description}</Text>
                </View>
                <Text style={[styles.itemValue, {fontWeight: 'bold'}]}>{r.action}</Text>
            </View>
        ))}
    </Card>
);

const ApiKeyManager = ({ apiKeys }: { apiKeys: ApiKey[] }) => {
    const { dispatch } = useAppContext();
    const [newKey, setNewKey] = useState<ApiKey | null>(null);

    const generateNewKey = () => {
        const generatedKey: ApiKey = {
            id: `api_${Date.now()}`,
            name: 'New Merchant Key',
            api_key: `sk_live_${Math.random().toString(36).substring(2)}`,
            api_secret: `secret_${Math.random().toString(36).substring(2)}`,
            status: 'ACTIVE',
            permissions: {},
            rate_limit_per_minute: 100,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        dispatch({ type: 'ADMIN_CREATE_API_KEY', payload: generatedKey });
        setNewKey(generatedKey);
    };
    
    return (
         <Card>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={styles.sectionTitle}>API Key Management</Text>
                <Button onPress={generateNewKey}>Generate Key</Button>
            </View>
            {newKey && (
                <View style={styles.newKeyContainer}>
                    <Text style={styles.newKeyTitle}>New Key Generated! Save this secret, it won't be shown again.</Text>
                    <Text><strong>API Key:</strong> {newKey.api_key}</Text>
                    <Text><strong>API Secret:</strong> {newKey.api_secret}</Text>
                    <Button variant='ghost' onPress={() => setNewKey(null)}>Dismiss</Button>
                </View>
            )}
            {apiKeys.map(k => (
                <View key={k.id} style={styles.itemRow}>
                    <View><Text style={styles.itemName}>{k.name}</Text><Text style={styles.itemDesc}>{k.api_key}</Text></View>
                    <Text style={styles.itemValue}>{k.status}</Text>
                </View>
            ))}
        </Card>
    );
};


export const AdminSystemScreen = () => {
    const { state } = useAppContext();
    const [activeTab, setActiveTab] = useState('settings');

    return (
        <Container>
            <Header title="System Management" />
             <View style={styles.tabs}>
                <TouchableOpacity style={[styles.tab, activeTab === 'settings' && styles.tabActive]} onPress={() => setActiveTab('settings')}><Text>Settings</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.tab, activeTab === 'fraud' && styles.tabActive]} onPress={() => setActiveTab('fraud')}><Text>Fraud Rules</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.tab, activeTab === 'api' && styles.tabActive]} onPress={() => setActiveTab('api')}><Text>API Keys</Text></TouchableOpacity>
            </View>
            <ScrollView style={styles.content}>
                {activeTab === 'settings' && <SettingsManager settings={state.systemSettings} />}
                {activeTab === 'fraud' && <FraudRulesManager rules={state.fraudRules} />}
                {activeTab === 'api' && <ApiKeyManager apiKeys={state.apiKeys} />}
                <Card style={{marginTop: 24}}>
                    <Text style={styles.sectionTitle}>BNR Compliance</Text>
                    <Button onPress={() => alert('Generating BNR Quarterly Report...')}>Generate BNR Report</Button>
                </Card>
            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    tabs: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#e5e7eb' },
    tab: { flex: 1, padding: 16, alignItems: 'center', backgroundColor: '#f9fafb' },
    tabActive: { backgroundColor: AppColors.surface, fontWeight: 'bold' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#f3f4f6' },
    itemName: { fontWeight: '500' },
    itemDesc: { fontSize: 12, color: AppColors.textSecondary },
    itemValue: { color: AppColors.textPrimary },
    newKeyContainer: { backgroundColor: AppColors.primaryLight, padding: 16, borderRadius: 8, marginVertical: 16, gap: 8 },
    newKeyTitle: { fontWeight: 'bold', color: AppColors.primaryDark },
});