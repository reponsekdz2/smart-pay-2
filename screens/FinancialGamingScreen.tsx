import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button, Card } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { FinancialNFT } from '../types';

const GameStat = ({ label, value }: { label: string, value: string | number }) => (
    <View style={styles.stat}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
    </View>
);

const NftCard = ({ nft }: { nft: FinancialNFT }) => (
    <View style={styles.nftCard}>
        <img src={nft.imageUrl} alt={nft.title} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />
        <Text style={styles.nftTitle}>{nft.title}</Text>
    </View>
);

export const FinancialGamingScreen = () => {
    const { state, dispatch } = useAppContext();
    const { gameProfile, financialNFTs } = state;

    return (
        <Container>
            <Header title="Financial Gaming" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.FUTURE_HUB })} />
            <ScrollView style={styles.content}>
                <Card>
                    <Text style={styles.sectionTitle}>Wealth Building RPG</Text>
                    <View style={styles.rpgHeader}>
                        <Text style={styles.avatar}>🧙‍♂️</Text>
                        <View>
                            <Text style={styles.characterName}>{state.user?.name || 'Player'}</Text>
                            <Text style={styles.characterClass}>Financial Mage</Text>
                        </View>
                    </View>
                    <View style={styles.statsGrid}>
                        <GameStat label="Level" value={gameProfile.level} />
                        <GameStat label="Net Worth (XP)" value={gameProfile.netWorthXP.toLocaleString()} />
                        <GameStat label="Skill Points" value={gameProfile.skillPoints} />
                    </View>
                    <Button onPress={() => alert('Entering the Debt Dragon Lair...')} style={{marginTop: 16}}>Play Economic Quest</Button>
                </Card>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Real-Money Games</Text>
                    <Card style={styles.gameCard}>
                        <Text style={styles.gameTitle}>Trading Tournament</Text>
                        <Text style={styles.gameDescription}>Compete for a prize pool of 1,000,000 RWF!</Text>
                        <Button onPress={() => {}} variant='secondary'>Join Now</Button>
                    </Card>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Financial Achievement NFTs</Text>
                    <ScrollView horizontal={true}>
                        <View style={styles.nftList}>
                            {financialNFTs.map(nft => <NftCard key={nft.id} nft={nft} />)}
                             <View style={styles.nftCard}><Text>+ More</Text></View>
                        </View>
                    </ScrollView>
                </View>

            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    section: { marginTop: 24 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    
    rpgHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
    avatar: { fontSize: 48 },
    characterName: { fontSize: 20, fontWeight: 'bold' },
    characterClass: { color: AppColors.textSecondary },
    
    statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' },
    stat: { backgroundColor: AppColors.primaryLight, padding: 8, borderRadius: 8 },
    statLabel: { fontSize: 12, color: AppColors.textSecondary },
    statValue: { fontSize: 16, fontWeight: 'bold' },

    gameCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    gameTitle: { fontWeight: 'bold', fontSize: 16 },
    gameDescription: { color: AppColors.textSecondary, flex: 1, marginHorizontal: 16 },

    nftList: { flexDirection: 'row', gap: 16 },
    nftCard: { width: 120, padding: 8, backgroundColor: AppColors.surface, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    nftTitle: { fontWeight: '500', fontSize: 12, marginTop: 8 },
});