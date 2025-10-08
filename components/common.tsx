import React, { ReactNode, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Picker } from './react-native';
import { ArrowLeftIcon, HomeIcon, ArrowRightLeftIcon, PieChartIcon, UserIcon } from './icons';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../constants';

// AppColors matching the Facebook-inspired theme
export const AppColors = {
  primary: '#1877F2',
  primaryDark: '#166FE5',
  primaryLight: '#E7F3FF',
  background: '#F0F2F5',
  surface: '#FFFFFF',
  textPrimary: '#1C1E21',
  textSecondary: '#65676B',
  darkBackground: '#0A0F1F',
  darkText: '#FFFFFF',
  darkSubText: '#9CA3AF',
  darkCard: 'rgba(255, 255, 255, 0.1)',
  darkBorder: 'rgba(255, 255, 255, 0.2)',
  success: '#42B72A',
  danger: '#FA383E',
};

export const Container = ({ children, style }: { children: ReactNode, style?: object }) => (
  <View style={[styles.container, style]}>{children}</View>
);

export const Header = ({ title, onBack, variant = 'light' }: { title: string; onBack?: () => void; variant?: 'light' | 'transparent' }) => {
  const isTransparent = variant === 'transparent';
  const headerStyle = isTransparent ? styles.headerTransparent : styles.headerLight;
  const textStyle = isTransparent ? styles.headerTextTransparent : styles.headerTextLight;
  const iconStyle = isTransparent ? styles.headerIconTransparent : styles.headerIconLight;

  return (
    <View style={headerStyle}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.headerButton}>
          <ArrowLeftIcon style={iconStyle} />
        </TouchableOpacity>
      )}
      <Text style={textStyle}>{title}</Text>
    </View>
  );
};

export const Button = ({ children, onPress, variant = 'primary', disabled = false, style }: { children: ReactNode; onPress: () => void; variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; disabled?: boolean, style?: object }) => {
  const variantStyle = styles[`button_${variant}`];
  const textStyle = styles[`buttonText_${variant}`];
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.buttonBase, variantStyle, disabled && styles.buttonDisabled, style]}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

export const GradientButton = ({ children, onPress, disabled = false, style, gradient = ['#1877F2', '#42B72A'] }: { children: ReactNode; onPress: () => void; disabled?: boolean; style?: object, gradient?: string[] }) => {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`,
    };
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.gradientButton, gradientStyle, disabled && styles.buttonDisabled, style]}
      >
        <Text style={styles.gradientButtonText}>{children}</Text>
      </TouchableOpacity>
    );
};

export const Input = ({ label, type = 'text', value, onChangeText, placeholder, error, name }: { label: string; type?: string; value: string; onChangeText: (text: string) => void; placeholder?: string; error?: string; name?: string; }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
            style={[styles.input, error ? styles.inputError : {}]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={type === 'password'}
            keyboardType={type === 'tel' ? 'phone-pad' : type === 'number' ? 'numeric' : 'default'}
        />
        {error && <Text style={styles.inputErrorText}>{error}</Text>}
    </View>
);

export const ModernInput = ({ icon, label, type = 'text', value, onChangeText, placeholder, name }: { icon: ReactNode, label: string; type?: string; value: string; onChangeText: (text: string) => void; placeholder?: string; name?: string; }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={styles.modernInputWrapper}>
            <Text style={[styles.modernInputLabel, (isFocused || value) && styles.modernInputLabelFocused]}>{label}</Text>
            <View style={styles.modernInputIcon}>{icon}</View>
            <TextInput
                style={styles.modernInput}
                value={value}
                onChangeText={onChangeText}
                placeholder={isFocused ? placeholder : ''}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={type === 'password'}
                keyboardType={type === 'tel' ? 'phone-pad' : 'default'}
            />
        </View>
    );
};

export const Card = ({ children, style, ...props }: { children: ReactNode; style?: object } & React.HTMLAttributes<HTMLDivElement>) => (
  <View style={[styles.card, style]} {...props}>
    {children}
  </View>
);

export const BottomNav = () => {
    const { state, dispatch } = useAppContext();
    
    const navItems = [
      { screen: Screen.DASHBOARD, label: 'Home', icon: HomeIcon },
      { screen: Screen.TRANSACTION_HISTORY, label: 'History', icon: ArrowRightLeftIcon },
      { screen: Screen.ANALYTICS, label: 'Analytics', icon: PieChartIcon },
      { screen: Screen.SECURITY, label: 'Profile', icon: UserIcon },
    ];
  
    const navigate = (screen: Screen) => {
      dispatch({ type: 'NAVIGATE', payload: screen });
    };
  
    return (
      <View style={styles.bottomNavContainer}>
          {navItems.map((item) => {
            // FIX: JSX requires component names to be capitalized when used as dynamic tags.
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.label}
                onPress={() => navigate(item.screen)}
                style={styles.bottomNavItem}
              >
                {/* FIX: SVG elements on the web expect a style object, not an array. Merging styles. */}
                <IconComponent style={Object.assign({}, styles.bottomNavIcon, state.currentScreen === item.screen && styles.bottomNavIconActive)} />
                <Text style={[styles.bottomNavLabel, state.currentScreen === item.screen && styles.bottomNavLabelActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: 480,
        marginHorizontal: 'auto',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        backgroundColor: AppColors.background,
    },
    headerLight: { backgroundColor: AppColors.surface, padding: 16, display: 'flex', flexDirection: 'row', alignItems: 'center', zIndex: 10, borderBottomWidth: 1, borderColor: '#e5e7eb' },
    headerTransparent: { backgroundColor: 'transparent', padding: 16, display: 'flex', flexDirection: 'row', alignItems: 'center', zIndex: 10 },
    headerButton: { marginRight: 16, padding: 8, borderRadius: 9999 },
    headerTextLight: { fontSize: 20, fontWeight: 'bold', color: AppColors.textPrimary },
    headerTextTransparent: { fontSize: 20, fontWeight: 'bold', color: AppColors.darkText },
    headerIconLight: { height: 24, width: 24, color: AppColors.primary },
    headerIconTransparent: { height: 24, width: 24, color: AppColors.darkText },

    buttonBase: { width: '100%', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, fontWeight: '600', textAlign: 'center' },
    button_primary: { backgroundColor: AppColors.primary },
    buttonText_primary: { color: AppColors.surface },
    button_secondary: { backgroundColor: '#E4E6EB' },
    buttonText_secondary: { color: AppColors.textPrimary },
    button_danger: { backgroundColor: AppColors.danger },
    buttonText_danger: { color: AppColors.surface },
    button_ghost: { backgroundColor: 'transparent' },
    buttonText_ghost: { color: AppColors.primary },
    buttonDisabled: { backgroundColor: '#D1D5DB', color: '#6B7280' },

    gradientButton: { width: '100%', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, fontWeight: 'bold', textAlign: 'center' },
    gradientButtonText: { color: AppColors.surface, textAlign: 'center' },
    
    inputContainer: { width: '100%' },
    inputLabel: { display: 'block', fontSize: 14, fontWeight: '500', color: AppColors.textSecondary, marginBottom: 4 },
    input: { width: '100%', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: AppColors.surface, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8 },
    inputError: { borderColor: AppColors.danger },
    inputErrorText: { color: AppColors.danger, fontSize: 12, marginTop: 4 },

    modernInputWrapper: { position: 'relative', width: '100%' },
    modernInputLabel: { position: 'absolute', left: 48, transition: 'all 0.2s', top: '50%', transform: 'translateY(-50%)', color: AppColors.darkSubText },
    modernInputLabelFocused: { top: '25%', fontSize: 12 },
    modernInputIcon: { position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 20 },
    modernInput: { width: '100%', paddingLeft: 48, paddingRight: 16, paddingVertical: 16, backgroundColor: AppColors.darkCard, borderWidth: 1, borderColor: AppColors.darkBorder, borderRadius: 12, color: AppColors.darkText, placeholderTextColor: '#6B7280' },

    card: { backgroundColor: AppColors.surface, padding: 16, borderRadius: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' },
    
    bottomNavContainer: { backgroundColor: AppColors.surface, marginTop: 'auto', borderTopWidth: 1, borderColor: '#e5e7eb', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 4 },
    bottomNavItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 96, paddingVertical: 8, borderRadius: 8 },
    bottomNavIcon: { height: 24, width: 24, marginBottom: 4, color: AppColors.textSecondary },
    bottomNavIconActive: { color: AppColors.primary },
    bottomNavLabel: { fontSize: 12, fontWeight: '500', color: AppColors.textSecondary },
    bottomNavLabelActive: { color: AppColors.primary },
});