import React, { CSSProperties } from 'react';

// A basic compatibility layer to make React Native-like components work on the web.

type Style = CSSProperties & {
    [key: string]: any;
};

export const View = ({ children, style }: { children?: React.ReactNode, style?: Style }) => {
    return <div style={style}>{children}</div>;
};

export const Text = ({ children, style }: { children?: React.ReactNode, style?: Style }) => {
    return <span style={style}>{children}</span>;
};

export const ScrollView = ({ children, style, horizontal }: { children?: React.ReactNode, style?: Style, horizontal?: boolean }) => {
    const finalStyle = {
        overflow: 'auto',
        ...(horizontal ? { overflowX: 'auto', overflowY: 'hidden', display: 'flex' } : { overflowY: 'auto', overflowX: 'hidden' }),
        ...style,
    };
    return <div style={finalStyle}>{children}</div>;
};

export const TouchableOpacity = ({ children, style, onPress, disabled }: { children?: React.ReactNode, style?: Style, onPress?: () => void, disabled?: boolean }) => {
    return <button onClick={onPress} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', ...style }} disabled={disabled}>{children}</button>;
};

export const TextInput = ({ value, onChangeText, style, placeholder, keyboardType }: { value: string, onChangeText: (text: string) => void, style?: Style, placeholder?: string, keyboardType?: string }) => {
    const type = keyboardType === 'numeric' ? 'number' : 'text';
    return <input type={type} value={value} onChange={(e) => onChangeText(e.target.value)} style={style} placeholder={placeholder} />;
};

const PickerItem = ({ label, value }: { label: string, value: string }) => {
    return <option value={value}>{label}</option>;
};

export const Picker = ({ children, selectedValue, onValueChange, style }: { children: React.ReactNode, selectedValue: string, onValueChange: (value: string) => void, style?: Style }) => {
    return <select value={selectedValue} onChange={(e) => onValueChange(e.target.value)} style={style}>{children}</select>;
};
Picker.Item = PickerItem;

// StyleSheet.create just returns the style object as-is on the web.
export const StyleSheet = {
    create: (styles: Record<string, Style>) => styles,
};
