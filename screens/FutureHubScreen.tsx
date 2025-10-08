import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { Container, Header, AppColors } from '../components/common';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from '../components/react-native';
import { AtomIcon, CubeTransparentIcon, DnaIcon, LeafIcon, PuzzlePieceIcon, SparklesIcon } from '../components/icons';

const FutureMenuItem = ({ icon, title, subtitle, onPress, color }: { icon: React.ReactNode, title: string, subtitle: string, onPress: () => void, color: string }) => (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
            {icon}
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
);

export const FutureHubScreen = () => {
    const { dispatch } = useAppContext();
    const navigate = (screen: Screen) => dispatch({ type: 'NAVIGATE', payload: screen });

    const menuItems = [
        { icon: <AtomIcon style={styles.icon} />, title: "Quantum AI Advisor", subtitle: "Neural network financial planning", screen: Screen.QUANTUM_ADVISOR, color: '#8A3FFC' },
        { icon: <CubeTransparentIcon style={styles.icon} />, title: "Metaverse Banking", subtitle: "Explore the 3D virtual branch", screen: Screen.METAVERSE_BANK, color: '#1877F2' },
        { icon: <DnaIcon style={styles.icon} />, title: "Bio-Financial Wellness", subtitle: "Health and wealth integration", screen: Screen.BIO_FINANCE, color: '#FA383E' },
        { icon: <LeafIcon style={styles.icon} />, title: "Impact Investing", subtitle: "Invest in sustainable projects", screen: Screen.IMPACT_INVESTING, color: '#42B72A' },
        { icon: <SparklesIcon style={styles.icon} />, title: "Financial Gaming", subtitle: "Play-to-earn financial literacy", screen: Screen.FINANCIAL_GAMING, color: '#F59E0B' },
        { icon: <PuzzlePieceIcon style={styles.icon} />, title: "Gov & Dev Platforms", subtitle: "Digital ID and Open Banking APIs", screen: Screen.DASHBOARD, color: '#65676B' },
    ];

    return (
        <Container style={{backgroundColor: AppColors.background}}>
            <Header title="Future of Finance" onBack={() => dispatch({ type: 'NAVIGATE', payload: Screen.DASHBOARD })} />
            <ScrollView style={styles.content}>
                 <Text style={styles.pageTitle}>Welcome to 2030</Text>
                 <Text style={styles.pageSubtitle}>Experience the next generation of financial technology, available today.</Text>
                {menuItems.map(item => (
                    <FutureMenuItem 
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                        subtitle={item.subtitle}
                        onPress={() => navigate(item.screen)}
                        color={item.color}
                    />
                ))}
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1, padding: 24 },
    pageTitle: { fontSize: 28, fontWeight: 'bold', color: AppColors.text, marginBottom: 8, textAlign: 'center' },
    pageSubtitle: { color: AppColors.subtext, marginBottom: 32, textAlign: 'center' },
    menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: AppColors.cardBackground, padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: AppColors.cardBorder },
    iconContainer: { width: 48, height: 48, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    icon: { width: 28, height: 28, color: 'white' },
    textContainer: { flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold', color: AppColors.text },
    subtitle: { fontSize: 14, color: AppColors.subtext },
    arrow: { fontSize: 24, color: AppColors.subtext },
});