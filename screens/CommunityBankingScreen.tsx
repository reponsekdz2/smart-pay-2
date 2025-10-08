
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Button, Card } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { IbiminaGroup, CommunityProject } from '../types';

const GroupCard = ({ group }: { group: IbiminaGroup }) => (
    <Card style={styles.card}>
        <Text style={styles.cardTitle}>{group.name}</Text>
        <View style={styles.metricRow}>
            <Text>Members: {group.members}</Text>
            <Text>Next Meeting: {group.nextMeeting}</Text>
        </View>
        <View style={styles.savingsInfo}>
            <Text style={styles.savingsLabel}>Total Savings</Text>
            <Text style={styles.savingsAmount}>{group.totalSavings.toLocaleString()} RWF</Text>
        </View>
        <Button onPress={() => {}} style={{marginTop: 16}}>View Group</Button>
    </Card>
);

const ProjectCard = ({ project }: { project: CommunityProject }) => {
    const progress = (project.collected / project.goal) * 100;
    return (
        <Card style={styles.card}>
            <Text style={styles.cardTitle}>{project.title}</Text>
            <Text style={styles.organizer}>By {project.organizer} {project.verified && '✅'}</Text>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <View style={styles.metricRow}>
                <Text style={styles.progressText}>{progress.toFixed(1)}% Funded</Text>
                <Text style={styles.goalText}>{project.goal.toLocaleString()} RWF Goal</Text>
            </View>
            <Button onPress={() => {}} style={{marginTop: 16}}>Contribute</Button>
        </Card>
    );
};


export const CommunityBankingScreen = () => {
    const { state, dispatch } = useAppContext();
    const { ibiminaGroups, communityProjects } = state;

    return (
        <Container>
            <Header title="Community" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Digital Ibimina (Groups)</Text>
                    {ibiminaGroups.map(group => <GroupCard key={group.id} group={group} />)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Community Funds (Umuganda)</Text>
                    {communityProjects.map(project => <ProjectCard key={project.id} project={project} />)}
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    section: { marginBottom: 32 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    card: { marginBottom: 16 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    metricRow: { flexDirection: 'row', justifyContent: 'space-between', color: AppColors.textSecondary, fontSize: 14, marginTop: 8 },
    savingsInfo: { alignItems: 'center', backgroundColor: AppColors.primaryLight, padding: 16, borderRadius: 8, marginTop: 16 },
    savingsLabel: { color: AppColors.primary, fontWeight: '500' },
    savingsAmount: { fontSize: 24, fontWeight: 'bold', color: AppColors.primary, marginTop: 4 },
    organizer: { color: AppColors.textSecondary, fontSize: 14, marginBottom: 16 },
    progressContainer: { width: '100%', backgroundColor: '#e5e7eb', borderRadius: 9999, height: 10, overflow: 'hidden' },
    progressBar: { backgroundColor: AppColors.success, height: '100%' },
    progressText: { fontWeight: '500', color: AppColors.success },
    goalText: { fontWeight: '500' },
});