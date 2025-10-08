
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button } from '../components/common';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from '../components/react-native';
import { CryptoAsset } from '../types';

const CryptoCard = ({ asset }: { asset: CryptoAsset }) => {
    const colors: Record<string, string> = {
        BTC: '#F7931A',
        ETH: '#627EEA',
        RWT: '#42B72A',
    };
    return (
        <View style={[styles.cryptoCard, { borderTopColor: colors[asset.symbol] }]}>
            <View style={styles.cardHeader}>
                <Text style={styles.cryptoSymbol}>{asset.symbol}</Text>
                <Text style={styles.cryptoName}>{asset.name}</Text>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.cryptoBalance}>{asset.balance.toLocaleString()} {asset.symbol}</Text>
                <Text style={styles.cryptoValue}>≈ {asset.valueRWF.toLocaleString()} RWF</Text>
            </View>
        </View>
    );
};

export const CryptoWalletScreen = () => {
    const { state, dispatch } = useAppContext();
    const { cryptoAssets } = state;

    const totalValue = cryptoAssets.reduce((sum, asset) => sum + asset.valueRWF, 0);

    return (
        <Container>
            <Header title="Crypto Wallet" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <ScrollView style={styles.content}>
                <View style={styles.balanceContainer}>
                    <Text style={styles.totalBalanceLabel}>Total Portfolio Value</Text>
                    <Text style={styles.totalBalanceValue}>{totalValue.toLocaleString()} RWF</Text>
                </View>

                <View style={styles.actionsContainer}>
                    <Button onPress={() => {}} style={styles.actionButton}>Buy</Button>
                    <Button onPress={() => {}} style={styles.actionButton}>Sell</Button>
                    <Button onPress={() => {}} style={styles.actionButton}>Swap</Button>
                    <Button onPress={() => {}} style={styles.actionButton}>Stake</Button>
                </View>

                <Text style={styles.sectionTitle}>Your Assets</Text>
                <View style={styles.assetList}>
                    {cryptoAssets.map(asset => <CryptoCard key={asset.id} asset={asset} />)}
                </View>

                <View style={styles.nftSection}>
                    <Text style={styles.sectionTitle}>NFT Marketplace</Text>
                    <View style={styles.nftPlaceholder}>
                        <Text style={styles.nftText}>🖼️</Text>
                        <Text style={styles.nftTitle}>Rwanda Heritage Art #1</Text>
                        <Text style={styles.nftPrice}>0.5 ETH</Text>
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    balanceContainer: { alignItems: 'center', paddingVertical: 24, backgroundColor: AppColors.surface, borderRadius: 16, marginBottom: 24 },
    totalBalanceLabel: { color: AppColors.textSecondary, fontSize: 16 },
    totalBalanceValue: { color: AppColors.textPrimary, fontSize: 32, fontWeight: 'bold', marginTop: 8 },
    
    actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, gap: 8 },
    actionButton: { flex: 1 },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    assetList: { display: 'flex', flexDirection: 'column', gap: 16 },
    cryptoCard: { backgroundColor: AppColors.surface, borderRadius: 12, padding: 16, borderTopWidth: 4 },
    cardHeader: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
    cryptoSymbol: { fontSize: 24, fontWeight: 'bold' },
    cryptoName: { color: AppColors.textSecondary },
    cardBody: { marginTop: 16 },
    cryptoBalance: { fontSize: 20, fontWeight: '500' },
    cryptoValue: { color: AppColors.textSecondary, marginTop: 4 },

    nftSection: { marginTop: 32 },
    nftPlaceholder: { alignItems: 'center', backgroundColor: AppColors.surface, padding: 24, borderRadius: 12 },
    nftText: { fontSize: 48 },
    nftTitle: { marginTop: 16, fontWeight: 'bold', fontSize: 18 },
    nftPrice: { marginTop: 4, color: AppColors.primary, fontWeight: '500' },
});