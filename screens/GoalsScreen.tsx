import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Card } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { Goal, Badge, Quest } from '../types';

const GoalPlanet = ({ goal }: { goal: Goal }) => {
    const progress = (goal.current / goal.target) * 100;
    const colors = {
        asset: '#1877F2',
        education: '#F59E0B',
        housing: '#42B72A',
        travel: '#8A3FFC'
    };
    return (
        <View style={styles.planetContainer}>
            <View style={[styles.planetOrbit]}>
                <View style={[styles.planet, { backgroundColor: colors[goal.type] }]}>
                    <Text style={styles.planetProgress}>{progress.toFixed(0)}%</Text>
                </View>
            </View>
            <Text style={styles.planetName}>{goal.name}</Text>
        </View>
    );
};

const BadgeItem = ({ badge }: { badge: Badge }) => (
    <View style={[styles.badge, !badge.unlocked && { opacity: 0.5 }]}>
        <Text style={styles.badgeIcon}>{badge.icon}</Text>
        <View>
            <Text style={styles.badgeName}>{badge.name}</Text>
            <Text style={styles.badgeDesc}>{badge.description}</Text>
        </View>
    </View>
);

const QuestItem = ({ quest }: { quest: Quest }) => (
    <View style={styles.quest}>
        <Text style={styles.questTitle}>{quest.title}</Text>
        <View style={styles.questReward}>
            <Text>Reward: {quest.reward.toLocaleString()} RWF</Text>
        </View>
        <View style={styles.questProgressContainer}>
            <View style={[styles.questProgressBar, { width: `${quest.progress}%` }]} />
        </View>
    </View>
);

export const GoalsScreen = () => {
    const { state, dispatch } = useAppContext();
    const { goals, badges, quests } = state;

    return (
        <Container>
            <Header title="Goals & Achievements" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <ScrollView style={styles.content}>
                <Text style={styles.sectionTitle}>Your Financial Galaxy</Text>
                <ScrollView horizontal={true} style={styles.galaxyScrollView}>
                    <View style={styles.galaxyContainer}>
                        {goals.map(goal => <GoalPlanet key={goal.id} goal={goal} />)}
                    </View>
                </ScrollView>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quests</Text>
                    {quests.map(quest => <QuestItem key={quest.id} quest={quest} />)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Badges</Text>
                    {badges.map(badge => <BadgeItem key={badge.id} badge={badge} />)}
                </View>
                 <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Leaderboard</Text>
                    <Card>
                        <Text>Coming Soon...</Text>
                    </Card>
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    section: { marginTop: 32 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    galaxyScrollView: { paddingBottom: 16 },
    galaxyContainer: { flexDirection: 'row', gap: 24, alignItems: 'flex-end' },
    planetContainer: { alignItems: 'center', gap: 8 },
    planetOrbit: { width: 100, height: 100, borderRadius: 9999, borderWidth: 2, borderColor: '#e5e7eb', borderStyle: 'dashed', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    planet: { width: 80, height: 80, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    planetProgress: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    planetName: { fontWeight: '500', color: AppColors.textSecondary },
    
    badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: AppColors.surface, padding: 12, borderRadius: 8, marginBottom: 8 },
    badgeIcon: { fontSize: 24, marginRight: 12 },
    badgeName: { fontWeight: 'bold' },
    badgeDesc: { color: AppColors.textSecondary, fontSize: 12 },
    
    quest: { backgroundColor: AppColors.surface, padding: 16, borderRadius: 8, marginBottom: 8 },
    questTitle: { fontWeight: 'bold', fontSize: 16 },
    questReward: { fontSize: 12, color: AppColors.success, backgroundColor: '#D1FAE5', padding: 4, borderRadius: 4, alignSelf: 'flex-start', marginVertical: 8 },
    questProgressContainer: { width: '100%', backgroundColor: '#e5e7eb', borderRadius: 9999, height: 8 },
    questProgressBar: { backgroundColor: AppColors.primary, height: '100%', borderRadius: 9999 },
});
