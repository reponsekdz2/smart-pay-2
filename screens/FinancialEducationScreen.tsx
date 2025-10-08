

import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors, Card, Button } from '../components/common';
import { View, Text, StyleSheet, ScrollView } from '../components/react-native';
import { Course } from '../types';

const CourseCard = ({ course }: { course: Course }) => {
    const colors: Record<string, string> = {
        beginner: AppColors.success,
        intermediate: AppColors.primary,
        advanced: AppColors.danger,
    };
    return (
        <Card style={styles.courseCard}>
            <View>
                <View style={styles.cardHeader}>
                    <Text style={[styles.difficulty, { backgroundColor: colors[course.difficulty] }]}>{course.difficulty}</Text>
                    <Text style={styles.duration}>{course.duration}</Text>
                </View>
                <Text style={styles.courseTitle}>{course.title}</Text>
            </View>
            <View style={styles.cardFooter}>
                <Text style={styles.reward}>+ {course.reward} RWF</Text>
                {/* FIX: `paddingVertical` and `paddingHorizontal` are not valid CSS properties for web. Replaced with directional padding properties. */}
                <Button onPress={() => {}} style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12}}>Start</Button>
            </View>
        </Card>
    );
};


export const FinancialEducationScreen = () => {
    const { state, dispatch } = useAppContext();
    const { courses } = state;

    return (
        <Container>
            <Header title="Learn" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <ScrollView style={styles.content}>
                <View style={styles.hero}>
                    <Text style={styles.heroTitle}>Grow Your Financial Knowledge</Text>
                    <Text style={styles.heroSubtitle}>Complete courses to earn rewards and build wealth.</Text>
                </View>

                <Text style={styles.sectionTitle}>Recommended For You</Text>
                <View style={styles.courseList}>
                    {courses.map(course => <CourseCard key={course.id} course={course} />)}
                </View>
                
                <Card style={{marginTop: 24, alignItems: 'center'}}>
                    <Text style={styles.sectionTitle}>Financial Simulations</Text>
                    <Text style={{textAlign: 'center', color: AppColors.textSecondary}}>Practice investing with virtual money. Coming Soon!</Text>
                </Card>

            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    hero: { backgroundColor: AppColors.primary, padding: 24, borderRadius: 16, marginBottom: 32, alignItems: 'center', textAlign: 'center' },
    heroTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
    heroSubtitle: { color: 'rgba(255, 255, 255, 0.8)', marginTop: 8 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    courseList: { display: 'flex', flexDirection: 'column', gap: 16 },
    courseCard: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 150 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    difficulty: { color: 'white', textTransform: 'capitalize', fontSize: 12, paddingVertical: 2, paddingHorizontal: 8, borderRadius: 9999 },
    duration: { color: AppColors.textSecondary, fontSize: 12 },
    courseTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 8, flex: 1 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: '#f3f4f6', paddingTop: 12, marginTop: 16 },
    reward: { color: AppColors.success, fontWeight: 'bold' },
});