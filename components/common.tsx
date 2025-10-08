import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from './react-native';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';
import { ChartBarIcon, CubeTransparentIcon, UsersIcon, WalletIcon } from './icons';

export const AppColors = {
    primary: '#1877F2', // Facebook Blue
    secondary: '#8A8D91', // Medium Gray
    accent: '#42B72A', // Green for success
    danger: '#FA383E', // Red for errors
    background: '#F0F2F5', // Light Gray Background
    text: '#1C1E21', // Dark Gray Text
    subtext: '#65676B', // Medium Gray Subtext
    cardBackground: '#FFFFFF', // White
    cardBorder: '#CED0D4', // Light border color
    inputBackground: '#FFFFFF',
    success: '#42B72A',
    textPrimary: '#1C1E21',
    textSecondary: '#65676B',
    surface: '#FFFFFF',
    // Deprecate dark theme colors by mapping them to the light theme
    darkBackground: '#F0F2F5',
    darkText: '#1C1E21',
    darkSubText: '#65676B',
    darkCard: '#FFFFFF',
    darkBorder: '#CED0D4',
    primaryLight: 'rgba(24, 119, 242, 0.1)',
    primaryDark: '#166FE5',
};

export const Container = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
    <View style={{...styles.container, ...style}}>{children}</View>
);

export const Button = ({ children, onPress, style, variant = 'primary', disabled }: { children: React.ReactNode, onPress?: () => void, style?: React.CSSProperties, variant?: 'primary' | 'secondary' | 'danger' | 'ghost', disabled?: boolean }) => {
    const variantStyles = {
        primary: { backgroundColor: AppColors.primary, color: 'white', border: 'none' },
        secondary: { backgroundColor: '#E4E6EB', color: AppColors.text, borderWidth: 1, borderColor: 'transparent' },
        danger: { backgroundColor: AppColors.danger, color: 'white', border: 'none' },
        ghost: { backgroundColor: 'transparent', color: AppColors.primary, border: 'none' },
    };
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={{...styles.button, ...variantStyles[variant], ...style, ...(disabled && styles.buttonDisabled)}}>
            <Text style={{...styles.buttonText, color: variantStyles[variant].color}}>{children}</Text>
        </TouchableOpacity>
    );
};

// GradientButton is deprecated in favor of the new Facebook-style solid Button.
export const GradientButton = (props: { children: React.ReactNode, onPress?: () => void, style?: React.CSSProperties, disabled?: boolean }) => (
    <Button {...props} />
);

export const Card = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
    <View style={{...styles.card, ...style}}>{children}</View>
);

export const Header = ({ title, onBack, variant = 'light' }: { title: string, onBack?: () => void, variant?: 'light' | 'transparent' }) => {
    const isTransparent = variant === 'transparent';
    const headerColor = isTransparent ? 'white' : AppColors.text;
    return (
        <View style={[styles.header, isTransparent && styles.headerTransparent]}>
            {onBack && <TouchableOpacity onPress={onBack}><Text style={{color: headerColor, fontSize: 32, marginRight: 16, fontWeight: '200' }}>‹</Text></TouchableOpacity>}
            <Text style={[styles.headerTitle, {color: headerColor}]}>{title}</Text>
        </View>
    );
};

export const BottomNav = () => {
    const { state, dispatch } = useAppContext();
    const navigate = (screen: Screen) => dispatch({ type: 'NAVIGATE', payload: screen });

    const navItems = [
        { screen: Screen.DASHBOARD, label: 'Home', icon: <WalletIcon /> },
        { screen: Screen.ANALYTICS, label: 'Analytics', icon: <ChartBarIcon /> },
        { screen: Screen.COMMUNITY_BANKING, label: 'Community', icon: <UsersIcon /> },
        { screen: Screen.FUTURE_HUB, label: 'Future', icon: <CubeTransparentIcon /> },
    ];

    return (
        <View style={styles.bottomNav}>
            {navItems.map(item => {
                const isActive = state.screen === item.screen;
                return (
                    <TouchableOpacity key={item.label} style={styles.navItem} onPress={() => navigate(item.screen)}>
                         <View style={styles.navIconContainer}>
                            {/* FIX: Add a more specific type assertion for the icon to allow passing style props via React.cloneElement. */}
                            {React.cloneElement(item.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, { style: {...styles.navIcon, ...(isActive && styles.navIconActive) } })}
                        </View>
                        <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

// FIX: Update the 'icon' prop type to be more specific, allowing style props to be passed via React.cloneElement.
export const ModernInput = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType, icon }: { label?: string, value: string, onChangeText: (text: string) => void, placeholder?: string, secureTextEntry?: boolean, keyboardType?: string, icon?: React.ReactElement<React.SVGProps<SVGSVGElement>> }) => {
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || value !== '';

    return (
        <View style={styles.inputContainer}>
            {icon && React.cloneElement(icon, { style: styles.inputIcon })}
            <Text style={[styles.inputLabel, isActive && styles.inputLabelActive, isFocused && {color: AppColors.primary}]}>
                {label || placeholder}
            </Text>
            <TextInput 
                style={[styles.input, icon ? { paddingLeft: 40 } : {}, isFocused && {borderColor: AppColors.primary}]}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    buttonDisabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        backgroundColor: '#CED0D4'
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 16,
    },
    card: {
        backgroundColor: AppColors.cardBackground,
        borderRadius: 8,
        padding: 24,
        borderWidth: 1,
        borderColor: AppColors.cardBorder,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    },
    header: {
        padding: 24,
        paddingBottom: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.cardBackground,
        borderBottomWidth: 1,
        borderColor: AppColors.cardBorder,
    },
    headerTransparent: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
        backgroundColor: AppColors.cardBackground,
        borderTopWidth: 1,
        borderColor: AppColors.cardBorder,
    },
    navItem: {
        alignItems: 'center',
        flex: 1,
    },
     navIconContainer: {
        width: 48,
        height: 32,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
        transition: 'all 0.2s ease-in-out',
    },
    navIcon: {
        width: 28,
        height: 28,
        color: AppColors.subtext,
    },
    navIconActive: {
        color: AppColors.primary,
    },
    navLabel: {
        fontSize: 10,
        color: AppColors.subtext,
    },
    navLabelActive: {
        color: AppColors.primary,
        fontWeight: '600',
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 20,
        width: '100%',
    },
    inputIcon: {
        position: 'absolute',
        left: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        color: AppColors.subtext,
        width: 20,
        height: 20,
    },
    inputLabel: {
        position: 'absolute',
        left: 15,
        top: '50%',
        transform: 'translateY(-50%)',
        color: AppColors.subtext,
        backgroundColor: AppColors.inputBackground,
        paddingHorizontal: 4,
        transition: 'all 0.2s ease-out',
        pointerEvents: 'none',
    },
    inputLabelActive: {
        top: 0,
        fontSize: 12,
    },
    input: {
        width: '100%',
        padding: 16,
        paddingTop: 20,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: AppColors.cardBorder,
        borderRadius: 8,
        backgroundColor: AppColors.inputBackground,
        color: AppColors.text,
        fontSize: 16,
    },
});