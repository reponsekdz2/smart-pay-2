import React, { useState, useEffect, ReactNode } from 'react';

// A simple shim for React Native components for the web.

// FIX: Define a more robust style prop type that accepts single style objects or arrays of them, which is common in React Native.
type StyleProp = React.CSSProperties | (React.CSSProperties | undefined | boolean | null)[];

// FIX: Create a helper to flatten style arrays into a single style object for web compatibility.
const flattenStyle = (style: StyleProp | undefined): React.CSSProperties | undefined => {
    if (!style) {
        return undefined;
    }
    if (Array.isArray(style)) {
        return Object.assign({}, ...style.filter(Boolean));
    }
    return style;
};


// --- Core Components ---

export const View = React.forwardRef<HTMLDivElement, { children?: ReactNode; style?: StyleProp }>(({ children, style, ...props }, ref) => {
    return <div ref={ref} style={flattenStyle(style)} {...props}>{children}</div>;
});

export const Text = ({ children, style, ...props }: { children?: ReactNode; style?: StyleProp }) => {
    return <p style={{ margin: 0, ...flattenStyle(style) }} {...props}>{children}</p>;
};

export const TouchableOpacity = ({ children, onPress, style, disabled, ...props }: { children?: ReactNode; onPress?: () => void; style?: StyleProp; disabled?: boolean }) => {
    return <button onClick={onPress} style={{ border: 'none', background: 'transparent', padding: 0, cursor: disabled ? 'default' : 'pointer', ...flattenStyle(style) }} disabled={disabled} {...props}>{children}</button>;
};

export const TextInput = ({ style, value, onChangeText, placeholder, secureTextEntry, keyboardType, onFocus, onBlur, ...props }: { style?: StyleProp; value: string; onChangeText: (text: string) => void; placeholder?: string; secureTextEntry?: boolean, keyboardType?: string, onFocus?: () => void, onBlur?: () => void }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeText(e.target.value);
    };
    
    let inputType = 'text';
    if (secureTextEntry) inputType = 'password';
    if (keyboardType === 'email-address') inputType = 'email';
    if (keyboardType === 'phone-pad' || keyboardType === 'numeric') inputType = 'tel'; // 'tel' shows numeric keyboard on mobile

    return <input type={inputType} style={flattenStyle(style)} value={value} onChange={handleChange} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} {...props} />;
};

export const ScrollView = ({ children, style, ...props }: { children?: ReactNode; style?: StyleProp }) => {
    return <div style={{ overflow: 'auto', ...flattenStyle(style) }} {...props}>{children}</div>;
};

export const Picker = ({ children, selectedValue, onValueChange, style }: { children: ReactNode, selectedValue: string, onValueChange: (value: string) => void, style?: StyleProp}) => {
    return (
        <select value={selectedValue} onChange={e => onValueChange(e.target.value)} style={flattenStyle(style)}>
            {children}
        </select>
    );
};
Picker.Item = ({ label, value }: { label: string, value: string }) => <option value={value}>{label}</option>;


// --- APIs ---

export const StyleSheet = {
    // FIX: Use a generic function to preserve the type of the style object,
    // which fixes all "Property does not exist on type 'object'" errors.
    // The `<T>` syntax in an arrow function can be misinterpreted as a JSX tag.
    // Using the method syntax `create<T>()` avoids this ambiguity.
    create<T>(styles: T): T {
        return styles;
    },
};

// --- Hooks ---
// FIX: Add interface for window dimensions to satisfy stricter typescript rules.
interface WindowDimensions {
    width: number;
    height: number;
}

export const useWindowDimensions = (): WindowDimensions => {
    // FIX: Ensure the WindowDimensions interface is defined before use, and that state is initialized with correct values.
    const [dimensions, setDimensions] = useState<WindowDimensions>({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return dimensions;
};