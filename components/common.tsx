import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from './react-native';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';

export const AppColors = {
  primary: '#4F46E5',
  primaryDark: '#4338CA',
  primaryLight: 'rgba(79, 70, 229, 0.1)',
  secondary: '#10B981',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  text: '#1F2937',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  subtext: '#6B7280',
  danger: '#EF4444',
  success: '#22C55E',
  accent: '#10B981',
  cardBackground: '#FFFFFF',
  cardBorder: '#E5E7EB',
  inputBackground: '#F3F4F6',
};

export const Container = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <View style={{...styles.container, ...style}}>{children}</View>
);

export const Header = ({ title, onBack }: { title: string, onBack?: () => void }) => (
  <View style={styles.header}>
    {onBack && <TouchableOpacity onPress={onBack} style={styles.backButton}><Text>‹</Text></TouchableOpacity>}
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

export const Button = ({ children, onPress, style, variant = 'primary', disabled = false }: { children: React.ReactNode, onPress: () => void, style?: React.CSSProperties, variant?: 'primary' | 'secondary' | 'danger' | 'ghost', disabled?: boolean }) => {
  const variantStyles = {
    primary: { backgroundColor: AppColors.primary, color: 'white' },
    secondary: { backgroundColor: AppColors.cardBorder, color: AppColors.text },
    danger: { backgroundColor: AppColors.danger, color: 'white' },
    ghost: { backgroundColor: 'transparent', color: AppColors.primary },
  };
  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.button, ...variantStyles[variant], ...style, ...(disabled ? styles.buttonDisabled : {})}} disabled={disabled}>
      <Text style={{...styles.buttonText, color: variantStyles[variant].color }}>{children}</Text>
    </TouchableOpacity>
  );
};

export const GradientButton = ({ children, onPress, style }: { children: React.ReactNode, onPress: () => void, style?: React.CSSProperties }) => (
    <TouchableOpacity onPress={onPress} style={{ ...styles.button, ...styles.gradientButton, ...style }}>
        <Text style={{ ...styles.buttonText, color: 'white' }}>{children}</Text>
    </TouchableOpacity>
);

export const Card = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
    <View style={{...styles.card, ...style}}>{children}</View>
);

export const BottomNav = () => {
    const { state, dispatch } = useAppContext();
    const navigate = (screen: Screen) => dispatch({ type: 'NAVIGATE', payload: screen });

    const navItems = [
        { screen: Screen.DASHBOARD, label: 'Home' },
        { screen: Screen.ANALYTICS, label: 'Analytics' },
        { screen: Screen.FUTURE_HUB, label: 'Future' },
        { screen: Screen.ADMIN_DASHBOARD, label: 'Admin'},
    ];

    return (
        <View style={styles.bottomNav}>
            {navItems.map(item => (
                <TouchableOpacity key={item.screen} onPress={() => navigate(item.screen)} style={styles.navItem}>
                    <Text style={[styles.navText, state.screen === item.screen && styles.navTextActive]}>
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export const ModernInput = ({ label, value, onChangeText, icon, keyboardType, placeholder }: { label: string, value: string, onChangeText: (text: string) => void, icon?: React.ReactNode, keyboardType?: string, placeholder?: string }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={styles.inputWrapper}>
            {icon && <View style={styles.inputIcon}>{icon}</View>}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                placeholder={placeholder}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: AppColors.background,
  },
  header: {
    padding: 16,
    backgroundColor: AppColors.surface,
    borderBottomWidth: 1,
    borderColor: AppColors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
      position: 'absolute',
      left: 16,
      fontSize: 24,
      fontWeight: 'bold',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  buttonText: {
    fontWeight: '600',
  },
  gradientButton: {
    background: `linear-gradient(to right, ${AppColors.primary}, ${AppColors.secondary})`,
  },
  card: {
      backgroundColor: AppColors.cardBackground,
      borderRadius: 12,
      padding: 24,
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
  },
  bottomNav: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderColor: AppColors.cardBorder,
      backgroundColor: AppColors.surface,
      padding: 8,
  },
  navItem: {
      flex: 1,
      alignItems: 'center',
      padding: 8,
  },
  navText: {
      color: AppColors.textSecondary,
  },
  navTextActive: {
      color: AppColors.primary,
      fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    color: AppColors.textPrimary,
    fontWeight: '500',
  },
  inputWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: AppColors.inputBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: AppColors.cardBorder,
  },
  inputIcon: {
      padding: 12,
      color: AppColors.textSecondary,
  },
  input: {
      flex: 1,
      padding: 12,
      border: 'none',
      backgroundColor: 'transparent',
      outline: 'none',
  }
});
