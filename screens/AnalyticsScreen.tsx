import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Container, Header, BottomNav, Card, AppColors } from '../components/common';
import { StyleSheet, View, Text, ScrollView } from '../components/react-native';

const DonutChart = ({ data }: { data: { label: string, value: number, color: string }[] }) => {
    const size = 180;
    const strokeWidth = 25;
    const radius = (size / 2) - (strokeWidth / 2);
    const circumference = 2 * Math.PI * radius;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    let accumulatedPercentage = 0;

    if (total === 0) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: size, width: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <circle
                        stroke="#f3f4f6"
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                </svg>
                <Text style={{ position: 'absolute', fontSize: 14, color: AppColors.textSecondary }}>No Data</Text>
            </View>
        );
    }
    
    return (
        <View style={{ width: size, height: size, position: 'relative' }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {data.map((item, index) => {
                    const percentage = item.value / total;
                    const strokeDashoffset = circumference * (1 - percentage);
                    const rotation = accumulatedPercentage * 360;
                    accumulatedPercentage += percentage;

                    return (
                        <circle
                            key={index}
                            stroke={item.color}
                            fill="transparent"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            r={radius}
                            cx={size / 2}
                            cy={size / 2}
                            strokeDasharray={`${circumference} ${circumference}`}
                            strokeDashoffset={strokeDashoffset}
                            style={{ transform: `rotate(${rotation - 90}deg)`, transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s' }}
                        />
                    );
                })}
            </svg>
            <View style={styles.chartCenterTextContainer}>
                <Text style={styles.chartCenterLabel}>Total Spent</Text>
                <Text style={styles.chartCenterValue}>KES {total.toLocaleString()}</Text>
            </View>
        </View>
    );
};


export const AnalyticsScreen = () => {
    const { state } = useAppContext();
    const { transactions } = state;

    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
    const categories = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => {
            const category = t.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + Math.abs(t.amount);
            return acc;
        }, {} as Record<string, number>);
    
    const sortedCategories = Object.entries(categories).sort(([, a], [, b]) => b - a);
    const categoryColors = ['#1877F2', '#42B72A', '#FA383E', '#F59E0B', '#8A3FFC', '#00A4A2'];
    const donutData = sortedCategories.map(([label, value], index) => ({
        label,
        value,
        color: categoryColors[index % categoryColors.length],
    }));

    const totalFinancialActivity = income + expenses;

    return (
        <Container>
            <Header title="Financial Analytics" />
            <ScrollView style={styles.main}>
                <Card>
                    <Text style={styles.sectionTitle}>Monthly Flow</Text>
                    <View style={styles.summaryContainer}>
                        <View>
                            <Text style={styles.summaryLabel}>Income</Text>
                            <Text style={[styles.summaryValue, { color: AppColors.success }]}>KES {income.toLocaleString()}</Text>
                        </View>
                        <View>
                            <Text style={styles.summaryLabel}>Expenses</Text>
                            <Text style={[styles.summaryValue, { color: AppColors.danger }]}>KES {expenses.toLocaleString()}</Text>
                        </View>
                    </View>
                    <View style={styles.flowBarContainer}>
                        <View style={[styles.flowBarSegment, { width: totalFinancialActivity > 0 ? `${(income/totalFinancialActivity) * 100}%` : '0%', backgroundColor: AppColors.success, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]} />
                        <View style={[styles.flowBarSegment, { width: totalFinancialActivity > 0 ? `${(expenses/totalFinancialActivity) * 100}%` : '0%', backgroundColor: AppColors.danger, borderTopRightRadius: 8, borderBottomRightRadius: 8 }]} />
                    </View>
                </Card>

                <Card style={{ marginTop: 24 }}>
                    <Text style={styles.sectionTitle}>Spending by Category</Text>
                    <View style={styles.donutContainer}>
                        <DonutChart data={donutData} />
                    </View>
                    <View style={styles.legendContainer}>
                        {donutData.map(item => (
                            <View key={item.label} style={styles.legendItem}>
                                <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
                                <Text style={styles.legendLabel}>{item.label}</Text>
                                <Text style={styles.legendValue}>KES {item.value.toLocaleString()}</Text>
                            </View>
                        ))}
                    </View>
                </Card>
            </ScrollView>
            <BottomNav />
        </Container>
    );
};

const styles = StyleSheet.create({
    main: { flex: 1, padding: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: AppColors.textPrimary, marginBottom: 16 },
    summaryContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16},
    summaryLabel: { fontSize: 14, color: AppColors.textSecondary },
    summaryValue: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
    flowBarContainer: { display: 'flex', flexDirection: 'row', height: 12, width: '100%', backgroundColor: '#e5e7eb', borderRadius: 8, overflow: 'hidden' },
    flowBarSegment: { height: '100%' },
    donutContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginVertical: 16 },
    chartCenterTextContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    chartCenterLabel: { color: AppColors.textSecondary, fontSize: 12 },
    chartCenterValue: { color: AppColors.textPrimary, fontSize: 18, fontWeight: 'bold' },
    legendContainer: { marginTop: 24, borderTopWidth: 1, borderColor: '#f3f4f6', paddingTop: 16 },
    legendItem: { display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    legendColorBox: { width: 16, height: 16, borderRadius: 4, marginRight: 12 },
    legendLabel: { color: AppColors.textPrimary, flex: 1 },
    legendValue: { color: AppColors.textSecondary, fontWeight: '600' },
});